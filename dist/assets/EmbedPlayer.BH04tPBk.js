const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/vendor.CJyRs4QS.js","assets/react-vendor.CAo4XUiA.js"])))=>i.map(i=>d[i]);
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
import { bf as ue, b9 as __vitePreload } from "./vendor.CJyRs4QS.js";
import { r as reactExports, j as jsxRuntimeExports } from "./react-vendor.CAo4XUiA.js";
import { H as Hls } from "./hls.BlgtCWcq.js";
import { G as GlassPanel, j as cn, B as Button, d0 as normalizeKeyToken, d1 as resolveAction, d2 as getProxiedSubtitleUrl, d3 as sourceAdapterRegistry, d4 as playbackEventBus, d5 as PlayerEvents, d6 as setWatchingRpc, d7 as setPausedRpc, d8 as updateGlobalVideoTime, d9 as buildSubtitleCueStyle, cc as useVideoSettings, da as loadMobileConfig, db as readProxyQuerySnapshot, dc as registerGlobalVideo, D as useIsNativeApp, l as getProxiedImageUrl, dd as isDesktop, de as useKeybinds, df as ensureCustomSubtitleFontLoaded, c6 as isMobileNative, dg as VideoSettingsPanel, dh as probeUrlReachable } from "./index.C6yfkT5T.js";
import { isBrowserReadyVttUrl, getSubtitleSelectionKey, buildSubtitleFetchCandidates, normalizeSubtitleToVtt, sanitizeCueText } from "./subtitle-utils.B2k2Dirm.js";
import { a as CircleAlert, D as Download, U as Users, V as ChevronUp, N as ChevronDown, aa as Upload, t as HardDrive, cu as Pause, aJ as Play, b9 as RotateCcw, cv as SkipBack, cw as SkipForward, cx as VolumeX, b5 as Volume2, b2 as Captions, b7 as Type, cy as Mic, i as Settings, cz as Minimize, bn as Maximize, bZ as Camera, Q as LoaderCircle, c as Check, cA as RotateCw, O as MonitorPlay, cB as FastForward, b4 as Keyboard, R as RefreshCw, m as Eye, X, a6 as Lock, bo as SlidersHorizontal } from "./icons.C2gBBarQ.js";
import { u as useDownload } from "./useDownload.DEAa3Keh.js";
import { p as peekAutoDownloadNext, i as isWifiOnlyBlocked, c as consumeAutoDownloadNext } from "./autoDownloadNext.BiTHv2Cb.js";
async function fetchViaChain(input, init) {
  return fetch(input, init);
}
function useAniskip(initialSkipTimes = []) {
  const [skipTimes, setSkipTimes] = reactExports.useState(initialSkipTimes);
  const [isLoading, setIsLoading] = reactExports.useState(false);
  const [error, setError] = reactExports.useState(null);
  const fetchSkipTimes = reactExports.useCallback(async (malId, episodeNumber, episodeLength) => {
    if (!malId) {
      console.log("No MAL ID provided, skipping aniskip fetch");
      return [];
    }
    setIsLoading(true);
    setError(null);
    try {
      const v2Params = new URLSearchParams();
      v2Params.append("types[]", "op");
      v2Params.append("types[]", "ed");
      v2Params.append("types[]", "recap");
      const length = typeof episodeLength === "number" && !isNaN(episodeLength) && episodeLength > 0 ? Math.floor(episodeLength) : 1440;
      v2Params.set("episodeLength", String(length));
      const v2Url = `https://api.aniskip.com/v2/skip-times/${malId}/${episodeNumber}?${v2Params.toString()}`;
      console.log("Fetching skip times from v2:", v2Url);
      let response = await fetch(v2Url, {
        headers: { "Accept": "application/json" }
      });
      if (response.status === 404 || !response.ok) {
        console.log(`v2 failed with ${response.status}, trying v1 fallback...`);
        const v1Url = `https://api.aniskip.com/v1/skip-times/${malId}/${episodeNumber}?type=op&type=ed`;
        console.log("Fetching skip times from v1:", v1Url);
        response = await fetch(v1Url, {
          headers: { "Accept": "application/json" }
        });
        if (response.status === 404 || !response.ok) {
          console.log(`No skip times found (v1 returned ${response.status})`);
          setSkipTimes([]);
          return [];
        }
      }
      if (!response.ok) {
        throw new Error(`Aniskip API error: ${response.status}`);
      }
      const data = await response.json();
      if (data.found && data.results) {
        console.log("Found skip times:", data.results);
        setSkipTimes(data.results);
        return data.results;
      } else {
        console.log("No skip times found for this episode");
        setSkipTimes([]);
        return [];
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to fetch skip times";
      console.error("Aniskip fetch error:", message);
      setError(message);
      setSkipTimes([]);
      return [];
    } finally {
      setIsLoading(false);
    }
  }, []);
  const getActiveSkip = reactExports.useCallback((currentTime) => {
    for (const skip of skipTimes) {
      if (currentTime >= skip.interval.startTime && currentTime < skip.interval.endTime) {
        return skip;
      }
    }
    return null;
  }, [skipTimes]);
  const getSkipLabel = (skipType) => {
    switch (skipType) {
      case "op":
      case "mixed-op":
        return "Skip Intro";
      case "ed":
      case "mixed-ed":
        return "Skip Outro";
      case "recap":
        return "Skip Recap";
      default:
        return "Skip";
    }
  };
  return {
    skipTimes,
    isLoading,
    error,
    fetchSkipTimes,
    getActiveSkip,
    getSkipLabel
  };
}
function formatTime(seconds) {
  if (isNaN(seconds) || !isFinite(seconds)) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}
function formatRate(bytesPerSec) {
  const value = Number(bytesPerSec || 0);
  if (!Number.isFinite(value) || value <= 0) return "0 KB/s";
  const kb = value / 1024;
  if (kb < 1024) return `${kb.toFixed(kb >= 100 ? 0 : 1)} KB/s`;
  const mb = kb / 1024;
  return `${mb.toFixed(mb >= 100 ? 0 : 1)} MB/s`;
}
function formatBytes(bytes) {
  const value = Number(bytes || 0);
  if (!Number.isFinite(value) || value <= 0) return "0 MB";
  const mb = value / 1024 / 1024;
  if (mb < 1024) return `${mb.toFixed(mb >= 100 ? 0 : 1)} MB`;
  const gb = mb / 1024;
  return `${gb.toFixed(gb >= 100 ? 0 : 1)} GB`;
}
function TorrentStatusPanel({
  sessionId,
  stats,
  buffering,
  onRepair,
  onStop,
  onOpenFolder,
  className
}) {
  var _a;
  const [expanded, setExpanded] = reactExports.useState(false);
  const percent = Math.max(0, Math.min(100, Number((stats == null ? void 0 : stats.progress) ?? 0)));
  const availability = String((stats == null ? void 0 : stats.availability) || "ok");
  const peerCountLabel = (stats == null ? void 0 : stats.numPeers) == null ? "n/a" : stats.numPeers;
  const seedersText = (stats == null ? void 0 : stats.seeders) == null ? "n/a" : `${stats.seeders}s`;
  const leechersText = (stats == null ? void 0 : stats.leechers) == null ? "n/a" : `${stats.leechers}l`;
  const badge = reactExports.useMemo(() => {
    if (availability === "no_peers") return { label: "No peers", tone: "danger" };
    if (availability === "stalled") return { label: "Stalled", tone: "warn" };
    if (buffering) return { label: "Buffering", tone: "info" };
    if (availability === "searching") return { label: "Searching", tone: "muted" };
    return { label: "Streaming", tone: "ok" };
  }, [availability, buffering]);
  const storageBytes = Number.isFinite(stats == null ? void 0 : stats.storage) ? Number(stats.storage) : Number((_a = stats == null ? void 0 : stats.storage) == null ? void 0 : _a.totalBytes);
  const badgeClass = badge.tone === "danger" ? "bg-red-500/10 text-red-200 border-red-500/20" : badge.tone === "warn" ? "bg-orange-500/10 text-orange-200 border-orange-500/20" : badge.tone === "info" ? "bg-primary/10 text-primary border-primary/20" : badge.tone === "ok" ? "bg-emerald-500/10 text-emerald-200 border-emerald-500/20" : "bg-white/5 text-muted-foreground border-white/10";
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("absolute left-1/2 top-4 -translate-x-1/2 z-[30] w-[min(92%,600px)] transition-all duration-300", className), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassPanel, { className: "group relative overflow-hidden border-white/10 bg-black/20 backdrop-blur-xl shadow-xl p-3 md:p-3.5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("px-2 py-1 rounded-full border text-[10px] font-black uppercase tracking-widest", badgeClass), children: badge.label }),
          availability === "no_peers" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 text-[10px] text-red-200/80 truncate", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-3.5 h-3.5" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: (stats == null ? void 0 : stats.availabilityMessage) || "No visible swarm right now." })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 text-xs md:text-sm font-semibold truncate", children: (stats == null ? void 0 : stats.name) || "Torrent session" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden sm:flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-4 h-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold", children: formatRate(stats == null ? void 0 : stats.downloadSpeed) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-4 h-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold", children: peerCountLabel })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => setExpanded((v) => !v),
          className: "p-2 rounded-xl hover:bg-white/5 transition-colors",
          "aria-label": expanded ? "Collapse torrent stats" : "Expand torrent stats",
          children: expanded ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { className: "w-4 h-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "w-4 h-4" })
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 h-1.5 w-full bg-white/6 rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full bg-primary transition-all duration-500", style: { width: `${percent}%` } }) }),
    expanded ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 grid grid-cols-2 md:grid-cols-4 gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 px-2.5 py-2 rounded-xl bg-white/5 border border-white/10 text-xs", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-4 h-4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-muted-foreground", children: "Down" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold truncate", children: formatRate(stats == null ? void 0 : stats.downloadSpeed) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 px-2.5 py-2 rounded-xl bg-white/5 border border-white/10 text-xs", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "w-4 h-4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-muted-foreground", children: "Up" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold truncate", children: formatRate(stats == null ? void 0 : stats.uploadSpeed) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 px-2.5 py-2 rounded-xl bg-white/5 border border-white/10 text-xs", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-4 h-4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-muted-foreground", children: "Peers" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-semibold truncate", children: [
            seedersText,
            " / ",
            leechersText
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 px-2.5 py-2 rounded-xl bg-white/5 border border-white/10 text-xs", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(HardDrive, { className: "w-4 h-4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-muted-foreground", children: "Cache" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold truncate", children: formatBytes(storageBytes) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-2 md:col-span-4 flex items-center gap-2 pt-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "outline", onClick: onRepair, className: "rounded-full px-3", children: "Repair" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "destructive", onClick: onStop, className: "rounded-full px-3", children: "Stop" }),
        onOpenFolder ? /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "ghost", onClick: onOpenFolder, className: "rounded-full px-3 ml-auto", children: "Open folder" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "ml-auto text-[10px] text-muted-foreground truncate", children: (stats == null ? void 0 : stats.infoHash) ? `${String(stats.infoHash).slice(0, 12)}…` : sessionId })
      ] })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 flex items-center justify-between text-[11px] text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "truncate", children: [
        percent.toFixed(0),
        "%"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "truncate", children: (stats == null ? void 0 : stats.eta) != null ? stats.eta ? `${Math.round(stats.eta)}s ETA` : "Done" : "ETA…" })
    ] })
  ] }) });
}
function useVideoControls({
  videoRef,
  isPlaying,
  isMuted,
  volume,
  duration,
  currentTime,
  playbackRate,
  timelineSeekingLocked,
  showTimelineLockHint,
  setIsPlaying,
  setIsMuted,
  setVolume,
  setPlaybackRate,
  onPlay,
  onPause
}) {
  const togglePlay = reactExports.useCallback(() => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play().catch(() => {
      });
    }
  }, [videoRef, isPlaying]);
  const toggleMute = reactExports.useCallback(() => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  }, [videoRef, isMuted, setIsMuted]);
  const changeVolume = reactExports.useCallback(
    (delta) => {
      if (!videoRef.current) return;
      const newVolume = Math.max(0, Math.min(1, volume + delta));
      videoRef.current.volume = newVolume;
      setVolume(newVolume);
      if (newVolume > 0) setIsMuted(false);
    },
    [videoRef, volume, setVolume, setIsMuted]
  );
  const handleVolumeChange = reactExports.useCallback(
    (e) => {
      const newVolume = parseFloat(e.target.value);
      if (!videoRef.current) return;
      videoRef.current.volume = newVolume;
      setVolume(newVolume);
      setIsMuted(newVolume === 0);
    },
    [videoRef, setVolume, setIsMuted]
  );
  const skip = reactExports.useCallback(
    (seconds) => {
      if (timelineSeekingLocked) {
        showTimelineLockHint();
        return;
      }
      if (!videoRef.current) return;
      videoRef.current.currentTime = Math.max(
        0,
        Math.min(duration, currentTime + seconds)
      );
    },
    [videoRef, duration, currentTime, timelineSeekingLocked, showTimelineLockHint]
  );
  const handlePlaybackRateChange = reactExports.useCallback(
    (rate) => {
      if (!videoRef.current) return;
      videoRef.current.playbackRate = rate;
      setPlaybackRate(rate);
    },
    [videoRef, setPlaybackRate]
  );
  const handleRefresh = reactExports.useCallback(() => {
    if (!videoRef.current) return;
    const wasPlaying = !videoRef.current.paused;
    const currentTimeSnapshot = videoRef.current.currentTime;
    ue.info("Refreshing video stream...");
    videoRef.current.load();
    const onLoaded = () => {
      var _a;
      if (videoRef.current) {
        videoRef.current.currentTime = currentTimeSnapshot;
        if (wasPlaying) {
          void videoRef.current.play().catch(() => {
          });
        }
      }
      (_a = videoRef.current) == null ? void 0 : _a.removeEventListener("loadedmetadata", onLoaded);
    };
    videoRef.current.addEventListener("loadedmetadata", onLoaded);
  }, [videoRef]);
  return {
    togglePlay,
    toggleMute,
    changeVolume,
    handleVolumeChange,
    skip,
    handlePlaybackRateChange,
    handleRefresh
  };
}
function useVideoFullscreen({ containerRef, isMobile }) {
  const [isFullscreen, setIsFullscreen] = reactExports.useState(false);
  const lockLandscapeOnMobile = reactExports.useCallback(async () => {
    if (!isMobile) return;
    try {
      const orientationApi = screen.orientation;
      if (orientationApi == null ? void 0 : orientationApi.lock) {
        await orientationApi.lock("landscape");
      }
    } catch {
    }
  }, [isMobile]);
  const unlockOrientationOnMobile = reactExports.useCallback(() => {
    var _a;
    if (!isMobile) return;
    try {
      if ((_a = screen.orientation) == null ? void 0 : _a.unlock) {
        screen.orientation.unlock();
      }
    } catch {
    }
  }, [isMobile]);
  const toggleFullscreen = reactExports.useCallback(async () => {
    var _a;
    const container = containerRef.current;
    if (!container) return;
    const isElectron = typeof window !== "undefined" && !!((_a = window.electron) == null ? void 0 : _a.setFullscreen);
    if (!isFullscreen) {
      if (isElectron) {
        container.classList.add("is-player-fullscreen");
        setIsFullscreen(true);
        try {
          await window.electron.setFullscreen(true);
          document.documentElement.classList.add("app-fullscreen");
        } catch {
        }
      } else {
        try {
          if (container.requestFullscreen) {
            await container.requestFullscreen();
          } else if (container.webkitRequestFullscreen) {
            await Promise.resolve(container.webkitRequestFullscreen());
          } else {
            container.classList.add("is-player-fullscreen");
            setIsFullscreen(true);
          }
        } catch {
          container.classList.add("is-player-fullscreen");
          setIsFullscreen(true);
        }
      }
      await lockLandscapeOnMobile();
    } else {
      container.classList.remove("is-player-fullscreen");
      setIsFullscreen(false);
      if (isElectron) {
        document.documentElement.classList.remove("app-fullscreen");
        try {
          await window.electron.setFullscreen(false);
        } catch {
        }
      } else {
        try {
          if (document.fullscreenElement && document.exitFullscreen) {
            await document.exitFullscreen();
          } else if (document.webkitFullscreenElement && document.webkitExitFullscreen) {
            await Promise.resolve(document.webkitExitFullscreen());
          }
        } catch {
        }
      }
      unlockOrientationOnMobile();
    }
  }, [containerRef, isFullscreen, isMobile, lockLandscapeOnMobile, unlockOrientationOnMobile]);
  reactExports.useEffect(() => {
    var _a, _b;
    const handleFullscreenChange = () => {
      var _a2;
      const activeFullscreen = !!document.fullscreenElement || !!document.webkitFullscreenElement;
      setIsFullscreen(activeFullscreen);
      if (!activeFullscreen) {
        (_a2 = containerRef.current) == null ? void 0 : _a2.classList.remove("is-player-fullscreen");
        unlockOrientationOnMobile();
      }
    };
    const handleKeyEscape = (e) => {
      var _a2;
      if (e.key === "Escape" && ((_a2 = containerRef.current) == null ? void 0 : _a2.classList.contains("is-player-fullscreen"))) {
        containerRef.current.classList.remove("is-player-fullscreen");
        setIsFullscreen(false);
        document.documentElement.classList.remove("app-fullscreen");
        const bridge = window.electron;
        if (bridge == null ? void 0 : bridge.setFullscreen) {
          void bridge.setFullscreen(false);
        }
        unlockOrientationOnMobile();
      }
    };
    const handleElectronFullscreenChange = (isFull) => {
      var _a2;
      if (!isFull && ((_a2 = containerRef.current) == null ? void 0 : _a2.classList.contains("is-player-fullscreen"))) {
        containerRef.current.classList.remove("is-player-fullscreen");
        document.documentElement.classList.remove("app-fullscreen");
        setIsFullscreen(false);
        unlockOrientationOnMobile();
      }
    };
    const unsubFullscreen = (_b = (_a = window.electron) == null ? void 0 : _a.onFullscreenChanged) == null ? void 0 : _b.call(
      _a,
      handleElectronFullscreenChange
    );
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
    document.addEventListener("keydown", handleKeyEscape);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener("webkitfullscreenchange", handleFullscreenChange);
      document.removeEventListener("keydown", handleKeyEscape);
      unsubFullscreen == null ? void 0 : unsubFullscreen();
    };
  }, [containerRef, unlockOrientationOnMobile]);
  return { isFullscreen, toggleFullscreen };
}
function useVideoPiP({ videoRef, isMobile, isPlaying }) {
  const [isPiP, setIsPiP] = reactExports.useState(false);
  const autoPiPDismissedRef = reactExports.useRef(false);
  reactExports.useRef(false);
  const togglePiP = reactExports.useCallback(async () => {
    return;
  }, [videoRef]);
  reactExports.useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const onEnter = () => setIsPiP(true);
    const onLeave = () => {
      setIsPiP(false);
      if (document.visibilityState === "hidden") autoPiPDismissedRef.current = true;
    };
    video.addEventListener("enterpictureinpicture", onEnter);
    video.addEventListener("leavepictureinpicture", onLeave);
    return () => {
      video.removeEventListener("enterpictureinpicture", onEnter);
      video.removeEventListener("leavepictureinpicture", onLeave);
    };
  }, [videoRef]);
  reactExports.useEffect(() => {
    return;
  }, [videoRef, isMobile, isPlaying]);
  reactExports.useEffect(() => {
    if (isPlaying) autoPiPDismissedRef.current = false;
  }, [isPlaying]);
  return { isPiP, togglePiP };
}
function useVideoKeyboard({
  isMobile,
  timelineSeekingLocked,
  keybinds,
  togglePlay,
  toggleFullscreen,
  toggleMute,
  togglePiP,
  skip,
  changeVolume,
  onPrevEpisode,
  onNextEpisode
}) {
  reactExports.useEffect(() => {
    if (isMobile) return;
    const handleKeyDown = (e) => {
      var _a;
      const activeTag = (_a = document.activeElement) == null ? void 0 : _a.tagName;
      if (activeTag === "INPUT" || activeTag === "TEXTAREA") return;
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      const token = normalizeKeyToken(e);
      const action = resolveAction(keybinds, token);
      if (!action) {
        if (token === "arrowup") {
          e.preventDefault();
          changeVolume(0.1);
        } else if (token === "arrowdown") {
          e.preventDefault();
          changeVolume(-0.1);
        }
        return;
      }
      const guardSeek = () => {
        if (timelineSeekingLocked) {
          ue.info("Seeking is temporarily locked.", { id: "torrent-timeline-locked" });
          return false;
        }
        return true;
      };
      switch (action) {
        case "playPause":
          e.preventDefault();
          togglePlay();
          break;
        case "fullscreen":
          e.preventDefault();
          toggleFullscreen();
          break;
        case "mute":
          e.preventDefault();
          toggleMute();
          break;
        case "pip":
          e.preventDefault();
          togglePiP();
          break;
        case "seekBack":
          e.preventDefault();
          if (guardSeek()) skip(-10);
          break;
        case "seekForward":
          e.preventDefault();
          if (guardSeek()) skip(10);
          break;
        case "prevEpisode":
          e.preventDefault();
          onPrevEpisode == null ? void 0 : onPrevEpisode();
          break;
        case "nextEpisode":
          e.preventDefault();
          onNextEpisode == null ? void 0 : onNextEpisode();
          break;
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    isMobile,
    keybinds,
    togglePlay,
    toggleFullscreen,
    toggleMute,
    togglePiP,
    skip,
    changeVolume,
    timelineSeekingLocked,
    onPrevEpisode,
    onNextEpisode
  ]);
}
function useControlsVisibility({ isPlaying, isMobile }) {
  const showControlsRef = reactExports.useRef(true);
  const controlsTimeoutRef = reactExports.useRef(null);
  const getShowControls = reactExports.useCallback(() => showControlsRef.current, []);
  const setShowControls = reactExports.useCallback((value) => {
    showControlsRef.current = value;
  }, []);
  const showControlsTemporarily = reactExports.useCallback(() => {
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) {
        setShowControls(false);
      }
    }, 3e3);
  }, [isPlaying, setShowControls]);
  reactExports.useEffect(() => {
    if (isPlaying && !isMobile) {
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false);
      }, 3e3);
    } else if (!isPlaying) {
      setShowControls(true);
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    }
    return () => {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, [isPlaying, isMobile, setShowControls]);
  return {
    showControls: showControlsRef.current,
    getShowControls,
    setShowControls,
    showControlsTemporarily
  };
}
const LANGUAGE_DISPLAY_NAMES = {
  en: "English",
  ja: "Japanese",
  es: "Spanish",
  fr: "French",
  de: "German",
  pt: "Portuguese",
  ar: "Arabic",
  hi: "Hindi",
  it: "Italian",
  ru: "Russian",
  ko: "Korean",
  zh: "Chinese",
  und: "Unknown"
};
function normalizeTrackLanguage(lang) {
  const value = String(lang || "").trim().toLowerCase().replace("_", "-");
  if (!value) return "und";
  if (value === "en" || value.startsWith("eng") || value.includes("english")) return "en";
  if (value === "ja" || value.startsWith("jpn") || value.includes("japanese")) return "ja";
  if (value === "es" || value.startsWith("spa") || value.includes("spanish") || value.includes("espanol")) return "es";
  if (value === "fr" || value.startsWith("fra") || value.startsWith("fre") || value.includes("french")) return "fr";
  if (value === "de" || value.startsWith("deu") || value.startsWith("ger") || value.includes("german")) return "de";
  if (value === "pt" || value.startsWith("por") || value.includes("portuguese")) return "pt";
  if (value === "ar" || value.startsWith("ara") || value.includes("arabic")) return "ar";
  if (value === "hi" || value.startsWith("hin") || value.includes("hindi")) return "hi";
  if (value === "it" || value.startsWith("ita") || value.includes("italian")) return "it";
  if (value === "ru" || value.startsWith("rus") || value.includes("russian")) return "ru";
  if (value === "ko" || value.startsWith("kor") || value.includes("korean")) return "ko";
  if (value === "zh" || value.startsWith("zho") || value.startsWith("chi") || value.includes("chinese")) return "zh";
  if (value.length >= 2) return value.slice(0, 2);
  return "und";
}
function getLanguageDisplayName(lang) {
  const code = normalizeTrackLanguage(lang);
  return LANGUAGE_DISPLAY_NAMES[code] || code.toUpperCase();
}
function isGenericTrackTitle(title) {
  const normalized = String(title || "").trim().toLowerCase();
  return !normalized || normalized === "default" || normalized === "unknown" || normalized === "und" || normalized === "cr" || /^((audio|subtitle|video)\s+track\s+\d+)$/i.test(normalized);
}
function formatMediaTrackLabel(track) {
  const langName = getLanguageDisplayName(track.language);
  const rawTitle = String(track.title || "").trim();
  const normalizedTitle = rawTitle.toLowerCase();
  const normalizedLang = String(track.language || "").trim().toLowerCase();
  if (isGenericTrackTitle(rawTitle) || normalizedTitle === normalizedLang || normalizedTitle === langName.toLowerCase()) {
    return langName;
  }
  return `${langName} (${rawTitle})`;
}
function getSubtitleDisplayKey(track) {
  const langKey = normalizeTrackLanguage(track.lang || track.label || "");
  const label = String(track.label || getLanguageDisplayName(langKey)).trim().toLowerCase().replace(/\s+/g, " ");
  return `${langKey}|${label}`;
}
function dedupeInternalSubtitleTracks(tracks) {
  const seen = /* @__PURE__ */ new Set();
  const deduped = [];
  for (const track of tracks) {
    const key = getSubtitleDisplayKey(track);
    if (seen.has(key)) continue;
    seen.add(key);
    deduped.push(track);
  }
  return deduped;
}
function doesSubtitleTrackMatchPreference(track, preference) {
  const normalizedPreference = String(preference || "").trim().toLowerCase();
  const language = normalizeTrackLanguage(track.language);
  const label = String(track.label || "").toLowerCase();
  if (normalizedPreference === "english") return language === "en" || label.includes("english") || label.includes("eng");
  if (normalizedPreference === "spanish") return language === "es" || label.includes("spanish") || label.includes("espanol");
  if (normalizedPreference === "french") return language === "fr" || label.includes("french");
  if (normalizedPreference === "german") return language === "de" || label.includes("german");
  if (normalizedPreference === "japanese") return language === "ja" || label.includes("japanese");
  if (normalizedPreference === "portuguese") return language === "pt" || label.includes("portuguese");
  if (normalizedPreference === "arabic") return language === "ar" || label.includes("arabic");
  if (normalizedPreference === "hindi") return language === "hi" || label.includes("hindi");
  if (normalizedPreference.length === 2) return language === normalizedPreference;
  return label.includes(normalizedPreference);
}
function useSubtitleManager({
  videoRef,
  subtitles,
  customSubtitles,
  internalSubtitles,
  currentSubtitle,
  subtitleBlobs,
  isOffline,
  headers,
  sourceKey,
  settings,
  setCurrentSubtitle,
  setCustomSubtitles,
  setSubtitleBlobs
}) {
  const subtitleApplyStateRef = reactExports.useRef(null);
  const subtitleTrackSignatureRef = reactExports.useRef("");
  const extractedSubtitleCacheRef = reactExports.useRef({});
  const extractedSubtitlePromiseRef = reactExports.useRef(/* @__PURE__ */ new Map());
  const autoLoadedInternalSubtitleRef = reactExports.useRef("");
  const allRenderedSubtitles = reactExports.useMemo(
    () => [...subtitles, ...customSubtitles],
    [subtitles, customSubtitles]
  );
  const internalSubtitleDisplayKeys = reactExports.useMemo(
    () => new Set(internalSubtitles.map(getSubtitleDisplayKey)),
    [internalSubtitles]
  );
  const visibleSubtitleOptions = reactExports.useMemo(() => {
    const seen = new Set(internalSubtitleDisplayKeys);
    return allRenderedSubtitles.map((sub, index) => ({ sub, index })).filter(({ sub }) => {
      if (sub.internalTrackId != null) return false;
      const key = getSubtitleDisplayKey(sub);
      if (seen.has(key)) return false;
      seen.add(key);
      const url = String(sub.url || "").trim();
      if (!url) return false;
      if (isBrowserReadyVttUrl(url)) return true;
      if (subtitleBlobs[url]) return true;
      return false;
    });
  }, [allRenderedSubtitles, internalSubtitleDisplayKeys, subtitleBlobs]);
  const currentInternalSubtitleTrackId = reactExports.useMemo(() => {
    var _a;
    const index = allRenderedSubtitles.findIndex(
      (sub, subtitleIndex) => getSubtitleSelectionKey(sub, subtitleIndex) === currentSubtitle
    );
    const internalTrackId = index >= 0 ? (_a = allRenderedSubtitles[index]) == null ? void 0 : _a.internalTrackId : void 0;
    return typeof internalTrackId === "number" ? internalTrackId : null;
  }, [allRenderedSubtitles, currentSubtitle]);
  const subtitleReferer = (headers == null ? void 0 : headers.Referer) || "";
  const subtitleUserAgent = (headers == null ? void 0 : headers["User-Agent"]) || "";
  const handleSubtitleChange = reactExports.useCallback(
    (lang) => {
      const video = videoRef.current;
      if (!video) return;
      if (lang.startsWith("internal:")) return;
      const tracks = video.textTracks;
      const orderedSubtitles = allRenderedSubtitles;
      const selectedKey = lang.trim();
      const selectedKeyLower = selectedKey.toLowerCase();
      for (let i = 0; i < tracks.length; i++) {
        tracks[i].mode = "disabled";
      }
      if (lang === "off") {
        subtitleApplyStateRef.current = { lang, selectedIndex: -1, trackCount: tracks.length };
        setCurrentSubtitle("off");
        return;
      }
      let selectedIndex = -1;
      const trackElements = video.querySelectorAll("track");
      if (trackElements.length > 0) {
        for (let i = 0; i < trackElements.length; i++) {
          const trackElement = trackElements[i];
          const track = trackElement.track;
          if (!track) continue;
          const trackSrc = trackElement.getAttribute("src") || "";
          const subIndex = orderedSubtitles.findIndex((s, idx) => {
            const subUrl = String(s.url || "").trim();
            if (!subUrl) return false;
            const blobUrl = subtitleBlobs[subUrl];
            return trackSrc === subUrl || trackElement.src === subUrl || trackSrc === blobUrl || trackElement.src === blobUrl;
          });
          if (subIndex >= 0) {
            const sub = orderedSubtitles[subIndex];
            const subtitleSelectionKey = getSubtitleSelectionKey(sub, subIndex).toLowerCase();
            let isMatch = false;
            if (selectedKeyLower === "auto" || selectedKeyLower === "english") {
              isMatch = doesSubtitleTrackMatchPreference(track, "english");
            } else {
              isMatch = subtitleSelectionKey === selectedKeyLower;
            }
            if (isMatch) {
              track.mode = "hidden";
              selectedIndex = subIndex;
              break;
            }
          }
        }
      }
      if (selectedIndex < 0) {
        const englishIndex = (() => {
          for (let i = 0; i < tracks.length; i++) {
            const track = tracks[i];
            if (doesSubtitleTrackMatchPreference(track, "english")) return i;
          }
          return -1;
        })();
        if (lang === "auto") {
          selectedIndex = englishIndex >= 0 ? englishIndex : tracks.length > 0 ? 0 : -1;
        } else {
          for (let i = 0; i < tracks.length; i++) {
            const mappedSubtitle = orderedSubtitles[i];
            const mappedKey = mappedSubtitle ? getSubtitleSelectionKey(mappedSubtitle, i).toLowerCase() : "";
            if (mappedKey === selectedKeyLower) {
              selectedIndex = i;
              break;
            }
          }
          if (selectedIndex < 0) {
            for (let i = 0; i < tracks.length; i++) {
              const track = tracks[i];
              if (doesSubtitleTrackMatchPreference(track, selectedKeyLower)) {
                selectedIndex = i;
                break;
              }
            }
          }
        }
        if (selectedIndex >= 0 && selectedIndex < tracks.length) {
          tracks[selectedIndex].mode = "hidden";
        }
      }
      subtitleApplyStateRef.current = {
        lang,
        selectedIndex,
        trackCount: tracks.length
      };
      setCurrentSubtitle((prev) => prev === lang ? prev : lang);
    },
    [allRenderedSubtitles, subtitleBlobs, videoRef, setCurrentSubtitle]
  );
  const handleCustomSubtitleUpload = reactExports.useCallback(
    (e) => {
      var _a;
      const file = (_a = e.target.files) == null ? void 0 : _a[0];
      if (!file) return;
      const url = URL.createObjectURL(file);
      const newSub = {
        lang: "custom",
        url,
        label: file.name
      };
      setCustomSubtitles((prev) => {
        const next = [...prev, newSub];
        setCurrentSubtitle(getSubtitleSelectionKey(newSub, subtitles.length + next.length - 1));
        return next;
      });
      setSubtitleBlobs((prev) => ({ ...prev, [url]: url }));
      ue.success(`Loaded subtitle: ${file.name}`);
    },
    [subtitles.length, setCustomSubtitles, setCurrentSubtitle, setSubtitleBlobs]
  );
  reactExports.useEffect(() => {
    const allSubs = [...subtitles, ...customSubtitles];
    if (allSubs.length === 0) {
      setSubtitleBlobs({});
      return;
    }
    let mounted = true;
    const createdBlobUrls = [];
    setSubtitleBlobs((prev) => {
      const wanted = new Set(allSubs.map((s) => String(s.url || "").trim()).filter(Boolean));
      let changed = false;
      const next = {};
      for (const [key, value] of Object.entries(prev)) {
        if (wanted.has(key)) next[key] = value;
        else changed = true;
      }
      return changed ? next : prev;
    });
    (async () => {
      var _a, _b;
      for (const sub of allSubs) {
        if (!mounted) break;
        try {
          const subtitleSourceUrl = String(sub.url || "").trim();
          if (!subtitleSourceUrl) continue;
          if (isBrowserReadyVttUrl(subtitleSourceUrl)) {
            if (mounted) {
              setSubtitleBlobs(
                (prev) => prev[subtitleSourceUrl] === subtitleSourceUrl ? prev : { ...prev, [subtitleSourceUrl]: subtitleSourceUrl }
              );
            }
            continue;
          }
          if (subtitleSourceUrl.startsWith("file://")) {
            try {
              const fileResult = await ((_b = (_a = window.tatakaiRuntime) == null ? void 0 : _a.readLocalFile) == null ? void 0 : _b.call(
                _a,
                subtitleSourceUrl
              ));
              if ((fileResult == null ? void 0 : fileResult.success) && (fileResult == null ? void 0 : fileResult.url)) {
                if (mounted) {
                  setSubtitleBlobs((prev) => ({
                    ...prev,
                    [subtitleSourceUrl]: fileResult.url
                  }));
                }
                continue;
              }
            } catch (err) {
              console.warn("Failed to read local subtitle file:", subtitleSourceUrl, err);
            }
          }
          const fetchCandidates = buildSubtitleFetchCandidates(
            subtitleSourceUrl,
            subtitleReferer,
            Boolean(isOffline),
            (url, referer) => getProxiedSubtitleUrl(url, referer)
          );
          let normalizedText = "";
          for (const candidateUrl of fetchCandidates) {
            try {
              const response = await fetchViaChain(candidateUrl, {
                headers: { Accept: "text/vtt, text/plain, */*" },
                signal: AbortSignal.timeout(1e4)
              });
              if (!response.ok) continue;
              normalizedText = normalizeSubtitleToVtt(await response.text());
              if (normalizedText) break;
            } catch {
            }
          }
          if (normalizedText) {
            const blob = new Blob([normalizedText], { type: "text/vtt" });
            const blobUrl = URL.createObjectURL(blob);
            createdBlobUrls.push(blobUrl);
            if (mounted) {
              setSubtitleBlobs((prev) => ({ ...prev, [subtitleSourceUrl]: blobUrl }));
            }
          } else {
            console.warn("Failed to fetch subtitle:", sub.lang, subtitleSourceUrl);
          }
        } catch (e) {
          console.warn("Error prefetching subtitle", sub.lang, e);
        }
      }
    })();
    return () => {
      mounted = false;
      createdBlobUrls.forEach((blobUrl) => URL.revokeObjectURL(blobUrl));
    };
  }, [
    subtitles,
    customSubtitles,
    subtitleReferer,
    subtitleUserAgent,
    isOffline,
    setSubtitleBlobs
  ]);
  reactExports.useEffect(() => {
    const blobsLoaded = Object.keys(subtitleBlobs).length;
    if (blobsLoaded === 0) return;
    const timeout = setTimeout(() => {
      const video = videoRef.current;
      if (!video) return;
      const tracks = video.textTracks;
      const signature = Array.from({ length: tracks.length }, (_, index) => {
        var _a;
        const track = tracks[index];
        const state = track.readyState ?? 0;
        return `${track.language}|${track.label}|${track.kind}|${state}|${((_a = track.cues) == null ? void 0 : _a.length) ?? 0}`;
      }).join("||") + `||select:${currentSubtitle}`;
      if (!signature || signature === subtitleTrackSignatureRef.current) return;
      subtitleTrackSignatureRef.current = signature;
      handleSubtitleChange(currentSubtitle);
    }, 500);
    return () => clearTimeout(timeout);
  }, [subtitleBlobs, customSubtitles, currentSubtitle, subtitles, videoRef, handleSubtitleChange]);
  reactExports.useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const applyOnceTracksAvailable = () => {
      const tracks = video.textTracks;
      if (tracks && tracks.length > 0) {
        const signature = Array.from({ length: tracks.length }, (_, index) => {
          var _a;
          const track = tracks[index];
          return `${track.language}|${track.label}|${track.kind}|${track.readyState}|${((_a = track.cues) == null ? void 0 : _a.length) ?? 0}`;
        }).join("||") + `||select:${currentSubtitle}`;
        if (!signature || signature === subtitleTrackSignatureRef.current) return;
        subtitleTrackSignatureRef.current = signature;
        handleSubtitleChange(currentSubtitle);
      }
    };
    applyOnceTracksAvailable();
    let attempts = 0;
    const interval = setInterval(() => {
      attempts += 1;
      applyOnceTracksAvailable();
      if (attempts > 6) clearInterval(interval);
    }, 300);
    return () => clearInterval(interval);
  }, [currentSubtitle, subtitles, customSubtitles, videoRef, handleSubtitleChange]);
  reactExports.useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (!currentSubtitle || currentSubtitle === "off") return;
    if (currentSubtitle.startsWith("internal:")) return;
    const reapply = () => {
      window.setTimeout(() => {
        if (!videoRef.current) return;
        const tracks = videoRef.current.textTracks;
        const anyEnabled = Array.from({ length: tracks.length }).some(
          (_, i) => tracks[i].mode !== "disabled"
        );
        if (anyEnabled) return;
        subtitleTrackSignatureRef.current = "";
        handleSubtitleChange(currentSubtitle);
      }, 120);
    };
    video.addEventListener("loadeddata", reapply);
    video.addEventListener("canplay", reapply);
    video.addEventListener("play", reapply);
    video.addEventListener("seeked", reapply);
    return () => {
      video.removeEventListener("loadeddata", reapply);
      video.removeEventListener("canplay", reapply);
      video.removeEventListener("play", reapply);
      video.removeEventListener("seeked", reapply);
    };
  }, [currentSubtitle, videoRef, handleSubtitleChange]);
  return {
    handleSubtitleChange,
    handleCustomSubtitleUpload,
    visibleSubtitleOptions,
    currentInternalSubtitleTrackId,
    allRenderedSubtitles,
    extractedSubtitleCacheRef,
    extractedSubtitlePromiseRef,
    autoLoadedInternalSubtitleRef
  };
}
function convertFileSrc(filePath) {
  if (!filePath) return filePath;
  if (filePath.startsWith("http://") || filePath.startsWith("https://") || filePath.startsWith("tatakai-media://")) {
    return filePath;
  }
  const normalized = filePath.replace(/^file:\/\/+/i, "").replace(/\\/g, "/");
  return `tatakai-media:///${normalized}`;
}
function useAudioTrackManager({
  videoRef,
  audioTracks,
  currentAudioTrack,
  currentSource,
  currentSubtitle,
  extractedAudioUrls,
  isNative,
  setCurrentAudioTrack,
  setExtractedAudioUrls,
  setActiveExtractedAudioTrack,
  handleSubtitleChange
}) {
  const externalAudioRef = reactExports.useRef(null);
  const handleAudioTrackChange = reactExports.useCallback(
    (trackId) => {
      if (!videoRef.current || !isNative) return;
      const video = videoRef.current;
      void (async () => {
        var _a;
        const runtime = window.tatakaiRuntime;
        const sessionId = new URLSearchParams(window.location.search).get("sessionId");
        const isTorrentSource = Boolean(
          sessionId && ((currentSource == null ? void 0 : currentSource.sourceType) === "torrent" || ((_a = currentSource == null ? void 0 : currentSource.url) == null ? void 0 : _a.startsWith("magnet:")))
        );
        if (isTorrentSource && (runtime == null ? void 0 : runtime.getTorrentStreamUrl)) {
          try {
            const currentTimeSnapshot = Number.isFinite(video.currentTime) ? video.currentTime : 0;
            const wasPaused = video.paused;
            ue.loading("Switching audio track (reloading stream)...");
            const stream = await runtime.getTorrentStreamUrl(
              sessionId,
              window.currentFileIndex ?? void 0,
              { audioTrackIndex: trackId }
            );
            ue.dismiss();
            if (!(stream == null ? void 0 : stream.success) || !stream.url) {
              ue.error((stream == null ? void 0 : stream.error) || "Failed to request audio-switched stream");
              return;
            }
            setActiveExtractedAudioTrack(null);
            setCurrentAudioTrack(trackId);
            await sourceAdapterRegistry.switchTo({
              source: { id: stream.url, url: stream.url, mode: "hls" },
              videoElement: video,
              startTime: currentTimeSnapshot,
              autoPlay: !wasPaused
            });
            handleSubtitleChange(currentSubtitle);
            ue.success("Audio track switched");
            return;
          } catch (err) {
            ue.dismiss();
            ue.error((err == null ? void 0 : err.message) || "Error switching audio track");
            return;
          }
        }
        const nativeList = video.audioTracks;
        if (nativeList && nativeList.length > 1) {
          const pos = audioTracks.findIndex((t) => t.id === trackId);
          const targetPos = pos >= 0 ? pos : trackId;
          for (let i = 0; i < nativeList.length; i++) {
            nativeList[i].enabled = i === targetPos;
          }
          setActiveExtractedAudioTrack(null);
          setCurrentAudioTrack(trackId);
          ue.success("Audio track switched");
          return;
        }
        try {
          if (!(runtime == null ? void 0 : runtime.extractAudioTrack)) {
            ue.error("Audio extraction runtime unavailable");
            return;
          }
          const existing = extractedAudioUrls[trackId];
          if (existing) {
            setCurrentAudioTrack(trackId);
            setActiveExtractedAudioTrack(trackId);
            ue.success("Audio track switched");
            return;
          }
          ue.loading("Extracting audio track...");
          let probeUrl = (currentSource == null ? void 0 : currentSource.url) || "";
          if (video == null ? void 0 : video.src) probeUrl = video.src;
          try {
            if (sessionId && (runtime == null ? void 0 : runtime.getTorrentFilePath)) {
              const pathRes = await runtime.getTorrentFilePath(sessionId);
              if ((pathRes == null ? void 0 : pathRes.success) && (pathRes == null ? void 0 : pathRes.path)) probeUrl = pathRes.path;
            }
          } catch {
          }
          const result = await runtime.extractAudioTrack(probeUrl, trackId);
          ue.dismiss();
          if ((result == null ? void 0 : result.success) && (result == null ? void 0 : result.url)) {
            let extractedUrl = String(result.url || "").trim();
            if (!/^https?:\/\//i.test(extractedUrl) && !extractedUrl.startsWith("tatakai-media://")) {
              extractedUrl = convertFileSrc(extractedUrl);
            }
            setExtractedAudioUrls((prev) => ({ ...prev, [trackId]: extractedUrl }));
            setCurrentAudioTrack(trackId);
            setActiveExtractedAudioTrack(trackId);
            ue.success("Audio track loaded");
          } else {
            ue.error((result == null ? void 0 : result.error) || "Failed to extract audio track");
          }
        } catch (err) {
          ue.dismiss();
          ue.error((err == null ? void 0 : err.message) || "Error extracting audio track");
        }
      })();
    },
    [
      videoRef,
      isNative,
      currentSource == null ? void 0 : currentSource.url,
      currentSource == null ? void 0 : currentSource.sourceType,
      extractedAudioUrls,
      currentSubtitle,
      handleSubtitleChange,
      audioTracks,
      setCurrentAudioTrack,
      setExtractedAudioUrls,
      setActiveExtractedAudioTrack
    ]
  );
  return {
    handleAudioTrackChange,
    externalAudioRef
  };
}
function useMediaProbe({
  videoRef,
  currentSource,
  isNative,
  torrentStats,
  setAudioTracks,
  setInternalSubtitles
}) {
  const probeInProgressRef = reactExports.useRef(false);
  const deferredProbeTimerRef = reactExports.useRef(null);
  const torrentStartupGraceUntilRef = reactExports.useRef(0);
  const probeSucceededRef = reactExports.useRef(false);
  const torrentStatsRef = reactExports.useRef(torrentStats);
  torrentStatsRef.current = torrentStats;
  const triggerMediaProbe = reactExports.useCallback(async () => {
    var _a;
    const url = currentSource == null ? void 0 : currentSource.url;
    const currentTorrentStats = torrentStatsRef.current;
    if (!url || !isNative || !((_a = window.tatakaiRuntime) == null ? void 0 : _a.probeMedia) || probeInProgressRef.current)
      return;
    if (url.startsWith("file://") || url.startsWith("data:") || url.startsWith("blob:"))
      return;
    const isM3U8 = url.includes(".m3u8") || (currentSource == null ? void 0 : currentSource.isM3U8);
    const torrentRawUrl = currentTorrentStats == null ? void 0 : currentTorrentStats.rawUrl;
    const allowTorrentProbeThroughHls = Boolean(
      isM3U8 && (currentSource == null ? void 0 : currentSource.sourceType) === "torrent" && typeof torrentRawUrl === "string" && torrentRawUrl.startsWith("http")
    );
    if (isM3U8 && !allowTorrentProbeThroughHls) return;
    const isTorrentSource = url.startsWith("magnet:") || url.length === 40 || (currentSource == null ? void 0 : currentSource.sourceType) === "torrent";
    if (isTorrentSource && Date.now() < torrentStartupGraceUntilRef.current) {
      const delayMs = Math.max(
        1e3,
        torrentStartupGraceUntilRef.current - Date.now() + 250
      );
      if (deferredProbeTimerRef.current) {
        clearTimeout(deferredProbeTimerRef.current);
      }
      deferredProbeTimerRef.current = setTimeout(() => {
        deferredProbeTimerRef.current = null;
        void triggerMediaProbe();
      }, delayMs);
      return;
    }
    if (isTorrentSource) {
      const sessionId = new URLSearchParams(window.location.search).get("sessionId");
      if (!sessionId) return;
    }
    probeInProgressRef.current = true;
    let attempts = 0;
    const maxAttempts = isTorrentSource ? 2 : 3;
    const tryProbe = async () => {
      var _a2, _b, _c, _d;
      try {
        let probeUrl = allowTorrentProbeThroughHls ? String(torrentRawUrl) : url;
        let result;
        if (isTorrentSource) {
          const sessionId = new URLSearchParams(window.location.search).get("sessionId");
          const isTorrentComplete = Boolean((currentTorrentStats == null ? void 0 : currentTorrentStats.done) || (currentTorrentStats == null ? void 0 : currentTorrentStats.verified));
          if (isTorrentComplete) {
            if (sessionId && ((_a2 = window.tatakaiRuntime) == null ? void 0 : _a2.getTorrentFilePath)) {
              const pathRes = await window.tatakaiRuntime.getTorrentFilePath(sessionId);
              if ((pathRes == null ? void 0 : pathRes.success) && (pathRes == null ? void 0 : pathRes.path)) {
                probeUrl = pathRes.path;
              }
            }
          } else {
            const rawUrl = currentTorrentStats == null ? void 0 : currentTorrentStats.rawUrl;
            if (typeof rawUrl === "string" && rawUrl.startsWith("http")) {
              probeUrl = rawUrl;
            } else if ((_c = (_b = videoRef.current) == null ? void 0 : _b.src) == null ? void 0 : _c.startsWith("http")) {
              probeUrl = videoRef.current.src;
            }
          }
          const isHttpProbe = probeUrl.startsWith("http://") || probeUrl.startsWith("https://");
          if (!isHttpProbe && sessionId && ((_d = window.tatakaiRuntime) == null ? void 0 : _d.ensureTorrentPrebuffer)) {
            const fileIndex = window.currentFileIndex ?? void 0;
            const prebuffer = await window.tatakaiRuntime.ensureTorrentPrebuffer(sessionId, fileIndex, {
              requireMetadataTail: false
            });
            if (!(prebuffer == null ? void 0 : prebuffer.success)) {
              console.warn(
                `[VideoPlayer] Skipping media probe until torrent is ready: ${(prebuffer == null ? void 0 : prebuffer.error) || "prebuffer pending"}`
              );
              return false;
            }
          }
          console.log(`[VideoPlayer] Probing media: ${probeUrl} (attempt ${attempts + 1})`);
          result = await window.tatakaiRuntime.probeMedia(probeUrl);
        } else {
          result = await window.tatakaiRuntime.probeMedia(probeUrl);
        }
        if (result == null ? void 0 : result.success) {
          if (result.tracks && result.tracks.length > 0) {
            console.log(`[VideoPlayer] Found tracks:`, result.tracks);
            const audio = result.tracks.filter((t) => t.type === "audio").map((t) => ({
              id: t.index,
              label: formatMediaTrackLabel(t),
              lang: normalizeTrackLanguage(t.language),
              default: !!t.default
            }));
            const subs = result.tracks.filter((t) => t.type === "subtitle").map((t) => ({
              id: t.index,
              label: formatMediaTrackLabel(t),
              lang: normalizeTrackLanguage(t.language),
              default: !!t.default
            }));
            const dedupedSubs = dedupeInternalSubtitleTracks(subs);
            setAudioTracks(audio);
            setInternalSubtitles(dedupedSubs);
            probeSucceededRef.current = true;
            if (audio.length > 0 || dedupedSubs.length > 0) {
              console.log(
                `[VideoPlayer] Successfully detected ${audio.length} audio tracks and ${dedupedSubs.length} internal subtitles.`
              );
              ue.success(
                `Detected ${audio.length} audio tracks & ${dedupedSubs.length} subtitles`,
                { id: "probe-success", duration: 2e3 }
              );
            }
          } else {
            console.warn(`[VideoPlayer] Probe successful but no tracks found in: ${probeUrl}`);
          }
          return true;
        } else {
          console.warn(
            `[VideoPlayer] Probe attempt ${attempts + 1} failed for ${probeUrl}:`,
            result == null ? void 0 : result.error
          );
          return false;
        }
      } catch (err) {
        console.error(`[VideoPlayer] Probe error on attempt ${attempts + 1}:`, err);
        return false;
      }
    };
    while (attempts < maxAttempts) {
      const success = await tryProbe();
      if (success) break;
      attempts++;
      if (attempts < maxAttempts) {
        await new Promise((r) => setTimeout(r, isTorrentSource ? 4e3 : 1200));
      }
    }
    probeInProgressRef.current = false;
  }, [currentSource == null ? void 0 : currentSource.url, currentSource == null ? void 0 : currentSource.isM3U8, currentSource == null ? void 0 : currentSource.sourceType, isNative, videoRef, setAudioTracks, setInternalSubtitles]);
  reactExports.useEffect(() => {
    setAudioTracks([]);
    setInternalSubtitles([]);
    probeSucceededRef.current = false;
    if (deferredProbeTimerRef.current) {
      clearTimeout(deferredProbeTimerRef.current);
      deferredProbeTimerRef.current = null;
    }
    probeInProgressRef.current = false;
    triggerMediaProbe();
  }, [triggerMediaProbe, window.location.search]);
  reactExports.useEffect(() => {
    var _a, _b;
    if (probeSucceededRef.current) return;
    const isTorrentSource = (currentSource == null ? void 0 : currentSource.sourceType) === "torrent" || ((_a = currentSource == null ? void 0 : currentSource.url) == null ? void 0 : _a.startsWith("magnet:")) || ((_b = currentSource == null ? void 0 : currentSource.url) == null ? void 0 : _b.length) === 40;
    if (!isTorrentSource || !isNative) return;
    const rawUrl = torrentStats == null ? void 0 : torrentStats.rawUrl;
    const hasConnection = ((torrentStats == null ? void 0 : torrentStats.numPeers) ?? 0) > 0 || ((torrentStats == null ? void 0 : torrentStats.progress) ?? 0) > 0 || (torrentStats == null ? void 0 : torrentStats.done);
    if (typeof rawUrl === "string" && rawUrl.startsWith("http") && hasConnection) {
      console.log("[VideoPlayer] Retrying media probe due to torrent status update...");
      void triggerMediaProbe();
    }
  }, [
    currentSource == null ? void 0 : currentSource.url,
    torrentStats == null ? void 0 : torrentStats.done,
    torrentStats == null ? void 0 : torrentStats.progress,
    torrentStats == null ? void 0 : torrentStats.numPeers,
    torrentStats == null ? void 0 : torrentStats.rawUrl,
    isNative,
    triggerMediaProbe
  ]);
  reactExports.useEffect(() => {
    return () => {
      if (deferredProbeTimerRef.current) {
        clearTimeout(deferredProbeTimerRef.current);
        deferredProbeTimerRef.current = null;
      }
    };
  }, []);
  return {
    triggerMediaProbe,
    extractedSubtitleCacheRef: reactExports.useRef({}),
    extractedSubtitlePromiseRef: reactExports.useRef(/* @__PURE__ */ new Map()),
    autoLoadedInternalSubtitleRef: reactExports.useRef(""),
    torrentStartupGraceUntilRef,
    deferredProbeTimerRef
  };
}
function useVideoProgress({
  videoRef,
  isPlaying,
  isNative,
  currentSource,
  onProgressUpdate,
  animeName,
  episodeNumber,
  animeImageUrl,
  animeUrl
}) {
  const progressIntervalRef = reactExports.useRef(null);
  const progressCallbackRef = reactExports.useRef(onProgressUpdate);
  const lastProgressAtRef = reactExports.useRef(Date.now());
  const lastObservedTimeRef = reactExports.useRef(0);
  const lastRpcUpdateRef = reactExports.useRef(0);
  const torrentPlaybackUpdateRef = reactExports.useRef(0);
  reactExports.useEffect(() => {
    progressCallbackRef.current = onProgressUpdate ?? null;
  }, [onProgressUpdate]);
  reactExports.useEffect(() => {
    if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    progressIntervalRef.current = window.setInterval(() => {
      var _a, _b;
      if (videoRef.current && isPlaying) {
        const time = videoRef.current.currentTime;
        if (progressCallbackRef.current) {
          progressCallbackRef.current(time, videoRef.current.duration || 0);
        }
        const sessionId = new URLSearchParams(window.location.search).get("sessionId");
        const isTorrentSource = Boolean(
          sessionId && ((currentSource == null ? void 0 : currentSource.sourceType) === "torrent" || ((_a = currentSource == null ? void 0 : currentSource.url) == null ? void 0 : _a.startsWith("magnet:")))
        );
        if (isNative && isTorrentSource && ((_b = window.tatakaiRuntime) == null ? void 0 : _b.updateTorrentPlayback)) {
          const now = Date.now();
          if (now - torrentPlaybackUpdateRef.current >= 1500) {
            torrentPlaybackUpdateRef.current = now;
            window.tatakaiRuntime.updateTorrentPlayback(
              sessionId,
              time,
              videoRef.current.duration || 0
            );
          }
        }
      }
    }, 1e3);
    return () => {
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    };
  }, [isPlaying, isNative, currentSource == null ? void 0 : currentSource.url, currentSource == null ? void 0 : currentSource.sourceType, videoRef]);
  reactExports.useEffect(() => {
    const bus = playbackEventBus;
    const unsubs = [
      bus.on(PlayerEvents.TIME_UPDATE, (t) => {
        lastObservedTimeRef.current = t;
        updateGlobalVideoTime(t);
      }),
      bus.on(PlayerEvents.BUFFERING, (b) => {
        if (!b) lastProgressAtRef.current = Date.now();
      })
    ];
    return () => unsubs.forEach((unsub) => unsub());
  }, []);
  reactExports.useEffect(() => {
    if (!isNative || !animeName) return;
    const now = Date.now();
    if (now - lastRpcUpdateRef.current < 5e3) return;
    lastRpcUpdateRef.current = now;
    const video = videoRef.current;
    const currentTime = lastObservedTimeRef.current ?? 0;
    const duration = (video == null ? void 0 : video.duration) ?? 0;
    if (isPlaying) {
      setWatchingRpc({
        animeTitle: animeName,
        episode: episodeNumber ?? 0,
        currentTime,
        duration,
        animeImageUrl,
        animeUrl
      });
    } else {
      setPausedRpc({
        animeTitle: animeName,
        episode: episodeNumber ?? 0,
        animeImageUrl,
        animeUrl
      });
    }
  }, [isNative, isPlaying, animeName, episodeNumber, animeImageUrl, animeUrl]);
  reactExports.useEffect(() => {
    const handleBeforeUnload = () => {
      var _a, _b;
      const time = Math.floor(((_a = videoRef.current) == null ? void 0 : _a.currentTime) || 0);
      const dur = Math.floor(((_b = videoRef.current) == null ? void 0 : _b.duration) || 0) || void 0;
      if (progressCallbackRef.current) progressCallbackRef.current(time, dur, false, true);
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      var _a, _b;
      window.removeEventListener("beforeunload", handleBeforeUnload);
      if (progressIntervalRef.current !== null) {
        clearInterval(progressIntervalRef.current);
        progressIntervalRef.current = null;
      }
      const time = Math.floor(((_a = videoRef.current) == null ? void 0 : _a.currentTime) || 0);
      const dur = Math.floor(((_b = videoRef.current) == null ? void 0 : _b.duration) || 0) || void 0;
      if (progressCallbackRef.current) progressCallbackRef.current(time, dur, false, true);
    };
  }, [videoRef]);
  return {
    lastProgressAtRef,
    lastObservedTimeRef
  };
}
function useActiveCues(videoRef, refreshKey, offset = 0) {
  const [lines, setLines] = reactExports.useState([]);
  reactExports.useEffect(() => {
    var _a, _b, _c;
    const video = videoRef.current;
    if (!video) return;
    let activeTrack = null;
    const cleanups = [];
    const readCues = () => {
      const track = activeTrack;
      if (!track) {
        setLines((prev) => prev.length ? [] : prev);
        return;
      }
      const next = [];
      if (offset === 0) {
        const active = track.activeCues;
        if (active) {
          for (let i = 0; i < active.length; i++) {
            const text = sanitizeCueText(active[i].text);
            if (text) next.push(text);
          }
        }
      } else {
        const cues = track.cues;
        const vid = videoRef.current;
        if (cues && vid) {
          const t = vid.currentTime + offset;
          for (let i = 0; i < cues.length; i++) {
            const cue = cues[i];
            if (cue.startTime <= t && cue.endTime > t) {
              const text = sanitizeCueText(cue.text);
              if (text) next.push(text);
            }
          }
        }
      }
      setLines(
        (prev) => prev.length === next.length && prev.every((line, idx) => line === next[idx]) ? prev : next
      );
    };
    const pickActiveTrack = () => {
      const tracks2 = video.textTracks;
      for (let i = 0; i < tracks2.length; i++) {
        if (tracks2[i].mode === "showing") return tracks2[i];
      }
      for (let i = 0; i < tracks2.length; i++) {
        if (tracks2[i].mode === "hidden") return tracks2[i];
      }
      return null;
    };
    const bind = () => {
      cleanups.forEach((fn) => fn());
      cleanups.length = 0;
      activeTrack = pickActiveTrack();
      if (activeTrack) {
        const handler = () => readCues();
        activeTrack.addEventListener("cuechange", handler);
        cleanups.push(() => activeTrack == null ? void 0 : activeTrack.removeEventListener("cuechange", handler));
      }
      readCues();
    };
    bind();
    const tracks = video.textTracks;
    const onChange = () => bind();
    (_a = tracks.addEventListener) == null ? void 0 : _a.call(tracks, "change", onChange);
    (_b = tracks.addEventListener) == null ? void 0 : _b.call(tracks, "addtrack", onChange);
    (_c = tracks.addEventListener) == null ? void 0 : _c.call(tracks, "removetrack", onChange);
    const onTimeUpdate = () => readCues();
    video.addEventListener("timeupdate", onTimeUpdate);
    const poll = window.setInterval(readCues, 400);
    return () => {
      var _a2, _b2, _c2;
      cleanups.forEach((fn) => fn());
      (_a2 = tracks.removeEventListener) == null ? void 0 : _a2.call(tracks, "change", onChange);
      (_b2 = tracks.removeEventListener) == null ? void 0 : _b2.call(tracks, "addtrack", onChange);
      (_c2 = tracks.removeEventListener) == null ? void 0 : _c2.call(tracks, "removetrack", onChange);
      video.removeEventListener("timeupdate", onTimeUpdate);
      window.clearInterval(poll);
    };
  }, [videoRef, refreshKey, offset]);
  return lines;
}
function useStableVolume(videoRef, enabled) {
  const ctxRef = reactExports.useRef(null);
  const sourceRef = reactExports.useRef(null);
  const compressorRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (!enabled) {
      try {
        if (sourceRef.current && ctxRef.current) {
          sourceRef.current.disconnect();
          sourceRef.current.connect(ctxRef.current.destination);
        }
      } catch {
      }
      return;
    }
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      if (!ctxRef.current) ctxRef.current = new AudioCtx();
      const ctx = ctxRef.current;
      if (!sourceRef.current) {
        sourceRef.current = ctx.createMediaElementSource(video);
      }
      if (!compressorRef.current) {
        const comp2 = ctx.createDynamicsCompressor();
        comp2.threshold.value = -28;
        comp2.knee.value = 30;
        comp2.ratio.value = 12;
        comp2.attack.value = 3e-3;
        comp2.release.value = 0.25;
        compressorRef.current = comp2;
      }
      const source = sourceRef.current;
      const comp = compressorRef.current;
      source.disconnect();
      source.connect(comp);
      comp.connect(ctx.destination);
      if (ctx.state === "suspended") void ctx.resume();
    } catch (err) {
      console.warn("[usePlayerEnhancements] stable volume unavailable:", err);
    }
  }, [enabled, videoRef]);
  reactExports.useEffect(() => {
    return () => {
      var _a, _b, _c;
      try {
        (_a = compressorRef.current) == null ? void 0 : _a.disconnect();
        (_b = sourceRef.current) == null ? void 0 : _b.disconnect();
        void ((_c = ctxRef.current) == null ? void 0 : _c.close());
      } catch {
      }
      ctxRef.current = null;
      sourceRef.current = null;
      compressorRef.current = null;
    };
  }, []);
}
const SLEEP_TIMER_MINUTES = {
  "15": 15,
  "30": 30,
  "45": 45,
  "60": 60
};
function useSleepTimer(videoRef, option) {
  const [remainingSeconds, setRemainingSeconds] = reactExports.useState(null);
  reactExports.useEffect(() => {
    if (option === "off" || option === "end-of-episode") {
      setRemainingSeconds(null);
      return;
    }
    const minutes = SLEEP_TIMER_MINUTES[option];
    if (!minutes) {
      setRemainingSeconds(null);
      return;
    }
    let remaining = minutes * 60;
    setRemainingSeconds(remaining);
    const interval = window.setInterval(() => {
      var _a;
      remaining -= 1;
      setRemainingSeconds(remaining);
      if (remaining <= 0) {
        window.clearInterval(interval);
        try {
          (_a = videoRef.current) == null ? void 0 : _a.pause();
        } catch {
        }
        setRemainingSeconds(null);
      }
    }, 1e3);
    return () => window.clearInterval(interval);
  }, [option, videoRef]);
  return remainingSeconds;
}
function useAmbientMode(videoRef, canvasRef, enabled, isPlaying) {
  reactExports.useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!enabled || !video || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    canvas.width = 32;
    canvas.height = 18;
    let raf = 0;
    let last = 0;
    const draw = (ts) => {
      raf = requestAnimationFrame(draw);
      if (ts - last < 240) return;
      last = ts;
      if (video.readyState < 2 || video.videoWidth === 0) return;
      try {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      } catch {
      }
    };
    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, [enabled, isPlaying, videoRef, canvasRef]);
}
function SubtitleOverlay({ lines, settings, controlsVisible }) {
  const cueStyle = reactExports.useMemo(() => buildSubtitleCueStyle(settings), [settings]);
  if (!lines.length) return null;
  const bottomPx = 40 + settings.subtitlePosition * 6 + (controlsVisible ? 56 : 0);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "pointer-events-none absolute inset-x-0 z-30 flex flex-col items-center gap-1 px-4 text-center transition-[bottom] duration-200",
      style: { bottom: `${bottomPx}px` },
      "aria-live": "polite",
      children: lines.map((line, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: cueStyle, children: line }, `${idx}-${line}`))
    }
  );
}
const DIRECTIVE_PREFIX = "//!";
function makeSizeExpr(raw) {
  const trimmed = raw.trim();
  const tokens = trimmed.length === 0 ? [] : trimmed.split(/\s+/);
  return { raw: trimmed, tokens };
}
function parseMpvShader(source) {
  const lines = source.split(/\r?\n/);
  const passes = [];
  let desc = "";
  let hook = "MAIN";
  let binds = [];
  let save = null;
  let widthRaw = "";
  let heightRaw = "";
  let components = 4;
  let when = null;
  let bodyLines = [];
  let inPass = false;
  let inBody = false;
  const flush = () => {
    if (!inPass) return;
    passes.push({
      desc,
      hook,
      binds,
      save,
      width: makeSizeExpr(widthRaw || "MAIN.w"),
      height: makeSizeExpr(heightRaw || "MAIN.h"),
      components,
      when,
      body: bodyLines.join("\n")
    });
  };
  const reset = () => {
    desc = "";
    hook = "MAIN";
    binds = [];
    save = null;
    widthRaw = "";
    heightRaw = "";
    components = 4;
    when = null;
    bodyLines = [];
  };
  for (const line of lines) {
    const isDirective = line.startsWith(DIRECTIVE_PREFIX);
    if (isDirective) {
      if (inBody) {
        flush();
        reset();
        inBody = false;
      }
      inPass = true;
      const rest = line.slice(DIRECTIVE_PREFIX.length).trim();
      const spaceIdx = rest.search(/\s/);
      const keyword = (spaceIdx === -1 ? rest : rest.slice(0, spaceIdx)).toUpperCase();
      const value = spaceIdx === -1 ? "" : rest.slice(spaceIdx + 1).trim();
      switch (keyword) {
        case "DESC":
          desc = value;
          break;
        case "HOOK":
          hook = value || "MAIN";
          break;
        case "BIND":
          if (value) binds.push(value);
          break;
        case "SAVE":
          save = value || null;
          break;
        case "WIDTH":
          widthRaw = value;
          break;
        case "HEIGHT":
          heightRaw = value;
          break;
        case "COMPONENTS": {
          const n = parseInt(value, 10);
          components = Number.isFinite(n) && n > 0 ? n : 4;
          break;
        }
        case "WHEN":
          when = value;
          break;
      }
      continue;
    }
    if (!inPass) {
      continue;
    }
    if (!inBody) {
      if (line.trim() === "") continue;
      inBody = true;
    }
    bodyLines.push(line);
  }
  flush();
  return passes;
}
function evalSizeExpr(expr, sizes) {
  let tokens = expr.tokens.slice();
  if (tokens.length === 0) return 1;
  if (tokens.length === 3 && isOperator(tokens[1]) && !isOperator(tokens[0]) && !isOperator(tokens[2])) {
    tokens = [tokens[0], tokens[2], tokens[1]];
  }
  const stack = [];
  for (const tok of tokens) {
    if (isOperator(tok)) {
      const b = stack.pop();
      const a = stack.pop();
      if (a === void 0 || b === void 0) {
        throw new Error(`Malformed size expression "${expr.raw}": operator "${tok}" without two operands`);
      }
      stack.push(applyOp(a, b, tok));
      continue;
    }
    stack.push(resolveTerm(tok, sizes, expr.raw));
  }
  if (stack.length !== 1) {
    throw new Error(`Malformed size expression "${expr.raw}": leftover stack ${JSON.stringify(stack)}`);
  }
  return Math.max(1, Math.round(stack[0]));
}
function isOperator(tok) {
  return tok === "+" || tok === "-" || tok === "*" || tok === "/";
}
function applyOp(a, b, op) {
  switch (op) {
    case "+":
      return a + b;
    case "-":
      return a - b;
    case "*":
      return a * b;
    case "/":
      return a / b;
    default:
      throw new Error(`Unknown operator "${op}"`);
  }
}
function resolveTerm(tok, sizes, raw) {
  const dot = tok.indexOf(".");
  if (dot !== -1) {
    const name = tok.slice(0, dot);
    const field = tok.slice(dot + 1).toLowerCase();
    const size = sizes[name];
    if (!size) {
      throw new Error(`Size expression "${raw}" references unknown texture "${name}"`);
    }
    if (field === "w") return size.w;
    if (field === "h") return size.h;
    throw new Error(`Size expression "${raw}" references unknown field ".${field}"`);
  }
  const num = Number(tok);
  if (Number.isFinite(num)) return num;
  throw new Error(`Size expression "${raw}" has unresolved term "${tok}"`);
}
const restoreCnnS = '// MIT License\n\n// Copyright (c) 2019-2021 bloc97\n// All rights reserved.\n\n// Permission is hereby granted, free of charge, to any person obtaining a copy\n// of this software and associated documentation files (the "Software"), to deal\n// in the Software without restriction, including without limitation the rights\n// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell\n// copies of the Software, and to permit persons to whom the Software is\n// furnished to do so, subject to the following conditions:\n\n// The above copyright notice and this permission notice shall be included in all\n// copies or substantial portions of the Software.\n\n// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\n// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\n// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\n// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\n// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\n// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\n// SOFTWARE.\n\n//!DESC Anime4K-v4.0-Restore-CNN-(S)-Conv-4x3x3x3\n//!HOOK MAIN\n//!BIND MAIN\n//!SAVE conv2d_tf\n//!WIDTH MAIN.w\n//!HEIGHT MAIN.h\n//!COMPONENTS 4\n#define go_0(x_off, y_off) (MAIN_texOff(vec2(x_off, y_off)))\nvec4 hook() {\n    vec4 result = mat4(-0.19288683, -0.21397883, 0.111997396, -0.04791413, -0.26682988, -0.06144587, -0.03601853, -0.16693151, 0.038494494, -0.16651472, 0.147657, -0.083003886, 0.0, 0.0, 0.0, 0.0) * go_0(-1.0, -1.0);\n    result += mat4(-0.14286195, 0.08746566, -0.40107322, 0.12390977, -0.33392772, -0.18703035, -0.21326795, 0.04780781, -0.15155545, -0.0010025925, -0.1554875, -0.10676251, 0.0, 0.0, 0.0, 0.0) * go_0(-1.0, 0.0);\n    result += mat4(0.28095165, 0.022872915, -0.21342312, -0.29982176, 0.025937587, -0.055012174, -0.33779636, 0.0015666655, 0.076416336, 0.06656033, -0.1557806, 0.1078894, 0.0, 0.0, 0.0, 0.0) * go_0(-1.0, 1.0);\n    result += mat4(-0.31584853, 0.07527119, 0.30713862, -0.34014285, -0.50103146, -0.07217874, 0.512807, -0.09597398, -0.32097813, -0.051580857, -0.022466356, 0.01148551, 0.0, 0.0, 0.0, 0.0) * go_0(0.0, -1.0);\n    result += mat4(-0.026032459, -0.04193211, 0.37703893, -0.031916667, -0.27421117, 1.0906446, -0.049654085, -0.19814016, 0.07819544, 0.06003738, 0.1405805, -0.0064135445, 0.0, 0.0, 0.0, 0.0) * go_0(0.0, 0.0);\n    result += mat4(0.041450135, 0.11319654, -0.23237701, 0.08443178, 0.53344345, 0.30857387, -0.057264958, -0.1575803, 0.2325609, -0.027797326, -0.04544767, -0.18720597, 0.0, 0.0, 0.0, 0.0) * go_0(0.0, 1.0);\n    result += mat4(0.2531829, -0.074966915, -0.27800754, -0.3146097, 0.20126024, -0.5380133, -0.15082566, -0.19021043, 0.29951036, 0.17123336, -0.01681872, -0.12574998, 0.0, 0.0, 0.0, 0.0) * go_0(1.0, -1.0);\n    result += mat4(0.25203633, 0.19882993, 0.14906439, 0.13593598, 0.40712556, 0.084902965, 0.42969635, 0.2961132, -0.057267334, -0.030388135, 8.8084314e-05, 0.0210724, 0.0, 0.0, 0.0, 0.0) * go_0(1.0, 0.0);\n    result += mat4(-0.13459359, -0.12199573, 0.12591946, 0.24736497, 0.2033463, -0.09388599, -0.094370656, 0.1071285, -0.18479438, -0.066625565, 0.08279283, 0.20130983, 0.0, 0.0, 0.0, 0.0) * go_0(1.0, 1.0);\n    result += vec4(-0.011108127, -0.07481861, 0.07640154, 0.4964964);\n    return result;\n}\n//!DESC Anime4K-v4.0-Restore-CNN-(S)-Conv-4x3x3x8\n//!HOOK MAIN\n//!BIND conv2d_tf\n//!SAVE conv2d_1_tf\n//!WIDTH conv2d_tf.w\n//!HEIGHT conv2d_tf.h\n//!COMPONENTS 4\n#define go_0(x_off, y_off) (max((conv2d_tf_texOff(vec2(x_off, y_off))), 0.0))\n#define go_1(x_off, y_off) (max(-(conv2d_tf_texOff(vec2(x_off, y_off))), 0.0))\nvec4 hook() {\n    vec4 result = mat4(-0.056432575, 0.0028165397, -0.026325442, -0.14802271, 0.16885762, -0.062179096, -0.2332292, 0.17513658, -0.08011296, 0.02947316, 0.014771492, -0.17946689, 0.026012989, -0.09823925, 0.036625937, -0.06924322) * go_0(-1.0, -1.0);\n    result += mat4(-0.13571467, 0.09831142, 0.12911566, 0.06305893, -0.07188695, -0.20161287, 0.3858435, -0.21069056, -0.12294444, -0.1404628, -0.022659872, 0.23008968, 0.10969853, 0.17640765, 0.39796907, 0.20413099) * go_0(-1.0, 0.0);\n    result += mat4(-0.0061665224, 0.055102807, -0.0059629944, -0.021429887, 0.061626043, 0.16898955, -0.21215646, 0.16510476, 0.2238265, 0.19429931, 0.09874656, 0.06828208, -0.122404456, -0.00026717107, -0.28203064, -0.29979932) * go_0(-1.0, 1.0);\n    result += mat4(-0.22735378, 0.14538136, 0.11549746, 0.194148, -0.09841722, -0.0661309, 0.348576, -0.017375294, -0.044078812, 0.1298332, 0.04793373, -0.30687734, 0.08353025, 0.083519086, 0.10766399, 0.31796935) * go_0(0.0, -1.0);\n    result += mat4(0.048365135, -0.17566709, -0.33212858, -0.052667376, -0.26443407, -0.010216014, 0.1573303, 0.05725314, 0.08140953, -0.09664591, 0.076109104, -0.026773714, 0.07732627, 0.10188082, -0.28266954, -0.16230233) * go_0(0.0, 0.0);\n    result += mat4(0.29931107, 0.117944, -0.10414009, 0.12795551, 0.12576093, 0.17082554, -0.15803693, 0.13430743, -0.025801308, -0.10797019, 0.0721032, 0.2825884, -0.11025257, 0.12798019, 0.081827976, -0.050441865) * go_0(0.0, 1.0);\n    result += mat4(-0.11827391, 0.08306765, -0.3430314, 0.07898041, -0.023839617, -0.019507334, 0.23176382, -0.40992323, 0.09411734, 0.38415068, -0.25845516, -0.29984522, 0.1470966, -0.0684779, -0.07071314, -0.026773235) * go_0(1.0, -1.0);\n    result += mat4(0.19091596, 0.082110435, -0.5266589, -0.1744098, -0.015838385, -0.046316292, 0.023171103, -0.03731331, 0.2642396, 0.31824252, -0.041754793, -0.09525519, -0.14696182, 0.052168854, 0.039857205, -0.027555354) * go_0(1.0, 0.0);\n    result += mat4(0.15207373, 0.09845733, 0.0142631065, 0.096375965, 0.06089903, 0.17902578, -0.42391995, 0.22475442, 0.016356342, -0.06277531, -0.12173141, -0.18635495, -0.0013459618, 0.15725887, 0.019310836, 0.20293565) * go_0(1.0, 1.0);\n    result += mat4(-0.18395247, 0.30672902, 0.09034339, 0.1821889, -0.0419004, -0.2169228, -0.14052129, 0.11006559, 0.1709272, 0.51062274, 0.13758625, -0.2242552, -0.030382963, 0.3357568, -0.26491287, 0.02501938) * go_1(-1.0, -1.0);\n    result += mat4(0.040511727, 0.12523083, -0.27318433, 0.08388512, 0.25354835, 0.3404216, -0.2632471, -0.17784123, 0.2732347, 0.4468553, 0.084667034, -0.1856242, 0.034099877, -0.00954992, -0.32751867, -0.062207516) * go_1(-1.0, 0.0);\n    result += mat4(0.17564747, 0.11645554, -0.16362113, 0.105654195, -0.2762563, -0.1413764, 0.23264363, -0.14000498, 0.095402054, 0.0715738, -0.19346157, -0.028285999, 0.009799127, 0.04059529, 0.19688335, 0.1282381) * go_1(-1.0, 1.0);\n    result += mat4(0.23575781, -0.11446148, -0.20504695, 0.035568226, 0.36890212, -0.85968876, -0.18545328, 0.33796397, -0.30916876, -0.10445518, -0.3046253, 0.33271998, -0.06263589, -0.2160114, -0.16383372, -0.31173357) * go_1(0.0, -1.0);\n    result += mat4(0.20469664, 0.4039374, -0.070057206, 0.030353077, 0.39843914, -0.15490077, -0.24476516, 0.38238233, -0.21809858, 0.23496576, -0.051794037, 0.033664484, -0.14411364, -0.2515329, 0.124655396, -0.05818785) * go_1(0.0, 0.0);\n    result += mat4(-0.09065731, -0.16787091, 0.013269188, 0.23687351, -0.41504318, -0.048163068, 0.31760025, -0.33648986, 0.29752317, 0.2926866, 0.14408836, -0.33382463, -0.15873958, -0.121961035, 0.11797893, 0.09000567) * go_1(0.0, 1.0);\n    result += mat4(0.13356976, 0.013763947, 0.012169505, -0.109594524, 0.03417223, 0.7031121, 0.65146804, 0.5250268, -0.50132495, -0.419648, 0.2940041, 0.83051753, -0.17595838, 0.1633008, -0.018587278, 0.079596795) * go_1(1.0, -1.0);\n    result += mat4(0.07570128, -0.1581438, 0.03904949, 0.14890033, -0.054611947, 0.17469402, -0.44252598, 0.036181703, -0.4981031, -0.37507218, -0.18466389, 0.2645845, 0.25189674, -0.025896115, 0.034307647, -0.020462232) * go_1(1.0, 0.0);\n    result += mat4(-0.11645865, 0.02296537, 0.040909223, 0.015069485, 0.062284566, -0.22526766, 0.09241534, -0.32623053, 0.18208642, 0.3954284, 0.2884468, -0.25137675, -0.037232924, -0.10185309, -0.17956531, 0.018966453) * go_1(1.0, 1.0);\n    result += vec4(-0.16371979, -0.024620198, -0.035754893, 0.04176776);\n    return result;\n}\n//!DESC Anime4K-v4.0-Restore-CNN-(S)-Conv-4x3x3x8\n//!HOOK MAIN\n//!BIND conv2d_1_tf\n//!SAVE conv2d_2_tf\n//!WIDTH conv2d_1_tf.w\n//!HEIGHT conv2d_1_tf.h\n//!COMPONENTS 4\n#define go_0(x_off, y_off) (max((conv2d_1_tf_texOff(vec2(x_off, y_off))), 0.0))\n#define go_1(x_off, y_off) (max(-(conv2d_1_tf_texOff(vec2(x_off, y_off))), 0.0))\nvec4 hook() {\n    vec4 result = mat4(0.01921286, -0.26684764, -0.12663573, 0.31641877, -0.25313398, 0.12264074, 0.58750325, -0.14084283, 0.5837018, -0.042300556, -0.20435576, -0.009954825, 0.060783498, 0.05540401, 0.2205112, -0.06578902) * go_0(-1.0, -1.0);\n    result += mat4(-0.21930243, -0.03774968, 0.22615197, 0.18338196, 0.011201461, -0.271034, 0.00573116, -0.12248194, 0.47990513, 0.2982416, -0.1087603, -0.050099242, -0.07620939, -0.07148229, 0.03691984, -0.16796488) * go_0(-1.0, 0.0);\n    result += mat4(-0.14962853, -0.053769328, 0.02387081, 0.22002189, 0.052237745, -0.26160842, -0.08603077, 0.012542448, 0.08119985, 0.075785555, -0.33437458, -0.43373227, -0.13206963, -0.08759176, -0.03288923, -0.09799959) * go_0(-1.0, 1.0);\n    result += mat4(-0.1305593, -0.5974288, 0.06058367, 0.08406488, 0.013692483, 0.06646377, 0.16469325, 0.08990975, 0.42217395, -0.11289523, -0.06165009, 0.48556912, -0.15702641, -0.19922857, -0.0035429662, -0.0022089656) * go_0(0.0, -1.0);\n    result += mat4(-0.1964807, 0.038099788, 0.21587034, 0.039734077, -0.07063389, 0.11604167, -0.24558097, -0.08900199, -0.7684516, -0.1037487, -0.09380674, 0.33144563, -0.16653742, 0.0028585843, -0.33774406, -0.0528696) * go_0(0.0, 0.0);\n    result += mat4(-0.27298656, -0.05665099, 0.09661685, 0.19780266, 0.1025106, -0.22055034, -0.21218458, -0.040628925, 0.0095010325, 0.13118382, -0.42582452, -0.22197723, 0.21006055, -0.06189587, -0.15285942, -0.09526762) * go_0(0.0, 1.0);\n    result += mat4(-0.14494462, -0.046788953, 0.065877035, 0.09911713, 0.35096622, 0.16682479, 0.028363144, 0.36037162, 0.29413632, 0.28212717, -0.025364442, -0.3406269, 0.047262143, -0.11892685, -0.008032766, 0.29743317) * go_0(1.0, -1.0);\n    result += mat4(-0.15191558, -0.36980554, 0.14555687, 0.0043930537, -0.012661432, 0.15737776, -0.115250416, 0.10324491, 0.24491951, -0.15575431, -0.27802598, 0.21959937, 0.18063772, 0.4455559, -0.09693302, 0.33382267) * go_0(1.0, 0.0);\n    result += mat4(0.2717801, 0.13452889, 0.14105384, 0.16324317, -0.40111846, 0.1154301, -0.0076733204, -0.09697362, 0.44306824, -0.02831414, -0.2153124, -0.12075326, 0.060776163, 0.30347148, -0.0036976219, -0.12070682) * go_0(1.0, 1.0);\n    result += mat4(-0.39780128, -0.29875937, -0.12952097, 0.080333896, 0.07520163, 0.021689568, -0.23121156, -0.038140096, -0.1593877, 0.017156163, -0.06038025, 0.009244022, -0.13917233, 0.30957314, 0.243109, -0.104947075) * go_1(-1.0, -1.0);\n    result += mat4(-0.07965157, 0.06776501, -0.13288979, 0.005851189, -0.08768168, -0.03689969, 0.12034646, 0.22441491, 0.14453568, -0.17648841, -0.3378289, -0.018329712, 0.11722939, -0.34161824, 0.08424494, -0.01400687) * go_1(-1.0, 0.0);\n    result += mat4(0.08153887, 0.07222914, -0.14663404, -0.038526025, -0.07385973, 0.18440577, 0.35890242, 0.17084727, 0.26345527, 0.15280858, -0.007446105, -0.024403179, -0.30336383, -0.22978698, 0.11612946, -0.23614909) * go_1(-1.0, 1.0);\n    result += mat4(-0.07447396, 0.09023449, -0.13798, -0.086943336, -0.30787337, 0.15087669, 0.14418626, -0.03371195, 0.048989657, -0.13075387, -0.13458036, -0.059836224, 0.06495196, 0.269715, 0.3674355, 0.38956037) * go_1(0.0, -1.0);\n    result += mat4(0.34981915, -0.048779126, 0.31717536, 0.38080826, -0.20149232, -0.82969636, -0.10167862, 0.6382858, 0.25976858, 0.4370118, -0.04724865, -0.10014156, 0.19380626, -0.080370255, 0.09578106, -0.035166856) * go_1(0.0, 0.0);\n    result += mat4(-0.026443917, 0.4132611, 0.01822534, 0.12742202, -0.26652107, -0.2996705, 0.30905882, 0.07989903, 0.38249823, 0.21486135, 0.025314959, -0.14717339, -0.13344015, -0.32088286, -0.2833883, -0.30973712) * go_1(0.0, 1.0);\n    result += mat4(0.021517841, 0.006556378, 0.2025686, -0.12044382, -0.38583103, -0.0027515136, -0.06556736, -0.097090125, 0.04676486, -0.11954886, -0.051612873, 0.07831412, -0.18823163, -0.16542958, 0.04245155, 0.6437998) * go_1(1.0, -1.0);\n    result += mat4(-0.39475346, -0.2936861, 0.26768062, -0.28151843, 0.21935691, 0.2101108, -0.15455097, 0.19548604, 0.09188909, -0.020147726, 0.103328265, -0.12574542, -0.34167948, 0.07523185, -0.17669058, 0.62446547) * go_1(1.0, 0.0);\n    result += mat4(-0.37661025, -0.29630858, 0.05451026, 0.1611643, 0.14079669, -0.2170294, -0.038716137, 0.13514164, -0.21235192, -0.07860726, -0.005749412, 0.025625167, -0.13297133, 0.33012658, -0.27434957, -0.18416783) * go_1(1.0, 1.0);\n    result += vec4(-0.0036821906, -0.050239526, -0.01355402, 0.00048220603);\n    return result;\n}\n//!DESC Anime4K-v4.0-Restore-CNN-(S)-Conv-3x3x3x8\n//!HOOK MAIN\n//!BIND MAIN\n//!BIND conv2d_2_tf\n//!SAVE MAIN\n//!WIDTH conv2d_2_tf.w\n//!HEIGHT conv2d_2_tf.h\n#define go_0(x_off, y_off) (max((conv2d_2_tf_texOff(vec2(x_off, y_off))), 0.0))\n#define go_1(x_off, y_off) (max(-(conv2d_2_tf_texOff(vec2(x_off, y_off))), 0.0))\nvec4 hook() {\n    vec4 result = mat4(0.15873, 0.17989138, 0.14648493, 0.0, -0.017379675, -0.017363746, -0.019855022, 0.0, 0.009670625, 0.0070157526, 0.0075994316, 0.0, 0.025388412, 0.027231036, 0.024052646, 0.0) * go_0(-1.0, -1.0);\n    result += mat4(0.048195973, 0.041760173, 0.037366055, 0.0, -0.115950756, -0.12887983, -0.12535639, 0.0, 0.032125086, 0.03397254, 0.032950625, 0.0, 0.01223746, 0.020822672, 0.0161561, 0.0) * go_0(-1.0, 0.0);\n    result += mat4(0.0890567, 0.094453335, 0.09014035, 0.0, 0.016081346, 0.017434116, 0.020783134, 0.0, -0.011775135, -0.010094134, -0.018522855, 0.0, 0.072103254, 0.07940666, 0.065876864, 0.0) * go_0(-1.0, 1.0);\n    result += mat4(-0.04841196, -0.06963968, -0.056574684, 0.0, 0.10912542, 0.11813441, 0.10643838, 0.0, -0.013013885, -0.01562045, -0.013802797, 0.0, 0.037505716, 0.04352026, 0.04645123, 0.0) * go_0(0.0, -1.0);\n    result += mat4(-0.3472869, -0.36243078, -0.33530185, 0.0, 0.23654196, 0.2305048, 0.22150646, 0.0, -0.045226905, -0.041799217, -0.042511635, 0.0, -0.10267792, -0.1123385, -0.10845448, 0.0) * go_0(0.0, 0.0);\n    result += mat4(0.011987401, 0.012285043, 0.007813165, 0.0, -0.15911353, -0.17523928, -0.1535267, 0.0, 0.15675929, 0.16531634, 0.15948962, 0.0, -0.09240023, -0.09513292, -0.084187366, 0.0) * go_0(0.0, 1.0);\n    result += mat4(0.069052905, 0.07278333, 0.0756627, 0.0, -0.012180326, -0.018794727, -0.031050753, 0.0, -0.044663202, -0.04362803, -0.038904265, 0.0, -0.008540197, -0.011201734, -0.01556625, 0.0) * go_0(1.0, -1.0);\n    result += mat4(-0.08261173, -0.09042543, -0.07589266, 0.0, 0.043515377, 0.045066774, 0.04037769, 0.0, -0.06262993, -0.07469342, -0.058593787, 0.0, 0.026696987, 0.028740842, 0.037405368, 0.0) * go_0(1.0, 0.0);\n    result += mat4(0.07975598, 0.09597654, 0.08997132, 0.0, -0.07844719, -0.07880916, -0.06835411, 0.0, 0.05668995, 0.050163813, 0.053357534, 0.0, -0.020040333, -0.019867316, -0.01907621, 0.0) * go_0(1.0, 1.0);\n    result += mat4(-0.017078733, -0.017393313, -0.008266595, 0.0, -0.0033478448, -0.0027439648, -0.0042334674, 0.0, -0.06354017, -0.062058125, -0.04652064, 0.0, -0.010787706, -0.0062706997, -0.007573461, 0.0) * go_1(-1.0, -1.0);\n    result += mat4(-0.019895451, -0.016341688, -0.008712399, 0.0, 0.026231976, 0.023955572, 0.0216376, 0.0, -0.061950512, -0.05481285, -0.05261985, 0.0, -0.018804235, -0.016235247, -0.0131616965, 0.0) * go_1(-1.0, 0.0);\n    result += mat4(-0.055628926, -0.063315354, -0.057192408, 0.0, -0.0256364, -0.028660972, -0.02937357, 0.0, -0.017604912, -0.020851422, -0.016070362, 0.0, -0.0870202, -0.0832279, -0.07525406, 0.0) * go_1(-1.0, 1.0);\n    result += mat4(0.062738225, 0.07106593, 0.061644047, 0.0, -0.06068257, -0.06983662, -0.066070385, 0.0, 0.024919355, 0.03227179, 0.028569462, 0.0, -0.07866227, -0.098967604, -0.092128105, 0.0) * go_1(0.0, -1.0);\n    result += mat4(0.040397774, 0.047241107, 0.03962998, 0.0, -0.09112752, -0.10057507, -0.09301817, 0.0, 0.10833967, 0.101835825, 0.10027467, 0.0, 0.27189335, 0.27433604, 0.26781923, 0.0) * go_1(0.0, 0.0);\n    result += mat4(-0.044211388, -0.042373534, -0.03658007, 0.0, 0.113148406, 0.12423258, 0.107804194, 0.0, -0.17081551, -0.18562958, -0.17475435, 0.0, 0.09636739, 0.10763415, 0.093332425, 0.0) * go_1(0.0, 1.0);\n    result += mat4(-0.03798545, -0.047811143, -0.050768293, 0.0, 0.018775463, 0.026812987, 0.03452908, 0.0, 0.0055677597, 0.0039081173, -0.0017878668, 0.0, -0.10728597, -0.12618187, -0.109045394, 0.0) * go_1(1.0, -1.0);\n    result += mat4(0.06359783, 0.064184755, 0.04934199, 0.0, -0.009819327, -0.006616115, -0.007431496, 0.0, 0.025055679, 0.024787048, 0.017360551, 0.0, -0.047140837, -0.061695747, -0.06440822, 0.0) * go_1(1.0, 0.0);\n    result += mat4(0.060199022, 0.06482763, 0.059514645, 0.0, 0.026998974, 0.028776823, 0.024897143, 0.0, 0.17968474, 0.19337215, 0.16760105, 0.0, 0.0075838566, 0.010503482, 0.011993149, 0.0) * go_1(1.0, 1.0);\n    result += vec4(-0.0052927984, -0.0060193934, -0.0048643993, 0.0);\n    return result + MAIN_tex(MAIN_pos);\n}\n';
const restoreCnnM = '// MIT License\n\n// Copyright (c) 2019-2021 bloc97\n// All rights reserved.\n\n// Permission is hereby granted, free of charge, to any person obtaining a copy\n// of this software and associated documentation files (the "Software"), to deal\n// in the Software without restriction, including without limitation the rights\n// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell\n// copies of the Software, and to permit persons to whom the Software is\n// furnished to do so, subject to the following conditions:\n\n// The above copyright notice and this permission notice shall be included in all\n// copies or substantial portions of the Software.\n\n// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\n// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\n// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\n// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\n// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\n// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\n// SOFTWARE.\n\n//!DESC Anime4K-v4.0-Restore-CNN-(M)-Conv-4x3x3x3\n//!HOOK MAIN\n//!BIND MAIN\n//!SAVE conv2d_tf\n//!WIDTH MAIN.w\n//!HEIGHT MAIN.h\n//!COMPONENTS 4\n#define go_0(x_off, y_off) (MAIN_texOff(vec2(x_off, y_off)))\nvec4 hook() {\n    vec4 result = mat4(-0.09991986, 0.13782342, -0.031251684, -0.06356843, -0.3437488, 0.05450952, 0.34347802, 0.46335372, 0.08607224, 0.044988394, 0.137179, 0.17976908, 0.0, 0.0, 0.0, 0.0) * go_0(-1.0, -1.0);\n    result += mat4(-0.024212424, -0.09278509, -0.00040907756, 0.34552294, -0.13254678, 0.113105185, 0.005667946, -0.00036919137, -0.06375679, 0.009184115, 0.115518734, -0.115506776, 0.0, 0.0, 0.0, 0.0) * go_0(-1.0, 0.0);\n    result += mat4(-0.14101827, 0.023523493, 0.044094566, -0.019271746, -0.44348842, -0.08818877, -0.4026149, -0.21995795, -0.15880394, -0.013732858, -0.020751135, 0.012719151, 0.0, 0.0, 0.0, 0.0) * go_0(-1.0, 1.0);\n    result += mat4(0.013001821, -0.34503505, 0.39219138, 0.18792126, 0.24760444, -0.016173402, 0.10154511, 0.15453082, -0.058132876, 0.016784398, -0.05808539, -0.11039915, 0.0, 0.0, 0.0, 0.0) * go_0(0.0, -1.0);\n    result += mat4(0.37024534, 0.041440863, -0.3374568, -0.44994286, 0.19555596, 0.20855539, -0.27974075, -0.5372628, 0.21228147, -0.0295346, -0.56700057, 0.030042822, 0.0, 0.0, 0.0, 0.0) * go_0(0.0, 0.0);\n    result += mat4(-0.12940632, 0.057526, 0.090682045, -0.06985033, -0.13704006, -0.047685407, 0.44615674, -0.48056605, -0.06166251, -0.01883519, 0.2032237, -0.113287605, 0.0, 0.0, 0.0, 0.0) * go_0(0.0, 1.0);\n    result += mat4(0.010856669, -0.35820737, 0.16757219, 0.082619876, -0.03967303, 0.038705572, 0.32652855, -0.012030017, 0.015120559, -0.15314877, 0.23442009, 0.09767922, 0.0, 0.0, 0.0, 0.0) * go_0(1.0, -1.0);\n    result += mat4(-0.046272673, -0.17752305, 0.082018286, -0.2512824, 0.58619463, -0.060903464, -0.022793597, 0.077803515, -0.17025311, 0.05136993, 0.029383298, -0.15475409, 0.0, 0.0, 0.0, 0.0) * go_0(1.0, 0.0);\n    result += mat4(-0.11212024, 0.13378005, -0.2027488, 0.08056421, -0.11176219, -0.048429377, -0.08396386, 0.10507829, 0.13326839, 0.0430627, 0.051362377, 0.06482755, 0.0, 0.0, 0.0, 0.0) * go_0(1.0, 1.0);\n    result += vec4(-0.061233472, 0.39222646, 0.029704979, 0.02586828);\n    return result;\n}\n//!DESC Anime4K-v4.0-Restore-CNN-(M)-Conv-4x3x3x8\n//!HOOK MAIN\n//!BIND conv2d_tf\n//!SAVE conv2d_1_tf\n//!WIDTH conv2d_tf.w\n//!HEIGHT conv2d_tf.h\n//!COMPONENTS 4\n#define go_0(x_off, y_off) (max((conv2d_tf_texOff(vec2(x_off, y_off))), 0.0))\n#define go_1(x_off, y_off) (max(-(conv2d_tf_texOff(vec2(x_off, y_off))), 0.0))\nvec4 hook() {\n    vec4 result = mat4(-0.16410656, -0.40521824, 0.13121907, -0.02314597, 0.105412476, -0.060401272, -0.043063477, -0.13933973, 0.12558138, -0.020861467, 0.030370515, 0.13178016, -0.14220351, 0.20736893, 0.003321564, -0.29241714) * go_0(-1.0, -1.0);\n    result += mat4(0.18517321, 0.29162985, -0.26783395, 0.039760686, 0.025527012, -0.067319244, 0.055004176, 0.048916563, 0.12750523, -0.091435954, 0.13818842, 0.36704224, 0.0839921, 0.10186618, -0.17237376, 0.13282418) * go_0(-1.0, 0.0);\n    result += mat4(-0.1657887, 0.0131325135, -0.17222486, 0.091398895, -0.12756164, -0.08437298, -0.29052997, 0.3269337, 0.15870757, -0.013529402, -0.0581753, 0.11802371, 0.07099966, -0.024063632, 0.31834844, -0.11183859) * go_0(-1.0, 1.0);\n    result += mat4(0.46036887, -0.07654623, 0.22923063, 0.17463821, 0.10555414, -0.117430426, 0.12406777, -0.011399492, 0.028316498, 0.13684341, 0.009664087, 0.2022659, 0.04953974, -0.31342217, -0.6103131, -0.13605757) * go_0(0.0, -1.0);\n    result += mat4(0.03406955, -0.39819366, 0.61176, -0.46809456, -0.029321073, 0.46619493, 0.36700186, 0.02288561, 0.11464085, -0.10931452, -0.09154022, 0.07334147, -0.5609916, 0.31826234, -0.011012659, -0.46719545) * go_0(0.0, 0.0);\n    result += mat4(-0.056855045, 0.27037027, -0.09269696, -0.563572, -0.06816116, -0.22986612, 0.08693167, -0.16246101, 0.09954046, -0.05374176, 0.0071916827, -0.1788692, 0.3825241, -0.1609887, 0.055204768, 0.10213068) * go_0(0.0, 1.0);\n    result += mat4(0.0646626, 0.102358796, -0.45055822, 0.20557903, -0.23337309, 0.12633002, -0.19299199, -0.15085731, -0.13473304, 0.053790465, -0.10061193, -0.13393497, -0.04264752, -0.029740738, -0.07865285, 0.20883279) * go_0(1.0, -1.0);\n    result += mat4(0.010471527, -0.033218473, -0.46157447, 0.004866583, 0.23226471, -0.059343327, -0.1439596, 0.13619648, 0.013839963, 0.15930325, 0.043742355, 0.17467323, 0.33772305, 0.40261495, -0.08351293, 0.18129359) * go_0(1.0, 0.0);\n    result += mat4(-0.12493434, -0.1875134, -0.074943796, -0.0031701606, -0.037142616, 0.1667002, 0.16665547, -0.011248127, 0.0071619414, 0.0034872112, 0.120318964, -0.09625579, 0.14917047, -0.16310586, 0.07231737, 0.30447328) * go_0(1.0, 1.0);\n    result += mat4(0.093798615, 0.17074613, -0.08780678, -0.012520207, 0.118534856, 0.027508778, -0.2778478, -0.19509242, -0.34137097, 0.32000312, -0.22027159, 0.337515, 0.16220862, 0.108993016, 0.14070526, 0.12784284) * go_1(-1.0, -1.0);\n    result += mat4(-0.14325632, -0.1467453, -0.27502358, 0.09370837, 0.11821083, -0.012266484, -0.2100548, 0.4707502, -0.06766648, 0.58165014, -0.2512279, -0.33783755, 0.1318925, -0.04346277, 0.15454485, 0.044500057) * go_1(-1.0, 0.0);\n    result += mat4(-0.05683207, 0.0051946463, -0.108000524, 0.10133204, -0.50763863, 0.007308442, 0.8542404, 0.28387356, 0.022709515, 0.294523, -0.3822472, 0.66166407, 0.01404485, 0.031282708, -0.26756814, -0.123147786) * go_1(-1.0, 1.0);\n    result += mat4(-0.36455178, 0.3470555, -0.045303088, -0.03170764, -0.15802494, -0.0019141496, -0.25939587, -0.23875342, 0.130428, 0.03954273, -0.17985536, 0.105145946, 0.15804817, 0.12551713, 0.28371975, -0.085748516) * go_1(0.0, -1.0);\n    result += mat4(0.0060625463, 0.2443924, -0.017692259, -0.20214005, -0.09584515, -0.012805372, -0.13942227, 0.16143198, 0.12942013, 0.41785547, 0.046071563, 0.7030026, 0.10499644, -0.20566013, -0.031321276, 0.27830327) * go_1(0.0, 0.0);\n    result += mat4(-0.081274964, -0.14562319, 0.27200526, -0.20491314, 0.012910989, 0.024201397, 0.04816258, 0.21297328, -0.22015952, -0.44160756, -0.056035373, 0.33824417, -0.31645304, 0.15469243, 0.053187452, -0.20989445) * go_1(0.0, 1.0);\n    result += mat4(-0.046550367, 0.033185404, 0.33337244, 0.12853645, 0.23520172, -0.05909214, 0.0861368, 0.10706329, -0.07058717, -0.11759937, -0.18594047, 0.080006264, -0.055425353, -0.12506317, 0.15729053, -0.0915004) * go_1(1.0, -1.0);\n    result += mat4(0.042516407, 0.14844789, 0.16533111, 0.13502933, -0.0655417, -0.057256397, 0.076713726, -0.23448966, 0.12855926, 0.014219275, 0.051761385, 0.053433083, -0.2446715, -0.4008074, 0.19603717, -0.1796951) * go_1(1.0, 0.0);\n    result += mat4(0.14777803, 0.15524907, 0.043158617, -0.06996876, 0.19210646, -0.2144364, -0.47020787, -0.4207906, -0.18074386, -0.2163903, 0.0030754965, 0.36799973, -0.3837698, -0.0022661497, -0.37276733, -0.28934997) * go_1(1.0, 1.0);\n    result += vec4(-0.018297346, -0.080951825, -0.062163066, -0.08050014);\n    return result;\n}\n//!DESC Anime4K-v4.0-Restore-CNN-(M)-Conv-4x3x3x8\n//!HOOK MAIN\n//!BIND conv2d_1_tf\n//!SAVE conv2d_2_tf\n//!WIDTH conv2d_1_tf.w\n//!HEIGHT conv2d_1_tf.h\n//!COMPONENTS 4\n#define go_0(x_off, y_off) (max((conv2d_1_tf_texOff(vec2(x_off, y_off))), 0.0))\n#define go_1(x_off, y_off) (max(-(conv2d_1_tf_texOff(vec2(x_off, y_off))), 0.0))\nvec4 hook() {\n    vec4 result = mat4(0.31543177, 0.23095237, -0.06692611, -0.5867763, 0.003622504, 0.17948842, -0.14627707, 0.1745016, -0.052964583, -0.15551159, 0.05644786, -0.012665164, 0.13107763, 0.11369179, -0.09452995, -0.11973403) * go_0(-1.0, -1.0);\n    result += mat4(-0.2694661, -0.115382135, 0.3073268, -0.067228466, -0.25511482, -0.13922207, 0.36758214, -0.18821828, -0.022617863, 0.20333402, -0.11125889, 0.3552245, -0.013346653, -0.099095374, -0.25100616, 0.35521755) * go_0(-1.0, 0.0);\n    result += mat4(0.011012409, -0.13675085, 0.25642, -0.34851208, -0.23184675, 0.18012202, 0.57654136, 0.103173524, -0.16461405, 0.038177088, 0.1234096, 0.013202029, -0.19033363, 0.07469178, -0.017948546, 0.15287702) * go_0(-1.0, 1.0);\n    result += mat4(-0.05340533, 0.23797482, 0.20351392, -0.05333351, -0.12181174, -0.23363493, -0.20696607, 0.109941036, -0.11519453, 0.13842066, -0.10687832, 0.29040006, 0.022218632, 0.031238724, 0.2685182, 0.15300068) * go_0(0.0, -1.0);\n    result += mat4(0.22985318, -0.3103802, -0.22916415, 0.25238806, -0.11690287, -0.1947488, 0.118020535, 0.07814263, -0.06335474, -0.007870727, 0.076106325, 0.094677486, -0.16776285, -0.006570437, -0.29589584, 0.41413507) * go_0(0.0, 0.0);\n    result += mat4(0.43607962, -0.36456433, -0.123776875, -0.16634953, -0.091190875, 0.13035081, 0.28627968, 0.27249968, 0.12356344, -0.008616177, 0.09599816, -0.006144557, -0.23490307, 0.3013123, 0.14153156, 0.21837278) * go_0(0.0, 1.0);\n    result += mat4(0.060364585, 0.37860224, 0.039182413, -0.22805426, -0.089910224, -0.06817697, -0.2684275, -0.12528503, 0.036934495, -0.07826616, 0.06559976, -0.08253646, 0.13489649, 0.06237663, 0.126376, 0.21194184) * go_0(1.0, -1.0);\n    result += mat4(-0.12534817, 0.21225189, -0.27818045, -0.3070443, -0.006957577, -0.025105853, 0.12100924, -0.06916452, 0.23081483, 0.1802756, -0.18995638, 0.16603014, -0.2904096, -0.25292823, -0.21834068, 0.13719653) * go_0(1.0, 0.0);\n    result += mat4(0.017209655, 0.10757137, 0.21414296, -0.30885983, 0.10467716, -0.2184891, 0.100061476, -0.1527528, 0.2100472, -0.25768545, -0.22329919, -0.29153427, -0.06983842, -0.103854865, -0.051384352, 0.14629121) * go_0(1.0, 1.0);\n    result += mat4(0.0059623295, -0.26060802, 0.32115817, 0.021025505, 0.09783085, -0.15865178, 0.1473021, -0.24977303, -0.033508282, 0.17480391, -0.091310136, 0.09870876, 0.10504043, -0.06105686, 0.013493489, -0.11278855) * go_1(-1.0, -1.0);\n    result += mat4(0.14875248, -0.14859414, 0.19377062, -0.17456068, 0.101288855, -0.1113682, -0.48944646, 0.1018565, -0.037392337, 0.08539691, 0.1751306, -0.15428723, -0.059375558, 0.027663672, 0.051804014, -0.049813222) * go_1(-1.0, 0.0);\n    result += mat4(0.118846565, -0.19869871, -0.037388258, 0.08456728, -0.11662527, -0.43818352, -0.093285345, 0.038507205, -0.051991668, 0.21008292, 0.10792365, 0.2020924, 0.057021596, 0.09460527, 0.0016551288, -0.0015957063) * go_1(-1.0, 1.0);\n    result += mat4(0.11062174, -0.2639232, -0.060295466, -0.3217331, -0.050545212, 0.30989558, 0.30906132, 0.030323273, 0.028986752, 0.037429404, 0.20855664, -0.19848943, 0.034687653, -0.09599135, -0.06250494, -0.13215867) * go_1(0.0, -1.0);\n    result += mat4(-0.010391146, 0.07657845, 0.44491258, 0.0435906, 0.0075931503, 0.42632654, 0.47022533, 0.34737435, -0.15452717, -0.14613411, -0.45231065, 0.12094409, 0.0067911847, 0.057501152, 0.09876979, 0.044946447) * go_1(0.0, 0.0);\n    result += mat4(-0.15607435, 0.2293058, -0.09520331, 0.012836732, -0.15282455, 0.26437718, -0.1685477, -0.13211122, -0.055801593, -0.016778728, -0.34478986, -0.23228309, 0.12300962, -0.13235827, -0.13987203, -0.16550972) * go_1(0.0, 1.0);\n    result += mat4(0.13161735, -0.09039346, -0.033475474, -0.23686698, 0.1514885, 0.20977421, 0.031431954, -0.0049226107, 0.090661936, 0.15288061, -0.03316583, 0.09646573, -0.32651708, 0.18825398, -0.15777239, 0.17572704) * go_1(1.0, -1.0);\n    result += mat4(0.112157226, -0.08712878, 0.23453182, 0.1043877, -0.14686783, 0.28682423, -0.086443506, 0.059457052, -0.31530112, -0.2700583, -0.06028952, -0.070416875, 0.18053482, 0.16653341, 0.25215197, 0.061915852) * go_1(1.0, 0.0);\n    result += mat4(-0.20122242, 0.076313145, -0.0988483, 0.094337784, -0.35436687, 0.3762327, -0.07809558, 0.3055848, 0.10425242, -0.17087407, 0.030301496, -0.13911743, 0.01630275, 0.24247427, -0.006474477, 0.03842641) * go_1(1.0, 1.0);\n    result += vec4(-0.008952847, -0.0058945753, -0.08097229, 0.020968592);\n    return result;\n}\n//!DESC Anime4K-v4.0-Restore-CNN-(M)-Conv-4x3x3x8\n//!HOOK MAIN\n//!BIND conv2d_2_tf\n//!SAVE conv2d_3_tf\n//!WIDTH conv2d_2_tf.w\n//!HEIGHT conv2d_2_tf.h\n//!COMPONENTS 4\n#define go_0(x_off, y_off) (max((conv2d_2_tf_texOff(vec2(x_off, y_off))), 0.0))\n#define go_1(x_off, y_off) (max(-(conv2d_2_tf_texOff(vec2(x_off, y_off))), 0.0))\nvec4 hook() {\n    vec4 result = mat4(-0.2237721, -0.0064096362, -0.31808427, 0.73477733, 0.015353088, 0.23983319, 0.14967978, -0.34920225, -0.07456269, 0.093151815, -0.14331086, -0.24586205, -0.14183366, 0.06401045, -0.22044073, 0.29932275) * go_0(-1.0, -1.0);\n    result += mat4(-0.07968509, -0.3349146, 0.16529128, 0.08443499, 0.4095855, -0.17120704, 0.17425705, 0.15298946, 0.2981273, 0.2212369, 0.10392389, -0.28775454, -0.065247655, -0.15255849, 0.13094437, 0.18685219) * go_0(-1.0, 0.0);\n    result += mat4(0.015706737, -0.17755036, 0.2622526, 0.112057306, -0.15876788, -0.38466996, -0.33700845, -0.031711742, -0.023320962, -0.3145249, -0.21223734, -0.1314596, -0.1888095, -0.046370104, 0.09000896, -0.0046378844) * go_0(-1.0, 1.0);\n    result += mat4(-0.31127506, 0.31304324, -0.03965752, 0.03649018, -0.029851055, 0.05801377, 0.00040150844, -0.04422069, 0.18019931, 0.14415511, -0.09845236, 0.21895434, -0.013932474, -0.046454947, -0.3403935, -0.006705289) * go_0(0.0, -1.0);\n    result += mat4(-0.34878647, -0.5129283, 0.060250953, -0.16354133, 0.20644619, 0.08732273, -0.24118888, 0.24455065, 0.24449423, 0.44103387, 0.22455928, 0.25738943, -0.26914698, -0.21309987, 0.08386486, 0.021484816) * go_0(0.0, 0.0);\n    result += mat4(-0.057454903, -0.4121922, 0.022661546, 0.37178272, 0.03331408, 0.05044008, 0.04324371, 0.20727943, 0.2432641, 0.076906696, -0.20858039, 0.012439015, -0.19335061, 0.09217451, 0.1968369, -0.19435833) * go_0(0.0, 1.0);\n    result += mat4(-0.16960496, 0.24616167, 0.37977478, 0.14324574, -0.011531225, -0.11312143, -0.18141079, -0.23843932, 0.0086012175, -0.3564491, -0.12639481, 0.009799298, -0.29120612, 0.23756824, 0.18035695, -0.087133996) * go_0(1.0, -1.0);\n    result += mat4(-0.10081239, 0.29191494, 0.10434693, 0.08970636, 0.008997759, 0.104756236, 0.039641086, 0.02323888, -0.11627765, 0.023693223, -0.30801758, -0.120208986, 0.05086147, 0.18498175, 0.15595439, -0.09877306) * go_0(1.0, 0.0);\n    result += mat4(0.101321675, -0.2929976, 0.38810417, 0.5605376, -0.04073937, 0.030110704, -0.18147062, -0.09833952, 0.01927733, 0.15335669, -0.15384074, -0.110595055, -0.054297395, -0.077522054, 0.07918369, -0.068480626) * go_0(1.0, 1.0);\n    result += mat4(0.23263514, -0.11719232, 0.2903209, -0.007503795, -0.020222448, -0.17790157, -0.15600762, -0.08741775, 0.12529704, 0.25548857, -0.04585447, -0.10255033, 0.18350503, -0.29593533, 0.0868933, 0.027004737) * go_1(-1.0, -1.0);\n    result += mat4(-0.14958654, -0.006238835, -0.2928948, 0.1988557, -0.17057803, 0.12524141, 0.13978264, -0.019280292, 0.05967142, -0.07790818, -0.5893818, -0.022845713, -0.08596779, 0.07875358, -0.03316667, -0.4369282) * go_1(-1.0, 0.0);\n    result += mat4(0.19195688, -0.060883682, -0.25897828, 0.07063324, 0.090833396, 0.003422883, 0.109534174, 0.031180874, -0.05017118, 0.022862168, -0.270113, -0.057831235, 0.53920543, -0.10252776, -0.091807485, 0.004294343) * go_1(-1.0, 1.0);\n    result += mat4(-0.18494242, -0.119284816, 0.3821897, 0.07777979, 0.15568028, -0.2854859, -0.22441281, -0.049155876, -0.15292497, 0.21895619, -0.095677756, 0.15210424, 0.001643022, -0.026176987, 0.048463076, -0.4824009) * go_1(0.0, -1.0);\n    result += mat4(0.007215129, 0.17074333, 0.053930074, -0.027014816, -0.17180431, -0.15163863, -0.0012122132, -0.18934256, -0.08294297, -0.24580221, -0.46552867, -0.27923223, 0.4092668, 0.06288688, -0.1602188, -0.0030876845) * go_1(0.0, 0.0);\n    result += mat4(0.111870885, 0.03317145, 0.14155298, 0.20328505, -0.05104131, 0.13979794, 0.018966835, -0.07238511, 0.05493792, -0.14975783, -0.10293237, -0.21985306, 0.49054706, 0.18288186, -0.26925826, 0.35845932) * go_1(0.0, 1.0);\n    result += mat4(0.3747799, -0.096748486, -0.17139742, 0.25289854, -0.17421168, -0.018461818, 0.09747162, 0.01660535, -0.20580359, 0.56189656, 0.17151354, -0.26347768, 0.28350568, -0.21486014, -0.44330928, -0.008981037) * go_1(1.0, -1.0);\n    result += mat4(0.10169985, -0.18244018, 0.04760736, 0.41017643, -0.09468786, -0.024218475, 0.103733875, -0.22540338, 0.10630112, 0.3677178, -0.104170956, 0.057317447, 0.21764882, 0.0789158, -0.22041337, 0.15065216) * go_1(1.0, 0.0);\n    result += mat4(0.11633995, -0.008195114, -0.14501533, 0.07168025, 0.058413275, 0.055995367, 0.09362145, -0.13827963, 0.13760869, 0.040319785, 0.038895044, 0.2675253, -0.087339684, 0.1412073, -0.17166458, -0.2312994) * go_1(1.0, 1.0);\n    result += vec4(-0.059377354, -0.02055341, 0.07234869, -0.015452986);\n    return result;\n}\n//!DESC Anime4K-v4.0-Restore-CNN-(M)-Conv-4x3x3x8\n//!HOOK MAIN\n//!BIND conv2d_3_tf\n//!SAVE conv2d_4_tf\n//!WIDTH conv2d_3_tf.w\n//!HEIGHT conv2d_3_tf.h\n//!COMPONENTS 4\n#define go_0(x_off, y_off) (max((conv2d_3_tf_texOff(vec2(x_off, y_off))), 0.0))\n#define go_1(x_off, y_off) (max(-(conv2d_3_tf_texOff(vec2(x_off, y_off))), 0.0))\nvec4 hook() {\n    vec4 result = mat4(-0.29012984, -0.13150147, 0.31015614, 0.05992291, -0.050289866, 0.14845313, -0.09608898, 0.27913308, 0.060307387, -0.04160452, 0.035932682, -0.08137563, -0.07999419, 0.11818284, -0.27512288, 0.21948813) * go_0(-1.0, -1.0);\n    result += mat4(0.12916058, -0.21759962, -0.33868533, 0.021636661, 0.053470243, 0.1412425, 0.043395396, -0.26751056, -0.01689101, -0.2623835, 0.010809152, 0.062962815, -0.20692012, -0.1677863, -0.23313859, -0.17402615) * go_0(-1.0, 0.0);\n    result += mat4(-0.08204112, -0.23672083, -0.0064437394, -0.13200696, -0.056692924, -0.02708657, 0.12536962, 0.004428919, 0.14137582, 0.15404348, -0.105753876, 0.047957454, 0.15734316, 0.16562423, -0.010160829, -0.06602983) * go_0(-1.0, 1.0);\n    result += mat4(0.025653997, -0.10877775, -0.31258908, 0.18841636, -0.36005193, 0.1816357, -0.34537643, -0.0741087, 0.4663994, 0.0065186517, 0.08109033, 0.2976773, -0.35774228, -0.041366056, -0.37852773, 0.050565656) * go_0(0.0, -1.0);\n    result += mat4(0.04392313, 0.11316681, -0.14421389, 0.17985669, -0.1651274, -0.5656209, -0.124100484, 0.42774054, -0.1153939, 0.16829851, 0.2025612, 0.054007456, -0.06868256, -0.56935954, -0.12227961, 0.17688861) * go_0(0.0, 0.0);\n    result += mat4(0.34041, 0.499, 0.15234196, 0.21353458, -0.2732667, -0.049950935, 0.03550811, -0.21051687, 0.2609023, 0.016438454, -0.29874632, 0.37994128, 0.049288407, -0.31126305, 0.029235512, -0.012256015) * go_0(0.0, 1.0);\n    result += mat4(-0.0046853204, 0.15391374, -0.040689662, 0.20186873, -0.08137621, 0.35905558, 0.23733845, 0.21794793, -0.066420384, 0.029600656, -0.31421044, -0.050773863, -0.06260773, 0.04634221, -0.10948491, -0.045498934) * go_0(1.0, -1.0);\n    result += mat4(-0.082953, -0.025837064, -0.09928303, -0.14300232, 0.275064, 0.07793617, 0.22240888, 0.06637834, -0.4382666, -0.2932182, -0.27243167, -0.14221182, 0.5695728, 0.20719238, 0.5575927, 0.40816882) * go_0(1.0, 0.0);\n    result += mat4(-0.18510929, -0.15052167, 0.25277212, 0.06804461, 0.016387, 0.20310035, 0.2903229, -0.0615877, -0.28987274, -0.11942605, 0.013498961, 0.3184152, 0.29543474, -0.042830903, -0.018111207, -0.13263674) * go_0(1.0, 1.0);\n    result += mat4(0.25749087, 0.0053866603, -0.09391162, -0.06129529, -0.094091184, -0.07419633, 0.0013858611, 0.012000353, -0.062903, -0.0204224, -0.12113313, 0.017942557, -0.073379934, 0.052201986, 0.35864577, 0.023564404) * go_1(-1.0, -1.0);\n    result += mat4(0.100115694, 0.19451359, 0.23252094, 0.19506809, -0.12470779, 0.0027281935, -0.17488572, -0.018721964, -0.15159339, 0.18457152, 0.057712987, -0.08191495, 0.19735703, 0.07326743, -0.28563106, 0.01642815) * go_1(-1.0, 0.0);\n    result += mat4(0.068062514, 0.28356665, 0.07377898, 0.42776972, 0.28725025, -0.13045293, -0.17525704, -0.05885591, -0.16676305, -0.2555945, -0.10078422, -0.053032875, 0.084470876, 0.06460686, 0.13824362, -0.05231353) * go_1(-1.0, 1.0);\n    result += mat4(0.22637829, -0.028969254, 0.1968254, -0.13331996, 0.038017053, -0.008854481, -0.2031639, 0.09237089, -0.3821112, 0.1108527, -0.11029933, -0.24542028, 0.22416145, -0.031492114, -0.19144306, -0.0996271) * go_1(0.0, -1.0);\n    result += mat4(0.10776744, 0.16363445, 0.14656505, -0.3737814, -0.06642015, 0.5616549, -0.008412252, -0.37266847, 0.12506576, -0.15329036, 0.037538245, -0.10810259, 0.01706349, 0.1813702, 0.035651788, -0.012786579) * go_1(0.0, 0.0);\n    result += mat4(-0.4023338, -0.2098614, -0.18285121, -0.02727653, 0.26107362, 0.041306913, -0.036515504, -0.045217298, -0.39958602, -0.21229339, -0.021053292, -0.13427502, 0.36178818, 0.20934913, 0.1500852, 0.2634554) * go_1(0.0, 1.0);\n    result += mat4(0.07794611, -0.25937587, -0.06822529, -0.056336135, 0.094220124, 0.21588847, -0.0455218, -0.10968329, -0.08068449, -0.31366697, 0.07799637, 0.24252681, 0.23963861, 0.13715535, 0.010329345, 0.09094301) * go_1(1.0, -1.0);\n    result += mat4(-0.20975718, -0.12550138, 0.14453574, -0.0020878632, -0.07153068, 0.3249998, -0.056577377, 0.18166828, 0.37204072, 0.17018336, 0.3752895, 0.32178587, 0.2571982, -0.27258632, -0.25971004, -0.40536007) * go_1(1.0, 0.0);\n    result += mat4(-0.3243907, -0.06300621, -0.09398436, -0.19549188, 0.14906861, 0.061537784, -0.055284478, 0.11281728, 0.12964857, 0.09979093, -0.1810159, -0.4104283, 0.05807971, -0.056371246, 0.08072554, 0.18479007) * go_1(1.0, 1.0);\n    result += vec4(-0.048888464, -0.0561434, 0.030690912, -0.030496685);\n    return result;\n}\n//!DESC Anime4K-v4.0-Restore-CNN-(M)-Conv-4x3x3x8\n//!HOOK MAIN\n//!BIND conv2d_4_tf\n//!SAVE conv2d_5_tf\n//!WIDTH conv2d_4_tf.w\n//!HEIGHT conv2d_4_tf.h\n//!COMPONENTS 4\n#define go_0(x_off, y_off) (max((conv2d_4_tf_texOff(vec2(x_off, y_off))), 0.0))\n#define go_1(x_off, y_off) (max(-(conv2d_4_tf_texOff(vec2(x_off, y_off))), 0.0))\nvec4 hook() {\n    vec4 result = mat4(0.15332128, 0.027258258, 0.14900503, -0.15982795, 0.17021236, -0.51046044, -0.15287271, -0.058167327, 0.51826185, -0.34817994, 0.004513167, 0.05395769, 0.1990321, -0.049979225, 0.11391989, -0.16062729) * go_0(-1.0, -1.0);\n    result += mat4(0.033682905, 0.019728886, 0.19931756, 0.17381927, 0.2585768, -0.2124572, -0.014632459, 0.39779893, -0.1146207, -0.2396625, 0.08960277, 0.38345298, 0.25497693, 0.11692859, -0.14207517, 0.12667973) * go_0(-1.0, 0.0);\n    result += mat4(-0.14911255, 0.08910706, 0.16136818, 0.03914566, 0.24204038, -0.03607149, -0.4571109, 0.10802461, -0.0021356856, 0.00885878, 0.22297303, 0.2367231, 0.045177583, 0.11120606, -0.009971904, -0.059262395) * go_0(-1.0, 1.0);\n    result += mat4(0.24565999, -0.2261384, 0.47373205, 0.024613412, -0.10923052, 0.039027315, -0.42707404, -0.3783373, 0.3544573, -0.5468578, -0.27599156, -0.09455918, 0.18760219, -0.19082001, 0.030565469, 0.20589156) * go_0(0.0, -1.0);\n    result += mat4(0.1973198, -0.03433863, 0.059960485, 0.045642868, 0.1819595, -0.14460869, 0.1286175, 0.2067575, -0.042632047, -0.11842967, -0.11224446, -0.18764776, -0.19563004, 0.027425969, 0.24056377, 0.5949649) * go_0(0.0, 0.0);\n    result += mat4(0.055027682, 0.16331595, -0.2608588, 0.12545955, 0.4588985, 0.03642909, 0.22187738, 0.45190734, -0.001210133, -0.057651415, -0.061199043, 0.11935476, -0.049561135, 0.27509886, 0.13778673, -0.124914035) * go_0(0.0, 1.0);\n    result += mat4(-0.02257459, 0.27705106, 0.044165276, -0.26521233, 0.05982374, -0.2824302, 0.3171142, 0.08430561, -0.10155528, 0.16182268, -0.09183147, -0.19447176, 0.3295707, -0.50616395, -0.036964044, 0.23166709) * go_0(1.0, -1.0);\n    result += mat4(-0.0232342, 0.07299799, -0.18038079, -0.13672702, -0.108305976, 0.15024792, -0.19531927, 0.0870979, -0.26488534, 0.19481428, 0.10737945, -0.14573483, -0.33094683, 0.24155116, -0.09850332, 0.2797003) * go_0(1.0, 0.0);\n    result += mat4(-0.24089853, 0.19506595, 0.4799156, -0.058313113, 0.36212957, -0.44844806, 0.23864488, 0.15477742, -0.07795971, -0.0033861927, -0.11216164, 0.033454563, -0.25893036, 0.23793478, -0.15769425, -0.00033481256) * go_0(1.0, 1.0);\n    result += mat4(0.05772507, -0.1640253, -0.13499664, -0.20460358, -0.024399966, 0.14966168, -0.090857334, -0.039677754, 0.00036956606, -0.24236615, -0.053542696, -0.0049544116, 0.026651502, 0.39019194, -0.2742246, -0.061242323) * go_1(-1.0, -1.0);\n    result += mat4(-0.016323274, -0.036179908, 0.029965919, 0.11151491, -0.00016685206, -0.29573023, 0.17996423, -0.20145437, 0.1324275, -0.18442132, -0.24618152, 0.061780427, -0.02770517, 0.28452995, 0.39804098, -0.1174389) * go_1(-1.0, 0.0);\n    result += mat4(-0.025068847, -0.053328387, -0.27053785, 0.26866457, -0.09866204, 0.057677213, 0.01850112, -0.18014707, -0.13319959, -0.14411181, -0.26355243, -0.022209354, -0.05062645, -0.036771543, 0.13294417, -0.18458557) * go_1(-1.0, 1.0);\n    result += mat4(-0.046194963, 0.038230438, -0.08993043, -0.07236354, 0.11031123, -0.16504908, -0.09517036, -0.16459833, -0.5279925, 0.12686682, -0.05726125, 0.055361677, 0.31593755, 0.027328093, 0.001839602, 0.30581662) * go_1(0.0, -1.0);\n    result += mat4(0.08608678, 0.03168437, 0.007713377, -0.26140293, -0.1268983, 0.13395861, -0.069848835, -0.24080403, 0.018839337, -0.049821075, -0.21461345, -0.14168301, -0.0872339, 0.47096667, 0.022512507, 0.14860632) * go_1(0.0, 0.0);\n    result += mat4(0.06293673, 0.22462969, 0.045494985, 0.021673543, 0.18227446, -0.2956555, 0.08010543, -0.01919729, -0.012190269, 0.241983, -0.046537094, -0.40094566, -0.3853647, 0.1081711, -0.16926058, 0.16138376) * go_1(0.0, 1.0);\n    result += mat4(-0.14854589, -0.17625804, -0.10849075, 0.221543, 0.099971965, 0.13901573, 0.29464146, 0.020068526, 0.054358527, -0.10351705, -0.0062914286, 0.24127026, -0.16914125, 0.12729423, -0.18377453, -0.6452375) * go_1(1.0, -1.0);\n    result += mat4(0.12603393, -0.10986093, 0.2314103, 0.16915044, -0.13619255, -0.09349073, 0.20594226, -0.34507084, 0.19077192, 0.052500796, 0.07185645, 0.029082738, -0.015576321, 0.08254907, -0.5501743, -0.38495848) * go_1(1.0, 0.0);\n    result += mat4(0.09300796, -0.079218306, 0.46825135, -0.08735625, 0.06321122, 0.16234867, 0.042932414, -0.013057422, 0.09697148, 0.23457524, 0.19417483, -0.16804664, 0.18379296, 0.17770062, -0.050235, -0.059676602) * go_1(1.0, 1.0);\n    result += vec4(0.011169491, 0.032399546, 0.138099, 0.023857072);\n    return result;\n}\n//!DESC Anime4K-v4.0-Restore-CNN-(M)-Conv-4x3x3x8\n//!HOOK MAIN\n//!BIND conv2d_5_tf\n//!SAVE conv2d_6_tf\n//!WIDTH conv2d_5_tf.w\n//!HEIGHT conv2d_5_tf.h\n//!COMPONENTS 4\n#define go_0(x_off, y_off) (max((conv2d_5_tf_texOff(vec2(x_off, y_off))), 0.0))\n#define go_1(x_off, y_off) (max(-(conv2d_5_tf_texOff(vec2(x_off, y_off))), 0.0))\nvec4 hook() {\n    vec4 result = mat4(-0.22753362, -0.08612073, 0.33140692, 0.08699529, -0.18788953, -0.056579117, -0.12905197, -0.06694621, 0.054559365, 0.15031597, -0.13430363, 0.021646025, 0.14884405, -0.0694291, 0.26149413, 0.11270503) * go_0(-1.0, -1.0);\n    result += mat4(0.17876762, -0.09637848, 0.11285323, 0.2004893, 0.1317187, -0.036162686, 0.17958368, -0.069625, 0.28760737, -0.12505141, 0.12760694, 0.047717955, -0.16811855, -0.16340709, 0.13278298, -0.08403954) * go_0(-1.0, 0.0);\n    result += mat4(-0.21917523, 0.079711854, -0.28642535, 0.2822416, 0.03001489, -0.014772918, -0.3487396, 0.10597145, -0.013841082, 0.17034237, 0.10810282, -0.08089695, -0.22184245, -0.59067357, 0.44113398, 0.13045649) * go_0(-1.0, 1.0);\n    result += mat4(-0.29906932, 0.013923749, 0.2031124, -0.11846688, -0.13953634, 0.08003455, -0.10164494, -0.21218559, 0.10563715, 0.31033117, -0.075903505, 0.047310907, -0.37824214, -0.14506383, 0.11866701, -0.21384487) * go_0(0.0, -1.0);\n    result += mat4(-0.1353849, 0.19258606, 0.063908584, -0.2043788, 0.27244982, 0.1665306, -0.29357895, -0.22441709, 0.18514316, -0.17840464, 0.20986097, 0.14351055, -0.057732623, 0.42166704, -0.23182064, -0.4957248) * go_0(0.0, 0.0);\n    result += mat4(-0.34830126, 0.109066755, -0.28285867, -0.048280068, -0.12290918, 0.04291651, -0.047484186, -0.03702595, 0.23047262, 0.09398974, 0.022467108, 0.08271034, 0.3066665, -0.54077, 0.057771873, 0.23194093) * go_0(0.0, 1.0);\n    result += mat4(-0.17731948, -0.3175927, 0.1452728, 0.09396786, -0.16433562, -0.01833653, -0.22345604, -0.04161193, -0.14827462, 0.18544114, -0.15544125, -0.06179007, 0.16989979, -0.20985202, 0.16391534, -0.09447268) * go_0(1.0, -1.0);\n    result += mat4(-0.053878862, -0.21034616, 0.023831524, 0.19772215, 0.31647214, 0.0126534775, -0.19130844, -0.049282108, -0.21446131, 0.067189045, 0.09117449, -0.25548774, 0.12109098, 0.22009392, -0.3924665, -0.13340388) * go_0(1.0, 0.0);\n    result += mat4(-0.16096684, -0.18495405, 0.10410178, 0.0015673033, -0.00183498, -0.044303037, -0.062745355, -0.090802394, 0.043269135, 0.06924481, -0.21367405, -0.14619029, 0.11555763, -0.20292862, 0.5799557, 0.14739846) * go_0(1.0, 1.0);\n    result += mat4(-0.21030277, -0.09578802, 0.013482288, -0.21484336, 0.12995781, 0.40431052, -0.3347856, -0.18183486, 0.15550353, -0.04402301, 0.4603779, 0.14874357, -0.07694621, -0.053523075, -0.19607326, -0.10850742) * go_1(-1.0, -1.0);\n    result += mat4(-0.2347211, 0.2697403, -0.0634794, -0.17925987, 0.17231455, 0.24999185, -0.5208536, -0.10491828, -0.233575, 0.52950364, 0.0038063182, -0.1380038, 0.022935199, 0.19369157, 0.14586553, 0.1938704) * go_1(-1.0, 0.0);\n    result += mat4(-0.10245223, 0.34150192, 0.25862157, -0.20165509, 0.5597771, 0.114510864, -0.122526556, -0.04010975, 0.1704679, -0.23335956, -0.16771887, -0.03783455, -0.056995615, 0.24153493, -0.08082429, -0.24210933) * go_1(-1.0, 1.0);\n    result += mat4(-0.103466526, 0.15278348, -0.30526164, -0.080755696, 0.103505425, 0.15862796, 0.14696524, -0.008358076, -0.09180311, -0.12505089, 0.28052542, -0.13551563, 0.07528779, -0.09636086, -0.10369617, 0.23656134) * go_1(0.0, -1.0);\n    result += mat4(-0.25752836, 0.099439755, -0.30716348, 0.035077725, 0.023509016, 0.23106368, 0.05277125, 0.34910464, 0.088015385, 0.26995596, 0.1390645, -0.40671825, 0.18096298, -0.100688554, 0.5492049, 0.2482101) * go_1(0.0, 0.0);\n    result += mat4(0.41411775, -0.107200556, -0.13813478, 0.13768874, 0.27137747, 0.06313619, -0.08522967, 0.03218302, -0.03166121, -0.3415683, -0.52242, -0.1741813, -0.36956537, 0.179129, -0.09742935, -0.11696616) * go_1(0.0, 1.0);\n    result += mat4(-0.07975504, 0.17964838, 0.37122533, 0.16064765, 0.14309953, 0.29473078, 0.0926391, -0.22333665, 0.34612748, -0.3387473, 0.0077308523, -0.07239449, 0.18522519, -0.21297298, 0.11493978, 0.16117814) * go_1(1.0, -1.0);\n    result += mat4(-0.17402779, 0.10023144, 0.11712206, 0.031971734, 0.18713303, 0.08736295, 0.013007052, -0.06943139, -0.20102951, -0.010721135, -0.2562522, 0.34877458, -0.13732676, -0.40258047, 0.25824392, 0.15720639) * go_1(1.0, 0.0);\n    result += mat4(0.044494305, 0.3296108, 0.0017603852, 0.09362289, 0.38839245, 0.40015858, -0.13395199, -0.044521853, -0.56266373, 0.251378, 0.5005789, -0.13106057, -0.18491416, -0.046887, 0.067797676, -0.14694957) * go_1(1.0, 1.0);\n    result += vec4(0.013687534, -0.08185164, -0.04755438, 0.290178);\n    return result;\n}\n//!DESC Anime4K-v4.0-Restore-CNN-(M)-Conv-3x1x1x56\n//!HOOK MAIN\n//!BIND MAIN\n//!BIND conv2d_tf\n//!BIND conv2d_1_tf\n//!BIND conv2d_2_tf\n//!BIND conv2d_3_tf\n//!BIND conv2d_4_tf\n//!BIND conv2d_5_tf\n//!BIND conv2d_6_tf\n//!SAVE MAIN\n//!WIDTH conv2d_tf.w\n//!HEIGHT conv2d_tf.h\n#define g_0 (max((conv2d_tf_tex(conv2d_tf_pos)), 0.0))\n#define g_1 (max(-(conv2d_tf_tex(conv2d_tf_pos)), 0.0))\n#define g_2 (max((conv2d_1_tf_tex(conv2d_1_tf_pos)), 0.0))\n#define g_3 (max(-(conv2d_1_tf_tex(conv2d_1_tf_pos)), 0.0))\n#define g_4 (max((conv2d_2_tf_tex(conv2d_2_tf_pos)), 0.0))\n#define g_5 (max(-(conv2d_2_tf_tex(conv2d_2_tf_pos)), 0.0))\n#define g_6 (max((conv2d_3_tf_tex(conv2d_3_tf_pos)), 0.0))\n#define g_7 (max(-(conv2d_3_tf_tex(conv2d_3_tf_pos)), 0.0))\n#define g_8 (max((conv2d_4_tf_tex(conv2d_4_tf_pos)), 0.0))\n#define g_9 (max(-(conv2d_4_tf_tex(conv2d_4_tf_pos)), 0.0))\n#define g_10 (max((conv2d_5_tf_tex(conv2d_5_tf_pos)), 0.0))\n#define g_11 (max(-(conv2d_5_tf_tex(conv2d_5_tf_pos)), 0.0))\n#define g_12 (max((conv2d_6_tf_tex(conv2d_6_tf_pos)), 0.0))\n#define g_13 (max(-(conv2d_6_tf_tex(conv2d_6_tf_pos)), 0.0))\nvec4 hook() {\n    vec4 result = mat4(-0.08837163, -0.065234736, -0.034704313, 0.0, 0.021405501, 0.013663729, 0.019249594, 0.0, 0.05328863, 0.03580334, 0.046457592, 0.0, -0.12216048, 0.022547891, 0.016400825, 0.0) * g_0;\n    result += mat4(0.061996464, 0.05631466, 0.06808407, 0.0, -0.005013109, -0.0044589997, -0.032367796, 0.0, 0.016481603, 0.13721058, 0.14924648, 0.0, 0.020035887, -0.07250003, -0.08034037, 0.0) * g_1;\n    result += mat4(0.24078514, 0.081361525, 0.053420708, 0.0, -0.009353794, -0.051077116, -0.058007747, 0.0, -0.14071098, 0.01035966, 0.005308949, 0.0, -0.1489842, -0.06711817, -0.05552926, 0.0) * g_2;\n    result += mat4(-0.13002375, 0.012733757, 0.017821986, 0.0, 0.17767483, 0.20204604, 0.1751779, 0.0, 0.12804912, 0.07381453, 0.05655911, 0.0, 0.17044514, 0.07301451, 0.06523978, 0.0) * g_3;\n    result += mat4(-0.1170986, -0.05130371, -0.027939914, 0.0, -0.16645707, -0.121526904, -0.09471366, 0.0, -0.04143118, 0.026693767, 0.034615446, 0.0, -0.084318705, -0.064990036, -0.054324172, 0.0) * g_4;\n    result += mat4(0.12094524, 0.09518409, 0.07387219, 0.0, 0.062216382, 0.053228356, 0.031372335, 0.0, 0.072797105, 0.026258165, 0.009804673, 0.0, 0.120719045, 0.073281154, 0.056623302, 0.0) * g_5;\n    result += mat4(-0.11141495, -0.11566289, -0.10398725, 0.0, -0.0651895, -0.06820691, -0.054204144, 0.0, -0.032746475, -0.008849683, -0.007610222, 0.0, -0.024655705, -0.048778858, -0.041144755, 0.0) * g_6;\n    result += mat4(0.058090195, 0.07538767, 0.059722915, 0.0, 0.044788487, 0.04212742, 0.027502589, 0.0, 0.04892866, 0.015416752, 0.008312418, 0.0, -0.011864114, -0.0074752793, -0.0060824654, 0.0) * g_7;\n    result += mat4(0.043446552, 0.061971307, 0.05758086, 0.0, -0.06379154, -0.053758245, -0.047204215, 0.0, 0.016307736, 0.03423424, 0.030179083, 0.0, 0.041445345, 0.03843772, 0.033059113, 0.0) * g_8;\n    result += mat4(-0.003803544, 0.0008906116, -0.00059585314, 0.0, 0.102071285, 0.11485224, 0.10007254, 0.0, -0.074306004, -0.08803551, -0.07972321, 0.0, -0.030704215, -0.021514274, -0.009049376, 0.0) * g_9;\n    result += mat4(0.0066058086, 0.0011408008, 0.0016199006, 0.0, -0.03916473, -0.042929266, -0.04018418, 0.0, -0.03153446, -0.039413508, -0.034767237, 0.0, 0.113516055, 0.12577052, 0.113335624, 0.0) * g_10;\n    result += mat4(0.02655948, 0.041905303, 0.03861737, 0.0, 0.048471425, 0.049788587, 0.050447535, 0.0, 0.12092813, 0.13564217, 0.12613249, 0.0, -0.0023508538, 0.0012828974, 0.0028730957, 0.0) * g_11;\n    result += mat4(0.0084758485, 0.008800083, 0.008206044, 0.0, -0.056123603, -0.06610845, -0.060320783, 0.0, -0.081793964, -0.101638645, -0.096699014, 0.0, -0.04402356, -0.04177539, -0.03829645, 0.0) * g_12;\n    result += mat4(0.10676299, 0.118409514, 0.10618478, 0.0, -0.05880252, -0.06488367, -0.06432695, 0.0, 0.019221924, 0.017602798, 0.017413978, 0.0, -0.07512528, -0.080483615, -0.066218294, 0.0) * g_13;\n    result += vec4(-0.010478934, -0.008364784, -0.010246552, 0.0);\n    return result + MAIN_tex(MAIN_pos);\n}\n';
const upscaleCnnX2S = '// MIT License\n\n// Copyright (c) 2019-2021 bloc97\n// All rights reserved.\n\n// Permission is hereby granted, free of charge, to any person obtaining a copy\n// of this software and associated documentation files (the "Software"), to deal\n// in the Software without restriction, including without limitation the rights\n// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell\n// copies of the Software, and to permit persons to whom the Software is\n// furnished to do so, subject to the following conditions:\n\n// The above copyright notice and this permission notice shall be included in all\n// copies or substantial portions of the Software.\n\n// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\n// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\n// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\n// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\n// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\n// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\n// SOFTWARE.\n\n//!DESC Anime4K-v3.2-Upscale-CNN-x2-(S)-Conv-4x3x3x3\n//!HOOK MAIN\n//!BIND MAIN\n//!SAVE conv2d_tf\n//!WIDTH MAIN.w\n//!HEIGHT MAIN.h\n//!COMPONENTS 4\n//!WHEN OUTPUT.w MAIN.w / 1.200 > OUTPUT.h MAIN.h / 1.200 > *\n#define go_0(x_off, y_off) (MAIN_texOff(vec2(x_off, y_off)))\nvec4 hook() {\n    vec4 result = mat4(-0.0057322932, 0.12928207, -0.056848746, 0.18680117, -0.0306273, 0.25602463, 0.053723164, 0.20419341, 0.0018709862, 0.022848232, -0.04105527, 0.10169034, 0.0, 0.0, 0.0, 0.0) * go_0(-1.0, -1.0);\n    result += mat4(0.009471417, -0.12957802, 0.096014425, 0.21836184, 0.00021601951, -0.22997683, 0.23666254, 0.41192335, 0.021762101, 0.0047863554, 0.008233427, 0.108514786, 0.0, 0.0, 0.0, 0.0) * go_0(-1.0, 0.0);\n    result += mat4(-0.01156376, -0.18988979, 0.04614705, -0.044767227, 0.01050636, -0.26426336, 0.23741047, 0.0027636609, -0.027718676, -0.14202335, -0.016650287, -0.06637125, 0.0, 0.0, 0.0, 0.0) * go_0(-1.0, 1.0);\n    result += mat4(0.057809234, -0.11033858, 0.056533534, -0.06292466, 0.13880666, -0.18710336, 0.2441031, -0.25326246, 0.0032683122, -0.026437074, 0.0023248852, 7.640766e-05, 0.0, 0.0, 0.0, 0.0) * go_0(0.0, -1.0);\n    result += mat4(-0.49110603, 0.4429004, -0.44015464, -0.41174838, -0.87738293, 0.7808468, -1.0929365, -0.59699076, -0.18409836, 0.185138, -0.11773224, -0.17097276, 0.0, 0.0, 0.0, 0.0) * go_0(0.0, 0.0);\n    result += mat4(0.10580959, -0.055947904, -0.03431237, -0.080236495, 0.14862584, -0.15393938, -0.18872876, -0.3170681, 0.03559387, -0.003990826, 0.021298569, 0.012844483, 0.0, 0.0, 0.0, 0.0) * go_0(0.0, 1.0);\n    result += mat4(-0.040715586, -0.25781113, 0.08896714, -0.1225879, -0.15790503, -0.54010904, 0.29588607, 0.10401059, 0.003413123, -0.108357325, 0.0112870345, -0.11888622, 0.0, 0.0, 0.0, 0.0) * go_0(1.0, -1.0);\n    result += mat4(0.0049315444, 0.02376202, -0.08224771, 0.121118225, -0.041512914, -0.027994309, -0.585988, -0.069672115, -0.017247835, 0.0056576864, 0.04319012, 0.055003505, 0.0, 0.0, 0.0, 0.0) * go_0(1.0, 0.0);\n    result += mat4(0.37521392, 0.15916082, 0.059708964, 0.19046007, 0.8120325, 0.38343868, 0.3436578, 0.5287958, 0.16570656, 0.06957687, 0.014022592, 0.074799836, 0.0, 0.0, 0.0, 0.0) * go_0(1.0, 1.0);\n    result += vec4(-0.01050964, -0.00939481, 0.17684458, 0.027366742);\n    return result;\n}\n//!DESC Anime4K-v3.2-Upscale-CNN-x2-(S)-Conv-4x3x3x8\n//!HOOK MAIN\n//!BIND conv2d_tf\n//!SAVE conv2d_1_tf\n//!WIDTH conv2d_tf.w\n//!HEIGHT conv2d_tf.h\n//!COMPONENTS 4\n//!WHEN OUTPUT.w MAIN.w / 1.200 > OUTPUT.h MAIN.h / 1.200 > *\n#define go_0(x_off, y_off) (max((conv2d_tf_texOff(vec2(x_off, y_off))), 0.0))\n#define go_1(x_off, y_off) (max(-(conv2d_tf_texOff(vec2(x_off, y_off))), 0.0))\nvec4 hook() {\n    vec4 result = mat4(-0.011029496, 0.05866063, -0.09460646, -0.017664742, -0.022488879, 0.18384217, -0.00397663, -0.064733066, 0.08466802, 0.10667488, 8.0212536e-05, 0.0908869, 0.13580276, 0.00097438256, 0.12176522, -0.08218466) * go_0(-1.0, -1.0);\n    result += mat4(0.16062798, -0.10190268, 0.03280682, 0.05621916, -0.009684231, -0.08464307, 0.17058301, -0.096469186, 0.1967505, -0.1450099, 0.093607284, -0.28240147, -0.21377413, 0.10079291, -0.1741522, 0.17330575) * go_0(-1.0, 0.0);\n    result += mat4(-0.060160473, 0.06316997, 0.0046929033, -0.049405966, 0.13851729, 0.06830702, -0.0586872, -0.040827133, 0.007052838, -0.03576886, -0.111261636, 0.039155316, -0.07380389, -0.09369825, 0.04471156, 0.09678487) * go_0(-1.0, 1.0);\n    result += mat4(-0.36683616, -0.035950605, -0.24414362, -0.009159744, 0.19335322, -0.099253505, 0.075083904, -0.00076695543, 0.65291303, -0.25599423, 0.19827642, 0.065899536, -0.07423247, -0.068967685, 0.0050554527, -0.060272824) * go_0(0.0, -1.0);\n    result += mat4(-0.020688485, -0.83178276, 0.11104878, 0.26454413, 0.13655476, 0.37675047, -0.22219229, -0.01751935, 0.44552696, 0.92510307, 0.16063261, -0.62011045, 0.19366647, -0.06996067, -0.2504841, 0.00803723) * go_0(0.0, 0.0);\n    result += mat4(0.0051537007, -0.057168536, -0.16110587, 0.25232598, -0.04447099, 0.11997351, 0.14808103, -0.34443566, -0.26212573, -0.21970181, 0.2724405, 0.21050811, -0.07949061, -0.064808235, -0.21208277, -0.0042361654) * go_0(0.0, 1.0);\n    result += mat4(-0.0888952, -0.20169449, 0.19144905, -0.016882861, -0.013283103, 0.07552998, -0.24686803, 0.012453213, -0.065454446, -0.016123284, -0.47316182, 0.070926026, 0.09219782, 0.13118166, 0.074736096, 0.0077910526) * go_0(1.0, -1.0);\n    result += mat4(0.5832154, 0.1138069, -0.039765622, 0.3182784, -0.25497997, 0.0013993139, 0.39285088, -0.48511526, -0.39891505, -0.19094779, -0.082146175, -0.20826934, 0.020590555, -0.0012490178, -0.4398621, 0.14377014) * go_0(1.0, 0.0);\n    result += mat4(0.21917395, 3.4314657e-05, 0.25734863, -0.3433305, 0.015720673, 0.2676127, -0.06807297, 0.15040149, -0.23638041, -0.0050233034, -0.13666134, 0.4542111, -0.033572577, -0.08450588, -0.23341487, 0.053490847) * go_0(1.0, 1.0);\n    result += mat4(-0.17482175, 0.057647135, 0.33135444, 0.0850751, -0.1718849, -0.0854123, 0.036795795, -0.13874969, -0.10903869, -0.19007301, -0.06064334, -0.03786032, -0.036696054, 0.07844446, 0.012523185, -0.01562906) * go_1(-1.0, -1.0);\n    result += mat4(-0.04411997, -0.10331819, 0.10050193, 0.12406485, 0.07431592, 0.30109692, -0.17511666, -0.13263564, -0.10192587, 0.07821255, -0.22415096, 0.25552443, 0.17881326, -0.13914281, 0.109979235, -0.0016463579) * go_1(-1.0, 0.0);\n    result += mat4(-0.01911644, -0.15412527, 0.028903123, 0.20831817, 0.00375175, 0.08110953, 0.074919395, -0.17581624, -0.015677985, 0.06504228, 0.08817818, -0.12518327, -0.09537373, 0.028905088, -0.051288474, 0.054334078) * go_1(-1.0, 1.0);\n    result += mat4(0.2852779, -0.28924024, 0.36805123, 0.21079305, -0.28336474, 0.1679663, -0.08641141, -0.10699407, -0.16090055, 0.1287612, -0.15910125, 0.05734755, 0.15883245, 0.0053026294, 0.080674745, 0.0505137) * go_1(0.0, -1.0);\n    result += mat4(0.17639062, 0.3790122, -0.19588692, -0.020314282, 0.26197383, 0.09014768, 0.19696823, -0.41025418, -0.08308115, -0.33279485, -0.22528782, 0.06172439, -0.1365661, -0.13094363, -0.005086559, 0.089024484) * go_1(0.0, 0.0);\n    result += mat4(0.05262993, 0.0006296959, 0.1657725, -0.32591924, 0.12126701, 0.061543245, -0.10526848, 0.041583937, 0.094976954, 0.09416157, -0.22019257, -0.058390073, -0.2073888, 0.057273377, 0.19558284, 0.004208022) * go_1(0.0, 1.0);\n    result += mat4(0.30005738, 0.18478931, -0.23342943, 0.22455733, -0.016488122, 0.099634305, 0.31620836, -0.15731157, 0.09595808, 0.0013774688, 0.48273298, -0.07027936, -0.18764344, -0.26194447, -0.11794225, -0.012173601) * go_1(1.0, -1.0);\n    result += mat4(0.117986746, -0.13846518, -0.019614812, -0.3011192, 0.5501164, 0.3408611, -0.40090847, 0.15706886, 0.13050972, 0.051776595, 0.20792943, 0.23389706, -0.22965533, -0.053367328, 0.3911586, -0.032988597) * go_1(1.0, 0.0);\n    result += mat4(0.054753624, -0.008485731, -0.2451672, 0.17528129, 0.13657846, 0.010480436, 0.07651423, -0.43316832, 0.12736236, 0.13804524, 0.12529011, -0.30946237, -0.14423579, 0.08403089, 0.24335162, 0.057288036) * go_1(1.0, 1.0);\n    result += vec4(0.012077211, 0.013045883, 0.0380778, -0.02908858);\n    return result;\n}\n//!DESC Anime4K-v3.2-Upscale-CNN-x2-(S)-Conv-4x3x3x8\n//!HOOK MAIN\n//!BIND conv2d_1_tf\n//!SAVE conv2d_2_tf\n//!WIDTH conv2d_1_tf.w\n//!HEIGHT conv2d_1_tf.h\n//!COMPONENTS 4\n//!WHEN OUTPUT.w MAIN.w / 1.200 > OUTPUT.h MAIN.h / 1.200 > *\n#define go_0(x_off, y_off) (max((conv2d_1_tf_texOff(vec2(x_off, y_off))), 0.0))\n#define go_1(x_off, y_off) (max(-(conv2d_1_tf_texOff(vec2(x_off, y_off))), 0.0))\nvec4 hook() {\n    vec4 result = mat4(-0.036115196, -0.06971895, -0.07508942, 0.016036168, 0.12120111, 0.24536026, 0.044755507, -0.20663576, 0.029635755, -0.15427187, 0.027148994, -0.20795093, 0.10170582, 0.077919215, 0.66063017, -0.4632968) * go_0(-1.0, -1.0);\n    result += mat4(-0.0052889925, -0.019060908, -0.08660142, -0.022095207, -0.08097976, -0.015142803, -0.18552722, -0.078493506, -0.16293915, -0.20099808, -0.08370822, 0.3701389, 0.09094984, 0.2487225, 0.24338846, 0.044003833) * go_0(-1.0, 0.0);\n    result += mat4(-0.061406493, -0.017232792, -0.10917424, 0.11203319, 0.040699825, -0.019294346, 0.084953666, -0.018133596, 0.07209552, 0.016069936, 0.17805555, -0.089537814, 0.15809004, 0.1027023, 0.15044671, -0.15530108) * go_0(-1.0, 1.0);\n    result += mat4(0.0948676, -0.040305693, -0.005591629, -0.048048403, -0.07547777, 0.056606572, 0.021390207, 0.32600567, -0.20805131, -0.099587254, 0.029613169, 0.0092129605, -0.29429698, -0.09898621, 0.44470885, -0.89487344) * go_0(0.0, -1.0);\n    result += mat4(-0.122259885, 0.11445877, 0.06666907, 0.1869428, -0.1553992, -0.1658741, 0.2988138, -0.57746625, -0.34609964, 0.11169158, -0.41877756, 0.38075635, 0.21293911, 0.09640372, -0.12754214, -0.08026104) * go_0(0.0, 0.0);\n    result += mat4(0.15128808, 0.050087795, 0.09219755, -0.18080945, 0.0044571217, -0.046019405, -0.1289922, 0.20305426, 0.19601224, 0.04667917, 0.17465587, 0.027672665, 0.18441725, 0.06845396, 0.11288585, -0.23283863) * go_0(0.0, 1.0);\n    result += mat4(-0.072962, -0.06639447, 0.049347494, -0.1386401, 0.10396071, 0.08187777, -0.04280746, 0.07390891, 0.06628344, 0.037797406, 0.021885803, -0.013147403, 0.22376558, 0.36243078, 0.12874891, -0.0023783944) * go_0(1.0, -1.0);\n    result += mat4(0.074945286, 0.16045591, -0.11798349, 0.12910712, 0.054760084, -0.095626175, -0.047832094, 0.03493912, 0.11817307, 0.037452437, -0.14301221, -0.027356789, -0.052390423, 0.11373512, 0.07686775, 0.010008694) * go_0(1.0, 0.0);\n    result += mat4(-0.023999173, -0.091900624, 0.02388157, 0.03173873, 0.0065633506, -0.033716757, -0.1198324, 0.12057766, 0.026465805, -0.07517131, -0.07760598, 0.060463097, 0.07345541, 0.046037503, 0.21101558, -0.26785463) * go_0(1.0, 1.0);\n    result += mat4(0.15544604, -0.03902825, 0.04630384, -0.25173616, -0.0691359, 0.07476507, 0.009071253, 0.089964196, -0.26539803, -0.3958477, -0.22155671, 0.20735882, -0.105860494, -0.003996804, -0.044815883, 0.39544627) * go_1(-1.0, -1.0);\n    result += mat4(0.6169709, 0.23717614, -0.37884676, -0.7484867, 0.020169826, -0.30718836, 1.0965588, -0.20711036, -0.39149985, -0.06843563, -0.06522909, 0.103805855, 0.03265825, -0.15137726, 0.12837899, -0.01294922) * go_1(-1.0, 0.0);\n    result += mat4(-0.23638196, -0.4560866, -0.11948684, -0.1464144, 0.10690008, 0.007835961, 0.11864342, -0.13101323, -0.16509797, 0.075027354, 0.08122998, 0.13451207, 0.0011890623, 0.052157886, 0.08372405, -0.07085038) * go_1(-1.0, 1.0);\n    result += mat4(-0.21997726, -0.16488647, -0.0291317, 0.17997476, 0.1493211, 0.027494298, 0.0034613227, -0.3207727, 0.18699001, 0.14728633, -0.042895135, -0.07612043, 0.125076, -0.14714554, -0.03480009, -0.22753975) * go_1(0.0, -1.0);\n    result += mat4(-0.5342686, -0.7426105, -0.38294584, 0.42549992, 0.46053204, 0.7867879, 0.106234804, -0.041163098, 0.5198579, -0.5219404, 0.14809476, -0.41802374, 0.06810794, -0.15122683, -0.047409, 0.13178343) * go_1(0.0, 0.0);\n    result += mat4(-0.50428164, 0.18220626, 0.35510704, -0.081787474, 0.03155813, 0.019284263, 0.0032388573, -0.20513348, -0.05385551, 0.17803182, -0.26206362, 0.2870375, 0.008557827, 0.08401449, -0.027598893, -0.010791235) * go_1(0.0, 1.0);\n    result += mat4(0.16657415, 0.067647465, 0.093076974, -0.14438486, -0.10017002, 0.0022367141, 0.03250936, -0.052794546, -0.009178676, -0.019673595, -0.0016697067, -0.15424626, -0.112123474, -0.11079971, 0.011987111, -0.11747758) * go_1(1.0, -1.0);\n    result += mat4(-0.023021797, -0.058703423, -0.037978355, -0.062433913, -0.13130441, 0.048656322, 0.056839373, 0.109036915, -0.07823158, 0.14785293, 0.058555078, -0.11679035, -0.14002073, 0.07395252, 0.098268874, -0.06710464) * go_1(1.0, 0.0);\n    result += mat4(0.14906375, 0.030001195, -0.10338215, 0.0662968, -0.161953, -0.13682815, 0.09563142, 0.009514228, -0.009491218, 0.06737101, -0.1393389, 0.15231515, -0.073147796, 0.00767062, 0.028675212, 0.014213088) * go_1(1.0, 1.0);\n    result += vec4(0.018736731, -0.0026039074, 0.050130025, -0.055364225);\n    return result;\n}\n//!DESC Anime4K-v3.2-Upscale-CNN-x2-(S)-Conv-4x3x3x8\n//!HOOK MAIN\n//!BIND conv2d_2_tf\n//!SAVE conv2d_last_tf\n//!WIDTH conv2d_2_tf.w\n//!HEIGHT conv2d_2_tf.h\n//!COMPONENTS 4\n//!WHEN OUTPUT.w MAIN.w / 1.200 > OUTPUT.h MAIN.h / 1.200 > *\n#define go_0(x_off, y_off) (max((conv2d_2_tf_texOff(vec2(x_off, y_off))), 0.0))\n#define go_1(x_off, y_off) (max(-(conv2d_2_tf_texOff(vec2(x_off, y_off))), 0.0))\nvec4 hook() {\n    vec4 result = mat4(0.019100675, -0.014241565, 0.004667036, -0.03865062, 0.106731094, 0.026099661, 0.014594411, -0.011881356, 0.0040967264, -0.004626336, 0.006469508, 0.010875305, -0.033909045, -0.085905954, 0.07861378, 0.019452631) * go_0(-1.0, -1.0);\n    result += mat4(0.20777655, -0.060354974, 0.0023840065, -0.064121604, -0.17397617, 0.019293457, -0.09707183, 0.080641985, 0.01025124, -0.017382381, 0.008661793, -0.010995665, 0.21943407, -0.115574986, 0.14471593, -0.068836235) * go_0(-1.0, 0.0);\n    result += mat4(0.057942886, -0.06311754, 0.2253396, -0.04159292, -0.020731755, 0.007877151, 0.041525815, 0.025278691, 0.03041967, -0.025137542, 0.024364179, -0.024543528, 0.029438615, -0.015506873, 0.081686, -0.07812221) * go_0(-1.0, 1.0);\n    result += mat4(0.054237515, 0.0676094, -0.0047708177, 0.0043467237, -0.10032304, -0.020498628, 0.04240586, 0.07272254, 0.0784221, 0.017945962, -0.022310399, -0.013134622, 0.015638694, -0.10001543, 0.1043031, 0.05898838) * go_0(0.0, -1.0);\n    result += mat4(-0.021652509, 0.35796642, 0.059497777, 0.23948468, 0.15454951, -0.10017235, -0.19072174, -0.44812536, -0.03974552, 0.04529369, 0.22207436, 0.026222564, -0.09705454, 0.5623026, -0.3354105, -0.017278556) * go_0(0.0, 0.0);\n    result += mat4(-0.053682446, -0.03411237, -0.09399936, 0.15128824, -0.07463, -0.042020727, 0.0031783928, 0.13481957, -0.07731454, 0.044114403, -0.23085599, 0.060444202, -0.15015422, 0.0018040676, -0.18684982, 0.2812511) * go_0(0.0, 1.0);\n    result += mat4(0.0029329916, 0.001596018, 0.0007512241, 0.016544111, -0.04876942, -0.05272409, 0.037884697, 0.049948208, 0.015518177, 0.11368592, -0.03815777, -0.013149978, -0.027638039, 0.107719295, -0.04115787, 0.02745414) * go_0(1.0, -1.0);\n    result += mat4(0.016691081, 0.010204119, 0.04078854, 0.01613337, 0.03325829, 0.0114824055, -0.017286912, -0.07284126, -0.110984206, -0.21041764, 0.0089543555, 0.18986733, 0.01537506, -0.2059135, 0.029074017, 0.013117443) * go_0(1.0, 0.0);\n    result += mat4(0.013965926, 0.029871881, 0.0034499036, -0.011343668, 0.022120327, -0.0068748263, 0.009324342, -0.039081004, 0.08032371, 0.050809264, 0.035050742, -0.2032847, 0.06305391, -0.021958945, 0.038569167, -0.22465245) * go_0(1.0, 1.0);\n    result += mat4(0.046307724, -0.012419472, 0.007673863, -0.042344846, 0.011042414, 0.016994251, -0.018166406, -0.016955731, -0.13240299, 0.01768431, -0.027607648, 0.0699927, -0.02840628, 0.004414203, 0.0049618417, 0.011084679) * go_1(-1.0, -1.0);\n    result += mat4(-0.119954154, -0.007455482, -0.031108133, -0.009946449, 0.0077065965, 0.01660345, 0.032943666, 0.016376585, 0.10273124, 0.1556573, -0.24643841, 0.107307844, -0.068235755, 0.0561896, -0.0104672015, 0.042693343) * go_1(-1.0, 0.0);\n    result += mat4(-0.01634601, 0.04195375, -0.10401894, 0.047641944, -0.034602515, -0.0034419263, -0.010457858, 0.015194475, -0.03962551, -0.030031368, 0.16036317, 0.019283568, -0.05877721, 0.016504882, -0.15523468, 0.018161612) * go_1(-1.0, 1.0);\n    result += mat4(-0.08083991, 0.0024665035, -0.049373373, 0.030371357, 0.0113322195, -0.014676956, 0.011646689, -0.01142667, 0.124930486, 0.06625774, -0.045840867, -0.009693036, -0.012649251, -0.07388084, 0.008790075, 0.0013844534) * go_1(0.0, -1.0);\n    result += mat4(-0.33941835, -0.2763476, -0.118311435, -0.063535266, 0.20936015, 0.13731301, 0.13443594, 0.07464433, 0.059650812, -0.36973104, 0.16444235, -0.37082872, 0.06432777, -0.18283032, -0.044489607, -0.13895285) * go_1(0.0, 0.0);\n    result += mat4(0.13533665, 0.08268915, -0.03675727, -0.14348659, 0.0186255, -0.05051692, 0.056702953, 0.0061717895, 0.047663026, -0.088188455, 0.23254345, -0.014015464, 0.08400204, -0.0073777726, 0.2202068, -0.12366078) * go_1(0.0, 1.0);\n    result += mat4(0.04361004, 0.046543695, 0.0064863074, -0.03358146, -0.022602187, 0.018138997, -0.011071864, 0.010244091, -0.019814799, -0.17250171, 0.040823266, -0.040131986, 0.010125854, 0.020660749, 0.0020435036, -0.010819304) * go_1(1.0, -1.0);\n    result += mat4(-0.004810193, -0.11286074, 0.051985834, 0.04788631, -0.023950428, 0.036145125, -0.038203828, 0.052401308, 0.022986965, 0.26420745, -0.06076917, -0.09252999, 0.03164547, 0.15652153, -0.037934, -0.0035418556) * go_1(1.0, 0.0);\n    result += mat4(0.03358366, -0.005219482, 0.007060882, -0.06569114, -0.02941682, 0.00966056, -0.0153679885, 0.019905418, -0.107232265, -0.03405676, -0.044340115, 0.26892832, -0.04723829, -0.02589829, 0.004563232, 0.19318114) * go_1(1.0, 1.0);\n    result += vec4(-0.00346731, -0.0046263863, -0.004627155, -0.0057769152);\n    return result;\n}\n//!DESC Anime4K-v3.2-Upscale-CNN-x2-(S)-Depth-to-Space\n//!HOOK MAIN\n//!BIND MAIN\n//!BIND conv2d_last_tf\n//!SAVE MAIN\n//!WIDTH conv2d_last_tf.w 2 *\n//!HEIGHT conv2d_last_tf.h 2 *\n//!WHEN OUTPUT.w MAIN.w / 1.200 > OUTPUT.h MAIN.h / 1.200 > *\nvec4 hook() {\n    vec2 f0 = fract(conv2d_last_tf_pos * conv2d_last_tf_size);\n    ivec2 i0 = ivec2(f0 * vec2(2.0));\n    float c0 = conv2d_last_tf_tex((vec2(0.5) - f0) * conv2d_last_tf_pt + conv2d_last_tf_pos)[i0.y * 2 + i0.x];\n    float c1 = c0;\n    float c2 = c1;\n    float c3 = c2;\n    return vec4(c0, c1, c2, c3) + MAIN_tex(MAIN_pos);\n}\n';
const upscaleCnnX2M = '// MIT License\n\n// Copyright (c) 2019-2021 bloc97\n// All rights reserved.\n\n// Permission is hereby granted, free of charge, to any person obtaining a copy\n// of this software and associated documentation files (the "Software"), to deal\n// in the Software without restriction, including without limitation the rights\n// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell\n// copies of the Software, and to permit persons to whom the Software is\n// furnished to do so, subject to the following conditions:\n\n// The above copyright notice and this permission notice shall be included in all\n// copies or substantial portions of the Software.\n\n// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\n// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\n// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\n// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\n// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\n// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\n// SOFTWARE.\n\n//!DESC Anime4K-v3.2-Upscale-CNN-x2-(M)-Conv-4x3x3x3\n//!HOOK MAIN\n//!BIND MAIN\n//!SAVE conv2d_tf\n//!WIDTH MAIN.w\n//!HEIGHT MAIN.h\n//!COMPONENTS 4\n//!WHEN OUTPUT.w MAIN.w / 1.200 > OUTPUT.h MAIN.h / 1.200 > *\n#define go_0(x_off, y_off) (MAIN_texOff(vec2(x_off, y_off)))\nvec4 hook() {\n    vec4 result = mat4(-0.010995803, 0.077095956, -0.043992598, 0.06048717, 0.1164834, -0.11689607, 0.072985925, -0.078805886, 0.01182932, 0.054985743, -0.09018186, 0.044907484, 0.0, 0.0, 0.0, 0.0) * go_0(-1.0, -1.0);\n    result += mat4(0.1813623, -0.14752422, 0.025720436, -0.17639883, 0.15697388, 0.10445984, -0.1843076, 0.5264643, 0.047516696, -0.097305484, 0.09740847, -0.29619336, 0.0, 0.0, 0.0, 0.0) * go_0(-1.0, 0.0);\n    result += mat4(-0.014534763, 0.09486465, 0.046173926, 0.039391946, 0.09609376, -0.060574662, 0.042200956, -0.3269777, 0.051006425, 0.059818447, 0.04366627, 0.17699827, 0.0, 0.0, 0.0, 0.0) * go_0(-1.0, 1.0);\n    result += mat4(0.04268535, -0.08152529, 0.10577459, -0.036936995, -0.051562306, 0.054872766, 0.09194519, 0.0025066638, -0.01073954, 0.00064474024, 0.10038221, 0.02131141, 0.0, 0.0, 0.0, 0.0) * go_0(0.0, -1.0);\n    result += mat4(-0.51751363, -0.40028602, 0.3469574, 0.5933738, -0.91357684, -0.67692596, 0.57815677, 0.39809322, -0.16341521, -0.27169713, 0.12232366, 0.4318641, 0.0, 0.0, 0.0, 0.0) * go_0(0.0, 0.0);\n    result += mat4(0.12601124, -0.06263236, -0.45907676, -0.41514075, 0.3330334, -0.1929565, -0.6333532, -0.6552794, -0.045809917, 0.046351526, -0.26173338, -0.30252662, 0.0, 0.0, 0.0, 0.0) * go_0(0.0, 1.0);\n    result += mat4(0.0030332592, 0.012103107, 0.010537323, -0.02038607, 0.095558085, 0.097704545, 0.083433494, 0.026790185, 0.01943357, -0.061712462, -0.00015703632, -0.032268334, 0.0, 0.0, 0.0, 0.0) * go_0(1.0, -1.0);\n    result += mat4(0.016870102, 0.5215812, -0.11525501, 0.027527615, -0.09045733, 0.61310345, -0.1575268, 0.1905386, 0.020172214, 0.3503187, -0.08209157, -0.051328037, 0.0, 0.0, 0.0, 0.0) * go_0(1.0, 0.0);\n    result += mat4(0.005494087, -0.010656317, 0.07682753, -0.08116042, -0.03934524, 0.16589017, 0.101483546, -0.066603065, 0.03494657, -0.07885597, 0.074227594, 0.0016264897, 0.0, 0.0, 0.0, 0.0) * go_0(1.0, 1.0);\n    result += vec4(0.014463938, -0.0031906287, 0.007015422, -0.003888468);\n    return result;\n}\n//!DESC Anime4K-v3.2-Upscale-CNN-x2-(M)-Conv-4x3x3x8\n//!HOOK MAIN\n//!BIND conv2d_tf\n//!SAVE conv2d_1_tf\n//!WIDTH conv2d_tf.w\n//!HEIGHT conv2d_tf.h\n//!COMPONENTS 4\n//!WHEN OUTPUT.w MAIN.w / 1.200 > OUTPUT.h MAIN.h / 1.200 > *\n#define go_0(x_off, y_off) (max((conv2d_tf_texOff(vec2(x_off, y_off))), 0.0))\n#define go_1(x_off, y_off) (max(-(conv2d_tf_texOff(vec2(x_off, y_off))), 0.0))\nvec4 hook() {\n    vec4 result = mat4(-0.08532478, -0.14302494, -0.017921071, -0.0032664281, -0.09841952, 0.024187077, 0.10701477, 0.14110753, -0.05714981, -0.10897174, 0.073803626, 0.103992954, 0.07914382, 0.032193683, -0.18346278, -0.09723936) * go_0(-1.0, -1.0);\n    result += mat4(-0.034482613, -0.10742312, -0.047286414, -0.08641124, -0.33896688, -0.036533825, -0.48337597, 0.034040943, -0.13598205, -0.080917805, 0.08540263, -0.012667689, -0.009171425, -0.120026454, -0.20536867, -0.032149274) * go_0(-1.0, 0.0);\n    result += mat4(0.18687321, 0.066278316, 0.024327392, 0.08816582, -0.08017908, 0.09488853, 0.26018232, -0.101504356, 0.17487666, 0.31057635, 0.14785016, -0.09622089, -0.07537452, -0.13844088, -0.05810814, 0.09907489) * go_0(-1.0, 1.0);\n    result += mat4(-0.04183032, 0.15207712, 0.005002397, 0.32277516, -0.16169126, -0.119836345, -0.04068436, -0.096728764, 0.11943901, 0.1789597, -0.20412198, 0.19009817, 0.36630696, 0.06946421, -0.5254373, -0.11896399) * go_0(0.0, -1.0);\n    result += mat4(-0.31916487, -0.98911583, 1.0728644, -0.39280394, 0.33458877, -0.17325239, -0.645045, -0.28524077, -0.14512783, 0.24996442, -0.09837877, 0.05468934, 0.31559715, -0.020504637, -0.026724018, 0.24507573) * go_0(0.0, 0.0);\n    result += mat4(-0.23759829, -0.08530173, -0.16665787, -0.22463752, 0.109896734, 0.13446991, -0.049552456, -0.02385489, -0.01245375, 0.3833208, 0.05758832, 0.1528937, 0.0501858, -0.19651426, 0.0076587177, -0.03297025) * go_0(0.0, 1.0);\n    result += mat4(0.14554465, -0.01826686, 0.10284085, -0.19152659, -0.017585073, -0.05511482, 0.06362406, 0.023924058, -0.0018977845, -0.103172876, 0.03287086, -0.20085956, 0.36062446, 0.10749464, -0.20984372, 0.018256644) * go_0(1.0, -1.0);\n    result += mat4(-0.005534592, 0.3709197, -0.18287498, 0.1720451, 0.030155553, -0.023265475, 0.0058617783, -0.031765483, 0.037328955, -0.2730994, 0.35090837, -0.3269043, -0.028477207, 0.32756507, -0.15989502, 0.12158258) * go_0(1.0, 0.0);\n    result += mat4(0.10873739, 0.19583772, 0.060394943, 0.09410379, -0.04739245, 0.026561242, 0.022990001, 0.1093272, -0.01071349, -0.022938967, -0.046423864, 0.2385325, -0.0319821, 0.046962265, 0.09081178, -0.11001857) * go_0(1.0, 1.0);\n    result += mat4(0.13012704, 0.112289295, 0.030790284, -0.050499484, 0.11784853, 0.08107028, -0.07556717, -0.15643, 0.015249331, 0.015299608, 0.07748125, 0.054485757, 0.044857923, 0.12161275, -0.048292994, -0.033995003) * go_1(-1.0, -1.0);\n    result += mat4(0.12931514, 0.15114146, 0.070513315, 0.11246343, 0.4142387, 0.213479, -0.5439916, 0.07776645, 0.13109331, 0.2021147, 0.25932786, -0.22157331, 0.02377734, -0.014970623, -0.1943276, 0.18440372) * go_1(-1.0, 0.0);\n    result += mat4(-0.22365458, -0.19829084, -0.06881161, -0.06468993, 0.17202774, 0.0048758537, -0.09235021, 0.18941896, 0.064125344, -0.09067088, 0.09748182, 0.13561936, -0.05876288, -0.0122420965, -0.054380875, -0.17743628) * go_1(-1.0, 1.0);\n    result += mat4(0.18582906, -0.09263032, -0.08210888, -0.20515606, 0.11484005, 0.08557595, 0.0009253741, -0.051202174, -0.18535301, -0.1529345, -0.13092944, 0.03770747, -0.020947013, 0.19187425, -0.15494856, -0.048979875) * go_1(0.0, -1.0);\n    result += mat4(-0.38131633, 0.4278787, 0.19763695, 0.27655518, -0.08711912, 0.07374453, -0.064803004, 0.5983854, 0.2361923, -0.057221692, -0.37138999, -0.24259573, 0.13890724, 0.25706333, -0.54021406, 0.08095518) * go_1(0.0, 0.0);\n    result += mat4(0.0991328, -0.022651536, -0.029148921, -0.009812537, -0.09523686, -0.15704902, 0.052389514, 0.21561539, 0.1950314, -0.08572602, 0.0016523858, 0.14125621, -0.030999828, 0.12009709, 0.0373512, -0.105043754) * go_1(0.0, 1.0);\n    result += mat4(-0.11251988, 0.12106985, 0.011923068, 0.3662747, 0.004800994, 0.017972551, 0.004761366, -0.07934206, -0.13755941, -0.022852683, 0.1502225, 0.009758547, -0.16964264, 0.00984782, 0.07855833, 0.035730787) * go_1(1.0, -1.0);\n    result += mat4(0.01964957, -0.27226487, 0.033933397, -0.117632054, -0.009058229, 0.047830686, -0.01125145, 0.136628, 0.0056388285, 0.3028781, -0.12286517, 0.23498532, -0.009319075, -0.444048, 0.16174883, -0.06367683) * go_1(1.0, 0.0);\n    result += mat4(0.02343933, -0.010915871, -0.058680378, -0.21886891, -0.010750894, -0.06671997, 0.0602906, -0.07903071, 0.066891186, 0.06650588, 0.14362891, -0.101870626, 0.02264628, -0.06940821, -0.077616625, 0.110911585) * go_1(1.0, 1.0);\n    result += vec4(0.032014452, -0.020821465, 0.0826416, -0.002838458);\n    return result;\n}\n//!DESC Anime4K-v3.2-Upscale-CNN-x2-(M)-Conv-4x3x3x8\n//!HOOK MAIN\n//!BIND conv2d_1_tf\n//!SAVE conv2d_2_tf\n//!WIDTH conv2d_1_tf.w\n//!HEIGHT conv2d_1_tf.h\n//!COMPONENTS 4\n//!WHEN OUTPUT.w MAIN.w / 1.200 > OUTPUT.h MAIN.h / 1.200 > *\n#define go_0(x_off, y_off) (max((conv2d_1_tf_texOff(vec2(x_off, y_off))), 0.0))\n#define go_1(x_off, y_off) (max(-(conv2d_1_tf_texOff(vec2(x_off, y_off))), 0.0))\nvec4 hook() {\n    vec4 result = mat4(-0.06963679, -0.07560548, -0.069522075, 0.0038078027, -0.08002613, 0.13671301, 0.084461786, -0.039376218, 0.19136548, -0.123174496, 0.26566333, -0.16583005, -0.18664864, -0.023539122, -0.21928434, -0.026818147) * go_0(-1.0, -1.0);\n    result += mat4(0.16660932, -0.18558703, 0.37230486, 0.118128106, -0.14098641, 0.14659132, -0.22217897, 0.12952235, -0.4139033, -0.04308319, 0.12885277, -0.17986743, -0.23556231, -0.08351981, -0.43240538, 0.019033253) * go_0(-1.0, 0.0);\n    result += mat4(-0.18008037, -0.04448665, 0.011906908, -0.023056917, 0.18136618, -0.04723555, -0.0050158803, -0.14823224, -0.2105281, 0.023047728, -0.14040631, -0.03178526, -0.13477588, -0.01820428, 0.058358394, 0.23792502) * go_0(-1.0, 1.0);\n    result += mat4(0.07363309, -0.061728477, 0.03573137, -0.0050971056, -0.012813505, -0.17236637, 0.1697835, 0.055788577, -0.22263195, 0.10324512, 0.58971673, -0.4872246, -0.1555681, 0.032747746, -0.096495196, 0.070196226) * go_0(0.0, -1.0);\n    result += mat4(0.14174286, 0.099460006, -0.088765986, 0.58350676, -0.025177564, -0.46004987, 0.37007022, -0.11437029, -0.5164534, -0.60465246, 0.38859612, -0.32846406, 0.050266482, -0.20334712, 0.18316261, -0.19327633) * go_0(0.0, 0.0);\n    result += mat4(-0.09377763, -0.0012762006, -0.028991895, -0.26523829, 0.20173682, 0.037923716, -0.03174243, 0.07103378, -0.10764164, -0.30752546, 0.20556998, -0.1892279, 0.08115748, -0.023550175, -0.07627362, 0.11746628) * go_0(0.0, 1.0);\n    result += mat4(-0.06998859, -0.017997518, 0.069938794, -0.14943017, -0.14179112, 0.16643842, -0.110231474, 0.08895815, -0.24074875, 0.3277253, -0.07435203, -0.23452802, 0.039962552, -0.07145652, -0.022511544, -0.04571222) * go_0(1.0, -1.0);\n    result += mat4(-0.059785757, -0.23771374, -0.030571314, 0.25222278, 0.106601834, 0.34398326, 0.14511436, -0.03867526, -0.38982397, -0.11944689, 0.12997924, -0.13079585, 0.005729482, 0.012653905, -0.063693404, 0.09632285) * go_0(1.0, 0.0);\n    result += mat4(-0.04933823, 0.0547175, 0.050636575, -0.10060694, 0.1344485, 0.19752938, -0.100068115, -0.028829506, -0.14096203, -0.079092234, 0.092109434, 0.011606209, -0.04052607, -0.008347507, 0.06956573, -0.028109524) * go_0(1.0, 1.0);\n    result += mat4(0.21918017, -0.11115073, 0.2262453, -0.06889667, -0.11256312, -0.07438075, -0.088454485, 0.13672407, -0.06905764, 0.08128395, 0.016103368, 0.050190717, 0.09691516, 0.05845721, 0.4886816, 0.041121427) * go_1(-1.0, -1.0);\n    result += mat4(-0.3449472, 0.09711974, -0.13881907, -0.018265123, 0.27855873, -0.07030004, 0.29545054, 0.37216932, 0.08657718, 0.099066615, -0.10574013, -0.17667885, -0.14855732, -0.11351448, 0.66945946, 0.11312157) * go_1(-1.0, 0.0);\n    result += mat4(0.2526151, -0.04594331, -0.06606611, 0.09104881, 0.06857995, -0.075284235, -0.17664689, 0.21578754, 0.0696524, 0.09142951, 0.080997564, -0.0682772, -0.0011445724, -0.11736295, 0.2519232, -0.101926275) * go_1(-1.0, 1.0);\n    result += mat4(-0.12913518, 0.058357026, 0.195421, -0.15651494, 0.2877076, 0.0033844314, -0.07831594, 0.052855384, -0.031295884, 0.03301088, -0.18408822, 0.06732994, 0.23742151, -0.12568143, 0.22810535, -0.11545694) * go_1(0.0, -1.0);\n    result += mat4(-0.49203303, -0.22656603, 0.1723193, -0.51250046, -0.09742038, 0.758559, -0.3387505, -0.6193586, 0.14136684, 0.27679884, -0.050113205, 0.31041816, -0.36475047, -0.48746544, 0.3233227, 0.4579754) * go_1(0.0, 0.0);\n    result += mat4(0.46636763, 0.1507748, -0.2581362, 0.15413165, -0.17160143, 0.14256273, -0.074575804, -0.099299066, -0.0017214464, 0.13778336, -0.07378213, -0.15489665, -0.10533715, -0.0011083825, 0.39584312, 0.0023906573) * go_1(0.0, 1.0);\n    result += mat4(0.026959421, -0.06391859, 0.0034752619, 0.14521928, -0.0010877338, -0.032619733, 0.005375293, -0.018952755, 0.03381545, -0.007652831, 0.034141563, 0.046016496, 0.11219674, 0.030913852, 0.077403754, 0.17192438) * go_1(1.0, -1.0);\n    result += mat4(0.040326044, 0.17290725, -0.1220239, -0.09594783, -0.025229257, 0.17913155, -0.26623353, -0.033396784, -0.03075146, 0.009143897, -0.0136083895, -0.13886899, 0.075683735, -0.11584183, 0.22182357, 0.19350322) * go_1(1.0, 0.0);\n    result += mat4(0.15726025, -0.10215694, -0.060057458, 0.26487043, -0.04075552, -0.016496127, 0.0015382086, 0.108562306, 0.026795091, 0.0441233, -0.08754318, -0.0460157, 0.048422016, 0.14107347, 0.07986661, 0.1047697) * go_1(1.0, 1.0);\n    result += vec4(0.0766796, 0.08115133, -0.05703058, 0.14025708);\n    return result;\n}\n//!DESC Anime4K-v3.2-Upscale-CNN-x2-(M)-Conv-4x3x3x8\n//!HOOK MAIN\n//!BIND conv2d_2_tf\n//!SAVE conv2d_3_tf\n//!WIDTH conv2d_2_tf.w\n//!HEIGHT conv2d_2_tf.h\n//!COMPONENTS 4\n//!WHEN OUTPUT.w MAIN.w / 1.200 > OUTPUT.h MAIN.h / 1.200 > *\n#define go_0(x_off, y_off) (max((conv2d_2_tf_texOff(vec2(x_off, y_off))), 0.0))\n#define go_1(x_off, y_off) (max(-(conv2d_2_tf_texOff(vec2(x_off, y_off))), 0.0))\nvec4 hook() {\n    vec4 result = mat4(-0.18038331, 0.21830973, -0.10019419, -0.022745568, -0.14944611, -0.15669158, 0.46361133, -0.07289843, 0.02976627, -0.09000817, 0.113060996, 0.05635241, 0.012762965, -0.022688959, 0.01629751, 0.061114635) * go_0(-1.0, -1.0);\n    result += mat4(0.024338024, -0.10004009, -0.13709056, -0.0851965, 0.23927099, -0.024349794, -0.16574804, 0.084686354, -0.047885604, 0.09688507, -0.12733915, 0.06980246, 0.11480734, 0.014669346, -0.07505829, 0.04676309) * go_0(-1.0, 0.0);\n    result += mat4(0.054203495, 0.011881634, -0.036115017, -0.0686298, -0.13682245, -0.15678032, 0.057050128, -0.03368558, 0.13011025, 0.033391044, -0.09841339, -0.027057761, -0.18701133, 0.20852546, -0.13660902, 0.0005817616) * go_0(-1.0, 1.0);\n    result += mat4(-0.08077834, 0.35952288, -0.07647382, -0.0033230998, 0.13929126, -0.09155619, 0.14128102, 0.16005981, 0.18161216, -0.09485738, 0.0029118075, 0.052682754, 0.03242074, 0.08299826, 0.073796146, -0.06446532) * go_0(0.0, -1.0);\n    result += mat4(-0.36655015, 0.4606936, 0.19073649, 0.31655258, -0.006838053, -0.579939, 0.089126326, -0.14021218, -0.3437716, 0.16714323, 0.17705944, -0.22418492, -0.3883696, -0.2302651, 0.2581861, 0.21983066) * go_0(0.0, 0.0);\n    result += mat4(0.0992383, -0.014257871, -0.023896435, 0.19868234, 0.0408007, 0.07995299, 0.16102871, -0.11668251, 0.22458278, -0.05587917, 0.19373615, -0.016202094, -0.25106144, 0.15634494, 0.11624891, -0.2930768) * go_0(0.0, 1.0);\n    result += mat4(0.024616942, 0.36248252, -0.14779098, -0.019894283, -0.007111256, 0.010641561, -0.09541178, 0.21236233, 0.009501827, 0.08132797, -0.13983901, 0.027207611, 0.038444366, -0.013995817, -0.16242191, 0.03294123) * go_0(1.0, -1.0);\n    result += mat4(0.0131698875, -0.18124102, -0.13503514, -0.06099072, 0.07422735, -0.20906176, -0.049005672, 0.08739405, -0.031758767, -0.1978915, 0.23094437, 0.54512614, 0.21338555, -0.011205669, -0.23727885, -0.29533875) * go_0(1.0, 0.0);\n    result += mat4(-0.0010255767, -0.07168225, -0.033568826, 0.22161655, -0.087293416, 0.11350447, 0.13653576, 0.061226424, -0.13074352, 0.058425818, 0.038460605, 0.2749964, -0.012814839, 0.085885845, -0.038151987, -0.17960808) * go_0(1.0, 1.0);\n    result += mat4(0.19728905, -0.040724937, -0.18270236, 0.046735186, 0.03507326, 0.119867206, -0.12691991, 0.18119748, -0.052895024, 0.11348764, -0.043787055, 0.004703516, 0.006752757, -0.06939761, -0.009801806, -0.075640485) * go_1(-1.0, -1.0);\n    result += mat4(0.051735226, 0.1732299, -0.10672899, 0.0320877, -0.4913656, 0.2102274, 0.43920282, 0.059108034, 0.08349019, -0.16517872, 0.15436842, -0.1075667, 0.022741623, -0.26693836, 0.3645307, 0.017874828) * go_1(-1.0, 0.0);\n    result += mat4(0.034464058, 0.014929155, 0.054227423, 0.14167373, -0.0023630706, -0.08904212, 0.11918041, -0.034539603, 0.06048089, -0.06807333, 0.14447778, 0.035260547, 0.09979546, -0.1924939, 0.14596114, -0.12069667) * go_1(-1.0, 1.0);\n    result += mat4(-0.04427228, -0.23673469, 0.010357103, -0.2907043, -0.06845721, -0.078984015, 0.06867713, -0.058163825, -0.12154615, 0.08430951, 0.1922373, 0.030108064, -0.43081748, -0.38715646, -0.022240646, -0.15403675) * go_1(0.0, -1.0);\n    result += mat4(0.46885306, -0.33421394, -0.6695223, -0.41841158, 0.30317923, 0.24244753, -0.1047785, -0.18656285, 0.06261881, -0.4405616, 0.24233986, 0.40070608, 0.81440526, 0.11305212, -0.8826317, -0.023478031) * go_1(0.0, 0.0);\n    result += mat4(-0.07879348, -0.024378026, -0.041883785, -0.17030984, 0.23229122, -0.011237109, 0.12058088, 0.20766267, -0.36519575, 0.09599417, -0.1271098, 0.06990154, 0.21161246, 0.041002538, -0.36046275, 0.007304667) * go_1(0.0, 1.0);\n    result += mat4(0.10873893, 0.003872542, -0.13476561, -0.036068805, -0.054637462, 0.02304618, 0.04707738, -0.2856381, 0.07124422, 0.010866545, 0.20484549, -0.008342406, -0.43660247, -0.041055538, 0.33536008, -0.060022205) * go_1(1.0, -1.0);\n    result += mat4(0.1966458, 0.0016302796, -0.25712642, -0.09639119, -0.006955351, 0.10882133, 0.1107341, 0.062697805, -0.1074494, 0.17361663, 0.6429869, -0.39846307, -0.26302996, 0.048710946, 0.40387508, 0.4299715) * go_1(1.0, 0.0);\n    result += mat4(0.18948616, 0.24086732, -0.064474985, -0.11069709, 0.1279659, -0.13438123, -0.028438117, 0.125883, 0.018153818, -0.21942288, 0.020390838, -0.22797634, -0.10821287, -0.17175092, 0.122016855, 0.20699544) * go_1(1.0, 1.0);\n    result += vec4(-0.05101961, -0.060740646, -0.024465766, 0.058471628);\n    return result;\n}\n//!DESC Anime4K-v3.2-Upscale-CNN-x2-(M)-Conv-4x3x3x8\n//!HOOK MAIN\n//!BIND conv2d_3_tf\n//!SAVE conv2d_4_tf\n//!WIDTH conv2d_3_tf.w\n//!HEIGHT conv2d_3_tf.h\n//!COMPONENTS 4\n//!WHEN OUTPUT.w MAIN.w / 1.200 > OUTPUT.h MAIN.h / 1.200 > *\n#define go_0(x_off, y_off) (max((conv2d_3_tf_texOff(vec2(x_off, y_off))), 0.0))\n#define go_1(x_off, y_off) (max(-(conv2d_3_tf_texOff(vec2(x_off, y_off))), 0.0))\nvec4 hook() {\n    vec4 result = mat4(-0.14533128, 0.07266841, 0.13238011, -0.23328504, 0.031516243, 0.058471266, -0.06394412, 0.090752736, -0.0042359144, 0.12357294, -0.04377495, 0.0011743477, 0.05412243, -0.08146249, 0.04002749, -0.032876283) * go_0(-1.0, -1.0);\n    result += mat4(-0.036972385, -0.15238069, -0.3453321, -0.36025128, 0.07597202, -0.02368151, -0.3889606, 0.34607083, 0.3133179, -0.21712309, -0.4210954, 0.21450534, 0.15226828, 0.25326282, 0.45327064, -0.3350824) * go_0(-1.0, 0.0);\n    result += mat4(0.019018406, -0.33060563, -0.092601225, 0.14970545, 0.1441509, -0.19228427, -0.032771986, 0.26331595, 0.052981265, -0.06627376, -0.08634131, 0.038706224, 0.13403937, -4.4842476e-05, 0.049002815, -0.12719193) * go_0(-1.0, 1.0);\n    result += mat4(0.17527401, -0.0035254909, -0.047959115, -0.4526988, -0.07510284, 0.0013256798, -0.07539148, 0.24220634, -0.08708839, -0.14494033, -0.17085724, -0.099797316, 0.0068515535, -0.08918779, 0.27164719, -0.1702649) * go_0(0.0, -1.0);\n    result += mat4(0.31848368, 0.48983255, -0.44140294, -0.65174145, -0.004199057, 0.19494705, 0.5196497, -0.027118586, 0.032509074, -0.23900363, -0.14489244, 0.36314297, -0.23168536, -0.20960593, 0.61471456, 0.12401275) * go_0(0.0, 0.0);\n    result += mat4(-0.24317405, 0.21560913, 0.15564032, 0.11606844, -0.15039803, -0.59578896, 0.14100945, -0.026194477, 0.37237462, -0.49472088, -0.15215331, -0.38820064, -0.25089455, -0.29643852, -0.09513793, 0.019779462) * go_0(0.0, 1.0);\n    result += mat4(0.12498539, 0.0710632, -0.25012368, -0.2272255, -0.08647026, 0.12277892, 0.011025097, -0.12168395, -0.13489573, 0.016708186, -0.15583871, -0.057124946, 0.1216943, 0.019803725, 0.06952334, -0.032985855) * go_0(1.0, -1.0);\n    result += mat4(0.28794885, 0.33783793, -0.14469545, -0.081780486, -0.50320613, -0.067601606, -0.06847453, -0.021648854, -0.34295765, 0.15071863, -0.06619896, -0.084465064, 0.31909832, 0.015414661, 0.14930317, -0.11295768) * go_0(1.0, 0.0);\n    result += mat4(0.24530606, 0.25526014, 0.09971985, -0.07749641, -0.2361951, -0.07997673, 0.03617294, 0.02959561, -0.4498983, -0.014073485, -0.20587012, 0.06396779, 0.1262825, 0.027433183, 0.14469334, 0.011538011) * go_0(1.0, 1.0);\n    result += mat4(-0.038572453, -0.023108613, -0.039481267, -0.012160024, -0.004521989, -0.028665857, 0.04295255, 0.10580258, 0.05439479, -0.072261885, 0.11030243, 0.08934696, 0.09133867, 0.017547369, 0.097613186, 0.05491059) * go_1(-1.0, -1.0);\n    result += mat4(-0.09972817, 0.057730395, 0.12665828, 0.32861367, -0.16186063, 0.0745509, 0.2394045, -0.08687853, -0.034404907, -0.05843572, 0.0684561, -0.1355754, 0.19248672, -0.60372186, 0.12583947, 0.4388962) * go_1(-1.0, 0.0);\n    result += mat4(0.10341107, 0.061113223, 0.08773817, -0.082504354, -0.16612078, 0.2681751, 0.019737698, -0.17122322, -0.135949, 0.3048101, 0.087803006, 0.11373851, 0.013192192, -0.27022064, 0.35529897, -0.15321451) * go_1(-1.0, 1.0);\n    result += mat4(-0.032835662, 0.11123062, -0.11322452, -0.17300649, 0.04680824, 0.12849288, 0.17269878, -0.048671383, 0.05189037, -0.009078046, 0.22105052, 0.013008137, -0.009738674, 0.15391739, 0.20969556, 0.14189166) * go_1(0.0, -1.0);\n    result += mat4(-0.47377753, 0.3038031, 0.18604809, 0.1931698, -0.2964668, -0.12287907, -0.7107761, 0.26619422, -0.33923018, 0.19200724, 0.013786281, -0.17496964, 0.079325035, -0.3694445, 0.0054486147, -0.33018264) * go_1(0.0, 0.0);\n    result += mat4(0.14903802, -0.028043179, 1.5238678e-05, 0.021232028, 0.16025065, 0.14746875, -0.22831628, -0.12177345, 0.038778774, 0.32188168, -0.042017702, 0.27155936, 0.17920609, 0.04099755, 0.28527525, 0.074623376) * go_1(0.0, 1.0);\n    result += mat4(0.057019282, -0.112741895, 0.030361209, 0.14567861, 0.056265317, -0.01573537, -0.06707608, 0.016657263, 0.09829025, -0.026795063, 0.023042196, 0.09438241, -0.025483066, -0.052787006, 0.19730279, 0.021218104) * go_1(1.0, -1.0);\n    result += mat4(0.19868211, -0.01531125, 0.108596824, -0.035456363, 0.0033609823, 0.057961613, -0.013726211, 0.101742364, 0.33357215, 0.14468077, 0.29711527, -0.24662566, -0.119014986, -0.1899639, 0.11246697, -0.0035374009) * go_1(1.0, 0.0);\n    result += mat4(-0.05602109, -0.15539522, 0.010730943, 0.057116497, -0.02037749, 0.084210664, -0.028235348, 0.10574697, 0.056925274, 0.07922333, -0.090088, 0.1615985, -0.0044301567, -0.089945644, 0.024176618, -0.041844133) * go_1(1.0, 1.0);\n    result += vec4(0.0015292584, -0.043625206, -0.09429898, -0.06280405);\n    return result;\n}\n//!DESC Anime4K-v3.2-Upscale-CNN-x2-(M)-Conv-4x3x3x8\n//!HOOK MAIN\n//!BIND conv2d_4_tf\n//!SAVE conv2d_5_tf\n//!WIDTH conv2d_4_tf.w\n//!HEIGHT conv2d_4_tf.h\n//!COMPONENTS 4\n//!WHEN OUTPUT.w MAIN.w / 1.200 > OUTPUT.h MAIN.h / 1.200 > *\n#define go_0(x_off, y_off) (max((conv2d_4_tf_texOff(vec2(x_off, y_off))), 0.0))\n#define go_1(x_off, y_off) (max(-(conv2d_4_tf_texOff(vec2(x_off, y_off))), 0.0))\nvec4 hook() {\n    vec4 result = mat4(0.06051604, -0.028152643, -0.21418124, 0.13032125, 0.42565975, -0.09571944, -0.34494513, 0.30004, -0.073245734, -0.028659137, 0.0032105136, -0.05009555, -0.048971225, 0.04814533, 0.002843805, -0.046224426) * go_0(-1.0, -1.0);\n    result += mat4(-0.07495975, 0.018714864, 0.21229684, -0.13614887, 0.79988647, -0.0697328, 0.38232988, 0.24165109, 0.25947478, -0.0009418982, -0.17369923, 0.10007766, 0.024117598, 0.028611807, 0.15090801, -0.06344829) * go_0(-1.0, 0.0);\n    result += mat4(-0.07982219, 0.0900347, 0.007609254, -0.0034791247, 0.013611781, -0.13560618, 0.09685799, 0.06276075, 0.134693, -0.14370437, -0.25175703, -0.0016138123, -0.0075672898, -0.13325731, -0.061100446, 0.0059743375) * go_0(-1.0, 1.0);\n    result += mat4(-0.039018434, -0.19668463, -0.43018532, 0.31886247, 0.4965479, 0.114569925, 0.19110382, 0.27343535, 0.0707728, -0.11877004, -0.25827697, 0.37012872, 0.1474777, 0.07056952, -0.14965728, 0.061595406) * go_0(0.0, -1.0);\n    result += mat4(0.506543, -0.16268773, 0.455319, -0.0702646, 0.70102173, -0.14041683, 0.70184857, 0.4817842, -0.3389246, -0.14463086, 0.13763213, -1.1259074, 0.47722015, 0.38352612, -0.04293366, -0.5604627) * go_0(0.0, 0.0);\n    result += mat4(0.17606944, 0.15897374, 0.13499324, 0.29241478, -0.032824475, 0.11128662, -0.22204424, -0.051803727, 0.013195331, -0.42040786, -0.3950585, 0.70745844, 0.38646924, -0.19080774, -0.15171832, -0.10742828) * go_0(0.0, 1.0);\n    result += mat4(-0.039278325, 0.18421806, -0.044948544, 0.07902063, -0.2149251, 0.09913459, -0.09743655, -0.26899317, -0.002695496, -0.07554527, -0.22373366, 0.17830558, -0.047994815, -0.06789183, -0.06755918, -0.104452066) * go_0(1.0, -1.0);\n    result += mat4(-0.0493473, -0.30411786, -0.056439694, -0.06582185, -0.21309847, 0.100670904, -0.22966193, -0.045954112, 0.12728062, -0.25081897, -0.094699375, -0.4036555, 0.060854495, -0.64373237, -0.21522263, -0.6683476) * go_0(1.0, 0.0);\n    result += mat4(0.063481025, 0.11744312, -0.043330096, 0.33817932, -0.06679828, -0.23207302, -0.10188898, -0.10590511, 0.058780864, 0.047292337, -0.11834696, 0.10076128, -0.036641665, 0.30200714, -0.0002892557, -0.10303763) * go_0(1.0, 1.0);\n    result += mat4(-0.10842604, 0.042055763, 0.29702973, -0.07409644, -0.030164458, -0.012098744, -0.06396587, -0.08787527, 0.051854923, 0.12997511, 0.11468497, 0.15022379, 0.007814715, 0.014517445, 0.025484756, 0.01078619) * go_1(-1.0, -1.0);\n    result += mat4(-0.29229385, 0.040265664, -0.15376821, 0.075579196, -0.05593569, -0.045405343, 0.12099204, 0.1571252, 0.17841713, 0.04673325, 0.14550509, 0.08603346, -0.049786013, 0.06121843, -0.16273825, -0.13857752) * go_1(-1.0, 0.0);\n    result += mat4(0.06903744, 0.2628764, -0.13582836, -0.35678583, -0.13821034, -0.019381443, -0.19570538, -0.09298511, 0.08965436, 0.09745909, 0.20055099, 0.024967568, 0.08144204, 0.004633625, 0.12809834, -0.009431525) * go_1(-1.0, 1.0);\n    result += mat4(0.09784006, 0.010729353, 0.046643205, -0.110926524, -0.21556224, 0.00016300633, 0.122175336, 0.15004392, 0.013864355, 0.24767809, 0.13865592, 0.0155424485, -0.1450483, -0.15688781, -0.06195043, -0.13745981) * go_1(0.0, -1.0);\n    result += mat4(0.018991318, 0.55401963, 0.11709872, -0.028442185, -0.46035343, -0.10215539, -0.60193926, 0.47882316, -0.23346989, 0.037200127, 0.22814943, -0.08231696, -0.36430013, -0.011152757, 0.48752213, 0.29796222) * go_1(0.0, 0.0);\n    result += mat4(-0.07258066, -0.023222538, 0.23230423, -0.30317304, 0.03942911, -0.06899803, 0.23778579, 0.07418621, -0.17443737, 0.33387753, 0.007354842, -0.123447575, -0.1745315, 0.11071779, -0.11949625, -0.22832453) * go_1(0.0, 1.0);\n    result += mat4(-0.024909232, -0.0308135, 0.12170621, -0.13298757, 0.045828197, -0.1532345, -0.06633672, 0.23591088, 0.04964077, 0.14091493, 0.038343724, -0.029780807, 0.05762822, -0.048930667, -0.02434709, 0.07109019) * go_1(1.0, -1.0);\n    result += mat4(-0.16039175, 0.3004474, -0.17278233, 0.13677922, 0.18838613, 0.15054552, 0.32901475, -0.1288333, 0.26378244, -0.05119892, 0.34533516, 0.25180495, 0.19452183, 0.0843233, -0.08029368, 0.39877903) * go_1(1.0, 0.0);\n    result += mat4(-0.07097129, -0.26492423, -0.055032317, -0.093516104, -0.11795062, 0.04086253, -0.07989471, 0.059686553, 0.09378249, 0.45851848, 0.2510942, 0.19599153, 0.019765077, -0.02920918, -0.04125142, -0.13859107) * go_1(1.0, 1.0);\n    result += vec4(0.04400571, -0.04015565, 0.0140529545, 0.05474095);\n    return result;\n}\n//!DESC Anime4K-v3.2-Upscale-CNN-x2-(M)-Conv-4x3x3x8\n//!HOOK MAIN\n//!BIND conv2d_5_tf\n//!SAVE conv2d_6_tf\n//!WIDTH conv2d_5_tf.w\n//!HEIGHT conv2d_5_tf.h\n//!COMPONENTS 4\n//!WHEN OUTPUT.w MAIN.w / 1.200 > OUTPUT.h MAIN.h / 1.200 > *\n#define go_0(x_off, y_off) (max((conv2d_5_tf_texOff(vec2(x_off, y_off))), 0.0))\n#define go_1(x_off, y_off) (max(-(conv2d_5_tf_texOff(vec2(x_off, y_off))), 0.0))\nvec4 hook() {\n    vec4 result = mat4(-0.014236042, -0.0031431736, -0.1551387, 0.12515116, -0.28528872, 0.36161992, 0.15750743, -0.17111474, 0.13792591, -0.0657419, -0.17471549, 0.14650472, 0.034169197, -0.019157575, 0.23520657, -0.20358163) * go_0(-1.0, -1.0);\n    result += mat4(0.02015035, 0.12993371, 0.11199667, -0.09854378, 0.5001741, 0.03462961, 0.24919736, 0.08505297, -0.20902094, -0.24141377, -0.15360375, 0.049974803, -0.037157424, -0.048510186, 0.20106035, -0.118480384) * go_0(-1.0, 0.0);\n    result += mat4(0.086798504, -0.009607818, 0.034812123, -0.005187592, 0.0351509, 0.021755, -0.04996161, -0.041231696, 0.0020545553, 0.015730752, -0.07507172, 0.018597523, -0.02393343, 0.07624775, 0.03892451, -0.0025574185) * go_0(-1.0, 1.0);\n    result += mat4(0.035725456, 0.06809103, 0.51926994, -0.39983147, -0.16402833, -0.1243394, -0.25922915, 0.28285915, 0.15959994, -0.2351732, 0.2650535, -0.30193794, -0.11468332, 0.050777763, -0.51894253, 0.4408367) * go_0(0.0, -1.0);\n    result += mat4(-0.27042082, 0.22243942, 0.14902467, 0.38428563, 0.46612173, 0.5169912, -0.22330502, -0.11300288, -0.36141354, 0.0668681, 0.2984152, 0.1275798, -0.24121419, 0.2952039, -0.45109174, -0.3822957) * go_0(0.0, 0.0);\n    result += mat4(0.26543504, -0.05742226, -0.052103903, -0.013124308, -0.14358385, -0.04024543, 0.07665455, -0.012301872, -0.18752757, -0.03913891, 0.038205814, -0.006583095, -0.25550908, -0.25725332, -0.12454206, -0.0058936924) * go_0(0.0, 1.0);\n    result += mat4(-0.0018946569, 0.019746022, -0.13080788, 0.11450627, -0.013743845, -0.027179785, -0.14425103, 0.07109661, 0.023703793, 0.086905524, 0.03151253, 0.0132474145, 0.041018624, 0.04548913, 0.2718715, -0.20008296) * go_0(1.0, -1.0);\n    result += mat4(-0.076830454, 0.11652955, 0.5068201, -0.3082819, 0.058615055, -0.006765798, -0.057522714, 0.049981344, -0.006897243, -0.21763432, 0.16896053, -0.21176189, -0.061227098, 0.03566485, 0.08901554, -0.050980624) * go_0(1.0, 0.0);\n    result += mat4(0.02327798, 0.07662976, 0.034811985, -0.03238033, -0.0021881019, -0.030997375, -0.069672935, 0.04040273, -0.1217442, 0.104173124, 0.09862539, 0.020557549, -0.022286594, 0.10287763, -0.021694934, 0.07542515) * go_0(1.0, 1.0);\n    result += mat4(0.124069154, -0.08579466, -0.07816314, 0.11332851, -0.034682628, -0.11038275, 0.04750615, -0.096100725, 0.039588403, -0.15149672, -0.05529172, 0.034304325, -0.022520235, -0.05023852, -0.2674731, 0.21886522) * go_1(-1.0, -1.0);\n    result += mat4(-0.1948599, -0.14946899, -0.39548838, 0.18042913, -0.007919619, 0.19826505, 0.23789087, 0.009140256, 0.11857748, 0.18215668, 0.13606293, -0.09209675, -0.080678545, -0.020431137, -0.07728839, -0.051353537) * go_1(-1.0, 0.0);\n    result += mat4(-0.07616472, -0.0032800382, -0.045657665, -0.039144326, -0.37786487, -0.08877774, 0.053579114, -0.070886396, 0.011311804, 0.107276045, 0.013236154, 0.009832061, 0.08292063, 0.12258811, 0.0005569043, -0.009806432) * go_1(-1.0, 1.0);\n    result += mat4(-0.28062925, 0.15946878, -0.1021801, -0.06471589, -0.26999477, 0.21230288, -0.14243907, 0.2555922, -0.09608517, 0.26339412, 0.20891234, -0.23538485, 0.33958244, -0.12569186, 0.43289876, -0.33462036) * go_1(0.0, -1.0);\n    result += mat4(0.16265294, 0.2625464, -0.34452894, 0.2233622, 0.13850005, -0.42999864, -0.5385177, -0.11035979, 0.51662, -0.78238726, -0.09422375, 0.83759475, 0.44468537, 0.14301361, 0.108906105, 1.1596143) * go_1(0.0, 0.0);\n    result += mat4(-0.73757625, -0.12369605, 0.23523071, 0.006587637, -0.15445381, 0.22757277, 0.052819528, 0.10183905, -0.07912228, -0.16998893, -0.13360223, 0.014348178, -0.17778571, -0.41047302, 0.10241381, -0.08526306) * go_1(0.0, 1.0);\n    result += mat4(0.14712952, 0.048995696, 0.05299946, -0.06817572, 0.1498064, -0.079825334, 0.40354064, -0.31789717, -0.1998377, 0.00955295, -0.32318407, 0.30898204, -0.039571725, -0.026203401, -0.16292085, 0.08574385) * go_1(1.0, -1.0);\n    result += mat4(-0.6353329, -0.56000775, -0.17279743, 0.18198174, -0.19555812, 0.056538377, 0.34365895, -0.07799055, 0.19011354, -0.13952748, 0.029196098, -0.19596763, -0.069196045, -0.17402656, 0.07948411, -0.016226962) * go_1(1.0, 0.0);\n    result += mat4(0.25592864, 0.083498634, -0.28515807, 0.10789751, 0.0043962947, 0.07085363, 0.048724182, -0.025131436, -0.0049440865, -0.033094388, -0.032935806, 0.04266025, 0.20026933, 0.0927841, -0.006839351, -0.013012285) * go_1(1.0, 1.0);\n    result += vec4(0.02021373, 0.0014037411, 0.0012718709, 0.017278494);\n    return result;\n}\n//!DESC Anime4K-v3.2-Upscale-CNN-x2-(M)-Conv-4x1x1x56\n//!HOOK MAIN\n//!BIND conv2d_tf\n//!BIND conv2d_1_tf\n//!BIND conv2d_2_tf\n//!BIND conv2d_3_tf\n//!BIND conv2d_4_tf\n//!BIND conv2d_5_tf\n//!BIND conv2d_6_tf\n//!SAVE conv2d_last_tf\n//!WIDTH conv2d_tf.w\n//!HEIGHT conv2d_tf.h\n//!COMPONENTS 4\n//!WHEN OUTPUT.w MAIN.w / 1.200 > OUTPUT.h MAIN.h / 1.200 > *\n#define g_0 (max((conv2d_tf_tex(conv2d_tf_pos)), 0.0))\n#define g_1 (max(-(conv2d_tf_tex(conv2d_tf_pos)), 0.0))\n#define g_2 (max((conv2d_1_tf_tex(conv2d_1_tf_pos)), 0.0))\n#define g_3 (max(-(conv2d_1_tf_tex(conv2d_1_tf_pos)), 0.0))\n#define g_4 (max((conv2d_2_tf_tex(conv2d_2_tf_pos)), 0.0))\n#define g_5 (max(-(conv2d_2_tf_tex(conv2d_2_tf_pos)), 0.0))\n#define g_6 (max((conv2d_3_tf_tex(conv2d_3_tf_pos)), 0.0))\n#define g_7 (max(-(conv2d_3_tf_tex(conv2d_3_tf_pos)), 0.0))\n#define g_8 (max((conv2d_4_tf_tex(conv2d_4_tf_pos)), 0.0))\n#define g_9 (max(-(conv2d_4_tf_tex(conv2d_4_tf_pos)), 0.0))\n#define g_10 (max((conv2d_5_tf_tex(conv2d_5_tf_pos)), 0.0))\n#define g_11 (max(-(conv2d_5_tf_tex(conv2d_5_tf_pos)), 0.0))\n#define g_12 (max((conv2d_6_tf_tex(conv2d_6_tf_pos)), 0.0))\n#define g_13 (max(-(conv2d_6_tf_tex(conv2d_6_tf_pos)), 0.0))\nvec4 hook() {\n    vec4 result = mat4(-0.0067711817, 0.08160003, 0.0247279, 0.03084815, -0.026977416, -0.02120602, -0.025078611, -0.029852165, -0.011627478, -0.012742972, 0.022736797, -0.0028815821, -0.007515677, 0.0172887, -0.023259213, 0.009608947) * g_0;\n    result += mat4(-0.028660107, -0.014015208, -0.027838672, -0.013171922, 0.0029435428, 0.027047642, -0.017478354, 0.022834882, -0.037572853, -0.0034044068, -0.0149029335, -0.013362301, 0.009827443, -0.015742151, -0.0074795415, -0.0022266617) * g_1;\n    result += mat4(-0.07579662, -0.039754186, -0.066026606, -0.046816852, 0.1099032, 0.043956704, 0.073109835, 0.04680284, -0.06896613, -0.008838632, -0.044584926, -0.01319039, -0.0021152915, -0.04503326, 0.027061926, -0.028334105) * g_2;\n    result += mat4(0.15458213, 0.059769996, 0.09327123, -0.028782733, 0.023459995, -0.15390377, -0.13432898, -0.1127775, 0.072764635, -0.0020463336, 0.034736466, -0.0012086042, -0.05847183, -0.029952323, 0.052969377, 0.09590908) * g_3;\n    result += mat4(-0.07476772, -0.016574614, 0.04131183, 0.017335678, 0.009654406, 0.072183535, -0.002266456, 0.086873695, 9.310129e-05, 0.0056416965, -0.004188391, 0.023132093, -0.05183336, -0.025825873, -0.03684392, -0.0075729224) * g_4;\n    result += mat4(0.00878842, 0.03869637, -0.035759524, 0.003345386, -0.064184256, -0.034568302, -0.06672922, -0.0686381, -0.06794392, -0.10685906, 0.04679947, -0.012535639, 0.006932529, -0.007783515, 0.109123886, 0.13804391) * g_5;\n    result += mat4(-0.03160699, 0.050473, -0.09030729, 0.0649397, 0.11466501, 0.17912874, -0.0081851315, 0.052244574, 0.051632743, 0.061941486, 0.06546816, 0.12174249, -0.05104755, -0.018193979, -0.032196652, -0.035292786) * g_6;\n    result += mat4(0.013612735, -0.0024100312, -0.068611205, -0.07369285, -0.019647537, -0.066944756, -0.010012875, -0.06785739, -0.062246565, -0.087313406, -0.044278186, -0.09368995, 0.052555013, 0.13604961, 0.05645059, 0.08763303) * g_7;\n    result += mat4(0.04218486, -0.05028401, 0.059086576, -0.03545452, 0.027737848, 0.0043074046, 0.0011001764, -0.073026665, -0.04094988, 0.044061556, -0.009812515, 0.06841999, -0.06612581, 0.037223976, -0.07759491, -0.04356598) * g_8;\n    result += mat4(-0.027558247, 0.014248466, -0.019813016, -0.058107473, -0.016717663, -0.020424338, 0.0053625097, -0.009917319, 0.013678771, 0.0113340765, 0.0061787106, -0.036083996, -0.020179711, -0.011310535, 0.054827053, -0.0008278952) * g_9;\n    result += mat4(0.028690035, -0.012079616, 0.11931408, -0.048533775, 0.069336995, 0.0049852817, 0.013774468, 0.035233382, -0.07384821, 0.0003354423, -0.0059171803, -0.04503906, 0.08727279, 0.005138857, -0.17724465, 0.055782065) * g_10;\n    result += mat4(-0.20744391, 0.24348328, -0.3145766, 0.17026486, -0.022870807, -0.01648648, -0.05912279, -0.012555373, -0.066004686, 0.03182394, 0.16285324, -0.1221846, -0.31816196, 0.007928748, 0.43180224, -0.015949022) * g_11;\n    result += mat4(0.16363169, 0.14781676, -0.2377973, -0.1571377, -0.09038187, 0.0046504294, 0.033955004, -0.051421452, 0.046735536, 0.006827522, -0.121338, 0.12671822, 0.15833299, -0.1858712, -0.1942371, 0.17336044) * g_12;\n    result += mat4(-0.018145572, -0.015550516, 0.044410378, 0.046016492, 0.084021375, 0.05327457, -0.008270992, -0.045435544, 0.07185879, -0.131923, 0.26721445, -0.26745328, -0.07093472, 0.042701527, 0.13793674, -0.095621444) * g_13;\n    result += vec4(0.016836504, 0.010161949, 0.021351453, 0.01278978);\n    return result;\n}\n//!DESC Anime4K-v3.2-Upscale-CNN-x2-(M)-Depth-to-Space\n//!HOOK MAIN\n//!BIND MAIN\n//!BIND conv2d_last_tf\n//!SAVE MAIN\n//!WIDTH conv2d_last_tf.w 2 *\n//!HEIGHT conv2d_last_tf.h 2 *\n//!WHEN OUTPUT.w MAIN.w / 1.200 > OUTPUT.h MAIN.h / 1.200 > *\nvec4 hook() {\n    vec2 f0 = fract(conv2d_last_tf_pos * conv2d_last_tf_size);\n    ivec2 i0 = ivec2(f0 * vec2(2.0));\n    float c0 = conv2d_last_tf_tex((vec2(0.5) - f0) * conv2d_last_tf_pt + conv2d_last_tf_pos)[i0.y * 2 + i0.x];\n    float c1 = c0;\n    float c2 = c1;\n    float c3 = c2;\n    return vec4(c0, c1, c2, c3) + MAIN_tex(MAIN_pos);\n}\n';
const PRESET_SOURCES = {
  light: [restoreCnnS],
  standard: [restoreCnnM, upscaleCnnX2S],
  high: [restoreCnnM, upscaleCnnX2M]
};
const MAIN = "MAIN";
const VERTEX_SHADER = `#version 300 es
// Attribute-less full-screen triangle. v_texCoord spans [0,1] with (0,0) at the
// texel that maps to NDC (-1,-1); this keeps texture space y-up-consistent with
// the uploaded frame across every pass.
out vec2 v_texCoord;
void main() {
  vec2 p = vec2((gl_VertexID << 1) & 2, gl_VertexID & 2);
  v_texCoord = p;
  gl_Position = vec4(p * 2.0 - 1.0, 0.0, 1.0);
}
`;
const PASSTHROUGH_FRAGMENT = `#version 300 es
precision highp float;
in vec2 v_texCoord;
out vec4 fragColor;
uniform sampler2D u_tex;
void main() {
  fragColor = texture(u_tex, vec2(v_texCoord.x, 1.0 - v_texCoord.y));
}
`;
class Anime4KRenderer {
  constructor(video, canvas) {
    __publicField(this, "video");
    __publicField(this, "canvas");
    __publicField(this, "gl");
    __publicField(this, "mode", "off");
    __publicField(this, "running", false);
    // Compiled chain for the active (non-off) mode.
    __publicField(this, "chain", []);
    __publicField(this, "buildFailed", false);
    // Permanently disabled (e.g. the <video> is CORS-tainted and can never be
    // sampled by WebGL). Unlike buildFailed, this stops the loop entirely and is
    // reported to the consumer so it can hide the (now useless) canvas overlay.
    __publicField(this, "disabled", false);
    __publicField(this, "disabledReason", null);
    __publicField(this, "onDisabled", null);
    // Shared GL objects.
    __publicField(this, "vao", null);
    __publicField(this, "passthroughProgram", null);
    __publicField(this, "passthroughTexLoc", null);
    // The uploaded video frame (RGBA8), sampled as MAIN by the first passes.
    __publicField(this, "inputTex", null);
    __publicField(this, "inputW", 0);
    __publicField(this, "inputH", 0);
    // Ping-pong pair of RGBA16F targets used whenever a pass saves to MAIN.
    __publicField(this, "mainFloat", [null, null]);
    // Named intermediate targets (conv2d_tf, conv2d_last_tf, ...).
    __publicField(this, "named", /* @__PURE__ */ new Map());
    // Loop handles.
    __publicField(this, "rafId", 0);
    __publicField(this, "rvfcId", 0);
    __publicField(this, "useRvfc", false);
    this.video = video;
    this.canvas = canvas;
    let gl = null;
    try {
      gl = canvas.getContext("webgl2", {
        alpha: false,
        depth: false,
        stencil: false,
        antialias: false,
        premultipliedAlpha: false,
        preserveDrawingBuffer: false
      });
    } catch {
      gl = null;
    }
    this.gl = gl;
    if (gl) {
      gl.getExtension("EXT_color_buffer_float");
      this.vao = gl.createVertexArray();
      this.passthroughProgram = this.linkProgram(VERTEX_SHADER, PASSTHROUGH_FRAGMENT);
      if (this.passthroughProgram) {
        this.passthroughTexLoc = gl.getUniformLocation(this.passthroughProgram, "u_tex");
      }
      this.useRvfc = typeof video.requestVideoFrameCallback === "function";
    }
  }
  /** True when this environment supports the WebGL2 + float-render-target stack. */
  static isSupported() {
    try {
      const c = document.createElement("canvas");
      const gl = c.getContext("webgl2");
      if (!gl) return false;
      return gl.getExtension("EXT_color_buffer_float") !== null;
    } catch {
      return false;
    }
  }
  /** True when a non-off mode is selected and the loop is running. */
  get active() {
    return this.mode !== "off" && this.running && !!this.gl;
  }
  /** True once the renderer has permanently disabled itself for this source. */
  get isDisabled() {
    return this.disabled;
  }
  /**
   * Register a callback fired once if the renderer permanently disables itself
   * (e.g. the video frame is cross-origin and WebGL can't sample it). If it is
   * already disabled, the callback fires immediately.
   */
  setDisabledCallback(cb) {
    this.onDisabled = cb;
    if (this.disabled && this.disabledReason) cb(this.disabledReason);
  }
  /**
   * Clear a permanent-disable so the loop can run again. Called by the consumer
   * on a source change — a new stream may not be CORS-tainted like the last one.
   */
  resetDisabled() {
    this.disabled = false;
    this.disabledReason = null;
  }
  /** Rebuild the pass chain for `mode`. 'off' clears the chain (passthrough blit). */
  setMode(mode) {
    if (mode === this.mode && (mode === "off" || this.chain.length > 0 || this.buildFailed)) {
      return;
    }
    this.mode = mode;
    this.disposeChain();
    this.buildFailed = false;
    if (mode === "off" || !this.gl) {
      return;
    }
    const passes = this.buildPassList(mode);
    try {
      this.chain = this.compileChain(passes);
      if (this.chain.length === 0) this.buildFailed = true;
    } catch (err) {
      console.warn("[Anime4K] failed to build pass chain, falling back to passthrough:", err);
      this.disposeChain();
      this.buildFailed = true;
    }
  }
  /** Begin the render loop (requestVideoFrameCallback when available, else rAF). */
  start() {
    if (this.running || !this.gl) return;
    this.running = true;
    this.scheduleNext();
  }
  /** Pause the render loop. */
  stop() {
    this.running = false;
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
      this.rafId = 0;
    }
    if (this.rvfcId) {
      const cancel = this.video.cancelVideoFrameCallback;
      if (typeof cancel === "function") cancel.call(this.video, this.rvfcId);
      this.rvfcId = 0;
    }
  }
  /** Delete every GL resource and detach callbacks. Safe to call repeatedly. */
  destroy() {
    this.stop();
    const gl = this.gl;
    if (!gl) return;
    this.disposeChain();
    if (this.inputTex) {
      gl.deleteTexture(this.inputTex);
      this.inputTex = null;
    }
    if (this.vao) {
      gl.deleteVertexArray(this.vao);
      this.vao = null;
    }
    if (this.passthroughProgram) {
      gl.deleteProgram(this.passthroughProgram);
      this.passthroughProgram = null;
    }
  }
  // --- internal: pass-list assembly ---------------------------------------
  buildPassList(mode) {
    const out = [];
    for (const src of PRESET_SOURCES[mode]) {
      for (const p of parseMpvShader(src)) out.push(p);
    }
    return out;
  }
  // --- internal: compilation ----------------------------------------------
  compileChain(passes) {
    const gl = this.gl;
    if (!gl) return [];
    const compiled = [];
    for (const pass of passes) {
      const fragment = this.buildFragmentSource(pass);
      const program = this.linkProgram(VERTEX_SHADER, fragment);
      if (!program) {
        throw new Error(`pass "${pass.desc}" failed to compile/link`);
      }
      const binds = pass.binds.map((name) => ({
        name,
        sampler: gl.getUniformLocation(program, `${name}_sampler`),
        size: gl.getUniformLocation(program, `${name}_size`),
        pt: gl.getUniformLocation(program, `${name}_pt`)
      }));
      compiled.push({ pass, program, binds });
    }
    return compiled;
  }
  /**
   * Assemble the WebGL2 fragment shader for a pass: a generated preamble
   * (samplers + size uniforms + accessor macros, with HOOKED_* aliased to MAIN)
   * followed by the shader's verbatim body and a `main()` that calls hook().
   */
  buildFragmentSource(pass) {
    const header = [
      "#version 300 es",
      "precision highp float;",
      "precision highp sampler2D;",
      "in vec2 v_texCoord;",
      "out vec4 fragColor;"
    ];
    for (const name of pass.binds) {
      header.push(`uniform sampler2D ${name}_sampler;`);
      header.push(`uniform vec2 ${name}_size;`);
      header.push(`uniform vec2 ${name}_pt;`);
      header.push(`#define ${name}_texOff(off) texture(${name}_sampler, v_texCoord + (off) * ${name}_pt)`);
      header.push(`#define ${name}_tex(p) texture(${name}_sampler, p)`);
      header.push(`#define ${name}_pos v_texCoord`);
    }
    if (pass.binds.includes(MAIN)) {
      header.push(`#define HOOKED_texOff(off) MAIN_texOff(off)`);
      header.push(`#define HOOKED_tex(p) MAIN_tex(p)`);
      header.push(`#define HOOKED_pos MAIN_pos`);
      header.push(`#define HOOKED_size MAIN_size`);
      header.push(`#define HOOKED_pt MAIN_pt`);
    }
    return `${header.join("\n")}
${pass.body}
void main() { fragColor = hook(); }
`;
  }
  // --- internal: per-frame rendering --------------------------------------
  renderFrame() {
    const gl = this.gl;
    if (!gl || this.disabled) return;
    const vw = this.video.videoWidth;
    const vh = this.video.videoHeight;
    if (vw === 0 || vh === 0 || this.video.readyState < 2) return;
    this.uploadFrame(vw, vh);
    if (this.disabled) return;
    if (this.mode === "off" || this.chain.length === 0 || this.buildFailed) {
      this.blitToCanvas(this.inputTex, vw, vh);
      return;
    }
    gl.bindVertexArray(this.vao);
    gl.disable(gl.BLEND);
    const sizes = { [MAIN]: { w: vw, h: vh } };
    let mainReadTex = this.inputTex;
    let mainReadW = vw;
    let mainReadH = vh;
    let mainFloatIdx = 0;
    for (const cp of this.chain) {
      const { pass } = cp;
      const targetW = evalSizeExpr(pass.width, sizes);
      const targetH = evalSizeExpr(pass.height, sizes);
      let target;
      const savesToMain = pass.save === null || pass.save === MAIN;
      if (savesToMain) {
        target = this.getMainFloat(mainFloatIdx, targetW, targetH);
      } else {
        target = this.getNamed(pass.save, targetW, targetH);
      }
      gl.bindFramebuffer(gl.FRAMEBUFFER, target.fbo);
      gl.viewport(0, 0, target.w, target.h);
      gl.useProgram(cp.program);
      for (let u = 0; u < 8; u++) {
        gl.activeTexture(gl.TEXTURE0 + u);
        gl.bindTexture(gl.TEXTURE_2D, null);
      }
      cp.binds.forEach((b, unit) => {
        let tex;
        let bw;
        let bh;
        if (b.name === MAIN) {
          tex = mainReadTex;
          bw = mainReadW;
          bh = mainReadH;
        } else {
          const src = this.named.get(b.name);
          tex = src ? src.tex : null;
          bw = src ? src.w : 1;
          bh = src ? src.h : 1;
        }
        gl.activeTexture(gl.TEXTURE0 + unit);
        gl.bindTexture(gl.TEXTURE_2D, tex);
        if (b.sampler) gl.uniform1i(b.sampler, unit);
        if (b.size) gl.uniform2f(b.size, bw, bh);
        if (b.pt) gl.uniform2f(b.pt, 1 / bw, 1 / bh);
      });
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      if (savesToMain) {
        sizes[MAIN] = { w: target.w, h: target.h };
        mainReadTex = target.tex;
        mainReadW = target.w;
        mainReadH = target.h;
        mainFloatIdx = 1 - mainFloatIdx;
      } else {
        sizes[pass.save] = { w: target.w, h: target.h };
      }
    }
    this.blitToCanvas(mainReadTex, mainReadW, mainReadH);
  }
  uploadFrame(vw, vh) {
    const gl = this.gl;
    if (!gl) return;
    if (!this.inputTex) {
      this.inputTex = gl.createTexture();
      this.inputW = 0;
      this.inputH = 0;
    }
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, this.inputTex);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
    if (vw !== this.inputW || vh !== this.inputH) {
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      this.inputW = vw;
      this.inputH = vh;
    }
    try {
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.video);
    } catch (err) {
      if (err instanceof DOMException && err.name === "SecurityError") {
        this.disablePermanently(
          "video frame is cross-origin and cannot be sampled by WebGL"
        );
        return;
      }
      throw err;
    }
  }
  /**
   * Stop the loop and mark the renderer permanently disabled for this source.
   * Logs once and notifies the consumer so it can hide the canvas overlay and
   * let the raw <video> show through.
   */
  disablePermanently(reason) {
    var _a;
    if (this.disabled) return;
    this.disabled = true;
    this.disabledReason = reason;
    console.warn(`[Anime4K] disabled: ${reason}`);
    this.stop();
    (_a = this.onDisabled) == null ? void 0 : _a.call(this, reason);
  }
  blitToCanvas(tex, w, h) {
    const gl = this.gl;
    if (!gl || !this.passthroughProgram || !tex) return;
    if (this.canvas.width !== w || this.canvas.height !== h) {
      this.canvas.width = w;
      this.canvas.height = h;
    }
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    gl.viewport(0, 0, w, h);
    gl.useProgram(this.passthroughProgram);
    gl.bindVertexArray(this.vao);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, tex);
    if (this.passthroughTexLoc) gl.uniform1i(this.passthroughTexLoc, 0);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  }
  // --- internal: render-target management ---------------------------------
  getMainFloat(idx, w, h) {
    const existing = this.mainFloat[idx];
    if (existing && existing.w === w && existing.h === h) return existing;
    if (existing) this.deleteTarget(existing);
    const rt = this.createTarget(w, h);
    this.mainFloat[idx] = rt;
    return rt;
  }
  getNamed(name, w, h) {
    const existing = this.named.get(name);
    if (existing && existing.w === w && existing.h === h) return existing;
    if (existing) this.deleteTarget(existing);
    const rt = this.createTarget(w, h);
    this.named.set(name, rt);
    return rt;
  }
  createTarget(w, h) {
    const gl = this.gl;
    if (!gl) throw new Error("no GL context");
    const tex = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA16F, w, h, 0, gl.RGBA, gl.HALF_FLOAT, null);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    const fbo = gl.createFramebuffer();
    gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, tex, 0);
    const status = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    if (status !== gl.FRAMEBUFFER_COMPLETE) {
      gl.deleteTexture(tex);
      gl.deleteFramebuffer(fbo);
      throw new Error(`framebuffer incomplete (0x${status.toString(16)}) at ${w}x${h}`);
    }
    return { tex, fbo, w, h };
  }
  deleteTarget(rt) {
    const gl = this.gl;
    if (!gl) return;
    gl.deleteTexture(rt.tex);
    gl.deleteFramebuffer(rt.fbo);
  }
  disposeChain() {
    const gl = this.gl;
    if (gl) {
      for (const cp of this.chain) gl.deleteProgram(cp.program);
      for (const rt of this.named.values()) this.deleteTarget(rt);
      for (const rt of this.mainFloat) if (rt) this.deleteTarget(rt);
    }
    this.chain = [];
    this.named.clear();
    this.mainFloat = [null, null];
  }
  // --- internal: loop scheduling ------------------------------------------
  scheduleNext() {
    if (!this.running) return;
    if (this.useRvfc) {
      const rvfc = this.video.requestVideoFrameCallback;
      this.rvfcId = rvfc.call(this.video, () => this.onFrame());
    } else {
      this.rafId = requestAnimationFrame(() => this.onFrame());
    }
  }
  onFrame() {
    if (!this.running) return;
    try {
      this.renderFrame();
    } catch (err) {
      console.warn("[Anime4K] render error, falling back to passthrough:", err);
      this.buildFailed = true;
      try {
        this.blitToCanvas(this.inputTex, this.inputW, this.inputH);
      } catch {
      }
    }
    this.scheduleNext();
  }
  // --- internal: GL program helpers ---------------------------------------
  linkProgram(vsSrc, fsSrc) {
    const gl = this.gl;
    if (!gl) return null;
    const vs = this.compileShader(gl.VERTEX_SHADER, vsSrc);
    const fs = this.compileShader(gl.FRAGMENT_SHADER, fsSrc);
    if (!vs || !fs) {
      if (vs) gl.deleteShader(vs);
      if (fs) gl.deleteShader(fs);
      return null;
    }
    const program = gl.createProgram();
    if (!program) {
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      return null;
    }
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    gl.deleteShader(vs);
    gl.deleteShader(fs);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.warn("[Anime4K] program link failed:", gl.getProgramInfoLog(program));
      gl.deleteProgram(program);
      return null;
    }
    return program;
  }
  compileShader(type, src) {
    const gl = this.gl;
    if (!gl) return null;
    const shader = gl.createShader(type);
    if (!shader) return null;
    gl.shaderSource(shader, src);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.warn("[Anime4K] shader compile failed:", gl.getShaderInfoLog(shader), "\n", src);
      gl.deleteShader(shader);
      return null;
    }
    return shader;
  }
}
function PlaybackControls({
  isPlaying,
  isLive,
  timelineSeekingLocked,
  timelineUiHidden,
  onTogglePlay,
  onRefresh,
  onSkip
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        onClick: onTogglePlay,
        className: "p-2.5 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all video-controls-btn",
        children: isPlaying ? /* @__PURE__ */ jsxRuntimeExports.jsx(Pause, { className: "w-5 h-5 md:w-6 md:h-6" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "w-5 h-5 md:w-6 md:h-6 fill-current" })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        onClick: onRefresh,
        className: "p-2.5 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all video-controls-btn group",
        title: "Refresh stream",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { className: "w-4 h-4 md:w-5 md:h-5 group-active:-rotate-180 transition-transform duration-500" })
      }
    ),
    !isLive && !timelineUiHidden && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => onSkip(-10),
          disabled: timelineSeekingLocked,
          className: `p-2 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all hidden sm:flex video-controls-btn ${timelineSeekingLocked ? "cursor-not-allowed opacity-50 hover:bg-white/10" : ""}`,
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(SkipBack, { className: "w-4 h-4 md:w-5 md:h-5" })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => onSkip(10),
          disabled: timelineSeekingLocked,
          className: `p-2 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all hidden sm:flex video-controls-btn ${timelineSeekingLocked ? "cursor-not-allowed opacity-50 hover:bg-white/10" : ""}`,
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(SkipForward, { className: "w-4 h-4 md:w-5 md:h-5" })
        }
      )
    ] })
  ] });
}
function VolumeControl({
  volume,
  isMuted,
  onToggleMute,
  onVolumeChange
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden md:flex items-center gap-2 group/volume ml-1", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        onClick: onToggleMute,
        className: "p-2 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all video-controls-btn",
        children: isMuted || volume === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(VolumeX, { className: "w-5 h-5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Volume2, { className: "w-5 h-5" })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-0 group-hover/volume:w-24 overflow-hidden transition-all duration-300", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "input",
      {
        type: "range",
        min: "0",
        max: "1",
        step: "0.05",
        value: isMuted ? 0 : volume,
        onChange: onVolumeChange,
        className: "w-24 h-1.5 accent-primary cursor-pointer bg-white/20 rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer"
      }
    ) })
  ] });
}
function TimeDisplay({ currentTime, duration, timelineUiHidden }) {
  if (timelineUiHidden) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 ml-2 px-2.5 py-1.5 rounded-lg bg-white/10 backdrop-blur-sm", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs md:text-sm font-medium text-white/90", children: formatTime(currentTime) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/40", children: "/" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs md:text-sm text-white/60", children: formatTime(duration) })
  ] });
}
const SIZE_OPTIONS = [
  { value: "small", label: "S" },
  { value: "medium", label: "M" },
  { value: "large", label: "L" },
  { value: "xlarge", label: "XL" }
];
const FONT_OPTIONS = [
  { value: "default", label: "Default" },
  { value: "serif", label: "Serif" },
  { value: "mono", label: "Mono" }
];
const BG_OPTIONS = [
  { value: "none", label: "None" },
  { value: "semi", label: "Semi" },
  { value: "solid", label: "Solid" }
];
function SubtitleSelector({
  subtitles,
  customSubtitles,
  internalSubtitles,
  currentSubtitle,
  currentInternalSubtitleTrackId,
  subtitleBlobs,
  visibleSubtitleOptions,
  showSubtitleMenu,
  onToggleMenu,
  onSubtitleChange,
  onInternalSubtitleChange,
  onCustomUpload
}) {
  const { settings, updateSetting } = useVideoSettings();
  const fileInputRef = reactExports.useRef(null);
  if (subtitles.length === 0 && customSubtitles.length === 0 && internalSubtitles.length === 0) {
    return null;
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        onClick: onToggleMenu,
        className: `p-2 rounded-lg hover:bg-white/10 transition-colors pointer-events-auto ${currentSubtitle !== "off" ? "text-primary" : ""}`,
        title: "Subtitles",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Captions, { className: "w-4 h-4 md:w-5 md:h-5" })
      }
    ),
    showSubtitleMenu && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute bottom-full right-0 mb-2 bg-background/95 backdrop-blur-md border border-border rounded-xl p-3 min-w-[180px] md:min-w-[220px] max-h-[450px] overflow-y-auto pointer-events-auto shadow-2xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2", children: "Subtitles" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1 mb-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => {
              onSubtitleChange("off");
            },
            className: `w-full px-3 py-1.5 text-left text-xs md:text-sm rounded-lg hover:bg-muted transition-colors ${currentSubtitle === "off" ? "text-primary font-medium bg-primary/10" : "text-foreground"}`,
            children: "Off"
          }
        ),
        internalSubtitles.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pt-1 pb-0.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground", children: "Internal Tracks" }),
        internalSubtitles.map((sub) => {
          const isSelected = currentInternalSubtitleTrackId === sub.id;
          return /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: () => onInternalSubtitleChange(sub.id),
              className: `w-full px-3 py-1.5 text-left text-xs md:text-sm rounded-lg hover:bg-muted transition-colors ${isSelected ? "text-primary font-medium bg-primary/10" : "text-foreground"}`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate block max-w-[150px]", children: sub.label || sub.lang })
            },
            sub.id
          );
        }),
        visibleSubtitleOptions.map(({ sub, index }) => {
          const subtitleSelectionKey = getSubtitleSelectionKey(sub, index);
          const isSelected = currentSubtitle === subtitleSelectionKey;
          return /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: () => onSubtitleChange(subtitleSelectionKey),
              className: `w-full px-3 py-1.5 text-left text-xs md:text-sm rounded-lg hover:bg-muted transition-colors ${isSelected ? "text-primary font-medium bg-primary/10" : "text-foreground"}`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate block max-w-[150px]", children: sub.label || sub.lang })
            },
            subtitleSelectionKey
          );
        })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-px bg-border my-2" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-[10px] font-bold text-muted-foreground uppercase tracking-widest", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Type, { className: "w-3 h-3" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Style Settings" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground", children: "Size" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1", children: SIZE_OPTIONS.map((opt) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                onClick: () => updateSetting("subtitleSize", opt.value),
                className: `px-1.5 py-0.5 rounded text-[10px] font-bold border transition-all ${settings.subtitleSize === opt.value ? "bg-primary border-primary text-primary-foreground" : "bg-muted/30 border-transparent text-muted-foreground hover:bg-muted/50"}`,
                children: opt.label
              },
              opt.value
            )) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground", children: "Font" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1", children: FONT_OPTIONS.map((opt) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                onClick: () => updateSetting("subtitleFont", opt.value),
                className: `px-1.5 py-0.5 rounded text-[10px] font-bold border transition-all ${settings.subtitleFont === opt.value ? "bg-primary border-primary text-primary-foreground" : "bg-muted/30 border-transparent text-muted-foreground hover:bg-muted/50"}`,
                children: opt.label
              },
              opt.value
            )) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground", children: "BG" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1", children: BG_OPTIONS.map((opt) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                onClick: () => updateSetting("subtitleBackground", opt.value),
                className: `px-1.5 py-0.5 rounded text-[10px] font-bold border transition-all ${settings.subtitleBackground === opt.value ? "bg-primary border-primary text-primary-foreground" : "bg-muted/30 border-transparent text-muted-foreground hover:bg-muted/50"}`,
                children: opt.label
              },
              opt.value
            )) })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-px bg-border my-2" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "w-full px-3 py-1.5 text-left text-xs md:text-sm rounded-lg hover:bg-muted transition-colors text-foreground flex items-center gap-2 cursor-pointer group", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "w-3 h-3 group-hover:text-primary transition-colors" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Add Custom" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            ref: fileInputRef,
            type: "file",
            accept: ".vtt,.srt",
            className: "hidden",
            onChange: onCustomUpload
          }
        )
      ] })
    ] })
  ] });
}
function AudioTrackSelector({
  audioTracks,
  currentAudioTrack,
  showAudioMenu,
  onToggleMenu,
  onTrackChange
}) {
  if (audioTracks.length === 0) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        onClick: onToggleMenu,
        className: `p-2 rounded-lg hover:bg-white/10 transition-colors pointer-events-auto ${audioTracks.length > 1 ? "text-primary" : ""}`,
        title: "Audio Tracks",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Mic, { className: "w-4 h-4 md:w-5 md:h-5" })
      }
    ),
    showAudioMenu && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute bottom-full right-0 mb-2 bg-background/95 backdrop-blur-sm border border-border rounded-xl p-3 min-w-[150px] md:min-w-[180px] max-h-[300px] overflow-y-auto pointer-events-auto shadow-2xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2", children: "Audio Tracks" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1", children: audioTracks.map((track) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => onTrackChange(track.id),
          className: `w-full px-3 py-1.5 text-left text-xs md:text-sm rounded-lg hover:bg-muted transition-colors ${currentAudioTrack === track.id ? "text-primary font-medium bg-primary/10" : "text-foreground"}`,
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "truncate block", children: [
            track.label || `Track ${track.id}`,
            " (",
            track.lang || "und",
            ")"
          ] })
        },
        track.id
      )) })
    ] })
  ] });
}
const SPEED_OPTIONS = [0.5, 0.75, 1, 1.25, 1.5, 2];
function SpeedSelector({
  playbackRate,
  showSettings,
  onToggleMenu,
  onRateChange
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        onClick: onToggleMenu,
        className: "p-2 rounded-lg hover:bg-white/10 transition-colors",
        title: "Playback Speed",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Settings, { className: "w-4 h-4 md:w-5 md:h-5" })
      }
    ),
    showSettings && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute bottom-full right-0 mb-2 bg-background/95 backdrop-blur-sm border border-border rounded-xl p-2 min-w-[100px] md:min-w-[120px] shadow-2xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-bold text-muted-foreground uppercase tracking-wider px-2 py-1 mb-1", children: "Speed" }),
      SPEED_OPTIONS.map((rate) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: () => onRateChange(rate),
          className: `w-full px-3 py-1.5 text-left text-xs md:text-sm rounded-lg hover:bg-muted transition-colors ${playbackRate === rate ? "text-primary font-medium bg-primary/10" : "text-foreground"}`,
          children: [
            rate,
            "x"
          ]
        },
        rate
      ))
    ] })
  ] });
}
function FullscreenButton({ isFullscreen, onToggle }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "button",
    {
      onClick: onToggle,
      className: "p-2 rounded-lg hover:bg-white/10 transition-colors",
      title: "Toggle Fullscreen (F)",
      children: isFullscreen ? /* @__PURE__ */ jsxRuntimeExports.jsx(Minimize, { className: "w-4 h-4 md:w-5 md:h-5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Maximize, { className: "w-4 h-4 md:w-5 md:h-5" })
    }
  );
}
function ScreenshotButton({ videoRef, animeName, episodeNumber }) {
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
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "button",
    {
      onClick: handleScreenshot,
      className: "p-2 rounded-lg hover:bg-white/10 transition-colors",
      title: "Take Screenshot",
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Camera, { className: "w-4 h-4 md:w-5 md:h-5" })
    }
  );
}
function unwrapForDownload(url, hdrs) {
  const snap = readProxyQuerySnapshot(url);
  const raw = snap.streamUrl && /^https?:/i.test(snap.streamUrl) ? snap.streamUrl : url;
  const merged = { ...hdrs || {} };
  if (snap.referer && !merged.Referer && !merged.referer) merged.Referer = snap.referer;
  if (snap.userAgent && !merged["User-Agent"] && !merged["user-agent"]) {
    merged["User-Agent"] = snap.userAgent;
  }
  return { url: raw, headers: Object.keys(merged).length ? merged : void 0 };
}
function DownloadButton({
  episodeId,
  animeName,
  episodeNumber,
  posterUrl,
  sourceUrl,
  sourceType,
  torrentUrl,
  headers,
  animeId,
  subtitles
}) {
  const { isEnabled, downloadStates, startDownload } = useDownload();
  const sourceTypeNorm = String(sourceType || "").toLowerCase();
  const isTorrentSource = sourceTypeNorm === "torrent" || sourceTypeNorm === "debrid" || Boolean(sourceUrl == null ? void 0 : sourceUrl.startsWith("magnet:"));
  const isTorrent = isTorrentSource;
  const effectiveUrl = isTorrent ? torrentUrl || sourceUrl : sourceUrl;
  const state = episodeId ? downloadStates[episodeId] : void 0;
  const status = state == null ? void 0 : state.status;
  const progress = Math.round((state == null ? void 0 : state.progress) ?? 0);
  const numericAnimeId = reactExports.useMemo(() => {
    const n = Number(animeId);
    return Number.isFinite(n) && n > 0 ? n : void 0;
  }, [animeId]);
  const downloadableSubtitles = reactExports.useMemo(() => {
    if (!(subtitles == null ? void 0 : subtitles.length)) return void 0;
    const out = subtitles.filter((s) => {
      const u = String((s == null ? void 0 : s.url) || "").trim();
      if (!u) return false;
      const lang = String((s == null ? void 0 : s.lang) || (s == null ? void 0 : s.language) || (s == null ? void 0 : s.label) || "").trim().toLowerCase();
      if (!lang) return false;
      if (/thumbnail/i.test(lang) || /thumbnail/i.test(u)) return false;
      return true;
    }).map((s) => ({ ...s, url: String(s.url).trim() }));
    return out.length ? out : void 0;
  }, [subtitles]);
  const busy = status === "queued" || status === "downloading";
  const startNow = reactExports.useCallback(async () => {
    if (busy) return;
    if (!episodeId) {
      ue.error("Can't download: episode is not identified yet");
      return;
    }
    if (!effectiveUrl) {
      ue.error(
        isTorrent ? "Torrent source not ready to download yet" : "No stream URL to download"
      );
      return;
    }
    const dl = isTorrent ? { url: effectiveUrl, headers } : unwrapForDownload(effectiveUrl, headers);
    const res = await startDownload({
      episodeId,
      animeName: animeName || "Anime",
      episodeNumber: episodeNumber ?? 0,
      url: dl.url,
      headers: dl.headers,
      posterUrl,
      animeId: numericAnimeId,
      subtitles: downloadableSubtitles
    });
    if (res.ok) {
      ue.success(`Downloading ${animeName || "episode"}${episodeNumber ? ` · Ep ${episodeNumber}` : ""}`);
      return;
    }
    switch (res.reason) {
      case "missing_download_path":
        ue.error("Set a download folder in the Offline Library first");
        break;
      case "feature_disabled":
        ue.error("Downloads are disabled");
        break;
      case "missing_stream_url":
        ue.error("No stream URL to download");
        break;
      case "mobile_download_failed": {
        const detail = typeof res.error === "string" ? String(res.error) : "";
        if (detail.includes("already_downloading")) ue.info("Already downloading");
        else ue.error(detail || "Download failed");
        break;
      }
      case "ipc_error":
        ue.error(typeof res.error === "string" ? res.error : "Failed to start download");
        break;
      default:
        ue.error("Downloads are only available on desktop");
    }
  }, [busy, episodeId, effectiveUrl, isTorrent, headers, startDownload, animeName, episodeNumber, posterUrl, numericAnimeId, downloadableSubtitles]);
  const handleClick = () => {
    void startNow();
  };
  const autoFiredRef = reactExports.useRef(false);
  reactExports.useEffect(() => {
    if (autoFiredRef.current || busy || status === "completed" || !effectiveUrl || !episodeId) return;
    if (numericAnimeId == null || episodeNumber == null) return;
    let enabled = false;
    try {
      enabled = loadMobileConfig().autoDownloadNext === true;
    } catch {
      return;
    }
    if (!enabled) return;
    let intent = null;
    try {
      intent = peekAutoDownloadNext();
    } catch {
      return;
    }
    if (!intent || Number(intent.animeId) !== numericAnimeId || Number(intent.nextEpisode) !== Number(episodeNumber)) return;
    if (isWifiOnlyBlocked()) return;
    autoFiredRef.current = true;
    try {
      consumeAutoDownloadNext(numericAnimeId);
    } catch {
    }
    ue.success(`Auto-downloading Ep ${episodeNumber} on WiFi`);
    void startNow();
  }, [busy, status, effectiveUrl, episodeId, episodeNumber, numericAnimeId, startNow]);
  if (!isEnabled) return null;
  let icon = /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-4 h-4 md:w-5 md:h-5" });
  let title = "Download episode";
  if (status === "downloading") {
    icon = /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 md:w-5 md:h-5 animate-spin text-primary" });
    title = `Downloading… ${progress}%`;
  } else if (status === "queued") {
    icon = /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 md:w-5 md:h-5 animate-spin" });
    title = "Queued…";
  } else if (status === "completed") {
    icon = /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-4 h-4 md:w-5 md:h-5 text-green-400" });
    title = "Downloaded — click to download again";
  } else if (status === "failed") {
    icon = /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCw, { className: "w-4 h-4 md:w-5 md:h-5 text-red-400" });
    title = (state == null ? void 0 : state.error) ? `Failed: ${state.error} — retry` : "Download failed — retry";
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "button",
    {
      onClick: handleClick,
      disabled: busy,
      className: "relative p-2 rounded-lg hover:bg-white/10 transition-colors disabled:cursor-default",
      title,
      children: [
        icon,
        status === "downloading" && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute -bottom-0.5 -right-0.5 text-[9px] font-semibold leading-none text-primary bg-black/70 rounded px-0.5", children: progress })
      ]
    }
  );
}
function ExternalPlayerButton({
  videoRef,
  externalPlayerPath,
  currentSourceUrl,
  isPlaying,
  animeName,
  episodeNumber,
  episodeTitle
}) {
  const handleLaunchExternal = async () => {
    var _a, _b;
    if (!externalPlayerPath || !currentSourceUrl) return;
    try {
      const rt = window.tatakaiRuntime;
      const res = await rt.launchExternalPlayer({
        executablePath: externalPlayerPath,
        streamUrl: currentSourceUrl,
        options: {
          startTime: ((_a = videoRef.current) == null ? void 0 : _a.currentTime) || 0,
          title: `${animeName || "Tatakai"} - ${episodeNumber ? `Episode ${episodeNumber}` : ""} ${episodeTitle || ""}`.trim()
        }
      });
      if (res.success) {
        ue.success(`Launched ${res.player || "external player"}`);
        if (isPlaying) (_b = videoRef.current) == null ? void 0 : _b.pause();
      } else {
        ue.error(res.error || "Failed to launch external player");
      }
    } catch (err) {
      ue.error(err.message || "Error launching external player");
    }
  };
  if (!externalPlayerPath || !currentSourceUrl) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "button",
    {
      onClick: handleLaunchExternal,
      className: "p-2 rounded-lg hover:bg-white/10 transition-colors text-blue-400",
      title: "Play in External Player",
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(MonitorPlay, { className: "w-4 h-4 md:w-5 md:h-5" })
    }
  );
}
function SkipButton({
  activeSkip,
  timelineSeekingLocked,
  onSkip,
  getSkipLabel
}) {
  if (!activeSkip) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "button",
    {
      onClick: onSkip,
      className: `absolute bottom-24 md:bottom-28 right-4 md:right-6 px-5 py-3 md:px-6 md:py-3.5 rounded-xl bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white font-bold flex items-center gap-2.5 shadow-2xl transition-all animate-in slide-in-from-right-5 z-20 skip-button-glow border border-white/20 ${timelineSeekingLocked ? "cursor-not-allowed opacity-60" : "hover:scale-105"}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FastForward, { className: "w-5 h-5 md:w-6 md:h-6" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm md:text-base uppercase tracking-wide", children: getSkipLabel(activeSkip.skipType) })
      ]
    }
  );
}
const SHORTCUTS = [
  { key: "Space / K", label: "Play / Pause", category: "playback" },
  { key: "F", label: "Fullscreen", category: "playback" },
  { key: "M", label: "Mute", category: "volume" },
  { key: "←", label: "Seek -10s", category: "navigation" },
  { key: "→", label: "Seek +10s", category: "navigation" },
  { key: "↑", label: "Volume Up", category: "volume" },
  { key: "↓", label: "Volume Down", category: "volume" },
  { key: "I", label: "Picture-in-Picture", category: "other" }
];
function KeyboardShortcutOverlay({ isVisible, onClose }) {
  if (!isVisible) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm",
      onClick: onClose,
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "bg-background/95 border border-border rounded-2xl p-6 max-w-md w-full mx-4 shadow-2xl",
          onClick: (e) => e.stopPropagation(),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Keyboard, { className: "w-5 h-5 text-primary" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-semibold", children: "Keyboard Shortcuts" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: ["playback", "navigation", "volume", "other"].map((category) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2", children: category }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1.5", children: SHORTCUTS.filter((s) => s.category === category).map((shortcut) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-foreground", children: shortcut.label }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("kbd", { className: "px-2 py-0.5 rounded bg-muted text-xs font-mono text-muted-foreground", children: shortcut.key })
              ] }, shortcut.key)) })
            ] }, category)) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                onClick: onClose,
                className: "mt-5 w-full py-2 rounded-xl bg-muted hover:bg-muted/80 text-sm font-medium transition-colors",
                children: "Close (Press ? again)"
              }
            )
          ]
        }
      )
    }
  );
}
function LoadingOverlay({ isVisible, serverName }) {
  if (!isVisible) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 md:w-20 md:h-20 rounded-full border-4 border-primary/30 border-t-primary animate-spin" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "w-6 h-6 md:w-8 md:h-8 text-primary/70" }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm md:text-base text-white/80 font-medium", children: serverName ? `Loading ${serverName}...` : "Loading..." })
  ] }) });
}
function ErrorOverlay({
  videoError,
  isOffline,
  isBuffering,
  videoSrc,
  videoErrorObj,
  onRetry,
  onRefresh,
  onServerSwitch
}) {
  if (!videoError) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 flex items-center justify-center bg-black/90 backdrop-blur-sm z-50", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-4 text-center p-6 md:p-10 max-w-md", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 md:w-20 md:h-20 rounded-full bg-destructive/20 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-8 h-8 md:w-10 md:h-10 text-destructive" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-base md:text-lg text-white font-semibold", children: videoError }),
    isOffline && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-white/50 bg-black/50 p-2 rounded mt-2 font-mono break-all max-w-[300px]", children: [
      "Debug: ",
      videoSrc || "No Source",
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
      "Error: ",
      (videoErrorObj == null ? void 0 : videoErrorObj.message) || (videoErrorObj == null ? void 0 : videoErrorObj.code) || "Unknown"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-white/60", children: videoError.toLowerCase().includes("auto-switching") || videoError.toLowerCase().includes("switching server") ? "Auto-switching to the next server in 3 seconds..." : videoError.toLowerCase().includes("retrying") ? "Retrying automatically..." : "Automatic server failover is enabled." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-3 mt-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: onRetry,
          className: "px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed backdrop-blur-sm flex items-center justify-center gap-2 transition-all font-medium video-controls-btn",
          disabled: isBuffering,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-4 h-4" }),
            "Retry Current Server"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: onRefresh,
          className: "px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center gap-2 transition-all font-medium video-controls-btn",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { className: "w-4 h-4" }),
            "Refresh Player"
          ]
        }
      ),
      onServerSwitch && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: onServerSwitch,
          className: "px-5 py-2.5 rounded-xl bg-primary hover:bg-primary/80 text-primary-foreground flex items-center justify-center gap-2 transition-all font-medium shadow-lg shadow-primary/30",
          children: "Switch Server"
        }
      )
    ] })
  ] }) });
}
function CenterPlayButton({ isVisible, onClick }) {
  if (!isVisible) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "button",
    {
      onClick,
      className: "absolute inset-0 flex items-center justify-center bg-gradient-to-t from-black/50 via-transparent to-black/20",
      children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 md:w-24 md:h-24 rounded-full bg-primary/90 flex items-center justify-center hover:scale-110 transition-all duration-300 shadow-2xl shadow-primary/40 backdrop-blur-sm border border-white/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "w-8 h-8 md:w-10 md:h-10 text-white fill-current ml-1" }) })
    }
  );
}
function ViewCountBadge({ viewCount, isVisible }) {
  if (!isVisible || viewCount <= 0) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute top-3 right-3 md:top-4 md:right-4 flex items-center gap-1.5 px-3 py-2 rounded-xl bg-black/70 backdrop-blur-md text-white/90 text-xs md:text-sm font-medium z-10 transition-all duration-300 border border-white/10", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-3.5 h-3.5 md:w-4 md:h-4 text-primary" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold", children: viewCount >= 1e3 ? `${(viewCount / 1e3).toFixed(1)}K` : viewCount }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/50 hidden sm:inline", children: "views" })
  ] });
}
const RING_RADIUS = 22;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;
function UpNextOverlay({
  secondsLeft,
  total,
  title,
  thumbnail,
  episodeNumber,
  onPlayNow,
  onCancel
}) {
  const clampedTotal = Math.max(1, total);
  const progress = Math.min(1, Math.max(0, secondsLeft / clampedTotal));
  const dashOffset = RING_CIRCUMFERENCE * (1 - progress);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute inset-0 z-40 flex items-end justify-end p-4 md:p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pointer-events-auto w-full max-w-sm overflow-hidden rounded-2xl border border-white/10 bg-black/80 shadow-[0_20px_60px_rgba(0,0,0,0.6)] backdrop-blur-xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-stretch gap-3 p-3", children: [
      thumbnail ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative shrink-0 overflow-hidden rounded-lg", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: thumbnail,
            alt: "",
            className: "h-20 w-32 object-cover",
            loading: "lazy"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 flex items-center justify-center bg-black/30", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "h-6 w-6 text-white drop-shadow", fill: "currentColor" }) })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex h-20 w-32 shrink-0 items-center justify-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { viewBox: "0 0 52 52", className: "h-14 w-14 -rotate-90", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "circle",
            {
              cx: "26",
              cy: "26",
              r: RING_RADIUS,
              fill: "none",
              stroke: "rgba(255,255,255,0.15)",
              strokeWidth: "4"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "circle",
            {
              cx: "26",
              cy: "26",
              r: RING_RADIUS,
              fill: "none",
              stroke: "hsl(var(--primary))",
              strokeWidth: "4",
              strokeLinecap: "round",
              strokeDasharray: RING_CIRCUMFERENCE,
              strokeDashoffset: dashOffset,
              style: { transition: "stroke-dashoffset 1s linear" }
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute text-lg font-bold tabular-nums text-white", children: secondsLeft })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-w-0 flex-1 flex-col justify-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[11px] font-semibold uppercase tracking-wide text-primary", children: [
          "Up Next",
          thumbnail ? ` · ${secondsLeft}s` : ""
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate text-sm font-semibold text-white", children: typeof episodeNumber === "number" ? `Episode ${episodeNumber}` : "Next Episode" }),
        title && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate text-xs text-white/60", children: title })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 border-t border-white/10 p-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: onPlayNow,
          className: "flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "h-4 w-4", fill: "currentColor" }),
            "Play now"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: onCancel,
          className: "flex items-center justify-center gap-1.5 rounded-lg bg-white/10 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-white/20",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" }),
            "Cancel"
          ]
        }
      )
    ] })
  ] }) });
}
function DoubleTapSeek({ onSeek, children }) {
  var _a;
  const [ripple, setRipple] = reactExports.useState(null);
  const lastTapRef = reactExports.useRef(null);
  const rippleIdRef = reactExports.useRef(0);
  const handleTouchEnd = reactExports.useCallback(
    (e) => {
      const touch = e.changedTouches[0];
      if (!touch) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const x = touch.clientX - rect.left;
      const width = rect.width;
      const side = x < width / 3 ? "left" : x > width * 2 / 3 ? "right" : "center";
      if (side === "center") return;
      const now = Date.now();
      const lastTap = lastTapRef.current;
      if (lastTap && lastTap.side === side && now - lastTap.time < 300) {
        onSeek(side === "left" ? "backward" : "forward");
        rippleIdRef.current += 1;
        setRipple({ side, x: touch.clientX - rect.left, y: touch.clientY - rect.top, id: rippleIdRef.current });
        setTimeout(() => setRipple(null), 600);
        lastTapRef.current = null;
      } else {
        lastTapRef.current = { time: now, side };
      }
    },
    [onSeek]
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full h-full", onTouchEnd: handleTouchEnd, children: [
    children,
    ripple && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: `absolute top-0 bottom-0 w-1/3 pointer-events-none ${ripple.side === "left" ? "left-0" : "right-0"}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute rounded-full bg-white/20 animate-ping",
              style: {
                left: ripple.side === "left" ? ripple.x - 30 : void 0,
                right: ripple.side === "right" ? ((_a = ripple.parentElement) == null ? void 0 : _a.offsetWidth) - ripple.x - 30 : void 0,
                top: ripple.y - 30,
                width: 60,
                height: 60
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute flex items-center justify-center text-white font-bold text-lg",
              style: {
                left: ripple.side === "left" ? "50%" : void 0,
                right: ripple.side === "right" ? "50%" : void 0,
                top: "50%",
                transform: "translate(-50%, -50%)"
              },
              children: ripple.side === "left" ? "−10s" : "+10s"
            }
          )
        ]
      },
      ripple.id
    )
  ] });
}
function LongPressSpeed({ onLongPressStart, onLongPressEnd, children }) {
  const [isActive, setIsActive] = reactExports.useState(false);
  const longPressTimerRef = reactExports.useRef(null);
  const isLongPressRef = reactExports.useRef(false);
  const handleTouchStart = reactExports.useCallback(
    (e) => {
      isLongPressRef.current = false;
      longPressTimerRef.current = setTimeout(() => {
        isLongPressRef.current = true;
        setIsActive(true);
        onLongPressStart();
      }, 500);
    },
    [onLongPressStart]
  );
  const handleTouchEnd = reactExports.useCallback(() => {
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current);
      longPressTimerRef.current = null;
    }
    if (isLongPressRef.current) {
      setIsActive(false);
      onLongPressEnd();
      isLongPressRef.current = false;
    }
  }, [onLongPressEnd]);
  const handleTouchMove = reactExports.useCallback(() => {
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current);
      longPressTimerRef.current = null;
    }
  }, []);
  reactExports.useEffect(() => {
    return () => {
      if (longPressTimerRef.current) {
        clearTimeout(longPressTimerRef.current);
      }
    };
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "relative w-full h-full",
      onTouchStart: handleTouchStart,
      onTouchEnd: handleTouchEnd,
      onTouchMove: handleTouchMove,
      children: [
        children,
        isActive && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-4 left-1/2 -translate-x-1/2 z-30 pointer-events-none", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-primary/90 backdrop-blur-sm rounded-full px-4 py-1.5 text-white text-xs font-bold shadow-lg animate-pulse", children: "2x Speed" }) })
      ]
    }
  );
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
    return sources.find(
      (source) => String(source.quality || "").toLowerCase() === preferredQuality
    ) || sources[0];
  }
  const candidates = sources.map((source) => ({ source, score: parseQualityScore(source.quality) })).filter(
    (entry) => entry.score != null
  ).sort((left, right) => {
    const distanceDiff = Math.abs(left.score - preferredScore) - Math.abs(right.score - preferredScore);
    if (distanceDiff !== 0) return distanceDiff;
    return right.score - left.score;
  });
  if (candidates.length > 0) return candidates[0].source;
  return sources.find(
    (source) => String(source.quality || "").toLowerCase() === preferredQuality
  ) || sources[0];
}
function isTransientTorrentStartupError(message) {
  const normalized = String(message || "").toLowerCase();
  return normalized.includes("demuxer_error_could_not_open") || normalized.includes("open context failed") || normalized.includes("invalid data found when processing input") || normalized.includes("end of file") || normalized.includes("read error") || normalized.includes("duplicate element") || normalized.includes("could not open");
}
const FS_HINT_SEEN_KEY = "tatakai:player:fs-hint-seen";
const DBL_CLICK_DELAY_MS = 260;
function VideoPlayer({
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
  onPreviousEpisode,
  onNextEpisode,
  malId,
  episodeNumber,
  introWindow,
  outroWindow,
  viewCount,
  onProgressUpdate,
  animeId,
  animeName,
  animePoster,
  episodeId,
  initialSeekSeconds,
  externalRef,
  onPlay,
  onPause,
  isLive,
  isTimelineLocked = false,
  timelineLockReason = "Seeking unlocks after the torrent has fully downloaded and verified.",
  hideTimelineUi = false,
  episodeTitle,
  isOffline,
  torrentStats,
  torrentSessionId,
  onTorrentRepair,
  onTorrentStop,
  nextEpisodeTitle,
  nextEpisodeThumbnail,
  nextEpisodeNumber
}) {
  var _a, _b, _c;
  const videoRef = reactExports.useRef(null);
  const containerRef = reactExports.useRef(null);
  const controlsOverlayRef = reactExports.useRef(null);
  const hlsRef = reactExports.useRef(null);
  const ambientCanvasRef = reactExports.useRef(null);
  const anime4kCanvasRef = reactExports.useRef(null);
  const anime4kRendererRef = reactExports.useRef(null);
  const [anime4kDisabled, setAnime4kDisabled] = reactExports.useState(false);
  const [upNextCountdown, setUpNextCountdown] = reactExports.useState(null);
  reactExports.useEffect(() => {
    if (externalRef) {
      externalRef.current = videoRef.current;
    }
  }, [externalRef]);
  reactExports.useEffect(() => {
    return () => {
      if (clickTimerRef.current) window.clearTimeout(clickTimerRef.current);
      if (hintTimeoutRef.current) window.clearTimeout(hintTimeoutRef.current);
    };
  }, []);
  reactExports.useEffect(() => {
    registerGlobalVideo(videoRef.current, window.location.pathname, {
      animeName: animeName ?? void 0,
      animePoster: poster ?? void 0
    });
    return () => registerGlobalVideo(null);
  }, []);
  const { settings } = useVideoSettings();
  const isNative = useIsNativeApp();
  const currentSource = reactExports.useMemo(
    () => selectPreferredSource(sources, settings.defaultQuality),
    [sources, settings.defaultQuality]
  );
  const [isPlaying, setIsPlaying] = reactExports.useState(false);
  const [currentTime, setCurrentTime] = reactExports.useState(0);
  const currentTimeRef = reactExports.useRef(0);
  reactExports.useEffect(() => {
    currentTimeRef.current = currentTime;
  }, [currentTime]);
  const [duration, setDuration] = reactExports.useState(0);
  const [volume, setVolume] = reactExports.useState(settings.volume);
  const [isMuted, setIsMuted] = reactExports.useState(false);
  const [buffered, setBuffered] = reactExports.useState(0);
  const [videoError, setVideoError] = reactExports.useState(null);
  const [isBuffering, setIsBuffering] = reactExports.useState(false);
  const [playbackRate, setPlaybackRate] = reactExports.useState(settings.playbackSpeed);
  const [isMobile, setIsMobile] = reactExports.useState(false);
  const [currentSubtitle, setCurrentSubtitle] = reactExports.useState(settings.subtitleLanguage);
  const [audioTracks, setAudioTracks] = reactExports.useState([]);
  const [currentAudioTrack, setCurrentAudioTrack] = reactExports.useState(0);
  const [extractedAudioUrls, setExtractedAudioUrls] = reactExports.useState({});
  const [activeExtractedAudioTrack, setActiveExtractedAudioTrack] = reactExports.useState(null);
  const [internalSubtitles, setInternalSubtitles] = reactExports.useState([]);
  const [customSubtitles, setCustomSubtitles] = reactExports.useState([]);
  const [subtitleBlobs, setSubtitleBlobs] = reactExports.useState({});
  const [activeSkip, setActiveSkip] = reactExports.useState(null);
  const [showSettingsPanel, setShowSettingsPanel] = reactExports.useState(false);
  const [showSubtitleMenu, setShowSubtitleMenu] = reactExports.useState(false);
  const [showAudioMenu, setShowAudioMenu] = reactExports.useState(false);
  const [showSettings, setShowSettings] = reactExports.useState(false);
  const [hoverTime, setHoverTime] = reactExports.useState(0);
  const [showHoverTime, setShowHoverTime] = reactExports.useState(false);
  const [hoverPercent, setHoverPercent] = reactExports.useState(0);
  const [externalPlayerPath, setExternalPlayerPath] = reactExports.useState(null);
  const [showShortcuts, setShowShortcuts] = reactExports.useState(false);
  const [originalSpeed, setOriginalSpeed] = reactExports.useState(1);
  const [showFsHint, setShowFsHint] = reactExports.useState(false);
  const clickTimerRef = reactExports.useRef(null);
  const hintTimeoutRef = reactExports.useRef(null);
  const { skipTimes, fetchSkipTimes, getSkipLabel } = useAniskip();
  const tatakaiSkipTimes = reactExports.useMemo(() => {
    const windows = [];
    if (introWindow && Number.isFinite(introWindow.start) && Number.isFinite(introWindow.end) && introWindow.end > introWindow.start) {
      windows.push({
        interval: { startTime: introWindow.start, endTime: introWindow.end },
        skipType: "op",
        skipId: `tatakai-op-${episodeId || episodeNumber || "current"}`,
        episodeLength: 0
      });
    }
    if (outroWindow && Number.isFinite(outroWindow.start) && Number.isFinite(outroWindow.end) && outroWindow.end > outroWindow.start) {
      windows.push({
        interval: { startTime: outroWindow.start, endTime: outroWindow.end },
        skipType: "ed",
        skipId: `tatakai-ed-${episodeId || episodeNumber || "current"}`,
        episodeLength: 0
      });
    }
    return windows;
  }, [introWindow == null ? void 0 : introWindow.start, introWindow == null ? void 0 : introWindow.end, outroWindow == null ? void 0 : outroWindow.start, outroWindow == null ? void 0 : outroWindow.end, episodeId, episodeNumber]);
  const hasTatakaiSkipWindows = tatakaiSkipTimes.length > 0;
  const effectiveSkipTimes = hasTatakaiSkipWindows ? tatakaiSkipTimes : skipTimes;
  const hasTatakaiSkipWindowsRef = reactExports.useRef(hasTatakaiSkipWindows);
  reactExports.useEffect(() => {
    hasTatakaiSkipWindowsRef.current = hasTatakaiSkipWindows;
  }, [hasTatakaiSkipWindows]);
  const resolvedPoster = poster ? getProxiedImageUrl(poster) : void 0;
  const timelineSeekingLocked = Boolean(isTimelineLocked && !isLive);
  const timelineUiHidden = Boolean(hideTimelineUi && !isLive);
  const timelineSeekingLockedRef = reactExports.useRef(timelineSeekingLocked);
  const timelineLockReasonRef = reactExports.useRef(timelineLockReason);
  reactExports.useEffect(() => {
    timelineSeekingLockedRef.current = timelineSeekingLocked;
    timelineLockReasonRef.current = timelineLockReason;
  }, [timelineSeekingLocked, timelineLockReason]);
  const showTimelineLockHint = reactExports.useCallback(() => {
    ue.info(timelineLockReasonRef.current || "Seeking is temporarily locked.", {
      id: "torrent-timeline-locked"
    });
  }, []);
  const {
    togglePlay,
    toggleMute,
    changeVolume,
    handleVolumeChange,
    skip,
    handlePlaybackRateChange,
    handleRefresh
  } = useVideoControls({
    videoRef,
    isPlaying,
    isMuted,
    volume,
    duration,
    currentTime,
    playbackRate,
    timelineSeekingLocked,
    showTimelineLockHint,
    setIsPlaying,
    setIsMuted,
    setVolume,
    setPlaybackRate,
    onPlay,
    onPause
  });
  const { isFullscreen, toggleFullscreen } = useVideoFullscreen({
    containerRef,
    isMobile
  });
  const { togglePiP } = useVideoPiP({
    videoRef,
    isMobile,
    isPlaying
  });
  const hideFsHintSoon = reactExports.useCallback(() => {
    if (hintTimeoutRef.current) window.clearTimeout(hintTimeoutRef.current);
    hintTimeoutRef.current = window.setTimeout(() => setShowFsHint(false), 3500);
  }, []);
  const handleVideoClick = reactExports.useCallback(() => {
    if (isMobile) {
      togglePlay();
      return;
    }
    if (clickTimerRef.current) {
      window.clearTimeout(clickTimerRef.current);
      clickTimerRef.current = null;
      setShowFsHint(false);
      try {
        localStorage.setItem(FS_HINT_SEEN_KEY, "1");
      } catch {
      }
      void toggleFullscreen();
      return;
    }
    clickTimerRef.current = window.setTimeout(() => {
      clickTimerRef.current = null;
      togglePlay();
      if (isDesktop()) {
        let seen = false;
        try {
          seen = localStorage.getItem(FS_HINT_SEEN_KEY) === "1";
        } catch {
        }
        if (!seen) {
          setShowFsHint(true);
          hideFsHintSoon();
        }
      }
    }, DBL_CLICK_DELAY_MS);
  }, [isMobile, togglePlay, toggleFullscreen, hideFsHintSoon]);
  const {
    getShowControls,
    setShowControls: setControlsVisible,
    showControlsTemporarily
  } = useControlsVisibility({ isPlaying, isMobile });
  const { keybinds } = useKeybinds();
  useVideoKeyboard({
    isMobile,
    timelineSeekingLocked,
    keybinds,
    togglePlay,
    toggleFullscreen,
    toggleMute,
    togglePiP,
    skip,
    changeVolume,
    onPrevEpisode: onPreviousEpisode,
    onNextEpisode
  });
  const {
    handleSubtitleChange,
    handleCustomSubtitleUpload,
    visibleSubtitleOptions,
    currentInternalSubtitleTrackId,
    allRenderedSubtitles
  } = useSubtitleManager({
    videoRef,
    subtitles,
    customSubtitles,
    internalSubtitles,
    currentSubtitle,
    subtitleBlobs,
    isOffline: Boolean(isOffline),
    headers,
    sourceKey: (currentSource == null ? void 0 : currentSource.url) || "",
    settings,
    setCurrentSubtitle,
    setCustomSubtitles,
    setSubtitleBlobs
  });
  const activeCueLines = useActiveCues(videoRef, `${(currentSource == null ? void 0 : currentSource.url) || ""}|${currentSubtitle}`, settings.subtitleOffset);
  reactExports.useEffect(() => {
    void ensureCustomSubtitleFontLoaded();
  }, []);
  useStableVolume(videoRef, settings.stableVolume && !isOffline);
  useSleepTimer(videoRef, settings.sleepTimer);
  useAmbientMode(videoRef, ambientCanvasRef, settings.ambientMode, isPlaying);
  const handleInternalSubtitleLoad = reactExports.useCallback(
    async (trackId) => {
      var _a2, _b2;
      const video = videoRef.current;
      if (!video) return;
      const runtime = window.tatakaiRuntime;
      if (!(runtime == null ? void 0 : runtime.extractSubtitle)) {
        ue.error("Internal subtitle extraction not available");
        return;
      }
      const sub = internalSubtitles.find((s) => s.id === trackId);
      if (!sub) return;
      const sessionId = new URLSearchParams(window.location.search).get("sessionId");
      const isTorrentSource = Boolean(
        sessionId && ((currentSource == null ? void 0 : currentSource.sourceType) === "torrent" || ((_a2 = currentSource == null ? void 0 : currentSource.url) == null ? void 0 : _a2.startsWith("magnet:")))
      );
      let probeUrl = (currentSource == null ? void 0 : currentSource.url) || "";
      if (video.src) probeUrl = video.src;
      try {
        if (isTorrentSource && sessionId && runtime.getTorrentFilePath) {
          const pathRes = await runtime.getTorrentFilePath(sessionId);
          if ((pathRes == null ? void 0 : pathRes.success) && (pathRes == null ? void 0 : pathRes.path)) probeUrl = pathRes.path;
        }
      } catch {
      }
      ue.loading(`Loading ${sub.label || sub.lang} subtitle...`, { id: "internal-sub-load" });
      try {
        const result = await runtime.extractSubtitle(probeUrl, trackId);
        ue.dismiss("internal-sub-load");
        if (!(result == null ? void 0 : result.success) || !(result == null ? void 0 : result.url)) {
          ue.error((result == null ? void 0 : result.error) || "Failed to extract subtitle");
          return;
        }
        let subtitleUrl = String(result.url || "").trim();
        if (!/^https?:\/\//i.test(subtitleUrl) && !subtitleUrl.startsWith("file://") && !subtitleUrl.startsWith("data:") && !subtitleUrl.startsWith("tatakai-media://") && /^[A-Za-z]:\\|\\\\/.test(subtitleUrl)) {
          subtitleUrl = `file:///${subtitleUrl.replace(/\\/g, "/")}`;
        }
        let text;
        if (subtitleUrl.startsWith("data:")) {
          const commaIndex = subtitleUrl.indexOf(",");
          text = decodeURIComponent(subtitleUrl.slice(commaIndex + 1));
        } else {
          const res = await fetch(subtitleUrl);
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          text = await res.text();
        }
        const blob = new Blob([text], { type: "text/vtt" });
        const blobUrl = URL.createObjectURL(blob);
        const existingTracks = Array.from(video.textTracks);
        for (let i = video.children.length - 1; i >= 0; i--) {
          const child = video.children[i];
          if (child.kind === "subtitles" && ((_b2 = child.dataset) == null ? void 0 : _b2.internal) === "true") {
            video.removeChild(child);
          }
        }
        const trackEl = document.createElement("track");
        trackEl.kind = "subtitles";
        trackEl.label = sub.label || sub.lang;
        trackEl.srclang = sub.lang || "und";
        trackEl.src = blobUrl;
        trackEl.dataset.internal = "true";
        video.appendChild(trackEl);
        const newTrack = trackEl.track;
        newTrack.mode = "hidden";
        for (let i = 0; i < video.textTracks.length; i++) {
          const t = video.textTracks[i];
          if (t !== newTrack) {
            t.mode = "disabled";
          }
        }
        setCurrentSubtitle(`internal:${trackId}`);
        ue.success(`Loaded ${sub.label || sub.lang} subtitle`);
      } catch (err) {
        ue.dismiss("internal-sub-load");
        ue.error((err == null ? void 0 : err.message) || "Failed to load internal subtitle");
      }
    },
    [videoRef, internalSubtitles, currentSource == null ? void 0 : currentSource.url, currentSource == null ? void 0 : currentSource.sourceType, currentSource == null ? void 0 : currentSource.isM3U8, setCurrentSubtitle]
  );
  const { handleAudioTrackChange, externalAudioRef } = useAudioTrackManager({
    videoRef,
    audioTracks,
    currentAudioTrack,
    currentSource,
    currentSubtitle,
    extractedAudioUrls,
    isNative,
    setCurrentAudioTrack,
    setExtractedAudioUrls,
    setActiveExtractedAudioTrack,
    handleSubtitleChange
  });
  const { triggerMediaProbe } = useMediaProbe({
    videoRef,
    currentSource,
    isNative,
    torrentStats,
    setAudioTracks,
    setInternalSubtitles
  });
  useVideoProgress({
    videoRef,
    isPlaying,
    isNative,
    currentSource,
    onProgressUpdate,
    animeName,
    episodeNumber,
    animeImageUrl: animePoster,
    animeUrl: animeId ? `https://tatakai.me/anime/${encodeURIComponent(animeId)}` : void 0
  });
  reactExports.useEffect(() => {
    var _a2;
    if (isNative && ((_a2 = window.tatakaiRuntime) == null ? void 0 : _a2.getExternalPlayerPref)) {
      window.tatakaiRuntime.getExternalPlayerPref().then((pref) => {
        if (pref == null ? void 0 : pref.executablePath) {
          setExternalPlayerPath(pref.executablePath);
        }
      });
    }
  }, [isNative]);
  reactExports.useEffect(() => {
    if ((currentSource == null ? void 0 : currentSource.url) && settings.alwaysUseExternalPlayer && externalPlayerPath && isNative) ;
  }, [currentSource == null ? void 0 : currentSource.url, settings.alwaysUseExternalPlayer, externalPlayerPath, isNative]);
  const subtitleApplyStateRef = reactExports.useRef(null);
  const subtitleTrackSignatureRef = reactExports.useRef("");
  const autoSkippedWindowRef = reactExports.useRef(null);
  const manualRetryLockUntilRef = reactExports.useRef(0);
  const suppressEmptySrcUntilRef = reactExports.useRef(0);
  const initialSeekDoneRef = reactExports.useRef(false);
  const initialSeekRef = reactExports.useRef(initialSeekSeconds);
  const retryCountRef = reactExports.useRef(0);
  reactExports.useEffect(() => {
    if (initialSeekSeconds !== void 0 && !initialSeekDoneRef.current) {
      initialSeekRef.current = initialSeekSeconds;
    }
  }, [initialSeekSeconds]);
  reactExports.useEffect(() => {
    initialSeekDoneRef.current = false;
    initialSeekRef.current = initialSeekSeconds;
  }, [episodeId]);
  reactExports.useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = settings.playbackSpeed;
      setPlaybackRate(settings.playbackSpeed);
    }
  }, [settings.playbackSpeed]);
  reactExports.useEffect(() => {
    if (videoRef.current && !isMuted) {
      videoRef.current.volume = settings.volume;
      setVolume(settings.volume);
    }
  }, [settings.volume]);
  reactExports.useEffect(() => {
    if (videoRef.current) videoRef.current.loop = settings.loopVideo;
  }, [settings.loopVideo, currentSource == null ? void 0 : currentSource.url]);
  reactExports.useEffect(() => {
    const root = document.documentElement;
    if (settings.theaterMode) root.classList.add("player-theater");
    else root.classList.remove("player-theater");
    return () => root.classList.remove("player-theater");
  }, [settings.theaterMode]);
  const sleepAnnouncedRef = reactExports.useRef("off");
  reactExports.useEffect(() => {
    if (settings.sleepTimer === sleepAnnouncedRef.current) return;
    sleepAnnouncedRef.current = settings.sleepTimer;
    if (settings.sleepTimer !== "off" && settings.sleepTimer !== "end-of-episode") {
      ue.info(`Sleep timer set for ${settings.sleepTimer} minutes.`, { id: "sleep-timer-set" });
    }
  }, [settings.sleepTimer]);
  const isMobileApp = isMobileNative();
  const anime4kAllowed = isMobileApp ? Anime4KRenderer.isSupported() : !isMobile;
  const effectiveAnime4kPreset = isMobileApp && settings.anime4kPreset !== "off" ? "light" : settings.anime4kPreset;
  const anime4kActive = anime4kAllowed && settings.anime4kPreset !== "off";
  reactExports.useEffect(() => {
    var _a2;
    if (!anime4kActive || !Anime4KRenderer.isSupported()) {
      (_a2 = anime4kRendererRef.current) == null ? void 0 : _a2.destroy();
      anime4kRendererRef.current = null;
      return;
    }
    const video = videoRef.current;
    const canvas = anime4kCanvasRef.current;
    if (!video || !canvas) return;
    let renderer = anime4kRendererRef.current;
    if (!renderer) {
      try {
        renderer = new Anime4KRenderer(video, canvas);
        anime4kRendererRef.current = renderer;
      } catch (err) {
        console.warn("[VideoPlayer] Anime4K init failed:", err);
        return;
      }
    }
    renderer.resetDisabled();
    setAnime4kDisabled(false);
    renderer.setDisabledCallback(() => setAnime4kDisabled(true));
    renderer.setMode(effectiveAnime4kPreset);
    renderer.start();
    return () => {
      var _a3;
      (_a3 = anime4kRendererRef.current) == null ? void 0 : _a3.stop();
    };
  }, [anime4kActive, effectiveAnime4kPreset, currentSource == null ? void 0 : currentSource.url]);
  reactExports.useEffect(() => {
    return () => {
      var _a2;
      (_a2 = anime4kRendererRef.current) == null ? void 0 : _a2.destroy();
      anime4kRendererRef.current = null;
    };
  }, []);
  reactExports.useEffect(() => {
    if (!isMobileApp) return;
    let released = false;
    void (async () => {
      try {
        const { KeepAwake } = await __vitePreload(async () => {
          const { KeepAwake: KeepAwake2 } = await import("./vendor.CJyRs4QS.js").then((n) => n.c6);
          return { KeepAwake: KeepAwake2 };
        }, true ? __vite__mapDeps([0,1]) : void 0);
        if (isPlaying) await KeepAwake.keepAwake();
        else await KeepAwake.allowSleep();
      } catch {
      }
    })();
    return () => {
      if (released) return;
      released = true;
      void __vitePreload(async () => {
        const { KeepAwake } = await import("./vendor.CJyRs4QS.js").then((n) => n.c6);
        return { KeepAwake };
      }, true ? __vite__mapDeps([0,1]) : void 0).then(({ KeepAwake }) => KeepAwake.allowSleep().catch(() => {
      })).catch(() => {
      });
    };
  }, [isMobileApp, isPlaying]);
  reactExports.useEffect(() => {
    handleSubtitleChange(settings.subtitleLanguage);
  }, [settings.subtitleLanguage, handleSubtitleChange]);
  const subtitleKey = ((_a = [...subtitles || [], ...customSubtitles || []]) == null ? void 0 : _a.map((s) => `${String(s.url || "").trim()}|${String(s.lang || "").trim()}|${String(s.label || "").trim()}`).join("|")) ?? "";
  const sourceKey = (currentSource == null ? void 0 : currentSource.url) || "";
  reactExports.useEffect(() => {
    subtitleApplyStateRef.current = null;
    subtitleTrackSignatureRef.current = "";
  }, [subtitleKey, sourceKey]);
  reactExports.useEffect(() => {
    var _a2;
    if (hasTatakaiSkipWindows) return;
    if (!malId || !episodeNumber) return;
    const onManifestParsed = () => {
      var _a3;
      const length = (_a3 = videoRef.current) == null ? void 0 : _a3.duration;
      fetchSkipTimes(malId, episodeNumber, isFinite(length) && length > 0 ? Math.floor(length) : void 0);
    };
    if (((_a2 = videoRef.current) == null ? void 0 : _a2.duration) && isFinite(videoRef.current.duration) && videoRef.current.duration > 0) {
      onManifestParsed();
    }
    const handler = () => onManifestParsed();
    const hls = hlsRef.current;
    if (hls) hls.on(Hls.Events.MANIFEST_PARSED, handler);
    return () => {
      if (hls) hls.off(Hls.Events.MANIFEST_PARSED, handler);
    };
  }, [malId, episodeNumber, fetchSkipTimes, hasTatakaiSkipWindows]);
  reactExports.useEffect(() => {
    const skip2 = effectiveSkipTimes.find(
      (candidate) => currentTime >= candidate.interval.startTime && currentTime < candidate.interval.endTime
    ) || null;
    setActiveSkip(skip2);
  }, [currentTime, effectiveSkipTimes]);
  const handleSkip = reactExports.useCallback(() => {
    if (timelineSeekingLockedRef.current) {
      showTimelineLockHint();
      return;
    }
    if (activeSkip && videoRef.current) {
      videoRef.current.currentTime = activeSkip.interval.endTime;
      setActiveSkip(null);
    }
  }, [activeSkip, showTimelineLockHint]);
  reactExports.useEffect(() => {
    if (!settings.autoSkipIntro || !activeSkip || !videoRef.current) return;
    if (timelineSeekingLockedRef.current) return;
    if (activeSkip.skipType !== "op" && activeSkip.skipType !== "mixed-op" && activeSkip.skipType !== "recap") return;
    const windowKey = `${activeSkip.skipType}:${activeSkip.interval.startTime}:${activeSkip.interval.endTime}`;
    if (autoSkippedWindowRef.current === windowKey) return;
    videoRef.current.currentTime = activeSkip.interval.endTime;
    autoSkippedWindowRef.current = windowKey;
    setActiveSkip(null);
  }, [activeSkip, settings.autoSkipIntro, timelineSeekingLocked]);
  reactExports.useEffect(() => {
    autoSkippedWindowRef.current = null;
  }, [sourceKey]);
  const loadVideo = reactExports.useCallback(async () => {
    var _a2;
    if (!(currentSource == null ? void 0 : currentSource.url) || !videoRef.current) return;
    setVideoError(null);
    setIsBuffering(true);
    let mode = "direct";
    if (isOffline) {
      mode = "offline";
    } else {
      const url = String(currentSource.url || "");
      const isHlsStream = Boolean(currentSource.isM3U8 || url.includes(".m3u8"));
      const isPlayableHttpOrFile = url.startsWith("http://") || url.startsWith("https://") || url.startsWith("file://");
      if (currentSource.sourceType === "torrent") {
        mode = isHlsStream ? "hls" : isPlayableHttpOrFile ? "direct" : "torrent";
      } else if (url.startsWith("magnet:")) {
        mode = "debrid";
      } else if (isHlsStream) {
        mode = "hls";
      }
    }
    try {
      const seekTime = initialSeekDoneRef.current ? ((_a2 = videoRef.current) == null ? void 0 : _a2.currentTime) || initialSeekRef.current : initialSeekRef.current;
      await sourceAdapterRegistry.switchTo({
        source: {
          id: currentSource.url,
          url: currentSource.url,
          mode,
          episodeNumber: currentSource.episodeNumber ?? episodeNumber,
          filenameHint: currentSource.filenameHint
        },
        videoElement: videoRef.current,
        startTime: seekTime,
        autoPlay: settings.autoplay
      });
      initialSeekDoneRef.current = true;
    } catch (err) {
      setVideoError(err.message || "Failed to load video");
      setIsBuffering(false);
    }
  }, [
    currentSource == null ? void 0 : currentSource.url,
    currentSource == null ? void 0 : currentSource.isM3U8,
    currentSource == null ? void 0 : currentSource.sourceType,
    currentSource == null ? void 0 : currentSource.episodeNumber,
    currentSource == null ? void 0 : currentSource.filenameHint,
    episodeNumber,
    isOffline,
    settings.autoplay
  ]);
  reactExports.useEffect(() => {
    loadVideo();
  }, [currentSource == null ? void 0 : currentSource.url, currentSource == null ? void 0 : currentSource.isM3U8, currentSource == null ? void 0 : currentSource.sourceType, isOffline, settings.autoplay]);
  reactExports.useEffect(() => {
    if (currentSource) return;
    const adapter = sourceAdapterRegistry.getCurrentAdapter();
    if (adapter) {
      void adapter.unload();
    }
    const video = videoRef.current;
    if (video) {
      const hasSrc = Boolean(video.currentSrc) || Boolean(video.getAttribute("src")) || video.querySelectorAll("source").length > 0;
      if (!hasSrc) return;
      suppressEmptySrcUntilRef.current = Date.now() + 1500;
      video.removeAttribute("src");
      video.querySelectorAll("source").forEach((node) => node.remove());
      video.load();
    }
  }, [currentSource]);
  const lastProgressAtRef = reactExports.useRef(Date.now());
  const lastEmitRef = reactExports.useRef(0);
  const bufferingTimeoutRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const handleTimeUpdate = () => {
      const t = video.currentTime;
      setCurrentTime(t);
      updateGlobalVideoTime(t);
      const now = Date.now();
      if (onProgressUpdate && t > 1 && now - lastEmitRef.current >= 5e3) {
        lastEmitRef.current = now;
        onProgressUpdate(Math.floor(t), Math.floor(video.duration || 0) || 0, false);
      }
    };
    const handleDurationChange = () => setDuration(video.duration);
    const handleLoadedMetadata = () => {
      setVideoError((prev) => prev ? null : prev);
    };
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => {
      setIsPlaying(false);
      setIsBuffering(false);
      const t = Math.floor(video.currentTime || 0);
      if (t > 0 && onProgressUpdate) {
        onProgressUpdate(t, Math.floor(video.duration || 0) || 0, false, true);
      }
    };
    const handleWaiting = () => {
      var _a2;
      if (!((_a2 = videoRef.current) == null ? void 0 : _a2.paused)) {
        setIsBuffering(true);
      }
    };
    const handlePlaying = () => {
      setIsBuffering(false);
      setVideoError((prev) => prev ? null : prev);
      lastProgressAtRef.current = Date.now();
      if (audioTracks.length === 0 && internalSubtitles.length === 0) {
        triggerMediaProbe();
      }
    };
    const handleProgress = () => {
      if (video.buffered.length > 0) {
        setBuffered(video.buffered.end(video.buffered.length - 1));
      }
    };
    const handleEnded = () => {
      var _a2, _b2;
      const dur = Math.floor(((_a2 = videoRef.current) == null ? void 0 : _a2.duration) || 0) || void 0;
      const finalPos = Math.floor(((_b2 = videoRef.current) == null ? void 0 : _b2.currentTime) || 0);
      if (onProgressUpdate) onProgressUpdate(dur ?? finalPos, dur, true);
      if (settings.sleepTimer === "end-of-episode") {
        ue.info("Sleep timer: stopped at end of episode.", { id: "sleep-timer-end" });
        return;
      }
      if (settings.autoNextEpisode && onEpisodeEnd) {
        setUpNextCountdown(Math.max(1, Math.round(settings.autoNextCountdownSeconds || 10)));
      }
    };
    const handleError = (e) => {
      var _a2, _b2, _c2, _d;
      console.error("Video Error:", e);
      const videoEl = videoRef.current;
      const err = videoEl == null ? void 0 : videoEl.error;
      if (!(currentSource == null ? void 0 : currentSource.url)) return;
      const code = Number((err == null ? void 0 : err.code) || 0);
      const rawMessage = String((err == null ? void 0 : err.message) || "Unknown error");
      if (Date.now() < suppressEmptySrcUntilRef.current && (code === 4 || code === 0)) return;
      const elementSrc = String((videoEl == null ? void 0 : videoEl.currentSrc) || (videoEl == null ? void 0 : videoEl.src) || ((_a2 = videoEl == null ? void 0 : videoEl.getAttribute) == null ? void 0 : _a2.call(videoEl, "src")) || "").trim();
      if (!elementSrc || /empty[^a-z]*src/i.test(rawMessage)) return;
      let failureReason = "native-video-error";
      let friendlyMessage = null;
      const eventMessage = String((e == null ? void 0 : e.message) || ((_c2 = (_b2 = e == null ? void 0 : e.target) == null ? void 0 : _b2.error) == null ? void 0 : _c2.message) || "").trim().toLowerCase();
      const normalizedMessage = rawMessage.toLowerCase();
      const compositeMessage = `${normalizedMessage} ${eventMessage}`;
      const isTorrent = ((_d = currentSource == null ? void 0 : currentSource.url) == null ? void 0 : _d.startsWith("magnet:")) || (currentSource == null ? void 0 : currentSource.sourceType) === "torrent";
      const inTorrentStartupGrace = isTorrent && Date.now() < Date.now();
      if (isTorrent && !initialSeekDoneRef.current || inTorrentStartupGrace && (code === 4 || isTransientTorrentStartupError(compositeMessage))) {
        console.warn("[VideoPlayer] Suppressing early torrent error:", eventMessage);
        setIsBuffering(true);
        return;
      }
      if (err) {
        if (code === 4 && (compositeMessage.includes("decoder_error_not_supported") || compositeMessage.includes("unsupportedconfig") || compositeMessage.includes("audio decoder initialization failed"))) {
          failureReason = "native-decoder-unsupported-config";
          friendlyMessage = "Audio codec is not supported for this source. Auto-switching source...";
        } else if (code === 4) {
          failureReason = "native-playback-not-supported";
          if (compositeMessage.includes("unsupported") || compositeMessage.includes("not supported")) {
            friendlyMessage = "Playback format is not supported for this source. Auto-switching source...";
          }
        } else if (code === 3 || compositeMessage.includes("decode")) {
          failureReason = "native-decode-error";
        }
        setVideoError(friendlyMessage || `Playback Error (${code}): ${rawMessage}`);
        if (onError) onError({ statusCode: code || void 0, reason: failureReason });
      } else {
        setVideoError(friendlyMessage || "Playback failed");
        if (onError) onError({ reason: failureReason });
      }
    };
    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("durationchange", handleDurationChange);
    video.addEventListener("loadedmetadata", handleLoadedMetadata);
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
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("pause", handlePause);
      video.removeEventListener("waiting", handleWaiting);
      video.removeEventListener("playing", handlePlaying);
      video.removeEventListener("progress", handleProgress);
      video.removeEventListener("ended", handleEnded);
      video.removeEventListener("error", handleError);
    };
  }, [
    settings.autoNextEpisode,
    settings.autoNextCountdownSeconds,
    settings.sleepTimer,
    onEpisodeEnd,
    onPlay,
    onPause,
    onProgressUpdate,
    onError,
    audioTracks.length,
    internalSubtitles.length,
    triggerMediaProbe,
    currentSource == null ? void 0 : currentSource.url,
    currentSource == null ? void 0 : currentSource.sourceType
  ]);
  reactExports.useEffect(() => {
    if (upNextCountdown === null) return;
    if (upNextCountdown <= 0) {
      setUpNextCountdown(null);
      if (onEpisodeEnd) onEpisodeEnd();
      return;
    }
    const id = window.setTimeout(() => {
      setUpNextCountdown((prev) => prev === null ? null : prev - 1);
    }, 1e3);
    return () => window.clearTimeout(id);
  }, [upNextCountdown, onEpisodeEnd]);
  reactExports.useEffect(() => {
    if (bufferingTimeoutRef.current !== null) {
      clearTimeout(bufferingTimeoutRef.current);
      bufferingTimeoutRef.current = null;
    }
    if (!isBuffering || !(currentSource == null ? void 0 : currentSource.url)) return;
    bufferingTimeoutRef.current = window.setTimeout(() => {
      var _a2;
      const stalledMs = Date.now() - lastProgressAtRef.current;
      if (stalledMs >= 15e3) {
        const isTorrent = ((_a2 = currentSource == null ? void 0 : currentSource.url) == null ? void 0 : _a2.startsWith("magnet:")) || (currentSource == null ? void 0 : currentSource.sourceType) === "torrent";
        if (!isTorrent) {
          setVideoError("Server timed out. Auto-switching server in 3 seconds...");
          if (onError) onError({ reason: "buffer-stall-timeout" });
        } else {
          setIsBuffering(true);
        }
      }
    }, 16e3);
    return () => {
      if (bufferingTimeoutRef.current !== null) {
        clearTimeout(bufferingTimeoutRef.current);
        bufferingTimeoutRef.current = null;
      }
    };
  }, [isBuffering, currentSource == null ? void 0 : currentSource.url, onError]);
  reactExports.useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const audioUrl = activeExtractedAudioTrack != null ? extractedAudioUrls[activeExtractedAudioTrack] : void 0;
    if (!audioUrl) {
      if (externalAudioRef.current) {
        externalAudioRef.current.pause();
        externalAudioRef.current.removeAttribute("src");
        externalAudioRef.current.load();
      }
      return;
    }
    const audio = externalAudioRef.current || new Audio();
    externalAudioRef.current = audio;
    audio.preload = "auto";
    if (audio.src !== audioUrl) {
      audio.src = audioUrl;
      audio.load();
    }
    const syncVolume = () => {
      audio.volume = isMuted ? 0 : volume;
      video.muted = true;
    };
    const syncTime = () => {
      if (!Number.isFinite(video.currentTime)) return;
      const drift = Math.abs((audio.currentTime || 0) - video.currentTime);
      if (drift > 0.35) {
        try {
          audio.currentTime = video.currentTime;
        } catch {
        }
      }
    };
    const onPlaySync = () => {
      syncVolume();
      audio.playbackRate = video.playbackRate || 1;
      syncTime();
      void audio.play().catch(() => {
      });
    };
    const onPauseSync = () => audio.pause();
    const onSeeked = () => syncTime();
    const onRateChange = () => {
      audio.playbackRate = video.playbackRate || 1;
    };
    syncVolume();
    if (!video.paused) onPlaySync();
    video.addEventListener("play", onPlaySync);
    video.addEventListener("pause", onPauseSync);
    video.addEventListener("seeked", onSeeked);
    video.addEventListener("ratechange", onRateChange);
    const driftTimer = window.setInterval(syncTime, 1e3);
    return () => {
      video.removeEventListener("play", onPlaySync);
      video.removeEventListener("pause", onPauseSync);
      video.removeEventListener("seeked", onSeeked);
      video.removeEventListener("ratechange", onRateChange);
      window.clearInterval(driftTimer);
      if (activeExtractedAudioTrack == null) {
        video.muted = isMuted;
      }
    };
  }, [activeExtractedAudioTrack, extractedAudioUrls, isMuted, volume, videoRef, externalAudioRef]);
  reactExports.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);
  reactExports.useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "?") {
        e.preventDefault();
        setShowShortcuts((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);
  const handleSeek = reactExports.useCallback(
    (e) => {
      var _a2, _b2, _c2;
      if (timelineSeekingLockedRef.current) {
        showTimelineLockHint();
        return;
      }
      let newTime;
      if (typeof e === "number") {
        newTime = e;
      } else {
        const rect = e.currentTarget.getBoundingClientRect();
        const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
        const percent = (clientX - rect.left) / rect.width;
        newTime = Math.max(0, Math.min(duration, percent * duration));
      }
      if (videoRef.current) {
        const sessionId = new URLSearchParams(window.location.search).get("sessionId");
        const isTorrentSource = Boolean(
          sessionId && ((currentSource == null ? void 0 : currentSource.sourceType) === "torrent" || ((_a2 = currentSource == null ? void 0 : currentSource.url) == null ? void 0 : _a2.startsWith("magnet:")))
        );
        if (isTorrentSource && ((_b2 = window.tatakaiRuntime) == null ? void 0 : _b2.getTorrentStreamUrl)) {
          const isHlsTorrent = Boolean(
            (currentSource == null ? void 0 : currentSource.isM3U8) || ((_c2 = currentSource == null ? void 0 : currentSource.url) == null ? void 0 : _c2.includes(".m3u8"))
          );
          if (isHlsTorrent) {
            videoRef.current.currentTime = newTime;
            setCurrentTime(newTime);
            return;
          }
          void (async () => {
            try {
              const runtime = window.tatakaiRuntime;
              const currentVideo = videoRef.current;
              const wasPaused = currentVideo == null ? void 0 : currentVideo.paused;
              const currentPlaybackRate = (currentVideo == null ? void 0 : currentVideo.playbackRate) || 1;
              const stream = await runtime.getTorrentStreamUrl(
                sessionId,
                window.currentFileIndex ?? void 0,
                { audioTrackIndex: currentAudioTrack, startTime: newTime }
              );
              if (!(stream == null ? void 0 : stream.success) || !stream.url) {
                throw new Error((stream == null ? void 0 : stream.error) || "Failed to seek torrent stream");
              }
              await sourceAdapterRegistry.switchTo({
                source: {
                  id: stream.url,
                  url: stream.url,
                  mode: stream.isM3U8 || String(stream.url).includes(".m3u8") ? "hls" : "direct"
                },
                videoElement: currentVideo,
                startTime: newTime,
                autoPlay: !wasPaused
              });
              if (currentVideo) currentVideo.playbackRate = currentPlaybackRate;
              handleSubtitleChange(currentSubtitle);
              setCurrentTime(newTime);
            } catch (err) {
              console.error("Torrent seek failed:", err);
              ue.error("Could not seek torrent stream");
            }
          })();
          return;
        }
        videoRef.current.currentTime = newTime;
        setCurrentTime(newTime);
      }
    },
    [duration, currentSource, currentAudioTrack, currentSubtitle, handleSubtitleChange, showTimelineLockHint]
  );
  const handleProgressBarHover = reactExports.useCallback(
    (e) => {
      if (isLive || timelineSeekingLocked) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const clientX = e.clientX;
      const percent = (clientX - rect.left) / rect.width;
      const clampedPercent = Math.max(0, Math.min(1, percent));
      const time = clampedPercent * duration;
      setHoverPercent(clampedPercent * 100);
      setHoverTime(time);
      setShowHoverTime(true);
    },
    [isLive, timelineSeekingLocked, duration]
  );
  const handleProgressBarLeave = reactExports.useCallback(() => {
    setShowHoverTime(false);
  }, []);
  const handleLongPressSpeedStart = reactExports.useCallback(() => {
    if (videoRef.current) {
      setOriginalSpeed(videoRef.current.playbackRate);
      videoRef.current.playbackRate = 2;
    }
  }, [videoRef]);
  const handleLongPressSpeedEnd = reactExports.useCallback(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = originalSpeed;
    }
  }, [videoRef, originalSpeed]);
  const progress = duration > 0 ? currentTime / duration * 100 : 0;
  const bufferedPercent = duration > 0 ? buffered / duration * 100 : 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      ref: containerRef,
      className: "relative aspect-video min-h-[12rem] bg-black rounded-xl md:rounded-2xl overflow-hidden group touch-manipulation video-player-container video-player-modern",
      onMouseMove: !isMobile ? showControlsTemporarily : void 0,
      onMouseLeave: () => !isMobile && isPlaying && setControlsVisible(false),
      onTouchStart: showControlsTemporarily,
      children: [
        showFsHint && !isMobile && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-3 left-1/2 -translate-x-1/2 z-30 pointer-events-none", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 rounded-full bg-black/70 px-3 py-1.5 text-xs font-medium text-white border border-white/10 shadow-lg backdrop-blur-md whitespace-nowrap", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Maximize, { className: "w-3.5 h-3.5 shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Double-click for fullscreen" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "player-media-stack absolute inset-0 z-0", children: [
          settings.ambientMode && !isMobile ? /* @__PURE__ */ jsxRuntimeExports.jsx("canvas", { ref: ambientCanvasRef, className: "player-ambient-glow", "aria-hidden": "true" }) : null,
          anime4kActive ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            "canvas",
            {
              ref: anime4kCanvasRef,
              className: "player-anime4k-canvas",
              "aria-hidden": "true",
              style: anime4kDisabled ? { display: "none" } : void 0
            }
          ) : null,
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            LongPressSpeed,
            {
              onLongPressStart: handleLongPressSpeedStart,
              onLongPressEnd: handleLongPressSpeedEnd,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                DoubleTapSeek,
                {
                  onSeek: (direction) => skip(direction === "forward" ? 10 : -10),
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "video",
                    {
                      ref: videoRef,
                      className: `w-full h-full object-contain video-with-subtitles subtitle-${settings.subtitleSize} subtitle-font-${settings.subtitleFont} subtitle-bg-${settings.subtitleBackground}`,
                      poster: resolvedPoster,
                      playsInline: true,
                      ...!isOffline ? { crossOrigin: "anonymous" } : {},
                      onClick: handleVideoClick,
                      children: (() => {
                        const seenTrackKeys = /* @__PURE__ */ new Set();
                        return allRenderedSubtitles.filter((sub, idx) => {
                          const key = getSubtitleSelectionKey(sub, idx);
                          if (seenTrackKeys.has(key)) return false;
                          seenTrackKeys.add(key);
                          return true;
                        });
                      })().map((sub, idx) => {
                        const subtitleSelectionKey = getSubtitleSelectionKey(sub, idx);
                        const subtitleSourceUrl = String(sub.url || "").trim();
                        if (!subtitleSourceUrl) return null;
                        const blobUrl = subtitleBlobs[subtitleSourceUrl];
                        const proxiedUrl = !isOffline ? getProxiedSubtitleUrl(subtitleSourceUrl, (headers == null ? void 0 : headers.Referer) || "") : subtitleSourceUrl;
                        const src = sub.lang === "custom" ? blobUrl || subtitleSourceUrl : blobUrl || (proxiedUrl && (proxiedUrl.endsWith(".vtt") || proxiedUrl.startsWith("blob:") || proxiedUrl.startsWith("data:")) ? proxiedUrl : void 0);
                        if (!src) return null;
                        return /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "track",
                          {
                            kind: "subtitles",
                            src,
                            srcLang: sub.lang === "custom" ? "und" : String(sub.lang || "").slice(0, 2) || "und",
                            label: sub.label || sub.lang,
                            default: currentSubtitle !== "off" && currentSubtitle === subtitleSelectionKey
                          },
                          subtitleSelectionKey
                        );
                      })
                    }
                  )
                }
              )
            }
          )
        ] }),
        torrentSessionId && torrentStats ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          TorrentStatusPanel,
          {
            sessionId: torrentSessionId,
            stats: torrentStats,
            buffering: isBuffering,
            onRepair: onTorrentRepair,
            onStop: onTorrentStop,
            onOpenFolder: async () => {
              try {
                const rt = window.tatakaiRuntime;
                const ep = window.electron;
                if (!(rt == null ? void 0 : rt.getTorrentFilePath) || !(ep == null ? void 0 : ep.openPath)) return;
                const res = await rt.getTorrentFilePath(torrentSessionId);
                if ((res == null ? void 0 : res.success) && (res == null ? void 0 : res.path)) await ep.openPath(res.path);
              } catch {
              }
            },
            className: getShowControls() ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-4 pointer-events-none"
          }
        ) : null,
        /* @__PURE__ */ jsxRuntimeExports.jsx(ViewCountBadge, { viewCount: viewCount || 0, isVisible: getShowControls() && !isBuffering }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          LoadingOverlay,
          {
            isVisible: isLoading && !isPlaying || isBuffering && !videoError,
            serverName
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          ErrorOverlay,
          {
            videoError: videoError || "",
            isOffline: Boolean(isOffline),
            isBuffering,
            videoSrc: (_b = videoRef.current) == null ? void 0 : _b.currentSrc,
            videoErrorObj: (_c = videoRef.current) == null ? void 0 : _c.error,
            onRetry: () => {
              const now = Date.now();
              if (now < manualRetryLockUntilRef.current) return;
              manualRetryLockUntilRef.current = now + 2500;
              if (onRetryCurrentServer) onRetryCurrentServer();
              retryCountRef.current = 0;
              loadVideo();
            },
            onRefresh: handleRefresh,
            onServerSwitch
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          CenterPlayButton,
          {
            isVisible: !isPlaying && !isLoading && !isBuffering && !videoError && !isLive,
            onClick: togglePlay
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          SkipButton,
          {
            activeSkip,
            timelineSeekingLocked,
            onSkip: handleSkip,
            getSkipLabel
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          SubtitleOverlay,
          {
            lines: activeCueLines,
            settings,
            controlsVisible: getShowControls()
          }
        ),
        upNextCountdown !== null && /* @__PURE__ */ jsxRuntimeExports.jsx(
          UpNextOverlay,
          {
            secondsLeft: upNextCountdown,
            total: Math.max(1, Math.round(settings.autoNextCountdownSeconds || 10)),
            title: nextEpisodeTitle,
            thumbnail: nextEpisodeThumbnail,
            episodeNumber: nextEpisodeNumber,
            onPlayNow: () => {
              setUpNextCountdown(null);
              if (onEpisodeEnd) onEpisodeEnd();
            },
            onCancel: () => setUpNextCountdown(null)
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            ref: controlsOverlayRef,
            className: `absolute inset-x-0 bottom-0 video-controls-gradient px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-6 sm:p-4 md:p-5 transition-all duration-300 ${getShowControls() ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}`,
            children: [
              !timelineUiHidden && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: `relative h-1 md:h-1.5 bg-white/20 rounded-full group/progress mb-4 md:mb-5 video-progress-track ${isLive ? "cursor-default pointer-events-none" : timelineSeekingLocked ? "cursor-not-allowed opacity-85" : "cursor-pointer"}`,
                  onClick: !isLive ? timelineSeekingLocked ? showTimelineLockHint : handleSeek : void 0,
                  onTouchMove: !isLive && !timelineSeekingLocked ? handleSeek : void 0,
                  onMouseMove: !isLive && !timelineSeekingLocked ? handleProgressBarHover : void 0,
                  onMouseLeave: !isLive ? handleProgressBarLeave : void 0,
                  children: [
                    showHoverTime && !isLive && !timelineSeekingLocked && /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: "absolute bottom-full mb-2 bg-black/90 text-white text-xs px-2 py-1 rounded whitespace-nowrap pointer-events-none z-50 font-medium",
                        style: { left: `calc(${hoverPercent}% - 24px)` },
                        children: formatTime(hoverTime)
                      }
                    ),
                    effectiveSkipTimes.map((skip2) => {
                      const startPercent = duration > 0 ? skip2.interval.startTime / duration * 100 : 0;
                      const widthPercent = duration > 0 ? (skip2.interval.endTime - skip2.interval.startTime) / duration * 100 : 0;
                      return /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          className: "absolute h-full bg-yellow-400 rounded-full z-10",
                          style: { left: `${startPercent}%`, width: `${widthPercent}%` },
                          title: getSkipLabel(skip2.skipType)
                        },
                        skip2.skipId
                      );
                    }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: "absolute h-full bg-white/30 rounded-full",
                        style: { width: `${bufferedPercent}%` }
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: "absolute h-full bg-gradient-to-r from-primary via-primary to-secondary rounded-full z-20 transition-all",
                        style: { width: `${progress}%` }
                      }
                    ),
                    !isLive && !timelineSeekingLocked && /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: "absolute top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 bg-white rounded-full shadow-lg opacity-0 group-hover/progress:opacity-100 transition-all z-30 ring-2 ring-primary/50",
                        style: { left: `calc(${progress}% - 8px)` }
                      }
                    ),
                    timelineSeekingLocked && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute right-0 bottom-full mb-2 hidden items-center gap-1.5 rounded-full border border-white/10 bg-black/80 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white/75 shadow-xl backdrop-blur-md sm:flex", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "h-3 w-3 text-primary" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Seeking locked" })
                    ] })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3 md:gap-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 md:gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    PlaybackControls,
                    {
                      isPlaying,
                      isLive: Boolean(isLive),
                      timelineSeekingLocked,
                      timelineUiHidden,
                      onTogglePlay: togglePlay,
                      onRefresh: handleRefresh,
                      onSkip: skip
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    VolumeControl,
                    {
                      volume,
                      isMuted,
                      onToggleMute: toggleMute,
                      onVolumeChange: handleVolumeChange
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    TimeDisplay,
                    {
                      currentTime,
                      duration,
                      timelineUiHidden
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 md:gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    SubtitleSelector,
                    {
                      subtitles,
                      customSubtitles,
                      internalSubtitles,
                      currentSubtitle,
                      currentInternalSubtitleTrackId,
                      subtitleBlobs,
                      visibleSubtitleOptions,
                      showSubtitleMenu,
                      onToggleMenu: () => {
                        setShowSubtitleMenu(!showSubtitleMenu);
                        setShowAudioMenu(false);
                        setShowSettings(false);
                      },
                      onSubtitleChange: handleSubtitleChange,
                      onInternalSubtitleChange: handleInternalSubtitleLoad,
                      onCustomUpload: handleCustomSubtitleUpload
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    AudioTrackSelector,
                    {
                      audioTracks,
                      currentAudioTrack,
                      showAudioMenu,
                      onToggleMenu: () => {
                        setShowAudioMenu(!showAudioMenu);
                        setShowSubtitleMenu(false);
                        setShowSettings(false);
                      },
                      onTrackChange: handleAudioTrackChange
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    SpeedSelector,
                    {
                      playbackRate,
                      showSettings,
                      onToggleMenu: () => {
                        setShowSettings(!showSettings);
                        setShowSubtitleMenu(false);
                        setShowAudioMenu(false);
                      },
                      onRateChange: (rate) => {
                        handlePlaybackRateChange(rate);
                        setShowSettings(false);
                      }
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      onClick: () => setShowSettingsPanel(true),
                      className: "p-2 rounded-lg hover:bg-white/10 transition-colors",
                      title: "Player Preferences",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(SlidersHorizontal, { className: "w-4 h-4 md:w-5 md:h-5" })
                    }
                  ),
                  !isLive && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    ScreenshotButton,
                    {
                      videoRef,
                      animeName,
                      episodeNumber
                    }
                  ),
                  isNative && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    DownloadButton,
                    {
                      episodeId,
                      animeName,
                      episodeNumber,
                      posterUrl: animePoster ?? poster,
                      sourceUrl: currentSource == null ? void 0 : currentSource.url,
                      sourceType: currentSource == null ? void 0 : currentSource.sourceType,
                      torrentUrl: String((currentSource == null ? void 0 : currentSource.sourceType) || "").toLowerCase() === "torrent" || String((currentSource == null ? void 0 : currentSource.sourceType) || "").toLowerCase() === "debrid" || String((currentSource == null ? void 0 : currentSource.url) || "").startsWith("magnet:") ? torrentStats == null ? void 0 : torrentStats.rawUrl : void 0,
                      headers,
                      animeId: animeId ?? malId,
                      subtitles
                    }
                  ),
                  isNative && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    ExternalPlayerButton,
                    {
                      videoRef,
                      externalPlayerPath,
                      currentSourceUrl: currentSource == null ? void 0 : currentSource.url,
                      isPlaying,
                      animeName,
                      episodeNumber,
                      episodeTitle
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(FullscreenButton, { isFullscreen, onToggle: toggleFullscreen })
                ] })
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          VideoSettingsPanel,
          {
            isOpen: showSettingsPanel,
            onClose: () => setShowSettingsPanel(false),
            availableSubtitles: visibleSubtitleOptions.map(({ sub, index }) => ({
              lang: sub.lang,
              label: sub.label || sub.lang,
              value: getSubtitleSelectionKey(sub, index)
            })),
            audioTracks,
            currentAudioTrack,
            onAudioTrackChange: handleAudioTrackChange,
            internalSubtitles,
            currentInternalSubtitleTrackId,
            onInternalSubtitleChange: handleInternalSubtitleLoad
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          KeyboardShortcutOverlay,
          {
            isVisible: showShortcuts,
            onClose: () => setShowShortcuts(false)
          }
        )
      ]
    }
  );
}
async function lockLandscapeOrientation() {
  try {
    const { ScreenOrientation } = await __vitePreload(async () => {
      const { ScreenOrientation: ScreenOrientation2 } = await import("./vendor.CJyRs4QS.js").then((n) => n.cc);
      return { ScreenOrientation: ScreenOrientation2 };
    }, true ? __vite__mapDeps([0,1]) : void 0);
    await ScreenOrientation.lock({ orientation: "landscape" });
  } catch {
  }
}
async function unlockOrientation() {
  try {
    const { ScreenOrientation } = await __vitePreload(async () => {
      const { ScreenOrientation: ScreenOrientation2 } = await import("./vendor.CJyRs4QS.js").then((n) => n.cc);
      return { ScreenOrientation: ScreenOrientation2 };
    }, true ? __vite__mapDeps([0,1]) : void 0);
    await ScreenOrientation.unlock();
  } catch {
  }
}
async function hideStatusBar() {
  try {
    const { StatusBar } = await __vitePreload(async () => {
      const { StatusBar: StatusBar2 } = await import("./vendor.CJyRs4QS.js").then((n) => n.cd);
      return { StatusBar: StatusBar2 };
    }, true ? __vite__mapDeps([0,1]) : void 0);
    await StatusBar.hide();
  } catch {
  }
}
async function showStatusBar() {
  try {
    const { StatusBar } = await __vitePreload(async () => {
      const { StatusBar: StatusBar2 } = await import("./vendor.CJyRs4QS.js").then((n) => n.cd);
      return { StatusBar: StatusBar2 };
    }, true ? __vite__mapDeps([0,1]) : void 0);
    await StatusBar.show();
  } catch {
  }
}
const EMBED_ALLOW = [
  "accelerometer *",
  "autoplay *",
  "encrypted-media *",
  "gyroscope *",
  "picture-in-picture *",
  "fullscreen *",
  "clipboard-write *"
].join("; ");
const LOAD_TIMEOUT_MS = 15e3;
function EmbedPlayer({ url, poster, language, referer, onError }) {
  const [isLoading, setIsLoading] = reactExports.useState(true);
  const [error, setError] = reactExports.useState(null);
  const [reloadKey, setReloadKey] = reactExports.useState(0);
  const [isFullscreen, setIsFullscreen] = reactExports.useState(false);
  const containerRef = reactExports.useRef(null);
  const isMobile = isMobileNative();
  const reportedRef = reactExports.useRef(false);
  reactExports.useEffect(() => {
    var _a;
    const security = (_a = window.electron) == null ? void 0 : _a.security;
    if (!(security == null ? void 0 : security.setEmbedActive)) return;
    security.setEmbedActive(true);
    return () => {
      security.setEmbedActive(false);
    };
  }, []);
  const fail = reactExports.useCallback(
    (reason, statusCode) => {
      if (reportedRef.current) return;
      reportedRef.current = true;
      setIsLoading(false);
      setError({ reason, statusCode });
      onError == null ? void 0 : onError({ reason, statusCode });
    },
    [onError]
  );
  reactExports.useEffect(() => {
    reportedRef.current = false;
    setError(null);
    setIsLoading(true);
  }, [url, reloadKey]);
  reactExports.useEffect(() => {
    if (!url) return;
    let cancelled = false;
    void (async () => {
      const result = await probeUrlReachable(url, referer);
      if (cancelled || !result.checked || result.ok) return;
      const host = (() => {
        try {
          return new URL(url).host;
        } catch {
          return "embed host";
        }
      })();
      if (result.status < 400) {
        console.info(
          `[EmbedPlayer] probe could not reach ${host} (${result.error || "no response"}) — letting the frame try anyway, watchdog has ${LOAD_TIMEOUT_MS}ms`
        );
        return;
      }
      console.warn(`[EmbedPlayer] ${host} answered HTTP ${result.status} — failing over`);
      fail(`embed-host-${result.status}`, result.status);
    })();
    return () => {
      cancelled = true;
    };
  }, [url, referer, reloadKey, fail]);
  reactExports.useEffect(() => {
    if (!isLoading) return;
    const timer = setTimeout(() => {
      fail("embed-load-timeout");
    }, LOAD_TIMEOUT_MS);
    return () => clearTimeout(timer);
  }, [isLoading, url, reloadKey, fail]);
  const handleLoad = () => {
    setIsLoading(false);
  };
  const handleIframeError = () => {
    fail("embed-iframe-error");
  };
  const handleRetry = () => {
    setError(null);
    setIsLoading(true);
    setReloadKey((k) => k + 1);
  };
  const toggleFullscreen = reactExports.useCallback(async () => {
    const node = containerRef.current;
    if (!node) return;
    const bridge = window.electron;
    const isElectron = !!(bridge == null ? void 0 : bridge.setFullscreen);
    const isMobile2 = isMobileNative();
    const currentlyFull = node.classList.contains("is-player-fullscreen") || document.fullscreenElement === node;
    if (!currentlyFull) {
      if (isMobile2) {
        node.classList.add("is-player-fullscreen");
        setIsFullscreen(true);
        await hideStatusBar();
        await lockLandscapeOrientation();
      } else if (isElectron) {
        node.classList.add("is-player-fullscreen");
        setIsFullscreen(true);
        try {
          await bridge.setFullscreen(true);
          document.documentElement.classList.add("app-fullscreen");
        } catch {
        }
      } else {
        try {
          await node.requestFullscreen();
        } catch {
          node.classList.add("is-player-fullscreen");
          setIsFullscreen(true);
        }
      }
    } else {
      node.classList.remove("is-player-fullscreen");
      setIsFullscreen(false);
      if (isMobile2) {
        await showStatusBar();
        await unlockOrientation();
      } else if (isElectron) {
        document.documentElement.classList.remove("app-fullscreen");
        try {
          await bridge.setFullscreen(false);
        } catch {
        }
      } else if (document.fullscreenElement) {
        void document.exitFullscreen().catch(() => void 0);
      }
    }
  }, []);
  reactExports.useEffect(() => {
    return () => {
      if (isMobileNative()) {
        void showStatusBar();
        void unlockOrientation();
      }
    };
  }, []);
  reactExports.useEffect(() => {
    var _a;
    const onChange = () => setIsFullscreen(document.fullscreenElement === containerRef.current);
    document.addEventListener("fullscreenchange", onChange);
    const onKey = (e) => {
      var _a2, _b;
      if (e.key === "Escape" && ((_a2 = containerRef.current) == null ? void 0 : _a2.classList.contains("is-player-fullscreen"))) {
        containerRef.current.classList.remove("is-player-fullscreen");
        document.documentElement.classList.remove("app-fullscreen");
        setIsFullscreen(false);
        const bridge2 = window.electron;
        void ((_b = bridge2 == null ? void 0 : bridge2.setFullscreen) == null ? void 0 : _b.call(bridge2, false).catch(() => void 0));
      }
    };
    const bridge = window.electron;
    const unsub = (_a = bridge == null ? void 0 : bridge.onFullscreenChanged) == null ? void 0 : _a.call(bridge, (isFull) => {
      var _a2;
      if (!isFull && ((_a2 = containerRef.current) == null ? void 0 : _a2.classList.contains("is-player-fullscreen"))) {
        containerRef.current.classList.remove("is-player-fullscreen");
        document.documentElement.classList.remove("app-fullscreen");
        setIsFullscreen(false);
      }
    });
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("fullscreenchange", onChange);
      document.removeEventListener("keydown", onKey);
      unsub == null ? void 0 : unsub();
    };
  }, []);
  if (error) {
    const detail = error.statusCode ? `The embed host returned HTTP ${error.statusCode}.` : error.reason === "embed-load-timeout" ? "The embed host stopped responding." : "The embed host could not be reached.";
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "w-full aspect-video bg-black flex flex-col items-center justify-center text-white",
        style: { backgroundImage: poster ? `url(${poster})` : void 0, backgroundSize: "cover", backgroundPosition: "center" },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-black/80 p-6 rounded-xl flex flex-col items-center gap-3 max-w-md text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-12 h-12 text-red-500" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg", children: "Embed player unavailable" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-white/60", children: [
            detail,
            " Try another server from the list below."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              onClick: handleRetry,
              className: "flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary/80 rounded-lg transition-colors",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-4 h-4" }),
                "Retry"
              ]
            }
          )
        ] })
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      ref: containerRef,
      className: `video-player-container relative w-full bg-black ${isFullscreen ? "h-full" : "aspect-video"}`,
      children: [
        isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 flex items-center justify-center bg-black z-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-12 h-12 animate-spin text-primary" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-white/70 text-sm", children: [
            "Loading ",
            language ? `${language} ` : "",
            "player..."
          ] })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "iframe",
          {
            src: url,
            className: "w-full h-full border-0",
            allow: EMBED_ALLOW,
            onLoad: handleLoad,
            onError: handleIframeError,
            title: `Video player - ${language || "Embed"}`,
            referrerPolicy: "no-referrer-when-downgrade"
          },
          reloadKey
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: toggleFullscreen,
            title: isFullscreen ? "Exit fullscreen" : "Fullscreen",
            "aria-label": isFullscreen ? "Exit fullscreen" : "Fullscreen",
            className: `absolute bottom-3 right-3 z-20 rounded-md bg-black/60 p-2 text-white transition-opacity hover:bg-black/80 focus:opacity-100 focus-visible:outline focus-visible:outline-2 group-hover:opacity-100 [div:hover>&]:opacity-100 ${isMobile ? "opacity-100" : "opacity-0"}`,
            children: isFullscreen ? /* @__PURE__ */ jsxRuntimeExports.jsx(Minimize, { className: "h-4 w-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Maximize, { className: "h-4 w-4" })
          }
        )
      ]
    }
  );
}
export {
  DownloadButton as D,
  EmbedPlayer as E,
  UpNextOverlay as U,
  VideoPlayer as V,
  useActiveCues as a,
  formatTime as f,
  useAniskip as u
};
