import { a as useQuery, u as useQueryClient, b as useMutation } from "./tanstack.DPr3OB19.js";
import { u as useAuth, a2 as supabase } from "./index.C6yfkT5T.js";
const ACHIEVEMENTS = [
  { id: "filler-watcher", title: "Filler Watcher", description: "Watch your very first episode", rank: 1 },
  { id: "genin", title: "Genin", description: "Watch 5 episodes — the journey begins", rank: 2 },
  { id: "chunin", title: "Chunin", description: "Reach 10 episodes watched", rank: 3 },
  { id: "week-warrior", title: "Jonin", description: "Maintain a 7-day watch streak", rank: 4 },
  { id: "plus-ultra", title: "Plus Ultra", description: "Watch 35 episodes — go beyond!", rank: 5 },
  { id: "pro-hero", title: "Pro Hero", description: "Watch 50 episodes — you're a hero", rank: 6 },
  { id: "soul-reaper", title: "Soul Reaper", description: "Explore 25 different anime series", rank: 7 },
  { id: "bankai", title: "Bankai", description: "Reach 100 total episodes watched", rank: 8 },
  { id: "survey-corps", title: "Survey Corps", description: "Explore 50 different anime series", rank: 9 },
  { id: "month-legend", title: "Titan Shifter", description: "Maintain a 30-day watch streak", rank: 10 },
  { id: "demon-slayer", title: "Demon Slayer", description: "Accumulate 5000+ watch minutes", rank: 11 },
  { id: "hashira", title: "Hashira", description: "Watch 600 total episodes — a true Pillar", rank: 12 }
];
function useUserAchievements(userId) {
  return useQuery({
    queryKey: ["admin_user_achievements", userId],
    enabled: !!userId,
    queryFn: async () => {
      const { data, error } = await supabase.from("user_achievements").select("achievement_id, granted_at, note").eq("user_id", userId);
      if (error) return [];
      return data ?? [];
    }
  });
}
function useGrantAchievement() {
  const queryClient = useQueryClient();
  const { profile } = useAuth();
  return useMutation({
    mutationFn: async (args) => {
      var _a;
      const { error } = await supabase.from("user_achievements").upsert({
        user_id: args.userId,
        achievement_id: args.achievementId,
        granted_by: (profile == null ? void 0 : profile.user_id) ?? null,
        note: ((_a = args.note) == null ? void 0 : _a.trim()) || null
      });
      if (error) throw error;
    },
    onSuccess: (_r, args) => {
      queryClient.invalidateQueries({ queryKey: ["admin_user_achievements", args.userId] });
      queryClient.invalidateQueries({ queryKey: ["user_achievements", args.userId] });
    }
  });
}
function useRevokeAchievement() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (args) => {
      const { error } = await supabase.from("user_achievements").delete().eq("user_id", args.userId).eq("achievement_id", args.achievementId);
      if (error) throw error;
    },
    onSuccess: (_r, args) => {
      queryClient.invalidateQueries({ queryKey: ["admin_user_achievements", args.userId] });
      queryClient.invalidateQueries({ queryKey: ["user_achievements", args.userId] });
    }
  });
}
export {
  ACHIEVEMENTS as A,
  useGrantAchievement as a,
  useRevokeAchievement as b,
  useUserAchievements as u
};
