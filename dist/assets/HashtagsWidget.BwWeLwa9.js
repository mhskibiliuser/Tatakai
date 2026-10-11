import { j as jsxRuntimeExports, e as useNavigate, r as reactExports, L as Link } from "./react-vendor.CAo4XUiA.js";
import { j as cn, z as usePublicWatchRooms, l as getProxiedImageUrl, u as useAuth, a2 as supabase, fg as useBatchUserBadges, fs as useFollow, a8 as Avatar, a9 as AvatarImage, aa as AvatarFallback, aQ as UserBadges } from "./index.C6yfkT5T.js";
import "./vendor.CJyRs4QS.js";
import { n as Radio, U as Users, aJ as Play, v as ArrowRight, ay as Tv, b as ChevronRight, c as Check, ap as UserPlus, bB as Flame, e as TrendingUp, bD as Hash } from "./icons.C2gBBarQ.js";
import { u as useAiringSchedule } from "./useAiringSchedule.CVdunhuV.js";
import { a as useLeaderboard } from "./useLeaderboard.BbUdnjoj.js";
import { a as useQuery } from "./tanstack.DPr3OB19.js";
function OnlineDot({
  className,
  size = "md"
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "span",
    {
      className: cn(
        "absolute bottom-0 right-0 block rounded-full bg-emerald-500 ring-2 ring-background",
        size === "sm" ? "h-2.5 w-2.5" : "h-3 w-3",
        className
      ),
      "aria-label": "Online",
      children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute inset-0 animate-ping rounded-full bg-emerald-400 opacity-60" })
    }
  );
}
function WatchTogetherWidget({ className }) {
  const navigate = useNavigate();
  const { data: publicRooms = [] } = usePublicWatchRooms();
  const activeRooms = publicRooms.filter((r) => r.is_active);
  const activeRoomsCount = activeRooms.length;
  const mainRoom = activeRooms.find((r) => r.is_playing) || activeRooms[0] || null;
  const watching = (mainRoom == null ? void 0 : mainRoom.participant_count) ?? 0;
  const displayPosters = reactExports.useMemo(
    () => activeRooms.slice(0, 3).map((r) => ({
      id: r.id,
      title: r.anime_title || r.name || "Watch Together",
      image: r.anime_poster ? getProxiedImageUrl(r.anime_poster) : null
    })),
    [activeRooms]
  );
  const slots = displayPosters.length ? displayPosters : [{ id: "empty", title: "No live rooms", image: null }];
  const handleNavigate = () => {
    navigate(mainRoom ? `/isshoni/room/${mainRoom.id}` : "/isshoni");
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      onClick: handleNavigate,
      className: cn(
        "group relative flex min-h-[380px] w-full cursor-pointer flex-col overflow-hidden rounded-[24px] border border-white/[0.08] bg-[#08090b] shadow-[0_20px_60px_rgba(0,0,0,0.4)] transition-all hover:border-white/[0.12]",
        className
      ),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute -left-20 -top-10 h-64 w-64 rounded-full bg-primary/10 blur-[100px] transition-all group-hover:bg-primary/20" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-violet-500/10 blur-[100px] transition-all group-hover:bg-violet-500/20" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-20 flex items-start justify-between p-5 pb-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-7 w-7 items-center justify-center rounded-full border border-primary/20 bg-primary/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Radio, { className: "h-3.5 w-3.5 text-primary" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] font-bold uppercase tracking-widest text-primary", children: "Isshoni" })
          ] }),
          activeRoomsCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 backdrop-blur-md", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "relative flex h-1.5 w-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute inline-flex h-full w-full animate-ping rounded-full bg-rose-500 opacity-75" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "relative inline-flex h-1.5 w-1.5 rounded-full bg-rose-500" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] font-semibold text-white/80", children: [
              activeRoomsCount,
              " Live"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative z-10 mt-6 flex flex-1 items-center justify-center px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative flex h-[190px] w-full items-center justify-center", children: slots.map((poster, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: cn(
              "absolute overflow-hidden rounded-[16px] border border-white/10 bg-white/5 shadow-2xl transition-all duration-500 ease-out",
              // Center / Front Poster
              index === 0 && "z-30 h-[190px] w-[130px] scale-100 group-hover:-translate-y-2 group-hover:scale-105",
              // Left / Back Poster
              index === 1 && "z-20 h-[160px] w-[110px] -translate-x-14 scale-95 opacity-50 group-hover:-translate-x-20 group-hover:-translate-y-1 group-hover:-rotate-3",
              // Right / Back Poster
              index === 2 && "z-10 h-[160px] w-[110px] translate-x-14 scale-95 opacity-50 group-hover:translate-x-20 group-hover:-translate-y-1 group-hover:rotate-3"
            ),
            children: [
              poster.image ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: poster.image,
                  alt: poster.title,
                  className: "h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                }
              ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/20 via-white/[0.03] to-violet-500/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Radio, { className: "h-7 w-7 text-white/30" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" })
            ]
          },
          poster.id
        )) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative z-30 mt-auto p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative overflow-hidden rounded-2xl border border-white/[0.08] bg-black/40 p-4 shadow-xl backdrop-blur-xl transition-all duration-300 group-hover:border-white/[0.15] group-hover:bg-black/50", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "truncate text-sm font-bold text-white transition-colors group-hover:text-primary", children: (mainRoom == null ? void 0 : mainRoom.anime_title) || (mainRoom == null ? void 0 : mainRoom.name) || "Start a Room" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 flex items-center gap-2 text-[11px] font-medium text-muted-foreground", children: mainRoom ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-3 w-3" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                watching,
                " watching"
              ] })
            ] }) : "Watch anime with friends" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.3)] transition-transform duration-300 group-hover:scale-110 group-active:scale-95", children: mainRoom ? /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "ml-0.5 h-4 w-4 fill-current" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4" }) })
        ] }) }) })
      ]
    }
  );
}
function formatAiring(airingAt) {
  const ms = airingAt * 1e3;
  const diff = ms - Date.now();
  const d = new Date(ms);
  const time = d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  if (diff < 60 * 60 * 1e3) return `in ${Math.max(1, Math.round(diff / 6e4))}m`;
  const today = /* @__PURE__ */ new Date();
  const isSameDay = (a, b) => a.toDateString() === b.toDateString();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  if (isSameDay(d, today)) return `Today · ${time}`;
  if (isSameDay(d, tomorrow)) return `Tomorrow · ${time}`;
  return `${d.toLocaleDateString([], { weekday: "short" })} · ${time}`;
}
function AiringWidget({ className }) {
  const navigate = useNavigate();
  const weekStart = reactExports.useMemo(() => {
    const d = /* @__PURE__ */ new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);
  const { data: entries = [], isLoading } = useAiringSchedule(weekStart);
  const upcoming = reactExports.useMemo(() => {
    const nowSec = Date.now() / 1e3;
    return [...entries].filter((e) => e.airingAt > nowSec).sort((a, b) => a.airingAt - b.airingAt).slice(0, 6);
  }, [entries]);
  const goTo = (entry) => navigate(`/anime/${entry.mediaId}`);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: cn(
        "group relative flex w-full flex-col overflow-hidden rounded-[24px] border border-white/[0.08] bg-[#08090b] shadow-[0_20px_60px_rgba(0,0,0,0.4)] transition-all hover:border-white/[0.12]",
        className
      ),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute -right-12 -top-12 h-56 w-56 rounded-full bg-rose-500/10 blur-[90px] transition-all group-hover:bg-rose-500/20" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute -bottom-16 -left-16 h-56 w-56 rounded-full bg-violet-500/10 blur-[90px] transition-all group-hover:bg-violet-500/20" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative z-10 flex items-center justify-between p-5 pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-7 w-7 items-center justify-center rounded-full border border-rose-500/20 bg-rose-500/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Tv, { className: "h-3.5 w-3.5 text-rose-400" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] font-bold uppercase tracking-widest text-rose-400", children: "Airing This Week" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative z-10 flex flex-col gap-1 px-3 pb-4", children: isLoading ? [...Array(5)].map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 rounded-2xl px-2 py-2 animate-pulse", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-14 w-10 shrink-0 rounded-lg bg-white/5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-2 py-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3 w-28 rounded-full bg-white/5" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2.5 w-16 rounded-full bg-white/5" })
          ] })
        ] }, i)) : upcoming.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "px-2 py-6 text-center text-[13px] text-zinc-500", children: "Nothing airing soon." }) : upcoming.map((entry) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: () => goTo(entry),
            className: "group/row flex items-center gap-3 rounded-2xl px-2 py-2 text-left transition-all duration-300 hover:bg-white/[0.04]",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative h-14 w-10 shrink-0 overflow-hidden rounded-lg border border-white/[0.05] bg-zinc-900 shadow-md", children: [
                entry.coverImage ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "img",
                  {
                    src: getProxiedImageUrl(entry.coverImage),
                    alt: entry.title,
                    className: "h-full w-full object-cover transition-transform duration-500 group-hover/row:scale-110"
                  }
                ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-full w-full items-center justify-center bg-zinc-800", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Tv, { className: "h-4 w-4 text-zinc-600" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 rounded-lg ring-1 ring-inset ring-white/10 pointer-events-none" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1 py-0.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate text-[13px] font-semibold text-zinc-100 transition-colors group-hover/row:text-white", children: entry.title }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1 flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "rounded border border-rose-500/20 bg-rose-500/10 px-1.5 py-0.5 text-[9px] font-bold tracking-wider text-rose-300", children: [
                    "EP ",
                    entry.episode
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] font-medium text-zinc-500", children: formatAiring(entry.airingAt) })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-4 w-4 shrink-0 text-zinc-600 transition-all group-hover/row:translate-x-0.5 group-hover/row:text-white" })
            ]
          },
          entry.id
        )) })
      ]
    }
  );
}
function useSuggestedUsers(limit = 8) {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["suggested-users", user == null ? void 0 : user.id, limit],
    queryFn: async () => {
      let followingIds = [];
      if (user) {
        const { data: follows } = await supabase.from("user_follows").select("following_id").eq("follower_id", user.id);
        followingIds = (follows || []).map((f) => f.following_id).filter(Boolean);
      }
      const exclude = new Set(followingIds);
      if (user) exclude.add(user.id);
      const { data, error } = await supabase.from("profiles").select("user_id, username, display_name, avatar_url, banner_url").eq("is_public", true).not("username", "is", null).order("created_at", { ascending: false }).limit(limit + followingIds.length + 10);
      if (error) throw error;
      return (data || []).filter((p) => p.user_id && !exclude.has(p.user_id)).slice(0, limit);
    }
  });
}
function TopUserRow({ entry, badges, online }) {
  var _a;
  const navigate = useNavigate();
  const { isFollowing, follow, unfollow, isFollowingLoading } = useFollow(entry.user_id);
  const name = entry.display_name || entry.username || "Anonymous";
  const goToProfile = () => {
    if (entry.username) navigate(`/user/${entry.username}`);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "group/row relative overflow-hidden rounded-xl border border-white/[0.07] transition-all duration-200 hover:border-white/[0.14]", children: [
    entry.banner_url ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      "img",
      {
        src: getProxiedImageUrl(entry.banner_url),
        alt: "",
        "aria-hidden": "true",
        className: "absolute inset-0 h-full w-full object-cover opacity-40 transition-transform duration-500 group-hover/row:scale-105"
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-sky-500/15 via-primary/8 to-transparent" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-[#08090b]/90 via-[#08090b]/70 to-[#08090b]/40" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex items-center gap-2.5 p-2.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: goToProfile, "aria-label": `View ${name}'s profile`, className: "relative shrink-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Avatar, { className: "h-9 w-9 ring-2 ring-white/10 transition-transform duration-200 group-hover/row:scale-105", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarImage, { src: entry.avatar_url || "", className: "object-cover" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarFallback, { className: "bg-zinc-800 text-xs font-bold text-zinc-400", children: (_a = name[0]) == null ? void 0 : _a.toUpperCase() })
        ] }),
        online && /* @__PURE__ */ jsxRuntimeExports.jsx(OnlineDot, { size: "sm", className: "ring-[#08090b]" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: goToProfile, className: "min-w-0 flex-1 text-left", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate text-xs font-semibold text-zinc-100", children: name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(UserBadges, { badges, size: 11, max: 1 })
        ] }),
        entry.username && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "truncate text-[10px] text-zinc-400/80", children: [
          "@",
          entry.username
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: (e) => {
            e.stopPropagation();
            isFollowing ? unfollow() : follow();
          },
          disabled: isFollowingLoading,
          className: cn(
            "flex h-7 shrink-0 items-center gap-1 rounded-full px-3 text-[11px] font-bold transition-all duration-200 active:scale-95 disabled:opacity-60",
            isFollowing ? "border border-white/[0.12] bg-black/40 text-zinc-300 hover:border-rose-500/40 hover:bg-rose-500/10 hover:text-rose-400" : "bg-white text-black shadow-[0_0_12px_rgba(255,255,255,0.15)] hover:bg-sky-400"
          ),
          children: isFollowing ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-3 w-3" }),
            "Following"
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(UserPlus, { className: "h-3 w-3" }),
            "Follow"
          ] })
        }
      )
    ] })
  ] });
}
function SocialWidget({ className, onlineUserIds }) {
  const { user } = useAuth();
  const { data: suggested = [], isLoading: loadingSuggested } = useSuggestedUsers(8);
  const { data: leaders = [], isLoading: loadingLeaders } = useLeaderboard("active", 8);
  const pool = suggested.length > 0 ? suggested : leaders;
  const isLoading = loadingSuggested || suggested.length === 0 && loadingLeaders;
  const suggestions = pool.filter((u) => u.user_id !== (user == null ? void 0 : user.id)).slice(0, 5);
  const { data: badgeMap } = useBatchUserBadges(suggestions.map((s) => s.user_id));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: cn(
        "group relative flex w-full flex-col overflow-hidden rounded-[24px] border border-white/[0.08] bg-[#08090b] shadow-[0_20px_60px_rgba(0,0,0,0.4)] transition-all hover:border-white/[0.12]",
        className
      ),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute -left-12 -top-12 h-56 w-56 rounded-full bg-sky-500/10 blur-[90px] transition-all group-hover:bg-sky-500/20" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute -bottom-16 -right-16 h-56 w-56 rounded-full bg-primary/10 blur-[90px] transition-all group-hover:bg-primary/20" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 flex items-center gap-2 p-4 pb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-7 w-7 items-center justify-center rounded-full border border-sky-500/20 bg-sky-500/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-3.5 w-3.5 text-sky-400" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] font-bold uppercase tracking-widest text-sky-400", children: "Who to Follow" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative z-10 flex flex-col gap-2 px-3 pb-4", children: isLoading ? [...Array(4)].map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "relative overflow-hidden rounded-xl border border-white/[0.05]",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 animate-pulse bg-white/[0.03]" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex items-center gap-2.5 p-2.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-9 w-9 shrink-0 animate-pulse rounded-full bg-white/10" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2.5 w-24 animate-pulse rounded-full bg-white/8" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2 w-16 animate-pulse rounded-full bg-white/5" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-7 w-20 animate-pulse rounded-full bg-white/5" })
              ] })
            ]
          },
          i
        )) : suggestions.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "px-2 py-6 text-center text-[13px] text-zinc-500", children: "No suggestions yet." }) : suggestions.map((entry) => /* @__PURE__ */ jsxRuntimeExports.jsx(TopUserRow, { entry, badges: badgeMap == null ? void 0 : badgeMap[entry.user_id], online: onlineUserIds == null ? void 0 : onlineUserIds.has(entry.user_id) }, entry.user_id)) })
      ]
    }
  );
}
function useTrendingTags(limit = 8) {
  return useQuery({
    queryKey: ["trending-tags", limit],
    staleTime: 5 * 60 * 1e3,
    queryFn: async () => {
      const db = supabase;
      const since = new Date(Date.now() - 7 * 24 * 60 * 60 * 1e3).toISOString();
      try {
        const { data, error } = await db.from("post_hashtags").select("tag").gte("created_at", since).limit(1e3);
        if (error) throw error;
        const counts = /* @__PURE__ */ new Map();
        (data || []).forEach((r) => counts.set(r.tag, (counts.get(r.tag) || 0) + 1));
        return [...counts.entries()].map(([tag, count]) => ({ tag, count })).sort((a, b) => b.count - a.count).slice(0, limit);
      } catch {
        return [];
      }
    }
  });
}
function useAllHashtags(limit = 100) {
  return useQuery({
    queryKey: ["all-hashtags", limit],
    staleTime: 5 * 60 * 1e3,
    queryFn: async () => {
      const db = supabase;
      try {
        const { data, error } = await db.from("post_hashtags").select("tag").limit(5e3);
        if (error) throw error;
        const counts = /* @__PURE__ */ new Map();
        (data || []).forEach((r) => counts.set(r.tag, (counts.get(r.tag) || 0) + 1));
        return [...counts.entries()].map(([tag, count]) => ({ tag, count })).sort((a, b) => b.count - a.count).slice(0, limit);
      } catch {
        return [];
      }
    }
  });
}
function TrendingRail({ className }) {
  const { data: tags = [], isLoading } = useTrendingTags(6);
  if (!isLoading && tags.length === 0) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: cn(
        "group relative flex w-full flex-col overflow-hidden rounded-[24px] border border-white/[0.08] bg-[#08090b] shadow-[0_20px_60px_rgba(0,0,0,0.4)] transition-all hover:border-white/[0.12]",
        className
      ),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute -right-12 -top-12 h-56 w-56 rounded-full bg-primary/10 blur-[90px] transition-all group-hover:bg-primary/20" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute -bottom-16 -left-16 h-56 w-56 rounded-full bg-rose-500/10 blur-[90px] transition-all group-hover:bg-rose-500/20" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 flex items-center justify-between p-5 pb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-7 w-7 items-center justify-center rounded-full border border-primary/20 bg-primary/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Flame, { className: "h-3.5 w-3.5 text-primary" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] font-bold uppercase tracking-widest text-primary", children: "Trending Topics" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "h-4 w-4 text-primary/50" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative z-10 flex flex-col gap-1 px-3 pb-4", children: isLoading ? [...Array(5)].map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between rounded-2xl px-2 py-2.5 animate-pulse", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3 w-28 rounded-full bg-white/5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-4 w-12 rounded-full bg-white/5" })
        ] }, i)) : tags.map(({ tag, count }, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Link,
          {
            to: `/community?tag=${encodeURIComponent(tag)}`,
            className: "group/row flex items-center gap-3 rounded-2xl px-2 py-2 transition-all duration-300 hover:bg-white/[0.04]",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-4 shrink-0 text-center text-[11px] font-bold tabular-nums text-zinc-600 transition-colors group-hover/row:text-primary", children: i + 1 }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex min-w-0 flex-1 items-center gap-1.5 text-[13px] font-semibold text-zinc-100 transition-colors group-hover/row:text-white", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Hash, { className: "h-3.5 w-3.5 shrink-0 text-primary/70" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: tag })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "shrink-0 rounded-full border border-white/[0.06] bg-white/[0.03] px-2 py-0.5 text-[10px] font-bold tabular-nums text-zinc-500 transition-colors group-hover/row:text-zinc-300", children: count })
            ]
          },
          tag
        )) })
      ]
    }
  );
}
function HashtagsWidget({ className }) {
  const { data: tags = [], isLoading } = useAllHashtags(100);
  if (!isLoading && tags.length === 0) return null;
  const total = tags.reduce((sum, t) => sum + t.count, 0);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: cn(
        "group relative flex w-full flex-col overflow-hidden rounded-[24px] border border-white/[0.08] bg-[#08090b] shadow-[0_20px_60px_rgba(0,0,0,0.4)] transition-all hover:border-white/[0.12]",
        className
      ),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute -right-12 -top-12 h-56 w-56 rounded-full bg-violet-500/10 blur-[90px] transition-all group-hover:bg-violet-500/20" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute -bottom-16 -left-16 h-56 w-56 rounded-full bg-primary/10 blur-[90px] transition-all group-hover:bg-primary/20" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 flex items-center justify-between p-5 pb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-7 w-7 items-center justify-center rounded-full border border-violet-500/20 bg-violet-500/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Hash, { className: "h-3.5 w-3.5 text-violet-400" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] font-bold uppercase tracking-widest text-violet-400", children: "All Hashtags" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] font-medium tabular-nums text-zinc-600", children: [
            tags.length,
            " · ",
            total
          ] })
        ] }),
        isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative z-10 flex flex-col gap-1 px-3 pb-4", children: [...Array(6)].map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between rounded-2xl px-2 py-2.5 animate-pulse", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3 w-28 rounded-full bg-white/5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-4 w-10 rounded-full bg-white/5" })
        ] }, i)) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative z-10 max-h-80 space-y-1 overflow-y-auto px-3 pb-4 no-scrollbar", children: tags.map(({ tag, count }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Link,
          {
            to: `/community?tag=${encodeURIComponent(tag)}`,
            className: "group/row flex items-center gap-3 rounded-2xl px-2 py-2 transition-all duration-300 hover:bg-white/[0.04]",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex min-w-0 flex-1 items-center gap-1.5 text-[13px] font-semibold text-zinc-100 transition-colors group-hover/row:text-white", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Hash, { className: "h-3.5 w-3.5 shrink-0 text-violet-400/70" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: tag })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "shrink-0 rounded-full border border-white/[0.06] bg-white/[0.03] px-2 py-0.5 text-[10px] font-bold tabular-nums text-zinc-500 transition-colors group-hover/row:text-zinc-300", children: count })
            ]
          },
          tag
        )) })
      ]
    }
  );
}
export {
  AiringWidget as A,
  HashtagsWidget as H,
  OnlineDot as O,
  SocialWidget as S,
  TrendingRail as T,
  WatchTogetherWidget as W
};
