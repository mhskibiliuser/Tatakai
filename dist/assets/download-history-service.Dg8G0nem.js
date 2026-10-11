import { d as db } from "./index.C6yfkT5T.js";
import "./react-vendor.CAo4XUiA.js";
import "./vendor.CJyRs4QS.js";
import "./tanstack.DPr3OB19.js";
import "./supabase.WuRMX5Dg.js";
import "./radix.BiK9uYXL.js";
import "./icons.C2gBBarQ.js";
import "./motion.DVGLRFCH.js";
import "./hls.BlgtCWcq.js";
import "./editor.Dxw8dtyw.js";
import "./charts.Dr1fgDJ-.js";
async function recordDownload(entry) {
  const id = `${entry.animeId}:${entry.episodeNumber}:${entry.startedAt}`;
  try {
    await db.downloadHistory.put({ ...entry, id });
  } catch (err) {
    console.warn("[DownloadHistory] Failed to record entry:", err);
  }
}
async function getHistory(limit = 200) {
  try {
    const all = await db.downloadHistory.orderBy("startedAt").reverse().limit(Math.min(limit, 500)).toArray();
    return all;
  } catch (err) {
    console.warn("[DownloadHistory] Failed to read history:", err);
    return [];
  }
}
async function getHistoryForAnime(animeId) {
  try {
    return await db.downloadHistory.where("animeId").equals(animeId).reverse().sortBy("startedAt");
  } catch (err) {
    console.warn("[DownloadHistory] Failed to read history for anime:", err);
    return [];
  }
}
async function getHistoryByStatus(status, limit = 100) {
  try {
    return await db.downloadHistory.where("status").equals(status).reverse().limit(limit).sortBy("startedAt");
  } catch (err) {
    console.warn("[DownloadHistory] Failed to read history by status:", err);
    return [];
  }
}
async function getDownloadStats() {
  const stats = {
    total: 0,
    completed: 0,
    failed: 0,
    cancelled: 0,
    totalSizeBytes: 0
  };
  try {
    await db.downloadHistory.each((entry) => {
      stats.total++;
      if (entry.status === "completed") {
        stats.completed++;
        stats.totalSizeBytes += entry.fileSizeBytes ?? 0;
      } else if (entry.status === "failed") {
        stats.failed++;
      } else if (entry.status === "cancelled") {
        stats.cancelled++;
      }
    });
  } catch (err) {
    console.warn("[DownloadHistory] Failed to compute stats:", err);
  }
  return stats;
}
async function clearHistory() {
  try {
    await db.downloadHistory.clear();
  } catch (err) {
    console.warn("[DownloadHistory] Failed to clear history:", err);
  }
}
async function pruneOldHistory(daysOld = 90) {
  const cutoff = new Date(Date.now() - daysOld * 864e5).toISOString();
  try {
    const keys = await db.downloadHistory.where("startedAt").below(cutoff).primaryKeys();
    await db.downloadHistory.bulkDelete(keys);
    return keys.length;
  } catch (err) {
    console.warn("[DownloadHistory] Failed to prune old history:", err);
    return 0;
  }
}
export {
  clearHistory,
  getDownloadStats,
  getHistory,
  getHistoryByStatus,
  getHistoryForAnime,
  pruneOldHistory,
  recordDownload
};
