import { r as reactExports } from "./react-vendor.CAo4XUiA.js";
import { a as useQuery } from "./tanstack.DPr3OB19.js";
import { I as contentGraph, u as useAuth, E as useWatchlist, F as useWatchHistory, a as isCapacitor, a2 as supabase } from "./index.C6yfkT5T.js";
import { r as rankCandidates, b as buildTasteProfile } from "./tasteProfile.DMW7D2B1.js";
function pickTags(media) {
  return (media.tags ?? []).filter((t) => !t.isGeneralSpoiler && !t.isMediaSpoiler && (t.rank ?? 0) >= 60).map((t) => t.name);
}
function toAnimeMeta(media) {
  var _a;
  return {
    id: media.tatakaiId ?? String(media.anilistId),
    anilistId: media.anilistId ?? null,
    malId: media.malId ?? null,
    title: media.titleEnglish || media.titleRomaji,
    poster: media.coverImageLarge ?? media.coverImageMedium ?? null,
    genres: media.genres ?? [],
    tags: pickTags(media),
    studios: (media.studios ?? []).map((s) => s.name),
    format: media.format ?? null,
    year: ((_a = media.startDate) == null ? void 0 : _a.year) ?? media.seasonYear ?? null,
    averageScore: media.averageScore ?? null,
    popularity: media.popularity ?? null
  };
}
async function mapLimit(items, limit, fn) {
  const results = new Array(items.length);
  let cursor = 0;
  const workers = Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (cursor < items.length) {
      const index = cursor++;
      results[index] = await fn(items[index]);
    }
  });
  await Promise.all(workers);
  return results;
}
async function enrichAnimeMeta(ids, opts = {}) {
  const unique = Array.from(new Set(ids)).filter(Boolean);
  const metas = await mapLimit(unique, opts.concurrency ?? 6, async (id) => {
    try {
      const media = await contentGraph.getMedia(id);
      return toAnimeMeta(media);
    } catch {
      return null;
    }
  });
  const map = /* @__PURE__ */ new Map();
  metas.forEach((meta) => {
    if (meta) map.set(meta.id, meta);
  });
  return map;
}
const DAY_MS = 24 * 60 * 60 * 1e3;
const MODEL_VERSION = "v1";
const MAX_SEEDS = 60;
const MAX_STORED = 60;
function recommendationBudget() {
  if (!isCapacitor()) {
    return {
      history: 500,
      seeds: MAX_SEEDS,
      collaborative: 200,
      missingCollaborative: 80,
      genreCount: 3,
      genrePageSize: 24
    };
  }
  return {
    history: 240,
    seeds: 36,
    collaborative: 100,
    missingCollaborative: 40,
    genreCount: 2,
    genrePageSize: 16
  };
}
function engagementFromHistory(history) {
  const stats = /* @__PURE__ */ new Map();
  for (const item of history) {
    const s = stats.get(item.anime_id) ?? {
      episodes: /* @__PURE__ */ new Set(),
      completed: false,
      completionHits: 0,
      views: 0,
      totalProgress: 0,
      totalDuration: 0,
      lastWatched: item.watched_at
    };
    s.views += 1;
    s.episodes.add(item.episode_number);
    if (item.completed) {
      s.completed = true;
      s.completionHits += 1;
    }
    s.totalProgress += item.progress_seconds || 0;
    s.totalDuration += item.duration_seconds || 0;
    if (new Date(item.watched_at).getTime() > new Date(s.lastWatched).getTime()) s.lastWatched = item.watched_at;
    stats.set(item.anime_id, s);
  }
  const out = /* @__PURE__ */ new Map();
  stats.forEach((s, id) => {
    const days = (Date.now() - new Date(s.lastWatched).getTime()) / DAY_MS;
    const recency = Math.exp(-days / 28);
    const completion = Math.min(1, s.completionHits / Math.max(1, s.views));
    const breadth = Math.min(1, s.episodes.size / 12);
    const consistency = Math.min(1, s.views / 8);
    const progress = Math.min(1, s.totalProgress / Math.max(1, s.totalDuration));
    const engagement = Math.round(
      (breadth * 0.3 + completion * 0.25 + recency * 0.2 + consistency * 0.15 + progress * 0.1) * 100
    );
    out.set(id, { engagement, completed: s.completed, last: s.lastWatched });
  });
  return out;
}
function statusToWatchlist(status) {
  const valid = ["watching", "completed", "plan_to_watch", "dropped", "on_hold"];
  return valid.includes(status) ? status : void 0;
}
function assembleSignals(watchlist, history, ratings, feedback) {
  const byId = /* @__PURE__ */ new Map();
  const upsert = (id, patch) => {
    const prev = byId.get(id) ?? { animeId: id };
    byId.set(id, { ...prev, ...patch });
  };
  for (const w of watchlist) upsert(w.anime_id, { status: statusToWatchlist(w.status), lastActivity: w.updated_at });
  const eng = engagementFromHistory(history);
  eng.forEach((v, id) => upsert(id, { engagement: v.engagement, completed: v.completed, lastActivity: v.last }));
  for (const r of ratings) upsert(r.anime_id, { userRating: r.rating });
  for (const f of feedback) {
    if (f.feedback === "like") upsert(f.anime_id, { liked: true });
    else if (f.feedback === "dislike") upsert(f.anime_id, { disliked: true });
  }
  return Array.from(byId.values());
}
async function gatherCandidateMedia(topGenres, budget) {
  const media = [];
  const push = (arr) => {
    if (arr) media.push(...arr);
  };
  try {
    const home = await contentGraph.getHomePage();
    push(home.trending);
    push(home.popular);
    push(home.topAiring);
    push(home.topUpcoming);
    push(home.latestCompleted);
    push(home.spotlight);
  } catch {
  }
  const genreResults = await Promise.all(
    topGenres.slice(0, budget.genreCount).map((genre) => contentGraph.search({ genres: [genre], page: 1, perPage: budget.genrePageSize }).then((r) => r.media).catch(() => []))
  );
  for (const arr of genreResults) push(arr);
  return media;
}
async function computeEngine(userId) {
  const budget = recommendationBudget();
  const [{ data: watchlist }, { data: history }, { data: ratings }, { data: feedback }] = await Promise.all([
    supabase.from("watchlist").select("*").eq("user_id", userId),
    supabase.from("watch_history").select("*").eq("user_id", userId).order("watched_at", { ascending: false }).limit(budget.history),
    supabase.from("ratings").select("anime_id, rating").eq("user_id", userId),
    supabase.from("recommendation_feedback").select("anime_id, feedback").eq("user_id", userId)
  ]);
  const signals = assembleSignals(
    watchlist ?? [],
    history ?? [],
    ratings ?? [],
    feedback ?? []
  );
  const seedIds = signals.filter((s) => !s.disliked).sort((a, b) => new Date(b.lastActivity ?? 0).getTime() - new Date(a.lastActivity ?? 0).getTime()).slice(0, budget.seeds).map((s) => s.animeId);
  const seedMeta = await enrichAnimeMeta(seedIds);
  const profile = buildTasteProfile(signals, seedMeta);
  const collaborativeById = {};
  let collabIds = [];
  try {
    const { data: collab } = await supabase.rpc("get_user_collaborative_scores", {
      p_user_id: userId,
      p_limit: budget.collaborative
    });
    const rows = collab ?? [];
    const maxScore = rows.reduce((m, r) => Math.max(m, Number(r.score) || 0), 0);
    for (const r of rows) {
      collaborativeById[r.anime_id] = maxScore > 0 ? (Number(r.score) || 0) / maxScore : 0;
    }
    collabIds = rows.map((r) => r.anime_id);
  } catch {
  }
  const media = await gatherCandidateMedia(profile.topGenres.map((g) => g.genre), budget);
  const candidateMap = /* @__PURE__ */ new Map();
  for (const m of media) {
    const meta = toAnimeMeta(m);
    candidateMap.set(meta.id, meta);
  }
  const missingCollab = collabIds.filter((id) => !candidateMap.has(id)).slice(0, budget.missingCollaborative);
  const collabMeta = await enrichAnimeMeta(missingCollab);
  collabMeta.forEach((meta, id) => candidateMap.set(id, meta));
  const excludeIds = new Set(signals.map((s) => s.animeId));
  for (const f of feedback ?? []) {
    if (["dislike", "already_seen", "skip"].includes(f.feedback)) excludeIds.add(f.anime_id);
  }
  const data = {
    profile,
    candidates: Array.from(candidateMap.values()),
    collaborativeById,
    excludeIds: Array.from(excludeIds)
  };
  await persist(userId, data);
  return data;
}
async function persist(userId, data) {
  try {
    const collabMap = new Map(Object.entries(data.collaborativeById));
    const ranked = rankCandidates(data.candidates, data.profile, {
      excludeIds: new Set(data.excludeIds),
      collaborativeById: collabMap,
      nicheBoost: 0.3,
      limit: MAX_STORED
    });
    const metaById = new Map(data.candidates.map((c) => [c.id, c]));
    void metaById;
    const rows = ranked.map((r) => ({
      user_id: userId,
      media_type: "anime",
      anime_id: r.animeId,
      score: r.score,
      confidence: r.confidence,
      factors: r.factors,
      reasons: r.reasons,
      source: "hybrid",
      model_version: MODEL_VERSION,
      generated_at: (/* @__PURE__ */ new Date()).toISOString()
    }));
    if (rows.length) {
      await supabase.from("user_recommendations").upsert(rows, { onConflict: "user_id,media_type,anime_id" });
    }
    await supabase.from("user_taste_profiles").upsert(
      { user_id: userId, profile: data.profile, sample_size: data.profile.sampleSize, updated_at: (/* @__PURE__ */ new Date()).toISOString() },
      { onConflict: "user_id" }
    );
  } catch (e) {
    console.warn("[Recommendations] persist failed:", e == null ? void 0 : e.message);
  }
}
function useRecommendationEngineData() {
  const { user } = useAuth();
  const { data: watchlist } = useWatchlist();
  const { data: history } = useWatchHistory(isCapacitor() ? 240 : 500);
  return useQuery({
    queryKey: ["recommendation-engine", user == null ? void 0 : user.id, watchlist == null ? void 0 : watchlist.length, history == null ? void 0 : history.length],
    enabled: !!user,
    staleTime: 15 * 60 * 1e3,
    queryFn: () => computeEngine(user.id)
  });
}
function useRecommendationEngine(opts = {}) {
  var _a;
  const { nicheBoost = 0.3, limit = 40 } = opts;
  const query = useRecommendationEngineData();
  const recommendations = reactExports.useMemo(() => {
    if (!query.data) return [];
    const { profile, candidates, collaborativeById, excludeIds } = query.data;
    const metaById = new Map(candidates.map((c) => [c.id, c]));
    const ranked = rankCandidates(candidates, profile, {
      excludeIds: new Set(excludeIds),
      collaborativeById: new Map(Object.entries(collaborativeById)),
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
    isError: query.isError,
    refetch: query.refetch
  };
}
export {
  useRecommendationEngine as u
};
