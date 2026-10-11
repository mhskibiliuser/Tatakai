import { e as useNavigate, l as useSearchParams, r as reactExports, j as jsxRuntimeExports } from "./react-vendor.CAo4XUiA.js";
import { bp as formatDistanceToNow, bf as ue } from "./vendor.CJyRs4QS.js";
import { K as useIsDesktopApp, u as useAuth, s as useIsMobile, aS as useInfinitePublicWatchRooms, aT as useUserWatchRooms, z as usePublicWatchRooms, aU as useCreateRoom, Q as Background, S as Sidebar, ae as Dialog, ax as DialogTrigger, B as Button, af as DialogContent, ag as DialogHeader, ah as DialogTitle, ay as Label, j as cn, l as getProxiedImageUrl, aV as Select, aW as SelectTrigger, aX as SelectValue, aY as SelectContent, aZ as SelectItem, aO as useUserBadges, G as GlassPanel, aQ as UserBadges, I as contentGraph, a_ as toAnimeCard } from "./index.C6yfkT5T.js";
import { M as MobileNav } from "./MobileNav.ABHzkhTQ.js";
import { A as AnimatedCounter } from "./AnimatedCounter.DVb9HioJ.js";
import { u as useDebounce } from "./useDebounce.DLNDL8OB.js";
import { u as ArrowLeft, ay as Tv, n as Radio, U as Users, P as Plus, S as Search, a5 as Globe, a6 as Lock, b2 as Captions, c1 as MicVocal, c2 as Key, c3 as Crown, ap as UserPlus, aJ as Play } from "./icons.C2gBBarQ.js";
import { m as motion } from "./motion.DVGLRFCH.js";
import "./tanstack.DPr3OB19.js";
import "./supabase.WuRMX5Dg.js";
import "./radix.BiK9uYXL.js";
import "./hls.BlgtCWcq.js";
import "./editor.Dxw8dtyw.js";
import "./charts.Dr1fgDJ-.js";
function WatchRoomCard({ room }) {
  var _a, _b;
  const navigate = useNavigate();
  const { data: hostBadges } = useUserBadges(room.host_id);
  const accessBadge = {
    public: { icon: Globe, color: "bg-white/10 text-white border-white/20", label: "Public" },
    invite: { icon: UserPlus, color: "bg-sky-500/10 text-sky-400 border-sky-500/20", label: "Invite" },
    password: { icon: Lock, color: "bg-rose-500/10 text-rose-400 border-rose-500/20", label: "Private" }
  }[room.access_type] || { icon: Globe, color: "bg-white/10 text-white border-white/20", label: "Public" };
  const AccessIcon = accessBadge.icon;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      initial: { opacity: 0, y: 15 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true, margin: "-40px" },
      transition: { duration: 0.4, ease: "easeOut" },
      className: "group relative h-full",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        GlassPanel,
        {
          onClick: () => navigate(`/isshoni/room/${room.id}`),
          className: "flex h-full flex-col overflow-hidden cursor-pointer p-0 border border-white/[0.08] bg-[#0a0a0a]/80 transition-all duration-300 hover:border-white/[0.18] hover:bg-[#111] hover:shadow-2xl",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-[16/9] w-full overflow-hidden bg-black/40", children: [
              room.anime_poster ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "img",
                  {
                    src: getProxiedImageUrl(room.anime_poster),
                    alt: room.anime_title || "",
                    className: "h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 opacity-90 group-hover:opacity-100"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/20 to-transparent opacity-80" })
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-full w-full items-center justify-center bg-white/[0.02]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Tv, { className: "h-10 w-10 text-white/20" }) }),
              room.is_playing && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute right-3 top-3 flex items-center gap-1.5 rounded-full border border-rose-500/30 bg-rose-500/20 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-rose-400 backdrop-blur-md", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-1.5 w-1.5 animate-pulse rounded-full bg-rose-400" }),
                "Live"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute bottom-3 left-3 flex gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: cn("inline-flex items-center gap-1.5 rounded-md border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider backdrop-blur-md", accessBadge.color), children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(AccessIcon, { className: "h-3 w-3" }),
                  accessBadge.label
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex items-center rounded-md border border-white/10 bg-black/60 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white/80 backdrop-blur-md", children: room.category || "SUB" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-1 flex-col p-4 sm:p-5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-2 flex items-start justify-between gap-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "line-clamp-2 flex-1 font-display text-lg font-bold leading-tight tracking-tight text-foreground transition-colors group-hover:text-white", children: room.name }) }),
              room.anime_title && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mb-4 flex items-center gap-2 line-clamp-1 text-sm text-muted-foreground/90 font-medium", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/10 text-white", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "h-2.5 w-2.5 ml-0.5", fill: "currentColor" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "truncate", children: [
                  room.anime_title,
                  room.episode_number ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-white/40 font-normal", children: [
                    " • Ep ",
                    room.episode_number
                  ] }) : ""
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-auto flex items-center justify-between border-t border-white/5 pt-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-6 w-6 items-center justify-center rounded-full bg-white/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Crown, { className: "h-3 w-3 text-white/70" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "max-w-[100px] truncate text-xs font-semibold text-white/80", children: ((_a = room.host_profile) == null ? void 0 : _a.display_name) || ((_b = room.host_profile) == null ? void 0 : _b.username) || "Host" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { onClick: (e) => e.stopPropagation(), children: /* @__PURE__ */ jsxRuntimeExports.jsx(UserBadges, { badges: hostBadges, size: 14, max: 3 }) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-medium uppercase tracking-wider text-muted-foreground/60", children: formatDistanceToNow(new Date(room.created_at), { addSuffix: false }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 text-[11px] font-bold text-white/70", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-3.5 w-3.5" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                      room.participant_count || 0,
                      "/",
                      room.max_participants
                    ] })
                  ] })
                ] })
              ] })
            ] })
          ]
        }
      )
    }
  );
}
function IsshoNiPage() {
  const navigate = useNavigate();
  const isDesktopApp = useIsDesktopApp();
  const [searchParams] = useSearchParams();
  const { user } = useAuth();
  const isMobile = useIsMobile();
  const [isCreateOpen, setIsCreateOpen] = reactExports.useState(false);
  const [animeSearchQuery, setAnimeSearchQuery] = reactExports.useState("");
  const [searchResults, setSearchResults] = reactExports.useState([]);
  const [isSearching, setIsSearching] = reactExports.useState(false);
  const [scheduledStart, setScheduledStart] = reactExports.useState("now");
  const [customMinutes, setCustomMinutes] = reactExports.useState("10");
  const debouncedAnimeSearch = useDebounce(animeSearchQuery, 500);
  const animeIdFromUrl = searchParams.get("anime");
  const animeTitleFromUrl = searchParams.get("title");
  const animePosterFromUrl = searchParams.get("poster");
  const [newRoom, setNewRoom] = reactExports.useState({
    name: "",
    access_type: "public",
    password: "",
    max_participants: 10,
    anime_id: "",
    anime_title: "",
    anime_poster: "",
    category: "sub"
  });
  const { data: infiniteData, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading: loadingPublic } = useInfinitePublicWatchRooms();
  const { data: myRooms = [], isLoading: loadingMyRooms } = useUserWatchRooms();
  const { data: publicRoomsSimple = [] } = usePublicWatchRooms();
  const createRoom = useCreateRoom();
  const allPublicRooms = (infiniteData == null ? void 0 : infiniteData.pages.flat()) || [];
  const liveRooms = allPublicRooms.filter((r) => r.is_playing);
  const otherRooms = allPublicRooms.filter((r) => !r.is_playing);
  const observer = reactExports.useRef(null);
  const lastRoomElementRef = reactExports.useCallback((node) => {
    if (loadingPublic) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    }, { rootMargin: isMobile ? "300px" : "600px", threshold: isMobile ? 0.2 : 0.1 });
    if (node) observer.current.observe(node);
  }, [loadingPublic, hasNextPage, isFetchingNextPage, fetchNextPage, isMobile]);
  reactExports.useEffect(() => {
    if (animeIdFromUrl && animeTitleFromUrl && user) {
      setNewRoom((prev) => ({
        ...prev,
        name: `Watching ${animeTitleFromUrl}`,
        anime_id: animeIdFromUrl,
        anime_title: animeTitleFromUrl,
        anime_poster: animePosterFromUrl || ""
      }));
      setIsCreateOpen(true);
    }
  }, [animeIdFromUrl, animeTitleFromUrl, animePosterFromUrl, user]);
  reactExports.useEffect(() => {
    const search = async () => {
      if (debouncedAnimeSearch.length < 3) {
        setSearchResults([]);
        return;
      }
      setIsSearching(true);
      try {
        const results = await contentGraph.search({ query: debouncedAnimeSearch, page: 1, perPage: 5 });
        setSearchResults((results.media || []).map(toAnimeCard).slice(0, 5));
      } catch (error) {
        console.error("Search failed:", error);
      } finally {
        setIsSearching(false);
      }
    };
    search();
  }, [debouncedAnimeSearch]);
  const handleCreate = async () => {
    if (!newRoom.name.trim()) return ue.error("Please enter a room name");
    if (newRoom.access_type === "password" && !newRoom.password.trim()) return ue.error("Please enter a password");
    let scheduledStartAt = null;
    if (scheduledStart !== "now") {
      const minutes = scheduledStart === "custom" ? parseInt(customMinutes) : parseInt(scheduledStart);
      if (!isNaN(minutes)) scheduledStartAt = new Date(Date.now() + minutes * 60 * 1e3).toISOString();
    }
    createRoom.mutate({
      name: newRoom.name,
      access_type: newRoom.access_type,
      password: newRoom.access_type === "password" ? newRoom.password : void 0,
      max_participants: newRoom.max_participants,
      anime_id: newRoom.anime_id || void 0,
      anime_title: newRoom.anime_title || void 0,
      anime_poster: newRoom.anime_poster || void 0,
      category: newRoom.category,
      scheduled_start_at: scheduledStartAt
    }, {
      onSuccess: (room) => {
        ue.success("Room created successfully!");
        setIsCreateOpen(false);
        navigate(`/isshoni/room/${room.id}`);
      },
      onError: (error) => ue.error(error.message || "Failed to create room")
    });
  };
  const totalParticipants = publicRoomsSimple.reduce((acc, r) => acc + (r.participant_count || 0), 0);
  const inputCls = "w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none transition-all focus:border-white/30 focus:bg-black/40 focus:ring-1 focus:ring-white/10 h-12";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background text-foreground overflow-x-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Background, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Sidebar, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute inset-x-0 top-0 h-[50vh] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/[0.04] via-background to-background" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: `relative z-10 ${isDesktopApp ? "pl-4" : "pl-4 md:pl-32"} pr-4 md:pr-6 py-4 md:py-8 max-w-[1600px] mx-auto pb-24 md:pb-8`, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-14", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-4 mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => navigate(-1), className: "group flex items-center gap-2 text-muted-foreground transition-colors hover:text-white", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-5 w-5 transition-transform group-hover:-translate-x-1" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium", children: "Back" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col justify-between gap-8 lg:flex-row lg:items-end", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center gap-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                initial: { scale: 0.9, opacity: 0 },
                animate: { scale: 1, opacity: 1 },
                transition: { duration: 0.4, ease: "easeOut" },
                className: "flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.02] shadow-sm",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Tv, { className: "h-8 w-8 text-white/90" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.p,
                {
                  initial: { opacity: 0, y: 5 },
                  animate: { opacity: 1, y: 0 },
                  className: "mb-1 text-[11px] font-bold uppercase tracking-widest text-muted-foreground/80",
                  children: "Synchronized Viewing"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.h1,
                {
                  initial: { opacity: 0, y: 5 },
                  animate: { opacity: 1, y: 0 },
                  transition: { delay: 0.1 },
                  className: "font-display text-4xl font-black tracking-tight text-white md:text-5xl lg:text-6xl",
                  children: "Watch2Together"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.div,
                {
                  initial: { opacity: 0 },
                  animate: { opacity: 1 },
                  transition: { delay: 0.2 },
                  className: "mt-4 flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-wider",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5 rounded-full border border-rose-500/30 bg-rose-500/10 px-3 py-1.5 text-rose-400", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Radio, { className: "h-3.5 w-3.5 animate-pulse" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatedCounter, { value: liveRooms.length, className: "tabular-nums" }),
                      " Live"
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-white/80", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-3.5 w-3.5 text-white/50" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatedCounter, { value: totalParticipants, className: "tabular-nums" }),
                      " Watching"
                    ] })
                  ]
                }
              )
            ] })
          ] }),
          user ? /* @__PURE__ */ jsxRuntimeExports.jsxs(Dialog, { open: isCreateOpen, onOpenChange: setIsCreateOpen, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: { opacity: 0, scale: 0.95 }, animate: { opacity: 1, scale: 1 }, transition: { delay: 0.2 }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "lg", className: "gap-2 rounded-full bg-white text-black hover:bg-white/90 font-bold shadow-xl px-8 h-12 transition-transform active:scale-95", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-5 w-5" }),
              "Create Room"
            ] }) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "sm:max-w-2xl p-0 overflow-hidden bg-[#0a0a0a] border-white/10 sm:rounded-3xl shadow-2xl", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-6 pt-6 pb-4 border-b border-white/5 bg-white/[0.01]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { className: "text-xl font-bold tracking-tight flex items-center gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-white", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Tv, { className: "h-4 w-4" }) }),
                "Create Watch Room"
              ] }) }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 space-y-6 max-h-[70vh] overflow-y-auto", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-[11px] font-bold uppercase tracking-widest text-muted-foreground ml-1", children: "Select Anime (Optional)" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/50" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "input",
                      {
                        placeholder: "Search for an anime...",
                        className: cn(inputCls, "pl-11"),
                        value: animeSearchQuery,
                        onChange: (e) => setAnimeSearchQuery(e.target.value)
                      }
                    ),
                    isSearching && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute right-4 top-1/2 -translate-y-1/2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" }) }),
                    searchResults.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-full left-0 right-0 mt-2 bg-[#111] border border-white/10 rounded-xl shadow-2xl z-50 overflow-hidden", children: searchResults.map((anime) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "div",
                      {
                        className: "flex items-center gap-4 p-3 hover:bg-white/5 cursor-pointer transition-colors border-b border-white/5 last:border-0",
                        onClick: () => {
                          setNewRoom({
                            ...newRoom,
                            name: newRoom.name || `Watching ${anime.name}`,
                            anime_id: anime.id,
                            anime_title: anime.name,
                            anime_poster: anime.poster
                          });
                          setAnimeSearchQuery("");
                          setSearchResults([]);
                        },
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: getProxiedImageUrl(anime.poster), alt: "", className: "w-10 h-14 object-cover rounded-md bg-black/50" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-white line-clamp-1", children: anime.name }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: anime.type || "Anime" })
                          ] })
                        ]
                      },
                      anime.id
                    )) })
                  ] }),
                  newRoom.anime_title && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 p-3 bg-white/[0.03] rounded-xl border border-white/10 mt-3", children: [
                    newRoom.anime_poster && /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: getProxiedImageUrl(newRoom.anime_poster), alt: "", className: "w-10 h-14 object-cover rounded-md" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm text-white line-clamp-1", children: newRoom.anime_title }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "button",
                        {
                          onClick: () => setNewRoom({ ...newRoom, anime_id: "", anime_title: "", anime_poster: "" }),
                          className: "text-[11px] font-bold uppercase tracking-wider text-rose-400 hover:text-rose-300 mt-1",
                          children: "Remove Selection"
                        }
                      )
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-[11px] font-bold uppercase tracking-widest text-muted-foreground ml-1", children: "Room Name *" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "input",
                    {
                      placeholder: "e.g., Chill Anime Night 🌙",
                      value: newRoom.name,
                      onChange: (e) => setNewRoom({ ...newRoom, name: e.target.value }),
                      className: inputCls
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-[11px] font-bold uppercase tracking-widest text-muted-foreground ml-1", children: "Access Type" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: newRoom.access_type, onValueChange: (v) => setNewRoom({ ...newRoom, access_type: v }), children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: cn(inputCls, "py-0 h-12"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { className: "bg-[#111] border-white/10", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "public", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { className: "w-4 h-4 text-white/50" }),
                          "Public"
                        ] }) }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "password", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-4 h-4 text-rose-400" }),
                          "Password"
                        ] }) })
                      ] })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-[11px] font-bold uppercase tracking-widest text-muted-foreground ml-1", children: "Version" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: newRoom.category, onValueChange: (v) => setNewRoom({ ...newRoom, category: v }), children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: cn(inputCls, "py-0 h-12"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { className: "bg-[#111] border-white/10", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "sub", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Captions, { className: "w-4 h-4 text-white/50" }),
                          "Subbed"
                        ] }) }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "dub", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(MicVocal, { className: "w-4 h-4 text-white/50" }),
                          "Dubbed"
                        ] }) })
                      ] })
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-[11px] font-bold uppercase tracking-widest text-muted-foreground ml-1", children: "Schedule" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: scheduledStart, onValueChange: setScheduledStart, children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: cn(inputCls, "py-0 h-12"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "When to start?" }) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { className: "bg-[#111] border-white/10", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "now", children: "Start Immediately" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "1", children: "In 1 minute" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "5", children: "In 5 minutes" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "custom", children: "Custom wait time..." })
                      ] })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-[11px] font-bold uppercase tracking-widest text-muted-foreground ml-1", children: "Max Viewers" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: newRoom.max_participants.toString(), onValueChange: (v) => setNewRoom({ ...newRoom, max_participants: parseInt(v) }), children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: cn(inputCls, "py-0 h-12"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { className: "bg-[#111] border-white/10", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "5", children: "5 Viewers" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "10", children: "10 Viewers" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "20", children: "20 Viewers" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "50", children: "50 Viewers" })
                      ] })
                    ] })
                  ] })
                ] }),
                scheduledStart === "custom" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-[11px] font-bold uppercase tracking-widest text-muted-foreground ml-1", children: "Minutes from now" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "input",
                      {
                        type: "number",
                        min: "1",
                        max: "1440",
                        value: customMinutes,
                        onChange: (e) => setCustomMinutes(e.target.value),
                        className: inputCls
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: "minutes" })
                  ] })
                ] }),
                newRoom.access_type === "password" && /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: { opacity: 0, height: 0 }, animate: { opacity: 1, height: "auto" }, className: "space-y-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-[11px] font-bold uppercase tracking-widest text-rose-400 ml-1", children: "Room Password *" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Key, { className: "absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/50" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "input",
                      {
                        type: "password",
                        placeholder: "Enter a secret password",
                        value: newRoom.password,
                        onChange: (e) => setNewRoom({ ...newRoom, password: e.target.value }),
                        className: cn(inputCls, "pl-11")
                      }
                    )
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-end gap-3 px-6 py-4 border-t border-white/5 bg-white/[0.01]", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", onClick: () => setIsCreateOpen(false), className: "rounded-full hover:bg-white/5 font-semibold", children: "Cancel" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    onClick: handleCreate,
                    disabled: createRoom.isPending,
                    className: "rounded-full bg-white text-black hover:bg-white/90 font-bold px-8 h-10 shadow-lg active:scale-95 transition-transform",
                    children: createRoom.isPending ? "Creating..." : "Create Room"
                  }
                )
              ] })
            ] })
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: () => navigate("/auth"), size: "lg", className: "rounded-full bg-white text-black hover:bg-white/90 font-bold px-8 shadow-xl", children: "Sign in to Create" })
        ] })
      ] }),
      user && myRooms.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mb-14", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-white", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Crown, { className: "h-5 w-5" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-bold tracking-tight", children: "Your Active Rooms" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground/70", children: "Manage your hosted sessions" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5", children: myRooms.map((room) => /* @__PURE__ */ jsxRuntimeExports.jsx(WatchRoomCard, { room }, room.id)) })
      ] }),
      liveRooms.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mb-14", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 rounded-lg border border-rose-500/30 bg-rose-500/10 px-3 py-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Radio, { className: "h-4 w-4 animate-pulse text-rose-400" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-bold uppercase tracking-wider text-rose-300", children: "Live Now" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-muted-foreground tabular-nums font-medium", children: [
            liveRooms.length,
            " public rooms broadcasting"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5", children: liveRooms.map((room) => /* @__PURE__ */ jsxRuntimeExports.jsx(WatchRoomCard, { room }, room.id)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 border border-white/10 text-white", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { className: "h-5 w-5 text-white/70" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-bold tracking-tight", children: "Discover Lobbies" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground/70", children: "Find open communities to watch with" })
          ] })
        ] }),
        loadingPublic ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5", children: [...Array(6)].map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-56 bg-white/[0.03] border border-white/5 rounded-2xl animate-pulse" }, i)) }) : otherRooms.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5", children: otherRooms.map((room, index) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: index === otherRooms.length - 1 ? lastRoomElementRef : null, children: /* @__PURE__ */ jsxRuntimeExports.jsx(WatchRoomCard, { room }) }, room.id)) }),
          isFetchingNextPage && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 mt-5", children: [...Array(3)].map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-56 bg-white/[0.03] border border-white/5 rounded-2xl animate-pulse" }, i)) })
        ] }) : allPublicRooms.length === 0 ? (
          /* Empty State */
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center rounded-3xl border border-dashed border-white/10 bg-white/[0.015] px-6 py-20 text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-white/[0.03] ring-1 ring-white/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Tv, { className: "h-10 w-10 text-muted-foreground/40" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-xl font-semibold tracking-tight text-white mb-2", children: "The Lobby is Empty" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "max-w-[320px] text-sm text-muted-foreground leading-relaxed mb-8", children: "Be the trendsetter! Create your own room and start a watch party for others to join." }),
            user && /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: () => setIsCreateOpen(true), size: "lg", className: "rounded-full bg-white text-black hover:bg-white/90 font-bold px-8 shadow-lg active:scale-95", children: "Host a Room" })
          ] })
        ) : null
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(MobileNav, {})
  ] });
}
export {
  WatchRoomCard,
  IsshoNiPage as default
};
