import { e as useNavigate, i as useParams, r as reactExports, j as jsxRuntimeExports } from "./react-vendor.CAo4XUiA.js";
import { R as ReaderImage, r as readerPageRenderKey } from "./ReaderImage.mF082x-K.js";
import { f4 as useCustomSource, f7 as useCustomInfo, f9 as useCustomRead, eW as useReaderSettings, G as GlassPanel, dx as getProfileKnobs } from "./index.C6yfkT5T.js";
import { u as ArrowLeft, aG as ChevronLeft, b as ChevronRight, Q as LoaderCircle } from "./icons.C2gBBarQ.js";
import "./vendor.CJyRs4QS.js";
import "./tanstack.DPr3OB19.js";
import "./supabase.WuRMX5Dg.js";
import "./radix.BiK9uYXL.js";
import "./motion.DVGLRFCH.js";
import "./hls.BlgtCWcq.js";
import "./editor.Dxw8dtyw.js";
import "./charts.Dr1fgDJ-.js";
function CustomReadPage() {
  const navigate = useNavigate();
  const { namespace, sourceId, id, chapterId } = useParams();
  const { source } = useCustomSource(namespace, sourceId);
  const { data: info } = useCustomInfo(namespace, sourceId, id);
  const { data, isLoading, isError } = useCustomRead(namespace, sourceId, id, chapterId);
  const { settings } = useReaderSettings();
  const pages = (data == null ? void 0 : data.pages) ?? [];
  const total = pages.length;
  const [pageIndex, setPageIndex] = reactExports.useState(0);
  reactExports.useEffect(() => setPageIndex(0), [chapterId]);
  const entries = (info == null ? void 0 : info.entries) ?? [];
  const currentIdx = entries.findIndex((e) => e.id === chapterId);
  const prev = currentIdx > 0 ? entries[currentIdx - 1] : null;
  const next = currentIdx >= 0 && currentIdx < entries.length - 1 ? entries[currentIdx + 1] : null;
  const currentLabel = currentIdx >= 0 ? entries[currentIdx].label : chapterId;
  const base = `/x/${namespace}/${sourceId}`;
  const goEntry = (entryId) => navigate(`${base}/read/${id}/${encodeURIComponent(entryId)}`);
  const widthStyle = reactExports.useMemo(
    () => settings.sizing === "natural" ? { width: "auto", maxWidth: "100%" } : { width: `${settings.widthPercent}%`, maxWidth: "100%" },
    [settings.sizing, settings.widthPercent]
  );
  const eagerFor = (idx) => {
    const effectivePreloading = settings.preloading === "partial" ? getProfileKnobs().readerPreload : settings.preloading;
    if (settings.loadingStrategy === "eager" || effectivePreloading === "full") return true;
    const win = effectivePreloading === "none" ? 1 : 3;
    return Math.abs(idx - pageIndex) <= win;
  };
  const goNextPage = () => setPageIndex((i) => Math.min(total - 1, i + 1));
  const goPrevPage = () => setPageIndex((i) => Math.max(0, i - 1));
  const progressPct = total ? (pageIndex + 1) / total * 100 : 0;
  const progressLabel = `${Math.min(pageIndex + 1, total || 1)} / ${total || "…"}`;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative min-h-screen text-foreground", style: { backgroundColor: settings.backgroundColor }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sticky top-0 z-30 flex items-center gap-2 border-b border-white/10 bg-black/50 px-3 py-2 backdrop-blur", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => navigate(`${base}/info/${encodeURIComponent(id || "")}`),
          className: "inline-flex items-center gap-1.5 rounded-lg border border-white/15 px-2.5 py-1.5 text-sm font-semibold hover:bg-white/10",
          title: "Back to info",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          disabled: !prev,
          onClick: () => prev && goEntry(prev.id),
          className: "inline-flex items-center gap-1 rounded-lg border border-white/15 px-2.5 py-1.5 text-sm font-semibold hover:bg-white/10 disabled:opacity-40",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "h-4 w-4" }),
            " Prev"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-w-0 flex-1 flex-col items-center px-2 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-full truncate text-sm font-bold", children: (info == null ? void 0 : info.title) || (source == null ? void 0 : source.name) || "Read" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-full truncate text-xs text-muted-foreground", children: currentLabel })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          disabled: !next,
          onClick: () => next && goEntry(next.id),
          className: "inline-flex items-center gap-1 rounded-lg border border-white/15 px-2.5 py-1.5 text-sm font-semibold hover:bg-white/10 disabled:opacity-40",
          children: [
            "Next ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-4 w-4" })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto w-full max-w-5xl px-3 py-4", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-2 py-24 text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-5 w-5 animate-spin" }),
      " Loading pages…"
    ] }) : total === 0 || isError ? /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassPanel, { className: "mx-auto max-w-xl border border-white/10 p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold", children: "Unable to load this chapter" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-muted-foreground", children: "The source returned no pages. Try another chapter or check that the extension is running." })
    ] }) : settings.readingMode === "vertical" ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col items-center", style: { gap: `${settings.gap}px` }, children: pages.map((page, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      ReaderImage,
      {
        page,
        mode: settings.loadingMethod,
        style: widthStyle,
        eager: eagerFor(idx)
      },
      readerPageRenderKey(chapterId || "", page)
    )) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex min-h-full items-center justify-center", children: [
      pages[pageIndex] ? /* @__PURE__ */ jsxRuntimeExports.jsx(ReaderImage, { page: pages[pageIndex], mode: settings.loadingMethod, style: widthStyle, eager: true }, readerPageRenderKey(chapterId || "", pages[pageIndex])) : null,
      settings.clickToTurn ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            tabIndex: -1,
            "aria-label": "Previous page",
            onClick: (e) => {
              goPrevPage();
              e.currentTarget.blur();
            },
            className: "absolute left-0 top-0 h-full w-1/3 cursor-w-resize bg-transparent outline-none focus:outline-none focus-visible:outline-none"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            tabIndex: -1,
            "aria-label": "Next page",
            onClick: (e) => {
              goNextPage();
              e.currentTarget.blur();
            },
            className: "absolute right-0 top-0 h-full w-1/3 cursor-e-resize bg-transparent outline-none focus:outline-none focus-visible:outline-none"
          }
        )
      ] }) : null
    ] }) }),
    total > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pointer-events-none fixed inset-x-0 bottom-0 z-30", children: [
      settings.showProgressBar ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1 w-full bg-white/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full bg-primary transition-all", style: { width: `${progressPct}%` } }) }) : null,
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center py-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "pointer-events-auto rounded-full bg-black/60 px-3 py-1 text-xs font-semibold text-white backdrop-blur", children: progressLabel }) })
    ] }) : null
  ] });
}
export {
  CustomReadPage as default
};
