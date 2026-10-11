import { j as jsxRuntimeExports, L as Link, r as reactExports } from "./react-vendor.CAo4XUiA.js";
import { B as Button, ae as Dialog, af as DialogContent, ag as DialogHeader, ah as DialogTitle, a2 as supabase } from "./index.C6yfkT5T.js";
import { N as Navigation } from "./navbar.BAdovWWT.js";
import { bE as ArrowUpRight, bx as Monitor, ce as Apple, bs as Smartphone, k as Sparkles, v as ArrowRight, D as Download, aY as CircleCheckBig, cb as CloudDownload, aV as Shield } from "./icons.C2gBBarQ.js";
import { b as useAllReleases, u as useGitHubRepo, c as platformKeyForName, d as pickPrimaryAsset, e as firstLine, g as formatBytes, p as platformForAsset, f as formatCompact, h as GITHUB_RELEASES_URL } from "./github.DlOKo3Ni.js";
import "./vendor.CJyRs4QS.js";
import "./tanstack.DPr3OB19.js";
import "./supabase.WuRMX5Dg.js";
import "./radix.BiK9uYXL.js";
import "./motion.DVGLRFCH.js";
import "./hls.BlgtCWcq.js";
import "./editor.Dxw8dtyw.js";
import "./charts.Dr1fgDJ-.js";
const footerLinks = {
  Browse: [
    { name: "Browse Catalog", href: "/browse" },
    { name: "Community", href: "/community" },
    { name: "Trending", href: "/trending" },
    { name: "Favorites", href: "/favorites" }
  ],
  Support: [
    { name: "Community", href: "/community" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Privacy Policy", href: "/privacy" },
    { name: "DMCA", href: "/dmca" }
  ],
  Apps: [
    { name: "Download Apps", href: "/download" },
    { name: "Desktop & Mobile", href: "/download" },
    { name: "Web Version", href: "/browse" },
    { name: "System Status", href: "/status" }
  ],
  Socials: [
    { name: "Discord", href: "https://discord.gg/Mt2jG5QuGP", isExternal: true },
    { name: "GitHub", href: "https://github.com/snozxyx/tatakai", isExternal: true }
  ]
};
const socialLinks = [
  { name: "Discord", href: "https://discord.gg/Mt2jG5QuGP" },
  { name: "GitHub", href: "https://github.com/snozxyx/tatakai" }
];
function FooterSection() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("footer", { className: "relative bg-black text-white", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full h-[340px] md:h-[420px] overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "img",
        {
          src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Upscaled%20Image%20%2810%29-UnDKstODkIENp5xqTYUEpt0Sm8tNOw.png",
          alt: "Bioluminescent landscape",
          className: "w-full h-full object-cover object-center"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "py-16 lg:py-20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 md:grid-cols-6 gap-12 lg:gap-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "inline-flex items-center gap-2 mb-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl font-display text-white", children: "TATAKAI" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-white/40 font-mono", children: "OTAKU" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/50 leading-relaxed mb-8 max-w-xs text-sm", children: "The extension-based otaku community. Track anime and manga, build tier lists and playlists, and connect with fellow fans." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-6", children: socialLinks.map((link) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "a",
            {
              href: link.href,
              target: "_blank",
              rel: "noopener noreferrer",
              className: "text-sm text-white/40 hover:text-white transition-colors flex items-center gap-1 group",
              children: [
                link.name,
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { className: "w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" })
              ]
            },
            link.name
          )) })
        ] }),
        Object.entries(footerLinks).map(([title, links]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-medium text-white mb-6", children: title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-4", children: links.map((link) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "isExternal" in link && link.isExternal ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            "a",
            {
              href: link.href,
              target: "_blank",
              rel: "noopener noreferrer",
              className: "text-sm text-white/40 hover:text-white transition-colors inline-flex items-center gap-2",
              children: link.name
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: link.href,
              className: "text-sm text-white/40 hover:text-white transition-colors inline-flex items-center gap-2",
              children: link.name
            }
          ) }, link.name)) })
        ] }, title))
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "py-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-white/30", children: "© 2025 TATAKAI. All rights reserved." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-4 text-sm text-white/30", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-2 h-2 rounded-full bg-[#eca8d6] animate-ping" }),
          "Streaming live"
        ] }) })
      ] })
    ] })
  ] });
}
const DEFAULT_DOWNLOADS = [
  {
    name: "Windows",
    category: "Desktop App",
    icon: Monitor,
    description: "Windows 10 / 11 Installer (.exe & Portable)",
    requirements: "Windows 10 or later (64-bit)",
    link: "https://github.com/snozxyx/tatakai/releases",
    versions: []
  },
  {
    name: "macOS",
    category: "Desktop App",
    icon: Apple,
    description: "Apple Silicon & Intel Macs (.dmg)",
    requirements: "macOS 11.0 Big Sur or later",
    link: "https://github.com/snozxyx/tatakai/releases",
    versions: []
  },
  {
    name: "Linux",
    category: "Desktop App",
    icon: Monitor,
    description: "AppImage & Debian Package (.deb)",
    requirements: "Ubuntu 20.04+, Fedora 34+, Arch",
    link: "https://github.com/snozxyx/tatakai/releases",
    versions: []
  },
  {
    name: "Android",
    category: "Mobile App",
    icon: Smartphone,
    description: "Signed developer APK — install directly, no App Store needed",
    requirements: "Android 8.0 or later (64-bit)",
    link: "https://github.com/snozxyx/tatakai/releases",
    versions: []
  },
  {
    name: "iOS",
    category: "Mobile App",
    icon: Smartphone,
    description: "Unsigned IPA for iPhone & iPad — sideload with your own Apple account (no App Store)",
    requirements: "iOS 14.0 or later",
    link: "https://github.com/snozxyx/tatakai/releases",
    versions: []
  }
];
function DownloadSection() {
  var _a;
  const [isVisible, setIsVisible] = reactExports.useState(false);
  const [hoveredIndex, setHoveredIndex] = reactExports.useState(null);
  const [mousePos, setMousePos] = reactExports.useState(null);
  const [downloadsList, setDownloadsList] = reactExports.useState(DEFAULT_DOWNLOADS);
  const [selectedDownload, setSelectedDownload] = reactExports.useState(null);
  const [stats, setStats] = reactExports.useState({ platforms: "—", downloads: "—", stars: "—", version: "—" });
  const sectionRef = reactExports.useRef(null);
  const releases = useAllReleases();
  const repo = useGitHubRepo();
  reactExports.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);
  reactExports.useEffect(() => {
    if (!releases || releases.length === 0) return;
    const latest = releases[0];
    setDownloadsList(
      (prev) => prev.map((item) => {
        const key = platformKeyForName(item.name);
        if (!key) return item;
        const versions = releases.map((rel) => {
          const asset = pickPrimaryAsset(rel.assets, key);
          if (!asset) return null;
          return {
            version: rel.tag_name.replace(/^v/i, ""),
            date: (rel.published_at || "").split("T")[0],
            size: formatBytes(asset.size),
            notes: firstLine(rel.body) || rel.name || void 0,
            downloadUrl: asset.browser_download_url
          };
        }).filter(Boolean);
        const latestAsset = pickPrimaryAsset(latest.assets, key);
        return {
          ...item,
          link: (latestAsset == null ? void 0 : latestAsset.browser_download_url) || item.link,
          versions: versions.length ? versions : item.versions
        };
      })
    );
  }, [releases]);
  reactExports.useEffect(() => {
    var _a2;
    if (!releases && !repo) return;
    const totalDownloads = (releases || []).reduce(
      (sum, r) => sum + r.assets.reduce((s, a) => s + (a.download_count || 0), 0),
      0
    );
    const platformsWithBuild = /* @__PURE__ */ new Set();
    (releases || []).forEach(
      (r) => r.assets.forEach((a) => {
        const k = platformForAsset(a.name);
        if (k) platformsWithBuild.add(k);
      })
    );
    const latestVersion = releases && ((_a2 = releases[0]) == null ? void 0 : _a2.tag_name) ? releases[0].tag_name.replace(/^v/i, "") : null;
    setStats({
      platforms: platformsWithBuild.size ? `${platformsWithBuild.size}` : "—",
      downloads: totalDownloads > 0 ? formatCompact(totalDownloads) : "—",
      stars: repo ? formatCompact(repo.stargazers_count) : "—",
      version: latestVersion ? `v${latestVersion}` : "—"
    });
  }, [releases, repo]);
  const handleDownloadClick = async (downloadItem) => {
    try {
      await supabase.from("analytics_events").insert({
        event_type: "download_click",
        page_path: typeof window !== "undefined" ? window.location.pathname : null,
        metadata: {
          platform: downloadItem.name,
          category: downloadItem.category,
          timestamp: (/* @__PURE__ */ new Date()).toISOString()
        }
      });
    } catch {
    }
    if (downloadItem.link && downloadItem.link !== "#") {
      window.open(downloadItem.link, "_blank");
    } else {
      window.open(GITHUB_RELEASES_URL, "_blank");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { id: "downloads", ref: sectionRef, className: "relative overflow-hidden pt-32 lg:pt-40 bg-black text-white", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 text-center mb-16 px-6 lg:px-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: `inline-flex items-center gap-3 text-sm font-mono text-white/60 mb-8 transition-all duration-700 justify-center bg-white/5 border border-white/10 px-4 py-1.5 rounded-full ${isVisible ? "opacity-100" : "opacity-0"}`, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-4 h-4 text-primary" }),
        "Official Tatakai Clients"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: `text-5xl md:text-7xl lg:text-[110px] font-display tracking-tight leading-[0.9] transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`, children: [
        "Get Tatakai",
        /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/40", children: "on every device." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: `mt-8 text-lg md:text-xl text-white/60 leading-relaxed max-w-xl mx-auto transition-all duration-1000 delay-100 ${isVisible ? "opacity-100" : "opacity-0"}`, children: "Enjoy 4K streaming, offline episode downloads, multi-language audio/subtitles, and community extension support across desktop and mobile." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `w-full max-w-[1400px] mx-auto px-6 lg:px-12 mb-20 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative h-64 md:h-96 lg:h-[480px] w-full overflow-hidden rounded-3xl border border-white/10 shadow-2xl bg-white/5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "img",
        {
          src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/connection-KeJwWPQvn6l0a7C48tCARYtNEdC92H.png",
          alt: "Tatakai App Preview",
          className: "w-full h-full object-cover object-center"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-8 left-8 right-8 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-mono uppercase tracking-widest text-primary font-bold", children: "Cross-Platform Sync" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-2xl font-bold text-white", children: "Watch anywhere, resume anytime" })
      ] }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-[1400px] mx-auto px-6 lg:px-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20", children: downloadsList.map((download, index) => {
        const Icon = download.icon;
        const isLocked = download.comingSoon || download.inProgress;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: () => !isLocked && setSelectedDownload(download),
            disabled: isLocked,
            className: `group relative overflow-hidden p-8 border rounded-2xl transition-all duration-500 text-left ${isLocked ? "opacity-50 cursor-not-allowed bg-white/[0.02]" : "bg-white/[0.03] hover:bg-white/[0.07]"} ${hoveredIndex === index && !isLocked ? "border-white/40 shadow-xl scale-[1.02]" : "border-white/10 hover:border-white/30"} ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`,
            style: {
              transitionDelay: `${index * 50 + 200}ms`
            },
            onMouseEnter: (e) => {
              if (!isLocked) {
                setHoveredIndex(index);
                const rect = e.currentTarget.getBoundingClientRect();
                setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
              }
            },
            onMouseMove: (e) => {
              if (!isLocked) {
                const rect = e.currentTarget.getBoundingClientRect();
                setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
              }
            },
            onMouseLeave: () => {
              setHoveredIndex(null);
              setMousePos(null);
            },
            children: [
              hoveredIndex === index && mousePos && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  "aria-hidden": "true",
                  className: "pointer-events-none absolute inset-0 z-0 rounded-2xl",
                  style: {
                    background: `radial-gradient(240px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255,255,255,0.12) 0%, transparent 70%)`
                  }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `absolute top-4 right-4 text-[10px] font-mono px-2.5 py-1 rounded-full border transition-colors ${hoveredIndex === index ? "bg-white text-black border-white" : "bg-white/10 text-white/70 border-white/10"}`, children: download.category }),
              isLocked && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `absolute top-4 left-4 text-xs font-mono px-2.5 py-0.5 rounded border ${download.inProgress ? "bg-primary/20 text-primary border-primary/30" : "bg-amber-500/20 text-amber-300 border-amber-500/30"}`, children: download.inProgress ? "IN PROGRESS" : "SOON" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `mb-6 p-3 rounded-xl bg-white/5 border border-white/10 w-fit transition-transform ${hoveredIndex === index && !isLocked ? "scale-110 bg-white/10 text-primary" : "text-white"}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-8 h-8" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-xl text-white", children: download.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-white/60 leading-relaxed", children: download.description }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-white/40 font-mono pt-2", children: download.requirements })
              ] }),
              !isLocked && download.versions.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-white/50 font-mono", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                  "Latest: v",
                  download.versions[0].version
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-primary font-semibold group-hover:underline flex items-center gap-1", children: [
                  "Download ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-3 h-3" })
                ] })
              ] }),
              !isLocked && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-0 left-0 right-0 h-0.5 bg-white/10 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `h-full bg-white transition-all duration-500 ${hoveredIndex === index ? "w-full" : "w-0"}` }) })
            ]
          },
          download.name
        );
      }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `py-16 border-t border-white/10 transition-all duration-1000 delay-500 ${isVisible ? "opacity-100" : "opacity-0"}`, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 bg-white/[0.02] border border-white/10 rounded-3xl p-8 lg:p-12", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-3xl font-display text-white mb-3", children: "Ready to watch Tatakai?" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/60 max-w-md text-base leading-relaxed", children: "Anime playback runs in the native app. Install it for your platform above to unlock the full player, offline downloads, and extension sources — or browse the catalog in your browser." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-4 w-full lg:w-auto", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              size: "lg",
              onClick: () => handleDownloadClick(downloadsList[0]),
              className: "bg-white hover:bg-white/90 text-black px-8 h-14 text-base rounded-full group font-semibold shadow-lg",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-4 h-4 mr-2" }),
                "Download Desktop App",
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/browse", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              size: "lg",
              variant: "outline",
              className: "h-14 px-8 text-base rounded-full border-white/20 hover:bg-white/10 text-white font-medium",
              children: "Browse Catalog"
            }
          ) })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `mt-12 pt-12 border-t border-white/10 pb-24 transition-all duration-1000 delay-700 ${isVisible ? "opacity-100" : "opacity-0"}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-8", children: [
        { value: stats.platforms, label: "Supported Platforms" },
        { value: stats.downloads, label: "Total Downloads" },
        { value: stats.stars, label: "GitHub Stars" },
        { value: stats.version, label: "Latest Version" }
      ].map((stat) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-3xl md:text-4xl font-display text-white mb-1", children: stat.value }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-white/50 font-mono", children: stat.label })
      ] }, stat.label)) }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: !!selectedDownload, onOpenChange: (open) => !open && setSelectedDownload(null), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-md border border-white/20 bg-neutral-950/95 text-white backdrop-blur-xl rounded-2xl shadow-2xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { className: "pb-4 border-b border-white/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-between", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        (selectedDownload == null ? void 0 : selectedDownload.icon) && /* @__PURE__ */ jsxRuntimeExports.jsx(selectedDownload.icon, { className: "w-7 h-7 text-primary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "text-lg text-white font-bold", children: selectedDownload == null ? void 0 : selectedDownload.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-white/50 font-mono mt-0.5", children: selectedDownload == null ? void 0 : selectedDownload.category })
        ] })
      ] }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 py-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            onClick: () => selectedDownload && handleDownloadClick(selectedDownload),
            className: "w-full bg-white hover:bg-white/90 text-black h-12 rounded-full font-bold shadow-lg text-sm",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-4 h-4 mr-2" }),
              "Download for ",
              selectedDownload == null ? void 0 : selectedDownload.name
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4 py-3 bg-white/5 rounded-xl px-4 border border-white/10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-white/50 font-mono mb-1", children: "System Requirements" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-white", children: selectedDownload == null ? void 0 : selectedDownload.requirements })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-white/50 font-mono mb-1", children: "Latest Version" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-white", children: ((_a = selectedDownload == null ? void 0 : selectedDownload.versions[0]) == null ? void 0 : _a.version) ? `v${selectedDownload.versions[0].version}` : "—" })
          ] })
        ] }),
        (selectedDownload == null ? void 0 : selectedDownload.category) === "Mobile App" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 py-3 px-4 bg-amber-500/10 rounded-xl border border-amber-500/30", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] font-bold uppercase tracking-wider text-amber-300 font-mono", children: (selectedDownload == null ? void 0 : selectedDownload.name) === "Android" ? "Direct install" : "Unsigned build" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-white/70 leading-relaxed", children: (selectedDownload == null ? void 0 : selectedDownload.name) === "Android" ? "Download the APK and open it on your device. Android asks to allow “Install unknown apps” for your browser — the Play Protect warning is expected since this build is not published through Google Play." : "No App Store listing — sign and sideload the .ipa with your own Apple account (AltStore / SideStore / TrollStore) to install it on your device." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-xs font-bold uppercase tracking-wider text-white/50 font-mono", children: "App Highlights" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5 text-sm text-white/80", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-4 h-4 text-emerald-400 flex-shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "4K HDR high-bitrate streaming" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5 text-sm text-white/80", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CloudDownload, { className: "w-4 h-4 text-blue-400 flex-shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Offline library & local video cache" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5 text-sm text-white/80", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-4 h-4 text-purple-400 flex-shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Ad-free & private encrypted streams" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t border-white/10 pt-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-xs font-bold uppercase tracking-wider text-white/50 font-mono mb-3", children: "Changelog & Builds" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2 max-h-48 overflow-y-auto pr-1", children: selectedDownload == null ? void 0 : selectedDownload.versions.map((version, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: `p-3 rounded-xl border transition-all ${idx === 0 ? "bg-white/10 border-white/30" : "bg-white/[0.02] border-white/10 hover:border-white/20"}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-xs font-bold text-white", children: [
                    "v",
                    version.version
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-mono text-white/50", children: version.size })
                ] }),
                version.notes && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-white/70 leading-relaxed mb-2", children: version.notes }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] text-white/40 flex items-center gap-2 font-mono", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: version.date }),
                  idx === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-1.5 py-0.5 bg-primary/20 text-primary border border-primary/30 rounded text-[9px] font-bold", children: "Latest Build" })
                ] }),
                version.downloadUrl && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "a",
                  {
                    href: version.downloadUrl,
                    target: "_blank",
                    rel: "noopener noreferrer",
                    className: "mt-2 inline-flex items-center gap-1 text-[10px] font-mono text-primary hover:underline",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-3 h-3" }),
                      " Direct download"
                    ]
                  }
                )
              ]
            },
            version.version + idx
          )) })
        ] })
      ] })
    ] }) })
  ] });
}
function DownloadPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-black text-white flex flex-col justify-between", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Navigation, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(DownloadSection, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(FooterSection, {})
  ] });
}
export {
  DownloadSection,
  DownloadPage as default
};
