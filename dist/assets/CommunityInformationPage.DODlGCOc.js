import { i as useParams, e as useNavigate, r as reactExports, j as jsxRuntimeExports } from "./react-vendor.CAo4XUiA.js";
import { bf as ue } from "./vendor.CJyRs4QS.js";
import { C as CommunitySidebar } from "./CommunitySidebar.DBOREraZ.js";
import { M as MobileNav } from "./MobileNav.ABHzkhTQ.js";
import { D as useIsNativeApp, K as useIsDesktopApp, u as useAuth, fY as useCommunityBySlug, fW as useUpdateCommunity, B as Button, j as cn, l as getProxiedImageUrl, fX as RichCommentComposer } from "./index.C6yfkT5T.js";
import { p as parseCommunityDoc, c as communityDocIsEmpty, C as CommunityRichContent, s as serializeCommunityDoc } from "./CommunityRichContent.KB4GKrPn.js";
import { Q as LoaderCircle, u as ArrowLeft, i as Settings, av as ScrollText, d6 as BookText, aR as Pencil } from "./icons.C2gBBarQ.js";
import "./tanstack.DPr3OB19.js";
import "./supabase.WuRMX5Dg.js";
import "./radix.BiK9uYXL.js";
import "./motion.DVGLRFCH.js";
import "./hls.BlgtCWcq.js";
import "./editor.Dxw8dtyw.js";
import "./charts.Dr1fgDJ-.js";
function InfoCard({
  icon: Icon,
  label,
  accent,
  action,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "community-card group flex w-full flex-col", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("pointer-events-none absolute -left-12 -top-12 h-56 w-56 rounded-full blur-[90px] transition-colors", accent) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 flex items-center justify-between gap-2 p-4 pb-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-7 w-7 items-center justify-center rounded-full border border-white/10 bg-white/[0.04]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-3.5 w-3.5 text-white/80" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] font-bold uppercase tracking-widest text-white/70", children: label })
      ] }),
      action
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative z-10 px-4 pb-4", children })
  ] });
}
function CommunityInformationPage() {
  var _a;
  const { slug } = useParams();
  const navigate = useNavigate();
  const isNative = useIsNativeApp();
  const isDesktopApp = useIsDesktopApp();
  const { user, isAdmin, isModerator } = useAuth();
  const { data: community, isLoading } = useCommunityBySlug(slug);
  const updateCommunity = useUpdateCommunity();
  const canManage = !!community && (community.created_by === (user == null ? void 0 : user.id) || community.my_role === "owner" || community.my_role === "mod" || isAdmin || isModerator);
  const [editingField, setEditingField] = reactExports.useState(null);
  const save = async (field, payload) => {
    if (!community) return false;
    const value = serializeCommunityDoc({ content: payload.content, embeds: payload.embeds });
    try {
      await updateCommunity.mutateAsync({ id: community.id, [field]: value });
      ue.success("Saved");
      setEditingField(null);
    } catch (err) {
      ue.error("Failed to save", { description: err instanceof Error ? err.message : void 0 });
      return false;
    }
  };
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-6 w-6 animate-spin text-muted-foreground" }) });
  }
  if (!community) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background text-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CommunitySidebar, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: cn("relative z-10 w-full", isDesktopApp ? "pl-24 lg:pl-28" : isNative ? "pl-0" : "pl-0 md:pl-24 lg:pl-28"), children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-2xl px-4 py-16 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold", children: "Community not found" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { className: "mt-4 rounded-full", onClick: () => navigate("/community"), children: "Back to Community" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(MobileNav, {})
    ] });
  }
  const rulesDoc = parseCommunityDoc(community.rules);
  const aboutDoc = parseCommunityDoc(community.about);
  const editAction = (field) => canManage && editingField !== field ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Button,
    {
      variant: "ghost",
      size: "sm",
      className: "h-7 gap-1.5 rounded-full px-2.5 text-white/70 hover:text-white",
      onClick: () => setEditingField(field),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "h-3.5 w-3.5" }),
        " Edit"
      ]
    }
  ) : null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen overflow-x-hidden bg-background text-foreground", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(CommunitySidebar, {}),
    community.banner_url && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pointer-events-none fixed inset-0 -z-10 h-full w-full overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "img",
        {
          src: getProxiedImageUrl(community.banner_url),
          alt: "",
          className: "h-full w-full scale-125 object-cover opacity-[0.12] blur-[100px] saturate-[2.5] md:opacity-[0.2]"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-background/50 via-background/85 to-background/95" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: cn("relative z-10 w-full", isDesktopApp ? "pl-24 lg:pl-28" : isNative ? "pl-0" : "pl-0 md:pl-24 lg:pl-28"), children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-3xl px-4 py-8 md:px-8 md:py-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6 flex items-center justify-between gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-w-0 items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: () => navigate(`/community/c/${community.slug}`),
              className: "group/back flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/80 transition-colors hover:bg-white/10 hover:text-white",
              "aria-label": "Back to community",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4 transition-transform group-hover/back:-translate-x-0.5" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] font-bold uppercase tracking-widest text-white/50", children: "Information" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "truncate font-display text-xl font-black tracking-tight md:text-2xl", children: community.name })
          ] })
        ] }),
        canManage && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: "secondary",
            size: "sm",
            onClick: () => navigate(`/community/c/${community.slug}/settings`),
            className: "shrink-0 gap-1.5 rounded-full border border-white/10 bg-white/10 text-white hover:bg-white/20",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Settings, { className: "h-4 w-4" }),
              " Settings"
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(InfoCard, { icon: ScrollText, label: "Rules", accent: "bg-rose-500/10 group-hover:bg-rose-500/20", action: editAction("rules"), children: editingField === "rules" ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          RichCommentComposer,
          {
            allowEmbeds: true,
            showSpoiler: false,
            submitLabel: "Save",
            placeholder: "Set the rules for this community…",
            initialContent: rulesDoc.content,
            initialEmbeds: rulesDoc.embeds,
            onCancel: () => setEditingField(null),
            onSubmit: (payload) => save("rules", payload)
          }
        ) : !communityDocIsEmpty(community.rules) ? /* @__PURE__ */ jsxRuntimeExports.jsx(CommunityRichContent, { value: community.rules, bodyClassName: "text-sm leading-relaxed" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm italic text-muted-foreground", children: "No rules set yet." }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(InfoCard, { icon: BookText, label: "About", accent: "bg-primary/10 group-hover:bg-primary/20", action: editAction("about"), children: editingField === "about" ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          RichCommentComposer,
          {
            allowEmbeds: true,
            showSpoiler: false,
            submitLabel: "Save",
            placeholder: "Tell members what this community is about…",
            initialContent: aboutDoc.content,
            initialEmbeds: aboutDoc.embeds,
            onCancel: () => setEditingField(null),
            onSubmit: (payload) => save("about", payload)
          }
        ) : !communityDocIsEmpty(community.about) ? /* @__PURE__ */ jsxRuntimeExports.jsx(CommunityRichContent, { value: community.about, bodyClassName: "text-sm leading-relaxed" }) : ((_a = community.description) == null ? void 0 : _a.trim()) ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "whitespace-pre-wrap text-sm leading-relaxed text-white/80", children: community.description }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm italic text-muted-foreground", children: "Nothing here yet." }) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(MobileNav, {})
  ] });
}
export {
  CommunityInformationPage as default
};
