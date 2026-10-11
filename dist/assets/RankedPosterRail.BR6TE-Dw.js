import { j as jsxRuntimeExports, L as Link } from "./react-vendor.CAo4XUiA.js";
import { h as getHighQualityPoster, j as cn } from "./index.C6yfkT5T.js";
import "./vendor.CJyRs4QS.js";
import { h as RAIL_LENGTH, i as handlePosterFallback, r as rankBadgeClass } from "./DiscoverPosterGrid.CIdiGIb1.js";
import { aI as Star } from "./icons.C2gBBarQ.js";
const SCALE_STEP = 0.085;
const OVERLAP = 0.115;
const STEP_DOWN = 0.075;
const railScale = (index) => Math.max(0.4, 1 - index * SCALE_STEP);
const FAN_SPAN = Array.from({ length: RAIL_LENGTH }, (_, index) => railScale(index)).reduce((sum, s) => sum + s, 0) - (RAIL_LENGTH - 1) * OVERLAP;
const RAIL_SHARE = `${(95 / FAN_SPAN).toFixed(3)}%`;
function railStyle(index) {
  return {
    width: `calc(var(--rail) * ${railScale(index).toFixed(3)})`,
    marginTop: `calc(var(--rail) * ${(index * STEP_DOWN).toFixed(3)})`,
    marginLeft: index === 0 ? void 0 : `calc(var(--rail) * -${OVERLAP})`,
    zIndex: RAIL_LENGTH - index
  };
}
function RankedPosterRail({ items, isLoading, className }) {
  const shown = items.slice(0, RAIL_LENGTH);
  const showSkeleton = isLoading && shown.length === 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: cn(
        "flex w-full items-start justify-end [--rail-cap:96px] sm:[--rail-cap:132px] lg:[--rail-cap:158px] xl:[--rail-cap:186px]",
        className
      ),
      style: { "--rail": `min(var(--rail-cap), ${RAIL_SHARE})` },
      children: (showSkeleton ? Array.from({ length: RAIL_LENGTH }) : shown).map((entry, index) => {
        const style = railStyle(index);
        if (!entry) {
          return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative shrink-0", style, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-[2/3] w-full animate-pulse rounded-2xl border border-white/5 bg-white/[0.04]" }) }, `rail-skeleton-${index}`);
        }
        const item = entry;
        const rank = index + 1;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Link,
          {
            to: item.href,
            title: item.title,
            "aria-label": `#${rank} ${item.title}`,
            className: "group relative shrink-0 transition-transform duration-300 hover:z-20 hover:-translate-y-2 focus-visible:z-20 focus-visible:-translate-y-2 focus-visible:outline-none",
            style,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: cn(
                    "relative aspect-[2/3] w-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] shadow-2xl shadow-black/60",
                    rank === 1 && "ring-2 ring-primary/60"
                  ),
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "img",
                      {
                        src: getHighQualityPoster(item.poster, item.anilistId),
                        alt: "",
                        "aria-hidden": true,
                        loading: rank <= 3 ? "eager" : "lazy",
                        decoding: "async",
                        className: "h-full w-full object-cover transition-transform duration-500 group-hover:scale-105",
                        onError: (event) => handlePosterFallback(event, item.poster)
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-70" }),
                    item.score && rank <= 3 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute bottom-2 left-2 flex items-center gap-1 rounded-full bg-black/70 px-2 py-0.5 text-[10px] font-bold text-white backdrop-blur-sm", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "h-2.5 w-2.5 fill-amber text-amber" }),
                      item.score
                    ] })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: cn(
                    "absolute -left-2 -top-2 flex items-center justify-center rounded-full font-black tabular-nums",
                    rank === 1 ? "h-9 w-9 text-base" : "h-7 w-7 text-xs",
                    rankBadgeClass(rank)
                  ),
                  children: rank
                }
              )
            ]
          },
          item.key
        );
      })
    }
  );
}
export {
  RankedPosterRail as R
};
