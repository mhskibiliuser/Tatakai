import { a as useQuery, u as useQueryClient, b as useMutation } from "./tanstack.DPr3OB19.js";
import { u as useAuth, a2 as supabase } from "./index.C6yfkT5T.js";
import { bf as ue } from "./vendor.CJyRs4QS.js";
const LOCAL_KEY = "tatakai:character-favorites:v1";
const safeNow = () => (/* @__PURE__ */ new Date()).toISOString();
const normStr = (v) => {
  const s = String(v ?? "").trim();
  return s.length > 0 ? s : null;
};
const isMissingTableError = (error) => {
  const message = String((error == null ? void 0 : error.message) || "").toLowerCase();
  const details = String((error == null ? void 0 : error.details) || "").toLowerCase();
  return (error == null ? void 0 : error.code) === "42P01" || message.includes("character_favorites") || details.includes("character_favorites") || message.includes("could not find the table");
};
const getLocal = () => {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(LOCAL_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.map((row) => ({
      id: String((row == null ? void 0 : row.id) || `local-${String((row == null ? void 0 : row.character_id) || "").trim()}`),
      user_id: null,
      character_id: String((row == null ? void 0 : row.character_id) || "").trim(),
      character_name: String((row == null ? void 0 : row.character_name) || "").trim(),
      character_image: normStr(row == null ? void 0 : row.character_image),
      character_native_name: normStr(row == null ? void 0 : row.character_native_name),
      source: String((row == null ? void 0 : row.source) || "anilist"),
      created_at: String((row == null ? void 0 : row.created_at) || safeNow()),
      updated_at: String((row == null ? void 0 : row.updated_at) || safeNow())
    })).filter((r) => r.character_id && r.character_name).sort(
      (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
  } catch {
    return [];
  }
};
const saveLocal = (rows) => {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(LOCAL_KEY, JSON.stringify(rows.slice(0, 500)));
};
const upsertLocal = (input) => {
  const now = safeNow();
  const list = getLocal();
  const existing = list.find((r) => r.character_id === input.characterId);
  const next = {
    id: (existing == null ? void 0 : existing.id) || `local-${input.characterId}`,
    user_id: null,
    character_id: input.characterId,
    character_name: input.characterName,
    character_image: normStr(input.characterImage),
    character_native_name: normStr(input.nativeName),
    source: input.source || "anilist",
    created_at: (existing == null ? void 0 : existing.created_at) || now,
    updated_at: now
  };
  const filtered = list.filter((r) => r.character_id !== input.characterId);
  filtered.unshift(next);
  saveLocal(filtered);
  return next;
};
const removeLocal = (characterId) => {
  saveLocal(getLocal().filter((r) => r.character_id !== characterId));
};
function useCharacterFavorites(userId) {
  const { user } = useAuth();
  const targetId = userId || (user == null ? void 0 : user.id);
  return useQuery({
    queryKey: ["character-favorites", targetId || "guest"],
    queryFn: async () => {
      if (!targetId) return getLocal();
      const { data, error } = await supabase.from("character_favorites").select("*").eq("user_id", targetId).order("created_at", { ascending: false });
      if (error) {
        if (isMissingTableError(error)) {
          return targetId === (user == null ? void 0 : user.id) ? getLocal() : [];
        }
        throw error;
      }
      return data || [];
    },
    enabled: !!targetId || typeof window !== "undefined"
  });
}
function useIsCharacterFavorited(characterId) {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["character-favorite", (user == null ? void 0 : user.id) || "guest", characterId],
    queryFn: async () => {
      if (!characterId) return false;
      if (!user) return getLocal().some((r) => r.character_id === characterId);
      const { data, error } = await supabase.from("character_favorites").select("id").eq("user_id", user.id).eq("character_id", characterId).maybeSingle();
      if (error) {
        if (isMissingTableError(error)) {
          return getLocal().some((r) => r.character_id === characterId);
        }
        throw error;
      }
      return !!data;
    },
    enabled: !!characterId
  });
}
function useToggleCharacterFavorite() {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  return useMutation({
    mutationFn: async (input) => {
      const characterId = String(input.characterId || "").trim();
      const characterName = String(input.characterName || "").trim();
      if (!characterId) throw new Error("Missing character id");
      if (!characterName) throw new Error("Missing character name");
      if (!user) throw new Error("Please sign in to favorite characters");
      const { data: existing, error: readErr } = await supabase.from("character_favorites").select("id").eq("user_id", user.id).eq("character_id", characterId).maybeSingle();
      if (readErr) {
        if (isMissingTableError(readErr)) {
          const wasFav = getLocal().some((r) => r.character_id === characterId);
          if (wasFav) {
            removeLocal(characterId);
            return { favorited: false };
          }
          upsertLocal({ ...input, characterId, characterName });
          return { favorited: true };
        }
        throw readErr;
      }
      if (existing) {
        const { error: error2 } = await supabase.from("character_favorites").delete().eq("user_id", user.id).eq("character_id", characterId);
        if (error2) throw error2;
        return { favorited: false };
      }
      const { error } = await supabase.from("character_favorites").insert({
        user_id: user.id,
        character_id: characterId,
        character_name: characterName,
        character_image: normStr(input.characterImage),
        character_native_name: normStr(input.nativeName),
        source: input.source || "anilist"
      });
      if (error) {
        if (isMissingTableError(error)) {
          upsertLocal({ ...input, characterId, characterName });
          return { favorited: true };
        }
        throw error;
      }
      return { favorited: true };
    },
    onSuccess: (result) => {
      queryClient.invalidateQueries({ queryKey: ["character-favorites"] });
      queryClient.invalidateQueries({ queryKey: ["character-favorite"] });
      ue.success(result.favorited ? "Added to favorites" : "Removed from favorites");
    },
    onError: (error) => {
      ue.error((error == null ? void 0 : error.message) || "Failed to update favorites");
    }
  });
}
export {
  useToggleCharacterFavorite as a,
  useCharacterFavorites as b,
  useIsCharacterFavorited as u
};
