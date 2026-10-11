const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/index.C6yfkT5T.js","assets/react-vendor.CAo4XUiA.js","assets/vendor.CJyRs4QS.js","assets/tanstack.DPr3OB19.js","assets/supabase.WuRMX5Dg.js","assets/radix.BiK9uYXL.js","assets/icons.C2gBBarQ.js","assets/motion.DVGLRFCH.js","assets/hls.BlgtCWcq.js","assets/editor.Dxw8dtyw.js","assets/charts.Dr1fgDJ-.js","assets/index.CWbmAlRn.css"])))=>i.map(i=>d[i]);
import { bj as KeepAwake, b9 as __vitePreload } from "./vendor.CJyRs4QS.js";
import { r as reactExports, e as useNavigate, u as useLocation, i as useParams, l as useSearchParams, j as jsxRuntimeExports } from "./react-vendor.CAo4XUiA.js";
import { u as useQueryClient, a as useQuery } from "./tanstack.DPr3OB19.js";
import { eT as normalizeKeyToken, eU as resolveReaderAction, eV as getMangaReadByKey, D as useIsNativeApp, u as useAuth, eW as useReaderSettings, eX as useReaderKeybinds, eJ as useMangaChapters, eI as useMangaDetail, eY as setReadingMangaRpc, cG as clearDiscordRpc, T as triggerHaptic, eZ as useSaveMangaReadingProgress, e_ as storeMangaTotalChapters, cd as isMobileProxyUrl, dk as fetchViaMobileProxy, e$ as DEFAULT_SETTINGS, Q as Background, G as GlassPanel, eQ as Comments, a4 as Sheet, a5 as SheetContent, a6 as SheetHeader, a7 as SheetTitle, f0 as ReaderPanel, bq as Tabs, br as TabsList, bs as TabsTrigger, bu as TabsContent, dx as getProfileKnobs, dy as getEffectiveMemoryProfile } from "./index.C6yfkT5T.js";
import { p as pickMangaChapterSource, s as sortMangaChapterSources, n as nextMangaChapterSource } from "./mangaSourceSelection.CDjYicHn.js";
import { R as ReaderImage, r as readerPageRenderKey } from "./ReaderImage.mF082x-K.js";
import { aS as Puzzle, u as ArrowLeft, aG as ChevronLeft, aZ as List, b as ChevronRight, bf as Settings2, cz as Minimize, bn as Maximize, I as Info, bA as House, bZ as Camera, y as MessageSquare, R as RefreshCw, Q as LoaderCircle, S as Search } from "./icons.C2gBBarQ.js";
import "./supabase.WuRMX5Dg.js";
import "./radix.BiK9uYXL.js";
import "./motion.DVGLRFCH.js";
import "./hls.BlgtCWcq.js";
import "./editor.Dxw8dtyw.js";
import "./charts.Dr1fgDJ-.js";
function useReaderKeyboard(keybinds, handlers, enabled = true) {
  reactExports.useEffect(() => {
    if (!enabled) return;
    const handleKeyDown = (e) => {
      var _a;
      const target = e.target;
      const activeTag = ((target == null ? void 0 : target.tagName) || ((_a = document.activeElement) == null ? void 0 : _a.tagName) || "").toUpperCase();
      if (activeTag === "INPUT" || activeTag === "TEXTAREA" || (target == null ? void 0 : target.isContentEditable)) return;
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      const token = normalizeKeyToken(e);
      const action = resolveReaderAction(keybinds, token);
      if (!action) return;
      const run = {
        nextPage: handlers.nextPage,
        prevPage: handlers.prevPage,
        nextChapter: handlers.nextChapter,
        prevChapter: handlers.prevChapter,
        toggleFullscreen: handlers.toggleFullscreen,
        toggleDirection: handlers.toggleDirection,
        zoomIn: handlers.zoomIn,
        zoomOut: handlers.zoomOut,
        toggleComments: handlers.toggleComments,
        reload: handlers.reload
      };
      const fn = run[action];
      if (fn) {
        e.preventDefault();
        fn();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [enabled, keybinds, handlers]);
}
function useContinuousReader(params) {
  const { enabled, mangaId, chapters, entryIndex, preferProvider } = params;
  const [after, setAfter] = reactExports.useState([]);
  const [before, setBefore] = reactExports.useState([]);
  const [loadingNext, setLoadingNext] = reactExports.useState(false);
  const [loadingPrev, setLoadingPrev] = reactExports.useState(false);
  const busyRef = reactExports.useRef(/* @__PURE__ */ new Set());
  const doneRef = reactExports.useRef(/* @__PURE__ */ new Set());
  const generationRef = reactExports.useRef(0);
  reactExports.useEffect(() => {
    generationRef.current += 1;
    setAfter([]);
    setBefore([]);
    busyRef.current = /* @__PURE__ */ new Set();
    doneRef.current = new Set(entryIndex >= 0 ? [entryIndex] : []);
  }, [entryIndex, mangaId, enabled]);
  const loadChapter = reactExports.useCallback(
    async (index) => {
      var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p;
      const chapter = chapters[index];
      if (!chapter) return null;
      const source = pickMangaChapterSource(chapter.sources, preferProvider);
      if (!source) return null;
      const alternatives = sortMangaChapterSources(chapter.sources);
      const resp = await getMangaReadByKey(mangaId, source.chapterKey, {
        provider: source.provider,
        providerChapterId: source.providerChapterId,
        alternatives
      });
      const pages = ((_a = resp == null ? void 0 : resp.data) == null ? void 0 : _a.pages) ?? [];
      if (!pages.length) return null;
      const servedProvider = ((_c = (_b = resp == null ? void 0 : resp.data) == null ? void 0 : _b.chapter) == null ? void 0 : _c.provider) || source.provider;
      const servedKey = ((_e = (_d = resp == null ? void 0 : resp.data) == null ? void 0 : _d.chapter) == null ? void 0 : _e.chapterKey) || source.chapterKey;
      const servedSource = ((_f = chapter.sources) == null ? void 0 : _f.find(
        (candidate) => candidate.provider === servedProvider && candidate.chapterKey === servedKey
      )) || source;
      return {
        index,
        key: servedKey,
        number: chapter.chapterNumber,
        title: chapter.chapterTitle || (chapter.chapterNumber != null ? `Chapter ${chapter.chapterNumber}` : "Chapter"),
        provider: servedProvider,
        language: ((_h = (_g = resp == null ? void 0 : resp.data) == null ? void 0 : _g.chapter) == null ? void 0 : _h.language) ?? servedSource.language,
        pages,
        scanlator: servedSource.scanlator ?? null,
        providerChapterId: ((_j = (_i = resp == null ? void 0 : resp.data) == null ? void 0 : _i.chapter) == null ? void 0 : _j.providerChapterId) || servedSource.providerChapterId || null,
        extensionId: ((_l = (_k = resp == null ? void 0 : resp.data) == null ? void 0 : _k.readMeta) == null ? void 0 : _l.provider) ?? ((_n = (_m = resp == null ? void 0 : resp.data) == null ? void 0 : _m.chapter) == null ? void 0 : _n.provider) ?? null,
        requestedProvider: source.provider,
        fallbackUsed: Boolean((_p = (_o = resp == null ? void 0 : resp.data) == null ? void 0 : _o.readMeta) == null ? void 0 : _p.fallbackUsed) || servedProvider !== source.provider
      };
    },
    [chapters, mangaId, preferProvider]
  );
  const appendNext = reactExports.useCallback(async () => {
    if (!enabled) return;
    const lastIdx = after.length ? after[after.length - 1].index : entryIndex;
    const nextIdx = lastIdx + 1;
    if (nextIdx <= 0 && entryIndex < 0) return;
    if (nextIdx >= chapters.length) return;
    if (busyRef.current.has(nextIdx) || doneRef.current.has(nextIdx)) return;
    busyRef.current.add(nextIdx);
    setLoadingNext(true);
    const gen = generationRef.current;
    try {
      const seg = await loadChapter(nextIdx);
      if (gen !== generationRef.current) return;
      if (seg) {
        doneRef.current.add(nextIdx);
        setAfter((prev) => prev.some((s) => s.index === nextIdx) ? prev : [...prev, seg]);
      }
    } catch {
    } finally {
      busyRef.current.delete(nextIdx);
      if (gen === generationRef.current) setLoadingNext(false);
    }
  }, [enabled, after, entryIndex, chapters.length, loadChapter]);
  const prependPrev = reactExports.useCallback(async () => {
    if (!enabled) return;
    const firstIdx = before.length ? before[0].index : entryIndex;
    const prevIdx = firstIdx - 1;
    if (prevIdx < 0) return;
    if (busyRef.current.has(prevIdx) || doneRef.current.has(prevIdx)) return;
    busyRef.current.add(prevIdx);
    setLoadingPrev(true);
    const gen = generationRef.current;
    try {
      const seg = await loadChapter(prevIdx);
      if (gen !== generationRef.current) return;
      if (seg) {
        doneRef.current.add(prevIdx);
        setBefore((prev) => prev.some((s) => s.index === prevIdx) ? prev : [seg, ...prev]);
      }
    } catch {
    } finally {
      busyRef.current.delete(prevIdx);
      if (gen === generationRef.current) setLoadingPrev(false);
    }
  }, [enabled, before, entryIndex, loadChapter]);
  const lastLoadedIdx = after.length ? after[after.length - 1].index : entryIndex;
  const firstLoadedIdx = before.length ? before[0].index : entryIndex;
  const hasNext = entryIndex >= 0 && lastLoadedIdx + 1 < chapters.length;
  const hasPrev = entryIndex >= 0 && firstLoadedIdx - 1 >= 0;
  return { before, after, appendNext, prependPrev, loadingNext, loadingPrev, hasNext, hasPrev };
}
function ToolBtn({ label, onClick, active, children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "button",
    {
      type: "button",
      onClick,
      title: label,
      "aria-label": label,
      className: `flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl border border-white/10 backdrop-blur transition-colors active:scale-95 ${active ? "bg-primary text-primary-foreground" : "bg-black/40 text-foreground hover:bg-white/10"}`,
      children
    }
  );
}
function ChapterDivider({ label, sub }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto my-6 flex w-full max-w-3xl items-center gap-3 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-px flex-1 bg-white/10" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
      label,
      sub ? ` · ${sub}` : ""
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-px flex-1 bg-white/10" })
  ] });
}
function ProviderFallbackNotice({
  requested,
  active,
  onChange
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto mb-4 flex w-[calc(100%-1rem)] max-w-3xl items-center justify-between gap-3 rounded-xl border border-amber-400/25 bg-amber-400/10 px-3 py-2 text-xs text-amber-100", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
      requested,
      " was unavailable for this chapter. Using ",
      active,
      " instead."
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        onClick: onChange,
        className: "shrink-0 rounded-lg border border-amber-200/25 px-2.5 py-1 font-semibold hover:bg-amber-100/10",
        children: "Change provider"
      }
    )
  ] });
}
function MangaReaderPage() {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j;
  const navigate = useNavigate();
  const location = useLocation();
  const isNative = useIsNativeApp();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const { mangaId } = useParams();
  const [searchParams] = useSearchParams();
  const { settings, updateSetting } = useReaderSettings();
  const { keybinds } = useReaderKeybinds();
  const chapterKey = searchParams.get("chapterKey") || searchParams.get("chapter") || "";
  const provider = searchParams.get("provider") || "";
  const providerChapterId = searchParams.get("providerChapterId") || "";
  const chapterNumberParam = searchParams.get("chapterNumber");
  const chapterTitleParam = searchParams.get("chapterTitle");
  const pageParam = Number(searchParams.get("page") || "0");
  const isOfflineChapter = searchParams.get("offline") === "true";
  const { data: chaptersResp } = useMangaChapters(mangaId);
  const chapters = reactExports.useMemo(() => {
    const list = (chaptersResp == null ? void 0 : chaptersResp.mappedChapters) ?? [];
    return [...list].sort((a, b) => a.canonicalOrder - b.canonicalOrder);
  }, [chaptersResp]);
  const stateAlternatives = reactExports.useMemo(() => {
    var _a2;
    const raw = (_a2 = location.state) == null ? void 0 : _a2.sources;
    return Array.isArray(raw) ? sortMangaChapterSources(raw) : [];
  }, [location.state]);
  const matchedSources = reactExports.useMemo(() => {
    if (!chapters.length) return [];
    const num = chapterNumberParam != null ? Number(chapterNumberParam) : NaN;
    const ch = (chapterKey ? chapters.find((c) => {
      var _a2;
      return (_a2 = c.sources) == null ? void 0 : _a2.some((s) => s.chapterKey === chapterKey);
    }) : void 0) || (Number.isFinite(num) ? chapters.find((c) => c.chapterNumber === num) : void 0) || null;
    return sortMangaChapterSources(ch == null ? void 0 : ch.sources);
  }, [chapters, chapterKey, chapterNumberParam]);
  const alternatives = reactExports.useMemo(() => {
    const merged = [...stateAlternatives];
    const seen = new Set(merged.map((s) => `${s.provider}::${s.chapterKey}::${s.providerChapterId || ""}`));
    for (const s of matchedSources) {
      const k = `${s.provider}::${s.chapterKey}::${s.providerChapterId || ""}`;
      if (!seen.has(k)) {
        seen.add(k);
        merged.push(s);
      }
    }
    return merged;
  }, [stateAlternatives, matchedSources]);
  const alternativesKey = reactExports.useMemo(
    () => alternatives.map((s) => `${s.provider}::${s.chapterKey}::${s.providerChapterId || ""}`).sort().join("|"),
    [alternatives]
  );
  const [reloadNonce, setReloadNonce] = reactExports.useState(0);
  const { data, isLoading, error, isFetching } = useQuery({
    queryKey: [
      "manga-read",
      mangaId,
      chapterKey,
      provider,
      providerChapterId,
      alternativesKey,
      reloadNonce
    ],
    queryFn: () => getMangaReadByKey(mangaId || "", chapterKey, {
      provider: provider || void 0,
      providerChapterId: providerChapterId || void 0,
      alternatives: alternatives.length ? alternatives : void 0
    }),
    enabled: Boolean(mangaId && chapterKey),
    // Pages are immutable — keep them cached so back/forward is instant and a
    // remount doesn't refetch on mobile radio. One retry for flaky mobile nets.
    // Failures (empty pages) are evicted below so they never poison the cache.
    staleTime: 10 * 60 * 1e3,
    gcTime: 30 * 60 * 1e3,
    retry: 1
  });
  reactExports.useEffect(() => {
    var _a2, _b2;
    if (isFetching || !data) return;
    if ((((_b2 = (_a2 = data.data) == null ? void 0 : _a2.pages) == null ? void 0 : _b2.length) ?? 0) > 0) return;
    void queryClient.removeQueries({
      queryKey: ["manga-read", mangaId, chapterKey, provider, providerChapterId, alternativesKey, reloadNonce],
      exact: true
    });
  }, [isFetching, data, queryClient, mangaId, chapterKey, provider, providerChapterId, alternativesKey, reloadNonce]);
  const retriedForRef = reactExports.useRef("");
  const savedRef = reactExports.useRef("");
  reactExports.useEffect(() => {
    var _a2, _b2;
    if (isFetching || !data) return;
    if ((((_b2 = (_a2 = data.data) == null ? void 0 : _a2.pages) == null ? void 0 : _b2.length) ?? 0) > 0) return;
    if (matchedSources.length === 0) return;
    const retryKey = `${chapterKey}|${provider}|${providerChapterId}|${alternativesKey}`;
    if (retriedForRef.current === retryKey) return;
    retriedForRef.current = retryKey;
    setReloadNonce((n) => n + 1);
  }, [isFetching, data, matchedSources, stateAlternatives, chapterKey, provider, providerChapterId, alternativesKey]);
  const pages = ((_a = data == null ? void 0 : data.data) == null ? void 0 : _a.pages) ?? [];
  const total = pages.length;
  const resolvedProvider = ((_c = (_b = data == null ? void 0 : data.data) == null ? void 0 : _b.chapter) == null ? void 0 : _c.provider) || provider;
  const { data: detailResp } = useMangaDetail(mangaId);
  const detail = detailResp == null ? void 0 : detailResp.detail;
  const mangaTitle = ((_d = detail == null ? void 0 : detail.title) == null ? void 0 : _d.english) || ((_e = detail == null ? void 0 : detail.title) == null ? void 0 : _e.romaji) || (detail == null ? void 0 : detail.canonicalTitle) || "Manga";
  const mangaPoster = (detail == null ? void 0 : detail.coverImage) ?? null;
  const mangaFormat = (detail == null ? void 0 : detail.format) ?? null;
  const resolvedNumber = reactExports.useMemo(() => {
    var _a2, _b2;
    const fromParam = chapterNumberParam != null ? Number(chapterNumberParam) : NaN;
    if (Number.isFinite(fromParam)) return fromParam;
    const fromData = (_b2 = (_a2 = data == null ? void 0 : data.data) == null ? void 0 : _a2.chapter) == null ? void 0 : _b2.number;
    return typeof fromData === "number" && Number.isFinite(fromData) ? fromData : null;
  }, [chapterNumberParam, data]);
  reactExports.useEffect(() => {
    if (!isNative || !mangaTitle || mangaTitle === "Manga") return;
    setReadingMangaRpc({
      mangaTitle,
      chapter: resolvedNumber,
      mangaImageUrl: mangaPoster,
      mangaUrl: `https://tatakai.me/manga/${mangaId}`
    });
    return () => {
      clearDiscordRpc();
    };
  }, [isNative, mangaTitle, mangaPoster, resolvedNumber, mangaId]);
  const title = reactExports.useMemo(() => {
    var _a2, _b2;
    if (chapterTitleParam) return chapterTitleParam;
    const t = (_b2 = (_a2 = data == null ? void 0 : data.data) == null ? void 0 : _a2.chapter) == null ? void 0 : _b2.title;
    if (t) return t;
    return resolvedNumber != null ? `Chapter ${resolvedNumber}` : "Chapter";
  }, [chapterTitleParam, data, resolvedNumber]);
  const currentIndex = reactExports.useMemo(() => {
    if (!chapters.length) return -1;
    if (resolvedNumber != null) {
      const byNum = chapters.findIndex((c) => c.chapterNumber === resolvedNumber);
      if (byNum >= 0) return byNum;
    }
    return chapters.findIndex((c) => {
      var _a2;
      return (_a2 = c.sources) == null ? void 0 : _a2.some((s) => s.chapterKey === chapterKey);
    });
  }, [chapters, resolvedNumber, chapterKey]);
  const continuous = settings.continuousScroll && settings.readingMode === "vertical";
  const {
    before,
    after,
    appendNext,
    prependPrev,
    loadingNext,
    loadingPrev,
    hasNext,
    hasPrev
  } = useContinuousReader({
    enabled: continuous,
    mangaId: mangaId || "",
    chapters,
    entryIndex: currentIndex,
    preferProvider: resolvedProvider
  });
  const [activeIndex, setActiveIndex] = reactExports.useState(-1);
  reactExports.useEffect(() => {
    setActiveIndex(currentIndex);
  }, [currentIndex]);
  const navIndex = continuous && activeIndex >= 0 ? activeIndex : currentIndex;
  const entryScanlator = reactExports.useMemo(() => {
    var _a2;
    const src = ((_a2 = chapters[currentIndex]) == null ? void 0 : _a2.sources) || [];
    const match = src.find((s) => s.chapterKey === chapterKey) || src.find((s) => s.provider === resolvedProvider) || src[0];
    return (match == null ? void 0 : match.scanlator) ?? null;
  }, [chapters, currentIndex, chapterKey, resolvedProvider]);
  const entryExtensionId = ((_g = (_f = data == null ? void 0 : data.data) == null ? void 0 : _f.readMeta) == null ? void 0 : _g.provider) ?? null;
  const chapterMetaByIndex = reactExports.useMemo(() => {
    const m = /* @__PURE__ */ new Map();
    if (currentIndex >= 0)
      m.set(currentIndex, {
        number: resolvedNumber,
        title,
        provider: resolvedProvider,
        total,
        key: chapterKey,
        scanlator: entryScanlator,
        providerChapterId,
        extensionId: entryExtensionId
      });
    before.forEach((s) => m.set(s.index, {
      number: s.number,
      title: s.title,
      provider: s.provider,
      total: s.pages.length,
      key: s.key,
      scanlator: s.scanlator,
      providerChapterId: s.providerChapterId,
      extensionId: s.extensionId
    }));
    after.forEach((s) => m.set(s.index, {
      number: s.number,
      title: s.title,
      provider: s.provider,
      total: s.pages.length,
      key: s.key,
      scanlator: s.scanlator,
      providerChapterId: s.providerChapterId,
      extensionId: s.extensionId
    }));
    return m;
  }, [currentIndex, resolvedNumber, title, resolvedProvider, total, chapterKey, entryScanlator, providerChapterId, entryExtensionId, before, after]);
  const activeMeta = continuous && chapterMetaByIndex.get(navIndex) || null;
  const displayNumber = activeMeta ? activeMeta.number : resolvedNumber;
  const displayTitle = activeMeta ? activeMeta.title : title;
  const displayProvider = activeMeta ? activeMeta.provider : resolvedProvider;
  const prevChapter = navIndex > 0 ? chapters[navIndex - 1] : null;
  const nextChapter = navIndex >= 0 && navIndex < chapters.length - 1 ? chapters[navIndex + 1] : null;
  const navToChapter = reactExports.useCallback((chapter) => {
    if (!chapter || !mangaId) return;
    const src = sortMangaChapterSources(chapter.sources);
    const source = pickMangaChapterSource(src, resolvedProvider);
    if (!source) return;
    const params = new URLSearchParams();
    params.set("chapterKey", source.chapterKey);
    if (source.provider) params.set("provider", source.provider);
    if (source.providerChapterId) params.set("providerChapterId", source.providerChapterId);
    if (chapter.chapterNumber != null) params.set("chapterNumber", String(chapter.chapterNumber));
    if (chapter.chapterTitle) params.set("chapterTitle", chapter.chapterTitle);
    params.set("page", "0");
    if (searchParams.get("offline") === "true") params.set("offline", "true");
    navigate(`/manga/read/${mangaId}?${params.toString()}`, { state: { sources: src } });
  }, [mangaId, navigate, resolvedProvider, searchParams]);
  const switchProvider = reactExports.useCallback((source, targetChapter) => {
    if (!mangaId) return;
    const params = new URLSearchParams(searchParams);
    params.set("chapterKey", source.chapterKey);
    params.set("provider", source.provider);
    if (source.providerChapterId) params.set("providerChapterId", source.providerChapterId);
    else params.delete("providerChapterId");
    if ((targetChapter == null ? void 0 : targetChapter.chapterNumber) != null) {
      params.set("chapterNumber", String(targetChapter.chapterNumber));
    } else if (targetChapter) params.delete("chapterNumber");
    if (targetChapter == null ? void 0 : targetChapter.chapterTitle) params.set("chapterTitle", targetChapter.chapterTitle);
    else if (targetChapter) params.delete("chapterTitle");
    params.set("page", "0");
    const targetSources = targetChapter ? sortMangaChapterSources(targetChapter.sources) : alternatives;
    navigate(`/manga/read/${mangaId}?${params.toString()}`, { state: { sources: targetSources } });
    void triggerHaptic("select");
  }, [mangaId, alternatives, navigate, searchParams]);
  const retryChapterPages = reactExports.useCallback(() => {
    var _a2, _b2, _c2, _d2;
    const currentProvider = resolvedProvider || provider;
    const currentChapterKey = ((_b2 = (_a2 = data == null ? void 0 : data.data) == null ? void 0 : _a2.chapter) == null ? void 0 : _b2.chapterKey) || chapterKey;
    const currentProviderChapterId = ((_d2 = (_c2 = data == null ? void 0 : data.data) == null ? void 0 : _c2.chapter) == null ? void 0 : _d2.providerChapterId) || providerChapterId;
    const fallback = nextMangaChapterSource(alternatives, {
      provider: currentProvider,
      chapterKey: currentChapterKey,
      providerChapterId: currentProviderChapterId
    });
    if (fallback && (fallback.provider !== currentProvider || fallback.chapterKey !== currentChapterKey || (fallback.providerChapterId || "") !== (currentProviderChapterId || ""))) {
      switchProvider(fallback);
      return;
    }
    void queryClient.removeQueries({
      queryKey: ["manga-read", mangaId, chapterKey],
      exact: false
    });
    setReloadNonce((n) => n + 1);
  }, [alternatives, provider, chapterKey, providerChapterId, resolvedProvider, data, switchProvider, queryClient, mangaId]);
  const retryStreamedChapter = reactExports.useCallback((seg) => {
    const chapter = chapters[seg.index];
    if (!chapter) return;
    const fallback = nextMangaChapterSource(chapter.sources, {
      provider: seg.provider,
      chapterKey: seg.key,
      providerChapterId: seg.providerChapterId
    });
    if (fallback && (fallback.provider !== seg.provider || fallback.chapterKey !== seg.key || (fallback.providerChapterId || "") !== (seg.providerChapterId || ""))) {
      switchProvider(fallback, chapter);
      return;
    }
    navToChapter(chapter);
  }, [chapters, navToChapter, switchProvider]);
  const containerRef = reactExports.useRef(null);
  const scrollRef = reactExports.useRef(null);
  const topSentinelRef = reactExports.useRef(null);
  const bottomSentinelRef = reactExports.useRef(null);
  const interactedRef = reactExports.useRef(false);
  const prependAnchorRef = reactExports.useRef(null);
  const beforeLenRef = reactExports.useRef(0);
  const [pageIndex, setPageIndex] = reactExports.useState(0);
  const [scrollH, setScrollH] = reactExports.useState(
    () => typeof window !== "undefined" ? window.innerHeight : 0
  );
  reactExports.useEffect(() => {
    var _a2;
    setPageIndex(Number.isFinite(pageParam) ? Math.max(0, pageParam) : 0);
    (_a2 = scrollRef.current) == null ? void 0 : _a2.scrollTo({ top: 0 });
    retriedForRef.current = "";
    savedRef.current = "";
    setReloadNonce(0);
    setActiveIndex(-1);
  }, [mangaId, chapterKey, provider, providerChapterId]);
  reactExports.useEffect(() => {
    if (!nextChapter || total === 0 || pageIndex < total - 3) return;
    const orderedNextSources = sortMangaChapterSources(nextChapter.sources);
    const src = pickMangaChapterSource(orderedNextSources, resolvedProvider);
    if (!src) return;
    const nextAlternatives = orderedNextSources;
    const nextAltKey = nextAlternatives.map((s) => `${s.provider}::${s.chapterKey}::${s.providerChapterId || ""}`).sort().join("|");
    void queryClient.prefetchQuery({
      queryKey: [
        "manga-read",
        mangaId,
        src.chapterKey,
        src.provider,
        src.providerChapterId || src.chapterKey,
        nextAltKey,
        0
      ],
      queryFn: async () => {
        var _a2, _b2;
        const res = await getMangaReadByKey(mangaId || "", src.chapterKey, {
          provider: src.provider,
          providerChapterId: src.providerChapterId || void 0,
          alternatives: nextAlternatives.length ? nextAlternatives : void 0
        });
        if (!((_b2 = (_a2 = res == null ? void 0 : res.data) == null ? void 0 : _a2.pages) == null ? void 0 : _b2.length)) throw new Error("prefetch: no pages yet");
        return res;
      },
      staleTime: 10 * 60 * 1e3
    }).catch(() => {
    });
  }, [pageIndex, total, nextChapter, mangaId, resolvedProvider, queryClient]);
  reactExports.useEffect(() => {
    if (continuous || settings.readingMode !== "vertical" || total === 0) return;
    const root = scrollRef.current;
    if (!root) return;
    const els = Array.from(root.querySelectorAll("[data-page]"));
    if (!els.length) return;
    const io = new IntersectionObserver((entries) => {
      const vis = entries.filter((e) => e.isIntersecting).map((e) => Number(e.target.getAttribute("data-page"))).filter((n) => Number.isFinite(n)).sort((a, b) => a - b);
      if (vis.length) setPageIndex(Math.max(0, vis[0] - 1));
    }, { root, threshold: 0.4 });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [continuous, settings.readingMode, total, chapterKey]);
  reactExports.useEffect(() => {
    if (!continuous || total === 0) return;
    const root = scrollRef.current;
    if (!root) return;
    const els = Array.from(root.querySelectorAll("[data-page]"));
    if (!els.length) return;
    const io = new IntersectionObserver((entries) => {
      const vis = entries.filter((e) => e.isIntersecting).map((e) => {
        var _a2;
        return {
          ch: Number((_a2 = e.target.closest("[data-ch]")) == null ? void 0 : _a2.getAttribute("data-ch")),
          pg: Number(e.target.getAttribute("data-page")),
          top: e.boundingClientRect.top
        };
      }).filter((v) => Number.isFinite(v.ch) && Number.isFinite(v.pg)).sort((a, b) => a.top - b.top);
      if (!vis.length) return;
      setActiveIndex(vis[0].ch);
      setPageIndex(Math.max(0, vis[0].pg - 1));
    }, { root, threshold: 0.2 });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [continuous, total, chapterKey, before.length, after.length]);
  reactExports.useEffect(() => {
    if (!continuous || !hasNext) return;
    const root = scrollRef.current;
    const el = bottomSentinelRef.current;
    if (!root || !el) return;
    const io = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) void appendNext();
    }, { root, rootMargin: "400px 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, [continuous, hasNext, appendNext, before.length, after.length]);
  reactExports.useEffect(() => {
    if (!continuous || !hasPrev) return;
    const root = scrollRef.current;
    const el = topSentinelRef.current;
    if (!root || !el) return;
    const io = new IntersectionObserver((entries) => {
      if (!entries.some((e) => e.isIntersecting)) return;
      if (!interactedRef.current) return;
      prependAnchorRef.current = { height: root.scrollHeight, top: root.scrollTop };
      void prependPrev();
    }, { root, rootMargin: "300px 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, [continuous, hasPrev, prependPrev, before.length, after.length]);
  reactExports.useLayoutEffect(() => {
    const root = scrollRef.current;
    if (!root) return;
    if (before.length > beforeLenRef.current && prependAnchorRef.current) {
      const delta = root.scrollHeight - prependAnchorRef.current.height;
      if (delta > 0) root.scrollTop = prependAnchorRef.current.top + delta;
      prependAnchorRef.current = null;
    }
    beforeLenRef.current = before.length;
  }, [before]);
  const saveProgress = useSaveMangaReadingProgress();
  reactExports.useEffect(() => {
    var _a2, _b2;
    if (!user || !mangaId || total === 0) return;
    const key = `${chapterKey}|${provider}|${providerChapterId}`;
    if (savedRef.current === key) return;
    savedRef.current = key;
    saveProgress.mutate({
      mangaId,
      mangaTitle,
      mangaPoster,
      format: mangaFormat,
      lastChapterKey: chapterKey,
      lastChapterNumber: resolvedNumber,
      lastChapterTitle: title,
      lastProvider: resolvedProvider || null,
      lastLanguage: ((_b2 = (_a2 = data == null ? void 0 : data.data) == null ? void 0 : _a2.chapter) == null ? void 0 : _b2.language) ?? null,
      lastPageIndex: 0,
      totalPages: total,
      lastExtensionId: entryExtensionId,
      lastScanlator: entryScanlator,
      lastPageId: "1"
    });
  }, [user, mangaId, total, chapterKey, provider, providerChapterId]);
  reactExports.useEffect(() => {
    if (!user || !mangaId || total === 0) return;
    if (savedRef.current !== `${chapterKey}|${provider}|${providerChapterId}`) return;
    const t = setTimeout(() => {
      saveProgress.mutate({
        mangaId,
        mangaTitle,
        mangaPoster,
        format: mangaFormat,
        lastChapterKey: activeMeta ? activeMeta.key : chapterKey,
        lastChapterNumber: displayNumber,
        lastChapterTitle: displayTitle,
        lastProvider: displayProvider || null,
        lastExtensionId: activeMeta ? activeMeta.extensionId : entryExtensionId,
        lastScanlator: activeMeta ? activeMeta.scanlator : entryScanlator,
        lastPageIndex: pageIndex,
        lastPageId: String(pageIndex + 1),
        totalPages: activeMeta ? activeMeta.total : total
      });
    }, 1500);
    return () => clearTimeout(t);
  }, [pageIndex, navIndex]);
  const totalChaptersRef = reactExports.useRef("");
  reactExports.useEffect(() => {
    if (!mangaId || !chapters.length) return;
    if (totalChaptersRef.current === mangaId) return;
    const maxNum = chapters.reduce(
      (m, c) => c.chapterNumber != null && c.chapterNumber > m ? c.chapterNumber : m,
      0
    );
    const totalCh = Math.floor(maxNum > 0 ? maxNum : chapters.length);
    if (totalCh <= 0) return;
    totalChaptersRef.current = mangaId;
    void storeMangaTotalChapters(mangaId, totalCh);
  }, [mangaId, chapters]);
  const [isFs, setIsFs] = reactExports.useState(false);
  const electronBridge = () => window.electron;
  const enterFullscreen = reactExports.useCallback(() => {
    var _a2, _b2;
    const bridge = electronBridge();
    setIsFs(true);
    if (bridge == null ? void 0 : bridge.setFullscreen) {
      document.documentElement.classList.add("app-fullscreen");
      void bridge.setFullscreen(true).catch(() => {
      });
    } else {
      (_b2 = (_a2 = containerRef.current) == null ? void 0 : _a2.requestFullscreen) == null ? void 0 : _b2.call(_a2).catch(() => {
      });
    }
  }, []);
  const exitFullscreen = reactExports.useCallback(() => {
    var _a2;
    const bridge = electronBridge();
    setIsFs(false);
    if (bridge == null ? void 0 : bridge.setFullscreen) {
      document.documentElement.classList.remove("app-fullscreen");
      void bridge.setFullscreen(false).catch(() => {
      });
    } else if (document.fullscreenElement) {
      void ((_a2 = document.exitFullscreen) == null ? void 0 : _a2.call(document).catch(() => {
      }));
    }
  }, []);
  const toggleFullscreen = reactExports.useCallback(() => {
    if (isFs) exitFullscreen();
    else enterFullscreen();
  }, [isFs, enterFullscreen, exitFullscreen]);
  reactExports.useEffect(() => {
    var _a2, _b2;
    const onFsChange = () => {
      var _a3;
      if (!document.fullscreenElement && !((_a3 = electronBridge()) == null ? void 0 : _a3.setFullscreen)) setIsFs(false);
    };
    const onKey = (e) => {
      if (e.key === "Escape") exitFullscreen();
    };
    document.addEventListener("fullscreenchange", onFsChange);
    document.addEventListener("keydown", onKey);
    const unsub = (_b2 = (_a2 = electronBridge()) == null ? void 0 : _a2.onFullscreenChanged) == null ? void 0 : _b2.call(_a2, (full) => {
      if (!full) {
        document.documentElement.classList.remove("app-fullscreen");
        setIsFs(false);
      }
    });
    return () => {
      document.removeEventListener("fullscreenchange", onFsChange);
      document.removeEventListener("keydown", onKey);
      if (typeof unsub === "function") unsub();
      document.documentElement.classList.remove("app-fullscreen");
    };
  }, [exitFullscreen]);
  const autoFsRef = reactExports.useRef(false);
  reactExports.useEffect(() => {
    if (settings.autoFullscreen && !autoFsRef.current && total > 0) {
      autoFsRef.current = true;
      enterFullscreen();
    }
  }, [settings.autoFullscreen, total, enterFullscreen]);
  const [chromeVisible, setChromeVisible] = reactExports.useState(true);
  reactExports.useEffect(() => {
    if (!isFs || !settings.hideChromeInFullscreen) {
      setChromeVisible(true);
      return;
    }
    setChromeVisible(false);
    let timer;
    const onMove = () => {
      setChromeVisible(true);
      window.clearTimeout(timer);
      timer = window.setTimeout(() => setChromeVisible(false), 2500);
    };
    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.clearTimeout(timer);
    };
  }, [isFs, settings.hideChromeInFullscreen]);
  reactExports.useEffect(() => {
    if (!settings.keepScreenAwake) return;
    if (isNative) {
      void KeepAwake.keepAwake();
      return () => {
        void KeepAwake.allowSleep();
      };
    }
    let lock = null;
    let released = false;
    const wl = navigator.wakeLock;
    if (!wl) return;
    const acquire = () => {
      wl.request("screen").then((l) => {
        var _a2;
        if (!released) lock = l;
        else void ((_a2 = l.release) == null ? void 0 : _a2.call(l));
      }).catch(() => {
      });
    };
    acquire();
    const onVis = () => {
      if (document.visibilityState === "visible") acquire();
    };
    document.addEventListener("visibilitychange", onVis);
    return () => {
      var _a2;
      released = true;
      document.removeEventListener("visibilitychange", onVis);
      void ((_a2 = lock == null ? void 0 : lock.release) == null ? void 0 : _a2.call(lock).catch(() => {
      }));
    };
  }, [settings.keepScreenAwake, isNative]);
  reactExports.useEffect(() => {
    const html = document.documentElement;
    const prev = html.style.overflow;
    html.style.overflow = "hidden";
    return () => {
      html.style.overflow = prev;
    };
  }, []);
  reactExports.useEffect(() => {
    const measure = () => {
      var _a2;
      const top = ((_a2 = scrollRef.current) == null ? void 0 : _a2.getBoundingClientRect().top) ?? 0;
      setScrollH(Math.max(0, window.innerHeight - top));
    };
    measure();
    const raf = requestAnimationFrame(measure);
    window.addEventListener("resize", measure);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", measure);
    };
  }, [isFs, chromeVisible, isLoading, total]);
  const [showSettings, setShowSettings] = reactExports.useState(false);
  const [showCommentsDrawer, setShowCommentsDrawer] = reactExports.useState(false);
  const [showInlineComments, setShowInlineComments] = reactExports.useState(false);
  const [showReaderNavigator, setShowReaderNavigator] = reactExports.useState(false);
  const [chapterSearch, setChapterSearch] = reactExports.useState("");
  const filteredChapters = reactExports.useMemo(() => {
    const query = chapterSearch.trim().toLowerCase();
    if (!query) return chapters;
    return chapters.filter(
      (chapter) => {
        var _a2;
        return String(chapter.chapterNumber ?? "").includes(query) || String(chapter.chapterTitle ?? "").toLowerCase().includes(query) || ((_a2 = chapter.sources) == null ? void 0 : _a2.some(
          (source) => String(source.provider ?? "").toLowerCase().includes(query) || String(source.scanlator ?? "").toLowerCase().includes(query)
        ));
      }
    );
  }, [chapterSearch, chapters]);
  const navigatorChapter = navIndex >= 0 ? chapters[navIndex] ?? null : null;
  const navigatorSources = reactExports.useMemo(
    () => sortMangaChapterSources(navigatorChapter == null ? void 0 : navigatorChapter.sources),
    [navigatorChapter]
  );
  const settingsRef = reactExports.useRef(settings);
  settingsRef.current = settings;
  const updateRef = reactExports.useRef(updateSetting);
  updateRef.current = updateSetting;
  const activePointersRef = reactExports.useRef(/* @__PURE__ */ new Map());
  const pinchRef = reactExports.useRef(null);
  const lastReaderTapRef = reactExports.useRef(null);
  const handleReaderPointerDown = reactExports.useCallback((event) => {
    if (event.pointerType !== "touch") return;
    activePointersRef.current.set(event.pointerId, { x: event.clientX, y: event.clientY });
    if (activePointersRef.current.size === 2) {
      const [a, b] = [...activePointersRef.current.values()];
      pinchRef.current = {
        distance: Math.max(1, Math.hypot(a.x - b.x, a.y - b.y)),
        zoom: settingsRef.current.zoom
      };
      lastReaderTapRef.current = null;
    }
  }, []);
  const handleReaderPointerMove = reactExports.useCallback((event) => {
    if (event.pointerType !== "touch" || !activePointersRef.current.has(event.pointerId)) return;
    activePointersRef.current.set(event.pointerId, { x: event.clientX, y: event.clientY });
    if (activePointersRef.current.size !== 2 || !pinchRef.current) return;
    event.preventDefault();
    const [a, b] = [...activePointersRef.current.values()];
    const distance = Math.max(1, Math.hypot(a.x - b.x, a.y - b.y));
    const next = Math.min(300, Math.max(50, Math.round(pinchRef.current.zoom * distance / pinchRef.current.distance / 5) * 5));
    if (next !== settingsRef.current.zoom) updateRef.current("zoom", next);
  }, []);
  const handleReaderPointerUp = reactExports.useCallback((event) => {
    if (event.pointerType !== "touch") return;
    const wasPinching = pinchRef.current !== null;
    activePointersRef.current.delete(event.pointerId);
    if (activePointersRef.current.size < 2) pinchRef.current = null;
    if (wasPinching) return;
    const previous = lastReaderTapRef.current;
    const current = { at: Date.now(), x: event.clientX, y: event.clientY };
    lastReaderTapRef.current = current;
    if (!previous) return;
    const closeInTime = current.at - previous.at < 320;
    const closeInSpace = Math.hypot(current.x - previous.x, current.y - previous.y) < 32;
    if (closeInTime && closeInSpace) {
      updateRef.current("zoom", settingsRef.current.zoom > 115 ? 100 : 175);
      void triggerHaptic("light");
      lastReaderTapRef.current = null;
    }
  }, []);
  const handleReaderPointerCancel = reactExports.useCallback((event) => {
    activePointersRef.current.delete(event.pointerId);
    if (activePointersRef.current.size < 2) pinchRef.current = null;
  }, []);
  const goNextPage = reactExports.useCallback(() => {
    var _a2, _b2;
    void triggerHaptic("tap");
    if (settings.readingMode === "paged") {
      const step = settings.doublePage ? 2 : 1;
      setPageIndex((i) => Math.min(total - 1, i + step));
    } else (_b2 = scrollRef.current) == null ? void 0 : _b2.scrollBy({ top: (((_a2 = scrollRef.current) == null ? void 0 : _a2.clientHeight) ?? 0) * 0.9, behavior: "smooth" });
  }, [settings.readingMode, settings.doublePage, total]);
  const goPrevPage = reactExports.useCallback(() => {
    var _a2, _b2;
    void triggerHaptic("tap");
    if (settings.readingMode === "paged") {
      const step = settings.doublePage ? 2 : 1;
      setPageIndex((i) => Math.max(0, i - step));
    } else (_b2 = scrollRef.current) == null ? void 0 : _b2.scrollBy({ top: -(((_a2 = scrollRef.current) == null ? void 0 : _a2.clientHeight) ?? 0) * 0.9, behavior: "smooth" });
  }, [settings.readingMode, settings.doublePage]);
  const zoomIn = reactExports.useCallback(
    () => updateSetting("zoom", Math.min(300, settings.zoom + 10)),
    [settings.zoom, updateSetting]
  );
  const zoomOut = reactExports.useCallback(
    () => updateSetting("zoom", Math.max(50, settings.zoom - 10)),
    [settings.zoom, updateSetting]
  );
  reactExports.useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onWheel = (e) => {
      if (!e.ctrlKey || !settingsRef.current.zoomWithWheel) return;
      e.preventDefault();
      const step = Math.abs(e.deltaY) > 40 ? 8 : 3;
      const dir = e.deltaY < 0 ? 1 : -1;
      const cur = settingsRef.current.zoom;
      const next = Math.min(300, Math.max(50, cur + dir * step));
      if (next !== cur) updateRef.current("zoom", next);
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);
  reactExports.useEffect(() => {
    if (!settings.autoScroll || settings.readingMode !== "vertical" || total === 0) return;
    const el = scrollRef.current;
    if (!el) return;
    const id = window.setInterval(() => {
      el.scrollBy({ top: settings.autoScrollSpeed, behavior: "auto" });
    }, 16);
    return () => window.clearInterval(id);
  }, [settings.autoScroll, settings.autoScrollSpeed, settings.readingMode, total]);
  const toggleDirection = reactExports.useCallback(
    () => updateSetting("readingMode", settings.readingMode === "vertical" ? "paged" : "vertical"),
    [settings.readingMode, updateSetting]
  );
  const reload = reactExports.useCallback(() => setReloadNonce((n) => n + 1), []);
  const toggleComments = reactExports.useCallback(() => setShowCommentsDrawer((v) => !v), []);
  const capture = reactExports.useCallback(async () => {
    const page = pages[pageIndex] || pages[0];
    if (!page) return;
    try {
      const target = page.proxiedImageUrl || page.imageUrl;
      let blob;
      if (isMobileProxyUrl(target)) {
        const res = await fetchViaMobileProxy(target, {
          originalUrl: page.originalUrl || page.imageUrl,
          headers: page.headers,
          responseType: "arraybuffer"
        });
        if (!res.ok || !res.data) return;
        blob = new Blob([res.data], {
          type: res.contentType.split(";")[0].trim() || "image/jpeg"
        });
      } else {
        const res = await fetch(target);
        blob = await res.blob();
      }
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${mangaTitle}-ch${resolvedNumber ?? ""}-p${page.pageNumber}.jpg`;
      a.click();
      URL.revokeObjectURL(url);
    } catch {
    }
  }, [pages, pageIndex, mangaTitle, resolvedNumber]);
  useReaderKeyboard(keybinds, {
    nextPage: goNextPage,
    prevPage: goPrevPage,
    nextChapter: () => navToChapter(nextChapter),
    prevChapter: () => navToChapter(prevChapter),
    toggleFullscreen,
    toggleDirection,
    zoomIn,
    zoomOut,
    toggleComments,
    reload
  }, !showSettings && !showCommentsDrawer);
  const isCoarsePointer = reactExports.useMemo(
    () => typeof window !== "undefined" && typeof window.matchMedia === "function" && window.matchMedia("(pointer: coarse)").matches,
    []
  );
  const zoomFactor = settings.zoom / 100;
  const maxWidthCap = settings.maxWidthPx > 0 ? `${settings.maxWidthPx}px` : void 0;
  const effectiveWidthPercent = (isCoarsePointer || isNative) && settings.widthPercent === DEFAULT_SETTINGS.widthPercent ? 100 : settings.widthPercent;
  const cropVerticalStyle = settings.panelCrop ? { width: "100%", maxWidth: "none" } : null;
  const widthStyle = cropVerticalStyle ?? (settings.sizing === "natural" ? {
    width: zoomFactor === 1 ? "auto" : `${Math.round(100 * zoomFactor)}%`,
    maxWidth: maxWidthCap ?? (zoomFactor > 1 ? "none" : "100%")
  } : {
    width: `${effectiveWidthPercent * zoomFactor}%`,
    maxWidth: maxWidthCap ?? (zoomFactor > 1 ? "none" : "100%")
  });
  const pagedStyle = (() => {
    if (settings.panelCrop) {
      return { height: `${88 * zoomFactor}vh`, width: "auto", maxWidth: "none" };
    }
    switch (settings.pageFit) {
      case "height":
        return { height: `${88 * zoomFactor}vh`, width: "auto", maxWidth: maxWidthCap ?? "none" };
      case "both":
        return {
          maxHeight: `${90 * zoomFactor}vh`,
          maxWidth: maxWidthCap ?? `${effectiveWidthPercent * zoomFactor}%`,
          width: "auto",
          height: "auto"
        };
      case "original":
        return {
          width: zoomFactor === 1 ? "auto" : `${Math.round(100 * zoomFactor)}%`,
          maxWidth: maxWidthCap ?? "none"
        };
      case "width":
      default:
        return {
          width: `${effectiveWidthPercent * zoomFactor}%`,
          maxWidth: maxWidthCap ?? (zoomFactor > 1 ? "none" : "100%")
        };
    }
  })();
  const eagerFor = (idx) => {
    const effectivePreloading = settings.preloading === "partial" ? getProfileKnobs(getEffectiveMemoryProfile()).readerPreload : settings.preloading;
    if (settings.loadingStrategy === "eager" || effectivePreloading === "full") return true;
    const win = effectivePreloading === "none" ? 1 : isCoarsePointer || isNative ? 6 : 3;
    return Math.abs(idx - pageIndex) <= win;
  };
  const segEager = (idx) => {
    const effectivePreloading = settings.preloading === "partial" ? getProfileKnobs(getEffectiveMemoryProfile()).readerPreload : settings.preloading;
    const boundary = isCoarsePointer || isNative ? 5 : 2;
    return settings.loadingStrategy === "eager" || effectivePreloading === "full" || idx < boundary;
  };
  reactExports.useEffect(() => {
    if (!pages.length) return;
    let cancelled = false;
    const t = window.setTimeout(() => {
      if (cancelled) return;
      void __vitePreload(() => import("./index.C6yfkT5T.js").then((n) => n.hl), true ? __vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11]) : void 0).then((m) => {
        if (cancelled || typeof m.prefetchMobileReaderImages !== "function") return;
        const ahead = pages.slice(pageIndex, pageIndex + 8);
        m.prefetchMobileReaderImages(ahead, { concurrency: 3 });
      }).catch(() => {
      });
    }, 250);
    return () => {
      cancelled = true;
      window.clearTimeout(t);
    };
  }, [pages, pageIndex, chapterKey]);
  if (!isNative) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background flex items-center justify-center p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Background, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassPanel, { className: "w-full max-w-2xl p-8 border border-white/10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Puzzle, { className: "w-6 h-6 text-primary mt-1" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-black", children: "Read in the Tatakai app" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-muted-foreground", children: "Manga chapter pages are delivered by Tatakai extensions. Open this chapter in the desktop or mobile app to continue reading." })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex flex-wrap gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "a",
            {
              href: "https://github.com/snozxyx/tatakai/releases",
              className: "inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground font-bold",
              target: "_blank",
              rel: "noreferrer",
              children: "Download Tatakai app"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              onClick: () => navigate(mangaId ? `/manga/${mangaId}` : "/manga"),
              className: "inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-white/20 font-bold",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4" }),
                " Back"
              ]
            }
          )
        ] })
      ] })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { ref: containerRef, className: "relative min-h-screen text-foreground", style: { backgroundColor: settings.backgroundColor }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: `z-40 flex items-center gap-1.5 sm:gap-2 border-b border-white/10 bg-black/50 px-2 sm:px-3 py-2 backdrop-blur transition-transform duration-300 pt-[max(0.5rem,env(safe-area-inset-top))] ${isFs ? "fixed inset-x-0 top-0" : "sticky top-0"} ${chromeVisible ? "" : "-translate-y-full"}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: () => navigate(mangaId ? `/manga/${mangaId}` : "/manga"),
              className: "inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-white/15 px-2 sm:px-2.5 py-1.5 text-xs sm:text-sm font-semibold hover:bg-white/10 active:scale-95",
              "aria-label": "Back to manga",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              disabled: !prevChapter,
              onClick: () => navToChapter(prevChapter),
              className: "inline-flex shrink-0 items-center gap-0.5 sm:gap-1 rounded-lg border border-white/15 px-2 sm:px-2.5 py-1.5 text-xs sm:text-sm font-semibold hover:bg-white/10 active:scale-95 disabled:opacity-40",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "h-4 w-4" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden min-[380px]:inline", children: "Prev" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              onClick: () => navigate(`/manga/${mangaId}`),
              className: "flex min-w-0 flex-1 flex-col items-center px-1 sm:px-2 text-center",
              title: "Manga info",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "w-full truncate text-xs sm:text-sm font-bold", children: [
                  mangaTitle,
                  isOfflineChapter ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-1.5 inline-block rounded-md border border-emerald-500/40 bg-emerald-500/10 px-1.5 py-px align-middle text-[10px] font-bold uppercase tracking-wide text-emerald-300", children: "Offline" }) : null
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "w-full truncate text-[11px] sm:text-xs text-muted-foreground", children: [
                  displayTitle,
                  displayProvider ? ` · ${displayProvider}` : ""
                ] })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: () => {
                setShowReaderNavigator(true);
                void triggerHaptic("open");
              },
              className: "inline-flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-lg border border-white/15 hover:bg-white/10 active:scale-95",
              "aria-label": "Open chapter and provider navigator",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(List, { className: "h-4 w-4" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              disabled: !nextChapter,
              onClick: () => navToChapter(nextChapter),
              className: "inline-flex shrink-0 items-center gap-0.5 sm:gap-1 rounded-lg border border-white/15 px-2 sm:px-2.5 py-1.5 text-xs sm:text-sm font-semibold hover:bg-white/10 active:scale-95 disabled:opacity-40",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden min-[380px]:inline", children: "Next" }),
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-4 w-4" })
              ]
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: `fixed right-2 sm:right-3 top-1/2 z-40 flex -translate-y-1/2 flex-col gap-1.5 sm:gap-2 transition-opacity duration-300 ${chromeVisible ? "opacity-100" : "pointer-events-none opacity-0"}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ToolBtn, { label: "Settings", onClick: () => setShowSettings(true), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Settings2, { className: "h-5 w-5" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ToolBtn, { label: "Fullscreen", onClick: toggleFullscreen, active: isFs, children: isFs ? /* @__PURE__ */ jsxRuntimeExports.jsx(Minimize, { className: "h-5 w-5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Maximize, { className: "h-5 w-5" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ToolBtn, { label: "Manga info", onClick: () => navigate(`/manga/${mangaId}`), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { className: "h-5 w-5" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ToolBtn, { label: "Home", onClick: () => navigate("/"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(House, { className: "h-5 w-5" }) }),
          settings.showCaptureButton && /* @__PURE__ */ jsxRuntimeExports.jsx(ToolBtn, { label: "Capture page", onClick: capture, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Camera, { className: "h-5 w-5" }) }),
          settings.showComments && /* @__PURE__ */ jsxRuntimeExports.jsx(ToolBtn, { label: "Comments", onClick: toggleComments, active: showCommentsDrawer, children: /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "h-5 w-5" }) }),
          settings.showReloadButton && /* @__PURE__ */ jsxRuntimeExports.jsx(ToolBtn, { label: "Reload", onClick: reload, children: /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: `h-5 w-5 ${isFetching ? "animate-spin" : ""}` }) })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        ref: scrollRef,
        onScroll: () => {
          interactedRef.current = true;
        },
        onDoubleClick: () => {
          updateRef.current("zoom", settingsRef.current.zoom > 115 ? 100 : 175);
          void triggerHaptic("light");
        },
        onPointerDown: handleReaderPointerDown,
        onPointerMove: handleReaderPointerMove,
        onPointerUp: handleReaderPointerUp,
        onPointerCancel: handleReaderPointerCancel,
        className: `mx-auto overflow-y-auto overscroll-contain px-0 py-0 sm:px-4 sm:py-6 ${settings.zoom > 100 ? "overflow-x-auto" : "overflow-x-hidden"}`,
        style: {
          height: `${scrollH}px`,
          filter: settings.brightness < 100 ? `brightness(${settings.brightness / 100})` : void 0,
          touchAction: "pan-x pan-y"
        },
        children: [
          isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-2 py-24 text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-5 w-5 animate-spin" }),
            " Loading pages…"
          ] }) : null,
          !isLoading && (!(data == null ? void 0 : data.success) || total === 0) ? /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassPanel, { className: "mx-auto max-w-xl border border-white/10 p-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold", children: "Unable to load chapter" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-muted-foreground", children: ((_h = data == null ? void 0 : data.guidance) == null ? void 0 : _h.message) || (data == null ? void 0 : data.message) || (error instanceof Error ? error.message : "No pages available") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-sm text-muted-foreground", children: "Pick an extension provider from the chapter list on the manga page." })
          ] }) : null,
          total > 0 && settings.readingMode === "vertical" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            continuous && hasPrev ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: topSentinelRef, className: "h-px w-full" }),
              loadingPrev ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-2 py-6 text-sm text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }),
                " Loading previous chapter…"
              ] }) : null
            ] }) : null,
            continuous ? before.map((seg) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ch": seg.index, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ChapterDivider, { label: seg.number != null ? `Chapter ${seg.number}` : "Chapter", sub: seg.provider }),
              seg.fallbackUsed ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                ProviderFallbackNotice,
                {
                  requested: seg.requestedProvider,
                  active: seg.provider,
                  onChange: () => {
                    setActiveIndex(seg.index);
                    setShowReaderNavigator(true);
                  }
                }
              ) : null,
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col items-center", style: { gap: `${settings.gap}px` }, children: seg.pages.map((page, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(ReaderImage, { page, mode: settings.loadingMethod, style: widthStyle, eager: segEager(idx), onRetryChapter: () => retryStreamedChapter(seg) }, readerPageRenderKey(seg.key, page))) })
            ] }, seg.key)) : null,
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ch": currentIndex, children: [
              continuous && before.length ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChapterDivider, { label: resolvedNumber != null ? `Chapter ${resolvedNumber}` : "Chapter", sub: resolvedProvider }) : null,
              continuous && ((_j = (_i = data == null ? void 0 : data.data) == null ? void 0 : _i.readMeta) == null ? void 0 : _j.fallbackUsed) && provider !== resolvedProvider ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                ProviderFallbackNotice,
                {
                  requested: provider,
                  active: resolvedProvider,
                  onChange: () => {
                    setActiveIndex(currentIndex);
                    setShowReaderNavigator(true);
                  }
                }
              ) : null,
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col items-center", style: { gap: `${settings.gap}px` }, children: pages.map((page, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(ReaderImage, { page, mode: settings.loadingMethod, style: widthStyle, eager: eagerFor(idx), onRetryChapter: retryChapterPages }, readerPageRenderKey(chapterKey, page))) })
            ] }),
            continuous ? after.map((seg) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ch": seg.index, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ChapterDivider, { label: seg.number != null ? `Chapter ${seg.number}` : "Chapter", sub: seg.provider }),
              seg.fallbackUsed ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                ProviderFallbackNotice,
                {
                  requested: seg.requestedProvider,
                  active: seg.provider,
                  onChange: () => {
                    setActiveIndex(seg.index);
                    setShowReaderNavigator(true);
                  }
                }
              ) : null,
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col items-center", style: { gap: `${settings.gap}px` }, children: seg.pages.map((page, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(ReaderImage, { page, mode: settings.loadingMethod, style: widthStyle, eager: segEager(idx), onRetryChapter: () => retryStreamedChapter(seg) }, readerPageRenderKey(seg.key, page))) })
            ] }, seg.key)) : null,
            continuous && hasNext ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              loadingNext ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-2 py-6 text-sm text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }),
                " Loading next chapter…"
              ] }) : null,
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: bottomSentinelRef, className: "h-px w-full" })
            ] }) : null
          ] }) : null,
          total > 0 && settings.readingMode === "paged" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex min-h-full items-center justify-center", children: [
            settings.doublePage && pages[pageIndex + 1] ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex items-center justify-center gap-1",
                style: { flexDirection: settings.readingDirection === "rtl" ? "row-reverse" : "row" },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ReaderImage, { page: pages[pageIndex], mode: settings.loadingMethod, style: pagedStyle, eager: true, onRetryChapter: retryChapterPages }, readerPageRenderKey(chapterKey, pages[pageIndex])),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ReaderImage, { page: pages[pageIndex + 1], mode: settings.loadingMethod, style: pagedStyle, eager: true, onRetryChapter: retryChapterPages }, readerPageRenderKey(chapterKey, pages[pageIndex + 1]))
                ]
              }
            ) : pages[pageIndex] ? /* @__PURE__ */ jsxRuntimeExports.jsx(ReaderImage, { page: pages[pageIndex], mode: settings.loadingMethod, style: pagedStyle, eager: true, onRetryChapter: retryChapterPages }, readerPageRenderKey(chapterKey, pages[pageIndex])) : null,
            settings.clickToTurn ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  tabIndex: -1,
                  "aria-label": settings.readingDirection === "rtl" ? "Next page" : "Previous page",
                  onClick: (e) => {
                    if (settings.readingDirection === "rtl") goNextPage();
                    else goPrevPage();
                    e.currentTarget.blur();
                  },
                  className: "absolute left-0 top-0 h-full w-1/3 cursor-pointer bg-transparent outline-none focus:outline-none focus-visible:outline-none"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  tabIndex: -1,
                  "aria-label": settings.readingDirection === "rtl" ? "Previous page" : "Next page",
                  onClick: (e) => {
                    if (settings.readingDirection === "rtl") goPrevPage();
                    else goNextPage();
                    e.currentTarget.blur();
                  },
                  className: "absolute right-0 top-0 h-full w-1/3 cursor-pointer bg-transparent outline-none focus:outline-none focus-visible:outline-none"
                }
              )
            ] }) : null
          ] }) : null,
          total > 0 && settings.showComments && mangaId && (!continuous || !hasNext) ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto mt-10 w-full max-w-3xl", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                onClick: () => setShowInlineComments((v) => !v),
                className: "flex w-full items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm font-semibold hover:bg-white/10",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "h-4 w-4" }),
                  showInlineComments ? "Hide comments" : "Show comments"
                ]
              }
            ),
            showInlineComments ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 space-y-8", children: [
              displayNumber != null ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                Comments,
                {
                  entityType: "manga",
                  entityId: mangaId,
                  episodeId: String(displayNumber),
                  entityName: `${mangaTitle} · ${displayTitle}`
                }
              ) : null,
              /* @__PURE__ */ jsxRuntimeExports.jsx(Comments, { entityType: "manga", entityId: mangaId, entityName: mangaTitle })
            ] }) : null
          ] }) : null
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Sheet, { open: showReaderNavigator, onOpenChange: setShowReaderNavigator, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(SheetContent, { side: "bottom", className: "max-h-[82dvh] rounded-t-3xl border-white/10 bg-background/95 px-0 pb-[max(1rem,env(safe-area-inset-bottom))] backdrop-blur-xl sm:mx-auto sm:max-w-xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SheetHeader, { className: "px-5 text-left", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SheetTitle, { children: "Reader navigation" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 space-y-5 overflow-y-auto px-5 scrollbar-thin", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "relative block", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              value: chapterSearch,
              onChange: (event) => setChapterSearch(event.target.value),
              placeholder: "Search chapter, title, or provider",
              className: "h-11 w-full rounded-xl border border-white/10 bg-white/[0.05] pl-10 pr-3 text-sm placeholder:text-muted-foreground focus:border-primary/50 focus:ring-2 focus:ring-primary/20"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mb-2 text-xs font-bold uppercase tracking-widest text-muted-foreground", children: "Provider" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-h-48 space-y-2 overflow-y-auto pr-1 scrollbar-thin", children: [
            navigatorSources.map((source) => {
              const active = source.provider === displayProvider && source.chapterKey === ((activeMeta == null ? void 0 : activeMeta.key) || chapterKey);
              return /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => {
                switchProvider(source, navigatorChapter);
                setShowReaderNavigator(false);
              }, className: `flex w-full items-center justify-between rounded-xl border px-4 py-3 text-left ${active ? "border-primary/50 bg-primary/10" : "border-white/10 bg-white/[0.03] hover:bg-white/[0.06]"}`, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: source.provider }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: source.scanlator || "Chapter source" })
              ] }, `${source.provider}:${source.chapterKey}:${source.providerChapterId || ""}`);
            }),
            !navigatorSources.length && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "rounded-xl border border-dashed border-white/10 p-4 text-sm text-muted-foreground", children: "No alternative providers are available for this chapter." })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mb-2 text-xs font-bold uppercase tracking-widest text-muted-foreground", children: "Chapter" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-h-64 space-y-1 overflow-y-auto pr-1 scrollbar-thin", children: [
            filteredChapters.map((chapter) => /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => {
              navToChapter(chapter);
              setShowReaderNavigator(false);
              void triggerHaptic("select");
            }, className: `flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm ${chapter.canonicalOrder === currentIndex ? "bg-primary/10 text-primary" : "hover:bg-white/[0.06]"}`, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                "Chapter ",
                chapter.chapterNumber ?? chapter.canonicalOrder + 1
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "max-w-[55%] truncate text-xs text-muted-foreground", children: chapter.chapterTitle || "" })
            ] }, chapter.canonicalOrder)),
            !filteredChapters.length && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "py-8 text-center text-sm text-muted-foreground", children: [
              "No chapters match “",
              chapterSearch,
              "”."
            ] })
          ] })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Sheet, { open: showSettings, onOpenChange: setShowSettings, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      SheetContent,
      {
        side: "right",
        className: "flex flex-col gap-0 overflow-hidden border-white/10 bg-background/95 p-0 backdrop-blur-xl md:w-[400px] md:max-w-[400px] max-md:inset-x-2 max-md:bottom-2 max-md:top-auto max-md:h-auto max-md:max-h-[85dvh] max-md:w-auto max-md:rounded-3xl max-md:border max-md:shadow-2xl",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "shrink-0 pt-2.5 md:hidden", "aria-hidden": true, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto h-1 w-10 rounded-full bg-white/20" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-0 flex-1 overflow-y-auto overscroll-contain p-4 pb-[max(1rem,env(safe-area-inset-bottom))] sm:p-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SheetHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SheetTitle, { children: "Reader settings" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ReaderPanel, {}) })
          ] })
        ]
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Sheet, { open: showCommentsDrawer, onOpenChange: setShowCommentsDrawer, children: /* @__PURE__ */ jsxRuntimeExports.jsx(SheetContent, { side: "right", className: "flex w-full flex-col overflow-hidden p-0 sm:max-w-lg", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "chapter", className: "flex h-full flex-col", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-b border-white/10 px-4 pt-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SheetHeader, { className: "mb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SheetTitle, { children: "Comments" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "w-full", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "chapter", className: "flex-1", children: "This chapter" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "global", className: "flex-1", children: "Global" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "chapter", className: "flex-1 overflow-y-auto px-4 py-3", children: mangaId && resolvedNumber != null ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        Comments,
        {
          entityType: "manga",
          entityId: mangaId,
          episodeId: String(resolvedNumber),
          entityName: `${mangaTitle} · ${title}`
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "py-8 text-center text-sm text-muted-foreground", children: "Chapter comments are unavailable for this chapter." }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "global", className: "flex-1 overflow-y-auto px-4 py-3", children: mangaId ? /* @__PURE__ */ jsxRuntimeExports.jsx(Comments, { entityType: "manga", entityId: mangaId, entityName: mangaTitle }) : null })
    ] }) }) })
  ] });
}
export {
  MangaReaderPage as default
};
