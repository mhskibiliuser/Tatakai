import { i as useParams, e as useNavigate, j as jsxRuntimeExports, L as Link } from "./react-vendor.CAo4XUiA.js";
import { K as useIsDesktopApp, fl as usePublicProfile, fn as usePublicWatchlist, fo as usePublicWatchHistory, dV as useUserTierLists, u as useAuth, fs as useFollow, Q as Background, S as Sidebar, B as Button, G as GlassPanel, a8 as Avatar, a9 as AvatarImage, aa as AvatarFallback, bq as Tabs, br as TabsList, bs as TabsTrigger, bu as TabsContent } from "./index.C6yfkT5T.js";
import { M as MobileNav } from "./MobileNav.ABHzkhTQ.js";
import { a as TierListGrid } from "./TierListCard.xUrqhVp3.js";
import { u as ArrowLeft, a6 as Lock, g as User, ag as ShieldCheck, aV as Shield, a5 as Globe, bF as Calendar, ap as UserPlus, cY as UserMinus, H as Heart, aJ as Play, aD as Clock, bC as Trophy } from "./icons.C2gBBarQ.js";
import { bp as formatDistanceToNow } from "./vendor.CJyRs4QS.js";
import "./tanstack.DPr3OB19.js";
import "./supabase.WuRMX5Dg.js";
import "./radix.BiK9uYXL.js";
import "./motion.DVGLRFCH.js";
import "./hls.BlgtCWcq.js";
import "./editor.Dxw8dtyw.js";
import "./charts.Dr1fgDJ-.js";
function PublicProfilePage() {
  const { username: usernameParam, atUsername, slug } = useParams();
  const navigate = useNavigate();
  const isDesktopApp = useIsDesktopApp();
  const username = usernameParam || ((atUsername == null ? void 0 : atUsername.startsWith("@")) ? atUsername.slice(1) : atUsername) || ((slug == null ? void 0 : slug.startsWith("@")) ? slug.slice(1) : void 0) || "";
  const { data: profile, isLoading: loadingProfile, error } = usePublicProfile(username);
  const { data: watchlist = [], isLoading: loadingWatchlist } = usePublicWatchlist(profile == null ? void 0 : profile.id, (profile == null ? void 0 : profile.is_public) ?? false);
  const { data: watchHistory = [], isLoading: loadingHistory } = usePublicWatchHistory(profile == null ? void 0 : profile.id, (profile == null ? void 0 : profile.is_public) ?? false);
  const { data: tierLists = [], isLoading: loadingTierLists } = useUserTierLists(profile == null ? void 0 : profile.id);
  const { user: currentUser } = useAuth();
  const { isFollowing, checkingFollow, followStats, follow, unfollow, isFollowingLoading } = useFollow(profile == null ? void 0 : profile.id);
  const isOwnProfile = (currentUser == null ? void 0 : currentUser.id) === (profile == null ? void 0 : profile.id);
  const totalEpisodesWatched = watchHistory.length;
  const estimatedWatchTimeHours = Math.round(totalEpisodesWatched * 24 / 60);
  if (loadingProfile) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-background flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-muted-foreground", children: "Loading profile..." }) });
  }
  if (error || !profile) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background text-foreground overflow-x-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Background, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Sidebar, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: `relative z-10 ${isDesktopApp ? "pl-6" : "pl-6 md:pl-32"} pr-6 py-6 max-w-[1400px] mx-auto pb-24 md:pb-6`, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-4 mb-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: () => navigate(-1),
            className: "flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-5 h-5" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Back" })
            ]
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-20", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-16 h-16 mx-auto text-muted-foreground mb-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold mb-2", children: "Profile Not Available" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-6", children: "This profile is private or doesn't exist." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: () => navigate("/"), children: "Go Home" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(MobileNav, {})
    ] });
  }
  const publicTierLists = tierLists.filter((tl) => tl.is_public);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background text-foreground overflow-x-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Background, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Sidebar, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: `relative z-10 ${isDesktopApp ? "pl-6" : "pl-6 md:pl-32"} pr-6 py-6 max-w-[1400px] mx-auto pb-24 md:pb-6`, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-4 mb-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: () => navigate(-1),
          className: "flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-5 h-5" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Back" })
          ]
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassPanel, { className: "relative overflow-hidden mb-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-32 md:h-48 relative overflow-hidden", children: profile.banner_url ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: profile.banner_url,
              alt: "",
              className: "absolute inset-0 w-full h-full object-cover blur-2xl scale-110 opacity-60",
              "aria-hidden": "true"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: profile.banner_url,
              alt: "Profile banner",
              className: "absolute inset-0 w-full h-full object-contain"
            }
          )
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 pt-0 -mt-12", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col md:flex-row md:items-end gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Avatar, { className: "w-24 h-24 border-4 border-background shadow-xl", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarImage, { src: profile.avatar_url || void 0 }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarFallback, { className: "text-2xl", children: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-10 h-10" }) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-2xl md:text-3xl font-black flex items-center gap-2", children: [
                  (profile == null ? void 0 : profile.display_name) || username,
                  (profile == null ? void 0 : profile.role) === "admin" && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 px-3 py-1 rounded-full text-[12px] font-bold bg-violet-500/20 text-violet-400 border border-violet-500/30", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "w-4 h-4" }),
                    "ADMIN"
                  ] }),
                  (profile == null ? void 0 : profile.role) === "moderator" && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 px-3 py-1 rounded-full text-[12px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-4 h-4" }),
                    "MODERATOR"
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { title: "Public Profile", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { className: "w-4 h-4 text-green-500" }) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 text-sm text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-4 h-4" }),
                  "Joined ",
                  formatDistanceToNow(new Date(profile.created_at), { addSuffix: true })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(UserPlus, { className: "w-4 h-4" }),
                  (followStats == null ? void 0 : followStats.followers) || 0,
                  " followers"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-4 h-4" }),
                  (followStats == null ? void 0 : followStats.following) || 0,
                  " following"
                ] })
              ] })
            ] }),
            !isOwnProfile && currentUser && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                onClick: () => isFollowing ? unfollow() : follow(),
                disabled: isFollowingLoading || checkingFollow,
                variant: isFollowing ? "outline" : "default",
                className: "gap-2",
                children: isFollowing ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(UserMinus, { className: "w-4 h-4" }),
                  "Unfollow"
                ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(UserPlus, { className: "w-4 h-4" }),
                  "Follow"
                ] })
              }
            ) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-muted", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center p-3 rounded-xl bg-muted/30", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-2 mb-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: "w-4 h-4 text-primary" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl font-bold", children: watchlist.length })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Favorites" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center p-3 rounded-xl bg-muted/30", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-2 mb-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "w-4 h-4 text-primary" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl font-bold", children: totalEpisodesWatched })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Episodes" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center p-3 rounded-xl bg-muted/30", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-2 mb-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-4 h-4 text-primary" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-2xl font-bold", children: [
                  estimatedWatchTimeHours,
                  "h"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Watch Time" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center p-3 rounded-xl bg-muted/30", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-2 mb-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "w-4 h-4 text-primary" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl font-bold", children: publicTierLists.length })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Tier Lists" })
            ] })
          ] }),
          Array.isArray(profile.showcase_anime_ids) && profile.showcase_anime_ids.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 pt-6 border-t border-muted", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-medium text-muted-foreground mb-3", children: "Showcase" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-3 overflow-x-auto pb-2", children: profile.showcase_anime_ids.map((animeId) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              Link,
              {
                to: `/anime/${animeId}`,
                className: "flex-shrink-0 group",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-28 rounded-lg overflow-hidden bg-muted flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" }) })
              },
              animeId
            )) })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "watchlist", className: "space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "bg-muted/50 p-1 flex-wrap h-auto gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "watchlist", className: "gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: "w-4 h-4" }),
            "Watchlist"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "history", className: "gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-4 h-4" }),
            "History"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "tierlists", className: "gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "w-4 h-4" }),
            "Tier Lists"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "watchlist", children: loadingWatchlist ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center py-12 text-muted-foreground", children: "Loading..." }) : watchlist.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-12 text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: "w-12 h-12 mx-auto mb-4 opacity-50" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "No favorites yet" })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-4", children: watchlist.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Link,
          {
            to: `/anime/${item.anime_id}`,
            className: "group",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-[2/3] rounded-lg overflow-hidden mb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: item.anime_poster || "",
                  alt: item.anime_name,
                  className: "w-full h-full object-cover group-hover:scale-110 transition-transform"
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium line-clamp-2 group-hover:text-primary transition-colors", children: item.anime_name })
            ]
          },
          item.id
        )) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "history", children: loadingHistory ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center py-12 text-muted-foreground", children: "Loading..." }) : watchHistory.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-12 text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-12 h-12 mx-auto mb-4 opacity-50" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "No watch history" })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: watchHistory.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Link,
          {
            to: `/watch/${item.anime_id}?ep=${item.episode_number}`,
            className: "flex items-center gap-4 p-3 rounded-xl bg-muted/20 hover:bg-muted/40 transition-colors group",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-20 rounded-lg overflow-hidden flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: item.anime_poster || "",
                  alt: item.anime_name,
                  className: "w-full h-full object-cover"
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium line-clamp-1 group-hover:text-primary transition-colors", children: item.anime_name }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
                  "Episode ",
                  item.episode_number
                ] }),
                item.progress_seconds > 0 && item.duration_seconds > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 h-1 bg-muted rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "h-full bg-primary rounded-full",
                    style: { width: `${Math.min(item.progress_seconds / item.duration_seconds * 100, 100)}%` }
                  }
                ) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: formatDistanceToNow(new Date(item.watched_at), { addSuffix: true }) })
            ]
          },
          item.id
        )) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "tierlists", children: loadingTierLists ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center py-12 text-muted-foreground", children: "Loading..." }) : publicTierLists.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-12 text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "w-12 h-12 mx-auto mb-4 opacity-50" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "No public tier lists" })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(TierListGrid, { tierLists: publicTierLists, showAuthor: false }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(MobileNav, {})
  ] });
}
export {
  PublicProfilePage as default
};
