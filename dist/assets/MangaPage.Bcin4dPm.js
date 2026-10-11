const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/mobileMangaDownloader.MFTcbmks.js","assets/vendor.CJyRs4QS.js","assets/react-vendor.CAo4XUiA.js","assets/index.C6yfkT5T.js","assets/tanstack.DPr3OB19.js","assets/supabase.WuRMX5Dg.js","assets/radix.BiK9uYXL.js","assets/icons.C2gBBarQ.js","assets/motion.DVGLRFCH.js","assets/hls.BlgtCWcq.js","assets/editor.Dxw8dtyw.js","assets/charts.Dr1fgDJ-.js","assets/index.CWbmAlRn.css"])))=>i.map(i=>d[i]);
import { r as reactExports, j as jsxRuntimeExports, a as reactDomExports, i as useParams, e as useNavigate } from "./react-vendor.CAo4XUiA.js";
import { a as useQuery } from "./tanstack.DPr3OB19.js";
import { K as useIsDesktopApp, U as useIsMobileApp, dB as isEnabled, am as FeatureFlag, eC as useMangaDownloadStates, eD as mangaJobId, eE as rememberMangaJobMeta, eF as markMangaQueued, eG as markMangaFailedStart, eH as markMangaCancelled, G as GlassPanel, B as Button, T as triggerHaptic, az as Input, aC as ScrollArea, bA as Badge, j as cn, D as useIsNativeApp, s as useIsMobile, u as useAuth, ap as useContentSafetySettings, eI as useMangaDetail, eJ as useMangaChapters, eK as useMangaBakaSeries, eL as useMangaKitsuHierarchy, eM as useMangaReadlistItem, eN as useUpsertMangaReadlist, eO as useRemoveFromMangaReadlist, l as getProxiedImageUrl, eP as setViewingMangaRpc, cG as clearDiscordRpc, Q as Background, S as Sidebar, Y as DropdownMenu, Z as DropdownMenuTrigger, _ as DropdownMenuContent, $ as DropdownMenuItem, a0 as DropdownMenuSeparator, bg as UnifiedMediaCard, eQ as Comments, eR as classifyReadingFormat, ab as resolveApiV3Base, eB as searchManga, ar as inferMangaAdultFlag } from "./index.C6yfkT5T.js";
import { u as useAniListRecommendations, A as AdultWarningGate, C as ContentEditSheet } from "./AdultWarningGate.C2tw42bQ.js";
import { u as useMangaRecommendationEngine } from "./useMangaRecommendationEngine.DdiaumGd.js";
import { M as MobileNav } from "./MobileNav.ABHzkhTQ.js";
import { S as Skeleton } from "./skeleton-custom.3olGZrgu.js";
import { A as AddToPlaylistButton } from "./AddToPlaylistButton.DNrDvuI4.js";
import { b9 as __vitePreload, bf as ue, bH as Helmet } from "./vendor.CJyRs4QS.js";
import { D as Download, X, a as CircleAlert, B as BookOpen, Y as FolderOpen, v as ArrowRight, aG as ChevronLeft, C as CircleCheck, d as Circle, c8 as Server, a$ as Languages, Q as LoaderCircle, aJ as Play, u as ArrowLeft, bi as Database, aR as Pencil, aI as Star, aA as Layers, U as Users, cf as Tag, cF as BookmarkPlus, cQ as BookmarkCheck, N as ChevronDown, k as Sparkles, a4 as Palette, cR as GitGraph, S as Search } from "./icons.C2gBBarQ.js";
import { s as sortMangaChapterSources } from "./mangaSourceSelection.CDjYicHn.js";
import { fetchExtensionMangaChapters, mergeChaptersWithExtensions } from "./manga-extension-runtime.DnG346KM.js";
import "./supabase.WuRMX5Dg.js";
import "./radix.BiK9uYXL.js";
import "./motion.DVGLRFCH.js";
import "./hls.BlgtCWcq.js";
import "./editor.Dxw8dtyw.js";
import "./charts.Dr1fgDJ-.js";
import "./tasteProfile.DMW7D2B1.js";
function useMangaDownload() {
  var _a, _b;
  const isDesktop = useIsDesktopApp();
  const isMobileApp = useIsMobileApp();
  const featureEnabled = isEnabled(FeatureFlag.MANGA_DOWNLOAD);
  const downloadStates = useMangaDownloadStates();
  const bridgeReady = typeof window !== "undefined" && !!((_b = (_a = window.electron) == null ? void 0 : _a.manga) == null ? void 0 : _b.enqueueChapter) || isMobileApp;
  const resolveDownloadPath = reactExports.useCallback(
    (explicit) => explicit || typeof localStorage !== "undefined" && localStorage.getItem("tatakai_download_path") || void 0,
    []
  );
  const optimisticQueue = reactExports.useCallback((series, chapter) => {
    const jobId = mangaJobId(series.anilistId, chapter.chapterKey);
    const numLabel = chapter.chapterNumber != null ? `Ch. ${chapter.chapterNumber}` : "Chapter";
    const chapterLabel = `${chapter.volume != null ? `Vol ${chapter.volume} · ` : ""}${numLabel}`;
    rememberMangaJobMeta(jobId, {
      title: series.title,
      posterUrl: series.posterUrl ?? null,
      chapterNumber: chapter.chapterNumber ?? null,
      volume: chapter.volume ?? null,
      provider: chapter.provider ?? null
    });
    markMangaQueued(jobId, {
      anilistId: series.anilistId,
      chapterKey: chapter.chapterKey,
      title: series.title,
      posterUrl: series.posterUrl ?? null,
      kind: series.kind ?? "manga",
      chapterLabel
    });
    return jobId;
  }, []);
  const enqueueChapter = reactExports.useCallback(
    async (series, chapter) => {
      var _a2, _b2, _c, _d;
      if (!featureEnabled) {
        console.warn("[MangaDL] enqueueChapter blocked — feature flag MANGA_DOWNLOAD disabled");
        return { ok: false, reason: "feature_disabled" };
      }
      if (isMobileApp) {
        const jobId2 = optimisticQueue(series, chapter);
        const { downloadMangaChapterMobile } = await __vitePreload(async () => {
          const { downloadMangaChapterMobile: downloadMangaChapterMobile2 } = await import("./mobileMangaDownloader.MFTcbmks.js");
          return { downloadMangaChapterMobile: downloadMangaChapterMobile2 };
        }, true ? __vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12]) : void 0);
        void downloadMangaChapterMobile(series, chapter);
        return { ok: true, jobId: jobId2 };
      }
      if (!isDesktop || !((_b2 = (_a2 = window.electron) == null ? void 0 : _a2.manga) == null ? void 0 : _b2.enqueueChapter)) {
        console.warn("[MangaDL] enqueueChapter blocked — not desktop or bridge missing", { isDesktop, hasBridge: !!((_d = (_c = window.electron) == null ? void 0 : _c.manga) == null ? void 0 : _d.enqueueChapter) });
        return { ok: false, reason: "not_desktop" };
      }
      const downloadPath = resolveDownloadPath(series.downloadPath);
      const jobId = optimisticQueue(series, chapter);
      console.log("[MangaDL] enqueueChapter →", { jobId, provider: chapter.provider, chapterKey: chapter.chapterKey, downloadPath });
      const res = await window.electron.manga.enqueueChapter({ ...series, downloadPath, chapter });
      console.log("[MangaDL] enqueueChapter IPC response", res);
      if (!(res == null ? void 0 : res.success)) {
        markMangaFailedStart(jobId, typeof (res == null ? void 0 : res.error) === "string" ? res.error : "start_failed");
        return { ok: false, reason: "ipc_error", error: res == null ? void 0 : res.error };
      }
      return { ok: true, jobId };
    },
    [isDesktop, isMobileApp, featureEnabled, resolveDownloadPath, optimisticQueue]
  );
  const enqueueAll = reactExports.useCallback(
    async (series, chapters) => {
      var _a2, _b2, _c, _d;
      if (!featureEnabled) {
        console.warn("[MangaDL] enqueueAll blocked — feature flag MANGA_DOWNLOAD disabled");
        return { ok: false, reason: "feature_disabled" };
      }
      if (!chapters.length) return { ok: false, reason: "empty" };
      if (isMobileApp) {
        for (const chapter of chapters) optimisticQueue(series, chapter);
        const { downloadMangaChaptersMobile } = await __vitePreload(async () => {
          const { downloadMangaChaptersMobile: downloadMangaChaptersMobile2 } = await import("./mobileMangaDownloader.MFTcbmks.js");
          return { downloadMangaChaptersMobile: downloadMangaChaptersMobile2 };
        }, true ? __vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12]) : void 0);
        void downloadMangaChaptersMobile(series, chapters);
        return { ok: true, queued: chapters.length };
      }
      if (!isDesktop || !((_b2 = (_a2 = window.electron) == null ? void 0 : _a2.manga) == null ? void 0 : _b2.enqueueAll)) {
        console.warn("[MangaDL] enqueueAll blocked — not desktop or bridge missing", { isDesktop, hasBridge: !!((_d = (_c = window.electron) == null ? void 0 : _c.manga) == null ? void 0 : _d.enqueueAll) });
        return { ok: false, reason: "not_desktop" };
      }
      const downloadPath = resolveDownloadPath(series.downloadPath);
      for (const chapter of chapters) optimisticQueue(series, chapter);
      console.log("[MangaDL] enqueueAll →", { anilistId: series.anilistId, title: series.title, count: chapters.length, downloadPath });
      const res = await window.electron.manga.enqueueAll({ ...series, downloadPath, chapters });
      console.log("[MangaDL] enqueueAll IPC response", res);
      if (!(res == null ? void 0 : res.success)) {
        for (const chapter of chapters) {
          markMangaFailedStart(
            mangaJobId(series.anilistId, chapter.chapterKey),
            typeof (res == null ? void 0 : res.error) === "string" ? res.error : "start_failed"
          );
        }
        return { ok: false, reason: "ipc_error", error: res == null ? void 0 : res.error };
      }
      return { ok: true, queued: res.queued };
    },
    [isDesktop, isMobileApp, featureEnabled, resolveDownloadPath, optimisticQueue]
  );
  const cancelChapter = reactExports.useCallback(async (anilistId, chapterKey) => {
    var _a2, _b2;
    const jobId = mangaJobId(anilistId, chapterKey);
    if (isMobileApp) {
      const { cancelMangaChapterMobile } = await __vitePreload(async () => {
        const { cancelMangaChapterMobile: cancelMangaChapterMobile2 } = await import("./mobileMangaDownloader.MFTcbmks.js");
        return { cancelMangaChapterMobile: cancelMangaChapterMobile2 };
      }, true ? __vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12]) : void 0);
      cancelMangaChapterMobile(anilistId, chapterKey);
      markMangaCancelled(jobId);
      return;
    }
    if ((_b2 = (_a2 = window.electron) == null ? void 0 : _a2.manga) == null ? void 0 : _b2.cancel) await window.electron.manga.cancel({ jobId });
    markMangaCancelled(jobId);
  }, [isMobileApp]);
  return reactExports.useMemo(
    () => ({
      isEnabled: (isMobileApp || isDesktop) && featureEnabled && bridgeReady,
      downloadStates,
      enqueueChapter,
      enqueueAll,
      cancelChapter
    }),
    [isDesktop, isMobileApp, featureEnabled, bridgeReady, downloadStates, enqueueChapter, enqueueAll, cancelChapter]
  );
}
const MANGA_PROVIDER_RELIABILITY = [
  "mangadex",
  "mangapill",
  "mangakatana",
  "weebcentral",
  "nelomanga",
  "comick",
  "atsu",
  "webtoons",
  "demonicscans"
];
function reliabilityRank(provider) {
  const idx = MANGA_PROVIDER_RELIABILITY.indexOf(String(provider || "").toLowerCase());
  return idx === -1 ? MANGA_PROVIDER_RELIABILITY.length : idx;
}
function sortedSources(chapter) {
  return [...chapter.sources || []].sort(
    (a, b) => reliabilityRank(a.provider) - reliabilityRank(b.provider)
  );
}
const MangaDownloadModal = ({
  isOpen,
  onClose,
  chapters,
  anilistId,
  title,
  posterUrl,
  kind
}) => {
  const { isEnabled: isEnabled2, downloadStates, enqueueAll } = useMangaDownload();
  const [step, setStep] = reactExports.useState("series");
  const [selected, setSelected] = reactExports.useState(/* @__PURE__ */ new Set());
  const [preferredLanguage, setPreferredLanguage] = reactExports.useState("auto");
  const [preferredSourceKey, setPreferredSourceKey] = reactExports.useState("auto");
  const [isStarting, setIsStarting] = reactExports.useState(false);
  const [rangeFrom, setRangeFrom] = reactExports.useState("");
  const [rangeTo, setRangeTo] = reactExports.useState("");
  const [downloadPath, setDownloadPath] = reactExports.useState("");
  reactExports.useEffect(() => {
    if (!isOpen) return;
    const saved = typeof localStorage !== "undefined" ? localStorage.getItem("tatakai_download_path") : "";
    setDownloadPath(saved || "");
    setStep("series");
  }, [isOpen]);
  const rows = reactExports.useMemo(() => {
    const ordered = [...chapters].sort((a, b) => a.canonicalOrder - b.canonicalOrder);
    const out = [];
    for (const ch of ordered) {
      const srcs = sortedSources(ch);
      if (!srcs.length) continue;
      const [best, ...rest] = srcs;
      const numLabel = ch.chapterNumber != null ? `Ch. ${ch.chapterNumber}` : "Chapter";
      const volLabel = ch.volume != null ? `Vol ${ch.volume} · ` : "";
      out.push({
        key: best.chapterKey,
        jobId: mangaJobId(anilistId, best.chapterKey),
        label: `${volLabel}${numLabel}`,
        subtitle: ch.chapterTitle || void 0,
        chapterNumber: ch.chapterNumber,
        payload: {
          chapterKey: best.chapterKey,
          provider: best.provider,
          providerChapterId: best.providerChapterId,
          chapterNumber: ch.chapterNumber,
          volume: ch.volume,
          language: best.language ?? void 0,
          scanlator: best.scanlator ?? void 0,
          alternatives: rest.map((s) => ({
            provider: s.provider,
            chapterKey: s.chapterKey,
            providerChapterId: s.providerChapterId,
            language: s.language ?? void 0,
            scanlator: s.scanlator ?? void 0
          }))
        }
      });
    }
    return out;
  }, [chapters, anilistId]);
  const languageOptions = reactExports.useMemo(() => {
    const m = /* @__PURE__ */ new Map();
    const count = (lang) => {
      const v = String(lang || "").trim();
      if (v) m.set(v, (m.get(v) || 0) + 1);
    };
    for (const r of rows) {
      const seen = /* @__PURE__ */ new Set();
      const langs = [
        r.payload.language,
        ...(r.payload.alternatives || []).map((a) => a.language)
      ];
      for (const l of langs) {
        const v = String(l || "").trim();
        if (v && !seen.has(v.toLowerCase())) {
          seen.add(v.toLowerCase());
          count(v);
        }
      }
    }
    return Array.from(m, ([language, chapters2]) => ({ language, chapters: chapters2 })).sort((a, b) => b.chapters - a.chapters);
  }, [rows]);
  const sourceOptions = reactExports.useMemo(() => {
    const names = /* @__PURE__ */ new Map();
    const counts = /* @__PURE__ */ new Map();
    for (const r of rows) {
      const keys = /* @__PURE__ */ new Set();
      const collect = (provider, scanlator) => {
        if (!provider) return;
        const key = `${provider}|||${scanlator || ""}`;
        if (!names.has(key)) names.set(key, { provider, scanlator: scanlator || null });
        keys.add(key);
      };
      collect(r.payload.provider, r.payload.scanlator);
      for (const a of r.payload.alternatives || []) collect(a.provider, a.scanlator);
      for (const k of keys) counts.set(k, (counts.get(k) || 0) + 1);
    }
    return Array.from(names, ([key, v]) => ({ key, ...v, count: counts.get(key) || 0 })).sort((a, b) => b.count - a.count);
  }, [rows]);
  const toggle = (key) => {
    void triggerHaptic("select");
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };
  const selectAll = () => {
    void triggerHaptic("select");
    setSelected((prev) => prev.size === rows.length ? /* @__PURE__ */ new Set() : new Set(rows.map((r) => r.key)));
  };
  const applyRange = () => {
    const from = parseFloat(rangeFrom);
    const to = parseFloat(rangeTo);
    if (!Number.isFinite(from) && !Number.isFinite(to)) return;
    void triggerHaptic("select");
    const lo = Number.isFinite(from) ? from : -Infinity;
    const hi = Number.isFinite(to) ? to : Infinity;
    setSelected((prev) => {
      const next = new Set(prev);
      for (const r of rows) {
        if (r.chapterNumber != null && r.chapterNumber >= lo && r.chapterNumber <= hi) next.add(r.key);
      }
      return next;
    });
  };
  const handleDownload = async () => {
    const picked = rows.filter((r) => selected.has(r.key));
    if (!picked.length) return;
    void triggerHaptic("medium");
    setIsStarting(true);
    try {
      const sourceKeyOf = (provider, scanlator) => provider ? `${provider}|||${scanlator || ""}` : "";
      const payloads = picked.map((r) => {
        const all = [
          {
            provider: r.payload.provider,
            chapterKey: r.payload.chapterKey,
            providerChapterId: r.payload.providerChapterId,
            language: r.payload.language,
            scanlator: r.payload.scanlator ?? void 0
          },
          ...(r.payload.alternatives || []).map((a) => ({ ...a }))
        ];
        let pool = all;
        if (preferredLanguage !== "auto") {
          const match = all.filter(
            (s) => String(s.language || "").toLowerCase() === preferredLanguage.toLowerCase()
          );
          if (match.length) pool = match;
        }
        let idx = 0;
        if (preferredSourceKey !== "auto") {
          const found = pool.findIndex((s) => sourceKeyOf(s.provider, s.scanlator ?? void 0) === preferredSourceKey);
          if (found > 0) idx = found;
        }
        if (idx === 0 && pool === all && preferredLanguage === "auto" && preferredSourceKey === "auto") {
          return r.payload;
        }
        const primary = pool[idx];
        const rest = [...pool.slice(0, idx), ...pool.slice(idx + 1)];
        for (const s of all) {
          if (!rest.some((x) => x.provider === s.provider && x.chapterKey === s.chapterKey) && !(primary.provider === s.provider && primary.chapterKey === s.chapterKey)) {
            rest.push(s);
          }
        }
        return {
          ...r.payload,
          provider: primary.provider,
          chapterKey: primary.chapterKey,
          providerChapterId: primary.providerChapterId,
          language: primary.language,
          scanlator: primary.scanlator ?? void 0,
          alternatives: rest
        };
      });
      const res = await enqueueAll(
        { anilistId, title, posterUrl, kind, downloadPath: downloadPath || void 0 },
        payloads
      );
      if (res.ok) {
        void triggerHaptic("success");
        ue.success(`Queued ${picked.length} chapter${picked.length > 1 ? "s" : ""} for download`);
      } else if (res.reason === "not_desktop") {
        ue.error("Manga downloads require the Tatakai desktop app");
      } else if (res.reason === "feature_disabled") {
        ue.error("Manga downloads are disabled");
      } else {
        void triggerHaptic("error");
        ue.error("Failed to queue downloads", {
          description: typeof res.error === "string" ? res.error : void 0
        });
      }
    } finally {
      setIsStarting(false);
    }
  };
  if (!isOpen) return null;
  const sheet = /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed z-[100] flex items-end sm:items-center justify-center bg-black/80 backdrop-blur-sm animate-in fade-in inset-0 sm:p-4 p-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full sm:max-w-2xl max-h-[92dvh] sm:max-h-[90vh] overflow-hidden flex flex-col", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassPanel, { className: "p-4 sm:p-6 space-y-4 sm:space-y-5 max-h-[92dvh] sm:max-h-[90vh] overflow-y-auto overscroll-contain rounded-t-3xl sm:rounded-2xl rounded-b-none sm:rounded-b-2xl pb-[max(1rem,env(safe-area-inset-bottom))]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-xl sm:text-2xl font-bold flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-5 h-5 sm:w-6 sm:h-6 text-primary" }),
        "Download chapters"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onClose, className: "p-2 rounded-full hover:bg-white/10 transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-5 h-5" }) })
    ] }),
    !isEnabled2 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 rounded-xl bg-amber-500/10 border border-amber-500/30 p-3 text-xs text-amber-200", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-4 h-4 flex-shrink-0" }),
      "Manga downloads require the Tatakai native app."
    ] }),
    rows.length === 0 ? null : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2 px-0.5", "aria-label": "Download steps", children: ["series", "chapters", "server"].map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
      i > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-px w-6 bg-white/15" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          disabled: s !== "series" && step === "series",
          onClick: () => {
            if (s === "series") setStep("series");
            else if (s === "chapters" && step === "server") setStep("chapters");
          },
          className: `flex items-center gap-1.5 text-[11px] font-semibold ${step === s ? "text-primary" : "text-muted-foreground"}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `flex h-5 w-5 items-center justify-center rounded-full text-[10px] ${step === s ? "bg-primary text-white" : "bg-white/10"}`, children: i + 1 }),
            s === "series" ? "Series" : s === "chapters" ? "Chapters" : "Server"
          ]
        }
      )
    ] }, s)) }),
    step === "series" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-3", children: [
        posterUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: posterUrl, alt: `${title} poster`, className: "h-24 w-16 shrink-0 rounded-xl object-cover shadow-md", loading: "lazy" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex h-24 w-16 shrink-0 items-center justify-center rounded-xl bg-primary/15", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-7 w-7 text-primary" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate text-base font-bold", children: title }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-0.5 text-xs text-muted-foreground", children: [
            rows.length,
            " chapter",
            rows.length === 1 ? "" : "s",
            " available",
            kind ? ` · ${kind}` : ""
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1.5 flex items-center text-[11px] text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FolderOpen, { className: "mr-1 h-3 w-3 shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: downloadPath || "Default library folder" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "px-1 text-xs text-muted-foreground", children: "Pick the chapters to save for offline reading in the next step — each row shows its provider and language." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          onClick: () => {
            void triggerHaptic("tap");
            setStep("chapters");
          },
          disabled: rows.length === 0 || !isEnabled2,
          className: "w-full h-12 rounded-xl font-bold",
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center", children: [
            "Choose chapters ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "ml-2 h-4 w-4" })
          ] })
        }
      )
    ] }) : null,
    step === "chapters" && (rows.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center py-16 text-center space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-10 h-10 text-muted-foreground opacity-30" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "No downloadable chapters found." })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center px-0.5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "ghost", size: "sm", onClick: () => {
        void triggerHaptic("tap");
        setStep("series");
      }, className: "h-7 gap-1 px-2 text-xs text-muted-foreground hover:text-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "h-3.5 w-3.5" }),
        " Series"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-0.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: selected.size > 0 ? `${selected.size}/${rows.length} selected` : "Select chapters to download" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "sm", onClick: selectAll, className: "text-primary hover:text-primary/80 text-xs h-7 px-2", children: selected.size === rows.length ? "Deselect all" : "Select all" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end gap-2 rounded-xl bg-white/[0.03] border border-white/10 p-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[11px] text-muted-foreground block mb-1", children: "From ch." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              type: "number",
              inputMode: "decimal",
              value: rangeFrom,
              onChange: (e) => setRangeFrom(e.target.value),
              placeholder: "1",
              className: "h-9"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[11px] text-muted-foreground block mb-1", children: "To ch." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              type: "number",
              inputMode: "decimal",
              value: rangeTo,
              onChange: (e) => setRangeTo(e.target.value),
              placeholder: "20",
              className: "h-9"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", size: "sm", onClick: applyRange, className: "h-9", children: "Add range" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollArea, { className: "h-[38dvh] sm:h-[300px] min-h-[220px] rounded-xl border border-white/10 bg-white/[0.03]", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 gap-1.5 p-1.5", children: rows.map((r) => {
        var _a;
        const state = downloadStates[r.jobId];
        const isSelected = selected.has(r.key);
        const busy = (state == null ? void 0 : state.status) === "downloading" || (state == null ? void 0 : state.status) === "queued";
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            onClick: () => !busy && toggle(r.key),
            className: `flex items-center justify-between p-2 sm:p-2.5 rounded-lg border transition-colors cursor-pointer ${isSelected ? "bg-primary/10 border-primary/30" : "bg-white/[0.02] border-transparent hover:border-white/10"}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 sm:gap-3 min-w-0 flex-1", children: [
                isSelected ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Circle, { className: "w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground flex-shrink-0" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-sm sm:text-base", children: r.label }),
                  r.subtitle && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground block truncate max-w-[150px] sm:max-w-[300px]", children: r.subtitle }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "mt-1 flex flex-wrap items-center gap-1", children: [
                    r.payload.provider && /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "secondary", className: "gap-1 px-1.5 py-0 text-[10px] font-medium normal-case", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Server, { className: "h-2.5 w-2.5" }),
                      r.payload.provider
                    ] }),
                    r.payload.language && /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "outline", className: "gap-1 px-1.5 py-0 text-[10px] font-medium normal-case", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Languages, { className: "h-2.5 w-2.5" }),
                      r.payload.language
                    ] }),
                    (((_a = r.payload.alternatives) == null ? void 0 : _a.length) || 0) > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] text-muted-foreground", children: [
                      "+",
                      r.payload.alternatives.length,
                      " source",
                      r.payload.alternatives.length > 1 ? "s" : ""
                    ] })
                  ] })
                ] })
              ] }),
              state && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 sm:gap-4 flex-shrink-0", children: [
                state.status === "downloading" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] sm:text-xs font-mono text-primary", children: state.progress > 0 ? `${state.progress.toFixed(0)}%` : "..." }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 sm:w-20 h-1 bg-muted rounded-full overflow-hidden mt-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full bg-primary transition-[width] duration-300", style: { width: `${state.progress}%` } }) })
                ] }),
                state.status === "queued" && /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin text-muted-foreground" }),
                state.status === "completed" && /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4 sm:w-5 sm:h-5 text-green-500" }),
                (state.status === "failed" || state.status === "cancelled") && /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4 sm:w-5 sm:h-5 text-destructive" })
              ] })
            ]
          },
          r.key
        );
      }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center text-[10px] sm:text-xs text-muted-foreground px-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FolderOpen, { className: "w-3 h-3 flex-shrink-0 mr-1" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: downloadPath || "Default library folder" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          onClick: () => {
            void triggerHaptic("tap");
            setStep("server");
          },
          disabled: selected.size === 0 || !isEnabled2,
          className: "sticky bottom-[max(0px,env(safe-area-inset-bottom))] z-20 w-full h-14 sm:h-16 rounded-xl sm:rounded-2xl font-bold glow-primary flex-col gap-0.5 shadow-[0_-18px_36px_hsl(var(--background))]",
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center text-base sm:text-lg", children: [
            selected.size > 0 ? `Continue with ${selected.size} chapter${selected.size > 1 ? "s" : ""}` : "Select chapters",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "ml-2 h-5 w-5" })
          ] })
        }
      )
    ] })),
    step === "server" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center px-0.5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "ghost", size: "sm", onClick: () => {
        void triggerHaptic("tap");
        setStep("chapters");
      }, className: "h-7 gap-1 px-2 text-xs text-muted-foreground hover:text-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "h-3.5 w-3.5" }),
        " Chapters"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "px-0.5 text-xs font-semibold flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Languages, { className: "h-3.5 w-3.5 text-muted-foreground" }),
            " Language"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2 px-0.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => {
                  void triggerHaptic("select");
                  setPreferredLanguage("auto");
                },
                className: `px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${preferredLanguage === "auto" ? "bg-primary text-white border-primary" : "bg-white/5 border-white/10 hover:border-white/20"}`,
                children: "Auto"
              }
            ),
            languageOptions.map((o) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: () => {
                  void triggerHaptic("select");
                  setPreferredLanguage(o.language);
                },
                className: `px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${preferredLanguage === o.language ? "bg-primary text-white border-primary" : "bg-white/5 border-white/10 hover:border-white/20"}`,
                children: [
                  o.language,
                  " · ",
                  o.chapters
                ]
              },
              o.language
            ))
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "px-0.5 text-xs font-semibold flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Server, { className: "h-3.5 w-3.5 text-muted-foreground" }),
            " Scanlator / source"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "px-0.5 text-[11px] text-muted-foreground -mt-1", children: "Downloads try this source first and fall back automatically." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: () => {
                  void triggerHaptic("select");
                  setPreferredSourceKey("auto");
                },
                className: `flex items-center justify-between rounded-xl border p-2.5 text-left transition-colors ${preferredSourceKey === "auto" ? "bg-primary/10 border-primary/30" : "bg-white/[0.02] border-transparent hover:border-white/10"}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
                    preferredSourceKey === "auto" ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-4 w-4 text-primary flex-shrink-0" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Circle, { className: "h-4 w-4 text-muted-foreground flex-shrink-0" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold", children: "Auto" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] text-muted-foreground", children: "Best source per chapter" })
                ]
              }
            ),
            sourceOptions.map((o) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: () => {
                  void triggerHaptic("select");
                  setPreferredSourceKey(o.key);
                },
                className: `flex items-center justify-between rounded-xl border p-2.5 text-left transition-colors ${preferredSourceKey === o.key ? "bg-primary/10 border-primary/30" : "bg-white/[0.02] border-transparent hover:border-white/10"}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2 min-w-0", children: [
                    preferredSourceKey === o.key ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-4 w-4 text-primary flex-shrink-0" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Circle, { className: "h-4 w-4 text-muted-foreground flex-shrink-0" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "min-w-0", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block truncate text-sm font-semibold", children: o.scanlator || o.provider }),
                      o.scanlator && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block truncate text-[11px] text-muted-foreground", children: o.provider })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "shrink-0 text-[11px] text-muted-foreground", children: [
                    o.count,
                    " chapter",
                    o.count === 1 ? "" : "s"
                  ] })
                ]
              },
              o.key
            ))
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center text-[10px] sm:text-xs text-muted-foreground px-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FolderOpen, { className: "w-3 h-3 flex-shrink-0 mr-1" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: downloadPath || "Default library folder" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          onClick: handleDownload,
          disabled: selected.size === 0 || isStarting || !isEnabled2,
          className: "sticky bottom-[max(0px,env(safe-area-inset-bottom))] z-20 w-full h-14 sm:h-16 rounded-xl sm:rounded-2xl font-bold glow-primary flex-col gap-0.5 shadow-[0_-18px_36px_hsl(var(--background))]",
          children: isStarting ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center text-base sm:text-lg", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-5 h-5 mr-2 animate-spin" }),
            "Queuing…"
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center text-base sm:text-lg", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "w-4 h-4 mr-2 fill-current" }),
            selected.size > 0 ? `Download ${selected.size} chapter${selected.size > 1 ? "s" : ""}` : "Select chapters"
          ] })
        }
      )
    ] })
  ] }) }) });
  if (typeof document === "undefined") return sheet;
  return reactDomExports.createPortal(sheet, document.body);
};
const normalizeLanguageKey$1 = (value) => {
  const normalized = String(value || "").trim().toLowerCase();
  if (!normalized) return "unknown";
  if (normalized === "jp" || normalized.startsWith("ja") || normalized.includes("japanese")) return "jp";
  if (normalized === "kr" || normalized.startsWith("ko") || normalized.includes("korean")) return "kr";
  if (normalized === "zh" || normalized.startsWith("zh") || normalized.includes("chinese")) return "zh";
  if (normalized === "en" || normalized.startsWith("en") || normalized.includes("english")) return "en";
  return normalized;
};
const formatLanguageLabel$1 = (value) => {
  const key = normalizeLanguageKey$1(value);
  if (key === "jp") return "Japanese";
  if (key === "kr") return "Korean";
  if (key === "zh") return "Chinese";
  if (key === "en") return "English";
  if (key === "unknown") return "Unknown";
  return key.toUpperCase();
};
function MangaChapterProviderRows({
  chapter,
  bestSource,
  preferredProvider,
  effectivePreferredLanguage,
  onNavigate,
  className
}) {
  const chapterLabel = chapter.chapterNumber != null ? `Chapter ${chapter.chapterNumber}` : chapter.chapterTitle || "Chapter";
  const titleSuffix = chapter.chapterTitle && chapter.chapterTitle !== chapterLabel ? ` — ${chapter.chapterTitle}` : "";
  const filteredSources = chapter.sources.filter((src) => {
    const providerMatch = preferredProvider === "auto" || src.provider === preferredProvider;
    const langMatch = effectivePreferredLanguage === "auto" || normalizeLanguageKey$1(src.language) === effectivePreferredLanguage;
    return providerMatch && langMatch;
  });
  if (filteredSources.length === 0) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: cn("rounded-xl border border-white/5 overflow-hidden", className), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 py-2 bg-white/[0.03] text-sm font-semibold text-foreground select-none", children: [
      chapterLabel,
      titleSuffix
    ] }),
    filteredSources.map((src, idx) => {
      const isReadable = Boolean(src.chapterKey);
      const isBest = bestSource != null && bestSource.chapterKey === src.chapterKey && bestSource.provider === src.provider;
      const langLabel = formatLanguageLabel$1(src.language);
      const label = src.scanlator && src.scanlator.trim() ? `${src.provider} • ${src.scanlator} (${langLabel})` : `${src.provider} (${langLabel})`;
      return /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          disabled: !isReadable,
          onClick: isReadable ? () => onNavigate(src.provider, src.chapterKey) : void 0,
          className: cn(
            // Base
            "w-full flex gap-2 px-4 py-2 text-xs transition-colors text-left",
            "border-t border-white/5",
            // Responsive: full row at md+, compact pill below md (Req 2.7.8)
            "md:flex-row md:items-center flex-col items-start",
            // Interactive vs disabled (Req 2.7.6)
            isReadable ? "hover:bg-white/5 cursor-pointer text-foreground" : "cursor-default opacity-40 text-muted-foreground",
            // Best-source highlight (Req 2.7.7)
            isBest && "ring-1 ring-primary/40 bg-primary/5"
          ),
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: cn(
                "flex-1 truncate font-medium",
                // Compact pill below md breakpoint (Req 2.7.8)
                "md:py-0 py-0.5 md:px-0 px-2 md:rounded-none rounded-full md:bg-transparent bg-white/5"
              ),
              children: label
            }
          )
        },
        `${src.provider}-${src.chapterKey || "empty"}-${idx}`
      );
    })
  ] });
}
function RelationTree({ relations }) {
  useNavigate();
  if (relations.length === 0) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-4 overflow-x-auto pb-4 scrollbar-hide", children: relations.map((rel) => {
    var _a, _b, _c;
    const isNovel = (_a = rel.format) == null ? void 0 : _a.toUpperCase().includes("NOVEL");
    const isManga = ((_b = rel.format) == null ? void 0 : _b.toUpperCase().includes("MANGA")) || ((_c = rel.format) == null ? void 0 : _c.toUpperCase().includes("ONE_SHOT"));
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-[160px] md:w-[200px] flex-shrink-0 flex flex-col", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      UnifiedMediaCard,
      {
        item: {
          id: String(rel.id),
          name: rel.titleEnglish || rel.titleRomaji || "Untitled",
          poster: rel.coverImage || "",
          type: rel.relationType,
          status: rel.format || void 0,
          mediaType: isManga ? "manga" : isNovel ? "manga" : "anime",
          href: isNovel ? "/novel/comingsoon" : void 0
        },
        className: "flex-1"
      }
    ) }, rel.id);
  }) });
}
const normalizeLanguageKey = (value) => {
  const normalized = String(value || "").trim().toLowerCase();
  if (!normalized) return "unknown";
  if (normalized === "jp" || normalized.startsWith("ja") || normalized.includes("japanese")) return "jp";
  if (normalized === "kr" || normalized.startsWith("ko") || normalized.includes("korean")) return "kr";
  if (normalized === "zh" || normalized.startsWith("zh") || normalized.includes("chinese")) return "zh";
  if (normalized === "en" || normalized.startsWith("en") || normalized.includes("english")) return "en";
  return normalized;
};
const formatLanguageLabel = (value) => {
  const key = normalizeLanguageKey(value);
  if (key === "jp") return "Japanese";
  if (key === "kr") return "Korean";
  if (key === "zh") return "Chinese";
  if (key === "en") return "English";
  if (key === "unknown") return "Unknown";
  return key.toUpperCase();
};
const normalizePreferredMangaLanguage = (value) => {
  const normalized = normalizeLanguageKey(value);
  if (normalized === "jp" || normalized === "kr" || normalized === "zh" || normalized === "en") {
    return normalized;
  }
  return "auto";
};
const getChapterSortValue = (chapter) => {
  if (typeof (chapter == null ? void 0 : chapter.chapterNumber) === "number" && Number.isFinite(chapter.chapterNumber)) {
    return chapter.chapterNumber;
  }
  if (typeof (chapter == null ? void 0 : chapter.canonicalOrder) === "number" && Number.isFinite(chapter.canonicalOrder)) {
    return chapter.canonicalOrder;
  }
  return Number.MAX_SAFE_INTEGER;
};
const getChapterDisplayNumber = (chapter) => {
  if (typeof (chapter == null ? void 0 : chapter.chapterNumber) === "number" && Number.isFinite(chapter.chapterNumber)) {
    return chapter.chapterNumber;
  }
  if (typeof (chapter == null ? void 0 : chapter.canonicalOrder) === "number" && Number.isFinite(chapter.canonicalOrder)) {
    return chapter.canonicalOrder;
  }
  return null;
};
const toRecommendationCard = (item) => {
  var _a, _b, _c;
  const title = item.canonicalTitle || ((_a = item.title) == null ? void 0 : _a.english) || ((_b = item.title) == null ? void 0 : _b.romaji) || ((_c = item.title) == null ? void 0 : _c.native);
  const id = item.anilistId || item.malId || item.id;
  if (!title || !id) return null;
  return {
    id: String(id),
    name: title,
    poster: item.poster || "",
    type: item.mediaType || "manga",
    status: item.status || void 0,
    rating: typeof item.score === "number" && Number.isFinite(item.score) ? (item.score / 10).toFixed(1) : void 0,
    chapters: typeof item.chapters === "number" && item.chapters > 0 ? item.chapters : void 0,
    anilistId: typeof item.anilistId === "number" ? item.anilistId : void 0,
    malId: typeof item.malId === "number" ? item.malId : void 0,
    isAdult: inferMangaAdultFlag(item),
    mediaType: "manga"
  };
};
const CHAPTERS_PER_GROUP = 20;
function MangaPage() {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v;
  const { mangaId } = useParams();
  const navigate = useNavigate();
  const isNative = useIsNativeApp();
  const isMobileViewport = useIsMobile();
  const { user, profile, isAdmin } = useAuth();
  const { settings: contentSafetySettings, updateSettings: updateContentSafetySettings } = useContentSafetySettings();
  const [allowAdultForSession, setAllowAdultForSession] = reactExports.useState(false);
  const [expandedChapterOrder, setExpandedChapterOrder] = reactExports.useState(null);
  const [editOpen, setEditOpen] = reactExports.useState(false);
  const [showMangaDownload, setShowMangaDownload] = reactExports.useState(false);
  const { data: mangaData, isLoading: loadingInfo, error } = useMangaDetail(mangaId);
  const { data: chapterData, isLoading: loadingChapters } = useMangaChapters(mangaId);
  const { data: mangaBakaData } = useMangaBakaSeries((_a = mangaData == null ? void 0 : mangaData.detail) == null ? void 0 : _a.anilistId);
  const { data: kitsuHierarchy } = useMangaKitsuHierarchy((_b = mangaData == null ? void 0 : mangaData.detail) == null ? void 0 : _b.anilistId);
  const { data: anilistMangaMeta } = useQuery({
    queryKey: ["manga-anilist-tags", (_c = mangaData == null ? void 0 : mangaData.detail) == null ? void 0 : _c.anilistId],
    queryFn: async () => {
      var _a2;
      const id = (_a2 = mangaData == null ? void 0 : mangaData.detail) == null ? void 0 : _a2.anilistId;
      if (!id) return null;
      const response = await fetch(`${resolveApiV3Base()}/manga/by-anilist/${id}`);
      if (!response.ok) return null;
      const payload = await response.json();
      return (payload == null ? void 0 : payload.data) ?? null;
    },
    enabled: Boolean((_d = mangaData == null ? void 0 : mangaData.detail) == null ? void 0 : _d.anilistId),
    staleTime: 10 * 60 * 1e3
  });
  const { data: directAniListMangaTags = [] } = useQuery({
    queryKey: ["manga-tags-direct", (_e = mangaData == null ? void 0 : mangaData.detail) == null ? void 0 : _e.anilistId],
    // Tags come from the server-proxied `by-anilist` query (anilistMangaMeta),
    // which is cached and CORS-safe. This direct AniList call was redundant with
    // that channel and its 429s surfaced as "blocked by CORS" spam, so it now
    // just mirrors the proxied tags instead of hitting graphql.anilist.co.
    queryFn: async () => (anilistMangaMeta == null ? void 0 : anilistMangaMeta.tags) ?? [],
    enabled: Boolean((_f = mangaData == null ? void 0 : mangaData.detail) == null ? void 0 : _f.anilistId),
    staleTime: 60 * 60 * 1e3
  });
  const combinedMangaTags = reactExports.useMemo(() => {
    const aniList = directAniListMangaTags.length > 0 ? directAniListMangaTags : (anilistMangaMeta == null ? void 0 : anilistMangaMeta.tags) || [];
    const validAniList = aniList.filter((t) => !t.isMediaSpoiler && !t.isGeneralSpoiler).map((t) => ({
      id: t.id || t.name,
      name: t.name,
      rank: t.rank,
      weight: t.rank && t.rank >= 80 ? "defining" : t.rank && t.rank >= 60 ? "core" : "normal"
    }));
    if (validAniList.length > 0) return validAniList;
    return ((mangaBakaData == null ? void 0 : mangaBakaData.tags) || []).filter((t) => !t.isSpoiler).map((t) => ({
      id: t.id ?? t.name,
      name: t.name,
      rank: t.weight === "defining" ? 90 : t.weight === "core" ? 70 : void 0,
      weight: t.weight
    }));
  }, [directAniListMangaTags, anilistMangaMeta == null ? void 0 : anilistMangaMeta.tags, mangaBakaData == null ? void 0 : mangaBakaData.tags]);
  const [extensionChapterPayload, setExtensionChapterPayload] = reactExports.useState(null);
  reactExports.useEffect(() => {
    if (!(mangaData == null ? void 0 : mangaData.detail)) return;
    const { anilistId, malId: malId2, canonicalTitle, title } = mangaData.detail;
    const titleStr = canonicalTitle || (title == null ? void 0 : title.english) || (title == null ? void 0 : title.romaji) || "";
    const reqParams = {
      anilistId: typeof anilistId === "number" ? anilistId : void 0,
      malId: typeof malId2 === "number" ? malId2 : void 0,
      title: titleStr || void 0
    };
    fetchExtensionMangaChapters(reqParams).then((payload) => {
      setExtensionChapterPayload(payload);
    }).catch(() => {
    });
  }, [mangaData == null ? void 0 : mangaData.detail]);
  const { data: readlistEntry } = useMangaReadlistItem(mangaId);
  const addToReadlist = useUpsertMangaReadlist();
  const removeFromReadlist = useRemoveFromMangaReadlist();
  const rawCoverImage = ((_g = mangaData == null ? void 0 : mangaData.detail) == null ? void 0 : _g.coverImage) || "";
  const [coverImageSrc, setCoverImageSrc] = reactExports.useState(() => getProxiedImageUrl(rawCoverImage));
  const [coverFallbackTried, setCoverFallbackTried] = reactExports.useState(false);
  const [bannerUrl, setBannerUrl] = reactExports.useState(null);
  const [anilistMetadata, setAnilistMetadata] = reactExports.useState(null);
  const malId = (_h = mangaData == null ? void 0 : mangaData.detail) == null ? void 0 : _h.malId;
  const { data: jikanData } = useQuery({
    queryKey: ["jikan-manga", malId],
    queryFn: async () => {
      if (!malId) return null;
      const res = await fetch(`${resolveApiV3Base()}/manga/mal/${malId}/full`);
      if (!res.ok) return null;
      const json = await res.json();
      return (json == null ? void 0 : json.data) ?? null;
    },
    enabled: !!malId,
    staleTime: 24 * 60 * 60 * 1e3
  });
  reactExports.useEffect(() => {
    setCoverFallbackTried(false);
    setCoverImageSrc(getProxiedImageUrl(rawCoverImage));
  }, [rawCoverImage]);
  reactExports.useEffect(() => {
    var _a2, _b2;
    if (!isNative) return;
    const detail = mangaData == null ? void 0 : mangaData.detail;
    if (!detail) return;
    const title = detail.canonicalTitle || ((_a2 = detail.title) == null ? void 0 : _a2.english) || ((_b2 = detail.title) == null ? void 0 : _b2.romaji) || "";
    if (!title) return;
    setViewingMangaRpc({
      mangaTitle: title,
      mangaImageUrl: detail.coverImage ?? null,
      mangaUrl: `https://tatakai.me/manga/${mangaId}`
    });
    return () => {
      clearDiscordRpc();
    };
  }, [isNative, mangaData == null ? void 0 : mangaData.detail, mangaId]);
  reactExports.useEffect(() => {
    if (!anilistMangaMeta) return;
    if (anilistMangaMeta.bannerImage) {
      setBannerUrl(getProxiedImageUrl(anilistMangaMeta.bannerImage));
    }
    setAnilistMetadata({
      chapters: anilistMangaMeta.chapters,
      volumes: anilistMangaMeta.volumes
    });
  }, [anilistMangaMeta]);
  const chapters = reactExports.useMemo(() => {
    var _a2, _b2;
    const base = (chapterData == null ? void 0 : chapterData.mappedChapters) ? chapterData.mappedChapters : [];
    const kitsuByNumber = /* @__PURE__ */ new Map();
    if (kitsuHierarchy == null ? void 0 : kitsuHierarchy.chapters) {
      for (const kc of kitsuHierarchy.chapters) {
        if (kc.number != null) {
          kitsuByNumber.set(kc.number, {
            title: kc.isGeneratedTitle ? "" : kc.title,
            synopsis: kc.synopsis,
            thumbnail: kc.thumbnail,
            published: kc.published,
            pageCount: kc.pageCount
          });
        }
      }
    }
    const enriched = base.map((ch) => {
      const num = ch.chapterNumber;
      if (num == null) return ch;
      const kc = kitsuByNumber.get(num);
      if (!kc) return ch;
      return {
        ...ch,
        chapterTitle: ch.chapterTitle || kc.title || ch.chapterTitle,
        _kitsuSynopsis: kc.synopsis,
        _kitsuThumbnail: kc.thumbnail,
        _kitsuPublished: kc.published,
        _kitsuPageCount: kc.pageCount
      };
    });
    if (!((_a2 = extensionChapterPayload == null ? void 0 : extensionChapterPayload.chapters) == null ? void 0 : _a2.length)) return enriched;
    const effectiveBase = chapterData ?? {
      anilistId: ((_b2 = mangaData == null ? void 0 : mangaData.detail) == null ? void 0 : _b2.anilistId) ?? 0,
      partial: false,
      failedProviders: [],
      chapters: [],
      mappedChapters: []
    };
    const merged = mergeChaptersWithExtensions(effectiveBase, extensionChapterPayload);
    const mergedBase = merged.mappedChapters ?? base;
    return mergedBase.map((ch) => {
      const num = ch.chapterNumber;
      if (num == null) return ch;
      const kc = kitsuByNumber.get(num);
      if (!kc) return ch;
      return {
        ...ch,
        chapterTitle: ch.chapterTitle || kc.title || ch.chapterTitle,
        _kitsuSynopsis: kc.synopsis,
        _kitsuThumbnail: kc.thumbnail,
        _kitsuPublished: kc.published,
        _kitsuPageCount: kc.pageCount
      };
    });
  }, [chapterData, extensionChapterPayload, kitsuHierarchy, (_i = mangaData == null ? void 0 : mangaData.detail) == null ? void 0 : _i.anilistId]);
  const isChapterListLoading = loadingChapters && !chapterData;
  const [preferredProvider, setPreferredProvider] = reactExports.useState("auto");
  const [preferredLanguage, setPreferredLanguage] = reactExports.useState("auto");
  const [chapterSortMode, setChapterSortMode] = reactExports.useState("newest");
  const [chapterSearchTerm, setChapterSearchTerm] = reactExports.useState("");
  const [selectedChapterGroup, setSelectedChapterGroup] = reactExports.useState(0);
  const [selectedVolumeFilter, setSelectedVolumeFilter] = reactExports.useState(null);
  const profilePreferredMangaLanguage = reactExports.useMemo(
    () => normalizePreferredMangaLanguage(profile == null ? void 0 : profile.preferred_manga_language),
    [profile == null ? void 0 : profile.preferred_manga_language]
  );
  const effectivePreferredLanguage = preferredLanguage === "auto" ? profilePreferredMangaLanguage : preferredLanguage;
  const providerOptions = reactExports.useMemo(() => {
    var _a2;
    const providers = /* @__PURE__ */ new Set();
    (((_a2 = mangaData == null ? void 0 : mangaData.detail) == null ? void 0 : _a2.providersAvailable) || []).forEach((provider) => {
      if (provider) providers.add(provider);
    });
    chapters.forEach((chapter) => {
      var _a3;
      (_a3 = chapter.sources) == null ? void 0 : _a3.forEach((source) => {
        if (source.provider) providers.add(source.provider);
      });
    });
    return Array.from(providers).sort((a, b) => a.localeCompare(b));
  }, [chapters, (_j = mangaData == null ? void 0 : mangaData.detail) == null ? void 0 : _j.providersAvailable]);
  const languageOptions = reactExports.useMemo(() => {
    const labels = /* @__PURE__ */ new Map();
    chapters.forEach((chapter) => {
      var _a2;
      (_a2 = chapter.sources) == null ? void 0 : _a2.forEach((source) => {
        const normalized = normalizeLanguageKey(source.language);
        if (normalized && normalized !== "unknown") {
          labels.set(normalized, formatLanguageLabel(source.language));
        }
      });
    });
    return Array.from(labels.entries()).map(([value, label]) => ({ value, label })).sort((left, right) => left.label.localeCompare(right.label));
  }, [chapters]);
  const sortedChapters = reactExports.useMemo(() => {
    const scoreSource = (source) => {
      let score = 0;
      const sourceLanguage = normalizeLanguageKey(source == null ? void 0 : source.language);
      if (preferredProvider !== "auto" && (source == null ? void 0 : source.provider) === preferredProvider) score += 100;
      if (effectivePreferredLanguage !== "auto" && sourceLanguage === effectivePreferredLanguage) score += 60;
      if (sourceLanguage !== "unknown") score += 5;
      return score;
    };
    return [...chapters].map((chapter) => ({
      ...chapter,
      sources: [...chapter.sources || []].sort((left, right) => {
        const scoreDiff = scoreSource(right) - scoreSource(left);
        if (scoreDiff !== 0) return scoreDiff;
        const providerCompare = String(left.provider || "").localeCompare(String(right.provider || ""));
        if (providerCompare !== 0) return providerCompare;
        return formatLanguageLabel(left.language).localeCompare(formatLanguageLabel(right.language));
      })
    })).sort((left, right) => {
      const chapterDiff = getChapterSortValue(left) - getChapterSortValue(right);
      if (chapterDiff !== 0) return chapterDiff;
      return (left.canonicalOrder ?? Number.MAX_SAFE_INTEGER) - (right.canonicalOrder ?? Number.MAX_SAFE_INTEGER);
    });
  }, [chapters, preferredProvider, effectivePreferredLanguage]);
  const visibleChapters = reactExports.useMemo(() => {
    return sortedChapters.filter(
      (chapter) => {
        var _a2;
        return (_a2 = chapter.sources) == null ? void 0 : _a2.some((source) => {
          const providerMatch = preferredProvider === "auto" || source.provider === preferredProvider;
          const languageMatch = effectivePreferredLanguage === "auto" || normalizeLanguageKey(source.language) === effectivePreferredLanguage;
          return providerMatch && languageMatch;
        });
      }
    );
  }, [sortedChapters, preferredProvider, effectivePreferredLanguage]);
  const displayChapters = reactExports.useMemo(() => {
    if (chapterSortMode === "oldest") return visibleChapters;
    return [...visibleChapters].reverse();
  }, [visibleChapters, chapterSortMode]);
  const volumeScopedDisplayChapters = reactExports.useMemo(() => {
    if (selectedVolumeFilter == null) return displayChapters;
    const scoped = sortedChapters.filter((chapter) => {
      const volumeValue = Number(chapter.volume);
      return Number.isFinite(volumeValue) && Math.trunc(volumeValue) === selectedVolumeFilter;
    });
    if (chapterSortMode === "oldest") return scoped;
    return [...scoped].reverse();
  }, [selectedVolumeFilter, displayChapters, sortedChapters, chapterSortMode]);
  const filteredDisplayChapters = reactExports.useMemo(() => {
    const normalizedSearchTerm = chapterSearchTerm.trim().toLowerCase();
    return volumeScopedDisplayChapters.filter((chapter) => {
      if (!normalizedSearchTerm) return true;
      const chapterNumber = chapter.chapterNumber != null ? String(chapter.chapterNumber).toLowerCase() : "";
      const volumeNumber = chapter.volume != null ? String(chapter.volume).toLowerCase() : "";
      const chapterTitle = String(chapter.chapterTitle || "").toLowerCase();
      const sourceText = (chapter.sources || []).map((source) => `${source.provider || ""} ${formatLanguageLabel(source.language)}`.toLowerCase()).join(" ");
      return chapterTitle.includes(normalizedSearchTerm) || chapterNumber.includes(normalizedSearchTerm) || `chapter ${chapterNumber}`.includes(normalizedSearchTerm) || `ch ${chapterNumber}`.includes(normalizedSearchTerm) || volumeNumber.includes(normalizedSearchTerm) || `volume ${volumeNumber}`.includes(normalizedSearchTerm) || `vol ${volumeNumber}`.includes(normalizedSearchTerm) || sourceText.includes(normalizedSearchTerm);
    });
  }, [volumeScopedDisplayChapters, chapterSearchTerm]);
  const chapterGroups = reactExports.useMemo(() => {
    if (filteredDisplayChapters.length === 0) return [];
    if (filteredDisplayChapters.length <= CHAPTERS_PER_GROUP) return [filteredDisplayChapters];
    const groups = [];
    for (let index = 0; index < filteredDisplayChapters.length; index += CHAPTERS_PER_GROUP) {
      groups.push(filteredDisplayChapters.slice(index, index + CHAPTERS_PER_GROUP));
    }
    return groups;
  }, [filteredDisplayChapters]);
  const chapterGroupRanges = reactExports.useMemo(() => {
    return chapterGroups.map((group, index) => {
      const numericValues = group.map((chapter) => getChapterDisplayNumber(chapter)).filter((value) => typeof value === "number" && Number.isFinite(value));
      if (numericValues.length > 0) {
        const min = Math.min(...numericValues);
        const max = Math.max(...numericValues);
        return {
          start: chapterSortMode === "newest" ? max : min,
          end: chapterSortMode === "newest" ? min : max
        };
      }
      const start = index * CHAPTERS_PER_GROUP + 1;
      const end = Math.min((index + 1) * CHAPTERS_PER_GROUP, filteredDisplayChapters.length);
      return {
        start: chapterSortMode === "newest" ? filteredDisplayChapters.length - start + 1 : start,
        end: chapterSortMode === "newest" ? filteredDisplayChapters.length - end + 1 : end
      };
    });
  }, [chapterGroups, chapterSortMode, filteredDisplayChapters.length]);
  const activeChapterGroup = Math.min(selectedChapterGroup, Math.max(chapterGroups.length - 1, 0));
  const chapterCards = chapterGroups[activeChapterGroup] || [];
  const hasChapterGroups = chapterGroups.length > 1;
  const hasChapterFilters = preferredProvider !== "auto" || effectivePreferredLanguage !== "auto" || selectedVolumeFilter != null || chapterSearchTerm.trim().length > 0;
  const availableChapterKeys = reactExports.useMemo(() => {
    const keys = /* @__PURE__ */ new Set();
    sortedChapters.forEach((chapter) => {
      var _a2;
      (_a2 = chapter.sources) == null ? void 0 : _a2.forEach((source) => {
        if (source.chapterKey) keys.add(source.chapterKey);
      });
    });
    return keys;
  }, [sortedChapters]);
  const getBestSource = (chapter) => {
    var _a2;
    if (!((_a2 = chapter == null ? void 0 : chapter.sources) == null ? void 0 : _a2.length)) return null;
    const exactSource = chapter.sources.find((source) => {
      const providerMatch = preferredProvider === "auto" || source.provider === preferredProvider;
      const languageMatch = effectivePreferredLanguage === "auto" || normalizeLanguageKey(source.language) === effectivePreferredLanguage;
      return providerMatch && languageMatch;
    });
    if (exactSource) return exactSource;
    if (preferredProvider !== "auto") {
      const byProvider = chapter.sources.find((source) => source.provider === preferredProvider);
      if (byProvider) return byProvider;
    }
    if (effectivePreferredLanguage !== "auto") {
      const byLanguage = chapter.sources.find(
        (source) => normalizeLanguageKey(source.language) === effectivePreferredLanguage
      );
      if (byLanguage) return byLanguage;
    }
    return chapter.sources[0] || null;
  };
  const buildReaderQuery = (opts) => {
    const params = new URLSearchParams();
    params.set("chapterKey", opts.chapterKey);
    if (opts.provider) params.set("provider", opts.provider);
    if (opts.providerChapterId) params.set("providerChapterId", opts.providerChapterId);
    if (opts.chapterNumber != null && Number.isFinite(opts.chapterNumber))
      params.set("chapterNumber", String(opts.chapterNumber));
    if (opts.chapterTitle) params.set("chapterTitle", opts.chapterTitle);
    params.set("page", String(Math.max(0, opts.page ?? 0)));
    return params.toString();
  };
  const sortedSourcesFor = (chapter) => sortMangaChapterSources(chapter == null ? void 0 : chapter.sources);
  const goToReader = (chapter, source, page = 0) => {
    if (!mangaId || !(source == null ? void 0 : source.chapterKey)) return;
    const query = buildReaderQuery({
      chapterKey: source.chapterKey,
      provider: source.provider,
      providerChapterId: source.providerChapterId,
      chapterNumber: (chapter == null ? void 0 : chapter.chapterNumber) ?? null,
      chapterTitle: (chapter == null ? void 0 : chapter.chapterTitle) ?? null,
      page
    });
    navigate(`/manga/read/${mangaId}?${query}`, { state: { sources: sortedSourcesFor(chapter) } });
  };
  const volumeSections = reactExports.useMemo(() => {
    const volumeMap = /* @__PURE__ */ new Map();
    sortedChapters.forEach((chapter) => {
      const volumeNumber = Number(chapter.volume);
      if (!Number.isFinite(volumeNumber) || volumeNumber <= 0) return;
      const normalizedVolume = Math.trunc(volumeNumber);
      const existing = volumeMap.get(normalizedVolume) || [];
      existing.push(chapter);
      volumeMap.set(normalizedVolume, existing);
    });
    const pickSource = (chapter) => {
      const sources = chapter.sources || [];
      if (sources.length === 0) return null;
      const exact = sources.find((source) => {
        const providerMatch = preferredProvider === "auto" || source.provider === preferredProvider;
        const languageMatch = effectivePreferredLanguage === "auto" || normalizeLanguageKey(source.language) === effectivePreferredLanguage;
        return providerMatch && languageMatch;
      });
      if (exact) return exact;
      if (preferredProvider !== "auto") {
        const byProvider = sources.find((source) => source.provider === preferredProvider);
        if (byProvider) return byProvider;
      }
      if (effectivePreferredLanguage !== "auto") {
        const byLanguage = sources.find(
          (source) => normalizeLanguageKey(source.language) === effectivePreferredLanguage
        );
        if (byLanguage) return byLanguage;
      }
      return sources[0] || null;
    };
    return Array.from(volumeMap.entries()).sort((left, right) => left[0] - right[0]).map(([volume, chaptersInVolume]) => {
      var _a2, _b2;
      const ordered = [...chaptersInVolume].sort((left, right) => {
        const chapterDiff = getChapterSortValue(left) - getChapterSortValue(right);
        if (chapterDiff !== 0) return chapterDiff;
        return (left.canonicalOrder ?? Number.MAX_SAFE_INTEGER) - (right.canonicalOrder ?? Number.MAX_SAFE_INTEGER);
      });
      const readable = ordered.map((chapter) => ({ chapter, source: pickSource(chapter) })).filter((entry) => {
        var _a3;
        return Boolean((_a3 = entry.source) == null ? void 0 : _a3.chapterKey);
      });
      const firstReadable = readable[0] || null;
      const latestReadable = readable.length > 0 ? readable[readable.length - 1] : null;
      const numericChapterValues = ordered.map((chapter) => chapter.chapterNumber).filter((value) => typeof value === "number" && Number.isFinite(value));
      const minChapter = numericChapterValues.length > 0 ? Math.min(...numericChapterValues) : null;
      const maxChapter = numericChapterValues.length > 0 ? Math.max(...numericChapterValues) : null;
      let rangeLabel = "Unknown range";
      if (minChapter != null && maxChapter != null) {
        rangeLabel = minChapter === maxChapter ? `${minChapter}` : `${minChapter} - ${maxChapter}`;
      }
      return {
        volume,
        chapterCount: ordered.length,
        readableCount: readable.length,
        rangeLabel,
        firstChapterTitle: (firstReadable == null ? void 0 : firstReadable.chapter.chapterTitle) || ((firstReadable == null ? void 0 : firstReadable.chapter.chapterNumber) != null ? `Chapter ${firstReadable.chapter.chapterNumber}` : ""),
        firstChapterKey: ((_a2 = firstReadable == null ? void 0 : firstReadable.source) == null ? void 0 : _a2.chapterKey) || null,
        latestChapterKey: ((_b2 = latestReadable == null ? void 0 : latestReadable.source) == null ? void 0 : _b2.chapterKey) || null,
        // Full chapter+source objects so navigation can thread provider +
        // number + title without re-deriving them from the key.
        firstChapter: (firstReadable == null ? void 0 : firstReadable.chapter) ?? null,
        firstSource: (firstReadable == null ? void 0 : firstReadable.source) ?? null,
        latestChapter: (latestReadable == null ? void 0 : latestReadable.chapter) ?? null,
        latestSource: (latestReadable == null ? void 0 : latestReadable.source) ?? null,
        readableChapters: readable.map((entry) => {
          var _a3;
          return {
            chapterKey: ((_a3 = entry.source) == null ? void 0 : _a3.chapterKey) || "",
            chapterNumber: entry.chapter.chapterNumber,
            chapterTitle: entry.chapter.chapterTitle,
            chapter: entry.chapter,
            source: entry.source
          };
        })
      };
    });
  }, [sortedChapters, preferredProvider, effectivePreferredLanguage]);
  const showSidebar = !isMobileViewport;
  reactExports.useEffect(() => {
    window.scrollTo(0, 0);
  }, [mangaId]);
  reactExports.useEffect(() => {
    setAllowAdultForSession(false);
    setPreferredProvider("auto");
    setPreferredLanguage("auto");
    setChapterSortMode("newest");
    setChapterSearchTerm("");
    setSelectedChapterGroup(0);
    setSelectedVolumeFilter(null);
  }, [mangaId, profilePreferredMangaLanguage]);
  reactExports.useEffect(() => {
    if (preferredProvider === "auto") return;
    if (providerOptions.length === 0) return;
    if (!providerOptions.includes(preferredProvider)) {
      setPreferredProvider("auto");
    }
  }, [preferredProvider, providerOptions]);
  reactExports.useEffect(() => {
    if (preferredLanguage === "auto") return;
    if (languageOptions.length === 0) return;
    if (!languageOptions.some((option) => option.value === preferredLanguage)) {
      setPreferredLanguage("auto");
    }
  }, [preferredLanguage, languageOptions]);
  reactExports.useEffect(() => {
    setSelectedChapterGroup(0);
  }, [chapterSortMode, preferredProvider, effectivePreferredLanguage, chapterSearchTerm, selectedVolumeFilter]);
  reactExports.useEffect(() => {
    if (selectedVolumeFilter == null) return;
    if (volumeSections.some((volumeItem) => volumeItem.volume === selectedVolumeFilter)) return;
    setSelectedVolumeFilter(null);
  }, [selectedVolumeFilter, volumeSections]);
  const info = mangaData == null ? void 0 : mangaData.detail;
  const displayTitle = (info == null ? void 0 : info.canonicalTitle) || ((_k = info == null ? void 0 : info.title) == null ? void 0 : _k.english) || ((_l = info == null ? void 0 : info.title) == null ? void 0 : _l.romaji) || ((_m = info == null ? void 0 : info.title) == null ? void 0 : _m.native) || "Unknown Title";
  const playlistMediaFormat = (() => {
    const f = String((info == null ? void 0 : info.format) || "").toUpperCase();
    const c = String((info == null ? void 0 : info.origin) || "").toUpperCase();
    if (f === "NOVEL" || f === "LIGHT_NOVEL") return "novel";
    if (f === "OEL") return "comic";
    if (f === "MANHWA" || c === "KR") return "manhwa";
    if (f === "MANHUA" || c === "CN" || c === "TW") return "manhua";
    return "manga";
  })();
  const mangaDownloadKind = playlistMediaFormat === "manhwa" ? "manhwa" : playlistMediaFormat === "manhua" ? "manhua" : "manga";
  const recommendationTerms = reactExports.useMemo(() => {
    var _a2, _b2;
    if (!info) return [];
    const genreTerms = isMobileViewport ? info.genres.slice(0, 1).map((genre) => `${genre} manga`) : info.genres.slice(0, 3).map((genre) => `${genre} manga`);
    const terms = [
      info.canonicalTitle,
      (_a2 = info.title) == null ? void 0 : _a2.english,
      (_b2 = info.title) == null ? void 0 : _b2.romaji,
      ...genreTerms
    ];
    return Array.from(
      new Set(
        terms.map((term) => String(term || "").trim()).filter((term) => term.length > 0)
      )
    ).slice(0, isMobileViewport ? 2 : 4);
  }, [info, isMobileViewport]);
  const { data: recommendationCards = [], isLoading: loadingRecommendations } = useQuery({
    queryKey: [
      "manga-detail-recommendations",
      mangaId,
      recommendationTerms.join("|"),
      contentSafetySettings.showAdultEverywhere
    ],
    queryFn: async () => {
      if (!info) return [];
      const batches = await Promise.all(
        recommendationTerms.map(
          (term, index) => searchManga(term, 1, isMobileViewport ? 8 : index === 0 ? 12 : 10, { provider: "all" })
        )
      );
      const seen = /* @__PURE__ */ new Set();
      const cards = [];
      for (const batch of batches) {
        const rows = Array.isArray(batch == null ? void 0 : batch.results) ? batch.results : [];
        for (const row of rows) {
          const card = toRecommendationCard(row);
          if (!card) continue;
          const sameAniList = typeof info.anilistId === "number" && typeof card.anilistId === "number" && card.anilistId === info.anilistId;
          const sameMal = typeof info.malId === "number" && typeof card.malId === "number" && card.malId === info.malId;
          const sameRouteId = String(card.id) === String(mangaId);
          if (sameAniList || sameMal || sameRouteId) continue;
          if (card.isAdult && !contentSafetySettings.showAdultEverywhere) continue;
          const key = String(card.anilistId ?? card.malId ?? card.id);
          if (seen.has(key)) continue;
          seen.add(key);
          cards.push(card);
          if (cards.length >= 8) return cards;
        }
      }
      return cards;
    },
    staleTime: 5 * 60 * 1e3,
    enabled: Boolean(info) && recommendationTerms.length > 0
  });
  const includeAdultRecs = !!(contentSafetySettings == null ? void 0 : contentSafetySettings.showAdultEverywhere);
  const { recommendations: anilistMangaRecs } = useAniListRecommendations(info == null ? void 0 : info.anilistId, {
    mediaType: "MANGA",
    includeAdult: includeAdultRecs,
    limit: isMobileViewport ? 12 : 24
  });
  const { recommendations: mangaEngineRecs } = useMangaRecommendationEngine({ limit: isMobileViewport ? 12 : 24 });
  const mergedRecommendations = reactExports.useMemo(() => {
    const seen = /* @__PURE__ */ new Set();
    const out = [];
    const curAniList = typeof (info == null ? void 0 : info.anilistId) === "number" ? info.anilistId : null;
    const curMal = typeof (info == null ? void 0 : info.malId) === "number" ? info.malId : null;
    const curRoute = String(mangaId || "");
    const push = (card) => {
      if (!card) return;
      if (card.isAdult && !includeAdultRecs) return;
      if (curAniList != null && card.anilistId === curAniList) return;
      if (curMal != null && card.malId === curMal) return;
      if (String(card.id) === curRoute) return;
      const key = String(card.anilistId ?? card.malId ?? card.id);
      if (seen.has(key)) return;
      seen.add(key);
      out.push(card);
    };
    for (const r of anilistMangaRecs) {
      push({
        id: String(r.anilistId),
        name: r.title,
        poster: r.poster,
        type: r.format ?? "manga",
        rating: r.averageScore ? (r.averageScore / 10).toFixed(1) : void 0,
        anilistId: r.anilistId,
        malId: r.malId ?? void 0,
        isAdult: r.isAdult,
        mediaType: "manga"
      });
    }
    for (const rec of mangaEngineRecs) {
      const a = rec.anime;
      push({
        id: String(a.id),
        name: a.title,
        poster: a.poster ?? "",
        type: a.format ?? "manga",
        rating: a.averageScore ? (a.averageScore / 10).toFixed(1) : void 0,
        anilistId: a.anilistId ?? void 0,
        malId: a.malId ?? void 0,
        mediaType: "manga"
      });
    }
    for (const card of recommendationCards) push(card);
    return out.slice(0, isMobileViewport ? 10 : 16);
  }, [anilistMangaRecs, mangaEngineRecs, recommendationCards, info == null ? void 0 : info.anilistId, info == null ? void 0 : info.malId, mangaId, includeAdultRecs, isMobileViewport]);
  if (loadingInfo) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background text-foreground", children: [
      !isNative && /* @__PURE__ */ jsxRuntimeExports.jsx(Background, {}),
      showSidebar && /* @__PURE__ */ jsxRuntimeExports.jsx(Sidebar, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: cn("relative z-10 py-6 max-w-[1800px] mx-auto", isNative ? "p-6" : "pl-6 md:pl-32 pr-6"), children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-32" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "aspect-[2/3] rounded-3xl" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-2 space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-12 w-3/4" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-24 w-full" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-14 w-40 rounded-full" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-14 w-14 rounded-full" })
            ] })
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(MobileNav, {})
    ] });
  }
  if (error || !info) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-background flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-16 h-16 text-muted-foreground mx-auto mb-4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold mb-2", children: "Manga details not available" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-4", children: "We couldn't retrieve the information for this manga ID." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => navigate("/"), className: "px-6 py-2 bg-primary text-primary-foreground rounded-full hover:brightness-110 font-bold transition-all", children: "Go back home" })
    ] }) });
  }
  const requiresAdultWarning = Boolean(info.adult) && contentSafetySettings.warnBeforeAdultOpen && !allowAdultForSession;
  if (requiresAdultWarning) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background text-foreground overflow-x-hidden", children: [
      !isNative && /* @__PURE__ */ jsxRuntimeExports.jsx(Background, {}),
      showSidebar && /* @__PURE__ */ jsxRuntimeExports.jsx(Sidebar, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: cn(
        "relative z-10 py-8 max-w-[980px] mx-auto pb-24",
        isNative ? "px-4" : "pl-6 md:pl-32 pr-6"
      ), children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        AdultWarningGate,
        {
          title: info.canonicalTitle || ((_n = info.title) == null ? void 0 : _n.english) || ((_o = info.title) == null ? void 0 : _o.romaji) || "Unknown",
          mediaLabel: "manga",
          onBack: () => navigate(-1),
          onContinue: () => setAllowAdultForSession(true),
          onAlwaysShow: () => {
            updateContentSafetySettings({
              showAdultEverywhere: true,
              warnBeforeAdultOpen: false
            });
            setAllowAdultForSession(true);
          }
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(MobileNav, {})
    ] });
  }
  const hasSavedProgress = Boolean(readlistEntry == null ? void 0 : readlistEntry.last_chapter_key) && availableChapterKeys.has(String((readlistEntry == null ? void 0 : readlistEntry.last_chapter_key) || ""));
  Boolean(readlistEntry && readlistEntry.status !== "reading");
  const handleReadNow = () => {
    var _a2;
    if (!mangaId) return;
    if (hasSavedProgress && (readlistEntry == null ? void 0 : readlistEntry.last_chapter_key)) {
      const savedPage = Math.max(0, Number(readlistEntry.last_page_index || 0));
      const savedKey = String(readlistEntry.last_chapter_key);
      const savedChapter = sortedChapters.find((c) => {
        var _a3;
        return (_a3 = c.sources) == null ? void 0 : _a3.some((s) => s.chapterKey === savedKey);
      });
      const savedSource = (_a2 = savedChapter == null ? void 0 : savedChapter.sources) == null ? void 0 : _a2.find((s) => s.chapterKey === savedKey);
      const query = buildReaderQuery({
        chapterKey: savedKey,
        provider: (savedSource == null ? void 0 : savedSource.provider) || readlistEntry.last_provider,
        providerChapterId: savedSource == null ? void 0 : savedSource.providerChapterId,
        chapterNumber: (savedChapter == null ? void 0 : savedChapter.chapterNumber) ?? readlistEntry.last_chapter_number ?? null,
        chapterTitle: (savedChapter == null ? void 0 : savedChapter.chapterTitle) ?? readlistEntry.last_chapter_title ?? null,
        page: savedPage
      });
      navigate(`/manga/read/${mangaId}?${query}`, { state: { sources: sortedSourcesFor(savedChapter) } });
      return;
    }
    if (visibleChapters.length > 0 || sortedChapters.length > 0) {
      const firstReadableChapter = visibleChapters[0] || sortedChapters[0];
      goToReader(firstReadableChapter, getBestSource(firstReadableChapter), 0);
    }
  };
  const handleSetReadlistStatus = async (status) => {
    if (!mangaId) return;
    if (!user) {
      navigate("/auth");
      return;
    }
    await addToReadlist.mutateAsync({
      mangaId,
      mangaTitle: displayTitle,
      mangaPoster: info.coverImage || null,
      format: classifyReadingFormat({ format: info.format, countryOfOrigin: info.origin }),
      status,
      lastChapterKey: (readlistEntry == null ? void 0 : readlistEntry.last_chapter_key) || null,
      lastChapterNumber: (readlistEntry == null ? void 0 : readlistEntry.last_chapter_number) ?? null,
      lastChapterTitle: (readlistEntry == null ? void 0 : readlistEntry.last_chapter_title) || null,
      lastProvider: (readlistEntry == null ? void 0 : readlistEntry.last_provider) || null,
      lastLanguage: (readlistEntry == null ? void 0 : readlistEntry.last_language) || null,
      lastPageIndex: Number((readlistEntry == null ? void 0 : readlistEntry.last_page_index) || 0),
      totalPages: (readlistEntry == null ? void 0 : readlistEntry.total_pages) ?? null
    });
  };
  const handleRemoveReadlist = async () => {
    if (mangaId) await removeFromReadlist.mutateAsync({ mangaId });
  };
  const READLIST_STATUS_OPTIONS = [
    { value: "plan_to_read", label: "Plan to Read" },
    { value: "reading", label: "Reading" },
    { value: "completed", label: "Completed" },
    { value: "on_hold", label: "On Hold" },
    { value: "dropped", label: "Dropped" }
  ];
  const currentReadlistStatus = readlistEntry == null ? void 0 : readlistEntry.status;
  const currentReadlistLabel = (_p = READLIST_STATUS_OPTIONS.find((o) => o.value === currentReadlistStatus)) == null ? void 0 : _p.label;
  const displayRating = typeof info.score === "number" && Number.isFinite(info.score) ? (info.score / 10).toFixed(1) : null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Helmet, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("title", { children: [
        displayTitle,
        " — Manga on Tatakai"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("meta", { name: "description", content: ((_q = info.synopsis) == null ? void 0 : _q.slice(0, 160)) || `Track ${displayTitle}, rate it, and add it to your lists on Tatakai.` }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("meta", { property: "og:title", content: `${displayTitle} — Manga on Tatakai` }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("meta", { property: "og:description", content: ((_r = info.synopsis) == null ? void 0 : _r.slice(0, 160)) || `Track and discuss ${displayTitle} on Tatakai — the otaku community.` }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("meta", { property: "og:image", content: info.coverImage || "" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("meta", { property: "og:type", content: "book" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("meta", { name: "twitter:card", content: "summary_large_image" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary/30", children: [
      !isNative && /* @__PURE__ */ jsxRuntimeExports.jsx(Background, {}),
      showSidebar && /* @__PURE__ */ jsxRuntimeExports.jsx(Sidebar, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: cn(
        "relative z-10 py-6 max-w-[1800px] mx-auto pb-24 lg:pb-6",
        isNative ? "px-4 pt-4" : "pl-6 md:pl-32 pr-6 pt-10"
      ), children: [
        bannerUrl && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute top-0 left-0 w-full h-[50vh] xl:h-[60vh] -z-10 overflow-hidden opacity-30 md:opacity-40", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: bannerUrl,
              alt: "Banner",
              className: "w-full h-full object-cover blur-[12px] brightness-[0.6] transform scale-105"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-background/10 via-background/60 to-background" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: () => navigate(-1),
            className: "flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6 group w-fit",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4 group-hover:-translate-x-1 transition-transform" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-sm", children: "Back" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16 pt-4 md:pt-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(GlassPanel, { className: "overflow-hidden mx-auto lg:mx-0 w-full max-w-[320px] lg:max-w-none", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: coverImageSrc,
              alt: displayTitle,
              className: "w-full aspect-[2/3] object-cover",
              onError: () => {
                if (rawCoverImage && !coverFallbackTried && coverImageSrc !== rawCoverImage) {
                  setCoverFallbackTried(true);
                  setCoverImageSrc(rawCoverImage);
                  return;
                }
                if (coverImageSrc !== "/placeholder.svg") {
                  setCoverImageSrc("/placeholder.svg");
                }
              }
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-2 space-y-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-4xl md:text-5xl font-bold mb-4", children: displayTitle }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2 mb-4", children: [
                info.inDb ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-400 text-xs font-medium", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3.5 h-3.5" }),
                  "In Tatakai DB"
                ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-muted text-muted-foreground text-xs font-medium", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Database, { className: "w-3.5 h-3.5" }),
                  "Not in DB yet"
                ] }),
                isAdmin && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    size: "sm",
                    variant: "outline",
                    className: "h-7 gap-1.5 text-xs",
                    onClick: () => setEditOpen(true),
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "w-3.5 h-3.5" }),
                      "Edit content"
                    ]
                  }
                )
              ] }),
              isAdmin && /* @__PURE__ */ jsxRuntimeExports.jsx(
                ContentEditSheet,
                {
                  open: editOpen,
                  onOpenChange: setEditOpen,
                  mediaType: "manga",
                  title: displayTitle,
                  id: (info.anilistId ? String(info.anilistId) : "") || info.tatakaiId || mangaId || "",
                  initial: {
                    title_romaji: ((_s = info.title) == null ? void 0 : _s.romaji) ?? "",
                    title_english: ((_t = info.title) == null ? void 0 : _t.english) ?? "",
                    title_native: ((_u = info.title) == null ? void 0 : _u.native) ?? "",
                    description: info.synopsis ?? "",
                    cover_image_large: info.coverImage ?? "",
                    cover_image_medium: info.coverImageMedium ?? "",
                    banner_image: info.bannerImage ?? "",
                    trailer_url: info.trailerUrl ?? "",
                    format: info.format ?? "",
                    status: info.status ?? "",
                    country_of_origin: info.origin ?? "",
                    rating: info.rating ?? "",
                    chapters: info.totalChapters ?? "",
                    volumes: info.totalVolumes ?? "",
                    average_score: info.score ?? "",
                    mean_score: info.meanScore ?? "",
                    popularity: info.popularity ?? "",
                    favourites: info.favourites ?? "",
                    genres: (info.genres ?? []).join(", ")
                  }
                }
              ),
              isNative && info && /* @__PURE__ */ jsxRuntimeExports.jsx(
                MangaDownloadModal,
                {
                  isOpen: showMangaDownload,
                  onClose: () => setShowMangaDownload(false),
                  chapters,
                  anilistId: Number(info.anilistId) || 0,
                  title: displayTitle,
                  posterUrl: coverImageSrc,
                  kind: mangaDownloadKind
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-3 mb-6", children: [
                displayRating && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber/20 text-amber", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-4 h-4 fill-amber" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold", children: displayRating })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-4 h-4" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "capitalize", children: playlistMediaFormat })
                ] }),
                info.status && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary/20 text-primary", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold capitalize", children: String(info.status).toLowerCase().replace(/_/g, " ") }) }),
                typeof info.totalChapters === "number" && info.totalChapters > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Layers, { className: "w-4 h-4" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                    info.totalChapters,
                    " Chapters"
                  ] })
                ] }),
                typeof info.totalVolumes === "number" && info.totalVolumes > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-4 h-4" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                    info.totalVolumes,
                    " Volumes"
                  ] })
                ] })
              ] }),
              info.authors && info.authors.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-sm md:text-base font-medium flex flex-wrap items-center gap-2 mb-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-4 h-4 shrink-0" }),
                "By",
                " ",
                info.authors.map((author, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    className: "hover:text-primary transition-colors",
                    onClick: () => navigate(`/search?q=${encodeURIComponent(author)}`),
                    children: [
                      author,
                      idx < info.authors.length - 1 ? "," : ""
                    ]
                  },
                  author
                ))
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2 mb-3", children: (_v = info.genres) == null ? void 0 : _v.map((genre) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => navigate(`/search?genre=${encodeURIComponent(genre)}&type=manga`),
                  className: "px-3 py-1.5 rounded-lg bg-muted text-sm font-medium hover:bg-primary/20 hover:text-primary transition-colors",
                  children: genre
                },
                genre
              )) }),
              combinedMangaTags.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-1.5 mb-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs uppercase tracking-wider text-muted-foreground font-semibold mr-1 flex items-center gap-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Tag, { className: "w-3 h-3 text-primary" }),
                  "Tags:"
                ] }),
                combinedMangaTags.slice(0, 14).map((tag) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    onClick: () => navigate(`/search?mangaTag=${encodeURIComponent(tag.name)}&type=manga`),
                    className: "px-2.5 py-0.5 rounded-full bg-white/5 hover:bg-primary/20 border border-white/10 hover:border-primary/40 text-xs text-muted-foreground hover:text-primary transition-all flex items-center gap-1 group",
                    title: tag.rank ? `${tag.name} (${tag.rank}%) • Click to search` : `${tag.name} • Click to search`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: tag.name }),
                      typeof tag.rank === "number" && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] text-muted-foreground/60 group-hover:text-primary/70", children: [
                        tag.rank,
                        "%"
                      ] })
                    ]
                  },
                  `hero-tag-${tag.id || tag.name}`
                ))
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  onClick: handleReadNow,
                  disabled: sortedChapters.length === 0,
                  className: "flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-3.5 rounded-xl font-bold hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-primary/25 disabled:opacity-50 disabled:cursor-not-allowed group",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-5 h-5 group-hover:scale-110 transition-transform" }),
                    hasSavedProgress ? "Continue Reading" : "Read From Chapter 1"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                AddToPlaylistButton,
                {
                  animeId: `manga:${String(info.anilistId || info.malId || mangaId || "")}`,
                  animeName: displayTitle,
                  animePoster: info.coverImage || void 0,
                  mediaType: "manga",
                  mediaFormat: playlistMediaFormat,
                  className: "h-auto border border-white/15 bg-white/5 text-foreground px-6 py-3.5 rounded-xl font-bold hover:bg-white/10 active:scale-95 transition-all"
                }
              ),
              isNative && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  onClick: () => setShowMangaDownload(true),
                  disabled: sortedChapters.length === 0,
                  className: "flex items-center justify-center gap-2 border border-white/15 bg-white/5 text-foreground px-6 py-3.5 rounded-xl font-bold hover:bg-white/10 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed",
                  title: "Download all chapters",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-5 h-5" }),
                    "Download"
                  ]
                }
              ),
              !user ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  onClick: () => navigate("/auth"),
                  className: "flex items-center justify-center gap-2 border border-white/15 bg-white/5 text-foreground px-6 py-3.5 rounded-xl font-bold hover:bg-white/10 active:scale-95 transition-all",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(BookmarkPlus, { className: "w-5 h-5" }),
                    "Sign In for Readlist"
                  ]
                }
              ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenu, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    disabled: addToReadlist.isPending || removeFromReadlist.isPending,
                    className: "flex items-center justify-center gap-2 border border-white/15 bg-white/5 text-foreground px-6 py-3.5 rounded-xl font-bold hover:bg-white/10 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed",
                    children: [
                      currentReadlistStatus ? /* @__PURE__ */ jsxRuntimeExports.jsx(BookmarkCheck, { className: "w-5 h-5 text-primary" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(BookmarkPlus, { className: "w-5 h-5" }),
                      currentReadlistLabel ?? "Add to Readlist",
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "w-4 h-4 opacity-60" })
                    ]
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuContent, { align: "end", className: "w-48", children: [
                  READLIST_STATUS_OPTIONS.map((option) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                    DropdownMenuItem,
                    {
                      onClick: () => handleSetReadlistStatus(option.value),
                      className: currentReadlistStatus === option.value ? "bg-primary/20" : "",
                      children: option.label
                    },
                    option.value
                  )),
                  currentReadlistStatus && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuSeparator, {}),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      DropdownMenuItem,
                      {
                        onClick: handleRemoveReadlist,
                        className: "text-destructive focus:text-destructive",
                        children: "Remove from Readlist"
                      }
                    )
                  ] })
                ] })
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_380px] gap-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8 min-w-0", children: [
            info.synopsis && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-display text-xl md:text-2xl font-bold mb-4 flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-5 h-5 text-primary" }),
                "Synopsis"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(GlassPanel, { className: "p-6 md:p-8 relative overflow-hidden group", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground leading-relaxed whitespace-pre-wrap relative z-10 text-sm md:text-base", children: info.synopsis }) })
            ] }),
            combinedMangaTags.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-display text-xl md:text-2xl font-bold mb-4 flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Palette, { className: "w-5 h-5 text-primary" }),
                "Tags"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(GlassPanel, { className: "p-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5", children: combinedMangaTags.slice(0, 40).map((tag) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  onClick: () => navigate(`/search?mangaTag=${encodeURIComponent(tag.name)}&type=manga`),
                  className: `px-2.5 py-1 rounded-lg text-[11px] font-semibold border transition-colors hover:border-primary/40 hover:text-primary flex items-center gap-1 ${tag.weight === "defining" ? "bg-primary/10 border-primary/20 text-primary/80" : tag.weight === "core" ? "bg-white/5 border-white/10 text-foreground/70" : "bg-white/[0.03] border-white/5 text-muted-foreground"}`,
                  title: tag.rank ? `${tag.name} (${tag.rank}%) • Click to search` : `${tag.name} • Click to search`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: tag.name }),
                    typeof tag.rank === "number" && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[9px] opacity-60", children: [
                      tag.rank,
                      "%"
                    ] })
                  ]
                },
                `tag-${tag.id ?? tag.name}`
              )) }) })
            ] }),
            info.relations && info.relations.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mb-8", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-display text-xl md:text-2xl font-bold mb-4 flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(GitGraph, { className: "w-5 h-5 text-primary" }),
                "Series Tree"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(RelationTree, { relations: info.relations })
            ] }),
            info.characters && info.characters.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mb-10", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-display text-xl md:text-2xl font-bold mb-6 flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-5 h-5 text-primary" }),
                "Characters"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-3", children: info.characters.slice(0, 12).map((char, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                GlassPanel,
                {
                  className: "p-0 overflow-hidden cursor-pointer group hover:bg-white/10 transition-colors",
                  onClick: () => navigate(
                    `/character/${char.id || encodeURIComponent(char.name)}?name=${encodeURIComponent(char.name)}`
                  ),
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "img",
                      {
                        src: getProxiedImageUrl(char.image || char.poster || char.imageUrl || "") || "/placeholder.svg",
                        alt: char.name,
                        className: "w-full aspect-[2/3] object-cover",
                        loading: "lazy"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-xs truncate group-hover:text-primary transition-colors", children: char.name }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[9px] text-muted-foreground uppercase tracking-wider truncate", children: char.role || "Character" })
                    ] })
                  ]
                },
                `${char.id || char.name}-${index}`
              )) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { id: "manga-chapters-section", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 space-y-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center justify-between gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-display text-xl md:text-2xl font-bold flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Layers, { className: "w-5 h-5 text-primary" }),
                    "Chapters"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                    isNative && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Button,
                      {
                        size: "sm",
                        onClick: () => setShowMangaDownload(true),
                        disabled: chapters.length === 0,
                        className: "h-8 gap-1.5 rounded-lg glow-primary text-xs font-bold",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-3.5 h-3.5" }),
                          "Download all"
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[11px] font-bold uppercase tracking-wider text-muted-foreground", children: "Sort by" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "select",
                      {
                        value: chapterSortMode,
                        onChange: (event) => setChapterSortMode(event.target.value),
                        className: "rounded-lg border border-white/10 bg-background/70 px-2.5 py-1.5 text-xs font-semibold",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "newest", children: "Newest first" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "oldest", children: "Oldest first" })
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-bold text-muted-foreground bg-muted px-3 py-1 rounded-full", children: isChapterListLoading ? "Loading..." : hasChapterFilters ? `${filteredDisplayChapters.length} of ${displayChapters.length} matches` : `${displayChapters.length} available` })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2 md:flex-row md:items-center", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1 min-w-[220px]", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "input",
                      {
                        value: chapterSearchTerm,
                        onChange: (event) => setChapterSearchTerm(event.target.value),
                        placeholder: "Search chapter number/title/provider",
                        className: "w-full rounded-xl border border-white/10 bg-background/70 pl-9 pr-3 py-2 text-sm font-medium text-foreground focus:border-primary/50 focus:outline-none"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[11px] font-bold uppercase tracking-wider text-muted-foreground", children: "Volume" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "select",
                      {
                        value: selectedVolumeFilter == null ? "all" : String(selectedVolumeFilter),
                        onChange: (event) => {
                          const nextValue = event.target.value;
                          if (nextValue === "all") {
                            setSelectedVolumeFilter(null);
                            return;
                          }
                          setSelectedVolumeFilter(Number(nextValue));
                          setChapterSearchTerm("");
                        },
                        className: "rounded-lg border border-white/10 bg-background/70 px-2.5 py-1.5 text-xs font-semibold",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "all", children: "All volumes" }),
                          volumeSections.map((volumeItem) => /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: volumeItem.volume, children: [
                            "Volume ",
                            volumeItem.volume
                          ] }, `volume-filter-${volumeItem.volume}`))
                        ]
                      }
                    )
                  ] }),
                  (chapterSearchTerm.trim().length > 0 || selectedVolumeFilter != null) && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      onClick: () => {
                        setChapterSearchTerm("");
                        setSelectedVolumeFilter(null);
                      },
                      className: "rounded-lg border border-white/15 bg-white/5 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider hover:bg-white/10 transition-colors",
                      children: "Clear"
                    }
                  )
                ] }),
                hasChapterGroups && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: chapterGroups.map((group, index) => {
                  const range = chapterGroupRanges[index] || { start: 1, end: group.length };
                  const isActiveGroup = index === activeChapterGroup;
                  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "button",
                    {
                      onClick: () => setSelectedChapterGroup(index),
                      className: cn(
                        "px-3 py-1.5 rounded-full text-xs font-bold border transition-colors",
                        isActiveGroup ? "bg-primary text-primary-foreground border-primary" : "bg-white/5 text-muted-foreground border-white/10 hover:bg-white/10 hover:text-foreground"
                      ),
                      title: `${group.length} chapters`,
                      children: [
                        range.start,
                        "-",
                        range.end
                      ]
                    },
                    `chapter-group-${range.start}-${range.end}-${index}`
                  );
                }) }),
                hasChapterGroups && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: (() => {
                  const activeRange = chapterGroupRanges[activeChapterGroup];
                  if (!activeRange) return `Showing ${filteredDisplayChapters.length} chapters`;
                  return `Showing chapters ${activeRange.start}-${activeRange.end} of ${filteredDisplayChapters.length}`;
                })() })
              ] }),
              isChapterListLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(GlassPanel, { className: "p-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-2 text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Loading chapters..." })
              ] }) }) : filteredDisplayChapters.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-2", children: chapterCards.map((chapter) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                (chapter._kitsuThumbnail || chapter._kitsuSynopsis) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-1 flex gap-3 px-3 pt-3 pb-0", children: [
                  chapter._kitsuThumbnail && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "img",
                    {
                      src: chapter._kitsuThumbnail,
                      alt: "",
                      className: "w-16 h-10 object-cover rounded-lg border border-white/10 shrink-0",
                      loading: "lazy"
                    }
                  ),
                  chapter._kitsuSynopsis && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground line-clamp-2 leading-relaxed", children: chapter._kitsuSynopsis })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  MangaChapterProviderRows,
                  {
                    chapter: {
                      chapterNumber: chapter.chapterNumber ?? null,
                      chapterTitle: chapter.chapterTitle ?? null,
                      sources: (chapter.sources || []).map((src) => ({
                        provider: src.provider,
                        chapterKey: src.chapterKey || "",
                        providerChapterId: src.providerChapterId || src.chapterKey || "",
                        language: src.language ?? null,
                        scanlator: src.scanlator ?? null
                      }))
                    },
                    bestSource: getBestSource(chapter),
                    preferredProvider,
                    effectivePreferredLanguage,
                    onNavigate: (provider, chapterKey) => {
                      var _a2;
                      const src = (_a2 = chapter.sources) == null ? void 0 : _a2.find(
                        (s) => s.provider === provider && s.chapterKey === chapterKey
                      );
                      goToReader(
                        chapter,
                        src ?? { provider, chapterKey, providerChapterId: chapterKey },
                        0
                      );
                    }
                  },
                  `${chapter.canonicalOrder}-${chapter.chapterNumber ?? "?"}`
                )
              ] }, `${chapter.canonicalOrder}-${chapter.chapterNumber ?? "?"}`)) }) : /* @__PURE__ */ jsxRuntimeExports.jsx(GlassPanel, { className: "p-8 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: sortedChapters.length === 0 ? "No chapters available yet." : hasChapterFilters ? "No chapters match your current filters or search." : "No chapters match the selected provider/language filters. Try Auto." }) })
            ] }),
            volumeSections.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-display text-xl md:text-2xl font-bold mb-4 flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Layers, { className: "w-5 h-5 text-primary" }),
                "Volumes"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3", children: volumeSections.map((volumeItem) => /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassPanel, { className: "p-4 border border-white/10", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-base font-bold", children: [
                    "Volume ",
                    volumeItem.volume
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] uppercase tracking-wider text-muted-foreground", children: [
                    volumeItem.readableCount,
                    "/",
                    volumeItem.chapterCount,
                    " readable"
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-2 text-xs uppercase tracking-wider text-muted-foreground", children: [
                  "Chapters ",
                  volumeItem.rangeLabel
                ] }),
                volumeItem.firstChapterTitle && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 text-xs text-foreground/80 line-clamp-1", children: [
                  "Starts: ",
                  volumeItem.firstChapterTitle
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex flex-wrap gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      onClick: () => goToReader(volumeItem.firstChapter, volumeItem.firstSource, 0),
                      disabled: !volumeItem.firstChapterKey,
                      className: "rounded-lg bg-primary px-3 py-1.5 text-xs font-bold text-primary-foreground hover:brightness-110 disabled:opacity-40 disabled:cursor-not-allowed transition-colors",
                      children: "Read Volume"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      onClick: () => goToReader(volumeItem.latestChapter, volumeItem.latestSource, 0),
                      disabled: !volumeItem.latestChapterKey,
                      className: "rounded-lg border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-bold hover:bg-white/10 disabled:opacity-40 disabled:cursor-not-allowed transition-colors",
                      children: "Latest in Volume"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      onClick: () => {
                        setSelectedVolumeFilter(volumeItem.volume);
                        setChapterSearchTerm("");
                        setSelectedChapterGroup(0);
                        setChapterSortMode("oldest");
                        const chapterSection = document.getElementById("manga-chapters-section");
                        chapterSection == null ? void 0 : chapterSection.scrollIntoView({ behavior: "smooth", block: "start" });
                      },
                      className: "rounded-lg border border-primary/30 bg-primary/10 px-3 py-1.5 text-xs font-bold text-primary hover:bg-primary/20 transition-colors",
                      children: "View Chapters"
                    }
                  )
                ] }),
                volumeItem.readableChapters.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex flex-wrap gap-1.5", children: [
                  volumeItem.readableChapters.slice(0, 6).map((chapterItem) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      onClick: () => goToReader(chapterItem.chapter, chapterItem.source, 0),
                      className: "rounded-md border border-white/15 bg-white/5 px-2 py-1 text-[10px] font-bold uppercase tracking-wider hover:bg-white/10 transition-colors",
                      children: chapterItem.chapterNumber != null ? `Ch ${chapterItem.chapterNumber}` : "Open chapter"
                    },
                    `volume-${volumeItem.volume}-chapter-${chapterItem.chapterKey}`
                  )),
                  volumeItem.readableChapters.length > 6 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "rounded-md border border-white/10 bg-white/5 px-2 py-1 text-[10px] uppercase tracking-wider text-muted-foreground", children: [
                    "+",
                    volumeItem.readableChapters.length - 6,
                    " more"
                  ] })
                ] })
              ] }, `volume-${volumeItem.volume}`)) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-display text-xl md:text-2xl font-bold mb-4 flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-5 h-5 text-primary" }),
                "Recommendations"
              ] }),
              loadingRecommendations && mergedRecommendations.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4", children: Array.from({ length: 8 }).map((_, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "aspect-[2/3] rounded-2xl" }, `rec-skeleton-${index}`)) }) : mergedRecommendations.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4", children: mergedRecommendations.map((card) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col", children: /* @__PURE__ */ jsxRuntimeExports.jsx(UnifiedMediaCard, { item: card, className: "flex-1" }) }, `manga-rec-${card.id}`)) }) : /* @__PURE__ */ jsxRuntimeExports.jsx(GlassPanel, { className: "p-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Recommendations are warming up. Check back in a moment." }) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("section", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Comments,
              {
                entityType: "manga",
                entityId: String(mangaId || info.anilistId || info.malId || ""),
                entityName: displayTitle
              }
            ) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassPanel, { className: "p-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-display font-bold mb-3", children: "Metadata" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "mb-1 block text-[11px] font-bold uppercase tracking-wider text-muted-foreground", children: "Preferred source" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "select",
                {
                  value: preferredProvider,
                  onChange: (event) => setPreferredProvider(event.target.value),
                  className: "w-full rounded-xl border border-white/10 bg-background/70 px-3 py-2 text-sm font-medium text-foreground focus:border-primary/50 focus:outline-none",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "auto", children: "Auto (Best source per chapter)" }),
                    providerOptions.map((provider) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: provider, children: provider }, provider))
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "mb-1 block text-[11px] font-bold uppercase tracking-wider text-muted-foreground", children: "Preferred language" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "select",
                {
                  value: preferredLanguage,
                  onChange: (event) => setPreferredLanguage(event.target.value),
                  className: "w-full rounded-xl border border-white/10 bg-background/70 px-3 py-2 text-sm font-medium text-foreground focus:border-primary/50 focus:outline-none",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "auto", children: profilePreferredMangaLanguage === "auto" ? "Auto (All languages)" : `Auto (Display setting: ${formatLanguageLabel(profilePreferredMangaLanguage)})` }),
                    languageOptions.map((language) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: language.value, children: language.label }, language.value))
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 text-sm text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
                "Status: ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: info.status || "unknown" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
                "Format: ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: info.mediaType || "manga" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
                "Total chapters: ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: info.totalChapters ?? (anilistMetadata == null ? void 0 : anilistMetadata.chapters) ?? "?" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
                "Total volumes: ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: info.totalVolumes ?? (anilistMetadata == null ? void 0 : anilistMetadata.volumes) ?? "?" })
              ] }),
              info.publishers && info.publishers.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
                "Publishers: ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: info.publishers.join(", ") })
              ] }),
              (jikanData == null ? void 0 : jikanData.serializations) && jikanData.serializations.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
                "Serialization: ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: jikanData.serializations.map((s) => s.name).join(", ") })
              ] }),
              info.yearStart && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
                "Aired: ",
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-foreground", children: [
                  info.yearStart,
                  info.yearEnd ? ` to ${info.yearEnd}` : " (Ongoing)"
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-2 text-[11px] font-bold uppercase tracking-wider text-muted-foreground", children: "Genres" }),
              info.genres && info.genres.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5", children: info.genres.map((genre) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => navigate(`/manga/genre/${encodeURIComponent(genre)}`),
                  className: "rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-foreground transition-colors hover:border-primary/40 hover:text-primary",
                  children: genre
                },
                `meta-genre-${genre}`
              )) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No genres available." })
            ] }),
            Array.isArray(anilistMangaMeta == null ? void 0 : anilistMangaMeta.tags) && anilistMangaMeta.tags.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-2 text-[11px] font-bold uppercase tracking-wider text-muted-foreground", children: "AniList Tags" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5", children: anilistMangaMeta.tags.filter((tag) => tag == null ? void 0 : tag.name).map((tag) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  title: tag.isAdult ? "Adult AniList tag" : "Search this AniList tag",
                  onClick: () => navigate(`/search?mangaTag=${encodeURIComponent(tag.name)}&type=manga`),
                  className: "rounded-md border border-primary/20 bg-primary/5 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary/80 transition-colors hover:border-primary/40 hover:bg-primary/15",
                  children: [
                    "#",
                    tag.name
                  ]
                },
                tag.name
              )) })
            ] }),
            mangaBakaData && Object.keys(mangaBakaData.sources).length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 pt-4 border-t border-white/5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-2 text-[11px] font-bold uppercase tracking-wider text-muted-foreground", children: "Cross-site Ratings" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1.5", children: Object.entries(mangaBakaData.sources).filter(([, src]) => src.ratingNormalized !== null).sort(([, a], [, b]) => (b.ratingNormalized ?? 0) - (a.ratingNormalized ?? 0)).map(([key, src]) => {
                const label = key === "anilist" ? "AniList" : key === "my_anime_list" ? "MAL" : key === "kitsu" ? "Kitsu" : key === "manga_updates" ? "MU" : key === "anime_planet" ? "AP" : key === "shikimori" ? "Shikimori" : key === "anime_news_network" ? "ANN" : key.replace(/_/g, " ");
                const pct = Math.round(src.ratingNormalized ?? 0);
                return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground w-16 shrink-0", children: label }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-1.5 rounded-full bg-white/10 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full bg-primary rounded-full", style: { width: `${pct}%` } }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-bold text-foreground/70 w-8 text-right", children: src.rating !== null ? src.rating.toFixed(2) : "—" })
                ] }, key);
              }) })
            ] }),
            mangaBakaData && mangaBakaData.publishers.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 pt-4 border-t border-white/5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-2 text-[11px] font-bold uppercase tracking-wider text-muted-foreground", children: "Publishers" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1", children: mangaBakaData.publishers.map((pub, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-xs", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground/80", children: pub.name }),
                pub.type && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] text-muted-foreground px-1.5 py-0.5 rounded bg-white/5", children: [
                  pub.type,
                  pub.note ? ` · ${pub.note}` : ""
                ] })
              ] }, i)) })
            ] }),
            (mangaBakaData == null ? void 0 : mangaBakaData.animeCoverage) && mangaBakaData.hasAnime && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 pt-4 border-t border-white/5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-1.5 text-[11px] font-bold uppercase tracking-wider text-muted-foreground", children: "Anime Coverage" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-foreground/80", children: [
                mangaBakaData.animeCoverage.start && `From: ${mangaBakaData.animeCoverage.start}`,
                mangaBakaData.animeCoverage.end && ` → ${mangaBakaData.animeCoverage.end}`
              ] })
            ] }),
            mangaBakaData && mangaBakaData.links.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 pt-4 border-t border-white/5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-2 text-[11px] font-bold uppercase tracking-wider text-muted-foreground", children: "External Links" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5", children: mangaBakaData.links.slice(0, 6).map((link, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                "a",
                {
                  href: link.url,
                  target: "_blank",
                  rel: "noopener noreferrer",
                  className: "px-2 py-1 rounded-md border border-white/10 bg-white/5 text-[10px] font-semibold text-muted-foreground hover:text-primary hover:border-primary/30 transition-colors",
                  children: link.label
                },
                i
              )) })
            ] })
          ] }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(MobileNav, {})
    ] })
  ] });
}
export {
  MangaPage as default
};
