import { e as useNavigate, r as reactExports, j as jsxRuntimeExports, i as useParams, L as Link } from "./react-vendor.CAo4XUiA.js";
import { K as useIsDesktopApp, u as useAuth, dV as useUserTierLists, x as usePublicTierLists, Q as Background, S as Sidebar, B as Button, bq as Tabs, br as TabsList, bs as TabsTrigger, bu as TabsContent, fD as useTierListByShareCode, fE as useDeleteTierList, J as useConfirm, a8 as Avatar, a9 as AvatarImage, aa as AvatarFallback, j as cn, G as GlassPanel, az as Input, aP as DEFAULT_TIERS, eQ as Comments, a2 as supabase } from "./index.C6yfkT5T.js";
import { M as MobileNav } from "./MobileNav.ABHzkhTQ.js";
import { T as TierListEditor, u as useTierListAccess, a as useTierListCollaborators, b as useAddTierListCollaborator, c as useUpdateTierListCollaboratorRole, d as useRemoveTierListCollaborator } from "./useTierListCollaboration.Bk4WIHeE.js";
import { a as TierListGrid } from "./TierListCard.xUrqhVp3.js";
import { S as Seo } from "./Seo.CEAYCbtv.js";
import { a as useQuery } from "./tanstack.DPr3OB19.js";
import { bp as formatDistanceToNow, bf as ue } from "./vendor.CJyRs4QS.js";
import { u as ArrowLeft, P as Plus, g as User, a5 as Globe, aA as Layers, a6 as Lock, U as Users, bg as Share2, cE as SquarePen, J as Trash2, m as Eye, H as Heart, X, ap as UserPlus } from "./icons.C2gBBarQ.js";
import "./supabase.WuRMX5Dg.js";
import "./radix.BiK9uYXL.js";
import "./motion.DVGLRFCH.js";
import "./hls.BlgtCWcq.js";
import "./editor.Dxw8dtyw.js";
import "./charts.Dr1fgDJ-.js";
function getItemDetails(item) {
  const rawId = String(item.anime_id || item.id || "");
  const itemType = String(item.type || item.item_type || item.media_type || "").toLowerCase();
  const image = String(item.anime_image || item.image || item.poster || "");
  const imageLooksLikeCharacter = /\/character\//i.test(image);
  const isCharacter = itemType === "character" || itemType === "char" || /^(char[-_:/]|character[-_:/])/i.test(rawId) || imageLooksLikeCharacter;
  const isManga = !isCharacter && (itemType === "manga" || /^(manga[-_:/])/i.test(rawId));
  const cleanCharId = rawId.replace(/^(char[-_:/]|character[-_:/])/i, "");
  const cleanMangaId = rawId.replace(/^manga[-_:/]/i, "");
  const title = item.anime_title || item.title || item.name || "";
  let linkTo = `/anime/${rawId}`;
  if (isCharacter) {
    linkTo = `/char/${encodeURIComponent(cleanCharId)}?name=${encodeURIComponent(title)}`;
  } else if (isManga) {
    linkTo = `/manga/${encodeURIComponent(cleanMangaId)}`;
  }
  return { isCharacter, isManga, linkTo, title };
}
function TierListPage() {
  const navigate = useNavigate();
  const isDesktopApp = useIsDesktopApp();
  const { user } = useAuth();
  const [showEditor, setShowEditor] = reactExports.useState(false);
  const [editingTierList, setEditingTierList] = reactExports.useState(null);
  const { data: userTierLists = [], isLoading: loadingUser } = useUserTierLists(user == null ? void 0 : user.id);
  const { data: publicTierLists = [], isLoading: loadingPublic } = usePublicTierLists();
  const handleCreate = () => {
    setEditingTierList(null);
    setShowEditor(true);
  };
  const handleCloseEditor = () => {
    setShowEditor(false);
    setEditingTierList(null);
  };
  if (showEditor) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background text-foreground overflow-x-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Background, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Sidebar, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: `relative z-10 ${isDesktopApp ? "pl-6" : "pl-6 md:pl-32"} pr-6 py-6 max-w-[1400px] mx-auto pb-24 md:pb-6`, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-4 mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: "ghost",
            size: "sm",
            onClick: handleCloseEditor,
            className: "rounded-full gap-2 text-muted-foreground hover:text-foreground hover:bg-card/40",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Back" })
            ]
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl md:text-5xl font-extrabold tracking-tight mb-2 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent", children: editingTierList ? "Edit Tier List" : "Create Tier List" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-base", children: "Rank, reorganize, and refine your anime tier lists." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          TierListEditor,
          {
            initialData: editingTierList,
            onClose: handleCloseEditor
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(MobileNav, {})
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background text-foreground overflow-x-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Background, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Sidebar, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: `relative z-10 ${isDesktopApp ? "pl-6" : "pl-6 md:pl-32"} pr-6 py-6 max-w-[1400px] mx-auto pb-24 md:pb-6`, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-4 mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          variant: "ghost",
          size: "sm",
          onClick: () => navigate(-1),
          className: "rounded-full gap-2 text-muted-foreground hover:text-foreground hover:bg-card/40",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Back" })
          ]
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl md:text-5xl font-extrabold tracking-tight mb-2 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent", children: "Tier Lists" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-base", children: "Explore community rankings or publish your own custom tiers." })
        ] }),
        user && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            onClick: handleCreate,
            className: "rounded-full gap-2 px-6 h-11 shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all active:scale-95",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
              "Create Tier List"
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: user ? "my-lists" : "community", className: "space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "bg-card/30 backdrop-blur-xl border border-border/40 p-1.5 rounded-full inline-flex", children: [
          user && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            TabsTrigger,
            {
              value: "my-lists",
              className: "rounded-full px-5 py-2 text-sm gap-2 transition-all data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-4 h-4" }),
                "My Lists"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            TabsTrigger,
            {
              value: "community",
              className: "rounded-full px-5 py-2 text-sm gap-2 transition-all data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { className: "w-4 h-4" }),
                "Community"
              ]
            }
          )
        ] }),
        user && /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "my-lists", children: loadingUser ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center py-20 text-muted-foreground gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium", children: "Fetching your tier lists..." })
        ] }) : userTierLists.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full flex flex-col items-center justify-center py-24 px-4 text-center bg-card/10 backdrop-blur-sm border border-dashed border-border/50 rounded-[2rem]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 text-primary", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Layers, { className: "w-8 h-8" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-bold mb-2", children: "No Tier Lists Yet" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground max-w-sm mb-6 text-sm", children: "Create custom rankings for your favorite anime, characters, or manga series." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: handleCreate, className: "rounded-full gap-2 px-6 h-11", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
            "Create Your First Tier List"
          ] })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
          TierListGrid,
          {
            tierLists: userTierLists,
            showAuthor: false
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "community", children: loadingPublic ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center py-20 text-muted-foreground gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium", children: "Loading community tier lists..." })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
          TierListGrid,
          {
            tierLists: publicTierLists,
            emptyMessage: "No community tier lists found."
          }
        ) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(MobileNav, {})
  ] });
}
function TierListViewPage() {
  var _a, _b;
  const { shareCode } = useParams();
  const navigate = useNavigate();
  const isDesktopApp = useIsDesktopApp();
  const { user } = useAuth();
  const { data: tierList, isLoading, error } = useTierListByShareCode(shareCode || "");
  const { data: tierListAccess } = useTierListAccess(tierList == null ? void 0 : tierList.id);
  const { data: collaborators = [] } = useTierListCollaborators(tierList == null ? void 0 : tierList.id);
  const deleteMutation = useDeleteTierList();
  const addCollaborator = useAddTierListCollaborator();
  const updateCollaboratorRole = useUpdateTierListCollaboratorRole();
  const removeCollaborator = useRemoveTierListCollaborator();
  const confirm = useConfirm();
  const [collaboratorSearch, setCollaboratorSearch] = reactExports.useState("");
  const [newCollaboratorRole, setNewCollaboratorRole] = reactExports.useState("editor");
  const [showCollaboratorsModal, setShowCollaboratorsModal] = reactExports.useState(false);
  const canEdit = (user == null ? void 0 : user.id) === (tierList == null ? void 0 : tierList.user_id) || !!(tierListAccess == null ? void 0 : tierListAccess.canEdit);
  const canManageCollaborators = (user == null ? void 0 : user.id) === (tierList == null ? void 0 : tierList.user_id) || !!(tierListAccess == null ? void 0 : tierListAccess.canManage);
  const { data: collaboratorSearchResults = [] } = useQuery({
    queryKey: ["tier-list-collaborator-search", tierList == null ? void 0 : tierList.id, collaboratorSearch, collaborators.length],
    enabled: !!tierList && canManageCollaborators && collaboratorSearch.trim().length >= 2,
    queryFn: async () => {
      if (!tierList) return [];
      const searchTerm = collaboratorSearch.trim();
      const { data, error: error2 } = await supabase.from("profiles").select("user_id, username, display_name, avatar_url").or(`username.ilike.%${searchTerm}%,display_name.ilike.%${searchTerm}%`).limit(10);
      if (error2) throw error2;
      const existingUserIds = new Set(collaborators.map((collaborator) => collaborator.user_id));
      existingUserIds.add(tierList.user_id);
      return (data || []).filter((profile) => !existingUserIds.has(profile.user_id));
    }
  });
  const handleShare = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    ue.success("Link copied to clipboard!");
  };
  const handleDelete = async () => {
    if (!tierList || !await confirm({ title: "Are you sure you want to delete this tier list?", destructive: true })) return;
    try {
      await deleteMutation.mutateAsync(tierList.id);
      ue.success("Tier list deleted");
      navigate("/tierlists");
    } catch {
      ue.error("Failed to delete tier list");
    }
  };
  const handleAddCollaborator = async (userId) => {
    if (!tierList) return;
    await addCollaborator.mutateAsync({
      tierListId: tierList.id,
      userId,
      role: newCollaboratorRole
    });
    setCollaboratorSearch("");
  };
  const handleUpdateCollaboratorRole = async (collaboratorId, role) => {
    if (!tierList) return;
    await updateCollaboratorRole.mutateAsync({
      tierListId: tierList.id,
      collaboratorId,
      role
    });
  };
  const handleRemoveCollaborator = async (collaboratorId) => {
    if (!tierList) return;
    await removeCollaborator.mutateAsync({
      tierListId: tierList.id,
      collaboratorId
    });
  };
  const handleWatchWithFriends = (item) => {
    const { isCharacter, isManga, title } = getItemDetails(item);
    if (isCharacter || isManga) {
      ue.info("Watch rooms can only be launched for anime entries");
      return;
    }
    const params = new URLSearchParams({
      anime: String(item.anime_id),
      title
    });
    if (item.anime_image) {
      params.set("poster", item.anime_image);
    }
    navigate(`/isshoni?${params.toString()}`);
  };
  const isOwner = (user == null ? void 0 : user.id) === (tierList == null ? void 0 : tierList.user_id);
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-background flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-3 text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium", children: "Loading tier list..." })
    ] }) });
  }
  if (error || !tierList) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-background flex items-center justify-center p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card/20 backdrop-blur-xl border border-border/40 p-8 rounded-[2rem] text-center max-w-md w-full shadow-2xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 bg-muted/50 rounded-full flex items-center justify-center mx-auto mb-4 text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-6 h-6" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold mb-2", children: "Tier List Unavailable" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mb-6", children: "This tier list might be private or may have been deleted." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: () => navigate("/tierlists"), className: "rounded-full px-6 w-full", children: "Browse Tier Lists" })
    ] }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background text-foreground overflow-x-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Background, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Sidebar, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: `relative z-10 ${isDesktopApp ? "pl-6" : "pl-6 md:pl-32"} pr-6 py-6 max-w-[1400px] mx-auto pb-24 md:pb-6`, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-4 mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          variant: "ghost",
          size: "sm",
          onClick: () => navigate(-1),
          className: "rounded-full gap-2 text-muted-foreground hover:text-foreground hover:bg-card/40",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Back" })
          ]
        }
      ) }),
      tierList && /* @__PURE__ */ jsxRuntimeExports.jsx(
        Seo,
        {
          title: tierList.name || tierList.title || "Tier List",
          description: tierList.description || `A tier list by ${((_a = tierList.profiles) == null ? void 0 : _a.display_name) || ((_b = tierList.profiles) == null ? void 0 : _b.username) || "a Tatakai member"}.`,
          canonicalPath: `/tierlist/${shareCode}`,
          kind: "website",
          suffix: " — Tatakai Tier List"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card/20 backdrop-blur-xl border border-border/40 p-6 md:p-8 rounded-[2rem] mb-6 shadow-xl relative overflow-hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 right-0 w-96 h-96 bg-primary/5 blur-[100px] rounded-full pointer-events-none" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 flex flex-col md:flex-row md:items-start justify-between gap-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 max-w-2xl", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-flex items-center gap-2 px-3 py-1 rounded-full bg-muted/40 border border-white/5 text-xs font-semibold text-muted-foreground", children: tierList.is_public ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { className: "w-3.5 h-3.5 text-emerald-400" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Public Tier List" })
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-3.5 h-3.5 text-amber-400" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Private Tier List" })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl md:text-5xl font-extrabold tracking-tight", children: tierList.name }),
            tierList.description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-base leading-relaxed", children: tierList.description })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5 flex-wrap", children: [
            (canManageCollaborators || collaborators.length > 0) && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                variant: "outline",
                size: "sm",
                onClick: () => setShowCollaboratorsModal(true),
                className: "rounded-full gap-2 bg-card/30 border-border/50 hover:bg-card/60 backdrop-blur-md relative",
                title: "Manage Collaborators",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-4 h-4 text-primary" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Collaborators" }),
                  collaborators.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-1 px-1.5 py-0.5 rounded-full bg-primary/20 text-primary text-xs font-bold", children: collaborators.length })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                variant: "outline",
                size: "sm",
                onClick: handleShare,
                className: "rounded-full gap-2 bg-card/30 border-border/50 hover:bg-card/60 backdrop-blur-md",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Share2, { className: "w-4 h-4" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Share" })
                ]
              }
            ),
            canEdit && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                variant: "outline",
                size: "sm",
                onClick: () => navigate(`/tierlists/edit/${tierList.id}`),
                className: "rounded-full gap-2 bg-card/30 border-border/50 hover:bg-card/60 backdrop-blur-md",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SquarePen, { className: "w-4 h-4" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Edit" })
                ]
              }
            ),
            isOwner && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                variant: "outline",
                size: "sm",
                onClick: handleDelete,
                disabled: deleteMutation.isPending,
                className: "rounded-full gap-2 bg-rose-500/10 border-rose-500/20 text-rose-400 hover:bg-rose-500/20 hover:text-rose-300 backdrop-blur-md",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-4 h-4" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Delete" })
                ]
              }
            )
          ] })
        ] }),
        tierList.profiles && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-8 pt-6 border-t border-border/30", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Link,
            {
              to: `/user/${tierList.profiles.username}`,
              className: "flex items-center gap-3 group",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Avatar, { className: "w-10 h-10 ring-2 ring-primary/20", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarImage, { src: tierList.profiles.avatar_url || void 0 }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarFallback, { className: "bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-5 h-5 text-muted-foreground" }) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm group-hover:text-primary transition-colors", children: tierList.profiles.username || tierList.profiles.display_name || "Anonymous" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                    "Created ",
                    formatDistanceToNow(new Date(tierList.created_at), { addSuffix: true })
                  ] })
                ] })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-5 text-xs font-medium text-muted-foreground bg-muted/20 px-4 py-2 rounded-full border border-white/5 self-start sm:self-auto", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-4 h-4" }),
              tierList.views_count || 0,
              " views"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-1 h-1 rounded-full bg-border" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: cn("w-4 h-4", tierList.user_liked && "text-rose-500 fill-current") }),
              tierList.likes_count || 0,
              " likes"
            ] })
          ] })
        ] })
      ] }),
      showCollaboratorsModal && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-200", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "fixed inset-0",
            onClick: () => setShowCollaboratorsModal(false)
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassPanel, { className: "relative z-10 w-full max-w-lg p-6 rounded-[2rem] border-border/40 shadow-2xl space-y-5 animate-in zoom-in-95 duration-200 max-h-[85vh] overflow-y-auto", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between pb-3 border-b border-border/30", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-5 h-5 text-primary" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-bold text-lg", children: "Manage Collaborators" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "ghost",
                size: "icon",
                className: "rounded-full h-8 w-8 text-muted-foreground hover:text-foreground",
                onClick: () => setShowCollaboratorsModal(false),
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider", children: "Current Collaborators" }),
            collaborators.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground italic py-2", children: "No collaborators added yet." }) : collaborators.map((collaborator) => {
              var _a2, _b2, _c, _d;
              const displayName = ((_a2 = collaborator.profile) == null ? void 0 : _a2.display_name) || ((_b2 = collaborator.profile) == null ? void 0 : _b2.username) || collaborator.user_id;
              return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3.5 rounded-2xl bg-card/40 border border-border/40 flex items-center gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Avatar, { className: "w-9 h-9", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarImage, { src: ((_c = collaborator.profile) == null ? void 0 : _c.avatar_url) || void 0 }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarFallback, { children: ((displayName == null ? void 0 : displayName[0]) || "U").toUpperCase() })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold truncate", children: displayName }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground truncate", children: [
                    "@",
                    ((_d = collaborator.profile) == null ? void 0 : _d.username) || "unknown"
                  ] })
                ] }),
                canManageCollaborators ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "select",
                    {
                      value: collaborator.role,
                      onChange: (event) => handleUpdateCollaboratorRole(collaborator.id, event.target.value),
                      className: "h-8 rounded-full border border-border/60 bg-background/80 px-3 text-xs font-medium focus:ring-1 focus:ring-primary",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "viewer", children: "viewer" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "editor", children: "editor" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "owner", children: "owner" })
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      variant: "ghost",
                      size: "icon",
                      className: "h-8 w-8 rounded-full text-muted-foreground hover:text-rose-500 hover:bg-rose-500/10",
                      onClick: () => handleRemoveCollaborator(collaborator.id),
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-4 h-4" })
                    }
                  )
                ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider", children: collaborator.role })
              ] }, collaborator.id);
            })
          ] }),
          canManageCollaborators && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-4 border-t border-border/30 space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm font-semibold", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(UserPlus, { className: "w-4 h-4 text-primary" }),
              "Add New Collaborator"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  value: collaboratorSearch,
                  onChange: (event) => setCollaboratorSearch(event.target.value),
                  placeholder: "Search username or display name...",
                  className: "rounded-full bg-background/50 border-border/50"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "select",
                {
                  value: newCollaboratorRole,
                  onChange: (event) => setNewCollaboratorRole(event.target.value),
                  className: "h-10 rounded-full border border-border/50 bg-background/50 px-3 text-sm font-medium focus:ring-1 focus:ring-primary",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "viewer", children: "viewer" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "editor", children: "editor" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "owner", children: "owner" })
                  ]
                }
              )
            ] }),
            collaboratorSearch.trim().length >= 2 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-h-44 overflow-y-auto rounded-2xl border border-border/50 bg-card/60 backdrop-blur-md divide-y divide-border/30", children: collaboratorSearchResults.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground p-3.5 text-center", children: "No matching users found." }) : collaboratorSearchResults.map((profile) => {
              const displayName = profile.display_name || profile.username || profile.user_id;
              return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 flex items-center gap-3 hover:bg-card/80 transition-colors", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Avatar, { className: "h-8 w-8", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarImage, { src: profile.avatar_url || void 0 }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarFallback, { children: ((displayName == null ? void 0 : displayName[0]) || "U").toUpperCase() })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium truncate", children: displayName }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground truncate", children: [
                    "@",
                    profile.username || "unknown"
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", onClick: () => handleAddCollaborator(profile.user_id), className: "rounded-full px-4 h-8 text-xs", children: "Add" })
              ] }, profile.user_id);
            }) })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: DEFAULT_TIERS.map((tier) => {
        const tierItems = tierList.items.filter((i) => i.tier === tier.name);
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex border border-border/40 rounded-2xl overflow-hidden bg-card/20 backdrop-blur-xl shadow-lg min-h-[96px]",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "w-20 md:w-28 flex-shrink-0 flex items-center justify-center font-black text-2xl md:text-4xl shadow-inner relative",
                  style: {
                    backgroundColor: tier.color,
                    color: "rgba(255,255,255,0.95)",
                    textShadow: "0 2px 6px rgba(0,0,0,0.35)"
                  },
                  children: tier.name
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 p-3 flex flex-wrap items-center gap-2.5", children: [
                tierItems.map((item) => {
                  const { isCharacter, isManga, linkTo, title } = getItemDetails(item);
                  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      className: "group relative w-16 h-24 md:w-20 md:h-28 rounded-xl overflow-hidden bg-background/50 shadow-md border border-white/10 hover:border-primary/50 transition-all duration-300",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: linkTo, className: "block w-full h-full", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "img",
                            {
                              src: item.anime_image,
                              alt: title,
                              className: "w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-1.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] leading-tight font-medium text-white text-center w-full line-clamp-3", children: title }) })
                        ] }),
                        !isCharacter && !isManga && /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "button",
                          {
                            type: "button",
                            onClick: (event) => {
                              event.preventDefault();
                              event.stopPropagation();
                              handleWatchWithFriends(item);
                            },
                            className: "absolute top-1.5 right-1.5 h-7 w-7 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-primary hover:border-primary shadow-lg",
                            title: "Watch with friends",
                            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-3.5 h-3.5" })
                          }
                        )
                      ]
                    },
                    item.anime_id
                  );
                }),
                tierItems.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center w-full h-full text-muted-foreground/40 text-xs font-medium italic", children: "No items in this tier" })
              ] })
            ]
          },
          tier.name
        );
      }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(GlassPanel, { className: "p-6 md:p-8 mt-8 rounded-[2rem] border-border/40", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Comments, { entityType: "tier_list", entityId: tierList.id, entityName: tierList.name }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(MobileNav, {})
  ] });
}
export {
  TierListViewPage,
  TierListPage as default
};
