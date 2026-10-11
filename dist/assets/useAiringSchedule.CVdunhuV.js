import { a as useQuery } from "./tanstack.DPr3OB19.js";
import { aj as ANILIST_GRAPHQL_ENDPOINT } from "./index.C6yfkT5T.js";
const QUERY = `
query ($start: Int, $end: Int, $page: Int) {
  Page(page: $page, perPage: 50) {
    pageInfo { hasNextPage currentPage }
    airingSchedules(airingAt_greater: $start, airingAt_lesser: $end, sort: TIME) {
      id
      airingAt
      episode
      media {
        id
        idMal
        format
        episodes
        siteUrl
        title { romaji english }
        coverImage { medium large color }
      }
    }
  }
}`;
async function fetchAiringWindow(startSec, endSec) {
  var _a, _b, _c, _d, _e, _f, _g;
  const out = [];
  let page = 1;
  for (let i = 0; i < 6; i++) {
    const res = await fetch(ANILIST_GRAPHQL_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ query: QUERY, variables: { start: startSec, end: endSec, page }, forceUpstream: true })
    });
    if (!res.ok) throw new Error(`AniList request failed (${res.status})`);
    const json = await res.json();
    const p = (_a = json == null ? void 0 : json.data) == null ? void 0 : _a.Page;
    const schedules = (p == null ? void 0 : p.airingSchedules) ?? [];
    for (const s of schedules) {
      const m = (s == null ? void 0 : s.media) ?? {};
      out.push({
        id: Number(s.id),
        airingAt: Number(s.airingAt),
        episode: Number(s.episode),
        mediaId: Number(m.id),
        malId: m.idMal ?? null,
        title: ((_b = m == null ? void 0 : m.title) == null ? void 0 : _b.english) || ((_c = m == null ? void 0 : m.title) == null ? void 0 : _c.romaji) || "Unknown",
        coverImage: ((_d = m == null ? void 0 : m.coverImage) == null ? void 0 : _d.large) || ((_e = m == null ? void 0 : m.coverImage) == null ? void 0 : _e.medium) || null,
        color: ((_f = m == null ? void 0 : m.coverImage) == null ? void 0 : _f.color) ?? null,
        format: (m == null ? void 0 : m.format) ?? null,
        totalEpisodes: (m == null ? void 0 : m.episodes) ?? null,
        siteUrl: (m == null ? void 0 : m.siteUrl) ?? null
      });
    }
    if (!((_g = p == null ? void 0 : p.pageInfo) == null ? void 0 : _g.hasNextPage)) break;
    page += 1;
  }
  return out;
}
function useAiringSchedule(weekStart) {
  const startSec = Math.floor(weekStart.getTime() / 1e3);
  const endSec = startSec + 7 * 24 * 60 * 60;
  return useQuery({
    queryKey: ["airing-schedule", startSec],
    queryFn: () => fetchAiringWindow(startSec, endSec),
    staleTime: 30 * 60 * 1e3,
    retry: 1
  });
}
export {
  useAiringSchedule as u
};
