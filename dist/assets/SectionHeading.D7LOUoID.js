import { j as jsxRuntimeExports } from "./react-vendor.CAo4XUiA.js";
import { j as cn } from "./index.C6yfkT5T.js";
function SectionHeading({ eyebrow, title, meta, action, className }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: cn("flex flex-wrap items-end justify-between gap-3", className), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      eyebrow && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] font-bold uppercase tracking-[0.28em] text-primary", children: eyebrow }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display mt-1.5 text-2xl font-black tracking-tight text-foreground sm:text-[1.75rem]", children: title })
    ] }),
    action ?? (meta && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-white/40", children: meta }))
  ] });
}
export {
  SectionHeading as S
};
