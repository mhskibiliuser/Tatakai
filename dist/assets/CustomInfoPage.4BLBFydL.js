import { e as useNavigate, i as useParams, r as reactExports, j as jsxRuntimeExports } from "./react-vendor.CAo4XUiA.js";
import { D as useIsNativeApp, s as useIsMobile, f4 as useCustomSource, f7 as useCustomInfo, a as isCapacitor, dr as registerMobileSource, l as getProxiedImageUrl, Q as Background, S as Sidebar, G as GlassPanel, R as ExtensionSlot, j as cn } from "./index.C6yfkT5T.js";
import { M as MobileNav } from "./MobileNav.ABHzkhTQ.js";
import { u as ArrowLeft, Q as LoaderCircle, B as BookOpen, aJ as Play } from "./icons.C2gBBarQ.js";
import "./vendor.CJyRs4QS.js";
import "./tanstack.DPr3OB19.js";
import "./supabase.WuRMX5Dg.js";
import "./radix.BiK9uYXL.js";
import "./motion.DVGLRFCH.js";
import "./hls.BlgtCWcq.js";
import "./editor.Dxw8dtyw.js";
import "./charts.Dr1fgDJ-.js";
function CustomInfoPage() {
  const navigate = useNavigate();
  const isNative = useIsNativeApp();
  const isMobile = useIsMobile();
  const { namespace, sourceId, id } = useParams();
  const { source } = useCustomSource(namespace, sourceId);
  const { data: info, isLoading, isError } = useCustomInfo(namespace, sourceId, id);
  const kind = (source == null ? void 0 : source.kind) === "read" ? "read" : "watch";
  const base = `/x/${namespace}/${sourceId}`;
  const entries = (info == null ? void 0 : info.entries) ?? [];
  const meta = (info == null ? void 0 : info.meta) ?? {};
  const imageUrl = reactExports.useMemo(() => {
    const image = String((info == null ? void 0 : info.image) || "");
    if (!image) return "";
    return isCapacitor() && /^https?:/i.test(image) ? registerMobileSource({ url: image }) : getProxiedImageUrl(image);
  }, [info == null ? void 0 : info.image]);
  const openEntry = (entryId) => navigate(`${base}/${kind}/${encodeURIComponent(id || "")}/${encodeURIComponent(entryId)}`);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen overflow-x-hidden bg-background text-foreground", children: [
    !isNative && /* @__PURE__ */ jsxRuntimeExports.jsx(Background, {}),
    !isMobile && /* @__PURE__ */ jsxRuntimeExports.jsx(Sidebar, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "main",
      {
        className: cn(
          "relative z-10 mx-auto max-w-[1400px] py-6 pr-6 pb-24 md:pb-6",
          isNative ? "pl-6" : "pl-6 md:pl-32"
        ),
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              onClick: () => navigate(base),
              className: "mb-4 inline-flex min-h-[44px] items-center gap-1.5 rounded-xl border border-white/15 px-3 py-2 text-sm font-semibold hover:bg-white/10 active:scale-95",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" }),
                " ",
                (source == null ? void 0 : source.name) || "Back"
              ]
            }
          ),
          isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-2 py-24 text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-5 w-5 animate-spin" }),
            " Loading…"
          ] }) : !info || isError ? /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassPanel, { className: "mx-auto max-w-xl border border-white/10 p-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold", children: "Unable to load this title" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-muted-foreground", children: "The source returned no info. Check that the extension is running and try again." })
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-6 md:flex-row", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-40 flex-shrink-0 md:w-56", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-[2/3] overflow-hidden rounded-2xl border border-white/10 bg-white/5", children: info.image ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: imageUrl,
                  alt: info.title,
                  className: "h-full w-full object-cover",
                  loading: "eager",
                  decoding: "async"
                }
              ) : null }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-black tracking-tight md:text-4xl", children: info.title }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(ExtensionSlot, { slotId: "custom-info-after-title", props: { namespace, sourceId, id, kind, info } }),
                Object.keys(meta).length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 flex flex-wrap gap-2", children: Object.entries(meta).map(([k, v]) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "span",
                  {
                    className: "rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs font-semibold text-muted-foreground",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-foreground/70", children: [
                        k,
                        ":"
                      ] }),
                      " ",
                      String(v)
                    ]
                  },
                  k
                )) }) : null,
                info.description ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 max-w-3xl whitespace-pre-line text-sm leading-relaxed text-muted-foreground", children: info.description }) : null,
                entries.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    onClick: () => openEntry(entries[0].id),
                    className: "mt-5 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground hover:bg-primary/85",
                    children: [
                      kind === "read" ? /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-4 w-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "h-4 w-4 fill-current" }),
                      kind === "read" ? "Start reading" : "Start watching"
                    ]
                  }
                ) : null
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mt-10", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "mb-4 font-display text-xl font-semibold tracking-tight", children: [
                kind === "read" ? "Chapters" : "Episodes",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground", children: [
                  "(",
                  entries.length,
                  ")"
                ] })
              ] }),
              entries.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3", children: entries.map((entry) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  onClick: () => openEntry(entry.id),
                  className: "flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-left transition-colors hover:border-primary/40 hover:bg-white/10",
                  children: [
                    entry.number != null ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-primary/15 text-sm font-bold text-primary", children: entry.number }) : null,
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "min-w-0 flex-1 truncate text-sm font-semibold", children: entry.label }),
                    kind === "read" ? /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-4 w-4 flex-shrink-0 text-muted-foreground" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "h-4 w-4 flex-shrink-0 text-muted-foreground" })
                  ]
                },
                entry.id
              )) }) : /* @__PURE__ */ jsxRuntimeExports.jsx(GlassPanel, { className: "border border-white/10 p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No entries available for this title." }) })
            ] })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(MobileNav, {})
  ] });
}
export {
  CustomInfoPage as default
};
