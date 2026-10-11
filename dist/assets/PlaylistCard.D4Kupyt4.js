import { j as jsxRuntimeExports, L as Link } from "./react-vendor.CAo4XUiA.js";
import { aR as usePlaylistItems, aO as useUserBadges, l as getProxiedImageUrl, j as cn, a8 as Avatar, a9 as AvatarImage, aa as AvatarFallback, aQ as UserBadges, Y as DropdownMenu, Z as DropdownMenuTrigger, B as Button, _ as DropdownMenuContent, $ as DropdownMenuItem } from "./index.C6yfkT5T.js";
import "./vendor.CJyRs4QS.js";
import { az as Music2, aJ as Play, a5 as Globe, a6 as Lock, H as Heart, g as User, c0 as EllipsisVertical, aP as Pen, J as Trash2 } from "./icons.C2gBBarQ.js";
function PlaylistCard({
  playlist,
  coverImages,
  onEdit,
  onDelete,
  showActions = true,
  author
}) {
  const needsFetch = !coverImages || coverImages.length === 0;
  const { data: fetchedItems = [] } = usePlaylistItems(needsFetch ? playlist.id : void 0);
  const derived = fetchedItems.slice(0, 4).map((i) => i.anime_poster).filter(Boolean);
  const displayImages = (needsFetch ? derived : coverImages).slice(0, 4);
  const { data: authorBadges } = useUserBadges(playlist.user_id);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "group relative flex flex-col rounded-[1.5rem] border border-border/40 bg-card/20 backdrop-blur-xl overflow-hidden shadow-lg   transition-all duration-300", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: `/playlist/${playlist.id}`, className: "block", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-square overflow-hidden bg-gradient-to-br from-muted/40 to-background/40", children: [
      displayImages.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: cn(
            "grid w-full h-full",
            displayImages.length === 1 && "grid-cols-1",
            displayImages.length === 2 && "grid-cols-2",
            displayImages.length >= 3 && "grid-cols-2 grid-rows-2"
          ),
          children: [
            displayImages.map((img, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: getProxiedImageUrl(img), alt: "", className: "w-full h-full object-cover" }) }, idx)),
            displayImages.length === 3 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center bg-muted/40", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Music2, { className: "w-8 h-8 text-muted-foreground" }) })
          ]
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-purple-500/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Music2, { className: "w-12 h-12 text-muted-foreground" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 rounded-full bg-primary flex items-center justify-center shadow-lg shadow-primary/30", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "w-6 h-6 text-primary-foreground fill-current ml-1" }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute top-3 right-3 inline-flex items-center gap-1 px-2 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-[10px] font-semibold text-white/90", children: playlist.is_public ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { className: "w-3 h-3 text-emerald-400" }),
        "Public"
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-3 h-3 text-amber-400" }),
        "Private"
      ] }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col flex-1 p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: `/playlist/${playlist.id}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-base font-bold tracking-tight line-clamp-1 group-hover:text-primary transition-colors", children: playlist.name }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2 mt-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-muted-foreground", children: [
          playlist.items_count,
          " ",
          playlist.items_count === 1 ? "item" : "items"
        ] }),
        typeof playlist.likes_count === "number" && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 text-xs text-muted-foreground shrink-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: "w-3.5 h-3.5" }),
          playlist.likes_count
        ] })
      ] }),
      author && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mt-3 pt-3 border-t border-border/40 min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Link,
          {
            to: `/@${author.username}`,
            className: "flex items-center gap-2 group/author min-w-0",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Avatar, { className: "w-6 h-6 ring-1 ring-border/50", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarImage, { src: author.avatar_url || void 0 }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarFallback, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-3 h-3" }) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground truncate group-hover/author:text-foreground transition-colors", children: author.username || author.display_name || "Anonymous" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(UserBadges, { badges: authorBadges, size: 14, max: 3 })
      ] })
    ] }),
    showActions && (onEdit || onDelete) && /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenu, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          variant: "ghost",
          size: "icon",
          className: "absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 hover:bg-black/70 backdrop-blur-md h-8 w-8 rounded-full",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(EllipsisVertical, { className: "w-4 h-4" })
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuContent, { align: "start", children: [
        onEdit && /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuItem, { onClick: onEdit, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Pen, { className: "w-4 h-4 mr-2" }),
          "Edit"
        ] }),
        onDelete && /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuItem, { onClick: onDelete, className: "text-destructive", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-4 h-4 mr-2" }),
          "Delete"
        ] })
      ] })
    ] })
  ] });
}
export {
  PlaylistCard as P
};
