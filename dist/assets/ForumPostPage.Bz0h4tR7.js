import { i as useParams, e as useNavigate, j as jsxRuntimeExports } from "./react-vendor.CAo4XUiA.js";
import { bf as ue } from "./vendor.CJyRs4QS.js";
import { C as CommunitySidebar } from "./CommunitySidebar.DBOREraZ.js";
import { M as MobileNav } from "./MobileNav.ABHzkhTQ.js";
import { D as useIsNativeApp, K as useIsDesktopApp, u as useAuth, g2 as useForumPost, g3 as usePostPoll, g4 as useDeleteForumPost, g5 as usePinForumPost, J as useConfirm, B as Button, j as cn, g6 as ModerationMenu, A as PostCard, G as GlassPanel } from "./index.C6yfkT5T.js";
import { W as WatchTogetherWidget, A as AiringWidget, S as SocialWidget, T as TrendingRail, H as HashtagsWidget } from "./HashtagsWidget.BwWeLwa9.js";
import { S as Seo } from "./Seo.CEAYCbtv.js";
import { u as ArrowLeft, ak as Pin, J as Trash2, Q as LoaderCircle } from "./icons.C2gBBarQ.js";
import { m as motion } from "./motion.DVGLRFCH.js";
import "./tanstack.DPr3OB19.js";
import "./supabase.WuRMX5Dg.js";
import "./radix.BiK9uYXL.js";
import "./hls.BlgtCWcq.js";
import "./editor.Dxw8dtyw.js";
import "./charts.Dr1fgDJ-.js";
import "./useAiringSchedule.CVdunhuV.js";
import "./useLeaderboard.BbUdnjoj.js";
function ForumPostPage() {
  var _a, _b, _c, _d;
  const { postId } = useParams();
  const navigate = useNavigate();
  const isNative = useIsNativeApp();
  const isDesktopApp = useIsDesktopApp();
  const { user, isAdmin } = useAuth();
  const { data: post, isLoading } = useForumPost(postId);
  const { data: poll } = usePostPoll(postId);
  const deletePost = useDeleteForumPost();
  const pinPost = usePinForumPost();
  const confirm = useConfirm();
  if (!postId) return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-8", children: "Invalid post ID" });
  const canDelete = !!user && ((post == null ? void 0 : post.user_id) === user.id || isAdmin);
  const handleDelete = async () => {
    if (!await confirm({ title: "Delete this post?", destructive: true })) return;
    try {
      await deletePost.mutateAsync(postId);
      ue.success("Post deleted");
      navigate("/community");
    } catch (err) {
      ue.error(err instanceof Error ? err.message : "Failed to delete");
    }
  };
  const feedPost = post ? (() => {
    const metadata = post.metadata || {};
    const images = Array.isArray(metadata.images) && metadata.images.length ? metadata.images : post.image_url ? [post.image_url] : null;
    return {
      ...post,
      poll: poll || null,
      gif_url: metadata.gif_url || null,
      images,
      watch_room_id: metadata.watch_room_id || null,
      quoted_post_id: metadata.quoted_post_id || null,
      media_type: metadata.media_type || (post.anime_id ? "anime" : null)
    };
  })() : null;
  const rail = [WatchTogetherWidget, AiringWidget, SocialWidget, TrendingRail, HashtagsWidget];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative min-h-screen bg-background text-foreground antialiased", children: [
    post && /* @__PURE__ */ jsxRuntimeExports.jsx(
      Seo,
      {
        title: post.title || `Post by ${((_a = post.profiles) == null ? void 0 : _a.display_name) || "a member"}`,
        description: post.content || void 0,
        image: post.image_url || ((_c = (_b = post.metadata) == null ? void 0 : _b.images) == null ? void 0 : _c[0]) || post.anime_poster || void 0,
        canonicalPath: `/community/forum/${postId}`,
        kind: "article",
        suffix: " — Tatakai Community"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pointer-events-none fixed inset-0 -z-10 overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-[10%] left-1/2 -translate-x-1/2 h-[600px] w-[1200px] rounded-full bg-radial from-rose-500/10 via-primary/5 to-transparent blur-3xl" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-[20%] -left-[10%] h-[500px] w-[500px] rounded-full bg-violet-600/5 blur-3xl" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-transparent via-background/90 to-background" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CommunitySidebar, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: cn("relative z-10 w-full transition-all duration-300", isDesktopApp ? "pl-24 lg:pl-28" : isNative ? "pl-0" : "pl-0 md:pl-20 lg:pl-24"), children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-[1536px] px-4 pt-6 md:px-8 md:pt-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6 flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "ghost", onClick: () => navigate("/community"), className: "gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" }),
          " Community"
        ] }),
        post && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
          isAdmin && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "ghost",
              size: "sm",
              className: "gap-1.5",
              onClick: () => pinPost.mutate({ postId, isPinned: !post.is_pinned }),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Pin, { className: cn("h-4 w-4", post.is_pinned && "fill-current text-primary") }),
                post.is_pinned ? "Unpin" : "Pin"
              ]
            }
          ),
          canDelete && /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "ghost", size: "sm", className: "gap-1.5 text-destructive hover:text-destructive", onClick: handleDelete, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" }),
            " Delete"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            ModerationMenu,
            {
              contentType: "forum_post",
              contentId: post.id,
              authorUserId: post.user_id,
              authorName: ((_d = post.profiles) == null ? void 0 : _d.display_name) ?? void 0,
              showPauseComments: true,
              showRepostControls: true
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-8 xl:gap-12 pb-12", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full min-w-0 flex-1 max-w-[720px]", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-6 w-6 animate-spin text-muted-foreground" }) }) : feedPost ? /* @__PURE__ */ jsxRuntimeExports.jsx(PostCard, { post: feedPost, defaultShowComments: true }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassPanel, { className: "rounded-[2rem] p-16 text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg font-bold tracking-tight", children: "Post not found" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "It may have been removed." })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("aside", { className: "hidden w-[380px] 2xl:w-[420px] shrink-0 xl:block", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sticky top-6 flex flex-col gap-6 w-full", children: rail.map((Widget, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { opacity: 0, y: 15 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.3, delay: i * 0.05, ease: "easeOut" },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Widget, { className: "w-full" })
          },
          i
        )) }) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(MobileNav, {})
  ] });
}
export {
  ForumPostPage as default
};
