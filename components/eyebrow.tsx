// Section label, rendered in the project as "[ LABEL ]".
export function Eyebrow({ children }: { children: string }) {
  return <p className="eyebrow uppercase">[ {children} ]</p>;
}
