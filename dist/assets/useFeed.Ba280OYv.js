import { c as useInfiniteQuery } from "./tanstack.DPr3OB19.js";
import { u as useAuth, a2 as supabase, a$ as resolveBadges, b0 as deriveIsModerator, b1 as deriveIsAdmin, b2 as tallyPoll, b3 as WATCH_ROOM_COLUMNS } from "./index.C6yfkT5T.js";
const PAGE_SIZE = 20;
const PROFILE_COLS = "user_id, display_name, avatar_url, username";
function useFeed(tab, opts = {}) {
  const { user } = useAuth();
  const { tag, communityId, postType, search } = opts;
  const searchTerm = (search == null ? void 0 : search.trim().replace(/[,()%*\\]/g, " ").trim()) || "";
  return useInfiniteQuery({
    queryKey: ["feed", tab, tag ?? null, communityId ?? null, postType ?? null, searchTerm || null, user == null ? void 0 : user.id],
    initialPageParam: null,
    refetchOnWindowFocus: false,
    getNextPageParam: (lastPage) => {
      const posts = lastPage.filter((i) => i.kind === "post");
      if (posts.length < PAGE_SIZE) return void 0;
      return new Date(posts[posts.length - 1].sortAt).toISOString();
    },
    queryFn: async ({ pageParam }) => {
      const db = supabase;
      const firstPage = pageParam === null;
      let followingIds = [];
      if (tab === "following") {
        if (!user) return [];
        const { data: follows } = await supabase.from("user_follows").select("following_id").eq("follower_id", user.id);
        followingIds = [...new Set((follows || []).map((f) => f.following_id))];
        if (followingIds.length === 0) return [];
      }
      let postIds = null;
      if (tag) {
        const { data: tagged } = await db.from("post_hashtags").select("post_id").eq("tag", tag.toLowerCase()).order("created_at", { ascending: false }).limit(200);
        postIds = [...new Set((tagged || []).map((t) => t.post_id))];
        if (postIds.length === 0) return [];
      }
      let postQuery = supabase.from("forum_posts").select("*").eq("is_approved", true).order("created_at", { ascending: false }).limit(PAGE_SIZE);
      if (pageParam) postQuery = postQuery.lt("created_at", pageParam);
      if (tab === "news") postQuery = postQuery.eq("flair", "News");
      if (tab === "following") postQuery = postQuery.in("user_id", followingIds);
      if (communityId) postQuery = postQuery.eq("community_id", communityId);
      if (postIds) postQuery = postQuery.in("id", postIds);
      if (searchTerm) postQuery = postQuery.or(`title.ilike.%${searchTerm}%,content.ilike.%${searchTerm}%`);
      if (postType === "playlist") postQuery = postQuery.not("playlist_id", "is", null);
      else if (postType === "tierlist") postQuery = postQuery.not("tierlist_id", "is", null);
      else if (postType === "watchroom") postQuery = postQuery.not("metadata->>watch_room_id", "is", null);
      const { data: rawPosts, error: postErr } = await postQuery;
      if (postErr) throw postErr;
      const posts = rawPosts || [];
      const ids = posts.map((p) => p.id);
      const authorIds = [...new Set(posts.map((p) => p.user_id))];
      const { data: authorProfiles } = authorIds.length ? await supabase.from("profiles").select(PROFILE_COLS).in("user_id", authorIds) : { data: [] };
      const profileMap = new Map((authorProfiles || []).map((p) => [p.user_id, p]));
      const communityMap = /* @__PURE__ */ new Map();
      const communityIds = [...new Set(posts.map((p) => p.community_id).filter(Boolean))];
      if (communityIds.length) {
        try {
          const { data: comm, error } = await db.from("communities").select("id, name, slug, icon_url, banner_url, is_verified").in("id", communityIds);
          if (error) throw error;
          (comm || []).forEach(
            (c) => communityMap.set(c.id, { id: c.id, name: c.name, slug: c.slug, icon_url: c.icon_url ?? null, banner_url: c.banner_url ?? null, is_verified: !!c.is_verified })
          );
        } catch {
        }
      }
      const badgeMap = /* @__PURE__ */ new Map();
      const rankScoreMap = /* @__PURE__ */ new Map();
      if (authorIds.length) {
        const [{ data: badgeRows }, { data: roleRows }, { data: watchRows }] = await Promise.all([
          supabase.from("user_badges").select("user_id, badge_key").in("user_id", authorIds),
          supabase.from("profiles").select("user_id, is_admin, is_moderator, role").in("user_id", authorIds),
          supabase.from("watch_history").select("user_id").in("user_id", authorIds)
        ]);
        const keysByUser = /* @__PURE__ */ new Map();
        (badgeRows || []).forEach((r) => {
          const list = keysByUser.get(r.user_id) || [];
          list.push(r.badge_key);
          keysByUser.set(r.user_id, list);
        });
        const roleByUser = /* @__PURE__ */ new Map();
        (roleRows || []).forEach((r) => roleByUser.set(r.user_id, r));
        (watchRows || []).forEach(
          (w) => rankScoreMap.set(w.user_id, (rankScoreMap.get(w.user_id) || 0) + 1)
        );
        for (const id of authorIds) {
          const role = roleByUser.get(id);
          badgeMap.set(
            id,
            resolveBadges(keysByUser.get(id) || [], {
              isAdmin: deriveIsAdmin(role),
              isModerator: deriveIsModerator(role)
            })
          );
        }
      }
      const officialSet = /* @__PURE__ */ new Set();
      if (authorIds.length) {
        try {
          const { data: offRows, error } = await db.from("profiles").select("user_id, is_official").in("user_id", authorIds);
          if (error) throw error;
          (offRows || []).forEach((r) => {
            if (r.is_official) officialSet.add(r.user_id);
          });
        } catch {
        }
      }
      const voteMap = /* @__PURE__ */ new Map();
      if (user && ids.length) {
        const { data: votes } = await supabase.from("forum_votes").select("post_id, vote_type").eq("user_id", user.id).in("post_id", ids);
        (votes || []).forEach((v) => v.post_id && voteMap.set(v.post_id, v.vote_type));
      }
      const pollMap = /* @__PURE__ */ new Map();
      if (ids.length) {
        try {
          const { data: polls, error } = await db.from("post_polls").select("*").in("post_id", ids);
          if (error) throw error;
          const pollList = polls || [];
          if (pollList.length) {
            const { data: pollVotes } = await db.from("post_poll_votes").select("poll_id, user_id, option_index").in("poll_id", pollList.map((p) => p.id));
            const byPoll = /* @__PURE__ */ new Map();
            (pollVotes || []).forEach((v) => {
              const arr = byPoll.get(v.poll_id) || [];
              arr.push(v);
              byPoll.set(v.poll_id, arr);
            });
            pollList.forEach((poll) => pollMap.set(poll.post_id, tallyPoll(poll, byPoll.get(poll.id) || [], user == null ? void 0 : user.id)));
          }
        } catch {
        }
      }
      const repostCount = /* @__PURE__ */ new Map();
      const repostedSet = /* @__PURE__ */ new Set();
      const bookmarkedSet = /* @__PURE__ */ new Set();
      if (ids.length) {
        try {
          const { data: reposts, error } = await db.from("post_reposts").select("post_id, user_id").in("post_id", ids);
          if (error) throw error;
          (reposts || []).forEach((r) => {
            repostCount.set(r.post_id, (repostCount.get(r.post_id) || 0) + 1);
            if (user && r.user_id === user.id) repostedSet.add(r.post_id);
          });
        } catch {
        }
        if (user) {
          try {
            const { data: bms, error } = await db.from("post_bookmarks").select("post_id").eq("user_id", user.id).in("post_id", ids);
            if (error) throw error;
            (bms || []).forEach((b) => bookmarkedSet.add(b.post_id));
          } catch {
          }
        }
      }
      const feedPosts = posts.map((p) => {
        const metadata = p.metadata || {};
        const images = Array.isArray(metadata.images) && metadata.images.length ? metadata.images : p.image_url ? [p.image_url] : null;
        const post = {
          ...p,
          profiles: profileMap.get(p.user_id) || null,
          user_vote: voteMap.get(p.id) || null,
          poll: pollMap.get(p.id) || null,
          gif_url: metadata.gif_url || null,
          images,
          watch_room_id: metadata.watch_room_id || null,
          quoted_post_id: metadata.quoted_post_id || null,
          media_type: metadata.media_type || (p.anime_id ? "anime" : null),
          community: p.community_id ? communityMap.get(p.community_id) ?? null : null,
          repost_count: repostCount.get(p.id) || 0,
          reposted: repostedSet.has(p.id),
          bookmarked: bookmarkedSet.has(p.id),
          badges: badgeMap.get(p.user_id) || [],
          author_rank_score: rankScoreMap.get(p.user_id) || 0,
          author_is_official: officialSet.has(p.user_id),
          news_source: metadata.source || null
        };
        return { kind: "post", sortAt: new Date(p.created_at).getTime(), post };
      });
      const boostByPost = /* @__PURE__ */ new Map();
      if (tab === "foryou" && user && ids.length) {
        try {
          const [{ data: interests }, { data: tagRows }] = await Promise.all([
            db.from("user_tag_interests").select("tag, weight").eq("user_id", user.id),
            db.from("post_hashtags").select("post_id, tag").in("post_id", ids)
          ]);
          const weightByTag = new Map(
            (interests || []).map((r) => [String(r.tag).toLowerCase(), Number(r.weight) || 0])
          );
          (tagRows || []).forEach((r) => {
            const w = weightByTag.get(String(r.tag).toLowerCase());
            if (w) boostByPost.set(r.post_id, (boostByPost.get(r.post_id) || 0) + w);
          });
        } catch {
        }
      }
      const INTEREST_MS = 6 * 60 * 60 * 1e3;
      const NEWS_PENALTY_MS = tab === "foryou" ? 36 * 60 * 60 * 1e3 : 0;
      const rankOf = (item) => {
        if (item.kind !== "post") return item.sortAt;
        let r = item.sortAt + (boostByPost.get(item.post.id) || 0) * INTEREST_MS;
        if (item.post.flair === "News") r -= NEWS_PENALTY_MS;
        return r;
      };
      const isPinned = (item) => item.kind === "post" && !!item.post.is_pinned && (communityId ? true : !item.post.community_id);
      let feedRooms = [];
      if (firstPage && tab !== "news" && !tag && !communityId && !postType && !searchTerm) {
        const { data: rawRooms } = await supabase.from("watch_rooms").select(WATCH_ROOM_COLUMNS).eq("is_active", true).in("access_type", ["public", "password"]).order("created_at", { ascending: false }).limit(20);
        let rooms = rawRooms || [];
        if (tab === "following") rooms = rooms.filter((r) => followingIds.includes(r.host_id));
        if (rooms.length) {
          const roomIds = rooms.map((r) => r.id);
          const { data: participants } = await supabase.from("watch_room_participants").select("room_id").in("room_id", roomIds);
          const countMap = /* @__PURE__ */ new Map();
          (participants || []).forEach((p) => countMap.set(p.room_id, (countMap.get(p.room_id) || 0) + 1));
          const hostIds = [...new Set(rooms.map((r) => r.host_id))];
          const { data: hostProfiles } = await supabase.from("profiles").select("user_id, username, display_name, avatar_url").in("user_id", hostIds);
          const hostMap = new Map((hostProfiles || []).map((p) => [p.user_id, p]));
          feedRooms = rooms.map((room) => ({
            kind: "watchroom",
            sortAt: new Date(room.created_at).getTime(),
            room: { ...room, participant_count: countMap.get(room.id) || 0, host_profile: hostMap.get(room.host_id) }
          }));
        }
      }
      return [...feedPosts, ...feedRooms].sort((a, b) => {
        const pa = isPinned(a) ? 1 : 0;
        const pb = isPinned(b) ? 1 : 0;
        if (pa !== pb) return pb - pa;
        return rankOf(b) - rankOf(a);
      });
    }
  });
}
export {
  useFeed as u
};
