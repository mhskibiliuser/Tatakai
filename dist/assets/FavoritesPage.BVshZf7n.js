import { r as reactExports, j as jsxRuntimeExports, L as Link, e as useNavigate } from "./react-vendor.CAo4XUiA.js";
import { a as useQuery } from "./tanstack.DPr3OB19.js";
import { j as cn, bn as getTrendingManga, bw as getMangaByGenre, F as useWatchHistory, E as useWatchlist, u as useAuth, D as useIsNativeApp, J as useConfirm, fC as useBulkRemoveFromWatchlist, aI as useAddToWatchlist, Q as Background, S as Sidebar, Y as DropdownMenu, Z as DropdownMenuTrigger, _ as DropdownMenuContent, $ as DropdownMenuItem, q as fetchAniListDiscover, bm as fetchAniListMediaById } from "./index.C6yfkT5T.js";
import { M as MobileNav } from "./MobileNav.ABHzkhTQ.js";
import { B as BoardHero } from "./BoardHero.ktRqUaJE.js";
import { P as PillGroup } from "./PillGroup.CcXbIR07.js";
import { P as PosterGridSkeleton, p as PosterCard, e as POSTER_GRID_CLASS, h as RAIL_LENGTH, o as animeCardToPosterItem, c as controlTriggerClass, a as controlMenuClass, b as controlItemClass } from "./DiscoverPosterGrid.CIdiGIb1.js";
import { S as SectionHeading } from "./SectionHeading.D7LOUoID.js";
import { m as mangaCardToPosterItem } from "./mangaPosterItem.BNF10jsL.js";
import { bB as Flame, b as ChevronRight, H as Heart, N as ChevronDown, c as Check, J as Trash2, bM as Brain, k as Sparkles, B as BookOpen, e as TrendingUp, C as CircleCheck, aD as Clock, cu as Pause, X, P as Plus } from "./icons.C2gBBarQ.js";
import { a as usePersonalizedRecommendations, u as useGenrePreferences } from "./useRecommendations.BpYZIJJy.js";
import { u as useRecommendationEngine } from "./useRecommendationEngine.C_OWm328.js";
import { p as parseExternalAnimeId, t as toPositiveInt, d as buildExternalAnimeRouteId } from "./useHoverPreview.Cs_Lh1vM.js";
import "./vendor.CJyRs4QS.js";
import "./supabase.WuRMX5Dg.js";
import "./radix.BiK9uYXL.js";
import "./motion.DVGLRFCH.js";
import "./hls.BlgtCWcq.js";
import "./editor.Dxw8dtyw.js";
import "./charts.Dr1fgDJ-.js";
import "./RankedPosterRail.BR6TE-Dw.js";
import "./tasteProfile.DMW7D2B1.js";
const TRENDING = "__trending__";
const STALE_TIME = 10 * 60 * 1e3;
function MangaPicksSection({
  genres = [],
  maxGenres = 4,
  limit = 12,
  className
}) {
  var _a, _b;
  const options = reactExports.useMemo(() => {
    const top = genres.filter(Boolean).slice(0, maxGenres);
    return [
      { id: TRENDING, label: "Trending", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Flame, { className: "h-3.5 w-3.5" }) },
      ...top.map((genre) => ({ id: genre, label: genre }))
    ];
  }, [genres, maxGenres]);
  const [chosen, setChosen] = reactExports.useState(null);
  const active = chosen && options.some((option) => option.id === chosen) ? chosen : ((_a = options[1]) == null ? void 0 : _a.id) ?? TRENDING;
  const picks = useQuery({
    queryKey: ["manga-picks", active, limit],
    queryFn: () => active === TRENDING ? getTrendingManga(limit) : getMangaByGenre(active, limit),
    staleTime: STALE_TIME,
    gcTime: 30 * 60 * 1e3
  });
  const emptyGenre = active !== TRENDING && !picks.isLoading && (((_b = picks.data) == null ? void 0 : _b.length) ?? 0) === 0;
  const fallback = useQuery({
    queryKey: ["manga-picks", TRENDING, limit],
    queryFn: () => getTrendingManga(limit),
    enabled: emptyGenre,
    staleTime: STALE_TIME,
    gcTime: 30 * 60 * 1e3
  });
  const isLoading = picks.isLoading || emptyGenre && fallback.isLoading;
  const items = reactExports.useMemo(() => {
    const rows = emptyGenre ? fallback.data ?? [] : picks.data ?? [];
    return rows.slice(0, limit).map((manga, index) => mangaCardToPosterItem(manga, index));
  }, [emptyGenre, fallback.data, picks.data, limit]);
  const description = emptyGenre ? `Nothing tagged ${active} — here is what is trending instead` : active === TRENDING ? "The manga and manhwa charts right now" : `Popular ${active.toLowerCase()} manga and manhwa`;
  if (!isLoading && items.length === 0) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: cn(className), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      SectionHeading,
      {
        eyebrow: "Read next",
        title: "Manga & manhwa for you",
        action: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Link,
          {
            to: "/manga",
            className: "group inline-flex items-center gap-1 text-xs font-bold uppercase tracking-widest text-white/45 transition-colors hover:text-white",
            children: [
              "View all",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" })
            ]
          }
        )
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex flex-wrap items-center gap-x-4 gap-y-3", children: [
      options.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(
        PillGroup,
        {
          options,
          value: active,
          onChange: (id) => setChosen(id),
          label: "Manga genre"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-white/40", children: description })
    ] }),
    isLoading && items.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(PosterGridSkeleton, { className: "mt-6", count: Math.min(limit, 12) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn(POSTER_GRID_CLASS, "mt-6"), children: items.map((item, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(PosterCard, { item, eager: index < 7 }, item.key)) })
  ] });
}
function metaToAnimeCard(meta) {
  return {
    id: meta.id,
    name: meta.title,
    poster: meta.poster ?? "",
    type: meta.format ?? void 0,
    rating: meta.averageScore != null ? (meta.averageScore / 10).toFixed(1) : void 0,
    episodes: { sub: 0, dub: 0 },
    anilistId: meta.anilistId ?? void 0,
    malId: meta.malId ?? void 0
  };
}
function useTasteProfile() {
  const { profile, isLoading } = useRecommendationEngine();
  const data = reactExports.useMemo(() => {
    if (!profile) return null;
    return {
      diversityScore: profile.diversityScore,
      preferredGenres: profile.topGenres,
      preferredRatings: profile.ratingRange,
      preferredTypes: Object.entries(profile.formats).sort((a, b) => b[1] - a[1]).slice(0, 3).map(([type, weight]) => ({ type, weight }))
    };
  }, [profile]);
  return { data, isLoading };
}
function useMLRecommendations(limit = 20) {
  const { recommendations, isLoading } = useRecommendationEngine({ limit });
  const data = reactExports.useMemo(
    () => recommendations.map((r) => ({
      anime: metaToAnimeCard(r.anime),
      score: r.score,
      confidence: r.confidence,
      reasons: r.reasons,
      factors: r.factors
    })),
    [recommendations]
  );
  return { data, isLoading };
}
const DAY_MS = 24 * 60 * 60 * 1e3;
function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}
function useSmartFavorites(limit = 10) {
  const { data: history = [], isLoading: historyLoading } = useWatchHistory(400);
  const { data: watchlist = [], isLoading: watchlistLoading } = useWatchlist();
  const smartFavorites = reactExports.useMemo(() => {
    if (!history.length) return [];
    const watchlistIds = new Set(watchlist.map((item) => item.anime_id));
    const animeStats = /* @__PURE__ */ new Map();
    history.forEach((item) => {
      if (watchlistIds.has(item.anime_id)) return;
      const existing = animeStats.get(item.anime_id) || {
        name: item.anime_name,
        poster: item.anime_poster,
        episodes: /* @__PURE__ */ new Set(),
        completed: false,
        lastWatched: item.watched_at,
        firstWatched: item.watched_at,
        views: 0,
        completionHits: 0,
        totalProgress: 0,
        totalDuration: 0,
        rewatchHits: 0
      };
      existing.views += 1;
      if (existing.episodes.has(item.episode_number)) {
        existing.rewatchHits += 1;
      }
      existing.episodes.add(item.episode_number);
      if (item.completed) existing.completed = true;
      if (item.completed) existing.completionHits += 1;
      existing.totalProgress += item.progress_seconds || 0;
      existing.totalDuration += item.duration_seconds || 0;
      if (new Date(item.watched_at).getTime() > new Date(existing.lastWatched).getTime()) {
        existing.lastWatched = item.watched_at;
      }
      if (new Date(item.watched_at).getTime() < new Date(existing.firstWatched).getTime()) {
        existing.firstWatched = item.watched_at;
      }
      animeStats.set(item.anime_id, existing);
    });
    const suggestions = [];
    animeStats.forEach((stats, id) => {
      const daysSinceLastWatch = (Date.now() - new Date(stats.lastWatched).getTime()) / DAY_MS;
      const recencyFactor = Math.exp(-daysSinceLastWatch / 28);
      const totalDuration = Math.max(1, stats.totalDuration);
      const engagementRatio = clamp(stats.totalProgress / totalDuration, 0, 2);
      const completionRatio = clamp(stats.completionHits / Math.max(1, stats.views), 0, 1);
      const breadthScore = clamp(stats.episodes.size / 12, 0, 1);
      const consistencyScore = clamp(stats.views / 8, 0, 1);
      const rewatchAffinity = clamp(stats.rewatchHits / Math.max(1, stats.views), 0, 1);
      const scoreFloat = breadthScore * 26 + consistencyScore * 18 + completionRatio * 22 + recencyFactor * 22 + engagementRatio * 8 + rewatchAffinity * 4;
      const score = Math.round(scoreFloat);
      const reasonParts = [];
      if (completionRatio > 0.5 || stats.completed) reasonParts.push("strong completion pattern");
      if (breadthScore > 0.55) reasonParts.push(`wide episode coverage (${stats.episodes.size} eps)`);
      if (consistencyScore > 0.5) reasonParts.push("repeat engagement");
      if (recencyFactor > 0.55) reasonParts.push("recently active");
      const reason = reasonParts.length > 0 ? reasonParts.slice(0, 2).join(" + ") : `emerging favorite (${stats.episodes.size} eps)`;
      suggestions.push({
        animeId: id,
        animeName: stats.name,
        animePoster: stats.poster,
        score,
        reason
      });
    });
    return suggestions.sort((a, b) => b.score - a.score).slice(0, limit);
  }, [history, watchlist, limit]);
  return {
    data: smartFavorites,
    isLoading: historyLoading || watchlistLoading
  };
}
const TABS = [
  { id: "for-you", label: "For you", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-3.5 w-3.5" }) },
  { id: "ai-recs", label: "AI picks", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Brain, { className: "h-3.5 w-3.5" }) },
  { id: "all", label: "All saved", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-3.5 w-3.5" }) },
  { id: "watching", label: "Watching", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "h-3.5 w-3.5" }) },
  { id: "completed", label: "Completed", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-3.5 w-3.5" }) },
  { id: "plan", label: "Planned", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-3.5 w-3.5" }) },
  { id: "on-hold", label: "On hold", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Pause, { className: "h-3.5 w-3.5" }) },
  { id: "dropped", label: "Dropped", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-3.5 w-3.5" }) }
];
const STATUS_MAP = {
  "for-you": null,
  "ai-recs": null,
  all: null,
  watching: "watching",
  completed: "completed",
  plan: "plan_to_watch",
  "on-hold": "on_hold",
  dropped: "dropped"
};
const STATUS_LABEL = {
  watching: "Watching",
  completed: "Completed",
  plan_to_watch: "Planned",
  on_hold: "On hold",
  dropped: "Dropped"
};
const SORTS = [
  { id: "recent", label: "Recently added" },
  { id: "alpha", label: "A–Z" }
];
const TAB_COPY = {
  "for-you": { eyebrow: "Picked for you", title: "Because of what you watch" },
  "ai-recs": { eyebrow: "Taste model", title: "Ranked by match" },
  all: { eyebrow: "Your collection", title: "Everything saved" },
  watching: { eyebrow: "In progress", title: "Currently watching" },
  completed: { eyebrow: "Finished", title: "Completed" },
  plan: { eyebrow: "Queued", title: "Planned to watch" },
  "on-hold": { eyebrow: "Paused", title: "On hold" },
  dropped: { eyebrow: "Set aside", title: "Dropped" }
};
const EMPTY_COPY = {
  "for-you": {
    title: "No recommendations yet",
    hint: "Watch a few episodes and this fills in with titles like the ones you finish."
  },
  "ai-recs": {
    title: "The taste model needs more history",
    hint: "Complete a couple of series and the match scores start to mean something."
  },
  all: { title: "Nothing saved yet", hint: "Add a title from its page and it lands here." },
  watching: {
    title: "Nothing in progress",
    hint: "Titles you are part-way through show up here."
  },
  completed: { title: "Nothing finished yet", hint: "Mark a title completed and it moves here." },
  plan: { title: "Your queue is empty", hint: "Save anything you want to get to later." },
  "on-hold": {
    title: "Nothing on hold",
    hint: "Paused a series? Park it here so it stays out of your active list."
  },
  dropped: { title: "Nothing dropped", hint: "Titles you set aside show up here." }
};
function previewAniListId(animeId) {
  const parsed = parseExternalAnimeId(String(animeId || "").trim());
  return (parsed == null ? void 0 : parsed.provider) === "anilist" ? parsed.id : void 0;
}
function watchlistToPosterItem(entry, index) {
  return {
    key: `${entry.id || entry.anime_id}-${index}`,
    href: entry.anime_id ? `/anime/${entry.anime_id}` : `/search?q=${encodeURIComponent(entry.anime_name)}`,
    title: entry.anime_name,
    poster: entry.anime_poster || "",
    anilistId: toPositiveInt(entry == null ? void 0 : entry.anilist_id) || previewAniListId(entry.anime_id),
    meta: STATUS_LABEL[entry.status] ?? void 0
  };
}
function suggestionToPosterItem(suggestion, index) {
  return {
    key: `${suggestion.animeId}-${index}`,
    href: suggestion.animeId ? `/anime/${suggestion.animeId}` : `/search?q=${encodeURIComponent(suggestion.animeName)}`,
    title: suggestion.animeName,
    poster: suggestion.animePoster || "",
    anilistId: previewAniListId(suggestion.animeId)
  };
}
function FavoritesPage() {
  var _a, _b, _c, _d;
  const { user } = useAuth();
  const navigate = useNavigate();
  const isNative = useIsNativeApp();
  const [activeTab, setActiveTab] = reactExports.useState("for-you");
  const [sortBy, setSortBy] = reactExports.useState("recent");
  const [selectMode, setSelectMode] = reactExports.useState(false);
  const [selectedIds, setSelectedIds] = reactExports.useState([]);
  const confirm = useConfirm();
  const { data: recommendations, isLoading: loadingRecs } = usePersonalizedRecommendations(24);
  const { data: mlRecommendations, isLoading: loadingML } = useMLRecommendations(30);
  const { data: tasteProfile, isLoading: loadingProfile } = useTasteProfile();
  const { data: genrePrefs } = useGenrePreferences();
  const { data: watchlist, isLoading: loadingWatchlist } = useWatchlist();
  const { data: smartFavorites } = useSmartFavorites(6);
  const { data: aniListFavorites = [], isLoading: loadingAniListFavorites } = useQuery({
    queryKey: ["anilist-favorites-favorites-page"],
    queryFn: () => fetchAniListDiscover({ perPage: 18, sort: "FAVOURITES_DESC" }),
    staleTime: 10 * 60 * 1e3
  });
  const bulkRemove = useBulkRemoveFromWatchlist();
  const addToWatchlist = useAddToWatchlist();
  const showRecommendations = activeTab === "for-you";
  const showMLRecs = activeTab === "ai-recs";
  const isListTab = !showRecommendations && !showMLRecs;
  const isLoading = showRecommendations ? loadingRecs : showMLRecs ? loadingML || loadingProfile : loadingWatchlist;
  const rows = reactExports.useMemo(() => watchlist ?? [], [watchlist]);
  const savedIds = reactExports.useMemo(() => new Set(rows.map((row) => row.anime_id)), [rows]);
  const counts = reactExports.useMemo(() => {
    const tally = { total: rows.length, watching: 0, completed: 0 };
    for (const row of rows) {
      if (row.status === "watching") tally.watching += 1;
      if (row.status === "completed") tally.completed += 1;
    }
    return tally;
  }, [rows]);
  const filteredWatchlist = reactExports.useMemo(() => {
    const status = STATUS_MAP[activeTab];
    const list = status ? rows.filter((row) => row.status === status) : [...rows];
    if (sortBy === "alpha") {
      list.sort((a, b) => a.anime_name.localeCompare(b.anime_name));
    } else {
      list.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    }
    return list;
  }, [rows, activeTab, sortBy]);
  const heroRow = reactExports.useMemo(() => {
    if (rows.length === 0) return null;
    return rows.find((row) => row.status === "watching") ?? rows[0];
  }, [rows]);
  const heroExternalIds = reactExports.useMemo(() => {
    if (!heroRow) return { anilistId: null, malId: null };
    const parsed = parseExternalAnimeId(String(heroRow.anime_id || "").trim());
    let anilistId = toPositiveInt(heroRow == null ? void 0 : heroRow.anilist_id) || null;
    let malId = toPositiveInt(heroRow == null ? void 0 : heroRow.mal_id) || null;
    if ((parsed == null ? void 0 : parsed.provider) === "anilist") anilistId = parsed.id;
    if ((parsed == null ? void 0 : parsed.provider) === "mal") malId = parsed.id;
    return { anilistId, malId };
  }, [heroRow]);
  const { data: heroAniListMedia } = useQuery({
    queryKey: ["favorites-hero-banner", heroExternalIds.anilistId, heroExternalIds.malId],
    queryFn: () => fetchAniListMediaById({
      anilistId: heroExternalIds.anilistId,
      malId: heroExternalIds.malId
    }),
    enabled: Boolean(heroRow && (heroExternalIds.anilistId || heroExternalIds.malId)),
    staleTime: 10 * 60 * 1e3
  });
  const heroItems = reactExports.useMemo(() => {
    if (!heroRow) return [];
    const ordered = [heroRow, ...rows.filter((row) => row.id !== heroRow.id)];
    return ordered.slice(0, RAIL_LENGTH).map(watchlistToPosterItem);
  }, [heroRow, rows]);
  const heroStats = reactExports.useMemo(() => {
    const chips = [];
    if (counts.total) chips.push(`${counts.total} saved`);
    if (counts.watching) chips.push(`${counts.watching} watching`);
    if (counts.completed) chips.push(`${counts.completed} completed`);
    return chips;
  }, [counts]);
  const recEntries = reactExports.useMemo(
    () => (recommendations ?? []).map((entry, index) => ({
      item: animeCardToPosterItem(entry.anime, index),
      note: entry.reason
    })),
    [recommendations]
  );
  const mlEntries = reactExports.useMemo(
    () => (mlRecommendations ?? []).map((entry, index) => {
      var _a2;
      return {
        item: animeCardToPosterItem(entry.anime, index),
        note: [`${Math.round(entry.score)}% match`, (_a2 = entry.reasons) == null ? void 0 : _a2[0]].filter(Boolean).join(" · ")
      };
    }),
    [mlRecommendations]
  );
  const listEntries = reactExports.useMemo(
    () => filteredWatchlist.map((row, index) => ({
      item: watchlistToPosterItem(row, index),
      animeId: row.anime_id
    })),
    [filteredWatchlist]
  );
  const smartEntries = reactExports.useMemo(
    () => (smartFavorites ?? []).map((suggestion, index) => ({
      item: suggestionToPosterItem(suggestion, index),
      suggestion,
      note: suggestion.reason
    })),
    [smartFavorites]
  );
  const aniListEntries = reactExports.useMemo(
    () => aniListFavorites.slice(0, 12).map((media, index) => {
      var _a2, _b2, _c2, _d2, _e, _f;
      const suggestion = {
        // `/anime/:id` resolves `mal:`/`anilist:` prefixed ids; the bare
        // AniList id the old page linked to is not one of them.
        animeId: buildExternalAnimeRouteId(media == null ? void 0 : media.idMal, media == null ? void 0 : media.id) || String((media == null ? void 0 : media.id) ?? ""),
        animeName: ((_a2 = media == null ? void 0 : media.title) == null ? void 0 : _a2.english) || ((_b2 = media == null ? void 0 : media.title) == null ? void 0 : _b2.romaji) || ((_c2 = media == null ? void 0 : media.title) == null ? void 0 : _c2.native) || `AniList #${media == null ? void 0 : media.id}`,
        animePoster: ((_d2 = media == null ? void 0 : media.coverImage) == null ? void 0 : _d2.large) || ((_e = media == null ? void 0 : media.coverImage) == null ? void 0 : _e.medium) || null
      };
      return {
        item: {
          ...suggestionToPosterItem(suggestion, index),
          anilistId: toPositiveInt(media == null ? void 0 : media.id),
          meta: [media == null ? void 0 : media.format, media == null ? void 0 : media.seasonYear].filter(Boolean).join(" · "),
          score: (media == null ? void 0 : media.averageScore) ? (media.averageScore / 10).toFixed(1) : void 0
        },
        suggestion,
        note: `${((_f = media == null ? void 0 : media.favourites) == null ? void 0 : _f.toLocaleString()) ?? "—"} favorites`
      };
    }),
    [aniListFavorites]
  );
  const addSuggestion = (suggestion) => addToWatchlist.mutate({
    animeId: suggestion.animeId,
    animeName: suggestion.animeName,
    animePoster: suggestion.animePoster || void 0,
    status: "plan_to_watch"
  });
  const removeSelected = async () => {
    if (selectedIds.length === 0) return;
    if (!await confirm({ title: `Remove ${selectedIds.length} title${selectedIds.length === 1 ? "" : "s"}?`, destructive: true })) return;
    await bulkRemove.mutateAsync(selectedIds);
    setSelectedIds([]);
    setSelectMode(false);
  };
  const shellClass = cn(
    "relative z-10 mx-auto max-w-[1800px] py-4 pb-24 pr-4 md:py-6 md:pb-6 md:pr-6",
    isNative ? "pl-4" : "pl-4 md:pl-32"
  );
  if (!user) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen overflow-x-hidden bg-background text-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Background, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Sidebar, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: shellClass, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative mt-2 overflow-hidden rounded-[2rem] border border-white/[0.07] bg-card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-[radial-gradient(120%_90%_at_15%_110%,hsl(var(--primary)/0.28),transparent_60%)]" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex min-h-[60vh] flex-col items-center justify-center px-6 py-16 text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: "h-7 w-7 text-primary" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-6 text-[11px] font-bold uppercase tracking-[0.28em] text-primary", children: "Your collection" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display mt-3 text-4xl font-black tracking-tight text-foreground sm:text-5xl", children: "Favorites live behind sign-in" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 max-w-md text-sm leading-relaxed text-white/55 sm:text-base", children: "Sign in to keep a watchlist, pick up where you left off, and get recommendations built from what you actually watch." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => navigate("/auth"),
              className: "group mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-b from-primary to-secondary px-6 py-3 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:from-primary/90 hover:to-secondary/90 hover:shadow-primary/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
              children: "Sign in"
            }
          )
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(MobileNav, {})
    ] });
  }
  const toggleSelected = (animeId) => setSelectedIds(
    (prev) => prev.includes(animeId) ? prev.filter((id) => id !== animeId) : [...prev, animeId]
  );
  const pendingAddId = addToWatchlist.isPending ? (_a = addToWatchlist.variables) == null ? void 0 : _a.animeId : void 0;
  const activeEntries = showRecommendations ? recEntries : showMLRecs ? mlEntries : listEntries;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen overflow-x-hidden bg-background text-foreground", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Background, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Sidebar, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: shellClass, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        BoardHero,
        {
          className: "mt-2",
          eyebrow: "Your collection",
          heading: counts.total ? "Everything you saved" : "Start your collection",
          description: counts.total ? "Your watchlist, the titles the recommenders think you should try next, and what the wider fandom keeps coming back to — all on one page." : "Save a title from any page and it lands here, alongside recommendations built from what you actually watch.",
          leader: heroItems[0],
          leaderPrefix: (heroRow == null ? void 0 : heroRow.status) === "watching" ? "Resume" : "Latest",
          ctaLabel: (heroRow == null ? void 0 : heroRow.status) === "watching" ? "Resume watching" : "Open title",
          stats: heroStats,
          backdrop: (heroAniListMedia == null ? void 0 : heroAniListMedia.bannerImage) || void 0,
          items: heroItems,
          isLoading: loadingWatchlist,
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            PillGroup,
            {
              options: TABS,
              value: activeTab,
              onChange: (id) => setActiveTab(id),
              label: "Collection filter"
            }
          )
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mt-12", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          SectionHeading,
          {
            eyebrow: TAB_COPY[activeTab].eyebrow,
            title: TAB_COPY[activeTab].title,
            meta: `${activeEntries.length} ${activeEntries.length === 1 ? "title" : "titles"}`,
            action: isListTab ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "mr-1 text-xs font-medium text-white/40", children: [
                activeEntries.length,
                " ",
                activeEntries.length === 1 ? "title" : "titles"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenu, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuTrigger, { className: controlTriggerClass, children: [
                  (_b = SORTS.find((option) => option.id === sortBy)) == null ? void 0 : _b.label,
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "h-3.5 w-3.5 opacity-60" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuContent, { align: "end", className: controlMenuClass, children: SORTS.map((option) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  DropdownMenuItem,
                  {
                    className: controlItemClass,
                    onSelect: () => setSortBy(option.id),
                    children: [
                      option.label,
                      sortBy === option.id && /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-3.5 w-3.5 text-primary" })
                    ]
                  },
                  option.id
                )) })
              ] }),
              selectMode && selectedIds.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  onClick: removeSelected,
                  disabled: bulkRemove.isPending,
                  className: "inline-flex items-center gap-1.5 rounded-full border border-destructive/40 bg-destructive/15 px-4 py-2 text-sm font-semibold text-destructive transition-colors hover:border-destructive/70 hover:bg-destructive/25 hover:text-destructive-foreground disabled:opacity-50",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3.5 w-3.5" }),
                    "Remove ",
                    selectedIds.length
                  ]
                }
              ),
              activeEntries.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => {
                    setSelectMode((prev) => !prev);
                    setSelectedIds([]);
                  },
                  className: controlTriggerClass,
                  children: selectMode ? "Done" : "Manage list"
                }
              )
            ] }) : void 0
          }
        ),
        showMLRecs && tasteProfile && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 rounded-3xl border border-white/[0.07] bg-white/[0.03] p-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-start gap-x-8 gap-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex h-11 w-11 items-center justify-center rounded-2xl border border-primary/20 bg-primary/15", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Brain, { className: "h-5 w-5 text-primary" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] font-bold uppercase tracking-[0.2em] text-primary", children: "Taste model" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold text-white", children: "Ranked from your history & ratings" })
            ] })
          ] }),
          tasteProfile.preferredGenres.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-1.5 text-[11px] font-medium uppercase tracking-wide text-white/40", children: "Top genres" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5", children: tasteProfile.preferredGenres.slice(0, 5).map((g) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "rounded-full border border-white/10 bg-white/[0.05] px-2.5 py-1 text-xs font-medium text-white/75",
                children: g.genre
              },
              g.genre
            )) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-1.5 text-[11px] font-medium uppercase tracking-wide text-white/40", children: "Rating range" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-semibold text-white", children: [
              tasteProfile.preferredRatings.min.toFixed(1),
              "–",
              tasteProfile.preferredRatings.max.toFixed(1),
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-normal text-white/45", children: [
                "avg ",
                tasteProfile.preferredRatings.average.toFixed(1)
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-[150px]", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-1.5 text-[11px] font-medium uppercase tracking-wide text-white/40", children: "Diversity" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1.5 w-24 overflow-hidden rounded-full bg-white/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full bg-primary", style: { width: `${Math.round(tasteProfile.diversityScore * 100)}%` } }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-semibold text-white/70", children: [
                Math.round(tasteProfile.diversityScore * 100),
                "%"
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Link,
            {
              to: "/recommendations",
              className: "ml-auto inline-flex items-center gap-1.5 self-center rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-semibold text-white/70 transition-colors hover:border-white/25 hover:text-white",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-3.5 w-3.5" }),
                "Full recommendations"
              ]
            }
          )
        ] }) }),
        isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(PosterGridSkeleton, { className: "mt-6", count: 14 }) : activeEntries.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          EmptyPanel,
          {
            icon: showRecommendations ? /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-7 w-7 text-white/25" }) : showMLRecs ? /* @__PURE__ */ jsxRuntimeExports.jsx(Brain, { className: "h-7 w-7 text-white/25" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: "h-7 w-7 text-white/25" }),
            title: EMPTY_COPY[activeTab].title,
            hint: EMPTY_COPY[activeTab].hint,
            action: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Link,
              {
                to: "/genre",
                className: "inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-semibold text-white/70 transition-colors hover:border-white/25 hover:text-white",
                children: "Browse anime"
              }
            )
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn(POSTER_GRID_CLASS, "mt-6"), children: activeEntries.map((entry, index) => {
          const animeId = entry.animeId;
          const selected = animeId ? selectedIds.includes(animeId) : false;
          return /* @__PURE__ */ jsxRuntimeExports.jsx(
            PosterCard,
            {
              item: entry.item,
              eager: index < 7,
              preview: true,
              footer: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                entry.note && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1.5 line-clamp-2 text-[11px] font-medium leading-relaxed text-primary/80", children: entry.note }),
                selectMode && animeId && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => toggleSelected(animeId),
                    "aria-pressed": selected,
                    "aria-label": `Select ${entry.item.title}`,
                    className: cn(
                      "absolute right-2 top-2 z-20 flex h-8 w-8 items-center justify-center rounded-full border backdrop-blur-sm transition-colors",
                      selected ? "border-primary bg-primary text-primary-foreground" : "border-white/25 bg-black/60 text-white/70 hover:border-white/60"
                    ),
                    children: selected && /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-4 w-4" })
                  }
                )
              ] })
            },
            entry.item.key
          );
        }) })
      ] }),
      showMLRecs && tasteProfile && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mt-14", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          SectionHeading,
          {
            eyebrow: "Your taste model",
            title: "What the match scores are built from"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            StatTile,
            {
              label: "Diversity",
              value: `${Math.round(tasteProfile.diversityScore * 100)}%`,
              hint: "How widely your history spreads"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            StatTile,
            {
              label: "Scores you finish",
              value: tasteProfile.preferredRatings.average.toFixed(1),
              hint: `Mostly ${tasteProfile.preferredRatings.min.toFixed(1)}–${tasteProfile.preferredRatings.max.toFixed(1)}`
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            StatTile,
            {
              label: "Top genre",
              value: ((_c = tasteProfile.preferredGenres[0]) == null ? void 0 : _c.genre) ?? "—",
              hint: tasteProfile.preferredGenres.length > 1 ? `+${tasteProfile.preferredGenres.length - 1} more weighted` : "Weighted highest in your history"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            StatTile,
            {
              label: "Preferred format",
              value: ((_d = tasteProfile.preferredTypes[0]) == null ? void 0 : _d.type) ?? "—",
              hint: tasteProfile.preferredTypes[0] ? `${Math.round(tasteProfile.preferredTypes[0].weight * 100)}% of what you watch` : "Not enough history"
            }
          )
        ] })
      ] }),
      showRecommendations && ((genrePrefs == null ? void 0 : genrePrefs.length) ?? 0) > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mt-14", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHeading, { eyebrow: "Your genres", title: "Weighted by what you finish" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-5 flex flex-wrap gap-2", children: (genrePrefs ?? []).slice(0, 12).map((preference) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Link,
          {
            to: `/genre/${encodeURIComponent(preference.genre.toLowerCase())}`,
            className: "inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-xs font-semibold text-white/70 transition-colors hover:border-primary/50 hover:text-primary",
            children: [
              preference.genre,
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tabular-nums text-white/35", children: preference.count })
            ]
          },
          preference.genre
        )) })
      ] }),
      (showRecommendations || activeTab === "all") && smartEntries.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mt-14", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          SectionHeading,
          {
            eyebrow: "From your history",
            title: "Watched, never saved",
            meta: "Scored on episodes, completions and recency"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn(POSTER_GRID_CLASS, "mt-6"), children: smartEntries.map((entry) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          PosterCard,
          {
            item: entry.item,
            preview: true,
            footer: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1.5 line-clamp-2 text-[11px] font-medium leading-relaxed text-primary/80", children: entry.note }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                AddToListButton,
                {
                  saved: savedIds.has(entry.suggestion.animeId),
                  pending: pendingAddId === entry.suggestion.animeId,
                  onAdd: () => addSuggestion(entry.suggestion)
                }
              )
            ] })
          },
          entry.item.key
        )) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mt-14", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHeading, { eyebrow: "All-time", title: "Fan favorites", meta: "Most favorited on AniList" }),
        loadingAniListFavorites && aniListEntries.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(PosterGridSkeleton, { className: "mt-6", count: 12 }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn(POSTER_GRID_CLASS, "mt-6"), children: aniListEntries.map((entry) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          PosterCard,
          {
            item: entry.item,
            preview: true,
            footer: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1.5 text-[11px] font-bold uppercase tracking-widest text-white/35", children: entry.note }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                AddToListButton,
                {
                  saved: savedIds.has(entry.suggestion.animeId),
                  pending: pendingAddId === entry.suggestion.animeId,
                  onAdd: () => addSuggestion(entry.suggestion)
                }
              )
            ] })
          },
          entry.item.key
        )) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        MangaPicksSection,
        {
          className: "mt-14",
          genres: (genrePrefs ?? []).map((preference) => preference.genre)
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(MobileNav, {})
  ] });
}
function EmptyPanel({
  icon,
  title,
  hint,
  action
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex flex-col items-center gap-2 rounded-3xl border border-white/[0.07] bg-white/[0.02] py-20 text-center", children: [
    icon,
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-base font-bold text-white/70", children: title }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "max-w-sm text-sm text-white/40", children: hint }),
    action && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3", children: action })
  ] });
}
function StatTile({ label, value, hint }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-bold uppercase tracking-widest text-white/35", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display mt-2 text-2xl font-black text-foreground", children: value }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-white/40", children: hint })
  ] });
}
function AddToListButton({
  saved,
  pending,
  onAdd
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "button",
    {
      type: "button",
      onClick: onAdd,
      disabled: saved || pending,
      className: cn(
        "mt-2 inline-flex w-full items-center justify-center gap-1.5 rounded-full border px-3 py-1.5 text-[11px] font-bold transition-colors",
        saved ? "border-primary/25 bg-primary/10 text-primary" : "border-white/10 bg-white/[0.04] text-white/70 hover:border-primary/50 hover:text-primary disabled:opacity-50"
      ),
      children: [
        saved ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-3.5 w-3.5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-3.5 w-3.5" }),
        saved ? "In your list" : pending ? "Adding…" : "Add to list"
      ]
    }
  );
}
export {
  FavoritesPage as default
};
