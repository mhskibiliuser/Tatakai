import { e as useNavigate, r as reactExports, j as jsxRuntimeExports } from "./react-vendor.CAo4XUiA.js";
import { u as useAuth, D as useIsNativeApp, j as cn, Q as Background, S as Sidebar, B as Button, G as GlassPanel } from "./index.C6yfkT5T.js";
import { M as MobileNav } from "./MobileNav.ABHzkhTQ.js";
import { u as useNotifications } from "./useNotifications.BzSJE8km.js";
import { bq as Bell, C as CircleCheck, Q as LoaderCircle, c as Check, J as Trash2, bX as Megaphone, bW as CalendarClock, H as Heart, aO as Reply, bV as AtSign } from "./icons.C2gBBarQ.js";
import { bp as formatDistanceToNow } from "./vendor.CJyRs4QS.js";
import "./tanstack.DPr3OB19.js";
import "./supabase.WuRMX5Dg.js";
import "./radix.BiK9uYXL.js";
import "./motion.DVGLRFCH.js";
import "./hls.BlgtCWcq.js";
import "./editor.Dxw8dtyw.js";
import "./charts.Dr1fgDJ-.js";
function typeIcon(n) {
  var _a;
  switch ((_a = n.data) == null ? void 0 : _a.type) {
    case "mention":
      return /* @__PURE__ */ jsxRuntimeExports.jsx(AtSign, { className: "h-4 w-4 text-primary" });
    case "reply":
      return /* @__PURE__ */ jsxRuntimeExports.jsx(Reply, { className: "h-4 w-4 text-primary" });
    case "like_milestone":
      return /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: "h-4 w-4 text-rose-400" });
    case "airing":
      return /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarClock, { className: "h-4 w-4 text-violet-400" });
    default:
      return /* @__PURE__ */ jsxRuntimeExports.jsx(Megaphone, { className: "h-4 w-4 text-primary" });
  }
}
function NotificationsPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const isNative = useIsNativeApp();
  const [filter, setFilter] = reactExports.useState("all");
  const { data: notifications = [], isLoading, unreadCount, markAsRead, markAllAsRead, deleteNotification } = useNotifications();
  const shellClass = cn(
    "relative z-10 mx-auto max-w-3xl py-4 pb-24 pr-4 md:py-6 md:pb-6 md:pr-6",
    isNative ? "pl-4" : "pl-4 md:pl-32"
  );
  const visible = reactExports.useMemo(
    () => filter === "unread" ? notifications.filter((n) => !n.read) : notifications,
    [notifications, filter]
  );
  const openNotification = (n) => {
    var _a;
    if (!n.read) markAsRead.mutate(n.id);
    const link = (_a = n.data) == null ? void 0 : _a.link;
    if (typeof link === "string" && link.startsWith("/")) navigate(link);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen overflow-x-hidden bg-background text-foreground", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Background, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Sidebar, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: shellClass, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6 flex flex-wrap items-center justify-between gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex h-11 w-11 items-center justify-center rounded-2xl border border-primary/20 bg-primary/15", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "h-5 w-5 text-primary" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-black tracking-tight", children: "Notifications" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: unreadCount > 0 ? `${unreadCount} unread` : "You’re all caught up" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex rounded-lg bg-muted/40 p-1", children: ["all", "unread"].map((f) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: () => setFilter(f),
              className: cn(
                "rounded-md px-3 py-1 text-xs font-semibold capitalize transition-colors",
                filter === f ? "bg-primary/15 text-primary" : "text-muted-foreground hover:text-foreground"
              ),
              children: f
            },
            f
          )) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "ghost",
              size: "sm",
              className: "gap-1.5 text-xs",
              onClick: () => markAllAsRead.mutate(),
              disabled: unreadCount === 0 || markAllAsRead.isPending,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-3.5 w-3.5" }),
                "Mark all read"
              ]
            }
          )
        ] })
      ] }),
      !user ? /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassPanel, { className: "p-10 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-3 text-muted-foreground", children: "Sign in to see your notifications." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: () => navigate("/auth"), children: "Sign In" })
      ] }) : isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center py-20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-6 w-6 animate-spin text-muted-foreground" }) }) : visible.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassPanel, { className: "flex flex-col items-center justify-center py-20 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted/30", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "h-7 w-7 text-muted-foreground/40" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-bold", children: filter === "unread" ? "No unread notifications" : "Nothing here yet" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 max-w-xs text-sm text-muted-foreground", children: "Mentions, replies and announcements will show up here." })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: visible.map((n) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        GlassPanel,
        {
          className: cn(
            "group flex items-start gap-3 p-4 transition-colors",
            !n.read && "border-primary/20 bg-primary/[0.04]"
          ),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-muted/40", children: typeIcon(n) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: () => openNotification(n),
                className: "min-w-0 flex-1 text-left",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-1 flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: cn("truncate text-sm font-bold", n.read ? "text-muted-foreground" : "text-foreground"), children: n.title }),
                    !n.read && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-1.5 w-1.5 shrink-0 rounded-full bg-primary" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: cn("line-clamp-2 text-xs", n.read ? "text-muted-foreground/60" : "text-muted-foreground"), children: n.body }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-1.5 block text-[10px] font-black uppercase tracking-widest text-muted-foreground/40", children: formatDistanceToNow(new Date(n.created_at), { addSuffix: true }) })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex shrink-0 gap-1 opacity-0 transition-opacity group-hover:opacity-100", children: [
              !n.read && /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  variant: "ghost",
                  size: "icon",
                  className: "h-8 w-8 rounded-lg bg-primary/5 text-primary hover:bg-primary/20",
                  onClick: () => markAsRead.mutate(n.id),
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-4 w-4" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  variant: "ghost",
                  size: "icon",
                  className: "h-8 w-8 rounded-lg bg-destructive/5 text-destructive hover:bg-destructive/20",
                  onClick: () => deleteNotification.mutate(n.id),
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" })
                }
              )
            ] })
          ]
        },
        n.id
      )) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(MobileNav, {})
  ] });
}
export {
  NotificationsPage as default
};
