import { e as useNavigate, r as reactExports, j as jsxRuntimeExports, L as Link } from "./react-vendor.CAo4XUiA.js";
import { g as getHighQualityImage, G as GlassPanel, P as Peekable, an as peekFromManga, ap as useContentSafetySettings, ex as getMangaSections, ey as getMangaSectionItems, ar as inferMangaAdultFlag, B as Button, bg as UnifiedMediaCard, l as getProxiedImageUrl, aK as AdultBadge, V as useSettingsModal, D as useIsNativeApp, s as useIsMobile, Q as Background, S as Sidebar, j as cn } from "./index.C6yfkT5T.js";
import { M as MobileNav } from "./MobileNav.ABHzkhTQ.js";
import { H as Header } from "./Header.D6gxY_6M.js";
import { C as CardSkeleton } from "./skeleton-custom.3olGZrgu.js";
import { H as HomeSectionHeading, u as useMangaHome, L as LastReadMangaSection, I as IndexMangaShowcase } from "./LastReadMangaSection.DgRMomCV.js";
import "./vendor.CJyRs4QS.js";
import { aI as Star, B as BookOpen, bB as Flame, aT as Zap, bM as Brain, S as Search, bK as Compass, $ as Flower2, bJ as Ghost, bI as Rocket, k as Sparkles, bH as Laugh, H as Heart, bG as Sword, v as ArrowRight, Q as LoaderCircle, aG as ChevronLeft, b as ChevronRight, aA as Layers, cN as Clock3, cO as Shuffle } from "./icons.C2gBBarQ.js";
import { c as useInfiniteQuery } from "./tanstack.DPr3OB19.js";
import { m as motion } from "./motion.DVGLRFCH.js";
import "./supabase.WuRMX5Dg.js";
import "./radix.BiK9uYXL.js";
import "./hls.BlgtCWcq.js";
import "./editor.Dxw8dtyw.js";
import "./charts.Dr1fgDJ-.js";
import "./useNotifications.BzSJE8km.js";
import "./useTrackedShows.Dbf34fk8.js";
import "./useNextAiringEpisodes.COq8rfNQ.js";
function MangaHeroSection({ spotlight, spotlights = [] }) {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = reactExports.useState(0);
  const [isTransitioning, setIsTransitioning] = reactExports.useState(false);
  const allSpotlights = spotlights.length > 0 ? spotlights.slice(0, 5) : [spotlight];
  const activeSpotlight = allSpotlights[currentIndex] || spotlight;
  const spotlightName = String((activeSpotlight == null ? void 0 : activeSpotlight.name) || "Untitled");
  const spotlightPoster = String((activeSpotlight == null ? void 0 : activeSpotlight.poster) || "");
  const spotlightType = (activeSpotlight == null ? void 0 : activeSpotlight.type) || "Manga";
  const spotlightStatus = (activeSpotlight == null ? void 0 : activeSpotlight.status) || "Ongoing";
  reactExports.useEffect(() => {
    if (allSpotlights.length <= 1) return;
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % allSpotlights.length);
        setIsTransitioning(false);
      }, 400);
    }, 6e3);
    return () => clearInterval(interval);
  }, [allSpotlights.length]);
  const handleRead = () => {
    if (activeSpotlight) navigate(`/manga/${activeSpotlight.id}`);
  };
  const goTo = (idx) => {
    if (idx === currentIndex) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex(idx);
      setIsTransitioning(false);
    }, 250);
  };
  const touchXRef = reactExports.useRef(null);
  const onTouchStart = (e) => {
    touchXRef.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e) => {
    if (touchXRef.current == null) return;
    const dx = e.changedTouches[0].clientX - touchXRef.current;
    touchXRef.current = null;
    if (Math.abs(dx) < 48 || allSpotlights.length <= 1) return;
    const next = (currentIndex + (dx < 0 ? 1 : -1) + allSpotlights.length) % allSpotlights.length;
    goTo(next);
  };
  if (!activeSpotlight) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative mb-16 md:mb-24", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "lg:hidden relative overflow-hidden rounded-3xl border border-white/[0.08] bg-background/40 shadow-2xl shadow-black/50",
        onTouchStart,
        onTouchEnd,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 h-[400px] overflow-hidden", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: getHighQualityImage(spotlightPoster),
                alt: "",
                className: "w-full h-full object-cover scale-105 brightness-50"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-primary/15 via-background/85 to-background" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-16 left-1/2 h-40 w-3/4 -translate-x-1/2 rounded-full bg-primary/25 blur-[80px]", "aria-hidden": true })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: `relative z-10 pt-8 px-4 pb-5 transition-all duration-500 ${isTransitioning ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4 mb-6", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-32 flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(GlassPanel, { className: "overflow-hidden rounded-2xl ring-1 ring-white/10 shadow-2xl shadow-black/60", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "img",
                    {
                      src: getHighQualityImage(spotlightPoster),
                      alt: spotlightName,
                      className: "w-full aspect-[3/4] object-cover"
                    }
                  ) }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0 py-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full border border-amber/30 bg-amber-500/15 backdrop-blur-md text-amber text-[10px] font-bold tracking-wider uppercase mb-2 shadow-lg shadow-black/30", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-2.5 h-2.5 fill-amber" }),
                      "Featured Manga"
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-xl font-black tracking-tight leading-tight text-white text-balance drop-shadow-lg mb-2 line-clamp-3", children: spotlightName }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs font-medium text-white/65", children: [
                      spotlightType,
                      " •",
                      " ",
                      activeSpotlight.chapters ? `${activeSpotlight.chapters} Chapters` : spotlightStatus
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    onClick: handleRead,
                    className: "flex-1 h-12 rounded-2xl bg-white text-black font-bold text-sm hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 shadow-xl shadow-black/40 ring-1 ring-white/40",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-4 h-4 fill-black" }),
                      "Read Now"
                    ]
                  }
                ) }),
                allSpotlights.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center gap-1 pt-4", children: allSpotlights.map((_, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    onClick: () => goTo(idx),
                    "aria-label": `Show spotlight ${idx + 1}`,
                    className: "flex h-7 w-7 items-center justify-center",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: `transition-all duration-300 rounded-full ${idx === currentIndex ? "w-6 h-1.5 bg-white" : "w-1.5 h-1.5 bg-white/35"}`
                      }
                    )
                  },
                  idx
                )) })
              ]
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden lg:grid grid-cols-12 gap-8 items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: `col-span-5 space-y-8 z-20 transition-all duration-500 ${isTransitioning ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0 animate-fade-in"}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber/30 bg-amber/10 text-amber text-xs font-bold tracking-wider uppercase", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-3 h-3 fill-amber" }),
              "Featured Manga"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display text-5xl md:text-7xl font-black tracking-tighter leading-[0.9] gradient-text", children: [
              spotlightName.split(" ").slice(0, 3).join(" "),
              spotlightName.split(" ").length > 3 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground/60", children: spotlightName.split(" ").slice(3).join(" ") })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-4 py-1.5 rounded-lg border border-border bg-muted/50 text-sm font-medium hover:bg-muted cursor-default transition-colors", children: spotlightType }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-4 py-1.5 rounded-lg border border-border bg-muted/50 text-sm font-medium hover:bg-muted cursor-default transition-colors", children: spotlightStatus }),
              activeSpotlight.chapters && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "px-4 py-1.5 rounded-lg border border-border bg-muted/50 text-sm font-medium hover:bg-muted cursor-default transition-colors", children: [
                activeSpotlight.chapters,
                " Chapters"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-4 pt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                onClick: handleRead,
                className: "h-14 px-8 rounded-full bg-foreground text-background font-bold text-lg hover:scale-105 active:scale-95 transition-all flex items-center gap-2 glow-primary",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-5 h-5 fill-background" }),
                  "Read Now"
                ]
              }
            ) }),
            allSpotlights.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2 pt-4", children: allSpotlights.map((_, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                onClick: () => {
                  setIsTransitioning(true);
                  setTimeout(() => {
                    setCurrentIndex(idx);
                    setIsTransitioning(false);
                  }, 300);
                },
                className: `transition-all duration-300 rounded-full ${idx === currentIndex ? "w-8 h-2 bg-foreground" : "w-2 h-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"}`
              },
              idx
            )) })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: `col-span-7 relative transition-all duration-700 ease-out ${isTransitioning ? "opacity-0 scale-95 translate-x-4" : "opacity-100 scale-100 translate-x-0"}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-[16/9] w-full rounded-[2.5rem] overflow-hidden group", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: getHighQualityImage(spotlightPoster),
                  alt: spotlightName,
                  className: "absolute inset-0 w-full h-full object-cover transition-transform duration-[2s] ease-out group-hover:scale-105"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-background via-background/20 to-transparent" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full bg-primary/20 blur-[100px] pointer-events-none mix-blend-screen" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -right-6 -bottom-6 w-48 aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl border-4 border-background rotate-[-6deg] group-hover:rotate-0 transition-transform duration-500", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: getHighQualityImage(spotlightPoster),
                alt: spotlightName,
                className: "w-full h-full object-cover"
              }
            ) })
          ]
        }
      )
    ] })
  ] });
}
const SPAN_CLASSES = [
  "col-span-1 md:col-span-2 row-span-2",
  "col-span-1 row-span-1",
  "col-span-1 row-span-2",
  "col-span-1 row-span-1"
];
const MangaTrendingCard = reactExports.memo(function MangaTrendingCard2({
  item,
  spanClass,
  index
}) {
  const navigate = useNavigate();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Peekable, { media: peekFromManga(item, `/manga/${item.id}`), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      onClick: () => navigate(`/manga/${item.id}`),
      className: `relative group rounded-3xl overflow-hidden cursor-pointer ${spanClass} border border-border/30 min-h-[200px] md:min-h-0 active:scale-[0.99]`,
      style: { contentVisibility: "auto", containIntrinsicSize: "auto 240px" },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: getHighQualityImage(item.poster),
            alt: item.name,
            loading: "lazy",
            decoding: "async",
            fetchPriority: "low",
            className: "w-full h-full object-cover md:transition-all md:duration-700 md:group-hover:scale-110"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-background/95 via-background/40 to-transparent opacity-80 md:group-hover:opacity-100 md:transition-opacity md:duration-500" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-0 left-0 right-0 p-4 md:p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end justify-between gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden md:block items-center gap-2 mb-2 opacity-0 group-hover:opacity-100 -translate-y-2 group-hover:translate-y-0 transition-all duration-500 delay-100 font-bold overflow-hidden line-clamp-1", children: item.chapters ? `${item.chapters} Chapters` : "Ongoing" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg md:text-3xl font-black text-foreground leading-tight line-clamp-2 drop-shadow-xl", children: item.name })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-5xl md:text-8xl font-black text-white/10 leading-none tracking-tighter drop-shadow-2xl shrink-0", children: index + 1 })
        ] }) })
      ]
    }
  ) });
});
const MangaTrendingGrid = reactExports.memo(function MangaTrendingGrid2({ items }) {
  if (!items || items.length === 0) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mb-12 md:mb-24", style: { contentVisibility: "auto", containIntrinsicSize: "auto 480px" }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      HomeSectionHeading,
      {
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Flame, { className: "w-5 h-5 text-primary" }),
        title: "Hype & Trending"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 auto-rows-[200px] md:auto-rows-[240px]", children: items.slice(0, 4).map((item, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(MangaTrendingCard, { item, spanClass: SPAN_CLASSES[index % 4], index }, item.id)) })
  ] });
});
const SECTION_ICONS = {
  Sword,
  Heart,
  Laugh,
  Sparkles,
  Rocket,
  Ghost,
  Flower2,
  Compass,
  Search,
  Brain,
  Zap,
  Flame
};
const LAYOUTS = ["grid", "carousel", "featured", "compact", "masonry"];
const FIXED_SECTION_ITEMS = 5;
function toLayout(value) {
  return LAYOUTS.includes(value) ? value : "grid";
}
function dedupeItems(items) {
  const seen = /* @__PURE__ */ new Set();
  return items.filter((item) => {
    const key = String(item.anilistId || item.malId || item.id || "").trim();
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}
function mapSearchRowsToItems(rawItems, canShowAdult) {
  return rawItems.filter((item) => {
    const isAdult = inferMangaAdultFlag(item);
    return !isAdult || canShowAdult;
  }).map((item) => {
    var _a, _b, _c;
    return {
      id: String(item.anilistId || item.malId || item.id),
      name: item.canonicalTitle || ((_a = item.title) == null ? void 0 : _a.english) || ((_b = item.title) == null ? void 0 : _b.romaji) || ((_c = item.title) == null ? void 0 : _c.native) || "Unknown",
      poster: item.poster || "",
      type: item.mediaType || "manga",
      status: item.status || void 0,
      rating: typeof item.score === "number" && Number.isFinite(item.score) ? (item.score / 10).toFixed(1) : void 0,
      chapters: typeof item.chapters === "number" && item.chapters > 0 ? item.chapters : void 0,
      malId: typeof item.malId === "number" ? item.malId : void 0,
      anilistId: typeof item.anilistId === "number" ? item.anilistId : void 0,
      mediaType: "manga"
    };
  });
}
function useInfiniteMangaSections({ showAdult }) {
  return useInfiniteQuery({
    queryKey: ["infiniteMangaSections", showAdult],
    queryFn: async ({ pageParam = 1 }) => {
      const feed = await getMangaSections(pageParam, showAdult);
      const sections = feed.sections.map((section) => ({
        id: section.id,
        title: section.title,
        genre: section.genre,
        layout: toLayout(section.layout),
        icon: SECTION_ICONS[section.icon],
        // Keep ALL fetched items — SectionContent paginates within each shelf.
        items: dedupeItems(mapSearchRowsToItems(section.items, showAdult))
      }));
      return {
        sections: sections.filter((s) => s.items.length >= FIXED_SECTION_ITEMS),
        nextPage: feed.hasNextPage ? feed.page + 1 : null
      };
    },
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 1,
    staleTime: 30 * 60 * 1e3,
    gcTime: 60 * 60 * 1e3,
    refetchOnWindowFocus: false
  });
}
const SECTION_SCROLL_PAGE_SIZE = 20;
function useMangaSectionItems(sectionId, isMobile, seedItems = []) {
  var _a;
  const { settings } = useContentSafetySettings();
  const query = useInfiniteQuery({
    queryKey: ["mangaSectionItems", sectionId, settings.showAdultEverywhere],
    queryFn: async ({ pageParam = 1 }) => {
      const data = await getMangaSectionItems(sectionId, pageParam, {
        adult: settings.showAdultEverywhere,
        perPage: SECTION_SCROLL_PAGE_SIZE
      });
      if (!data) return null;
      return data.items;
    },
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage || lastPage.length < SECTION_SCROLL_PAGE_SIZE) return void 0;
      return allPages.length + 1;
    },
    initialPageParam: 1,
    staleTime: 30 * 60 * 1e3,
    gcTime: 60 * 1e3,
    // short cache for scroll data
    enabled: Boolean(sectionId)
  });
  const fetchedItems = reactExports.useMemo(() => {
    var _a2;
    return dedupeItems(
      (((_a2 = query.data) == null ? void 0 : _a2.pages.filter(Boolean)) ?? []).map((page) => page).flat()
    );
  }, [(_a = query.data) == null ? void 0 : _a.pages]);
  const items = reactExports.useMemo(() => dedupeItems([...seedItems, ...fetchedItems]), [seedItems, fetchedItems]);
  const observerRef = reactExports.useRef(null);
  const sentinelRef = reactExports.useCallback(
    (node) => {
      if (query.isFetchingNextPage) return;
      if (observerRef.current) observerRef.current.disconnect();
      observerRef.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && query.hasNextPage) {
            query.fetchNextPage();
          }
        },
        { rootMargin: isMobile ? "200px" : "400px" }
      );
      if (node) observerRef.current.observe(node);
    },
    // query object methods are stable, isMobile is a simple boolean
    [query, isMobile]
  );
  return {
    items,
    loadMore: query.fetchNextPage,
    isFetching: query.isFetchingNextPage,
    hasMore: Boolean(query.hasNextPage),
    sentinelRef
  };
}
function SectionSkeleton({ layout }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-16 animate-pulse", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-6 px-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-2xl bg-white/5" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-6 bg-white/5 rounded-lg w-48" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3.5 bg-white/5 rounded-md w-28" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-8 bg-white/5 rounded-full w-24" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-4 overflow-hidden px-1", children: Array.from({ length: 7 }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-36 sm:w-44 md:w-48 flex-shrink-0 space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-[2/3] w-full rounded-2xl bg-white/[0.04] border border-white/5" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3.5 w-3/4 rounded bg-white/[0.05]" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3 w-1/2 rounded bg-white/[0.03]" })
    ] }, i)) })
  ] });
}
function SectionContent({ section, isMobile }) {
  const scrollRef = reactExports.useRef(null);
  const {
    items: sectionItems,
    loadMore,
    isFetching,
    hasMore,
    sentinelRef
  } = useMangaSectionItems(section.id, isMobile);
  const listItems = reactExports.useMemo(() => section.items.concat(sectionItems), [section.items, sectionItems]);
  const scroll = (direction) => {
    if (scrollRef.current) {
      const amount = direction === "left" ? -420 : 420;
      scrollRef.current.scrollBy({ left: amount, behavior: "smooth" });
    }
  };
  section.genre ? section.genre.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "") : "";
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4 group/section", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
    !isMobile && listItems.length > 4 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => scroll("left"),
          className: "absolute -left-3.5 top-[40%] -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/80 border border-white/15 text-white/90 shadow-xl backdrop-blur-md flex items-center justify-center opacity-0 group-hover/section:opacity-100 hover:scale-110 hover:bg-black transition-all",
          "aria-label": "Scroll left",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "w-5 h-5" })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => scroll("right"),
          className: "absolute -right-3.5 top-[40%] -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/80 border border-white/15 text-white/90 shadow-xl backdrop-blur-md flex items-center justify-center opacity-0 group-hover/section:opacity-100 hover:scale-110 hover:bg-black transition-all",
          "aria-label": "Scroll right",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-5 h-5" })
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        ref: scrollRef,
        className: "flex gap-4 overflow-x-auto pb-4 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0 scroll-smooth",
        children: [
          listItems.map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              className: "w-36 sm:w-44 md:w-48 flex-shrink-0",
              initial: isMobile ? false : { opacity: 0, y: 10 },
              animate: isMobile ? {} : { opacity: 1, y: 0 },
              transition: { delay: Math.min(i * 0.03, 0.3), duration: 0.3 },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(UnifiedMediaCard, { item, variant: "poster" })
            },
            `${item.id}-${i}`
          )),
          hasMore && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              ref: sentinelRef,
              className: "w-24 sm:w-32 flex-shrink-0 flex flex-col items-center justify-center rounded-2xl border border-white/5 bg-white/[0.02] p-4 text-center",
              children: isFetching ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-6 h-6 animate-spin text-primary" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  variant: "ghost",
                  size: "sm",
                  onClick: () => loadMore(),
                  className: "text-xs font-bold text-muted-foreground hover:text-foreground",
                  children: "Load more"
                }
              )
            }
          )
        ]
      }
    )
  ] }) });
}
function InfiniteMangaSections() {
  const isMobile = window.innerWidth < 768;
  const { settings } = useContentSafetySettings();
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status
  } = useInfiniteMangaSections({ showAdult: settings.showAdultEverywhere });
  const sections = reactExports.useMemo(() => {
    const seen = /* @__PURE__ */ new Set();
    const flat = [];
    for (const page of (data == null ? void 0 : data.pages) ?? []) {
      for (const section of page.sections) {
        if (seen.has(section.id)) continue;
        seen.add(section.id);
        flat.push(section);
      }
    }
    return flat;
  }, [data]);
  const observerRef = reactExports.useRef(null);
  const loadMoreRef = reactExports.useCallback((node) => {
    if (isFetchingNextPage) return;
    if (observerRef.current) observerRef.current.disconnect();
    observerRef.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasNextPage) {
        fetchNextPage();
      }
    }, {
      // Start the next page well before the sentinel is visible, so the shelves
      // are already there by the time the user scrolls to them.
      rootMargin: isMobile ? "400px" : "800px"
    });
    if (node) observerRef.current.observe(node);
  }, [isFetchingNextPage, hasNextPage, fetchNextPage, isMobile]);
  if (status === "pending") {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SectionSkeleton, { layout: "featured" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(SectionSkeleton, { layout: "carousel" })
    ] });
  }
  if (status === "error") {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center py-20 text-center space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Failed to load more sections." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: () => fetchNextPage(), variant: "outline", children: "Try Again" })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-16 md:space-y-24 mt-24", children: [
    sections.map((section) => /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative w-full", children: [
      (() => {
        const genreSlug = section.genre ? section.genre.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "") : "";
        const genreUrl = genreSlug ? `/manga/genre/${genreSlug}` : "/manga/discover";
        return /* @__PURE__ */ jsxRuntimeExports.jsx(
          HomeSectionHeading,
          {
            icon: section.icon ? /* @__PURE__ */ jsxRuntimeExports.jsx(section.icon, { className: "w-5 h-5 text-primary" }) : void 0,
            title: section.title,
            subtitle: `Curated ${section.genre}`,
            action: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Link,
              {
                to: genreUrl,
                className: "inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:text-primary/80 transition-colors uppercase tracking-wider self-start sm:self-center px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 hover:bg-primary/15 shrink-0",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                    "Explore all ",
                    section.genre
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-3.5 h-3.5" })
                ]
              }
            )
          }
        );
      })(),
      /* @__PURE__ */ jsxRuntimeExports.jsx(SectionContent, { section, isMobile })
    ] }, section.id)),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: loadMoreRef, className: "h-32 flex items-center justify-center", children: isFetchingNextPage ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-8 h-8 text-primary animate-spin" }) : hasNextPage ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-muted-foreground/50 text-sm font-medium", children: "Scroll for more" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-muted-foreground/50 text-sm font-medium", children: "You've reached the end" }) })
  ] });
}
const HENTAI_GENRE = "hentai";
const BASE_GENRES = [
  {
    genre: "action",
    label: "Action",
    poster: "https://s4.anilist.co/file/anilistcdn/media/manga/cover/large/bx106130-yPNeuSu75ey1.jpg",
    accent: "from-amber-600/60 via-orange-700/30 to-black/80",
    glowColor: "shadow-amber-500/30",
    textColor: "text-amber-300"
  },
  {
    genre: "fantasy",
    label: "Fantasy",
    poster: "https://s4.anilist.co/file/anilistcdn/media/manga/cover/large/bx98263-kIeaTXrAbGkj.jpg",
    accent: "from-cyan-600/60 via-blue-700/30 to-black/80",
    glowColor: "shadow-cyan-500/30",
    textColor: "text-cyan-300"
  },
  {
    genre: "romance",
    label: "Romance",
    poster: "https://s4.anilist.co/file/anilistcdn/media/manga/cover/large/bx140475-QEGtrmdvbpOv.jpg",
    accent: "from-rose-500/60 via-pink-700/30 to-black/80",
    glowColor: "shadow-rose-500/30",
    textColor: "text-rose-300"
  },
  {
    genre: "comedy",
    label: "Comedy",
    poster: "https://s4.anilist.co/file/anilistcdn/media/manga/cover/large/bx105778-euxXZEIfDY2u.png",
    accent: "from-yellow-500/60 via-amber-700/30 to-black/80",
    glowColor: "shadow-yellow-400/30",
    textColor: "text-yellow-300"
  },
  {
    genre: "drama",
    label: "Drama",
    poster: "https://s4.anilist.co/file/anilistcdn/media/manga/cover/large/bx146983-pLf4apCkFwKL.jpg",
    accent: "from-fuchsia-500/60 via-purple-700/30 to-black/80",
    glowColor: "shadow-fuchsia-500/30",
    textColor: "text-fuchsia-300"
  },
  {
    genre: "adventure",
    label: "Adventure",
    poster: "https://s4.anilist.co/file/anilistcdn/media/manga/cover/large/bx120980-RZ9WLd0o9hyo.jpg",
    accent: "from-emerald-500/60 via-teal-700/30 to-black/80",
    glowColor: "shadow-emerald-500/30",
    textColor: "text-emerald-300"
  },
  {
    genre: "historical",
    label: "Historical",
    poster: "https://s4.anilist.co/file/anilistcdn/media/manga/cover/large/bx105393-oiHumQoBGKG5.jpg",
    accent: "from-stone-500/60 via-amber-900/30 to-black/80",
    glowColor: "shadow-stone-400/30",
    textColor: "text-stone-300"
  },
  {
    genre: "isekai",
    label: "Isekai",
    poster: "https://s4.anilist.co/file/anilistcdn/media/manga/cover/large/nx86399-NwbRFVh5koqc.jpg",
    accent: "from-sky-500/60 via-indigo-700/30 to-black/80",
    glowColor: "shadow-sky-400/30",
    textColor: "text-sky-300"
  }
];
const HENTAI_CONFIG = {
  genre: "hentai",
  label: "18+ / Hentai",
  poster: "https://s4.anilist.co/file/anilistcdn/media/manga/cover/medium/b142439-vDUZOsE2s28s.jpg",
  accent: "from-rose-700/70 via-red-900/40 to-black/90",
  glowColor: "shadow-rose-600/50",
  textColor: "text-rose-300",
  tag: "18+",
  isAdult: true
};
function TiltGlassCard({
  config,
  onClick,
  isLarge = false
}) {
  const cardRef = reactExports.useRef(null);
  const [tilt, setTilt] = reactExports.useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = reactExports.useState(false);
  function handleMouseMove(e) {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    setTilt({ x: dy * -10, y: dx * 10 });
  }
  function handleMouseLeave() {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "button",
    {
      ref: cardRef,
      type: "button",
      onClick,
      onMouseMove: handleMouseMove,
      onMouseEnter: () => setIsHovered(true),
      onMouseLeave: handleMouseLeave,
      style: {
        transform: `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${isHovered ? 1.025 : 1})`,
        transition: isHovered ? "transform 0.1s ease-out" : "transform 0.45s cubic-bezier(0.23, 1, 0.32, 1)"
      },
      className: `relative w-full rounded-2xl overflow-hidden text-left
        border border-white/10 shadow-xl 
        focus:outline-none focus:ring-2 focus:ring-white/30
        ${isLarge ? "row-span-2" : ""}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: config.poster,
            alt: config.label,
            className: "absolute inset-0 w-full h-full object-cover",
            loading: "lazy"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `absolute inset-0 bg-gradient-to-t ${config.accent} opacity-90` }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute inset-0 pointer-events-none",
            style: {
              background: `linear-gradient(${130 + tilt.y * 3}deg, rgba(255,255,255,0.14) 0%, transparent 45%, rgba(255,255,255,0.04) 100%)`,
              transition: isHovered ? "none" : "background 0.45s ease"
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute inset-x-0 top-0 h-1/3 pointer-events-none",
            style: {
              background: "linear-gradient(180deg, rgba(255,255,255,0.07) 0%, transparent 100%)"
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-3 left-3 z-10", children: config.isAdult ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-rose-600/85 border border-rose-400/40 text-[10px] font-black uppercase tracking-wider text-white backdrop-blur-sm", children: "🔞 18+" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex items-center px-2.5 py-0.5 rounded-full bg-black/40 border border-white/15 text-[10px] font-bold uppercase tracking-wider text-white/75 backdrop-blur-sm", children: "Genre" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-x-0 bottom-0 z-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "p-4 flex items-end justify-between",
            style: {
              background: "linear-gradient(0deg, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.45) 55%, transparent 100%)",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "h3",
                  {
                    className: `font-extrabold capitalize leading-tight drop-shadow-md ${config.textColor} ${isLarge ? "text-2xl md:text-3xl" : "text-base md:text-lg"}`,
                    children: config.label
                  }
                ),
                isLarge && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-white/50 font-medium mt-1", children: "Tap to explore lane" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: `flex items-center justify-center w-8 h-8 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm transition-all duration-300 flex-shrink-0 ${isHovered ? "opacity-100 translate-x-0" : "opacity-0 translate-x-2"}`,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-3.5 h-3.5 text-white" })
                }
              )
            ]
          }
        ) })
      ]
    }
  );
}
function MangaGenreSlider() {
  const navigate = useNavigate();
  const { settings: contentSafetySettings } = useContentSafetySettings();
  const canShowAdultEverywhere = contentSafetySettings.showAdultEverywhere;
  const genres = reactExports.useMemo(
    () => canShowAdultEverywhere ? [...BASE_GENRES, HENTAI_CONFIG] : BASE_GENRES,
    [canShowAdultEverywhere]
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mb-16 relative", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      HomeSectionHeading,
      {
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Flame, { className: "w-5 h-5 text-primary" }),
        title: "Manga Genres"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "grid gap-3 md:gap-4",
        style: {
          gridTemplateColumns: "repeat(3, 1fr)",
          gridAutoRows: "clamp(160px, 20vw, 240px)"
        },
        children: genres.map((config, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          TiltGlassCard,
          {
            config,
            isLarge: index === 0,
            onClick: () => navigate(
              `/manga/genre/${encodeURIComponent(config.genre)}${config.genre === HENTAI_GENRE ? "?adult=1" : ""}`
            )
          },
          config.genre
        ))
      }
    )
  ] });
}
const ALL_CARDS = [
  // First card = LARGE featured (Popular Daily)
  {
    key: "feed-popular-daily",
    title: "Popular Daily",
    description: "Daily popularity lane — top titles heating up right now",
    to: "/manga/discover?feed=popular&window=day",
    icon: Flame,
    poster: "https://s4.anilist.co/file/anilistcdn/media/manga/cover/large/bx173020-vqe5J7U1cizO.png",
    accent: "from-rose-600/65 via-red-800/30 to-black/85",
    glowColor: "shadow-rose-500/30",
    textColor: "text-rose-300",
    iconColor: "text-rose-300"
  },
  // Small cards (col 2 + 3)
  {
    key: "manhwa",
    title: "Only Manhwa",
    description: "Korean-first catalog",
    to: "/manga/discover?type=manhwa",
    icon: Layers,
    poster: "https://s4.anilist.co/file/anilistcdn/media/manga/cover/large/bx119257-Pi21aq3ey9GG.jpg",
    accent: "from-sky-600/60 via-blue-800/30 to-black/85",
    glowColor: "shadow-sky-500/25",
    textColor: "text-sky-300",
    iconColor: "text-sky-300"
  },
  {
    key: "comics",
    title: "Only Comics",
    description: "Western comic flow",
    to: "/manga/discover?type=comics",
    icon: BookOpen,
    poster: "https://s4.anilist.co/file/anilistcdn/media/manga/cover/large/bx100805-3DCHMdZ5blWl.jpg",
    accent: "from-amber-500/60 via-orange-800/30 to-black/85",
    glowColor: "shadow-amber-500/25",
    textColor: "text-amber-300",
    iconColor: "text-amber-300"
  },
  {
    key: "feed-foryou-weekly",
    title: "For You",
    description: "Weekly personalized picks",
    to: "/manga/discover?feed=foryou&window=week",
    icon: Sparkles,
    poster: "https://s4.anilist.co/file/anilistcdn/media/manga/cover/large/bx169904-6gvkXMNpq66N.jpg",
    accent: "from-violet-600/60 via-purple-800/30 to-black/85",
    glowColor: "shadow-violet-500/25",
    textColor: "text-violet-300",
    iconColor: "text-violet-300"
  },
  {
    key: "feed-recent-monthly",
    title: "Recent Monthly",
    description: "Recently read this month",
    to: "/manga/discover?feed=recent&window=month",
    icon: Clock3,
    poster: "https://s4.anilist.co/file/anilistcdn/media/manga/cover/large/bx144946-cscic3n2SwdY.jpg",
    accent: "from-emerald-600/60 via-teal-800/30 to-black/85",
    glowColor: "shadow-emerald-500/25",
    textColor: "text-emerald-300",
    iconColor: "text-emerald-300"
  }
];
function TiltGlassFilterCard({
  item,
  onClick,
  isLarge = false
}) {
  const cardRef = reactExports.useRef(null);
  const [tilt, setTilt] = reactExports.useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = reactExports.useState(false);
  function handleMouseMove(e) {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    setTilt({ x: dy * -10, y: dx * 10 });
  }
  function handleMouseLeave() {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  }
  const Icon = item.icon;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "button",
    {
      ref: cardRef,
      type: "button",
      onClick,
      onMouseMove: handleMouseMove,
      onMouseEnter: () => setIsHovered(true),
      onMouseLeave: handleMouseLeave,
      style: {
        transform: `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${isHovered ? 1.025 : 1})`,
        transition: isHovered ? "transform 0.1s ease-out" : "transform 0.45s cubic-bezier(0.23, 1, 0.32, 1)"
      },
      className: `relative w-full rounded-2xl overflow-hidden text-left
        border border-white/10 shadow-xl
        focus:outline-none focus:ring-2 focus:ring-white/30
        ${isLarge ? "row-span-2" : ""}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: item.poster,
            alt: item.title,
            className: "absolute inset-0 w-full h-full object-cover",
            loading: "lazy"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `absolute inset-0 bg-gradient-to-t ${item.accent} opacity-90` }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute inset-0 pointer-events-none",
            style: {
              background: `linear-gradient(${130 + tilt.y * 3}deg, rgba(255,255,255,0.13) 0%, transparent 45%, rgba(255,255,255,0.04) 100%)`,
              transition: isHovered ? "none" : "background 0.45s ease"
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute inset-x-0 top-0 h-1/3 pointer-events-none",
            style: {
              background: "linear-gradient(180deg, rgba(255,255,255,0.06) 0%, transparent 100%)"
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-3 left-3 z-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center w-9 h-9 rounded-xl bg-black/40 border border-white/20 backdrop-blur-md shadow-lg", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: `w-4 h-4 ${item.iconColor} drop-shadow-lg` }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-x-0 bottom-0 z-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "p-4 flex items-end justify-between gap-2",
            style: {
              background: "linear-gradient(0deg, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.45) 55%, transparent 100%)",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "h3",
                  {
                    className: `font-extrabold leading-tight drop-shadow-md ${item.textColor} ${isLarge ? "text-xl md:text-2xl" : "text-sm md:text-base"}`,
                    children: item.title
                  }
                ),
                isLarge && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-white/50 font-medium mt-1 line-clamp-2", children: item.description })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: `flex items-center justify-center w-8 h-8 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm flex-shrink-0 transition-all duration-300 ${isHovered ? "opacity-100 translate-x-0" : "opacity-0 translate-x-2"}`,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-3.5 h-3.5 text-white" })
                }
              )
            ]
          }
        ) })
      ]
    }
  );
}
function MangaDiscoveryQuickFilters() {
  const navigate = useNavigate();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative mb-12", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      HomeSectionHeading,
      {
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Flame, { className: "w-5 h-5 text-primary" }),
        title: "Discovery",
        action: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => navigate("/manga/discover"),
            className: "self-start sm:self-auto inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold text-white/80 hover:text-white hover:bg-white/10 transition-all duration-200 backdrop-blur-sm shrink-0",
            children: [
              "Full Explorer",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-3.5 h-3.5" })
            ]
          }
        )
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "grid gap-3 md:gap-4",
        style: {
          gridTemplateColumns: "repeat(3, 1fr)",
          gridAutoRows: "clamp(150px, 18vw, 220px)"
        },
        children: ALL_CARDS.map((item, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          TiltGlassFilterCard,
          {
            item,
            isLarge: index === 0,
            onClick: () => navigate(item.to)
          },
          item.key
        ))
      }
    )
  ] });
}
function MangaDiscoveryLane({ items }) {
  const navigate = useNavigate();
  const validItems = reactExports.useMemo(() => items.filter((item) => Boolean(item && item.poster && item.name)), [items]);
  const [selectedIndex, setSelectedIndex] = reactExports.useState(0);
  const activeItem = validItems[selectedIndex] || validItems[0];
  const handleShuffle = () => {
    if (validItems.length <= 1) return;
    let nextIdx = Math.floor(Math.random() * validItems.length);
    if (nextIdx === selectedIndex) {
      nextIdx = (selectedIndex + 1) % validItems.length;
    }
    setSelectedIndex(nextIdx);
  };
  if (!activeItem) return null;
  const title = activeItem.name;
  const poster = getProxiedImageUrl(activeItem.poster || "");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mb-14", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      HomeSectionHeading,
      {
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-5 h-5 text-amber-400 fill-amber-400/20 animate-pulse" }),
        title: "Discovery Lane",
        subtitle: "Handpicked random discovery",
        action: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: handleShuffle,
            className: "flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/15 bg-white/5 hover:bg-white/10 text-xs font-bold text-foreground transition-all hover:scale-105 active:scale-95 shadow-sm shrink-0",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Shuffle, { className: "w-3.5 h-3.5 text-primary" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Pick Random" })
            ]
          }
        )
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative rounded-3xl overflow-hidden border border-white/15 shadow-2xl group", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 z-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: poster,
            alt: "",
            className: "w-full h-full object-cover scale-110 filter blur-xl brightness-[0.4] contrast-125 transition-all duration-700 group-hover:scale-105"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-background/90 via-background/60 to-transparent" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-90" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 md:gap-8 backdrop-blur-md bg-black/30", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-36 sm:w-44 md:w-48 flex-shrink-0 aspect-[2/3] rounded-2xl overflow-hidden border border-white/20 shadow-2xl relative group/card", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: poster,
              alt: title,
              className: "w-full h-full object-cover transition-transform duration-500 group-hover/card:scale-110"
            }
          ),
          activeItem.isAdult && /* @__PURE__ */ jsxRuntimeExports.jsx(AdultBadge, { className: "absolute top-2 right-2" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 text-center md:text-left space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center justify-center md:justify-start gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "px-3 py-1 rounded-full border border-amber-400/30 bg-amber-400/10 text-amber-300 text-[11px] font-black uppercase tracking-wider flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Flame, { className: "w-3 h-3 fill-amber-400" }),
              "Random Spotlight"
            ] }),
            activeItem.rating && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "px-2.5 py-1 rounded-full border border-white/10 bg-white/5 text-[11px] font-bold text-white flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-3 h-3 text-amber-400 fill-amber-400" }),
              activeItem.rating
            ] }),
            activeItem.type && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-2.5 py-1 rounded-full border border-white/10 bg-white/5 text-[11px] font-bold text-white/80 uppercase", children: activeItem.type })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-2xl md:text-4xl font-black tracking-tight text-white line-clamp-2 leading-tight", children: title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs md:text-sm text-gray-300 line-clamp-2 max-w-2xl leading-relaxed", children: "Discover thrilling stories, rich character arcs, and high quality artwork in this selected title." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-2 flex flex-wrap items-center justify-center md:justify-start gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                onClick: () => navigate(`/manga/${activeItem.id}`),
                className: "px-6 py-2.5 rounded-full bg-primary text-primary-foreground font-bold text-sm hover:scale-105 active:scale-95 transition-all flex items-center gap-2 shadow-lg shadow-primary/25",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-4 h-4" }),
                  "Start Reading"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                onClick: handleShuffle,
                className: "px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-md text-white font-bold text-sm hover:bg-white/20 transition-all border border-white/15 flex items-center gap-2",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Shuffle, { className: "w-4 h-4 text-white/80" }),
                  "Try Another"
                ]
              }
            )
          ] })
        ] })
      ] })
    ] })
  ] });
}
function toUnifiedMangaCard(manga, options) {
  var _a, _b, _c;
  const displayTitle = manga.canonicalTitle || ((_a = manga.title) == null ? void 0 : _a.english) || ((_b = manga.title) == null ? void 0 : _b.romaji) || ((_c = manga.title) == null ? void 0 : _c.native);
  const id = manga.id || (manga.anilistId ? `anilist:${manga.anilistId}` : manga.malId ? `mal:${manga.malId}` : "");
  if (!id || !displayTitle) return null;
  return {
    id: String(id),
    name: displayTitle,
    poster: manga.poster || "",
    type: manga.mediaType || "manga",
    status: manga.status || void 0,
    rating: typeof manga.score === "number" && Number.isFinite(manga.score) ? (manga.score / 10).toFixed(1) : void 0,
    chapters: typeof manga.chapters === "number" && manga.chapters > 0 ? manga.chapters : void 0,
    malId: typeof manga.malId === "number" ? manga.malId : void 0,
    anilistId: typeof manga.anilistId === "number" ? manga.anilistId : void 0,
    isAdult: options == null ? void 0 : options.isAdult,
    blurAdult: options == null ? void 0 : options.blurAdult,
    mediaType: "manga"
  };
}
function dedupeCards(items) {
  const seen = /* @__PURE__ */ new Set();
  return items.filter((item) => {
    const key = String(item.anilistId ?? item.malId ?? item.id);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}
function laneToCards(lane, limit, options) {
  if (!Array.isArray(lane)) return [];
  const mapped = lane.filter((item) => options.forceAdult || !inferMangaAdultFlag(item) || options.canShowAdult).map(
    (item) => toUnifiedMangaCard(item, { isAdult: options.forceAdult || inferMangaAdultFlag(item) })
  ).filter(Boolean);
  return dedupeCards(mapped).slice(0, limit);
}
function MangaHomePage() {
  useNavigate();
  const { openSettings } = useSettingsModal();
  const isNative = useIsNativeApp();
  const isMobile = useIsMobile();
  const { settings: contentSafetySettings, updateSettings: updateContentSafetySettings } = useContentSafetySettings();
  const canShowAdultEverywhere = contentSafetySettings.showAdultEverywhere;
  const { data: home, isLoading } = useMangaHome();
  const spotlightCards = reactExports.useMemo(
    () => {
      var _a;
      return laneToCards(((_a = home == null ? void 0 : home.spotlight) == null ? void 0 : _a.length) ? home.spotlight : home == null ? void 0 : home.topRated, 8, {
        canShowAdult: canShowAdultEverywhere
      });
    },
    [home, canShowAdultEverywhere]
  );
  const trendingCards = reactExports.useMemo(
    () => laneToCards(home == null ? void 0 : home.trending, 8, { canShowAdult: canShowAdultEverywhere }),
    [home, canShowAdultEverywhere]
  );
  const adultCards = reactExports.useMemo(
    () => laneToCards([...(home == null ? void 0 : home.adultLatest) ?? [], ...(home == null ? void 0 : home.adultPopular) ?? []], 12, {
      canShowAdult: true,
      forceAdult: true
    }),
    [home]
  );
  const isInitialLoading = isLoading && !home;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background text-foreground overflow-x-hidden", children: [
    !isNative && /* @__PURE__ */ jsxRuntimeExports.jsx(Background, {}),
    !isMobile && /* @__PURE__ */ jsxRuntimeExports.jsx(Sidebar, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: cn(
      "relative z-10 pr-6 py-6 max-w-[1800px] mx-auto pb-24 md:pb-6",
      isNative ? "pl-6" : "pl-6 md:pl-32"
    ), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Header, {}),
      isInitialLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-12 mt-6 animate-pulse", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative w-full aspect-[21/9] md:aspect-[21/7] rounded-3xl bg-muted/40 overflow-hidden border border-white/5 flex items-end p-6 md:p-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 max-w-xl", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-28 h-6 bg-white/10 rounded-full" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-3/4 h-10 md:h-14 bg-white/15 rounded-2xl" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-1/2 h-4 bg-white/10 rounded-lg" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-36 h-12 bg-white/20 rounded-full mt-4" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-3 overflow-hidden py-2", children: Array.from({ length: 8 }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-28 h-10 bg-muted/40 rounded-xl flex-shrink-0" }, i)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-48 h-7 bg-muted/50 rounded-lg mb-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4", children: Array.from({ length: 6 }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(CardSkeleton, {}, `row1-${i}`)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-56 h-7 bg-muted/50 rounded-lg mb-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4", children: Array.from({ length: 6 }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(CardSkeleton, {}, `row2-${i}`)) })
        ] })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        spotlightCards.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
          MangaHeroSection,
          {
            spotlight: spotlightCards[0],
            spotlights: spotlightCards
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(LastReadMangaSection, {}),
        trendingCards.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(MangaDiscoveryLane, { items: [...trendingCards, ...spotlightCards] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(IndexMangaShowcase, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx(MangaGenreSlider, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx(MangaDiscoveryQuickFilters, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mb-12 md:mb-16", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative overflow-hidden rounded-3xl border border-destructive/30", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: `${"/"}assets/image/content/manga18+.jpg`,
                alt: "18+ Manga Banner",
                className: "h-44 w-full object-cover md:h-56"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-black/70" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 flex flex-col justify-end p-5 md:p-7", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] font-black uppercase tracking-[0.2em] text-destructive", children: "18+ Zone" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-2 text-2xl md:text-3xl font-black tracking-tight text-white", children: "Hentai & Mature Manga" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 max-w-2xl text-sm text-white/80", children: "This section stays hidden unless you confirm you are 18+ and explicitly opt in." }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 flex flex-wrap gap-2", children: !canShowAdultEverywhere ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  onClick: () => openSettings("privacy", "mature-content-controls"),
                  className: "rounded-xl bg-destructive px-4 py-2 text-sm font-bold text-destructive-foreground hover:bg-destructive/85 transition-colors",
                  children: "Open 18+ Settings"
                }
              ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  onClick: () => updateContentSafetySettings({
                    showAdultEverywhere: false,
                    warnBeforeAdultOpen: true
                  }),
                  className: "rounded-xl border border-white/30 bg-black/40 px-4 py-2 text-sm font-bold text-white hover:bg-black/60 transition-colors",
                  children: "Hide 18+ Section"
                }
              ) })
            ] })
          ] }),
          canShowAdultEverywhere && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mb-3 text-lg md:text-xl font-black tracking-tight", children: "Mature Picks" }),
            isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4", children: Array.from({ length: 6 }).map((_, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(CardSkeleton, {}, `adult-skeleton-${index}`)) }) : adultCards.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4", children: adultCards.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx(UnifiedMediaCard, { item }, `manga-adult-${item.id}`)) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassPanel, { className: "p-5 border border-destructive/20", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No mature titles were returned right now. Open settings to adjust mature filters and warnings." }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  onClick: () => openSettings("privacy", "mature-content-controls"),
                  className: "mt-3 rounded-lg border border-white/20 bg-white/5 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-foreground hover:bg-white/10 transition-colors",
                  children: "Open Privacy Settings"
                }
              )
            ] })
          ] })
        ] }),
        trendingCards.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(MangaTrendingGrid, { items: trendingCards })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(InfiniteMangaSections, {})
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(MobileNav, {})
  ] });
}
export {
  MangaHomePage as default
};
