const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/mobileExtensionInstaller.JRaHR6CG.js","assets/vendor.CJyRs4QS.js","assets/react-vendor.CAo4XUiA.js","assets/index.C6yfkT5T.js","assets/tanstack.DPr3OB19.js","assets/supabase.WuRMX5Dg.js","assets/radix.BiK9uYXL.js","assets/icons.C2gBBarQ.js","assets/motion.DVGLRFCH.js","assets/hls.BlgtCWcq.js","assets/editor.Dxw8dtyw.js","assets/charts.Dr1fgDJ-.js","assets/index.CWbmAlRn.css","assets/mobileExtensionHost.DerCd4eF.js"])))=>i.map(i=>d[i]);
import { r as reactExports, j as jsxRuntimeExports, e as useNavigate, L as Link, a as reactDomExports, i as useParams } from "./react-vendor.CAo4XUiA.js";
import { I as contentGraph, aj as ANILIST_GRAPHQL_ENDPOINT, l as getProxiedImageUrl, u as useAuth, a2 as supabase, dG as useCommunityRulesGate, aA as Textarea, B as Button, dH as useForumPosts, G as GlassPanel, A as PostCard, aH as useWatchlistItem, aI as useAddToWatchlist, aJ as useRemoveFromWatchlist, Y as DropdownMenu, Z as DropdownMenuTrigger, _ as DropdownMenuContent, $ as DropdownMenuItem, j as cn, D as useIsNativeApp, K as useIsDesktopApp, U as useIsMobileApp, dI as fetchEpisodeServers, T as triggerHaptic, bq as Tabs, br as TabsList, bs as TabsTrigger, bu as TabsContent, aC as ScrollArea, co as hasTorrentService, a as isCapacitor, dJ as resolveExtensionApiBase, dK as streamExtensionSources, cs as useAnimeInfo, ct as useEpisodes, dL as useNextEpisodeSchedule, s as useIsMobile, dM as setViewingRpc, cG as clearDiscordRpc, ap as useContentSafetySettings, Q as Background, R as ExtensionSlot, cU as EpisodeComments, ab as resolveApiV3Base, dN as fetchJikanCover, bi as fetchProducerAnimes, a_ as toAnimeCard } from "./index.C6yfkT5T.js";
import { a as useQuery, u as useQueryClient, b as useMutation } from "./tanstack.DPr3OB19.js";
import { u as useAniListRecommendations, A as AdultWarningGate, C as ContentEditSheet } from "./AdultWarningGate.C2tw42bQ.js";
import { u as useRecommendationEngine } from "./useRecommendationEngine.C_OWm328.js";
import { M as MobileNav } from "./MobileNav.ABHzkhTQ.js";
import { S as Skeleton } from "./skeleton-custom.3olGZrgu.js";
import { A as AnimeGrid } from "./AnimeGrid.DHeAAgqI.js";
import { H as Hls } from "./hls.BlgtCWcq.js";
import { bf as ue, b9 as __vitePreload, bH as Helmet } from "./vendor.CJyRs4QS.js";
import { u as usePreviewSource } from "./useHoverPreview.Cs_Lh1vM.js";
import { aI as Star, Q as LoaderCircle, J as Trash2, aB as MessageSquareQuote, c6 as MessagesSquare, cE as SquarePen, b as ChevronRight, P as Plus, cF as BookmarkPlus, c as Check, bg as Share2, q as Copy, cG as Twitter, cH as Facebook, ab as Link2, aD as Clock, bq as Bell, cI as BellOff, bF as Calendar, a5 as Globe, D as Download, X, aJ as Play, Y as FolderOpen, aG as ChevronLeft, bN as Bot, C as CircleCheck, d as Circle, a as CircleAlert, R as RefreshCw, a$ as Languages, c8 as Server, u as ArrowLeft, bi as Database, aR as Pencil, ay as Tv, Z as Film, cf as Tag, k as Sparkles, U as Users, S as Search, L as LayoutGrid, aZ as List, j as ExternalLink, cJ as PenTool } from "./icons.C2gBBarQ.js";
import { P as PostComposer } from "./PostComposer.Da2bF75r.js";
import { A as AddToPlaylistButton } from "./AddToPlaylistButton.DNrDvuI4.js";
import { O as OpenInAppButton } from "./OpenInAppButton.JimbvqsA.js";
import { u as useTrackedShows, a as useToggleTrackedShow } from "./useTrackedShows.Dbf34fk8.js";
import { as as Root2, at as Trigger, au as Content2 } from "./radix.BiK9uYXL.js";
import { u as useDownload } from "./useDownload.DEAa3Keh.js";
import { n as normalizeLanguage, g as getLanguageLabel } from "./language-resolver.DQsP8VD4.js";
import { g as getSimpleServerDisplayName } from "./serverNames.D82Wgje2.js";
import { C as ContextMenu, a as ContextMenuTrigger, b as ContextMenuContent, c as ContextMenuItem } from "./context-menu.Dm7T_DwS.js";
import "./supabase.WuRMX5Dg.js";
import "./motion.DVGLRFCH.js";
import "./editor.Dxw8dtyw.js";
import "./charts.Dr1fgDJ-.js";
import "./tasteProfile.DMW7D2B1.js";
import "./AnimeCardWithPreview.BLibCIKm.js";
const ANILIST_GRAPHQL_URL = ANILIST_GRAPHQL_ENDPOINT;
const ANIME_FORMATS = /* @__PURE__ */ new Set([
  "TV",
  "TV_SHORT",
  "MOVIE",
  "OVA",
  "ONA",
  "SPECIAL"
]);
const WATCH_ORDER_RELATION_TYPES = /* @__PURE__ */ new Set(["PREQUEL", "SEQUEL"]);
async function queryAniListMedia(id) {
  var _a;
  const gql = `
    query ($id: Int) {
      Media(id: $id, type: ANIME) {
        id
        title {
          romaji
          english
          native
        }
        format
        status
        episodes
        averageScore
        bannerImage
        coverImage {
          extraLarge
          large
          medium
        }
        startDate {
          year
          month
          day
        }
        relations {
          edges {
            relationType
            node {
              id
              title {
                romaji
                english
                native
              }
              format
              status
              episodes
              averageScore
              bannerImage
              coverImage {
                extraLarge
                large
                medium
              }
              startDate {
                year
                month
                day
              }
            }
          }
        }
      }
    }
  `;
  try {
    const res = await fetch(ANILIST_GRAPHQL_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ query: gql, variables: { id } })
    });
    if (!res.ok) return null;
    const json = await res.json();
    return ((_a = json == null ? void 0 : json.data) == null ? void 0 : _a.Media) ?? null;
  } catch {
    return null;
  }
}
async function queryAniListBatch(ids) {
  var _a, _b;
  if (ids.length === 0) return [];
  const gql = `
    query ($ids: [Int]) {
      Page(perPage: 25) {
        media(id_in: $ids, type: ANIME) {
          id
          title {
            romaji
            english
            native
          }
          format
          status
          episodes
          averageScore
          bannerImage
          coverImage {
            extraLarge
            large
            medium
          }
          startDate {
            year
            month
            day
          }
          relations {
            edges {
              relationType
              node {
                id
                format
              }
            }
          }
        }
      }
    }
  `;
  try {
    const res = await fetch(ANILIST_GRAPHQL_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ query: gql, variables: { ids } })
    });
    if (!res.ok) return [];
    const json = await res.json();
    return ((_b = (_a = json == null ? void 0 : json.data) == null ? void 0 : _a.Page) == null ? void 0 : _b.media) ?? [];
  } catch {
    return [];
  }
}
async function fetchCompleteAniListChain(rootId) {
  const rootMedia = await queryAniListMedia(rootId);
  if (!rootMedia) return [];
  const visited = /* @__PURE__ */ new Map();
  visited.set(rootMedia.id, rootMedia);
  const pendingIds = /* @__PURE__ */ new Set();
  const checkRelations = (media) => {
    var _a, _b;
    for (const edge of ((_a = media.relations) == null ? void 0 : _a.edges) ?? []) {
      const relType = (_b = edge.relationType) == null ? void 0 : _b.toUpperCase();
      if (!WATCH_ORDER_RELATION_TYPES.has(relType)) continue;
      const node = edge.node;
      if (!(node == null ? void 0 : node.id)) continue;
      const fmt = (node.format ?? "").toUpperCase();
      if (fmt && !ANIME_FORMATS.has(fmt)) continue;
      if (!visited.has(node.id)) {
        pendingIds.add(node.id);
      }
    }
  };
  checkRelations(rootMedia);
  let depth = 0;
  while (pendingIds.size > 0 && depth < 2) {
    depth++;
    const batch = Array.from(pendingIds).slice(0, 20);
    for (const id of batch) pendingIds.delete(id);
    const fetched = await queryAniListBatch(batch);
    for (const item of fetched) {
      if (!visited.has(item.id)) {
        visited.set(item.id, item);
        checkRelations(item);
      }
    }
  }
  return Array.from(visited.values());
}
function useAnimeSeasons(animeId) {
  return useQuery({
    queryKey: ["anime-watch-order-v2", animeId],
    queryFn: async () => {
      var _a, _b, _c, _d, _e, _f;
      if (!animeId) return [];
      try {
        let numericAnilistId;
        if (/^\d+$/.test(animeId)) {
          numericAnilistId = Number(animeId);
        } else {
          const match = animeId.match(/^anilist[:_-]?(\d+)$/i);
          if (match == null ? void 0 : match[1]) {
            numericAnilistId = Number(match[1]);
          }
        }
        let fallbackMedia = null;
        if (!numericAnilistId) {
          try {
            fallbackMedia = await contentGraph.getMedia(animeId);
            if (fallbackMedia == null ? void 0 : fallbackMedia.anilistId) {
              numericAnilistId = Number(fallbackMedia.anilistId);
            }
          } catch {
          }
        }
        let nodes = [];
        if (numericAnilistId) {
          try {
            nodes = await fetchCompleteAniListChain(numericAnilistId);
          } catch {
            nodes = [];
          }
        }
        if (nodes.length === 0) {
          if (!fallbackMedia) {
            fallbackMedia = await contentGraph.getMedia(animeId);
          }
          if (!fallbackMedia) return [];
          const currentId = String(fallbackMedia.anilistId || animeId);
          const entries2 = [];
          entries2.push({
            id: currentId,
            name: fallbackMedia.titleEnglish || fallbackMedia.titleRomaji || "Unknown",
            poster: fallbackMedia.coverImageLarge || fallbackMedia.coverImageMedium || "",
            banner: fallbackMedia.bannerImage,
            isCurrent: true,
            seasonNumber: 1,
            classification: "SEASON 1",
            episodeCount: fallbackMedia.episodes,
            year: ((_a = fallbackMedia.startDate) == null ? void 0 : _a.year) || fallbackMedia.seasonYear,
            format: formatLabel(fallbackMedia.format),
            rating: fallbackMedia.averageScore ? (fallbackMedia.averageScore / 10).toFixed(1) : void 0
          });
          for (const rel of fallbackMedia.relations || []) {
            const relType = (_b = rel.relationType) == null ? void 0 : _b.toUpperCase();
            if (!WATCH_ORDER_RELATION_TYPES.has(relType)) continue;
            if (rel.format && !ANIME_FORMATS.has(rel.format.toUpperCase())) continue;
            entries2.push({
              id: String(rel.id),
              name: rel.titleEnglish || rel.titleRomaji || "Unknown",
              poster: rel.coverImage || "",
              isCurrent: false,
              seasonNumber: 0,
              classification: "",
              episodeCount: rel.episodes,
              year: ((_c = rel.startDate) == null ? void 0 : _c.year) || rel.seasonYear,
              format: formatLabel(rel.format),
              relationType: relType
            });
          }
          _sortAndClassify(entries2);
          return entries2;
        }
        const currentTargetId = String(numericAnilistId ?? animeId);
        const entries = nodes.map((node) => {
          var _a2, _b2, _c2, _d2, _e2, _f2;
          const title = ((_a2 = node.title) == null ? void 0 : _a2.english) || ((_b2 = node.title) == null ? void 0 : _b2.romaji) || ((_c2 = node.title) == null ? void 0 : _c2.native) || "Unknown";
          const poster = node.bannerImage || ((_d2 = node.coverImage) == null ? void 0 : _d2.extraLarge) || ((_e2 = node.coverImage) == null ? void 0 : _e2.large) || "";
          const rating = node.averageScore ? (node.averageScore / 10).toFixed(1) : void 0;
          const year = ((_f2 = node.startDate) == null ? void 0 : _f2.year) || void 0;
          const format = formatLabel(node.format);
          return {
            id: String(node.id),
            name: title,
            poster,
            banner: node.bannerImage || void 0,
            isCurrent: String(node.id) === currentTargetId,
            seasonNumber: 0,
            classification: "",
            episodeCount: node.episodes || void 0,
            year,
            format,
            rating
          };
        });
        const dateMap = /* @__PURE__ */ new Map();
        for (const node of nodes) {
          dateMap.set(String(node.id), {
            year: ((_d = node.startDate) == null ? void 0 : _d.year) ?? 9999,
            month: ((_e = node.startDate) == null ? void 0 : _e.month) ?? 0,
            day: ((_f = node.startDate) == null ? void 0 : _f.day) ?? 0
          });
        }
        _sortAndClassify(entries, dateMap);
        return entries;
      } catch (error) {
        console.error("[useAnimeSeasons] Error building watch order:", error);
        return [];
      }
    },
    enabled: !!animeId && !animeId.startsWith("mal-"),
    staleTime: 1e3 * 60 * 60 * 2
    // 2 hours
  });
}
function _sortAndClassify(entries, dateMap) {
  entries.sort((a, b) => {
    const aDate = dateMap == null ? void 0 : dateMap.get(a.id);
    const bDate = dateMap == null ? void 0 : dateMap.get(b.id);
    const aYear = (aDate == null ? void 0 : aDate.year) ?? a.year ?? 9999;
    const bYear = (bDate == null ? void 0 : bDate.year) ?? b.year ?? 9999;
    if (aYear !== bYear) return aYear - bYear;
    const aMonth = (aDate == null ? void 0 : aDate.month) ?? 0;
    const bMonth = (bDate == null ? void 0 : bDate.month) ?? 0;
    if (aMonth !== bMonth) return aMonth - bMonth;
    const aDay = (aDate == null ? void 0 : aDate.day) ?? 0;
    const bDay = (bDate == null ? void 0 : bDate.day) ?? 0;
    if (aDay !== bDay) return aDay - bDay;
    const aNum = extractSeasonNumber(a.name);
    const bNum = extractSeasonNumber(b.name);
    if (aNum !== null && bNum !== null) return aNum - bNum;
    return a.name.localeCompare(b.name);
  });
  let tvCount = 0;
  entries.forEach((entry, idx) => {
    const isTV = !entry.format || entry.format === "TV" || entry.format === "TV Short";
    if (isTV) tvCount++;
    entry.seasonNumber = idx + 1;
    entry.classification = classifySeasonBadge(entry.name, entry.format, tvCount);
  });
}
function classifySeasonBadge(name, format, tvIndex = 1) {
  const clean = name.trim();
  const finalPartMatch = clean.match(/final\s+season[,\s]*(?:part|cour)\s*(\d+)/i);
  if (finalPartMatch) {
    return `FINAL SEASON PART ${finalPartMatch[1]}`;
  }
  if (/final\s+season/i.test(clean)) {
    return "FINAL SEASON";
  }
  const seasonPartMatch = clean.match(/season\s*(\d+)[,\s]*(?:part|cour)\s*(\d+)/i);
  if (seasonPartMatch) {
    return `SEASON ${seasonPartMatch[1]} PART ${seasonPartMatch[2]}`;
  }
  const seasonMatch = clean.match(/season\s*(\d+)/i) || clean.match(/(\d+)(?:st|nd|rd|th)\s+season/i);
  if (seasonMatch) {
    return `SEASON ${seasonMatch[1]}`;
  }
  const partMatch = clean.match(/part\s*(\d+)/i);
  if (partMatch) {
    return `PART ${partMatch[1]}`;
  }
  if (format === "Movie" || /the\s+movie/i.test(clean)) {
    return "MOVIE";
  }
  if (format === "OVA" || format === "ONA" || format === "Special") {
    return format.toUpperCase();
  }
  return `SEASON ${tvIndex}`;
}
function extractSeasonNumber(name) {
  const patterns = [
    /season\s+(\d+)/i,
    /(\d+)(st|nd|rd|th)\s+season/i,
    /part\s+(\d+)/i,
    /\bS(\d+)\b/i,
    /\s+(\d+)$/
  ];
  for (const pattern of patterns) {
    const match = name.match(pattern);
    if (match) return parseInt(match[1], 10);
  }
  return null;
}
function formatLabel(format) {
  if (!format) return void 0;
  const upper = format.toUpperCase();
  const map = {
    TV: "TV",
    TV_SHORT: "TV Short",
    MOVIE: "Movie",
    OVA: "OVA",
    ONA: "ONA",
    SPECIAL: "Special"
  };
  return map[upper] ?? format;
}
function VideoBackground({ animeId, poster, children, anilistId, titles }) {
  const videoRef = reactExports.useRef(null);
  const hlsRef = reactExports.useRef(null);
  const [isVideoReady, setIsVideoReady] = reactExports.useState(false);
  const { startHover, source } = usePreviewSource();
  reactExports.useEffect(() => {
    if (!anilistId) return;
    startHover(anilistId, titles ?? [], void 0);
  }, [anilistId, titles, startHover]);
  reactExports.useEffect(() => {
    if (!videoRef.current || !(source == null ? void 0 : source.streamUrl)) return;
    const videoEl = videoRef.current;
    if (hlsRef.current) {
      hlsRef.current.destroy();
      hlsRef.current = null;
    }
    const seekToPreviewTimestamp = () => {
      if (videoRef.current && source.previewTimestampSec > 0) {
        videoRef.current.currentTime = source.previewTimestampSec;
      }
    };
    const playVideo = () => {
      videoEl.play().then(() => setIsVideoReady(true)).catch(() => setIsVideoReady(false));
    };
    if (source.isHls) {
      if (!Hls.isSupported()) {
        setIsVideoReady(false);
        return;
      }
      const hls = new Hls();
      hlsRef.current = hls;
      hls.loadSource(source.streamUrl);
      hls.attachMedia(videoEl);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        seekToPreviewTimestamp();
        playVideo();
      });
      hls.on(Hls.Events.ERROR, (_event, data) => {
        if (data.fatal) setIsVideoReady(false);
      });
      return;
    }
    videoEl.src = source.streamUrl;
    videoEl.addEventListener("loadedmetadata", seekToPreviewTimestamp, { once: true });
    playVideo();
  }, [source]);
  const hasVideo = isVideoReady && !!(source == null ? void 0 : source.streamUrl);
  reactExports.useEffect(() => {
    return () => {
      var _a;
      (_a = hlsRef.current) == null ? void 0 : _a.destroy();
      hlsRef.current = null;
    };
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative min-h-[70vh] md:min-h-[80vh] overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "video",
        {
          ref: videoRef,
          className: `absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${hasVideo ? "opacity-50" : "opacity-0"}`,
          loop: true,
          muted: true,
          playsInline: true
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "img",
        {
          src: getProxiedImageUrl(poster),
          alt: "",
          loading: "lazy",
          "data-preview-unavailable": !hasVideo ? "true" : void 0,
          className: `absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${hasVideo ? "opacity-0" : "opacity-50"}`
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-background via-background/90 to-background/30" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-background/60 via-transparent to-background" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 shadow-[inset_0_0_200px_rgba(0,0,0,0.9)]" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 opacity-[0.02] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iMC4wNSIvPjwvc3ZnPg==')]" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative z-10", children })
  ] });
}
function useAnimeRatings(animeId) {
  return useQuery({
    queryKey: ["ratings", animeId],
    queryFn: async () => {
      const { data: ratings, error } = await supabase.from("ratings").select("*").eq("anime_id", animeId).order("created_at", { ascending: false });
      if (error) throw error;
      if (!ratings || ratings.length === 0) return [];
      const userIds = [...new Set(ratings.map((r) => r.user_id))];
      const { data: profiles } = await supabase.from("profiles").select("user_id, display_name, avatar_url, username").in("user_id", userIds);
      const profileMap = new Map((profiles == null ? void 0 : profiles.map((p) => [p.user_id, p])) || []);
      return ratings.map((r) => ({
        ...r,
        profile: profileMap.get(r.user_id)
      }));
    },
    enabled: !!animeId
  });
}
function useAnimeRatingStats(animeId) {
  const { data: ratings } = useAnimeRatings(animeId);
  return useQuery({
    queryKey: ["rating_stats", animeId],
    queryFn: async () => {
      if (!ratings || ratings.length === 0) {
        return { average: 0, count: 0, distribution: {} };
      }
      const distribution = {};
      let total = 0;
      ratings.forEach((r) => {
        total += r.rating;
        distribution[r.rating] = (distribution[r.rating] || 0) + 1;
      });
      return {
        average: total / ratings.length,
        count: ratings.length,
        distribution
      };
    },
    enabled: !!ratings
  });
}
function useUserRating(animeId) {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["user_rating", user == null ? void 0 : user.id, animeId],
    queryFn: async () => {
      const { data, error } = await supabase.from("ratings").select("*").eq("anime_id", animeId).eq("user_id", user.id).maybeSingle();
      if (error) throw error;
      return data;
    },
    enabled: !!user && !!animeId
  });
}
function useRateAnime() {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  return useMutation({
    mutationFn: async ({
      animeId,
      rating,
      review
    }) => {
      const { data, error } = await supabase.from("ratings").upsert({
        user_id: user.id,
        anime_id: animeId,
        rating,
        review
      }, { onConflict: "user_id,anime_id" }).select().single();
      if (error) throw error;
      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["ratings", variables.animeId] });
      queryClient.invalidateQueries({ queryKey: ["rating_stats", variables.animeId] });
      queryClient.invalidateQueries({ queryKey: ["user_rating"] });
      ue.success("Rating saved");
    },
    onError: () => {
      ue.error("Failed to save rating");
    }
  });
}
function useDeleteRating() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (animeId) => {
      const { error } = await supabase.from("ratings").delete().eq("anime_id", animeId);
      if (error) throw error;
    },
    onSuccess: (_, animeId) => {
      queryClient.invalidateQueries({ queryKey: ["ratings", animeId] });
      queryClient.invalidateQueries({ queryKey: ["rating_stats", animeId] });
      queryClient.invalidateQueries({ queryKey: ["user_rating"] });
      ue.success("Rating removed");
    },
    onError: () => {
      ue.error("Failed to remove rating");
    }
  });
}
function StarRating({ rating, onRate, interactive = false, size = "md" }) {
  const [hoverRating, setHoverRating] = reactExports.useState(0);
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8"
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1", children: [1, 2, 3, 4, 5].map((star) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    "button",
    {
      disabled: !interactive,
      onClick: () => onRate == null ? void 0 : onRate(star),
      onMouseEnter: () => interactive && setHoverRating(star),
      onMouseLeave: () => interactive && setHoverRating(0),
      className: `${interactive ? "cursor-pointer hover:scale-110 transition-transform" : "cursor-default"}`,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Star,
        {
          className: `${sizeClasses[size]} transition-colors ${star <= (hoverRating || rating) ? "text-amber fill-amber" : "text-muted-foreground/30"}`
        }
      )
    },
    star
  )) });
}
function RatingsSection({ animeId }) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const ensureAgreed = useCommunityRulesGate();
  const [selectedRating, setSelectedRating] = reactExports.useState(0);
  const [review, setReview] = reactExports.useState("");
  const [showReviewInput, setShowReviewInput] = reactExports.useState(false);
  const { data: stats, isLoading: loadingStats } = useAnimeRatingStats(animeId);
  const { data: userRating, isLoading: loadingUserRating } = useUserRating(animeId);
  const { data: allRatings = [] } = useAnimeRatings(animeId);
  const rateAnime = useRateAnime();
  const deleteRating = useDeleteRating();
  const reviews = allRatings.filter(
    (r) => typeof r.review === "string" && r.review.trim().length > 0
  );
  const handleRate = async (rating) => {
    setSelectedRating(rating);
    setShowReviewInput(true);
  };
  const handleSubmitRating = async () => {
    if (!await ensureAgreed()) return;
    await rateAnime.mutateAsync({
      animeId,
      rating: selectedRating,
      review: review.trim() || void 0
    });
    setSelectedRating(0);
    setReview("");
    setShowReviewInput(false);
  };
  const handleDeleteRating = async () => {
    await deleteRating.mutateAsync(animeId);
  };
  const displayAverage = stats ? stats.average > 5 ? stats.average / 2 : stats.average : 0;
  const displayUserRating = userRating ? userRating.rating > 5 ? Math.ceil(userRating.rating / 2) : userRating.rating : 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-5 h-5 text-amber fill-amber" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-xl font-semibold", children: "Ratings & Reviews" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-6 p-4 rounded-xl bg-card/50 border border-border/30", children: loadingStats ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-6 h-6 animate-spin text-muted-foreground" }) : stats && stats.count > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-4xl font-bold text-amber", children: displayAverage.toFixed(1) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm text-muted-foreground", children: [
          stats.count,
          " rating",
          stats.count !== 1 ? "s" : ""
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(StarRating, { rating: Math.round(displayAverage), size: "md" }) })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-muted-foreground", children: "No ratings yet. Be the first!" }) }),
    user ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 rounded-xl bg-card/50 border border-border/30", children: loadingUserRating ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-6 h-6 animate-spin text-muted-foreground" }) : userRating ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: "Your rating" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: handleDeleteRating,
            disabled: deleteRating.isPending,
            className: "text-muted-foreground hover:text-destructive transition-colors",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-4 h-4" })
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StarRating, { rating: displayUserRating, size: "md" }),
      userRating.review && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground/90", children: userRating.review })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Rate this anime" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        StarRating,
        {
          rating: selectedRating,
          onRate: handleRate,
          interactive: true,
          size: "lg"
        }
      ),
      showReviewInput && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 mt-4 pt-4 border-t border-border/30", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Textarea,
          {
            value: review,
            onChange: (e) => setReview(e.target.value),
            placeholder: "Write a review (optional)...",
            className: "min-h-[80px] bg-muted/50"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: handleSubmitRating, disabled: rateAnime.isPending, children: [
            rateAnime.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin mr-2" }) : null,
            "Submit Rating"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", onClick: () => {
            setShowReviewInput(false);
            setSelectedRating(0);
            setReview("");
          }, children: "Cancel" })
        ] })
      ] })
    ] }) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 rounded-xl bg-card/50 border border-border/30 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-3", children: "Sign in to rate this anime" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: () => navigate("/auth"), children: "Sign In" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 pt-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquareQuote, { className: "w-5 h-5 text-primary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-display text-lg font-semibold", children: "Reviews" }),
        reviews.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-muted-foreground", children: [
          "(",
          reviews.length,
          ")"
        ] })
      ] }),
      reviews.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: reviews.map((r) => {
        var _a, _b, _c, _d, _e;
        const displayRating = r.rating > 5 ? Math.round(r.rating / 2) : r.rating;
        const name = ((_a = r.profile) == null ? void 0 : _a.display_name) || ((_b = r.profile) == null ? void 0 : _b.username) || "Anonymous";
        const initial = name.charAt(0).toUpperCase();
        const date = new Date(r.created_at).toLocaleDateString(void 0, {
          year: "numeric",
          month: "short",
          day: "numeric"
        });
        const avatar = /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-full overflow-hidden shrink-0 border border-border/40 bg-primary/15 flex items-center justify-center", children: ((_c = r.profile) == null ? void 0 : _c.avatar_url) ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: r.profile.avatar_url,
            alt: name,
            loading: "lazy",
            className: "w-full h-full object-cover"
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-bold text-primary", children: initial }) });
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "p-4 rounded-xl bg-card/50 border border-border/30 space-y-2",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                ((_d = r.profile) == null ? void 0 : _d.username) ? /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: `/user/${r.profile.username}`, className: "shrink-0", children: avatar }) : avatar,
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold text-foreground/90 truncate", children: ((_e = r.profile) == null ? void 0 : _e.username) ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Link,
                      {
                        to: `/user/${r.profile.username}`,
                        className: "hover:text-primary transition-colors",
                        children: name
                      }
                    ) : name }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: date })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(StarRating, { rating: displayRating, size: "sm" })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground/85 leading-relaxed whitespace-pre-line", children: r.review })
            ]
          },
          r.id
        );
      }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-6 rounded-xl bg-card/50 border border-border/30 text-center text-sm text-muted-foreground", children: "No reviews yet. Rate this anime and share your thoughts." })
    ] })
  ] });
}
function toFeedPost(p) {
  const metadata = p.metadata || {};
  const images = Array.isArray(metadata.images) && metadata.images.length ? metadata.images : p.image_url ? [p.image_url] : null;
  return {
    ...p,
    poll: null,
    gif_url: metadata.gif_url || null,
    images,
    watch_room_id: metadata.watch_room_id || null,
    quoted_post_id: metadata.quoted_post_id || null,
    media_type: metadata.media_type || (p.anime_id ? "anime" : null),
    repost_count: 0,
    reposted: false,
    bookmarked: false,
    badges: [],
    author_rank_score: 0,
    author_is_official: false,
    news_source: metadata.source || null
  };
}
const MAX_VISIBLE = 4;
function AnimeCommunityPosts({
  animeId,
  animeName,
  animePoster
}) {
  const { user } = useAuth();
  const { data: posts = [], isLoading, refetch } = useForumPosts({ animeId, sortBy: "new", limit: 12 });
  const [composerOpen, setComposerOpen] = reactExports.useState(false);
  const defaultMedia = {
    id: animeId,
    name: animeName,
    poster: animePoster ?? null,
    type: "anime"
  };
  const visible = posts.slice(0, MAX_VISIBLE);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mb-16", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6 flex items-center justify-between gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-2xl font-semibold flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(MessagesSquare, { className: "w-5 h-5 text-primary" }),
        "Community posts"
      ] }),
      user && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          variant: composerOpen ? "secondary" : "outline",
          size: "sm",
          onClick: () => setComposerOpen((v) => !v),
          className: "gap-1.5 rounded-full",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SquarePen, { className: "h-4 w-4" }),
            composerOpen ? "Close" : "New post about this"
          ]
        }
      )
    ] }),
    composerOpen && user && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      PostComposer,
      {
        defaultMedia,
        onPosted: () => {
          setComposerOpen(false);
          refetch();
        }
      }
    ) }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: [0, 1].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(GlassPanel, { className: "h-32 animate-pulse border-white/[0.06]" }, i)) }) : visible.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassPanel, { className: "flex flex-col items-center justify-center gap-2 py-10 text-center border-white/[0.06]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(MessagesSquare, { className: "h-8 w-8 text-muted-foreground/50" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-medium text-muted-foreground", children: [
        "No posts about ",
        animeName,
        " yet."
      ] }),
      user ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground/70", children: "Be the first to start the conversation." }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground/70", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/auth", className: "text-primary hover:underline", children: "Sign in" }),
        " to post about this anime."
      ] })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
      visible.map((post) => /* @__PURE__ */ jsxRuntimeExports.jsx(PostCard, { post: toFeedPost(post) }, post.id)),
      posts.length > MAX_VISIBLE && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Link,
        {
          to: `/community?anime=${encodeURIComponent(animeId)}`,
          className: "flex items-center justify-center gap-1 text-sm font-semibold text-primary hover:underline",
          children: [
            "View all ",
            posts.length,
            " posts",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-4 w-4" })
          ]
        }
      )
    ] })
  ] });
}
const STATUS_OPTIONS = [
  { value: "plan_to_watch", label: "Plan to Watch" },
  { value: "watching", label: "Watching" },
  { value: "completed", label: "Completed" },
  { value: "on_hold", label: "On Hold" },
  { value: "dropped", label: "Dropped" }
];
function WatchlistButton({ animeId, animeName, animePoster, variant = "default", malId, anilistId }) {
  var _a;
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = reactExports.useState(false);
  console.log("[WatchlistButton] Mounted/Updated:", {
    animeId,
    animeName: animeName == null ? void 0 : animeName.substring(0, 30),
    malId,
    anilistId,
    hasIds: !!(malId || anilistId)
  });
  const { data: watchlistItem, isLoading } = useWatchlistItem(animeId);
  const addToWatchlist = useAddToWatchlist();
  const removeFromWatchlist = useRemoveFromWatchlist();
  const handleAddToWatchlist = async (status) => {
    console.log("[WatchlistButton] Adding to watchlist:", {
      animeId,
      status,
      malId,
      anilistId
    });
    await addToWatchlist.mutateAsync({
      animeId,
      animeName,
      animePoster,
      status,
      malId,
      anilistId
    });
    setIsOpen(false);
  };
  const handleRemove = async () => {
    await removeFromWatchlist.mutateAsync(animeId);
    setIsOpen(false);
  };
  if (!user) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Button,
      {
        variant: variant === "icon" ? "outline" : "secondary",
        size: variant === "icon" ? "icon" : "default",
        onClick: () => navigate("/auth"),
        className: variant === "icon" ? "h-14 w-14 rounded-full" : "",
        children: variant === "icon" ? /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-6 h-6" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(BookmarkPlus, { className: "w-4 h-4 mr-2" }),
          "Add to List"
        ] })
      }
    );
  }
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Button,
      {
        variant: variant === "icon" ? "outline" : "secondary",
        size: variant === "icon" ? "icon" : "default",
        disabled: true,
        className: variant === "icon" ? "h-14 w-14 rounded-full" : "",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin" })
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenu, { open: isOpen, onOpenChange: setIsOpen, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Button,
      {
        variant: watchlistItem ? "default" : variant === "icon" ? "outline" : "secondary",
        size: variant === "icon" ? "icon" : "default",
        className: `${variant === "icon" ? "h-14 w-14 rounded-full" : ""} ${watchlistItem ? "bg-primary hover:bg-primary/90" : ""}`,
        children: watchlistItem ? variant === "icon" ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-6 h-6" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-4 h-4 mr-2" }),
          ((_a = STATUS_OPTIONS.find((s) => s.value === watchlistItem.status)) == null ? void 0 : _a.label) || "In List"
        ] }) : variant === "icon" ? /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-6 h-6" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(BookmarkPlus, { className: "w-4 h-4 mr-2" }),
          "Add to List"
        ] })
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuContent, { align: "end", className: "w-48", children: [
      STATUS_OPTIONS.map((option) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        DropdownMenuItem,
        {
          onClick: () => handleAddToWatchlist(option.value),
          className: (watchlistItem == null ? void 0 : watchlistItem.status) === option.value ? "bg-primary/20" : "",
          children: option.label
        },
        option.value
      )),
      watchlistItem && /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        DropdownMenuItem,
        {
          onClick: handleRemove,
          className: "text-destructive focus:text-destructive",
          children: "Remove from List"
        }
      ) })
    ] })
  ] });
}
function ShareButton({ animeId, animeName, animePoster, description }) {
  const [copied, setCopied] = reactExports.useState(false);
  const shareUrl = `${window.location.origin}/anime/${animeId}`;
  const shareText = description ? `Check out "${animeName}" - ${description.slice(0, 100)}...` : `Check out "${animeName}" on our anime platform!`;
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      ue.success("Link copied to clipboard!");
      setTimeout(() => setCopied(false), 2e3);
    } catch {
      ue.error("Failed to copy link");
    }
  };
  const handleShareTwitter = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
    window.open(twitterUrl, "_blank", "width=600,height=400");
  };
  const handleShareFacebook = () => {
    const fbUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`;
    window.open(fbUrl, "_blank", "width=600,height=400");
  };
  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: animeName,
          text: shareText,
          url: shareUrl
        });
      } catch (error) {
      }
    } else {
      handleCopyLink();
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenu, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", size: "icon", className: "h-14 w-14 rounded-full", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Share2, { className: "w-5 h-5" }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuContent, { align: "end", className: "w-48", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuItem, { onClick: handleCopyLink, className: "cursor-pointer", children: [
        copied ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-4 h-4 mr-2 text-green-500" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "w-4 h-4 mr-2" }),
        "Copy Link"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuItem, { onClick: handleShareTwitter, className: "cursor-pointer", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Twitter, { className: "w-4 h-4 mr-2" }),
        "Share on X"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuItem, { onClick: handleShareFacebook, className: "cursor-pointer", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Facebook, { className: "w-4 h-4 mr-2" }),
        "Share on Facebook"
      ] }),
      navigator.share && /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuItem, { onClick: handleNativeShare, className: "cursor-pointer", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link2, { className: "w-4 h-4 mr-2" }),
        "More Options"
      ] })
    ] })
  ] });
}
function formatTimeUntil(targetDate) {
  const now = /* @__PURE__ */ new Date();
  const diff = targetDate.getTime() - now.getTime();
  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isOverdue: true };
  }
  const days = Math.floor(diff / (1e3 * 60 * 60 * 24));
  const hours = Math.floor(diff % (1e3 * 60 * 60 * 24) / (1e3 * 60 * 60));
  const minutes = Math.floor(diff % (1e3 * 60 * 60) / (1e3 * 60));
  const seconds = Math.floor(diff % (1e3 * 60) / 1e3);
  return { days, hours, minutes, seconds, isOverdue: false };
}
function CountdownTimer({ targetDate }) {
  const [timeLeft, setTimeLeft] = reactExports.useState(formatTimeUntil(targetDate));
  reactExports.useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(formatTimeUntil(targetDate));
    }, 1e3);
    return () => clearInterval(interval);
  }, [targetDate]);
  if (timeLeft.isOverdue) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-primary font-bold text-lg animate-pulse", children: "Episode Available Now!" }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-3 justify-center", children: [
    { value: timeLeft.days, label: "Days" },
    { value: timeLeft.hours, label: "Hours" },
    { value: timeLeft.minutes, label: "Mins" },
    { value: timeLeft.seconds, label: "Secs" }
  ].map((item, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex flex-col items-center bg-muted/50 rounded-xl p-3 min-w-[60px]",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl font-bold tabular-nums", children: String(item.value).padStart(2, "0") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: item.label })
      ]
    },
    idx
  )) });
}
function NextEpisodeSchedule({
  animeId,
  animeName,
  animePoster,
  anilistId,
  airingTime,
  nextEpisodeNumber,
  dayOfWeek,
  episodeTitle,
  overview,
  thumbnail
}) {
  const [userTimezone] = reactExports.useState(Intl.DateTimeFormat().resolvedOptions().timeZone);
  const { data: trackedShows } = useTrackedShows();
  const toggleTracked = useToggleTrackedShow();
  const isTracked = !!(trackedShows == null ? void 0 : trackedShows.some((row) => row.anime_id === animeId));
  if (!airingTime) {
    return null;
  }
  const targetDate = new Date(airingTime);
  const isValidDate = !isNaN(targetDate.getTime());
  if (!isValidDate) {
    return null;
  }
  const localDateString = targetDate.toLocaleDateString(void 0, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  });
  const localTimeString = targetDate.toLocaleTimeString(void 0, {
    hour: "2-digit",
    minute: "2-digit",
    timeZoneName: "short"
  });
  const handleNotifyToggle = () => {
    toggleTracked.mutate({
      animeId,
      anilistId: anilistId ?? null,
      title: animeName,
      imageUrl: animePoster,
      tracked: isTracked
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassPanel, { className: "p-6 mb-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-display text-lg font-semibold flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-5 h-5 text-primary" }),
        "Next Episode"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          variant: "ghost",
          size: "sm",
          onClick: handleNotifyToggle,
          disabled: toggleTracked.isPending,
          className: cn(
            "gap-2",
            isTracked && "text-primary"
          ),
          children: isTracked ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "w-4 h-4 fill-current" }),
            "Tracking"
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(BellOff, { className: "w-4 h-4" }),
            "Notify Me"
          ] })
        }
      )
    ] }),
    nextEpisodeNumber && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-center text-muted-foreground mb-4", children: [
      "Episode ",
      nextEpisodeNumber,
      episodeTitle ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-foreground font-medium", children: [
        " · ",
        episodeTitle
      ] }) : null,
      " ",
      "airs in:"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CountdownTimer, { targetDate }),
    (thumbnail || overview) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex gap-4 items-start", children: [
      thumbnail && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "img",
        {
          src: thumbnail,
          alt: episodeTitle || `Episode ${nextEpisodeNumber ?? ""}`,
          loading: "lazy",
          className: "w-32 aspect-video shrink-0 rounded-lg object-cover border border-white/10",
          onError: (event) => {
            event.currentTarget.style.display = "none";
          }
        }
      ),
      overview && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed line-clamp-4", children: overview })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 space-y-2 text-sm text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-4 h-4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: localDateString })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-4 h-4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: localTimeString })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { className: "w-4 h-4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs", children: userTimezone })
      ] })
    ] }),
    dayOfWeek && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 pt-4 border-t border-white/10 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
      "This anime airs every ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-medium", children: dayOfWeek })
    ] }) })
  ] });
}
const HoverCard = Root2;
const HoverCardTrigger = Trigger;
const HoverCardContent = reactExports.forwardRef(({ className, align = "center", sideOffset = 4, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Content2,
  {
    ref,
    align,
    sideOffset,
    className: cn(
      "z-50 w-64 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    ),
    ...props
  }
));
HoverCardContent.displayName = Content2.displayName;
function extractSubtitles(src) {
  const raw = [
    ...Array.isArray(src == null ? void 0 : src.subtitles) ? src.subtitles : [],
    ...Array.isArray(src == null ? void 0 : src.tracks) ? src.tracks : []
  ];
  const seen = /* @__PURE__ */ new Set();
  const out = [];
  for (const t of raw) {
    const url = String((t == null ? void 0 : t.url) || (t == null ? void 0 : t.file) || "").trim();
    if (!url || seen.has(url)) continue;
    const rawLang = String((t == null ? void 0 : t.lang) || (t == null ? void 0 : t.language) || (t == null ? void 0 : t.label) || "").trim();
    if (!rawLang || rawLang.toLowerCase() === "thumbnails" || /thumbnails/i.test(url)) continue;
    seen.add(url);
    const langCode = normalizeLanguage(rawLang) || rawLang.toLowerCase();
    out.push({
      url,
      lang: langCode,
      label: String((t == null ? void 0 : t.label) || rawLang),
      originalUrl: (t == null ? void 0 : t.originalUrl) ? String(t.originalUrl) : void 0,
      headers: t == null ? void 0 : t.headers
    });
  }
  return out;
}
const isTorrentSrc = (src) => (typeof src.isTorrent === "boolean" ? src.isTorrent : src.sourceType === "torrent") || /^magnet:/i.test(String(src.url || "")) || /\.torrent($|[?#])/i.test(String(src.url || ""));
const isEmbedSrc = (src) => {
  if (typeof src.isEmbed === "boolean") return src.isEmbed;
  const t = String(src.sourceType || "");
  if (t === "hls" || t === "mp4" || t === "torrent") return false;
  return !/\.(?:m3u8|mp4|m4v|webm|mkv)(?:$|[?#/])/i.test(String(src.url || ""));
};
const DUB_LABELS = {
  ar: "Arabic",
  fr: "French",
  de: "German",
  pl: "Polish",
  zh: "Chinese",
  es: "Spanish",
  pt: "Portuguese",
  it: "Italian",
  ko: "Korean",
  hi: "Hindi",
  ta: "Tamil",
  te: "Telugu"
};
const rawLangLabel = (src, fallbackCategory) => {
  const explicit = String(src.language || src.languageLabel || "").trim();
  if (explicit) return explicit;
  if (src.audioLanguage) {
    const code = String(src.audioLanguage).toLowerCase();
    if (code === "ja") return "Japanese";
    if (code === "en") return "English";
    return DUB_LABELS[code] || code.toUpperCase();
  }
  return fallbackCategory || "Japanese";
};
function normalizeDlSources(resolved, fallbackCategory = "sub", allowTorrent = true) {
  const raw = Array.isArray(resolved == null ? void 0 : resolved.sources) ? resolved.sources : [];
  const out = [];
  raw.forEach((src) => {
    const url = String((src == null ? void 0 : src.url) || "").trim();
    if (!url) return;
    const torrent = isTorrentSrc(src);
    if (torrent && !allowTorrent) return;
    if (isEmbedSrc(src) && !torrent) return;
    const label = rawLangLabel(src, fallbackCategory);
    const langCode = normalizeLanguage(String(src.audioLanguage || label)) || "ja";
    const serverKey = String(
      src.providerKey || src.providerName || src.server || src.source || "toko"
    ).trim();
    const serverName = String(
      src.providerName || src.server || src.source || serverKey
    ).trim();
    out.push({
      url,
      serverKey,
      serverName,
      langCode,
      langLabel: getLanguageLabel(langCode) || label,
      isTorrent: torrent,
      quality: src.quality ? String(src.quality) : void 0,
      providerPriority: Number.isFinite(src == null ? void 0 : src.providerPriority) ? Number(src.providerPriority) : Number.MAX_SAFE_INTEGER,
      subtitles: extractSubtitles(src),
      headers: src.headers && typeof src.headers === "object" ? src.headers : void 0,
      originalUrl: src.originalUrl ? String(src.originalUrl) : void 0
    });
  });
  return out.sort((a, b) => a.providerPriority - b.providerPriority);
}
async function resolveEpisode(episodeId, animeName, episodeNumber, anilistId, malId, category = "sub") {
  const allowTorrent = hasTorrentService();
  if (isCapacitor()) {
    try {
      const { initMobileExtensions } = await __vitePreload(async () => {
        const { initMobileExtensions: initMobileExtensions2 } = await import("./mobileExtensionInstaller.JRaHR6CG.js");
        return { initMobileExtensions: initMobileExtensions2 };
      }, true ? __vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13]) : void 0);
      await initMobileExtensions();
    } catch {
    }
  }
  try {
    const base = await resolveExtensionApiBase(isCapacitor());
    const namespaces = (base.namespaces || []).filter((ns) => {
      const routes = ns.routes || [];
      return routes.includes("sources") || routes.includes("stream");
    }).map((ns) => ns.namespace);
    if (!namespaces.length) namespaces.push("toko");
    const params = {
      anilistId: anilistId ?? void 0,
      titles: animeName ? [animeName] : void 0,
      episode: episodeNumber,
      resolution: "1080p",
      preferredLanguage: category,
      route: "sources"
    };
    const settled = await Promise.allSettled(
      [...new Set(namespaces)].map((namespace) => streamExtensionSources(namespace, params))
    );
    const streamed = settled.flatMap((result) => result.status === "fulfilled" ? result.value : []);
    const dl = normalizeDlSources({ sources: streamed }, category, allowTorrent);
    if (dl.length > 0) return { sources: dl };
  } catch {
  }
  const rt = typeof window !== "undefined" ? window.tatakaiRuntime : void 0;
  if (!(rt == null ? void 0 : rt.resolveEpisodeSources)) return { sources: [] };
  try {
    const resolved = await rt.resolveEpisodeSources({
      episodeId,
      animeName,
      episodeNumber,
      anilistId,
      malId,
      preferredLanguage: category,
      method: "single",
      resolution: "1080p"
    });
    return { sources: normalizeDlSources(resolved, category, allowTorrent), headers: resolved == null ? void 0 : resolved.headers };
  } catch {
    return { sources: [] };
  }
}
function StepHeader({ n, label, hint }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex items-center justify-center w-5 h-5 rounded-full bg-primary/15 text-primary text-[11px] font-bold shrink-0", children: n }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold tracking-tight", children: label }),
    hint && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-auto text-[11px] text-muted-foreground truncate", children: hint })
  ] });
}
function AutoDownloadTab({
  animeId,
  animeName,
  episodes
}) {
  const [isSubscribed, setIsSubscribed] = reactExports.useState(false);
  const [loading, setLoading] = reactExports.useState(true);
  const [toggling, setToggling] = reactExports.useState(false);
  const electron = typeof window !== "undefined" ? window.electron : null;
  reactExports.useEffect(() => {
    var _a;
    if (!animeId || !((_a = electron == null ? void 0 : electron.autoDownload) == null ? void 0 : _a.list)) {
      setLoading(false);
      return;
    }
    electron.autoDownload.list().then((list) => {
      const found = Array.isArray(list) && list.some((item) => item.animeId === animeId);
      setIsSubscribed(found);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [animeId]);
  const handleToggle = async () => {
    if (!animeId || !(electron == null ? void 0 : electron.autoDownload)) return;
    setToggling(true);
    try {
      if (isSubscribed) {
        await electron.autoDownload.unsubscribe(animeId);
        setIsSubscribed(false);
        ue.success(`Auto-download disabled for "${animeName}"`);
      } else {
        const lastEp2 = episodes.length > 0 ? Math.max(...episodes.map((e) => e.number)) : 0;
        const nextEp2 = lastEp2 + 1;
        await electron.autoDownload.subscribe(animeId, animeName, nextEp2);
        setIsSubscribed(true);
        ue.success(`Auto-download enabled for "${animeName}" from episode ${nextEp2}`);
      }
    } catch (err) {
      ue.error((err == null ? void 0 : err.message) || "Failed to update auto-download");
    } finally {
      setToggling(false);
    }
  };
  if (!(electron == null ? void 0 : electron.autoDownload)) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center py-16 text-center space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Bot, { className: "w-10 h-10 text-muted-foreground opacity-30" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "Auto-download requires the Tatakai desktop app." })
    ] });
  }
  if (loading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-6 h-6 animate-spin text-muted-foreground" }) });
  }
  const lastEp = episodes.length > 0 ? Math.max(...episodes.map((e) => e.number)) : 0;
  const nextEp = lastEp + 1;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 py-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `rounded-2xl p-5 border transition-colors ${isSubscribed ? "bg-primary/10 border-primary/30" : "bg-white/5 border-white/10"}`, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `w-10 h-10 rounded-xl flex items-center justify-center ${isSubscribed ? "bg-primary/20" : "bg-white/10"}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bot, { className: `w-5 h-5 ${isSubscribed ? "text-primary" : "text-muted-foreground"}` }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm", children: isSubscribed ? "Auto-download Active" : "Auto-download Inactive" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: isSubscribed ? `Will auto-download new episodes from Ep ${nextEp} onwards` : "New episodes will not be downloaded automatically" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          variant: isSubscribed ? "destructive" : "default",
          size: "sm",
          onClick: handleToggle,
          disabled: toggling || !animeId,
          className: "flex-shrink-0 gap-2 h-9",
          children: [
            toggling ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin" }) : isSubscribed ? /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Bot, { className: "w-4 h-4" }),
            toggling ? "Updating..." : isSubscribed ? "Disable" : "Enable"
          ]
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 text-sm text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "w-4 h-4 text-primary flex-shrink-0 mt-0.5" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground", children: "How it works" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs mt-1 leading-relaxed", children: "When enabled, the app automatically downloads new episodes when they become available using your installed extensions. Downloads go to your Tatakai library folder." })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-4 h-4 text-primary flex-shrink-0 mt-0.5" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground", children: "Current series status" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs mt-1", children: [
            episodes.length,
            " episode",
            episodes.length !== 1 ? "s" : "",
            " available",
            lastEp > 0 && `. Latest is Episode ${lastEp}.`,
            isSubscribed && ` Auto-download will start from Episode ${nextEp}.`
          ] })
        ] })
      ] })
    ] })
  ] });
}
const SeasonDownloadModal = ({
  isOpen,
  onClose,
  episodes,
  animeName,
  posterUrl,
  animeId,
  anilistId,
  malId
}) => {
  var _a, _b;
  const [selectedIds, setSelectedIds] = reactExports.useState(/* @__PURE__ */ new Set());
  const [step, setStep] = reactExports.useState("series");
  const [isStarting, setIsStarting] = reactExports.useState(false);
  const [downloadPath, setDownloadPath] = reactExports.useState("");
  const { startDownload, downloadStates = {} } = useDownload();
  const isNative = useIsNativeApp();
  const isDesktop = useIsDesktopApp();
  const isMobile = useIsMobileApp();
  const [probing, setProbing] = reactExports.useState(false);
  const [probed, setProbed] = reactExports.useState(false);
  const [probeNonce, setProbeNonce] = reactExports.useState(0);
  const [probeSources, setProbeSources] = reactExports.useState([]);
  const [dispatchServers, setDispatchServers] = reactExports.useState([]);
  const [selectedLangCode, setSelectedLangCode] = reactExports.useState("");
  const [selectedServerKey, setSelectedServerKey] = reactExports.useState("auto");
  const serverMatchesSource = (server, serverKey) => {
    const key = String(serverKey || "").trim().toLowerCase();
    if (!key) return false;
    const ids = [server.serverName, server.providerKey, server.providerName].map((v) => String(v || "").trim().toLowerCase()).filter(Boolean);
    if (ids.includes(key)) return true;
    const base = (s) => s.split("-")[0];
    return ids.some((id) => base(id) === base(key));
  };
  const languageOptions = reactExports.useMemo(() => {
    const m = /* @__PURE__ */ new Map();
    probeSources.forEach((s) => {
      if (!m.has(s.langCode)) m.set(s.langCode, s.langLabel);
    });
    return Array.from(m, ([code, label]) => ({ code, label }));
  }, [probeSources]);
  const serverOptions = reactExports.useMemo(() => {
    const seen = /* @__PURE__ */ new Map();
    for (const server of dispatchServers) {
      const norm = String((server == null ? void 0 : server.serverName) || "").trim().toLowerCase();
      if (!norm || seen.has(norm)) continue;
      seen.set(norm, server);
    }
    let ranked = [...seen.values()].map((server, idx) => ({ server, idx })).sort((a, b) => {
      var _a2, _b2;
      const pa = Number.isFinite((_a2 = a.server) == null ? void 0 : _a2.providerPriority) ? Number(a.server.providerPriority) : Number.MAX_SAFE_INTEGER;
      const pb = Number.isFinite((_b2 = b.server) == null ? void 0 : _b2.providerPriority) ? Number(b.server.providerPriority) : Number.MAX_SAFE_INTEGER;
      return pa === pb ? a.idx - b.idx : pa - pb;
    }).map(({ server }) => server);
    if (ranked.length > 1) {
      const filtered = ranked.filter((s) => {
        const label = getSimpleServerDisplayName(s.serverName, s.displayName || s.providerName || s.serverName);
        return s.isProviderServer || label !== "TatakaiAPI";
      });
      if (filtered.length > 0) ranked = filtered;
    }
    const fromDispatch = ranked.map((server) => {
      const name = getSimpleServerDisplayName(server.serverName, server.displayName || server.providerName || server.serverName);
      let hasHls = false;
      let hasTorrent = false;
      for (const s of probeSources) {
        if (!serverMatchesSource(server, s.serverKey)) continue;
        if (s.isTorrent) hasTorrent = true;
        else hasHls = true;
      }
      return { key: server.serverName, name, hasHls, hasTorrent };
    });
    if (fromDispatch.length > 0) return fromDispatch;
    const m = /* @__PURE__ */ new Map();
    probeSources.filter((s) => !selectedLangCode || s.langCode === selectedLangCode).forEach((s) => {
      const entry = m.get(s.serverKey) || { name: s.serverName, hasHls: false, hasTorrent: false };
      if (s.isTorrent) entry.hasTorrent = true;
      else entry.hasHls = true;
      m.set(s.serverKey, entry);
    });
    return Array.from(m, ([key, v]) => ({ key, name: getSimpleServerDisplayName(key, v.name), hasHls: v.hasHls, hasTorrent: v.hasTorrent }));
  }, [dispatchServers, probeSources, selectedLangCode]);
  const sampleEpisodes = reactExports.useMemo(() => {
    if (episodes.length === 0) return [];
    const picks = [episodes[0], episodes[Math.floor(episodes.length / 2)], episodes[episodes.length - 1]];
    const seen = /* @__PURE__ */ new Set();
    return picks.filter((ep) => {
      if (seen.has(ep.episodeId)) return false;
      seen.add(ep.episodeId);
      return true;
    });
  }, [episodes]);
  const representativeId = sampleEpisodes.map((e) => e.episodeId).join("|");
  const resolvedCacheRef = reactExports.useRef(/* @__PURE__ */ new Map());
  const resolveEpisodeCached = reactExports.useCallback(
    async (ep, category = "sub") => {
      const key = `${ep.episodeId}:${category}`;
      const hit = resolvedCacheRef.current.get(key);
      if (hit) return hit;
      const res = await resolveEpisode(ep.episodeId, animeName, ep.number, anilistId, malId, category);
      if (res.sources.length > 0) resolvedCacheRef.current.set(key, res);
      return res;
    },
    [animeName, anilistId, malId]
  );
  reactExports.useEffect(() => {
    resolvedCacheRef.current.clear();
    setProbed(false);
  }, [representativeId]);
  reactExports.useEffect(() => {
    if (isOpen && !isNative) {
      ue.error("Downloads are only available in the native mobile or desktop app");
      onClose();
    }
  }, [isOpen, isNative, onClose]);
  reactExports.useEffect(() => {
    if (isOpen && isDesktop && window.electron) {
      const savedPath = localStorage.getItem("tatakai_download_path");
      if (savedPath) {
        setDownloadPath(savedPath);
      } else {
        window.electron.getDownloadsDir().then((dir) => setDownloadPath(dir));
      }
    } else if (isOpen && isMobile) {
      setDownloadPath("App Storage");
    }
    if (isOpen) {
      setStep("series");
    }
  }, [isOpen, isDesktop, isMobile]);
  reactExports.useEffect(() => {
    if (!isOpen || !isNative || sampleEpisodes.length === 0) return;
    let cancelled = false;
    setProbing(true);
    const withProbeTimeout = (promise, ms, label) => {
      let timer = null;
      const timeout = new Promise((_, reject) => {
        timer = setTimeout(() => reject(new Error(`${label} timed out`)), ms);
      });
      return Promise.race([promise, timeout]).finally(() => {
        if (timer) clearTimeout(timer);
      });
    };
    void Promise.allSettled(
      sampleEpisodes.map(
        (ep) => withProbeTimeout(fetchEpisodeServers(ep.episodeId), 12e3, "Server list").catch(() => ({ sub: [], dub: [] }))
      )
    ).then((settled) => {
      var _a2, _b2;
      if (cancelled) return;
      const union = [];
      const seen = /* @__PURE__ */ new Set();
      for (const r of settled) {
        if (r.status !== "fulfilled") continue;
        for (const s of [...((_a2 = r.value) == null ? void 0 : _a2.sub) || [], ...((_b2 = r.value) == null ? void 0 : _b2.dub) || []]) {
          const norm = String((s == null ? void 0 : s.serverName) || "").trim().toLowerCase();
          if (!norm || seen.has(norm)) continue;
          seen.add(norm);
          union.push(s);
        }
      }
      setDispatchServers(union);
      const savedServerBase = (localStorage.getItem("tatakai_default_server") || "").split("-")[0];
      if (savedServerBase) {
        const match = union.find(
          (s) => [s.serverName, s.providerKey].some((v) => String(v || "").split("-")[0] === savedServerBase)
        );
        if (match) setSelectedServerKey((prev) => prev === "auto" ? match.serverName : prev);
      }
    }).catch(() => {
    });
    (async () => {
      var _a2;
      try {
        const merged = [];
        const seenUrls = /* @__PURE__ */ new Set();
        for (const rep of sampleEpisodes) {
          if (cancelled) break;
          try {
            const { sources } = await withProbeTimeout(resolveEpisodeCached(rep), 25e3, "Source probe");
            for (const s of sources) {
              if (!seenUrls.has(s.url)) {
                seenUrls.add(s.url);
                merged.push(s);
              }
            }
          } catch {
          }
        }
        if (cancelled) return;
        setProbeSources(merged);
        const savedLang = normalizeLanguage(localStorage.getItem("tatakai_default_language") || "");
        const firstLang = ((_a2 = merged[0]) == null ? void 0 : _a2.langCode) || "";
        setSelectedLangCode((prev) => {
          if (savedLang && merged.some((s) => s.langCode === savedLang)) return savedLang;
          if (prev && merged.some((s) => s.langCode === prev)) return prev;
          return firstLang;
        });
        if (!cancelled) {
          setProbing(false);
          setProbed(true);
        }
      } catch {
        if (!cancelled) {
          setProbing(false);
          setProbed(true);
        }
        throw new Error("probe failed");
      }
    })().catch(() => {
      if (!cancelled) {
        setProbing(false);
        setProbed(true);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [isOpen, isNative, representativeId, resolveEpisodeCached, probeNonce]);
  reactExports.useEffect(() => {
    if (!isOpen || !isNative || isMobile) return;
    let cancelled = false;
    const pending = episodes.filter((e) => selectedIds.has(e.episodeId) && !resolvedCacheRef.current.has(`${e.episodeId}:sub`)).slice(0, 24);
    if (pending.length === 0) return;
    (async () => {
      let idx = 0;
      const worker = async () => {
        while (!cancelled && idx < pending.length) {
          await resolveEpisodeCached(pending[idx++]);
        }
      };
      await Promise.all(Array.from({ length: Math.min(2, pending.length) }, worker));
    })();
    return () => {
      cancelled = true;
    };
  }, [isOpen, isNative, isMobile, selectedIds, resolveEpisodeCached]);
  reactExports.useEffect(() => {
    if (selectedServerKey !== "auto" && !serverOptions.some((s) => s.key === selectedServerKey)) {
      setSelectedServerKey("auto");
    }
  }, [serverOptions, selectedServerKey]);
  const toggleEpisode = (id) => {
    void triggerHaptic("select");
    const next = new Set(selectedIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedIds(next);
  };
  const selectAll = () => {
    void triggerHaptic("select");
    if (selectedIds.size === episodes.length) setSelectedIds(/* @__PURE__ */ new Set());
    else setSelectedIds(new Set(episodes.map((e) => e.episodeId)));
  };
  const handleDownload = async () => {
    var _a2;
    void triggerHaptic("medium");
    setIsStarting(true);
    const episodesToDownload = episodes.filter((e) => selectedIds.has(e.episodeId));
    const basePath = downloadPath || localStorage.getItem("tatakai_download_path") || "";
    if (isDesktop && !basePath) {
      ue.error("Pick a download folder", {
        description: "Complete Setup or choose a folder in desktop settings."
      });
      setIsStarting(false);
      return;
    }
    const langCode = selectedLangCode;
    const noSourceInLang = [];
    const allServersFailed = [];
    let startedCount = 0;
    for (const ep of episodesToDownload) {
      const { sources, headers } = await resolveEpisodeCached(ep);
      let candidates = langCode ? sources.filter((s) => s.langCode === langCode) : sources;
      if (langCode && candidates.length === 0) {
        noSourceInLang.push(ep);
        continue;
      }
      if (selectedServerKey && selectedServerKey !== "auto") {
        const sel = selectedServerKey.toLowerCase();
        const chosen = dispatchServers.find(
          (s) => String(s.serverName || "").trim().toLowerCase() === sel
        );
        const matches = (s) => chosen ? serverMatchesSource(chosen, s.serverKey) : String(s.serverKey || "").trim().toLowerCase() === sel;
        candidates = [
          ...candidates.filter(matches),
          ...candidates.filter((s) => !matches(s))
        ];
      }
      let started = false;
      if (candidates.length === 0) {
        const res = await startDownload({
          episodeId: ep.episodeId,
          animeName,
          episodeNumber: ep.number,
          posterUrl,
          url: "",
          headers,
          downloadPath: basePath || void 0,
          resolvedLanguage: langCode || void 0
        });
        started = res.ok;
        if (!res.ok && res.reason === "missing_stream_url") {
          ue.error(`Episode ${ep.number}: no stream URL`, {
            description: "Open the episode once in the player, then retry."
          });
        } else if (!res.ok) {
          ue.error(`Episode ${ep.number}: download failed`);
        }
      } else {
        for (const src of candidates) {
          const res = await startDownload({
            episodeId: ep.episodeId,
            animeName,
            episodeNumber: ep.number,
            posterUrl,
            url: src.url,
            originalUrl: src.originalUrl,
            headers: src.headers || headers,
            downloadPath: basePath || void 0,
            subtitles: ((_a2 = src.subtitles) == null ? void 0 : _a2.length) ? src.subtitles : void 0,
            resolvedLanguage: src.langCode || langCode || void 0
          });
          if (res.ok) {
            started = true;
            break;
          }
        }
        if (!started) allServersFailed.push(ep);
      }
      if (started) startedCount++;
    }
    if (startedCount > 0) void triggerHaptic("success");
    else if (episodesToDownload.length > 0) void triggerHaptic("error");
    if (allServersFailed.length > 0) {
      ue.error(
        `${allServersFailed.length} episode${allServersFailed.length > 1 ? "s" : ""} failed on every server`,
        { description: langCode ? `Tried all ${getLanguageLabel(langCode)} servers.` : void 0 }
      );
    }
    if (noSourceInLang.length > 0 && langCode) {
      const alt = languageOptions.find((l) => l.code !== langCode);
      const count = noSourceInLang.length;
      ue.error(
        `No ${getLanguageLabel(langCode)} source for ${count} episode${count > 1 ? "s" : ""}`,
        alt ? {
          description: `Switch to ${alt.label} and try again?`,
          action: { label: `Use ${alt.label}`, onClick: () => setSelectedLangCode(alt.code) }
        } : void 0
      );
    }
    setIsStarting(false);
  };
  if (!isOpen) return null;
  const selLangLabel = (_a = languageOptions.find((l) => l.code === selectedLangCode)) == null ? void 0 : _a.label;
  const selServerLabel = selectedServerKey === "auto" ? "Auto server" : ((_b = serverOptions.find((s) => s.key === selectedServerKey)) == null ? void 0 : _b.name) || "Auto server";
  const startSummary = [selLangLabel, selServerLabel].filter(Boolean).join(" · ");
  const showSourcePicker = isNative && (probing || languageOptions.length > 0 || probed && !probing);
  const sheet = /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `fixed z-[100] flex justify-center bg-black/80 backdrop-blur-sm animate-in fade-in ${isDesktop ? "items-center inset-x-0 top-[32px] bottom-0 p-2 sm:p-4" : "items-end sm:items-center inset-0 p-0 sm:p-4"}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      role: "dialog",
      "aria-modal": "true",
      "aria-label": `Download ${animeName}`,
      className: "w-full sm:max-w-2xl max-h-[92dvh] sm:max-h-[90vh] overflow-hidden flex flex-col",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassPanel, { className: "p-4 sm:p-6 space-y-4 sm:space-y-5 max-h-[92dvh] sm:max-h-[90vh] overflow-y-auto overscroll-contain rounded-t-3xl sm:rounded-2xl rounded-b-none sm:rounded-b-2xl pb-[max(1rem,env(safe-area-inset-bottom))]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-xl sm:text-2xl font-bold flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-5 h-5 sm:w-6 sm:h-6 text-primary" }),
            "Download"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              "aria-label": "Close download dialog",
              onClick: onClose,
              className: "p-2 rounded-full hover:bg-white/10 transition-colors",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-5 h-5" })
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2 px-0.5", "aria-label": "Download steps", children: ["series", "episodes", "server"].map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          i > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-px w-6 bg-white/15" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              disabled: s !== "series" && !(s === "episodes" && step === "server"),
              onClick: () => {
                if (s === "series") setStep("series");
                else if (s === "episodes" && step === "server") setStep("episodes");
              },
              className: `flex items-center gap-1.5 text-[11px] font-semibold ${step === s ? "text-primary" : "text-muted-foreground"}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `flex h-5 w-5 items-center justify-center rounded-full text-[10px] ${step === s ? "bg-primary text-white" : "bg-white/10"}`, children: i + 1 }),
                s === "series" ? "Series" : s === "episodes" ? "Episodes" : "Server"
              ]
            }
          )
        ] }, s)) }),
        step === "series" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-3", children: [
            posterUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: posterUrl, alt: `${animeName} poster`, className: "h-24 w-16 shrink-0 rounded-xl object-cover shadow-md", loading: "lazy" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex h-24 w-16 shrink-0 items-center justify-center rounded-xl bg-primary/15", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "h-7 w-7 text-primary" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate text-base font-bold", children: animeName }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-0.5 text-xs text-muted-foreground", children: [
                episodes.length,
                " episode",
                episodes.length === 1 ? "" : "s",
                " available",
                isMobile ? " · downloads as MP4" : ""
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1.5 flex items-center text-[11px] text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(FolderOpen, { className: "mr-1 h-3 w-3 shrink-0" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: downloadPath || "App Storage" })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "px-1 text-xs text-muted-foreground", children: "Next: pick episodes, then the language and server to download from." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              onClick: () => {
                void triggerHaptic("tap");
                setStep("episodes");
              },
              disabled: episodes.length === 0 || !isNative,
              className: "w-full h-12 rounded-xl font-bold",
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center", children: [
                "Choose episodes ",
                /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "ml-2 h-4 w-4 fill-current" })
              ] })
            }
          )
        ] }) : null,
        step === "episodes" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center px-0.5 -mb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "ghost", size: "sm", onClick: () => {
            void triggerHaptic("tap");
            setStep("series");
          }, className: "h-7 gap-1 px-2 text-xs text-muted-foreground hover:text-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "h-3.5 w-3.5" }),
            " Series"
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "episodes", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "bg-white/5 border border-white/10 rounded-xl p-1 w-full", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "episodes", className: "flex-1 gap-2 rounded-lg data-[state=active]:bg-primary data-[state=active]:text-white", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-4 h-4" }),
                " Episodes"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "auto", className: "flex-1 gap-2 rounded-lg data-[state=active]:bg-primary data-[state=active]:text-white", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Bot, { className: "w-4 h-4" }),
                " Auto-Download"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsContent, { value: "episodes", className: "mt-4 space-y-5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "space-y-2.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  StepHeader,
                  {
                    n: 2,
                    label: "Select episodes",
                    hint: `${selectedIds.size}/${episodes.length}`
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-0.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: selectedIds.size > 0 ? `${selectedIds.size} selected` : "Tap episodes to select" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "sm", onClick: selectAll, className: "text-primary hover:text-primary/80 text-xs h-7 px-2", children: selectedIds.size === episodes.length ? "Deselect all" : "Select all" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollArea, { className: "h-[32dvh] sm:h-[300px] min-h-[180px] rounded-xl border border-white/10 bg-white/[0.03]", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 gap-1.5 p-1.5", children: episodes.map((ep) => {
                  const state = downloadStates[ep.episodeId];
                  const isSelected = selectedIds.has(ep.episodeId);
                  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      onClick: () => (state == null ? void 0 : state.status) !== "downloading" && toggleEpisode(ep.episodeId),
                      className: `flex items-center justify-between p-2 sm:p-2.5 rounded-lg border transition-colors cursor-pointer ${isSelected ? "bg-primary/10 border-primary/30" : "bg-white/[0.02] border-transparent hover:border-white/10"}`,
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 sm:gap-3 min-w-0 flex-1", children: [
                          isSelected ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Circle, { className: "w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground flex-shrink-0" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-bold text-sm sm:text-base", children: [
                              "Ep ",
                              ep.number
                            ] }),
                            ep.title && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground block truncate max-w-[150px] sm:max-w-[300px]", children: ep.title })
                          ] })
                        ] }),
                        state && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 sm:gap-4 flex-shrink-0", children: [
                          state.status === "downloading" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] sm:text-xs font-mono text-primary", children: state.progress > 0 ? `${state.progress.toFixed(0)}%` : "..." }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 sm:w-20 h-1 bg-muted rounded-full overflow-hidden mt-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full bg-primary transition-[width] duration-300", style: { width: `${state.progress}%` } }) })
                          ] }),
                          state.status === "completed" && /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4 sm:w-5 sm:h-5 text-green-500" }),
                          state.status === "failed" && /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4 sm:w-5 sm:h-5 text-destructive" })
                        ] })
                      ]
                    },
                    ep.episodeId
                  );
                }) }) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  onClick: () => {
                    void triggerHaptic("tap");
                    setStep("server");
                  },
                  disabled: selectedIds.size === 0,
                  className: "sticky bottom-[max(0px,env(safe-area-inset-bottom))] z-20 w-full h-14 sm:h-16 rounded-xl sm:rounded-2xl font-bold glow-primary flex-col gap-0.5 shadow-[0_-18px_36px_hsl(var(--background))]",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center text-base sm:text-lg", children: [
                    selectedIds.size > 0 ? `Continue with ${selectedIds.size} episode${selectedIds.size > 1 ? "s" : ""}` : "Select episodes",
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "ml-2 h-5 w-5 rotate-180" })
                  ] })
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "auto", className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AutoDownloadTab, { animeId, animeName, episodes }) })
          ] })
        ] }),
        step === "server" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center px-0.5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "ghost", size: "sm", onClick: () => {
            void triggerHaptic("tap");
            setStep("episodes");
          }, className: "h-7 gap-1 px-2 text-xs text-muted-foreground hover:text-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "h-3.5 w-3.5" }),
            " Episodes"
          ] }) }),
          showSourcePicker && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "space-y-2.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              StepHeader,
              {
                n: 3,
                label: "Language & server",
                hint: probing ? "Detecting…" : languageOptions.length ? `${languageOptions.length} language${languageOptions.length > 1 ? "s" : ""}` : void 0
              }
            ),
            probing ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 rounded-xl bg-white/[0.03] border border-white/10 p-4 text-xs text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin text-primary" }),
              " Detecting available sources…"
            ] }) : languageOptions.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-3 rounded-xl bg-white/[0.03] border border-white/10 p-5 text-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-6 h-6 text-amber-500" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium", children: "No sources detected" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "We'll still try every server when you start. Or probe again." })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", size: "sm", onClick: () => setProbeNonce((n) => n + 1), className: "h-8 gap-1.5 text-xs", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-3.5 h-3.5" }),
                " Retry detection"
              ] })
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 rounded-xl bg-white/[0.03] border border-white/10 p-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-2 text-xs font-medium text-muted-foreground", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Languages, { className: "w-3.5 h-3.5" }),
                  " Language ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] opacity-70", children: "(applies to all episodes)" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: languageOptions.map((l) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    onClick: () => setSelectedLangCode(l.code),
                    className: `px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${selectedLangCode === l.code ? "bg-primary text-white border-primary" : "bg-white/5 border-white/10 hover:border-white/20"}`,
                    children: l.label
                  },
                  l.code
                )) })
              ] }),
              serverOptions.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-2 text-xs font-medium text-muted-foreground", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Server, { className: "w-3.5 h-3.5" }),
                  " Server ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] opacity-70", children: "(preferred — falls back automatically)" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      onClick: () => setSelectedServerKey("auto"),
                      className: `px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${selectedServerKey === "auto" ? "bg-primary text-white border-primary" : "bg-white/5 border-white/10 hover:border-white/20"}`,
                      children: "Auto"
                    }
                  ),
                  serverOptions.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "button",
                    {
                      onClick: () => setSelectedServerKey(s.key),
                      className: `flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${selectedServerKey === s.key ? "bg-primary text-white border-primary" : "bg-white/5 border-white/10 hover:border-white/20"}`,
                      children: [
                        s.name,
                        s.hasHls && !s.hasTorrent && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `rounded px-1 text-[9px] font-bold ${selectedServerKey === s.key ? "bg-white/20" : "bg-emerald-500/15 text-emerald-300"}`, children: "HLS" }),
                        s.hasTorrent && !s.hasHls && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `rounded px-1 text-[9px] font-bold ${selectedServerKey === s.key ? "bg-white/20" : "bg-amber-500/15 text-amber-300"}`, children: "TORRENT" })
                      ]
                    },
                    s.key
                  ))
                ] })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center text-[10px] sm:text-xs text-muted-foreground px-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FolderOpen, { className: "w-3 h-3 flex-shrink-0 mr-1" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: downloadPath || "App Storage" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              onClick: handleDownload,
              disabled: selectedIds.size === 0 || isStarting,
              className: "sticky bottom-[max(0px,env(safe-area-inset-bottom))] z-20 w-full h-14 sm:h-16 rounded-xl sm:rounded-2xl font-bold glow-primary flex-col gap-0.5 shadow-[0_-18px_36px_hsl(var(--background))]",
              children: isStarting ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center text-base sm:text-lg", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-5 h-5 mr-2 animate-spin" }),
                "Starting downloads…"
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center text-base sm:text-lg", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "w-4 h-4 mr-2 fill-current" }),
                  selectedIds.size > 0 ? `Download ${selectedIds.size} episode${selectedIds.size > 1 ? "s" : ""}` : "Select episodes"
                ] }),
                selectedIds.size > 0 && startSummary && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] font-normal opacity-80", children: startSummary })
              ] })
            }
          )
        ] })
      ] })
    }
  ) });
  if (typeof document === "undefined") return sheet;
  return reactDomExports.createPortal(sheet, document.body);
};
const EPISODES_PER_GROUP = 24;
function RelationTree({ relations }) {
  if (relations.length === 0) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-4 overflow-x-auto pb-4 scrollbar-hide scroll-smooth", children: relations.map((rel, index) => {
    var _a, _b;
    const fmt = ((_a = rel.format) == null ? void 0 : _a.toUpperCase()) || "";
    const isNovel = fmt.includes("NOVEL");
    const isManga = fmt.includes("MANGA") || fmt.includes("ONE_SHOT");
    const to = isNovel ? "/novel/comingsoon" : isManga ? `/manga/${rel.id}` : `/anime/${rel.id}`;
    const title = rel.titleEnglish || rel.titleRomaji || "Untitled";
    const relLabel = (rel.relationType || "RELATED").replace(/_/g, " ");
    const year = rel.seasonYear || ((_b = rel.startDate) == null ? void 0 : _b.year);
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Link,
      {
        to,
        className: "group flex-shrink-0 w-60 sm:w-64 md:w-72 block transition-transform",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-muted/40 transition-all duration-300 hover:scale-[1.03] hover:ring-2 hover:ring-white/40", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: getProxiedImageUrl(rel.coverImage || ""),
                alt: title,
                loading: "lazy",
                className: "w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-2.5 left-2.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-2.5 py-1 rounded-md bg-black/80 text-white text-[11px] font-bold uppercase tracking-wider backdrop-blur-md border border-white/10 shadow-md", children: relLabel }) }),
            rel.episodes ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded-md bg-black/80 text-white text-[10px] font-bold uppercase tracking-wider backdrop-blur-md border border-white/10 shadow-md", children: [
              rel.episodes,
              " EPS"
            ] }) : null
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2.5 px-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "h4",
              {
                className: "text-sm font-semibold truncate text-foreground group-hover:text-primary transition-colors",
                title,
                children: title
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 mt-1 text-xs text-muted-foreground font-medium", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: rel.format || "TV" }),
              year && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "·" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: year })
              ] })
            ] })
          ] })
        ]
      },
      `${rel.id}-${index}`
    );
  }) });
}
function AnimePage() {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o;
  const { animeId } = useParams();
  const navigate = useNavigate();
  const routeAnimeId = animeId;
  const { isAdmin } = useAuth();
  const [editOpen, setEditOpen] = reactExports.useState(false);
  const { data: animeData, isLoading: loadingInfo, error: animeError } = useAnimeInfo(routeAnimeId);
  const { data: mappingDebug } = useQuery({
    queryKey: ["anime-mapping-debug", routeAnimeId],
    queryFn: async () => {
      if (!routeAnimeId) return null;
      const res = await fetch(`${resolveApiV3Base()}/content/${encodeURIComponent(routeAnimeId)}`);
      if (!res.ok) return null;
      const json = await res.json();
      return (json == null ? void 0 : json.data) ?? null;
    },
    enabled: !!routeAnimeId,
    staleTime: 60 * 1e3
  });
  reactExports.useEffect(() => {
    return;
  }, [mappingDebug]);
  const anilistId = ((_a = animeData == null ? void 0 : animeData.moreInfo) == null ? void 0 : _a.anilistId) || ((_b = mappingDebug == null ? void 0 : mappingDebug.media) == null ? void 0 : _b.anilistId) || (mappingDebug == null ? void 0 : mappingDebug.anilistId) || null;
  const parsedAniListId = reactExports.useMemo(() => {
    if (anilistId != null) {
      const num = Number(anilistId);
      if (Number.isFinite(num) && num > 0) return num;
    }
    const rawId = routeAnimeId || "";
    const numericMatch = rawId.match(/^anilist[:_-]?(\d+)$/i) || rawId.match(/^(\d+)$/);
    if (numericMatch == null ? void 0 : numericMatch[1]) {
      const num = Number(numericMatch[1]);
      if (Number.isFinite(num) && num > 0) return num;
    }
    return void 0;
  }, [anilistId, routeAnimeId]);
  const previewTitles = reactExports.useMemo(() => {
    var _a2;
    if (!((_a2 = animeData == null ? void 0 : animeData.info) == null ? void 0 : _a2.name)) return [];
    return [
      animeData.info.name,
      animeData.info.japaneseName,
      animeData.info.englishName
    ].filter(Boolean);
  }, [animeData == null ? void 0 : animeData.info]);
  const contentAnimeId = reactExports.useMemo(() => {
    if (anilistId && Number.isFinite(Number(anilistId))) return String(anilistId);
    if (!routeAnimeId) return void 0;
    return routeAnimeId;
  }, [routeAnimeId, anilistId]);
  const seasonsQueryId = reactExports.useMemo(() => {
    if (anilistId && Number.isFinite(Number(anilistId))) return String(anilistId);
    if (routeAnimeId && /^\d+$/.test(routeAnimeId)) return routeAnimeId;
    return void 0;
  }, [anilistId, routeAnimeId]);
  const { data: seasonsData } = useAnimeSeasons(seasonsQueryId);
  const watchOrderScrollRef = reactExports.useRef(null);
  const { data: directAniListTags = [] } = useQuery({
    queryKey: ["anime-tags-direct", parsedAniListId],
    queryFn: async () => {
      var _a2, _b2;
      if (!parsedAniListId) return [];
      const gql = `
        query ($id: Int) {
          Media(id: $id, type: ANIME) {
            tags {
              id
              name
              category
              rank
              isMediaSpoiler
              isGeneralSpoiler
              isAdult
            }
          }
        }
      `;
      try {
        const res = await fetch(ANILIST_GRAPHQL_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query: gql, variables: { id: parsedAniListId } })
        });
        if (!res.ok) return [];
        const json = await res.json();
        return ((_b2 = (_a2 = json == null ? void 0 : json.data) == null ? void 0 : _a2.Media) == null ? void 0 : _b2.tags) ?? [];
      } catch {
        return [];
      }
    },
    enabled: Boolean(parsedAniListId),
    staleTime: 60 * 60 * 1e3
  });
  const animeTags = reactExports.useMemo(() => {
    var _a2;
    const raw = directAniListTags.length > 0 ? directAniListTags : ((_a2 = animeData == null ? void 0 : animeData.moreInfo) == null ? void 0 : _a2.tags) || [];
    return raw.filter((t) => !t.isMediaSpoiler && !t.isGeneralSpoiler);
  }, [directAniListTags, (_c = animeData == null ? void 0 : animeData.moreInfo) == null ? void 0 : _c.tags]);
  const [selectedEpisodeGroup, setSelectedEpisodeGroup] = reactExports.useState(0);
  const [episodeQuery, setEpisodeQuery] = reactExports.useState("");
  const [episodeLayout, setEpisodeLayout] = reactExports.useState("compact");
  const { data: episodesData, isLoading: loadingEpisodes } = useEpisodes(contentAnimeId);
  const { data: nextEpisodeSchedule } = useNextEpisodeSchedule(contentAnimeId);
  const filteredEpisodes = reactExports.useMemo(() => {
    const episodes = (episodesData == null ? void 0 : episodesData.episodes) || [];
    const needle = episodeQuery.trim().toLowerCase();
    if (!needle) return episodes;
    return episodes.filter((ep) => {
      if (String(ep.number) === needle) return true;
      const haystack = [
        ep.title,
        ep.overview,
        ...Object.values(ep.titles ?? {})
      ].filter(Boolean).join(" ").toLowerCase();
      return haystack.includes(needle);
    });
  }, [episodesData == null ? void 0 : episodesData.episodes, episodeQuery]);
  const episodeGroups = reactExports.useMemo(() => {
    const episodes = filteredEpisodes;
    if (episodes.length <= EPISODES_PER_GROUP) return [episodes];
    const groups = [];
    for (let index = 0; index < episodes.length; index += EPISODES_PER_GROUP) {
      groups.push(episodes.slice(index, index + EPISODES_PER_GROUP));
    }
    return groups;
  }, [filteredEpisodes]);
  const episodesHaveThumbnails = reactExports.useMemo(() => {
    const episodes = (episodesData == null ? void 0 : episodesData.episodes) || [];
    if (episodes.length === 0) return false;
    const withImage = episodes.filter((ep) => Boolean(ep.image)).length;
    return withImage / episodes.length >= 0.5;
  }, [episodesData == null ? void 0 : episodesData.episodes]);
  reactExports.useEffect(() => {
    setEpisodeLayout(episodesHaveThumbnails ? "grid" : "compact");
  }, [episodesHaveThumbnails]);
  reactExports.useEffect(() => {
    setSelectedEpisodeGroup(0);
  }, [episodeQuery]);
  const malId = ((_d = animeData == null ? void 0 : animeData.moreInfo) == null ? void 0 : _d.malId) || null;
  reactExports.useEffect(() => {
    return;
  }, [routeAnimeId, contentAnimeId, malId, anilistId, Boolean(animeData)]);
  const { data: hqPoster } = useQuery({
    queryKey: ["jikan-cover", malId],
    queryFn: () => {
      var _a2;
      return fetchJikanCover(malId, ((_a2 = animeData == null ? void 0 : animeData.info) == null ? void 0 : _a2.poster) ?? "");
    },
    enabled: !!malId,
    staleTime: 1e3 * 60 * 60 * 24
    // 24h — covers don't change often
  });
  const producerNames = reactExports.useMemo(() => {
    var _a2, _b2;
    const rawProducers = (_a2 = animeData == null ? void 0 : animeData.moreInfo) == null ? void 0 : _a2.producers;
    const fromPayload = Array.isArray(rawProducers) ? rawProducers.map((producer) => String(producer || "").trim()).filter(Boolean) : [];
    if (fromPayload.length > 0) {
      return Array.from(new Set(fromPayload));
    }
    const studioText = String(rawProducers || ((_b2 = animeData == null ? void 0 : animeData.moreInfo) == null ? void 0 : _b2.studios) || "").trim();
    if (!studioText) return [];
    return Array.from(
      new Set(
        studioText.split(",").map((studio) => studio.trim()).filter(Boolean)
      )
    );
  }, [(_e = animeData == null ? void 0 : animeData.moreInfo) == null ? void 0 : _e.producers, (_f = animeData == null ? void 0 : animeData.moreInfo) == null ? void 0 : _f.studios]);
  const producerRequestCandidates = reactExports.useMemo(() => {
    const slugifyProducer = (value) => {
      return value.toLowerCase().replace(/&/g, " and ").replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "");
    };
    const candidates = [];
    for (const producer of producerNames) {
      const slug = slugifyProducer(producer);
      if (slug) candidates.push(slug);
      candidates.push(producer);
    }
    return Array.from(new Set(candidates.map((value) => value.trim()).filter(Boolean)));
  }, [producerNames]);
  const { data: producerAnimeData } = useQuery({
    queryKey: ["producer-anime", producerRequestCandidates],
    queryFn: async () => {
      for (const candidate of producerRequestCandidates) {
        try {
          const response = await fetchProducerAnimes(candidate, 1);
          if (Array.isArray(response == null ? void 0 : response.animes) && response.animes.length > 0) {
            return response;
          }
        } catch {
        }
      }
      return null;
    },
    enabled: producerRequestCandidates.length > 0,
    staleTime: 1e3 * 60 * 5,
    retry: 1
  });
  const producerAnimes = reactExports.useMemo(() => {
    const currentId = String(contentAnimeId || "").trim().toLowerCase();
    const rows = Array.isArray(producerAnimeData == null ? void 0 : producerAnimeData.animes) ? producerAnimeData.animes : [];
    return rows.filter((anime) => String((anime == null ? void 0 : anime.id) || "").trim().toLowerCase() !== currentId).slice(0, 6);
  }, [producerAnimeData == null ? void 0 : producerAnimeData.animes, contentAnimeId]);
  useIsNativeApp();
  const isDesktopApp = useIsDesktopApp();
  const isMobileNative = useIsMobileApp();
  const isMobile = useIsMobile();
  reactExports.useEffect(() => {
    var _a2, _b2;
    const title = (_a2 = animeData == null ? void 0 : animeData.info) == null ? void 0 : _a2.name;
    if (!title) return;
    setViewingRpc({
      animeTitle: title,
      animeImageUrl: (_b2 = animeData == null ? void 0 : animeData.info) == null ? void 0 : _b2.poster,
      animeUrl: `https://tatakai.me/anime/${contentAnimeId}`
    });
    return () => {
      clearDiscordRpc();
    };
  }, [(_g = animeData == null ? void 0 : animeData.info) == null ? void 0 : _g.name, (_h = animeData == null ? void 0 : animeData.info) == null ? void 0 : _h.poster, contentAnimeId]);
  const showSidebar = !isMobile;
  const [isDownloadModalOpen, setIsDownloadModalOpen] = reactExports.useState(false);
  const { settings: contentSafetySettings, updateSettings: updateContentSafetySettings } = useContentSafetySettings();
  const [allowAdultForSession, setAllowAdultForSession] = reactExports.useState(false);
  const allSeasons = Array.isArray(seasonsData) ? seasonsData : [];
  const handleWatchNow = () => {
    if (episodesData == null ? void 0 : episodesData.episodes[0]) {
      navigate(`/watch/${encodeURIComponent(episodesData.episodes[0].episodeId)}`);
    }
  };
  const handleEpisodeClick = (episodeId) => {
    navigate(`/watch/${encodeURIComponent(episodeId)}`);
  };
  const info = animeData == null ? void 0 : animeData.info;
  const moreInfo = animeData == null ? void 0 : animeData.moreInfo;
  const relatedAnime = reactExports.useMemo(() => {
    if (!info || !moreInfo) return [];
    const relations = moreInfo.relations || [];
    const seen = /* @__PURE__ */ new Set();
    return relations.map((rel) => {
      const id = String(rel.id || "").trim();
      if (!id) return null;
      if (String(contentAnimeId || "") === id) return null;
      if (seen.has(id)) return null;
      const isManga = rel.format && ["MANGA", "ONE_SHOT", "NOVEL"].includes(rel.format);
      if (isManga) return null;
      seen.add(id);
      return {
        id,
        name: rel.titleEnglish ?? rel.titleRomaji ?? "Untitled",
        poster: rel.coverImage || info.poster,
        type: rel.format || void 0,
        episodes: { sub: 0, dub: 0 },
        mediaType: "anime"
      };
    }).filter(Boolean);
  }, [moreInfo, info, contentAnimeId]);
  const relatedManga = reactExports.useMemo(() => {
    if (!info || !moreInfo) return [];
    const relations = moreInfo.relations || [];
    const seen = /* @__PURE__ */ new Set();
    return relations.map((rel) => {
      const id = String(rel.id || "").trim();
      if (!id) return null;
      if (String(contentAnimeId || "") === id) return null;
      if (seen.has(id)) return null;
      const isManga = rel.format && ["MANGA", "ONE_SHOT", "NOVEL"].includes(rel.format);
      if (!isManga) return null;
      seen.add(id);
      return {
        id,
        name: rel.titleEnglish ?? rel.titleRomaji ?? "Untitled",
        poster: rel.coverImage || info.poster,
        type: rel.format || void 0,
        episodes: { sub: 0, dub: 0 },
        mediaType: "manga"
      };
    }).filter(Boolean);
  }, [moreInfo, info, contentAnimeId]);
  const genreSeeds = reactExports.useMemo(
    () => ((moreInfo == null ? void 0 : moreInfo.genres) || []).filter(Boolean).slice(0, 2),
    [moreInfo == null ? void 0 : moreInfo.genres]
  );
  const { data: recommendationRows } = useQuery({
    queryKey: ["anime-recommendations", contentAnimeId, genreSeeds.join("|")],
    queryFn: async () => {
      if (genreSeeds.length === 0) return [];
      const result = await contentGraph.search({
        genres: genreSeeds,
        page: 1,
        perPage: 12,
        sortBy: "POPULARITY_DESC",
        isAdult: false
      });
      return result.media.map(toAnimeCard);
    },
    enabled: genreSeeds.length > 0,
    staleTime: 5 * 60 * 1e3
  });
  const includeAdultRecs = !!(contentSafetySettings == null ? void 0 : contentSafetySettings.showAdultEverywhere);
  const { recommendations: anilistRecs } = useAniListRecommendations(parsedAniListId, {
    mediaType: "ANIME",
    includeAdult: includeAdultRecs,
    limit: isMobile ? 12 : 24
  });
  const { recommendations: engineRecs } = useRecommendationEngine({ limit: isMobile ? 12 : 24 });
  const recommendedAnimes = reactExports.useMemo(() => {
    const currentId = String(contentAnimeId || "");
    const seen = /* @__PURE__ */ new Set();
    const out = [];
    const push = (card) => {
      if (!card) return;
      const id = String(card.id || "").trim();
      if (!id || id === currentId || seen.has(id)) return;
      seen.add(id);
      out.push(card);
    };
    for (const r of anilistRecs) {
      push({
        id: String(r.anilistId),
        name: r.title,
        jname: r.jtitle,
        poster: r.poster,
        type: r.format ?? void 0,
        rating: r.averageScore ? (r.averageScore / 10).toFixed(1) : void 0,
        episodes: { sub: 0, dub: 0 },
        malId: r.malId ?? void 0,
        anilistId: r.anilistId,
        isAdult: r.isAdult,
        year: r.seasonYear ?? void 0,
        mediaType: "anime"
      });
    }
    for (const rec of engineRecs) {
      const a = rec.anime;
      push({
        id: String(a.id),
        name: a.title,
        poster: a.poster ?? "",
        type: a.format ?? void 0,
        rating: a.averageScore ? (a.averageScore / 10).toFixed(1) : void 0,
        episodes: { sub: 0, dub: 0 },
        malId: a.malId ?? void 0,
        anilistId: a.anilistId ?? void 0,
        year: a.year ?? void 0,
        mediaType: "anime"
      });
    }
    for (const row of recommendationRows || []) {
      push({ ...row, mediaType: "anime" });
    }
    return out.slice(0, isMobile ? 10 : 14);
  }, [anilistRecs, engineRecs, recommendationRows, contentAnimeId, isMobile]);
  reactExports.useEffect(() => {
    setSelectedEpisodeGroup(0);
  }, [contentAnimeId]);
  if (loadingInfo) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background text-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Background, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "main",
        {
          className: cn(
            "relative z-10 pr-6 py-6 max-w-[1800px] mx-auto",
            isDesktopApp ? "pl-6" : "pl-6 md:pl-32"
          ),
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-32" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-8", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "aspect-[2/3] rounded-3xl" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-2 space-y-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-12 w-3/4" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-24 w-full" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-14 w-40 rounded-full" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-14 w-14 rounded-full" })
                ] })
              ] })
            ] })
          ] })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(MobileNav, {})
    ] });
  }
  if (!animeData) {
    console.warn("[AnimePage] Anime details not available", {
      routeAnimeId,
      resolvedAnilistId: anilistId,
      error: animeError instanceof Error ? animeError.message : animeError,
      hint: 'Set localStorage.tatakaiMediaDebug="1" and reload for the full [getMedia] resolution trace.'
    });
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-background flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold mb-2", children: "Anime details not available" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-4", children: "We couldn't retrieve the information for this anime ID." }),
      false,
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => navigate("/"), className: "px-6 py-2 bg-primary text-primary-foreground rounded-full hover:brightness-110", children: "Go back home" })
    ] }) });
  }
  const totalEpisodes = ((_i = episodesData == null ? void 0 : episodesData.episodes) == null ? void 0 : _i.length) || 0;
  const matchedEpisodes = filteredEpisodes.length;
  const isFilteringEpisodes = episodeQuery.trim().length > 0;
  const showEpisodeToolbar = totalEpisodes > EPISODES_PER_GROUP || episodesHaveThumbnails;
  const hasEpisodeGroups = matchedEpisodes > EPISODES_PER_GROUP;
  const activeEpisodeGroup = Math.min(selectedEpisodeGroup, Math.max(episodeGroups.length - 1, 0));
  const visibleEpisodes = episodeGroups[activeEpisodeGroup] || filteredEpisodes;
  const titleAliases = ((moreInfo == null ? void 0 : moreInfo.titleAliases) ?? []).filter(
    (alias) => alias.toLowerCase() !== String((info == null ? void 0 : info.name) ?? "").toLowerCase()
  );
  if (!info || !moreInfo) return null;
  const requiresAdultWarning = Boolean(animeData.isAdult) && contentSafetySettings.warnBeforeAdultOpen && !allowAdultForSession;
  if (requiresAdultWarning) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background text-foreground overflow-x-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Background, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "main",
        {
          className: cn(
            "relative z-10 py-8 max-w-[980px] mx-auto pb-24",
            isDesktopApp ? "px-4" : "pl-6 md:pl-32 pr-6"
          ),
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            AdultWarningGate,
            {
              title: info.name,
              mediaLabel: "anime",
              onBack: () => navigate(-1),
              onContinue: () => setAllowAdultForSession(true),
              onAlwaysShow: () => {
                updateContentSafetySettings({
                  showAdultEverywhere: true,
                  warnBeforeAdultOpen: false
                });
                setAllowAdultForSession(true);
              }
            }
          )
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(MobileNav, {})
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Helmet, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("title", { children: [
        info.name,
        " — Anime on Tatakai"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("meta", { name: "description", content: ((_j = info.description) == null ? void 0 : _j.slice(0, 160)) || `Track ${info.name}, rate it, and add it to your lists on Tatakai.` }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("meta", { property: "og:title", content: `${info.name} — Anime on Tatakai` }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("meta", { property: "og:description", content: ((_k = info.description) == null ? void 0 : _k.slice(0, 160)) || `Track and discuss ${info.name} on Tatakai — the otaku community.` }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("meta", { property: "og:image", content: info.poster }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("meta", { property: "og:type", content: "video.other" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("meta", { property: "og:url", content: `${window.location.origin}/anime/${contentAnimeId}` }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("meta", { name: "twitter:card", content: "summary_large_image" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("meta", { name: "twitter:title", content: `${info.name} — Anime on Tatakai` }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("meta", { name: "twitter:description", content: ((_l = info.description) == null ? void 0 : _l.slice(0, 100)) || `${info.name} on Tatakai` }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("meta", { name: "twitter:image", content: info.poster }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("link", { rel: "canonical", href: `${window.location.origin}/anime/${contentAnimeId}` })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background text-foreground overflow-x-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        VideoBackground,
        {
          animeId: contentAnimeId,
          poster: info.poster,
          anilistId: parsedAniListId,
          titles: previewTitles,
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: cn(
            "relative z-10 pr-6 py-6 max-w-[1800px] mx-auto pb-24 md:pb-6",
            isDesktopApp ? "pl-6" : "pl-6 md:pl-32"
            // Original web padding
          ), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                onClick: () => navigate(-1),
                className: "flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-5 h-5" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Back" })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16 pt-12 md:pt-24", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(GlassPanel, { className: "overflow-hidden self-start", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: hqPoster ?? getProxiedImageUrl(info.poster),
                  alt: info.name,
                  className: "w-full aspect-[2/3] object-cover"
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-2 space-y-6", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-4xl md:text-5xl font-bold mb-4", children: info.name }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ExtensionSlot, { slotId: "anime-details-after-title", props: { anime: animeData } }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2 mb-4", children: [
                    (moreInfo == null ? void 0 : moreInfo.inDb) ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-400 text-xs font-medium", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3.5 h-3.5" }),
                      "In Tatakai DB"
                    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-muted text-muted-foreground text-xs font-medium", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Database, { className: "w-3.5 h-3.5" }),
                      "Not in DB yet"
                    ] }),
                    isAdmin && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Button,
                      {
                        size: "sm",
                        variant: "outline",
                        className: "h-7 gap-1.5 text-xs",
                        onClick: () => setEditOpen(true),
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "w-3.5 h-3.5" }),
                          "Edit content"
                        ]
                      }
                    )
                  ] }),
                  isAdmin && moreInfo && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    ContentEditSheet,
                    {
                      open: editOpen,
                      onOpenChange: setEditOpen,
                      mediaType: "anime",
                      title: info.name,
                      id: (moreInfo.anilistId ? String(moreInfo.anilistId) : "") || moreInfo.tatakaiId || routeAnimeId || "",
                      initial: {
                        title_romaji: moreInfo.titleRomaji ?? "",
                        title_english: moreInfo.titleEnglish ?? "",
                        title_native: moreInfo.titleNative ?? "",
                        description: info.description ?? "",
                        cover_image_large: moreInfo.coverImageLarge ?? "",
                        cover_image_medium: moreInfo.coverImageMedium ?? "",
                        banner_image: moreInfo.bannerImage ?? "",
                        trailer_url: moreInfo.trailerUrl ?? "",
                        format: moreInfo.formatRaw ?? "",
                        status: moreInfo.statusRaw ?? "",
                        source: moreInfo.source ?? "",
                        country_of_origin: moreInfo.countryOfOrigin ?? "",
                        rating: moreInfo.rating ?? "",
                        season: moreInfo.season ?? "",
                        season_year: moreInfo.seasonYear ?? "",
                        episodes: moreInfo.episodesTotal ?? "",
                        duration: moreInfo.durationMin ?? "",
                        episode_sub_count: moreInfo.episodeSubCount ?? "",
                        episode_dub_count: moreInfo.episodeDubCount ?? "",
                        average_score: moreInfo.averageScore ?? "",
                        mean_score: moreInfo.meanScore ?? "",
                        popularity: moreInfo.popularity ?? "",
                        favourites: moreInfo.favourites ?? "",
                        genres: (moreInfo.genres ?? []).join(", ")
                      }
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-4 mb-6", children: [
                    info.stats.rating && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber/20 text-amber", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-4 h-4 fill-amber" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold", children: info.stats.rating })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Tv, { className: "w-4 h-4" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: info.stats.type })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-4 h-4" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: info.stats.duration })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary/20 text-primary", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Film, { className: "w-4 h-4" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                        "SUB: ",
                        info.stats.episodes.sub
                      ] })
                    ] }),
                    info.stats.episodes.dub > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 px-3 py-1.5 rounded-lg bg-secondary/20 text-secondary", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Film, { className: "w-4 h-4" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                        "DUB: ",
                        info.stats.episodes.dub
                      ] })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2 mb-4", children: (_m = moreInfo.genres) == null ? void 0 : _m.map((genre, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      onClick: () => navigate(`/genre/${genre.toLowerCase()}`),
                      className: "px-3 py-1 rounded-full border border-border text-sm cursor-pointer hover:bg-muted transition-colors",
                      children: genre
                    },
                    `${genre}-${index}`
                  )) }),
                  animeTags.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-1.5 mb-6", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs uppercase tracking-wider text-muted-foreground font-semibold mr-1 flex items-center gap-1", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Tag, { className: "w-3 h-3 text-primary" }),
                      "Tags:"
                    ] }),
                    animeTags.slice(0, 16).map((tag) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "button",
                      {
                        type: "button",
                        onClick: () => navigate(`/search?animeTag=${encodeURIComponent(tag.name)}&type=anime`),
                        className: "px-2.5 py-0.5 rounded-full bg-white/5 hover:bg-primary/20 border border-white/10 hover:border-primary/40 text-xs text-muted-foreground hover:text-primary transition-all flex items-center gap-1 group",
                        title: tag.category ? `${tag.category} • Click to search` : "Click to search",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: tag.name }),
                          typeof tag.rank === "number" && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] text-muted-foreground/60 group-hover:text-primary/70", children: [
                            tag.rank,
                            "%"
                          ] })
                        ]
                      },
                      tag.id || tag.name
                    ))
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground leading-relaxed", children: info.description }),
                  titleAliases.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("details", { className: "mt-4 group", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("summary", { className: "text-xs uppercase tracking-wider text-muted-foreground cursor-pointer hover:text-foreground transition-colors list-none inline-flex items-center gap-1", children: [
                      "Also known as",
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] opacity-60", children: [
                        "(",
                        titleAliases.length,
                        ")"
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 flex flex-wrap gap-1.5", children: titleAliases.map((alias) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: "px-2 py-0.5 rounded-md bg-muted/60 text-xs text-muted-foreground",
                        children: alias
                      },
                      alias
                    )) })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 md:grid-cols-3 gap-4", children: [
                  moreInfo.aired && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground uppercase tracking-wider", children: "Aired" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-medium flex items-center gap-2 mt-1", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-4 h-4" }),
                      moreInfo.aired
                    ] })
                  ] }),
                  moreInfo.status && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground uppercase tracking-wider", children: "Status" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium mt-1", children: moreInfo.status })
                  ] }),
                  moreInfo.studios && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground uppercase tracking-wider", children: "Studios" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "p",
                      {
                        className: "font-medium mt-1 hover:text-primary cursor-pointer transition-colors",
                        onClick: () => navigate(`/search/producer/${encodeURIComponent(moreInfo.studios)}`),
                        children: moreInfo.studios
                      }
                    )
                  ] }),
                  (moreInfo.season || moreInfo.year) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground uppercase tracking-wider", children: "Season" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-medium mt-1 capitalize", children: [
                      moreInfo.season,
                      " ",
                      moreInfo.year
                    ] })
                  ] }),
                  moreInfo.source && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground uppercase tracking-wider", children: "Source" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium mt-1 capitalize", children: String(moreInfo.source).toLowerCase().replace(/_/g, " ") })
                  ] }),
                  moreInfo.duration && moreInfo.duration !== "Unknown" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground uppercase tracking-wider", children: "Duration" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-medium mt-1 flex items-center gap-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-4 h-4" }),
                      moreInfo.duration
                    ] })
                  ] }),
                  moreInfo.countryOfOrigin && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground uppercase tracking-wider", children: "Country" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium mt-1", children: moreInfo.countryOfOrigin })
                  ] }),
                  typeof moreInfo.meanScore === "number" && moreInfo.meanScore > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground uppercase tracking-wider", children: "Mean score" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-medium mt-1", children: [
                      moreInfo.meanScore,
                      "%"
                    ] })
                  ] }),
                  typeof moreInfo.popularity === "number" && moreInfo.popularity > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground uppercase tracking-wider", children: "Popularity" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-medium mt-1", children: [
                      "#",
                      moreInfo.popularity.toLocaleString()
                    ] })
                  ] }),
                  typeof moreInfo.favourites === "number" && moreInfo.favourites > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground uppercase tracking-wider", children: "Favourites" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium mt-1", children: moreInfo.favourites.toLocaleString() })
                  ] }),
                  moreInfo.endDate && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground uppercase tracking-wider", children: "Ended" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-medium mt-1 flex items-center gap-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-4 h-4" }),
                      moreInfo.endDate
                    ] })
                  ] }),
                  producerNames.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-2 md:col-span-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground uppercase tracking-wider", children: "Producers" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 flex flex-wrap gap-2", children: producerNames.map((producer) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        onClick: () => navigate(`/search/producer/${encodeURIComponent(producer)}`),
                        className: "px-3 py-1 rounded-full border border-border text-sm hover:bg-muted transition-colors",
                        children: producer
                      },
                      producer
                    )) })
                  ] })
                ] }),
                Array.isArray(moreInfo.rankings) && moreInfo.rankings.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2 pt-1", children: moreInfo.rankings.slice().sort((a, b) => a.allTime === b.allTime ? a.rank - b.rank : a.allTime ? -1 : 1).slice(0, 6).map((ranking) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "span",
                  {
                    className: "inline-flex items-center gap-1.5 rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary capitalize",
                    title: ranking.context,
                    children: [
                      ranking.type === "RATED" ? /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-3.5 h-3.5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-3.5 h-3.5" }),
                      "#",
                      ranking.rank,
                      " ",
                      ranking.context
                    ]
                  },
                  ranking.id
                )) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-3 pt-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "button",
                    {
                      onClick: handleWatchNow,
                      disabled: loadingEpisodes || !(episodesData == null ? void 0 : episodesData.episodes[0]),
                      className: "h-12 sm:h-14 px-6 sm:px-8 rounded-full bg-foreground text-background font-bold text-base sm:text-lg hover:scale-105 active:scale-95 transition-all flex items-center gap-2 glow-primary disabled:opacity-50",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "w-4 h-4 sm:w-5 sm:h-5 fill-background" }),
                        "Watch Now"
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    WatchlistButton,
                    {
                      animeId: contentAnimeId,
                      animeName: info.name,
                      animePoster: info.poster,
                      variant: "icon",
                      malId: malId || moreInfo.malId || null,
                      anilistId: anilistId || moreInfo.anilistId || null
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    AddToPlaylistButton,
                    {
                      animeId: contentAnimeId,
                      animeName: info.name,
                      animePoster: info.poster,
                      variant: "icon"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    ShareButton,
                    {
                      animeId: contentAnimeId,
                      animeName: info.name,
                      animePoster: info.poster,
                      description: info.description
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(OpenInAppButton, { size: "lg", className: "h-12 sm:h-14 rounded-full", label: "Open in app" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      onClick: () => navigate(`/isshoni?anime=${encodeURIComponent(contentAnimeId)}&title=${encodeURIComponent(info.name)}&poster=${encodeURIComponent(info.poster)}`),
                      className: "group flex h-14 w-14 items-center justify-center rounded-full bg-[hsl(var(--isshoni-accent))] text-black ring-1 ring-inset ring-white/25 shadow-[0_10px_30px_-8px_hsl(var(--isshoni-accent)/0.6)] transition-all hover:scale-105 hover:bg-[hsl(var(--isshoni-accent)/0.9)] hover:shadow-[0_0_28px_hsl(var(--isshoni-accent)/0.5)] active:scale-95",
                      title: "Watch Together",
                      "aria-label": "Start a Watch Together party",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-5 h-5 transition-transform group-hover:scale-110" })
                    }
                  ),
                  (isMobileNative || isDesktopApp) && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      onClick: () => setIsDownloadModalOpen(true),
                      className: "h-14 w-14 rounded-full bg-primary/20 hover:bg-primary/30 text-primary flex items-center justify-center transition-all hover:scale-105",
                      title: "Download Season",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-6 h-6" })
                    }
                  )
                ] })
              ] })
            ] })
          ] })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "main",
        {
          className: cn(
            "relative z-10 pr-6 max-w-[1800px] mx-auto pb-24 md:pb-6",
            isDesktopApp ? "pl-6" : "pl-6 md:pl-32"
          ),
          children: [
            (nextEpisodeSchedule == null ? void 0 : nextEpisodeSchedule.airingISOTimestamp) && /* @__PURE__ */ jsxRuntimeExports.jsx(
              NextEpisodeSchedule,
              {
                animeId: contentAnimeId,
                animeName: info.name,
                animePoster: info.poster,
                anilistId: Number(anilistId || moreInfo.anilistId) || null,
                airingTime: nextEpisodeSchedule.airingISOTimestamp,
                nextEpisodeNumber: nextEpisodeSchedule.episode || (info.stats.episodes.sub || info.stats.episodes.dub || 0) + 1,
                dayOfWeek: nextEpisodeSchedule.dayOfWeek,
                episodeTitle: nextEpisodeSchedule.title,
                overview: nextEpisodeSchedule.overview,
                thumbnail: nextEpisodeSchedule.image
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mb-16", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4 mb-6", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center justify-between gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-semibold", children: "Episodes" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: isFilteringEpisodes ? `${matchedEpisodes} of ${totalEpisodes}` : `${totalEpisodes} total` }),
                    showEpisodeToolbar && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "input",
                          {
                            type: "search",
                            value: episodeQuery,
                            onChange: (event) => setEpisodeQuery(event.target.value),
                            placeholder: "Search number or title...",
                            "aria-label": "Search episodes",
                            className: "h-9 w-48 md:w-60 pl-8 pr-3 rounded-full bg-muted/50 border border-border text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
                          }
                        )
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center rounded-full border border-border overflow-hidden", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "button",
                          {
                            onClick: () => setEpisodeLayout("grid"),
                            "aria-label": "Thumbnail view",
                            "aria-pressed": episodeLayout === "grid",
                            className: cn(
                              "px-3 h-9 transition-colors",
                              episodeLayout === "grid" ? "bg-primary text-primary-foreground" : "bg-muted/50 text-muted-foreground hover:text-foreground"
                            ),
                            children: /* @__PURE__ */ jsxRuntimeExports.jsx(LayoutGrid, { className: "w-4 h-4" })
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "button",
                          {
                            onClick: () => setEpisodeLayout("compact"),
                            "aria-label": "Compact view",
                            "aria-pressed": episodeLayout === "compact",
                            className: cn(
                              "px-3 h-9 transition-colors",
                              episodeLayout === "compact" ? "bg-primary text-primary-foreground" : "bg-muted/50 text-muted-foreground hover:text-foreground"
                            ),
                            children: /* @__PURE__ */ jsxRuntimeExports.jsx(List, { className: "w-4 h-4" })
                          }
                        )
                      ] })
                    ] })
                  ] })
                ] }),
                hasEpisodeGroups && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: episodeGroups.map((group, index) => {
                  var _a2, _b2;
                  const start = ((_a2 = group[0]) == null ? void 0 : _a2.number) ?? index * EPISODES_PER_GROUP + 1;
                  const end = ((_b2 = group[group.length - 1]) == null ? void 0 : _b2.number) ?? start;
                  const isActive = index === activeEpisodeGroup;
                  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "button",
                    {
                      onClick: () => setSelectedEpisodeGroup(index),
                      className: `px-4 py-2 rounded-full text-sm font-semibold transition-all border ${isActive ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20" : "bg-muted/50 text-muted-foreground border-border hover:bg-muted hover:text-foreground"}`,
                      children: [
                        start,
                        "-",
                        end
                      ]
                    },
                    `${start}-${end}-${index}`
                  );
                }) }),
                hasEpisodeGroups && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                  "Showing ",
                  visibleEpisodes.length,
                  " of ",
                  matchedEpisodes,
                  isFilteringEpisodes ? ` matching episodes` : ` episodes`
                ] })
              ] }),
              loadingEpisodes ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-2", children: Array.from({ length: 12 }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-12 rounded-lg" }, i)) }) : !episodesData ? null : visibleEpisodes.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassPanel, { className: "p-6 text-center text-sm text-muted-foreground", children: [
                'No episode matches "',
                episodeQuery.trim(),
                '".'
              ] }) : episodeLayout === "grid" ? (
                /* Thumbnail cards. The screencap, air date, runtime and synopsis all
                   come from ani.zip, which is also what decides the numbering here. */
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4", children: visibleEpisodes.map((ep, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs(ContextMenu, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ContextMenuTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "button",
                    {
                      onClick: () => handleEpisodeClick(ep.episodeId),
                      title: ep.title,
                      className: cn(
                        "group w-full text-left rounded-xl overflow-hidden border bg-muted/30 transition-all hover:border-primary/60 hover:bg-muted/60",
                        ep.isFiller ? "border-orange/40" : ep.hasAired === false ? "border-dashed border-white/15 opacity-70" : "border-border"
                      ),
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-video bg-muted/60 overflow-hidden", children: [
                          ep.image ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "img",
                            {
                              src: ep.image,
                              alt: ep.title,
                              loading: "lazy",
                              className: "w-full h-full object-cover transition-transform duration-300 group-hover:scale-105",
                              onError: (event) => {
                                event.currentTarget.style.visibility = "hidden";
                              }
                            }
                          ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-full flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Tv, { className: "w-7 h-7 text-muted-foreground/40" }) }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "absolute top-2 left-2 px-2 py-0.5 rounded-md bg-black/70 text-white text-xs font-bold backdrop-blur-sm", children: [
                            "EP ",
                            ep.number
                          ] }),
                          ep.isFiller && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute top-2 right-2 px-2 py-0.5 rounded-md bg-orange/90 text-black text-[10px] font-bold uppercase tracking-wide", children: "Filler" }),
                          ep.hasAired === false && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute top-2 right-2 px-2 py-0.5 rounded-md bg-primary/90 text-primary-foreground text-[10px] font-bold uppercase tracking-wide", children: "Upcoming" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-11 h-11 rounded-full bg-primary/90 flex items-center justify-center shadow-lg", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "w-5 h-5 text-primary-foreground ml-0.5" }) }) })
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 space-y-1.5", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold leading-snug line-clamp-2 group-hover:text-primary transition-colors", children: ep.title }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground", children: [
                            ep.airDate && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1", children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-3 h-3" }),
                              ep.airDate
                            ] }),
                            ep.runtime ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1", children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3 h-3" }),
                              ep.runtime,
                              "m"
                            ] }) : null
                          ] }),
                          ep.overview && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground leading-relaxed line-clamp-3", children: ep.overview })
                        ] })
                      ]
                    }
                  ) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ContextMenuContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    ContextMenuItem,
                    {
                      onClick: () => handleEpisodeClick(ep.episodeId),
                      className: "gap-2 cursor-pointer",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "w-4 h-4" }),
                        "Play Episode"
                      ]
                    }
                  ) })
                ] }, `${ep.episodeId}-${index}`)) })
              ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-2", children: visibleEpisodes.map((ep, index) => {
                var _a2;
                return /* @__PURE__ */ jsxRuntimeExports.jsxs(ContextMenu, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ContextMenuTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(HoverCard, { openDelay: 220, closeDelay: 80, children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(HoverCardTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        onClick: () => handleEpisodeClick(ep.episodeId),
                        className: `h-12 w-full rounded-lg font-medium transition-all hover:scale-105 relative ${ep.isFiller ? "bg-orange/20 text-orange hover:bg-orange/30" : ep.hasAired === false ? "bg-muted/40 text-muted-foreground border border-dashed border-white/15 hover:bg-muted/60" : "bg-muted hover:bg-primary hover:text-primary-foreground"}`,
                        title: ep.title,
                        children: ep.number
                      }
                    ) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(HoverCardContent, { side: "top", className: "w-72 p-0 overflow-hidden", children: [
                      ep.image && /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "img",
                        {
                          src: ep.image,
                          alt: ep.title,
                          loading: "lazy",
                          className: "w-full aspect-video object-cover",
                          onError: (event) => {
                            event.currentTarget.style.display = "none";
                          }
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 space-y-1.5", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-semibold leading-snug", children: [
                          ep.number,
                          ". ",
                          ep.title
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground", children: [
                          ep.airDate && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-3 h-3" }),
                            ep.airDate
                          ] }),
                          ep.runtime ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3 h-3" }),
                            ep.runtime,
                            "m"
                          ] }) : null,
                          ep.hasAired === false && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary font-medium", children: "Not yet aired" }),
                          ep.isFiller && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-orange font-medium", children: "Filler" })
                        ] }),
                        ep.overview && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground leading-relaxed line-clamp-5 pt-1", children: ep.overview }),
                        ((_a2 = ep.titles) == null ? void 0 : _a2.ja) && ep.titles.ja !== ep.title && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground/80 pt-1", children: ep.titles.ja })
                      ] })
                    ] })
                  ] }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ContextMenuContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    ContextMenuItem,
                    {
                      onClick: () => handleEpisodeClick(ep.episodeId),
                      className: "gap-2 cursor-pointer",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "w-4 h-4" }),
                        "Play Episode"
                      ]
                    }
                  ) })
                ] }, `${ep.episodeId}-${index}`);
              }) })
            ] }),
            allSeasons.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mb-16", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5 mb-5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-1.5 h-5 md:h-6 rounded-full bg-primary" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl md:text-2xl font-bold tracking-tight text-white flex items-center gap-2", children: "Watch Order" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative group/rail", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => {
                      var _a2;
                      (_a2 = watchOrderScrollRef.current) == null ? void 0 : _a2.scrollBy({ left: -450, behavior: "smooth" });
                    },
                    "aria-label": "Scroll left",
                    className: "absolute -left-3 top-1/2 -translate-y-8 z-20 w-10 h-10 rounded-full bg-black/80 hover:bg-black text-white border border-white/10 flex items-center justify-center opacity-0 group-hover/rail:opacity-100 transition-all shadow-xl backdrop-blur-md",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "w-5 h-5" })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    ref: watchOrderScrollRef,
                    className: "flex gap-4 overflow-x-auto pb-4 scrollbar-hide scroll-smooth",
                    children: allSeasons.map((season) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Link,
                      {
                        to: `/anime/${season.id}`,
                        className: cn(
                          "group flex-shrink-0 w-60 sm:w-64 md:w-72 block transition-transform",
                          season.isCurrent && "pointer-events-none"
                        ),
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: cn(
                            "relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-muted/40 transition-all duration-300",
                            season.isCurrent ? "ring-2 ring-white ring-offset-2 ring-offset-background" : "hover:scale-[1.03] hover:ring-2 hover:ring-white/40"
                          ), children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "img",
                              {
                                src: getProxiedImageUrl(season.poster),
                                alt: season.name,
                                loading: "lazy",
                                className: "w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-2.5 left-2.5", children: season.isCurrent ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-2.5 py-1 rounded-md bg-white text-black text-[11px] font-black uppercase tracking-wider shadow-md", children: "CURRENT" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-2.5 py-1 rounded-md bg-black/80 text-white text-[11px] font-bold uppercase tracking-wider backdrop-blur-md border border-white/10 shadow-md", children: season.classification || `SEASON ${season.seasonNumber}` }) }),
                            season.episodeCount && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded-md bg-black/80 text-white text-[10px] font-bold uppercase tracking-wider backdrop-blur-md border border-white/10 shadow-md", children: [
                              season.episodeCount,
                              " EPS"
                            ] })
                          ] }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2.5 px-1", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "h4",
                              {
                                className: cn(
                                  "text-sm font-semibold truncate transition-colors",
                                  season.isCurrent ? "text-primary" : "text-foreground group-hover:text-primary"
                                ),
                                title: season.name,
                                children: season.name
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 mt-1 text-xs text-muted-foreground font-medium", children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: season.format || "TV" }),
                              season.year && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "·" }),
                                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: season.year })
                              ] }),
                              season.rating && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "·" }),
                                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 text-amber-400", children: [
                                  /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-3 h-3 fill-amber-400 text-amber-400 inline" }),
                                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: season.rating })
                                ] })
                              ] })
                            ] })
                          ] })
                        ]
                      },
                      season.id
                    ))
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => {
                      var _a2;
                      (_a2 = watchOrderScrollRef.current) == null ? void 0 : _a2.scrollBy({ left: 450, behavior: "smooth" });
                    },
                    "aria-label": "Scroll right",
                    className: "absolute -right-3 top-1/2 -translate-y-8 z-20 w-10 h-10 rounded-full bg-black/80 hover:bg-black text-white border border-white/10 flex items-center justify-center opacity-85 group-hover/rail:opacity-100 transition-all shadow-xl backdrop-blur-md",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-5 h-5" })
                  }
                )
              ] })
            ] }),
            Array.isArray(moreInfo.streamingEpisodes) && moreInfo.streamingEpisodes.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mb-16", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5 mb-5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-1.5 h-5 md:h-6 rounded-full bg-primary" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl md:text-2xl font-bold tracking-tight text-white flex items-center gap-2", children: "Official Streams" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-3 overflow-x-auto pb-3 -mx-1 px-1", children: moreInfo.streamingEpisodes.filter((ep) => ep.url).slice(0, 24).map((ep, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "a",
                {
                  href: ep.url,
                  target: "_blank",
                  rel: "noopener noreferrer",
                  title: ep.title || ep.site || "Watch",
                  className: "group flex-shrink-0 w-44 rounded-xl overflow-hidden border border-border bg-card hover:border-primary/40 transition-colors",
                  children: [
                    ep.thumbnail ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-video overflow-hidden", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "img",
                        {
                          src: ep.thumbnail,
                          alt: ep.title || "",
                          loading: "lazy",
                          className: "w-full h-full object-cover group-hover:scale-105 transition-transform"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/30 transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "w-8 h-8 text-white opacity-0 group-hover:opacity-100 fill-white transition-opacity" }) })
                    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-video flex items-center justify-center bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "w-8 h-8 text-muted-foreground" }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-2.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium line-clamp-2", children: ep.title || "Episode" }),
                      ep.site && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 flex items-center gap-1 text-[10px] text-muted-foreground", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "w-3 h-3" }),
                        ep.site
                      ] })
                    ] })
                  ]
                },
                `${ep.url}-${index}`
              )) })
            ] }),
            moreInfo.relations && moreInfo.relations.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mb-16", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5 mb-5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-1.5 h-5 md:h-6 rounded-full bg-primary" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl md:text-2xl font-bold tracking-tight text-white flex items-center gap-2", children: "Series Tree" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(RelationTree, { relations: moreInfo.relations })
            ] }),
            info.characterVoiceActor && info.characterVoiceActor.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mb-16", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-2xl font-semibold mb-6 flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-5 h-5 text-primary" }),
                "Characters"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4", children: info.characterVoiceActor.slice(0, 12).map((cva, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                GlassPanel,
                {
                  className: "p-3 flex items-center gap-3 hover:bg-white/10 transition-all cursor-pointer group",
                  onClick: () => navigate(`/character/${cva.character.id}?name=${encodeURIComponent(cva.character.name)}`),
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "img",
                      {
                        src: getProxiedImageUrl(cva.character.poster) || "/placeholder.svg",
                        alt: cva.character.name,
                        className: "w-14 h-14 rounded-full object-cover border border-white/10 group-hover:scale-110 transition-transform"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-sm truncate group-hover:text-primary transition-colors", children: cva.character.name }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground uppercase tracking-wider", children: cva.character.cast || "Character" })
                    ] }),
                    cva.voiceActor.name !== "Unknown" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right border-l border-white/10 pl-3 hidden sm:block", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground uppercase tracking-wider", children: "Voice" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] font-medium truncate max-w-[80px]", children: cva.voiceActor.name })
                    ] })
                  ]
                },
                `${cva.character.id}-${index}`
              )) })
            ] }),
            moreInfo.staff && moreInfo.staff.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mb-16", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-2xl font-semibold mb-6 flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(PenTool, { className: "w-5 h-5 text-primary" }),
                "Staff"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4", children: moreInfo.staff.map((s, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassPanel, { className: "p-3 flex items-center gap-3 hover:bg-white/10 transition-colors", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "img",
                  {
                    src: getProxiedImageUrl(s.imageUrl) || "/placeholder.svg",
                    alt: s.name,
                    className: "w-10 h-10 rounded-full object-cover border border-white/10"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-xs truncate", children: s.name }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[9px] text-muted-foreground uppercase tracking-wider", children: s.role || "Staff" })
                ] })
              ] }, `${s.id}-${index}`)) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "mb-16", children: /* @__PURE__ */ jsxRuntimeExports.jsx(RatingsSection, { animeId: contentAnimeId }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "mb-16", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              EpisodeComments,
              {
                animeId: contentAnimeId,
                animeName: info.name,
                fallbackEpisodeId: (_o = (_n = episodesData == null ? void 0 : episodesData.episodes) == null ? void 0 : _n[0]) == null ? void 0 : _o.episodeId
              }
            ) }),
            contentAnimeId && /* @__PURE__ */ jsxRuntimeExports.jsx(
              AnimeCommunityPosts,
              {
                animeId: contentAnimeId,
                animeName: info.name,
                animePoster: info.poster
              }
            ),
            producerAnimes.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
              AnimeGrid,
              {
                animes: producerAnimes,
                title: `More from ${(producerAnimeData == null ? void 0 : producerAnimeData.producerName) || producerNames[0] || "this producer"}`
              }
            ),
            relatedAnime.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(AnimeGrid, { animes: relatedAnime.slice(0, 6), title: "Related Anime" }),
            relatedManga.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(AnimeGrid, { animes: relatedManga.slice(0, 6), title: "Related Manga" }),
            recommendedAnimes.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(AnimeGrid, { animes: recommendedAnimes, title: "Recommended", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-5 h-5 text-primary" }) })
          ]
        }
      ),
      !showSidebar && /* @__PURE__ */ jsxRuntimeExports.jsx(MobileNav, {}),
      (isMobileNative || isDesktopApp) && episodesData && /* @__PURE__ */ jsxRuntimeExports.jsx(
        SeasonDownloadModal,
        {
          isOpen: isDownloadModalOpen,
          onClose: () => setIsDownloadModalOpen(false),
          episodes: episodesData.episodes,
          animeName: info.name,
          posterUrl: info.poster,
          animeId: contentAnimeId,
          anilistId: anilistId ? Number(anilistId) || null : null,
          malId: malId ? Number(malId) || null : null
        }
      )
    ] })
  ] });
}
export {
  AnimePage as default
};
