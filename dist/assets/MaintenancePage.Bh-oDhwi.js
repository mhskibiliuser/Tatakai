import { j as jsxRuntimeExports, L as Link } from "./react-vendor.CAo4XUiA.js";
import { B as Button } from "./index.C6yfkT5T.js";
import { S as StatusVideoBackground } from "./StatusVideoBackground.B0c-3W3u.js";
import { m as motion } from "./motion.DVGLRFCH.js";
import { d1 as Wrench, aD as Clock, R as RefreshCw, h as LogIn } from "./icons.C2gBBarQ.js";
import "./vendor.CJyRs4QS.js";
import "./tanstack.DPr3OB19.js";
import "./supabase.WuRMX5Dg.js";
import "./radix.BiK9uYXL.js";
import "./hls.BlgtCWcq.js";
import "./editor.Dxw8dtyw.js";
import "./charts.Dr1fgDJ-.js";
const MaintenancePage = () => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen flex items-center justify-center p-4 overflow-hidden relative bg-gradient-to-br from-amber-950/20 via-background to-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(StatusVideoBackground, { overlayColor: "from-amber-500/10 via-background/90 to-background" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 pointer-events-none overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          className: "absolute top-[10%] left-[5%] text-8xl font-bold text-amber-500/5 select-none",
          animate: { y: [0, -20, 0], opacity: [0.05, 0.1, 0.05] },
          transition: { duration: 8, repeat: Infinity, ease: "easeInOut" },
          children: "工"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          className: "absolute top-[20%] right-[10%] text-7xl font-bold text-orange-500/5 select-none",
          animate: { y: [0, 15, 0], opacity: [0.05, 0.08, 0.05] },
          transition: { duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 },
          children: "事"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          className: "absolute bottom-[15%] left-[15%] text-9xl font-bold text-amber-500/5 select-none",
          animate: { y: [0, -10, 0], opacity: [0.03, 0.07, 0.03] },
          transition: { duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 },
          children: "中"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-amber-500/10 to-transparent" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-orange-500/10 to-transparent" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-8 left-8 w-24 h-24 border-l-2 border-t-2 border-amber-500/20 rounded-tl-3xl" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-8 right-8 w-24 h-24 border-r-2 border-t-2 border-amber-500/20 rounded-tr-3xl" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-8 left-8 w-24 h-24 border-l-2 border-b-2 border-amber-500/20 rounded-bl-3xl" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-8 right-8 w-24 h-24 border-r-2 border-b-2 border-amber-500/20 rounded-br-3xl" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6 },
        className: "relative z-10 text-center max-w-lg",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { scale: 0 },
              animate: { scale: 1 },
              transition: { type: "spring", stiffness: 200, delay: 0.2 },
              className: "mb-8 inline-flex flex-col items-center",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mb-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-32 h-32 bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-amber-500/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    motion.div,
                    {
                      animate: { rotate: [0, 15, -15, 0] },
                      transition: { duration: 2, repeat: Infinity, repeatDelay: 1 },
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Wrench, { className: "w-16 h-16 text-amber-500" })
                    }
                  ) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    motion.div,
                    {
                      className: "absolute -top-2 -right-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center",
                      animate: { scale: [1, 1.2, 1] },
                      transition: { duration: 2, repeat: Infinity },
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-4 h-4 text-primary-foreground" })
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  motion.p,
                  {
                    initial: { opacity: 0 },
                    animate: { opacity: 1 },
                    transition: { delay: 0.5 },
                    className: "text-4xl font-bold text-amber-500/60 tracking-[0.3em] mb-2",
                    children: "工事中"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground tracking-[0.2em] uppercase", children: "Kōji-chū" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0 },
              animate: { opacity: 1 },
              transition: { delay: 0.4 },
              className: "space-y-4 mb-8",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl md:text-4xl font-display font-bold text-foreground", children: "Under Maintenance" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-lg", children: "We're performing scheduled maintenance to improve your experience. We'll be back shortly!" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, scaleX: 0 },
              animate: { opacity: 1, scaleX: 1 },
              transition: { delay: 0.6, duration: 0.5 },
              className: "mb-8",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "h-2 bg-muted rounded-full overflow-hidden relative", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    motion.div,
                    {
                      className: "h-full bg-gradient-to-r from-amber-500 via-orange-500 to-amber-400 rounded-full",
                      initial: { width: "0%" },
                      animate: { width: ["0%", "70%", "40%", "90%", "60%"] },
                      transition: { duration: 3, repeat: Infinity, repeatType: "reverse" }
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    motion.div,
                    {
                      className: "absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent",
                      animate: { x: ["-100%", "100%"] },
                      transition: { duration: 2, repeat: Infinity, ease: "linear" }
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mt-2 flex items-center justify-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-block w-2 h-2 rounded-full bg-amber-500 animate-pulse" }),
                  "作業中... Working on it..."
                ] })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 20 },
              animate: { opacity: 1, y: 0 },
              transition: { delay: 0.8 },
              className: "flex flex-col sm:flex-row gap-3 justify-center",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    onClick: () => window.location.reload(),
                    size: "lg",
                    className: "gap-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white border-0",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-5 h-5" }),
                      "Try Again"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    asChild: true,
                    variant: "outline",
                    size: "lg",
                    className: "gap-2 border-amber-500/30 hover:bg-amber-500/10",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/auth", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(LogIn, { className: "w-5 h-5" }),
                      "Admin Login"
                    ] })
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.p,
            {
              initial: { opacity: 0 },
              animate: { opacity: 1 },
              transition: { delay: 1 },
              className: "mt-8 text-sm text-muted-foreground",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-amber-500/60 mr-2", children: "予定時間:" }),
                "Estimated completion: ~30 minutes"
              ]
            }
          )
        ]
      }
    )
  ] });
};
export {
  MaintenancePage as default
};
