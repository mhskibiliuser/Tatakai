import { e as useNavigate, j as jsxRuntimeExports } from "./react-vendor.CAo4XUiA.js";
import { D as useIsNativeApp, s as useIsMobile, Q as Background, S as Sidebar, G as GlassPanel, j as cn } from "./index.C6yfkT5T.js";
import { M as MobileNav } from "./MobileNav.ABHzkhTQ.js";
import { u as ArrowLeft, B as BookOpen, k as Sparkles, b as ChevronRight } from "./icons.C2gBBarQ.js";
import "./vendor.CJyRs4QS.js";
import "./tanstack.DPr3OB19.js";
import "./supabase.WuRMX5Dg.js";
import "./radix.BiK9uYXL.js";
import "./motion.DVGLRFCH.js";
import "./hls.BlgtCWcq.js";
import "./editor.Dxw8dtyw.js";
import "./charts.Dr1fgDJ-.js";
function NovelComingSoon() {
  const navigate = useNavigate();
  const isNative = useIsNativeApp();
  const isMobile = useIsMobile();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-black text-zinc-50 overflow-x-hidden selection:bg-primary/30 font-sans", children: [
    !isNative && /* @__PURE__ */ jsxRuntimeExports.jsx(Background, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fixed inset-0 z-0 pointer-events-none overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-[20%] left-[20%] w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] opacity-60 mix-blend-screen" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-[20%] right-[20%] w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[100px] opacity-50 mix-blend-screen" })
    ] }),
    !isMobile && /* @__PURE__ */ jsxRuntimeExports.jsx(Sidebar, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: cn(
      "relative z-10 py-6 max-w-[1400px] mx-auto min-h-screen flex flex-col items-center justify-center px-6 pb-24 lg:pb-6",
      !isNative && "pl-6 md:pl-32"
    ), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-12 left-6 md:left-32 z-50", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: () => navigate(-1),
          className: "flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl text-zinc-400 hover:text-white hover:bg-white/10 transition-all duration-300 group shadow-lg",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium tracking-wide", children: "Back" })
          ]
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative w-full max-w-4xl mx-auto flex flex-col items-center text-center animate-in fade-in slide-in-from-bottom-8 duration-1000", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassPanel, { className: "p-10 md:p-16 w-full relative overflow-hidden group bg-white/[0.02] border-white/[0.05] backdrop-blur-3xl rounded-[2.5rem]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-40 -right-40 w-80 h-80 bg-primary/20 rounded-full blur-[80px] group-hover:bg-primary/30 transition-colors duration-700 opacity-50" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 flex flex-col items-center gap-10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative group/icon", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-primary/40 rounded-[2rem] blur-2xl group-hover/icon:blur-3xl transition-all duration-500 opacity-60" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-28 h-28 md:w-32 md:h-32 rounded-[2.2rem] bg-gradient-to-b from-white/15 to-white/5 border border-white/20 shadow-2xl backdrop-blur-2xl flex items-center justify-center transform group-hover/icon:scale-105 transition-all duration-500", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 rounded-[2.2rem] bg-gradient-to-tr from-primary/30 via-transparent to-transparent opacity-50" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-12 h-12 md:w-14 md:h-14 text-white drop-shadow-lg", strokeWidth: 1.5 })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-semibold uppercase tracking-widest text-primary mb-2 backdrop-blur-md", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-3.5 h-3.5" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "In Development" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-5xl md:text-7xl font-semibold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 leading-[1.1]", children: [
              "A new chapter ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("br", { className: "hidden md:block" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/60", children: "awaits." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg md:text-xl text-zinc-400 max-w-lg mx-auto font-medium tracking-tight leading-relaxed", children: "We're crafting an immersive light novel experience. Reading, tracking, and discovery will never be the same." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              onClick: () => navigate("/"),
              className: "mt-4 px-8 py-4 rounded-full bg-zinc-100 text-zinc-900 font-semibold text-base hover:bg-white hover:scale-105 active:scale-95 transition-all duration-300 shadow-[0_0_40px_rgba(255,255,255,0.1)] flex items-center justify-center gap-2 group/btn",
              children: [
                "Return Home",
                /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform" })
              ]
            }
          )
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(MobileNav, {})
  ] });
}
export {
  NovelComingSoon as default
};
