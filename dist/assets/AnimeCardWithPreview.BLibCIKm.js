import { r as reactExports, j as jsxRuntimeExports, e as useNavigate, L as Link } from "./react-vendor.CAo4XUiA.js";
import { j as cn, u as useAuth, al as useFeatureFlag, am as FeatureFlag, aF as inferAnimeAdultFlag, aG as splitRating, aH as useWatchlistItem, aI as useAddToWatchlist, aJ as useRemoveFromWatchlist, h as getHighQualityPoster, v as useLongPress, w as openMediaQuickPeek, G as GlassPanel, aK as AdultBadge, aL as ScoreBadge, aM as MetaBadge } from "./index.C6yfkT5T.js";
import { bx as N, by as u } from "./vendor.CJyRs4QS.js";
import { b as buildPreferredAnimeRouteId, a as useHoverPreview } from "./useHoverPreview.Cs_Lh1vM.js";
import { Q as LoaderCircle, c as Check, P as Plus, aJ as Play } from "./icons.C2gBBarQ.js";
function BlurhashImage({
  blurhash,
  hashWidth = 32,
  hashHeight = 32,
  imgClassName,
  className,
  style,
  onLoad,
  ...imgProps
}) {
  const [loaded, setLoaded] = reactExports.useState(false);
  const hasValidHash = !!blurhash && N(blurhash).result;
  const handleLoad = reactExports.useCallback(
    (e) => {
      setLoaded(true);
      onLoad == null ? void 0 : onLoad(e);
    },
    [onLoad]
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: cn("relative overflow-hidden", className), style, children: [
    hasValidHash && !loaded && /* @__PURE__ */ jsxRuntimeExports.jsx(
      u,
      {
        hash: blurhash,
        width: "100%",
        height: "100%",
        resolutionX: hashWidth,
        resolutionY: hashHeight,
        punch: 1,
        className: "absolute inset-0",
        style: { display: "block" }
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "img",
      {
        ...imgProps,
        onLoad: handleLoad,
        className: cn(
          "h-full w-full object-cover transition-opacity duration-300",
          imgClassName,
          hasValidHash ? !loaded ? "opacity-0" : "opacity-100" : void 0
        )
      }
    )
  ] });
}
const resolveAniListId = (value) => {
  const raw = String(value ?? "").trim();
  if (!raw) return null;
  const prefixed = raw.match(/^anilist[:_-]?(\d+)$/i);
  if (prefixed == null ? void 0 : prefixed[1]) return Number(prefixed[1]);
  const numeric = Number(raw);
  return Number.isFinite(numeric) && numeric > 0 ? numeric : null;
};
function AnimeCardWithPreviewInner({ anime, showPreview = true, disableClick = false }) {
  var _a, _b;
  const navigate = useNavigate();
  const { user } = useAuth();
  const blurhashEnabled = useFeatureFlag(FeatureFlag.BLURHASH_IMAGES);
  const [posterIndex, setPosterIndex] = reactExports.useState(0);
  const routeAnimeId = buildPreferredAnimeRouteId({
    id: anime.id,
    name: anime.name,
    malId: anime.malId,
    malID: anime == null ? void 0 : anime.malID,
    mal_id: anime == null ? void 0 : anime.mal_id,
    anilistId: anime.anilistId,
    anilistID: anime == null ? void 0 : anime.anilistID,
    anilist_id: anime == null ? void 0 : anime.anilist_id
  });
  const previewAniListId = anime.anilistId ?? (anime == null ? void 0 : anime.anilistID) ?? (anime == null ? void 0 : anime.anilist_id) ?? resolveAniListId(anime.id) ?? null;
  const isAdult = inferAnimeAdultFlag(anime);
  const { score, label } = splitRating(anime.rating);
  const routeTo = routeAnimeId ? `/anime/${routeAnimeId}` : `/search?q=${encodeURIComponent(anime.name)}`;
  const preview = useHoverPreview({
    anilistId: previewAniListId,
    title: anime.name,
    enabled: showPreview
  });
  const { data: watchlistItem, isLoading: isWatchlistLoading } = useWatchlistItem(anime.id);
  const addToWatchlist = useAddToWatchlist();
  const removeFromWatchlist = useRemoveFromWatchlist();
  const posterCandidates = reactExports.useMemo(() => {
    var _a2;
    const directPoster = ((_a2 = anime.poster) == null ? void 0 : _a2.trim()) || "";
    const directLargeAniList = directPoster.replace("/cover/medium/", "/cover/large/").replace(/\/banner\/(small|medium)\//, "/banner/large/");
    return [
      directLargeAniList,
      directPoster,
      getHighQualityPoster(directPoster),
      "/placeholder.svg"
    ].filter((value, index, arr) => Boolean(value) && arr.indexOf(value) === index);
  }, [anime.poster, previewAniListId]);
  reactExports.useEffect(() => {
    setPosterIndex(0);
  }, [anime.id, anime.poster, previewAniListId]);
  const handlePosterError = () => {
    setPosterIndex((current) => {
      if (current >= posterCandidates.length - 1) return current;
      return current + 1;
    });
  };
  const handleWatchlistClick = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) {
      navigate("/auth");
      return;
    }
    if (watchlistItem) {
      await removeFromWatchlist.mutateAsync(anime.id);
      return;
    }
    await addToWatchlist.mutateAsync({
      animeId: anime.id,
      animeName: anime.name,
      animePoster: anime.poster,
      status: "plan_to_watch"
    });
  };
  const isBusy = isWatchlistLoading || addToWatchlist.isPending || removeFromWatchlist.isPending;
  const longPress = useLongPress({
    onLongPress: () => {
      var _a2, _b2;
      if (disableClick) return;
      openMediaQuickPeek({
        kind: "anime",
        id: anime.id,
        name: anime.name,
        poster: anime.poster,
        anilistId: previewAniListId,
        type: anime.type,
        year: anime.year,
        rating: anime.rating,
        episodesSub: (_a2 = anime.episodes) == null ? void 0 : _a2.sub,
        episodesDub: (_b2 = anime.episodes) == null ? void 0 : _b2.dub,
        routeTo
      });
    },
    disabled: disableClick
  });
  const posterClass = `absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-[0.33,1,0.68,1] ${preview.isActive ? "opacity-0 scale-105" : "opacity-100 group-hover:scale-110"}`;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    GlassPanel,
    {
      hoverEffect: false,
      className: "tk-pressable group relative overflow-hidden rounded-xl border border-white/5 bg-neutral-900 transition-[border-color] duration-300 hover:border-white/20 focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 focus-within:ring-offset-background w-full h-full aspect-[2/3] p-0",
      onMouseEnter: preview.onEnter,
      onMouseLeave: preview.onLeave,
      ...longPress,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 z-0 bg-neutral-900/50", children: [
          blurhashEnabled ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            BlurhashImage,
            {
              src: posterCandidates[posterIndex] || "/placeholder.svg",
              alt: anime.name,
              loading: "lazy",
              decoding: "async",
              blurhash: anime.blurhash ?? void 0,
              className: "absolute inset-0 w-full h-full",
              imgClassName: posterClass,
              onError: handlePosterError,
              style: { imageRendering: "high-quality" }
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: posterCandidates[posterIndex] || "/placeholder.svg",
              alt: anime.name,
              loading: "lazy",
              decoding: "async",
              fetchPriority: "low",
              className: posterClass,
              onError: handlePosterError,
              style: { imageRendering: "high-quality" }
            }
          ),
          showPreview && (preview.isActive || preview.isLoading) && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "video",
            {
              ref: preview.videoRef,
              className: `absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-out ${preview.isActive ? "opacity-100" : "opacity-0"}`,
              muted: true,
              loop: true,
              playsInline: true,
              crossOrigin: "anonymous",
              onError: preview.onError
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 z-10 bg-gradient-to-t from-black/95 via-black/40 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none" }),
        isAdult && /* @__PURE__ */ jsxRuntimeExports.jsx(AdultBadge, { className: "absolute top-2.5 left-2.5 z-20 shadow-sm" }),
        anime.type && !isAdult && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-2.5 left-2.5 z-20 px-2 py-0.5 rounded-sm bg-black/60 border border-white/10 text-white text-[10px] font-bold tracking-wider uppercase shadow-sm", children: anime.type }),
        score && /* @__PURE__ */ jsxRuntimeExports.jsx(
          ScoreBadge,
          {
            score,
            className: "absolute top-2.5 right-2.5 z-20 rounded-sm border border-white/10 bg-black/60 px-2 py-1 text-xs font-bold text-white shadow-sm"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: handleWatchlistClick,
            disabled: isBusy,
            className: `absolute right-2.5 z-40 ${score ? "top-11" : "top-2.5"} flex h-8 w-8 items-center justify-center rounded-full transition-[opacity,transform,background-color,border-color] duration-300 ease-out opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 focus-visible:opacity-100 focus-visible:translate-y-0 ${watchlistItem ? "bg-primary border border-primary text-primary-foreground shadow-lg shadow-primary/20" : "bg-black/60 text-white border border-white/20 hover:bg-white hover:text-black shadow-sm"}`,
            title: watchlistItem ? "Remove from watchlist" : "Add to watchlist",
            "aria-label": watchlistItem ? `Remove ${anime.name} from watchlist` : `Add ${anime.name} to watchlist`,
            children: isBusy ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-3.5 h-3.5 animate-spin" }) : watchlistItem ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-4 h-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" })
          }
        ),
        preview.showFallback && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300", children: preview.isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-10 h-10 animate-spin text-white drop-shadow-md" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-14 w-14 items-center justify-center rounded-full bg-black/50 border border-white/20 text-white transition-transform duration-300 transform scale-90 group-hover:scale-100 shadow-2xl", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "h-6 w-6 fill-white ml-1" }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute bottom-0 inset-x-0 z-20 flex flex-col justify-end p-3.5 pt-12 pointer-events-none", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold leading-tight text-white transition-colors duration-200 group-hover:text-white line-clamp-2 mb-2 drop-shadow-md antialiased", children: anime.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-1.5", children: [
            (((_a = anime.episodes) == null ? void 0 : _a.dub) || 0) > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(MetaBadge, { className: "bg-primary/60 text-primary-foreground border border-primary/30 text-[9px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded-sm shadow-sm", children: [
              "Mic ",
              (_b = anime.episodes) == null ? void 0 : _b.dub
            ] }),
            label && /* @__PURE__ */ jsxRuntimeExports.jsx(MetaBadge, { className: "bg-black/60 text-white/90 border border-white/10 text-[9px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded-sm shadow-sm", children: label })
          ] })
        ] }),
        !disableClick && /* @__PURE__ */ jsxRuntimeExports.jsx(
          Link,
          {
            to: routeTo,
            "aria-label": anime.name,
            className: "absolute inset-0 z-30 focus-visible:outline-none"
          }
        )
      ]
    }
  );
}
const AnimeCardWithPreview = reactExports.memo(AnimeCardWithPreviewInner);
export {
  AnimeCardWithPreview as A,
  BlurhashImage as B
};
