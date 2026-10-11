const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/vendor.CJyRs4QS.js","assets/react-vendor.CAo4XUiA.js","assets/manga-extension-runtime.DnG346KM.js","assets/index.C6yfkT5T.js","assets/tanstack.DPr3OB19.js","assets/supabase.WuRMX5Dg.js","assets/radix.BiK9uYXL.js","assets/icons.C2gBBarQ.js","assets/motion.DVGLRFCH.js","assets/hls.BlgtCWcq.js","assets/editor.Dxw8dtyw.js","assets/charts.Dr1fgDJ-.js","assets/index.CWbmAlRn.css"])))=>i.map(i=>d[i]);
import { b9 as __vitePreload, b6 as Capacitor } from "./vendor.CJyRs4QS.js";
import { eD as mangaJobId, a as isCapacitor, gK as downloadServiceStart, gL as markMangaError, gM as downloadServiceFinish, dk as fetchViaMobileProxy, cf as normalizeMobileHeaders, gN as markMangaProgress, gO as downloadServiceProgress, gP as markMangaCompleted, cd as isMobileProxyUrl, f1 as isNativeProxyUrl, ce as resolveMobileProxy } from "./index.C6yfkT5T.js";
import "./react-vendor.CAo4XUiA.js";
import "./tanstack.DPr3OB19.js";
import "./supabase.WuRMX5Dg.js";
import "./radix.BiK9uYXL.js";
import "./icons.C2gBBarQ.js";
import "./motion.DVGLRFCH.js";
import "./hls.BlgtCWcq.js";
import "./editor.Dxw8dtyw.js";
import "./charts.Dr1fgDJ-.js";
function chapterLabelFor(chapter) {
  const numLabel = chapter.chapterNumber != null ? `Ch. ${chapter.chapterNumber}` : "Chapter";
  return `${chapter.volume != null ? `Vol ${chapter.volume} · ` : ""}${numLabel}`;
}
const ROOT = "tatakai/manga";
const cancelled = /* @__PURE__ */ new Set();
function safeSeg(s) {
  return String(s).replace(/[^a-z0-9._-]+/gi, "_").slice(0, 120);
}
function chapterDir(anilistId, chapterKey) {
  return `${ROOT}/${anilistId}/${safeSeg(chapterKey)}`;
}
function extFromUrl(url) {
  var _a;
  return (((_a = url.split("?")[0].match(/\.(jpe?g|png|webp|gif|avif)$/i)) == null ? void 0 : _a[1]) || "jpg").toLowerCase();
}
function pageCandidates(page) {
  const proxied = String(page.proxiedImageUrl || "").trim();
  const original = String(page.originalUrl || page.imageUrl || "").trim();
  const out = [];
  const push = (value) => {
    if (value && !out.includes(value)) out.push(value);
  };
  if (isMobileProxyUrl(proxied)) push(proxied);
  else if (isNativeProxyUrl(proxied)) {
    if (resolveMobileProxy(proxied)) push(proxied);
    else if (proxied) push(proxied);
  } else if (proxied) push(proxied);
  push(original);
  return out;
}
function toBase64(buf) {
  const bytes = new Uint8Array(buf);
  let binary = "";
  const chunk = 32768;
  for (let i = 0; i < bytes.length; i += chunk) {
    binary += String.fromCharCode.apply(null, Array.from(bytes.subarray(i, i + chunk)));
  }
  return btoa(binary);
}
async function downloadMangaChapterMobile(series, chapter) {
  var _a;
  if (!isCapacitor()) return { ok: false, reason: "not_mobile" };
  const jobId = mangaJobId(series.anilistId, chapter.chapterKey);
  cancelled.delete(jobId);
  const svcLabel = `${series.title} · ${chapterLabelFor(chapter)}`;
  downloadServiceStart(jobId, svcLabel);
  try {
    const { Filesystem, Directory } = await __vitePreload(async () => {
      const { Filesystem: Filesystem2, Directory: Directory2 } = await import("./vendor.CJyRs4QS.js").then((n) => n.ca);
      return { Filesystem: Filesystem2, Directory: Directory2 };
    }, true ? __vite__mapDeps([0,1]) : void 0);
    const { fetchExtensionMangaPages } = await __vitePreload(async () => {
      const { fetchExtensionMangaPages: fetchExtensionMangaPages2 } = await import("./manga-extension-runtime.DnG346KM.js");
      return { fetchExtensionMangaPages: fetchExtensionMangaPages2 };
    }, true ? __vite__mapDeps([2,3,1,0,4,5,6,7,8,9,10,11,12]) : void 0);
    const attempts = [];
    const pushAttempt = (provider, chapterKey, providerChapterId) => {
      if (!provider || !chapterKey) return;
      if (attempts.some((a) => a.provider === provider && a.chapterKey === chapterKey)) return;
      attempts.push({ provider, chapterKey, providerChapterId });
    };
    pushAttempt(chapter.provider || "", chapter.chapterKey, chapter.providerChapterId);
    for (const a of chapter.alternatives || []) {
      pushAttempt(a.provider || "", a.chapterKey || "", a.providerChapterId);
    }
    const dir = chapterDir(series.anilistId, chapter.chapterKey);
    try {
      await Filesystem.mkdir({ path: dir, directory: Directory.Documents, recursive: true });
    } catch {
    }
    let usedProvider = null;
    let sizeBytes = 0;
    let okPages = 0;
    let totalPages = 0;
    let lastErrors = [];
    let attemptedProviders = [];
    for (const attempt of attempts) {
      if (cancelled.has(jobId)) {
        markMangaError(jobId, "cancelled");
        downloadServiceFinish(jobId, { ok: false, cancelled: true, label: svcLabel });
        return { ok: false, reason: "cancelled" };
      }
      const read = await fetchExtensionMangaPages({
        extensionId: attempt.provider,
        chapterKey: attempt.chapterKey,
        providerChapterId: attempt.providerChapterId,
        anilistId: series.anilistId,
        alternatives: []
      });
      const pages = read.success ? ((_a = read.data) == null ? void 0 : _a.pages) ?? [] : [];
      if (!pages.length) {
        lastErrors = [read.message || `No pages from ${attempt.provider}`];
        attemptedProviders.push(attempt.provider);
        continue;
      }
      attemptedProviders.push(attempt.provider);
      if (usedProvider !== null || okPages > 0 || lastErrors.length > 0) {
        try {
          const { files } = await Filesystem.readdir({ path: dir, directory: Directory.Documents });
          const names = (files || []).map((f) => typeof f === "string" ? f : String(f.name || ""));
          for (const name of names) {
            if (!/^\d{4}\./.test(name)) continue;
            try {
              await Filesystem.deleteFile({ path: `${dir}/${name}`, directory: Directory.Documents });
            } catch {
            }
          }
        } catch {
        }
      }
      const total = pages.length;
      let attemptOk = 0;
      let attemptBytes = 0;
      const pageErrors = [];
      let attemptCancelled = false;
      for (let i = 0; i < total; i++) {
        if (cancelled.has(jobId)) {
          attemptCancelled = true;
          break;
        }
        const page = pages[i];
        const candidates = pageCandidates(page);
        if (!candidates.length) {
          pageErrors.push(`page ${i + 1}: no URL`);
          continue;
        }
        let buf = null;
        let lastErr = "";
        for (const src of candidates) {
          for (let retry = 0; retry < 3; retry++) {
            try {
              const fetched = await fetchViaMobileProxy(src, {
                originalUrl: page.originalUrl || page.imageUrl,
                headers: normalizeMobileHeaders(page.headers),
                responseType: "arraybuffer",
                timeoutMs: 3e4
              });
              if (!fetched.ok || !fetched.data || fetched.data.byteLength === 0) {
                const status = Number(fetched.status) || 0;
                if (status === 404) {
                  lastErr = `page ${i + 1}: HTTP 404`;
                  break;
                }
                throw new Error(`page ${i + 1}: HTTP ${status || "fetch failed"}`);
              }
              const ct = String(fetched.contentType || "").split(";")[0].trim().toLowerCase();
              if (ct && !ct.startsWith("image/") && !ct.includes("octet-stream")) {
                lastErr = `page ${i + 1}: unexpected content-type ${ct || "unknown"}`;
                break;
              }
              buf = fetched.data;
              break;
            } catch (e) {
              lastErr = e instanceof Error ? e.message : String(e);
              if (/HTTP 404/.test(lastErr)) break;
              if (retry + 1 < 3) await new Promise((r) => setTimeout(r, 600 * (retry + 1)));
            }
          }
          if (buf) break;
        }
        if (!buf) {
          pageErrors.push(lastErr || `page ${i + 1}: download failed`);
          continue;
        }
        attemptOk++;
        attemptBytes += buf.byteLength;
        const filePath = `${dir}/${String(i + 1).padStart(4, "0")}.${extFromUrl(String(page.imageUrl || candidates[0]))}`;
        await Filesystem.writeFile({
          path: filePath,
          directory: Directory.Documents,
          data: toBase64(buf),
          recursive: true
        });
        const pagePct = Math.round((i + 1) / total * 100);
        markMangaProgress(jobId, {
          anilistId: series.anilistId,
          chapterKey: chapter.chapterKey,
          page: i + 1,
          totalPages: total,
          percent: pagePct
        });
        downloadServiceProgress(jobId, svcLabel, pagePct);
      }
      if (attemptCancelled) {
        markMangaError(jobId, "cancelled");
        downloadServiceFinish(jobId, { ok: false, cancelled: true, label: svcLabel });
        return { ok: false, reason: "cancelled" };
      }
      if (attemptOk > 0) {
        usedProvider = attempt.provider;
        okPages = attemptOk;
        sizeBytes = attemptBytes;
        totalPages = total;
        lastErrors = pageErrors;
        break;
      }
      lastErrors = pageErrors.length ? pageErrors : [`No images from ${attempt.provider}`];
    }
    if (okPages === 0) {
      const tried = attemptedProviders.length ? ` (tried: ${attemptedProviders.join(", ")})` : "";
      const hint = lastErrors.some((e) => /404/.test(e)) ? `All page images returned 404${tried} — the sources removed or moved this chapter. Try another chapter or check for extension updates.` : (lastErrors[0] || "No pages downloaded.") + tried;
      markMangaError(jobId, hint);
      downloadServiceFinish(jobId, { ok: false, label: svcLabel });
      return { ok: false, reason: hint };
    }
    markMangaCompleted({
      anilistId: series.anilistId,
      chapterKey: chapter.chapterKey,
      chapterNumber: chapter.chapterNumber ?? null,
      volume: chapter.volume ?? null,
      provider: usedProvider ?? chapter.provider ?? null,
      title: series.title,
      localDir: dir,
      pageCount: okPages,
      sizeBytes
    });
    downloadServiceFinish(jobId, { ok: true, label: svcLabel });
    return { ok: true };
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    markMangaError(jobId, msg);
    downloadServiceFinish(jobId, { ok: false, label: svcLabel });
    return { ok: false, reason: msg };
  }
}
function cancelMangaChapterMobile(anilistId, chapterKey) {
  cancelled.add(mangaJobId(anilistId, chapterKey));
}
async function downloadMangaChaptersMobile(series, chapters) {
  if (!isCapacitor()) return { ok: false, reason: "not_mobile" };
  let completed = 0;
  for (const chapter of chapters) {
    const res = await downloadMangaChapterMobile(series, chapter);
    if (res.ok) completed++;
  }
  return { ok: true, completed };
}
async function deleteOfflineMangaChapter(anilistId, chapterKey) {
  if (!isCapacitor()) return;
  try {
    const { Filesystem, Directory } = await __vitePreload(async () => {
      const { Filesystem: Filesystem2, Directory: Directory2 } = await import("./vendor.CJyRs4QS.js").then((n) => n.ca);
      return { Filesystem: Filesystem2, Directory: Directory2 };
    }, true ? __vite__mapDeps([0,1]) : void 0);
    try {
      await Filesystem.rmdir({ path: chapterDir(anilistId, chapterKey), directory: Directory.Documents, recursive: true });
    } catch {
    }
  } catch {
  }
  try {
    const { db } = await __vitePreload(async () => {
      const { db: db2 } = await import("./index.C6yfkT5T.js").then((n) => n.hk);
      return { db: db2 };
    }, true ? __vite__mapDeps([3,1,0,4,5,6,7,8,9,10,11,12]) : void 0);
    await db.offlineChapters.delete(`${anilistId}:${chapterKey}`);
  } catch {
  }
}
async function getOfflineMangaPagesMobile(anilistId, chapterKey) {
  if (!isCapacitor()) return [];
  try {
    const { Filesystem, Directory } = await __vitePreload(async () => {
      const { Filesystem: Filesystem2, Directory: Directory2 } = await import("./vendor.CJyRs4QS.js").then((n) => n.ca);
      return { Filesystem: Filesystem2, Directory: Directory2 };
    }, true ? __vite__mapDeps([0,1]) : void 0);
    const dir = chapterDir(anilistId, chapterKey);
    const { files } = await Filesystem.readdir({ path: dir, directory: Directory.Documents });
    const names = (files || []).map((f) => typeof f === "string" ? f : f.name).filter((n) => /\.(jpe?g|png|webp|gif|avif)$/i.test(n)).sort();
    const out = [];
    for (let i = 0; i < names.length; i++) {
      const { uri } = await Filesystem.getUri({
        path: `${dir}/${names[i]}`,
        directory: Directory.Documents
      });
      out.push({ pageNumber: i + 1, imageUrl: Capacitor.convertFileSrc(uri) });
    }
    return out;
  } catch {
    return [];
  }
}
export {
  cancelMangaChapterMobile,
  deleteOfflineMangaChapter,
  downloadMangaChapterMobile,
  downloadMangaChaptersMobile,
  getOfflineMangaPagesMobile
};
