import { i as useParams, l as useSearchParams, e as useNavigate, r as reactExports, j as jsxRuntimeExports, L as Link } from "./react-vendor.CAo4XUiA.js";
import { a as useQuery } from "./tanstack.DPr3OB19.js";
import { D as useIsNativeApp, ff as useFollowList, j as cn, Q as Background, S as Sidebar, a8 as Avatar, a9 as AvatarImage, aa as AvatarFallback, G as GlassPanel, a2 as supabase } from "./index.C6yfkT5T.js";
import { M as MobileNav } from "./MobileNav.ABHzkhTQ.js";
import { u as ArrowLeft, U as Users, ap as UserPlus, Q as LoaderCircle } from "./icons.C2gBBarQ.js";
import "./vendor.CJyRs4QS.js";
import "./supabase.WuRMX5Dg.js";
import "./radix.BiK9uYXL.js";
import "./motion.DVGLRFCH.js";
import "./hls.BlgtCWcq.js";
import "./editor.Dxw8dtyw.js";
import "./charts.Dr1fgDJ-.js";
function FollowConnectionsPage() {
  var _a;
  const { username } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const isNative = useIsNativeApp();
  const tab = searchParams.get("tab") === "following" ? "following" : "followers";
  const cleanUsername = (username || "").replace(/^@/, "");
  const { data: profile, isLoading: loadingProfile } = useQuery({
    queryKey: ["profile-by-username", cleanUsername],
    queryFn: async () => {
      if (!cleanUsername) return null;
      const { data, error } = await supabase.from("profiles").select("user_id, username, display_name, avatar_url").eq("username", cleanUsername).maybeSingle();
      if (error) throw error;
      return data;
    },
    enabled: !!cleanUsername
  });
  const { data: list = [], isLoading: loadingList } = useFollowList(profile == null ? void 0 : profile.user_id, tab);
  const shellClass = reactExports.useMemo(
    () => cn(
      "relative z-10 mx-auto max-w-2xl py-4 pb-24 pr-4 md:py-6 md:pb-6 md:pr-6",
      isNative ? "pl-4" : "pl-4 md:pl-32"
    ),
    [isNative]
  );
  const setTab = (t) => setSearchParams(t === "followers" ? {} : { tab: "following" });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen overflow-x-hidden bg-background text-foreground", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Background, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Sidebar, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: shellClass, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: () => navigate(-1),
          className: "mb-4 flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" }),
            " Back"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-5 flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Avatar, { className: "h-12 w-12", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarImage, { src: (profile == null ? void 0 : profile.avatar_url) || void 0 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarFallback, { children: (_a = ((profile == null ? void 0 : profile.display_name) || cleanUsername || "U")[0]) == null ? void 0 : _a.toUpperCase() })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-xl font-black tracking-tight", children: (profile == null ? void 0 : profile.display_name) || cleanUsername || "User" }),
          (profile == null ? void 0 : profile.username) && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
            "@",
            profile.username
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-4 flex rounded-lg bg-muted/40 p-1", children: ["followers", "following"].map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: () => setTab(t),
          className: cn(
            "flex flex-1 items-center justify-center gap-1.5 rounded-md py-2 text-sm font-semibold capitalize transition-colors",
            tab === t ? "bg-primary/15 text-primary" : "text-muted-foreground hover:text-foreground"
          ),
          children: [
            t === "followers" ? /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-4 w-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(UserPlus, { className: "h-4 w-4" }),
            t
          ]
        },
        t
      )) }),
      loadingProfile || loadingList ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-6 w-6 animate-spin text-muted-foreground" }) }) : !profile ? /* @__PURE__ */ jsxRuntimeExports.jsx(GlassPanel, { className: "p-10 text-center text-muted-foreground", children: "User not found." }) : list.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(GlassPanel, { className: "p-10 text-center text-muted-foreground", children: tab === "followers" ? "No followers yet." : "Not following anyone yet." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: list.map((u) => {
        var _a2;
        return /* @__PURE__ */ jsxRuntimeExports.jsx(GlassPanel, { className: "p-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Link,
          {
            to: u.username ? `/@${u.username}` : "#",
            className: cn("flex items-center gap-3", !u.username && "pointer-events-none"),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Avatar, { className: "h-10 w-10", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarImage, { src: u.avatar_url || void 0 }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarFallback, { children: (_a2 = (u.display_name || u.username || "U")[0]) == null ? void 0 : _a2.toUpperCase() })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate font-semibold", children: u.display_name || u.username || "User" }),
                u.username && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "truncate text-xs text-muted-foreground", children: [
                  "@",
                  u.username
                ] })
              ] })
            ]
          }
        ) }, u.user_id);
      }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(MobileNav, {})
  ] });
}
export {
  FollowConnectionsPage as default
};
