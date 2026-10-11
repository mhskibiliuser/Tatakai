import { j as jsxRuntimeExports } from "./react-vendor.CAo4XUiA.js";
import { j as cn } from "./index.C6yfkT5T.js";
const SCROLL_FADE_MASK = "linear-gradient(to right, transparent, black 1.25rem, black calc(100% - 1.25rem), transparent)";
function PillGroup({
  options,
  value,
  onChange,
  label,
  className
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      role: "tablist",
      "aria-label": label,
      className: cn(
        "flex max-w-full items-center gap-1.5 overflow-x-auto rounded-full border border-white/10 bg-black/30 p-1.5 backdrop-blur-md scrollbar-hide no-scrollbar [-webkit-overflow-scrolling:touch] [touch-action:pan-x_pan-y] overscroll-x-contain",
        className
      ),
      style: { WebkitMaskImage: SCROLL_FADE_MASK, maskImage: SCROLL_FADE_MASK },
      children: options.map((option) => {
        const active = value === option.id;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            role: "tab",
            onClick: () => onChange(option.id),
            "aria-selected": active,
            className: cn(
              "group inline-flex flex-shrink-0 items-center gap-2 whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
              active ? "bg-primary text-primary-foreground shadow-md shadow-primary/30" : "text-white/55 hover:bg-white/[0.06] hover:text-white"
            ),
            children: [
              option.icon && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: cn("transition-opacity", active ? "opacity-100" : "opacity-60 group-hover:opacity-100"), children: option.icon }),
              option.label
            ]
          },
          option.id
        );
      })
    }
  );
}
export {
  PillGroup as P
};
