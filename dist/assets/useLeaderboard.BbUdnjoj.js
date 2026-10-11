import { a as useQuery } from "./tanstack.DPr3OB19.js";
import { a2 as supabase } from "./index.C6yfkT5T.js";
function useLeaderboard(type = "watched", limit = 50) {
  return useQuery({
    queryKey: ["leaderboard", type, limit],
    queryFn: async () => {
      let query;
      switch (type) {
        case "watched":
          query = supabase.from("watch_history").select("user_id").eq("completed", true).limit(1e4);
          break;
        case "rated":
          query = supabase.from("ratings").select("user_id").limit(1e4);
          break;
        case "comments":
          query = supabase.from("comments").select("user_id").limit(1e4);
          break;
        case "active":
          query = supabase.rpc("get_leaderboard_active", { p_limit: limit });
          break;
        case "followers":
          query = supabase.from("user_follows").select("following_id").limit(1e4);
          break;
        case "streak":
          return await getStreakLeaderboard(limit);
        default:
          throw new Error(`Unknown leaderboard type: ${type}`);
      }
      const { data, error } = await query;
      if (error) {
        if (type === "active") {
          const code = String(error.code || "");
          const msg = String(error.message || "");
          const status = Number(error.status);
          if (code === "42883" || code === "PGRST202" || status === 404 || /could not find the function/i.test(msg)) {
            return getActiveLeaderboardFallback(limit);
          }
        }
        throw error;
      }
      if (type === "active") {
        return (data || []).map((item, index) => ({
          ...item,
          rank: index + 1
        }));
      }
      const counts = /* @__PURE__ */ new Map();
      (data || []).forEach((item) => {
        const userId = item.user_id || item.following_id;
        if (!userId) return;
        counts.set(userId, (counts.get(userId) || 0) + 1);
      });
      const topEntries = Array.from(counts.entries()).sort((a, b) => b[1] - a[1]).slice(0, limit);
      const topUserIds = topEntries.map(([userId]) => userId);
      if (topUserIds.length === 0) return [];
      const { data: profiles, error: profileError } = await supabase.from("profiles").select("user_id, display_name, username, avatar_url").in("user_id", topUserIds);
      if (profileError) throw profileError;
      const profileMap = new Map((profiles == null ? void 0 : profiles.map((p) => [p.user_id, p])) || []);
      return topEntries.map(([userId, count], index) => {
        const profile = profileMap.get(userId);
        return {
          user_id: userId,
          display_name: (profile == null ? void 0 : profile.display_name) || null,
          username: (profile == null ? void 0 : profile.username) || null,
          avatar_url: (profile == null ? void 0 : profile.avatar_url) || null,
          score: count,
          rank: index + 1
        };
      });
    },
    staleTime: 3e5
    // 5 minutes cache
  });
}
async function getStreakLeaderboard(limit) {
  const { data, error } = await supabase.from("watch_history").select("user_id, watched_at").order("watched_at", { ascending: true }).limit(1e5);
  if (error) throw error;
  const byUser = /* @__PURE__ */ new Map();
  (data || []).forEach((item) => {
    const uid = item.user_id;
    if (!uid) return;
    if (!byUser.has(uid)) byUser.set(uid, /* @__PURE__ */ new Set());
    const day = new Date(item.watched_at).toISOString().slice(0, 10);
    byUser.get(uid).add(day);
  });
  const userStreaks = [];
  byUser.forEach((days, userId) => {
    const sorted = [...days].sort();
    let longest = 1, temp = 1;
    for (let i = 1; i < sorted.length; i++) {
      const prev = new Date(sorted[i - 1]);
      prev.setDate(prev.getDate() + 1);
      if (prev.toISOString().slice(0, 10) === sorted[i]) {
        temp++;
        if (temp > longest) longest = temp;
      } else {
        temp = 1;
      }
    }
    userStreaks.push({ userId, streak: sorted.length === 1 ? 1 : longest });
  });
  const top = userStreaks.sort((a, b) => b.streak - a.streak).slice(0, limit);
  const topIds = top.map((u) => u.userId);
  if (topIds.length === 0) return [];
  const { data: profiles, error: pErr } = await supabase.from("profiles").select("user_id, display_name, username, avatar_url").in("user_id", topIds);
  if (pErr) throw pErr;
  const profileMap = new Map((profiles || []).map((p) => [p.user_id, p]));
  return top.map(({ userId, streak }, idx) => {
    const profile = profileMap.get(userId);
    return {
      user_id: userId,
      display_name: (profile == null ? void 0 : profile.display_name) ?? null,
      username: (profile == null ? void 0 : profile.username) ?? null,
      avatar_url: (profile == null ? void 0 : profile.avatar_url) ?? null,
      score: streak,
      rank: idx + 1
    };
  });
}
async function getActiveLeaderboardFallback(limit) {
  const [watchedData, ratedData, commentsData] = await Promise.all([
    supabase.from("watch_history").select("user_id").eq("completed", true),
    supabase.from("ratings").select("user_id"),
    supabase.from("comments").select("user_id")
  ]);
  const scores = /* @__PURE__ */ new Map();
  (watchedData.data || []).forEach((item) => {
    scores.set(item.user_id, (scores.get(item.user_id) || 0) + 3);
  });
  (ratedData.data || []).forEach((item) => {
    scores.set(item.user_id, (scores.get(item.user_id) || 0) + 2);
  });
  (commentsData.data || []).forEach((item) => {
    scores.set(item.user_id, (scores.get(item.user_id) || 0) + 1);
  });
  const topUserIds = Array.from(scores.entries()).sort((a, b) => b[1] - a[1]).slice(0, limit).map(([userId]) => userId);
  const { data: profiles } = await supabase.from("profiles").select("user_id, display_name, username, avatar_url").in("user_id", topUserIds);
  const profileMap = new Map((profiles == null ? void 0 : profiles.map((p) => [p.user_id, p])) || []);
  return topUserIds.map((userId, index) => {
    var _a, _b, _c;
    return {
      user_id: userId,
      display_name: ((_a = profileMap.get(userId)) == null ? void 0 : _a.display_name) || null,
      username: ((_b = profileMap.get(userId)) == null ? void 0 : _b.username) || null,
      avatar_url: ((_c = profileMap.get(userId)) == null ? void 0 : _c.avatar_url) || null,
      score: scores.get(userId) || 0,
      rank: index + 1
    };
  });
}
function useUserRank(type = "watched", userId) {
  const { data: leaderboard } = useLeaderboard(type, 1e3);
  return useQuery({
    queryKey: ["user_rank", type, userId],
    queryFn: () => {
      if (!userId || !leaderboard) return null;
      const userEntry = leaderboard.find((entry) => entry.user_id === userId);
      return userEntry ? {
        rank: userEntry.rank,
        score: userEntry.score,
        totalUsers: leaderboard.length
      } : null;
    },
    enabled: !!userId && !!leaderboard
  });
}
export {
  useLeaderboard as a,
  useUserRank as u
};
