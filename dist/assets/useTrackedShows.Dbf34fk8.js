import { a as useQuery, u as useQueryClient, b as useMutation } from "./tanstack.DPr3OB19.js";
import { u as useAuth, a2 as supabase } from "./index.C6yfkT5T.js";
import { bf as ue } from "./vendor.CJyRs4QS.js";
function useTrackedShows() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["tracked-shows", user == null ? void 0 : user.id],
    queryFn: async () => {
      if (!user) return [];
      const { data, error } = await supabase.from("tracked_shows").select("*").eq("user_id", user.id).order("created_at", { ascending: false });
      if (error) throw error;
      return data ?? [];
    },
    enabled: !!user
  });
}
function usePublicTrackedShows(userId, isPublic, showCalendar = true) {
  return useQuery({
    queryKey: ["public-tracked-shows", userId],
    queryFn: async () => {
      if (!userId) return [];
      const { data, error } = await supabase.from("tracked_shows").select("*").eq("user_id", userId).order("created_at", { ascending: false });
      if (error) throw error;
      return data ?? [];
    },
    enabled: !!userId && isPublic && showCalendar
  });
}
function useToggleTrackedShowByAnilist() {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  return useMutation({
    mutationFn: async ({
      anilistId,
      title,
      imageUrl,
      tracked
    }) => {
      if (!user) throw new Error("Sign in to track shows");
      if (tracked) {
        const { error: error2 } = await supabase.from("tracked_shows").delete().eq("user_id", user.id).eq("anilist_id", anilistId);
        if (error2) throw error2;
        return false;
      }
      const { error } = await supabase.from("tracked_shows").insert({
        user_id: user.id,
        anime_id: `anilist:${anilistId}`,
        anilist_id: anilistId,
        title: title ?? null,
        image_url: imageUrl ?? null
      });
      if (error) throw error;
      return true;
    },
    onSuccess: (nowTracked) => {
      queryClient.invalidateQueries({ queryKey: ["tracked-shows"] });
      ue.success(nowTracked ? "Added to your calendar" : "Removed from your calendar");
    },
    onError: (error) => {
      ue.error(error.message || "Failed to update calendar");
    }
  });
}
function useToggleTrackedShow() {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  return useMutation({
    mutationFn: async ({
      animeId,
      anilistId,
      title,
      imageUrl,
      tracked
    }) => {
      if (!user) throw new Error("Sign in to track shows");
      if (tracked) {
        const { error: error2 } = await supabase.from("tracked_shows").delete().eq("user_id", user.id).eq("anime_id", animeId);
        if (error2) throw error2;
        return false;
      }
      const { error } = await supabase.from("tracked_shows").insert({
        user_id: user.id,
        anime_id: animeId,
        anilist_id: anilistId ?? null,
        title: title ?? null,
        image_url: imageUrl ?? null
      });
      if (error) throw error;
      return true;
    },
    onSuccess: (nowTracked) => {
      queryClient.invalidateQueries({ queryKey: ["tracked-shows"] });
      ue.success(nowTracked ? "Added to your calendar" : "Removed from your calendar");
    },
    onError: (error) => {
      ue.error(error.message || "Failed to update calendar");
    }
  });
}
export {
  useToggleTrackedShow as a,
  usePublicTrackedShows as b,
  useToggleTrackedShowByAnilist as c,
  useTrackedShows as u
};
