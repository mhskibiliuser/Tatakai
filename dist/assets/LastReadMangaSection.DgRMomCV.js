import { j as jsxRuntimeExports, L as Link, r as reactExports, e as useNavigate } from "./react-vendor.CAo4XUiA.js";
import { j as cn, ap as useContentSafetySettings, aq as getMangaHome, ar as inferMangaAdultFlag, P as Peekable, G as GlassPanel, an as peekFromManga, u as useAuth, as as useMangaContinueReading, l as getProxiedImageUrl } from "./index.C6yfkT5T.js";
import { a as useQuery } from "./tanstack.DPr3OB19.js";
import { v as ArrowRight, aG as ChevronLeft, b as ChevronRight, bB as Flame, B as BookOpen, aI as Star, aJ as Play, Q as LoaderCircle, X, by as BookMarked, aA as Layers } from "./icons.C2gBBarQ.js";
import "./vendor.CJyRs4QS.js";
function HomeSectionHeading({
  icon,
  title,
  subtitle,
  as: Heading = "h2",
  size = "default",
  action,
  viewAllTo,
  viewAllLabel = "View All",
  className
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: cn("flex items-center justify-between gap-3 px-2", size === "sub" ? "mb-4" : "mb-6", className), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Heading,
        {
          className: cn(
            "font-display font-semibold tracking-tight flex items-center gap-2",
            size === "sub" ? "text-lg" : "text-2xl"
          ),
          children: [
            icon,
            title
          ]
        }
      ),
      subtitle && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-0.5 text-xs md:text-sm text-muted-foreground", children: subtitle })
    ] }),
    action ?? (viewAllTo && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Link,
      {
        to: viewAllTo,
        className: "flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground shrink-0",
        children: [
          viewAllLabel,
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4" })
        ]
      }
    ))
  ] });
}
function useMangaHome() {
  const { settings } = useContentSafetySettings();
  const adult = settings.showAdultEverywhere;
  const query = useQuery({
    queryKey: ["manga-home", adult],
    queryFn: () => getMangaHome(adult),
    staleTime: 10 * 60 * 1e3,
    gcTime: 30 * 60 * 1e3,
    refetchOnWindowFocus: false
  });
  return { ...query, adult };
}
function toMangaCard(item) {
  var _a, _b, _c;
  const title = item.canonicalTitle || ((_a = item.title) == null ? void 0 : _a.english) || ((_b = item.title) == null ? void 0 : _b.romaji) || ((_c = item.title) == null ? void 0 : _c.native);
  const id = item.anilistId || item.malId;
  if (!id || !title) return null;
  return {
    id: String(id),
    name: title,
    poster: item.poster || "",
    type: item.mediaType || "manga",
    status: item.status || void 0,
    rating: typeof item.score === "number" && Number.isFinite(item.score) ? (item.score / 10).toFixed(1) : void 0,
    chapters: typeof item.chapters === "number" && item.chapters > 0 ? item.chapters : void 0,
    malId: typeof item.malId === "number" ? item.malId : void 0,
    anilistId: typeof item.anilistId === "number" ? item.anilistId : void 0,
    isAdult: inferMangaAdultFlag(item),
    mediaType: "manga"
  };
}
function dedupe(items) {
  const seen = /* @__PURE__ */ new Set();
  return items.filter((item) => {
    const key = String(item.anilistId ?? item.malId ?? item.id);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}
function formatStatus(status) {
  if (!status) return null;
  const s = status.toLowerCase();
  if (s.includes("releasing") || s.includes("publishing")) return "Ongoing";
  if (s.includes("finished") || s.includes("complete")) return "Completed";
  if (s.includes("hiatus")) return "Hiatus";
  if (s.includes("not_yet") || s.includes("upcoming")) return "Upcoming";
  return status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
}
const CARD_WIDTH = "w-[150px] sm:w-[170px] md:w-[190px] lg:w-[210px] flex-shrink-0 snap-start";
function MangaShowcaseCard({ item }) {
  const navigate = useNavigate();
  const status = formatStatus(item.status);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Peekable, { media: peekFromManga(item, `/manga/${item.id}`), children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    GlassPanel,
    {
      className: "group relative cursor-pointer overflow-hidden transition-transform duration-300 ease-out hover:-translate-y-1",
      onClick: () => navigate(`/manga/${item.id}`),
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-[2/3]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: item.poster,
            alt: item.name,
            loading: "lazy",
            decoding: "async",
            className: `w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-105 group-hover:brightness-110 ${item.isAdult ? "blur-md scale-110" : ""}`
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 transition-colors duration-300 group-hover:bg-black/10" }),
        item.type && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute top-3 left-3 flex items-center gap-1 px-2 py-0.5 rounded-md bg-orange-500/90 text-white text-[10px] font-bold uppercase tracking-wider shadow-md shadow-black/30", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-3 h-3" }),
          item.type
        ] }),
        item.rating && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute top-3 right-3 flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-black/50 backdrop-blur-md border border-white/10 text-[10px] font-bold text-white", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-3 h-3 fill-amber text-amber" }),
          item.rating
        ] }),
        item.isAdult && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-2 py-1 rounded-md bg-black/60 backdrop-blur border border-white/10 text-[10px] font-bold uppercase tracking-widest text-white/80", children: "18+" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute bottom-0 left-0 right-0 p-3.5 pt-10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-bold text-sm leading-tight line-clamp-2 drop-shadow-md group-hover:text-orange-200 transition-colors duration-300", children: item.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 flex items-center gap-1.5 flex-wrap", children: [
            item.chapters && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center bg-white/10 backdrop-blur-sm border border-white/5 px-1.5 py-0.5 rounded-md text-[10px] font-mono font-semibold uppercase tracking-wider text-white/80", children: [
              "CH ",
              item.chapters
            ] }),
            status && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 text-[10px] font-medium text-white/55", children: [
              status === "Ongoing" && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-emerald-400" }),
              status
            ] })
          ] })
        ] })
      ] })
    }
  ) });
}
function ShowcaseSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-[2/3] rounded-xl bg-white/5 border border-white/5 animate-pulse" });
}
function IndexMangaShowcase() {
  const { settings: contentSafetySettings } = useContentSafetySettings();
  const { data, isLoading } = useMangaHome();
  const scrollRef = reactExports.useRef(null);
  const showcaseCards = reactExports.useMemo(() => {
    const lane = (data == null ? void 0 : data.trending) ?? [];
    const cards = lane.filter((item) => !inferMangaAdultFlag(item) || contentSafetySettings.showAdultEverywhere).map(toMangaCard).filter(Boolean);
    return dedupe(cards).slice(0, 10);
  }, [data, contentSafetySettings.showAdultEverywhere]);
  const showSkeleton = isLoading && showcaseCards.length === 0;
  const scroll = (direction) => {
    if (!scrollRef.current) return;
    const amount = scrollRef.current.clientWidth * 0.75;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth"
    });
  };
  const railClasses = "flex gap-4 overflow-x-auto pb-4 px-2 snap-x snap-mandatory scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mb-24", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      HomeSectionHeading,
      {
        className: "mb-8",
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Flame, { className: "w-5 h-5 text-primary" }),
        title: "Trending Manga",
        subtitle: "What readers are opening right now.",
        action: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 shrink-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden sm:flex gap-1 p-1 rounded-full bg-white/5 border border-white/10", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                onClick: () => scroll("left"),
                "aria-label": "Scroll left",
                className: "p-2 rounded-full text-muted-foreground hover:text-white hover:bg-white/10 transition-colors duration-300",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "w-4 h-4" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                onClick: () => scroll("right"),
                "aria-label": "Scroll right",
                className: "p-2 rounded-full text-muted-foreground hover:text-white hover:bg-white/10 transition-colors duration-300",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4" })
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Link,
            {
              to: "/manga",
              className: "group inline-flex items-center gap-1.5 h-10 px-4 rounded-full bg-white/5 border border-white/10 text-xs font-semibold uppercase tracking-wider text-white/80 hover:text-white hover:bg-white/10 transition-colors duration-300",
              children: [
                "Open Hub",
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5" })
              ]
            }
          )
        ] })
      }
    ),
    showSkeleton ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: railClasses, children: Array.from({ length: 8 }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: CARD_WIDTH, children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShowcaseSkeleton, {}) }, i)) }) : showcaseCards.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute left-0 top-0 bottom-4 w-8 bg-gradient-to-r from-background to-transparent z-10" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute right-0 top-0 bottom-4 w-8 bg-gradient-to-l from-background to-transparent z-10" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { ref: scrollRef, className: railClasses, children: [
        showcaseCards.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: CARD_WIDTH, children: /* @__PURE__ */ jsxRuntimeExports.jsx(MangaShowcaseCard, { item }) }, `index-manga-${item.id}`)),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-2 flex-shrink-0", "aria-hidden": "true" })
      ] })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-2 rounded-2xl border border-dashed border-white/10 bg-white/[0.02] p-8 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto mb-3 w-10 h-10 rounded-full bg-orange-500/10 text-orange-400 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-5 h-5" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Nothing trending yet — check back shortly." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Link,
        {
          to: "/manga",
          className: "mt-3 inline-flex items-center gap-1 text-xs font-semibold text-orange-400 hover:text-orange-300 transition-colors",
          children: [
            "Browse the manga hub ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-3 h-3" })
          ]
        }
      )
    ] })
  ] });
}
const RESUME_GRID_CLASS = "grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3";
function ResumeCard({
  href,
  onClick,
  poster,
  title,
  titleHref,
  primaryMeta,
  secondaryMeta,
  progress,
  progressNote,
  footer,
  overlayIcon: OverlayIcon = Play,
  busy = false,
  dimmed = false,
  onRemove,
  removeLabel = "Remove",
  fallbackIcon: FallbackIcon,
  className
}) {
  const percent = typeof progress === "number" && Number.isFinite(progress) ? Math.max(0, Math.min(100, Math.round(progress))) : void 0;
  const shell = cn(
    "tk-pressable group relative flex w-full items-stretch gap-4 overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.02] p-4 text-left transition-all duration-300",
    "hover:border-primary/40 hover:bg-white/[0.04] hover:shadow-[0_0_28px_-10px_hsl(var(--primary)/0.5)]",
    "focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-primary",
    dimmed && "opacity-60 grayscale hover:opacity-100 hover:grayscale-0",
    className
  );
  const body = /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative h-28 w-20 shrink-0 overflow-hidden rounded-xl border border-white/[0.07] bg-white/[0.04]", children: [
      poster ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        "img",
        {
          src: poster,
          alt: "",
          loading: "lazy",
          className: "h-full w-full object-cover transition-transform duration-500 group-hover:scale-105",
          onError: (event) => {
            event.currentTarget.style.display = "none";
          }
        }
      ) : null,
      !poster && FallbackIcon ? /* @__PURE__ */ jsxRuntimeExports.jsx(FallbackIcon, { className: "absolute inset-0 m-auto h-6 w-6 text-white/20" }) : null,
      busy ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute inset-0 flex items-center justify-center bg-primary/25 backdrop-blur-[2px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-5 w-5 animate-spin text-white" }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute inset-0 flex items-center justify-center bg-black/55 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover:opacity-100", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex h-9 w-9 scale-75 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform duration-300 group-hover:scale-100", children: /* @__PURE__ */ jsxRuntimeExports.jsx(OverlayIcon, { className: "h-4 w-4", fill: "currentColor" }) }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-w-0 flex-1 flex-col", children: [
      titleHref ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        Link,
        {
          to: titleHref,
          onClick: (event) => event.stopPropagation(),
          className: "relative z-10 line-clamp-2 self-start text-sm font-bold leading-snug text-white/90 transition-colors hover:text-primary",
          children: title
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "line-clamp-2 text-sm font-bold leading-snug text-white/90 transition-colors group-hover:text-primary", children: title }),
      primaryMeta ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1.5 line-clamp-1 text-xs font-bold uppercase tracking-[0.14em] text-primary", children: primaryMeta }) : null,
      secondaryMeta ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 line-clamp-1 text-xs font-medium text-white/40", children: secondaryMeta }) : null,
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-auto pt-3", children: percent !== void 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-1.5 flex items-center justify-between text-[11px] font-bold text-white/40", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            percent,
            "%"
          ] }),
          progressNote ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: progressNote }) : null
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1.5 w-full overflow-hidden rounded-full bg-white/[0.06]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "h-full rounded-full bg-gradient-to-r from-primary to-secondary transition-[width] duration-500",
            style: { width: `${percent}%` }
          }
        ) })
      ] }) : footer })
    ] }),
    onRemove ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        "aria-label": removeLabel,
        onClick: (event) => {
          event.preventDefault();
          event.stopPropagation();
          onRemove();
        },
        className: "absolute right-2 top-2 z-10 rounded-full bg-black/50 p-1.5 text-white/45 opacity-0 transition-all hover:bg-destructive/15 hover:text-destructive group-hover:opacity-100 focus-visible:opacity-100",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-3.5 w-3.5" })
      }
    ) : null
  ] });
  const overlay = href ? /* @__PURE__ */ jsxRuntimeExports.jsx(
    Link,
    {
      to: href,
      "aria-label": title,
      className: "absolute inset-0 z-0 rounded-2xl focus:outline-none"
    }
  ) : onClick ? /* @__PURE__ */ jsxRuntimeExports.jsx(
    "button",
    {
      type: "button",
      onClick,
      "aria-label": title,
      className: "absolute inset-0 z-0 rounded-2xl focus:outline-none"
    }
  ) : null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: shell, children: [
    overlay,
    body
  ] });
}
function ResumeCardSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4 rounded-2xl border border-white/[0.07] bg-white/[0.02] p-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-28 w-20 shrink-0 animate-pulse rounded-xl bg-white/[0.05]" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-2 py-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-4 w-3/4 animate-pulse rounded bg-white/[0.05]" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3 w-1/3 animate-pulse rounded bg-white/[0.04]" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3 w-1/4 animate-pulse rounded bg-white/[0.04]" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 h-1.5 w-full animate-pulse rounded-full bg-white/[0.05]" })
    ] })
  ] });
}
const LIMIT = 6;
function LastReadMangaSection() {
  const { user } = useAuth();
  const { data: continueRows = [], isLoading } = useMangaContinueReading(LIMIT);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mb-12 space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-500", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      HomeSectionHeading,
      {
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(BookMarked, { className: "w-5 h-5 text-primary" }),
        title: "Last Read Manga",
        subtitle: continueRows.length > 0 ? `${continueRows.length} ${continueRows.length === 1 ? "title" : "titles"} in progress` : void 0
      }
    ),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: RESUME_GRID_CLASS, children: Array.from({ length: 3 }).map((_, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(ResumeCardSkeleton, {}, index)) }) : continueRows.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: RESUME_GRID_CLASS, children: continueRows.map((item) => {
      const chapterLabel = item.last_chapter_number != null ? `Chapter ${item.last_chapter_number}` : item.last_chapter_title || "Last chapter";
      const lastPage = Math.max(0, Number(item.last_page_index || 0));
      const totalPages = Number(item.total_pages || 0);
      const pageLabel = totalPages > 0 ? `${lastPage + 1} / ${totalPages}` : `${lastPage + 1}`;
      const progressPercent = totalPages > 0 ? Math.min(100, Math.round((lastPage + 1) / totalPages * 100)) : 0;
      const chapterKey = item.last_chapter_key || "";
      const resumeParams = new URLSearchParams();
      resumeParams.set("chapterKey", chapterKey);
      if (item.last_provider) resumeParams.set("provider", item.last_provider);
      if (item.last_chapter_number != null)
        resumeParams.set("chapterNumber", String(item.last_chapter_number));
      if (item.last_chapter_title) resumeParams.set("chapterTitle", item.last_chapter_title);
      resumeParams.set("page", String(lastPage));
      const resumeHref = `/manga/read/${item.manga_id}?${resumeParams.toString()}`;
      return /* @__PURE__ */ jsxRuntimeExports.jsx(
        Peekable,
        {
          media: peekFromManga(
            { id: item.manga_id, name: item.manga_title, poster: item.manga_poster },
            `/manga/${item.manga_id}`
          ),
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            ResumeCard,
            {
              href: resumeHref,
              titleHref: `/manga/${item.manga_id}`,
              poster: item.manga_poster ? getProxiedImageUrl(item.manga_poster) : void 0,
              title: item.manga_title,
              primaryMeta: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5 font-medium text-white/90", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-3.5 w-3.5 text-primary" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: chapterLabel })
              ] }),
              secondaryMeta: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5 text-white/50", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Layers, { className: "h-3 w-3" }),
                "Page ",
                pageLabel
              ] }),
              progress: progressPercent,
              progressNote: totalPages > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "tabular-nums text-white/60", children: [
                totalPages,
                " pages"
              ] }) : void 0,
              fallbackIcon: BookMarked
            }
          )
        },
        item.id
      );
    }) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex flex-col items-center justify-center overflow-hidden rounded-2xl border border-white/[0.05] bg-gradient-to-b from-white/[0.02] to-transparent px-6 py-16 text-center shadow-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 h-[1px] w-1/2 bg-gradient-to-r from-transparent via-primary/30 to-transparent" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 ring-1 ring-primary/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BookMarked, { className: "h-6 w-6 text-primary" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-base font-semibold text-white/90", children: user ? "No reading history" : "Track your reading" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 max-w-sm text-sm text-white/50 leading-relaxed", children: user ? "Open a manga chapter and your progress will automatically appear here." : "Sign in to automatically track and resume your manga, manhwa, and comics from where you left off." }),
      !user && /* @__PURE__ */ jsxRuntimeExports.jsx(
        Link,
        {
          to: "/auth",
          className: "mt-7 inline-flex h-10 items-center justify-center rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
          children: "Sign in or register"
        }
      )
    ] })
  ] });
}
export {
  HomeSectionHeading as H,
  IndexMangaShowcase as I,
  LastReadMangaSection as L,
  RESUME_GRID_CLASS as R,
  ResumeCard as a,
  useMangaHome as u
};
