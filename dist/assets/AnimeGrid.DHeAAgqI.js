import { r as reactExports, e as useNavigate, j as jsxRuntimeExports } from "./react-vendor.CAo4XUiA.js";
import { ak as useTheme, s as useIsMobile, al as useFeatureFlag, am as FeatureFlag, P as Peekable, G as GlassPanel, h as getHighQualityPoster, an as peekFromManga, p as peekFromAnime } from "./index.C6yfkT5T.js";
import "./vendor.CJyRs4QS.js";
import { A as AnimeCardWithPreview, B as BlurhashImage } from "./AnimeCardWithPreview.BLibCIKm.js";
import { b as buildPreferredAnimeRouteId } from "./useHoverPreview.Cs_Lh1vM.js";
import { ay as Tv, aI as Star, aJ as Play, Z as Film, B as BookOpen } from "./icons.C2gBBarQ.js";
const AnimeGrid = reactExports.memo(function AnimeGrid2({
  animes,
  title,
  icon,
  enablePreview = false,
  gridSize = "normal"
}) {
  const navigate = useNavigate();
  const { isUltraLite } = useTheme();
  const isMobile = useIsMobile();
  const blurhashEnabled = useFeatureFlag(FeatureFlag.BLURHASH_IMAGES) && !isMobile;
  const gridClasses = {
    compact: "grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 xl:grid-cols-8 gap-2",
    normal: "grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4",
    large: "grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
  };
  const cardSizeClasses = {
    compact: "aspect-[3/4]",
    normal: "aspect-[2/3]",
    large: "aspect-[3/4]"
  };
  const uniqueAnimes = animes.filter((anime, index, list) => {
    const mediaType = String(anime.mediaType || "anime").toLowerCase();
    const key = `${mediaType}:${String(anime.id || "").trim().toLowerCase()}`;
    return index === list.findIndex((candidate) => {
      const candidateType = String(candidate.mediaType || "anime").toLowerCase();
      const candidateKey = `${candidateType}:${String(candidate.id || "").trim().toLowerCase()}`;
      return candidateKey === key;
    });
  });
  const getMediaIcon = (type) => {
    switch (type == null ? void 0 : type.toLowerCase()) {
      case "manga":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-3 h-3" });
      case "movie":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(Film, { className: "w-3 h-3" });
      default:
        return /* @__PURE__ */ jsxRuntimeExports.jsx(Tv, { className: "w-3 h-3" });
    }
  };
  const handlePosterError = (e) => {
    const img = e.currentTarget;
    if (img.dataset.fallback === "1") return;
    img.dataset.fallback = "1";
    img.src = "/placeholder.svg";
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mb-14 md:mb-24", style: { contentVisibility: "auto", containIntrinsicSize: "auto 500px" }, children: [
    title && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-between mb-5 md:mb-8 px-1 md:px-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-display text-xl md:text-2xl font-semibold tracking-tight flex items-center gap-2.5", children: [
      icon || /* @__PURE__ */ jsxRuntimeExports.jsx(Tv, { className: "w-5 h-5 text-primary" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "line-clamp-1", children: title })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `grid ${gridClasses[gridSize]}`, children: uniqueAnimes.map((anime, index) => {
      var _a, _b;
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
      const cardKey = `${String(anime.mediaType || "anime")}:${String(anime.id || "unknown")}:${index}`;
      const animateCard = !isUltraLite && !isMobile;
      if (enablePreview && !isMobile) {
        return /* @__PURE__ */ jsxRuntimeExports.jsx(AnimeCardWithPreview, { anime, showPreview: true }, cardKey);
      }
      const goToCard = () => {
        const mediaType = anime.mediaType || "anime";
        const baseRoute = mediaType === "manga" ? "/manga" : "/anime";
        if (routeAnimeId) {
          navigate(`${baseRoute}/${routeAnimeId}`);
          return;
        }
        navigate(`/search?q=${encodeURIComponent(anime.name)}`);
      };
      const cardRouteTo = (() => {
        const mediaType = anime.mediaType || "anime";
        const baseRoute = mediaType === "manga" ? "/manga" : "/anime";
        return routeAnimeId ? `${baseRoute}/${routeAnimeId}` : `/search?q=${encodeURIComponent(anime.name)}`;
      })();
      const CardWrapper = isMobile ? "div" : GlassPanel;
      const wrapperProps = isMobile ? {
        role: "button",
        tabIndex: 0,
        onKeyDown: (e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            goToCard();
          }
        },
        className: "group relative cursor-pointer overflow-hidden rounded-[var(--radius)] border border-white/5 bg-white/[0.03] active:scale-[0.98]"
      } : {
        hoverEffect: animateCard,
        className: "group cursor-pointer overflow-hidden active:scale-[0.98] md:transition-all md:duration-300 md:hover:z-10 md:hover:scale-[1.02]"
      };
      return /* @__PURE__ */ jsxRuntimeExports.jsx(
        Peekable,
        {
          media: anime.mediaType === "manga" ? peekFromManga(anime, cardRouteTo) : peekFromAnime(anime, cardRouteTo),
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardWrapper, { onClick: goToCard, ...wrapperProps, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `relative ${cardSizeClasses[gridSize]}`, style: { contentVisibility: "auto", containIntrinsicSize: "auto 260px" }, children: [
            blurhashEnabled ? /* @__PURE__ */ jsxRuntimeExports.jsx(
              BlurhashImage,
              {
                src: getHighQualityPoster(anime.poster, anime.anilistId),
                alt: anime.name,
                loading: "lazy",
                decoding: "async",
                onError: handlePosterError,
                blurhash: anime.blurhash ?? void 0,
                imgClassName: `w-full h-full object-cover ${animateCard ? "transition-all duration-700 group-hover:scale-105 group-hover:brightness-110" : ""}`
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: getHighQualityPoster(anime.poster, anime.anilistId),
                alt: anime.name,
                loading: "lazy",
                decoding: "async",
                fetchPriority: "low",
                onError: handlePosterError,
                className: `w-full h-full object-cover ${animateCard ? "transition-all duration-700 group-hover:scale-105 group-hover:brightness-110" : ""}`
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" }),
            animateCard && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/10" }),
            anime.type && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute top-2.5 left-2.5 md:top-3 md:left-3 px-2 py-1 rounded-md bg-primary/90 text-primary-foreground text-xs font-bold flex items-center gap-1 shadow-lg", children: [
              getMediaIcon(anime.type),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "uppercase tracking-wider", children: anime.type })
            ] }),
            anime.rating && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute top-2.5 right-2.5 md:top-3 md:right-3 flex items-center gap-1 px-2 py-1 rounded-md bg-black/50 border border-white/10 text-xs font-bold text-white", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-3 h-3 fill-amber text-amber" }),
              anime.rating
            ] }),
            animateCard && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 hidden items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 md:flex", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 rounded-full bg-white/20 border border-white/20 flex items-center justify-center transform scale-75 group-hover:scale-100 transition-transform duration-300", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "w-6 h-6 fill-white text-white ml-0.5" }) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute bottom-0 left-0 right-0 p-3 pt-8", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-bold text-sm leading-tight line-clamp-2 drop-shadow-md md:group-hover:text-primary md:transition-colors md:duration-300", children: anime.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 mt-2 text-xs text-muted-foreground", children: [
                (((_a = anime.episodes) == null ? void 0 : _a.sub) ?? 0) > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 bg-black/50 px-1.5 py-0.5 rounded-md border border-white/10", children: [
                  "SUB ",
                  anime.episodes.sub
                ] }),
                (((_b = anime.episodes) == null ? void 0 : _b.dub) ?? 0) > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 bg-black/50 px-1.5 py-0.5 rounded-md border border-white/10", children: [
                  "DUB ",
                  anime.episodes.dub
                ] })
              ] })
            ] })
          ] }) })
        },
        cardKey
      );
    }) })
  ] });
});
export {
  AnimeGrid as A
};
