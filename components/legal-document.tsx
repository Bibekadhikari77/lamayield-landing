import Link from "next/link";
import type { LegalBlock, LegalSection, LegalText } from "@/lib/legal";

// Shared renderer for the Privacy Policy, Terms of Use and Data protection / Imprint pages.

function Text({ text }: { text: LegalText }) {
  if (typeof text === "string") return <>{text}</>;
  return (
    <>
      <strong className="font-medium text-snow">{text.label}:</strong> {text.text}
    </>
  );
}

export function LegalBlocks({ blocks }: { blocks: LegalBlock[] }) {
  return blocks.map((block, i) => {
    switch (block.type) {
      case "p":
        return (
          <p key={i} className="text-light text-mist">
            <Text text={block.text} />
          </p>
        );
      case "list":
        return (
          <ul key={i} className="flex list-disc flex-col gap-2 pl-5">
            {block.items.map((item, j) => (
              <li key={j} className="text-light text-mist">
                <Text text={item} />
              </li>
            ))}
          </ul>
        );
      case "address":
        return (
          <address key={i} className="text-light not-italic text-mist">
            {block.lines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </address>
        );
      case "h3":
        return (
          <h3 key={i} className="text-body mt-2 font-medium text-snow">
            {block.text}
          </h3>
        );
      case "contact":
        return (
          <p key={i} className="text-light text-mist">
            <strong className="font-medium text-snow">E-mail:</strong>{" "}
            <Link href="/contact" className="text-accent hover:underline">
              send us a message
            </Link>
          </p>
        );
    }
  });
}

export function LegalSections({ sections }: { sections: LegalSection[] }) {
  return sections.map((section) => (
    <div
      key={section.id}
      id={section.id}
      className="flex scroll-mt-28 flex-col gap-4 border-t border-line pt-10"
    >
      <h2 className="text-h4 text-snow">{section.title}</h2>
      <LegalBlocks blocks={section.blocks} />
    </div>
  ));
}

export function LegalToc({ sections }: { sections: LegalSection[] }) {
  return (
    <nav aria-label="Table of contents" className="flex flex-col gap-4 border-t border-line pt-10">
      <h2 className="text-h4 text-snow">Table of Contents</h2>
      <ol className="flex list-decimal flex-col gap-2 pl-5">
        {sections.map((section) => (
          <li key={section.id} className="text-light text-mist">
            <a href={`#${section.id}`} className="transition-colors hover:text-accent">
              {section.title}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
