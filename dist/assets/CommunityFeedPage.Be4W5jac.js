import { r as reactExports, e as useNavigate, j as jsxRuntimeExports, l as useSearchParams, L as Link$1 } from "./react-vendor.CAo4XUiA.js";
import { C as CommunitySidebar } from "./CommunitySidebar.DBOREraZ.js";
import { M as MobileNav } from "./MobileNav.ABHzkhTQ.js";
import { a2 as supabase, u as useAuth, dW as useCommunities, fS as useToggleCommunityMembership, l as getProxiedImageUrl, j as cn, fT as useCreateCommunity, ae as Dialog, af as DialogContent, ag as DialogHeader, ah as DialogTitle, ai as DialogDescription, az as Input, B as Button, e3 as uploadUserMedia, a8 as Avatar, a9 as AvatarImage, aa as AvatarFallback, fg as useBatchUserBadges, aQ as UserBadges, D as useIsNativeApp, K as useIsDesktopApp } from "./index.C6yfkT5T.js";
import { u as useQueryClient, a as useQuery, b as useMutation } from "./tanstack.DPr3OB19.js";
import { F as FeedList, u as useCommunityPresence, C as CommunityRightRail, L as LeaderboardSheet } from "./useCommunityPresence.DmKwurRg.js";
import { bf as ue } from "./vendor.CJyRs4QS.js";
import { U as Users, bE as ArrowUpRight, aq as BadgeCheck, c as Check, P as Plus, X, ax as ImagePlus, bZ as Camera, Q as LoaderCircle, bF as Calendar, b7 as Type, aD as Clock, d5 as MapPin, bb as Link, a7 as Image, f as CalendarDays, J as Trash2, j as ExternalLink, S as Search, g as User, az as Music2, aA as Layers, y as MessageSquare, bC as Trophy, n as Radio, bD as Hash, k as Sparkles } from "./icons.C2gBBarQ.js";
import { m as motion, A as AnimatePresence } from "./motion.DVGLRFCH.js";
import "./supabase.WuRMX5Dg.js";
import "./radix.BiK9uYXL.js";
import "./hls.BlgtCWcq.js";
import "./editor.Dxw8dtyw.js";
import "./charts.Dr1fgDJ-.js";
import "./useFeed.Ba280OYv.js";
import "./PostComposer.Da2bF75r.js";
import "./useLeaderboard.BbUdnjoj.js";
import "./HashtagsWidget.BwWeLwa9.js";
import "./useAiringSchedule.CVdunhuV.js";
import "./AnimatedCounter.DVb9HioJ.js";
function useFeedRealtime() {
  const queryClient = useQueryClient();
  reactExports.useEffect(() => {
    const invalidateFeed = () => queryClient.invalidateQueries({ queryKey: ["feed"] });
    const channel = supabase.channel("community-feed").on("postgres_changes", { event: "*", schema: "public", table: "forum_posts" }, invalidateFeed).on("postgres_changes", { event: "*", schema: "public", table: "forum_votes" }, invalidateFeed).on("postgres_changes", { event: "*", schema: "public", table: "post_reposts" }, invalidateFeed).on("postgres_changes", { event: "*", schema: "public", table: "post_poll_votes" }, () => {
      queryClient.invalidateQueries({ queryKey: ["feed"] });
      queryClient.invalidateQueries({ queryKey: ["post-poll"] });
    }).subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient]);
}
function CommunitiesShowcase({ onOpen }) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { data: communities = [], isLoading } = useCommunities();
  const toggle = useToggleCommunityMembership();
  if (!isLoading && communities.length === 0) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 flex items-center gap-2 px-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-4 w-4 text-zinc-400" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] font-bold uppercase tracking-widest text-zinc-400", children: "Discover Communities" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-4 overflow-x-auto pb-4 pt-1 no-scrollbar snap-x scroll-smooth", children: isLoading ? [...Array(5)].map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "h-[224px] w-[220px] flex-shrink-0 animate-pulse snap-start rounded-[24px] border border-white/[0.05] bg-white/[0.02] sm:w-[248px]"
      },
      i
    )) : communities.map((c, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 12 },
        animate: { opacity: 1, y: 0 },
        transition: { delay: Math.min(i * 0.03, 0.2) },
        onClick: () => onOpen ? onOpen(c.id) : navigate(`/community/c/${c.slug}`),
        role: "link",
        tabIndex: 0,
        onKeyDown: (event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            onOpen ? onOpen(c.id) : navigate(`/community/c/${c.slug}`);
          }
        },
        className: "community-card community-card-hover group relative flex h-[224px] w-[220px] flex-shrink-0 cursor-pointer snap-start flex-col sm:w-[248px]",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 bg-muted", children: [
            c.banner_url || c.icon_url ? /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: getProxiedImageUrl(c.banner_url || c.icon_url),
                alt: c.name,
                className: "h-full w-full object-cover opacity-75 transition-opacity duration-300 ease-out group-hover:opacity-100"
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full w-full bg-gradient-to-br from-indigo-500/20 to-purple-500/20" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 flex h-full flex-col justify-end p-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-auto flex items-center justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-black/30 text-white/70 backdrop-blur-md transition-colors group-hover:border-primary/40 group-hover:text-white", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { className: "h-4 w-4" }) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end justify-between gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "flex items-center gap-1 text-base font-bold leading-tight text-zinc-100 drop-shadow-md transition-colors group-hover:text-white", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: c.name }),
                  c.is_verified && /* @__PURE__ */ jsxRuntimeExports.jsx(BadgeCheck, { className: "h-3.5 w-3.5 shrink-0 text-sky-400", "aria-label": "Verified community" })
                ] }),
                c.description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 line-clamp-2 text-xs leading-relaxed text-zinc-300/85", children: c.description }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 flex items-center gap-1.5 text-[10px] font-medium text-zinc-300 drop-shadow-md", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                    (c.member_count || 0).toLocaleString(),
                    " members"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-1 w-1 shrink-0 rounded-full bg-zinc-400" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex shrink-0 items-center gap-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "relative flex h-1.5 w-1.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" })
                    ] }),
                    Math.floor((c.member_count || 10) * 0.1)
                  ] })
                ] })
              ] }),
              user && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: (e) => {
                    e.stopPropagation();
                    toggle.mutate({ communityId: c.id, isMember: c.is_member });
                  },
                  className: cn(
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-[background-color,border-color,color,transform] duration-200 active:scale-95",
                    c.is_member ? "bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.3)]" : "border border-white/[0.15] bg-black/40 text-white backdrop-blur-md hover:bg-white/10"
                  ),
                  children: c.is_member ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-4 w-4 stroke-[2.5px]" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" })
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute inset-0 rounded-[24px] ring-1 ring-inset ring-white/10" })
        ]
      },
      c.id
    )) })
  ] });
}
function slugify(s) {
  return s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 40);
}
function CreateCommunityDialog({ open, onOpenChange }) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const createCommunity = useCreateCommunity();
  const iconRef = reactExports.useRef(null);
  const bannerRef = reactExports.useRef(null);
  const [name, setName] = reactExports.useState("");
  const [slug, setSlug] = reactExports.useState("");
  const [slugEdited, setSlugEdited] = reactExports.useState(false);
  const [description, setDescription] = reactExports.useState("");
  const [icon, setIcon] = reactExports.useState(null);
  const [banner, setBanner] = reactExports.useState(null);
  const [submitting, setSubmitting] = reactExports.useState(false);
  const setNameAndSlug = (v) => {
    setName(v);
    if (!slugEdited) setSlug(slugify(v));
  };
  const pickImage = (e, set) => {
    var _a;
    const file = (_a = e.target.files) == null ? void 0 : _a[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) return ue.error("Image must be under 5MB");
    const reader = new FileReader();
    reader.onloadend = () => set({ file, preview: reader.result });
    reader.readAsDataURL(file);
    e.target.value = "";
  };
  const upload = async (file, _kind) => {
    const { url } = await uploadUserMedia(file, user.id, "forum_image");
    return url;
  };
  const submit = async () => {
    if (!name.trim() || !slug.trim()) return ue.error("Name and slug are required");
    setSubmitting(true);
    try {
      const icon_url = icon ? await upload(icon.file, "icon") : void 0;
      const banner_url = banner ? await upload(banner.file, "banner") : void 0;
      const created = await createCommunity.mutateAsync({ name: name.trim(), slug: slug.trim(), description: description.trim() || void 0, icon_url, banner_url });
      ue.success("Community created");
      onOpenChange(false);
      setName("");
      setSlug("");
      setSlugEdited(false);
      setDescription("");
      setIcon(null);
      setBanner(null);
      navigate(`/community/c/${created.slug}`);
    } catch (err) {
      ue.error("Failed to create community", { description: err instanceof Error ? err.message : void 0 });
    } finally {
      setSubmitting(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-lg p-0 overflow-hidden sm:rounded-2xl border-white/[0.08] bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-6 pt-6 pb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "text-xl", children: "Create a Community" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { children: "Give your new space a name, an icon, and a purpose." })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative px-6 mb-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          role: "button",
          tabIndex: 0,
          onClick: () => {
            var _a;
            return (_a = bannerRef.current) == null ? void 0 : _a.click();
          },
          className: "group relative flex h-32 w-full cursor-pointer items-center justify-center overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] transition-colors hover:bg-white/[0.04]",
          children: [
            banner ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: banner.preview, alt: "Banner preview", className: "h-full w-full object-cover" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: (e) => {
                    e.stopPropagation();
                    setBanner(null);
                  },
                  className: "absolute right-2 top-2 rounded-full bg-black/60 p-1.5 text-white backdrop-blur-md transition-transform hover:scale-110 hover:bg-rose-500/80",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" })
                }
              )
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex flex-col items-center gap-1.5 text-sm font-medium text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ImagePlus, { className: "h-6 w-6 opacity-50" }),
              "Add Banner"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 backdrop-blur-[2px] transition-opacity group-hover:opacity-100", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Camera, { className: "h-6 w-6 text-white" }) })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          role: "button",
          tabIndex: 0,
          onClick: () => {
            var _a;
            return (_a = iconRef.current) == null ? void 0 : _a.click();
          },
          className: "group absolute -bottom-8 left-10 z-10 flex h-[72px] w-[72px] cursor-pointer items-center justify-center overflow-hidden rounded-2xl border-4 border-background bg-muted/80 shadow-sm transition-transform hover:scale-105",
          children: [
            icon ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: icon.preview, alt: "Icon preview", className: "h-full w-full object-cover" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: (e) => {
                    e.stopPropagation();
                    setIcon(null);
                  },
                  className: "absolute right-1 top-1 rounded-full bg-black/60 p-1 text-white backdrop-blur-md transition-colors hover:bg-rose-500/80",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-3 w-3" })
                }
              )
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Camera, { className: "h-6 w-6 text-muted-foreground" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Camera, { className: "h-5 w-5 text-white" }) })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5 px-6 pb-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "text-[13px] font-semibold text-foreground/90", children: [
          "Community Name ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-rose-500", children: "*" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            value: name,
            onChange: (e) => setNameAndSlug(e.target.value),
            placeholder: "e.g. Anime Enthusiasts",
            maxLength: 60,
            className: "rounded-xl border-white/10 bg-white/[0.02] px-3.5 focus-visible:border-primary/50 focus-visible:bg-white/[0.04]"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "text-[13px] font-semibold text-foreground/90", children: [
          "URL Slug ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-rose-500", children: "*" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center overflow-hidden rounded-xl border border-white/10 bg-white/[0.02] px-3.5 transition-colors focus-within:border-primary/50 focus-within:bg-white/[0.04]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "select-none text-sm text-muted-foreground/70", children: "/community/c/" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              value: slug,
              onChange: (e) => {
                setSlug(slugify(e.target.value));
                setSlugEdited(true);
              },
              placeholder: "slug-name",
              className: "flex-1 bg-transparent py-2.5 pl-1 text-sm text-foreground outline-none placeholder:text-muted-foreground/50"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "text-[13px] font-semibold text-foreground/90 flex justify-between", children: [
          "Description",
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-normal text-muted-foreground", children: [
            description.length,
            "/300"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "textarea",
          {
            value: description,
            onChange: (e) => setDescription(e.target.value),
            placeholder: "What is this community about?",
            rows: 3,
            maxLength: 300,
            className: "w-full resize-none rounded-xl border border-white/10 bg-white/[0.02] px-3.5 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/50 focus:border-primary/50 focus:bg-white/[0.04]"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-end gap-3 border-t border-white/[0.05] bg-white/[0.01] p-4 px-6 mt-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", className: "rounded-full px-5 hover:bg-white/5", onClick: () => onOpenChange(false), children: "Cancel" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          className: "rounded-full px-6 font-bold shadow-md transition-transform active:scale-95",
          disabled: submitting || !name.trim() || !slug.trim(),
          onClick: submit,
          children: [
            submitting ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin mr-2" }) : null,
            submitting ? "Creating..." : "Create Community"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("input", { ref: iconRef, type: "file", accept: "image/*", className: "hidden", onChange: (e) => pickImage(e, setIcon) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("input", { ref: bannerRef, type: "file", accept: "image/*", className: "hidden", onChange: (e) => pickImage(e, setBanner) })
  ] }) });
}
const TABS = [
  { value: "foryou", label: "For you" },
  { value: "following", label: "Following" },
  { value: "news", label: "News" },
  { value: "schedule", label: "Schedule" }
];
function FeedTabs({
  value,
  onChange
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative flex w-full items-stretch border-b border-white/[0.06] pt-2", children: TABS.map((t) => {
    const active = value === t.value;
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        onClick: () => onChange(t.value),
        className: cn(
          "group relative flex flex-1 items-center justify-center pb-3.5 pt-2 outline-none transition-colors duration-200",
          active ? "text-primary" : "text-muted-foreground hover:text-foreground"
        ),
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "relative z-10 rounded-full px-4 py-1.5 text-sm font-semibold tracking-wide transition-all group-active:scale-95", children: [
            active && /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                layoutId: "activeTabPill",
                className: "absolute inset-0 rounded-full bg-primary/10 shadow-[inset_0_1px_0_hsl(var(--primary)/0.2)]",
                initial: false,
                transition: { type: "spring", bounce: 0.2, duration: 0.5 }
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "relative z-20", children: t.label })
          ] }),
          active && /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              layoutId: "activeTabLine",
              className: "absolute -bottom-px left-0 right-0 z-20 flex justify-center",
              initial: false,
              transition: { type: "spring", bounce: 0.2, duration: 0.5 },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-[2px] w-[80%] max-w-[80px] rounded-t-full bg-gradient-to-r from-transparent via-primary to-transparent shadow-[0_-2px_12px_hsl(var(--primary)/0.6)]" })
            }
          )
        ]
      },
      t.value
    );
  }) });
}
function useCommunityEvents() {
  return useQuery({
    queryKey: ["community-events"],
    staleTime: 60 * 1e3,
    queryFn: async () => {
      const db = supabase;
      const since = new Date(Date.now() - 24 * 60 * 60 * 1e3).toISOString();
      try {
        const { data, error } = await db.from("community_events").select("*").gte("starts_at", since).order("starts_at", { ascending: true }).limit(100);
        if (error) throw error;
        return data || [];
      } catch {
        return [];
      }
    }
  });
}
function useCreateCommunityEvent() {
  const { user } = useAuth();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (input) => {
      if (!user) throw new Error("Not authenticated");
      const db = supabase;
      const { data, error } = await db.from("community_events").insert({ ...input, created_by: user.id }).select("*").single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["community-events"] })
  });
}
function useDeleteCommunityEvent() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      const db = supabase;
      const { error } = await db.from("community_events").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["community-events"] })
  });
}
const EMPTY_FORM = {
  title: "",
  description: "",
  starts_at: "",
  ends_at: "",
  location: "",
  link: "",
  image_url: ""
};
const inputCls = "w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none transition-all focus:border-primary/50 focus:bg-black/40 focus:ring-1 focus:ring-primary/20";
function fmtDate(iso) {
  try {
    const d = new Date(iso);
    return {
      month: d.toLocaleDateString(void 0, { month: "short" }).toUpperCase(),
      day: d.getDate(),
      time: d.toLocaleTimeString(void 0, { hour: "numeric", minute: "2-digit" }),
      weekday: d.toLocaleDateString(void 0, { weekday: "short" })
    };
  } catch {
    return { month: "---", day: 0, time: "--:--", weekday: "---" };
  }
}
function CommunityEventsSection() {
  const { isAdmin, isModerator } = useAuth();
  const isStaff = isAdmin || isModerator;
  const { data: events = [], isLoading, refetch } = useCommunityEvents();
  const createEvent = useCreateCommunityEvent();
  const deleteEvent = useDeleteCommunityEvent();
  const [showForm, setShowForm] = reactExports.useState(false);
  const [form, setForm] = reactExports.useState(EMPTY_FORM);
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  const submit = async () => {
    var _a, _b, _c, _d, _e;
    if (!((_a = form.title) == null ? void 0 : _a.trim()) || !form.starts_at) {
      ue.error("Title and start time are required.");
      return;
    }
    try {
      await createEvent.mutateAsync({
        title: form.title.trim(),
        description: ((_b = form.description) == null ? void 0 : _b.trim()) || null,
        starts_at: new Date(form.starts_at).toISOString(),
        ends_at: form.ends_at ? new Date(form.ends_at).toISOString() : null,
        location: ((_c = form.location) == null ? void 0 : _c.trim()) || null,
        link: ((_d = form.link) == null ? void 0 : _d.trim()) || null,
        image_url: ((_e = form.image_url) == null ? void 0 : _e.trim()) || null
      });
      ue.success("Event successfully posted.");
      setForm(EMPTY_FORM);
      setShowForm(false);
      refetch == null ? void 0 : refetch();
    } catch (e) {
      ue.error((e == null ? void 0 : e.message) || "Failed to post event.");
    }
  };
  const remove = async (id) => {
    try {
      await deleteEvent.mutateAsync(id);
      ue.success("Event removed.");
      refetch == null ? void 0 : refetch();
    } catch (e) {
      ue.error((e == null ? void 0 : e.message) || "Failed to remove event.");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "group relative overflow-hidden rounded-[24px] border border-white/[0.08] bg-background/60 backdrop-blur-xl shadow-xl transition-all duration-300 hover:border-white/[0.12]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute -left-12 -top-12 h-56 w-56 rounded-full bg-primary/10 blur-[90px] transition-all duration-700 group-hover:bg-primary/20" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute -bottom-16 -right-16 h-56 w-56 rounded-full bg-fuchsia-500/10 blur-[90px] transition-all duration-700 group-hover:bg-fuchsia-500/20" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 flex flex-col p-5 sm:p-6 gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-10 w-10 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary shadow-inner", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-5 w-5" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-base font-bold tracking-tight text-foreground", children: "Event Schedule" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[13px] text-muted-foreground/80", children: "Streams, watch-alongs, & releases" })
          ] })
        ] }),
        isStaff && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            onClick: () => setShowForm((v) => !v),
            className: cn(
              "h-9 gap-2 rounded-full px-4 text-sm font-bold transition-all",
              showForm ? "bg-white/10 text-white hover:bg-white/20" : "bg-primary/15 text-primary hover:bg-primary/25 border border-primary/20"
            ),
            children: [
              showForm ? /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
              showForm ? "Cancel" : "Add Event"
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: isStaff && showForm && /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, height: 0, scale: 0.98 },
          animate: { opacity: 1, height: "auto", scale: 1 },
          exit: { opacity: 0, height: 0, scale: 0.98 },
          transition: { duration: 0.25, ease: "easeOut" },
          className: "overflow-hidden",
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5 shadow-inner", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative group", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Type, { className: "absolute left-3.5 top-3.5 h-4 w-4 text-muted-foreground/60 transition-colors group-focus-within:text-primary" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: cn(inputCls, "pl-10"), placeholder: "Event Title *", value: form.title, maxLength: 140, onChange: (e) => set("title", e.target.value) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { className: cn(inputCls, "min-h-[90px] resize-y"), placeholder: "Event Description (optional)", value: form.description ?? "", onChange: (e) => set("description", e.target.value) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 gap-4 sm:grid-cols-2 p-4 rounded-xl bg-black/20 border border-white/5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex flex-col gap-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] font-bold uppercase tracking-widest text-primary/80 ml-1", children: "Start Time *" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative group", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/60 transition-colors group-focus-within:text-primary z-10 pointer-events-none" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "input",
                    {
                      type: "datetime-local",
                      className: cn(inputCls, "pl-10 w-full [color-scheme:dark] bg-white/[0.02] border-white/10 hover:bg-white/[0.04] cursor-pointer"),
                      value: form.starts_at,
                      onChange: (e) => set("starts_at", e.target.value)
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex flex-col gap-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] font-bold uppercase tracking-widest text-muted-foreground ml-1", children: "End Time" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative group", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/60 transition-colors group-focus-within:text-primary z-10 pointer-events-none" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "input",
                    {
                      type: "datetime-local",
                      className: cn(inputCls, "pl-10 w-full [color-scheme:dark] bg-white/[0.02] border-white/10 hover:bg-white/[0.04] cursor-pointer"),
                      value: form.ends_at ?? "",
                      onChange: (e) => set("ends_at", e.target.value)
                    }
                  )
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 gap-3 sm:grid-cols-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative group", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/60 transition-colors group-focus-within:text-primary" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: cn(inputCls, "pl-10"), placeholder: "Location (e.g. Discord)", value: form.location ?? "", onChange: (e) => set("location", e.target.value) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative group", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { className: "absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/60 transition-colors group-focus-within:text-primary" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: cn(inputCls, "pl-10"), placeholder: "Link URL", value: form.link ?? "", onChange: (e) => set("link", e.target.value) })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative group", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { className: "absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/60 transition-colors group-focus-within:text-primary" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: cn(inputCls, "pl-10"), placeholder: "Cover Image URL", value: form.image_url ?? "", onChange: (e) => set("image_url", e.target.value) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-end pt-3 border-t border-white/5 mt-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                onClick: submit,
                disabled: createEvent.isPending || !form.title || !form.starts_at,
                className: "h-10 gap-2 rounded-full px-6 text-sm font-bold shadow-lg active:scale-95 transition-transform",
                children: createEvent.isPending ? "Posting…" : "Post Event"
              }
            ) })
          ] })
        }
      ) }),
      isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-3", children: [...Array(3)].map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-28 animate-pulse rounded-2xl bg-white/[0.03] border border-white/[0.05]" }, i)) }) : events.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 bg-white/[0.015] px-6 py-16 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-16 w-16 items-center justify-center rounded-full bg-white/[0.03] mb-4 ring-1 ring-white/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarDays, { className: "h-8 w-8 text-muted-foreground/40" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-[17px] font-semibold text-foreground", children: "No upcoming events" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 max-w-sm text-sm text-muted-foreground", children: isStaff ? "Schedule your first event using the button above." : "Check back soon — the community team posts events here." })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-3.5", children: events.map((ev) => {
        const d = fmtDate(ev.starts_at);
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "group/ev relative flex flex-col sm:flex-row gap-4 overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.015] p-4 transition-all duration-300 hover:border-white/[0.15] hover:bg-white/[0.03] hover:shadow-[0_8px_24px_-12px_rgba(0,0,0,0.4)]",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex h-[76px] w-[72px] shrink-0 flex-col overflow-hidden rounded-2xl border border-white/10 bg-black/40 shadow-sm", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-7 w-full items-center justify-center bg-primary/20 text-[11px] font-bold uppercase tracking-widest text-primary", children: d.month }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-1 items-center justify-center bg-gradient-to-b from-white/5 to-transparent text-[28px] font-black tabular-nums tracking-tighter text-white", children: d.day })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-w-0 flex-1 flex-col justify-center py-0.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg font-bold tracking-tight text-foreground leading-snug", children: ev.title }),
                  isStaff && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      onClick: () => remove(ev.id),
                      className: "shrink-0 rounded-full p-2 text-muted-foreground/50 opacity-0 transition-all hover:bg-rose-500/15 hover:text-rose-400 group-hover/ev:opacity-100 mt-[-4px] mr-[-4px]",
                      title: "Delete Event",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" })
                    }
                  )
                ] }),
                ev.description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1.5 line-clamp-2 text-sm text-foreground/70 leading-relaxed", children: ev.description }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3.5 flex flex-wrap items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5 rounded-md border border-white/5 bg-white/[0.04] px-2.5 py-1 text-xs font-medium text-muted-foreground", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-3.5 w-3.5 text-primary/80" }),
                    d.weekday,
                    ", ",
                    d.time
                  ] }),
                  ev.location && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5 rounded-md border border-white/5 bg-white/[0.04] px-2.5 py-1 text-xs font-medium text-muted-foreground", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-3.5 w-3.5 text-primary/80" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate max-w-[140px]", children: ev.location })
                  ] }),
                  ev.link && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "a",
                    {
                      href: ev.link,
                      target: "_blank",
                      rel: "noopener noreferrer",
                      className: "inline-flex items-center gap-1.5 rounded-md border border-primary/20 bg-primary/10 px-2.5 py-1 text-xs font-bold text-primary transition-colors hover:bg-primary/20 hover:text-primary-foreground",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "h-3.5 w-3.5" }),
                        "View Details"
                      ]
                    }
                  )
                ] })
              ] }),
              ev.image_url && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden h-[100px] w-[140px] shrink-0 overflow-hidden rounded-xl border border-white/10 sm:block shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: ev.image_url, alt: ev.title, className: "h-full w-full object-cover transition-transform duration-500 group-hover/ev:scale-105", loading: "lazy" }) })
            ]
          },
          ev.id
        );
      }) })
    ] })
  ] });
}
const EMPTY = { users: [], playlists: [], tierlists: [], posts: [] };
function sanitize(term) {
  return term.replace(/[,()%*\\]/g, " ").trim();
}
function useCommunitySearch(q, limit = 5) {
  const term = sanitize(q);
  return useQuery({
    queryKey: ["community-search", term, limit],
    queryFn: async () => {
      if (term.length < 2) return EMPTY;
      const like = `%${term}%`;
      const users = (async () => {
        try {
          const { data } = await supabase.from("profiles").select("user_id, username, display_name, avatar_url, banner_url").eq("is_public", true).or(`username.ilike.${like},display_name.ilike.${like}`).limit(limit);
          return data || [];
        } catch {
          return [];
        }
      })();
      const playlists = (async () => {
        try {
          const { data } = await supabase.from("playlists").select("id, name, cover_image, items_count").eq("is_public", true).ilike("name", like).limit(limit);
          return data || [];
        } catch {
          return [];
        }
      })();
      const tierlists = (async () => {
        try {
          const { data, error } = await supabase.from("tier_lists").select("id, title, share_code").eq("is_public", true).ilike("title", like).limit(limit);
          if (error) throw error;
          return data || [];
        } catch {
          try {
            const { data } = await supabase.from("tier_lists").select("id, name, share_code").eq("is_public", true).ilike("name", like).limit(limit);
            return (data || []).map((t2) => ({ id: t2.id, title: t2.name, share_code: t2.share_code }));
          } catch {
            return [];
          }
        }
      })();
      const posts = (async () => {
        try {
          const { data } = await supabase.from("forum_posts").select("id, title, content").eq("is_approved", true).or(`title.ilike.${like},content.ilike.${like}`).order("created_at", { ascending: false }).limit(limit);
          return data || [];
        } catch {
          return [];
        }
      })();
      const [u, p, t, po] = await Promise.all([users, playlists, tierlists, posts]);
      return { users: u, playlists: p, tierlists: t, posts: po };
    },
    enabled: term.length >= 2,
    staleTime: 3e4
  });
}
function useDebounced(value, delay = 250) {
  const [debounced, setDebounced] = reactExports.useState(value);
  reactExports.useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
}
function Section({ icon: Icon, label, children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "py-1.5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 px-3 pb-1 pt-1 text-[10px] font-bold uppercase tracking-widest text-zinc-500", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-3 w-3" }),
      " ",
      label
    ] }),
    children
  ] });
}
function CommunitySearch({
  className,
  value,
  onValueChange,
  suppressDropdown = false,
  expandOnFocus = false
}) {
  const navigate = useNavigate();
  const controlled = value !== void 0;
  const [internalQuery, setInternalQuery] = reactExports.useState("");
  const query = controlled ? value : internalQuery;
  const setQuery = (v) => {
    if (controlled) onValueChange == null ? void 0 : onValueChange(v);
    else setInternalQuery(v);
  };
  const [open, setOpen] = reactExports.useState(false);
  const [focused, setFocused] = reactExports.useState(false);
  const containerRef = reactExports.useRef(null);
  const term = useDebounced(query, 250);
  const { data, isFetching } = useCommunitySearch(suppressDropdown ? "" : term);
  reactExports.useEffect(() => {
    const onDown = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);
  const go = (to) => {
    navigate(to);
    setOpen(false);
    setQuery("");
  };
  const r = data;
  const hasResults = !!r && (r.users.length || r.playlists.length || r.tierlists.length || r.posts.length);
  const showPanel = !suppressDropdown && open && query.trim().length >= 2;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      ref: containerRef,
      className: cn(
        "relative transition-all duration-300",
        expandOnFocus && (focused || query ? "w-full sm:w-80 xl:w-96" : "w-full sm:w-56 xl:w-64"),
        className
      ),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "group relative flex h-10 items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] pl-4 pr-2 backdrop-blur-xl transition-all focus-within:border-white/25 focus-within:bg-white/[0.06]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "h-4 w-4 shrink-0 text-muted-foreground transition-colors group-focus-within:text-white" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "text",
              value: query,
              onChange: (e) => setQuery(e.target.value),
              onFocus: () => {
                setOpen(true);
                setFocused(true);
              },
              onBlur: () => setFocused(false),
              placeholder: "Search community…",
              className: "w-full bg-transparent text-sm text-white placeholder:text-muted-foreground/70 focus:outline-none"
            }
          ),
          query && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => {
                setQuery("");
                setOpen(false);
              },
              className: "flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-white/10 hover:text-white",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-3.5 w-3.5" })
            }
          )
        ] }),
        showPanel && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute left-0 right-0 top-12 z-50 max-h-[70vh] overflow-y-auto rounded-2xl border border-white/[0.08] bg-[#08090b]/95 p-1 shadow-[0_20px_60px_rgba(0,0,0,0.5)] backdrop-blur-2xl animate-in fade-in slide-in-from-top-1", children: isFetching && !hasResults ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-2 px-3 py-8 text-sm text-zinc-500", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }),
          " Searching…"
        ] }) : !hasResults ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-3 py-8 text-center text-sm text-zinc-500", children: [
          "No results for “",
          query.trim(),
          "”."
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          r.users.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { icon: User, label: "Users", children: r.users.map((u) => {
            var _a;
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: () => u.username && go(`/user/${u.username}`),
                className: "flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left transition-colors hover:bg-white/[0.05]",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(Avatar, { className: "h-8 w-8 shrink-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarImage, { src: u.avatar_url || "", className: "object-cover" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarFallback, { className: "bg-zinc-800 text-xs font-bold text-zinc-400", children: (_a = (u.display_name || u.username || "?")[0]) == null ? void 0 : _a.toUpperCase() })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate text-[13px] font-semibold text-zinc-100", children: u.display_name || u.username }),
                    u.username && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "truncate text-[11px] text-zinc-500", children: [
                      "@",
                      u.username
                    ] })
                  ] })
                ]
              },
              u.user_id
            );
          }) }),
          r.playlists.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { icon: Music2, label: "Playlists", children: r.playlists.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => go(`/playlist/${p.id}`),
              className: "flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left transition-colors hover:bg-white/[0.05]",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-8 w-8 shrink-0 overflow-hidden rounded-lg border border-white/[0.06] bg-zinc-900", children: p.cover_image ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: getProxiedImageUrl(p.cover_image), alt: "", className: "h-full w-full object-cover" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-full w-full items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Music2, { className: "h-4 w-4 text-zinc-600" }) }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate text-[13px] font-semibold text-zinc-100", children: p.name }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "truncate text-[11px] text-zinc-500 tabular-nums", children: [
                    p.items_count ?? 0,
                    " anime"
                  ] })
                ] })
              ]
            },
            p.id
          )) }),
          r.tierlists.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { icon: Layers, label: "Tier Lists", children: r.tierlists.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => go(t.share_code ? `/tierlist/${t.share_code}` : `/tierlists`),
              className: "flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left transition-colors hover:bg-white/[0.05]",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-amber-500/20 bg-amber-500/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Layers, { className: "h-4 w-4 text-amber-400" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "min-w-0 flex-1 truncate text-[13px] font-semibold text-zinc-100", children: t.title })
              ]
            },
            t.id
          )) }),
          r.posts.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { icon: MessageSquare, label: "Posts", children: r.posts.map((po) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => go(`/community/forum/${po.id}`),
              className: "flex w-full items-start gap-3 rounded-xl px-3 py-2 text-left transition-colors hover:bg-white/[0.05]",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/[0.06] bg-white/[0.03]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "h-4 w-4 text-zinc-400" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
                  po.title && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate text-[13px] font-semibold text-zinc-100", children: po.title }),
                  po.content && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "line-clamp-2 text-[12px] text-zinc-500", children: po.content.replace(/<[^>]+>/g, " ") })
                ] })
              ]
            },
            po.id
          )) })
        ] }) })
      ]
    }
  );
}
const TAKEOVER_LIMIT = 12;
function SectionHeader({ icon: Icon, label, count }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-3 flex items-center gap-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-7 w-7 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-primary", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-3.5 w-3.5" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] font-bold uppercase tracking-widest text-muted-foreground", children: label }),
    count ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[11px] font-bold tabular-nums text-muted-foreground/60", children: [
      "· ",
      count
    ] }) : null
  ] });
}
function CommunitySearchResults({ query }) {
  const navigate = useNavigate();
  const term = query.trim();
  const { data } = useCommunitySearch(query, TAKEOVER_LIMIT);
  const users = (data == null ? void 0 : data.users) ?? [];
  const playlists = (data == null ? void 0 : data.playlists) ?? [];
  const tierlists = (data == null ? void 0 : data.tierlists) ?? [];
  const { data: badgeMap } = useBatchUserBadges(users.map((u) => u.user_id));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 8 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.25, ease: "easeOut" },
      className: "mx-auto max-w-3xl space-y-10 pb-16",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
          "Results for ",
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-bold text-white", children: [
            "“",
            term,
            "”"
          ] })
        ] }),
        users.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHeader, { icon: Users, label: "People", count: users.length }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-3 sm:grid-cols-3", children: users.map((u) => {
            var _a;
            const name = u.display_name || u.username || "Anonymous";
            const go = () => u.username && navigate(`/user/${u.username}`);
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                onClick: go,
                className: "group/row overflow-hidden rounded-2xl border border-white/[0.05] bg-white/[0.015] text-left transition-all duration-300 hover:border-white/[0.12] hover:bg-white/[0.03]",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative h-14 w-full overflow-hidden", children: [
                    u.banner_url ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "img",
                      {
                        src: getProxiedImageUrl(u.banner_url),
                        alt: "",
                        className: "h-full w-full object-cover opacity-80 transition-transform duration-500 group-hover/row:scale-105"
                      }
                    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full w-full bg-gradient-to-br from-sky-500/20 via-primary/10 to-transparent" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-3 pb-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(Avatar, { className: "-mt-6 h-12 w-12 ring-4 ring-background transition-transform duration-300 group-hover/row:scale-105", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarImage, { src: u.avatar_url || "", className: "object-cover" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarFallback, { className: "bg-zinc-800 text-sm font-bold text-zinc-400", children: (_a = name[0]) == null ? void 0 : _a.toUpperCase() })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 flex items-center gap-1.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate text-[13px] font-semibold text-foreground/90 transition-colors group-hover/row:text-primary", children: name }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(UserBadges, { badges: badgeMap == null ? void 0 : badgeMap[u.user_id], size: 13, max: 2 })
                    ] }),
                    u.username && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "truncate text-[11px] font-medium text-muted-foreground/60", children: [
                      "@",
                      u.username
                    ] })
                  ] })
                ]
              },
              u.user_id
            );
          }) })
        ] }),
        playlists.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHeader, { icon: Music2, label: "Playlists", count: playlists.length }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-3 sm:grid-cols-3", children: playlists.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              onClick: () => navigate(`/playlist/${p.id}`),
              className: "group/pl flex items-center gap-3 overflow-hidden rounded-2xl border border-white/[0.05] bg-white/[0.015] p-2.5 text-left transition-all duration-300 hover:border-white/[0.12] hover:bg-white/[0.03]",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-12 w-12 shrink-0 overflow-hidden rounded-xl border border-white/[0.06] bg-zinc-900", children: p.cover_image ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: getProxiedImageUrl(p.cover_image), alt: "", className: "h-full w-full object-cover transition-transform duration-500 group-hover/pl:scale-105" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-full w-full items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Music2, { className: "h-5 w-5 text-zinc-600" }) }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate text-[13px] font-semibold text-foreground/90 transition-colors group-hover/pl:text-primary", children: p.name }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "truncate text-[11px] tabular-nums text-muted-foreground/60", children: [
                    p.items_count ?? 0,
                    " anime"
                  ] })
                ] })
              ]
            },
            p.id
          )) })
        ] }),
        tierlists.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHeader, { icon: Layers, label: "Tier Lists", count: tierlists.length }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-3 sm:grid-cols-3", children: tierlists.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              onClick: () => navigate(t.share_code ? `/tierlist/${t.share_code}` : "/tierlists"),
              className: "group/tl flex items-center gap-3 overflow-hidden rounded-2xl border border-white/[0.05] bg-white/[0.015] p-2.5 text-left transition-all duration-300 hover:border-amber-500/30 hover:bg-white/[0.03]",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-amber-500/20 bg-amber-500/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Layers, { className: "h-5 w-5 text-amber-400" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "min-w-0 flex-1 truncate text-[13px] font-semibold text-foreground/90 transition-colors group-hover/tl:text-amber-400", children: t.title })
              ]
            },
            t.id
          )) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHeader, { icon: MessageSquare, label: "Posts" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(FeedList, { tab: "foryou", search: term, showComposer: false })
        ] })
      ]
    }
  );
}
function CommunityFeedPage() {
  const isNative = useIsNativeApp();
  const isDesktopApp = useIsDesktopApp();
  const { isAdmin } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const tag = searchParams.get("tag") || void 0;
  const [tab, setTab] = reactExports.useState("foryou");
  const [postType, setPostType] = reactExports.useState(void 0);
  const [createOpen, setCreateOpen] = reactExports.useState(false);
  const [leaderboardOpen, setLeaderboardOpen] = reactExports.useState(false);
  const [searchQuery, setSearchQuery] = reactExports.useState("");
  const searchActive = searchQuery.trim().length >= 2;
  useFeedRealtime();
  const { onlineCount, onlineUserIds, onlineUsers } = useCommunityPresence();
  const clearFilters = reactExports.useCallback(() => {
    if (tag) setSearchParams({});
  }, [tag, setSearchParams]);
  const handleTabChange = reactExports.useCallback((newTab) => {
    setTab(newTab);
    if (tag) setSearchParams({});
  }, [tag, setSearchParams]);
  const filtering = !!tag;
  const feedTab = tab === "schedule" ? "foryou" : tab;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative min-h-screen bg-background text-foreground antialiased selection:bg-primary/20 selection:text-primary", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pointer-events-none fixed inset-0 -z-10 overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "community-aurora-primary absolute -top-[12%] left-1/2 h-[640px] w-[1280px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,hsl(var(--primary)/0.14),hsl(var(--secondary)/0.08),transparent)] blur-3xl" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "community-aurora-secondary absolute top-[24%] -left-[12%] h-[520px] w-[520px] rounded-full bg-[radial-gradient(closest-side,hsl(var(--secondary)/0.12),transparent)] blur-3xl" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "community-aurora-secondary absolute -right-[8%] bottom-[8%] h-[460px] w-[460px] rounded-full bg-[radial-gradient(closest-side,hsl(347_100%_65%/0.08),transparent)] blur-3xl" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-transparent via-background/80 to-background" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CommunitySidebar, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: cn("relative z-10 w-full transition-all duration-300", isDesktopApp ? "pl-24 lg:pl-28" : isNative ? "pl-0" : "pl-0 md:pl-24 lg:pl-28"), children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-[1536px] px-4 pt-6 md:px-8 md:pt-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8 space-y-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "hero-gradient-text font-display text-3xl font-black tracking-tight sm:text-5xl drop-shadow-sm", children: "Community" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-[11px] font-bold text-emerald-400 backdrop-blur-md shadow-[0_0_15px_rgba(16,185,129,0.15)]", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "relative flex h-2 w-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "relative inline-flex h-2 w-2 rounded-full bg-emerald-500" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tabular-nums", children: onlineCount }),
                " online"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground/80 max-w-2xl leading-relaxed", children: "Join discussions, host watchrooms, create tier lists, and explore curated playlists from Tatakai fans worldwide." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2.5 self-start sm:self-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden lg:block", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            CommunitySearch,
            {
              value: searchQuery,
              onValueChange: setSearchQuery,
              suppressDropdown: true,
              expandOnFocus: true,
              className: "\n        w-[220px]\n        transition-all duration-300\n        focus-within:w-[300px]\n      "
            }
          ) }) }),
          isAdmin && /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              onClick: () => setCreateOpen(true),
              size: "icon",
              className: "\n        h-10 w-10 shrink-0\n        rounded-full\n        border border-white/[0.08]\n        bg-white/[0.05]\n        text-foreground\n        backdrop-blur-xl\n        shadow-[0_8px_30px_rgba(0,0,0,0.15)]\n        transition-all duration-300\n\n        hover:bg-primary\n        hover:text-primary-foreground\n        hover:border-primary/40\n        hover:shadow-[0_0_25px_rgba(var(--primary),0.3)]\n        hover:-translate-y-0.5\n\n        active:scale-95\n      ",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" })
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          CommunitySearch,
          {
            value: searchQuery,
            onValueChange: setSearchQuery,
            suppressDropdown: true,
            className: "\n      w-full\n      [&>div]:w-full\n    "
          }
        ) }),
        !searchActive && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CommunitiesShowcase, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2.5 overflow-x-auto pb-2 xl:hidden no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0 scroll-smooth", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: () => setLeaderboardOpen(true),
                className: "flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-2 text-sm font-bold text-amber-300 backdrop-blur-md shrink-0 transition-all hover:bg-amber-500/20 active:scale-95 shadow-[0_4px_20px_rgba(245,158,11,0.1)]",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "h-4 w-4 text-amber-400" }),
                  " Leaderboard"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Link$1,
              {
                to: "/isshoni",
                className: "flex items-center gap-2 rounded-full border border-rose-500/30 bg-rose-500/10 px-4 py-2 text-sm font-bold text-rose-300 backdrop-blur-md shrink-0 transition-all hover:bg-rose-500/20 active:scale-95 shadow-[0_4px_20px_rgba(244,63,94,0.1)]",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Radio, { className: "h-4 w-4 text-rose-400" }),
                  " Watch Together"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Link$1,
              {
                to: "/tierlists",
                className: "flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-bold text-white/90 backdrop-blur-md shrink-0 transition-all hover:border-amber-500/40 hover:bg-white/[0.08] active:scale-95 hover:text-amber-400",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Layers, { className: "h-4 w-4" }),
                  " Tier Lists"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Link$1,
              {
                to: "/playlists",
                className: "flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-bold text-white/90 backdrop-blur-md shrink-0 transition-all hover:border-violet-500/40 hover:bg-white/[0.08] active:scale-95 hover:text-violet-400",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Music2, { className: "h-4 w-4" }),
                  " Playlists"
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(FeedTabs, { value: tab, onChange: handleTabChange })
        ] })
      ] }),
      searchActive ? /* @__PURE__ */ jsxRuntimeExports.jsx(CommunitySearchResults, { query: searchQuery }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-8 xl:gap-12 pb-12", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full min-w-0 flex-1 max-w-[960px]", children: [
          filtering && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6 flex items-center justify-between rounded-2xl border border-primary/25 bg-primary/10 px-5 py-3 backdrop-blur-xl shadow-lg transition-all animate-in fade-in slide-in-from-top-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-8 w-8 items-center justify-center rounded-xl bg-primary/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Hash, { className: "h-4 w-4 text-primary" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-bold text-white", children: [
                "Filtering by ",
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-primary", children: [
                  "#",
                  tag
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: clearFilters,
                className: "flex items-center gap-1.5 rounded-full bg-white/5 px-3 py-1.5 text-xs font-semibold text-muted-foreground transition-all hover:bg-white/10 hover:text-white",
                children: [
                  "Clear ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-3.5 w-3.5" })
                ]
              }
            )
          ] }),
          (tab === "foryou" || tab === "following") && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-4 flex flex-wrap items-center gap-2", children: [
            { value: void 0, label: "All", icon: Sparkles },
            { value: "playlist", label: "Playlists", icon: Music2 },
            { value: "tierlist", label: "Tier Lists", icon: Layers },
            { value: "watchroom", label: "Watchrooms", icon: Radio }
          ].map(({ value, label, icon: Icon }) => {
            const active = postType === value;
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: () => setPostType(value),
                className: cn(
                  "inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-all",
                  active ? "border-primary/40 bg-primary/15 text-primary" : "border-white/10 bg-white/[0.03] text-muted-foreground hover:border-white/20 hover:text-white"
                ),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-3.5 w-3.5" }),
                  label
                ]
              },
              label
            );
          }) }),
          tab === "schedule" ? /* @__PURE__ */ jsxRuntimeExports.jsx(CommunityEventsSection, {}) : tab === "news" ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FeedList, { tab: "news", tag, showComposer: false }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx(FeedList, { tab: feedTab, tag, postType })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          CommunityRightRail,
          {
            onlineUsers,
            onlineUserIds,
            onOpenLeaderboard: () => setLeaderboardOpen(true)
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(LeaderboardSheet, { open: leaderboardOpen, onOpenChange: setLeaderboardOpen }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CreateCommunityDialog, { open: createOpen, onOpenChange: setCreateOpen }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(MobileNav, {})
  ] });
}
export {
  CommunityFeedPage as default
};
