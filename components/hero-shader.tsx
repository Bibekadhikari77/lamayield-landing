"use client";

import { useEffect, useRef } from "react";

// Port of the Framer "Ripple" shader behind the reference hero: the hero
// illustration is displaced by a simulated water trail that follows the
// cursor, with an expanding ring on each click. Falls back to the static
// image when WebGL2 / float render targets are unavailable or motion is reduced.

const SETTINGS = {
  u_centerFade: 0.25,
  u_clickRipple: 1,
  u_clickSpeed: 1,
  u_dispersion: 0.1,
  u_trailDecay: 0.5,
  u_trailDisplacement: 0.04,
  u_trailRadius: 0.12,
  u_trailSoftness: 0.5,
  u_trailStrength: 0.6,
};

const SLOTS = 9;
const MAX_DPR = 1.5;

const VERTEX = `#version 300 es
in vec2 a_position;
out vec2 v_uv;
void main() {
  v_uv = a_position * 0.5 + 0.5;
  gl_Position = vec4(a_position, 0.0, 1.0);
}`;

const HEADER = `#version 300 es
precision highp float;
in vec2 v_uv;
out vec4 fragColor;
uniform sampler2D u_texture;
uniform sampler2D u_rippleTrail_buffer;
uniform sampler2D u_clickState_buffer;
uniform vec2 u_resolution;
uniform float u_pixelRatio;
uniform float u_deltaTime;
uniform vec4 u_mousePosition;
uniform float u_mouseHover;
uniform float u_mousePointerDown;
${Object.keys(SETTINGS)
  .map((name) => `uniform float ${name};`)
  .join("\n")}
`;

const TRAIL_FRAGMENT = `${HEADER}
void main() {
  vec2 uv = v_uv;
  vec2 res = u_resolution.xy / u_pixelRatio;
  float ref = sqrt(res.x * res.y);

  const float simDetail = 800.;
  vec2 simRes = res / ref * simDetail;
  vec2 px = 1.0 / simRes;

  vec4 prevData = texture(u_rippleTrail_buffer, uv);
  float current = prevData.r;
  float previous = prevData.g;

  float left  = texture(u_rippleTrail_buffer, uv - vec2(px.x, 0.0)).r;
  float right = texture(u_rippleTrail_buffer, uv + vec2(px.x, 0.0)).r;
  float down  = texture(u_rippleTrail_buffer, uv - vec2(0.0, px.y)).r;
  float up    = texture(u_rippleTrail_buffer, uv + vec2(0.0, px.y)).r;

  float neighborAverage = (left + right + down + up) * 0.25;
  float r = u_deltaTime * 60.0;
  float decay = pow(mix(0.95, 0.99, u_trailDecay), r);
  float next = (neighborAverage * 2.0 - previous) * decay;

  vec2 p     = uv * res / ref;
  vec2 mouse = u_mousePosition.xy * res / ref;
  float dist = distance(p, mouse);

  float stamp = 1.0 - smoothstep(u_trailRadius * (1.0 - u_trailSoftness), u_trailRadius, dist);
  float centerFade = smoothstep(0.0, u_centerFade * 0.2, dist);

  float speed = length(u_mousePosition.zw);
  float speedAmount = clamp(speed * u_trailStrength, 0.0, 1.0);
  float pressAmount = 1.0 + u_mousePointerDown * 1.5;

  next += stamp * centerFade * u_mouseHover * speedAmount * pressAmount * min(r, 3.0);

  fragColor = vec4(next, current, 0.0, 1.0);
}`;

const CLICK_FRAGMENT = `${HEADER}
const int SLOTS = ${SLOTS};

vec4 readSlot(int i) {
  return texture(u_clickState_buffer, vec2((float(i) + 0.5) / float(SLOTS), 0.5));
}

float clickLifetime() {
  float f = mix(0.9, 0.95, u_trailDecay);
  return -3.0 / (log(f) / log(10.0)) / 60.0;
}

void main() {
  int s = int(clamp(floor(v_uv.x * float(SLOTS)), 0.0, float(SLOTS - 1)));
  float life = clickLifetime();
  float down = u_mousePointerDown;

  // Band 0: .r previous eased press, .g was-rising flag, .b seconds since last spawn
  vec4  g         = readSlot(0);
  float prevDown  = g.r;
  float wasRising = g.g;
  float cooldown  = g.b;
  if (g == vec4(0.0)) cooldown = 100.0;

  float delta   = down - prevDown;
  bool  rising   = (delta > 0.003);
  bool  spawnNow = rising && (wasRising < 0.5) && (cooldown > 0.05);

  if (s == 0) {
    float nextCooldown = spawnNow ? 0.0 : min(cooldown + u_deltaTime, 100.0);
    fragColor = vec4(down, rising ? 1.0 : 0.0, nextCooldown, 0.0);
    return;
  }

  vec4 next = readSlot(s);
  if (next == vec4(0.0)) next = vec4(0.0, 0.0, -1.0, 0.0);

  if (next.b >= 0.0) {
    float a = next.b + u_deltaTime;
    next.b = (a > life) ? -1.0 : a;
  }

  int   target = 1;
  float best   = -1e9;
  for (int i = 1; i < SLOTS; i++) {
    float age   = readSlot(i).b;
    float score = (age < 0.0) ? 1e6 : age;
    if (score > best) { best = score; target = i; }
  }

  if (spawnNow && s == target) {
    next.rg = u_mousePosition.xy;
    next.b  = 0.0;
  }

  fragColor = next;
}`;

const MAIN_FRAGMENT = `${HEADER}
const int SLOTS = ${SLOTS};

vec2 coverFit(vec2 uv) {
  vec2 flipped = vec2(uv.x, 1.0 - uv.y);
  vec2 texRes = vec2(textureSize(u_texture, 0));
  vec2 ratio = u_resolution.xy / texRes;
  float maxRatio = max(ratio.x, ratio.y);
  return (flipped - 0.5) * (ratio / maxRatio) + 0.5;
}

float clickLifetime() {
  float f = mix(0.9, 0.95, u_trailDecay);
  return -3.0 / (log(f) / log(10.0)) / 60.0;
}

vec2 clickRingOffset(vec2 uv, vec2 res, float ref, vec2 originUV, float age) {
  vec2 p      = uv * res / ref;
  vec2 origin = originUV * res / ref;
  vec2 d      = p - origin;
  float dist  = length(d);
  if (dist < 1e-5) return vec2(0.0);
  vec2 dir    = d / dist;

  float life = clickLifetime();
  float t = clamp(u_clickSpeed * age / life, 0.0, 1.0);

  float reach = u_trailRadius * 3.0;
  float front = reach * t;
  float k    = 6.2831853 / max(0.25 * reach, 1e-4);
  float band = max(0.25 * reach, 1e-3);

  float x        = dist - front;
  float envelope = exp(-(x * x) / (band * band));
  float fade     = 1.0 - smoothstep(life * 0.6, life, age);
  float wave     = cos(k * x) * envelope * fade;

  vec2 dirUV = normalize(dir * ref / res);
  return dirUV * wave * u_trailStrength * 0.02;
}

void main() {
  vec2 uv = v_uv;
  vec2 res = u_resolution.xy / u_pixelRatio;
  float ref = sqrt(res.x * res.y);

  const float simDetail = 800.0;
  vec2 simRes = res / ref * simDetail;
  vec2 px = 1.0 / simRes;

  float hL = texture(u_rippleTrail_buffer, uv - vec2(px.x, 0.0)).r;
  float hR = texture(u_rippleTrail_buffer, uv + vec2(px.x, 0.0)).r;
  float hD = texture(u_rippleTrail_buffer, uv - vec2(0.0, px.y)).r;
  float hU = texture(u_rippleTrail_buffer, uv + vec2(0.0, px.y)).r;

  vec2 grad = vec2(hL - hR, hD - hU);
  vec2 dragOffset = grad * u_trailDisplacement * ref / res;

  vec2 clickOffset = vec2(0.0);
  if (u_clickRipple > 0.5) {
    float life = clickLifetime();
    for (int i = 1; i < SLOTS; i++) {
      vec4 slot = texture(u_clickState_buffer, vec2((float(i) + 0.5) / float(SLOTS), 0.5));
      float age = slot.b;
      if (age < 0.0 || age > life) continue;
      clickOffset += clickRingOffset(uv, res, ref, slot.rg, age);
    }
  }

  vec2 baseOffset = dragOffset + clickOffset;
  vec2 offsetR = baseOffset * (1.0 - u_dispersion * 0.5);
  vec2 offsetG = baseOffset;
  vec2 offsetB = baseOffset * (1.0 + u_dispersion * 0.5);

  vec4 sR = texture(u_texture, coverFit(uv + offsetR));
  vec4 sG = texture(u_texture, coverFit(uv + offsetG));
  vec4 sB = texture(u_texture, coverFit(uv + offsetB));

  fragColor = vec4(sR.r, sG.g, sB.b, sG.a);
}`;

type Target = { texture: WebGLTexture; framebuffer: WebGLFramebuffer };
type PingPong = { read: Target; write: Target; width: number; height: number };

function compileProgram(gl: WebGL2RenderingContext, fragment: string) {
  const program = gl.createProgram();
  for (const [type, source] of [
    [gl.VERTEX_SHADER, VERTEX],
    [gl.FRAGMENT_SHADER, fragment],
  ] as const) {
    const shader = gl.createShader(type)!;
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      throw new Error(gl.getShaderInfoLog(shader) ?? "shader compile failed");
    }
    gl.attachShader(program, shader);
    gl.deleteShader(shader);
  }
  gl.bindAttribLocation(program, 0, "a_position");
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    throw new Error(gl.getProgramInfoLog(program) ?? "program link failed");
  }
  return program;
}

function createTarget(gl: WebGL2RenderingContext, width: number, height: number, filter: number): Target {
  const texture = gl.createTexture()!;
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA16F, width, height, 0, gl.RGBA, gl.HALF_FLOAT, null);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, filter);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, filter);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  const framebuffer = gl.createFramebuffer()!;
  gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
  gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
  gl.clearColor(0, 0, 0, 0);
  gl.clear(gl.COLOR_BUFFER_BIT);
  return { texture, framebuffer };
}

function createPingPong(gl: WebGL2RenderingContext, width: number, height: number, filter: number): PingPong {
  return {
    read: createTarget(gl, width, height, filter),
    write: createTarget(gl, width, height, filter),
    width,
    height,
  };
}

function deletePingPong(gl: WebGL2RenderingContext, buffer: PingPong) {
  for (const target of [buffer.read, buffer.write]) {
    gl.deleteTexture(target.texture);
    gl.deleteFramebuffer(target.framebuffer);
  }
}

export function HeroShader({ src, className = "" }: { src: string; className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const gl = canvas.getContext("webgl2", { alpha: true, antialias: false, premultipliedAlpha: false });
    if (!gl || !gl.getExtension("EXT_color_buffer_float")) return;

    let programs: Record<"trail" | "click" | "main", WebGLProgram>;
    try {
      programs = {
        trail: compileProgram(gl, TRAIL_FRAGMENT),
        click: compileProgram(gl, CLICK_FRAGMENT),
        main: compileProgram(gl, MAIN_FRAGMENT),
      };
    } catch (error) {
      console.error(error);
      return;
    }

    // One oversized triangle covers the viewport.
    const vao = gl.createVertexArray();
    gl.bindVertexArray(vao);
    const vbo = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);

    const image = gl.createTexture();
    let imageReady = false;
    const img = new Image();
    img.onload = () => {
      gl.bindTexture(gl.TEXTURE_2D, image);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      imageReady = true;
      canvas.style.opacity = "1";
    };
    img.src = src;

    const click = createPingPong(gl, SLOTS, 1, gl.NEAREST);
    let trail: PingPong | null = null;
    let pixelRatio = 1;

    const resize = () => {
      pixelRatio = Math.min(window.devicePixelRatio || 1, MAX_DPR);
      const width = Math.max(1, Math.round(canvas.clientWidth * pixelRatio));
      const height = Math.max(1, Math.round(canvas.clientHeight * pixelRatio));
      if (trail && trail.width === width && trail.height === height) return;
      canvas.width = width;
      canvas.height = height;
      if (trail) deletePingPong(gl, trail);
      trail = createPingPong(gl, width, height, gl.LINEAR);
    };
    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);

    // Pointer state in shader UV space (origin bottom-left).
    const mouse = { x: 0.5, y: 0.5, vx: 0, vy: 0, hover: 0, hoverTarget: 0, down: 0, downTarget: 0 };
    let lastMove = performance.now();

    const onPointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;
      const y = 1 - (event.clientY - rect.top) / rect.height;
      const now = performance.now();
      const dt = Math.max((now - lastMove) / 1000, 1 / 240);
      lastMove = now;
      const inside = x >= 0 && x <= 1 && y >= 0 && y <= 1;
      if (inside && mouse.hoverTarget) {
        mouse.vx = mouse.vx * 0.5 + ((x - mouse.x) / dt) * 0.5;
        mouse.vy = mouse.vy * 0.5 + ((y - mouse.y) / dt) * 0.5;
      }
      mouse.x = x;
      mouse.y = y;
      mouse.hoverTarget = inside ? 1 : 0;
    };
    const onPointerDown = (event: PointerEvent) => {
      onPointerMove(event);
      if (mouse.hoverTarget) mouse.downTarget = 1;
    };
    const onPointerUp = () => {
      mouse.downTarget = 0;
    };
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerdown", onPointerDown, { passive: true });
    window.addEventListener("pointerup", onPointerUp, { passive: true });
    window.addEventListener("pointercancel", onPointerUp, { passive: true });

    const setUniforms = (program: WebGLProgram, deltaTime: number) => {
      const loc = (name: string) => gl.getUniformLocation(program, name);
      gl.uniform2f(loc("u_resolution"), canvas.width, canvas.height);
      gl.uniform1f(loc("u_pixelRatio"), pixelRatio);
      gl.uniform1f(loc("u_deltaTime"), deltaTime);
      gl.uniform4f(loc("u_mousePosition"), mouse.x, mouse.y, mouse.vx, mouse.vy);
      gl.uniform1f(loc("u_mouseHover"), mouse.hover);
      gl.uniform1f(loc("u_mousePointerDown"), mouse.down);
      for (const [name, value] of Object.entries(SETTINGS)) gl.uniform1f(loc(name), value);
      gl.uniform1i(loc("u_texture"), 0);
      gl.uniform1i(loc("u_rippleTrail_buffer"), 1);
      gl.uniform1i(loc("u_clickState_buffer"), 2);
    };

    const bindInputs = () => {
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, image);
      gl.activeTexture(gl.TEXTURE1);
      gl.bindTexture(gl.TEXTURE_2D, trail!.read.texture);
      gl.activeTexture(gl.TEXTURE2);
      gl.bindTexture(gl.TEXTURE_2D, click.read.texture);
    };

    const runPass = (program: WebGLProgram, target: PingPong | null, deltaTime: number) => {
      gl.useProgram(program);
      setUniforms(program, deltaTime);
      bindInputs();
      if (target) {
        gl.bindFramebuffer(gl.FRAMEBUFFER, target.write.framebuffer);
        gl.viewport(0, 0, target.width, target.height);
      } else {
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        gl.viewport(0, 0, canvas.width, canvas.height);
      }
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      if (target) [target.read, target.write] = [target.write, target.read];
    };

    let visible = true;
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    intersectionObserver.observe(canvas);

    let frame = 0;
    let last = performance.now();
    const tick = (now: number) => {
      frame = requestAnimationFrame(tick);
      const deltaTime = Math.min((now - last) / 1000, 1 / 20);
      last = now;
      if (!visible || !imageReady || !trail) return;

      // Ease hover and press like Framer's spring-driven mouse values.
      const ease = 1 - Math.exp(-deltaTime * 12);
      mouse.hover += (mouse.hoverTarget - mouse.hover) * ease;
      mouse.down += (mouse.downTarget - mouse.down) * ease;
      // Velocity dies off once the pointer stops moving.
      const damp = Math.exp(-deltaTime * 10);
      mouse.vx *= damp;
      mouse.vy *= damp;

      gl.bindVertexArray(vao);
      runPass(programs.trail, trail, deltaTime);
      runPass(programs.click, click, deltaTime);
      runPass(programs.main, null, deltaTime);
    };
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointercancel", onPointerUp);
      img.onload = null;
      if (trail) deletePingPong(gl, trail);
      deletePingPong(gl, click);
      gl.deleteTexture(image);
      gl.deleteBuffer(vbo);
      gl.deleteVertexArray(vao);
      Object.values(programs).forEach((program) => gl.deleteProgram(program));
    };
  }, [src]);

  return (
    <div aria-hidden="true" className={`pointer-events-none overflow-hidden ${className}`}>
      {/* Static image doubles as the no-WebGL / reduced-motion fallback. */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${src})` }}
      />
      <canvas
        ref={canvasRef}
        className="absolute inset-0 block size-full opacity-0 transition-opacity duration-500"
      />
    </div>
  );
}
