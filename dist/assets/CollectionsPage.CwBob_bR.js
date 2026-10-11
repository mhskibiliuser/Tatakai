import { e as useNavigate, r as reactExports, j as jsxRuntimeExports } from "./react-vendor.CAo4XUiA.js";
import { K as useIsDesktopApp, a_ as toAnimeCard, Q as Background, S as Sidebar, bq as Tabs, br as TabsList, bs as TabsTrigger, bu as TabsContent, l as getProxiedImageUrl, H as toHomeData, I as contentGraph } from "./index.C6yfkT5T.js";
import { M as MobileNav } from "./MobileNav.ABHzkhTQ.js";
import { A as AnimeCardWithPreview } from "./AnimeCardWithPreview.BLibCIKm.js";
import { a as useQuery } from "./tanstack.DPr3OB19.js";
import { C as CardSkeleton } from "./skeleton-custom.3olGZrgu.js";
import { M as MangaTrendingSection } from "./MangaTrendingSection.P7KYeQkm.js";
import { cV as Library, u as ArrowLeft, bB as Flame, H as Heart, aI as Star, aD as Clock, bF as Calendar, k as Sparkles, x as CirclePlay } from "./icons.C2gBBarQ.js";
import { A as AnimatePresence, m as motion } from "./motion.DVGLRFCH.js";
import "./vendor.CJyRs4QS.js";
import "./supabase.WuRMX5Dg.js";
import "./radix.BiK9uYXL.js";
import "./hls.BlgtCWcq.js";
import "./editor.Dxw8dtyw.js";
import "./charts.Dr1fgDJ-.js";
import "./useHoverPreview.Cs_Lh1vM.js";
import "./SectionHeading.D7LOUoID.js";
import "./PillGroup.CcXbIR07.js";
import "./DiscoverPosterGrid.CIdiGIb1.js";
import "./mangaPosterItem.BNF10jsL.js";
const TABS = [
  { id: "popular", icon: Flame, label: "Popular" },
  { id: "favorites", icon: Heart, label: "Favorite" },
  { id: "airing", icon: Star, label: "Airing" },
  { id: "completed", icon: Clock, label: "Completing" },
  { id: "season-now", icon: Calendar, label: "The Season", isJikan: true },
  { id: "upcoming", icon: Sparkles, label: "Upcoming", isJikan: true }
];
function CollectionsHero({ anime, title }) {
  const navigate = useNavigate();
  const handleClick = () => {
    if (anime.id.startsWith("mal-")) {
      window.open(`https://myanimelist.net/anime/${anime.id.replace("mal-", "")}`, "_blank");
    } else {
      navigate(`/anime/${anime.id}`);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      className: "relative w-full aspect-[16/9] md:aspect-[21/9] rounded-xl md:rounded-[2rem] overflow-hidden mb-8 md:mb-12 group border border-white/10",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: getProxiedImageUrl(anime.poster),
              className: "w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-1000 brightness-75",
              alt: anime.name,
              loading: "eager",
              decoding: "async",
              fetchpriority: "high"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-background via-background/40 to-transparent" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-80" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-x-0 bottom-0 p-4 md:p-8 lg:p-12 flex flex-col justify-end max-w-3xl", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-3 mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-2 md:px-3 py-1 rounded-full bg-orange-500/20 backdrop-blur-md border border-orange-500/30 text-orange-400 text-[10px] md:text-xs font-bold uppercase tracking-widest flex items-center gap-1 md:gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-3 h-3 fill-current" }),
            "Top Featured in ",
            title
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-black font-display mb-4 md:mb-6 tracking-tight text-white drop-shadow-2xl leading-tight", children: anime.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                onClick: handleClick,
                className: "flex items-center gap-2 px-4 md:px-8 py-2 md:py-3 bg-white text-black rounded-xl md:rounded-2xl text-sm md:text-base font-bold hover:scale-105 transition-all shadow-xl",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CirclePlay, { className: "w-5 h-5" }),
                  "Watch Now"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                onClick: handleClick,
                className: "hidden sm:block px-4 md:px-8 py-2 md:py-3 bg-white/10 backdrop-blur-md text-white rounded-xl md:rounded-2xl text-sm md:text-base font-bold hover:bg-white/20 transition-all border border-white/10",
                children: "Details"
              }
            )
          ] })
        ] })
      ]
    }
  );
}
function CollectionsPage() {
  const navigate = useNavigate();
  const isDesktopApp = useIsDesktopApp();
  const [activeTab, setActiveTab] = reactExports.useState("popular");
  const { data: homeData, isLoading: loadingHome } = useQuery({
    queryKey: ["home"],
    queryFn: async () => toHomeData(await contentGraph.getHomePage()),
    staleTime: 5 * 60 * 1e3
  });
  const { data: seasonNowData, isLoading: loadingSeasonNow } = useQuery({
    queryKey: ["jikan-season-now"],
    queryFn: () => contentGraph.getSeasonal(void 0, void 0, 1, 24),
    staleTime: 10 * 60 * 1e3,
    enabled: activeTab === "season-now"
  });
  const { data: upcomingData, isLoading: loadingUpcoming } = useQuery({
    queryKey: ["jikan-upcoming"],
    queryFn: () => contentGraph.getUpcoming(1, 24),
    staleTime: 10 * 60 * 1e3,
    enabled: activeTab === "upcoming"
  });
  const isLoading = loadingHome || activeTab === "season-now" && loadingSeasonNow || activeTab === "upcoming" && loadingUpcoming;
  const currentCollection = reactExports.useMemo(() => {
    if (activeTab === "season-now" && (seasonNowData == null ? void 0 : seasonNowData.media)) {
      return seasonNowData.media.map(toAnimeCard);
    }
    if (activeTab === "upcoming" && (upcomingData == null ? void 0 : upcomingData.media)) {
      return upcomingData.media.map(toAnimeCard);
    }
    if (!homeData) return [];
    switch (activeTab) {
      case "trending":
        return homeData.trendingAnimes || [];
      case "popular":
        return homeData.mostPopularAnimes || [];
      case "favorites":
        return homeData.mostFavoriteAnimes || [];
      case "airing":
        return homeData.topAiringAnimes || [];
      case "completed":
        return homeData.latestCompletedAnimes || [];
      default:
        return [];
    }
  }, [homeData, seasonNowData, upcomingData, activeTab]);
  const collectionTitle = reactExports.useMemo(() => {
    switch (activeTab) {
      case "popular":
        return "Most Popular";
      case "favorites":
        return "Fan Favorites";
      case "airing":
        return "Top Airing";
      case "completed":
        return "Just Completing";
      case "season-now":
        return "The Season";
      case "upcoming":
        return "Upcoming Hype";
      default:
        return "Collections";
    }
  }, [activeTab]);
  const collectionToCard = (a) => ({
    id: a.id || "",
    name: a.name || "",
    poster: a.poster || "",
    type: a.type || "TV",
    episodes: a.episodes || { sub: 0, dub: 0 },
    rating: a.rating
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background text-foreground overflow-x-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Background, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Sidebar, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: `relative z-10 ${isDesktopApp ? "pl-4" : "pl-4 md:pl-32"} pr-4 md:pr-6 py-4 md:py-6 max-w-[1800px] mx-auto pb-24 md:pb-6`, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-8 md:mb-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-3 md:p-4 rounded-[1.25rem] bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 shadow-xl shadow-purple-500/30", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Library, { className: "w-6 h-6 md:w-8 md:h-8 text-white" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl md:text-3xl lg:text-5xl font-black tracking-tighter", children: "Collections" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm md:text-base font-medium", children: "Explore curated masterpiece libraries" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: () => navigate(-1),
            className: "flex items-center gap-2 px-4 md:px-5 py-2 md:py-2.5 rounded-xl bg-card/40 backdrop-blur-xl border border-white/5 text-muted-foreground hover:text-white transition-all w-fit",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-bold", children: "Go Back" })
            ]
          }
        )
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { value: activeTab, onValueChange: (v) => setActiveTab(v), className: "w-full", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsList, { className: "flex gap-2 overflow-x-auto pb-2 scrollbar-none -mx-4 px-4 md:mx-0 md:px-0 h-auto bg-transparent mb-8 md:mb-12 md:flex-wrap", children: TABS.map((tab) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          TabsTrigger,
          {
            value: tab.id,
            className: "gap-1 md:gap-2 px-3 md:px-6 py-2 md:py-3 rounded-xl md:rounded-2xl text-xs md:text-sm data-[state=active]:bg-white data-[state=active]:text-black border border-white/5 data-[state=active]:border-white shadow-none transition-all whitespace-nowrap flex-shrink-0",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(tab.icon, { className: "w-3 h-3 md:w-4 md:h-4" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold", children: tab.label }),
              tab.isJikan && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden md:inline text-[10px] opacity-60 ml-1", children: "MAL" })
            ]
          },
          tab.id
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: activeTab, className: "mt-0 ring-0 focus-visible:ring-0 outline-none", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { opacity: 0, x: 20 },
            animate: { opacity: 1, x: 0 },
            exit: { opacity: 0, x: -20 },
            transition: { duration: 0.4 },
            children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6", children: Array.from({ length: 18 }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(CardSkeleton, {}, i)) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              currentCollection[0] && /* @__PURE__ */ jsxRuntimeExports.jsx(
                CollectionsHero,
                {
                  anime: collectionToCard(currentCollection[0]),
                  title: collectionTitle
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-4 gap-y-10 md:gap-x-6 md:gap-y-12", children: currentCollection.slice(1).map((item, index) => {
                const anime = collectionToCard(item);
                return /* @__PURE__ */ jsxRuntimeExports.jsx(
                  motion.div,
                  {
                    initial: { opacity: 0, scale: 0.9 },
                    animate: { opacity: 1, scale: 1 },
                    transition: { delay: index * 0.02 },
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimeCardWithPreview, { anime })
                  },
                  anime.id
                );
              }) }),
              currentCollection.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center py-24 text-center", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Library, { className: "w-16 h-16 text-muted-foreground/20 mb-4" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-bold mb-2", children: "No Anime Found" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Try selecting a different collection tab" })
              ] })
            ] })
          }
        ) }, activeTab) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-12", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        MangaTrendingSection,
        {
          title: "Discover Manga",
          defaultTab: "manhwa",
          showTabs: true,
          limit: 18
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(MobileNav, {})
  ] });
}
export {
  CollectionsPage as default
};
