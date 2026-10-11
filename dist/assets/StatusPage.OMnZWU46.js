import { r as reactExports, j as jsxRuntimeExports, e as useNavigate } from "./react-vendor.CAo4XUiA.js";
import { K as useIsDesktopApp, dO as TATAKAI_API_URL, S as Sidebar, B as Button, G as GlassPanel, a2 as supabase, fP as resolveBackendOrigin } from "./index.C6yfkT5T.js";
import { M as MobileNav } from "./MobileNav.ABHzkhTQ.js";
import { u as useStatusIncidents } from "./useAdminFeatures.CR_zjJvW.js";
import { m as motion, A as AnimatePresence } from "./motion.DVGLRFCH.js";
import { a5 as Globe, aT as Zap, bi as Database, c8 as Server, a7 as Image$1, b0 as Gauge, bj as Activity, T as TriangleAlert, u as ArrowLeft, R as RefreshCw, Q as LoaderCircle, aY as CircleCheckBig, aD as Clock, bd as CircleX } from "./icons.C2gBBarQ.js";
import { bp as formatDistanceToNow } from "./vendor.CJyRs4QS.js";
import "./tanstack.DPr3OB19.js";
import "./supabase.WuRMX5Dg.js";
import "./radix.BiK9uYXL.js";
import "./hls.BlgtCWcq.js";
import "./editor.Dxw8dtyw.js";
import "./charts.Dr1fgDJ-.js";
const VIDEO_SOURCES = [
  "./assets/video/1.mp4",
  "./assets/video/2.webm",
  "./assets/video/3.mp4",
  "./assets/video/5.mp4",
  "./assets/video/6.mp4"
];
const StatusPageBackground = ({
  overlayColor = "from-background/95 via-background/80 to-background/95",
  overlayOpacity = 1
}) => {
  const videoRef = reactExports.useRef(null);
  const [currentVideoIndex, setCurrentVideoIndex] = reactExports.useState(0);
  const [isLoaded, setIsLoaded] = reactExports.useState(false);
  reactExports.useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const handleEnded = () => {
      setCurrentVideoIndex((prev) => (prev + 1) % VIDEO_SOURCES.length);
    };
    const handleCanPlay = () => {
      setIsLoaded(true);
    };
    video.addEventListener("ended", handleEnded);
    video.addEventListener("canplay", handleCanPlay);
    return () => {
      video.removeEventListener("ended", handleEnded);
      video.removeEventListener("canplay", handleCanPlay);
    };
  }, [currentVideoIndex]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fixed inset-0 overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.video,
      {
        ref: videoRef,
        src: VIDEO_SOURCES[currentVideoIndex],
        autoPlay: true,
        muted: true,
        playsInline: true,
        className: "absolute inset-0 w-full h-full object-cover",
        initial: { opacity: 0, scale: 1.1 },
        animate: { opacity: isLoaded ? 1 : 0, scale: 1 },
        transition: { duration: 1.5, ease: "easeOut" }
      },
      currentVideoIndex
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        className: `absolute inset-0 bg-gradient-to-br ${overlayColor}`,
        style: { opacity: overlayOpacity },
        animate: {
          backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"]
        },
        transition: { duration: 20, repeat: Infinity, ease: "linear" }
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "absolute inset-0 opacity-[0.03] pointer-events-none",
        style: {
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        className: "absolute top-1/4 -left-20 w-96 h-96 bg-primary/20 rounded-full blur-3xl",
        animate: {
          x: [0, 50, 0],
          y: [0, 30, 0],
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3]
        },
        transition: { duration: 8, repeat: Infinity, ease: "easeInOut" }
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        className: "absolute bottom-1/4 -right-20 w-96 h-96 bg-accent/20 rounded-full blur-3xl",
        animate: {
          x: [0, -50, 0],
          y: [0, -30, 0],
          scale: [1.2, 1, 1.2],
          opacity: [0.5, 0.3, 0.5]
        },
        transition: { duration: 10, repeat: Infinity, ease: "easeInOut" }
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "absolute inset-0 pointer-events-none opacity-[0.02]",
        style: {
          backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.1) 2px, rgba(0,0,0,0.1) 4px)"
        }
      }
    )
  ] });
};
const SERVICE_CHECK_FREQ_SECONDS = 30;
const PROXY_POLL_FREQ_SECONDS = 4;
const HISTORY_CAP = 32;
const DEFAULT_BACKEND_HEALTH_URL = "https://api.tatakai.me/health";
const BACKEND_ORIGIN = resolveBackendOrigin();
const PROXY_STATUS_ENDPOINT = BACKEND_ORIGIN ? `${BACKEND_ORIGIN}/api/proxy/status` : "/api/proxy/status";
const BACKEND_HEALTH_ENDPOINT = BACKEND_ORIGIN ? `${BACKEND_ORIGIN}/health` : DEFAULT_BACKEND_HEALTH_URL;
const ENV_CF_PROXY_URL = String("").trim();
const ENV_NODE_PROXY_URL = String(
  "https://hoko.tatakai.me/api/v1/streamingProxy"
).trim();
const CF_PROXY_HOST = (() => {
  try {
    return ENV_CF_PROXY_URL ? new URL(ENV_CF_PROXY_URL).hostname.toLowerCase() : "";
  } catch {
    return "";
  }
})();
function classifyProxyType(url) {
  const lower = (url || "").toLowerCase();
  if (CF_PROXY_HOST && lower.includes(CF_PROXY_HOST)) return "cf";
  if (lower.includes("workers.dev") || lower.includes("cloudflare") || lower.includes("kira.tatakai.me") || lower.includes("moko.tatakai.me")) return "cf";
  if (lower.includes("hoko.tatakai.me")) return "nodejs";
  if (lower.includes("bun")) return "bun";
  return "nodejs";
}
function isLoopbackProxyUrl(url) {
  try {
    const h = new URL(url).hostname.toLowerCase().replace(/^\[|\]$/g, "");
    return h === "localhost" || h.endsWith(".localhost") || h === "127.0.0.1" || h === "::1" || /^10\./.test(h) || /^192\.168\./.test(h) || /^172\.(1[6-9]|2\d|3[01])\./.test(h);
  } catch {
    return false;
  }
}
function deriveProxyStatus(node) {
  if (node.status === "online" || node.status === "degraded" || node.status === "offline") return node.status;
  if (node.cooldownUntil && node.cooldownUntil > Date.now()) return "offline";
  if (node.failures > 0 && node.successes === 0) return "offline";
  if (node.failures > node.successes) return "degraded";
  return "online";
}
const KNOWN_PROXY_NODES = [
  ...ENV_CF_PROXY_URL ? [{ id: "proxy-cf-edge", url: ENV_CF_PROXY_URL, type: "cf" }] : [],
  { id: "proxy-node-hoko", url: ENV_NODE_PROXY_URL, type: "nodejs" }
];
function buildProxyProbeUrls(proxyUrl, proxyPassword) {
  const normalized = String(proxyUrl || "").trim().replace(/\/$/, "");
  if (!normalized) return [];
  const streamEndpoint = /\/api\/v1\/streamingproxy$/i.test(normalized) ? normalized : `${normalized}/api/v1/streamingProxy`;
  const rootEndpoint = normalized.replace(/\/api\/v1\/streamingproxy$/i, "");
  const params = new URLSearchParams({ url: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8", type: "video" });
  if (proxyPassword) params.set("password", proxyPassword);
  return Array.from(/* @__PURE__ */ new Set([`${rootEndpoint}/health`, `${streamEndpoint}?${params.toString()}`]));
}
async function probeKnownProxyNode(node, proxyPassword) {
  for (const probeUrl of buildProxyProbeUrls(node.url, proxyPassword)) {
    const start = performance.now();
    try {
      const response = await fetch(probeUrl, { signal: AbortSignal.timeout(5e3) });
      const latencyMs = Math.round(performance.now() - start);
      const onlineLike = response.ok || [401, 403, 405].includes(response.status);
      if (onlineLike) return { id: node.id, url: node.url, type: node.type, status: "online", latencyMs, score: 1 };
      if (response.status >= 400 && response.status < 500)
        return { id: node.id, url: node.url, type: node.type, status: "degraded", latencyMs, score: 0 };
    } catch {
    }
  }
  return { id: node.id, url: node.url, type: node.type, status: "offline", latencyMs: 0, score: 0 };
}
const IMAGE_DELIVERY_PROBES = [
  // Tiny, always-present site assets first (fast + hash-free, so they don't rot
  // like a specific cover path can); the anime cover stays as a real-world check.
  "https://cdn.myanimelist.net/images/favicon.ico",
  "https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png",
  "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx1-CXtrrkMpJ8Zq.png"
];
function probeImageLoad(src, timeoutMs = 8e3) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const start = performance.now();
    const timer = setTimeout(() => {
      img.onload = null;
      img.onerror = null;
      reject(new Error("timeout"));
    }, timeoutMs);
    img.onload = () => {
      clearTimeout(timer);
      resolve(Math.round(performance.now() - start));
    };
    img.onerror = () => {
      clearTimeout(timer);
      reject(new Error("load-failed"));
    };
    img.src = `${src}${src.includes("?") ? "&" : "?"}_cb=${Date.now()}`;
  });
}
const SEVERITY_COLORS = {
  minor: "bg-yellow-500/20 text-yellow-500 border-yellow-500/50",
  major: "bg-orange-500/20 text-orange-500 border-orange-500/50",
  critical: "bg-red-500/20 text-red-500 border-red-500/50"
};
function dotClass(status) {
  if (status === "operational" || status === "online") return "bg-emerald-400";
  if (status === "degraded") return "bg-amber-400";
  if (status === "checking") return "bg-primary animate-pulse";
  return "bg-red-500";
}
function StatusGlyph({ status, className = "w-5 h-5" }) {
  if (status === "operational") return /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: `${className} text-emerald-400` });
  if (status === "degraded") return /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: `${className} text-amber-400` });
  if (status === "down") return /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: `${className} text-red-500` });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: `${className} text-primary animate-spin` });
}
function UptimeBars({ history }) {
  const recent = history.slice(-HISTORY_CAP);
  const padded = [
    ...Array.from({ length: Math.max(0, HISTORY_CAP - recent.length) }, () => null),
    ...recent
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-end gap-[3px] h-8", "aria-hidden": true, children: padded.map((h, i) => {
    const color = h === "operational" ? "bg-emerald-400/80" : h === "degraded" ? "bg-amber-400/80" : h === "down" ? "bg-red-500/80" : "bg-white/10";
    const height = h === "operational" ? "h-full" : h === "degraded" ? "h-2/3" : h === "down" ? "h-1/2" : "h-1/5";
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `flex-1 rounded-full min-w-[2px] ${color} ${height}` }, i);
  }) });
}
function HealthRing({ value, color }) {
  const r = 42;
  const circumference = 2 * Math.PI * r;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-28 h-28 shrink-0", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { viewBox: "0 0 100 100", className: "w-full h-full -rotate-90", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "50", cy: "50", r, fill: "none", stroke: "rgba(255,255,255,0.08)", strokeWidth: "8" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.circle,
        {
          cx: "50",
          cy: "50",
          r,
          fill: "none",
          stroke: color,
          strokeWidth: "8",
          strokeLinecap: "round",
          strokeDasharray: circumference,
          initial: { strokeDashoffset: circumference },
          animate: { strokeDashoffset: circumference - circumference * value / 100 },
          transition: { duration: 1.2, ease: "easeOut" }
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 flex flex-col items-center justify-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-2xl font-black font-mono", children: [
        value.toFixed(0),
        "%"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] uppercase tracking-[0.2em] text-muted-foreground", children: "health" })
    ] })
  ] });
}
function StatusPage() {
  const navigate = useNavigate();
  const isDesktopApp = useIsDesktopApp();
  const { data: incidents = [], isLoading: loadingIncidents } = useStatusIncidents(false);
  const [proxies, setProxies] = reactExports.useState([]);
  const [scrapers, setScrapers] = reactExports.useState([]);
  const [scraperSummary, setScraperSummary] = reactExports.useState({ total: 0, operational: 0, degraded: 0, down: 0 });
  const [services, setServices] = reactExports.useState([
    { name: "Tatakai Website", status: "checking", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { className: "w-5 h-5" }), description: "Main web frontend", url: "https://tatakai.me" },
    { name: "Tatakai Backend", status: "checking", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-5 h-5" }), description: "Unified Hono API", url: "https://api.tatakai.me/health" },
    { name: "Supabase", status: "checking", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Database, { className: "w-5 h-5" }), description: "Database & auth infrastructure" },
    { name: "Jikan API", status: "checking", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Server, { className: "w-5 h-5" }), description: "MyAnimeList metadata provider", url: "https://api.jikan.moe/v4" },
    { name: "AniList API", status: "checking", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Server, { className: "w-5 h-5" }), description: "AniList metadata provider", url: "https://graphql.anilist.co" },
    { name: "Image Delivery", status: "checking", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Image$1, { className: "w-5 h-5" }), description: "Posters, banners & thumbnails", url: "https://cdn.myanimelist.net" }
  ]);
  const [uptimeHistory, setUptimeHistory] = reactExports.useState({});
  const [lastChecked, setLastChecked] = reactExports.useState(/* @__PURE__ */ new Date());
  const [isRefreshing, setIsRefreshing] = reactExports.useState(false);
  const [nextCheckIn, setNextCheckIn] = reactExports.useState(SERVICE_CHECK_FREQ_SECONDS);
  const sharedProxyPassword = String(
    ""
  ).trim();
  const loadScraperHealth = reactExports.useCallback(async () => {
    const response = await fetch(`${TATAKAI_API_URL}/health/scrapers`, {
      headers: { Accept: "application/json" },
      signal: AbortSignal.timeout(9e3)
    });
    if (!response.ok) throw new Error(`Scraper health failed: ${response.status}`);
    const json = await response.json();
    const nodes = Array.isArray(json == null ? void 0 : json.scrapers) ? json.scrapers.map((node, index) => ({
      id: String((node == null ? void 0 : node.id) || `source-${index + 1}`),
      label: String((node == null ? void 0 : node.label) || `Source ${String(index + 1).padStart(2, "0")}`),
      status: ["operational", "degraded", "down"].includes(node == null ? void 0 : node.status) ? node.status : "down",
      latencyMs: Number((node == null ? void 0 : node.latencyMs) || 0)
    })) : [];
    const summary = (json == null ? void 0 : json.summary) && typeof json.summary === "object" ? {
      total: Number(json.summary.total || nodes.length || 0),
      operational: Number(json.summary.operational || 0),
      degraded: Number(json.summary.degraded || 0),
      down: Number(json.summary.down || 0)
    } : {
      total: nodes.length,
      operational: nodes.filter((n) => n.status === "operational").length,
      degraded: nodes.filter((n) => n.status === "degraded").length,
      down: nodes.filter((n) => n.status === "down").length
    };
    setScrapers(nodes);
    setScraperSummary(summary);
    return nodes;
  }, []);
  const loadProxyStatus = reactExports.useCallback(async () => {
    let mapped = [];
    try {
      const response = await fetch(PROXY_STATUS_ENDPOINT, {
        headers: { Accept: "application/json" },
        signal: AbortSignal.timeout(7e3)
      });
      if (response.ok) {
        const json = await response.json();
        const nodes = Array.isArray(json == null ? void 0 : json.nodes) ? json.nodes : [];
        mapped = nodes.filter((node) => !isLoopbackProxyUrl(node.url)).map((node) => ({
          id: node.id,
          url: node.url,
          type: classifyProxyType(node.url),
          status: deriveProxyStatus(node),
          latencyMs: node.lastLatencyMs || 0,
          score: Math.max(0, node.successes - node.failures)
        }));
      }
    } catch {
    }
    if (mapped.length > 0) {
      setProxies(mapped);
      return mapped;
    }
    const probed = await Promise.all(
      KNOWN_PROXY_NODES.map((n) => probeKnownProxyNode(n, sharedProxyPassword))
    );
    setProxies(probed);
    return probed;
  }, [sharedProxyPassword]);
  const runChecks = reactExports.useCallback(async () => {
    setIsRefreshing(true);
    setNextCheckIn(SERVICE_CHECK_FREQ_SECONDS);
    setServices((prev) => prev.map((s) => ({ ...s, status: "checking", latency: void 0 })));
    const check = async (name, fn) => {
      try {
        return { name, ...await fn() };
      } catch {
        return { name, status: "down", latency: 0 };
      }
    };
    const results = await Promise.all([
      check("Tatakai Website", async () => {
        const start = Date.now();
        const res = await fetch(window.location.origin, { method: "HEAD" });
        const latency = Date.now() - start;
        return { status: res.ok ? latency > 1e3 ? "degraded" : "operational" : "down", latency };
      }),
      check("Tatakai Backend", async () => {
        const start = Date.now();
        const res = await fetch(BACKEND_HEALTH_ENDPOINT, {
          headers: { Accept: "text/plain,application/json,*/*" },
          signal: AbortSignal.timeout(5e3)
        });
        const latency = Date.now() - start;
        return { status: res.ok ? latency > 1e3 ? "degraded" : "operational" : "down", latency };
      }),
      check("Supabase", async () => {
        const start = Date.now();
        const { error } = await supabase.from("profiles").select("count").limit(1);
        const latency = Date.now() - start;
        return { status: error ? "down" : latency > 500 ? "degraded" : "operational", latency };
      }),
      check("Jikan API", async () => {
        const start = Date.now();
        const res = await fetch("https://api.jikan.moe/v4/anime/1", { signal: AbortSignal.timeout(1e4) });
        const latency = Date.now() - start;
        return { status: res.ok ? latency > 1500 ? "degraded" : "operational" : res.status === 429 ? "degraded" : "down", latency };
      }),
      check("AniList API", async () => {
        const start = Date.now();
        const res = await fetch("https://graphql.anilist.co", {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({ query: "{Media(id:1){id}}" }),
          signal: AbortSignal.timeout(8e3)
        });
        const latency = Date.now() - start;
        return { status: res.ok ? latency > 1500 ? "degraded" : "operational" : res.status === 429 ? "degraded" : "down", latency };
      }),
      check("Image Delivery", async () => {
        for (const src of IMAGE_DELIVERY_PROBES) {
          try {
            const latency = await probeImageLoad(src);
            return { status: latency > 1500 ? "degraded" : "operational", latency };
          } catch {
          }
        }
        return { status: "down", latency: 0 };
      }),
      check("Streaming Edge", async () => {
        const start = Date.now();
        const stats = await loadProxyStatus();
        const online = stats.filter((p) => p.status === "online").length;
        const latency = Date.now() - start;
        return {
          status: stats.length > 0 ? online > 0 ? online < stats.length / 2 ? "degraded" : "operational" : "down" : "down",
          latency
        };
      })
    ]);
    setServices((prev) => prev.map((s) => {
      const r = results.find((x) => x.name === s.name);
      return r ? { ...s, status: r.status, latency: r.latency } : s;
    }));
    setUptimeHistory((prev) => {
      const next = { ...prev };
      for (const r of results) next[r.name] = [...next[r.name] || [], r.status].slice(-HISTORY_CAP);
      return next;
    });
    await loadScraperHealth().catch(() => {
    });
    setLastChecked(/* @__PURE__ */ new Date());
    setIsRefreshing(false);
  }, [loadProxyStatus, loadScraperHealth]);
  reactExports.useEffect(() => {
    runChecks();
    loadProxyStatus().catch(() => {
    });
    const proxyInterval = setInterval(() => {
      loadProxyStatus().catch(() => {
      });
    }, PROXY_POLL_FREQ_SECONDS * 1e3);
    const serviceInterval = setInterval(() => {
      runChecks();
    }, SERVICE_CHECK_FREQ_SECONDS * 1e3);
    const countdownInterval = setInterval(
      () => setNextCheckIn((v) => v <= 1 ? SERVICE_CHECK_FREQ_SECONDS : v - 1),
      1e3
    );
    return () => {
      clearInterval(proxyInterval);
      clearInterval(serviceInterval);
      clearInterval(countdownInterval);
    };
  }, [runChecks, loadProxyStatus]);
  const healthIndex = reactExports.useMemo(() => {
    const svc = services.filter((s) => s.status !== "checking").map((s) => s.status === "operational" ? 1 : s.status === "degraded" ? 0.6 : 0);
    const prx = proxies.map((p) => p.status === "online" ? 1 : p.status === "degraded" ? 0.6 : 0);
    const scr = scrapers.map((s) => s.status === "operational" ? 1 : s.status === "degraded" ? 0.6 : 0);
    const all = [...svc, ...prx, ...scr];
    if (!all.length) return 0;
    return Number((all.reduce((a, b) => a + b, 0) / all.length * 100).toFixed(1));
  }, [services, proxies, scrapers]);
  const uptimeSamples = reactExports.useMemo(() => Object.values(uptimeHistory).flat(), [uptimeHistory]);
  const uptimePct = reactExports.useMemo(() => {
    if (!uptimeSamples.length) return null;
    const up = uptimeSamples.filter((s) => s === "operational").length;
    return Number((up / uptimeSamples.length * 100).toFixed(2));
  }, [uptimeSamples]);
  const mttrMinutes = reactExports.useMemo(() => {
    const resolved = incidents.filter((i) => !i.is_active && i.created_at && i.resolved_at);
    const durations = resolved.map((i) => {
      const start = new Date(i.created_at).getTime();
      const end = new Date(i.resolved_at).getTime();
      return end > start ? (end - start) / 6e4 : null;
    }).filter((v) => v !== null);
    if (!durations.length) return null;
    return Math.round(durations.reduce((a, b) => a + b, 0) / durations.length);
  }, [incidents]);
  const activeIncidents = incidents.filter((i) => i.is_active).length;
  const anyDown = services.some((s) => s.status === "down") || proxies.some((p) => p.status === "offline") || scrapers.some((s) => s.status === "down");
  const anyDegraded = services.some((s) => s.status === "degraded") || proxies.some((p) => p.status === "degraded") || scrapers.some((s) => s.status === "degraded");
  const anyChecking = services.some((s) => s.status === "checking") || isRefreshing || scrapers.length === 0;
  const overall = anyDown ? "down" : anyDegraded ? "degraded" : anyChecking ? "checking" : "operational";
  const overallLabel = {
    down: "Major Outage",
    degraded: "Partial Degradation",
    checking: "Analyzing Infrastructure",
    operational: "All Systems Operational"
  }[overall];
  const overallGradient = overall === "down" ? "from-red-500/20 via-red-900/30 to-red-500/10" : overall === "degraded" ? "from-amber-500/20 via-amber-900/30 to-amber-500/10" : overall === "checking" ? "from-primary/15 via-primary/10 to-primary/5" : "from-emerald-500/20 via-emerald-900/30 to-emerald-500/10";
  const ringColor = overall === "down" ? "rgb(239 68 68)" : overall === "degraded" ? "rgb(251 191 36)" : overall === "checking" ? "rgb(236 72 153)" : "rgb(52 211 153)";
  const kpis = [
    { label: "Health Index", value: `${healthIndex.toFixed(1)}%`, detail: `${services.filter((s) => s.status === "operational").length}/${services.length} services up`, icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Gauge, { className: "w-4 h-4" }) },
    { label: "Observed Uptime", value: uptimePct !== null ? `${uptimePct}%` : "--", detail: `${uptimeSamples.length} samples`, icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "w-4 h-4" }) },
    { label: "Proxy Pool", value: `${proxies.filter((p) => p.status === "online").length}/${proxies.length}`, detail: `${proxies.filter((p) => p.status === "degraded").length} degraded`, icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Server, { className: "w-4 h-4" }) },
    { label: "Incidents", value: `${activeIncidents}`, detail: mttrMinutes !== null ? `MTTR ${mttrMinutes}m` : "no history", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-4 h-4" }) }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background text-foreground overflow-x-hidden relative", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(StatusPageBackground, { overlayColor: "from-background/95 via-background/80 to-background/95" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Sidebar, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fixed inset-0 pointer-events-none overflow-hidden z-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          className: "absolute top-[15%] right-[5%] text-9xl font-bold text-primary/5 select-none",
          animate: { y: [0, -30, 0], opacity: [0.03, 0.08, 0.03] },
          transition: { duration: 12, repeat: Infinity, ease: "easeInOut" },
          children: "状態"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          className: "absolute bottom-[20%] left-[8%] text-8xl font-bold text-accent/5 select-none",
          animate: { y: [0, 20, 0], opacity: [0.03, 0.06, 0.03] },
          transition: { duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 },
          children: "稼働"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-primary/10 to-transparent" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-accent/10 to-transparent" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: `relative z-10 ${isDesktopApp ? "pl-6" : "pl-6 md:pl-32"} pr-6 py-6 max-w-[1400px] mx-auto pb-24 md:pb-6`, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center justify-between gap-4 mb-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: () => navigate(-1),
            className: "group flex items-center gap-2 p-2 rounded-full hover:bg-white/5 transition-all",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-5 h-5 text-muted-foreground group-hover:text-foreground group-hover:-translate-x-1 transition-all" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-muted-foreground group-hover:text-foreground", children: "Return" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden sm:flex items-center gap-2 text-[11px] text-muted-foreground font-mono bg-white/5 px-3 py-1.5 rounded-full border border-white/10", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: `w-3 h-3 ${isRefreshing ? "animate-spin text-primary" : ""}` }),
            isRefreshing ? "Checking…" : `Next check in ${nextCheckIn}s`
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              onClick: runChecks,
              disabled: isRefreshing,
              variant: "outline",
              className: "gap-2 bg-white/5 border-white/10 hover:bg-white/10 h-10 px-4 rounded-xl transition-all",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: `w-4 h-4 ${isRefreshing ? "animate-spin" : ""}` }),
                isRefreshing ? "Running" : "Refresh"
              ]
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5 }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassPanel, { className: `relative overflow-hidden border border-white/10 bg-gradient-to-br ${overallGradient} p-6 md:p-8 mb-6`, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            className: "absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12",
            animate: { x: ["-120%", "120%"] },
            transition: { duration: 4, repeat: Infinity, ease: "linear" }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 flex flex-col md:flex-row items-center gap-6 md:gap-10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(HealthRing, { value: healthIndex, color: ringColor }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 text-center md:text-left", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center md:justify-start gap-3 mb-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(StatusGlyph, { status: overall, className: "w-7 h-7" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl md:text-4xl font-bold tracking-tight", children: overallLabel })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground flex items-center justify-center md:justify-start gap-2 text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "w-4 h-4 text-primary" }),
              "Tatakai network infrastructure • updated ",
              formatDistanceToNow(lastChecked, { addSuffix: true })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 flex flex-wrap items-center justify-center md:justify-start gap-2", children: ["operational", "degraded", "down"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full bg-black/20 border border-white/10 capitalize", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `w-2 h-2 rounded-full ${dotClass(k)}` }),
              services.filter((s) => s.status === k).length,
              " ",
              k
            ] }, k)) })
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-3 mb-10", children: kpis.map((k) => /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassPanel, { className: "p-4 border border-white/10 bg-white/5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] uppercase tracking-[0.2em] text-muted-foreground", children: k.label }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary/60", children: k.icon })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-black font-mono tracking-tight", children: k.value }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-[11px] text-muted-foreground truncate", children: k.detail })
      ] }, k.label)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-12", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-2xl font-bold flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "p-2 rounded-lg bg-primary/10 text-primary", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Server, { className: "w-6 h-6" }) }),
            "Core Services"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground font-mono bg-white/5 px-3 py-1.5 rounded-full border border-white/10", children: [
            services.filter((s) => s.status === "operational").length,
            "/",
            services.length,
            " operational"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5", children: services.map((service, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { opacity: 0, y: 16 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.3, delay: index * 0.06 },
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassPanel, { className: "group p-5 border border-white/10 bg-white/5 hover:border-white/20 hover:-translate-y-1 transition-all duration-300 h-full", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between mb-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "p-2.5 rounded-xl bg-white/5 border border-white/10 text-primary", children: service.icon }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold", children: service.name }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground leading-snug", children: service.description })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(StatusGlyph, { status: service.status })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(UptimeBars, { history: uptimeHistory[service.name] || [] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-xs", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `w-2 h-2 rounded-full ${dotClass(service.status)}` }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "capitalize font-medium", children: service.status })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `font-mono ${service.latency && service.latency > 500 ? "text-amber-400" : "text-emerald-400"}`, children: service.latency !== void 0 && service.latency > 0 ? `${service.latency}ms` : "--" })
              ] })
            ] })
          },
          service.name
        )) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-12", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-2xl font-bold flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "p-2 rounded-lg bg-primary/10 text-primary", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { className: "w-6 h-6" }) }),
            "Edge Routing"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground font-mono bg-white/5 px-3 py-1.5 rounded-full border border-white/10", children: [
            proxies.length,
            " node",
            proxies.length === 1 ? "" : "s"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(GlassPanel, { className: "p-0 overflow-hidden border border-white/10 rounded-3xl", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm text-left border-collapse", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "bg-white/5 border-b border-white/10 text-[10px] uppercase tracking-wider text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-6 py-4 font-bold", children: "Node" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-6 py-4 font-bold", children: "Type" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-6 py-4 font-bold", children: "Status" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-6 py-4 font-bold", children: "Latency" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-6 py-4 font-bold", children: "Weight" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("tbody", { className: "divide-y divide-white/5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: proxies.map((proxy) => /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.tr, { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, className: "hover:bg-white/5 transition-colors", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-6 py-4 font-mono text-xs text-primary/80", children: proxy.id }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-6 py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex px-2.5 py-1 rounded-lg text-[10px] font-bold bg-white/5 border border-white/10 uppercase", children: proxy.type }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-6 py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `w-2 h-2 rounded-full ${dotClass(proxy.status)}` }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `font-bold text-xs uppercase tracking-wide ${proxy.status === "online" ? "text-emerald-400" : proxy.status === "degraded" ? "text-amber-400" : "text-red-500"}`, children: proxy.status })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-6 py-4 font-mono text-xs text-muted-foreground", children: proxy.latencyMs > 0 ? `${proxy.latencyMs}ms` : "—" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-6 py-4 font-mono text-xs text-muted-foreground", children: proxy.score })
            ] }, proxy.id)) }),
            proxies.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 5, className: "px-6 py-12 text-center text-sm text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin" }),
              "Initializing node pool…"
            ] }) }) })
          ] })
        ] }) }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-12" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-2xl font-bold flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "p-2 rounded-lg bg-primary/10 text-primary", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-6 h-6" }) }),
              "Incidents & Maintenance"
            ] }),
            activeIncidents > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-mono px-3 py-1.5 rounded-full border bg-red-500/10 border-red-500/30 text-red-400", children: [
              activeIncidents,
              " active"
            ] })
          ] }),
          loadingIncidents ? /* @__PURE__ */ jsxRuntimeExports.jsx(GlassPanel, { className: "p-12 border border-white/10 rounded-3xl flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-2 text-sm text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin" }),
            " Loading incident feed…"
          ] }) }) : incidents.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassPanel, { className: "p-12 border border-white/10 rounded-3xl flex flex-col items-center justify-center text-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-10 h-10 text-emerald-400" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold", children: "No incidents reported" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "All infrastructure has been running smoothly." })
            ] })
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: incidents.map((incident) => /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassPanel, { className: `p-6 border rounded-3xl ${incident.is_active ? "border-red-500/30 bg-red-500/[0.03]" : "border-white/10"}`, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2 mb-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg border ${SEVERITY_COLORS[incident.severity] || SEVERITY_COLORS.minor}`, children: incident.severity || "minor" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-medium uppercase tracking-wider px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-muted-foreground capitalize", children: String(incident.status || "investigating").replace(/_/g, " ") }),
              incident.is_active && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg bg-red-500/15 border border-red-500/40 text-red-400", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" }),
                " Live"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg font-bold mb-1", children: incident.title }),
            incident.description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed mb-4", children: incident.description }),
            Array.isArray(incident.affected_services) && incident.affected_services.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2 mb-4", children: incident.affected_services.map((svc) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-muted-foreground", children: svc }, svc)) }),
            Array.isArray(incident.updates) && incident.updates.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 pl-4 border-l-2 border-white/10 space-y-4", children: incident.updates.map((update) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute -left-[21px] top-1.5 w-2.5 h-2.5 rounded-full bg-primary border-2 border-background" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold capitalize text-primary", children: String(update.status || "").replace(/_/g, " ") }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed", children: update.message }),
              update.created_at && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground/60 font-mono mt-0.5", children: formatDistanceToNow(new Date(update.created_at), { addSuffix: true }) })
            ] }, update.id)) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 pt-4 border-t border-white/5 flex items-center gap-2 text-[11px] text-muted-foreground/60 font-mono", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3 h-3" }),
              incident.is_active ? "Opened" : "Resolved",
              " ",
              formatDistanceToNow(new Date(incident.resolved_at || incident.created_at), { addSuffix: true })
            ] })
          ] }) }, incident.id)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-2xl font-bold flex items-center gap-3 mb-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "p-2 rounded-lg bg-primary/10 text-primary", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Gauge, { className: "w-6 h-6" }) }),
            "Reliability"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassPanel, { className: "p-5 border border-white/10 rounded-2xl", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] uppercase tracking-[0.2em] text-muted-foreground", children: "Observed Uptime" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "w-4 h-4 text-primary/60" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-3xl font-black font-mono mb-3", children: uptimePct !== null ? `${uptimePct}%` : "--" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2 rounded-full bg-white/10 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                className: "h-full rounded-full bg-gradient-to-r from-emerald-400 to-primary",
                initial: { width: 0 },
                animate: { width: `${uptimePct ?? 0}%` },
                transition: { duration: 1, ease: "easeOut" }
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-2 text-[11px] text-muted-foreground", children: [
              uptimeSamples.length,
              " samples this session"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassPanel, { className: "p-5 border border-white/10 rounded-2xl", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] uppercase tracking-[0.2em] text-muted-foreground mb-2", children: "MTTR" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-black font-mono", children: mttrMinutes !== null ? `${mttrMinutes}m` : "--" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-[11px] text-muted-foreground", children: "mean recovery" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassPanel, { className: "p-5 border border-white/10 rounded-2xl", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] uppercase tracking-[0.2em] text-muted-foreground mb-2", children: "Check Freq" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-2xl font-black font-mono", children: [
                SERVICE_CHECK_FREQ_SECONDS,
                "s"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 text-[11px] text-muted-foreground", children: [
                "proxy ",
                PROXY_POLL_FREQ_SECONDS,
                "s"
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(GlassPanel, { className: "p-5 border border-white/10 rounded-2xl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] uppercase tracking-[0.2em] text-muted-foreground mb-1", children: "Last Pulse" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-lg font-bold font-mono", children: lastChecked.toLocaleTimeString() })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: `w-8 h-8 ${isRefreshing ? "text-primary animate-pulse" : "text-primary/40"}` })
          ] }) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(MobileNav, {})
  ] });
}
export {
  StatusPage as default
};
