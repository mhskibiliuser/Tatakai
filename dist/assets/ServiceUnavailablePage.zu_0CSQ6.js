import { j as jsxRuntimeExports } from "./react-vendor.CAo4XUiA.js";
import { B as Button } from "./index.C6yfkT5T.js";
import { m as motion } from "./motion.DVGLRFCH.js";
import { dk as ServerCrash, R as RefreshCw, ae as Mail } from "./icons.C2gBBarQ.js";
import "./vendor.CJyRs4QS.js";
import "./tanstack.DPr3OB19.js";
import "./supabase.WuRMX5Dg.js";
import "./radix.BiK9uYXL.js";
import "./hls.BlgtCWcq.js";
import "./editor.Dxw8dtyw.js";
import "./charts.Dr1fgDJ-.js";
const ServiceUnavailablePage = () => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background flex items-center justify-center p-4 overflow-hidden relative", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 overflow-hidden opacity-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { className: "w-full h-full", xmlns: "http://www.w3.org/2000/svg", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("defs", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("pattern", { id: "circuit", x: "0", y: "0", width: "100", height: "100", patternUnits: "userSpaceOnUse", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M10 50 H40 V20 H70 V50 H90", fill: "none", stroke: "currentColor", strokeWidth: "1", className: "text-primary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "10", cy: "50", r: "3", fill: "currentColor", className: "text-primary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "90", cy: "50", r: "3", fill: "currentColor", className: "text-primary" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { width: "100%", height: "100%", fill: "url(#circuit)" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-500/5 rounded-full blur-3xl",
        animate: { scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] },
        transition: { duration: 4, repeat: Infinity }
      }
    ) }),
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
              initial: { scale: 0.5, opacity: 0 },
              animate: { scale: 1, opacity: 1 },
              transition: { duration: 0.5, delay: 0.2 },
              className: "mb-8",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative inline-block", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    motion.div,
                    {
                      className: "w-32 h-32 bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-2xl flex items-center justify-center mx-auto",
                      animate: { rotateY: [0, 10, -10, 0] },
                      transition: { duration: 4, repeat: Infinity },
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(ServerCrash, { className: "w-16 h-16 text-red-500" })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    motion.div,
                    {
                      className: "absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded",
                      animate: { y: [-2, 2, -2] },
                      transition: { duration: 2, repeat: Infinity },
                      children: "503"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  motion.h1,
                  {
                    className: "text-6xl md:text-7xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500 mt-6",
                    animate: { opacity: [1, 0.7, 1] },
                    transition: { duration: 2, repeat: Infinity },
                    children: "503"
                  }
                )
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
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl md:text-3xl font-bold text-foreground", children: "Service Unavailable" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-lg", children: "Our servers are currently overloaded or undergoing maintenance. Please try again in a few moments." })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { opacity: 0 },
              animate: { opacity: 1 },
              transition: { delay: 0.6 },
              className: "grid grid-cols-3 gap-4 mb-8",
              children: [
                { label: "API", status: "down" },
                { label: "CDN", status: "degraded" },
                { label: "Database", status: "down" }
              ].map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card/50 backdrop-blur rounded-lg p-3 border border-border/50", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  motion.div,
                  {
                    className: `w-3 h-3 rounded-full mx-auto mb-2 ${item.status === "down" ? "bg-red-500" : "bg-yellow-500"}`,
                    animate: { opacity: [1, 0.5, 1] },
                    transition: { duration: 1, repeat: Infinity, delay: i * 0.2 }
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: item.label })
              ] }, item.label))
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 20 },
              animate: { opacity: 1, y: 0 },
              transition: { delay: 0.8 },
              className: "flex flex-col sm:flex-row gap-4 justify-center",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    onClick: () => window.location.reload(),
                    size: "lg",
                    className: "gap-2",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-5 h-5" }),
                      "Retry Connection"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    variant: "outline",
                    size: "lg",
                    className: "gap-2",
                    onClick: () => window.open("mailto:support@example.com"),
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "w-5 h-5" }),
                      "Contact Support"
                    ]
                  }
                )
              ]
            }
          )
        ]
      }
    )
  ] });
};
export {
  ServiceUnavailablePage as default
};
