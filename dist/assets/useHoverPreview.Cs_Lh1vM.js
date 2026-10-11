import { r as reactExports } from "./react-vendor.CAo4XUiA.js";
import { H as Hls } from "./hls.BlgtCWcq.js";
import { ab as resolveApiV3Base, aD as getProxiedVideoUrl } from "./index.C6yfkT5T.js";
import "./vendor.CJyRs4QS.js";
const normalizeLookupKey = (value) => String(value ?? "").trim().toLowerCase();
const normalizeRouteId = (value) => String(value ?? "").trim();
const isExternalRouteId = (value) => {
  const raw = String(value ?? "").trim();
  if (!raw) return false;
  return /^(mal|anilist)-\d+$/i.test(raw) || /^\d+$/.test(raw);
};
const getCandidateId = (candidate) => candidate.tatakaiId ?? candidate.tatakaiID ?? candidate.tatakai_id ?? candidate.id ?? candidate.anime_id ?? candidate.animeId;
const getTatakaiId = (candidate) => normalizeRouteId(candidate.tatakaiId ?? candidate.tatakaiID ?? candidate.tatakai_id);
const getCandidateName = (candidate) => candidate.name ?? candidate.jname ?? candidate.title ?? candidate.titleEnglish ?? candidate.titleRomaji ?? candidate.titleNative;
const getMalId = (candidate) => toPositiveInt(candidate.malId ?? candidate.malID ?? candidate.mal_id ?? candidate.idMal);
const getAnilistId = (candidate) => toPositiveInt(candidate.anilistId ?? candidate.anilistID ?? candidate.anilist_id);
const getKnownRouteId = (candidate) => {
  const tatakaiId = getTatakaiId(candidate);
  if (tatakaiId) return tatakaiId;
  const explicitId = getCandidateId(candidate);
  const parsedExplicitId = parseExternalAnimeId(typeof explicitId === "string" ? explicitId : void 0);
  if (parsedExplicitId) {
    return `${parsedExplicitId.provider}:${parsedExplicitId.id}`;
  }
  const normalizedId = normalizeRouteId(explicitId);
  if (normalizedId && /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(normalizedId)) {
    return normalizedId;
  }
  const externalRouteId = buildExternalAnimeRouteId(getMalId(candidate), getAnilistId(candidate));
  if (externalRouteId) {
    return externalRouteId;
  }
  return normalizedId || void 0;
};
const setPreferredMapping = (map, key, routeId) => {
  if (!key || !routeId) return;
  const existing = map.get(key);
  if (!existing) {
    map.set(key, routeId);
    return;
  }
  if (!isExternalRouteId(routeId) && isExternalRouteId(existing)) {
    map.set(key, routeId);
    return;
  }
  if (isExternalRouteId(routeId) && !isExternalRouteId(existing)) {
    return;
  }
};
function toPositiveInt(value) {
  if (value === null || value === void 0 || value === "") return void 0;
  const parsed = typeof value === "number" ? value : Number.parseInt(String(value).trim(), 10);
  if (!Number.isFinite(parsed) || parsed <= 0) return void 0;
  return Math.trunc(parsed);
}
function parseExternalAnimeId(value) {
  const rawValue = String(value ?? "").trim();
  if (!rawValue) return null;
  const match = rawValue.match(/^(mal|anilist)[\-_:]?([0-9]+)$/i);
  if (!match) return null;
  return {
    provider: match[1].toLowerCase(),
    id: Number.parseInt(match[2], 10)
  };
}
function buildExternalAnimeRouteId(malId, anilistId) {
  const parsedAnilistId = toPositiveInt(anilistId);
  if (parsedAnilistId) return `anilist:${parsedAnilistId}`;
  const parsedMalId = toPositiveInt(malId);
  if (parsedMalId) return `mal:${parsedMalId}`;
  return void 0;
}
function createAnimeIdMappingIndex() {
  return {
    byName: /* @__PURE__ */ new Map(),
    byRawId: /* @__PURE__ */ new Map(),
    byExternalId: /* @__PURE__ */ new Map()
  };
}
function registerAnimeIdMappings(index, candidates) {
  for (const candidate of candidates) {
    const routeId = getKnownRouteId(candidate);
    if (!routeId) continue;
    const candidateId = normalizeLookupKey(getCandidateId(candidate));
    if (candidateId) setPreferredMapping(index.byRawId, candidateId, routeId);
    const candidateName = normalizeLookupKey(getCandidateName(candidate));
    if (candidateName) setPreferredMapping(index.byName, candidateName, routeId);
    const malId = getMalId(candidate);
    if (malId) setPreferredMapping(index.byExternalId, `mal-${malId}`, routeId);
    const anilistId = getAnilistId(candidate);
    if (anilistId) setPreferredMapping(index.byExternalId, String(anilistId), routeId);
  }
}
function collectAnimeCandidatesFromHome(homeData) {
  var _a, _b, _c;
  const candidates = [];
  const pushMany = (items) => {
    if (!Array.isArray(items)) return;
    for (const item of items) {
      if (item && typeof item === "object") {
        candidates.push(item);
      }
    }
  };
  pushMany(homeData == null ? void 0 : homeData.latestEpisodeAnimes);
  pushMany(homeData == null ? void 0 : homeData.spotlightAnimes);
  pushMany(homeData == null ? void 0 : homeData.topAiringAnimes);
  pushMany(homeData == null ? void 0 : homeData.topUpcomingAnimes);
  pushMany(homeData == null ? void 0 : homeData.trendingAnimes);
  pushMany(homeData == null ? void 0 : homeData.mostPopularAnimes);
  pushMany(homeData == null ? void 0 : homeData.mostFavoriteAnimes);
  pushMany(homeData == null ? void 0 : homeData.latestCompletedAnimes);
  pushMany((_a = homeData == null ? void 0 : homeData.top10Animes) == null ? void 0 : _a.today);
  pushMany((_b = homeData == null ? void 0 : homeData.top10Animes) == null ? void 0 : _b.week);
  pushMany((_c = homeData == null ? void 0 : homeData.top10Animes) == null ? void 0 : _c.month);
  return candidates;
}
function buildPreferredAnimeRouteId(candidate, index) {
  if (!candidate) return void 0;
  const tatakaiId = getTatakaiId(candidate);
  if (tatakaiId) return tatakaiId;
  const explicitId = getCandidateId(candidate);
  const parsedExplicitId = parseExternalAnimeId(typeof explicitId === "string" ? explicitId : void 0);
  if (parsedExplicitId) {
    return `${parsedExplicitId.provider}:${parsedExplicitId.id}`;
  }
  const normalizedExplicitId = normalizeRouteId(explicitId);
  if (normalizedExplicitId && /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(normalizedExplicitId)) {
    return normalizedExplicitId;
  }
  const malId = getMalId(candidate);
  const anilistId = getAnilistId(candidate);
  const externalRouteId = buildExternalAnimeRouteId(malId, anilistId);
  if (externalRouteId) {
    if (index) {
      const externalLookup = index.byExternalId.get(externalRouteId);
      if (externalLookup) return externalLookup;
    }
    return externalRouteId;
  }
  const normalizedId = normalizeLookupKey(explicitId);
  if (index && normalizedId) {
    const mappedById = index.byRawId.get(normalizedId);
    if (mappedById) return mappedById;
  }
  const candidateName = normalizeLookupKey(getCandidateName(candidate));
  if (index && candidateName) {
    const mappedByName = index.byName.get(candidateName);
    if (mappedByName) return mappedByName;
  }
  const fallbackRouteId = normalizedExplicitId || normalizeRouteId(explicitId);
  return fallbackRouteId || void 0;
}
const HOVER_DELAY_MS = 200;
const TIMEOUT_MS = 5e3;
async function registerLocalPreviewProxy(source) {
  var _a;
  const invoke = (_a = window.electron) == null ? void 0 : _a.invoke;
  const streamUrl = source == null ? void 0 : source.streamUrl;
  if (typeof invoke !== "function") return null;
  if (typeof streamUrl !== "string" || !/^https?:\/\//i.test(streamUrl)) return null;
  try {
    const res = await invoke("runtime:register-preview-proxy", {
      url: streamUrl,
      headers: source.streamHeaders || {}
    });
    if ((res == null ? void 0 : res.success) && typeof res.url === "string" && /^https?:\/\//i.test(res.url)) {
      return res.url;
    }
  } catch {
  }
  return null;
}
function toProxyStreamUrl(source) {
  var _a, _b;
  if (!(source == null ? void 0 : source.streamUrl)) return source;
  const referer = ((_a = source.streamHeaders) == null ? void 0 : _a.Referer) || ((_b = source.streamHeaders) == null ? void 0 : _b.referer);
  const cloudUrl = getProxiedVideoUrl(source.streamUrl, referer);
  const localUrl = typeof source.localProxyUrl === "string" && /^https?:\/\//i.test(source.localProxyUrl) ? source.localProxyUrl : null;
  return {
    ...source,
    streamUrl: localUrl || cloudUrl,
    fallbackStreamUrl: localUrl ? cloudUrl : null
  };
}
function usePreviewSource() {
  const [source, setSource] = reactExports.useState(null);
  const [loading, setLoading] = reactExports.useState(false);
  const cacheRef = reactExports.useRef(/* @__PURE__ */ new Map());
  const hoverTimerRef = reactExports.useRef(null);
  const abortRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    return () => {
      var _a;
      cacheRef.current.clear();
      if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
      (_a = abortRef.current) == null ? void 0 : _a.abort();
    };
  }, []);
  const cancelHover = reactExports.useCallback(() => {
    var _a;
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current);
      hoverTimerRef.current = null;
    }
    (_a = abortRef.current) == null ? void 0 : _a.abort();
    abortRef.current = null;
    setLoading(false);
  }, []);
  const resolve = reactExports.useCallback(async (anilistId, titles, episode) => {
    var _a, _b;
    const cached = cacheRef.current.get(anilistId);
    if (cached) {
      setSource(toProxyStreamUrl(cached));
      setLoading(false);
      return;
    }
    const abort = new AbortController();
    abortRef.current = abort;
    setLoading(true);
    const withTimeout = (promise) => {
      return Promise.race([
        promise,
        new Promise(
          (_, reject) => setTimeout(() => reject(new Error("timeout")), TIMEOUT_MS)
        )
      ]);
    };
    let result = null;
    try {
      const invokeExtension = (_a = window.electron) == null ? void 0 : _a.invokeExtension;
      if (invokeExtension && !abort.signal.aborted) {
        const data = await withTimeout(
          invokeExtension("getPreviewSource", { anilistId, titles, episode })
        );
        if ((data == null ? void 0 : data.success) && ((_b = data == null ? void 0 : data.data) == null ? void 0 : _b.streamUrl)) {
          result = data.data;
        }
      }
    } catch {
    }
    if (!result && !abort.signal.aborted) {
      try {
        const params = new URLSearchParams();
        params.set("anilistId", String(anilistId));
        titles.forEach((t) => params.append("titles[]", t));
        if (episode != null) params.set("episode", String(episode));
        const res = await withTimeout(
          fetch(`${resolveApiV3Base()}/toko/preview?${params}`, { signal: abort.signal })
        );
        if (res.ok) {
          const data = await res.json();
          if (data == null ? void 0 : data.streamUrl) result = data;
        }
      } catch {
      }
    }
    if (!abort.signal.aborted) {
      if (result) {
        const localProxyUrl = await registerLocalPreviewProxy(result);
        if (localProxyUrl) result.localProxyUrl = localProxyUrl;
      }
    }
    if (!abort.signal.aborted) {
      if (result) {
        cacheRef.current.set(anilistId, result);
        setSource(toProxyStreamUrl(result));
      } else {
        setSource(null);
      }
      setLoading(false);
    }
  }, []);
  const startHover = reactExports.useCallback((anilistId, titles, episode) => {
    var _a;
    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
    (_a = abortRef.current) == null ? void 0 : _a.abort();
    hoverTimerRef.current = setTimeout(() => {
      hoverTimerRef.current = null;
      resolve(anilistId, titles, episode);
    }, HOVER_DELAY_MS);
  }, [resolve]);
  return { source, loading, startHover, cancelHover };
}
function useHoverPreview({
  anilistId,
  title,
  enabled = true
}) {
  const [isHovering, setIsHovering] = reactExports.useState(false);
  const [hasError, setHasError] = reactExports.useState(false);
  const [useFallback, setUseFallback] = reactExports.useState(false);
  const videoRef = reactExports.useRef(null);
  const hlsRef = reactExports.useRef(null);
  const { source, loading, startHover, cancelHover } = usePreviewSource();
  const primaryUrl = enabled ? (source == null ? void 0 : source.streamUrl) ?? null : null;
  const fallbackUrl = enabled ? (source == null ? void 0 : source.fallbackStreamUrl) ?? null : null;
  const streamUrl = useFallback && fallbackUrl ? fallbackUrl : primaryUrl;
  reactExports.useEffect(() => {
    setUseFallback(false);
  }, [primaryUrl]);
  const handleFailure = reactExports.useCallback(() => {
    if (fallbackUrl && !useFallback) {
      setUseFallback(true);
    } else {
      setHasError(true);
    }
  }, [fallbackUrl, useFallback]);
  reactExports.useEffect(() => {
    if (!isHovering || !enabled || !anilistId) {
      if (!isHovering) cancelHover();
      return;
    }
    startHover(anilistId, [title]);
  }, [anilistId, cancelHover, enabled, isHovering, startHover, title]);
  reactExports.useEffect(() => {
    var _a;
    const video = videoRef.current;
    if (!video) return;
    (_a = hlsRef.current) == null ? void 0 : _a.destroy();
    hlsRef.current = null;
    if (!isHovering || !streamUrl) {
      video.pause();
      if (!streamUrl) setHasError(true);
      return;
    }
    setHasError(false);
    const seekToPreview = () => {
      const at = source == null ? void 0 : source.previewTimestampSec;
      if (at && Number.isFinite(at)) {
        try {
          video.currentTime = at;
        } catch {
        }
      }
    };
    const play = () => {
      void video.play().catch(() => {
      });
    };
    if (source == null ? void 0 : source.isHls) {
      if (!Hls.isSupported()) {
        setHasError(true);
        return;
      }
      const hls = new Hls();
      hlsRef.current = hls;
      hls.loadSource(streamUrl);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        seekToPreview();
        play();
      });
      hls.on(Hls.Events.ERROR, (_event, data) => {
        if (data.fatal) handleFailure();
      });
      return;
    }
    video.src = streamUrl;
    video.addEventListener(
      "loadedmetadata",
      () => {
        seekToPreview();
        play();
      },
      { once: true }
    );
    play();
  }, [isHovering, source, streamUrl, handleFailure]);
  reactExports.useEffect(() => {
    return () => {
      var _a;
      (_a = hlsRef.current) == null ? void 0 : _a.destroy();
      hlsRef.current = null;
    };
  }, []);
  const onEnter = reactExports.useCallback(() => {
    setIsHovering(true);
    setHasError((previous) => previous && !streamUrl ? false : previous);
  }, [streamUrl]);
  const onLeave = reactExports.useCallback(() => {
    setIsHovering(false);
    cancelHover();
  }, [cancelHover]);
  const onError = reactExports.useCallback(() => handleFailure(), [handleFailure]);
  return {
    videoRef,
    isActive: isHovering && Boolean(streamUrl),
    isLoading: isHovering && loading,
    showFallback: !streamUrl || hasError || isHovering && loading,
    onEnter,
    onLeave,
    onError
  };
}
export {
  useHoverPreview as a,
  buildPreferredAnimeRouteId as b,
  collectAnimeCandidatesFromHome as c,
  buildExternalAnimeRouteId as d,
  createAnimeIdMappingIndex as e,
  parseExternalAnimeId as p,
  registerAnimeIdMappings as r,
  toPositiveInt as t,
  usePreviewSource as u
};
