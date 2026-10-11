import { r as reactExports, e as useNavigate, j as jsxRuntimeExports } from "./react-vendor.CAo4XUiA.js";
import { c3 as useCountryPolicy, bE as isIOS, B as Button, j as cn, c4 as DebridSettingsPanel, c5 as setFlag, am as FeatureFlag, c6 as isMobileNative, bF as useStoreCatalogue, bG as useExtensionInstaller } from "./index.C6yfkT5T.js";
import { b6 as Capacitor } from "./vendor.CJyRs4QS.js";
import { u as useReducedMotion, m as motion, A as AnimatePresence } from "./motion.DVGLRFCH.js";
import { c as Check, t as HardDrive, aT as Zap, ag as ShieldCheck, cp as Disc, a5 as Globe, a6 as Lock, aS as Puzzle, aI as Star, b as ChevronRight, M as MessageCircle, k as Sparkles, cq as Folder, aV as Shield, bm as Wifi, c2 as Key, H as Heart, u as ArrowLeft, Q as LoaderCircle, D as Download } from "./icons.C2gBBarQ.js";
import "./tanstack.DPr3OB19.js";
import "./supabase.WuRMX5Dg.js";
import "./radix.BiK9uYXL.js";
import "./hls.BlgtCWcq.js";
import "./editor.Dxw8dtyw.js";
import "./charts.Dr1fgDJ-.js";
const VIDEO_SOURCES = [
  "./assets/video/1.mp4",
  "./assets/video/2.webm",
  "./assets/video/3.mp4",
  "./assets/video/5.mp4",
  "./assets/video/6.mp4"
];
const STEP_META = [
  {
    icon: Folder,
    color: "blue",
    title: "Storage",
    subtitle: "Where should your anime live?"
  },
  {
    icon: Shield,
    color: "purple",
    title: "Privacy",
    subtitle: "Control your integrations"
  },
  {
    icon: Globe,
    color: "red",
    title: "Country Policy",
    subtitle: "Legal context for torrent use"
  },
  {
    icon: Wifi,
    color: "cyan",
    title: "Network",
    subtitle: "Secure your connection"
  },
  {
    icon: Puzzle,
    color: "green",
    title: "Extensions",
    subtitle: "Power up your experience"
  },
  {
    icon: Key,
    color: "blue",
    title: "Debrid Services",
    subtitle: "Direct high-speed streaming"
  },
  {
    icon: Heart,
    color: "purple",
    title: "Support",
    subtitle: "Help the project grow"
  }
];
const COLOR_MAP = {
  blue: "bg-blue-500/10 border-blue-500/20 text-blue-400",
  purple: "bg-purple-500/10 border-purple-500/20 text-purple-400",
  red: "bg-red-500/10 border-red-500/20 text-red-400",
  cyan: "bg-cyan-500/10 border-cyan-500/20 text-cyan-400",
  green: "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
};
const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.05, delayChildren: 0.02 }
  }
};
const itemVariants = {
  hidden: { opacity: 0, y: 15, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.4, ease: [0.25, 0.4, 0.25, 1] }
  }
};
const slideVariants = {
  enter: (dir) => ({
    x: dir > 0 ? 30 : -30,
    opacity: 0,
    scale: 0.96,
    filter: "blur(8px)"
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    filter: "blur(0px)"
  },
  exit: (dir) => ({
    x: dir < 0 ? 30 : -30,
    opacity: 0,
    scale: 0.96,
    filter: "blur(8px)"
  })
};
const CustomCheckbox = ({
  checked,
  onChange,
  children
}) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
  "div",
  {
    className: "flex items-start gap-3 cursor-pointer group",
    onClick: () => onChange(!checked),
    children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          className: cn(
            "w-5 h-5 rounded-[6px] flex items-center justify-center border transition-colors mt-0.5 flex-shrink-0",
            checked ? "bg-primary border-primary shadow-[0_0_12px_hsl(var(--primary)/0.4)]" : "bg-muted/50 border-border group-hover:border-primary/50"
          ),
          whileTap: { scale: 0.9 },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: checked && /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { scale: 0, opacity: 0 },
              animate: { scale: 1, opacity: 1 },
              exit: { scale: 0, opacity: 0 },
              transition: { type: "spring", stiffness: 400, damping: 25 },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-3.5 h-3.5 text-primary-foreground stroke-[3]" })
            }
          ) })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "select-none flex-1", children })
    ]
  }
);
const Toggle = ({ value, onChange }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.button,
    {
      whileTap: { scale: 0.9 },
      onClick: () => onChange(!value),
      className: cn(
        "relative overflow-hidden w-11 h-6 rounded-full p-1 transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-primary/30",
        value ? "bg-primary shadow-[0_0_12px_hsl(var(--primary)/0.4)]" : "bg-muted-foreground/20"
      ),
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          className: "w-4 h-4 bg-white rounded-full shadow-sm relative z-10",
          layout: true,
          transition: { type: "spring", stiffness: 500, damping: 30 },
          animate: { x: value ? 20 : 0 }
        }
      )
    }
  );
};
function ProgressBar({ step, total }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-1.5 mb-8", children: Array.from({ length: total }).map((_, i) => {
    const n = i + 1;
    const done = step > n;
    const active = step === n;
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 flex-1 max-w-[40px]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          animate: {
            backgroundColor: done || active ? "hsl(var(--primary))" : "hsl(var(--muted))",
            scale: active ? 1.1 : 1
          },
          className: "w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold z-10 relative",
          children: [
            active && /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                className: "absolute inset-0 rounded-full bg-primary",
                layoutId: "activeStepGlow",
                style: { filter: "blur(8px)", opacity: 0.5 }
              }
            ),
            done ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-3 h-3 text-primary-foreground relative z-10" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: cn("relative z-10", active ? "text-primary-foreground" : "text-muted-foreground"), children: n })
          ]
        }
      ),
      n < total && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative flex-1 h-[2px] rounded-full bg-muted/50 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          className: "absolute inset-y-0 left-0 bg-primary",
          animate: { width: step > n ? "100%" : "0%" },
          transition: { ease: "easeInOut", duration: 0.3 }
        }
      ) })
    ] }, n);
  }) });
}
function StepHeader({ stepIndex }) {
  const base = STEP_META[stepIndex - 1];
  const meta = isMobileNative() && stepIndex === 2 ? { ...base, subtitle: "Review mobile app permissions" } : isIOS() && stepIndex === 3 ? { ...base, title: "Region", subtitle: "Regional content settings" } : base;
  if (!meta) return null;
  const Icon = meta.icon;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 mb-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { scale: 0.8, opacity: 0, rotate: -10 },
        animate: { scale: 1, opacity: 1, rotate: 0 },
        transition: { type: "spring", stiffness: 300, damping: 20 },
        className: cn("w-12 h-12 rounded-2xl flex items-center justify-center border shadow-sm", COLOR_MAP[meta.color]),
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-5 h-5" })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.h3,
        {
          initial: { opacity: 0, x: -10 },
          animate: { opacity: 1, x: 0 },
          className: "text-xl font-bold text-foreground tracking-tight",
          children: meta.title
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.p,
        {
          initial: { opacity: 0, x: -10 },
          animate: { opacity: 1, x: 0 },
          transition: { delay: 0.05 },
          className: "text-sm text-muted-foreground",
          children: meta.subtitle
        }
      )
    ] })
  ] });
}
function ToggleRow({
  icon: Icon,
  title,
  desc,
  value,
  onChange
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      variants: itemVariants,
      whileHover: { y: -1 },
      className: "flex items-center justify-between p-4 rounded-2xl bg-card border border-border/50 hover:border-primary/30 shadow-sm transition-all",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2.5 rounded-xl bg-muted text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-4 h-4" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: desc })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Toggle, { value, onChange })
      ]
    }
  );
}
function NavButtons({
  onBack,
  onNext,
  nextLabel,
  nextIcon: NextIcon,
  nextDisabled = false
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 pt-4", children: [
    onBack && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Button,
      {
        variant: "ghost",
        onClick: onBack,
        className: "flex-1 h-12 gap-2 text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-xl",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4" }),
          "Back"
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { className: "flex-[2]", whileHover: !nextDisabled ? { scale: 1.01 } : {}, whileTap: !nextDisabled ? { scale: 0.98 } : {}, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Button,
      {
        onClick: onNext,
        disabled: nextDisabled,
        className: "w-full h-12 rounded-xl bg-gradient-to-r from-primary to-primary/80 hover:to-primary text-primary-foreground font-semibold shadow-[0_4px_14px_0_hsl(var(--primary)/30%)] border-t border-white/10 gap-2 disabled:opacity-40 disabled:cursor-not-allowed transition-all",
        children: [
          NextIcon && /* @__PURE__ */ jsxRuntimeExports.jsx(NextIcon, { className: "w-4 h-4" }),
          nextLabel ?? "Continue",
          !NextIcon && /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4" })
        ]
      }
    ) })
  ] });
}
function SetupExtensionsList() {
  const { items, isLoading, isServiceConfigured } = useStoreCatalogue({ limit: 6 });
  const installer = useExtensionInstaller();
  const top = items.slice(0, 5);
  if (!isServiceConfigured) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { variants: itemVariants, className: "space-y-3 pt-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground px-1", children: "Popular Add-ons" }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: Array.from({ length: 3 }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-14 rounded-xl bg-muted/40 animate-pulse border border-border/50" }, i)) }) : top.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground px-1", children: "No extensions available right now. Add them later from the Hub." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2 max-h-[220px] overflow-y-auto pr-2 custom-scrollbar", children: top.map((ext) => {
      const state = installer.stateFor(ext);
      const busy = state === "installing";
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex items-center gap-3 p-3 rounded-xl bg-card border border-border/50 shadow-sm",
          children: [
            ext.icon ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: ext.icon, alt: "", className: "w-9 h-9 rounded-lg object-cover shadow-sm flex-shrink-0", loading: "lazy" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Puzzle, { className: "w-4 h-4 text-primary" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground truncate", children: ext.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground truncate", children: ext.author })
            ] }),
            ext.isFeatured && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 font-medium flex-shrink-0", children: "Official" }),
            state === "installed" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                variant: "secondary",
                size: "sm",
                className: "h-8 px-2.5 text-xs gap-1 flex-shrink-0",
                title: "Remove this extension",
                onClick: () => installer.toggle(ext),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-3.5 h-3.5" }),
                  "Added"
                ]
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                size: "sm",
                className: "h-8 px-2.5 text-xs gap-1 flex-shrink-0",
                disabled: busy,
                onClick: () => installer.toggle(ext),
                children: [
                  busy ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-3.5 h-3.5 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-3.5 h-3.5" }),
                  busy ? "Adding…" : "Add"
                ]
              }
            )
          ]
        },
        ext.id
      );
    }) })
  ] });
}
function openExternalUrl(url) {
  const bridge = window.electron;
  if (bridge == null ? void 0 : bridge.openExternal) void bridge.openExternal(url);
  else window.open(url, "_blank", "noopener,noreferrer");
}
function SetupPage() {
  const [step, setStep] = reactExports.useState(1);
  const [dir, setDir] = reactExports.useState(1);
  const [downloadPath, setDownloadPath] = reactExports.useState("");
  const [discordEnabled, setDiscordEnabled] = reactExports.useState(true);
  const [countryAck, setCountryAck] = reactExports.useState(false);
  const [enableWarp, setEnableWarp] = reactExports.useState(false);
  const [enableExtensions, setEnableExtensions] = reactExports.useState(true);
  const [tcAccepted, setTcAccepted] = reactExports.useState(false);
  const tcAcceptedRef = reactExports.useRef(false);
  tcAcceptedRef.current = tcAccepted;
  const navigate = useNavigate();
  const shouldReduceMotion = useReducedMotion();
  const countryPolicy = useCountryPolicy();
  const isMobile = Capacitor.isNativePlatform() && !!window.Capacitor;
  const isIos = isIOS();
  const isDesktop = !!window.electron;
  const totalSteps = 7;
  const randomVideoSrc = reactExports.useMemo(() => VIDEO_SOURCES[Math.floor(Math.random() * VIDEO_SOURCES.length)], []);
  reactExports.useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);
  reactExports.useEffect(() => {
    const init = async () => {
      if (isDesktop && window.electron) {
        try {
          const path = await window.electron.getDownloadsDir();
          setDownloadPath(path);
        } catch {
        }
      } else if (isMobile) {
        setDownloadPath("App Data (Internal)");
      }
    };
    init();
  }, [isDesktop, isMobile]);
  const goTo = (next) => {
    setDir(next > step ? 1 : -1);
    setStep(next);
  };
  const handleContinue = () => {
    if (step === totalSteps) handleComplete();
    else goTo(step + 1);
  };
  reactExports.useEffect(() => {
    const handler = (e) => {
      if (e.key === "Enter" && step !== totalSteps) {
        handleContinue();
      } else if (e.key === "Enter" && step === totalSteps && tcAcceptedRef.current) {
        handleComplete();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [step]);
  const handleComplete = async () => {
    var _a, _b, _c;
    if (isDesktop && !tcAcceptedRef.current) return;
    localStorage.setItem("tatakai_setup_complete", "true");
    if (isDesktop) {
      localStorage.setItem("tatakai_download_path", downloadPath);
      localStorage.setItem("tatakai_discord_rpc", String(discordEnabled));
      localStorage.setItem("tatakai_country_ack", String(countryAck));
      localStorage.setItem("tatakai_enable_warp", String(enableWarp));
      localStorage.setItem("tatakai_enable_extensions", String(enableExtensions));
      localStorage.setItem("tatakai_tc_accepted", String(tcAccepted));
      try {
        if ((_a = window.tatakaiRuntime) == null ? void 0 : _a.toggleWarp) {
          await window.tatakaiRuntime.toggleWarp(enableWarp);
          await ((_c = (_b = window.tatakaiRuntime).setWarpMode) == null ? void 0 : _c.call(_b, "auto"));
        }
      } catch {
      }
    }
    setFlag(FeatureFlag.EXTENSION_SCRAPING, enableExtensions);
    navigate("/");
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-[100dvh] overflow-x-hidden bg-background flex flex-col lg:h-screen lg:flex-row lg:overflow-hidden relative selection:bg-primary/30", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 z-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        animate: shouldReduceMotion ? {} : { opacity: [0.15, 0.25, 0.15], scale: [1, 1.05, 1] },
        transition: { duration: 8, repeat: Infinity, ease: "easeInOut" },
        className: "absolute -left-[10%] -top-[10%] w-[40vw] h-[40vw] rounded-full bg-primary/20 blur-[100px] pointer-events-none z-0"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full lg:w-[45%] xl:w-[40%] h-[100dvh] flex flex-col justify-start lg:justify-center items-center overflow-y-auto p-5 pt-[max(1.25rem,env(safe-area-inset-top))] pb-[max(1.25rem,env(safe-area-inset-bottom))] lg:h-screen lg:p-12 relative z-20 bg-background/80 backdrop-blur-3xl lg:border-r border-border/30 shadow-2xl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5 }, className: "w-full max-w-[420px]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6 sm:mb-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 mb-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              whileHover: { scale: 1.05, rotate: 2 },
              className: "w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center shadow-[0_8px_16px_hsl(var(--primary)/0.25)] border-t border-white/20 overflow-hidden",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: `${"/"}assets/logo/tatakai-logo-square.png`, alt: "Tatakai", className: "w-full h-full object-cover" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-black tracking-tight text-foreground", children: "Tatakai" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground font-medium", children: "Setup Wizard" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl font-black text-foreground mb-2 tracking-tight", children: step === 1 ? "Welcome!" : step === totalSteps ? "Almost ready." : `Step ${step} of ${totalSteps}` }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed", children: step === 1 ? "Let’s configure Tatakai for the best experience. It only takes a minute." : "You can adjust these settings later in preferences." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ProgressBar, { step, total: totalSteps }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-[360px] sm:min-h-[400px]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AnimatePresence, { mode: "wait", custom: dir, children: [
        step === 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { custom: dir, variants: slideVariants, initial: "enter", animate: "center", exit: "exit", transition: { type: "spring", stiffness: 350, damping: 30 }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { variants: containerVariants, initial: "hidden", animate: "show", className: "space-y-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(StepHeader, { stepIndex: 1 }),
          isMobile ? /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { variants: itemVariants, className: "p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-start gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 bg-emerald-500/20 rounded-xl", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-4 h-4 text-emerald-500" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm text-emerald-50", children: "App Storage" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-emerald-200/70 mt-1 leading-relaxed", children: "Downloads are safely managed inside internal app storage." })
            ] })
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { variants: itemVariants, className: "space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-semibold text-foreground ml-1", children: "Download Directory" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { whileHover: { scale: 1.01 }, className: "flex items-center gap-2 p-1.5 rounded-2xl bg-card border border-border/60 shadow-sm transition-all focus-within:border-primary/50 focus-within:ring-2 focus-within:ring-primary/20", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 bg-muted rounded-xl ml-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(HardDrive, { className: "w-4 h-4 text-muted-foreground" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 px-2 text-sm font-mono text-foreground truncate select-none", children: downloadPath || "Select a folder…" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  variant: "secondary",
                  className: "rounded-xl h-9 px-4 font-semibold hover:bg-primary hover:text-primary-foreground transition-colors",
                  onClick: async () => {
                    if (isDesktop && window.electron) {
                      const selected = await window.electron.selectDirectory();
                      if (selected) setDownloadPath(selected);
                    }
                  },
                  children: "Browse"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground flex items-center gap-1.5 ml-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-3.5 h-3.5 text-amber-500" }),
              " Requires ~2–4 GB per series in 1080p"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(NavButtons, { onNext: () => goTo(2), nextLabel: "Continue" })
        ] }) }, "s1"),
        step === 2 && /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { custom: dir, variants: slideVariants, initial: "enter", animate: "center", exit: "exit", transition: { type: "spring", stiffness: 350, damping: 30 }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { variants: containerVariants, initial: "hidden", animate: "show", className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(StepHeader, { stepIndex: 2 }),
          isMobile ? /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { variants: itemVariants, className: "p-4 rounded-2xl bg-card border border-border/50 flex items-start gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 bg-primary/10 rounded-xl", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "w-4 h-4 text-primary" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm text-foreground", children: "Mobile privacy" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1 leading-relaxed", children: "Tatakai only requests device permissions when a feature needs them, such as download notifications." })
            ] })
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ToggleRow, { icon: Disc, title: "Discord Rich Presence", desc: "Display the anime you're watching on your Discord profile", value: discordEnabled, onChange: setDiscordEnabled }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(NavButtons, { onBack: () => goTo(1), onNext: () => goTo(3) })
        ] }) }, "s2"),
        step === 3 && /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { custom: dir, variants: slideVariants, initial: "enter", animate: "center", exit: "exit", transition: { type: "spring", stiffness: 350, damping: 30 }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { variants: containerVariants, initial: "hidden", animate: "show", className: "space-y-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(StepHeader, { stepIndex: 3 }),
          isIos ? /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { variants: itemVariants, className: "rounded-2xl bg-card border border-border/50 p-5 space-y-3 shadow-inner", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { className: "w-5 h-5 text-primary" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: "Regional streaming settings" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground leading-relaxed", children: [
              "Region: ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: countryPolicy.countryName || countryPolicy.countryCode }),
              ". Tatakai will use sources available for this region."
            ] })
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { variants: itemVariants, className: "rounded-2xl bg-amber-500/10 border border-amber-500/20 p-5 space-y-4 shadow-inner", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { className: "w-5 h-5 text-amber-500" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-amber-50", children: "Local Copyright Notice" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between bg-black/20 p-3 rounded-xl border border-white/5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
                "Region: ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-foreground ml-1", children: countryPolicy.countryName || countryPolicy.countryCode })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: cn("text-[10px] px-2 py-1 rounded-md font-semibold uppercase tracking-wider", countryPolicy.badge.tone), children: countryPolicy.badge.label })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(CustomCheckbox, { checked: countryAck, onChange: setCountryAck, children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-foreground/90 leading-snug", children: "I acknowledge my local region's policies regarding torrent and peer-to-peer usage." }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(NavButtons, { onBack: () => goTo(2), onNext: () => goTo(4), nextDisabled: !isIos && !countryAck })
        ] }) }, "s3"),
        step === 4 && /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { custom: dir, variants: slideVariants, initial: "enter", animate: "center", exit: "exit", transition: { type: "spring", stiffness: 350, damping: 30 }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { variants: containerVariants, initial: "hidden", animate: "show", className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(StepHeader, { stepIndex: 4 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ToggleRow, { icon: Lock, title: "WARP / DNS over HTTPS", desc: "Enhance privacy and bypass ISP blocks with Cloudflare", value: enableWarp, onChange: setEnableWarp }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: enableWarp && /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: { opacity: 0, height: 0 }, animate: { opacity: 1, height: "auto" }, exit: { opacity: 0, height: 0 }, className: "overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3.5 mt-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-xs text-cyan-200 flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "w-4 h-4 flex-shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "WARP auto-routing will be enabled for secure connections." })
          ] }) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(NavButtons, { onBack: () => goTo(3), onNext: () => goTo(5) })
        ] }) }, "s4"),
        step === 5 && /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { custom: dir, variants: slideVariants, initial: "enter", animate: "center", exit: "exit", transition: { type: "spring", stiffness: 350, damping: 30 }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { variants: containerVariants, initial: "hidden", animate: "show", className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(StepHeader, { stepIndex: 5 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ToggleRow, { icon: Puzzle, title: "Enable Extensions", desc: "Unlock more sources using curated community add-ons", value: enableExtensions, onChange: setEnableExtensions }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: enableExtensions && /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: { opacity: 0, height: 0 }, animate: { opacity: 1, height: "auto" }, exit: { opacity: 0, height: 0 }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(SetupExtensionsList, {}) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(NavButtons, { onBack: () => goTo(4), onNext: () => goTo(6) })
        ] }) }, "s5"),
        step === 6 && /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { custom: dir, variants: slideVariants, initial: "enter", animate: "center", exit: "exit", transition: { type: "spring", stiffness: 350, damping: 30 }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { variants: containerVariants, initial: "hidden", animate: "show", className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(StepHeader, { stepIndex: 6 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { variants: itemVariants, className: "bg-card p-4 rounded-2xl border border-border/50 shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(DebridSettingsPanel, {}) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(NavButtons, { onBack: () => goTo(5), onNext: () => goTo(7) })
        ] }) }, "s6"),
        step === 7 && /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { custom: dir, variants: slideVariants, initial: "enter", animate: "center", exit: "exit", transition: { type: "spring", stiffness: 350, damping: 30 }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { variants: containerVariants, initial: "hidden", animate: "show", className: "space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(StepHeader, { stepIndex: 7 }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.button, { variants: itemVariants, whileHover: { y: -2, scale: 1.01 }, whileTap: { scale: 0.99 }, onClick: () => openExternalUrl("https://github.com/snozxyx/tatakai"), className: "w-full flex items-center gap-4 p-4 rounded-2xl bg-card border border-border/50 hover:border-amber-500/40 shadow-sm transition-all text-left group", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2.5 rounded-xl bg-amber-500/10 text-amber-400 group-hover:bg-amber-500 group-hover:text-amber-950 transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-4 h-4" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: "Star on GitHub" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Support the open-source development." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4 text-muted-foreground group-hover:text-amber-500 transition-colors" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.button, { variants: itemVariants, whileHover: { y: -2, scale: 1.01 }, whileTap: { scale: 0.99 }, onClick: () => openExternalUrl("https://discord.gg/Mt2jG5QuGP"), className: "w-full flex items-center gap-4 p-4 rounded-2xl bg-card border border-border/50 hover:border-indigo-500/40 shadow-sm transition-all text-left group", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 group-hover:bg-indigo-500 group-hover:text-indigo-50 transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "w-4 h-4" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: "Join Discord" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Get news, updates, and community help." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4 text-muted-foreground group-hover:text-indigo-500 transition-colors" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { variants: itemVariants, className: "pt-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 rounded-2xl bg-muted/40 border border-border/40", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CustomCheckbox, { checked: tcAccepted, onChange: setTcAccepted, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-foreground/90", children: [
            "I accept the",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: (e) => {
              e.preventDefault();
              openExternalUrl("https://tatakai.me/terms");
            }, className: "text-primary font-medium hover:underline underline-offset-4", children: "Terms" }),
            " ",
            "and",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: (e) => {
              e.preventDefault();
              openExternalUrl("https://tatakai.me/privacy");
            }, className: "text-primary font-medium hover:underline underline-offset-4", children: "Privacy Policy" }),
            "."
          ] }) }) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(NavButtons, { onBack: () => goTo(6), onNext: handleComplete, nextLabel: "Start Watching", nextIcon: Sparkles, nextDisabled: !tcAccepted })
        ] }) }, "s7")
      ] }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden lg:block w-[55%] xl:w-[60%] h-screen relative overflow-hidden bg-black z-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-y-0 left-0 w-48 bg-gradient-to-r from-background to-transparent z-20 pointer-events-none" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)] z-10 pointer-events-none" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("video", { autoPlay: true, muted: true, loop: true, playsInline: true, className: "absolute inset-0 w-full h-full object-cover opacity-70 scale-105", children: /* @__PURE__ */ jsxRuntimeExports.jsx("source", { src: randomVideoSrc, type: randomVideoSrc.endsWith(".webm") ? "video/webm" : "video/mp4" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-12 left-12 right-12 z-20 flex flex-col gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(motion.h2, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.6, duration: 0.8 }, className: "text-3xl lg:text-5xl font-black text-white max-w-xl leading-[1.1] tracking-tight", children: "Stream, download, and organize your anime." }) })
    ] })
  ] });
}
export {
  SetupPage as default
};
