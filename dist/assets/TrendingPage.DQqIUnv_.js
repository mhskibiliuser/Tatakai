import { j as jsxRuntimeExports, u as useLocation, r as reactExports } from "./react-vendor.CAo4XUiA.js";
import { a as useQuery } from "./tanstack.DPr3OB19.js";
import { D as useIsNativeApp, ap as useContentSafetySettings, bj as filterAdultAnime, Q as Background, S as Sidebar, j as cn, bl as fetchHome, q as fetchAniListDiscover, bm as fetchAniListMediaById } from "./index.C6yfkT5T.js";
import { M as MobileNav } from "./MobileNav.ABHzkhTQ.js";
import { M as MangaTrendingSection } from "./MangaTrendingSection.P7KYeQkm.js";
import { P as PillGroup } from "./PillGroup.CcXbIR07.js";
import { o as animeCardToPosterItem, h as RAIL_LENGTH, P as PosterGridSkeleton, p as PosterCard, e as POSTER_GRID_CLASS } from "./DiscoverPosterGrid.CIdiGIb1.js";
import { S as SectionHeading } from "./SectionHeading.D7LOUoID.js";
import { B as BoardHero } from "./BoardHero.ktRqUaJE.js";
import { u as useTrendingAnime, f as formatViewCount } from "./useViews.BuGVZ9r8.js";
import "./vendor.CJyRs4QS.js";
import { r as registerAnimeIdMappings, c as collectAnimeCandidatesFromHome, b as buildPreferredAnimeRouteId, d as buildExternalAnimeRouteId, t as toPositiveInt, p as parseExternalAnimeId, e as createAnimeIdMappingIndex } from "./useHoverPreview.Cs_Lh1vM.js";
import { bB as Flame, H as Heart, aD as Clock, e as TrendingUp, k as Sparkles } from "./icons.C2gBBarQ.js";
import "./supabase.WuRMX5Dg.js";
import "./radix.BiK9uYXL.js";
import "./motion.DVGLRFCH.js";
import "./hls.BlgtCWcq.js";
import "./editor.Dxw8dtyw.js";
import "./charts.Dr1fgDJ-.js";
import "./mangaPosterItem.BNF10jsL.js";
import "./RankedPosterRail.BR6TE-Dw.js";
function Sparkline({ series, width = 80, height = 28, stroke = "currentColor" }) {
  if (!series || series.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { width, height, viewBox: `0 0 ${width} ${height}`, className: "opacity-40 text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "0", y: "0", width, height, rx: "4", fill: "currentColor", opacity: "0.03" }) });
  }
  const values = series.map((s) => s.count);
  const max = Math.max(...values);
  const min = Math.min(...values);
  const range = max - min || 1;
  const stepX = width / Math.max(1, series.length - 1);
  const points = series.map((s, i) => {
    const x = i * stepX;
    const y = height - (s.count - min) / range * height;
    return `${x},${y}`;
  }).join(" ");
  return /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { width, height, viewBox: `0 0 ${width} ${height}`, xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    "polyline",
    {
      points,
      fill: "none",
      stroke,
      strokeWidth: 1.5,
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }
  ) });
}
function useScrollRestoration(key, options = {}) {
  const { useWindow = false, delay = 50 } = options;
  const location = useLocation();
  const scrollRef = reactExports.useRef(null);
  const storageKey = `tatakai_scroll_${key}_${location.pathname}`;
  reactExports.useEffect(() => {
    const saved = sessionStorage.getItem(storageKey);
    if (!saved) return;
    const pos = Number(saved);
    if (isNaN(pos) || pos <= 0) return;
    const t = setTimeout(() => {
      if (useWindow) {
        window.scrollTo({ top: pos, behavior: "instant" });
      } else if (scrollRef.current) {
        scrollRef.current.scrollTop = pos;
      }
    }, delay);
    return () => clearTimeout(t);
  }, []);
  reactExports.useEffect(() => {
    const el = scrollRef.current;
    const save = () => {
      const pos = useWindow ? window.scrollY : (el == null ? void 0 : el.scrollTop) ?? 0;
      if (pos > 0) {
        sessionStorage.setItem(storageKey, String(pos));
      }
    };
    window.addEventListener("beforeunload", save);
    return () => {
      save();
      window.removeEventListener("beforeunload", save);
    };
  }, [storageKey, useWindow]);
  return scrollRef;
}
const TIME_FRAMES = [
  {
    id: "today",
    label: "Today",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-3.5 w-3.5" }),
    eyebrow: "Right now",
    heading: "Trending today",
    description: "What the community started watching in the last 24 hours. It moves fast, so this order rarely survives the day.",
    viewsLabel: "views today"
  },
  {
    id: "week",
    label: "This week",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "h-3.5 w-3.5" }),
    eyebrow: "This week",
    heading: "Popular this week",
    description: "Tatakai's most watched titles over the last seven days, ranked gold, silver and bronze.",
    viewsLabel: "views this week"
  },
  {
    id: "month",
    label: "This month",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Flame, { className: "h-3.5 w-3.5" }),
    eyebrow: "This month",
    heading: "The month's heat",
    description: "Thirty days of watch activity, so a strong finale still shows up long after its own week has passed.",
    viewsLabel: "views this month"
  },
  {
    id: "all",
    label: "All time",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-3.5 w-3.5" }),
    eyebrow: "All time",
    heading: "Most watched ever",
    description: "Every view ever recorded here, with no time window at all. Slow to move, and the closest thing to a canon.",
    viewsLabel: "total views"
  }
];
const normalizeAnimeName = (value) => String(value || "").toLowerCase().replace(/[\W_]+/g, " ").replace(/\s+/g, " ").trim();
function viewsForFrame(row, frame) {
  if (frame === "today") return row.views_today ?? row.views_week ?? row.total_views;
  if (frame === "week") return row.views_week ?? row.total_views;
  return row.total_views ?? row.views_week;
}
function trendingToCard(trending, routeIdOverride) {
  const malId = toPositiveInt(
    (trending == null ? void 0 : trending.malId) ?? (trending == null ? void 0 : trending.malID) ?? (trending == null ? void 0 : trending.mal_id)
  );
  const anilistId = toPositiveInt(
    (trending == null ? void 0 : trending.anilistId) ?? (trending == null ? void 0 : trending.anilistID) ?? (trending == null ? void 0 : trending.anilist_id)
  );
  return {
    id: routeIdOverride || trending.id,
    name: trending.name,
    poster: trending.poster,
    type: "TV",
    episodes: { sub: 0, dub: 0 },
    rating: void 0,
    malId: malId || void 0,
    anilistId: anilistId || void 0
  };
}
function TrendingPage() {
  var _a;
  const [timeFrame, setTimeFrame] = reactExports.useState("week");
  const [showExtendedDiscover, setShowExtendedDiscover] = reactExports.useState(false);
  const isNative = useIsNativeApp();
  useScrollRestoration("trending", { useWindow: true });
  const frame = TIME_FRAMES.find((entry) => entry.id === timeFrame) ?? TIME_FRAMES[1];
  const { data: internalTrending, isLoading: loadingInternal } = useTrendingAnime(50, timeFrame);
  const { settings: contentSafetySettings } = useContentSafetySettings();
  const showAdult = contentSafetySettings.showAdultEverywhere;
  const { data: homepageData, isLoading: loadingHomepage } = useQuery({
    queryKey: ["home"],
    queryFn: fetchHome,
    staleTime: 5 * 60 * 1e3,
    gcTime: 30 * 60 * 1e3,
    retry: false
  });
  const { data: aniListTrending = [], isLoading: loadingAniListTrending } = useQuery({
    queryKey: ["anilist-trending-page"],
    queryFn: () => fetchAniListDiscover({ perPage: 18, sort: "TRENDING_DESC" }),
    enabled: showExtendedDiscover,
    staleTime: 10 * 60 * 1e3,
    gcTime: 30 * 60 * 1e3
  });
  const { data: aniListFavorites = [], isLoading: loadingAniListFavorites } = useQuery({
    queryKey: ["anilist-favorites-page"],
    queryFn: () => fetchAniListDiscover({ perPage: 18, sort: "FAVOURITES_DESC" }),
    enabled: showExtendedDiscover,
    staleTime: 10 * 60 * 1e3,
    gcTime: 30 * 60 * 1e3
  });
  reactExports.useEffect(() => {
    if (loadingInternal || loadingHomepage) {
      setShowExtendedDiscover(false);
      return;
    }
    const timer = window.setTimeout(() => setShowExtendedDiscover(true), 350);
    return () => window.clearTimeout(timer);
  }, [loadingInternal, loadingHomepage, timeFrame]);
  const isLoading = loadingInternal || loadingHomepage;
  const internalRows = reactExports.useMemo(
    () => filterAdultAnime(internalTrending ?? [], showAdult, (r) => ({ name: r.anime_name })),
    [internalTrending, showAdult]
  );
  const apiTrending = reactExports.useMemo(
    () => filterAdultAnime((homepageData == null ? void 0 : homepageData.trendingAnimes) ?? [], showAdult),
    [homepageData, showAdult]
  );
  const hasInternalData = internalRows.length > 0;
  const homeIdMappingIndex = reactExports.useMemo(() => {
    const index = createAnimeIdMappingIndex();
    registerAnimeIdMappings(index, collectAnimeCandidatesFromHome(homepageData));
    return index;
  }, [homepageData]);
  const apiTrendingById = reactExports.useMemo(() => {
    const map = /* @__PURE__ */ new Map();
    apiTrending.forEach((item) => {
      const routeKeys = /* @__PURE__ */ new Set();
      const preferredId = buildPreferredAnimeRouteId(item, homeIdMappingIndex);
      const fallbackExternalId = buildExternalAnimeRouteId(
        (item == null ? void 0 : item.malId) ?? (item == null ? void 0 : item.malID) ?? (item == null ? void 0 : item.mal_id),
        (item == null ? void 0 : item.anilistId) ?? (item == null ? void 0 : item.anilistID) ?? (item == null ? void 0 : item.anilist_id)
      );
      if (preferredId) routeKeys.add(preferredId);
      if (typeof (item == null ? void 0 : item.id) === "string" && item.id.trim()) routeKeys.add(item.id.trim());
      if (fallbackExternalId) routeKeys.add(fallbackExternalId);
      for (const key of routeKeys) {
        map.set(key, item);
      }
    });
    return map;
  }, [apiTrending, homeIdMappingIndex]);
  const apiTrendingByName = reactExports.useMemo(() => {
    const map = /* @__PURE__ */ new Map();
    apiTrending.forEach((item) => {
      const key = normalizeAnimeName(item == null ? void 0 : item.name);
      if (key) map.set(key, item);
    });
    return map;
  }, [apiTrending]);
  const resolveInternalTrendingCard = reactExports.useCallback(
    (entry) => {
      const rawEntryId = String((entry == null ? void 0 : entry.anime_id) || "").trim();
      const safeRawEntryId = /^(mal|anilist)[:-]/i.test(rawEntryId) ? "" : rawEntryId;
      const preferredRouteId = buildPreferredAnimeRouteId(
        {
          id: entry == null ? void 0 : entry.anime_id,
          name: entry == null ? void 0 : entry.anime_name,
          malId: entry == null ? void 0 : entry.malId,
          malID: entry == null ? void 0 : entry.malID,
          anilistId: entry == null ? void 0 : entry.anilistId,
          anilistID: entry == null ? void 0 : entry.anilistID
        },
        homeIdMappingIndex
      );
      const directResolved = preferredRouteId && apiTrendingById.get(preferredRouteId) || apiTrendingById.get(rawEntryId) || apiTrendingByName.get(normalizeAnimeName(entry == null ? void 0 : entry.anime_name));
      if (directResolved) {
        const resolvedRouteId = buildPreferredAnimeRouteId(directResolved, homeIdMappingIndex) || directResolved.id;
        return trendingToCard(directResolved, resolvedRouteId);
      }
      return {
        id: preferredRouteId || safeRawEntryId || "",
        name: (entry == null ? void 0 : entry.anime_name) || safeRawEntryId || "Unknown Anime",
        poster: (entry == null ? void 0 : entry.poster) || "",
        type: "TV",
        episodes: { sub: 0, dub: 0 },
        rating: void 0
      };
    },
    [homeIdMappingIndex, apiTrendingById, apiTrendingByName]
  );
  const aniListToCard = reactExports.useCallback(
    (media) => {
      var _a2, _b, _c, _d, _e;
      const title = ((_a2 = media == null ? void 0 : media.title) == null ? void 0 : _a2.english) || ((_b = media == null ? void 0 : media.title) == null ? void 0 : _b.romaji) || ((_c = media == null ? void 0 : media.title) == null ? void 0 : _c.native) || `AniList #${media.id}`;
      const malId = toPositiveInt(media == null ? void 0 : media.idMal);
      const anilistId = toPositiveInt(media == null ? void 0 : media.id);
      const fallbackExternalId = buildExternalAnimeRouteId(malId, anilistId);
      const routeId = buildPreferredAnimeRouteId({ id: fallbackExternalId || void 0, name: title, malId, anilistId }, homeIdMappingIndex) || fallbackExternalId || String(media.id);
      return {
        id: routeId,
        name: title,
        poster: ((_d = media == null ? void 0 : media.coverImage) == null ? void 0 : _d.large) || ((_e = media == null ? void 0 : media.coverImage) == null ? void 0 : _e.medium) || "",
        type: (media == null ? void 0 : media.format) || "TV",
        episodes: { sub: Number((media == null ? void 0 : media.episodes) || 0), dub: 0 },
        rating: (media == null ? void 0 : media.averageScore) ? (media.averageScore / 10).toFixed(1) : void 0,
        malId: malId || void 0,
        anilistId: anilistId || void 0
      };
    },
    [homeIdMappingIndex]
  );
  const board = reactExports.useMemo(() => {
    if (hasInternalData) {
      return internalRows.map((row, index) => ({
        item: animeCardToPosterItem(resolveInternalTrendingCard(row), index),
        rank: index + 1,
        views: viewsForFrame(row, timeFrame),
        sparkline: row.sparkline
      }));
    }
    return apiTrending.map((row, index) => ({
      item: animeCardToPosterItem(
        trendingToCard(row, buildPreferredAnimeRouteId(row, homeIdMappingIndex) || row.id),
        index
      ),
      rank: index + 1
    }));
  }, [hasInternalData, internalRows, apiTrending, resolveInternalTrendingCard, homeIdMappingIndex, timeFrame]);
  const podium = board.slice(0, RAIL_LENGTH);
  const rest = board.slice(RAIL_LENGTH);
  const leaderCard = reactExports.useMemo(() => {
    if (hasInternalData) return resolveInternalTrendingCard(internalRows[0]);
    if (!apiTrending[0]) return null;
    return trendingToCard(
      apiTrending[0],
      buildPreferredAnimeRouteId(apiTrending[0], homeIdMappingIndex) || apiTrending[0].id
    );
  }, [hasInternalData, internalRows, apiTrending, resolveInternalTrendingCard, homeIdMappingIndex]);
  const heroExternalIds = reactExports.useMemo(() => {
    if (!leaderCard) return { anilistId: null, malId: null };
    let anilistId = toPositiveInt(leaderCard.anilistId) || null;
    let malId = toPositiveInt(leaderCard.malId) || null;
    if (!anilistId && !malId && leaderCard.id) {
      const parsed = parseExternalAnimeId(leaderCard.id);
      if ((parsed == null ? void 0 : parsed.provider) === "anilist") anilistId = parsed.id;
      if ((parsed == null ? void 0 : parsed.provider) === "mal") malId = parsed.id;
    }
    return { anilistId, malId };
  }, [leaderCard]);
  const { data: heroAniListMedia } = useQuery({
    queryKey: ["anilist-trending-hero-banner", heroExternalIds.anilistId, heroExternalIds.malId],
    queryFn: () => fetchAniListMediaById({
      anilistId: heroExternalIds.anilistId,
      malId: heroExternalIds.malId
    }),
    enabled: Boolean(leaderCard && (heroExternalIds.anilistId || heroExternalIds.malId)),
    staleTime: 10 * 60 * 1e3
  });
  const stats = reactExports.useMemo(() => {
    var _a2;
    const chips = [];
    const leaderViews = (_a2 = board[0]) == null ? void 0 : _a2.views;
    if (leaderViews) chips.push(`${formatViewCount(leaderViews)} ${frame.viewsLabel}`);
    if (board.length) chips.push(`${board.length} titles ranked`);
    return chips;
  }, [board, frame.viewsLabel]);
  const globalPulse = reactExports.useMemo(
    () => filterAdultAnime(aniListTrending, showAdult).slice(0, 12).map((media, index) => ({
      item: animeCardToPosterItem(aniListToCard(media), index),
      metric: `Trending score ${media.trending ?? media.popularity ?? "—"}`
    })),
    [aniListTrending, aniListToCard, showAdult]
  );
  const fanFavorites = reactExports.useMemo(
    () => filterAdultAnime(aniListFavorites, showAdult).slice(0, 12).map((media, index) => {
      var _a2;
      return {
        item: animeCardToPosterItem(aniListToCard(media), index),
        metric: `${((_a2 = media.favourites) == null ? void 0 : _a2.toLocaleString()) ?? "—"} favorites`
      };
    }),
    [aniListFavorites, aniListToCard, showAdult]
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen overflow-x-hidden bg-background text-foreground", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Background, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Sidebar, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "main",
      {
        className: cn(
          "relative z-10 mx-auto max-w-[1800px] py-4 pb-24 pr-4 md:py-6 md:pb-6 md:pr-6",
          isNative ? "pl-4" : "pl-4 md:pl-32"
        ),
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            BoardHero,
            {
              className: "mt-2",
              eyebrow: frame.eyebrow,
              heading: frame.heading,
              description: frame.description,
              leader: (_a = podium[0]) == null ? void 0 : _a.item,
              stats,
              backdrop: (heroAniListMedia == null ? void 0 : heroAniListMedia.bannerImage) || void 0,
              items: podium.map((entry) => entry.item),
              isLoading,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                PillGroup,
                {
                  options: TIME_FRAMES,
                  value: timeFrame,
                  onChange: (id) => setTimeFrame(id),
                  label: "Timeframe"
                }
              )
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mt-12", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              SectionHeading,
              {
                eyebrow: "The full board",
                title: hasInternalData ? "Ranked by watch time" : "Ranked by popularity",
                meta: rest.length > 0 ? `Ranks ${rest[0].rank}–${rest[rest.length - 1].rank}` : void 0
              }
            ),
            isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(PosterGridSkeleton, { className: "mt-6", count: 14 }) : board.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex flex-col items-center gap-2 rounded-3xl border border-white/[0.07] bg-white/[0.02] py-20 text-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Flame, { className: "h-7 w-7 text-white/25" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-base font-bold text-white/70", children: "Nothing is trending yet" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "max-w-sm text-sm text-white/40", children: "This window has no recorded views. Try a longer timeframe." })
            ] }) : rest.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-6 text-sm text-white/40", children: "The whole board fits on the podium above." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn(POSTER_GRID_CLASS, "mt-6"), children: rest.map((entry) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              PosterCard,
              {
                item: entry.item,
                rank: entry.rank,
                preview: true,
                footer: entry.views !== void 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(PulseFooter, { views: entry.views, series: entry.sparkline }) : void 0
              },
              entry.item.key
            )) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mt-14", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              SectionHeading,
              {
                eyebrow: "Beyond Tatakai",
                title: "Global trending pulse",
                meta: "From AniList"
              }
            ),
            !showExtendedDiscover || loadingAniListTrending ? /* @__PURE__ */ jsxRuntimeExports.jsx(PosterGridSkeleton, { className: "mt-6", count: 12 }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn(POSTER_GRID_CLASS, "mt-6"), children: globalPulse.map((entry) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              PosterCard,
              {
                item: entry.item,
                preview: true,
                footer: /* @__PURE__ */ jsxRuntimeExports.jsx(MetricFooter, { label: entry.metric })
              },
              entry.item.key
            )) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mt-14", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              SectionHeading,
              {
                eyebrow: "Most loved",
                title: "Fan favorites",
                action: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5 text-xs font-medium text-white/40", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: "h-3.5 w-3.5 text-destructive/80" }),
                  "All-time AniList favorites"
                ] })
              }
            ),
            !showExtendedDiscover || loadingAniListFavorites ? /* @__PURE__ */ jsxRuntimeExports.jsx(PosterGridSkeleton, { className: "mt-6", count: 12 }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn(POSTER_GRID_CLASS, "mt-6"), children: fanFavorites.map((entry) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              PosterCard,
              {
                item: entry.item,
                preview: true,
                footer: /* @__PURE__ */ jsxRuntimeExports.jsx(MetricFooter, { label: entry.metric })
              },
              entry.item.key
            )) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-14", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            MangaTrendingSection,
            {
              title: "Trending manga & manhwa",
              defaultTab: "manga",
              showTabs: true,
              limit: 18
            }
          ) })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(MobileNav, {})
  ] });
}
function PulseFooter({
  views,
  series
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 hidden md:block", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-bold uppercase tracking-widest text-white/35", children: "Pulse" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-bold tabular-nums text-primary", children: formatViewCount(views) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 text-primary/70 opacity-60 transition-opacity group-hover:opacity-100", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkline, { series, width: 140, height: 26 }) })
  ] });
}
function MetricFooter({ label }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1.5 text-[11px] font-bold uppercase tracking-widest text-white/35", children: label });
}
export {
  TrendingPage as default
};
