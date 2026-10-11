import { j as jsxRuntimeExports } from "./react-vendor.CAo4XUiA.js";
import { fz as sanitizeEmbeds, fk as CommentContent, j as cn, f$ as CommentEmbeds } from "./index.C6yfkT5T.js";
function serializeCommunityDoc(doc) {
  const content = (doc.content ?? "").trim();
  const embeds = sanitizeEmbeds(doc.embeds);
  if (!content && embeds.length === 0) return "";
  const stored = { v: 1, content, embeds };
  return JSON.stringify(stored);
}
function parseCommunityDoc(raw) {
  const s = (raw ?? "").trim();
  if (!s) return { content: "", embeds: [] };
  if (s.startsWith("{")) {
    try {
      const o = JSON.parse(s);
      if (o && typeof o === "object" && ("content" in o || "embeds" in o)) {
        return {
          content: typeof o.content === "string" ? o.content : "",
          embeds: sanitizeEmbeds(o.embeds)
        };
      }
    } catch {
    }
  }
  return { content: s, embeds: [] };
}
function communityDocIsEmpty(raw) {
  const doc = parseCommunityDoc(raw);
  return !doc.content.trim() && doc.embeds.length === 0;
}
function CommunityRichContent({
  value,
  className,
  bodyClassName
}) {
  const { content, embeds } = parseCommunityDoc(value);
  if (!content.trim() && embeds.length === 0) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className, children: [
    content.trim() && /* @__PURE__ */ jsxRuntimeExports.jsx(CommentContent, { content, className: cn("text-white/80", bodyClassName) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CommentEmbeds, { embeds })
  ] });
}
export {
  CommunityRichContent as C,
  communityDocIsEmpty as c,
  parseCommunityDoc as p,
  serializeCommunityDoc as s
};
