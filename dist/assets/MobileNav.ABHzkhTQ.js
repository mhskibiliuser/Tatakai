import { u as useLocation, e as useNavigate, r as reactExports, j as jsxRuntimeExports, a as reactDomExports } from "./react-vendor.CAo4XUiA.js";
import { b6 as Capacitor } from "./vendor.CJyRs4QS.js";
import { T as triggerHaptic, U as useIsMobileApp, V as useSettingsModal, W as useCustomSources, X as useMobileDownload, Y as DropdownMenu, Z as DropdownMenuTrigger, j as cn, _ as DropdownMenuContent, $ as DropdownMenuItem, a0 as DropdownMenuSeparator, a1 as DropdownMenuLabel } from "./index.C6yfkT5T.js";
import { L as LayoutGrid, S as Search, H as Heart, e as TrendingUp, P as Plus, B as BookOpen, U as Users, D as Download, i as Settings } from "./icons.C2gBBarQ.js";
function useHaptics() {
  const isNative = (() => {
    try {
      return Capacitor.isNativePlatform();
    } catch {
      return false;
    }
  })();
  const impact = (style = "medium") => triggerHaptic(style);
  const notification = (type = "success") => triggerHaptic(type);
  const vibrate = (_duration = 300) => triggerHaptic("medium");
  const selectionStart = () => triggerHaptic("select");
  const selectionChanged = () => triggerHaptic("select");
  const selectionEnd = () => triggerHaptic("select");
  return {
    impact,
    notification,
    vibrate,
    selectionStart,
    selectionChanged,
    selectionEnd,
    isNative
  };
}
const POPUP_VISIBILITY_EVENT = "tatakai-v6-popup-visibility";
const POPUP_ACTIVE_CLASS = "v6-popup-active";
const PLAYER_FULLSCREEN_EVENT = "tatakai-mobile-player-fullscreen";
const PLAYER_FULLSCREEN_CLASS = "mobile-player-fullscreen";
function isPlayerFullscreenActive() {
  if (typeof document === "undefined") return false;
  return document.body.classList.contains(PLAYER_FULLSCREEN_CLASS) || document.documentElement.classList.contains(PLAYER_FULLSCREEN_CLASS) || Boolean(document.fullscreenElement);
}
const HIDDEN_PREFIXES = [
  "/auth",
  "/welcome",
  "/onboarding",
  "/setup",
  "/maintenance",
  "/banned",
  "/error",
  "/smarttv",
  "/reset-password",
  "/update-password",
  "/mal-redirect",
  "/anilist-redirect"
];
function isHiddenRoute(pathname) {
  if (pathname === "/") return false;
  return HIDDEN_PREFIXES.some((p) => pathname === p || pathname.startsWith(`${p}/`) || pathname.startsWith(p));
}
function MobileNavButton({
  icon: Icon,
  label,
  active,
  onClick,
  badge,
  progress
}) {
  const safeProgress = progress == null ? void 0 : Math.max(0, Math.min(100, Math.round(progress)));
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "button",
    {
      type: "button",
      onClick,
      "aria-label": badge ? `${label}, ${badge} active${safeProgress != null ? `, ${safeProgress}%` : ""}` : label,
      title: label,
      "aria-current": active ? "page" : void 0,
      className: cn(
        "group relative flex flex-1 items-center justify-center rounded-xl py-2 outline-none transition-all duration-200 active:scale-95 focus-visible:ring-2 focus-visible:ring-primary/60",
        active ? "text-primary" : "text-muted-foreground hover:text-foreground"
      ),
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "span",
        {
          className: cn(
            "relative flex h-9 min-w-[3rem] items-center justify-center rounded-full px-4 transition-all duration-200",
            active ? "bg-primary/15 shadow-[inset_0_0_0_1px_hsl(var(--primary)/0.25)]" : "group-hover:bg-white/[0.06] group-active:bg-white/[0.08]"
          ),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: cn("h-[22px] w-[22px] transition-transform duration-200", active ? "scale-110" : "group-hover:scale-105") }),
            badge != null && badge > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold tabular-nums text-primary-foreground shadow-lg", children: badge > 99 ? "99+" : badge }),
            safeProgress != null && badge != null && badge > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute inset-x-2 bottom-0 h-0.5 overflow-hidden rounded-full bg-primary/20", "aria-hidden": "true", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block h-full rounded-full bg-primary transition-[width] duration-300", style: { width: `${safeProgress}%` } }) })
          ]
        }
      )
    }
  );
}
function MobileNav() {
  const location = useLocation();
  const navigate = useNavigate();
  const isMobileApp = useIsMobileApp();
  const { open, openSettings } = useSettingsModal();
  const { data: customSources } = useCustomSources();
  const customByNamespace = (customSources ?? []).reduce((acc, src) => {
    var _a;
    (acc[_a = src.namespace] || (acc[_a] = [])).push(src);
    return acc;
  }, {});
  const hasCustomSources = ((customSources == null ? void 0 : customSources.length) ?? 0) > 0;
  const { impact } = useHaptics();
  const [isAnnouncementPopupActive, setIsAnnouncementPopupActive] = reactExports.useState(() => {
    if (typeof document === "undefined") return false;
    return document.documentElement.classList.contains(POPUP_ACTIVE_CLASS) || document.body.classList.contains(POPUP_ACTIVE_CLASS);
  });
  const [isPlayerFullscreen, setIsPlayerFullscreen] = reactExports.useState(() => isPlayerFullscreenActive());
  reactExports.useEffect(() => {
    if (typeof window === "undefined" || typeof document === "undefined") return;
    const syncFromClasses = () => {
      const isActive2 = document.documentElement.classList.contains(POPUP_ACTIVE_CLASS) || document.body.classList.contains(POPUP_ACTIVE_CLASS);
      setIsAnnouncementPopupActive(isActive2);
    };
    const handlePopupVisibility = (event) => {
      var _a;
      const customEvent = event;
      if (typeof ((_a = customEvent.detail) == null ? void 0 : _a.open) === "boolean") {
        setIsAnnouncementPopupActive(customEvent.detail.open);
        return;
      }
      syncFromClasses();
    };
    syncFromClasses();
    window.addEventListener(POPUP_VISIBILITY_EVENT, handlePopupVisibility);
    document.addEventListener("visibilitychange", syncFromClasses);
    return () => {
      window.removeEventListener(POPUP_VISIBILITY_EVENT, handlePopupVisibility);
      document.removeEventListener("visibilitychange", syncFromClasses);
    };
  }, []);
  reactExports.useEffect(() => {
    if (typeof window === "undefined" || typeof document === "undefined") return;
    const syncPlayerFullscreen = () => {
      setIsPlayerFullscreen(isPlayerFullscreenActive());
    };
    const handlePlayerFullscreenEvent = (event) => {
      const detail = event.detail;
      if (typeof (detail == null ? void 0 : detail.fullscreen) === "boolean") {
        setIsPlayerFullscreen(detail.fullscreen);
        return;
      }
      syncPlayerFullscreen();
    };
    syncPlayerFullscreen();
    window.addEventListener(PLAYER_FULLSCREEN_EVENT, handlePlayerFullscreenEvent);
    document.addEventListener("fullscreenchange", syncPlayerFullscreen);
    document.addEventListener("webkitfullscreenchange", syncPlayerFullscreen);
    return () => {
      window.removeEventListener(PLAYER_FULLSCREEN_EVENT, handlePlayerFullscreenEvent);
      document.removeEventListener("fullscreenchange", syncPlayerFullscreen);
      document.removeEventListener("webkitfullscreenchange", syncPlayerFullscreen);
    };
  }, []);
  const isActive = (path) => location.pathname === path;
  const hapticNavigate = reactExports.useCallback((path) => {
    void impact("light");
    navigate(path);
  }, [navigate, impact]);
  const hapticOpenSettings = reactExports.useCallback(() => {
    void impact("light");
    openSettings();
  }, [impact, openSettings]);
  const { activeDownloads } = useMobileDownload();
  const activeDownloadCount = isMobileApp ? activeDownloads.length : 0;
  const activeDownloadProgress = activeDownloadCount > 0 ? activeDownloads.reduce((sum, item) => sum + Math.max(0, Math.min(100, item.progress ?? 0)), 0) / activeDownloadCount : void 0;
  if (isAnnouncementPopupActive || open || isPlayerFullscreen || isHiddenRoute(location.pathname)) {
    return null;
  }
  const favActive = isActive("/favorites") || isActive("/trending");
  const customActive = location.pathname.startsWith("/x/");
  const navContent = /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-mobile-nav": true,
      className: "md:hidden fixed inset-x-0 bottom-0 z-[60]",
      role: "navigation",
      "aria-label": "Main navigation",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex items-center gap-1 border-t border-white/10 bg-background/95 px-3 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-2 backdrop-blur-xl max-[374px]:gap-0 max-[374px]:px-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(MobileNavButton, { icon: LayoutGrid, label: "Home", active: isActive("/"), onClick: () => hapticNavigate("/") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(MobileNavButton, { icon: Search, label: "Search", active: isActive("/search"), onClick: () => hapticNavigate("/search") }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenu, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              "aria-label": "Open favorites and trending",
              title: "Saved",
              className: cn(
                "group relative flex flex-1 items-center justify-center rounded-xl py-2 outline-none transition-all duration-200 active:scale-95 focus-visible:ring-2 focus-visible:ring-primary/60",
                favActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
              ),
              children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: cn(
                "flex h-9 min-w-[3rem] items-center justify-center rounded-full px-4 transition-all duration-200",
                favActive ? "bg-primary/15 shadow-[inset_0_0_0_1px_hsl(var(--primary)/0.25)]" : "group-hover:bg-white/[0.06]"
              ), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: cn("h-[22px] w-[22px]", favActive && "fill-primary/20") }) })
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuContent, { align: "center", side: "top", className: "mb-3 w-52 rounded-2xl border-white/10 bg-background/95 p-1.5 shadow-2xl backdrop-blur-xl", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuItem, { onClick: () => hapticNavigate("/favorites"), className: "gap-2 rounded-xl px-3 py-2.5 font-medium", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: "w-4 h-4 mr-1 text-muted-foreground" }),
              "Favorites"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuItem, { onClick: () => hapticNavigate("/trending"), className: "gap-2 rounded-xl px-3 py-2.5 font-medium", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-4 h-4 mr-1 text-muted-foreground" }),
              "Trending"
            ] })
          ] })
        ] }),
        hasCustomSources && /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenu, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              className: cn(
                "group relative flex flex-1 items-center justify-center rounded-xl py-2 outline-none transition-all duration-200 active:scale-95 focus-visible:ring-2 focus-visible:ring-primary/60",
                customActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
              ),
              "aria-label": "Custom sources",
              title: "More",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: cn(
                "flex h-9 min-w-[3rem] items-center justify-center rounded-full px-4 transition-all duration-200",
                customActive ? "bg-primary/15 shadow-[inset_0_0_0_1px_hsl(var(--primary)/0.25)]" : "group-hover:bg-white/[0.06]"
              ), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-[22px] w-[22px]" }) })
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuContent, { align: "center", side: "top", className: "mb-3 w-56 rounded-2xl border-white/10 bg-background/95 p-1.5 shadow-2xl backdrop-blur-xl", children: Object.entries(customByNamespace).map(([namespace, sources], groupIdx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            groupIdx > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuSeparator, { className: "bg-white/[0.06]" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuLabel, { className: "px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground", children: namespace }),
            sources.map((src) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              DropdownMenuItem,
              {
                onClick: () => hapticNavigate(`/x/${src.namespace}/${src.id}`),
                className: "gap-2 rounded-xl px-3 py-2.5 font-medium",
                children: [
                  src.kind === "read" ? /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-4 h-4 mr-1 text-muted-foreground" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(LayoutGrid, { className: "w-4 h-4 mr-1 text-muted-foreground" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "min-w-0 flex-1 truncate", children: src.name })
                ]
              },
              `${src.namespace}:${src.id}`
            ))
          ] }, namespace)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(MobileNavButton, { icon: Users, label: "Social", active: isActive("/community"), onClick: () => hapticNavigate("/community") }),
        isMobileApp && /* @__PURE__ */ jsxRuntimeExports.jsx(
          MobileNavButton,
          {
            icon: Download,
            label: "Saved",
            active: isActive("/downloads"),
            onClick: () => hapticNavigate("/downloads"),
            badge: activeDownloadCount,
            progress: activeDownloadProgress
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(MobileNavButton, { icon: Settings, label: "Settings", onClick: hapticOpenSettings })
      ] })
    }
  );
  return typeof document !== "undefined" ? reactDomExports.createPortal(navContent, document.body) : navContent;
}
export {
  MobileNav as M
};
