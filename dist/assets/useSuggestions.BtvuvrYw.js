import { a as useQuery, u as useQueryClient, b as useMutation } from "./tanstack.DPr3OB19.js";
import { u as useAuth, a2 as supabase, bD as notifySuggestion } from "./index.C6yfkT5T.js";
import { bf as ue } from "./vendor.CJyRs4QS.js";
function useUserSuggestions() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["user_suggestions", user == null ? void 0 : user.id],
    queryFn: async () => {
      if (!user) return [];
      const { data, error } = await supabase.from("user_suggestions").select("*").eq("user_id", user.id).order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
    enabled: !!user
  });
}
function useAllSuggestions() {
  const { isAdmin, isModerator } = useAuth();
  return useQuery({
    queryKey: ["all_suggestions"],
    queryFn: async () => {
      const { data: suggestions, error } = await supabase.from("user_suggestions").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      if (!suggestions || suggestions.length === 0) return [];
      const userIds = [...new Set(suggestions.map((s) => s.user_id))];
      const { data: profiles } = await supabase.from("profiles").select("user_id, display_name, avatar_url, username").in("user_id", userIds);
      const profileMap = new Map((profiles == null ? void 0 : profiles.map((p) => [p.user_id, p])) || []);
      return suggestions.map((suggestion) => ({
        ...suggestion,
        profiles: profileMap.get(suggestion.user_id) || null
      }));
    },
    enabled: isAdmin || isModerator
  });
}
function useCreateSuggestion() {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  return useMutation({
    mutationFn: async (suggestion) => {
      var _a;
      if (!user) throw new Error("Must be logged in");
      const { data, error } = await supabase.from("user_suggestions").insert({
        user_id: user.id,
        ...suggestion,
        status: "pending",
        priority: "normal"
      }).select().single();
      if (error) throw error;
      try {
        notifySuggestion({
          title: suggestion.title,
          description: suggestion.description,
          category: suggestion.category,
          priority: "normal",
          userId: user.id,
          userName: ((_a = user.user_metadata) == null ? void 0 : _a.display_name) || user.email || void 0,
          imageUrl: suggestion.image_url
        });
      } catch {
      }
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user_suggestions"] });
      ue.success("Suggestion submitted successfully!");
    },
    onError: () => {
      ue.error("Failed to submit suggestion");
    }
  });
}
function useDeleteSuggestion() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      const { error } = await supabase.from("user_suggestions").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user_suggestions"] });
      queryClient.invalidateQueries({ queryKey: ["all_suggestions"] });
      ue.success("Suggestion deleted");
    },
    onError: () => {
      ue.error("Failed to delete suggestion");
    }
  });
}
function useReviewSuggestion() {
  const queryClient = useQueryClient();
  const { user, isAdmin, isModerator } = useAuth();
  return useMutation({
    mutationFn: async ({
      id,
      status,
      priority,
      adminNotes
    }) => {
      if (!user || !isAdmin && !isModerator) throw new Error("Admin or moderator access required");
      const { error } = await supabase.from("user_suggestions").update({
        status,
        priority: priority || void 0,
        admin_notes: adminNotes || void 0,
        reviewed_by: user.id,
        reviewed_at: (/* @__PURE__ */ new Date()).toISOString()
      }).eq("id", id);
      if (error) throw error;
      await supabase.from("admin_logs").insert({
        user_id: user.id,
        action: `review_suggestion_${status}`,
        entity_type: "user_suggestion",
        entity_id: id
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["all_suggestions"] });
      queryClient.invalidateQueries({ queryKey: ["admin_logs"] });
      ue.success("Suggestion reviewed");
    },
    onError: () => {
      ue.error("Failed to review suggestion");
    }
  });
}
export {
  useCreateSuggestion as a,
  useAllSuggestions as b,
  useReviewSuggestion as c,
  useDeleteSuggestion as d,
  useUserSuggestions as u
};
