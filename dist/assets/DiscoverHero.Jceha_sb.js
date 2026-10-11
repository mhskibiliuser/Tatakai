import { r as reactExports, j as jsxRuntimeExports, L as Link } from "./react-vendor.CAo4XUiA.js";
import { h as getHighQualityPoster, j as cn } from "./index.C6yfkT5T.js";
import "./vendor.CJyRs4QS.js";
import { f as useRankedBoard, R as RANKED_BOARDS, g as usePrefetchRankedBoard, m as mediaToPosterItem } from "./DiscoverPosterGrid.CIdiGIb1.js";
import { R as RankedPosterRail } from "./RankedPosterRail.BR6TE-Dw.js";
import { A as AnimatePresence, m as motion } from "./motion.DVGLRFCH.js";
import { v as ArrowRight } from "./icons.C2gBBarQ.js";
function DiscoverHero({ className }) {
  const [index, setIndex] = reactExports.useState(0);
  const board = RANKED_BOARDS[index];
  const { data, isLoading } = useRankedBoard(board.id);
  const prefetch = usePrefetchRankedBoard();
  const media = (data == null ? void 0 : data.media) ?? [];
  const leader = media[0];
  const backdrop = (leader == null ? void 0 : leader.bannerImage) ?? (leader ? getHighQualityPoster(leader.coverImageLarge ?? "", leader.anilistId) : void 0);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "section",
    {
      className: cn(
        "relative overflow-hidden rounded-[2rem] border border-white/[0.07] bg-card",
        className
      ),
      "aria-roledescription": "carousel",
      "aria-label": "Ranked boards",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: backdrop && /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.img,
          {
            src: backdrop,
            alt: "",
            "aria-hidden": true,
            initial: { opacity: 0, scale: 1.06 },
            animate: { opacity: 0.38, scale: 1 },
            exit: { opacity: 0 },
            transition: { duration: 0.8, ease: "easeOut" },
            className: "absolute inset-0 h-full w-full object-cover"
          },
          backdrop
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-card via-card/85 to-transparent" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-card via-transparent to-card/60" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-[radial-gradient(120%_90%_at_15%_110%,hsl(var(--primary)/0.28),transparent_60%)]" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative grid gap-10 p-6 sm:p-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-center lg:gap-6 lg:p-14", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-xl", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0, y: 14 },
                animate: { opacity: 1, y: 0 },
                exit: { opacity: 0, y: -10 },
                transition: { duration: 0.35, ease: "easeOut" },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] font-bold uppercase tracking-[0.28em] text-primary", children: board.eyebrow }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display mt-3 text-4xl font-black leading-[1.05] tracking-tight text-foreground sm:text-5xl xl:text-[3.75rem]", children: board.heading }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 max-w-lg text-sm leading-relaxed text-white/55 sm:text-base", children: board.description }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Link,
                    {
                      to: board.cta.to,
                      className: "group mt-7 inline-flex items-center gap-2 rounded-full bg-gradient-to-b from-primary to-secondary px-6 py-3 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:from-primary/90 hover:to-secondary/90 hover:shadow-primary/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
                      children: [
                        board.cta.label,
                        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4 transition-transform group-hover:translate-x-0.5" })
                      ]
                    }
                  )
                ]
              },
              board.id
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8 flex items-center gap-2", children: RANKED_BOARDS.map((entry, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => setIndex(i),
                onMouseEnter: () => prefetch(entry.id),
                onFocus: () => prefetch(entry.id),
                "aria-label": entry.heading,
                "aria-current": i === index,
                className: cn(
                  "h-1.5 rounded-full transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
                  i === index ? "w-8 bg-primary" : "w-1.5 bg-white/25 hover:bg-white/50"
                )
              },
              entry.id
            )) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-w-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            RankedPosterRail,
            {
              items: media.map((item, i) => mediaToPosterItem(item, i)),
              isLoading
            }
          ) })
        ] })
      ]
    }
  );
}
export {
  DiscoverHero as D
};
