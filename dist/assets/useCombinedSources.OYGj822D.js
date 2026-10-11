import { r as reactExports } from "./react-vendor.CAo4XUiA.js";
import { a as useQuery } from "./tanstack.DPr3OB19.js";
import { cY as useExtensionSourceStream, cZ as getCombinedSourceCacheKey, c_ as getCachedCombinedSources, c$ as setCachedCombinedSources, cA as fetchCombinedSources } from "./index.C6yfkT5T.js";
import "./vendor.CJyRs4QS.js";
const DUB_LABELS = {
  ar: "Arabic",
  fr: "French",
  de: "German",
  pl: "Polish",
  zh: "Chinese",
  es: "Spanish",
  pt: "Portuguese",
  it: "Italian",
  ko: "Korean",
  hi: "Hindi",
  ta: "Tamil",
  te: "Telugu"
};
const SIGNS_ONLY_RE = /signs?\s*(?:&|and)?\s*songs?|\bs&s\b/i;
function toAppSubtitles(src) {
  const raw = [
    ...Array.isArray(src == null ? void 0 : src.subtitles) ? src.subtitles : [],
    ...Array.isArray(src == null ? void 0 : src.tracks) ? src.tracks : []
  ];
  const scored = raw.map((t) => {
    const url = String((t == null ? void 0 : t.url) || (t == null ? void 0 : t.file) || "").trim();
    if (!url) return null;
    const label = String((t == null ? void 0 : t.label) || (t == null ? void 0 : t.language) || (t == null ? void 0 : t.lang) || "Subtitles").trim();
    const lang = String((t == null ? void 0 : t.lang) || (t == null ? void 0 : t.language) || label).trim();
    const rank = (t == null ? void 0 : t.default) ? 0 : SIGNS_ONLY_RE.test(label) ? 2 : 1;
    const rawHeaders = (t == null ? void 0 : t.headers) || (src == null ? void 0 : src.headers);
    const headers = rawHeaders && typeof rawHeaders === "object" ? Object.fromEntries(Object.entries(rawHeaders).map(([name, value]) => [name, String(value)])) : void 0;
    return {
      rank,
      sub: {
        lang,
        url,
        label,
        originalUrl: (t == null ? void 0 : t.originalUrl) ? String(t.originalUrl) : void 0,
        headers,
        default: Boolean(t == null ? void 0 : t.default)
      }
    };
  }).filter((t) => !!t);
  scored.sort((a, b) => a.rank - b.rank);
  return scored.map((t) => t.sub);
}
function unionSubtitles(perSource) {
  const seen = /* @__PURE__ */ new Set();
  const out = [];
  for (const list of perSource) {
    for (const sub of list) {
      if (seen.has(sub.url)) continue;
      seen.add(sub.url);
      out.push(sub);
    }
  }
  return out.map((sub, i) => ({ sub, i, rank: SIGNS_ONLY_RE.test(sub.label || sub.lang) ? 1 : 0 })).sort((a, b) => a.rank - b.rank || a.i - b.i).map((e) => e.sub);
}
function mapRawSourcesToStreamingData(rawSources, ctx) {
  const { category } = ctx;
  const localSources = rawSources.map((src, idx) => ({ src, idx })).sort((a, b) => {
    var _a, _b;
    const pa = Number.isFinite((_a = a.src) == null ? void 0 : _a.providerPriority) ? Number(a.src.providerPriority) : Number.MAX_SAFE_INTEGER;
    const pb = Number.isFinite((_b = b.src) == null ? void 0 : _b.providerPriority) ? Number(b.src.providerPriority) : Number.MAX_SAFE_INTEGER;
    return pa === pb ? a.idx - b.idx : pa - pb;
  }).map(({ src }) => src);
  const resolveProviderKey = (src) => String(src.providerKey || src.providerName || src.server || src.source || "toko").trim();
  const resolveProviderName = (src) => String(src.providerName || src.server || src.source || "Toko").trim();
  const resolveLang = (src) => {
    const explicit = String(src.language || "").trim();
    if (explicit) return explicit;
    if (src.audioLanguage) {
      const code = String(src.audioLanguage).toLowerCase();
      if (code === "ja") return "Japanese";
      if (code === "en") return "English";
      return DUB_LABELS[code] || code.toUpperCase();
    }
    return category || "";
  };
  const resolveIsDub = (src, lang) => {
    if (typeof src.isDub === "boolean") return src.isDub;
    if (src.audioLanguage && src.audioLanguage !== "ja") return true;
    return /dub/i.test(lang) || category === "dub";
  };
  const isEmbedSource = (src) => {
    const t = String(src.sourceType || src.type || "").toLowerCase();
    if (t === "custom" || t === "embed") return true;
    if (typeof src.isEmbed === "boolean") return src.isEmbed;
    if (t === "hls" || t === "mp4") return false;
    return !/\.m3u8($|[?#/])/i.test(String(src.url || ""));
  };
  const isM3U8Source = (src) => !!src.isM3U8 || src.sourceType === "hls" || /\.m3u8/i.test(String(src.url || ""));
  const perSourceSubtitles = localSources.map((src) => toAppSubtitles(src));
  const providerServers = localSources.map((src, idx) => {
    const key = resolveProviderKey(src);
    const name = resolveProviderName(src);
    const lang = resolveLang(src);
    return {
      serverId: idx,
      serverName: key,
      providerKey: key,
      providerName: name,
      displayName: name,
      isProviderServer: true,
      language: lang,
      langCode: src.audioLanguage ? String(src.audioLanguage) : void 0,
      isDub: resolveIsDub(src, lang),
      isEmbed: isEmbedSource(src),
      hasM3U8: isM3U8Source(src),
      // ── Extension-API enrichment (present on host-normalized sources) ────────
      sourceType: src.sourceType,
      seeders: typeof src.seeders === "number" ? src.seeders : void 0,
      leechers: typeof src.leechers === "number" ? src.leechers : void 0,
      peers: typeof src.peers === "number" ? src.peers : void 0,
      torrentTitle: src.torrentTitle,
      fileFormat: src.fileFormat,
      fileSize: src.fileSize,
      languageLabel: src.languageLabel,
      audioLanguage: src.audioLanguage ? String(src.audioLanguage) : void 0,
      headers: src.headers && typeof src.headers === "object" ? Object.fromEntries(Object.entries(src.headers).map(([name2, value]) => [name2, String(value)])) : void 0,
      refererCandidates: Array.isArray(src.refererCandidates) ? src.refererCandidates.map((value) => String(value)).filter(Boolean) : void 0,
      // Carried through so WatchPage can re-apply the extension's ranking after
      // it dedupes/merges servers — that pass loses the array order this sort
      // established.
      providerPriority: Number.isFinite(src == null ? void 0 : src.providerPriority) ? Number(src.providerPriority) : void 0
    };
  });
  const sources = localSources.map((src, idx) => {
    const key = resolveProviderKey(src);
    const name = resolveProviderName(src);
    const lang = resolveLang(src);
    return {
      url: String(src.url || ""),
      isM3U8: isM3U8Source(src),
      quality: src.quality ? String(src.quality) : "auto",
      language: lang,
      langCode: src.audioLanguage ? String(src.audioLanguage) : void 0,
      isDub: resolveIsDub(src, lang),
      isEmbed: isEmbedSource(src),
      providerName: name,
      providerKey: key,
      server: key,
      // ── Extension-API enrichment ────────────────────────────────────────────
      sourceType: src.sourceType,
      isTorrent: typeof src.isTorrent === "boolean" ? src.isTorrent : src.sourceType === "torrent",
      originalUrl: src.originalUrl,
      magnetLink: src.magnetLink,
      torrentFileUrl: src.torrentFileUrl,
      seeders: typeof src.seeders === "number" ? src.seeders : void 0,
      leechers: typeof src.leechers === "number" ? src.leechers : void 0,
      peers: typeof src.peers === "number" ? src.peers : void 0,
      torrentTitle: src.torrentTitle,
      fileFormat: src.fileFormat,
      fileSize: src.fileSize,
      languageLabel: src.languageLabel,
      audioLanguage: src.audioLanguage ? String(src.audioLanguage) : void 0,
      // Keep provider replay metadata on the concrete source. The live proxy
      // token carries it in memory, while these fields recover playback after
      // a process restart/token expiry and let sidecar subtitles reuse the
      // exact Referer/Origin/User-Agent expected by the CDN.
      headers: src.headers && typeof src.headers === "object" ? Object.fromEntries(Object.entries(src.headers).map(([name2, value]) => [name2, String(value)])) : void 0,
      refererCandidates: Array.isArray(src.refererCandidates) ? src.refererCandidates.map((value) => String(value)).filter(Boolean) : void 0,
      providerPriority: Number.isFinite(src == null ? void 0 : src.providerPriority) ? Number(src.providerPriority) : void 0,
      // Tracks belong to the source that resolved them — keep them attached so
      // switching server switches subtitles instead of reusing the union.
      subtitles: perSourceSubtitles[idx]
    };
  });
  return {
    headers: { Referer: "", "User-Agent": "" },
    sources,
    // The providers ship subtitles per source and the player reads them off
    // `StreamingData`, so the union goes here. This was hardcoded `[]`, which
    // silently dropped every track the providers returned — measured at 96 tracks
    // across 12 of 27 sources on one episode, so subtitles never appeared at all.
    subtitles: unionSubtitles(perSourceSubtitles),
    tracks: [],
    providerServers,
    anilistID: typeof ctx.knownAnilistId === "number" ? ctx.knownAnilistId : Number(ctx.knownAnilistId) || null,
    malID: typeof ctx.knownMalId === "number" ? ctx.knownMalId : Number(ctx.knownMalId) || null
  };
}
function useCombinedSources(episodeId, animeName, episodeNumber, server = "hd-2", category = "sub", currentUserId, knownAnilistId, knownMalId, options) {
  return useQuery({
    queryKey: ["combined-sources", episodeId, animeName, episodeNumber, server, category, currentUserId, knownAnilistId, knownMalId],
    queryFn: async () => {
      var _a, _b, _c, _d, _e;
      const withTimeout = async (promise, timeoutMs) => {
        let timeoutId = null;
        const timeoutPromise = new Promise((_, reject) => {
          timeoutId = setTimeout(() => reject(new Error(`combined sources timeout (${timeoutMs}ms)`)), timeoutMs);
        });
        try {
          return await Promise.race([promise, timeoutPromise]);
        } finally {
          if (timeoutId) clearTimeout(timeoutId);
        }
      };
      const ENABLE_COMBINED_SOURCE_CACHE = String("false").toLowerCase() === "true";
      const cacheKey = getCombinedSourceCacheKey(episodeId, server, category, currentUserId);
      const cached = ENABLE_COMBINED_SOURCE_CACHE ? getCachedCombinedSources(cacheKey) : null;
      if (typeof window !== "undefined" && ((_a = window.tatakaiRuntime) == null ? void 0 : _a.resolveEpisodeSources)) {
        try {
          const health = await ((_c = (_b = window.tatakaiRuntime).health) == null ? void 0 : _c.call(_b));
          const healthOk = !!health && health.status === "ok";
          if (healthOk) {
            const local = await withTimeout(
              window.tatakaiRuntime.resolveEpisodeSources({
                episodeId,
                animeName,
                episodeNumber,
                anilistId: knownAnilistId,
                malId: knownMalId,
                preferredLanguage: category,
                method: "single",
                resolution: "1080p"
              }),
              12e3
            );
            const localSources = Array.isArray(local == null ? void 0 : local.sources) ? local.sources : [];
            if (localSources.length > 0) {
              const localResult = mapRawSourcesToStreamingData(localSources, { category, knownAnilistId, knownMalId });
              if (ENABLE_COMBINED_SOURCE_CACHE) {
                setCachedCombinedSources(cacheKey, localResult);
              }
              return {
                ...localResult,
                hasTatakaiProviders: true
              };
            }
          }
        } catch {
        }
      }
      let data;
      try {
        data = await withTimeout(
          fetchCombinedSources(episodeId, animeName, episodeNumber, server, category, currentUserId, knownAnilistId, knownMalId),
          45e3
        );
      } catch (error) {
        if (ENABLE_COMBINED_SOURCE_CACHE && cached) {
          return {
            ...cached,
            hasTatakaiProviders: (((_d = cached.providerServers) == null ? void 0 : _d.length) || 0) > 0
          };
        }
        throw error;
      }
      if (ENABLE_COMBINED_SOURCE_CACHE) {
        setCachedCombinedSources(cacheKey, data);
      }
      return {
        ...data,
        hasTatakaiProviders: (((_e = data.providerServers) == null ? void 0 : _e.length) || 0) > 0
      };
    },
    enabled: ((options == null ? void 0 : options.enabled) ?? true) && !!episodeId,
    staleTime: 5 * 60 * 1e3,
    // 5 minutes
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false
  });
}
function useCombinedSourcesWithRefetch(episodeId, animeName, episodeNumber, server = "hd-2", category = "sub", currentUserId, knownAnilistId, knownMalId) {
  const anilistIdNum = Number(knownAnilistId);
  const hasAnilist = Number.isFinite(anilistIdNum) && anilistIdNum > 0;
  const streamEnabled = !!episodeId && (hasAnilist || !!animeName) && typeof episodeNumber === "number" && !!episodeNumber;
  const stream = useExtensionSourceStream("toko", {
    anilistId: hasAnilist ? anilistIdNum : void 0,
    titles: animeName ? [animeName] : void 0,
    episode: episodeNumber ?? void 0,
    resolution: "1080p",
    preferredLanguage: category,
    route: "sources",
    enabled: streamEnabled
  });
  const streamUnavailable = stream.baseResolved && (!stream.baseUrl || !stream.namespaceMounted);
  const streamFailed = stream.phase === "error" && stream.sources.length === 0;
  const useFallback = !streamEnabled || streamUnavailable || streamFailed;
  const fallback = useCombinedSources(
    episodeId,
    animeName,
    episodeNumber,
    server,
    category,
    currentUserId,
    knownAnilistId,
    knownMalId,
    { enabled: useFallback }
  );
  const streamData = reactExports.useMemo(() => {
    var _a;
    if (!streamEnabled) return void 0;
    if (stream.sources.length === 0 && stream.phase !== "done") return void 0;
    const sd = mapRawSourcesToStreamingData(stream.sources, { category, knownAnilistId, knownMalId });
    return {
      ...sd,
      hasTatakaiProviders: (((_a = sd.providerServers) == null ? void 0 : _a.length) || 0) > 0,
      providerStatus: stream.providerStatus
    };
  }, [streamEnabled, stream.sources, stream.phase, stream.providerStatus, category, knownAnilistId, knownMalId]);
  const data = useFallback ? fallback.data : streamData ?? fallback.data;
  const isLoading = useFallback ? fallback.isLoading : data === void 0;
  const isFetching = useFallback ? fallback.isFetching : !stream.baseResolved || stream.phase === "connecting" || stream.phase === "streaming";
  const error = useFallback ? fallback.error : stream.phase === "error" ? stream.error : null;
  const streamReload = stream.reload;
  const fallbackRefetch = fallback.refetch;
  const refetch = reactExports.useCallback(async () => {
    streamReload();
    return fallbackRefetch();
  }, [streamReload, fallbackRefetch]);
  const diagnostics = {
    streamEnabled,
    phase: stream.phase,
    baseResolved: stream.baseResolved,
    namespaceMounted: stream.namespaceMounted,
    hasBaseUrl: !!stream.baseUrl,
    streamUnavailable,
    usingFallback: useFallback,
    sourceCount: stream.sources.length,
    providerStatus: stream.providerStatus
  };
  return { data, isLoading, isFetching, error, refetch, diagnostics };
}
export {
  useCombinedSourcesWithRefetch as u
};
