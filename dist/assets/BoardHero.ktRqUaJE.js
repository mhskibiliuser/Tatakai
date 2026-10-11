import { j as jsxRuntimeExports, L as Link } from "./react-vendor.CAo4XUiA.js";
import { j as cn } from "./index.C6yfkT5T.js";
import { R as RankedPosterRail } from "./RankedPosterRail.BR6TE-Dw.js";
import { A as AnimatePresence, m as motion } from "./motion.DVGLRFCH.js";
import { aJ as Play } from "./icons.C2gBBarQ.js";
function BoardHero({
  eyebrow,
  heading,
  description,
  leader,
  leaderPrefix = "#1",
  ctaLabel = "Watch now",
  stats = [],
  backdrop,
  items,
  isLoading,
  children,
  className
}) {
  const art = backdrop || (leader == null ? void 0 : leader.poster);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "section",
    {
      className: cn(
        "relative overflow-hidden rounded-[2rem] border border-white/[0.07] bg-card",
        className
      ),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: art && /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.img,
          {
            src: art,
            alt: "",
            "aria-hidden": true,
            initial: { opacity: 0, scale: 1.06 },
            animate: { opacity: 0.38, scale: 1 },
            exit: { opacity: 0 },
            transition: { duration: 0.8, ease: "easeOut" },
            className: "absolute inset-0 h-full w-full object-cover"
          },
          art
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
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] font-bold uppercase tracking-[0.28em] text-primary", children: eyebrow }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display mt-3 text-4xl font-black leading-[1.05] tracking-tight text-foreground sm:text-5xl xl:text-[3.75rem]", children: heading }),
                  leader && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-4 flex items-baseline gap-2 text-lg font-bold text-white/85", children: [
                    leaderPrefix && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-black uppercase tracking-wider text-primary", children: leaderPrefix }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "line-clamp-1", children: leader.title })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 max-w-lg text-sm leading-relaxed text-white/55 sm:text-base", children: description }),
                  stats.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-5 flex flex-wrap gap-2", children: stats.map((stat) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-xs font-semibold text-white/70 backdrop-blur-sm",
                      children: stat
                    },
                    stat
                  )) }),
                  leader && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Link,
                    {
                      to: leader.href,
                      className: "group mt-7 inline-flex items-center gap-2 rounded-full bg-gradient-to-b from-primary to-secondary px-6 py-3 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:from-primary/90 hover:to-secondary/90 hover:shadow-primary/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "h-4 w-4 fill-primary-foreground transition-transform group-hover:scale-110" }),
                        ctaLabel
                      ]
                    }
                  )
                ]
              },
              heading
            ) }),
            children && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8", children })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-w-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(RankedPosterRail, { items, isLoading }) })
        ] })
      ]
    }
  );
}
export {
  BoardHero as B
};
