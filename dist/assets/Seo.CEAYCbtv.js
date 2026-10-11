import { j as jsxRuntimeExports } from "./react-vendor.CAo4XUiA.js";
import { bH as Helmet } from "./vendor.CJyRs4QS.js";
const SITE_NAME = "Tatakai";
const SITE_ORIGIN = "https://tatakai.me";
const DEFAULT_IMAGE = `${SITE_ORIGIN}/assets/logo/tatakaibanner.png`;
function clamp(text, max = 200) {
  const t = text.replace(/\s+/g, " ").trim();
  if (t.length <= max) return t;
  return t.slice(0, max - 1).trimEnd() + "…";
}
function absolute(pathOrUrl) {
  const s = (pathOrUrl ?? "").trim();
  if (!s) return void 0;
  if (/^https?:\/\//i.test(s)) return s;
  return `${SITE_ORIGIN}${s.startsWith("/") ? s : `/${s}`}`;
}
function Seo({
  title,
  description,
  image,
  canonicalPath,
  kind = "website",
  suffix,
  imageAlt
}) {
  const fullTitle = suffix === "" ? title : `${title}${suffix ?? ` — ${SITE_NAME}`}`;
  const desc = clamp(description || "");
  const img = absolute(image) || DEFAULT_IMAGE;
  const canonical = absolute(canonicalPath) || (typeof window !== "undefined" ? window.location.href.split("?")[0] : SITE_ORIGIN);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Helmet, { prioritizeSeoTags: true, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("title", { children: fullTitle }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("meta", { name: "title", content: fullTitle }),
    desc && /* @__PURE__ */ jsxRuntimeExports.jsx("meta", { name: "description", content: desc }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("link", { rel: "canonical", href: canonical }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("meta", { property: "og:type", content: kind }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("meta", { property: "og:title", content: fullTitle }),
    desc && /* @__PURE__ */ jsxRuntimeExports.jsx("meta", { property: "og:description", content: desc }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("meta", { property: "og:url", content: canonical }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("meta", { property: "og:site_name", content: SITE_NAME }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("meta", { property: "og:image", content: img }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("meta", { property: "og:image:alt", content: imageAlt || fullTitle }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("meta", { name: "twitter:card", content: "summary_large_image" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("meta", { name: "twitter:title", content: fullTitle }),
    desc && /* @__PURE__ */ jsxRuntimeExports.jsx("meta", { name: "twitter:description", content: desc }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("meta", { name: "twitter:image", content: img })
  ] });
}
export {
  Seo as S
};
