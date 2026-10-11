import { j as jsxRuntimeExports, r as reactExports, i as useParams, L as Link } from "./react-vendor.CAo4XUiA.js";
import { a as useQuery } from "./tanstack.DPr3OB19.js";
import { j as cn, D as useIsNativeApp, K as useIsDesktopApp, bP as useStoreExtensionDetail, bG as useExtensionInstaller, bQ as typeVisual, bR as githubRawBase, Q as Background, B as Button, bS as ExtensionIcon, bT as ExtensionChips, bU as formatRelative, bV as InstallButton, bL as formatCompact, bW as formatHealth, bX as formatBytes, bY as ExtensionDebugWindow } from "./index.C6yfkT5T.js";
import { Q as LoaderCircle, aS as Puzzle, u as ArrowLeft, bz as Bug, D as Download, c as Check, m as Eye, cm as HeartPulse, cn as FileCode2, aV as Shield, ag as ShieldCheck, G as Github, j as ExternalLink, T as TriangleAlert } from "./icons.C2gBBarQ.js";
import "./vendor.CJyRs4QS.js";
import "./supabase.WuRMX5Dg.js";
import "./radix.BiK9uYXL.js";
import "./motion.DVGLRFCH.js";
import "./hls.BlgtCWcq.js";
import "./editor.Dxw8dtyw.js";
import "./charts.Dr1fgDJ-.js";
const INLINE_TAGS = "code|strong|b|em|i|kbd|sub|sup|ins|del|s|span|small|q|abbr";
const INLINE = new RegExp(
  [
    "`[^`]+`",
    "!\\[[^\\]]*\\]\\([^)\\s]+\\)",
    "\\[[^\\]]+\\]\\([^)\\s]+\\)",
    "\\*\\*[^*]+\\*\\*",
    "__[^_]+__",
    "\\*[^*\\n]+\\*",
    "~~[^~]+~~",
    "<!--[\\s\\S]*?-->",
    "<br\\s*/?>",
    "<img\\b[^>]*>",
    "<a\\b[^>]*>[\\s\\S]*?</a\\s*>",
    `<(?:${INLINE_TAGS})\\b[^>]*>[\\s\\S]*?</(?:${INLINE_TAGS})\\s*>`,
    "</?[a-zA-Z][^>]*>"
  ].join("|"),
  "gi"
);
const CODE_CLASS = "rounded bg-white/10 px-1.5 py-0.5 font-mono text-[0.85em] text-white/85";
const LINK_CLASS = "font-semibold text-primary underline decoration-primary/40 underline-offset-2 hover:decoration-primary";
const HEADING_CLASSES = [
  "font-display mt-6 text-xl font-black tracking-tight text-foreground",
  "font-display mt-6 text-lg font-bold tracking-tight text-foreground",
  "mt-5 text-base font-bold text-white/90"
];
function attr(tag, name) {
  const match = new RegExp(`\\b${name}\\s*=\\s*("[^"]*"|'[^']*'|[^\\s>]+)`, "i").exec(tag);
  return match ? match[1].replace(/^["']|["']$/g, "").trim() : void 0;
}
function innerHtml(token) {
  const open = token.indexOf(">");
  const close = token.lastIndexOf("</");
  return open === -1 || close <= open ? "" : token.slice(open + 1, close);
}
function resolveTarget(raw, baseUrl) {
  const value = String(raw ?? "").trim();
  if (!value) return void 0;
  if (/^(https?:|data:image\/)/i.test(value)) return value;
  if (/^[a-z][a-z0-9+.-]*:/i.test(value) || value.startsWith("#")) return void 0;
  if (!baseUrl) return void 0;
  return `${baseUrl.replace(/\/+$/, "")}/${value.replace(/^\.\//, "").replace(/^\/+/, "")}`;
}
function plainText(text) {
  return text.replace(/<[^>]*>/g, "").replace(/!?\[([^\]]*)\]\([^)\s]*\)/g, "$1").replace(/[`*_~]/g, "").trim();
}
function slugify(text) {
  return plainText(text).toLowerCase().replace(/[^\p{L}\p{N}\s-]/gu, "").trim().replace(/\s+/g, "-");
}
function imageNode(alt, src, key, baseUrl, width) {
  const resolved = resolveTarget(src, baseUrl);
  if (!resolved) return alt ? /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.Fragment, { children: alt }, key) : null;
  const size = Number(String(width ?? "").replace(/px$/i, ""));
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "img",
    {
      src: resolved,
      alt,
      loading: "lazy",
      referrerPolicy: "no-referrer",
      width: Number.isFinite(size) && size > 0 ? size : void 0,
      className: "inline-block h-auto max-w-full rounded-lg align-middle",
      onError: (event) => {
        event.currentTarget.style.display = "none";
      }
    },
    key
  );
}
function linkNode(href, label, key, baseUrl) {
  const children = renderInline(label, key, baseUrl);
  const raw = String(href ?? "").trim();
  if (raw.startsWith("#") && raw.length > 1) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: `#${slugify(raw.slice(1))}`, className: LINK_CLASS, children }, key);
  }
  const resolved = resolveTarget(raw, baseUrl);
  if (!resolved) return /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.Fragment, { children }, key);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: resolved, target: "_blank", rel: "noreferrer noopener", className: LINK_CLASS, children }, key);
}
function pairedNode(tag, inner, key, baseUrl) {
  const children = renderInline(inner, key, baseUrl);
  switch (tag) {
    case "code":
      return /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: CODE_CLASS, children }, key);
    case "strong":
    case "b":
      return /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "font-bold text-white/90", children }, key);
    case "em":
    case "i":
      return /* @__PURE__ */ jsxRuntimeExports.jsx("em", { className: "italic text-white/80", children }, key);
    case "kbd":
      return /* @__PURE__ */ jsxRuntimeExports.jsx(
        "kbd",
        {
          className: "rounded border border-white/15 bg-white/[0.06] px-1.5 py-0.5 font-mono text-[0.8em] text-white/80",
          children
        },
        key
      );
    case "sub":
      return /* @__PURE__ */ jsxRuntimeExports.jsx("sub", { children }, key);
    case "sup":
      return /* @__PURE__ */ jsxRuntimeExports.jsx("sup", { children }, key);
    case "del":
    case "s":
      return /* @__PURE__ */ jsxRuntimeExports.jsx("del", { className: "text-white/40", children }, key);
    default:
      return /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.Fragment, { children }, key);
  }
}
function inlineNode(token, key, baseUrl) {
  if (token.startsWith("`")) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: CODE_CLASS, children: token.slice(1, -1) }, key);
  }
  if (token.startsWith("![")) {
    const split = token.indexOf("](");
    return imageNode(token.slice(2, split), token.slice(split + 2, -1), key, baseUrl);
  }
  if (token.startsWith("[")) {
    const split = token.indexOf("](");
    return linkNode(token.slice(split + 2, -1), token.slice(1, split), key, baseUrl);
  }
  if (token.startsWith("**") || token.startsWith("__")) {
    return pairedNode("strong", token.slice(2, -2), key, baseUrl);
  }
  if (token.startsWith("~~")) return pairedNode("del", token.slice(2, -2), key, baseUrl);
  if (token.startsWith("*")) return pairedNode("em", token.slice(1, -1), key, baseUrl);
  const lower = token.toLowerCase();
  if (lower.startsWith("<!--")) return null;
  if (lower.startsWith("<br")) return /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}, key);
  if (lower.startsWith("<img")) {
    return imageNode(attr(token, "alt") ?? "", attr(token, "src"), key, baseUrl, attr(token, "width"));
  }
  if (lower.startsWith("<a")) return linkNode(attr(token, "href"), innerHtml(token), key, baseUrl);
  const paired = /^<([a-z][a-z0-9]*)\b[^>]*>[\s\S]*<\/[a-z][a-z0-9]*\s*>$/i.exec(token);
  if (paired) return pairedNode(paired[1].toLowerCase(), innerHtml(token), key, baseUrl);
  return null;
}
function renderInline(text, keyPrefix, baseUrl) {
  const nodes = [];
  let cursor = 0;
  let match;
  INLINE.lastIndex = 0;
  while ((match = INLINE.exec(text)) !== null) {
    if (match.index > cursor) nodes.push(text.slice(cursor, match.index));
    const token = match[0];
    cursor = match.index + token.length;
    const node = inlineNode(token, `${keyPrefix}-${match.index}`, baseUrl);
    INLINE.lastIndex = cursor;
    if (node !== null) nodes.push(node);
  }
  if (cursor < text.length) nodes.push(text.slice(cursor));
  return nodes;
}
const BLOCK_TAG = /^(?:p|div|center|section|article|aside|main|header|footer|figure|figcaption|blockquote|details|summary|h[1-6]|ul|ol|li|table|thead|tbody|tfoot|tr|td|th|picture|dl|dt|dd|pre)$/i;
const TABLE_DELIMITER = /^\s*\|?(?:\s*:?-{1,}:?\s*\|)+\s*:?-{0,}:?\s*\|?\s*$/;
const ALIGN_CLASS = {
  left: "text-left",
  center: "text-center",
  right: "text-right"
};
function splitRow(line) {
  return line.trim().replace(/^\|/, "").replace(/\|$/, "").split("|").map((cell) => cell.trim());
}
function alignOf(cell) {
  const value = cell.trim();
  if (value.startsWith(":") && value.endsWith(":")) return "center";
  return value.endsWith(":") ? "right" : "left";
}
function tableNode(header, aligns, rows, key, baseUrl) {
  const alignClass = (column) => ALIGN_CLASS[aligns[column] ?? "left"];
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "mt-4 overflow-x-auto rounded-xl border border-white/[0.07] bg-white/[0.02]",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full border-collapse text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { className: "border-b border-white/[0.07] bg-white/[0.03]", children: header.map((cell, column) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "th",
          {
            className: cn(
              "px-3 py-2 text-[11px] font-bold uppercase tracking-[0.16em] text-white/70",
              alignClass(column)
            ),
            children: renderInline(cell, `${key}-h${column}`, baseUrl)
          },
          column
        )) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: rows.map((row, rowIndex) => /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { className: "border-b border-white/[0.04] last:border-b-0", children: header.map((_, column) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "td",
          {
            className: cn("px-3 py-2 align-top text-white/60", alignClass(column)),
            children: renderInline(row[column] ?? "", `${key}-${rowIndex}-${column}`, baseUrl)
          },
          column
        )) }, rowIndex)) })
      ] })
    },
    key
  );
}
function matchBlock(text, tag) {
  const openRe = new RegExp(`<${tag}\\b[^>]*>`, "gi");
  const closeRe = new RegExp(`</${tag}\\s*>`, "gi");
  const open = openRe.exec(text);
  if (!open || open.index !== 0) return null;
  let depth = 1;
  let cursor = openRe.lastIndex;
  while (depth > 0) {
    openRe.lastIndex = cursor;
    closeRe.lastIndex = cursor;
    const nextOpen = openRe.exec(text);
    const nextClose = closeRe.exec(text);
    if (!nextClose) return { inner: text.slice(cursor), length: text.length };
    if (nextOpen && nextOpen.index < nextClose.index) {
      depth += 1;
      cursor = openRe.lastIndex;
      continue;
    }
    depth -= 1;
    cursor = closeRe.lastIndex;
    if (depth === 0) {
      return { inner: text.slice(open[0].length, nextClose.index), length: cursor };
    }
  }
  return null;
}
const PRE_CLASS = "mt-4 overflow-x-auto rounded-xl border border-white/[0.07] bg-black/40 p-4 text-xs leading-relaxed text-white/70";
const QUOTE_CLASS = "mt-4 border-l-2 border-primary/40 pl-4 text-sm italic leading-relaxed text-white/55";
function htmlBlockNode(tag, open, inner, key, baseUrl) {
  const align = String(attr(open, "align") ?? (tag === "center" ? "center" : "")).toLowerCase();
  const alignClass = align === "center" ? "text-center" : align === "right" ? "text-right" : "";
  const heading = /^h([1-6])$/.exec(tag);
  if (heading) {
    const level = Math.min(Number(heading[1]), 3);
    const Tag = ["h3", "h4", "h5"][level - 1];
    const text = inner.replace(/\s*\n\s*/g, " ").trim();
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Tag,
      {
        id: slugify(text) || void 0,
        className: cn(HEADING_CLASSES[level - 1], alignClass),
        children: renderInline(text, key, baseUrl)
      },
      key
    );
  }
  if (tag === "pre") {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("pre", { className: PRE_CLASS, children: /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "font-mono", children: inner.replace(/^\n/, "").replace(/<\/?code[^>]*>/gi, "") }) }, key);
  }
  const children = parseBlocks(inner.split("\n"), baseUrl, `${key}i`);
  if (children.length === 0) return null;
  if (tag === "summary") {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "summary",
      {
        className: cn("cursor-pointer font-bold text-white/85 [&>*:first-child]:mt-0", alignClass),
        children
      },
      key
    );
  }
  if (tag === "details") {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "details",
      {
        className: "mt-4 rounded-xl border border-white/[0.07] bg-white/[0.02] p-4 [&>*:first-child]:mt-0",
        children
      },
      key
    );
  }
  if (tag === "blockquote") {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("blockquote", { className: cn(QUOTE_CLASS, alignClass), children }, key);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("mt-4 [&>*:first-child]:mt-0", alignClass), children }, key);
}
function parseBlocks(lines, baseUrl, seed = "b") {
  const blocks = [];
  let paragraph = [];
  let list = null;
  let quote = [];
  const key = () => `${seed}-${blocks.length}`;
  const flushParagraph = () => {
    if (paragraph.length === 0) return;
    const text = paragraph.join(" ");
    paragraph = [];
    const nodes = renderInline(text, key(), baseUrl);
    if (nodes.every((node) => typeof node === "string" && !node.trim())) return;
    blocks.push(
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-sm leading-relaxed text-white/60", children: nodes }, key())
    );
  };
  const flushList = () => {
    if (!list) return;
    const Tag = list.ordered ? "ol" : "ul";
    const items = list.items;
    list = null;
    blocks.push(
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Tag,
        {
          className: cn(
            "mt-3 space-y-1.5 pl-5 text-sm leading-relaxed text-white/60",
            Tag === "ol" ? "list-decimal" : "list-disc"
          ),
          children: items.map((item, index) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: "marker:text-primary/70", children: renderInline(item, `${key()}-${index}`, baseUrl) }, index))
        },
        key()
      )
    );
  };
  const flushQuote = () => {
    if (quote.length === 0) return;
    const text = quote.join(" ");
    quote = [];
    blocks.push(
      /* @__PURE__ */ jsxRuntimeExports.jsx("blockquote", { className: QUOTE_CLASS, children: renderInline(text, key(), baseUrl) }, key())
    );
  };
  const flushAll = () => {
    flushParagraph();
    flushList();
    flushQuote();
  };
  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    if (/^\s*```/.test(line)) {
      flushAll();
      const body = [];
      index += 1;
      while (index < lines.length && !/^\s*```/.test(lines[index])) {
        body.push(lines[index]);
        index += 1;
      }
      blocks.push(
        /* @__PURE__ */ jsxRuntimeExports.jsx("pre", { className: PRE_CLASS, children: /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "font-mono", children: body.join("\n") }) }, key())
      );
      continue;
    }
    if (/^\s*<!--/.test(line) && !line.includes("-->")) {
      flushAll();
      while (index < lines.length && !lines[index].includes("-->")) index += 1;
      continue;
    }
    if (!line.trim()) {
      flushAll();
      continue;
    }
    if (/^\s*(?:[-*_]\s*){3,}$/.test(line) || /^\s*<hr\s*\/?>\s*$/i.test(line)) {
      flushAll();
      blocks.push(/* @__PURE__ */ jsxRuntimeExports.jsx("hr", { className: "mt-6 border-white/[0.07]" }, key()));
      continue;
    }
    const heading = /^(#{1,6})\s+(.*)$/.exec(line);
    if (heading) {
      flushAll();
      const level = Math.min(heading[1].length, 3);
      const Tag = ["h3", "h4", "h5"][level - 1];
      blocks.push(
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Tag,
          {
            id: slugify(heading[2]) || void 0,
            className: HEADING_CLASSES[level - 1],
            children: renderInline(heading[2], key(), baseUrl)
          },
          key()
        )
      );
      continue;
    }
    const next = lines[index + 1] ?? "";
    if (line.includes("|") && next.includes("|") && TABLE_DELIMITER.test(next)) {
      flushAll();
      const header = splitRow(line);
      const aligns = splitRow(next).map(alignOf);
      const rows = [];
      index += 2;
      while (index < lines.length && lines[index].trim() && lines[index].includes("|")) {
        rows.push(splitRow(lines[index]));
        index += 1;
      }
      index -= 1;
      blocks.push(tableNode(header, aligns, rows, key(), baseUrl));
      continue;
    }
    const opener = /^\s*<([a-z][a-z0-9]*)\b[^>]*>/i.exec(line);
    if (opener && BLOCK_TAG.test(opener[1])) {
      const tag = opener[1].toLowerCase();
      const rest = lines.slice(index).join("\n");
      const span = matchBlock(rest.slice(rest.indexOf("<")), tag);
      if (span) {
        flushAll();
        const consumed = rest.slice(0, rest.indexOf("<") + span.length).split("\n").length - 1;
        const node = htmlBlockNode(tag, opener[0], span.inner, key(), baseUrl);
        if (node) blocks.push(node);
        index += consumed;
        continue;
      }
    }
    const bullet = /^\s*[-*+]\s+(.*)$/.exec(line);
    const numbered = /^\s*\d+[.)]\s+(.*)$/.exec(line);
    if (bullet || numbered) {
      flushParagraph();
      flushQuote();
      const ordered = Boolean(numbered);
      if (!list || list.ordered !== ordered) {
        flushList();
        list = { ordered, items: [] };
      }
      list.items.push((bullet ?? numbered)[1]);
      continue;
    }
    const quoted = /^\s*>\s?(.*)$/.exec(line);
    if (quoted) {
      flushParagraph();
      flushList();
      quote.push(quoted[1]);
      continue;
    }
    flushList();
    flushQuote();
    paragraph.push(line.trim());
  }
  flushAll();
  return blocks;
}
function MarkdownBlock({ source, className, baseUrl }) {
  const text = String(source ?? "").replace(/\r\n/g, "\n").trim();
  if (!text) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("min-w-0 break-words [&>*:first-child]:mt-0", className), children: parseBlocks(text.split("\n"), baseUrl) });
}
function StatCard({
  icon: Icon,
  label,
  value
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-white/[0.07] bg-white/[0.02] px-4 py-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-white/40", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-3.5 w-3.5 text-primary" }),
      label
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1.5 font-display text-xl font-black tracking-tight text-foreground", children: value })
  ] });
}
function DetailRow({ label, children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4 py-2.5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold uppercase tracking-[0.16em] text-white/35", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "min-w-0 text-right text-sm font-semibold text-white/75", children })
  ] });
}
function SourceCodeTab({ extensionId }) {
  var _a;
  const hasRuntime = typeof window !== "undefined" && typeof ((_a = window.tatakaiRuntime) == null ? void 0 : _a.getExtensionSourceCode) === "function";
  const { data, isLoading, error } = useQuery({
    queryKey: ["extension-source-code", extensionId],
    queryFn: () => window.tatakaiRuntime.getExtensionSourceCode(extensionId),
    enabled: hasRuntime,
    staleTime: Infinity
  });
  if (!hasRuntime) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-white/[0.07] bg-white/[0.02] p-8 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FileCode2, { className: "mx-auto h-8 w-8 text-white/20" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 font-bold text-white/80", children: "Source view needs the desktop app" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-white/45", children: "The bundle is read from the extension sandbox, which only runs on desktop." })
    ] });
  }
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-3 py-16 text-sm font-semibold text-white/50", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin text-primary" }),
      "Reading bundle…"
    ] });
  }
  if (error || !(data == null ? void 0 : data.success)) {
    const message = (data == null ? void 0 : data.error) ?? (error instanceof Error ? error.message : "Unknown error");
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-destructive/25 bg-destructive/10 p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "flex items-center gap-2 font-bold text-destructive", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "h-4 w-4" }),
        "Source unavailable"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-white/55", children: message })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
    data.truncated ? /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "flex items-start gap-2 rounded-2xl border border-amber/25 bg-amber/10 px-4 py-3 text-sm font-semibold text-amber", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "mt-0.5 h-4 w-4 shrink-0" }),
      "Truncated to 50 KB — the full bundle is",
      " ",
      formatBytes(data.totalBytes) ?? "larger than the display limit",
      "."
    ] }) : null,
    /* @__PURE__ */ jsxRuntimeExports.jsx("pre", { className: "max-h-[32rem] overflow-auto rounded-2xl border border-white/[0.07] bg-black/40 p-4 text-xs leading-relaxed text-white/70", children: /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "whitespace-pre-wrap font-mono", children: data.content }) })
  ] });
}
function VersionEntry({
  version,
  isLatest,
  onInstall,
  canInstall,
  baseUrl
}) {
  const published = formatRelative(version.publishedAt);
  const size = formatBytes(version.sizeBytes);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center justify-between gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "rounded-full border border-primary/30 bg-primary/15 px-3 py-1 text-xs font-black text-primary", children: [
          "v",
          version.version
        ] }),
        isLatest ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[11px] font-bold text-white/55", children: "Latest" }) : null,
        version.isStable ? null : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full border border-amber/30 bg-amber/15 px-2.5 py-1 text-[11px] font-bold text-amber", children: "Pre-release" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 text-xs font-semibold text-white/35", children: [
        size ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: size }) : null,
        published ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: published }) : null,
        canInstall ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: onInstall,
            className: "font-bold text-primary hover:underline",
            children: "Install this version"
          }
        ) : null
      ] })
    ] }),
    version.changelog ? /* @__PURE__ */ jsxRuntimeExports.jsx(MarkdownBlock, { source: version.changelog, className: "mt-3", baseUrl }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-sm text-white/40", children: "No release notes for this version." }),
    version.releaseUrl ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "a",
      {
        href: version.releaseUrl,
        target: "_blank",
        rel: "noreferrer noopener",
        className: "mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-white/50 hover:text-white",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "h-3.5 w-3.5" }),
          "Release page"
        ]
      }
    ) : null
  ] });
}
const TABS = [
  { id: "overview", label: "Overview" },
  { id: "versions", label: "What's new" },
  { id: "permissions", label: "Permissions" },
  { id: "source", label: "Source" }
];
function ExtensionDetailPage() {
  var _a;
  const { extensionId } = useParams();
  const isNative = useIsNativeApp();
  const isDesktopApp = useIsDesktopApp();
  const [tab, setTab] = reactExports.useState("overview");
  const [debugOpen, setDebugOpen] = reactExports.useState(false);
  const { extension, isLoading, error, isFromService } = useStoreExtensionDetail(extensionId);
  const installer = useExtensionInstaller();
  const visual = typeVisual(extension == null ? void 0 : extension.type);
  const state = extension ? installer.stateFor(extension) : "idle";
  const versions = reactExports.useMemo(() => {
    if (!extension) return [];
    const list = [...extension.versions];
    if (extension.latestVersion && !list.some((item) => item.id === extension.latestVersion.id)) {
      list.unshift(extension.latestVersion);
    }
    return list;
  }, [extension]);
  const readmeBase = reactExports.useMemo(
    () => githubRawBase(extension == null ? void 0 : extension.githubRepoUrl),
    [extension == null ? void 0 : extension.githubRepoUrl]
  );
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex min-h-screen flex-col items-center justify-center gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Background, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-8 w-8 animate-spin text-primary" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-bold uppercase tracking-[0.2em] text-white/40", children: "Loading extension" })
    ] });
  }
  if (error || !extension) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Background, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Puzzle, { className: "h-12 w-12 text-white/15" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-black tracking-tight", children: "Extension not found" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 max-w-md text-sm text-white/45", children: (error == null ? void 0 : error.message) ?? "It may have been unpublished, or the id in this link no longer exists in the catalogue." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, className: "rounded-full", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/extensions", children: "Back to the store" }) })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative min-h-screen", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Background, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: cn(
          "relative z-10 mx-auto max-w-[1500px] px-4 py-6 pb-24 sm:px-6 md:pb-6",
          isDesktopApp ? "md:pl-6" : "md:pl-32"
        ),
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Link,
            {
              to: "/extensions",
              className: "inline-flex items-center gap-2 text-sm font-semibold text-white/50 transition-colors hover:text-white",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" }),
                "Store"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "relative mt-4 overflow-hidden rounded-[1.75rem] border border-white/[0.07] bg-surface p-6 sm:p-8", children: [
            extension.banner ? /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: extension.banner,
                alt: "",
                className: "absolute inset-0 h-full w-full object-cover opacity-35",
                onError: (event) => {
                  event.currentTarget.style.display = "none";
                }
              }
            ) : null,
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("absolute inset-0 bg-gradient-to-br", visual.glowClass) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex flex-col gap-6 md:flex-row md:items-end md:justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-5 sm:flex-row sm:items-end", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ExtensionIcon, { extension, size: "xl" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ExtensionChips, { extension }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display mt-3 text-3xl font-black leading-tight tracking-tight text-foreground sm:text-5xl", children: extension.name }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-2 text-sm font-semibold text-white/55", children: [
                    extension.author,
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mx-2 text-white/20", children: "·" }),
                    "v",
                    extension.version,
                    formatRelative(extension.updatedAt) ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mx-2 text-white/20", children: "·" }),
                      "updated ",
                      formatRelative(extension.updatedAt)
                    ] }) : null
                  ] }),
                  extension.categories.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 flex flex-wrap gap-1.5", children: extension.categories.map((category) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "rounded-lg border border-white/[0.07] bg-white/[0.03] px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-white/45",
                      children: category
                    },
                    category
                  )) }) : null
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-start gap-2 md:items-end", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  InstallButton,
                  {
                    state,
                    onClick: () => installer.toggle(extension),
                    size: "lg",
                    label: state === "installed" ? "Remove" : state === "installing" ? "Working…" : state === "not_loaded" ? "Installed (not loaded)" : "Get",
                    className: "min-w-[11rem]"
                  }
                ),
                !isNative ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-white/40", children: "Runs in the desktop app's sandbox" }) : null,
                isNative && state !== "idle" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    onClick: () => setDebugOpen(true),
                    className: "inline-flex items-center gap-1.5 text-xs font-bold text-white/40 hover:text-white",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Bug, { className: "h-3.5 w-3.5" }),
                      "Open debug window"
                    ]
                  }
                ) : null
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 grid grid-cols-2 gap-3 lg:grid-cols-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { icon: Download, label: "Installs", value: formatCompact(extension.installs) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { icon: Check, label: "Downloads", value: formatCompact(extension.downloads) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { icon: Eye, label: "Views", value: formatCompact(extension.views) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              StatCard,
              {
                icon: HeartPulse,
                label: "Health",
                value: formatHealth(extension.healthScore) ?? "—"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_22rem]", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-flex max-w-full items-center gap-1 overflow-x-auto rounded-full border border-white/[0.07] bg-white/[0.03] p-1 scrollbar-none", children: TABS.map((entry) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  onClick: () => setTab(entry.id),
                  "aria-pressed": tab === entry.id,
                  className: cn(
                    "inline-flex flex-shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full px-4 py-1.5 text-sm font-semibold transition-colors",
                    tab === entry.id ? "bg-primary text-primary-foreground shadow-sm shadow-primary/25" : "text-white/55 hover:text-white"
                  ),
                  children: [
                    entry.id === "source" ? /* @__PURE__ */ jsxRuntimeExports.jsx(FileCode2, { className: "h-3.5 w-3.5" }) : null,
                    entry.label
                  ]
                },
                entry.id
              )) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6", children: [
                tab === "overview" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-base leading-relaxed text-white/70", children: extension.description || "The publisher did not provide a description." }),
                  extension.readme ? /* @__PURE__ */ jsxRuntimeExports.jsx(MarkdownBlock, { source: extension.readme, baseUrl: readmeBase }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "rounded-2xl border border-white/[0.07] bg-white/[0.02] p-6 text-sm text-white/40", children: "No readme published for this extension." })
                ] }) : null,
                tab === "versions" ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: versions.length > 0 ? versions.map((version, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  VersionEntry,
                  {
                    version,
                    isLatest: index === 0,
                    canInstall: index !== 0,
                    baseUrl: readmeBase,
                    onInstall: () => installer.install.mutate({ extension, version })
                  },
                  version.id || version.version
                )) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "rounded-2xl border border-white/[0.07] bg-white/[0.02] p-6 text-sm text-white/40", children: isFromService ? "No releases published yet." : "This extension was sideloaded from a local bundle, so the store has no release history for it." }) }) : null,
                tab === "permissions" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "flex items-center gap-2 font-display text-lg font-bold tracking-tight text-foreground", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "h-4 w-4 text-primary" }),
                      "Requested permissions"
                    ] }),
                    extension.permissions.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-3 space-y-2", children: extension.permissions.map((permission) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "li",
                      {
                        className: "flex items-center gap-3 rounded-xl border border-white/[0.07] bg-white/[0.02] px-3 py-2.5 font-mono text-xs text-white/70",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-1.5 w-1.5 shrink-0 rounded-full bg-primary" }),
                          permission
                        ]
                      },
                      permission
                    )) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-sm text-white/40", children: "This extension requests no special permissions." })
                  ] }),
                  extension.capabilities.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-lg font-bold tracking-tight text-foreground", children: "Capabilities" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 flex flex-wrap gap-1.5", children: extension.capabilities.map((capability) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: "rounded-lg border border-white/[0.07] bg-white/[0.03] px-2.5 py-1 text-xs font-semibold text-white/60",
                        children: capability
                      },
                      capability
                    )) })
                  ] }) : null,
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3 rounded-2xl border border-primary/25 bg-primary/10 p-4", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "mt-0.5 h-4 w-4 shrink-0 text-primary" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm leading-relaxed text-white/65", children: "Extensions run in a sandbox with no filesystem access and no access to your account credentials. Network requests are limited to the domains listed above." })
                  ] })
                ] }) : null,
                tab === "source" && extensionId ? /* @__PURE__ */ jsxRuntimeExports.jsx(SourceCodeTab, { extensionId }) : null
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "space-y-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-base font-bold tracking-tight text-foreground", children: "Details" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 divide-y divide-white/[0.05]", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(DetailRow, { label: "Publisher", children: extension.author }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(DetailRow, { label: "Type", children: visual.label }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(DetailRow, { label: "Version", children: [
                    "v",
                    extension.version
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(DetailRow, { label: "Status", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "capitalize", children: extension.status }) }),
                  ((_a = extension.latestVersion) == null ? void 0 : _a.sizeBytes) ? /* @__PURE__ */ jsxRuntimeExports.jsx(DetailRow, { label: "Size", children: formatBytes(extension.latestVersion.sizeBytes) }) : null,
                  formatRelative(extension.updatedAt) ? /* @__PURE__ */ jsxRuntimeExports.jsx(DetailRow, { label: "Updated", children: formatRelative(extension.updatedAt) }) : null,
                  formatRelative(extension.createdAt) ? /* @__PURE__ */ jsxRuntimeExports.jsx(DetailRow, { label: "Published", children: formatRelative(extension.createdAt) }) : null,
                  /* @__PURE__ */ jsxRuntimeExports.jsx(DetailRow, { label: "Identifier", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "break-all font-mono text-xs", children: extension.slug }) })
                ] })
              ] }),
              extension.tags.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-base font-bold tracking-tight text-foreground", children: "Tags" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 flex flex-wrap gap-1.5", children: extension.tags.map((tag) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "rounded-full border border-white/[0.07] bg-white/[0.03] px-2.5 py-1 text-xs font-semibold text-white/55",
                    children: tag
                  },
                  tag
                )) })
              ] }) : null,
              extension.githubRepoUrl ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "a",
                {
                  href: extension.githubRepoUrl,
                  target: "_blank",
                  rel: "noreferrer noopener",
                  className: "flex items-center gap-3 rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5 transition-colors hover:border-white/15 hover:bg-white/[0.04]",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Github, { className: "h-5 w-5 text-white/60" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-bold text-white/85", children: "Source repository" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate text-xs text-white/40", children: extension.githubRepoUrl.replace(/^https?:\/\/(www\.)?/, "") })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "h-4 w-4 shrink-0 text-white/30" })
                  ]
                }
              ) : null,
              /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-base font-bold tracking-tight text-foreground", children: "About .kai bundles" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-2 text-sm leading-relaxed text-white/50", children: [
                  "Tatakai extensions ship as a single ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "font-mono text-primary", children: ".kai" }),
                  " ",
                  "file: a signed manifest plus a sandboxed JavaScript bundle. Installing one never executes code outside the sandbox."
                ] })
              ] })
            ] })
          ] })
        ]
      }
    ),
    debugOpen ? /* @__PURE__ */ jsxRuntimeExports.jsx(ExtensionDebugWindow, { onClose: () => setDebugOpen(false) }) : null
  ] });
}
export {
  ExtensionDetailPage as default
};
