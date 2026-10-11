const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/download-history-service.Dg8G0nem.js","assets/index.C6yfkT5T.js","assets/react-vendor.CAo4XUiA.js","assets/vendor.CJyRs4QS.js","assets/tanstack.DPr3OB19.js","assets/supabase.WuRMX5Dg.js","assets/radix.BiK9uYXL.js","assets/icons.C2gBBarQ.js","assets/motion.DVGLRFCH.js","assets/hls.BlgtCWcq.js","assets/editor.Dxw8dtyw.js","assets/charts.Dr1fgDJ-.js","assets/index.CWbmAlRn.css","assets/automation-engine.1xs0s3p3.js","assets/language-resolver.DQsP8VD4.js"])))=>i.map(i=>d[i]);
import { bf as ue, b9 as __vitePreload } from "./vendor.CJyRs4QS.js";
import { r as reactExports, j as jsxRuntimeExports, e as useNavigate, u as useLocation } from "./react-vendor.CAo4XUiA.js";
import { ae as Dialog, af as DialogContent, ag as DialogHeader, ah as DialogTitle, ai as DialogDescription, az as Input, B as Button, l as getProxiedImageUrl, j as cn, aj as ANILIST_GRAPHQL_ENDPOINT, fQ as isP2PDisabled, D as useIsNativeApp, K as useIsDesktopApp, J as useConfirm, G as GlassPanel, S as Sidebar, co as hasTorrentService, bq as Tabs, br as TabsList, bs as TabsTrigger, bu as TabsContent, cA as fetchCombinedSources } from "./index.C6yfkT5T.js";
import { c$ as FileVideo, bD as Hash, S as Search, cw as SkipForward, Q as LoaderCircle, u as ArrowLeft, C as CircleCheck, l as Magnet, D as Download, d0 as FolderSync, P as Plus, Y as FolderOpen, t as HardDrive, B as BookOpen, bN as Bot, aW as History, X, aJ as Play, d1 as Wrench, J as Trash2, I as Info, R as RefreshCw, a as CircleAlert, _ as Ban, a$ as Languages, c8 as Server } from "./icons.C2gBBarQ.js";
import { M as MobileNav } from "./MobileNav.ABHzkhTQ.js";
import { S as Skeleton } from "./skeleton-custom.3olGZrgu.js";
import { u as useDownload } from "./useDownload.DEAa3Keh.js";
import { g as getLanguageLabel } from "./language-resolver.DQsP8VD4.js";
import { c as getKnownServerOptions } from "./serverNames.D82Wgje2.js";
import "./tanstack.DPr3OB19.js";
import "./supabase.WuRMX5Dg.js";
import "./radix.BiK9uYXL.js";
import "./motion.DVGLRFCH.js";
import "./hls.BlgtCWcq.js";
import "./editor.Dxw8dtyw.js";
import "./charts.Dr1fgDJ-.js";
async function searchAniList(query) {
  var _a, _b;
  if (!query.trim()) return [];
  try {
    const res = await fetch(ANILIST_GRAPHQL_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `query($q:String){Page(perPage:8){media(search:$q,type:ANIME){id title{romaji english}coverImage{large}}}}`,
        variables: { q: query.trim() }
      })
    });
    const json = await res.json();
    return ((_b = (_a = json == null ? void 0 : json.data) == null ? void 0 : _a.Page) == null ? void 0 : _b.media) || [];
  } catch {
    return [];
  }
}
function ImportAnimeModal({ open, filePaths, onClose, onSuccess }) {
  const [step, setStep] = reactExports.useState("episodes");
  const [fileEntries, setFileEntries] = reactExports.useState([]);
  const [searchQuery, setSearchQuery] = reactExports.useState("");
  const [searchResults, setSearchResults] = reactExports.useState([]);
  const [searchLoading, setSearchLoading] = reactExports.useState(false);
  const [selectedAnime, setSelectedAnime] = reactExports.useState(null);
  const [importError, setImportError] = reactExports.useState(null);
  const debounceRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    if (open && filePaths.length > 0) {
      setStep("episodes");
      setSearchQuery("");
      setSearchResults([]);
      setSelectedAnime(null);
      setImportError(null);
      const entries = filePaths.map((fp, i) => {
        const fileName = fp.split(/[\\/]/).pop() || fp;
        const epMatch = fileName.match(/[Ee](?:pisode\s*)?(\d+)|[\s_\-](\d{2,3})[\s_\-\[\.]/);
        const detectedEp = epMatch ? parseInt(epMatch[1] || epMatch[2], 10) : i + 1;
        return { originalPath: fp, fileName, episodeNumber: detectedEp };
      });
      setFileEntries(entries);
    }
  }, [open, filePaths]);
  reactExports.useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }
    setSearchLoading(true);
    debounceRef.current = setTimeout(async () => {
      const results = await searchAniList(searchQuery);
      setSearchResults(results);
      setSearchLoading(false);
    }, 400);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [searchQuery]);
  const handleEpisodeNumberChange = (index, value) => {
    const num = parseInt(value, 10);
    if (isNaN(num) || num < 0) return;
    setFileEntries((prev) => prev.map((e, i) => i === index ? { ...e, episodeNumber: num } : e));
  };
  const handleImport = reactExports.useCallback(async (animeName, anime) => {
    var _a;
    setStep("importing");
    setImportError(null);
    try {
      const electron = window.electron;
      if (!(electron == null ? void 0 : electron.finalizeImport)) throw new Error("Import not available");
      const posterUrl = ((_a = anime == null ? void 0 : anime.coverImage) == null ? void 0 : _a.large) || null;
      const items = [{
        targetAnimeName: animeName,
        displayTitle: animeName,
        posterUrl,
        files: fileEntries.map((entry) => ({
          originalPath: entry.originalPath,
          episodeNumber: entry.episodeNumber,
          seasonNumber: 1
        }))
      }];
      const result = await electron.finalizeImport({
        items,
        mode: "copy",
        customPath: null,
        posterUrl
      });
      if (result == null ? void 0 : result.success) {
        setStep("done");
        const posterMsg = posterUrl ? " (poster downloaded)" : "";
        ue.success(result.message || `Imported ${fileEntries.length} file(s) to "${animeName}"${posterMsg}`);
        setTimeout(() => {
          onSuccess();
          onClose();
        }, 1500);
      } else {
        throw new Error((result == null ? void 0 : result.error) || "Import failed");
      }
    } catch (err) {
      setImportError((err == null ? void 0 : err.message) || "Import failed");
      setStep("search");
    }
  }, [fileEntries, onSuccess, onClose]);
  const handleSkip = () => handleImport("Imported Videos", null);
  const handleSelectAnime = (anime) => {
    setSelectedAnime(anime);
    const name = anime.title.english || anime.title.romaji || "Imported Videos";
    handleImport(name, anime);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange: (o) => {
    if (!o) onClose();
  }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-xl bg-background border border-white/10 shadow-2xl max-h-[90vh] flex flex-col", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { className: "text-xl font-bold flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FileVideo, { className: "w-5 h-5 text-primary" }),
        "Import Videos"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogDescription, { className: "text-muted-foreground", children: [
        step === "episodes" && `${fileEntries.length} file(s) — set episode numbers then choose an anime.`,
        step === "search" && "Search for the anime to organize your files.",
        step === "importing" && "Copying files to your library...",
        step === "done" && "Import complete!"
      ] })
    ] }),
    step === "episodes" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 mt-2 flex flex-col overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 overflow-y-auto max-h-72 space-y-2 rounded-xl bg-white/5 border border-white/10 p-3", children: fileEntries.map((entry, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 py-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FileVideo, { className: "w-4 h-4 text-primary flex-shrink-0" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-1 text-sm text-muted-foreground truncate min-w-0", title: entry.fileName, children: entry.fileName }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 flex-shrink-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Hash, { className: "w-3 h-3 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              type: "number",
              min: "0",
              value: entry.episodeNumber,
              onChange: (e) => handleEpisodeNumberChange(i, e.target.value),
              className: "w-16 h-7 text-center text-sm bg-white/10 border-white/20 p-1",
              title: "Episode number"
            }
          )
        ] })
      ] }, i)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground px-1", children: "Set the episode number for each file, then choose an anime or skip." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: () => setStep("search"), className: "w-full gap-2 h-11", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "w-4 h-4" }),
          "Search for Anime & Download Poster"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", onClick: handleSkip, className: "w-full gap-2 h-11", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SkipForward, { className: "w-4 h-4" }),
          'Skip — Import as "Imported Videos"'
        ] })
      ] })
    ] }),
    step === "search" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 mt-2 flex flex-col overflow-hidden", children: [
      importError && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg p-3", children: importError }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            autoFocus: true,
            placeholder: "Search anime name...",
            value: searchQuery,
            onChange: (e) => setSearchQuery(e.target.value),
            className: "pl-9 h-11 bg-white/5 border-white/10"
          }
        ),
        searchLoading && /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 animate-spin text-muted-foreground" })
      ] }),
      searchResults.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 overflow-y-auto grid grid-cols-4 gap-2 max-h-64", children: searchResults.map((anime) => {
        var _a;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: () => handleSelectAnime(anime),
            className: cn(
              "group flex flex-col items-center gap-1.5 rounded-lg p-1.5 transition-all hover:bg-white/10 border border-transparent hover:border-white/20",
              (selectedAnime == null ? void 0 : selectedAnime.id) === anime.id && "border-primary/60 bg-primary/10"
            ),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full aspect-[3/4] rounded-md overflow-hidden bg-white/5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: getProxiedImageUrl(((_a = anime.coverImage) == null ? void 0 : _a.large) || ""),
                  alt: anime.title.english || anime.title.romaji,
                  className: "w-full h-full object-cover group-hover:scale-105 transition-transform",
                  onError: (e) => {
                    e.currentTarget.src = "/placeholder.svg";
                  }
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-center line-clamp-2 text-muted-foreground leading-tight", children: anime.title.english || anime.title.romaji })
            ]
          },
          anime.id
        );
      }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 mt-auto", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "ghost", size: "sm", onClick: () => setStep("episodes"), className: "gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4" }),
          " Back"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", onClick: handleSkip, className: "flex-1 gap-2 h-10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SkipForward, { className: "w-4 h-4" }),
          'Skip — Import as "Imported Videos"'
        ] })
      ] })
    ] }),
    step === "importing" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-4 py-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-10 h-10 animate-spin text-primary" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground", children: [
        "Copying ",
        fileEntries.length,
        " file(s) and downloading poster..."
      ] })
    ] }),
    step === "done" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-4 py-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-10 h-10 text-green-400" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: "Import complete!" })
    ] })
  ] }) });
}
function TorrentDownloadModal({ open, onClose, downloadPath }) {
  const navigate = useNavigate();
  const [magnetInput, setMagnetInput] = reactExports.useState("");
  const [starting, setStarting] = reactExports.useState(null);
  const [error, setError] = reactExports.useState(null);
  const startSession = reactExports.useCallback(async (magnet, infoHash, label) => {
    const runtime = window.tatakaiRuntime;
    if (!(runtime == null ? void 0 : runtime.startTorrentSession)) {
      ue.error("Torrent session is not available.");
      return;
    }
    if (isP2PDisabled()) {
      ue.error("P2P torrents are disabled in Settings. Re-enable them to start this download.");
      return;
    }
    const sessionKey = infoHash || magnet.slice(0, 40);
    setStarting(sessionKey);
    setError(null);
    try {
      const result = await runtime.startTorrentSession(infoHash || magnet, {
        magnet,
        downloadPath: typeof downloadPath === "string" ? downloadPath : void 0
      });
      if ((result == null ? void 0 : result.success) || (result == null ? void 0 : result.sessionId)) {
        const sessionId = result.sessionId || result.id;
        ue.success(`Torrent started${label ? `: ${label}` : ""}`);
        onClose();
        if (sessionId) {
          navigate(`/watch/${encodeURIComponent(`torrent-${infoHash || "session"}?ep=1`)}?sessionId=${encodeURIComponent(sessionId)}`);
        }
      } else {
        throw new Error((result == null ? void 0 : result.error) || "Failed to start torrent");
      }
    } catch (err) {
      setError((err == null ? void 0 : err.message) || "Failed to start torrent");
    } finally {
      setStarting(null);
    }
  }, [downloadPath, navigate, onClose]);
  const handleStartMagnet = reactExports.useCallback(async () => {
    const magnet = magnetInput.trim();
    if (!magnet) {
      setError("Please paste a magnet link.");
      return;
    }
    if (!magnet.startsWith("magnet:?")) {
      setError("Invalid magnet link. Must start with magnet:?");
      return;
    }
    setError(null);
    const match = magnet.match(/xt=urn:btih:([a-fA-F0-9]{40})/i);
    await startSession(magnet, (match == null ? void 0 : match[1]) || "", "Magnet download");
  }, [magnetInput, startSession]);
  const handleClose = () => {
    setMagnetInput("");
    setError(null);
    onClose();
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange: (o) => {
    if (!o) handleClose();
  }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "w-[calc(100vw-2rem)] sm:max-w-2xl bg-background border border-white/10 shadow-2xl max-h-[92dvh] sm:max-h-[85vh] flex flex-col overflow-y-auto overscroll-contain rounded-3xl sm:rounded-2xl p-4 sm:p-6 pb-[max(1rem,env(safe-area-inset-bottom))]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { className: "text-xl font-bold flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Magnet, { className: "w-5 h-5 text-primary" }),
        "Torrent Download"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { className: "text-muted-foreground", children: "Paste a magnet link to start downloading." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 mt-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium text-muted-foreground", children: "Paste a magnet link" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "textarea",
          {
            value: magnetInput,
            onChange: (e) => {
              setMagnetInput(e.target.value);
              setError(null);
            },
            placeholder: "magnet:?xt=urn:btih:...",
            rows: 5,
            className: "w-full rounded-xl bg-white/5 border border-white/10 p-3 text-sm font-mono resize-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 outline-none transition-all"
          }
        )
      ] }),
      error && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg p-3", children: error }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: handleStartMagnet, disabled: !!starting || !magnetInput.trim(), className: "w-full gap-2 h-11", children: [
        starting ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Magnet, { className: "w-4 h-4" }),
        starting ? "Starting..." : "Start Download from Magnet"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground text-center", children: "Files will download to your Tatakai library folder." })
    ] })
  ] }) });
}
const MANGA_KIND_BADGE = {
  manhwa: { label: "Manhwa", cls: "bg-fuchsia-500/20 text-fuchsia-300" },
  manhua: { label: "Manhua", cls: "bg-amber-500/20 text-amber-300" },
  manga: { label: "Manga", cls: "bg-sky-500/20 text-sky-300" }
};
const AUTO_DL_LANGUAGES = ["ja", "en", "hi", "es", "pt", "fr", "ko", "zh", "ar", "de", "it", "th"];
function AutoDownloadSettings() {
  const [language, setLanguage] = reactExports.useState(
    () => localStorage.getItem("tatakai_default_language") || "ja"
  );
  const [server, setServer] = reactExports.useState(
    () => localStorage.getItem("tatakai_default_server") || ""
  );
  const serverOptions = reactExports.useMemo(() => getKnownServerOptions(), []);
  const onLanguage = (v) => {
    setLanguage(v);
    localStorage.setItem("tatakai_default_language", v);
    ue.success(`Preferred audio language set to ${getLanguageLabel(v)}`);
  };
  const onServer = (v) => {
    setServer(v);
    if (v) localStorage.setItem("tatakai_default_server", v);
    else localStorage.removeItem("tatakai_default_server");
    ue.success(v ? "Default server updated" : "Default server set to Auto");
  };
  const selectClass = "w-full h-10 rounded-lg bg-white/5 border border-white/10 px-3 text-sm focus:outline-none focus:border-primary/50 transition-colors appearance-none cursor-pointer";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassPanel, { className: "p-4 space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Wrench, { className: "w-4 h-4 text-primary" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-sm", children: "Download preferences" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center gap-2 text-xs font-medium text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Languages, { className: "w-3.5 h-3.5" }),
          " Preferred audio language"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("select", { value: language, onChange: (e) => onLanguage(e.target.value), className: selectClass, children: AUTO_DL_LANGUAGES.map((code) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: code, className: "bg-neutral-900", children: getLanguageLabel(code) }, code)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground", children: "Used for auto-downloads and as the default in the download picker." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center gap-2 text-xs font-medium text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Server, { className: "w-3.5 h-3.5" }),
          " Default server"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: server, onChange: (e) => onServer(e.target.value), className: selectClass, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", className: "bg-neutral-900", children: "Auto (recommended)" }),
          serverOptions.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: s.key, className: "bg-neutral-900", children: s.name }, s.key))
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground", children: "Preferred first — the app falls back to others when unavailable." })
      ] })
    ] })
  ] });
}
function AutoDownloadRules({ isNative }) {
  const [subscriptions, setSubscriptions] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const loadSubscriptions = async () => {
    var _a;
    setLoading(true);
    try {
      const electron = window.electron;
      if (!((_a = electron == null ? void 0 : electron.autoDownload) == null ? void 0 : _a.list)) {
        setLoading(false);
        return;
      }
      const list = await electron.autoDownload.list();
      if (Array.isArray(list)) {
        setSubscriptions(list.map((item) => ({
          animeId: item.animeId || item.id || "",
          title: item.title || "Unknown",
          nextEpisode: item.nextEpisode || 1,
          addedAt: item.addedAt || Date.now(),
          enqueuedEpisodes: item.enqueuedEpisodes || []
        })));
      }
    } catch (err) {
      console.error("Failed to load auto-download subscriptions:", err);
    } finally {
      setLoading(false);
    }
  };
  reactExports.useEffect(() => {
    if (isNative) loadSubscriptions();
    else setLoading(false);
  }, [isNative]);
  const handleUnsubscribe = async (animeId, title) => {
    var _a;
    try {
      const electron = window.electron;
      if (!((_a = electron == null ? void 0 : electron.autoDownload) == null ? void 0 : _a.unsubscribe)) return;
      await electron.autoDownload.unsubscribe(animeId);
      ue.success(`Removed auto-download for "${title}"`);
      loadSubscriptions();
    } catch (err) {
      ue.error("Failed to remove subscription");
    }
  };
  if (!isNative) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center py-24 text-center space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Bot, { className: "w-12 h-12 text-muted-foreground opacity-30" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-muted-foreground", children: "Auto-download is only available in the desktop app." })
    ] });
  }
  if (loading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: Array.from({ length: 3 }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-16 rounded-xl bg-white/5 animate-pulse" }, i)) });
  }
  if (subscriptions.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(AutoDownloadSettings, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center py-16 text-center space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bot, { className: "w-8 h-8 text-primary/60" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-bold", children: "No shows queued for auto-download" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-sm max-w-sm", children: [
          "Open any anime, tap ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-medium", children: "Download → Auto-Download" }),
          ", and new episodes will download automatically as they air — using the preferences above."
        ] })
      ] })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(AutoDownloadSettings, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-lg font-bold flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Bot, { className: "w-5 h-5 text-primary" }),
        "Active Rules (",
        subscriptions.length,
        ")"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", size: "sm", onClick: loadSubscriptions, className: "gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-4 h-4" }),
        "Refresh"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: subscriptions.map((sub) => /* @__PURE__ */ jsxRuntimeExports.jsx(GlassPanel, { className: "p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold text-sm truncate", children: sub.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mt-1 text-xs text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            "Next: Episode ",
            sub.nextEpisode
          ] }),
          sub.enqueuedEpisodes.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            sub.enqueuedEpisodes.length,
            " episode(s) already queued"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            "Added ",
            new Date(sub.addedAt).toLocaleDateString()
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => handleUnsubscribe(sub.animeId, sub.title),
          className: "p-2 rounded-lg text-muted-foreground hover:text-red-400 hover:bg-red-400/10 transition-colors",
          title: "Remove auto-download rule",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
        }
      )
    ] }) }, sub.animeId)) })
  ] });
}
function OfflineLibraryPage() {
  var _a;
  const [animes, setAnimes] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [syncing, setSyncing] = reactExports.useState(false);
  const [search, setSearch] = reactExports.useState("");
  const [downloadPath, setDownloadPath] = reactExports.useState(null);
  const [mangaSeries, setMangaSeries] = reactExports.useState([]);
  const [activeTab, setActiveTab] = reactExports.useState("library");
  const [history, setHistory] = reactExports.useState([]);
  const [historyLoading, setHistoryLoading] = reactExports.useState(false);
  const [historyStats, setHistoryStats] = reactExports.useState({
    total: 0,
    completed: 0,
    failed: 0,
    cancelled: 0,
    totalSizeBytes: 0
  });
  const isNative = useIsNativeApp();
  const isDesktopApp = useIsDesktopApp();
  const navigate = useNavigate();
  const location = useLocation();
  const { downloadStates = {}, cancelDownload } = useDownload();
  const confirm = useConfirm();
  reactExports.useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tab = params.get("tab");
    if (tab && ["library", "automation", "history"].includes(tab)) {
      setActiveTab(tab);
    }
  }, []);
  const activeDownloads = Object.entries(downloadStates).filter(
    ([_, state]) => state.status === "downloading" || state.status === "queued"
  );
  const getDownloadPath = () => localStorage.getItem("tatakai_download_path") || null;
  const loadOfflineLibrary = async () => {
    if (!isNative) {
      setLoading(false);
      return;
    }
    try {
      const customPath = getDownloadPath();
      setDownloadPath(customPath);
      const library = await window.electron.getOfflineLibrary(customPath);
      const items = library || [];
      const electron = window.electron;
      if (electron == null ? void 0 : electron.streamLocalFile) {
        await Promise.all(items.map(async (anime) => {
          if (anime.poster && anime.poster.startsWith("tatakai-media://")) {
            try {
              const result = await electron.streamLocalFile(anime.poster);
              if ((result == null ? void 0 : result.success) && result.url) {
                anime.poster = result.url;
              }
            } catch {
            }
          }
        }));
      }
      setAnimes(items);
    } catch (err) {
      console.error("Failed to load offline library:", err);
    } finally {
      setLoading(false);
    }
  };
  const loadMangaLibrary = async () => {
    var _a2;
    const electron = window.electron;
    if (!isNative || !((_a2 = electron == null ? void 0 : electron.manga) == null ? void 0 : _a2.getOfflineLibrary)) return;
    try {
      const customPath = getDownloadPath();
      const library = await electron.manga.getOfflineLibrary(customPath) || [];
      if (electron == null ? void 0 : electron.streamLocalFile) {
        await Promise.all(library.map(async (s) => {
          const raw = s.poster || s.posterUrl || null;
          if (raw && raw.startsWith("tatakai-media://")) {
            try {
              const result = await electron.streamLocalFile(raw);
              if ((result == null ? void 0 : result.success) && result.url) s.poster = result.url;
            } catch {
            }
          } else if (raw) {
            s.poster = raw;
          }
        }));
      }
      setMangaSeries(library);
    } catch (err) {
      console.error("Failed to load offline manga library:", err);
    }
  };
  const loadHistoryData = async () => {
    setHistoryLoading(true);
    try {
      const { getHistory, getDownloadStats } = await __vitePreload(async () => {
        const { getHistory: getHistory2, getDownloadStats: getDownloadStats2 } = await import("./download-history-service.Dg8G0nem.js");
        return { getHistory: getHistory2, getDownloadStats: getDownloadStats2 };
      }, true ? __vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12]) : void 0);
      const [h, s] = await Promise.all([getHistory(200), getDownloadStats()]);
      setHistory(h);
      setHistoryStats(s);
    } catch (err) {
      console.error("Failed to load download history:", err);
    } finally {
      setHistoryLoading(false);
    }
  };
  reactExports.useEffect(() => {
    loadOfflineLibrary();
    loadMangaLibrary();
  }, [isNative]);
  reactExports.useEffect(() => {
    if (activeTab === "history") loadHistoryData();
  }, [activeTab]);
  const handleSyncLibrary = async () => {
    if (!isNative) return;
    setSyncing(true);
    try {
      const customPath = getDownloadPath();
      const result = await window.electron.syncOfflineLibrary(customPath);
      ue.success(result.message);
      await loadOfflineLibrary();
      await loadMangaLibrary();
    } catch (err) {
      console.error("Sync failed:", err);
      ue.error("Failed to sync library");
    } finally {
      setSyncing(false);
    }
  };
  const [importModalOpen, setImportModalOpen] = reactExports.useState(false);
  const [importFilePaths, setImportFilePaths] = reactExports.useState([]);
  const handleImportVideos = async () => {
    if (!isNative) return;
    try {
      const electron = window.electron;
      if (electron == null ? void 0 : electron.selectImportFiles) {
        const paths = await electron.selectImportFiles();
        if (Array.isArray(paths) && paths.length > 0) {
          setImportFilePaths(paths);
          setImportModalOpen(true);
        }
      } else if (electron == null ? void 0 : electron.importVideoFiles) {
        const result = await electron.importVideoFiles();
        if (result == null ? void 0 : result.success) {
          ue.success(result.message);
          await loadOfflineLibrary();
        } else if ((result == null ? void 0 : result.message) !== "No files selected" && (result == null ? void 0 : result.message) !== "Import cancelled") {
          ue.error((result == null ? void 0 : result.message) || "Import failed");
        }
      }
    } catch (err) {
      console.error("Import failed:", err);
      ue.error("Failed to import videos");
    }
  };
  const handleRepairAnime = async (anime, e) => {
    e.stopPropagation();
    if (!isNative) return;
    try {
      ue.info(`Repairing ${anime.name}...`);
      let posterUrl = anime.posterUrl || null;
      let subtitles = [];
      if (anime.episodes.length > 0) {
        try {
          const sources = await fetchCombinedSources(
            anime.episodes[0].id,
            anime.name,
            anime.episodes[0].number,
            "hd-2",
            "sub"
          );
          subtitles = sources.subtitles || sources.tracks || [];
        } catch {
        }
      }
      const result = await window.electron.repairAnime({
        animePath: anime.path,
        posterUrl,
        subtitles,
        animeName: anime.name
      });
      if (result.success) {
        ue.success(result.message);
        await loadOfflineLibrary();
      } else ue.error(result.error || "Repair failed");
    } catch (err) {
      console.error("Repair failed:", err);
      ue.error("Failed to repair anime");
    }
  };
  const handleOpenFolder = async () => {
    if (!isNative) return;
    try {
      await window.electron.openDownloadsFolder(getDownloadPath());
    } catch (err) {
      console.error("Failed to open folder:", err);
    }
  };
  const handleDeleteAnime = async (anime, e) => {
    e.stopPropagation();
    if (!isNative) return;
    if (!await confirm({ title: `Delete "${anime.name}" and all its episodes?`, description: "This action cannot be undone.", destructive: true })) return;
    try {
      ue.loading(`Deleting ${anime.name}...`);
      const result = await window.electron.deleteAnime(anime.path);
      if (result.success) {
        ue.success(result.message);
        await loadOfflineLibrary();
      } else ue.error(result.error || "Failed to delete anime");
    } catch (err) {
      console.error("Delete failed:", err);
      ue.error("Failed to delete anime");
    }
  };
  const handleDeleteMangaSeries = async (series, e) => {
    e.stopPropagation();
    if (!isNative) return;
    if (!await confirm({ title: `Delete "${series.title}" and all downloaded chapters?`, description: "This action cannot be undone.", destructive: true })) return;
    try {
      ue.loading(`Deleting ${series.title}...`);
      const result = await window.electron.manga.deleteSeries({ anilistId: series.anilistId, customRoot: getDownloadPath() || void 0 });
      if (result == null ? void 0 : result.success) {
        ue.success(`Deleted ${series.title}`);
        await loadMangaLibrary();
      } else ue.error((result == null ? void 0 : result.error) || "Failed to delete series");
    } catch (err) {
      console.error("Delete manga failed:", err);
      ue.error("Failed to delete manga series");
    }
  };
  const handleOpenMangaFolder = async (series, e) => {
    e.stopPropagation();
    if (!isNative) return;
    try {
      await window.electron.manga.openFolder({ anilistId: series.anilistId, customRoot: getDownloadPath() || void 0 });
    } catch (err) {
      console.error("Failed to open manga folder:", err);
    }
  };
  const handleReadManga = (series) => {
    var _a2;
    const first = (_a2 = series.chapters) == null ? void 0 : _a2[0];
    if (!first) {
      ue.error("No chapters downloaded");
      return;
    }
    const params = new URLSearchParams({ chapterKey: first.chapterKey });
    if (first.chapterNumber != null) params.set("chapterNumber", String(first.chapterNumber));
    if (first.provider) params.set("provider", String(first.provider));
    params.set("offline", "true");
    navigate(`/manga/read/${series.anilistId}?${params.toString()}`);
  };
  if (!isNative) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen flex items-center justify-center bg-background text-foreground p-6 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassPanel, { className: "p-12 space-y-6 max-w-md", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 mx-auto rounded-full bg-primary/10 flex items-center justify-center text-primary", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-10 h-10" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold", children: "Native Feature" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "The offline library is only available in the Tatakai Desktop and Mobile apps." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: () => navigate("/"), className: "w-full h-12 rounded-full", children: "Back to Home" })
    ] }) });
  }
  const [torrentModalOpen, setTorrentModalOpen] = reactExports.useState(false);
  const filteredAnimes = animes.filter((a) => a.name.toLowerCase().includes(search.toLowerCase()));
  const filteredManga = mangaSeries.filter((m) => (m.title || "").toLowerCase().includes(search.toLowerCase()));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background text-foreground", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Sidebar, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: isDesktopApp ? "lg:pl-3 pl-6 pr-6 py-12 max-w-[1600px] mx-auto space-y-8" : isNative ? "pl-6 pr-6 py-12 max-w-[1600px] mx-auto space-y-8" : "pl-6 md:pl-32 pr-6 py-12 max-w-[1600px] mx-auto space-y-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col md:flex-row md:items-start justify-between gap-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-4xl md:text-5xl font-bold font-display tracking-tight", children: "Offline Library" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Manage downloads, rules, and your download history." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", size: "sm", onClick: handleSyncLibrary, disabled: syncing, className: "gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FolderSync, { className: `w-4 h-4 ${syncing ? "animate-spin" : ""}` }),
            syncing ? "Syncing..." : "Sync Folder"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", size: "sm", onClick: handleImportVideos, className: "gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
            "Import Videos"
          ] }),
          isNative && hasTorrentService() && ((_a = window.tatakaiRuntime) == null ? void 0 : _a.startTorrentSession) && /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", size: "sm", onClick: () => setTorrentModalOpen(true), className: "gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Magnet, { className: "w-4 h-4" }),
            "Torrent Download"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "ghost", size: "sm", onClick: handleOpenFolder, className: "gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FolderOpen, { className: "w-4 h-4" }),
            "Open Folder"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col md:flex-row md:items-center gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative group flex-1 max-w-md", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "text",
              placeholder: "Search your library...",
              value: search,
              onChange: (e) => setSearch(e.target.value),
              className: "w-full h-12 pl-12 pr-4 rounded-xl bg-white/5 border border-white/10 focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all outline-none text-sm"
            }
          )
        ] }),
        (animes.length > 0 || mangaSeries.length > 0) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 text-sm text-muted-foreground", children: [
          animes.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(HardDrive, { className: "w-4 h-4" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                animes.length,
                " anime"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-4 h-4" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                animes.reduce((a, b) => a + b.episodes.length, 0),
                " episodes"
              ] })
            ] })
          ] }),
          mangaSeries.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-4 h-4" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                mangaSeries.length,
                " series"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-4 h-4" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                mangaSeries.reduce((a, b) => {
                  var _a2;
                  return a + (b.chapterCount ?? ((_a2 = b.chapters) == null ? void 0 : _a2.length) ?? 0);
                }, 0),
                " chapters"
              ] })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { value: activeTab, onValueChange: setActiveTab, className: "space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "h-11 bg-white/5 border border-white/10 rounded-xl p-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "library", className: "gap-2 rounded-lg data-[state=active]:bg-primary data-[state=active]:text-white px-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(HardDrive, { className: "w-4 h-4" }),
            "Library"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "automation", className: "gap-2 rounded-lg data-[state=active]:bg-primary data-[state=active]:text-white px-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Bot, { className: "w-4 h-4" }),
            "Auto-Download"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "history", className: "gap-2 rounded-lg data-[state=active]:bg-primary data-[state=active]:text-white px-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(History, { className: "w-4 h-4" }),
            "History",
            historyStats.failed > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-1 px-1.5 py-0.5 rounded-full bg-red-500/20 text-red-400 text-[10px] font-bold", children: historyStats.failed })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsContent, { value: "library", className: "space-y-6 mt-0", children: [
          activeDownloads.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-lg font-bold flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-5 h-5 animate-spin text-primary" }),
              "Active Downloads (",
              activeDownloads.length,
              ")"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", children: activeDownloads.map(([episodeId, state]) => {
              var _a2;
              return /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassPanel, { className: "p-4 space-y-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-sm truncate", children: state.animeName || "Downloading…" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                      "Episode ",
                      state.episodeNumber || 1
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      onClick: () => cancelDownload(episodeId),
                      className: "p-1.5 rounded-lg hover:bg-destructive/20 text-muted-foreground hover:text-destructive transition-colors",
                      title: "Cancel download",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2 bg-white/5 rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "h-full bg-gradient-to-r from-primary to-primary/70 transition-all duration-300",
                      style: { width: `${state.progress || 0}%` }
                    }
                  ) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-[10px] text-muted-foreground", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: state.status === "queued" ? "Queued" : `${((_a2 = state.progress) == null ? void 0 : _a2.toFixed(0)) || 0}%` }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                      state.speed && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: state.speed }),
                      state.eta && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                        "ETA: ",
                        state.eta
                      ] })
                    ] })
                  ] })
                ] })
              ] }, episodeId);
            }) })
          ] }),
          loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-6", children: Array.from({ length: 12 }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "aspect-[2/3] rounded-2xl" }, i)) }) : filteredAnimes.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-6", children: filteredAnimes.map((anime) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            GlassPanel,
            {
              className: "group relative overflow-hidden h-fit cursor-pointer border-transparent hover:border-primary/50 transition-all duration-300",
              onClick: () => {
                if (anime.episodes.length > 0) {
                  navigate(`/watch/${encodeURIComponent(anime.episodes[0].id)}?offline=true&path=${encodeURIComponent(anime.path)}`);
                }
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "aspect-[2/3] relative overflow-hidden bg-gradient-to-br from-primary/20 to-secondary/20", children: [
                  anime.poster ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "img",
                    {
                      src: anime.poster,
                      alt: anime.name,
                      className: "w-full h-full object-cover group-hover:scale-110 transition-transform duration-500",
                      onError: (e) => {
                        e.target.style.display = "none";
                      }
                    }
                  ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-full flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-12 h-12 text-white/20" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-60 group-hover:opacity-100 transition-opacity" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 rounded-full bg-primary flex items-center justify-center shadow-xl shadow-primary/40 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "w-6 h-6 text-white fill-current ml-1" }) }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute top-3 right-3 px-2 py-1 rounded-md bg-black/60 backdrop-blur-md text-[10px] font-bold text-white border border-white/10 uppercase tracking-wider", children: [
                    anime.episodes.length,
                    " EP"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      onClick: (e) => handleRepairAnime(anime, e),
                      className: "absolute top-3 left-3 p-2 rounded-lg bg-black/60 backdrop-blur-md border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-primary/20 hover:border-primary/50",
                      title: "Repair — re-download missing poster & subtitles",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Wrench, { className: "w-3.5 h-3.5 text-white" })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      onClick: (e) => handleDeleteAnime(anime, e),
                      className: "absolute bottom-3 left-3 p-2 rounded-lg bg-black/60 backdrop-blur-md border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-destructive/20 hover:border-destructive/50",
                      title: "Delete anime and all episodes",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3.5 h-3.5 text-red-400" })
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 space-y-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-sm line-clamp-1 group-hover:text-primary transition-colors", children: anime.name }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-[10px] text-muted-foreground uppercase font-bold tracking-tighter", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(FolderOpen, { className: "w-3 h-3" }),
                      "Offline Ready"
                    ] }),
                    !anime.poster && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-amber-500 font-medium", children: "Missing poster" })
                  ] })
                ] })
              ]
            },
            anime.path
          )) }) : filteredManga.length > 0 ? null : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center py-32 text-center space-y-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-24 h-24 rounded-3xl bg-muted flex items-center justify-center text-muted-foreground/30", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-12 h-12" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold", children: "Library is empty" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground max-w-sm", children: "You haven't downloaded any anime or manga yet. Start by downloading your favourite episodes or chapters, or sync your folder if you already have videos." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-3 justify-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: () => navigate("/"), variant: "default", className: "rounded-full h-12 px-8", children: "Discover Anime" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: handleSyncLibrary, variant: "outline", className: "rounded-full h-12 px-8 gap-2", disabled: syncing, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(FolderSync, { className: `w-4 h-4 ${syncing ? "animate-spin" : ""}` }),
                "Sync Folder"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: handleImportVideos, variant: "outline", className: "rounded-full h-12 px-8 gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
                "Import Videos"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 p-4 rounded-xl bg-white/5 border border-white/10 max-w-lg text-left", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-semibold text-sm mb-2 flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { className: "w-4 h-4 text-primary" }),
                "How to add videos"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "text-xs text-muted-foreground space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
                  "• ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Download:" }),
                  " Go to any anime and click the download button"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
                  "• ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Sync Folder:" }),
                  " Put video files in the Tatakai folder and click Sync"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
                  "• ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Import:" }),
                  " Select video files from anywhere on your computer"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "link", size: "sm", onClick: handleOpenFolder, className: "mt-2 p-0 h-auto text-xs", children: "Open Downloads Folder →" })
            ] })
          ] }),
          filteredManga.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-lg font-bold flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-5 h-5 text-primary" }),
              "Manga & Comics (",
              filteredManga.length,
              ")"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-6", children: filteredManga.map((series) => {
              var _a2;
              const badge = MANGA_KIND_BADGE[series.kind || "manga"] || MANGA_KIND_BADGE.manga;
              const chapterCount = series.chapterCount ?? ((_a2 = series.chapters) == null ? void 0 : _a2.length) ?? 0;
              return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                GlassPanel,
                {
                  className: "group relative overflow-hidden h-fit cursor-pointer border-transparent hover:border-primary/50 transition-all duration-300",
                  onClick: () => handleReadManga(series),
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "aspect-[2/3] relative overflow-hidden bg-gradient-to-br from-primary/20 to-secondary/20", children: [
                      series.poster ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "img",
                        {
                          src: series.poster,
                          alt: series.title,
                          className: "w-full h-full object-cover group-hover:scale-110 transition-transform duration-500",
                          onError: (e) => {
                            e.target.style.display = "none";
                          }
                        }
                      ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-full flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-12 h-12 text-white/20" }) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-60 group-hover:opacity-100 transition-opacity" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 rounded-full bg-primary flex items-center justify-center shadow-xl shadow-primary/40 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-6 h-6 text-white" }) }) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `absolute top-3 left-3 px-2 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-wider ${badge.cls}`, children: badge.label }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute top-3 right-3 px-2 py-1 rounded-md bg-black/60 backdrop-blur-md text-[10px] font-bold text-white border border-white/10 uppercase tracking-wider", children: [
                        chapterCount,
                        " CH"
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "button",
                        {
                          onClick: (e) => handleOpenMangaFolder(series, e),
                          className: "absolute bottom-3 right-3 p-2 rounded-lg bg-black/60 backdrop-blur-md border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-primary/20 hover:border-primary/50",
                          title: "Open folder",
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(FolderOpen, { className: "w-3.5 h-3.5 text-white" })
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "button",
                        {
                          onClick: (e) => handleDeleteMangaSeries(series, e),
                          className: "absolute bottom-3 left-3 p-2 rounded-lg bg-black/60 backdrop-blur-md border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-destructive/20 hover:border-destructive/50",
                          title: "Delete series and all chapters",
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3.5 h-3.5 text-red-400" })
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 space-y-1", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-sm line-clamp-1 group-hover:text-primary transition-colors", children: series.title }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-[10px] text-muted-foreground uppercase font-bold tracking-tighter", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-3 h-3" }),
                        "Offline Ready"
                      ] })
                    ] })
                  ]
                },
                series.anilistId
              );
            }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "automation", className: "mt-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AutoDownloadRules, { isNative }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsContent, { value: "history", className: "space-y-6 mt-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-xl font-bold flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(History, { className: "w-5 h-5 text-primary" }),
                "Download History"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Track every automated and manual download attempt — completions, failures, and cancellations." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", size: "sm", onClick: loadHistoryData, disabled: historyLoading, className: "gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: `w-4 h-4 ${historyLoading ? "animate-spin" : ""}` }),
                "Refresh"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  variant: "destructive",
                  size: "sm",
                  disabled: history.length === 0,
                  onClick: async () => {
                    if (!await confirm({ title: "Clear the entire download history? This cannot be undone.", destructive: true })) return;
                    const { clearHistory } = await __vitePreload(async () => {
                      const { clearHistory: clearHistory2 } = await import("./download-history-service.Dg8G0nem.js");
                      return { clearHistory: clearHistory2 };
                    }, true ? __vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12]) : void 0);
                    await clearHistory();
                    ue.success("Download history cleared");
                    loadHistoryData();
                  },
                  className: "gap-2",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-4 h-4" }),
                    "Clear All"
                  ]
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassPanel, { className: "p-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-semibold uppercase tracking-wider", children: "Total Attempts" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-3xl font-black mt-1", children: historyStats.total })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassPanel, { className: "p-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-green-400 font-semibold uppercase tracking-wider", children: "Completed" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-3xl font-black text-green-500 mt-1", children: historyStats.completed })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassPanel, { className: "p-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-red-400 font-semibold uppercase tracking-wider", children: "Failed" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-3xl font-black text-red-500 mt-1", children: historyStats.failed })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassPanel, { className: "p-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-semibold uppercase tracking-wider", children: "Storage Used" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-3xl font-black mt-1", children: historyStats.totalSizeBytes >= 1073741824 ? `${(historyStats.totalSizeBytes / 1073741824).toFixed(2)} GB` : `${(historyStats.totalSizeBytes / 1048576).toFixed(0)} MB` })
            ] })
          ] }),
          historyLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: Array.from({ length: 5 }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-20 rounded-xl" }, i)) }) : history.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center py-24 border border-dashed border-white/10 rounded-2xl bg-white/[0.01] text-center space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(History, { className: "w-12 h-12 text-muted-foreground opacity-30" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-muted-foreground", children: "No download history yet" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground/70 max-w-xs", children: "Automated or manual downloads will appear here when they complete, fail, or are cancelled." })
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: history.map((entry) => /* @__PURE__ */ jsxRuntimeExports.jsx(GlassPanel, { className: "p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col md:flex-row md:items-center justify-between gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 flex-shrink-0", children: entry.status === "completed" ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4 text-green-500" }) : entry.status === "failed" ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-4 h-4 text-red-500" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Ban, { className: "w-4 h-4 text-yellow-500" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 space-y-0.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { className: "font-bold text-sm leading-tight", children: [
                  entry.animeTitle,
                  entry.episodeName ? ` — ${entry.episodeName}` : ""
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-x-3 gap-y-0.5 text-xs text-muted-foreground", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                    "Ep ",
                    entry.episodeNumber
                  ] }),
                  entry.quality && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                    "· ",
                    entry.quality
                  ] }),
                  entry.resolvedLanguage && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "uppercase", children: [
                    "· ",
                    entry.resolvedLanguage
                  ] }),
                  entry.sourceType && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                    "· ",
                    entry.sourceType
                  ] }),
                  entry.extensionName && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                    "· ",
                    entry.extensionName
                  ] }),
                  entry.fileSizeBytes && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                    "· ",
                    (entry.fileSizeBytes / 1048576).toFixed(1),
                    " MB"
                  ] })
                ] }),
                entry.errorMessage && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-red-400 font-semibold mt-1", children: [
                  "Error: ",
                  entry.errorMessage
                ] }),
                entry.localPath && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground/60 font-mono truncate max-w-xs md:max-w-sm mt-0.5", children: entry.localPath })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 flex-shrink-0 self-end md:self-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground whitespace-nowrap", children: new Date(entry.completedAt).toLocaleString() }),
              entry.status === "failed" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  size: "sm",
                  variant: "secondary",
                  className: "gap-1.5 text-xs rounded-lg h-8 px-3 font-bold",
                  onClick: async () => {
                    const toastId = ue.loading("Triggering retry…");
                    try {
                      const { db } = await __vitePreload(async () => {
                        const { db: db2 } = await import("./index.C6yfkT5T.js").then((n) => n.hk);
                        return { db: db2 };
                      }, true ? __vite__mapDeps([1,2,3,4,5,6,7,8,9,10,11,12]) : void 0);
                      const { checkAndRunAutomation } = await __vitePreload(async () => {
                        const { checkAndRunAutomation: checkAndRunAutomation2 } = await import("./automation-engine.1xs0s3p3.js");
                        return { checkAndRunAutomation: checkAndRunAutomation2 };
                      }, true ? __vite__mapDeps([13,1,2,3,4,5,6,7,8,9,10,11,12,14]) : void 0);
                      const rule = await db.downloadRules.where("animeId").equals(entry.animeId).first();
                      if (rule) {
                        rule.lastCheckedEpisode = Math.max(0, entry.episodeNumber - 1);
                        await db.downloadRules.put(rule);
                      }
                      await checkAndRunAutomation();
                      ue.success("Retry triggered!", { id: toastId });
                      setTimeout(loadHistoryData, 2e3);
                    } catch (err) {
                      ue.error("Retry failed", { id: toastId });
                    }
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-3 h-3" }),
                    "Retry"
                  ]
                }
              )
            ] })
          ] }) }, entry.id)) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(MobileNav, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      ImportAnimeModal,
      {
        open: importModalOpen,
        filePaths: importFilePaths,
        onClose: () => setImportModalOpen(false),
        onSuccess: () => loadOfflineLibrary()
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      TorrentDownloadModal,
      {
        open: torrentModalOpen,
        onClose: () => setTorrentModalOpen(false),
        downloadPath: getDownloadPath() || void 0
      }
    )
  ] });
}
export {
  OfflineLibraryPage as default
};
