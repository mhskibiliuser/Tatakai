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
function installNativePlayerBridge() {
  if (installed || typeof window === "undefined" || !isAndroid()) return;
  if (!Capacitor.isPluginAvailable("NativePlayer")) return;
  const plugin = registerPlugin("NativePlayer");
  const runtime = window.tatakaiRuntime || (window.tatakaiRuntime = {});
  const listeners = /* @__PURE__ */ new Set();
  runtime.openNativePlayer = async (options) => {
    try {
      return await plugin.open(options);
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : String(error) };
    }
  };
  runtime.closeNativePlayer = async () => {
    try {
      return await plugin.close();
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : String(error) };
    }
  };
  runtime.onNativePlayerEvent = (listener) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  };
  ["playerProgress", "playerEnded", "playerClosed", "playerError"].forEach((eventName) => {
    void plugin.addListener(eventName, (event) => {
      listeners.forEach((listener) => {
        try {
          listener({ ...event, type: eventName });
        } catch {
        }
      });
    }).catch(() => {
    });
  });
  installed = true;
}
function readRuntime() {
  if (typeof window === "undefined") return null;
  const runtime = window.tatakaiRuntime;
  if (!(runtime == null ? void 0 : runtime.openNativePlayer) || !(runtime == null ? void 0 : runtime.onNativePlayerEvent)) return null;
  return runtime;
}
function isNativePlayerAvailable() {
  if (!isAndroid()) return false;
  return readRuntime() != null || Capacitor.isPluginAvailable("NativePlayer");
}
async function openNativePlayer(options) {
  installNativePlayerBridge();
  const runtime = readRuntime();
  if (!runtime) return { success: false, error: "Native torrent playback is unavailable in this app build." };
  try {
    return await runtime.openNativePlayer(options);
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : String(error) };
  }
}
async function closeNativePlayer() {
  const runtime = readRuntime();
  if (!(runtime == null ? void 0 : runtime.closeNativePlayer)) return { success: true };
  try {
    return await runtime.closeNativePlayer();
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : String(error) };
  }
}
function onNativePlayerEvent(listener) {
  installNativePlayerBridge();
  const runtime = readRuntime();
  if (!(runtime == null ? void 0 : runtime.onNativePlayerEvent)) return () => void 0;
  return runtime.onNativePlayerEvent(listener);
}
export {
  closeNativePlayer,
  installNativePlayerBridge,
  isNativePlayerAvailable,
  onNativePlayerEvent,
  openNativePlayer
};
