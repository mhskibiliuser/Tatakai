import { e as useNavigate, j as jsxRuntimeExports } from "./react-vendor.CAo4XUiA.js";
import { K as useIsDesktopApp, Q as Background, S as Sidebar, bA as Badge, B as Button, j as cn } from "./index.C6yfkT5T.js";
import { M as MobileNav } from "./MobileNav.ABHzkhTQ.js";
import { u as ArrowLeft, bN as Bot, y as MessageSquare, c3 as Crown, H as Heart, j as ExternalLink, aT as Zap, aI as Star, k as Sparkles, ck as Swords, B as BookOpen, bC as Trophy, cl as Dices, aV as Shield } from "./icons.C2gBBarQ.js";
import { m as motion } from "./motion.DVGLRFCH.js";
import "./vendor.CJyRs4QS.js";
import "./tanstack.DPr3OB19.js";
import "./supabase.WuRMX5Dg.js";
import "./radix.BiK9uYXL.js";
import "./hls.BlgtCWcq.js";
import "./editor.Dxw8dtyw.js";
import "./charts.Dr1fgDJ-.js";
const BOT_INVITE_URL = "https://discord.com/oauth2/authorize?client_id=1465759908363530370&permissions=8&scope=bot%20applications.commands";
const SUPPORT_URL = "https://dsc.gg/tatakai";
const FEATURES = [
  {
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-5 h-5" }),
    title: "Gacha System",
    desc: "Pull anime characters across 6 rarity tiers. Build your dream collection with banners, pity, and fusion.",
    color: "text-yellow-400",
    bg: "bg-yellow-400/10 border-yellow-400/20"
  },
  {
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Swords, { className: "w-5 h-5" }),
    title: "1v1 PvP Battles",
    desc: "Challenge others to turn-based fights using your gacha characters. Earn coins and climb ranks.",
    color: "text-red-400",
    bg: "bg-red-400/10 border-red-400/20"
  },
  {
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-5 h-5" }),
    title: "Solo RPG Story",
    desc: "Play through 5 chapters of anime-inspired solo adventure with boss fights and loot.",
    color: "text-sky-400",
    bg: "bg-sky-400/10 border-sky-400/20"
  },
  {
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "w-5 h-5" }),
    title: "Economy & Leveling",
    desc: "Earn XP, coins, and gems. Daily rewards, streaks, a shop, gambling, and server leaderboards.",
    color: "text-emerald-400",
    bg: "bg-emerald-400/10 border-emerald-400/20"
  },
  {
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Dices, { className: "w-5 h-5" }),
    title: "Quiz & Mini-Games",
    desc: "Anime trivia, daily fortune, smash/pass, waifu wars, and more fun commands.",
    color: "text-violet-400",
    bg: "bg-violet-400/10 border-violet-400/20"
  },
  {
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-5 h-5" }),
    title: "Anime Search",
    desc: "Look up any anime or character with rich embeds. Direct links to open on Tatakai.",
    color: "text-orange-400",
    bg: "bg-orange-400/10 border-orange-400/20"
  },
  {
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-5 h-5" }),
    title: "Moderation Suite",
    desc: "Anti-spam, anti-link, warnings with auto-action, seal/exile/imprison — themed mod tools.",
    color: "text-rose-400",
    bg: "bg-rose-400/10 border-rose-400/20"
  },
  {
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-5 h-5" }),
    title: "Per-Server Settings",
    desc: "Toggle features per guild — welcome messages, auto-roles, log channels, and more.",
    color: "text-cyan-400",
    bg: "bg-cyan-400/10 border-cyan-400/20"
  }
];
const COMMANDS = [
  { name: "/anime search", desc: "Look up any anime with rich info" },
  { name: "/gacha pull", desc: "Pull a random anime character" },
  { name: "/battle challenge", desc: "Challenge someone to PvP" },
  { name: "/economy daily", desc: "Claim daily coins & gems" },
  { name: "/story play", desc: "Continue your solo RPG adventure" },
  { name: "/quiz play", desc: "Anime trivia with coin rewards" },
  { name: "/fortune", desc: "Daily anime-themed fortune" },
  { name: "/smashpass", desc: "Vote on anime characters" },
  { name: "/mod seal", desc: "Kick a user (Tatakai-style)" },
  { name: "/settings view", desc: "View guild configuration" }
];
function DiscordPage() {
  const navigate = useNavigate();
  const isDesktopApp = useIsDesktopApp();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background text-foreground overflow-x-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Background, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Sidebar, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: `relative z-10 ${isDesktopApp ? "pl-6" : "pl-6 md:pl-32"} pr-6 py-6 max-w-[1100px] mx-auto pb-28 md:pb-8`, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: () => navigate(-1),
          className: "flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4" }),
            "Back"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.4 },
          className: "relative rounded-2xl overflow-hidden mb-8 border border-white/5",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-[#5865F2]/20 via-background to-violet-900/10 pointer-events-none" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "absolute inset-0 opacity-[0.04] pointer-events-none",
                style: {
                  backgroundImage: "linear-gradient(rgba(255,255,255,.4) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.4) 1px,transparent 1px)",
                  backgroundSize: "32px 32px"
                }
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative px-8 py-12 flex flex-col md:flex-row items-center gap-8", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-shrink-0 w-24 h-24 rounded-2xl bg-gradient-to-br from-[#5865F2] to-violet-600 flex items-center justify-center shadow-2xl shadow-[#5865F2]/30", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bot, { className: "w-12 h-12 text-white" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 text-center md:text-left", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center md:justify-start gap-2 mb-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl md:text-4xl font-black tracking-tight", children: "Tatakai Bot" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-[#5865F2]/20 text-[#7289DA] border-[#5865F2]/30 text-xs", children: "v3.0" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30 text-xs flex items-center gap-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" }),
                    "Online"
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-base max-w-xl", children: "The ultimate anime Discord bot — gacha pulls, PvP battles, solo RPG, economy, trivia, moderation, and more. Built for Tatakai." }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center md:justify-start gap-6 mt-4 flex-wrap", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "w-4 h-4 text-[#5865F2]" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: "30+" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "slash commands" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Crown, { className: "w-4 h-4 text-yellow-400" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: "28" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "collectible characters" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: "w-4 h-4 text-rose-400" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: "Free" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "forever" })
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3 items-center", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    asChild: true,
                    size: "lg",
                    className: "bg-[#5865F2] hover:bg-[#4752C4] text-white font-bold px-8 shadow-lg shadow-[#5865F2]/25 transition-all duration-200 hover:scale-[1.03]",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: BOT_INVITE_URL, target: "_blank", rel: "noopener noreferrer", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "w-4 h-4 mr-2" }),
                      "Add to Server"
                    ] })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "a",
                  {
                    href: SUPPORT_URL,
                    target: "_blank",
                    rel: "noopener noreferrer",
                    className: "flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "w-3 h-3" }),
                      "Support Server"
                    ]
                  }
                )
              ] })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 16 },
            animate: { opacity: 1, y: 0 },
            transition: { delay: 0.1 },
            className: "lg:col-span-1 rounded-2xl border border-white/5 bg-white/[0.02] p-5",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-bold flex items-center gap-2 mb-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-4 h-4 text-yellow-400" }),
                "Popular Commands"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: COMMANDS.map((cmd) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "rounded-lg bg-white/[0.03] border border-white/5 px-3 py-2.5 hover:bg-white/[0.05] transition-colors",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-mono font-semibold text-[#7289DA]", children: cmd.name }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: cmd.desc })
                  ]
                },
                cmd.name
              )) })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 16 },
            animate: { opacity: 1, y: 0 },
            transition: { delay: 0.15 },
            className: "lg:col-span-2",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-bold mb-4 flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-4 h-4 text-yellow-400" }),
                "Features"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: FEATURES.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: cn(
                    "rounded-xl border p-4 flex gap-3 transition-colors hover:bg-white/[0.03]",
                    f.bg
                  ),
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("mt-0.5 flex-shrink-0", f.color), children: f.icon }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm mb-0.5", children: f.title }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground leading-relaxed", children: f.desc })
                    ] })
                  ]
                },
                f.title
              )) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 rounded-xl bg-[#5865F2]/10 border border-[#5865F2]/20 p-5 flex flex-col sm:flex-row items-center justify-between gap-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold", children: "Ready to power up your server?" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Add Tatakai Bot and unlock the full anime experience for your community." })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    asChild: true,
                    className: "bg-[#5865F2] hover:bg-[#4752C4] text-white font-bold flex-shrink-0",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: BOT_INVITE_URL, target: "_blank", rel: "noopener noreferrer", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "w-4 h-4 mr-2" }),
                      "Add Tatakai Bot"
                    ] })
                  }
                )
              ] })
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(MobileNav, {})
  ] });
}
export {
  DiscordPage as default
};
