const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/index.C6yfkT5T.js","assets/react-vendor.CAo4XUiA.js","assets/vendor.CJyRs4QS.js","assets/tanstack.DPr3OB19.js","assets/supabase.WuRMX5Dg.js","assets/radix.BiK9uYXL.js","assets/icons.C2gBBarQ.js","assets/motion.DVGLRFCH.js","assets/hls.BlgtCWcq.js","assets/editor.Dxw8dtyw.js","assets/charts.Dr1fgDJ-.js","assets/index.CWbmAlRn.css"])))=>i.map(i=>d[i]);
import { b9 as __vitePreload } from "./vendor.CJyRs4QS.js";
import { r as reactExports } from "./react-vendor.CAo4XUiA.js";
import { K as useIsDesktopApp, U as useIsMobileApp, dB as isEnabled, am as FeatureFlag, dC as useDownloadStates, dD as markQueued, dE as markFailedStart, dF as markCancelled } from "./index.C6yfkT5T.js";
function isTorrentDownloadUrl(url) {
  const u = String(url || "");
  const low = u.toLowerCase();
  return low.startsWith("magnet:") || low.includes(".torrent") || low.includes("/webtorrent/") || low.startsWith("torrent-session://");
}
function useDownload() {
  var _a;
  const isDesktop = useIsDesktopApp();
  const isMobileApp = useIsMobileApp();
  const managerEnabled = isEnabled(FeatureFlag.DOWNLOAD_MANAGER);
  const downloadStates = useDownloadStates();
  const startDownload = reactExports.useCallback(
    async (payload) => {
      var _a2;
      if (isMobileApp) {
        const url2 = payload.url;
        if (!url2 || typeof url2 !== "string") {
          return { ok: false, reason: "missing_stream_url" };
        }
        const sourceType2 = isTorrentDownloadUrl(url2) ? "torrent" : "hls";
        localStorage.setItem(
          `tatakai:dl:meta:${payload.episodeId}`,
          JSON.stringify({
            animeId: payload.animeId || 0,
            animeTitle: payload.animeName,
            episodeNumber: payload.episodeNumber,
            posterUrl: payload.posterUrl,
            sourceType: sourceType2,
            resolvedLanguage: payload.resolvedLanguage || "unknown",
            startedAt: (/* @__PURE__ */ new Date()).toISOString(),
            // Resumable fields: the offline hub's Retry button re-enqueues
            // from this meta without needing the series page (and its fresh
            // source resolution) again.
            url: url2,
            headers: payload.headers,
            originalUrl: payload.originalUrl,
            subtitles: payload.subtitles
          })
        );
        markQueued(payload.episodeId, {
          animeName: payload.animeName,
          episodeNumber: payload.episodeNumber,
          posterUrl: payload.posterUrl,
          sourceType: sourceType2
        });
        const { startMobileDownload } = await __vitePreload(async () => {
          const { startMobileDownload: startMobileDownload2 } = await import("./index.C6yfkT5T.js").then((n) => n.hm);
          return { startMobileDownload: startMobileDownload2 };
        }, true ? __vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11]) : void 0);
        const res2 = await startMobileDownload({
          episodeId: payload.episodeId,
          url: url2,
          animeName: payload.animeName,
          episodeNumber: payload.episodeNumber,
          headers: payload.headers,
          originalUrl: payload.originalUrl,
          subtitles: payload.subtitles
        });
        return res2.ok ? { ok: true } : {
          ok: false,
          reason: "mobile_download_failed",
          error: "reason" in res2 ? res2.reason : "mobile_download_failed"
        };
      }
      if (!isDesktop || !((_a2 = window.electron) == null ? void 0 : _a2.startDownload)) {
        return { ok: false, reason: "not_desktop" };
      }
      if (!managerEnabled) {
        return { ok: false, reason: "feature_disabled" };
      }
      const url = payload.url;
      if (!url || typeof url !== "string") {
        return { ok: false, reason: "missing_stream_url" };
      }
      const downloadPath = payload.downloadPath || typeof localStorage !== "undefined" && localStorage.getItem("tatakai_download_path") || void 0;
      if (!downloadPath) {
        return { ok: false, reason: "missing_download_path" };
      }
      const sourceType = isTorrentDownloadUrl(url) ? "torrent" : "hls";
      const meta = {
        animeId: payload.animeId || 0,
        animeTitle: payload.animeName,
        episodeNumber: payload.episodeNumber,
        posterUrl: payload.posterUrl,
        sourceType,
        resolvedLanguage: payload.resolvedLanguage || "unknown",
        startedAt: (/* @__PURE__ */ new Date()).toISOString()
      };
      localStorage.setItem(`tatakai:dl:meta:${payload.episodeId}`, JSON.stringify(meta));
      markQueued(payload.episodeId, {
        animeName: payload.animeName,
        episodeNumber: payload.episodeNumber,
        posterUrl: payload.posterUrl,
        sourceType
      });
      const res = await window.electron.startDownload({
        episodeId: payload.episodeId,
        animeName: payload.animeName,
        episodeNumber: payload.episodeNumber,
        // The main process branches on `sourceType`, and the torrent branch
        // reads `magnet` (NOT `url`). Passing only `url` for a magnet routed
        // torrents into the ffmpeg/HLS branch → "ffmpeg exit code 1". Send both
        // so torrent downloads take the torrent session path from any caller.
        sourceType,
        url,
        magnet: sourceType === "torrent" ? url : void 0,
        fileIndex: payload.fileIndex,
        headers: payload.headers || {},
        downloadPath,
        posterUrl: payload.posterUrl,
        subtitles: payload.subtitles
      });
      if (!(res == null ? void 0 : res.success)) {
        markFailedStart(
          payload.episodeId,
          typeof (res == null ? void 0 : res.error) === "string" ? res.error : "start_failed"
        );
        return { ok: false, reason: "ipc_error", error: res == null ? void 0 : res.error };
      }
      return { ok: true };
    },
    [isDesktop, isMobileApp, managerEnabled]
  );
  const cancelDownload = reactExports.useCallback(async (episodeId, animePath) => {
    var _a2;
    if (isMobileApp) {
      const { cancelMobileDownload } = await __vitePreload(async () => {
        const { cancelMobileDownload: cancelMobileDownload2 } = await import("./index.C6yfkT5T.js").then((n) => n.hm);
        return { cancelMobileDownload: cancelMobileDownload2 };
      }, true ? __vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11]) : void 0);
      cancelMobileDownload(episodeId);
      markCancelled(episodeId);
      return;
    }
    if (!((_a2 = window.electron) == null ? void 0 : _a2.cancelDownload)) return;
    await window.electron.cancelDownload({ episodeId, animePath });
    markCancelled(episodeId);
  }, [isMobileApp]);
  const bridgeReady = typeof window !== "undefined" && !!((_a = window.electron) == null ? void 0 : _a.startDownload);
  return reactExports.useMemo(
    () => ({
      // Mobile: always enabled (native downloader). Desktop: needs the IPC bridge.
      isEnabled: isMobileApp || isDesktop && managerEnabled && bridgeReady,
      downloadStates,
      startDownload,
      cancelDownload
    }),
    [isDesktop, isMobileApp, managerEnabled, bridgeReady, downloadStates, startDownload, cancelDownload]
  );
}
export {
  useDownload as u
};
