import { r as reactExports } from "./react-vendor.CAo4XUiA.js";
import { a as useQuery } from "./tanstack.DPr3OB19.js";
import { u as useAuth, bv as useMangaReadlist, a as isCapacitor, bw as getMangaByGenre, bn as getTrendingManga, bo as getTrendingManhwa, bx as getTrendingManhua, a2 as supabase, by as getMangaDetail } from "./index.C6yfkT5T.js";
import { r as rankCandidates, b as buildTasteProfile, c as clamp } from "./tasteProfile.DMW7D2B1.js";
function mangaStatusToWatchlist(status) {
  switch (status) {
    case "reading":
      return "watching";
    case "plan_to_read":
      return "plan_to_watch";
    case "completed":
      return "completed";
    case "on_hold":
      return "on_hold";
    case "dropped":
      return "dropped";
    default:
      return "plan_to_watch";
  }
}
function mangaCardToMeta(card) {
  return {
    id: card.id,
    anilistId: card.anilistId ?? null,
    malId: card.malId ?? null,
    title: card.title,
    poster: card.poster,
    genres: card.genres ?? [],
    tags: [],
    studios: [],
    format: card.format ?? "manga",
    year: null,
    // MangaCard doesn't carry a start year
    averageScore: card.score ?? null,
    popularity: card.popularity ?? null
  };
}
function mangaDetailToMeta(id, res) {
  const d = res.detail;
  const creators = Array.from(/* @__PURE__ */ new Set([...d.authors ?? [], ...d.artists ?? [], ...d.publishers ?? []]));
  const format = d.originLanguage === "KR" ? "manhwa" : d.originLanguage === "CN" || d.originLanguage === "TW" ? "manhua" : "manga";
  return {
    id,
    anilistId: d.anilistId ?? null,
    malId: d.malId ?? null,
    title: d.canonicalTitle,
    poster: d.coverImage,
    genres: d.genres ?? [],
    tags: d.themes ?? [],
    studios: creators,
    // treat creators as the "studio"/authorship affinity signal
    format,
    year: d.yearStart ?? null,
    averageScore: d.score ?? null,
    popularity: d.popularity ?? null
  };
}
const MAX_SEEDS = 40;
const MAX_STORED = 60;
function mangaRecommendationBudget() {
  if (!isCapacitor()) return { seeds: MAX_SEEDS, concurrency: 5, genres: 5, primary: 30, secondary: 24 };
  return { seeds: 24, concurrency: 3, genres: 3, primary: 18, secondary: 16 };
}
async function mapLimit(items, limit, fn) {
  const results = new Array(items.length);
  let cursor = 0;
  const workers = Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (cursor < items.length) {
      const i = cursor++;
      results[i] = await fn(items[i]);
    }
  });
  await Promise.all(workers);
  return results;
}
function signalsFromReadlist(rows) {
  return rows.map((r) => ({
    animeId: r.manga_id,
    status: mangaStatusToWatchlist(r.status),
    completed: r.status === "completed",
    engagement: r.last_chapter_number ? clamp(r.last_chapter_number * 3, 0, 80) : void 0,
    lastActivity: r.updated_at
  }));
}
async function gatherMangaCandidates(topGenres, budget) {
  const [byGenre, trending, manhwa, manhua] = await Promise.all([
    Promise.all(topGenres.slice(0, budget.genres).map((g) => getMangaByGenre(g, budget.primary).catch(() => []))),
    getTrendingManga(budget.primary).catch(() => []),
    getTrendingManhwa(budget.secondary).catch(() => []),
    getTrendingManhua(budget.secondary).catch(() => [])
  ]);
  return [...byGenre.flat(), ...trending, ...manhwa, ...manhua];
}
async function computeMangaEngine(userId, readlist) {
  const budget = mangaRecommendationBudget();
  const signals = signalsFromReadlist(readlist);
  const seedIds = signals.filter((s) => !s.disliked).sort((a, b) => new Date(b.lastActivity ?? 0).getTime() - new Date(a.lastActivity ?? 0).getTime()).slice(0, budget.seeds).map((s) => s.animeId);
  const seedMeta = /* @__PURE__ */ new Map();
  await mapLimit(seedIds, budget.concurrency, async (id) => {
    try {
      const detail = await getMangaDetail(id);
      seedMeta.set(id, mangaDetailToMeta(id, detail));
    } catch {
    }
  });
  const profile = buildTasteProfile(signals, seedMeta);
  const cards = await gatherMangaCandidates(profile.topGenres.map((g) => g.genre), budget);
  const candidateMap = /* @__PURE__ */ new Map();
  for (const card of cards) {
    if (!card.id) continue;
    candidateMap.set(card.id, mangaCardToMeta(card));
  }
  const excludeIds = new Set(signals.map((s) => s.animeId));
  const data = {
    profile,
    candidates: Array.from(candidateMap.values()),
    excludeIds: Array.from(excludeIds)
  };
  await persistManga(userId, data);
  return data;
}
async function persistManga(userId, data) {
  try {
    const ranked = rankCandidates(data.candidates, data.profile, {
      excludeIds: new Set(data.excludeIds),
      nicheBoost: 0.3,
      limit: MAX_STORED
    });
    const rows = ranked.map((r) => ({
      user_id: userId,
      media_type: "manga",
      anime_id: r.animeId,
      score: r.score,
      confidence: r.confidence,
      factors: r.factors,
      reasons: r.reasons,
      source: "content",
      model_version: "v1",
      generated_at: (/* @__PURE__ */ new Date()).toISOString()
    }));
    if (rows.length) {
      await supabase.from("user_recommendations").upsert(rows, { onConflict: "user_id,media_type,anime_id" });
    }
  } catch (e) {
    console.warn("[MangaRecommendations] persist failed:", e == null ? void 0 : e.message);
  }
}
function useMangaRecommendationEngine(opts = {}) {
  var _a;
  const { nicheBoost = 0.3, limit = 30 } = opts;
  const { user } = useAuth();
  const { data: readlist } = useMangaReadlist(["reading", "completed", "plan_to_read", "on_hold"]);
  const query = useQuery({
    queryKey: ["manga-recommendation-engine", user == null ? void 0 : user.id, readlist == null ? void 0 : readlist.length],
    enabled: !!user,
    staleTime: 15 * 60 * 1e3,
    queryFn: () => computeMangaEngine(user.id, readlist ?? [])
  });
  const recommendations = reactExports.useMemo(() => {
    if (!query.data) return [];
    const { profile, candidates, excludeIds } = query.data;
    const metaById = new Map(candidates.map((c) => [c.id, c]));
    const ranked = rankCandidates(candidates, profile, {
      excludeIds: new Set(excludeIds),
      nicheBoost,
      limit
    });
    return ranked.map((r) => {
      const anime = metaById.get(r.animeId);
      return anime ? { anime, score: r.score, confidence: r.confidence, reasons: r.reasons, factors: r.factors } : null;
    }).filter((x) => x !== null);
  }, [query.data, nicheBoost, limit]);
  return {
    recommendations,
    profile: ((_a = query.data) == null ? void 0 : _a.profile) ?? null,
    isLoading: query.isLoading,
    isError: query.isError
  };
}
export {
  useMangaRecommendationEngine as u
};
