import { i as useParams, e as useNavigate, r as reactExports, j as jsxRuntimeExports } from "./react-vendor.CAo4XUiA.js";
import { K as useIsDesktopApp, U as useIsMobileApp, u as useAuth, J as useConfirm, e9 as useWatchRoom, ea as useRoomParticipants, eb as useRoomMessages, ec as useRoomQueue, ed as useActiveRoomPoll, ct as useEpisodes, ee as useJoinRoom, ef as useHostSelfJoin, eg as useLeaveRoom, eh as useSendMessage, ei as useAddQueueItem, ej as useRemoveQueueItem, ek as useReorderQueueItems, el as useCreateRoomPoll, em as useVoteRoomPoll, en as useCloseRoomPoll, eo as useUpdatePlayback, ep as useCloseRoom, eq as useUpdateRoom, er as useUpdateParticipantReady, es as useAdminDeleteRoom, cs as useAnimeInfo, et as clearActivity, eu as setActivity, a2 as supabase, I as contentGraph, a_ as toAnimeCard, ae as Dialog, af as DialogContent, ag as DialogHeader, ah as DialogTitle, az as Input, aC as ScrollArea, B as Button, j as cn, l as getProxiedImageUrl, a8 as Avatar, a9 as AvatarImage, aa as AvatarFallback, ev as Poll, bq as Tabs, br as TabsList, bs as TabsTrigger, bu as TabsContent, a4 as Sheet, a5 as SheetContent, a6 as SheetHeader, a7 as SheetTitle, aV as Select, aW as SelectTrigger, aX as SelectValue, aY as SelectContent, aZ as SelectItem, ew as DialogFooter, Q as Background, S as Sidebar } from "./index.C6yfkT5T.js";
import { u as useQueryClient } from "./tanstack.DPr3OB19.js";
import { u as useCombinedSourcesWithRefetch } from "./useCombinedSources.OYGj822D.js";
import { bf as ue } from "./vendor.CJyRs4QS.js";
import { u as useReducedMotion, A as AnimatePresence, m as motion } from "./motion.DVGLRFCH.js";
import { M as MobileNav } from "./MobileNav.ABHzkhTQ.js";
import { u as useDebounce } from "./useDebounce.DLNDL8OB.js";
import { S as Skeleton } from "./skeleton-custom.3olGZrgu.js";
import { u as ArrowLeft, Z as Film, S as Search, Q as LoaderCircle, k as Sparkles, x as CirclePlay, aJ as Play, n as Radio, c as Check, q as Copy, ca as ChartColumn, cb as CloudDownload, i as Settings, X, ah as LogOut, J as Trash2, y as MessageSquare, U as Users, aD as Clock, b6 as Timer, T as TriangleAlert, aT as Zap, aw as Smile, cj as Send, bR as ListOrdered, o as ArrowUp, A as ArrowDown, P as Plus, c3 as Crown, l as Magnet, cK as CircleArrowUp, cL as CircleArrowDown, b2 as Captions, t as HardDrive, Y as FolderOpen, a6 as Lock, aE as ListChecks, cM as MonitorOff } from "./icons.C2gBBarQ.js";
import { E as EmbedPlayer, V as VideoPlayer } from "./EmbedPlayer.BH04tPBk.js";
import { a as getFriendlyServerName } from "./serverNames.D82Wgje2.js";
import "./supabase.WuRMX5Dg.js";
import "./radix.BiK9uYXL.js";
import "./hls.BlgtCWcq.js";
import "./editor.Dxw8dtyw.js";
import "./charts.Dr1fgDJ-.js";
import "./subtitle-utils.B2k2Dirm.js";
import "./useDownload.DEAa3Keh.js";
import "./autoDownloadNext.BiTHv2Cb.js";
const ISSHONI_ACCENT$1 = "327 82% 60%";
const isshoniAccentStyle = {
  "--isshoni-accent": ISSHONI_ACCENT$1
};
const POLL_DURATION = {
  days: Array.from({ length: 8 }, (_, i) => i),
  hours: Array.from({ length: 24 }, (_, i) => i),
  minutes: Array.from({ length: 60 }, (_, i) => i)
};
function getLanguageRank(label) {
  const lowerLabel = label.toLowerCase();
  if (lowerLabel.includes("sub")) return 0;
  if (lowerLabel.includes("dub")) return 1;
  return 2;
}
function groupProviderServers(providerServers = []) {
  const torrents = [];
  const langMap = /* @__PURE__ */ new Map();
  for (const server of providerServers) {
    if (server.sourceType === "torrent" || server.isTorrent) {
      torrents.push(server);
      continue;
    }
    const raw = String(server.languageLabel || server.audioLanguage || server.language || "").trim();
    const isDub = Boolean(server.isDub) || /dub/i.test(raw);
    let label = isDub ? "Dubbed" : "Subtitled";
    if (raw) {
      label = raw.charAt(0).toUpperCase() + raw.slice(1);
    }
    if (!langMap.has(label)) {
      langMap.set(label, []);
    }
    langMap.get(label).push(server);
  }
  const languages = Array.from(langMap.entries()).map(([label, servers]) => ({ label, servers })).sort((a, b) => getLanguageRank(a.label) - getLanguageRank(b.label) || a.label.localeCompare(b.label));
  return {
    languages,
    torrents,
    all: languages.flatMap((group) => group.servers)
  };
}
function useWatchRoomController() {
  var _a, _b, _c, _d, _e;
  const { roomId } = useParams();
  const navigate = useNavigate();
  const isDesktopApp = useIsDesktopApp();
  const isMobileApp = useIsMobileApp();
  const prefersReducedMotion = useReducedMotion();
  const { user, isModerator, isAdmin } = useAuth();
  const queryClient = useQueryClient();
  const confirm = useConfirm();
  const joinedFlagKey = roomId ? `watch-room-joined-${roomId}` : null;
  const [message, setMessage] = reactExports.useState("");
  const [password, setPassword] = reactExports.useState("");
  const [showPasswordDialog, setShowPasswordDialog] = reactExports.useState(false);
  const [copied, setCopied] = reactExports.useState(false);
  const [selectedServer, setSelectedServer] = reactExports.useState("hd-1");
  const [triedServers, setTriedServers] = reactExports.useState(/* @__PURE__ */ new Set(["hd-1"]));
  const [showSettings, setShowSettings] = reactExports.useState(false);
  const [showAnimeSearch, setShowAnimeSearch] = reactExports.useState(false);
  const [animeSearchMode, setAnimeSearchMode] = reactExports.useState("change-room");
  const [drift, setDrift] = reactExports.useState(0);
  const [countdown, setCountdown] = reactExports.useState(null);
  const [isEditingCustomTimer, setIsEditingCustomTimer] = reactExports.useState(false);
  const [customTimerMinutes, setCustomTimerMinutes] = reactExports.useState("10");
  const [isReconnecting, setIsReconnecting] = reactExports.useState(false);
  const [hostTransferTarget, setHostTransferTarget] = reactExports.useState(null);
  const [pollQuestion, setPollQuestion] = reactExports.useState("");
  const [showPollDialog, setShowPollDialog] = reactExports.useState(false);
  const [pollChoices, setPollChoices] = reactExports.useState(["", ""]);
  const [pollDuration, setPollDuration] = reactExports.useState({ days: 0, hours: 0, minutes: 5 });
  const [sideTab, setSideTab] = reactExports.useState("chat");
  const [showDrawer, setShowDrawer] = reactExports.useState(
    () => typeof window !== "undefined" && window.innerWidth >= 1024
  );
  const [localShare, setLocalShare] = reactExports.useState(null);
  const [showLibraryPicker, setShowLibraryPicker] = reactExports.useState(false);
  const [library, setLibrary] = reactExports.useState([]);
  const [loadingLibrary, setLoadingLibrary] = reactExports.useState(false);
  const [publishingLocal, setPublishingLocal] = reactExports.useState(false);
  const [selectedLibrarySeries, setSelectedLibrarySeries] = reactExports.useState(null);
  const messagesEndRef = reactExports.useRef(null);
  const playerRef = reactExports.useRef(null);
  const lastUpdateRef = reactExports.useRef(0);
  const countdownIntervalRef = reactExports.useRef(null);
  const reconnectAttemptRef = reactExports.useRef(0);
  const hasAutoJoinRef = reactExports.useRef(false);
  const hostJoinRef = reactExports.useRef(false);
  const presenceIntervalRef = reactExports.useRef(null);
  const { data: room, isLoading: loadingRoom } = useWatchRoom(roomId);
  const { data: participants = [] } = useRoomParticipants(roomId);
  const { data: messages = [], refetch: refetchMessages } = useRoomMessages(roomId);
  const { data: queueItems = [] } = useRoomQueue(roomId);
  const { data: activePoll } = useActiveRoomPoll(roomId);
  const { data: episodesData, isLoading: loadingEpisodes } = useEpisodes(room == null ? void 0 : room.anime_id);
  const isHost = (room == null ? void 0 : room.host_id) === (user == null ? void 0 : user.id);
  const isParticipant = participants.some((p) => p.user_id === (user == null ? void 0 : user.id));
  const isParticipantReady = (_a = participants.find((p) => p.user_id === (user == null ? void 0 : user.id))) == null ? void 0 : _a.is_ready;
  const currentEpisodeId = (room == null ? void 0 : room.episode_id) || ((_b = episodesData == null ? void 0 : episodesData.episodes[0]) == null ? void 0 : _b.episodeId);
  const selectedCategory = (room == null ? void 0 : room.category) || "sub";
  const setSelectedCategory = (cat) => {
    if (isHost && roomId) {
      updateRoom.mutate({ roomId, updates: { category: cat } });
    }
  };
  const joinRoom = useJoinRoom();
  const hostSelfJoin = useHostSelfJoin();
  const leaveRoom = useLeaveRoom();
  const sendMessage = useSendMessage();
  const addQueueItem = useAddQueueItem();
  const removeQueueItem = useRemoveQueueItem();
  const reorderQueueItems = useReorderQueueItems();
  const createRoomPoll = useCreateRoomPoll();
  const voteRoomPoll = useVoteRoomPoll();
  const closeRoomPoll = useCloseRoomPoll();
  const updatePlayback = useUpdatePlayback();
  const closeRoom = useCloseRoom();
  const updateRoom = useUpdateRoom();
  const updateParticipantReady = useUpdateParticipantReady();
  const adminDeleteRoom = useAdminDeleteRoom();
  reactExports.useEffect(() => {
    if (!roomId || !room || !user || !joinedFlagKey) return;
    if (room.access_type === "password") return;
    if (isParticipant || joinRoom.isPending || hasAutoJoinRef.current) return;
    const shouldRecover = localStorage.getItem(joinedFlagKey) === "1";
    if (!shouldRecover) return;
    hasAutoJoinRef.current = true;
    setIsReconnecting(true);
    joinRoom.mutate(
      { roomId },
      {
        onSuccess: () => {
          reconnectAttemptRef.current += 1;
          ue.success("Reconnected to room");
        },
        onError: () => {
          hasAutoJoinRef.current = false;
        },
        onSettled: () => {
          setIsReconnecting(false);
        }
      }
    );
  }, [roomId, room, user, joinedFlagKey, isParticipant, joinRoom]);
  reactExports.useEffect(() => {
    if (!roomId || !room || !user || !isHost) return;
    if (isParticipant || hostSelfJoin.isPending || hostJoinRef.current) return;
    hostJoinRef.current = true;
    hostSelfJoin.mutate(roomId, {
      onError: () => {
      }
    });
  }, [roomId, room, user, isHost, isParticipant, hostSelfJoin]);
  reactExports.useEffect(() => {
    if (!roomId || !user || !isParticipant) {
      if (presenceIntervalRef.current) {
        clearInterval(presenceIntervalRef.current);
        presenceIntervalRef.current = null;
      }
      return;
    }
    const heartbeat = async () => {
      await supabase.from("watch_room_participants").update({
        last_seen_at: (/* @__PURE__ */ new Date()).toISOString(),
        is_host: !!isHost
      }).eq("room_id", roomId).eq("user_id", user.id);
    };
    heartbeat();
    presenceIntervalRef.current = setInterval(heartbeat, 25e3);
    return () => {
      if (presenceIntervalRef.current) {
        clearInterval(presenceIntervalRef.current);
        presenceIntervalRef.current = null;
      }
    };
  }, [roomId, user, isParticipant, isHost]);
  reactExports.useEffect(() => {
    if (!joinedFlagKey) return;
    if (isParticipant) {
      localStorage.setItem(joinedFlagKey, "1");
    }
  }, [isParticipant, joinedFlagKey]);
  const { data: animeInfo, isLoading: loadingAnimeInfo } = useAnimeInfo(
    (room == null ? void 0 : room.anime_id) && room.anime_id !== "custom" ? room.anime_id : void 0
  );
  const roomIdAnilist = (() => {
    const raw = String((room == null ? void 0 : room.anime_id) ?? "").trim();
    const m = raw.match(/^anilist[:_-]?(\d+)$/i) || raw.match(/^(\d+)$/);
    return (m == null ? void 0 : m[1]) ? Number(m[1]) : null;
  })();
  const roomIdMal = (() => {
    const raw = String((room == null ? void 0 : room.anime_id) ?? "").trim();
    const m = raw.match(/^mal[:_-]?(\d+)$/i);
    return (m == null ? void 0 : m[1]) ? Number(m[1]) : null;
  })();
  const anilistId = (animeInfo == null ? void 0 : animeInfo.anilistID) || ((_c = animeInfo == null ? void 0 : animeInfo.moreInfo) == null ? void 0 : _c.anilistId) || roomIdAnilist || null;
  const malId = (animeInfo == null ? void 0 : animeInfo.malID) || ((_d = animeInfo == null ? void 0 : animeInfo.moreInfo) == null ? void 0 : _d.malId) || roomIdMal || null;
  const animeName = ((_e = animeInfo == null ? void 0 : animeInfo.info) == null ? void 0 : _e.name) || (animeInfo == null ? void 0 : animeInfo.titleEnglish) || (animeInfo == null ? void 0 : animeInfo.titleRomaji) || (room == null ? void 0 : room.anime_title) || void 0;
  reactExports.useEffect(() => {
    if (!roomId || !room) {
      clearActivity("watchroom");
      return;
    }
    const count = participants.length || room.participant_count || 0;
    setActivity("watchroom", {
      kind: isHost ? "streaming" : "watching",
      label: animeName || room.anime_title || "Watch room",
      detail: count > 0 ? `${count} in room` : void 0
    });
    return () => clearActivity("watchroom");
  }, [roomId, room, isHost, animeName, participants.length]);
  const streamGateEpisodeId = currentEpisodeId || (anilistId ? `al:${anilistId}:${(room == null ? void 0 : room.episode_number) || 1}` : void 0) || (animeName ? `nm:${animeName}:${(room == null ? void 0 : room.episode_number) || 1}` : void 0);
  const isCustomRoom = (room == null ? void 0 : room.anime_id) === "custom";
  const isViewerOnShare = !isHost && !!(room == null ? void 0 : room.share_active) && !!(room == null ? void 0 : room.share_stream_url);
  const {
    data: resolvedSources,
    isLoading: loadingResolved,
    refetch: refetchSources,
    diagnostics: sourceDiagnostics
  } = useCombinedSourcesWithRefetch(
    isHost && !isCustomRoom ? streamGateEpisodeId : void 0,
    animeName,
    (room == null ? void 0 : room.episode_number) || 1,
    selectedServer,
    selectedCategory,
    user == null ? void 0 : user.id,
    anilistId,
    malId
  );
  const customStreamingData = reactExports.useMemo(() => {
    if (!isCustomRoom || !(room == null ? void 0 : room.episode_id)) return null;
    const url = room.episode_id;
    return {
      sources: [{
        url,
        isM3U8: url.includes(".m3u8"),
        isEmbed: !url.includes(".m3u8") && !url.includes(".mp4") && !url.includes(".webm"),
        quality: "default"
      }],
      headers: { Referer: window.location.origin, "User-Agent": navigator.userAgent },
      subtitles: [],
      intro: null,
      outro: null,
      tracks: [],
      providerServers: []
    };
  }, [isCustomRoom, room == null ? void 0 : room.episode_id]);
  const viewerStreamingData = reactExports.useMemo(() => {
    if (!isViewerOnShare || !(room == null ? void 0 : room.share_stream_url)) return null;
    const url = room.share_stream_url;
    return {
      sources: [{
        url,
        isM3U8: room.share_stream_type === "hls" || url.includes(".m3u8"),
        isEmbed: false,
        quality: "auto"
      }],
      headers: {},
      subtitles: room.share_subtitle_url ? [{ lang: "Default", url: room.share_subtitle_url, label: "Subtitles" }] : [],
      tracks: [],
      intro: null,
      outro: null,
      providerServers: []
    };
  }, [isViewerOnShare, room == null ? void 0 : room.share_stream_url, room == null ? void 0 : room.share_stream_type, room == null ? void 0 : room.share_subtitle_url]);
  const localShareData = reactExports.useMemo(() => {
    if (!(localShare == null ? void 0 : localShare.localStreamUrl)) return null;
    const url = localShare.localStreamUrl;
    return {
      sources: [{ url, isM3U8: false, isEmbed: false, quality: "local" }],
      headers: {},
      subtitles: [],
      intro: null,
      outro: null,
      tracks: [],
      providerServers: []
    };
  }, [localShare == null ? void 0 : localShare.localStreamUrl]);
  const streamingData = isCustomRoom ? customStreamingData : isViewerOnShare ? viewerStreamingData : isHost && localShareData ? localShareData : resolvedSources;
  const loadingSources = isHost && !isCustomRoom ? loadingResolved || loadingAnimeInfo || loadingEpisodes : false;
  const serversData = reactExports.useMemo(
    () => groupProviderServers((streamingData == null ? void 0 : streamingData.providerServers) || []),
    [streamingData == null ? void 0 : streamingData.providerServers]
  );
  const publishTokenRef = reactExports.useRef("");
  reactExports.useEffect(() => {
    if (!isHost || !roomId) return;
    if (isCustomRoom) return;
    if (localShare) return;
    const rt = window.tatakaiRuntime;
    if (!isDesktopApp || !(rt == null ? void 0 : rt.publishShareSource)) return;
    const primary = ((resolvedSources == null ? void 0 : resolvedSources.sources) || []).find((s) => !s.isEmbed);
    if (!(primary == null ? void 0 : primary.url)) return;
    const subUrl = (() => {
      const all = [...(resolvedSources == null ? void 0 : resolvedSources.subtitles) || [], ...(resolvedSources == null ? void 0 : resolvedSources.tracks) || []];
      const def = all.find((s) => /eng/i.test((s == null ? void 0 : s.lang) || (s == null ? void 0 : s.label) || "")) || all[0];
      return (def == null ? void 0 : def.url) || "";
    })();
    const token = `${currentEpisodeId}|${selectedServer}|${selectedCategory}|${primary.url}`;
    if (publishTokenRef.current === token) return;
    publishTokenRef.current = token;
    (async () => {
      var _a2, _b2;
      const loadingId = ue.loading("Preparing watch party stream…");
      try {
        const res = await rt.publishShareSource({
          streamUrl: primary.url,
          headers: (resolvedSources == null ? void 0 : resolvedSources.headers) || {},
          subtitleUrl: subUrl || void 0,
          streamType: primary.isM3U8 ? "hls" : "direct"
        });
        if (res == null ? void 0 : res.shareStreamUrl) {
          updateRoom.mutate({
            roomId,
            updates: {
              share_stream_url: res.shareStreamUrl,
              share_stream_type: res.shareStreamType || (primary.isM3U8 ? "hls" : "direct"),
              share_subtitle_url: res.shareSubtitleUrl || null,
              share_active: true,
              share_host_platform: "desktop"
            }
          });
          ue.success("Watch party stream is live", { id: loadingId });
        } else if (res == null ? void 0 : res.error) {
          publishTokenRef.current = "";
          const needsCloudflared = ((_a2 = res.status) == null ? void 0 : _a2.installState) === "failed" || ((_b2 = res.status) == null ? void 0 : _b2.binaryResolved) === false;
          if (needsCloudflared) {
            ue.error("cloudflared is required to host a watch party", {
              id: loadingId,
              description: "Couldn't install it automatically (you may be offline). Download cloudflared, add it to your PATH, then reopen the room.",
              duration: 15e3,
              action: {
                label: "Download",
                onClick: () => {
                  var _a3, _b3;
                  return (_b3 = (_a3 = window.electron) == null ? void 0 : _a3.openExternal) == null ? void 0 : _b3.call(
                    _a3,
                    "https://github.com/cloudflare/cloudflared/releases/latest"
                  );
                }
              }
            });
          } else {
            ue.error(`Watch party stream failed: ${res.error}`, { id: loadingId });
          }
        } else {
          ue.dismiss(loadingId);
        }
      } catch (err) {
        publishTokenRef.current = "";
        ue.error(`Watch party stream failed: ${(err == null ? void 0 : err.message) || err}`, { id: loadingId });
      }
    })();
  }, [isHost, isDesktopApp, roomId, isCustomRoom, localShare, resolvedSources, currentEpisodeId, selectedServer, selectedCategory]);
  const mobilePublishTokenRef = reactExports.useRef("");
  reactExports.useEffect(() => {
    if (!isHost || !roomId || !isMobileApp) return;
    if (isCustomRoom) return;
    const primary = ((resolvedSources == null ? void 0 : resolvedSources.sources) || []).find((s) => !s.isEmbed);
    if (!(primary == null ? void 0 : primary.url)) return;
    const subUrl = (() => {
      const all = [...(resolvedSources == null ? void 0 : resolvedSources.subtitles) || [], ...(resolvedSources == null ? void 0 : resolvedSources.tracks) || []];
      const def = all.find((s) => /eng/i.test((s == null ? void 0 : s.lang) || (s == null ? void 0 : s.label) || "")) || all[0];
      return (def == null ? void 0 : def.url) || "";
    })();
    const token = `${currentEpisodeId}|${selectedServer}|${selectedCategory}|${primary.url}`;
    if (mobilePublishTokenRef.current === token) return;
    mobilePublishTokenRef.current = token;
    updateRoom.mutate({
      roomId,
      updates: {
        share_stream_url: primary.url,
        share_stream_type: primary.isM3U8 ? "hls" : "direct",
        share_subtitle_url: subUrl || null,
        share_active: true,
        share_host_platform: "mobile"
      }
    });
  }, [isHost, isMobileApp, roomId, isCustomRoom, resolvedSources, currentEpisodeId, selectedServer, selectedCategory]);
  reactExports.useEffect(() => {
    if (!isHost) return;
    return () => {
      var _a2;
      const rt = window.tatakaiRuntime;
      try {
        (_a2 = rt == null ? void 0 : rt.stopShareTunnel) == null ? void 0 : _a2.call(rt);
      } catch (_) {
      }
      if (roomId) {
        updateRoom.mutate({ roomId, updates: { share_active: false } });
      }
    };
  }, [isHost, roomId]);
  const handlePlayerError = reactExports.useCallback(() => {
    if (localShare) return;
    if (!serversData || !isHost) return;
    const allServers = serversData.all || [];
    const nextServer = allServers.find((s) => !triedServers.has(s.serverName));
    if (nextServer) {
      ue.info(`Switching server to ${nextServer.serverName}...`);
      setTriedServers((prev) => /* @__PURE__ */ new Set([...prev, nextServer.serverName]));
      setSelectedServer(nextServer.serverName);
    } else {
      ue.error("No working servers found. Try another episode.");
    }
  }, [serversData, isHost, triedServers, localShare]);
  const publishLocalFile = reactExports.useCallback(async (filePath, label) => {
    var _a2, _b2;
    if (!roomId) return;
    const rt = window.tatakaiRuntime;
    if (!isDesktopApp || !(rt == null ? void 0 : rt.publishLocalFile)) {
      ue.error("Streaming a local file needs the desktop app");
      return;
    }
    setPublishingLocal(true);
    const loadingId = ue.loading("Preparing your file for the watch party…");
    try {
      const res = await rt.publishLocalFile({ path: filePath });
      if ((res == null ? void 0 : res.shareStreamUrl) && (res == null ? void 0 : res.localStreamUrl)) {
        publishTokenRef.current = "";
        setLocalShare({
          shareStreamUrl: res.shareStreamUrl,
          localStreamUrl: res.localStreamUrl,
          fileName: res.fileName || label
        });
        await updateRoom.mutateAsync({
          roomId,
          updates: {
            share_stream_url: res.shareStreamUrl,
            share_stream_type: "direct",
            share_subtitle_url: null,
            share_active: true,
            share_host_platform: "desktop"
          }
        });
        ue.success(`Now streaming ${res.fileName || label || "your file"}`, { id: loadingId });
        setShowLibraryPicker(false);
      } else if (res == null ? void 0 : res.error) {
        const needsCloudflared = ((_a2 = res.status) == null ? void 0 : _a2.installState) === "failed" || ((_b2 = res.status) == null ? void 0 : _b2.binaryResolved) === false;
        if (needsCloudflared) {
          ue.error("cloudflared is required to host a watch party", {
            id: loadingId,
            description: "Couldn't install it automatically (you may be offline). Download cloudflared, add it to your PATH, then try again.",
            duration: 15e3,
            action: {
              label: "Download",
              onClick: () => {
                var _a3, _b3;
                return (_b3 = (_a3 = window.electron) == null ? void 0 : _a3.openExternal) == null ? void 0 : _b3.call(
                  _a3,
                  "https://github.com/cloudflare/cloudflared/releases/latest"
                );
              }
            }
          });
        } else {
          ue.error(`Couldn't stream that file: ${res.error}`, { id: loadingId });
        }
      } else {
        ue.dismiss(loadingId);
      }
    } catch (err) {
      ue.error(`Couldn't stream that file: ${(err == null ? void 0 : err.message) || err}`, { id: loadingId });
    } finally {
      setPublishingLocal(false);
    }
  }, [roomId, isDesktopApp, updateRoom]);
  const handlePickLocalFile = reactExports.useCallback(async () => {
    const electron = window.electron;
    if (!(electron == null ? void 0 : electron.selectFile)) {
      ue.error("File picking needs the desktop app");
      return;
    }
    try {
      const filePath = await electron.selectFile({
        title: "Choose a video to stream",
        filters: [
          { name: "Video", extensions: ["mp4", "m4v", "webm", "mkv", "mov", "avi", "ogv", "ogg", "ts"] },
          { name: "All Files", extensions: ["*"] }
        ]
      });
      if (filePath) await publishLocalFile(String(filePath));
    } catch (err) {
      ue.error(`Couldn't open the file picker: ${(err == null ? void 0 : err.message) || err}`);
    }
  }, [publishLocalFile]);
  const openLibraryPicker = reactExports.useCallback(async () => {
    const electron = window.electron;
    if (!(electron == null ? void 0 : electron.getOfflineLibrary)) {
      ue.error("The offline library needs the desktop app");
      return;
    }
    setShowLibraryPicker(true);
    setLoadingLibrary(true);
    setSelectedLibrarySeries(null);
    try {
      const lib = await electron.getOfflineLibrary();
      setLibrary(Array.isArray(lib) ? lib : []);
    } catch (err) {
      ue.error(`Couldn't read your library: ${(err == null ? void 0 : err.message) || err}`);
      setLibrary([]);
    } finally {
      setLoadingLibrary(false);
    }
  }, []);
  const clearLocalShare = reactExports.useCallback(() => {
    var _a2;
    setLocalShare(null);
    publishTokenRef.current = "";
    if (roomId) {
      updateRoom.mutate({ roomId, updates: { share_active: false } });
    }
    const rt = window.tatakaiRuntime;
    try {
      (_a2 = rt == null ? void 0 : rt.stopShareTunnel) == null ? void 0 : _a2.call(rt);
    } catch (_) {
    }
  }, [roomId, updateRoom]);
  reactExports.useEffect(() => {
    if (isHost && (room == null ? void 0 : room.anime_id) && room.anime_id !== "custom" && !room.episode_id && (episodesData == null ? void 0 : episodesData.episodes[0])) {
      updateRoom.mutate({
        roomId,
        updates: {
          episode_id: episodesData.episodes[0].episodeId,
          episode_number: episodesData.episodes[0].number
        }
      });
    }
  }, [isHost, room == null ? void 0 : room.anime_id, room == null ? void 0 : room.episode_id, episodesData]);
  reactExports.useEffect(() => {
    if (currentEpisodeId) {
      setSelectedServer("hd-1");
      setTriedServers(/* @__PURE__ */ new Set(["hd-1"]));
    }
  }, [currentEpisodeId]);
  reactExports.useEffect(() => {
    if (isHost || !playerRef.current || !room || room.scheduled_start_at) return;
    const video = playerRef.current;
    if (!room.is_playing) {
      if (!video.paused) video.pause();
      if (video.playbackRate !== 1) video.playbackRate = 1;
      const currentDrift2 = Math.abs(video.currentTime - room.current_time_seconds);
      setDrift(currentDrift2);
      if (currentDrift2 > 2) video.currentTime = room.current_time_seconds;
      return;
    }
    const now = Date.now();
    const updatedAt = new Date(room.updated_at).getTime();
    const elapsedSinceUpdate = (now - updatedAt) / 1e3;
    const liveHostTime = room.current_time_seconds + Math.max(0, elapsedSinceUpdate);
    if (video.paused) video.play().catch(() => {
    });
    const signedDrift = liveHostTime - video.currentTime;
    const currentDrift = Math.abs(signedDrift);
    setDrift(currentDrift);
    if (currentDrift > 2.5) {
      video.currentTime = liveHostTime;
      video.playbackRate = 1;
      return;
    }
    if (currentDrift > 0.35) {
      const maxDelta = 0.08;
      const rateDelta = Math.min(maxDelta, currentDrift / 8);
      video.playbackRate = signedDrift > 0 ? 1 + rateDelta : 1 - rateDelta;
      return;
    }
    if (video.playbackRate !== 1) {
      video.playbackRate = 1;
    }
  }, [room == null ? void 0 : room.is_playing, room == null ? void 0 : room.current_time_seconds, room == null ? void 0 : room.updated_at, room == null ? void 0 : room.scheduled_start_at, isHost]);
  reactExports.useEffect(() => {
    var _a2, _b2;
    if (!roomId) return;
    try {
      const existing = (_b2 = (_a2 = supabase).getChannels) == null ? void 0 : _b2.call(_a2).find((c) => {
        var _a3;
        return (_a3 = c.topic) == null ? void 0 : _a3.endsWith(`room-${roomId}`);
      });
      if (existing) supabase.removeChannel(existing);
    } catch (e) {
    }
    const channel = supabase.channel(`room-${roomId}`).on("postgres_changes", { event: "*", schema: "public", table: "watch_room_messages", filter: `room_id=eq.${roomId}` }, () => refetchMessages()).on("postgres_changes", { event: "UPDATE", schema: "public", table: "watch_rooms", filter: `id=eq.${roomId}` }, () => {
      queryClient.invalidateQueries({ queryKey: ["watch-room", roomId] });
    }).on("postgres_changes", { event: "*", schema: "public", table: "watch_room_participants", filter: `room_id=eq.${roomId}` }, () => {
      queryClient.invalidateQueries({ queryKey: ["watch-room-participants", roomId] });
    }).on("postgres_changes", { event: "*", schema: "public", table: "watch_room_queue", filter: `room_id=eq.${roomId}` }, () => {
      queryClient.invalidateQueries({ queryKey: ["watch-room-queue", roomId] });
    }).on("postgres_changes", { event: "*", schema: "public", table: "watch_room_polls", filter: `room_id=eq.${roomId}` }, () => {
      queryClient.invalidateQueries({ queryKey: ["watch-room-active-poll", roomId] });
    }).on("postgres_changes", { event: "*", schema: "public", table: "watch_room_poll_votes", filter: `room_id=eq.${roomId}` }, () => {
      queryClient.invalidateQueries({ queryKey: ["watch-room-active-poll", roomId] });
    }).subscribe((status) => {
      if (status === "SUBSCRIBED") {
        setIsReconnecting(false);
        return;
      }
      if (status === "CHANNEL_ERROR" || status === "TIMED_OUT" || status === "CLOSED") {
        setIsReconnecting(true);
        queryClient.invalidateQueries({ queryKey: ["watch-room", roomId] });
        queryClient.invalidateQueries({ queryKey: ["watch-room-participants", roomId] });
        queryClient.invalidateQueries({ queryKey: ["watch-room-messages", roomId] });
        queryClient.invalidateQueries({ queryKey: ["watch-room-queue", roomId] });
        queryClient.invalidateQueries({ queryKey: ["watch-room-active-poll", roomId] });
      }
    });
    return () => {
      supabase.removeChannel(channel);
    };
  }, [roomId, refetchMessages, queryClient]);
  reactExports.useEffect(() => {
    var _a2;
    (_a2 = messagesEndRef.current) == null ? void 0 : _a2.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  reactExports.useEffect(() => {
    if (!(room == null ? void 0 : room.scheduled_start_at)) {
      setCountdown(null);
      if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
      return;
    }
    const updateCountdown = () => {
      const now = Date.now();
      const target = new Date(room.scheduled_start_at).getTime();
      const diff = Math.max(0, Math.floor((target - now) / 1e3));
      setCountdown(diff);
      if (diff <= 0) {
        if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
        if (isHost) {
          updatePlayback.mutate({ roomId, isPlaying: true });
          updateRoom.mutate({ roomId, updates: { scheduled_start_at: null } });
        }
      }
    };
    updateCountdown();
    countdownIntervalRef.current = setInterval(updateCountdown, 1e3);
    return () => {
      if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
    };
  }, [room == null ? void 0 : room.scheduled_start_at, isHost, roomId]);
  const handleStartTimer = (seconds) => {
    const scheduledTime = new Date(Date.now() + seconds * 1e3).toISOString();
    updateRoom.mutate({
      roomId,
      updates: { scheduled_start_at: scheduledTime, is_playing: false }
    });
    ue.info(`Starting in ${seconds} seconds...`);
  };
  const handleForceStart = () => {
    updateRoom.mutate({
      roomId,
      updates: { scheduled_start_at: null, is_playing: true }
    });
    ue.success("Broadcast started!");
  };
  const handleToggleReady = () => {
    updateParticipantReady.mutate({ roomId, isReady: !isParticipantReady });
  };
  const handleJoin = () => {
    if (!user) return navigate("/auth");
    if ((room == null ? void 0 : room.access_type) === "password") setShowPasswordDialog(true);
    else {
      joinRoom.mutate(
        { roomId },
        {
          onSuccess: () => {
            if (joinedFlagKey) localStorage.setItem(joinedFlagKey, "1");
            if (user == null ? void 0 : user.id) {
              sendMessage.mutate({ roomId, message: "joined the room.", messageType: "system" });
            }
          },
          onError: (err) => ue.error((err == null ? void 0 : err.message) || "Failed to join room")
        }
      );
    }
  };
  const handlePasswordJoin = () => {
    joinRoom.mutate({ roomId, password }, {
      onSuccess: () => {
        setShowPasswordDialog(false);
        setPassword("");
        if (joinedFlagKey) localStorage.setItem(joinedFlagKey, "1");
        if (user == null ? void 0 : user.id) {
          sendMessage.mutate({ roomId, message: "joined the room.", messageType: "system" });
        }
      },
      onError: (err) => ue.error(err.message || "Invalid password")
    });
  };
  const handleLeave = async () => {
    if (isHost && participants.length > 1) {
      const nextHost = participants.filter((p) => p.user_id !== (user == null ? void 0 : user.id)).sort((a, b) => new Date(b.last_seen_at).getTime() - new Date(a.last_seen_at).getTime())[0];
      if (nextHost) {
        await updateRoom.mutateAsync({ roomId, updates: { host_id: nextHost.user_id } });
        await supabase.from("watch_room_participants").update({ is_host: false }).eq("room_id", roomId).eq("user_id", user.id);
        await supabase.from("watch_room_participants").update({ is_host: true }).eq("room_id", roomId).eq("user_id", nextHost.user_id);
        await sendMessage.mutateAsync({ roomId, message: `Host left. ${nextHost.display_name} is now host.`, messageType: "system" });
      }
    }
    if (joinedFlagKey) localStorage.removeItem(joinedFlagKey);
    if (user == null ? void 0 : user.id) {
      sendMessage.mutate({ roomId, message: "left the room.", messageType: "system" });
    }
    leaveRoom.mutate(roomId, { onSuccess: () => navigate("/isshoni") });
  };
  const handleClose = async () => {
    if (await confirm({ title: "Close this room?" })) {
      if (joinedFlagKey) localStorage.removeItem(joinedFlagKey);
      closeRoom.mutate(roomId, { onSuccess: () => {
        ue.success("Room closed");
        navigate("/isshoni");
      } });
    }
  };
  const handleAdminDelete = async () => {
    if (!isAdmin || !roomId) return;
    if (!await confirm({
      title: "Force-delete this room?",
      description: "This permanently removes the room and all its messages, participants, queue, and polls. This cannot be undone."
    })) return;
    adminDeleteRoom.mutate(roomId, {
      onSuccess: () => {
        ue.success("Room deleted");
        navigate("/isshoni");
      },
      onError: (e) => ue.error((e == null ? void 0 : e.message) || "Failed to delete room")
    });
  };
  const handleCreatePollFromDialog = async () => {
    if (!isHost || !roomId) return;
    const normalizedQuestion = pollQuestion.trim();
    const normalizedOptions = pollChoices.map((c) => c.trim()).filter(Boolean);
    if (!normalizedQuestion) {
      ue.error("Add a poll question first");
      return;
    }
    if (normalizedOptions.length < 2) {
      ue.error("Add at least two poll options");
      return;
    }
    const totalMs = ((pollDuration.days * 24 + pollDuration.hours) * 60 + pollDuration.minutes) * 60 * 1e3;
    const endsAt = new Date(Date.now() + (totalMs > 0 ? totalMs : 5 * 60 * 1e3)).toISOString();
    try {
      await createRoomPoll.mutateAsync({ roomId, question: normalizedQuestion, options: normalizedOptions, endsAt });
      try {
        await sendMessage.mutateAsync({ roomId, message: `New poll: ${normalizedQuestion}`, messageType: "system" });
      } catch {
      }
      setPollQuestion("");
      setPollChoices(["", ""]);
      setPollDuration({ days: 0, hours: 0, minutes: 5 });
      setShowPollDialog(false);
      ue.success("Poll started");
    } catch (err) {
      ue.error((err == null ? void 0 : err.message) || "Failed to start poll");
    }
  };
  const handleSendMessage = (e) => {
    e.preventDefault();
    const text = message.trim();
    if (!text) return;
    setMessage("");
    sendMessage.mutate(
      { roomId, message: text },
      {
        onError: (err) => {
          setMessage(text);
          ue.error((err == null ? void 0 : err.message) || "Failed to send message");
        }
      }
    );
  };
  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2e3);
    ue.success("Link copied!");
  };
  const handleTransferHost = async (targetUserId, displayName) => {
    if (!isHost || !roomId || !user || targetUserId === user.id) return;
    if (!await confirm({ title: `Transfer host controls to ${displayName}?` })) return;
    setHostTransferTarget(targetUserId);
    try {
      await updateRoom.mutateAsync({
        roomId,
        updates: { host_id: targetUserId }
      });
      await supabase.from("watch_room_participants").update({ is_host: false }).eq("room_id", roomId).eq("user_id", user.id);
      await supabase.from("watch_room_participants").update({ is_host: true }).eq("room_id", roomId).eq("user_id", targetUserId);
      await sendMessage.mutateAsync({
        roomId,
        message: `${displayName} is now the host.`,
        messageType: "system"
      });
      ue.success(`Host transferred to ${displayName}`);
    } catch (error) {
      ue.error((error == null ? void 0 : error.message) || "Failed to transfer host");
    } finally {
      setHostTransferTarget(null);
    }
  };
  const handleExportChat = () => {
    if (!room) return;
    const lines = messages.map((entry) => {
      const timestamp = new Date(entry.created_at).toLocaleString();
      const prefix = entry.message_type === "system" ? "[SYSTEM]" : `[${entry.display_name}]`;
      return `${timestamp} ${prefix} ${entry.message}`;
    });
    const safeRoomName = room.name.replace(/[^a-z0-9-_]+/gi, "_").toLowerCase();
    const blob = new Blob([lines.join("\n")], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `${safeRoomName || "watch-room"}-chat-log.txt`;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    URL.revokeObjectURL(url);
    ue.success("Chat log exported");
  };
  const handleQueueCurrentEpisode = async () => {
    if (!isHost || !roomId || !(room == null ? void 0 : room.anime_id) || room.anime_id === "custom") return;
    try {
      await addQueueItem.mutateAsync({
        roomId,
        animeId: room.anime_id,
        animeTitle: room.anime_title || "Untitled Anime",
        animePoster: room.anime_poster,
        episodeId: room.episode_id,
        episodeNumber: room.episode_number,
        episodeTitle: room.episode_title
      });
      ue.success("Added current episode to queue");
    } catch (err) {
      ue.error(`Couldn't add to queue: ${(err == null ? void 0 : err.message) || err}`);
    }
  };
  const handleQueueAnimeFromSearch = () => {
    if (!isHost) return;
    setAnimeSearchMode("queue");
    setShowAnimeSearch(true);
  };
  const handlePlayQueueItem = async (queueItemId) => {
    if (!isHost || !roomId) return;
    const item = queueItems.find((q) => q.id === queueItemId);
    if (!item) return;
    await updateRoom.mutateAsync({
      roomId,
      updates: {
        anime_id: item.anime_id,
        anime_title: item.anime_title,
        anime_poster: item.anime_poster,
        episode_id: item.episode_id,
        episode_number: item.episode_number,
        episode_title: item.episode_title,
        current_time_seconds: 0,
        is_playing: false,
        scheduled_start_at: null
      }
    });
    await sendMessage.mutateAsync({
      roomId,
      message: `Now queued to play: ${item.anime_title}${item.episode_number ? ` • Episode ${item.episode_number}` : ""}`,
      messageType: "system"
    });
  };
  const handleMoveQueueItem = async (queueItemId, direction) => {
    if (!isHost || !roomId) return;
    const currentIndex = queueItems.findIndex((q) => q.id === queueItemId);
    if (currentIndex < 0) return;
    const targetIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1;
    if (targetIndex < 0 || targetIndex >= queueItems.length) return;
    const reordered = [...queueItems];
    const [item] = reordered.splice(currentIndex, 1);
    reordered.splice(targetIndex, 0, item);
    await reorderQueueItems.mutateAsync({
      roomId,
      queueItemIds: reordered.map((entry) => entry.id)
    });
  };
  const handleVotePoll = async (optionIndex) => {
    if (!activePoll || !roomId || !isParticipant) return;
    try {
      await voteRoomPoll.mutateAsync({
        roomId,
        pollId: activePoll.id,
        optionIndex
      });
    } catch (err) {
      ue.error((err == null ? void 0 : err.message) || "Failed to record your vote");
    }
  };
  const handleReaction = (emoji) => {
    if (!roomId || !isParticipant) return;
    sendMessage.mutate(
      {
        roomId,
        message: emoji,
        messageType: "reaction"
      },
      {
        onError: (err) => ue.error((err == null ? void 0 : err.message) || "Failed to send reaction")
      }
    );
  };
  const broadcastChip = (() => {
    if (!room) return { label: "Synced", live: false };
    if (isHost) {
      if (isCustomRoom || room.manual_stream_url) return { label: "Hosting · Custom", live: !!room.is_playing };
      if (!isDesktopApp) return { label: "Manual Mode", live: false };
      if (room.share_active) return { label: "Broadcasting", live: true };
      return { label: "Starting Broadcast", live: false };
    }
    if (isViewerOnShare) return { label: "Watching Host", live: !!room.is_playing };
    return { label: "Synced", live: false };
  })();
  const handleCloseAnimeSearch = reactExports.useCallback(() => {
    setShowAnimeSearch(false);
    setAnimeSearchMode("change-room");
  }, []);
  const handleAnimeSearchSelect = reactExports.useCallback(async (anime, ep) => {
    if (!roomId) return;
    if (animeSearchMode === "queue") {
      if (!isHost) return;
      try {
        await addQueueItem.mutateAsync({
          roomId,
          animeId: anime.id,
          animeTitle: anime.name,
          animePoster: anime.poster,
          episodeId: ep == null ? void 0 : ep.episodeId,
          episodeNumber: ep == null ? void 0 : ep.number,
          episodeTitle: ep == null ? void 0 : ep.title
        });
        ue.success(`Queued ${anime.name}${(ep == null ? void 0 : ep.number) ? ` • Episode ${ep.number}` : ""}`);
        setShowAnimeSearch(false);
        setAnimeSearchMode("change-room");
      } catch (err) {
        ue.error(`Couldn't add to queue: ${(err == null ? void 0 : err.message) || err}`);
      }
      return;
    }
    try {
      setSelectedServer("hd-1");
      setTriedServers(/* @__PURE__ */ new Set(["hd-1"]));
      publishTokenRef.current = "";
      setLocalShare(null);
      await updateRoom.mutateAsync({
        roomId,
        updates: {
          anime_id: anime.id,
          anime_title: anime.name,
          anime_poster: anime.poster,
          episode_id: (ep == null ? void 0 : ep.episodeId) || null,
          episode_number: (ep == null ? void 0 : ep.number) || null,
          episode_title: (ep == null ? void 0 : ep.title) || null,
          // Stop participants playing the previous stream until
          // the host resolves + republishes the new one.
          share_active: false
        }
      });
      ue.success(`Now playing ${anime.name}${(ep == null ? void 0 : ep.number) ? ` • Episode ${ep.number}` : ""}`);
      setShowAnimeSearch(false);
      setAnimeSearchMode("change-room");
    } catch (err) {
      ue.error(`Couldn't change the anime: ${(err == null ? void 0 : err.message) || err}`);
    }
  }, [roomId, animeSearchMode, isHost, addQueueItem, updateRoom]);
  return {
    // Core identity / navigation
    roomId,
    navigate,
    user,
    room,
    loadingRoom,
    prefersReducedMotion,
    // Role / connection flags
    isHost,
    isParticipant,
    isParticipantReady,
    isModerator,
    isAdmin,
    isDesktopApp,
    isCustomRoom,
    isViewerOnShare,
    isReconnecting,
    // Source resolution
    streamingData,
    serversData,
    loadingSources,
    selectedServer,
    setSelectedServer,
    selectedCategory,
    setSelectedCategory,
    currentEpisodeId,
    sourceDiagnostics,
    refetchSources,
    triedServers,
    setTriedServers,
    // Collections
    participants,
    messages,
    queueItems,
    activePoll,
    episodesData,
    // Player + status
    playerRef,
    lastUpdateRef,
    messagesEndRef,
    drift,
    broadcastChip,
    // UI state + setters
    message,
    setMessage,
    password,
    setPassword,
    showPasswordDialog,
    setShowPasswordDialog,
    copied,
    setCopied,
    showSettings,
    setShowSettings,
    showAnimeSearch,
    setShowAnimeSearch,
    animeSearchMode,
    setAnimeSearchMode,
    countdown,
    isEditingCustomTimer,
    setIsEditingCustomTimer,
    customTimerMinutes,
    setCustomTimerMinutes,
    hostTransferTarget,
    pollQuestion,
    setPollQuestion,
    showPollDialog,
    setShowPollDialog,
    pollChoices,
    setPollChoices,
    pollDuration,
    setPollDuration,
    sideTab,
    setSideTab,
    showDrawer,
    setShowDrawer,
    // Local-file share
    localShare,
    library,
    loadingLibrary,
    publishingLocal,
    selectedLibrarySeries,
    setSelectedLibrarySeries,
    showLibraryPicker,
    setShowLibraryPicker,
    // Handlers
    handleSendMessage,
    handleReaction,
    handleJoin,
    handlePasswordJoin,
    handleLeave,
    handleClose,
    handleAdminDelete,
    handleCopyLink,
    handleTransferHost,
    handleExportChat,
    handleStartTimer,
    handleForceStart,
    handleToggleReady,
    handleCreatePollFromDialog,
    handleVotePoll,
    handleQueueCurrentEpisode,
    handleQueueAnimeFromSearch,
    handlePlayQueueItem,
    handleMoveQueueItem,
    handlePickLocalFile,
    openLibraryPicker,
    publishLocalFile,
    clearLocalShare,
    handlePlayerError,
    handleAnimeSearchSelect,
    handleCloseAnimeSearch,
    // Mutations referenced directly in JSX (pending/inline states)
    updateRoom,
    updatePlayback,
    removeQueueItem,
    closeRoomPoll,
    createRoomPoll,
    voteRoomPoll,
    adminDeleteRoom,
    addQueueItem
  };
}
const WatchRoomContext = reactExports.createContext(null);
function WatchRoomProvider({ children }) {
  const controller = useWatchRoomController();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(WatchRoomContext.Provider, { value: controller, children });
}
function useWatchRoomContext() {
  const ctx = reactExports.useContext(WatchRoomContext);
  if (!ctx) {
    throw new Error("useWatchRoomContext must be used within a WatchRoomProvider");
  }
  return ctx;
}
const ISSHONI_ACCENT = "327 82% 60%";
function CustomVideoSourceModal({ isOpen, onClose, onSelect }) {
  const reduceMotion = useReducedMotion();
  const [searchQuery, setSearchQuery] = reactExports.useState("");
  const debouncedSearch = useDebounce(searchQuery, 400);
  const [results, setResults] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(false);
  const [selectedAnime, setSelectedAnime] = reactExports.useState(null);
  const { data: episodesData, isLoading: loadingEpisodes } = useEpisodes(selectedAnime == null ? void 0 : selectedAnime.id);
  const episodes = (episodesData == null ? void 0 : episodesData.episodes) || [];
  reactExports.useEffect(() => {
    if (!isOpen) {
      setSearchQuery("");
      setResults([]);
      setSelectedAnime(null);
      setLoading(false);
    }
  }, [isOpen]);
  reactExports.useEffect(() => {
    let cancelled = false;
    if (debouncedSearch.trim().length > 2) {
      setLoading(true);
      contentGraph.search({ query: debouncedSearch, page: 1, perPage: 24 }).then((res) => {
        if (!cancelled) setResults((res.media || []).map(toAnimeCard));
      }).catch((err) => {
        console.error("Search failed", err);
        if (!cancelled) setResults([]);
      }).finally(() => {
        if (!cancelled) setLoading(false);
      });
    } else {
      setResults([]);
    }
    return () => {
      cancelled = true;
    };
  }, [debouncedSearch]);
  const handleEpisodeSelect = (episode) => {
    onSelect(selectedAnime, episode);
    onClose();
  };
  const handleStartFromFirst = () => {
    onSelect(selectedAnime, episodes[0]);
    onClose();
  };
  const accentStyle = { ["--isshoni-accent"]: ISSHONI_ACCENT };
  const ease = [0.16, 1, 0.3, 1];
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: isOpen, onOpenChange: (open) => !open && onClose(), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    DialogContent,
    {
      style: accentStyle,
      className: "max-w-md md:max-w-lg lg:max-w-2xl overflow-hidden border-white/[0.06] bg-background/60 p-0 backdrop-blur-2xl",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "aria-hidden": true, className: "pointer-events-none absolute inset-0 overflow-hidden", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-24 -right-16 h-56 w-56 rounded-full bg-[hsl(var(--isshoni-accent)/0.18)] blur-[90px]" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -bottom-28 -left-20 h-56 w-56 rounded-full bg-[hsl(var(--isshoni-accent)/0.10)] blur-[100px]" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { className: "relative z-10 border-b border-white/[0.06] p-6 pb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { className: "flex items-center gap-2.5 font-display text-xl font-black tracking-tight", children: [
          selectedAnime ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: () => setSelectedAnime(null),
              className: "grid h-7 w-7 place-items-center rounded-full bg-white/5 text-muted-foreground transition-colors hover:bg-white/10 hover:text-foreground",
              "aria-label": "Back to search",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" })
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "grid h-7 w-7 place-items-center rounded-full bg-[hsl(var(--isshoni-accent)/0.15)] text-[hsl(var(--isshoni-accent))]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Film, { className: "h-4 w-4" }) }),
          selectedAnime ? "Choose an episode" : "Change anime"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative z-10 p-6 pt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", initial: false, children: !selectedAnime ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: reduceMotion ? false : { opacity: 0, y: 8 },
            animate: { opacity: 1, y: 0 },
            exit: reduceMotion ? void 0 : { opacity: 0, y: -8 },
            transition: { duration: 0.25, ease },
            className: "space-y-4",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    value: searchQuery,
                    onChange: (e) => setSearchQuery(e.target.value),
                    placeholder: "Search for an anime…",
                    className: "h-11 rounded-full border-white/10 bg-white/5 pl-10 focus-visible:border-[hsl(var(--isshoni-accent)/0.5)] focus-visible:ring-[hsl(var(--isshoni-accent)/0.25)]",
                    autoFocus: true
                  }
                ),
                loading && /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 animate-spin text-[hsl(var(--isshoni-accent))]" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(ScrollArea, { className: "h-[300px] pr-3 md:h-[400px]", children: [
                results.length === 0 && !loading && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-[280px] flex-col items-center justify-center text-center text-muted-foreground md:h-[380px]", children: searchQuery.trim().length > 2 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "mb-3 h-10 w-10 opacity-40" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm opacity-70", children: [
                    "No results for “",
                    searchQuery,
                    "”"
                  ] })
                ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "mb-3 h-10 w-10 text-[hsl(var(--isshoni-accent))] opacity-30" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm opacity-50", children: "Type to search the library" })
                ] }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 gap-1.5", children: results.map((anime, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  motion.button,
                  {
                    initial: reduceMotion ? false : { opacity: 0, y: 6 },
                    animate: { opacity: 1, y: 0 },
                    transition: { duration: 0.2, delay: Math.min(i * 0.02, 0.3), ease },
                    onClick: () => setSelectedAnime(anime),
                    className: "group flex w-full items-center gap-3 rounded-xl border border-transparent p-2 text-left transition-colors hover:border-white/[0.06] hover:bg-white/[0.04]",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-16 w-11 flex-shrink-0 overflow-hidden rounded-lg bg-muted shadow-lg", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: anime.poster, alt: anime.name, className: "h-full w-full object-cover transition-transform duration-300 group-hover:scale-105", loading: "lazy" }) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "truncate text-sm font-semibold transition-colors group-hover:text-[hsl(var(--isshoni-accent))] md:text-base", children: anime.name }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-0.5 flex items-center gap-2 text-[11px] text-muted-foreground", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded bg-white/10 px-1.5 py-0.5 font-medium uppercase tracking-wide", children: anime.type || "TV" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "tabular-nums", children: [
                            anime.episodes.sub || "?",
                            " eps"
                          ] })
                        ] })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(CirclePlay, { className: "h-5 w-5 flex-shrink-0 text-[hsl(var(--isshoni-accent))] opacity-0 transition-all -translate-x-1 group-hover:translate-x-0 group-hover:opacity-100" })
                    ]
                  },
                  anime.id
                )) })
              ] })
            ]
          },
          "search"
        ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: reduceMotion ? false : { opacity: 0, y: 8 },
            animate: { opacity: 1, y: 0 },
            exit: reduceMotion ? void 0 : { opacity: 0, y: -8 },
            transition: { duration: 0.25, ease },
            className: "space-y-4",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4 rounded-2xl border border-white/[0.06] bg-white/[0.03] p-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: selectedAnime.poster, alt: selectedAnime.name, className: "h-24 w-16 flex-shrink-0 rounded-lg object-cover shadow-xl" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mb-0.5 truncate font-display text-lg font-black leading-tight", children: selectedAnime.name }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mb-3 text-xs text-muted-foreground tabular-nums", children: [
                    selectedAnime.episodes.sub || "?",
                    " episodes"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      size: "sm",
                      onClick: handleStartFromFirst,
                      disabled: loadingEpisodes,
                      className: "h-8 gap-1.5 rounded-full bg-[hsl(var(--isshoni-accent))] px-3.5 text-xs font-semibold text-white hover:bg-[hsl(var(--isshoni-accent)/0.85)]",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "h-3.5 w-3.5 fill-current" }),
                        "Start from Episode 1"
                      ]
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "px-1 text-[11px] font-black uppercase tracking-wider text-muted-foreground/70", children: "Or pick an episode" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollArea, { className: "h-[240px] md:h-[280px]", children: loadingEpisodes ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-2 p-1 md:grid-cols-5", children: Array.from({ length: 15 }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 w-full rounded-lg" }, i)) }) : episodes.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex h-[220px] flex-col items-center justify-center text-center text-muted-foreground md:h-[260px]", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Film, { className: "mb-3 h-10 w-10 opacity-40" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm opacity-70", children: "No episode list for this title" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs opacity-50", children: "Use “Start from Episode 1” — the room resolves episodes on its own." })
                ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-2 p-1 md:grid-cols-4 lg:grid-cols-5", children: episodes.map((ep) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    variant: "outline",
                    onClick: () => handleEpisodeSelect(ep),
                    className: cn(
                      "h-10 rounded-lg border-white/10 text-xs font-medium tabular-nums",
                      "hover:border-[hsl(var(--isshoni-accent)/0.5)] hover:bg-[hsl(var(--isshoni-accent)/0.15)] hover:text-[hsl(var(--isshoni-accent))]"
                    ),
                    title: ep.title || `Episode ${ep.number}`,
                    children: ep.number
                  },
                  ep.episodeId
                )) }) })
              ] })
            ]
          },
          "episodes"
        ) }) })
      ]
    }
  ) });
}
function IconSwap({
  swapKey,
  children,
  rotation = 30,
  // A subtle 30-degree spin creates a beautiful morphing effect
  className = ""
}) {
  const reduce = useReducedMotion();
  return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `relative inline-grid place-items-center ${className}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { initial: false, mode: "popLayout", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.span,
    {
      initial: reduce ? { opacity: 0 } : { scale: 0.5, opacity: 0, rotate: -rotation, filter: "blur(2px)" },
      animate: { scale: 1, opacity: 1, rotate: 0, filter: "blur(0px)" },
      exit: reduce ? { opacity: 0 } : { scale: 0.5, opacity: 0, rotate: rotation, filter: "blur(2px)" },
      transition: {
        type: "spring",
        // Apple-esque spring values for a snappy but smooth interaction
        stiffness: 350,
        damping: 25,
        mass: 1
      },
      className: "col-start-1 row-start-1 flex items-center justify-center origin-center",
      children
    },
    String(swapKey)
  ) }) });
}
function WatchRoomTopBar() {
  const {
    navigate,
    room,
    selectedCategory,
    broadcastChip,
    isReconnecting,
    copied,
    handleCopyLink,
    isHost,
    setShowPollDialog,
    handleExportChat,
    showSettings,
    setShowSettings,
    handleClose,
    isParticipant,
    handleLeave,
    isAdmin,
    handleAdminDelete,
    adminDeleteRoom,
    showDrawer,
    setShowDrawer
  } = useWatchRoomContext();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "sticky top-4 z-30 mb-6 flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-white/[0.06] bg-background/60 px-3 py-3 shadow-[0_16px_40px_-16px_rgba(0,0,0,0.8)] backdrop-blur-2xl transition-all", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-w-0 flex-1 items-center gap-3.5 pl-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => navigate("/isshoni"),
          "aria-label": "Back to watch rooms",
          className: "group shrink-0 rounded-full border border-white/[0.08] bg-white/[0.03] p-2.5 text-muted-foreground transition-all duration-300 hover:bg-white/[0.1] hover:text-foreground hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 active:scale-95",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4 transition-transform group-hover:-translate-x-0.5" })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-w-0 flex-col gap-0.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "truncate text-base md:text-lg font-bold tracking-tight text-foreground/95 drop-shadow-sm", children: room.name }),
          room.is_playing && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex shrink-0 items-center gap-1.5 rounded-full border border-red-500/20 bg-red-500/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-red-400 shadow-[0_0_10px_rgba(239,68,68,0.1)]", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse shadow-[0_0_5px_rgba(239,68,68,0.8)]" }),
            "Live"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-[11px] md:text-xs font-medium text-muted-foreground/70", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "truncate", children: [
            room.anime_title,
            room.episode_number && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/30 mx-1.5", children: "•" }),
            room.episode_number && `Ep ${room.episode_number}`,
            room.episode_title && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/30 mx-1.5", children: "•" }),
            room.episode_title && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: room.episode_title })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `shrink-0 rounded-md border px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide ${selectedCategory === "sub" ? "border-primary/20 bg-primary/10 text-primary" : "border-orange-500/20 bg-orange-500/10 text-orange-400"}`, children: selectedCategory })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center justify-end gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden md:flex items-center gap-2 mr-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 rounded-full border border-[hsl(var(--isshoni-accent)/0.2)] bg-[hsl(var(--isshoni-accent)/0.05)] px-3 py-1.5 shadow-[0_0_15px_hsl(var(--isshoni-accent)/0.05)]", title: "Watch party broadcast status", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Radio, { className: `w-3.5 h-3.5 text-[hsl(var(--isshoni-accent))] ${broadcastChip.live ? "animate-pulse" : ""}` }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] font-semibold tracking-wide text-[hsl(var(--isshoni-accent))]", children: broadcastChip.label })
        ] }),
        isReconnecting && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 rounded-full border border-amber-500/20 bg-amber-500/10 px-3 py-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-3 h-3 text-amber-400 animate-spin" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] font-semibold tracking-wide text-amber-400", children: "Reconnecting…" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "ghost", size: "sm", onClick: handleCopyLink, "aria-label": "Copy room link", className: "h-8 gap-1.5 rounded-full border border-white/5 bg-white/5 px-3 text-xs font-medium text-foreground/80 transition-all hover:bg-white/10 hover:text-foreground active:scale-95", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(IconSwap, { swapKey: copied ? "check" : "copy", children: copied ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-3.5 h-3.5 text-green-400" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "w-3.5 h-3.5" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: copied ? "Copied" : "Share" })
      ] }),
      isHost && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "ghost", size: "sm", onClick: () => setShowPollDialog(true), "aria-label": "Create a poll", className: "h-8 gap-1.5 rounded-full border border-white/5 bg-white/5 px-3 text-xs font-medium text-foreground/80 transition-all hover:bg-white/10 hover:text-foreground active:scale-95", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ChartColumn, { className: "w-3.5 h-3.5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden lg:inline", children: "Poll" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "ghost", size: "sm", onClick: handleExportChat, "aria-label": "Export chat", className: "h-8 gap-1.5 rounded-full border border-white/5 bg-white/5 px-3 text-xs font-medium text-foreground/80 transition-all hover:bg-white/10 hover:text-foreground active:scale-95", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CloudDownload, { className: "w-3.5 h-3.5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden lg:inline", children: "Export" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "ghost", size: "sm", onClick: () => setShowSettings(!showSettings), "aria-label": "Toggle room settings", className: `h-8 gap-1.5 rounded-full border px-3 text-xs font-medium transition-all active:scale-95 ${showSettings ? "border-white/10 bg-white/15 text-foreground shadow-inner" : "border-white/5 bg-white/5 text-foreground/80 hover:bg-white/10 hover:text-foreground"}`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Settings, { className: `w-3.5 h-3.5 transition-transform duration-500 ${showSettings ? "rotate-90" : ""}` }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: "Settings" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "ghost", size: "sm", onClick: handleClose, className: "h-8 gap-1.5 rounded-full border border-red-500/20 bg-red-500/10 px-3 text-xs font-medium text-red-400 transition-all hover:bg-red-500/20 hover:text-red-300 active:scale-95", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3.5 h-3.5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: "Close" })
        ] })
      ] }),
      isParticipant && !isHost && /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "ghost", size: "sm", onClick: handleLeave, className: "h-8 gap-1.5 rounded-full border border-red-500/20 bg-red-500/5 px-3 text-xs font-medium text-red-400 transition-all hover:bg-red-500/15 hover:text-red-300 active:scale-95", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "w-3.5 h-3.5" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: "Leave" })
      ] }),
      isAdmin && !isHost && /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "ghost", size: "sm", onClick: handleAdminDelete, disabled: adminDeleteRoom.isPending, className: "h-8 gap-1.5 rounded-full border border-red-500/20 bg-red-500/10 px-3 text-xs font-medium text-red-400 transition-all hover:bg-red-500/20 hover:text-red-300 active:scale-95", title: "Admin: force-delete room", children: [
        adminDeleteRoom.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-3.5 h-3.5 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3.5 h-3.5" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: "Delete" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          variant: "ghost",
          size: "sm",
          onClick: () => setShowDrawer(!showDrawer),
          "aria-label": "Toggle chat and room panels",
          className: `h-8 gap-1.5 rounded-full border px-4 text-xs font-bold transition-all duration-300 active:scale-95 ${showDrawer ? "border-[hsl(var(--isshoni-accent)/0.3)] bg-[hsl(var(--isshoni-accent)/0.15)] text-[hsl(var(--isshoni-accent))] shadow-[0_0_15px_hsl(var(--isshoni-accent)/0.15)]" : "border-white/5 bg-white/5 text-foreground/80 hover:bg-white/10 hover:text-foreground"}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "w-3.5 h-3.5" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: "Chat" })
          ]
        }
      )
    ] })
  ] });
}
function WatchRoomTimerBar() {
  const {
    participants,
    isEditingCustomTimer,
    setIsEditingCustomTimer,
    customTimerMinutes,
    setCustomTimerMinutes,
    handleStartTimer,
    room,
    handleForceStart,
    updateRoom,
    roomId
  } = useWatchRoomContext();
  const readyCount = participants.filter((p) => p.is_ready).length;
  const totalCount = participants.length;
  const isAllReady = totalCount > 0 && readyCount === totalCount;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6 flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-white/[0.06] bg-background/60 p-3 shadow-[0_16px_40px_-16px_rgba(0,0,0,0.8)] backdrop-blur-2xl transition-all", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex shrink-0 items-center gap-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `flex items-center gap-2.5 rounded-full border px-3.5 py-1.5 transition-all duration-500 ${isAllReady ? "border-emerald-500/30 bg-emerald-500/10 shadow-[0_0_15px_rgba(16,185,129,0.15)]" : "border-white/[0.08] bg-white/[0.03]"}`, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `grid h-6 w-6 place-items-center rounded-full transition-colors ${isAllReady ? "bg-emerald-500/20" : "bg-white/10"}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: `h-3 w-3 ${isAllReady ? "text-emerald-400" : "text-muted-foreground"}` }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: `text-[13px] font-bold tracking-wide transition-colors ${isAllReady ? "text-emerald-400" : "text-foreground/90"}`, children: [
        readyCount,
        " / ",
        totalCount,
        " Ready"
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden sm:flex items-center gap-1.5 mr-2 text-muted-foreground/50", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3.5 h-3.5" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-bold uppercase tracking-wider", children: "Host Controls" })
      ] }),
      [30, 60, 300].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          variant: "ghost",
          size: "sm",
          className: "h-8 rounded-full border border-white/5 bg-white/5 px-4 text-xs font-medium text-foreground/80 transition-all hover:bg-white/10 hover:text-foreground active:scale-95",
          onClick: () => handleStartTimer(s),
          children: s >= 60 ? `${s / 60}m` : `${s}s`
        },
        s
      )),
      !isEditingCustomTimer ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          variant: "ghost",
          size: "sm",
          className: "h-8 rounded-full border border-white/5 bg-white/5 px-4 text-xs font-medium text-foreground/80 transition-all hover:bg-white/10 hover:text-foreground active:scale-95",
          onClick: () => setIsEditingCustomTimer(true),
          children: "Custom"
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 rounded-full border border-white/10 bg-white/5 p-0.5 pr-1 shadow-inner transition-all animate-in fade-in slide-in-from-right-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            type: "number",
            value: customTimerMinutes,
            onChange: (e) => setCustomTimerMinutes(e.target.value),
            placeholder: "Min",
            className: "h-7 w-14 border-0 bg-transparent px-2 text-center text-xs focus-visible:ring-0 placeholder:text-muted-foreground/40 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            size: "icon",
            className: "h-6 w-6 shrink-0 rounded-full bg-[hsl(var(--isshoni-accent))] text-black hover:bg-[hsl(var(--isshoni-accent)/0.9)] active:scale-95 transition-all shadow-sm",
            onClick: () => {
              handleStartTimer(parseInt(customTimerMinutes) * 60);
              setIsEditingCustomTimer(false);
            },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "h-3 w-3 ml-0.5" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "ghost",
            size: "icon",
            className: "h-6 w-6 shrink-0 rounded-full hover:bg-white/10 text-muted-foreground hover:text-foreground active:scale-95 transition-all",
            onClick: () => setIsEditingCustomTimer(false),
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-3 w-3" })
          }
        )
      ] }),
      room.scheduled_start_at && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 pl-2 ml-1 border-l border-white/10 animate-in fade-in slide-in-from-left-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            className: "h-8 gap-1.5 rounded-full bg-emerald-500/10 px-4 text-xs font-bold text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20 hover:text-emerald-300 transition-all active:scale-95 shadow-[0_0_15px_rgba(16,185,129,0.1)]",
            onClick: handleForceStart,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "h-3 w-3 fill-current" }),
              "Start Now"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "ghost",
            className: "h-8 rounded-full border border-red-500/20 bg-red-500/10 px-4 text-xs font-medium text-red-400 transition-all hover:bg-red-500/20 hover:text-red-300 active:scale-95",
            onClick: () => updateRoom.mutate({ roomId, updates: { scheduled_start_at: null } }),
            children: "Cancel"
          }
        )
      ] })
    ] })
  ] });
}
function WatchRoomStage() {
  var _a, _b, _c, _d, _e, _f;
  const {
    room,
    streamingData,
    currentEpisodeId,
    selectedServer,
    playerRef,
    isHost,
    roomId,
    lastUpdateRef,
    updatePlayback,
    handlePlayerError,
    loadingSources,
    drift,
    countdown,
    participants,
    handleForceStart
  } = useWatchRoomContext();
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "group/video relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-[1.5rem] md:rounded-[2rem] border border-white/[0.08] bg-black shadow-[0_28px_80px_-24px_rgba(0,0,0,0.95)] ring-1 ring-white/[0.02] animate-in fade-in zoom-in-[0.98] duration-700", children: room.scheduled_start_at ? (
    // -----------------------------------------------------
    // COUNTDOWN SCREEN
    // -----------------------------------------------------
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 z-50 flex flex-col items-center justify-center p-6 sm:p-8 animate-in fade-in duration-500", children: [
      room.anime_poster && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute inset-0 scale-[1.15] opacity-30 blur-[40px] transition-opacity duration-1000",
            style: { backgroundImage: `url(${getProxiedImageUrl(room.anime_poster)})`, backgroundSize: "cover", backgroundPosition: "center" }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 flex flex-col items-center text-center w-full max-w-lg", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-6 rounded-3xl border border-[hsl(var(--isshoni-accent)/0.2)] bg-[hsl(var(--isshoni-accent)/0.1)] p-4 shadow-[0_0_40px_hsl(var(--isshoni-accent)/0.15)] backdrop-blur-md", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Timer, { className: "w-8 h-8 sm:w-10 sm:h-10 text-[hsl(var(--isshoni-accent))] animate-pulse" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl sm:text-4xl font-bold tracking-tight text-white mb-2 drop-shadow-lg", children: "Starting soon" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs sm:text-sm font-medium text-white/60 mb-8 uppercase tracking-widest", children: "The broadcast begins in" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end justify-center gap-3 sm:gap-5 mb-10 text-white drop-shadow-2xl", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-5xl sm:text-7xl font-bold tabular-nums tracking-tighter", children: countdown !== null ? Math.floor(countdown / 60) : "0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] sm:text-xs font-semibold text-white/50 mt-1 uppercase tracking-widest", children: "Minutes" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-4xl sm:text-6xl font-light text-white/20 pb-4 sm:pb-6 animate-pulse", children: ":" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-5xl sm:text-7xl font-bold tabular-nums tracking-tighter", children: (countdown !== null ? countdown % 60 : 0).toString().padStart(2, "0") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] sm:text-xs font-semibold text-white/50 mt-1 uppercase tracking-widest", children: "Seconds" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 sm:gap-4 rounded-full border border-white/10 bg-white/5 px-2 py-1.5 backdrop-blur-xl shadow-2xl", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 pl-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "relative flex h-2.5 w-2.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[11px] sm:text-xs font-bold uppercase tracking-wider text-white/90", children: [
              participants.length,
              " Ready"
            ] })
          ] }),
          isHost && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-px h-5 bg-white/10" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                onClick: handleForceStart,
                className: "rounded-full bg-[hsl(var(--isshoni-accent))] px-4 py-1.5 text-[11px] sm:text-xs font-bold text-black transition-all hover:bg-[hsl(var(--isshoni-accent)/0.9)] hover:scale-105 active:scale-95 shadow-[0_0_15px_hsl(var(--isshoni-accent)/0.3)]",
                children: "Start Now"
              }
            )
          ] }),
          !isHost && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pr-3" })
        ] })
      ] })
    ] })
  ) : (
    // -----------------------------------------------------
    // VIDEO / EMBED SCREEN
    // -----------------------------------------------------
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full h-full relative animate-in fade-in duration-700", children: [
      room.manual_stream_url || (streamingData == null ? void 0 : streamingData.sources) && room.anime_id && currentEpisodeId ? (
        // Check if Embed vs Video Player
        (room.manual_stream_url ? room.manual_stream_type === "embed" || !room.manual_stream_url.includes(".m3u8") && !room.manual_stream_url.includes(".mp4") && !room.manual_stream_url.includes(".webm") : (_b = (_a = streamingData == null ? void 0 : streamingData.sources) == null ? void 0 : _a[0]) == null ? void 0 : _b.isEmbed) ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full h-full relative bg-black", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            EmbedPlayer,
            {
              url: room.manual_stream_url || ((_d = (_c = streamingData == null ? void 0 : streamingData.sources) == null ? void 0 : _c[0]) == null ? void 0 : _d.url) || "",
              poster: room.anime_poster || void 0,
              language: "Embed"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-4 inset-x-0 z-50 flex justify-center pointer-events-none animate-in slide-in-from-top-4 fade-in", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-4 py-1.5 shadow-[0_0_20px_rgba(245,158,11,0.15)] backdrop-blur-md", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "h-3.5 w-3.5 text-amber-400" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-bold uppercase tracking-wider text-amber-400", children: "Sync disabled for embedded sources" })
          ] }) })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
          VideoPlayer,
          {
            externalRef: playerRef,
            sources: room.manual_stream_url ? [{
              url: room.manual_stream_url,
              isM3U8: room.manual_stream_url.includes(".m3u8"),
              quality: "Custom",
              isEmbed: false
            }] : streamingData == null ? void 0 : streamingData.sources,
            headers: room.manual_stream_url ? {} : streamingData == null ? void 0 : streamingData.headers,
            subtitles: [
              ...((sData) => {
                const all = [...(sData == null ? void 0 : sData.subtitles) || [], ...(sData == null ? void 0 : sData.tracks) || []];
                const seen = /* @__PURE__ */ new Set();
                return all.filter((s) => {
                  if (seen.has(s.url)) return false;
                  seen.add(s.url);
                  return true;
                });
              })(streamingData || { subtitles: [], tracks: [] }),
              ...room.manual_subtitle_url ? [{ lang: "Manual", url: room.manual_subtitle_url, label: "Manual" }] : []
            ],
            isLive: !isHost,
            initialSeekSeconds: room.current_time_seconds,
            onPlay: isHost ? () => updatePlayback.mutate({ roomId, isPlaying: true }) : void 0,
            onPause: isHost ? () => updatePlayback.mutate({ roomId, isPlaying: false }) : void 0,
            onProgressUpdate: isHost ? (t) => {
              if (Math.abs(t - lastUpdateRef.current) > 5) {
                lastUpdateRef.current = t;
                updatePlayback.mutate({ roomId, currentTime: t });
              }
            } : void 0,
            onError: handlePlayerError,
            animeId: room.anime_id,
            animeName: room.anime_title,
            animePoster: room.anime_poster,
            episodeNumber: room.episode_number,
            episodeTitle: room.episode_title
          },
          `${currentEpisodeId}-${selectedServer}-${room.manual_stream_url}`
        )
      ) : (
        // -----------------------------------------------------
        // LOADING / WAITING FOR HOST SCREEN
        // -----------------------------------------------------
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center h-full w-full bg-black", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative grid h-16 w-16 place-items-center rounded-full border border-white/5 bg-white/[0.02] mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 rounded-full bg-[hsl(var(--isshoni-accent)/0.05)] blur-xl animate-pulse" }),
            loadingSources ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "relative h-6 w-6 text-[hsl(var(--isshoni-accent))] animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Film, { className: "relative h-6 w-6 text-white/20" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold uppercase tracking-widest text-muted-foreground/60", children: loadingSources ? "Loading stream..." : room.anime_title ? "Preparing..." : "Waiting for host" })
        ] })
      ),
      !isHost && room.is_playing && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-4 left-1/2 z-50 -translate-x-1/2 pointer-events-none animate-in fade-in slide-in-from-top-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5 rounded-full border border-white/[0.08] bg-black/60 px-3.5 py-1.5 shadow-[0_10px_20px_rgba(0,0,0,0.5)] backdrop-blur-xl", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.8)]" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-bold uppercase tracking-wider text-white", children: "Live" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-px h-3 bg-white/15" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[11px] font-semibold text-[hsl(var(--isshoni-accent))] tabular-nums", children: [
          Math.floor((((_e = playerRef.current) == null ? void 0 : _e.currentTime) || 0) / 60),
          ":",
          Math.floor((((_f = playerRef.current) == null ? void 0 : _f.currentTime) || 0) % 60).toString().padStart(2, "0")
        ] })
      ] }) }),
      !isHost && room.is_playing && drift < 1 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-4 right-4 z-50 pointer-events-none animate-in zoom-in-95 fade-in", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-7 w-7 place-items-center rounded-full border border-emerald-500/20 bg-emerald-500/10 backdrop-blur-md shadow-[0_0_15px_rgba(16,185,129,0.15)]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-3.5 h-3.5 fill-emerald-400 text-emerald-400" }) }) })
    ] })
  ) });
}
function WatchRoomInfoBar() {
  const { room, isHost, isParticipantReady, handleToggleReady } = useWatchRoomContext();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-white/[0.06] bg-background/60 p-3 shadow-[0_16px_40px_-16px_rgba(0,0,0,0.8)] backdrop-blur-2xl animate-in fade-in slide-in-from-bottom-2 duration-700", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-w-0 flex-1 items-center gap-4 pl-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative h-14 w-10 shrink-0 overflow-hidden rounded-xl border border-white/10 shadow-md", children: room.anime_poster ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        "img",
        {
          src: room.anime_poster,
          className: "h-full w-full object-cover",
          alt: room.anime_title || "Poster"
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-full w-full items-center justify-center bg-white/5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Film, { className: "w-4 h-4 text-white/20" }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-w-0 flex-col justify-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-0.5 text-[10px] font-bold uppercase tracking-widest text-[hsl(var(--isshoni-accent))] drop-shadow-md", children: "Now watching" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "max-w-[200px] sm:max-w-[350px] md:max-w-[500px] truncate text-sm sm:text-base font-bold text-foreground/95 leading-tight", children: room.anime_title || "Waiting for host to select anime..." }),
        (room.episode_number || room.episode_title) && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-0.5 text-[11px] font-medium text-muted-foreground/70 truncate max-w-[200px] sm:max-w-none", children: [
          room.episode_number ? `Episode ${room.episode_number}` : "",
          room.episode_number && room.episode_title ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mx-1.5 text-white/20", children: "•" }) : "",
          room.episode_title && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: room.episode_title })
        ] })
      ] })
    ] }),
    !isHost && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pr-1 shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Button,
      {
        variant: "ghost",
        size: "sm",
        onClick: handleToggleReady,
        className: `h-10 gap-2 rounded-full px-5 transition-all duration-300 active:scale-95 ${isParticipantReady ? "border border-emerald-500/30 bg-emerald-500/15 text-emerald-400 hover:bg-emerald-500/25 shadow-[0_0_20px_rgba(16,185,129,0.15)]" : "border border-white/5 bg-white/5 text-foreground/80 hover:bg-white/10 hover:text-foreground"}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(IconSwap, { swapKey: isParticipantReady ? "ready" : "not", children: isParticipantReady ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-4 h-4 shadow-[0_0_10px_rgba(16,185,129,0.5)] rounded-full" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-4 h-4" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] font-bold uppercase tracking-wider", children: isParticipantReady ? "Ready" : "Mark ready" })
        ]
      }
    ) })
  ] });
}
const REACTIONS = ["🔥", "👏", "😂", "😱", "❤️"];
function timeLabel(iso) {
  try {
    return new Date(iso).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
  } catch {
    return "";
  }
}
function ChatPanel() {
  const {
    messages,
    messagesEndRef,
    isHost,
    isParticipant,
    message,
    setMessage,
    handleExportChat,
    handleReaction,
    handleSendMessage,
    handleJoin,
    user
  } = useWatchRoomContext();
  return (
    // FIX: Replaced 'h-full' with 'flex-1' below so it pushes the input to the bottom
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-1 min-h-0 flex-col bg-background/50 relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 flex shrink-0 items-center justify-between border-b border-white/[0.04] bg-background/80 px-4 py-3 backdrop-blur-md", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "flex items-center gap-2.5 text-xs font-semibold uppercase tracking-wider text-foreground/90", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "grid h-6 w-6 place-items-center rounded-full bg-[hsl(var(--isshoni-accent)/0.15)] ring-1 ring-[hsl(var(--isshoni-accent)/0.3)] shadow-[0_0_10px_hsl(var(--isshoni-accent)/0.2)]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "h-3 w-3 text-[hsl(var(--isshoni-accent))]" }) }),
          "Live Chat"
        ] }),
        isHost && messages.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: handleExportChat,
            className: "flex items-center gap-1.5 rounded-full border border-white/5 bg-white/5 px-2.5 py-1 text-[11px] font-medium text-muted-foreground/80 transition-all hover:bg-white/10 hover:text-foreground active:scale-95",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CloudDownload, { className: "h-3.5 w-3.5" }),
              "Export"
            ]
          }
        )
      ] }),
      messages.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-h-0 flex-1 flex-col items-center justify-center gap-4 px-4 text-center animate-in fade-in zoom-in-95 duration-500", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative grid h-14 w-14 place-items-center rounded-full border border-white/[0.08] bg-white/[0.02] shadow-xl", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 rounded-full bg-[hsl(var(--isshoni-accent)/0.1)] blur-xl" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "relative h-6 w-6 text-muted-foreground/50" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground/90", children: "No messages yet" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground/60 max-w-[200px]", children: "Say hi and get the watch party talking." })
        ] })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(ScrollArea, { className: "min-h-0 flex-1 px-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col justify-end py-4 space-y-1", children: messages.map((m, i) => {
          const prev = messages[i - 1];
          const next = messages[i + 1];
          if (m.message_type === "system") {
            return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center py-2 animate-in fade-in slide-in-from-bottom-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full border border-white/[0.06] bg-white/[0.03] px-3.5 py-1 text-[11px] font-medium text-muted-foreground/70 shadow-sm", children: m.message }) }, m.id);
          }
          if (m.message_type === "reaction") {
            return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-2 py-1 text-xs animate-in zoom-in-95 fade-in", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground/50", children: m.display_name }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lg leading-none drop-shadow-md", children: m.message })
            ] }, m.id);
          }
          const mine = !!user && m.user_id === user.id;
          const grouped = !!prev && prev.user_id === m.user_id && prev.message_type === "chat";
          const isLast = !next || next.user_id !== m.user_id || next.message_type !== "chat";
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `flex gap-2.5 animate-in fade-in slide-in-from-bottom-1 ${mine ? "flex-row-reverse" : ""} ${grouped ? "mt-0.5" : "mt-4"}`, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-7 shrink-0 flex flex-col justify-end", children: !mine && isLast && /* @__PURE__ */ jsxRuntimeExports.jsxs(Avatar, { className: "h-7 w-7 border border-white/10 shadow-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarImage, { src: m.avatar_url || "" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarFallback, { className: "bg-white/10 text-[10px] font-medium", children: m.display_name[0] })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `flex min-w-0 max-w-[75%] flex-col ${mine ? "items-end" : "items-start"}`, children: [
              !grouped && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `mb-1 flex items-baseline gap-2 px-1 ${mine ? "flex-row-reverse" : ""}`, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-[11px] font-medium ${mine ? "text-foreground/60" : "text-[hsl(var(--isshoni-accent))]"}`, children: mine ? "You" : m.display_name }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground/40", children: timeLabel(m.created_at) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `break-words px-3.5 py-2 text-[13px] leading-relaxed shadow-sm
                                            ${mine ? "bg-[hsl(var(--isshoni-accent)/0.25)] text-foreground border border-[hsl(var(--isshoni-accent)/0.2)]" : "bg-white/[0.06] text-foreground/90 border border-white/[0.04]"}
                                            ${mine ? "rounded-l-2xl" : "rounded-r-2xl"}
                                            ${!grouped ? mine ? "rounded-tr-2xl" : "rounded-tl-2xl" : mine ? "rounded-tr-md" : "rounded-tl-md"}
                                            ${isLast ? mine ? "rounded-br-sm" : "rounded-bl-sm" : mine ? "rounded-br-md" : "rounded-bl-md"}
                                        `, children: m.message })
            ] })
          ] }, m.id);
        }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: messagesEndRef, className: "h-2" })
      ] }),
      isParticipant ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "shrink-0 space-y-3 border-t border-white/[0.06] bg-background/80 p-4 pt-3 backdrop-blur-xl", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex h-9 items-center rounded-full border border-white/[0.08] bg-white/[0.03] px-2 shadow-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Smile, { className: "mr-2 h-4 w-4 text-muted-foreground/50" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-4 w-px bg-white/10 mr-1" }),
          REACTIONS.map((emoji) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => handleReaction(emoji), className: "flex h-7 w-7 items-center justify-center rounded-full text-sm transition-all hover:scale-125 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 active:scale-95", children: emoji }, emoji))
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSendMessage, className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: message, onChange: (e) => setMessage(e.target.value), placeholder: "Type a message...", className: "h-10 flex-1 rounded-full border-white/[0.1] bg-white/[0.04] px-4 text-[13px] placeholder:text-muted-foreground/50 hover:bg-white/[0.06] focus-visible:ring-1 focus-visible:ring-[hsl(var(--isshoni-accent))] transition-colors shadow-inner" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", size: "icon", className: `h-10 w-10 shrink-0 rounded-full transition-all duration-300 ${message.trim() ? "bg-[hsl(var(--isshoni-accent))] text-black hover:bg-[hsl(var(--isshoni-accent)/0.9)] hover:scale-105 shadow-[0_0_15px_hsl(var(--isshoni-accent)/0.4)]" : "bg-white/5 text-muted-foreground cursor-not-allowed"}`, disabled: !message.trim(), "aria-label": "Send message", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: `h-4 w-4 ${message.trim() ? "ml-0.5" : ""}` }) })
        ] })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "shrink-0 border-t border-white/[0.06] bg-background/80 p-4 backdrop-blur-xl", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { className: "h-10 w-full rounded-full bg-[hsl(var(--isshoni-accent))] text-black text-sm font-bold shadow-[0_0_15px_hsl(var(--isshoni-accent)/0.2)] hover:bg-[hsl(var(--isshoni-accent)/0.9)] transition-all", onClick: handleJoin, children: "Join to chat" }) })
    ] })
  );
}
function QueuePanel() {
  const {
    queueItems,
    isHost,
    room,
    roomId,
    addQueueItem,
    removeQueueItem,
    handleQueueAnimeFromSearch,
    handleQueueCurrentEpisode,
    handleMoveQueueItem,
    handlePlayQueueItem
  } = useWatchRoomContext();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-0 flex min-h-0 flex-1 flex-col p-4 pt-3.5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-3 flex shrink-0 items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "flex items-center gap-2 text-xs font-semibold tracking-wide text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ListOrdered, { className: "h-3.5 w-3.5 text-[hsl(var(--isshoni-accent))]" }),
        " Watch queue ",
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground/60", children: [
          "(",
          queueItems.length,
          ")"
        ] })
      ] }),
      isHost && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "outline", className: "h-7 text-xs rounded-full bg-white/5 border-white/10 hover:bg-white/10", onClick: handleQueueAnimeFromSearch, disabled: addQueueItem.isPending, children: "Add" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "outline", className: "h-7 text-xs rounded-full bg-white/5 border-white/10 hover:bg-white/10", onClick: handleQueueCurrentEpisode, disabled: !(room == null ? void 0 : room.anime_id) || room.anime_id === "custom" || addQueueItem.isPending, children: "Current" })
      ] })
    ] }),
    queueItems.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-1 flex-col items-center justify-center gap-2 text-center text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ListOrdered, { className: "h-10 w-10 opacity-20" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs", children: [
        "Queue is empty.",
        isHost ? " Add episodes for a smoother session." : ""
      ] })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollArea, { className: "-mr-2 min-h-0 flex-1 pr-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: queueItems.map((item, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 rounded-2xl border border-white/[0.08] bg-white/[0.04] p-2 transition-colors hover:bg-white/[0.07]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-5 text-xs font-semibold text-muted-foreground text-center", children: index + 1 }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: getProxiedImageUrl(item.anime_poster || "/placeholder.svg"), alt: "", className: "h-10 w-8 rounded-lg object-cover [outline:1px_solid_oklch(1_0_0/0.1)]" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate text-xs font-semibold", children: item.anime_title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate text-[11px] text-muted-foreground", children: item.episode_number ? `Episode ${item.episode_number}` : "Next available episode" })
      ] }),
      isHost && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "icon", variant: "ghost", className: "h-7 w-7 rounded-full", onClick: () => handleMoveQueueItem(item.id, "up"), disabled: index === 0, children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUp, { className: "h-3 w-3" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "icon", variant: "ghost", className: "h-7 w-7 rounded-full", onClick: () => handleMoveQueueItem(item.id, "down"), disabled: index === queueItems.length - 1, children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowDown, { className: "h-3 w-3" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "outline", className: "h-7 text-xs rounded-full bg-white/5 border-white/10 hover:bg-white/10", onClick: () => handlePlayQueueItem(item.id), children: "Play" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "icon", variant: "ghost", className: "h-7 w-7 rounded-full text-red-400 hover:text-red-300", onClick: () => removeQueueItem.mutate({ roomId, queueItemId: item.id }), children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-3 w-3" }) })
      ] })
    ] }, item.id)) }) })
  ] });
}
function PollsPanel() {
  const {
    activePoll,
    isHost,
    roomId,
    closeRoomPoll,
    voteRoomPoll,
    isParticipant,
    setShowPollDialog,
    handleVotePoll
  } = useWatchRoomContext();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-0 flex min-h-0 flex-1 flex-col p-4 pt-3.5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-3 flex shrink-0 items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "flex items-center gap-2 text-xs font-semibold tracking-wide text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ChartColumn, { className: "h-3.5 w-3.5 text-[hsl(var(--isshoni-accent))]" }),
        " Group poll"
      ] }),
      isHost && (activePoll ? /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "outline", className: "h-7 text-xs rounded-full bg-white/5 border-white/10 hover:bg-white/10", onClick: () => closeRoomPoll.mutate({ roomId, pollId: activePoll.id }), children: "Close" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", variant: "outline", className: "h-7 gap-1 text-xs rounded-full bg-white/5 border-white/10 hover:bg-white/10", onClick: () => setShowPollDialog(true), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-3 w-3" }),
        " New"
      ] }))
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollArea, { className: "-mr-2 min-h-0 flex-1 pr-2", children: activePoll ? /* @__PURE__ */ jsxRuntimeExports.jsx(Poll, { question: activePoll.question, results: activePoll.results, votesCount: activePoll.votes_count, userVote: activePoll.user_vote, endsAt: activePoll.ends_at, disabled: voteRoomPoll.isPending || !isParticipant, onVote: handleVotePoll }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-1 flex-col items-center justify-center gap-2 py-10 text-center text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ChartColumn, { className: "h-10 w-10 opacity-20" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs", children: isHost ? "No active poll. Start one to gather votes." : "No active poll yet. The host can start one anytime." })
    ] }) })
  ] });
}
function ViewersPanel() {
  const { participants, isHost, user, hostTransferTarget, handleTransferHost } = useWatchRoomContext();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-0 flex h-full min-h-0 flex-1 flex-col relative bg-background/50", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative z-10 flex shrink-0 items-center justify-between border-b border-white/[0.04] bg-background/80 px-4 py-3 backdrop-blur-md", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "flex items-center gap-2.5 text-xs font-semibold uppercase tracking-wider text-foreground/90", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "grid h-6 w-6 place-items-center rounded-full bg-[hsl(var(--isshoni-accent)/0.15)] ring-1 ring-[hsl(var(--isshoni-accent)/0.3)] shadow-[0_0_10px_hsl(var(--isshoni-accent)/0.2)]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-3 w-3 text-[hsl(var(--isshoni-accent))]" }) }),
      "Viewers",
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-1 rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-bold text-muted-foreground shadow-inner", children: participants.length })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollArea, { className: "min-h-0 flex-1 px-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "py-4 space-y-2.5", children: participants.map((p, i) => {
      var _a;
      const isMe = !!user && p.user_id === user.id;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: `flex items-center gap-3 rounded-2xl border p-2.5 transition-all animate-in fade-in slide-in-from-bottom-2 fill-mode-both ${isMe ? "border-[hsl(var(--isshoni-accent)/0.25)] bg-[hsl(var(--isshoni-accent)/0.08)] shadow-[0_0_15px_hsl(var(--isshoni-accent)/0.05)]" : "border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.06]"}`,
          style: { animationDelay: `${i * 50}ms` },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Avatar, { className: "h-10 w-10 shrink-0 border border-white/10 shadow-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarImage, { src: p.avatar_url || "" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarFallback, { className: "bg-black/40 text-xs font-medium text-white/70", children: (_a = p.display_name[0]) == null ? void 0 : _a.toUpperCase() })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-w-0 flex-1 flex-col justify-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `truncate text-[13px] font-bold ${isMe ? "text-foreground" : "text-foreground/90"}`, children: p.display_name }),
                isMe && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "shrink-0 text-[9px] font-extrabold uppercase tracking-widest text-[hsl(var(--isshoni-accent))] drop-shadow-sm", children: "(You)" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
                p.is_host && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 rounded-md border border-amber-500/20 bg-amber-500/10 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-amber-400", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Crown, { className: "h-2.5 w-2.5" }),
                  " Host"
                ] }),
                !p.is_host && p.is_ready && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 rounded-md border border-emerald-500/20 bg-emerald-500/10 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-emerald-400", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "h-2.5 w-2.5 fill-emerald-400" }),
                  " Ready"
                ] }),
                !p.is_host && !p.is_ready && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-medium uppercase tracking-wider text-muted-foreground/50", children: "Watching" })
              ] })
            ] }),
            isHost && !p.is_host && !isMe && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pr-1 shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "ghost",
                size: "sm",
                disabled: hostTransferTarget === p.user_id,
                onClick: () => handleTransferHost(p.user_id, p.display_name),
                className: "h-8 rounded-full border border-white/10 bg-white/5 px-3 text-[10px] font-bold uppercase tracking-wider text-foreground/80 transition-all hover:border-[hsl(var(--isshoni-accent)/0.4)] hover:bg-[hsl(var(--isshoni-accent)/0.15)] hover:text-[hsl(var(--isshoni-accent))] hover:shadow-[0_0_15px_hsl(var(--isshoni-accent)/0.2)] active:scale-95 disabled:opacity-40",
                title: "Transfer host privileges to this user",
                children: hostTransferTarget === p.user_id ? "Transferring" : "Make Host"
              }
            ) })
          ]
        },
        p.id
      );
    }) }) })
  ] });
}
function DrawerBody() {
  const { sideTab, setSideTab, queueItems, activePoll, participants } = useWatchRoomContext();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { value: sideTab, onValueChange: (v) => setSideTab(v), className: "flex h-full min-h-0 flex-col", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "m-4 mb-2 grid h-auto shrink-0 grid-cols-4 rounded-[1.25rem] border border-white/[0.05] bg-black/40 p-1.5 shadow-inner backdrop-blur-xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        TabsTrigger,
        {
          value: "chat",
          className: "relative flex items-center justify-center gap-1.5 rounded-xl py-2 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-muted-foreground transition-all duration-300 data-[state=active]:bg-[hsl(var(--isshoni-accent)/0.15)] data-[state=active]:text-[hsl(var(--isshoni-accent))] data-[state=active]:shadow-[0_0_10px_hsl(var(--isshoni-accent)/0.1)]",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "h-3.5 w-3.5" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: "Chat" })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        TabsTrigger,
        {
          value: "queue",
          className: "relative flex items-center justify-center gap-1.5 rounded-xl py-2 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-muted-foreground transition-all duration-300 data-[state=active]:bg-[hsl(var(--isshoni-accent)/0.15)] data-[state=active]:text-[hsl(var(--isshoni-accent))] data-[state=active]:shadow-[0_0_10px_hsl(var(--isshoni-accent)/0.1)]",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ListOrdered, { className: "h-3.5 w-3.5" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: "Queue" }),
            queueItems.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-[hsl(var(--isshoni-accent))] text-[9px] font-bold text-black shadow-md", children: queueItems.length })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        TabsTrigger,
        {
          value: "polls",
          className: "relative flex items-center justify-center gap-1.5 rounded-xl py-2 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-muted-foreground transition-all duration-300 data-[state=active]:bg-[hsl(var(--isshoni-accent)/0.15)] data-[state=active]:text-[hsl(var(--isshoni-accent))] data-[state=active]:shadow-[0_0_10px_hsl(var(--isshoni-accent)/0.1)]",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ChartColumn, { className: "h-3.5 w-3.5" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: "Polls" }),
            activePoll && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute top-1 right-2 lg:right-3 h-2 w-2 rounded-full bg-[hsl(var(--isshoni-accent))] animate-pulse shadow-[0_0_8px_hsl(var(--isshoni-accent))]" })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        TabsTrigger,
        {
          value: "viewers",
          className: "relative flex items-center justify-center gap-1.5 rounded-xl py-2 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-muted-foreground transition-all duration-300 data-[state=active]:bg-[hsl(var(--isshoni-accent)/0.15)] data-[state=active]:text-[hsl(var(--isshoni-accent))] data-[state=active]:shadow-[0_0_10px_hsl(var(--isshoni-accent)/0.1)]",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-3.5 w-3.5" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex items-center justify-center rounded-md bg-white/10 px-1.5 py-0.5 text-[10px]", children: participants.length })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex min-h-0 flex-1 flex-col overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "chat", className: "mt-0 flex flex-1 min-h-0 flex-col outline-none data-[state=inactive]:hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChatPanel, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "queue", className: "mt-0 flex flex-1 min-h-0 flex-col outline-none data-[state=inactive]:hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(QueuePanel, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "polls", className: "mt-0 flex flex-1 min-h-0 flex-col outline-none data-[state=inactive]:hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(PollsPanel, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "viewers", className: "mt-0 flex flex-1 min-h-0 flex-col outline-none data-[state=inactive]:hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ViewersPanel, {}) })
    ] })
  ] });
}
function WatchRoomDrawer() {
  const { showDrawer, setShowDrawer } = useWatchRoomContext();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { initial: false, children: showDrawer && /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.aside,
      {
        initial: { width: 0, opacity: 0, x: 20 },
        animate: { width: 376, opacity: 1, x: 0 },
        exit: { width: 0, opacity: 0, x: 20 },
        transition: { type: "spring", duration: 0.5, bounce: 0 },
        className: "sticky top-24 hidden h-[calc(100vh_-_8.5rem)] min-h-0 shrink-0 lg:block overflow-visible",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "ml-6 flex h-full w-[352px] flex-col overflow-hidden rounded-[2rem] border border-white/[0.08] bg-background/60 shadow-[0_24px_60px_-24px_rgba(0,0,0,0.8)] backdrop-blur-3xl", children: /* @__PURE__ */ jsxRuntimeExports.jsx(DrawerBody, {}) })
      },
      "drawer-desktop"
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: showDrawer && /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { duration: 0.2 },
        className: "lg:hidden fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm",
        onClick: () => setShowDrawer(false),
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.aside,
          {
            initial: { x: "100%" },
            animate: { x: 0 },
            exit: { x: "100%" },
            transition: { type: "spring", duration: 0.4, bounce: 0 },
            className: "relative flex h-full w-full max-w-[320px] sm:max-w-sm flex-col overflow-hidden border-l border-white/[0.08] bg-background/80 shadow-2xl backdrop-blur-3xl",
            onClick: (e) => e.stopPropagation(),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex shrink-0 items-center justify-between border-b border-white/[0.05] bg-black/20 px-4 py-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold uppercase tracking-widest text-foreground/80", children: "Room Panel" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => setShowDrawer(false),
                    className: "rounded-full bg-white/5 p-2 text-muted-foreground transition-colors hover:bg-white/10 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--isshoni-accent))] active:scale-95",
                    "aria-label": "Close panel",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" })
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(DrawerBody, {})
            ]
          }
        )
      },
      "drawer-mobile"
    ) })
  ] });
}
function WatchRoomSettingsSheet() {
  const {
    isHost,
    showSettings,
    setShowSettings,
    setAnimeSearchMode,
    setShowAnimeSearch,
    episodesData,
    room,
    updateRoom,
    roomId,
    loadingSources,
    serversData,
    isDesktopApp,
    sourceDiagnostics,
    refetchSources,
    selectedServer,
    setSelectedServer,
    setSelectedCategory,
    setTriedServers,
    localShare,
    clearLocalShare,
    handlePickLocalFile,
    publishingLocal,
    openLibraryPicker
  } = useWatchRoomContext();
  if (!isHost) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Sheet, { open: showSettings, onOpenChange: setShowSettings, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(SheetContent, { side: "right", className: "w-full sm:max-w-2xl bg-background/80 backdrop-blur-2xl border-white/10 p-0", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SheetHeader, { className: "px-6 pt-6 pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(SheetTitle, { className: "flex items-center gap-2 font-semibold", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Settings, { className: "w-4 h-4 text-[hsl(var(--isshoni-accent))]" }),
      " Room settings"
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollArea, { className: "h-[calc(100vh_-_5rem)] px-6 pb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-sm font-semibold text-foreground flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "w-4 h-4 text-muted-foreground" }),
          " Anime"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: "outline",
            className: "w-full justify-start text-sm bg-white/5 border-white/10 hover:bg-white/10 rounded-xl h-11",
            onClick: () => {
              setAnimeSearchMode("change-room");
              setShowAnimeSearch(true);
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "w-4 h-4 mr-2 text-muted-foreground" }),
              "Search & Select…"
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-sm font-semibold text-foreground flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CirclePlay, { className: "w-4 h-4 text-muted-foreground" }),
          " Episodes"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollArea, { className: "h-[200px] bg-white/5 border border-white/5 rounded-2xl p-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-4 gap-1.5", children: episodesData == null ? void 0 : episodesData.episodes.map((e) => /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: room.episode_id === e.episodeId ? "secondary" : "ghost", className: `h-9 text-xs rounded-lg ${room.episode_id === e.episodeId ? "bg-white/15" : "hover:bg-white/10"}`, onClick: () => updateRoom.mutate({ roomId, updates: { episode_id: e.episodeId, episode_number: e.number, episode_title: e.title } }), children: e.number }, e.episodeId)) }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-sm font-semibold text-foreground flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Settings, { className: "w-4 h-4 text-muted-foreground" }),
          " Provider Selection"
        ] }),
        loadingSources && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 rounded-xl bg-white/5 border border-white/5 px-3 py-4 text-xs text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-3.5 h-3.5 animate-spin" }),
          "Resolving servers…"
        ] }),
        !loadingSources && serversData.all.length === 0 && serversData.torrents.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-white/5 bg-white/5 px-4 py-4 text-xs text-muted-foreground space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground/80", children: "No servers found" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "opacity-70 leading-relaxed", children: !isDesktopApp ? "Automatic resolution needs the desktop app. Paste a custom stream URL below to host from here." : !(sourceDiagnostics == null ? void 0 : sourceDiagnostics.streamEnabled) ? "Couldn't read this title's AniList id or episode number yet. Re-open the room, or change the anime again." : (sourceDiagnostics == null ? void 0 : sourceDiagnostics.streamUnavailable) ? "The toko streaming extension isn’t running or is out of date. Restart the app (and rebuild/reinstall the toko extension), then Retry." : "No provider had this episode. Try another episode or server, or paste a custom stream URL below." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "outline", className: "h-8 rounded-full text-xs bg-white/5 border-white/10 hover:bg-white/10", onClick: () => refetchSources(), children: "Retry" })
        ] }),
        serversData.languages.map((group) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs font-medium text-muted-foreground px-1 flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-[hsl(var(--isshoni-accent))]" }),
            group.label,
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "opacity-50", children: [
              "(",
              group.servers.length,
              ")"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: group.servers.map((s, i) => {
            const active = selectedServer === s.serverName;
            return /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: active ? "secondary" : "outline",
                className: `h-9 rounded-xl px-4 text-xs ${active ? "bg-white/15 border-transparent" : "bg-white/5 border-white/10 hover:bg-white/10"}`,
                onClick: () => {
                  setSelectedServer(s.serverName);
                  setSelectedCategory(s.isDub ? "dub" : "sub");
                  setTriedServers(/* @__PURE__ */ new Set([s.serverName]));
                },
                children: s.displayName || getFriendlyServerName(s.serverName) || s.serverName
              },
              `${group.label}-${s.serverName}-${i}`
            );
          }) })
        ] }, group.label)),
        serversData.torrents.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs font-medium text-amber-400/80 px-1 flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Magnet, { className: "w-3.5 h-3.5" }),
            " Torrent Releases",
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "opacity-50", children: [
              "(",
              serversData.torrents.length,
              ")"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1.5", children: serversData.torrents.map((t, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex items-center justify-between gap-2 rounded-xl border border-amber-500/15 bg-amber-500/[0.06] px-3 py-2",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium truncate text-foreground/90", children: t.torrentTitle || t.displayName || t.serverName }),
                  (t.fileSize || t.fileFormat) && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground truncate", children: [t.fileFormat, t.fileSize].filter(Boolean).join(" · ") })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-[11px] shrink-0 tabular-nums", children: [
                  typeof t.seeders === "number" && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-0.5 text-emerald-400", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CircleArrowUp, { className: "w-3 h-3" }),
                    t.seeders
                  ] }),
                  typeof t.leechers === "number" && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-0.5 text-rose-400", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CircleArrowDown, { className: "w-3 h-3" }),
                    t.leechers
                  ] })
                ] })
              ]
            },
            `torrent-${i}`
          )) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] italic text-muted-foreground/60 px-1", children: "Torrent releases can't be broadcast to a watch party yet — pick a server above to host." })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-sm font-semibold text-foreground flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Film, { className: "w-4 h-4 text-muted-foreground" }),
            " Custom Stream URL"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              placeholder: "Paste M3U8 or MP4 URL…",
              value: room.manual_stream_url || "",
              onChange: (e) => updateRoom.mutate({ roomId, updates: { manual_stream_url: e.target.value } }),
              className: "bg-white/5 border-white/10 rounded-xl text-sm h-11"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground", children: "Overrides server selection. Supports direct links." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-sm font-semibold text-foreground flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Captions, { className: "w-4 h-4 text-muted-foreground" }),
            " Manual Subtitle"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              placeholder: "Paste VTT or SRT URL…",
              value: room.manual_subtitle_url || "",
              onChange: (e) => updateRoom.mutate({ roomId, updates: { manual_subtitle_url: e.target.value } }),
              className: "bg-white/5 border-white/10 rounded-xl text-sm h-11"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground", children: "Useful for custom servers without built-in subs." })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-sm font-semibold text-foreground flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(HardDrive, { className: "w-4 h-4 text-muted-foreground" }),
          " Your Files"
        ] }),
        !isDesktopApp ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground leading-relaxed", children: "Streaming a file from your device or offline library needs the desktop app — it serves the file over your host tunnel." }) : localShare ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 rounded-2xl border border-[hsl(var(--isshoni-accent))]/30 bg-[hsl(var(--isshoni-accent))]/[0.08] px-3 py-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs font-semibold text-foreground/90 flex items-center gap-1.5 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Radio, { className: "w-3.5 h-3.5 text-[hsl(var(--isshoni-accent))] shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: localShare.fileName || "Local file" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground", children: "Broadcasting from your device to the party." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "outline", className: "h-8 text-xs rounded-full bg-white/5 border-white/10 hover:bg-white/10", onClick: clearLocalShare, children: "Stop & back to anime" })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "outline",
              className: "w-full justify-start text-sm bg-white/5 border-white/10 hover:bg-white/10 rounded-xl h-11",
              onClick: handlePickLocalFile,
              disabled: publishingLocal,
              children: [
                publishingLocal ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 mr-2 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(FolderOpen, { className: "w-4 h-4 mr-2 text-muted-foreground" }),
                "Play a video file…"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "outline",
              className: "w-full justify-start text-sm bg-white/5 border-white/10 hover:bg-white/10 rounded-xl h-11",
              onClick: openLibraryPicker,
              disabled: publishingLocal,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(HardDrive, { className: "w-4 h-4 mr-2 text-muted-foreground" }),
                "From your library…"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground", children: "Streams a downloaded episode or any local video to everyone in the room." })
        ] })
      ] })
    ] }) })
  ] }) });
}
function PasswordDialog() {
  const { showPasswordDialog, setShowPasswordDialog, password, setPassword, handlePasswordJoin } = useWatchRoomContext();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: showPasswordDialog && /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      className: "fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md",
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      transition: { duration: 0.15, ease: "easeOut" },
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          className: "p-6 max-w-sm w-full space-y-4 bg-background/60 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl",
          initial: { opacity: 0, scale: 0.96, y: 8 },
          animate: { opacity: 1, scale: 1, y: 0 },
          exit: { opacity: 0, y: 4 },
          transition: { type: "spring", duration: 0.3, bounce: 0 },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-3 bg-orange-500/15 rounded-2xl", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-6 h-6 text-orange-500" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold", children: "Password required" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Enter room password to join" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "password", value: password, onChange: (e) => setPassword(e.target.value), placeholder: "Password…", className: "rounded-full bg-white/5 border-white/10 h-11 px-4", autoFocus: true }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", className: "flex-1 rounded-full bg-white/5 border-white/10 hover:bg-white/10", onClick: () => setShowPasswordDialog(false), children: "Cancel" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { className: "flex-1 rounded-full bg-[hsl(var(--isshoni-accent))] font-bold text-black shadow-[0_0_15px_hsl(var(--isshoni-accent)/0.25)] hover:bg-[hsl(var(--isshoni-accent)/0.9)]", onClick: handlePasswordJoin, children: "Join room" })
            ] })
          ]
        }
      )
    }
  ) });
}
function LibraryPickerDialog() {
  const {
    showLibraryPicker,
    setShowLibraryPicker,
    selectedLibrarySeries,
    setSelectedLibrarySeries,
    loadingLibrary,
    library,
    publishingLocal,
    publishLocalFile
  } = useWatchRoomContext();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: showLibraryPicker, onOpenChange: (open) => {
    if (!open) {
      setShowLibraryPicker(false);
      setSelectedLibrarySeries(null);
    }
  }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-lg bg-background/60 backdrop-blur-2xl border-white/10 rounded-3xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { className: "flex items-center gap-2 font-semibold", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(HardDrive, { className: "w-4 h-4 text-[hsl(var(--isshoni-accent))]" }),
      selectedLibrarySeries ? selectedLibrarySeries.name : "Stream from your library"
    ] }) }),
    loadingLibrary ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-2 py-12 text-sm text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin" }),
      " Reading your downloads…"
    ] }) : selectedLibrarySeries ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "ghost", size: "sm", className: "h-7 gap-1 text-xs rounded-full -ml-1", onClick: () => setSelectedLibrarySeries(null), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-3.5 h-3.5" }),
        " All series"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollArea, { className: "h-[320px] pr-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-1.5", children: [
        (selectedLibrarySeries.episodes || []).map((ep) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            size: "sm",
            variant: "outline",
            className: "h-9 text-xs rounded-xl bg-white/5 border-white/10 hover:bg-white/10",
            disabled: publishingLocal,
            onClick: () => publishLocalFile(`${selectedLibrarySeries.path}/${ep.file}`, `${selectedLibrarySeries.name} • Ep ${ep.number}`),
            children: publishingLocal ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-3.5 h-3.5 animate-spin" }) : `Ep ${ep.number}`
          },
          ep.id || ep.number || ep.file
        )),
        (selectedLibrarySeries.episodes || []).length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "col-span-3 py-8 text-center text-xs text-muted-foreground", children: "No downloaded episodes in this series." })
      ] }) })
    ] }) : library.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "py-12 text-center space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(HardDrive, { className: "w-10 h-10 mx-auto text-muted-foreground opacity-40" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Your offline library is empty." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground/70", children: "Download episodes from an anime page, or pick any video file instead." })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollArea, { className: "h-[360px] pr-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1.5", children: library.map((item, i) => {
      var _a;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          className: "w-full flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-2 text-left transition-colors hover:bg-white/10 disabled:opacity-50",
          disabled: publishingLocal,
          onClick: () => setSelectedLibrarySeries(item),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: item.posterUrl || item.poster || "",
                alt: "",
                className: "w-10 h-14 rounded-lg object-cover bg-white/5 shrink-0 [outline:1px_solid_oklch(1_0_0/0.1)]",
                onError: (e) => {
                  e.currentTarget.style.visibility = "hidden";
                }
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium truncate text-foreground/90", children: item.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[11px] text-muted-foreground tabular-nums", children: [
                item.downloadedEpisodes ?? ((_a = item.episodes) == null ? void 0 : _a.length) ?? 0,
                " downloaded"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(CirclePlay, { className: "w-4 h-4 text-muted-foreground/60 shrink-0" })
          ]
        },
        item.path || item.name || i
      );
    }) }) })
  ] }) });
}
function PollComposerDialog() {
  const {
    showPollDialog,
    setShowPollDialog,
    pollQuestion,
    setPollQuestion,
    pollChoices,
    setPollChoices,
    pollDuration,
    setPollDuration,
    createRoomPoll,
    handleCreatePollFromDialog
  } = useWatchRoomContext();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: showPollDialog, onOpenChange: (open) => {
    if (!open) setShowPollDialog(false);
  }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-md bg-background/60 backdrop-blur-2xl border-white/10 rounded-3xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { className: "flex items-center gap-2 font-semibold", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ListChecks, { className: "w-5 h-5 text-[hsl(var(--isshoni-accent))]" }),
      "Create a poll"
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs font-medium text-muted-foreground", children: "Question" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            value: pollQuestion,
            maxLength: 140,
            placeholder: "Ask the room…",
            onChange: (e) => setPollQuestion(e.target.value),
            className: "h-11 rounded-xl bg-white/5 border-white/10",
            autoFocus: true
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs font-medium text-muted-foreground", children: "Choices" }),
        pollChoices.map((choice, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              value: choice,
              maxLength: 80,
              placeholder: `Choice ${i + 1}`,
              onChange: (e) => setPollChoices((prev) => prev.map((c, idx) => idx === i ? e.target.value : c)),
              className: "h-11 rounded-xl bg-white/5 border-white/10"
            }
          ),
          pollChoices.length > 2 && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", "aria-label": "Remove choice", onClick: () => setPollChoices((prev) => prev.filter((_, idx) => idx !== i)), className: "text-muted-foreground hover:text-destructive", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" }) }),
          i === pollChoices.length - 1 && pollChoices.length < 4 && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", "aria-label": "Add choice", onClick: () => setPollChoices((prev) => [...prev, ""]), className: "text-[hsl(var(--isshoni-accent))] transition-colors hover:text-[hsl(var(--isshoni-accent)/0.8)]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-5 w-5" }) })
        ] }, i))
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-2 text-sm font-semibold tracking-tight", children: "Poll length" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-2", children: ["days", "hours", "minutes"].map((unit) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "mb-1 block text-xs font-medium text-muted-foreground capitalize", children: unit }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: String(pollDuration[unit]), onValueChange: (v) => setPollDuration((p) => ({ ...p, [unit]: Number(v) })), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "h-11 rounded-xl bg-white/5 border-white/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: POLL_DURATION[unit].map((n) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: String(n), children: n }, n)) })
          ] })
        ] }, unit)) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", onClick: () => setShowPollDialog(false), className: "rounded-full bg-white/5 border-white/10 hover:bg-white/10", children: "Cancel" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: handleCreatePollFromDialog, disabled: createRoomPoll.isPending, className: "gap-2 rounded-full bg-[hsl(var(--isshoni-accent))] font-bold text-black shadow-[0_0_15px_hsl(var(--isshoni-accent)/0.25)] hover:bg-[hsl(var(--isshoni-accent)/0.9)]", children: [
        createRoomPoll.isPending && /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin" }),
        "Start poll"
      ] })
    ] })
  ] }) });
}
function WatchRoomLayout() {
  const {
    loadingRoom,
    room,
    navigate,
    isModerator,
    isHost,
    isAdmin,
    isDesktopApp,
    prefersReducedMotion,
    showAnimeSearch,
    handleCloseAnimeSearch,
    handleAnimeSearchSelect
  } = useWatchRoomContext();
  if (loadingRoom) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-black flex flex-col items-center justify-center gap-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative grid h-20 w-20 place-items-center rounded-full border border-white/5 bg-white/[0.02]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 rounded-full bg-[hsl(var(--isshoni-accent)/0.2)] blur-xl animate-pulse" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "relative h-8 w-8 text-[hsl(var(--isshoni-accent))] animate-spin" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-bold uppercase tracking-widest text-muted-foreground/60 animate-pulse", children: "Joining Room..." })
    ] });
  }
  if (!room || !room.is_active) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-black flex items-center justify-center p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Background, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative max-w-md w-full p-10 text-center bg-white/[0.03] backdrop-blur-3xl border border-white/[0.08] rounded-[2rem] shadow-2xl animate-in zoom-in-95 fade-in duration-700", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto mb-6 grid h-20 w-20 place-items-center rounded-full bg-white/5 border border-white/10 shadow-inner", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MonitorOff, { className: "w-8 h-8 text-muted-foreground/60" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold mb-3 tracking-tight text-foreground/90", children: "Room Not Found" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-muted-foreground/70 mb-8 leading-relaxed", children: "This watch party may have ended, or the link is invalid. Let's find you another room to join." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            onClick: () => navigate("/isshoni"),
            className: "w-full rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/10 transition-all active:scale-95 h-12 font-semibold shadow-lg",
            children: "Browse Public Rooms"
          }
        )
      ] })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-black text-foreground overflow-y-auto font-sans animate-in fade-in duration-1000", style: isshoniAccentStyle, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Background, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Sidebar, {}),
    room.anime_poster && !prefersReducedMotion && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "aria-hidden": true, className: "fixed inset-0 -z-10 pointer-events-none transition-opacity duration-1000", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "img",
        {
          src: getProxiedImageUrl(room.anime_poster),
          alt: "",
          className: "h-full w-full scale-[1.15] object-cover opacity-20 blur-[100px] saturate-[1.5]"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-black/60 via-black/80 to-black/95" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.6)_100%)]" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: `relative z-10 ${isDesktopApp ? "pl-4" : "pl-4 md:pl-28"} pr-4 md:pr-6 py-4 pb-24 md:py-6 min-h-screen flex flex-col`, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(WatchRoomTopBar, {}),
      isHost && /* @__PURE__ */ jsxRuntimeExports.jsx(WatchRoomTimerBar, {}),
      isModerator && !isHost && !isAdmin ? (
        // RESTRICTED MODERATOR VIEW
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 flex flex-col items-center justify-center gap-6 py-16 px-4 animate-in fade-in zoom-in-95 duration-500", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md p-10 text-center bg-black/40 backdrop-blur-3xl border border-red-500/10 rounded-[2rem] shadow-[0_0_50px_rgba(239,68,68,0.05)]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto mb-6 grid h-20 w-20 place-items-center rounded-full bg-red-500/10 border border-red-500/20 shadow-inner", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-8 h-8 text-red-400/80" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold mb-3 tracking-tight text-foreground/90", children: "Restricted Access" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-muted-foreground/70 mb-8 leading-relaxed", children: "Moderators have restricted access to watch rooms. You cannot view the broadcast, participants, or chat." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              onClick: () => navigate("/isshoni"),
              variant: "outline",
              className: "w-full h-11 gap-2 rounded-full bg-white/5 border-white/10 hover:bg-white/10 text-foreground transition-all active:scale-95",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4" }),
                "Back to Watch Rooms"
              ]
            }
          )
        ] }) })
      ) : (
        // THEATER GRID (Stage + Info / Drawer)
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto flex min-h-0 w-full max-w-[1920px] flex-1 flex-col lg:flex-row lg:items-start gap-6 lg:gap-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-w-0 flex-1 flex-col gap-6 lg:gap-8 w-full", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full", children: /* @__PURE__ */ jsxRuntimeExports.jsx(WatchRoomStage, {}) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full", children: /* @__PURE__ */ jsxRuntimeExports.jsx(WatchRoomInfoBar, {}) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(WatchRoomDrawer, {})
        ] })
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(WatchRoomSettingsSheet, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      CustomVideoSourceModal,
      {
        isOpen: showAnimeSearch,
        onClose: handleCloseAnimeSearch,
        onSelect: handleAnimeSearchSelect
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(PasswordDialog, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(LibraryPickerDialog, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(PollComposerDialog, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(MobileNav, {})
  ] });
}
function WatchRoomPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(WatchRoomProvider, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(WatchRoomLayout, {}) });
}
export {
  WatchRoomPage as default
};
