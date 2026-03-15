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
  if (fmt & IS_CODE) el = <code className="font-mono bg-white/10 px-1 py-0.5 rounded text-sm">{el}</code>;
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
        if (child.children) return <InlineChildren key={i} children={child.children} />;
        return null;
      })}
    </>
  );
}

function ParagraphNode({ node }: { node: LexicalNode }) {
  const content = <InlineChildren children={node.children} />;
  // Skip empty paragraphs
  const hasText = node.children?.some((c) => c.text?.trim());
  if (!hasText) return null;
  return <p>{content}</p>;
}

function HeadingNode({ node }: { node: LexicalNode }) {
  const tag = node.tag ?? "h2";
  const content = <InlineChildren children={node.children} />;
  const className = {
    h1: "text-3xl font-bold mt-10 mb-4",
    h2: "text-2xl font-bold mt-8 mb-3",
    h3: "text-xl font-bold mt-6 mb-2",
    h4: "text-lg font-bold mt-5 mb-2",
    h5: "text-base font-bold mt-4 mb-1",
    h6: "text-sm font-bold mt-3 mb-1",
  }[tag] ?? "text-xl font-bold mt-6 mb-2";

  return React.createElement(tag, { className }, content);
}

function ListItemNode({ node }: { node: LexicalNode }) {
  return (
    <li>
      <InlineChildren children={node.children} />
    </li>
  );
}

function ListNode({ node }: { node: LexicalNode }) {
  const isOrdered = node.listType === "number";
  const items = node.children?.map((item, i) => (
    <ListItemNode key={i} node={item} />
  ));
  return isOrdered ? <ol>{items}</ol> : <ul>{items}</ul>;
}

function QuoteNode({ node }: { node: LexicalNode }) {
  return (
    <blockquote>
      <InlineChildren children={node.children} />
    </blockquote>
  );
}

function RenderNode({ node }: { node: LexicalNode }) {
  switch (node.type) {
    case "paragraph":
      return <ParagraphNode node={node} />;
    case "heading":
      return <HeadingNode node={node} />;
    case "list":
      return <ListNode node={node} />;
    case "listitem":
      return <ListItemNode node={node} />;
    case "quote":
      return <QuoteNode node={node} />;
    default:
      // Fallback: render any children
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
}

export function LexicalContent({ content, className }: LexicalContentProps) {
  if (!content || typeof content !== "object") return null;
  const lexical = content as LexicalRoot;
  const children = lexical?.root?.children;
  if (!children?.length) return null;

  return (
    <div
      className={
        className ??
        "prose prose-stone prose-lg max-w-none prose-headings:font-[Cormorant_Garamond,Georgia,serif] prose-headings:text-[#352F2C] prose-p:text-[#352F2C]/85 prose-p:leading-relaxed prose-strong:text-[#352F2C] prose-ul:text-[#352F2C]/85 prose-ol:text-[#352F2C]/85 prose-li:marker:text-[#D5C17A] prose-blockquote:border-[#D5C17A] prose-blockquote:text-[#6C6864]"
      }
    >
      {children.map((node, i) => (
        <RenderNode key={i} node={node} />
      ))}
    </div>
  );
}
