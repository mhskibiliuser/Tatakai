import { r as reactExports, j as jsxRuntimeExports, L as Link, i as useParams, e as useNavigate } from "./react-vendor.CAo4XUiA.js";
import { fk as CommentContent, gf as CommentAttachments, f$ as CommentEmbeds, g6 as ModerationMenu, gl as useUserForumPostsStaff, dV as useUserTierLists, gm as useUserPlaylistsStaff, bX as formatBytes, B as Button, g3 as usePostPoll, e8 as extractHashtags, g7 as RichContent, gn as PostPollCard, go as PostImageGrid, gp as PostPlaylistEmbed, gq as PostTierlistEmbed, gr as PostWatchroomEmbed, gs as PostMediaEmbed, gt as deleteUserMedia, gu as listUserMedia, J as useConfirm, u as useAuth, gv as useAdminUserProfile, gw as useUserSessions, gx as useUserActivityCounts, gy as useUnbanUser, gz as useSetPrivilege, gA as useRevokeSession, gB as useRevokeAllSessions, gC as useSetStaffRole, gD as useBanDevice, gE as useBanIp, gF as useBanUserDevices, gG as useBanUserIps, gH as useSetStorageQuota, gI as useDeleteUserContent, G as GlassPanel, b1 as deriveIsAdmin, b0 as deriveIsModerator, a8 as Avatar, a9 as AvatarImage, aa as AvatarFallback, bA as Badge, aB as Switch, az as Input, gJ as BanUserDialog } from "./index.C6yfkT5T.js";
import { u as useQueryClient, a as useQuery } from "./tanstack.DPr3OB19.js";
import { bp as formatDistanceToNow, bf as ue, b_ as format } from "./vendor.CJyRs4QS.js";
import { b as useUserCommentsDetailed } from "./useUserCommentsDetailed.DTjSzD08.js";
import { u as useUserAchievements, a as useGrantAchievement, b as useRevokeAchievement, A as ACHIEVEMENTS } from "./useAchievements.BmMgkfY0.js";
import { y as MessageSquare, bh as FileText, aE as ListChecks, aU as ListMusic, a7 as Image, z as Award, H as Heart, m as Eye, J as Trash2, c as Check, P as Plus, Q as LoaderCircle, u as ArrowLeft, di as ShieldQuestion, ag as ShieldCheck, aV as Shield, dg as ShieldOff, _ as Ban, aD as Clock, c7 as MonitorSmartphone, a5 as Globe, bj as Activity, t as HardDrive, bs as Smartphone, bm as Wifi, ah as LogOut, az as Music2, aA as Layers } from "./icons.C2gBBarQ.js";
import "./supabase.WuRMX5Dg.js";
import "./radix.BiK9uYXL.js";
import "./motion.DVGLRFCH.js";
import "./hls.BlgtCWcq.js";
import "./editor.Dxw8dtyw.js";
import "./charts.Dr1fgDJ-.js";
const TABS = [
  { id: "comments", label: "Comments", icon: MessageSquare },
  { id: "posts", label: "Posts", icon: FileText },
  { id: "tierlists", label: "Tier lists", icon: ListChecks },
  { id: "playlists", label: "Playlists", icon: ListMusic },
  { id: "uploads", label: "Uploads", icon: Image },
  { id: "badges", label: "Badges", icon: Award }
];
function Spin() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center py-12", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-6 w-6 animate-spin text-primary/60" }) });
}
function Empty({ icon: Icon, text }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center py-12 text-muted-foreground", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "mb-3 h-8 w-8 opacity-40" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: text })
  ] });
}
function CommentsTab({ userId, userName }) {
  const { comments, isLoading } = useUserCommentsDetailed(userId);
  if (isLoading) return /* @__PURE__ */ jsxRuntimeExports.jsx(Spin, {});
  if (!comments.length) return /* @__PURE__ */ jsxRuntimeExports.jsx(Empty, { icon: MessageSquare, text: "No comments." });
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: comments.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-lg border border-white/5 bg-white/[0.02] p-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
      c.is_spoiler && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mb-1 inline-block rounded-full bg-amber-500/20 px-2 py-0.5 text-[10px] text-amber-400", children: "Spoiler" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CommentContent, { content: c.content, clamp: true, className: "mb-2" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CommentAttachments, { attachments: c.attachments, className: "mb-2" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CommentEmbeds, { embeds: c.embeds, poll: c.poll }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-2 text-xs text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: c.target, className: "hover:text-primary", children: c.title }),
        c.hasEpisode && " • Episode",
        " · ",
        formatDistanceToNow(new Date(c.created_at), { addSuffix: true })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ModerationMenu, { contentType: "comment", contentId: c.id, authorUserId: userId, authorName: userName })
  ] }) }, c.id)) });
}
function PostRow({ post, userId, userName }) {
  const { data: poll } = usePostPoll(post.id);
  const meta = post.metadata || {};
  const gif = typeof meta.gif_url === "string" ? meta.gif_url : null;
  const images = Array.isArray(meta.images) && meta.images.length ? meta.images : post.image_url ? [post.image_url] : [];
  const mediaType = meta.media_type || (post.anime_id ? "anime" : null);
  const watchRoomId = typeof meta.watch_room_id === "string" ? meta.watch_room_id : null;
  const hashtags = extractHashtags(post.content || "").slice(0, 6);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-lg border border-white/5 bg-white/[0.02] p-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-1 flex flex-wrap items-center gap-1.5", children: [
        !post.is_approved && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full bg-orange-500/20 px-2 py-0.5 text-[10px] text-orange-400", children: "Pending approval" }),
        post.is_pinned && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full bg-primary/20 px-2 py-0.5 text-[10px] text-primary", children: "Pinned" }),
        post.is_spoiler && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full bg-amber-500/20 px-2 py-0.5 text-[10px] text-amber-400", children: "Spoiler" }),
        post.is_nsfw && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full bg-rose-500/20 px-2 py-0.5 text-[10px] text-rose-400", children: "NSFW" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: `/community/forum/${post.id}`, className: "font-medium hover:text-primary", children: post.title || "Untitled post" }),
      post.content && /* @__PURE__ */ jsxRuntimeExports.jsx(RichContent, { html: post.content, className: "mt-1 text-sm text-foreground/90" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 space-y-2", children: [
        poll && /* @__PURE__ */ jsxRuntimeExports.jsx(PostPollCard, { poll }),
        gif ? /* @__PURE__ */ jsxRuntimeExports.jsx(PostImageGrid, { images: [gif], spoiler: post.is_spoiler }) : images.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(PostImageGrid, { images, spoiler: post.is_spoiler }) : null,
        post.playlist_id && /* @__PURE__ */ jsxRuntimeExports.jsx(PostPlaylistEmbed, { playlistId: post.playlist_id }),
        post.tierlist_id && /* @__PURE__ */ jsxRuntimeExports.jsx(PostTierlistEmbed, { tierlistId: post.tierlist_id }),
        watchRoomId && /* @__PURE__ */ jsxRuntimeExports.jsx(PostWatchroomEmbed, { roomId: watchRoomId }),
        post.anime_id && post.anime_name && /* @__PURE__ */ jsxRuntimeExports.jsx(PostMediaEmbed, { id: post.anime_id, name: post.anime_name, poster: post.anime_poster, type: mediaType || "anime", variant: "pill" })
      ] }),
      (post.flair || hashtags.length > 0) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 flex flex-wrap items-center gap-1.5", children: [
        post.flair && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-md border border-white/10 bg-white/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white/80", children: post.flair }),
        hashtags.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "rounded-md border border-primary/25 bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary", children: [
          "#",
          t
        ] }, t))
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-xs text-muted-foreground", children: formatDistanceToNow(new Date(post.created_at), { addSuffix: true }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ModerationMenu, { contentType: "forum_post", contentId: post.id, authorUserId: userId, authorName: userName, showPauseComments: true })
  ] }) });
}
function PostsTab({ userId, userName }) {
  const { data: posts = [], isLoading } = useUserForumPostsStaff(userId);
  if (isLoading) return /* @__PURE__ */ jsxRuntimeExports.jsx(Spin, {});
  if (!posts.length) return /* @__PURE__ */ jsxRuntimeExports.jsx(Empty, { icon: FileText, text: "No forum posts." });
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: posts.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx(PostRow, { post: p, userId, userName }, p.id)) });
}
function TierlistsTab({ userId, userName }) {
  const { data: lists = [], isLoading } = useUserTierLists(userId);
  if (isLoading) return /* @__PURE__ */ jsxRuntimeExports.jsx(Spin, {});
  if (!lists.length) return /* @__PURE__ */ jsxRuntimeExports.jsx(Empty, { icon: ListChecks, text: "No tier lists." });
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-3 sm:grid-cols-2", children: lists.map((l) => {
    var _a;
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3 rounded-lg border border-white/5 bg-white/[0.02] p-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate font-medium", children: l.title || l.name }),
          !l.is_public && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full bg-white/10 px-2 py-0.5 text-[10px] text-muted-foreground", children: "Private" })
        ] }),
        l.description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 line-clamp-2 text-sm text-muted-foreground", children: l.description }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 flex items-center gap-3 text-xs text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            ((_a = l.items) == null ? void 0 : _a.length) ?? 0,
            " items"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: "h-3 w-3" }),
            " ",
            l.likes_count ?? 0
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "h-3 w-3" }),
            " ",
            l.views_count ?? 0
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ModerationMenu, { contentType: "tier_list", contentId: l.id, authorUserId: userId, authorName: userName })
    ] }, l.id);
  }) });
}
function PlaylistsTab({ userId, userName }) {
  const { data: lists = [], isLoading } = useUserPlaylistsStaff(userId);
  if (isLoading) return /* @__PURE__ */ jsxRuntimeExports.jsx(Spin, {});
  if (!lists.length) return /* @__PURE__ */ jsxRuntimeExports.jsx(Empty, { icon: ListMusic, text: "No playlists." });
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-3 sm:grid-cols-2", children: lists.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3 rounded-lg border border-white/5 bg-white/[0.02] p-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-w-0 flex-1 items-start gap-3", children: [
      p.cover_image && /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: p.cover_image, alt: "", className: "h-14 w-14 shrink-0 rounded-md object-cover" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate font-medium", children: p.name }),
          !p.is_public && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full bg-white/10 px-2 py-0.5 text-[10px] text-muted-foreground", children: "Private" }),
          p.is_flagged && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full bg-rose-500/20 px-2 py-0.5 text-[10px] text-rose-400", children: "Flagged" })
        ] }),
        p.description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 line-clamp-2 text-sm text-muted-foreground", children: p.description }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 flex items-center gap-3 text-xs text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            p.items_count ?? 0,
            " items"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: "h-3 w-3" }),
            " ",
            p.likes_count ?? 0
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ModerationMenu, { contentType: "playlist", contentId: p.id, authorUserId: userId, authorName: userName })
  ] }, p.id)) });
}
function UploadsTab({ userId }) {
  const qc = useQueryClient();
  const { data: files = [], isLoading } = useQuery({
    queryKey: ["admin-user-media", userId],
    queryFn: () => listUserMedia(userId),
    enabled: !!userId
  });
  const remove = async (f) => {
    try {
      await deleteUserMedia({ bucket: f.bucket, path: f.path });
      qc.setQueryData(
        ["admin-user-media", userId],
        (prev) => (prev ?? []).filter((x) => !(x.bucket === f.bucket && x.path === f.path))
      );
      ue.success("File deleted");
    } catch (err) {
      ue.error("Failed to delete: " + ((err == null ? void 0 : err.message) ?? "unknown error"));
    }
  };
  if (isLoading) return /* @__PURE__ */ jsxRuntimeExports.jsx(Spin, {});
  if (!files.length) return /* @__PURE__ */ jsxRuntimeExports.jsx(Empty, { icon: Image, text: "No uploads." });
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4", children: files.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "group relative overflow-hidden rounded-lg border border-white/5 bg-white/[0.02]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: f.url, target: "_blank", rel: "noreferrer", className: "block aspect-square", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: f.url, alt: f.name, className: "h-full w-full object-cover", loading: "lazy" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2 p-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate text-[11px] text-muted-foreground", children: formatBytes(f.size ?? 0) ?? "—" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          variant: "ghost",
          size: "icon",
          className: "h-7 w-7 text-rose-400 hover:bg-rose-400/10 hover:text-rose-400",
          onClick: () => remove(f),
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3.5 w-3.5" })
        }
      )
    ] })
  ] }, `${f.bucket}/${f.path}`)) });
}
function BadgesTab({ userId }) {
  const { data: granted = [], isLoading } = useUserAchievements(userId);
  const grant = useGrantAchievement();
  const revoke = useRevokeAchievement();
  const grantedIds = new Set(granted.map((g) => g.achievement_id));
  const toggle = async (id, has) => {
    try {
      if (has) await revoke.mutateAsync({ userId, achievementId: id });
      else await grant.mutateAsync({ userId, achievementId: id });
      ue.success(has ? "Badge revoked" : "Badge granted");
    } catch (err) {
      ue.error("Failed: " + ((err == null ? void 0 : err.message) ?? "unknown error"));
    }
  };
  if (isLoading) return /* @__PURE__ */ jsxRuntimeExports.jsx(Spin, {});
  const busy = grant.isPending || revoke.isPending;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-2 sm:grid-cols-2", children: ACHIEVEMENTS.map((a) => {
    const has = grantedIds.has(a.id);
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3 rounded-lg border border-white/5 bg-white/[0.02] p-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Award, { className: `h-4 w-4 shrink-0 ${has ? "text-amber-400" : "text-muted-foreground/40"}` }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate text-sm font-medium", children: a.title })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-0.5 text-xs text-muted-foreground", children: a.description })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          variant: has ? "ghost" : "outline",
          size: "sm",
          disabled: busy,
          className: has ? "gap-1.5 text-rose-400 hover:bg-rose-400/10 hover:text-rose-400" : "gap-1.5",
          onClick: () => toggle(a.id, has),
          children: has ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-3.5 w-3.5" }),
            " Granted"
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-3.5 w-3.5" }),
            " Grant"
          ] })
        }
      )
    ] }, a.id);
  }) });
}
function AdminUserTabs({ userId, userName }) {
  const [tab, setTab] = reactExports.useState("comments");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-4 flex flex-wrap gap-1 rounded-xl border border-white/5 bg-white/[0.02] p-1", children: TABS.map(({ id, label, icon: Icon }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        onClick: () => setTab(id),
        className: `flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${tab === id ? "bg-primary/20 text-primary" : "text-muted-foreground hover:bg-white/[0.04] hover:text-foreground"}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-4 w-4" }),
          " ",
          label
        ]
      },
      id
    )) }),
    tab === "comments" && /* @__PURE__ */ jsxRuntimeExports.jsx(CommentsTab, { userId, userName }),
    tab === "posts" && /* @__PURE__ */ jsxRuntimeExports.jsx(PostsTab, { userId, userName }),
    tab === "tierlists" && /* @__PURE__ */ jsxRuntimeExports.jsx(TierlistsTab, { userId, userName }),
    tab === "playlists" && /* @__PURE__ */ jsxRuntimeExports.jsx(PlaylistsTab, { userId, userName }),
    tab === "uploads" && /* @__PURE__ */ jsxRuntimeExports.jsx(UploadsTab, { userId }),
    tab === "badges" && /* @__PURE__ */ jsxRuntimeExports.jsx(BadgesTab, { userId })
  ] });
}
const PRIVILEGES = [
  { key: "can_comment", label: "Comment", hint: "Post comments anywhere" },
  { key: "can_post", label: "Post", hint: "Create forum / community posts" },
  { key: "can_tierlist", label: "Tier lists", hint: "Create tier lists" },
  { key: "can_upload", label: "Upload", hint: "Upload to user media" },
  { key: "can_access_community", label: "Community", hint: "Access community features" }
];
function fmtWatch(seconds) {
  const s = seconds ?? 0;
  const h = Math.floor(s / 3600);
  if (h >= 1) return `${h.toLocaleString()}h`;
  return `${Math.floor(s / 60)}m`;
}
function StatCard({ icon: Icon, label, value }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassPanel, { className: "p-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-4 w-4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs uppercase tracking-wide", children: label })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-2xl font-bold tabular-nums", children: value })
  ] });
}
function AdminUserPage() {
  var _a;
  const { userId } = useParams();
  const navigate = useNavigate();
  const confirm = useConfirm();
  const { isAdmin: viewerIsAdmin, isModerator: viewerIsModerator } = useAuth();
  const { data: profile, isLoading, isError } = useAdminUserProfile(userId);
  const { data: sessions = [] } = useUserSessions(userId);
  const { data: activity } = useUserActivityCounts(userId);
  const unban = useUnbanUser();
  const setPriv = useSetPrivilege();
  const revokeSession = useRevokeSession();
  const revokeAll = useRevokeAllSessions();
  const setStaffRole = useSetStaffRole();
  const banDevice = useBanDevice();
  const banIp = useBanIp();
  const banAllDevices = useBanUserDevices();
  const banAllIps = useBanUserIps();
  const setQuota = useSetStorageQuota();
  const deleteContent = useDeleteUserContent();
  const [banOpen, setBanOpen] = reactExports.useState(false);
  const [quotaMb, setQuotaMb] = reactExports.useState("");
  if (!userId) return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-8", children: "Invalid user id" });
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-[60vh] items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-8 w-8 animate-spin text-primary/60" }) });
  }
  if (isError || !profile) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-3xl p-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "ghost", onClick: () => navigate("/admin"), className: "mb-6 gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" }),
        " Admin"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassPanel, { className: "p-12 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldQuestion, { className: "mx-auto mb-3 h-10 w-10 text-muted-foreground/50" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "User not found or profile is inaccessible." })
      ] })
    ] });
  }
  const name = profile.display_name || profile.username || "User";
  const roleLabel = profile.is_admin ? "Admin" : profile.is_moderator ? "Moderator" : profile.role || "user";
  const lastLogin = profile.last_login_at ?? profile.last_seen ?? null;
  const togglePriv = async (key, enabled) => {
    try {
      await setPriv.mutateAsync({ userId, privilege: key, enabled });
      ue.success(`${enabled ? "Enabled" : "Disabled"} ${key.replace("can_", "")}`);
    } catch (err) {
      ue.error("Failed: " + ((err == null ? void 0 : err.message) ?? "unknown error"));
    }
  };
  const handleUnban = async () => {
    if (!await confirm({ title: `Unban ${name}?` })) return;
    try {
      await unban.mutateAsync(userId);
      ue.success("User unbanned");
    } catch (err) {
      ue.error("Failed to unban: " + ((err == null ? void 0 : err.message) ?? "unknown error"));
    }
  };
  const handleRevokeAll = async () => {
    if (!await confirm({ title: "Revoke all sessions?", description: "The user will be signed out on every device.", destructive: true })) return;
    try {
      const n = await revokeAll.mutateAsync(userId);
      ue.success(`Revoked ${n ?? ""} session(s)`.trim());
    } catch (err) {
      ue.error("Failed: " + ((err == null ? void 0 : err.message) ?? "unknown error"));
    }
  };
  const activeSessions = sessions.filter((s) => !s.revoked_at);
  const isAdmin = deriveIsAdmin(profile);
  const isModerator = deriveIsModerator(profile);
  const toggleRole = async (role, enabled) => {
    if (!await confirm({
      title: `${enabled ? "Grant" : "Revoke"} ${role} for ${name}?`,
      destructive: !enabled
    })) return;
    try {
      await setStaffRole.mutateAsync({ userId, role, enabled });
      ue.success(`${enabled ? "Granted" : "Revoked"} ${role}`);
    } catch (err) {
      ue.error("Failed: " + ((err == null ? void 0 : err.message) ?? "unknown error"));
    }
  };
  const handleBanAllDevices = async () => {
    if (!await confirm({ title: "Ban all devices?", description: "Every device id linked to this user is blocked.", destructive: true })) return;
    try {
      const n = await banAllDevices.mutateAsync({ userId });
      ue.success(`Banned ${n} device(s)`);
    } catch (err) {
      ue.error("Failed: " + ((err == null ? void 0 : err.message) ?? "unknown error"));
    }
  };
  const handleBanAllIps = async () => {
    if (!await confirm({ title: "Ban all IPs?", description: "Every IP known for this user is blocked.", destructive: true })) return;
    try {
      const n = await banAllIps.mutateAsync({ userId });
      ue.success(`Banned ${n} IP(s)`);
    } catch (err) {
      ue.error("Failed: " + ((err == null ? void 0 : err.message) ?? "unknown error"));
    }
  };
  const handleBanDevice = async (deviceId) => {
    if (!deviceId) {
      ue.error("No device id on this session");
      return;
    }
    if (!await confirm({ title: "Ban this device?", destructive: true })) return;
    try {
      await banDevice.mutateAsync({ deviceId, targetUserId: userId });
      ue.success("Device banned");
    } catch (err) {
      ue.error("Failed: " + ((err == null ? void 0 : err.message) ?? "unknown error"));
    }
  };
  const handleBanIp = async (ip) => {
    if (!ip) {
      ue.error("No IP on this session");
      return;
    }
    if (!await confirm({ title: "Ban this IP?", destructive: true })) return;
    try {
      await banIp.mutateAsync({ ip, targetUserId: userId });
      ue.success("IP banned");
    } catch (err) {
      ue.error("Failed: " + ((err == null ? void 0 : err.message) ?? "unknown error"));
    }
  };
  const DEFAULT_QUOTA_BYTES = 26214400;
  const quotaBytes = profile.storage_quota_bytes ?? DEFAULT_QUOTA_BYTES;
  const usedBytes = profile.storage_used_bytes ?? 0;
  const usedPct = quotaBytes > 0 ? Math.min(100, Math.round(usedBytes / quotaBytes * 100)) : 0;
  const handleSetQuota = async () => {
    const mb = parseFloat(quotaMb);
    if (!Number.isFinite(mb) || mb < 0) {
      ue.error("Enter a valid size in MB");
      return;
    }
    try {
      await setQuota.mutateAsync({ userId, bytes: Math.round(mb * 1024 * 1024) });
      ue.success(`Upload limit set to ${mb} MB`);
      setQuotaMb("");
    } catch (err) {
      ue.error("Failed to set limit: " + ((err == null ? void 0 : err.message) ?? "unknown error"));
    }
  };
  const isStaff = viewerIsAdmin || viewerIsModerator;
  const handleDeleteContent = async (scope) => {
    const label = {
      comments: "all comments",
      posts: "all forum / community posts",
      playlists: "all playlists",
      tierlists: "all tier lists",
      all: "ALL content (comments, posts, playlists and tier lists)"
    };
    if (!await confirm({
      title: `Delete ${label[scope]} by ${name}?`,
      description: "Comments and posts are removed but their thread structure is kept; playlists and tier lists are deleted permanently. This cannot be undone.",
      confirmLabel: "Delete",
      destructive: true
    })) return;
    try {
      const r = await deleteContent.mutateAsync({ userId, scope });
      const parts = [];
      if (r.comments) parts.push(`${r.comments} comment(s)`);
      if (r.posts) parts.push(`${r.posts} post(s)`);
      if (r.playlists) parts.push(`${r.playlists} playlist(s)`);
      if (r.tierlists) parts.push(`${r.tierlists} tier list(s)`);
      ue.success(parts.length ? `Deleted ${parts.join(", ")}.` : "Nothing to delete.");
    } catch (err) {
      ue.error("Failed to delete: " + ((err == null ? void 0 : err.message) ?? "unknown error"));
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-5xl p-4 md:p-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6 flex flex-wrap items-center justify-between gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "ghost", onClick: () => navigate("/admin"), className: "gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" }),
        " Admin"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: isModerator ? "secondary" : "outline",
            size: "sm",
            disabled: setStaffRole.isPending || isAdmin,
            onClick: () => toggleRole("moderator", !isModerator),
            className: "gap-2",
            title: isAdmin ? "Admins are always moderators" : void 0,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "h-4 w-4" }),
              " ",
              isModerator ? "Moderator" : "Make moderator"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: isAdmin ? "secondary" : "outline",
            size: "sm",
            disabled: setStaffRole.isPending,
            onClick: () => toggleRole("admin", !isAdmin),
            className: "gap-2",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "h-4 w-4" }),
              " ",
              isAdmin ? "Admin" : "Make admin"
            ]
          }
        ),
        profile.is_banned ? /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", onClick: handleUnban, disabled: unban.isPending, className: "gap-2", children: [
          unban.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldOff, { className: "h-4 w-4" }),
          "Unban"
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "destructive", onClick: () => setBanOpen(true), className: "gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Ban, { className: "h-4 w-4" }),
          " Ban user"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassPanel, { className: "mb-6 p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-start gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Avatar, { className: "h-20 w-20 ring-2 ring-white/10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarImage, { src: profile.avatar_url || void 0, className: "object-cover" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarFallback, { className: "bg-gradient-to-br from-primary/60 to-secondary/60 text-xl font-bold", children: ((_a = name[0]) == null ? void 0 : _a.toUpperCase()) || "U" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold", children: name }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: profile.is_admin || profile.is_moderator ? "default" : "secondary", className: "gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "h-3 w-3" }),
              " ",
              roleLabel
            ] }),
            profile.is_banned && /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "destructive", className: "gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Ban, { className: "h-3 w-3" }),
              " Banned"
            ] })
          ] }),
          profile.username && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
            "@",
            profile.username
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 break-all font-mono text-[11px] text-muted-foreground/60", children: profile.user_id }),
          profile.is_banned && profile.ban_reason && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-2 rounded-md bg-destructive/10 px-3 py-1.5 text-xs text-destructive", children: [
            "Ban reason: ",
            profile.ban_reason
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 grid grid-cols-2 gap-4 border-t border-white/5 pt-4 text-sm sm:grid-cols-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-wide text-muted-foreground", children: "Joined" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: profile.created_at ? format(new Date(profile.created_at), "PP") : "—" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "flex items-center gap-1 text-xs uppercase tracking-wide text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-3 w-3" }),
            " Last login"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: lastLogin ? formatDistanceToNow(new Date(lastLogin), { addSuffix: true }) : "—" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "flex items-center gap-1 text-xs uppercase tracking-wide text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MonitorSmartphone, { className: "h-3 w-3" }),
            " Device"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate font-medium", children: profile.device_name ?? profile.device_id ?? "—" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "flex items-center gap-1 text-xs uppercase tracking-wide text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { className: "h-3 w-3" }),
            " Country"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: profile.country || "—" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { icon: MessageSquare, label: "Comments", value: ((activity == null ? void 0 : activity.comments) ?? 0).toLocaleString() }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { icon: FileText, label: "Posts", value: ((activity == null ? void 0 : activity.posts) ?? 0).toLocaleString() }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { icon: Activity, label: "Visits (30d)", value: ((activity == null ? void 0 : activity.visits30d) ?? 0).toLocaleString() }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { icon: Clock, label: "Watch time", value: fmtWatch(profile.total_watch_time_seconds) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassPanel, { className: "mb-6 p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mb-4 text-lg font-semibold", children: "Privileges" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1", children: PRIVILEGES.map(({ key, label, hint }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between rounded-lg px-2 py-2.5 hover:bg-white/[0.03]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium", children: label }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: hint })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Switch,
          {
            checked: profile[key],
            disabled: setPriv.isPending,
            onCheckedChange: (v) => togglePriv(key, v)
          }
        )
      ] }, key)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-xs text-muted-foreground/70", children: "Turning a privilege off blocks the action at the database layer (RESTRICTIVE RLS)." })
    ] }),
    viewerIsAdmin && /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassPanel, { className: "mb-6 p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(HardDrive, { className: "h-5 w-5 text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-semibold", children: "Upload limit" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-3 flex items-center justify-between text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground", children: [
          formatBytes(usedBytes) ?? "0 B",
          " used of ",
          formatBytes(quotaBytes) ?? "—"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "tabular-nums text-muted-foreground/70", children: [
          usedPct,
          "%"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-4 h-2 overflow-hidden rounded-full bg-white/5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: `h-full rounded-full ${usedPct >= 90 ? "bg-rose-500" : "bg-primary"}`,
          style: { width: `${usedPct}%` }
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-end gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "mb-1 block text-xs uppercase tracking-wide text-muted-foreground", children: "New limit (MB)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              type: "number",
              min: 0,
              step: "1",
              inputMode: "decimal",
              placeholder: String(Math.round(quotaBytes / (1024 * 1024))),
              value: quotaMb,
              onChange: (e) => setQuotaMb(e.target.value)
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: handleSetQuota, disabled: setQuota.isPending || !quotaMb, className: "gap-2", children: [
          setQuota.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(HardDrive, { className: "h-4 w-4" }),
          "Set limit"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-xs text-muted-foreground/70", children: "Sets this user's total upload storage cap. Requires the storage-quota migration to be applied." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassPanel, { className: "mb-6 p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 flex flex-wrap items-center justify-between gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-lg font-semibold", children: [
          "Sessions ",
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-normal text-muted-foreground", children: [
            "(",
            activeSessions.length,
            " active)"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", size: "sm", onClick: handleBanAllDevices, disabled: banAllDevices.isPending, className: "gap-2", children: [
            banAllDevices.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Smartphone, { className: "h-4 w-4" }),
            "Ban all devices"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", size: "sm", onClick: handleBanAllIps, disabled: banAllIps.isPending, className: "gap-2", children: [
            banAllIps.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Wifi, { className: "h-4 w-4" }),
            "Ban all IPs"
          ] }),
          activeSessions.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", size: "sm", onClick: handleRevokeAll, disabled: revokeAll.isPending, className: "gap-2", children: [
            revokeAll.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "h-4 w-4" }),
            "Revoke all"
          ] })
        ] })
      ] }),
      sessions.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "py-6 text-center text-sm text-muted-foreground", children: "No session records. The session-tracking migration may not be applied yet." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: sessions.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `flex flex-wrap items-center justify-between gap-3 rounded-lg border border-white/5 bg-white/[0.02] p-3 ${s.revoked_at ? "opacity-50" : ""}`, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm font-medium", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MonitorSmartphone, { className: "h-4 w-4 shrink-0 text-muted-foreground" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: s.device_name || "Unknown device" }),
            s.revoked_at && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "text-[10px]", children: "Revoked" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-0.5 truncate text-xs text-muted-foreground", children: [
            s.ip_address || "no ip",
            " · ",
            s.user_agent || "unknown agent"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[11px] text-muted-foreground/60", children: [
            "Last seen ",
            formatDistanceToNow(new Date(s.last_seen_at), { addSuffix: true })
          ] })
        ] }),
        !s.revoked_at && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "ghost",
              size: "sm",
              className: "gap-1.5 text-amber-400 hover:bg-amber-400/10 hover:text-amber-400",
              disabled: banDevice.isPending || !s.device_id,
              onClick: () => handleBanDevice(s.device_id),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Smartphone, { className: "h-3.5 w-3.5" }),
                " Ban device"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "ghost",
              size: "sm",
              className: "gap-1.5 text-amber-400 hover:bg-amber-400/10 hover:text-amber-400",
              disabled: banIp.isPending || !s.ip_address,
              onClick: () => handleBanIp(s.ip_address),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Wifi, { className: "h-3.5 w-3.5" }),
                " Ban IP"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "ghost",
              size: "sm",
              className: "text-rose-400 hover:bg-rose-400/10 hover:text-rose-400",
              disabled: revokeSession.isPending,
              onClick: async () => {
                if (await confirm({ title: "Revoke this session?", destructive: true })) {
                  try {
                    await revokeSession.mutateAsync({ sessionId: s.id, userId });
                    ue.success("Session revoked");
                  } catch (err) {
                    ue.error("Failed: " + ((err == null ? void 0 : err.message) ?? "unknown error"));
                  }
                }
              },
              children: "Revoke"
            }
          )
        ] })
      ] }, s.id)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassPanel, { className: "mb-6 p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mb-4 text-lg font-semibold", children: "Content" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(AdminUserTabs, { userId, userName: name })
    ] }),
    isStaff && /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassPanel, { className: "mb-6 border-rose-500/20 p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-1 flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-5 w-5 text-rose-400" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-semibold text-rose-300", children: "Danger zone — bulk delete" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-4 text-xs text-muted-foreground", children: "Remove all of one kind of this user's content at once. Comments and posts keep their thread structure (soft delete); playlists and tier lists are deleted permanently." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", size: "sm", disabled: deleteContent.isPending, onClick: () => handleDeleteContent("comments"), className: "gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "h-4 w-4" }),
          " Comments"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", size: "sm", disabled: deleteContent.isPending, onClick: () => handleDeleteContent("posts"), className: "gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-4 w-4" }),
          " Posts"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", size: "sm", disabled: deleteContent.isPending, onClick: () => handleDeleteContent("playlists"), className: "gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Music2, { className: "h-4 w-4" }),
          " Playlists"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", size: "sm", disabled: deleteContent.isPending, onClick: () => handleDeleteContent("tierlists"), className: "gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Layers, { className: "h-4 w-4" }),
          " Tier lists"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "destructive", size: "sm", disabled: deleteContent.isPending, onClick: () => handleDeleteContent("all"), className: "gap-2", children: [
          deleteContent.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" }),
          "Delete everything"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(BanUserDialog, { open: banOpen, onOpenChange: setBanOpen, userId, userName: name })
  ] });
}
export {
  AdminUserPage as default
};
