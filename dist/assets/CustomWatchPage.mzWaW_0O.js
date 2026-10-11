import { e as useNavigate, i as useParams, r as reactExports, j as jsxRuntimeExports } from "./react-vendor.CAo4XUiA.js";
import { E as EmbedPlayer, V as VideoPlayer } from "./EmbedPlayer.BH04tPBk.js";
import { M as MobileVideoPlayer } from "./MobileVideoPlayer.BbSW_qGb.js";
import { U as useIsMobileApp, f4 as useCustomSource, f7 as useCustomInfo, f8 as useCustomWatch, G as GlassPanel, j as cn } from "./index.C6yfkT5T.js";
import { u as ArrowLeft, aG as ChevronLeft, b as ChevronRight, Q as LoaderCircle, c8 as Server } from "./icons.C2gBBarQ.js";
import "./vendor.CJyRs4QS.js";
import "./hls.BlgtCWcq.js";
import "./subtitle-utils.B2k2Dirm.js";
import "./useDownload.DEAa3Keh.js";
import "./autoDownloadNext.BiTHv2Cb.js";
import "./tanstack.DPr3OB19.js";
import "./supabase.WuRMX5Dg.js";
import "./radix.BiK9uYXL.js";
import "./motion.DVGLRFCH.js";
import "./editor.Dxw8dtyw.js";
import "./charts.Dr1fgDJ-.js";
function groupByServer(sources) {
  const groups = [];
  const byKey = /* @__PURE__ */ new Map();
  sources.forEach((s, i) => {
    const label = (s.server || s.source || `Server ${i + 1}`).trim() || `Server ${i + 1}`;
    let group = byKey.get(label);
    if (!group) {
      group = { key: label, label, sources: [] };
      byKey.set(label, group);
      groups.push(group);
    }
    group.sources.push(s);
  });
  return groups;
}
function toPlaybackSources(sources) {
  return sources.filter((s) => (s == null ? void 0 : s.sourceType) !== "custom" && !s.isEmbed && (s == null ? void 0 : s.url) && /^(https?:|mobile-proxy:|blob:|file:|\/)/i.test(String(s.url))).map((s) => ({
    url: s.url,
    isM3U8: s.sourceType === "hls" || /\.m3u8/i.test(s.url),
    quality: s.quality,
    sourceType: s.sourceType,
    originalUrl: s.originalUrl,
    headers: s.headers
  }));
}
function toSubtitles(sources) {
  const first = sources.find((s) => Array.isArray(s.subtitles) && s.subtitles.length);
  if (!first) return [];
  return first.subtitles.map((t) => ({
    lang: t.language,
    url: t.url,
    label: t.label,
    originalUrl: t.originalUrl,
    headers: t.headers || first.headers
  }));
}
function toHeaders(sources) {
  var _a;
  const h = (_a = sources.find((s) => s.headers && Object.keys(s.headers).length)) == null ? void 0 : _a.headers;
  if (!h) return void 0;
  return { Referer: h.Referer || h.referer, "User-Agent": h["User-Agent"] || h["user-agent"] };
}
function CustomWatchPage() {
  var _a, _b;
  const navigate = useNavigate();
  const isMobileApp = useIsMobileApp();
  const { namespace, sourceId, id, episodeId } = useParams();
  const { source } = useCustomSource(namespace, sourceId);
  const { data: info } = useCustomInfo(namespace, sourceId, id);
  const { data, isLoading, isError } = useCustomWatch(namespace, sourceId, id, episodeId);
  const [failed, setFailed] = reactExports.useState(false);
  const sources = reactExports.useMemo(() => (data == null ? void 0 : data.sources) ?? [], [data == null ? void 0 : data.sources]);
  const servers = reactExports.useMemo(() => groupByServer(sources), [sources]);
  const [serverIdx, setServerIdx] = reactExports.useState(0);
  reactExports.useEffect(() => {
    setServerIdx(0);
    setFailed(false);
  }, [episodeId, servers.length]);
  const activeServer = servers[serverIdx] ?? servers[0];
  const activeSources = reactExports.useMemo(() => (activeServer == null ? void 0 : activeServer.sources) ?? [], [activeServer]);
  const activeEmbed = activeSources.find((source2) => source2.sourceType === "custom" || source2.isEmbed);
  const playbackSources = reactExports.useMemo(() => toPlaybackSources(activeSources), [activeSources]);
  const subtitles = reactExports.useMemo(() => toSubtitles(activeSources), [activeSources]);
  const headers = reactExports.useMemo(() => toHeaders(activeSources), [activeSources]);
  const selectServer = (idx) => {
    if (idx === serverIdx) return;
    setServerIdx(idx);
    setFailed(false);
  };
  const onServerSwitch = servers.length > 1 ? () => selectServer((serverIdx + 1) % servers.length) : void 0;
  const entries = (info == null ? void 0 : info.entries) ?? [];
  const currentIdx = entries.findIndex((e) => e.id === episodeId);
  const prev = currentIdx > 0 ? entries[currentIdx - 1] : null;
  const next = currentIdx >= 0 && currentIdx < entries.length - 1 ? entries[currentIdx + 1] : null;
  const currentLabel = currentIdx >= 0 ? entries[currentIdx].label : episodeId;
  const base = `/x/${namespace}/${sourceId}`;
  const goEntry = (entryId) => navigate(`${base}/watch/${id}/${encodeURIComponent(entryId)}`);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative min-h-screen bg-background text-foreground", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sticky top-0 z-30 flex items-center gap-2 border-b border-white/10 bg-black/50 px-3 py-2 backdrop-blur", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => navigate(`${base}/info/${encodeURIComponent(id || "")}`),
          className: "inline-flex items-center gap-1.5 rounded-lg border border-white/15 px-2.5 py-1.5 text-sm font-semibold hover:bg-white/10",
          title: "Back to info",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          disabled: !prev,
          onClick: () => prev && goEntry(prev.id),
          className: "inline-flex items-center gap-1 rounded-lg border border-white/15 px-2.5 py-1.5 text-sm font-semibold hover:bg-white/10 disabled:opacity-40",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "h-4 w-4" }),
            " Prev"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-w-0 flex-1 flex-col items-center px-2 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-full truncate text-sm font-bold", children: (info == null ? void 0 : info.title) || (source == null ? void 0 : source.name) || "Watch" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-full truncate text-xs text-muted-foreground", children: currentLabel })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          disabled: !next,
          onClick: () => next && goEntry(next.id),
          className: "inline-flex items-center gap-1 rounded-lg border border-white/15 px-2.5 py-1.5 text-sm font-semibold hover:bg-white/10 disabled:opacity-40",
          children: [
            "Next ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-4 w-4" })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto w-full max-w-6xl px-3 py-4", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-2 py-24 text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-5 w-5 animate-spin" }),
      " Loading sources…"
    ] }) : !activeEmbed && playbackSources.length === 0 || isError || failed ? /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassPanel, { className: "mx-auto max-w-xl border border-white/10 p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold", children: "Unable to load this episode" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-muted-foreground", children: servers.length > 1 ? "This server returned no playable stream. Try another server below, or a different episode." : "The source returned no playable streams. Try another episode or check that the extension is running." }),
      servers.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 flex flex-wrap gap-2", children: servers.map((srv, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: () => selectServer(idx),
          className: cn(
            "inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-semibold transition active:scale-95",
            idx === serverIdx ? "border-primary/60 bg-primary/20 text-foreground" : "border-white/15 bg-white/5 text-muted-foreground hover:bg-white/10"
          ),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Server, { className: "h-4 w-4" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: srv.label })
          ]
        },
        srv.key
      )) })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-hidden rounded-xl border border-white/10 bg-black", children: activeEmbed ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        EmbedPlayer,
        {
          url: activeEmbed.url,
          poster: info == null ? void 0 : info.image,
          language: activeEmbed.audioLanguage,
          referer: ((_a = activeEmbed.headers) == null ? void 0 : _a.Referer) || ((_b = activeEmbed.headers) == null ? void 0 : _b.referer),
          onError: () => setFailed(true)
        },
        `${(activeServer == null ? void 0 : activeServer.key) || "server"}:embed`
      ) : isMobileApp ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        MobileVideoPlayer,
        {
          sources: playbackSources,
          subtitles,
          headers,
          poster: info == null ? void 0 : info.image,
          isLoading,
          serverName: activeServer == null ? void 0 : activeServer.label,
          onServerSwitch,
          onError: () => setFailed(true),
          onEpisodeEnd: next ? () => goEntry(next.id) : void 0,
          onBack: () => navigate(`${base}/info/${encodeURIComponent(id || "")}`),
          episodeTitle: currentLabel
        },
        (activeServer == null ? void 0 : activeServer.key) || "server"
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
        VideoPlayer,
        {
          sources: playbackSources,
          subtitles,
          headers,
          poster: info == null ? void 0 : info.image,
          isLoading,
          serverName: activeServer == null ? void 0 : activeServer.label,
          onServerSwitch,
          onError: () => setFailed(true),
          onEpisodeEnd: next ? () => goEntry(next.id) : void 0,
          onNextEpisode: next ? () => goEntry(next.id) : void 0,
          onPreviousEpisode: prev ? () => goEntry(prev.id) : void 0
        },
        (activeServer == null ? void 0 : activeServer.key) || "server"
      ) }),
      servers.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassPanel, { className: "border border-white/10 p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-3 flex items-center gap-2 text-sm font-semibold text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Server, { className: "h-4 w-4" }),
          " Servers"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: servers.map((srv, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: () => selectServer(idx),
            className: cn(
              "inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-semibold transition active:scale-95",
              idx === serverIdx ? "border-primary/60 bg-primary/20 text-foreground" : "border-white/15 bg-white/5 text-muted-foreground hover:bg-white/10"
            ),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: srv.label }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-md bg-black/30 px-1.5 py-0.5 text-[11px] font-medium", children: srv.sources.length })
            ]
          },
          srv.key
        )) })
      ] })
    ] }) })
  ] });
}
export {
  CustomWatchPage as default
};
