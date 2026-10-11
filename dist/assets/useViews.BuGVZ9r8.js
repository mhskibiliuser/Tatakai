const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/index.C6yfkT5T.js","assets/react-vendor.CAo4XUiA.js","assets/vendor.CJyRs4QS.js","assets/tanstack.DPr3OB19.js","assets/supabase.WuRMX5Dg.js","assets/radix.BiK9uYXL.js","assets/icons.C2gBBarQ.js","assets/motion.DVGLRFCH.js","assets/hls.BlgtCWcq.js","assets/editor.Dxw8dtyw.js","assets/charts.Dr1fgDJ-.js","assets/index.CWbmAlRn.css"])))=>i.map(i=>d[i]);
import { b9 as __vitePreload } from "./vendor.CJyRs4QS.js";
import { a as useQuery, u as useQueryClient, b as useMutation } from "./tanstack.DPr3OB19.js";
import { u as useAuth, a2 as supabase } from "./index.C6yfkT5T.js";
import { r as reactExports } from "./react-vendor.CAo4XUiA.js";
function getSessionId() {
  let sessionId = sessionStorage.getItem("anime_session_id");
  if (!sessionId) {
    sessionId = crypto.randomUUID();
    sessionStorage.setItem("anime_session_id", sessionId);
  }
  return sessionId;
}
function isUsableAnimeId(value) {
  if (!value) return false;
  if (/^[a-z][a-z0-9+.-]*:\/\//i.test(value) || value.startsWith("//")) return false;
  return value.length <= 200;
}
function useAnimeViewCount(animeId) {
  return useQuery({
    queryKey: ["viewCount", animeId],
    queryFn: async () => {
      if (!animeId) return 0;
      try {
        const { data, error } = await supabase.from("anime_view_counts").select("total_views").eq("anime_id", animeId).maybeSingle();
        if (error && error.code !== "PGRST116") {
          if (error.code === "42P01") return 0;
          console.error("Error fetching view count:", error);
        }
        return (data == null ? void 0 : data.total_views) || 0;
      } catch {
        return 0;
      }
    },
    enabled: !!animeId && isUsableAnimeId(animeId),
    staleTime: 6e4
    // 1 minute
  });
}
function useTrendingAnime(limit = 20, window = "week") {
  return useQuery({
    queryKey: ["trending", limit, window],
    queryFn: async () => {
      try {
        const { data, error } = await supabase.rpc("get_trending_anime", { p_limit: limit, p_window: window });
        if (error) {
          if (error.code === "42883") return [];
          const { logger } = await __vitePreload(async () => {
            const { logger: logger2 } = await import("./index.C6yfkT5T.js").then((n) => n.ho);
            return { logger: logger2 };
          }, true ? __vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11]) : void 0);
          void logger.error("Error fetching trending:", error);
          return [];
        }
        return data || [];
      } catch (e) {
        const { logger } = await __vitePreload(async () => {
          const { logger: logger2 } = await import("./index.C6yfkT5T.js").then((n) => n.ho);
          return { logger: logger2 };
        }, true ? __vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11]) : void 0);
        void logger.error("Exception fetching trending:", e);
        return [];
      }
    },
    staleTime: 3e5
    // 5 minutes
  });
}
function useRecordView() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      animeId,
      episodeId,
      watchDuration = 0
    }) => {
      const sessionId = getSessionId();
      try {
        const { error } = await supabase.rpc("record_anime_view", {
          p_anime_id: animeId,
          p_episode_id: episodeId,
          p_user_id: (user == null ? void 0 : user.id) || null,
          p_session_id: sessionId,
          p_watch_duration: watchDuration
        });
        if (error) {
          if (error.code === "42883") return;
          console.error("Error recording view:", error);
          throw error;
        }
      } catch (e) {
        console.log("View tracking not available yet");
      }
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["viewCount", variables.animeId] });
      queryClient.invalidateQueries({ queryKey: ["trending"] });
    }
  });
}
function useViewTracker(animeId, episodeId) {
  const recordView = useRecordView();
  const startTimeRef = reactExports.useRef(null);
  const recordedRef = reactExports.useRef(false);
  reactExports.useEffect(() => {
    if (!animeId || !episodeId) return;
    startTimeRef.current = Date.now();
    recordedRef.current = false;
    const initialViewTimer = setTimeout(() => {
      if (!recordedRef.current) {
        recordView.mutate({ animeId, episodeId, watchDuration: 10 });
        recordedRef.current = true;
      }
    }, 1e4);
    return () => {
      clearTimeout(initialViewTimer);
      if (startTimeRef.current && recordedRef.current) {
        const duration = Math.floor((Date.now() - startTimeRef.current) / 1e3);
        if (duration > 10) {
          recordView.mutate({ animeId, episodeId, watchDuration: duration });
        }
      }
    };
  }, [animeId, episodeId]);
  const updateDuration = reactExports.useCallback(() => {
    if (!animeId || !episodeId || !startTimeRef.current) return;
    const duration = Math.floor((Date.now() - startTimeRef.current) / 1e3);
    recordView.mutate({ animeId, episodeId, watchDuration: duration });
  }, [animeId, episodeId, recordView]);
  return { updateDuration };
}
function formatViewCount(count) {
  if (count >= 1e6) {
    return `${(count / 1e6).toFixed(1)}M`;
  } else if (count >= 1e3) {
    return `${(count / 1e3).toFixed(1)}K`;
  }
  return count.toString();
}
export {
  useAnimeViewCount as a,
  useViewTracker as b,
  formatViewCount as f,
  useTrendingAnime as u
};
