import { j as jsxRuntimeExports, L as Link } from "./react-vendor.CAo4XUiA.js";
import { B as Button } from "./index.C6yfkT5T.js";
import { S as StatusVideoBackground } from "./StatusVideoBackground.B0c-3W3u.js";
import { m as motion } from "./motion.DVGLRFCH.js";
import { bA as House, S as Search, u as ArrowLeft } from "./icons.C2gBBarQ.js";
import "./vendor.CJyRs4QS.js";
import "./tanstack.DPr3OB19.js";
import "./supabase.WuRMX5Dg.js";
import "./radix.BiK9uYXL.js";
import "./hls.BlgtCWcq.js";
import "./editor.Dxw8dtyw.js";
import "./charts.Dr1fgDJ-.js";
const NotFound = () => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen flex items-center justify-center p-4 overflow-hidden relative", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(StatusVideoBackground, { overlayColor: "from-primary/10 via-background/90 to-background/95" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 20, scale: 0.95 },
        animate: { opacity: 1, y: 0, scale: 1 },
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
        className: "relative z-10 text-center max-w-lg w-full",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { scale: 0.5, opacity: 0 },
              animate: { scale: 1, opacity: 1 },
              transition: { duration: 0.5, delay: 0.2 },
              className: "relative mb-8",
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative inline-block", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-[120px] md:text-[180px] font-display font-black text-transparent bg-clip-text bg-gradient-to-b from-primary via-primary/60 to-primary/20 leading-none select-none", children: "404" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  motion.div,
                  {
                    className: "absolute inset-0 text-[120px] md:text-[180px] font-display font-black text-primary/20 leading-none select-none",
                    animate: { x: [-2, 2, -2], opacity: [0.3, 0.5, 0.3] },
                    transition: { duration: 0.2, repeat: Infinity, repeatType: "reverse" },
                    children: "404"
                  }
                )
              ] })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 20 },
              animate: { opacity: 1, y: 0 },
              transition: { delay: 0.4 },
              className: "bg-card/50 backdrop-blur-xl border border-border/50 rounded-2xl p-8 shadow-2xl",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl md:text-3xl font-bold text-foreground mb-4", children: "Lost in the Void" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-lg mb-8", children: "The page you're looking for has vanished into another dimension. Let's get you back on track!" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  motion.div,
                  {
                    initial: { opacity: 0, y: 20 },
                    animate: { opacity: 1, y: 0 },
                    transition: { delay: 0.6 },
                    className: "flex flex-col sm:flex-row gap-3 justify-center",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, size: "lg", className: "gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(House, { className: "w-5 h-5" }),
                        "Back to Home"
                      ] }) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, variant: "outline", size: "lg", className: "gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/search", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "w-5 h-5" }),
                        "Search Anime"
                      ] }) })
                    ]
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { opacity: 0 },
              animate: { opacity: 1 },
              transition: { delay: 0.8 },
              className: "mt-8",
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  onClick: () => window.history.back(),
                  className: "inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4 group-hover:-translate-x-1 transition-transform" }),
                    "Go back to previous page"
                  ]
                }
              )
            }
          )
        ]
      }
    )
  ] });
};
export {
  NotFound as default
};
