import { e as useNavigate, r as reactExports, j as jsxRuntimeExports, u as useLocation, L as Link } from "./react-vendor.CAo4XUiA.js";
import { u as useAuth, a2 as supabase, a3 as useAdminMessages, a4 as Sheet, a5 as SheetContent, a6 as SheetHeader, a7 as SheetTitle, j as cn, a8 as Avatar, a9 as AvatarImage, aa as AvatarFallback, ab as resolveApiV3Base, D as useIsNativeApp, K as useIsDesktopApp, ac as useIsMacOS, ad as useTitlebarHidden, Y as DropdownMenu, Z as DropdownMenuTrigger, _ as DropdownMenuContent, $ as DropdownMenuItem, a0 as DropdownMenuSeparator, ae as Dialog, af as DialogContent, ag as DialogHeader, ah as DialogTitle, ai as DialogDescription, aj as ANILIST_GRAPHQL_ENDPOINT } from "./index.C6yfkT5T.js";
import { u as useNotifications } from "./useNotifications.BzSJE8km.js";
import { a as useQuery } from "./tanstack.DPr3OB19.js";
import { u as useTrackedShows } from "./useTrackedShows.Dbf34fk8.js";
import { u as useNextAiringEpisodes } from "./useNextAiringEpisodes.COq8rfNQ.js";
import { bq as Bell, bU as CheckCheck, bV as AtSign, bW as CalendarClock, bX as Megaphone, I as Info, bY as Inbox, aO as Reply, H as Heart, aD as Clock, S as Search, Q as LoaderCircle, e as TrendingUp, B as BookOpen, Z as Film, aJ as Play, g as User, aV as Shield, ah as LogOut, X, bZ as Camera } from "./icons.C2gBBarQ.js";
import { m as motion } from "./motion.DVGLRFCH.js";
function commentLink(row) {
  const hash = `#comment-${row.id}`;
  if (row.entity_type && row.entity_id) {
    switch (row.entity_type) {
      case "anime":
        return `/anime/${row.entity_id}${row.episode_id ? `?episode=${row.episode_id}` : ""}${hash}`;
      case "manga":
        return `/manga/${row.entity_id}${hash}`;
      case "playlist":
        return `/playlist/${row.entity_id}${hash}`;
      case "forum_post":
        return `/community/forum/${row.entity_id}${hash}`;
      default:
        return `/${hash}`;
    }
  }
  if (typeof row.anime_id === "string") {
    if (row.anime_id.startsWith("manga:")) return `/manga/${row.anime_id.slice(6)}${hash}`;
    return `/anime/${row.anime_id}${row.episode_id ? `?episode=${row.episode_id}` : ""}${hash}`;
  }
  return `/${hash}`;
}
function useSentMentions() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["sent-mentions", user == null ? void 0 : user.id],
    queryFn: async () => {
      if (!user) return [];
      const { data: rows, error } = await supabase.from("comments").select("*").eq("user_id", user.id).not("mentions", "is", null).order("created_at", { ascending: false }).limit(100);
      if (error) throw error;
      const withMentions = (rows ?? []).filter(
        (r) => Array.isArray(r.mentions) && r.mentions.length > 0
      );
      if (withMentions.length === 0) return [];
      const ids = [...new Set(withMentions.flatMap((r) => r.mentions))];
      const { data: profiles } = await supabase.from("profiles").select("user_id, username, display_name, avatar_url").in("user_id", ids);
      const byId = new Map(
        (profiles ?? []).map((p) => [p.user_id, p])
      );
      return withMentions.map((r) => ({
        id: r.id,
        created_at: r.created_at,
        preview: (r.content ?? "").slice(0, 140) || "Sent an attachment",
        link: commentLink(r),
        mentioned: r.mentions.map(
          (id) => byId.get(id) ?? { user_id: id, username: null, display_name: null, avatar_url: null }
        )
      }));
    },
    enabled: !!user
  });
}
const TABS = [
  { value: "all", label: "All", icon: Bell },
  { value: "mention", label: "Mention", icon: AtSign },
  { value: "calendar", label: "Calendar", icon: CalendarClock },
  { value: "announcement", label: "Announce", icon: Megaphone },
  { value: "system", label: "System", icon: Info }
];
function categorize(type) {
  if (type === "mention") return "mention";
  if (type === "airing") return "calendar";
  if (type === "broadcast" || type === "announcement") return "announcement";
  return "system";
}
function iconFor(type) {
  switch (type) {
    case "mention":
      return { icon: AtSign, tint: "text-sky-400 bg-sky-500/15 border-sky-500/25" };
    case "airing":
      return { icon: CalendarClock, tint: "text-violet-400 bg-violet-500/15 border-violet-500/25" };
    case "broadcast":
    case "announcement":
      return { icon: Megaphone, tint: "text-amber-400 bg-amber-500/15 border-amber-500/25" };
    case "like_milestone":
      return { icon: Heart, tint: "text-rose-400 bg-rose-500/15 border-rose-500/25" };
    case "reply":
      return { icon: Reply, tint: "text-emerald-400 bg-emerald-500/15 border-emerald-500/25" };
    default:
      return { icon: Info, tint: "text-muted-foreground bg-white/[0.06] border-white/10" };
  }
}
function relTime(iso) {
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.floor(diff / 6e4);
  if (m < 1) return "just now";
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  if (d < 7) return `${d}d ago`;
  return new Date(iso).toLocaleDateString();
}
function dayBucket(iso) {
  const now = /* @__PURE__ */ new Date();
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  const t = new Date(iso).getTime();
  if (t >= startOfToday) return "Today";
  if (t >= startOfToday - 864e5) return "Yesterday";
  return "Earlier";
}
function countdown(airingAtSec) {
  const diff = airingAtSec * 1e3 - Date.now();
  if (diff <= 0) return "Airing now";
  const totalMin = Math.floor(diff / 6e4);
  const days = Math.floor(totalMin / 1440);
  const hrs = Math.floor(totalMin % 1440 / 60);
  const mins = totalMin % 60;
  if (days > 0) return `${days}d ${hrs}h`;
  if (hrs > 0) return `${hrs}h ${mins}m`;
  return `${mins}m`;
}
const BUCKET_ORDER = ["Today", "Yesterday", "Earlier"];
function SectionLabel({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-2 mt-1 px-1 text-[10px] font-black uppercase tracking-wider text-muted-foreground/60", children });
}
function EmptyState({ icon: Icon, message }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center gap-3 py-16 text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-14 w-14 items-center justify-center rounded-2xl border border-white/[0.06] bg-white/[0.02] text-muted-foreground/50", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-6 w-6" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "max-w-[220px] text-xs font-medium text-muted-foreground/70", children: message })
  ] });
}
function NotificationRow({ item, onClick }) {
  const { icon: Icon, tint } = iconFor(item.iconType);
  const hasAvatar = !!item.fromAvatar || !!item.fromUsername;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.button,
    {
      type: "button",
      layout: true,
      initial: { opacity: 0, y: 6 },
      animate: { opacity: 1, y: 0 },
      onClick: () => onClick(item),
      className: cn(
        "group flex w-full items-start gap-3 rounded-2xl border p-3 text-left transition-all duration-200",
        item.read ? "border-white/[0.05] bg-white/[0.01] hover:bg-white/[0.03]" : "border-primary/20 bg-primary/[0.06] hover:bg-primary/[0.09]"
      ),
      children: [
        hasAvatar ? /* @__PURE__ */ jsxRuntimeExports.jsxs(Avatar, { className: "h-9 w-9 shrink-0 border border-white/10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarImage, { src: item.fromAvatar }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarFallback, { className: "bg-white/[0.06] text-[11px] font-bold text-muted-foreground", children: (item.fromUsername ?? "?").slice(0, 2).toUpperCase() })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border", tint), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-4 w-4" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate text-[13px] font-bold text-white", children: item.title }),
          item.body && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-0.5 line-clamp-2 text-xs leading-snug text-muted-foreground/80", children: item.body }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-1 block text-[10px] font-medium text-muted-foreground/50", children: relTime(item.createdAt) })
        ] }),
        !item.read && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary shadow-[0_0_8px_rgba(var(--primary),0.6)]" })
      ]
    }
  );
}
function UpcomingCalendar({ onNavigate }) {
  const { data: tracked } = useTrackedShows();
  const anilistIds = reactExports.useMemo(
    () => (tracked ?? []).map((t) => Number(t.anilist_id)).filter((n) => Number.isFinite(n) && n > 0),
    [tracked]
  );
  const { data: airing, isLoading } = useNextAiringEpisodes(anilistIds);
  const upcoming = reactExports.useMemo(() => {
    const rows = Object.values(airing ?? {}).filter((m) => m.airingAt != null);
    return rows.sort((a, b) => (a.airingAt ?? 0) - (b.airingAt ?? 0));
  }, [airing]);
  if (anilistIds.length === 0 || !isLoading && upcoming.length === 0) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SectionLabel, { children: "Upcoming · Your calendar" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: isLoading ? Array.from({ length: 2 }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-16 animate-pulse rounded-2xl bg-white/[0.03]" }, i)) : upcoming.slice(0, 6).map((m) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        onClick: () => onNavigate(`/anime/anilist-${m.mediaId}`),
        className: "flex w-full items-center gap-3 rounded-2xl border border-violet-500/15 bg-violet-500/[0.04] p-2.5 text-left transition-all duration-200 hover:bg-violet-500/[0.08]",
        children: [
          m.coverImage ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: m.coverImage, alt: "", className: "h-12 w-9 shrink-0 rounded-lg object-cover" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-12 w-9 shrink-0 items-center justify-center rounded-lg bg-violet-500/15 text-violet-400", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarClock, { className: "h-4 w-4" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate text-[13px] font-bold text-white", children: m.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-0.5 text-xs text-muted-foreground/80", children: m.episode != null ? `Ep ${m.episode}` : "Next episode" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "shrink-0 rounded-lg bg-violet-500/15 px-2 py-1 text-[11px] font-bold tabular-nums text-violet-300", children: m.airingAt != null ? countdown(m.airingAt) : "" })
        ]
      },
      m.mediaId
    )) })
  ] });
}
function SentMentionsList({ onNavigate }) {
  const { data: sent, isLoading } = useSentMentions();
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: Array.from({ length: 3 }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-16 animate-pulse rounded-2xl bg-white/[0.03]" }, i)) });
  }
  if (!sent || sent.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyState, { icon: AtSign, message: "You haven't mentioned anyone yet. @mention someone in a comment and it shows up here." });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: sent.map((m) => {
    const names = m.mentioned.map((u) => `@${u.display_name || u.username || "someone"}`).join(", ");
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.button,
      {
        type: "button",
        layout: true,
        initial: { opacity: 0, y: 6 },
        animate: { opacity: 1, y: 0 },
        onClick: () => onNavigate(m.link),
        className: "flex w-full items-start gap-3 rounded-2xl border border-white/[0.05] bg-white/[0.01] p-3 text-left transition-all duration-200 hover:bg-white/[0.03]",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex -space-x-2", children: m.mentioned.slice(0, 3).map((u) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Avatar, { className: "h-8 w-8 border border-white/10", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarImage, { src: u.avatar_url ?? void 0 }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarFallback, { className: "bg-white/[0.06] text-[10px] font-bold text-muted-foreground", children: (u.display_name || u.username || "?").slice(0, 2).toUpperCase() })
          ] }, u.user_id)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "truncate text-[13px] font-bold text-white", children: [
              "You mentioned ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sky-400", children: names })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-0.5 line-clamp-2 text-xs leading-snug text-muted-foreground/80", children: m.preview }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-1 block text-[10px] font-medium text-muted-foreground/50", children: relTime(m.created_at) })
          ] })
        ]
      },
      m.id
    );
  }) });
}
function NotificationSheet({ open, onOpenChange }) {
  const navigate = useNavigate();
  const [tab, setTab] = reactExports.useState("all");
  const [mentionView, setMentionView] = reactExports.useState("received");
  const {
    data: notifications = [],
    markAsRead,
    markAllAsRead,
    unreadCount: notifUnread
  } = useNotifications();
  const {
    messages,
    markAsRead: markAdminAsRead,
    markAllAsRead: markAllAdminAsRead,
    unreadCount: adminUnread
  } = useAdminMessages();
  const items = reactExports.useMemo(() => {
    const notifItems = notifications.map((n) => {
      var _a, _b, _c, _d, _e;
      return {
        key: `n-${n.id}`,
        source: "notification",
        category: categorize((_a = n.data) == null ? void 0 : _a.type),
        iconType: ((_b = n.data) == null ? void 0 : _b.type) ?? "system",
        title: n.title,
        body: n.body,
        createdAt: n.created_at,
        read: n.read,
        link: (_c = n.data) == null ? void 0 : _c.link,
        fromUsername: (_d = n.data) == null ? void 0 : _d.from_username,
        fromAvatar: (_e = n.data) == null ? void 0 : _e.from_avatar,
        rawId: n.id
      };
    });
    const adminItems = (messages ?? []).map((m) => ({
      key: `a-${m.id}`,
      source: "admin",
      category: "announcement",
      iconType: "announcement",
      title: m.title,
      body: m.content,
      createdAt: m.created_at,
      read: m.is_read,
      rawId: m.id
    }));
    return [...notifItems, ...adminItems].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }, [notifications, messages]);
  const totalUnread = notifUnread + adminUnread;
  const visible = reactExports.useMemo(
    () => tab === "all" ? items : items.filter((i) => i.category === tab),
    [items, tab]
  );
  const grouped = reactExports.useMemo(() => {
    const map = { Today: [], Yesterday: [], Earlier: [] };
    for (const i of visible) map[dayBucket(i.createdAt)].push(i);
    return map;
  }, [visible]);
  const handleItemClick = (item) => {
    if (!item.read) {
      if (item.source === "admin") markAdminAsRead.mutate(item.rawId);
      else markAsRead.mutate(item.rawId);
    }
    if (item.link) {
      onOpenChange(false);
      navigate(item.link);
    }
  };
  const handleNavigate = (link) => {
    onOpenChange(false);
    navigate(link);
  };
  const handleMarkAll = () => {
    markAllAsRead.mutate();
    markAllAdminAsRead.mutate();
  };
  const groupedList = /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: BUCKET_ORDER.filter((b) => grouped[b].length > 0).map((bucket) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SectionLabel, { children: bucket }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: grouped[bucket].map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx(NotificationRow, { item, onClick: handleItemClick }, item.key)) })
  ] }, bucket)) });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Sheet, { open, onOpenChange, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    SheetContent,
    {
      side: "right",
      className: "flex w-full flex-col gap-0 overflow-hidden border-l border-white/[0.08] bg-background/60 p-0 backdrop-blur-[40px] sm:max-w-md md:max-w-lg shadow-[-20px_0_40px_rgba(0,0,0,0.5)] z-50",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 overflow-hidden pointer-events-none -z-10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 right-0 w-96 h-96 bg-primary/15 blur-[120px] rounded-full" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-20 left-0 w-72 h-72 bg-sky-500/10 blur-[100px] rounded-full" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-transparent via-background/80 to-background/95" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(SheetHeader, { className: "relative shrink-0 border-b border-white/[0.05] bg-white/[0.01] p-6 pb-5 text-left z-10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(SheetTitle, { className: "flex items-center gap-3 text-2xl font-black tracking-tight text-white drop-shadow-md", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/30 to-primary/5 border border-primary/20 text-primary shadow-[0_0_20px_rgba(var(--primary),0.2)]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "h-5 w-5" }) }),
              "Notifications"
            ] }),
            totalUnread > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: handleMarkAll,
                className: "flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 text-[11px] font-bold text-muted-foreground transition-all hover:bg-white/[0.06] hover:text-white",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CheckCheck, { className: "h-3.5 w-3.5" }),
                  "Mark all"
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs font-medium text-muted-foreground/80", children: totalUnread > 0 ? `${totalUnread} unread notification${totalUnread === 1 ? "" : "s"}` : "You are all caught up" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-0 flex-1 space-y-5 overflow-y-auto p-6 custom-scrollbar relative z-10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-5 gap-1.5 rounded-2xl border border-white/[0.08] bg-white/[0.03] p-1.5 shadow-xl backdrop-blur-md", children: TABS.map(({ value, label, icon: Icon }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => setTab(value),
              className: cn(
                "flex flex-col items-center justify-center gap-1 rounded-xl px-1 py-2 text-[10px] font-bold tracking-tight transition-all duration-200",
                tab === value ? "bg-primary text-primary-foreground shadow-[0_0_20px_rgba(var(--primary),0.35)]" : "text-muted-foreground hover:text-white hover:bg-white/[0.03]"
              ),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-4 w-4 shrink-0" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: label })
              ]
            },
            value
          )) }),
          tab === "mention" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-1.5 rounded-2xl border border-white/[0.08] bg-white/[0.03] p-1.5", children: ["received", "sent"].map((v) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => setMentionView(v),
                className: cn(
                  "rounded-xl px-3 py-1.5 text-xs font-bold capitalize transition-all duration-200",
                  mentionView === v ? "bg-primary text-primary-foreground shadow-[0_0_16px_rgba(var(--primary),0.3)]" : "text-muted-foreground hover:text-white"
                ),
                children: v
              },
              v
            )) }),
            mentionView === "received" ? visible.length > 0 ? groupedList : /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyState, { icon: AtSign, message: "No mentions yet. When someone @mentions you, it appears here." }) : /* @__PURE__ */ jsxRuntimeExports.jsx(SentMentionsList, { onNavigate: handleNavigate })
          ] }) : tab === "calendar" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(UpcomingCalendar, { onNavigate: handleNavigate }),
            visible.length > 0 ? groupedList : /* @__PURE__ */ jsxRuntimeExports.jsx(
              EmptyState,
              {
                icon: CalendarClock,
                message: "No airing reminders yet — we'll ping you when a tracked show is about to air."
              }
            )
          ] }) : visible.length > 0 ? groupedList : /* @__PURE__ */ jsxRuntimeExports.jsx(
            EmptyState,
            {
              icon: tab === "announcement" ? Megaphone : Inbox,
              message: tab === "announcement" ? "No announcements right now." : tab === "system" ? "Nothing here yet." : "No notifications yet."
            }
          )
        ] })
      ]
    }
  ) });
}
function NotificationBell() {
  const { user } = useAuth();
  const { unreadCount: adminUnreadCount } = useAdminMessages();
  const { unreadCount: notificationUnreadCount } = useNotifications();
  const [isOpen, setIsOpen] = reactExports.useState(false);
  const totalUnreadCount = adminUnreadCount + notificationUnreadCount;
  if (!user) {
    return null;
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        onClick: () => setIsOpen(true),
        className: "relative p-2 rounded-xl hover:bg-muted/50 transition-colors",
        "aria-label": "Notifications",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "w-5 h-5 text-muted-foreground hover:text-foreground transition-colors" }),
          totalUnreadCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground text-xs font-bold rounded-full flex items-center justify-center animate-pulse", children: totalUnreadCount > 9 ? "9+" : totalUnreadCount })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(NotificationSheet, { open: isOpen, onOpenChange: setIsOpen })
  ] });
}
async function fetchSuggestions(q) {
  var _a, _b;
  if (!q || q.trim().length < 2) return [];
  const params = new URLSearchParams({ q: q.trim() });
  const raw = await fetch(`${resolveApiV3Base()}/content/search/suggestions?${params}`, {
    signal: AbortSignal.timeout(4e3)
  }).then((response) => response.json());
  const results = [];
  const mediaArr = Array.isArray((_a = raw == null ? void 0 : raw.data) == null ? void 0 : _a.media) ? raw.data.media : [];
  for (const m of mediaArr) {
    const name = m.titleEnglish || m.titleRomaji || m.titleNative;
    if (!name || name === "Unknown") continue;
    results.push({
      id: m.anilistId ?? m.tatakaiId ?? m.malId,
      name,
      poster: m.coverImageLarge || m.coverImageMedium || null,
      type: m.mediaType === "manga" ? "manga" : "anime",
      year: ((_b = m.startDate) == null ? void 0 : _b.year) ?? m.seasonYear ?? null,
      format: m.format ?? null,
      countryOfOrigin: m.countryOfOrigin ?? null
    });
  }
  return results;
}
function formatSuggestionType(item) {
  if (item.type !== "manga") return item.format || "Anime";
  const format = String(item.format || "MANGA").toUpperCase();
  if (item.countryOfOrigin === "KR") return "Manhwa";
  if (item.countryOfOrigin === "CN") return "Manhua";
  if (format === "MANHWA") return "Manhwa";
  if (format === "MANHUA") return "Manhua";
  if (format === "OEL") return "Comics";
  if (format === "ONE_SHOT") return "One-shot";
  return "Manga";
}
function HeaderSearchSuggestions({ query, visible, onSelect, onClose }) {
  const navigate = useNavigate();
  const containerRef = reactExports.useRef(null);
  const [debouncedQuery, setDebouncedQuery] = reactExports.useState(query);
  reactExports.useEffect(() => {
    const timer = window.setTimeout(() => setDebouncedQuery(query), 350);
    return () => window.clearTimeout(timer);
  }, [query]);
  const [history, setHistory] = reactExports.useState(() => {
    try {
      const raw = localStorage.getItem("tatakai_search_history");
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });
  const { data: suggestions = [], isFetching } = useQuery({
    queryKey: ["header-suggestions", debouncedQuery],
    queryFn: () => fetchSuggestions(debouncedQuery),
    enabled: visible && debouncedQuery.trim().length >= 2,
    staleTime: 3e4,
    retry: false
  });
  reactExports.useEffect(() => {
    const handler = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        onClose();
      }
    };
    if (visible) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [visible, onClose]);
  if (!visible) return null;
  const showHistory = query.trim().length < 2 && history.length > 0;
  const showSuggestions = query.trim().length >= 2;
  const isWaitingForQuery = query !== debouncedQuery;
  const hasContent = showHistory || showSuggestions && (isWaitingForQuery || isFetching || suggestions.length > 0);
  if (!hasContent) return null;
  const handleSelect = (item) => {
    onSelect(item.name);
    navigate(
      item.type === "manga" ? `/manga/${item.id}` : `/anime/${item.id}`
    );
  };
  const handleHistorySelect = (term) => {
    onSelect(term);
    navigate(`/search?q=${encodeURIComponent(term)}`);
  };
  const removeHistory = (term, e) => {
    e.stopPropagation();
    const next = history.filter((h) => h !== term);
    setHistory(next);
    try {
      localStorage.setItem("tatakai_search_history", JSON.stringify(next));
    } catch {
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      ref: containerRef,
      className: "absolute top-full left-0 right-0 mt-2 z-[200] bg-background/95 backdrop-blur-xl border border-border/40 rounded-2xl shadow-2xl overflow-hidden",
      onMouseDown: (e) => e.preventDefault(),
      children: [
        showHistory && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 px-2 py-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3 h-3 text-muted-foreground" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-black uppercase tracking-widest text-muted-foreground", children: "Recent" })
          ] }),
          history.slice(0, 5).map((term) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              onClick: () => handleHistorySelect(term),
              className: "w-full flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-white/5 transition-colors group text-left",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "w-4 h-4 text-muted-foreground/50 shrink-0" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-1 text-sm truncate", children: term }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    role: "button",
                    tabIndex: 0,
                    onClick: (e) => removeHistory(term, e),
                    className: "text-[10px] text-muted-foreground/40 hover:text-destructive opacity-0 group-hover:opacity-100 transition-all px-1",
                    children: "×"
                  }
                )
              ]
            },
            term
          ))
        ] }),
        showSuggestions && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-2", children: [
          isFetching && suggestions.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 px-3 py-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin text-muted-foreground" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: "Searching…" })
          ] }),
          suggestions.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 px-2 py-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-3 h-3 text-muted-foreground" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-black uppercase tracking-widest text-muted-foreground", children: "Results" })
            ] }),
            suggestions.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                onClick: () => handleSelect(item),
                className: "w-full flex items-center gap-3 px-2 py-2 rounded-xl hover:bg-white/5 transition-colors text-left group",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-10 rounded-lg overflow-hidden shrink-0 bg-muted", children: item.poster ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "img",
                    {
                      src: item.poster,
                      alt: "",
                      className: "w-full h-full object-cover",
                      loading: "lazy"
                    }
                  ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-full flex items-center justify-center", children: item.type === "manga" ? /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-3.5 h-3.5 text-muted-foreground" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Film, { className: "w-3.5 h-3.5 text-muted-foreground" }) }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium truncate group-hover:text-primary transition-colors", children: item.name }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 mt-0.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          className: cn(
                            "text-[9px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded-md",
                            item.type === "manga" ? "bg-emerald-500/15 text-emerald-400" : "bg-primary/15 text-primary/80"
                          ),
                          children: formatSuggestionType(item)
                        }
                      ),
                      item.year && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground", children: item.year })
                    ] })
                  ] })
                ]
              },
              `${item.type}-${item.id}`
            ))
          ] }),
          !isFetching && suggestions.length === 0 && query.trim().length >= 2 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-3 py-3 text-sm text-muted-foreground", children: [
            'No results for "',
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: query }),
            '"'
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              onClick: () => {
                onSelect(query);
                navigate(`/search?q=${encodeURIComponent(query.trim())}`);
              },
              className: "w-full flex items-center gap-2 px-3 py-2.5 mt-1 rounded-xl bg-primary/10 hover:bg-primary/20 transition-colors text-sm font-semibold text-primary border border-primary/20 hover:border-primary/40",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "w-4 h-4" }),
                'Search all results for "',
                query,
                '"'
              ]
            }
          )
        ] })
      ]
    }
  );
}
async function runImageSearch(file) {
  var _a, _b, _c, _d, _e;
  const formData = new FormData();
  formData.append("image", file);
  const res = await fetch("https://api.trace.moe/search", { method: "POST", body: formData });
  if (!res.ok) throw new Error("trace.moe search failed");
  const data = await res.json();
  const rawResults = data.result || [];
  const best = /* @__PURE__ */ new Map();
  for (const r of rawResults) {
    const existing = best.get(r.anilist);
    if (!existing || r.similarity > existing.similarity) best.set(r.anilist, r);
  }
  const deduped = Array.from(best.values()).sort((a, b) => b.similarity - a.similarity);
  const ids = deduped.map((r) => r.anilist).filter(Boolean);
  const titleMap = /* @__PURE__ */ new Map();
  if (ids.length > 0) {
    try {
      const gql = `query ($ids:[Int]){Page(perPage:50){media(id_in:$ids,type:ANIME){id title{english romaji}coverImage{medium}}}}`;
      const r = await fetch(ANILIST_GRAPHQL_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: gql, variables: { ids } })
      });
      if (r.ok) {
        const j = await r.json();
        for (const m of ((_b = (_a = j == null ? void 0 : j.data) == null ? void 0 : _a.Page) == null ? void 0 : _b.media) ?? []) {
          titleMap.set(m.id, {
            title: ((_c = m.title) == null ? void 0 : _c.english) || ((_d = m.title) == null ? void 0 : _d.romaji) || `Anime #${m.id}`,
            cover: ((_e = m.coverImage) == null ? void 0 : _e.medium) || ""
          });
        }
      }
    } catch {
    }
  }
  return deduped.map((r) => {
    var _a2, _b2;
    return {
      ...r,
      _animeTitle: ((_a2 = titleMap.get(r.anilist)) == null ? void 0 : _a2.title) ?? null,
      _animeCover: ((_b2 = titleMap.get(r.anilist)) == null ? void 0 : _b2.cover) ?? null
    };
  });
}
function formatTs(secs) {
  const h = Math.floor(secs / 3600);
  const m = Math.floor(secs % 3600 / 60);
  const s = Math.floor(secs % 60);
  if (h > 0) return `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  return `${m}:${String(s).padStart(2, "0")}`;
}
function Header() {
  var _a, _b, _c, _d, _e, _f, _g, _h;
  const [searchQuery, setSearchQuery] = reactExports.useState("");
  const [showSuggestions, setShowSuggestions] = reactExports.useState(false);
  const [systemStatus, setSystemStatus] = reactExports.useState("checking");
  const searchWrapperRef = reactExports.useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, profile, isAdmin, isModerator, isBanned, signOut, isLoading } = useAuth();
  useIsNativeApp();
  const isDesktopApp = useIsDesktopApp();
  const isMac = useIsMacOS();
  const [titlebarHidden] = useTitlebarHidden();
  const hasSolidTitlebar = isDesktopApp && !titlebarHidden && !isMac;
  const [showImageSearch, setShowImageSearch] = reactExports.useState(false);
  const [selectedFile, setSelectedFile] = reactExports.useState(null);
  const [previewUrl, setPreviewUrl] = reactExports.useState(null);
  const [imageResults, setImageResults] = reactExports.useState(null);
  const [isSearchingImage, setIsSearchingImage] = reactExports.useState(false);
  const [playingVideoIdx, setPlayingVideoIdx] = reactExports.useState(null);
  const fileInputRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    const checkStatus = async () => {
      try {
        const { error } = await supabase.from("profiles").select("id").limit(1).maybeSingle();
        setSystemStatus(error ? "degraded" : "operational");
      } catch {
        setSystemStatus("degraded");
      }
    };
    checkStatus();
    const interval = setInterval(checkStatus, 5 * 60 * 1e3);
    return () => clearInterval(interval);
  }, []);
  reactExports.useEffect(() => {
    const handler = (e) => {
      const isMac2 = navigator.platform.toLowerCase().includes("mac");
      if ((isMac2 ? e.metaKey : e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        const ids = ["tatakai-header-search", "tatakai-global-search"];
        for (const id of ids) {
          const el = document.getElementById(id);
          if (el) {
            el.focus();
            el.select();
            return;
          }
        }
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);
  const commitSearch = reactExports.useCallback((term) => {
    const trimmed = term.trim();
    if (!trimmed) return;
    try {
      const raw = localStorage.getItem("tatakai_search_history");
      let searches = raw ? JSON.parse(raw) : [];
      searches = [trimmed, ...searches.filter((s) => s !== trimmed)].slice(0, 20);
      localStorage.setItem("tatakai_search_history", JSON.stringify(searches));
    } catch {
    }
    setShowSuggestions(false);
    navigate(`/search?q=${encodeURIComponent(trimmed)}`);
  }, [navigate]);
  const handleSearch = (e) => {
    e.preventDefault();
    commitSearch(searchQuery);
  };
  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };
  const handleFileChange = (file) => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setSelectedFile(file);
    setPreviewUrl(file ? URL.createObjectURL(file) : null);
    setImageResults(null);
    setPlayingVideoIdx(null);
  };
  const handleImageSearch = async () => {
    if (!selectedFile) return;
    setIsSearchingImage(true);
    setImageResults(null);
    setPlayingVideoIdx(null);
    try {
      const results = await runImageSearch(selectedFile);
      setImageResults(results);
    } catch {
      setImageResults([]);
    } finally {
      setIsSearchingImage(false);
    }
  };
  reactExports.useEffect(() => () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
  }, []);
  const statusColor = systemStatus === "operational" ? "bg-green-500" : systemStatus === "degraded" ? "bg-amber-500" : "bg-gray-500";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: cn("md:hidden sticky z-50 border-b border-white/[0.06] bg-background/85 backdrop-blur-xl", hasSolidTitlebar ? "top-8" : "top-0"), children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex h-14 items-center justify-between px-3 pt-[env(safe-area-inset-top)]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(NotificationBell, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: () => navigate(location.pathname.startsWith("/manga") ? "/" : "/manga"),
          className: "absolute left-1/2 top-1/2 z-10 inline-flex h-9 -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-3.5 text-xs font-bold tracking-wide text-foreground shadow-sm transition-all hover:border-primary/40 hover:bg-white/[0.1] active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60",
          "aria-label": location.pathname.startsWith("/manga") ? "Switch to Anime" : "Switch to Manga",
          children: [
            location.pathname.startsWith("/manga") ? /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-3.5 w-3.5 text-primary" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "h-3.5 w-3.5 fill-primary text-primary" }),
            location.pathname.startsWith("/manga") ? "Manga" : "Anime"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative z-10", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-9 w-9 rounded-full bg-muted animate-pulse ring-1 ring-white/10" }) : user && !isBanned ? /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenu, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { "aria-label": "Open profile menu", className: "rounded-full outline-none transition-transform active:scale-95 focus-visible:ring-2 focus-visible:ring-primary/60", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Avatar, { className: "h-9 w-9 ring-1 ring-white/20 transition-shadow hover:ring-primary/40", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarImage, { src: (profile == null ? void 0 : profile.avatar_url) || void 0, alt: (profile == null ? void 0 : profile.display_name) || "User" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarFallback, { className: "bg-gradient-to-br from-primary to-secondary text-xs font-bold text-primary-foreground", children: ((_b = (_a = profile == null ? void 0 : profile.display_name) == null ? void 0 : _a[0]) == null ? void 0 : _b.toUpperCase()) || ((_d = (_c = user.email) == null ? void 0 : _c[0]) == null ? void 0 : _d.toUpperCase()) || "U" })
        ] }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuContent, { align: "end", className: "w-52 rounded-2xl border-white/10 bg-background/90 p-1.5 shadow-2xl backdrop-blur-xl data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=open]:duration-150", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuItem, { onClick: () => navigate((profile == null ? void 0 : profile.username) ? `/@${profile.username}` : "/profile"), className: "gap-2 rounded-xl px-3 py-2.5 font-medium", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "mr-1 h-4 w-4 text-muted-foreground" }),
            "Profile"
          ] }),
          (isAdmin || isModerator) && /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuItem, { onClick: () => navigate("/admin"), className: "gap-2 rounded-xl px-3 py-2.5 font-medium", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "mr-1 h-4 w-4 text-muted-foreground" }),
            "Admin navigation"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuSeparator, { className: "bg-white/[0.06]" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuItem, { onClick: handleSignOut, className: "gap-2 rounded-xl px-3 py-2.5 font-medium text-destructive focus:text-destructive", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "mr-1 h-4 w-4" }),
            "Sign out"
          ] })
        ] })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/auth", className: "inline-flex h-9 items-center rounded-full bg-primary px-4 text-xs font-bold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:brightness-110 active:scale-95", children: "Sign in" }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: cn("hidden md:flex items-center mb-4 px-1 sticky z-50 py-2", hasSolidTitlebar ? "top-8" : "top-0"), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex w-full items-center justify-between gap-8 rounded-2xl border border-white/[0.08] bg-background/70 px-5 py-2.5 shadow-[0_8px_32px_-12px_rgba(0,0,0,0.5)] backdrop-blur-xl", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "truncate text-muted-foreground text-[13px] font-medium tracking-wide", children: [
            "Welcome back, ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: (profile == null ? void 0 : profile.display_name) || "Traveler" })
          ] }),
          isBanned && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "shrink-0 px-2 py-0.5 rounded-full bg-destructive/20 text-destructive text-xs font-medium animate-pulse", children: "BANNED" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Link,
            {
              to: "/status",
              className: "flex shrink-0 items-center gap-2 rounded-full border border-white/[0.06] bg-muted/30 px-3 py-1 hover:bg-muted/50 transition-all",
              title: systemStatus === "operational" ? "All systems operational" : "Some services degraded",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: cn("h-2 w-2 rounded-full", statusColor, systemStatus === "operational" && "animate-pulse") }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground group-hover:text-foreground transition-colors", children: "Status" })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 md:gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { ref: searchWrapperRef, className: "relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "form",
              {
                onSubmit: handleSearch,
                className: "flex items-center gap-2.5 rounded-full border border-white/[0.08] bg-muted/40 px-4 py-2 transition-all hover:bg-muted/60 hover:border-white/[0.12] focus-within:border-primary/40 focus-within:bg-muted/60 cursor-text group",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors flex-shrink-0" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "input",
                    {
                      id: "tatakai-header-search",
                      type: "text",
                      value: searchQuery,
                      onChange: (e) => {
                        setSearchQuery(e.target.value);
                        setShowSuggestions(true);
                      },
                      onFocus: () => setShowSuggestions(true),
                      onKeyDown: (e) => {
                        if (e.key === "Escape") setShowSuggestions(false);
                      },
                      placeholder: "Search anime...",
                      className: "w-24 bg-transparent text-sm text-muted-foreground placeholder:text-muted-foreground/70 focus:text-foreground focus:outline-none sm:w-32 lg:w-48",
                      "aria-label": "Search anime",
                      autoComplete: "off"
                    }
                  ),
                  searchQuery && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => {
                        setSearchQuery("");
                        setShowSuggestions(false);
                      },
                      className: "rounded-full p-0.5 hover:bg-white/10",
                      "aria-label": "Clear search",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3.5 h-3.5 text-muted-foreground" })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: (e) => {
                        e.preventDefault();
                        setShowImageSearch(true);
                      },
                      className: "rounded-lg p-1 transition-colors hover:bg-white/10",
                      title: "Search by image",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Camera, { className: "w-4 h-4 text-muted-foreground hover:text-foreground transition-colors" })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden lg:flex gap-1 ml-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded bg-white/[0.06] px-1.5 py-0.5 text-[10px] text-muted-foreground", children: "⌘" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded bg-white/[0.06] px-1.5 py-0.5 text-[10px] text-muted-foreground", children: "K" })
                  ] })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              HeaderSearchSuggestions,
              {
                query: searchQuery,
                visible: showSuggestions,
                onSelect: (name) => {
                  setSearchQuery(name);
                  setShowSuggestions(false);
                },
                onClose: () => setShowSuggestions(false)
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden sm:block", children: /* @__PURE__ */ jsxRuntimeExports.jsx(NotificationBell, {}) }),
          isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-full bg-muted animate-pulse ring-1 ring-white/10" }) : user && !isBanned ? /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenu, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "rounded-full outline-none transition-transform active:scale-95 focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Avatar, { className: "w-10 h-10 cursor-pointer ring-1 ring-white/20 transition-all hover:ring-2 hover:ring-primary/50", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarImage, { src: (profile == null ? void 0 : profile.avatar_url) || void 0, alt: (profile == null ? void 0 : profile.display_name) || "User" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarFallback, { className: "bg-gradient-to-br from-primary to-secondary text-primary-foreground font-bold", children: ((_f = (_e = profile == null ? void 0 : profile.display_name) == null ? void 0 : _e[0]) == null ? void 0 : _f.toUpperCase()) || ((_h = (_g = user.email) == null ? void 0 : _g[0]) == null ? void 0 : _h.toUpperCase()) || "U" })
            ] }) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuContent, { align: "end", className: "w-52 rounded-2xl border-white/10 bg-background/90 p-1.5 shadow-2xl backdrop-blur-xl", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuItem, { onClick: () => navigate((profile == null ? void 0 : profile.username) ? `/@${profile.username}` : "/profile"), className: "gap-2 rounded-xl px-3 py-2.5 font-medium", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-4 h-4 mr-1 text-muted-foreground" }),
                " Profile"
              ] }),
              (isAdmin || isModerator) && /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuItem, { onClick: () => navigate("/admin"), className: "gap-2 rounded-xl px-3 py-2.5 font-medium", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-4 h-4 mr-1 text-muted-foreground" }),
                " Admin Panel"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuSeparator, { className: "bg-white/[0.06]" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuItem, { onClick: handleSignOut, className: "gap-2 rounded-xl px-3 py-2.5 font-medium text-destructive focus:text-destructive", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "w-4 h-4 mr-1" }),
                " Sign Out"
              ] })
            ] })
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Link,
            {
              to: "/auth",
              className: "h-10 px-4 rounded-full bg-primary text-primary-foreground font-semibold text-sm shadow-lg shadow-primary/25 hover:brightness-110 active:scale-95 transition-all flex items-center gap-2",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-4 h-4" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: "Sign In" })
              ]
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: showImageSearch, onOpenChange: (open) => {
        setShowImageSearch(open);
        if (!open) {
          handleFileChange(null);
          setImageResults(null);
          setPlayingVideoIdx(null);
        }
      }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "sm:max-w-2xl max-h-[90vh] flex flex-col overflow-hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { className: "shrink-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Camera, { className: "w-5 h-5 text-primary" }),
            "Scene ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary italic ml-1", children: "Identification" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { children: "Upload an anime screenshot to identify it via trace.moe" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 overflow-y-auto space-y-4 pr-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "flex-1 cursor-pointer group", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 px-4 h-12 rounded-xl bg-muted/50 border-2 border-dashed border-white/10 group-hover:border-primary/50 transition-colors", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Camera, { className: "w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground group-hover:text-foreground truncate transition-colors", children: selectedFile ? selectedFile.name : "Choose anime screenshot…" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  ref: fileInputRef,
                  type: "file",
                  className: "hidden",
                  accept: "image/*",
                  onChange: (e) => {
                    var _a2;
                    return handleFileChange(((_a2 = e.target.files) == null ? void 0 : _a2[0]) || null);
                  }
                }
              )
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                onClick: handleImageSearch,
                disabled: !selectedFile || isSearchingImage,
                className: "px-6 h-12 rounded-xl bg-primary text-primary-foreground font-semibold hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[110px] gap-2",
                children: isSearchingImage ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin" }),
                  " Scanning…"
                ] }) : "Identify"
              }
            )
          ] }),
          previewUrl && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative rounded-xl overflow-hidden border border-white/10 bg-black/20 max-h-[180px]", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: previewUrl, alt: "Preview", className: "w-full h-full object-contain" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                onClick: () => handleFileChange(null),
                className: "absolute top-2 right-2 p-1.5 rounded-lg bg-black/60 hover:bg-black/80 transition-colors",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
              }
            )
          ] }),
          imageResults && imageResults.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-8 text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Film, { className: "w-12 h-12 mx-auto mb-3 opacity-20" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: "No matches found. Try a different screenshot." })
          ] }),
          imageResults && imageResults.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs font-bold uppercase tracking-widest text-muted-foreground px-0.5", children: [
              imageResults.length,
              " match",
              imageResults.length !== 1 ? "es" : "",
              " found"
            ] }),
            imageResults.slice(0, 5).map((result, idx) => {
              var _a2, _b2, _c2, _d2, _e2;
              const title = result._animeTitle || ((_e2 = (_d2 = (_c2 = (_b2 = (_a2 = result.filename) == null ? void 0 : _a2.split("] ")) == null ? void 0 : _b2[1]) == null ? void 0 : _c2.split(" - ")) == null ? void 0 : _d2[0]) == null ? void 0 : _e2.trim()) || result.filename || "Unknown Anime";
              const pct = (result.similarity * 100).toFixed(1);
              const simColor = result.similarity >= 0.95 ? "text-emerald-400" : result.similarity >= 0.85 ? "text-amber-400" : "text-muted-foreground";
              const isPlayingThis = playingVideoIdx === idx;
              return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "rounded-2xl overflow-hidden border border-white/5 bg-muted/20 hover:border-primary/30 transition-colors",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-video bg-black overflow-hidden", children: [
                      isPlayingThis && result.video ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "video",
                        {
                          src: result.video,
                          autoPlay: true,
                          controls: true,
                          className: "w-full h-full object-contain",
                          onEnded: () => setPlayingVideoIdx(null)
                        }
                      ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "img",
                          {
                            src: result.image,
                            alt: title,
                            className: "w-full h-full object-cover"
                          }
                        ),
                        result.video && /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "button",
                          {
                            onClick: () => setPlayingVideoIdx(isPlayingThis ? null : idx),
                            className: "absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 hover:opacity-100 transition-opacity",
                            children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30 hover:bg-white/30 transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "w-6 h-6 text-white fill-white ml-0.5" }) })
                          }
                        )
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: cn("absolute top-2 right-2 px-2 py-0.5 rounded-full bg-black/70 text-xs font-black backdrop-blur-sm", simColor), children: [
                        pct,
                        "%"
                      ] }),
                      result.episode != null && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute top-2 left-2 px-2 py-0.5 rounded-full bg-black/70 text-xs font-bold text-white backdrop-blur-sm", children: [
                        "EP ",
                        result.episode
                      ] }),
                      result.at != null && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/70 text-[10px] text-white font-mono backdrop-blur-sm", children: formatTs(result.at) })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 flex gap-3", children: [
                      result._animeCover && /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "img",
                        {
                          src: result._animeCover,
                          alt: "",
                          className: "w-10 h-14 rounded-lg object-cover shrink-0"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-sm line-clamp-1", children: title }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-x-3 gap-y-0.5 text-[10px] text-muted-foreground mt-0.5", children: [
                          result.episode != null && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold text-foreground/70", children: [
                            "Episode ",
                            result.episode
                          ] }),
                          result.at != null && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                            "at ",
                            formatTs(result.at)
                          ] }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: cn("font-black", simColor), children: [
                            pct,
                            "% match"
                          ] })
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 mt-2.5", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "button",
                            {
                              onClick: () => {
                                setShowImageSearch(false);
                                navigate(`/anime/${result.anilist}`);
                              },
                              className: "flex-1 py-1.5 rounded-lg bg-primary/15 hover:bg-primary/30 text-[11px] font-bold text-primary transition-all border border-primary/20 hover:border-primary/40",
                              children: "View Anime"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "button",
                            {
                              onClick: () => {
                                setShowImageSearch(false);
                                navigate(`/search?q=${encodeURIComponent(title)}`);
                              },
                              className: "flex-1 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-[11px] font-bold text-muted-foreground hover:text-foreground transition-all border border-white/5",
                              children: "Search"
                            }
                          )
                        ] })
                      ] })
                    ] })
                  ]
                },
                idx
              );
            })
          ] })
        ] })
      ] }) })
    ] })
  ] });
}
export {
  Header as H
};
