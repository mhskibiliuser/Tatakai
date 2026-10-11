import { r as reactExports, j as jsxRuntimeExports, e as useNavigate } from "./react-vendor.CAo4XUiA.js";
import { b4 as getRankTier, b5 as getNextRankTier, b6 as RANK_TIERS, b7 as getRankImageUrl, j as cn, b8 as getRankClassForRank, b9 as getBadgeHoverClass, B as Button, u as useAuth, a2 as supabase } from "./index.C6yfkT5T.js";
import { N as Navigation } from "./navbar.BAdovWWT.js";
import { u as useGitHubRepo, a as useLatestRelease, b as useAllReleases, f as formatCompact, p as platformForAsset, G as GITHUB_REPO_URL } from "./github.DlOKo3Ni.js";
import { R as Reveal } from "./Reveal.Bcd6kfDM.js";
import { u as useReducedMotion } from "./motion.DVGLRFCH.js";
import { bA as animate, bB as stagger, bC as gsapWithCSS } from "./vendor.CJyRs4QS.js";
import { a4 as Palette, a$ as Languages, c4 as ScanSearch, c5 as PartyPopper, bC as Trophy, c6 as MessagesSquare, bR as ListOrdered, c7 as MonitorSmartphone, c8 as Server, aS as Puzzle, c9 as Boxes, ag as ShieldCheck, aA as Layers, C as CircleCheck, a6 as Lock, k as Sparkles, a8 as Clapperboard, B as BookOpen, ca as ChartColumn, c as Check, l as Magnet, cb as CloudDownload, U as Users, y as MessageSquare, aU as ListMusic, e as TrendingUp, R as RefreshCw, f as CalendarDays, H as Heart, cc as Maximize2, bE as ArrowUpRight, D as Download, v as ArrowRight, X, aJ as Play } from "./icons.C2gBBarQ.js";
import "./tanstack.DPr3OB19.js";
import "./supabase.WuRMX5Dg.js";
import "./radix.BiK9uYXL.js";
import "./hls.BlgtCWcq.js";
import "./editor.Dxw8dtyw.js";
import "./charts.Dr1fgDJ-.js";
function ShowcaseMedia({
  type,
  src,
  poster,
  label,
  className = "",
  ratio = "16 / 9",
  focus = "center top"
}) {
  const reduceMotion = useReducedMotion();
  const containerRef = reactExports.useRef(null);
  const videoRef = reactExports.useRef(null);
  const [shouldLoad, setShouldLoad] = reactExports.useState(type !== "video");
  const [inView, setInView] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (type !== "video") return;
    const el = containerRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          setInView(true);
        } else {
          setInView(false);
        }
      },
      { threshold: 0.35, rootMargin: "200px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [type]);
  reactExports.useEffect(() => {
    const v = videoRef.current;
    if (!v || type !== "video" || reduceMotion) return;
    if (inView && shouldLoad) {
      const p = v.play();
      if (p && typeof p.catch === "function") p.catch(() => {
      });
    } else {
      v.pause();
    }
  }, [inView, shouldLoad, type, reduceMotion]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      ref: containerRef,
      className: `group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] shadow-[0_24px_70px_-24px_rgba(0,0,0,0.85)] backdrop-blur-md transition-transform duration-500 will-change-transform hover:scale-[1.015] ${className}`,
      style: { aspectRatio: ratio },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute -inset-px z-0 rounded-2xl bg-gradient-to-br from-violet-500/20 via-transparent to-cyan-500/20 opacity-40 transition-opacity duration-500 group-hover:opacity-100" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute inset-x-0 top-0 z-20 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" }),
        type === "video" ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          "video",
          {
            ref: videoRef,
            src: shouldLoad ? src : void 0,
            muted: true,
            loop: true,
            playsInline: true,
            preload: "none",
            poster,
            controls: !!reduceMotion,
            "aria-label": label,
            className: "relative z-10 h-full w-full object-cover",
            style: { objectPosition: focus }
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src,
            alt: label,
            loading: "lazy",
            decoding: "async",
            className: "relative z-10 h-full w-full object-cover",
            style: { objectPosition: focus }
          }
        )
      ]
    }
  );
}
const extras = [
  { icon: Palette, title: "25+ themes", body: "Light, dark, and accented looks — plus a Lite mode that keeps low-end devices smooth.", accent: "text-violet-300" },
  { icon: Languages, title: "Dubs in 13 languages", body: "German, French, Hindi, Telugu, Malayalam and more, pulled from 30+ servers.", accent: "text-cyan-300" },
  { icon: ScanSearch, title: "Search by screenshot", body: "Recognize any scene with image search powered by trace.moe.", accent: "text-pink-300" },
  { icon: PartyPopper, title: "Watch2Together", body: "Host sync watch parties and react in real time with friends.", accent: "text-amber-300" },
  { icon: Trophy, title: "Ranks & leaderboards", body: "Climb the ranks, collect badges, and top the contributor board.", accent: "text-emerald-300" },
  { icon: MessagesSquare, title: "Forums & threads", body: "Reddit-style threaded discussions for every corner of anime.", accent: "text-violet-300" },
  { icon: ListOrdered, title: "Tier lists", body: "Build, rank, and share your definitive takes.", accent: "text-cyan-300" },
  { icon: MonitorSmartphone, title: "Web, desktop & mobile", body: "Pick up on the browser, the desktop app, or Android (soon).", accent: "text-pink-300" },
  { icon: Server, title: "Community servers", body: "Add moderated, fan-run video servers to widen your sources.", accent: "text-amber-300" }
];
const marquee = [
  "13 dub languages",
  "30+ servers",
  "25+ themes",
  "Web",
  "Desktop",
  "Android soon",
  "trace.moe search",
  "Watch parties",
  "Tier lists",
  "Forums",
  "Leaderboards",
  "Playlists",
  "MAL & AniList sync",
  "Lite mode"
];
function MoreFeatures() {
  const reduceMotion = useReducedMotion();
  const gridRef = reactExports.useRef(null);
  const marqueeRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    const el = gridRef.current;
    if (!el) return;
    const cards = Array.from(el.querySelectorAll("[data-extra]"));
    if (!cards.length) return;
    if (reduceMotion) {
      cards.forEach((c) => {
        c.style.opacity = "1";
        c.style.transform = "none";
      });
      return;
    }
    let played = false;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || played) return;
        played = true;
        animate(cards, {
          opacity: [0, 1],
          translateY: [28, 0],
          scale: [0.96, 1],
          delay: stagger(65, { grid: [3, 3], from: "first" }),
          duration: 700,
          ease: "out(3)"
        });
        io.disconnect();
      },
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduceMotion]);
  reactExports.useEffect(() => {
    const track = marqueeRef.current;
    if (!track || reduceMotion) return;
    const ctx = gsapWithCSS.context(() => {
      gsapWithCSS.to(track, { xPercent: -50, ease: "none", duration: 28, repeat: -1 });
    });
    return () => ctx.revert();
  }, [reduceMotion]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "py-16 lg:py-24", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-12 max-w-2xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-[clamp(1.9rem,4vw,3.25rem)] font-medium leading-[1.02] tracking-[-0.03em] text-white", children: "There’s even more inside" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-base leading-relaxed text-white/55 lg:text-lg", children: "The showcase only scratches the surface — here’s a little of what else is waiting once you’re in." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: gridRef, className: "grid gap-5 sm:grid-cols-2 lg:grid-cols-3", children: extras.map((f) => {
      const Icon = f.icon;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          "data-extra": true,
          style: reduceMotion ? void 0 : { opacity: 0 },
          className: "group rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-md transition-colors duration-300 hover:border-white/25 hover:bg-white/[0.05]",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: `h-5 w-5 ${f.accent}` }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mb-2 font-display text-lg font-medium text-white", children: f.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm leading-relaxed text-white/55", children: f.body })
          ]
        },
        f.title
      );
    }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mt-12 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] py-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-black to-transparent" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-black to-transparent" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          ref: marqueeRef,
          className: `flex items-center gap-6 ${reduceMotion ? "flex-wrap justify-center px-6" : "w-max"}`,
          children: (reduceMotion ? marquee : [...marquee, ...marquee]).map((label, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-3 whitespace-nowrap text-sm font-medium text-white/70", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-br from-violet-400 to-cyan-400" }),
            label
          ] }, i))
        }
      )
    ] })
  ] });
}
const BRAND$1 = "/assets/brand";
const sources = [
  { icon: Boxes, name: "Multi-source library", kind: "Anime · Manga", accent: "text-violet-300" },
  { icon: Palette, name: "Custom themes", kind: "Appearance", accent: "text-cyan-300" },
  { icon: ShieldCheck, name: "Moderated & trusted", kind: "Safety gate", accent: "text-emerald-300" },
  { icon: Layers, name: "Stack several at once", kind: "Priority routing", accent: "text-pink-300" }
];
function Extensions() {
  const reduceMotion = useReducedMotion();
  const listRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    const rows = Array.from(el.querySelectorAll("[data-ext]"));
    if (!rows.length) return;
    if (reduceMotion) {
      rows.forEach((r) => {
        r.style.opacity = "1";
        r.style.transform = "none";
      });
      return;
    }
    let played = false;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || played) return;
        played = true;
        animate(rows, {
          opacity: [0, 1],
          translateY: [20, 0],
          delay: stagger(90),
          duration: 620,
          ease: "out(3)"
        });
        io.disconnect();
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduceMotion]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "py-16 lg:py-24", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid items-center gap-8 lg:grid-cols-2 lg:gap-16", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { className: "lg:order-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShowcaseMedia, { type: "video", src: `${BRAND$1}/extension.mp4`, label: "Extensions — preview" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { className: "lg:order-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 backdrop-blur-md", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Puzzle, { className: "h-3.5 w-3.5 text-violet-300" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium text-white/70", children: "Extensions" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mb-4 font-display text-[clamp(1.6rem,3vw,2.5rem)] font-medium leading-[1.05] tracking-[-0.03em] text-white", children: "Your sources, your way" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-6 max-w-md text-base leading-relaxed text-white/60", children: "Tatakai is built around extensions. Add the sources you want, theme the app to taste, and run several at once — nothing is hard-wired, and everything stays in your hands." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "flex flex-wrap gap-2", children: ["Custom sources", "Themeable", "Community-built", "Multi-source"].map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: "rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70", children: p }, p)) })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: listRef, className: "mt-10 grid gap-3 sm:grid-cols-2 lg:mt-12 lg:grid-cols-4", children: sources.map((s) => {
      const Icon = s.icon;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          "data-ext": true,
          style: reduceMotion ? void 0 : { opacity: 0 },
          className: "flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur-md transition-colors duration-300 hover:border-white/25 hover:bg-white/[0.05]",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: `h-5 w-5 ${s.accent}` }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate font-display text-sm font-medium text-white", children: s.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate text-xs text-white/50", children: s.kind })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-2 w-2 shrink-0 rounded-full bg-emerald-400 shadow-[0_0_10px_2px_rgba(52,211,153,0.5)]" })
          ]
        },
        s.name
      );
    }) })
  ] });
}
const PREVIEW_SCORE = 1500;
function Progression() {
  const reduceMotion = useReducedMotion();
  const rootRef = reactExports.useRef(null);
  const barRef = reactExports.useRef(null);
  const current = getRankTier(PREVIEW_SCORE);
  const next = getNextRankTier(PREVIEW_SCORE);
  const pct = next ? Math.min(100, Math.round(next.progress / (next.progress + next.needed) * 100)) : 100;
  const unlockedCount = RANK_TIERS.filter((t) => PREVIEW_SCORE >= t.minScore).length;
  reactExports.useEffect(() => {
    const root = rootRef.current;
    const bar = barRef.current;
    if (!root) return;
    const chips = Array.from(root.querySelectorAll("[data-badge]"));
    if (reduceMotion) {
      chips.forEach((c) => {
        c.style.opacity = "1";
        c.style.transform = "none";
      });
      return;
    }
    let played = false;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || played) return;
        played = true;
        if (bar) {
          gsapWithCSS.fromTo(
            bar,
            { scaleX: 0, transformOrigin: "left" },
            { scaleX: 1, transformOrigin: "left", duration: 1.4, ease: "power3.out" }
          );
        }
        if (chips.length) {
          animate(chips, {
            opacity: [0, 1],
            translateY: [16, 0],
            scale: [0.7, 1],
            delay: stagger(45),
            duration: 520,
            ease: "out(4)"
          });
        }
        io.disconnect();
      },
      { threshold: 0.3 }
    );
    io.observe(root);
    return () => io.disconnect();
  }, [reduceMotion]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-16 lg:py-24", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid items-center gap-8 lg:grid-cols-2 lg:gap-16", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 backdrop-blur-md", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "h-3.5 w-3.5 text-amber-300" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium text-white/70", children: "Progression" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mb-4 font-display text-[clamp(1.6rem,3vw,2.5rem)] font-medium leading-[1.05] tracking-[-0.03em] text-white", children: "Every episode counts" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-6 max-w-md text-base leading-relaxed text-white/60", children: "One rank climbs as you watch and read across the whole app — anime, manga, manhwa and comics all feed the same score. Sixteen tiers, each with its own effect, and a leaderboard to prove it." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "flex flex-wrap gap-2", children: ["16 ranks", "One unified score", "Per-rank effects", "Leaderboards"].map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: "rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70", children: p }, p)) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: rootRef, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-md lg:p-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6 flex items-center gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative shrink-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 rounded-full bg-primary/20 blur-xl" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: getRankImageUrl(current.rank),
              alt: current.name,
              className: "relative z-10 h-16 w-16 object-contain drop-shadow-xl"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-0.5 text-[10px] font-semibold uppercase tracking-widest text-white/50", children: "Current rank" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: cn("font-display text-2xl font-bold tracking-tight", getRankClassForRank(current.rank)), children: current.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-mono text-xs text-white/40", children: [
            "Rank ",
            current.rank,
            " / 16 · ",
            PREVIEW_SCORE.toLocaleString(),
            " RP"
          ] })
        ] })
      ] }),
      next && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6 space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-xs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-white/55", children: [
            "Progress to ",
            next.tier.name
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-white/45", children: [
            next.needed,
            " RP left"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2 w-full overflow-hidden rounded-full bg-white/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            ref: barRef,
            style: { width: `${pct}%`, transformOrigin: "left", transform: reduceMotion ? "scaleX(1)" : "scaleX(0)" },
            className: "h-full rounded-full bg-gradient-to-r from-violet-400 via-pink-400 to-cyan-400"
          }
        ) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-3 flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "h-4 w-4 text-amber-300/80" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-sm font-medium text-white", children: "Rank badges" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-white/40", children: [
          unlockedCount,
          " / 16"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-8 gap-2", children: RANK_TIERS.map((tier) => {
        const unlocked = PREVIEW_SCORE >= tier.minScore;
        const isCurrent = tier.rank === current.rank;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            "data-badge": true,
            title: `${tier.name} — ${tier.minScore.toLocaleString()} RP`,
            style: reduceMotion ? void 0 : { opacity: 0 },
            className: cn(
              "group relative flex items-center justify-center rounded-lg border p-1.5 transition-colors duration-300",
              unlocked ? cn("border-white/10 bg-white/[0.04]", getBadgeHoverClass(tier.rank)) : "border-white/[0.04] bg-white/[0.01] opacity-45",
              isCurrent && "border-primary/40 bg-primary/[0.06] opacity-100 ring-1 ring-primary/30"
            ),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: getRankImageUrl(tier.rank),
                  alt: tier.name,
                  className: cn("h-8 w-8 object-contain", !unlocked && "grayscale")
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute -bottom-1 -right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full border bg-black", children: unlocked ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-2.5 w-2.5 text-emerald-400" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "h-2 w-2 text-white/50" }) })
            ]
          },
          tier.rank
        );
      }) })
    ] }) })
  ] }) });
}
const BRAND = "/assets/brand";
const flagships = [
  {
    icon: Sparkles,
    kicker: "Recommendations",
    title: "Picks that actually get you",
    body: "A hybrid recommendation engine learns from everything you watch and read, then surfaces the next thing worth your time — without the endless scrolling.",
    points: ["Personalized daily", "Learns as you go", "Anime & manga"],
    media: `https://res.cloudinary.com/hgytxblu/video/upload/v1791138049/Recommendation.mp4`,
    accent: "text-violet-200",
    glow: "bg-violet-500/20"
  },
  {
    icon: Clapperboard,
    kicker: "Video player",
    title: "Built for how you watch",
    body: "Drop in your own subtitles, switch tracks mid-scene, and keep an episode running in the background while you browse.",
    points: ["Custom subtitles", "Adaptive quality", "Background playback"],
    media: `https://res.cloudinary.com/hgytxblu/video/upload/v1791138043/Videoplayer.mp4`,
    accent: "text-cyan-200",
    glow: "bg-cyan-500/20"
  },
  {
    icon: BookOpen,
    kicker: "Manga reader",
    title: "Read the way you like",
    body: "A fast, comic-style reader with per-device settings, custom keybinds, and progress that follows you across every session.",
    points: ["Custom keybinds", "Saved progress", "Manga · Manhwa · Comics"],
    media: `https://res.cloudinary.com/hgytxblu/video/upload/v1791138030/MangaReader.mp4`,
    accent: "text-pink-200",
    glow: "bg-pink-500/20"
  },
  {
    icon: ChartColumn,
    kicker: "Profile & stats",
    title: "Your taste, in numbers",
    body: "Activity heatmaps, taste breakdowns, and rich insights that turn your history into a profile worth following.",
    points: ["Activity heatmaps", "Taste breakdown", "Shareable profile"],
    media: `https://res.cloudinary.com/hgytxblu/video/upload/v1791138031/Profile_with_stats.mp4`,
    accent: "text-amber-200",
    glow: "bg-amber-500/20"
  }
];
const offline = [
  {
    icon: Magnet,
    title: "Torrent streaming",
    body: "Stream torrents straight through the app — no separate client to manage.",
    media: `https://res.cloudinary.com/hgytxblu/video/upload/v1791138030/Torrent.mp4`,
    tag: "Stream instantly"
  },
  {
    icon: CloudDownload,
    title: "Download anime",
    body: "Save episodes for the flight, the commute, or unreliable Wi-Fi.",
    media: `https://res.cloudinary.com/hgytxblu/video/upload/v1791138041/Animedownload.mp4`,
    tag: "Watch offline"
  },
  {
    icon: CloudDownload,
    title: "Download manga",
    body: "Take whole series offline and read directly from your library.",
    media: `https://res.cloudinary.com/hgytxblu/video/upload/v1791138041/Mangadownload.mp4`,
    tag: "Read anywhere"
  }
];
const community = [
  {
    icon: Users,
    title: "A feed that feels alive",
    img: `${BRAND}/Community.png`,
    eyebrow: "Social feed",
    layout: "col-span-2 row-span-2",
    featured: true
  },
  {
    icon: ChartColumn,
    title: "Profiles worth following",
    img: `${BRAND}/Profile.png`,
    eyebrow: "Profiles",
    layout: "col-span-2"
  },
  {
    icon: MessageSquare,
    title: "Discuss every episode",
    img: `${BRAND}/Comment.png`,
    eyebrow: "Conversations",
    layout: ""
  },
  {
    icon: ListMusic,
    title: "Curate & share playlists",
    img: `${BRAND}/Playlist.png`,
    eyebrow: "Collections",
    layout: ""
  },
  {
    icon: TrendingUp,
    title: "See what's trending",
    img: `${BRAND}/Trending.png`,
    eyebrow: "Discover",
    layout: ""
  },
  {
    icon: RefreshCw,
    title: "Sync your anime history",
    img: `${BRAND}/integration.png`,
    eyebrow: "Integrations",
    layout: ""
  },
  {
    icon: CalendarDays,
    title: "Track your anime journey",
    img: `${BRAND}/Calendar.png`,
    eyebrow: "Calendar",
    layout: ""
  },
  {
    icon: Trophy,
    title: "Build your own tier lists",
    img: `${BRAND}/Tierlist.png`,
    eyebrow: "Tier lists",
    layout: ""
  },
  {
    icon: Heart,
    title: "Keep your favorites close",
    img: `${BRAND}/Favorites.png`,
    eyebrow: "Favorites",
    layout: ""
  }
];
function SectionHeading({
  id,
  eyebrow,
  title,
  sub
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-12 max-w-3xl lg:mb-16", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-5 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-violet-200/80", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-px w-8 bg-violet-300/60" }),
      eyebrow
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "h2",
      {
        id,
        className: "font-display text-[clamp(2rem,4.2vw,3.5rem)] font-medium leading-[0.98] tracking-[-0.045em] text-white",
        children: title
      }
    ),
    sub ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-5 max-w-2xl text-base leading-relaxed text-white/55 lg:text-lg", children: sub }) : null
  ] });
}
function FeatureShowcase() {
  const navigate = useNavigate();
  const [previewTile, setPreviewTile] = reactExports.useState(null);
  reactExports.useEffect(() => {
    if (!previewTile) return;
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setPreviewTile(null);
      }
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [previewTile]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative isolate w-full overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pointer-events-none absolute inset-0 -z-10 overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute left-[-14%] top-[4%] h-[480px] w-[480px] rounded-full bg-violet-600/10 blur-[150px]" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute right-[-12%] top-[31%] h-[560px] w-[560px] rounded-full bg-pink-500/10 blur-[170px]" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-[6%] left-[25%] h-[500px] w-[500px] rounded-full bg-cyan-500/10 blur-[160px]" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mx-auto w-full max-w-[1440px] px-6 pb-28 pt-8 lg:px-16", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "section",
        {
          className: "py-16 lg:py-28",
          "aria-labelledby": "flagship-features-heading",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              SectionHeading,
              {
                id: "flagship-features-heading",
                eyebrow: "The complete experience",
                title: "Everything anime & manga, done right",
                sub: "One app for discovering, watching, reading, and keeping track — designed to stay out of your way."
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-6 lg:space-y-8", children: flagships.map((feature, index) => {
              const Icon = feature.icon;
              const reversed = index % 2 === 1;
              return /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { delay: index * 0.04, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "group relative overflow-hidden rounded-[30px] border border-white/[0.1] bg-[#0d0c13]/80 shadow-[0_32px_90px_-45px_rgba(0,0,0,0.95)]", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: `pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full blur-[100px] transition-opacity duration-700 group-hover:opacity-100 ${feature.glow}`
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative grid overflow-hidden lg:grid-cols-[0.9fr_1.1fr]", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      className: `relative overflow-hidden p-7 sm:p-10 lg:p-12 ${reversed ? "lg:order-2" : ""}`,
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "span",
                          {
                            "aria-hidden": "true",
                            className: "pointer-events-none absolute -right-1 top-1 font-display text-7xl font-semibold tracking-[-0.08em] text-white/[0.035] sm:text-8xl",
                            children: [
                              "0",
                              index + 1
                            ]
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-7 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.045] px-3 py-1.5 backdrop-blur-md", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              Icon,
                              {
                                className: `h-3.5 w-3.5 ${feature.accent}`
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium text-white/70", children: feature.kicker })
                          ] }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "max-w-md font-display text-[clamp(1.7rem,3vw,2.75rem)] font-medium leading-[1.02] tracking-[-0.04em] text-white", children: feature.title }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-5 max-w-md text-base leading-relaxed text-white/58", children: feature.body }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "ul",
                            {
                              "aria-label": `${feature.title} capabilities`,
                              className: "mt-7 grid gap-2 sm:grid-cols-2",
                              children: feature.points.map((point) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                                "li",
                                {
                                  className: "flex items-center gap-2 text-sm text-white/70",
                                  children: [
                                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.05]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                                      Check,
                                      {
                                        className: `h-3 w-3 ${feature.accent}`
                                      }
                                    ) }),
                                    point
                                  ]
                                },
                                point
                              ))
                            }
                          )
                        ] })
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      className: `relative flex items-center border-t border-white/[0.08] bg-black/10 p-3 sm:p-4 lg:border-t-0 ${reversed ? "lg:order-1 lg:border-r" : "lg:border-l"}`,
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.035] to-transparent" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            ShowcaseMedia,
                            {
                              type: "video",
                              src: feature.media,
                              label: `${feature.title} — preview`,
                              className: "rounded-[18px] border-white/10 bg-black/30 shadow-2xl"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute bottom-4 left-4 rounded-full border border-white/10 bg-black/45 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-white/60 backdrop-blur-md", children: "Feature preview" })
                        ] })
                      ]
                    }
                  )
                ] })
              ] }) }, feature.title);
            }) })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "section",
        {
          className: "border-t border-white/[0.08] py-16 lg:py-28",
          "aria-labelledby": "offline-heading",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              SectionHeading,
              {
                id: "offline-heading",
                eyebrow: "Take it with you",
                title: "Watch and read anywhere — even offline",
                sub: "Stream from torrents, or download whole series and take them with you."
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-5 md:grid-cols-3", children: offline.map((card, index) => {
              const Icon = card.icon;
              return /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { delay: index * 0.08, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "group h-full overflow-hidden rounded-2xl border border-white/[0.1] bg-white/[0.035] shadow-[0_20px_60px_-35px_rgba(0,0,0,0.9)] transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.055]", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative overflow-hidden border-b border-white/[0.08] p-2.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "transition-transform duration-700 group-hover:scale-[1.025]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    ShowcaseMedia,
                    {
                      type: "video",
                      src: card.media,
                      label: `${card.title} — preview`,
                      ratio: "16 / 10",
                      className: "rounded-[14px] border-0 shadow-none"
                    }
                  ) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute left-5 top-5 rounded-full border border-white/10 bg-black/50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/70 backdrop-blur-md", children: card.tag })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-h-[150px] flex-col p-5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-3 flex items-center gap-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex h-9 w-9 items-center justify-center rounded-xl border border-violet-300/15 bg-violet-400/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-4 w-4 text-violet-200" }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg font-medium tracking-[-0.02em] text-white", children: card.title })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm leading-relaxed text-white/55", children: card.body })
                ] })
              ] }) }, card.title);
            }) })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "section",
        {
          className: "border-t border-white/[0.08] py-16 lg:py-28",
          "aria-labelledby": "community-heading",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              SectionHeading,
              {
                id: "community-heading",
                eyebrow: "More than a library",
                title: "Built for the community",
                sub: "Follow people, talk about what you're into, and bring your MyAnimeList or AniList history along."
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "\n              grid\n              auto-rows-[155px]\n              grid-cols-2\n              gap-3.5\n              sm:auto-rows-[185px]\n              sm:gap-4\n              lg:auto-rows-[200px]\n              lg:gap-5\n            ",
                children: community.map((tile, index) => {
                  const Icon = tile.icon;
                  return /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Reveal,
                    {
                      delay: index % 4 * 0.05,
                      className: tile.layout,
                      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "button",
                        {
                          type: "button",
                          "aria-label": `Preview ${tile.title}`,
                          onClick: () => setPreviewTile(tile),
                          className: "\n                      group\n                      relative\n                      block\n                      h-full\n                      w-full\n                      cursor-zoom-in\n                      overflow-hidden\n                      rounded-[22px]\n                      border\n                      border-white/[0.1]\n                      bg-[#0d0c13]\n                      text-left\n                      shadow-[0_20px_65px_-35px_rgba(0,0,0,0.9)]\n                      outline-none\n                      transition-all\n                      duration-500\n                      hover:-translate-y-1\n                      hover:border-white/[0.18]\n                      hover:shadow-[0_30px_80px_-30px_rgba(0,0,0,0.95)]\n                      focus-visible:ring-2\n                      focus-visible:ring-violet-300/60\n                      focus-visible:ring-offset-2\n                      focus-visible:ring-offset-[#08070c]\n                    ",
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "img",
                              {
                                src: tile.img,
                                alt: tile.title,
                                loading: index < 2 ? "eager" : "lazy",
                                decoding: "async",
                                draggable: false,
                                sizes: tile.featured ? "(max-width: 1024px) 100vw, 50vw" : tile.layout.includes("col-span-2") ? "(max-width: 1024px) 100vw, 50vw" : "(max-width: 1024px) 50vw, 25vw",
                                className: "\n                        absolute\n                        inset-0\n                        h-full\n                        w-full\n                        object-cover\n                        object-top\n                        opacity-[0.9]\n                        transition-all\n                        duration-700\n                        ease-[cubic-bezier(0.22,1,0.36,1)]\n                        group-hover:scale-[1.045]\n                        group-hover:opacity-100\n                      "
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-black/[0.08]" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "div",
                              {
                                className: "\n                        absolute\n                        inset-0\n                        bg-gradient-to-t\n                        from-[#050509]\n                        via-[#050509]/35\n                        to-transparent\n                        opacity-95\n                      "
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "div",
                              {
                                className: "\n                        pointer-events-none\n                        absolute\n                        inset-0\n                        bg-[radial-gradient(circle_at_15%_0%,rgba(167,139,250,0.16),transparent_42%)]\n                        opacity-60\n                        transition-opacity\n                        duration-500\n                        group-hover:opacity-100\n                      "
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "div",
                              {
                                className: "\n                        pointer-events-none\n                        absolute\n                        inset-0\n                        rounded-[22px]\n                        ring-1\n                        ring-inset\n                        ring-white/[0.04]\n                        transition-all\n                        duration-500\n                        group-hover:ring-violet-200/[0.12]\n                      "
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-x-0 top-0 flex items-start justify-between p-4 sm:p-5", children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                                "div",
                                {
                                  className: "\n                          inline-flex\n                          items-center\n                          gap-2\n                          rounded-full\n                          border\n                          border-white/[0.12]\n                          bg-black/[0.36]\n                          px-2.5\n                          py-1.5\n                          backdrop-blur-xl\n                          shadow-[0_8px_24px_rgba(0,0,0,0.2)]\n                        ",
                                  children: [
                                    /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-3.5 w-3.5 text-white/85" }),
                                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "max-w-[150px] truncate text-[9px] font-semibold uppercase tracking-[0.15em] text-white/70 sm:text-[10px]", children: tile.eyebrow })
                                  ]
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "span",
                                {
                                  className: "\n                          flex\n                          h-8\n                          w-8\n                          items-center\n                          justify-center\n                          rounded-full\n                          border\n                          border-white/[0.12]\n                          bg-black/[0.3]\n                          text-white/65\n                          opacity-0\n                          translate-y-1\n                          backdrop-blur-xl\n                          transition-all\n                          duration-300\n                          group-hover:translate-y-0\n                          group-hover:opacity-100\n                        ",
                                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Maximize2, { className: "h-3.5 w-3.5" })
                                }
                              )
                            ] }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-x-0 bottom-0 p-4 sm:p-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end justify-between gap-4", children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-2 flex items-center gap-2", children: [
                                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-1 w-1 rounded-full bg-white/50" }),
                                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] font-medium uppercase tracking-[0.16em] text-white/45", children: "Tatakai community" })
                                ] }),
                                /* @__PURE__ */ jsxRuntimeExports.jsx(
                                  "h3",
                                  {
                                    className: `font-display font-medium leading-[1.05] tracking-[-0.03em] text-white ${tile.featured ? "max-w-xl text-xl sm:text-2xl lg:text-[2rem]" : tile.layout.includes("col-span-2") ? "max-w-md text-lg sm:text-xl" : "max-w-[95%] text-sm sm:text-base"}`,
                                    children: tile.title
                                  }
                                )
                              ] }),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "span",
                                {
                                  className: "\n                            hidden\n                            h-9\n                            w-9\n                            shrink-0\n                            items-center\n                            justify-center\n                            rounded-full\n                            border\n                            border-white/[0.12]\n                            bg-white/[0.07]\n                            text-white/70\n                            backdrop-blur-xl\n                            transition-all\n                            duration-300\n                            group-hover:translate-x-0.5\n                            group-hover:bg-white/[0.12]\n                            sm:flex\n                          ",
                                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { className: "h-4 w-4" })
                                }
                              )
                            ] }) }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "div",
                              {
                                className: "\n                        pointer-events-none\n                        absolute\n                        inset-y-0\n                        -left-1/2\n                        w-1/3\n                        -skew-x-12\n                        bg-white/[0.04]\n                        opacity-0\n                        blur-2xl\n                        transition-all\n                        duration-700\n                        group-hover:left-[115%]\n                        group-hover:opacity-100\n                      "
                              }
                            )
                          ]
                        }
                      )
                    },
                    `${tile.title}-${index}`
                  );
                })
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-t border-white/[0.08]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Extensions, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-t border-white/[0.08]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Progression, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-t border-white/[0.08]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MoreFeatures, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "border-t border-white/[0.08] py-16 lg:py-28", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative overflow-hidden rounded-[32px] border border-white/[0.12] bg-[#0c0b12] px-6 py-12 text-center shadow-[0_35px_100px_-45px_rgba(0,0,0,1)] sm:px-10 lg:px-16 lg:py-20", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-500/25 blur-[100px]" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-cyan-500/15 blur-[100px]" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute -left-24 -top-24 h-64 w-64 rounded-full bg-pink-500/10 blur-[100px]" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mx-auto max-w-2xl", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-3 py-1.5 text-xs font-medium text-white/70 backdrop-blur-md", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-1.5 w-1.5 rounded-full bg-emerald-300 shadow-[0_0_12px_rgba(110,231,183,0.9)]" }),
            "Ready when you are"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-[clamp(2rem,4vw,3.4rem)] font-medium leading-[1] tracking-[-0.045em] text-white", children: "Up and running in minutes" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/60 lg:text-lg", children: "Install the app, sign in, and pick up right where you left off. Everything after setup is just watching and reading." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto mt-8 grid max-w-lg grid-cols-3 divide-x divide-white/10 rounded-2xl border border-white/[0.08] bg-white/[0.035] px-3 py-3 text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-2 text-xs font-medium text-white/60", children: "Discover" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-2 text-xs font-medium text-white/60", children: "Watch" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-2 text-xs font-medium text-white/60", children: "Read" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 flex flex-wrap items-center justify-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                size: "lg",
                onClick: () => navigate("/download"),
                className: "group h-12 rounded-full border border-white/20 bg-white px-7 text-sm font-semibold text-black shadow-[0_0_34px_-6px_rgba(255,255,255,0.45)] transition-all hover:scale-[1.02] hover:shadow-[0_0_45px_-6px_rgba(255,255,255,0.65)]",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "mr-2 h-4 w-4" }),
                  "Download app",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                size: "lg",
                variant: "outline",
                onClick: () => navigate("/browse"),
                className: "h-12 rounded-full border border-white/15 bg-white/[0.05] px-7 text-sm font-semibold text-white backdrop-blur-md transition-all hover:border-white/30 hover:bg-white hover:text-black",
                children: "Browse the library"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-6 text-xs text-white/40", children: "Free & open source — no account required to look around." })
        ] })
      ] }) }) })
    ] }),
    previewTile && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "\n            fixed\n            inset-0\n            z-[9999]\n            flex\n            items-center\n            justify-center\n            bg-black/80\n            p-4\n            backdrop-blur-2xl\n            sm:p-6\n          ",
        role: "dialog",
        "aria-modal": "true",
        "aria-label": `${previewTile.title} image preview`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              "aria-label": "Close image preview",
              className: "absolute inset-0 h-full w-full cursor-default",
              onPointerDown: (event) => {
                event.preventDefault();
                setPreviewTile(null);
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "\n              pointer-events-none\n              absolute\n              left-1/2\n              top-1/2\n              h-[55vh]\n              w-[55vw]\n              -translate-x-1/2\n              -translate-y-1/2\n              rounded-full\n              bg-violet-500/[0.08]\n              blur-[120px]\n            "
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              "aria-label": "Close image preview",
              onPointerDown: (event) => {
                event.preventDefault();
                event.stopPropagation();
                setPreviewTile(null);
              },
              className: "\n              absolute\n              right-4\n              top-4\n              z-[10001]\n              flex\n              h-11\n              w-11\n              cursor-pointer\n              items-center\n              justify-center\n              rounded-full\n              border\n              border-white/[0.14]\n              bg-black/50\n              text-white/75\n              shadow-[0_12px_40px_rgba(0,0,0,0.45)]\n              backdrop-blur-xl\n              transition-all\n              duration-200\n              hover:scale-105\n              hover:border-white/25\n              hover:bg-white/10\n              hover:text-white\n              active:scale-95\n              focus:outline-none\n              focus-visible:ring-2\n              focus-visible:ring-violet-300/70\n              sm:right-6\n              sm:top-6\n            ",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-5 w-5", strokeWidth: 2 })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "\n              relative\n              z-[10000]\n              w-full\n              max-w-6xl\n              overflow-hidden\n              rounded-[28px]\n              border\n              border-white/[0.12]\n              bg-[#09090d]/95\n              p-2\n              shadow-[0_40px_120px_-35px_rgba(0,0,0,0.95)]\n              sm:p-3\n            ",
              onPointerDown: (event) => {
                event.stopPropagation();
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "\n                relative\n                flex\n                min-h-[55vh]\n                items-center\n                justify-center\n                overflow-hidden\n                rounded-[21px]\n                border\n                border-white/[0.06]\n                bg-black/40\n              ",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "img",
                        {
                          src: previewTile.img,
                          alt: previewTile.title,
                          className: "\n                  max-h-[78vh]\n                  max-w-full\n                  select-none\n                  object-contain\n                ",
                          draggable: false
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-4 px-3 pb-2 pt-4 sm:px-4 sm:pb-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-1.5 flex items-center gap-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-1 w-1 rounded-full bg-violet-300" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate text-[9px] font-semibold uppercase tracking-[0.16em] text-violet-200/70", children: previewTile.eyebrow })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "truncate font-display text-lg font-medium tracking-[-0.025em] text-white sm:text-xl", children: previewTile.title })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      className: "\n                  hidden\n                  shrink-0\n                  items-center\n                  gap-2\n                  rounded-full\n                  border\n                  border-white/[0.08]\n                  bg-white/[0.035]\n                  px-3\n                  py-2\n                  text-[10px]\n                  font-medium\n                  uppercase\n                  tracking-[0.12em]\n                  text-white/40\n                  sm:flex\n                ",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Maximize2, { className: "h-3.5 w-3.5" }),
                        "Preview"
                      ]
                    }
                  )
                ] })
              ]
            }
          )
        ]
      }
    )
  ] });
}
const words = ["explore", "discover", "immerse", "love"];
function BlurWord({ word, trigger }) {
  const letters = word.split("");
  const STAGGER = 45;
  const DURATION = 500;
  const GRADIENT_HOLD = STAGGER * letters.length + DURATION + 200;
  const [letterStates, setLetterStates] = reactExports.useState(
    letters.map(() => ({ opacity: 0, blur: 20 }))
  );
  const [showGradient, setShowGradient] = reactExports.useState(true);
  const framesRef = reactExports.useRef([]);
  const timersRef = reactExports.useRef([]);
  reactExports.useEffect(() => {
    framesRef.current.forEach(cancelAnimationFrame);
    timersRef.current.forEach(clearTimeout);
    framesRef.current = [];
    timersRef.current = [];
    setLetterStates(letters.map(() => ({ opacity: 0, blur: 20 })));
    setShowGradient(true);
    letters.forEach((_, i) => {
      const t = setTimeout(() => {
        const start = performance.now();
        const tick = (now) => {
          const progress = Math.min((now - start) / DURATION, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setLetterStates((prev) => {
            const next = [...prev];
            next[i] = { opacity: eased, blur: 20 * (1 - eased) };
            return next;
          });
          if (progress < 1) {
            const id2 = requestAnimationFrame(tick);
            framesRef.current.push(id2);
          }
        };
        const id = requestAnimationFrame(tick);
        framesRef.current.push(id);
      }, i * STAGGER);
      timersRef.current.push(t);
    });
    const gt = setTimeout(() => setShowGradient(false), GRADIENT_HOLD);
    timersRef.current.push(gt);
    return () => {
      framesRef.current.forEach(cancelAnimationFrame);
      timersRef.current.forEach(clearTimeout);
    };
  }, [trigger]);
  const gradientColors = ["#eca8d6", "#a78bfa", "#67e8f9", "#fbbf24", "#eca8d6"];
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: letters.map((char, i) => {
    var _a, _b;
    const colorIndex = i / Math.max(letters.length - 1, 1) * (gradientColors.length - 1);
    const lower = Math.floor(colorIndex);
    const upper = Math.min(lower + 1, gradientColors.length - 1);
    const t = colorIndex - lower;
    const hex2rgb = (hex) => {
      const r3 = parseInt(hex.slice(1, 3), 16);
      const g3 = parseInt(hex.slice(3, 5), 16);
      const b3 = parseInt(hex.slice(5, 7), 16);
      return [r3, g3, b3];
    };
    const [r1, g1, b1] = hex2rgb(gradientColors[lower]);
    const [r2, g2, b2] = hex2rgb(gradientColors[upper]);
    const r = Math.round(r1 + (r2 - r1) * t);
    const g = Math.round(g1 + (g2 - g1) * t);
    const b = Math.round(b1 + (b2 - b1) * t);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "span",
      {
        style: {
          display: "inline-block",
          opacity: ((_a = letterStates[i]) == null ? void 0 : _a.opacity) ?? 0,
          filter: `blur(${((_b = letterStates[i]) == null ? void 0 : _b.blur) ?? 20}px)`,
          color: showGradient ? `rgb(${r},${g},${b})` : "white",
          transition: "color 0.4s ease"
        },
        children: char
      },
      i
    );
  }) });
}
function LandingPage() {
  const [isVisible, setIsVisible] = reactExports.useState(false);
  const [wordIndex, setWordIndex] = reactExports.useState(0);
  const [mounted, setMounted] = reactExports.useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  const repo = useGitHubRepo();
  const latest = useLatestRelease();
  const releases = useAllReleases();
  const [avatars, setAvatars] = reactExports.useState([]);
  reactExports.useEffect(() => {
    let cancelled = false;
    (async () => {
      const { data } = await supabase.from("profiles").select("avatar_url").eq("is_public", true).not("avatar_url", "is", null).order("updated_at", { ascending: false }).limit(30);
      if (cancelled || !data) return;
      const urls = data.map((p) => p.avatar_url).filter((u) => !!u).sort(() => Math.random() - 0.5).slice(0, 5);
      setAvatars(urls);
    })();
    return () => {
      cancelled = true;
    };
  }, []);
  const stars = repo ? formatCompact(repo.stargazers_count) : null;
  const forks = repo ? formatCompact(repo.forks_count) : null;
  const latestVersion = (latest == null ? void 0 : latest.tag_name) ? latest.tag_name.replace(/^v/i, "") : null;
  const { latestDownloads, mobileDownloads } = releases ? releases.reduce(
    (acc, r) => {
      r.assets.forEach((a) => {
        acc.latestDownloads += a.download_count || 0;
        const k = platformForAsset(a.name);
        if (k === "android" || k === "ios") acc.mobileDownloads += a.download_count || 0;
      });
      return acc;
    },
    { latestDownloads: 0, mobileDownloads: 0 }
  ) : { latestDownloads: 0, mobileDownloads: 0 };
  const heroStats = [
    { value: stars ?? "—", label: "GitHub stars" },
    { value: latestVersion ? `v${latestVersion}` : "—", label: "latest release" },
    latestDownloads > 0 ? { value: formatCompact(latestDownloads), label: "app downloads" } : { value: forks ?? "—", label: "GitHub forks" },
    mobileDownloads > 0 ? { value: formatCompact(mobileDownloads), label: "mobile downloads" } : null
  ].filter(Boolean);
  reactExports.useEffect(() => {
    setMounted(true);
    setIsVisible(true);
  }, []);
  reactExports.useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % words.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative min-h-screen w-full overflow-hidden bg-black text-white", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative min-h-screen w-full overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pointer-events-none absolute inset-0 z-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-32 -left-32 h-[500px] w-[500px] rounded-full bg-violet-600/20 blur-[120px] animate-pulse" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-1/2 -right-32 h-[600px] w-[600px] rounded-full bg-pink-500/15 blur-[140px] animate-pulse [animation-delay:1s]" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-0 left-1/3 h-[400px] w-[400px] rounded-full bg-cyan-500/15 blur-[120px] animate-pulse [animation-delay:2s]" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 z-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "video",
          {
            autoPlay: true,
            muted: true,
            loop: true,
            playsInline: true,
            "aria-hidden": "true",
            className: "h-full w-full object-cover object-center opacity-50",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx("source", { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/bg-hero-0BnFGdr81Ifnj3WbBZoNt1KE4D5DMT.mp4", type: "video/mp4" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_black_100%)]" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "pointer-events-none absolute inset-0 z-[1] opacity-[0.03] mix-blend-overlay",
          style: {
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
          }
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pointer-events-none absolute inset-0 z-[2] overflow-hidden opacity-[0.08]", children: [
        [...Array(8)].map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute h-px w-full bg-gradient-to-r from-transparent via-white to-transparent",
            style: { top: `${12.5 * (i + 1)}%` }
          },
          `h-${i}`
        )),
        [...Array(12)].map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute h-full w-px bg-gradient-to-b from-transparent via-white to-transparent",
            style: { left: `${8.33 * (i + 1)}%` }
          },
          `v-${i}`
        ))
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative z-30", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Navigation, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "relative z-10 mx-auto flex min-h-screen w-full max-w-[1400px] flex-col justify-between px-6 pt-32 pb-10 lg:px-16", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-1 flex-col justify-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: `mb-8 inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur-md transition-all duration-700 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "relative flex h-2 w-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "relative inline-flex h-2 w-2 rounded-full bg-emerald-400" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium tracking-wide text-white/80", children: "Now in beta — v6.0 released" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-3 w-3 text-violet-300" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "h1",
            {
              className: `mb-8 max-w-4xl text-[clamp(2.4rem,6vw,5.5rem)] font-display font-medium leading-[0.95] tracking-[-0.04em] text-white transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block whitespace-nowrap text-white/60", children: "Your portal to" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block whitespace-nowrap", children: "anime & manga" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "block whitespace-nowrap", children: [
                  "you",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "relative inline-block align-baseline", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(BlurWord, { word: words[wordIndex], trigger: wordIndex }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "svg",
                      {
                        className: "absolute -bottom-2 left-0 h-3 w-full text-violet-400",
                        viewBox: "0 0 200 12",
                        fill: "none",
                        preserveAspectRatio: "none",
                        "aria-hidden": "true",
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "path",
                          {
                            d: "M2 9 Q 50 2, 100 6 T 198 5",
                            stroke: "currentColor",
                            strokeWidth: "2.5",
                            strokeLinecap: "round",
                            fill: "none"
                          }
                        )
                      }
                    )
                  ] })
                ] })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: `mb-10 max-w-xl text-base leading-relaxed text-white/60 transition-all duration-1000 delay-200 lg:text-lg ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`,
              children: "Track, discover, and curate your personal library of anime & manga. Built for fans who want a beautiful, distraction-free experience."
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: `flex flex-wrap items-center gap-4 transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    size: "lg",
                    onClick: () => navigate("/download"),
                    className: "group relative h-12 overflow-hidden rounded-full border border-white/20 bg-white px-7 text-sm font-semibold text-black shadow-[0_0_30px_-5px_rgba(255,255,255,0.4)] transition-all hover:scale-[1.02] hover:shadow-[0_0_40px_-5px_rgba(255,255,255,0.6)] cursor-pointer",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "relative z-10 flex items-center gap-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "h-4 w-4" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Download App" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4 transition-transform group-hover:translate-x-1" })
                    ] })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    size: "lg",
                    variant: "outline",
                    onClick: () => navigate("/browse"),
                    className: "h-12 rounded-full border border-white/15 bg-white/5 px-7 text-sm font-semibold text-white backdrop-blur-md transition-all hover:border-white/30 hover:bg-white/10 cursor-pointer",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "mr-2 h-4 w-4 fill-current" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Browse" })
                    ]
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: `mt-10 flex items-center gap-4 text-xs text-white/40 transition-all duration-1000 delay-500 ${isVisible ? "opacity-100" : "opacity-0"}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex -space-x-2", children: avatars.length > 0 ? avatars.map((url, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "img",
                  {
                    src: url,
                    alt: "Community member",
                    loading: "lazy",
                    className: "h-7 w-7 rounded-full border-2 border-black object-cover bg-white/10",
                    onError: (e) => {
                      e.currentTarget.style.display = "none";
                    }
                  },
                  i
                )) : ["#a78bfa", "#67e8f9", "#fbbf24", "#eca8d6"].map((c, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "h-7 w-7 rounded-full border-2 border-black",
                    style: { background: `linear-gradient(135deg, ${c}, #fff)` }
                  },
                  i
                )) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-medium", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white", children: "Free & open source" }),
                  " — join the community"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden h-3 w-px bg-white/20 sm:block" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "a",
                  {
                    href: GITHUB_REPO_URL,
                    target: "_blank",
                    rel: "noopener noreferrer",
                    className: "hidden font-mono transition-colors hover:text-white sm:inline",
                    children: [
                      "★ ",
                      stars ?? "—",
                      " on GitHub"
                    ]
                  }
                )
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: `w-full border-t border-white/10 pt-6 transition-all duration-1000 delay-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`,
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center justify-between gap-6", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap items-center gap-8 lg:gap-14", children: heroStats.map((stat) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-3xl font-medium text-white lg:text-4xl", children: stat.value }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium tracking-wide text-white/40", children: stat.label })
              ] }, stat.label)) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden items-center gap-3 text-xs font-mono text-white/40 md:flex", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "SCROLL" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative h-px w-16 overflow-hidden bg-white/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-y-0 left-0 w-1/2 animate-[shimmer_2s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-white to-transparent" }) })
              ] })
            ] })
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(FeatureShowcase, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("style", { children: `
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
      ` })
  ] });
}
export {
  LandingPage as default
};
