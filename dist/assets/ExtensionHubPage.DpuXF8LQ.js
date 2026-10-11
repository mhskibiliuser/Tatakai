import { r as reactExports, j as jsxRuntimeExports, L as Link } from "./react-vendor.CAo4XUiA.js";
import { D as useIsNativeApp, K as useIsDesktopApp, bE as isIOS, bF as useStoreCatalogue, bG as useExtensionInstaller, Q as Background, az as Input, B as Button, bH as EXTENSION_PORTAL_URL, bI as ExtensionTile, bJ as ExtensionHeroCard, bK as ExtensionPromoTile, bL as formatCompact, j as cn, bM as SideloadExtensionModal, bN as StoreShelf, bO as ExtensionRow } from "./index.C6yfkT5T.js";
import { P as PillGroup } from "./PillGroup.CcXbIR07.js";
import { S as SectionHeading } from "./SectionHeading.D7LOUoID.js";
import { u as ArrowLeft, S as Search, X, ba as FolderUp, aa as Upload, j as ExternalLink, T as TriangleAlert, ag as ShieldCheck, aS as Puzzle } from "./icons.C2gBBarQ.js";
import "./vendor.CJyRs4QS.js";
import "./tanstack.DPr3OB19.js";
import "./supabase.WuRMX5Dg.js";
import "./radix.BiK9uYXL.js";
import "./motion.DVGLRFCH.js";
import "./hls.BlgtCWcq.js";
import "./editor.Dxw8dtyw.js";
import "./charts.Dr1fgDJ-.js";
const TYPE_FILTERS = [
  { id: "all", label: "All" },
  { id: "onlinestream", label: "Streaming" },
  { id: "torrent", label: "Torrent" },
  { id: "custom", label: "Utilities" }
];
const SHELF_PAGE_SIZE = 4;
function chunk(items, size) {
  const pages = [];
  for (let index = 0; index < items.length; index += size) {
    pages.push(items.slice(index, index + size));
  }
  return pages;
}
function RowShelf({
  title,
  eyebrow,
  items,
  ranked = false,
  installer,
  onInstall
}) {
  if (items.length === 0) return null;
  const pages = chunk(items, SHELF_PAGE_SIZE);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(StoreShelf, { title, eyebrow, scrollable: pages.length > 1, children: pages.map((page, pageIndex) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: cn(
        "shrink-0 snap-start rounded-[1.25rem] border border-white/[0.07] bg-white/[0.02] p-2",
        pages.length > 1 ? "w-[min(100%,30rem)]" : "w-full"
      ),
      children: page.map((extension, rowIndex) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        ExtensionRow,
        {
          extension,
          state: installer.stateFor(extension),
          onInstall: () => onInstall(extension),
          rank: ranked ? pageIndex * SHELF_PAGE_SIZE + rowIndex + 1 : void 0
        },
        extension.id
      ))
    },
    pageIndex
  )) });
}
function TileSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-[11.5rem] animate-pulse rounded-[1.25rem] border border-white/[0.07] bg-white/[0.03]" });
}
function ExtensionHubPage() {
  const isNative = useIsNativeApp();
  const isDesktopApp = useIsDesktopApp();
  const isIos = isIOS();
  const [search, setSearch] = reactExports.useState("");
  const [type, setType] = reactExports.useState("all");
  const [sideloadOpen, setSideloadOpen] = reactExports.useState(false);
  const catalogue = useStoreCatalogue({ search, type });
  const installer = useExtensionInstaller();
  const typeFilters = isIos ? TYPE_FILTERS.filter((option) => option.id !== "torrent") : TYPE_FILTERS;
  const visibleItems = reactExports.useMemo(
    () => isIos ? catalogue.items.filter((item) => item.type !== "torrent") : catalogue.items,
    [catalogue.items, isIos]
  );
  const visibleFeatured = reactExports.useMemo(
    () => isIos ? catalogue.featured.filter((item) => item.type !== "torrent") : catalogue.featured,
    [catalogue.featured, isIos]
  );
  const isSearching = search.trim().length > 0;
  const handleInstall = (extension) => installer.toggle(extension);
  const { spotlight, promos, streaming, torrent, utilities, installed } = reactExports.useMemo(() => {
    const items = visibleItems;
    const featured = visibleFeatured;
    return {
      spotlight: featured[0],
      promos: featured.slice(1, 3),
      streaming: items.filter((item) => item.type === "onlinestream"),
      torrent: items.filter((item) => item.type === "torrent"),
      utilities: items.filter((item) => item.type === "custom"),
      installed: items.filter((item) => installer.isInstalled(item))
    };
  }, [visibleItems, visibleFeatured, installer]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative min-h-screen", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Background, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: cn(
          "relative z-10 mx-auto max-w-[1800px] px-4 py-6 pb-24 sm:px-6 md:pb-6",
          isDesktopApp ? "md:pl-6" : "md:pl-32"
        ),
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Link,
            {
              to: "/",
              "aria-label": "Back to home",
              className: "mb-4 inline-flex min-h-[44px] items-center gap-1.5 rounded-xl border border-white/15 px-3 py-2 text-sm font-semibold active:scale-95 hover:bg-white/10",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" }),
                " Home"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "flex flex-wrap items-end justify-between gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] font-bold uppercase tracking-[0.28em] text-primary", children: "Tatakai store" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display mt-1.5 text-3xl font-black tracking-tight text-foreground sm:text-4xl", children: "Extensions" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-2 max-w-2xl text-sm text-white/50", children: [
                isIos ? "Streaming sources and utilities that plug into the player." : "Streaming sources, torrent providers and utilities that plug into the player.",
                visibleItems.length > 0 ? ` ${visibleItems.length} available.` : ""
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/35" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    value: search,
                    onChange: (event) => setSearch(event.target.value),
                    placeholder: "Search extensions",
                    className: "h-10 w-full rounded-full border-white/10 bg-white/[0.04] pl-9 pr-9 text-sm sm:w-72"
                  }
                ),
                isSearching ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => setSearch(""),
                    "aria-label": "Clear search",
                    className: "absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" })
                  }
                ) : null
              ] }),
              isNative ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  variant: "outline",
                  onClick: () => setSideloadOpen(true),
                  className: "h-10 gap-2 rounded-full border-white/10 bg-white/[0.04]",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(FolderUp, { className: "h-4 w-4" }),
                    "Sideload"
                  ]
                }
              ) : null,
              /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, className: "h-10 gap-2 rounded-full", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "a",
                {
                  href: EXTENSION_PORTAL_URL,
                  target: "_blank",
                  rel: "noreferrer noopener",
                  title: "Publish an extension on extension.tatakai.me",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "h-4 w-4" }),
                    "Publish",
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "h-3.5 w-3.5 opacity-70" })
                  ]
                }
              ) })
            ] })
          ] }),
          catalogue.serviceError || !catalogue.isServiceConfigured ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex items-start gap-3 rounded-2xl border border-amber/25 bg-amber/10 p-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "mt-0.5 h-4 w-4 shrink-0 text-amber" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-amber", children: catalogue.isServiceConfigured ? "Extension service unreachable" : "Extension service not configured" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-0.5 text-white/55", children: catalogue.isServiceConfigured ? "Showing sideloaded extensions only. The catalogue will fill in once the service responds." : "Set VITE_EXTENSION_API_URL to browse the published catalogue. Sideloaded extensions still work." })
            ] })
          ] }) : null,
          !isNative ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex items-start gap-3 rounded-2xl border border-white/[0.07] bg-white/[0.02] p-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "mt-0.5 h-4 w-4 shrink-0 text-primary" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-white/85", children: "Browsing on the web" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-0.5 text-white/55", children: "Extensions run inside the desktop app's sandbox. You can browse and install here, but nothing loads until you open Tatakai on desktop." })
            ] })
          ] }) : null,
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            PillGroup,
            {
              options: typeFilters,
              value: type,
              onChange: (next) => setType(next),
              label: "Extension type"
            }
          ) }),
          catalogue.isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4", children: Array.from({ length: 8 }).map((_, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(TileSkeleton, {}, index)) }) : visibleItems.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 rounded-3xl border border-white/[0.07] bg-white/[0.02] py-24 text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Puzzle, { className: "mx-auto h-10 w-10 text-white/20" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 font-bold text-white/80", children: isSearching ? `Nothing matches “${search.trim()}”` : "No extensions yet" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-white/45", children: isSearching ? "Try a shorter search, or clear it to browse everything." : "Published extensions will appear here." })
          ] }) : isSearching ? /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mt-8 space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              SectionHeading,
              {
                title: "Search results",
                meta: `${visibleItems.length} ${visibleItems.length === 1 ? "match" : "matches"}`
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4", children: visibleItems.map((extension) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              ExtensionTile,
              {
                extension,
                state: installer.stateFor(extension),
                onInstall: () => handleInstall(extension)
              },
              extension.id
            )) })
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 space-y-12", children: [
            spotlight ? /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "grid gap-4 lg:grid-cols-[1.65fr_1fr]", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                ExtensionHeroCard,
                {
                  extension: spotlight,
                  state: installer.stateFor(spotlight),
                  onInstall: () => handleInstall(spotlight)
                }
              ),
              promos.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-4", children: promos.map((extension) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                ExtensionPromoTile,
                {
                  extension,
                  state: installer.stateFor(extension),
                  onInstall: () => handleInstall(extension)
                },
                extension.id
              )) }) : null
            ] }) : null,
            installed.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
              RowShelf,
              {
                title: "Your library",
                eyebrow: "Installed",
                items: installed,
                installer,
                onInstall: handleInstall
              }
            ) : null,
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              RowShelf,
              {
                title: "Trending streaming sources",
                eyebrow: "Most installed",
                items: streaming,
                ranked: true,
                installer,
                onInstall: handleInstall
              }
            ),
            !isIos ? /* @__PURE__ */ jsxRuntimeExports.jsx(
              RowShelf,
              {
                title: "Torrent providers",
                eyebrow: "Discovery",
                items: torrent,
                ranked: true,
                installer,
                onInstall: handleInstall
              }
            ) : null,
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              RowShelf,
              {
                title: "Utilities",
                eyebrow: "Everything else",
                items: utilities,
                installer,
                onInstall: handleInstall
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "space-y-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                SectionHeading,
                {
                  eyebrow: "Catalogue",
                  title: "All extensions",
                  meta: `${visibleItems.length} total · ${formatCompact(
                    visibleItems.reduce((sum, item) => sum + item.installs + item.downloads, 0)
                  )} installs`
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4", children: visibleItems.map((extension) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                ExtensionTile,
                {
                  extension,
                  state: installer.stateFor(extension),
                  onInstall: () => handleInstall(extension)
                },
                extension.id
              )) })
            ] })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SideloadExtensionModal, { isOpen: sideloadOpen, onClose: () => setSideloadOpen(false) })
  ] });
}
export {
  ExtensionHubPage as default
};
