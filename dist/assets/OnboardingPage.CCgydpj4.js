import { r as reactExports, e as useNavigate, j as jsxRuntimeExports } from "./react-vendor.CAo4XUiA.js";
import { u as useAuth, Q as Background, B as Button, j as cn, b_ as useRandomProfileImages, b$ as useRandomBannerImages, c0 as useUpdateProfileAvatar, c1 as useUpdateProfileBanner, a8 as Avatar, a9 as AvatarImage, aa as AvatarFallback, ay as Label, az as Input, ak as useTheme, c2 as THEME_INFO, a2 as supabase } from "./index.C6yfkT5T.js";
import { bf as ue } from "./vendor.CJyRs4QS.js";
import { m as motion, A as AnimatePresence } from "./motion.DVGLRFCH.js";
import { aY as CircleCheckBig, v as ArrowRight, x as CirclePlay, k as Sparkles, aV as Shield, B as BookOpen, y as MessageSquare, R as RefreshCw, aT as Zap, bj as Activity, bk as Cpu, H as Heart, g as User, a4 as Palette, T as TriangleAlert, av as ScrollText, j as ExternalLink, Q as LoaderCircle, c as Check, bZ as Camera, aH as ShieldAlert, m as Eye, af as EyeOff, bX as Megaphone, e as TrendingUp, ch as ThumbsDown, U as Users, a6 as Lock } from "./icons.C2gBBarQ.js";
import "./tanstack.DPr3OB19.js";
import "./supabase.WuRMX5Dg.js";
import "./radix.BiK9uYXL.js";
import "./hls.BlgtCWcq.js";
import "./editor.Dxw8dtyw.js";
import "./charts.Dr1fgDJ-.js";
const GlassCard = ({ children, className }) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("bg-background/40 backdrop-blur-xl border border-border/50 rounded-3xl overflow-hidden", className), children });
function ProfileSetupStep() {
  var _a;
  const { profile, user } = useAuth();
  const { data: profileImages, isLoading: loadingProfile, refetch: refetchProfile } = useRandomProfileImages(12);
  const { data: bannerImages, isLoading: loadingBanner, refetch: refetchBanner } = useRandomBannerImages(6);
  const updateAvatar = useUpdateProfileAvatar();
  const updateBanner = useUpdateProfileBanner();
  const [selectedAvatar, setSelectedAvatar] = reactExports.useState((profile == null ? void 0 : profile.avatar_url) || null);
  const [selectedBanner, setSelectedBanner] = reactExports.useState((profile == null ? void 0 : profile.banner_url) || null);
  const [displayName, setDisplayName] = reactExports.useState((profile == null ? void 0 : profile.display_name) || "");
  const [username, setUsername] = reactExports.useState((profile == null ? void 0 : profile.username) || "");
  const [isUpdating, setIsUpdating] = reactExports.useState(false);
  const handleAvatarSelect = async (url) => {
    setSelectedAvatar(url);
    try {
      await updateAvatar.mutateAsync(url);
      ue.success("Avatar updated");
    } catch (error) {
      ue.error("Failed to update avatar");
    }
  };
  const handleBannerSelect = async (url) => {
    setSelectedBanner(url);
    try {
      await updateBanner.mutateAsync(url);
      ue.success("Banner updated");
    } catch (error) {
      ue.error("Failed to update banner");
    }
  };
  const saveProfileInfo = async () => {
    if (!user) return;
    setIsUpdating(true);
    try {
      const { error } = await supabase.from("profiles").update({
        display_name: displayName,
        username: username.toLowerCase().replace(/\s/g, "_"),
        updated_at: (/* @__PURE__ */ new Date()).toISOString()
      }).eq("user_id", user.id);
      if (error) throw error;
      ue.success("Profile saved successfully");
    } catch (error) {
      ue.error("Failed to save: " + error.message);
    } finally {
      setIsUpdating(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { className: "shadow-2xl shadow-black/5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "h-40 w-full relative group", children: [
        selectedBanner ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: selectedBanner, loading: "lazy", decoding: "async", className: "w-full h-full object-cover transition-transform duration-700 group-hover:scale-105", alt: "Banner" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-full bg-gradient-to-tr from-primary/20 via-muted to-primary/10" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 pb-6 pt-0 relative flex flex-col sm:flex-row items-center sm:items-end gap-5 -mt-16", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-28 h-28 rounded-full p-1.5 bg-background border border-border/50 shadow-xl relative z-10 shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Avatar, { className: "w-full h-full", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarImage, { src: selectedAvatar || void 0, className: "object-cover" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarFallback, { className: "bg-muted text-muted-foreground text-3xl font-semibold", children: (displayName == null ? void 0 : displayName[0]) || ((_a = profile == null ? void 0 : profile.display_name) == null ? void 0 : _a[0]) || "U" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 text-center sm:text-left mb-2 w-full", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-bold text-2xl tracking-tight text-foreground truncate", children: displayName || "Your Name" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground truncate font-medium", children: [
            "@",
            username || "username"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full sm:w-auto flex justify-center sm:justify-end mb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: saveProfileInfo, disabled: isUpdating, className: "rounded-full px-6 font-semibold shadow-lg shadow-primary/25 transition-all active:scale-95", children: [
          isUpdating ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 mr-2 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-4 h-4 mr-2" }),
          "Save Profile"
        ] }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider ml-1", children: "Display Name" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            placeholder: "How others see you",
            value: displayName,
            onChange: (e) => setDisplayName(e.target.value),
            className: "h-12 bg-muted/50 border-border/50 focus-visible:ring-primary rounded-2xl px-4 text-base transition-all"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider ml-1", children: "Username" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            placeholder: "unique_username",
            value: username,
            onChange: (e) => setUsername(e.target.value),
            className: "h-12 bg-muted/50 border-border/50 focus-visible:ring-primary rounded-2xl px-4 text-base transition-all"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-px w-full bg-gradient-to-r from-transparent via-border to-transparent my-8" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h5", { className: "text-sm font-semibold text-muted-foreground tracking-wide flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-4 h-4 text-primary" }),
            "Select Avatar"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "ghost", size: "sm", onClick: () => refetchProfile(), disabled: loadingProfile, className: "text-xs rounded-full hover:bg-muted", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: cn("w-3 h-3 mr-2", loadingProfile && "animate-spin") }),
            "Refresh"
          ] })
        ] }),
        loadingProfile ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-32 flex items-center justify-center rounded-2xl border border-dashed border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-6 h-6 animate-spin text-muted-foreground" }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-4 sm:grid-cols-6 gap-3", children: profileImages == null ? void 0 : profileImages.map((img) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => handleAvatarSelect(img.url),
            className: cn(
              "aspect-square rounded-2xl overflow-hidden relative transition-all duration-300",
              selectedAvatar === img.url ? "ring-2 ring-primary ring-offset-2 ring-offset-background scale-95" : "hover:ring-2 hover:ring-border hover:ring-offset-2 hover:ring-offset-background opacity-80 hover:opacity-100"
            ),
            children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: img.url, loading: "lazy", decoding: "async", className: "w-full h-full object-cover", alt: "Avatar option" })
          },
          img.id
        )) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h5", { className: "text-sm font-semibold text-muted-foreground tracking-wide flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Camera, { className: "w-4 h-4 text-primary" }),
            "Select Banner"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "ghost", size: "sm", onClick: () => refetchBanner(), disabled: loadingBanner, className: "text-xs rounded-full hover:bg-muted", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: cn("w-3 h-3 mr-2", loadingBanner && "animate-spin") }),
            "Refresh"
          ] })
        ] }),
        loadingBanner ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-32 flex items-center justify-center rounded-2xl border border-dashed border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-6 h-6 animate-spin text-muted-foreground" }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: bannerImages == null ? void 0 : bannerImages.map((img) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => handleBannerSelect(img.url),
            className: cn(
              "aspect-[21/9] rounded-2xl overflow-hidden relative transition-all duration-300",
              selectedBanner === img.url ? "ring-2 ring-primary ring-offset-2 ring-offset-background scale-[0.98]" : "hover:ring-2 hover:ring-border hover:ring-offset-2 hover:ring-offset-background opacity-80 hover:opacity-100"
            ),
            children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: img.url, loading: "lazy", decoding: "async", className: "w-full h-full object-cover", alt: "Banner option" })
          },
          img.id
        )) })
      ] })
    ] })
  ] });
}
function ThemeSelectionStep() {
  const { theme, setTheme } = useTheme();
  const [reduceMotion, setReduceMotion] = reactExports.useState(() => typeof window !== "undefined" ? localStorage.getItem("tatakai_reduce_motion") === "true" : false);
  const [ultraLite, setUltraLite] = reactExports.useState(() => typeof window !== "undefined" ? localStorage.getItem("tatakai_ultra_lite") === "true" : false);
  reactExports.useEffect(() => {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const cpuCores = navigator.hardwareConcurrency || 4;
    const deviceMemory = navigator.deviceMemory || 4;
    if (isMobile && (cpuCores <= 4 || deviceMemory <= 4) && !theme) setTheme("midnight");
  }, [theme, setTheme]);
  const toggleMotion = () => {
    const newVal = !reduceMotion;
    setReduceMotion(newVal);
    localStorage.setItem("tatakai_reduce_motion", String(newVal));
    document.documentElement.classList.toggle("reduce-motion", newVal);
  };
  const toggleLite = () => {
    const newVal = !ultraLite;
    setUltraLite(newVal);
    localStorage.setItem("tatakai_ultra_lite", String(newVal));
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: Object.keys(THEME_INFO).map((t) => {
      const isSelected = theme === t;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: () => setTheme(t),
          className: cn(
            "relative p-5 rounded-3xl text-left transition-all duration-300 border flex items-start gap-4 group",
            isSelected ? "bg-primary/5 border-primary shadow-lg shadow-primary/10 scale-[0.98]" : "bg-muted/30 border-transparent hover:bg-muted/50 hover:border-border"
          ),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("p-3 rounded-2xl text-xl transition-colors", isSelected ? "bg-primary text-primary-foreground" : "bg-background text-muted-foreground group-hover:text-foreground"), children: THEME_INFO[t].icon }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 mt-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: cn("font-semibold text-base mb-1 transition-colors", isSelected ? "text-primary" : "text-foreground"), children: THEME_INFO[t].name }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground leading-relaxed", children: THEME_INFO[t].description })
            ] }),
            t === "ultra-lite" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-4 right-4 px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-600 dark:text-amber-400 text-[10px] font-bold tracking-widest uppercase", children: "Speed" }),
            isSelected && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-4 right-4 w-5 h-5 rounded-full bg-primary flex items-center justify-center text-primary-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-3 h-3 stroke-[3]" }) })
          ]
        },
        t
      );
    }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(GlassCard, { className: "p-2 space-y-1 mt-6", children: [
      {
        title: "Reduce Motion",
        desc: "Minimize animations for a calmer experience.",
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "w-5 h-5" }),
        state: reduceMotion,
        toggle: toggleMotion,
        color: "text-blue-500"
      },
      {
        title: "Ultra Lite Mode",
        desc: "Simplify the UI for maximum device performance.",
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Cpu, { className: "w-5 h-5" }),
        state: ultraLite,
        toggle: toggleLite,
        color: "text-amber-500"
      }
    ].map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        onClick: item.toggle,
        className: "w-full flex items-center justify-between p-4 rounded-2xl hover:bg-muted/50 transition-colors",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("p-2.5 rounded-xl bg-background shadow-sm border border-border/50", item.color), children: item.icon }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-left", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm text-foreground", children: item.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: item.desc })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("w-12 h-6 rounded-full p-1 transition-all duration-300 shadow-inner flex items-center", item.state ? "bg-primary" : "bg-muted-foreground/20"), children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("w-4 h-4 rounded-full bg-background shadow-sm transition-transform duration-300", item.state ? "translate-x-6" : "translate-x-0") }) })
        ]
      },
      i
    )) })
  ] });
}
const COMMUNITY_RULES = [
  { title: "Be respectful", tagline: "Disagree with the take, not the person.", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: "w-4 h-4" }) },
  { title: "No hate speech", tagline: "It's about what you do with a word, not that it exists.", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldAlert, { className: "w-4 h-4" }) },
  { title: "Keep it safe for work", tagline: "The 18+ gate exists; everything outside it stays SFW.", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-4 h-4" }) },
  { title: "Tag your spoilers", tagline: "Let everyone read and watch at their own pace.", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "w-4 h-4" }) },
  { title: "Don't spam", tagline: "One good comment beats twenty copy-pasted ones.", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "w-4 h-4" }) },
  { title: "No advertising", tagline: "Don't use Tatakai to promote your stuff, or anyone's.", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Megaphone, { className: "w-4 h-4" }) },
  { title: "Don't farm reputation", tagline: "Earn reactions by being good, not by grinding for them.", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-4 h-4" }) },
  { title: "Don't weaponize votes", tagline: "The vote and report buttons are for bad posts, not people.", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ThumbsDown, { className: "w-4 h-4" }) },
  { title: "One person, one account", tagline: "Alts used to break rules only make it worse.", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-4 h-4" }) },
  { title: "Respect privacy", tagline: "If it isn't yours to share, don't post it.", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-4 h-4" }) }
];
function CommunityRulesStep() {
  const navigate = useNavigate();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3", children: COMMUNITY_RULES.map((rule, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 8 },
        animate: { opacity: 1, y: 0 },
        transition: { delay: Math.min(i * 0.04, 0.3), duration: 0.2 },
        className: "flex items-start gap-3 p-4 rounded-2xl bg-muted/30 border border-transparent hover:border-border transition-colors",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "shrink-0 w-9 h-9 rounded-xl bg-background border border-border/50 shadow-sm flex items-center justify-center text-primary", children: rule.icon }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold text-sm text-foreground", children: rule.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5 leading-relaxed", children: rule.tagline })
          ] })
        ]
      },
      rule.title
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3 p-4 rounded-2xl border border-red-500/30 bg-red-500/10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-5 h-5 text-red-400 shrink-0 mt-0.5" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-foreground leading-relaxed", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-red-400", children: "Zero tolerance:" }),
        " Sexualizing minors — real or fictional — and doxxing or endangering another user are instant, permanent bans."
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        onClick: () => navigate("/community-guidelines"),
        className: "w-full flex items-center justify-center gap-2 text-xs font-medium text-muted-foreground hover:text-primary transition-colors py-2",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollText, { className: "w-4 h-4" }),
          "Read the full Community Guidelines",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "w-3.5 h-3.5" })
        ]
      }
    )
  ] });
}
const onboardingSteps = [
  {
    id: "welcome",
    title: "Your Anime Journey Starts Here",
    description: "Immersive streaming, community interaction, and personalized experiences.",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-8 h-8 text-primary" }),
    content: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center space-y-12 py-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        animate: { rotate: 360 },
        transition: { duration: 30, repeat: Infinity, ease: "linear" },
        className: "relative w-40 h-40 mx-auto",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-tr from-primary via-purple-500 to-blue-500 rounded-full blur-[40px] opacity-20" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative w-full h-full bg-background/50 backdrop-blur-2xl rounded-full border border-border/50 flex items-center justify-center shadow-2xl", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CirclePlay, { className: "w-16 h-16 text-primary drop-shadow-md" }) })
        ]
      }
    ) })
  },
  {
    id: "purpose",
    title: "Project Purpose",
    description: "Understanding how Tatakai works under the hood.",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-8 h-8 text-blue-500" }),
    content: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { className: "p-8 text-center relative overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-12 -right-12 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-12 h-12 mx-auto text-blue-500 mb-6" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-bold tracking-tight mb-3", children: "Student & Portfolio Project" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm leading-relaxed max-w-md mx-auto", children: "Tatakai is built for educational purposes. We do not host files on our servers. Content is aggregated from publicly available 3rd party providers." })
    ] }) })
  },
  {
    id: "desktop-features",
    title: "Desktop Enhancements",
    description: "Exclusive features enabled in the app.",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Cpu, { className: "w-8 h-8 text-orange-500" }),
    condition: () => !!window.electron || !!window.__TAURI_INTERNALS__ || !!window.__TAURI__,
    content: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
      { title: "Discord Presence", desc: "Share your watch status", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "w-5 h-5" }), color: "text-indigo-500" },
      { title: "Offline Playback", desc: "Download and watch anywhere", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-5 h-5" }), color: "text-cyan-500" },
      { title: "Native Speed", desc: "Hardware acceleration enabled", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-5 h-5" }), color: "text-amber-500" },
      { title: "System Alerts", desc: "Native OS notifications", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "w-5 h-5" }), color: "text-emerald-500" }
    ].map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4 p-5 rounded-3xl bg-muted/30 border border-transparent hover:border-border hover:bg-muted/50 transition-colors", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("p-3 rounded-2xl bg-background shadow-sm border border-border/50", item.color), children: item.icon }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold text-sm text-foreground", children: item.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: item.desc })
      ] })
    ] }, i)) })
  },
  {
    id: "rules",
    title: "Community Guidelines",
    description: "Help us maintain a positive atmosphere.",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: "w-8 h-8 text-pink-500" }),
    content: /* @__PURE__ */ jsxRuntimeExports.jsx(CommunityRulesStep, {})
  },
  {
    id: "profile",
    title: "Personalize Identity",
    description: "Show off your style to the community.",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-8 h-8 text-primary" }),
    content: /* @__PURE__ */ jsxRuntimeExports.jsx(ProfileSetupStep, {}),
    condition: (user) => !!user
  },
  {
    id: "theme",
    title: "Choose Experience",
    description: "Customize how the app looks and feels.",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Palette, { className: "w-8 h-8 text-purple-500" }),
    content: /* @__PURE__ */ jsxRuntimeExports.jsx(ThemeSelectionStep, {})
  }
];
function OnboardingPage() {
  const { user } = useAuth();
  const filteredSteps = onboardingSteps.filter((step) => !step.condition || step.condition(user));
  const [currentStep, setCurrentStep] = reactExports.useState(0);
  const [isComplete, setIsComplete] = reactExports.useState(false);
  const navigate = useNavigate();
  reactExports.useEffect(() => {
    if (!user) {
      navigate("/auth");
      return;
    }
    setCurrentStep(0);
  }, [user, navigate]);
  const handleNext = () => {
    if (currentStep < filteredSteps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      handleComplete();
    }
  };
  const handlePrevious = () => {
    if (currentStep > 0) setCurrentStep((prev) => prev - 1);
  };
  const handleComplete = () => {
    setIsComplete(true);
    localStorage.setItem("tatakai_onboarding_complete", "true");
    localStorage.setItem("tatakai_theme_selected_v2", "true");
    setTimeout(() => navigate("/"), 1e3);
  };
  if (isComplete) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background flex items-center justify-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Background, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: { scale: 0.9, opacity: 0 }, animate: { scale: 1, opacity: 1 }, className: "text-center space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-24 h-24 mx-auto bg-primary rounded-full flex items-center justify-center shadow-2xl shadow-primary/30", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-12 h-12 text-primary-foreground" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl font-bold tracking-tight", children: "You're all set!" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground font-medium", children: "Entering Tatakai..." })
      ] })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background text-foreground flex flex-col selection:bg-primary/30 relative", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Background, { className: "opacity-50" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "relative z-20 flex items-center justify-end p-6 md:px-12 md:py-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Button,
      {
        variant: "ghost",
        onClick: handleComplete,
        className: "text-muted-foreground hover:text-foreground hover:bg-muted rounded-full px-6 font-medium text-sm transition-all",
        children: "Skip Intro"
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "flex-1 relative z-10 flex flex-col items-center pt-4 pb-36 px-4 md:px-8 overflow-y-auto custom-scrollbar", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-3xl mx-auto flex flex-col", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center mb-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 10 },
          animate: { opacity: 1, y: 0 },
          exit: { opacity: 0, y: -10 },
          transition: { duration: 0.3 },
          className: "flex flex-col items-center gap-4",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 rounded-2xl bg-muted/30 border border-border/50 shadow-sm inline-flex", children: filteredSteps[currentStep].icon }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl md:text-4xl font-bold tracking-tight mb-2 text-foreground", children: filteredSteps[currentStep].title }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-base text-muted-foreground max-w-lg mx-auto", children: filteredSteps[currentStep].description })
            ] })
          ]
        },
        currentStep
      ) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full relative", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 12 },
          animate: { opacity: 1, y: 0 },
          exit: { opacity: 0, y: -12 },
          transition: { duration: 0.25, ease: "easeOut" },
          className: "w-full",
          children: filteredSteps[currentStep].content
        },
        currentStep
      ) }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed bottom-0 left-0 right-0 z-50 p-6 md:p-8 bg-gradient-to-t from-background via-background/90 to-transparent pointer-events-none", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl mx-auto flex items-center justify-between gap-4 pointer-events-auto bg-background/60 backdrop-blur-2xl border border-border/50 p-4 rounded-full shadow-2xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 flex items-center gap-2 pl-4", children: filteredSteps.map((_, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: cn(
            "h-1.5 rounded-full transition-all duration-500",
            index === currentStep ? "bg-primary w-8" : index < currentStep ? "bg-primary/40 w-2" : "bg-muted w-2"
          )
        },
        index
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 pr-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "ghost",
            onClick: handlePrevious,
            disabled: currentStep === 0,
            className: cn(
              "rounded-full px-6 font-medium transition-all duration-300",
              currentStep === 0 ? "opacity-0 w-0 p-0 overflow-hidden" : "opacity-100 hover:bg-muted text-muted-foreground hover:text-foreground"
            ),
            children: "Back"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            onClick: handleNext,
            className: "rounded-full px-8 py-6 bg-foreground text-background hover:bg-foreground/90 font-bold text-base shadow-lg hover:scale-105 active:scale-95 transition-all gap-2 group",
            children: [
              currentStep === filteredSteps.length - 1 ? "Start Exploring" : "Continue",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-5 h-5 group-hover:translate-x-1 transition-transform" })
            ]
          }
        )
      ] })
    ] }) })
  ] });
}
export {
  OnboardingPage as default
};
