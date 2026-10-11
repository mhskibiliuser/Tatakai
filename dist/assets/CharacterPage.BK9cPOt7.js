import { i as useParams, e as useNavigate, u as useLocation, r as reactExports, j as jsxRuntimeExports } from "./react-vendor.CAo4XUiA.js";
import { K as useIsDesktopApp, Q as Background, j as cn, B as Button, S as Sidebar, G as GlassPanel, aj as ANILIST_GRAPHQL_ENDPOINT } from "./index.C6yfkT5T.js";
import { M as MobileNav } from "./MobileNav.ABHzkhTQ.js";
import { a as useQuery } from "./tanstack.DPr3OB19.js";
import { u as useIsCharacterFavorited, a as useToggleCharacterFavorite } from "./useCharacterFavorites.DOVoPcx4.js";
import { u as ArrowLeft, a as CircleAlert, H as Heart, k as Sparkles, I as Info, Z as Film, aJ as Play } from "./icons.C2gBBarQ.js";
import { m as motion } from "./motion.DVGLRFCH.js";
import "./vendor.CJyRs4QS.js";
import "./supabase.WuRMX5Dg.js";
import "./radix.BiK9uYXL.js";
import "./hls.BlgtCWcq.js";
import "./editor.Dxw8dtyw.js";
import "./charts.Dr1fgDJ-.js";
const ANILIST_CHAR_QUERY = `
query ($id: Int) {
  Character(id: $id) {
    id
    name { full native alternative }
    image { large }
    description(asHtml: false)
    gender
    dateOfBirth { year month day }
    age
    bloodType
    favourites
    media(sort: START_DATE_DESC) {
      edges {
        node { id title { romaji english } coverImage { large } type format }
        characterRole
      }
    }
  }
}
`;
function CharacterPage() {
  var _a, _b, _c;
  const { charname } = useParams();
  const navigate = useNavigate();
  const isDesktopApp = useIsDesktopApp();
  const location = useLocation();
  const { fallbackName } = reactExports.useMemo(() => {
    const searchParams = new URLSearchParams(location.search);
    return { fallbackName: searchParams.get("name") };
  }, [location.search]);
  const isNumericId = reactExports.useMemo(() => charname ? /^\d+$/.test(charname) : false, [charname]);
  const { data: aniListChar, isLoading: aniLoading } = useQuery({
    queryKey: ["anilist-character", charname, fallbackName],
    queryFn: async () => {
      var _a2, _b2;
      if (!charname) return null;
      if (isNumericId) {
        const res = await fetch(ANILIST_GRAPHQL_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query: ANILIST_CHAR_QUERY, variables: { id: parseInt(charname) } })
        });
        const json = await res.json();
        if ((_a2 = json == null ? void 0 : json.data) == null ? void 0 : _a2.Character) return json.data.Character;
      }
      const searchQuery = fallbackName || charname.replace(/-/g, " ");
      const searchGql = `
                query ($search: String) {
                    Character(search: $search) {
                        id
                        name { full native alternative }
                        image { large }
                        description(asHtml: false)
                        gender
                        dateOfBirth { year month day }
                        age
                        bloodType
                        favourites
                        media(sort: START_DATE_DESC) {
                            edges {
                                node { id title { romaji english } coverImage { large } type format }
                                characterRole
                            }
                        }
                    }
                }
            `;
      const searchRes = await fetch(ANILIST_GRAPHQL_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: searchGql, variables: { search: searchQuery } })
      });
      const searchJson = await searchRes.json();
      return (_b2 = searchJson == null ? void 0 : searchJson.data) == null ? void 0 : _b2.Character;
    },
    staleTime: 1e3 * 60 * 60
  });
  const isLoading = aniLoading;
  const favoriteCharacterId = (aniListChar == null ? void 0 : aniListChar.id) != null ? String(aniListChar.id) : void 0;
  const { data: isFavorited = false } = useIsCharacterFavorited(favoriteCharacterId);
  const toggleFavorite = useToggleCharacterFavorite();
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background text-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Background, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: cn("relative z-10 p-6 flex flex-col items-center justify-center min-h-[80vh]", isDesktopApp ? "pl-6" : "pl-6 md:pl-32"), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mb-6" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl font-black uppercase tracking-[0.3em] animate-pulse", children: "Synchronizing Soul..." })
      ] })
    ] });
  }
  if (!aniListChar) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background text-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Background, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: cn("relative z-10 p-6", isDesktopApp ? "pl-6" : "pl-6 md:pl-32"), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => navigate(-1), className: "flex items-center gap-2 text-muted-foreground hover:text-white mb-12 transition-colors", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-5 h-5" }),
          " Back"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-24 space-y-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-20 h-20 text-destructive mx-auto opacity-20" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-4xl font-black", children: "Character Not Found" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground max-w-md mx-auto", children: "We couldn't locate this character in the universal registry." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: () => navigate("/"), variant: "outline", className: "rounded-xl px-8 h-12", children: "Return Home" })
        ] })
      ] })
    ] });
  }
  const char = aniListChar;
  const mediaRelations = ((_a = char.media) == null ? void 0 : _a.edges) || [];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background text-foreground overflow-x-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Background, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Sidebar, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: cn("relative z-10 pr-6 py-6 max-w-[1400px] mx-auto pb-24", isDesktopApp ? "pl-6" : "pl-6 md:pl-32"), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col lg:flex-row gap-12 lg:gap-20 mb-24 items-start", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full lg:w-[400px] space-y-8 flex-shrink-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, scale: 0.9 },
              animate: { opacity: 1, scale: 1 },
              className: "relative group rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl shadow-primary/10",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "img",
                  {
                    src: char.image.large,
                    alt: char.name.full,
                    className: "w-full aspect-[3/4.5] object-cover transition-transform duration-700 group-hover:scale-110"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    onClick: () => {
                      var _a2, _b2, _c2, _d;
                      if (!favoriteCharacterId || toggleFavorite.isPending) return;
                      toggleFavorite.mutate({
                        characterId: favoriteCharacterId,
                        characterName: ((_a2 = char.name) == null ? void 0 : _a2.full) || ((_b2 = char.name) == null ? void 0 : _b2.native) || "Unknown Character",
                        characterImage: ((_c2 = char.image) == null ? void 0 : _c2.large) || null,
                        nativeName: ((_d = char.name) == null ? void 0 : _d.native) || null
                      });
                    },
                    disabled: toggleFavorite.isPending,
                    "aria-pressed": isFavorited,
                    "aria-label": isFavorited ? "Remove from favorites" : "Add to favorites",
                    className: cn(
                      "absolute top-6 right-6 w-14 h-14 rounded-2xl flex items-center justify-center backdrop-blur-2xl border border-white/20 transition-all active:scale-90 shadow-xl disabled:opacity-60",
                      isFavorited ? "bg-red-500 text-white border-red-400" : "bg-black/40 text-white/60 hover:text-white"
                    ),
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: cn("w-6 h-6", isFavorited && "fill-current") })
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassPanel, { className: "p-6 rounded-[2rem] bg-white/[0.02] border-white/5 flex flex-col items-center text-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1", children: "Favourites" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-black text-primary", children: (char.favourites || 0).toLocaleString() })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassPanel, { className: "p-6 rounded-[2rem] bg-white/[0.02] border-white/5 flex flex-col items-center text-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1", children: "Gender" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-black capitalize", children: char.gender || "?" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-12", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0, x: -20 },
                animate: { opacity: 1, x: 0 },
                className: "flex items-center gap-3 text-primary text-xs font-black uppercase tracking-[0.2em] bg-primary/10 w-fit px-4 py-2 rounded-full border border-primary/20",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-4 h-4" }),
                  "Legendary Character"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-6xl md:text-8xl font-black tracking-tighter leading-none", children: char.name.full }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl md:text-4xl text-muted-foreground font-medium italic opacity-50", children: char.name.native })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: (_b = char.name.alternative) == null ? void 0 : _b.slice(0, 4).map((alt) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-3 py-1 rounded-lg bg-white/5 border border-white/5 text-[10px] font-bold uppercase tracking-widest text-muted-foreground", children: alt }, alt)) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm font-black uppercase tracking-widest text-primary", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { className: "w-4 h-4" }),
              "Biography"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg text-muted-foreground leading-relaxed font-medium whitespace-pre-line max-h-[400px] overflow-y-auto pr-4 custom-scrollbar", children: char.description || "No biography available for this character." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-8", children: [
            char.age && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-black uppercase tracking-widest text-muted-foreground opacity-60", children: "Age" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-lg", children: char.age })
            ] }),
            char.bloodType && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-black uppercase tracking-widest text-muted-foreground opacity-60", children: "Blood Type" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-lg", children: char.bloodType })
            ] }),
            ((_c = char.dateOfBirth) == null ? void 0 : _c.month) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-black uppercase tracking-widest text-muted-foreground opacity-60", children: "Birthday" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-bold text-lg", children: [
                char.dateOfBirth.day,
                "/",
                char.dateOfBirth.month
              ] })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-4xl font-black tracking-tight", children: [
              "Media ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary italic", children: "Appearances" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground font-medium", children: "Shows and manga where this character plays a role." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-primary border border-white/5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Film, { className: "w-6 h-6" }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6", children: mediaRelations.map((rel, idx) => {
          var _a2;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 20 },
              whileInView: { opacity: 1, y: 0 },
              transition: { delay: idx * 0.05 },
              className: "group cursor-pointer",
              onClick: () => navigate(`/${rel.node.type === "ANIME" ? "anime" : "manga"}/${rel.node.id}`),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-[3/4.5] rounded-2xl overflow-hidden border border-white/5 mb-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "img",
                    {
                      src: rel.node.coverImage.large,
                      alt: rel.node.title.romaji,
                      className: "w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-full bg-primary/80 backdrop-blur-md flex items-center justify-center text-white", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "w-5 h-5 fill-current" }) }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-2 right-2 px-2 py-1 rounded-lg bg-black/60 backdrop-blur-md border border-white/10 text-[8px] font-black uppercase tracking-widest text-white", children: rel.characterRole })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-bold text-xs truncate group-hover:text-primary transition-colors", children: rel.node.title.romaji }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground font-medium capitalize", children: (_a2 = rel.node.format) == null ? void 0 : _a2.replace(/_/g, " ") })
              ]
            },
            rel.node.id
          );
        }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(MobileNav, {})
  ] });
}
export {
  CharacterPage as default
};
