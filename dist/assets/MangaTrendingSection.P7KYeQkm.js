import { r as reactExports, j as jsxRuntimeExports, L as Link } from "./react-vendor.CAo4XUiA.js";
import { a as useQuery } from "./tanstack.DPr3OB19.js";
import { j as cn, bn as getTrendingManga, bo as getTrendingManhwa, bp as getLatestMangaUpdates } from "./index.C6yfkT5T.js";
import { S as SectionHeading } from "./SectionHeading.D7LOUoID.js";
import { P as PillGroup } from "./PillGroup.CcXbIR07.js";
import { P as PosterGridSkeleton, p as PosterCard, e as POSTER_GRID_CLASS } from "./DiscoverPosterGrid.CIdiGIb1.js";
import { m as mangaCardToPosterItem } from "./mangaPosterItem.BNF10jsL.js";
import { b as ChevronRight, B as BookOpen, e as TrendingUp, aD as Clock } from "./icons.C2gBBarQ.js";
const TABS = [
  { id: "manga", label: "Manga", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "h-3.5 w-3.5" }) },
  { id: "manhwa", label: "Manhwa", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-3.5 w-3.5" }) },
  { id: "latest", label: "New Chapters", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-3.5 w-3.5" }) }
];
const DESCRIPTION = {
  manga: "Top-rated trending manga",
  manhwa: "Korean webtoon charts",
  latest: "Recently updated chapters"
};
const RANKED = { manga: true, manhwa: true, latest: false };
function MangaTrendingSection({
  title = "Trending manga & manhwa",
  defaultTab = "manga",
  limit = 18,
  showTabs = true,
  className
}) {
  const [activeTab, setActiveTab] = reactExports.useState(defaultTab);
  const wants = (tab) => showTabs || activeTab === tab;
  const { data: mangaData = [], isLoading: loadingManga } = useQuery({
    queryKey: ["trending-manga", limit],
    queryFn: () => getTrendingManga(limit),
    staleTime: 10 * 60 * 1e3,
    gcTime: 30 * 60 * 1e3,
    enabled: wants("manga")
  });
  const { data: manhwaData = [], isLoading: loadingManhwa } = useQuery({
    queryKey: ["trending-manhwa", limit],
    queryFn: () => getTrendingManhwa(limit),
    staleTime: 10 * 60 * 1e3,
    gcTime: 30 * 60 * 1e3,
    enabled: wants("manhwa")
  });
  const { data: latestData = [], isLoading: loadingLatest } = useQuery({
    queryKey: ["latest-manga-updates", limit],
    queryFn: () => getLatestMangaUpdates(limit),
    staleTime: 5 * 60 * 1e3,
    gcTime: 15 * 60 * 1e3,
    enabled: wants("latest")
  });
  const active = activeTab === "manga" ? mangaData : activeTab === "manhwa" ? manhwaData : latestData;
  const isLoading = activeTab === "manga" ? loadingManga : activeTab === "manhwa" ? loadingManhwa : loadingLatest;
  const items = reactExports.useMemo(
    () => active.slice(0, limit).map((manga, index) => mangaCardToPosterItem(manga, index)),
    [active, limit]
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: cn("mb-12", className), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      SectionHeading,
      {
        eyebrow: "Manga & manhwa",
        title,
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
      showTabs && /* @__PURE__ */ jsxRuntimeExports.jsx(
        PillGroup,
        {
          options: TABS,
          value: activeTab,
          onChange: (id) => setActiveTab(id),
          label: "Manga chart"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-white/40", children: DESCRIPTION[activeTab] })
    ] }),
    isLoading && items.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(PosterGridSkeleton, { className: "mt-6", count: Math.min(limit, 14) }) : items.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex flex-col items-center gap-2 rounded-3xl border border-white/[0.07] bg-white/[0.02] py-16 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-7 w-7 text-white/25" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-base font-bold text-white/70", children: "No titles on this chart" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "max-w-sm text-sm text-white/40", children: "The manga charts could not be reached. Try again in a moment." })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn(POSTER_GRID_CLASS, "mt-6"), children: items.map((item, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      PosterCard,
      {
        item,
        rank: RANKED[activeTab] ? index + 1 : void 0,
        eager: index < 7
      },
      item.key
    )) })
  ] });
}
export {
  MangaTrendingSection as M
};
