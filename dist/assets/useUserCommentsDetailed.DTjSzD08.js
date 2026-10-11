import { r as reactExports } from "./react-vendor.CAo4XUiA.js";
import { a as useQuery } from "./tanstack.DPr3OB19.js";
import { aj as ANILIST_GRAPHQL_ENDPOINT, fz as sanitizeEmbeds, fA as sanitizeAttachments, a2 as supabase, fB as fetchCommentPolls } from "./index.C6yfkT5T.js";
const QUERY$1 = `
query ($ids: [Int]) {
  Page(perPage: 50) {
    media(id_in: $ids) {
      id
      title { romaji english }
      coverImage { large medium }
    }
  }
}`;
async function fetchMeta(ids) {
  var _a, _b, _c, _d, _e, _f;
  const out = {};
  for (let i = 0; i < ids.length; i += 50) {
    const chunk = ids.slice(i, i + 50);
    const res = await fetch(ANILIST_GRAPHQL_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ query: QUERY$1, variables: { ids: chunk } })
    });
    if (!res.ok) throw new Error(`AniList request failed (${res.status})`);
    const json = await res.json();
    const media = ((_b = (_a = json == null ? void 0 : json.data) == null ? void 0 : _a.Page) == null ? void 0 : _b.media) ?? [];
    for (const m of media) {
      const id = Number(m == null ? void 0 : m.id);
      if (!Number.isFinite(id)) continue;
      out[id] = {
        id,
        title: ((_c = m == null ? void 0 : m.title) == null ? void 0 : _c.english) || ((_d = m == null ? void 0 : m.title) == null ? void 0 : _d.romaji) || "Unknown",
        coverImage: ((_e = m == null ? void 0 : m.coverImage) == null ? void 0 : _e.large) || ((_f = m == null ? void 0 : m.coverImage) == null ? void 0 : _f.medium) || null
      };
    }
  }
  return out;
}
function useAnimeMetaByIds(animeIds) {
  const ids = Array.from(
    new Set(
      animeIds.map((v) => {
        if (typeof v === "number") return v;
        const m = String(v ?? "").match(/(\d+)/);
        return m ? Number(m[1]) : NaN;
      }).filter((n) => Number.isFinite(n) && n > 0)
    )
  ).sort((a, b) => a - b);
  return useQuery({
    queryKey: ["anime-meta-by-ids", ids],
    queryFn: () => fetchMeta(ids),
    enabled: ids.length > 0,
    staleTime: 60 * 60 * 1e3,
    retry: 1
  });
}
const QUERY = `
query ($ids: [Int]) {
  Page(perPage: 50) {
    media(id_in: $ids, type: MANGA) {
      id
      format
      countryOfOrigin
      chapters
      volumes
      genres
      tags { name rank isMediaSpoiler isGeneralSpoiler }
      averageScore
      title { romaji english }
    }
  }
}`;
function classify(countryOfOrigin) {
  const c = String(countryOfOrigin || "").toUpperCase();
  if (c === "KR") return "manhwa";
  if (c === "CN" || c === "TW") return "manhua";
  return "manga";
}
async function fetchMangaMeta(ids) {
  var _a, _b, _c, _d;
  const out = {};
  for (let i = 0; i < ids.length; i += 50) {
    const chunk = ids.slice(i, i + 50);
    const res = await fetch(ANILIST_GRAPHQL_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ query: QUERY, variables: { ids: chunk } })
    });
    if (!res.ok) throw new Error(`AniList request failed (${res.status})`);
    const json = await res.json();
    const media = ((_b = (_a = json == null ? void 0 : json.data) == null ? void 0 : _a.Page) == null ? void 0 : _b.media) ?? [];
    for (const m of media) {
      const id = Number(m == null ? void 0 : m.id);
      if (!Number.isFinite(id)) continue;
      out[id] = {
        id,
        bucket: classify(m == null ? void 0 : m.countryOfOrigin),
        format: (m == null ? void 0 : m.format) ?? null,
        genres: Array.isArray(m == null ? void 0 : m.genres) ? m.genres : [],
        tags: Array.isArray(m == null ? void 0 : m.tags) ? m.tags.filter((t) => t && !t.isMediaSpoiler && !t.isGeneralSpoiler).sort((a, b) => ((b == null ? void 0 : b.rank) ?? 0) - ((a == null ? void 0 : a.rank) ?? 0)).map((t) => String((t == null ? void 0 : t.name) || "")).filter(Boolean) : [],
        chapters: (m == null ? void 0 : m.chapters) ?? null,
        volumes: (m == null ? void 0 : m.volumes) ?? null,
        averageScore: (m == null ? void 0 : m.averageScore) ?? null,
        title: ((_c = m == null ? void 0 : m.title) == null ? void 0 : _c.english) || ((_d = m == null ? void 0 : m.title) == null ? void 0 : _d.romaji) || "Unknown"
      };
    }
  }
  return out;
}
function useMangaMetaByIds(anilistIds) {
  const ids = Array.from(
    new Set(
      anilistIds.map((v) => {
        if (typeof v === "number") return v;
        const m = String(v ?? "").match(/(\d+)/);
        return m ? Number(m[1]) : NaN;
      }).filter((n) => Number.isFinite(n) && n > 0)
    )
  ).sort((a, b) => a - b);
  return useQuery({
    queryKey: ["manga-meta-by-ids", ids],
    queryFn: () => fetchMangaMeta(ids),
    enabled: ids.length > 0,
    staleTime: 60 * 60 * 1e3,
    retry: 1
  });
}
const SELECT = "id, user_id, entity_type, entity_id, episode_id, content, is_spoiler, created_at, is_deleted, attachments, embeds";
const digits = (v) => {
  var _a;
  return ((_a = v.match(/(\d+)/)) == null ? void 0 : _a[1]) ?? v;
};
function useEnrichedComments(rows, withAuthors) {
  const animeIds = reactExports.useMemo(
    () => rows.filter((r) => r.entity_type === "anime").map((r) => r.entity_id),
    [rows]
  );
  const mangaIds = reactExports.useMemo(
    () => rows.filter((r) => r.entity_type === "manga").map((r) => r.entity_id),
    [rows]
  );
  const { data: animeMeta = {} } = useAnimeMetaByIds(animeIds);
  const { data: mangaMeta = {} } = useMangaMetaByIds(mangaIds);
  const playlistIds = reactExports.useMemo(
    () => [...new Set(rows.filter((r) => r.entity_type === "playlist").map((r) => r.entity_id))],
    [rows]
  );
  const tierListIds = reactExports.useMemo(
    () => [...new Set(rows.filter((r) => r.entity_type === "tier_list").map((r) => r.entity_id))],
    [rows]
  );
  const forumIds = reactExports.useMemo(
    () => [...new Set(rows.filter((r) => r.entity_type === "forum_post").map((r) => r.entity_id))],
    [rows]
  );
  const { data: dbMeta } = useQuery({
    queryKey: ["comments-entity-meta", playlistIds, tierListIds, forumIds],
    queryFn: async () => {
      const playlists = /* @__PURE__ */ new Map();
      const tierLists = /* @__PURE__ */ new Map();
      const forums = /* @__PURE__ */ new Map();
      const jobs = [];
      if (playlistIds.length) {
        jobs.push(
          (async () => {
            const { data } = await supabase.from("playlists").select("id, name").in("id", playlistIds);
            (data || []).forEach((p) => playlists.set(p.id, p.name));
          })()
        );
      }
      if (tierListIds.length) {
        jobs.push(
          (async () => {
            const { data } = await supabase.from("tier_lists").select("id, name, title, share_code").in("id", tierListIds);
            (data || []).forEach(
              (t) => tierLists.set(t.id, { title: t.title || t.name || "Tier list", shareCode: t.share_code })
            );
          })()
        );
      }
      if (forumIds.length) {
        jobs.push(
          (async () => {
            const { data } = await supabase.from("forum_posts").select("id, title").in("id", forumIds);
            (data || []).forEach((f) => forums.set(f.id, f.title));
          })()
        );
      }
      await Promise.all(jobs);
      return { playlists, tierLists, forums };
    },
    enabled: playlistIds.length + tierListIds.length + forumIds.length > 0
  });
  const commentIds = reactExports.useMemo(() => rows.map((r) => r.id), [rows]);
  const { data: pollMap } = useQuery({
    queryKey: ["comments-detailed-polls", commentIds],
    queryFn: () => fetchCommentPolls(commentIds),
    enabled: commentIds.length > 0
  });
  const authorIds = reactExports.useMemo(
    () => withAuthors ? [...new Set(rows.map((r) => r.user_id))] : [],
    [rows, withAuthors]
  );
  const { data: authorMap } = useQuery({
    queryKey: ["comments-detailed-authors", authorIds],
    queryFn: async () => {
      const { data } = await supabase.from("profiles").select("user_id, display_name, username, avatar_url").in("user_id", authorIds);
      const map = /* @__PURE__ */ new Map();
      (data || []).forEach((p) => map.set(p.user_id, p));
      return map;
    },
    enabled: authorIds.length > 0
  });
  return reactExports.useMemo(() => {
    return rows.map((r) => {
      var _a, _b;
      const hash = `#comment-${r.id}`;
      let title = "Comment";
      let target = "#";
      switch (r.entity_type) {
        case "anime": {
          title = ((_a = animeMeta[Number(digits(r.entity_id))]) == null ? void 0 : _a.title) || "Anime";
          target = (r.episode_id ? `/watch/${r.episode_id}` : `/anime/${r.entity_id}`) + hash;
          break;
        }
        case "manga": {
          title = ((_b = mangaMeta[Number(digits(r.entity_id))]) == null ? void 0 : _b.title) || "Manga";
          target = `/manga/${r.entity_id}${hash}`;
          break;
        }
        case "playlist": {
          title = (dbMeta == null ? void 0 : dbMeta.playlists.get(r.entity_id)) || "Playlist";
          target = `/playlist/${r.entity_id}${hash}`;
          break;
        }
        case "tier_list": {
          const tl = dbMeta == null ? void 0 : dbMeta.tierLists.get(r.entity_id);
          title = (tl == null ? void 0 : tl.title) || "Tier list";
          target = (tl == null ? void 0 : tl.shareCode) ? `/tierlist/${tl.shareCode}${hash}` : "#";
          break;
        }
        case "forum_post": {
          title = (dbMeta == null ? void 0 : dbMeta.forums.get(r.entity_id)) || "Forum post";
          target = `/community/forum/${r.entity_id}${hash}`;
          break;
        }
      }
      return {
        id: r.id,
        user_id: r.user_id,
        entity_type: r.entity_type,
        entity_id: r.entity_id,
        episode_id: r.episode_id,
        content: r.content,
        is_spoiler: r.is_spoiler,
        created_at: r.created_at,
        title,
        target,
        hasEpisode: r.entity_type === "anime" && !!r.episode_id,
        attachments: sanitizeAttachments(r.attachments),
        embeds: sanitizeEmbeds(r.embeds),
        poll: (pollMap == null ? void 0 : pollMap.get(r.id)) ?? null,
        author: withAuthors ? (authorMap == null ? void 0 : authorMap.get(r.user_id)) ?? null : null
      };
    });
  }, [rows, animeMeta, mangaMeta, dbMeta, pollMap, authorMap, withAuthors]);
}
function useUserCommentsDetailed(userId) {
  const { data: rows = [], isLoading } = useQuery({
    queryKey: ["user-comments-detailed", userId],
    queryFn: async () => {
      if (!userId) return [];
      const { data, error } = await supabase.from("comments").select(SELECT).eq("user_id", userId).order("created_at", { ascending: false }).limit(60);
      if (error) throw error;
      return (data || []).filter((c) => !c.is_deleted);
    },
    enabled: !!userId
  });
  const comments = useEnrichedComments(rows, false);
  return { comments, isLoading };
}
function useRecentCommentsDetailed(limit = 30) {
  const { data: rows = [], isLoading } = useQuery({
    queryKey: ["recent-comments-detailed", limit],
    queryFn: async () => {
      const { data, error } = await supabase.from("comments").select(SELECT).order("created_at", { ascending: false }).limit(limit);
      if (error) throw error;
      return (data || []).filter((c) => !c.is_deleted);
    }
  });
  const comments = useEnrichedComments(rows, true);
  return { comments, isLoading };
}
export {
  useMangaMetaByIds as a,
  useUserCommentsDetailed as b,
  useRecentCommentsDetailed as c,
  useAnimeMetaByIds as u
};
