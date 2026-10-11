import { dJ as resolveExtensionApiBase, eS as MOBILE_EXT_BASE } from "./index.C6yfkT5T.js";
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
function getRuntime() {
  return typeof window !== "undefined" ? window : {};
}
function hasExtensionRuntime() {
  var _a, _b;
  const w = getRuntime();
  return Boolean(
    ((_a = w.electron) == null ? void 0 : _a.invokeExtension) || ((_b = w.tatakaiRuntime) == null ? void 0 : _b.invokeExtension) || typeof window !== "undefined" && window.tatakaiMobileExtensions
  );
}
async function listMangaExtensions() {
  var _a;
  const w = getRuntime();
  try {
    if ((_a = w.electron) == null ? void 0 : _a.listInstalledExtensions) {
      const rows = await w.electron.listInstalledExtensions();
      return (rows || []).filter((row) => {
        const caps = row.capabilities || [];
        return caps.includes("manga") || caps.includes("chapters");
      }).map((row) => row.id).filter(Boolean);
    }
  } catch {
  }
  return [];
}
async function invokeExt(extensionId, method, args) {
  var _a, _b;
  const w = getRuntime();
  if ((_a = w.electron) == null ? void 0 : _a.invokeExtension) {
    return w.electron.invokeExtension(extensionId, method, args);
  }
  if ((_b = w.tatakaiRuntime) == null ? void 0 : _b.invokeExtension) {
    return w.tatakaiRuntime.invokeExtension(extensionId, method, args);
  }
  throw new Error("Extension runtime unavailable");
}
function dbg(...args) {
  return;
}
function dbgWarn(...args) {
  return;
}
const subProviderToNamespace = /* @__PURE__ */ new Map();
function mangaNamespaces(namespaces) {
  return namespaces.filter((ns) => {
    const caps = ns.capabilities || [];
    const routes = ns.routes || [];
    return caps.includes("manga") || caps.includes("chapters") || routes.includes("manga/chapters");
  });
}
async function resolveMangaHttpEnv() {
  try {
    let base = await resolveExtensionApiBase();
    const isMobileHost = typeof window !== "undefined" && !!window.tatakaiMobileExtensions;
    for (let attempt = 0; isMobileHost && mangaNamespaces(base.namespaces || []).length === 0 && attempt < 10; attempt += 1) {
      await new Promise((resolve) => setTimeout(resolve, 400));
      base = await resolveExtensionApiBase(true);
    }
    dbg("resolveMangaHttpEnv: base=", base == null ? void 0 : base.baseUrl, "namespaces=", ((base == null ? void 0 : base.namespaces) || []).map((n) => ({ ns: n.namespace, caps: n.capabilities, routes: n.routes })));
    if (!base.baseUrl) {
      dbgWarn("resolveMangaHttpEnv: no baseUrl — host not up");
      return null;
    }
    const namespaces = mangaNamespaces(base.namespaces || []);
    dbg("resolveMangaHttpEnv: manga-capable namespaces=", namespaces.map((n) => n.namespace));
    if (namespaces.length === 0) {
      dbgWarn("resolveMangaHttpEnv: no manga-capable namespaces among", (base.namespaces || []).map((n) => n.namespace));
      return null;
    }
    return { baseUrl: base.baseUrl, namespaces };
  } catch (err) {
    return null;
  }
}
async function httpGetJson(url, timeoutMs = 2e4) {
  try {
    const res = await fetch(url, {
      signal: AbortSignal.timeout(timeoutMs),
      headers: { Accept: "application/json" }
    });
    if (!res.ok) {
      dbgWarn("httpGetJson: HTTP", res.status, url);
      return { status: res.status, body: null };
    }
    return { status: res.status, body: await res.json() };
  } catch (err) {
    return { status: 0, body: null };
  }
}
const MDBG = "[toko/manga]";
function logMangaProviderStatus(d, chapters) {
  const ms = Number.isFinite(d.durationMs) ? `${d.durationMs}ms` : "?ms";
  const attempts = (d.attempts ?? 0) > 1 ? ` attempts=${d.attempts}` : "";
  const err = d.error ? ` error=${d.error}` : "";
  const line = `${MDBG} provider=${d.provider} chapters=${chapters} reported=${d.resultCount ?? 0} status=${d.status} ${ms}${attempts}${err}`;
  if (d.status === "error" || d.status === "timeout") console.warn(line);
  else console.info(line);
}
function logMangaSummary(diagnostics, perProvider, totalChapters) {
  var _a;
  for (const d of diagnostics) logMangaProviderStatus(d, perProvider.get(d.provider) ?? 0);
  const byStatus = diagnostics.reduce((acc, d) => {
    acc[d.status] = (acc[d.status] || 0) + 1;
    return acc;
  }, {});
  const summary = Object.entries(byStatus).map(([k, v]) => `${k}=${v}`).join(" ");
  console.info(
    `${MDBG} done — ${totalChapters} chapters merged from ${diagnostics.length} providers (${summary})`
  );
  const rows = diagnostics.map((d) => ({
    provider: d.provider,
    // `chapters` is what survived the merge; `reported` is the provider's raw
    // count. A gap means another provider already supplied those numbers.
    chapters: perProvider.get(d.provider) ?? 0,
    reported: d.resultCount ?? 0,
    status: d.status,
    ms: d.durationMs ?? 0,
    error: d.error || ""
  })).sort((a, b) => b.chapters - a.chapters || a.provider.localeCompare(b.provider));
  for (const [provider, chapters] of perProvider) {
    if (!diagnostics.some((d) => d.provider === provider)) {
      rows.push({ provider, chapters, reported: chapters, status: "ok", ms: 0, error: "" });
    }
  }
  (_a = console.table) == null ? void 0 : _a.call(console, rows);
}
function mergeFlatRows(byNumber, rows, fallbackProvider, namespace) {
  for (const row of rows) {
    const number = Number(row.number);
    if (!Number.isFinite(number) || number <= 0) continue;
    const provider = row.provider || fallbackProvider;
    if (namespace && provider) subProviderToNamespace.set(provider, namespace);
    const existing = byNumber.get(number) ?? {
      number,
      title: row.title ?? `Chapter ${number}`,
      volume: row.volume ?? null,
      sources: []
    };
    if (Array.isArray(row.sources) && row.sources.length > 0) {
      for (const source of row.sources) {
        const sourceProvider = source.provider || fallbackProvider;
        if (namespace && sourceProvider) subProviderToNamespace.set(sourceProvider, namespace);
        existing.sources.push({
          provider: sourceProvider,
          chapterKey: source.chapterKey || String(number),
          providerChapterId: source.providerChapterId || source.chapterKey || String(number),
          language: source.language ?? null,
          scanlator: source.scanlator ?? null,
          releaseDate: source.releaseDate ?? null
        });
      }
      byNumber.set(number, existing);
      continue;
    }
    existing.sources.push({
      provider,
      chapterKey: row.chapterKey || String(number),
      providerChapterId: row.providerChapterId || row.chapterKey || String(number),
      language: row.language ?? null,
      scanlator: row.scanlator ?? null,
      releaseDate: row.releaseDate ?? null
    });
    byNumber.set(number, existing);
  }
}
async function fetchExtensionMangaChapters(params) {
  const env = await resolveMangaHttpEnv();
  if (env) {
    const http = await fetchChaptersViaHttp(env, params);
    dbg("fetchExtensionMangaChapters: HTTP result chapters=", http.chapters.length, "available=", http.providersAvailable, "failed=", http.failedProviders);
    if (http.chapters.length > 0 || http.providersAvailable.length > 0) return http;
  }
  if (!hasExtensionRuntime()) {
    return { chapters: [], providersAvailable: [], failedProviders: [] };
  }
  const ipc = await fetchChaptersViaIpc(params);
  dbg("fetchExtensionMangaChapters: IPC result chapters=", ipc.chapters.length, "available=", ipc.providersAvailable, "failed=", ipc.failedProviders);
  return ipc;
}
async function fetchChaptersViaHttp(env, params) {
  const byNumber = /* @__PURE__ */ new Map();
  const providersAvailable = [];
  const failedProviders = [];
  const targets = env.namespaces.slice(0, 8);
  const isMobile = env.baseUrl === MOBILE_EXT_BASE;
  const mobileHost = isMobile ? window.tatakaiMobileExtensions : null;
  const results = await Promise.all(
    targets.map(async (ns) => {
      let body = null;
      if (isMobile && mobileHost) {
        try {
          body = await mobileHost.mangaChapters(ns.namespace, {
            anilistId: params.anilistId,
            malId: params.malId,
            title: params.title
          });
        } catch {
          body = null;
        }
      } else {
        const u = new URL(`${env.baseUrl}/api/v3/${ns.namespace}/manga/chapters`);
        if (params.anilistId) u.searchParams.set("anilistId", String(params.anilistId));
        if (params.malId) u.searchParams.set("malId", String(params.malId));
        if (params.title) u.searchParams.set("title", params.title);
        dbg("fetchChaptersViaHttp: GET", u.toString());
        ({ body } = await httpGetJson(u.toString()));
      }
      const rows = Array.isArray(body) ? body : Array.isArray(body == null ? void 0 : body.chapters) ? body.chapters : null;
      const diag = Array.isArray(body == null ? void 0 : body.providerStatus) ? body.providerStatus : [];
      dbg("fetchChaptersViaHttp:", ns.namespace, "→ rows=", rows == null ? "null(failed)" : rows.length);
      return { ns, rows, diag };
    })
  );
  const diagnostics = [];
  for (const { ns, rows, diag } of results) {
    for (const d of diag) if (d && d.provider) diagnostics.push(d);
    if (rows == null) {
      failedProviders.push(ns.namespace);
      continue;
    }
    if (rows.length === 0) continue;
    providersAvailable.push(ns.namespace);
    mergeFlatRows(byNumber, rows, ns.namespace, ns.namespace);
  }
  const perProvider = /* @__PURE__ */ new Map();
  for (const ch of byNumber.values()) {
    for (const s of ch.sources) perProvider.set(s.provider, (perProvider.get(s.provider) ?? 0) + 1);
  }
  logMangaSummary(diagnostics, perProvider, byNumber.size);
  return {
    chapters: Array.from(byNumber.values()).sort((a, b) => a.number - b.number),
    providersAvailable,
    failedProviders
  };
}
async function fetchChaptersViaIpc(params) {
  const extensionIds = await listMangaExtensions();
  const byNumber = /* @__PURE__ */ new Map();
  const providersAvailable = [];
  const failedProviders = [];
  for (const extensionId of extensionIds.slice(0, 8)) {
    try {
      const result = await invokeExt(extensionId, "getMangaChapters", params);
      const rows = Array.isArray(result == null ? void 0 : result.chapters) ? result.chapters : [];
      if (rows.length === 0) continue;
      providersAvailable.push(extensionId);
      mergeFlatRows(byNumber, rows, extensionId);
    } catch {
      failedProviders.push(extensionId);
    }
  }
  return {
    chapters: Array.from(byNumber.values()).sort((a, b) => a.number - b.number),
    providersAvailable,
    failedProviders
  };
}
function mangaPageAttemptIdentity(attempt) {
  return `${attempt.provider}::${attempt.chapterKey}::${attempt.providerChapterId || ""}`;
}
async function fetchExtensionMangaPages(params) {
  var _a, _b, _c;
  const attempts = [
    { provider: params.extensionId, chapterKey: params.chapterKey, providerChapterId: params.providerChapterId },
    ...params.alternatives || []
  ];
  const seen = /* @__PURE__ */ new Set();
  const attempted = [];
  let lastFailure = null;
  for (const attempt of attempts) {
    if (!attempt.provider || !attempt.chapterKey) continue;
    const key = mangaPageAttemptIdentity(attempt);
    if (seen.has(key)) continue;
    seen.add(key);
    attempted.push(attempt.provider);
    const res = await fetchOneSourcePages({
      extensionId: attempt.provider,
      chapterKey: attempt.chapterKey,
      providerChapterId: attempt.providerChapterId,
      anilistId: params.anilistId
    });
    if (res.success && (((_b = (_a = res.data) == null ? void 0 : _a.pages) == null ? void 0 : _b.length) ?? 0) > 0) {
      if (attempted.length > 1 && ((_c = res.data) == null ? void 0 : _c.readMeta)) res.data.readMeta.fallbackUsed = true;
      return res;
    }
    lastFailure = res;
  }
  if (lastFailure) {
    return {
      ...lastFailure,
      guidance: lastFailure.guidance ? { ...lastFailure.guidance, attemptedProviders: attempted } : lastFailure.guidance
    };
  }
  return {
    success: false,
    message: "No pages available for this chapter.",
    guidance: {
      code: "NO_PAGES_FOR_CHAPTER",
      message: "None of this chapter's sources returned pages.",
      retryable: true,
      attemptedProviders: attempted
    }
  };
}
async function fetchOneSourcePages(params) {
  const env = await resolveMangaHttpEnv();
  if (env) {
    const { response, reached } = await fetchPagesViaHttp(env, params);
    if (response) return response;
    if (reached) {
      return {
        success: false,
        message: "This source returned no pages for the chapter.",
        guidance: {
          code: "NO_PAGES_FOR_CHAPTER",
          message: "This source has no pages for this chapter; trying another scanlator.",
          retryable: true,
          attemptedProviders: [params.extensionId]
        }
      };
    }
  }
  if (!hasExtensionRuntime()) {
    return {
      success: false,
      message: "Manga chapter reading requires the Tatakai app extension runtime.",
      guidance: {
        code: "EXTENSION_RUNTIME_REQUIRED",
        message: "Open this chapter in the Tatakai desktop or mobile app with a manga extension installed.",
        retryable: false
      }
    };
  }
  return fetchPagesViaIpc(params);
}
function resolvePageNamespaces(env, subProvider, chapterKey) {
  const prefix = chapterKey.includes(":") ? chapterKey.split(":")[0] : "";
  const preferredNs = subProviderToNamespace.get(subProvider) || (prefix ? subProviderToNamespace.get(prefix) : void 0);
  const ordered = [];
  const seen = /* @__PURE__ */ new Set();
  const push = (ns) => {
    if (ns && !seen.has(ns.namespace)) {
      seen.add(ns.namespace);
      ordered.push(ns);
    }
  };
  if (preferredNs) push(env.namespaces.find((n) => n.namespace === preferredNs));
  push(env.namespaces.find((n) => n.namespace === subProvider));
  for (const ns of env.namespaces) push(ns);
  return ordered;
}
async function fetchPagesViaHttp(env, params) {
  const candidates = resolvePageNamespaces(env, params.extensionId, params.chapterKey);
  const isMobile = env.baseUrl === MOBILE_EXT_BASE;
  const mobileHost = isMobile ? window.tatakaiMobileExtensions : null;
  let reached = false;
  for (const ns of candidates) {
    let status = 0;
    let body = null;
    if (isMobile && mobileHost) {
      try {
        body = await mobileHost.mangaPages(ns.namespace, {
          chapterKey: params.chapterKey,
          provider: params.extensionId,
          providerChapterId: params.providerChapterId,
          anilistId: params.anilistId
        });
        status = body ? 200 : 404;
      } catch {
        status = 0;
        body = null;
      }
    } else {
      const u = new URL(`${env.baseUrl}/api/v3/${ns.namespace}/manga/pages`);
      u.searchParams.set("chapterKey", params.chapterKey);
      if (params.extensionId) u.searchParams.set("provider", params.extensionId);
      if (params.providerChapterId) u.searchParams.set("providerChapterId", params.providerChapterId);
      if (params.anilistId) u.searchParams.set("anilistId", String(params.anilistId));
      ({ status, body } = await httpGetJson(u.toString()));
    }
    if (status > 0) reached = true;
    const rawPages = Array.isArray(body) ? body : Array.isArray(body == null ? void 0 : body.pages) ? body.pages : [];
    if (rawPages.length === 0) continue;
    subProviderToNamespace.set(params.extensionId, ns.namespace);
    return { response: buildReadResponse(params, ns.namespace, rawPages, body), reached };
  }
  return { response: null, reached };
}
async function fetchPagesViaIpc(params) {
  try {
    const result = await invokeExt(params.extensionId, "getMangaPages", {
      chapterKey: params.chapterKey,
      provider: params.extensionId,
      providerChapterId: params.providerChapterId,
      anilistId: params.anilistId
    });
    const rawPages = Array.isArray(result == null ? void 0 : result.pages) ? result.pages : [];
    if (rawPages.length === 0) {
      return {
        success: false,
        message: "No pages returned from extension.",
        guidance: {
          code: "NO_PAGES_FOR_CHAPTER",
          message: "Extension returned no pages for this chapter.",
          retryable: true,
          attemptedProviders: [params.extensionId]
        }
      };
    }
    return buildReadResponse(params, params.extensionId, rawPages, result);
  } catch (err) {
    return {
      success: false,
      message: err instanceof Error ? err.message : "Extension read failed",
      guidance: {
        code: "EXTENSION_RUNTIME_REQUIRED",
        message: "Failed to load chapter pages from extension.",
        retryable: true,
        attemptedProviders: [params.extensionId]
      }
    };
  }
}
function buildReadResponse(params, provider, rawPages, meta) {
  const pages = rawPages.map((page, idx) => {
    const headerEntries = page.headers && typeof page.headers === "object" ? Object.entries(page.headers).filter(([, v]) => v != null).map(([k, v]) => [k, String(v)]) : [];
    return {
      pageNumber: page.pageNumber ?? idx + 1,
      imageUrl: String(page.imageUrl || ""),
      proxiedImageUrl: page.proxiedImageUrl ?? null,
      width: page.width ?? null,
      height: page.height ?? null,
      // Kept for the mobile in-app proxy's dead-token re-registration (the
      // desktop loopback token needs no such fallback). Dropped when empty
      // so desktop payloads stay byte-identical.
      ...headerEntries.length ? { headers: Object.fromEntries(headerEntries) } : {}
    };
  }).filter((page) => page.imageUrl);
  const derivedNumber = (meta == null ? void 0 : meta.number) ?? (() => {
    const raw = (params.providerChapterId || "").trim();
    return /^\d+(\.\d+)?$/.test(raw) ? Number(raw) : null;
  })();
  return {
    success: true,
    data: {
      pages,
      chapter: {
        chapterKey: params.chapterKey,
        anilistId: params.anilistId ?? 0,
        // `chapter.provider` is the user-facing sub-provider (mangadex,
        // comick, ...), while `readMeta.provider` is the extension namespace
        // that actually served it. Returning the namespace in both fields made
        // Next lose the active source and fall back to raw discovery order.
        provider: params.extensionId,
        providerChapterId: params.providerChapterId || params.chapterKey,
        number: derivedNumber,
        title: (meta == null ? void 0 : meta.title) ?? null,
        language: (meta == null ? void 0 : meta.language) ?? null
      },
      readMeta: {
        provider,
        fetchedAt: (/* @__PURE__ */ new Date()).toISOString(),
        expiresAt: null,
        retryAfter: null,
        fallbackUsed: false
      }
    }
  };
}
function extSource(s) {
  return {
    provider: s.provider,
    chapterKey: s.chapterKey,
    providerChapterId: s.providerChapterId,
    language: s.language ?? null,
    scanlator: s.scanlator ?? null,
    releaseDate: s.releaseDate ?? null
  };
}
function mergeChaptersWithExtensions(base, extensionPayload) {
  if (!extensionPayload.chapters.length) {
    return {
      ...base,
      providersAvailable: [...base.providersAvailable || [], "tatakai_media"],
      failedProviders: extensionPayload.failedProviders
    };
  }
  const byNumber = /* @__PURE__ */ new Map();
  for (const chapter of extensionPayload.chapters) {
    if (chapter.number != null) byNumber.set(chapter.number, chapter);
  }
  const baseNumbers = /* @__PURE__ */ new Set();
  const enriched = (base.mappedChapters || []).map((mapped) => {
    const num = mapped.chapterNumber;
    if (num != null) baseNumbers.add(num);
    const ext = num != null ? byNumber.get(num) : void 0;
    if (!ext) return mapped;
    const withoutPlaceholder = mapped.sources.filter((s) => s.provider !== "tatakai_media");
    const tatakai = mapped.sources.find((s) => s.provider === "tatakai_media");
    return {
      ...mapped,
      chapterTitle: ext.title || mapped.chapterTitle,
      volume: ext.volume ?? mapped.volume,
      sources: [
        ...ext.sources.map(extSource),
        ...withoutPlaceholder.filter((s) => !ext.sources.some((e) => e.provider === s.provider)),
        ...tatakai ? [tatakai] : []
      ]
    };
  });
  const extraFromExt = [];
  for (const ext of extensionPayload.chapters) {
    if (ext.number == null || baseNumbers.has(ext.number)) continue;
    extraFromExt.push({
      chapterNumber: ext.number,
      chapterTitle: ext.title ?? `Chapter ${ext.number}`,
      volume: ext.volume ?? null,
      canonicalOrder: 0,
      sources: ext.sources.map(extSource)
    });
  }
  const mappedChapters = [...enriched, ...extraFromExt].sort((a, b) => (a.chapterNumber ?? 0) - (b.chapterNumber ?? 0)).map((ch, idx) => ({ ...ch, canonicalOrder: idx }));
  return {
    ...base,
    mappedChapters,
    partial: extensionPayload.failedProviders.length > 0,
    failedProviders: extensionPayload.failedProviders,
    providersAvailable: [...extensionPayload.providersAvailable, "tatakai_media"]
  };
}
export {
  fetchExtensionMangaChapters,
  fetchExtensionMangaPages,
  mangaPageAttemptIdentity,
  mergeChaptersWithExtensions
};
