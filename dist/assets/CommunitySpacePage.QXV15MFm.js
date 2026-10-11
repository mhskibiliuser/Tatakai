import { r as reactExports, j as jsxRuntimeExports, e as useNavigate, i as useParams } from "./react-vendor.CAo4XUiA.js";
import { C as CommunitySidebar } from "./CommunitySidebar.DBOREraZ.js";
import { M as MobileNav } from "./MobileNav.ABHzkhTQ.js";
import { fW as useUpdateCommunity, j as cn, fX as RichCommentComposer, a8 as Avatar, a9 as AvatarImage, aa as AvatarFallback, D as useIsNativeApp, K as useIsDesktopApp, u as useAuth, fY as useCommunityBySlug, fS as useToggleCommunityMembership, fZ as useCommunityMembers, f_ as useUpdateMemberRole, B as Button, l as getProxiedImageUrl, Y as DropdownMenu, Z as DropdownMenuTrigger, _ as DropdownMenuContent, $ as DropdownMenuItem, G as GlassPanel, aV as Select, aW as SelectTrigger, aX as SelectValue, aY as SelectContent, aZ as SelectItem } from "./index.C6yfkT5T.js";
import { bf as ue } from "./vendor.CJyRs4QS.js";
import { u as useCommunityPresence, F as FeedList, C as CommunityRightRail, L as LeaderboardSheet } from "./useCommunityPresence.DmKwurRg.js";
import { c as communityDocIsEmpty, p as parseCommunityDoc, C as CommunityRichContent, s as serializeCommunityDoc } from "./CommunityRichContent.KB4GKrPn.js";
import { I as Info, aR as Pencil, d6 as BookText, av as ScrollText, ag as ShieldCheck, aV as Shield, c3 as Crown, Q as LoaderCircle, u as ArrowLeft, U as Users, i as Settings, c as Check, N as ChevronDown, ah as LogOut, P as Plus, k as Sparkles, aq as BadgeCheck } from "./icons.C2gBBarQ.js";
import { O as OnlineDot } from "./HashtagsWidget.BwWeLwa9.js";
import { m as motion } from "./motion.DVGLRFCH.js";
import "./tanstack.DPr3OB19.js";
import "./supabase.WuRMX5Dg.js";
import "./radix.BiK9uYXL.js";
import "./hls.BlgtCWcq.js";
import "./editor.Dxw8dtyw.js";
import "./charts.Dr1fgDJ-.js";
import "./useFeed.Ba280OYv.js";
import "./PostComposer.Da2bF75r.js";
import "./useLeaderboard.BbUdnjoj.js";
import "./AnimatedCounter.DVb9HioJ.js";
import "./useAiringSchedule.CVdunhuV.js";
function CommunityInfoWidget({
  community,
  canManage,
  className
}) {
  var _a;
  const updateCommunity = useUpdateCommunity();
  const [editing, setEditing] = reactExports.useState(null);
  const save = async (field, payload) => {
    const value = serializeCommunityDoc({ content: payload.content, embeds: payload.embeds });
    try {
      await updateCommunity.mutateAsync({ id: community.id, [field]: value });
      ue.success("Saved");
      setEditing(null);
    } catch (err) {
      ue.error("Failed to save", { description: err instanceof Error ? err.message : void 0 });
      return false;
    }
  };
  const aboutEmpty = communityDocIsEmpty(community.about) && !((_a = community.description) == null ? void 0 : _a.trim());
  const rulesEmpty = communityDocIsEmpty(community.rules);
  if (aboutEmpty && rulesEmpty && !canManage) return null;
  const renderSection = (field, Icon, label, placeholder) => {
    var _a2;
    const doc = parseCommunityDoc(community[field]);
    const isEmpty = communityDocIsEmpty(community[field]);
    const showAboutFallback = field === "about" && isEmpty && !!((_a2 = community.description) == null ? void 0 : _a2.trim());
    if (isEmpty && !showAboutFallback && !canManage) return null;
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-1.5 flex items-center justify-between gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-3.5 w-3.5 text-white/60" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-bold uppercase tracking-widest text-white/50", children: label })
        ] }),
        canManage && editing !== field && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => setEditing(field),
            className: "flex items-center gap-1 rounded-full px-1.5 py-0.5 text-[10px] font-semibold text-white/60 transition-colors hover:bg-white/5 hover:text-white",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "h-3 w-3" }),
              " Edit"
            ]
          }
        )
      ] }),
      editing === field ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        RichCommentComposer,
        {
          allowEmbeds: true,
          showSpoiler: false,
          submitLabel: "Save",
          placeholder,
          initialContent: doc.content,
          initialEmbeds: doc.embeds,
          onCancel: () => setEditing(null),
          onSubmit: (payload) => save(field, payload)
        }
      ) : !isEmpty ? /* @__PURE__ */ jsxRuntimeExports.jsx(CommunityRichContent, { value: community[field], bodyClassName: "text-[13px] leading-relaxed" }) : showAboutFallback ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "whitespace-pre-wrap text-[13px] leading-relaxed text-white/75", children: community.description }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[13px] italic text-muted-foreground", children: placeholder })
    ] });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: cn(
        "community-card group flex w-full flex-col",
        className
      ),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute -left-12 -top-12 h-56 w-56 rounded-full bg-primary/10 blur-[90px] transition-colors group-hover:bg-primary/20" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 flex items-center gap-2 p-4 pb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-7 w-7 items-center justify-center rounded-full border border-white/10 bg-white/[0.04]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { className: "h-3.5 w-3.5 text-white/80" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] font-bold uppercase tracking-widest text-white/70", children: "Information" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 space-y-4 px-4 pb-4", children: [
          renderSection("about", BookText, "About", "Tell members what this community is about…"),
          renderSection("rules", ScrollText, "Rules", "Set the rules for this community…")
        ] })
      ]
    }
  );
}
const ROLE_META = {
  owner: { label: "Owner", icon: Crown, className: "text-amber-400 border-amber-400/25 bg-amber-400/10" },
  mod: { label: "Moderator", icon: Shield, className: "text-sky-400 border-sky-400/25 bg-sky-400/10" }
};
function CommunityStaffWidget({
  members,
  onlineUserIds,
  className
}) {
  const navigate = useNavigate();
  const staff = members.filter((m) => m.role === "owner" || m.role === "mod").sort((a, b) => a.role === "owner" ? -1 : b.role === "owner" ? 1 : 0);
  if (staff.length === 0) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: cn(
        "community-card community-card-hover group flex w-full flex-col",
        className
      ),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute -left-12 -top-12 h-56 w-56 rounded-full bg-amber-400/10 blur-[90px] transition-colors group-hover:bg-amber-400/20" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 flex items-center gap-2 p-4 pb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-7 w-7 items-center justify-center rounded-full border border-amber-400/20 bg-amber-400/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "h-3.5 w-3.5 text-amber-400" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] font-bold uppercase tracking-widest text-amber-400", children: "Community Team" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative z-10 space-y-1.5 px-3 pb-3", children: staff.map((m) => {
          var _a;
          const name = m.display_name || m.username || "Anonymous";
          const meta = ROLE_META[m.role] ?? ROLE_META.mod;
          const RoleIcon = meta.icon;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              onClick: () => m.username && navigate(`/user/${m.username}`),
              className: "flex w-full items-center gap-3 rounded-2xl border border-white/[0.03] bg-white/[0.015] px-2.5 py-2 text-left transition-colors hover:bg-white/[0.05]",
              title: name,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative shrink-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(Avatar, { className: "h-9 w-9 ring-2 ring-white/[0.06]", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarImage, { src: m.avatar_url || "", className: "object-cover" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarFallback, { className: "bg-zinc-800 text-xs font-bold text-zinc-400", children: (_a = name[0]) == null ? void 0 : _a.toUpperCase() })
                  ] }),
                  onlineUserIds.has(m.user_id) && /* @__PURE__ */ jsxRuntimeExports.jsx(OnlineDot, { size: "sm", className: "ring-background" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "min-w-0 flex-1 truncate text-sm font-semibold text-white", children: name }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "span",
                  {
                    className: cn(
                      "inline-flex shrink-0 items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider",
                      meta.className
                    ),
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(RoleIcon, { className: "h-3 w-3" }),
                      meta.label
                    ]
                  }
                )
              ]
            },
            m.user_id
          );
        }) })
      ]
    }
  );
}
const ROLE_ICON = { owner: Crown, mod: Shield };
function CommunitySpacePage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const isNative = useIsNativeApp();
  const isDesktopApp = useIsDesktopApp();
  const { user, isAdmin, isModerator } = useAuth();
  const { data: community, isLoading } = useCommunityBySlug(slug);
  const toggle = useToggleCommunityMembership();
  const [showSettings, setShowSettings] = reactExports.useState(false);
  const [leaderboardOpen, setLeaderboardOpen] = reactExports.useState(false);
  const canManage = !!(user && community) && (community.created_by === user.id || community.my_role === "owner" || community.my_role === "mod" || isAdmin || isModerator);
  const { data: members = [] } = useCommunityMembers(community == null ? void 0 : community.id);
  const { onlineUserIds, onlineUsers } = useCommunityPresence();
  const updateRole = useUpdateMemberRole();
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
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen overflow-x-hidden bg-background text-foreground", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(CommunitySidebar, {}),
    community.banner_url && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pointer-events-none fixed inset-0 -z-10 h-full w-full overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "img",
        {
          src: getProxiedImageUrl(community.banner_url),
          alt: "",
          className: "h-full w-full scale-125 object-cover opacity-[0.15] blur-[100px] saturate-[2.5] md:opacity-[0.25]"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-background/40 via-background/80 to-background/95" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: cn("relative z-10 w-full", isDesktopApp ? "pl-24 lg:pl-28" : isNative ? "pl-0" : "pl-0 md:pl-24 lg:pl-28"), children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-screen-2xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "group relative h-[270px] w-full select-none overflow-hidden md:h-[390px]", children: [
        community.banner_url ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: getProxiedImageUrl(community.banner_url),
            alt: `${community.name} banner`,
            className: "absolute inset-0 h-full w-full object-cover object-center"
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-background" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-background via-background/35 to-transparent" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent opacity-90" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute left-6 top-6 z-20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: () => navigate("/community"),
            className: "group/back flex items-center gap-2 rounded-full border border-white/20 bg-black/40 px-4 py-2 text-xs font-bold text-white/90 shadow-xl backdrop-blur-xl transition-colors hover:bg-black/60 hover:text-white",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4 transition-transform group-hover/back:-translate-x-1" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Community" })
            ]
          }
        ) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 pb-10 md:px-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { y: 20, opacity: 0 },
            animate: { y: 0, opacity: 1 },
            className: "relative z-20 -mt-16 mb-7 md:-mt-20",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "community-card p-4 md:p-5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end justify-between gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-24 w-24 shrink-0 overflow-hidden rounded-2xl border-4 border-background bg-white/[0.04] shadow-[0_0_40px_rgba(0,0,0,0.5)] md:h-28 md:w-28", children: community.icon_url ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: getProxiedImageUrl(community.icon_url), alt: "", className: "h-full w-full object-cover object-top" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/20 to-secondary/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-9 w-9 text-muted-foreground" }) }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center justify-end gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      variant: "secondary",
                      size: "sm",
                      onClick: () => navigate(`/community/c/${community.slug}/information`),
                      className: "gap-1.5 rounded-full border border-white/10 bg-white/[0.06] text-white backdrop-blur-md hover:bg-white/[0.12]",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { className: "h-4 w-4" }),
                        " ",
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: "Info" })
                      ]
                    }
                  ),
                  canManage && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Button,
                      {
                        variant: "secondary",
                        size: "sm",
                        onClick: () => navigate(`/community/c/${community.slug}/settings`),
                        className: "gap-1.5 rounded-full border border-white/10 bg-white/10 text-white backdrop-blur-md hover:bg-white/20",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Settings, { className: "h-4 w-4" }),
                          " Settings"
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Button,
                      {
                        variant: "secondary",
                        size: "sm",
                        onClick: () => setShowSettings((v) => !v),
                        className: "gap-1.5 rounded-full border border-white/10 bg-white/10 text-white backdrop-blur-md hover:bg-white/20",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Crown, { className: "h-4 w-4" }),
                          " Manage"
                        ]
                      }
                    )
                  ] }),
                  user && (community.is_member ? /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenu, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Button,
                      {
                        size: "sm",
                        disabled: toggle.isPending,
                        className: "gap-1.5 rounded-full bg-white/10 font-bold text-foreground hover:bg-white/15",
                        children: [
                          toggle.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-4 w-4" }),
                          "Joined",
                          /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "h-3.5 w-3.5 opacity-70" })
                        ]
                      }
                    ) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuContent, { align: "end", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      DropdownMenuItem,
                      {
                        className: "text-rose-400 focus:text-rose-400",
                        onClick: () => toggle.mutate({ communityId: community.id, isMember: true }),
                        disabled: toggle.isPending,
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "mr-2 h-4 w-4" }),
                          " Leave community"
                        ]
                      }
                    ) })
                  ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      size: "sm",
                      disabled: toggle.isPending,
                      onClick: () => toggle.mutate({ communityId: community.id, isMember: false }),
                      className: "gap-1.5 rounded-full font-bold",
                      children: [
                        toggle.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
                        " Join"
                      ]
                    }
                  ))
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex flex-col gap-3 md:flex-row md:items-end md:justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-2 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-primary/85", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-3.5 w-3.5" }),
                    " Community space"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "flex items-center gap-2 font-display text-3xl font-black tracking-tight drop-shadow-xl md:text-4xl", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-gradient-to-br from-white via-white to-white/60 bg-clip-text text-transparent", children: community.name }),
                    community.is_verified && /* @__PURE__ */ jsxRuntimeExports.jsx(BadgeCheck, { className: "h-6 w-6 shrink-0 text-sky-400 md:h-7 md:w-7", "aria-label": "Verified community" })
                  ] }),
                  community.description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1.5 max-w-2xl text-sm leading-relaxed text-muted-foreground", children: community.description })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 backdrop-blur-md", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-3.5 w-3.5 text-primary" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-bold tabular-nums text-white", children: community.member_count }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: community.member_count === 1 ? "member" : "members" })
                ] })
              ] })
            ] })
          }
        ),
        canManage && showSettings && /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassPanel, { className: "mb-5 p-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mb-3 font-display font-bold tracking-tight", children: "Members & ranks" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            members.map((m) => {
              var _a;
              const RoleIcon = ROLE_ICON[m.role];
              return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 rounded-xl border border-white/[0.03] bg-white/[0.015] px-3 py-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Avatar, { className: "h-8 w-8", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarImage, { src: m.avatar_url || void 0 }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarFallback, { children: (_a = (m.display_name || m.username || "U")[0]) == null ? void 0 : _a.toUpperCase() })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "min-w-0 flex-1 truncate text-sm font-medium", children: m.display_name || m.username || "Anonymous" }),
                RoleIcon && /* @__PURE__ */ jsxRuntimeExports.jsx(RoleIcon, { className: "h-3.5 w-3.5 text-amber" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Select,
                  {
                    value: m.role,
                    onValueChange: (role) => updateRole.mutate({ communityId: community.id, userId: m.user_id, role }),
                    disabled: m.user_id === community.created_by,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "h-8 w-28 rounded-lg text-xs", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "member", children: "Member" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "mod", children: "Mod" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "owner", children: "Owner" })
                      ] })
                    ]
                  }
                )
              ] }, m.user_id);
            }),
            members.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No members yet." })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-8 xl:gap-10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full min-w-0 flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-5 space-y-5 xl:hidden", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CommunityInfoWidget, { community, canManage }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(CommunityStaffWidget, { members, onlineUserIds })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(FeedList, { tab: "foryou", communityId: community.id, showComposer: community.is_member, layout: "masonry" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            CommunityRightRail,
            {
              members,
              onlineUserIds,
              onlineUsers,
              onOpenLeaderboard: () => setLeaderboardOpen(true),
              header: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CommunityInfoWidget, { community, canManage }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(CommunityStaffWidget, { members, onlineUserIds })
              ] })
            }
          )
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(LeaderboardSheet, { open: leaderboardOpen, onOpenChange: setLeaderboardOpen }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(MobileNav, {})
  ] });
}
export {
  CommunitySpacePage as default
};
