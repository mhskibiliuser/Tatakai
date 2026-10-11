import { bQ as useSortable, bR as CSS, bf as ue, bI as useSensors, bJ as useSensor, bp as formatDistanceToNow, bK as DndContext, bL as closestCenter, bO as SortableContext, bP as rectSortingStrategy, bS as verticalListSortingStrategy, bT as arrayMove, bU as sortableKeyboardCoordinates, bV as KeyboardSensor, bN as PointerSensor, b9 as __vitePreload } from "./vendor.CJyRs4QS.js";
import { j as jsxRuntimeExports, L as Link, r as reactExports, e as useNavigate, i as useParams } from "./react-vendor.CAo4XUiA.js";
import { l as getProxiedImageUrl, B as Button, j as cn, aw as useAddToPlaylist, fH as useSearch, fI as useMangaSearch, ae as Dialog, af as DialogContent, ag as DialogHeader, ah as DialogTitle, az as Input, aC as ScrollArea, u as useAuth, a2 as supabase, E as useWatchlist, bv as useMangaReadlist, at as usePlaylists, av as useCreatePlaylist, fJ as useDeletePlaylist, y as useDiscoverPlaylists, S as Sidebar, G as GlassPanel, ax as DialogTrigger, ay as Label, aA as Textarea, aB as Switch, ew as DialogFooter, aV as Select, aW as SelectTrigger, aX as SelectValue, aY as SelectContent, aZ as SelectItem, cg as AlertDialog, ch as AlertDialogContent, ci as AlertDialogHeader, cj as AlertDialogTitle, ck as AlertDialogDescription, cl as AlertDialogFooter, cm as AlertDialogCancel, cn as AlertDialogAction, fK as usePlaylist, aR as usePlaylistItems, fL as useUpdatePlaylist, fM as useRemoveFromPlaylist, fN as useReorderPlaylistItems, a8 as Avatar, a9 as AvatarImage, aa as AvatarFallback, fO as Progress, eQ as Comments } from "./index.C6yfkT5T.js";
import { M as MobileNav } from "./MobileNav.ABHzkhTQ.js";
import { a as useQuery, u as useQueryClient, b as useMutation } from "./tanstack.DPr3OB19.js";
import { P as PlaylistCard } from "./PlaylistCard.D4Kupyt4.js";
import { cZ as GripVertical, U as Users, J as Trash2, B as BookOpen, aJ as Play, P as Plus, ay as Tv, S as Search, Q as LoaderCircle, c as Check, az as Music2, a5 as Globe, a6 as Lock, k as Sparkles, cQ as BookmarkCheck, bK as Compass, e as TrendingUp, H as Heart, aD as Clock, u as ArrowLeft, bF as Calendar, aL as Bookmark, bg as Share2, aP as Pen, c_ as LayoutList, L as LayoutGrid, y as MessageSquare, X } from "./icons.C2gBBarQ.js";
import { S as Seo } from "./Seo.CEAYCbtv.js";
import { A as AnimatePresence, m as motion } from "./motion.DVGLRFCH.js";
import "./supabase.WuRMX5Dg.js";
import "./radix.BiK9uYXL.js";
import "./hls.BlgtCWcq.js";
import "./editor.Dxw8dtyw.js";
import "./charts.Dr1fgDJ-.js";
const MEDIA_LABELS = {
  anime: "Anime",
  manga: "Manga",
  manhwa: "Manhwa",
  manhua: "Manhua",
  comic: "Comic",
  comics: "Comic",
  novel: "Novel",
  light_novel: "Novel",
  one_shot: "One-shot"
};
function formatMediaLabel(mediaFormat, mediaKind) {
  const f = String(mediaFormat || "").trim().toLowerCase();
  if (f) return MEDIA_LABELS[f] || f.charAt(0).toUpperCase() + f.slice(1);
  return mediaKind === "manga" ? "Manga" : "Anime";
}
function SortablePlaylistItem({
  item,
  index,
  viewMode,
  canEdit,
  mediaKind,
  href,
  onRemove,
  onLaunchWatchRoom
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: item.id,
    disabled: !canEdit
  });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : void 0,
    opacity: isDragging ? 0.85 : 1
  };
  const typeLabel = formatMediaLabel(item.media_format, mediaKind);
  if (viewMode === "grid") {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        ref: setNodeRef,
        style,
        className: cn(
          "group relative rounded-xl overflow-hidden border border-border/50 bg-muted/20 hover:border-primary/40 transition-colors",
          isDragging && "ring-2 ring-primary/50 shadow-xl"
        ),
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: href, className: "block", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-[2/3] overflow-hidden", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: getProxiedImageUrl(item.anime_poster || "/placeholder.svg"),
                alt: item.anime_name,
                className: "w-full h-full object-cover transition-transform group-hover:scale-105"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute top-2 left-2 h-6 min-w-6 px-1.5 rounded-full bg-black/60 backdrop-blur text-white text-xs font-mono flex items-center justify-center", children: index + 1 }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-x-0 bottom-0 p-2.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold text-white line-clamp-2 leading-tight", children: item.anime_name }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-white/70 mt-0.5", children: typeLabel })
            ] })
          ] }) }),
          canEdit && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              className: "absolute top-2 right-2 h-6 w-6 rounded-md bg-black/50 backdrop-blur text-white/80 hover:text-white flex items-center justify-center cursor-grab active:cursor-grabbing touch-none opacity-0 group-hover:opacity-100 transition-opacity",
              "aria-label": "Drag to reorder",
              ...attributes,
              ...listeners,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(GripVertical, { className: "w-3.5 h-3.5" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute bottom-2 right-2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity", children: [
            mediaKind === "anime" && /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "ghost",
                size: "icon",
                onClick: (event) => {
                  event.preventDefault();
                  event.stopPropagation();
                  onLaunchWatchRoom(item.anime_id, item.anime_name, item.anime_poster);
                },
                className: "h-7 w-7 rounded-md bg-black/50 backdrop-blur text-white/80 hover:text-primary",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-3.5 h-3.5" })
              }
            ),
            canEdit && /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "ghost",
                size: "icon",
                onClick: (event) => {
                  event.preventDefault();
                  event.stopPropagation();
                  onRemove(item.anime_id);
                },
                className: "h-7 w-7 rounded-md bg-black/50 backdrop-blur text-white/80 hover:text-destructive",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3.5 h-3.5" })
              }
            )
          ] })
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      ref: setNodeRef,
      style,
      className: cn(
        "flex items-center gap-3 p-3 rounded-xl hover:bg-muted/50 transition-colors group",
        isDragging && "bg-muted/60 ring-2 ring-primary/40 shadow-lg"
      ),
      children: [
        canEdit ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            className: "text-muted-foreground/60 hover:text-foreground cursor-grab active:cursor-grabbing touch-none w-6 flex items-center justify-center",
            "aria-label": "Drag to reorder",
            ...attributes,
            ...listeners,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(GripVertical, { className: "w-4 h-4" })
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground w-6 text-center font-mono text-sm", children: index + 1 }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: href, className: "flex items-center gap-4 flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-16 h-20 rounded-lg overflow-hidden flex-shrink-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: getProxiedImageUrl(item.anime_poster || "/placeholder.svg"),
                alt: item.anime_name,
                className: "w-full h-full object-cover"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center", children: mediaKind === "manga" ? /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-6 h-6 text-white" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "w-6 h-6 text-white" }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold line-clamp-1 group-hover:text-primary transition-colors", children: item.anime_name }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
              typeLabel,
              " • Added ",
              new Date(item.added_at).toLocaleDateString()
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity", children: [
          mediaKind === "anime" && /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "ghost",
              size: "sm",
              onClick: (event) => {
                event.preventDefault();
                event.stopPropagation();
                onLaunchWatchRoom(item.anime_id, item.anime_name, item.anime_poster);
              },
              className: "text-muted-foreground hover:text-primary",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-4 h-4" })
            }
          ),
          canEdit && /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "ghost",
              size: "icon",
              onClick: () => onRemove(item.anime_id),
              className: "text-muted-foreground hover:text-destructive",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-4 h-4" })
            }
          )
        ] })
      ]
    }
  );
}
function resolveMangaFormat(row) {
  const t = String(row.type || "").toLowerCase();
  if (t) return t === "comics" ? "comic" : t;
  const f = String(row.format || "").toUpperCase();
  if (f === "NOVEL" || f === "LIGHT_NOVEL") return "novel";
  if (f === "OEL") return "comic";
  if (f === "MANHWA") return "manhwa";
  if (f === "MANHUA") return "manhua";
  return "manga";
}
function AddMediaToPlaylistDialog({
  playlistId,
  existingRefs,
  open,
  onOpenChange
}) {
  const [kind, setKind] = reactExports.useState("anime");
  const [query, setQuery] = reactExports.useState("");
  const [debouncedQuery, setDebouncedQuery] = reactExports.useState("");
  const [pendingRef, setPendingRef] = reactExports.useState(null);
  const addToPlaylist = useAddToPlaylist();
  reactExports.useEffect(() => {
    const timer = window.setTimeout(() => setDebouncedQuery(query.trim()), 350);
    return () => window.clearTimeout(timer);
  }, [query]);
  const animeSearch = useSearch(kind === "anime" ? debouncedQuery : "");
  const mangaSearch = useMangaSearch(kind === "manga" ? debouncedQuery : "");
  const results = reactExports.useMemo(() => {
    var _a, _b;
    if (kind === "anime") {
      const animes = ((_a = animeSearch.data) == null ? void 0 : _a.animes) || [];
      return animes.filter((a) => a.id).map((a) => ({ ref: String(a.id), name: a.name || "Untitled", poster: a.poster || null, kind: "anime", format: "anime" }));
    }
    const rows = ((_b = mangaSearch.data) == null ? void 0 : _b.results) || [];
    return rows.map((row) => {
      const mediaId = String(row.anilistId || row.malId || row.id || "");
      return mediaId ? { ref: `manga:${mediaId}`, name: row.canonicalTitle || "Untitled", poster: row.poster || null, kind: "manga", format: resolveMangaFormat(row) } : null;
    }).filter((r) => r !== null);
  }, [kind, animeSearch.data, mangaSearch.data]);
  const isLoading = kind === "anime" ? animeSearch.isFetching : mangaSearch.isFetching;
  const handleAdd = async (result) => {
    if (existingRefs.has(result.ref) || pendingRef) return;
    setPendingRef(result.ref);
    try {
      await addToPlaylist.mutateAsync({
        playlistId,
        animeId: result.ref,
        animeName: result.name,
        animePoster: result.poster || void 0,
        mediaFormat: result.format
      });
    } catch {
    } finally {
      setPendingRef(null);
    }
  };
  const switchKind = (next) => {
    if (next === kind) return;
    setKind(next);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-lg", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-5 h-5 text-primary" }),
      "Add media to playlist"
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 py-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-1 p-1 rounded-lg bg-muted/40", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => switchKind("anime"),
            className: cn(
              "flex items-center justify-center gap-2 py-2 rounded-md text-sm font-medium transition-colors",
              kind === "anime" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
            ),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Tv, { className: "w-4 h-4" }),
              " Anime"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => switchKind("manga"),
            className: cn(
              "flex items-center justify-center gap-2 py-2 rounded-md text-sm font-medium transition-colors",
              kind === "manga" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
            ),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-4 h-4" }),
              " Manga"
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            value: query,
            onChange: (e) => setQuery(e.target.value),
            placeholder: `Search ${kind === "manga" ? "manga" : "anime"}...`,
            className: "pl-9",
            autoFocus: true
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollArea, { className: "h-[320px] -mr-3 pr-3", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-6 h-6 animate-spin text-muted-foreground" }) }) : !debouncedQuery ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-16 text-muted-foreground text-sm", children: [
        "Start typing to search for ",
        kind === "manga" ? "manga" : "anime",
        "."
      ] }) : results.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center py-16 text-muted-foreground text-sm", children: "No results found." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-3", children: results.map((result) => {
        const added = existingRefs.has(result.ref);
        const pending = pendingRef === result.ref;
        return /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => handleAdd(result),
            disabled: added || pending,
            className: cn(
              "group relative rounded-lg overflow-hidden border text-left transition-colors",
              added ? "border-primary/60" : "border-border/50 hover:border-primary/40"
            ),
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-[2/3] bg-muted", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: getProxiedImageUrl(result.poster || "/placeholder.svg"),
                  alt: result.name,
                  className: "w-full h-full object-cover"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: cn(
                    "absolute inset-0 flex items-center justify-center transition-opacity",
                    added ? "bg-primary/30 opacity-100" : "bg-black/40 opacity-0 group-hover:opacity-100"
                  ),
                  children: pending ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-6 h-6 text-white animate-spin" }) : added ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-7 h-7 text-white" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-7 h-7 text-white" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "absolute inset-x-0 bottom-0 p-1.5 text-[11px] font-medium text-white line-clamp-2 leading-tight", children: result.name })
            ] })
          },
          result.ref
        );
      }) }) })
    ] })
  ] }) });
}
function usePlaylistLikeState(playlistId) {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["playlist-like", playlistId, user == null ? void 0 : user.id],
    queryFn: async () => {
      if (!user || !playlistId) return false;
      const { data, error } = await supabase.from("playlist_likes").select("id").eq("playlist_id", playlistId).eq("user_id", user.id).maybeSingle();
      if (error) throw error;
      return !!data;
    },
    enabled: !!user && !!playlistId
  });
}
function useTogglePlaylistLike() {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  return useMutation({
    mutationFn: async ({ playlistId, liked }) => {
      if (!user) throw new Error("You must be signed in to like playlists.");
      if (liked) {
        const { error: error2 } = await supabase.from("playlist_likes").delete().eq("playlist_id", playlistId).eq("user_id", user.id);
        if (error2) throw error2;
        return false;
      }
      const { error } = await supabase.from("playlist_likes").insert({ playlist_id: playlistId, user_id: user.id });
      if (error) throw error;
      return true;
    },
    onSuccess: (_res, { playlistId }) => {
      queryClient.invalidateQueries({ queryKey: ["playlist-like", playlistId] });
      queryClient.invalidateQueries({ queryKey: ["playlist", playlistId] });
      queryClient.invalidateQueries({ queryKey: ["playlists"] });
      queryClient.invalidateQueries({ queryKey: ["user-playlists"] });
    },
    onError: (err) => {
      ue.error(err instanceof Error ? err.message : "Could not update like.");
    }
  });
}
function useIsPlaylistSaved(playlistId) {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["playlist-saved", playlistId, user == null ? void 0 : user.id],
    queryFn: async () => {
      if (!user || !playlistId) return false;
      const { data, error } = await supabase.from("saved_playlists").select("id").eq("playlist_id", playlistId).eq("user_id", user.id).maybeSingle();
      if (error) throw error;
      return !!data;
    },
    enabled: !!user && !!playlistId
  });
}
function useToggleSavePlaylist() {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  return useMutation({
    mutationFn: async ({ playlistId, saved }) => {
      if (!user) throw new Error("You must be signed in to save playlists.");
      if (saved) {
        const { error: error2 } = await supabase.from("saved_playlists").delete().eq("playlist_id", playlistId).eq("user_id", user.id);
        if (error2) throw error2;
        return false;
      }
      const { error } = await supabase.from("saved_playlists").insert({ playlist_id: playlistId, user_id: user.id });
      if (error) throw error;
      return true;
    },
    onSuccess: (saved, { playlistId }) => {
      queryClient.invalidateQueries({ queryKey: ["playlist-saved", playlistId] });
      queryClient.invalidateQueries({ queryKey: ["saved-playlists"] });
      ue.success(saved ? "Added to your library." : "Removed from your library.");
    },
    onError: (err) => {
      ue.error(err instanceof Error ? err.message : "Could not update your library.");
    }
  });
}
function useSavedPlaylists() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["saved-playlists", user == null ? void 0 : user.id],
    queryFn: async () => {
      if (!user) return [];
      const { data, error } = await supabase.from("saved_playlists").select("id, created_at, playlist:playlists(*)").eq("user_id", user.id).order("created_at", { ascending: false });
      if (error) throw error;
      return (data || []).map((row) => row.playlist).filter((p) => !!p);
    },
    enabled: !!user
  });
}
function usePlaylistProgress(items) {
  const { user } = useAuth();
  const { data: watchlist } = useWatchlist();
  const { data: completedManga } = useMangaReadlist(["completed"]);
  return reactExports.useMemo(() => {
    const list = items || [];
    const total = list.length;
    if (!user || total === 0) return { total, completed: 0, percent: 0 };
    const completedAnime = /* @__PURE__ */ new Set();
    (watchlist || []).forEach((w) => {
      if (w.status !== "completed") return;
      const row = w;
      if (w.anime_id) completedAnime.add(String(w.anime_id));
      if (row.anilist_id != null) completedAnime.add(String(row.anilist_id));
      if (row.mal_id != null) completedAnime.add(String(row.mal_id));
    });
    const completedMangaSet = /* @__PURE__ */ new Set();
    (completedManga || []).forEach((m) => {
      if (m.manga_id) completedMangaSet.add(String(m.manga_id));
      if (m.anilist_id != null) completedMangaSet.add(String(m.anilist_id));
      if (m.mal_id != null) completedMangaSet.add(String(m.mal_id));
    });
    let completed = 0;
    for (const item of list) {
      const ref = item.anime_id;
      const isManga = ref.startsWith("manga:");
      const id = ref.replace(/^manga:/, "").replace(/^anime:/, "");
      if (isManga) {
        if (completedMangaSet.has(id) || completedMangaSet.has(ref)) completed += 1;
      } else if (completedAnime.has(id) || completedAnime.has(ref)) {
        completed += 1;
      }
    }
    const percent = total > 0 ? Math.round(completed / total * 100) : 0;
    return { total, completed, percent };
  }, [items, user, watchlist, completedManga]);
}
function usePlaylistCollaborators(playlistId) {
  return useQuery({
    queryKey: ["playlist_collaborators", playlistId],
    queryFn: async () => {
      if (!playlistId) return [];
      const { data, error } = await supabase.from("playlist_collaborators").select("*").eq("playlist_id", playlistId).order("added_at", { ascending: true });
      if (error) throw error;
      const collaborators = data || [];
      if (collaborators.length === 0) return [];
      const userIds = [...new Set(collaborators.map((row) => row.user_id).filter(Boolean))];
      let profileMap = /* @__PURE__ */ new Map();
      if (userIds.length > 0) {
        const { data: profiles } = await supabase.from("profiles").select("user_id, display_name, username, avatar_url").in("user_id", userIds);
        profileMap = new Map((profiles || []).map((profile) => [profile.user_id, profile]));
      }
      return collaborators.map((row) => ({
        ...row,
        profile: profileMap.get(row.user_id) || null
      }));
    },
    enabled: !!playlistId
  });
}
function useCanEditPlaylist(playlistId) {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["can_edit_playlist", playlistId, user == null ? void 0 : user.id],
    queryFn: async () => {
      if (!playlistId || !user) return false;
      const { data: playlist } = await supabase.from("playlists").select("user_id").eq("id", playlistId).single();
      if ((playlist == null ? void 0 : playlist.user_id) === user.id) return true;
      const { data: collab } = await supabase.from("playlist_collaborators").select("role").eq("playlist_id", playlistId).eq("user_id", user.id).single();
      return (collab == null ? void 0 : collab.role) === "editor" || (collab == null ? void 0 : collab.role) === "admin";
    },
    enabled: !!playlistId && !!user
  });
}
function useAddCollaborator() {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  return useMutation({
    mutationFn: async ({
      playlistId,
      userId,
      role = "editor"
    }) => {
      if (!user) throw new Error("Not logged in");
      const { data, error } = await supabase.from("playlist_collaborators").insert({
        playlist_id: playlistId,
        user_id: userId,
        role,
        added_by: user.id
      }).select().single();
      if (error) throw error;
      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["playlist_collaborators", variables.playlistId]
      });
      queryClient.invalidateQueries({
        queryKey: ["can_edit_playlist", variables.playlistId]
      });
      ue.success("Collaborator added");
    },
    onError: (error) => {
      ue.error(error.message || "Failed to add collaborator");
    }
  });
}
function useUpdateCollaborator() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      playlistId,
      collaboratorId,
      role
    }) => {
      const { error } = await supabase.from("playlist_collaborators").update({ role }).eq("id", collaboratorId).eq("playlist_id", playlistId);
      if (error) throw error;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["playlist_collaborators", variables.playlistId] });
      queryClient.invalidateQueries({ queryKey: ["can_edit_playlist", variables.playlistId] });
      ue.success("Collaborator updated");
    },
    onError: () => {
      ue.error("Failed to update collaborator");
    }
  });
}
function useRemoveCollaborator() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ playlistId, collaboratorId }) => {
      const { error } = await supabase.from("playlist_collaborators").delete().eq("id", collaboratorId).eq("playlist_id", playlistId);
      if (error) throw error;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["playlist_collaborators", variables.playlistId] });
      queryClient.invalidateQueries({ queryKey: ["can_edit_playlist", variables.playlistId] });
      ue.success("Collaborator removed");
    },
    onError: () => {
      ue.error("Failed to remove collaborator");
    }
  });
}
function isUuidLike(value) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
}
function parsePlaylistMediaRef(value) {
  const raw = String(value || "").trim();
  if (raw.toLowerCase().startsWith("manga:")) {
    return { kind: "manga", id: raw.slice(6) };
  }
  if (raw.toLowerCase().startsWith("anime:")) {
    return { kind: "anime", id: raw.slice(6) };
  }
  return { kind: "anime", id: raw };
}
function getPlaylistItemHref(animeId) {
  const media = parsePlaylistMediaRef(animeId);
  if (media.kind === "manga") {
    return `/manga/${encodeURIComponent(media.id)}`;
  }
  return `/anime/${encodeURIComponent(media.id)}`;
}
const PLAYLIST_COLLAB_SEARCH_DEBOUNCE_MS = 300;
const PLAYLIST_EDIT_DRAFT_SAVE_DEBOUNCE_MS = 500;
const PLAYLIST_EDIT_DRAFT_MAX_AGE_MS = 7 * 24 * 60 * 60 * 1e3;
const PLAYLIST_EDIT_DRAFT_STORAGE_PREFIX = "tatakai_playlist_edit_draft_v1";
function getPlaylistEditDraftStorageKey(playlistId) {
  if (!playlistId) return null;
  return `${PLAYLIST_EDIT_DRAFT_STORAGE_PREFIX}:${playlistId}`;
}
function SavedPlaylistCard({ playlist }) {
  const { data: items = [] } = usePlaylistItems(playlist.id);
  const progress = usePlaylistProgress(items);
  const covers = items.slice(0, 4).map((item) => item.anime_poster).filter(Boolean);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Link,
    {
      to: `/playlist/${playlist.id}`,
      className: "group relative flex gap-4 p-4 rounded-2xl border border-border/40 bg-card/40 backdrop-blur-sm hover:bg-card/80 hover:border-primary/40 transition-all duration-300 overflow-hidden hover:shadow-lg hover:shadow-primary/5",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative w-24 h-24 flex-shrink-0 rounded-xl overflow-hidden bg-muted shadow-md", children: covers.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn(
          "grid w-full h-full transform group-hover:scale-105 transition-transform duration-500",
          covers.length === 1 ? "grid-cols-1" : "grid-cols-2",
          covers.length >= 3 && "grid-rows-2"
        ), children: covers.map((img, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: getProxiedImageUrl(img), alt: "", className: "w-full h-full object-cover" }, idx)) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-purple-500/20 group-hover:scale-105 transition-transform duration-500", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Music2, { className: "w-8 h-8 text-muted-foreground/70" }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1 min-w-0 flex flex-col justify-center py-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-lg truncate group-hover:text-primary transition-colors", children: playlist.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mb-3 flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Layers, { className: "w-3.5 h-3.5" }),
            playlist.items_count,
            " ",
            playlist.items_count === 1 ? "item" : "items"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Progress, { value: progress.percent, className: "h-2 flex-1 bg-background" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-semibold text-muted-foreground w-16 text-right", children: [
              progress.percent,
              "%"
            ] })
          ] })
        ] })
      ]
    }
  );
}
function Layers(props) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", ...props, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("polygon", { points: "12 2 2 7 12 12 22 7 12 2" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("polyline", { points: "2 12 12 17 22 12" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("polyline", { points: "2 17 12 22 22 17" })
  ] });
}
function PlaylistsPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { data: playlists = [], isLoading } = usePlaylists();
  const { data: savedPlaylists = [] } = useSavedPlaylists();
  const createPlaylist = useCreatePlaylist();
  const deletePlaylist = useDeletePlaylist();
  const [showCreate, setShowCreate] = reactExports.useState(false);
  const [newName, setNewName] = reactExports.useState("");
  const [newDesc, setNewDesc] = reactExports.useState("");
  const [newPublic, setNewPublic] = reactExports.useState(false);
  const [deleteId, setDeleteId] = reactExports.useState(null);
  const [discoverInput, setDiscoverInput] = reactExports.useState("");
  const [discoverSearch, setDiscoverSearch] = reactExports.useState("");
  const [discoverSort, setDiscoverSort] = reactExports.useState("trending");
  reactExports.useEffect(() => {
    const t = setTimeout(() => setDiscoverSearch(discoverInput.trim()), 300);
    return () => clearTimeout(t);
  }, [discoverInput]);
  const { data: discoverPlaylists = [], isLoading: discoverLoading } = useDiscoverPlaylists({
    search: discoverSearch,
    sort: discoverSort
  });
  const handleCreate = async () => {
    if (!newName.trim()) return;
    await createPlaylist.mutateAsync({
      name: newName.trim(),
      description: newDesc.trim() || void 0,
      isPublic: newPublic
    });
    setNewName("");
    setNewDesc("");
    setNewPublic(false);
    setShowCreate(false);
  };
  const handleDelete = async () => {
    if (!deleteId) return;
    await deletePlaylist.mutateAsync(deleteId);
    setDeleteId(null);
  };
  if (!user) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background text-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Sidebar, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "relative z-10 pl-0 md:pl-20 lg:pl-24 w-full flex items-center justify-center min-h-[80vh]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassPanel, { className: "max-w-md mx-auto p-10 text-center rounded-3xl border-border/30 shadow-2xl", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Music2, { className: "w-10 h-10 text-primary" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold mb-3 tracking-tight", children: "Your Library" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-8 text-lg", children: "Sign in to curate, share, and manage your personal anime & manga collections." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "lg", className: "w-full rounded-full h-12 text-base font-semibold", onClick: () => navigate("/auth"), children: "Sign In to Continue" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(MobileNav, {})
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background text-foreground relative", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-primary/5 via-primary/5 to-transparent pointer-events-none -z-10" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Sidebar, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "relative z-10 pl-0 md:pl-20 lg:pl-24 w-full pb-24", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 md:px-8 py-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2.5 bg-primary/10 rounded-xl text-primary", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Music2, { className: "w-6 h-6" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-4xl md:text-5xl font-extrabold tracking-tight", children: "My Playlists" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-lg ml-1", children: [
            playlists.length,
            " ",
            playlists.length === 1 ? "collection" : "collections",
            " crafted by you"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Dialog, { open: showCreate, onOpenChange: setShowCreate, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "lg", className: "gap-2 rounded-full shadow-lg shadow-primary/20 transition-all hover:scale-105 active:scale-95", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-5 h-5" }),
            "Create Playlist"
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "sm:max-w-md rounded-3xl", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "text-2xl font-bold", children: "New Playlist" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5 py-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-sm font-semibold text-muted-foreground uppercase tracking-wider", children: "Name" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    value: newName,
                    onChange: (e) => setNewName(e.target.value),
                    placeholder: "e.g. Summer 2024 Binge",
                    className: "h-12 text-lg bg-muted/50 border-transparent focus-visible:border-primary"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-sm font-semibold text-muted-foreground uppercase tracking-wider", children: "Description (optional)" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Textarea,
                  {
                    value: newDesc,
                    onChange: (e) => setNewDesc(e.target.value),
                    placeholder: "What is this collection about?",
                    rows: 3,
                    className: "resize-none bg-muted/50 border-transparent focus-visible:border-primary"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between p-4 rounded-xl border border-border/50 bg-muted/20", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("p-2 rounded-full", newPublic ? "bg-green-500/20 text-green-500" : "bg-muted text-muted-foreground"), children: newPublic ? /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { className: "w-5 h-5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-5 h-5" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-base font-semibold cursor-pointer", htmlFor: "public-toggle", children: "Public Visibility" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Allow others to discover this playlist" })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Switch,
                  {
                    id: "public-toggle",
                    checked: newPublic,
                    onCheckedChange: setNewPublic
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", onClick: () => setShowCreate(false), className: "rounded-full", children: "Cancel" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  onClick: handleCreate,
                  disabled: !newName.trim() || createPlaylist.isPending,
                  className: "rounded-full px-8",
                  children: createPlaylist.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin" }) : "Create"
                }
              )
            ] })
          ] })
        ] })
      ] }),
      isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6", children: [...Array(5)].map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-square bg-muted/50 rounded-2xl animate-pulse" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-4 bg-muted/50 rounded-full animate-pulse w-3/4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3 bg-muted/50 rounded-full animate-pulse w-1/2" })
      ] }, i)) }) : playlists.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: playlists.map((playlist, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, scale: 0.9, y: 10 },
          animate: { opacity: 1, scale: 1, y: 0 },
          exit: { opacity: 0, scale: 0.9 },
          transition: { duration: 0.2, delay: index * 0.05 },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            PlaylistCard,
            {
              playlist,
              onDelete: () => setDeleteId(playlist.id)
            }
          )
        },
        playlist.id
      )) }) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full p-12 text-center rounded-3xl border-2 border-dashed border-border/50 bg-muted/10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 bg-muted/50 rounded-full flex items-center justify-center mx-auto mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-8 h-8 text-muted-foreground" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold mb-2", children: "It's a little quiet here" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-6 max-w-sm mx-auto", children: "Create your first playlist to start organizing your favorite anime and manga titles." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: () => setShowCreate(true), className: "gap-2 rounded-full", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-5 h-5" }),
          "Create your first playlist"
        ] })
      ] }),
      savedPlaylists.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-20", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-6 border-b border-border/30 pb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 bg-blue-500/10 rounded-lg text-blue-500", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BookmarkCheck, { className: "w-5 h-5" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold tracking-tight", children: "Saved Playlists" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
              savedPlaylists.length,
              " collections from the community"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5", children: savedPlaylists.map((playlist) => /* @__PURE__ */ jsxRuntimeExports.jsx(SavedPlaylistCard, { playlist }, playlist.id)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-24", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8 border-b border-border/30 pb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 bg-purple-500/10 rounded-lg text-purple-500", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Compass, { className: "w-6 h-6" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl font-bold tracking-tight", children: "Discover" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Explore public collections created by the community" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full sm:w-72", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  value: discoverInput,
                  onChange: (e) => setDiscoverInput(e.target.value),
                  placeholder: "Search titles, themes...",
                  className: "pl-10 h-11 rounded-full bg-card/50 backdrop-blur border-border/50 focus-visible:ring-purple-500/30"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: discoverSort, onValueChange: (v) => setDiscoverSort(v), children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "w-full sm:w-[160px] h-11 rounded-full bg-card/50 backdrop-blur border-border/50", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { className: "rounded-xl", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "trending", className: "rounded-lg cursor-pointer", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2 py-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-4 h-4 text-orange-500" }),
                  " Trending"
                ] }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "most_liked", className: "rounded-lg cursor-pointer", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2 py-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: "w-4 h-4 text-pink-500" }),
                  " Most Liked"
                ] }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "newest", className: "rounded-lg cursor-pointer", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2 py-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-4 h-4 text-blue-500" }),
                  " Newest"
                ] }) })
              ] })
            ] })
          ] })
        ] }),
        discoverLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6", children: [...Array(5)].map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-square bg-muted/50 rounded-2xl animate-pulse" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-4 bg-muted/50 rounded-full animate-pulse w-3/4" })
        ] }, i)) }) : discoverPlaylists.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6", children: discoverPlaylists.map((playlist, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.3, delay: Math.min(index, 8) * 0.05 },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              PlaylistCard,
              {
                playlist,
                author: playlist.author,
                showActions: false
              }
            )
          },
          playlist.id
        )) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full p-12 text-center rounded-3xl border border-border/40 bg-card/20 backdrop-blur", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Compass, { className: "w-12 h-12 mx-auto text-muted-foreground/30 mb-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-semibold mb-2", children: "No results found" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: discoverSearch ? `Try adjusting your search for "${discoverSearch}".` : "No public playlists to discover right now." })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialog, { open: !!deleteId, onOpenChange: () => setDeleteId(null), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { className: "rounded-3xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { className: "text-xl", children: "Delete Playlist?" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogDescription, { className: "text-base", children: "This will permanently delete this playlist and remove all its items. This action cannot be undone." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { className: "mt-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { className: "rounded-full", children: "Cancel" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogAction, { onClick: handleDelete, className: "rounded-full bg-destructive text-destructive-foreground hover:bg-destructive/90", children: "Yes, Delete" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(MobileNav, {})
  ] });
}
function PlaylistViewPage() {
  var _a, _b, _c;
  const { playlistId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { data: playlist, isLoading: loadingPlaylist } = usePlaylist(playlistId);
  const { data: items = [], isLoading: loadingItems } = usePlaylistItems(playlistId);
  const { data: canEdit = false } = useCanEditPlaylist(playlistId);
  const { data: collaborators = [] } = usePlaylistCollaborators(playlistId);
  const { data: ownerProfile } = useQuery({
    queryKey: ["playlist_owner_profile", playlist == null ? void 0 : playlist.user_id],
    queryFn: async () => {
      if (!(playlist == null ? void 0 : playlist.user_id)) return null;
      const { data, error } = await supabase.from("profiles").select("user_id, display_name, username, avatar_url").eq("user_id", playlist.user_id).maybeSingle();
      if (error) throw error;
      return data;
    },
    enabled: !!(playlist == null ? void 0 : playlist.user_id)
  });
  const updatePlaylist = useUpdatePlaylist();
  const deletePlaylist = useDeletePlaylist();
  const removeFromPlaylist = useRemoveFromPlaylist();
  const reorderItems = useReorderPlaylistItems();
  const addCollaborator = useAddCollaborator();
  useUpdateCollaborator();
  useRemoveCollaborator();
  const { data: hasLiked = false } = usePlaylistLikeState(playlistId);
  const toggleLike = useTogglePlaylistLike();
  const { data: isSaved = false } = useIsPlaylistSaved(playlistId);
  const toggleSave = useToggleSavePlaylist();
  const progress = usePlaylistProgress(items);
  const [showEdit, setShowEdit] = reactExports.useState(false);
  const [editName, setEditName] = reactExports.useState("");
  const [editDesc, setEditDesc] = reactExports.useState("");
  const [editPublic, setEditPublic] = reactExports.useState(false);
  const [editShareSlug, setEditShareSlug] = reactExports.useState(void 0);
  const [editShareDesc, setEditShareDesc] = reactExports.useState(void 0);
  const [editEmbedAllowed, setEditEmbedAllowed] = reactExports.useState(false);
  const [showDelete, setShowDelete] = reactExports.useState(false);
  const [collaboratorSearch, setCollaboratorSearch] = reactExports.useState("");
  const [debouncedCollaboratorSearch, setDebouncedCollaboratorSearch] = reactExports.useState("");
  const [newCollaboratorRole, setNewCollaboratorRole] = reactExports.useState("editor");
  const [viewMode, setViewMode] = reactExports.useState(() => {
    if (typeof window === "undefined") return "grid";
    return window.localStorage.getItem("tatakai_playlist_view") === "list" ? "list" : "grid";
  });
  const [showAddMedia, setShowAddMedia] = reactExports.useState(false);
  const [showCollaborators, setShowCollaborators] = reactExports.useState(false);
  const [orderedItems, setOrderedItems] = reactExports.useState(items);
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );
  const existingItemRefs = reactExports.useMemo(() => new Set(items.map((item) => item.anime_id)), [items]);
  reactExports.useEffect(() => {
    setOrderedItems(items);
  }, [items]);
  reactExports.useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem("tatakai_playlist_view", viewMode);
  }, [viewMode]);
  const handleReorderItems = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id || !playlist) return;
    const oldIndex = orderedItems.findIndex((item) => item.id === active.id);
    const newIndex = orderedItems.findIndex((item) => item.id === over.id);
    if (oldIndex === -1 || newIndex === -1) return;
    const next = arrayMove(orderedItems, oldIndex, newIndex);
    setOrderedItems(next);
    reorderItems.mutate({ playlistId: playlist.id, itemIds: next.map((item) => item.id) });
  };
  const playlistEditDraftStorageKey = reactExports.useMemo(
    () => getPlaylistEditDraftStorageKey(playlist == null ? void 0 : playlist.id),
    [playlist == null ? void 0 : playlist.id]
  );
  const isOwner = !!user && !!playlist && user.id === playlist.user_id;
  const myCollaboratorRole = (_a = collaborators.find((collaborator) => collaborator.user_id === (user == null ? void 0 : user.id))) == null ? void 0 : _a.role;
  const canManageCollaborators = isOwner || myCollaboratorRole === "admin";
  const ownerDisplayName = ((_b = ownerProfile == null ? void 0 : ownerProfile.display_name) == null ? void 0 : _b.trim()) || ((_c = ownerProfile == null ? void 0 : ownerProfile.username) == null ? void 0 : _c.trim()) || ((playlist == null ? void 0 : playlist.user_id) && !isUuidLike(playlist.user_id) ? playlist.user_id : "Unknown");
  reactExports.useEffect(() => {
    const timer = window.setTimeout(() => {
      setDebouncedCollaboratorSearch(collaboratorSearch);
    }, PLAYLIST_COLLAB_SEARCH_DEBOUNCE_MS);
    return () => window.clearTimeout(timer);
  }, [collaboratorSearch]);
  reactExports.useEffect(() => {
    if (!showEdit || !playlistEditDraftStorageKey || typeof window === "undefined") return;
    const timer = window.setTimeout(() => {
      const payload = {
        name: editName,
        description: editDesc,
        isPublic: editPublic,
        shareSlug: editShareSlug,
        shareDescription: editShareDesc,
        embedAllowed: editEmbedAllowed,
        savedAt: Date.now()
      };
      try {
        window.localStorage.setItem(playlistEditDraftStorageKey, JSON.stringify(payload));
      } catch {
      }
    }, PLAYLIST_EDIT_DRAFT_SAVE_DEBOUNCE_MS);
    return () => window.clearTimeout(timer);
  }, [editDesc, editEmbedAllowed, editName, editPublic, editShareDesc, editShareSlug, playlistEditDraftStorageKey, showEdit]);
  const { data: collaboratorSearchResults = [], isFetching: isSearchingCollaborators } = useQuery({
    queryKey: ["playlist-collaborator-search", playlistId, debouncedCollaboratorSearch, collaborators.length],
    enabled: !!playlist && canManageCollaborators && debouncedCollaboratorSearch.trim().length >= 2,
    queryFn: async () => {
      const searchTerm = debouncedCollaboratorSearch.trim();
      if (!searchTerm || !playlist) return [];
      const { data, error } = await supabase.from("profiles").select("user_id, username, display_name, avatar_url").or(`username.ilike.%${searchTerm}%,display_name.ilike.%${searchTerm}%`).limit(10);
      if (error) throw error;
      const existingUserIds = new Set(collaborators.map((c) => c.user_id));
      existingUserIds.add(playlist.user_id);
      return (data || []).filter((profile) => !existingUserIds.has(profile.user_id));
    }
  });
  const openEdit = () => {
    if (!playlist) return;
    if (!canEdit) return ue.error("You do not have edit access to this playlist");
    let resolvedDraft = {
      name: playlist.name,
      description: playlist.description || "",
      isPublic: playlist.is_public,
      shareSlug: playlist.share_slug ?? void 0,
      shareDescription: playlist.share_description ?? void 0,
      embedAllowed: !!playlist.embed_allowed,
      savedAt: Date.now()
    };
    if (playlistEditDraftStorageKey && typeof window !== "undefined") {
      try {
        const raw = window.localStorage.getItem(playlistEditDraftStorageKey);
        if (raw) {
          const parsed = JSON.parse(raw);
          const savedAt = Number((parsed == null ? void 0 : parsed.savedAt) || 0);
          if (savedAt && Date.now() - savedAt <= PLAYLIST_EDIT_DRAFT_MAX_AGE_MS) {
            resolvedDraft = { ...resolvedDraft, ...parsed };
          } else {
            window.localStorage.removeItem(playlistEditDraftStorageKey);
          }
        }
      } catch {
      }
    }
    setEditName(resolvedDraft.name);
    setEditDesc(resolvedDraft.description);
    setEditPublic(resolvedDraft.isPublic);
    setEditShareSlug(resolvedDraft.shareSlug);
    setEditShareDesc(resolvedDraft.shareDescription);
    setEditEmbedAllowed(resolvedDraft.embedAllowed);
    setShowEdit(true);
  };
  const handleGenerateSlug = async () => {
    var _a2;
    if (!playlist) return;
    const { generateShortSlug } = await __vitePreload(async () => {
      const { generateShortSlug: generateShortSlug2 } = await import("./slug.BXx3tuOB.js");
      return { generateShortSlug: generateShortSlug2 };
    }, true ? [] : void 0);
    for (let attempt = 0; attempt < 3; attempt++) {
      const candidate = generateShortSlug(8);
      try {
        await updatePlaylist.mutateAsync({ id: playlist.id, shareSlug: candidate, isPublic: true });
        setEditShareSlug(candidate);
        setEditPublic(true);
        return;
      } catch (err) {
        if (((_a2 = err == null ? void 0 : err.message) == null ? void 0 : _a2.includes("23505")) || /unique/i.test((err == null ? void 0 : err.message) || "")) continue;
        throw err;
      }
    }
    ue.error("Failed to generate a unique share link. Try again later.");
  };
  const handleUpdate = async () => {
    if (!playlist || !editName.trim()) return;
    if (!canEdit) return ue.error("You do not have edit access to this playlist");
    await updatePlaylist.mutateAsync({
      id: playlist.id,
      name: editName.trim(),
      description: editDesc.trim() || void 0,
      isPublic: editPublic,
      shareSlug: editShareSlug,
      shareDescription: editShareDesc,
      embedAllowed: editEmbedAllowed
    });
    if (playlistEditDraftStorageKey && typeof window !== "undefined") {
      try {
        window.localStorage.removeItem(playlistEditDraftStorageKey);
      } catch {
      }
    }
    setShowEdit(false);
  };
  const handleDelete = async () => {
    if (!playlist) return;
    await deletePlaylist.mutateAsync(playlist.id);
    navigate("/playlists");
  };
  const handleRemoveItem = async (animeId) => {
    if (!playlist) return;
    if (!canEdit) return ue.error("You do not have permission to edit this playlist");
    await removeFromPlaylist.mutateAsync({ playlistId: playlist.id, animeId });
  };
  const handleLaunchWatchRoom = (animeId, animeName, animePoster) => {
    const media = parsePlaylistMediaRef(animeId);
    if (media.kind !== "anime" || !media.id) return ue.error("Watch rooms currently support anime items only.");
    const params = new URLSearchParams({ anime: media.id, title: animeName });
    if (animePoster) params.set("poster", animePoster);
    navigate(`/isshoni?${params.toString()}`);
  };
  const handleAddCollaborator = async (targetUserId) => {
    if (!playlist) return;
    await addCollaborator.mutateAsync({ playlistId: playlist.id, userId: targetUserId, role: newCollaboratorRole });
    setCollaboratorSearch("");
  };
  if (loadingPlaylist) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-background flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-4 text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-10 h-10 animate-spin text-primary" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium animate-pulse", children: "Loading playlist..." })
    ] }) });
  }
  if (!playlist) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background text-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Sidebar, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "relative z-10 pl-0 md:pl-20 lg:pl-24 w-full flex items-center justify-center min-h-[80vh]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassPanel, { className: "max-w-md mx-auto p-10 text-center rounded-3xl", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Music2, { className: "w-16 h-16 mx-auto text-muted-foreground/50 mb-4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold mb-2", children: "Playlist not found" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-8", children: "This playlist might be private, deleted, or the link is invalid." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "lg", className: "rounded-full", onClick: () => navigate("/playlists"), children: "Return to Playlists" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(MobileNav, {})
    ] });
  }
  const coverImages = items.slice(0, 4).map((item) => item.anime_poster).filter(Boolean);
  const heroBgImage = coverImages[0] ? getProxiedImageUrl(coverImages[0]) : null;
  const firstItem = items[0];
  const firstItemMedia = firstItem ? parsePlaylistMediaRef(firstItem.anime_id) : null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background text-foreground relative overflow-x-hidden", children: [
    playlist && /* @__PURE__ */ jsxRuntimeExports.jsx(
      Seo,
      {
        title: playlist.name || "Playlist",
        description: playlist.share_description || playlist.description || `A playlist with ${playlist.items_count ?? items.length} titles on Tatakai.`,
        image: coverImages[0] || void 0,
        canonicalPath: `/p/${playlist.share_slug || playlist.id}`,
        kind: "website",
        suffix: " — Tatakai Playlist"
      }
    ),
    heroBgImage && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute top-0 left-0 w-full h-[60vh] md:h-[500px] pointer-events-none -z-10 overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-background/80 dark:bg-background/90 z-10 backdrop-blur-3xl" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-transparent via-background/80 to-background z-10" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: heroBgImage, alt: "", className: "w-full h-full object-cover scale-110 opacity-60 dark:opacity-40 blur-2xl" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Sidebar, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "relative z-10 pl-0 md:pl-20 lg:pl-24 w-full pb-32", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 md:px-8 py-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: () => navigate(-1),
          className: "group flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground mb-8 transition-colors w-fit px-3 py-1.5 rounded-full hover:bg-muted/50",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4 group-hover:-translate-x-1 transition-transform" }),
            "Back"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col md:flex-row gap-8 md:gap-12 mb-16", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-48 h-48 sm:w-64 sm:h-64 md:w-72 md:h-72 flex-shrink-0 mx-auto md:mx-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full h-full rounded-2xl md:rounded-3xl overflow-hidden bg-muted shadow-2xl shadow-black/20 dark:shadow-black/50 border border-white/10 dark:border-white/5 relative group", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 ring-1 ring-inset ring-black/10 dark:ring-white/10 rounded-2xl md:rounded-3xl z-10 pointer-events-none" }),
          coverImages.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn(
            "grid w-full h-full",
            coverImages.length === 1 && "grid-cols-1",
            coverImages.length === 2 && "grid-cols-2",
            coverImages.length >= 3 && "grid-cols-2 grid-rows-2"
          ), children: coverImages.map((img, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: getProxiedImageUrl(img), alt: "", className: "w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" }, idx)) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-purple-500/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Music2, { className: "w-24 h-24 text-muted-foreground/50" }) })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 flex flex-col justify-end text-center md:text-left", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center justify-center md:justify-start gap-2 mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "px-3 py-1 rounded-full bg-background/50 backdrop-blur-md border border-border/50 text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5", children: [
              playlist.is_public ? /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { className: "w-3.5 h-3.5 text-green-500" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-3.5 h-3.5 text-amber-500" }),
              playlist.is_public ? "Public" : "Private"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-3 py-1 rounded-full bg-background/50 backdrop-blur-md border border-border/50 text-xs font-semibold uppercase tracking-wider", children: "Playlist" }),
            ownerDisplayName && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "px-3 py-1 rounded-full bg-background/50 backdrop-blur-md border border-border/50 text-xs font-semibold flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Avatar, { className: "w-4 h-4 border border-border", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarImage, { src: (ownerProfile == null ? void 0 : ownerProfile.avatar_url) || void 0 }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarFallback, { className: "text-[8px]", children: ownerDisplayName[0] })
              ] }),
              ownerDisplayName
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-4 tracking-tight leading-tight", children: playlist.name }),
          playlist.description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-lg mb-6 max-w-2xl mx-auto md:mx-0 line-clamp-3", children: playlist.description }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm text-muted-foreground font-medium flex flex-wrap items-center justify-center md:justify-start gap-x-4 gap-y-2 mb-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-foreground", children: [
              playlist.items_count,
              " items"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline text-border", children: "•" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-4 h-4" }),
              " Created ",
              new Date(playlist.created_at).getFullYear()
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline text-border", children: "•" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-4 h-4" }),
              " Updated ",
              formatDistanceToNow(new Date(playlist.updated_at)),
              " ago"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center justify-center md:justify-start gap-3", children: [
            firstItem && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                size: "lg",
                className: "gap-2 rounded-full font-bold shadow-xl shadow-primary/20 hover:scale-105 transition-transform",
                onClick: () => navigate(getPlaylistItemHref(firstItem.anime_id)),
                children: [
                  (firstItemMedia == null ? void 0 : firstItemMedia.kind) === "manga" ? /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-5 h-5 fill-current" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "w-5 h-5 fill-current" }),
                  "Play"
                ]
              }
            ),
            firstItem && (firstItemMedia == null ? void 0 : firstItemMedia.kind) === "anime" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                variant: "secondary",
                size: "lg",
                className: "gap-2 rounded-full font-semibold hover:bg-secondary/80",
                onClick: () => handleLaunchWatchRoom(firstItem.anime_id, firstItem.anime_name, firstItem.anime_poster),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-5 h-5" }),
                  "Watch Party"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mt-2 sm:mt-0 sm:ml-2 p-1.5 bg-muted/40 rounded-full border border-border/40 backdrop-blur-sm", children: [
              user && /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  variant: "ghost",
                  size: "icon",
                  className: "rounded-full w-10 h-10 hover:bg-background/80 hover:text-pink-500 transition-colors",
                  onClick: () => toggleLike.mutate({ playlistId: playlist.id, liked: hasLiked }),
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: cn("w-5 h-5 transition-transform", hasLiked && "fill-pink-500 text-pink-500 scale-110") })
                }
              ),
              user && !isOwner && /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  variant: "ghost",
                  size: "icon",
                  className: "rounded-full w-10 h-10 hover:bg-background/80 hover:text-blue-500 transition-colors",
                  onClick: () => toggleSave.mutate({ playlistId: playlist.id, saved: isSaved }),
                  children: isSaved ? /* @__PURE__ */ jsxRuntimeExports.jsx(BookmarkCheck, { className: "w-5 h-5 text-blue-500" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Bookmark, { className: "w-5 h-5" })
                }
              ),
              playlist.is_public && /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", onClick: () => {
                navigator.clipboard.writeText(`${window.location.origin}/p/${playlist.share_slug || playlist.id}`);
                ue.success("Link copied!");
              }, className: "rounded-full w-10 h-10 hover:bg-background/80", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Share2, { className: "w-4 h-4" }) }),
              (canManageCollaborators || collaborators.length > 0) && /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "ghost", size: "icon", onClick: () => setShowCollaborators(true), className: "rounded-full w-10 h-10 hover:bg-background/80 relative", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-4 h-4" }),
                collaborators.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute -top-1 -right-1 w-4 h-4 bg-primary text-primary-foreground text-[10px] font-bold rounded-full flex items-center justify-center", children: collaborators.length })
              ] }),
              canEdit && /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", onClick: openEdit, className: "rounded-full w-10 h-10 hover:bg-background/80", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pen, { className: "w-4 h-4" }) }),
              isOwner && /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", onClick: () => setShowDelete(true), className: "rounded-full w-10 h-10 hover:bg-destructive/10 hover:text-destructive", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-4 h-4" }) })
            ] })
          ] }),
          user && isSaved && items.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 max-w-sm mx-auto md:mx-0 p-4 rounded-2xl bg-muted/30 border border-border/40 backdrop-blur-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-sm mb-2 font-medium", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(BookmarkCheck, { className: "w-4 h-4 text-blue-500" }),
                "Completion"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                progress.percent,
                "%"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Progress, { value: progress.percent, className: "h-2 bg-background" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold tracking-tight", children: "Content" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            canEdit && /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", onClick: () => setShowAddMedia(true), className: "gap-2 rounded-full", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
              "Add Media"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center bg-muted/50 p-1 rounded-xl border border-border/40 backdrop-blur-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  onClick: () => setViewMode("list"),
                  className: cn(
                    "p-2 rounded-lg transition-all duration-200",
                    viewMode === "list" ? "bg-background shadow-sm text-primary" : "text-muted-foreground hover:text-foreground"
                  ),
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(LayoutList, { className: "w-4 h-4" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  onClick: () => setViewMode("grid"),
                  className: cn(
                    "p-2 rounded-lg transition-all duration-200",
                    viewMode === "grid" ? "bg-background shadow-sm text-primary" : "text-muted-foreground hover:text-foreground"
                  ),
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(LayoutGrid, { className: "w-4 h-4" })
                }
              )
            ] })
          ] })
        ] }),
        loadingItems ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn(viewMode === "grid" ? "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4" : "space-y-3"), children: [...Array(5)].map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("bg-muted/40 animate-pulse rounded-2xl", viewMode === "grid" ? "aspect-[2/3]" : "h-24") }, i)) }) : orderedItems.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(DndContext, { sensors, collisionDetection: closestCenter, onDragEnd: handleReorderItems, children: /* @__PURE__ */ jsxRuntimeExports.jsx(SortableContext, { items: orderedItems.map((item) => item.id), strategy: viewMode === "grid" ? rectSortingStrategy : verticalListSortingStrategy, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn(
          viewMode === "grid" ? "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6" : "flex flex-col gap-3"
        ), children: orderedItems.map((item, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          SortablePlaylistItem,
          {
            item,
            index,
            viewMode,
            canEdit,
            mediaKind: parsePlaylistMediaRef(item.anime_id).kind,
            href: getPlaylistItemHref(item.anime_id),
            onRemove: handleRemoveItem,
            onLaunchWatchRoom: handleLaunchWatchRoom
          },
          item.id
        )) }) }) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full py-20 text-center rounded-[2rem] border-2 border-dashed border-border/40 bg-muted/10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 bg-muted/40 rounded-full flex items-center justify-center mx-auto mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-10 h-10 text-muted-foreground" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-bold mb-2", children: "This collection is empty" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground max-w-sm mx-auto mb-6", children: canEdit ? "Start building your playlist by adding your favorite anime and manga." : "The owner hasn't added any items to this playlist yet." }),
          canEdit && /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "lg", onClick: () => setShowAddMedia(true), className: "gap-2 rounded-full", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-5 h-5" }),
            "Add First Item"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-16 pt-8 border-t border-border/20", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2.5 bg-primary/10 rounded-xl text-primary", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "w-6 h-6" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold tracking-tight", children: "Discussion" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card/30 border border-border/40 rounded-3xl p-6 sm:p-8 backdrop-blur-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Comments, { entityType: "playlist", entityId: playlist.id, entityName: playlist.name }) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: showEdit, onOpenChange: setShowEdit, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "sm:max-w-xl rounded-[2rem]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "text-2xl", children: "Edit Playlist" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 py-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs uppercase font-bold text-muted-foreground tracking-wider", children: "Playlist Name" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: editName, onChange: (e) => setEditName(e.target.value), className: "h-12 bg-muted/50 border-none" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs uppercase font-bold text-muted-foreground tracking-wider", children: "Description" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { value: editDesc, onChange: (e) => setEditDesc(e.target.value), rows: 4, className: "bg-muted/50 border-none resize-none" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 p-5 bg-muted/30 rounded-2xl border border-border/50", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-base font-semibold", children: "Public Access" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Anyone can view this playlist" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Switch, { checked: editPublic, onCheckedChange: async (val) => {
              setEditPublic(val);
              if (val && !editShareSlug) await handleGenerateSlug();
            } })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between pt-4 border-t border-border/50", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-base font-semibold", children: "Allow Embedding" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Allow others to embed this on their sites" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Switch, { checked: editEmbedAllowed, onCheckedChange: setEditEmbedAllowed })
          ] })
        ] }),
        editPublic && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs uppercase font-bold text-muted-foreground tracking-wider", children: "Share Link" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: editShareSlug ? `${window.location.origin}/p/${editShareSlug}` : "", readOnly: true, placeholder: "No link generated", className: "bg-muted/50 border-none text-muted-foreground" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "secondary", onClick: handleGenerateSlug, className: "shrink-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(GripVertical, { className: "w-4 h-4 mr-2" }),
              " Generate"
            ] }),
            editShareSlug && /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: () => {
              navigator.clipboard.writeText(`${window.location.origin}/p/${editShareSlug}`);
              ue.success("Link copied");
            }, className: "shrink-0", children: "Copy" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", onClick: () => setShowEdit(false), className: "rounded-full", children: "Cancel" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: handleUpdate, disabled: !editName.trim() || updatePlaylist.isPending, className: "rounded-full px-8", children: updatePlaylist.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin" }) : "Save Changes" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialog, { open: showDelete, onOpenChange: setShowDelete, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { className: "rounded-3xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogTitle, { className: "text-xl text-destructive flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-5 h-5" }),
          " Delete Playlist"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogDescription, { className: "text-base pt-2", children: [
          "Are you absolutely sure? This will permanently delete ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: playlist.name }),
          " and all its content. This action cannot be reversed."
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { className: "mt-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { className: "rounded-full", children: "Keep Playlist" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogAction, { onClick: handleDelete, className: "rounded-full bg-destructive text-destructive-foreground hover:bg-destructive/90", children: "Yes, Delete It" })
      ] })
    ] }) }),
    canEdit && /* @__PURE__ */ jsxRuntimeExports.jsx(
      AddMediaToPlaylistDialog,
      {
        playlistId: playlist.id,
        existingRefs: existingItemRefs,
        open: showAddMedia,
        onOpenChange: setShowAddMedia
      }
    ),
    showCollaborators && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md", onClick: () => setShowCollaborators(false), children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full max-w-md bg-card border border-border shadow-2xl rounded-[2rem] overflow-hidden", onClick: (e) => e.stopPropagation(), children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-xl font-bold flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-5 h-5 text-primary" }),
          " Collaborators"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", className: "rounded-full bg-muted/50 hover:bg-muted", onClick: () => setShowCollaborators(false), children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 max-h-[50vh] overflow-y-auto pr-2 custom-scrollbar", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between p-3 rounded-xl bg-primary/5 border border-primary/10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Avatar, { className: "h-10 w-10 border border-background", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarImage, { src: (ownerProfile == null ? void 0 : ownerProfile.avatar_url) || void 0 }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarFallback, { children: ((ownerDisplayName == null ? void 0 : ownerDisplayName[0]) || "O").toUpperCase() })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-bold", children: ownerDisplayName }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                "@",
                (ownerProfile == null ? void 0 : ownerProfile.username) || "owner"
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-2.5 py-1 rounded-full bg-primary/20 text-primary text-[10px] uppercase font-bold tracking-wider", children: "Owner" })
        ] }),
        collaborators.map((collaborator) => {
          var _a2, _b2, _c2, _d;
          const displayName = ((_a2 = collaborator.profile) == null ? void 0 : _a2.display_name) || ((_b2 = collaborator.profile) == null ? void 0 : _b2.username) || collaborator.user_id;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between p-3 rounded-xl bg-muted/30 border border-border/50 group", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Avatar, { className: "h-10 w-10", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarImage, { src: ((_c2 = collaborator.profile) == null ? void 0 : _c2.avatar_url) || void 0 }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarFallback, { children: ((displayName == null ? void 0 : displayName[0]) || "U").toUpperCase() })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold truncate", children: displayName }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground truncate", children: [
                  "@",
                  ((_d = collaborator.profile) == null ? void 0 : _d.username) || "unknown"
                ] })
              ] })
            ] }),
            canManageCollaborators ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "select",
                {
                  value: collaborator.role,
                  onChange: (e) => handleUpdateCollaboratorRole(collaborator.id, e.target.value),
                  className: "h-8 rounded-lg bg-background border border-border text-xs font-medium px-2 outline-none focus:ring-1 focus:ring-primary",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "viewer", children: "Viewer" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "editor", children: "Editor" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "admin", children: "Admin" })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", className: "h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10", onClick: () => handleRemoveCollaborator(collaborator.id), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-4 h-4" }) })
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-2.5 py-1 rounded-full bg-muted text-muted-foreground text-[10px] uppercase font-bold tracking-wider", children: collaborator.role })
          ] }, collaborator.id);
        }),
        collaborators.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-center py-4 text-muted-foreground", children: "No collaborators added yet." })
      ] }),
      canManageCollaborators && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 pt-6 border-t border-border/50", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs font-bold uppercase text-muted-foreground tracking-wider mb-3 block", children: "Add Collaborator" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                value: collaboratorSearch,
                onChange: (e) => setCollaboratorSearch(e.target.value),
                placeholder: "Search users...",
                className: "pl-9 h-10 bg-muted/50 border-transparent focus-visible:border-primary rounded-xl"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "select",
            {
              value: newCollaboratorRole,
              onChange: (e) => setNewCollaboratorRole(e.target.value),
              className: "h-10 rounded-xl bg-muted/50 border-transparent px-3 text-sm font-medium outline-none focus:ring-1 focus:ring-primary",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "viewer", children: "Viewer" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "editor", children: "Editor" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "admin", children: "Admin" })
              ]
            }
          )
        ] }),
        collaboratorSearch.trim().length >= 2 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 max-h-40 overflow-y-auto rounded-xl border border-border/50 bg-background shadow-lg absolute w-[calc(100%-3rem)] z-10 custom-scrollbar", children: isSearchingCollaborators ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 text-center text-sm text-muted-foreground flex items-center justify-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin" }),
          " Searching..."
        ] }) : collaboratorSearchResults.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 text-center text-sm text-muted-foreground", children: "No users found." }) : collaboratorSearchResults.map((profile) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 flex items-center justify-between hover:bg-muted/50 transition-colors border-b border-border/50 last:border-0 cursor-pointer", onClick: () => handleAddCollaborator(profile.user_id), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Avatar, { className: "h-8 w-8", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarImage, { src: profile.avatar_url || void 0 }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarFallback, { children: "U" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold", children: profile.display_name || profile.username }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                "@",
                profile.username
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4 text-primary" })
        ] }, profile.user_id)) })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(MobileNav, {})
  ] });
}
export {
  PlaylistViewPage,
  PlaylistsPage as default
};
