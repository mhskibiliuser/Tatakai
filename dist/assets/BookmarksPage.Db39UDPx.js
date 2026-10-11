import { e as useNavigate, j as jsxRuntimeExports } from "./react-vendor.CAo4XUiA.js";
import { D as useIsNativeApp, g1 as useBookmarkedPosts, S as Sidebar, B as Button, A as PostCard, G as GlassPanel, j as cn } from "./index.C6yfkT5T.js";
import { M as MobileNav } from "./MobileNav.ABHzkhTQ.js";
import { u as ArrowLeft, aL as Bookmark } from "./icons.C2gBBarQ.js";
import { m as motion } from "./motion.DVGLRFCH.js";
import "./vendor.CJyRs4QS.js";
import "./tanstack.DPr3OB19.js";
import "./supabase.WuRMX5Dg.js";
import "./radix.BiK9uYXL.js";
import "./hls.BlgtCWcq.js";
import "./editor.Dxw8dtyw.js";
import "./charts.Dr1fgDJ-.js";
function BookmarksPage() {
  const isNative = useIsNativeApp();
  const navigate = useNavigate();
  const { data: posts = [], isLoading } = useBookmarkedPosts();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background text-foreground", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Sidebar, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: cn("relative z-10 w-full", isNative ? "pl-0" : "pl-0 md:pl-20 lg:pl-24"), children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-2xl px-4 py-6 md:px-6 md:py-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "ghost", onClick: () => navigate("/community"), className: "mb-4 gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" }),
        " Community"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-5 flex items-center gap-2.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Bookmark, { className: "h-5 w-5 text-primary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-black tracking-tight", children: "Bookmarks" })
      ] }),
      isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: [...Array(3)].map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-32 animate-pulse rounded-[var(--radius)] bg-white/[0.03]" }, i)) }) : posts.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: posts.map((post, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 }, transition: { delay: Math.min(i * 0.03, 0.3) }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(PostCard, { post }) }, post.id)) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassPanel, { className: "rounded-[2rem] border-dashed border-white/10 bg-white/[0.01] p-16 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Bookmark, { className: "mx-auto mb-4 h-12 w-12 text-muted-foreground/30" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg font-bold tracking-tight", children: "No bookmarks yet" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "Tap the bookmark icon on a post to save it here." })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(MobileNav, {})
  ] });
}
export {
  BookmarksPage as default
};
