import { e as useNavigate, r as reactExports, j as jsxRuntimeExports } from "./react-vendor.CAo4XUiA.js";
import { u as useAuth, at as usePlaylists, au as useAnimeInPlaylists, av as useCreatePlaylist, aw as useAddToPlaylist, B as Button, ae as Dialog, ax as DialogTrigger, j as cn, af as DialogContent, ag as DialogHeader, ah as DialogTitle, l as getProxiedImageUrl, ay as Label, az as Input, aA as Textarea, aB as Switch, aC as ScrollArea } from "./index.C6yfkT5T.js";
import "./vendor.CJyRs4QS.js";
import { b$ as ListPlus, c as Check, az as Music2, a5 as Globe, a6 as Lock, Q as LoaderCircle, P as Plus, b as ChevronRight } from "./icons.C2gBBarQ.js";
import { A as AnimatePresence, m as motion } from "./motion.DVGLRFCH.js";
function AddToPlaylistButton({
  animeId,
  animeName,
  animePoster,
  mediaType = "anime",
  mediaFormat,
  variant = "default",
  className
}) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [open, setOpen] = reactExports.useState(false);
  const [showCreate, setShowCreate] = reactExports.useState(false);
  const [newPlaylistName, setNewPlaylistName] = reactExports.useState("");
  const [newPlaylistDesc, setNewPlaylistDesc] = reactExports.useState("");
  const [newPlaylistPublic, setNewPlaylistPublic] = reactExports.useState(false);
  const { data: playlists = [], isLoading: loadingPlaylists } = usePlaylists();
  const { data: inPlaylists = [] } = useAnimeInPlaylists(animeId);
  const createPlaylist = useCreatePlaylist();
  const addToPlaylist = useAddToPlaylist();
  const mediaLabel = mediaType === "manga" ? "Manga" : "Anime";
  const isInAnyPlaylist = (inPlaylists || []).length > 0;
  if (!user) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Button,
      {
        variant: "outline",
        size: variant === "icon" ? "icon" : variant === "mini" ? "sm" : "default",
        className,
        onClick: () => navigate("/auth"),
        children: variant === "icon" || variant === "mini" ? /* @__PURE__ */ jsxRuntimeExports.jsx(ListPlus, { className: "w-4 h-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ListPlus, { className: "w-4 h-4 mr-2" }),
          "Add to Playlist"
        ] })
      }
    );
  }
  const handleCreateAndAdd = async () => {
    if (!newPlaylistName.trim()) return;
    try {
      const playlist = await createPlaylist.mutateAsync({
        name: newPlaylistName.trim(),
        description: newPlaylistDesc.trim() || void 0,
        isPublic: newPlaylistPublic
      });
      await addToPlaylist.mutateAsync({
        playlistId: playlist.id,
        animeId,
        animeName,
        animePoster,
        mediaFormat: mediaFormat || mediaType
      });
      setNewPlaylistName("");
      setNewPlaylistDesc("");
      setNewPlaylistPublic(false);
      setShowCreate(false);
      setOpen(false);
    } catch (error) {
    }
  };
  const handleAddToPlaylist = async (playlist) => {
    if (inPlaylists.includes(playlist.id)) return;
    await addToPlaylist.mutateAsync({
      playlistId: playlist.id,
      animeId,
      animeName,
      animePoster,
      mediaFormat: mediaFormat || mediaType
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Dialog, { open, onOpenChange: setOpen, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Button,
      {
        variant: "outline",
        size: variant === "icon" ? "icon" : variant === "mini" ? "sm" : "default",
        className: cn(
          variant === "mini" && "h-8 px-2 text-xs",
          variant === "icon" && "h-14 w-14 rounded-full",
          className
        ),
        children: variant === "icon" || variant === "mini" ? isInAnyPlaylist ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: variant === "icon" ? "w-6 h-6" : "w-4 h-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ListPlus, { className: variant === "icon" ? "w-6 h-6" : "w-4 h-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          isInAnyPlaylist ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-4 h-4 mr-2" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ListPlus, { className: "w-4 h-4 mr-2" }),
          isInAnyPlaylist ? "Added" : "Add to Playlist"
        ] })
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-md", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Music2, { className: "w-5 h-5 text-primary" }),
        "Add to Playlist"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 py-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 p-3 rounded-lg bg-muted/30 border border-white/5", children: [
          animePoster && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: getProxiedImageUrl(animePoster),
              alt: animeName,
              className: "w-12 h-16 object-cover rounded"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] uppercase tracking-wider text-muted-foreground mb-1", children: mediaLabel }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium line-clamp-2", children: animeName })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: showCreate ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 10 },
            animate: { opacity: 1, y: 0 },
            exit: { opacity: 0, y: -10 },
            className: "space-y-4",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Playlist Name" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    value: newPlaylistName,
                    onChange: (e) => setNewPlaylistName(e.target.value),
                    placeholder: "My awesome playlist",
                    autoFocus: true
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Description (optional)" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Textarea,
                  {
                    value: newPlaylistDesc,
                    onChange: (e) => setNewPlaylistDesc(e.target.value),
                    placeholder: "What's this playlist about?",
                    rows: 2
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  newPlaylistPublic ? /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { className: "w-4 h-4 text-green-500" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-4 h-4 text-muted-foreground" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Public playlist" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Switch,
                  {
                    checked: newPlaylistPublic,
                    onCheckedChange: setNewPlaylistPublic
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    variant: "outline",
                    onClick: () => setShowCreate(false),
                    className: "flex-1",
                    children: "Back"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    onClick: handleCreateAndAdd,
                    disabled: !newPlaylistName.trim() || createPlaylist.isPending,
                    className: "flex-1",
                    children: createPlaylist.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin" }) : "Create & Add"
                  }
                )
              ] })
            ]
          },
          "create"
        ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 10 },
            animate: { opacity: 1, y: 0 },
            exit: { opacity: 0, y: -10 },
            className: "space-y-3",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  variant: "outline",
                  onClick: () => setShowCreate(true),
                  className: "w-full justify-start gap-2 h-12",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded bg-primary/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4 text-primary" }) }),
                    "Create new playlist"
                  ]
                }
              ),
              loadingPlaylists ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center py-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-6 h-6 animate-spin text-muted-foreground" }) }) : playlists.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollArea, { className: "h-[200px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1 pr-4", children: playlists.map((playlist) => {
                const isInPlaylist = inPlaylists.includes(playlist.id);
                return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    onClick: () => handleAddToPlaylist(playlist),
                    disabled: isInPlaylist || addToPlaylist.isPending,
                    className: cn(
                      "w-full flex items-center gap-3 p-2 rounded-lg transition-all text-left",
                      isInPlaylist ? "bg-primary/10 cursor-default" : "hover:bg-muted/50"
                    ),
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn(
                        "w-10 h-10 rounded flex items-center justify-center flex-shrink-0",
                        isInPlaylist ? "bg-primary text-primary-foreground" : "bg-muted"
                      ), children: isInPlaylist ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-5 h-5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Music2, { className: "w-5 h-5 text-muted-foreground" }) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium line-clamp-1", children: playlist.name }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                          playlist.items_count,
                          " ",
                          playlist.items_count === 1 ? "item" : "items",
                          playlist.is_public && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-2 inline-flex items-center gap-1", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { className: "w-3 h-3" }),
                            " Public"
                          ] })
                        ] })
                      ] }),
                      !isInPlaylist && /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4 text-muted-foreground" })
                    ]
                  },
                  playlist.id
                );
              }) }) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-6 text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Music2, { className: "w-10 h-10 mx-auto mb-2 opacity-50" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: "No playlists yet" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs", children: "Create your first playlist above!" })
              ] })
            ]
          },
          "list"
        ) })
      ] })
    ] })
  ] });
}
export {
  AddToPlaylistButton as A
};
