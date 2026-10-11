const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/index.C6yfkT5T.js","assets/react-vendor.CAo4XUiA.js","assets/vendor.CJyRs4QS.js","assets/tanstack.DPr3OB19.js","assets/supabase.WuRMX5Dg.js","assets/radix.BiK9uYXL.js","assets/icons.C2gBBarQ.js","assets/motion.DVGLRFCH.js","assets/hls.BlgtCWcq.js","assets/editor.Dxw8dtyw.js","assets/charts.Dr1fgDJ-.js","assets/index.CWbmAlRn.css"])))=>i.map(i=>d[i]);
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
import { ba as CapacitorHttp, b6 as Capacitor, bf as ue, bj as KeepAwake, b9 as __vitePreload, bF as ScreenOrientation, bG as StatusBar } from "./vendor.CJyRs4QS.js";
import { r as reactExports, j as jsxRuntimeExports } from "./react-vendor.CAo4XUiA.js";
import { H as Hls } from "./hls.BlgtCWcq.js";
import { cd as isMobileProxyUrl, ce as resolveMobileProxy, cf as normalizeMobileHeaders, di as isHlsProxyPayload, dj as rewriteMobilePlaylist, dk as fetchViaMobileProxy, dl as copyToArrayBuffer, dm as base64ToArrayBufferChunked, cc as useVideoSettings, l as getProxiedImageUrl, dn as capQualityForDataSaver, T as triggerHaptic, d9 as buildSubtitleCueStyle, df as ensureCustomSubtitleFontLoaded, dp as isAnyProxyUrl, dq as reregisterMobileSource, dr as registerMobileSource, ds as unwrapMobileProxyUrl, aD as getProxiedVideoUrl, dt as buildMobilePlaybackCandidates, du as probePlaybackCandidate, dv as firstFulfilled, dw as markProxyWorking, d2 as getProxiedSubtitleUrl, j as cn, dg as VideoSettingsPanel, dx as getProfileKnobs, dy as getEffectiveMemoryProfile, dz as shouldAutoplayVideo, dA as getNativeProxyBaseUrl } from "./index.C6yfkT5T.js";
import { u as useAniskip, a as useActiveCues, U as UpNextOverlay, f as formatTime, D as DownloadButton } from "./EmbedPlayer.BH04tPBk.js";
import { getSubtitleSelectionKey, isBrowserReadyVttUrl, buildSubtitleFetchCandidates, normalizeSubtitleToVtt } from "./subtitle-utils.B2k2Dirm.js";
import { a as CircleAlert, R as RefreshCw, Q as LoaderCircle, cC as Rewind, cB as FastForward, cD as LockOpen, aG as ChevronLeft, a6 as Lock, cv as SkipBack, cu as Pause, aJ as Play, cw as SkipForward, b2 as Captions, i as Settings, cz as Minimize, bn as Maximize, bZ as Camera } from "./icons.C2gBBarQ.js";
function requestHeaders(sourceHeaders, context) {
  const headers = { ...(context == null ? void 0 : context.headers) || {} };
  if (sourceHeaders.referer) headers.Referer = sourceHeaders.referer;
  if (sourceHeaders.userAgent) headers["User-Agent"] = sourceHeaders.userAgent;
  if (sourceHeaders.origin) headers.Origin = sourceHeaders.origin;
  if (typeof (context == null ? void 0 : context.rangeStart) === "number") {
    const end = typeof context.rangeEnd === "number" ? context.rangeEnd - 1 : "";
    headers.Range = `bytes=${context.rangeStart}-${end}`;
  }
  return headers;
}
function makeStats(start) {
  return {
    aborted: false,
    loaded: 0,
    retry: 0,
    total: 0,
    chunkCount: 0,
    bwEstimate: 0,
    loading: { start, first: 0, end: 0 },
    parsing: { start: 0, end: 0 },
    buffering: { start: 0, first: 0, end: 0 }
  };
}
function toBinary(raw) {
  if (raw == null) return null;
  if (raw instanceof ArrayBuffer) return raw;
  if (ArrayBuffer.isView(raw)) {
    return copyToArrayBuffer(raw);
  }
  if (typeof raw === "string") {
    try {
      return base64ToArrayBufferChunked(raw);
    } catch {
      return null;
    }
  }
  return null;
}
function createNativeHlsLoader(sourceHeaders) {
  return class NativeHlsLoader {
    // hls.js supplies a config argument when constructing loaders.
    constructor(_config) {
      __publicField(this, "context", null);
      __publicField(this, "stats", makeStats(0));
      __publicField(this, "aborted", false);
    }
    load(context, _config, callbacks) {
      this.context = context;
      this.aborted = false;
      const start = performance.now();
      const stats = makeStats(start);
      this.stats = stats;
      const textResponse = context.responseType === "text" || context.responseType === "json";
      const proxyEntry = isMobileProxyUrl(context == null ? void 0 : context.url) ? resolveMobileProxy(String(context.url)) : null;
      const proxyHeaders = proxyEntry ? normalizeMobileHeaders(proxyEntry.headers) : {};
      const mergedSourceHeaders = {
        referer: sourceHeaders.referer || proxyHeaders.Referer || proxyHeaders.referer,
        userAgent: sourceHeaders.userAgent || proxyHeaders["User-Agent"] || proxyHeaders["user-agent"],
        origin: sourceHeaders.origin || proxyHeaders.Origin || proxyHeaders.origin
      };
      const extra = requestHeaders(mergedSourceHeaders, context);
      const isManifest = textResponse || (context == null ? void 0 : context.type) === "manifest" || (context == null ? void 0 : context.type) === "level";
      const send = async () => {
        if (proxyEntry) {
          return fetchViaMobileProxy(String(context.url), {
            headers: extra,
            range: extra.Range,
            responseType: textResponse ? "text" : "arraybuffer",
            timeoutMs: isManifest ? 8e3 : 25e3
          }).then((res2) => ({
            status: res2.status,
            headers: res2.headers,
            contentType: res2.contentType,
            data: textResponse ? res2.text : res2.data,
            url: res2.url
          }));
        }
        const res = await CapacitorHttp.request({
          url: context.url,
          method: "GET",
          headers: extra,
          responseType: textResponse ? "text" : "arraybuffer",
          connectTimeout: 3e3,
          readTimeout: isManifest ? 8e3 : 25e3
        });
        return {
          status: Number(res == null ? void 0 : res.status) || 0,
          headers: (res == null ? void 0 : res.headers) || {},
          contentType: "",
          data: res == null ? void 0 : res.data,
          url: res == null ? void 0 : res.url
        };
      };
      void send().then((response) => {
        if (this.aborted) return;
        const end = performance.now();
        stats.loading.first = end;
        stats.loading.end = end;
        const status = Number(response == null ? void 0 : response.status) || 0;
        if (status < 200 || status >= 300) {
          callbacks.onError({ code: status, text: `Native HLS request failed (${status})` }, context, response, stats);
          return;
        }
        const raw = response == null ? void 0 : response.data;
        if (textResponse) {
          const text = typeof raw === "string" ? raw : JSON.stringify(raw ?? "");
          const isPlaylist = (context == null ? void 0 : context.type) === "manifest" || (context == null ? void 0 : context.type) === "level" || isHlsProxyPayload(String((response == null ? void 0 : response.url) || context.url), String((response == null ? void 0 : response.contentType) || ""));
          const upstreamUrl = proxyEntry ? proxyEntry.url : String(context.url);
          const data2 = isPlaylist ? rewriteMobilePlaylist(text, upstreamUrl, {
            ...proxyHeaders,
            ...normalizeMobileHeaders(extra)
          }) : text;
          const size2 = data2.length;
          stats.loaded = size2;
          stats.total = size2;
          stats.chunkCount = 1;
          stats.bwEstimate = end > start ? size2 * 8e3 / (end - start) : 0;
          callbacks.onSuccess({ url: (response == null ? void 0 : response.url) || context.url, data: data2, code: status }, stats, context, response);
          return;
        }
        const data = toBinary(raw);
        if (!data) {
          callbacks.onError({ code: status, text: "Native HLS binary decode failed" }, context, response, stats);
          return;
        }
        const size = data.byteLength || 0;
        stats.loaded = size;
        stats.total = size;
        stats.chunkCount = 1;
        stats.bwEstimate = end > start ? size * 8e3 / (end - start) : 0;
        callbacks.onSuccess({ url: (response == null ? void 0 : response.url) || context.url, data, code: status }, stats, context, response);
      }).catch((error) => {
        if (this.aborted) return;
        const end = performance.now();
        stats.loading.first = end;
        stats.loading.end = end;
        callbacks.onError({ code: 0, text: error instanceof Error ? error.message : "Native HLS request failed" }, context, null, stats);
      });
    }
    abort() {
      this.aborted = true;
      this.stats.aborted = true;
    }
    destroy() {
      this.abort();
      this.context = null;
    }
  };
}
function parseQualityScore(quality) {
  const normalized = String(quality || "").toLowerCase();
  const match = normalized.match(/(\d{3,4})\s*p?/);
  if (!match) return null;
  const value = Number(match[1]);
  return Number.isFinite(value) ? value : null;
}
function selectPreferredSource(sources, preferredQuality) {
  if (!sources.length) return void 0;
  if (preferredQuality === "auto") return sources[0];
  const preferredScore = parseQualityScore(preferredQuality);
  if (!preferredScore) {
    return sources.find((source) => String(source.quality || "").toLowerCase() === preferredQuality) || sources[0];
  }
  const candidates = sources.map((source) => ({ source, score: parseQualityScore(source.quality) })).filter((entry) => entry.score != null).sort((left, right) => {
    const distanceDiff = Math.abs(left.score - preferredScore) - Math.abs(right.score - preferredScore);
    if (distanceDiff !== 0) return distanceDiff;
    return right.score - left.score;
  });
  if (candidates.length > 0) return candidates[0].source;
  return sources.find((source) => String(source.quality || "").toLowerCase() === preferredQuality) || sources[0];
}
function normalizeSubtitleLanguage(value) {
  const normalized = String(value || "").trim().toLowerCase();
  if (!normalized) return "";
  if (normalized === "en" || normalized.startsWith("eng") || normalized.includes("english")) return "en";
  if (normalized === "es" || normalized.startsWith("spa") || normalized.includes("spanish") || normalized.includes("espanol")) return "es";
  if (normalized === "fr" || normalized.startsWith("fra") || normalized.startsWith("fre") || normalized.includes("french")) return "fr";
  if (normalized === "de" || normalized.startsWith("deu") || normalized.startsWith("ger") || normalized.includes("german")) return "de";
  if (normalized === "ja" || normalized.startsWith("jpn") || normalized.includes("japanese")) return "ja";
  if (normalized === "pt" || normalized.startsWith("por") || normalized.includes("portuguese")) return "pt";
  if (normalized === "ar" || normalized.startsWith("ara") || normalized.includes("arabic")) return "ar";
  if (normalized === "hi" || normalized.startsWith("hin") || normalized.includes("hindi")) return "hi";
  if (normalized.length >= 2) return normalized.slice(0, 2);
  return normalized;
}
function subtitleMatchesPreference(subtitle, preference) {
  const normalizedPreference = String(preference || "").trim().toLowerCase();
  const language = normalizeSubtitleLanguage(subtitle.lang);
  const label = String(subtitle.label || "").toLowerCase();
  const combined = `${String(subtitle.lang || "").toLowerCase()} ${label}`;
  if (normalizedPreference === "english") return language === "en" || combined.includes("english") || combined.includes("eng");
  if (normalizedPreference === "spanish") return language === "es" || combined.includes("spanish") || combined.includes("espanol");
  if (normalizedPreference === "french") return language === "fr" || combined.includes("french");
  if (normalizedPreference === "german") return language === "de" || combined.includes("german");
  if (normalizedPreference === "japanese") return language === "ja" || combined.includes("japanese");
  if (normalizedPreference === "portuguese") return language === "pt" || combined.includes("portuguese");
  if (normalizedPreference === "arabic") return language === "ar" || combined.includes("arabic");
  if (normalizedPreference === "hindi") return language === "hi" || combined.includes("hindi");
  if (normalizedPreference.length === 2) return language === normalizedPreference;
  return combined.includes(normalizedPreference);
}
const MAX_SAME_URL_RETRIES = 1;
const MAX_MEDIA_RECOVERIES = 2;
const PROBE_CANDIDATES = 3;
const STALL_TIMEOUT_MS = 6e3;
const MOBILE_PLAYER_FULLSCREEN_CLASS = "mobile-player-fullscreen";
const MOBILE_PLAYER_FULLSCREEN_EVENT = "tatakai-mobile-player-fullscreen";
function MobileVideoPlayer({
  sources,
  subtitles = [],
  headers,
  poster,
  onError,
  onServerSwitch,
  onRetryCurrentServer,
  isLoading = false,
  serverName,
  onEpisodeEnd,
  malId,
  episodeNumber,
  introWindow,
  outroWindow,
  initialSeekSeconds,
  hideTimelineUi: _hideTimelineUi,
  onProgressUpdate,
  animeId,
  animeName,
  animePoster,
  episodeId,
  onBack,
  episodeTitle,
  isOffline,
  sourceType,
  torrentUrl
}) {
  const videoRef = reactExports.useRef(null);
  const containerRef = reactExports.useRef(null);
  const hlsRef = reactExports.useRef(null);
  const controlsTimeoutRef = reactExports.useRef(null);
  const { settings } = useVideoSettings();
  const { skipTimes, fetchSkipTimes } = useAniskip();
  const tatakaiSkipSegments = reactExports.useMemo(() => {
    const segments = [];
    if (introWindow && Number.isFinite(introWindow.start) && Number.isFinite(introWindow.end) && introWindow.end > introWindow.start) {
      segments.push({ startTime: introWindow.start, endTime: introWindow.end, type: "op" });
    }
    if (outroWindow && Number.isFinite(outroWindow.start) && Number.isFinite(outroWindow.end) && outroWindow.end > outroWindow.start) {
      segments.push({ startTime: outroWindow.start, endTime: outroWindow.end, type: "ed" });
    }
    return segments;
  }, [introWindow == null ? void 0 : introWindow.start, introWindow == null ? void 0 : introWindow.end, outroWindow == null ? void 0 : outroWindow.start, outroWindow == null ? void 0 : outroWindow.end]);
  const aniskipSegments = reactExports.useMemo(() => {
    return (skipTimes || []).filter((skip) => {
      var _a, _b;
      return Number.isFinite((_a = skip == null ? void 0 : skip.interval) == null ? void 0 : _a.startTime) && Number.isFinite((_b = skip == null ? void 0 : skip.interval) == null ? void 0 : _b.endTime) && skip.interval.endTime > skip.interval.startTime;
    }).map((skip) => ({
      startTime: skip.interval.startTime,
      endTime: skip.interval.endTime,
      type: skip.skipType
    }));
  }, [skipTimes]);
  const hasTatakaiSkipSegments = tatakaiSkipSegments.length > 0;
  const effectiveSkipSegments = hasTatakaiSkipSegments ? tatakaiSkipSegments : aniskipSegments;
  const nativeMobile = Capacitor.isNativePlatform();
  const resolvedPoster = reactExports.useMemo(() => {
    if (!poster) return void 0;
    if (nativeMobile && getNativeProxyBaseUrl() && /^https?:/i.test(poster)) {
      return registerMobileSource({ url: poster });
    }
    return nativeMobile ? poster : getProxiedImageUrl(poster);
  }, [poster, nativeMobile]);
  const [isPlaying, setIsPlaying] = reactExports.useState(false);
  const [currentTime, setCurrentTime] = reactExports.useState(0);
  const [duration, setDuration] = reactExports.useState(0);
  const [isFullscreen, setIsFullscreen] = reactExports.useState(false);
  const [showControls, setShowControls] = reactExports.useState(true);
  const [buffered, setBuffered] = reactExports.useState(0);
  const [videoError, setVideoError] = reactExports.useState(null);
  const [isBuffering, setIsBuffering] = reactExports.useState(false);
  const [retryCount, setRetryCount] = reactExports.useState(0);
  const retryCountRef = reactExports.useRef(0);
  const candidateIndexRef = reactExports.useRef(0);
  const mediaRetryRef = reactExports.useRef(0);
  const recoveringRef = reactExports.useRef(false);
  const recoverRef = reactExports.useRef(null);
  const metadataAutoplayCleanup = reactExports.useRef(null);
  const stallTimeoutRef = reactExports.useRef(null);
  const [currentSubtitle, setCurrentSubtitle] = reactExports.useState(settings.subtitleLanguage);
  const [showSubtitleMenu, setShowSubtitleMenu] = reactExports.useState(false);
  const [showFullSettings, setShowFullSettings] = reactExports.useState(false);
  const [isLocked, setIsLocked] = reactExports.useState(false);
  const [activeSkip, setActiveSkip] = reactExports.useState(null);
  const [, setPlaybackRate] = reactExports.useState(settings.playbackSpeed);
  const [subtitleBlobs, setSubtitleBlobs] = reactExports.useState({});
  const [upNextCountdown, setUpNextCountdown] = reactExports.useState(null);
  const [hlsAudioTracks, setHlsAudioTracks] = reactExports.useState([]);
  const [currentHlsAudioTrack, setCurrentHlsAudioTrack] = reactExports.useState(-1);
  const settingsSubtitleOptions = reactExports.useMemo(
    () => subtitles.map((sub, idx) => ({
      lang: sub.lang,
      label: sub.label || sub.lang,
      value: getSubtitleSelectionKey(sub, idx)
    })),
    [subtitles]
  );
  const visibleSubtitles = reactExports.useMemo(
    () => subtitles.filter((sub) => {
      const url = String(sub.url || "").trim();
      if (!url) return false;
      if (isBrowserReadyVttUrl(url)) return true;
      if (subtitleBlobs[url]) return true;
      return false;
    }),
    [subtitles, subtitleBlobs]
  );
  const [doubleTapSide, setDoubleTapSide] = reactExports.useState(null);
  const [seekAmount, setSeekAmount] = reactExports.useState(0);
  const [hoverTime, setHoverTime] = reactExports.useState(0);
  const [showHoverTime, setShowHoverTime] = reactExports.useState(false);
  const [hoverPercent, setHoverPercent] = reactExports.useState(0);
  const lastTapRef = reactExports.useRef({ time: 0, x: 0 });
  const doubleTapTimeoutRef = reactExports.useRef(null);
  const seekAccumulatorRef = reactExports.useRef(0);
  const lastSavedProgressRef = reactExports.useRef(0);
  const PROGRESS_SAVE_INTERVAL = 15;
  const currentSource = reactExports.useMemo(
    () => selectPreferredSource(sources, capQualityForDataSaver(settings.defaultQuality)),
    [sources, settings.defaultQuality]
  );
  const sourceUrlKey = (currentSource == null ? void 0 : currentSource.url) || "";
  const sourceTypeKey = (currentSource == null ? void 0 : currentSource.isM3U8) || (currentSource == null ? void 0 : currentSource.sourceType) === "hls" || /\.m3u8(?:$|[?#/])/i.test((currentSource == null ? void 0 : currentSource.url) || "") ? "m3u8" : "file";
  const sourceHeaders = currentSource == null ? void 0 : currentSource.headers;
  const playbackReferer = (sourceHeaders == null ? void 0 : sourceHeaders.Referer) || (sourceHeaders == null ? void 0 : sourceHeaders.referer) || (headers == null ? void 0 : headers.Referer) || "";
  const playbackUserAgent = (sourceHeaders == null ? void 0 : sourceHeaders["User-Agent"]) || (sourceHeaders == null ? void 0 : sourceHeaders["user-agent"]) || (headers == null ? void 0 : headers["User-Agent"]) || "";
  const autoSkippedWindowRef = reactExports.useRef(null);
  const [debridResolvedUrl, setDebridResolvedUrl] = reactExports.useState(null);
  reactExports.useEffect(() => {
    setVideoError(null);
    retryCountRef.current = 0;
    setRetryCount(0);
    setIsBuffering(false);
    setHlsAudioTracks([]);
    setCurrentHlsAudioTrack(-1);
    setDebridResolvedUrl(null);
  }, [sourceUrlKey]);
  reactExports.useEffect(() => {
    if (hasTatakaiSkipSegments) return;
    if (malId && episodeNumber && duration > 0) {
      fetchSkipTimes(malId, episodeNumber, Math.floor(duration));
    }
  }, [malId, episodeNumber, duration, fetchSkipTimes, hasTatakaiSkipSegments]);
  reactExports.useEffect(() => {
    if (effectiveSkipSegments.length === 0) {
      setActiveSkip(null);
      return;
    }
    const skip = effectiveSkipSegments.find((candidate) => currentTime >= candidate.startTime && currentTime < candidate.endTime) || null;
    setActiveSkip(skip);
  }, [currentTime, effectiveSkipSegments]);
  reactExports.useEffect(() => {
    autoSkippedWindowRef.current = null;
  }, [sourceUrlKey]);
  reactExports.useEffect(() => {
    if (!settings.autoSkipIntro || !activeSkip || !videoRef.current) return;
    if (activeSkip.type !== "op" && activeSkip.type !== "mixed-op" && activeSkip.type !== "recap") return;
    const key = `${activeSkip.type}:${activeSkip.startTime}:${activeSkip.endTime}`;
    if (autoSkippedWindowRef.current === key) return;
    videoRef.current.currentTime = activeSkip.endTime;
    autoSkippedWindowRef.current = key;
    setCurrentTime(activeSkip.endTime);
    setActiveSkip(null);
    void triggerHaptic("success");
    ue.success("Skipped intro", { id: "mobile-autoskip", duration: 1800 });
  }, [activeSkip, settings.autoSkipIntro]);
  reactExports.useEffect(() => {
    if (isPlaying && Capacitor.isNativePlatform()) {
      KeepAwake.keepAwake();
    } else {
      KeepAwake.allowSleep();
    }
    return () => {
      KeepAwake.allowSleep();
    };
  }, [isPlaying]);
  reactExports.useEffect(() => {
    if (showControls && isPlaying && !isLocked) {
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false);
      }, 4e3);
    }
    return () => {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, [showControls, isPlaying, isLocked]);
  reactExports.useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = settings.playbackSpeed;
    }
    setPlaybackRate(settings.playbackSpeed);
  }, [settings.playbackSpeed]);
  reactExports.useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = settings.volume;
    }
  }, [settings.volume]);
  reactExports.useEffect(() => {
    setCurrentSubtitle(settings.subtitleLanguage);
  }, [settings.subtitleLanguage]);
  const activeCueLines = useActiveCues(videoRef, `${sourceUrlKey}|${currentSubtitle}`, settings.subtitleOffset);
  const customCueStyle = reactExports.useMemo(() => buildSubtitleCueStyle(settings), [settings]);
  reactExports.useEffect(() => {
    void ensureCustomSubtitleFontLoaded();
  }, []);
  reactExports.useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const applySubtitleMode = () => {
      const tracks = video.textTracks;
      if (!tracks || tracks.length === 0) return;
      let selectedIndex = -1;
      if (currentSubtitle !== "off") {
        if (currentSubtitle === "auto") {
          const englishIndex = subtitles.findIndex((sub) => {
            return subtitleMatchesPreference(sub, "english");
          });
          selectedIndex = englishIndex >= 0 ? englishIndex : 0;
        } else {
          selectedIndex = subtitles.findIndex((sub, idx) => getSubtitleSelectionKey(sub, idx) === currentSubtitle);
          if (selectedIndex < 0) {
            const key = currentSubtitle.toLowerCase();
            selectedIndex = subtitles.findIndex((sub) => {
              return subtitleMatchesPreference(sub, key);
            });
          }
        }
      }
      for (let i = 0; i < tracks.length; i += 1) {
        tracks[i].mode = i === selectedIndex ? "hidden" : "disabled";
      }
    };
    applySubtitleMode();
    video.addEventListener("loadedmetadata", applySubtitleMode);
    return () => {
      video.removeEventListener("loadedmetadata", applySubtitleMode);
    };
  }, [currentSubtitle, subtitles, subtitleBlobs]);
  reactExports.useEffect(() => {
    if (videoRef.current) videoRef.current.loop = Boolean(settings.loopVideo);
  }, [settings.loopVideo, sourceUrlKey]);
  reactExports.useEffect(() => {
    if (!settings.sleepTimer || settings.sleepTimer === "off" || settings.sleepTimer === "end-of-episode") return;
    const minutes = Number(settings.sleepTimer);
    if (!Number.isFinite(minutes) || minutes <= 0) return;
    const id = window.setTimeout(() => {
      var _a;
      (_a = videoRef.current) == null ? void 0 : _a.pause();
      ue.info("Sleep timer: playback paused.");
    }, minutes * 60 * 1e3);
    return () => window.clearTimeout(id);
  }, [settings.sleepTimer, sourceUrlKey]);
  reactExports.useEffect(() => {
    const video = videoRef.current;
    if (!video || !settings.stableVolume || isOffline) return;
    let ctx = null;
    let src = null;
    let comp = null;
    try {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return;
      ctx = new AC();
      src = ctx.createMediaElementSource(video);
      comp = ctx.createDynamicsCompressor();
      comp.threshold.value = -18;
      comp.knee.value = 20;
      comp.ratio.value = 6;
      comp.attack.value = 3e-3;
      comp.release.value = 0.25;
      src.connect(comp);
      comp.connect(ctx.destination);
      void ctx.resume().catch(() => {
      });
    } catch {
      try {
        src == null ? void 0 : src.disconnect();
      } catch {
      }
      try {
        void (ctx == null ? void 0 : ctx.close());
      } catch {
      }
      return;
    }
    return () => {
      try {
        src == null ? void 0 : src.disconnect();
      } catch {
      }
      try {
        comp == null ? void 0 : comp.disconnect();
      } catch {
      }
      try {
        void (ctx == null ? void 0 : ctx.close());
      } catch {
      }
    };
  }, [settings.stableVolume, isOffline, sourceUrlKey]);
  reactExports.useEffect(() => {
    const video = videoRef.current;
    if (!video || !(currentSource == null ? void 0 : currentSource.url)) return;
    const source = currentSource;
    let activeSourceUrl = source.url;
    if (!isOffline && isAnyProxyUrl(activeSourceUrl) && !resolveMobileProxy(activeSourceUrl) && (source == null ? void 0 : source.originalUrl)) {
      activeSourceUrl = reregisterMobileSource({
        url: activeSourceUrl,
        originalUrl: source.originalUrl,
        headers: source.headers
      });
    }
    if (!isOffline && activeSourceUrl.startsWith("magnet:")) {
      if (!debridResolvedUrl) {
        setIsBuffering(true);
        const controller = new AbortController();
        let alive = true;
        void __vitePreload(() => import("./index.C6yfkT5T.js").then((n) => n.hn), true ? __vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11]) : void 0).then(
          (m) => m.debridOrchestrator.resolveMagnetToStream(activeSourceUrl, {
            episodeNumber: source.episodeNumber ?? source.episode,
            // WatchPage threads torrentTitle/title/name; standalone mounts may
            // only carry title — fall back through all of them so season packs
            // still pick the right episode file.
            filenameHint: source.filenameHint ?? source.torrentTitle ?? source.title ?? source.name,
            signal: controller.signal,
            onProgress: (state, progress) => {
              if (!alive) return;
              setIsBuffering(true);
              if (/download|prepar|convert|processing/i.test(state)) {
                setVideoError(null);
              }
            }
          })
        ).then(
          (resolvedUrl) => {
            if (alive) setDebridResolvedUrl(resolvedUrl);
          },
          (err) => {
            if (!alive) return;
            if ((err == null ? void 0 : err.name) === "AbortError") return;
            setVideoError((err instanceof Error ? err.message : String(err)) || "Debrid resolution failed");
            setIsBuffering(false);
          }
        );
        return () => {
          alive = false;
          controller.abort();
        };
      }
      activeSourceUrl = debridResolvedUrl;
    }
    const sourceLooksHls = source.isM3U8 || source.sourceType === "hls" || /\.m3u8(?:$|[?#/])/i.test(activeSourceUrl);
    const isDebridOrigin = (source == null ? void 0 : source.sourceType) === "debrid" || (source == null ? void 0 : source.mode) === "debrid";
    if (nativeMobile && !isOffline && !isDebridOrigin && /^https?:/i.test(activeSourceUrl) && !isAnyProxyUrl(activeSourceUrl)) {
      activeSourceUrl = registerMobileSource({
        url: activeSourceUrl,
        headers: {
          ...(source == null ? void 0 : source.headers) || {},
          ...playbackReferer ? { Referer: playbackReferer } : {},
          ...playbackUserAgent ? { "User-Agent": playbackUserAgent } : {},
          ...(headers == null ? void 0 : headers.Origin) ? { Origin: headers.Origin } : {}
        }
      });
    }
    if (!sourceLooksHls && isMobileProxyUrl(activeSourceUrl)) {
      activeSourceUrl = unwrapMobileProxyUrl(activeSourceUrl, {
        originalUrl: source == null ? void 0 : source.originalUrl
      });
    }
    const upstreamUrl = activeSourceUrl;
    const isHls = sourceLooksHls;
    const hostedUrl = !nativeMobile && !isOffline && !isDebridOrigin && /^https?:/i.test(upstreamUrl) ? getProxiedVideoUrl(upstreamUrl, playbackReferer || void 0, playbackUserAgent || void 0) : upstreamUrl;
    const replayHeaders = (source == null ? void 0 : source.headers) || {};
    const needsHeaderReplay = Boolean(playbackReferer || (headers == null ? void 0 : headers.Origin)) || Object.keys(replayHeaders).some(
      (name) => ["referer", "origin", "cookie", "authorization"].includes(String(name).toLowerCase())
    );
    let candidates = isAnyProxyUrl(upstreamUrl) ? [upstreamUrl] : buildMobilePlaybackCandidates(
      /^https?:/i.test(upstreamUrl) ? upstreamUrl : activeSourceUrl,
      {
        proxiedUrl: hostedUrl,
        referer: playbackReferer || void 0,
        userAgent: playbackUserAgent || void 0,
        refererCandidates: source == null ? void 0 : source.refererCandidates
      }
    );
    if (!isAnyProxyUrl(upstreamUrl) && needsHeaderReplay) {
      candidates = candidates.filter((url) => /^https?:/i.test(url) && url !== upstreamUrl);
      if (!candidates.includes(hostedUrl)) candidates.unshift(hostedUrl);
    }
    if (!candidates.length) candidates = [hostedUrl];
    candidateIndexRef.current = 0;
    mediaRetryRef.current = 0;
    retryCountRef.current = 0;
    setRetryCount(0);
    recoverRef.current = null;
    function giveUp(statusCode, reason) {
      setVideoError("Failed to load video. Please try another server.");
      onError == null ? void 0 : onError({ statusCode, reason });
    }
    let mounted = false;
    let disposed = false;
    function recover() {
      var _a, _b;
      if (disposed) return;
      if (recoveringRef.current) return;
      recoveringRef.current = true;
      try {
        if (mediaRetryRef.current < MAX_MEDIA_RECOVERIES && hlsRef.current) {
          mediaRetryRef.current += 1;
          if (mediaRetryRef.current > 1) {
            try {
              (_b = (_a = hlsRef.current).swapAudioCodec) == null ? void 0 : _b.call(_a);
            } catch {
            }
          }
          try {
            hlsRef.current.recoverMediaError();
            return;
          } catch {
          }
        }
        if (retryCountRef.current < MAX_SAME_URL_RETRIES) {
          retryCountRef.current += 1;
          setRetryCount(retryCountRef.current);
          if (hlsRef.current) {
            try {
              hlsRef.current.startLoad();
              return;
            } catch {
            }
          }
          try {
            video.load();
            return;
          } catch {
          }
        }
        if (candidateIndexRef.current < candidates.length - 1) {
          candidateIndexRef.current += 1;
          retryCountRef.current = 0;
          setRetryCount(0);
          mediaRetryRef.current = 0;
          console.warn(`[MobileVideoPlayer] failing over to candidate ${candidateIndexRef.current + 1}/${candidates.length}`);
          mountAt(candidateIndexRef.current);
          return;
        }
        giveUp();
      } finally {
        recoveringRef.current = false;
      }
    }
    function mountAt(index) {
      if (disposed) return;
      mounted = true;
      const finalUrlResolved = candidates[Math.min(Math.max(index, 0), candidates.length - 1)];
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
      try {
        video.pause();
        video.removeAttribute("src");
        video.load();
      } catch {
      }
      let metadataAutoplayHandler = null;
      metadataAutoplayCleanup.current = () => {
        if (metadataAutoplayHandler) {
          video.removeEventListener("loadedmetadata", metadataAutoplayHandler);
          metadataAutoplayHandler = null;
        }
      };
      if (isHls && Hls.isSupported()) {
        const { backBufferLength, maxBufferLength, maxMaxBufferLength } = getProfileKnobs(getEffectiveMemoryProfile()).hls;
        const hls = new Hls({
          enableWorker: true,
          // VOD fast-start: low-latency mode adds part-request overhead on
          // proxied segments. Off matches desktop HlsAdapter tuning.
          lowLatencyMode: false,
          autoStartLoad: true,
          startFragPrefetch: true,
          // Start with the smallest rendition for the first frame, then ramp up
          // aggressively once the first native fragment reports throughput. The
          // previous -1 auto start could choose a multi-megabyte 1080p fragment
          // before the bridge had any bandwidth sample.
          startLevel: 0,
          // Conservative initial estimate for LTE: the old 5 Mbps started with
          // a heavy 1080p fragment before the bridge had any bandwidth sample,
          // delaying first frame and causing early rebuffering.
          abrEwmaDefaultEstimate: 1e6,
          abrBandWidthFactor: 0.9,
          abrBandWidthUpFactor: 0.8,
          maxStarvationDelay: 2,
          maxLoadingDelay: 2,
          // Mobile-tuned: enough forward buffer to avoid immediate rebuffering,
          // without making startup wait on a large memory target.
          backBufferLength,
          maxBufferLength,
          maxMaxBufferLength,
          // capping to player size made fullscreen rotation re-evaluate levels
          // mid-episode and rebuffer; the ABR defaults handle mobile well enough.
          capLevelToPlayerSize: false,
          // 30 MB (was 60 MB): enough forward buffer to avoid immediate
          // rebuffering without GC/memory pressure stalling low-end phones.
          maxBufferSize: 30 * 1e3 * 1e3,
          // Fast failover: dead proxy candidate advances after ~1s, not ~5s.
          // Default XHR against loopback uses no per-segment JS bridge;
          // Referer/UA replay
          // happens inside the native service.
          manifestLoadingMaxRetry: 1,
          levelLoadingMaxRetry: 2,
          fragLoadingMaxRetry: 1,
          manifestLoadingRetryDelay: 400,
          levelLoadingRetryDelay: 400,
          fragLoadingRetryDelay: 400,
          // `mobile-proxy://` is the compatibility path for older cached
          // rows. Android/iOS loopback URLs use hls.js's native XHR
          // loader so fragments stream over localhost just like desktop.
          ...isMobileProxyUrl(finalUrlResolved) ? {
            loader: createNativeHlsLoader({
              referer: playbackReferer || void 0,
              userAgent: playbackUserAgent || void 0,
              origin: headers == null ? void 0 : headers.Origin
            })
          } : {}
        });
        hls.loadSource(finalUrlResolved);
        hls.attachMedia(video);
        hlsRef.current = hls;
        const syncAudioTracks = () => {
          try {
            const list = (hls.audioTracks || []).map((t, i) => ({
              id: typeof t.id === "number" ? t.id : i,
              label: String(t.name || `Audio ${i + 1}`),
              lang: String(t.lang || "und")
            }));
            setHlsAudioTracks(list);
            setCurrentHlsAudioTrack(typeof hls.audioTrack === "number" ? hls.audioTrack : -1);
          } catch {
          }
        };
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          syncAudioTracks();
          if (initialSeekSeconds && initialSeekSeconds > 0) {
            video.currentTime = initialSeekSeconds;
          }
          if (shouldAutoplayVideo(settings.autoplay)) {
            video.play().catch(console.error);
          }
        });
        hls.on(Hls.Events.AUDIO_TRACKS_UPDATED, syncAudioTracks);
        hls.on(Hls.Events.AUDIO_TRACK_SWITCHED, (_, data) => {
          if (typeof (data == null ? void 0 : data.id) === "number") setCurrentHlsAudioTrack(data.id);
        });
        hls.on(Hls.Events.FRAG_BUFFERED, () => {
          mediaRetryRef.current = 0;
          retryCountRef.current = 0;
        });
        hls.on(Hls.Events.ERROR, (_, data) => {
          var _a, _b, _c;
          if (!(data == null ? void 0 : data.fatal)) return;
          const status = Number(((_a = data == null ? void 0 : data.response) == null ? void 0 : _a.code) || ((_b = data == null ? void 0 : data.networkDetails) == null ? void 0 : _b.status) || 0);
          if (data.type === Hls.ErrorTypes.MEDIA_ERROR) {
            if (mediaRetryRef.current < MAX_MEDIA_RECOVERIES) {
              mediaRetryRef.current += 1;
              if (mediaRetryRef.current > 1) {
                try {
                  (_c = hls.swapAudioCodec) == null ? void 0 : _c.call(hls);
                } catch {
                }
              }
              try {
                hls.recoverMediaError();
                return;
              } catch {
              }
            }
          }
          if (retryCountRef.current < MAX_SAME_URL_RETRIES) {
            retryCountRef.current += 1;
            setRetryCount(retryCountRef.current);
            console.warn(`[MobileVideoPlayer] retry ${retryCountRef.current}/${MAX_SAME_URL_RETRIES} (${String(data.details || "error")}${status ? ` status=${status}` : ""})`);
            try {
              hls.startLoad();
              return;
            } catch {
            }
          }
          if (candidateIndexRef.current < candidates.length - 1) {
            candidateIndexRef.current += 1;
            retryCountRef.current = 0;
            setRetryCount(0);
            mediaRetryRef.current = 0;
            console.warn(`[MobileVideoPlayer] failing over to candidate ${candidateIndexRef.current + 1}/${candidates.length}`);
            mountAt(candidateIndexRef.current);
            return;
          }
          giveUp(status || void 0, `hls-${String(data.type || "error")}-${String(data.details || "fatal")}`);
        });
      } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
        video.src = finalUrlResolved;
        if (initialSeekSeconds && initialSeekSeconds > 0) {
          video.currentTime = initialSeekSeconds;
        }
        if (shouldAutoplayVideo(settings.autoplay)) {
          metadataAutoplayHandler = () => {
            video.play().catch(console.error);
            video.removeEventListener("loadedmetadata", metadataAutoplayHandler);
          };
          if (video.readyState >= 1) {
            video.play().catch(console.error);
          } else {
            video.addEventListener("loadedmetadata", metadataAutoplayHandler);
          }
        }
      } else {
        setIsBuffering(false);
        video.src = finalUrlResolved;
        if (initialSeekSeconds && initialSeekSeconds > 0) {
          video.currentTime = initialSeekSeconds;
        }
        if (shouldAutoplayVideo(settings.autoplay)) {
          metadataAutoplayHandler = () => {
            video.play().catch(console.error);
            video.removeEventListener("loadedmetadata", metadataAutoplayHandler);
          };
          if (video.readyState >= 1) {
            video.play().catch(console.error);
          } else {
            video.addEventListener("loadedmetadata", metadataAutoplayHandler);
          }
        }
      }
      recoverRef.current = recover;
    }
    void (async () => {
      if (!mounted && candidates.length > 1) {
        const budget = 1500;
        const slice = candidates.slice(0, PROBE_CANDIDATES);
        const probes = slice.map(async (url, i) => {
          const ok = await probePlaybackCandidate(url, {
            timeoutMs: budget,
            range: isHls ? false : true
          });
          if (!ok) throw new Error(`dead:${i}`);
          return i;
        });
        try {
          const winner = await firstFulfilled(probes);
          candidateIndexRef.current = winner;
          try {
            const u = new URL(candidates[winner]);
            markProxyWorking(`${u.origin}${u.pathname}`.replace(/\/$/, ""), u.searchParams.get("referer") || void 0);
          } catch {
          }
        } catch {
        }
      }
      if (!disposed && !mounted) mountAt(candidateIndexRef.current);
    })();
    return () => {
      disposed = true;
      if (metadataAutoplayCleanup.current) {
        metadataAutoplayCleanup.current();
        metadataAutoplayCleanup.current = null;
      }
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
    };
  }, [currentSource, sourceUrlKey, sourceTypeKey, initialSeekSeconds, isOffline, nativeMobile, playbackReferer, playbackUserAgent, headers == null ? void 0 : headers.Origin, settings.autoplay, onError, debridResolvedUrl]);
  reactExports.useEffect(() => {
    if (!subtitles.length) {
      setSubtitleBlobs({});
      return;
    }
    let mounted = true;
    const createdBlobUrls = [];
    const fetchOne = async (sub, i) => {
      const subtitleKey = getSubtitleSelectionKey(sub, i);
      const subtitleSourceUrl = String(sub.url || "").trim();
      if (!subtitleSourceUrl) return null;
      if (subtitleSourceUrl.startsWith("asset://") || subtitleSourceUrl.includes("asset.localhost")) {
        return { key: subtitleKey, url: subtitleSourceUrl, blob: subtitleSourceUrl, raw: subtitleSourceUrl };
      }
      try {
        const candidates = buildSubtitleFetchCandidates(
          subtitleSourceUrl,
          playbackReferer,
          Boolean(isOffline),
          (url, referer) => nativeMobile ? registerMobileSource({
            url,
            headers: {
              ...referer ? { Referer: referer } : {},
              ...playbackUserAgent ? { "User-Agent": playbackUserAgent } : {}
            }
          }) : getProxiedSubtitleUrl(url, referer)
        );
        let normalizedText = "";
        for (const candidateUrl of candidates) {
          try {
            const response = await fetch(candidateUrl, {
              headers: {
                Accept: "text/vtt, text/plain, */*"
              },
              signal: AbortSignal.timeout(8e3)
            });
            if (!response.ok) {
              continue;
            }
            normalizedText = normalizeSubtitleToVtt(await response.text());
            if (normalizedText) {
              break;
            }
          } catch {
          }
        }
        if (!normalizedText) {
          console.warn("Failed to load subtitle:", sub.lang, subtitleSourceUrl);
          return null;
        }
        const blob = new Blob([normalizedText], { type: "text/vtt" });
        const blobUrl = URL.createObjectURL(blob);
        createdBlobUrls.push(blobUrl);
        return { key: subtitleKey, url: subtitleSourceUrl, blob: blobUrl, raw: subtitleSourceUrl };
      } catch (e) {
        console.warn("Failed to load subtitle:", sub.lang, e);
        return null;
      }
    };
    setSubtitleBlobs({});
    const ordered = subtitles.map((sub, i) => ({ sub, i })).sort((a, b) => {
      const aEn = subtitleMatchesPreference(a.sub, "english") ? 0 : 1;
      const bEn = subtitleMatchesPreference(b.sub, "english") ? 0 : 1;
      return aEn - bEn || a.i - b.i;
    });
    let idx = 0;
    const CONCURRENCY = 4;
    const worker = async () => {
      while (mounted && idx < ordered.length) {
        const { sub, i } = ordered[idx++];
        const res = await fetchOne(sub, i);
        if (!mounted || !res) continue;
        setSubtitleBlobs((prev) => {
          if (prev[res.key] === res.blob) return prev;
          return { ...prev, [res.key]: res.blob, [res.raw]: res.blob };
        });
      }
    };
    void Promise.all(Array.from({ length: Math.min(CONCURRENCY, ordered.length) }, worker));
    return () => {
      mounted = false;
      createdBlobUrls.forEach((blobUrl) => {
        try {
          if (!blobUrl.startsWith("asset://")) URL.revokeObjectURL(blobUrl);
        } catch {
        }
      });
    };
  }, [subtitles, playbackReferer, playbackUserAgent, isOffline, nativeMobile]);
  reactExports.useEffect(() => {
    if (!subtitles.length || currentSubtitle === "off") return;
    const keys = subtitles.map((sub, idx) => getSubtitleSelectionKey(sub, idx));
    if (keys.includes(currentSubtitle)) return;
    const englishIndex = subtitles.findIndex((sub) => {
      return subtitleMatchesPreference(sub, "english");
    });
    const fallbackIndex = englishIndex >= 0 ? englishIndex : 0;
    setCurrentSubtitle(getSubtitleSelectionKey(subtitles[fallbackIndex], fallbackIndex));
  }, [subtitles, currentSubtitle]);
  reactExports.useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
      const diff = video.currentTime - lastSavedProgressRef.current;
      if (Math.abs(diff) >= PROGRESS_SAVE_INTERVAL) {
        lastSavedProgressRef.current = video.currentTime;
        onProgressUpdate == null ? void 0 : onProgressUpdate(video.currentTime, video.duration, false);
      }
    };
    const handleDurationChange = () => setDuration(video.duration);
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => {
      setIsPlaying(false);
      const t = Math.floor(video.currentTime || 0);
      if (t > 0) onProgressUpdate == null ? void 0 : onProgressUpdate(t, Math.floor(video.duration || 0) || 0, false, true);
    };
    const handleWaiting = () => {
      setIsBuffering(true);
      if (stallTimeoutRef.current) clearTimeout(stallTimeoutRef.current);
      stallTimeoutRef.current = setTimeout(() => {
        var _a;
        stallTimeoutRef.current = null;
        if (!videoRef.current || videoRef.current.ended) return;
        const stuck = !videoRef.current.seeking && !videoRef.current.paused;
        if (!stuck) return;
        console.warn("[MobileVideoPlayer] stall timeout — recovering");
        (_a = recoverRef.current) == null ? void 0 : _a.call(recoverRef);
      }, STALL_TIMEOUT_MS);
    };
    const handlePlaying = () => {
      setIsBuffering(false);
      if (stallTimeoutRef.current) {
        clearTimeout(stallTimeoutRef.current);
        stallTimeoutRef.current = null;
      }
    };
    const handleProgress = () => {
      if (video.buffered.length > 0) {
        setBuffered(video.buffered.end(video.buffered.length - 1));
      }
    };
    const handleEnded = () => {
      onProgressUpdate == null ? void 0 : onProgressUpdate(video.duration, video.duration, true);
      if (settings.sleepTimer === "end-of-episode") return;
      if (settings.autoNextEpisode) {
        setUpNextCountdown(Math.max(1, Math.round(settings.autoNextCountdownSeconds || 10)));
      }
    };
    const handleError = () => {
      var _a;
      setVideoError("Error loading video");
      void triggerHaptic("error");
      onError == null ? void 0 : onError({
        reason: `media-element-${((_a = video.error) == null ? void 0 : _a.code) || "unknown"}`
      });
    };
    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("durationchange", handleDurationChange);
    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePause);
    video.addEventListener("waiting", handleWaiting);
    video.addEventListener("playing", handlePlaying);
    video.addEventListener("progress", handleProgress);
    video.addEventListener("ended", handleEnded);
    video.addEventListener("error", handleError);
    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("durationchange", handleDurationChange);
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("pause", handlePause);
      video.removeEventListener("waiting", handleWaiting);
      video.removeEventListener("playing", handlePlaying);
      video.removeEventListener("progress", handleProgress);
      video.removeEventListener("ended", handleEnded);
      video.removeEventListener("error", handleError);
    };
  }, [onEpisodeEnd, onProgressUpdate, onError, settings.autoNextEpisode, settings.autoNextCountdownSeconds, settings.sleepTimer]);
  reactExports.useEffect(() => {
    if (upNextCountdown === null) return;
    if (upNextCountdown <= 0) {
      setUpNextCountdown(null);
      onEpisodeEnd == null ? void 0 : onEpisodeEnd();
      return;
    }
    const id = window.setTimeout(() => {
      setUpNextCountdown((prev) => prev === null ? null : prev - 1);
    }, 1e3);
    return () => window.clearTimeout(id);
  }, [upNextCountdown, onEpisodeEnd]);
  const progressCbRef = reactExports.useRef(onProgressUpdate);
  reactExports.useEffect(() => {
    progressCbRef.current = onProgressUpdate;
  }, [onProgressUpdate]);
  reactExports.useEffect(() => {
    const saveNow = () => {
      var _a;
      const video = videoRef.current;
      if (!video) return;
      const t = Math.floor(video.currentTime || 0);
      const dur = Math.floor(video.duration || 0) || void 0;
      if (t > 0) (_a = progressCbRef.current) == null ? void 0 : _a.call(progressCbRef, t, dur, false, true);
    };
    const onVisibility = () => {
      if (document.visibilityState === "hidden") saveNow();
    };
    window.addEventListener("beforeunload", saveNow);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      window.removeEventListener("beforeunload", saveNow);
      document.removeEventListener("visibilitychange", onVisibility);
      saveNow();
    };
  }, []);
  const lockLandscapeOrientation = reactExports.useCallback(async () => {
    if (Capacitor.isNativePlatform()) {
      try {
        await ScreenOrientation.lock({ orientation: "landscape" });
      } catch (e) {
        console.warn("Native orientation lock failed:", e);
      }
    }
    try {
      const orientationApi = screen.orientation;
      if (orientationApi == null ? void 0 : orientationApi.lock) {
        await orientationApi.lock("landscape");
      }
    } catch {
    }
  }, []);
  const unlockOrientation = reactExports.useCallback(async () => {
    var _a;
    if (Capacitor.isNativePlatform()) {
      try {
        await ScreenOrientation.unlock();
      } catch (e) {
        console.warn("Native orientation unlock failed:", e);
      }
    }
    try {
      if ((_a = screen.orientation) == null ? void 0 : _a.unlock) {
        screen.orientation.unlock();
      }
    } catch {
    }
  }, []);
  const originalBodyOverflowRef = reactExports.useRef(null);
  const isFullscreenRef = reactExports.useRef(false);
  isFullscreenRef.current = isFullscreen;
  const setPlayerFullscreenSignal = reactExports.useCallback((on) => {
    try {
      document.body.classList.toggle(MOBILE_PLAYER_FULLSCREEN_CLASS, on);
      document.documentElement.classList.toggle(MOBILE_PLAYER_FULLSCREEN_CLASS, on);
      window.dispatchEvent(
        new CustomEvent(MOBILE_PLAYER_FULLSCREEN_EVENT, { detail: { fullscreen: on } })
      );
    } catch {
    }
  }, []);
  const applyFullscreenStyles = reactExports.useCallback(() => {
    try {
      if (originalBodyOverflowRef.current === null) {
        originalBodyOverflowRef.current = document.body.style.overflow || "";
      }
      document.body.style.overflow = "hidden";
    } catch {
    }
    const container = containerRef.current;
    if (container) {
      container.style.position = "fixed";
      container.style.top = "0";
      container.style.left = "0";
      container.style.width = "100vw";
      container.style.height = "100vh";
      container.style.zIndex = "99999";
      container.style.backgroundColor = "black";
      container.classList.add("is-player-fullscreen");
    }
    setPlayerFullscreenSignal(true);
  }, [setPlayerFullscreenSignal]);
  const clearFullscreenStyles = reactExports.useCallback(() => {
    try {
      document.body.style.overflow = originalBodyOverflowRef.current === null ? "" : originalBodyOverflowRef.current;
    } catch {
    }
    originalBodyOverflowRef.current = null;
    const container = containerRef.current;
    if (container) {
      container.style.position = "";
      container.style.top = "";
      container.style.left = "";
      container.style.width = "";
      container.style.height = "";
      container.style.zIndex = "";
      container.style.backgroundColor = "";
      container.classList.remove("is-player-fullscreen");
    }
    setPlayerFullscreenSignal(false);
  }, [setPlayerFullscreenSignal]);
  const toggleFullscreen = async () => {
    if (!containerRef.current && !isFullscreenRef.current) return;
    if (!isFullscreenRef.current) {
      if (Capacitor.isNativePlatform()) {
        try {
          await StatusBar.hide();
        } catch (e) {
          console.warn("Failed to hide status bar:", e);
        }
      }
      await lockLandscapeOrientation();
      applyFullscreenStyles();
      setIsFullscreen(true);
    } else {
      try {
        if (Capacitor.isNativePlatform()) {
          try {
            await StatusBar.show();
          } catch (e) {
            console.warn("Failed to show status bar:", e);
          }
        }
        await unlockOrientation();
      } finally {
        clearFullscreenStyles();
        setIsFullscreen(false);
      }
    }
  };
  reactExports.useEffect(() => {
    const handleNativeFullscreenChange = () => {
      const nativeActive = Boolean(document.fullscreenElement) || Boolean(document.webkitFullscreenElement);
      if (!nativeActive && isFullscreenRef.current) {
        clearFullscreenStyles();
        setIsFullscreen(false);
        if (Capacitor.isNativePlatform()) {
          StatusBar.show().catch(() => void 0);
        }
        unlockOrientation().catch(() => void 0);
      }
    };
    document.addEventListener("fullscreenchange", handleNativeFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleNativeFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleNativeFullscreenChange);
      document.removeEventListener("webkitfullscreenchange", handleNativeFullscreenChange);
    };
  }, [clearFullscreenStyles, unlockOrientation]);
  reactExports.useEffect(() => {
    return () => {
      clearFullscreenStyles();
      if (Capacitor.isNativePlatform()) {
        StatusBar.show().catch(() => void 0);
      }
      unlockOrientation().catch(() => void 0);
    };
  }, [clearFullscreenStyles, unlockOrientation]);
  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    void triggerHaptic("toggle");
    if (isPlaying) {
      video.pause();
    } else {
      video.play().catch(console.error);
    }
  };
  const seek = (time) => {
    const video = videoRef.current;
    if (!video) return;
    const newTime = Math.max(0, Math.min(time, duration));
    video.currentTime = newTime;
    setCurrentTime(newTime);
  };
  const skipIntro = () => {
    if (activeSkip) {
      seek(activeSkip.endTime);
    }
  };
  const handleTap = (e) => {
    var _a;
    if (isLocked) return;
    const target = e.target;
    if (target instanceof Element && target.closest('button, [role="button"], [data-player-interactive="true"]')) {
      return;
    }
    const now = Date.now();
    const { clientX } = e.changedTouches[0];
    const containerRect = (_a = containerRef.current) == null ? void 0 : _a.getBoundingClientRect();
    const containerMidpoint = containerRect ? containerRect.left + containerRect.width / 2 : window.innerWidth / 2;
    const isLeftSide = clientX < containerMidpoint;
    const timeDiff = now - lastTapRef.current.time;
    const isDoubleTap = timeDiff < 300;
    if (isDoubleTap) {
      if (doubleTapTimeoutRef.current) {
        clearTimeout(doubleTapTimeoutRef.current);
      }
      void triggerHaptic("select");
      const seekSeconds = 10;
      const direction = isLeftSide ? -1 : 1;
      seekAccumulatorRef.current += seekSeconds;
      seek(currentTime + seekSeconds * direction);
      setDoubleTapSide(isLeftSide ? "left" : "right");
      setSeekAmount(seekAccumulatorRef.current);
      setTimeout(() => {
        setDoubleTapSide(null);
        seekAccumulatorRef.current = 0;
      }, 800);
    } else {
      doubleTapTimeoutRef.current = setTimeout(() => {
        setShowControls((prev) => !prev);
      }, 300);
    }
    lastTapRef.current = { time: now, x: clientX };
  };
  const handleProgressSeek = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.changedTouches[0].clientX - rect.left;
    const percent = x / rect.width;
    seek(percent * duration);
  };
  const handleProgressBarHover = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clientX = e.clientX;
    const percent = (clientX - rect.left) / rect.width;
    const clampedPercent = Math.max(0, Math.min(1, percent));
    const time = clampedPercent * duration;
    setHoverPercent(clampedPercent * 100);
    setHoverTime(time);
    setShowHoverTime(true);
  };
  const handleProgressBarLeave = () => {
    setShowHoverTime(false);
  };
  const handleSubtitleChange = (lang) => {
    void triggerHaptic("select");
    setCurrentSubtitle(lang);
    setShowSubtitleMenu(false);
  };
  const handleHlsAudioChange = (id) => {
    try {
      if (hlsRef.current) hlsRef.current.audioTrack = id;
      setCurrentHlsAudioTrack(id);
    } catch {
    }
  };
  const handleScreenshot = () => {
    if (!videoRef.current) return;
    try {
      const canvas = document.createElement("canvas");
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.drawImage(videoRef.current, 0, 0);
      canvas.toBlob((blob) => {
        if (!blob) return;
        const timestamp = (/* @__PURE__ */ new Date()).toLocaleString("en-US", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit"
        }).replace(/[/,: ]/g, "-");
        const filename = `screenshot-${animeName || "anime"}-ep${episodeNumber || "?"}-${timestamp}.png`;
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        ue.success(`Screenshot saved: ${filename}`);
      }, "image/png");
    } catch (err) {
      console.error("Screenshot failed:", err);
      ue.error("Failed to create screenshot");
    }
  };
  const handleRetry = () => {
    if (onRetryCurrentServer) onRetryCurrentServer();
    setVideoError(null);
    retryCountRef.current = 0;
    setRetryCount(0);
  };
  if (videoError) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative w-full aspect-video bg-black flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-16 h-16 text-red-500 mx-auto mb-4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white text-lg mb-4", children: videoError }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-3 justify-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: handleRetry,
            className: "flex items-center gap-2 px-6 py-3 bg-primary rounded-xl text-white text-lg",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-5 h-5" }),
              "Retry"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: () => window.location.reload(),
            className: "flex items-center gap-2 px-6 py-3 bg-white/10 rounded-xl text-white text-lg",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-5 h-5" }),
              "Refresh"
            ]
          }
        ),
        onServerSwitch && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: onServerSwitch,
            className: "px-6 py-3 bg-white/10 rounded-xl text-white text-lg",
            children: "Switch Server"
          }
        )
      ] })
    ] }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      ref: containerRef,
      className: cn(
        "video-player-container relative w-full aspect-video bg-black select-none touch-none",
        isFullscreen && "is-player-fullscreen"
      ),
      onTouchEnd: handleTap,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "video",
          {
            ref: videoRef,
            className: "w-full h-full object-contain",
            poster: resolvedPoster,
            preload: "auto",
            playsInline: true,
            crossOrigin: "anonymous",
            children: subtitles.map((sub, idx) => {
              const subtitleKey = getSubtitleSelectionKey(sub, idx);
              const subtitleSourceUrl = String(sub.url || "").trim();
              if (!subtitleSourceUrl) return null;
              const blobUrl = subtitleBlobs[subtitleSourceUrl] || subtitleBlobs[subtitleKey];
              const proxiedSubtitleUrl = !isOffline && !nativeMobile ? getProxiedSubtitleUrl(subtitleSourceUrl, playbackReferer) : subtitleSourceUrl;
              const src = blobUrl || (isBrowserReadyVttUrl(proxiedSubtitleUrl || "") ? proxiedSubtitleUrl : void 0);
              if (!src) return null;
              return /* @__PURE__ */ jsxRuntimeExports.jsx(
                "track",
                {
                  kind: "subtitles",
                  label: sub.label || sub.lang,
                  srcLang: sub.lang,
                  src,
                  default: subtitleKey === currentSubtitle
                },
                subtitleKey
              );
            })
          }
        ),
        activeCueLines.length > 0 && currentSubtitle !== "off" && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "pointer-events-none absolute inset-x-0 z-20 flex flex-col items-center gap-1 px-4 text-center",
            style: { bottom: `${40 + settings.subtitlePosition * 6 + (showControls ? 64 : 0)}px` },
            "aria-live": "polite",
            children: activeCueLines.map((line, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: customCueStyle, children: line }, `${idx}-${line}`))
          }
        ),
        (isLoading || isBuffering) && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute inset-0 z-20 flex items-center justify-center bg-black/30", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-16 h-16 text-primary animate-spin" }) }),
        upNextCountdown !== null && /* @__PURE__ */ jsxRuntimeExports.jsx(
          UpNextOverlay,
          {
            secondsLeft: upNextCountdown,
            total: Math.max(1, Math.round(settings.autoNextCountdownSeconds || 10)),
            episodeNumber: typeof episodeNumber === "number" ? episodeNumber + 1 : void 0,
            onPlayNow: () => {
              setUpNextCountdown(null);
              onEpisodeEnd == null ? void 0 : onEpisodeEnd();
            },
            onCancel: () => setUpNextCountdown(null)
          }
        ),
        doubleTapSide && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: cn(
              "pointer-events-none absolute top-1/2 z-40 -translate-y-1/2 flex flex-col items-center gap-2",
              doubleTapSide === "left" ? "left-12" : "right-12"
            ),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center animate-pulse", children: doubleTapSide === "left" ? /* @__PURE__ */ jsxRuntimeExports.jsx(Rewind, { className: "w-10 h-10 text-white" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(FastForward, { className: "w-10 h-10 text-white" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-white text-xl font-bold drop-shadow-lg", children: [
                seekAmount,
                "s"
              ] })
            ]
          }
        ),
        isLocked && showControls && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 z-30 flex items-center justify-center bg-black/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => setIsLocked(false),
            className: "p-8 rounded-full bg-white/10 backdrop-blur-md border border-white/20",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(LockOpen, { className: "w-12 h-12 text-white drop-shadow-lg" })
          }
        ) }),
        showControls && !isLocked && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 z-30 bg-gradient-to-b from-black/80 via-transparent to-black/90", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 left-0 right-0 p-3 safe-area-top", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 flex-1 min-w-0", children: [
              onBack && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  onClick: onBack,
                  className: "p-2.5 rounded-full bg-white/10 backdrop-blur-md active:bg-white/20 border border-white/10",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "w-6 h-6 text-white" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-white text-base font-bold truncate drop-shadow-lg", children: animeName }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-white/80 text-xs truncate", children: [
                  "Episode ",
                  episodeNumber,
                  " ",
                  episodeTitle ? `• ${episodeTitle}` : ""
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                onClick: () => setIsLocked(true),
                className: "p-2.5 rounded-full bg-white/10 backdrop-blur-md active:bg-white/20 border border-white/10",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-5 h-5 text-white" })
              }
            ) })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                onClick: () => seek(currentTime - 10),
                className: "p-3 rounded-full bg-white/10 backdrop-blur-md active:bg-white/20 border border-white/10",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(SkipBack, { className: "w-7 h-7 text-white drop-shadow-lg" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                onClick: togglePlay,
                className: "p-5 rounded-full bg-primary backdrop-blur-md active:scale-95 transition-transform shadow-2xl border-2 border-white/20",
                children: isPlaying ? /* @__PURE__ */ jsxRuntimeExports.jsx(Pause, { className: "w-10 h-10 text-white" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "w-10 h-10 text-white ml-0.5" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                onClick: () => seek(currentTime + 10),
                className: "p-3 rounded-full bg-white/10 backdrop-blur-md active:bg-white/20 border border-white/10",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(SkipForward, { className: "w-7 h-7 text-white drop-shadow-lg" })
              }
            )
          ] }),
          activeSkip && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              onClick: skipIntro,
              className: "absolute right-4 bottom-32 px-8 py-4 bg-white/95 backdrop-blur-md rounded-2xl text-black font-bold text-base shadow-2xl border-2 border-white/20 active:scale-95 transition-transform",
              children: [
                "Skip ",
                activeSkip.type === "op" || activeSkip.type === "mixed-op" ? "Intro" : activeSkip.type === "recap" ? "Recap" : "Outro"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute bottom-0 left-0 right-0 p-3 pb-4 safe-area-bottom", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "relative h-1.5 bg-white/20 rounded-full mb-3 touch-none",
                "data-player-interactive": "true",
                onTouchStart: handleProgressSeek,
                onTouchMove: handleProgressSeek,
                onMouseMove: handleProgressBarHover,
                onMouseLeave: handleProgressBarLeave,
                children: [
                  showHoverTime && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "absolute bottom-full mb-2 bg-black/90 text-white text-xs px-2 py-1 rounded whitespace-nowrap pointer-events-none z-50 font-medium",
                      style: { left: `calc(${hoverPercent}% - 24px)` },
                      children: formatTime(hoverTime)
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "absolute h-full bg-white/30 rounded-full",
                      style: { width: `${buffered / duration * 100}%` }
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "absolute h-full bg-primary rounded-full shadow-lg",
                      style: { width: `${currentTime / duration * 100}%` }
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-xl border-2 border-primary",
                      style: { left: `calc(${currentTime / duration * 100}% - 8px)` }
                    }
                  )
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-white text-sm font-semibold drop-shadow-lg", children: [
                formatTime(currentTime),
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/60", children: "/" }),
                " ",
                formatTime(duration)
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      onClick: () => {
                        setShowSubtitleMenu(!showSubtitleMenu);
                      },
                      "aria-label": "Subtitles",
                      className: cn(
                        "p-2.5 rounded-full backdrop-blur-md active:scale-95 transition-transform border",
                        currentSubtitle !== "off" ? "bg-primary border-white/20" : "bg-white/10 border-white/10"
                      ),
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Captions, { className: "w-5 h-5 text-white" })
                    }
                  ),
                  showSubtitleMenu && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute bottom-14 right-0 bg-black/95 backdrop-blur-xl rounded-2xl p-2 min-w-[180px] max-h-[250px] overflow-y-auto border border-white/10 shadow-2xl z-30", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        onClick: () => handleSubtitleChange("off"),
                        className: cn(
                          "w-full px-4 py-3 text-left text-sm rounded-xl transition-colors",
                          currentSubtitle === "off" ? "bg-primary text-white font-semibold" : "text-white/80 hover:bg-white/5"
                        ),
                        children: "Off"
                      }
                    ),
                    visibleSubtitles.map((sub, idx) => {
                      const subtitleKey = getSubtitleSelectionKey(sub, idx);
                      return /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "button",
                        {
                          onClick: () => handleSubtitleChange(subtitleKey),
                          className: cn(
                            "w-full px-4 py-3 text-left text-sm rounded-xl transition-colors",
                            currentSubtitle === subtitleKey ? "bg-primary text-white font-semibold" : "text-white/80 hover:bg-white/5"
                          ),
                          children: sub.label || sub.lang
                        },
                        subtitleKey
                      );
                    })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    onClick: () => {
                      setShowSubtitleMenu(false);
                      setShowFullSettings(true);
                    },
                    "aria-label": "Player settings",
                    className: "p-2.5 rounded-full bg-white/10 backdrop-blur-md active:scale-95 transition-transform border border-white/10",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Settings, { className: "w-5 h-5 text-white" })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    onClick: toggleFullscreen,
                    className: "p-2.5 rounded-full bg-white/10 backdrop-blur-md active:scale-95 transition-transform border border-white/10",
                    children: isFullscreen ? /* @__PURE__ */ jsxRuntimeExports.jsx(Minimize, { className: "w-5 h-5 text-white" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Maximize, { className: "w-5 h-5 text-white" })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    onClick: handleScreenshot,
                    className: "p-2.5 rounded-full bg-white/10 backdrop-blur-md active:scale-95 transition-transform border border-white/10",
                    title: "Take Screenshot",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Camera, { className: "w-5 h-5 text-white" })
                  }
                ),
                Boolean(episodeId) && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-white [&_button]:!bg-transparent [&_button]:!p-2.5 [&_button]:!rounded-full [&_svg]:!w-5 [&_svg]:!h-5 [&_svg]:text-white", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  DownloadButton,
                  {
                    episodeId,
                    animeName,
                    episodeNumber,
                    posterUrl: animePoster ?? poster,
                    sourceUrl: currentSource == null ? void 0 : currentSource.url,
                    sourceType: (currentSource == null ? void 0 : currentSource.sourceType) ?? sourceType,
                    torrentUrl: String((currentSource == null ? void 0 : currentSource.sourceType) ?? sourceType ?? "").toLowerCase() === "torrent" || String((currentSource == null ? void 0 : currentSource.sourceType) ?? sourceType ?? "").toLowerCase() === "debrid" || String((currentSource == null ? void 0 : currentSource.url) || "").startsWith("magnet:") ? torrentUrl : void 0,
                    headers: {
                      ...playbackReferer ? { Referer: playbackReferer } : {},
                      ...playbackUserAgent ? { "User-Agent": playbackUserAgent } : {},
                      ...(headers == null ? void 0 : headers.Origin) ? { Origin: headers.Origin } : {}
                    },
                    animeId: animeId ?? (typeof malId === "number" ? malId : null),
                    subtitles
                  }
                ) })
              ] })
            ] })
          ] })
        ] }),
        serverName && showControls && !isLocked && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute top-20 right-3 z-40 px-3 py-1.5 bg-black/60 backdrop-blur-md rounded-full border border-white/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/80 text-xs font-medium", children: serverName }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          VideoSettingsPanel,
          {
            isOpen: showFullSettings,
            onClose: () => setShowFullSettings(false),
            availableSubtitles: settingsSubtitleOptions,
            audioTracks: hlsAudioTracks,
            currentAudioTrack: currentHlsAudioTrack,
            onAudioTrackChange: handleHlsAudioChange
          }
        )
      ]
    }
  );
}
export {
  MobileVideoPlayer as M
};
