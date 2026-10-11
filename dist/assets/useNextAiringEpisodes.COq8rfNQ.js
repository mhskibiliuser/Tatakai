import { a as useQuery } from "./tanstack.DPr3OB19.js";
import { aj as ANILIST_GRAPHQL_ENDPOINT } from "./index.C6yfkT5T.js";
const QUERY = `
query ($ids: [Int]) {
  Page(perPage: 50) {
    media(id_in: $ids, type: ANIME) {
      id
      status
      episodes
      title { romaji english }
      coverImage { large medium color }
      nextAiringEpisode { airingAt episode timeUntilAiring }
    }
  }
}`;
async function fetchNextAiring(ids) {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i;
  const out = {};
  for (let i = 0; i < ids.length; i += 50) {
    const chunk = ids.slice(i, i + 50);
    const res = await fetch(ANILIST_GRAPHQL_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ query: QUERY, variables: { ids: chunk }, forceUpstream: true })
    });
    if (!res.ok) throw new Error(`AniList request failed (${res.status})`);
    const json = await res.json();
    const media = ((_b = (_a = json == null ? void 0 : json.data) == null ? void 0 : _a.Page) == null ? void 0 : _b.media) ?? [];
    for (const m of media) {
      const id = Number(m == null ? void 0 : m.id);
      if (!Number.isFinite(id)) continue;
      out[id] = {
        mediaId: id,
        title: ((_c = m == null ? void 0 : m.title) == null ? void 0 : _c.english) || ((_d = m == null ? void 0 : m.title) == null ? void 0 : _d.romaji) || "Unknown",
        coverImage: ((_e = m == null ? void 0 : m.coverImage) == null ? void 0 : _e.large) || ((_f = m == null ? void 0 : m.coverImage) == null ? void 0 : _f.medium) || null,
        color: ((_g = m == null ? void 0 : m.coverImage) == null ? void 0 : _g.color) ?? null,
        status: (m == null ? void 0 : m.status) ?? null,
        totalEpisodes: (m == null ? void 0 : m.episodes) ?? null,
        airingAt: ((_h = m == null ? void 0 : m.nextAiringEpisode) == null ? void 0 : _h.airingAt) ?? null,
        episode: ((_i = m == null ? void 0 : m.nextAiringEpisode) == null ? void 0 : _i.episode) ?? null
      };
    }
  }
  return out;
}
function useNextAiringEpisodes(anilistIds) {
  const ids = Array.from(new Set(anilistIds.filter((n) => Number.isFinite(n) && n > 0))).sort(
    (a, b) => a - b
  );
  return useQuery({
    queryKey: ["next-airing-episodes", ids],
    queryFn: () => fetchNextAiring(ids),
    enabled: ids.length > 0,
    staleTime: 30 * 60 * 1e3,
    retry: 1
  });
}
export {
  useNextAiringEpisodes as u
};
