import { i as useParams, e as useNavigate, r as reactExports, j as jsxRuntimeExports } from "./react-vendor.CAo4XUiA.js";
import { bf as ue } from "./vendor.CJyRs4QS.js";
import { C as CommunitySidebar } from "./CommunitySidebar.DBOREraZ.js";
import { M as MobileNav } from "./MobileNav.ABHzkhTQ.js";
import { D as useIsNativeApp, K as useIsDesktopApp, u as useAuth, fY as useCommunityBySlug, fW as useUpdateCommunity, g0 as useDeleteCommunity, l as getProxiedImageUrl, B as Button, j as cn, az as Input, cg as AlertDialog, ch as AlertDialogContent, ci as AlertDialogHeader, cj as AlertDialogTitle, ck as AlertDialogDescription, cl as AlertDialogFooter, cm as AlertDialogCancel, cn as AlertDialogAction, e3 as uploadUserMedia } from "./index.C6yfkT5T.js";
import { Q as LoaderCircle, u as ArrowLeft, aF as Save, ax as ImagePlus, U as Users, I as Info, J as Trash2 } from "./icons.C2gBBarQ.js";
import "./tanstack.DPr3OB19.js";
import "./supabase.WuRMX5Dg.js";
import "./radix.BiK9uYXL.js";
import "./motion.DVGLRFCH.js";
import "./hls.BlgtCWcq.js";
import "./editor.Dxw8dtyw.js";
import "./charts.Dr1fgDJ-.js";
function CommunitySettingsPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const isNative = useIsNativeApp();
  const isDesktopApp = useIsDesktopApp();
  const { user, isAdmin, isModerator } = useAuth();
  const { data: community, isLoading } = useCommunityBySlug(slug);
  const updateCommunity = useUpdateCommunity();
  const deleteCommunity = useDeleteCommunity();
  const canManage = !!(user && community) && (community.created_by === user.id || community.my_role === "owner" || community.my_role === "mod" || isAdmin || isModerator);
  const canDelete = !!(user && community) && (community.created_by === user.id || community.my_role === "owner" || isAdmin);
  const iconRef = reactExports.useRef(null);
  const bannerRef = reactExports.useRef(null);
  const [name, setName] = reactExports.useState("");
  const [description, setDescription] = reactExports.useState("");
  const [icon, setIcon] = reactExports.useState(null);
  const [banner, setBanner] = reactExports.useState(null);
  const [saving, setSaving] = reactExports.useState(false);
  const [deleteOpen, setDeleteOpen] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (!community) return;
    setName(community.name ?? "");
    setDescription(community.description ?? "");
    setIcon(community.icon_url ? { preview: getProxiedImageUrl(community.icon_url) } : null);
    setBanner(community.banner_url ? { preview: getProxiedImageUrl(community.banner_url) } : null);
  }, [community == null ? void 0 : community.id]);
  const pickImage = (e, set) => {
    var _a;
    const file = (_a = e.target.files) == null ? void 0 : _a[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) return ue.error("Image must be under 5MB");
    const reader = new FileReader();
    reader.onloadend = () => set({ file, preview: reader.result });
    reader.readAsDataURL(file);
  };
  const save = async () => {
    if (!community) return;
    if (!name.trim()) return ue.error("Name is required");
    setSaving(true);
    try {
      let icon_url = community.icon_url ?? void 0;
      let banner_url = community.banner_url ?? void 0;
      if (icon == null ? void 0 : icon.file) icon_url = (await uploadUserMedia(icon.file, user.id, "forum_image")).url;
      if (banner == null ? void 0 : banner.file) banner_url = (await uploadUserMedia(banner.file, user.id, "forum_image")).url;
      await updateCommunity.mutateAsync({
        id: community.id,
        name: name.trim(),
        description: description.trim(),
        icon_url,
        banner_url
      });
      ue.success("Community updated");
      navigate(`/community/c/${community.slug}`);
    } catch (err) {
      ue.error("Failed to save", { description: err instanceof Error ? err.message : void 0 });
    } finally {
      setSaving(false);
    }
  };
  const remove = async () => {
    if (!community) return;
    try {
      await deleteCommunity.mutateAsync(community.id);
      ue.success("Community deleted");
      navigate("/community");
    } catch (err) {
      ue.error("Failed to delete", { description: err instanceof Error ? err.message : void 0 });
    }
  };
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-6 w-6 animate-spin text-muted-foreground" }) });
  }
  if (!community || !canManage) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background text-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CommunitySidebar, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: cn("relative z-10 w-full", isDesktopApp ? "pl-24 lg:pl-28" : isNative ? "pl-0" : "pl-0 md:pl-24 lg:pl-28"), children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-2xl px-4 py-16 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold", children: community ? "You can’t manage this community" : "Community not found" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { className: "mt-4 rounded-full", onClick: () => navigate(community ? `/community/c/${community.slug}` : "/community"), children: community ? "Back to community" : "Back to Community" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(MobileNav, {})
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen overflow-x-hidden bg-background text-foreground", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(CommunitySidebar, {}),
    ((banner == null ? void 0 : banner.preview) || community.banner_url) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pointer-events-none fixed inset-0 -z-10 h-full w-full overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "img",
        {
          src: (banner == null ? void 0 : banner.preview) || getProxiedImageUrl(community.banner_url),
          alt: "",
          className: "h-full w-full scale-125 object-cover opacity-[0.12] blur-[100px] saturate-[2.5] md:opacity-[0.2]"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-background/40 via-background/80 to-background/95" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: cn("relative z-10 w-full", isDesktopApp ? "pl-24 lg:pl-28" : isNative ? "pl-0" : "pl-0 md:pl-24 lg:pl-28"), children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-2xl px-4 py-8 md:px-6 md:py-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6 flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => navigate(`/community/c/${community.slug}`),
            className: "group/back flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white/80 transition-colors hover:bg-white/[0.08] hover:text-white",
            "aria-label": "Back to community",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4 transition-transform group-hover/back:-translate-x-0.5" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] font-bold uppercase tracking-widest text-primary/80", children: "Settings" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "truncate font-display text-2xl font-black tracking-tight", children: community.name })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", className: "gap-1.5 rounded-full font-bold", disabled: saving, onClick: save, children: [
          saving ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "h-4 w-4" }),
          " Save"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mb-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => {
              var _a;
              return (_a = bannerRef.current) == null ? void 0 : _a.click();
            },
            className: "community-card group/banner relative flex h-40 w-full items-center justify-center",
            children: [
              banner ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: banner.preview, alt: "", className: "h-full w-full object-cover transition-transform group-hover/banner:scale-[1.02]" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2 text-sm text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ImagePlus, { className: "h-4 w-4" }),
                " Add banner"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute inset-0 flex items-center justify-center bg-black/40 text-xs font-semibold text-white opacity-0 transition-opacity group-hover/banner:opacity-100", children: "Change banner" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => {
              var _a;
              return (_a = iconRef.current) == null ? void 0 : _a.click();
            },
            className: "group/icon absolute -bottom-6 left-5 flex h-20 w-20 items-center justify-center overflow-hidden rounded-2xl border-4 border-background bg-background shadow-xl",
            children: [
              icon ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: icon.preview, alt: "", className: "h-full w-full object-cover" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-6 w-6 text-muted-foreground" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity group-hover/icon:opacity-100", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ImagePlus, { className: "h-5 w-5 text-white" }) })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 pt-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[11px] font-bold uppercase tracking-widest text-white/60", children: "Name" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: name, onChange: (e) => setName(e.target.value), maxLength: 60, placeholder: "Community name", className: "rounded-xl" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[11px] font-bold uppercase tracking-widest text-white/60", children: "Description" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "textarea",
            {
              value: description,
              onChange: (e) => setDescription(e.target.value),
              rows: 3,
              maxLength: 300,
              placeholder: "What's this community about?",
              className: "w-full resize-none rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-sm focus:border-primary/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => navigate(`/community/c/${community.slug}`),
            className: "group/info flex w-full items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-3 text-left transition-colors hover:bg-white/[0.06]",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.04]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { className: "h-4 w-4 text-white/80" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-white", children: "Rules & About" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Edit inline from the Information widget — playlists, tier lists, media and more." })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4 shrink-0 rotate-180 text-white/50 transition-transform group-hover/info:translate-x-0.5" })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex justify-end gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", className: "rounded-full", onClick: () => navigate(`/community/c/${community.slug}`), children: "Cancel" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { className: "gap-1.5 rounded-full px-5 font-bold", disabled: saving, onClick: save, children: [
          saving ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "h-4 w-4" }),
          " Save changes"
        ] })
      ] }),
      canDelete && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-10 rounded-2xl border border-rose-500/20 bg-rose-500/[0.04] p-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-sm font-bold text-rose-300", children: "Delete community" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-muted-foreground", children: "Permanently removes this community, its memberships and staff. Posts stay but lose their community. This can’t be undone." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: "destructive",
            size: "sm",
            className: "shrink-0 gap-1.5 rounded-full",
            onClick: () => setDeleteOpen(true),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" }),
              " Delete"
            ]
          }
        )
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialog, { open: deleteOpen, onOpenChange: setDeleteOpen, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogTitle, { children: [
            "Delete “",
            community.name,
            "”?"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogDescription, { children: "This permanently deletes the community and removes all members. Posts made here will remain but will no longer belong to a community. This action cannot be undone." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { disabled: deleteCommunity.isPending, children: "Cancel" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            AlertDialogAction,
            {
              onClick: remove,
              disabled: deleteCommunity.isPending,
              className: "bg-rose-600 text-white hover:bg-rose-600/90",
              children: [
                deleteCommunity.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "mr-1.5 h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "mr-1.5 h-4 w-4" }),
                "Delete community"
              ]
            }
          )
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { ref: iconRef, type: "file", accept: "image/*", className: "hidden", onChange: (e) => pickImage(e, setIcon) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { ref: bannerRef, type: "file", accept: "image/*", className: "hidden", onChange: (e) => pickImage(e, setBanner) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(MobileNav, {})
  ] });
}
export {
  CommunitySettingsPage as default
};
