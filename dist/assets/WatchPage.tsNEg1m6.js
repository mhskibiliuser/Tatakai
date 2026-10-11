const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/securityBridge.ksCfmINx.js","assets/vendor.CJyRs4QS.js","assets/react-vendor.CAo4XUiA.js"])))=>i.map(i=>d[i]);
import { b6 as Capacitor, bf as ue, b9 as __vitePreload } from "./vendor.CJyRs4QS.js";
import { r as reactExports, j as jsxRuntimeExports, i as useParams, e as useNavigate, u as useLocation } from "./react-vendor.CAo4XUiA.js";
import { cc as useVideoSettings, cd as isMobileProxyUrl, ce as resolveMobileProxy, cf as normalizeMobileHeaders, cg as AlertDialog, ch as AlertDialogContent, ci as AlertDialogHeader, cj as AlertDialogTitle, ck as AlertDialogDescription, cl as AlertDialogFooter, cm as AlertDialogCancel, cn as AlertDialogAction, az as Input, j as cn, B as Button, u as useAuth, D as useIsNativeApp, K as useIsDesktopApp, U as useIsMobileApp, s as useIsMobile, co as hasTorrentService, cp as debridOrchestrator, n as getLocalContinueWatching, cq as getPreferredServer, cr as useEpisodeServers, cs as useAnimeInfo, ct as useEpisodes, L as getLocalTorrentSessionHistory, cu as updateLocalTorrentSessionHistory, cv as upsertLocalTorrentSessionHistory, cw as useWatchTracking, cx as sortServersByHealth, cy as trackEvent, cz as logPlaybackTelemetry, cA as fetchCombinedSources, cB as buildDubSubtitles, cC as selectSourceForServer, cD as getRefererVariants, cE as useUpdateWatchHistory, cF as updateLocalContinueWatching, cG as clearDiscordRpc, cH as comboFailureKey, cI as recordSourceFailure, cJ as recordProviderQualityOutcome, cK as shouldAutoSkipSource, cL as clearCachedCombinedSourcesByEpisodeAndCategory, cM as clearSourceFailure, Q as Background, S as Sidebar, G as GlassPanel, cN as getSourceFailureCount, cO as getSourceHealthScore, cP as TooltipProvider, cQ as Tooltip, cR as TooltipTrigger, cS as setPreferredServer, cT as TooltipContent, cU as EpisodeComments, cV as ReportModal, aD as getProxiedVideoUrl, cW as preflightSourceUrl, cX as recordSourceHealth } from "./index.C6yfkT5T.js";
import { u as useCombinedSourcesWithRefetch } from "./useCombinedSources.OYGj822D.js";
import { M as MobileNav } from "./MobileNav.ABHzkhTQ.js";
import { S as Skeleton } from "./skeleton-custom.3olGZrgu.js";
import { E as EmbedPlayer, V as VideoPlayer } from "./EmbedPlayer.BH04tPBk.js";
import { M as MobileVideoPlayer } from "./MobileVideoPlayer.BbSW_qGb.js";
import { onNativePlayerEvent, openNativePlayer, closeNativePlayer } from "./nativePlayerBridge.3MomVRFu.js";
import { a as CircleAlert, Q as LoaderCircle, b9 as RotateCcw, u as ArrowLeft, T as TriangleAlert, U as Users, bu as Scale, I as Info, t as HardDrive, x as CirclePlay, l as Magnet, S as Search, X, cr as ArrowDownWideNarrow, cs as ArrowUpNarrowWide, aA as Layers, n as Radio, ag as ShieldCheck, R as RefreshCw, N as ChevronDown, aD as Clock, D as Download, aa as Upload, c as Check, q as Copy, r as Square, Y as FolderOpen, m as Eye, ai as Flag, aG as ChevronLeft, b as ChevronRight, b5 as Volume2, b2 as Captions, c8 as Server, a5 as Globe, C as CircleCheck, ct as ListVideo } from "./icons.C2gBBarQ.js";
import { b as buildUniqueSimpleNameMap, g as getSimpleServerDisplayName, a as getFriendlyServerName } from "./serverNames.D82Wgje2.js";
import { a as useAnimeViewCount, b as useViewTracker, f as formatViewCount } from "./useViews.BuGVZ9r8.js";
import { R as ReviewPopup } from "./ReviewPopup.D-oIDxcg.js";
import { O as OpenInAppButton } from "./OpenInAppButton.JimbvqsA.js";
import { u as useQueryClient, a as useQuery } from "./tanstack.DPr3OB19.js";
import "./supabase.WuRMX5Dg.js";
import "./radix.BiK9uYXL.js";
import "./motion.DVGLRFCH.js";
import "./hls.BlgtCWcq.js";
import "./editor.Dxw8dtyw.js";
import "./charts.Dr1fgDJ-.js";
import "./subtitle-utils.B2k2Dirm.js";
import "./useDownload.DEAa3Keh.js";
import "./autoDownloadNext.BiTHv2Cb.js";
function subtitleMime(url) {
  const clean = url.split("?")[0].toLowerCase();
  if (clean.endsWith(".vtt")) return "text/vtt";
  if (clean.endsWith(".srt")) return "application/x-subrip";
  if (clean.endsWith(".ass") || clean.endsWith(".ssa")) return "text/x-ssa";
  return "text/vtt";
}
function nativeLanguage(value) {
  const normalized = String(value || "").trim().toLowerCase();
  if (!normalized || normalized === "auto") return "";
  if (normalized === "off") return "";
  if (normalized === "english" || normalized.startsWith("eng")) return "en";
  if (normalized === "japanese" || normalized.startsWith("jpn")) return "ja";
  if (normalized === "hindi" || normalized.startsWith("hin")) return "hi";
  if (normalized === "spanish" || normalized.startsWith("spa")) return "es";
  if (normalized === "french" || normalized.startsWith("fre") || normalized.startsWith("fra")) return "fr";
  return normalized.slice(0, 2);
}
function formatRate$1(bytesPerSecond) {
  const value = Number(bytesPerSecond || 0);
  if (!Number.isFinite(value) || value <= 0) return "0 KB/s";
  const kb = value / 1024;
  if (kb < 1024) return `${kb.toFixed(kb >= 100 ? 0 : 1)} KB/s`;
  return `${(kb / 1024).toFixed(kb / 1024 >= 100 ? 0 : 1)} MB/s`;
}
function NativeTorrentPlayer({
  url,
  streamKind = "torrent",
  title,
  poster,
  subtitles = [],
  preferredAudioLanguage,
  initialSeekSeconds,
  introWindow,
  outroWindow,
  torrentStats,
  onProgressUpdate,
  onEpisodeEnd,
  onBack,
  onError
}) {
  const { settings } = useVideoSettings();
  const openedUrlRef = reactExports.useRef(null);
  const completedRef = reactExports.useRef(false);
  const [status, setStatus] = reactExports.useState("opening");
  const [message, setMessage] = reactExports.useState("Opening native torrent player…");
  const progressRef = reactExports.useRef(onProgressUpdate);
  reactExports.useEffect(() => {
    progressRef.current = onProgressUpdate;
  }, [onProgressUpdate]);
  const endedRef = reactExports.useRef(onEpisodeEnd);
  reactExports.useEffect(() => {
    endedRef.current = onEpisodeEnd;
  }, [onEpisodeEnd]);
  const backRef = reactExports.useRef(onBack);
  reactExports.useEffect(() => {
    backRef.current = onBack;
  }, [onBack]);
  const errorRef = reactExports.useRef(onError);
  reactExports.useEffect(() => {
    errorRef.current = onError;
  }, [onError]);
  const nativeSubtitles = reactExports.useMemo(
    () => subtitles.filter((track) => Boolean(track == null ? void 0 : track.url)).map((track) => {
      const proxyEntry = isMobileProxyUrl(track.url) ? resolveMobileProxy(track.url) : null;
      const url2 = (proxyEntry == null ? void 0 : proxyEntry.url) || track.originalUrl || track.url;
      const headers = {
        ...normalizeMobileHeaders(track.headers),
        ...normalizeMobileHeaders(proxyEntry == null ? void 0 : proxyEntry.headers)
      };
      return {
        url: url2,
        lang: track.lang,
        label: track.label,
        mime: subtitleMime(url2),
        headers
      };
    }),
    [subtitles]
  );
  const nativeRequestHeaders = reactExports.useMemo(() => {
    const merged = {};
    for (const track of nativeSubtitles) Object.assign(merged, track.headers || {});
    return merged;
  }, [nativeSubtitles]);
  const nativePreferences = reactExports.useMemo(() => ({
    preferredAudioLanguage: nativeLanguage(preferredAudioLanguage),
    preferredSubtitleLanguage: nativeLanguage(
      settings.subtitleLanguage === "auto" ? "english" : settings.subtitleLanguage
    ),
    subtitlesEnabled: settings.subtitleLanguage !== "off"
  }), [preferredAudioLanguage, settings.subtitleLanguage]);
  const subtitlesRef = reactExports.useRef(nativeSubtitles);
  reactExports.useEffect(() => {
    subtitlesRef.current = nativeSubtitles;
  }, [nativeSubtitles]);
  const titleRef = reactExports.useRef(title);
  reactExports.useEffect(() => {
    titleRef.current = title;
  }, [title]);
  const introKey = introWindow ? `${introWindow.start}:${introWindow.end}` : "";
  const outroKey = outroWindow ? `${outroWindow.start}:${outroWindow.end}` : "";
  const windowsRef = reactExports.useRef({ intro: introWindow ?? null, outro: outroWindow ?? null });
  reactExports.useEffect(() => {
    windowsRef.current = { intro: introWindow ?? null, outro: outroWindow ?? null };
  }, [introKey, outroKey]);
  const startPositionRef = reactExports.useRef(Math.max(0, Number(initialSeekSeconds || 0) * 1e3));
  reactExports.useEffect(() => {
    if (openedUrlRef.current == null) {
      startPositionRef.current = Math.max(0, Number(initialSeekSeconds || 0) * 1e3);
    }
  }, [initialSeekSeconds]);
  reactExports.useEffect(() => {
    let cancelled = false;
    let unsubscribe = null;
    completedRef.current = false;
    setStatus("opening");
    setMessage("Opening native torrent player…");
    if (streamKind === "debrid") setMessage("Opening debrid stream...");
    unsubscribe = onNativePlayerEvent((event) => {
      var _a, _b, _c, _d, _e;
      if (cancelled) return;
      const position = Number((event == null ? void 0 : event.positionMs) || 0) / 1e3;
      const duration = Number((event == null ? void 0 : event.durationMs) || 0) / 1e3;
      if ((event == null ? void 0 : event.type) === "playerProgress" || (event == null ? void 0 : event.type) === "playerClosed") {
        (_a = progressRef.current) == null ? void 0 : _a.call(progressRef, position, duration, Boolean(event == null ? void 0 : event.completed));
      }
      if ((event == null ? void 0 : event.type) === "playerEnded" && !completedRef.current) {
        completedRef.current = true;
        (_b = progressRef.current) == null ? void 0 : _b.call(progressRef, position, duration, true);
        (_c = endedRef.current) == null ? void 0 : _c.call(endedRef);
      }
      if ((event == null ? void 0 : event.type) === "playerClosed") {
        setStatus("closed");
        (_d = backRef.current) == null ? void 0 : _d.call(backRef);
      }
      if ((event == null ? void 0 : event.type) === "playerError") {
        setStatus("error");
        const text = String((event == null ? void 0 : event.message) || "Unable to decode this torrent file on this device.");
        setMessage(text);
        (_e = errorRef.current) == null ? void 0 : _e.call(errorRef, text);
      }
    });
    openedUrlRef.current = url;
    const windows = windowsRef.current;
    void openNativePlayer({
      url,
      title: titleRef.current,
      startPositionMs: startPositionRef.current,
      intro: windows.intro,
      outro: windows.outro,
      subtitles: subtitlesRef.current,
      headers: nativeRequestHeaders,
      ...nativePreferences
    }).then((result) => {
      var _a;
      if (cancelled) return;
      if (!(result == null ? void 0 : result.success)) {
        openedUrlRef.current = null;
        setStatus("error");
        const text = String((result == null ? void 0 : result.error) || "Could not open the native torrent player.");
        setMessage(text);
        (_a = errorRef.current) == null ? void 0 : _a.call(errorRef, text);
        return;
      }
      setStatus("playing");
      setMessage("Playing in the native player…");
    });
    return () => {
      cancelled = true;
      unsubscribe == null ? void 0 : unsubscribe();
      if (openedUrlRef.current != null) {
        openedUrlRef.current = null;
        void closeNativePlayer().catch(() => {
        });
      }
    };
  }, [url, streamKind]);
  const retry = () => {
    openedUrlRef.current = null;
    completedRef.current = false;
    setStatus("opening");
    setMessage("Opening native torrent player…");
    const windows = windowsRef.current;
    if (streamKind === "debrid") setMessage("Opening debrid stream...");
    void openNativePlayer({
      url,
      title,
      startPositionMs: startPositionRef.current,
      intro: windows.intro,
      outro: windows.outro,
      subtitles: nativeSubtitles,
      headers: nativeRequestHeaders,
      ...nativePreferences
    }).then((result) => {
      var _a;
      if (!(result == null ? void 0 : result.success)) {
        openedUrlRef.current = null;
        setStatus("error");
        const text = String((result == null ? void 0 : result.error) || "Could not open the native torrent player.");
        setMessage(text);
        (_a = errorRef.current) == null ? void 0 : _a.call(errorRef, text);
        return;
      }
      openedUrlRef.current = url;
      setStatus("playing");
      setMessage("Playing in the native player…");
    });
  };
  const progressPercent = (() => {
    const raw = Number((torrentStats == null ? void 0 : torrentStats.progress) ?? 0);
    if (!Number.isFinite(raw)) return 0;
    const normalized = raw <= 1 ? raw * 100 : raw;
    return Math.max(0, Math.min(100, normalized));
  })();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex w-full aspect-video items-center justify-center overflow-hidden bg-black text-white", children: [
    poster && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "img",
      {
        src: poster,
        alt: "",
        "aria-hidden": true,
        className: "pointer-events-none absolute inset-0 h-full w-full object-cover opacity-30 blur-[2px]"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/60" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex max-w-md flex-col items-center px-6 text-center", children: [
      status === "error" ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "mb-3 h-8 w-8 text-red-400" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "mb-3 h-8 w-8 animate-spin text-primary" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-white/90", children: status === "closed" ? "Native player closed." : status === "playing" ? "Playing in the native player…" : message }),
      status === "playing" && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 max-w-xs text-[11px] leading-relaxed text-white/50", children: "Subtitles & alternate audio (incl. embedded MKV tracks) are in the player's subtitle / settings menu." }),
      status !== "error" && torrentStats && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 text-xs text-white/60", children: [
        progressPercent.toFixed(0),
        "%",
        Number(torrentStats == null ? void 0 : torrentStats.seeders) > 0 ? ` • ${torrentStats == null ? void 0 : torrentStats.seeders} seeders` : "",
        Number(torrentStats == null ? void 0 : torrentStats.numPeers) > 0 ? ` • ${torrentStats == null ? void 0 : torrentStats.numPeers} peers` : "",
        Number(torrentStats == null ? void 0 : torrentStats.downloadSpeed) > 0 ? ` • ${formatRate$1(torrentStats == null ? void 0 : torrentStats.downloadSpeed)}` : ""
      ] }),
      status !== "error" && torrentStats && progressPercent > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 h-1 w-48 overflow-hidden rounded-full bg-white/15", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full rounded-full bg-primary transition-[width]", style: { width: `${progressPercent}%` } }) }),
      (status === "error" || status === "closed") && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: retry,
            className: "flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { className: "h-4 w-4" }),
              status === "error" ? "Retry" : "Reopen player"
            ]
          }
        ),
        onBack && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: () => {
              var _a;
              return (_a = backRef.current) == null ? void 0 : _a.call(backRef);
            },
            className: "flex items-center gap-2 rounded-xl bg-white/10 px-5 py-2.5 text-sm font-semibold text-white",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" }),
              "Back"
            ]
          }
        )
      ] })
    ] })
  ] });
}
const REGION_POLICIES = {
  DE: {
    level: "high",
    headline: "Germany is among the most actively enforced regions",
    detail: "Law firms acting for rights-holders monitor public swarms and send cease-and-desist letters (Abmahnung) with fee demands to the subscriber behind the IP address. Demands of several hundred euros for a single title are routine."
  },
  JP: {
    level: "high",
    headline: "Japan treats uploading copyrighted works as a criminal offence",
    detail: "Making copyrighted works available carries criminal penalties, and knowingly downloading pirated material is also unlawful — since 2021 that extends beyond music and video to manga and other works. BitTorrent uploads by design, so seeding is the exposed part."
  },
  US: {
    level: "high",
    headline: "United States: ISP notices and civil suits over swarm IPs",
    detail: "ISPs forward DMCA notices and may throttle or terminate repeat-infringer accounts. Rights-holders also file civil suits naming IP addresses collected from swarms, then subpoena the ISP for the subscriber."
  },
  FR: {
    level: "high",
    headline: "France operates a graduated-response scheme",
    detail: "Arcom (formerly HADOPI) collects IP addresses from public swarms and issues escalating warnings that can lead to fines. Notices go to the internet subscriber, not necessarily the person who ran the client."
  },
  KR: {
    level: "high",
    headline: "South Korea enforces copyright aggressively",
    detail: "Rights-holders and authorities pursue both uploaders and repeat downloaders, and accounts can be suspended under repeat-infringement rules. Settlement demands sent to individuals are common."
  },
  DK: {
    level: "high",
    headline: "Denmark has seen large rights-holder letter campaigns",
    detail: "Firms acting for rights-holders have collected swarm IP addresses at scale and sent settlement demands to subscribers, alongside court-ordered blocking of torrent sites."
  },
  SE: {
    level: "moderate",
    headline: "Sweden: settlement letters and site blocking",
    detail: "Rights-holders have obtained subscriber details from ISPs by court order and sent payment demands. Torrent sites are also subject to blocking orders."
  },
  FI: {
    level: "moderate",
    headline: "Finland: subscriber-details orders and settlement demands",
    detail: "Courts have ordered ISPs to disclose subscriber details behind swarm IP addresses, followed by letters seeking payment. Site blocking is in force."
  },
  NO: {
    level: "moderate",
    headline: "Norway: blocking orders and rights-holder notices",
    detail: "Torrent sites are blocked by court order and rights-holders can seek subscriber details. Enforcement against individuals is less routine than in Germany or Denmark."
  },
  GB: {
    level: "moderate",
    headline: "United Kingdom: forwarded warnings and blocked sites",
    detail: "ISPs forward rights-holder warning notices to subscribers, and courts have ordered widespread blocking of torrent indexes. Civil claims against individuals happen but are less common."
  },
  IE: {
    level: "moderate",
    headline: "Ireland: graduated notices via ISPs",
    detail: "ISPs operate notice schemes with rights-holders that escalate on repeat detections, and blocking orders cover major torrent sites."
  },
  NL: {
    level: "moderate",
    headline: "Netherlands: downloading from illegal sources is unlawful",
    detail: "The 2014 ECJ ruling ended the previous tolerance for private downloading. BREIN pursues uploaders and large-scale sharers, and has obtained subscriber details by court order."
  },
  BE: {
    level: "moderate",
    headline: "Belgium: site blocking and rights-holder action",
    detail: "Torrent sites are blocked by court order and rights-holders pursue uploaders. Individual notices are less systematic than in neighbouring Germany."
  },
  AT: {
    level: "moderate",
    headline: "Austria: letters modelled on the German approach",
    detail: "Law firms monitor swarms and send demands to subscribers, and courts have permitted disclosure of subscriber details in copyright cases."
  },
  IT: {
    level: "moderate",
    headline: "Italy: AGCOM blocking and administrative fines",
    detail: "AGCOM can order rapid blocking of infringing services, and financial penalties for sharing copyrighted works exist. Enforcement focuses on services more than individual downloaders."
  },
  AU: {
    level: "moderate",
    headline: "Australia: site blocking, and past mass-IP litigation",
    detail: "Rights-holders hold standing orders to block torrent sites, and have previously sought subscriber details from ISPs for swarm IP addresses (the Dallas Buyers Club case)."
  },
  NZ: {
    level: "moderate",
    headline: "New Zealand: three-notice regime with tribunal penalties",
    detail: "Rights-holders can send escalating notices via the ISP; after the third, the Copyright Tribunal can award penalties against the account holder."
  },
  CA: {
    level: "moderate",
    headline: "Canada: notice-and-notice, forwarded by your ISP",
    detail: "ISPs are required to forward rights-holder notices to subscribers. Statutory damages for non-commercial infringement are capped, but settlement demand letters are common and sometimes overstate exposure."
  },
  SG: {
    level: "moderate",
    headline: "Singapore: site blocking and past mass letters",
    detail: "Blocking orders cover major torrent sites, and rights-holders have previously sent letters seeking payment from subscribers identified through swarms."
  },
  IN: {
    level: "moderate",
    headline: "India: John Doe orders and ISP warning pages",
    detail: 'Courts issue broad "John Doe" blocking orders and ISPs display warning notices citing possible imprisonment and fines. Enforcement against individual downloaders is rare in practice but the warnings are real.'
  },
  ID: {
    level: "moderate",
    headline: "Indonesia: widespread blocking of infringing services",
    detail: "Authorities block infringing sites at scale. Action against individual downloaders is uncommon, but the underlying acts remain unlawful."
  },
  BR: {
    level: "moderate",
    headline: "Brazil: enforcement aimed at services",
    detail: "Operations target infringing sites and apps rather than individual peers, though sharing copyrighted works remains unlawful."
  },
  ES: {
    level: "personal-use-tolerated",
    headline: "Spain: private copying is treated differently from sharing",
    detail: "Downloading for private, non-commercial use has generally not been pursued criminally, but making works available to others — which is what seeding does — is. Sites are blocked by administrative order."
  },
  PL: {
    level: "personal-use-tolerated",
    headline: "Poland: private-use downloading, but not making available",
    detail: "Personal-use copying is broadly permitted, while making a work available to others is not — and a BitTorrent client uploads to peers as a condition of downloading."
  },
  CH: {
    level: "personal-use-tolerated",
    headline: "Switzerland: downloading for private use is lawful; sharing is not",
    detail: "Private-use downloading is permitted, and monitoring peers to collect IP addresses was restricted by the Federal Supreme Court (Logistep). Uploading and sharing remain unlawful, and the 2020 copyright revision strengthened rights-holder tools."
  }
};
const DEFAULT_POLICY = {
  level: "unknown",
  headline: "Local rules on torrenting vary and can be strict",
  detail: "In most countries, sharing copyrighted works without permission is unlawful even when the download is for personal use, and many ISPs forward rights-holder notices to the subscriber. Check what applies where you are."
};
function resolveViewerRegion() {
  const candidates = [];
  try {
    if (typeof navigator !== "undefined") {
      if (Array.isArray(navigator.languages)) candidates.push(...navigator.languages);
      if (navigator.language) candidates.push(navigator.language);
    }
  } catch {
  }
  try {
    const resolved = new Intl.DateTimeFormat().resolvedOptions().locale;
    if (resolved) candidates.push(resolved);
  } catch {
  }
  for (const tag of candidates) {
    const region = regionOfLocale(tag);
    if (region) return region;
  }
  return "";
}
function regionOfLocale(tag) {
  const value = String(tag || "").trim();
  if (!value) return "";
  try {
    const region = new Intl.Locale(value).region;
    if (region) return String(region).toUpperCase();
  } catch {
  }
  const parts = value.replace(/_/g, "-").split("-");
  for (const part of parts.slice(1)) {
    if (/^[A-Za-z]{2}$/.test(part)) return part.toUpperCase();
  }
  return "";
}
function regionDisplayName(code) {
  if (!code) return "your region";
  try {
    const names = new Intl.DisplayNames(void 0, { type: "region" });
    const name = names.of(code);
    if (name && name !== code) return String(name);
  } catch {
  }
  return code;
}
function getTorrentRegionPolicy(regionCode) {
  var _a;
  const code = String(resolveViewerRegion() ?? "").trim().toUpperCase();
  const entry = code && ((_a = REGION_POLICIES[code]) == null ? void 0 : _a.headline) ? REGION_POLICIES[code] : DEFAULT_POLICY;
  return {
    regionCode: code,
    regionName: regionDisplayName(code),
    level: entry.level,
    headline: entry.headline,
    detail: entry.detail
  };
}
const TORRENT_UNIVERSAL_NOTES = [
  "A BitTorrent client uploads to other peers while it downloads — sharing is not an optional extra you can decline.",
  "Your IP address is visible to every other peer in the swarm, and to anyone monitoring it.",
  "A VPN changes which address the swarm sees; it does not change what is lawful where you are."
];
const LEVEL_STYLES = {
  high: {
    label: "Actively enforced",
    className: "bg-red-500/10 text-red-400 border-red-500/30"
  },
  moderate: {
    label: "Enforced",
    className: "bg-amber-500/10 text-amber-400 border-amber-500/30"
  },
  "personal-use-tolerated": {
    label: "Sharing is the risk",
    className: "bg-sky-500/10 text-sky-400 border-sky-500/30"
  },
  unknown: {
    label: "Region unknown",
    className: "bg-muted text-muted-foreground border-white/10"
  }
};
function infoHashOf(magnet) {
  const match = /xt=urn:btih:([a-z0-9]+)/i.exec(magnet);
  return match ? match[1].toUpperCase() : "";
}
function trackerCountOf(magnet) {
  const matches = magnet.match(/[?&]tr=/gi);
  return matches ? matches.length : 0;
}
function TorrentSwitchDialog({
  source,
  animeTitle,
  episodeLabel,
  canPlayTorrent,
  optimizeStorage,
  downloadPath,
  onCancel,
  onConfirm
}) {
  const policy = reactExports.useMemo(() => getTorrentRegionPolicy(), []);
  const magnet = String((source == null ? void 0 : source.magnetLink) || (source == null ? void 0 : source.url) || "");
  const hasMagnet = /^magnet:/i.test(magnet);
  const infoHash = hasMagnet ? infoHashOf(magnet) : "";
  const trackers = hasMagnet ? trackerCountOf(magnet) : 0;
  const fullTitle = String((source == null ? void 0 : source.torrentTitle) || "").trim() || [trimmed(animeTitle), trimmed(episodeLabel)].filter(Boolean).join(" — ") || "Untitled release";
  const providerLabel = String((source == null ? void 0 : source.providerName) || (source == null ? void 0 : source.server) || (source == null ? void 0 : source.providerKey) || "").trim() || "Unknown provider";
  const seeders = numberOrNull(source == null ? void 0 : source.seeders);
  const leechers = numberOrNull(source == null ? void 0 : source.leechers);
  const peers = numberOrNull(source == null ? void 0 : source.peers);
  const detailRows = reactExports.useMemo(() => {
    const rows = [];
    const push = (label, value) => {
      const text = value === 0 ? "0" : String(value ?? "").trim();
      if (text) rows.push({ label, value: text });
    };
    push("Provider", providerLabel);
    push("Release group", source == null ? void 0 : source.releaseGroup);
    push("Quality", source == null ? void 0 : source.quality);
    push("Size", source == null ? void 0 : source.fileSize);
    push("Container", source == null ? void 0 : source.fileFormat);
    push("Video codec", source == null ? void 0 : source.codec);
    push("Audio", (source == null ? void 0 : source.audio) || (source == null ? void 0 : source.audioLanguage));
    push("Language", (source == null ? void 0 : source.languageLabel) || (source == null ? void 0 : source.language));
    push("Subtitles", source == null ? void 0 : source.subtitleType);
    push("Episodes in release", source == null ? void 0 : source.episodeRange);
    push("Seeders", seeders);
    push("Leechers", leechers);
    push("Peers", peers);
    push("Trackers in magnet", trackers > 0 ? trackers : null);
    push("Info hash", infoHash);
    return rows;
  }, [
    providerLabel,
    source == null ? void 0 : source.releaseGroup,
    source == null ? void 0 : source.quality,
    source == null ? void 0 : source.fileSize,
    source == null ? void 0 : source.fileFormat,
    source == null ? void 0 : source.codec,
    source == null ? void 0 : source.audio,
    source == null ? void 0 : source.audioLanguage,
    source == null ? void 0 : source.languageLabel,
    source == null ? void 0 : source.language,
    source == null ? void 0 : source.subtitleType,
    source == null ? void 0 : source.episodeRange,
    seeders,
    leechers,
    peers,
    trackers,
    infoHash
  ]);
  const levelStyle = LEVEL_STYLES[policy.level];
  const zeroSeeders = seeders === 0;
  const canConfirm = canPlayTorrent && hasMagnet;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialog, { open: !!source, onOpenChange: (open) => {
    if (!open) onCancel();
  }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { className: "max-w-2xl max-h-[88vh] overflow-y-auto border-white/10 bg-background/95 backdrop-blur-xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogTitle, { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "h-5 w-5 text-amber-400" }),
        "Switch to a torrent source?"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogDescription, { children: "This leaves the hosted stream and joins a peer-to-peer swarm. Read the notes below — the things it changes are not visible from the player." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "rounded-xl border border-white/10 bg-white/[0.03] p-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] font-bold uppercase tracking-widest text-muted-foreground", children: "Release" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 break-words font-mono text-xs leading-relaxed text-foreground", title: fullTitle, children: fullTitle }),
      (animeTitle || episodeLabel) && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 text-[11px] text-muted-foreground", children: [
        "Selected for ",
        [animeTitle, episodeLabel].filter(Boolean).join(" · ")
      ] }),
      (source == null ? void 0 : source.notes) && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-[11px] text-muted-foreground", children: String(source.notes) })
    ] }),
    detailRows.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "rounded-xl border border-white/10 bg-white/[0.03] p-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-2 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-3 w-3" }),
        " Source details"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("dl", { className: "grid grid-cols-1 gap-x-6 gap-y-1 sm:grid-cols-2", children: detailRows.map((row) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline justify-between gap-3 text-[11px]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "shrink-0 text-muted-foreground", children: row.label }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "truncate font-medium", title: row.value, children: row.value })
      ] }, row.label)) }),
      zeroSeeders && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 rounded-md bg-red-500/10 px-2 py-1 text-[11px] text-red-400", children: "The indexer reports no seeders. Counts are often stale so it may still start, but if no peer has the data it will never play." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "rounded-xl border border-white/10 bg-white/[0.03] p-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-2 flex items-center justify-between gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Scale, { className: "h-3 w-3" }),
          " Where you appear to be: ",
          policy.regionName
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `shrink-0 rounded-full border px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider ${levelStyle.className}`, children: levelStyle.label })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold", children: policy.headline }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-[11px] leading-relaxed text-muted-foreground", children: policy.detail }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-2 space-y-1", children: TORRENT_UNIVERSAL_NOTES.map((note) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-2 text-[11px] leading-relaxed text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-[6px] h-1 w-1 shrink-0 rounded-full bg-muted-foreground/60" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: note })
      ] }, note)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-2 flex gap-1.5 text-[10px] leading-relaxed text-muted-foreground/80", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { className: "mt-[1px] h-3 w-3 shrink-0" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "General information, not legal advice. The region above is guessed from your language settings, not your location, and enforcement practices change." })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "rounded-xl border border-white/10 bg-white/[0.03] p-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-2 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(HardDrive, { className: "h-3 w-3" }),
        " Storage"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "space-y-1 text-[11px] leading-relaxed text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          "The whole file is written to disk, not streamed and discarded",
          (source == null ? void 0 : source.fileSize) ? ` — this release reports ${String(source.fileSize)}.` : ".",
          " ",
          "A season pack downloads in full even when you only watch one episode."
        ] }),
        downloadPath && /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "break-all", children: [
          "Saved under ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-foreground/80", children: downloadPath })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: optimizeStorage ? "Storage optimisation is on, so finished data is cleaned up automatically under your cache limits." : "Storage optimisation is off, so downloaded data stays until you remove it in Settings → Torrent." })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "rounded-xl border border-white/10 bg-white/[0.03] p-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-2 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CirclePlay, { className: "h-3 w-3" }),
        " Playback"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "space-y-1 text-[11px] leading-relaxed text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Playback starts only once metadata resolves and peers are found — usually seconds, sometimes never." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Seeking is limited to what has downloaded, so the timeline stays locked until the file is complete and verified." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Subtitles and audio tracks come from inside the release, so they may differ from the hosted stream." }),
        !canPlayTorrent && /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: "text-amber-400", children: "Torrent playback needs the Tatakai desktop or mobile app — a web browser cannot start a session." }),
        !hasMagnet && /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: "text-amber-400", children: "This source has no magnet link, so there is nothing to start." })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { onClick: onCancel, children: "Keep current source" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        AlertDialogAction,
        {
          disabled: !canConfirm,
          onClick: () => {
            if (source && canConfirm) onConfirm(source);
          },
          children: "I understand — start torrent"
        }
      )
    ] })
  ] }) });
}
function numberOrNull(value) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}
function trimmed(value) {
  return String(value || "").trim();
}
const TORRENT_SORT_OPTIONS = [
  { key: "seeders", label: "Seeders", defaultDirection: "desc" },
  { key: "size", label: "Size", defaultDirection: "desc" },
  { key: "quality", label: "Quality", defaultDirection: "desc" },
  { key: "provider", label: "Provider", defaultDirection: "asc" },
  { key: "name", label: "Name", defaultDirection: "asc" }
];
const SIZE_UNITS = {
  b: 1,
  kb: 1024,
  k: 1024,
  mb: 1024 ** 2,
  m: 1024 ** 2,
  gb: 1024 ** 3,
  g: 1024 ** 3,
  tb: 1024 ** 4,
  t: 1024 ** 4
};
function parseSizeLabelToBytes(value) {
  if (typeof value === "number") {
    return Number.isFinite(value) && value > 0 ? value : null;
  }
  const text = String(value ?? "").trim();
  if (!text) return null;
  const match = /(\d+(?:[.,]\d+)?)\s*(gib|mib|kib|tib|[kmgt]?b|[kmgt])\b/i.exec(text);
  if (!match) {
    const bare = Number(text);
    return Number.isFinite(bare) && bare > 0 ? bare : null;
  }
  const amount = Number(match[1].replace(",", "."));
  if (!Number.isFinite(amount) || amount <= 0) return null;
  const unit = match[2].toLowerCase().replace("i", "");
  const multiplier = SIZE_UNITS[unit] ?? 1;
  return amount * multiplier;
}
function formatBytesShort(bytes) {
  if (bytes == null || !Number.isFinite(bytes) || bytes <= 0) return "";
  if (bytes >= 1024 ** 3) return `${(bytes / 1024 ** 3).toFixed(bytes >= 10 * 1024 ** 3 ? 0 : 1)} GB`;
  if (bytes >= 1024 ** 2) return `${(bytes / 1024 ** 2).toFixed(0)} MB`;
  return `${(bytes / 1024).toFixed(0)} KB`;
}
function parseQualityRank(value) {
  const text = String(value ?? "").trim().toLowerCase();
  if (!text || text === "auto" || text === "unknown") return null;
  if (/(^|\D)(4k|uhd|2160)/.test(text)) return 2160;
  if (/(^|\D)(2k|1440)/.test(text)) return 1440;
  const match = /(\d{3,4})\s*p?/.exec(text);
  if (!match) return null;
  const height = Number(match[1]);
  return Number.isFinite(height) && height > 0 ? height : null;
}
function seederCountOf(source) {
  const raw = source == null ? void 0 : source.seeders;
  if (typeof raw === "number" && Number.isFinite(raw)) return raw;
  const peers = source == null ? void 0 : source.peers;
  if (typeof peers === "number" && Number.isFinite(peers)) return peers;
  return null;
}
const BATCH_PATTERN = /\b(batch|complete|season\s*pack|s\d{1,2}\s*complete)\b/i;
function isBatchRelease(source) {
  const range = String((source == null ? void 0 : source.episodeRange) ?? "").trim();
  if (/\d+\s*[-~–]\s*\d+/.test(range)) return true;
  if (BATCH_PATTERN.test(range)) return true;
  return BATCH_PATTERN.test(String((source == null ? void 0 : source.torrentTitle) ?? ""));
}
function torrentDisplayTitle(source) {
  return String((source == null ? void 0 : source.torrentTitle) ?? "").trim() || String((source == null ? void 0 : source.releaseGroup) ?? "").trim() || String((source == null ? void 0 : source.providerName) ?? (source == null ? void 0 : source.server) ?? (source == null ? void 0 : source.providerKey) ?? "").trim() || "Untitled release";
}
function compareNullableNumbers(a, b, direction) {
  if (a == null && b == null) return 0;
  if (a == null) return 1;
  if (b == null) return -1;
  return direction === "asc" ? a - b : b - a;
}
function compareStrings(a, b, direction) {
  const result = a.localeCompare(b, void 0, { numeric: true, sensitivity: "base" });
  return direction === "asc" ? result : -result;
}
function sortTorrentSources(sources, key, direction) {
  const decorated = sources.map((source, index) => ({
    source,
    index,
    seeders: seederCountOf(source),
    bytes: parseSizeLabelToBytes(source == null ? void 0 : source.fileSize),
    quality: parseQualityRank(source == null ? void 0 : source.quality),
    provider: String((source == null ? void 0 : source.providerName) ?? (source == null ? void 0 : source.server) ?? (source == null ? void 0 : source.providerKey) ?? ""),
    title: torrentDisplayTitle(source)
  }));
  decorated.sort((a, b) => {
    let primary = 0;
    switch (key) {
      case "seeders":
        primary = compareNullableNumbers(a.seeders, b.seeders, direction);
        break;
      case "size":
        primary = compareNullableNumbers(a.bytes, b.bytes, direction);
        break;
      case "quality":
        primary = compareNullableNumbers(a.quality, b.quality, direction);
        break;
      case "provider":
        primary = compareStrings(a.provider, b.provider, direction);
        break;
      case "name":
        primary = compareStrings(a.title, b.title, direction);
        break;
    }
    if (primary !== 0) return primary;
    if (key !== "seeders") {
      const bySeeders = compareNullableNumbers(a.seeders, b.seeders, "desc");
      if (bySeeders !== 0) return bySeeders;
    }
    if (key !== "size") {
      const bySize = compareNullableNumbers(a.bytes, b.bytes, "desc");
      if (bySize !== 0) return bySize;
    }
    return a.index - b.index;
  });
  return decorated.map((entry) => entry.source);
}
function seederHealth(seeders) {
  if (seeders == null) return "unknown";
  if (seeders <= 0) return "dead";
  if (seeders < 5) return "weak";
  if (seeders < 25) return "ok";
  return "strong";
}
const HEALTH_DOT = {
  strong: "bg-emerald-400",
  ok: "bg-emerald-500/70",
  weak: "bg-amber-400",
  dead: "bg-red-500",
  unknown: "bg-muted-foreground/40"
};
const HEALTH_TEXT = {
  strong: "text-emerald-400",
  ok: "text-emerald-400/80",
  weak: "text-amber-400",
  dead: "text-red-400",
  unknown: "text-muted-foreground"
};
function TorrentSourcePanel({
  sources,
  activeUrl,
  canPlayTorrent,
  onSelect
}) {
  const [sortKey, setSortKey] = reactExports.useState("seeders");
  const [direction, setDirection] = reactExports.useState("desc");
  const [query, setQuery] = reactExports.useState("");
  const [hideDead, setHideDead] = reactExports.useState(false);
  const [hideBatches, setHideBatches] = reactExports.useState(false);
  const [minQuality, setMinQuality] = reactExports.useState(0);
  const qualityTiers = reactExports.useMemo(() => {
    const tiers = /* @__PURE__ */ new Set();
    for (const source of sources) {
      const rank = parseQualityRank(source == null ? void 0 : source.quality);
      if (rank) tiers.add(rank);
    }
    return Array.from(tiers).sort((a, b) => b - a);
  }, [sources]);
  const filtered = reactExports.useMemo(() => {
    const needle = query.trim().toLowerCase();
    return sources.filter((source) => {
      if (hideDead && seederCountOf(source) === 0) return false;
      if (hideBatches && isBatchRelease(source)) return false;
      if (minQuality > 0) {
        const rank = parseQualityRank(source == null ? void 0 : source.quality);
        if (rank != null && rank < minQuality) return false;
      }
      if (!needle) return true;
      const haystack = [
        torrentDisplayTitle(source),
        source == null ? void 0 : source.providerName,
        source == null ? void 0 : source.releaseGroup,
        source == null ? void 0 : source.quality,
        source == null ? void 0 : source.fileFormat,
        source == null ? void 0 : source.episodeRange
      ].filter(Boolean).join(" ").toLowerCase();
      return haystack.includes(needle);
    });
  }, [sources, query, hideDead, hideBatches, minQuality]);
  const sorted = reactExports.useMemo(
    () => sortTorrentSources(filtered, sortKey, direction),
    [filtered, sortKey, direction]
  );
  const applySort = (key) => {
    var _a;
    if (key === sortKey) {
      setDirection((current) => current === "asc" ? "desc" : "asc");
      return;
    }
    setSortKey(key);
    setDirection(((_a = TORRENT_SORT_OPTIONS.find((option) => option.key === key)) == null ? void 0 : _a.defaultDirection) ?? "desc");
  };
  const filtersActive = hideDead || hideBatches || minQuality > 0 || query.trim().length > 0;
  if (sources.length === 0) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3 rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.03] p-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center justify-between gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Magnet, { className: "h-3.5 w-3.5 text-emerald-400" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold uppercase tracking-widest text-emerald-400", children: "Torrent releases" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full bg-white/5 px-2 py-0.5 text-[10px] text-muted-foreground", children: sorted.length === sources.length ? `${sources.length}` : `${sorted.length} of ${sources.length}` })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full sm:w-56", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "pointer-events-none absolute left-2.5 top-1/2 h-3 w-3 -translate-y-1/2 text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            value: query,
            onChange: (event) => setQuery(event.target.value),
            placeholder: "Filter releases, groups, codecs...",
            className: "h-8 rounded-lg border-white/10 bg-black/20 pl-7 pr-7 text-xs"
          }
        ),
        query && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => setQuery(""),
            className: "absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground",
            "aria-label": "Clear release filter",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-3 w-3" })
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-bold uppercase tracking-widest text-muted-foreground", children: "Sort" }),
      TORRENT_SORT_OPTIONS.map((option) => {
        const active = option.key === sortKey;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => applySort(option.key),
            className: `flex h-7 items-center gap-1 rounded-lg px-2.5 text-[11px] font-medium transition-all ${active ? "bg-foreground text-background" : "bg-white/5 text-muted-foreground hover:bg-white/10 hover:text-foreground"}`,
            title: active ? "Click again to reverse" : `Sort by ${option.label.toLowerCase()}`,
            children: [
              option.label,
              active && (direction === "desc" ? /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowDownWideNarrow, { className: "h-3 w-3" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpNarrowWide, { className: "h-3 w-3" }))
            ]
          },
          option.key
        );
      }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mx-1 h-4 w-px bg-white/10" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => setHideDead((value) => !value),
          className: `h-7 rounded-lg px-2.5 text-[11px] font-medium transition-all ${hideDead ? "bg-red-500/20 text-red-300" : "bg-white/5 text-muted-foreground hover:bg-white/10 hover:text-foreground"}`,
          title: "Hide releases the indexer reports as having no seeders",
          children: "Hide 0 seeders"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => setHideBatches((value) => !value),
          className: `h-7 rounded-lg px-2.5 text-[11px] font-medium transition-all ${hideBatches ? "bg-amber-500/20 text-amber-300" : "bg-white/5 text-muted-foreground hover:bg-white/10 hover:text-foreground"}`,
          title: "Hide season packs — they download in full even for one episode",
          children: "Hide batches"
        }
      ),
      qualityTiers.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "select",
        {
          value: minQuality,
          onChange: (event) => setMinQuality(Number(event.target.value)),
          className: "h-7 rounded-lg border border-white/10 bg-black/20 px-2 text-[11px] text-foreground outline-none",
          title: "Minimum resolution",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: 0, children: "Any quality" }),
            qualityTiers.map((tier) => /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: tier, children: [
              tier >= 2160 ? "4K" : `${tier}p`,
              "+"
            ] }, tier))
          ]
        }
      ),
      filtersActive && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => {
            setQuery("");
            setHideDead(false);
            setHideBatches(false);
            setMinQuality(0);
          },
          className: "h-7 rounded-lg px-2 text-[11px] text-muted-foreground underline-offset-2 hover:text-foreground hover:underline",
          children: "Reset"
        }
      )
    ] }),
    sorted.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-xl border border-dashed border-white/10 p-4 text-center text-[11px] text-muted-foreground", children: "No releases match these filters." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex max-h-[22rem] flex-col gap-1.5 overflow-y-auto pr-1", children: sorted.map((source, index) => {
      const seeders = seederCountOf(source);
      const health = seederHealth(seeders);
      const bytes = parseSizeLabelToBytes(source == null ? void 0 : source.fileSize);
      const sizeLabel = String((source == null ? void 0 : source.fileSize) ?? "").trim() || formatBytesShort(bytes);
      const batch = isBatchRelease(source);
      const isActive = Boolean(activeUrl && (source == null ? void 0 : source.url) === activeUrl);
      const title = torrentDisplayTitle(source);
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: () => onSelect(source),
          disabled: !canPlayTorrent,
          className: `group flex w-full flex-col gap-1 rounded-xl border px-3 py-2 text-left transition-all disabled:cursor-not-allowed disabled:opacity-50 ${isActive ? "border-emerald-400/60 bg-emerald-500/15" : "border-white/5 bg-white/[0.02] hover:border-emerald-500/30 hover:bg-emerald-500/10"}`,
          title: canPlayTorrent ? title : "Torrent playback needs the Tatakai desktop or mobile app",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `mt-[6px] h-1.5 w-1.5 shrink-0 rounded-full ${HEALTH_DOT[health]}` }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "min-w-0 flex-1 truncate font-mono text-[11px] leading-relaxed text-foreground", children: title }),
              isActive && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "shrink-0 rounded-full bg-emerald-400/20 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-emerald-300", children: "Playing" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-x-3 gap-y-1 pl-3.5 text-[10px] text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: `flex items-center gap-1 font-medium ${HEALTH_TEXT[health]}`, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-2.5 w-2.5" }),
                seeders == null ? "n/a" : seeders,
                " seed",
                typeof (source == null ? void 0 : source.leechers) === "number" ? ` · ${source.leechers} leech` : ""
              ] }),
              sizeLabel && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(HardDrive, { className: "h-2.5 w-2.5" }),
                sizeLabel
              ] }),
              (source == null ? void 0 : source.quality) && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground/70", children: source.quality }),
              (source == null ? void 0 : source.fileFormat) && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "uppercase", children: source.fileFormat }),
              (source == null ? void 0 : source.providerName) && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: source.providerName }),
              batch && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 rounded-full bg-amber-500/10 px-1.5 py-0.5 text-amber-400", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Layers, { className: "h-2.5 w-2.5" }),
                String((source == null ? void 0 : source.episodeRange) ?? "").trim() || "Batch"
              ] })
            ] })
          ]
        },
        `${(source == null ? void 0 : source.url) || (source == null ? void 0 : source.magnetLink) || "torrent"}-${index}`
      );
    }) }),
    !canPlayTorrent && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-amber-400", children: "Torrent playback needs the Tatakai desktop or mobile app — these releases can't be started in a web browser." })
  ] });
}
function formatBytes(value) {
  const bytes = Number(value ?? 0);
  if (!Number.isFinite(bytes) || bytes <= 0) return "0 MB";
  if (bytes >= 1024 ** 3) return `${(bytes / 1024 ** 3).toFixed(bytes >= 10 * 1024 ** 3 ? 0 : 2)} GB`;
  if (bytes >= 1024 ** 2) return `${(bytes / 1024 ** 2).toFixed(0)} MB`;
  return `${(bytes / 1024).toFixed(0)} KB`;
}
function formatRate(value) {
  const bytes = Number(value ?? 0);
  if (!Number.isFinite(bytes) || bytes <= 0) return "0 KB/s";
  const kb = bytes / 1024;
  if (kb < 1024) return `${kb.toFixed(kb >= 100 ? 0 : 1)} KB/s`;
  return `${(kb / 1024).toFixed(kb / 1024 >= 100 ? 0 : 1)} MB/s`;
}
function formatEta(value) {
  const seconds = Number(value ?? NaN);
  if (!Number.isFinite(seconds) || seconds <= 0) return "—";
  if (seconds > 86400 * 7) return "—";
  if (seconds < 60) return `${Math.round(seconds)}s`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ${Math.round(seconds % 60)}s`;
  const hours = Math.floor(minutes / 60);
  return `${hours}h ${minutes % 60}m`;
}
function SpeedGraph({
  series,
  className
}) {
  const width = 132;
  const height = 30;
  const path = reactExports.useMemo(() => {
    if (series.length < 2) return null;
    const peak = Math.max(...series, 1);
    const stepX = width / (series.length - 1);
    const points = series.map((value, index) => {
      const x = index * stepX;
      const y = height - Math.max(0, Math.min(1, value / peak)) * (height - 2) - 1;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    });
    return {
      line: `M${points.join(" L")}`,
      area: `M0,${height} L${points.join(" L")} L${width},${height} Z`
    };
  }, [series]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "svg",
    {
      width,
      height,
      viewBox: `0 0 ${width} ${height}`,
      className: cn("overflow-visible", className),
      "aria-hidden": "true",
      children: path ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: path.area, fill: "currentColor", opacity: 0.12 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: path.line, fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinejoin: "round" })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "0", y1: height - 1, x2: width, y2: height - 1, stroke: "currentColor", strokeWidth: 1, opacity: 0.2 })
    }
  );
}
function TorrentSessionPanel({
  sessionId,
  stats,
  progressPercent,
  verified,
  loading,
  error,
  downloadPath,
  optimizeStorage,
  onRepair,
  onStop
}) {
  var _a, _b, _c, _d, _e, _f, _g;
  const [expanded, setExpanded] = reactExports.useState(false);
  const [repairing, setRepairing] = reactExports.useState(false);
  const [copied, setCopied] = reactExports.useState(null);
  const [downSeries, setDownSeries] = reactExports.useState([]);
  const [upSeries, setUpSeries] = reactExports.useState([]);
  const lastSampleRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    if (!stats || lastSampleRef.current === stats) return;
    lastSampleRef.current = stats;
    const down = Math.max(0, Number(stats.downloadSpeed) || 0);
    const up = Math.max(0, Number(stats.uploadSpeed) || 0);
    setDownSeries((prev) => [...prev, down].slice(-40));
    setUpSeries((prev) => [...prev, up].slice(-40));
  }, [stats]);
  reactExports.useEffect(() => {
    setDownSeries([]);
    setUpSeries([]);
    lastSampleRef.current = null;
  }, [sessionId]);
  const copy = reactExports.useCallback(async (label, value) => {
    if (!value) return;
    try {
      await navigator.clipboard.writeText(value);
      setCopied(label);
      setTimeout(() => setCopied((current) => current === label ? null : current), 1600);
    } catch {
    }
  }, []);
  const handleRepair = reactExports.useCallback(async () => {
    setRepairing(true);
    try {
      await onRepair();
    } finally {
      setTimeout(() => setRepairing(false), 1200);
    }
  }, [onRepair]);
  const openFolder = reactExports.useCallback(() => {
    var _a2, _b2, _c2;
    const target = String(downloadPath || ((_a2 = stats == null ? void 0 : stats.storage) == null ? void 0 : _a2.root) || "").trim();
    if (!target) return;
    void ((_c2 = (_b2 = window.electron) == null ? void 0 : _b2.openPath) == null ? void 0 : _c2.call(_b2, target));
  }, [downloadPath, (_a = stats == null ? void 0 : stats.storage) == null ? void 0 : _a.root]);
  const downloaded = Number((stats == null ? void 0 : stats.downloaded) ?? 0);
  const totalLength = Number((stats == null ? void 0 : stats.length) ?? 0);
  const uploaded = Number((stats == null ? void 0 : stats.uploaded) ?? 0);
  const numFiles = Number((stats == null ? void 0 : stats.numFiles) ?? 0);
  const seeders = stats == null ? void 0 : stats.seeders;
  const leechers = stats == null ? void 0 : stats.leechers;
  const numPeers = stats == null ? void 0 : stats.numPeers;
  const done = Boolean(stats == null ? void 0 : stats.done);
  const ratio = Number((stats == null ? void 0 : stats.ratio) ?? 0);
  const stalledForMs = Number((stats == null ? void 0 : stats.stalledForMs) || 0);
  const isUnavailable = (stats == null ? void 0 : stats.availability) === "no_peers";
  const isStalled = !isUnavailable && !done && stalledForMs > 45e3 && Number((stats == null ? void 0 : stats.downloadSpeed) || 0) <= 0;
  const repairAgeMs = ((_b = stats == null ? void 0 : stats.repair) == null ? void 0 : _b.at) ? Date.now() - Number(stats.repair.at) : null;
  const showRepairBadge = !isUnavailable && repairAgeMs != null && repairAgeMs >= 0 && repairAgeMs < 12e4;
  const cacheBytes = Number(((_c = stats == null ? void 0 : stats.storage) == null ? void 0 : _c.totalBytes) ?? (Number.isFinite(stats == null ? void 0 : stats.storage) ? stats == null ? void 0 : stats.storage : NaN));
  const cacheMaxBytes = Number(((_d = stats == null ? void 0 : stats.storage) == null ? void 0 : _d.maxBytes) ?? NaN);
  const byteLabel = totalLength > 0 ? `${formatBytes(downloaded)} of ${formatBytes(totalLength)}` : formatBytes(downloaded);
  const peerLabel = numPeers == null ? "n/a" : String(numPeers);
  const infoHash = String((stats == null ? void 0 : stats.infoHash) || "");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: cn(
        "flex flex-col gap-3 rounded-2xl border p-3.5 transition-colors",
        isUnavailable ? "border-red-500/30 bg-red-500/[0.04]" : isStalled ? "border-amber-500/30 bg-amber-500/[0.04]" : "border-emerald-500/25 bg-emerald-500/[0.04]"
      ),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-emerald-400", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Radio, { className: cn("h-3 w-3", !done && "animate-pulse") }),
                "Torrent session"
              ] }),
              done && verified && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 rounded-full bg-emerald-400/15 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-emerald-300", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "h-2.5 w-2.5" }),
                " Verified"
              ] }),
              !verified && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full bg-amber-500/15 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-amber-300", children: "Seeking locked" }),
              showRepairBadge && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 rounded-full bg-amber-500/15 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-amber-300", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "h-2.5 w-2.5 animate-spin" }),
                " Repairing"
              ] }),
              isStalled && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 rounded-full bg-orange-500/15 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-orange-300", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "h-2.5 w-2.5" }),
                " Stalled ",
                Math.round(stalledForMs / 1e3),
                "s"
              ] }),
              isUnavailable && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 rounded-full bg-red-500/15 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-red-300", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "h-2.5 w-2.5" }),
                " No peers"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 truncate font-mono text-xs text-foreground", title: (stats == null ? void 0 : stats.name) || sessionId, children: (stats == null ? void 0 : stats.name) || (loading ? "Resolving release..." : sessionId) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => setExpanded((value) => !value),
              className: "flex h-7 shrink-0 items-center gap-1 rounded-lg bg-white/5 px-2 text-[10px] font-medium text-muted-foreground transition-colors hover:bg-white/10 hover:text-foreground",
              "aria-expanded": expanded,
              children: [
                expanded ? "Less" : "Details",
                /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: cn("h-3 w-3 transition-transform", expanded && "rotate-180") })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1.5 w-full overflow-hidden rounded-full bg-white/[0.07]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: cn(
                "h-full rounded-full transition-all duration-500",
                done ? "bg-emerald-400" : isUnavailable ? "bg-red-500/70" : "bg-emerald-500"
              ),
              style: { width: `${progressPercent}%` }
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-bold text-foreground", children: [
              progressPercent.toFixed(1),
              "%"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: byteLabel }),
            !done && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-2.5 w-2.5" }),
              formatEta(stats == null ? void 0 : stats.eta)
            ] }),
            done && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-emerald-400", children: "Download complete" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-2 sm:grid-cols-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2 rounded-xl bg-white/[0.03] px-2.5 py-2 text-emerald-400", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "h-2.5 w-2.5" }),
                " Down"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "truncate text-xs font-bold text-foreground", children: formatRate(stats == null ? void 0 : stats.downloadSpeed) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SpeedGraph, { series: downSeries, className: "hidden shrink-0 sm:block" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2 rounded-xl bg-white/[0.03] px-2.5 py-2 text-sky-400", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "h-2.5 w-2.5" }),
                " Up"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "truncate text-xs font-bold text-foreground", children: formatRate(stats == null ? void 0 : stats.uploadSpeed) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SpeedGraph, { series: upSeries, className: "hidden shrink-0 sm:block" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-2 rounded-xl bg-white/[0.03] px-2.5 py-2 sm:col-span-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-2.5 w-2.5" }),
              " Peers"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs font-bold text-foreground", children: [
              peerLabel,
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-1.5 text-[10px] font-normal text-muted-foreground", children: [
                seeders == null ? "n/a" : seeders,
                " seed · ",
                leechers == null ? "n/a" : leechers,
                " leech"
              ] })
            ] })
          ] })
        ] }),
        (isUnavailable || error) && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: cn("text-[10px]", isUnavailable ? "text-red-300" : "text-amber-300"), children: isUnavailable ? (stats == null ? void 0 : stats.availabilityMessage) || "This release has no visible swarm right now — try another one." : error }),
        expanded && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-x-4 gap-y-2 border-t border-white/5 pt-3 text-[10px] sm:grid-cols-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-muted-foreground", children: "Uploaded" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-medium text-foreground", children: [
              formatBytes(uploaded),
              ratio > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-1 text-muted-foreground", children: [
                "· ",
                ratio.toFixed(2),
                " ratio"
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-muted-foreground", children: "Files in release" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium text-foreground", children: numFiles > 0 ? numFiles : "—" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-muted-foreground", children: "Started" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium text-foreground", children: (stats == null ? void 0 : stats.startedAt) ? new Date(stats.startedAt).toLocaleTimeString() : "—" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-2 sm:col-span-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(HardDrive, { className: "h-2.5 w-2.5" }),
              " Cache on disk"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-medium text-foreground", children: [
              Number.isFinite(cacheBytes) ? formatBytes(cacheBytes) : "—",
              Number.isFinite(cacheMaxBytes) && cacheMaxBytes > 0 && // Cache-wide, not this torrent — the engine reports one budget
              // for every session it has ever cached.
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-1 text-muted-foreground", children: [
                "of ",
                formatBytes(cacheMaxBytes),
                " total"
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-muted-foreground", children: "Info hash" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: () => copy("hash", infoHash),
                disabled: !infoHash,
                className: "flex max-w-full items-center gap-1 font-mono text-[10px] text-foreground transition-colors hover:text-emerald-400 disabled:opacity-50",
                title: "Copy info hash",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: infoHash || "—" }),
                  copied === "hash" ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-2.5 w-2.5 shrink-0 text-emerald-400" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "h-2.5 w-2.5 shrink-0" })
                ]
              }
            )
          ] }),
          (downloadPath || ((_e = stats == null ? void 0 : stats.storage) == null ? void 0 : _e.root)) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-2 sm:col-span-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-muted-foreground", children: "Saved to" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate font-mono text-[10px] text-foreground", children: downloadPath || ((_f = stats == null ? void 0 : stats.storage) == null ? void 0 : _f.root) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => {
                    var _a2;
                    return copy("path", String(downloadPath || ((_a2 = stats == null ? void 0 : stats.storage) == null ? void 0 : _a2.root) || ""));
                  },
                  className: "shrink-0 text-muted-foreground transition-colors hover:text-foreground",
                  title: "Copy path",
                  children: copied === "path" ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-2.5 w-2.5 text-emerald-400" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "h-2.5 w-2.5" })
                }
              )
            ] })
          ] }),
          optimizeStorage && !done && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "col-span-2 text-[10px] text-amber-400/80 sm:col-span-3", children: "Storage optimization is on — stopping before this finishes deletes the partial file." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2 border-t border-white/5 pt-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              size: "sm",
              variant: "outline",
              onClick: handleRepair,
              disabled: repairing,
              className: "h-7 gap-1.5 rounded-lg border-white/10 px-2.5 text-[11px]",
              title: "Re-announce to the trackers and DHT to find more peers",
              children: [
                repairing ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-3 w-3 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "h-3 w-3" }),
                isUnavailable ? "Find peers" : "Repair"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              size: "sm",
              variant: "ghost",
              onClick: onStop,
              className: "h-7 gap-1.5 rounded-lg px-2.5 text-[11px] text-red-300 hover:bg-red-500/10 hover:text-red-200",
              title: "Stop the session and go back to the hosted streams",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Square, { className: "h-3 w-3" }),
                "Stop & return to streams"
              ]
            }
          ),
          (downloadPath || ((_g = stats == null ? void 0 : stats.storage) == null ? void 0 : _g.root)) && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              size: "sm",
              variant: "ghost",
              onClick: openFolder,
              className: "h-7 gap-1.5 rounded-lg px-2.5 text-[11px] text-muted-foreground hover:text-foreground",
              title: "Open the download folder",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(FolderOpen, { className: "h-3 w-3" }),
                "Open folder"
              ]
            }
          ),
          loading && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-auto flex items-center gap-1.5 text-[10px] text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-3 w-3 animate-spin" }),
            " Starting..."
          ] })
        ] })
      ]
    }
  );
}
function normalizeWatchLanguageKey(raw) {
  return raw.trim().toLowerCase().replace(/\s+/g, "-");
}
function formatWatchLanguageLabel(raw) {
  return raw.trim().split(/\s+/).map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(" ");
}
function SourceLanguageTabs({
  sources,
  activeLanguage,
  onLanguageChange
}) {
  const languageTabs = reactExports.useMemo(() => {
    const seen = /* @__PURE__ */ new Map();
    for (const src of sources) {
      const raw = src.language || src.audioLanguage;
      if (!raw) continue;
      const key = normalizeWatchLanguageKey(raw);
      if (key && !seen.has(key)) {
        seen.set(key, formatWatchLanguageLabel(raw));
      }
    }
    return Array.from(seen.entries()).map(([value, label]) => ({ value, label }));
  }, [sources]);
  if (languageTabs.length < 2) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1 flex-wrap mb-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        onClick: () => onLanguageChange("all"),
        className: cn(
          "px-3 py-1 rounded-full text-xs font-semibold transition-colors",
          activeLanguage === "all" ? "bg-primary text-primary-foreground" : "bg-white/5 text-muted-foreground hover:bg-white/10"
        ),
        children: "All"
      }
    ),
    languageTabs.map(({ value, label }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        onClick: () => onLanguageChange(value),
        className: cn(
          "px-3 py-1 rounded-full text-xs font-semibold transition-colors",
          activeLanguage === value ? "bg-primary text-primary-foreground" : "bg-white/5 text-muted-foreground hover:bg-white/10"
        ),
        children: label
      },
      value
    ))
  ] });
}
function SourceTypeBadge({ isM3U8, isEmbed, sourceType }) {
  if (isM3U8 || sourceType === "hls") {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-1.5 py-0.5 rounded text-[10px] font-bold bg-zinc-800 text-zinc-400", children: "HLS" });
  }
  if (isEmbed) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "span",
      {
        className: "px-1.5 py-0.5 rounded text-[10px] font-bold",
        style: {
          background: "color-mix(in srgb, var(--accent) 20%, transparent)",
          color: "var(--accent)"
        },
        children: "Embed"
      }
    );
  }
  if (sourceType === "torrent") {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-1.5 py-0.5 rounded text-[10px] font-bold bg-green-900/30 text-green-400", children: "Torrent" });
  }
  return null;
}
const PROVIDER_SOURCES_EXPIRED_KEY = "tatakai.provider.sources.expired.reason";
function markProviderSourcesExpired(reason = "unknown") {
  try {
    localStorage.setItem(PROVIDER_SOURCES_EXPIRED_KEY, String(reason));
  } catch {
  }
}
function toLocalFileUrl(filePath) {
  if (!filePath) return "";
  if (/^(https?:|blob:|data:)/i.test(filePath)) return filePath;
  if (filePath.startsWith("tatakai-media://")) return filePath;
  if (filePath.startsWith("file://")) {
    const isElectron2 = typeof window !== "undefined" && !!window.electron;
    if (!isElectron2) return filePath;
    const rawPath = filePath.replace(/^file:\/\/\//i, "").replace(/^file:\/\//i, "");
    const decoded = rawPath.replace(/ /g, "%20");
    return `tatakai-media:///${decoded}`;
  }
  const normalized = filePath.replace(/\\/g, "/");
  const encoded = normalized.replace(/ /g, "%20");
  const isElectron = typeof window !== "undefined" && !!window.electron;
  if (isElectron) {
    return /^[A-Za-z]:\//.test(normalized) ? `tatakai-media:///${encoded}` : `tatakai-media://${encoded}`;
  }
  return /^[A-Za-z]:\//.test(normalized) ? `file:///${encoded}` : normalized.startsWith("/") ? `file://${encoded}` : `file:///${encoded}`;
}
function joinLocalPath(root, child) {
  if (!child) return root;
  const separator = root.includes("\\") ? "\\" : "/";
  return `${root.replace(/[\\/]+$/g, "")}${separator}${String(child).replace(/^[\\/]+/g, "")}`;
}
const NEBULA_KEY = "nebula";
function isNebulaServer(serverName) {
  const name = String(serverName || "").trim().toLowerCase();
  return name === NEBULA_KEY || name.startsWith(`${NEBULA_KEY}-`) || name === "justanime" || name.startsWith("justanime-");
}
function WatchPage() {
  var _a, _b, _c, _d, _e, _f, _g, _h;
  const { episodeId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const decodedEpisodeId = reactExports.useMemo(() => {
    if (!episodeId) return "";
    const decoded = decodeURIComponent(episodeId);
    if (decoded.includes("?ep=")) {
      const [animeSlug, queryPart] = decoded.split("?ep=");
      return `${animeSlug}?ep=${queryPart}`;
    }
    return decoded;
  }, [episodeId]);
  const { user } = useAuth();
  const { settings } = useVideoSettings();
  const isNative = useIsNativeApp();
  const isDesktop = useIsDesktopApp();
  const isMobileApp = useIsMobileApp();
  useIsMobile();
  const torrentServiceAvailable = hasTorrentService();
  const queryClient = useQueryClient();
  const isDeveloperMode = reactExports.useMemo(() => {
    try {
      if (!Capacitor.isNativePlatform()) return false;
      const saved = localStorage.getItem("tatakai_mobile_config");
      if (!saved) return false;
      const config = JSON.parse(saved);
      return (config == null ? void 0 : config.devMode) === true;
    } catch {
      return false;
    }
  }, []);
  const isOfflineMode = reactExports.useMemo(() => {
    const params = new URLSearchParams(location.search);
    return params.get("offline") === "true";
  }, [location.search]);
  const offlinePath = reactExports.useMemo(() => {
    const params = new URLSearchParams(location.search);
    return params.get("path") || "";
  }, [location.search]);
  const mobileOfflinePath = reactExports.useMemo(() => {
    const params = new URLSearchParams(location.search);
    return params.get("mobilePath") || "";
  }, [location.search]);
  const mobileOfflineMetadata = reactExports.useMemo(() => {
    const params = new URLSearchParams(location.search);
    return {
      title: params.get("title") || "Downloaded anime",
      episodeTitle: params.get("episodeTitle") || "",
      episodeNumber: Number(params.get("episode") || 0),
      poster: params.get("poster") || ""
    };
  }, [location.search]);
  const initialSeekSeconds = reactExports.useMemo(() => {
    try {
      const params = new URLSearchParams(location.search);
      const t = params.get("t");
      if (!t) return void 0;
      const n = Number(t);
      return Number.isFinite(n) && n > 0 ? Math.floor(n) : void 0;
    } catch {
      return void 0;
    }
  }, [location.search]);
  const torrentSessionId = reactExports.useMemo(() => {
    const params = new URLSearchParams(location.search);
    return params.get("sessionId") || "";
  }, [location.search]);
  const optimizeTorrentStorage = reactExports.useMemo(() => {
    try {
      const raw = localStorage.getItem("tatakai_optimize_torrent_storage_v1");
      return raw == null ? true : raw === "true";
    } catch {
      return true;
    }
  }, []);
  const [pendingTorrentSource, setPendingTorrentSource] = reactExports.useState(null);
  const [torrentDownloadPath, setTorrentDownloadPath] = reactExports.useState("");
  reactExports.useEffect(() => {
    if (!pendingTorrentSource || torrentDownloadPath) return;
    let cancelled = false;
    void (async () => {
      var _a2, _b2;
      try {
        const paths = await ((_b2 = (_a2 = window.tatakaiRuntime) == null ? void 0 : _a2.getTorrentStoragePaths) == null ? void 0 : _b2.call(_a2));
        const resolved = String((paths == null ? void 0 : paths.torrentPath) || (paths == null ? void 0 : paths.cachePath) || "").trim();
        if (!cancelled && resolved) setTorrentDownloadPath(resolved);
      } catch {
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [pendingTorrentSource, torrentDownloadPath]);
  const [torrentPlaybackSource, setTorrentPlaybackSource] = reactExports.useState(null);
  const [debridPlaybackSource, setDebridPlaybackSource] = reactExports.useState(null);
  const [debridPlaybackLoading, setDebridPlaybackLoading] = reactExports.useState(false);
  const [torrentPlaybackLoading, setTorrentPlaybackLoading] = reactExports.useState(false);
  const [torrentPlaybackError, setTorrentPlaybackError] = reactExports.useState(null);
  const [torrentLiveStats, setTorrentLiveStats] = reactExports.useState(null);
  const [torrentRetryTrigger, setTorrentRetryTrigger] = reactExports.useState(0);
  const [autoRepairCount, setAutoRepairCount] = reactExports.useState(0);
  const torrentCompletionHandledRef = reactExports.useRef(false);
  const lastPlaybackTimeRef = reactExports.useRef(0);
  const debridResolveGenerationRef = reactExports.useRef(0);
  const leaveDebridPlayback = reactExports.useCallback(() => {
    debridResolveGenerationRef.current += 1;
    setDebridPlaybackSource(null);
    setDebridPlaybackLoading(false);
  }, []);
  reactExports.useEffect(() => {
    leaveDebridPlayback();
  }, [decodedEpisodeId, leaveDebridPlayback]);
  reactExports.useEffect(() => () => {
    debridResolveGenerationRef.current += 1;
  }, []);
  reactExports.useCallback((value) => {
    if (!Number.isFinite(value || 0) || (value || 0) <= 0) return "0 KB/s";
    const kb = (value || 0) / 1024;
    if (kb < 1024) return `${kb.toFixed(kb >= 100 ? 0 : 1)} KB/s`;
    const mb = kb / 1024;
    return `${mb.toFixed(mb >= 100 ? 0 : 1)} MB/s`;
  }, []);
  reactExports.useCallback((value) => {
    const bytes = Number(value || 0);
    if (!Number.isFinite(bytes) || bytes <= 0) return "0 MB";
    const mb = bytes / 1024 / 1024;
    if (mb < 1024) return `${mb.toFixed(mb >= 100 ? 0 : 1)} MB`;
    const gb = mb / 1024;
    return `${gb.toFixed(gb >= 100 ? 0 : 1)} GB`;
  }, []);
  const torrentProgressPercent = reactExports.useMemo(() => {
    const raw = Number((torrentLiveStats == null ? void 0 : torrentLiveStats.progress) ?? 0);
    if (!Number.isFinite(raw)) return 0;
    return Math.max(0, Math.min(100, raw));
  }, [torrentLiveStats == null ? void 0 : torrentLiveStats.progress]);
  const leaveTorrentSession = reactExports.useCallback(() => {
    const runtime = window.tatakaiRuntime;
    if (torrentSessionId && typeof (runtime == null ? void 0 : runtime.stopTorrentSession) === "function") {
      const keepCompletedFile = Boolean((torrentLiveStats == null ? void 0 : torrentLiveStats.done) || torrentProgressPercent >= 100);
      const destroyStore = Boolean(optimizeTorrentStorage && !keepCompletedFile);
      void runtime.stopTorrentSession(torrentSessionId, { destroyStore }).catch(() => {
      });
    }
    setTorrentPlaybackSource(null);
    setTorrentPlaybackLoading(false);
    setTorrentPlaybackError(null);
    setTorrentLiveStats(null);
    const params = new URLSearchParams(location.search);
    if (params.has("sessionId")) {
      params.delete("sessionId");
      const query = params.toString();
      navigate(query ? `${location.pathname}?${query}` : location.pathname, { replace: true });
    }
  }, [
    torrentSessionId,
    torrentLiveStats == null ? void 0 : torrentLiveStats.done,
    torrentProgressPercent,
    optimizeTorrentStorage,
    location.search,
    location.pathname,
    navigate
  ]);
  const playTorrentSource = reactExports.useCallback(async (source) => {
    var _a2;
    const magnet = String((source == null ? void 0 : source.magnetLink) || (source == null ? void 0 : source.url) || "");
    if (!/^magnet:/i.test(magnet)) {
      setTorrentPlaybackError("This torrent has no magnet link to start from.");
      return;
    }
    const debridProvider = debridOrchestrator.getActiveProviderName();
    if (debridProvider) {
      const generation = ++debridResolveGenerationRef.current;
      leaveTorrentSession();
      pendingPlaybackCommitRef.current = true;
      setCommittedPlaybackSource(null);
      setCommittedPlaybackHeaders(null);
      setLockedSourceUrl(null);
      setDebridPlaybackSource(null);
      setDebridPlaybackLoading(true);
      setTorrentPlaybackError(null);
      const filenameHint = String((source == null ? void 0 : source.torrentTitle) || (source == null ? void 0 : source.title) || (source == null ? void 0 : source.name) || "");
      const episodeNumber = Number(source == null ? void 0 : source.episodeNumber) || void 0;
      try {
        const aborter = new AbortController();
        const genAtStart = generation;
        const onAbort = () => aborter.abort();
        (_a2 = debridResolveGenerationRef.currentAbort) == null ? void 0 : _a2.abort();
        debridResolveGenerationRef.currentAbort = aborter;
        const resolvedUrl = await debridOrchestrator.resolveMagnetToStream(magnet, {
          episodeNumber,
          filenameHint,
          signal: aborter.signal,
          onProgress: (state, progress) => {
            if (genAtStart !== debridResolveGenerationRef.current) return;
            const pct = typeof progress === "number" && Number.isFinite(progress) && progress > 0 ? ` ${Math.round(progress)}%` : "";
            setTorrentPlaybackError(`Preparing via ${debridProvider === "torbox" ? "TorBox" : "Real-Debrid"} (${state}${pct})…`);
          }
        });
        if (generation !== debridResolveGenerationRef.current) return;
        setTorrentPlaybackError(null);
        setDebridPlaybackSource({
          id: magnet,
          url: resolvedUrl,
          mode: "debrid",
          quality: source == null ? void 0 : source.quality,
          sourceType: "debrid",
          providerName: debridProvider === "torbox" ? "TorBox" : "Real-Debrid",
          providerKey: debridProvider,
          isEmbed: false,
          isM3U8: /\.m3u8(?:$|[?#/])/i.test(resolvedUrl),
          filenameHint,
          episodeNumber
        });
      } catch (error) {
        if (generation !== debridResolveGenerationRef.current) return;
        const message = (error == null ? void 0 : error.message) || "Could not resolve this release with the selected debrid service.";
        ue.error(message);
      } finally {
        if (generation === debridResolveGenerationRef.current) {
          setDebridPlaybackLoading(false);
        }
      }
      return;
    }
    leaveDebridPlayback();
    const runtime = window.tatakaiRuntime;
    if (!torrentServiceAvailable || typeof (runtime == null ? void 0 : runtime.startTorrentSession) !== "function") {
      setTorrentPlaybackError("Torrent playback is unavailable in this app build.");
      return;
    }
    setTorrentPlaybackLoading(true);
    setTorrentPlaybackError(
      // Indexer seeder counts are frequently stale, so a 0 is worth trying and
      // worth warning about rather than refusing outright.
      Number((source == null ? void 0 : source.seeders) ?? 0) === 0 ? "No seeders reported for this release — trying anyway..." : "Starting torrent..."
    );
    setAutoRepairCount(0);
    pendingPlaybackCommitRef.current = true;
    setCommittedPlaybackSource(null);
    setCommittedPlaybackHeaders(null);
    setLockedSourceUrl(null);
    setTorrentPlaybackSource(null);
    setTorrentLiveStats(null);
    try {
      const started = await runtime.startTorrentSession(magnet, {
        magnet,
        autoSelectLargest: true,
        optimizeStorage: optimizeTorrentStorage
      });
      if (started == null ? void 0 : started.sessionId) {
        const params = new URLSearchParams(location.search);
        params.set("sessionId", started.sessionId);
        navigate(`${location.pathname}?${params.toString()}`, { replace: true });
        return;
      }
      setTorrentPlaybackLoading(false);
      setTorrentPlaybackError(String((started == null ? void 0 : started.error) || "Could not start this torrent."));
    } catch (err) {
      setTorrentPlaybackLoading(false);
      setTorrentPlaybackError((err == null ? void 0 : err.message) || "Could not start this torrent.");
    }
  }, [torrentServiceAvailable, optimizeTorrentStorage, location.search, location.pathname, navigate, leaveTorrentSession, leaveDebridPlayback]);
  const torrentVerified = Boolean(torrentSessionId && (torrentLiveStats == null ? void 0 : torrentLiveStats.done) === true && (torrentLiveStats == null ? void 0 : torrentLiveStats.verified) !== false);
  const torrentTimelineLocked = Boolean(torrentSessionId && !torrentVerified);
  const torrentTakeoverActive = Boolean(
    torrentSessionId || torrentPlaybackLoading || torrentPlaybackSource
  );
  const debridTakeoverActive = debridPlaybackLoading || Boolean(debridPlaybackSource);
  const playbackTakeoverActive = torrentTakeoverActive || debridTakeoverActive;
  reactExports.useEffect(() => {
    let cancelled = false;
    const run = async () => {
      var _a2, _b2, _c2, _d2;
      if (!torrentServiceAvailable || !torrentSessionId || !((_a2 = window.tatakaiRuntime) == null ? void 0 : _a2.getTorrentStreamUrl)) {
        setTorrentPlaybackSource(null);
        setTorrentPlaybackLoading(false);
        setTorrentPlaybackError(null);
        setTorrentLiveStats(null);
        return;
      }
      setTorrentPlaybackLoading(true);
      setTorrentPlaybackError(null);
      try {
        const stream = await window.tatakaiRuntime.getTorrentStreamUrl(torrentSessionId);
        if (cancelled) return;
        if (!(stream == null ? void 0 : stream.success) || !stream.url) {
          if ((stream == null ? void 0 : stream.error) === "metadata_not_ready") {
            setTorrentPlaybackError("Resolving torrent metadata...");
            setTimeout(() => {
              if (!cancelled) setTorrentRetryTrigger((prev) => prev + 1);
            }, 2e3);
          } else if ((stream == null ? void 0 : stream.error) === "session_not_found") {
            const history = getLocalTorrentSessionHistory();
            const session = history.find((s) => s.sessionId === torrentSessionId);
            const sessionStopped = Boolean(session && session.status !== "active");
            if (sessionStopped) {
              setTorrentPlaybackError("Torrent session stopped.");
              return;
            }
            if ((session == null ? void 0 : session.infoHash) && ((_b2 = window.tatakaiRuntime) == null ? void 0 : _b2.startTorrentSession)) {
              setTorrentPlaybackError("Reconnecting to torrent session...");
              try {
                const restart = await window.tatakaiRuntime.startTorrentSession(session.infoHash, {
                  fileIndex: session.fileIndex,
                  autoSelectLargest: session.fileIndex == null
                });
                if ((restart == null ? void 0 : restart.sessionId) && restart.sessionId !== torrentSessionId) {
                  const params = new URLSearchParams(location.search);
                  params.set("sessionId", restart.sessionId);
                  navigate(`${location.pathname}?${params.toString()}`, { replace: true });
                }
                if (restart == null ? void 0 : restart.success) {
                  setTorrentRetryTrigger((prev) => prev + 1);
                  return;
                }
                if ((restart == null ? void 0 : restart.retryable) || (restart == null ? void 0 : restart.error) === "metadata_timeout" || (restart == null ? void 0 : restart.error) === "metadata_files_pending" || (restart == null ? void 0 : restart.error) === "metadata_pending") {
                  setTorrentPlaybackError("Resolving torrent metadata...");
                  setTimeout(() => {
                    if (!cancelled) setTorrentRetryTrigger((prev) => prev + 1);
                  }, 2500);
                  return;
                }
              } catch (e) {
                console.error("Failed to auto-restart torrent session:", e);
              }
            }
            setTorrentPlaybackError("Connecting to torrent session...");
            setTimeout(() => {
              if (!cancelled) setTorrentRetryTrigger((prev) => prev + 1);
            }, 1500);
          } else if ((stream == null ? void 0 : stream.error) === "prebuffer_timeout") {
            setTorrentPlaybackError("Buffering taking longer than expected. Please wait...");
            setTimeout(() => {
              if (!cancelled) setTorrentRetryTrigger((prev) => prev + 1);
            }, 2e3);
          } else if ((stream == null ? void 0 : stream.error) === "transcode_not_ready") {
            setTorrentPlaybackError("Preparing video stream...");
            setTimeout(() => {
              if (!cancelled) setTorrentRetryTrigger((prev) => prev + 1);
            }, 3e3);
          } else if ((stream == null ? void 0 : stream.error) === "transcode_timeout") {
            setTorrentPlaybackError("Stream preparation timed out. Retrying...");
            setTimeout(() => {
              if (!cancelled) setTorrentRetryTrigger((prev) => prev + 1);
            }, 3e3);
          } else {
            if (autoRepairCount < 8) {
              setAutoRepairCount((prev) => prev + 1);
              setTorrentPlaybackError(`Stream connection failed (${(stream == null ? void 0 : stream.error) || "unknown"}). Retrying...`);
              setTimeout(() => {
                if (!cancelled) setTorrentRetryTrigger((prev) => prev + 1);
              }, 1500);
              return;
            }
            setTorrentPlaybackError(String((stream == null ? void 0 : stream.error) || "Failed to resolve torrent stream"));
          }
          return;
        }
        const streamUrl = String(stream.url);
        if (Number.isFinite(Number(stream.fileIndex))) {
          window.currentFileIndex = Number(stream.fileIndex);
        }
        setTorrentPlaybackSource({
          id: torrentSessionId,
          url: streamUrl,
          mode: "torrent",
          sourceType: "torrent",
          providerName: "Torrent session",
          providerKey: "torrent-session",
          isEmbed: false,
          // When the runtime returns a remuxed HLS manifest, let the player auto-detect HLS.
          // Mode detection also checks `url.includes('.m3u8')`, but this keeps it explicit.
          isM3U8: Boolean(stream.isM3U8)
        });
        setTorrentLiveStats((current) => ({
          ...current || {},
          sessionId: torrentSessionId,
          name: stream.name || (current == null ? void 0 : current.name),
          fileName: stream.name || (current == null ? void 0 : current.fileName),
          fileIndex: stream.fileIndex ?? (current == null ? void 0 : current.fileIndex),
          infoHash: stream.infoHash || (current == null ? void 0 : current.infoHash),
          rawUrl: stream.rawUrl || (current == null ? void 0 : current.rawUrl)
        }));
      } catch (err) {
        if (!cancelled) {
          if (autoRepairCount < 3 && (((_c2 = err == null ? void 0 : err.message) == null ? void 0 : _c2.includes("resolve")) || ((_d2 = err == null ? void 0 : err.message) == null ? void 0 : _d2.includes("timeout")))) {
            setAutoRepairCount((prev) => prev + 1);
            setTorrentPlaybackError(`Stream unstable. Auto-repair attempt ${autoRepairCount + 1}/3...`);
            setTimeout(() => {
              if (!cancelled) setTorrentRetryTrigger((prev) => prev + 1);
            }, 1500);
            return;
          }
          setTorrentPlaybackError((err == null ? void 0 : err.message) || "Failed to resolve torrent stream");
          setTorrentLiveStats((current) => ({
            ...current || {},
            sessionId: torrentSessionId,
            error: (err == null ? void 0 : err.message) || "Failed to resolve torrent stream"
          }));
        }
      } finally {
        if (!cancelled) {
          setTorrentPlaybackLoading(false);
        }
      }
    };
    void run();
    return () => {
      cancelled = true;
    };
  }, [torrentServiceAvailable, torrentSessionId, torrentRetryTrigger]);
  reactExports.useEffect(() => {
    var _a2, _b2;
    if (!torrentServiceAvailable || !torrentSessionId || !window.tatakaiRuntime) {
      return;
    }
    let cancelled = false;
    const runtime = window.tatakaiRuntime;
    const stopMetadataReady = (_a2 = runtime.onTorrentMetadataReady) == null ? void 0 : _a2.call(runtime, (data) => {
      if ((data == null ? void 0 : data.sessionId) === torrentSessionId) {
        setTorrentRetryTrigger((prev) => prev + 1);
        ue.success("Torrent metadata resolved! Starting stream...");
      }
    });
    const refreshTorrentStats = async () => {
      var _a3;
      try {
        const stats = await ((_a3 = runtime.getTorrentStats) == null ? void 0 : _a3.call(runtime, torrentSessionId));
        if (!cancelled && (stats == null ? void 0 : stats.success)) {
          setTorrentLiveStats((current) => ({
            ...current || {},
            ...stats,
            sessionId: torrentSessionId
          }));
        }
      } catch {
      }
    };
    const stopProgress = (_b2 = runtime.onTorrentProgress) == null ? void 0 : _b2.call(runtime, (stats) => {
      var _a3, _b3;
      if (cancelled || (stats == null ? void 0 : stats.sessionId) !== torrentSessionId) return;
      setTorrentLiveStats((current) => ({
        ...current || {},
        ...stats,
        sessionId: torrentSessionId
      }));
      if ((stats == null ? void 0 : stats.availability) === "no_peers") {
        setTorrentPlaybackError(stats.availabilityMessage || "No peers or seeders found. Try another torrent release.");
        return;
      }
      const transcodeStatus = String(((_a3 = stats == null ? void 0 : stats.transcode) == null ? void 0 : _a3.status) || "").toLowerCase();
      const transcodePercent = (_b3 = stats == null ? void 0 : stats.transcode) == null ? void 0 : _b3.percent;
      if (transcodeStatus === "running") {
        const pctText = Number.isFinite(transcodePercent) ? ` (${Math.max(0, Math.min(99, Math.round(transcodePercent)))}%)` : "";
        setTorrentPlaybackError(`Preparing multi-audio stream${pctText}...`);
      } else if (transcodeStatus === "ready") {
        setTorrentPlaybackError((current) => current && current.toLowerCase().includes("preparing multi-audio stream") ? null : current);
      } else if (transcodeStatus === "error") {
        setTorrentPlaybackError("Multi-audio stream preparation failed. Retrying...");
      }
    });
    void refreshTorrentStats();
    const interval = window.setInterval(refreshTorrentStats, 5e3);
    return () => {
      cancelled = true;
      window.clearInterval(interval);
      stopProgress == null ? void 0 : stopProgress();
      stopMetadataReady == null ? void 0 : stopMetadataReady();
    };
  }, [torrentServiceAvailable, torrentSessionId]);
  reactExports.useEffect(() => {
    if (!torrentSessionId) return;
    const handleTorrentServiceRestarted = () => {
      setTorrentPlaybackSource(null);
      setTorrentLiveStats((current) => ({
        ...current || {},
        done: false,
        verified: false
      }));
      setTorrentPlaybackError("Torrent service restarted. Reconnecting...");
      setTorrentRetryTrigger((prev) => prev + 1);
    };
    window.addEventListener("tatakai-torrent-service-restarted", handleTorrentServiceRestarted);
    return () => window.removeEventListener("tatakai-torrent-service-restarted", handleTorrentServiceRestarted);
  }, [torrentSessionId]);
  reactExports.useEffect(() => {
    if (!torrentServiceAvailable || !torrentSessionId) return;
    if (!(torrentLiveStats == null ? void 0 : torrentLiveStats.done)) {
      torrentCompletionHandledRef.current = false;
      return;
    }
    if (torrentCompletionHandledRef.current) return;
    torrentCompletionHandledRef.current = true;
    const runtime = window.tatakaiRuntime;
    const handleTorrentCompleted = async () => {
      try {
        console.log("[WatchPage] Torrent complete — disconnecting peers to stop swarm activity");
        try {
          if (runtime == null ? void 0 : runtime.disconnectTorrentPeers) {
            await runtime.disconnectTorrentPeers(torrentSessionId);
            console.log("[WatchPage] Torrent peers disconnected after completion.");
          } else {
            console.warn("[WatchPage] disconnectTorrentPeers method not available on runtime.");
          }
        } catch (err) {
          console.warn("[WatchPage] Failed to disconnect torrent peers:", err == null ? void 0 : err.message);
        }
        setTorrentPlaybackError(null);
        try {
          updateLocalTorrentSessionHistory(torrentSessionId, {
            status: "completed",
            progress: 100,
            endedAt: (/* @__PURE__ */ new Date()).toISOString(),
            updatedAt: (/* @__PURE__ */ new Date()).toISOString()
          });
        } catch {
        }
        setTimeout(() => {
          setTorrentRetryTrigger((prev) => prev + 1);
        }, 500);
        ue.success("Download complete — playing from local file");
      } catch (err) {
        console.error("[WatchPage] Failed to handle torrent completion:", err);
      }
    };
    void handleTorrentCompleted();
  }, [torrentServiceAvailable, torrentSessionId, torrentLiveStats == null ? void 0 : torrentLiveStats.done]);
  const animeId = reactExports.useMemo(() => {
    if (!decodedEpisodeId) return "";
    return decodedEpisodeId.split("?")[0];
  }, [decodedEpisodeId]);
  const [category, setCategory] = reactExports.useState(() => {
    const savedHistory = getLocalContinueWatching();
    const saved = savedHistory.find((h) => h.episodeId === decodeURIComponent(episodeId || ""));
    return (saved == null ? void 0 : saved.category) || "sub";
  });
  const [selectedServerIndex, setSelectedServerIndex] = reactExports.useState(-1);
  const [selectedLangCode, setSelectedLangCode] = reactExports.useState(() => {
    const savedHistory = getLocalContinueWatching();
    const saved = savedHistory.find((h) => h.episodeId === decodeURIComponent(episodeId || ""));
    return (saved == null ? void 0 : saved.languageCode) || null;
  });
  const [selectedProviderServerKey, setSelectedProviderServerKey] = reactExports.useState(null);
  const [preferredServerName, setPreferredServerName] = reactExports.useState(() => {
    const storedPreferred = getPreferredServer(animeId);
    if (storedPreferred) return storedPreferred;
    const savedHistory = getLocalContinueWatching();
    const saved = savedHistory.find((h) => h.episodeId === decodeURIComponent(episodeId || ""));
    return (saved == null ? void 0 : saved.serverName) || null;
  });
  const [failedServers, setFailedServers] = reactExports.useState(/* @__PURE__ */ new Set());
  const [showReviewPopup, setShowReviewPopup] = reactExports.useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = reactExports.useState(false);
  const [offlineSources, setOfflineSources] = reactExports.useState([]);
  const [offlineManifest, setOfflineManifest] = reactExports.useState(null);
  const [offlineSubtitles, setOfflineSubtitles] = reactExports.useState([]);
  const [dubProfile, setDubProfile] = reactExports.useState(() => {
    try {
      return localStorage.getItem("watch-dub-quality-profile") || "balanced";
    } catch {
      return "balanced";
    }
  });
  const [showSourceDebug, setShowSourceDebug] = reactExports.useState(false);
  const [activeSourceLanguage, setActiveSourceLanguage] = reactExports.useState("all");
  const [refererRetryIndex, setRefererRetryIndex] = reactExports.useState(0);
  const [sourceReady, setSourceReady] = reactExports.useState(true);
  const [sourcePreflightError, setSourcePreflightError] = reactExports.useState(null);
  const [newProviderCount, setNewProviderCount] = reactExports.useState(0);
  const [providerFeedUpdatedAt, setProviderFeedUpdatedAt] = reactExports.useState(null);
  const [lockedSourceUrl, setLockedSourceUrl] = reactExports.useState(null);
  const [preferredSourceUrl, setPreferredSourceUrl] = reactExports.useState(null);
  const [blockedSourceUrls, setBlockedSourceUrls] = reactExports.useState({});
  const [committedPlaybackSource, setCommittedPlaybackSource] = reactExports.useState(null);
  const [committedPlaybackHeaders, setCommittedPlaybackHeaders] = reactExports.useState(null);
  const previousProviderCountRef = reactExports.useRef(null);
  const selectedServerNameRef = reactExports.useRef(null);
  const pendingPlaybackCommitRef = reactExports.useRef(true);
  const failoverTimeoutRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    let active = true;
    void __vitePreload(async () => {
      const { setWatchActiveBridge } = await import("./securityBridge.ksCfmINx.js");
      return { setWatchActiveBridge };
    }, true ? __vite__mapDeps([0,1,2]) : void 0).then(({ setWatchActiveBridge }) => {
      if (active) setWatchActiveBridge(true);
    }).catch(() => void 0);
    return () => {
      active = false;
      void __vitePreload(async () => {
        const { setWatchActiveBridge } = await import("./securityBridge.ksCfmINx.js");
        return { setWatchActiveBridge };
      }, true ? __vite__mapDeps([0,1,2]) : void 0).then(({ setWatchActiveBridge }) => {
        setWatchActiveBridge(false);
      }).catch(() => void 0);
    };
  }, []);
  reactExports.useEffect(() => {
    if (!isDeveloperMode && showSourceDebug) {
      setShowSourceDebug(false);
    }
  }, [isDeveloperMode, showSourceDebug]);
  const { data: serversData, isLoading: loadingServers } = useEpisodeServers(isOfflineMode ? "" : decodedEpisodeId);
  const isGenericTorrent = animeId.startsWith("torrent-") || animeId.startsWith("generic-");
  const isLocalOfflineEpisode = isOfflineMode || animeId.startsWith("local-") || animeId.startsWith("auto-") || animeId.startsWith("imported-");
  const skipApiCalls = isGenericTorrent || isLocalOfflineEpisode;
  const { data: animeData } = useAnimeInfo(!skipApiCalls ? animeId : "");
  const { data: episodesData } = useEpisodes(!skipApiCalls ? animeId : "");
  reactExports.useEffect(() => {
    var _a2, _b2;
    if (torrentSessionId && (torrentLiveStats == null ? void 0 : torrentLiveStats.name)) {
      const history = getLocalTorrentSessionHistory();
      const existing = history.find((entry) => entry.sessionId === torrentSessionId);
      const infoHash = torrentLiveStats.infoHash || (existing == null ? void 0 : existing.infoHash);
      const payload = {
        infoHash,
        torrentName: torrentLiveStats.name,
        animeId,
        animeName: (_a2 = animeData == null ? void 0 : animeData.info) == null ? void 0 : _a2.name,
        animePoster: (_b2 = animeData == null ? void 0 : animeData.info) == null ? void 0 : _b2.poster,
        episodeId: decodedEpisodeId,
        fileName: torrentLiveStats.fileName || torrentLiveStats.name,
        fileIndex: torrentLiveStats.fileIndex,
        status: "active",
        progress: torrentLiveStats.progress,
        seeders: torrentLiveStats.seeders,
        leechers: torrentLiveStats.leechers
      };
      if (existing) {
        updateLocalTorrentSessionHistory(torrentSessionId, payload);
      } else {
        upsertLocalTorrentSessionHistory({
          sessionId: torrentSessionId,
          ...payload
        });
      }
    }
  }, [torrentSessionId, torrentLiveStats, animeData, animeId, decodedEpisodeId]);
  const { data: viewCount } = useAnimeViewCount(animeId);
  useViewTracker(animeId, decodedEpisodeId);
  reactExports.useEffect(() => {
    if (isOfflineMode) {
      setOfflineSources([]);
      setOfflineManifest(null);
      setOfflineSubtitles([]);
    }
  }, [isOfflineMode, offlinePath, mobileOfflinePath, decodedEpisodeId]);
  reactExports.useEffect(() => {
    if (isOfflineMode && (offlinePath || mobileOfflinePath)) {
      const loadOfflineContent = async () => {
        try {
          if (mobileOfflinePath) {
            const manifest2 = {
              animeName: mobileOfflineMetadata.title,
              poster: mobileOfflineMetadata.poster || void 0,
              episodes: [{
                id: decodedEpisodeId,
                number: mobileOfflineMetadata.episodeNumber || void 0,
                title: mobileOfflineMetadata.episodeTitle || `Episode ${mobileOfflineMetadata.episodeNumber}`,
                file: mobileOfflinePath
              }]
            };
            setOfflineManifest(manifest2);
            setOfflineSubtitles([]);
            if (/^torrent-session:\/\//i.test(mobileOfflinePath)) {
              setOfflineSources([]);
              return;
            }
            const sourceUrl = /^(https?:|blob:|data:)/i.test(mobileOfflinePath) ? mobileOfflinePath : Capacitor.convertFileSrc(mobileOfflinePath);
            setOfflineSources([{
              url: sourceUrl,
              isM3U8: /\.m3u8(?:$|[?#])/i.test(sourceUrl),
              quality: "Downloaded"
            }]);
            return;
          }
          let manifest = null;
          const electronBridge = window.electron;
          if (electronBridge == null ? void 0 : electronBridge.getOfflineLibrary) {
            const library = await electronBridge.getOfflineLibrary();
            const entry = Array.isArray(library) ? library.find((item) => String(item.path || "") === offlinePath) : null;
            if (entry) {
              manifest = {
                animeName: entry.name,
                poster: entry.poster,
                episodes: Array.isArray(entry.episodes) ? entry.episodes : []
              };
            }
          }
          if (!manifest) {
            const manifestUrl = toLocalFileUrl(joinLocalPath(offlinePath, "manifest.json"));
            const response = await fetch(manifestUrl);
            manifest = await response.json();
          }
          setOfflineManifest(manifest);
          let ep = manifest.episodes.find((e) => e.id === decodedEpisodeId);
          if (!ep && manifest.episodes.length > 0) {
            const epNumMatch = decodedEpisodeId.match(/ep[_-]?(\d+)/i) || decodedEpisodeId.match(/(\d+)$/);
            const epNum = epNumMatch ? parseInt(epNumMatch[1]) : null;
            if (epNum !== null) {
              ep = manifest.episodes.find((e) => e.number === epNum);
            }
            if (!ep) {
              console.warn(`Episode ID "${decodedEpisodeId}" not found in manifest. Using first episode.`);
              ep = manifest.episodes[0];
            }
          }
          if (ep) {
            console.log(`Loading offline episode: ${ep.id || ep.number} from ${offlinePath}/${ep.file}`);
            let sourceUrl = toLocalFileUrl(joinLocalPath(offlinePath, ep.file));
            const electronBridge2 = window.electron;
            if (electronBridge2 == null ? void 0 : electronBridge2.streamLocalFile) {
              try {
                const result = await electronBridge2.streamLocalFile(sourceUrl);
                if ((result == null ? void 0 : result.success) && result.url) {
                  sourceUrl = result.url;
                  console.log(`[WatchPage] Streaming via HTTP: ${sourceUrl}`);
                }
              } catch (streamErr) {
                console.warn("[WatchPage] streamLocalFile failed, falling back to direct URL:", streamErr);
              }
            }
            setOfflineSources([{
              url: sourceUrl,
              isM3U8: false,
              quality: "Downloaded"
            }]);
            if (ep.subtitles && Array.isArray(ep.subtitles)) {
              const subs = await Promise.all(ep.subtitles.map(async (sub) => {
                const localSubPath = toLocalFileUrl(joinLocalPath(offlinePath, sub.file || sub.url));
                let subUrl = localSubPath;
                const electronBridge3 = window.electron;
                if (electronBridge3 == null ? void 0 : electronBridge3.invoke) {
                  try {
                    const result = await electronBridge3.invoke("media:read-local-file", localSubPath);
                    if ((result == null ? void 0 : result.success) && result.url) {
                      subUrl = result.url;
                    }
                  } catch {
                    if (electronBridge3 == null ? void 0 : electronBridge3.streamLocalFile) {
                      try {
                        const streamResult = await electronBridge3.streamLocalFile(localSubPath);
                        if ((streamResult == null ? void 0 : streamResult.success) && streamResult.url) subUrl = streamResult.url;
                      } catch {
                      }
                    }
                  }
                }
                return { lang: sub.lang, label: sub.label || sub.lang, url: subUrl };
              }));
              setOfflineSubtitles(subs.filter((sub) => sub.url));
              console.log("Loaded offline subtitles:", subs.length);
            } else {
              setOfflineSubtitles([]);
            }
          } else {
            console.error("No episodes found in offline manifest");
            setOfflineSources([]);
            setOfflineSubtitles([]);
          }
        } catch (err) {
          console.error("Failed to load offline manifest:", err);
          setOfflineSources([]);
          setOfflineManifest(null);
          setOfflineSubtitles([]);
        }
      };
      loadOfflineContent();
    }
  }, [isOfflineMode, offlinePath, mobileOfflinePath, mobileOfflineMetadata, decodedEpisodeId]);
  reactExports.useEffect(() => {
    try {
      localStorage.setItem("watch-dub-quality-profile", dubProfile);
    } catch {
    }
  }, [dubProfile]);
  const watchMetadata = reactExports.useMemo(() => ({
    animeName: animeData == null ? void 0 : animeData.info.name,
    animePoster: animeData == null ? void 0 : animeData.info.poster,
    genres: animeData == null ? void 0 : animeData.moreInfo.genres
  }), [animeData]);
  useWatchTracking(animeId, decodedEpisodeId, watchMetadata);
  const [pendingRedirect, setPendingRedirect] = reactExports.useState(null);
  reactExports.useEffect(() => {
    const allowedOrigin = window.location.origin;
    const isAllowed = (url) => {
      if (!url) return true;
      try {
        const resolved = new URL(url.toString(), window.location.href);
        return resolved.origin === allowedOrigin;
      } catch {
        return false;
      }
    };
    const clickHandler = (event) => {
      const target = event.target;
      if (!target) return;
      const anchor = target.closest("a[href]");
      if (!anchor) return;
      if (!isAllowed(anchor.href)) {
        event.preventDefault();
        event.stopPropagation();
        setPendingRedirect(anchor.href);
      }
    };
    const originalOpen = window.open;
    const guardedOpen = (url, target, features) => {
      if (url && !isAllowed(url)) {
        setPendingRedirect(url.toString());
        return null;
      }
      return originalOpen.call(window, url, target, features);
    };
    document.addEventListener("click", clickHandler, true);
    window.open = guardedOpen;
    return () => {
      document.removeEventListener("click", clickHandler, true);
      window.open = originalOpen;
    };
  }, []);
  const [refreshTrigger, setRefreshCounter] = reactExports.useState(0);
  reactExports.useCallback(() => {
    setFailedServers(/* @__PURE__ */ new Set());
    setRefreshCounter((prev) => prev + 1);
    setTorrentRetryTrigger((prev) => prev + 1);
    queryClient.invalidateQueries({ queryKey: ["servers", decodedEpisodeId] });
    queryClient.invalidateQueries({ queryKey: ["sources", decodedEpisodeId] });
    ue.success("Refreshing sources...");
  }, [decodedEpisodeId, queryClient]);
  const availableServers = reactExports.useMemo(() => {
    const rawServers = (category === "sub" ? serversData == null ? void 0 : serversData.sub : serversData == null ? void 0 : serversData.dub) || [];
    const dedupedServers = rawServers.filter((server, index, array) => {
      const normalized = String(server.serverName || "").trim().toLowerCase();
      if (!normalized) return false;
      return index === array.findIndex((candidate) => String(candidate.serverName || "").trim().toLowerCase() === normalized);
    });
    const sorted = sortServersByHealth(dedupedServers);
    const ranked = sorted.map((server, idx) => ({ server, idx })).sort((a, b) => {
      var _a2, _b2;
      const pa = Number.isFinite((_a2 = a.server) == null ? void 0 : _a2.providerPriority) ? Number(a.server.providerPriority) : Number.MAX_SAFE_INTEGER;
      const pb = Number.isFinite((_b2 = b.server) == null ? void 0 : _b2.providerPriority) ? Number(b.server.providerPriority) : Number.MAX_SAFE_INTEGER;
      return pa === pb ? a.idx - b.idx : pa - pb;
    }).map(({ server }) => server);
    const savedPref = getPreferredServer(animeId, category);
    if (savedPref) {
      const prefIndex = ranked.findIndex((s) => s.serverName.toLowerCase() === savedPref.toLowerCase());
      if (prefIndex > 0) {
        const pinned = ranked[prefIndex];
        return [pinned, ...ranked.slice(0, prefIndex), ...ranked.slice(prefIndex + 1)];
      }
    }
    return ranked;
  }, [category, serversData, animeId, dubProfile]);
  const availableServersRef = reactExports.useRef(availableServers);
  reactExports.useEffect(() => {
    availableServersRef.current = availableServers;
  }, [availableServers]);
  const selectRegularServer = reactExports.useCallback((nextIndex) => {
    const serverList = availableServersRef.current;
    if (nextIndex >= 0 && serverList[nextIndex]) {
      selectedServerNameRef.current = serverList[nextIndex].serverName;
    } else if (nextIndex < 0) {
      selectedServerNameRef.current = null;
    }
    pendingPlaybackCommitRef.current = true;
    leaveDebridPlayback();
    setSelectedServerIndex(nextIndex);
  }, [leaveDebridPlayback]);
  reactExports.useEffect(() => {
    if (selectedServerIndex < 0) return;
    const pinnedServerName = selectedServerNameRef.current;
    if (!pinnedServerName) return;
    const remappedIndex = availableServers.findIndex((server) => server.serverName === pinnedServerName);
    if (remappedIndex === -1) {
      selectRegularServer(-1);
      setSelectedLangCode(null);
      setSelectedProviderServerKey(null);
      setPreferredServerName(null);
      setPreferredSourceUrl(null);
      setFailedServers(/* @__PURE__ */ new Set());
      return;
    }
    if (remappedIndex !== selectedServerIndex) {
      setSelectedServerIndex(remappedIndex);
    }
  }, [availableServers, selectedServerIndex, selectRegularServer]);
  reactExports.useEffect(() => {
    if (loadingServers) return;
    if (category !== "dub") return;
    if (availableServers.length > 0) return;
    const shouldFallback = window.confirm("No dub sources available for this episode. Switch to Sub now?");
    if (shouldFallback) {
      setCategory("sub");
      selectRegularServer(-1);
      setSelectedProviderServerKey(null);
      trackEvent("watch_category_switch_failed", {
        animeId,
        episodeId: decodedEpisodeId,
        from: "dub",
        to: "sub",
        reason: "no_dub_servers"
      });
      logPlaybackTelemetry({
        userId: user == null ? void 0 : user.id
      });
    }
  }, [loadingServers, category, availableServers.length, animeId, decodedEpisodeId, user == null ? void 0 : user.id, selectRegularServer]);
  reactExports.useEffect(() => {
    if (availableServers.length > 0 && selectedServerIndex === -1) {
      const isEligible = (serverName) => {
        const key = comboFailureKey(decodedEpisodeId, serverName, category);
        return !shouldAutoSkipSource(key);
      };
      if (preferredServerName && preferredServerName !== "hd-1") {
        const savedIndex = availableServers.findIndex((s) => s.serverName === preferredServerName);
        if (savedIndex !== -1 && isEligible(availableServers[savedIndex].serverName)) {
          selectRegularServer(savedIndex);
          return;
        }
      }
      const isRanked = (s) => Number.isFinite(s == null ? void 0 : s.providerPriority);
      const rankedSub = availableServers.findIndex(
        (s) => isRanked(s) && !/-dub$/i.test(String(s.serverName || "")) && isEligible(s.serverName)
      );
      const rankedIndex = rankedSub !== -1 ? rankedSub : availableServers.findIndex((s) => isRanked(s) && isEligible(s.serverName));
      if (rankedIndex !== -1) {
        selectRegularServer(rankedIndex);
        return;
      }
      const hd1Index = availableServers.findIndex((s) => s.serverName === "hd-1" && isEligible(s.serverName));
      if (hd1Index !== -1) {
        selectRegularServer(hd1Index);
      } else {
        const firstEligible = availableServers.findIndex((s) => isEligible(s.serverName));
        selectRegularServer(firstEligible === -1 ? 0 : firstEligible);
      }
    }
  }, [availableServers, selectedServerIndex, preferredServerName, animeId, decodedEpisodeId, category, selectRegularServer]);
  const currentServer = reactExports.useMemo(() => {
    if (selectedServerIndex === -5 && selectedProviderServerKey) {
      return {
        serverId: -5,
        serverName: selectedProviderServerKey,
        providerKey: selectedProviderServerKey,
        providerName: selectedProviderServerKey,
        displayName: selectedProviderServerKey,
        isProviderServer: true
      };
    }
    if (selectedServerIndex >= 0 && availableServers[selectedServerIndex]) {
      return availableServers[selectedServerIndex];
    }
    const hd1 = availableServers.find((s) => s.serverName === "hd-1");
    if (hd1) return hd1;
    return availableServers[0] || null;
  }, [availableServers, selectedServerIndex, selectedProviderServerKey]);
  const activeSelectionIdentity = reactExports.useMemo(() => {
    var _a2;
    if (selectedServerIndex >= 0) {
      const pinnedServerName = selectedServerNameRef.current || ((_a2 = availableServers[selectedServerIndex]) == null ? void 0 : _a2.serverName) || "";
      return [decodedEpisodeId, category, "server", pinnedServerName.toLowerCase()].join("|");
    }
    if (selectedServerIndex === -5) {
      return [decodedEpisodeId, category, "provider", (selectedProviderServerKey || "").toLowerCase()].join("|");
    }
    if (selectedServerIndex === -4) {
      return [decodedEpisodeId, category, "grouped", (selectedLangCode || "").toLowerCase(), (preferredServerName || "").toLowerCase(), preferredSourceUrl || ""].join("|");
    }
    if (selectedServerIndex === -3) {
      return [decodedEpisodeId, category, "m3u8", (selectedLangCode || "").toLowerCase()].join("|");
    }
    if (selectedServerIndex === -2) {
      return [decodedEpisodeId, category, "embed", (selectedLangCode || "").toLowerCase()].join("|");
    }
    return [decodedEpisodeId, category, String(selectedServerIndex)].join("|");
  }, [decodedEpisodeId, category, selectedServerIndex, selectedLangCode, selectedProviderServerKey, preferredServerName, preferredSourceUrl, availableServers]);
  reactExports.useEffect(() => {
    setLockedSourceUrl(null);
  }, [activeSelectionIdentity]);
  reactExports.useEffect(() => {
    setPreferredSourceUrl(null);
  }, [decodedEpisodeId, category]);
  const currentEpisodeIndex = reactExports.useMemo(() => {
    var _a2;
    const list = isOfflineMode ? offlineManifest == null ? void 0 : offlineManifest.episodes : episodesData == null ? void 0 : episodesData.episodes;
    if (!list || list.length === 0) return -1;
    const exact = list.findIndex(
      (ep) => (ep.episodeId || ep.id) === decodedEpisodeId
    );
    if (exact >= 0) return exact;
    const parsed = Number((_a2 = /[?&]ep=(\d+)/i.exec(String(decodedEpisodeId || ""))) == null ? void 0 : _a2[1]);
    if (!Number.isFinite(parsed) || parsed <= 0) return -1;
    return list.findIndex((ep) => Number(ep.number) === parsed);
  }, [isOfflineMode, offlineManifest, episodesData, decodedEpisodeId]);
  const currentEpisode = reactExports.useMemo(() => {
    const list = isOfflineMode ? offlineManifest == null ? void 0 : offlineManifest.episodes : episodesData == null ? void 0 : episodesData.episodes;
    return list == null ? void 0 : list[currentEpisodeIndex];
  }, [isOfflineMode, offlineManifest, episodesData, currentEpisodeIndex]);
  const prevEpisode = reactExports.useMemo(() => {
    const list = isOfflineMode ? offlineManifest == null ? void 0 : offlineManifest.episodes : episodesData == null ? void 0 : episodesData.episodes;
    return currentEpisodeIndex > 0 ? list == null ? void 0 : list[currentEpisodeIndex - 1] : null;
  }, [isOfflineMode, offlineManifest, episodesData, currentEpisodeIndex]);
  const nextEpisode = reactExports.useMemo(() => {
    const list = isOfflineMode ? offlineManifest == null ? void 0 : offlineManifest.episodes : episodesData == null ? void 0 : episodesData.episodes;
    return currentEpisodeIndex < ((list == null ? void 0 : list.length) ?? 0) - 1 ? list == null ? void 0 : list[currentEpisodeIndex + 1] : null;
  }, [isOfflineMode, offlineManifest, episodesData, currentEpisodeIndex]);
  const combinedSourceServer = "hd-1";
  reactExports.useEffect(() => {
    if (isOfflineMode || !(nextEpisode == null ? void 0 : nextEpisode.episodeId)) return;
    queryClient.prefetchQuery({
      queryKey: [
        "combined-sources",
        nextEpisode.episodeId,
        animeData == null ? void 0 : animeData.info.name,
        nextEpisode.number,
        combinedSourceServer,
        category,
        user == null ? void 0 : user.id,
        (animeData == null ? void 0 : animeData.anilistID) || (animeData == null ? void 0 : animeData.moreInfo.anilistId) || null,
        (animeData == null ? void 0 : animeData.malID) || (animeData == null ? void 0 : animeData.moreInfo.malId) || null
      ],
      queryFn: () => fetchCombinedSources(
        nextEpisode.episodeId,
        animeData == null ? void 0 : animeData.info.name,
        nextEpisode.number,
        combinedSourceServer,
        category,
        user == null ? void 0 : user.id,
        (animeData == null ? void 0 : animeData.anilistID) || (animeData == null ? void 0 : animeData.moreInfo.anilistId) || null,
        (animeData == null ? void 0 : animeData.malID) || (animeData == null ? void 0 : animeData.moreInfo.malId) || null
      ),
      staleTime: 2 * 60 * 1e3
    });
  }, [
    animeData == null ? void 0 : animeData.info.name,
    animeData == null ? void 0 : animeData.moreInfo.anilistId,
    animeData == null ? void 0 : animeData.moreInfo.malId,
    category,
    combinedSourceServer,
    isOfflineMode,
    nextEpisode == null ? void 0 : nextEpisode.episodeId,
    nextEpisode == null ? void 0 : nextEpisode.number,
    queryClient,
    user == null ? void 0 : user.id
  ]);
  (animeData == null ? void 0 : animeData.info.name) ?? null;
  const {
    data: sourcesData,
    isLoading: loadingSources,
    isFetching: fetchingSources,
    refetch: refetchSources
  } = useCombinedSourcesWithRefetch(
    decodedEpisodeId,
    animeData == null ? void 0 : animeData.info.name,
    currentEpisode == null ? void 0 : currentEpisode.number,
    combinedSourceServer,
    category,
    user == null ? void 0 : user.id,
    (animeData == null ? void 0 : animeData.anilistID) || (animeData == null ? void 0 : animeData.moreInfo.anilistId) || null,
    (animeData == null ? void 0 : animeData.malID) || (animeData == null ? void 0 : animeData.moreInfo.malId) || null
  );
  const { data: fastStartData, isLoading: loadingFastStart } = useQuery({
    queryKey: ["fast-start-source", decodedEpisodeId, currentServer == null ? void 0 : currentServer.serverName, category],
    enabled: !isOfflineMode && !!decodedEpisodeId && !!(currentServer == null ? void 0 : currentServer.serverName),
    staleTime: 90 * 1e3,
    queryFn: async () => {
      const empty = {
        headers: { Referer: "", "User-Agent": "" },
        sources: [],
        subtitles: [],
        tracks: [],
        anilistID: null,
        malID: null,
        intro: null,
        outro: null
      };
      try {
        return await fetchCombinedSources(
          decodedEpisodeId,
          animeData == null ? void 0 : animeData.info.name,
          currentEpisode == null ? void 0 : currentEpisode.number,
          (currentServer == null ? void 0 : currentServer.serverName) || "hd-1",
          category,
          user == null ? void 0 : user.id,
          (animeData == null ? void 0 : animeData.anilistID) || (animeData == null ? void 0 : animeData.moreInfo.anilistId) || null,
          (animeData == null ? void 0 : animeData.malID) || (animeData == null ? void 0 : animeData.moreInfo.malId) || null
        );
      } catch {
        return empty;
      }
    }
  });
  const sourceDataForPlayback = reactExports.useMemo(() => {
    var _a2, _b2, _c2, _d2;
    const normalizeForBlocked = (value) => {
      const raw = String(value || "").trim();
      if (!raw) return "";
      try {
        const parsed = new URL(raw, window.location.origin);
        const upstream = parsed.searchParams.get("url");
        return String(upstream || parsed.href || raw).trim();
      } catch {
        return raw;
      }
    };
    const countUsableSources = (payload) => {
      const rows = Array.isArray(payload == null ? void 0 : payload.sources) ? payload.sources : [];
      const now = Date.now();
      return rows.filter((source) => {
        const normalized = normalizeForBlocked(source == null ? void 0 : source.url);
        if (!normalized) return false;
        const expiresAt = blockedSourceUrls[normalized];
        return !(Number.isFinite(expiresAt) && expiresAt > now);
      }).length;
    };
    const usableCombinedCount = countUsableSources(sourcesData);
    const usableFastStartCount = countUsableSources(fastStartData);
    if (usableCombinedCount > 0 && ((_a2 = sourcesData == null ? void 0 : sourcesData.sources) == null ? void 0 : _a2.length)) return sourcesData;
    if (usableFastStartCount > 0 && ((_b2 = fastStartData == null ? void 0 : fastStartData.sources) == null ? void 0 : _b2.length)) return fastStartData;
    if ((_c2 = fastStartData == null ? void 0 : fastStartData.sources) == null ? void 0 : _c2.length) return fastStartData;
    if ((_d2 = sourcesData == null ? void 0 : sourcesData.sources) == null ? void 0 : _d2.length) return sourcesData;
    return sourcesData || fastStartData;
  }, [sourcesData, fastStartData, blockedSourceUrls]);
  const normalizePlaybackSourceUrl = reactExports.useCallback((value) => {
    const raw = String(value || "").trim();
    if (!raw) return "";
    try {
      const parsed = new URL(raw, window.location.origin);
      const upstream = parsed.searchParams.get("url");
      return String(upstream || parsed.href || raw).trim();
    } catch {
      return raw;
    }
  }, []);
  const isPlaybackSourceBlocked = reactExports.useCallback(
    (value) => {
      const normalized = normalizePlaybackSourceUrl(value);
      if (!normalized) return false;
      const expiresAt = blockedSourceUrls[normalized];
      return Number.isFinite(expiresAt) && expiresAt > Date.now();
    },
    [blockedSourceUrls, normalizePlaybackSourceUrl]
  );
  const blockPlaybackSourceUrl = reactExports.useCallback(
    (value, ttlMs = 2 * 60 * 1e3) => {
      const normalized = normalizePlaybackSourceUrl(value);
      if (!normalized) return;
      const expiresAt = Date.now() + Math.max(15e3, ttlMs);
      setBlockedSourceUrls((previous) => {
        const next = { ...previous, [normalized]: expiresAt };
        const now = Date.now();
        for (const [url, expiry] of Object.entries(next)) {
          if (!Number.isFinite(expiry) || expiry <= now) {
            delete next[url];
          }
        }
        return next;
      });
    },
    [normalizePlaybackSourceUrl]
  );
  const visibleSources = reactExports.useMemo(() => {
    const rawSources = (sourceDataForPlayback == null ? void 0 : sourceDataForPlayback.sources) || [];
    const unblockedSources = rawSources.filter((source) => !isPlaybackSourceBlocked(source == null ? void 0 : source.url));
    const seen = /* @__PURE__ */ new Set();
    return unblockedSources.filter((source) => {
      if (!(source == null ? void 0 : source.url)) return false;
      const key = [
        String(source.url || "").trim().toLowerCase(),
        String(source.server || source.providerKey || source.providerName || "").trim().toLowerCase(),
        String(source.langCode || source.language || "").trim().toLowerCase(),
        String(source.quality || "").trim().toLowerCase(),
        source.isEmbed ? "embed" : "direct",
        source.isM3U8 ? "m3u8" : "file"
      ].join("|");
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }, [sourceDataForPlayback == null ? void 0 : sourceDataForPlayback.sources, isPlaybackSourceBlocked]);
  reactExports.useEffect(() => {
    if (selectedServerIndex !== -1 || availableServers.length > 0 || playbackTakeoverActive) return;
    const playable = visibleSources.filter((source) => !!(source == null ? void 0 : source.url) && source.isTorrent !== true && source.sourceType !== "torrent");
    if (!playable.length) return;
    const candidate = playable.find((source) => source.isEmbed !== true && source.sourceType !== "embed") || playable[0];
    const langCode = String(candidate.langCode || candidate.language || "unknown");
    pendingPlaybackCommitRef.current = true;
    selectRegularServer(-4);
    setSelectedLangCode(langCode);
    setPreferredServerName(candidate.providerName || null);
    setPreferredSourceUrl(candidate.url || null);
    setActiveSourceLanguage("all");
    setFailedServers(/* @__PURE__ */ new Set());
  }, [
    availableServers.length,
    selectedServerIndex,
    selectRegularServer,
    playbackTakeoverActive,
    visibleSources
  ]);
  const hasWatchAnimeWorldAvailable = reactExports.useMemo(() => {
    return visibleSources.some(
      (s) => {
        var _a2, _b2, _c2, _d2, _e2, _f2;
        return ((_a2 = s.langCode) == null ? void 0 : _a2.startsWith("watchanimeworld")) || ((_b2 = s.langCode) == null ? void 0 : _b2.startsWith("watchaw")) || s.providerKey === "watchaw" || ((_c2 = s.providerName) == null ? void 0 : _c2.toLowerCase().includes("watchaw")) || ((_d2 = s.providerName) == null ? void 0 : _d2.includes("Goku")) || ((_e2 = s.providerName) == null ? void 0 : _e2.includes("Luffy")) || ((_f2 = s.providerName) == null ? void 0 : _f2.includes("Z-Fighter"));
      }
    );
  }, [visibleSources]);
  const getNextEpisodeEstimate = (source) => {
    if (isOfflineMode) return null;
    if (!(sourcesData == null ? void 0 : sourcesData.nextEpisodeEstimates) || !source) return null;
    const estimate = sourcesData.nextEpisodeEstimates.find(
      (e) => {
        var _a2, _b2;
        return (!e.lang || ((_a2 = source.language) == null ? void 0 : _a2.toLowerCase().includes(e.lang.toLowerCase()))) && (!e.server || ((_b2 = source.providerName) == null ? void 0 : _b2.includes(e.server)));
      }
    );
    return estimate ? estimate.label : null;
  };
  const getUrlHost = (url) => {
    if (!url) return "unknown";
    try {
      return new URL(url).host || "unknown";
    } catch {
      return "unknown";
    }
  };
  const getSourceTypeColorClass = (source, opts) => {
    const s = source || {};
    const type = String(s.sourceType || "").toLowerCase();
    const isTorrent = s.isTorrent === true || type === "torrent";
    if (isTorrent) {
      const seeders = typeof s.seeders === "number" ? s.seeders : void 0;
      if (seeders === 0) return "bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30";
      return "bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30";
    }
    const isEmbed = s.isEmbed === true || type === "embed";
    if (isEmbed) return "bg-primary/5 hover:bg-primary/10 text-primary border border-primary/15";
    const isDirect = type === "hls" || type === "mp4" || s.isM3U8 === true;
    if (isDirect) return "bg-muted hover:bg-muted/80 text-foreground/80";
    return (opts == null ? void 0 : opts.isProviderServer) ? "bg-primary/5 hover:bg-primary/10 text-primary border border-primary/15" : "bg-muted hover:bg-muted/80";
  };
  const buildSourceHoverRows = (source, extra) => {
    if (!source) return [];
    const rows = [];
    const push = (label, value) => {
      if (value === void 0 || value === null || value === "") return;
      rows.push({ label, value: String(value) });
    };
    const type = String(source.sourceType || "").toLowerCase();
    const isTorrent = source.isTorrent === true || type === "torrent";
    if ((extra == null ? void 0 : extra.count) && extra.count > 0) push("Sources", extra.count);
    push("Type", source.sourceType || (source.isEmbed ? "embed" : source.isM3U8 ? "hls" : void 0));
    push("Quality", source.quality);
    push("Audio", source.languageLabel || source.language);
    if (source.language && source.language !== (source.languageLabel || "")) push("Language", source.language);
    push("Provider", source.providerName);
    push("Key", source.providerKey);
    push("Server", source.server);
    push("Format", source.fileFormat);
    push("Size", source.fileSize);
    if (isTorrent) {
      push("Torrent", source.torrentTitle);
      push("Seeders", typeof source.seeders === "number" ? source.seeders : void 0);
      push("Leechers", typeof source.leechers === "number" ? source.leechers : void 0);
      push("Peers", typeof source.peers === "number" ? source.peers : void 0);
    }
    return rows;
  };
  const { data: subSourcesData } = useQuery({
    queryKey: ["sub-track-only", decodedEpisodeId, combinedSourceServer],
    enabled: category === "dub" && !isOfflineMode && !!decodedEpisodeId,
    staleTime: 2 * 60 * 1e3,
    queryFn: async () => {
      const empty = {
        headers: { Referer: "", "User-Agent": "" },
        sources: [],
        subtitles: [],
        tracks: [],
        anilistID: null,
        malID: null,
        intro: null,
        outro: null
      };
      try {
        return await fetchCombinedSources(
          decodedEpisodeId,
          animeData == null ? void 0 : animeData.info.name,
          currentEpisode == null ? void 0 : currentEpisode.number,
          combinedSourceServer,
          "sub",
          user == null ? void 0 : user.id,
          (animeData == null ? void 0 : animeData.anilistID) || (animeData == null ? void 0 : animeData.moreInfo.anilistId) || null,
          (animeData == null ? void 0 : animeData.malID) || (animeData == null ? void 0 : animeData.moreInfo.malId) || null
        );
      } catch {
        return empty;
      }
    }
  });
  reactExports.useEffect(() => {
    if (hasWatchAnimeWorldAvailable && selectedLangCode && selectedServerIndex === -1) {
      const langExists = visibleSources.some((s) => s.langCode === selectedLangCode);
      if (langExists) {
        selectRegularServer(-2);
      }
    }
  }, [hasWatchAnimeWorldAvailable, selectedLangCode, selectedServerIndex, visibleSources, selectRegularServer]);
  const normalizedSubtitles = reactExports.useMemo(() => {
    let subs = [];
    if (category === "dub") {
      const subTracks = [
        ...(subSourcesData == null ? void 0 : subSourcesData.subtitles) || [],
        ...(subSourcesData == null ? void 0 : subSourcesData.tracks) || []
      ];
      const dubTracks = [
        ...(sourceDataForPlayback == null ? void 0 : sourceDataForPlayback.subtitles) || [],
        ...(sourceDataForPlayback == null ? void 0 : sourceDataForPlayback.tracks) || []
      ];
      subs = buildDubSubtitles(dubTracks, subTracks);
    } else {
      const allTracks = [
        ...(sourceDataForPlayback == null ? void 0 : sourceDataForPlayback.subtitles) || [],
        ...(sourceDataForPlayback == null ? void 0 : sourceDataForPlayback.tracks) || []
      ];
      const seenUrls = /* @__PURE__ */ new Set();
      const seenLanguages = /* @__PURE__ */ new Set();
      const normalizeLanguage = (track) => {
        const raw = `${track.lang || ""} ${track.label || ""}`.toLowerCase();
        const compact = raw.replace(/\([^)]*\)/g, " ").replace(/\s+/g, " ").trim();
        if (!compact) return "";
        if (compact === "en" || compact.includes("english") || compact.includes("eng")) return "en";
        if (compact === "ja" || compact.includes("japanese") || compact.includes("jpn")) return "ja";
        if (compact === "hi" || compact.includes("hindi")) return "hi";
        if (compact === "es" || compact.includes("spanish") || compact.includes("espanol")) return "es";
        return compact;
      };
      subs = allTracks.filter((s) => {
        const urlKey = String(s.url || "").trim();
        const languageKey = normalizeLanguage(s);
        if (!urlKey) return false;
        if (seenUrls.has(urlKey)) return false;
        if (languageKey && seenLanguages.has(languageKey)) return false;
        seenUrls.add(urlKey);
        if (languageKey) seenLanguages.add(languageKey);
        return true;
      });
    }
    const languageRank = (sub) => {
      const value = `${sub.lang || ""} ${sub.label || ""}`.toLowerCase();
      if (value.includes("english") || value.includes("eng") || value.trim() === "en") return 0;
      if (value.includes("japanese") || value.includes("jpn") || value.trim() === "ja") return 1;
      if (value.includes("hindi") || value.includes("hin") || value.trim() === "hi") return 2;
      return 10;
    };
    const seen = /* @__PURE__ */ new Set();
    return subs.filter(
      (sub) => {
        var _a2;
        return sub.lang && sub.lang.toLowerCase() !== "thumbnails" && !((_a2 = sub.url) == null ? void 0 : _a2.includes("thumbnails"));
      }
    ).filter((sub) => {
      const key = `${String(sub.lang || "").toLowerCase()}|${String(sub.url || "").trim().toLowerCase()}`;
      if (!String(sub.url || "").trim() || seen.has(key)) return false;
      seen.add(key);
      return true;
    }).sort((left, right) => languageRank(left) - languageRank(right));
  }, [sourceDataForPlayback, subSourcesData, category]);
  const resolvedSelectedSource = reactExports.useMemo(() => {
    if (!visibleSources.length) return null;
    if (selectedServerIndex === -4 && selectedLangCode) {
      if (preferredSourceUrl) {
        const exact = visibleSources.find((s) => s.url === preferredSourceUrl);
        if (exact) return exact;
      }
      return visibleSources.find(
        (s) => s.langCode === selectedLangCode && (preferredServerName ? s.providerName === preferredServerName : true)
      );
    }
    if (selectedServerIndex === -3 && selectedLangCode) {
      return visibleSources.find((s) => s.langCode === selectedLangCode && s.isM3U8 && !s.isEmbed);
    }
    if (selectedServerIndex === -2 && selectedLangCode) {
      return visibleSources.find((s) => s.langCode === selectedLangCode && s.isEmbed);
    }
    if (selectedServerIndex === -5 && selectedProviderServerKey) {
      return selectSourceForServer(visibleSources, selectedProviderServerKey);
    }
    if (selectedServerIndex >= 0 && availableServers[selectedServerIndex]) {
      const serverName = availableServers[selectedServerIndex].serverName;
      const isNebula = isNebulaServer(serverName);
      const candidatePool = isNebula ? visibleSources : visibleSources.filter((source) => {
        const providerName = String(source.providerName || "").trim().toLowerCase();
        return !isNebulaServer(source.providerKey) && !providerName.includes("koro");
      });
      const exact = selectSourceForServer(candidatePool, serverName);
      if (exact) return exact;
      return visibleSources.find((source) => !source.isTorrent && !source.isEmbed) || visibleSources.find((source) => !source.isTorrent) || null;
    }
    return null;
  }, [visibleSources, selectedServerIndex, selectedLangCode, selectedProviderServerKey, availableServers, preferredServerName, preferredSourceUrl]);
  const selectedSource = reactExports.useMemo(() => {
    if (!visibleSources.length) return null;
    if (lockedSourceUrl && !isPlaybackSourceBlocked(lockedSourceUrl)) {
      const locked = visibleSources.find((source) => source.url === lockedSourceUrl);
      if (locked) return locked;
    }
    return resolvedSelectedSource;
  }, [visibleSources, lockedSourceUrl, resolvedSelectedSource, isPlaybackSourceBlocked]);
  reactExports.useEffect(() => {
    if (!(selectedSource == null ? void 0 : selectedSource.url)) return;
    if (isPlaybackSourceBlocked(selectedSource.url)) return;
    setLockedSourceUrl((current) => {
      if (!current) return selectedSource.url;
      if (current === selectedSource.url) return current;
      if (isPlaybackSourceBlocked(current)) return selectedSource.url;
      const currentStillVisible = visibleSources.some((source) => source.url === current);
      return currentStillVisible ? current : selectedSource.url;
    });
  }, [selectedSource == null ? void 0 : selectedSource.url, visibleSources, isPlaybackSourceBlocked]);
  reactExports.useEffect(() => {
    if (!lockedSourceUrl) return;
    if (!isPlaybackSourceBlocked(lockedSourceUrl)) return;
    setLockedSourceUrl(null);
  }, [lockedSourceUrl, isPlaybackSourceBlocked]);
  const playbackHeaders = reactExports.useMemo(() => {
    if (torrentPlaybackSource || debridPlaybackSource) {
      return {};
    }
    const sourceHeaders = (selectedSource == null ? void 0 : selectedSource.headers) || {};
    const baseHeaders = {
      ...(sourceDataForPlayback == null ? void 0 : sourceDataForPlayback.headers) || {},
      ...sourceHeaders
    };
    const candidateReferers = selectedSource == null ? void 0 : selectedSource.refererCandidates;
    const variants = (candidateReferers == null ? void 0 : candidateReferers.length) ? candidateReferers : getRefererVariants((baseHeaders == null ? void 0 : baseHeaders.Referer) || "");
    const chosenReferer = variants[Math.min(refererRetryIndex, Math.max(0, variants.length - 1))];
    return {
      ...baseHeaders,
      Referer: chosenReferer || (baseHeaders == null ? void 0 : baseHeaders.Referer),
      "User-Agent": baseHeaders == null ? void 0 : baseHeaders["User-Agent"]
    };
  }, [(_a = sourceDataForPlayback == null ? void 0 : sourceDataForPlayback.headers) == null ? void 0 : _a.Referer, (_b = sourceDataForPlayback == null ? void 0 : sourceDataForPlayback.headers) == null ? void 0 : _b["User-Agent"], selectedSource == null ? void 0 : selectedSource.headers, selectedSource == null ? void 0 : selectedSource.refererCandidates, refererRetryIndex, torrentPlaybackSource, debridPlaybackSource]);
  const playbackCandidateSource = reactExports.useMemo(() => {
    if (debridPlaybackSource) return debridPlaybackSource;
    if (torrentPlaybackSource) return torrentPlaybackSource;
    if (playbackTakeoverActive) return null;
    return resolvedSelectedSource || null;
  }, [debridPlaybackSource, torrentPlaybackSource, playbackTakeoverActive, resolvedSelectedSource]);
  reactExports.useEffect(() => {
    if (!playbackCandidateSource) {
      if (pendingPlaybackCommitRef.current || playbackTakeoverActive) {
        setCommittedPlaybackSource(null);
        setCommittedPlaybackHeaders(null);
      }
      return;
    }
    if (!committedPlaybackSource || pendingPlaybackCommitRef.current) {
      setCommittedPlaybackSource(playbackCandidateSource);
      setCommittedPlaybackHeaders(playbackHeaders);
      pendingPlaybackCommitRef.current = false;
    } else if (committedPlaybackSource.url === playbackCandidateSource.url && committedPlaybackSource !== playbackCandidateSource) {
      setCommittedPlaybackSource(playbackCandidateSource);
      setCommittedPlaybackHeaders(playbackHeaders);
    }
  }, [playbackCandidateSource, playbackHeaders, committedPlaybackSource, playbackTakeoverActive]);
  const activePlaybackSource = committedPlaybackSource || playbackCandidateSource;
  const activePlaybackHeaders = committedPlaybackHeaders || playbackHeaders;
  const playbackLoading = torrentPlaybackLoading || debridPlaybackLoading || !playbackCandidateSource || !sourceReady;
  const playbackSources = reactExports.useMemo(() => {
    if (debridPlaybackSource) {
      return [debridPlaybackSource];
    }
    if (torrentPlaybackSource) {
      return [torrentPlaybackSource];
    }
    if (playbackTakeoverActive) {
      return [];
    }
    const directOnly = visibleSources.filter((source) => {
      if (!(source == null ? void 0 : source.url)) return false;
      if (source.isEmbed === true) return false;
      if (source.isTorrent === true) return false;
      const type = String(source.sourceType || "");
      if (type === "embed" || type === "torrent") return false;
      return /^(https?:|blob:|file:|mobile-proxy:|\/)/i.test(String(source.url));
    });
    const activeUrl = activePlaybackSource == null ? void 0 : activePlaybackSource.url;
    if (!activeUrl) return directOnly;
    const activeIndex = directOnly.findIndex((source) => source.url === activeUrl);
    if (activeIndex <= 0) return directOnly;
    return [directOnly[activeIndex], ...directOnly.filter((_, i) => i !== activeIndex)];
  }, [debridPlaybackSource, torrentPlaybackSource, playbackTakeoverActive, visibleSources, activePlaybackSource == null ? void 0 : activePlaybackSource.url]);
  reactExports.useEffect(() => {
    let cancelled = false;
    const runPreflight = async () => {
      if (!activePlaybackSource || isOfflineMode || activePlaybackSource.isEmbed || activePlaybackSource.sourceType === "torrent" || activePlaybackSource.sourceType === "debrid" || /^magnet:/i.test(activePlaybackSource.url)) {
        setSourceReady(true);
        setSourcePreflightError(null);
        return;
      }
      if (isMobileApp && isMobileProxyUrl(activePlaybackSource.url)) {
        setSourceReady(true);
        setSourcePreflightError(null);
        return;
      }
      activePlaybackSource.url.startsWith("http") ? getProxiedVideoUrl(activePlaybackSource.url, activePlaybackHeaders == null ? void 0 : activePlaybackHeaders.Referer, activePlaybackHeaders == null ? void 0 : activePlaybackHeaders["User-Agent"]) : activePlaybackSource.url;
      const result = await preflightSourceUrl();
      if (cancelled) return;
      const categoryType = category;
      const serverName = (currentServer == null ? void 0 : currentServer.serverName) || activePlaybackSource.server || activePlaybackSource.providerName || "unknown";
      recordSourceHealth(serverName, categoryType, result.ok, result.latencyMs);
      recordProviderQualityOutcome(
        activePlaybackSource.providerName || activePlaybackSource.server || serverName,
        categoryType,
        activePlaybackSource.quality,
        result.ok
      );
      logPlaybackTelemetry({
        ok: result.ok,
        latencyMs: result.latencyMs,
        userId: user == null ? void 0 : user.id
      });
      if (!result.ok) {
        const isLikelyHls = Boolean(activePlaybackSource == null ? void 0 : activePlaybackSource.isM3U8) || /\.m3u8(?:$|[?#])/i.test((activePlaybackSource == null ? void 0 : activePlaybackSource.url) || "");
        if (isLikelyHls) {
          setSourceReady(true);
          setSourcePreflightError("Stream preflight failed. Trying HLS fallback...");
          return;
        }
        setSourceReady(false);
        setSourcePreflightError("Stream preflight failed. Retrying server...");
      } else {
        setSourceReady(true);
        setSourcePreflightError(null);
      }
    };
    runPreflight();
    return () => {
      cancelled = true;
    };
  }, [activePlaybackSource == null ? void 0 : activePlaybackSource.url, activePlaybackSource == null ? void 0 : activePlaybackSource.providerName, activePlaybackSource == null ? void 0 : activePlaybackSource.server, activePlaybackSource == null ? void 0 : activePlaybackSource.isEmbed, isOfflineMode, isMobileApp, activePlaybackHeaders == null ? void 0 : activePlaybackHeaders.Referer, activePlaybackHeaders == null ? void 0 : activePlaybackHeaders["User-Agent"], category, currentServer == null ? void 0 : currentServer.serverName, animeId, decodedEpisodeId, user == null ? void 0 : user.id]);
  const officialServerNameSet = reactExports.useMemo(() => {
    return new Set(availableServers.map((server) => String(server.serverName || "").trim().toLowerCase()).filter(Boolean));
  }, [availableServers]);
  const isOfficialSource = reactExports.useCallback((source) => {
    if (!source) return false;
    if (isNebulaServer(source.providerKey)) {
      return false;
    }
    const candidates = [
      String(source.server || "").trim().toLowerCase(),
      String(source.providerKey || "").trim().toLowerCase(),
      String(source.providerName || "").trim().toLowerCase()
    ].filter(Boolean);
    if (candidates.some((value) => /^hd-\d+$/i.test(value))) return true;
    return candidates.some((value) => officialServerNameSet.has(value));
  }, [officialServerNameSet]);
  const providerSourceCount = reactExports.useMemo(() => {
    return visibleSources.filter(
      (source) => {
        var _a2;
        return !isOfficialSource(source) && !!source.providerName && source.providerName !== "TatakaiAPI" && !((_a2 = source.langCode) == null ? void 0 : _a2.startsWith("marketplace-"));
      }
    ).length;
  }, [visibleSources, isOfficialSource]);
  reactExports.useEffect(() => {
    previousProviderCountRef.current = null;
    setNewProviderCount(0);
    setProviderFeedUpdatedAt(null);
    setBlockedSourceUrls({});
  }, [decodedEpisodeId, category]);
  reactExports.useEffect(() => {
    if (previousProviderCountRef.current === null) {
      previousProviderCountRef.current = providerSourceCount;
      if (providerSourceCount > 0) setProviderFeedUpdatedAt(Date.now());
      return;
    }
    const previousCount = previousProviderCountRef.current;
    if (providerSourceCount > previousCount) {
      setNewProviderCount(providerSourceCount - previousCount);
      setProviderFeedUpdatedAt(Date.now());
    } else if (providerSourceCount !== previousCount) {
      setNewProviderCount(0);
      setProviderFeedUpdatedAt(Date.now());
    }
    previousProviderCountRef.current = providerSourceCount;
  }, [providerSourceCount]);
  reactExports.useEffect(() => {
    if (!newProviderCount) return;
    const timer = setTimeout(() => setNewProviderCount(0), 7e3);
    return () => clearTimeout(timer);
  }, [newProviderCount]);
  const torrentSources = reactExports.useMemo(
    () => visibleSources.filter(
      (source) => (source == null ? void 0 : source.isTorrent) === true || (source == null ? void 0 : source.sourceType) === "torrent"
    ),
    [visibleSources]
  );
  const isTorrentSource = reactExports.useCallback(
    (source) => (source == null ? void 0 : source.isTorrent) === true || (source == null ? void 0 : source.sourceType) === "torrent",
    []
  );
  const languageGroups = reactExports.useMemo(() => {
    if (visibleSources.length === 0) return {};
    return visibleSources.reduce((acc, source) => {
      var _a2;
      if (isOfficialSource(source)) return acc;
      if (isTorrentSource(source)) return acc;
      if (!source.providerName || source.providerName === "TatakaiAPI" || ((_a2 = source.langCode) == null ? void 0 : _a2.startsWith("marketplace-"))) return acc;
      let lang = source.language || "Unknown";
      const lowerLang = lang.toLowerCase();
      const lowerProvider = (source.providerName || "").toLowerCase();
      if (lowerLang.includes("german") || lowerLang.includes("deutsch") || lowerProvider.includes("filemoon") || lowerProvider.includes("video öffnen")) {
        lang = "German";
      } else if (lowerLang.includes("hindi")) {
        lang = "Hindi";
      } else if (lowerLang.includes("telugu")) {
        lang = "Telugu";
      } else if (lowerLang.includes("tamil")) {
        lang = "Tamil";
      } else if (lowerLang.includes("english") || lowerLang === "eng" || lowerLang === "en") {
        lang = "English";
      } else if (lowerLang.includes("japanese") || lowerLang === "jap" || lowerLang === "jpn") {
        lang = "Japanese";
      }
      if (!acc[lang]) acc[lang] = [];
      acc[lang].push(source);
      return acc;
    }, {});
  }, [visibleSources, isOfficialSource, isTorrentSource]);
  const uniqueLabelMap = reactExports.useMemo(() => {
    const keys = [];
    const fallbackByKey = {};
    const identityBySource = /* @__PURE__ */ new Map();
    const occurrences = /* @__PURE__ */ new Map();
    for (const server of availableServers) {
      const key = String(server.serverName);
      keys.push(key);
      fallbackByKey[key] = String(server.displayName || server.providerName || server.serverName);
    }
    Object.values(languageGroups).forEach((sources) => {
      sources.forEach((source) => {
        const providerId = String(
          (source == null ? void 0 : source.providerKey) || (source == null ? void 0 : source.server) || (source == null ? void 0 : source.providerName) || "source"
        ).toLowerCase();
        const nth = (occurrences.get(providerId) || 0) + 1;
        occurrences.set(providerId, nth);
        const identityKey = `${providerId}#${nth}`;
        identityBySource.set(source, identityKey);
        keys.push(identityKey);
        fallbackByKey[identityKey] = String((source == null ? void 0 : source.providerName) || providerId);
      });
    });
    return { labels: buildUniqueSimpleNameMap(keys, fallbackByKey), identityBySource };
  }, [availableServers, languageGroups]);
  const filteredLanguageGroups = reactExports.useMemo(() => {
    if (activeSourceLanguage === "all") return languageGroups;
    const filtered = {};
    Object.entries(languageGroups).forEach(([lang, sources]) => {
      const filteredSources = sources.filter(
        (src) => normalizeWatchLanguageKey(src.language || src.audioLanguage || "") === activeSourceLanguage
      );
      if (filteredSources.length > 0) filtered[lang] = filteredSources;
    });
    return filtered;
  }, [languageGroups, activeSourceLanguage]);
  const isVerifiedProvider = (providerKey, serverName) => {
    const key = String(providerKey || "").toLowerCase();
    String(serverName || "").toLowerCase();
    const verified = ["hianime", "tatakaiapi"];
    return verified.includes(key);
  };
  const getSimpleSourceLabel = (source, fallbackKey) => {
    const identityKey = uniqueLabelMap.identityBySource.get(source);
    if (identityKey && uniqueLabelMap.labels[identityKey]) return uniqueLabelMap.labels[identityKey];
    const providerId = String(
      (source == null ? void 0 : source.providerKey) || (source == null ? void 0 : source.server) || (source == null ? void 0 : source.providerName) || fallbackKey
    );
    return uniqueLabelMap.labels[providerId] || getSimpleServerDisplayName(providerId, String((source == null ? void 0 : source.providerName) || fallbackKey));
  };
  const activeServerDisplayName = reactExports.useMemo(() => {
    if (isOfflineMode) return "Offline";
    if (selectedSource) {
      return getSimpleSourceLabel(selectedSource, (selectedSource == null ? void 0 : selectedSource.providerName) || "server");
    }
    if (currentServer == null ? void 0 : currentServer.serverName) {
      return getSimpleServerDisplayName(currentServer.serverName, getFriendlyServerName(currentServer.serverName));
    }
    return void 0;
  }, [isOfflineMode, selectedSource, currentServer == null ? void 0 : currentServer.serverName, uniqueLabelMap]);
  const updateWatchHistory = useUpdateWatchHistory();
  const initialSavedRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    if (!animeData || !currentEpisode) return;
    if (initialSavedRef.current === decodedEpisodeId) return;
    initialSavedRef.current = decodedEpisodeId;
    const timeout = setTimeout(async () => {
      if (lastPlaybackTimeRef.current <= 0) return;
      if (user) {
        try {
          console.debug("[WatchPage] Saving watch history with IDs:", {
            animeId,
            episodeId: decodedEpisodeId,
            malID: (sourcesData == null ? void 0 : sourcesData.malID) || (animeData == null ? void 0 : animeData.moreInfo.malId),
            anilistID: (sourcesData == null ? void 0 : sourcesData.anilistID) || (animeData == null ? void 0 : animeData.moreInfo.anilistId)
          });
          await updateWatchHistory.mutateAsync({
            animeId,
            animeName: (animeData == null ? void 0 : animeData.info.name) || "Unknown Anime",
            animePoster: (animeData == null ? void 0 : animeData.info.poster) || "",
            episodeId: decodedEpisodeId,
            episodeNumber: currentEpisode.number,
            progressSeconds: 0,
            durationSeconds: 0,
            malId: (sourcesData == null ? void 0 : sourcesData.malID) || (animeData == null ? void 0 : animeData.moreInfo.malId) || null,
            anilistId: (sourcesData == null ? void 0 : sourcesData.anilistID) || (animeData == null ? void 0 : animeData.moreInfo.anilistId) || null,
            isLastEpisode: !nextEpisode
          });
        } catch (e) {
          console.warn("Failed to update watch history in DB:", e);
          initialSavedRef.current = null;
        }
      } else {
        updateLocalContinueWatching({
          animeId,
          animeName: (animeData == null ? void 0 : animeData.info.name) || "Unknown Anime",
          animePoster: (animeData == null ? void 0 : animeData.info.poster) || "",
          episodeId: decodedEpisodeId,
          episodeNumber: currentEpisode.number,
          progressSeconds: 0,
          durationSeconds: 0
        });
      }
    }, 5e3);
    return () => clearTimeout(timeout);
  }, [user, animeData, currentEpisode, animeId, decodedEpisodeId, updateWatchHistory, sourcesData]);
  reactExports.useEffect(() => {
    return () => {
      if (isNative) clearDiscordRpc();
    };
  }, [isNative]);
  const errorThrottleRef = reactExports.useRef(0);
  const forceRefreshLockUntilRef = reactExports.useRef(0);
  const forceRefreshInFlightRef = reactExports.useRef(false);
  const attemptedFailoverRef = reactExports.useRef(/* @__PURE__ */ new Set());
  const sourceRefreshThrottleRef = reactExports.useRef(0);
  const sourceRefreshInFlightRef = reactExports.useRef(false);
  const sourceRefreshHandlerRef = reactExports.useRef(null);
  const requestSourceRefresh = reactExports.useCallback((reason, options) => {
    const handler = sourceRefreshHandlerRef.current;
    if (!handler) return;
    if (options == null ? void 0 : options.purgeProviderFallback) {
      markProviderSourcesExpired(reason);
    }
    const now = Date.now();
    if (sourceRefreshInFlightRef.current) return;
    if (now - sourceRefreshThrottleRef.current < 15e3) return;
    pendingPlaybackCommitRef.current = true;
    sourceRefreshThrottleRef.current = now;
    sourceRefreshInFlightRef.current = true;
    setSourcePreflightError(`Refreshing stream links (${reason})...`);
    void handler().finally(() => {
      sourceRefreshInFlightRef.current = false;
    });
  }, [setSourcePreflightError]);
  const moveToNextVisibleSource = reactExports.useCallback((blockedUrl) => {
    if (!Array.isArray(visibleSources) || visibleSources.length === 0) return false;
    const blockedNormalized = normalizePlaybackSourceUrl(blockedUrl || (activePlaybackSource == null ? void 0 : activePlaybackSource.url) || "");
    const candidates = visibleSources.filter((source) => !isPlaybackSourceBlocked(source == null ? void 0 : source.url));
    if (candidates.length <= 1) return false;
    const currentIndex = candidates.findIndex((source) => {
      const normalized = normalizePlaybackSourceUrl(source == null ? void 0 : source.url);
      return blockedNormalized ? normalized === blockedNormalized : normalized === normalizePlaybackSourceUrl((activePlaybackSource == null ? void 0 : activePlaybackSource.url) || "");
    });
    let nextSource = null;
    if (currentIndex >= 0) {
      for (let offset = 1; offset < candidates.length; offset += 1) {
        const candidate = candidates[(currentIndex + offset) % candidates.length];
        if (!(candidate == null ? void 0 : candidate.url)) continue;
        if (blockedNormalized && normalizePlaybackSourceUrl(candidate.url) === blockedNormalized) continue;
        nextSource = candidate;
        break;
      }
    } else {
      nextSource = candidates[0] || null;
    }
    if (!(nextSource == null ? void 0 : nextSource.langCode)) return false;
    pendingPlaybackCommitRef.current = true;
    setSelectedProviderServerKey(null);
    selectRegularServer(-4);
    setSelectedLangCode(nextSource.langCode);
    setPreferredServerName(nextSource.providerName || null);
    setPreferredSourceUrl(nextSource.url || null);
    setLockedSourceUrl(nextSource.url || null);
    setRefererRetryIndex(0);
    return true;
  }, [visibleSources, normalizePlaybackSourceUrl, activePlaybackSource == null ? void 0 : activePlaybackSource.url, isPlaybackSourceBlocked, selectRegularServer]);
  const handleVideoError = reactExports.useCallback((context) => {
    var _a2, _b2;
    const now = Date.now();
    if (now - errorThrottleRef.current < 2e3) return;
    errorThrottleRef.current = now;
    if (!currentServer) return;
    if (failoverTimeoutRef.current !== null) return;
    const statusCode = Number((context == null ? void 0 : context.statusCode) || 0);
    const reason = String((context == null ? void 0 : context.reason) || "").toLowerCase();
    const isExpiredStream = statusCode === 410;
    const isForbiddenStream = statusCode === 403;
    const isMissingStream = statusCode === 404;
    const isManifestFailure = reason.includes("manifest");
    const isEmbedHostFailure = reason.startsWith("embed-");
    const isCodecBufferFailure = reason.includes("codec") || reason.includes("buffer") || reason.includes("stalled") || reason.includes("decoder") || reason.includes("unsupported") || reason.includes("native-decode-error") || reason.includes("native-playback-not-supported") || reason.includes("native-decoder-unsupported-config") || reason.includes("fatal-media-buffer") || reason.includes("hls-buffer-codec-loop");
    const comboKey = comboFailureKey(animeId, decodedEpisodeId, currentServer.serverName);
    recordSourceFailure(comboKey);
    recordProviderQualityOutcome(
      (activePlaybackSource == null ? void 0 : activePlaybackSource.providerName) || (activePlaybackSource == null ? void 0 : activePlaybackSource.server) || currentServer.serverName,
      category,
      activePlaybackSource == null ? void 0 : activePlaybackSource.quality,
      false
    );
    logPlaybackTelemetry({
      serverName: currentServer.serverName,
      userId: user == null ? void 0 : user.id,
      metadata: {
        statusCode: context == null ? void 0 : context.statusCode,
        reason: context == null ? void 0 : context.reason
      }
    });
    const candidateReferers = activePlaybackSource == null ? void 0 : activePlaybackSource.refererCandidates;
    const refererVariants = (candidateReferers == null ? void 0 : candidateReferers.length) ? candidateReferers : getRefererVariants(activePlaybackHeaders == null ? void 0 : activePlaybackHeaders.Referer);
    if (!isExpiredStream && !isCodecBufferFailure && ((activePlaybackSource == null ? void 0 : activePlaybackSource.isM3U8) || ((_a2 = activePlaybackSource == null ? void 0 : activePlaybackSource.url) == null ? void 0 : _a2.includes(".m3u8"))) && refererRetryIndex < refererVariants.length - 1) {
      pendingPlaybackCommitRef.current = true;
      setRefererRetryIndex((v) => v + 1);
      return;
    }
    if (isExpiredStream || isForbiddenStream || isMissingStream || isManifestFailure || isCodecBufferFailure || isEmbedHostFailure) {
      const ttlMs = isExpiredStream ? 2 * 60 * 1e3 : isCodecBufferFailure ? 3 * 60 * 1e3 : isEmbedHostFailure ? 5 * 60 * 1e3 : 90 * 1e3;
      blockPlaybackSourceUrl(activePlaybackSource == null ? void 0 : activePlaybackSource.url, ttlMs);
      setLockedSourceUrl(null);
      pendingPlaybackCommitRef.current = true;
      setCommittedPlaybackSource(null);
      setCommittedPlaybackHeaders(null);
      setRefererRetryIndex(0);
      const movedToNextSource = moveToNextVisibleSource(activePlaybackSource == null ? void 0 : activePlaybackSource.url);
      if (movedToNextSource) {
        if (isCodecBufferFailure || isManifestFailure) {
          requestSourceRefresh("codec/manifest failure", { purgeProviderFallback: false });
        }
        return;
      }
      requestSourceRefresh(
        isExpiredStream ? "expired stream (410)" : isCodecBufferFailure ? "codec decode error" : isManifestFailure ? "manifest error" : isEmbedHostFailure ? `embed host down (${reason})` : `stream error (${statusCode})`,
        { purgeProviderFallback: isExpiredStream }
      );
    }
    if (shouldAutoSkipSource(comboKey)) {
      setFailedServers((prev) => {
        const copy = new Set(prev);
        copy.add(currentServer.serverName);
        return copy;
      });
    }
    setFailedServers((prev) => {
      const copy = new Set(prev);
      copy.add(currentServer.serverName);
      return copy;
    });
    attemptedFailoverRef.current.add(currentServer.serverName);
    if (availableServers.length === 0) return;
    let nextIndex = -1;
    for (let offset = 1; offset <= availableServers.length; offset += 1) {
      const candidateIndex = (Math.max(0, selectedServerIndex) + offset) % availableServers.length;
      const candidateName = (_b2 = availableServers[candidateIndex]) == null ? void 0 : _b2.serverName;
      if (!candidateName) continue;
      if (attemptedFailoverRef.current.has(candidateName)) continue;
      if (failedServers.has(candidateName)) continue;
      nextIndex = candidateIndex;
      break;
    }
    if (nextIndex === -1) {
      requestSourceRefresh("all servers failed", { purgeProviderFallback: true });
      attemptedFailoverRef.current.clear();
      nextIndex = availableServers.findIndex((server) => server.serverName !== currentServer.serverName);
    }
    if (nextIndex !== -1) {
      failoverTimeoutRef.current = window.setTimeout(() => {
        setSelectedProviderServerKey(null);
        selectRegularServer(nextIndex);
        setRefererRetryIndex(0);
        failoverTimeoutRef.current = null;
      }, 3e3);
    }
  }, [currentServer, availableServers, selectedServerIndex, failedServers, animeId, decodedEpisodeId, category, user == null ? void 0 : user.id, refererRetryIndex, activePlaybackHeaders == null ? void 0 : activePlaybackHeaders.Referer, activePlaybackSource == null ? void 0 : activePlaybackSource.isM3U8, activePlaybackSource == null ? void 0 : activePlaybackSource.url, activePlaybackSource == null ? void 0 : activePlaybackSource.providerName, activePlaybackSource == null ? void 0 : activePlaybackSource.server, activePlaybackSource == null ? void 0 : activePlaybackSource.quality, selectRegularServer, requestSourceRefresh, blockPlaybackSourceUrl, moveToNextVisibleSource]);
  reactExports.useEffect(() => {
    attemptedFailoverRef.current.clear();
    if (failoverTimeoutRef.current !== null) {
      window.clearTimeout(failoverTimeoutRef.current);
      failoverTimeoutRef.current = null;
    }
  }, [selectedServerIndex]);
  reactExports.useEffect(() => {
    return () => {
      if (failoverTimeoutRef.current !== null) {
        window.clearTimeout(failoverTimeoutRef.current);
        failoverTimeoutRef.current = null;
      }
    };
  }, []);
  reactExports.useEffect(() => {
    if (sourceReady || !activePlaybackSource) return;
    const t = setTimeout(() => {
      handleVideoError();
    }, 200);
    return () => clearTimeout(t);
  }, [sourceReady, activePlaybackSource == null ? void 0 : activePlaybackSource.url, handleVideoError]);
  const handleServerSwitch = () => {
    if (failoverTimeoutRef.current !== null) {
      window.clearTimeout(failoverTimeoutRef.current);
      failoverTimeoutRef.current = null;
    }
    const nextIndex = (selectedServerIndex + 1) % availableServers.length;
    selectRegularServer(nextIndex);
    setSelectedProviderServerKey(null);
    if (availableServers[nextIndex]) {
      setPreferredServer(animeId, category, availableServers[nextIndex].serverName);
    }
  };
  const handleRetryCurrentServer = reactExports.useCallback(() => {
    if (failoverTimeoutRef.current !== null) {
      window.clearTimeout(failoverTimeoutRef.current);
      failoverTimeoutRef.current = null;
    }
    const currentServerName = currentServer == null ? void 0 : currentServer.serverName;
    if (!currentServerName) return;
    attemptedFailoverRef.current.delete(currentServerName);
    setFailedServers((prev) => {
      if (!prev.has(currentServerName)) return prev;
      const copy = new Set(prev);
      copy.delete(currentServerName);
      return copy;
    });
  }, [currentServer == null ? void 0 : currentServer.serverName]);
  const handleForceRefreshSources = reactExports.useCallback(async () => {
    const now = Date.now();
    if (forceRefreshInFlightRef.current) return;
    if (fetchingSources) return;
    if (now < forceRefreshLockUntilRef.current) return;
    forceRefreshLockUntilRef.current = now + 3e3;
    forceRefreshInFlightRef.current = true;
    setFailedServers(/* @__PURE__ */ new Set());
    setTorrentRetryTrigger((prev) => prev + 1);
    ue.success("Refreshing servers...");
    try {
      clearCachedCombinedSourcesByEpisodeAndCategory(decodedEpisodeId, category);
      await queryClient.invalidateQueries({
        predicate: (query) => {
          const key = query.queryKey;
          return (key == null ? void 0 : key[0]) === "combined-sources" && (key == null ? void 0 : key[1]) === decodedEpisodeId && (key == null ? void 0 : key[5]) === category;
        }
      });
      await refetchSources();
    } finally {
      forceRefreshInFlightRef.current = false;
    }
  }, [decodedEpisodeId, category, queryClient, refetchSources, fetchingSources]);
  reactExports.useEffect(() => {
    sourceRefreshHandlerRef.current = handleForceRefreshSources;
  }, [handleForceRefreshSources]);
  const handleCategoryChange = reactExports.useCallback((nextCategory) => {
    if (nextCategory === category) return;
    if (failoverTimeoutRef.current !== null) {
      window.clearTimeout(failoverTimeoutRef.current);
      failoverTimeoutRef.current = null;
    }
    trackEvent("watch_category_switch", {
      animeId,
      episodeId: decodedEpisodeId,
      from: category,
      to: nextCategory
    });
    logPlaybackTelemetry("category_switch", {
      userId: user == null ? void 0 : user.id
    });
    setCategory(nextCategory);
    selectRegularServer(-1);
    setSelectedProviderServerKey(null);
    setRefererRetryIndex(0);
    setSourcePreflightError(null);
  }, [animeId, decodedEpisodeId, category, user == null ? void 0 : user.id, selectRegularServer]);
  const handleProgressUpdate = reactExports.useCallback((progressSeconds, durationSeconds, completed) => {
    if (Number.isFinite(progressSeconds) && progressSeconds > 0) {
      lastPlaybackTimeRef.current = progressSeconds;
    }
    if (!animeData || !currentEpisode) return;
    try {
      if (user) {
        updateWatchHistory.mutateAsync({
          animeId,
          animeName: animeData.info.name,
          animePoster: animeData.info.poster,
          episodeId: decodedEpisodeId,
          episodeNumber: currentEpisode.number,
          progressSeconds,
          durationSeconds,
          completed: !!completed,
          malId: (sourcesData == null ? void 0 : sourcesData.malID) || (animeData == null ? void 0 : animeData.moreInfo.malId) || null,
          anilistId: (sourcesData == null ? void 0 : sourcesData.anilistID) || (animeData == null ? void 0 : animeData.moreInfo.anilistId) || null,
          isLastEpisode: !nextEpisode
        }).catch((e) => console.warn("Failed to save progress to DB:", e));
      }
      updateLocalContinueWatching({
        animeId,
        animeName: animeData.info.name,
        animePoster: (animeData == null ? void 0 : animeData.info.poster) || "",
        episodeId: decodedEpisodeId,
        episodeNumber: currentEpisode.number,
        progressSeconds,
        durationSeconds: durationSeconds || 0,
        serverName: currentServer == null ? void 0 : currentServer.serverName,
        category,
        languageCode: selectedLangCode || void 0
        // Save WatchAnimeWorld language preference
      });
    } catch (e) {
      console.warn("Failed to save progress:", e);
    }
  }, [user, animeData, currentEpisode, animeId, decodedEpisodeId, updateWatchHistory, currentServer, category, selectedLangCode]);
  const handleEpisodeChange = (epId) => {
    if (failoverTimeoutRef.current !== null) {
      window.clearTimeout(failoverTimeoutRef.current);
      failoverTimeoutRef.current = null;
    }
    setFailedServers(/* @__PURE__ */ new Set());
    setSelectedProviderServerKey(null);
    if (isOfflineMode) {
      navigate(`/watch/${encodeURIComponent(epId)}?offline=true&path=${encodeURIComponent(offlinePath)}`);
    } else {
      navigate(`/watch/${encodeURIComponent(epId)}`);
    }
  };
  reactExports.useEffect(() => {
    if (!torrentSessionId || !torrentServiceAvailable) return;
    const handleBeforeUnload = (e) => {
      var _a2, _b2;
      const pref = localStorage.getItem("tatakai_torrent_bg_behavior") || "prompt";
      if (pref === "keep") return;
      if (pref === "stop") {
        (_b2 = (_a2 = window.tatakaiRuntime) == null ? void 0 : _a2.stopTorrentSession) == null ? void 0 : _b2.call(_a2, torrentSessionId);
        updateLocalTorrentSessionHistory(torrentSessionId, {
          status: "stopped",
          endedAt: (/* @__PURE__ */ new Date()).toISOString(),
          updatedAt: (/* @__PURE__ */ new Date()).toISOString()
        });
        return;
      }
      e.preventDefault();
      e.returnValue = "You have an active torrent session. Do you want to keep it running in the background?";
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [torrentSessionId, torrentServiceAvailable]);
  reactExports.useEffect(() => {
    if (!torrentSessionId || !torrentServiceAvailable) return;
    return () => {
      var _a2, _b2;
      const pref = localStorage.getItem("tatakai_torrent_bg_behavior") || "prompt";
      if (pref === "keep") return;
      if (pref === "stop") {
        (_b2 = (_a2 = window.tatakaiRuntime) == null ? void 0 : _a2.stopTorrentSession) == null ? void 0 : _b2.call(_a2, torrentSessionId);
        updateLocalTorrentSessionHistory(torrentSessionId, {
          status: "stopped",
          endedAt: (/* @__PURE__ */ new Date()).toISOString(),
          updatedAt: (/* @__PURE__ */ new Date()).toISOString()
        });
        return;
      }
      ue.info("Torrent session is running in the background. You can stop it from the Home page or Settings.");
    };
  }, [torrentSessionId, torrentServiceAvailable]);
  reactExports.useEffect(() => {
    setRefererRetryIndex(0);
  }, [selectedSource == null ? void 0 : selectedSource.url]);
  reactExports.useEffect(() => {
    if (!sourceReady || !currentServer) return;
    const comboKey = comboFailureKey(decodedEpisodeId, currentServer.serverName, category);
    clearSourceFailure(comboKey);
  }, [sourceReady, currentServer == null ? void 0 : currentServer.serverName, animeId, decodedEpisodeId, category]);
  const handleTorrentNativeError = reactExports.useCallback((message) => {
    try {
      logPlaybackTelemetry({
        type: "source_failure",
        animeId,
        episodeId: decodedEpisodeId,
        category,
        serverName: (currentServer == null ? void 0 : currentServer.serverName) || "torrent-session",
        ok: false,
        userId: user == null ? void 0 : user.id,
        metadata: { reason: message || "native-player-error", torrent: true }
      });
    } catch {
    }
  }, [animeId, decodedEpisodeId, category, currentServer == null ? void 0 : currentServer.serverName, user == null ? void 0 : user.id]);
  const handleEpisodeEnd = () => {
    var _a2;
    if (settings.autoNextEpisode && (nextEpisode == null ? void 0 : nextEpisode.episodeId)) {
      handleEpisodeChange(nextEpisode.episodeId);
      return;
    }
    if (torrentServiceAvailable && torrentSessionId && ((_a2 = window.tatakaiRuntime) == null ? void 0 : _a2.stopTorrentSession)) {
      const keepCompletedFile = Boolean((torrentLiveStats == null ? void 0 : torrentLiveStats.done) || torrentProgressPercent >= 100);
      const destroyStore = Boolean(optimizeTorrentStorage && !keepCompletedFile);
      void window.tatakaiRuntime.stopTorrentSession(torrentSessionId, { destroyStore }).catch(() => {
      });
    }
    if (torrentSessionId) {
      updateLocalTorrentSessionHistory(torrentSessionId, {
        status: "completed",
        endedAt: (/* @__PURE__ */ new Date()).toISOString(),
        updatedAt: (/* @__PURE__ */ new Date()).toISOString(),
        progress: 100
      });
    }
    setShowReviewPopup(true);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background text-foreground overflow-x-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Background, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Sidebar, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: cn(
      "relative z-10 pr-4 md:pr-6 py-4 md:py-6 max-w-[1800px] mx-auto pb-24 md:pb-6",
      isDesktop ? "pl-4 md:pl-6" : "pl-4 md:pl-32"
    ), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2 mb-4 md:mb-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              onClick: () => isOfflineMode ? navigate("/offline") : navigate(`/anime/${animeId}`),
              className: "flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-5 h-5 group-hover:-translate-x-1 transition-transform" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: "Back" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(OpenInAppButton, { className: "hidden sm:inline-flex" })
        ] }),
        animeData && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0 text-right flex flex-col items-end gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground text-sm md:text-base truncate block", children: (animeData == null ? void 0 : animeData.info.name) || (offlineManifest == null ? void 0 : offlineManifest.animeName) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-4", children: viewCount !== void 0 && viewCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground flex items-center justify-end gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-3 h-3" }),
            formatViewCount(viewCount),
            " views"
          ] }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: cn(
        "flex flex-col gap-4 md:gap-6",
        !isGenericTorrent && "xl:grid xl:grid-cols-12"
      ), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: cn(
          "space-y-4 md:space-y-6",
          !isGenericTorrent ? "xl:col-span-9" : "w-full"
        ), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-xl md:rounded-2xl overflow-hidden border border-border/30 bg-card/60", children: (activePlaybackSource == null ? void 0 : activePlaybackSource.isEmbed) ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            EmbedPlayer,
            {
              url: activePlaybackSource.url,
              poster: animeData == null ? void 0 : animeData.info.poster,
              language: activePlaybackSource.language,
              referer: activePlaybackHeaders == null ? void 0 : activePlaybackHeaders.Referer,
              onError: handleVideoError
            }
          ) : isMobileApp && ((activePlaybackSource == null ? void 0 : activePlaybackSource.sourceType) === "torrent" || (activePlaybackSource == null ? void 0 : activePlaybackSource.sourceType) === "debrid") ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            NativeTorrentPlayer,
            {
              url: activePlaybackSource.url,
              streamKind: activePlaybackSource.sourceType === "debrid" ? "debrid" : "torrent",
              title: animeData == null ? void 0 : animeData.info.name,
              poster: animeData == null ? void 0 : animeData.info.poster,
              subtitles: normalizedSubtitles,
              preferredAudioLanguage: category === "dub" ? "en" : "ja",
              initialSeekSeconds,
              introWindow: (sourceDataForPlayback == null ? void 0 : sourceDataForPlayback.intro) || null,
              outroWindow: (sourceDataForPlayback == null ? void 0 : sourceDataForPlayback.outro) || null,
              torrentStats: activePlaybackSource.sourceType === "torrent" ? torrentLiveStats : null,
              onProgressUpdate: handleProgressUpdate,
              onEpisodeEnd: handleEpisodeEnd,
              onBack: () => navigate(-1),
              onError: handleTorrentNativeError
            }
          ) : isMobileApp ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            MobileVideoPlayer,
            {
              sources: isOfflineMode ? offlineSources : playbackSources,
              subtitles: isOfflineMode ? offlineSubtitles : normalizedSubtitles,
              headers: activePlaybackHeaders,
              poster: (animeData == null ? void 0 : animeData.info.poster) || (isOfflineMode ? (offlineManifest == null ? void 0 : offlineManifest.poster) || (offlinePath ? toLocalFileUrl(joinLocalPath(offlinePath, "poster.jpg")) : void 0) : void 0),
              onError: handleVideoError,
              onServerSwitch: handleServerSwitch,
              onRetryCurrentServer: handleRetryCurrentServer,
              isLoading: isOfflineMode ? false : playbackLoading,
              serverName: activeServerDisplayName,
              malId: (sourcesData == null ? void 0 : sourcesData.malID) || (animeData == null ? void 0 : animeData.moreInfo.malId),
              episodeNumber: (currentEpisode == null ? void 0 : currentEpisode.number) || (isOfflineMode ? (_c = offlineManifest == null ? void 0 : offlineManifest.episodes.find((e) => e.id === decodedEpisodeId)) == null ? void 0 : _c.number : void 0),
              introWindow: (sourceDataForPlayback == null ? void 0 : sourceDataForPlayback.intro) || null,
              outroWindow: (sourceDataForPlayback == null ? void 0 : sourceDataForPlayback.outro) || null,
              initialSeekSeconds,
              onProgressUpdate: handleProgressUpdate,
              animeId,
              animeName: (animeData == null ? void 0 : animeData.info.name) || (isOfflineMode ? offlineManifest == null ? void 0 : offlineManifest.animeName : ""),
              animePoster: (animeData == null ? void 0 : animeData.info.poster) || (isOfflineMode ? (offlineManifest == null ? void 0 : offlineManifest.poster) || (offlinePath ? toLocalFileUrl(joinLocalPath(offlinePath, "poster.jpg")) : void 0) : void 0),
              episodeTitle: (currentEpisode == null ? void 0 : currentEpisode.title) || (isOfflineMode ? (_d = offlineManifest == null ? void 0 : offlineManifest.episodes.find((e) => e.id === decodedEpisodeId)) == null ? void 0 : _d.title : void 0),
              episodeId: decodedEpisodeId,
              onEpisodeEnd: handleEpisodeEnd,
              onBack: () => navigate(-1),
              hideTimelineUi: Boolean(torrentSessionId && !torrentVerified),
              isOffline: isOfflineMode,
              sourceType: activePlaybackSource == null ? void 0 : activePlaybackSource.sourceType,
              torrentUrl: String((activePlaybackSource == null ? void 0 : activePlaybackSource.sourceType) || "").toLowerCase() === "torrent" || String((activePlaybackSource == null ? void 0 : activePlaybackSource.sourceType) || "").toLowerCase() === "debrid" || String((activePlaybackSource == null ? void 0 : activePlaybackSource.url) || "").startsWith("magnet:") ? torrentLiveStats == null ? void 0 : torrentLiveStats.rawUrl : void 0
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
            VideoPlayer,
            {
              sources: isOfflineMode ? offlineSources : playbackSources,
              subtitles: isOfflineMode ? offlineSubtitles : normalizedSubtitles,
              headers: activePlaybackHeaders,
              poster: (animeData == null ? void 0 : animeData.info.poster) || (isOfflineMode ? (offlineManifest == null ? void 0 : offlineManifest.poster) || (offlinePath ? toLocalFileUrl(joinLocalPath(offlinePath, "poster.jpg")) : void 0) : void 0),
              onError: handleVideoError,
              onServerSwitch: handleServerSwitch,
              onRetryCurrentServer: handleRetryCurrentServer,
              isLoading: isOfflineMode ? false : playbackLoading,
              serverName: activeServerDisplayName,
              malId: (sourcesData == null ? void 0 : sourcesData.malID) || (animeData == null ? void 0 : animeData.moreInfo.malId),
              episodeNumber: (currentEpisode == null ? void 0 : currentEpisode.number) || (isOfflineMode ? (_e = offlineManifest == null ? void 0 : offlineManifest.episodes.find((e) => e.id === decodedEpisodeId)) == null ? void 0 : _e.number : void 0),
              introWindow: (sourceDataForPlayback == null ? void 0 : sourceDataForPlayback.intro) || null,
              outroWindow: (sourceDataForPlayback == null ? void 0 : sourceDataForPlayback.outro) || null,
              initialSeekSeconds,
              viewCount,
              onProgressUpdate: handleProgressUpdate,
              animeId,
              animeName: (animeData == null ? void 0 : animeData.info.name) || (isOfflineMode ? offlineManifest == null ? void 0 : offlineManifest.animeName : ""),
              animePoster: (animeData == null ? void 0 : animeData.info.poster) || (isOfflineMode ? (offlineManifest == null ? void 0 : offlineManifest.poster) || (offlinePath ? toLocalFileUrl(joinLocalPath(offlinePath, "poster.jpg")) : void 0) : void 0),
              episodeTitle: (currentEpisode == null ? void 0 : currentEpisode.title) || (isOfflineMode ? (_f = offlineManifest == null ? void 0 : offlineManifest.episodes.find((e) => e.id === decodedEpisodeId)) == null ? void 0 : _f.title : void 0),
              episodeId: decodedEpisodeId,
              onEpisodeEnd: handleEpisodeEnd,
              nextEpisodeTitle: (nextEpisode == null ? void 0 : nextEpisode.title) || void 0,
              nextEpisodeNumber: (nextEpisode == null ? void 0 : nextEpisode.number) ?? void 0,
              nextEpisodeThumbnail: (animeData == null ? void 0 : animeData.info.poster) || void 0,
              isTimelineLocked: torrentTimelineLocked,
              timelineLockReason: "Torrent seeking unlocks after the file has fully downloaded and verified.",
              hideTimelineUi: Boolean(torrentSessionId && !torrentVerified),
              isOffline: isOfflineMode,
              torrentStats: torrentLiveStats || void 0,
              torrentSessionId: torrentSessionId || void 0,
              onTorrentRepair: async () => {
                var _a2, _b2;
                try {
                  await ((_b2 = (_a2 = window.tatakaiRuntime) == null ? void 0 : _a2.reannounceTorrent) == null ? void 0 : _b2.call(_a2, torrentSessionId));
                  ue.success("Repair requested");
                } catch (e) {
                  ue.error("Repair failed");
                }
              },
              onTorrentStop: async () => {
                try {
                  leaveTorrentSession();
                  ue.success("Torrent stopped");
                } catch (e) {
                  ue.error("Failed to stop torrent");
                }
              }
            }
          ) }),
          torrentTakeoverActive && /* @__PURE__ */ jsxRuntimeExports.jsx(
            TorrentSessionPanel,
            {
              sessionId: torrentSessionId,
              stats: torrentLiveStats,
              progressPercent: torrentProgressPercent,
              verified: torrentVerified,
              loading: torrentPlaybackLoading,
              error: torrentPlaybackError,
              downloadPath: torrentDownloadPath,
              optimizeStorage: optimizeTorrentStorage,
              onRepair: async () => {
                var _a2, _b2;
                try {
                  await ((_b2 = (_a2 = window.tatakaiRuntime) == null ? void 0 : _a2.reannounceTorrent) == null ? void 0 : _b2.call(_a2, torrentSessionId));
                  ue.success("Looking for more peers");
                } catch {
                  ue.error("Repair failed");
                }
              },
              onStop: () => {
                leaveTorrentSession();
                ue.success("Torrent stopped");
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-lg md:text-2xl font-bold", children: isGenericTorrent ? (torrentLiveStats == null ? void 0 : torrentLiveStats.name) || "Torrent Content" : `Episode ${(currentEpisode == null ? void 0 : currentEpisode.number) || (isOfflineMode ? (_g = offlineManifest == null ? void 0 : offlineManifest.episodes.find((e) => e.id === decodedEpisodeId)) == null ? void 0 : _g.number : "?")}` }),
              !isGenericTorrent && (currentEpisode == null ? void 0 : currentEpisode.title) && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-1 line-clamp-1", children: currentEpisode.title })
            ] }),
            !isGenericTorrent && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 w-full sm:w-auto", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-1 mr-2 px-2 border-r border-white/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  onClick: () => setIsReportModalOpen(true),
                  className: "p-2 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors",
                  title: "Report issue",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Flag, { className: "w-4 h-4" })
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 w-full sm:w-auto", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    onClick: () => prevEpisode && handleEpisodeChange(prevEpisode.episodeId),
                    disabled: !prevEpisode,
                    className: "flex-1 sm:flex-none h-10 px-3 md:px-4 rounded-xl bg-muted hover:bg-muted/80 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-all text-sm",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "w-4 h-4" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Prev" })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    onClick: () => nextEpisode && handleEpisodeChange(nextEpisode.episodeId),
                    disabled: !nextEpisode,
                    className: "flex-1 sm:flex-none h-10 px-3 md:px-4 rounded-xl bg-primary hover:bg-primary/80 text-primary-foreground disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-all text-sm",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Next" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4" })
                    ]
                  }
                )
              ] })
            ] })
          ] }),
          !isOfflineMode && !isGenericTorrent && /* @__PURE__ */ jsxRuntimeExports.jsx(GlassPanel, { className: "p-4 md:p-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4 md:gap-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs md:text-sm font-medium text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Volume2, { className: "w-4 h-4" }),
                "Audio"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  onClick: () => handleCategoryChange("sub"),
                  className: `h-9 md:h-10 px-4 md:px-5 rounded-xl flex items-center gap-2 font-medium transition-all text-sm ${category === "sub" ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25" : "bg-muted hover:bg-muted/80"}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Captions, { className: "w-4 h-4" }),
                    "Sub"
                  ]
                }
              ) }),
              sourcePreflightError && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-amber-400 mt-1", children: sourcePreflightError })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs md:text-sm font-medium text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Server, { className: "w-4 h-4" }),
                "Server",
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    onClick: handleForceRefreshSources,
                    title: "Fetch more servers",
                    className: "p-1 hover:bg-muted rounded-md transition-colors",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: `w-3.5 h-3.5 ${loadingSources || fetchingSources ? "animate-spin" : ""}` })
                  }
                ),
                isDeveloperMode && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    onClick: () => setShowSourceDebug((v) => !v),
                    title: "Toggle source debug",
                    className: `p-1 rounded-md transition-colors ${showSourceDebug ? "bg-primary/20 text-primary" : "hover:bg-muted text-muted-foreground"}`,
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-3.5 h-3.5" })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ml-auto flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-full", children: [
                    providerSourceCount,
                    " sources"
                  ] }),
                  (loadingSources || fetchingSources) && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs bg-amber-500/15 text-amber-400 px-2 py-0.5 rounded-full", children: providerSourceCount > 0 ? "Adding more servers..." : "Finding servers..." }),
                  newProviderCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs bg-emerald-500/15 text-emerald-400 px-2 py-0.5 rounded-full", children: [
                    "+",
                    newProviderCount,
                    " new"
                  ] }),
                  !(loadingSources || fetchingSources) && providerFeedUpdatedAt && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full", children: "Updated" }),
                  hasWatchAnimeWorldAvailable && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { className: "w-3 h-3" }),
                    "Multi-Language"
                  ] })
                ] })
              ] }),
              loadingServers ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2", children: Array.from({ length: 3 }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-9 w-20 rounded-xl" }, i)) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4", children: [
                availableServers.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: availableServers.map((server, idx) => {
                  const serverLabel = uniqueLabelMap.labels[String(server.serverName)] || getSimpleServerDisplayName(server.serverName, server.displayName || server.providerName || server.serverName);
                  if (!server.isProviderServer && serverLabel === "TatakaiAPI" && availableServers.length > 1) return null;
                  const serverSource = visibleSources.length ? selectSourceForServer(visibleSources, server.serverName) : null;
                  const nextEstimate = getNextEpisodeEstimate(serverSource);
                  const comboKey = comboFailureKey(decodedEpisodeId, server.serverName, category);
                  const failCount = getSourceFailureCount(comboKey);
                  const healthScore = getSourceHealthScore(server.serverName);
                  const workingState = failCount >= 2 || failedServers.has(server.serverName) ? "Not working" : "Working";
                  const serverDescription = `${workingState} • Health ${healthScore}/100 • Fails ${failCount} • Source ${server.serverName}${(serverSource == null ? void 0 : serverSource.url) ? ` • ${getUrlHost(serverSource.url)}` : ""}`;
                  const providerSourceCount2 = server.sourceCount ?? visibleSources.filter((s) => String(s.server || s.providerKey || s.providerName || "") === String(server.serverName)).length;
                  const serverHoverRows = buildSourceHoverRows(serverSource || server, { count: providerSourceCount2 });
                  const serverRealProvider = (serverSource == null ? void 0 : serverSource.providerName) || server.providerName || server.serverName;
                  const serverRealKey = (serverSource == null ? void 0 : serverSource.providerKey) || server.providerKey;
                  return /* @__PURE__ */ jsxRuntimeExports.jsx(TooltipProvider, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Tooltip, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(TooltipTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "button",
                      {
                        onClick: () => {
                          selectRegularServer(idx);
                          setSelectedLangCode(null);
                          setSelectedProviderServerKey(null);
                          setPreferredServerName(null);
                          setPreferredSourceUrl(null);
                          setFailedServers(/* @__PURE__ */ new Set());
                          setPreferredServer(server.serverName);
                          setRefererRetryIndex(0);
                        },
                        title: serverDescription,
                        className: `h-9 px-3 md:px-4 rounded-xl font-medium transition-all text-sm flex items-center justify-center gap-1.5 ${idx === selectedServerIndex ? "bg-foreground text-background shadow-lg" : failedServers.has(server.serverName) ? "bg-destructive/20 text-destructive" : getSourceTypeColorClass(serverSource || server, { isProviderServer: server.isProviderServer })}`,
                        children: [
                          serverLabel,
                          isVerifiedProvider(server.providerKey || server.providerName, server.serverName) && /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3 h-3 text-primary animate-in zoom-in duration-300" }),
                          failedServers.has(server.serverName) && " ✗"
                        ]
                      }
                    ) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(TooltipContent, { side: "top", className: "max-w-xs bg-background/95 backdrop-blur-xl border-white/10 shadow-2xl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5 p-1", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold", children: serverLabel }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] text-muted-foreground truncate max-w-[10rem]", title: serverRealKey ? `${serverRealProvider} (${serverRealKey})` : serverRealProvider, children: [
                          serverRealProvider,
                          serverRealKey ? ` · ${serverRealKey}` : ""
                        ] })
                      ] }),
                      serverHoverRows.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-x-3 gap-y-0.5", children: serverHoverRows.map((row) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2 text-[10px]", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: row.label }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium truncate max-w-[8rem]", title: row.value, children: row.value })
                      ] }, row.label)) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-muted-foreground border-t border-white/10 pt-1", children: serverDescription }),
                      nextEstimate && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-[10px] text-primary", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3 h-3" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                          "Next ",
                          (serverSource == null ? void 0 : serverSource.language) || "episode",
                          ": ",
                          nextEstimate
                        ] })
                      ] })
                    ] }) })
                  ] }) }, server.serverId);
                }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  TorrentSourcePanel,
                  {
                    sources: torrentSources,
                    activeUrl: (debridPlaybackSource == null ? void 0 : debridPlaybackSource.id) || (torrentPlaybackSource == null ? void 0 : torrentPlaybackSource.url),
                    canPlayTorrent: torrentServiceAvailable || debridOrchestrator.hasActiveProvider(),
                    onSelect: (source) => {
                      const contextualSource = {
                        ...source,
                        episodeNumber: currentEpisode == null ? void 0 : currentEpisode.number
                      };
                      if (debridOrchestrator.hasActiveProvider()) {
                        setSelectedLangCode(source.langCode);
                        setPreferredServerName(source.providerName || null);
                        void playTorrentSource(contextualSource);
                        return;
                      }
                      setPendingTorrentSource(contextualSource);
                    }
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  SourceLanguageTabs,
                  {
                    sources: visibleSources.filter(
                      (src) => {
                        var _a2;
                        return !isOfficialSource(src) && !isTorrentSource(src) && !!src.providerName && src.providerName !== "TatakaiAPI" && !((_a2 = src.langCode) == null ? void 0 : _a2.startsWith("marketplace-"));
                      }
                    ),
                    activeLanguage: activeSourceLanguage,
                    onLanguageChange: setActiveSourceLanguage
                  }
                ),
                Object.entries(filteredLanguageGroups).map(([lang, sources]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground font-medium flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-1.5 h-1.5 rounded-full bg-primary" }),
                    lang,
                    " Sources"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: sources.map((source, sIdx) => {
                    var _a2;
                    const isSelected = selectedServerIndex === -4 && (preferredSourceUrl ? preferredSourceUrl === source.url : selectedLangCode === source.langCode && preferredServerName === source.providerName);
                    const nextEstimate = getNextEpisodeEstimate(source);
                    const label = getSimpleSourceLabel(source, `${lang}-${sIdx}`);
                    const sourceServerName = source.server || source.providerKey || source.langCode || source.providerName || `source-${sIdx}`;
                    const sourceComboKey = comboFailureKey(decodedEpisodeId, sourceServerName, category);
                    const failCount = getSourceFailureCount(sourceComboKey);
                    const healthScore = getSourceHealthScore(sourceServerName);
                    const workingState = failCount >= 2 ? "Not working" : "Working";
                    const hoverInfo = `${workingState} • Health ${healthScore}/100 • Fails ${failCount} • Source ${sourceServerName} • ${getUrlHost(source.url)}`;
                    const sourceHoverRows = buildSourceHoverRows(source);
                    const sourceRealProvider = source.providerName || source.server || sourceServerName;
                    const sourceRealKey = source.providerKey;
                    return /* @__PURE__ */ jsxRuntimeExports.jsx(TooltipProvider, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Tooltip, { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(TooltipTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "button",
                        {
                          onClick: () => {
                            if (source.isTorrent === true || source.sourceType === "torrent") {
                              setPendingTorrentSource(source);
                              return;
                            }
                            if (torrentTakeoverActive) {
                              leaveTorrentSession();
                            }
                            pendingPlaybackCommitRef.current = true;
                            selectRegularServer(-4);
                            setSelectedLangCode(source.langCode);
                            setPreferredServerName(source.providerName || null);
                            setPreferredSourceUrl(source.url || null);
                            setFailedServers(/* @__PURE__ */ new Set());
                          },
                          className: `h-9 px-3 md:px-4 rounded-xl font-medium transition-all text-sm flex items-center gap-2 ${isSelected ? "bg-foreground text-background shadow-lg" : getSourceTypeColorClass(source)}`,
                          title: hoverInfo,
                          children: [
                            source.isEmbed ? /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { className: "w-3 h-3" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Server, { className: "w-3 h-3 text-muted-foreground" }),
                            label,
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              SourceTypeBadge,
                              {
                                isM3U8: source.isM3U8,
                                isEmbed: source.isEmbed,
                                sourceType: source.sourceType
                              }
                            ),
                            isVerifiedProvider(source.providerKey, source.server || source.providerName) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-primary/20 text-[9px] font-bold text-primary border border-primary/30 ml-auto animate-in fade-in slide-in-from-right-2", children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-2.5 h-2.5" }),
                              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "VERIFIED" })
                            ] })
                          ]
                        }
                      ) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(TooltipContent, { side: "top", className: "max-w-xs bg-background/95 backdrop-blur-xl border-white/10 shadow-2xl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5 p-1", children: [
                        ((_a2 = source.server) == null ? void 0 : _a2.startsWith("Shared by")) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-primary font-bold text-[10px] uppercase tracking-wider bg-primary/10 px-2 py-1 rounded-md mb-1", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-3 h-3" }),
                          source.server
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold", children: label }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] text-muted-foreground truncate max-w-[10rem]", title: sourceRealKey ? `${sourceRealProvider} (${sourceRealKey})` : sourceRealProvider, children: [
                            sourceRealProvider,
                            sourceRealKey ? ` · ${sourceRealKey}` : ""
                          ] })
                        ] }),
                        sourceHoverRows.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-x-3 gap-y-0.5", children: sourceHoverRows.map((row) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2 text-[10px]", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: row.label }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium truncate max-w-[8rem]", title: row.value, children: row.value })
                        ] }, row.label)) }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-muted-foreground border-t border-white/10 pt-1", children: hoverInfo }),
                        nextEstimate && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-[10px] text-primary", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3 h-3" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                            "Next episode: ",
                            nextEstimate
                          ] })
                        ] })
                      ] }) })
                    ] }) }, `${source.langCode}-${source.providerName}-${sIdx}`);
                  }) })
                ] }, lang)),
                !loadingSources && availableServers.length === 0 && Object.keys(languageGroups).length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center p-6 text-center bg-muted/20 rounded-2xl border border-dashed border-border/50", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-8 h-8 text-muted-foreground mb-2 opacity-50" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No available servers found for this episode." }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      onClick: handleForceRefreshSources,
                      className: "mt-3 text-xs bg-primary/10 hover:bg-primary/20 text-primary px-3 py-1.5 rounded-lg font-bold transition-all",
                      children: "Try Fetching Again"
                    }
                  )
                ] }),
                isDeveloperMode && showSourceDebug && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-white/10 bg-black/30 p-3 text-xs font-mono overflow-auto max-h-64", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    "category: ",
                    category
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    "serverIndex: ",
                    selectedServerIndex
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    "sourceReady: ",
                    String(sourceReady)
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    "refererRetryIndex: ",
                    refererRetryIndex
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    "currentServer: ",
                    (currentServer == null ? void 0 : currentServer.serverName) || "none"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("pre", { className: "mt-2 whitespace-pre-wrap break-all", children: JSON.stringify(activePlaybackSource || selectedSource || null, null, 2) })
                ] })
              ] })
            ] })
          ] }) })
        ] }),
        !isGenericTorrent && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "xl:col-span-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassPanel, { className: "p-4 md:p-5 max-h-[400px] xl:max-h-[700px] flex flex-col", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-3 md:mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ListVideo, { className: "w-5 h-5 text-primary" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-base md:text-lg font-semibold", children: "Episodes" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-auto text-xs md:text-sm text-muted-foreground", children: (episodesData == null ? void 0 : episodesData.totalEpisodes) || 0 })
          ] }),
          ((episodesData == null ? void 0 : episodesData.totalEpisodes) || 0) > 50 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-3 space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "number",
                placeholder: "Jump to episode...",
                min: 1,
                max: episodesData == null ? void 0 : episodesData.totalEpisodes,
                className: "w-full h-8 px-3 rounded-lg bg-muted/50 border border-border text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary",
                onKeyDown: (e) => {
                  if (e.key === "Enter") {
                    const target = e.target;
                    const epNum = parseInt(target.value);
                    if (epNum && episodesData) {
                      const ep = episodesData.episodes.find((ep2) => ep2.number === epNum);
                      if (ep) {
                        handleEpisodeChange(ep.episodeId);
                        target.value = "";
                      }
                    }
                  }
                }
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1", children: Array.from({ length: Math.ceil(((episodesData == null ? void 0 : episodesData.totalEpisodes) || 0) / 50) }).map((_, idx) => {
              const start = idx * 50 + 1;
              const end = Math.min((idx + 1) * 50, (episodesData == null ? void 0 : episodesData.totalEpisodes) || 0);
              const currentEp = (currentEpisode == null ? void 0 : currentEpisode.number) || 1;
              const isActive = currentEp >= start && currentEp <= end;
              return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  onClick: () => {
                    const container = document.getElementById("episode-list-container");
                    const firstEpInRange = episodesData == null ? void 0 : episodesData.episodes.find((ep) => ep.number === start);
                    if (container && firstEpInRange) {
                      const epEl = document.getElementById(`ep-${firstEpInRange.episodeId}`);
                      epEl == null ? void 0 : epEl.scrollIntoView({ behavior: "smooth", block: "start" });
                    }
                  },
                  className: `px-2 py-1 text-xs rounded ${isActive ? "bg-primary text-primary-foreground" : "bg-muted/50 hover:bg-muted"}`,
                  children: [
                    start,
                    "-",
                    end
                  ]
                },
                idx
              );
            }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { id: "episode-list-container", className: "flex-1 overflow-y-auto space-y-1.5 md:space-y-2 pr-2 scrollbar-thin", children: (_h = isOfflineMode ? offlineManifest == null ? void 0 : offlineManifest.episodes : episodesData == null ? void 0 : episodesData.episodes) == null ? void 0 : _h.map((ep) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              id: `ep-${ep.episodeId || ep.id}`,
              onClick: () => {
                if (isOfflineMode) {
                  navigate(`/watch/${encodeURIComponent(ep.id)}?offline=true&path=${encodeURIComponent(offlinePath)}`);
                } else {
                  handleEpisodeChange(ep.episodeId);
                }
              },
              className: `w-full text-left p-2.5 md:p-3 rounded-xl transition-all text-sm ${(ep.episodeId || ep.id) === decodedEpisodeId ? "bg-primary text-primary-foreground" : ep.isFiller ? "bg-orange/10 border border-orange/30 hover:bg-orange/20" : "bg-muted/50 hover:bg-muted"}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-bold", children: [
                    "EP ",
                    ep.number
                  ] }),
                  ep.isFiller && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs px-1.5 py-0.5 rounded-full bg-orange/20 text-orange", children: "Filler" }),
                  (ep.episodeId || ep.id) === decodedEpisodeId && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs", children: "▶" })
                ] }),
                (ep.title || ep.name) && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs mt-1 opacity-80 line-clamp-1", children: ep.title || ep.name })
              ]
            },
            ep.episodeId || ep.id
          )) })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "xl:col-span-9", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          EpisodeComments,
          {
            animeId,
            episodeId: decodedEpisodeId,
            animeName: animeData == null ? void 0 : animeData.info.name
          }
        ) })
      ] })
    ] }),
    !isDesktop && /* @__PURE__ */ jsxRuntimeExports.jsx(MobileNav, {}),
    animeData && /* @__PURE__ */ jsxRuntimeExports.jsx(
      ReviewPopup,
      {
        isOpen: showReviewPopup,
        onClose: () => setShowReviewPopup(false),
        animeId,
        animeName: (animeData == null ? void 0 : animeData.info.name) || (isOfflineMode ? offlineManifest == null ? void 0 : offlineManifest.animeName : ""),
        userId: user == null ? void 0 : user.id
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      ReportModal,
      {
        isOpen: isReportModalOpen,
        onClose: () => setIsReportModalOpen(false),
        targetType: "server",
        targetId: decodedEpisodeId || animeId || "unknown",
        targetName: `${(animeData == null ? void 0 : animeData.info.name) || (isOfflineMode ? offlineManifest == null ? void 0 : offlineManifest.animeName : "")}`
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      TorrentSwitchDialog,
      {
        source: pendingTorrentSource,
        animeTitle: (animeData == null ? void 0 : animeData.info.name) || (isOfflineMode ? offlineManifest == null ? void 0 : offlineManifest.animeName : "") || void 0,
        episodeLabel: (currentEpisode == null ? void 0 : currentEpisode.number) ? `Episode ${currentEpisode.number}` : void 0,
        canPlayTorrent: torrentServiceAvailable,
        optimizeStorage: optimizeTorrentStorage,
        downloadPath: torrentDownloadPath || void 0,
        onCancel: () => setPendingTorrentSource(null),
        onConfirm: (source) => {
          setPendingTorrentSource(null);
          setSelectedLangCode(source.langCode);
          setPreferredServerName(source.providerName || null);
          void playTorrentSource(source);
        }
      }
    ),
    pendingRedirect && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-in fade-in", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-white/10 p-6 rounded-2xl max-w-md w-full shadow-2xl space-y-4 m-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 text-yellow-500", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-6 h-6" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-lg", children: "External Link Warning" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "This content is trying to open an external link." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-3 bg-black/30 rounded-lg border border-white/5 text-xs font-mono break-all text-white/70 max-h-24 overflow-y-auto", children: pendingRedirect }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "External sites may contain ads or trackers. Proceed with caution." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end gap-3 pt-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", onClick: () => setPendingRedirect(null), children: "Cancel" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "destructive", onClick: () => {
          const url = pendingRedirect;
          setPendingRedirect(null);
          window.open(url, "_blank");
        }, children: "Open Link" })
      ] })
    ] }) })
  ] });
}
export {
  WatchPage as default
};
