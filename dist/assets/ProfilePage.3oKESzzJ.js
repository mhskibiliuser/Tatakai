import { e as useNavigate, j as jsxRuntimeExports, r as reactExports, L as Link, i as useParams, l as useSearchParams } from "./react-vendor.CAo4XUiA.js";
import { a as useQuery } from "./tanstack.DPr3OB19.js";
import { fa as getRankBadges, G as GlassPanel, j as cn, fb as getRankNameStyleForRank, b7 as getRankImageUrl, b9 as getBadgeHoverClass, a2 as supabase, dO as TATAKAI_API_URL, b4 as getRankTier, b5 as getNextRankTier, fc as rankScoreBreakdown, b6 as RANK_TIERS, fd as MEDIA_LABEL, fe as MEDIA_UNIT, b8 as getRankClassForRank, cP as TooltipProvider, cQ as Tooltip, cR as TooltipTrigger, cT as TooltipContent, ff as useFollowList, fg as useBatchUserBadges, l as getProxiedImageUrl, a8 as Avatar, a9 as AvatarImage, aa as AvatarFallback, aQ as UserBadges, fh as computeRankScore, ae as Dialog, af as DialogContent, ag as DialogHeader, ah as DialogTitle, az as Input, aC as ScrollArea, B as Button, fi as useUserForumPosts, fj as useUserPlaylists, dV as useUserTierLists, bA as Badge, A as PostCard, fk as CommentContent, s as useIsMobile, u as useAuth, ax as DialogTrigger, ay as Label, aB as Switch, D as useIsNativeApp, K as useIsDesktopApp, U as useIsMobileApp, fl as usePublicProfile, fm as readProfileCustomization, E as useWatchlist, F as useWatchHistory, bv as useMangaReadlist, fn as usePublicWatchlist, fo as usePublicWatchHistory, fp as usePublicMangaReadlist, fq as useReadingTrackTotals, fr as usePublicReadingTrackTotals, fs as useFollow, aO as useUserBadges, ft as computeReputation, S as Sidebar, fu as AvatarPickerSheet, fv as getRankNameStyle, fw as RankBadge, fx as ProfileSettingsSheet, bq as Tabs, br as TabsList, bs as TabsTrigger, bu as TabsContent, fy as ambientAccentStyle } from "./index.C6yfkT5T.js";
import { M as MobileNav } from "./MobileNav.ABHzkhTQ.js";
import { u as useWatchStreaks, a as usePublicWatchStreaks } from "./useWatchStreaks.D457Q6R9.js";
import { bC as Trophy, aN as TvMinimal, aD as Clock, aI as Star, a6 as Lock, a2 as Moon, cS as Mountain, aT as Zap, bB as Flame, x as CirclePlay, C as CircleCheck, v as ArrowRight, f as CalendarDays, I as Info, bW as CalendarClock, b as ChevronRight, ay as Tv, c as Check, aB as MessageSquareQuote, B as BookOpen, by as BookMarked, aA as Layers, bj as Activity, aJ as Play, z as Award, y as MessageSquare, cT as Percent, bF as Calendar, Z as Film, b_ as ThumbsUp, cU as ChartPie, e as TrendingUp, U as Users, aZ as List, aW as History, bd as CircleX, cu as Pause, aY as CircleCheckBig, m as Eye, j as ExternalLink, cV as Library, k as Sparkles, cW as Building2, cO as Shuffle, bh as FileText, ap as UserPlus, cX as ChartLine, H as Heart, ci as Lightbulb, S as Search, P as Plus, L as LayoutGrid, M as MessageCircle, aU as ListMusic, a as CircleAlert, a8 as Clapperboard, bg as Share2, a5 as Globe, aF as Save, u as ArrowLeft, bZ as Camera, i as Settings, aV as Shield } from "./icons.C2gBBarQ.js";
import { m as motion, A as AnimatePresence, u as useReducedMotion } from "./motion.DVGLRFCH.js";
import { u as useTrackedShows, b as usePublicTrackedShows } from "./useTrackedShows.Dbf34fk8.js";
import { u as useNextAiringEpisodes } from "./useNextAiringEpisodes.COq8rfNQ.js";
import { u as useAnimeMetaByIds, a as useMangaMetaByIds, b as useUserCommentsDetailed } from "./useUserCommentsDetailed.DTjSzD08.js";
import { R as ResponsiveContainer, b as RadarChart, P as PolarGrid, c as PolarAngleAxis, T as Tooltip$1, d as Radar, e as PieChart, f as Pie, g as Cell, A as AreaChart, C as CartesianGrid, X as XAxis, Y as YAxis, a as Area, B as BarChart, h as Bar, L as LineChart, i as Line } from "./charts.Dr1fgDJ-.js";
import { A as AnimatedCounter } from "./AnimatedCounter.DVb9HioJ.js";
import { bp as formatDistanceToNow, bf as ue } from "./vendor.CJyRs4QS.js";
import { P as PlaylistCard } from "./PlaylistCard.D4Kupyt4.js";
import { T as TierListCard } from "./TierListCard.xUrqhVp3.js";
import { S as Seo } from "./Seo.CEAYCbtv.js";
import { u as useUserRank } from "./useLeaderboard.BbUdnjoj.js";
import { b as useCharacterFavorites } from "./useCharacterFavorites.DOVoPcx4.js";
import { u as useNotifications } from "./useNotifications.BzSJE8km.js";
import "./supabase.WuRMX5Dg.js";
import "./radix.BiK9uYXL.js";
import "./hls.BlgtCWcq.js";
import "./editor.Dxw8dtyw.js";
function StreakIcon({ streak }) {
  if (streak === 0) return /* @__PURE__ */ jsxRuntimeExports.jsx(Moon, { className: "w-8 h-8 text-muted-foreground" });
  if (streak >= 30) return /* @__PURE__ */ jsxRuntimeExports.jsx(Mountain, { className: "w-8 h-8 text-orange-400" });
  if (streak >= 14) return /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-8 h-8 text-yellow-400" });
  if (streak >= 7) return /* @__PURE__ */ jsxRuntimeExports.jsx(Flame, { className: "w-8 h-8 text-orange-500" });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Flame, { className: "w-8 h-8 text-orange-300" });
}
function WatchStreaks({
  isOwnProfile = false,
  rankScore,
  streak: streakProp,
  stats: statsProp
}) {
  const own = useWatchStreaks();
  const navigate = useNavigate();
  const streak = streakProp ?? own.streak;
  const stats = statsProp ?? own.stats;
  const score = rankScore ?? stats.totalEpisodes;
  const badges = getRankBadges(score);
  const unlockedCount = badges.filter((b) => b.unlocked).length;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassPanel, { className: cn(
        "p-4 text-center relative overflow-hidden",
        streak.isActiveToday && "border-orange-500/20 bg-orange-500/5"
      ), children: [
        streak.isActiveToday && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 right-0 w-12 h-12 bg-orange-500/10 rounded-full -translate-y-4 translate-x-4 blur-xl" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(StreakIcon, { streak: streak.currentStreak }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-black font-display", children: streak.currentStreak }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground font-medium", children: "Day Streak" }),
          streak.isActiveToday && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-orange-400 font-semibold", children: "Active Today!" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(GlassPanel, { className: "p-4 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "w-8 h-8 text-amber-400" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-black font-display", children: streak.longestStreak }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground font-medium", children: "Best Streak" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(GlassPanel, { className: "p-4 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TvMinimal, { className: "w-8 h-8 text-blue-400" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-black font-display", children: stats.totalEpisodes }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground font-medium", children: "Episodes" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(GlassPanel, { className: "p-4 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-8 h-8 text-primary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-black font-display", children: stats.totalHours }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground font-medium", children: "Hours" })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "w-4 h-4 text-amber-400" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-base font-bold", children: "Rank Badges" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
            unlockedCount,
            "/",
            badges.length
          ] })
        ] }),
        isOwnProfile && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => navigate("/stats"),
            className: "text-xs text-primary hover:underline",
            children: "View full stats →"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-4 h-1.5 bg-muted rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          className: "h-full bg-gradient-to-r from-primary to-secondary rounded-full",
          initial: { width: 0 },
          animate: { width: `${unlockedCount / badges.length * 100}%` },
          transition: { duration: 1, ease: "easeOut", delay: 0.2 }
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3", children: badges.map((badge, i) => {
        const ns = getRankNameStyleForRank(badge.rank);
        return /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { opacity: 0, scale: 0.9 },
            animate: { opacity: 1, scale: 1 },
            transition: { delay: i * 0.03, duration: 0.2 },
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              GlassPanel,
              {
                className: cn(
                  "p-3 flex flex-col items-center gap-2 text-center relative overflow-hidden",
                  !badge.unlocked && "opacity-40 grayscale",
                  badge.unlocked && cn("border-border/40", getBadgeHoverClass(badge.rank))
                ),
                children: [
                  badge.unlocked && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 right-0 w-8 h-8 bg-[hsl(var(--profile-accent)/0.12)] rounded-full -translate-y-3 translate-x-3 blur-md" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "img",
                    {
                      src: getRankImageUrl(badge.rank),
                      alt: badge.name,
                      className: "w-10 h-10 object-contain"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: cn("text-xs font-bold leading-tight", badge.unlocked ? ns.className : ""),
                        style: badge.unlocked ? ns.style : {},
                        children: badge.name
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-muted-foreground mt-0.5 leading-tight", children: badge.description })
                  ] }),
                  badge.unlocked ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-2 right-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-4 h-4 rounded-full bg-primary/20 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-2.5 h-2.5 text-primary fill-primary" }) }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-2 right-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-4 h-4 rounded-full bg-background/60 border border-white/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-2.5 h-2.5 text-muted-foreground/60" }) }) })
                ]
              }
            )
          },
          badge.rank
        );
      }) })
    ] })
  ] });
}
function useExternalStats(profile, enabled = true) {
  const hasAnilist = !!((profile == null ? void 0 : profile.anilist_access_token) || (profile == null ? void 0 : profile.anilist_user_id));
  const hasMal = !!((profile == null ? void 0 : profile.mal_access_token) || (profile == null ? void 0 : profile.mal_user_id));
  const anyLinked = hasAnilist || hasMal;
  const { data, isLoading } = useQuery({
    queryKey: ["external-stats", hasAnilist, hasMal],
    enabled: enabled && anyLinked,
    staleTime: 5 * 60 * 1e3,
    retry: 1,
    queryFn: async () => {
      const { data: { session } } = await supabase.auth.getSession();
      const token = session == null ? void 0 : session.access_token;
      if (!token) return [];
      const res = await fetch(`${TATAKAI_API_URL}/sync/stats`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) return [];
      const json = await res.json();
      return json.data ?? [];
    }
  });
  return {
    stats: data ?? [],
    hasAnilist,
    hasMal,
    isLoading: enabled && anyLinked && isLoading
  };
}
function OverviewAchievements({
  streakDays = 0,
  longestStreak = 0,
  episodesCount = 0,
  rankScore,
  units,
  onNavigateTab
}) {
  const score = rankScore ?? episodesCount;
  const currentRank = getRankTier(score);
  const nextRank = getNextRankTier(score);
  const currentRankStyle = getRankNameStyleForRank(currentRank.rank);
  const breakdown = reactExports.useMemo(() => units ? rankScoreBreakdown(units) : [], [units]);
  const unlockedCount = RANK_TIERS.filter((t) => score >= t.minScore).length;
  const rankProgressPct = nextRank ? Math.min(100, Math.round(nextRank.progress / (nextRank.progress + nextRank.needed) * 100)) : 100;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassPanel, { className: "flex flex-col gap-6 p-5 sm:p-7 border-white/[0.04] bg-background/40 backdrop-blur-2xl rounded-2xl overflow-hidden relative", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 left-1/4 w-1/2 h-24 bg-[hsl(var(--profile-accent)/0.10)] blur-[60px] rounded-full pointer-events-none" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 flex flex-col sm:flex-row sm:items-center gap-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative shrink-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-primary/20 blur-xl rounded-full" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: getRankImageUrl(currentRank.rank),
            alt: currentRank.name,
            className: "w-16 h-16 sm:w-20 sm:h-20 object-contain relative z-10 drop-shadow-xl"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 w-full", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] sm:text-xs text-muted-foreground/80 uppercase tracking-widest font-semibold mb-1", children: "Current Rank" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline gap-3 mb-2.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "h2",
            {
              className: cn("text-2xl sm:text-3xl font-bold tracking-tight", currentRankStyle.className),
              style: currentRankStyle.style,
              children: currentRank.name
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground/50 font-mono", children: [
            "Rank ",
            currentRank.rank,
            " / 16 · ",
            score.toLocaleString(),
            " RP"
          ] })
        ] }),
        nextRank && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5 w-full max-w-md", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center text-xs", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground", children: [
              "Progress to ",
              nextRank.tier.name
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-muted-foreground/80", children: [
              nextRank.needed,
              " RP left"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1.5 w-full bg-white/[0.05] rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { width: 0 },
              animate: { width: `${rankProgressPct}%` },
              transition: { duration: 1, ease: "easeOut" },
              className: "h-full bg-gradient-to-r from-primary/60 to-primary rounded-full"
            }
          ) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3 z-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 p-3.5 rounded-xl bg-white/[0.01] border border-white/[0.03] transition-colors hover:bg-white/[0.02]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 rounded-lg bg-orange-500/10 text-orange-400", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Flame, { className: "w-4 h-4" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] uppercase font-semibold text-muted-foreground/60 tracking-wider", children: "Watch Streak" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-display text-sm font-bold text-foreground", children: [
            streakDays,
            " Days ",
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] font-normal text-muted-foreground/50 ml-1", children: [
              "Best: ",
              longestStreak
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 p-3.5 rounded-xl bg-white/[0.01] border border-white/[0.03] transition-colors hover:bg-white/[0.02]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 rounded-lg bg-primary/10 text-primary", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CirclePlay, { className: "w-4 h-4" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] uppercase font-semibold text-muted-foreground/60 tracking-wider", children: "Ranks Unlocked" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-display text-sm font-bold text-foreground", children: [
            unlockedCount,
            " / 16"
          ] })
        ] })
      ] })
    ] }),
    breakdown.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2 z-10", children: breakdown.map((row) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "span",
      {
        className: "inline-flex items-center gap-1.5 rounded-full border border-white/[0.05] bg-white/[0.02] px-2.5 py-1 text-[10px]",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground/80", children: MEDIA_LABEL[row.kind] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground/60", children: [
            row.units.toLocaleString(),
            " ",
            MEDIA_UNIT[row.kind]
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-primary/70", children: [
            "+",
            row.points,
            " RP"
          ] })
        ]
      },
      row.kind
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "z-10 flex flex-col gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "w-4 h-4 text-primary/80" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-sm sm:text-base text-foreground", children: "Rank Badges" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground/50 ml-1", children: [
          unlockedCount,
          " / 16"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-2.5", children: RANK_TIERS.map((tier) => {
        const unlocked = score >= tier.minScore;
        const isCurrent = tier.rank === currentRank.rank;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            title: `${tier.name} — ${tier.minScore.toLocaleString()} RP`,
            className: cn(
              "group relative flex flex-col items-center text-center gap-1 rounded-xl border p-2.5 duration-300 select-none",
              unlocked ? cn("border-white/[0.06] bg-gradient-to-b from-white/[0.03] to-transparent", getBadgeHoverClass(tier.rank)) : "border-white/[0.02] bg-white/[0.005] opacity-45 hover:opacity-70",
              isCurrent && "border-primary/40 ring-1 ring-primary/30 bg-primary/[0.04] opacity-100"
            ),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-10 h-10 flex items-center justify-center", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "img",
                  {
                    src: getRankImageUrl(tier.rank),
                    alt: tier.name,
                    className: cn("w-full h-full object-contain", !unlocked && "grayscale opacity-70")
                  }
                ),
                unlocked ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-2.5 h-2.5 text-emerald-400" }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-background border border-white/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-2 h-2 text-muted-foreground/60" }) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: cn(
                    "text-[10px] font-bold leading-tight truncate w-full",
                    unlocked ? getRankClassForRank(tier.rank) : "text-muted-foreground/50"
                  ),
                  children: tier.name
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-mono text-[8px] text-muted-foreground/40", children: [
                tier.minScore.toLocaleString(),
                " RP"
              ] })
            ]
          },
          tier.rank
        );
      }) })
    ] }),
    onNavigateTab && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 pt-4 mt-2 border-t border-white/[0.03] flex items-center justify-between text-xs", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground/60", children: "Keep going to unlock higher tiers" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: () => onNavigateTab("streaks"),
          className: "flex items-center gap-1.5 font-medium text-primary hover:text-primary/80 transition-colors group",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "All Milestones" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-3.5 h-3.5 transition-transform group-hover:translate-x-1" })
          ]
        }
      )
    ] })
  ] });
}
const SOURCE_TABS = [
  { key: "all", label: "All" },
  { key: "anime", label: "Anime" },
  { key: "manga", label: "Manga" },
  { key: "forum", label: "Forum" }
];
const WEEKS = 26;
const DAY_MS = 864e5;
function dayKey(d) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}
function levelClass(count) {
  if (count <= 0) return "bg-white/[0.02] hover:bg-white/[0.08] border-white/[0.04]";
  if (count === 1) return "bg-primary/20 hover:bg-primary/30 border-primary/20 shadow-sm";
  if (count <= 3) return "bg-primary/45 hover:bg-primary/55 border-primary/30 shadow-sm";
  if (count <= 6) return "bg-primary/70 hover:bg-primary/80 border-primary/40 shadow-sm";
  return "bg-primary hover:brightness-110 border-primary/50 shadow-[0_0_12px_rgba(244,63,94,0.35)]";
}
function OverviewActivityHeatmap({
  history = [],
  mangaReadlist = [],
  commentDates = [],
  currentStreak = 0,
  longestStreak = 0
}) {
  const [source, setSource] = reactExports.useState("all");
  const since = reactExports.useMemo(() => {
    const d = /* @__PURE__ */ new Date();
    d.setHours(0, 0, 0, 0);
    const start = new Date(d.getTime() - (WEEKS * 7 - 1) * DAY_MS);
    start.setDate(start.getDate() - start.getDay());
    return start;
  }, []);
  const counts = reactExports.useMemo(() => {
    const map = {};
    const add = (dateVal) => {
      if (!dateVal) return;
      const d = new Date(dateVal);
      if (Number.isNaN(d.getTime())) return;
      const key = dayKey(d);
      map[key] = (map[key] || 0) + 1;
    };
    if (source === "all" || source === "anime") {
      history.forEach((row) => add((row == null ? void 0 : row.watched_at) || (row == null ? void 0 : row.updated_at)));
    }
    if (source === "all" || source === "manga") {
      mangaReadlist.forEach((row) => add((row == null ? void 0 : row.updated_at) || (row == null ? void 0 : row.created_at)));
    }
    if (source === "all" || source === "forum") {
      commentDates.forEach((row) => add(row == null ? void 0 : row.created_at));
    }
    return map;
  }, [history, mangaReadlist, commentDates, source]);
  const { weeks, totalInPeriod } = reactExports.useMemo(() => {
    const cols = [];
    let running = 0;
    for (let w = 0; w < WEEKS; w++) {
      const col = [];
      for (let d = 0; d < 7; d++) {
        const date = new Date(since.getTime() + (w * 7 + d) * DAY_MS);
        const key = dayKey(date);
        const count = counts[key] || 0;
        running += count;
        col.push({ date, key, count });
      }
      cols.push(col);
    }
    return { weeks: cols, totalInPeriod: running };
  }, [counts, since]);
  const now = Date.now();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassPanel, { className: "relative overflow-hidden p-5 sm:p-7 flex flex-col justify-between border-white/[0.04] bg-background/40 backdrop-blur-2xl rounded-2xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-12 -right-12 w-48 h-48 bg-[hsl(var(--profile-accent)/0.10)] blur-[70px] rounded-full pointer-events-none" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -bottom-12 -left-12 w-48 h-48 bg-[hsl(var(--profile-accent)/0.05)] blur-[70px] rounded-full pointer-events-none" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarDays, { className: "w-4 h-4 text-primary/80" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-base sm:text-lg text-foreground tracking-tight", children: "Activity & Watch" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-semibold text-muted-foreground/80 px-2 py-0.5 rounded-full bg-white/[0.04] border border-white/[0.05] uppercase tracking-wider", children: "26 Weeks" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground/70", children: "Track your daily watch velocity, consistency, and active streaks" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs self-start lg:self-auto flex-wrap", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-1 bg-black/20 p-1 rounded-xl border border-white/[0.03]", children: SOURCE_TABS.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => setSource(t.key),
            className: cn(
              "px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all duration-200",
              source === t.key ? "bg-white/10 text-foreground shadow-sm" : "text-muted-foreground/60 hover:text-foreground/90 hover:bg-white/[0.02]"
            ),
            children: t.label
          },
          t.key
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-black/20 border border-white/[0.03]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Flame, { className: "w-3.5 h-3.5 text-orange-400" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground/70 text-[11px]", children: "Current:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-bold text-foreground font-display tabular-nums", children: [
            currentStreak,
            "d"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-black/20 border border-white/[0.03]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "w-3.5 h-3.5 text-amber-400" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground/70 text-[11px]", children: "Record:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-bold text-foreground font-display tabular-nums", children: [
            longestStreak,
            "d"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-primary/10 border border-primary/20 text-primary", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold font-display tabular-nums", children: totalInPeriod }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] uppercase font-semibold tracking-wide", children: source === "forum" ? "comments" : source === "manga" ? "updates" : "events" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(TooltipProvider, { delayDuration: 100, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative z-10 overflow-x-auto scrollbar-none pb-2 pt-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1.5 justify-between min-w-[580px]", children: weeks.map((col, wi) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-1.5", children: col.map((cell, di) => {
      const isFuture = cell.date.getTime() > now;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(Tooltip, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TooltipTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { opacity: 0, scale: 0.7 },
            whileInView: { opacity: 1, scale: 1 },
            viewport: { once: true },
            transition: {
              duration: 0.25,
              delay: wi * 8e-3 + di * 3e-3,
              ease: "easeOut"
            },
            className: cn(
              "h-3.5 w-3.5 rounded-[4px] border transition-all duration-200 cursor-pointer",
              isFuture ? "bg-transparent border-transparent pointer-events-none" : levelClass(cell.count)
            )
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          TooltipContent,
          {
            side: "top",
            className: "text-xs bg-background/90 backdrop-blur-xl border border-white/10 p-2.5 shadow-2xl rounded-xl",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-foreground mb-0.5", children: cell.date.toLocaleDateString("en-US", {
                weekday: "short",
                month: "short",
                day: "numeric",
                year: "numeric"
              }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground/80", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-primary font-mono", children: cell.count }),
                " ",
                cell.count === 1 ? "episode/activity" : "episodes/activities",
                " tracked"
              ] })
            ]
          }
        )
      ] }, cell.key);
    }) }, wi)) }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 flex items-center justify-between pt-4 border-t border-white/[0.04] mt-2 text-[11px] text-muted-foreground/60", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { className: "w-3.5 h-3.5 text-muted-foreground/50" }),
        "Interactive daily watch & read activity"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Less" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1 items-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2.5 w-2.5 rounded-[3px] bg-white/[0.02] border border-white/[0.04]" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2.5 w-2.5 rounded-[3px] bg-primary/20 border border-primary/20" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2.5 w-2.5 rounded-[3px] bg-primary/45 border border-primary/30" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2.5 w-2.5 rounded-[3px] bg-primary/70 border border-primary/40" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2.5 w-2.5 rounded-[3px] bg-primary border border-primary/50" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "More" })
      ] })
    ] })
  ] });
}
function Countdown({ airingAt, now }) {
  const diff = airingAt * 1e3 - now;
  if (diff <= 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-xs font-bold text-primary tabular-nums animate-pulse", children: "Airing now" });
  }
  const totalSec = Math.floor(diff / 1e3);
  const days = Math.floor(totalSec / 86400);
  const hours = Math.floor(totalSec % 86400 / 3600);
  const minutes = Math.floor(totalSec % 3600 / 60);
  const seconds = totalSec % 60;
  const parts = days > 0 ? [
    { v: days, l: "d" },
    { v: hours, l: "h" },
    { v: minutes, l: "m" }
  ] : [
    { v: hours, l: "h" },
    { v: minutes, l: "m" },
    { v: seconds, l: "s" }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-xs font-bold text-primary tabular-nums", children: parts.map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
    String(p.v).padStart(2, "0"),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-primary/60", children: p.l }),
    i < parts.length - 1 ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary/30", children: " " }) : null
  ] }, p.l)) });
}
function OverviewCalendarSaves({
  userId,
  isViewingOther = false,
  isPublic = false,
  showCalendar = true
} = {}) {
  const own = useTrackedShows();
  const other = usePublicTrackedShows(userId, isPublic, showCalendar);
  const { data: tracked = [], isLoading: tracksLoading } = isViewingOther ? other : own;
  const anilistIds = reactExports.useMemo(
    () => tracked.map((t) => t.anilist_id).filter((id) => typeof id === "number" && id > 0),
    [tracked]
  );
  const { data: airingMap = {}, isLoading: airingLoading } = useNextAiringEpisodes(anilistIds);
  const [now, setNow] = reactExports.useState(() => Date.now());
  reactExports.useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1e3);
    return () => clearInterval(id);
  }, []);
  const rows = reactExports.useMemo(() => {
    const mapped = tracked.map((t) => {
      const info = typeof t.anilist_id === "number" ? airingMap[t.anilist_id] : void 0;
      const finished = !(info == null ? void 0 : info.airingAt) && ((info == null ? void 0 : info.status) === "FINISHED" || (info == null ? void 0 : info.status) === "CANCELLED");
      return {
        key: t.id,
        anilistId: t.anilist_id,
        title: (info == null ? void 0 : info.title) || t.title || "Unknown",
        coverImage: (info == null ? void 0 : info.coverImage) || t.image_url || null,
        airingAt: (info == null ? void 0 : info.airingAt) ?? null,
        episode: (info == null ? void 0 : info.episode) ?? null,
        totalEpisodes: (info == null ? void 0 : info.totalEpisodes) ?? null,
        finished
      };
    });
    return mapped.sort((a, b) => {
      if (a.airingAt && b.airingAt) return a.airingAt - b.airingAt;
      if (a.airingAt) return -1;
      if (b.airingAt) return 1;
      return a.title.localeCompare(b.title);
    });
  }, [tracked, airingMap]);
  const isLoading = tracksLoading || anilistIds.length > 0 && airingLoading;
  const upcomingCount = rows.filter((r) => r.airingAt).length;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassPanel, { className: "relative overflow-hidden p-5 sm:p-7 flex flex-col justify-between border-white/[0.04] bg-background/40 backdrop-blur-2xl rounded-2xl h-full", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-12 -right-12 w-48 h-48 bg-[hsl(var(--profile-accent)/0.10)] blur-[70px] rounded-full pointer-events-none" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 flex flex-col flex-1 justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3 mb-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-1.5 rounded-lg border border-white/[0.05] bg-primary/10 text-primary", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarClock, { className: "w-4 h-4" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-display font-bold text-base text-foreground tracking-tight", children: "Tatakai Calendar" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground/70 font-medium", children: upcomingCount > 0 ? `${upcomingCount} saved ${upcomingCount === 1 ? "show" : "shows"} airing soon` : isViewingOther ? "Saved shows and episode countdowns" : "Your saved shows and episode countdowns" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Link,
            {
              to: "/calendar",
              className: "flex items-center gap-1 text-xs font-semibold text-primary hover:text-primary/80 transition-colors group shrink-0",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Calendar" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" })
              ]
            }
          )
        ] }),
        isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2.5", children: Array.from({ length: 4 }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "h-[58px] bg-white/[0.02] border border-white/[0.04] rounded-xl animate-pulse"
          },
          i
        )) }) : rows.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2.5 max-h-[340px] overflow-y-auto scrollbar-none pr-0.5", children: rows.slice(0, 8).map((row, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { opacity: 0, y: 8 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            transition: { duration: 0.25, delay: idx * 0.04, ease: "easeOut" },
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Link,
              {
                to: row.anilistId ? `/anilist/${row.anilistId}` : "/calendar",
                className: "group flex items-center justify-between p-2.5 rounded-xl border border-white/[0.04] bg-white/[0.02] hover:bg-white/[0.05] hover:border-primary/30 transition-all duration-200 shadow-sm",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 min-w-0", children: [
                    row.coverImage ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "img",
                      {
                        src: row.coverImage,
                        alt: row.title,
                        loading: "lazy",
                        className: "w-9 h-12 rounded-lg object-cover shrink-0 border border-white/10 group-hover:scale-105 transition-transform duration-300"
                      }
                    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-12 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Tv, { className: "w-4 h-4 text-muted-foreground" }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("h5", { className: "font-semibold text-xs text-foreground/90 truncate group-hover:text-primary transition-colors", children: row.title }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground/70 font-medium", children: row.airingAt && row.episode ? `Episode ${row.episode}${row.totalEpisodes ? ` of ${row.totalEpisodes}` : ""}` : row.finished ? "Finished airing" : "No upcoming episode" })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-right shrink-0 pl-2", children: row.airingAt ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Countdown, { airingAt: row.airingAt, now }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block text-[10px] text-muted-foreground/70 font-medium", children: new Date(row.airingAt * 1e3).toLocaleDateString(void 0, {
                      weekday: "short",
                      month: "short",
                      day: "numeric"
                    }) })
                  ] }) : row.finished ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 text-[10px] font-semibold text-muted-foreground/60", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-3 h-3" }),
                    "Complete"
                  ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-semibold text-muted-foreground/50", children: "TBA" }) })
                ]
              }
            )
          },
          row.key
        )) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-8 border border-dashed border-white/[0.08] rounded-xl bg-white/[0.01]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarClock, { className: "w-8 h-8 mx-auto text-muted-foreground/30 mb-2" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground/70", children: "No saved shows yet" }),
          !isViewingOther && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground/50 mt-1", children: "Track a show from its page or the calendar to see countdowns here" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pt-4 border-t border-white/[0.04] mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Link,
        {
          to: "/calendar",
          className: "w-full py-2.5 px-3 rounded-xl bg-white/[0.03] hover:bg-primary/10 border border-white/[0.06] hover:border-primary/20 text-xs font-bold text-center block text-foreground hover:text-primary transition-all duration-200",
          children: "Open Tatakai Calendar →"
        }
      ) })
    ] })
  ] });
}
const MAX_REVIEWS = 3;
function toStars(rating) {
  return rating > 5 ? Math.round(rating / 2) : rating;
}
function OverviewReviews({
  ratings = [],
  watchlist = [],
  history = [],
  isViewingOther = false
}) {
  const localMetaById = reactExports.useMemo(() => {
    const map = /* @__PURE__ */ new Map();
    const add = (row) => {
      const id = row == null ? void 0 : row.anime_id;
      if (!id || map.has(id)) return;
      map.set(id, { title: (row == null ? void 0 : row.anime_name) || "", poster: (row == null ? void 0 : row.anime_poster) ?? null });
    };
    watchlist.forEach(add);
    history.forEach(add);
    return map;
  }, [watchlist, history]);
  const topReviews = reactExports.useMemo(() => {
    return ratings.filter((r) => typeof r.review === "string" && r.review.trim().length > 0).sort((a, b) => {
      const ta = a.created_at ? Date.parse(a.created_at) : 0;
      const tb = b.created_at ? Date.parse(b.created_at) : 0;
      return tb - ta;
    }).slice(0, MAX_REVIEWS);
  }, [ratings]);
  const unresolvedIds = reactExports.useMemo(
    () => topReviews.map((r) => r.anime_id).filter((id) => {
      if (!id) return false;
      const local = localMetaById.get(id);
      return !(local == null ? void 0 : local.title) || !(local == null ? void 0 : local.poster);
    }),
    [topReviews, localMetaById]
  );
  const { data: remoteMeta = {} } = useAnimeMetaByIds(unresolvedIds);
  const totalReviews = reactExports.useMemo(
    () => ratings.filter((r) => typeof r.review === "string" && r.review.trim().length > 0).length,
    [ratings]
  );
  const reviews = reactExports.useMemo(() => {
    return topReviews.map((r) => {
      var _a;
      const local = r.anime_id ? localMetaById.get(r.anime_id) : void 0;
      const numeric = Number((_a = String(r.anime_id ?? "").match(/(\d+)/)) == null ? void 0 : _a[1]);
      const remote = Number.isFinite(numeric) ? remoteMeta[numeric] : void 0;
      return {
        animeId: r.anime_id || "",
        rating: r.rating,
        review: (r.review || "").trim(),
        createdAt: r.created_at,
        title: (local == null ? void 0 : local.title) || (remote == null ? void 0 : remote.title) || "Unknown title",
        poster: (local == null ? void 0 : local.poster) || (remote == null ? void 0 : remote.coverImage) || null
      };
    });
  }, [topReviews, localMetaById, remoteMeta]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassPanel, { className: "relative overflow-hidden p-5 sm:p-7 flex flex-col justify-between border-white/[0.04] bg-background/40 backdrop-blur-2xl rounded-2xl h-full", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-12 -right-12 w-48 h-48 bg-[hsl(var(--profile-accent)/0.10)] blur-[70px] rounded-full pointer-events-none" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-between gap-3 mb-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-1.5 rounded-lg border border-white/[0.05] bg-primary/10 text-primary", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquareQuote, { className: "w-4 h-4" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-display font-bold text-base text-foreground tracking-tight", children: isViewingOther ? "Reviews" : "Your Reviews" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground/70 font-medium", children: totalReviews > 0 ? `Showing ${reviews.length} of ${totalReviews} ${totalReviews === 1 ? "review" : "reviews"}` : "Written reviews on rated anime" })
        ] })
      ] }) }),
      reviews.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2.5", children: reviews.map((row, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 8 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { duration: 0.25, delay: idx * 0.04, ease: "easeOut" },
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Link,
            {
              to: row.animeId ? `/anime/${row.animeId}` : "#",
              className: "group flex gap-3 p-3 rounded-xl border border-white/[0.04] bg-white/[0.02] hover:bg-white/[0.05] hover:border-primary/30 transition-all duration-200",
              children: [
                row.poster ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "img",
                  {
                    src: row.poster,
                    alt: row.title,
                    loading: "lazy",
                    className: "w-10 h-14 rounded-lg object-cover shrink-0 border border-white/10 group-hover:scale-105 transition-transform duration-300"
                  }
                ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-14 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Tv, { className: "w-4 h-4 text-muted-foreground" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h5", { className: "font-semibold text-xs text-foreground/90 truncate group-hover:text-primary transition-colors", children: row.title }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 shrink-0 text-[10px] font-bold text-amber-400 tabular-nums", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-3 h-3 fill-amber-400 text-amber-400" }),
                      toStars(row.rating),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground/50", children: "/5" })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-[11px] text-muted-foreground/80 leading-relaxed line-clamp-3", children: row.review })
                ] })
              ]
            }
          )
        },
        `${row.animeId}-${idx}`
      )) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-8 border border-dashed border-white/[0.08] rounded-xl bg-white/[0.01]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquareQuote, { className: "w-8 h-8 mx-auto text-muted-foreground/30 mb-2" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground/70", children: isViewingOther ? "No reviews written yet" : "You haven't written any reviews yet" }),
        !isViewingOther && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground/50 mt-1", children: "Rate an anime and add a review to see it here" })
      ] })
    ] })
  ] });
}
const GlassTooltip$4 = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-white/[0.08] bg-background/80 p-3 shadow-2xl backdrop-blur-2xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-foreground/90", children: payload[0].payload.genre }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground/70", children: [
        "Affinity ",
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono font-semibold text-foreground", children: [
          payload[0].value,
          "%"
        ] })
      ] })
    ] });
  }
  return null;
};
const FORMAT_META = {
  manga: { label: "Manga", color: "#8b5cf6" },
  // violet
  manhwa: { label: "Manhwa", color: "#38bdf8" },
  // sky
  manhua: { label: "Manhua", color: "#f59e0b" }
  // amber
};
function OverviewMangaAnalytics({ mangaReadlist = [] }) {
  const anilistIds = reactExports.useMemo(
    () => mangaReadlist.map((m) => m == null ? void 0 : m.anilist_id).filter((id) => typeof id === "number" && id > 0),
    [mangaReadlist]
  );
  const { data: metaMap = {}, isLoading } = useMangaMetaByIds(anilistIds);
  const analytics = reactExports.useMemo(() => {
    var _a, _b;
    const formatCounts = { manga: 0, manhwa: 0, manhua: 0 };
    const genreCounts = /* @__PURE__ */ new Map();
    const tagCounts = /* @__PURE__ */ new Map();
    let resolved = 0;
    let chaptersFromMeta = 0;
    let scoreSum = 0;
    let scoreCount = 0;
    let chaptersRead = 0;
    let completed = 0;
    for (const row of mangaReadlist) {
      const chap = Number(row == null ? void 0 : row.last_chapter_number);
      if (Number.isFinite(chap) && chap > 0) chaptersRead += chap;
      if (String((row == null ? void 0 : row.status) || "").toLowerCase() === "completed") completed += 1;
      const id = typeof (row == null ? void 0 : row.anilist_id) === "number" ? row.anilist_id : void 0;
      const meta = id ? metaMap[id] : void 0;
      if (!meta) continue;
      resolved += 1;
      formatCounts[meta.bucket] += 1;
      (meta.genres || []).forEach((g) => genreCounts.set(g, (genreCounts.get(g) || 0) + 1));
      (meta.tags || []).slice(0, 5).forEach((t) => tagCounts.set(t, (tagCounts.get(t) || 0) + 1));
      if (typeof meta.chapters === "number") chaptersFromMeta += meta.chapters;
      if (typeof meta.averageScore === "number" && meta.averageScore > 0) {
        scoreSum += meta.averageScore;
        scoreCount += 1;
      }
    }
    const formats = Object.keys(formatCounts).map((bucket) => ({ bucket, count: formatCounts[bucket], ...FORMAT_META[bucket] })).filter((f) => f.count > 0).sort((a, b) => b.count - a.count);
    const topGenres = Array.from(genreCounts.entries()).map(([genre, count]) => ({ genre, count })).sort((a, b) => b.count - a.count).slice(0, 6);
    const genreMax = ((_a = topGenres[0]) == null ? void 0 : _a.count) || 1;
    const radarData = topGenres.map((g) => ({
      genre: g.genre,
      weight: Math.round(g.count / genreMax * 100)
    }));
    const topTags = Array.from(tagCounts.entries()).map(([tag, count]) => ({ tag, count })).sort((a, b) => b.count - a.count).slice(0, 12);
    return {
      formats,
      topGenres,
      radarData,
      topTags,
      resolved,
      total: mangaReadlist.length,
      chaptersRead,
      chaptersFromMeta,
      completed,
      avgScore: scoreCount > 0 ? scoreSum / scoreCount : 0,
      maxGenre: ((_b = topGenres[0]) == null ? void 0 : _b.count) || 1
    };
  }, [mangaReadlist, metaMap]);
  const hasData = analytics.total > 0;
  const formatTotal = analytics.formats.reduce((s, f) => s + f.count, 0);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassPanel, { className: "relative overflow-hidden p-5 sm:p-7 flex flex-col justify-between border-white/[0.04] bg-background/40 backdrop-blur-2xl rounded-2xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-12 -right-12 w-48 h-48 bg-[hsl(var(--profile-accent)/0.10)] blur-[70px] rounded-full pointer-events-none" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-4 h-4 text-primary/80" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-base sm:text-lg text-foreground tracking-tight", children: "Manga & Manhwa" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground/70", children: "Format split, top genres, and reading totals" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative z-10 flex-1", children: !hasData ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center h-[220px] text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(BookMarked, { className: "w-10 h-10 text-muted-foreground/30 mb-3" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground/60 max-w-[220px]", children: "No manga in your readlist yet. Add titles to see your reading breakdown." })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-2.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-white/[0.04] bg-white/[0.02] p-3 text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center gap-1 text-primary mb-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-3.5 h-3.5" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-lg font-black text-foreground tabular-nums", children: analytics.total }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-muted-foreground/60 uppercase tracking-wide", children: "Titles" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-white/[0.04] bg-white/[0.02] p-3 text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center gap-1 text-emerald-400 mb-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Layers, { className: "w-3.5 h-3.5" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-lg font-black text-foreground tabular-nums", children: analytics.chaptersRead > 0 ? analytics.chaptersRead : analytics.completed }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-muted-foreground/60 uppercase tracking-wide", children: analytics.chaptersRead > 0 ? "Chapters" : "Completed" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-white/[0.04] bg-white/[0.02] p-3 text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center gap-1 text-amber-400 mb-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-3.5 h-3.5" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-lg font-black text-foreground tabular-nums", children: analytics.avgScore > 0 ? (analytics.avgScore / 10).toFixed(1) : "—" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-muted-foreground/60 uppercase tracking-wide", children: "Avg Score" })
        ] })
      ] }),
      analytics.formats.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-2.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] font-medium uppercase tracking-wider text-muted-foreground/70", children: "Format Split" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] text-muted-foreground/50", children: [
            formatTotal,
            " classified"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-2.5 w-full overflow-hidden rounded-full bg-white/[0.04]", children: analytics.formats.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { width: 0 },
            whileInView: { width: `${f.count / formatTotal * 100}%` },
            viewport: { once: true },
            transition: { duration: 0.6, ease: "easeOut" },
            style: { backgroundColor: f.color },
            title: `${f.label}: ${f.count}`
          },
          f.bucket
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2.5 flex flex-wrap gap-3", children: analytics.formats.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: "h-2.5 w-2.5 rounded-full",
              style: { backgroundColor: f.color }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-foreground/80", children: f.label }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold text-muted-foreground/60 tabular-nums", children: f.count })
        ] }, f.bucket)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] font-medium uppercase tracking-wider text-muted-foreground/70", children: "Genre Affinity" }),
        isLoading && analytics.topGenres.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2.5 h-[240px] w-full animate-pulse rounded-xl bg-white/[0.02]" }) : analytics.radarData.length >= 3 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 h-[240px] w-full", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(RadarChart, { data: analytics.radarData, outerRadius: "70%", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(PolarGrid, { stroke: "hsl(var(--border))" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            PolarAngleAxis,
            {
              dataKey: "genre",
              tick: { fill: "hsl(var(--muted-foreground))", fontSize: 11 }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip$1, { content: /* @__PURE__ */ jsxRuntimeExports.jsx(GlassTooltip$4, {}) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Radar,
            {
              dataKey: "weight",
              stroke: "hsl(var(--primary))",
              fill: "hsl(var(--primary))",
              fillOpacity: 0.4,
              animationDuration: 800
            }
          )
        ] }) }) }) : analytics.topGenres.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2.5 space-y-2", children: analytics.topGenres.map((g) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground/80 w-24 shrink-0 truncate", children: g.genre }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-2 rounded-full bg-white/[0.04] overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              className: "h-full rounded-full bg-primary",
              initial: { width: 0 },
              whileInView: { width: `${g.count / analytics.maxGenre * 100}%` },
              viewport: { once: true },
              transition: { duration: 0.5, ease: "easeOut" }
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-mono text-muted-foreground w-6 text-right tabular-nums", children: g.count })
        ] }, g.genre)) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-xs text-muted-foreground/50", children: "Genre data unavailable for these titles." })
      ] }),
      analytics.topTags.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] font-medium uppercase tracking-wider text-muted-foreground/70", children: "Top Tags" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2.5 flex flex-wrap gap-2", children: analytics.topTags.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "span",
          {
            className: "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/[0.03] border border-white/[0.06] text-xs font-medium text-foreground/80",
            children: [
              t.tag,
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-mono text-muted-foreground/50 tabular-nums", children: t.count })
            ]
          },
          t.tag
        )) })
      ] })
    ] }) })
  ] });
}
const OverviewHeroStats = reactExports.memo(function OverviewHeroStats2({
  watchTimeSeconds,
  episodesCount,
  completedAnimeCount,
  watchingAnimeCount,
  planToWatchCount = 0,
  mangaCount,
  manhwaCount,
  comicsCount,
  totalChaptersRead,
  streakDays,
  longestStreak,
  totalDaysActive = 0,
  commentCount,
  forumPostCount,
  forumUpvotes = 0,
  reputationRate = 98.4,
  onStatClick
}) {
  const hoursSpent = Number((watchTimeSeconds / 3600).toFixed(1));
  const daysSpent = Number((watchTimeSeconds / 86400).toFixed(1));
  const totalReadingTitles = mangaCount + manhwaCount + comicsCount;
  const totalAnimeInteracted = completedAnimeCount + watchingAnimeCount;
  const completionRate = totalAnimeInteracted > 0 ? Math.round(completedAnimeCount / totalAnimeInteracted * 100) : 0;
  const primaryStats = [
    {
      key: "anime",
      label: "Anime Watched",
      value: episodesCount,
      suffix: "eps",
      subtext: `${completedAnimeCount} completed · ${watchingAnimeCount} watching`,
      icon: Play
    },
    {
      key: "watchtime",
      label: "Watch Time",
      value: hoursSpent,
      decimals: 1,
      suffix: "hrs",
      subtext: `${daysSpent} days continuous`,
      icon: Clock
    },
    {
      key: "reading",
      label: "Manga & Manhwa",
      value: totalChaptersRead > 0 ? totalChaptersRead : totalReadingTitles,
      suffix: totalChaptersRead > 0 ? "chs" : "titles",
      subtext: `${mangaCount} Manga · ${manhwaCount} Manhwa`,
      icon: BookOpen
    },
    {
      key: "reputation",
      label: "Reputation",
      value: reputationRate,
      decimals: 1,
      suffix: "%",
      subtext: reputationRate >= 95 ? "Elite Tier" : "Active Member",
      icon: Award
    },
    {
      key: "community",
      label: "Discussions",
      value: commentCount + forumPostCount,
      suffix: "actions",
      subtext: `${commentCount} comments · ${forumPostCount} topics`,
      icon: MessageSquare
    },
    {
      key: "streak",
      label: "Streak Record",
      value: streakDays,
      suffix: "days",
      subtext: `Best streak: ${longestStreak}d`,
      icon: Flame,
      isActive: streakDays > 0
    }
  ];
  const microDetails = [
    { label: "Completion Rate", value: `${completionRate}%`, icon: Percent },
    { label: "Active Watch Days", value: `${totalDaysActive || Math.max(streakDays, 1)}d`, icon: Calendar },
    { label: "Comic Titles", value: `${comicsCount}`, icon: Film },
    { label: "Community Upvotes", value: `${forumUpvotes || Math.max(commentCount * 2, 0)}`, icon: ThumbsUp }
  ];
  const handleKeyDown = (e, key) => {
    if (onStatClick && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      onStatClick(key);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    GlassPanel,
    {
      className: "relative overflow-hidden p-5 sm:p-7 flex flex-col justify-between border-white/[0.04] bg-background/40 backdrop-blur-2xl rounded-2xl",
      role: "region",
      "aria-label": "Overview Statistics",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-12 -right-12 w-48 h-48 bg-[hsl(var(--profile-accent)/0.10)] blur-[70px] rounded-full pointer-events-none" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -bottom-12 -left-12 w-48 h-48 bg-[hsl(var(--profile-accent)/0.05)] blur-[70px] rounded-full pointer-events-none" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative z-10 flex flex-col justify-between gap-4 mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "w-4 h-4 text-primary/80" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-base sm:text-lg text-foreground tracking-tight", children: "Your Statistics" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground/70", children: "Your lifetime platform activity, milestones, and total interaction summary" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4", children: primaryStats.map((item, idx) => {
            const Icon = item.icon;
            const isClickable = !!onStatClick;
            const ariaLabel = `${item.label}: ${item.value} ${item.suffix || ""}. ${item.subtext}`;
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0, scale: 0.98 },
                whileInView: { opacity: 1, scale: 1 },
                viewport: { once: true },
                transition: { duration: 0.25, delay: idx * 0.04, ease: "easeOut" },
                onClick: () => onStatClick == null ? void 0 : onStatClick(item.key),
                role: isClickable ? "button" : "article",
                tabIndex: isClickable ? 0 : void 0,
                onKeyDown: (e) => handleKeyDown(e, item.key),
                "aria-label": ariaLabel,
                className: cn(
                  "group flex flex-col justify-between p-4 rounded-xl border border-white/[0.03] bg-white/[0.015] transition-all duration-300 select-none",
                  "hover:border-white/[0.08] hover:bg-white/[0.03] hover:shadow-sm hover:shadow-black/20",
                  isClickable && "cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20"
                ),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-1 mb-3", "aria-hidden": "true", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] font-medium tracking-wider uppercase text-muted-foreground/70 truncate", children: item.label }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Icon,
                      {
                        className: cn(
                          "w-4 h-4 text-muted-foreground/50 transition-colors duration-300 group-hover:text-foreground/80",
                          item.isActive && "text-orange-400/90 group-hover:text-orange-400"
                        )
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline gap-1.5 my-1", "aria-hidden": "true", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-xl sm:text-2xl font-bold tracking-tight text-foreground tabular-nums", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      AnimatedCounter,
                      {
                        value: item.value,
                        decimals: item.decimals || 0
                      }
                    ) }),
                    item.suffix && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium text-muted-foreground/50", children: item.suffix })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground/50 mt-1 truncate transition-colors group-hover:text-muted-foreground/70", "aria-hidden": "true", children: item.subtext })
                ]
              },
              item.key
            );
          }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "grid grid-cols-2 sm:grid-cols-4 gap-3 px-4 py-3 rounded-xl bg-black/20 border border-white/[0.03]",
              "aria-label": "Additional metric details",
              children: microDetails.map((detail) => {
                const Icon = detail.icon;
                return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "flex items-center gap-2.5",
                    "aria-label": `${detail.label}: ${detail.value}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-1.5 rounded-md bg-white/[0.03] text-muted-foreground/60", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-3.5 h-3.5", "aria-hidden": "true" }) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-medium text-muted-foreground/60 uppercase tracking-wide truncate", "aria-hidden": "true", children: detail.label }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground/90 font-mono text-xs", "aria-hidden": "true", children: detail.value })
                      ] })
                    ]
                  },
                  detail.label
                );
              })
            }
          )
        ] })
      ]
    }
  );
});
const MEDIA_COLORS = {
  Anime: "#f43f5e",
  // Rose
  Manhwa: "#ec4899",
  // Pink
  Manga: "#f59e0b",
  // Amber
  Comics: "#8b5cf6"
  // Violet
};
function OverviewInteractiveCharts({
  animeCount,
  manhwaCount,
  mangaCount,
  comicsCount,
  watchTimeSeconds,
  commentCount,
  forumPostCount,
  reputationRate = 98.5,
  history = []
}) {
  const [activeView, setActiveView] = reactExports.useState("distribution");
  const distributionData = reactExports.useMemo(() => {
    const raw = [
      { name: "Anime", value: Math.max(animeCount, 1), color: MEDIA_COLORS.Anime },
      { name: "Manhwa", value: Math.max(manhwaCount, 0), color: MEDIA_COLORS.Manhwa },
      { name: "Manga", value: Math.max(mangaCount, 0), color: MEDIA_COLORS.Manga },
      { name: "Comics", value: Math.max(comicsCount, 0), color: MEDIA_COLORS.Comics }
    ];
    const total = raw.reduce((acc, curr) => acc + curr.value, 0);
    return raw.filter((item) => item.value > 0 || total === 1);
  }, [animeCount, manhwaCount, mangaCount, comicsCount]);
  const trendsData = reactExports.useMemo(() => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const now = /* @__PURE__ */ new Date();
    const result = [];
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const label = months[d.getMonth()];
      const totalHours = watchTimeSeconds / 3600;
      const factor = (6 - i) / 21 + 0.05;
      const monthHours = Number((totalHours * factor * 1.2).toFixed(1));
      const monthChapters = Math.round((mangaCount + manhwaCount * 2) * factor * 2);
      result.push({
        label,
        watchHours: Math.max(monthHours, 0.5),
        chapters: Math.max(monthChapters, 1)
      });
    }
    return result;
  }, [watchTimeSeconds, mangaCount, manhwaCount]);
  const engagementData = reactExports.useMemo(() => {
    return [
      { metric: "Comments", count: commentCount || 4, fill: "#38bdf8" },
      { metric: "Forum Posts", count: forumPostCount || 2, fill: "#818cf8" },
      { metric: "Reputation", count: Math.round(reputationRate), fill: "#10b981" },
      { metric: "Shared", count: Math.max(Math.round(animeCount * 0.15), 1), fill: "#f43f5e" }
    ];
  }, [commentCount, forumPostCount, reputationRate, animeCount]);
  const CustomTooltip = ({ active, payload, label }) => {
    var _a;
    if (active && payload && payload.length) {
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-white/[0.08] bg-background/80 p-3 shadow-2xl backdrop-blur-2xl", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-foreground/90 mb-1.5", children: label || ((_a = payload[0]) == null ? void 0 : _a.name) }),
        payload.map((entry, index) => {
          var _a2;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "w-2 h-2 rounded-full",
                style: { backgroundColor: entry.color || ((_a2 = entry.payload) == null ? void 0 : _a2.fill) || entry.fill }
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground/70", children: [
              entry.name || "Count",
              ":"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold text-foreground font-mono", children: [
              entry.value,
              " ",
              entry.unit || ""
            ] })
          ] }, `tooltip-${index}`);
        })
      ] });
    }
    return null;
  };
  const totalTitles = animeCount + manhwaCount + mangaCount + comicsCount;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassPanel, { className: "relative overflow-hidden p-5 sm:p-7 flex flex-col justify-between border-white/[0.04] bg-background/40 backdrop-blur-2xl rounded-2xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-12 -right-12 w-48 h-48 bg-[hsl(var(--profile-accent)/0.10)] blur-[70px] rounded-full pointer-events-none" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "w-4 h-4 text-primary/80" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-base sm:text-lg text-foreground tracking-tight", children: "Analytics Overview" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground/70", children: "Media distribution, consumption velocity, and interaction stats" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 bg-black/20 p-1 rounded-xl border border-white/[0.03] self-start sm:self-auto", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: () => setActiveView("distribution"),
            className: cn(
              "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200",
              activeView === "distribution" ? "bg-white/10 text-foreground shadow-sm" : "text-muted-foreground/60 hover:text-foreground/90 hover:bg-white/[0.02]"
            ),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ChartPie, { className: "w-3.5 h-3.5" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Distribution" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: () => setActiveView("trends"),
            className: cn(
              "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200",
              activeView === "trends" ? "bg-white/10 text-foreground shadow-sm" : "text-muted-foreground/60 hover:text-foreground/90 hover:bg-white/[0.02]"
            ),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-3.5 h-3.5" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Trends" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: () => setActiveView("engagement"),
            className: cn(
              "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200",
              activeView === "engagement" ? "bg-white/10 text-foreground shadow-sm" : "text-muted-foreground/60 hover:text-foreground/90 hover:bg-white/[0.02]"
            ),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Layers, { className: "w-3.5 h-3.5" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Community" })
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-[250px] sm:h-[270px] w-full relative z-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AnimatePresence, { mode: "wait", children: [
      activeView === "distribution" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, scale: 0.98 },
          animate: { opacity: 1, scale: 1 },
          exit: { opacity: 0, scale: 0.98 },
          transition: { duration: 0.25, ease: "easeOut" },
          className: "h-full w-full flex flex-col sm:flex-row items-center justify-around gap-6",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "h-[200px] w-[200px] sm:h-[230px] sm:w-[230px] relative shrink-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(PieChart, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip$1, { content: /* @__PURE__ */ jsxRuntimeExports.jsx(CustomTooltip, {}) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Pie,
                  {
                    data: distributionData,
                    cx: "50%",
                    cy: "50%",
                    innerRadius: 68,
                    outerRadius: 92,
                    paddingAngle: 5,
                    dataKey: "value",
                    stroke: "none",
                    cornerRadius: 6,
                    animationDuration: 800,
                    children: distributionData.map((entry, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(Cell, { fill: entry.color }, `cell-${index}`))
                  }
                )
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 flex flex-col items-center justify-center pointer-events-none", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/60", children: "Total" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-bold text-2xl text-foreground my-0.5", children: totalTitles }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground/50 font-medium", children: "Titles" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-1 gap-2 w-full sm:w-auto max-w-xs", children: distributionData.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex items-center justify-between gap-6 px-3 py-2 rounded-xl bg-white/[0.015] border border-white/[0.03] hover:bg-white/[0.03] transition-colors",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: "w-2.5 h-2.5 rounded-full",
                        style: { backgroundColor: item.color }
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium text-foreground/80", children: item.name })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono font-semibold text-xs text-muted-foreground", children: item.value })
                ]
              },
              item.name
            )) })
          ]
        },
        "distribution"
      ),
      activeView === "trends" && /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, scale: 0.98 },
          animate: { opacity: 1, scale: 1 },
          exit: { opacity: 0, scale: 0.98 },
          transition: { duration: 0.25, ease: "easeOut" },
          className: "h-full w-full pt-1",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AreaChart, { data: trendsData, margin: { top: 10, right: 10, left: -25, bottom: 0 }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("defs", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: "watchTimeGradient", x1: "0", y1: "0", x2: "0", y2: "1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "5%", stopColor: "#f43f5e", stopOpacity: 0.35 }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "95%", stopColor: "#f43f5e", stopOpacity: 0 })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: "chaptersGradient", x1: "0", y1: "0", x2: "0", y2: "1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "5%", stopColor: "#f59e0b", stopOpacity: 0.35 }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "95%", stopColor: "#f59e0b", stopOpacity: 0 })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { strokeDasharray: "2 4", stroke: "rgba(255,255,255,0.03)", vertical: false }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { dataKey: "label", stroke: "#52525b", fontSize: 11, tickLine: false, axisLine: false }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, { stroke: "#52525b", fontSize: 11, tickLine: false, axisLine: false }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip$1, { content: /* @__PURE__ */ jsxRuntimeExports.jsx(CustomTooltip, {}) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Area,
              {
                type: "monotone",
                dataKey: "watchHours",
                name: "Watch Hours",
                stroke: "#f43f5e",
                strokeWidth: 2,
                fillOpacity: 1,
                fill: "url(#watchTimeGradient)",
                animationDuration: 1e3
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Area,
              {
                type: "monotone",
                dataKey: "chapters",
                name: "Chapters Read",
                stroke: "#f59e0b",
                strokeWidth: 2,
                fillOpacity: 1,
                fill: "url(#chaptersGradient)",
                animationDuration: 1e3
              }
            )
          ] }) })
        },
        "trends"
      ),
      activeView === "engagement" && /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, scale: 0.98 },
          animate: { opacity: 1, scale: 1 },
          exit: { opacity: 0, scale: 0.98 },
          transition: { duration: 0.25, ease: "easeOut" },
          className: "h-full w-full pt-1",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(BarChart, { data: engagementData, margin: { top: 10, right: 10, left: -25, bottom: 0 }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { strokeDasharray: "2 4", stroke: "rgba(255,255,255,0.03)", vertical: false }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { dataKey: "metric", stroke: "#52525b", fontSize: 11, tickLine: false, axisLine: false }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, { stroke: "#52525b", fontSize: 11, tickLine: false, axisLine: false }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip$1, { content: /* @__PURE__ */ jsxRuntimeExports.jsx(CustomTooltip, {}) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Bar,
              {
                dataKey: "count",
                radius: [6, 6, 0, 0],
                animationDuration: 800,
                barSize: 32,
                children: engagementData.map((entry, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(Cell, { fill: entry.fill }, `bar-${index}`))
              }
            )
          ] }) })
        },
        "engagement"
      )
    ] }) })
  ] });
}
function OverviewSocialConnections({
  userId,
  username,
  followersCount = 0,
  followingCount = 0
}) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = reactExports.useState("followers");
  const { data: userList = [], isLoading } = useFollowList(userId, activeTab);
  const preview = userList.slice(0, 4);
  const { data: badgeMap } = useBatchUserBadges(preview.map((u) => u.user_id));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    GlassPanel,
    {
      className: "\n        relative overflow-hidden\n        p-4\n        flex flex-col\n        border-white/[0.04]\n        bg-background/40\n        backdrop-blur-2xl\n        rounded-2xl\n      ",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute -bottom-10 -left-10 w-40 h-40 bg-indigo-500/10 blur-[60px] rounded-full pointer-events-none",
            "aria-hidden": "true"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 flex flex-col gap-3.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-1.5 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-3.5 h-3.5" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-display font-bold text-sm text-foreground tracking-tight", children: "Social Connections" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Link,
              {
                to: username ? `/social/${username}?tab=${activeTab}` : "#",
                className: "flex items-center gap-0.5 text-[11px] font-medium text-indigo-400 hover:text-indigo-300 transition-colors group shrink-0 focus-visible:outline-none focus-visible:underline",
                "aria-label": "View all social connections",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "View All" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-3 h-3 transition-transform group-hover:translate-x-0.5" })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              role: "tablist",
              "aria-label": "Social connections filter",
              className: "flex items-center gap-1 bg-black/20 p-1 rounded-xl border border-white/[0.03]",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    role: "tab",
                    "aria-selected": activeTab === "followers",
                    onClick: () => setActiveTab("followers"),
                    className: cn(
                      "flex flex-1 items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/50",
                      activeTab === "followers" ? "bg-white/10 shadow-sm" : "text-muted-foreground/60 hover:text-foreground hover:bg-white/[0.02]"
                    ),
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-bold text-sm text-foreground tabular-nums", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatedCounter, { value: followersCount }) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-semibold text-muted-foreground/80", children: "Followers" })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-px h-4 bg-white/[0.06] shrink-0" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    role: "tab",
                    "aria-selected": activeTab === "following",
                    onClick: () => setActiveTab("following"),
                    className: cn(
                      "flex flex-1 items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/50",
                      activeTab === "following" ? "bg-white/10 shadow-sm" : "text-muted-foreground/60 hover:text-foreground hover:bg-white/[0.02]"
                    ),
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-bold text-sm text-foreground tabular-nums", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatedCounter, { value: followingCount }) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-semibold text-muted-foreground/80", children: "Following" })
                    ]
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { opacity: 0 },
              animate: { opacity: 1 },
              exit: { opacity: 0 },
              className: "flex flex-col gap-2",
              children: Array.from({ length: 4 }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "relative overflow-hidden rounded-xl border border-white/[0.05]",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 animate-pulse bg-white/[0.03]" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex items-center gap-2.5 p-2.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-9 w-9 shrink-0 animate-pulse rounded-full bg-white/10" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-1.5", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2.5 w-20 animate-pulse rounded-full bg-white/8" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2 w-14 animate-pulse rounded-full bg-white/5" })
                      ] })
                    ] })
                  ]
                },
                i
              ))
            },
            "loading"
          ) : preview.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { opacity: 0, y: 4 },
              animate: { opacity: 1, y: 0 },
              exit: { opacity: 0, y: -4 },
              transition: { duration: 0.2 },
              className: "flex flex-col gap-2",
              children: preview.map((u, idx) => {
                var _a;
                const name = u.display_name || u.username || "Anonymous";
                const goToProfile = () => navigate(u.username ? `/@${u.username}` : "#");
                return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  motion.button,
                  {
                    onClick: goToProfile,
                    initial: { opacity: 0, y: 4 },
                    animate: { opacity: 1, y: 0 },
                    transition: { duration: 0.15, delay: idx * 0.04 },
                    className: "group/card relative overflow-hidden rounded-xl border border-white/[0.07] text-left transition-all duration-200 hover:border-white/[0.14]",
                    "aria-label": `View ${name}'s profile`,
                    children: [
                      u.banner_url ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "img",
                        {
                          src: getProxiedImageUrl(u.banner_url),
                          alt: "",
                          "aria-hidden": "true",
                          className: "absolute inset-0 h-full w-full object-cover opacity-40 transition-transform duration-500 group-hover/card:scale-105"
                        }
                      ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-indigo-500/15 via-primary/8 to-transparent" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-background/90 via-background/70 to-background/40" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex items-center gap-2.5 p-2.5", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(Avatar, { className: "h-9 w-9 shrink-0 ring-2 ring-white/10 transition-transform duration-200 group-hover/card:scale-105", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarImage, { src: u.avatar_url || "", className: "object-cover" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarFallback, { className: "bg-zinc-800 text-xs font-bold", children: (_a = name[0]) == null ? void 0 : _a.toUpperCase() })
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate text-xs font-semibold text-foreground/90", children: name }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              UserBadges,
                              {
                                badges: badgeMap == null ? void 0 : badgeMap[u.user_id],
                                size: 14,
                                max: 3,
                                interactive: false
                              }
                            )
                          ] }),
                          u.username && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "truncate text-[10px] text-muted-foreground/60", children: [
                            "@",
                            u.username
                          ] })
                        ] })
                      ] })
                    ]
                  },
                  u.user_id
                );
              })
            },
            activeTab
          ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0 },
              animate: { opacity: 1 },
              exit: { opacity: 0 },
              className: "py-6 text-center border border-dashed border-white/[0.06] rounded-xl bg-white/[0.005]",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-5 h-5 mx-auto text-muted-foreground/30 mb-1.5" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground/60", children: [
                  "No ",
                  activeTab,
                  " found yet"
                ] })
              ]
            },
            "empty"
          ) }) })
        ] })
      ]
    }
  );
}
const THEME_COLORS = {
  rose: {
    iconWrapper: "bg-rose-500/10 text-rose-400",
    hoverText: "group-hover:text-rose-400",
    hoverBg: "group-hover:bg-rose-500/20",
    hoverBorder: "group-hover:border-rose-500/50",
    glow: "bg-rose-500/15"
  },
  amber: {
    iconWrapper: "bg-amber-500/10 text-amber-400",
    hoverText: "group-hover:text-amber-400",
    hoverBg: "group-hover:bg-amber-500/20",
    hoverBorder: "group-hover:border-amber-500/50",
    glow: "bg-amber-500/15"
  },
  sky: {
    iconWrapper: "bg-sky-500/10 text-sky-400",
    hoverText: "group-hover:text-sky-400",
    hoverBg: "group-hover:bg-sky-500/20",
    hoverBorder: "group-hover:border-sky-500/50",
    glow: "bg-sky-500/15"
  }
};
const STATUS_LABELS$1 = {
  watching: { label: "Watching", color: "text-sky-400", bg: "bg-sky-400/20", icon: Eye },
  completed: { label: "Completed", color: "text-emerald-400", bg: "bg-emerald-400/20", icon: CircleCheckBig },
  plan_to_watch: { label: "Plan", color: "text-amber-400", bg: "bg-amber-400/20", icon: Clock },
  on_hold: { label: "On Hold", color: "text-orange-400", bg: "bg-orange-400/20", icon: Pause },
  dropped: { label: "Dropped", color: "text-rose-400", bg: "bg-rose-400/20", icon: CircleX }
};
const FALLBACK_STATUS = STATUS_LABELS$1.plan_to_watch;
function resolveWatchStatus(raw) {
  const key = String(raw ?? "plan_to_watch").trim().toLowerCase();
  return STATUS_LABELS$1[key] ?? FALLBACK_STATUS;
}
const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } }
};
const itemVariants = {
  hidden: { opacity: 0, scale: 0.96, y: 10 },
  show: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
};
const OverviewWidgetsRail = reactExports.memo(function OverviewWidgetsRail2({
  watchlist = [],
  history = [],
  mangaReadlist = [],
  onNavigateTab
}) {
  const navigate = useNavigate();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      variants: containerVariants,
      initial: "hidden",
      whileInView: "show",
      viewport: { once: true, margin: "-40px" },
      className: "grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-5",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Widget,
          {
            title: "Watchlist",
            count: `${watchlist.length} titles`,
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(List, { className: "w-4 h-4" }),
            color: "rose",
            onMore: () => onNavigateTab("watchlist"),
            children: watchlist.slice(0, 3).map((item) => {
              const status = resolveWatchStatus(item == null ? void 0 : item.status);
              const StatusIcon = status.icon;
              return /* @__PURE__ */ jsxRuntimeExports.jsx(
                Media,
                {
                  onClick: () => navigate(`/anime/${item.anime_id}`),
                  image: item.anime_poster,
                  title: item.anime_name,
                  color: "rose",
                  badge: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(StatusIcon, { className: "w-3 h-3" }),
                    status.label
                  ] }),
                  badgeClass: cn(status.bg, status.color)
                },
                `wl-${item.id || item.anime_id}`
              );
            })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Widget,
          {
            title: "Manga & Manhwa",
            count: `${mangaReadlist.length} titles`,
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-4 h-4" }),
            color: "amber",
            onMore: () => onNavigateTab("manga-readlist"),
            children: mangaReadlist.slice(0, 3).map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              Media,
              {
                onClick: () => navigate(`/manga/${item.manga_id}`),
                image: item.manga_poster,
                title: item.manga_title,
                color: "amber",
                badge: item.last_chapter_number != null ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-3 h-3" }),
                  "Ch. ",
                  item.last_chapter_number
                ] }) : void 0,
                badgeClass: "bg-black/60 text-white border-white/10"
              },
              `manga-${item.id || item.manga_id}`
            ))
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Widget,
          {
            title: "Recent History",
            count: `${history.length} watched`,
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(History, { className: "w-4 h-4" }),
            color: "sky",
            onMore: () => onNavigateTab("history"),
            children: history.slice(0, 3).map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              Media,
              {
                onClick: () => navigate(item.episode_id ? `/watch/${encodeURIComponent(item.episode_id)}` : `/anime/${item.anime_id}`),
                image: item.anime_poster,
                title: item.anime_name,
                color: "sky",
                badge: item.episode_number != null ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "w-2.5 h-2.5", fill: "currentColor" }),
                  "Ep. ",
                  item.episode_number
                ] }) : void 0,
                badgeClass: "bg-sky-500/80 text-white backdrop-blur-md border-none shadow-sm"
              },
              `hist-${item.id}`
            ))
          }
        )
      ]
    }
  );
});
function Widget({ title, count, icon, color, onMore, children }) {
  const theme = THEME_COLORS[color];
  return /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { variants: itemVariants, className: "h-full", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassPanel, { className: "relative overflow-hidden h-full p-5 flex flex-col justify-between border-white/[0.04] bg-background/40 backdrop-blur-2xl rounded-2xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("absolute -top-16 -right-16 w-40 h-40 blur-[70px] rounded-full pointer-events-none", theme.glow) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative z-10 mb-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5 mb-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("p-1.5 rounded-lg border border-white/[0.05]", theme.iconWrapper), children: icon }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-base text-foreground tracking-tight", children: title })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground/70 font-medium", children: count })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 grid grid-cols-2 gap-3", children: [
      children,
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          onClick: onMore,
          className: "group cursor-pointer flex flex-col items-center justify-center p-4 rounded-xl border border-dashed border-white/[0.08] bg-white/[0.01] transition-all duration-300 text-center min-h-[160px] outline-none focus-visible:ring-2 focus-visible:ring-white/20 hover:bg-white/[0.03] hover:border-white/[0.15]",
          role: "button",
          tabIndex: 0,
          onKeyDown: (event) => {
            if (event.key === "Enter" || event.key === " ") onMore();
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: cn(
                  "w-10 h-10 rounded-full bg-white/[0.04] flex items-center justify-center text-muted-foreground transition-all duration-300 group-hover:scale-110 mb-3",
                  theme.hoverBg,
                  theme.hoverText
                ),
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-5 h-5 transition-transform duration-300 group-hover:translate-x-0.5" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: cn("text-xs font-bold text-foreground transition-colors", theme.hoverText), children: "See More" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] text-muted-foreground/50 mt-1", children: [
              "in ",
              title,
              " tab"
            ] })
          ]
        }
      )
    ] })
  ] }) });
}
function Media({ onClick, image, title, color, badge, badgeClass }) {
  const theme = THEME_COLORS[color];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      onClick,
      className: "group cursor-pointer flex flex-col relative outline-none focus-visible:ring-2 focus-visible:ring-white/20 rounded-xl",
      role: "button",
      tabIndex: 0,
      onKeyDown: (event) => {
        if (event.key === "Enter" || event.key === " ") onClick();
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: cn(
              "relative aspect-[3/4] rounded-xl overflow-hidden mb-2 border border-white/[0.04] bg-white/[0.02] transition-all duration-300 shadow-md",
              theme.hoverBorder
            ),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: getProxiedImageUrl(image || "/placeholder.svg"),
                  alt: title || "",
                  loading: "lazy",
                  className: "w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" }),
              badge && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: cn(
                    "absolute top-1.5 left-1.5 px-2 py-0.5 flex items-center gap-1.5 rounded-md backdrop-blur-md border border-white/10 text-[9px] font-bold uppercase tracking-wider",
                    badgeClass
                  ),
                  children: badge
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h5", { className: cn("font-medium text-[11px] sm:text-xs text-foreground/90 line-clamp-2 leading-tight transition-colors duration-200", theme.hoverText), children: title })
      ]
    }
  );
}
const PROVIDER_META = {
  anilist: { label: "AniList", accent: "text-[#02A9FF]", dot: "bg-[#02A9FF]" },
  mal: { label: "MyAnimeList", accent: "text-[#2E51A2]", dot: "bg-[#2E51A2]" }
};
function ProviderCard({ data }) {
  const meta = PROVIDER_META[data.provider];
  const tiles = [
    { key: "count", label: "Anime", value: data.anime.count, suffix: "titles", icon: Tv },
    { key: "eps", label: "Episodes", value: data.anime.episodesWatched, suffix: "eps", icon: Play },
    { key: "days", label: "Days Watched", value: data.anime.daysWatched, suffix: "d", decimals: 1, icon: Clock },
    { key: "score", label: "Mean Score", value: data.anime.meanScore, suffix: "", decimals: data.anime.meanScore % 1 ? 2 : 0, icon: Star }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-white/[0.04] bg-white/[0.015] p-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: cn("w-2 h-2 rounded-full", meta.dot), "aria-hidden": "true" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: cn("text-sm font-bold tracking-tight", meta.accent), children: meta.label }),
        data.username && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground/60", children: [
          "@",
          data.username
        ] })
      ] }),
      data.profileUrl && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "a",
        {
          href: data.profileUrl,
          target: "_blank",
          rel: "noopener noreferrer",
          className: "text-muted-foreground/50 hover:text-foreground transition-colors",
          "aria-label": `Open ${meta.label} profile`,
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "w-3.5 h-3.5" })
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-3", children: tiles.map((t, idx) => {
      const Icon = t.icon;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 6 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { duration: 0.2, delay: idx * 0.03 },
          className: "flex flex-col gap-1.5 rounded-lg bg-black/20 border border-white/[0.03] p-3",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-medium uppercase tracking-wider text-muted-foreground/60 truncate", children: t.label }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-3.5 h-3.5 text-muted-foreground/40", "aria-hidden": "true" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-display text-lg font-bold tabular-nums text-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatedCounter, { value: t.value, decimals: t.decimals || 0 }),
              t.suffix && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-medium text-muted-foreground/50 ml-1", children: t.suffix })
            ] })
          ]
        },
        t.key
      );
    }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-muted-foreground/70", children: [
      data.anime.watching ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
        data.anime.watching,
        " watching"
      ] }) : null,
      data.anime.completed ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
        data.anime.completed,
        " completed"
      ] }) : null,
      data.anime.planning ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
        data.anime.planning,
        " planned"
      ] }) : null,
      data.anime.paused ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
        data.anime.paused,
        " on hold"
      ] }) : null,
      data.anime.dropped ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
        data.anime.dropped,
        " dropped"
      ] }) : null
    ] }),
    data.manga && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex items-center gap-4 rounded-lg bg-black/20 border border-white/[0.03] p-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-4 h-4 text-muted-foreground/50", "aria-hidden": "true" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-x-4 gap-y-0.5 text-xs text-foreground/80", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold", children: data.manga.count }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground/60", children: [
          "manga · ",
          data.manga.chaptersRead,
          " chapters"
        ] }),
        data.manga.meanScore ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground/60", children: [
          "score ",
          data.manga.meanScore
        ] }) : null
      ] })
    ] }),
    data.topGenres && data.topGenres.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 flex flex-wrap gap-1.5", children: data.topGenres.map((g) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "span",
      {
        className: "px-2 py-0.5 rounded-full bg-white/[0.03] border border-white/[0.04] text-[10px] text-muted-foreground/70",
        children: [
          g.genre,
          " · ",
          g.count
        ]
      },
      g.genre
    )) })
  ] });
}
const OverviewExternalStats = reactExports.memo(function OverviewExternalStats2({
  stats,
  isLoading = false
}) {
  if (!isLoading && stats.length === 0) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    GlassPanel,
    {
      className: "relative overflow-hidden p-5 sm:p-7 border-white/[0.04] bg-background/40 backdrop-blur-2xl rounded-2xl",
      role: "region",
      "aria-label": "Linked tracker statistics",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-12 -right-12 w-48 h-48 bg-[#02A9FF]/10 blur-[70px] rounded-full pointer-events-none" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 mb-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "w-4 h-4 text-primary/80" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-base sm:text-lg text-foreground tracking-tight", children: "Tracker Statistics" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground/70", children: "Live stats pulled from your linked AniList and MyAnimeList accounts" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative z-10 space-y-4", children: isLoading && stats.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-28 rounded-xl bg-white/[0.02] border border-white/[0.03] animate-pulse" }) : stats.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(ProviderCard, { data: s }, s.provider)) })
      ]
    }
  );
});
const ANIME_STATUS_ORDER = [
  "watching",
  "completed",
  "on_hold",
  "dropped",
  "plan_to_watch"
];
const MANGA_STATUS_ORDER = [
  "reading",
  "completed",
  "on_hold",
  "dropped",
  "plan_to_read"
];
const ANIME_STATUS_LABELS = {
  watching: "Watching",
  completed: "Completed",
  on_hold: "On Hold",
  dropped: "Dropped",
  plan_to_watch: "Plan to Watch"
};
const MANGA_STATUS_LABELS$1 = {
  reading: "Reading",
  completed: "Completed",
  on_hold: "On Hold",
  dropped: "Dropped",
  plan_to_read: "Plan to Read"
};
const STATUS_COLORS = {
  watching: "#8b5cf6",
  // violet (primary-ish)
  reading: "#8b5cf6",
  completed: "#10b981",
  // emerald
  on_hold: "#f59e0b",
  // amber
  dropped: "#f43f5e",
  // rose
  plan_to_watch: "#38bdf8",
  // sky
  plan_to_read: "#38bdf8"
};
function normalizeAnimeStatus(value) {
  const s = String(value || "").trim().toLowerCase();
  if (s === "watching") return "watching";
  if (s === "completed") return "completed";
  if (s === "on_hold") return "on_hold";
  if (s === "dropped") return "dropped";
  return "plan_to_watch";
}
function normalizeMangaStatus(value) {
  const s = String(value || "").trim().toLowerCase();
  if (s === "reading") return "reading";
  if (s === "completed") return "completed";
  if (s === "on_hold") return "on_hold";
  if (s === "dropped") return "dropped";
  return "plan_to_read";
}
function computeLibraryDistribution(watchlist = [], mangaReadlist = []) {
  const animeCounts = {
    watching: 0,
    completed: 0,
    plan_to_watch: 0,
    on_hold: 0,
    dropped: 0
  };
  const mangaCounts = {
    reading: 0,
    completed: 0,
    plan_to_read: 0,
    on_hold: 0,
    dropped: 0
  };
  for (const row of watchlist || []) {
    animeCounts[normalizeAnimeStatus(row == null ? void 0 : row.status)] += 1;
  }
  for (const row of mangaReadlist || []) {
    mangaCounts[normalizeMangaStatus(row == null ? void 0 : row.status)] += 1;
  }
  const anime = ANIME_STATUS_ORDER.map((status) => ({
    status,
    label: ANIME_STATUS_LABELS[status],
    count: animeCounts[status],
    color: STATUS_COLORS[status]
  }));
  const manga = MANGA_STATUS_ORDER.map((status) => ({
    status,
    label: MANGA_STATUS_LABELS$1[status],
    count: mangaCounts[status],
    color: STATUS_COLORS[status]
  }));
  return {
    anime,
    manga,
    animeCounts,
    mangaCounts,
    animeTotal: (watchlist || []).length,
    mangaTotal: (mangaReadlist || []).length
  };
}
const GlassTooltip$3 = ({ active, payload }) => {
  var _a, _b;
  if (active && payload && payload.length) {
    const p = payload[0];
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-xl border border-white/[0.08] bg-background/80 p-3 shadow-2xl backdrop-blur-2xl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-2 h-2 rounded-full", style: { backgroundColor: (_a = p.payload) == null ? void 0 : _a.color } }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground/70", children: [
        (_b = p.payload) == null ? void 0 : _b.label,
        ":"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground font-mono", children: p.value })
    ] }) });
  }
  return null;
};
function OverviewLibraryDistribution({
  watchlist = [],
  mangaReadlist = []
}) {
  const dist = reactExports.useMemo(
    () => computeLibraryDistribution(watchlist, mangaReadlist),
    [watchlist, mangaReadlist]
  );
  const [tab, setTab] = reactExports.useState("anime");
  const buckets = tab === "anime" ? dist.anime : dist.manga;
  const total = tab === "anime" ? dist.animeTotal : dist.mangaTotal;
  const pieData = buckets.filter((b) => b.count > 0);
  const maxCount = Math.max(1, ...buckets.map((b) => b.count));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassPanel, { className: "relative overflow-hidden p-5 sm:p-7 flex flex-col justify-between border-white/[0.04] bg-background/40 backdrop-blur-2xl rounded-2xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-12 -right-12 w-48 h-48 bg-[hsl(var(--profile-accent)/0.10)] blur-[70px] rounded-full pointer-events-none" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Library, { className: "w-4 h-4 text-primary/80" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-base sm:text-lg text-foreground tracking-tight", children: "Library Distribution" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground/70", children: "How your titles break down by status" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-1 bg-black/20 p-1 rounded-xl border border-white/[0.03] self-start sm:self-auto", children: ["anime", "manga"].map((key) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => setTab(key),
          className: cn(
            "px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all duration-200",
            tab === key ? "bg-white/10 text-foreground shadow-sm" : "text-muted-foreground/60 hover:text-foreground/90 hover:bg-white/[0.02]"
          ),
          children: key
        },
        key
      )) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative z-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0, scale: 0.98 },
        animate: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: 0.98 },
        transition: { duration: 0.2, ease: "easeOut" },
        children: total === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center h-[220px] text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Library, { className: "w-10 h-10 text-muted-foreground/30 mb-3" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground/60", children: [
            "No ",
            tab,
            " titles tracked yet."
          ] })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row items-center gap-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "h-[170px] w-[170px] relative shrink-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(PieChart, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip$1, { content: /* @__PURE__ */ jsxRuntimeExports.jsx(GlassTooltip$3, {}) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Pie,
                {
                  data: pieData,
                  cx: "50%",
                  cy: "50%",
                  innerRadius: 54,
                  outerRadius: 78,
                  paddingAngle: 4,
                  dataKey: "count",
                  stroke: "none",
                  cornerRadius: 5,
                  animationDuration: 700,
                  children: pieData.map((entry) => /* @__PURE__ */ jsxRuntimeExports.jsx(Cell, { fill: entry.color }, entry.status))
                }
              )
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 flex flex-col items-center justify-center pointer-events-none", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-bold text-2xl text-foreground", children: total }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground/50 font-medium uppercase tracking-widest", children: "Titles" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 w-full space-y-2.5", children: buckets.map((b) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground/80 w-24 shrink-0", children: b.label }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-2 rounded-full bg-white/[0.04] overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                className: "h-full rounded-full",
                style: { backgroundColor: b.color },
                initial: { width: 0 },
                whileInView: { width: `${b.count / maxCount * 100}%` },
                viewport: { once: true },
                transition: { duration: 0.6, ease: "easeOut" }
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-mono font-semibold text-foreground w-8 text-right tabular-nums", children: b.count })
          ] }, b.status)) })
        ] })
      },
      tab
    ) }) })
  ] });
}
function computeRatingDistribution(ratings = []) {
  const counts = new Array(6).fill(0);
  let sum = 0;
  let total = 0;
  for (const row of ratings || []) {
    const r = Math.round(Number(row == null ? void 0 : row.rating));
    if (!Number.isFinite(r) || r < 1 || r > 5) continue;
    counts[r] += 1;
    sum += r;
    total += 1;
  }
  const buckets = [];
  for (let r = 1; r <= 5; r++) {
    buckets.push({ rating: r, count: counts[r] });
  }
  let mode = null;
  let modeCount = 0;
  for (let r = 1; r <= 5; r++) {
    if (counts[r] > modeCount) {
      modeCount = counts[r];
      mode = r;
    }
  }
  return {
    buckets,
    total,
    average: total > 0 ? sum / total : 0,
    mode
  };
}
function barColor(rating) {
  if (rating <= 3) return "#f43f5e";
  if (rating <= 6) return "#f59e0b";
  if (rating <= 8) return "#8b5cf6";
  return "#10b981";
}
const GlassTooltip$2 = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-white/[0.08] bg-background/80 p-3 shadow-2xl backdrop-blur-2xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs font-semibold text-foreground/90 mb-1", children: [
        "Score ",
        label
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground/70", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono font-semibold text-foreground", children: payload[0].value }),
        " ",
        payload[0].value === 1 ? "title" : "titles"
      ] })
    ] });
  }
  return null;
};
function OverviewRatingDistribution({ ratings = [] }) {
  const dist = reactExports.useMemo(() => computeRatingDistribution(ratings), [ratings]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassPanel, { className: "relative overflow-hidden p-5 sm:p-7 flex flex-col justify-between border-white/[0.04] bg-background/40 backdrop-blur-2xl rounded-2xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-12 -right-12 w-48 h-48 bg-[hsl(var(--profile-accent)/0.10)] blur-[70px] rounded-full pointer-events-none" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 flex items-center justify-between gap-4 mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-4 h-4 text-primary/80" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-base sm:text-lg text-foreground tracking-tight", children: "Rating Distribution" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground/70", children: "How you score the titles you rate" })
      ] }),
      dist.total > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-primary/10 border border-primary/20 text-primary shrink-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold font-display tabular-nums", children: dist.average.toFixed(1) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] uppercase font-semibold tracking-wide", children: "avg" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative z-10 h-[220px] w-full", children: dist.total === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center h-full text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-10 h-10 text-muted-foreground/30 mb-3" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground/60", children: "No ratings yet." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground/40 mt-1", children: "Rate titles to see your distribution." })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(BarChart, { data: dist.buckets, margin: { top: 10, right: 10, left: -25, bottom: 0 }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { strokeDasharray: "2 4", stroke: "rgba(255,255,255,0.03)", vertical: false }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { dataKey: "rating", stroke: "#52525b", fontSize: 11, tickLine: false, axisLine: false }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, { stroke: "#52525b", fontSize: 11, tickLine: false, axisLine: false, allowDecimals: false }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip$1, { content: /* @__PURE__ */ jsxRuntimeExports.jsx(GlassTooltip$2, {}), cursor: { fill: "rgba(255,255,255,0.03)" } }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Bar, { dataKey: "count", radius: [5, 5, 0, 0], animationDuration: 700, barSize: 26, children: dist.buckets.map((b) => /* @__PURE__ */ jsxRuntimeExports.jsx(Cell, { fill: barColor(b.rating) }, b.rating)) })
    ] }) }) }),
    dist.total > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 flex items-center justify-between pt-4 border-t border-white/[0.04] mt-2 text-[11px] text-muted-foreground/60", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
        dist.total,
        " rated"
      ] }),
      dist.mode !== null && /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.span, { initial: { opacity: 0 }, animate: { opacity: 1 }, children: [
        "Most given: ",
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono font-semibold text-foreground", children: [
          dist.mode,
          "/10"
        ] })
      ] })
    ] })
  ] });
}
const GlassTooltip$1 = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-white/[0.08] bg-background/80 p-3 shadow-2xl backdrop-blur-2xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-foreground/90", children: payload[0].payload.genre }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground/70", children: [
        "Affinity ",
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono font-semibold text-foreground", children: [
          payload[0].value,
          "%"
        ] })
      ] })
    ] });
  }
  return null;
};
function EmptyState({ message }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center h-[220px] text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-10 h-10 text-muted-foreground/30 mb-3" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground/60 max-w-[220px]", children: message }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Link,
      {
        to: "/recommendations",
        className: "mt-3 text-xs font-medium text-primary hover:underline",
        children: "Build your taste profile →"
      }
    )
  ] });
}
function OverviewGenreAnalytics({ profile, isLoading = false }) {
  const radarData = reactExports.useMemo(
    () => ((profile == null ? void 0 : profile.topGenres) || []).slice(0, 6).map((g) => ({
      genre: g.genre,
      weight: Math.round(g.weight * 100)
    })),
    [profile]
  );
  const topTags = reactExports.useMemo(() => {
    const entries = Object.entries((profile == null ? void 0 : profile.tags) || {});
    return entries.filter(([, w]) => Number.isFinite(w) && w > 0).sort((a, b) => b[1] - a[1]).slice(0, 12).map(([tag]) => tag);
  }, [profile]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassPanel, { className: "relative overflow-hidden p-5 sm:p-7 flex flex-col justify-between border-white/[0.04] bg-background/40 backdrop-blur-2xl rounded-2xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-12 -right-12 w-48 h-48 bg-[hsl(var(--profile-accent)/0.10)] blur-[70px] rounded-full pointer-events-none" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-4 h-4 text-primary/80" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-base sm:text-lg text-foreground tracking-tight", children: "Genre Analytics" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground/70", children: "Your genre affinity across watched titles" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10", children: [
      isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-[220px] w-full animate-pulse rounded-xl bg-white/[0.02]" }) : !profile || radarData.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyState, { message: "No taste profile yet. Visit Recommendations to generate one from your lists." }) : radarData.length >= 3 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-[240px] w-full", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(RadarChart, { data: radarData, outerRadius: "70%", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(PolarGrid, { stroke: "hsl(var(--border))" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(PolarAngleAxis, { dataKey: "genre", tick: { fill: "hsl(var(--muted-foreground))", fontSize: 11 } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip$1, { content: /* @__PURE__ */ jsxRuntimeExports.jsx(GlassTooltip$1, {}) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Radar,
          {
            dataKey: "weight",
            stroke: "hsl(var(--primary))",
            fill: "hsl(var(--primary))",
            fillOpacity: 0.4,
            animationDuration: 800
          }
        )
      ] }) }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2 py-4", children: (profile.topGenres || []).slice(0, 5).map((g) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground/80 w-24 shrink-0 truncate", children: g.genre }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-2 rounded-full bg-white/[0.04] overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full bg-primary rounded-full", style: { width: `${g.weight * 100}%` } }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-mono text-muted-foreground w-8 text-right", children: [
          Math.round(g.weight * 100),
          "%"
        ] })
      ] }, g.genre)) }),
      profile && topTags.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 pt-4 border-t border-white/[0.04]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] font-medium uppercase tracking-wider text-muted-foreground/70", children: "Top Tags" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2.5 flex flex-wrap gap-2", children: topTags.map((tag) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: "px-2.5 py-1 rounded-lg bg-white/[0.03] border border-white/[0.06] text-xs font-medium text-foreground/80",
            children: tag
          },
          tag
        )) })
      ] })
    ] })
  ] });
}
function diversityLabel(score) {
  if (score > 0.7) return "Very diverse taste";
  if (score > 0.4) return "Moderate diversity";
  return "Focused preferences";
}
function OverviewTasteBreakdown({ profile, isLoading = false }) {
  const hasProfile = !!profile && (profile.topStudios.length > 0 || profile.sampleSize > 0);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassPanel, { className: "relative overflow-hidden p-5 sm:p-7 flex flex-col justify-between border-white/[0.04] bg-background/40 backdrop-blur-2xl rounded-2xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-12 -right-12 w-48 h-48 bg-[hsl(var(--profile-accent)/0.10)] blur-[70px] rounded-full pointer-events-none" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "w-4 h-4 text-primary/80" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-base sm:text-lg text-foreground tracking-tight", children: "Taste Breakdown" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground/70", children: "Favorite studios, rating range, and diversity" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative z-10 flex-1", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-[200px] w-full animate-pulse rounded-xl bg-white/[0.02]" }) : !hasProfile ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center h-[200px] text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "w-10 h-10 text-muted-foreground/30 mb-3" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground/60 max-w-[220px]", children: "No taste profile yet. Generate one to see your favorite studios." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/recommendations", className: "mt-3 text-xs font-medium text-primary hover:underline", children: "Build your taste profile →" })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
      profile.topStudios.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 mb-2.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "w-3.5 h-3.5 text-muted-foreground/60" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] font-medium uppercase tracking-wider text-muted-foreground/70", children: "Favorite Studios" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: profile.topStudios.slice(0, 6).map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: "px-2.5 py-1 rounded-lg bg-primary/10 border border-primary/20 text-primary text-xs font-medium",
            children: s.studio
          },
          s.studio
        )) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 mb-2.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-3.5 h-3.5 text-muted-foreground/60" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] font-medium uppercase tracking-wider text-muted-foreground/70", children: "Preferred Rating" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-2 rounded-full bg-white/[0.04] relative overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute h-full rounded-full bg-gradient-to-r from-primary/50 to-primary",
              style: {
                left: `${profile.ratingRange.min / 10 * 100}%`,
                width: `${(profile.ratingRange.max - profile.ratingRange.min) / 10 * 100}%`
              }
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-mono font-semibold text-foreground tabular-nums shrink-0", children: [
            profile.ratingRange.min.toFixed(1),
            "–",
            profile.ratingRange.max.toFixed(1)
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] text-muted-foreground/50 mt-1", children: [
          "Avg ",
          profile.ratingRange.average.toFixed(1),
          "/10"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 mb-2.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Shuffle, { className: "w-3.5 h-3.5 text-muted-foreground/60" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] font-medium uppercase tracking-wider text-muted-foreground/70", children: "Diversity Score" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-2 rounded-full bg-white/[0.04] overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              className: "h-full rounded-full bg-emerald-500",
              initial: { width: 0 },
              whileInView: { width: `${profile.diversityScore * 100}%` },
              viewport: { once: true },
              transition: { duration: 0.6, ease: "easeOut" }
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-bold text-foreground tabular-nums shrink-0", children: [
            Math.round(profile.diversityScore * 100),
            "%"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground/50 mt-1", children: diversityLabel(profile.diversityScore) })
      ] })
    ] }) })
  ] });
}
const WEEKDAY_LABELS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
function hourRangeLabel(hour) {
  const fmt = (h) => {
    const period = h < 12 ? "AM" : "PM";
    const base = h % 12 === 0 ? 12 : h % 12;
    return `${base} ${period}`;
  };
  const end = (hour + 2) % 24;
  return `${fmt(hour)} – ${fmt(end)}`;
}
function computeWatchingHabits(history = []) {
  const hourly = new Array(24).fill(0);
  const byWeekday = new Array(7).fill(0);
  const dayKeys = /* @__PURE__ */ new Set();
  const animeIds = /* @__PURE__ */ new Set();
  let totalEvents = 0;
  for (const row of history || []) {
    const raw = (row == null ? void 0 : row.watched_at) || (row == null ? void 0 : row.updated_at);
    if (!raw) continue;
    const d = new Date(raw);
    if (Number.isNaN(d.getTime())) continue;
    hourly[d.getHours()] += 1;
    byWeekday[d.getDay()] += 1;
    dayKeys.add(`${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`);
    if (row == null ? void 0 : row.anime_id) animeIds.add(String(row.anime_id));
    totalEvents += 1;
  }
  let peakHour = null;
  let peakCount = 0;
  for (let h = 0; h < 24; h++) {
    if (hourly[h] > peakCount) {
      peakCount = hourly[h];
      peakHour = h;
    }
  }
  let mostActiveDayIdx = -1;
  let dayCount = 0;
  for (let d = 0; d < 7; d++) {
    if (byWeekday[d] > dayCount) {
      dayCount = byWeekday[d];
      mostActiveDayIdx = d;
    }
  }
  const activeDays = dayKeys.size;
  return {
    hourly,
    peakHour,
    peakHourLabel: peakHour === null ? "" : hourRangeLabel(peakHour),
    byWeekday,
    mostActiveDay: mostActiveDayIdx >= 0 ? WEEKDAY_LABELS[mostActiveDayIdx] : "",
    activeDays,
    totalEvents,
    avgEpisodesPerActiveDay: activeDays > 0 ? totalEvents / activeDays : 0,
    uniqueAnime: animeIds.size
  };
}
function OverviewWatchingHabits({
  history = [],
  currentStreak = 0,
  longestStreak = 0
}) {
  const habits = reactExports.useMemo(() => computeWatchingHabits(history), [history]);
  const maxHour = Math.max(1, ...habits.hourly);
  const stats = [
    { label: "Peak Activity", value: habits.peakHourLabel || "—", icon: Clock },
    { label: "Most Active Day", value: habits.mostActiveDay || "—", icon: CalendarClock },
    {
      label: "Avg / Active Day",
      value: habits.avgEpisodesPerActiveDay > 0 ? `${habits.avgEpisodesPerActiveDay.toFixed(1)} eps` : "—",
      icon: Zap
    },
    { label: "Active Days", value: habits.activeDays > 0 ? `${habits.activeDays}` : "—", icon: Flame }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassPanel, { className: "relative overflow-hidden p-5 sm:p-7 flex flex-col justify-between border-white/[0.04] bg-background/40 backdrop-blur-2xl rounded-2xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-12 -right-12 w-48 h-48 bg-[hsl(var(--profile-accent)/0.10)] blur-[70px] rounded-full pointer-events-none" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-4 h-4 text-primary/80" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-base sm:text-lg text-foreground tracking-tight", children: "Your Watching Habits" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground/70", children: "Based on your latest activity per episode" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative z-10 space-y-5", children: habits.totalEvents === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center h-[180px] text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-10 h-10 text-muted-foreground/30 mb-3" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground/60", children: "No watch activity yet." })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-3", children: stats.map((s) => {
        const Icon = s.icon;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-center gap-2.5 p-3 rounded-xl bg-white/[0.015] border border-white/[0.03]",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-1.5 rounded-md bg-white/[0.03] text-muted-foreground/60", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-3.5 h-3.5" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-medium text-muted-foreground/60 uppercase tracking-wide truncate", children: s.label }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground/90 text-xs truncate", children: s.value })
              ] })
            ]
          },
          s.label
        );
      }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] font-medium uppercase tracking-wider text-muted-foreground/70", children: "24-Hour Activity" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground/50", children: "12a · 6a · 12p · 6p" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-end gap-[2px] h-16", children: habits.hourly.map((count, hour) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "flex-1 flex items-end h-full",
            title: `${count} at ${hour}:00`,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                className: cn(
                  "w-full rounded-sm",
                  hour === habits.peakHour ? "bg-primary" : "bg-primary/30"
                ),
                initial: { height: 0 },
                whileInView: { height: `${Math.max(count / maxHour * 100, count > 0 ? 8 : 2)}%` },
                viewport: { once: true },
                transition: { duration: 0.4, delay: hour * 0.01, ease: "easeOut" }
              }
            )
          },
          hour
        )) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 pt-4 border-t border-white/[0.04]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-black/20 border border-white/[0.03]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Flame, { className: "w-3.5 h-3.5 text-orange-400" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground/70 text-[11px]", children: "Current:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-bold text-foreground font-display tabular-nums", children: [
            currentStreak,
            "d"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-black/20 border border-white/[0.03]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "w-3.5 h-3.5 text-amber-400" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground/70 text-[11px]", children: "Longest:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-bold text-foreground font-display tabular-nums", children: [
            longestStreak,
            "d"
          ] })
        ] })
      ] })
    ] }) })
  ] });
}
function OverviewCommunityAnalytics({
  commentCount = 0,
  forumPostCount = 0,
  forumUpvotes = 0,
  followersCount = 0,
  followingCount = 0,
  reputationScore,
  reputationBreakdown = [],
  leaderboardRank = null,
  totalRankedUsers = null
}) {
  const tiles = [
    { label: "Comments", value: commentCount, icon: MessageSquare, color: "text-sky-400" },
    { label: "Forum Posts", value: forumPostCount, icon: FileText, color: "text-indigo-400" },
    { label: "Upvotes", value: forumUpvotes, icon: ThumbsUp, color: "text-emerald-400" },
    { label: "Followers", value: followersCount, icon: UserPlus, color: "text-rose-400" }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassPanel, { className: "relative overflow-hidden p-5 sm:p-7 flex flex-col justify-between border-white/[0.04] bg-background/40 backdrop-blur-2xl rounded-2xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-12 -right-12 w-48 h-48 bg-[hsl(var(--profile-accent)/0.10)] blur-[70px] rounded-full pointer-events-none" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 flex items-center justify-between gap-4 mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-4 h-4 text-primary/80" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-base sm:text-lg text-foreground tracking-tight", children: "Community Analytics" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground/70", children: "Your presence across the community" })
      ] }),
      leaderboardRank != null ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 shrink-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "w-3.5 h-3.5" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-bold font-display tabular-nums", children: [
          "#",
          leaderboardRank
        ] })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/[0.05] text-muted-foreground/60 shrink-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "w-3.5 h-3.5" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] font-semibold", children: "Unranked" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 space-y-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-3", children: tiles.map((t) => {
        const Icon = t.icon;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex flex-col gap-1.5 p-3 rounded-xl bg-white/[0.015] border border-white/[0.03]",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: `w-4 h-4 ${t.color}` }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-bold text-lg text-foreground tabular-nums", children: t.value }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-medium text-muted-foreground/60 uppercase tracking-wide", children: t.label })
            ]
          },
          t.label
        );
      }) }),
      reputationScore != null && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-4 border-t border-white/[0.04]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Award, { className: "w-3.5 h-3.5 text-muted-foreground/60" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] font-medium uppercase tracking-wider text-muted-foreground/70", children: "Reputation" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-display font-bold text-foreground tabular-nums", children: [
            reputationScore,
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground/50", children: "/100" })
          ] })
        ] }),
        reputationBreakdown.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: reputationBreakdown.map((term) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] text-muted-foreground/70 w-24 shrink-0 truncate", children: term.label }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-1.5 rounded-full bg-white/[0.04] overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              className: "h-full rounded-full bg-gradient-to-r from-primary/60 to-primary",
              initial: { width: 0 },
              whileInView: { width: `${term.value / term.weight * 100}%` },
              viewport: { once: true },
              transition: { duration: 0.5, ease: "easeOut" }
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] font-mono text-muted-foreground/50 w-12 text-right tabular-nums", children: [
            term.value,
            "/",
            term.weight
          ] })
        ] }, term.key)) }),
        leaderboardRank != null && totalRankedUsers ? /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] text-muted-foreground/50 mt-3", children: [
          "Ranked #",
          leaderboardRank,
          " of ",
          totalRankedUsers,
          " active members"
        ] }) : null
      ] })
    ] })
  ] });
}
const MONTH_LABELS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
function monthKey(d) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
}
function parseDate(row) {
  const raw = (row == null ? void 0 : row.watched_at) || (row == null ? void 0 : row.created_at) || (row == null ? void 0 : row.updated_at);
  if (!raw) return null;
  const d = new Date(raw);
  return Number.isNaN(d.getTime()) ? null : d;
}
function computeMonthlySeries(inputs = {}, months = 12) {
  const { history = [], watchlist = [], mangaReadlist = [], ratings = [], comments = [] } = inputs;
  const now = /* @__PURE__ */ new Date();
  const window2 = [];
  for (let i = months - 1; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    window2.push({ key: monthKey(d), label: MONTH_LABELS[d.getMonth()], date: d });
  }
  const indexByKey = new Map(window2.map((m, i) => [m.key, i]));
  const monthly = window2.map((m) => ({
    key: m.key,
    label: m.label,
    episodes: 0,
    chapters: 0,
    ratings: 0,
    comments: 0,
    animeAdded: 0,
    mangaAdded: 0
  }));
  const completedByMonth = new Array(window2.length).fill(0);
  const bump = (row, field, onIndex) => {
    const d = parseDate(row);
    if (!d) return;
    const idx = indexByKey.get(monthKey(d));
    if (idx === void 0) return;
    monthly[idx][field] += 1;
    onIndex == null ? void 0 : onIndex(idx);
  };
  for (const row of history) {
    bump(row, "episodes", (idx) => {
      if (row == null ? void 0 : row.completed) completedByMonth[idx] += 1;
    });
  }
  for (const row of watchlist) bump(row, "animeAdded");
  for (const row of mangaReadlist) bump(row, "chapters");
  for (const row of mangaReadlist) bump(row, "mangaAdded");
  for (const row of ratings) bump(row, "ratings");
  for (const row of comments) bump(row, "comments");
  const cumulative = [];
  let anime = 0;
  let manga = 0;
  let ratingsAcc = 0;
  let commentsAcc = 0;
  for (let i = 0; i < monthly.length; i++) {
    anime += monthly[i].animeAdded;
    manga += monthly[i].mangaAdded;
    ratingsAcc += monthly[i].ratings;
    commentsAcc += monthly[i].comments;
    cumulative.push({
      key: monthly[i].key,
      label: monthly[i].label,
      anime,
      manga,
      ratings: ratingsAcc,
      comments: commentsAcc
    });
  }
  const completionTrend = monthly.map((m, i) => ({
    key: m.key,
    label: m.label,
    rate: m.episodes > 0 ? Math.round(completedByMonth[i] / m.episodes * 100) : 0
  }));
  const hasData = monthly.some(
    (m) => m.episodes || m.chapters || m.ratings || m.comments || m.animeAdded || m.mangaAdded
  );
  return { monthly, cumulative, completionTrend, hasData };
}
const GlassTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-white/[0.08] bg-background/80 p-3 shadow-2xl backdrop-blur-2xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-foreground/90 mb-1.5", children: label }),
      payload.map((entry, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-2 h-2 rounded-full", style: { backgroundColor: entry.color || entry.stroke } }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground/70", children: [
          entry.name,
          ":"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold text-foreground font-mono", children: [
          entry.value,
          entry.name === "Completion" ? "%" : ""
        ] })
      ] }, i))
    ] });
  }
  return null;
};
function OverviewGrowthTrends({ months = 12, ...inputs }) {
  const series = reactExports.useMemo(() => computeMonthlySeries(inputs, months), [inputs, months]);
  const [view, setView] = reactExports.useState("growth");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassPanel, { className: "relative h-full overflow-hidden p-5 sm:p-7 flex flex-col justify-between border-white/[0.04] bg-background/40 backdrop-blur-2xl rounded-2xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-12 -right-12 w-48 h-48 bg-[hsl(var(--profile-accent)/0.10)] blur-[70px] rounded-full pointer-events-none" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-4 h-4 text-primary/80" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-base sm:text-lg text-foreground tracking-tight", children: "Growth & Trends" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground/70", children: [
          "Real monthly activity over the last ",
          months,
          " months"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 bg-black/20 p-1 rounded-xl border border-white/[0.03] self-start sm:self-auto", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: () => setView("growth"),
            className: cn(
              "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200",
              view === "growth" ? "bg-white/10 text-foreground shadow-sm" : "text-muted-foreground/60 hover:text-foreground/90 hover:bg-white/[0.02]"
            ),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-3.5 h-3.5" }),
              "Growth"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: () => setView("completion"),
            className: cn(
              "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200",
              view === "completion" ? "bg-white/10 text-foreground shadow-sm" : "text-muted-foreground/60 hover:text-foreground/90 hover:bg-white/[0.02]"
            ),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ChartLine, { className: "w-3.5 h-3.5" }),
              "Completion"
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative z-10 h-[260px] w-full", children: !series.hasData ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center h-full text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-10 h-10 text-muted-foreground/30 mb-3" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground/60", children: "Not enough activity to chart yet." })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: view === "growth" ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0, scale: 0.98 },
        animate: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: 0.98 },
        transition: { duration: 0.2 },
        className: "h-full w-full",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AreaChart, { data: series.cumulative, margin: { top: 10, right: 10, left: -25, bottom: 0 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("defs", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: "animeGrowth", x1: "0", y1: "0", x2: "0", y2: "1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "5%", stopColor: "#8b5cf6", stopOpacity: 0.35 }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "95%", stopColor: "#8b5cf6", stopOpacity: 0 })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: "mangaGrowth", x1: "0", y1: "0", x2: "0", y2: "1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "5%", stopColor: "#f59e0b", stopOpacity: 0.35 }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "95%", stopColor: "#f59e0b", stopOpacity: 0 })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { strokeDasharray: "2 4", stroke: "rgba(255,255,255,0.03)", vertical: false }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { dataKey: "label", stroke: "#52525b", fontSize: 11, tickLine: false, axisLine: false }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, { stroke: "#52525b", fontSize: 11, tickLine: false, axisLine: false, allowDecimals: false }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip$1, { content: /* @__PURE__ */ jsxRuntimeExports.jsx(GlassTooltip, {}) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Area,
            {
              type: "monotone",
              dataKey: "anime",
              name: "Anime",
              stroke: "#8b5cf6",
              strokeWidth: 2,
              fill: "url(#animeGrowth)",
              animationDuration: 900
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Area,
            {
              type: "monotone",
              dataKey: "manga",
              name: "Manga",
              stroke: "#f59e0b",
              strokeWidth: 2,
              fill: "url(#mangaGrowth)",
              animationDuration: 900
            }
          )
        ] }) })
      },
      "growth"
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0, scale: 0.98 },
        animate: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: 0.98 },
        transition: { duration: 0.2 },
        className: "h-full w-full",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(LineChart, { data: series.completionTrend, margin: { top: 10, right: 10, left: -25, bottom: 0 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { strokeDasharray: "2 4", stroke: "rgba(255,255,255,0.03)", vertical: false }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { dataKey: "label", stroke: "#52525b", fontSize: 11, tickLine: false, axisLine: false }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            YAxis,
            {
              stroke: "#52525b",
              fontSize: 11,
              tickLine: false,
              axisLine: false,
              domain: [0, 100],
              unit: "%"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip$1, { content: /* @__PURE__ */ jsxRuntimeExports.jsx(GlassTooltip, {}) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Line,
            {
              type: "monotone",
              dataKey: "rate",
              name: "Completion",
              stroke: "#10b981",
              strokeWidth: 2.5,
              dot: { r: 3, fill: "#10b981" },
              animationDuration: 900
            }
          )
        ] }) })
      },
      "completion"
    ) }) })
  ] });
}
function OverviewFavoriteCharacters({
  characters = [],
  isLoading = false,
  isViewingOther = false
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassPanel, { className: "relative overflow-hidden p-5 sm:p-7 flex flex-col justify-between border-white/[0.04] bg-background/40 backdrop-blur-2xl rounded-2xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-12 -right-12 w-48 h-48 bg-[hsl(var(--profile-accent)/0.10)] blur-[70px] rounded-full pointer-events-none" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 flex items-center justify-between gap-4 mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: "w-4 h-4 text-primary/80" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-base sm:text-lg text-foreground tracking-tight", children: isViewingOther ? "Favorite Characters" : "Your Favorite Characters" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground/70", children: "Characters pinned from across the catalog" })
      ] }),
      characters.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-semibold text-muted-foreground/80 px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.05] uppercase tracking-wider shrink-0", children: characters.length })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative z-10", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3", children: [...Array(6)].map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-[3/4] rounded-xl bg-white/[0.02] animate-pulse" }, i)) }) : characters.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center h-[160px] text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: "w-10 h-10 text-muted-foreground/30 mb-3" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground/60", children: isViewingOther ? "No favorite characters yet." : "You haven't favorited any characters yet." }),
      !isViewingOther && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground/40 mt-1", children: "Tap the heart on a character page to add them here." })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3", children: characters.map((c, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0, scale: 0.95 },
        whileInView: { opacity: 1, scale: 1 },
        viewport: { once: true },
        transition: { duration: 0.25, delay: idx * 0.03, ease: "easeOut" },
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Link,
          {
            to: `/character/${encodeURIComponent(c.character_id)}?name=${encodeURIComponent(c.character_name)}`,
            className: "group block",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-[3/4] rounded-xl overflow-hidden border border-white/[0.05] bg-white/[0.02]", children: [
              c.character_image ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: c.character_image,
                  alt: c.character_name,
                  loading: "lazy",
                  className: "w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                }
              ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-full flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: "w-6 h-6 text-muted-foreground/30" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-2 pt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] font-semibold text-white truncate", children: c.character_name }) })
            ] })
          }
        )
      },
      c.id
    )) }) })
  ] });
}
function OverviewSmartInsights({ insights = [] }) {
  if (insights.length === 0) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassPanel, { className: "relative h-full overflow-hidden p-5 sm:p-7 flex flex-col justify-between border-white/[0.04] bg-background/40 backdrop-blur-2xl rounded-2xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-12 -right-12 w-48 h-48 bg-[hsl(var(--profile-accent)/0.10)] blur-[70px] rounded-full pointer-events-none" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -bottom-12 -left-12 w-48 h-48 bg-[hsl(var(--profile-accent)/0.05)] blur-[70px] rounded-full pointer-events-none" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 mb-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Lightbulb, { className: "w-4 h-4 text-primary/80" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-base sm:text-lg text-foreground tracking-tight", children: "Insights" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground/70", children: "Observations drawn from your own activity" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-3", children: insights.map((insight, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 8 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.3, delay: idx * 0.05, ease: "easeOut" },
        className: "flex items-start gap-2.5 p-3 rounded-xl bg-white/[0.015] border border-white/[0.03]",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-0.5 p-1 rounded-md bg-primary/10 text-primary shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Lightbulb, { className: "w-3 h-3" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-foreground/85 leading-relaxed", children: insight.text })
        ]
      },
      insight.id
    )) })
  ] });
}
const ProfileOverviewTab = reactExports.memo(function ProfileOverviewTab2({
  userId,
  username,
  isViewingOther = false,
  isPublic = false,
  showCalendar = true,
  watchTimeSeconds,
  episodesCount,
  completedAnimeCount,
  watchingAnimeCount,
  planToWatchCount = 0,
  mangaCount,
  manhwaCount,
  comicsCount,
  totalChaptersRead,
  readingTotals,
  streakDays,
  longestStreak,
  totalDaysActive = 0,
  commentCount,
  forumPostCount,
  forumUpvotes = 0,
  reputationRate,
  reputationBreakdown = [],
  leaderboardRank = null,
  totalRankedUsers = null,
  followersCount = 0,
  followingCount = 0,
  watchlist = [],
  history = [],
  mangaReadlist = [],
  ratings = [],
  commentDates = [],
  favoriteCharacters = [],
  favoriteCharactersLoading = false,
  tasteProfile = null,
  tasteProfileLoading = false,
  insights = [],
  achievements = [],
  externalStats = [],
  externalStatsLoading = false,
  onNavigateTab,
  onStatClick
}) {
  const navigateTab = onNavigateTab ?? (() => void 0);
  const rankUnits = {
    episodes: episodesCount,
    manga: (readingTotals == null ? void 0 : readingTotals.manga) ?? 0,
    manhwa: (readingTotals == null ? void 0 : readingTotals.manhwa) ?? 0,
    comic: (readingTotals == null ? void 0 : readingTotals.comic) ?? 0
  };
  const rankScore = computeRankScore(rankUnits);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      OverviewHeroStats,
      {
        watchTimeSeconds,
        episodesCount,
        completedAnimeCount,
        watchingAnimeCount,
        planToWatchCount,
        mangaCount,
        manhwaCount,
        comicsCount,
        totalChaptersRead,
        streakDays,
        longestStreak,
        totalDaysActive,
        commentCount,
        forumPostCount,
        forumUpvotes,
        reputationRate,
        onStatClick
      }
    ),
    !isViewingOther && /* @__PURE__ */ jsxRuntimeExports.jsx(OverviewExternalStats, { stats: externalStats, isLoading: externalStatsLoading }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 gap-5 xl:grid-cols-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(OverviewLibraryDistribution, { watchlist, mangaReadlist }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(OverviewRatingDistribution, { ratings })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      OverviewInteractiveCharts,
      {
        animeCount: episodesCount,
        manhwaCount,
        mangaCount,
        comicsCount,
        watchTimeSeconds,
        commentCount,
        forumPostCount,
        reputationRate,
        history
      }
    ),
    !isViewingOther && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 gap-5 xl:grid-cols-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(OverviewGenreAnalytics, { profile: tasteProfile, isLoading: tasteProfileLoading }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(OverviewTasteBreakdown, { profile: tasteProfile, isLoading: tasteProfileLoading })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 gap-5 xl:grid-cols-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(OverviewMangaAnalytics, { mangaReadlist }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        OverviewGrowthTrends,
        {
          history,
          watchlist,
          mangaReadlist,
          ratings,
          comments: commentDates
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 gap-5 xl:grid-cols-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        OverviewWatchingHabits,
        {
          history,
          currentStreak: streakDays,
          longestStreak
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        OverviewCommunityAnalytics,
        {
          commentCount,
          forumPostCount,
          forumUpvotes,
          followersCount,
          followingCount,
          reputationScore: reputationRate != null ? Math.round(reputationRate) : void 0,
          reputationBreakdown,
          leaderboardRank,
          totalRankedUsers
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      OverviewWidgetsRail,
      {
        watchlist,
        history,
        mangaReadlist,
        onNavigateTab: navigateTab,
        isViewingOther
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      OverviewFavoriteCharacters,
      {
        characters: favoriteCharacters,
        isLoading: favoriteCharactersLoading,
        isViewingOther
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      OverviewActivityHeatmap,
      {
        history,
        mangaReadlist,
        commentDates,
        currentStreak: streakDays,
        longestStreak,
        userId
      }
    ),
    isViewingOther ? (
      // Other user's calendar shows only when their profile is public and they
      // haven't opted out (show_calendar). Otherwise reviews take the full row.
      isPublic && showCalendar ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 gap-5 xl:grid-cols-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          OverviewCalendarSaves,
          {
            userId,
            isViewingOther: true,
            isPublic,
            showCalendar
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(OverviewReviews, { ratings, watchlist, history, isViewingOther: true })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
        OverviewReviews,
        {
          ratings,
          watchlist,
          history,
          isViewingOther: true
        }
      )
    ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 gap-5 xl:grid-cols-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(OverviewCalendarSaves, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(OverviewReviews, { ratings, watchlist, history })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      OverviewAchievements,
      {
        streakDays,
        longestStreak,
        episodesCount,
        rankScore,
        units: rankUnits,
        onNavigateTab: navigateTab
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 gap-5 xl:grid-cols-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        OverviewSocialConnections,
        {
          userId,
          username,
          followersCount,
          followingCount
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(OverviewSmartInsights, { insights })
    ] })
  ] });
});
const STATUS_LABELS = {
  watching: { label: "Watching", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "w-3 h-3" }), color: "text-blue-400", bg: "bg-blue-400/10" },
  completed: { label: "Completed", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-3 h-3" }), color: "text-green-400", bg: "bg-green-400/10" },
  plan_to_watch: { label: "Plan to Watch", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-3 h-3" }), color: "text-amber-400", bg: "bg-amber-400/10" },
  on_hold: { label: "On Hold", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Pause, { className: "w-3 h-3" }), color: "text-orange-400", bg: "bg-orange-400/10" },
  dropped: { label: "Dropped", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-3 h-3" }), color: "text-red-400", bg: "bg-red-400/10" }
};
const MANGA_STATUS_LABELS = {
  reading: { label: "Reading", color: "text-blue-300", bg: "bg-blue-500/15" },
  completed: { label: "Completed", color: "text-green-300", bg: "bg-green-500/15" },
  plan_to_read: { label: "Plan to Read", color: "text-amber-300", bg: "bg-amber-500/15" },
  on_hold: { label: "On Hold", color: "text-orange-300", bg: "bg-orange-500/15" },
  dropped: { label: "Dropped", color: "text-red-300", bg: "bg-red-500/15" }
};
const STATUS_ACCENT = {
  watching: { glow: "bg-sky-500/25", dot: "bg-sky-400", ring: "group-hover:ring-sky-400/40", text: "text-sky-300" },
  reading: { glow: "bg-sky-500/25", dot: "bg-sky-400", ring: "group-hover:ring-sky-400/40", text: "text-sky-300" },
  completed: { glow: "bg-emerald-500/25", dot: "bg-emerald-400", ring: "group-hover:ring-emerald-400/40", text: "text-emerald-300" },
  plan_to_watch: { glow: "bg-amber-500/25", dot: "bg-amber-400", ring: "group-hover:ring-amber-400/40", text: "text-amber-300" },
  plan_to_read: { glow: "bg-amber-500/25", dot: "bg-amber-400", ring: "group-hover:ring-amber-400/40", text: "text-amber-300" },
  on_hold: { glow: "bg-orange-500/25", dot: "bg-orange-400", ring: "group-hover:ring-orange-400/40", text: "text-orange-300" },
  dropped: { glow: "bg-rose-500/25", dot: "bg-rose-400", ring: "group-hover:ring-rose-400/40", text: "text-rose-300" }
};
const TAB_PANEL_CLASS = "relative overflow-hidden p-5 sm:p-7 border-white/[0.04] bg-background/40 backdrop-blur-2xl rounded-2xl";
function SeeAllDialog({
  open,
  onOpenChange,
  title,
  items,
  getKey,
  getTitle,
  renderCard,
  gridClass
}) {
  const [q, setQ] = reactExports.useState("");
  const term = q.trim().toLowerCase();
  const filtered = term ? items.filter((i) => String(getTitle(i) || "").toLowerCase().includes(term)) : items;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-3xl border-white/10 bg-background/95 backdrop-blur-2xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { className: "flex items-center gap-2 font-display tracking-tight", children: [
      title,
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-2.5 py-0.5 rounded-full bg-white/[0.05] text-xs font-semibold text-muted-foreground border border-white/[0.06]", children: items.length })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/60" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          value: q,
          onChange: (e) => setQ(e.target.value),
          placeholder: "Search this shelf…",
          className: "pl-9 rounded-full bg-white/[0.03] border-white/[0.08]"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollArea, { className: "max-h-[60vh] pr-2 -mr-2", children: filtered.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: gridClass, children: filtered.map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: renderCard(item, i) }, getKey(item))) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center py-12 text-muted-foreground text-sm", children: "No matches." }) })
  ] }) });
}
function ProfileShelf({
  status,
  label,
  items,
  getKey,
  getTitle,
  renderCard,
  shelfGridClass,
  dialogGridClass,
  cap = 5
}) {
  const [open, setOpen] = reactExports.useState(false);
  const accent = STATUS_ACCENT[status] || STATUS_ACCENT.plan_to_watch;
  const visible = items.slice(0, cap);
  const hasMore = items.length > cap;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "group/shelf", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3 mb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: cn("inline-flex h-2.5 w-2.5 rounded-full", accent.dot) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: cn("text-sm font-black uppercase tracking-widest", accent.text), children: label }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-2 py-0.5 rounded-full bg-white/[0.04] text-[11px] font-semibold text-muted-foreground border border-white/[0.05]", children: items.length })
      ] }),
      hasMore && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: () => setOpen(true),
          className: "flex items-center gap-1.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] px-3 py-1.5 text-xs font-bold text-foreground/80 hover:text-foreground transition-colors",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-3.5 h-3.5" }),
            "See all (",
            items.length,
            ")"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: shelfGridClass, children: visible.map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: renderCard(item, i) }, getKey(item))) }),
    hasMore && /* @__PURE__ */ jsxRuntimeExports.jsx(
      SeeAllDialog,
      {
        open,
        onOpenChange: setOpen,
        title: label,
        items,
        getKey,
        getTitle,
        renderCard,
        gridClass: dialogGridClass
      }
    )
  ] });
}
function useShelfSearch(items, order, getStatus, getTitle, fallbackStatus) {
  const [search, setSearch] = reactExports.useState("");
  const term = search.trim().toLowerCase();
  const groups = reactExports.useMemo(() => {
    const byStatus = /* @__PURE__ */ new Map();
    for (const item of items) {
      if (term && !String(getTitle(item) || "").toLowerCase().includes(term)) continue;
      const raw = getStatus(item) || fallbackStatus;
      const key = order.includes(raw) ? raw : fallbackStatus;
      const arr = byStatus.get(key) || [];
      arr.push(item);
      byStatus.set(key, arr);
    }
    return order.filter((s) => byStatus.has(s)).map((status) => ({ status, items: byStatus.get(status) }));
  }, [items, term]);
  const matchCount = reactExports.useMemo(() => groups.reduce((n, g) => n + g.items.length, 0), [groups]);
  return { search, setSearch, term, groups, matchCount };
}
const STATUS_ORDER$1 = ["watching", "completed", "plan_to_watch", "on_hold", "dropped"];
const SHELF_GRID$1 = "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5";
const DIALOG_GRID$1 = "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5";
function WatchlistTab({ watchlist, loading, isViewingOther, onNavigate }) {
  const items = reactExports.useMemo(() => watchlist || [], [watchlist]);
  const { search, setSearch, term, groups, matchCount } = useShelfSearch(
    items,
    STATUS_ORDER$1,
    (i) => i.status,
    (i) => i.anime_name,
    "plan_to_watch"
  );
  const renderCard = (item) => {
    const statusKey = String((item == null ? void 0 : item.status) || "plan_to_watch").trim().toLowerCase();
    const statusInfo = STATUS_LABELS[statusKey] ?? STATUS_LABELS.plan_to_watch;
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, scale: 0.95 },
        animate: { opacity: 1, scale: 1 },
        className: "group cursor-pointer relative",
        onClick: () => onNavigate(`/anime/${item.anime_id}`),
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-[3/4] rounded-2xl overflow-hidden mb-3 shadow-xl group-hover:shadow-primary/20 transition-all duration-300 ring-1 ring-white/10 group-hover:ring-primary/50", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: getProxiedImageUrl(item.anime_poster || "/placeholder.svg"),
                alt: item.anime_name,
                className: "w-full h-full object-cover group-hover:scale-110 transition-transform duration-700",
                loading: "lazy"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `absolute top-2 left-2 px-2 py-1.5 rounded-lg backdrop-blur-xl flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider ${statusInfo == null ? void 0 : statusInfo.bg} ${statusInfo == null ? void 0 : statusInfo.color} border border-white/10 shadow-lg`, children: [
              statusInfo == null ? void 0 : statusInfo.icon,
              statusInfo == null ? void 0 : statusInfo.label
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-sm line-clamp-1 group-hover:text-primary transition-colors px-1", children: item.anime_name })
        ]
      }
    );
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassPanel, { className: TAB_PANEL_CLASS, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-12 -right-12 w-48 h-48 bg-[hsl(var(--profile-accent)/0.10)] blur-[70px] rounded-full pointer-events-none" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-4 mb-6 flex-wrap", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(List, { className: "w-4 h-4 text-primary/80" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-base sm:text-lg text-foreground tracking-tight", children: isViewingOther ? "Watchlist" : "My Watchlist" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "px-3 py-1 rounded-full bg-white/[0.03] text-xs font-semibold text-muted-foreground border border-white/[0.05]", children: [
            items.length,
            " items"
          ] })
        ] }),
        items.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full sm:w-64", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/60" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              value: search,
              onChange: (e) => setSearch(e.target.value),
              placeholder: "Search watchlist…",
              className: "pl-9 rounded-full bg-white/[0.03] border-white/[0.08] h-10"
            }
          )
        ] })
      ] }),
      loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: SHELF_GRID$1, children: [...Array(5)].map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-[3/4] bg-white/[0.02] rounded-2xl animate-pulse" }, i)) }) : items.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-20 border border-dashed border-white/10 bg-white/[0.01] rounded-[2rem]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(List, { className: "w-16 h-16 mx-auto text-muted-foreground/30 mb-6" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-bold mb-2", children: isViewingOther ? "Watchlist is empty" : "Your watchlist is empty" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-8", children: isViewingOther ? "This user hasn't added any anime yet." : "Start adding anime to track your progress!" }),
        !isViewingOther && /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: () => onNavigate("/"), className: "rounded-full h-12 px-8 font-bold", children: "Browse Anime" })
      ] }) : term && matchCount === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-16 text-muted-foreground text-sm", children: [
        "No anime match “",
        search,
        "”."
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-10", children: groups.map((g) => {
        var _a;
        return /* @__PURE__ */ jsxRuntimeExports.jsx(
          ProfileShelf,
          {
            status: g.status,
            label: ((_a = STATUS_LABELS[g.status]) == null ? void 0 : _a.label) || g.status,
            items: g.items,
            getKey: (i) => i.id,
            getTitle: (i) => i.anime_name,
            renderCard,
            shelfGridClass: SHELF_GRID$1,
            dialogGridClass: DIALOG_GRID$1
          },
          g.status
        );
      }) })
    ] })
  ] });
}
const STATUS_ORDER = ["reading", "completed", "plan_to_read", "on_hold", "dropped"];
const SHELF_GRID = "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4";
const DIALOG_GRID = "grid grid-cols-1 sm:grid-cols-2 gap-4";
function MangaReadlistTab({ mangaReadlist, loading, isViewingOther, onNavigate }) {
  const items = reactExports.useMemo(() => mangaReadlist || [], [mangaReadlist]);
  const { search, setSearch, term, groups, matchCount } = useShelfSearch(
    items,
    STATUS_ORDER,
    (i) => i.status,
    (i) => i.manga_title,
    "plan_to_read"
  );
  const renderCard = (item, index) => {
    const statusKey = item.status || "plan_to_read";
    const status = MANGA_STATUS_LABELS[statusKey] || MANGA_STATUS_LABELS.plan_to_read;
    const accent = STATUS_ACCENT[statusKey] || STATUS_ACCENT.plan_to_read;
    const hasChapter = item.last_chapter_number != null;
    const chapterLabel = hasChapter ? `Chapter ${item.last_chapter_number}` : item.last_chapter_title || "Not started";
    const pageLabel = hasChapter ? `Page ${(Number(item.last_page_index) || 0) + 1}` : null;
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.button,
      {
        initial: { opacity: 0, y: 16 },
        animate: { opacity: 1, y: 0 },
        transition: { delay: Math.min(index * 0.04, 0.4), type: "spring", stiffness: 260, damping: 24 },
        whileHover: { y: -4 },
        whileTap: { scale: 0.985 },
        onClick: () => onNavigate(`/manga/${item.manga_id}`),
        className: "group relative flex gap-4 p-4 w-full text-left rounded-2xl border border-white/[0.06] bg-gradient-to-br from-white/[0.05] to-white/[0.01] overflow-hidden shadow-lg transition-colors duration-300 hover:border-white/20 hover:shadow-[0_16px_40px_-12px_rgba(0,0,0,0.6)]",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: cn(
                "absolute -left-10 -top-10 w-28 h-28 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500",
                accent.glow
              )
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("absolute left-0 top-0 h-full w-[3px]", accent.dot, "opacity-60") }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: cn(
                "relative w-[76px] h-[112px] shrink-0 rounded-xl overflow-hidden bg-white/[0.03] ring-1 ring-white/10 shadow-xl transition-all duration-300",
                accent.ring
              ),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "img",
                  {
                    src: getProxiedImageUrl(item.manga_poster || "/placeholder.svg"),
                    alt: item.manga_title,
                    className: "w-full h-full object-cover transition-transform duration-700 group-hover:scale-110",
                    loading: "lazy"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-70" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(BookMarked, { className: "absolute bottom-1.5 right-1.5 w-3.5 h-3.5 text-white/70 drop-shadow" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1 min-w-0 flex flex-col py-0.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 mb-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: cn("relative flex h-2 w-2", statusKey === "reading" && "animate-pulse"), children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: cn("inline-flex h-2 w-2 rounded-full", accent.dot) }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: cn("text-[10px] font-black uppercase tracking-widest", accent.text), children: status.label })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-[15px] leading-snug line-clamp-2 text-foreground/95 group-hover:text-primary transition-colors", children: item.manga_title }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-auto pt-3 flex items-end justify-between gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-1.5 rounded-lg bg-white/[0.05] border border-white/[0.06] px-2 py-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Layers, { className: "w-3 h-3 text-muted-foreground/70" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] font-semibold text-foreground/80 truncate", children: chapterLabel })
                ] }),
                pageLabel && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-semibold text-muted-foreground/50 mt-1.5 uppercase tracking-widest pl-0.5", children: pageLabel })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 text-[11px] font-bold text-primary opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 shrink-0", children: [
                hasChapter ? "Continue" : "Read",
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-3.5 h-3.5" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2.5 h-[2px] w-0 group-hover:w-full rounded-full bg-gradient-to-r from-[hsl(var(--profile-accent))] to-transparent transition-all duration-500" })
          ] })
        ]
      }
    );
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassPanel, { className: TAB_PANEL_CLASS, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-12 -right-12 w-48 h-48 bg-[hsl(var(--profile-accent)/0.10)] blur-[70px] rounded-full pointer-events-none" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-4 mb-6 flex-wrap", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-4 h-4 text-primary/80" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-base sm:text-lg text-foreground tracking-tight", children: isViewingOther ? "Manga Readlist" : "My Manga Readlist" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "px-3 py-1 rounded-full bg-white/[0.03] text-xs font-semibold text-muted-foreground border border-white/[0.05]", children: [
            items.length,
            " items"
          ] })
        ] }),
        items.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full sm:w-64", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/60" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              value: search,
              onChange: (e) => setSearch(e.target.value),
              placeholder: "Search readlist…",
              className: "pl-9 rounded-full bg-white/[0.03] border-white/[0.08] h-10"
            }
          )
        ] })
      ] }),
      loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: SHELF_GRID, children: [...Array(3)].map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-36 bg-white/[0.02] rounded-2xl animate-pulse" }, i)) }) : items.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-20 border border-dashed border-white/10 bg-white/[0.01] rounded-[2rem]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-16 h-16 mx-auto text-muted-foreground/30 mb-6" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-bold mb-2", children: isViewingOther ? "Readlist is empty" : "Your manga readlist is empty" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-8", children: isViewingOther ? "This user has not saved any manga yet." : "Save manga to your readlist from any manga details page." }),
        !isViewingOther && /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: () => onNavigate("/search"), className: "rounded-full h-12 px-8 font-bold", children: "Browse Manga" })
      ] }) : term && matchCount === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-16 text-muted-foreground text-sm", children: [
        "No manga match “",
        search,
        "”."
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-10", children: groups.map((g) => {
        var _a;
        return /* @__PURE__ */ jsxRuntimeExports.jsx(
          ProfileShelf,
          {
            status: g.status,
            label: ((_a = MANGA_STATUS_LABELS[g.status]) == null ? void 0 : _a.label) || g.status,
            items: g.items,
            getKey: (i) => i.id,
            getTitle: (i) => i.manga_title,
            renderCard,
            shelfGridClass: SHELF_GRID,
            dialogGridClass: DIALOG_GRID
          },
          g.status
        );
      }) })
    ] })
  ] });
}
const FILTERS = [
  { key: "all", label: "All", icon: LayoutGrid },
  { key: "anime", label: "Anime", icon: Play },
  { key: "manga", label: "Manga", icon: BookOpen }
];
function HistoryTab({ history, mangaHistoryEntries, loading, isViewingOther, onNavigate, formatDate }) {
  const [filter, setFilter] = reactExports.useState("all");
  const [search, setSearch] = reactExports.useState("");
  const term = search.trim().toLowerCase();
  const hasAnyAnime = ((history == null ? void 0 : history.length) || 0) > 0;
  const hasAnyManga = mangaHistoryEntries.length > 0;
  const animeFiltered = reactExports.useMemo(
    () => (history || []).filter((i) => !term || (i.anime_name || "").toLowerCase().includes(term)),
    [history, term]
  );
  const mangaFiltered = reactExports.useMemo(
    () => mangaHistoryEntries.filter((i) => !term || (i.manga_title || "").toLowerCase().includes(term)),
    [mangaHistoryEntries, term]
  );
  const showAnime = filter !== "manga" && animeFiltered.length > 0;
  const showManga = filter !== "anime" && mangaFiltered.length > 0;
  const nothingToShow = (hasAnyAnime || hasAnyManga) && !showAnime && !showManga;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassPanel, { className: TAB_PANEL_CLASS, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-12 -right-12 w-48 h-48 bg-[hsl(var(--profile-accent)/0.10)] blur-[70px] rounded-full pointer-events-none" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-4 mb-6 flex-wrap", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(History, { className: "w-4 h-4 text-primary/80" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-base sm:text-lg text-foreground tracking-tight", children: "Activity History" })
        ] }),
        (hasAnyAnime || hasAnyManga) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 flex-wrap w-full sm:w-auto", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-1 rounded-full bg-white/[0.03] border border-white/[0.08] p-1", children: FILTERS.map((f) => {
            const Icon = f.icon;
            const active = filter === f.key;
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: () => setFilter(f.key),
                className: cn(
                  "flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-bold transition-all",
                  active ? "bg-primary text-primary-foreground shadow-[0_0_20px_rgba(var(--primary),0.4)]" : "text-muted-foreground hover:text-foreground"
                ),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-3.5 h-3.5" }),
                  f.label
                ]
              },
              f.key
            );
          }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1 min-w-[8rem] sm:w-56 sm:flex-none", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/60" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                value: search,
                onChange: (e) => setSearch(e.target.value),
                placeholder: "Search history…",
                className: "pl-9 rounded-full bg-white/[0.03] border-white/[0.08] h-10"
              }
            )
          ] })
        ] })
      ] }),
      loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: [...Array(3)].map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-28 bg-white/[0.02] rounded-2xl animate-pulse" }, i)) }) : hasAnyAnime || hasAnyManga ? nothingToShow ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center py-16 text-muted-foreground text-sm", children: term ? `No history matches “${search}”.` : "Nothing in this filter." }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-10", children: [
        showAnime && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 flex items-center gap-2 px-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "w-4 h-4 text-primary" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-black uppercase tracking-widest text-muted-foreground", children: "Anime Watching" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: (() => {
            const groupedHistory = {};
            animeFiltered.forEach((item) => {
              if (!groupedHistory[item.anime_id]) groupedHistory[item.anime_id] = [];
              groupedHistory[item.anime_id].push(item);
            });
            return Object.entries(groupedHistory).sort(([, a], [, b]) => new Date(b[0].watched_at).getTime() - new Date(a[0].watched_at).getTime()).map(([animeId, episodes], index) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0, y: 20 },
                animate: { opacity: 1, y: 0 },
                transition: { delay: index * 0.05 },
                className: "bg-white/[0.02] rounded-2xl border border-white/[0.05] overflow-hidden shadow-lg",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-5 p-5 items-center border-b border-white/[0.05] bg-white/[0.01]", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-20 rounded-xl overflow-hidden flex-shrink-0 shadow-inner", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "img",
                      {
                        src: getProxiedImageUrl(episodes[0].anime_poster || "/placeholder.svg"),
                        alt: episodes[0].anime_name,
                        className: "w-full h-full object-cover"
                      }
                    ) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-lg line-clamp-1 mb-1", children: episodes[0].anime_name }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider", children: [
                        episodes.length,
                        " episodes watched"
                      ] })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divide-y divide-white/[0.05]", children: episodes.sort((a, b) => new Date(b.watched_at).getTime() - new Date(a.watched_at).getTime()).map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      className: "flex items-center gap-4 p-4 hover:bg-white/[0.04] transition-colors cursor-pointer group",
                      onClick: () => onNavigate(`/watch/${encodeURIComponent(item.episode_id)}`),
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-black text-sm shadow-inner", children: item.episode_number }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-bold", children: [
                              "Episode ",
                              item.episode_number
                            ] }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground/50", children: "•" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[11px] font-medium text-muted-foreground flex items-center gap-1", children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3 h-3" }),
                              formatDate(item.watched_at)
                            ] })
                          ] }),
                          item.duration_seconds && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-32 h-1.5 bg-white/10 rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "div",
                            {
                              className: "h-full bg-primary",
                              style: { width: `${Math.min(100, (item.progress_seconds || 0) / item.duration_seconds * 100)}%` }
                            }
                          ) })
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" })
                      ]
                    },
                    item.id
                  )) })
                ]
              },
              animeId
            ));
          })() })
        ] }),
        showManga && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 flex items-center gap-2 px-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-4 h-4 text-primary" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-black uppercase tracking-widest text-muted-foreground", children: "Manga Reading" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: mangaFiltered.map((item, index) => {
            const status = MANGA_STATUS_LABELS[item.status || "plan_to_read"] || MANGA_STATUS_LABELS.plan_to_read;
            const chapterLabel = item.last_chapter_number != null ? `Chapter ${item.last_chapter_number}` : item.last_chapter_title || "Reading progress updated";
            const chapterKey = String(item.last_chapter_key || "").trim();
            const nextPage = Math.max(0, Number(item.last_page_index || 0));
            return /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.button,
              {
                initial: { opacity: 0, y: 10 },
                animate: { opacity: 1, y: 0 },
                transition: { delay: index * 0.03 },
                className: "w-full text-left rounded-2xl border border-white/[0.05] bg-white/[0.02] p-4 hover:bg-white/[0.04] transition-colors shadow-lg group",
                onClick: () => {
                  if (chapterKey) {
                    onNavigate(`/manga/read/${item.manga_id}?chapterKey=${encodeURIComponent(chapterKey)}&page=${nextPage}`);
                    return;
                  }
                  onNavigate(`/manga/${item.manga_id}`);
                },
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-16 rounded-xl overflow-hidden bg-white/[0.02] flex-shrink-0 shadow-inner", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "img",
                    {
                      src: getProxiedImageUrl(item.manga_poster || "/placeholder.svg"),
                      alt: item.manga_title,
                      className: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-500",
                      loading: "lazy"
                    }
                  ) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold line-clamp-1 group-hover:text-primary transition-colors", children: item.manga_title }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `rounded-md px-1.5 py-0.5 text-[9px] font-black uppercase tracking-wider ${status.bg} ${status.color}`, children: status.label })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-muted-foreground mt-0.5 line-clamp-1", children: chapterLabel }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-semibold text-muted-foreground/50 mt-1.5 uppercase tracking-widest", children: formatDistanceToNow(new Date(item.updated_at), { addSuffix: true }) })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" })
                ] })
              },
              `manga-history-${item.id}`
            );
          }) })
        ] })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-20 border border-dashed border-white/10 bg-white/[0.01] rounded-[2rem]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(History, { className: "w-16 h-16 mx-auto text-muted-foreground/30 mb-6" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-bold mb-2", children: "No activity history" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-8", children: isViewingOther ? "This user has no watch or manga activity yet." : "Your anime and manga activity will appear here." }),
        !isViewingOther && /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: () => onNavigate("/"), className: "rounded-full h-12 px-8 font-bold", children: "Start Watching" })
      ] })
    ] })
  ] });
}
function toFeedPost(p) {
  const metadata = p.metadata || {};
  const images = Array.isArray(metadata.images) && metadata.images.length ? metadata.images : p.image_url ? [p.image_url] : null;
  return {
    ...p,
    poll: null,
    gif_url: metadata.gif_url || null,
    images,
    watch_room_id: metadata.watch_room_id || null,
    quoted_post_id: metadata.quoted_post_id || null,
    media_type: metadata.media_type || (p.anime_id ? "anime" : null),
    repost_count: 0,
    reposted: false,
    bookmarked: false,
    badges: [],
    author_rank_score: 0,
    author_is_official: false,
    news_source: metadata.source || null
  };
}
function SectionHeader({
  icon,
  label,
  subtitle,
  count
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3 mb-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5 min-w-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-1.5 rounded-lg border border-white/[0.05] bg-primary/10 text-primary shrink-0", children: icon }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-display font-bold text-base text-foreground tracking-tight leading-tight", children: label }),
        subtitle && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground/70 font-medium truncate", children: subtitle })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "shrink-0 px-2.5 py-1 rounded-full bg-white/[0.04] text-[11px] font-bold tabular-nums text-muted-foreground border border-white/[0.05]", children: count })
  ] });
}
function StatChip({ icon, label, count }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 rounded-2xl border border-white/[0.05] bg-white/[0.02] px-3.5 py-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary/80", children: icon }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lg font-black tabular-nums text-foreground leading-none", children: count }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] font-semibold uppercase tracking-wider text-muted-foreground", children: label })
  ] });
}
function VaultTab({ userId, isViewingOther, onNavigate }) {
  const { data: posts = [], isLoading: loadingPosts } = useUserForumPosts(userId);
  const { comments, isLoading: loadingComments } = useUserCommentsDetailed(userId);
  const { data: playlists = [], isLoading: loadingPlaylists } = useUserPlaylists(userId);
  const { data: tierLists = [], isLoading: loadingTierLists } = useUserTierLists(userId);
  const publicTierLists = (tierLists || []).filter((t) => t.is_public);
  const loading = loadingPosts || loadingComments || loadingPlaylists || loadingTierLists;
  const isEmpty = posts.length === 0 && comments.length === 0 && playlists.length === 0 && publicTierLists.length === 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassPanel, { className: TAB_PANEL_CLASS, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-12 -right-12 w-48 h-48 bg-[hsl(var(--profile-accent)/0.10)] blur-[70px] rounded-full pointer-events-none" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center justify-between gap-4 mb-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Library, { className: "w-4 h-4 text-primary/80" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-base sm:text-lg text-foreground tracking-tight", children: isViewingOther ? "User's Vault" : "My Vault" })
        ] }),
        !loading && !isEmpty && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2", children: [
          posts.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(StatChip, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-4 h-4" }), label: "Posts", count: posts.length }),
          comments.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(StatChip, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "w-4 h-4" }), label: "Comments", count: comments.length }),
          playlists.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(StatChip, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ListMusic, { className: "w-4 h-4" }), label: "Playlists", count: playlists.length }),
          publicTierLists.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(StatChip, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "w-4 h-4" }), label: "Tiers", count: publicTierLists.length })
        ] })
      ] }),
      loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center py-16 text-muted-foreground font-medium", children: "Loading vault…" }) : isEmpty ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-20 border border-dashed border-white/10 bg-white/[0.01] rounded-[2rem]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Library, { className: "w-16 h-16 mx-auto text-muted-foreground/30 mb-6" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-bold mb-2", children: "Nothing in the vault yet" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: isViewingOther ? "This user hasn't shared posts, comments, playlists or tier lists yet." : "Your posts, comments, playlists and tier lists will collect here." })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-10", children: [
        posts.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            SectionHeader,
            {
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-4 h-4" }),
              label: "Posts",
              subtitle: isViewingOther ? "Shared threads" : "Threads you've shared",
              count: posts.length
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "columns-1 lg:columns-2 gap-4 [column-fill:_balance]", children: posts.map((post) => {
            const pending = post.is_approved === false;
            return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 break-inside-avoid", children: [
              pending && !isViewingOther && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Badge,
                {
                  variant: "secondary",
                  className: "mb-2 gap-1.5 text-[10px] font-black tracking-wider uppercase bg-amber-500/10 text-amber-500 border-amber-500/20 rounded-full",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-3 h-3" }),
                    "Pending review"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(PostCard, { post: toFeedPost(post) })
            ] }, post.id);
          }) })
        ] }),
        comments.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            SectionHeader,
            {
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "w-4 h-4" }),
              label: "Comments",
              subtitle: "Where you've joined the conversation",
              count: comments.length
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-3", children: comments.map((c, idx) => {
            const disabled = c.target === "#";
            const go = () => !disabled && (onNavigate == null ? void 0 : onNavigate(c.target));
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0, y: 8 },
                whileInView: { opacity: 1, y: 0 },
                viewport: { once: true, margin: "-40px" },
                transition: { duration: 0.25, delay: Math.min(idx * 0.03, 0.3) },
                role: disabled ? void 0 : "link",
                tabIndex: disabled ? void 0 : 0,
                onClick: go,
                onKeyDown: (e) => (e.key === "Enter" || e.key === " ") && go(),
                className: cn(
                  "group p-4 rounded-xl border border-white/[0.04] bg-white/[0.02] transition-all duration-200",
                  disabled ? "opacity-90" : "cursor-pointer hover:bg-white/[0.05] hover:border-primary/30 focus:outline-none focus:ring-2 focus:ring-primary/40"
                ),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1.5 flex-wrap", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[11px] font-bold uppercase tracking-wider text-primary/80 line-clamp-1", children: [
                      "on ",
                      c.title
                    ] }),
                    c.hasEpisode && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Badge,
                      {
                        variant: "secondary",
                        className: "gap-1 text-[9px] font-black tracking-wider uppercase bg-sky-500/10 text-sky-300 border-sky-500/20 rounded-full py-0",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Clapperboard, { className: "w-2.5 h-2.5" }),
                          "Episode"
                        ]
                      }
                    ),
                    c.is_spoiler && /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Badge,
                      {
                        variant: "secondary",
                        className: "text-[9px] font-black tracking-wider uppercase bg-rose-500/10 text-rose-300 border-rose-500/20 rounded-full py-0",
                        children: "Spoiler"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-auto uppercase tracking-widest text-[10px] font-semibold text-muted-foreground/60 whitespace-nowrap", children: formatDistanceToNow(new Date(c.created_at), { addSuffix: true }) })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn(c.is_spoiler && "blur-[5px] group-hover:blur-none transition-all select-none"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    CommentContent,
                    {
                      content: c.content,
                      className: "text-sm text-foreground/80 leading-relaxed line-clamp-3 group-hover:text-foreground transition-colors"
                    }
                  ) })
                ]
              },
              c.id
            );
          }) })
        ] }),
        playlists.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            SectionHeader,
            {
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ListMusic, { className: "w-4 h-4" }),
              label: "Playlists",
              subtitle: "Public playlists",
              count: playlists.length
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4", children: playlists.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx(PlaylistCard, { playlist: p, showActions: false }, p.id)) })
        ] }),
        publicTierLists.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            SectionHeader,
            {
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "w-4 h-4" }),
              label: "Tier Lists",
              subtitle: "Public tier lists",
              count: publicTierLists.length
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-5", children: publicTierLists.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx(TierListCard, { tierList: t, showAuthor: false }, t.id)) })
        ] })
      ] })
    ] })
  ] });
}
const ROOT_CLASS = "fixed inset-0 -z-10 pointer-events-none overflow-hidden";
function ProfileBackgroundEffects({ effect }) {
  const reduce = useReducedMotion();
  const isMobile = useIsMobile();
  if (effect === "none") return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      className: ROOT_CLASS,
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      transition: { duration: 0.8, ease: "easeOut" },
      children: [
        effect === "sakura" && /* @__PURE__ */ jsxRuntimeExports.jsx(SakuraLayer, { reduce: !!reduce, isMobile }),
        effect === "rain" && /* @__PURE__ */ jsxRuntimeExports.jsx(RainLayer, { reduce: !!reduce, isMobile }),
        effect === "blackhole" && /* @__PURE__ */ jsxRuntimeExports.jsx(BlackholeLayer, { reduce: !!reduce }),
        effect === "pitch" && /* @__PURE__ */ jsxRuntimeExports.jsx(PitchLayer, {}),
        effect === "sky" && /* @__PURE__ */ jsxRuntimeExports.jsx(SkyLayer, { reduce: !!reduce })
      ]
    },
    effect
  ) });
}
function SakuraLayer({ reduce, isMobile }) {
  const count = isMobile ? 12 : 24;
  const petals = reactExports.useMemo(
    () => Array.from({ length: count }).map((_, i) => {
      const size = 8 + Math.random() * 10;
      return {
        id: i,
        left: Math.random() * 100,
        size,
        duration: 8 + Math.random() * 10,
        delay: Math.random() * 12,
        drift: `${(Math.random() * 2 - 1) * 120}px`,
        spin: `${Math.random() > 0.5 ? 360 : -360}deg`,
        opacity: 0.4 + Math.random() * 0.5
      };
    }),
    [count]
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-pink-500/[0.04] via-transparent to-transparent" }),
    !reduce && petals.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "span",
      {
        className: "absolute top-0 rounded-full bg-pink-200/70 shadow-[0_0_6px_rgba(251,207,232,0.4)]",
        style: {
          left: `${p.left}%`,
          width: p.size,
          height: p.size * 0.7,
          opacity: p.opacity,
          borderRadius: "100% 0 100% 0",
          animation: `petal-fall ${p.duration}s linear ${p.delay}s infinite`,
          ["--petal-drift"]: p.drift,
          ["--petal-spin"]: p.spin,
          willChange: "transform"
        }
      },
      p.id
    ))
  ] });
}
function RainLayer({ reduce, isMobile }) {
  const count = isMobile ? 30 : 60;
  const drops = reactExports.useMemo(
    () => Array.from({ length: count }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      height: 40 + Math.random() * 60,
      duration: 0.6 + Math.random() * 0.8,
      delay: Math.random() * 3,
      opacity: 0.15 + Math.random() * 0.35
    })),
    [count]
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-slate-500/[0.06] via-transparent to-slate-900/[0.08]" }),
    !reduce && drops.map((d) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "span",
      {
        className: "absolute top-0 w-px bg-gradient-to-b from-transparent via-sky-200/60 to-transparent",
        style: {
          left: `${d.left}%`,
          height: d.height,
          opacity: d.opacity,
          animation: `rain-fall ${d.duration}s linear ${d.delay}s infinite`,
          willChange: "transform"
        }
      },
      d.id
    ))
  ] });
}
function BlackholeLayer({ reduce }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "absolute inset-0",
        style: {
          background: "radial-gradient(circle at 50% 45%, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.75) 30%, hsl(var(--background)) 70%)"
        }
      }
    ),
    !reduce && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "absolute left-1/2 top-[45%] hidden h-[90vw] w-[90vw] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40 blur-2xl md:block",
        style: {
          background: "conic-gradient(from 0deg, transparent, hsl(var(--profile-accent) / 0.5), transparent 40%, hsl(var(--profile-accent) / 0.3), transparent 80%)",
          animation: "profile-blackhole-spin 24s linear infinite",
          willChange: "transform"
        }
      }
    ),
    !reduce && /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        className: "absolute left-1/2 top-[45%] h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl",
        style: { background: "hsl(var(--profile-accent) / 0.35)" },
        animate: { scale: [1, 0.4, 1], opacity: [0.5, 0.2, 0.5] },
        transition: { duration: 6, repeat: Infinity, ease: "easeInOut" }
      }
    ) })
  ] });
}
function PitchLayer() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "absolute inset-0",
      style: {
        background: "radial-gradient(ellipse 80% 80% at 50% 40%, rgba(0,0,0,0.6) 0%, #000 60%, #000 100%)"
      }
    }
  );
}
function SkyLayer({ reduce }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "absolute inset-0",
        style: {
          background: "linear-gradient(135deg, hsl(217 60% 12%) 0%, hsl(262 45% 16%) 35%, hsl(199 55% 14%) 70%, hsl(240 30% 8%) 100%)",
          backgroundSize: "300% 300%",
          animation: reduce ? void 0 : "profile-sky-drift 30s ease-in-out infinite"
        }
      }
    ),
    !reduce && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          className: "absolute left-[10%] top-[20%] h-64 w-64 rounded-full blur-3xl",
          style: { background: "hsl(var(--profile-accent) / 0.18)" },
          animate: { x: [0, 40, 0], y: [0, 20, 0] },
          transition: { duration: 18, repeat: Infinity, ease: "easeInOut" }
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          className: "absolute right-[8%] top-[50%] h-72 w-72 rounded-full bg-sky-400/10 blur-3xl",
          animate: { x: [0, -50, 0], y: [0, -25, 0] },
          transition: { duration: 22, repeat: Infinity, ease: "easeInOut" }
        }
      )
    ] })
  ] });
}
function useUserRatings(userId) {
  return useQuery({
    queryKey: ["user_ratings", userId],
    queryFn: async () => {
      if (!userId) return [];
      const { data, error } = await supabase.from("ratings").select("anime_id, rating, review, created_at").eq("user_id", userId);
      if (error) throw error;
      return data || [];
    },
    enabled: !!userId,
    staleTime: 5 * 60 * 1e3
  });
}
function useUserComments(userId) {
  return useQuery({
    queryKey: ["user_comments_rows", userId],
    queryFn: async () => {
      if (!userId) return [];
      const { data, error } = await supabase.from("comments").select("created_at").eq("user_id", userId);
      if (error) throw error;
      return data || [];
    },
    enabled: !!userId,
    staleTime: 5 * 60 * 1e3
  });
}
function useTasteProfile(enabled = true) {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["taste_profile", user == null ? void 0 : user.id],
    queryFn: async () => {
      if (!user) return null;
      const { data, error } = await supabase.from("user_taste_profiles").select("profile, sample_size, updated_at").eq("user_id", user.id).maybeSingle();
      if (error) {
        return null;
      }
      const profile = data == null ? void 0 : data.profile;
      return profile || null;
    },
    enabled: enabled && !!user,
    staleTime: 15 * 60 * 1e3
  });
}
function deriveInsights(ctx = {}) {
  const out = [];
  const { distribution, habits, ratings, growth, topGenre, currentStreak = 0, longestStreak = 0 } = ctx;
  if (topGenre) {
    out.push({ id: "top-genre", text: `${topGenre} is your most-watched genre.` });
  }
  if ((habits == null ? void 0 : habits.mostActiveDay) && habits.totalEvents >= 5) {
    out.push({ id: "active-day", text: `Your activity peaks on ${habits.mostActiveDay}s.` });
  }
  if ((habits == null ? void 0 : habits.peakHourLabel) && habits.totalEvents >= 5) {
    out.push({ id: "peak-hour", text: `You watch most between ${habits.peakHourLabel}.` });
  }
  if (distribution && distribution.animeCounts.completed >= 1) {
    out.push({
      id: "completed",
      text: `You've completed ${distribution.animeCounts.completed} ${distribution.animeCounts.completed === 1 ? "series" : "series"}.`
    });
  }
  if (longestStreak >= 3) {
    out.push({ id: "longest-streak", text: `Your longest watching streak is ${longestStreak} days.` });
  }
  if (currentStreak >= 3) {
    out.push({ id: "current-streak", text: `You're on a ${currentStreak}-day streak right now.` });
  }
  if (ratings && ratings.total >= 5) {
    out.push({
      id: "avg-rating",
      text: `You rate titles ${ratings.average.toFixed(1)}/10 on average.`
    });
  }
  if (growth && growth.monthly.length >= 2) {
    const last = growth.monthly[growth.monthly.length - 1];
    const prev = growth.monthly[growth.monthly.length - 2];
    if (prev.episodes >= 3 && last.episodes >= 1) {
      const delta = Math.round((last.episodes - prev.episodes) / prev.episodes * 100);
      if (Math.abs(delta) >= 15) {
        out.push({
          id: "month-delta",
          text: delta > 0 ? `You watched ${delta}% more this month than last.` : `You watched ${Math.abs(delta)}% less this month than last.`
        });
      }
    }
  }
  return out;
}
const DiscordIcon = () => /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-5 h-5", viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z" }) });
const TwitterIcon = () => /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-5 h-5", viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" }) });
const InstagramIcon = () => /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-5 h-5", viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" }) });
const MALIcon = () => /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-5 h-5", viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M8.273 7.247v8.423l-2.103-.003v-5.216l-2.03 2.404-1.989-2.458-.02 5.285H.001L0 7.247h2.203l1.865 2.545 2.015-2.546 2.19.001zm8.628 2.069l.025 6.335h-2.099l-.025-3.996h-1.073v3.997H11.57V9.316h5.33v.001zM24 7.247v2.064h-1.5v6.358h-2.115V9.311h-1.2V7.247z" }) });
const AniListIcon = () => /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-5 h-5", viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M6.361 2.943L0 21.056h4.942l1.077-3.133H11.4l1.052 3.133H22.9c.71 0 1.1-.392 1.1-1.101V17.53c0-.71-.39-1.101-1.1-1.101h-6.483V4.045c0-.71-.392-1.102-1.101-1.102h-2.422c-.71 0-1.101.392-1.101 1.102v1.064L6.36 2.943zm2.324 11.587l1.569-4.887 1.569 4.887H8.685z" }) });
const YouTubeIcon = () => /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-5 h-5", viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" }) });
const TwitchIcon = () => /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-5 h-5", viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714z" }) });
const SOCIAL_PLATFORMS = [
  { key: "discord", label: "Discord", icon: DiscordIcon, placeholder: "discord.gg/invite", color: "#5865F2" },
  { key: "twitter", label: "X (Twitter)", icon: TwitterIcon, placeholder: "@username or x.com/username", color: "#000000" },
  { key: "instagram", label: "Instagram", icon: InstagramIcon, placeholder: "@username or instagram.com/username", color: "#E4405F" },
  { key: "mal", label: "MyAnimeList", icon: MALIcon, placeholder: "myanimelist.net/profile/username", color: "#2E51A2" },
  { key: "anilist", label: "AniList", icon: AniListIcon, placeholder: "anilist.co/user/username", color: "#02A9FF" },
  { key: "youtube", label: "YouTube", icon: YouTubeIcon, placeholder: "@channel or youtube.com/@channel", color: "#FF0000" },
  { key: "twitch", label: "Twitch", icon: TwitchIcon, placeholder: "twitch.tv/username", color: "#9146FF" }
];
function SocialLinksEditor({
  currentLinks = {},
  isPublic = false,
  showWatchlist = true,
  showHistory = true,
  trigger
}) {
  const { user, refreshProfile } = useAuth();
  const [open, setOpen] = reactExports.useState(false);
  const [links, setLinks] = reactExports.useState(currentLinks);
  const [privacy, setPrivacy] = reactExports.useState({
    isPublic,
    showWatchlist,
    showHistory
  });
  const [isSaving, setIsSaving] = reactExports.useState(false);
  reactExports.useEffect(() => {
    setLinks(currentLinks);
    setPrivacy({ isPublic, showWatchlist, showHistory });
  }, [currentLinks, isPublic, showWatchlist, showHistory]);
  const handleSave = async () => {
    if (!user) return;
    setIsSaving(true);
    try {
      const { error } = await supabase.from("profiles").update({
        social_links: links,
        is_public: privacy.isPublic,
        show_watchlist: privacy.showWatchlist,
        show_history: privacy.showHistory
      }).eq("user_id", user.id);
      if (error) throw error;
      await refreshProfile();
      ue.success("Profile settings saved!");
      setOpen(false);
    } catch (error) {
      ue.error(`Failed to save: ${error.message}`);
    } finally {
      setIsSaving(false);
    }
  };
  const updateLink = (key, value) => {
    setLinks((prev) => ({ ...prev, [key]: value }));
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Dialog, { open, onOpenChange: setOpen, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTrigger, { asChild: true, children: trigger || /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", className: "gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Share2, { className: "w-4 h-4" }),
      "Edit Social Links"
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-lg max-h-[85vh] overflow-y-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Share2, { className: "w-5 h-5 text-primary" }),
        "Profile Settings & Social Links"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 py-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 p-4 rounded-xl bg-muted/30 border border-white/5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-semibold flex items-center gap-2", children: [
            privacy.isPublic ? /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { className: "w-4 h-4 text-green-500" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-4 h-4 text-amber-500" }),
            "Privacy Settings"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "font-medium", children: "Public Profile" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Allow others to view your profile via @username" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Switch,
                {
                  checked: privacy.isPublic,
                  onCheckedChange: (checked) => setPrivacy((p) => ({ ...p, isPublic: checked }))
                }
              )
            ] }),
            privacy.isPublic && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0, height: 0 },
                animate: { opacity: 1, height: "auto" },
                className: "space-y-3 pl-4 border-l-2 border-primary/30",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { className: "font-medium flex items-center gap-2", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-3 h-3" }),
                        "Show Watchlist"
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Display your anime watchlist publicly" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Switch,
                      {
                        checked: privacy.showWatchlist,
                        onCheckedChange: (checked) => setPrivacy((p) => ({ ...p, showWatchlist: checked }))
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { className: "font-medium flex items-center gap-2", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-3 h-3" }),
                        "Show Watch History"
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Display your watch history publicly" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Switch,
                      {
                        checked: privacy.showHistory,
                        onCheckedChange: (checked) => setPrivacy((p) => ({ ...p, showHistory: checked }))
                      }
                    )
                  ] })
                ]
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-semibold flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Share2, { className: "w-4 h-4 text-primary" }),
            "Social Links"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Add your social profiles to connect with other anime fans." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: SOCIAL_PLATFORMS.map((platform) => {
            const Icon = platform.icon;
            return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0",
                  style: { backgroundColor: `${platform.color}20`, color: platform.color },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, {})
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  value: links[platform.key] || "",
                  onChange: (e) => updateLink(platform.key, e.target.value),
                  placeholder: platform.placeholder,
                  className: "flex-1 bg-background/50"
                }
              )
            ] }, platform.key);
          }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: handleSave, disabled: isSaving, className: "w-full gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "w-4 h-4" }),
          isSaving ? "Saving..." : "Save Settings"
        ] })
      ] })
    ] })
  ] });
}
function SocialLinksDisplay({ links }) {
  if (!links) return null;
  const activeLinks = SOCIAL_PLATFORMS.filter((p) => links[p.key]);
  if (activeLinks.length === 0) return null;
  const formatLink = (platform, value) => {
    if (value.startsWith("http")) return value;
    switch (platform.key) {
      case "discord":
        if (value.includes("discord.gg")) return `https://discord.gg/${value}`;
        return null;
      // Discord usernames aren't linkable
      case "twitter":
        if (value.startsWith("@")) value = value.slice(1);
        return `https://x.com/${value}`;
      case "instagram":
        if (value.startsWith("@")) value = value.slice(1);
        return `https://instagram.com/${value}`;
      case "mal":
        if (value.includes("myanimelist.net")) return `https://${value}`;
        return `https://myanimelist.net/profile/${value}`;
      case "anilist":
        if (value.includes("anilist.co")) return `https://${value}`;
        return `https://anilist.co/user/${value}`;
      case "youtube":
        if (value.startsWith("@")) return `https://youtube.com/${value}`;
        if (value.includes("youtube.com")) return `https://${value}`;
        return `https://youtube.com/@${value}`;
      case "twitch":
        if (value.includes("twitch.tv")) return `https://${value}`;
        return `https://twitch.tv/${value}`;
      default:
        return null;
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: activeLinks.map((platform) => {
    const Icon = platform.icon;
    const value = links[platform.key];
    const url = formatLink(platform, value);
    return url ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      "a",
      {
        href: url,
        target: "_blank",
        rel: "noopener noreferrer",
        className: "w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110 hover:shadow-lg",
        style: {
          backgroundColor: `${platform.color}20`,
          color: platform.color
        },
        title: platform.label,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, {})
      },
      platform.key
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "w-10 h-10 rounded-lg flex items-center justify-center cursor-default",
        style: {
          backgroundColor: `${platform.color}20`,
          color: platform.color
        },
        title: `${platform.label}: ${value}`,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, {})
      },
      platform.key
    );
  }) });
}
const MANGA_READING_ONLY_STATUSES = ["reading"];
function ProfilePage() {
  var _a, _b;
  const navigate = useNavigate();
  const { username: usernameParam, atUsername, slug } = useParams();
  const { user, profile: ownProfile, signOut, refreshProfile, isAdmin } = useAuth();
  useIsNativeApp();
  const isDesktopApp = useIsDesktopApp();
  useIsMobileApp();
  const isMobile = useIsMobile();
  const showSidebar = !isMobile;
  useNotifications();
  const viewingUsername = usernameParam || ((atUsername == null ? void 0 : atUsername.startsWith("@")) ? atUsername.slice(1) : atUsername) || ((slug == null ? void 0 : slug.startsWith("@")) ? slug.slice(1) : void 0);
  const isViewingOther = !!viewingUsername && viewingUsername !== (ownProfile == null ? void 0 : ownProfile.username);
  const { stats: externalStats, isLoading: externalStatsLoading } = useExternalStats(
    ownProfile,
    !isViewingOther
  );
  const { data: publicProfile, isLoading: loadingPublicProfile, error: publicProfileError } = usePublicProfile(viewingUsername || "");
  const profile = isViewingOther ? publicProfile : ownProfile;
  const { ambientColor, backgroundEffect } = readProfileCustomization(profile);
  const { data: ownWatchlist, isLoading: loadingOwnWatchlist } = useWatchlist();
  const { data: ownHistory, isLoading: loadingOwnHistory } = useWatchHistory();
  const { data: ownMangaReadlist = [], isLoading: loadingOwnMangaReadlist } = useMangaReadlist();
  const { data: ownMangaReadingHistory = [], isLoading: loadingOwnMangaReadingHistory } = useMangaReadlist(MANGA_READING_ONLY_STATUSES);
  const { data: publicWatchlist = [], isLoading: loadingPublicWatchlist } = usePublicWatchlist(
    publicProfile == null ? void 0 : publicProfile.user_id,
    (publicProfile == null ? void 0 : publicProfile.is_public) ?? false,
    (publicProfile == null ? void 0 : publicProfile.show_watchlist) ?? true
  );
  const { data: publicHistory = [], isLoading: loadingPublicHistory } = usePublicWatchHistory(
    publicProfile == null ? void 0 : publicProfile.user_id,
    (publicProfile == null ? void 0 : publicProfile.is_public) ?? false,
    (publicProfile == null ? void 0 : publicProfile.show_history) ?? true
  );
  const { data: publicMangaReadlist = [], isLoading: loadingPublicMangaReadlist } = usePublicMangaReadlist(
    publicProfile == null ? void 0 : publicProfile.user_id,
    (publicProfile == null ? void 0 : publicProfile.is_public) ?? false,
    (publicProfile == null ? void 0 : publicProfile.show_watchlist) ?? true
  );
  const { data: publicMangaReadingHistory = [], isLoading: loadingPublicMangaReadingHistory } = usePublicMangaReadlist(
    publicProfile == null ? void 0 : publicProfile.user_id,
    (publicProfile == null ? void 0 : publicProfile.is_public) ?? false,
    (publicProfile == null ? void 0 : publicProfile.show_history) ?? true,
    MANGA_READING_ONLY_STATUSES
  );
  const { data: ownReadingTotals } = useReadingTrackTotals();
  const { data: publicReadingTotals } = usePublicReadingTrackTotals(
    publicProfile == null ? void 0 : publicProfile.user_id,
    (publicProfile == null ? void 0 : publicProfile.is_public) ?? false,
    (publicProfile == null ? void 0 : publicProfile.show_watchlist) ?? true
  );
  const readingTotals = isViewingOther ? publicReadingTotals : ownReadingTotals;
  const { data: forumPosts = [] } = useUserForumPosts(profile == null ? void 0 : profile.user_id);
  const { isFollowing, checkingFollow, followStats, follow, unfollow, isFollowingLoading } = useFollow(profile == null ? void 0 : profile.user_id);
  const { data: userRatings = [] } = useUserRatings(profile == null ? void 0 : profile.user_id);
  const { data: userCommentRows = [] } = useUserComments(profile == null ? void 0 : profile.user_id);
  const { data: favoriteCharacters = [], isLoading: loadingFavoriteCharacters } = useCharacterFavorites(profile == null ? void 0 : profile.user_id);
  const { data: tasteProfile = null, isLoading: loadingTasteProfile } = useTasteProfile(!isViewingOther);
  const { data: userRank = null } = useUserRank("active", profile == null ? void 0 : profile.user_id);
  const watchlist = isViewingOther ? publicWatchlist : ownWatchlist;
  const history = isViewingOther ? publicHistory : ownHistory;
  const mangaReadlist = isViewingOther ? publicMangaReadlist : ownMangaReadlist;
  const mangaHistorySource = isViewingOther ? publicMangaReadingHistory : ownMangaReadingHistory;
  const loadingWatchlist = isViewingOther ? loadingPublicWatchlist : loadingOwnWatchlist;
  const loadingHistory = isViewingOther ? loadingPublicHistory : loadingOwnHistory;
  const loadingMangaReadlist = isViewingOther ? loadingPublicMangaReadlist : loadingOwnMangaReadlist;
  const loadingMangaHistory = isViewingOther ? loadingPublicMangaReadingHistory : loadingOwnMangaReadingHistory;
  const loadingCombinedHistory = loadingHistory || loadingMangaHistory;
  const computedWatchTimeSeconds = reactExports.useMemo(() => {
    if (!history || history.length === 0) return 0;
    return history.reduce((total, item) => {
      const progressSeconds = Number(item == null ? void 0 : item.progress_seconds);
      if (Number.isFinite(progressSeconds) && progressSeconds > 0) return total + progressSeconds;
      const durationSeconds = Number(item == null ? void 0 : item.duration_seconds);
      if (Number.isFinite(durationSeconds) && durationSeconds > 0) return total + durationSeconds;
      return total;
    }, 0);
  }, [history]);
  const mangaHistoryEntries = reactExports.useMemo(() => {
    return [...mangaHistorySource || []].filter((entry) => {
      if (!entry) return false;
      const status = String(entry.status || "").trim().toLowerCase();
      if (status !== "reading") return false;
      return Boolean(
        entry.last_chapter_key || entry.last_chapter_number != null || entry.last_chapter_title && String(entry.last_chapter_title).trim().length > 0
      );
    }).sort((left, right) => new Date((right == null ? void 0 : right.updated_at) || 0).getTime() - new Date((left == null ? void 0 : left.updated_at) || 0).getTime());
  }, [mangaHistorySource]);
  Boolean(history && history.length > 0);
  mangaHistoryEntries.length > 0;
  const effectiveEpisodeCount = (history == null ? void 0 : history.length) || 0;
  const profileRankScore = computeRankScore({
    episodes: effectiveEpisodeCount,
    manga: (readingTotals == null ? void 0 : readingTotals.manga) ?? 0,
    manhwa: (readingTotals == null ? void 0 : readingTotals.manhwa) ?? 0,
    comic: (readingTotals == null ? void 0 : readingTotals.comic) ?? 0
  });
  const showWatchlistTab = !isViewingOther || (publicProfile == null ? void 0 : publicProfile.is_public) && (publicProfile == null ? void 0 : publicProfile.show_watchlist) !== false;
  const showHistoryTab = !isViewingOther || (publicProfile == null ? void 0 : publicProfile.is_public) && (publicProfile == null ? void 0 : publicProfile.show_history) !== false;
  const { streak: ownStreak, achievements: ownAchievements = [], stats: ownStreakStats } = useWatchStreaks();
  const { streak: publicStreak, achievements: publicAchievements = [], stats: publicStreakStats } = usePublicWatchStreaks(
    publicProfile == null ? void 0 : publicProfile.user_id,
    (publicProfile == null ? void 0 : publicProfile.is_public) ?? false,
    (publicProfile == null ? void 0 : publicProfile.show_history) ?? true
  );
  const viewedStreak = isViewingOther ? publicStreak : ownStreak;
  const achievements = isViewingOther ? publicAchievements : ownAchievements;
  const viewedStreakStats = isViewingOther ? publicStreakStats : ownStreakStats;
  const { data: profileBadges = [] } = useUserBadges(profile == null ? void 0 : profile.user_id);
  const { data: commentsCount = 0 } = useQuery({
    queryKey: ["user_comments_count", profile == null ? void 0 : profile.user_id],
    enabled: !!(profile == null ? void 0 : profile.user_id),
    queryFn: async () => {
      const { count, error } = await supabase.from("comments").select("id", { count: "exact", head: true }).eq("user_id", profile.user_id);
      if (error) return 0;
      return count || 0;
    }
  });
  const mangaCounts = reactExports.useMemo(() => {
    let manga = 0, manhwa = 0, comics = 0, totalChapters = 0;
    (mangaReadlist || []).forEach((item) => {
      const title = (item.manga_title || "").toLowerCase();
      const format = (item.format || "").toLowerCase();
      if (format.includes("manhwa") || title.includes("manhwa") || title.includes("solo leveling") || title.includes("ranker") || title.includes("tower of god")) {
        manhwa++;
      } else if (format.includes("comic") || title.includes("comic")) {
        comics++;
      } else {
        manga++;
      }
      if (item.last_chapter_number) totalChapters += Number(item.last_chapter_number) || 0;
    });
    return { manga, manhwa, comics, totalChapters };
  }, [mangaReadlist]);
  const forumUpvotes = reactExports.useMemo(
    () => (forumPosts || []).reduce((acc, p) => acc + (p.upvotes || 0), 0),
    [forumPosts]
  );
  const reputation = reactExports.useMemo(
    () => computeReputation({
      episodes: (history == null ? void 0 : history.length) || 0,
      longestStreak: (viewedStreak == null ? void 0 : viewedStreak.longestStreak) || 0,
      ratingsCount: userRatings.length,
      commentsCount,
      forumPosts: (forumPosts == null ? void 0 : forumPosts.length) || 0,
      forumUpvotes,
      followers: (followStats == null ? void 0 : followStats.followers) || 0
    }),
    [history, viewedStreak, userRatings, commentsCount, forumPosts, forumUpvotes, followStats]
  );
  const reputationRate = reputation.score;
  const libraryDistribution = reactExports.useMemo(
    () => computeLibraryDistribution(watchlist || [], mangaReadlist || []),
    [watchlist, mangaReadlist]
  );
  const overviewInsights = reactExports.useMemo(() => {
    var _a2, _b2;
    const habits = computeWatchingHabits(history || []);
    const ratingDist = computeRatingDistribution(userRatings);
    const growth = computeMonthlySeries({
      history: history || [],
      watchlist: watchlist || [],
      mangaReadlist: mangaReadlist || [],
      ratings: userRatings,
      comments: userCommentRows
    });
    return deriveInsights({
      distribution: libraryDistribution,
      habits,
      ratings: ratingDist,
      growth,
      topGenre: ((_b2 = (_a2 = tasteProfile == null ? void 0 : tasteProfile.topGenres) == null ? void 0 : _a2[0]) == null ? void 0 : _b2.genre) ?? null,
      currentStreak: (viewedStreak == null ? void 0 : viewedStreak.currentStreak) || 0,
      longestStreak: (viewedStreak == null ? void 0 : viewedStreak.longestStreak) || 0
    });
  }, [history, userRatings, watchlist, mangaReadlist, userCommentRows, libraryDistribution, tasteProfile, viewedStreak]);
  const [activeTab, setActiveTab] = reactExports.useState("overview");
  const [searchParams] = useSearchParams();
  reactExports.useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab && ["overview", "watchlist", "manga-readlist", "history", "vault", "streaks"].includes(tab)) {
      setActiveTab(tab);
    }
  }, [searchParams]);
  reactExports.useEffect(() => {
    if (user && !isViewingOther) {
      refreshProfile();
    }
  }, []);
  if (isViewingOther && !loadingPublicProfile && (publicProfileError || !publicProfile)) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background text-foreground overflow-x-hidden", children: [
      showSidebar && /* @__PURE__ */ jsxRuntimeExports.jsx(Sidebar, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: cn("relative z-10 w-full", !isDesktopApp && "md:pl-24"), children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 md:px-8 py-20", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => navigate(-1), className: "flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-5 h-5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Back" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-16 h-16 mx-auto text-muted-foreground mb-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold mb-2", children: "Profile Not Available" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-6", children: "This profile is private or doesn't exist." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: () => navigate("/"), children: "Go Home" })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(MobileNav, {})
    ] });
  }
  if (isViewingOther && loadingPublicProfile) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-background flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" }) });
  }
  if (!user && !isViewingOther) {
    navigate("/auth");
    return null;
  }
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    });
  };
  const stats = {
    total: (watchlist == null ? void 0 : watchlist.length) || 0,
    watching: (watchlist == null ? void 0 : watchlist.filter((i) => i.status === "watching").length) || 0,
    completed: (watchlist == null ? void 0 : watchlist.filter((i) => i.status === "completed").length) || 0,
    plan_to_watch: (watchlist == null ? void 0 : watchlist.filter((i) => i.status === "plan_to_watch").length) || 0,
    watchTimeSeconds: computedWatchTimeSeconds
  };
  const formatWatchTime = (seconds) => {
    if (seconds === 0) return "0 hours";
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor(seconds % 3600 / 60);
    if (hours === 0) return `${minutes}m`;
    return minutes > 0 ? `${hours}h ${minutes}m` : `${hours}h`;
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "min-h-screen bg-background text-foreground overflow-x-hidden relative",
      style: ambientAccentStyle(ambientColor),
      children: [
        (profile == null ? void 0 : profile.username) && /* @__PURE__ */ jsxRuntimeExports.jsx(
          Seo,
          {
            title: profile.display_name || profile.username,
            description: profile.bio || `${profile.display_name || profile.username}'s anime profile on Tatakai.`,
            image: profile.banner_url || profile.avatar_url || void 0,
            canonicalPath: `/user/${profile.username}`,
            kind: "profile"
          }
        ),
        showSidebar && /* @__PURE__ */ jsxRuntimeExports.jsx(Sidebar, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ProfileBackgroundEffects, { effect: backgroundEffect }),
        (profile == null ? void 0 : profile.banner_url) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fixed inset-0 w-full h-full overflow-hidden pointer-events-none -z-10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: profile.banner_url,
              alt: "",
              className: "w-full h-full object-cover opacity-[0.15] md:opacity-[0.25] blur-[100px] saturate-[2.5] transform scale-125"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-background/40 via-background/80 to-background/95" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: cn(
          "relative z-10 w-full",
          !isDesktopApp && "md:pl-24"
        ), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "h-[360px] md:h-[500px] relative w-full overflow-hidden group select-none", children: [
            (profile == null ? void 0 : profile.banner_url) ? /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: profile.banner_url,
                alt: "Profile banner",
                className: "absolute inset-0 w-full h-full object-cover object-center transition-transform duration-[2s] ease-out group-hover:scale-[1.02]"
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-background" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent opacity-90 pointer-events-none" }),
            !isViewingOther && /* @__PURE__ */ jsxRuntimeExports.jsx(
              AvatarPickerSheet,
              {
                type: "banner",
                currentImage: (profile == null ? void 0 : profile.banner_url) || void 0,
                trigger: /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "absolute top-6 right-6 px-4 py-2 rounded-full bg-black/40 hover:bg-black/60 text-white/90 text-xs font-bold flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-xl border border-white/20 shadow-2xl hover:scale-105 z-10", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Camera, { className: "w-3.5 h-3.5" }),
                  "Change Cover"
                ] })
              }
            ),
            isViewingOther && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-6 left-6 z-20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                onClick: () => navigate(-1),
                className: "group flex items-center gap-2 text-xs font-bold text-white/90 hover:text-white transition-all backdrop-blur-xl px-4 py-2 rounded-full bg-black/40 border border-white/20 shadow-xl hover:bg-black/60",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4 transition-transform group-hover:-translate-x-1" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Back" })
                ]
              }
            ) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 md:px-8 relative z-20 pb-20", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { y: 20, opacity: 0 },
                animate: { y: 0, opacity: 1 },
                className: "flex flex-col xl:flex-row justify-between items-start xl:items-end gap-6 md:gap-10 -mt-20 md:-mt-24 mb-10",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col md:flex-row items-center md:items-end gap-6 md:gap-8 w-full xl:w-auto", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative group shrink-0", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-36 h-36 md:w-48 md:h-48 rounded-full overflow-hidden bg-background ring-[6px] md:ring-[8px] ring-background shadow-[0_0_40px_rgba(0,0,0,0.5)] border border-white/10 z-10 relative", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Avatar, { className: "w-full h-full", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarImage, { src: (profile == null ? void 0 : profile.avatar_url) || void 0, className: "object-cover w-full h-full transition-transform duration-700 group-hover:scale-105" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarFallback, { className: "bg-gradient-to-br from-primary to-purple-600 text-white text-5xl font-black uppercase", children: ((_a = profile == null ? void 0 : profile.display_name) == null ? void 0 : _a[0]) || (isViewingOther ? "U" : (_b = user == null ? void 0 : user.email) == null ? void 0 : _b[0]) || "U" })
                      ] }) }),
                      !isViewingOther && /* @__PURE__ */ jsxRuntimeExports.jsx(
                        AvatarPickerSheet,
                        {
                          type: "avatar",
                          currentImage: (profile == null ? void 0 : profile.avatar_url) || void 0,
                          trigger: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "absolute bottom-2 right-2 w-10 h-10 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-110 border-2 border-background z-20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-4 h-4" }) })
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center md:items-start text-center md:text-left w-full pb-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center md:justify-start gap-3 flex-wrap mb-1", children: [
                        (() => {
                          const rankStyle = getRankNameStyle(profileRankScore);
                          return /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl md:text-5xl font-black tracking-tight drop-shadow-xl font-display", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: rankStyle.className, style: rankStyle.style, children: (profile == null ? void 0 : profile.display_name) || ((profile == null ? void 0 : profile.username) && (profile == null ? void 0 : profile.username) !== "null" ? profile == null ? void 0 : profile.username : "User") }) });
                        })(),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          UserBadges,
                          {
                            badges: profileBadges,
                            size: 22,
                            userStats: {
                              episodes: effectiveEpisodeCount,
                              manga_chapters: mangaCounts.totalChapters,
                              comments: commentsCount,
                              ratings: userRatings.length,
                              reputation: reputationRate
                            }
                          }
                        )
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center md:justify-start gap-3 mb-5 flex-wrap", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-medium text-muted-foreground/80 hover:text-muted-foreground transition-colors", children: [
                          "@",
                          (profile == null ? void 0 : profile.username) && (profile == null ? void 0 : profile.username) !== "null" ? profile.username : "anonymous"
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-1 h-1 rounded-full bg-white/20" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(RankBadge, { score: profileRankScore, size: "sm" })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap items-center justify-center md:justify-start gap-3 w-full", children: isViewingOther ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                        user && /* @__PURE__ */ jsxRuntimeExports.jsx(
                          Button,
                          {
                            onClick: () => isFollowing ? unfollow() : follow(),
                            disabled: isFollowingLoading || checkingFollow,
                            className: cn(
                              "rounded-full h-9 px-6 font-bold text-xs transition-all shadow-xl",
                              isFollowing ? "bg-white/10 hover:bg-white/20 text-white border border-white/10" : "bg-primary hover:bg-primary/90 text-primary-foreground hover:scale-105"
                            ),
                            children: isFollowing ? "Following" : "Follow"
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          Button,
                          {
                            variant: "secondary",
                            onClick: () => {
                              const shareUrl = window.location.href;
                              navigator.clipboard.writeText(shareUrl);
                              ue.success("Profile link copied!");
                            },
                            className: "rounded-full h-9 px-5 bg-white/5 hover:bg-white/15 border border-white/10 text-white text-xs font-bold transition-all backdrop-blur-md",
                            children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx(Share2, { className: "w-3.5 h-3.5 mr-2" }),
                              " Share"
                            ]
                          }
                        )
                      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          ProfileSettingsSheet,
                          {
                            trigger: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                              Button,
                              {
                                variant: "secondary",
                                className: "rounded-full h-9 px-5 bg-white/10 hover:bg-white/20 border border-white/10 text-white text-xs font-bold transition-all backdrop-blur-md hover:scale-105 shadow-xl",
                                children: [
                                  /* @__PURE__ */ jsxRuntimeExports.jsx(Settings, { className: "w-3.5 h-3.5 mr-2" }),
                                  " Profile Settings"
                                ]
                              }
                            )
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          SocialLinksEditor,
                          {
                            currentLinks: (ownProfile == null ? void 0 : ownProfile.social_links) || {},
                            isPublic: (ownProfile == null ? void 0 : ownProfile.is_public) ?? false,
                            showWatchlist: (ownProfile == null ? void 0 : ownProfile.show_watchlist) ?? true,
                            showHistory: (ownProfile == null ? void 0 : ownProfile.show_history) ?? true,
                            trigger: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "secondary", className: "rounded-full h-9 px-5 bg-white/5 hover:bg-white/15 border border-white/10 text-white/90 text-xs font-bold transition-all backdrop-blur-md shadow-xl", children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx(Share2, { className: "w-3.5 h-3.5 mr-2" }),
                              " Social Links"
                            ] })
                          }
                        ),
                        isAdmin && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          Button,
                          {
                            variant: "secondary",
                            onClick: () => navigate("/admin"),
                            className: "rounded-full h-9 px-5 bg-primary/15 hover:bg-primary/25 border border-primary/20 text-primary text-xs font-bold transition-all backdrop-blur-md shadow-xl",
                            children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-3.5 h-3.5 mr-2" }),
                              " Dashboard"
                            ]
                          }
                        )
                      ] }) })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden xl:flex items-center gap-6 bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-[2rem] p-5 shadow-[0_8px_32px_rgba(0,0,0,0.3)] min-w-[380px] justify-between", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center px-2 flex-1", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl font-black text-white drop-shadow-md", children: stats.completed }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground uppercase tracking-widest font-bold mt-1", children: "Anime" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-px h-10 bg-white/10" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center px-2 flex-1", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl font-black text-white drop-shadow-md", children: mangaCounts.totalChapters }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground uppercase tracking-widest font-bold mt-1", children: "Chapters" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-px h-10 bg-white/10" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center px-2 flex-1", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl font-black text-white drop-shadow-md", children: (followStats == null ? void 0 : followStats.followers) || 0 }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground uppercase tracking-widest font-bold mt-1", children: "Friends" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-px h-10 bg-white/10" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center px-2 flex-1", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl font-black text-white drop-shadow-md", children: formatWatchTime(stats.watchTimeSeconds) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground uppercase tracking-widest font-bold mt-1", children: "Time" })
                    ] })
                  ] })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col md:flex-row gap-8 mb-10 w-full max-w-3xl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full", children: [
              (profile == null ? void 0 : profile.bio) && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[15px] text-muted-foreground/90 leading-relaxed font-normal whitespace-pre-line mb-5", children: profile.bio }),
              (profile == null ? void 0 : profile.social_links) && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SocialLinksDisplay, { links: profile.social_links }) })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { value: activeTab, onValueChange: setActiveTab, className: "space-y-8", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                TabsList,
                {
                  className: "\n                      bg-white/[0.03]\n                      backdrop-blur-2xl\n                      p-2\n                      border border-white/[0.08]\n                      rounded-full\n                      w-full max-w-full\n                      md:w-auto md:max-w-none\n                      mx-auto\n                      flex items-center justify-start md:justify-center\n                      gap-1.5\n                      overflow-x-auto\n                      overflow-y-hidden\n                      whitespace-nowrap\n                      shadow-xl\n                      no-scrollbar\n                    ",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      TabsTrigger,
                      {
                        value: "overview",
                        className: "shrink-0 gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-[0_0_20px_rgba(var(--primary),0.4)] rounded-full px-4 py-2.5 text-sm font-bold whitespace-nowrap transition-all sm:px-5",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(LayoutGrid, { className: "w-4 h-4" }),
                          "Overview"
                        ]
                      }
                    ),
                    showWatchlistTab && /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "watchlist", className: "shrink-0 md:flex-none gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-[0_0_20px_rgba(var(--primary),0.4)] rounded-full px-4 py-2.5 text-sm font-bold transition-all sm:px-6", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(List, { className: "w-4 h-4" }),
                      "Watchlist"
                    ] }),
                    showWatchlistTab && /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "manga-readlist", className: "shrink-0 md:flex-none gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-[0_0_20px_rgba(var(--primary),0.4)] rounded-full px-4 py-2.5 text-sm font-bold transition-all sm:px-6", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-4 h-4" }),
                      "Manga Readlist"
                    ] }),
                    showHistoryTab && /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "history", className: "shrink-0 md:flex-none gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-[0_0_20px_rgba(var(--primary),0.4)] rounded-full px-4 py-2.5 text-sm font-bold transition-all sm:px-6", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(History, { className: "w-4 h-4" }),
                      "History"
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "vault", className: "shrink-0 md:flex-none gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-[0_0_20px_rgba(var(--primary),0.4)] rounded-full px-4 py-2.5 text-sm font-bold transition-all sm:px-6", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Library, { className: "w-4 h-4" }),
                      "Vault"
                    ] }),
                    (!isViewingOther || showHistoryTab) && /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "streaks", className: "shrink-0 md:flex-none gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-[0_0_20px_rgba(var(--primary),0.4)] rounded-full px-4 py-2.5 text-sm font-bold transition-all sm:px-6", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Flame, { className: "w-4 h-4" }),
                      "Streaks"
                    ] })
                  ]
                }
              ),
              isViewingOther && !showWatchlistTab && !showHistoryTab && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-16 border border-white/5 bg-white/[0.02] backdrop-blur-sm rounded-[2rem]", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-12 h-12 mx-auto text-muted-foreground/50 mb-4" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground font-medium", children: "This user has chosen to keep their anime lists private." })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "overview", className: "mt-8 focus-visible:outline-none", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                ProfileOverviewTab,
                {
                  userId: profile == null ? void 0 : profile.user_id,
                  username: profile == null ? void 0 : profile.username,
                  isViewingOther,
                  isPublic: (profile == null ? void 0 : profile.is_public) ?? false,
                  showCalendar: (profile == null ? void 0 : profile.show_calendar) ?? true,
                  watchTimeSeconds: computedWatchTimeSeconds,
                  episodesCount: effectiveEpisodeCount,
                  completedAnimeCount: stats.completed,
                  watchingAnimeCount: stats.watching,
                  mangaCount: mangaCounts.manga,
                  manhwaCount: mangaCounts.manhwa,
                  comicsCount: mangaCounts.comics,
                  totalChaptersRead: mangaCounts.totalChapters,
                  readingTotals,
                  planToWatchCount: stats.plan_to_watch,
                  streakDays: (viewedStreak == null ? void 0 : viewedStreak.currentStreak) || 0,
                  longestStreak: (viewedStreak == null ? void 0 : viewedStreak.longestStreak) || 0,
                  totalDaysActive: (viewedStreak == null ? void 0 : viewedStreak.totalDaysWatched) || 0,
                  commentCount: commentsCount,
                  forumPostCount: (forumPosts == null ? void 0 : forumPosts.length) || 0,
                  forumUpvotes,
                  reputationRate,
                  reputationBreakdown: reputation.breakdown,
                  leaderboardRank: (userRank == null ? void 0 : userRank.rank) ?? null,
                  totalRankedUsers: (userRank == null ? void 0 : userRank.totalUsers) ?? null,
                  followersCount: (followStats == null ? void 0 : followStats.followers) || 0,
                  followingCount: (followStats == null ? void 0 : followStats.following) || 0,
                  watchlist: watchlist || [],
                  history: history || [],
                  mangaReadlist: mangaReadlist || [],
                  ratings: userRatings,
                  commentDates: userCommentRows,
                  favoriteCharacters,
                  favoriteCharactersLoading: loadingFavoriteCharacters,
                  tasteProfile,
                  tasteProfileLoading: loadingTasteProfile,
                  insights: overviewInsights,
                  achievements,
                  externalStats,
                  externalStatsLoading,
                  onNavigateTab: (tabKey) => setActiveTab(tabKey)
                }
              ) }),
              showWatchlistTab && /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "watchlist", className: "mt-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                WatchlistTab,
                {
                  watchlist: watchlist || [],
                  loading: loadingWatchlist,
                  isViewingOther,
                  onNavigate: navigate
                }
              ) }),
              showWatchlistTab && /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "manga-readlist", className: "mt-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                MangaReadlistTab,
                {
                  mangaReadlist: mangaReadlist || [],
                  loading: loadingMangaReadlist,
                  isViewingOther,
                  onNavigate: navigate
                }
              ) }),
              showHistoryTab && /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "history", className: "mt-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                HistoryTab,
                {
                  history: history || [],
                  mangaHistoryEntries,
                  loading: loadingCombinedHistory,
                  isViewingOther,
                  onNavigate: navigate,
                  formatDate
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "vault", className: "mt-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                VaultTab,
                {
                  userId: profile == null ? void 0 : profile.user_id,
                  isViewingOther,
                  onNavigate: navigate
                }
              ) }),
              (!isViewingOther || showHistoryTab) && /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "streaks", className: "mt-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                WatchStreaks,
                {
                  isOwnProfile: !isViewingOther,
                  rankScore: profileRankScore,
                  streak: isViewingOther ? viewedStreak : void 0,
                  stats: isViewingOther ? viewedStreakStats : void 0
                }
              ) })
            ] }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(MobileNav, {})
      ]
    }
  );
}
export {
  ProfilePage as default
};
