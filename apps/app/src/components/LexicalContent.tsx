/**
 * Lightweight Lexical JSON renderer for server-side use.
 * Handles the node types produced by our htmlToLexical converter:
 * paragraph, heading, list, listitem, quote, text (with formatting).
 */

import React from "react";

type LexicalNode = {
  type: string;
  text?: string;
  format?: number;
  tag?: string;
  listType?: string;
  children?: LexicalNode[];
  direction?: string | null;
};

type LexicalRoot = {
  root: LexicalNode;
};

// Text format bitmask (Lexical IS_BOLD=1, IS_ITALIC=2, IS_UNDERLINE=8, IS_STRIKETHROUGH=4, IS_CODE=16)
const IS_BOLD = 1;
const IS_ITALIC = 2;
const IS_STRIKETHROUGH = 4;
const IS_UNDERLINE = 8;
const IS_CODE = 16;

function TextNode({ node }: { node: LexicalNode }) {
  if (!node.text) return null;
  const fmt = node.format ?? 0;

  let el: React.ReactNode = node.text;
  if (fmt & IS_CODE)
    el = (
      <code className="font-mono bg-white/10 px-1 py-0.5 text-sm">{el}</code>
    );
  if (fmt & IS_BOLD) el = <strong>{el}</strong>;
  if (fmt & IS_ITALIC) el = <em>{el}</em>;
  if (fmt & IS_UNDERLINE) el = <u>{el}</u>;
  if (fmt & IS_STRIKETHROUGH) el = <s>{el}</s>;

  return <>{el}</>;
}

function InlineChildren({ children }: { children?: LexicalNode[] }) {
  if (!children?.length) return null;
  return (
    <>
      {children.map((child, i) => {
        if (child.type === "text") return <TextNode key={i} node={child} />;
        if (child.type === "linebreak") return <br key={i} />;
        // Inline elements with children (e.g. links — render children)
        if (child.children)
          return <InlineChildren key={i} children={child.children} />;
        return null;
      })}
    </>
  );
}

function ParagraphNode({
  node,
  isFirst,
  dropCap,
}: {
  node: LexicalNode;
  isFirst?: boolean;
  dropCap?: boolean;
}) {
  const content = <InlineChildren children={node.children} />;
  // Skip empty paragraphs
  const hasText = node.children?.some((c) => c.text?.trim());
  if (!hasText) return null;
  return (
    <p
      className={isFirst && dropCap ? "drop-cap" : ""}
      style={{
        fontFamily: '"Noto Serif", serif',
        fontSize: "1.125rem",
        lineHeight: "1.8",
        color: "#e5e2e1",
        marginBottom: "1.5rem",
      }}
    >
      {content}
    </p>
  );
}

function HeadingNode({ node }: { node: LexicalNode }) {
  const tag = node.tag ?? "h2";
  const content = <InlineChildren children={node.children} />;

  const sizes: Record<string, string> = {
    h1: "clamp(2rem, 3vw, 2.5rem)",
    h2: "clamp(1.75rem, 2.5vw, 2rem)",
    h3: "1.5rem",
    h4: "1.25rem",
    h5: "1.125rem",
    h6: "1rem",
  };

  return React.createElement(
    tag,
    {
      style: {
        fontFamily: '"Noto Serif", serif',
        fontSize: sizes[tag] ?? "1.5rem",
        fontWeight: 700,
        color: "#f2ca50",
        marginTop: "2.5rem",
        marginBottom: "1rem",
        lineHeight: "1.25",
        letterSpacing: "-0.01em",
      },
    },
    content
  );
}

function ListItemNode({ node }: { node: LexicalNode }) {
  return (
    <li
      style={{
        fontFamily: '"Noto Serif", serif',
        color: "#e5e2e1",
        lineHeight: "1.7",
        marginBottom: "0.5rem",
      }}
    >
      <InlineChildren children={node.children} />
    </li>
  );
}

function ListNode({ node }: { node: LexicalNode }) {
  const isOrdered = node.listType === "number";
  const items = node.children?.map((item, i) => (
    <ListItemNode key={i} node={item} />
  ));
  const style: React.CSSProperties = {
    paddingLeft: "1.5rem",
    marginBottom: "1.5rem",
    listStyleType: isOrdered ? "decimal" : "disc",
    listStylePosition: "outside",
  };
  return isOrdered ? (
    <ol style={style}>{items}</ol>
  ) : (
    <ul style={style}>{items}</ul>
  );
}

function QuoteNode({ node }: { node: LexicalNode }) {
  return (
    <blockquote
      style={{
        fontFamily: '"Noto Serif", serif',
        fontStyle: "italic",
        fontSize: "1.375rem",
        color: "#f2ca50",
        borderLeft: "4px solid #d4af37",
        padding: "1rem 0 1rem 2rem",
        margin: "2.5rem 0",
        lineHeight: "1.5",
      }}
    >
      <InlineChildren children={node.children} />
    </blockquote>
  );
}

function RenderNode({
  node,
  isFirst,
  dropCap,
}: {
  node: LexicalNode;
  isFirst?: boolean;
  dropCap?: boolean;
}) {
  switch (node.type) {
    case "paragraph":
      return <ParagraphNode node={node} isFirst={isFirst} dropCap={dropCap} />;
    case "heading":
      return <HeadingNode node={node} />;
    case "list":
      return <ListNode node={node} />;
    case "listitem":
      return <ListItemNode node={node} />;
    case "quote":
      return <QuoteNode node={node} />;
    default:
      if (node.children?.length) {
        return (
          <>
            {node.children.map((child, i) => (
              <RenderNode key={i} node={child} />
            ))}
          </>
        );
      }
      return null;
  }
}

interface LexicalContentProps {
  content: unknown;
  className?: string;
  dropCap?: boolean;
}

export function LexicalContent({
  content,
  className,
  dropCap = false,
}: LexicalContentProps) {
  if (!content || typeof content !== "object") return null;
  const lexical = content as LexicalRoot;
  const children = lexical?.root?.children;
  if (!children?.length) return null;

  // Find the first paragraph so we can apply drop-cap styling
  const firstParaIdx = children.findIndex((n) => n.type === "paragraph");

  return (
    <div className={className ?? "max-w-none"}>
      {children.map((node, i) => (
        <RenderNode
          key={i}
          node={node}
          isFirst={i === firstParaIdx}
          dropCap={dropCap}
        />
      ))}
    </div>
  );
}
