import { j as jsxRuntimeExports, e as useNavigate, r as reactExports } from "./react-vendor.CAo4XUiA.js";
import { j as cn, fR as buttonVariants, u as useAuth, D as useIsNativeApp, Q as Background, S as Sidebar, B as Button, e4 as Popover, e5 as PopoverTrigger, e6 as PopoverContent, I as contentGraph } from "./index.C6yfkT5T.js";
import { M as MobileNav } from "./MobileNav.ABHzkhTQ.js";
import { bW as DayPicker } from "./vendor.CJyRs4QS.js";
import { b as ChevronRight, aG as ChevronLeft, f as CalendarDays, aI as Star, K as Filter, d2 as CalendarSearch, k as Sparkles, ay as Tv, aJ as Play, aD as Clock, d3 as CalendarX, d4 as CalendarPlus } from "./icons.C2gBBarQ.js";
import { C as ContextMenu, a as ContextMenuTrigger, b as ContextMenuContent, c as ContextMenuItem } from "./context-menu.Dm7T_DwS.js";
import { u as useAiringSchedule } from "./useAiringSchedule.CVdunhuV.js";
import { u as useTrackedShows, c as useToggleTrackedShowByAnilist } from "./useTrackedShows.Dbf34fk8.js";
import "./tanstack.DPr3OB19.js";
import "./supabase.WuRMX5Dg.js";
import "./radix.BiK9uYXL.js";
import "./motion.DVGLRFCH.js";
import "./hls.BlgtCWcq.js";
import "./editor.Dxw8dtyw.js";
import "./charts.Dr1fgDJ-.js";
function Calendar({ className, classNames, showOutsideDays = true, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    DayPicker,
    {
      showOutsideDays,
      className: cn("p-3", className),
      classNames: {
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell: "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
        row: "flex w-full mt-2",
        cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
        day: cn(buttonVariants({ variant: "ghost" }), "h-9 w-9 p-0 font-normal aria-selected:opacity-100"),
        day_range_end: "day-range-end",
        day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
        day_today: "bg-accent text-accent-foreground",
        day_outside: "day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        ...classNames
      },
      components: {
        IconLeft: ({ ..._props }) => /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "h-4 w-4" }),
        IconRight: ({ ..._props }) => /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-4 w-4" })
      },
      ...props
    }
  );
}
Calendar.displayName = "Calendar";
const DAY_MS = 864e5;
const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const WEEKDAYS_LONG = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
function startOfWeek(base) {
  const d = new Date(base);
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() - d.getDay());
  return d;
}
function formatTime(unix) {
  return new Date(unix * 1e3).toLocaleTimeString(void 0, { hour: "2-digit", minute: "2-digit" });
}
function EntryCard({
  entry,
  tracked,
  isPast,
  isNext,
  canTrack,
  onToggle,
  onOpen
}) {
  const time = formatTime(entry.airingAt);
  const card = /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: cn(
        "group relative overflow-hidden rounded-xl border transition-all duration-200",
        "hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/30",
        tracked ? "border-primary/50 bg-gradient-to-br from-primary/20 via-primary/10 to-transparent hover:border-primary/70" : "border-white/[0.06] bg-white/[0.03] hover:border-white/[0.14] hover:bg-white/[0.06]",
        isPast && !tracked && "opacity-55 hover:opacity-90",
        isNext && "ring-1 ring-primary/60 shadow-[0_0_24px_-6px] shadow-primary/50"
      ),
      children: [
        tracked && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute inset-y-0 left-0 w-0.5 bg-primary", "aria-hidden": true }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => onOpen(entry),
            className: "flex w-full gap-2.5 p-2 text-left",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative h-16 w-11 shrink-0 overflow-hidden rounded-md bg-muted/40", children: [
                entry.coverImage ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "img",
                  {
                    src: entry.coverImage,
                    alt: "",
                    loading: "lazy",
                    className: "h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  }
                ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-full w-full items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Tv, { className: "h-4 w-4 text-muted-foreground/50" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity group-hover:opacity-100", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "h-4 w-4 fill-white text-white" }) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1 py-0.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-1 flex items-center gap-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "span",
                    {
                      className: cn(
                        "inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[10px] font-bold tabular-nums",
                        isPast ? "bg-muted/50 text-muted-foreground" : "bg-primary/15 text-primary"
                      ),
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-2.5 w-2.5" }),
                        time
                      ]
                    }
                  ),
                  isNext && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-md bg-primary px-1.5 py-0.5 text-[9px] font-black uppercase tracking-wider text-primary-foreground", children: "Next" }),
                  tracked && /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "ml-auto h-3 w-3 shrink-0 fill-primary text-primary" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "line-clamp-2 text-xs font-semibold leading-snug text-foreground/95", children: entry.title }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 text-[10px] font-medium text-muted-foreground", children: [
                  "Episode ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground/80", children: entry.episode }),
                  entry.totalEpisodes ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground/60", children: [
                    " / ",
                    entry.totalEpisodes
                  ] }) : null
                ] })
              ] })
            ]
          }
        ),
        canTrack && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            title: tracked ? "Remove from calendar" : "Add to calendar",
            onClick: (e) => {
              e.stopPropagation();
              onToggle(entry, tracked);
            },
            className: cn(
              "absolute bottom-1.5 right-1.5 flex h-6 w-6 items-center justify-center rounded-md border transition-all",
              "opacity-0 group-hover:opacity-100 focus-visible:opacity-100",
              tracked ? "border-primary/40 bg-primary/20 text-primary hover:bg-destructive/20 hover:text-destructive hover:border-destructive/40" : "border-white/10 bg-black/40 text-muted-foreground hover:bg-primary/20 hover:text-primary hover:border-primary/40"
            ),
            children: tracked ? /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarX, { className: "h-3 w-3" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarPlus, { className: "h-3 w-3" })
          }
        )
      ]
    }
  );
  if (!canTrack) return card;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(ContextMenu, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(ContextMenuTrigger, { asChild: true, children: card }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(ContextMenuContent, { className: "w-52", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(ContextMenuItem, { onSelect: () => onOpen(entry), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "mr-2 h-4 w-4" }),
        "Watch now"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ContextMenuItem, { onSelect: () => onToggle(entry, tracked), children: tracked ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarX, { className: "mr-2 h-4 w-4" }),
        "Remove from calendar"
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarPlus, { className: "mr-2 h-4 w-4" }),
        "Add to calendar"
      ] }) })
    ] })
  ] });
}
function DaySkeleton({ rows }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-14 animate-pulse rounded-xl bg-white/[0.04]" }),
    Array.from({ length: rows }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "h-20 animate-pulse rounded-xl bg-white/[0.03]",
        style: { animationDelay: `${i * 80}ms` }
      },
      i
    ))
  ] });
}
function CalendarPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const isNative = useIsNativeApp();
  const [weekStart, setWeekStart] = reactExports.useState(() => startOfWeek(/* @__PURE__ */ new Date()));
  const [mineOnly, setMineOnly] = reactExports.useState(false);
  const [mobileDay, setMobileDay] = reactExports.useState(() => (/* @__PURE__ */ new Date()).getDay());
  const [now, setNow] = reactExports.useState(() => Date.now());
  reactExports.useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 6e4);
    return () => clearInterval(id);
  }, []);
  const { data: entries = [], isLoading } = useAiringSchedule(weekStart);
  const { data: tracked = [] } = useTrackedShows();
  const toggleTrack = useToggleTrackedShowByAnilist();
  const handleToggle = (entry, isTracked) => {
    toggleTrack.mutate({
      anilistId: entry.mediaId,
      title: entry.title,
      imageUrl: entry.coverImage,
      tracked: isTracked
    });
  };
  const handleOpen = async (entry) => {
    try {
      const media = await contentGraph.getMedia(`anilist-${entry.mediaId}`);
      const baseId = media.tatakaiId || `anilist-${entry.mediaId}`;
      navigate(`/watch/${encodeURIComponent(`${baseId}?ep=1`)}`);
    } catch {
      navigate(`/anime/anilist-${entry.mediaId}`);
    }
  };
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const trackedAnilistIds = reactExports.useMemo(
    () => new Set(tracked.map((t) => t.anilist_id).filter((x) => typeof x === "number")),
    [tracked]
  );
  const days = reactExports.useMemo(() => {
    const buckets = [[], [], [], [], [], [], []];
    const startMs = weekStart.getTime();
    for (const e of entries) {
      if (mineOnly && !trackedAnilistIds.has(e.mediaId)) continue;
      const idx = Math.floor((e.airingAt * 1e3 - startMs) / DAY_MS);
      if (idx >= 0 && idx < 7) buckets[idx].push(e);
    }
    buckets.forEach((b) => b.sort((a, z) => a.airingAt - z.airingAt));
    return buckets;
  }, [entries, weekStart, mineOnly, trackedAnilistIds]);
  const todayIdx = reactExports.useMemo(() => {
    const t = /* @__PURE__ */ new Date();
    t.setHours(0, 0, 0, 0);
    const idx = Math.floor((t.getTime() - weekStart.getTime()) / DAY_MS);
    return idx >= 0 && idx < 7 ? idx : -1;
  }, [weekStart]);
  const nextEntryId = reactExports.useMemo(() => {
    let best = null;
    for (const b of days) {
      for (const e of b) {
        if (e.airingAt * 1e3 >= now && (!best || e.airingAt < best.airingAt)) best = e;
      }
    }
    return (best == null ? void 0 : best.id) ?? null;
  }, [days, now]);
  const totalThisWeek = days.reduce((n, b) => n + b.length, 0);
  const trackedThisWeek = days.reduce(
    (n, b) => n + b.filter((e) => trackedAnilistIds.has(e.mediaId)).length,
    0
  );
  const shellClass = cn(
    "relative z-10 mx-auto max-w-[1800px] py-4 pb-24 pr-4 md:py-6 md:pb-6 md:pr-6",
    isNative ? "pl-4" : "pl-4 md:pl-32"
  );
  const weekEnd = new Date(weekStart.getTime() + 6 * DAY_MS);
  const sameMonth = weekStart.getMonth() === weekEnd.getMonth();
  const rangeLabel = sameMonth ? `${weekStart.toLocaleDateString(void 0, { month: "long", day: "numeric" })} – ${weekEnd.getDate()}, ${weekEnd.getFullYear()}` : `${weekStart.toLocaleDateString(void 0, { month: "short", day: "numeric" })} – ${weekEnd.toLocaleDateString(void 0, { month: "short", day: "numeric", year: "numeric" })}`;
  const isCurrentWeek = todayIdx !== -1;
  const shiftWeek = (dir) => setWeekStart((w) => new Date(w.getTime() + dir * 7 * DAY_MS));
  const goToday = () => {
    setWeekStart(startOfWeek(/* @__PURE__ */ new Date()));
    setMobileDay((/* @__PURE__ */ new Date()).getDay());
  };
  const renderDay = (i) => {
    const dayEntries = days[i];
    const date = new Date(weekStart.getTime() + i * DAY_MS);
    const isToday = i === todayIdx;
    const isPastDay = date.getTime() + DAY_MS < now;
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-w-0 flex-col", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: cn(
            "sticky top-0 z-10 mb-2 overflow-hidden rounded-xl border px-3 py-2 backdrop-blur-md transition-colors",
            isToday ? "border-primary/50 bg-primary/15 shadow-[0_0_30px_-10px] shadow-primary/60" : "border-white/[0.06] bg-card/70"
          ),
          children: [
            isToday && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end justify-between gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: cn(
                      "text-[10px] font-bold uppercase tracking-[0.18em]",
                      isToday ? "text-primary" : "text-muted-foreground"
                    ),
                    children: WEEKDAYS[i]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline gap-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: cn(
                        "font-display text-2xl font-black leading-none",
                        isToday ? "text-primary" : isPastDay ? "text-foreground/60" : "text-foreground"
                      ),
                      children: date.getDate()
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-medium text-muted-foreground", children: date.toLocaleDateString(void 0, { month: "short" }) })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-end gap-1", children: [
                isToday && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full bg-primary px-2 py-0.5 text-[9px] font-black uppercase tracking-wider text-primary-foreground", children: "Today" }),
                dayEntries.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "span",
                  {
                    className: cn(
                      "rounded-full px-2 py-0.5 text-[10px] font-bold tabular-nums",
                      isToday ? "bg-primary/20 text-primary" : "bg-white/[0.06] text-muted-foreground"
                    ),
                    children: [
                      dayEntries.length,
                      " ep",
                      dayEntries.length === 1 ? "" : "s"
                    ]
                  }
                )
              ] })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: cn(
            "flex-1 space-y-2 rounded-xl p-1",
            isToday && "bg-primary/[0.04] ring-1 ring-inset ring-primary/10"
          ),
          children: dayEntries.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex h-28 flex-col items-center justify-center gap-1.5 rounded-xl border border-dashed border-white/[0.06] text-muted-foreground/40", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Tv, { className: "h-4 w-4" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-medium", children: "Nothing airing" })
          ] }) : dayEntries.map((entry) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            EntryCard,
            {
              entry,
              tracked: trackedAnilistIds.has(entry.mediaId),
              isPast: entry.airingAt * 1e3 < now,
              isNext: entry.id === nextEntryId,
              canTrack: !!user,
              onToggle: handleToggle,
              onOpen: handleOpen
            },
            entry.id
          ))
        }
      )
    ] }, i);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen overflow-x-hidden bg-background text-foreground", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Background, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Sidebar, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: shellClass, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative mb-5 overflow-hidden rounded-2xl border border-white/[0.06] bg-gradient-to-br from-card/80 via-card/50 to-primary/5 p-4 backdrop-blur-xl md:p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-primary/15 blur-3xl" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute -bottom-24 left-1/3 h-48 w-48 rounded-full bg-primary/10 blur-3xl" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex flex-wrap items-center justify-between gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "relative flex h-12 w-12 items-center justify-center rounded-2xl border border-primary/30 bg-primary/15 shadow-[0_0_30px_-8px] shadow-primary/70", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarDays, { className: "h-5 w-5 text-primary" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-black tracking-tight md:text-3xl", children: "Tatakai Calendar" }),
                isCurrentWeek && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "hidden items-center gap-1 rounded-full border border-primary/30 bg-primary/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary sm:inline-flex", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-1.5 w-1.5 animate-pulse rounded-full bg-primary" }),
                  "This week"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-0.5 text-sm text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground/85", children: rangeLabel }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mx-1.5 text-muted-foreground/40", children: "·" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground/70", children: timeZone })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden items-center gap-2 lg:flex", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-white/[0.06] bg-white/[0.03] px-3 py-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] font-bold uppercase tracking-wider text-muted-foreground", children: "Episodes" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-xl font-black leading-none tabular-nums", children: isLoading ? "—" : totalThisWeek })
            ] }),
            user && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-primary/20 bg-primary/10 px-3 py-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-primary", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "h-2.5 w-2.5 fill-primary" }),
                "Yours"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-xl font-black leading-none tabular-nums text-primary", children: isLoading ? "—" : trackedThisWeek })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex w-full flex-wrap items-center gap-2 sm:w-auto", children: [
            user && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                variant: mineOnly ? "default" : "outline",
                size: "sm",
                className: cn("gap-1.5 rounded-lg", mineOnly && "shadow-[0_0_20px_-6px] shadow-primary"),
                onClick: () => setMineOnly((v) => !v),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Filter, { className: "h-3.5 w-3.5" }),
                  "My shows",
                  mineOnly && trackedThisWeek > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-0.5 rounded-full bg-primary-foreground/20 px-1.5 text-[10px] tabular-nums", children: trackedThisWeek })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Popover, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", size: "sm", className: "gap-1.5 rounded-lg", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarSearch, { className: "h-3.5 w-3.5" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: "Jump to date" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sm:hidden", children: "Date" })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(PopoverContent, { className: "w-auto p-0", align: "end", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Calendar,
                {
                  mode: "single",
                  selected: weekStart,
                  onSelect: (d) => {
                    if (!d) return;
                    setWeekStart(startOfWeek(d));
                    setMobileDay(d.getDay());
                  },
                  initialFocus: true
                }
              ) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ml-auto flex items-center rounded-lg border border-white/[0.06] bg-black/30 p-0.5 sm:ml-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  variant: "ghost",
                  size: "icon",
                  className: "h-8 w-8 rounded-md hover:bg-white/10",
                  onClick: () => shiftWeek(-1),
                  "aria-label": "Previous week",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "h-4 w-4" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  variant: "ghost",
                  size: "sm",
                  className: cn(
                    "h-8 rounded-md px-3 text-xs font-bold hover:bg-white/10",
                    isCurrentWeek && "text-primary"
                  ),
                  onClick: goToday,
                  children: "Today"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  variant: "ghost",
                  size: "icon",
                  className: "h-8 w-8 rounded-md hover:bg-white/10",
                  onClick: () => shiftWeek(1),
                  "aria-label": "Next week",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-4 w-4" })
                }
              )
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-3 grid grid-cols-7 gap-1 lg:hidden", children: WEEKDAYS.map((wd, i) => {
        var _a;
        const date = new Date(weekStart.getTime() + i * DAY_MS);
        const active = i === mobileDay;
        const isToday = i === todayIdx;
        const count = ((_a = days[i]) == null ? void 0 : _a.length) ?? 0;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => setMobileDay(i),
            className: cn(
              "relative flex flex-col items-center rounded-xl border py-1.5 transition-all",
              active ? "border-primary/50 bg-primary/15 text-primary" : "border-white/[0.06] bg-white/[0.03] text-muted-foreground hover:bg-white/[0.06]"
            ),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] font-bold uppercase tracking-wider", children: wd }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: cn(
                    "text-base font-black leading-tight",
                    isToday && !active && "text-primary",
                    active && "text-primary",
                    !active && !isToday && "text-foreground"
                  ),
                  children: date.getDate()
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: cn(
                    "mt-0.5 h-1 w-1 rounded-full",
                    count > 0 ? active ? "bg-primary" : "bg-muted-foreground/50" : "bg-transparent"
                  )
                }
              ),
              isToday && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute inset-x-3 top-0 h-0.5 rounded-b bg-primary" })
            ]
          },
          wd
        );
      }) }),
      isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden grid-cols-7 gap-2 lg:grid", children: [3, 5, 4, 6, 3, 5, 4].map((rows, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(DaySkeleton, { rows }, i)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(DaySkeleton, { rows: 5 }) })
      ] }) : totalThisWeek === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center rounded-2xl border border-dashed border-white/[0.08] bg-white/[0.02] px-6 py-20 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/[0.06] bg-white/[0.03]", children: mineOnly ? /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "h-6 w-6 text-muted-foreground" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-6 w-6 text-muted-foreground" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-lg font-bold", children: mineOnly ? "None of your shows air this week" : "Nothing on the schedule" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 max-w-sm text-sm text-muted-foreground", children: mineOnly ? "Pin more shows from their anime page, or turn off the filter to see everything airing." : "AniList has no airing data for this week yet. Try a different week." }),
        mineOnly && /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", size: "sm", className: "mt-4", onClick: () => setMineOnly(false), children: "Show all" })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden grid-cols-7 gap-2 lg:grid", children: days.map((_, i) => renderDay(i)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:hidden", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-2 flex items-center justify-between px-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-base font-bold", children: [
              WEEKDAYS_LONG[mobileDay],
              mobileDay === todayIdx && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-2 text-xs text-primary", children: "Today" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground tabular-nums", children: [
              days[mobileDay].length,
              " episode",
              days[mobileDay].length === 1 ? "" : "s"
            ] })
          ] }),
          renderDay(mobileDay)
        ] })
      ] }),
      !user && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex items-center justify-center gap-2 rounded-xl border border-primary/15 bg-primary/5 px-4 py-3 text-sm text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "h-4 w-4 shrink-0 text-primary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "font-semibold text-primary hover:underline", onClick: () => navigate("/auth"), children: "Sign in" }),
          " ",
          "and pin shows from their anime page to highlight them here."
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(MobileNav, {})
  ] });
}
export {
  CalendarPage as default
};
