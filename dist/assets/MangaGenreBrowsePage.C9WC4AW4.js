import { j as jsxRuntimeExports, e as useNavigate, i as useParams, l as useSearchParams, r as reactExports, L as Link } from "./react-vendor.CAo4XUiA.js";
import { a as useQuery, c as useInfiniteQuery } from "./tanstack.DPr3OB19.js";
import { Y as DropdownMenu, Z as DropdownMenuTrigger, j as cn, _ as DropdownMenuContent, $ as DropdownMenuItem, V as useSettingsModal, K as useIsDesktopApp, ap as useContentSafetySettings, Q as Background, S as Sidebar, ez as parseMangaSearchProvider, eA as getMangaFilterCounts, eB as searchManga } from "./index.C6yfkT5T.js";
import { M as MobileNav } from "./MobileNav.ABHzkhTQ.js";
import { H as Header } from "./Header.D6gxY_6M.js";
import { S as SectionHeading } from "./SectionHeading.D7LOUoID.js";
import { P as PillGroup } from "./PillGroup.CcXbIR07.js";
import { c as controlTriggerClass, a as controlMenuClass, b as controlItemClass, h as RAIL_LENGTH, P as PosterGridSkeleton, n as PAGER_CLASS, p as PosterCard, e as POSTER_GRID_CLASS, d as discoverYears } from "./DiscoverPosterGrid.CIdiGIb1.js";
import { N as ChevronDown, c as Check, u as ArrowLeft, v as ArrowRight, aA as Layers, aD as Clock, a5 as Globe, bK as Compass, cf as Tag, bo as SlidersHorizontal, bR as ListOrdered, cP as CalendarRange, aI as Star, B as BookOpen, b9 as RotateCcw, T as TriangleAlert, aH as ShieldAlert, ad as SearchX, Q as LoaderCircle } from "./icons.C2gBBarQ.js";
import { R as RankedPosterRail } from "./RankedPosterRail.BR6TE-Dw.js";
import { a as mangaSearchItemToPosterItem } from "./mangaPosterItem.BNF10jsL.js";
import "./vendor.CJyRs4QS.js";
import "./supabase.WuRMX5Dg.js";
import "./radix.BiK9uYXL.js";
import "./motion.DVGLRFCH.js";
import "./hls.BlgtCWcq.js";
import "./editor.Dxw8dtyw.js";
import "./charts.Dr1fgDJ-.js";
import "./useNotifications.BzSJE8km.js";
import "./useTrackedShows.Dbf34fk8.js";
import "./useNextAiringEpisodes.COq8rfNQ.js";
import "./useHoverPreview.Cs_Lh1vM.js";
function ControlSelect({
  label,
  value,
  options,
  onChange,
  icon: Icon,
  neutral,
  className
}) {
  const active = options.find((option) => option.value === value);
  const isNeutral = neutral ? neutral.includes(value) : false;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenu, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      DropdownMenuTrigger,
      {
        "aria-label": label,
        className: cn(controlTriggerClass, !isNeutral && "border-primary/40 text-white", className),
        children: [
          Icon ? /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-3.5 w-3.5 opacity-60" }) : null,
          isNeutral || !active ? label : active.label,
          /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "h-3.5 w-3.5 opacity-60" })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuContent, { align: "start", className: controlMenuClass, children: options.map((option) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      DropdownMenuItem,
      {
        className: controlItemClass,
        onSelect: () => onChange(option.value),
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex min-w-0 items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: option.label }),
            option.hint ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "shrink-0 text-xs text-white/30", children: option.hint }) : null
          ] }),
          value === option.value ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-3.5 w-3.5 shrink-0 text-primary" }) : null
        ]
      },
      option.value
    )) })
  ] });
}
const BASE_GENRE_PRESETS = [
  "",
  "action",
  "romance",
  "fantasy",
  "thriller",
  "horror",
  "comedy",
  "adventure",
  "mystery",
  "drama",
  "historical",
  "isekai",
  "sports",
  "martial arts"
];
const HENTAI_GENRE = "hentai";
const PROVIDER_OPTIONS = [
  { value: "all", label: "All providers" },
  { value: "mapped", label: "Mapped only" }
];
const TYPE_OPTIONS = [
  { value: "all", label: "All types" },
  { value: "manga", label: "Manga" },
  { value: "manhwa", label: "Manhwa" },
  { value: "manhua", label: "Manhua" },
  { value: "comics", label: "Comics" }
];
const STATUS_OPTIONS = [
  { value: "all", label: "Any status" },
  { value: "ongoing", label: "Ongoing" },
  { value: "completed", label: "Completed" },
  { value: "hiatus", label: "Hiatus" },
  { value: "cancelled", label: "Cancelled" },
  { value: "unreleased", label: "Unreleased" }
];
const FEED_MODE_OPTIONS = [
  { value: "auto", label: "Auto" },
  { value: "latest", label: "Latest" },
  { value: "added", label: "Recently added" },
  { value: "new-chap", label: "New chapters" },
  { value: "recent", label: "Recently read" },
  { value: "foryou", label: "For you" },
  { value: "popular", label: "Popular" },
  { value: "recommendation", label: "Recommended" },
  { value: "origin", label: "By origin" },
  { value: "random", label: "Random picks" }
];
const FEED_WINDOW_OPTIONS = [
  { value: "day", label: "Today" },
  { value: "week", label: "This week" },
  { value: "month", label: "This month" },
  { value: "all", label: "All time" }
];
const ORIGIN_OPTIONS = [
  { value: "all", label: "Any origin" },
  { value: "jp", label: "Japan · Manga" },
  { value: "kr", label: "Korea · Manhwa" },
  { value: "zh", label: "China · Manhua" }
];
const SORT_LABELS = {
  relevance: "Relevance",
  trending: "Trending",
  latestUpdate: "Latest update",
  rating: "Highest rating",
  popularity: "Popularity",
  chapterCount: "Chapter count"
};
const MIN_SCORE_OPTIONS = [
  { value: "0", label: "Any rating" },
  { value: "9", label: "9+" },
  { value: "8", label: "8+" },
  { value: "7", label: "7+" },
  { value: "6", label: "6+" },
  { value: "5", label: "5+" }
];
const MIN_CHAPTER_OPTIONS = [
  { value: "0", label: "Any length" },
  { value: "10", label: "10+ chapters" },
  { value: "25", label: "25+ chapters" },
  { value: "50", label: "50+ chapters" },
  { value: "100", label: "100+ chapters" },
  { value: "200", label: "200+ chapters" },
  { value: "500", label: "500+ chapters" }
];
const YEAR_OPTIONS = [
  { value: "0", label: "Any year" },
  ...discoverYears().map((year) => ({ value: String(year), label: String(year) }))
];
function normalizeProvider(value) {
  return parseMangaSearchProvider(value, "all");
}
function normalizeType(value) {
  const lowered = String(value || "all").trim().toLowerCase();
  if (lowered === "manwha" || lowered === "manwah") return "manhwa";
  if (TYPE_OPTIONS.some((option) => option.value === lowered)) return lowered;
  return "all";
}
function normalizeStatus(value) {
  const lowered = String(value || "all").trim().toLowerCase();
  if (STATUS_OPTIONS.some((option) => option.value === lowered)) return lowered;
  return "all";
}
function normalizeSort(value) {
  const lowered = String(value || "default").trim().toLowerCase();
  if (lowered === "default") return "default";
  if (Object.keys(SORT_LABELS).includes(lowered)) return lowered;
  return "default";
}
function normalizeFeedMode(value) {
  const lowered = String(value || "auto").trim().toLowerCase();
  if (FEED_MODE_OPTIONS.some((option) => option.value === lowered)) {
    return lowered;
  }
  return "auto";
}
function normalizeFeedWindow(value) {
  const lowered = String(value || "day").trim().toLowerCase();
  if (FEED_WINDOW_OPTIONS.some((option) => option.value === lowered)) {
    return lowered;
  }
  return "day";
}
function normalizeOrigin(value) {
  const lowered = String(value || "all").trim().toLowerCase();
  if (ORIGIN_OPTIONS.some((option) => option.value === lowered)) {
    return lowered;
  }
  return "all";
}
function parsePositiveNumberParam(value) {
  const parsed = Number(value);
  if (!Number.isFinite(parsed) || parsed <= 0) return 0;
  return parsed;
}
function formatCount(count) {
  if (!Number.isFinite(count) || !count || count <= 0) return void 0;
  return count.toLocaleString();
}
function normalizeStatusValue(value) {
  const normalized = String(value || "").toLowerCase();
  if (normalized.includes("ongoing") || normalized.includes("releasing")) return "ongoing";
  if (normalized.includes("completed") || normalized.includes("finished")) return "completed";
  if (normalized.includes("hiatus")) return "hiatus";
  if (normalized.includes("cancel")) return "cancelled";
  if (normalized.includes("unreleased") || normalized.includes("not")) return "unreleased";
  return "unknown";
}
function formatGenreLabel(genre) {
  if (!genre) return "All genres";
  return genre.replace(/-/g, " ").replace(/\b\w/g, (letter) => letter.toUpperCase());
}
const PAGE_LIMIT = 24;
async function fetchGenreCatalogPage(args) {
  const {
    page,
    genre,
    provider,
    mangaType,
    sort,
    feedMode,
    feedOrigin,
    minYear,
    minScore,
    canShowAdult
  } = args;
  const isAdultGenre = genre === HENTAI_GENRE;
  const sortValue = sort !== "default" ? sort : void 0;
  if (isAdultGenre && !canShowAdult) {
    return {
      query: genre,
      page,
      limit: PAGE_LIMIT,
      partial: false,
      failedProviders: [],
      results: [],
      currentPage: page,
      totalPages: page,
      hasNextPage: false,
      source: "genre"
    };
  }
  if (feedMode !== "auto") {
    return searchManga("", page, PAGE_LIMIT, {
      mode: feedMode,
      provider,
      mangaType,
      adult: isAdultGenre,
      sort: sortValue,
      origin: feedMode === "origin" && feedOrigin !== "all" ? feedOrigin : void 0,
      minYear,
      minScore
    });
  }
  if (genre) {
    const supportsGenreMode = provider === "all" || provider === "mangafire" || provider === "allmanga";
    if (supportsGenreMode) {
      const genreMode = await searchManga("", page, PAGE_LIMIT, {
        mode: "genre",
        provider,
        genre,
        mangaType,
        adult: isAdultGenre,
        sort: sortValue,
        minYear,
        minScore
      });
      if (Array.isArray(genreMode == null ? void 0 : genreMode.results) && genreMode.results.length > 0) {
        return genreMode;
      }
    }
    return searchManga(`${genre} manga`, page, PAGE_LIMIT, {
      mode: "search",
      provider,
      mangaType,
      adult: isAdultGenre,
      sort: sortValue,
      minYear,
      minScore
    });
  }
  if (provider !== "all") {
    return searchManga("", page, PAGE_LIMIT, {
      mode: "latest",
      provider,
      mangaType,
      sort: sortValue,
      minYear,
      minScore
    });
  }
  return searchManga("", page, PAGE_LIMIT, {
    mode: "explore",
    provider,
    mangaType,
    sort: sortValue,
    minYear,
    minScore
  });
}
function MangaGenreBrowsePage() {
  const navigate = useNavigate();
  const { openSettings } = useSettingsModal();
  const isDesktopApp = useIsDesktopApp();
  const { settings: contentSafetySettings } = useContentSafetySettings();
  const { genre: routeGenre } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const gridTop = reactExports.useRef(null);
  const canShowAdultEverywhere = contentSafetySettings.showAdultEverywhere;
  const normalizedRouteGenre = routeGenre ? decodeURIComponent(routeGenre).trim().toLowerCase() : "";
  const queryGenre = String(searchParams.get("genre") || "").trim().toLowerCase();
  const activeGenre = normalizedRouteGenre || queryGenre;
  const isAdultGenre = activeGenre === HENTAI_GENRE;
  const isAdultGenreLocked = isAdultGenre && !canShowAdultEverywhere;
  const hasRouteGenre = Boolean(normalizedRouteGenre);
  const provider = normalizeProvider(searchParams.get("provider"));
  const feedMode = normalizeFeedMode(searchParams.get("feed"));
  const feedWindow = normalizeFeedWindow(searchParams.get("window"));
  const feedOrigin = normalizeOrigin(searchParams.get("origin"));
  const mangaType = normalizeType(searchParams.get("type"));
  const mangaStatus = normalizeStatus(searchParams.get("status"));
  const sortMode = normalizeSort(searchParams.get("sort"));
  const minYear = parsePositiveNumberParam(searchParams.get("minYear"));
  const minScore = parsePositiveNumberParam(searchParams.get("minScore"));
  const minChapters = parsePositiveNumberParam(searchParams.get("minChapters"));
  const hasActiveFilters = provider !== "all" || feedMode !== "auto" || mangaType !== "all" || mangaStatus !== "all" || sortMode !== "default" || minYear > 0 || minScore > 0 || minChapters > 0;
  const facetQueryText = reactExports.useMemo(() => {
    if (activeGenre) return `${activeGenre} manga`;
    if (mangaType !== "all") return mangaType;
    return "manga";
  }, [activeGenre, mangaType]);
  const { data: mangaFilterCounts } = useQuery({
    queryKey: ["manga-discover-filter-counts", facetQueryText],
    queryFn: () => getMangaFilterCounts(),
    enabled: facetQueryText.length > 0,
    staleTime: 5 * 60 * 1e3
  });
  const facetCountLookup = reactExports.useMemo(() => {
    const lookup = /* @__PURE__ */ new Map();
    const groups = Array.isArray(mangaFilterCounts == null ? void 0 : mangaFilterCounts.groups) ? mangaFilterCounts.groups : [];
    groups.forEach((group) => {
      const key = String((group == null ? void 0 : group.key) || "").toLowerCase();
      if (!key) return;
      const valueMap = /* @__PURE__ */ new Map();
      const counts = Array.isArray(group == null ? void 0 : group.counts) ? group.counts : [];
      counts.forEach((entry) => {
        const value = String((entry == null ? void 0 : entry.value) || "").toLowerCase();
        const count = Number(entry == null ? void 0 : entry.count);
        if (!value || !Number.isFinite(count)) return;
        valueMap.set(value, count);
      });
      lookup.set(key, valueMap);
    });
    return lookup;
  }, [mangaFilterCounts]);
  const getFacetCount = (keys, value) => {
    const normalizedValue = String(value || "").toLowerCase();
    if (!normalizedValue) return void 0;
    for (const key of keys) {
      const group = facetCountLookup.get(String(key || "").toLowerCase());
      const count = group == null ? void 0 : group.get(normalizedValue);
      if (typeof count === "number") return count;
    }
    return void 0;
  };
  const genreCountMap = reactExports.useMemo(() => {
    const map = /* @__PURE__ */ new Map();
    ["genre", "genres"].forEach((key) => {
      const group = facetCountLookup.get(key);
      if (!group) return;
      group.forEach((count, value) => map.set(value, count));
    });
    return map;
  }, [facetCountLookup]);
  const genrePills = reactExports.useMemo(() => {
    const presets = BASE_GENRE_PRESETS.filter(Boolean);
    if (canShowAdultEverywhere && !presets.includes(HENTAI_GENRE)) presets.push(HENTAI_GENRE);
    const safe = canShowAdultEverywhere ? presets : presets.filter((genre) => genre !== HENTAI_GENRE);
    return ["", ...safe].map((genre) => {
      const count = genre ? formatCount(genreCountMap.get(genre.toLowerCase())) : void 0;
      return {
        id: genre,
        label: count ? `${formatGenreLabel(genre)} ${count}` : formatGenreLabel(genre),
        icon: genre === HENTAI_GENRE ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { "aria-hidden": true, className: "text-[10px]", children: "18+" }) : void 0
      };
    });
  }, [canShowAdultEverywhere, genreCountMap]);
  const sortOptions = reactExports.useMemo(
    () => [
      { value: "default", label: "Default order" },
      ...Object.keys(SORT_LABELS).map((sort) => ({
        value: sort,
        label: SORT_LABELS[sort]
      }))
    ],
    []
  );
  const setParamAndNavigate = (updates, nextGenre) => {
    const nextParams = new URLSearchParams(searchParams);
    Object.entries(updates).forEach(([key, value]) => {
      if (!value || value === "all" || value === "default" || value === "auto" || value === "day") {
        nextParams.delete(key);
      } else {
        nextParams.set(key, value);
      }
    });
    const targetGenre = typeof nextGenre === "string" ? nextGenre : activeGenre;
    if (targetGenre) {
      nextParams.set("genre", targetGenre);
      const qs2 = nextParams.toString();
      navigate(`/manga/genre/${encodeURIComponent(targetGenre)}${qs2 ? `?${qs2}` : ""}`);
      return;
    }
    nextParams.delete("genre");
    const qs = nextParams.toString();
    if (hasRouteGenre) {
      navigate(`/manga/discover${qs ? `?${qs}` : ""}`);
    } else {
      setSearchParams(nextParams);
    }
  };
  const resetFilters = () => setParamAndNavigate({
    provider: null,
    feed: null,
    window: null,
    origin: null,
    type: null,
    status: null,
    sort: null,
    minYear: null,
    minScore: null,
    minChapters: null
  });
  const discoverQuery = useInfiniteQuery({
    queryKey: [
      "manga-discover-catalog",
      activeGenre,
      provider,
      feedMode,
      feedWindow,
      feedOrigin,
      mangaType,
      mangaStatus,
      sortMode,
      minYear,
      minScore,
      minChapters,
      canShowAdultEverywhere
    ],
    queryFn: ({ pageParam = 1 }) => fetchGenreCatalogPage({
      page: pageParam,
      genre: activeGenre,
      provider,
      mangaType,
      sort: sortMode,
      feedMode,
      feedOrigin,
      minYear,
      minScore,
      canShowAdult: canShowAdultEverywhere
    }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      if (!(lastPage == null ? void 0 : lastPage.hasNextPage)) return void 0;
      const current = typeof (lastPage == null ? void 0 : lastPage.currentPage) === "number" ? lastPage.currentPage : allPages.length;
      return current + 1;
    },
    staleTime: 2 * 60 * 1e3
  });
  const failedProviders = reactExports.useMemo(() => {
    var _a;
    const pages = ((_a = discoverQuery.data) == null ? void 0 : _a.pages) ?? [];
    const names = /* @__PURE__ */ new Set();
    pages.forEach((page) => {
      (Array.isArray(page == null ? void 0 : page.failedProviders) ? page.failedProviders : []).forEach((name) => {
        if (name) names.add(String(name));
      });
    });
    return Array.from(names);
  }, [discoverQuery.data]);
  const posters = reactExports.useMemo(() => {
    var _a;
    const rows = (((_a = discoverQuery.data) == null ? void 0 : _a.pages) ?? []).flatMap(
      (page) => Array.isArray(page == null ? void 0 : page.results) ? page.results : []
    );
    const minScoreRaw = minScore > 0 ? minScore * 10 : 0;
    const filtered = rows.filter((item) => {
      if (!canShowAdultEverywhere && (item == null ? void 0 : item.adult)) return false;
      if (mangaStatus !== "all" && normalizeStatusValue(item == null ? void 0 : item.status) !== mangaStatus) return false;
      if (minYear > 0) {
        const year = Number(item == null ? void 0 : item.year);
        if (!Number.isFinite(year) || year < minYear) return false;
      }
      if (minScoreRaw > 0) {
        const score = Number(item == null ? void 0 : item.score);
        if (!Number.isFinite(score) || score < minScoreRaw) return false;
      }
      if (minChapters > 0) {
        const chapters = Number(item == null ? void 0 : item.chapters);
        if (!Number.isFinite(chapters) || chapters < minChapters) return false;
      }
      return true;
    });
    const sorted = sortMode === "default" ? filtered : [...filtered].sort((left, right) => {
      if (sortMode === "rating") return Number((right == null ? void 0 : right.score) || 0) - Number((left == null ? void 0 : left.score) || 0);
      if (sortMode === "popularity" || sortMode === "trending") {
        return Number((right == null ? void 0 : right.popularity) || 0) - Number((left == null ? void 0 : left.popularity) || 0);
      }
      if (sortMode === "chapterCount") {
        return Number((right == null ? void 0 : right.chapters) || 0) - Number((left == null ? void 0 : left.chapters) || 0);
      }
      if (sortMode === "latestUpdate") {
        const yearGap = Number((right == null ? void 0 : right.year) || 0) - Number((left == null ? void 0 : left.year) || 0);
        if (yearGap !== 0) return yearGap;
        return Number((right == null ? void 0 : right.chapters) || 0) - Number((left == null ? void 0 : left.chapters) || 0);
      }
      return 0;
    });
    const seen = /* @__PURE__ */ new Set();
    const items = [];
    sorted.forEach((item, index) => {
      const identity = String(
        (item == null ? void 0 : item.anilistId) ? `al:${item.anilistId}` : (item == null ? void 0 : item.malId) ? `mal:${item.malId}` : (item == null ? void 0 : item.id) || ""
      );
      if (!identity || seen.has(identity)) return;
      seen.add(identity);
      const poster = mangaSearchItemToPosterItem(item, index);
      if (poster) items.push(poster);
    });
    return items;
  }, [
    discoverQuery.data,
    canShowAdultEverywhere,
    mangaStatus,
    minYear,
    minScore,
    minChapters,
    sortMode
  ]);
  const headingGenre = activeGenre ? formatGenreLabel(activeGenre) : "";
  const heading = headingGenre ? `${headingGenre} manga` : "Browse manga";
  const isInitialLoading = discoverQuery.isPending && !isAdultGenreLocked;
  const railItems = reactExports.useMemo(
    () => posters.filter((item) => Boolean(item.score)).sort((left, right) => Number(right.score) - Number(left.score)).slice(0, RAIL_LENGTH),
    [posters]
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen overflow-x-hidden bg-background text-foreground", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Background, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Sidebar, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "main",
      {
        className: cn(
          "relative z-10 mx-auto max-w-[1800px] px-4 py-6 pb-24 sm:px-6 md:pb-6",
          isDesktopApp ? "md:pl-6" : "md:pl-32"
        ),
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Header, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative mt-2 overflow-hidden rounded-[2rem] border border-white/[0.07] bg-card", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-[radial-gradient(120%_90%_at_15%_110%,hsl(var(--primary)/0.28),transparent_60%)]" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-[radial-gradient(80%_70%_at_95%_0%,hsl(var(--secondary)/0.18),transparent_65%)]" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative grid gap-10 p-6 sm:p-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-center lg:gap-6 lg:p-14", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-xl", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Link,
                  {
                    to: "/manga",
                    className: "inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.18em] text-white/40 transition-colors hover:text-white",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-3.5 w-3.5" }),
                      "Manga home"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-6 text-[11px] font-bold uppercase tracking-[0.28em] text-primary", children: "Manga catalogue" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display mt-3 text-4xl font-black capitalize leading-[1.05] tracking-tight text-foreground sm:text-5xl xl:text-[3.75rem]", children: heading }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 max-w-lg text-sm leading-relaxed text-white/55 sm:text-base", children: headingGenre ? `Every ${headingGenre.toLowerCase()} series the connected providers can reach, in one grid — filter by type, status, length or rating, and the URL keeps the view.` : "Everything the connected providers can reach, in one grid — pick a genre, filter by type, status, length or rating, and the URL keeps the view." }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    onClick: () => {
                      var _a;
                      return (_a = gridTop.current) == null ? void 0 : _a.scrollIntoView({ behavior: "smooth", block: "start" });
                    },
                    className: "group mt-7 inline-flex items-center gap-2 rounded-full bg-gradient-to-b from-primary to-secondary px-6 py-3 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:from-primary/90 hover:to-secondary/90 hover:shadow-primary/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
                    children: [
                      "Browse the catalogue",
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4 transition-transform group-hover:translate-x-0.5" })
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-w-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(RankedPosterRail, { items: railItems, isLoading: isInitialLoading }) })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { ref: gridTop, className: "scroll-mt-6 pt-12", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              SectionHeading,
              {
                eyebrow: activeGenre ? "Genre" : "Discover",
                title: activeGenre ? `${headingGenre} titles` : "All titles",
                meta: posters.length > 0 ? `${posters.length.toLocaleString()} loaded${discoverQuery.hasNextPage ? " · more available" : ""}` : void 0
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              PillGroup,
              {
                className: "mt-6",
                label: "Genre",
                options: genrePills,
                value: activeGenre,
                onChange: (next) => setParamAndNavigate({}, next)
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex flex-wrap items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                ControlSelect,
                {
                  label: "Feed",
                  icon: Layers,
                  value: feedMode,
                  options: FEED_MODE_OPTIONS,
                  neutral: ["auto"],
                  onChange: (next) => setParamAndNavigate({ feed: next })
                }
              ),
              (feedMode === "foryou" || feedMode === "recent" || feedMode === "popular") && /* @__PURE__ */ jsxRuntimeExports.jsx(
                ControlSelect,
                {
                  label: "Window",
                  icon: Clock,
                  value: feedWindow,
                  options: FEED_WINDOW_OPTIONS,
                  neutral: ["day"],
                  onChange: (next) => setParamAndNavigate({ window: next })
                }
              ),
              feedMode === "origin" && /* @__PURE__ */ jsxRuntimeExports.jsx(
                ControlSelect,
                {
                  label: "Origin",
                  icon: Globe,
                  value: feedOrigin,
                  options: ORIGIN_OPTIONS,
                  neutral: ["all"],
                  onChange: (next) => setParamAndNavigate({ origin: next })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                ControlSelect,
                {
                  label: "Provider",
                  icon: Compass,
                  value: provider,
                  options: PROVIDER_OPTIONS,
                  neutral: ["all"],
                  onChange: (next) => setParamAndNavigate({ provider: next })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                ControlSelect,
                {
                  label: "Type",
                  icon: Tag,
                  value: mangaType,
                  options: TYPE_OPTIONS.map((option) => ({
                    ...option,
                    hint: option.value === "all" ? void 0 : formatCount(getFacetCount(["type", "types", "format", "formats"], option.value))
                  })),
                  neutral: ["all"],
                  onChange: (next) => setParamAndNavigate({ type: next })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                ControlSelect,
                {
                  label: "Status",
                  icon: SlidersHorizontal,
                  value: mangaStatus,
                  options: STATUS_OPTIONS.map((option) => ({
                    ...option,
                    hint: option.value === "all" ? void 0 : formatCount(getFacetCount(["status", "statuses"], option.value))
                  })),
                  neutral: ["all"],
                  onChange: (next) => setParamAndNavigate({ status: next })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                ControlSelect,
                {
                  label: "Sort",
                  icon: ListOrdered,
                  value: sortMode,
                  options: sortOptions,
                  neutral: ["default"],
                  onChange: (next) => setParamAndNavigate({ sort: next })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                ControlSelect,
                {
                  label: "Year",
                  icon: CalendarRange,
                  value: String(minYear || 0),
                  options: YEAR_OPTIONS,
                  neutral: ["0"],
                  onChange: (next) => setParamAndNavigate({ minYear: next === "0" ? null : next })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                ControlSelect,
                {
                  label: "Rating",
                  icon: Star,
                  value: String(minScore || 0),
                  options: MIN_SCORE_OPTIONS,
                  neutral: ["0"],
                  onChange: (next) => setParamAndNavigate({ minScore: next === "0" ? null : next })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                ControlSelect,
                {
                  label: "Length",
                  icon: BookOpen,
                  value: String(minChapters || 0),
                  options: MIN_CHAPTER_OPTIONS,
                  neutral: ["0"],
                  onChange: (next) => setParamAndNavigate({ minChapters: next === "0" ? null : next })
                }
              ),
              hasActiveFilters && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  onClick: resetFilters,
                  className: cn(controlTriggerClass, "text-white/50 hover:text-white"),
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { className: "h-3.5 w-3.5 opacity-60" }),
                    "Reset"
                  ]
                }
              )
            ] }),
            failedProviders.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex items-start gap-3 rounded-2xl border border-amber/25 bg-amber/[0.06] px-4 py-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "mt-0.5 h-4 w-4 shrink-0 text-amber" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs leading-relaxed text-white/60", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-amber", children: "Partial results." }),
                " ",
                failedProviders.join(", "),
                " did not answer, so anything only they carry is missing from this list."
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8", children: isAdultGenreLocked ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center rounded-3xl border border-destructive/25 bg-destructive/[0.06] px-6 py-20 text-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex h-14 w-14 items-center justify-center rounded-2xl bg-destructive/15", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldAlert, { className: "h-7 w-7 text-destructive" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-5 text-lg font-bold", children: "Mature content is switched off" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 max-w-md text-sm leading-relaxed text-white/55", children: "This genre returns adult titles only, and your content safety settings hide them everywhere. Turn mature content on to browse it." }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  onClick: () => openSettings("privacy", "mature-content-controls"),
                  className: "group mt-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-5 py-2.5 text-sm font-semibold text-white/75 transition-colors hover:border-white/25 hover:text-white",
                  children: [
                    "Open content settings",
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4 transition-transform group-hover:translate-x-0.5" })
                  ]
                }
              )
            ] }) : isInitialLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(PosterGridSkeleton, {}) : discoverQuery.isError ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center rounded-3xl border border-destructive/25 bg-destructive/[0.06] px-6 py-20 text-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "h-9 w-9 text-destructive" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-lg font-bold", children: "The catalogue did not load" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 max-w-sm text-sm text-white/55", children: "Every provider failed for this query. Retry, or drop a filter or two." }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  onClick: () => discoverQuery.refetch(),
                  className: cn(PAGER_CLASS, "mt-6"),
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { className: "h-4 w-4" }),
                    "Try again"
                  ]
                }
              )
            ] }) : posters.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center rounded-3xl border border-white/[0.07] bg-white/[0.02] py-24 text-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SearchX, { className: "h-10 w-10 text-muted-foreground/60" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-lg font-semibold", children: "Nothing matches those filters" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 max-w-sm text-sm text-muted-foreground", children: hasActiveFilters ? "The providers returned nothing for this combination. Reset the filters, or widen one of them." : "No provider returned a title for this genre. Try another one." }),
              hasActiveFilters && /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: resetFilters, className: cn(PAGER_CLASS, "mt-6"), children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { className: "h-4 w-4" }),
                "Reset filters"
              ] })
            ] }) : (
              /* No `preview`: the hover video resolves against an AniList anime id,
                 and manga ids live in a different namespace. See `PosterItem`. */
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: cn(
                    POSTER_GRID_CLASS,
                    discoverQuery.isFetching && !discoverQuery.isFetchingNextPage && "opacity-70 transition-opacity"
                  ),
                  children: posters.map((item, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(PosterCard, { item, eager: index < 7 }, item.key))
                }
              )
            ) }),
            !isAdultGenreLocked && discoverQuery.hasNextPage && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-14 flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => discoverQuery.fetchNextPage(),
                disabled: discoverQuery.isFetchingNextPage,
                className: PAGER_CLASS,
                children: discoverQuery.isFetchingNextPage ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }),
                  "Loading"
                ] }) : "Load more titles"
              }
            ) })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(MobileNav, {})
  ] });
}
export {
  MangaGenreBrowsePage as default
};
