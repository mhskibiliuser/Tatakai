const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/index.C6yfkT5T.js","assets/react-vendor.CAo4XUiA.js","assets/vendor.CJyRs4QS.js","assets/tanstack.DPr3OB19.js","assets/supabase.WuRMX5Dg.js","assets/radix.BiK9uYXL.js","assets/icons.C2gBBarQ.js","assets/motion.DVGLRFCH.js","assets/hls.BlgtCWcq.js","assets/editor.Dxw8dtyw.js","assets/charts.Dr1fgDJ-.js","assets/index.CWbmAlRn.css"])))=>i.map(i=>d[i]);
import { r as reactExports, j as jsxRuntimeExports, L as Link, e as useNavigate, l as useSearchParams } from "./react-vendor.CAo4XUiA.js";
import { G as GlassPanel, a2 as supabase, B as Button, az as Input, aA as Textarea, J as useConfirm, bA as Badge, aB as Switch, g5 as usePinForumPost, bq as Tabs, br as TabsList, bs as TabsTrigger, bu as TabsContent, g7 as RichContent, j as cn, g8 as useAdminLogs, g9 as useDeleteAdminLogs, ga as useToast, a8 as Avatar, a9 as AvatarImage, l as getProxiedImageUrl, aa as AvatarFallback, gb as usePendingForumPosts, gc as useApproveForumPost, gd as useRejectForumPost, u as useAuth, ge as useAllWatchRooms, es as useAdminDeleteRoom, cg as AlertDialog, ch as AlertDialogContent, ci as AlertDialogHeader, cj as AlertDialogTitle, ck as AlertDialogDescription, cl as AlertDialogFooter, cm as AlertDialogCancel, cn as AlertDialogAction, ay as Label, dO as TATAKAI_API_URL, dP as withClientHeaders, dQ as unwrapApiData, fk as CommentContent, gf as CommentAttachments, f$ as CommentEmbeds, fb as getRankNameStyleForRank, b7 as getRankImageUrl, gg as BADGES, gh as RARITY_STYLES, gi as withAdminSecretHeader, b1 as deriveIsAdmin, b0 as deriveIsModerator, K as useIsDesktopApp, a3 as useAdminMessages, Q as Background, S as Sidebar, a4 as Sheet, gj as SheetTrigger, a5 as SheetContent, a6 as SheetHeader, a7 as SheetTitle, gk as LogViewerPanel } from "./index.C6yfkT5T.js";
import { a as useQuery, u as useQueryClient, b as useMutation } from "./tanstack.DPr3OB19.js";
import { bX as subDays, bY as startOfDay, bZ as endOfDay, b_ as format, bp as formatDistanceToNow, bf as ue, b$ as parseISO, c0 as addDays, c1 as isWithinInterval, c2 as startOfMonth, c3 as startOfWeek, c4 as subMonths, b9 as __vitePreload } from "./vendor.CJyRs4QS.js";
import { G as GITHUB_REPO_URL, f as formatCompact, i as fetchAllReleases, j as fetchRepoStats, p as platformForAsset, h as GITHUB_RELEASES_URL, g as formatBytes } from "./github.DlOKo3Ni.js";
import { U as Users, m as Eye, aD as Clock, bj as Activity, a5 as Globe, ca as ChartColumn, e as TrendingUp, aJ as Play, bE as ArrowUpRight, cU as ChartPie, d5 as MapPin, G as Github, D as Download, bs as Smartphone, bx as Monitor, aI as Star, a as CircleAlert, P as Plus, X, Q as LoaderCircle, aY as CircleCheckBig, V as ChevronUp, N as ChevronDown, bX as Megaphone, af as EyeOff, aP as Pen, J as Trash2, aW as History, T as TriangleAlert, S as Search, y as MessageSquare, az as Music2, aA as Layers, ak as Pin, j as ExternalLink, g as User, q as Copy, bh as FileText, bd as CircleX, aV as Shield, a7 as Image, n as Radio, a6 as Lock, ae as Mail, O as MonitorPlay, aF as Save, F as Terminal, ce as Apple, aH as ShieldAlert, Z as Film, c8 as Server, C as CircleCheck, d7 as Newspaper, cj as Send, R as RefreshCw, d8 as PencilLine, bN as Bot, aj as PinOff, bb as Link$1, d9 as PanelsTopLeft, aZ as List, bC as Trophy, da as CircleUser, z as Award, bi as Database, aT as Zap, b9 as RotateCcw, x as CirclePlay, aK as ChartNoAxesColumn, db as Package, cf as Tag, a_ as FlaskConical, dc as CirclePlus, b as ChevronRight, cL as CircleArrowDown, aG as ChevronLeft, by as BookMarked, b0 as Gauge, ci as Lightbulb, c6 as MessagesSquare, _ as Ban, av as ScrollText, dd as BellRing, i as Settings, bI as Rocket, de as Webhook, cb as CloudDownload, bz as Bug, df as UserCog, ag as ShieldCheck, dg as ShieldOff, cD as LockOpen, u as ArrowLeft, bY as Inbox, cd as Menu, dh as Power } from "./icons.C2gBBarQ.js";
import { m as motion } from "./motion.DVGLRFCH.js";
import { R as ResponsiveContainer, A as AreaChart, C as CartesianGrid, X as XAxis, Y as YAxis, T as Tooltip, a as Area, e as PieChart, f as Pie, g as Cell, B as BarChart, h as Bar, L as LineChart, i as Line, j as Legend } from "./charts.Dr1fgDJ-.js";
import { u as useStatusIncidents, a as useCreateIncident, b as useUpdateIncident, c as useAdminPopups, d as useCreatePopup, e as useUpdatePopup, f as useDeletePopup, g as useAdminChangelog, h as useCreateChangelog, i as useUpdateChangelog, j as useDeleteChangelog } from "./useAdminFeatures.CR_zjJvW.js";
import { c as useRecentCommentsDetailed } from "./useUserCommentsDetailed.DTjSzD08.js";
import { b as useAllSuggestions, c as useReviewSuggestion, d as useDeleteSuggestion } from "./useSuggestions.BtvuvrYw.js";
import { u as useUserAchievements, a as useGrantAchievement, b as useRevokeAchievement, A as ACHIEVEMENTS } from "./useAchievements.BmMgkfY0.js";
import "./supabase.WuRMX5Dg.js";
import "./radix.BiK9uYXL.js";
import "./hls.BlgtCWcq.js";
import "./editor.Dxw8dtyw.js";
function AnalyticsDashboard() {
  var _a, _b, _c;
  const [timeRange, setTimeRange] = reactExports.useState("week");
  const days = timeRange === "day" ? 1 : timeRange === "week" ? 7 : 30;
  const { data: totalUsers } = useQuery({
    queryKey: ["analytics_total_users"],
    queryFn: async () => {
      const { count } = await supabase.from("profiles").select("*", { count: "exact", head: true });
      return count || 0;
    }
  });
  const { data: totalVisitors } = useQuery({
    queryKey: ["analytics_total_visitors", timeRange],
    queryFn: async () => {
      const startDate = subDays(/* @__PURE__ */ new Date(), days).toISOString();
      const { data } = await supabase.from("page_visits").select("session_id").gte("created_at", startDate);
      const uniqueSessions = new Set((data == null ? void 0 : data.map((v) => v.session_id)) || []);
      return uniqueSessions.size;
    }
  });
  const { data: visitorBreakdown } = useQuery({
    queryKey: ["analytics_visitor_breakdown", timeRange],
    queryFn: async () => {
      const startDate = subDays(/* @__PURE__ */ new Date(), days).toISOString();
      const { data } = await supabase.from("page_visits").select("user_id, session_id").gte("created_at", startDate);
      const sessions = /* @__PURE__ */ new Map();
      data == null ? void 0 : data.forEach((v) => {
        if (!sessions.has(v.session_id)) {
          sessions.set(v.session_id, !!v.user_id);
        }
      });
      let guests = 0, loggedIn = 0;
      sessions.forEach((isLoggedIn) => isLoggedIn ? loggedIn++ : guests++);
      return { guests, loggedIn };
    }
  });
  const { data: totalWatchTime } = useQuery({
    queryKey: ["analytics_total_watch_time", timeRange],
    queryFn: async () => {
      const startDate = subDays(/* @__PURE__ */ new Date(), days).toISOString();
      const { data } = await supabase.from("watch_sessions").select("watch_duration_seconds").gte("created_at", startDate);
      const totalSeconds = (data == null ? void 0 : data.reduce((acc, s) => acc + (s.watch_duration_seconds || 0), 0)) || 0;
      return totalSeconds;
    }
  });
  const { data: topCountries2 } = useQuery({
    queryKey: ["analytics_top_countries", timeRange],
    queryFn: async () => {
      const startDate = subDays(/* @__PURE__ */ new Date(), days).toISOString();
      const { data } = await supabase.from("page_visits").select("country, session_id").gte("created_at", startDate).not("country", "is", null);
      const countryCount = /* @__PURE__ */ new Map();
      data == null ? void 0 : data.forEach((v) => {
        if (v.country) {
          if (!countryCount.has(v.country)) {
            countryCount.set(v.country, /* @__PURE__ */ new Set());
          }
          countryCount.get(v.country).add(v.session_id);
        }
      });
      return Array.from(countryCount.entries()).map(([name, sessions]) => ({ name, value: sessions.size })).sort((a, b) => b.value - a.value).slice(0, 5);
    }
  });
  const { data: topGenres } = useQuery({
    queryKey: ["analytics_top_genres", timeRange],
    queryFn: async () => {
      const startDate = subDays(/* @__PURE__ */ new Date(), days).toISOString();
      const { data } = await supabase.from("watch_sessions").select("genres, watch_duration_seconds").gte("created_at", startDate);
      const genreTime = /* @__PURE__ */ new Map();
      data == null ? void 0 : data.forEach((s) => {
        if (s.genres && Array.isArray(s.genres)) {
          s.genres.forEach((genre) => {
            genreTime.set(genre, (genreTime.get(genre) || 0) + (s.watch_duration_seconds || 0));
          });
        }
      });
      const colors = ["#8b5cf6", "#06b6d4", "#10b981", "#f59e0b", "#ef4444", "#ec4899"];
      return Array.from(genreTime.entries()).map(([name, value], i) => ({ name, value: Math.round(value / 60), color: colors[i % colors.length] })).sort((a, b) => b.value - a.value).slice(0, 6);
    }
  });
  const { data: dailyStats } = useQuery({
    queryKey: ["analytics_daily_stats", timeRange],
    queryFn: async () => {
      var _a2, _b2, _c2;
      const stats = [];
      for (let i = days - 1; i >= 0; i--) {
        const date = subDays(/* @__PURE__ */ new Date(), i);
        const dayStart = startOfDay(date).toISOString();
        const dayEnd = endOfDay(date).toISOString();
        const [visitsResult, watchResult, usersResult, loggedInResult] = await Promise.all([
          supabase.from("page_visits").select("session_id, user_id").gte("created_at", dayStart).lte("created_at", dayEnd),
          supabase.from("watch_sessions").select("watch_duration_seconds").gte("created_at", dayStart).lte("created_at", dayEnd),
          supabase.from("profiles").select("*", { count: "exact", head: true }).gte("created_at", dayStart).lte("created_at", dayEnd),
          supabase.from("page_visits").select("user_id").not("user_id", "is", null).gte("created_at", dayStart).lte("created_at", dayEnd)
        ]);
        const uniqueSessions = new Set(((_a2 = visitsResult.data) == null ? void 0 : _a2.map((v) => v.session_id)) || []);
        const uniqueLoggedIn = new Set(((_b2 = loggedInResult.data) == null ? void 0 : _b2.map((v) => v.user_id)) || []);
        const watchMinutes = (((_c2 = watchResult.data) == null ? void 0 : _c2.reduce((acc, s) => acc + (s.watch_duration_seconds || 0), 0)) || 0) / 60;
        stats.push({
          date: format(date, timeRange === "day" ? "HH:mm" : "MMM dd"),
          visitors: uniqueSessions.size,
          dau: uniqueLoggedIn.size,
          watchTime: Math.round(watchMinutes),
          newUsers: usersResult.count || 0,
          retention: uniqueSessions.size > 0 ? Math.round(uniqueLoggedIn.size / uniqueSessions.size * 100) : 0
        });
      }
      return stats;
    }
  });
  const { data: hourlyActivity } = useQuery({
    queryKey: ["analytics_hourly"],
    queryFn: async () => {
      const today = startOfDay(/* @__PURE__ */ new Date()).toISOString();
      const { data } = await supabase.from("page_visits").select("created_at").gte("created_at", today);
      const hourCounts = new Array(24).fill(0);
      data == null ? void 0 : data.forEach((v) => {
        const hour = new Date(v.created_at).getHours();
        hourCounts[hour]++;
      });
      return hourCounts.map((count, i) => ({
        hour: `${i.toString().padStart(2, "0")}:00`,
        visits: count
      }));
    }
  });
  const { data: referrerChannels } = useQuery({
    queryKey: ["analytics_referrer_channels", timeRange],
    queryFn: async () => {
      const startDate = subDays(/* @__PURE__ */ new Date(), days).toISOString();
      const { data } = await supabase.from("page_visits").select("referrer, session_id").gte("created_at", startDate);
      const channels = /* @__PURE__ */ new Map();
      data == null ? void 0 : data.forEach((v) => {
        let channel = "Direct";
        if (v.referrer) {
          try {
            const url = new URL(v.referrer);
            if (url.hostname.includes("google") || url.hostname.includes("bing") || url.hostname.includes("yahoo")) {
              channel = "Search";
            } else if (url.hostname.includes("facebook") || url.hostname.includes("twitter") || url.hostname.includes("t.co") || url.hostname.includes("instagram") || url.hostname.includes("reddit")) {
              channel = "Social";
            } else {
              channel = "Referral";
            }
          } catch (e) {
            channel = "Direct";
          }
        }
        if (!channels.has(channel)) {
          channels.set(channel, /* @__PURE__ */ new Set());
        }
        channels.get(channel).add(v.session_id);
      });
      const colors = ["#8b5cf6", "#06b6d4", "#10b981", "#f59e0b", "#ef4444"];
      return Array.from(channels.entries()).map(([name, sessions], i) => ({
        name,
        value: sessions.size,
        color: colors[i % colors.length]
      })).sort((a, b) => b.value - a.value);
    }
  });
  const { data: sessionQuality } = useQuery({
    queryKey: ["analytics_session_quality", timeRange],
    queryFn: async () => {
      var _a2, _b2, _c2, _d;
      const startDate = subDays(/* @__PURE__ */ new Date(), days).toISOString();
      const [visitsResult, watchResult] = await Promise.all([
        supabase.from("page_visits").select("session_id").gte("created_at", startDate),
        supabase.from("watch_sessions").select("session_id, watch_duration_seconds").gte("created_at", startDate)
      ]);
      const sessionPageCounts = /* @__PURE__ */ new Map();
      (_a2 = visitsResult.data) == null ? void 0 : _a2.forEach((visit) => {
        const sessionId = String(visit.session_id || "").trim();
        if (!sessionId) return;
        sessionPageCounts.set(sessionId, (sessionPageCounts.get(sessionId) || 0) + 1);
      });
      const totalSessions = sessionPageCounts.size;
      const totalPageViews = ((_b2 = visitsResult.data) == null ? void 0 : _b2.length) || 0;
      const returningSessions = Array.from(sessionPageCounts.values()).filter((count) => count > 1).length;
      const returningRate = totalSessions > 0 ? Math.round(returningSessions / totalSessions * 100) : 0;
      const avgPagesPerSession = totalSessions > 0 ? Number((totalPageViews / totalSessions).toFixed(2)) : 0;
      const totalWatchSeconds = ((_c2 = watchResult.data) == null ? void 0 : _c2.reduce((acc, session) => acc + (session.watch_duration_seconds || 0), 0)) || 0;
      const watchSessionCount = ((_d = watchResult.data) == null ? void 0 : _d.length) || 0;
      const avgWatchMinutes = watchSessionCount > 0 ? Math.round(totalWatchSeconds / watchSessionCount / 60) : 0;
      return {
        totalSessions,
        totalPageViews,
        returningSessions,
        returningRate,
        avgPagesPerSession,
        avgWatchMinutes
      };
    }
  });
  const { data: topPages } = useQuery({
    queryKey: ["analytics_top_pages", timeRange],
    queryFn: async () => {
      const startDate = subDays(/* @__PURE__ */ new Date(), days).toISOString();
      const { data } = await supabase.from("page_visits").select("page_path, session_id").gte("created_at", startDate);
      const pathSessions = /* @__PURE__ */ new Map();
      data == null ? void 0 : data.forEach((visit) => {
        const sessionId = String(visit.session_id || "").trim();
        if (!sessionId) return;
        const rawPath = String(visit.page_path || "/").trim() || "/";
        const normalizedPath = rawPath.replace(/\?.*$/, "") || "/";
        if (!pathSessions.has(normalizedPath)) {
          pathSessions.set(normalizedPath, /* @__PURE__ */ new Set());
        }
        pathSessions.get(normalizedPath).add(sessionId);
      });
      return Array.from(pathSessions.entries()).map(([path, sessions]) => ({ path, sessions: sessions.size })).sort((a, b) => b.sessions - a.sessions).slice(0, 8);
    }
  });
  const { data: githubData } = useQuery({
    queryKey: ["analytics_github_releases"],
    staleTime: 5 * 60 * 1e3,
    queryFn: async () => {
      var _a2;
      const [releases, repo] = await Promise.all([fetchAllReleases(), fetchRepoStats()]);
      if (!releases || releases.length === 0) return null;
      const perRelease = releases.map((r) => ({
        version: r.tag_name.replace(/^v/i, ""),
        downloads: r.assets.reduce((s, a) => s + (a.download_count || 0), 0),
        date: (r.published_at || "").split("T")[0]
      }));
      const totalDownloads = perRelease.reduce((s, r) => s + r.downloads, 0);
      let mobileDownloads = 0;
      let mobileDownloadsDesktop = 0;
      const platform = /* @__PURE__ */ new Map();
      releases.forEach(
        (r) => r.assets.forEach((a) => {
          const k = platformForAsset(a.name);
          if (k) {
            platform.set(k, (platform.get(k) || 0) + (a.download_count || 0));
            if (k === "android" || k === "ios") mobileDownloads += a.download_count || 0;
            else mobileDownloadsDesktop += a.download_count || 0;
          }
        })
      );
      const colors = ["#8b5cf6", "#06b6d4", "#10b981", "#f59e0b"];
      const perPlatform = Array.from(platform.entries()).map(([name, value], i) => ({ name, value, color: colors[i % colors.length] })).sort((a, b) => b.value - a.value);
      return {
        totalDownloads,
        mobileDownloads,
        desktopDownloads: mobileDownloadsDesktop,
        stars: (repo == null ? void 0 : repo.stargazers_count) || 0,
        forks: (repo == null ? void 0 : repo.forks_count) || 0,
        latestVersion: ((_a2 = perRelease[0]) == null ? void 0 : _a2.version) || "N/A",
        perRelease: perRelease.slice(0, 10).reverse(),
        perPlatform
      };
    }
  });
  const formatWatchTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor(seconds % 3600 / 60);
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m`;
  };
  const statCards = [
    {
      title: "Total Users",
      value: (totalUsers == null ? void 0 : totalUsers.toLocaleString()) || "0",
      subtitle: "Registered accounts",
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-5 h-5" }),
      color: "from-blue-500 to-blue-700"
    },
    {
      title: "Total Visitors",
      value: (totalVisitors == null ? void 0 : totalVisitors.toLocaleString()) || "0",
      subtitle: `${(visitorBreakdown == null ? void 0 : visitorBreakdown.guests) || 0} guests, ${(visitorBreakdown == null ? void 0 : visitorBreakdown.loggedIn) || 0} logged in`,
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-5 h-5" }),
      color: "from-green-500 to-green-700"
    },
    {
      title: "Watch Time",
      value: formatWatchTime(totalWatchTime || 0),
      subtitle: `Last ${days} days`,
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-5 h-5" }),
      color: "from-purple-500 to-purple-700"
    },
    {
      title: "DAU (Today)",
      value: (((_a = dailyStats == null ? void 0 : dailyStats[dailyStats.length - 1]) == null ? void 0 : _a.dau) || 0).toLocaleString(),
      subtitle: "Daily Active Users",
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "w-5 h-5" }),
      color: "from-pink-500 to-rose-700"
    },
    {
      title: "Top Country",
      value: ((_b = topCountries2 == null ? void 0 : topCountries2[0]) == null ? void 0 : _b.name) || "N/A",
      subtitle: `${((_c = topCountries2 == null ? void 0 : topCountries2[0]) == null ? void 0 : _c.value) || 0} visitors`,
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { className: "w-5 h-5" }),
      color: "from-orange-500 to-orange-700"
    },
    {
      title: "Page Depth",
      value: String((sessionQuality == null ? void 0 : sessionQuality.avgPagesPerSession) || 0),
      subtitle: "Avg pages per session",
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ChartColumn, { className: "w-5 h-5" }),
      color: "from-cyan-500 to-cyan-700"
    },
    {
      title: "Returning Sessions",
      value: `${(sessionQuality == null ? void 0 : sessionQuality.returningRate) || 0}%`,
      subtitle: `${(sessionQuality == null ? void 0 : sessionQuality.returningSessions) || 0} repeat sessions`,
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-5 h-5" }),
      color: "from-emerald-500 to-emerald-700"
    },
    {
      title: "Avg Watch Session",
      value: `${(sessionQuality == null ? void 0 : sessionQuality.avgWatchMinutes) || 0}m`,
      subtitle: "Per watch session",
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "w-5 h-5" }),
      color: "from-violet-500 to-violet-700"
    }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-xl font-semibold flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ChartColumn, { className: "w-5 h-5 text-primary" }),
        "Analytics Overview"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 bg-muted/50 p-1 rounded-xl", children: ["day", "week", "month"].map((range) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => setTimeRange(range),
          className: `px-4 py-2 rounded-lg text-sm font-medium transition-all ${timeRange === range ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`,
          children: range.charAt(0).toUpperCase() + range.slice(1)
        },
        range
      )) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4", children: statCards.map((stat, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { delay: index * 0.1 },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassPanel, { className: `p-5 bg-gradient-to-br ${stat.color} border-0`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 rounded-xl bg-white/20", children: stat.icon }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { className: "w-4 h-4 text-white/70" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold text-white", children: stat.value }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-white/70", children: stat.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-white/50 mt-1", children: stat.subtitle })
          ] })
        ] })
      },
      stat.title
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassPanel, { className: "p-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-medium mb-4 flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-4 h-4 text-primary" }),
          "Visitor Trends"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-64", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AreaChart, { data: dailyStats || [], children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("defs", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: "visitorsGrad", x1: "0", y1: "0", x2: "0", y2: "1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "5%", stopColor: "hsl(var(--primary))", stopOpacity: 0.3 }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "95%", stopColor: "hsl(var(--primary))", stopOpacity: 0 })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "hsl(var(--border))" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { dataKey: "date", stroke: "hsl(var(--muted-foreground))", fontSize: 12 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, { stroke: "hsl(var(--muted-foreground))", fontSize: 12 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Tooltip,
            {
              contentStyle: {
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px"
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Area,
            {
              type: "monotone",
              dataKey: "visitors",
              stroke: "hsl(var(--primary))",
              fill: "url(#visitorsGrad)",
              strokeWidth: 2,
              name: "Visitors"
            }
          )
        ] }) }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassPanel, { className: "p-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-medium mb-4 flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ChartPie, { className: "w-4 h-4 text-primary" }),
          "Most Watched Genres"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-64 flex items-center", children: topGenres && topGenres.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "50%", height: "100%", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(PieChart, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Pie,
              {
                data: topGenres,
                cx: "50%",
                cy: "50%",
                innerRadius: 50,
                outerRadius: 90,
                paddingAngle: 3,
                dataKey: "value",
                children: topGenres.map((entry, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(Cell, { fill: entry.color }, index))
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, {})
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2 flex-1", children: topGenres.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-3 h-3 rounded-full", style: { backgroundColor: item.color } }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm flex-1", children: item.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
              item.value,
              "m"
            ] })
          ] }, item.name)) })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full text-center text-muted-foreground", children: "No genre data yet" }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassPanel, { className: "p-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-medium mb-4 flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-4 h-4 text-primary" }),
          "Top Countries"
        ] }),
        topCountries2 && topCountries2.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: topCountries2.map((country, index) => {
          var _a2;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary", children: index + 1 }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-1 font-medium", children: country.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2 bg-muted rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                initial: { width: 0 },
                animate: { width: `${country.value / (((_a2 = topCountries2[0]) == null ? void 0 : _a2.value) || 1) * 100}%` },
                className: "h-full bg-primary rounded-full"
              }
            ) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-muted-foreground w-20 text-right", children: [
              country.value,
              " visitors"
            ] })
          ] }, country.name);
        }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center py-8 text-muted-foreground", children: "No country data yet" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassPanel, { className: "p-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-medium mb-4 flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { className: "w-4 h-4 text-primary" }),
          "Acquisition Channels"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-48 flex items-center", children: referrerChannels && referrerChannels.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "50%", height: "100%", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(PieChart, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Pie,
              {
                data: referrerChannels,
                cx: "50%",
                cy: "50%",
                innerRadius: 40,
                outerRadius: 70,
                paddingAngle: 2,
                dataKey: "value",
                children: referrerChannels.map((entry, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(Cell, { fill: entry.color }, index))
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, {})
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2 flex-1", children: referrerChannels.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-3 h-3 rounded-full", style: { backgroundColor: item.color } }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs flex-1", children: item.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: item.value })
          ] }, item.name)) })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center w-full text-muted-foreground", children: "No acquisition data yet" }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassPanel, { className: "p-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-medium mb-4 flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "w-4 h-4 text-primary" }),
          "Hourly Traffic Pattern"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-64", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(BarChart, { data: hourlyActivity || [], children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "hsl(var(--border))" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { dataKey: "hour", stroke: "hsl(var(--muted-foreground))", fontSize: 11, interval: 2 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, { stroke: "hsl(var(--muted-foreground))", fontSize: 12 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Tooltip,
            {
              contentStyle: {
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px"
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Bar, { dataKey: "visits", fill: "hsl(var(--primary))", radius: [6, 6, 0, 0], name: "Visits" })
        ] }) }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassPanel, { className: "p-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-medium mb-4 flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-4 h-4 text-primary" }),
          "Most Visited Paths"
        ] }),
        topPages && topPages.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: topPages.map((entry) => {
          var _a2;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium truncate", children: entry.path }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground shrink-0", children: [
                entry.sessions,
                " sessions"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2 bg-muted rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                initial: { width: 0 },
                animate: { width: `${entry.sessions / (((_a2 = topPages[0]) == null ? void 0 : _a2.sessions) || 1) * 100}%` },
                className: "h-full bg-primary rounded-full"
              }
            ) })
          ] }, entry.path);
        }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-64 flex items-center justify-center text-muted-foreground", children: "No page path data yet" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassPanel, { className: "p-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-medium mb-4 flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-4 h-4 text-primary" }),
          "User Engagement %"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-64", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AreaChart, { data: dailyStats || [], children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "hsl(var(--border))" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { dataKey: "date", stroke: "hsl(var(--muted-foreground))", fontSize: 12 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, { stroke: "hsl(var(--muted-foreground))", fontSize: 12, unit: "%" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Area, { type: "monotone", dataKey: "retention", stroke: "#10b981", fill: "#10b981", fillOpacity: 0.2, name: "Logged-in Ratio" })
        ] }) }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassPanel, { className: "p-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-medium mb-4 flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "w-4 h-4 text-primary" }),
          "Daily Watch Time"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-64", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AreaChart, { data: dailyStats || [], children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "hsl(var(--border))" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { dataKey: "date", stroke: "hsl(var(--muted-foreground))", fontSize: 12 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, { stroke: "hsl(var(--muted-foreground))", fontSize: 12, unit: "m" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Area, { type: "monotone", dataKey: "watchTime", stroke: "#8b5cf6", fill: "#8b5cf6", fillOpacity: 0.2, name: "Watch Mins" })
        ] }) }) })
      ] })
    ] }),
    githubData && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Github, { className: "w-5 h-5 text-primary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-semibold", children: "GitHub Releases & Downloads" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "a",
          {
            href: GITHUB_REPO_URL,
            target: "_blank",
            rel: "noopener noreferrer",
            className: "text-xs text-muted-foreground hover:text-primary transition-colors ml-1",
            children: "snozxyx/tatakai ↗"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 lg:grid-cols-5 gap-4", children: [
        { icon: Download, label: "Total Downloads", value: formatCompact(githubData.totalDownloads), color: "text-violet-400" },
        { icon: Smartphone, label: "Mobile Downloads", value: formatCompact(githubData.mobileDownloads), color: "text-emerald-400" },
        { icon: Monitor, label: "Desktop Downloads", value: formatCompact(githubData.desktopDownloads), color: "text-blue-400" },
        { icon: Star, label: "GitHub Stars", value: formatCompact(githubData.stars), color: "text-amber-400" },
        { icon: TrendingUp, label: "Latest Version", value: `v${githubData.latestVersion}`, color: "text-emerald-400" }
      ].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassPanel, { className: "p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: s.label }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(s.icon, { className: `w-4 h-4 ${s.color}` })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-bold", children: s.value })
      ] }, s.label)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassPanel, { className: "p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-medium mb-4 flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ChartColumn, { className: "w-4 h-4 text-primary" }),
            "Downloads per Release"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-64", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(BarChart, { data: githubData.perRelease, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "hsl(var(--border))" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { dataKey: "version", stroke: "hsl(var(--muted-foreground))", fontSize: 12 }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, { stroke: "hsl(var(--muted-foreground))", fontSize: 12 }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { formatter: (v) => [v.toLocaleString(), "Downloads"] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Bar, { dataKey: "downloads", fill: "#8b5cf6", radius: [4, 4, 0, 0], name: "Downloads" })
          ] }) }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassPanel, { className: "p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-medium mb-4 flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ChartPie, { className: "w-4 h-4 text-primary" }),
            "Downloads by Platform"
          ] }),
          githubData.perPlatform.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-56 flex-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(PieChart, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Pie,
                {
                  data: githubData.perPlatform,
                  dataKey: "value",
                  nameKey: "name",
                  cx: "50%",
                  cy: "50%",
                  innerRadius: 50,
                  outerRadius: 80,
                  paddingAngle: 2,
                  children: githubData.perPlatform.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx(Cell, { fill: p.color }, p.name))
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { formatter: (v) => [v.toLocaleString(), "Downloads"] })
            ] }) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: githubData.perPlatform.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-3 h-3 rounded-sm", style: { background: p.color } }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "capitalize text-muted-foreground", children: p.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold ml-auto", children: formatCompact(p.value) })
            ] }, p.name)) })
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-56 flex items-center justify-center text-sm text-muted-foreground", children: "No platform-tagged assets found" })
        ] })
      ] })
    ] })
  ] });
}
const SEVERITY_COLORS = {
  minor: "bg-yellow-500/20 text-yellow-500 border-yellow-500/50",
  major: "bg-orange-500/20 text-orange-500 border-orange-500/50",
  critical: "bg-red-500/20 text-red-500 border-red-500/50"
};
const STATUS_COLORS = {
  investigating: "bg-red-500/20 text-red-500",
  identified: "bg-orange-500/20 text-orange-500",
  monitoring: "bg-blue-500/20 text-blue-500",
  resolved: "bg-green-500/20 text-green-500"
};
const SERVICES = [
  "Tatakai Website",
  "Video Streaming",
  "API Services",
  "Authentication",
  "Database",
  "Search"
];
function IncidentManager() {
  const [showForm, setShowForm] = reactExports.useState(false);
  const [expandedId, setExpandedId] = reactExports.useState(null);
  const [newIncident, setNewIncident] = reactExports.useState({
    title: "",
    description: "",
    status: "investigating",
    severity: "minor",
    affected_services: []
  });
  const [updateMessage, setUpdateMessage] = reactExports.useState("");
  const { data: incidents = [], isLoading } = useStatusIncidents(false);
  const createIncident = useCreateIncident();
  const updateIncident = useUpdateIncident();
  const handleCreate = async () => {
    if (!newIncident.title.trim() || !newIncident.description.trim()) {
      ue.error("Please fill in title and description");
      return;
    }
    try {
      await createIncident.mutateAsync(newIncident);
      ue.success("Incident created");
      setShowForm(false);
      setNewIncident({
        title: "",
        description: "",
        status: "investigating",
        severity: "minor",
        affected_services: []
      });
    } catch (error) {
      ue.error("Failed to create incident");
    }
  };
  const handleStatusUpdate = async (incident, newStatus) => {
    try {
      await updateIncident.mutateAsync({
        incidentId: incident.id,
        updates: { status: newStatus },
        updateMessage: updateMessage || `Status changed to ${newStatus}`
      });
      ue.success("Incident updated");
      setUpdateMessage("");
    } catch (error) {
      ue.error("Failed to update incident");
    }
  };
  const toggleService = (service) => {
    setNewIncident((prev) => ({
      ...prev,
      affected_services: prev.affected_services.includes(service) ? prev.affected_services.filter((s) => s !== service) : [...prev.affected_services, service]
    }));
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-xl font-semibold flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-5 h-5 text-primary" }),
        "Status Page Incidents"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: () => setShowForm(true), className: "gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
        "New Incident"
      ] })
    ] }),
    showForm && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 rounded-xl bg-muted/30 border border-muted space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-medium", children: "Create New Incident" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setShowForm(false), className: "text-muted-foreground hover:text-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-5 h-5" }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium mb-2 block", children: "Title" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              value: newIncident.title,
              onChange: (e) => setNewIncident((prev) => ({ ...prev, title: e.target.value })),
              placeholder: "e.g., Video streaming degraded performance",
              className: "bg-muted/50"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium mb-2 block", children: "Description" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              value: newIncident.description,
              onChange: (e) => setNewIncident((prev) => ({ ...prev, description: e.target.value })),
              placeholder: "Describe the incident...",
              className: "bg-muted/50"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium mb-2 block", children: "Severity" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2", children: ["minor", "major", "critical"].map((severity) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                onClick: () => setNewIncident((prev) => ({ ...prev, severity })),
                className: `px-3 py-1.5 rounded-lg text-sm font-medium border transition-all ${newIncident.severity === severity ? SEVERITY_COLORS[severity] : "border-muted text-muted-foreground hover:border-foreground/30"}`,
                children: severity.charAt(0).toUpperCase() + severity.slice(1)
              },
              severity
            )) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium mb-2 block", children: "Status" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 flex-wrap", children: ["investigating", "identified", "monitoring"].map((status) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                onClick: () => setNewIncident((prev) => ({ ...prev, status })),
                className: `px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${newIncident.status === status ? STATUS_COLORS[status] : "bg-muted/30 text-muted-foreground hover:bg-muted/50"}`,
                children: status.charAt(0).toUpperCase() + status.slice(1)
              },
              status
            )) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium mb-2 block", children: "Affected Services" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: SERVICES.map((service) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: () => toggleService(service),
              className: `px-3 py-1.5 rounded-lg text-sm transition-all ${newIncident.affected_services.includes(service) ? "bg-primary text-primary-foreground" : "bg-muted/30 text-muted-foreground hover:bg-muted/50"}`,
              children: service
            },
            service
          )) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            onClick: handleCreate,
            disabled: createIncident.isPending,
            className: "gap-2",
            children: [
              createIncident.isPending && /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin" }),
              "Create Incident"
            ]
          }
        )
      ] })
    ] }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center py-12 text-muted-foreground", children: "Loading..." }) : incidents.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-12 h-12 mx-auto text-green-500 mb-4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "No incidents reported" })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: incidents.map((incident) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: `p-4 rounded-xl border transition-all ${incident.is_active ? "border-orange-500/50 bg-orange-500/5" : "border-muted bg-muted/10"}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `px-2 py-0.5 rounded-full text-xs font-bold ${SEVERITY_COLORS[incident.severity]}`, children: incident.severity.toUpperCase() }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `px-2 py-0.5 rounded-full text-xs font-medium ${STATUS_COLORS[incident.status]}`, children: incident.status }),
                incident.is_active && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-2 py-0.5 rounded-full bg-red-500/20 text-red-500 text-xs font-bold", children: "ACTIVE" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-lg", children: incident.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: incident.description }),
              incident.affected_services.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1 mt-2", children: incident.affected_services.map((service) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-2 py-0.5 rounded-full bg-muted/50 text-xs", children: service }, service)) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-2", children: [
                "Created ",
                formatDistanceToNow(new Date(incident.created_at), { addSuffix: true })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                onClick: () => setExpandedId(expandedId === incident.id ? null : incident.id),
                className: "text-muted-foreground hover:text-foreground",
                children: expandedId === incident.id ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { className: "w-5 h-5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "w-5 h-5" })
              }
            )
          ] }),
          expandedId === incident.id && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 pt-4 border-t border-muted space-y-4", children: [
            incident.updates && incident.updates.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-sm font-medium", children: "Updates" }),
              incident.updates.map((update) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pl-4 border-l-2 border-muted", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: update.message }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                  "Status: ",
                  update.status,
                  " • ",
                  formatDistanceToNow(new Date(update.created_at), { addSuffix: true })
                ] })
              ] }, update.id))
            ] }),
            incident.is_active && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-sm font-medium", children: "Update Status" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  value: updateMessage,
                  onChange: (e) => setUpdateMessage(e.target.value),
                  placeholder: "Update message...",
                  className: "flex-1 bg-muted/50"
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 flex-wrap", children: ["investigating", "identified", "monitoring", "resolved"].map((status) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  size: "sm",
                  variant: status === "resolved" ? "default" : "outline",
                  onClick: () => handleStatusUpdate(incident, status),
                  disabled: updateIncident.isPending,
                  children: [
                    status === "resolved" && /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-3 h-3 mr-1" }),
                    status.charAt(0).toUpperCase() + status.slice(1)
                  ]
                },
                status
              )) })
            ] })
          ] })
        ]
      },
      incident.id
    )) })
  ] });
}
const POPUP_TYPES = [
  { value: "banner", label: "Banner", description: "Top of page notification bar" },
  { value: "modal", label: "Modal", description: "Center screen popup" },
  { value: "toast", label: "Toast", description: "Small notification corner" },
  { value: "fullscreen", label: "Fullscreen", description: "Full page overlay" }
];
const USER_TYPES = [
  { value: "all", label: "All Users" },
  { value: "guests", label: "Guests Only" },
  { value: "logged_in", label: "Logged In Only" },
  { value: "premium", label: "Premium Only" }
];
const FREQUENCIES = [
  { value: "once", label: "Once" },
  { value: "always", label: "Always" },
  { value: "daily", label: "Daily" },
  { value: "weekly", label: "Weekly" }
];
function PopupBuilder() {
  const confirm = useConfirm();
  const [showForm, setShowForm] = reactExports.useState(false);
  const [editingPopup, setEditingPopup] = reactExports.useState(null);
  const [newPageInput, setNewPageInput] = reactExports.useState("");
  const [formData, setFormData] = reactExports.useState({
    title: "",
    content: "",
    popup_type: "banner",
    background_color: "#1B1919",
    text_color: "#FFFFFF",
    accent_color: "#FF1493",
    image_url: "",
    action_text: "",
    action_url: "",
    dismiss_text: "Dismiss",
    target_pages: [],
    target_user_type: "all",
    show_on_mobile: true,
    show_on_desktop: true,
    start_date: "",
    end_date: "",
    frequency: "once",
    priority: 1,
    is_active: true,
    use_theme_colors: false
  });
  const { data: popups = [], isLoading } = useAdminPopups();
  const createPopup = useCreatePopup();
  const updatePopup = useUpdatePopup();
  const deletePopup = useDeletePopup();
  const resetForm = () => {
    setFormData({
      title: "",
      content: "",
      popup_type: "banner",
      background_color: "#1B1919",
      text_color: "#FFFFFF",
      accent_color: "#FF1493",
      image_url: "",
      action_text: "",
      action_url: "",
      dismiss_text: "Dismiss",
      target_pages: [],
      target_user_type: "all",
      show_on_mobile: true,
      show_on_desktop: true,
      start_date: "",
      end_date: "",
      frequency: "once",
      priority: 1,
      is_active: true,
      use_theme_colors: false
    });
    setEditingPopup(null);
  };
  const handleEdit = (popup) => {
    setFormData({
      title: popup.title,
      content: popup.content || "",
      popup_type: popup.popup_type,
      background_color: popup.background_color,
      text_color: popup.text_color,
      accent_color: popup.accent_color,
      image_url: popup.image_url || "",
      action_text: popup.action_text || "",
      action_url: popup.action_url || "",
      dismiss_text: popup.dismiss_text,
      target_pages: popup.target_pages,
      target_user_type: popup.target_user_type,
      show_on_mobile: popup.show_on_mobile,
      show_on_desktop: popup.show_on_desktop,
      start_date: popup.start_date ? popup.start_date.split("T")[0] : "",
      end_date: popup.end_date ? popup.end_date.split("T")[0] : "",
      frequency: popup.frequency,
      priority: popup.priority,
      is_active: popup.is_active,
      use_theme_colors: popup.use_theme_colors || false
    });
    setEditingPopup(popup);
    setShowForm(true);
  };
  const handleSave = async () => {
    if (!formData.title.trim()) {
      ue.error("Please enter a title");
      return;
    }
    try {
      const data = {
        ...formData,
        start_date: formData.start_date && !isNaN(new Date(formData.start_date).getTime()) ? new Date(formData.start_date).toISOString() : null,
        end_date: formData.end_date && !isNaN(new Date(formData.end_date).getTime()) ? new Date(formData.end_date).toISOString() : null,
        content: formData.content || null,
        image_url: formData.image_url || null,
        action_text: formData.action_text || null,
        action_url: formData.action_url || null
      };
      if (editingPopup) {
        await updatePopup.mutateAsync({ id: editingPopup.id, updates: data });
        ue.success("Popup updated");
      } else {
        await createPopup.mutateAsync(data);
        ue.success("Popup created");
      }
      setShowForm(false);
      resetForm();
    } catch (error) {
      ue.error("Failed to save popup");
    }
  };
  const handleDelete = async (id) => {
    if (!await confirm({ title: "Are you sure you want to delete this popup?", destructive: true })) return;
    try {
      await deletePopup.mutateAsync(id);
      ue.success("Popup deleted");
    } catch (error) {
      ue.error("Failed to delete popup");
    }
  };
  const handleToggleActive = async (popup) => {
    try {
      await updatePopup.mutateAsync({
        id: popup.id,
        updates: { is_active: !popup.is_active }
      });
      ue.success(popup.is_active ? "Popup deactivated" : "Popup activated");
    } catch (error) {
      ue.error("Failed to update popup");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-xl font-semibold flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Megaphone, { className: "w-5 h-5 text-primary" }),
        "Popup Builder"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: () => {
        resetForm();
        setShowForm(true);
      }, className: "gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
        "New Popup"
      ] })
    ] }),
    showForm && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 rounded-xl bg-muted/30 border border-muted space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-medium", children: editingPopup ? "Edit Popup" : "Create New Popup" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => {
          setShowForm(false);
          resetForm();
        }, className: "text-muted-foreground hover:text-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-5 h-5" }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium mb-2 block", children: "Title *" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                value: formData.title,
                onChange: (e) => setFormData((prev) => ({ ...prev, title: e.target.value })),
                placeholder: "Popup title",
                className: "bg-muted/50"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium mb-2 block", children: "Content" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Textarea,
              {
                value: formData.content,
                onChange: (e) => setFormData((prev) => ({ ...prev, content: e.target.value })),
                placeholder: "Popup content...",
                className: "bg-muted/50"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium mb-2 block", children: "Popup Type" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-2", children: POPUP_TYPES.map((type) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                onClick: () => setFormData((prev) => ({ ...prev, popup_type: type.value })),
                className: `p-3 rounded-lg border text-left transition-all ${formData.popup_type === type.value ? "border-primary bg-primary/10" : "border-muted hover:border-foreground/30"}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-sm", children: type.label }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: type.description })
                ]
              },
              type.value
            )) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium mb-2 block", children: "Background" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    type: "color",
                    value: formData.background_color,
                    onChange: (e) => setFormData((prev) => ({ ...prev, background_color: e.target.value })),
                    className: "w-10 h-10 rounded cursor-pointer"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    value: formData.background_color,
                    onChange: (e) => setFormData((prev) => ({ ...prev, background_color: e.target.value })),
                    className: "bg-muted/50"
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium mb-2 block", children: "Text" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    type: "color",
                    value: formData.text_color,
                    onChange: (e) => setFormData((prev) => ({ ...prev, text_color: e.target.value })),
                    className: "w-10 h-10 rounded cursor-pointer"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    value: formData.text_color,
                    onChange: (e) => setFormData((prev) => ({ ...prev, text_color: e.target.value })),
                    className: "bg-muted/50"
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium mb-2 block", children: "Accent" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    type: "color",
                    value: formData.accent_color,
                    onChange: (e) => setFormData((prev) => ({ ...prev, accent_color: e.target.value })),
                    className: "w-10 h-10 rounded cursor-pointer"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    value: formData.accent_color,
                    onChange: (e) => setFormData((prev) => ({ ...prev, accent_color: e.target.value })),
                    className: "bg-muted/50"
                  }
                )
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium mb-2 block", children: "Target Pages (Empty for all)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 mb-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  value: newPageInput,
                  onChange: (e) => setNewPageInput(e.target.value),
                  placeholder: "e.g. /watch or anime/*",
                  className: "bg-muted/50"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  type: "button",
                  variant: "outline",
                  size: "sm",
                  onClick: () => {
                    if (newPageInput && !formData.target_pages.includes(newPageInput)) {
                      setFormData((prev) => ({
                        ...prev,
                        target_pages: [...prev.target_pages, newPageInput]
                      }));
                      setNewPageInput("");
                    }
                  },
                  children: "Add"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: formData.target_pages.map((page) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "secondary", className: "gap-1 pl-2 pr-1", children: [
              page,
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  onClick: () => setFormData((prev) => ({
                    ...prev,
                    target_pages: prev.target_pages.filter((p) => p !== page)
                  })),
                  className: "hover:text-destructive",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3 h-3" })
                }
              )
            ] }, page)) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium mb-2 block", children: "Image URL" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                value: formData.image_url,
                onChange: (e) => setFormData((prev) => ({ ...prev, image_url: e.target.value })),
                placeholder: "https://...",
                className: "bg-muted/50"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium mb-2 block", children: "Action Button Text" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  value: formData.action_text,
                  onChange: (e) => setFormData((prev) => ({ ...prev, action_text: e.target.value })),
                  placeholder: "Learn More",
                  className: "bg-muted/50"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium mb-2 block", children: "Action URL" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  value: formData.action_url,
                  onChange: (e) => setFormData((prev) => ({ ...prev, action_url: e.target.value })),
                  placeholder: "/page or https://...",
                  className: "bg-muted/50"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium mb-2 block", children: "Target Users" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 flex-wrap", children: USER_TYPES.map((type) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                onClick: () => setFormData((prev) => ({ ...prev, target_user_type: type.value })),
                className: `px-3 py-1.5 rounded-lg text-sm transition-all ${formData.target_user_type === type.value ? "bg-primary text-primary-foreground" : "bg-muted/30 text-muted-foreground hover:bg-muted/50"}`,
                children: type.label
              },
              type.value
            )) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium mb-2 block", children: "Frequency" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 flex-wrap", children: FREQUENCIES.map((freq) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                onClick: () => setFormData((prev) => ({ ...prev, frequency: freq.value })),
                className: `px-3 py-1.5 rounded-lg text-sm transition-all ${formData.frequency === freq.value ? "bg-primary text-primary-foreground" : "bg-muted/30 text-muted-foreground hover:bg-muted/50"}`,
                children: freq.label
              },
              freq.value
            )) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium mb-2 block", children: "Start Date" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  type: "date",
                  value: formData.start_date,
                  onChange: (e) => setFormData((prev) => ({ ...prev, start_date: e.target.value })),
                  className: "bg-muted/50"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium mb-2 block", children: "End Date" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  type: "date",
                  value: formData.end_date,
                  onChange: (e) => setFormData((prev) => ({ ...prev, end_date: e.target.value })),
                  className: "bg-muted/50"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Switch,
                {
                  checked: formData.show_on_desktop,
                  onCheckedChange: (checked) => setFormData((prev) => ({ ...prev, show_on_desktop: checked }))
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Monitor, { className: "w-4 h-4" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", children: "Desktop" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Switch,
                {
                  checked: formData.show_on_mobile,
                  onCheckedChange: (checked) => setFormData((prev) => ({ ...prev, show_on_mobile: checked }))
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Smartphone, { className: "w-4 h-4" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", children: "Mobile" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Switch,
                {
                  checked: formData.is_active,
                  onCheckedChange: (checked) => setFormData((prev) => ({ ...prev, is_active: checked }))
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", children: "Active" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Switch,
                {
                  checked: formData.use_theme_colors,
                  onCheckedChange: (checked) => setFormData((prev) => ({ ...prev, use_theme_colors: checked }))
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", children: "Themed" })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium mb-2 block", children: "Preview" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "p-4 rounded-lg border",
            style: {
              backgroundColor: formData.background_color,
              color: formData.text_color,
              borderColor: formData.accent_color
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold", children: formData.title || "Popup Title" }),
              formData.content && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm mt-1 opacity-80", children: formData.content }),
              formData.action_text && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  className: "mt-3 px-4 py-2 rounded-lg text-sm font-medium",
                  style: { backgroundColor: formData.accent_color, color: formData.text_color },
                  children: formData.action_text
                }
              )
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: handleSave, disabled: createPopup.isPending || updatePopup.isPending, className: "gap-2 flex-1 md:flex-none justify-center", children: [
          (createPopup.isPending || updatePopup.isPending) && /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin" }),
          editingPopup ? "Update Popup" : "Create Popup"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", onClick: () => {
          setShowForm(false);
          resetForm();
        }, className: "flex-1 md:flex-none justify-center", children: "Cancel" })
      ] })
    ] }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center py-12 text-muted-foreground", children: "Loading..." }) : popups.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Megaphone, { className: "w-12 h-12 mx-auto text-muted-foreground mb-4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "No popups created yet" })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: popups.map((popup) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: `p-4 rounded-xl border transition-all ${popup.is_active ? "border-primary/50" : "border-muted opacity-60"}`,
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-2 py-0.5 rounded-full bg-muted text-xs font-medium", children: popup.popup_type }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-2 py-0.5 rounded-full bg-muted text-xs", children: popup.frequency }),
              popup.is_active ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-2 py-0.5 rounded-full bg-green-500/20 text-green-500 text-xs font-bold", children: "ACTIVE" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-2 py-0.5 rounded-full bg-muted text-muted-foreground text-xs", children: "INACTIVE" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold", children: popup.title }),
            popup.content && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1 line-clamp-2", children: popup.content }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-2", children: [
              "Created ",
              formatDistanceToNow(new Date(popup.created_at), { addSuffix: true })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "ghost",
                size: "sm",
                onClick: () => handleToggleActive(popup),
                children: popup.is_active ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "w-4 h-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-4 h-4" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "ghost",
                size: "sm",
                onClick: () => handleEdit(popup),
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pen, { className: "w-4 h-4" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "ghost",
                size: "sm",
                onClick: () => handleDelete(popup.id),
                className: "text-destructive hover:text-destructive",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-4 h-4" })
              }
            )
          ] })
        ] })
      },
      popup.id
    )) })
  ] });
}
function ChangelogManager() {
  const confirm = useConfirm();
  const [showForm, setShowForm] = reactExports.useState(false);
  const [editingChangelog, setEditingChangelog] = reactExports.useState(null);
  const [formData, setFormData] = reactExports.useState({
    version: "",
    release_date: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
    title: "",
    changes: [""],
    is_published: false,
    is_latest: false
  });
  const { data: changelogs = [], isLoading } = useAdminChangelog();
  const createChangelog = useCreateChangelog();
  const updateChangelog = useUpdateChangelog();
  const deleteChangelog = useDeleteChangelog();
  const resetForm = () => {
    setFormData({
      version: "",
      release_date: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
      title: "",
      changes: [""],
      is_published: false,
      is_latest: false
    });
    setEditingChangelog(null);
  };
  const handleEdit = (changelog) => {
    setFormData({
      version: changelog.version,
      release_date: changelog.release_date,
      title: changelog.title || "",
      changes: changelog.changes.length > 0 ? changelog.changes : [""],
      is_published: changelog.is_published,
      is_latest: changelog.is_latest
    });
    setEditingChangelog(changelog);
    setShowForm(true);
  };
  const handleSave = async () => {
    if (!formData.version.trim()) {
      ue.error("Please enter a version");
      return;
    }
    if (formData.changes.filter((c) => c.trim()).length === 0) {
      ue.error("Please add at least one change");
      return;
    }
    try {
      const data = {
        version: formData.version,
        release_date: formData.release_date,
        title: formData.title || void 0,
        changes: formData.changes.filter((c) => c.trim()),
        is_published: formData.is_published,
        is_latest: formData.is_latest
      };
      if (editingChangelog) {
        await updateChangelog.mutateAsync({ id: editingChangelog.id, updates: data });
        ue.success("Changelog updated");
      } else {
        await createChangelog.mutateAsync(data);
        ue.success("Changelog created");
      }
      setShowForm(false);
      resetForm();
    } catch (error) {
      ue.error("Failed to save changelog");
    }
  };
  const handleDelete = async (id) => {
    if (!await confirm({ title: "Are you sure you want to delete this changelog entry?", destructive: true })) return;
    try {
      await deleteChangelog.mutateAsync(id);
      ue.success("Changelog deleted");
    } catch (error) {
      ue.error("Failed to delete changelog");
    }
  };
  const handleTogglePublished = async (changelog) => {
    try {
      await updateChangelog.mutateAsync({
        id: changelog.id,
        updates: { is_published: !changelog.is_published }
      });
      ue.success(changelog.is_published ? "Changelog unpublished" : "Changelog published");
    } catch (error) {
      ue.error("Failed to update changelog");
    }
  };
  const addChange = () => {
    setFormData((prev) => ({ ...prev, changes: [...prev.changes, ""] }));
  };
  const updateChange = (index, value) => {
    setFormData((prev) => ({
      ...prev,
      changes: prev.changes.map((c, i) => i === index ? value : c)
    }));
  };
  const removeChange = (index) => {
    if (formData.changes.length <= 1) return;
    setFormData((prev) => ({
      ...prev,
      changes: prev.changes.filter((_, i) => i !== index)
    }));
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-xl font-semibold flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(History, { className: "w-5 h-5 text-primary" }),
        "Changelog Manager"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: () => {
        resetForm();
        setShowForm(true);
      }, className: "gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
        "New Release"
      ] })
    ] }),
    showForm && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 rounded-xl bg-muted/30 border border-muted space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-medium", children: editingChangelog ? "Edit Release" : "Create New Release" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => {
          setShowForm(false);
          resetForm();
        }, className: "text-muted-foreground hover:text-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-5 h-5" }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium mb-2 block", children: "Version *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              value: formData.version,
              onChange: (e) => setFormData((prev) => ({ ...prev, version: e.target.value })),
              placeholder: "e.g., 2.1.0",
              className: "bg-muted/50"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium mb-2 block", children: "Release Date" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              type: "date",
              value: formData.release_date,
              onChange: (e) => setFormData((prev) => ({ ...prev, release_date: e.target.value })),
              className: "bg-muted/50"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium mb-2 block", children: "Title (Optional)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              value: formData.title,
              onChange: (e) => setFormData((prev) => ({ ...prev, title: e.target.value })),
              placeholder: "e.g., Big Summer Update",
              className: "bg-muted/50"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium", children: "Changes *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "ghost", size: "sm", onClick: addChange, className: "gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-3 h-3" }),
            "Add Change"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: formData.changes.map((change, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              value: change,
              onChange: (e) => updateChange(index, e.target.value),
              placeholder: "Describe a change...",
              className: "bg-muted/50"
            }
          ),
          formData.changes.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "ghost",
              size: "sm",
              onClick: () => removeChange(index),
              className: "text-destructive hover:text-destructive",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
            }
          )
        ] }, index)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Switch,
            {
              checked: formData.is_published,
              onCheckedChange: (checked) => setFormData((prev) => ({ ...prev, is_published: checked }))
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", children: "Published" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Switch,
            {
              checked: formData.is_latest,
              onCheckedChange: (checked) => setFormData((prev) => ({ ...prev, is_latest: checked }))
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-4 h-4 text-yellow-500" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", children: "Latest Release" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            onClick: handleSave,
            disabled: createChangelog.isPending || updateChangelog.isPending,
            className: "gap-2",
            children: [
              (createChangelog.isPending || updateChangelog.isPending) && /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin" }),
              editingChangelog ? "Update" : "Create",
              " Release"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", onClick: () => {
          setShowForm(false);
          resetForm();
        }, children: "Cancel" })
      ] })
    ] }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center py-12 text-muted-foreground", children: "Loading..." }) : changelogs.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(History, { className: "w-12 h-12 mx-auto text-muted-foreground mb-4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "No changelog entries yet" })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: changelogs.map((changelog) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: `p-4 rounded-xl border transition-all ${changelog.is_latest ? "border-primary bg-primary/5" : changelog.is_published ? "border-muted" : "border-muted opacity-60"}`,
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: `px-2 py-0.5 rounded-md text-xs font-bold ${changelog.is_latest ? "bg-primary text-primary-foreground" : "bg-muted"}`, children: [
                "v",
                changelog.version
              ] }),
              changelog.is_latest && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "px-2 py-0.5 rounded-full bg-yellow-500/20 text-yellow-500 text-xs font-bold flex items-center gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-3 h-3" }),
                "LATEST"
              ] }),
              changelog.is_published ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-2 py-0.5 rounded-full bg-green-500/20 text-green-500 text-xs", children: "Published" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-2 py-0.5 rounded-full bg-muted text-muted-foreground text-xs", children: "Draft" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: format(new Date(changelog.release_date), "MMM dd, yyyy") })
            ] }),
            changelog.title && /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold mb-2", children: changelog.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-1", children: changelog.changes.map((change, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "text-sm text-muted-foreground flex items-start gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary mt-1", children: "•" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: change })
            ] }, i)) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "ghost",
                size: "sm",
                onClick: () => handleTogglePublished(changelog),
                title: changelog.is_published ? "Unpublish" : "Publish",
                children: changelog.is_published ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "w-4 h-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-4 h-4" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "ghost",
                size: "sm",
                onClick: () => handleEdit(changelog),
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pen, { className: "w-4 h-4" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "ghost",
                size: "sm",
                onClick: () => handleDelete(changelog.id),
                className: "text-destructive hover:text-destructive",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-4 h-4" })
              }
            )
          ] })
        ] })
      },
      changelog.id
    )) })
  ] });
}
function ContentModerationManager() {
  const queryClient = useQueryClient();
  const pinPost = usePinForumPost();
  const confirm = useConfirm();
  const [searchTerm, setSearchTerm] = reactExports.useState("");
  const [activeTab, setActiveTab] = reactExports.useState("forum");
  const { data: forumPosts = [], isLoading: loadingForum } = useQuery({
    queryKey: ["admin_forum_posts"],
    queryFn: async () => {
      const { data, error } = await supabase.from("forum_posts").select("*").order("created_at", { ascending: false }).limit(100);
      if (error) throw error;
      if (!data || data.length === 0) return [];
      const userIds = [...new Set(data.map((p) => p.user_id))];
      const { data: profiles } = await supabase.from("profiles").select("user_id, display_name, username").in("user_id", userIds);
      const profileMap = new Map((profiles == null ? void 0 : profiles.map((p) => [p.user_id, p])) || []);
      return data.map((p) => ({
        ...p,
        profile: profileMap.get(p.user_id)
      }));
    }
  });
  const { data: playlists = [], isLoading: loadingPlaylists } = useQuery({
    queryKey: ["admin_playlists"],
    queryFn: async () => {
      const { data, error } = await supabase.from("playlists").select("*").order("created_at", { ascending: false }).limit(100);
      if (error) throw error;
      if (!data || data.length === 0) return [];
      const userIds = [...new Set(data.map((p) => p.user_id))];
      const { data: profiles } = await supabase.from("profiles").select("user_id, display_name, username").in("user_id", userIds);
      const profileMap = new Map((profiles == null ? void 0 : profiles.map((p) => [p.user_id, p])) || []);
      return data.map((p) => ({
        ...p,
        profile: profileMap.get(p.user_id)
      }));
    }
  });
  const { data: tierLists = [], isLoading: loadingTierLists } = useQuery({
    queryKey: ["admin_tier_lists"],
    queryFn: async () => {
      const { data, error } = await supabase.from("tier_lists").select("*").order("created_at", { ascending: false }).limit(100);
      if (error) throw error;
      if (!data || data.length === 0) return [];
      const userIds = [...new Set(data.map((t) => t.user_id))];
      const { data: profiles } = await supabase.from("profiles").select("user_id, display_name, username").in("user_id", userIds);
      const profileMap = new Map((profiles == null ? void 0 : profiles.map((p) => [p.user_id, p])) || []);
      return data.map((t) => ({
        ...t,
        profile: profileMap.get(t.user_id)
      }));
    }
  });
  const deleteForumPost = useMutation({
    mutationFn: async (postId) => {
      const { error } = await supabase.from("forum_posts").delete().eq("id", postId);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin_forum_posts"] });
      ue.success("Forum post deleted");
    },
    onError: () => {
      ue.error("Failed to delete forum post");
    }
  });
  const deletePlaylist = useMutation({
    mutationFn: async (playlistId) => {
      const { error } = await supabase.from("playlists").delete().eq("id", playlistId);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin_playlists"] });
      ue.success("Playlist deleted");
    },
    onError: () => {
      ue.error("Failed to delete playlist");
    }
  });
  const deleteTierList = useMutation({
    mutationFn: async (tierListId) => {
      const { error } = await supabase.from("tier_lists").delete().eq("id", tierListId);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin_tier_lists"] });
      ue.success("Tier list deleted");
    },
    onError: () => {
      ue.error("Failed to delete tier list");
    }
  });
  const filteredForumPosts = forumPosts.filter(
    (p) => {
      var _a, _b, _c, _d;
      return ((_a = p.title) == null ? void 0 : _a.toLowerCase().includes(searchTerm.toLowerCase())) || ((_b = p.content) == null ? void 0 : _b.toLowerCase().includes(searchTerm.toLowerCase())) || ((_d = (_c = p.profile) == null ? void 0 : _c.username) == null ? void 0 : _d.toLowerCase().includes(searchTerm.toLowerCase()));
    }
  );
  const filteredPlaylists = playlists.filter(
    (p) => {
      var _a, _b, _c, _d;
      return ((_a = p.name) == null ? void 0 : _a.toLowerCase().includes(searchTerm.toLowerCase())) || ((_b = p.description) == null ? void 0 : _b.toLowerCase().includes(searchTerm.toLowerCase())) || ((_d = (_c = p.profile) == null ? void 0 : _c.username) == null ? void 0 : _d.toLowerCase().includes(searchTerm.toLowerCase()));
    }
  );
  const filteredTierLists = tierLists.filter(
    (t) => {
      var _a, _b, _c, _d;
      return ((_a = t.title) == null ? void 0 : _a.toLowerCase().includes(searchTerm.toLowerCase())) || ((_b = t.description) == null ? void 0 : _b.toLowerCase().includes(searchTerm.toLowerCase())) || ((_d = (_c = t.profile) == null ? void 0 : _c.username) == null ? void 0 : _d.toLowerCase().includes(searchTerm.toLowerCase()));
    }
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-xl font-semibold flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-5 h-5 text-primary" }),
        "Content Moderation"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-64", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            placeholder: "Search content...",
            value: searchTerm,
            onChange: (e) => setSearchTerm(e.target.value),
            className: "pl-10 bg-muted/50"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { value: activeTab, onValueChange: setActiveTab, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "bg-muted/30", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "forum", className: "gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "w-4 h-4" }),
          "Forum (",
          forumPosts.length,
          ")"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "playlists", className: "gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Music2, { className: "w-4 h-4" }),
          "Playlists (",
          playlists.length,
          ")"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "tierlists", className: "gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Layers, { className: "w-4 h-4" }),
          "Tier Lists (",
          tierLists.length,
          ")"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "forum", className: "mt-4", children: loadingForum ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center py-12 text-muted-foreground", children: "Loading..." }) : filteredForumPosts.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3 max-h-[600px] overflow-y-auto", children: filteredForumPosts.map((post) => {
        var _a;
        return /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
                  post.is_spoiler && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-2 py-0.5 rounded-full bg-orange-500/20 text-orange-500 text-xs", children: "Spoiler" }),
                  post.flair && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-2 py-0.5 rounded-full bg-primary/20 text-primary text-xs", children: post.flair })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-medium truncate", children: post.title }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(RichContent, { html: post.content, className: "text-sm text-muted-foreground line-clamp-2 mt-1" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 mt-2 text-xs text-muted-foreground", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: `/admin/user/${post.user_id}`, className: "hover:text-primary transition-colors", children: [
                    "By @",
                    ((_a = post.profile) == null ? void 0 : _a.username) || "unknown"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: formatDistanceToNow(new Date(post.created_at), { addSuffix: true }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-3 h-3" }),
                    post.views_count
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    variant: "ghost",
                    size: "sm",
                    onClick: async () => {
                      try {
                        await pinPost.mutateAsync({ postId: post.id, isPinned: !post.is_pinned });
                        ue.success(post.is_pinned ? "Post unpinned" : "Post pinned");
                      } catch (e) {
                        ue.error("Failed to update pin status");
                      }
                    },
                    className: post.is_pinned ? "text-primary" : "text-muted-foreground",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pin, { className: cn("w-4 h-4", post.is_pinned && "fill-current") })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: `/community/forum/${post.id}`, target: "_blank", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "w-4 h-4" }) }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    variant: "ghost",
                    size: "sm",
                    onClick: async () => {
                      if (await confirm({ title: "Delete this forum post?", destructive: true })) {
                        deleteForumPost.mutate(post.id);
                      }
                    },
                    className: "text-destructive hover:text-destructive",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-4 h-4" })
                  }
                )
              ] })
            ] })
          },
          post.id
        );
      }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center py-12 text-muted-foreground", children: "No forum posts found" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "playlists", className: "mt-4", children: loadingPlaylists ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center py-12 text-muted-foreground", children: "Loading..." }) : filteredPlaylists.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3 max-h-[600px] overflow-y-auto", children: filteredPlaylists.map((playlist) => {
        var _a;
        return /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2 mb-1", children: playlist.is_public ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-500 text-xs", children: "Public" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-2 py-0.5 rounded-full bg-muted text-muted-foreground text-xs", children: "Private" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-medium truncate", children: playlist.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground line-clamp-1 mt-1", children: playlist.description || "No description" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 mt-2 text-xs text-muted-foreground", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: `/admin/user/${playlist.user_id}`, className: "hover:text-primary transition-colors", children: [
                    "By @",
                    ((_a = playlist.profile) == null ? void 0 : _a.username) || "unknown"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                    playlist.items_count || 0,
                    " items"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: formatDistanceToNow(new Date(playlist.created_at), { addSuffix: true }) })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: `/playlist/${playlist.id}`, target: "_blank", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "w-4 h-4" }) }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    variant: "ghost",
                    size: "sm",
                    onClick: async () => {
                      if (await confirm({ title: "Delete this playlist?", destructive: true })) {
                        deletePlaylist.mutate(playlist.id);
                      }
                    },
                    className: "text-destructive hover:text-destructive",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-4 h-4" })
                  }
                )
              ] })
            ] })
          },
          playlist.id
        );
      }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center py-12 text-muted-foreground", children: "No playlists found" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "tierlists", className: "mt-4", children: loadingTierLists ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center py-12 text-muted-foreground", children: "Loading..." }) : filteredTierLists.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3 max-h-[600px] overflow-y-auto", children: filteredTierLists.map((tierList) => {
        var _a;
        return /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2 mb-1", children: tierList.is_public ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-500 text-xs", children: "Public" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-2 py-0.5 rounded-full bg-muted text-muted-foreground text-xs", children: "Private" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-medium truncate", children: tierList.title }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground line-clamp-1 mt-1", children: tierList.description || "No description" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 mt-2 text-xs text-muted-foreground", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: `/admin/user/${tierList.user_id}`, className: "hover:text-primary transition-colors", children: [
                    "By @",
                    ((_a = tierList.profile) == null ? void 0 : _a.username) || "unknown"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: formatDistanceToNow(new Date(tierList.created_at), { addSuffix: true }) }),
                  tierList.views_count > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-3 h-3" }),
                    tierList.views_count
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                tierList.share_code && /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: `/tierlist/${tierList.share_code}`, target: "_blank", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "w-4 h-4" }) }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    variant: "ghost",
                    size: "sm",
                    onClick: async () => {
                      if (await confirm({ title: "Delete this tier list?", destructive: true })) {
                        deleteTierList.mutate(tierList.id);
                      }
                    },
                    className: "text-destructive hover:text-destructive",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-4 h-4" })
                  }
                )
              ] })
            ] })
          },
          tierList.id
        );
      }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center py-12 text-muted-foreground", children: "No tier lists found" }) })
    ] })
  ] });
}
function AdminLogs() {
  const [searchTerm, setSearchTerm] = reactExports.useState("");
  const [onlyClientErrors, setOnlyClientErrors] = reactExports.useState(false);
  const { data: logs, isLoading } = useAdminLogs(200);
  const deleteMutation = useDeleteAdminLogs();
  const { toast } = useToast();
  const confirm = useConfirm();
  const filteredLogs = logs == null ? void 0 : logs.filter((log) => {
    var _a, _b, _c, _d;
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch = log.action.toLowerCase().includes(searchLower) || log.entity_type.toLowerCase().includes(searchLower) || ((_b = (_a = log.profiles) == null ? void 0 : _a.username) == null ? void 0 : _b.toLowerCase().includes(searchLower)) || ((_d = (_c = log.profiles) == null ? void 0 : _c.display_name) == null ? void 0 : _d.toLowerCase().includes(searchLower)) || log.details && JSON.stringify(log.details).toLowerCase().includes(searchLower);
    const matchesClientError = onlyClientErrors ? log.action === "client_error" : true;
    return matchesSearch && matchesClientError;
  });
  const handleCopyErrorId = async (errorId) => {
    if (!errorId) {
      toast({ title: "No Error ID", description: "This log does not contain an Error ID." });
      return;
    }
    try {
      await navigator.clipboard.writeText(errorId);
      toast({ title: "Copied", description: `Copied Error ID ${errorId}` });
    } catch (e) {
      toast({ title: "Copy failed", description: String(e) });
    }
  };
  const handleDeleteFiltered = async () => {
    if (!filteredLogs || filteredLogs.length === 0) {
      toast({ title: "Nothing to delete", description: "No logs match the current filters." });
      return;
    }
    const confirmMsg = `Delete ${filteredLogs.length} logs? This action cannot be undone.`;
    if (!await confirm({ title: confirmMsg, destructive: true })) return;
    const ids = filteredLogs.map((l) => l.id);
    try {
      await deleteMutation.mutateAsync({ ids });
      toast({ title: "Deleted", description: `Deleted ${ids.length} logs.` });
    } catch (e) {
      toast({ title: "Delete failed", description: (e == null ? void 0 : e.message) || String(e) });
    }
  };
  const handleCleanupOld = async () => {
    const cutoff = new Date(Date.now() - 2 * 24 * 60 * 60 * 1e3).toISOString();
    const confirmMsg = "Delete logs older than 2 days? This action cannot be undone.";
    if (!await confirm({ title: confirmMsg, destructive: true })) return;
    try {
      await deleteMutation.mutateAsync({ created_before: cutoff });
      toast({ title: "Cleanup complete", description: "Old logs deleted." });
    } catch (e) {
      toast({ title: "Cleanup failed", description: (e == null ? void 0 : e.message) || String(e) });
    }
  };
  const getActionIcon = (action) => {
    if (action.includes("delete") || action.includes("remove")) return /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-4 h-4 text-red-400" });
    if (action.includes("approve")) return /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-4 h-4 text-green-400" });
    if (action.includes("reject")) return /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-4 h-4 text-orange-400" });
    if (action.includes("view")) return /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-4 h-4 text-blue-400" });
    if (action.includes("ban")) return /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-4 h-4 text-red-500" });
    return /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-4 h-4 text-gray-400" });
  };
  const getActionColor = (action) => {
    if (action.includes("delete") || action.includes("remove") || action.includes("ban")) return "destructive";
    if (action.includes("approve")) return "default";
    if (action.includes("reject")) return "secondary";
    return "outline";
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold text-white", children: "Admin Activity Logs" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-400 mt-1", children: "Track all administrative actions and system events" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "secondary", className: "text-lg px-4 py-2", children: [
          (filteredLogs == null ? void 0 : filteredLogs.length) || 0,
          " Logs"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: onlyClientErrors ? "default" : "outline",
            size: "sm",
            className: "gap-2",
            onClick: () => setOnlyClientErrors((v) => !v),
            children: "Client Errors"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            onClick: handleDeleteFiltered,
            variant: "destructive",
            size: "sm",
            className: "gap-2",
            disabled: deleteMutation.isPending,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-4 h-4" }),
              "Delete"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            onClick: handleCleanupOld,
            variant: "outline",
            size: "sm",
            className: "gap-2",
            disabled: deleteMutation.isPending,
            children: "Clean 2+ days"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          placeholder: "Search by action, type, or user...",
          value: searchTerm,
          onChange: (e) => setSearchTerm(e.target.value),
          className: "pl-10 bg-white/5 border-white/10 text-white placeholder:text-gray-400"
        }
      )
    ] }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(GlassPanel, { className: "p-8 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-400", children: "Loading logs..." }) }) : filteredLogs && filteredLogs.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(GlassPanel, { className: "divide-y divide-white/10", children: filteredLogs.map((log) => {
      var _a, _b, _c, _d;
      return /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "p-4 hover:bg-white/5 transition-colors duration-200",
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-shrink-0 mt-1", children: getActionIcon(log.action) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(Avatar, { className: "w-8 h-8", children: [
                    ((_a = log.profiles) == null ? void 0 : _a.avatar_url) ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                      AvatarImage,
                      {
                        src: getProxiedImageUrl(log.profiles.avatar_url),
                        alt: log.profiles.display_name || log.profiles.username
                      }
                    ) : null,
                    /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarFallback, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-4 h-4" }) })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-white", children: ((_b = log.profiles) == null ? void 0 : _b.display_name) || ((_c = log.profiles) == null ? void 0 : _c.username) || "Unknown User" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-gray-400", children: [
                      "@",
                      ((_d = log.profiles) == null ? void 0 : _d.username) || "unknown"
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right flex-shrink-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: getActionColor(log.action), className: "mb-1", children: log.action.replace(/_/g, " ") }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-500", children: formatDistanceToNow(new Date(log.created_at), { addSuffix: true }) })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 space-y-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-gray-300", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gray-500", children: "Entity Type:" }),
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: log.entity_type })
                ] }),
                log.entity_id && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-gray-500 font-mono", children: [
                  "ID: ",
                  log.entity_id.substring(0, 16),
                  "..."
                ] }),
                log.details && typeof log.details === "object" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 p-2 bg-black/30 rounded-md", children: [
                  log.details.error_id && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-gray-400 font-mono", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gray-500", children: "Error ID:" }),
                      " ",
                      log.details.error_id
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        onClick: () => handleCopyErrorId(log.details.error_id),
                        className: "text-gray-400 hover:text-gray-200",
                        title: "Copy Error ID",
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "w-4 h-4" })
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-400 font-mono mt-2", children: JSON.stringify(log.details, null, 2) })
                ] }),
                log.ip_address && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-gray-500", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gray-600", children: "IP:" }),
                  " ",
                  log.ip_address
                ] })
              ] })
            ] })
          ] })
        },
        log.id
      );
    }) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassPanel, { className: "p-8 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-12 h-12 text-gray-600 mx-auto mb-4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-400", children: searchTerm ? "No logs match your search criteria" : "No admin logs found" })
    ] })
  ] });
}
function PendingForumPosts() {
  const [searchTerm, setSearchTerm] = reactExports.useState("");
  const { data: posts, isLoading } = usePendingForumPosts();
  const approvePost = useApproveForumPost();
  const rejectPost = useRejectForumPost();
  const { toast } = useToast();
  const handleApprove = async (postId) => {
    try {
      await approvePost.mutateAsync({ postId });
      toast({ title: "Post approved successfully" });
    } catch (error) {
      toast({ title: "Failed to approve post", variant: "destructive" });
    }
  };
  const handleReject = async (postId) => {
    try {
      await rejectPost.mutateAsync({ postId });
      toast({ title: "Post rejected and deleted" });
    } catch (error) {
      toast({ title: "Failed to reject post", variant: "destructive" });
    }
  };
  const filteredPosts = posts == null ? void 0 : posts.filter((post) => {
    var _a, _b, _c, _d;
    const searchLower = searchTerm.toLowerCase();
    return post.title.toLowerCase().includes(searchLower) || post.content.toLowerCase().includes(searchLower) || ((_b = (_a = post.profiles) == null ? void 0 : _a.username) == null ? void 0 : _b.toLowerCase().includes(searchLower)) || ((_d = (_c = post.profiles) == null ? void 0 : _c.display_name) == null ? void 0 : _d.toLowerCase().includes(searchLower));
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold text-white", children: "Pending Forum Posts" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-400 mt-1", children: "Review and approve forum posts with images" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "secondary", className: "text-lg px-4 py-2", children: [
        (filteredPosts == null ? void 0 : filteredPosts.length) || 0,
        " Pending"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          placeholder: "Search by title, content, or user...",
          value: searchTerm,
          onChange: (e) => setSearchTerm(e.target.value),
          className: "pl-10 bg-white/5 border-white/10 text-white placeholder:text-gray-400"
        }
      )
    ] }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(GlassPanel, { className: "p-8 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-400", children: "Loading pending posts..." }) }) : filteredPosts && filteredPosts.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-6", children: filteredPosts.map((post) => {
      var _a, _b, _c, _d;
      return /* @__PURE__ */ jsxRuntimeExports.jsx(GlassPanel, { className: "p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Avatar, { className: "w-10 h-10", children: [
              ((_a = post.profiles) == null ? void 0 : _a.avatar_url) ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                AvatarImage,
                {
                  src: getProxiedImageUrl(post.profiles.avatar_url),
                  alt: post.profiles.display_name || post.profiles.username
                }
              ) : null,
              /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarFallback, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-5 h-5" }) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-white", children: ((_b = post.profiles) == null ? void 0 : _b.display_name) || ((_c = post.profiles) == null ? void 0 : _c.username) || "Unknown User" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-gray-400", children: [
                "@",
                ((_d = post.profiles) == null ? void 0 : _d.username) || "unknown",
                " •",
                " ",
                formatDistanceToNow(new Date(post.created_at), { addSuffix: true })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            post.flair && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", children: post.flair }),
            post.is_spoiler && /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "destructive", className: "gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-3 h-3" }),
              "Spoiler"
            ] }),
            post.image_url && /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "secondary", className: "gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { className: "w-3 h-3" }),
              "Image"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-bold text-white mb-2", children: post.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-300 whitespace-pre-wrap", children: post.content })
        ] }),
        post.image_url && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-lg overflow-hidden border border-white/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: post.image_url,
            alt: "Post image",
            className: "w-full max-h-96 object-contain bg-black/20"
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 pt-4 border-t border-white/10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              onClick: () => handleApprove(post.id),
              disabled: approvePost.isPending,
              className: "gap-2 bg-green-600 hover:bg-green-700",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-4 h-4" }),
                "Approve"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              onClick: () => handleReject(post.id),
              disabled: rejectPost.isPending,
              variant: "destructive",
              className: "gap-2",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-4 h-4" }),
                "Reject"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              onClick: () => window.open(`/community/forum/${post.id}`, "_blank"),
              variant: "outline",
              className: "gap-2 ml-auto",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-4 h-4" }),
                "Preview"
              ]
            }
          )
        ] })
      ] }) }, post.id);
    }) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassPanel, { className: "p-8 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-12 h-12 text-green-500 mx-auto mb-4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-400", children: searchTerm ? "No pending posts match your search" : "All caught up! No posts pending approval." })
    ] })
  ] });
}
function PendingSuggestions() {
  const { isAdmin } = useAuth();
  const { data: suggestions, isLoading } = useAllSuggestions();
  const reviewSuggestion = useReviewSuggestion();
  const deleteSuggestion = useDeleteSuggestion();
  const confirm = useConfirm();
  const [adminNotes, setAdminNotes] = reactExports.useState({});
  const [selectedSuggestion, setSelectedSuggestion] = reactExports.useState(null);
  const pendingSuggestions = (suggestions == null ? void 0 : suggestions.filter((s) => s.status === "pending")) || [];
  const handleReview = async (id, status) => {
    await reviewSuggestion.mutateAsync({
      id,
      status,
      adminNotes: adminNotes[id] || ""
    });
    setAdminNotes((prev) => ({ ...prev, [id]: "" }));
    setSelectedSuggestion(null);
  };
  const handleDelete = async (id) => {
    if (await confirm({ title: "Are you sure you want to delete this suggestion?", destructive: true })) {
      await deleteSuggestion.mutateAsync(id);
    }
  };
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center py-12", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-8 h-8 animate-spin text-primary" }) });
  }
  if (pendingSuggestions.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-12 h-12 mx-auto text-muted-foreground mb-4 opacity-50" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "No pending suggestions" })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: pendingSuggestions.map((suggestion) => /* @__PURE__ */ jsxRuntimeExports.jsx(GlassPanel, { className: "p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-lg mb-2", children: suggestion.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2 mb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", children: suggestion.category }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Badge,
            {
              variant: suggestion.priority === "urgent" ? "destructive" : suggestion.priority === "normal" ? "default" : "secondary",
              children: [
                suggestion.priority,
                " priority"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: formatDistanceToNow(new Date(suggestion.created_at), { addSuffix: true }) })
        ] })
      ] }),
      isAdmin && /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          variant: "ghost",
          size: "sm",
          onClick: () => handleDelete(suggestion.id),
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-4 h-4" })
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 rounded-lg bg-muted/30", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm whitespace-pre-wrap", children: suggestion.description }) }),
    suggestion.image_url && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative rounded-lg overflow-hidden border border-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "img",
      {
        src: suggestion.image_url,
        alt: "Suggestion attachment",
        className: "w-full max-h-64 object-contain bg-muted/20"
      }
    ) }),
    selectedSuggestion === suggestion.id ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 p-4 rounded-lg bg-primary/5 border border-primary/20", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium", children: "Admin Response" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2 mb-2", children: [
        "Thanks for the suggestion! We'll look into it.",
        "Great idea! We've added this to our roadmap.",
        "This is already being worked on. Stay tuned!",
        "Unfortunately, we can't implement this right now.",
        "We need more details to evaluate this suggestion."
      ].map((text) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => setAdminNotes((prev) => ({ ...prev, [suggestion.id]: text })),
          className: "text-[10px] px-2 py-1 rounded bg-muted hover:bg-muted-foreground/20 transition-colors border border-muted-foreground/10",
          children: text
        },
        text
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Textarea,
        {
          value: adminNotes[suggestion.id] || "",
          onChange: (e) => setAdminNotes((prev) => ({ ...prev, [suggestion.id]: e.target.value })),
          placeholder: "Add your response or notes...",
          className: "min-h-[100px]"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            size: "sm",
            onClick: () => handleReview(suggestion.id, "approved"),
            disabled: reviewSuggestion.isPending,
            className: "gap-2",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-4 h-4" }),
              "Approve"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            size: "sm",
            variant: "destructive",
            onClick: () => handleReview(suggestion.id, "rejected"),
            disabled: reviewSuggestion.isPending,
            className: "gap-2",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-4 h-4" }),
              "Reject"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            size: "sm",
            variant: "ghost",
            onClick: () => setSelectedSuggestion(null),
            children: "Cancel"
          }
        )
      ] })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
      Button,
      {
        size: "sm",
        variant: "outline",
        onClick: () => setSelectedSuggestion(suggestion.id),
        className: "gap-2",
        children: "Review Suggestion"
      }
    )
  ] }) }, suggestion.id)) });
}
const Table = reactExports.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative w-full overflow-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx("table", { ref, className: cn("w-full caption-bottom text-sm", className), ...props }) })
);
Table.displayName = "Table";
const TableHeader = reactExports.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { ref, className: cn("[&_tr]:border-b", className), ...props })
);
TableHeader.displayName = "TableHeader";
const TableBody = reactExports.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { ref, className: cn("[&_tr:last-child]:border-0", className), ...props })
);
TableBody.displayName = "TableBody";
const TableFooter = reactExports.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx("tfoot", { ref, className: cn("border-t bg-muted/50 font-medium [&>tr]:last:border-b-0", className), ...props })
);
TableFooter.displayName = "TableFooter";
const TableRow = reactExports.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    "tr",
    {
      ref,
      className: cn("border-b transition-colors data-[state=selected]:bg-muted hover:bg-muted/50", className),
      ...props
    }
  )
);
TableRow.displayName = "TableRow";
const TableHead = reactExports.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    "th",
    {
      ref,
      className: cn(
        "h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0",
        className
      ),
      ...props
    }
  )
);
TableHead.displayName = "TableHead";
const TableCell = reactExports.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx("td", { ref, className: cn("p-4 align-middle [&:has([role=checkbox])]:pr-0", className), ...props })
);
TableCell.displayName = "TableCell";
const TableCaption = reactExports.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx("caption", { ref, className: cn("mt-4 text-sm text-muted-foreground", className), ...props })
);
TableCaption.displayName = "TableCaption";
function WatchRoomManager() {
  const { data: rooms, isLoading } = useAllWatchRooms();
  const deleteMutation = useAdminDeleteRoom();
  const [roomToDelete, setRoomToDelete] = reactExports.useState(null);
  const handleDelete = async () => {
    if (roomToDelete) {
      await deleteMutation.mutateAsync(roomToDelete);
      setRoomToDelete(null);
    }
  };
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center p-12", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-xl font-semibold flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Radio, { className: "w-5 h-5 text-primary" }),
        "Active Watch Rooms"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm text-muted-foreground", children: [
        "Total Rooms: ",
        (rooms == null ? void 0 : rooms.length) || 0
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-xl border border-white/5 bg-black/20 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { className: "border-white/5 hover:bg-transparent", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "w-[300px]", children: "Room Info" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Host" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Content" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Status" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-right", children: "Participants" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-right", children: "Actions" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: !rooms || rooms.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(TableRow, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { colSpan: 6, className: "text-center py-12 text-muted-foreground", children: "No active watch rooms found" }) }) : rooms.map((room) => {
        var _a, _b, _c, _d;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { className: "border-white/5 hover:bg-white/5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-medium flex items-center gap-2", children: [
              room.name,
              room.access_type === "public" && /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { className: "w-3 h-3 text-emerald-500" }),
              room.access_type === "password" && /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-3 h-3 text-orange-500" }),
              room.access_type === "invite" && /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "w-3 h-3 text-blue-500" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
              "Created ",
              formatDistanceToNow(new Date(room.created_at), { addSuffix: true })
            ] })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Avatar, { className: "w-6 h-6", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarImage, { src: ((_a = room.host_profile) == null ? void 0 : _a.avatar_url) || "" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarFallback, { children: ((_c = (_b = room.host_profile) == null ? void 0 : _b.display_name) == null ? void 0 : _c[0]) || "?" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", children: ((_d = room.host_profile) == null ? void 0 : _d.display_name) || "Unknown" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm line-clamp-1", children: room.anime_title || "No Content" }),
            room.episode_number && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
              "Episode ",
              room.episode_number
            ] })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2", children: room.is_playing ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 text-xs font-medium", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MonitorPlay, { className: "w-3 h-3" }),
            "Playing"
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-yellow-500/10 text-yellow-500 text-xs font-medium", children: "Paused" }) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-end gap-1.5 text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-3.5 h-3.5" }),
            room.participant_count || 0,
            "/",
            room.max_participants
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "ghost",
              size: "icon",
              className: "h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10",
              onClick: () => setRoomToDelete(room.id),
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-4 h-4" })
            }
          ) })
        ] }, room.id);
      }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialog, { open: !!roomToDelete, onOpenChange: (open) => !open && setRoomToDelete(null), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { children: "Delete Watch Room?" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogDescription, { children: "This will permanently delete the room and disconnect all participants. This action cannot be undone." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { children: "Cancel" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          AlertDialogAction,
          {
            onClick: handleDelete,
            className: "bg-destructive hover:bg-destructive/90 text-white",
            children: "Delete Room"
          }
        )
      ] })
    ] }) })
  ] });
}
function AppReleaseManager() {
  const queryClient = useQueryClient();
  const confirm = useConfirm();
  const [isAdding, setIsAdding] = reactExports.useState(false);
  const [editingId, setEditingId] = reactExports.useState(null);
  const [version, setVersion] = reactExports.useState("");
  const [platform, setPlatform] = reactExports.useState("win");
  const [url, setUrl] = reactExports.useState("");
  const [notes, setNotes] = reactExports.useState("");
  const [isLatest, setIsLatest] = reactExports.useState(true);
  const { data: releases, isLoading } = useQuery({
    queryKey: ["admin_app_releases"],
    queryFn: async () => {
      const { data, error } = await supabase.from("app_releases").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    }
  });
  const saveMutation = useMutation({
    mutationFn: async (payload) => {
      const { id, ...data } = payload;
      if (data.is_latest) {
        await supabase.from("app_releases").update({ is_latest: false }).eq("platform", data.platform);
      }
      if (id) {
        const { error } = await supabase.from("app_releases").update(data).eq("id", id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("app_releases").insert(data);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin_app_releases"] });
      ue.success(editingId ? "Release updated" : "Release added");
      resetForm();
    },
    onError: (error) => {
      console.error("Save release error:", error);
      ue.error("Failed to save release");
    }
  });
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const { error } = await supabase.from("app_releases").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin_app_releases"] });
      ue.success("Release deleted");
    },
    onError: (error) => {
      console.error("Delete release error:", error);
      ue.error("Failed to delete release");
    }
  });
  const resetForm = () => {
    setVersion("");
    setPlatform("win");
    setUrl("");
    setNotes("");
    setIsLatest(true);
    setIsAdding(false);
    setEditingId(null);
  };
  const handleEdit = (release) => {
    setVersion(release.version);
    setPlatform(release.platform);
    setUrl(release.url);
    setNotes(release.notes || "");
    setIsLatest(release.is_latest);
    setEditingId(release.id);
    setIsAdding(true);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!version || !url) {
      ue.error("Version and URL are required");
      return;
    }
    saveMutation.mutate({
      id: editingId,
      version,
      platform,
      url,
      notes,
      is_latest: isLatest,
      updated_at: (/* @__PURE__ */ new Date()).toISOString()
    });
  };
  const getPlatformIcon = (p) => {
    switch (p) {
      case "win":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(Monitor, { className: "w-4 h-4" });
      case "mac":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(Apple, { className: "w-4 h-4 fill-current" });
      case "linux":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(Terminal, { className: "w-4 h-4" });
      default:
        return /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-4 h-4" });
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-5 h-5 text-primary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg font-semibold", children: "App Downloads Management" })
      ] }),
      !isAdding && /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: () => setIsAdding(true), size: "sm", className: "gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
        " Add Release"
      ] })
    ] }),
    isAdding && /* @__PURE__ */ jsxRuntimeExports.jsx(GlassPanel, { className: "p-6 border-primary/20 bg-primary/5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center mb-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-medium text-sm text-primary", children: editingId ? "Edit Release" : "New Release" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "ghost", size: "sm", onClick: resetForm, children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "version", children: "Version" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "version",
              value: version,
              onChange: (e) => setVersion(e.target.value),
              placeholder: "e.g. 1.2.0",
              className: "bg-background/50"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "platform", children: "Platform" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "select",
            {
              id: "platform",
              value: platform,
              onChange: (e) => setPlatform(e.target.value),
              className: "w-full bg-background/50 border border-input rounded-md px-3 py-2 text-sm",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "win", children: "Windows" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "mac", children: "macOS" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "linux", children: "Linux" })
              ]
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "url", children: "Download URL" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            id: "url",
            value: url,
            onChange: (e) => setUrl(e.target.value),
            placeholder: "https://github.com/.../release.exe",
            className: "bg-background/50"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "notes", children: "Release Notes" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Textarea,
          {
            id: "notes",
            value: notes,
            onChange: (e) => setNotes(e.target.value),
            placeholder: "What's new in this version?",
            className: "bg-background/50 min-h-[80px]"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "checkbox",
            id: "isLatest",
            checked: isLatest,
            onChange: (e) => setIsLatest(e.target.checked),
            className: "rounded border-gray-400 text-primary focus:ring-primary"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "isLatest", className: "cursor-pointer", children: "Set as Latest" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "submit", disabled: saveMutation.isPending, className: "w-full gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "w-4 h-4" }),
        saveMutation.isPending ? "Saving..." : "Save Release"
      ] })
    ] }) }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center py-8 text-muted-foreground italic", children: "Loading releases..." }) : releases && releases.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-3", children: releases.map((release) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: `p-4 rounded-xl border transition-all flex items-center justify-between gap-4 ${release.is_latest ? "bg-primary/5 border-primary/20" : "bg-muted/10 border-white/5"}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `p-2 rounded-lg ${release.is_latest ? "bg-primary/20 text-primary" : "bg-muted/20 text-muted-foreground"}`, children: getPlatformIcon(release.platform) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-bold text-sm", children: [
                  "v",
                  release.version
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-muted/30 text-muted-foreground", children: release.platform }),
                release.is_latest && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] uppercase font-bold text-emerald-500 flex items-center gap-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-3 h-3" }),
                  " Latest"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground truncate max-w-[200px] md:max-w-md", children: release.url })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "ghost",
                size: "sm",
                onClick: () => handleEdit(release),
                className: "h-8 w-8 p-0",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pen, { className: "w-3.5 h-3.5" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "ghost",
                size: "sm",
                onClick: async () => {
                  if (await confirm({ title: "Delete this release?", destructive: true })) deleteMutation.mutate(release.id);
                },
                className: "h-8 w-8 p-0 text-destructive hover:text-destructive hover:bg-destructive/10",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3.5 h-3.5" })
              }
            )
          ] })
        ]
      },
      release.id
    )) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-12 rounded-xl border border-dashed border-white/10 text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-8 h-8 mx-auto mb-2 opacity-20" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "No releases found in the database." })
    ] })
  ] });
}
function Skeleton({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("animate-pulse rounded-md bg-muted", className), ...props });
}
function ModerationLogs() {
  const { data: logs, isLoading } = useAdminLogs(50, { action: "automod_violation" });
  const deleteLogs = useDeleteAdminLogs();
  const confirm = useConfirm();
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: Array.from({ length: 5 }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-16 w-full rounded-xl" }, i)) });
  }
  if (!(logs == null ? void 0 : logs.length)) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center p-12 text-center text-muted-foreground border-2 border-dashed border-white/10 rounded-xl bg-card/20", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldAlert, { className: "w-12 h-12 mb-4 opacity-20" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-bold", children: "No Violations Found" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: "The auto-moderation system hasn't flagged any severe content recently." })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-lg font-bold flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldAlert, { className: "w-5 h-5 text-red-500" }),
        "Auto-Moderation Log"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          variant: "outline",
          size: "sm",
          className: "text-xs",
          onClick: async () => {
            if (await confirm({ title: "Clear all visible logs?", destructive: true })) {
              deleteLogs.mutate({ action: "automod_violation" }, {
                onSuccess: () => ue.success("Logs cleared")
              });
            }
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3 h-3 mr-2" }),
            "Clear Logs"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: logs.map((log) => {
      var _a, _b, _c, _d, _e;
      const violations = ((_a = log.details) == null ? void 0 : _a.violations) || [];
      const content = ((_b = log.details) == null ? void 0 : _b.original_content) || "";
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 rounded-xl bg-card border border-white/5 flex gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Avatar, { className: "w-10 h-10 border border-white/10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarImage, { src: ((_c = log.profiles) == null ? void 0 : _c.avatar_url) || "" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarFallback, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-4 h-4" }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-between mb-1", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-sm truncate", children: ((_d = log.profiles) == null ? void 0 : _d.display_name) || ((_e = log.profiles) == null ? void 0 : _e.username) || "Unknown User" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
              "• ",
              formatDistanceToNow(new Date(log.created_at), { addSuffix: true })
            ] })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 rounded bg-black/20 text-xs font-mono mb-2 break-all border border-white/5", children: content }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2", children: [
            violations.map((v, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "destructive", className: "text-[10px] uppercase", children: [
              v.type,
              ": ",
              v.match
            ] }, i)),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "text-[10px]", children: log.entity_type })
          ] })
        ] })
      ] }, log.id);
    }) })
  ] });
}
function ReportManager() {
  const queryClient = useQueryClient();
  const [filter, setFilter] = reactExports.useState("pending");
  const [expandedReportId, setExpandedReportId] = reactExports.useState(null);
  const [adminNote, setAdminNote] = reactExports.useState("");
  const { data: reports, isLoading } = useQuery({
    queryKey: ["admin_reports", filter],
    queryFn: async () => {
      let query = supabase.from("reports").select("*").order("created_at", { ascending: false });
      if (filter !== "all") {
        query = query.eq("status", filter);
      }
      const { data: reportsData, error } = await query;
      if (error) throw error;
      if (!reportsData || reportsData.length === 0) return [];
      const userIds = [.../* @__PURE__ */ new Set([
        ...reportsData.map((r) => r.reporter_id),
        ...reportsData.map((r) => r.moderator_id).filter(Boolean)
      ])];
      const { data: profiles } = await supabase.from("profiles").select("user_id, display_name, avatar_url, username").in("user_id", userIds);
      const profileMap = new Map((profiles == null ? void 0 : profiles.map((p) => [p.user_id, p])) || []);
      return reportsData.map((report) => ({
        ...report,
        reporter: profileMap.get(report.reporter_id),
        moderator: report.moderator_id ? profileMap.get(report.moderator_id) : null
      }));
    }
  });
  const updateReportStatus = useMutation({
    mutationFn: async ({ id, status, note }) => {
      const { data: { user } } = await supabase.auth.getUser();
      const { error } = await supabase.from("reports").update({
        status,
        admin_notes: note,
        moderator_id: user == null ? void 0 : user.id,
        updated_at: (/* @__PURE__ */ new Date()).toISOString()
      }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin_reports"] });
      ue.success("Report updated successfully");
      setExpandedReportId(null);
      setAdminNote("");
    },
    onError: (error) => {
      ue.error("Failed to update report: " + error.message);
    }
  });
  const getStatusIcon = (status) => {
    switch (status) {
      case "pending":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-4 h-4 text-yellow-500" });
      case "action_taken":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4 text-emerald-500" });
      case "dismissed":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-4 h-4 text-muted-foreground" });
      default:
        return null;
    }
  };
  const getTargetIcon = (type) => {
    switch (type) {
      case "user":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-4 h-4" });
      case "comment":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "w-4 h-4" });
      case "server":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(Server, { className: "w-4 h-4" });
      case "anime":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(Film, { className: "w-4 h-4" });
      default:
        return /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldAlert, { className: "w-4 h-4" });
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-xl font-bold flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldAlert, { className: "w-6 h-6 text-primary" }),
        "User Reports"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex bg-muted/30 rounded-xl p-1 border border-white/5", children: ["pending", "action_taken", "dismissed", "all"].map((f) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => setFilter(f),
          className: `px-4 py-1.5 rounded-lg text-xs font-bold capitalize transition-all ${filter === f ? "bg-primary text-primary-foreground shadow-lg" : "hover:bg-white/5"}`,
          children: f.replace("_", " ")
        },
        f
      )) })
    ] }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center py-20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-10 h-10 animate-spin text-primary opacity-50" }) }) : reports && reports.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: reports.map((report) => {
      var _a, _b;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        GlassPanel,
        {
          className: `p-4 transition-all duration-300 ${expandedReportId === report.id ? "bg-white/5 border-white/20" : "hover:bg-white/5 border-white/5"}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `p-3 rounded-2xl ${report.status === "pending" ? "bg-yellow-500/10" : "bg-white/5"}`, children: getTargetIcon(report.target_type) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-bold text-sm", children: [
                      "Reported ",
                      report.target_type
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "outline", className: "text-[10px] uppercase tracking-tighter", children: [
                      report.target_id.substring(0, 8),
                      "..."
                    ] }),
                    getStatusIcon(report.status),
                    ((_a = report.target_id) == null ? void 0 : _a.startsWith("http")) && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Button,
                      {
                        variant: "ghost",
                        size: "sm",
                        className: "h-6 px-2 text-[10px] gap-1 hover:text-primary",
                        onClick: () => window.open(report.target_id, "_blank"),
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "w-3 h-3" }),
                          "Visit Link"
                        ]
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium mb-1", children: report.reason }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs text-muted-foreground font-medium", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                      "Reported by ",
                      ((_b = report.reporter) == null ? void 0 : _b.display_name) || "Unknown"
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "•" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: formatDistanceToNow(new Date(report.created_at), { addSuffix: true }) })
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  variant: "ghost",
                  size: "sm",
                  onClick: () => {
                    if (expandedReportId === report.id) {
                      setExpandedReportId(null);
                    } else {
                      setExpandedReportId(report.id);
                      setAdminNote(report.admin_notes || "");
                    }
                  },
                  className: "rounded-xl h-10 w-10 p-0",
                  children: expandedReportId === report.id ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { className: "w-5 h-5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "w-5 h-5" })
                }
              )
            ] }),
            expandedReportId === report.id && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 pt-6 border-t border-white/10 space-y-6 animate-in fade-in slide-in-from-top-4 duration-300", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-xs font-black uppercase tracking-widest text-muted-foreground mb-2", children: "Report Details" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 rounded-xl bg-orange-500/5 border border-orange-500/20 text-sm", children: report.details || "No additional context provided." })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-xs font-black uppercase tracking-widest text-muted-foreground mb-2", children: "Moderation Action" }),
                report.moderator && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs mb-3 text-emerald-400 font-bold", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldAlert, { className: "w-3 h-3" }),
                  "Last handled by ",
                  report.moderator.display_name
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Textarea,
                  {
                    placeholder: "Internal notes (optional)...",
                    value: adminNote,
                    onChange: (e) => setAdminNote(e.target.value),
                    className: "bg-white/5 border-white/10 text-sm mb-4"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      onClick: () => updateReportStatus.mutate({
                        id: report.id,
                        status: "action_taken",
                        note: adminNote
                      }),
                      disabled: updateReportStatus.isPending || report.status === "action_taken",
                      className: "bg-emerald-500 hover:bg-emerald-600 text-white flex-1 font-bold rounded-xl",
                      children: "Resolve (Action Taken)"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      onClick: () => updateReportStatus.mutate({
                        id: report.id,
                        status: "dismissed",
                        note: adminNote
                      }),
                      disabled: updateReportStatus.isPending || report.status === "dismissed",
                      variant: "ghost",
                      className: "flex-1 font-bold rounded-xl border border-white/10",
                      children: "Dismiss (Log)"
                    }
                  )
                ] })
              ] })
            ] }) })
          ]
        },
        report.id
      );
    }) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassPanel, { className: "p-20 text-center border-dashed border-white/5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-12 h-12 text-muted-foreground/30 mx-auto mb-4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground font-medium", children: "No reports found for this category." })
    ] })
  ] });
}
function AnalyticsActiveUsers() {
  const activeThreshold = new Date(Date.now() - 3e5).toISOString();
  const { data: activeUsers, isLoading: loadingUsers } = useQuery({
    queryKey: ["active_users_list"],
    queryFn: async () => {
      const { data, error } = await supabase.from("profiles").select("id, user_id, display_name, avatar_url, username, last_seen").gt("last_seen", activeThreshold).order("last_seen", { ascending: false });
      if (error) throw error;
      return data;
    },
    refetchInterval: 3e4
    // Refresh every 30 seconds
  });
  const { data: activeGuestsCount, isLoading: loadingGuests } = useQuery({
    queryKey: ["active_guests_count"],
    queryFn: async () => {
      const { data, error } = await supabase.from("analytics_events").select("metadata").eq("event_type", "guest_heartbeat").gt("created_at", activeThreshold);
      if (error) throw error;
      const uniqueGuests = new Set(data.map((e) => {
        var _a;
        return (_a = e.metadata) == null ? void 0 : _a.guest_id;
      }));
      return uniqueGuests.size;
    },
    refetchInterval: 3e4
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(GlassPanel, { className: "p-6 border-primary/20 bg-primary/5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-3 rounded-2xl bg-primary/20 text-primary", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-6 h-6" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-3xl font-black", children: (activeUsers == null ? void 0 : activeUsers.length) || 0 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-bold uppercase tracking-widest text-muted-foreground", children: "Active Members" })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(GlassPanel, { className: "p-6 border-white/10 bg-white/5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-3 rounded-2xl bg-blue-500/20 text-blue-400", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { className: "w-6 h-6" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-3xl font-black", children: activeGuestsCount || 0 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-bold uppercase tracking-widest text-muted-foreground", children: "Guest Sessions" })
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassPanel, { className: "p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-lg font-bold mb-6 flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "w-5 h-5 text-primary" }),
        "Live User Activity"
      ] }),
      loadingUsers ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center py-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-6 h-6 animate-spin text-primary" }) }) : activeUsers && activeUsers.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4", children: activeUsers.map((user) => {
        var _a;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 p-3 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-all group", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Avatar, { className: "w-10 h-10 ring-2 ring-primary/20", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarImage, { src: user.avatar_url || "" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarFallback, { className: "bg-primary/20 text-primary font-bold text-xs", children: ((_a = user.display_name) == null ? void 0 : _a[0]) || "U" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-sm truncate", children: user.display_name || "Anonymous" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground truncate", children: formatDistanceToNow(new Date(user.last_seen || ""), { addSuffix: true }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-2 h-2 rounded-full bg-emerald-500 animate-pulse" })
        ] }, user.id);
      }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "py-10 text-center border-2 border-dashed border-white/5 rounded-3xl", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "No registered users currently active." }) })
    ] })
  ] });
}
function useCreateNews() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input) => {
      var _a;
      const { data: sessionData } = await supabase.auth.getSession();
      const token = (_a = sessionData.session) == null ? void 0 : _a.access_token;
      if (!token) throw new Error("You must be signed in as an admin to publish news.");
      const res = await fetch(`${TATAKAI_API_URL}/admin/news`, {
        method: "POST",
        headers: withClientHeaders({
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }),
        body: JSON.stringify(input)
      });
      const json = await res.json().catch(() => null);
      if (!res.ok) {
        throw new Error((json == null ? void 0 : json.error) || `Failed to publish (HTTP ${res.status})`);
      }
      return unwrapApiData(json);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["feed"] });
    }
  });
}
function NewsComposer() {
  const createNews = useCreateNews();
  const [title, setTitle] = reactExports.useState("");
  const [content, setContent] = reactExports.useState("");
  const [excerpt, setExcerpt] = reactExports.useState("");
  const [imageUrl, setImageUrl] = reactExports.useState("");
  const [link, setLink] = reactExports.useState("");
  const [source, setSource] = reactExports.useState("");
  const [tags, setTags] = reactExports.useState("");
  const [isPinned, setIsPinned] = reactExports.useState(false);
  const reset = () => {
    setTitle("");
    setContent("");
    setExcerpt("");
    setImageUrl("");
    setLink("");
    setSource("");
    setTags("");
    setIsPinned(false);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim().length < 3) {
      ue.error("Title must be at least 3 characters.");
      return;
    }
    if (!content.trim()) {
      ue.error("Content is required.");
      return;
    }
    const tagList = tags.split(",").map((t) => t.trim()).filter(Boolean).slice(0, 20);
    createNews.mutate(
      {
        title: title.trim(),
        content: content.trim(),
        excerpt: excerpt.trim() || void 0,
        image_url: imageUrl.trim() || void 0,
        link: link.trim() || void 0,
        source: source.trim() || void 0,
        tags: tagList.length ? tagList : void 0,
        is_pinned: isPinned
      },
      {
        onSuccess: () => {
          ue.success("News published.");
          reset();
        },
        onError: (err) => {
          ue.error((err == null ? void 0 : err.message) || "Failed to publish news.");
        }
      }
    );
  };
  const busy = createNews.isPending;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-lg font-bold flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Newspaper, { className: "w-5 h-5 text-primary" }),
        "Publish News"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Posts to the News feed as the Tatakai News bot. Add a source link to set the article URL and dedup key; leave it blank for an original post." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(GlassPanel, { className: "p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "news-title", children: "Title *" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            id: "news-title",
            value: title,
            onChange: (e) => setTitle(e.target.value),
            placeholder: "Headline",
            maxLength: 300,
            disabled: busy
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "news-content", children: "Content *" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Textarea,
          {
            id: "news-content",
            value: content,
            onChange: (e) => setContent(e.target.value),
            placeholder: "Body of the announcement…",
            rows: 6,
            maxLength: 2e4,
            disabled: busy
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "news-excerpt", children: "Excerpt" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Textarea,
          {
            id: "news-excerpt",
            value: excerpt,
            onChange: (e) => setExcerpt(e.target.value),
            placeholder: "Optional short summary shown in the feed card",
            rows: 2,
            maxLength: 2e3,
            disabled: busy
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "news-image", children: "Image URL" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "news-image",
              type: "url",
              value: imageUrl,
              onChange: (e) => setImageUrl(e.target.value),
              placeholder: "https://…/cover.jpg",
              disabled: busy
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "news-link", children: "Source link" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "news-link",
              type: "url",
              value: link,
              onChange: (e) => setLink(e.target.value),
              placeholder: "https://source.example/article",
              disabled: busy
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "news-source", children: "Source name" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "news-source",
              value: source,
              onChange: (e) => setSource(e.target.value),
              placeholder: "Tatakai",
              maxLength: 120,
              disabled: busy
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "news-tags", children: "Tags (comma-separated)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "news-tags",
              value: tags,
              onChange: (e) => setTags(e.target.value),
              placeholder: "announcement, update",
              disabled: busy
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Pin, { className: "w-4 h-4 text-amber-400" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold", children: "Pin to top" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Keep this story above the feed." })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Switch, { checked: isPinned, onCheckedChange: setIsPinned, disabled: busy })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end gap-2 pt-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "ghost", onClick: reset, disabled: busy, children: "Clear" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", disabled: busy, children: busy ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 mr-2 animate-spin" }),
          "Publishing…"
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "w-4 h-4 mr-2" }),
          "Publish"
        ] }) })
      ] })
    ] }) })
  ] });
}
async function adminNewsFetch(path, init = {}) {
  var _a;
  const { data: sessionData } = await supabase.auth.getSession();
  const token = (_a = sessionData.session) == null ? void 0 : _a.access_token;
  if (!token) throw new Error("You must be signed in as an admin.");
  const res = await fetch(`${TATAKAI_API_URL}/admin/news${path}`, {
    ...init,
    headers: withClientHeaders({
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...init.headers
    })
  });
  const json = await res.json().catch(() => null);
  if (!res.ok) throw new Error((json == null ? void 0 : json.error) || `Request failed (HTTP ${res.status})`);
  return unwrapApiData(json);
}
function useNewsPosts(page = 1, limit = 30) {
  return useQuery({
    queryKey: ["admin-news", page, limit],
    queryFn: () => adminNewsFetch(`?page=${page}&limit=${limit}`)
  });
}
function useRefreshNews() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => adminNewsFetch("/refresh", { method: "POST" }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-news"] });
      queryClient.invalidateQueries({ queryKey: ["feed"] });
    }
  });
}
function useSetNewsPinned() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (args) => adminNewsFetch(`/${args.id}`, {
      method: "PATCH",
      body: JSON.stringify({ is_pinned: args.is_pinned })
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-news"] });
      queryClient.invalidateQueries({ queryKey: ["feed"] });
    }
  });
}
function useDeleteNews() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => adminNewsFetch(`/${id}`, { method: "DELETE" }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-news"] });
      queryClient.invalidateQueries({ queryKey: ["feed"] });
    }
  });
}
function NewsManager() {
  const confirm = useConfirm();
  const { data: posts = [], isLoading, isError, error } = useNewsPosts();
  const refresh = useRefreshNews();
  const setPinned = useSetNewsPinned();
  const del = useDeleteNews();
  const handleRefresh = async () => {
    try {
      const r = await refresh.mutateAsync();
      ue.success(
        r.inserted > 0 ? `Added ${r.inserted} new stor${r.inserted === 1 ? "y" : "ies"} (${r.aggregated} aggregated).` : `No new stories — ${r.aggregated} aggregated, all already present.`
      );
    } catch (err) {
      ue.error((err == null ? void 0 : err.message) || "Refresh failed.");
    }
  };
  const handlePin = async (p) => {
    try {
      await setPinned.mutateAsync({ id: p.id, is_pinned: !p.is_pinned });
      ue.success(p.is_pinned ? "Unpinned." : "Pinned to top.");
    } catch (err) {
      ue.error((err == null ? void 0 : err.message) || "Failed.");
    }
  };
  const handleDelete = async (p) => {
    if (!await confirm({ title: "Delete this news post?", description: p.title, destructive: true })) return;
    try {
      await del.mutateAsync(p.id);
      ue.success("News post deleted.");
    } catch (err) {
      ue.error((err == null ? void 0 : err.message) || "Failed to delete.");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center justify-between gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "flex items-center gap-2 text-lg font-bold", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Newspaper, { className: "h-5 w-5 text-primary" }),
          " Published news"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Pull fresh headlines from the aggregated sources, or manage existing bot posts." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: handleRefresh, disabled: refresh.isPending, className: "gap-2", children: [
        refresh.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "h-4 w-4" }),
        "Refresh from sources"
      ] })
    ] }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center py-12", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-6 w-6 animate-spin text-primary/60" }) }) : isError ? /* @__PURE__ */ jsxRuntimeExports.jsx(GlassPanel, { className: "p-8 text-center text-sm text-muted-foreground", children: (error == null ? void 0 : error.message) || "Failed to load news posts." }) : posts.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(GlassPanel, { className: "p-8 text-center text-sm text-muted-foreground", children: "No news posts yet. Publish one above or refresh from sources." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: posts.map((p) => {
      var _a, _b, _c;
      const source = ((_a = p.metadata) == null ? void 0 : _a.source) || "Tatakai";
      const manual = ((_b = p.metadata) == null ? void 0 : _b.manual) === true;
      const url = ((_c = p.metadata) == null ? void 0 : _c.news_url) || null;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: `flex items-start gap-3 rounded-lg border border-white/5 bg-white/[0.02] p-3 ${p.is_pinned ? "ring-1 ring-amber-400/30" : ""}`,
          children: [
            p.image_url ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: p.image_url, alt: "", className: "h-14 w-20 shrink-0 rounded-md object-cover", loading: "lazy" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-14 w-20 shrink-0 items-center justify-center rounded-md bg-white/5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Newspaper, { className: "h-5 w-5 text-muted-foreground/40" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-1.5", children: [
                p.is_pinned && /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "secondary", className: "gap-1 text-[10px]", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Pin, { className: "h-2.5 w-2.5" }),
                  " Pinned"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "outline", className: "gap-1 text-[10px]", children: [
                  manual ? /* @__PURE__ */ jsxRuntimeExports.jsx(PencilLine, { className: "h-2.5 w-2.5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Bot, { className: "h-2.5 w-2.5" }),
                  " ",
                  source
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 truncate text-sm font-medium", children: p.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-0.5 flex items-center gap-2 text-[11px] text-muted-foreground/70", children: [
                formatDistanceToNow(new Date(p.created_at), { addSuffix: true }),
                url && /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: url, target: "_blank", rel: "noreferrer", className: "inline-flex items-center gap-0.5 hover:text-primary", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "h-3 w-3" }),
                  " source"
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex shrink-0 items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  variant: "ghost",
                  size: "icon",
                  className: "h-8 w-8 text-amber-400 hover:bg-amber-400/10 hover:text-amber-400",
                  disabled: setPinned.isPending,
                  onClick: () => handlePin(p),
                  title: p.is_pinned ? "Unpin" : "Pin to top",
                  children: p.is_pinned ? /* @__PURE__ */ jsxRuntimeExports.jsx(PinOff, { className: "h-4 w-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Pin, { className: "h-4 w-4" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  variant: "ghost",
                  size: "icon",
                  className: "h-8 w-8 text-rose-400 hover:bg-rose-400/10 hover:text-rose-400",
                  disabled: del.isPending,
                  onClick: () => handleDelete(p),
                  title: "Delete",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" })
                }
              )
            ] })
          ]
        },
        p.id
      );
    }) })
  ] });
}
function RedirectManager() {
  const queryClient = useQueryClient();
  const confirm = useConfirm();
  const [isAdding, setIsAdding] = reactExports.useState(false);
  const [newRedirect, setNewRedirect] = reactExports.useState({ slug: "", target_url: "" });
  const { data: redirects, isLoading } = useQuery({
    queryKey: ["admin_redirects"],
    queryFn: async () => {
      const { data, error } = await supabase.from("redirects").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    }
  });
  const createRedirect = useMutation({
    mutationFn: async (redirect) => {
      const { error } = await supabase.from("redirects").insert([redirect]);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin_redirects"] });
      ue.success("Redirect created");
      setIsAdding(false);
      setNewRedirect({ slug: "", target_url: "" });
    },
    onError: (error) => {
      ue.error("Failed to create redirect: " + error.message);
    }
  });
  const deleteRedirect = useMutation({
    mutationFn: async (id) => {
      const { error } = await supabase.from("redirects").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin_redirects"] });
      ue.success("Redirect deleted");
    }
  });
  const toggleStatus = useMutation({
    mutationFn: async ({ id, is_active }) => {
      const { error } = await supabase.from("redirects").update({ is_active }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin_redirects"] });
    }
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-xl font-bold flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link$1, { className: "w-6 h-6 text-primary" }),
          "URL Redirects"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Manage custom short links and redirects" })
      ] }),
      !isAdding && /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: () => setIsAdding(true), className: "gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
        " Add Redirect"
      ] })
    ] }),
    isAdding && /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassPanel, { className: "p-4 border-primary/20 bg-primary/5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4 mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1 block", children: "Slug (e.g. discord)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground font-medium", children: "/" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                placeholder: "slug",
                value: newRedirect.slug,
                onChange: (e) => setNewRedirect({ ...newRedirect, slug: e.target.value })
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1 block", children: "Target URL" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              placeholder: "https://example.com",
              value: newRedirect.target_url,
              onChange: (e) => setNewRedirect({ ...newRedirect, target_url: e.target.value })
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", onClick: () => setIsAdding(false), children: "Cancel" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            onClick: () => createRedirect.mutate(newRedirect),
            disabled: createRedirect.isPending || !newRedirect.slug || !newRedirect.target_url,
            className: "gap-2",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "w-4 h-4" }),
              " Create Redirect"
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-3", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center py-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-8 h-8 animate-spin text-primary" }) }) : (redirects == null ? void 0 : redirects.length) === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center py-10 text-muted-foreground", children: "No redirects configured" }) : redirects == null ? void 0 : redirects.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsx(GlassPanel, { className: "p-4 hover:bg-white/5 transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `p-2 rounded-xl ${r.is_active ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link$1, { className: "w-5 h-5" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-bold", children: [
              "/",
              r.slug
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-3 h-3 text-muted-foreground" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground truncate max-w-md", children: r.target_url })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "ghost",
            size: "icon",
            className: "h-9 w-9 p-0 rounded-lg hover:text-primary",
            onClick: () => window.open(r.target_url, "_blank"),
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "w-4 h-4" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "ghost",
            size: "icon",
            className: `h-9 w-9 p-0 rounded-lg ${r.is_active ? "text-green-500" : "text-muted-foreground"}`,
            onClick: () => toggleStatus.mutate({ id: r.id, is_active: !r.is_active }),
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(CheckCircle, { className: "w-4 h-4" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "ghost",
            size: "icon",
            className: "h-9 w-9 p-0 rounded-lg hover:text-destructive text-muted-foreground",
            onClick: async () => {
              if (await confirm({ title: "Delete this redirect?", destructive: true })) deleteRedirect.mutate(r.id);
            },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-4 h-4" })
          }
        )
      ] })
    ] }) }, r.id)) })
  ] });
}
function ArrowRight({ className }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", className, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M5 12h14" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "m12 5 7 7-7 7" })
  ] });
}
function CheckCircle({ className }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", className, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M22 11.08V12a10 10 0 1 1-5.93-9.14" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("polyline", { points: "22 4 12 14.01 9 11.01" })
  ] });
}
function UserActivityLogs({ userId }) {
  const { data: comments, isLoading: loadingComments } = useQuery({
    queryKey: ["user_activity_comments", userId],
    queryFn: async () => {
      const { data, error } = await supabase.from("comments").select("*").eq("user_id", userId).order("created_at", { ascending: false }).limit(20);
      if (error) throw error;
      return data;
    }
  });
  const { data: posts, isLoading: loadingPosts } = useQuery({
    queryKey: ["user_activity_posts", userId],
    queryFn: async () => {
      const { data, error } = await supabase.from("forum_posts").select("*").eq("user_id", userId).order("created_at", { ascending: false }).limit(20);
      if (error) throw error;
      return data;
    }
  });
  const { data: tierLists, isLoading: loadingTierLists } = useQuery({
    queryKey: ["user_activity_tierlists", userId],
    queryFn: async () => {
      const { data, error } = await supabase.from("tier_lists").select("*").eq("user_id", userId).order("created_at", { ascending: false }).limit(20);
      if (error) throw error;
      return data;
    }
  });
  const { data: playlists, isLoading: loadingPlaylists } = useQuery({
    queryKey: ["user_activity_playlists", userId],
    queryFn: async () => {
      const { data, error } = await supabase.from("playlists").select("*").eq("user_id", userId).order("created_at", { ascending: false }).limit(20);
      if (error) throw error;
      return data;
    }
  });
  const formatDate2 = (date) => {
    try {
      return formatDistanceToNow(new Date(date), { addSuffix: true });
    } catch (e) {
      return "recently";
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "comments", className: "w-full", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "grid grid-cols-4 bg-muted/30 mb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "comments", className: "gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "w-4 h-4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: "Comments" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "posts", className: "gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(PanelsTopLeft, { className: "w-4 h-4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: "Posts" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "tierlists", className: "gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-4 h-4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: "Tier Lists" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "playlists", className: "gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(List, { className: "w-4 h-4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: "Playlists" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "comments", className: "mt-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: loadingComments ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "py-8 text-center text-muted-foreground", children: "Loading comments..." }) : (comments == null ? void 0 : comments.length) === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "py-8 text-center text-muted-foreground", children: "No recent comments" }) : comments == null ? void 0 : comments.map((comment) => /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassPanel, { className: "p-3 bg-muted/20 border-white/5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CommentContent, { content: comment.content, clamp: true, className: "text-sm mb-2" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CommentAttachments, { attachments: comment.attachments, className: "mb-2" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CommentEmbeds, { embeds: comment.embeds, poll: comment.poll }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-[10px] text-muted-foreground uppercase tracking-widest font-bold mt-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3 h-3" }),
          formatDate2(comment.created_at)
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: comment.entity_type })
      ] })
    ] }, comment.id)) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "posts", className: "mt-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: loadingPosts ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "py-8 text-center text-muted-foreground", children: "Loading posts..." }) : (posts == null ? void 0 : posts.length) === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "py-8 text-center text-muted-foreground", children: "No recent posts" }) : posts == null ? void 0 : posts.map((post) => /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassPanel, { className: "p-3 bg-muted/20 border-white/5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-4 mb-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-bold text-sm truncate", children: post.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: `/community/forum/${post.id}`, target: "_blank", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "w-3 h-3 text-primary hover:text-primary/80" }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 text-[10px] text-muted-foreground uppercase tracking-widest font-bold", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: formatDate2(post.created_at) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          post.views_count,
          " views"
        ] }),
        post.is_pinned && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "Pinned" })
      ] })
    ] }, post.id)) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "tierlists", className: "mt-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: loadingTierLists ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "py-8 text-center text-muted-foreground", children: "Loading tier lists..." }) : (tierLists == null ? void 0 : tierLists.length) === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "py-8 text-center text-muted-foreground", children: "No tier lists" }) : tierLists == null ? void 0 : tierLists.map((list) => /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassPanel, { className: "p-3 bg-muted/20 border-white/5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-4 mb-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-bold text-sm truncate", children: list.title }),
        list.share_code && /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: `/tierlist/${list.share_code}`, target: "_blank", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "w-3 h-3 text-primary" }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-2 line-clamp-1", children: list.description || "No description" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-muted-foreground font-bold", children: formatDate2(list.created_at) })
    ] }, list.id)) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "playlists", className: "mt-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: loadingPlaylists ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "py-8 text-center text-muted-foreground", children: "Loading playlists..." }) : (playlists == null ? void 0 : playlists.length) === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "py-8 text-center text-muted-foreground", children: "No playlists" }) : playlists == null ? void 0 : playlists.map((playlist) => /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassPanel, { className: "p-3 bg-muted/20 border-white/5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-4 mb-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-bold text-sm truncate", children: playlist.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: `/playlist/${playlist.id}`, target: "_blank", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "w-3 h-3 text-primary" }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 text-[10px] text-muted-foreground uppercase tracking-widest font-bold", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: formatDate2(playlist.created_at) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          playlist.items_count || 0,
          " items"
        ] }),
        playlist.is_public ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-emerald-500", children: "Public" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Private" })
      ] })
    ] }, playlist.id)) }) })
  ] });
}
function computeAutoUnlocked(totalEpisodes, uniqueAnime, totalMinutes, longestStreak) {
  const s = /* @__PURE__ */ new Set();
  if (totalEpisodes >= 1) s.add("filler-watcher");
  if (totalEpisodes >= 5) s.add("genin");
  if (totalEpisodes >= 10) s.add("chunin");
  if (longestStreak >= 7) s.add("week-warrior");
  if (totalEpisodes >= 35) s.add("plus-ultra");
  if (totalEpisodes >= 50) s.add("pro-hero");
  if (uniqueAnime >= 25) s.add("soul-reaper");
  if (totalEpisodes >= 100) s.add("bankai");
  if (uniqueAnime >= 50) s.add("survey-corps");
  if (longestStreak >= 30) s.add("month-legend");
  if (totalMinutes >= 5e3) s.add("demon-slayer");
  if (totalEpisodes >= 600) s.add("hashira");
  return s;
}
function AchievementManager() {
  const [search, setSearch] = reactExports.useState("");
  const [selectedUser, setSelectedUser] = reactExports.useState(null);
  const [note, setNote] = reactExports.useState("");
  const { data: users = [], isFetching: searchFetching } = useQuery({
    queryKey: ["admin_achievement_user_search", search],
    enabled: search.trim().length >= 2,
    queryFn: async () => {
      const { data, error } = await supabase.from("profiles").select("user_id, display_name, username, avatar_url").or(`display_name.ilike.%${search}%,username.ilike.%${search}%`).limit(10);
      if (error) throw error;
      return data ?? [];
    }
  });
  const { data: watchStats } = useQuery({
    queryKey: ["admin_watch_stats", selectedUser == null ? void 0 : selectedUser.user_id],
    enabled: !!selectedUser,
    queryFn: async () => {
      const { data, error } = await supabase.from("watch_history").select("anime_id, duration_seconds, watched_at").eq("user_id", selectedUser.user_id);
      if (error) throw error;
      const history = data ?? [];
      const totalEpisodes = history.length;
      const uniqueAnime = new Set(history.map((h) => h.anime_id)).size;
      const totalMinutes = history.reduce((s, h) => s + Math.floor((h.duration_seconds || 0) / 60), 0);
      const days = Array.from(
        new Set(history.map((h) => new Date(h.watched_at).toISOString().slice(0, 10)))
      ).sort();
      let longest = 0, cur = 0;
      for (let i = 0; i < days.length; i++) {
        if (i === 0) {
          cur = 1;
        } else {
          const prev = new Date(days[i - 1]);
          const curr = new Date(days[i]);
          const diff = (curr.getTime() - prev.getTime()) / 864e5;
          cur = diff === 1 ? cur + 1 : 1;
        }
        if (cur > longest) longest = cur;
      }
      return { totalEpisodes, uniqueAnime, totalMinutes, longestStreak: longest };
    }
  });
  const { data: grants = [] } = useUserAchievements(selectedUser == null ? void 0 : selectedUser.user_id);
  const grantedSet = new Set(grants.map((g) => g.achievement_id));
  const autoSet = watchStats ? computeAutoUnlocked(
    watchStats.totalEpisodes,
    watchStats.uniqueAnime,
    watchStats.totalMinutes,
    watchStats.longestStreak
  ) : /* @__PURE__ */ new Set();
  const grantMutation = useGrantAchievement();
  const revokeMutation = useRevokeAchievement();
  const isPending = grantMutation.isPending || revokeMutation.isPending;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "w-5 h-5 text-amber-400" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-bold font-display", children: "Achievement Manager" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassPanel, { className: "p-4 space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            className: "pl-9",
            placeholder: "Search user by name or @username…",
            value: search,
            onChange: (e) => setSearch(e.target.value)
          }
        ),
        searchFetching && /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 animate-spin text-muted-foreground" })
      ] }),
      users.length > 0 && !selectedUser && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-md border border-border divide-y divide-border", children: users.map((u) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          className: "w-full flex items-center gap-3 px-3 py-2 text-left hover:bg-muted/40 transition-colors",
          onClick: () => {
            setSelectedUser(u);
            setSearch("");
          },
          children: [
            u.avatar_url ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: u.avatar_url, className: "w-7 h-7 rounded-full object-cover", alt: "" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(CircleUser, { className: "w-7 h-7 text-muted-foreground" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium", children: u.display_name }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
              "@",
              u.username
            ] })
          ]
        },
        u.user_id
      )) })
    ] }),
    selectedUser && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassPanel, { className: "p-4 flex items-center gap-4", children: [
        selectedUser.avatar_url ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: selectedUser.avatar_url, className: "w-10 h-10 rounded-full object-cover", alt: "" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(CircleUser, { className: "w-10 h-10 text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-bold", children: selectedUser.display_name }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground", children: [
            "@",
            selectedUser.username
          ] }),
          watchStats && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2 mt-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "secondary", children: [
              watchStats.totalEpisodes,
              " eps"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "secondary", children: [
              watchStats.uniqueAnime,
              " anime"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "secondary", children: [
              watchStats.totalMinutes,
              " min"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "secondary", children: [
              watchStats.longestStreak,
              "d streak"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "ghost", onClick: () => setSelectedUser(null), children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassPanel, { className: "p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs font-medium text-muted-foreground mb-1 block", children: "Grant note (optional, attached to next grant)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Textarea,
          {
            rows: 2,
            placeholder: "e.g. Granted as part of season 1 event",
            value: note,
            onChange: (e) => setNote(e.target.value)
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3", children: ACHIEVEMENTS.map((a) => {
        const isAuto = autoSet.has(a.id);
        const isManual = grantedSet.has(a.id);
        const unlocked = isAuto || isManual;
        const ns = getRankNameStyleForRank(a.rank);
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          GlassPanel,
          {
            className: cn(
              "p-3 flex flex-col items-center gap-2 text-center relative overflow-hidden",
              !unlocked && "opacity-50 grayscale"
            ),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute top-2 left-2", children: [
                isAuto && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "text-[9px] px-1 py-0", children: "auto" }),
                isManual && !isAuto && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "default", className: "text-[9px] px-1 py-0 bg-amber-500/80", children: "admin" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: getRankImageUrl(a.rank),
                  alt: a.title,
                  className: "w-10 h-10 object-contain mt-2"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: cn("text-xs font-bold leading-tight", unlocked ? ns.className : ""),
                    style: unlocked ? ns.style : {},
                    children: a.title
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-muted-foreground mt-0.5 leading-tight", children: a.description })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full mt-auto pt-1 flex gap-1", children: [
                !isManual && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    size: "sm",
                    variant: "outline",
                    className: "flex-1 h-6 text-[10px]",
                    disabled: isPending,
                    onClick: () => grantMutation.mutate(
                      { userId: selectedUser.user_id, achievementId: a.id, note },
                      {
                        onSuccess: () => {
                          ue.success("Achievement granted");
                          setNote("");
                        },
                        onError: (e) => ue.error("Grant failed: " + e.message)
                      }
                    ),
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-3 h-3 mr-1" }),
                      "Grant"
                    ]
                  }
                ),
                isManual && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    size: "sm",
                    variant: "destructive",
                    className: "flex-1 h-6 text-[10px]",
                    disabled: isPending,
                    onClick: () => revokeMutation.mutate(
                      { userId: selectedUser.user_id, achievementId: a.id },
                      {
                        onSuccess: () => ue.success("Achievement revoked"),
                        onError: (e) => ue.error("Revoke failed: " + e.message)
                      }
                    ),
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-3 h-3 mr-1" }),
                      "Revoke"
                    ]
                  }
                )
              ] })
            ]
          },
          a.id
        );
      }) })
    ] })
  ] });
}
function BadgeManager() {
  const queryClient = useQueryClient();
  const [search, setSearch] = reactExports.useState("");
  const [selectedUser, setSelectedUser] = reactExports.useState(null);
  const [note, setNote] = reactExports.useState("");
  const { data: users = [], isFetching: searchFetching } = useQuery({
    queryKey: ["admin_badge_user_search", search],
    enabled: search.trim().length >= 2,
    queryFn: async () => {
      const { data, error } = await supabase.from("profiles").select("user_id, display_name, username, avatar_url").or(`display_name.ilike.%${search}%,username.ilike.%${search}%`).limit(10);
      if (error) throw error;
      return data ?? [];
    }
  });
  const { data: grants = [] } = useQuery({
    queryKey: ["admin_user_badges", selectedUser == null ? void 0 : selectedUser.user_id],
    enabled: !!selectedUser,
    queryFn: async () => {
      const { data, error } = await supabase.from("user_badges").select("badge_key, source, note").eq("user_id", selectedUser.user_id);
      if (error) throw error;
      return data ?? [];
    }
  });
  const grantByKey = new Map(grants.map((g) => [g.badge_key, g]));
  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: ["admin_user_badges", selectedUser == null ? void 0 : selectedUser.user_id] });
    queryClient.invalidateQueries({ queryKey: ["user_badges", selectedUser == null ? void 0 : selectedUser.user_id] });
    queryClient.invalidateQueries({ queryKey: ["user_badges_batch"] });
  };
  const grantMutation = useMutation({
    mutationFn: async (badgeKey) => {
      const { error } = await supabase.rpc("grant_badge", {
        target_user_id: selectedUser.user_id,
        p_badge_key: badgeKey,
        p_note: note.trim() || null
      });
      if (error) throw error;
    },
    onSuccess: () => {
      invalidate();
      ue.success("Badge granted");
      setNote("");
    },
    onError: (e) => ue.error("Grant failed: " + e.message)
  });
  const revokeMutation = useMutation({
    mutationFn: async (badgeKey) => {
      const { error } = await supabase.rpc("revoke_badge", {
        target_user_id: selectedUser.user_id,
        p_badge_key: badgeKey
      });
      if (error) throw error;
    },
    onSuccess: () => {
      invalidate();
      ue.success("Badge revoked");
    },
    onError: (e) => ue.error("Revoke failed: " + e.message)
  });
  const recomputeMutation = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.rpc("recompute_user_badges", {
        p_user_id: selectedUser.user_id
      });
      if (error) throw error;
    },
    onSuccess: () => {
      invalidate();
      ue.success("Auto badges recomputed");
    },
    onError: (e) => ue.error("Recompute failed: " + e.message)
  });
  const isPending = grantMutation.isPending || revokeMutation.isPending || recomputeMutation.isPending;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Award, { className: "w-5 h-5 text-violet-400" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-bold font-display", children: "Badge Manager" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassPanel, { className: "p-4 space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            className: "pl-9",
            placeholder: "Search user by name or @username…",
            value: search,
            onChange: (e) => setSearch(e.target.value)
          }
        ),
        searchFetching && /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 animate-spin text-muted-foreground" })
      ] }),
      users.length > 0 && !selectedUser && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-md border border-border divide-y divide-border", children: users.map((u) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          className: "w-full flex items-center gap-3 px-3 py-2 text-left hover:bg-muted/40 transition-colors",
          onClick: () => {
            setSelectedUser(u);
            setSearch("");
          },
          children: [
            u.avatar_url ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: u.avatar_url, className: "w-7 h-7 rounded-full object-cover", alt: "" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(CircleUser, { className: "w-7 h-7 text-muted-foreground" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium", children: u.display_name }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
              "@",
              u.username
            ] })
          ]
        },
        u.user_id
      )) })
    ] }),
    selectedUser && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassPanel, { className: "p-4 flex items-center gap-4", children: [
        selectedUser.avatar_url ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: selectedUser.avatar_url, className: "w-10 h-10 rounded-full object-cover", alt: "" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(CircleUser, { className: "w-10 h-10 text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-bold", children: selectedUser.display_name }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground", children: [
            "@",
            selectedUser.username
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", variant: "outline", disabled: isPending, onClick: () => recomputeMutation.mutate(), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: cn("w-4 h-4 mr-1", recomputeMutation.isPending && "animate-spin") }),
          "Recompute auto"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "ghost", onClick: () => setSelectedUser(null), children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassPanel, { className: "p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs font-medium text-muted-foreground mb-1 block", children: "Grant note (optional, attached to next grant)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Textarea,
          {
            rows: 2,
            placeholder: "e.g. Season 1 event reward",
            value: note,
            onChange: (e) => setNote(e.target.value)
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3", children: BADGES.map((b) => {
        const grant = grantByKey.get(b.key);
        const held = !!grant;
        const isDerived = b.key === "admin" || b.key === "mod";
        const rarity = RARITY_STYLES[b.rarity];
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          GlassPanel,
          {
            className: cn(
              "p-3 flex flex-col items-center gap-2 text-center relative overflow-hidden",
              !held && !isDerived && "opacity-60"
            ),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute top-2 left-2 flex gap-1", children: [
                (grant == null ? void 0 : grant.source) === "auto" && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "text-[9px] px-1 py-0", children: "auto" }),
                (grant == null ? void 0 : grant.source) === "admin" && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "text-[9px] px-1 py-0 bg-amber-500/80", children: "admin" }),
                isDerived && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "text-[9px] px-1 py-0", children: "role" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: cn("absolute top-2 right-2 text-[9px] font-bold uppercase", rarity.text), children: rarity.label }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: b.image, alt: b.label, className: "w-10 h-10 object-contain mt-2" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-bold leading-tight", children: b.label }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-muted-foreground mt-0.5 leading-tight", children: b.description })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full mt-auto pt-1 flex gap-1", children: isDerived ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-1 text-[10px] text-muted-foreground py-1", children: "from role" }) : !held ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  size: "sm",
                  variant: "outline",
                  className: "flex-1 h-6 text-[10px]",
                  disabled: isPending,
                  onClick: () => grantMutation.mutate(b.key),
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-3 h-3 mr-1" }),
                    " Grant"
                  ]
                }
              ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  size: "sm",
                  variant: "destructive",
                  className: "flex-1 h-6 text-[10px]",
                  disabled: isPending,
                  onClick: () => revokeMutation.mutate(b.key),
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-3 h-3 mr-1" }),
                    " Revoke"
                  ]
                }
              ) })
            ]
          },
          b.key
        );
      }) })
    ] })
  ] });
}
const fetchJson = async (path, init, timeoutMs = 12e3) => {
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), timeoutMs);
  try {
    const providedHeaders = (init == null ? void 0 : init.headers) || {};
    const response = await fetch(`${TATAKAI_API_URL}${path}`, {
      ...init,
      headers: withAdminSecretHeader({
        Accept: "application/json",
        ...providedHeaders
      }),
      signal: controller.signal
    });
    let json = null;
    try {
      json = await response.json();
    } catch {
      json = null;
    }
    if (!response.ok) {
      const message = String((json == null ? void 0 : json.message) || `HTTP ${response.status}`);
      throw new Error(message);
    }
    if (!json) return {};
    return unwrapApiData(json);
  } finally {
    window.clearTimeout(timeout);
  }
};
const statusPillClass = (status) => {
  if (status === "operational" || status === "success") {
    return "bg-emerald-500/20 text-emerald-500 border-emerald-500/40";
  }
  if (status === "degraded") {
    return "bg-amber-500/20 text-amber-500 border-amber-500/40";
  }
  return "bg-destructive/20 text-destructive border-destructive/40";
};
function ApiAdminPanel() {
  var _a, _b, _c;
  const queryClient = useQueryClient();
  const [recentLimit, setRecentLimit] = reactExports.useState("10");
  const [validationLimit, setValidationLimit] = reactExports.useState("8");
  const [validationTimeoutMs, setValidationTimeoutMs] = reactExports.useState("9000");
  const [webhookMessage, setWebhookMessage] = reactExports.useState("Tatakai API admin test message");
  const [lastValidationRun, setLastValidationRun] = reactExports.useState(null);
  const parsedRecentLimit = reactExports.useMemo(() => {
    const value = Number.parseInt(recentLimit, 10);
    if (!Number.isFinite(value)) return 10;
    return Math.max(1, Math.min(value, 50));
  }, [recentLimit]);
  const scraperHealthQuery = useQuery({
    queryKey: ["admin-api", "scraper-health"],
    queryFn: () => fetchJson("/health/scrapers"),
    refetchInterval: 6e4
  });
  const canonicalSummaryQuery = useQuery({
    queryKey: ["admin-api", "canonical-summary", parsedRecentLimit],
    queryFn: () => fetchJson(
      `/jobs/canonical/summary?recent=${parsedRecentLimit}`
    ),
    refetchInterval: 6e4
  });
  const sourceValidationMutation = useMutation({
    mutationFn: async () => {
      const limit = Math.max(1, Math.min(Number.parseInt(validationLimit, 10) || 8, 50));
      const timeoutMs = Math.max(
        1500,
        Math.min(Number.parseInt(validationTimeoutMs, 10) || 9e3, 2e4)
      );
      return fetchJson(
        `/jobs/source-validation/random-check?limit=${limit}&timeoutMs=${timeoutMs}`,
        { method: "GET" },
        timeoutMs + 5e3
      );
    },
    onSuccess: (payload) => {
      setLastValidationRun(payload);
      queryClient.invalidateQueries({ queryKey: ["admin-api", "canonical-summary"] });
      ue.success(
        `Source validation done: ${payload.healthy} healthy / ${payload.unhealthy} unhealthy`
      );
    },
    onError: (error) => {
      ue.error((error == null ? void 0 : error.message) || "Failed to run source validation sample");
    }
  });
  const webhookMutation = useMutation({
    mutationFn: async () => {
      const content = webhookMessage.trim();
      if (!content) {
        throw new Error("Webhook message cannot be empty");
      }
      return fetchJson("/webhooks/discord", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          channel: "status",
          content: `[Admin API Panel] ${content}`,
          username: "Tatakai API Admin"
        })
      });
    },
    onSuccess: () => {
      ue.success("Discord webhook test sent");
    },
    onError: (error) => {
      ue.error((error == null ? void 0 : error.message) || "Failed to send Discord webhook test");
    }
  });
  const scraperSummary = (_a = scraperHealthQuery.data) == null ? void 0 : _a.summary;
  const scraperNodes = ((_b = scraperHealthQuery.data) == null ? void 0 : _b.scrapers) || [];
  const canonicalData = canonicalSummaryQuery.data;
  const canonicalSummary = canonicalData == null ? void 0 : canonicalData.summary;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(GlassPanel, { className: "p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 rounded-lg bg-primary/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Server, { className: "w-5 h-5 text-primary" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Operational Scrapers" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl font-bold", children: scraperSummary ? `${scraperSummary.operational}/${scraperSummary.total}` : "--" })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(GlassPanel, { className: "p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 rounded-lg bg-secondary/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Database, { className: "w-5 h-5 text-secondary" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Canonical Snapshots" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl font-bold", children: canonicalSummary ? canonicalSummary.snapshotTotal : "--" })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(GlassPanel, { className: "p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 rounded-lg bg-amber-500/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "w-5 h-5 text-amber-500" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Source Queue Due" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl font-bold", children: canonicalSummary ? canonicalSummary.sourceQueue.due : "--" })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(GlassPanel, { className: "p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 rounded-lg bg-emerald-500/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-5 h-5 text-emerald-500" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Last Validation Check" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl font-bold", children: lastValidationRun ? `${lastValidationRun.checked} (${lastValidationRun.healthy}/${lastValidationRun.unhealthy})` : "--" })
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassPanel, { className: "p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3 mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-xl font-semibold flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Server, { className: "w-5 h-5 text-primary" }),
            "API Health and Scrapers"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mt-1", children: [
            "Live health from ",
            TATAKAI_API_URL,
            "/health/scrapers"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "a",
            {
              href: `${TATAKAI_API_URL}/health/scrapers`,
              target: "_blank",
              rel: "noreferrer",
              className: "inline-flex",
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", size: "sm", className: "gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "w-4 h-4" }),
                "Open"
              ] })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "outline",
              size: "sm",
              className: "gap-2",
              onClick: () => scraperHealthQuery.refetch(),
              disabled: scraperHealthQuery.isFetching,
              children: [
                scraperHealthQuery.isFetching ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-4 h-4" }),
                "Refresh"
              ]
            }
          )
        ] })
      ] }),
      scraperHealthQuery.isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Loading scraper health..." }) : scraperHealthQuery.isError ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-destructive", children: "Failed to load scraper health." }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-border/40 p-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Total" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg font-bold", children: (scraperSummary == null ? void 0 : scraperSummary.total) ?? 0 })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-border/40 p-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Operational" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg font-bold text-emerald-500", children: (scraperSummary == null ? void 0 : scraperSummary.operational) ?? 0 })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-border/40 p-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Degraded" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg font-bold text-amber-500", children: (scraperSummary == null ? void 0 : scraperSummary.degraded) ?? 0 })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-border/40 p-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Down" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg font-bold text-destructive", children: (scraperSummary == null ? void 0 : scraperSummary.down) ?? 0 })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: scraperNodes.map((node) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "rounded-lg border border-border/40 p-3 flex items-center justify-between",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: node.label }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: node.id })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: `px-2 py-1 rounded-full text-xs font-semibold border ${statusPillClass(
                      node.status
                    )}`,
                    children: node.status
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
                  node.latencyMs,
                  "ms"
                ] })
              ] })
            ]
          },
          node.id
        )) }),
        ((_c = scraperHealthQuery.data) == null ? void 0 : _c.checkedAt) && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
          "Last checked ",
          formatDistanceToNow(new Date(scraperHealthQuery.data.checkedAt), { addSuffix: true })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassPanel, { className: "p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3 mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-xl font-semibold flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Database, { className: "w-5 h-5 text-primary" }),
            "Canonical Store Summary"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Snapshot totals, queue state, and recent canonical jobs." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              value: recentLimit,
              onChange: (event) => setRecentLimit(event.target.value),
              className: "w-20 h-9",
              "aria-label": "Recent rows"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", size: "sm", onClick: () => canonicalSummaryQuery.refetch(), children: "Refresh" })
        ] })
      ] }),
      !(canonicalData == null ? void 0 : canonicalData.enabled) ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-amber-500/30 bg-amber-500/10 p-3 text-sm text-amber-500 flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-4 h-4" }),
        "Canonical database is disabled."
      ] }) : canonicalSummaryQuery.isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Loading canonical summary..." }) : canonicalSummaryQuery.isError ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-destructive", children: "Failed to load canonical summary." }) : canonicalSummary ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 md:grid-cols-5 gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-border/40 p-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Snapshots" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg font-bold", children: canonicalSummary.snapshotTotal })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-border/40 p-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Queue Total" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg font-bold", children: canonicalSummary.sourceQueue.total })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-border/40 p-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Pending" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg font-bold", children: canonicalSummary.sourceQueue.pending })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-border/40 p-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Healthy" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg font-bold text-emerald-500", children: canonicalSummary.sourceQueue.healthy })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-border/40 p-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Unhealthy" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg font-bold text-destructive", children: canonicalSummary.sourceQueue.unhealthy })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-border/40 p-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium mb-2", children: "Snapshot by scope" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: canonicalSummary.snapshotByScope.map((row) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "uppercase text-muted-foreground tracking-wide", children: row.scope }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold", children: row.count })
            ] }, row.scope)) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-border/40 p-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium mb-2", children: "Recent jobs" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2 max-h-44 overflow-auto pr-1", children: canonicalSummary.recentJobs.map((job, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm border-b border-border/30 pb-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: job.jobName }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: `px-2 py-0.5 rounded-full text-xs border ${statusPillClass(job.status)}`,
                    children: job.status
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: new Date(job.startedAt).toLocaleString() })
            ] }, `${job.jobName}-${index}`)) })
          ] })
        ] })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No canonical summary available." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassPanel, { className: "p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-start justify-between gap-3 mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-xl font-semibold flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-5 h-5 text-primary" }),
          "Source Validation Job"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Run the random source-validation sampler from the admin dashboard." })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-3 mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            value: validationLimit,
            onChange: (event) => setValidationLimit(event.target.value),
            placeholder: "Limit (1-50)"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            value: validationTimeoutMs,
            onChange: (event) => setValidationTimeoutMs(event.target.value),
            placeholder: "Timeout ms (1500-20000)"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            onClick: () => sourceValidationMutation.mutate(),
            disabled: sourceValidationMutation.isPending,
            className: "gap-2",
            children: [
              sourceValidationMutation.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "w-4 h-4" }),
              "Run Validation"
            ]
          }
        )
      ] }),
      lastValidationRun && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm text-muted-foreground", children: [
          "Checked ",
          lastValidationRun.checked,
          ", healthy ",
          lastValidationRun.healthy,
          ", unhealthy",
          " ",
          lastValidationRun.unhealthy
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2 max-h-48 overflow-auto pr-1", children: lastValidationRun.results.map((result) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "rounded-lg border border-border/40 p-2 flex items-center justify-between gap-2 text-sm",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                result.ok ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4 text-emerald-500" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-4 h-4 text-destructive" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                  "Queue #",
                  result.id
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
                result.status || "no-status",
                " ",
                result.error ? `(${result.error})` : ""
              ] })
            ]
          },
          result.id
        )) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassPanel, { className: "p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-xl font-semibold flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "w-5 h-5 text-primary" }),
          "API Webhook Smoke Test"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Sends a test payload to /webhooks/discord using the status channel." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col md:flex-row gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            value: webhookMessage,
            onChange: (event) => setWebhookMessage(event.target.value),
            placeholder: "Webhook message"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            onClick: () => webhookMutation.mutate(),
            disabled: webhookMutation.isPending,
            className: "gap-2",
            children: [
              webhookMutation.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "w-4 h-4" }),
              "Send Test"
            ]
          }
        )
      ] })
    ] })
  ] });
}
function groupSignupsByPeriod(timestamps, period, rangeStart, rangeEnd) {
  const buckets = /* @__PURE__ */ new Map();
  for (const ts of timestamps) {
    const date = parseISO(ts);
    const bucketDate = getBucketStart(date, period);
    const key = formatBucketKey(bucketDate, period);
    buckets.set(key, (buckets.get(key) ?? 0) + 1);
  }
  return Array.from(buckets.entries()).sort(([a], [b]) => a < b ? -1 : a > b ? 1 : 0).map(([date, count]) => ({ date, count }));
}
function getBucketStart(date, period) {
  switch (period) {
    case "day":
      return startOfDay(date);
    case "week":
      return startOfWeek(date, { weekStartsOn: 1 });
    case "month":
      return startOfMonth(date);
  }
}
function formatBucketKey(date, period) {
  switch (period) {
    case "day":
      return format(date, "yyyy-MM-dd");
    case "week":
      return format(date, "yyyy-MM-dd");
    // ISO week start date
    case "month":
      return format(date, "yyyy-MM");
  }
}
function computeDau(pageVisits) {
  const dailyUsers = /* @__PURE__ */ new Map();
  for (const visit of pageVisits) {
    if (visit.user_id === null) continue;
    const day = format(parseISO(visit.created_at), "yyyy-MM-dd");
    if (!dailyUsers.has(day)) {
      dailyUsers.set(day, /* @__PURE__ */ new Set());
    }
    dailyUsers.get(day).add(visit.user_id);
  }
  return Array.from(dailyUsers.entries()).sort(([a], [b]) => a < b ? -1 : a > b ? 1 : 0).map(([date, users]) => ({ date, dau: users.size }));
}
function computeRetention(cohortSignups, activityRecords) {
  const cohortSize = cohortSignups.length;
  if (cohortSize === 0) return 0;
  const activityByUser = /* @__PURE__ */ new Map();
  for (const record of activityRecords) {
    const ms = parseISO(record.created_at).getTime();
    if (!activityByUser.has(record.user_id)) {
      activityByUser.set(record.user_id, []);
    }
    activityByUser.get(record.user_id).push(ms);
  }
  let retainedCount = 0;
  for (const signup of cohortSignups) {
    const signupDate = parseISO(signup.created_at);
    const windowStart = startOfDay(signupDate);
    const windowEnd = addDays(windowStart, 7);
    const activities = activityByUser.get(signup.user_id);
    if (!activities) continue;
    const hasActivity = activities.some(
      (ms) => isWithinInterval(ms, { start: windowStart, end: windowEnd })
    );
    if (hasActivity) retainedCount++;
  }
  const pct = retainedCount / cohortSize * 100;
  return Math.min(100, Math.max(0, pct));
}
function topCountries(signups, n) {
  const counts = /* @__PURE__ */ new Map();
  for (const signup of signups) {
    if (signup.country === null) continue;
    counts.set(signup.country, (counts.get(signup.country) ?? 0) + 1);
  }
  return Array.from(counts.entries()).map(([country, count]) => ({ country, count })).sort((a, b) => b.count - a.count || a.country.localeCompare(b.country)).slice(0, n);
}
const makeQueryKey = (timeRange) => ["admin_user_stats", timeRange];
const RETENTION_QUERY_KEY = ["admin_user_stats_retention"];
function getRangeStart(timeRange) {
  const now = /* @__PURE__ */ new Date();
  switch (timeRange) {
    case "day":
      return startOfDay(now);
    case "week":
      return startOfDay(subDays(now, 6));
    case "month":
      return startOfDay(subDays(now, 29));
  }
}
function UserStatsPanel() {
  const [timeRange, setTimeRange] = reactExports.useState("week");
  const {
    data: stats,
    isLoading,
    isError,
    refetch,
    isFetching
  } = useQuery({
    queryKey: makeQueryKey(timeRange),
    queryFn: async () => {
      const rangeStart = getRangeStart(timeRange);
      const rangeStartISO = rangeStart.toISOString();
      const { count: totalCount, error: countError } = await supabase.from("profiles").select("*", { count: "exact", head: true });
      if (countError) throw countError;
      const { data: signupRows, error: signupError } = await supabase.from("profiles").select("created_at").gte("created_at", rangeStartISO);
      if (signupError) throw signupError;
      const signupTimestamps = (signupRows ?? []).map((r) => r.created_at);
      const signupGroups = groupSignupsByPeriod(signupTimestamps, timeRange);
      let countriesInput = [];
      try {
        const { data: countryRows } = await supabase.from("profiles").select("country").gte("created_at", rangeStartISO);
        countriesInput = (countryRows ?? []).map((r) => ({ country: r.country }));
      } catch (_) {
      }
      const { data: pageVisitRows, error: pvError } = await supabase.from("page_visits").select("user_id, created_at").gte("created_at", rangeStartISO);
      if (pvError) throw pvError;
      const dauSeries = computeDau(
        pageVisitRows ?? []
      );
      const topCountriesList = topCountries(countriesInput, 5);
      return {
        totalCount: totalCount ?? 0,
        signupGroups,
        dauSeries,
        topCountries: topCountriesList
      };
    },
    staleTime: 2 * 60 * 1e3
    // 2 minutes — fresh enough for admin use
  });
  const {
    data: retentionPercent,
    isLoading: isRetentionLoading,
    isError: isRetentionError,
    refetch: refetchRetention
  } = useQuery({
    queryKey: RETENTION_QUERY_KEY,
    queryFn: async () => {
      const cohortStart = subMonths(/* @__PURE__ */ new Date()).toISOString();
      const { data: cohortRows, error: cohortError } = await supabase.from("profiles").select("id, created_at").gte("created_at", cohortStart);
      if (cohortError) throw cohortError;
      if (!cohortRows || cohortRows.length === 0) return 0;
      const cohortSignups = cohortRows.map((r) => ({
        user_id: r.id,
        created_at: r.created_at
      }));
      const cohortUserIds = cohortSignups.map((u) => u.user_id);
      const { data: activityRows, error: activityError } = await supabase.from("page_visits").select("user_id, created_at").in("user_id", cohortUserIds).not("user_id", "is", null);
      if (activityError) throw activityError;
      return computeRetention(cohortSignups, activityRows ?? []);
    },
    staleTime: 5 * 60 * 1e3
  });
  const handleRetry = reactExports.useCallback(() => {
    void refetch();
    void refetchRetention();
  }, [refetch, refetchRetention]);
  const handleTimeRangeChange = reactExports.useCallback(
    (range) => {
      setTimeRange(range);
    },
    []
  );
  const renderTimeRangeSelector = () => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 bg-muted/50 p-1 rounded-xl", children: ["day", "week", "month"].map((range) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    "button",
    {
      onClick: () => handleTimeRangeChange(range),
      className: `px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${timeRange === range ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`,
      children: range.charAt(0).toUpperCase() + range.slice(1)
    },
    range
  )) });
  const renderLoadingState = () => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center py-20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-10 h-10 animate-spin text-primary opacity-50" }) });
  const renderErrorState = () => /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassPanel, { className: "p-12 text-center border-destructive/20 bg-destructive/5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-10 h-10 text-destructive/50 mx-auto mb-4" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-destructive mb-4", children: "Failed to load user statistics" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Button,
      {
        variant: "outline",
        size: "sm",
        onClick: handleRetry,
        className: "gap-2 border-destructive/30 hover:bg-destructive/10 text-destructive",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-4 h-4" }),
          "Retry"
        ]
      }
    )
  ] });
  const renderEmptyChart = () => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center h-48 text-sm text-muted-foreground", children: "No data available for the selected period" });
  const renderSignupChart = () => {
    const data = (stats == null ? void 0 : stats.signupGroups) ?? [];
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassPanel, { className: "p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-sm font-semibold mb-4 flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-4 h-4 text-primary" }),
        "Signup Trend"
      ] }),
      data.length === 0 ? renderEmptyChart() : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-48", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(BarChart, { data, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "hsl(var(--border))" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          XAxis,
          {
            dataKey: "date",
            stroke: "hsl(var(--muted-foreground))",
            fontSize: 11,
            tickFormatter: (val) => {
              if (timeRange === "month") return val.slice(0, 7);
              return val.slice(5);
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          YAxis,
          {
            stroke: "hsl(var(--muted-foreground))",
            fontSize: 11,
            allowDecimals: false
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Tooltip,
          {
            contentStyle: {
              backgroundColor: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "8px"
            },
            labelFormatter: (label) => `Date: ${label}`
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Bar,
          {
            dataKey: "count",
            fill: "hsl(var(--primary))",
            radius: [4, 4, 0, 0],
            name: "New Signups"
          }
        )
      ] }) }) })
    ] });
  };
  const renderDauChart = () => {
    const data = (stats == null ? void 0 : stats.dauSeries) ?? [];
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassPanel, { className: "p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-sm font-semibold mb-4 flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "w-4 h-4 text-primary" }),
        "Daily Active Users (DAU)"
      ] }),
      data.length === 0 ? renderEmptyChart() : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-48", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(BarChart, { data, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "hsl(var(--border))" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          XAxis,
          {
            dataKey: "date",
            stroke: "hsl(var(--muted-foreground))",
            fontSize: 11,
            tickFormatter: (val) => val.slice(5)
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          YAxis,
          {
            stroke: "hsl(var(--muted-foreground))",
            fontSize: 11,
            allowDecimals: false
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Tooltip,
          {
            contentStyle: {
              backgroundColor: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "8px"
            },
            labelFormatter: (label) => `Date: ${label}`
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Bar,
          {
            dataKey: "dau",
            fill: "#10b981",
            radius: [4, 4, 0, 0],
            name: "DAU"
          }
        )
      ] }) }) })
    ] });
  };
  const renderTopCountries = () => {
    var _a;
    const countries = (stats == null ? void 0 : stats.topCountries) ?? [];
    const maxCount = ((_a = countries[0]) == null ? void 0 : _a.count) ?? 1;
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassPanel, { className: "p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-sm font-semibold mb-4 flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { className: "w-4 h-4 text-primary" }),
        "Top 5 Countries by Signups"
      ] }),
      countries.length === 0 ? renderEmptyChart() : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: countries.map((c, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary shrink-0", children: idx + 1 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium w-32 truncate", children: c.country }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2 bg-muted rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "h-full bg-primary rounded-full transition-all duration-500",
            style: { width: `${c.count / maxCount * 100}%` }
          }
        ) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground w-16 text-right shrink-0", children: c.count.toLocaleString() })
      ] }, c.country)) })
    ] });
  };
  const renderStatCards = () => {
    const totalCount = (stats == null ? void 0 : stats.totalCount) ?? 0;
    const retentionDisplay = isRetentionLoading ? "…" : isRetentionError ? "N/A" : `${(retentionPercent ?? 0).toFixed(1)}%`;
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassPanel, { className: "p-5 bg-gradient-to-br from-blue-500 to-blue-700 border-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-start justify-between", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 rounded-xl bg-white/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-5 h-5 text-white" }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold text-white", children: totalCount.toLocaleString() }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-white/70", children: "Total Registered Users" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-white/50 mt-1", children: "All time count" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassPanel, { className: "p-5 bg-gradient-to-br from-emerald-500 to-emerald-700 border-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-start justify-between", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 rounded-xl bg-white/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { className: "w-5 h-5 text-white" }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold text-white", children: retentionDisplay }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-white/70", children: "7-Day Retention" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-white/50 mt-1", children: "Trailing 30-day cohort · fixed" })
        ] })
      ] })
    ] });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between flex-wrap gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-xl font-bold flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-6 h-6 text-primary" }),
        "User Statistics"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 flex-wrap", children: [
        renderTimeRangeSelector(),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: "ghost",
            size: "sm",
            onClick: handleRetry,
            disabled: isLoading || isFetching,
            className: "gap-2 text-muted-foreground hover:text-foreground",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: `w-4 h-4 ${isFetching ? "animate-spin" : ""}` }),
              "Refresh"
            ]
          }
        )
      ] })
    ] }),
    isLoading ? renderLoadingState() : isError ? renderErrorState() : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
      renderStatCards(),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [
        renderSignupChart(),
        renderDauChart()
      ] }),
      renderTopCountries()
    ] })
  ] });
}
function peakConcurrentViewers(startTimestamps) {
  if (startTimestamps.length === 0) return 0;
  const buckets = /* @__PURE__ */ new Map();
  for (const ts of startTimestamps) {
    const bucket = Math.floor(ts / 36e5);
    buckets.set(bucket, (buckets.get(bucket) ?? 0) + 1);
  }
  return Math.max(...buckets.values());
}
function durationHistogram(sessions) {
  const buckets = [
    { label: "0–5 min", min: 0, max: 299, count: 0 },
    { label: "5–20 min", min: 300, max: 1199, count: 0 },
    { label: "20–60 min", min: 1200, max: 3599, count: 0 },
    { label: "60+ min", min: 3600, max: Infinity, count: 0 }
  ];
  for (const s of sessions) {
    const b = buckets.find(
      (b2) => s.watch_duration_seconds >= b2.min && s.watch_duration_seconds <= b2.max
    );
    if (b) b.count++;
  }
  return buckets.map(({ label, count }) => ({ label, count }));
}
const STREAMING_QUERY_KEY = ["admin_streaming_analytics"];
function StatCard({
  icon,
  label,
  value
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassPanel, { className: "p-5 border-white/10 flex items-center gap-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary", children: icon }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-medium uppercase tracking-wide", children: label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold tabular-nums", children: value })
    ] })
  ] });
}
function SectionError$1({ onRetry }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassPanel, { className: "p-10 text-center border-destructive/20 bg-destructive/5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-8 h-8 text-destructive/50 mx-auto mb-3" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-destructive mb-4", children: "Failed to load data" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Button,
      {
        variant: "outline",
        size: "sm",
        onClick: onRetry,
        className: "gap-2 border-destructive/30 hover:bg-destructive/10 text-destructive",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-4 h-4" }),
          "Retry"
        ]
      }
    )
  ] });
}
function SectionLoader$1() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-8 h-8 animate-spin text-primary opacity-50" }) });
}
function StreamingSection() {
  const {
    data,
    isLoading,
    isError,
    refetch
  } = useQuery({
    queryKey: STREAMING_QUERY_KEY,
    queryFn: async () => {
      const { data: rows, error } = await supabase.from("watch_sessions").select("id, started_at, watch_duration_seconds, created_at");
      if (error) throw error;
      const sessions = rows ?? [];
      const startTimestamps = sessions.filter((s) => s.started_at != null || s.created_at != null).map((s) => new Date(s.started_at || s.created_at).getTime());
      const peakConcurrent = peakConcurrentViewers(startTimestamps);
      const sessionsWithDuration = sessions.map((s) => ({
        watch_duration_seconds: s.watch_duration_seconds ?? 0
      }));
      const durationBuckets = durationHistogram(sessionsWithDuration);
      return {
        totalSessions: sessions.length,
        peakConcurrent,
        durationBuckets
      };
    }
  });
  if (isLoading) return /* @__PURE__ */ jsxRuntimeExports.jsx(SectionLoader$1, {});
  if (isError || !data) return /* @__PURE__ */ jsxRuntimeExports.jsx(SectionError$1, { onRetry: refetch });
  const maxBucketCount = Math.max(...data.durationBuckets.map((b) => b.count), 1);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        StatCard,
        {
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CirclePlay, { className: "w-5 h-5" }),
          label: "Total Sessions",
          value: data.totalSessions.toLocaleString()
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        StatCard,
        {
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-5 h-5" }),
          label: "Peak Concurrent Viewers",
          value: data.peakConcurrent.toLocaleString()
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassPanel, { className: "p-5 border-white/10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-sm font-semibold mb-4 flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ChartNoAxesColumn, { className: "w-4 h-4 text-primary" }),
        "Stream Duration Distribution"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: data.durationBuckets.map((bucket) => {
        const pct = maxBucketCount > 0 ? Math.round(bucket.count / maxBucketCount * 100) : 0;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-xs", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground font-medium", children: bucket.label }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold tabular-nums", children: bucket.count.toLocaleString() })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2 rounded-full bg-white/5 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "h-full bg-primary/70 rounded-full transition-all duration-500",
              style: { width: `${pct}%` }
            }
          ) })
        ] }, bucket.label);
      }) })
    ] })
  ] });
}
function StreamingAnalyticsPanel() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-xl font-bold flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CirclePlay, { className: "w-6 h-6 text-primary" }),
      "Streaming Analytics"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(StreamingSection, {})
  ] }) });
}
function versionDistribution(profiles) {
  const counts = /* @__PURE__ */ new Map();
  for (const p of profiles) {
    if (!p.app_version) continue;
    counts.set(p.app_version, (counts.get(p.app_version) ?? 0) + 1);
  }
  const total = Array.from(counts.values()).reduce((sum, n) => sum + n, 0);
  if (total === 0) return [];
  const entries = Array.from(counts.entries()).sort((a, b) => b[1] - a[1]);
  const result = entries.map(([version, count]) => ({
    version,
    count,
    percent: Math.round(count / total * 1e4) / 100
  }));
  return result;
}
function adoptionRate(profiles, policy) {
  if (profiles.length === 0) return 0;
  const matched = profiles.filter((p) => p.app_version === policy.target_version).length;
  return matched / profiles.length * 100;
}
const VERSION_DIST_KEY = ["admin_perf_version_dist"];
const makeCrashKey = (days) => ["admin_perf_crash_rate", days];
const ADOPTION_KEY = ["admin_perf_adoption"];
function SectionLoader() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center py-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-7 h-7 animate-spin text-primary opacity-50" }) });
}
function SectionError({ onRetry }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassPanel, { className: "p-8 text-center border-destructive/20 bg-destructive/5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-8 h-8 text-destructive/50 mx-auto mb-3" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-destructive mb-3", children: "Failed to load data" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Button,
      {
        variant: "outline",
        size: "sm",
        onClick: onRetry,
        className: "gap-2 border-destructive/30 hover:bg-destructive/10 text-destructive",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-4 h-4" }),
          "Retry"
        ]
      }
    )
  ] });
}
function VersionDistributionSection() {
  var _a;
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: VERSION_DIST_KEY,
    queryFn: async () => {
      var _a2;
      const { data: rows, error } = await supabase.from("profiles").select("app_version");
      if (error) {
        if (error.code === "42703" || ((_a2 = error.message) == null ? void 0 : _a2.includes("column"))) return [];
        throw error;
      }
      const profiles = rows ?? [];
      return versionDistribution(profiles);
    }
  });
  if (isLoading) return /* @__PURE__ */ jsxRuntimeExports.jsx(SectionLoader, {});
  if (isError) return /* @__PURE__ */ jsxRuntimeExports.jsx(SectionError, { onRetry: refetch });
  if (!data || data.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground text-center py-6", children: "Version distribution data not available" });
  }
  const maxCount = ((_a = data[0]) == null ? void 0 : _a.count) ?? 1;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: data.map((entry) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-xs", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono font-medium", children: [
        "v",
        entry.version
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground tabular-nums", children: [
        entry.count.toLocaleString(),
        " (",
        entry.percent.toFixed(1),
        "%)"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2 rounded-full bg-white/5 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "h-full bg-primary/70 rounded-full transition-all duration-500",
        style: { width: `${entry.count / maxCount * 100}%` }
      }
    ) })
  ] }, entry.version)) });
}
function AdoptionRateSection() {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ADOPTION_KEY,
    queryFn: async () => {
      const { data: policyRows, error: policyError } = await supabase.from("update_policies").select("target_version, type, channel").eq("channel", "stable").eq("active", true).in("type", ["mandatory", "recommended"]).limit(1);
      if (policyError) throw policyError;
      const policy = policyRows == null ? void 0 : policyRows[0];
      if (!policy) return { rate: null, targetVersion: null };
      const { data: profileRows, error: profileError } = await supabase.from("profiles").select("app_version");
      if (profileError) throw profileError;
      const profiles = profileRows ?? [];
      const rate = adoptionRate(profiles, { target_version: policy.target_version });
      return { rate, targetVersion: policy.target_version };
    }
  });
  if (isLoading) return /* @__PURE__ */ jsxRuntimeExports.jsx(SectionLoader, {});
  if (isError) return /* @__PURE__ */ jsxRuntimeExports.jsx(SectionError, { onRetry: refetch });
  if ((data == null ? void 0 : data.rate) === null) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground text-center py-6", children: "No active stable channel policy" });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-6 p-4 rounded-xl bg-white/5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground uppercase tracking-wide font-medium mb-1", children: "Stable Policy Target" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-mono font-semibold text-sm", children: [
        "v",
        data == null ? void 0 : data.targetVersion
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-3xl font-bold text-primary tabular-nums", children: [
        ((data == null ? void 0 : data.rate) ?? 0).toFixed(1),
        "%"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Adoption Rate" })
    ] })
  ] });
}
function CrashRateSection() {
  const [days, setDays] = reactExports.useState(30);
  const [inputDays, setInputDays] = reactExports.useState("30");
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: makeCrashKey(days),
    queryFn: async () => {
      const since = subDays(startOfDay(/* @__PURE__ */ new Date()), days - 1).toISOString();
      const { data: rows, error } = await supabase.from("playback_telemetry").select("created_at").eq("event_type", "crash").gte("created_at", since);
      if (error) throw error;
      const countMap = /* @__PURE__ */ new Map();
      for (const row of rows ?? []) {
        const day = row.created_at.slice(0, 10);
        countMap.set(day, (countMap.get(day) ?? 0) + 1);
      }
      const result = [];
      for (let i = days - 1; i >= 0; i--) {
        const d = format(subDays(/* @__PURE__ */ new Date(), i), "yyyy-MM-dd");
        result.push({ date: d, count: countMap.get(d) ?? 0 });
      }
      return result;
    }
  });
  const handleApplyDays = () => {
    const parsed = parseInt(inputDays, 10);
    if (Number.isInteger(parsed) && parsed >= 1 && parsed <= 90) {
      setDays(parsed);
    }
  };
  if (isLoading) return /* @__PURE__ */ jsxRuntimeExports.jsx(SectionLoader, {});
  if (isError) return /* @__PURE__ */ jsxRuntimeExports.jsx(SectionError, { onRetry: refetch });
  const isEmpty = !data || data.every((d) => d.count === 0);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 flex-wrap", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground font-medium", children: "Range (days):" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          type: "number",
          min: 1,
          max: 90,
          value: inputDays,
          onChange: (e) => setInputDays(e.target.value),
          className: "w-20 bg-white/5 border border-white/10 rounded px-2 py-1 text-sm font-mono focus:outline-none focus:ring-1 focus:ring-primary"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "outline", onClick: handleApplyDays, className: "text-xs h-7", children: "Apply" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          size: "sm",
          variant: "ghost",
          onClick: () => refetch(),
          disabled: isLoading,
          className: "gap-1 text-xs h-7 text-muted-foreground",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-3 h-3" }),
            "Refresh"
          ]
        }
      )
    ] }),
    isEmpty ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground text-center py-6", children: "No crash telemetry data" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-48", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(LineChart, { data, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "rgba(255,255,255,0.08)" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        XAxis,
        {
          dataKey: "date",
          stroke: "hsl(var(--muted-foreground))",
          fontSize: 10,
          tickFormatter: (v) => v.slice(5)
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        YAxis,
        {
          stroke: "hsl(var(--muted-foreground))",
          fontSize: 10,
          allowDecimals: false
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Tooltip,
        {
          contentStyle: {
            backgroundColor: "hsl(var(--card))",
            border: "1px solid hsl(var(--border))",
            borderRadius: "8px",
            fontSize: 12
          },
          labelFormatter: (l) => `Date: ${l}`
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Line,
        {
          type: "monotone",
          dataKey: "count",
          name: "Crashes",
          stroke: "#f87171",
          dot: false,
          strokeWidth: 2
        }
      )
    ] }) }) })
  ] });
}
function PerfSnapshotSection() {
  const [snapshots, setSnapshots] = reactExports.useState(null);
  const [loading, setLoading] = reactExports.useState(true);
  reactExports.useEffect(() => {
    async function fetchSnapshots() {
      const electron = window.electron;
      if (!(electron == null ? void 0 : electron.perfGetHistory)) {
        setLoading(false);
        return;
      }
      try {
        const data = await electron.perfGetHistory(20);
        setSnapshots(Array.isArray(data) ? data : []);
      } catch {
        setSnapshots([]);
      } finally {
        setLoading(false);
      }
    }
    fetchSnapshots();
  }, []);
  if (loading) return /* @__PURE__ */ jsxRuntimeExports.jsx(SectionLoader, {});
  if (!snapshots || snapshots.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground text-center py-6", children: "No performance snapshot data available" });
  }
  const chartData = snapshots.map((s, i) => ({
    index: i + 1,
    heapUsedMB: s.heapUsedMB,
    rssMB: s.rssMB
  }));
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-56", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(LineChart, { data: chartData, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "rgba(255,255,255,0.08)" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      XAxis,
      {
        dataKey: "index",
        stroke: "hsl(var(--muted-foreground))",
        fontSize: 10,
        label: { value: "Snapshot #", position: "insideBottom", offset: -2, fontSize: 10 }
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      YAxis,
      {
        stroke: "hsl(var(--muted-foreground))",
        fontSize: 10,
        unit: " MB"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Tooltip,
      {
        contentStyle: {
          backgroundColor: "hsl(var(--card))",
          border: "1px solid hsl(var(--border))",
          borderRadius: "8px",
          fontSize: 12
        }
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Legend, { wrapperStyle: { fontSize: 11 } }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Line,
      {
        type: "monotone",
        dataKey: "heapUsedMB",
        name: "Heap Used (MB)",
        stroke: "#60a5fa",
        dot: false,
        strokeWidth: 2
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Line,
      {
        type: "monotone",
        dataKey: "rssMB",
        name: "RSS (MB)",
        stroke: "#34d399",
        dot: false,
        strokeWidth: 2
      }
    )
  ] }) }) });
}
function PerformanceInsightsPanel() {
  const isElectron = !!window.electron;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-between", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-xl font-bold flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "w-6 h-6 text-primary" }),
      "Performance Insights"
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassPanel, { className: "p-6 border-white/10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-sm font-semibold mb-4 flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { className: "w-4 h-4 text-primary" }),
        "App Version Distribution"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(VersionDistributionSection, {})
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassPanel, { className: "p-6 border-white/10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-sm font-semibold mb-4 flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "w-4 h-4 text-primary" }),
        "Stable Policy Adoption Rate"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(AdoptionRateSection, {})
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassPanel, { className: "p-6 border-white/10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-sm font-semibold mb-4 flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "w-4 h-4 text-destructive" }),
        "Crash Rate Trend"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CrashRateSection, {})
    ] }),
    isElectron && /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassPanel, { className: "p-6 border-white/10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-sm font-semibold mb-4 flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "w-4 h-4 text-emerald-400" }),
        "Memory Snapshots (Desktop)"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(PerfSnapshotSection, {})
    ] })
  ] });
}
const SEMVER_RE$1 = /^\d+\.\d+\.\d+$/;
const PLATFORM_ICON = {
  windows: Monitor,
  macos: Apple,
  linux: Terminal,
  android: Smartphone
};
function cleanVersion(tag) {
  return tag.replace(/^v/i, "").trim();
}
function AssetRow({ asset }) {
  const platform = platformForAsset(asset.name);
  const Icon = platform ? PLATFORM_ICON[platform] : Package;
  const copyUrl = async () => {
    try {
      await navigator.clipboard.writeText(asset.browser_download_url);
      ue.success("Download URL copied");
    } catch {
      ue.error("Clipboard unavailable");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 rounded-lg border border-white/5 bg-white/[0.02] px-3 py-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-md bg-white/5 p-1.5 text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-4 w-4" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate font-mono text-xs text-foreground", children: asset.name }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[11px] text-muted-foreground", children: [
        formatBytes(asset.size),
        " · ",
        formatCompact(asset.download_count),
        " downloads"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Button,
      {
        variant: "ghost",
        size: "sm",
        onClick: copyUrl,
        className: "h-8 w-8 shrink-0 p-0 text-muted-foreground hover:text-foreground",
        title: "Copy download URL",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "h-3.5 w-3.5" })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Button,
      {
        variant: "outline",
        size: "sm",
        asChild: true,
        className: "h-8 shrink-0 gap-1.5 text-xs",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: asset.browser_download_url, target: "_blank", rel: "noreferrer", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "h-3.5 w-3.5" }),
          "Download"
        ] })
      }
    )
  ] });
}
function ReleaseCard({
  release,
  expanded,
  onToggle,
  onCreatePolicy
}) {
  const version = cleanVersion(release.tag_name);
  const canSeedPolicy = SEMVER_RE$1.test(version) && !!onCreatePolicy;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassPanel, { className: "border-white/5 p-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1 space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 font-mono text-sm font-bold", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Tag, { className: "h-3.5 w-3.5 text-primary" }),
            release.tag_name
          ] }),
          !release.prerelease && !release.draft && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-2 py-0.5 text-[11px] font-bold text-emerald-400", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-3 w-3" }),
            "Stable"
          ] }),
          release.prerelease && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 rounded-full border border-amber-500/30 bg-amber-500/10 px-2 py-0.5 text-[11px] font-bold text-amber-400", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FlaskConical, { className: "h-3 w-3" }),
            "Pre-release"
          ] }),
          release.draft && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full border border-white/10 bg-muted/20 px-2 py-0.5 text-[11px] font-bold text-muted-foreground", children: "Draft" })
        ] }),
        release.name && release.name !== release.tag_name && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium", children: release.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[11px] text-muted-foreground/70", children: [
          "Published ",
          formatDistanceToNow(new Date(release.published_at), { addSuffix: true }),
          " · ",
          new Date(release.published_at).toLocaleDateString(),
          " · ",
          release.assets.length,
          " asset",
          release.assets.length === 1 ? "" : "s"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex shrink-0 items-center gap-2", children: [
        canSeedPolicy && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            size: "sm",
            onClick: () => onCreatePolicy(version),
            className: "h-8 gap-1.5 text-xs",
            title: `Create an update policy targeting v${version}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CirclePlus, { className: "h-3.5 w-3.5" }),
              "Create policy"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "sm", asChild: true, className: "h-8 w-8 p-0 text-muted-foreground hover:text-foreground", title: "View on GitHub", children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: release.html_url, target: "_blank", rel: "noreferrer", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "h-3.5 w-3.5" }) }) })
      ] })
    ] }),
    release.assets.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 space-y-2", children: release.assets.map((asset) => /* @__PURE__ */ jsxRuntimeExports.jsx(AssetRow, { asset }, asset.name)) }),
    release.body && release.body.trim() && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: onToggle,
          className: "flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground",
          children: [
            expanded ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "h-3.5 w-3.5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-3.5 w-3.5" }),
            "Release notes"
          ]
        }
      ),
      expanded && /* @__PURE__ */ jsxRuntimeExports.jsx("pre", { className: "mt-2 max-h-72 overflow-y-auto whitespace-pre-wrap rounded-lg border border-white/5 bg-black/20 p-3 font-sans text-xs leading-relaxed text-muted-foreground", children: release.body })
    ] })
  ] });
}
function GitHubReleasesPanel({
  onCreatePolicy
}) {
  const [releases, setReleases] = reactExports.useState(null);
  const [loading, setLoading] = reactExports.useState(true);
  const [error, setError] = reactExports.useState(false);
  const [expanded, setExpanded] = reactExports.useState({});
  const load = reactExports.useCallback(async (force = false) => {
    setLoading(true);
    setError(false);
    const data = await fetchAllReleases(force);
    if (!data) {
      setError(true);
      setReleases(null);
    } else {
      setReleases(data);
    }
    setLoading(false);
  }, []);
  reactExports.useEffect(() => {
    load(false);
  }, [load]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "flex items-center gap-2 text-lg font-bold", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Github, { className: "h-5 w-5 text-primary" }),
          "GitHub Releases"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
          "Live from",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: GITHUB_RELEASES_URL, target: "_blank", rel: "noreferrer", className: "underline hover:text-foreground", children: "snozxyx/Tatakai" }),
          " ",
          "— pick a version to seed a policy, or grab an installer directly."
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          variant: "ghost",
          size: "sm",
          onClick: () => load(true),
          disabled: loading,
          className: "gap-2 text-muted-foreground hover:text-foreground",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: `h-4 w-4 ${loading ? "animate-spin" : ""}` }),
            "Refresh"
          ]
        }
      )
    ] }),
    loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-8 w-8 animate-spin text-primary opacity-50" }) }) : error ? /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassPanel, { className: "border-destructive/20 bg-destructive/5 p-10 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "mx-auto mb-3 h-8 w-8 text-destructive/50" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-4 text-sm font-medium text-destructive", children: "Couldn't reach GitHub. It may be rate-limited (60 requests/hour) — try again shortly." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", size: "sm", onClick: () => load(true), className: "gap-2 border-destructive/30 text-destructive hover:bg-destructive/10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "h-4 w-4" }),
        "Retry"
      ] })
    ] }) : !releases || releases.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassPanel, { className: "border-dashed border-white/5 p-12 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "mx-auto mb-3 h-8 w-8 text-muted-foreground/25" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No published releases found." })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: releases.map((release) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      ReleaseCard,
      {
        release,
        expanded: !!expanded[release.tag_name],
        onToggle: () => setExpanded((prev) => ({ ...prev, [release.tag_name]: !prev[release.tag_name] })),
        onCreatePolicy
      },
      release.tag_name
    )) })
  ] });
}
const SEMVER_RE = /^\d+\.\d+\.\d+$/;
const DUPLICATE_ACTIVE_CONSTRAINT = "update_policies_one_active_per_channel";
const INITIAL_FORM = {
  channel: "stable",
  type: "mandatory",
  target_version: "",
  rollback_from_version: "",
  notes: ""
};
const QUERY_KEY$4 = ["admin_update_policies"];
const CHANNEL_COLOURS = {
  stable: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  beta: "bg-blue-500/15 text-blue-400 border-blue-500/30",
  experimental: "bg-amber-500/15 text-amber-400 border-amber-500/30"
};
const TYPE_COLOURS = {
  mandatory: "bg-red-500/15 text-red-400 border-red-500/30",
  recommended: "bg-sky-500/15 text-sky-400 border-sky-500/30",
  experimental: "bg-purple-500/15 text-purple-400 border-purple-500/30",
  rollback: "bg-orange-500/15 text-orange-400 border-orange-500/30"
};
const TypeIcon = ({ type }) => {
  switch (type) {
    case "mandatory":
      return /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-3.5 h-3.5" });
    case "rollback":
      return /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { className: "w-3.5 h-3.5" });
    default:
      return /* @__PURE__ */ jsxRuntimeExports.jsx(CircleArrowDown, { className: "w-3.5 h-3.5" });
  }
};
function isFormValid(form) {
  if (!SEMVER_RE.test(form.target_version)) return false;
  if (form.type === "rollback" && !SEMVER_RE.test(form.rollback_from_version ?? "")) return false;
  return true;
}
function UpdateManagementPanel() {
  const queryClient = useQueryClient();
  const [form, setForm] = reactExports.useState(INITIAL_FORM);
  const [formError, setFormError] = reactExports.useState(null);
  const [showForm, setShowForm] = reactExports.useState(false);
  const {
    data: policies,
    isLoading,
    isError,
    refetch
  } = useQuery({
    queryKey: QUERY_KEY$4,
    queryFn: async () => {
      const { data, error } = await supabase.from("update_policies").select("*").order("published_at", { ascending: false }).limit(200);
      if (error) throw error;
      return data ?? [];
    }
  });
  const createMutation = useMutation({
    mutationFn: async (payload) => {
      const { error } = await supabase.from("update_policies").insert({
        channel: payload.channel,
        type: payload.type,
        target_version: payload.target_version,
        rollback_from_version: payload.type === "rollback" ? payload.rollback_from_version : null,
        notes: payload.notes || null,
        active: true
      });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY$4 });
      setForm(INITIAL_FORM);
      setFormError(null);
      setShowForm(false);
    },
    onError: (error) => {
      const msg = error instanceof Error ? error.message : String(error);
      if (msg.includes(DUPLICATE_ACTIVE_CONSTRAINT) || msg.includes("unique") || msg.includes("duplicate")) {
        setFormError("A channel can only have one active policy at a time. Deactivate the existing policy first.");
      } else {
        ue.error(`Failed to create policy: ${msg}`);
      }
    }
  });
  const handleFormChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setFormError(null);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFormValid(form)) return;
    createMutation.mutate(form);
  };
  const startPolicyForVersion = (version) => {
    setForm({ ...INITIAL_FORM, target_version: version });
    setFormError(null);
    setShowForm(true);
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const deactivateMutation = useMutation({
    mutationFn: async (id) => {
      const { error } = await supabase.from("update_policies").update({ active: false }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY$4 });
    },
    onError: (error) => {
      const message = error instanceof Error ? error.message : "Unknown error";
      ue.error(`Failed to deactivate policy: ${message}`);
    }
  });
  const renderCreateForm = () => /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassPanel, { className: "p-5 border-white/10", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-sm font-semibold mb-4 flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CirclePlus, { className: "w-4 h-4 text-primary" }),
      "New Update Policy"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
      formError && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive bg-destructive/10 border border-destructive/20 rounded px-3 py-2", children: formError }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs text-muted-foreground font-medium uppercase tracking-wide", children: "Channel" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "select",
            {
              value: form.channel,
              onChange: (e) => handleFormChange("channel", e.target.value),
              className: "w-full bg-white/5 border border-white/10 rounded px-3 py-1.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-primary",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "stable", children: "stable" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "beta", children: "beta" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "experimental", children: "experimental" })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs text-muted-foreground font-medium uppercase tracking-wide", children: "Type" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "select",
            {
              value: form.type,
              onChange: (e) => handleFormChange("type", e.target.value),
              className: "w-full bg-white/5 border border-white/10 rounded px-3 py-1.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-primary",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "mandatory", children: "mandatory" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "recommended", children: "recommended" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "experimental", children: "experimental" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "rollback", children: "rollback" })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "text-xs text-muted-foreground font-medium uppercase tracking-wide", children: [
            "Target Version ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground/50", children: "(e.g. 1.2.3)" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "text",
              value: form.target_version,
              onChange: (e) => handleFormChange("target_version", e.target.value),
              placeholder: "1.2.3",
              className: "w-full bg-white/5 border border-white/10 rounded px-3 py-1.5 text-sm font-mono text-white placeholder:text-muted-foreground/40 focus:outline-none focus:ring-1 focus:ring-primary"
            }
          ),
          form.target_version && !SEMVER_RE.test(form.target_version) && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive", children: "Must match format X.Y.Z" })
        ] }),
        form.type === "rollback" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "text-xs text-muted-foreground font-medium uppercase tracking-wide", children: [
            "Rollback From Version ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "text",
              value: form.rollback_from_version ?? "",
              onChange: (e) => handleFormChange("rollback_from_version", e.target.value),
              placeholder: "1.3.0",
              className: "w-full bg-white/5 border border-white/10 rounded px-3 py-1.5 text-sm font-mono text-white placeholder:text-muted-foreground/40 focus:outline-none focus:ring-1 focus:ring-primary"
            }
          ),
          form.rollback_from_version && !SEMVER_RE.test(form.rollback_from_version) && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive", children: "Must match format X.Y.Z" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs text-muted-foreground font-medium uppercase tracking-wide", children: "Notes (optional)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "textarea",
          {
            value: form.notes ?? "",
            onChange: (e) => handleFormChange("notes", e.target.value),
            rows: 2,
            placeholder: "Release notes or reason for this policy…",
            className: "w-full bg-white/5 border border-white/10 rounded px-3 py-1.5 text-sm text-white placeholder:text-muted-foreground/40 focus:outline-none focus:ring-1 focus:ring-primary resize-none"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 pt-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "submit",
            size: "sm",
            disabled: !isFormValid(form) || createMutation.isPending,
            className: "gap-1.5",
            children: [
              createMutation.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-3.5 h-3.5 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(CirclePlus, { className: "w-3.5 h-3.5" }),
              "Create Policy"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            variant: "ghost",
            size: "sm",
            onClick: () => {
              setShowForm(false);
              setForm(INITIAL_FORM);
              setFormError(null);
            },
            className: "text-muted-foreground",
            children: "Cancel"
          }
        )
      ] })
    ] })
  ] });
  const renderLoadingState = () => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center py-20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-10 h-10 animate-spin text-primary opacity-50" }) });
  const renderErrorState = () => /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassPanel, { className: "p-12 text-center border-destructive/20 bg-destructive/5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-10 h-10 text-destructive/50 mx-auto mb-4" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-destructive mb-4", children: "Failed to load update policies" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Button,
      {
        variant: "outline",
        size: "sm",
        onClick: () => refetch(),
        className: "gap-2 border-destructive/30 hover:bg-destructive/10 text-destructive",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-4 h-4" }),
          "Retry"
        ]
      }
    )
  ] });
  const renderEmptyState = () => /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassPanel, { className: "p-16 text-center border-dashed border-white/5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(CircleArrowDown, { className: "w-10 h-10 text-muted-foreground/25 mx-auto mb-3" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground font-medium", children: "No update policies found." })
  ] });
  const renderPolicyRow = (policy) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    GlassPanel,
    {
      className: "p-4 hover:bg-white/5 border-white/5 transition-all duration-200",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-start gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0 space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: `inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold border ${CHANNEL_COLOURS[policy.channel]}`,
                children: policy.channel
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "span",
              {
                className: `inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold border ${TYPE_COLOURS[policy.type]}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(TypeIcon, { type: policy.type }),
                  policy.type
                ]
              }
            ),
            policy.active ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold border bg-emerald-500/10 text-emerald-400 border-emerald-500/25", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3 h-3" }),
              "Active"
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold border bg-muted/20 text-muted-foreground border-white/10", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-3 h-3" }),
              "Inactive"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-x-4 gap-y-1 text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-xs uppercase tracking-wide font-bold mr-1", children: "Target" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono font-semibold", children: [
                "v",
                policy.target_version
              ] })
            ] }),
            policy.rollback_from_version && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-xs uppercase tracking-wide font-bold mr-1", children: "Rollback from" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono font-semibold text-orange-400", children: [
                "v",
                policy.rollback_from_version
              ] })
            ] })
          ] }),
          policy.notes && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground leading-relaxed line-clamp-2", children: policy.notes }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[11px] text-muted-foreground/70", children: [
            "Published",
            " ",
            formatDistanceToNow(new Date(policy.published_at), {
              addSuffix: true
            }),
            " ",
            " · ",
            " ",
            new Date(policy.published_at).toLocaleString()
          ] })
        ] }),
        policy.active && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: "outline",
            size: "sm",
            onClick: () => deactivateMutation.mutate(policy.id),
            disabled: deactivateMutation.isPending,
            className: "gap-1.5 border-destructive/30 hover:bg-destructive/10 text-destructive hover:text-destructive text-xs",
            children: [
              deactivateMutation.isPending && deactivateMutation.variables === policy.id ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-3.5 h-3.5 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-3.5 h-3.5" }),
              "Deactivate"
            ]
          }
        ) })
      ] })
    },
    policy.id
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-xl font-bold flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleArrowDown, { className: "w-6 h-6 text-primary" }),
        "Update Policies"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: "outline",
            size: "sm",
            onClick: () => setShowForm((v) => !v),
            className: "gap-1.5 text-xs",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CirclePlus, { className: "w-3.5 h-3.5" }),
              "New Policy"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: "ghost",
            size: "sm",
            onClick: () => refetch(),
            disabled: isLoading,
            className: "gap-2 text-muted-foreground hover:text-foreground",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: `w-4 h-4 ${isLoading ? "animate-spin" : ""}` }),
              "Refresh"
            ]
          }
        )
      ] })
    ] }),
    showForm && renderCreateForm(),
    isLoading ? renderLoadingState() : isError ? renderErrorState() : !policies || policies.length === 0 ? renderEmptyState() : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: policies.map(renderPolicyRow) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-t border-white/5 pt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(GitHubReleasesPanel, { onCreatePolicy: startPolicyForVersion }) })
  ] });
}
function useCrashReports(limit = 50) {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["crash_reports", limit],
    queryFn: async () => {
      const { data, error } = await supabase.from("crash_reports").select("*").order("created_at", { ascending: false }).limit(limit);
      if (error) {
        const { logger } = await __vitePreload(async () => {
          const { logger: logger2 } = await import("./index.C6yfkT5T.js").then((n) => n.ho);
          return { logger: logger2 };
        }, true ? __vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11]) : void 0);
        void logger.error("[CrashReports] Error:", error);
        return [];
      }
      return (data ?? []).map((row) => ({
        id: String(row.crash_id ?? row.id),
        date: row.crashed_at ?? row.created_at,
        path: "",
        app_version: row.app_version ?? null,
        platform: row.platform ?? null,
        arch: row.arch ?? null,
        node_version: row.node_version ?? null,
        electron_version: row.electron_version ?? null,
        source: "persisted"
      }));
    },
    enabled: !!user,
    staleTime: 1e3 * 30,
    refetchInterval: 1e3 * 60
  });
}
const ACKNOWLEDGED_KEY = "acknowledged_crash_ids";
function loadAcknowledgedIds() {
  try {
    const raw = localStorage.getItem(ACKNOWLEDGED_KEY);
    if (!raw) return /* @__PURE__ */ new Set();
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) return new Set(parsed);
  } catch {
  }
  return /* @__PURE__ */ new Set();
}
function saveAcknowledgedIds(ids) {
  localStorage.setItem(ACKNOWLEDGED_KEY, JSON.stringify(Array.from(ids)));
}
function CrashReportPanel() {
  const [liveCrashes, setLiveCrashes] = reactExports.useState([]);
  const [saveErrors, setSaveErrors] = reactExports.useState(/* @__PURE__ */ new Set());
  const [acknowledgedIds, setAcknowledgedIds] = reactExports.useState(() => loadAcknowledgedIds());
  const { data: persistedCrashes = [] } = useCrashReports(50);
  reactExports.useEffect(() => {
    const electron = window.electron;
    if (!(electron == null ? void 0 : electron.onCrashPrevious)) return;
    const unsubscribe = electron.onCrashPrevious((report) => {
      setLiveCrashes((prev) => {
        if (prev.some((c) => c.id === report.id)) return prev;
        const next = [{ ...report, source: "live" }, ...prev];
        return next.slice(0, 50);
      });
    });
    return () => {
      if (typeof unsubscribe === "function") unsubscribe();
    };
  }, []);
  const displayedCrashes = reactExports.useMemo(() => {
    const byId = /* @__PURE__ */ new Map();
    for (const c of persistedCrashes) {
      if (!acknowledgedIds.has(c.id)) byId.set(c.id, c);
    }
    for (const c of liveCrashes) {
      if (!acknowledgedIds.has(c.id)) byId.set(c.id, { ...byId.get(c.id), ...c });
    }
    return Array.from(byId.values()).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 50);
  }, [persistedCrashes, liveCrashes, acknowledgedIds]);
  const handleAcknowledge = (id) => {
    try {
      const acknowledged = loadAcknowledgedIds();
      acknowledged.add(id);
      saveAcknowledgedIds(acknowledged);
      setAcknowledgedIds(new Set(acknowledged));
      setSaveErrors((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    } catch {
      setSaveErrors((prev) => new Set(prev).add(id));
    }
  };
  const formatDate2 = (isoDate) => {
    try {
      return new Date(isoDate).toLocaleString(void 0, {
        dateStyle: "medium",
        timeStyle: "short"
      });
    } catch {
      return isoDate;
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-2xl font-bold text-white flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldAlert, { className: "w-6 h-6 text-red-400" }),
          "Crash Reports"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-400 mt-1", children: "Desktop crash metadata — persisted reports plus crashes forwarded this session" })
      ] }),
      displayedCrashes.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-gray-400", children: [
        displayedCrashes.length,
        " report",
        displayedCrashes.length !== 1 ? "s" : ""
      ] })
    ] }),
    displayedCrashes.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassPanel, { className: "p-12 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-12 h-12 text-green-500/60 mx-auto mb-4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-400 text-sm", children: "No crash reports on record" })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(GlassPanel, { className: "divide-y divide-white/10", children: displayedCrashes.map((report) => {
      const hasSaveError = saveErrors.has(report.id);
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "p-4 hover:bg-white/5 transition-colors duration-200",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-5 h-5 text-orange-400 mt-0.5 flex-shrink-0" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 space-y-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-mono text-white break-all", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gray-500 text-xs mr-1", children: "ID" }),
                    report.id
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-gray-400", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gray-500 mr-1", children: "Date" }),
                    formatDate2(report.date)
                  ] }),
                  report.path && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-gray-400 break-all", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gray-500 mr-1", children: "Path" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono", children: report.path })
                  ] }),
                  (report.app_version || report.platform) && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-gray-400 break-all", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gray-500 mr-1", children: "Build" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono", children: [
                      report.app_version,
                      report.platform && report.arch ? `${report.platform}/${report.arch}` : report.platform,
                      report.electron_version && `electron ${report.electron_version}`
                    ].filter(Boolean).join(" · ") })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-block text-[10px] uppercase tracking-wider text-gray-500", children: report.source === "live" ? "this session" : "persisted" })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-shrink-0", children: [
                hasSaveError && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "text-red-400",
                    title: "Could not save acknowledgment",
                    "aria-label": "Could not save acknowledgment",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-4 h-4" })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    size: "sm",
                    variant: "outline",
                    className: "gap-1.5 text-xs border-white/10 hover:border-green-500/50 hover:text-green-400",
                    onClick: () => handleAcknowledge(report.id),
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-3.5 h-3.5" }),
                      "Acknowledge"
                    ]
                  }
                )
              ] })
            ] }),
            hasSaveError && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 ml-8 text-xs text-red-400", children: "Could not save acknowledgment — storage may be full. The report will reappear on next load." })
          ]
        },
        report.id
      );
    }) })
  ] });
}
function validateDeviceBan(device_id, reason) {
  return device_id.length >= 1 && device_id.length <= 255 && reason.length >= 1 && reason.length <= 500;
}
function truncateDeviceId(device_id) {
  return {
    display: device_id.length <= 20 ? device_id : device_id.slice(0, 20),
    full: device_id
  };
}
function validateIpAddress(ip) {
  const ipv4 = /^((25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|\d)\.){3}(25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|\d)$/;
  if (ipv4.test(ip)) return true;
  try {
    new URL(`http://[${ip}]`);
    return true;
  } catch {
    return false;
  }
}
function filterAuditLog(records, searchText, actionFilter) {
  const needle = searchText.toLowerCase();
  return records.filter((record) => {
    const matchesText = needle === "" || record.display_name.toLowerCase().includes(needle) || record.username.toLowerCase().includes(needle);
    const matchesAction = actionFilter === "all" || record.action === actionFilter;
    return matchesText && matchesAction;
  });
}
function exportAuditLogCsv(visibleRecords) {
  function escapeCsvField(value) {
    const needsQuoting = /[",\r\n]/.test(value);
    if (!needsQuoting) return value;
    return `"${value.replace(/"/g, '""')}"`;
  }
  const headers = [
    "user_id",
    "username",
    "action",
    "reason",
    "duration_hours",
    "expires_at",
    "performed_by",
    "timestamp"
  ];
  const rows = [headers.join(",")];
  for (const record of visibleRecords) {
    const fields = [
      escapeCsvField(record.user_id),
      escapeCsvField(record.username),
      escapeCsvField(record.action),
      escapeCsvField(record.reason),
      record.duration_hours !== null ? String(record.duration_hours) : "",
      record.expires_at !== null ? escapeCsvField(record.expires_at) : "",
      escapeCsvField(record.performed_by_display_name),
      escapeCsvField(record.timestamp)
    ];
    rows.push(fields.join(","));
  }
  const csvContent = rows.join("\r\n");
  return new Blob([csvContent], { type: "text/csv" });
}
function sortTemplatesAlpha(templates) {
  return [...templates].sort(
    (a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase())
  );
}
function validateTemplateName(name, existingNames) {
  return name.length >= 1 && name.length <= 100 && !existingNames.includes(name);
}
const QUERY_KEY$3 = ["admin_device_bans"];
function DeviceBanPanel() {
  const queryClient = useQueryClient();
  const [deviceId, setDeviceId] = reactExports.useState("");
  const [reason, setReason] = reactExports.useState("");
  const [expiresAt, setExpiresAt] = reactExports.useState("");
  const [formError, setFormError] = reactExports.useState(null);
  const [showForm, setShowForm] = reactExports.useState(false);
  const { data: bans, isLoading, isError, refetch } = useQuery({
    queryKey: QUERY_KEY$3,
    queryFn: async () => {
      const { data, error } = await supabase.from("device_bans").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data ?? [];
    }
  });
  const insertMutation = useMutation({
    mutationFn: async () => {
      var _a;
      const { data: currentUser } = await supabase.auth.getUser();
      const { error } = await supabase.from("device_bans").insert({
        device_id: deviceId,
        reason,
        banned_by: (_a = currentUser.user) == null ? void 0 : _a.id,
        expires_at: expiresAt ? new Date(expiresAt).toISOString() : null
      });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY$3 });
      setDeviceId("");
      setReason("");
      setExpiresAt("");
      setFormError(null);
      setShowForm(false);
      ue.success("Device banned successfully");
    },
    onError: (error) => {
      const msg = error instanceof Error ? error.message : String(error);
      if (msg.toLowerCase().includes("unique") || msg.toLowerCase().includes("duplicate") || msg.toLowerCase().includes("already")) {
        setFormError("This device is already banned");
      } else {
        ue.error(`Failed to ban device: ${msg}`);
      }
    }
  });
  const removeMutation = useMutation({
    mutationFn: async (id) => {
      const { error } = await supabase.from("device_bans").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY$3 });
      ue.success("Device ban removed");
    },
    onError: (error) => {
      const msg = error instanceof Error ? error.message : String(error);
      ue.error(`Failed to remove ban: ${msg}`);
    }
  });
  const isFormValid2 = validateDeviceBan(deviceId, reason);
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError(null);
    if (!isFormValid2) return;
    insertMutation.mutate();
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-xl font-bold flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-6 h-6 text-primary" }),
        "Device Bans"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: "outline",
            size: "sm",
            onClick: () => setShowForm((v) => !v),
            className: "gap-1.5 text-xs",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CirclePlus, { className: "w-3.5 h-3.5" }),
              "Add Ban"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: "ghost",
            size: "sm",
            onClick: () => refetch(),
            disabled: isLoading,
            className: "gap-2 text-muted-foreground hover:text-foreground",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: `w-4 h-4 ${isLoading ? "animate-spin" : ""}` }),
              "Refresh"
            ]
          }
        )
      ] })
    ] }),
    showForm && /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassPanel, { className: "p-5 border-white/10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-sm font-semibold mb-4 flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CirclePlus, { className: "w-4 h-4 text-primary" }),
        "Ban Device"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
        formError && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive bg-destructive/10 border border-destructive/20 rounded px-3 py-2", children: formError }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "text-xs text-muted-foreground font-medium uppercase tracking-wide", children: [
            "Device ID ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "text",
              value: deviceId,
              onChange: (e) => {
                setDeviceId(e.target.value);
                setFormError(null);
              },
              placeholder: "Enter device identifier (1–255 chars)",
              maxLength: 255,
              className: "w-full bg-white/5 border border-white/10 rounded px-3 py-1.5 text-sm font-mono text-white placeholder:text-muted-foreground/40 focus:outline-none focus:ring-1 focus:ring-primary"
            }
          ),
          deviceId && (deviceId.length < 1 || deviceId.length > 255) && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive", children: "Must be 1–255 characters" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "text-xs text-muted-foreground font-medium uppercase tracking-wide", children: [
            "Reason ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "textarea",
            {
              value: reason,
              onChange: (e) => {
                setReason(e.target.value);
                setFormError(null);
              },
              placeholder: "Reason for banning this device…",
              maxLength: 500,
              rows: 3,
              className: "w-full bg-white/5 border border-white/10 rounded px-3 py-1.5 text-sm text-white placeholder:text-muted-foreground/40 focus:outline-none focus:ring-1 focus:ring-primary resize-none"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground/50 text-right", children: [
            reason.length,
            "/500"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs text-muted-foreground font-medium uppercase tracking-wide", children: "Expiry (optional)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "datetime-local",
              value: expiresAt,
              onChange: (e) => setExpiresAt(e.target.value),
              className: "w-full bg-white/5 border border-white/10 rounded px-3 py-1.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-primary"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 pt-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              type: "submit",
              size: "sm",
              disabled: !isFormValid2 || insertMutation.isPending,
              className: "gap-1.5",
              children: [
                insertMutation.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-3.5 h-3.5 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-3.5 h-3.5" }),
                "Ban Device"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              variant: "ghost",
              size: "sm",
              onClick: () => {
                setShowForm(false);
                setDeviceId("");
                setReason("");
                setExpiresAt("");
                setFormError(null);
              },
              className: "text-muted-foreground",
              children: "Cancel"
            }
          )
        ] })
      ] })
    ] }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-8 h-8 animate-spin text-primary opacity-50" }) }) : isError ? /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassPanel, { className: "p-10 text-center border-destructive/20 bg-destructive/5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-8 h-8 text-destructive/50 mx-auto mb-3" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-destructive mb-4", children: "Failed to load device bans" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          variant: "outline",
          size: "sm",
          onClick: () => refetch(),
          className: "gap-2 border-destructive/30 hover:bg-destructive/10 text-destructive",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-4 h-4" }),
            "Retry"
          ]
        }
      )
    ] }) : !bans || bans.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassPanel, { className: "p-12 text-center border-dashed border-white/5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-10 h-10 text-muted-foreground/25 mx-auto mb-3" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No active device bans" })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(GlassPanel, { className: "border-white/5", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-white/10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-3 px-4 text-xs text-muted-foreground font-medium uppercase tracking-wide", children: "Device ID" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-3 px-4 text-xs text-muted-foreground font-medium uppercase tracking-wide", children: "Reason" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-3 px-4 text-xs text-muted-foreground font-medium uppercase tracking-wide", children: "Banned By" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-3 px-4 text-xs text-muted-foreground font-medium uppercase tracking-wide", children: "Expires" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-3 px-4" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: bans.map((ban) => {
        const { display, full } = truncateDeviceId(ban.device_id);
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-white/5 hover:bg-white/5 transition-colors", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "py-3 px-4 font-mono text-xs", title: full, children: [
            display,
            full.length > 20 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "…" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-4 text-xs text-muted-foreground max-w-[200px] truncate", title: ban.reason, children: ban.reason }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-4 text-xs text-muted-foreground font-mono", children: ban.banned_by ? ban.banned_by.slice(0, 8) + "…" : "—" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-4 text-xs text-muted-foreground", children: ban.expires_at ? format(new Date(ban.expires_at), "MMM d, yyyy HH:mm") : "Permanent" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-4 text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "ghost",
              size: "sm",
              onClick: () => removeMutation.mutate(ban.id),
              disabled: removeMutation.isPending && removeMutation.variables === ban.id,
              className: "text-destructive hover:text-destructive hover:bg-destructive/10 gap-1 text-xs",
              children: [
                removeMutation.isPending && removeMutation.variables === ban.id ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-3 h-3 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3 h-3" }),
                "Remove"
              ]
            }
          ) })
        ] }, ban.id);
      }) })
    ] }) }) })
  ] });
}
const QUERY_KEY$2 = ["admin_ip_bans"];
function IPBanPanel() {
  const queryClient = useQueryClient();
  const [ipAddress, setIpAddress] = reactExports.useState("");
  const [reason, setReason] = reactExports.useState("");
  const [expiresAt, setExpiresAt] = reactExports.useState("");
  const [formError, setFormError] = reactExports.useState(null);
  const [showForm, setShowForm] = reactExports.useState(false);
  const { data: bans, isLoading, isError, refetch } = useQuery({
    queryKey: QUERY_KEY$2,
    queryFn: async () => {
      const { data, error } = await supabase.from("ip_bans").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data ?? [];
    }
  });
  const insertMutation = useMutation({
    mutationFn: async () => {
      var _a;
      const { data: currentUser } = await supabase.auth.getUser();
      const { error } = await supabase.from("ip_bans").insert({
        ip_address: ipAddress,
        reason,
        banned_by: (_a = currentUser.user) == null ? void 0 : _a.id,
        expires_at: expiresAt ? new Date(expiresAt).toISOString() : null
      });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY$2 });
      setIpAddress("");
      setReason("");
      setExpiresAt("");
      setFormError(null);
      setShowForm(false);
      ue.success("IP address banned successfully");
    },
    onError: (error) => {
      const msg = error instanceof Error ? error.message : String(error);
      if (msg.toLowerCase().includes("unique") || msg.toLowerCase().includes("duplicate") || msg.toLowerCase().includes("already")) {
        setFormError("This IP is already banned");
      } else if (msg.toLowerCase().includes("invalid") || msg.toLowerCase().includes("ip")) {
        setFormError("Invalid IP address format");
      } else {
        ue.error(`Failed to ban IP: ${msg}`);
      }
    }
  });
  const removeMutation = useMutation({
    mutationFn: async (id) => {
      const { error } = await supabase.from("ip_bans").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY$2 });
      ue.success("IP ban removed");
    },
    onError: (error) => {
      const msg = error instanceof Error ? error.message : String(error);
      ue.error(`Failed to remove ban: ${msg}`);
    }
  });
  const ipValid = ipAddress.trim() !== "" && validateIpAddress(ipAddress.trim());
  const reasonValid = reason.length >= 1 && reason.length <= 500;
  const isFormValid2 = ipValid && reasonValid;
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError(null);
    if (!ipValid) {
      setFormError("Invalid IP address format");
      return;
    }
    if (!isFormValid2) return;
    insertMutation.mutate();
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-xl font-bold flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { className: "w-6 h-6 text-primary" }),
        "IP Bans"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: "outline",
            size: "sm",
            onClick: () => setShowForm((v) => !v),
            className: "gap-1.5 text-xs",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CirclePlus, { className: "w-3.5 h-3.5" }),
              "Add Ban"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: "ghost",
            size: "sm",
            onClick: () => refetch(),
            disabled: isLoading,
            className: "gap-2 text-muted-foreground hover:text-foreground",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: `w-4 h-4 ${isLoading ? "animate-spin" : ""}` }),
              "Refresh"
            ]
          }
        )
      ] })
    ] }),
    showForm && /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassPanel, { className: "p-5 border-white/10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-sm font-semibold mb-4 flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CirclePlus, { className: "w-4 h-4 text-primary" }),
        "Ban IP Address"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
        formError && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive bg-destructive/10 border border-destructive/20 rounded px-3 py-2", children: formError }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "text-xs text-muted-foreground font-medium uppercase tracking-wide", children: [
            "IP Address ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "text",
              value: ipAddress,
              onChange: (e) => {
                setIpAddress(e.target.value);
                setFormError(null);
              },
              placeholder: "e.g. 192.168.1.1 or 2001:db8::1",
              className: "w-full bg-white/5 border border-white/10 rounded px-3 py-1.5 text-sm font-mono text-white placeholder:text-muted-foreground/40 focus:outline-none focus:ring-1 focus:ring-primary"
            }
          ),
          ipAddress && !validateIpAddress(ipAddress.trim()) && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive", children: "Invalid IP address format" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "text-xs text-muted-foreground font-medium uppercase tracking-wide", children: [
            "Reason ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "textarea",
            {
              value: reason,
              onChange: (e) => {
                setReason(e.target.value);
                setFormError(null);
              },
              placeholder: "Reason for banning this IP…",
              maxLength: 500,
              rows: 3,
              className: "w-full bg-white/5 border border-white/10 rounded px-3 py-1.5 text-sm text-white placeholder:text-muted-foreground/40 focus:outline-none focus:ring-1 focus:ring-primary resize-none"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground/50 text-right", children: [
            reason.length,
            "/500"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs text-muted-foreground font-medium uppercase tracking-wide", children: "Expiry (optional)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "datetime-local",
              value: expiresAt,
              onChange: (e) => setExpiresAt(e.target.value),
              className: "w-full bg-white/5 border border-white/10 rounded px-3 py-1.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-primary"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 pt-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              type: "submit",
              size: "sm",
              disabled: !isFormValid2 || insertMutation.isPending,
              className: "gap-1.5",
              children: [
                insertMutation.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-3.5 h-3.5 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { className: "w-3.5 h-3.5" }),
                "Ban IP"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              variant: "ghost",
              size: "sm",
              onClick: () => {
                setShowForm(false);
                setIpAddress("");
                setReason("");
                setExpiresAt("");
                setFormError(null);
              },
              className: "text-muted-foreground",
              children: "Cancel"
            }
          )
        ] })
      ] })
    ] }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-8 h-8 animate-spin text-primary opacity-50" }) }) : isError ? /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassPanel, { className: "p-10 text-center border-destructive/20 bg-destructive/5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-8 h-8 text-destructive/50 mx-auto mb-3" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-destructive mb-4", children: "Failed to load IP bans" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          variant: "outline",
          size: "sm",
          onClick: () => refetch(),
          className: "gap-2 border-destructive/30 hover:bg-destructive/10 text-destructive",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-4 h-4" }),
            "Retry"
          ]
        }
      )
    ] }) : !bans || bans.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassPanel, { className: "p-12 text-center border-dashed border-white/5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { className: "w-10 h-10 text-muted-foreground/25 mx-auto mb-3" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No active IP bans" })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(GlassPanel, { className: "border-white/5", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-white/10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-3 px-4 text-xs text-muted-foreground font-medium uppercase tracking-wide", children: "IP Address" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-3 px-4 text-xs text-muted-foreground font-medium uppercase tracking-wide", children: "Reason" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-3 px-4 text-xs text-muted-foreground font-medium uppercase tracking-wide", children: "Banned By" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-3 px-4 text-xs text-muted-foreground font-medium uppercase tracking-wide", children: "Expires" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-3 px-4" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: bans.map((ban) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-white/5 hover:bg-white/5 transition-colors", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-4 font-mono text-xs", children: ban.ip_address }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-4 text-xs text-muted-foreground max-w-[200px] truncate", title: ban.reason, children: ban.reason }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-4 text-xs text-muted-foreground font-mono", children: ban.banned_by ? ban.banned_by.slice(0, 8) + "…" : "—" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-4 text-xs text-muted-foreground", children: ban.expires_at ? format(new Date(ban.expires_at), "MMM d, yyyy HH:mm") : "Permanent" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-4 text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: "ghost",
            size: "sm",
            onClick: () => removeMutation.mutate(ban.id),
            disabled: removeMutation.isPending && removeMutation.variables === ban.id,
            className: "text-destructive hover:text-destructive hover:bg-destructive/10 gap-1 text-xs",
            children: [
              removeMutation.isPending && removeMutation.variables === ban.id ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-3 h-3 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3 h-3" }),
              "Remove"
            ]
          }
        ) })
      ] }, ban.id)) })
    ] }) }) })
  ] });
}
const PAGE_SIZE = 50;
const QUERY_KEY$1 = ["admin_ban_audit_log"];
function BanAuditLogPanel() {
  const { isAdmin, isModerator } = useAuth();
  const [page, setPage] = reactExports.useState(0);
  const [searchText, setSearchText] = reactExports.useState("");
  const [actionFilter, setActionFilter] = reactExports.useState("all");
  if (!isAdmin && !isModerator) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassPanel, { className: "p-12 text-center border-destructive/20 bg-destructive/5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-10 h-10 text-destructive/50 mx-auto mb-4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-destructive", children: "Access denied — admin or moderator role required" })
    ] });
  }
  const { data: allRecords, isLoading, isError, refetch } = useQuery({
    queryKey: QUERY_KEY$1,
    queryFn: async () => {
      const { data, error } = await supabase.from("ban_history").select("id, user_id, action, reason, duration_hours, expires_at, performed_by, created_at, banned_by, unbanned_at").order("created_at", { ascending: false }).limit(1e3);
      if (error) {
        ue.error("Failed to load ban audit log");
        throw error;
      }
      const profileIds = [...new Set((data ?? []).map((r) => r.user_id).filter(Boolean))];
      const bannedByIds = [...new Set((data ?? []).map((r) => r.banned_by || r.performed_by).filter(Boolean))];
      const allIds = [.../* @__PURE__ */ new Set([...profileIds, ...bannedByIds])];
      let profileMap = /* @__PURE__ */ new Map();
      if (allIds.length > 0) {
        const { data: profiles } = await supabase.from("profiles").select("id, display_name, username").in("id", allIds);
        (profiles ?? []).forEach((p) => {
          profileMap.set(p.id, { display_name: p.display_name || p.username || p.id, username: p.username || "" });
        });
      }
      return (data ?? []).map((row) => {
        const targetProfile = profileMap.get(row.user_id);
        const performerProfile = profileMap.get(row.performed_by || row.banned_by);
        const action = row.action === "unbanned" || row.unbanned_at && !row.action ? "unbanned" : "banned";
        return {
          id: row.id,
          user_id: row.user_id,
          username: (targetProfile == null ? void 0 : targetProfile.username) || "",
          display_name: (targetProfile == null ? void 0 : targetProfile.display_name) || row.user_id || "",
          action,
          reason: row.reason || "",
          duration_hours: row.duration_hours,
          expires_at: row.expires_at,
          performed_by_display_name: (performerProfile == null ? void 0 : performerProfile.display_name) || "",
          timestamp: row.created_at || ""
        };
      });
    }
  });
  const filteredRecords = filterAuditLog(allRecords ?? [], searchText, actionFilter);
  const pageCount = Math.ceil(filteredRecords.length / PAGE_SIZE);
  const paginatedRecords = filteredRecords.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);
  const handleSearchChange = (v) => {
    setSearchText(v);
    setPage(0);
  };
  const handleActionFilterChange = (v) => {
    setActionFilter(v);
    setPage(0);
  };
  const handleExport = () => {
    const blob = exportAuditLogCsv(filteredRecords);
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `ban-audit-log-${format(/* @__PURE__ */ new Date(), "yyyy-MM-dd")}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  const formatDuration = (hours) => {
    if (hours === null) return "permanent";
    const days = Math.floor(hours / 24);
    const remainingHours = hours % 24;
    if (days > 0 && remainingHours > 0) return `${days}d ${remainingHours}h`;
    if (days > 0) return `${days}d`;
    return `${hours}h`;
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between flex-wrap gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-xl font-bold flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(History, { className: "w-6 h-6 text-primary" }),
        "Ban Audit Log"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: "outline",
            size: "sm",
            onClick: handleExport,
            disabled: filteredRecords.length === 0,
            className: "gap-1.5 text-xs",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-3.5 h-3.5" }),
              "Export CSV"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: "ghost",
            size: "sm",
            onClick: () => refetch(),
            disabled: isLoading,
            className: "gap-2 text-muted-foreground hover:text-foreground",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: `w-4 h-4 ${isLoading ? "animate-spin" : ""}` }),
              "Refresh"
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-3 items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1 min-w-[200px]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "text",
            value: searchText,
            onChange: (e) => handleSearchChange(e.target.value),
            placeholder: "Search by name or username…",
            className: "w-full bg-white/5 border border-white/10 rounded pl-9 pr-3 py-1.5 text-sm text-white placeholder:text-muted-foreground/40 focus:outline-none focus:ring-1 focus:ring-primary"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "select",
        {
          value: actionFilter,
          onChange: (e) => handleActionFilterChange(e.target.value),
          className: "bg-white/5 border border-white/10 rounded px-3 py-1.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-primary",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "all", children: "All Actions" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "banned", children: "Banned" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "unbanned", children: "Unbanned" })
          ]
        }
      )
    ] }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-8 h-8 animate-spin text-primary opacity-50" }) }) : isError ? /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassPanel, { className: "p-10 text-center border-destructive/20 bg-destructive/5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-8 h-8 text-destructive/50 mx-auto mb-3" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-destructive mb-4", children: "Failed to load audit log" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          variant: "outline",
          size: "sm",
          onClick: () => refetch(),
          className: "gap-2 border-destructive/30 hover:bg-destructive/10 text-destructive",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-4 h-4" }),
            "Retry"
          ]
        }
      )
    ] }) : paginatedRecords.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassPanel, { className: "p-12 text-center border-dashed border-white/5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(History, { className: "w-10 h-10 text-muted-foreground/25 mx-auto mb-3" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No matching records found" })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(GlassPanel, { className: "border-white/5", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-white/10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-3 px-4 text-xs text-muted-foreground font-medium uppercase tracking-wide", children: "User" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-3 px-4 text-xs text-muted-foreground font-medium uppercase tracking-wide", children: "Action" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-3 px-4 text-xs text-muted-foreground font-medium uppercase tracking-wide", children: "Reason" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-3 px-4 text-xs text-muted-foreground font-medium uppercase tracking-wide", children: "Duration" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-3 px-4 text-xs text-muted-foreground font-medium uppercase tracking-wide", children: "By" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-3 px-4 text-xs text-muted-foreground font-medium uppercase tracking-wide", children: "Timestamp" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: paginatedRecords.map((record) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-white/5 hover:bg-white/5 transition-colors", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium", children: record.display_name }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[11px] text-muted-foreground font-mono", children: [
              "@",
              record.username
            ] })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold border ${record.action === "banned" ? "bg-destructive/15 text-destructive border-destructive/30" : "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"}`, children: record.action }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-4 text-xs text-muted-foreground max-w-[200px] truncate", title: record.reason, children: record.reason }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-4 text-xs text-muted-foreground tabular-nums", children: formatDuration(record.duration_hours) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-4 text-xs text-muted-foreground font-mono", children: record.performed_by_display_name ? record.performed_by_display_name.slice(0, 8) + "…" : "—" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-4 text-xs text-muted-foreground whitespace-nowrap", children: record.timestamp ? format(new Date(record.timestamp), "MMM d, yyyy HH:mm") : "—" })
        ] }, record.id)) })
      ] }) }) }),
      pageCount > 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
          filteredRecords.length,
          " records · Page ",
          page + 1,
          " of ",
          pageCount
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "outline",
              size: "sm",
              onClick: () => setPage((p) => Math.max(0, p - 1)),
              disabled: page === 0,
              className: "gap-1 text-xs",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "w-3.5 h-3.5" }),
                "Prev"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "outline",
              size: "sm",
              onClick: () => setPage((p) => Math.min(pageCount - 1, p + 1)),
              disabled: page >= pageCount - 1,
              className: "gap-1 text-xs",
              children: [
                "Next",
                /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-3.5 h-3.5" })
              ]
            }
          )
        ] })
      ] })
    ] })
  ] });
}
const QUERY_KEY = ["admin_ban_templates"];
function BanTemplatesPanel() {
  const queryClient = useQueryClient();
  const [showForm, setShowForm] = reactExports.useState(false);
  const [name, setName] = reactExports.useState("");
  const [reason, setReason] = reactExports.useState("");
  const [durationHours, setDurationHours] = reactExports.useState(null);
  const [durationPreset, setDurationPreset] = reactExports.useState("permanent");
  const [customHours, setCustomHours] = reactExports.useState("");
  const [formError, setFormError] = reactExports.useState(null);
  const [confirmDeleteId, setConfirmDeleteId] = reactExports.useState(null);
  const { data: templates, isLoading, isError, refetch } = useQuery({
    queryKey: QUERY_KEY,
    queryFn: async () => {
      const { data, error } = await supabase.from("ban_templates").select("*").order("name");
      if (error) throw error;
      return sortTemplatesAlpha(data ?? []);
    }
  });
  const insertMutation = useMutation({
    mutationFn: async () => {
      var _a;
      const { data: currentUser } = await supabase.auth.getUser();
      const hours = durationPreset === "permanent" ? null : durationPreset === "7d" ? 168 : durationPreset === "30d" ? 720 : parseInt(customHours, 10) || null;
      const { error } = await supabase.from("ban_templates").insert({ name, reason, duration_hours: hours, created_by: (_a = currentUser.user) == null ? void 0 : _a.id });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
      setName("");
      setReason("");
      setDurationPreset("permanent");
      setCustomHours("");
      setFormError(null);
      setShowForm(false);
      ue.success("Template saved");
    },
    onError: (err) => {
      const msg = err instanceof Error ? err.message : String(err);
      if (msg.toLowerCase().includes("unique") || msg.toLowerCase().includes("duplicate")) {
        setFormError("A template with this name already exists");
      } else {
        ue.error(`Failed to save template: ${msg}`);
      }
    }
  });
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const { error } = await supabase.from("ban_templates").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
      setConfirmDeleteId(null);
      ue.success("Template deleted");
    },
    onError: () => ue.error("Failed to delete template")
  });
  const existingNames = (templates ?? []).map((t) => t.name);
  const isFormValid2 = validateTemplateName(name, existingNames) && reason.trim().length > 0 && (durationPreset !== "custom" || parseInt(customHours, 10) >= 1 && parseInt(customHours, 10) <= 365 * 24);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateTemplateName(name, existingNames)) {
      if (name.length === 0) setFormError("Name is required");
      else if (name.length > 100) setFormError("Name must be 100 characters or fewer");
      else setFormError("A template with this name already exists");
      return;
    }
    setFormError(null);
    insertMutation.mutate();
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-xl font-bold flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(BookMarked, { className: "w-6 h-6 text-primary" }),
        "Ban Templates"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", size: "sm", onClick: () => setShowForm((v) => !v), className: "gap-1.5 text-xs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CirclePlus, { className: "w-3.5 h-3.5" }),
          " New Template"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "ghost", size: "sm", onClick: () => refetch(), disabled: isLoading, className: "gap-2 text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: `w-4 h-4 ${isLoading ? "animate-spin" : ""}` }),
          " Refresh"
        ] })
      ] })
    ] }),
    showForm && /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassPanel, { className: "p-5 border-white/10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-sm font-semibold mb-4 flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CirclePlus, { className: "w-4 h-4 text-primary" }),
        " Save Template"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
        formError && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive bg-destructive/10 border border-destructive/20 rounded px-3 py-2", children: formError }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs text-muted-foreground font-medium uppercase tracking-wide", children: "Template Name *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "text",
              value: name,
              onChange: (e) => {
                setName(e.target.value);
                setFormError(null);
              },
              maxLength: 100,
              className: "w-full bg-white/5 border border-white/10 rounded px-3 py-1.5 text-sm text-white placeholder:text-muted-foreground/40 focus:outline-none focus:ring-1 focus:ring-primary",
              placeholder: "e.g. Spam — 7 day ban"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs text-muted-foreground font-medium uppercase tracking-wide", children: "Reason *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "textarea",
            {
              value: reason,
              onChange: (e) => setReason(e.target.value),
              rows: 3,
              maxLength: 500,
              className: "w-full bg-white/5 border border-white/10 rounded px-3 py-1.5 text-sm text-white placeholder:text-muted-foreground/40 focus:outline-none focus:ring-1 focus:ring-primary resize-none",
              placeholder: "Reason text for this template…"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs text-muted-foreground font-medium uppercase tracking-wide", children: "Duration" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "select",
            {
              value: durationPreset,
              onChange: (e) => setDurationPreset(e.target.value),
              className: "w-full bg-white/5 border border-white/10 rounded px-3 py-1.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-primary",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "permanent", children: "Permanent" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "7d", children: "7 days" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "30d", children: "30 days" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "custom", children: "Custom (hours)" })
              ]
            }
          ),
          durationPreset === "custom" && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "number",
              value: customHours,
              onChange: (e) => setCustomHours(e.target.value),
              min: 1,
              max: 8760,
              placeholder: "Hours (1–8760)",
              className: "w-full mt-2 bg-white/5 border border-white/10 rounded px-3 py-1.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-primary"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 pt-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "submit", size: "sm", disabled: !isFormValid2 || insertMutation.isPending, className: "gap-1.5", children: [
            insertMutation.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-3.5 h-3.5 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(BookMarked, { className: "w-3.5 h-3.5" }),
            " Save Template"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "ghost", size: "sm", onClick: () => {
            setShowForm(false);
            setFormError(null);
          }, className: "text-muted-foreground", children: "Cancel" })
        ] })
      ] })
    ] }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-8 h-8 animate-spin text-primary opacity-50" }) }) : isError ? /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassPanel, { className: "p-10 text-center border-destructive/20 bg-destructive/5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-8 h-8 text-destructive/50 mx-auto mb-3" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-destructive mb-4", children: "Failed to load templates" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", size: "sm", onClick: () => refetch(), className: "gap-2 border-destructive/30 hover:bg-destructive/10 text-destructive", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-4 h-4" }),
        " Retry"
      ] })
    ] }) : !templates || templates.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassPanel, { className: "p-12 text-center border-dashed border-white/5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(BookMarked, { className: "w-10 h-10 text-muted-foreground/25 mx-auto mb-3" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No templates saved yet" })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(GlassPanel, { className: "border-white/5", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divide-y divide-white/5", children: templates.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4 p-4 hover:bg-white/5 transition-colors", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold", children: t.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5 line-clamp-2", children: t.reason }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground/60 mt-1", children: t.duration_hours === null ? "Permanent" : t.duration_hours >= 168 ? `${Math.round(t.duration_hours / 24)} days` : `${t.duration_hours}h` })
      ] }),
      confirmDeleteId === t.id ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 shrink-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "Confirm?" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "sm", onClick: () => setConfirmDeleteId(null), className: "text-xs h-7 text-muted-foreground", children: "Cancel" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "ghost", size: "sm", onClick: () => deleteMutation.mutate(t.id), disabled: deleteMutation.isPending, className: "text-destructive hover:text-destructive hover:bg-destructive/10 gap-1 text-xs h-7", children: [
          deleteMutation.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-3 h-3 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3 h-3" }),
          " Delete"
        ] })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "ghost", size: "sm", onClick: () => setConfirmDeleteId(t.id), className: "shrink-0 text-muted-foreground hover:text-destructive gap-1 text-xs h-7", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3 h-3" }),
        " Delete"
      ] })
    ] }, t.id)) }) })
  ] });
}
const ADMIN = ["admin"];
const STAFF = ["admin", "moderator"];
const NAV = [
  {
    id: "insight",
    label: "Insight",
    items: [
      { value: "analytics", label: "Analytics", icon: ChartColumn, roles: STAFF, keywords: "dashboard traffic" },
      { value: "userstats", label: "User Stats", icon: Activity, roles: STAFF, keywords: "growth retention" },
      { value: "streaming", label: "Streaming", icon: MonitorPlay, roles: ADMIN, keywords: "playback sources" },
      { value: "performance", label: "Performance", icon: Gauge, roles: ADMIN, keywords: "speed vitals" }
    ]
  },
  {
    id: "queues",
    label: "Queues",
    items: [
      { value: "reports", label: "User Reports", icon: ShieldAlert, roles: STAFF, badge: "reports", keywords: "flags abuse" },
      { value: "suggestions", label: "Suggestions", icon: Lightbulb, roles: STAFF, badge: "suggestions", keywords: "requests ideas" },
      { value: "pending", label: "Forum Moderation", icon: MessageSquare, roles: STAFF, badge: "posts", keywords: "threads approval" }
    ]
  },
  {
    id: "moderation",
    label: "Moderation",
    items: [
      { value: "comments", label: "Comments", icon: MessagesSquare, roles: STAFF, keywords: "replies" },
      { value: "content", label: "Content", icon: Layers, roles: STAFF, keywords: "takedown media" },
      { value: "ban-management", label: "Ban Management", icon: Ban, roles: ADMIN, keywords: "device ip templates" },
      { value: "ban-audit", label: "Ban Audit Log", icon: ScrollText, roles: STAFF, keywords: "history" },
      { value: "moderation", label: "Staff Activity", icon: History, roles: STAFF, keywords: "audit" },
      { value: "logs", label: "Staff Logs", icon: FileText, roles: STAFF, keywords: "audit trail" }
    ]
  },
  {
    id: "community",
    label: "Community",
    items: [
      { value: "users", label: "Users", icon: Users, roles: STAFF, keywords: "accounts profiles bans" },
      { value: "watchrooms", label: "Watch Rooms", icon: Radio, roles: STAFF, keywords: "party sync" },
      { value: "achievements", label: "Achievements", icon: Trophy, roles: STAFF, keywords: "badges" },
      { value: "badges", label: "Badges", icon: Award, roles: STAFF, keywords: "badge role collectible rarity" },
      { value: "notifications", label: "Notifications", icon: BellRing, roles: ADMIN, keywords: "broadcast announcements" },
      { value: "news", label: "News", icon: Newspaper, roles: ADMIN, keywords: "announcements press headlines publish" }
    ]
  },
  {
    id: "catalogue",
    label: "Catalogue",
    items: [
      { value: "popups", label: "Popups & Ads", icon: Megaphone, roles: ADMIN, keywords: "banners" }
    ]
  },
  {
    id: "system",
    label: "System",
    items: [
      { value: "settings", label: "System", icon: Settings, roles: ADMIN, keywords: "maintenance releases redirects" },
      { value: "incidents", label: "Incidents", icon: CircleAlert, roles: ADMIN, keywords: "status outage" },
      { value: "changelog", label: "Changelog", icon: Rocket, roles: ADMIN, keywords: "release notes" },
      { value: "api-admin", label: "API Admin", icon: Webhook, roles: ADMIN, keywords: "keys tokens" },
      { value: "updates", label: "Updates", icon: CloudDownload, roles: ADMIN, keywords: "version electron" },
      { value: "crashes", label: "Crash Reports", icon: Bug, roles: ADMIN, keywords: "errors", desktopOnly: true },
      { value: "desktop-logs", label: "Desktop Logs", icon: Terminal, roles: STAFF, keywords: "electron", desktopOnly: true }
    ]
  }
];
function buildAdminNav({ isAdmin, isModerator, isDesktopApp }) {
  const role = isAdmin ? "admin" : isModerator ? "moderator" : null;
  if (!role) return { groups: [], items: [] };
  const groups = NAV.map((group) => ({
    ...group,
    items: group.items.filter(
      (item) => item.roles.includes(role) && (!item.desktopOnly || isDesktopApp)
    )
  })).filter((group) => group.items.length > 0);
  return { groups, items: groups.flatMap((group) => group.items) };
}
function filterAdminNav(groups, query) {
  const needle = query.trim().toLowerCase();
  if (!needle) return groups;
  return groups.map((group) => ({
    ...group,
    items: group.items.filter(
      (item) => `${item.label} ${item.keywords ?? ""}`.toLowerCase().includes(needle)
    )
  })).filter((group) => group.items.length > 0);
}
const SEARCH_THRESHOLD = 8;
function AdminNav({ groups, badgeCounts, onSelect, className }) {
  const [query, setQuery] = reactExports.useState("");
  const visible = reactExports.useMemo(() => filterAdminNav(groups, query), [groups, query]);
  const total = reactExports.useMemo(
    () => groups.reduce((sum, group) => sum + group.items.length, 0),
    [groups]
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: cn("flex flex-col gap-2", className), children: [
    total > SEARCH_THRESHOLD && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          type: "search",
          value: query,
          onChange: (event) => setQuery(event.target.value),
          placeholder: `Filter ${total} sections`,
          "aria-label": "Filter dashboard sections",
          className: "h-10 w-full rounded-xl border border-white/[0.07] bg-white/[0.03] pl-9 pr-3 text-sm font-medium text-foreground transition-colors placeholder:text-muted-foreground focus-visible:border-primary/40 focus-visible:outline-none"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(TabsList, { className: "flex h-auto w-full flex-col items-stretch justify-start gap-0.5 border-0 bg-transparent p-0", children: visible.map((group) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { role: "presentation", className: "w-full", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "px-3 pb-1 pt-3 text-[10px] font-bold uppercase tracking-[0.22em] text-muted-foreground/60", children: group.label }),
      group.items.map((item) => {
        const count = item.badge ? (badgeCounts == null ? void 0 : badgeCounts[item.badge]) ?? 0 : 0;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          TabsTrigger,
          {
            value: item.value,
            onClick: onSelect,
            className: "group/nav w-full justify-start gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-white/55 transition-colors hover:text-white data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm data-[state=active]:shadow-primary/25",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(item.icon, { className: "h-4 w-4 shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-1 truncate text-left", children: item.label }),
              count > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-destructive px-1.5 text-[10px] font-bold text-destructive-foreground group-data-[state=active]/nav:bg-primary-foreground group-data-[state=active]/nav:text-primary", children: count > 99 ? "99+" : count })
            ]
          },
          item.value
        );
      })
    ] }, group.id)) }),
    visible.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "px-3 py-6 text-center text-sm text-muted-foreground", children: [
      "No section matches “",
      query.trim(),
      "”."
    ] })
  ] });
}
function StatTile({
  icon: Icon,
  tone,
  value,
  label
}) {
  const chip = {
    primary: "bg-primary/15 text-primary",
    secondary: "bg-secondary/15 text-secondary",
    destructive: "bg-destructive/15 text-destructive",
    amber: "bg-amber/15 text-amber"
  }[tone];
  return /* @__PURE__ */ jsxRuntimeExports.jsx(GlassPanel, { className: "rounded-2xl p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("rounded-xl p-2", chip), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-5 w-5" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold tabular-nums", children: value }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate text-xs text-muted-foreground", children: label })
    ] })
  ] }) });
}
function BulkBanToolbar({ selectedUsers, onComplete }) {
  const [showDialog, setShowDialog] = reactExports.useState(false);
  const [reason, setReason] = reactExports.useState("");
  const [durationPreset, setDurationPreset] = reactExports.useState("permanent");
  const [customDays, setCustomDays] = reactExports.useState("");
  const [processing, setProcessing] = reactExports.useState(false);
  const [progress, setProgress] = reactExports.useState(0);
  if (selectedUsers.length === 0) return null;
  const getDurationHours = () => {
    if (durationPreset === "permanent") return null;
    if (durationPreset === "7d") return 168;
    if (durationPreset === "30d") return 720;
    const days = parseInt(customDays, 10);
    if (!isNaN(days) && days >= 1 && days <= 365) return days * 24;
    return null;
  };
  const customValid = durationPreset !== "custom" || parseInt(customDays, 10) >= 1 && parseInt(customDays, 10) <= 365;
  const formValid = reason.trim().length >= 1 && reason.trim().length <= 500 && customValid;
  const handleBulkBan = async () => {
    if (!formValid) return;
    setProcessing(true);
    setProgress(0);
    const hours = getDurationHours();
    const failedUsers = [];
    for (let i = 0; i < selectedUsers.length; i++) {
      const user = selectedUsers[i];
      try {
        const { error } = await supabase.rpc("ban_user", {
          target_user_id: user.id,
          reason: reason.trim(),
          duration_hours: hours
        });
        if (error) throw error;
      } catch {
        failedUsers.push(user.display_name);
      }
      setProgress(i + 1);
    }
    setProcessing(false);
    setShowDialog(false);
    setReason("");
    setDurationPreset("permanent");
    setCustomDays("");
    const successCount = selectedUsers.length - failedUsers.length;
    ue.success(`Banned ${successCount} user${successCount !== 1 ? "s" : ""} successfully`, { duration: 5e3 });
    if (failedUsers.length > 0) {
      ue.error(`Failed to ban: ${failedUsers.join(", ")}`, { duration: 0 });
    }
    onComplete();
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 p-3 rounded-xl bg-primary/10 border border-primary/20 mb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-medium text-primary", children: [
        selectedUsers.length,
        " user",
        selectedUsers.length !== 1 ? "s" : "",
        " selected"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", variant: "destructive", onClick: () => setShowDialog(true), className: "gap-1.5 text-xs ml-auto", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Ban, { className: "w-3.5 h-3.5" }),
        " Bulk Ban"
      ] })
    ] }),
    showDialog && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassPanel, { className: "w-full max-w-md p-6 border-white/20 space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-base font-bold flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Ban, { className: "w-5 h-5 text-destructive" }),
          " Bulk Ban ",
          selectedUsers.length,
          " Users"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "sm", onClick: () => !processing && setShowDialog(false), className: "w-7 h-7 p-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" }) })
      ] }),
      processing ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 text-center py-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-8 h-8 animate-spin text-primary mx-auto" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-medium", children: [
          "Processing ",
          progress,
          " of ",
          selectedUsers.length
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2 rounded-full bg-white/10 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full bg-primary transition-all duration-300 rounded-full", style: { width: `${progress / selectedUsers.length * 100}%` } }) })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs text-muted-foreground font-medium uppercase tracking-wide", children: "Shared Reason *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "textarea",
            {
              value: reason,
              onChange: (e) => setReason(e.target.value),
              rows: 3,
              maxLength: 500,
              placeholder: "Reason for banning all selected users…",
              className: "w-full bg-white/5 border border-white/10 rounded px-3 py-1.5 text-sm text-white placeholder:text-muted-foreground/40 focus:outline-none focus:ring-1 focus:ring-primary resize-none"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground/50 text-right", children: [
            reason.length,
            "/500"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs text-muted-foreground font-medium uppercase tracking-wide", children: "Duration" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "select",
            {
              value: durationPreset,
              onChange: (e) => setDurationPreset(e.target.value),
              className: "w-full bg-white/5 border border-white/10 rounded px-3 py-1.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-primary",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "permanent", children: "Permanent" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "7d", children: "7 days" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "30d", children: "30 days" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "custom", children: "Custom (1–365 days)" })
              ]
            }
          ),
          durationPreset === "custom" && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "number",
              value: customDays,
              onChange: (e) => setCustomDays(e.target.value),
              min: 1,
              max: 365,
              placeholder: "Days (1–365)",
              className: "w-full mt-2 bg-white/5 border border-white/10 rounded px-3 py-1.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-primary"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 pt-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: handleBulkBan, disabled: !formValid, className: "gap-1.5 bg-destructive hover:bg-destructive/90 flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Ban, { className: "w-3.5 h-3.5" }),
            " Ban ",
            selectedUsers.length,
            " Users"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", onClick: () => setShowDialog(false), className: "text-muted-foreground", children: "Cancel" })
        ] })
      ] })
    ] }) })
  ] });
}
const USERS_PER_PAGE = 50;
const formatDate = (dateString) => new Date(dateString).toLocaleDateString("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit"
});
function UserManagementTab({
  onMessageUser,
  onViewActivity
}) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { isAdmin, isModerator, profile } = useAuth();
  const isStaff = isAdmin || isModerator;
  const [searchTerm, setSearchTerm] = reactExports.useState("");
  const [debouncedSearch, setDebouncedSearch] = reactExports.useState("");
  const [userPage, setUserPage] = reactExports.useState(0);
  const [banReason, setBanReason] = reactExports.useState("");
  const [showBanModal, setShowBanModal] = reactExports.useState(false);
  const [userToBan, setUserToBan] = reactExports.useState(null);
  const [showBroadcastModal, setShowBroadcastModal] = reactExports.useState(false);
  const [broadcastMessage, setBroadcastMessage] = reactExports.useState("");
  const [broadcastTitle, setBroadcastTitle] = reactExports.useState("");
  const [selectedUsers, setSelectedUsers] = reactExports.useState([]);
  reactExports.useEffect(() => {
    const id = setTimeout(() => {
      setDebouncedSearch(searchTerm.trim());
      setUserPage(0);
    }, 300);
    return () => clearTimeout(id);
  }, [searchTerm]);
  const { data: usersPage, isLoading: loadingUsers } = useQuery({
    queryKey: ["admin_users", debouncedSearch, userPage],
    queryFn: async () => {
      const from = userPage * USERS_PER_PAGE;
      const to = from + USERS_PER_PAGE - 1;
      let query = supabase.from("profiles").select("*", { count: "exact" }).order("created_at", { ascending: false }).range(from, to);
      if (debouncedSearch) {
        const needle = debouncedSearch.replace(/[,()*]/g, " ").trim();
        if (needle) {
          query = query.or(`display_name.ilike.*${needle}*,username.ilike.*${needle}*`);
        }
      }
      const { data, error, count } = await query;
      if (error) throw error;
      return { rows: data ?? [], count: count ?? 0 };
    },
    enabled: isStaff
  });
  const users = usersPage == null ? void 0 : usersPage.rows;
  const filteredUsers = users;
  const matchedUsersCount = (usersPage == null ? void 0 : usersPage.count) ?? 0;
  const userPageCount = Math.max(1, Math.ceil(matchedUsersCount / USERS_PER_PAGE));
  const banUser = useMutation({
    mutationFn: async ({ userId, reason }) => {
      const { error } = await supabase.rpc("ban_user", {
        target_user_id: userId,
        reason,
        duration_hours: null
        // null = permanent ban
      });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin_users"] });
      ue.success("User banned successfully");
      setShowBanModal(false);
      setBanReason("");
      setUserToBan(null);
    },
    onError: (error) => {
      console.error("Ban error:", error);
      ue.error(error.message || "Failed to ban user");
    }
  });
  const unbanUser = useMutation({
    mutationFn: async (userId) => {
      const { error } = await supabase.rpc("unban_user", {
        target_user_id: userId
      });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin_users"] });
      ue.success("User unbanned successfully");
    },
    onError: (error) => {
      console.error("Unban error:", error);
      ue.error(error.message || "Failed to unban user");
    }
  });
  const toggleAdmin = useMutation({
    mutationFn: async ({ userId, makeAdmin }) => {
      const { error } = await supabase.rpc("set_staff_role", {
        target_user_id: userId,
        p_role: "admin",
        p_enabled: makeAdmin
      });
      if (error) throw error;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["admin_users"] });
      ue.success(variables.makeAdmin ? "User promoted to admin" : "Admin privileges revoked");
    },
    onError: (error) => {
      ue.error((error == null ? void 0 : error.message) || "Failed to update admin status");
    }
  });
  const toggleModerator = useMutation({
    mutationFn: async ({ userId, makeModerator }) => {
      const { error } = await supabase.rpc("set_staff_role", {
        target_user_id: userId,
        p_role: "moderator",
        p_enabled: makeModerator
      });
      if (error) throw error;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["admin_users"] });
      ue.success(variables.makeModerator ? "User promoted to moderator" : "Moderator privileges revoked");
    },
    onError: (error) => {
      ue.error((error == null ? void 0 : error.message) || "Failed to update moderator status");
    }
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "users", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassPanel, { className: "p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-xl font-semibold flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-5 h-5 text-primary" }),
          "Manage Users"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              onClick: () => setShowBroadcastModal(true),
              className: "flex items-center gap-2 bg-primary hover:bg-primary/90",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Megaphone, { className: "w-4 h-4" }),
                "Broadcast Message"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-64", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                placeholder: "Search users...",
                value: searchTerm,
                onChange: (e) => setSearchTerm(e.target.value),
                className: "pl-10 bg-muted/50"
              }
            )
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        BulkBanToolbar,
        {
          selectedUsers,
          onComplete: () => {
            setSelectedUsers([]);
            queryClient.invalidateQueries({ queryKey: ["admin_users"] });
          }
        }
      ),
      loadingUsers ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center py-12 text-muted-foreground", children: "Loading..." }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border/50", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-3 px-4 text-sm font-medium text-muted-foreground w-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "checkbox",
                className: "rounded border-white/20",
                checked: selectedUsers.length > 0 && selectedUsers.length === (filteredUsers == null ? void 0 : filteredUsers.length),
                onChange: (e) => {
                  if (e.target.checked) {
                    setSelectedUsers((filteredUsers ?? []).map((u) => ({ id: u.user_id, display_name: u.display_name || u.username || "Unknown" })));
                  } else {
                    setSelectedUsers([]);
                  }
                }
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-3 px-4 text-sm font-medium text-muted-foreground", children: "User" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-3 px-4 text-sm font-medium text-muted-foreground", children: "Username" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-3 px-4 text-sm font-medium text-muted-foreground", children: "Status" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-3 px-4 text-sm font-medium text-muted-foreground", children: "Joined" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right py-3 px-4 text-sm font-medium text-muted-foreground", children: "Actions" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: filteredUsers == null ? void 0 : filteredUsers.map((user) => {
            var _a, _b;
            return /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: `border-b border-border/30 hover:bg-muted/30 transition-colors ${user.is_banned ? "opacity-60" : ""}`, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  type: "checkbox",
                  className: "rounded border-white/20",
                  checked: selectedUsers.some((s) => s.id === user.user_id),
                  onChange: (e) => {
                    if (e.target.checked) {
                      setSelectedUsers((prev) => [...prev, { id: user.user_id, display_name: user.display_name || user.username || "Unknown" }]);
                    } else {
                      setSelectedUsers((prev) => prev.filter((s) => s.id !== user.user_id));
                    }
                  }
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: `/@${user.username || user.id}`, className: "block group shrink-0", children: user.avatar_url ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-full border-2 border-primary/20 overflow-hidden transition-transform group-hover:scale-105", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: user.avatar_url, alt: "", className: "w-full h-full object-cover" }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-sm font-bold text-primary-foreground group-hover:scale-105 transition-transform", children: ((_b = (_a = user.display_name) == null ? void 0 : _a[0]) == null ? void 0 : _b.toUpperCase()) || "U" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: `/@${user.username || user.id}`, className: "font-medium hover:text-primary transition-colors block truncate", children: user.display_name || "Unknown" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 mt-0.5", children: [
                    deriveIsAdmin(user) && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-1.5 py-0.5 rounded bg-primary/20 text-primary text-[10px] font-bold uppercase tracking-wider", children: "Admin" }),
                    deriveIsModerator(user) && !deriveIsAdmin(user) && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-1.5 py-0.5 rounded bg-secondary/20 text-secondary text-[10px] font-bold uppercase tracking-wider", children: "Moderator" })
                  ] })
                ] })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground font-mono text-xs", children: user.username ? `@${user.username}` : "-" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1", children: [
                user.is_banned ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-destructive/20 text-destructive text-[10px] font-bold uppercase tracking-wider w-fit", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Ban, { className: "w-3 h-3" }),
                  " Banned"
                ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-500 text-[10px] font-bold uppercase tracking-wider w-fit", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-3 h-3" }),
                  " Active"
                ] }),
                user.last_seen && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] text-muted-foreground flex items-center gap-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `w-1.5 h-1.5 rounded-full ${(/* @__PURE__ */ new Date()).getTime() - new Date(user.last_seen).getTime() < 3e5 ? "bg-emerald-500 animate-pulse" : "bg-muted-foreground/30"}` }),
                  (/* @__PURE__ */ new Date()).getTime() - new Date(user.last_seen).getTime() < 3e5 ? "Online" : `Last seen ${formatDistanceToNow(new Date(user.last_seen), { addSuffix: true })}`
                ] })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-4 text-muted-foreground text-sm", children: formatDate(user.created_at) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-end gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    variant: "ghost",
                    size: "sm",
                    onClick: () => navigate(`/admin/user/${user.user_id}`),
                    className: "text-primary hover:text-primary hover:bg-primary/10",
                    title: "Manage user",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(UserCog, { className: "w-4 h-4" })
                  }
                ),
                isAdmin && (() => {
                  const rowIsAdmin = deriveIsAdmin(user);
                  const rowIsModerator = deriveIsModerator(user);
                  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        variant: "ghost",
                        size: "sm",
                        onClick: () => toggleModerator.mutate({ userId: user.user_id, makeModerator: !rowIsModerator }),
                        disabled: toggleModerator.isPending || rowIsAdmin,
                        className: rowIsModerator ? "text-primary hover:text-primary" : "text-muted-foreground hover:text-primary",
                        title: rowIsModerator ? "Remove moderator" : "Make moderator",
                        children: rowIsModerator ? /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "w-4 h-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-4 h-4" })
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        variant: "ghost",
                        size: "sm",
                        onClick: () => toggleAdmin.mutate({ userId: user.user_id, makeAdmin: !rowIsAdmin }),
                        disabled: toggleAdmin.isPending,
                        className: rowIsAdmin ? "text-primary hover:text-primary" : "text-muted-foreground hover:text-primary",
                        title: rowIsAdmin ? "Remove admin" : "Make admin",
                        children: rowIsAdmin ? /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "w-4 h-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldOff, { className: "w-4 h-4" })
                      }
                    )
                  ] });
                })(),
                isAdmin && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    variant: "ghost",
                    size: "sm",
                    onClick: () => onMessageUser(user.user_id),
                    className: "text-primary hover:text-primary hover:bg-primary/10",
                    title: "Send direct message",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "w-4 h-4" })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    variant: "ghost",
                    size: "sm",
                    onClick: () => onViewActivity(user.user_id),
                    className: "text-secondary hover:text-secondary hover:bg-secondary/10",
                    title: "View Activity",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "w-4 h-4" })
                  }
                ),
                user.is_banned ? isAdmin && !user.is_admin && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    variant: "ghost",
                    size: "sm",
                    onClick: () => unbanUser.mutate(user.user_id),
                    disabled: unbanUser.isPending,
                    className: "text-emerald-500 hover:text-emerald-500",
                    title: "Unban user",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(LockOpen, { className: "w-4 h-4" })
                  }
                ) : (isAdmin || isModerator) && !user.is_admin && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    variant: "ghost",
                    size: "sm",
                    onClick: () => {
                      setUserToBan(user.user_id);
                      setShowBanModal(true);
                    },
                    disabled: banUser.isPending,
                    className: "text-destructive hover:text-destructive",
                    title: "Ban user",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Ban, { className: "w-4 h-4" })
                  }
                )
              ] }) })
            ] }, user.id);
          }) })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex items-center justify-between gap-4 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground", children: [
            matchedUsersCount.toLocaleString(),
            " ",
            debouncedSearch ? "matching " : "",
            "user",
            matchedUsersCount === 1 ? "" : "s",
            matchedUsersCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              " · page ",
              userPage + 1,
              " of ",
              userPageCount
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "outline",
                size: "sm",
                onClick: () => setUserPage((p) => Math.max(0, p - 1)),
                disabled: userPage === 0,
                children: "Previous"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "outline",
                size: "sm",
                onClick: () => setUserPage((p) => p + 1),
                disabled: userPage + 1 >= userPageCount,
                children: "Next"
              }
            )
          ] })
        ] })
      ] })
    ] }) }),
    showBanModal && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassPanel, { className: "p-6 max-w-md w-full", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-display text-xl font-bold mb-4 flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Ban, { className: "w-5 h-5 text-destructive" }),
        "Ban User"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium mb-2 block", children: "Reason for ban" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              value: banReason,
              onChange: (e) => setBanReason(e.target.value),
              placeholder: "Enter reason for banning this user...",
              className: "bg-muted/50"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 justify-end", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", onClick: () => {
            setShowBanModal(false);
            setUserToBan(null);
          }, children: "Cancel" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "destructive",
              onClick: () => userToBan && banUser.mutate({ userId: userToBan, reason: banReason }),
              disabled: banUser.isPending,
              children: banUser.isPending ? "Banning..." : "Ban User"
            }
          )
        ] })
      ] })
    ] }) }),
    showBroadcastModal && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassPanel, { className: "p-6 max-w-md w-full", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-display text-xl font-bold mb-4 flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Megaphone, { className: "w-5 h-5 text-primary" }),
        "Broadcast Message to All Users"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium text-muted-foreground", children: "Title" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              placeholder: "Enter broadcast title...",
              value: broadcastTitle,
              onChange: (e) => setBroadcastTitle(e.target.value),
              className: "mt-1"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium text-muted-foreground", children: "Message" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              placeholder: "Enter your message to all users...",
              value: broadcastMessage,
              onChange: (e) => setBroadcastMessage(e.target.value),
              className: "mt-1 min-h-[120px]"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 justify-end", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", onClick: () => {
            setShowBroadcastModal(false);
            setBroadcastTitle("");
            setBroadcastMessage("");
          }, children: "Cancel" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              onClick: async () => {
                try {
                  const { data: users2 } = await supabase.from("profiles").select("user_id").neq("is_banned", true);
                  if (!users2 || users2.length === 0) {
                    ue.error("No users found to notify");
                    return;
                  }
                  const notifications = users2.map((user) => ({
                    user_id: user.user_id,
                    title: broadcastTitle,
                    body: broadcastMessage,
                    data: { type: "broadcast", sent_by: (profile == null ? void 0 : profile.id) || "admin" },
                    read: false,
                    created_at: (/* @__PURE__ */ new Date()).toISOString()
                  }));
                  const { error } = await supabase.from("notifications").insert(notifications);
                  if (error) throw error;
                  queryClient.invalidateQueries({ queryKey: ["notifications"] });
                  ue.success(`Broadcast notification sent to ${users2.length} users!`);
                  setShowBroadcastModal(false);
                  setBroadcastTitle("");
                  setBroadcastMessage("");
                } catch (error) {
                  console.error("Error sending broadcast notification:", error);
                  ue.error("Failed to send broadcast notification");
                }
              },
              disabled: !broadcastTitle || !broadcastMessage,
              children: "Send Broadcast Notification"
            }
          )
        ] })
      ] })
    ] }) })
  ] });
}
function AdminPage() {
  var _a, _b;
  const navigate = useNavigate();
  const isDesktopApp = useIsDesktopApp();
  const { isAdmin, isModerator, profile, isLoading, rolesResolved } = useAuth();
  const queryClient = useQueryClient();
  const confirm = useConfirm();
  const [messageTitle, setMessageTitle] = reactExports.useState("");
  const [messageContent, setMessageContent] = reactExports.useState("");
  const [notifyTarget, setNotifyTarget] = reactExports.useState("all");
  const [notifyRecipient, setNotifyRecipient] = reactExports.useState("");
  const [messagingUserId, setMessagingUserId] = reactExports.useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const { groups: navGroups, items: navSections } = reactExports.useMemo(
    () => buildAdminNav({ isAdmin, isModerator, isDesktopApp }),
    [isAdmin, isModerator, isDesktopApp]
  );
  const sectionParam = searchParams.get("section");
  const activeTab = sectionParam && navSections.some((item) => item.value === sectionParam) ? sectionParam : ((_a = navSections[0]) == null ? void 0 : _a.value) ?? "analytics";
  const setActiveTab = (value) => {
    const next = new URLSearchParams(searchParams);
    next.set("section", value);
    setSearchParams(next, { replace: true });
  };
  const activeLabel = ((_b = navSections.find((item) => item.value === activeTab)) == null ? void 0 : _b.label) ?? "Dashboard Menu";
  const [isMenuOpen, setIsMenuOpen] = reactExports.useState(false);
  const [viewingActivityUserId, setViewingActivityUserId] = reactExports.useState(null);
  const { deleteMessage } = useAdminMessages();
  const isStaff = isAdmin || isModerator;
  reactExports.useEffect(() => {
    if (!isLoading && rolesResolved && !isStaff) {
      navigate("/");
    }
  }, [isLoading, rolesResolved, isStaff, navigate]);
  const { data: maintenanceMode } = useQuery({
    queryKey: ["maintenance_mode"],
    queryFn: async () => {
      const { data, error } = await supabase.from("maintenance_mode").select("*").single();
      if (error && error.code !== "PGRST116") throw error;
      return data;
    },
    enabled: isAdmin
  });
  const { data: totalUsersCount } = useQuery({
    queryKey: ["admin_users_count"],
    queryFn: async () => {
      const { count, error } = await supabase.from("profiles").select("*", { count: "exact", head: true });
      if (error) throw error;
      return count || 0;
    },
    enabled: isStaff
  });
  const { data: bannedUsersCount } = useQuery({
    queryKey: ["admin_banned_count"],
    queryFn: async () => {
      const { count, error } = await supabase.from("profiles").select("*", { count: "exact", head: true }).eq("is_banned", true);
      if (error) throw error;
      return count || 0;
    },
    enabled: isStaff
  });
  const { data: totalCommentsCount } = useQuery({
    queryKey: ["admin_comments_count"],
    queryFn: async () => {
      const { count, error } = await supabase.from("comments").select("*", { count: "exact", head: true });
      if (error) throw error;
      return count || 0;
    },
    enabled: isStaff
  });
  const { comments: recentComments, isLoading: loadingComments } = useRecentCommentsDetailed(60);
  const { data: sentMessages, isLoading: loadingSentMessages } = useQuery({
    queryKey: ["admin_sent_messages"],
    queryFn: async () => {
      const { data, error } = await supabase.from("admin_messages").select("*").order("created_at", { ascending: false }).limit(50);
      if (error) throw error;
      return data || [];
    },
    enabled: isAdmin
  });
  const deleteComment = useMutation({
    mutationFn: async (commentId) => {
      const { error } = await supabase.from("comments").delete().eq("id", commentId);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["recent-comments-detailed"] });
      ue.success("Comment deleted");
    },
    onError: () => {
      ue.error("Failed to delete comment");
    }
  });
  const toggleMaintenance = useMutation({
    mutationFn: async () => {
      var _a2;
      const { data: currentUser } = await supabase.auth.getUser();
      const { error } = await supabase.from("maintenance_mode").update({
        is_active: !(maintenanceMode == null ? void 0 : maintenanceMode.is_active),
        enabled_at: !(maintenanceMode == null ? void 0 : maintenanceMode.is_active) ? (/* @__PURE__ */ new Date()).toISOString() : null,
        enabled_by: !(maintenanceMode == null ? void 0 : maintenanceMode.is_active) ? (_a2 = currentUser.user) == null ? void 0 : _a2.id : null,
        updated_at: (/* @__PURE__ */ new Date()).toISOString()
      }).eq("id", maintenanceMode == null ? void 0 : maintenanceMode.id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["maintenance_mode"] });
      ue.success((maintenanceMode == null ? void 0 : maintenanceMode.is_active) ? "Maintenance mode disabled" : "Maintenance mode enabled");
    },
    onError: () => {
      ue.error("Failed to toggle maintenance mode");
    }
  });
  const sendMessage = useMutation({
    mutationFn: async ({ title, content, recipientId }) => {
      var _a2;
      const { data: currentUser } = await supabase.auth.getUser();
      const { error } = await supabase.from("admin_messages").insert({
        title,
        content,
        message_type: recipientId ? "individual" : "broadcast",
        recipient_id: recipientId,
        sender_id: (_a2 = currentUser.user) == null ? void 0 : _a2.id
      });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin_sent_messages"] });
      ue.success("Message sent successfully");
      setMessageTitle("");
      setMessageContent("");
      setNotifyRecipient("");
    },
    onError: (error) => {
      var _a2;
      console.error("Failed to send message:", error);
      if ((error == null ? void 0 : error.code) === "42P01") {
        ue.error("Admin messages table not found. Please run the migration.");
      } else if (((_a2 = error == null ? void 0 : error.message) == null ? void 0 : _a2.includes("permission denied")) || (error == null ? void 0 : error.code) === "42501") {
        ue.error("Permission denied. Make sure you are an admin.");
      } else {
        ue.error("Failed to send message: " + ((error == null ? void 0 : error.message) || "Unknown error"));
      }
    }
  });
  const { data: badgeCounts } = useQuery({
    queryKey: ["admin_badge_counts"],
    queryFn: async () => {
      try {
        const [
          { count: reports },
          { count: suggestions },
          { count: posts }
        ] = await Promise.all([
          supabase.from("reports").select("*", { count: "exact", head: true }).eq("status", "pending"),
          supabase.from("user_suggestions").select("*", { count: "exact", head: true }).eq("status", "pending"),
          supabase.from("forum_posts").select("*", { count: "exact", head: true }).eq("is_approved", false)
        ]);
        return { reports: reports || 0, suggestions: suggestions || 0, posts: posts || 0 };
      } catch (err) {
        console.error("Error fetching badge counts:", err);
        return { reports: 0, suggestions: 0, posts: 0 };
      }
    },
    refetchInterval: 3e4
  });
  const resolveRecipientId = async (raw) => {
    const needle = raw.trim();
    if (!needle) return null;
    const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(needle);
    const rows = supabase.from("profiles").select("user_id").limit(1);
    const { data, error } = isUuid ? await rows.or(`user_id.eq.${needle},id.eq.${needle}`).maybeSingle() : await rows.ilike("username", needle).maybeSingle();
    if (error) {
      console.error("Recipient lookup failed:", error);
      return null;
    }
    return (data == null ? void 0 : data.user_id) ?? null;
  };
  const formatDate2 = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-background flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background text-foreground overflow-x-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Background, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Sidebar, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: cn("relative z-10 mx-auto max-w-[1800px] px-4 py-6 pb-24 sm:px-6 md:pb-6", isDesktopApp ? "md:pl-6" : "md:pl-32"), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8 flex flex-wrap items-end justify-between gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => navigate(-1),
              "aria-label": "Go back",
              className: "mt-1.5 rounded-full border border-white/[0.07] bg-white/[0.03] p-2 text-muted-foreground transition-colors hover:border-white/25 hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] font-bold uppercase tracking-[0.28em] text-primary", children: isAdmin ? "Administrator" : "Moderator" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display mt-1.5 text-2xl font-black tracking-tight sm:text-[1.75rem]", children: "Admin Dashboard" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 text-sm text-muted-foreground", children: [
              navSections.length,
              " sections · signed in as",
              " ",
              (profile == null ? void 0 : profile.display_name) || (profile == null ? void 0 : profile.username) || "staff"
            ] })
          ] })
        ] }),
        isAdmin && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => setActiveTab("settings"),
            className: cn(
              "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-bold uppercase tracking-widest transition-colors",
              (maintenanceMode == null ? void 0 : maintenanceMode.is_active) ? "border-orange/30 bg-orange/10 text-orange hover:bg-orange/20" : "border-primary/30 bg-primary/10 text-primary hover:bg-primary/20"
            ),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: cn("h-1.5 w-1.5 rounded-full", (maintenanceMode == null ? void 0 : maintenanceMode.is_active) ? "bg-orange" : "animate-pulse bg-primary") }),
              (maintenanceMode == null ? void 0 : maintenanceMode.is_active) ? "Maintenance mode" : "Site online"
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(StatTile, { icon: Users, tone: "primary", value: (totalUsersCount ?? 0).toLocaleString(), label: "Total users" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(StatTile, { icon: MessageSquare, tone: "secondary", value: (totalCommentsCount ?? (recentComments == null ? void 0 : recentComments.length) ?? 0).toLocaleString(), label: "Comments" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(StatTile, { icon: Ban, tone: "destructive", value: (bannedUsersCount ?? 0).toLocaleString(), label: "Banned users" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          StatTile,
          {
            icon: Inbox,
            tone: "amber",
            value: (((badgeCounts == null ? void 0 : badgeCounts.reports) ?? 0) + ((badgeCounts == null ? void 0 : badgeCounts.suggestions) ?? 0) + ((badgeCounts == null ? void 0 : badgeCounts.posts) ?? 0)).toLocaleString(),
            label: "Awaiting review"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Tabs,
        {
          value: activeTab,
          onValueChange: setActiveTab,
          orientation: "vertical",
          className: "relative flex flex-col gap-8 md:flex-row",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-6 md:hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Sheet, { open: isMenuOpen, onOpenChange: setIsMenuOpen, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SheetTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", className: "h-14 w-full justify-between rounded-2xl border-white/[0.07] bg-white/[0.03] px-5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex min-w-0 items-center gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Menu, { className: "h-5 w-5 shrink-0 text-primary" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate font-bold", children: activeLabel })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-5 w-5 shrink-0 text-muted-foreground" })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                SheetContent,
                {
                  side: "left",
                  className: "w-[320px] border-white/5 bg-background/95 p-0 backdrop-blur-xl",
                  onOpenAutoFocus: (event) => event.preventDefault(),
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SheetHeader, { className: "border-b border-white/5 p-6 text-left", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(SheetTitle, { className: "flex items-center gap-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "h-5 w-5 text-primary" }),
                      "Admin Panel"
                    ] }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-h-[calc(100vh-88px)] overflow-y-auto p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      AdminNav,
                      {
                        groups: navGroups,
                        badgeCounts,
                        onSelect: () => setIsMenuOpen(false)
                      }
                    ) })
                  ]
                }
              )
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden flex-shrink-0 md:block md:w-64 lg:w-72", children: /* @__PURE__ */ jsxRuntimeExports.jsx(GlassPanel, { className: "sticky top-6 max-h-[calc(100vh-3rem)] overflow-y-auto rounded-3xl p-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AdminNav, { groups: navGroups, badgeCounts }) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "analytics", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(AnalyticsActiveUsers, {}),
                /* @__PURE__ */ jsxRuntimeExports.jsx(AnalyticsDashboard, {})
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "reports", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ReportManager, {}) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "suggestions", children: /* @__PURE__ */ jsxRuntimeExports.jsx(PendingSuggestions, {}) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "achievements", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AchievementManager, {}) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "badges", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BadgeManager, {}) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "userstats", children: /* @__PURE__ */ jsxRuntimeExports.jsx(UserStatsPanel, {}) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "streaming", children: /* @__PURE__ */ jsxRuntimeExports.jsx(StreamingAnalyticsPanel, {}) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "performance", children: /* @__PURE__ */ jsxRuntimeExports.jsx(PerformanceInsightsPanel, {}) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "updates", children: /* @__PURE__ */ jsxRuntimeExports.jsx(UpdateManagementPanel, {}) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "crashes", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CrashReportPanel, {}) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "desktop-logs", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LogViewerPanel, {}) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "ban-management", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-10", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(DeviceBanPanel, {}),
                /* @__PURE__ */ jsxRuntimeExports.jsx(IPBanPanel, {}),
                /* @__PURE__ */ jsxRuntimeExports.jsx(BanTemplatesPanel, {})
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "ban-audit", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BanAuditLogPanel, {}) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                UserManagementTab,
                {
                  onMessageUser: setMessagingUserId,
                  onViewActivity: setViewingActivityUserId
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "comments", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassPanel, { className: "p-6", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-xl font-semibold mb-6 flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "w-5 h-5 text-primary" }),
                  "Recent Comments"
                ] }),
                loadingComments ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center py-12 text-muted-foreground", children: "Loading..." }) : recentComments && recentComments.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: recentComments.map((comment) => {
                  var _a2, _b2;
                  return /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-2 flex-wrap", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              Link,
                              {
                                to: `/admin/user/${comment.user_id}`,
                                className: "font-medium hover:text-primary transition-colors",
                                children: ((_a2 = comment.author) == null ? void 0 : _a2.display_name) || ((_b2 = comment.author) == null ? void 0 : _b2.username) || "Unknown"
                              }
                            ),
                            comment.is_spoiler && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-2 py-0.5 rounded-full bg-orange/20 text-orange text-xs", children: "Spoiler" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: formatDate2(comment.created_at) })
                          ] }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(CommentContent, { content: comment.content, clamp: true, className: "mb-2" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(CommentAttachments, { attachments: comment.attachments, className: "mb-2" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(CommentEmbeds, { embeds: comment.embeds, poll: comment.poll }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-2", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: comment.target, className: "hover:text-primary transition-colors", children: comment.title }),
                            comment.hasEpisode && " • Episode"
                          ] })
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          Button,
                          {
                            variant: "ghost",
                            size: "sm",
                            onClick: () => deleteComment.mutate(comment.id),
                            className: "text-destructive hover:text-destructive hover:bg-destructive/10",
                            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-4 h-4" })
                          }
                        )
                      ] })
                    },
                    comment.id
                  );
                }) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-12", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "w-12 h-12 mx-auto text-muted-foreground mb-4" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "No comments yet" })
                ] })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "content", children: /* @__PURE__ */ jsxRuntimeExports.jsx(GlassPanel, { className: "p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ContentModerationManager, {}) }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "news", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(NewsComposer, {}),
                /* @__PURE__ */ jsxRuntimeExports.jsx(NewsManager, {})
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "notifications", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 gap-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassPanel, { className: "p-6", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-display text-xl font-bold mb-6 flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(BellRing, { className: "w-5 h-5 text-primary" }),
                    "Create System Notification"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium mb-1.5 block", children: "Notification Title" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Input,
                        {
                          placeholder: "Maintenance, Update, etc.",
                          value: messageTitle,
                          onChange: (e) => setMessageTitle(e.target.value),
                          className: "bg-muted/30"
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium mb-1.5 block", children: "Message Content" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Textarea,
                        {
                          placeholder: "Write your message here...",
                          value: messageContent,
                          onChange: (e) => setMessageContent(e.target.value),
                          className: "bg-muted/30 min-h-[120px]"
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium mb-1.5 block", children: "Target Type" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "select",
                          {
                            className: "w-full bg-muted/30 border border-input rounded-md px-3 py-2 text-sm",
                            value: notifyTarget,
                            onChange: (e) => setNotifyTarget(e.target.value === "user" ? "user" : "all"),
                            children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "all", children: "Broadcast (All Users)" }),
                              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "user", children: "Specific User" })
                            ]
                          }
                        )
                      ] }),
                      notifyTarget === "user" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium mb-1.5 block", children: "Username or user ID" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          Input,
                          {
                            placeholder: "e.g. snozxyx",
                            value: notifyRecipient,
                            onChange: (e) => setNotifyRecipient(e.target.value),
                            className: "bg-muted/30"
                          }
                        )
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Button,
                      {
                        onClick: async () => {
                          if (notifyTarget === "all") {
                            sendMessage.mutate({
                              title: messageTitle,
                              content: messageContent,
                              recipientId: null
                            });
                            return;
                          }
                          const recipientId = await resolveRecipientId(notifyRecipient);
                          if (!recipientId) {
                            ue.error("No user matches that username or id");
                            return;
                          }
                          sendMessage.mutate({
                            title: messageTitle,
                            content: messageContent,
                            recipientId
                          });
                        },
                        disabled: sendMessage.isPending || !messageTitle || !messageContent || notifyTarget === "user" && !notifyRecipient.trim(),
                        className: "w-full gap-2",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "w-4 h-4" }),
                          sendMessage.isPending ? "Sending..." : notifyTarget === "user" ? "Send to user" : "Send broadcast"
                        ]
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassPanel, { className: "p-6", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-medium mb-4", children: "Sent Notifications History" }),
                  loadingSentMessages ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "animate-pulse space-y-3", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-10 bg-muted/50 rounded-lg" }, i)) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: sentMessages == null ? void 0 : sentMessages.map((msg) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 rounded-lg bg-muted/20 border border-border/30 text-xs", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-start mb-1", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold block", children: msg.title }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground", children: formatDate2(msg.created_at) })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Button,
                        {
                          variant: "ghost",
                          size: "sm",
                          onClick: async () => {
                            if (await confirm({ title: "Delete this notification?", destructive: true })) deleteMessage.mutate(msg.id);
                          },
                          className: "h-7 w-7 p-0 text-destructive hover:text-destructive hover:bg-destructive/10",
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3.5 h-3.5" })
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "line-clamp-2 text-muted-foreground mr-8", children: msg.content })
                  ] }, msg.id)) })
                ] })
              ] }) }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "popups", children: /* @__PURE__ */ jsxRuntimeExports.jsx(GlassPanel, { className: "p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(PopupBuilder, {}) }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "api-admin", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ApiAdminPanel, {}) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "incidents", children: /* @__PURE__ */ jsxRuntimeExports.jsx(GlassPanel, { className: "p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(IncidentManager, {}) }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "changelog", children: /* @__PURE__ */ jsxRuntimeExports.jsx(GlassPanel, { className: "p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChangelogManager, {}) }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "logs", children: /* @__PURE__ */ jsxRuntimeExports.jsx(GlassPanel, { className: "p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AdminLogs, {}) }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "pending", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassPanel, { className: "p-6", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-semibold mb-6", children: "Pending Forum Posts" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(PendingForumPosts, {})
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassPanel, { className: "p-6", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-semibold mb-6", children: "User Suggestions" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(PendingSuggestions, {})
                ] })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "settings", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassPanel, { className: "p-6", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-xl font-semibold mb-6 flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Power, { className: "w-5 h-5 text-primary" }),
                    "Maintenance Mode"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between p-4 rounded-xl bg-muted/30", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: "System Maintenance" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: (maintenanceMode == null ? void 0 : maintenanceMode.is_active) ? "Site is currently in maintenance mode. Users cannot access the platform." : "Site is currently online and accessible to all users." })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Button,
                      {
                        onClick: () => toggleMaintenance.mutate(),
                        disabled: toggleMaintenance.isPending,
                        variant: (maintenanceMode == null ? void 0 : maintenanceMode.is_active) ? "default" : "destructive",
                        className: "gap-2",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Power, { className: "w-4 h-4" }),
                          (maintenanceMode == null ? void 0 : maintenanceMode.is_active) ? "Disable Maintenance" : "Enable Maintenance"
                        ]
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(GlassPanel, { className: "p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AppReleaseManager, {}) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(GlassPanel, { className: "p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(RedirectManager, {}) })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "watchrooms", children: /* @__PURE__ */ jsxRuntimeExports.jsx(GlassPanel, { className: "p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(WatchRoomManager, {}) }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "moderation", children: /* @__PURE__ */ jsxRuntimeExports.jsx(GlassPanel, { className: "p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ModerationLogs, {}) }) })
            ] })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Sheet, { open: !!viewingActivityUserId, onOpenChange: (open) => !open && setViewingActivityUserId(null), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(SheetContent, { side: "right", className: "w-[400px] sm:w-[500px] p-0 border-white/5 bg-background/95 backdrop-blur-xl border-l", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SheetHeader, { className: "p-6 border-b border-white/5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(SheetTitle, { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "w-5 h-5 text-secondary" }),
        "User Activity Log"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-6 overflow-y-auto h-[calc(100vh-80px)]", children: viewingActivityUserId && /* @__PURE__ */ jsxRuntimeExports.jsx(UserActivityLogs, { userId: viewingActivityUserId }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Sheet, { open: !!messagingUserId, onOpenChange: (open) => !open && setMessagingUserId(null), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(SheetContent, { side: "right", className: "w-[400px] sm:w-[500px] p-6 border-white/5 bg-background/95 backdrop-blur-xl border-l", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SheetHeader, { className: "mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(SheetTitle, { className: "flex items-center gap-2 text-primary font-bold", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "w-6 h-6" }),
        "Direct Message"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium text-muted-foreground uppercase tracking-widest text-[10px]", children: "Subject" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              placeholder: "Enter subject...",
              value: messageTitle,
              onChange: (e) => setMessageTitle(e.target.value),
              className: "bg-muted/30 border-white/5 focus:border-primary/50 transition-colors"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium text-muted-foreground uppercase tracking-widest text-[10px]", children: "Message" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              placeholder: "What would you like to say?...",
              value: messageContent,
              onChange: (e) => setMessageContent(e.target.value),
              className: "bg-muted/30 border-white/5 min-h-[300px] focus:border-primary/50 transition-colors"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            onClick: () => {
              sendMessage.mutate({
                title: messageTitle,
                content: messageContent,
                recipientId: messagingUserId
              });
              setMessagingUserId(null);
              setMessageTitle("");
              setMessageContent("");
              ue.success("Message sent successfully.");
            },
            disabled: sendMessage.isPending || !messageTitle || !messageContent,
            className: "w-full gap-2 font-bold py-6 group",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" }),
              sendMessage.isPending ? "Sending..." : "Send Message Now"
            ]
          }
        )
      ] })
    ] }) })
  ] });
}
export {
  AdminPage as default
};
