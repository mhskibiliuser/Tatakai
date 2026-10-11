import { e as useNavigate, i as useParams, r as reactExports, j as jsxRuntimeExports } from "./react-vendor.CAo4XUiA.js";
import { D as useIsNativeApp, s as useIsMobile, f4 as useCustomSource, f5 as useCustomHome, f6 as useCustomSearch, Q as Background, S as Sidebar, R as ExtensionSlot, j as cn, G as GlassPanel, a as isCapacitor, dr as registerMobileSource, bg as UnifiedMediaCard } from "./index.C6yfkT5T.js";
import { M as MobileNav } from "./MobileNav.ABHzkhTQ.js";
import { H as Header } from "./Header.D6gxY_6M.js";
import { C as CardSkeleton } from "./skeleton-custom.3olGZrgu.js";
import { u as ArrowLeft, S as Search, X, bo as SlidersHorizontal, Q as LoaderCircle } from "./icons.C2gBBarQ.js";
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
function toUnifiedCustomCard(card, base, kind) {
  return {
    id: String(card.id),
    name: card.title,
    poster: card.image && isCapacitor() && /^https?:/i.test(card.image) ? registerMobileSource({ url: card.image }) : card.image || "",
    mediaType: kind === "read" ? "manga" : "anime",
    status: card.badge || void 0,
    href: `${base}/info/${encodeURIComponent(card.id)}`
  };
}
function CardGrid({ cards }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6", children: cards.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx(UnifiedMediaCard, { item }, item.id)) });
}
function CustomHomePage() {
  const isNative = useIsNativeApp();
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const { namespace, sourceId } = useParams();
  const { source } = useCustomSource(namespace, sourceId);
  const kind = (source == null ? void 0 : source.kind) === "read" ? "read" : "watch";
  const base = `/x/${namespace}/${sourceId}`;
  const [query, setQuery] = reactExports.useState("");
  const [submitted, setSubmitted] = reactExports.useState("");
  const [filters, setFilters] = reactExports.useState({ tags: [] });
  const [showFilters, setShowFilters] = reactExports.useState(false);
  const [showAllTags, setShowAllTags] = reactExports.useState(false);
  const { data: home, isLoading } = useCustomHome(namespace, sourceId);
  const schema = home == null ? void 0 : home.filters;
  const schemaTags = (schema == null ? void 0 : schema.tags) ?? [];
  const schemaGroups = (schema == null ? void 0 : schema.groups) ?? [];
  const hasFilterUi = schemaTags.length > 0 || schemaGroups.length > 0;
  const activeTags = filters.tags ?? [];
  const hasActiveFilters = reactExports.useMemo(
    () => activeTags.length > 0 || Object.entries(filters).some(([k, v]) => k !== "tags" && typeof v === "string" && v !== ""),
    [filters, activeTags]
  );
  const resultsMode = Boolean(submitted) || hasActiveFilters;
  const { data: searchData, isLoading: searching } = useCustomSearch(
    namespace,
    sourceId,
    submitted,
    1,
    hasActiveFilters ? filters : void 0
  );
  const toggleTag = (tag) => setFilters((f) => {
    const next = new Set(f.tags ?? []);
    if (next.has(tag)) next.delete(tag);
    else next.add(tag);
    return { ...f, tags: Array.from(next) };
  });
  const setGroup = (key, value) => setFilters((f) => ({ ...f, [key]: value || void 0 }));
  const clearFilters = () => setFilters({ tags: [] });
  const clearAll = () => {
    setQuery("");
    setSubmitted("");
    clearFilters();
  };
  const sections = reactExports.useMemo(
    () => ((home == null ? void 0 : home.sections) ?? []).map((s) => ({
      title: s.title,
      cards: (s.items ?? []).map((c) => toUnifiedCustomCard(c, base, kind))
    })),
    [home, base, kind]
  );
  const searchCards = reactExports.useMemo(
    () => ((searchData == null ? void 0 : searchData.results) ?? []).map((c) => toUnifiedCustomCard(c, base, kind)),
    [searchData, base, kind]
  );
  const hasSections = sections.some((s) => s.cards.length > 0);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen overflow-x-hidden bg-background text-foreground", children: [
    !isNative && /* @__PURE__ */ jsxRuntimeExports.jsx(Background, {}),
    !isMobile && /* @__PURE__ */ jsxRuntimeExports.jsx(Sidebar, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "main",
      {
        className: cn(
          "relative z-10 mx-auto max-w-[1800px] py-6 pr-6 pb-24 md:pb-6",
          isNative ? "pl-6" : "pl-6 md:pl-32"
        ),
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Header, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ExtensionSlot, { slotId: "custom-home-top", props: { namespace, sourceId, kind } }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => navigate("/extensions"),
              className: "mb-4 inline-flex min-h-[44px] items-center gap-1.5 rounded-xl border border-white/15 px-3 py-2 text-sm font-semibold active:scale-95 hover:bg-white/10",
              "aria-label": "Back to extensions",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" }),
                " Extensions"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8 mt-2 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-black tracking-tight", children: (source == null ? void 0 : source.name) || "Custom source" }),
              (source == null ? void 0 : source.description) ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 max-w-2xl text-sm text-muted-foreground", children: source.description }) : null
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "form",
                {
                  onSubmit: (e) => {
                    e.preventDefault();
                    setSubmitted(query.trim());
                  },
                  className: "flex items-center gap-2",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "input",
                      {
                        value: query,
                        onChange: (e) => setQuery(e.target.value),
                        placeholder: "Search…",
                        className: "w-56 rounded-xl border border-white/15 bg-white/5 py-2 pl-9 pr-8 text-sm outline-none focus:border-primary/60"
                      }
                    ),
                    submitted ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        onClick: clearAll,
                        className: "absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground",
                        "aria-label": "Clear search",
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" })
                      }
                    ) : null
                  ] })
                }
              ),
              hasFilterUi ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  onClick: () => setShowFilters((v) => !v),
                  className: cn(
                    "inline-flex min-h-[40px] items-center gap-1.5 rounded-xl border px-3 py-2 text-sm font-semibold transition active:scale-95",
                    showFilters || hasActiveFilters ? "border-primary/60 bg-primary/20 text-foreground" : "border-white/15 bg-white/5 text-muted-foreground hover:bg-white/10"
                  ),
                  "aria-label": "Toggle filters",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SlidersHorizontal, { className: "h-4 w-4" }),
                    "Filters",
                    hasActiveFilters ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-md bg-primary/40 px-1.5 py-0.5 text-[11px]", children: activeTags.length + Object.keys(filters).filter((k) => k !== "tags" && filters[k]).length }) : null
                  ]
                }
              ) : null
            ] })
          ] }),
          hasFilterUi && showFilters ? /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassPanel, { className: "mb-8 border border-white/10 p-4", children: [
            schemaGroups.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-4 flex flex-wrap gap-3", children: schemaGroups.map((group) => /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex flex-col gap-1 text-xs font-semibold text-muted-foreground", children: [
              group.label,
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "select",
                {
                  value: typeof filters[group.key] === "string" ? filters[group.key] : "",
                  onChange: (e) => setGroup(group.key, e.target.value),
                  className: "min-w-[9rem] rounded-lg border border-white/15 bg-background/80 px-2.5 py-1.5 text-sm font-medium text-foreground outline-none focus:border-primary/60",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Any" }),
                    group.options.map((opt) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: opt.value, children: opt.label }, opt.value))
                  ]
                }
              )
            ] }, group.key)) }) : null,
            schemaTags.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-2 text-xs font-semibold text-muted-foreground", children: "Tags" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2", children: [
                (showAllTags ? schemaTags : schemaTags.slice(0, 24)).map((tag) => {
                  const active = activeTags.includes(tag);
                  return /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => toggleTag(tag),
                      className: cn(
                        "rounded-full border px-3 py-1 text-xs font-medium transition active:scale-95",
                        active ? "border-primary/60 bg-primary/25 text-foreground" : "border-white/15 bg-white/5 text-muted-foreground hover:bg-white/10"
                      ),
                      children: tag
                    },
                    tag
                  );
                }),
                schemaTags.length > 24 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => setShowAllTags((v) => !v),
                    className: "rounded-full border border-dashed border-white/20 px-3 py-1 text-xs font-medium text-muted-foreground hover:bg-white/10",
                    children: showAllTags ? "Show less" : `+${schemaTags.length - 24} more`
                  }
                ) : null
              ] })
            ] }) : null,
            hasActiveFilters ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 flex justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: clearFilters,
                className: "inline-flex items-center gap-1.5 rounded-lg border border-white/15 px-3 py-1.5 text-xs font-semibold text-muted-foreground hover:bg-white/10",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-3.5 w-3.5" }),
                  " Clear filters"
                ]
              }
            ) }) : null
          ] }) : null,
          resultsMode ? /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mb-10", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mb-6 px-2 font-display text-xl font-semibold tracking-tight", children: submitted ? `Results for “${submitted}”` : "Filtered results" }),
            searching ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6", children: Array.from({ length: 12 }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(CardSkeleton, {}, `search-skel-${i}`)) }) : searchCards.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(CardGrid, { cards: searchCards }) : /* @__PURE__ */ jsxRuntimeExports.jsx(GlassPanel, { className: "border border-white/10 p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: submitted ? `No results for “${submitted}”.` : "No results for the selected filters." }) })
          ] }) : isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-10", children: Array.from({ length: 2 }).map((_, row) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-4 h-7 w-48 rounded-lg bg-muted/50" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6", children: Array.from({ length: 6 }).map((_2, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(CardSkeleton, {}, `skel-${row}-${i}`)) })
          ] }, `skel-row-${row}`)) }) : hasSections ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-10", children: sections.filter((s) => s.cards.length > 0).map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mb-6 px-2 font-display text-2xl font-semibold tracking-tight", children: s.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardGrid, { cards: s.cards })
          ] }, s.title)) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassPanel, { className: "border border-white/10 p-8 text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "mx-auto mb-3 h-6 w-6 animate-spin text-muted-foreground" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-bold", children: "Nothing here yet" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "This source returned no home content. Try searching, or check that the extension is running." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ExtensionSlot, { slotId: "custom-home-bottom", props: { namespace, sourceId, kind } })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(MobileNav, {})
  ] });
}
export {
  CustomHomePage as default
};
