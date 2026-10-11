const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/mobileMangaDownloader.MFTcbmks.js","assets/vendor.CJyRs4QS.js","assets/react-vendor.CAo4XUiA.js","assets/index.C6yfkT5T.js","assets/tanstack.DPr3OB19.js","assets/supabase.WuRMX5Dg.js","assets/radix.BiK9uYXL.js","assets/icons.C2gBBarQ.js","assets/motion.DVGLRFCH.js","assets/hls.BlgtCWcq.js","assets/editor.Dxw8dtyw.js","assets/charts.Dr1fgDJ-.js","assets/index.CWbmAlRn.css"])))=>i.map(i=>d[i]);
import { bf as ue, b9 as __vitePreload } from "./vendor.CJyRs4QS.js";
import { e as useNavigate, r as reactExports, j as jsxRuntimeExports } from "./react-vendor.CAo4XUiA.js";
import { X as useMobileDownload, d as db, G as GlassPanel, B as Button, Q as Background, bA as Badge, T as triggerHaptic, ae as Dialog, af as DialogContent, ag as DialogHeader, ah as DialogTitle, ai as DialogDescription, ew as DialogFooter } from "./index.C6yfkT5T.js";
import { M as MobileNav } from "./MobileNav.ABHzkhTQ.js";
import { getHistoryByStatus } from "./download-history-service.Dg8G0nem.js";
import { p as peekAutoDownloadNext, e as evictWatchedAnime } from "./autoDownloadNext.BiTHv2Cb.js";
import { t as HardDrive, Y as FolderOpen, D as Download, Q as LoaderCircle, J as Trash2, k as Sparkles, B as BookOpen, N as ChevronDown, aJ as Play, c$ as FileVideo, bd as CircleX, C as CircleCheck, cA as RotateCw, X } from "./icons.C2gBBarQ.js";
import "./tanstack.DPr3OB19.js";
import "./supabase.WuRMX5Dg.js";
import "./radix.BiK9uYXL.js";
import "./motion.DVGLRFCH.js";
import "./hls.BlgtCWcq.js";
import "./editor.Dxw8dtyw.js";
import "./charts.Dr1fgDJ-.js";
function formatBytes(bytes) {
  const v = Number(bytes || 0);
  if (!Number.isFinite(v) || v <= 0) return "—";
  if (v < 1024) return `${v} B`;
  const kb = v / 1024;
  if (kb < 1024) return `${kb.toFixed(kb >= 100 ? 0 : 1)} KB`;
  const mb = kb / 1024;
  if (mb < 1024) return `${mb.toFixed(mb >= 100 ? 0 : 1)} MB`;
  return `${(mb / 1024).toFixed(2)} GB`;
}
function formatDate(iso) {
  if (!iso) return "";
  try {
    return new Date(iso).toLocaleDateString();
  } catch {
    return "";
  }
}
function ActiveRow({ item, onCancel }) {
  const pct = Math.max(0, Math.min(100, Math.round(item.progress ?? 0)));
  const sub = item.kind === "manga" ? item.subtitle || "Chapter" : item.subtitle || (item.episode != null ? `Episode ${item.episode}` : "Episode");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-3", children: [
    item.posterUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: item.posterUrl, alt: "", className: "h-14 w-10 shrink-0 rounded-lg object-cover" }) : item.kind === "manga" ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex h-14 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-5 h-5 text-primary" }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex h-14 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FileVideo, { className: "w-5 h-5 text-primary" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-sm truncate", children: item.animeTitle || item.title || "Download" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground truncate", children: sub }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1.5 h-1.5 bg-white/10 rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full bg-primary rounded-full transition-[width]", style: { width: `${item.status === "queued" ? 2 : pct}%` } }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground mt-1 tabular-nums", children: item.status === "queued" ? "Waiting…" : `${pct}%` })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "ghost", className: "h-10 w-10 p-0 shrink-0", onClick: () => {
      void triggerHaptic("warning");
      onCancel(item.id);
    }, "aria-label": "Cancel download", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4 text-destructive" }) })
  ] });
}
function seriesKey(id, title) {
  return id > 0 ? String(id) : title.trim().toLowerCase();
}
function MobileOfflinePage() {
  const navigate = useNavigate();
  const { isNative, queue, activeDownloads, cancelDownload, retryDownload } = useMobileDownload();
  const [freeingWatched, setFreeingWatched] = reactExports.useState(false);
  let upNext = null;
  try {
    upNext = peekAutoDownloadNext();
  } catch {
    upNext = null;
  }
  const [mangaChapters, setMangaChapters] = reactExports.useState([]);
  const [animeHistory, setAnimeHistory] = reactExports.useState([]);
  const [loadingLists, setLoadingLists] = reactExports.useState(true);
  const [deleteMangaTarget, setDeleteMangaTarget] = reactExports.useState(null);
  const [deleteAnimeTarget, setDeleteAnimeTarget] = reactExports.useState(null);
  const [isDeleting, setIsDeleting] = reactExports.useState(false);
  const [retryingId, setRetryingId] = reactExports.useState(null);
  const [libraryFilter, setLibraryFilter] = reactExports.useState("all");
  const mangaGroups = reactExports.useMemo(() => {
    const groups = /* @__PURE__ */ new Map();
    for (const chapter of mangaChapters) {
      const key = seriesKey(chapter.anilistId, chapter.title);
      const group = groups.get(key) || { key, title: chapter.title, posterUrl: chapter.posterUrl, items: [] };
      group.posterUrl || (group.posterUrl = chapter.posterUrl);
      group.items.push(chapter);
      groups.set(key, group);
    }
    return [...groups.values()].map((group) => ({
      ...group,
      items: group.items.sort((a, b) => (a.chapterNumber ?? Number.MAX_SAFE_INTEGER) - (b.chapterNumber ?? Number.MAX_SAFE_INTEGER))
    }));
  }, [mangaChapters]);
  const animeGroups = reactExports.useMemo(() => {
    const groups = /* @__PURE__ */ new Map();
    for (const episode of animeHistory) {
      const key = seriesKey(episode.animeId, episode.animeTitle);
      const group = groups.get(key) || { key, title: episode.animeTitle, posterUrl: episode.posterUrl, items: [] };
      group.posterUrl || (group.posterUrl = episode.posterUrl);
      if (!group.items.some((item) => item.episodeNumber === episode.episodeNumber)) group.items.push(episode);
      groups.set(key, group);
    }
    return [...groups.values()].map((group) => ({
      ...group,
      items: group.items.sort((a, b) => a.episodeNumber - b.episodeNumber)
    }));
  }, [animeHistory]);
  const libraryStats = reactExports.useMemo(() => ({
    titles: mangaGroups.length + animeGroups.length,
    items: mangaChapters.length + animeHistory.length,
    bytes: mangaChapters.reduce((sum, item) => sum + (item.sizeBytes || 0), 0) + animeHistory.reduce((sum, item) => sum + (item.fileSizeBytes || 0), 0)
  }), [animeGroups.length, animeHistory, mangaChapters, mangaGroups.length]);
  const refreshLists = reactExports.useCallback(async () => {
    try {
      const [chapters, history] = await Promise.all([
        db.offlineChapters.orderBy("downloadedAt").reverse().toArray().catch(() => []),
        getHistoryByStatus("completed", 50).catch(() => [])
      ]);
      setMangaChapters(chapters);
      setAnimeHistory(history);
    } finally {
      setLoadingLists(false);
    }
  }, []);
  reactExports.useEffect(() => {
    if (isNative) void refreshLists();
  }, [isNative, refreshLists]);
  reactExports.useEffect(() => {
    if (!isNative || !queue.some((item) => item.status === "completed")) return;
    const timer = window.setTimeout(() => void refreshLists(), 300);
    return () => window.clearTimeout(timer);
  }, [isNative, queue, refreshLists]);
  if (!isNative) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen flex items-center justify-center p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassPanel, { className: "p-8 text-center max-w-md", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(HardDrive, { className: "w-16 h-16 text-muted-foreground mx-auto mb-4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold mb-2", children: "Mobile Only" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-4", children: "Downloads are only available in the mobile app." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: () => navigate("/"), children: "Go Home" })
    ] }) });
  }
  const failedItems = queue.filter((q) => q.status === "failed");
  const hasAnything = activeDownloads.length > 0 || mangaChapters.length > 0 || animeHistory.length > 0 || failedItems.length > 0 || !!upNext;
  const handleFreeWatched = async () => {
    setFreeingWatched(true);
    try {
      const removed = await evictWatchedAnime();
      if (removed > 0) {
        void triggerHaptic("success");
        ue.success(`Freed ${removed} watched item${removed > 1 ? "s" : ""}`);
        await refreshLists();
      } else {
        ue.info("Nothing to free", { description: "No watched downloads found, or auto-evict is off in mobile settings." });
      }
    } catch {
      void triggerHaptic("error");
      ue.error("Could not free storage");
    } finally {
      setFreeingWatched(false);
    }
  };
  const handleReadManga = (ch) => {
    void triggerHaptic("tap");
    const params = new URLSearchParams();
    params.set("chapterKey", ch.chapterKey);
    if (ch.chapterNumber != null) params.set("chapterNumber", String(ch.chapterNumber));
    params.set("offline", "true");
    navigate(`/manga/read/${ch.anilistId}?${params.toString()}`);
  };
  const handlePlayAnime = (entry) => {
    var _a;
    const localPath = String(entry.localPath || "").trim();
    if (!localPath) {
      void triggerHaptic("error");
      ue.error("This download has no playable local file.");
      return;
    }
    if (entry.fileSizeBytes != null && entry.fileSizeBytes < 64 * 1024 && !/^torrent-session:\/\//i.test(localPath)) {
      void triggerHaptic("error");
      ue.error("This file is broken (too small to be video).", {
        description: "Delete it and download the episode again."
      });
      return;
    }
    void triggerHaptic("navigate");
    const params = new URLSearchParams({
      offline: "true",
      mobilePath: localPath,
      title: entry.animeTitle,
      episode: String(entry.episodeNumber)
    });
    if (entry.episodeName) params.set("episodeTitle", entry.episodeName);
    if (entry.posterUrl) params.set("poster", entry.posterUrl);
    const torrentSession = (_a = localPath.match(/^torrent-session:\/\/(.+)$/i)) == null ? void 0 : _a[1];
    if (torrentSession) params.set("sessionId", torrentSession);
    const offlineEpisodeId = `mobile-${entry.animeId}?ep=${entry.episodeNumber}`;
    navigate(`/watch/${encodeURIComponent(offlineEpisodeId)}?${params.toString()}`);
  };
  const handleDeleteManga = async () => {
    if (!deleteMangaTarget) return;
    setIsDeleting(true);
    try {
      const { deleteOfflineMangaChapter } = await __vitePreload(async () => {
        const { deleteOfflineMangaChapter: deleteOfflineMangaChapter2 } = await import("./mobileMangaDownloader.MFTcbmks.js");
        return { deleteOfflineMangaChapter: deleteOfflineMangaChapter2 };
      }, true ? __vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12]) : void 0);
      await deleteOfflineMangaChapter(deleteMangaTarget.anilistId, deleteMangaTarget.chapterKey);
      setMangaChapters((prev) => prev.filter((c) => c.id !== deleteMangaTarget.id));
      void triggerHaptic("success");
      ue.success("Chapter deleted");
    } catch {
      void triggerHaptic("error");
      ue.error("Failed to delete");
    } finally {
      setIsDeleting(false);
      setDeleteMangaTarget(null);
    }
  };
  const handleRetryAnime = async (entry) => {
    var _a;
    const episodeId = entry.episodeId || ((_a = queue.find((q) => q.kind === "anime" && q.animeTitle === entry.animeTitle && q.episode === entry.episodeNumber)) == null ? void 0 : _a.id);
    if (!episodeId) {
      void triggerHaptic("error");
      ue.info("Re-download from the series page", {
        description: "This entry is from an older version and cannot be retried here."
      });
      return;
    }
    if (queue.some((q) => q.id === episodeId && (q.status === "queued" || q.status === "downloading"))) {
      ue.info("Already downloading");
      return;
    }
    setRetryingId(entry.id);
    try {
      const { retryMobileDownload, deleteMobileAnimeDownload } = await __vitePreload(async () => {
        const { retryMobileDownload: retryMobileDownload2, deleteMobileAnimeDownload: deleteMobileAnimeDownload2 } = await import("./index.C6yfkT5T.js").then((n) => n.hm);
        return { retryMobileDownload: retryMobileDownload2, deleteMobileAnimeDownload: deleteMobileAnimeDownload2 };
      }, true ? __vite__mapDeps([3,2,1,4,5,6,7,8,9,10,11,12]) : void 0);
      const res = await retryMobileDownload(episodeId);
      if (res.ok) {
        await deleteMobileAnimeDownload(entry.id, entry.animeTitle, entry.episodeNumber);
        void triggerHaptic("success");
        ue.success(`Re-downloading Episode ${entry.episodeNumber}`);
        await refreshLists();
      } else {
        const reason = "reason" in res && typeof res.reason === "string" ? res.reason : "unknown";
        if (reason === "missing_stream_url") {
          ue.info("Re-download from the series page", {
            description: "The original stream link expired. Open the anime and pick the episode again."
          });
        } else {
          ue.error("Could not restart the download", { description: String(reason || "") });
        }
      }
    } catch (error) {
      void triggerHaptic("error");
      ue.error("Could not restart the download", {
        description: error instanceof Error ? error.message : String(error)
      });
    } finally {
      setRetryingId(null);
    }
  };
  const handleDeleteAnime = async () => {
    if (!deleteAnimeTarget) return;
    setIsDeleting(true);
    try {
      const { deleteMobileAnimeDownload } = await __vitePreload(async () => {
        const { deleteMobileAnimeDownload: deleteMobileAnimeDownload2 } = await import("./index.C6yfkT5T.js").then((n) => n.hm);
        return { deleteMobileAnimeDownload: deleteMobileAnimeDownload2 };
      }, true ? __vite__mapDeps([3,2,1,4,5,6,7,8,9,10,11,12]) : void 0);
      const res = await deleteMobileAnimeDownload(deleteAnimeTarget.id, deleteAnimeTarget.animeTitle, deleteAnimeTarget.episodeNumber);
      if (!res.ok) {
        throw new Error(typeof res.reason === "string" ? String(res.reason) : "delete failed");
      }
      {
        setAnimeHistory((prev) => prev.filter((h) => h.id !== deleteAnimeTarget.id));
        void triggerHaptic("success");
        ue.success(`Episode ${deleteAnimeTarget.episodeNumber} deleted from disk`);
      }
    } catch {
      void triggerHaptic("error");
      ue.error("Failed to delete episode");
    } finally {
      setIsDeleting(false);
      setDeleteAnimeTarget(null);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Background, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(MobileNav, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "pb-28 pt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 max-w-3xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mb-5 overflow-hidden rounded-3xl border border-white/10 bg-card/75 p-4 shadow-xl backdrop-blur-xl", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary/15 text-primary", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FolderOpen, { className: "h-6 w-6" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold tracking-tight", children: "Offline library" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Your anime and manga, ready anywhere" })
          ] }),
          activeDownloads.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "secondary", className: "shrink-0 tabular-nums", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "mr-1 h-3 w-3 animate-pulse" }),
            activeDownloads.length
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 grid grid-cols-3 divide-x divide-white/10 rounded-2xl border border-white/[0.07] bg-black/10 py-3 text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg font-bold tabular-nums", children: libraryStats.titles }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] uppercase tracking-wider text-muted-foreground", children: "Titles" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg font-bold tabular-nums", children: libraryStats.items }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] uppercase tracking-wider text-muted-foreground", children: "Items" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg font-bold tabular-nums", children: formatBytes(libraryStats.bytes) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] uppercase tracking-wider text-muted-foreground", children: "Storage" })
          ] })
        ] }),
        animeHistory.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: handleFreeWatched,
            disabled: freeingWatched,
            className: "mt-3 flex w-full items-center justify-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-xs font-semibold text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground disabled:opacity-50",
            children: [
              freeingWatched ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-3.5 w-3.5 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3.5 w-3.5" }),
              freeingWatched ? "Freeing…" : "Free up watched episodes"
            ]
          }
        )
      ] }),
      upNext && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: () => {
            void triggerHaptic("navigate");
            navigate(`/anime/${upNext.animeId}`);
          },
          className: "mb-5 flex w-full items-center gap-3 rounded-2xl border border-primary/30 bg-primary/10 p-3 text-left shadow-sm transition-colors hover:bg-primary/15 active:scale-[0.99]",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/15", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-5 w-5 text-primary" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "min-w-0 flex-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "block truncate text-sm font-semibold", children: [
                "Up next: Episode ",
                upNext.nextEpisode
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "block truncate text-xs text-muted-foreground", children: [
                upNext.animeTitle,
                " — tap to open"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "h-4 w-4 shrink-0 text-primary" })
          ]
        }
      ),
      (animeGroups.length > 0 || mangaGroups.length > 0) && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { role: "tablist", "aria-label": "Offline library filter", className: "mb-5 grid grid-cols-3 rounded-2xl border border-white/10 bg-white/[0.03] p-1", children: ["all", "anime", "manga"].map((filter) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          role: "tab",
          "aria-selected": libraryFilter === filter,
          onClick: () => {
            void triggerHaptic("select");
            setLibraryFilter(filter);
          },
          className: `min-h-10 rounded-xl px-3 text-sm font-semibold capitalize transition-colors ${libraryFilter === filter ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`,
          children: filter
        },
        filter
      )) }),
      activeDownloads.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mb-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2", children: "Downloading now" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: activeDownloads.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx(ActiveRow, { item, onCancel: cancelDownload }, item.id)) })
      ] }),
      loadingLists ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center py-20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-8 h-8 animate-spin text-primary" }) }) : !hasAnything ? /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassPanel, { className: "p-12 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(HardDrive, { className: "w-16 h-16 text-muted-foreground mx-auto mb-4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-semibold mb-2", children: "No Downloads" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-6", children: "Download episodes from the video player or chapters from a manga page" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: () => {
          void triggerHaptic("navigate");
          navigate("/");
        }, children: "Browse" })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8", children: [
        mangaChapters.length > 0 && libraryFilter !== "anime" && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2", children: [
            "Manga · ",
            mangaGroups.length,
            " title",
            mangaGroups.length > 1 ? "s" : ""
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: mangaGroups.map((group) => /* @__PURE__ */ jsxRuntimeExports.jsxs("details", { onToggle: (event) => {
            if (event.currentTarget.open) void triggerHaptic("open");
          }, className: "group overflow-hidden rounded-2xl border border-white/10 bg-card/65 shadow-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("summary", { className: "flex min-h-24 cursor-pointer list-none items-center gap-3 p-3 [&::-webkit-details-marker]:hidden", children: [
              group.posterUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: group.posterUrl, alt: `${group.title} poster`, className: "h-20 w-14 shrink-0 rounded-xl object-cover shadow-md", loading: "lazy" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex h-20 w-14 shrink-0 items-center justify-center rounded-xl bg-primary/15", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-6 w-6 text-primary" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate text-sm font-semibold", children: group.title }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                  group.items.length,
                  " chapter",
                  group.items.length > 1 ? "s" : "",
                  " · ",
                  formatBytes(group.items.reduce((sum, item) => sum + (item.sizeBytes || 0), 0))
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "h-5 w-5 shrink-0 text-muted-foreground transition-transform group-open:rotate-180" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1 border-t border-white/[0.07] p-2", children: group.items.map((ch) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 rounded-xl px-2 py-2.5 hover:bg-white/[0.04]", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium", children: ch.chapterNumber != null ? `Chapter ${ch.chapterNumber}` : "Chapter" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "truncate text-xs text-muted-foreground", children: [
                  ch.pageCount ? `${ch.pageCount} pages` : "",
                  ch.sizeBytes ? ` · ${formatBytes(ch.sizeBytes)}` : "",
                  ch.downloadedAt ? ` · ${formatDate(ch.downloadedAt)}` : ""
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", variant: "ghost", className: "h-9 px-3 gap-1.5", onClick: () => handleReadManga(ch), children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "w-4 h-4" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold", children: "Read" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "ghost", className: "h-10 w-10 p-0 text-destructive", onClick: () => {
                void triggerHaptic("warning");
                setDeleteMangaTarget(ch);
              }, "aria-label": `Delete chapter ${ch.chapterNumber ?? ""}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-4 h-4" }) })
            ] }, ch.id)) })
          ] }, group.key)) })
        ] }),
        animeHistory.length > 0 && libraryFilter !== "manga" && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2", children: [
            "Anime · ",
            animeGroups.length,
            " title",
            animeGroups.length > 1 ? "s" : ""
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: animeGroups.map((group) => /* @__PURE__ */ jsxRuntimeExports.jsxs("details", { onToggle: (event) => {
            if (event.currentTarget.open) void triggerHaptic("open");
          }, className: "group overflow-hidden rounded-2xl border border-white/10 bg-card/65 shadow-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("summary", { className: "flex min-h-24 cursor-pointer list-none items-center gap-3 p-3 [&::-webkit-details-marker]:hidden", children: [
              group.posterUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: group.posterUrl, alt: `${group.title} poster`, className: "h-20 w-14 shrink-0 rounded-xl object-cover shadow-md", loading: "lazy" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex h-20 w-14 shrink-0 items-center justify-center rounded-xl bg-primary/15", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FileVideo, { className: "h-6 w-6 text-primary" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate text-sm font-semibold", children: group.title }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                  group.items.length,
                  " episode",
                  group.items.length > 1 ? "s" : "",
                  " · ",
                  formatBytes(group.items.reduce((sum, item) => sum + (item.fileSizeBytes || 0), 0))
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "h-5 w-5 shrink-0 text-muted-foreground transition-transform group-open:rotate-180" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1 border-t border-white/[0.07] p-2", children: group.items.map((h) => {
              const broken = h.fileSizeBytes != null && h.fileSizeBytes < 64 * 1024 && !/^torrent-session:\/\//i.test(String(h.localPath || ""));
              return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "flex min-h-12 w-full items-center gap-2 rounded-xl px-2 py-2.5 transition-colors hover:bg-white/[0.04]",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "button",
                      {
                        type: "button",
                        onClick: () => handlePlayAnime(h),
                        className: "flex min-w-0 flex-1 items-center gap-3 text-left active:bg-white/[0.08]",
                        "aria-label": `Play episode ${h.episodeNumber}`,
                        children: [
                          broken ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "h-4 w-4 shrink-0 text-amber-400" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-4 w-4 shrink-0 text-green-500" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-medium", children: [
                              "Episode ",
                              h.episodeNumber
                            ] }),
                            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "truncate text-xs text-muted-foreground", children: [
                              h.fileSizeBytes ? formatBytes(h.fileSizeBytes) : "Downloaded",
                              h.completedAt ? ` · ${formatDate(h.completedAt)}` : "",
                              broken ? " · broken" : ""
                            ] })
                          ] }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "shrink-0 text-[10px]", children: h.sourceType === "torrent" ? "Torrent" : h.sourceType === "hls" ? "HLS" : "Video" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "h-4 w-4 shrink-0 text-primary" })
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        size: "sm",
                        variant: "ghost",
                        className: "h-9 w-9 shrink-0 p-0",
                        disabled: retryingId === h.id,
                        onClick: () => {
                          void triggerHaptic("tap");
                          void handleRetryAnime(h);
                        },
                        "aria-label": `Re-download episode ${h.episodeNumber}`,
                        title: "Re-download",
                        children: retryingId === h.id ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCw, { className: "h-4 w-4" })
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        size: "sm",
                        variant: "ghost",
                        className: "h-9 w-9 shrink-0 p-0 text-destructive",
                        onClick: () => {
                          void triggerHaptic("warning");
                          setDeleteAnimeTarget(h);
                        },
                        "aria-label": `Delete episode ${h.episodeNumber}`,
                        title: "Delete from disk",
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" })
                      }
                    )
                  ]
                },
                h.id
              );
            }) })
          ] }, group.key)) })
        ] }),
        failedItems.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2", children: "Failed" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: failedItems.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 p-3 rounded-xl bg-red-500/[0.06] border border-red-500/20", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-5 h-5 text-red-400 shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-sm truncate", children: item.animeTitle || item.title || "Download" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-red-300/80 truncate", children: item.error || "Download failed." })
            ] }),
            item.kind === "anime" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                size: "sm",
                variant: "ghost",
                className: "h-9 shrink-0 gap-1.5 px-3",
                onClick: () => {
                  void triggerHaptic("tap");
                  retryDownload(item.id);
                },
                "aria-label": `Retry download of ${item.animeTitle || "episode"}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCw, { className: "w-4 h-4" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold", children: "Retry" })
                ]
              }
            ) : item.anilistId ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                size: "sm",
                variant: "ghost",
                className: "h-9 shrink-0 gap-1.5 px-3",
                onClick: () => {
                  void triggerHaptic("navigate");
                  navigate(`/manga/${item.anilistId}`);
                },
                "aria-label": "Open manga to re-download",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-4 h-4" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold", children: "Open" })
                ]
              }
            ) : null
          ] }, item.id)) })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: !!deleteAnimeTarget, onOpenChange: () => setDeleteAnimeTarget(null), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Delete Episode?" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogDescription, { children: [
          "Delete Episode ",
          deleteAnimeTarget == null ? void 0 : deleteAnimeTarget.episodeNumber,
          " of “",
          deleteAnimeTarget == null ? void 0 : deleteAnimeTarget.animeTitle,
          "” from disk?",
          (deleteAnimeTarget == null ? void 0 : deleteAnimeTarget.fileSizeBytes) ? ` This frees ${formatBytes(deleteAnimeTarget.fileSizeBytes)}.` : ""
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", onClick: () => setDeleteAnimeTarget(null), disabled: isDeleting, children: "Cancel" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "destructive", onClick: handleDeleteAnime, disabled: isDeleting, children: [
          isDeleting && /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin mr-2" }),
          "Delete"
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: !!deleteMangaTarget, onOpenChange: () => setDeleteMangaTarget(null), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Delete Chapter?" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogDescription, { children: [
          "Delete ",
          (deleteMangaTarget == null ? void 0 : deleteMangaTarget.chapterNumber) != null ? `Ch. ${deleteMangaTarget.chapterNumber}` : "this chapter",
          " of “",
          deleteMangaTarget == null ? void 0 : deleteMangaTarget.title,
          "”?"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", onClick: () => setDeleteMangaTarget(null), disabled: isDeleting, children: "Cancel" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "destructive", onClick: handleDeleteManga, disabled: isDeleting, children: [
          isDeleting && /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin mr-2" }),
          "Delete"
        ] })
      ] })
    ] }) })
  ] });
}
export {
  MobileOfflinePage as default
};
