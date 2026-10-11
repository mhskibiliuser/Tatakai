import { a as useQuery } from "./tanstack.DPr3OB19.js";
import { u as useAuth, E as useWatchlist, F as useWatchHistory, H as toHomeData, I as contentGraph, a_ as toAnimeCard } from "./index.C6yfkT5T.js";
async function getAnimeGenres(animeId) {
  return [];
}
function useGenrePreferences() {
  const { user } = useAuth();
  const { data: watchlist } = useWatchlist();
  const { data: history } = useWatchHistory(50);
  return useQuery({
    queryKey: ["genre_preferences", user == null ? void 0 : user.id, watchlist == null ? void 0 : watchlist.length, history == null ? void 0 : history.length],
    queryFn: async () => {
      const genreCounts = /* @__PURE__ */ new Map();
      if (watchlist) {
        for (const item of watchlist.slice(0, 20)) {
          const genres = await getAnimeGenres(item.anime_id);
          const weight = item.status === "completed" ? 3 : item.status === "watching" ? 2.5 : item.status === "plan_to_watch" ? 1.5 : 1;
          for (const genre of genres) {
            const existing = genreCounts.get(genre) || { count: 0, weight: 0 };
            genreCounts.set(genre, {
              count: existing.count + 1,
              weight: existing.weight + weight
            });
          }
        }
      }
      if (history) {
        for (const item of history.slice(0, 30)) {
          const genres = await getAnimeGenres(item.anime_id);
          const completionWeight = item.completed ? 2 : item.duration_seconds && item.progress_seconds / item.duration_seconds > 0.5 ? 1.5 : 1;
          for (const genre of genres) {
            const existing = genreCounts.get(genre) || { count: 0, weight: 0 };
            genreCounts.set(genre, {
              count: existing.count + 1,
              weight: existing.weight + completionWeight
            });
          }
        }
      }
      const preferences = Array.from(genreCounts.entries()).map(([genre, data]) => ({ genre, ...data })).sort((a, b) => b.weight - a.weight);
      return preferences;
    },
    enabled: !!user && (!!(watchlist == null ? void 0 : watchlist.length) || !!(history == null ? void 0 : history.length)),
    staleTime: 3e5
    // 5 minutes cache
  });
}
function usePersonalizedRecommendations(limit = 20) {
  const { user } = useAuth();
  const { data: watchlist } = useWatchlist();
  const { data: history } = useWatchHistory();
  const { data: preferences } = useGenrePreferences();
  return useQuery({
    queryKey: ["recommendations", user == null ? void 0 : user.id, preferences == null ? void 0 : preferences.length],
    queryFn: async () => {
      if (!preferences || preferences.length === 0) {
        const homepage = toHomeData(await contentGraph.getHomePage());
        return ((homepage == null ? void 0 : homepage.spotlightAnimes) || []).slice(0, limit).map((anime) => ({
          anime: {
            id: anime.id,
            name: anime.name,
            poster: anime.poster,
            type: "TV",
            episodes: { sub: 0, dub: 0 },
            rating: void 0
          },
          score: 50,
          reason: "Popular anime"
        }));
      }
      const topGenres = preferences.slice(0, 3).map((p) => p.genre);
      const watchedIds = /* @__PURE__ */ new Set([
        ...(watchlist == null ? void 0 : watchlist.map((w) => w.anime_id)) || [],
        ...(history == null ? void 0 : history.map((h) => h.anime_id)) || []
      ]);
      const recommendations = [];
      for (const genre of topGenres) {
        try {
          const results = await contentGraph.search({ query: genre, page: 1, perPage: 20 });
          if (results == null ? void 0 : results.media) {
            for (const anime of results.media.map(toAnimeCard)) {
              if (watchedIds.has(anime.id)) continue;
              if (recommendations.some((r) => r.anime.id === anime.id)) continue;
              const animeGenres = await getAnimeGenres(anime.id);
              let score = 0;
              const matchedGenres = [];
              for (const g of animeGenres) {
                const pref = preferences.find((p) => p.genre.toLowerCase() === g.toLowerCase());
                if (pref) {
                  score += pref.weight * 10;
                  matchedGenres.push(g);
                }
              }
              if (anime.rating) {
                score += parseFloat(anime.rating) * 5;
              }
              recommendations.push({
                anime: {
                  id: anime.id,
                  name: anime.name,
                  poster: anime.poster,
                  type: anime.type || "TV",
                  episodes: anime.episodes,
                  rating: anime.rating
                },
                score,
                reason: matchedGenres.length > 0 ? `Because you like ${matchedGenres.slice(0, 2).join(" & ")}` : `Similar to your taste`
              });
              if (recommendations.length >= limit * 2) break;
            }
          }
        } catch (error) {
          console.log("Search error for genre:", genre);
        }
        if (recommendations.length >= limit * 2) break;
      }
      return recommendations.sort((a, b) => b.score - a.score).slice(0, limit);
    },
    enabled: !!user && (!!(watchlist == null ? void 0 : watchlist.length) || !!(history == null ? void 0 : history.length)),
    staleTime: 6e5
    // 10 minutes cache
  });
}
export {
  usePersonalizedRecommendations as a,
  useGenrePreferences as u
};
