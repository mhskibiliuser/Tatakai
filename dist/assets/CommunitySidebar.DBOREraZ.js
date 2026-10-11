import { u as useLocation, e as useNavigate, j as jsxRuntimeExports } from "./react-vendor.CAo4XUiA.js";
import { u as useAuth, K as useIsDesktopApp, U as useIsMobileApp, j as cn, fU as NavIcon, a8 as Avatar, a9 as AvatarImage, aa as AvatarFallback } from "./index.C6yfkT5T.js";
import { u as ArrowLeft, bA as House, U as Users, aL as Bookmark, n as Radio, aA as Layers, az as Music2, h as LogIn } from "./icons.C2gBBarQ.js";
function CommunitySidebar() {
  var _a;
  const location = useLocation();
  const navigate = useNavigate();
  const { user, profile } = useAuth();
  const isDesktopApp = useIsDesktopApp();
  const isMobileApp = useIsMobileApp();
  if (isMobileApp) return null;
  const expanded = false;
  const isActive = (path) => location.pathname === path;
  const profileHref = (profile == null ? void 0 : profile.username) ? `/@${profile.username}` : "/profile";
  const avatarLetter = (_a = ((profile == null ? void 0 : profile.display_name) || (profile == null ? void 0 : profile.username) || "U")[0]) == null ? void 0 : _a.toUpperCase();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "nav",
    {
      "data-sidebar": true,
      className: cn(
        "fixed z-[100] flex flex-col transition-all duration-300",
        isDesktopApp ? cn(
          "left-0 top-0 h-screen border-r border-white/5 bg-background/40 pb-6 pt-16 backdrop-blur-3xl",
          "w-20 items-center"
        ) : cn(
          "left-4 top-1/2 hidden -translate-y-1/2 rounded-[2.5rem] border border-white/[0.08] bg-black/25 p-2.5 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.5)] backdrop-blur-3xl md:flex xl:left-6",
          "w-[68px] items-center"
        )
      ),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: () => navigate(-1),
            "aria-label": "Back",
            title: "Back",
            className: cn(
              "group flex items-center justify-center transition-all duration-200 active:scale-95",
              "mb-3 h-11 w-11 shrink-0 rounded-full bg-white/[0.05] text-muted-foreground hover:bg-white/[0.1] hover:text-white"
            ),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-[22px] w-[22px] shrink-0 transition-transform group-hover:-translate-x-0.5" }),
              expanded
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-3 h-px w-6 shrink-0 rounded-full bg-white/[0.08]" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: cn("flex flex-col", "items-center gap-2.5"), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(NavIcon, { icon: House, active: isActive("/"), onClick: () => navigate("/"), label: "Home", expanded }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(NavIcon, { icon: Users, active: isActive("/community"), onClick: () => navigate("/community"), label: "Community", expanded }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            NavIcon,
            {
              icon: Bookmark,
              active: isActive("/community/bookmarks"),
              onClick: () => navigate("/community/bookmarks"),
              label: "Bookmarks",
              expanded
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(NavIcon, { icon: Radio, active: isActive("/isshoni"), onClick: () => navigate("/isshoni"), label: "Watch Together", expanded }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(NavIcon, { icon: Layers, active: isActive("/tierlists"), onClick: () => navigate("/tierlists"), label: "Tier Lists", expanded }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(NavIcon, { icon: Music2, active: isActive("/playlists"), onClick: () => navigate("/playlists"), label: "Playlists", expanded })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: cn("mt-auto flex flex-col", "items-center"), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-3 mt-4 h-px w-6 shrink-0 rounded-full bg-white/[0.08]" }),
          user ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              onClick: () => navigate(profileHref),
              "aria-label": "Profile",
              className: cn(
                "group relative flex items-center transition-all duration-200 active:scale-95",
                "h-11 w-11 justify-center rounded-full"
              ),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Avatar, { className: "h-[38px] w-[38px] shrink-0 ring-2 ring-white/10 transition-all duration-300 group-hover:ring-primary/50 group-hover:shadow-[0_0_16px_hsl(var(--primary)/0.4)]", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarImage, { src: (profile == null ? void 0 : profile.avatar_url) || "", className: "object-cover" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarFallback, { className: "bg-zinc-800 text-xs font-bold text-zinc-300", children: avatarLetter })
                ] }),
                expanded
              ]
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "", children: /* @__PURE__ */ jsxRuntimeExports.jsx(NavIcon, { icon: LogIn, active: isActive("/auth"), onClick: () => navigate("/auth"), label: "Sign In", expanded }) })
        ] })
      ]
    }
  );
}
export {
  CommunitySidebar as C
};
