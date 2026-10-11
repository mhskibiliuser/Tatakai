import { j as jsxRuntimeExports, i as useParams, l as useSearchParams, e as useNavigate, r as reactExports } from "./react-vendor.CAo4XUiA.js";
import { Y as DropdownMenu, Z as DropdownMenuTrigger, _ as DropdownMenuContent, $ as DropdownMenuItem, j as cn, K as useIsDesktopApp, Q as Background, S as Sidebar } from "./index.C6yfkT5T.js";
import { M as MobileNav } from "./MobileNav.ABHzkhTQ.js";
import { H as Header } from "./Header.D6gxY_6M.js";
import { D as DiscoverHero } from "./DiscoverHero.Jceha_sb.js";
import { u as useAniListGenres } from "./useAniListGenres.D0-w-cUA.js";
import { D as DISCOVER_SORTS, c as controlTriggerClass, a as controlMenuClass, b as controlItemClass, d as discoverYears, j as resolveGenreSlug, u as useDiscoverMedia, k as genreDisplayName, l as DiscoverPosterGrid, n as PAGER_CLASS } from "./DiscoverPosterGrid.CIdiGIb1.js";
import { P as PillGroup } from "./PillGroup.CcXbIR07.js";
import { N as ChevronDown, c as Check, cf as Tag, ad as SearchX, aG as ChevronLeft, b as ChevronRight } from "./icons.C2gBBarQ.js";
import "./vendor.CJyRs4QS.js";
import "./tanstack.DPr3OB19.js";
import "./supabase.WuRMX5Dg.js";
import "./radix.BiK9uYXL.js";
import "./motion.DVGLRFCH.js";
import "./hls.BlgtCWcq.js";
import "./editor.Dxw8dtyw.js";
import "./charts.Dr1fgDJ-.js";
import "./useNotifications.BzSJE8km.js";
import "./useTrackedShows.Dbf34fk8.js";
import "./useNextAiringEpisodes.COq8rfNQ.js";
import "./RankedPosterRail.BR6TE-Dw.js";
import "./useHoverPreview.Cs_Lh1vM.js";
function DiscoverFilterBar({
  sort,
  onSortChange,
  year,
  onYearChange,
  genre,
  onGenreChange,
  className
}) {
  const { genres: anilistGenres } = useAniListGenres();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: cn("flex flex-wrap items-center gap-2", className), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PillGroup, { options: DISCOVER_SORTS, value: sort, onChange: onSortChange, label: "Sort" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenu, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuTrigger, { className: controlTriggerClass, children: [
        year ?? "Any year",
        /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "h-3.5 w-3.5 opacity-60" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuContent, { align: "start", className: controlMenuClass, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuItem, { className: controlItemClass, onSelect: () => onYearChange(null), children: [
          "Any year",
          year === null && /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-3.5 w-3.5 text-primary" })
        ] }),
        discoverYears().map((value) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          DropdownMenuItem,
          {
            className: controlItemClass,
            onSelect: () => onYearChange(value),
            children: [
              value,
              year === value && /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-3.5 w-3.5 text-primary" })
            ]
          },
          value
        ))
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenu, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuTrigger, { className: controlTriggerClass, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Tag, { className: "h-3.5 w-3.5 opacity-60" }),
        genre ?? "Genre",
        /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "h-3.5 w-3.5 opacity-60" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuContent, { align: "start", className: controlMenuClass, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuItem, { className: controlItemClass, onSelect: () => onGenreChange(void 0), children: [
          "All genres",
          !genre && /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-3.5 w-3.5 text-primary" })
        ] }),
        anilistGenres.map((value) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          DropdownMenuItem,
          {
            className: controlItemClass,
            onSelect: () => onGenreChange(value),
            children: [
              value,
              genre === value && /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-3.5 w-3.5 text-primary" })
            ]
          },
          value
        ))
      ] })
    ] })
  ] });
}
const SORT_IDS = DISCOVER_SORTS.map((s) => s.id);
const isSort = (value) => !!value && SORT_IDS.includes(value);
const toSlug = (genre) => genre.toLowerCase().replace(/\s+/g, "-");
function GenrePage() {
  const { genre: genreSlug } = useParams();
  const [params, setParams] = useSearchParams();
  const navigate = useNavigate();
  const isDesktopApp = useIsDesktopApp();
  const gridTop = reactExports.useRef(null);
  const sortParam = params.get("sort");
  const sort = isSort(sortParam) ? sortParam : "for-you";
  const year = Number(params.get("year")) || null;
  const page = Math.max(1, Number(params.get("page")) || 1);
  const resolvedGenre = resolveGenreSlug(genreSlug);
  const { data, isLoading, isFetching } = useDiscoverMedia({ genre: genreSlug, sort, year, page });
  const media = (data == null ? void 0 : data.media) ?? [];
  const pageInfo = data == null ? void 0 : data.pageInfo;
  const heading = reactExports.useMemo(
    () => genreSlug ? `${genreDisplayName(genreSlug)} anime` : "Browse everything",
    [genreSlug]
  );
  const patch = (next) => {
    const merged = new URLSearchParams(params);
    Object.entries(next).forEach(([key, value]) => {
      if (value === null) merged.delete(key);
      else merged.set(key, value);
    });
    if (!("page" in next)) merged.delete("page");
    setParams(merged, { replace: true });
  };
  const goToPage = (next) => {
    var _a;
    patch({ page: String(next) });
    (_a = gridTop.current) == null ? void 0 : _a.scrollIntoView({ behavior: "smooth", block: "start" });
  };
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
          /* @__PURE__ */ jsxRuntimeExports.jsx(DiscoverHero, { className: "mt-2" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { ref: gridTop, className: "scroll-mt-6 pt-12", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-6 flex flex-wrap items-end justify-between gap-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold tracking-tight capitalize sm:text-3xl", children: heading }),
              pageInfo && pageInfo.total > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 text-sm text-muted-foreground", children: [
                pageInfo.total.toLocaleString(),
                " titles · page ",
                pageInfo.currentPage,
                " of",
                " ",
                pageInfo.lastPage.toLocaleString()
              ] })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              DiscoverFilterBar,
              {
                className: "mb-8",
                sort,
                onSortChange: (next) => patch({ sort: next === "for-you" ? null : next }),
                year,
                onYearChange: (next) => patch({ year: next ? String(next) : null }),
                genre: resolvedGenre,
                onGenreChange: (next) => {
                  const query = params.toString();
                  const suffix = query ? `?${query}` : "";
                  navigate(next ? `/genre/${toSlug(next)}${suffix}` : `/genre${suffix}`);
                }
              }
            ),
            media.length === 0 && !isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center rounded-3xl border border-white/[0.07] bg-white/[0.02] py-24 text-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SearchX, { className: "h-10 w-10 text-muted-foreground/60" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-lg font-semibold", children: "Nothing matches those filters" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 max-w-sm text-sm text-muted-foreground", children: year ? `No ${resolvedGenre ?? "anime"} titles from ${year}. Try “Any year”.` : "Try a different genre or sort order." })
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(DiscoverPosterGrid, { media, isLoading, preview: true, className: cn(isFetching && "opacity-70 transition-opacity") }),
            pageInfo && pageInfo.lastPage > 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "mt-14 flex items-center justify-center gap-3", "aria-label": "Pagination", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  onClick: () => goToPage(page - 1),
                  disabled: page <= 1,
                  className: PAGER_CLASS,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "h-4 w-4" }),
                    "Previous"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "min-w-24 text-center text-sm font-semibold tabular-nums text-muted-foreground", children: [
                pageInfo.currentPage,
                " / ",
                pageInfo.lastPage.toLocaleString()
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  onClick: () => goToPage(page + 1),
                  disabled: !pageInfo.hasNextPage,
                  className: PAGER_CLASS,
                  children: [
                    "Next",
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-4 w-4" })
                  ]
                }
              )
            ] })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(MobileNav, {})
  ] });
}
export {
  GenrePage as default
};
