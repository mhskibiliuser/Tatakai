const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/download-history-service.Dg8G0nem.js","assets/index.C6yfkT5T.js","assets/react-vendor.CAo4XUiA.js","assets/vendor.CJyRs4QS.js","assets/tanstack.DPr3OB19.js","assets/supabase.WuRMX5Dg.js","assets/radix.BiK9uYXL.js","assets/icons.C2gBBarQ.js","assets/motion.DVGLRFCH.js","assets/hls.BlgtCWcq.js","assets/editor.Dxw8dtyw.js","assets/charts.Dr1fgDJ-.js","assets/index.CWbmAlRn.css"])))=>i.map(i=>d[i]);
import { b9 as __vitePreload } from "./vendor.CJyRs4QS.js";
import { d as db, da as loadMobileConfig } from "./index.C6yfkT5T.js";
function isWifiOnlyBlocked() {
  try {
    const cfg = loadMobileConfig();
    if (!cfg.wifiOnlyDownloads) return false;
    if (typeof navigator !== "undefined" && navigator.onLine === false) return true;
    const conn = navigator.connection;
    if (!conn) return false;
    if (conn.saveData === true) return true;
    const type = String(conn.type || "").toLowerCase();
    if (["cellular", "bluetooth", "wimax", "mixed"].some((t) => type.includes(t))) return true;
    return false;
  } catch {
    return false;
  }
}
function isAutoEvictEnabled() {
  try {
    return loadMobileConfig().autoEvictWatched === true;
  } catch {
    return false;
  }
}
async function evictWatchedAnime(limit = 20) {
  if (!isAutoEvictEnabled()) return 0;
  try {
    const { getHistoryByStatus } = await __vitePreload(async () => {
      const { getHistoryByStatus: getHistoryByStatus2 } = await import("./download-history-service.Dg8G0nem.js");
      return { getHistoryByStatus: getHistoryByStatus2 };
    }, true ? __vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12]) : void 0);
    const done = await getHistoryByStatus("completed", limit).catch(() => []);
    let removed = 0;
    for (const entry of done.slice(0, limit)) {
      try {
        await db.downloadHistory.delete(entry.id);
        removed += 1;
      } catch {
      }
    }
    return removed;
  } catch {
    return 0;
  }
}
const INTENT_KEY = "tatakai_auto_next_intent";
function armAutoDownloadNext(intent) {
  try {
    if (typeof localStorage === "undefined") return false;
    if (!loadMobileConfig().autoDownloadNext) return false;
    if (isWifiOnlyBlocked()) return false;
    const full = { ...intent, createdAt: Date.now() };
    localStorage.setItem(INTENT_KEY, JSON.stringify(full));
    return true;
  } catch {
    return false;
  }
}
function consumeAutoDownloadNext(animeId) {
  try {
    if (typeof localStorage === "undefined") return null;
    const raw = localStorage.getItem(INTENT_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (Number(parsed.animeId) !== Number(animeId)) return parsed;
    localStorage.removeItem(INTENT_KEY);
    if (Date.now() - Number(parsed.createdAt || 0) > 7 * 24 * 60 * 60 * 1e3) return null;
    return parsed;
  } catch {
    return null;
  }
}
function peekAutoDownloadNext() {
  try {
    const raw = localStorage.getItem(INTENT_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}
const autoDownloadNext = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  armAutoDownloadNext,
  consumeAutoDownloadNext,
  peekAutoDownloadNext
}, Symbol.toStringTag, { value: "Module" }));
export {
  autoDownloadNext as a,
  consumeAutoDownloadNext as c,
  evictWatchedAnime as e,
  isWifiOnlyBlocked as i,
  peekAutoDownloadNext as p
};
