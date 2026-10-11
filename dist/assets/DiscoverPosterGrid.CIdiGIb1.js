import { r as reactExports, j as jsxRuntimeExports, L as Link } from "./react-vendor.CAo4XUiA.js";
import { aG as splitRating, ap as useContentSafetySettings, aE as ALL_GENRES, I as contentGraph, bj as filterAdultAnime, P as Peekable, j as cn, h as getHighQualityPoster, bk as peekFromHref } from "./index.C6yfkT5T.js";
import { a as useQuery, u as useQueryClient } from "./tanstack.DPr3OB19.js";
import { b as buildPreferredAnimeRouteId, a as useHoverPreview } from "./useHoverPreview.Cs_Lh1vM.js";
import "./vendor.CJyRs4QS.js";
import { aJ as Play, aI as Star } from "./icons.C2gBBarQ.js";
function handlePosterFallback(event, poster) {
  const image = event.currentTarget;
  const stage = image.dataset.fallbackStage || "upgraded";
  if (stage === "upgraded" && poster && image.currentSrc !== poster) {
    image.dataset.fallbackStage = "direct";
    image.src = poster;
    return;
  }
  if (stage !== "placeholder") {
    image.dataset.fallbackStage = "placeholder";
    image.src = "/placeholder.svg";
  }
}
const RAIL_LENGTH = 7;
function rankBadgeClass(rank) {
  if (rank === 1)
    return "bg-gradient-to-br from-primary via-primary to-secondary text-primary-foreground ring-1 ring-primary/70 shadow-lg shadow-primary/30";
  if (rank === 2)
    return "bg-gradient-to-br from-secondary via-secondary to-accent text-secondary-foreground ring-1 ring-secondary/60";
  if (rank === 3)
    return "bg-gradient-to-br from-accent via-accent to-accent/70 text-accent-foreground ring-1 ring-accent/50";
  return "bg-black/70 text-white/70 ring-1 ring-white/15 backdrop-blur-sm";
}
function animeCardToPosterItem(anime, index = 0) {
  var _a, _b;
  const { score, label } = splitRating(anime.rating);
  const episodes = ((_a = anime.episodes) == null ? void 0 : _a.sub) || ((_b = anime.episodes) == null ? void 0 : _b.dub) || 0;
  return {
    key: `${anime.id || anime.name}-${index}`,
    href: anime.id ? `/anime/${anime.id}` : `/search?q=${encodeURIComponent(anime.name)}`,
    title: anime.name,
    poster: anime.poster,
    anilistId: anime.anilistId,
    meta: [anime.type, label, episodes ? `${episodes} eps` : void 0].filter(Boolean).join(" · "),
    score,
    isAdult: anime.isAdult
  };
}
const controlTriggerClass = "inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-semibold text-white/70 transition-colors hover:border-white/20 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary data-[state=open]:border-primary/40 data-[state=open]:text-white";
const controlMenuClass = "max-h-[19rem] w-52 overflow-y-auto border-white/10 bg-popover/95 p-1.5 backdrop-blur-xl";
const controlItemClass = "flex cursor-pointer items-center justify-between rounded-lg px-3 py-2 text-sm text-white/70 focus:bg-white/10 focus:text-white";
const PAGER_CLASS = "inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-5 py-2.5 text-sm font-semibold text-white/75 transition-colors hover:border-white/25 hover:text-white disabled:pointer-events-none disabled:opacity-35 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/40";
function rankRingClass(rank) {
  if (rank === 1) return "ring-2 ring-primary/60";
  if (rank === 2) return "ring-1 ring-secondary/60";
  if (rank === 3) return "ring-1 ring-accent/50";
  return void 0;
}
const SORT_BY = {
  "for-you": "TRENDING_DESC",
  "top-rated": "SCORE_DESC",
  newest: "START_DATE_DESC",
  "a-z": "TITLE_ROMAJI"
};
const DISCOVER_SORTS = [
  { id: "for-you", label: "For you" },
  { id: "top-rated", label: "Top rated" },
  { id: "newest", label: "Newest" },
  { id: "a-z", label: "A–Z" }
];
const DISCOVER_PER_PAGE = 28;
const canonical = (value) => value.toLowerCase().replace(/[^a-z0-9]/g, "");
function resolveGenreSlug(slug) {
  if (!slug) return void 0;
  let decoded = slug;
  try {
    decoded = decodeURIComponent(slug);
  } catch {
  }
  const key = canonical(decoded);
  if (!key) return void 0;
  return ALL_GENRES.find((genre) => canonical(genre) === key) ?? decoded.replace(/-/g, " ");
}
function genreDisplayName(slug) {
  const resolved = resolveGenreSlug(slug);
  if (!resolved) return "All anime";
  return resolved.replace(/\b\w/g, (c) => c.toUpperCase());
}
function useDiscoverMedia({ genre, sort = "for-you", year = null, page = 1 }) {
  const resolvedGenre = resolveGenreSlug(genre);
  const { settings } = useContentSafetySettings();
  const showAdult = settings.showAdultEverywhere;
  return useQuery({
    queryKey: ["discover", "grid", resolvedGenre ?? null, sort, year, page, showAdult],
    queryFn: () => contentGraph.search({
      genres: resolvedGenre ? [resolvedGenre] : void 0,
      sortBy: SORT_BY[sort],
      year: year ? { min: year, max: year } : void 0,
      page,
      perPage: DISCOVER_PER_PAGE,
      // Hide adult server-side by default; `undefined` includes both.
      isAdult: showAdult ? void 0 : false
    }),
    staleTime: 5 * 60 * 1e3,
    // Keeps the previous page on screen while the next one loads instead of
    // collapsing the grid to skeletons on every filter change.
    placeholderData: (previous) => previous,
    // Belt-and-suspenders: also drop anything the heuristic flags (genre/title)
    // that the server's isAdult filter alone would miss.
    select: (result) => ({ ...result, media: filterAdultAnime(result.media, showAdult) })
  });
}
function discoverYears() {
  const latest = (/* @__PURE__ */ new Date()).getFullYear() + 1;
  return Array.from({ length: latest - 1959 }, (_, i) => latest - i);
}
function mediaHref(media) {
  const routeId = buildPreferredAnimeRouteId({
    tatakaiId: media.tatakaiId,
    malId: media.malId,
    anilistId: media.anilistId,
    titleEnglish: media.titleEnglish,
    titleRomaji: media.titleRomaji
  });
  if (routeId) return `/anime/${routeId}`;
  return `/search?q=${encodeURIComponent(mediaTitle(media))}`;
}
function mediaTitle(media) {
  return media.titleEnglish ?? media.titleRomaji;
}
function mediaMetaParts(media) {
  var _a, _b;
  const year = media.seasonYear ?? ((_a = media.startDate) == null ? void 0 : _a.year);
  const bits = [(_b = media.format) == null ? void 0 : _b.replace(/_/g, " "), year ? String(year) : void 0].filter(
    Boolean
  );
  return {
    label: bits.join(" · "),
    // averageScore is an integer 0–100, so one decimal is all the data supports.
    score: media.averageScore ? (media.averageScore / 10).toFixed(1) : void 0
  };
}
function mediaToPosterItem(media, index = 0) {
  const { label, score } = mediaMetaParts(media);
  const title = mediaTitle(media);
  return {
    key: `${media.anilistId || media.malId || media.tatakaiId || title}-${index}`,
    href: mediaHref(media),
    title,
    poster: media.coverImageLarge ?? media.coverImageMedium ?? "",
    anilistId: media.anilistId,
    meta: label,
    score,
    isAdult: media.isAdult
  };
}
const POSTERS_PER_BOARD = RAIL_LENGTH;
const RANKED_BOARDS = [
  {
    id: "popular",
    eyebrow: "This week",
    heading: "Popular worldwide",
    description: "This week's most watched across the anime community — ranked gold, silver, and bronze. Handpicked heat from around the globe.",
    cta: { label: "See the board", to: "/trending" }
  },
  {
    id: "trending",
    eyebrow: "Right now",
    heading: "Trending today",
    description: "What everyone started watching in the last few hours. Moves fast, so the order here rarely survives the day.",
    cta: { label: "See what’s moving", to: "/trending" }
  },
  {
    id: "top_rated",
    eyebrow: "All time",
    heading: "Highest rated",
    description: "The best-scored anime ever indexed, by community average. No recency bias, no seasonal noise — just the ceiling.",
    cta: { label: "See the rankings", to: "/trending" }
  },
  {
    id: "seasonal",
    eyebrow: "This season",
    heading: "Airing now",
    description: "Everything currently on air, ordered by how much of the community is keeping up with it week to week.",
    cta: { label: "See the season", to: "/trending" }
  }
];
function useRankedBoard(board) {
  const { settings } = useContentSafetySettings();
  const showAdult = settings.showAdultEverywhere;
  return useQuery({
    queryKey: ["discover", "board", board],
    queryFn: () => contentGraph.getFeed(board, 1, POSTERS_PER_BOARD),
    staleTime: 10 * 60 * 1e3,
    // The rail is the tallest thing on the page; swapping boards should not
    // make the hero jump to a skeleton and back.
    placeholderData: (previous) => previous,
    // getFeed can't filter server-side, so hide adult on read. Reactive to the
    // toggle without refetching the cached feed.
    select: (feed) => ({ ...feed, media: filterAdultAnime(feed.media, showAdult) })
  });
}
function usePrefetchRankedBoard() {
  const queryClient = useQueryClient();
  return reactExports.useCallback(
    (board) => {
      void queryClient.prefetchQuery({
        queryKey: ["discover", "board", board],
        queryFn: () => contentGraph.getFeed(board, 1, POSTERS_PER_BOARD),
        staleTime: 10 * 60 * 1e3
      });
    },
    [queryClient]
  );
}
function PosterCard({ item, rank, eager, footer, preview, className }) {
  const showScoreOnPoster = rank !== void 0 && rank <= 3;
  const previewEnabled = Boolean(preview && item.anilistId);
  const hover = useHoverPreview({
    anilistId: item.anilistId,
    title: item.title,
    enabled: previewEnabled
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Peekable, { media: peekFromHref(item.href, item), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: cn("group relative", className),
      onMouseEnter: previewEnabled ? hover.onEnter : void 0,
      onMouseLeave: previewEnabled ? hover.onLeave : void 0,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: item.href, className: "block focus-visible:outline-none", "aria-label": item.title, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: cn(
                "relative aspect-[2/3] w-full overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.04] transition-all duration-300 group-hover:border-white/20 group-hover:shadow-xl group-hover:shadow-black/50 group-focus-visible:ring-2 group-focus-visible:ring-ring",
                rankRingClass(rank)
              ),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "img",
                  {
                    src: getHighQualityPoster(item.poster, item.anilistId),
                    alt: "",
                    "aria-hidden": true,
                    loading: eager ? "eager" : "lazy",
                    decoding: "async",
                    className: cn(
                      "h-full w-full object-cover transition-all duration-500",
                      hover.isActive ? "opacity-0" : "opacity-100 group-hover:scale-[1.06]"
                    ),
                    onError: (event) => handlePosterFallback(event, item.poster)
                  }
                ),
                previewEnabled && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "video",
                  {
                    ref: hover.videoRef,
                    className: cn(
                      "absolute inset-0 h-full w-full object-cover transition-opacity duration-300",
                      hover.isActive ? "opacity-100" : "opacity-0"
                    ),
                    muted: true,
                    loop: true,
                    playsInline: true,
                    crossOrigin: "anonymous",
                    onError: hover.onError
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" }),
                previewEnabled && hover.showFallback && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100", children: hover.isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex h-11 w-11 items-center justify-center rounded-full bg-foreground/95 shadow-2xl", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "ml-0.5 h-5 w-5 fill-background text-background" }) }) }),
                showScoreOnPoster && item.score && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute bottom-2 left-2 flex items-center gap-1 rounded-full bg-black/70 px-2 py-0.5 text-[10px] font-bold text-white backdrop-blur-sm", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "h-2.5 w-2.5 fill-amber text-amber" }),
                  item.score
                ] })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-3 line-clamp-1 text-sm font-bold text-white/90 transition-colors group-hover:text-white", children: item.title }),
          (item.meta || item.score && !showScoreOnPoster) && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 flex items-center gap-1.5 text-xs font-medium text-white/40", children: [
            item.meta,
            item.meta && item.score && !showScoreOnPoster && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { "aria-hidden": true, children: "·" }),
            item.score && !showScoreOnPoster && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 text-white/55", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "h-3 w-3 fill-amber text-amber" }),
              item.score
            ] })
          ] })
        ] }),
        rank !== void 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: cn(
              "pointer-events-none absolute -left-2 -top-2 z-10 flex items-center justify-center rounded-full font-black tabular-nums",
              rank <= 3 ? "h-9 w-9 text-base" : "h-7 w-7 text-xs",
              rankBadgeClass(rank)
            ),
            children: rank
          }
        ),
        footer
      ]
    }
  ) });
}
const POSTER_GRID_CLASS = "grid grid-cols-2 gap-x-4 gap-y-7 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7";
function PosterGridSkeleton({ count = 14, className }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn(POSTER_GRID_CLASS, className), children: Array.from({ length: count }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-[2/3] w-full animate-pulse rounded-2xl border border-white/5 bg-white/[0.04]" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 h-3.5 w-4/5 animate-pulse rounded bg-white/[0.06]" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 h-3 w-1/2 animate-pulse rounded bg-white/[0.04]" })
  ] }, `poster-skeleton-${i}`)) });
}
function DiscoverPosterGrid({
  media,
  isLoading,
  skeletonCount = 14,
  preview,
  className
}) {
  if (isLoading && media.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(PosterGridSkeleton, { count: skeletonCount, className });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn(POSTER_GRID_CLASS, className), children: media.map((item, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    PosterCard,
    {
      item: mediaToPosterItem(item, index),
      eager: index < 7,
      preview
    },
    `${item.anilistId || item.malId || item.titleRomaji}-${index}`
  )) });
}
export {
  DISCOVER_SORTS as D,
  PosterGridSkeleton as P,
  RANKED_BOARDS as R,
  controlMenuClass as a,
  controlItemClass as b,
  controlTriggerClass as c,
  discoverYears as d,
  POSTER_GRID_CLASS as e,
  useRankedBoard as f,
  usePrefetchRankedBoard as g,
  RAIL_LENGTH as h,
  handlePosterFallback as i,
  resolveGenreSlug as j,
  genreDisplayName as k,
  DiscoverPosterGrid as l,
  mediaToPosterItem as m,
  PAGER_CLASS as n,
  animeCardToPosterItem as o,
  PosterCard as p,
  rankBadgeClass as r,
  useDiscoverMedia as u
};
