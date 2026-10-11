import { a as useQuery } from "./tanstack.DPr3OB19.js";
import { aj as ANILIST_GRAPHQL_ENDPOINT, ap as useContentSafetySettings, aE as ALL_GENRES } from "./index.C6yfkT5T.js";
const ANILIST_GRAPHQL_URL = ANILIST_GRAPHQL_ENDPOINT;
const ADULT_GENRE = "Hentai";
async function gql(query, options = {}) {
  var _a;
  const { variables, signal } = options;
  const res = await fetch(ANILIST_GRAPHQL_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(variables ? { query, variables } : { query }),
    signal
  });
  if (!res.ok) {
    throw new Error(`AniList ${res.status}`);
  }
  const json = await res.json();
  if ((_a = json.errors) == null ? void 0 : _a.length) {
    throw new Error(json.errors[0].message || "AniList GraphQL error");
  }
  return json.data;
}
const GENRES_TTL_MS = 12 * 60 * 60 * 1e3;
let genresCache = null;
async function fetchAniListGenres(includeAdult = false) {
  if (!includeAdult && (genresCache == null ? void 0 : genresCache.includeAdult) === false) {
    const age = Date.now() - genresCache.at;
    if (age < GENRES_TTL_MS) return genresCache.genres;
  }
  const data = await gql(
    "query { GenreCollection }"
  );
  const raw = Array.isArray(data.GenreCollection) ? data.GenreCollection : [];
  const genres = [...new Set(raw.map((g) => g.trim()).filter(Boolean))];
  if (!includeAdult) {
    genres.splice(genres.indexOf(ADULT_GENRE), 1);
  }
  if (!includeAdult) {
    genresCache = { at: Date.now(), includeAdult, genres };
  }
  return genres;
}
const FALLBACK_GENRES = ALL_GENRES;
function useAniListGenres() {
  var _a;
  const { settings } = useContentSafetySettings();
  const query = useQuery({
    queryKey: ["anilist-genres", settings.showAdultEverywhere],
    queryFn: () => fetchAniListGenres(settings.showAdultEverywhere),
    staleTime: 12 * 60 * 60 * 1e3,
    // 12h, matches the module-level cache
    gcTime: 24 * 60 * 60 * 1e3,
    retry: 1
  });
  return {
    /** AniList genres, or the fallback list when the query has no data yet. */
    genres: ((_a = query.data) == null ? void 0 : _a.length) ? query.data : FALLBACK_GENRES,
    isLoading: query.isLoading,
    isError: query.isError,
    refetch: query.refetch
  };
}
export {
  useAniListGenres as u
};
