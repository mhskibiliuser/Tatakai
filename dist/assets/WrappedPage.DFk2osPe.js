import { e as useNavigate, r as reactExports, j as jsxRuntimeExports } from "./react-vendor.CAo4XUiA.js";
import { u as useAuth, F as useWatchHistory, fq as useReadingTrackTotals, fh as computeRankScore, fa as getRankBadges, U as useIsMobileApp, s as useIsMobile, K as useIsDesktopApp, B as Button, Q as Background, S as Sidebar, a8 as Avatar, a9 as AvatarImage, aa as AvatarFallback, b4 as getRankTier, b5 as getNextRankTier, fb as getRankNameStyleForRank, G as GlassPanel, b7 as getRankImageUrl, j as cn, b9 as getBadgeHoverClass } from "./index.C6yfkT5T.js";
import { u as useWatchStreaks } from "./useWatchStreaks.D457Q6R9.js";
import { M as MobileNav } from "./MobileNav.ABHzkhTQ.js";
import { u as ArrowLeft, aD as Clock, aN as TvMinimal, Z as Film, bB as Flame, aI as Star, bF as Calendar, bC as Trophy } from "./icons.C2gBBarQ.js";
import { m as motion } from "./motion.DVGLRFCH.js";
import "./vendor.CJyRs4QS.js";
import "./tanstack.DPr3OB19.js";
import "./supabase.WuRMX5Dg.js";
import "./radix.BiK9uYXL.js";
import "./hls.BlgtCWcq.js";
import "./editor.Dxw8dtyw.js";
import "./charts.Dr1fgDJ-.js";
function StatCard({
  icon: Icon,
  label,
  value,
  sublabel,
  accent = false,
  iconClass
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassPanel, { className: cn(
    "p-5 text-center relative overflow-hidden",
    accent && "border-primary/20 bg-primary/5"
  ), children: [
    accent && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("flex items-center justify-center mb-2", iconClass), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-8 h-8" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-3xl font-black font-display leading-none", children: value }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-semibold mt-1", children: label }),
    sublabel && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground mt-0.5", children: sublabel })
  ] });
}
function MiniBar({ label, value, max, color }) {
  const pct = max > 0 ? value / max * 100 : 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-muted-foreground w-28 truncate shrink-0", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-2 rounded-full bg-muted overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        className: `h-full rounded-full ${color}`,
        initial: { width: 0 },
        animate: { width: `${pct}%` },
        transition: { duration: 0.8, ease: "easeOut", delay: 0.1 }
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold w-8 text-right shrink-0", children: value })
  ] });
}
function WrappedPage() {
  var _a, _b;
  const navigate = useNavigate();
  const { user, profile } = useAuth();
  const { data: history = [] } = useWatchHistory();
  const { streak, achievements, stats } = useWatchStreaks();
  const { data: readingTotals } = useReadingTrackTotals();
  const rankScore = computeRankScore({
    episodes: stats.totalEpisodes,
    manga: (readingTotals == null ? void 0 : readingTotals.manga) ?? 0,
    manhwa: (readingTotals == null ? void 0 : readingTotals.manhwa) ?? 0,
    comic: (readingTotals == null ? void 0 : readingTotals.comic) ?? 0
  });
  const rankBadges = getRankBadges(rankScore);
  useIsMobileApp();
  const isMobile = useIsMobile();
  const isDesktopApp = useIsDesktopApp();
  const showSidebar = !isMobile;
  const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
  const genreStats = reactExports.useMemo(() => {
    const animeCount = {};
    history.forEach((h) => {
      const key = h.anime_id;
      animeCount[key] = (animeCount[key] || 0) + 1;
    });
    return Object.entries(animeCount).map(([id, count]) => {
      const item = history.find((h) => h.anime_id === id);
      return { id, name: (item == null ? void 0 : item.anime_name) || id, count, poster: item == null ? void 0 : item.anime_poster };
    }).sort((a, b) => b.count - a.count).slice(0, 5);
  }, [history]);
  const monthlyActivity = reactExports.useMemo(() => {
    const months = {};
    history.forEach((h) => {
      const month = new Date(h.watched_at).toLocaleString("default", { month: "short", year: "2-digit" });
      months[month] = (months[month] || 0) + 1;
    });
    return Object.entries(months).slice(-6).map(([month, count]) => ({ month, count }));
  }, [history]);
  const maxMonthly = Math.max(...monthlyActivity.map((m) => m.count), 1);
  achievements.filter((a) => a.unlocked);
  if (!user) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background flex flex-col items-center justify-center gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Sign in to see your stats" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: () => navigate("/auth"), children: "Sign In" })
    ] });
  }
  const MONTH_COLORS = [
    "bg-primary/60",
    "bg-primary/70",
    "bg-primary/80",
    "bg-primary/90",
    "bg-primary",
    "bg-primary"
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background text-foreground overflow-x-hidden", children: [
    !showSidebar && /* @__PURE__ */ jsxRuntimeExports.jsx(Background, {}),
    showSidebar && /* @__PURE__ */ jsxRuntimeExports.jsx(Sidebar, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: cn(
      "relative z-10 pr-6 py-6 max-w-[1400px] mx-auto pb-24 md:pb-6",
      isDesktopApp ? "pl-6" : "pl-6 md:pl-32"
    ), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: () => navigate(-1),
          className: "flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6 text-sm",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4" }),
            "Back"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          className: "mb-10",
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 mb-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Avatar, { className: "w-14 h-14 ring-2 ring-primary/20", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarImage, { src: (profile == null ? void 0 : profile.avatar_url) || void 0 }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarFallback, { className: "bg-gradient-to-br from-primary to-secondary text-primary-foreground font-bold text-lg", children: ((_b = (_a = profile == null ? void 0 : profile.display_name) == null ? void 0 : _a[0]) == null ? void 0 : _b.toUpperCase()) || "?" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-muted-foreground text-sm font-medium", children: [
                "Your ",
                currentYear,
                " stats"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display text-3xl md:text-4xl font-black tracking-tight gradient-text", children: [
                (profile == null ? void 0 : profile.display_name) || "Your",
                " Wrapped"
              ] })
            ] })
          ] })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { delay: 0.1 },
          className: "grid grid-cols-2 md:grid-cols-4 gap-4 mb-8",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              StatCard,
              {
                icon: Clock,
                iconClass: "text-primary",
                label: "Hours Watched",
                value: stats.totalHours.toLocaleString(),
                sublabel: `${stats.totalMinutes.toLocaleString()} minutes`,
                accent: true
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              StatCard,
              {
                icon: TvMinimal,
                iconClass: "text-blue-400",
                label: "Episodes",
                value: stats.totalEpisodes.toLocaleString(),
                sublabel: `${stats.completedEpisodes} completed`
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              StatCard,
              {
                icon: Film,
                iconClass: "text-teal-400",
                label: "Anime Series",
                value: stats.uniqueAnime.toLocaleString(),
                sublabel: "unique titles"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              StatCard,
              {
                icon: Flame,
                iconClass: "text-orange-400",
                label: "Best Streak",
                value: `${streak.longestStreak}d`,
                sublabel: streak.currentStreak > 0 ? `${streak.currentStreak}d current` : "Keep it going!"
              }
            )
          ]
        }
      ),
      rankScore > 0 && (() => {
        const rankTier = getRankTier(rankScore);
        const nextRank = getNextRankTier(rankScore);
        const rankStyle = getRankNameStyleForRank(rankTier.rank);
        const progressPct = nextRank ? Math.min(100, nextRank.progress / (nextRank.progress + nextRank.needed) * 100) : 100;
        return /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            transition: { delay: 0.15 },
            className: "mb-8",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassPanel, { className: "p-5 flex flex-col sm:flex-row items-center gap-5 border-primary/20 bg-gradient-to-br from-primary/5 to-transparent", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: getRankImageUrl(rankTier.rank),
                  alt: rankTier.name,
                  className: "w-20 h-20 object-contain drop-shadow-lg"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0 text-center sm:text-left", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-medium uppercase tracking-widest mb-1", children: "Your Current Rank" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: cn("text-2xl font-black font-display", rankStyle.className), style: rankStyle.style, children: rankTier.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mt-0.5", children: [
                  rankScore.toLocaleString(),
                  " RP · ",
                  stats.totalEpisodes.toLocaleString(),
                  " episodes"
                ] }),
                nextRank && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 space-y-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-xs text-muted-foreground", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                      "Progress to ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: getRankNameStyleForRank(nextRank.tier.rank).className, children: nextRank.tier.name })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                      nextRank.needed,
                      " RP left"
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1.5 bg-muted rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    motion.div,
                    {
                      className: cn("h-full rounded-full bg-gradient-to-r from-primary to-secondary"),
                      initial: { width: 0 },
                      animate: { width: `${progressPct}%` },
                      transition: { duration: 1, ease: "easeOut", delay: 0.3 }
                    }
                  ) })
                ] })
              ] })
            ] })
          }
        );
      })(),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8", children: [
        genreStats.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { opacity: 0, x: -20 },
            animate: { opacity: 1, x: 0 },
            transition: { delay: 0.2 },
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassPanel, { className: "p-5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-4 h-4 text-amber-400" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-base", children: "Most Watched" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: genreStats.map((item, i) => {
                var _a2;
                return /* @__PURE__ */ jsxRuntimeExports.jsx(
                  MiniBar,
                  {
                    label: item.name,
                    value: item.count,
                    max: ((_a2 = genreStats[0]) == null ? void 0 : _a2.count) || 1,
                    color: i === 0 ? "bg-amber-400" : i === 1 ? "bg-primary" : "bg-muted-foreground/50"
                  },
                  item.id
                );
              }) })
            ] })
          }
        ),
        monthlyActivity.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { opacity: 0, x: 20 },
            animate: { opacity: 1, x: 0 },
            transition: { delay: 0.25 },
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassPanel, { className: "p-5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-4 h-4 text-primary" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-base", children: "Monthly Activity" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-end gap-2 h-24", children: monthlyActivity.map((m, i) => {
                const heightPct = maxMonthly > 0 ? m.count / maxMonthly * 100 : 0;
                return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 flex flex-col items-center gap-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    motion.div,
                    {
                      className: cn("w-full rounded-t-lg", MONTH_COLORS[i] || "bg-primary/60"),
                      initial: { height: 0 },
                      animate: { height: `${Math.max(heightPct, 4)}%` },
                      transition: { duration: 0.7, ease: "easeOut", delay: 0.1 + i * 0.08 },
                      style: { minHeight: "4px" }
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-muted-foreground font-medium", children: m.month })
                ] }, m.month);
              }) })
            ] })
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { delay: 0.3 },
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassPanel, { className: "p-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-between mb-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "w-4 h-4 text-amber-400" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-base", children: "Rank Badges" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
                rankBadges.filter((b) => b.unlocked).length,
                "/",
                rankBadges.length,
                " unlocked"
              ] })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-5 h-1.5 bg-muted rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                className: "h-full bg-gradient-to-r from-primary to-secondary rounded-full",
                initial: { width: 0 },
                animate: { width: `${rankBadges.filter((b) => b.unlocked).length / rankBadges.length * 100}%` },
                transition: { duration: 1, ease: "easeOut", delay: 0.4 }
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 sm:grid-cols-5 md:grid-cols-7 lg:grid-cols-8 gap-3", children: rankBadges.map((badge, i) => {
              const ns = getRankNameStyleForRank(badge.rank);
              return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.div,
                {
                  initial: { opacity: 0, scale: 0.8 },
                  animate: { opacity: 1, scale: 1 },
                  transition: { delay: 0.35 + i * 0.03, duration: 0.2 },
                  title: `${badge.name}: ${badge.description}`,
                  className: cn(
                    "flex flex-col items-center gap-1 p-2 rounded-xl border text-center cursor-default",
                    badge.unlocked ? cn("border-border/40 bg-muted/20", getBadgeHoverClass(badge.rank)) : "border-border/20 bg-muted/10 opacity-35 grayscale"
                  ),
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "img",
                      {
                        src: getRankImageUrl(badge.rank),
                        alt: badge.name,
                        className: "w-8 h-8 object-contain leading-none"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: cn("text-[9px] font-semibold leading-tight text-center", badge.unlocked && ns.className),
                        style: badge.unlocked ? ns.style : {},
                        children: badge.name
                      }
                    )
                  ]
                },
                badge.rank
              );
            }) })
          ] })
        }
      ),
      history.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center py-24 text-center gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-6xl", children: "📊" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-black", children: "No stats yet" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground max-w-xs", children: "Start watching anime to build your personal stats and unlock achievements!" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: () => navigate("/"), children: "Start Watching" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(MobileNav, {})
  ] });
}
export {
  WrappedPage as default
};
