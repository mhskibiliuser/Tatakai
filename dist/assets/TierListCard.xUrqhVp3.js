import { j as jsxRuntimeExports, L as Link } from "./react-vendor.CAo4XUiA.js";
import { u as useAuth, aN as useLikeTierList, aO as useUserBadges, aP as DEFAULT_TIERS, a8 as Avatar, a9 as AvatarImage, aa as AvatarFallback, aQ as UserBadges, B as Button, j as cn } from "./index.C6yfkT5T.js";
import { bp as formatDistanceToNow, bf as ue } from "./vendor.CJyRs4QS.js";
import { a5 as Globe, a6 as Lock, aA as Layers, g as User, m as Eye, H as Heart, bg as Share2 } from "./icons.C2gBBarQ.js";
function TierListCard({ tierList, showAuthor = true, onShare }) {
  const { user } = useAuth();
  const likeMutation = useLikeTierList();
  const { data: authorBadges } = useUserBadges(tierList.user_id);
  const handleLike = async () => {
    if (!user) {
      ue.error("Sign in to like tier lists");
      return;
    }
    try {
      await likeMutation.mutateAsync({ tierListId: tierList.id, liked: tierList.user_liked || false });
    } catch {
      ue.error("Failed to like tier list");
    }
  };
  const handleShare = () => {
    navigator.clipboard.writeText(`${window.location.origin}/tierlist/${tierList.share_code}`);
    ue.success("Link copied to clipboard!");
    onShare == null ? void 0 : onShare();
  };
  const items = tierList.items || [];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "group relative flex flex-col rounded-[1.75rem] border border-border/40 bg-card/20 backdrop-blur-xl overflow-hidden shadow-lg hover:border-primary/80 hover:shadow-xl hover:shadow-primary/200 transition-all duration-300", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: `/tierlist/${tierList.share_code}`, className: "block", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative h-36 overflow-hidden bg-gradient-to-br from-muted/30 to-background/40", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 flex flex-col py-1", children: DEFAULT_TIERS.slice(0, 4).map((tier) => {
        const tierItems = items.filter((i) => i.tier === tier.name).slice(0, 6);
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 flex items-center gap-1 px-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: "w-7 shrink-0 h-6 rounded-md flex items-center justify-center text-[11px] font-black text-white/95",
              style: { backgroundColor: tier.color, textShadow: "0 1px 3px rgba(0,0,0,0.45)" },
              children: tier.name
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 flex gap-1 overflow-hidden", children: tierItems.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: item.anime_image,
              alt: "",
              className: "w-6 h-8 object-cover rounded-[3px] shrink-0 ring-1 ring-white/10"
            },
            item.anime_id
          )) })
        ] }, tier.name);
      }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-card via-card/10 to-transparent pointer-events-none" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute top-3 right-3 inline-flex items-center gap-1 px-2 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-[10px] font-semibold text-white/90", children: tierList.is_public ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { className: "w-3 h-3 text-emerald-400" }),
        "Public"
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-3 h-3 text-amber-400" }),
        "Private"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "absolute bottom-3 left-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/15  text-primary text-xs font-semibold", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Layers, { className: "w-3.5 h-3.5" }),
        items.length,
        " ",
        items.length === 1 ? "entry" : "entries"
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col flex-1 p-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: `/tierlist/${tierList.share_code}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg font-bold tracking-tight line-clamp-1 group-hover:text-primary transition-colors", children: tierList.name }) }),
      tierList.description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground line-clamp-2 mt-1 leading-relaxed", children: tierList.description }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2 mt-4", children: [
        showAuthor && tierList.profiles ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: `/@${tierList.profiles.username}`, className: "flex items-center gap-2 group/author min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Avatar, { className: "w-6 h-6 ring-1 ring-border/50", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarImage, { src: tierList.profiles.avatar_url || void 0 }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarFallback, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-3 h-3" }) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground truncate group-hover/author:text-foreground transition-colors", children: tierList.profiles.username || tierList.profiles.display_name || "Anonymous" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(UserBadges, { badges: authorBadges, size: 14, max: 3 })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: formatDistanceToNow(new Date(tierList.created_at), { addSuffix: true }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 text-xs text-muted-foreground shrink-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-3.5 h-3.5" }),
          tierList.views_count || 0
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 mt-4 pt-4 border-t border-border/40", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: "ghost",
            size: "sm",
            onClick: handleLike,
            disabled: likeMutation.isPending,
            className: cn(
              "rounded-full gap-1.5 hover:bg-rose-500/10",
              tierList.user_liked ? "text-rose-500" : "text-muted-foreground"
            ),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: cn("w-4 h-4 transition-transform", tierList.user_liked && "fill-current scale-110") }),
              tierList.likes_count || 0
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: "ghost",
            size: "sm",
            onClick: handleShare,
            className: "rounded-full gap-1.5 text-muted-foreground hover:text-foreground",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Share2, { className: "w-4 h-4" }),
              "Share"
            ]
          }
        )
      ] })
    ] })
  ] });
}
function TierListGrid({ tierLists, showAuthor = true, emptyMessage = "No tier lists yet" }) {
  if (tierLists.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center py-12 text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: emptyMessage }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: tierLists.map((tierList) => /* @__PURE__ */ jsxRuntimeExports.jsx(TierListCard, { tierList, showAuthor }, tierList.id)) });
}
export {
  TierListCard as T,
  TierListGrid as a
};
