import { b6 as Capacitor, b8 as registerPlugin } from "./vendor.CJyRs4QS.js";
import { i as isAndroid } from "./index.C6yfkT5T.js";
import "./react-vendor.CAo4XUiA.js";
import "./tanstack.DPr3OB19.js";
import "./supabase.WuRMX5Dg.js";
import "./radix.BiK9uYXL.js";
import "./icons.C2gBBarQ.js";
import "./motion.DVGLRFCH.js";
import "./hls.BlgtCWcq.js";
import "./editor.Dxw8dtyw.js";
import "./charts.Dr1fgDJ-.js";
let installed = false;
function installMobileTorrentBridge() {
  if (installed || typeof window === "undefined") return;
  if (!isAndroid()) return;
  if (!Capacitor.isPluginAvailable("TatakaiTorrent")) return;
  const plugin = registerPlugin("TatakaiTorrent");
  const rt = window.tatakaiRuntime || (window.tatakaiRuntime = {});
  const progressListeners = /* @__PURE__ */ new Set();
  let nativeProgressListener = null;
  let progressListenerPending = false;
  const ensureProgressListener = () => {
    if (nativeProgressListener || progressListenerPending) return;
    progressListenerPending = true;
    void plugin.addListener("torrentProgress", (event) => {
      progressListeners.forEach((listener) => {
        try {
          listener(event);
        } catch {
        }
      });
    }).then((handle) => {
      nativeProgressListener = handle;
    }).catch(() => {
    }).finally(() => {
      progressListenerPending = false;
    });
  };
  rt.startTorrentSession = async (infoHashOrMagnet, options) => {
    try {
      return await plugin.addMagnet({
        magnet: (options == null ? void 0 : options.magnet) || infoHashOrMagnet,
        fileIndex: options == null ? void 0 : options.fileIndex
      });
    } catch (e) {
      return { success: false, error: e instanceof Error ? e.message : String(e) };
    }
  };
  rt.onTorrentProgress = (listener) => {
    progressListeners.add(listener);
    ensureProgressListener();
    return () => {
      progressListeners.delete(listener);
      if (progressListeners.size === 0 && nativeProgressListener) {
        const handle = nativeProgressListener;
        nativeProgressListener = null;
        void handle.remove();
      }
    };
  };
  rt.getTorrentStreamUrl = async (sessionId, fileIndex) => {
    try {
      return await plugin.getStreamUrl({ sessionId, fileIndex });
    } catch (e) {
      return { success: false, error: e instanceof Error ? e.message : String(e) };
    }
  };
  rt.getTorrentPeers = async (sessionId) => {
    try {
      return await plugin.getPeers({ sessionId });
    } catch (e) {
      return { success: false, error: e instanceof Error ? e.message : String(e) };
    }
  };
  rt.ensureTorrentPrebuffer = async (sessionId, fileIndex) => {
    try {
      return await plugin.ensurePrebuffer({ sessionId, fileIndex });
    } catch (e) {
      return { success: false, error: e instanceof Error ? e.message : String(e) };
    }
  };
  rt.stopTorrentSession = async (sessionId, options) => {
    try {
      return await plugin.stopSession({ sessionId, destroyStore: options == null ? void 0 : options.destroyStore });
    } catch (e) {
      return { success: false, error: e instanceof Error ? e.message : String(e) };
    }
  };
  rt.listTorrentSessions = async () => {
    try {
      return await plugin.listSessions();
    } catch (e) {
      return { success: false, error: e instanceof Error ? e.message : String(e) };
    }
  };
  rt.clearAllTorrentData = async () => {
    try {
      return await plugin.clearAll();
    } catch (e) {
      return { success: false, error: e instanceof Error ? e.message : String(e) };
    }
  };
  rt.addTorrentMagnet = async (magnet) => {
    try {
      return await plugin.addMagnet({ magnet });
    } catch (e) {
      return { success: false, error: e instanceof Error ? e.message : String(e) };
    }
  };
  installed = true;
}
export {
  installMobileTorrentBridge
};
