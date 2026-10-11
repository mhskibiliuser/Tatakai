import { r as reactExports, e as useNavigate, j as jsxRuntimeExports, L as Link } from "./react-vendor.CAo4XUiA.js";
import { g as getHighQualityImage, G as GlassPanel, P as Peekable, p as peekFromAnime, h as getHighQualityPoster, j as cn, u as useAuth, k as useContinueWatching, m as migrateGuestProgressToAccount, l as getProxiedImageUrl, n as getLocalContinueWatching, r as removeFromLocalContinueWatching, o as fetchGenreAnimes, q as fetchAniListDiscover, s as useIsMobile, t as useHomeData, B as Button, v as useLongPress, w as openMediaQuickPeek, x as usePublicTierLists, y as useDiscoverPlaylists, z as usePublicWatchRooms, A as PostCard, C as getProxiedJsonUrl, D as useIsNativeApp, E as useWatchlist, F as useWatchHistory, H as toHomeData, I as contentGraph, J as useConfirm, K as useIsDesktopApp, L as getLocalTorrentSessionHistory, M as clearLocalTorrentSessionHistory, N as removeLocalTorrentSessionHistory, O as setBrowsingRpc, Q as Background, S as Sidebar, R as ExtensionSlot } from "./index.C6yfkT5T.js";
import { M as MobileNav } from "./MobileNav.ABHzkhTQ.js";
import { H as Header } from "./Header.D6gxY_6M.js";
import { b6 as Capacitor, bf as ue } from "./vendor.CJyRs4QS.js";
import { A as AddToPlaylistButton } from "./AddToPlaylistButton.DNrDvuI4.js";
import { b as buildPreferredAnimeRouteId, u as usePreviewSource } from "./useHoverPreview.Cs_Lh1vM.js";
import { aI as Star, aJ as Play, bB as Flame, aG as ChevronLeft, b as ChevronRight, aT as Zap, bC as Trophy, bD as Hash, bE as ArrowUpRight, aW as History, aD as Clock, v as ArrowRight, X, bF as Calendar, bG as Sword, H as Heart, bH as Laugh, k as Sparkles, bI as Rocket, bJ as Ghost, $ as Flower2, bK as Compass, bL as Theater, m as Eye, b3 as Music, S as Search, bM as Brain, bN as Bot, bO as Scroll, R as RefreshCw, bP as Dumbbell, bQ as Target, Q as LoaderCircle, L as LayoutGrid, U as Users, bR as ListOrdered, az as Music2, M as MessageCircle, n as Radio, B as BookOpen, aA as Layers, bo as SlidersHorizontal, c as Check, j as ExternalLink, bs as Smartphone, D as Download, J as Trash2, bS as HardDriveDownload, bj as Activity, bT as CirclePause } from "./icons.C2gBBarQ.js";
import { H as Hls } from "./hls.BlgtCWcq.js";
import { H as HomeSectionHeading, R as RESUME_GRID_CLASS, a as ResumeCard, L as LastReadMangaSection, I as IndexMangaShowcase } from "./LastReadMangaSection.DgRMomCV.js";
import { u as useAniListGenres } from "./useAniListGenres.D0-w-cUA.js";
import { A as AnimeGrid } from "./AnimeGrid.DHeAAgqI.js";
import { a as useQuery, c as useInfiniteQuery } from "./tanstack.DPr3OB19.js";
import { A as AnimeCardWithPreview } from "./AnimeCardWithPreview.BLibCIKm.js";
import { H as HeroSkeleton, C as CardSkeleton } from "./skeleton-custom.3olGZrgu.js";
import { R as Reveal } from "./Reveal.Bcd6kfDM.js";
import { T as TierListCard } from "./TierListCard.xUrqhVp3.js";
import { P as PlaylistCard } from "./PlaylistCard.D4Kupyt4.js";
import { WatchRoomCard } from "./IsshoNiPage.pQTRi_gC.js";
import { u as useFeed } from "./useFeed.Ba280OYv.js";
import { R as ReviewPopup } from "./ReviewPopup.D-oIDxcg.js";
import { A as AnimatePresence, m as motion } from "./motion.DVGLRFCH.js";
import { u as useGenrePreferences, a as usePersonalizedRecommendations } from "./useRecommendations.BpYZIJJy.js";
import { S as SectionHeading } from "./SectionHeading.D7LOUoID.js";
import "./supabase.WuRMX5Dg.js";
import "./radix.BiK9uYXL.js";
import "./editor.Dxw8dtyw.js";
import "./charts.Dr1fgDJ-.js";
import "./useNotifications.BzSJE8km.js";
import "./useTrackedShows.Dbf34fk8.js";
import "./useNextAiringEpisodes.COq8rfNQ.js";
import "./AnimatedCounter.DVb9HioJ.js";
import "./useDebounce.DLNDL8OB.js";
const HeroSection = reactExports.memo(function HeroSection2({ spotlight, spotlights = [] }) {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = reactExports.useState(0);
  const [isTransitioning, setIsTransitioning] = reactExports.useState(false);
  const touchXRef = reactExports.useRef(null);
  const allSpotlights = spotlights.length > 0 ? spotlights.slice(0, 5) : [spotlight];
  const activeSpotlight = allSpotlights[currentIndex] || spotlight;
  const heroImage = activeSpotlight.banner || activeSpotlight.poster;
  const routeAnimeId = buildPreferredAnimeRouteId({
    id: activeSpotlight.id,
    name: activeSpotlight.name,
    malId: activeSpotlight == null ? void 0 : activeSpotlight.malId,
    anilistId: activeSpotlight == null ? void 0 : activeSpotlight.anilistId
  });
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
  const handleWatch = () => {
    navigate(`/anime/${routeAnimeId || activeSpotlight.id}`);
  };
  const goTo = (idx) => {
    if (idx === currentIndex) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex(idx);
      setIsTransitioning(false);
    }, 250);
  };
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
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative mb-12 md:mb-24", style: { contentVisibility: "auto" }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "lg:hidden relative overflow-hidden rounded-3xl border border-white/[0.08] bg-background/40 shadow-2xl shadow-black/50",
        onTouchStart,
        onTouchEnd,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 overflow-hidden", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: getHighQualityImage(activeSpotlight.banner || activeSpotlight.poster),
                alt: "",
                fetchPriority: "high",
                decoding: "async",
                className: "w-full h-full object-cover scale-105 brightness-[0.55]"
              },
              activeSpotlight.id
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-primary/15 via-background/80 to-background" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-background to-transparent" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-16 left-1/2 h-40 w-3/4 -translate-x-1/2 rounded-full bg-primary/25 blur-[80px]", "aria-hidden": true })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `relative z-10 px-4 pb-5 pt-10 transition-opacity duration-300 ${isTransitioning ? "opacity-0" : "opacity-100"}`, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3.5 mb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-28 flex-shrink-0 overflow-hidden rounded-2xl border border-white/15 shadow-2xl shadow-black/60 ring-1 ring-white/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: getHighQualityImage(activeSpotlight.poster),
                  alt: activeSpotlight.name,
                  loading: "eager",
                  decoding: "async",
                  className: "w-full aspect-[3/4] object-cover"
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0 py-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-amber/30 bg-black/50 backdrop-blur-md text-amber text-[10px] font-bold tracking-wider uppercase mb-2 shadow-lg shadow-black/30", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-2.5 h-2.5 fill-amber" }),
                  "#",
                  activeSpotlight.rank,
                  " Spotlight"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-black tracking-tight leading-[1.05] text-white text-balance drop-shadow-lg mb-2 line-clamp-3", children: activeSpotlight.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1.5 mb-2.5 overflow-x-auto no-scrollbar scrollbar-hide [-webkit-overflow-scrolling:touch]", children: activeSpotlight.otherInfo.slice(0, 4).map((info, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "shrink-0 px-2 py-0.5 rounded-md border border-white/15 bg-black/50 backdrop-blur-md text-[10px] font-semibold text-white/80",
                    children: info
                  },
                  idx
                )) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[11px] font-semibold tabular-nums text-white/60", children: [
                  "SUB ",
                  activeSpotlight.episodes.sub,
                  " ",
                  activeSpotlight.episodes.dub ? `· DUB ${activeSpotlight.episodes.dub}` : ""
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[13px] text-white/65 leading-relaxed line-clamp-2 mb-4", children: activeSpotlight.description }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  onClick: handleWatch,
                  className: "flex-1 h-[52px] rounded-2xl bg-white text-black font-bold text-[15px] active:scale-[0.98] transition-transform flex items-center justify-center gap-2 shadow-xl shadow-black/40 ring-1 ring-white/40",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "w-4 h-4 fill-black" }),
                    "Watch Now"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                AddToPlaylistButton,
                {
                  animeId: activeSpotlight.id,
                  animeName: activeSpotlight.name,
                  animePoster: activeSpotlight.poster,
                  variant: "icon",
                  className: "h-[52px] w-[52px] shrink-0 rounded-2xl border border-white/15 bg-black/50 backdrop-blur-md ring-1 ring-white/10 flex items-center justify-center active:scale-95 transition-transform"
                }
              )
            ] }),
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
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden lg:grid grid-cols-12 gap-8 items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `col-span-5 space-y-8 z-20 transition-all duration-500 ${isTransitioning ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0 animate-fade-in"}`, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber/30 bg-amber/10 text-amber text-xs font-bold tracking-wider uppercase", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-3 h-3 fill-amber" }),
          "#",
          activeSpotlight.rank,
          " Spotlight"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display text-5xl md:text-7xl font-black tracking-tighter leading-[0.9] gradient-text", children: [
          activeSpotlight.name.split(" ").slice(0, 2).join(" "),
          activeSpotlight.name.split(" ").length > 2 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground/60", children: activeSpotlight.name.split(" ").slice(2).join(" ") })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg text-muted-foreground max-w-md leading-relaxed border-l-2 border-border pl-6 line-clamp-3", children: activeSpotlight.description }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-3", children: activeSpotlight.otherInfo.slice(0, 4).map((info, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: "px-4 py-1.5 rounded-lg border border-border bg-muted/50 text-sm font-medium hover:bg-muted cursor-default transition-colors",
            children: info
          },
          idx
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 pt-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              onClick: handleWatch,
              className: "h-14 px-8 rounded-full bg-foreground text-background font-bold text-lg hover:scale-105 active:scale-95 transition-all flex items-center gap-2 glow-primary",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "w-5 h-5 fill-background" }),
                "Watch Now"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            AddToPlaylistButton,
            {
              animeId: activeSpotlight.id,
              animeName: activeSpotlight.name,
              animePoster: activeSpotlight.poster,
              variant: "icon",
              className: "h-14 w-14 rounded-full border border-border bg-muted/50 flex items-center justify-center hover:bg-muted hover:border-foreground/30 transition-all"
            }
          )
        ] }),
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
            className: `transition-all duration-300 rounded-full ${idx === currentIndex ? "w-8 h-2 bg-foreground" : "w-2 h-2 bg-muted-foreground/50 hover:bg-muted-foreground"}`
          },
          idx
        )) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `col-span-7 relative h-[650px] transition-all duration-500 ${isTransitioning ? "opacity-0 scale-95" : "opacity-100 scale-100 animate-fade-in animation-delay-200"}`, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[70%] bg-gradient-to-br from-primary/40 to-secondary/40 rounded-full blur-[100px] opacity-40 animate-pulse-slow" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(GlassPanel, { className: "w-full h-full p-2 rotate-[-2deg] hover:rotate-0 transition-transform duration-700 ease-out group", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full h-full rounded-2xl overflow-hidden", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: getHighQualityImage(heroImage),
              alt: activeSpotlight.name,
              className: "w-full h-full object-cover filter brightness-90 contrast-110 transition-transform duration-700 group-hover:scale-105"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute bottom-8 left-8 right-8 flex justify-between items-end", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1", children: "Episodes" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-foreground font-medium", children: [
                "SUB: ",
                activeSpotlight.episodes.sub,
                " | DUB: ",
                activeSpotlight.episodes.dub || "N/A"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-6xl font-black text-foreground/10 tracking-widest font-display", children: [
              "#",
              activeSpotlight.rank
            ] })
          ] })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassPanel, { className: "absolute -bottom-10 -left-10 p-6 w-64 rotate-[3deg] z-30 animate-float", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center mb-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold text-muted-foreground", children: "JAPANESE" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-4 h-4 text-amber fill-amber" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-lg font-bold text-foreground mb-1 line-clamp-1", children: activeSpotlight.jname }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: "Original Title" })
        ] })
      ] })
    ] })
  ] });
});
const SPAN_CLASSES = [
  "col-span-1 md:col-span-2 row-span-2",
  "col-span-1 row-span-1",
  "col-span-1 row-span-2",
  "col-span-1 row-span-1"
];
const TRENDING_PREVIEW_CACHE_TTL = 20 * 60 * 1e3;
const trendingPreviewCache = /* @__PURE__ */ new Map();
const resolveAniListId = (value) => {
  const raw = String(value ?? "").trim();
  if (!raw) return null;
  const prefixed = raw.match(/^anilist[:_-]?(\d+)$/i);
  if (prefixed == null ? void 0 : prefixed[1]) return Number(prefixed[1]);
  const numeric = Number(raw);
  return Number.isFinite(numeric) && numeric > 0 ? numeric : null;
};
const getTrendingPoster = (poster) => {
  if (!poster) return "/placeholder.svg";
  return poster.replace("/cover/medium/", "/cover/large/").replace(/\/banner\/(small|medium)\//, "/banner/large/");
};
const TrendingCard = reactExports.memo(function TrendingCard2({ anime, spanClass }) {
  const navigate = useNavigate();
  const routeAnimeId = buildPreferredAnimeRouteId({
    id: anime.id,
    name: anime.name,
    malId: (anime == null ? void 0 : anime.malId) ?? (anime == null ? void 0 : anime.malID) ?? (anime == null ? void 0 : anime.mal_id),
    anilistId: (anime == null ? void 0 : anime.anilistId) ?? (anime == null ? void 0 : anime.anilistID) ?? (anime == null ? void 0 : anime.anilist_id)
  });
  const previewAnimeId = routeAnimeId || String(anime.id || "").trim();
  const previewAniListId = (anime == null ? void 0 : anime.anilistId) ?? (anime == null ? void 0 : anime.anilistID) ?? (anime == null ? void 0 : anime.anilist_id) ?? resolveAniListId(anime.id) ?? null;
  const [isHovering, setIsHovering] = reactExports.useState(false);
  const [previewUrl, setPreviewUrl] = reactExports.useState(null);
  const [isPreviewM3U8, setIsPreviewM3U8] = reactExports.useState(false);
  const [isLoading, setIsLoading] = reactExports.useState(false);
  const [previewError, setPreviewError] = reactExports.useState(false);
  const videoRef = reactExports.useRef(null);
  const hlsRef = reactExports.useRef(null);
  reactExports.useRef(null);
  const { source, loading, startHover, cancelHover } = usePreviewSource();
  reactExports.useEffect(() => {
    if (!previewAnimeId) return;
    const cached = trendingPreviewCache.get(previewAnimeId);
    if (!cached) return;
    if (Date.now() - cached.cachedAt > TRENDING_PREVIEW_CACHE_TTL) {
      trendingPreviewCache.delete(previewAnimeId);
      return;
    }
    setPreviewUrl(cached.url);
    setIsPreviewM3U8(cached.isM3U8);
  }, [previewAnimeId]);
  reactExports.useEffect(() => {
    return () => {
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
    };
  }, []);
  reactExports.useEffect(() => {
    if (!isHovering || !previewAniListId) {
      if (!isHovering) cancelHover();
      return;
    }
    startHover(previewAniListId, [anime.name]);
  }, [anime.name, cancelHover, isHovering, previewAniListId, startHover]);
  reactExports.useEffect(() => {
    const streamUrl = (source == null ? void 0 : source.streamUrl) ?? null;
    if (!streamUrl || !videoRef.current) {
      if (isHovering && !loading && !previewUrl) {
        setPreviewError(true);
      }
      setPreviewUrl(null);
      setIsPreviewM3U8(false);
      return;
    }
    setPreviewError(false);
    setPreviewUrl(streamUrl);
    setIsPreviewM3U8(Boolean(source == null ? void 0 : source.isHls));
    trendingPreviewCache.set(previewAnimeId, {
      url: streamUrl,
      isM3U8: Boolean(source == null ? void 0 : source.isHls),
      cachedAt: Date.now()
    });
  }, [isHovering, loading, previewAnimeId, previewUrl, source]);
  reactExports.useEffect(() => {
    if (!previewUrl || !videoRef.current) return;
    const videoEl = videoRef.current;
    if (hlsRef.current) {
      hlsRef.current.destroy();
      hlsRef.current = null;
    }
    if (isPreviewM3U8) {
      if (Hls.isSupported()) {
        const hls = new Hls({
          enableWorker: true,
          lowLatencyMode: false,
          maxBufferLength: 8,
          xhrSetup: () => {
          }
        });
        hls.loadSource(previewUrl);
        hls.attachMedia(videoEl);
        hls.on(Hls.Events.ERROR, (_, data) => {
          if (data.fatal) setPreviewError(true);
        });
        hlsRef.current = hls;
      } else if (videoEl.canPlayType("application/vnd.apple.mpegurl")) {
        videoEl.src = previewUrl;
      } else {
        setPreviewError(true);
      }
    } else {
      videoEl.src = previewUrl;
    }
    return () => {
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
    };
  }, [previewUrl, isPreviewM3U8]);
  reactExports.useEffect(() => {
    if (videoRef.current) {
      if (isHovering && previewUrl) {
        if (hlsRef.current) {
          hlsRef.current.startLoad(-1);
        }
        videoRef.current.play().catch(() => {
        });
      } else {
        videoRef.current.pause();
        if (hlsRef.current && !isHovering) {
          hlsRef.current.stopLoad();
        }
      }
    }
  }, [isHovering, previewUrl]);
  reactExports.useEffect(() => {
    setIsLoading(Boolean(isHovering && loading && !previewUrl));
  }, [isHovering, loading, previewUrl]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Peekable,
    {
      media: peekFromAnime(
        { id: anime.id, name: anime.name, poster: anime.poster, anilistId: previewAniListId },
        routeAnimeId ? `/anime/${routeAnimeId}` : `/search?q=${encodeURIComponent(anime.name)}`
      ),
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          onClick: () => {
            if (routeAnimeId) {
              navigate(`/anime/${routeAnimeId}`);
              return;
            }
            navigate(`/search?q=${encodeURIComponent(anime.name)}`);
          },
          onMouseEnter: () => {
            var _a;
            if (typeof window !== "undefined" && ((_a = window.matchMedia) == null ? void 0 : _a.call(window, "(hover: none)").matches)) return;
            setIsHovering(true);
            if (previewError && !previewUrl) {
              setPreviewError(false);
            }
          },
          onMouseLeave: () => {
            setIsHovering(false);
            cancelHover();
          },
          className: `relative group rounded-3xl overflow-hidden cursor-pointer ${spanClass} border border-border/30 min-h-[200px] md:min-h-0 active:scale-[0.99]`,
          style: { contentVisibility: "auto", containIntrinsicSize: "auto 300px" },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: getTrendingPoster(anime.poster),
                alt: anime.name,
                loading: "lazy",
                decoding: "async",
                fetchPriority: "low",
                className: `w-full h-full object-cover md:transition-all md:duration-700 ${isHovering && previewUrl ? "opacity-0" : "md:group-hover:scale-110"}`
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "video",
              {
                ref: videoRef,
                className: `absolute inset-0 hidden w-full h-full object-cover transition-opacity duration-300 md:block ${isHovering && previewUrl ? "opacity-100" : "opacity-0"}`,
                muted: true,
                loop: true,
                playsInline: true,
                preload: "none",
                crossOrigin: "anonymous"
              }
            ),
            isHovering && isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 hidden items-center justify-center bg-black/30 z-10 md:flex", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-80 md:transition-opacity md:duration-300 md:group-hover:opacity-60" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-3 left-3 md:top-4 md:left-4 z-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "px-2.5 py-1 md:px-3 rounded-full bg-black/50 border border-white/10 text-[11px] md:text-xs font-bold uppercase tracking-wider", children: [
              "#",
              anime.rank,
              " Trending"
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute bottom-0 left-0 right-0 p-4 md:p-6 z-10", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-display text-lg md:text-2xl font-bold mb-1 leading-tight line-clamp-2", children: anime.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs md:text-sm font-medium text-primary", children: [
                  "Rank #",
                  anime.rank
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden w-10 h-10 rounded-full bg-foreground text-background md:flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "w-4 h-4 fill-background" }) })
              ] })
            ] })
          ]
        }
      )
    }
  );
});
const TrendingGrid = reactExports.memo(function TrendingGrid2({ animes }) {
  const displayAnimes = animes.slice(0, 4);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mb-14 md:mb-24", style: { contentVisibility: "auto", containIntrinsicSize: "auto 500px" }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-5 md:mb-8 px-1 md:px-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-display text-xl md:text-2xl font-semibold tracking-tight flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Flame, { className: "w-5 h-5 text-orange" }),
        "Trending Now"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/trending", className: "text-sm text-muted-foreground hover:text-foreground transition-colors border-b border-transparent hover:border-foreground pb-0.5", children: "View All" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 md:grid-rows-2 gap-3 md:gap-4 h-auto md:h-[600px]", children: displayAnimes.map((anime, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingCard, { anime, spanClass: SPAN_CLASSES[idx] }, anime.id)) })
  ] });
});
function LatestEpisodeCard({ anime }) {
  var _a;
  const navigate = useNavigate();
  const videoRef = reactExports.useRef(null);
  const { startHover, cancelHover, source } = usePreviewSource();
  const canHover = typeof window !== "undefined" && ((_a = window.matchMedia) == null ? void 0 : _a.call(window, "(hover: hover)").matches);
  reactExports.useEffect(() => {
    if (!videoRef.current) return;
    if ((source == null ? void 0 : source.streamUrl) && !source.isHls) {
      videoRef.current.src = source.streamUrl;
      videoRef.current.play().catch(() => {
      });
    } else if (!(source == null ? void 0 : source.streamUrl)) {
      videoRef.current.pause();
      videoRef.current.removeAttribute("src");
    }
  }, [source]);
  const anilistId = anime.anilistId ?? 0;
  const titles = [anime.name].filter(Boolean);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Peekable, { media: peekFromAnime(anime, `/anime/${anime.id}`), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    GlassPanel,
    {
      hoverEffect: false,
      className: "group relative flex w-[260px] md:w-[300px] shrink-0 snap-start cursor-pointer items-stretch gap-3 md:gap-4 rounded-2xl border border-white/[0.05] bg-white/[0.02] p-3 active:scale-[0.98]",
      style: { contentVisibility: "auto", containIntrinsicSize: "auto 144px" },
      onClick: () => navigate(`/anime/${anime.id}`),
      onMouseEnter: () => {
        if (canHover) startHover(anilistId, titles);
      },
      onMouseLeave: () => {
        if (canHover) cancelHover();
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative h-[110px] md:h-[120px] w-[80px] md:w-[88px] shrink-0 overflow-hidden rounded-xl bg-white/[0.05]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: (anime.poster || "").replace("/cover/medium/", "/cover/large/").replace(/\/banner\/(small|medium)\//, "/banner/large/") || getHighQualityPoster(anime.poster, anime.anilistId),
              alt: anime.name,
              loading: "lazy",
              decoding: "async",
              fetchPriority: "low",
              className: "h-full w-full object-cover",
              ...!(source == null ? void 0 : source.streamUrl) ? { "data-preview-unavailable": "true" } : {}
            }
          ),
          canHover && (source == null ? void 0 : source.streamUrl) && !source.isHls && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "video",
            {
              ref: videoRef,
              className: "absolute inset-0 h-full w-full object-cover opacity-100 transition-opacity duration-300",
              muted: true,
              loop: true,
              playsInline: true,
              preload: "none"
            }
          ),
          !(source == null ? void 0 : source.streamUrl) && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 hidden items-center justify-center bg-black/40 opacity-0 transition-all duration-300 group-hover:opacity-100 md:flex", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-sm ring-1 ring-white/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "ml-1 h-4 w-4 fill-current" }) }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-w-0 flex-1 flex-col justify-between py-0.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "line-clamp-2 text-sm font-semibold leading-snug text-white/90 transition-colors group-hover:text-white", children: anime.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 text-[11px] font-medium text-white/40", children: [
              anime.type,
              " • ",
              anime.duration
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-auto flex flex-wrap gap-1.5 pt-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 rounded bg-white/[0.08] px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white/70", children: [
              "Sub ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tabular-nums text-white/40", children: anime.episodes.sub })
            ] }),
            anime.episodes.dub > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 rounded bg-primary/15 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary", children: [
              "Dub ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tabular-nums text-primary/60", children: anime.episodes.dub })
            ] })
          ] })
        ] })
      ]
    }
  ) });
}
const LatestEpisodes = reactExports.memo(function LatestEpisodes2({ animes }) {
  const scrollRef = reactExports.useRef(null);
  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 320;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth"
      });
    }
  };
  if (!animes || animes.length === 0) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mb-10 md:mb-12 space-y-4 md:space-y-5", style: { contentVisibility: "auto", containIntrinsicSize: "auto 260px" }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      HomeSectionHeading,
      {
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-5 h-5 text-amber" }),
        title: "Latest Episodes",
        action: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden md:flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: () => scroll("left"),
              "aria-label": "Scroll left",
              className: "flex h-8 w-8 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.02] text-white/60 transition-colors hover:bg-white/[0.08] hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "h-4 w-4" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: () => scroll("right"),
              "aria-label": "Scroll right",
              className: "flex h-8 w-8 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.02] text-white/60 transition-colors hover:bg-white/[0.08] hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-4 w-4" })
            }
          )
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        ref: scrollRef,
        className: "flex gap-3 md:gap-4 overflow-x-auto pb-4 pt-1 snap-x snap-proximity scroll-smooth scrollbar-hide [-webkit-overflow-scrolling:touch] [touch-action:pan-x_pan-y] -mx-1 px-1",
        style: { scrollbarWidth: "none", msOverflowStyle: "none" },
        children: animes.slice(0, 10).map((anime) => /* @__PURE__ */ jsxRuntimeExports.jsx(LatestEpisodeCard, { anime }, anime.id))
      }
    )
  ] });
});
const TopAnimeSection = reactExports.memo(function TopAnimeSection2({ today, week, month }) {
  const navigate = useNavigate();
  const [activePeriod, setActivePeriod] = reactExports.useState("today");
  const periods = [
    { key: "today", label: "Today" },
    { key: "week", label: "This Week" },
    { key: "month", label: "This Month" }
  ];
  const getAnimes = () => {
    switch (activePeriod) {
      case "today":
        return today;
      case "week":
        return week;
      case "month":
        return month;
    }
  };
  const getRankStyles = (index) => {
    if (index === 0) return "bg-gradient-to-br from-yellow-300 to-amber-500 text-black shadow-lg shadow-amber-500/40 w-9 h-9 text-base";
    if (index === 1) return "bg-gradient-to-br from-gray-200 to-gray-400 text-black shadow-lg shadow-gray-400/30 w-9 h-9 text-base";
    if (index === 2) return "bg-gradient-to-br from-orange-300 to-orange-500 text-black shadow-lg shadow-orange-500/30 w-9 h-9 text-base";
    return "bg-black/50 backdrop-blur-sm border border-white/10 text-white/90 w-7 h-7 text-xs";
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mb-14 md:mb-24", style: { contentVisibility: "auto", containIntrinsicSize: "auto 600px" }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center justify-between gap-3 mb-5 md:mb-8 px-1 md:px-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-display text-xl md:text-2xl font-semibold tracking-tight flex items-center gap-2.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-1.5 rounded-xl bg-amber/10 text-amber border border-amber/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "w-5 h-5" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          "Top ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-amber", children: "10" }),
          " Anime"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex w-full sm:w-auto gap-1 p-1 rounded-full bg-white/5 border border-white/10 max-w-full overflow-x-auto no-scrollbar scrollbar-hide [-webkit-overflow-scrolling:touch] [touch-action:pan-x_pan-y] overscroll-x-contain", children: periods.map((period) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => setActivePeriod(period.key),
          className: cn(
            "shrink-0 min-h-[36px] px-3 md:px-4 py-1.5 rounded-full text-xs md:text-sm font-semibold transition-colors active:scale-95",
            activePeriod === period.key ? "bg-white/15 text-white shadow-sm" : "text-muted-foreground hover:text-white hover:bg-white/5"
          ),
          children: period.label
        },
        period.key
      )) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 md:gap-5", children: getAnimes().slice(0, 10).map((anime, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(Peekable, { media: peekFromAnime(anime, `/anime/${anime.id}`), children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        onClick: () => navigate(`/anime/${anime.id}`),
        className: "group overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] text-left transition-transform duration-200 active:scale-[0.98] md:hover:border-white/[0.14]",
        style: { contentVisibility: "auto", containIntrinsicSize: "auto 280px" },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-[2/3]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: getHighQualityPoster(anime.poster, anime.anilistId),
              alt: anime.name,
              className: "w-full h-full object-cover md:transition-transform md:duration-500 md:group-hover:scale-105",
              loading: "lazy",
              decoding: "async",
              fetchPriority: "low"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `absolute top-2.5 left-2.5 md:top-3 md:left-3 rounded-lg flex items-center justify-center font-black ${getRankStyles(idx)}`, children: anime.rank ?? idx + 1 }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute bottom-0 left-0 right-0 p-3 md:p-4 pt-10", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-bold text-[13px] md:text-sm leading-tight line-clamp-2 drop-shadow-md md:group-hover:text-amber md:transition-colors", children: anime.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1.5 md:mt-2 flex items-center gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center bg-black/50 border border-white/10 px-2 py-0.5 rounded-md text-[10px] font-mono font-semibold uppercase tracking-wider text-white/80", children: [
              "EP ",
              anime.episodes.sub
            ] }) })
          ] })
        ] })
      }
    ) }, anime.id)) })
  ] });
});
const ACCENT_COLORS = [
  { text: "text-rose-400", glow: "bg-rose-500" },
  { text: "text-amber-400", glow: "bg-amber-500" },
  { text: "text-emerald-400", glow: "bg-emerald-500" },
  { text: "text-sky-400", glow: "bg-sky-500" },
  { text: "text-violet-400", glow: "bg-violet-500" },
  { text: "text-orange-400", glow: "bg-orange-500" },
  { text: "text-pink-400", glow: "bg-pink-500" },
  { text: "text-teal-400", glow: "bg-teal-500" }
];
function getAccent(genre) {
  let hash = 0;
  for (let i = 0; i < genre.length; i++) {
    hash = genre.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % ACCENT_COLORS.length;
  return ACCENT_COLORS[index];
}
function GenreCloud({ genres }) {
  const navigate = useNavigate();
  const { genres: allGenres } = useAniListGenres();
  const mergedGenres = Array.from(/* @__PURE__ */ new Set([...genres || [], ...allGenres]));
  const handleGenreClick = (genre) => {
    navigate(`/genre/${genre.toLowerCase().replace(/\s+/g, "-")}`);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mb-24", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5 mb-8 px-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-1.5 rounded-lg bg-primary/10 text-primary", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Hash, { className: "w-5 h-5" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-2xl font-semibold tracking-tight", children: "Explore Genres" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3", children: mergedGenres.map((genre) => {
      const accent = getAccent(genre);
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: () => handleGenreClick(genre),
          className: "group relative overflow-hidden rounded-2xl px-5 py-4 border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] hover:border-white/20 transition-all duration-300 hover:-translate-y-0.5 text-left",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: `absolute -top-6 -right-6 w-16 h-16 rounded-full blur-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 ${accent.glow}`
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 flex items-center justify-between gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-base font-bold text-foreground/80 group-hover:text-foreground transition-colors truncate", children: genre }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                ArrowUpRight,
                {
                  className: `w-4 h-4 shrink-0 text-muted-foreground/40 group-hover:${accent.text} transform -translate-x-1 translate-y-1 opacity-0 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300`
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `mt-2 h-1 w-6 rounded-full ${accent.glow} opacity-30 group-hover:w-10 group-hover:opacity-70 transition-all duration-300` })
          ]
        },
        genre
      );
    }) })
  ] });
}
function ProgressBar({ progress, className = "" }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `h-1 w-full bg-muted rounded-full overflow-hidden ${className}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "h-full bg-gradient-to-r from-primary to-secondary transition-all duration-300",
      style: { width: `${Math.min(100, Math.max(0, progress))}%` }
    }
  ) });
}
function formatTimeLeft$1(remainingSeconds) {
  if (remainingSeconds <= 0) return "Almost finished";
  const minutes = Math.ceil(remainingSeconds / 60);
  if (minutes < 60) return `${minutes}m left`;
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return `${hours}h${remainingMinutes ? ` ${remainingMinutes}m` : ""} left`;
}
function ContinueWatching() {
  const { user } = useAuth();
  const { data: items, isLoading } = useContinueWatching();
  reactExports.useEffect(() => {
    if (user == null ? void 0 : user.id) void migrateGuestProgressToAccount(user.id);
  }, [user == null ? void 0 : user.id]);
  if (!user || isLoading || !(items == null ? void 0 : items.length)) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mb-12", "aria-labelledby": "continue-watching-heading", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      HomeSectionHeading,
      {
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-5 h-5 text-primary" }),
        title: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { id: "continue-watching-heading", children: "Continue Watching" }),
        action: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 shrink-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "hidden text-xs text-muted-foreground sm:block", children: "Pick up where you left off" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Link,
            {
              to: "/profile?tab=history",
              className: "inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-card px-3 py-1.5 text-xs font-semibold text-muted-foreground transition-colors hover:border-foreground/20 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
              "aria-label": "View full watch history",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(History, { className: "h-3.5 w-3.5", "aria-hidden": "true" }),
                "History"
              ]
            }
          )
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4", children: items.slice(0, 4).map((item) => {
      const progressSeconds = Math.max(
        0,
        Number(item.progress_seconds) || 0
      );
      const durationSeconds = Math.max(
        0,
        Number(item.duration_seconds) || 0
      );
      const percent = durationSeconds > 0 ? Math.min(
        100,
        Math.round(progressSeconds / durationSeconds * 100)
      ) : null;
      const timeLeft = durationSeconds > 0 ? formatTimeLeft$1(durationSeconds - progressSeconds) : null;
      const poster = item.anime_poster ? getProxiedImageUrl(item.anime_poster) : "/placeholder.svg";
      return /* @__PURE__ */ jsxRuntimeExports.jsx(
        Peekable,
        {
          media: peekFromAnime(
            { id: item.anime_id, name: item.anime_name, poster: item.anime_poster },
            `/anime/${item.anime_id}`
          ),
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Link,
            {
              to: `/watch/${encodeURIComponent(item.episode_id)}?t=${Math.floor(progressSeconds)}`,
              "aria-label": `Resume ${item.anime_name}, episode ${item.episode_number}${percent !== null ? `, ${percent}% watched` : ""}`,
              className: "group flex min-h-[176px] overflow-hidden rounded-2xl border border-border/70 bg-card/80 shadow-sm transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:border-foreground/20 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-reduce:transition-none motion-reduce:hover:translate-y-0",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative w-28 shrink-0 overflow-hidden bg-muted sm:w-24 lg:w-28 xl:w-24", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "img",
                  {
                    src: poster,
                    alt: "",
                    loading: "lazy",
                    decoding: "async",
                    className: "h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-w-0 flex-1 flex-col justify-between gap-3 p-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "rounded-md bg-muted px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground", children: [
                        "EP ",
                        item.episode_number
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border bg-background text-foreground transition-colors group-hover:bg-foreground group-hover:text-background", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Play,
                        {
                          className: "ml-0.5 h-3.5 w-3.5 fill-current",
                          "aria-hidden": "true"
                        }
                      ) })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-3 line-clamp-2 font-display text-sm font-semibold leading-snug sm:text-base", children: item.anime_name })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-2 flex items-center justify-between gap-2 text-[11px] font-medium text-muted-foreground", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex min-w-0 items-center gap-1 truncate", children: [
                        timeLeft && /* @__PURE__ */ jsxRuntimeExports.jsx(
                          Clock,
                          {
                            className: "h-3.5 w-3.5 shrink-0",
                            "aria-hidden": "true"
                          }
                        ),
                        timeLeft ?? "Ready to resume"
                      ] }),
                      percent !== null && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "shrink-0 tabular-nums", children: [
                        percent,
                        "%"
                      ] })
                    ] }),
                    percent !== null && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { "aria-hidden": "true", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      ProgressBar,
                      {
                        progress: percent,
                        className: "h-1.5 rounded-full"
                      }
                    ) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "mt-3 inline-flex items-center gap-1 text-xs font-semibold", children: [
                      "Resume",
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        ArrowRight,
                        {
                          className: "h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none",
                          "aria-hidden": "true"
                        }
                      )
                    ] })
                  ] })
                ] })
              ]
            }
          )
        },
        item.id
      );
    }) })
  ] });
}
function formatTimeLeft(remainingSeconds) {
  if (remainingSeconds <= 0) return "Almost finished";
  const minutes = Math.ceil(remainingSeconds / 60);
  if (minutes < 60) return `${minutes}m left`;
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return `${hours}h${remainingMinutes ? ` ${remainingMinutes}m` : ""} left`;
}
function LocalContinueWatching() {
  const { user } = useAuth();
  const [items, setItems] = reactExports.useState([]);
  const navigate = useNavigate();
  reactExports.useEffect(() => {
    if (!user) {
      setItems(getLocalContinueWatching());
    }
  }, [user]);
  if (user || items.length === 0) return null;
  const handleRemove = (e, episodeId) => {
    e.stopPropagation();
    removeFromLocalContinueWatching(episodeId);
    setItems(getLocalContinueWatching());
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mb-12", "aria-labelledby": "local-continue-watching-heading", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-5 flex flex-wrap items-end justify-between gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-10 w-10 items-center justify-center rounded-xl border border-border/70 bg-card", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-5 w-5 text-primary", "aria-hidden": "true" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground", children: "Local queue" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "h2",
            {
              id: "local-continue-watching-heading",
              className: "font-display text-xl font-bold tracking-tight md:text-2xl",
              children: "Continue Watching"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Pick up where you left off" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4", children: items.slice(0, 4).map((item) => {
      const progressSeconds = Math.max(0, Number(item.progressSeconds) || 0);
      const durationSeconds = Math.max(0, Number(item.durationSeconds) || 0);
      const percent = durationSeconds > 0 ? Math.min(100, Math.round(progressSeconds / durationSeconds * 100)) : null;
      const timeLeft = durationSeconds > 0 ? formatTimeLeft(durationSeconds - progressSeconds) : null;
      const poster = item.animePoster ? getProxiedImageUrl(item.animePoster) : "/placeholder.svg";
      return /* @__PURE__ */ jsxRuntimeExports.jsx(
        Peekable,
        {
          media: peekFromAnime(
            { id: item.animeId, name: item.animeName, poster: item.animePoster },
            `/anime/${item.animeId}`
          ),
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "group relative flex min-h-[176px] overflow-hidden rounded-2xl border border-border/70 bg-card/80 shadow-sm transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:border-foreground/20 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-reduce:transition-none motion-reduce:hover:translate-y-0",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    onClick: (e) => handleRemove(e, item.episodeId),
                    className: "absolute right-2 top-2 z-20 flex h-7 w-7 items-center justify-center rounded-full border border-border/50 bg-background/90 text-muted-foreground opacity-0 backdrop-blur-sm transition-all duration-200 hover:border-destructive/50 hover:bg-destructive hover:text-destructive-foreground group-hover:opacity-100 focus-visible:opacity-100",
                    "aria-label": `Remove ${item.animeName} from continue watching`,
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-3.5 w-3.5" })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "relative w-28 shrink-0 overflow-hidden bg-muted sm:w-24 lg:w-28 xl:w-24",
                    onClick: () => navigate(`/watch/${encodeURIComponent(item.episodeId)}?t=${Math.floor(progressSeconds)}`),
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "img",
                      {
                        src: poster,
                        alt: "",
                        loading: "lazy",
                        decoding: "async",
                        className: "h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                      }
                    )
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "flex min-w-0 flex-1 flex-col justify-between gap-3 p-4",
                    onClick: () => navigate(`/watch/${encodeURIComponent(item.episodeId)}?t=${Math.floor(progressSeconds)}`),
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "rounded-md bg-muted px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground", children: [
                            "EP ",
                            item.episodeNumber
                          ] }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border bg-background text-foreground transition-colors group-hover:bg-foreground group-hover:text-background", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "ml-0.5 h-3.5 w-3.5 fill-current", "aria-hidden": "true" }) })
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-3 line-clamp-2 font-display text-sm font-semibold leading-snug sm:text-base", children: item.animeName })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-2 flex items-center justify-between gap-2 text-[11px] font-medium text-muted-foreground", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex min-w-0 items-center gap-1 truncate", children: [
                            timeLeft && /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-3.5 w-3.5 shrink-0", "aria-hidden": "true" }),
                            timeLeft ?? "Ready to resume"
                          ] }),
                          percent !== null && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "shrink-0 tabular-nums", children: [
                            percent,
                            "%"
                          ] })
                        ] }),
                        percent !== null && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { "aria-hidden": "true", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ProgressBar, { progress: percent, className: "h-1.5 rounded-full" }) }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "mt-3 inline-flex items-center gap-1 text-xs font-semibold", children: [
                          "Resume",
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            ArrowRight,
                            {
                              className: "h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none",
                              "aria-hidden": "true"
                            }
                          )
                        ] })
                      ] })
                    ]
                  }
                )
              ]
            }
          )
        },
        item.episodeId
      );
    }) })
  ] });
}
async function fetchUpcomingAnime(page = 1) {
  const response = await fetch(
    `https://api.jikan.moe/v4/seasons/upcoming?page=${page}&limit=12`,
    {
      headers: {
        "Accept": "application/json"
      },
      signal: AbortSignal.timeout(15e3)
    }
  );
  if (!response.ok) {
    throw new Error(`Failed to fetch upcoming anime: ${response.status} ${response.statusText}`);
  }
  return response.json();
}
function useUpcomingAnime(page = 1) {
  return useQuery({
    queryKey: ["upcoming_anime", page],
    queryFn: () => fetchUpcomingAnime(page),
    staleTime: 10 * 60 * 1e3,
    // 10 minutes
    // One retry only: Jikan 429s hard on bursts, and two extra hung attempts
    // used to triple the console spam before the section gave up.
    retry: 1
  });
}
function UpcomingAnimeCard({ anime }) {
  var _a;
  const imageUrl = ((_a = anime.images.webp) == null ? void 0 : _a.large_image_url) || anime.images.jpg.large_image_url;
  const title = anime.title_english || anime.title;
  const airDate = anime.aired.string ? anime.aired.string.includes(" to ") ? anime.aired.string.split(" to ")[0] : anime.aired.string : null;
  const peekMedia = peekFromAnime(
    {
      id: `mal:${anime.mal_id}`,
      name: title,
      poster: imageUrl,
      type: anime.type,
      rating: anime.score ?? void 0
    },
    `/search?q=${encodeURIComponent(title)}`
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Peekable, { media: peekMedia ? { ...peekMedia, canSave: false } : null, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    GlassPanel,
    {
      hoverEffect: true,
      className: "group flex-shrink-0 w-[180px] sm:w-[200px] cursor-pointer overflow-hidden snap-start",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-[2/3]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: imageUrl,
            alt: title,
            className: "w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-105 group-hover:brightness-110",
            loading: "lazy"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/10" }),
        anime.type && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-3 left-3 px-2 py-0.5 rounded-md bg-purple-500/90 text-white text-[10px] font-bold uppercase tracking-wider shadow-lg shadow-purple-500/20", children: anime.type }),
        anime.score && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute top-3 right-3 flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-black/50 backdrop-blur-md border border-white/10 text-[10px] font-bold text-white", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-3 h-3 fill-amber text-amber" }),
          anime.score
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute bottom-0 left-0 right-0 p-3.5 pt-10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-bold text-sm leading-tight line-clamp-2 drop-shadow-md group-hover:text-purple-300 transition-colors duration-300", children: title }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5 mt-2", children: [
            airDate && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 w-fit bg-white/10 backdrop-blur-sm border border-white/5 px-1.5 py-0.5 rounded-md text-[10px] font-medium text-white/80", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-3 h-3 text-purple-400" }),
              airDate
            ] }),
            anime.studios.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-white/50 line-clamp-1 font-medium tracking-wide", children: anime.studios[0].name })
          ] })
        ] })
      ] })
    }
  ) });
}
function UpcomingAnimeSection() {
  const { data, isLoading, error } = useUpcomingAnime();
  const scrollRef = reactExports.useRef(null);
  const scroll = (direction) => {
    if (scrollRef.current) {
      const amount = scrollRef.current.clientWidth * 0.75;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -amount : amount,
        behavior: "smooth"
      });
    }
  };
  if (error) return null;
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mb-24", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-between mb-8 px-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-display text-2xl font-semibold tracking-tight flex items-center gap-2.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-1.5 rounded-lg bg-purple-500/10 text-purple-400", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-5 h-5" }) }),
        "Upcoming Anime"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-4 overflow-hidden px-2", children: Array.from({ length: 6 }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "flex-shrink-0 w-[180px] sm:w-[200px] aspect-[2/3] rounded-xl bg-white/5 border border-white/5 animate-pulse"
        },
        i
      )) })
    ] });
  }
  if (!(data == null ? void 0 : data.data) || data.data.length === 0) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mb-24", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-8 px-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-display text-2xl font-semibold tracking-tight flex items-center gap-2.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-1.5 rounded-lg bg-purple-500/10 text-purple-400", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-5 h-5" }) }),
        "Upcoming Anime"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1 p-1 rounded-full bg-white/5 border border-white/10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => scroll("left"),
            "aria-label": "Scroll left",
            className: "p-2 rounded-full text-muted-foreground hover:text-white hover:bg-white/10 transition-all duration-300",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "w-4 h-4" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => scroll("right"),
            "aria-label": "Scroll right",
            className: "p-2 rounded-full text-muted-foreground hover:text-white hover:bg-white/10 transition-all duration-300",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4" })
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative group/carousel", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute left-0 top-0 bottom-4 w-8 bg-gradient-to-r from-background to-transparent z-10" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute right-0 top-0 bottom-4 w-8 bg-gradient-to-l from-background to-transparent z-10" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          ref: scrollRef,
          className: "flex gap-4 overflow-x-auto pb-4 px-2 scrollbar-hide scroll-smooth snap-x snap-mandatory",
          style: { scrollbarWidth: "none", msOverflowStyle: "none" },
          children: data.data.map((anime, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(UpcomingAnimeCard, { anime }, `${anime.mal_id}-${index}`))
        }
      )
    ] })
  ] });
}
const SECTION_CONFIGS = [
  { genre: "action", layout: "grid", icon: Sword, anilistFormat: "TV", anilistSort: "TRENDING_DESC" },
  { genre: "romance", layout: "carousel", icon: Heart, anilistFormat: "TV_SHORT", anilistSort: "POPULARITY_DESC" },
  { genre: "comedy", layout: "featured", icon: Laugh, anilistFormat: "MOVIE", anilistSort: "FAVOURITES_DESC" },
  { genre: "fantasy", layout: "masonry", icon: Sparkles, anilistFormat: "ONA", anilistSort: "TRENDING_DESC" },
  { genre: "sci-fi", layout: "compact", icon: Rocket, anilistFormat: "OVA", anilistSort: "POPULARITY_DESC" },
  { genre: "horror", layout: "grid", icon: Ghost, anilistFormat: "SPECIAL", anilistSort: "SCORE_DESC" },
  { genre: "slice-of-life", layout: "carousel", icon: Flower2, anilistFormat: "TV", anilistSort: "POPULARITY_DESC" },
  { genre: "adventure", layout: "featured", icon: Compass, anilistFormat: "TV", anilistSort: "TRENDING_DESC" },
  { genre: "drama", layout: "masonry", icon: Theater, anilistFormat: "MOVIE", anilistSort: "SCORE_DESC" },
  { genre: "supernatural", layout: "compact", icon: Eye, anilistFormat: "ONA", anilistSort: "TRENDING_DESC" },
  { genre: "sports", layout: "grid", icon: Trophy, anilistFormat: "TV", anilistSort: "POPULARITY_DESC" },
  { genre: "music", layout: "carousel", icon: Music, anilistFormat: "MUSIC", anilistSort: "TRENDING_DESC" },
  { genre: "mystery", layout: "featured", icon: Search, anilistFormat: "TV", anilistSort: "SCORE_DESC" },
  { genre: "psychological", layout: "masonry", icon: Brain, anilistFormat: "TV", anilistSort: "POPULARITY_DESC" },
  { genre: "thriller", layout: "compact", icon: Zap, anilistFormat: "MOVIE", anilistSort: "SCORE_DESC" },
  { genre: "mecha", layout: "grid", icon: Bot, anilistFormat: "TV", anilistSort: "POPULARITY_DESC" },
  { genre: "historical", layout: "carousel", icon: Scroll, anilistFormat: "SPECIAL", anilistSort: "TRENDING_DESC" },
  { genre: "isekai", layout: "featured", icon: RefreshCw, anilistFormat: "ONA", anilistSort: "POPULARITY_DESC" },
  { genre: "shounen", layout: "masonry", icon: Dumbbell, anilistFormat: "TV", anilistSort: "TRENDING_DESC" },
  { genre: "seinen", layout: "compact", icon: Target, anilistFormat: "TV", anilistSort: "SCORE_DESC" }
];
const DESKTOP_SECTION_BATCH_SIZE = 4;
const MOBILE_SECTION_BATCH_SIZE = 3;
const MAX_CONCURRENT_SECTION_REQUESTS = 2;
const ANILIST_GENRE_ALIASES = {
  "sci-fi": "Sci-Fi",
  "slice-of-life": "Slice of Life"
};
function toDisplayGenre(genre) {
  return genre.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
}
function toAniListGenre(genre) {
  return ANILIST_GENRE_ALIASES[genre] || toDisplayGenre(genre);
}
function toAnimeCardFromAniList(media) {
  var _a, _b, _c, _d, _e;
  const title = ((_a = media == null ? void 0 : media.title) == null ? void 0 : _a.english) || ((_b = media == null ? void 0 : media.title) == null ? void 0 : _b.romaji) || ((_c = media == null ? void 0 : media.title) == null ? void 0 : _c.native) || "Unknown title";
  const episodeCount = Number(media == null ? void 0 : media.episodes) || 0;
  return {
    id: (media == null ? void 0 : media.tatakaiId) || String(media.id),
    name: title,
    poster: ((_d = media == null ? void 0 : media.coverImage) == null ? void 0 : _d.large) || ((_e = media == null ? void 0 : media.coverImage) == null ? void 0 : _e.medium) || "/placeholder.svg",
    type: (media == null ? void 0 : media.format) ? String(media.format).toLowerCase() : void 0,
    rating: (media == null ? void 0 : media.averageScore) ? (Number(media.averageScore) / 10).toFixed(1) : void 0,
    episodes: {
      sub: episodeCount,
      dub: 0
    },
    malId: (media == null ? void 0 : media.idMal) || void 0,
    anilistId: (media == null ? void 0 : media.id) || void 0
  };
}
function mergeUniqueAnimeCards(...groups) {
  const all = groups.flat();
  const seen = /* @__PURE__ */ new Set();
  const merged = [];
  for (const anime of all) {
    if (!anime) continue;
    const key = String(anime.id || "").trim().toLowerCase() || String(anime.name || "").trim().toLowerCase();
    if (!key || seen.has(key)) continue;
    seen.add(key);
    merged.push(anime);
  }
  return merged;
}
function shuffleConfigs(items) {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
  return arr;
}
async function mapWithConcurrency(items, maxConcurrency, mapper) {
  if (items.length === 0) return [];
  const results = new Array(items.length);
  let nextIndex = 0;
  const worker = async () => {
    while (true) {
      const currentIndex = nextIndex;
      nextIndex += 1;
      if (currentIndex >= items.length) {
        return;
      }
      results[currentIndex] = await mapper(items[currentIndex], currentIndex);
    }
  };
  const workerCount = Math.min(Math.max(maxConcurrency, 1), items.length);
  await Promise.all(Array.from({ length: workerCount }, () => worker()));
  return results;
}
const SHUFFLED_SECTION_CONFIGS = shuffleConfigs(SECTION_CONFIGS);
async function fetchGenreSection(config, pageSeed) {
  let genreTitle = toDisplayGenre(config.genre);
  let internalAnimes = [];
  try {
    const data = await fetchGenreAnimes(config.genre, 1);
    genreTitle = data.genreName || genreTitle;
    internalAnimes = data.animes.slice(0, 8);
  } catch (error) {
    console.warn(`Failed to fetch internal genre ${config.genre}:`, error);
  }
  let anilistAnimes = [];
  try {
    const anilistPage = (pageSeed - 1) % 8 + 1;
    const anilistData = await fetchAniListDiscover({
      page: anilistPage,
      perPage: 10,
      genres: [toAniListGenre(config.genre)],
      format: config.anilistFormat,
      sort: config.anilistSort || "TRENDING_DESC"
    });
    anilistAnimes = anilistData.map(toAnimeCardFromAniList);
  } catch (error) {
    console.warn(`Failed to fetch AniList genre ${config.genre}:`, error);
  }
  const animes = mergeUniqueAnimeCards(internalAnimes, anilistAnimes).slice(0, 12);
  return {
    id: `section-${config.genre}-${Date.now()}-${pageSeed}`,
    title: genreTitle,
    genre: config.genre,
    layout: config.layout,
    animes,
    icon: config.icon
  };
}
function useInfiniteHomeSections() {
  const sectionBatchSize = typeof window !== "undefined" && window.innerWidth < 768 ? MOBILE_SECTION_BATCH_SIZE : DESKTOP_SECTION_BATCH_SIZE;
  return useInfiniteQuery({
    queryKey: ["infiniteHomeSections", sectionBatchSize],
    queryFn: async ({ pageParam = 0 }) => {
      const startIndex = pageParam * sectionBatchSize;
      const configs = SHUFFLED_SECTION_CONFIGS.slice(startIndex, startIndex + sectionBatchSize);
      if (configs.length === 0) {
        return { sections: [], nextPage: null };
      }
      const sections = await mapWithConcurrency(
        configs,
        MAX_CONCURRENT_SECTION_REQUESTS,
        (config, index) => fetchGenreSection(config, startIndex + index + 1)
      );
      let validSections = sections.filter((s) => s.animes.length > 0);
      if (validSections.length === 0) {
        const usedGenres = new Set(configs.map((cfg) => cfg.genre));
        const rescueConfigs = SECTION_CONFIGS.filter((cfg) => !usedGenres.has(cfg.genre)).slice(0, 2);
        if (rescueConfigs.length > 0) {
          const rescueSections = await mapWithConcurrency(
            rescueConfigs,
            MAX_CONCURRENT_SECTION_REQUESTS,
            (config, index) => fetchGenreSection(config, startIndex + sectionBatchSize + index + 1)
          );
          validSections = rescueSections.filter((section) => section.animes.length > 0);
        }
      }
      return {
        sections: validSections,
        nextPage: startIndex + sectionBatchSize < SHUFFLED_SECTION_CONFIGS.length ? pageParam + 1 : null
      };
    },
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 0,
    retry: 1,
    staleTime: 10 * 60 * 1e3
    // 10 minutes
  });
}
const shouldEnablePreview = (anime) => !/^(mal|anilist)-/i.test(String((anime == null ? void 0 : anime.id) || "").trim());
const MAX_SECTIONS = 30;
const MobileAnimeCard = reactExports.memo(function MobileAnimeCard2({ anime }) {
  var _a, _b, _c, _d;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Peekable,
    {
      media: peekFromAnime(
        anime,
        anime.id ? `/anime/${anime.id}` : `/search?q=${encodeURIComponent(anime.name || "anime")}`
      ),
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "relative overflow-hidden rounded-xl border border-white/5 bg-neutral-900 active:scale-[0.98] transition-transform duration-200",
          style: { contentVisibility: "auto", containIntrinsicSize: "auto 260px" },
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-[2/3] w-full", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: getHighQualityPoster(anime.poster, anime.anilistId),
                alt: anime.name,
                loading: "lazy",
                decoding: "async",
                fetchPriority: "low",
                className: "absolute inset-0 h-full w-full object-cover",
                onError: (event) => {
                  const image = event.currentTarget;
                  if (image.dataset.fallbackStage === "placeholder") return;
                  if (image.dataset.fallbackStage !== "direct" && anime.poster) {
                    image.dataset.fallbackStage = "direct";
                    image.src = anime.poster;
                    return;
                  }
                  image.dataset.fallbackStage = "placeholder";
                  image.src = "/placeholder.svg";
                }
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-x-0 bottom-0 p-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-sm font-semibold leading-tight text-white line-clamp-2 mb-2", children: anime.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-1.5 text-[9px] font-black uppercase tracking-widest text-white/90", children: [
                (((_a = anime.episodes) == null ? void 0 : _a.sub) || 0) > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "rounded-sm bg-white/25 px-1.5 py-0.5", children: [
                  "CC ",
                  (_b = anime.episodes) == null ? void 0 : _b.sub
                ] }),
                (((_c = anime.episodes) == null ? void 0 : _c.dub) || 0) > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "rounded-sm bg-primary/60 px-1.5 py-0.5 text-primary-foreground", children: [
                  "Mic ",
                  (_d = anime.episodes) == null ? void 0 : _d.dub
                ] })
              ] })
            ] })
          ] })
        }
      )
    }
  );
});
function SectionSkeleton({ layout }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-14 md:mb-20", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-6 px-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-full bg-white/5 animate-pulse" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-6 bg-white/5 animate-pulse rounded-md w-48" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-8 bg-white/5 animate-pulse rounded-full w-20" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn(
      "grid gap-4 md:gap-5",
      layout === "grid" && "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6",
      layout === "carousel" && "flex overflow-hidden",
      layout === "featured" && "grid-cols-1 md:grid-cols-3",
      layout === "compact" && "grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8",
      layout === "masonry" && "grid-cols-2 md:grid-cols-4 lg:grid-cols-6"
    ), children: [...Array(layout === "compact" ? 8 : 6)].map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn(
      "rounded-xl bg-white/5 animate-pulse",
      layout === "carousel" ? "flex-shrink-0 w-36 md:w-52 aspect-[2/3]" : "aspect-[2/3]"
    ) }, i)) })
  ] });
}
const scrollContainerStyles = "flex gap-4 md:gap-5 overflow-x-auto pb-4 pt-2 -mx-4 px-4 sm:mx-0 sm:px-0 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]";
const Card = ({ anime, isMobile }) => isMobile ? /* @__PURE__ */ jsxRuntimeExports.jsx(MobileAnimeCard, { anime }) : /* @__PURE__ */ jsxRuntimeExports.jsx(AnimeCardWithPreview, { anime, showPreview: shouldEnablePreview(anime) });
const GridLayout = reactExports.memo(function GridLayout2({ animes, isMobile }) {
  const items = animes.slice(0, isMobile ? 4 : 6);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-5", children: items.map((anime) => /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { anime, isMobile }, anime.id)) });
});
const CarouselLayout = reactExports.memo(function CarouselLayout2({ animes, isMobile }) {
  const items = animes.slice(0, isMobile ? 8 : 12);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: scrollContainerStyles, children: [
    items.map((anime) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-shrink-0 w-36 md:w-52 snap-start", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { anime, isMobile }) }, anime.id)),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-1 flex-shrink-0", "aria-hidden": "true" })
  ] });
});
const FeaturedLayout = reactExports.memo(function FeaturedLayout2({ animes, isMobile }) {
  const navigate = useNavigate();
  if (animes.length === 0) return null;
  const featured = animes[0];
  const rest = animes.slice(1, 5);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "md:col-span-1 lg:row-span-2 h-full min-h-[400px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Peekable, { media: peekFromAnime(featured, `/anime/${featured.id}`), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        onClick: () => navigate(`/anime/${featured.id}`),
        className: "group relative h-full w-full rounded-2xl overflow-hidden cursor-pointer border border-white/10 bg-neutral-900",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: getHighQualityPoster(featured.poster, featured.anilistId),
              alt: featured.name,
              loading: "lazy",
              decoding: "async",
              className: "absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 brightness-[0.8]"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-full bg-white/15 border border-white/20 flex items-center justify-center text-white", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "w-6 h-6 ml-1 fill-white" }) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute bottom-0 inset-x-0 p-6 md:p-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-block px-2.5 py-1 mb-4 rounded-md bg-primary/30 border border-primary/30 text-primary-foreground text-[10px] font-black uppercase tracking-widest", children: "Featured Pick" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-2xl md:text-3xl text-white mb-3 leading-tight line-clamp-3", children: featured.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 text-xs font-semibold text-white/70", children: [
              featured.type && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(LayoutGrid, { className: "w-3.5 h-3.5" }),
                featured.type
              ] }),
              featured.rating && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5 text-amber-400", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-3.5 h-3.5 fill-current" }),
                featured.rating
              ] })
            ] })
          ] })
        ]
      }
    ) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "md:col-span-1 lg:col-span-2 grid grid-cols-2 gap-4 md:gap-5", children: rest.map((anime) => /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { anime, isMobile }, anime.id)) })
  ] });
});
const CompactLayout = reactExports.memo(function CompactLayout2({ animes, isMobile }) {
  const items = animes.slice(0, isMobile ? 6 : 8);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3 md:gap-4", children: items.map((anime) => /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { anime, isMobile }, anime.id)) });
});
const MasonryLayout = reactExports.memo(function MasonryLayout2({ animes, isMobile }) {
  if (animes.length < 6) return /* @__PURE__ */ jsxRuntimeExports.jsx(GridLayout, { animes, isMobile });
  const items = animes.slice(0, isMobile ? 4 : 6);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-5", children: items.map((anime, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn((i === 0 || i === 3) && "row-span-2 col-span-1 md:col-span-2 h-full"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { anime, isMobile }) }, anime.id)) });
});
function getLayoutComponent(layout) {
  switch (layout) {
    case "carousel":
      return CarouselLayout;
    case "featured":
      return FeaturedLayout;
    case "compact":
      return CompactLayout;
    case "masonry":
      return MasonryLayout;
    default:
      return GridLayout;
  }
}
const HomeSectionBlock = reactExports.memo(function HomeSectionBlock2({ section }) {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const LayoutComponent = getLayoutComponent(section.layout);
  const IconComponent = section.icon || Compass;
  const hasGenreRoute = String(section.genre || "").trim().length > 0;
  if (section.animes.length === 0) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "home-section mb-14 md:mb-20", style: { contentVisibility: "auto", containIntrinsicSize: "auto 420px" }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      HomeSectionHeading,
      {
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(IconComponent, { className: "w-5 h-5 text-primary" }),
        title: section.title,
        action: hasGenreRoute ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: "ghost",
            size: "sm",
            onClick: () => navigate(`/genre/${section.genre}`),
            className: "group h-8 rounded-full px-4 text-xs font-semibold bg-white/5 text-muted-foreground hover:bg-white/10 hover:text-white shrink-0",
            children: [
              "View All",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-0.5" })
            ]
          }
        ) : void 0
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(LayoutComponent, { animes: section.animes, isMobile })
  ] });
});
const SuggestionBanner = reactExports.memo(function SuggestionBanner2() {
  const navigate = useNavigate();
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "home-section my-16 md:my-24", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "relative overflow-hidden rounded-[2.5rem] border border-white/[0.05] p-8 md:p-12",
      style: {
        background: "radial-gradient(600px 400px at 0% 0%, hsl(var(--primary) / 0.18), transparent 70%),radial-gradient(600px 400px at 100% 100%, rgba(168,85,247,0.18), transparent 70%), #0d0d0d"
      },
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex flex-col md:flex-row items-center justify-between gap-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center md:text-left space-y-2 max-w-lg", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-2xl md:text-3xl font-display font-bold text-white tracking-tight", children: "Help shape the future" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/60 text-sm md:text-base leading-relaxed", children: "Got a feature in mind? Missing a specific anime? Drop us a suggestion and watch the platform evolve." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            onClick: () => navigate("/suggestions"),
            className: "w-full md:w-auto px-8 h-14 rounded-full font-bold bg-white text-black hover:bg-gray-200 transition-transform hover:scale-105 active:scale-95",
            children: [
              "Send Suggestion ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "ml-2 w-4 h-4" })
            ]
          }
        )
      ] })
    }
  ) });
});
function InfiniteHomeSections() {
  const isMobile = useIsMobile();
  const { data: homeFallbackData } = useHomeData();
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, error } = useInfiniteHomeSections();
  const loadMoreRef = reactExports.useRef(null);
  const bootstrapAttemptRef = reactExports.useRef(0);
  const hasQueryError = !!error;
  const allSections = reactExports.useMemo(
    () => ((data == null ? void 0 : data.pages.flatMap((page) => page.sections)) || []).slice(0, MAX_SECTIONS),
    [data]
  );
  const reachedCap = allSections.length >= MAX_SECTIONS;
  const canLoadMore = hasNextPage && !reachedCap;
  const stateRef = reactExports.useRef({ canLoadMore, isFetchingNextPage, fetchNextPage });
  stateRef.current = { canLoadMore, isFetchingNextPage, fetchNextPage };
  reactExports.useEffect(() => {
    if (typeof IntersectionObserver === "undefined" || !loadMoreRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        const s = stateRef.current;
        if (entry.isIntersecting && s.canLoadMore && !s.isFetchingNextPage) s.fetchNextPage();
      },
      { rootMargin: isMobile ? "300px" : "500px", threshold: 0 }
    );
    observer.observe(loadMoreRef.current);
    return () => observer.disconnect();
  }, [isMobile]);
  const mobileFallbackSections = reactExports.useMemo(() => {
    var _a, _b;
    if (!isMobile || !homeFallbackData) return [];
    const sections = [];
    if ((_a = homeFallbackData.mostPopularAnimes) == null ? void 0 : _a.length) {
      sections.push({ id: "mobile-fallback-popular", title: "Popular Picks", genre: "", layout: "grid", animes: homeFallbackData.mostPopularAnimes.slice(0, 8) });
    }
    if ((_b = homeFallbackData.latestEpisodeAnimes) == null ? void 0 : _b.length) {
      sections.push({ id: "mobile-fallback-latest", title: "Latest Episodes", genre: "", layout: "carousel", animes: homeFallbackData.latestEpisodeAnimes.slice(0, 10) });
    }
    return sections;
  }, [homeFallbackData, isMobile]);
  const visibleSections = allSections.length > 0 ? allSections : mobileFallbackSections;
  reactExports.useEffect(() => {
    if (hasQueryError || isLoading || isFetchingNextPage || !hasNextPage || allSections.length > 0) return;
    const maxBootstrapAttempts = isMobile ? 4 : 2;
    if (bootstrapAttemptRef.current >= maxBootstrapAttempts) return;
    bootstrapAttemptRef.current += 1;
    void fetchNextPage();
  }, [allSections.length, fetchNextPage, hasNextPage, hasQueryError, isFetchingNextPage, isLoading, isMobile]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-16 md:mt-24", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "section",
      {
        className: "relative mb-14 md:mb-20 overflow-hidden rounded-[2rem] border border-white/[0.04]",
        style: { background: "radial-gradient(640px 320px at 50% -20%, hsl(var(--primary) / 0.16), transparent 70%), rgba(10,10,10,0.6)" },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 left-1/2 -translate-x-1/2 h-px w-3/4 bg-gradient-to-r from-transparent via-white/20 to-transparent" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative px-8 py-10 sm:px-12 sm:py-14 flex items-center gap-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/[0.03] border border-white/[0.08]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-5 w-5 text-primary", strokeWidth: 1.5 }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl sm:text-3xl font-display font-semibold tracking-tight text-white", children: "Discover the Multiverse" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-white/50 font-medium", children: "Endless curations tailored for your journey." })
            ] })
          ] })
        ]
      }
    ),
    isLoading && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SectionSkeleton, { layout: "carousel" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(SectionSkeleton, { layout: "featured" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(SectionSkeleton, { layout: "grid" })
    ] }),
    hasQueryError && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-14", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassPanel, { className: "p-8 text-center border-red-500/20 bg-red-500/5 rounded-[2rem]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg font-semibold text-white mb-1", children: "Connection Interrupted" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-white/50 mb-6 max-w-md mx-auto", children: "We couldn't pull the latest curations. Check your network and try again." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          onClick: () => {
            bootstrapAttemptRef.current = 0;
            void fetchNextPage();
          },
          className: "rounded-full bg-red-500/20 text-red-200 hover:bg-red-500/30 border border-red-500/20 font-semibold px-8",
          children: "Retry Connection"
        }
      )
    ] }) }),
    visibleSections.map((section, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(HomeSectionBlock, { section }),
      (index + 1) % 3 === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(SuggestionBanner, {})
    ] }, section.id)),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: loadMoreRef, className: "py-10 flex items-center justify-center min-h-[100px]", children: isFetchingNextPage ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 bg-white/5 px-5 py-2.5 rounded-full border border-white/10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin text-primary" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/70 font-medium text-xs uppercase tracking-wider", children: "Curating..." })
    ] }) : canLoadMore && !isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      Button,
      {
        onClick: () => fetchNextPage(),
        variant: "outline",
        className: "rounded-full border-white/10 bg-transparent px-6 text-xs font-semibold uppercase tracking-wider hover:bg-white/5 text-white/50 hover:text-white",
        children: "Load More"
      }
    ) : null }),
    !canLoadMore && visibleSections.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pb-24 pt-10 flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/[0.03] border border-white/[0.08]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex -space-x-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center border border-[#0a0a0a]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Flame, { className: "w-2.5 h-2.5 text-primary" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-5 h-5 rounded-full bg-purple-500/20 flex items-center justify-center border border-[#0a0a0a]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-2.5 h-2.5 text-purple-400" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-5 h-5 rounded-full bg-pink-500/20 flex items-center justify-center border border-[#0a0a0a]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: "w-2.5 h-2.5 text-pink-400" }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium text-white/50 tracking-wide", children: reachedCap ? "That's plenty for one session" : "End of the line" })
    ] }) })
  ] });
}
const MAX_MOBILE_SECTIONS = 12;
const CARDS_PER_SECTION = 8;
const MobileCard = reactExports.memo(function MobileCard2({ anime }) {
  var _a, _b, _c;
  const navigate = useNavigate();
  const routeId = buildPreferredAnimeRouteId({
    id: anime.id,
    name: anime.name,
    malId: anime.malId,
    malID: anime == null ? void 0 : anime.malID,
    mal_id: anime == null ? void 0 : anime.mal_id,
    anilistId: anime.anilistId,
    anilistID: anime == null ? void 0 : anime.anilistID,
    anilist_id: anime == null ? void 0 : anime.anilist_id
  });
  const routeTo = routeId ? `/anime/${routeId}` : `/search?q=${encodeURIComponent(anime.name || "anime")}`;
  const longPress = useLongPress({
    onLongPress: () => {
      var _a2, _b2;
      openMediaQuickPeek({
        kind: "anime",
        id: String(anime.id ?? routeId ?? anime.name),
        name: anime.name,
        poster: anime.poster,
        anilistId: anime.anilistId ?? (anime == null ? void 0 : anime.anilistID) ?? (anime == null ? void 0 : anime.anilist_id) ?? null,
        type: anime.type,
        year: anime.year,
        rating: anime.rating,
        episodesSub: (_a2 = anime.episodes) == null ? void 0 : _a2.sub,
        episodesDub: (_b2 = anime.episodes) == null ? void 0 : _b2.dub,
        routeTo
      });
    }
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "button",
    {
      type: "button",
      onClick: () => {
        if (routeId) {
          navigate(`/anime/${routeId}`);
          return;
        }
        navigate(`/search?q=${encodeURIComponent(anime.name || "anime")}`);
      },
      className: "w-full text-left active:scale-[0.98] transition-transform duration-150",
      style: { contentVisibility: "auto", containIntrinsicSize: "auto 240px" },
      ...longPress,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-[2/3]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: getHighQualityPoster(anime.poster || "", anime.anilistId),
            alt: anime.name || "Anime",
            className: "h-full w-full object-cover",
            loading: "lazy",
            decoding: "async",
            fetchPriority: "low",
            onError: (event) => {
              const image = event.currentTarget;
              if (image.dataset.fallbackStage === "placeholder") return;
              if (image.dataset.fallbackStage !== "direct" && anime.poster) {
                image.dataset.fallbackStage = "direct";
                image.src = anime.poster;
                return;
              }
              image.dataset.fallbackStage = "placeholder";
              image.src = "/placeholder.svg";
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute bottom-0 left-0 right-0 p-2.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "line-clamp-2 text-[13px] font-bold leading-tight text-white", children: anime.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-white/70", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "rounded-md bg-black/50 border border-white/10 px-1.5 py-0.5", children: [
              "SUB ",
              ((_a = anime.episodes) == null ? void 0 : _a.sub) || 0
            ] }),
            (((_b = anime.episodes) == null ? void 0 : _b.dub) || 0) > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "rounded-md bg-black/50 border border-white/10 px-1.5 py-0.5", children: [
              "DUB ",
              ((_c = anime.episodes) == null ? void 0 : _c.dub) || 0
            ] })
          ] })
        ] })
      ] }) })
    }
  );
});
function MobileInfiniteHomeSections() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error
  } = useInfiniteHomeSections();
  const { data: homeData } = useHomeData();
  const bootstrapAttemptsRef = reactExports.useRef(0);
  const loadMoreRef = reactExports.useRef(null);
  const sections = reactExports.useMemo(
    () => ((data == null ? void 0 : data.pages.flatMap((page) => page.sections)) || []).slice(0, MAX_MOBILE_SECTIONS),
    [data]
  );
  const reachedCap = ((data == null ? void 0 : data.pages.flatMap((p) => p.sections).length) ?? 0) >= MAX_MOBILE_SECTIONS;
  const fallbackSection = reactExports.useMemo(() => {
    const fallbackAnimes = [
      ...((homeData == null ? void 0 : homeData.mostPopularAnimes) || []).slice(0, 6),
      ...((homeData == null ? void 0 : homeData.latestEpisodeAnimes) || []).slice(0, 6)
    ];
    if (fallbackAnimes.length === 0) return null;
    const deduped = Array.from(
      new Map(fallbackAnimes.map((anime) => [String(anime.id || anime.name), anime])).values()
    ).slice(0, 8);
    return {
      id: "mobile-fallback-discover",
      title: "Discover Picks",
      animes: deduped
    };
  }, [homeData == null ? void 0 : homeData.latestEpisodeAnimes, homeData == null ? void 0 : homeData.mostPopularAnimes]);
  const visibleSections = sections.length > 0 ? sections : fallbackSection ? [fallbackSection] : [];
  const canLoadMore = hasNextPage && !reachedCap;
  reactExports.useEffect(() => {
    if (isLoading || isFetchingNextPage) return;
    if (!hasNextPage) return;
    if (sections.length > 0) return;
    if (bootstrapAttemptsRef.current >= 3) return;
    bootstrapAttemptsRef.current += 1;
    void fetchNextPage();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, sections.length]);
  const stateRef = reactExports.useRef({ canLoadMore, isFetchingNextPage, fetchNextPage });
  stateRef.current = { canLoadMore, isFetchingNextPage, fetchNextPage };
  reactExports.useEffect(() => {
    const target = loadMoreRef.current;
    if (!target || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        const s = stateRef.current;
        if ((entry == null ? void 0 : entry.isIntersecting) && s.canLoadMore && !s.isFetchingNextPage) {
          void s.fetchNextPage();
        }
      },
      { rootMargin: "400px 0px", threshold: 0 }
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, [visibleSections.length]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mt-10 md:mt-12 pb-28", style: { contentVisibility: "auto" }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-5 px-1", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.03] p-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-xl border border-primary/30 bg-primary/15 p-2.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-5 w-5 text-primary" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-black tracking-tight text-white truncate", children: "Discover More" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground truncate", children: "Infinite picks, tuned for mobile" })
      ] })
    ] }) }),
    isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-3 px-1", children: Array.from({ length: 4 }).map((_, index) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-[2/3] animate-pulse rounded-2xl border border-white/[0.08] bg-white/[0.04]" }, index)) }),
    error && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-1", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassPanel, { className: "border-red-500/30 bg-red-500/10 p-5 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-3 text-sm font-semibold text-white", children: "Discover feed failed to load" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          onClick: () => {
            bootstrapAttemptsRef.current = 0;
            void fetchNextPage();
          },
          variant: "outline",
          className: "rounded-xl border-red-400/40 bg-red-500/10 text-xs font-bold uppercase tracking-widest",
          children: "Retry"
        }
      )
    ] }) }),
    visibleSections.map((section) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8", style: { contentVisibility: "auto", containIntrinsicSize: "auto 500px" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        HomeSectionHeading,
        {
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Compass, { className: "w-5 h-5 text-primary" }),
          title: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "line-clamp-1 pr-2", children: section.title })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-3 px-1", children: (section.animes || []).slice(0, CARDS_PER_SECTION).map((anime) => /* @__PURE__ */ jsxRuntimeExports.jsx(MobileCard, { anime }, anime.id || anime.name)) })
    ] }, section.id)),
    !isLoading && visibleSections.length === 0 && !error && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-1", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassPanel, { className: "p-5 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-3 text-sm text-muted-foreground", children: "No discover cards available yet" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          onClick: () => void fetchNextPage(),
          variant: "outline",
          className: "rounded-xl text-xs font-bold uppercase tracking-widest",
          children: "Load Discover Feed"
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: loadMoreRef, className: "px-1", children: isFetchingNextPage ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-2 rounded-2xl border border-white/[0.08] bg-white/[0.03] py-4 text-xs font-bold uppercase tracking-widest text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin text-primary" }),
      " Loading more"
    ] }) : canLoadMore ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      Button,
      {
        onClick: () => void fetchNextPage(),
        variant: "outline",
        className: "w-full rounded-2xl border-white/15 bg-white/5 text-xs font-black uppercase tracking-widest",
        children: "Load More"
      }
    ) : null })
  ] });
}
function AIRecommendationBanner() {
  const navigate = useNavigate();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative overflow-hidden rounded-2xl border border-border/40 bg-gradient-to-br from-background via-muted/20 to-primary/5 p-6 md:p-8 lg:p-10 shadow-sm transition-colors hover:border-primary/20", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 right-0 -mr-16 -mt-16 h-64 w-64 rounded-full bg-primary/5 blur-3xl pointer-events-none" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-0 left-0 -ml-16 -mb-16 h-48 w-48 rounded-full bg-primary/5 blur-3xl pointer-events-none" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between md:gap-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-3.5 w-3.5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Tailored for you" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-2xl font-bold tracking-tight text-foreground md:text-3xl lg:text-4xl", children: [
            "Discover your next ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "favorite series" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "max-w-2xl text-base text-muted-foreground md:text-lg leading-relaxed", children: "We've curated a personalized collection of hidden gems and trending hits based entirely on your unique watch history." })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex w-full shrink-0 flex-col items-center gap-3 md:w-auto md:items-end", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            size: "lg",
            onClick: () => navigate("/recommendations"),
            className: "group h-12 w-full md:w-auto rounded-xl bg-primary px-8 text-base font-semibold text-primary-foreground transition-all duration-200 hover:bg-primary/90 hover:ring-4 hover:ring-primary/20 shadow-sm",
            children: [
              "View Suggestions",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "ml-2 h-4 w-4 transition-transform duration-200 ease-out group-hover:translate-x-1" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] font-medium text-muted-foreground/70 tracking-wider uppercase", children: "Updates as you watch" })
      ] })
    ] })
  ] });
}
const SkeletonGrid = ({ count, className, tall }) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className, children: Array.from({ length: count }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `${tall ? "h-64" : "h-40"} rounded-3xl bg-muted/20 animate-pulse` }, i)) });
function CommunitySection() {
  const { data: allTierlists = [], isLoading: tlLoading } = usePublicTierLists(4);
  const tierlists = reactExports.useMemo(() => allTierlists.slice(0, 4), [allTierlists]);
  const { data: allPlaylists = [], isLoading: plLoading } = useDiscoverPlaylists({ sort: "most_liked" });
  const playlists = reactExports.useMemo(() => allPlaylists.slice(0, 4), [allPlaylists]);
  const { data: feed, isLoading: feedLoading } = useFeed("foryou");
  const posts = reactExports.useMemo(() => {
    var _a;
    const firstPage = ((_a = feed == null ? void 0 : feed.pages) == null ? void 0 : _a[0]) ?? [];
    return firstPage.filter((i) => i.kind === "post").slice(0, 4);
  }, [feed]);
  const { data: rooms = [], isLoading: roomLoading } = usePublicWatchRooms();
  const topRooms = reactExports.useMemo(
    () => [...rooms].sort((a, b) => (b.participant_count || 0) - (a.participant_count || 0)).slice(0, 3),
    [rooms]
  );
  const anyLoading = tlLoading || plLoading || feedLoading || roomLoading;
  const isEmpty = !anyLoading && !tierlists.length && !playlists.length && !posts.length && !topRooms.length;
  if (isEmpty) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "space-y-12", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      HomeSectionHeading,
      {
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-5 h-5 text-primary" }),
        title: "Community",
        viewAllTo: "/community",
        viewAllLabel: "Explore"
      }
    ),
    (tlLoading || tierlists.length > 0) && /* @__PURE__ */ jsxRuntimeExports.jsxs(Reveal, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        HomeSectionHeading,
        {
          as: "h3",
          size: "sub",
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ListOrdered, { className: "w-[18px] h-[18px] text-primary" }),
          title: "Top Tier Lists",
          viewAllTo: "/tierlists"
        }
      ),
      tlLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(SkeletonGrid, { tall: true, count: 4, className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6", children: tierlists.map((tl) => /* @__PURE__ */ jsxRuntimeExports.jsx(TierListCard, { tierList: tl }, tl.id)) })
    ] }),
    (plLoading || playlists.length > 0) && /* @__PURE__ */ jsxRuntimeExports.jsxs(Reveal, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        HomeSectionHeading,
        {
          as: "h3",
          size: "sub",
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Music2, { className: "w-[18px] h-[18px] text-primary" }),
          title: "Popular Playlists",
          viewAllTo: "/playlists"
        }
      ),
      plLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(SkeletonGrid, { count: 4, className: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4", children: playlists.map((pl) => /* @__PURE__ */ jsxRuntimeExports.jsx(PlaylistCard, { playlist: pl, author: pl.author, showActions: false }, pl.id)) })
    ] }),
    (feedLoading || posts.length > 0) && /* @__PURE__ */ jsxRuntimeExports.jsxs(Reveal, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        HomeSectionHeading,
        {
          as: "h3",
          size: "sub",
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "w-[18px] h-[18px] text-primary" }),
          title: "Community Posts",
          viewAllTo: "/community"
        }
      ),
      feedLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(SkeletonGrid, { tall: true, count: 4, className: "grid gap-4 lg:grid-cols-2" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid items-start gap-4 lg:grid-cols-2", children: posts.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx(PostCard, { post: item.post, contextCommunityId: null }, item.post.id)) })
    ] }),
    (roomLoading || topRooms.length > 0) && /* @__PURE__ */ jsxRuntimeExports.jsxs(Reveal, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        HomeSectionHeading,
        {
          as: "h3",
          size: "sub",
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Radio, { className: "w-[18px] h-[18px] text-red-500" }),
          title: "Live Watch Rooms",
          viewAllTo: "/isshoni"
        }
      ),
      roomLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(SkeletonGrid, { count: 3, className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", children: topRooms.map((room) => /* @__PURE__ */ jsxRuntimeExports.jsx(WatchRoomCard, { room }, room.id)) })
    ] })
  ] });
}
const BANNER_IMAGE = "/assets/image/content/illustriation.jpg";
const FEATURES = [
  { icon: Sparkles, label: "Weekly Spotlights" },
  { icon: Layers, label: "Source Picker" },
  { icon: SlidersHorizontal, label: "Smart Reader" }
];
function ReleaseV6Banner() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "mb-10 md:mb-16", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Link,
    {
      to: "/manga",
      className: "group relative isolate block overflow-hidden rounded-[2rem] border border-white/10 bg-black shadow-2xl ring-1 ring-inset ring-white/5 transition-all duration-500 hover:border-white/20  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 -z-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: BANNER_IMAGE,
            alt: "",
            loading: "lazy",
            decoding: "async",
            className: "h-full w-full object-cover opacity-60 transition-transform duration-[1200ms] ease-out group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 -z-10 bg-gradient-to-t from-background via-background/75 to-background/10 md:bg-gradient-to-r md:from-background md:via-background/70 md:to-transparent" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.55)_100%)]" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 -z-10 bg-[radial-gradient(rgba(255,255,255,0.07)_1px,transparent_1px)] [background-size:18px_18px] [mask-image:linear-gradient(to_right,black,transparent_60%)]" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -left-32 -top-32 -z-10 h-80 w-80 rounded-full bg-primary/25 opacity-60 blur-3xl transition-opacity duration-700 group-hover:opacity-100" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            "aria-hidden": true,
            className: "pointer-events-none absolute inset-y-0 -left-1/2 z-30 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 transition-all duration-1000 ease-out group-hover:left-[120%] group-hover:opacity-100 motion-reduce:hidden"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            "aria-hidden": true,
            className: "pointer-events-none absolute right-12 top-1/2 z-10 hidden -translate-y-1/2 lg:block xl:right-20",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative h-64 w-44 xl:h-72 xl:w-48", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 -translate-x-10 -rotate-12 rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-sm transition-transform duration-700 ease-out group-hover:-translate-x-16 group-hover:-rotate-[18deg]" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 -translate-x-5 -rotate-6 rounded-2xl border border-white/10 bg-white/[0.07] backdrop-blur-sm transition-transform duration-700 ease-out group-hover:-translate-x-8 group-hover:-rotate-[9deg]" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 overflow-hidden rounded-2xl border border-white/15 shadow-2xl transition-transform duration-700 ease-out group-hover:-translate-y-2 group-hover:rotate-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "img",
                  {
                    src: "https://s4.anilist.co/file/anilistcdn/media/manga/cover/large/bx172619-LSoXY45QAas4.jpg",
                    alt: "",
                    loading: "lazy",
                    decoding: "async",
                    className: "h-full w-full object-cover"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-x-0 bottom-0 p-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-semibold uppercase tracking-widest text-white/60", children: "Now Reading" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-0.5 text-sm font-bold text-white", children: "Chapter 142" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 h-1 overflow-hidden rounded-full bg-white/15", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full w-2/3 rounded-full bg-primary transition-all duration-700 group-hover:w-5/6" }) })
                ] })
              ] })
            ] })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-20 flex min-h-[360px] flex-col justify-end p-6 sm:p-10 md:min-h-[400px] md:justify-center md:p-12 lg:max-w-[62%] lg:p-14", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-primary/30 bg-primary/10 py-1 pl-1 pr-3 text-[10px] font-bold uppercase tracking-widest text-primary backdrop-blur-md", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5 rounded-full bg-primary px-2 py-0.5 text-primary-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "relative flex h-1.5 w-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute inline-flex h-full w-full animate-ping rounded-full bg-current opacity-75 motion-reduce:animate-none" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "relative inline-flex h-1.5 w-1.5 rounded-full bg-current" })
              ] }),
              "New"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-3.5 w-3.5" }),
            "Tatakai V6 Update"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-3xl font-black leading-[1.05] tracking-tight text-white [text-wrap:balance] sm:text-4xl md:text-5xl lg:text-6xl", children: [
            "Manga Hub",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-gradient-to-br from-primary via-primary to-primary/50 bg-clip-text text-transparent", children: "V6" }),
            " ",
            "is live."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 max-w-xl text-sm font-medium leading-relaxed text-white/70 [text-wrap:pretty] sm:text-base md:text-lg", children: "Discover weekly spotlights, pick chapter sources with confidence, and enjoy a completely rebuilt premium reader with smart controls." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-6 flex flex-wrap gap-2", children: FEATURES.map(({ icon: Icon, label }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "li",
            {
              className: "inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-white/80 backdrop-blur-md",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-3.5 w-3.5 text-primary" }),
                label
              ]
            },
            label
          )) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex h-12 items-center gap-2.5 rounded-full bg-white pl-7 pr-2 text-sm font-bold text-black shadow-[0_8px_24px_-8px_rgba(255,255,255,0.5)] transition-all duration-300 group-hover:shadow-[0_10px_32px_-6px_rgba(255,255,255,0.6)] group-active:scale-[0.97]", children: [
            "Open Manga Hub",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex h-8 w-8 items-center justify-center rounded-full bg-black text-white transition-transform duration-300 group-hover:translate-x-0.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4 transition-transform duration-300 group-hover:-rotate-45 motion-reduce:group-hover:rotate-0" }) })
          ] }) })
        ] })
      ]
    }
  ) });
}
const DISCORD_INVITE = "https://dsc.gg/tatakai";
const PERKS = [
  "Exclusive roles and profile flair",
  "Early access to new features",
  "Direct line to the developers"
];
const CHARACTER_SOURCES = [
  // waifu.im (verified working)
  // nekosia.cat (verified working, provides palette)
  {
    name: "nekosia.cat",
    fetchUrl: () => fetch(getProxiedJsonUrl("https://api.nekosia.cat/api/v1/images/random")).then((r) => r.json()).then((d) => {
      var _a, _b;
      return (_b = (_a = d == null ? void 0 : d.image) == null ? void 0 : _a.original) == null ? void 0 : _b.url;
    })
  }
];
function preload(url) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = url;
  });
}
async function fetchCharacterImage() {
  const shuffled = [...CHARACTER_SOURCES].sort(() => Math.random() - 0.5);
  for (const source of shuffled) {
    try {
      const url = await source.fetchUrl();
      if (url && typeof url === "string" && await preload(url)) {
        return { url, source: source.name };
      }
    } catch {
    }
  }
  return null;
}
function DiscordLogo({ className }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { viewBox: "0 0 127.14 96.36", fill: "currentColor", className, "aria-hidden": "true", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z" }) });
}
function DiscordSection() {
  const [character, setCharacter] = reactExports.useState(null);
  const [isFetching, setIsFetching] = reactExports.useState(true);
  const [hasAttempted, setHasAttempted] = reactExports.useState(false);
  const refresh = reactExports.useCallback(async () => {
    setIsFetching(true);
    const next = await fetchCharacterImage();
    if (next) setCharacter(next);
    setHasAttempted(true);
    setIsFetching(false);
  }, []);
  reactExports.useEffect(() => {
    refresh();
  }, [refresh]);
  const showSkeleton = !character && !hasAttempted;
  const showFallback = !character && hasAttempted;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(GlassPanel, { className: "relative overflow-hidden border border-[#5865F2]/20 bg-gradient-to-br from-[#5865F2]/[0.07] via-card to-card", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex flex-col justify-center gap-7 p-8 md:p-12 lg:p-14", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-[#5865F2]/10 blur-3xl" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex items-center gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#5865F2] shadow-lg shadow-[#5865F2]/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(DiscordLogo, { className: "h-8 w-8 text-white" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#5865F2]", children: "Community" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-semibold leading-none tracking-tight md:text-3xl", children: "Join our Discord" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "relative max-w-md leading-relaxed text-muted-foreground", children: "Chat with thousands of anime fans, catch release updates, join events, and talk about what you're watching." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex items-center gap-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-semibold leading-none tabular-nums", children: "100+" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1.5 text-[11px] font-medium uppercase tracking-wider text-muted-foreground", children: "Members" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-9 w-px bg-white/10" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "flex items-center gap-2 text-2xl font-semibold leading-none", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "relative flex h-2 w-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-40" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "relative inline-flex h-2 w-2 rounded-full bg-emerald-400" })
            ] }),
            "24/7"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1.5 text-[11px] font-medium uppercase tracking-wider text-muted-foreground", children: "Always active" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "relative space-y-2.5", children: PERKS.map((perk) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center gap-3 text-sm text-foreground/85", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#5865F2]/15 text-[#5865F2]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-3 w-3", strokeWidth: 3 }) }),
        perk
      ] }, perk)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative pt-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            onClick: () => window.open(DISCORD_INVITE, "_blank", "noopener,noreferrer"),
            className: "group h-12 rounded-xl bg-[#5865F2] px-6 text-sm font-semibold text-white shadow-lg shadow-[#5865F2]/20 transition-colors hover:bg-[#4752C4]",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(DiscordLogo, { className: "mr-2.5 h-5 w-5" }),
              "Join the server",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "ml-2.5 h-4 w-4 opacity-70 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-xs text-muted-foreground/70", children: "Free to join · opens in a new tab" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative order-first h-64 md:order-none md:h-auto md:min-h-[460px]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(AnimatePresence, { children: [
        showSkeleton && /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            exit: { opacity: 0 },
            className: "absolute inset-0 animate-pulse bg-gradient-to-br from-[#5865F2]/15 via-card to-card"
          },
          "skeleton"
        ),
        character && /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { opacity: 0, scale: 1.04 },
            animate: { opacity: 1, scale: 1 },
            exit: { opacity: 0 },
            transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
            className: "absolute inset-0",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: character.url,
                alt: "Anime character artwork",
                className: "h-full w-full object-cover object-top",
                onError: () => setCharacter(null)
              }
            )
          },
          character.url
        ),
        showFallback && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            exit: { opacity: 0 },
            className: "absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[#5865F2]/5",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(DiscordLogo, { className: "h-12 w-12 text-[#5865F2]/30" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Artwork unavailable" })
            ]
          },
          "fallback"
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent md:bg-gradient-to-r md:via-card/10" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute inset-x-0 bottom-0 hidden h-28 bg-gradient-to-t from-black/50 to-transparent md:block" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-x-4 bottom-4 flex items-end justify-between gap-3 md:inset-x-5 md:bottom-5", children: [
        character ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] uppercase tracking-wider text-white/50", children: [
          "Art via ",
          character.source
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: refresh,
            disabled: isFetching,
            "aria-label": "Show another character",
            title: "Show another character",
            className: "group rounded-xl border border-white/10 bg-black/40 p-2.5 text-white/70 backdrop-blur-md transition-colors hover:bg-black/60 hover:text-white disabled:cursor-wait disabled:opacity-50",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              RefreshCw,
              {
                className: `h-4 w-4 ${isFetching ? "animate-spin" : "transition-transform duration-500 group-hover:rotate-180"}`
              }
            )
          }
        )
      ] })
    ] })
  ] }) });
}
function AppDownloadBanner() {
  const [isVisible, setIsVisible] = reactExports.useState(false);
  const isNative = useIsNativeApp();
  const isMobile = Capacitor.isNativePlatform();
  reactExports.useEffect(() => {
    if (isNative || isMobile) {
      return;
    }
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 500);
    return () => clearTimeout(timer);
  }, [isNative, isMobile]);
  const handleDismiss = () => {
    setIsVisible(false);
  };
  const handleDownload = () => {
    window.open("https://github.com/snozxyx/Tatakai/releases/latest", "_blank");
  };
  if (!isVisible) {
    return null;
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed right-4 bottom-20 z-40 w-72 animate-in slide-in-from-right duration-700", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative overflow-hidden rounded-2xl border border-border/50 bg-background/95 backdrop-blur-xl shadow-2xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-purple-500/5 pointer-events-none" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: handleDismiss,
          className: "absolute top-2 right-2 p-1 rounded-lg hover:bg-muted/50 transition-colors",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4 text-muted-foreground" })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3 mb-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 rounded-xl bg-primary/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Smartphone, { className: "w-5 h-5 text-primary" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 pt-0.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-sm mb-1", children: "Watch in the Tatakai app" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground leading-relaxed", children: "Full playback, offline downloads, Discord RPC, and fewer web limits — grab the desktop or mobile build." })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            onClick: handleDownload,
            className: "w-full justify-start gap-2 h-9 text-sm",
            variant: "secondary",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-4 h-4" }),
              "Download for Windows"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            onClick: handleDownload,
            className: "w-full justify-start gap-2 h-9 text-sm",
            variant: "ghost",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-4 h-4" }),
              "macOS & Linux"
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 pt-3 border-t border-border/50", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          onClick: handleDownload,
          className: "w-full justify-start gap-2 h-9 text-sm",
          variant: "ghost",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-4 h-4", viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M17.523 15.341c-.527 0-.954.427-.954.954s.427.954.954.954.954-.427.954-.954-.427-.954-.954-.954zm-11.046 0c-.527 0-.954.427-.954.954s.427.954.954.954.954-.427.954-.954-.427-.954-.954-.954zm11.405-6.634l1.716-2.972c.094-.162.038-.369-.124-.463-.162-.094-.369-.038-.463.124l-1.737 3.008c-1.391-.64-2.952-1.002-4.596-1.002s-3.205.362-4.596 1.002L6.345 6.396c-.094-.162-.301-.218-.463-.124-.162.094-.218.301-.124.463l1.716 2.972C3.645 11.369 1.5 14.762 1.5 18.682h21c0-3.92-2.145-7.313-5.974-8.975h.356z" }) }),
            "Android APK"
          ]
        }
      ) })
    ] })
  ] }) });
}
async function findSimilarAnime(animeId, limit = 10) {
  const results = await contentGraph.search({ query: animeId, page: 1, perPage: limit + 1 });
  return (results.media || []).map((m) => ({
    id: m.tatakaiId,
    name: m.titleEnglish || m.titleRomaji,
    poster: m.coverImageLarge || m.coverImageMedium || "",
    type: m.format || "TV",
    episodes: { sub: m.episodes || 0, dub: 0 },
    rating: m.averageScore ? String(m.averageScore / 10) : void 0,
    malId: m.malId || void 0,
    anilistId: m.anilistId || void 0
  })).filter((a) => a.id !== animeId).slice(0, limit);
}
function calculateScore(anime, userPreferences, factors) {
  let score = 0;
  const factorList = [];
  if (factors.genreMatch > 0) {
    score += factors.genreMatch * 40;
    factorList.push("Genre match");
  }
  if (anime.rating) {
    const rating = parseFloat(anime.rating);
    score += rating / 10 * 30;
    factorList.push("High rating");
  }
  score += factors.popularityScore * 20;
  if (factors.popularityScore > 0.5) {
    factorList.push("Popular");
  }
  score += factors.recencyScore * 10;
  let confidence = "low";
  if (score > 70) confidence = "high";
  else if (score > 50) confidence = "medium";
  const reasons = [];
  if (factors.genreMatch > 0.7) reasons.push("matches your favorite genres");
  if (anime.rating && parseFloat(anime.rating) > 8) reasons.push("highly rated");
  if (factors.popularityScore > 0.7) reasons.push("trending now");
  if (reasons.length === 0) reasons.push("similar to your preferences");
  return {
    score: Math.min(100, Math.round(score)),
    confidence,
    reason: `Because it ${reasons.join(" and ")}`,
    factors: factorList
  };
}
function useEnhancedRecommendations(limit = 20) {
  const { user } = useAuth();
  const { data: watchlist } = useWatchlist();
  const { data: history } = useWatchHistory(50);
  const { data: preferences } = useGenrePreferences();
  const { data: baseRecommendations } = usePersonalizedRecommendations(limit * 2);
  return useQuery({
    queryKey: ["enhanced_recommendations", user == null ? void 0 : user.id, preferences == null ? void 0 : preferences.length, watchlist == null ? void 0 : watchlist.length],
    queryFn: async () => {
      if (!user || !preferences || preferences.length === 0) {
        const homepage = toHomeData(await contentGraph.getHomePage());
        return ((homepage == null ? void 0 : homepage.spotlightAnimes) || []).slice(0, limit).map((anime) => ({
          anime: {
            id: anime.id,
            name: anime.name,
            poster: anime.poster,
            type: "TV",
            episodes: { sub: 0, dub: 0 },
            rating: void 0
          },
          score: 50,
          reason: "Popular anime",
          confidence: "medium",
          factors: ["Popular"]
        }));
      }
      const recommendations = [];
      const watchedIds = /* @__PURE__ */ new Set([
        ...(watchlist == null ? void 0 : watchlist.map((w) => w.anime_id)) || [],
        ...(history == null ? void 0 : history.map((h) => h.anime_id)) || []
      ]);
      for (const rec of baseRecommendations || []) {
        if (watchedIds.has(rec.anime.id)) continue;
        try {
          const animeGenres = [];
          const genreMatch = preferences.reduce((acc, pref) => {
            if (animeGenres.some((g) => g.toLowerCase() === pref.genre.toLowerCase())) {
              return acc + pref.weight / preferences.length;
            }
            return acc;
          }, 0);
          const popularityScore = rec.anime.rating ? parseFloat(rec.anime.rating) / 10 : 0.5;
          const recencyScore = 0.5;
          const { score, confidence, reason, factors } = calculateScore(
            rec.anime,
            {
              genres: preferences.map((p) => p.genre),
              preferredRatings: [],
              preferredTypes: []
            },
            {
              genreMatch,
              ratingScore: rec.anime.rating ? parseFloat(rec.anime.rating) / 10 : 0,
              popularityScore,
              recencyScore
            }
          );
          recommendations.push({
            anime: rec.anime,
            score,
            reason,
            confidence,
            factors
          });
        } catch {
        }
      }
      if (watchlist && watchlist.length > 0) {
        const sampleAnime = watchlist[0];
        const similar = await findSimilarAnime(sampleAnime.anime_id, 5);
        for (const anime of similar) {
          if (watchedIds.has(anime.id)) continue;
          if (recommendations.some((r) => r.anime.id === anime.id)) continue;
          recommendations.push({
            anime,
            score: 60,
            reason: `Similar to ${sampleAnime.anime_id}`,
            confidence: "medium",
            factors: ["Similar content"]
          });
        }
      }
      return recommendations.sort((a, b) => b.score - a.score).slice(0, limit);
    },
    enabled: !!user && (!!(watchlist == null ? void 0 : watchlist.length) || !!(history == null ? void 0 : history.length)),
    staleTime: 6e5
    // 10 minutes
  });
}
function BecauseYouWatched({ className }) {
  const { data: history = [] } = useWatchHistory(20);
  const { data: recommendations, isLoading } = useEnhancedRecommendations();
  const navigate = useNavigate();
  const seedAnime = reactExports.useMemo(() => {
    if (!history.length) return null;
    const recent = history[0];
    return { id: recent.anime_id, name: recent.anime_name, poster: recent.anime_poster };
  }, [history]);
  if (!seedAnime || !(recommendations == null ? void 0 : recommendations.length) || isLoading) return null;
  const items = recommendations.slice(0, 6);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end justify-between mb-6 md:mb-8 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 md:gap-4", children: [
        seedAnime.poster && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: () => navigate(`/anime/${seedAnime.id}`),
            className: "relative shrink-0 overflow-hidden rounded-md md:rounded-lg w-10 h-14 md:w-12 md:h-[72px] bg-muted transition-transform hover:scale-105 active:scale-95 shadow-sm border border-border/40",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: getProxiedImageUrl(seedAnime.poster),
                  alt: seedAnime.name,
                  className: "w-full h-full object-cover",
                  loading: "lazy"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 ring-1 ring-inset ring-black/10 dark:ring-white/10 rounded-md md:rounded-lg" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col justify-center gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-sm font-medium text-primary", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-4 h-4" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Because you watched" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: () => navigate(`/anime/${seedAnime.id}`),
              className: "text-lg md:text-xl font-bold text-foreground text-left hover:text-primary transition-colors duration-200 line-clamp-1 max-w-[220px] md:max-w-md lg:max-w-lg",
              title: seedAnime.name,
              children: seedAnime.name
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: () => navigate("/recommendations"),
          className: "group hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-muted-foreground rounded-full hover:bg-primary/10 hover:text-primary transition-all duration-200 ease-out shrink-0",
          children: [
            "See all",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: () => navigate("/recommendations"),
          className: "sm:hidden group flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors pb-1",
          children: [
            "See all",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4" })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-4 gap-y-8", children: items.map((rec, i) => {
      var _a;
      return /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: {
            delay: i * 0.05,
            duration: 0.4,
            ease: [0.21, 0.47, 0.32, 0.98]
            // Smooth custom easing
          },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimeCardWithPreview, { anime: rec.anime })
        },
        ((_a = rec.anime) == null ? void 0 : _a.id) || i
      );
    }) })
  ] });
}
function formatSpeed(bytesPerSecond) {
  const value = Number(bytesPerSecond || 0);
  if (!Number.isFinite(value) || value <= 0) return "0 KB/s";
  if (value < 1024 * 1024) return `${Math.round(value / 1024)} KB/s`;
  return `${(value / 1024 / 1024).toFixed(1)} MB/s`;
}
function TorrentSessionBanner() {
  const navigate = useNavigate();
  const confirm = useConfirm();
  const isDesktop = useIsDesktopApp();
  const [sessions, setSessions] = reactExports.useState([]);
  const [activeSessions, setActiveSessions] = reactExports.useState({});
  const loadSessions = reactExports.useCallback(async () => {
    var _a;
    if (!isDesktop) return;
    try {
      const history = getLocalTorrentSessionHistory();
      setSessions(history);
      if ((_a = window.tatakaiRuntime) == null ? void 0 : _a.getTorrentStats) {
        const statsMap = {};
        for (const item of history) {
          try {
            const stats = await window.tatakaiRuntime.getTorrentStats(item.sessionId);
            if (stats && stats.success !== false) {
              statsMap[item.sessionId] = stats;
            }
          } catch {
          }
        }
        setActiveSessions(statsMap);
      }
    } catch (error) {
      console.error("Failed to load torrent sessions:", error);
    }
  }, [isDesktop]);
  reactExports.useEffect(() => {
    loadSessions();
    const interval = setInterval(loadSessions, 1e4);
    return () => clearInterval(interval);
  }, [loadSessions]);
  const removeSession = (id) => {
    var _a, _b;
    removeLocalTorrentSessionHistory(id);
    setSessions((prev) => prev.filter((item) => item.sessionId !== id));
    if (activeSessions[id]) {
      (_b = (_a = window.tatakaiRuntime) == null ? void 0 : _a.stopTorrentSession) == null ? void 0 : _b.call(_a, id);
      setActiveSessions((prev) => {
        const next = { ...prev };
        delete next[id];
        return next;
      });
    }
  };
  const clearAll = async () => {
    var _a;
    if (!await confirm({ title: "Stop all active torrents and clear the session history?", destructive: true })) return;
    clearLocalTorrentSessionHistory();
    setSessions([]);
    setActiveSessions({});
    if ((_a = window.tatakaiRuntime) == null ? void 0 : _a.clearAllTorrentData) {
      await window.tatakaiRuntime.clearAllTorrentData();
      ue.success("All torrent data cleared");
    }
  };
  if (!isDesktop || sessions.length === 0 && Object.keys(activeSessions).length === 0) {
    return null;
  }
  const activeCount = Object.keys(activeSessions).length;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mb-12 space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-500", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      SectionHeading,
      {
        eyebrow: "Downloads",
        title: "Torrent Sessions",
        action: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: "ghost",
            size: "sm",
            onClick: clearAll,
            className: "group gap-2 rounded-full text-xs font-medium text-muted-foreground hover:bg-destructive/10 hover:text-destructive",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3.5 w-3.5 transition-transform group-hover:scale-110" }),
              "Clear all",
              activeCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-1 inline-flex items-center rounded-full bg-destructive/15 px-2 py-0.5 text-[10px] font-bold text-destructive", children: [
                activeCount,
                " live"
              ] })
            ]
          }
        )
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: RESUME_GRID_CLASS, children: sessions.map((session) => {
      const stats = activeSessions[session.sessionId];
      const isActive = Boolean(stats);
      const title = session.animeName || session.torrentName || "Unknown torrent";
      const href = `/watch/${session.animeId || `torrent-${session.sessionId}`}?sessionId=${session.sessionId}&torrent=true`;
      return /* @__PURE__ */ jsxRuntimeExports.jsx(
        ResumeCard,
        {
          onClick: () => navigate(href),
          poster: session.animePoster || void 0,
          title,
          primaryMeta: isActive ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5 font-medium text-emerald-400", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "h-3 w-3 animate-pulse" }),
            "Downloading"
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5 text-white/50", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CirclePause, { className: "h-3 w-3" }),
            "Session paused"
          ] }),
          secondaryMeta: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5 text-white/40", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-3 w-3" }),
            new Date(session.startedAt).toLocaleDateString(void 0, {
              month: "short",
              day: "numeric"
            })
          ] }),
          progress: isActive ? Number(stats.progress) : void 0,
          progressNote: isActive ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 text-[11px] tabular-nums font-medium text-white/70", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(HardDriveDownload, { className: "h-3 w-3" }),
            formatSpeed(stats.downloadSpeed)
          ] }) : void 0,
          footer: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-white/40 transition-colors group-hover:text-white/70", children: [
            isActive ? "Open Player" : "Resume Session",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-3 w-3" })
          ] }),
          busy: isActive,
          dimmed: !isActive,
          fallbackIcon: Zap,
          onRemove: () => removeSession(session.sessionId),
          removeLabel: `Remove ${title}`
        },
        session.sessionId
      );
    }) })
  ] });
}
const RevealSection = ({ children, delay }) => /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { delay, className: "[&>section]:!mb-0 [&>div]:!mb-0", children });
const Index = () => {
  const { data, isLoading, error } = useHomeData();
  useIsNativeApp();
  const isDesktopApp = useIsDesktopApp();
  const isMobile = useIsMobile();
  const isMobileApp = Capacitor.isNativePlatform();
  const showInfiniteEarly = isMobile || isMobileApp;
  const [showDeferredSections, setShowDeferredSections] = reactExports.useState(false);
  const showSidebar = !isMobile;
  reactExports.useEffect(() => {
    setBrowsingRpc("Anime");
  }, []);
  reactExports.useEffect(() => {
    if (isLoading || !data) {
      setShowDeferredSections(false);
      return;
    }
    const timer = window.setTimeout(() => {
      setShowDeferredSections(true);
    }, 450);
    return () => {
      window.clearTimeout(timer);
    };
  }, [isLoading, data]);
  if (error) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-background flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold mb-2", children: "Failed to load" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Please try again later" })
    ] }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background text-foreground overflow-x-hidden", children: [
    !isMobile && /* @__PURE__ */ jsxRuntimeExports.jsx(Background, {}),
    showSidebar && /* @__PURE__ */ jsxRuntimeExports.jsx(Sidebar, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: cn(
      "relative z-10 pr-6 py-6 max-w-[1800px] mx-auto pb-24 md:pb-6",
      isDesktopApp ? "pl-24" : "pl-6 md:pl-32"
      // Desktop app sidebar is fixed w-20, so content needs larger offset
    ), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Header, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden md:block h-4 lg:h-6", "aria-hidden": true }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ExtensionSlot, { slotId: "home-top" }),
      isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(HeroSkeleton, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-24", children: Array.from({ length: 6 }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(CardSkeleton, {}, i)) })
      ] }) : data ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-14 md:space-y-20 [&>section]:!mb-0 [&>div]:!mb-0", children: [
        data.spotlightAnimes.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
          HeroSection,
          {
            spotlight: data.spotlightAnimes[0],
            spotlights: data.spotlightAnimes
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ReleaseV6Banner, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ContinueWatching, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx(LocalContinueWatching, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TorrentSessionBanner, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx(LastReadMangaSection, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx(RevealSection, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(LatestEpisodes, { animes: data.latestEpisodeAnimes }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(RevealSection, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingGrid, { animes: data.trendingAnimes }) }),
        showDeferredSections ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(RevealSection, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(BecauseYouWatched, {}) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(RevealSection, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(AIRecommendationBanner, {}) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(RevealSection, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            TopAnimeSection,
            {
              today: data.top10Animes.today,
              week: data.top10Animes.week,
              month: data.top10Animes.month
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(RevealSection, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(UpcomingAnimeSection, {}) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(RevealSection, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            AnimeGrid,
            {
              animes: data.mostPopularAnimes.slice(0, 6),
              title: "Most Popular",
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: "w-5 h-5 text-destructive fill-destructive" })
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(RevealSection, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            AnimeGrid,
            {
              animes: data.mostFavoriteAnimes.slice(0, 6),
              title: "Most Favorite",
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-5 h-5 text-amber" })
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(RevealSection, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(IndexMangaShowcase, {}) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(RevealSection, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(GenreCloud, { genres: data.genres }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(RevealSection, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CommunitySection, {}) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(RevealSection, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DiscordSection, {}) }),
          showInfiniteEarly ? /* @__PURE__ */ jsxRuntimeExports.jsx(MobileInfiniteHomeSections, {}) : /* @__PURE__ */ jsxRuntimeExports.jsx(InfiniteHomeSections, {})
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-[60vh]", "aria-hidden": true })
      ] }) : null,
      /* @__PURE__ */ jsxRuntimeExports.jsx(ExtensionSlot, { slotId: "home-bottom" })
    ] }),
    showDeferredSections && data && /* @__PURE__ */ jsxRuntimeExports.jsx(ReviewPopup, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(MobileNav, {}),
    !isMobile && !isMobileApp && /* @__PURE__ */ jsxRuntimeExports.jsx(AppDownloadBanner, {})
  ] });
};
export {
  Index as default
};
