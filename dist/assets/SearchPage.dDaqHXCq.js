import { l as useSearchParams, i as useParams, e as useNavigate, r as reactExports, j as jsxRuntimeExports } from "./react-vendor.CAo4XUiA.js";
import { D as useIsNativeApp, s as useIsMobile, ba as celebrate, ap as useContentSafetySettings, bb as isExplicitMangaSearchQuery, bc as useInfiniteSearch, bd as useInfiniteMangaSearch, ar as inferMangaAdultFlag, be as useAniListCharacterSearch, bf as useEpisodeTitleSearch, aF as inferAnimeAdultFlag, Q as Background, S as Sidebar, az as Input, j as cn, Y as DropdownMenu, Z as DropdownMenuTrigger, _ as DropdownMenuContent, $ as DropdownMenuItem, G as GlassPanel, bg as UnifiedMediaCard, aj as ANILIST_GRAPHQL_ENDPOINT, bh as extensionRegistry, ab as resolveApiV3Base, bi as fetchProducerAnimes } from "./index.C6yfkT5T.js";
import { M as MobileNav } from "./MobileNav.ABHzkhTQ.js";
import { u as useAniListGenres } from "./useAniListGenres.D0-w-cUA.js";
import { a as useQuery, c as useInfiniteQuery } from "./tanstack.DPr3OB19.js";
import "./vendor.CJyRs4QS.js";
import { D as DiscoverHero } from "./DiscoverHero.Jceha_sb.js";
import { P as PillGroup } from "./PillGroup.CcXbIR07.js";
import { u as useDiscoverMedia, D as DISCOVER_SORTS, c as controlTriggerClass, a as controlMenuClass, b as controlItemClass, d as discoverYears, P as PosterGridSkeleton, e as POSTER_GRID_CLASS } from "./DiscoverPosterGrid.CIdiGIb1.js";
import { S as Search, X, Z as Film, B as BookOpen, N as ChevronDown, c as Check, Q as LoaderCircle, cf as Tag, bo as SlidersHorizontal, cg as Tags, aJ as Play, aS as Puzzle, v as ArrowRight, g as User, b as ChevronRight } from "./icons.C2gBBarQ.js";
import "./supabase.WuRMX5Dg.js";
import "./radix.BiK9uYXL.js";
import "./motion.DVGLRFCH.js";
import "./hls.BlgtCWcq.js";
import "./editor.Dxw8dtyw.js";
import "./charts.Dr1fgDJ-.js";
import "./RankedPosterRail.BR6TE-Dw.js";
import "./useHoverPreview.Cs_Lh1vM.js";
function useExtensionSearch(query, enabled) {
  return useQuery({
    queryKey: ["extension-search", query],
    queryFn: async () => {
      const providers = extensionRegistry.getSearchProviders();
      const results = await Promise.all(
        providers.map(async (provider) => {
          try {
            const providerResults = await provider.search(query);
            return providerResults.map((r) => ({ ...r, providerName: provider.name }));
          } catch (err) {
            console.error(`Search provider ${provider.name} failed:`, err);
            return [];
          }
        })
      );
      return results.flat();
    },
    enabled: enabled && query.length > 2,
    staleTime: 5 * 60 * 1e3
  });
}
function SearchPage() {
  const [searchParams] = useSearchParams();
  const { producerName } = useParams();
  const navigate = useNavigate();
  const isNative = useIsNativeApp();
  const isMobile = useIsMobile();
  const decodedProducerName = reactExports.useMemo(() => {
    if (!producerName) return "";
    try {
      return decodeURIComponent(producerName).trim();
    } catch {
      return producerName.trim();
    }
  }, [producerName]);
  const isProducerRoute = decodedProducerName.length > 0;
  const producerRequestCandidates = reactExports.useMemo(() => {
    if (!decodedProducerName) return [];
    const slug = decodedProducerName.toLowerCase().replace(/&/g, " and ").replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "");
    return Array.from(new Set([decodedProducerName, slug].map((value) => value.trim()).filter(Boolean)));
  }, [decodedProducerName]);
  const queryParam = searchParams.get("q") || decodedProducerName || "";
  const [query, setQuery] = reactExports.useState(queryParam);
  const [searchInput, setSearchInput] = reactExports.useState(queryParam);
  const firedPhraseRef = reactExports.useRef("");
  reactExports.useEffect(() => {
    const SECRET = {
      tatakai: "petal",
      "over 9000": "spark",
      konami: "confetti",
      "plus ultra": "spark"
    };
    const normalized = searchInput.trim().toLowerCase().replace(/\s+/g, " ");
    if (normalized in SECRET) {
      if (firedPhraseRef.current !== normalized) {
        firedPhraseRef.current = normalized;
        celebrate({ variant: SECRET[normalized], count: 22 });
      }
    } else {
      firedPhraseRef.current = "";
    }
  }, [searchInput]);
  const [page, setPage] = reactExports.useState(1);
  const [resultType, setResultType] = reactExports.useState(() => {
    const t = searchParams.get("type");
    if (t === "manga") return "manga";
    if (t === "anime") return "anime";
    if (t === "character") return "character";
    return "all";
  });
  const [enableSecondaryResultStreams, setEnableSecondaryResultStreams] = reactExports.useState(false);
  const [animeTypeFilter, setAnimeTypeFilter] = reactExports.useState("all");
  const [animeStatusFilter, setAnimeStatusFilter] = reactExports.useState("all");
  const [animeGenreFilter, setAnimeGenreFilter] = reactExports.useState("all");
  const [animeSortFilter, setAnimeSortFilter] = reactExports.useState("default");
  const [mangaTypeFilter, setMangaTypeFilter] = reactExports.useState("all");
  const [mangaStatusFilter, setMangaStatusFilter] = reactExports.useState("all");
  const [mangaOrigin, setMangaOrigin] = reactExports.useState("all");
  const [mangaGenreFilter, setMangaGenreFilter] = reactExports.useState(() => {
    const g = searchParams.get("genre");
    return g ? g.trim() : "all";
  });
  const [mangaAdultFilter, setMangaAdultFilter] = reactExports.useState(false);
  const [minRating, setMinRating] = reactExports.useState(0);
  const [minReleaseYear, setMinReleaseYear] = reactExports.useState(0);
  const [maxRating, setMaxRating] = reactExports.useState(0);
  const [maxReleaseYear, setMaxReleaseYear] = reactExports.useState(0);
  const [seasonFilter, setSeasonFilter] = reactExports.useState("all");
  const [minEpisodes, setMinEpisodes] = reactExports.useState(0);
  const [maxEpisodes, setMaxEpisodes] = reactExports.useState(0);
  const [sortMode, setSortMode] = reactExports.useState("relevance");
  const [discoverSort, setDiscoverSort] = reactExports.useState("for-you");
  const handleDiscoverSortChange = (newSort) => {
    setDiscoverSort(newSort);
    if (newSort === "for-you") {
      setSortMode("relevance");
      setAnimeSortFilter("default");
    } else if (newSort === "top-rated") {
      setSortMode("rating");
      setAnimeSortFilter("score_desc");
    } else if (newSort === "newest") {
      setSortMode("relevance");
      setAnimeSortFilter("start_date_desc");
    } else if (newSort === "a-z") {
      setSortMode("title");
      setAnimeSortFilter("title_asc");
    }
  };
  const [imageConfidenceThreshold, setImageConfidenceThreshold] = reactExports.useState(0.85);
  const [showAdvancedAssist, setShowAdvancedAssist] = reactExports.useState(false);
  const [selectedAnimeTags, setSelectedAnimeTags] = reactExports.useState(() => {
    var _a;
    const values = searchParams.getAll("animeTag");
    const packed = searchParams.get("animeTags");
    const typeParam = searchParams.get("type");
    const generic = typeParam !== "manga" ? searchParams.getAll("tag").concat(((_a = searchParams.get("tags")) == null ? void 0 : _a.split(",")) ?? []) : [];
    return Array.from(new Set([...values, ...packed ? packed.split(",") : [], ...generic].filter(Boolean)));
  });
  const [selectedMangaTags, setSelectedMangaTags] = reactExports.useState(() => {
    var _a;
    const values = searchParams.getAll("mangaTag").concat(searchParams.getAll("manwhaTag"));
    const packed = searchParams.get("mangaTags") || searchParams.get("manwhaTags");
    const typeParam = searchParams.get("type");
    const generic = typeParam === "manga" ? searchParams.getAll("tag").concat(((_a = searchParams.get("tags")) == null ? void 0 : _a.split(",")) ?? []) : [];
    return Array.from(new Set([...values, ...packed ? packed.split(",") : [], ...generic].filter(Boolean)));
  });
  const [tagSearch, setTagSearch] = reactExports.useState("");
  const [mangaTagSearch, setMangaTagSearch] = reactExports.useState("");
  const [showSpoilerTags, setShowSpoilerTags] = reactExports.useState(false);
  const { data: anilistTags = [] } = useQuery({
    queryKey: ["anilist-media-tags"],
    queryFn: async () => {
      const response = await fetch(`${resolveApiV3Base()}/content/tags`);
      if (!response.ok) return [];
      const payload = await response.json();
      return Array.isArray(payload == null ? void 0 : payload.data) ? payload.data : [];
    },
    staleTime: 24 * 60 * 60 * 1e3,
    enabled: showAdvancedAssist
  });
  const [localAnimeType, setLocalAnimeType] = reactExports.useState(animeTypeFilter);
  const [localAnimeStatus, setLocalAnimeStatus] = reactExports.useState(animeStatusFilter);
  const [localAnimeGenre, setLocalAnimeGenre] = reactExports.useState(animeGenreFilter);
  const [localAnimeSort, setLocalAnimeSort] = reactExports.useState(animeSortFilter);
  const [localMangaType, setLocalMangaType] = reactExports.useState(mangaTypeFilter);
  const [localMangaStatus, setLocalMangaStatus] = reactExports.useState(mangaStatusFilter);
  const [localMangaOrigin, setLocalMangaOrigin] = reactExports.useState(mangaOrigin);
  const [localMangaGenre, setLocalMangaGenre] = reactExports.useState(mangaGenreFilter);
  const [localMinRating, setLocalMinRating] = reactExports.useState(minRating);
  const [localMinReleaseYear, setLocalMinReleaseYear] = reactExports.useState(minReleaseYear);
  const [localMaxRating, setLocalMaxRating] = reactExports.useState(maxRating);
  const [localMaxReleaseYear, setLocalMaxReleaseYear] = reactExports.useState(maxReleaseYear);
  const [localSeason, setLocalSeason] = reactExports.useState(seasonFilter);
  const [localMinEpisodes, setLocalMinEpisodes] = reactExports.useState(minEpisodes);
  const [localMaxEpisodes, setLocalMaxEpisodes] = reactExports.useState(maxEpisodes);
  const [localSortMode, setLocalSortMode] = reactExports.useState(sortMode);
  const [localMangaAdult, setLocalMangaAdult] = reactExports.useState(mangaAdultFilter);
  const applyFilters = () => {
    setAnimeTypeFilter(localAnimeType);
    setAnimeStatusFilter(localAnimeStatus);
    const sharedGenre = localAnimeGenre !== "all" ? localAnimeGenre : localMangaGenre;
    setAnimeGenreFilter(sharedGenre);
    setLocalAnimeGenre(sharedGenre);
    setMangaGenreFilter(sharedGenre);
    setLocalMangaGenre(sharedGenre);
    setAnimeSortFilter(localAnimeSort);
    setMangaTypeFilter(localMangaType);
    setMangaStatusFilter(localMangaStatus);
    setMangaOrigin(localMangaOrigin);
    setMinRating(localMinRating);
    setMinReleaseYear(localMinReleaseYear);
    setMaxRating(localMaxRating);
    setMaxReleaseYear(localMaxReleaseYear);
    setSeasonFilter(localSeason);
    setMinEpisodes(localMinEpisodes);
    setMaxEpisodes(localMaxEpisodes);
    setSortMode(localSortMode);
    setMangaAdultFilter(localMangaAdult);
    setPage(1);
  };
  reactExports.useEffect(() => {
    setLocalAnimeType(animeTypeFilter);
    setLocalAnimeStatus(animeStatusFilter);
    setLocalAnimeGenre(animeGenreFilter);
    setLocalAnimeSort(animeSortFilter);
    setLocalMangaType(mangaTypeFilter);
    setLocalMangaStatus(mangaStatusFilter);
    setLocalMangaOrigin(mangaOrigin);
    setLocalMangaGenre(mangaGenreFilter);
    setLocalMinRating(minRating);
    setLocalMinReleaseYear(minReleaseYear);
    setLocalMaxRating(maxRating);
    setLocalMaxReleaseYear(maxReleaseYear);
    setLocalSeason(seasonFilter);
    setLocalMinEpisodes(minEpisodes);
    setLocalMaxEpisodes(maxEpisodes);
    setLocalSortMode(sortMode);
    setLocalMangaAdult(mangaAdultFilter);
  }, [
    animeTypeFilter,
    animeStatusFilter,
    animeGenreFilter,
    animeSortFilter,
    mangaTypeFilter,
    mangaStatusFilter,
    mangaOrigin,
    mangaGenreFilter,
    minRating,
    minReleaseYear,
    maxRating,
    maxReleaseYear,
    seasonFilter,
    minEpisodes,
    maxEpisodes,
    sortMode,
    mangaAdultFilter
  ]);
  const shouldSearchAnime = resultType === "all" || resultType === "anime";
  const shouldSearchManga = (resultType === "all" || resultType === "manga") && !isProducerRoute;
  const shouldSearchCharacters = (resultType === "all" || resultType === "character") && !isProducerRoute;
  const shouldDelaySecondaryStreams = resultType === "all" && query.length > 0 && !isProducerRoute;
  const shouldEnableCharacterSearch = shouldSearchCharacters && (!shouldDelaySecondaryStreams || enableSecondaryResultStreams);
  const { settings: contentSafetySettings } = useContentSafetySettings();
  const { genres: anilistGenres } = useAniListGenres();
  const groupTagOptions = reactExports.useCallback((term) => {
    const needle = term.trim().toLowerCase();
    const rows = anilistTags.filter((tag) => !tag.isAdult || contentSafetySettings.showAdultEverywhere).filter((tag) => showSpoilerTags || !tag.isGeneralSpoiler).filter((tag) => {
      var _a;
      return !needle || tag.name.toLowerCase().includes(needle) || ((_a = tag.category) == null ? void 0 : _a.toLowerCase().includes(needle));
    });
    const buckets = /* @__PURE__ */ new Map();
    for (const tag of rows) {
      const category = (tag.category || "Other").trim() || "Other";
      const bucket = buckets.get(category);
      if (bucket) bucket.push(tag);
      else buckets.set(category, [tag]);
    }
    return Array.from(buckets.entries()).map(([category, tags]) => ({
      category,
      tags: tags.slice().sort((a, b) => a.name.localeCompare(b.name))
    })).sort((a, b) => a.category.localeCompare(b.category));
  }, [anilistTags, contentSafetySettings.showAdultEverywhere, showSpoilerTags]);
  const filteredTagOptions = reactExports.useMemo(() => groupTagOptions(tagSearch), [groupTagOptions, tagSearch]);
  const filteredMangaTagOptions = reactExports.useMemo(() => groupTagOptions(mangaTagSearch), [groupTagOptions, mangaTagSearch]);
  const explicitMangaQuery = reactExports.useMemo(() => isExplicitMangaSearchQuery(query), [query]);
  const allowAdultAnime = reactExports.useMemo(
    () => contentSafetySettings.showAdultEverywhere || explicitMangaQuery,
    [contentSafetySettings.showAdultEverywhere, explicitMangaQuery]
  );
  const animeFilterActive = reactExports.useMemo(() => {
    return animeTypeFilter !== "all" || animeStatusFilter !== "all" || animeGenreFilter !== "all" || animeSortFilter !== "default" || minRating > 0 || minReleaseYear > 0 || maxRating > 0 || maxReleaseYear > 0 || seasonFilter !== "all" || minEpisodes > 0 || maxEpisodes > 0 || selectedAnimeTags.length > 0;
  }, [
    animeTypeFilter,
    animeStatusFilter,
    animeGenreFilter,
    animeSortFilter,
    minRating,
    minReleaseYear,
    maxRating,
    maxReleaseYear,
    seasonFilter,
    minEpisodes,
    maxEpisodes,
    selectedAnimeTags
  ]);
  const animeGenreOptions = reactExports.useMemo(() => {
    const normalizeGenreValue = (value) => {
      const normalized = String(value || "").toLowerCase().trim();
      if (!normalized) return "";
      if (normalized === "mahou shoujo") return "magic";
      return normalized.replace(/&/g, "-and-").replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-");
    };
    return anilistGenres.map((genre) => ({
      label: genre,
      value: normalizeGenreValue(genre)
    })).filter((option, index, rows) => {
      if (!option.value) return false;
      return rows.findIndex((row) => row.value === option.value) === index;
    });
  }, [anilistGenres]);
  reactExports.useCallback((value) => {
    const normalized = String(value || "").toLowerCase().replace(/[_\s]+/g, "-");
    if (normalized.includes("finished") || normalized.includes("completed")) return "finished-airing";
    if (normalized.includes("currently") || normalized === "airing" || normalized.includes("releasing")) return "currently-airing";
    if (normalized.includes("not-yet") || normalized.includes("upcoming")) return "not-yet-aired";
    return normalized;
  }, []);
  reactExports.useCallback((value) => {
    const normalized = String(value || "").toLowerCase().trim();
    if (!normalized) return "";
    if (normalized === "mahou shoujo") return "magic";
    return normalized.replace(/&/g, "-and-").replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-");
  }, []);
  const resolvedAnimeGenre = reactExports.useMemo(() => {
    if (animeGenreFilter === "all") return void 0;
    const match = animeGenreOptions.find((genre) => genre.value === animeGenreFilter);
    return (match == null ? void 0 : match.label) ?? animeGenreFilter;
  }, [animeGenreFilter, animeGenreOptions]);
  const resolvedMangaGenre = reactExports.useMemo(() => {
    if (mangaGenreFilter === "all") return void 0;
    const match = animeGenreOptions.find((genre) => genre.value === mangaGenreFilter);
    if (match == null ? void 0 : match.label) return match.label;
    return String(mangaGenreFilter).split(/[-_\s]+/).filter(Boolean).map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join(" ");
  }, [mangaGenreFilter, animeGenreOptions]);
  const genreFilterActive = animeGenreFilter !== "all" || mangaGenreFilter !== "all";
  const tagFilterActive = selectedAnimeTags.length > 0 || selectedMangaTags.length > 0;
  const mangaFilterActive = reactExports.useMemo(() => {
    return mangaGenreFilter !== "all" || mangaTypeFilter !== "all" || mangaStatusFilter !== "all" || mangaOrigin !== "all" || mangaAdultFilter;
  }, [mangaGenreFilter, mangaTypeFilter, mangaStatusFilter, mangaAdultFilter]);
  const shouldEnableMangaSearch = shouldSearchManga && (query.length > 0 || mangaFilterActive || genreFilterActive || tagFilterActive) && (!shouldDelaySecondaryStreams || enableSecondaryResultStreams || genreFilterActive || mangaFilterActive || tagFilterActive);
  const normalizedMangaTypeFilter = reactExports.useMemo(() => {
    const normalized = String(mangaTypeFilter || "").toLowerCase();
    if (normalized === "manwha" || normalized === "manwah") return "manhwa";
    return normalized;
  }, [mangaTypeFilter]);
  const mangaSearchMode = reactExports.useMemo(() => {
    if (query.trim()) return "search";
    if (mangaGenreFilter !== "all") return "genre";
    if (normalizedMangaTypeFilter !== "all" && !query.trim()) return "category";
    if (mangaAdultFilter) {
      return "explore";
    }
    return "search";
  }, [
    mangaGenreFilter,
    normalizedMangaTypeFilter,
    query,
    mangaAdultFilter
  ]);
  const animeBackendFilters = reactExports.useMemo(() => {
    const filters = {};
    if (animeTypeFilter !== "all") filters.type = animeTypeFilter;
    if (animeStatusFilter !== "all") filters.status = animeStatusFilter;
    if (resolvedAnimeGenre) filters.genres = [resolvedAnimeGenre];
    if (animeSortFilter !== "default") filters.sort = animeSortFilter;
    if (minRating > 0) filters.minRating = minRating;
    if (minReleaseYear > 0) filters.minReleaseYear = minReleaseYear;
    if (maxRating > 0) filters.maxRating = maxRating;
    if (maxReleaseYear > 0) filters.maxReleaseYear = maxReleaseYear;
    if (seasonFilter !== "all") filters.season = seasonFilter;
    if (minEpisodes > 0) filters.minEpisodes = minEpisodes;
    if (maxEpisodes > 0) filters.maxEpisodes = maxEpisodes;
    if (selectedAnimeTags.length > 0) filters.tags = selectedAnimeTags;
    filters.isAdult = allowAdultAnime ? true : false;
    return filters;
  }, [
    animeTypeFilter,
    animeStatusFilter,
    animeGenreFilter,
    animeSortFilter,
    minRating,
    minReleaseYear,
    maxRating,
    maxReleaseYear,
    seasonFilter,
    minEpisodes,
    maxEpisodes,
    allowAdultAnime,
    selectedAnimeTags
  ]);
  const mangaSearchOptions = reactExports.useMemo(() => {
    const types = [];
    if (normalizedMangaTypeFilter !== "all") {
      if (normalizedMangaTypeFilter === "manga") types.push("Manga");
      if (normalizedMangaTypeFilter === "manhwa") types.push("Manwha");
      if (normalizedMangaTypeFilter === "manhua") types.push("Manhua");
      if (normalizedMangaTypeFilter === "comics") types.push("OEL");
    }
    const hasGenre = Boolean(resolvedMangaGenre);
    return {
      mode: hasGenre ? "genre" : mangaSearchMode,
      provider: "all",
      genre: resolvedMangaGenre,
      tags: selectedMangaTags,
      origin: mangaOrigin === "all" ? void 0 : mangaOrigin,
      sort: hasGenre ? "POPULARITY_DESC" : void 0,
      adult: mangaAdultFilter || explicitMangaQuery || contentSafetySettings.showAdultEverywhere,
      types: types.length > 0 ? Array.from(new Set(types)) : void 0,
      mangaType: normalizedMangaTypeFilter !== "all" ? normalizedMangaTypeFilter : void 0,
      // Allow genre-only AniList browse (no text query required)
      requiresQuery: !(hasGenre || selectedMangaTags.length > 0 || mangaOrigin !== "all" || mangaSearchMode === "genre" || mangaSearchMode === "explore" || mangaSearchMode === "latest" || mangaSearchMode === "category")
    };
  }, [
    mangaSearchMode,
    resolvedMangaGenre,
    mangaAdultFilter,
    explicitMangaQuery,
    contentSafetySettings.showAdultEverywhere,
    normalizedMangaTypeFilter,
    selectedMangaTags,
    mangaOrigin
  ]);
  const atsuGenreOptions = reactExports.useMemo(() => {
    return [
      "Action",
      "Adventure",
      "Comedy",
      "Drama",
      "Ecchi",
      "Fantasy",
      "Hentai",
      "Horror",
      "Mahou Shoujo",
      "Mecha",
      "Music",
      "Mystery",
      "Psychological",
      "Romance",
      "Sci-Fi",
      "Slice of Life",
      "Sports",
      "Supernatural",
      "Thriller",
      // Common manga-specific tags promoted to top-level options
      "Isekai",
      "Shounen",
      "Shoujo",
      "Seinen",
      "Josei",
      "Martial Arts",
      "Historical",
      "School",
      "Supernatural",
      "Demons",
      "Game",
      "Harem",
      "Military",
      "Parody",
      "Police",
      "Samurai",
      "Space",
      "Super Power",
      "Vampire",
      "Yaoi",
      "Yuri"
    ].filter((g, i, arr) => arr.indexOf(g) === i).sort().map((genre) => ({
      label: genre,
      value: genre.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")
    }));
  }, []);
  const shouldEnableAnimeSearch = shouldSearchAnime && !isProducerRoute && (query.length > 0 || animeFilterActive || genreFilterActive || tagFilterActive);
  const {
    data: infiniteData,
    fetchNextPage: fetchNextSearchPage,
    hasNextPage: hasNextSearchPage,
    isFetchingNextPage: isFetchingNextSearchPage,
    isLoading: isLoadingSearch
  } = useInfiniteSearch(query, animeBackendFilters, shouldEnableAnimeSearch, animeFilterActive || selectedAnimeTags.length > 0);
  const {
    data: producerInfiniteData,
    fetchNextPage: fetchNextProducerPage,
    hasNextPage: hasNextProducerPage,
    isFetchingNextPage: isFetchingNextProducerPage,
    isLoading: isLoadingProducer
  } = useInfiniteQuery({
    queryKey: ["producer-search-infinite", producerRequestCandidates],
    queryFn: async ({ pageParam = 1 }) => {
      for (const candidate of producerRequestCandidates) {
        try {
          const response = await fetchProducerAnimes(candidate, Number(pageParam));
          if (Array.isArray(response == null ? void 0 : response.animes) && response.animes.length > 0) {
            return response;
          }
        } catch {
        }
      }
      return {
        producerName: decodedProducerName,
        animes: [],
        top10Animes: { today: [], week: [], month: [] },
        topAiringAnimes: [],
        currentPage: Number(pageParam),
        totalPages: Number(pageParam),
        hasNextPage: false
      };
    },
    getNextPageParam: (lastPage) => {
      if (!lastPage || !lastPage.hasNextPage) return void 0;
      return lastPage.currentPage + 1;
    },
    initialPageParam: 1,
    enabled: shouldSearchAnime && isProducerRoute && producerRequestCandidates.length > 0,
    staleTime: 2 * 60 * 1e3
  });
  const hasNextAnimePage = isProducerRoute ? hasNextProducerPage : hasNextSearchPage;
  const isFetchingNextAnimePage = isProducerRoute ? isFetchingNextProducerPage : isFetchingNextSearchPage;
  const isLoadingAnime = isProducerRoute ? isLoadingProducer : isLoadingSearch;
  const {
    data: infiniteMangaData,
    fetchNextPage: fetchNextMangaPage,
    hasNextPage: hasNextMangaPage,
    isFetchingNextPage: isFetchingNextMangaPage,
    isLoading: isLoadingManga
  } = useInfiniteMangaSearch(query, 20, shouldEnableMangaSearch, mangaSearchOptions);
  const { data: extensionResults, isLoading: isLoadingExtensions } = useExtensionSearch(query, resultType === "all" || resultType === "anime");
  const observer = reactExports.useRef();
  const loadMoreLockRef = reactExports.useRef(false);
  const scrollRef = reactExports.useCallback((node) => {
    if (isLoadingAnime || isLoadingManga) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;
      if (!entry.isIntersecting) {
        loadMoreLockRef.current = false;
        return;
      }
      if (loadMoreLockRef.current) {
        return;
      }
      let didRequestNextPage = false;
      if (resultType === "anime") {
        if (hasNextAnimePage && !isFetchingNextAnimePage) {
          if (isProducerRoute) {
            fetchNextProducerPage();
          } else {
            fetchNextSearchPage();
          }
          didRequestNextPage = true;
        }
      } else if (resultType === "manga") {
        if (hasNextMangaPage && !isFetchingNextMangaPage) {
          fetchNextMangaPage();
          didRequestNextPage = true;
        }
      } else {
        if (hasNextAnimePage && !isFetchingNextAnimePage) {
          if (isProducerRoute) {
            fetchNextProducerPage();
          } else {
            fetchNextSearchPage();
          }
          didRequestNextPage = true;
        } else if (hasNextMangaPage && !isFetchingNextMangaPage) {
          fetchNextMangaPage();
          didRequestNextPage = true;
        }
      }
      if (didRequestNextPage) {
        loadMoreLockRef.current = true;
      }
    }, { rootMargin: "120px 0px" });
    if (node) observer.current.observe(node);
  }, [isLoadingAnime, hasNextAnimePage, isFetchingNextAnimePage, isProducerRoute, fetchNextProducerPage, fetchNextSearchPage, isLoadingManga, hasNextMangaPage, isFetchingNextMangaPage, fetchNextMangaPage, resultType]);
  const allAnimeResults = reactExports.useMemo(() => {
    if (isProducerRoute) {
      return (producerInfiniteData == null ? void 0 : producerInfiniteData.pages.flatMap((page2) => page2.animes)) || [];
    }
    return (infiniteData == null ? void 0 : infiniteData.pages.flatMap((page2) => page2.animes)) || [];
  }, [infiniteData, isProducerRoute, producerInfiniteData]);
  const allMangaResults = reactExports.useMemo(() => {
    return ((infiniteMangaData == null ? void 0 : infiniteMangaData.pages) || []).flatMap((page2) => {
      const results = Array.isArray(page2 == null ? void 0 : page2.results) ? page2.results : [];
      return results.map((manga) => {
        var _a, _b, _c;
        const fallbackTitle = (manga == null ? void 0 : manga.canonicalTitle) || ((_a = manga == null ? void 0 : manga.title) == null ? void 0 : _a.english) || ((_b = manga == null ? void 0 : manga.title) == null ? void 0 : _b.romaji) || ((_c = manga == null ? void 0 : manga.title) == null ? void 0 : _c.native);
        const normalizedId = (manga == null ? void 0 : manga.tatakaiId) || (manga == null ? void 0 : manga.id) || ((manga == null ? void 0 : manga.anilistId) ? `anilist:${manga.anilistId}` : (manga == null ? void 0 : manga.malId) ? `mal:${manga.malId}` : null);
        if (!normalizedId || !fallbackTitle) return null;
        return {
          id: String(normalizedId),
          name: fallbackTitle,
          poster: (manga == null ? void 0 : manga.poster) || "",
          type: (manga == null ? void 0 : manga.type) || (manga == null ? void 0 : manga.mediaType) || "manga",
          status: (manga == null ? void 0 : manga.status) || void 0,
          year: typeof (manga == null ? void 0 : manga.year) === "number" ? manga.year : void 0,
          popularity: typeof (manga == null ? void 0 : manga.popularity) === "number" ? manga.popularity : void 0,
          providersAvailable: Array.isArray(manga == null ? void 0 : manga.providersAvailable) ? manga.providersAvailable : [],
          rating: typeof (manga == null ? void 0 : manga.score) === "number" ? (manga.score / 10).toFixed(1) : void 0,
          chapters: typeof (manga == null ? void 0 : manga.chapters) === "number" && manga.chapters > 0 ? manga.chapters : void 0,
          volumes: typeof (manga == null ? void 0 : manga.volumes) === "number" && manga.volumes > 0 ? manga.volumes : void 0,
          genres: Array.isArray(manga == null ? void 0 : manga.genres) ? manga.genres : [],
          providerSource: typeof (manga == null ? void 0 : manga.providerSource) === "string" ? manga.providerSource : void 0,
          originLanguage: typeof (manga == null ? void 0 : manga.originLanguage) === "string" ? manga.originLanguage.toLowerCase() : void 0,
          malId: typeof (manga == null ? void 0 : manga.malId) === "number" ? manga.malId : void 0,
          anilistId: typeof (manga == null ? void 0 : manga.anilistId) === "number" ? manga.anilistId : void 0,
          isAdult: inferMangaAdultFlag(manga)
        };
      }).filter(Boolean);
    });
  }, [infiniteMangaData]);
  const { data: aniListCharacterSearch, isLoading: loadingAniListCharacters } = useAniListCharacterSearch(query);
  const characterResults = reactExports.useMemo(() => {
    return aniListCharacterSearch || [];
  }, [aniListCharacterSearch]);
  const loadingCharacters = loadingAniListCharacters;
  const showEpisodeSearch = (resultType === "all" || resultType === "anime") && query.trim().length >= 3;
  const { data: episodeTitleResults = [] } = useEpisodeTitleSearch(query, showEpisodeSearch);
  const [selectedFile, setSelectedFile] = reactExports.useState(null);
  const [imageResults, setImageResults] = reactExports.useState(null);
  const [isSearchingImage, setIsSearchingImage] = reactExports.useState(false);
  const filteredAnimeResults = allAnimeResults || [];
  const normalizeMangaStatus = (status) => {
    const normalized = String(status || "").toLowerCase();
    if (normalized.includes("ongoing") || normalized.includes("releasing")) return "ongoing";
    if (normalized.includes("completed") || normalized.includes("finished")) return "completed";
    if (normalized.includes("hiatus")) return "hiatus";
    if (normalized.includes("cancel")) return "cancelled";
    if (normalized.includes("unreleased") || normalized.includes("not_yet")) return "unreleased";
    return "unknown";
  };
  const normalizeSearchText = (value) => String(value || "").toLowerCase().replace(/[^a-z0-9\s]/g, " ").replace(/\s+/g, " ").trim();
  const mangaSearchTokens = reactExports.useMemo(
    () => normalizeSearchText(query).split(" ").filter((token) => token.length >= 3),
    [query]
  );
  const isAdultTitleSearchIntent = reactExports.useCallback(
    (manga) => {
      var _a;
      if (mangaSearchTokens.length === 0) return false;
      const title = normalizeSearchText((manga == null ? void 0 : manga.name) || (manga == null ? void 0 : manga.canonicalTitle) || ((_a = manga == null ? void 0 : manga.title) == null ? void 0 : _a.english) || "");
      if (!title) return false;
      return mangaSearchTokens.every((token) => title.includes(token));
    },
    [mangaSearchTokens]
  );
  const filteredMangaResults = (allMangaResults || []).filter((manga) => {
    const mangaType = (manga.type || "").toLowerCase();
    const mangaRating = Number.parseFloat(manga.rating || "0");
    const isAdult = Boolean(manga.isAdult);
    const statusValue = normalizeMangaStatus(manga.status);
    const genres = Array.isArray(manga.genres) ? manga.genres.map((genre) => String(genre || "").toLowerCase()) : [];
    const allowAdultByIntent = mangaAdultFilter || explicitMangaQuery || isAdultTitleSearchIntent(manga) || query.trim().length > 0;
    if (isAdult && !contentSafetySettings.showAdultEverywhere && !allowAdultByIntent) return false;
    if (normalizedMangaTypeFilter !== "all" && mangaType !== normalizedMangaTypeFilter) return false;
    if (mangaStatusFilter !== "all" && statusValue !== mangaStatusFilter) return false;
    if (mangaGenreFilter !== "all" && genres.length > 0 && !genres.includes(mangaGenreFilter.toLowerCase())) {
      return false;
    }
    if (mangaRating > 0 && mangaRating < minRating) return false;
    if (minReleaseYear > 0 && Number(manga.year || 0) > 0 && Number(manga.year) < minReleaseYear) {
      return false;
    }
    return true;
  });
  const unifiedResults = reactExports.useMemo(() => {
    const arr = [];
    if (resultType === "all" || resultType === "anime") {
      arr.push(
        ...filteredAnimeResults.map((a) => {
          const isAdult = inferAnimeAdultFlag(a);
          return {
            ...a,
            mediaType: "anime",
            isAdult,
            // Mirror the manga blur: mature anime only reach here on an explicit
            // query (safe mode hides them server-side), so blur those covers.
            blurAdult: isAdult && !contentSafetySettings.showAdultEverywhere && explicitMangaQuery && contentSafetySettings.blurAdultInSearch
          };
        })
      );
    }
    if (resultType === "all" || resultType === "manga") {
      arr.push(
        ...filteredMangaResults.map((m) => ({
          ...m,
          mediaType: "manga",
          blurAdult: Boolean(m.isAdult) && !contentSafetySettings.showAdultEverywhere && (explicitMangaQuery || mangaAdultFilter || isAdultTitleSearchIntent(m) || query.trim().length > 0) && contentSafetySettings.blurAdultInSearch
        }))
      );
    }
    if (sortMode === "relevance") return arr;
    const sorted = [...arr].sort((a, b) => {
      if (sortMode === "rating") {
        return Number(b.rating || 0) - Number(a.rating || 0);
      }
      if (sortMode === "title") {
        return String(a.name || "").localeCompare(String(b.name || ""));
      }
      if (sortMode === "popularity") {
        return Number(b.popularity || 0) - Number(a.popularity || 0);
      }
      return 0;
    });
    return sorted;
  }, [
    filteredAnimeResults,
    filteredMangaResults,
    resultType,
    sortMode,
    contentSafetySettings.showAdultEverywhere,
    contentSafetySettings.blurAdultInSearch,
    explicitMangaQuery,
    mangaAdultFilter,
    isAdultTitleSearchIntent,
    query
  ]);
  const activeFilterCount = reactExports.useMemo(() => {
    return [
      animeTypeFilter !== "all",
      animeStatusFilter !== "all",
      animeGenreFilter !== "all",
      animeSortFilter !== "default",
      mangaTypeFilter !== "all",
      mangaStatusFilter !== "all",
      mangaGenreFilter !== "all",
      mangaOrigin !== "all",
      mangaAdultFilter,
      minRating > 0,
      minReleaseYear > 0,
      selectedAnimeTags.length > 0 || selectedMangaTags.length > 0,
      sortMode !== "relevance"
    ].filter(Boolean).length;
  }, [
    animeTypeFilter,
    animeStatusFilter,
    animeGenreFilter,
    animeSortFilter,
    mangaTypeFilter,
    mangaStatusFilter,
    mangaGenreFilter,
    mangaOrigin,
    mangaAdultFilter,
    minRating,
    minReleaseYear,
    selectedAnimeTags,
    selectedMangaTags,
    sortMode
  ]);
  const filteredImageResults = (imageResults || []).filter((result) => {
    return Number((result == null ? void 0 : result.similarity) || 0) >= imageConfidenceThreshold;
  });
  const handleImageSearch = async () => {
    var _a, _b, _c, _d, _e, _f;
    if (!selectedFile) return;
    setIsSearchingImage(true);
    setImageResults(null);
    try {
      const formData = new FormData();
      formData.append("image", selectedFile);
      const response = await fetch("https://api.trace.moe/search", {
        method: "POST",
        body: formData
      });
      if (!response.ok) throw new Error("Search failed");
      const data = await response.json();
      const rawResults = data.result || [];
      const bestByAnilist = /* @__PURE__ */ new Map();
      for (const r of rawResults) {
        const existing = bestByAnilist.get(r.anilist);
        if (!existing || r.similarity > existing.similarity) {
          bestByAnilist.set(r.anilist, r);
        }
      }
      const anilistIds = Array.from(bestByAnilist.keys()).filter(Boolean);
      const titleMap = /* @__PURE__ */ new Map();
      if (anilistIds.length > 0) {
        try {
          const gql = `
            query ($ids: [Int]) {
              Page(perPage: 50) {
                media(id_in: $ids, type: ANIME) {
                  id
                  title { romaji english native }
                  coverImage { medium }
                }
              }
            }
          `;
          const res = await fetch(ANILIST_GRAPHQL_ENDPOINT, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ query: gql, variables: { ids: anilistIds } })
          });
          if (res.ok) {
            const json = await res.json();
            const mediaList = ((_b = (_a = json == null ? void 0 : json.data) == null ? void 0 : _a.Page) == null ? void 0 : _b.media) || [];
            for (const m of mediaList) {
              titleMap.set(m.id, {
                title: ((_c = m.title) == null ? void 0 : _c.english) || ((_d = m.title) == null ? void 0 : _d.romaji) || ((_e = m.title) == null ? void 0 : _e.native) || `Anime #${m.id}`,
                coverImage: ((_f = m.coverImage) == null ? void 0 : _f.medium) || ""
              });
            }
          }
        } catch {
        }
      }
      const enriched = Array.from(bestByAnilist.values()).map((r) => {
        var _a2, _b2;
        return {
          ...r,
          _animeTitle: ((_a2 = titleMap.get(r.anilist)) == null ? void 0 : _a2.title) || null,
          _animeCover: ((_b2 = titleMap.get(r.anilist)) == null ? void 0 : _b2.coverImage) || null
        };
      });
      enriched.sort((a, b) => b.similarity - a.similarity);
      setImageResults(enriched);
    } catch (error) {
      console.error("Image search error:", error);
    } finally {
      setIsSearchingImage(false);
    }
  };
  reactExports.useEffect(() => {
    var _a, _b, _c;
    setQuery(queryParam);
    setSearchInput(queryParam);
    const typeParam = searchParams.get("type");
    if (typeParam === "anime" || typeParam === "manga" || typeParam === "character" || typeParam === "all") {
      setResultType(typeParam);
    }
    const genericTags = searchParams.getAll("tag").concat(((_a = searchParams.get("tags")) == null ? void 0 : _a.split(",")) ?? []);
    const animeTags = searchParams.getAll("animeTag").concat(typeParam !== "manga" ? genericTags : []);
    const mangaTags = searchParams.getAll("mangaTag").concat(searchParams.getAll("manwhaTag")).concat(typeParam === "manga" ? genericTags : []);
    setSelectedAnimeTags(Array.from(new Set(animeTags.concat(((_b = searchParams.get("animeTags")) == null ? void 0 : _b.split(",")) ?? []).filter(Boolean))));
    setSelectedMangaTags(Array.from(new Set(mangaTags.concat(((_c = searchParams.get("mangaTags") || searchParams.get("manwhaTags")) == null ? void 0 : _c.split(",")) ?? []).filter(Boolean))));
  }, [queryParam, searchParams]);
  reactExports.useEffect(() => {
    if (!shouldDelaySecondaryStreams) {
      setEnableSecondaryResultStreams(true);
      return;
    }
    setEnableSecondaryResultStreams(false);
    const timer = window.setTimeout(() => {
      setEnableSecondaryResultStreams(true);
    }, 300);
    return () => window.clearTimeout(timer);
  }, [query, resultType, shouldDelaySecondaryStreams]);
  reactExports.useEffect(() => {
    if (decodedProducerName) {
      setResultType("anime");
    }
  }, [decodedProducerName]);
  reactExports.useEffect(() => {
    setPage(1);
  }, [query]);
  const handleSearch = (e) => {
    e.preventDefault();
    const term = searchInput.trim();
    if (term) {
      try {
        const history = localStorage.getItem("tatakai_search_history");
        let searches = history ? JSON.parse(history) : [];
        searches = [term, ...searches.filter((s) => s !== term)].slice(0, 20);
        localStorage.setItem("tatakai_search_history", JSON.stringify(searches));
      } catch {
      }
      navigate(`/search?q=${encodeURIComponent(term)}`);
    } else {
      navigate("/search");
    }
  };
  const handleClearSearch = () => {
    setSearchInput("");
    if (query) {
      navigate("/search");
    }
  };
  const [recentSearches, setRecentSearches] = reactExports.useState([]);
  reactExports.useEffect(() => {
    try {
      const searches = localStorage.getItem("tatakai_search_history");
      if (searches) {
        const parsed = JSON.parse(searches);
        setRecentSearches(parsed.slice(0, 10));
      }
    } catch {
      setRecentSearches([]);
    }
  }, []);
  const runRecentSearch = (term) => {
    setSearchInput(term);
    navigate(`/search?q=${encodeURIComponent(term)}`);
  };
  const deleteSearchItem = (term) => {
    try {
      const updated = recentSearches.filter((s) => s !== term);
      setRecentSearches(updated);
      localStorage.setItem("tatakai_search_history", JSON.stringify(updated));
    } catch {
    }
  };
  const showAnimeResults = (resultType === "all" || resultType === "anime") && (query.length > 0 || animeFilterActive || genreFilterActive || tagFilterActive);
  const showMangaResults = shouldSearchManga && (query.length > 0 || mangaFilterActive || genreFilterActive || tagFilterActive);
  const showCharacterResults = shouldEnableCharacterSearch && query.length > 1;
  const isQuerylessMangaMode = showMangaResults && mangaSearchMode !== "search";
  const hasSearchContext = query.length > 0 || isQuerylessMangaMode || animeFilterActive || genreFilterActive || tagFilterActive;
  const hasMoreResults = showAnimeResults && !!hasNextAnimePage || showMangaResults && !!hasNextMangaPage;
  const isFetchingMoreResults = showAnimeResults && !!isFetchingNextAnimePage || showMangaResults && !!isFetchingNextMangaPage;
  const hasMixedResults = unifiedResults.length > 0;
  const hasCharacterResults = characterResults.length > 0;
  const hasAnyResult = hasMixedResults || showCharacterResults && hasCharacterResults;
  const isAnimeInitialLoading = showAnimeResults && isLoadingAnime && allAnimeResults.length === 0;
  const isMangaInitialLoading = showMangaResults && isLoadingManga && allMangaResults.length === 0;
  const isCharacterInitialLoading = showCharacterResults && loadingCharacters && characterResults.length === 0;
  const hybridLoading = isAnimeInitialLoading || isMangaInitialLoading || isCharacterInitialLoading;
  const { data: discoverData, isLoading: isLoadingDiscover } = useDiscoverMedia({
    sort: discoverSort,
    year: minReleaseYear > 0 ? minReleaseYear : null,
    genre: animeGenreFilter !== "all" ? animeGenreFilter : void 0
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background text-foreground overflow-x-hidden", children: [
    !isNative && /* @__PURE__ */ jsxRuntimeExports.jsx(Background, {}),
    !isMobile && /* @__PURE__ */ jsxRuntimeExports.jsx(Sidebar, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: cn(
      "relative z-10 pr-6 py-6 max-w-[1800px] mx-auto pb-24 md:pb-6",
      isNative ? "p-6" : "pl-6 md:pl-32"
    ), children: [
      !hasSearchContext && !isProducerRoute && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-8 mt-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(DiscoverHero, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center mb-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx("form", { onSubmit: handleSearch, className: "w-full max-w-2xl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex items-center shadow-2xl rounded-full", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-primary pointer-events-none" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            id: "tatakai-search-page-input",
            type: "text",
            placeholder: "Search anime, manga, characters...",
            value: searchInput,
            onChange: (e) => setSearchInput(e.target.value),
            className: "pl-14 pr-32 h-14 bg-card/85 hover:bg-card focus:bg-card border border-white/15 hover:border-primary/40 focus:border-primary rounded-full text-base shadow-lg shadow-black/20 backdrop-blur-md transition-all"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2", children: [
          searchInput && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: handleClearSearch,
              className: "p-1.5 rounded-full hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors",
              title: "Clear",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "submit",
              className: "px-5 h-9 rounded-full bg-primary text-primary-foreground font-semibold text-sm hover:brightness-110 active:scale-95 transition-all shadow-md",
              children: "Search"
            }
          )
        ] })
      ] }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8 md:mb-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-5 mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display text-2xl md:text-3xl font-bold flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "w-6 h-6 md:w-7 md:h-7 text-primary" }),
            hasSearchContext ? "Search Results" : "Discover"
          ] }),
          (query || isQuerylessMangaMode) && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-xs md:text-sm mt-1", children: [
            query ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              'Showing results for "',
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-medium", children: query }),
              '"'
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: "Showing manga discovery results" }),
            ` • ${filteredAnimeResults.length} anime`,
            ` • ${filteredMangaResults.length} manga`,
            showCharacterResults && ` • ${characterResults.length} characters`,
            activeFilterCount > 0 && ` • ${activeFilterCount} active filters`,
            !contentSafetySettings.showAdultEverywhere && ` • mature results ${explicitMangaQuery || mangaAdultFilter || query.trim().length > 0 ? "blurred" : "hidden"}`
          ] })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            PillGroup,
            {
              options: DISCOVER_SORTS,
              value: discoverSort,
              onChange: handleDiscoverSortChange,
              label: "Sort"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex bg-muted/40 p-1 rounded-full border border-white/5", children: [
            { id: "all", label: "All" },
            { id: "anime", label: "Anime", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Film, { className: "w-3 h-3" }) },
            { id: "manga", label: "Manga", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-3 h-3" }) },
            { id: "character", label: "Characters" }
          ].map((type) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              onClick: () => setResultType(type.id),
              className: cn(
                "px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all whitespace-nowrap",
                resultType === type.id ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
              ),
              children: [
                type.icon,
                type.label
              ]
            },
            type.id
          )) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenu, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuTrigger, { className: controlTriggerClass, children: [
              minReleaseYear > 0 ? minReleaseYear : "Any year",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "h-3.5 w-3.5 opacity-60" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuContent, { align: "start", className: controlMenuClass, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                DropdownMenuItem,
                {
                  className: controlItemClass,
                  onSelect: () => {
                    setMinReleaseYear(0);
                    setLocalMinReleaseYear(0);
                  },
                  children: [
                    "Any year",
                    minReleaseYear === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-3.5 w-3.5 text-primary" })
                  ]
                }
              ),
              discoverYears().map((value) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                DropdownMenuItem,
                {
                  className: controlItemClass,
                  onSelect: () => {
                    setMinReleaseYear(value);
                    setLocalMinReleaseYear(value);
                  },
                  children: [
                    value,
                    minReleaseYear === value && /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-3.5 w-3.5 text-primary" })
                  ]
                },
                value
              ))
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: controlTriggerClass, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "max-w-[120px] truncate", children: selectedFile ? selectedFile.name : "Image search" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  type: "file",
                  className: "hidden",
                  accept: "image/*",
                  onChange: (e) => {
                    var _a;
                    return setSelectedFile(((_a = e.target.files) == null ? void 0 : _a[0]) || null);
                  }
                }
              )
            ] }),
            selectedFile && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                onClick: handleImageSearch,
                disabled: isSearchingImage,
                className: "px-3.5 py-1.5 rounded-full bg-primary text-primary-foreground text-xs font-bold hover:brightness-110 active:scale-95 transition-all flex items-center gap-1.5",
                children: isSearchingImage ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-3.5 h-3.5 animate-spin" }) : "Identify"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenu, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuTrigger, { className: controlTriggerClass, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Tag, { className: "h-3.5 w-3.5 opacity-60" }),
              resolvedAnimeGenre || (animeGenreFilter !== "all" ? animeGenreFilter : "Genre"),
              /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "h-3.5 w-3.5 opacity-60" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuContent, { align: "start", className: controlMenuClass, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                DropdownMenuItem,
                {
                  className: controlItemClass,
                  onSelect: () => {
                    setAnimeGenreFilter("all");
                    setLocalAnimeGenre("all");
                    setMangaGenreFilter("all");
                    setLocalMangaGenre("all");
                  },
                  children: [
                    "All genres",
                    animeGenreFilter === "all" && /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-3.5 w-3.5 text-primary" })
                  ]
                }
              ),
              animeGenreOptions.map((option) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                DropdownMenuItem,
                {
                  className: controlItemClass,
                  onSelect: () => {
                    setAnimeGenreFilter(option.value);
                    setLocalAnimeGenre(option.label);
                    setMangaGenreFilter(option.value);
                    setLocalMangaGenre(option.label);
                  },
                  children: [
                    option.label,
                    animeGenreFilter === option.value && /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-3.5 w-3.5 text-primary" })
                  ]
                },
                option.value
              ))
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => setShowAdvancedAssist((val) => !val),
              className: cn(
                "h-8 px-3 rounded-full text-xs font-semibold border transition-all flex items-center gap-1.5",
                showAdvancedAssist ? "border-primary text-primary bg-primary/10 shadow-sm" : "border-white/10 text-muted-foreground hover:text-foreground hover:border-white/20 bg-muted/20"
              ),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SlidersHorizontal, { className: "w-3.5 h-3.5" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Filters" }),
                activeFilterCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex items-center justify-center w-4 h-4 rounded-full bg-primary text-primary-foreground text-[9px] font-bold", children: activeFilterCount })
              ]
            }
          )
        ] }),
        showAdvancedAssist && /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassPanel, { className: "mt-4 p-4 md:p-6 space-y-6 border border-white/10 shadow-xl overflow-hidden relative animate-in fade-in slide-in-from-top-2 duration-300", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center justify-between gap-4 relative z-10 pb-3 border-b border-white/5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SlidersHorizontal, { className: "w-4 h-4 text-primary" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold uppercase tracking-wider", children: "Power Filters" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => {
                    setLocalAnimeType("all");
                    setLocalAnimeStatus("all");
                    setLocalAnimeGenre("all");
                    setLocalAnimeSort("default");
                    setLocalMangaType("all");
                    setLocalMangaStatus("all");
                    setLocalMangaOrigin("all");
                    setLocalMangaGenre("all");
                    setLocalMangaAdult(false);
                    setLocalMinRating(0);
                    setLocalMinReleaseYear(0);
                    setLocalMaxRating(0);
                    setLocalMaxReleaseYear(0);
                    setLocalSeason("all");
                    setLocalMinEpisodes(0);
                    setLocalMaxEpisodes(0);
                    setLocalSortMode("relevance");
                    setAnimeTypeFilter("all");
                    setAnimeStatusFilter("all");
                    setAnimeGenreFilter("all");
                    setAnimeSortFilter("default");
                    setMangaTypeFilter("all");
                    setMangaStatusFilter("all");
                    setMangaOrigin("all");
                    setMangaGenreFilter("all");
                    setMangaAdultFilter(false);
                    setMinRating(0);
                    setMinReleaseYear(0);
                    setMaxRating(0);
                    setMaxReleaseYear(0);
                    setSeasonFilter("all");
                    setMinEpisodes(0);
                    setMaxEpisodes(0);
                    setSortMode("relevance");
                    setSelectedAnimeTags([]);
                    setSelectedMangaTags([]);
                    setTagSearch("");
                    setMangaTagSearch("");
                  },
                  className: "h-9 px-3.5 rounded-xl text-xs font-bold uppercase tracking-wide bg-background/70 border border-white/10 text-muted-foreground hover:text-foreground hover:bg-destructive/10 hover:text-destructive hover:border-destructive/30 transition-all",
                  children: "Reset all"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  onClick: applyFilters,
                  className: "h-9 px-6 rounded-xl bg-primary text-primary-foreground font-bold hover:scale-105 active:scale-95 transition-all shadow-lg shadow-primary/20 flex items-center gap-2 text-xs",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "w-3.5 h-3.5" }),
                    "Apply Filters"
                  ]
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 pb-2 border-b border-white/5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Film, { className: "w-4 h-4 text-primary" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xs font-black uppercase tracking-[0.2em] text-foreground", children: "Anime Filters" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] uppercase tracking-wide text-muted-foreground font-bold", children: "Type" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "select",
                    {
                      value: localAnimeType,
                      onChange: (e) => setLocalAnimeType(e.target.value),
                      className: "w-full h-10 rounded-xl bg-background/80 border border-white/10 px-3 text-sm focus:border-primary/50 outline-none transition-colors",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "all", children: "All types" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "tv", children: "TV" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "movie", children: "Movie" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "ova", children: "OVA" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "ona", children: "ONA" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "special", children: "Special" })
                      ]
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] uppercase tracking-wide text-muted-foreground font-bold", children: "Status" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "select",
                    {
                      value: localAnimeStatus,
                      onChange: (e) => setLocalAnimeStatus(e.target.value),
                      className: "w-full h-10 rounded-xl bg-background/80 border border-white/10 px-3 text-sm focus:border-primary/50 outline-none transition-colors",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "all", children: "Any status" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "currently-airing", children: "Currently Airing" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "finished-airing", children: "Finished Airing" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "not-yet-aired", children: "Not Yet Aired" })
                      ]
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] uppercase tracking-wide text-muted-foreground font-bold", children: "Genre" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "select",
                  {
                    value: localAnimeGenre,
                    onChange: (e) => setLocalAnimeGenre(e.target.value),
                    className: "w-full h-10 rounded-xl bg-background/80 border border-white/10 px-3 text-sm focus:border-primary/50 outline-none transition-colors",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "all", children: "Any genre" }),
                      animeGenreOptions.map((genre) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: genre.value, children: genre.label }, genre.value))
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Tags, { className: "w-3.5 h-3.5 text-primary" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] uppercase tracking-wide text-muted-foreground font-bold", children: "AniList Tags" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    value: tagSearch,
                    onChange: (event) => setTagSearch(event.target.value),
                    placeholder: "Search tags...",
                    className: "h-9 rounded-xl bg-background/80 border-white/10 text-xs"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => setShowSpoilerTags((v) => !v),
                    className: cn(
                      "inline-flex items-center gap-1.5 rounded-md border px-2 py-1 text-[10px] font-bold uppercase tracking-wide transition-colors",
                      showSpoilerTags ? "border-amber-400/50 bg-amber-400/15 text-amber-300" : "border-white/10 bg-background/60 text-muted-foreground hover:border-amber-400/30 hover:text-amber-300"
                    ),
                    children: showSpoilerTags ? "Hiding nothing — spoiler tags shown" : "Show spoiler tags"
                  }
                ),
                selectedAnimeTags.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5", children: selectedAnimeTags.map((tag) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    title: "Remove tag",
                    onClick: () => setSelectedAnimeTags((current) => current.filter((value) => value !== tag)),
                    className: "rounded-md bg-primary/15 px-2 py-1 text-[10px] font-bold text-primary hover:bg-primary/25",
                    children: [
                      tag,
                      " x"
                    ]
                  },
                  tag
                )) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex max-h-40 flex-col gap-2 overflow-y-auto pr-1", children: filteredTagOptions.map(({ category, tags }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[9px] uppercase tracking-[0.15em] text-muted-foreground/70 font-bold sticky top-0 bg-background/95 py-0.5", children: category }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5", children: tags.map((tag) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "button",
                    {
                      type: "button",
                      title: tag.description || tag.category || tag.name,
                      onClick: () => setSelectedAnimeTags((current) => current.includes(tag.name) ? current.filter((value) => value !== tag.name) : [...current, tag.name]),
                      className: cn(
                        "rounded-md border px-2 py-1 text-[10px] transition-colors",
                        selectedAnimeTags.includes(tag.name) ? "border-primary/50 bg-primary/15 text-primary" : "border-white/10 bg-background/60 text-muted-foreground hover:border-primary/30 hover:text-foreground"
                      ),
                      children: [
                        tag.name,
                        tag.isGeneralSpoiler && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-1 text-amber-400", title: "General spoiler", children: "!" })
                      ]
                    },
                    tag.id
                  )) })
                ] }, category)) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] uppercase tracking-wide text-muted-foreground font-bold", children: "Sort Method" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "select",
                  {
                    value: localAnimeSort,
                    onChange: (e) => setLocalAnimeSort(e.target.value),
                    className: "w-full h-10 rounded-xl bg-background/80 border border-white/10 px-3 text-sm focus:border-primary/50 outline-none transition-colors",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "default", children: "Best match" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "recently-added", children: "Recently Added" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "recently-updated", children: "Recently Updated" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "score", children: "Score" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "name-a-z", children: "Name A-Z" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "released-date", children: "Released Date" })
                    ]
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 pb-2 border-b border-white/5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-4 h-4 text-primary" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xs font-black uppercase tracking-[0.2em] text-foreground", children: "Manga Filters" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] uppercase tracking-wide text-muted-foreground font-bold", children: "Origin" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "select",
                  {
                    value: localMangaOrigin,
                    onChange: (e) => setLocalMangaOrigin(e.target.value),
                    className: "w-full h-10 rounded-xl bg-background/80 border border-white/10 px-3 text-sm focus:border-primary/50 outline-none transition-colors",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "all", children: "All origins" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "JP", children: "Japan (Manga)" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "KR", children: "South Korea (Manhwa/Webtoon)" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "CN", children: "China (Manhua)" })
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 rounded-xl border border-white/10 bg-background/50 p-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] uppercase tracking-wide text-muted-foreground font-bold", children: "Popular Manhwa / Webtoon Tags" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5", children: ["Cultivation", "Dungeon", "Necromancy", "Age Regression", "Video Games", "Revenge", "Survival", "Martial Arts", "Post-Apocalyptic"].map((tag) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => setSelectedMangaTags((current) => current.includes(tag) ? current.filter((value) => value !== tag) : [...current, tag]),
                    className: cn(
                      "rounded-md border px-2 py-1 text-[10px] transition-colors",
                      selectedMangaTags.includes(tag) ? "border-primary/50 bg-primary/15 text-primary" : "border-white/10 text-muted-foreground hover:border-primary/30 hover:text-foreground"
                    ),
                    children: tag
                  },
                  `popular-manhwa-${tag}`
                )) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] uppercase tracking-wide text-muted-foreground font-bold", children: "Popular Manga Tags" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5", children: ["School", "Shounen", "Seinen", "Shoujo", "Josei", "Isekai", "Cyberpunk", "Samurai", "Ninja", "Family Life"].map((tag) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => setSelectedMangaTags((current) => current.includes(tag) ? current.filter((value) => value !== tag) : [...current, tag]),
                    className: cn(
                      "rounded-md border px-2 py-1 text-[10px] transition-colors",
                      selectedMangaTags.includes(tag) ? "border-primary/50 bg-primary/15 text-primary" : "border-white/10 text-muted-foreground hover:border-primary/30 hover:text-foreground"
                    ),
                    children: tag
                  },
                  `popular-manga-${tag}`
                )) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] uppercase tracking-wide text-muted-foreground font-bold", children: "Format" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "select",
                    {
                      value: localMangaType,
                      onChange: (e) => setLocalMangaType(e.target.value),
                      className: "w-full h-10 rounded-xl bg-background/80 border border-white/10 px-3 text-sm focus:border-primary/50 outline-none transition-colors",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "all", children: "All formats" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "manga", children: "Manga" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "manhwa", children: "Manhwa" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "manhua", children: "Manhua" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "comics", children: "Comics" })
                      ]
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] uppercase tracking-wide text-muted-foreground font-bold", children: "Status" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "select",
                    {
                      value: localMangaStatus,
                      onChange: (e) => setLocalMangaStatus(e.target.value),
                      className: "w-full h-10 rounded-xl bg-background/80 border border-white/10 px-3 text-sm focus:border-primary/50 outline-none transition-colors",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "all", children: "Any status" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "ongoing", children: "Ongoing" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "completed", children: "Completed" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "hiatus", children: "Hiatus" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "cancelled", children: "Cancelled" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "unreleased", children: "Unreleased" })
                      ]
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] uppercase tracking-wide text-muted-foreground font-bold", children: "Genre" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "select",
                  {
                    value: localMangaGenre,
                    onChange: (e) => setLocalMangaGenre(e.target.value),
                    className: "w-full h-10 rounded-xl bg-background/80 border border-white/10 px-3 text-sm focus:border-primary/50 outline-none transition-colors",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "all", children: "Any genre" }),
                      localMangaGenre !== "all" && !atsuGenreOptions.some((g) => g.value === localMangaGenre) && /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: localMangaGenre, children: localMangaGenre.split(/[-_]+/).map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ") }),
                      atsuGenreOptions.map((genre) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: genre.value, children: genre.label }, genre.value))
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 rounded-xl border border-primary/10 bg-primary/5 p-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Tags, { className: "w-3.5 h-3.5 text-primary" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] uppercase tracking-wide text-muted-foreground font-bold", children: "AniList Tags" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    value: mangaTagSearch,
                    onChange: (event) => setMangaTagSearch(event.target.value),
                    placeholder: "Search manga tags...",
                    className: "h-9 rounded-xl bg-background/80 border-white/10 text-xs"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => setShowSpoilerTags((v) => !v),
                    className: cn(
                      "inline-flex items-center gap-1.5 rounded-md border px-2 py-1 text-[10px] font-bold uppercase tracking-wide transition-colors",
                      showSpoilerTags ? "border-amber-400/50 bg-amber-400/15 text-amber-300" : "border-white/10 bg-background/60 text-muted-foreground hover:border-amber-400/30 hover:text-amber-300"
                    ),
                    children: showSpoilerTags ? "Spoiler tags shown" : "Show spoiler tags"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5", children: selectedMangaTags.length > 0 ? selectedMangaTags.map((tag) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    onClick: () => setSelectedMangaTags((current) => current.filter((value) => value !== tag)),
                    className: "rounded-md bg-primary/15 px-2 py-1 text-[10px] font-bold text-primary hover:bg-primary/25",
                    children: [
                      tag,
                      " x"
                    ]
                  },
                  `manga-${tag}`
                )) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground", children: "No manga tags selected" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex max-h-40 flex-col gap-2 overflow-y-auto pr-1", children: filteredMangaTagOptions.map(({ category, tags }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[9px] uppercase tracking-[0.15em] text-muted-foreground/70 font-bold sticky top-0 bg-background/95 py-0.5", children: category }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5", children: tags.map((tag) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "button",
                    {
                      type: "button",
                      title: tag.description || tag.category || tag.name,
                      onClick: () => setSelectedMangaTags((current) => current.includes(tag.name) ? current.filter((value) => value !== tag.name) : [...current, tag.name]),
                      className: cn(
                        "rounded-md border px-2 py-1 text-[10px] transition-colors",
                        selectedMangaTags.includes(tag.name) ? "border-primary/50 bg-primary/15 text-primary" : "border-white/10 bg-background/60 text-muted-foreground hover:border-primary/30 hover:text-foreground"
                      ),
                      children: [
                        tag.name,
                        tag.isGeneralSpoiler && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-1 text-amber-400", title: "General spoiler", children: "!" })
                      ]
                    },
                    `manga-tag-${tag.id}`
                  )) })
                ] }, `manga-cat-${category}`)) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 p-3 rounded-xl bg-background/70 border border-white/10 hover:border-primary/30 transition-all cursor-pointer group", onClick: () => setLocalMangaAdult(!localMangaAdult), children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    type: "checkbox",
                    checked: localMangaAdult,
                    onChange: (e) => setLocalMangaAdult(e.target.checked),
                    className: "w-4 h-4 accent-primary rounded",
                    id: "adult-filter"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "adult-filter", className: "text-xs font-bold uppercase tracking-wide text-muted-foreground group-hover:text-foreground cursor-pointer flex-1", children: "18+ Adult Content" }),
                localMangaAdult && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-primary animate-pulse font-black", children: "ENABLED" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 pb-2 border-b border-white/5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SlidersHorizontal, { className: "w-4 h-4 text-primary" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xs font-black uppercase tracking-[0.2em] text-foreground", children: "General Tuning" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] uppercase tracking-wide text-muted-foreground font-bold", children: "Global Sort Method" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "select",
                  {
                    value: localSortMode,
                    onChange: (e) => setLocalSortMode(e.target.value),
                    className: "w-full h-10 rounded-xl bg-background/80 border border-white/10 px-3 text-sm focus:border-primary/50 outline-none transition-colors",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "relevance", children: "Relevance" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "rating", children: "Highest Rating" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "popularity", children: "Popularity" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "title", children: "Title A-Z" })
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] uppercase tracking-wide text-muted-foreground font-bold", children: "Min Rating" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold text-primary", children: localMinRating.toFixed(1) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    type: "range",
                    min: 0,
                    max: 10,
                    step: 0.5,
                    value: localMinRating,
                    onChange: (e) => setLocalMinRating(Number(e.target.value)),
                    className: "w-full h-1.5 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] uppercase tracking-wide text-muted-foreground font-bold", children: "Min Release Year" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      type: "number",
                      min: 1900,
                      max: (/* @__PURE__ */ new Date()).getFullYear() + 1,
                      value: localMinReleaseYear || "",
                      onChange: (e) => setLocalMinReleaseYear(Math.max(0, Number(e.target.value) || 0)),
                      className: "h-10 rounded-xl bg-background/80 border-white/10 focus:border-primary/50",
                      placeholder: "Any year..."
                    }
                  ),
                  localMinReleaseYear > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      onClick: () => setLocalMinReleaseYear(0),
                      className: "absolute right-3 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3 h-3" })
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] uppercase tracking-wide text-muted-foreground font-bold", children: "Max Rating" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold text-primary", children: localMaxRating > 0 ? localMaxRating.toFixed(1) : "Any" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    type: "range",
                    min: 0,
                    max: 10,
                    step: 0.5,
                    value: localMaxRating,
                    onChange: (e) => setLocalMaxRating(Number(e.target.value)),
                    className: "w-full h-1.5 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] uppercase tracking-wide text-muted-foreground font-bold", children: "Max Release Year" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      type: "number",
                      min: 1900,
                      max: (/* @__PURE__ */ new Date()).getFullYear() + 1,
                      value: localMaxReleaseYear || "",
                      onChange: (e) => setLocalMaxReleaseYear(Math.max(0, Number(e.target.value) || 0)),
                      className: "h-10 rounded-xl bg-background/80 border-white/10 focus:border-primary/50",
                      placeholder: "Any year..."
                    }
                  ),
                  localMaxReleaseYear > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      onClick: () => setLocalMaxReleaseYear(0),
                      className: "absolute right-3 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3 h-3" })
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] uppercase tracking-wide text-muted-foreground font-bold", children: [
                  "Season ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground/60 normal-case", children: "(anime)" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "select",
                  {
                    value: localSeason,
                    onChange: (e) => setLocalSeason(e.target.value),
                    className: "w-full h-10 rounded-xl bg-background/80 border border-white/10 px-3 text-sm focus:border-primary/50 outline-none transition-colors",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "all", children: "Any season" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "WINTER", children: "Winter" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "SPRING", children: "Spring" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "SUMMER", children: "Summer" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "FALL", children: "Fall" })
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] uppercase tracking-wide text-muted-foreground font-bold", children: [
                  "Episodes ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground/60 normal-case", children: "(anime)" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      type: "number",
                      min: 0,
                      value: localMinEpisodes || "",
                      onChange: (e) => setLocalMinEpisodes(Math.max(0, Number(e.target.value) || 0)),
                      className: "h-10 rounded-xl bg-background/80 border-white/10 focus:border-primary/50",
                      placeholder: "Min"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      type: "number",
                      min: 0,
                      value: localMaxEpisodes || "",
                      onChange: (e) => setLocalMaxEpisodes(Math.max(0, Number(e.target.value) || 0)),
                      className: "h-10 rounded-xl bg-background/80 border-white/10 focus:border-primary/50",
                      placeholder: "Max"
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] uppercase tracking-wide text-muted-foreground font-bold", children: "Image Confidence" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-bold text-primary", children: [
                    Math.round(imageConfidenceThreshold * 100),
                    "%"
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    type: "range",
                    min: 0.5,
                    max: 1,
                    step: 0.01,
                    value: imageConfidenceThreshold,
                    onChange: (e) => setImageConfidenceThreshold(Number(e.target.value)),
                    className: "w-full h-1.5 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                  }
                )
              ] })
            ] })
          ] })
        ] })
      ] }),
      imageResults && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-12 animate-in fade-in slide-in-from-top-4 duration-500", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-xl font-bold flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Film, { className: "w-5 h-5 text-primary" }),
            "Scene ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary italic", children: "Identification" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-normal text-muted-foreground ml-1", children: [
              "(",
              filteredImageResults.length,
              " match",
              filteredImageResults.length !== 1 ? "es" : "",
              ")"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: () => {
                setImageResults(null);
                setSelectedFile(null);
              },
              className: "text-sm text-muted-foreground hover:text-foreground transition-colors",
              children: "Clear"
            }
          )
        ] }),
        filteredImageResults.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassPanel, { className: "p-6 text-sm text-muted-foreground", children: [
          "No frame matches above ",
          Math.round(imageConfidenceThreshold * 100),
          "% confidence. Lower the confidence filter to see more candidates."
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5", children: filteredImageResults.map((result, idx) => {
          const animeTitle = result._animeTitle || (() => {
            var _a, _b, _c, _d, _e;
            const namePart = (_e = (_d = (_c = (_b = (_a = result.filename) == null ? void 0 : _a.split("] ")) == null ? void 0 : _b[1]) == null ? void 0 : _c.split(" - ")) == null ? void 0 : _d[0]) == null ? void 0 : _e.trim();
            return namePart || result.filename || "Unknown Anime";
          })();
          const similarityPct = (result.similarity * 100).toFixed(1);
          const similarityColor = result.similarity >= 0.95 ? "text-emerald-400" : result.similarity >= 0.85 ? "text-amber-400" : "text-muted-foreground";
          const timestampSecs = typeof result.at === "number" ? result.at : null;
          const formatTimestamp = (secs) => {
            const h = Math.floor(secs / 3600);
            const m = Math.floor(secs % 3600 / 60);
            const s = Math.floor(secs % 60);
            if (h > 0) return `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
            return `${m}:${String(s).padStart(2, "0")}`;
          };
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassPanel, { className: "overflow-hidden group hover:border-primary/40 transition-colors flex flex-col", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-video bg-black flex-shrink-0 overflow-hidden", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: result.image,
                  alt: `Frame from ${animeTitle}`,
                  className: "w-full h-full object-cover",
                  onError: (e) => {
                    e.target.style.display = "none";
                  }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `absolute top-2 right-2 px-2 py-0.5 rounded-full bg-black/70 backdrop-blur-sm text-xs font-black ${similarityColor}`, children: [
                similarityPct,
                "%"
              ] }),
              result.episode != null && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute top-2 left-2 px-2 py-0.5 rounded-full bg-black/70 backdrop-blur-sm text-xs font-bold text-white", children: [
                "EP ",
                result.episode
              ] }),
              timestampSecs !== null && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/70 backdrop-blur-sm text-[10px] text-white font-mono", children: formatTimestamp(timestampSecs) }),
              result.video && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "a",
                {
                  href: result.video,
                  target: "_blank",
                  rel: "noopener noreferrer",
                  className: "absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30",
                  onClick: (e) => e.stopPropagation(),
                  title: "Preview scene",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30 hover:bg-white/30 transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "w-5 h-5 text-white fill-white ml-0.5" }) })
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 flex gap-3 flex-1", children: [
              result._animeCover && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: result._animeCover,
                  alt: "",
                  className: "w-10 h-14 object-cover rounded-lg shrink-0"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-sm leading-tight line-clamp-2 mb-1", children: animeTitle }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] text-muted-foreground", children: [
                  result.episode != null && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold text-foreground/70", children: [
                    "Episode ",
                    result.episode
                  ] }),
                  timestampSecs !== null && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                    "at ",
                    formatTimestamp(timestampSecs)
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: `font-black ${similarityColor}`, children: [
                    similarityPct,
                    "% match"
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      onClick: () => navigate(`/anime/${result.anilist}`),
                      className: "flex-1 py-1.5 rounded-lg bg-primary/15 hover:bg-primary/30 text-[10px] font-bold text-primary transition-all border border-primary/20 hover:border-primary/40",
                      children: "View Anime"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      onClick: () => navigate(`/search?q=${encodeURIComponent(animeTitle)}`),
                      className: "flex-1 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-[10px] font-bold text-muted-foreground hover:text-foreground transition-all border border-white/5",
                      children: "Search"
                    }
                  )
                ] })
              ] })
            ] })
          ] }, `img-result-${idx}`);
        }) })
      ] }),
      query && extensionResults && extensionResults.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-12 animate-in fade-in slide-in-from-top-4 duration-500", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-xl font-bold mb-6 flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Puzzle, { className: "w-5 h-5 text-primary" }),
          "Community Modules (",
          extensionResults.length,
          ")"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: extensionResults.map((result, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassPanel, { className: "p-4 flex gap-4 items-center group hover:border-primary/50 transition-all cursor-pointer", onClick: () => result.url && window.open(result.url, "_blank"), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0", children: result.image ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: result.image, alt: "", className: "w-full h-full object-cover rounded-xl" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Puzzle, { className: "w-6 h-6" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-sm truncate", children: result.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mt-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-black uppercase tracking-widest text-primary/70", children: result.providerName }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] text-muted-foreground", children: [
                "• ",
                result.type || "Result"
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" })
        ] }, idx)) })
      ] }),
      hasSearchContext ? hybridLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(PosterGridSkeleton, { count: 14, className: "mt-6" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        showCharacterResults && characterResults.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-12", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 rounded-xl bg-primary/10 text-primary", children: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-5 h-5" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-2xl font-black tracking-tight", children: [
              "Character ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary italic", children: "Matches" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: POSTER_GRID_CLASS, children: characterResults.map((character) => {
            var _a, _b, _c;
            return /* @__PURE__ */ jsxRuntimeExports.jsx(
              UnifiedMediaCard,
              {
                variant: "poster",
                item: {
                  id: String(character.id),
                  name: ((_a = character.name) == null ? void 0 : _a.full) || character.name || "Character",
                  mediaType: "character",
                  poster: ((_b = character.image) == null ? void 0 : _b.large) || ((_c = character.image) == null ? void 0 : _c.medium) || character.poster || "/placeholder.svg"
                }
              },
              character.id
            );
          }) })
        ] }),
        showEpisodeSearch && episodeTitleResults.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-12", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 rounded-xl bg-primary/10 text-primary", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Film, { className: "w-5 h-5" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-2xl font-black tracking-tight", children: [
              "Episode ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary italic", children: "Matches" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-2 text-sm font-normal text-muted-foreground", children: "(by episode title)" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4", children: episodeTitleResults.map((hit, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            GlassPanel,
            {
              className: "p-3 flex items-center gap-4 hover:bg-white/10 transition-all cursor-pointer group border-white/5 hover:border-primary/30",
              onClick: () => navigate(`/anime/${hit.animeId || hit.anilistId}`),
              children: [
                hit.animePoster && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative w-12 h-16 flex-shrink-0 overflow-hidden rounded-xl border border-white/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "img",
                  {
                    src: hit.animePoster,
                    alt: hit.animeName,
                    className: "w-full h-full object-cover transition-transform duration-500 group-hover:scale-110",
                    loading: "lazy"
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-sm truncate group-hover:text-primary transition-colors", children: hit.animeName }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground truncate mt-0.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-primary/70", children: "Episode: " }),
                    hit.episodeTitle
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mt-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-black uppercase tracking-widest text-primary/50 bg-primary/10 px-1.5 py-0.5 rounded-md", children: "Episode Match" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-3 h-3 text-muted-foreground/40 group-hover:translate-x-1 transition-transform" })
                  ] })
                ] })
              ]
            },
            `ep-${hit.anilistId ?? idx}`
          )) })
        ] }),
        (showAnimeResults || showMangaResults) && hasMixedResults && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: POSTER_GRID_CLASS, children: unifiedResults.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx(UnifiedMediaCard, { item, variant: "poster" }, item.id)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: scrollRef, className: "h-20 mt-8 flex flex-col items-center justify-center gap-3", children: isFetchingMoreResults ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 text-primary animate-pulse bg-primary/5 px-6 py-3 rounded-2xl border border-primary/10", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-5 h-5 animate-spin" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-bold uppercase tracking-wider", children: "Loading more..." })
          ] }) : hasMoreResults ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-1.5 h-1.5 rounded-full bg-primary/20 animate-bounce" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-2 opacity-40", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-px w-24 bg-border" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-black uppercase tracking-[0.2em]", children: "End of results" })
          ] }) })
        ] }),
        !hasAnyResult && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-20", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "w-16 h-16 text-muted-foreground mx-auto mb-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-semibold mb-2", children: "No results found" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Try broadening filters or using a different query" })
        ] })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8 flex w-full flex-col items-center text-center", children: recentSearches.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8 w-full max-w-3xl", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-3 text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground", children: "Recent searches" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap justify-center gap-2.5", children: recentSearches.map((term, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "group inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs transition-all", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: () => runRecentSearch(term),
              className: "font-medium text-foreground",
              children: term
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: (e) => {
                e.stopPropagation();
                deleteSearchItem(term);
              },
              className: "opacity-0 group-hover:opacity-100 transition-opacity ml-1 text-muted-foreground hover:text-destructive",
              title: "Remove",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3 h-3" })
            }
          )
        ] }, idx)) })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(MobileNav, {})
  ] });
}
export {
  SearchPage as default
};
