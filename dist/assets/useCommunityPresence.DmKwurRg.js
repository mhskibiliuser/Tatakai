import { r as reactExports, j as jsxRuntimeExports, L as Link, e as useNavigate } from "./react-vendor.CAo4XUiA.js";
import { u as useAuth, G as GlassPanel, A as PostCard, fV as WatchroomFeedItem, a4 as Sheet, a5 as SheetContent, a6 as SheetHeader, a7 as SheetTitle, j as cn, b4 as getRankTier, a8 as Avatar, a9 as AvatarImage, aa as AvatarFallback, b7 as getRankImageUrl, at as usePlaylists, l as getProxiedImageUrl, a2 as supabase } from "./index.C6yfkT5T.js";
import { u as useFeed } from "./useFeed.Ba280OYv.js";
import { P as PostComposer } from "./PostComposer.Da2bF75r.js";
import { y as MessageSquare, ak as Pin, Q as LoaderCircle, bC as Trophy, bB as Flame, aI as Star, e as TrendingUp, ap as UserPlus, c3 as Crown, b as ChevronRight, U as Users, aA as Layers, P as Plus, az as Music2, aJ as Play, v as ArrowRight } from "./icons.C2gBBarQ.js";
import { m as motion } from "./motion.DVGLRFCH.js";
import { a as useLeaderboard, u as useUserRank } from "./useLeaderboard.BbUdnjoj.js";
import { O as OnlineDot, W as WatchTogetherWidget, A as AiringWidget, S as SocialWidget, T as TrendingRail, H as HashtagsWidget } from "./HashtagsWidget.BwWeLwa9.js";
import { a as useQuery } from "./tanstack.DPr3OB19.js";
import "./vendor.CJyRs4QS.js";
import { A as AnimatedCounter } from "./AnimatedCounter.DVb9HioJ.js";
function FeedList({
  tab,
  tag,
  communityId,
  postType,
  search,
  showComposer = true,
  layout = "timeline"
}) {
  const { user } = useAuth();
  const {
    data,
    isLoading,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  } = useFeed(tab, {
    tag,
    communityId,
    postType,
    search
  });
  const items = (data == null ? void 0 : data.pages.flat()) ?? [];
  const isCommunityView = !!communityId;
  const isPinnedItem = (i) => i.kind === "post" && i.post.is_pinned && (isCommunityView ? true : !i.post.community_id);
  const pinnedItems = items.filter(isPinnedItem);
  const timelineItems = items.filter((i) => !isPinnedItem(i));
  const sentinelRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    const element = sentinelRef.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { rootMargin: "500px" }
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full flex flex-col gap-4", children: [
      showComposer && user && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(PostComposer, { onPosted: () => refetch(), defaultCommunityId: communityId }) }),
      [...Array(4)].map((_, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(GlassPanel, { className: "p-4 sm:p-5 border border-white/5 bg-white/[0.015]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-11 w-11 shrink-0 animate-pulse rounded-full bg-white/5" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-4 py-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-4 w-32 animate-pulse rounded-full bg-white/10" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3 w-16 animate-pulse rounded-full bg-white/5" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3.5 w-full animate-pulse rounded-full bg-white/5" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3.5 w-4/5 animate-pulse rounded-full bg-white/5" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 flex gap-6", children: [1, 2, 3, 4].map((action) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-6 w-12 animate-pulse rounded-full bg-white/5" }, action)) })
        ] })
      ] }) }, index))
    ] });
  }
  if (items.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full flex flex-col gap-4", children: [
      showComposer && user && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(PostComposer, { onPosted: () => refetch(), defaultCommunityId: communityId }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center rounded-[2rem] border border-dashed border-white/10 bg-white/[0.02] px-6 py-24 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-white/5 ring-1 ring-white/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "h-7 w-7 text-muted-foreground/60" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-[19px] font-semibold tracking-tight text-foreground", children: tag ? `No posts tagged #${tag}` : tab === "following" ? "Nothing from people you follow" : tab === "news" ? "No news updates yet" : "Nothing here yet" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 max-w-sm text-sm text-muted-foreground", children: tab === "following" ? "Follow more members to see their posts here." : "Be the first to share something with the community." })
      ] })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full flex flex-col gap-4", children: [
    showComposer && user && /* @__PURE__ */ jsxRuntimeExports.jsx(PostComposer, { onPosted: () => refetch(), defaultCommunityId: communityId }),
    pinnedItems.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-2 flex flex-col gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 px-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Pin, { className: "h-4 w-4 text-emerald-400" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold uppercase tracking-widest text-emerald-400", children: isCommunityView ? "Pinned" : "Pinned · Global" })
      ] }),
      pinnedItems.map(
        (item) => item.kind === "post" ? /* @__PURE__ */ jsxRuntimeExports.jsx(PostCard, { post: item.post, contextCommunityId: communityId ?? null }, item.post.id) : null
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" })
    ] }),
    layout === "masonry" ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "columns-1 gap-4 [column-fill:_balance] lg:columns-2", children: timelineItems.map((item, index) => {
      const key = item.kind === "post" ? item.post.id : `room-${item.room.id}`;
      return /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.article,
        {
          initial: { opacity: 0, y: 10 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.3, delay: Math.min(index * 0.025, 0.15), ease: "easeOut" },
          className: "break-inside-avoid mb-4",
          children: item.kind === "post" ? /* @__PURE__ */ jsxRuntimeExports.jsx(PostCard, { post: item.post, contextCommunityId: communityId ?? null }) : /* @__PURE__ */ jsxRuntimeExports.jsx(WatchroomFeedItem, { room: item.room })
        },
        key
      );
    }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-4", children: timelineItems.map((item, index) => {
      const key = item.kind === "post" ? item.post.id : `room-${item.room.id}`;
      return /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.article,
        {
          initial: { opacity: 0, y: 10 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.3, delay: Math.min(index * 0.025, 0.15), ease: "easeOut" },
          children: item.kind === "post" ? /* @__PURE__ */ jsxRuntimeExports.jsx(PostCard, { post: item.post, contextCommunityId: communityId ?? null }) : /* @__PURE__ */ jsxRuntimeExports.jsx(WatchroomFeedItem, { room: item.room })
        },
        key
      );
    }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: sentinelRef, className: "flex min-h-[100px] items-center justify-center pb-8", children: isFetchingNextPage && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm font-medium text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin text-primary" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Loading more..." })
    ] }) })
  ] });
}
const LEADERBOARD_TYPES = [
  { value: "watched", label: "Most Watched", icon: Trophy, scoreLabel: "episodes", color: "text-amber-400" },
  { value: "streak", label: "Best Streak", icon: Flame, scoreLabel: "days", color: "text-rose-400" },
  { value: "rated", label: "Most Rated", icon: Star, scoreLabel: "ratings", color: "text-amber-300" },
  { value: "comments", label: "Most Comments", icon: MessageSquare, scoreLabel: "comments", color: "text-sky-400" },
  { value: "active", label: "Most Active", icon: TrendingUp, scoreLabel: "points", color: "text-emerald-400" },
  { value: "followers", label: "Most Followers", icon: UserPlus, scoreLabel: "followers", color: "text-purple-400" }
];
const PODIUM = [
  { rank: 1, glow: "bg-amber-400/20", ring: "ring-amber-400/70 border-amber-400/50", order: "order-2", lift: "-mt-4", crown: "text-amber-400", badgeBg: "bg-amber-400/10 text-amber-300 border-amber-400/30" },
  { rank: 2, glow: "bg-slate-300/15", ring: "ring-slate-300/60 border-slate-300/40", order: "order-1", lift: "mt-2", crown: "text-slate-300", badgeBg: "bg-slate-300/10 text-slate-200 border-slate-300/30" },
  { rank: 3, glow: "bg-amber-700/20", ring: "ring-amber-700/60 border-amber-700/40", order: "order-3", lift: "mt-4", crown: "text-amber-600", badgeBg: "bg-amber-700/10 text-amber-400 border-amber-700/30" }
];
function displayName(entry) {
  return entry.display_name || (entry.username && entry.username !== "null" ? entry.username : "Anonymous");
}
function PodiumCard({
  entry,
  config,
  scoreLabel,
  onClose
}) {
  var _a;
  const rankTier = getRankTier(entry.score);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Link,
    {
      to: `/user/${entry.username || entry.user_id}`,
      onClick: onClose,
      className: cn("flex-1 group", config.order),
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          className: cn(
            "relative flex flex-col items-center overflow-hidden rounded-[1.75rem] border border-white/[0.08] bg-white/[0.02] p-4 text-center backdrop-blur-xl shadow-lg transition-all duration-300 group-hover:border-primary/50 group-hover:bg-white/[0.04] group-hover:-translate-y-1",
            config.lift
          ),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("pointer-events-none absolute -top-8 h-24 w-24 rounded-full blur-[50px]", config.glow) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative mb-1 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Crown, { className: cn("h-5 w-5 drop-shadow-md", config.crown) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Avatar, { className: cn("relative h-14 w-14 ring-2 shadow-2xl transition-transform duration-300 group-hover:scale-105", config.ring), children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarImage, { src: entry.avatar_url || "" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarFallback, { className: "font-bold", children: (_a = displayName(entry)[0]) == null ? void 0 : _a.toUpperCase() })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: cn("mt-2 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-black border", config.badgeBg), children: [
              "#",
              config.rank
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "relative mt-1.5 w-full truncate font-display text-xs font-bold tracking-tight text-white group-hover:text-primary transition-colors", children: displayName(entry) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mt-1 flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: getRankImageUrl(rankTier.rank), alt: "", className: "h-3.5 w-3.5 object-contain" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: cn("text-[10px] font-semibold", rankTier.color), children: rankTier.name })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "relative mt-1.5 font-display text-lg font-black tabular-nums text-white", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatedCounter, { value: entry.score }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "relative text-[9px] uppercase tracking-wider text-muted-foreground/70", children: scoreLabel })
          ]
        }
      )
    }
  );
}
function LeaderboardRow({
  entry,
  currentUserId,
  scoreLabel,
  onClose
}) {
  var _a;
  const isCurrentUser = entry.user_id === currentUserId;
  const rankTier = getRankTier(entry.score);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: `/user/${entry.username || entry.user_id}`, onClick: onClose, className: "block group", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: cn(
        "flex items-center gap-3.5 rounded-2xl border border-white/[0.04] bg-white/[0.015] px-3.5 py-3 transition-all duration-200 group-hover:border-white/[0.12] group-hover:bg-white/[0.04]",
        isCurrentUser && "border-primary/40 bg-primary/[0.06] ring-1 ring-primary/40"
      ),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-6 text-center font-display text-xs font-black tabular-nums text-muted-foreground/80 group-hover:text-white", children: entry.rank }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Avatar, { className: "h-9 w-9 ring-1 ring-white/10 group-hover:ring-primary/40 transition-all", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarImage, { src: entry.avatar_url || "" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarFallback, { className: "font-bold text-xs", children: (_a = displayName(entry)[0]) == null ? void 0 : _a.toUpperCase() })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate font-display text-xs font-bold tracking-tight text-white group-hover:text-primary transition-colors", children: displayName(entry) }),
            isCurrentUser && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full bg-primary/20 px-1.5 py-0.2 text-[9px] font-bold uppercase text-primary", children: "You" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-0.5 flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: getRankImageUrl(rankTier.rank), alt: "", className: "h-3 w-3 object-contain" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: cn("text-[10px] font-semibold", rankTier.color), children: rankTier.name })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-sm font-bold tabular-nums text-white", children: entry.score.toLocaleString() }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[9px] uppercase tracking-wider text-muted-foreground/60", children: scoreLabel })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-4 w-4 text-muted-foreground/30 group-hover:text-muted-foreground transition-colors group-hover:translate-x-0.5" })
      ]
    }
  ) });
}
function LeaderboardSheet({ open, onOpenChange, defaultType = "watched" }) {
  const { user } = useAuth();
  const [type, setType] = reactExports.useState(defaultType);
  const limit = type === "streak" ? 25 : 100;
  const { data: leaderboard, isLoading } = useLeaderboard(type, limit);
  const { data: userRank } = useUserRank(type, user == null ? void 0 : user.id);
  const activeType = LEADERBOARD_TYPES.find((t) => t.value === type) || LEADERBOARD_TYPES[0];
  const scoreLabel = activeType.scoreLabel;
  const top3 = (leaderboard || []).slice(0, 3);
  const rest = (leaderboard || []).slice(3);
  const handleClose = () => onOpenChange(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Sheet, { open, onOpenChange, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    SheetContent,
    {
      side: "right",
      className: "flex w-full flex-col gap-0 overflow-hidden border-l border-white/[0.08] bg-background/60 p-0 backdrop-blur-[40px] sm:max-w-md md:max-w-lg shadow-[-20px_0_40px_rgba(0,0,0,0.5)] z-50",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 overflow-hidden pointer-events-none -z-10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 right-0 w-96 h-96 bg-amber-500/15 blur-[120px] rounded-full" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-20 left-0 w-72 h-72 bg-primary/10 blur-[100px] rounded-full" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-transparent via-background/80 to-background/95" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(SheetHeader, { className: "relative shrink-0 border-b border-white/[0.05] bg-white/[0.01] p-6 pb-5 text-left z-10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(SheetTitle, { className: "flex items-center gap-3 text-2xl font-black tracking-tight text-white drop-shadow-md", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-500/30 to-amber-500/5 border border-amber-500/20 text-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.2)]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "h-5 w-5" }) }),
            "Hall of Fame"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-muted-foreground/80 mt-1", children: "Top ranked members across the Tatakai community" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-0 flex-1 space-y-6 overflow-y-auto p-6 custom-scrollbar relative z-10", children: [
          userRank && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative overflow-hidden rounded-[2rem] border border-amber-500/25 bg-amber-500/[0.04] p-5 shadow-[0_8px_32px_rgba(0,0,0,0.3)] backdrop-blur-xl group", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-amber-500/[0.08] to-transparent pointer-events-none" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/20 border border-amber-500/30 text-amber-300 font-display text-lg font-black shadow-lg", children: [
                  "#",
                  userRank.rank
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold text-white", children: "Your Standing" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "rounded-full bg-amber-500/20 px-2 py-0.5 text-[9px] font-black uppercase tracking-wider text-amber-300", children: [
                      "Top ",
                      Math.max(1, Math.round(userRank.rank / Math.max(1, userRank.totalUsers) * 100)),
                      "%"
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground/80 mt-0.5", children: [
                    "Out of ",
                    userRank.totalUsers.toLocaleString(),
                    " active community members"
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-xl font-black tabular-nums text-white", children: userRank.score.toLocaleString() }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] uppercase font-bold tracking-wider text-amber-400/80", children: scoreLabel })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-1.5 rounded-2xl border border-white/[0.08] bg-white/[0.03] p-1.5 shadow-xl backdrop-blur-md", children: LEADERBOARD_TYPES.map(({ value, label, icon: Icon }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => setType(value),
              className: cn(
                "flex items-center justify-center gap-1.5 rounded-xl px-2.5 py-2 text-[11px] font-bold tracking-tight transition-all duration-200",
                type === value ? "bg-primary text-primary-foreground shadow-[0_0_20px_rgba(var(--primary),0.35)] scale-[1.02]" : "text-muted-foreground hover:text-white hover:bg-white/[0.03]"
              ),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-3.5 w-3.5 shrink-0" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: label })
              ]
            },
            value
          )) }),
          isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-3 h-44 animate-pulse", children: [...Array(3)].map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-3xl bg-white/[0.03]" }, i)) }),
            Array.from({ length: 5 }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-14 animate-pulse rounded-2xl bg-white/[0.03]" }, i))
          ] }) : leaderboard && leaderboard.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
            top3.length === 3 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-end gap-2.5 pt-2 pb-2", children: PODIUM.map((config) => {
              const entry = top3.find((e) => e.rank === config.rank);
              return entry ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                PodiumCard,
                {
                  entry,
                  config,
                  scoreLabel,
                  onClose: handleClose
                },
                config.rank
              ) : null;
            }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] font-bold uppercase tracking-wider text-muted-foreground/70 px-1 pt-2", children: top3.length === 3 ? "Community Standings" : "Top Members" }),
              (top3.length === 3 ? rest : leaderboard).map((entry) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                LeaderboardRow,
                {
                  entry,
                  currentUserId: user == null ? void 0 : user.id,
                  scoreLabel,
                  onClose: handleClose
                },
                entry.user_id
              ))
            ] })
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-[2rem] border border-dashed border-white/10 bg-white/[0.01] p-10 text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "mx-auto mb-3 h-10 w-10 text-muted-foreground/30" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-bold text-white", children: "No leaderboard records yet" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground/70 mt-1", children: "Start watching and engaging to get ranked!" })
          ] })
        ] })
      ]
    }
  ) });
}
function useFollowAlongRail(offset = 24) {
  const ref = reactExports.useRef(null);
  const [top, setTop] = reactExports.useState(offset);
  reactExports.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => {
      const h = el.offsetHeight;
      const vh = window.innerHeight;
      setTop(h + offset > vh ? vh - h - offset : offset);
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    window.addEventListener("resize", update);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
    };
  }, [offset]);
  return { ref, style: { top } };
}
function MembersShowcaseWidget({
  className,
  onlineUsers,
  onlineUserIds,
  members: roster,
  title = "Members",
  limit = 20
}) {
  const navigate = useNavigate();
  const scoped = Array.isArray(roster);
  const { data: leaders = [] } = useLeaderboard("active", 16);
  const pool = scoped ? roster : [...onlineUsers ?? [], ...leaders];
  const seen = /* @__PURE__ */ new Set();
  const online = [];
  const offline = [];
  for (const u of pool) {
    if (!u.user_id || seen.has(u.user_id)) continue;
    seen.add(u.user_id);
    (onlineUserIds.has(u.user_id) ? online : offline).push(u);
  }
  const members = [...online, ...offline].slice(0, limit);
  const onlineCount = scoped ? online.length : onlineUserIds.size;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: cn(
        "group relative flex w-full flex-col overflow-hidden rounded-[24px] border border-white/[0.08] bg-[#08090b] shadow-[0_20px_60px_rgba(0,0,0,0.4)] transition-all hover:border-white/[0.12]",
        className
      ),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute -left-12 -top-12 h-56 w-56 rounded-full bg-emerald-500/10 blur-[90px] transition-all group-hover:bg-emerald-500/20" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute -bottom-16 -right-16 h-56 w-56 rounded-full bg-primary/10 blur-[90px]" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 flex items-center justify-between p-4 pb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-7 w-7 items-center justify-center rounded-full border border-emerald-500/20 bg-emerald-500/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-3.5 w-3.5 text-emerald-400" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] font-bold uppercase tracking-widest text-emerald-400", children: title })
          ] }),
          onlineCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-400", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-1.5 w-1.5 rounded-full bg-emerald-500" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tabular-nums", children: onlineCount }),
            " online"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative z-10 px-4 pb-4", children: members.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "px-2 py-6 text-center text-[13px] text-zinc-500", children: "No members to show yet." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-4 gap-3 sm:grid-cols-5", children: members.map((m) => {
          var _a;
          const name = m.display_name || m.username || "Anonymous";
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              onClick: () => m.username && navigate(`/user/${m.username}`),
              className: "group/m flex flex-col items-center gap-1.5",
              title: name,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(Avatar, { className: "h-11 w-11 ring-2 ring-white/[0.06] transition-transform duration-200 group-hover/m:scale-105", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarImage, { src: m.avatar_url || "", className: "object-cover" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarFallback, { className: "bg-zinc-800 text-xs font-bold text-zinc-400", children: (_a = name[0]) == null ? void 0 : _a.toUpperCase() })
                  ] }),
                  onlineUserIds.has(m.user_id) && /* @__PURE__ */ jsxRuntimeExports.jsx(OnlineDot, { size: "sm", className: "ring-[#08090b]" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-full truncate text-center text-[10px] font-medium text-zinc-400 transition-colors group-hover/m:text-zinc-200", children: name })
              ]
            },
            m.user_id
          );
        }) }) })
      ]
    }
  );
}
const PREVIEW_TIERS = [
  {
    label: "S",
    gradient: "from-[#ff5236] to-[#e63946]",
    textColor: "text-white",
    images: [
      "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx202269-7KNj8s2fSsJJ.jpg",
      "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx21-ELSYx3yMPcKM.jpg"
    ]
  },
  {
    label: "A",
    gradient: "from-[#ff9d2e] to-[#ff7f3f]",
    textColor: "text-white",
    images: [
      "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx16498-73IhOXpJZiMF.jpg"
    ]
  },
  {
    label: "B",
    gradient: "from-[#ffd700] to-[#ffba08]",
    textColor: "text-amber-950",
    images: []
  },
  {
    label: "C",
    gradient: "from-[#52d452] to-[#3dcd3d]",
    textColor: "text-white",
    images: []
  },
  {
    label: "D",
    gradient: "from-[#4f8fdb] to-[#3a6fbb]",
    textColor: "text-white",
    images: []
  }
];
function TierListWidget({
  className,
  imageSrc
}) {
  const navigate = useNavigate();
  const tiers = [...PREVIEW_TIERS];
  if (imageSrc && tiers[0].images[0] !== imageSrc) {
    tiers[0].images[0] = imageSrc;
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      onClick: () => navigate("/tierlists"),
      className: cn(
        "group relative flex h-auto w-full cursor-pointer flex-col overflow-hidden rounded-[24px] border border-white/[0.08] bg-[#08090b] shadow-[0_20px_60px_rgba(0,0,0,0.4)] transition-all hover:border-white/[0.12]",
        className
      ),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute -right-10 -top-10 h-56 w-56 rounded-full bg-amber-500/10 blur-[80px] transition-all group-hover:bg-amber-500/20" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute -bottom-10 -left-10 h-56 w-56 rounded-full bg-rose-500/10 blur-[80px] transition-all group-hover:bg-rose-500/20" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative z-20 flex items-start justify-between p-5 pb-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-7 w-7 items-center justify-center rounded-full border border-amber-500/20 bg-amber-500/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Layers, { className: "h-3.5 w-3.5 text-amber-400" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] font-bold uppercase tracking-widest text-amber-400", children: "Tier Maker" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative z-10 mt-5 flex flex-1 flex-col gap-1.5 px-4", children: tiers.map((tier, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex h-12 w-full gap-1.5 transition-transform duration-500 ease-out",
            style: {
              transform: `translateX(0px)`
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn(
                "flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br shadow-md transition-all duration-300 group-hover:scale-[1.03]",
                tier.gradient
              ), children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: cn("text-lg font-black drop-shadow-sm", tier.textColor), children: tier.label }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex flex-1 items-center gap-1.5 overflow-hidden rounded-lg border border-white/[0.03] bg-black/40 px-2 transition-colors duration-300 group-hover:bg-black/60", children: [
                tier.images.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-2 rounded border border-dashed border-white/10 transition-colors duration-300 group-hover:border-white/20" }),
                tier.images.map((img, imgIndex) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "relative z-10 h-9 w-9 shrink-0 overflow-hidden rounded border border-white/10 shadow-sm transition-all duration-500 group-hover:-translate-y-0.5 group-hover:scale-105 group-hover:shadow-md",
                    style: { transitionDelay: `${index * 100 + imgIndex * 50}ms` },
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "img",
                      {
                        src: img,
                        alt: `${tier.label} Tier Item`,
                        className: "h-full w-full object-cover"
                      }
                    )
                  },
                  imgIndex
                )),
                tier.images.length === 0 && tier.label === "B" && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "relative z-10 ml-2 text-[10px] font-medium text-white/30 transition-colors duration-300 group-hover:text-white/50", children: "Drag items here" })
              ] })
            ]
          },
          tier.label
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-x-0 bottom-0 z-30 flex flex-col justify-end bg-gradient-to-t from-[#08090b] via-[#08090b]/90 to-transparent pt-12 pb-4 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative overflow-hidden rounded-2xl border border-white/[0.08] bg-black/40 p-4 shadow-[0_8px_30px_rgba(0,0,0,0.5)] backdrop-blur-xl transition-all duration-300 group-hover:border-amber-500/30 group-hover:bg-black/60", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "truncate text-sm font-bold text-white transition-colors group-hover:text-amber-400", children: "Rank Your Favorites" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-0.5 text-[11px] font-medium text-muted-foreground", children: "Build your ultimate anime list" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.3)] transition-transform duration-300 group-hover:scale-110 group-hover:bg-amber-400 group-active:scale-95", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-5 w-5" }) })
        ] }) }) })
      ]
    }
  );
}
function PlaylistWidget({
  className,
  coverImages = [
    "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx166617-34fpC9y47tTx.png",
    "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx182255-butzrqd4I0aC.jpg",
    "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx16498-buvcRTBx4NSm.jpg",
    "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx21-ELSYx3yMPcKM.jpg"
  ],
  title = "Anime OSTs & Mixes",
  itemCount = 24
}) {
  const navigate = useNavigate();
  const displayImages = coverImages.slice(0, 4);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      onClick: () => navigate("/playlists"),
      className: cn(
        "group relative flex w-full cursor-pointer flex-col overflow-hidden rounded-[24px] border border-white/[0.08] bg-[#08090b] shadow-[0_20px_60px_rgba(0,0,0,0.4)] transition-all hover:border-white/[0.12]",
        className
      ),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute -left-16 -top-10 h-56 w-56 rounded-full bg-emerald-500/10 blur-[90px] transition-all group-hover:bg-emerald-500/20" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute -bottom-16 -right-16 h-56 w-56 rounded-full bg-primary/10 blur-[90px] transition-all group-hover:bg-primary/20" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative z-20 flex items-start justify-between p-5 pb-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-7 w-7 items-center justify-center rounded-full border border-emerald-500/20 bg-emerald-500/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Music2, { className: "h-3.5 w-3.5 text-emerald-400" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] font-bold uppercase tracking-widest text-emerald-400", children: "Playlists" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative z-10 mt-5 flex flex-1 items-center justify-center px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-square w-full overflow-hidden rounded-2xl border border-white/10 bg-black shadow-2xl", children: [
          displayImages.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn(
            "grid h-full w-full gap-0.5 bg-zinc-900 transition-transform duration-700 ease-out group-hover:scale-105",
            displayImages.length === 1 && "grid-cols-1",
            displayImages.length === 2 && "grid-cols-2",
            displayImages.length >= 3 && "grid-cols-2 grid-rows-2"
          ), children: displayImages.map((img, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative h-full w-full overflow-hidden bg-zinc-800", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: img, alt: `Playlist cover ${idx + 1}`, className: "h-full w-full object-cover" }) }, idx)) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-full w-full items-center justify-center bg-zinc-900", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Music2, { className: "h-8 w-8 text-zinc-700" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative z-30 mt-5 p-4 pt-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative overflow-hidden rounded-2xl border border-white/[0.08] bg-black/40 p-4 shadow-xl backdrop-blur-xl transition-all duration-300 group-hover:border-emerald-500/30 group-hover:bg-black/50", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "truncate text-sm font-bold text-white transition-colors group-hover:text-emerald-400", children: title }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-0.5 text-[11px] font-medium text-muted-foreground", children: [
              itemCount,
              " ",
              itemCount === 1 ? "track" : "tracks"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.3)] transition-transform duration-300 group-hover:scale-110 group-hover:bg-emerald-400 group-active:scale-95", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "ml-0.5 h-4 w-4 fill-current" }) })
        ] }) }) })
      ]
    }
  );
}
function useMyPlaylistCovers(ids) {
  return useQuery({
    queryKey: ["my-playlist-covers", ids],
    queryFn: async () => {
      const map = {};
      if (!ids.length) return map;
      const { data } = await supabase.from("playlist_items").select("playlist_id, anime_poster, position").in("playlist_id", ids).order("position", { ascending: true });
      (data || []).forEach((r) => {
        if (!r.anime_poster) return;
        const arr = map[r.playlist_id] || (map[r.playlist_id] = []);
        if (arr.length < 4) arr.push(r.anime_poster);
      });
      return map;
    },
    enabled: ids.length > 0
  });
}
function MyPlaylistsWidget({ className }) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { data: playlists = [], isLoading } = usePlaylists();
  const visible = playlists.slice(0, 4);
  const { data: coverMap = {} } = useMyPlaylistCovers(visible.map((p) => p.id));
  if (!user) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: cn(
        "group relative flex w-full flex-col overflow-hidden rounded-[24px] border border-white/[0.08] bg-[#08090b] shadow-[0_20px_60px_rgba(0,0,0,0.4)] transition-all hover:border-white/[0.12]",
        className
      ),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute -left-16 -top-10 h-56 w-56 rounded-full bg-violet-500/10 blur-[90px] transition-all group-hover:bg-violet-500/20" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute -bottom-16 -right-16 h-56 w-56 rounded-full bg-primary/10 blur-[90px] transition-all group-hover:bg-primary/20" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative z-10 flex items-center justify-between p-5 pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-7 w-7 items-center justify-center rounded-full border border-violet-500/20 bg-violet-500/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Music2, { className: "h-3.5 w-3.5 text-violet-400" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] font-bold uppercase tracking-widest text-violet-400", children: "My Playlists" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative z-10 flex flex-col gap-1 px-3 pb-3", children: isLoading ? [...Array(3)].map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 rounded-2xl px-2 py-2 animate-pulse", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-12 w-12 shrink-0 rounded-xl bg-white/5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-2 py-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3 w-28 rounded-full bg-white/5" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2.5 w-16 rounded-full bg-white/5" })
          ] })
        ] }, i)) : visible.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => navigate("/playlists"),
            className: "m-2 flex flex-col items-center gap-2 rounded-2xl border border-dashed border-white/10 px-4 py-6 text-center transition-colors hover:border-violet-500/40 hover:bg-white/[0.03]",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex h-9 w-9 items-center justify-center rounded-full bg-violet-500/10 text-violet-400", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[13px] font-semibold text-zinc-200", children: "Create your first playlist" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] text-zinc-500", children: "Curate anime into shareable collections." })
            ]
          }
        ) : visible.map((p) => {
          const covers = coverMap[p.id] || (p.cover_image ? [p.cover_image] : []);
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Link,
            {
              to: `/playlist/${p.id}`,
              className: "group/row flex items-center gap-3 rounded-2xl px-2 py-2 transition-all hover:bg-white/[0.04]",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative h-12 w-12 shrink-0 overflow-hidden rounded-xl border border-white/[0.06] bg-zinc-900", children: covers.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("grid h-full w-full gap-px", covers.length >= 2 ? "grid-cols-2" : "grid-cols-1"), children: covers.slice(0, 4).map((img, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: getProxiedImageUrl(img), alt: "", className: "h-full w-full object-cover" }, idx)) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-full w-full items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Music2, { className: "h-5 w-5 text-zinc-600" }) }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate text-[13px] font-semibold text-zinc-100 transition-colors group-hover/row:text-white", children: p.name }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "truncate text-[11px] font-medium text-zinc-500 tabular-nums", children: [
                    p.items_count,
                    " ",
                    p.items_count === 1 ? "anime" : "anime"
                  ] })
                ] })
              ]
            },
            p.id
          );
        }) }),
        visible.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative z-10 p-3 pt-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Link,
          {
            to: "/playlists",
            className: "flex items-center justify-center gap-1.5 rounded-2xl border border-white/[0.08] bg-black/40 py-2.5 text-[12px] font-bold text-zinc-300 backdrop-blur-xl transition-all hover:border-violet-500/30 hover:text-white",
            children: [
              "View all playlists ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-3.5 w-3.5" })
            ]
          }
        ) })
      ]
    }
  );
}
function LeaderboardCard({ className, onOpen }) {
  const [sheetOpen, setSheetOpen] = reactExports.useState(false);
  const { data: topUsers = [], isLoading } = useLeaderboard("watched", 5);
  const handleOpen = () => {
    if (onOpen) onOpen();
    else setSheetOpen(true);
  };
  const getRankBadge = (index) => {
    switch (index) {
      case 0:
        return "bg-amber-500/10 text-amber-400 border-amber-500/20";
      case 1:
        return "bg-slate-300/10 text-slate-300 border-slate-300/20";
      case 2:
        return "bg-amber-700/10 text-amber-600 border-amber-700/20";
      default:
        return "bg-white/5 text-zinc-400 border-white/5";
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        onClick: handleOpen,
        className: cn(
          "group relative flex w-full cursor-pointer flex-col overflow-hidden rounded-[24px] border border-white/[0.08] bg-[#08090b] shadow-[0_20px_60px_rgba(0,0,0,0.4)] transition-all hover:border-white/[0.12]",
          className
        ),
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute -right-12 -top-12 h-56 w-56 rounded-full bg-amber-500/10 blur-[90px] transition-all group-hover:bg-amber-500/20" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute -bottom-16 -left-16 h-56 w-56 rounded-full bg-primary/10 blur-[90px] transition-all group-hover:bg-primary/20" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative z-10 flex items-center justify-between p-5 pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-7 w-7 items-center justify-center rounded-full border border-amber-500/20 bg-amber-500/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "h-3.5 w-3.5 text-amber-400" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] font-bold uppercase tracking-widest text-amber-400", children: "Leaderboard" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative z-10 flex flex-col gap-1 px-3", children: isLoading ? [...Array(5)].map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 rounded-xl px-2 py-2 animate-pulse", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-[52px] w-[38px] shrink-0 rounded-lg bg-white/5" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-2.5 py-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3 w-24 rounded-full bg-white/5" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2.5 w-16 rounded-full bg-white/5" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-8 w-8 shrink-0 rounded-full bg-white/5" })
          ] }, i)) : topUsers.slice(0, 5).map((entry, i) => {
            var _a;
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "group/row flex items-center gap-3 rounded-2xl px-2 py-2 transition-all duration-300 hover:bg-white/[0.04]",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative h-[52px] w-[38px] shrink-0 overflow-hidden rounded-lg border border-white/[0.05] bg-zinc-900 shadow-md", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(Avatar, { className: "h-full w-full rounded-none", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarImage, { src: entry.avatar_url || "", className: "object-cover transition-transform duration-500 group-hover/row:scale-110" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarFallback, { className: "rounded-none bg-zinc-800 text-xs font-bold text-zinc-400", children: (_a = (entry.display_name || entry.username || "U")[0]) == null ? void 0 : _a.toUpperCase() })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 ring-1 ring-inset ring-white/10 rounded-lg pointer-events-none" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1 py-0.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate text-[13px] font-semibold text-zinc-100 transition-colors group-hover/row:text-white", children: entry.display_name || entry.username || "Anonymous" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1 flex items-center gap-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: cn(
                        "flex h-4 items-center justify-center rounded border px-1.5 text-[9px] font-bold tracking-wider",
                        getRankBadge(i)
                      ), children: [
                        i === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Crown, { className: "mr-1 h-2.5 w-2.5" }),
                        "#",
                        i + 1
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[11px] font-medium text-zinc-500", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-zinc-300", children: entry.score.toLocaleString() }),
                        " eps"
                      ] })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.02] text-zinc-400 shadow-sm transition-all duration-300 group-hover/row:scale-110 group-hover/row:border-white/[0.15] group-hover/row:bg-white/[0.08] group-hover/row:text-white", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }) })
                ]
              },
              entry.user_id
            );
          }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative z-10 mt-3 p-4 pt-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative overflow-hidden rounded-2xl border border-white/[0.08] bg-black/40 p-3.5 shadow-xl backdrop-blur-xl transition-all duration-300 group-hover:border-amber-500/30 group-hover:bg-black/50", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "truncate text-sm font-bold text-white transition-colors group-hover:text-amber-400", children: "Full Rankings" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-0.5 text-[11px] font-medium text-muted-foreground", children: "See where you stand" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.3)] transition-transform duration-300 group-hover:scale-110 group-hover:bg-amber-400 group-active:scale-95", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-5 w-5" }) })
          ] }) }) })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(LeaderboardSheet, { open: sheetOpen, onOpenChange: setSheetOpen, defaultType: "watched" })
  ] });
}
const fade = (delay) => ({
  initial: { opacity: 0, y: 15 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.3, delay, ease: "easeOut" }
});
function CommunityRightRail({
  onlineUserIds,
  onlineUsers,
  members,
  onOpenLeaderboard,
  header,
  className
}) {
  const { ref: railRef, style: railStyle } = useFollowAlongRail();
  const scoped = Array.isArray(members);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("aside", { className: cn("hidden w-[380px] shrink-0 self-stretch 2xl:w-[420px] xl:block", className), children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { ref: railRef, style: railStyle, className: "sticky flex w-full flex-col gap-6", children: [
    header,
    /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { ...fade(0), children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      MembersShowcaseWidget,
      {
        onlineUsers,
        onlineUserIds,
        members: scoped ? members : void 0,
        title: scoped ? "Community" : "Members",
        limit: scoped ? 24 : 20,
        className: "w-full"
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { ...fade(0.03), children: /* @__PURE__ */ jsxRuntimeExports.jsx(WatchTogetherWidget, { className: "w-full" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { ...fade(0.05), children: /* @__PURE__ */ jsxRuntimeExports.jsx(AiringWidget, { className: "w-full" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { ...fade(0.1), children: /* @__PURE__ */ jsxRuntimeExports.jsx(SocialWidget, { onlineUserIds, className: "w-full" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { ...fade(0.15), children: /* @__PURE__ */ jsxRuntimeExports.jsx(TierListWidget, { className: "w-full" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { ...fade(0.2), children: /* @__PURE__ */ jsxRuntimeExports.jsx(PlaylistWidget, { className: "w-full" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { ...fade(0.22), children: /* @__PURE__ */ jsxRuntimeExports.jsx(MyPlaylistsWidget, { className: "w-full" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { ...fade(0.25), children: /* @__PURE__ */ jsxRuntimeExports.jsx(LeaderboardCard, { onOpen: onOpenLeaderboard, className: "w-full" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { ...fade(0.3), children: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingRail, { className: "w-full" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { ...fade(0.35), children: /* @__PURE__ */ jsxRuntimeExports.jsx(HashtagsWidget, { className: "w-full" }) })
  ] }) });
}
function useCommunityPresence() {
  const { user, profile } = useAuth();
  const [onlineUsers, setOnlineUsers] = reactExports.useState([]);
  reactExports.useEffect(() => {
    const channel = supabase.channel("community-presence", {
      config: { presence: { key: (user == null ? void 0 : user.id) || `anon-${Math.random().toString(36).slice(2)}` } }
    });
    const sync = () => {
      const state = channel.presenceState();
      const byId = /* @__PURE__ */ new Map();
      Object.values(state).forEach((entries) => {
        entries.forEach((entry) => {
          if (entry == null ? void 0 : entry.user_id) byId.set(entry.user_id, entry);
        });
      });
      setOnlineUsers([...byId.values()]);
    };
    channel.on("presence", { event: "sync" }, sync).on("presence", { event: "join" }, sync).on("presence", { event: "leave" }, sync).subscribe(async (status) => {
      if (status === "SUBSCRIBED" && user) {
        await channel.track({
          user_id: user.id,
          username: (profile == null ? void 0 : profile.username) ?? null,
          display_name: (profile == null ? void 0 : profile.display_name) ?? null,
          avatar_url: (profile == null ? void 0 : profile.avatar_url) ?? null
        });
      }
    });
    return () => {
      supabase.removeChannel(channel);
    };
  }, [user == null ? void 0 : user.id, profile == null ? void 0 : profile.username, profile == null ? void 0 : profile.display_name, profile == null ? void 0 : profile.avatar_url]);
  const onlineUserIds = reactExports.useMemo(() => new Set(onlineUsers.map((u) => u.user_id)), [onlineUsers]);
  return { onlineUsers, onlineUserIds, onlineCount: onlineUserIds.size };
}
export {
  CommunityRightRail as C,
  FeedList as F,
  LeaderboardSheet as L,
  useCommunityPresence as u
};
