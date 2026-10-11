import { r as reactExports, j as jsxRuntimeExports } from "./react-vendor.CAo4XUiA.js";
import { bf as ue } from "./vendor.CJyRs4QS.js";
import { u as useAuth, dG as useCommunityRulesGate, dT as useCreateForumPost, dU as useCreatePostPoll, at as usePlaylists, dV as useUserTierLists, aT as useUserWatchRooms, dW as useCommunities, G as GlassPanel, a8 as Avatar, a9 as AvatarImage, aa as AvatarFallback, dX as RichEditor, l as getProxiedImageUrl, az as Input, aV as Select, aW as SelectTrigger, aX as SelectValue, aY as SelectContent, aZ as SelectItem, j as cn, dY as ImagePicker, dZ as GifPicker, d_ as MediaPicker, B as Button, d$ as dragHasFiles, e0 as imageFileFromTransfer, T as triggerHaptic, e1 as mapUgcError, e2 as validateImageFile, e3 as uploadUserMedia, e4 as Popover, e5 as PopoverTrigger, e6 as PopoverContent, a2 as supabase, e7 as extractMentions, e8 as extractHashtags } from "./index.C6yfkT5T.js";
import { Q as LoaderCircle, X, a7 as Image, P as Plus, Z as Film, aE as ListChecks, az as Music2, aA as Layers, n as Radio, U as Users, ay as Tv, T as TriangleAlert } from "./icons.C2gBBarQ.js";
const DURATION = {
  days: Array.from({ length: 8 }, (_, i) => i),
  hours: Array.from({ length: 24 }, (_, i) => i),
  minutes: Array.from({ length: 60 }, (_, i) => i)
};
const MAX_IMAGES = 4;
function deriveTitle(content, fallback) {
  const firstLine = content.trim().split("\n")[0] || "";
  return firstLine ? firstLine.slice(0, 120) : fallback;
}
function extractFromHtml(html) {
  const userIds = /* @__PURE__ */ new Set();
  const tags = /* @__PURE__ */ new Set();
  try {
    const doc = new DOMParser().parseFromString(html, "text/html");
    doc.querySelectorAll("[data-mention]").forEach((el) => {
      const id = el.getAttribute("data-user-id");
      if (id) userIds.add(id);
    });
    doc.querySelectorAll("[data-hashtag]").forEach((el) => {
      const t = (el.getAttribute("data-tag") || "").toLowerCase();
      if (t) tags.add(t);
    });
    extractHashtags(doc.body.textContent || "").forEach((t) => tags.add(t));
  } catch {
  }
  return { userIds: [...userIds], tags: [...tags] };
}
async function persistTagsAndMentions(postId, html, plain) {
  const db = supabase;
  const { userIds, tags } = extractFromHtml(html);
  if (tags.length) {
    try {
      await db.from("post_hashtags").insert(tags.map((tag) => ({ post_id: postId, tag })));
    } catch {
    }
    try {
      await db.rpc("bump_tag_interest", { p_tags: tags });
    } catch {
    }
  }
  for (const uid of userIds) {
    try {
      await db.rpc("notify_mention", { target_user_id: uid, p_post_id: postId });
    } catch {
    }
  }
  const typed = extractMentions(plain);
  if (typed.length) {
    try {
      const { data: users } = await supabase.from("profiles").select("user_id, username").in("username", typed);
      for (const u of users || []) {
        if (userIds.includes(u.user_id)) continue;
        await db.rpc("notify_mention", { target_user_id: u.user_id, p_post_id: postId });
      }
    } catch {
    }
  }
}
function PostComposer({ onPosted, defaultCommunityId, defaultMedia }) {
  var _a, _b, _c, _d, _e;
  const { user, profile } = useAuth();
  const ensureAgreed = useCommunityRulesGate();
  const createPost = useCreateForumPost();
  const createPoll = useCreatePostPoll();
  const [content, setContent] = reactExports.useState("");
  const [title, setTitle] = reactExports.useState("");
  const [poll, setPoll] = reactExports.useState(null);
  const [gifUrl, setGifUrl] = reactExports.useState(null);
  const [imageUrls, setImageUrls] = reactExports.useState([]);
  const [playlistId, setPlaylistId] = reactExports.useState(null);
  const [tierlistId, setTierlistId] = reactExports.useState(null);
  const [watchRoomId, setWatchRoomId] = reactExports.useState(null);
  const [communityId, setCommunityId] = reactExports.useState(defaultCommunityId ?? null);
  const [media, setMedia] = reactExports.useState(defaultMedia ?? null);
  const [isSpoiler, setIsSpoiler] = reactExports.useState(false);
  const [submitting, setSubmitting] = reactExports.useState(false);
  const [dropActive, setDropActive] = reactExports.useState(false);
  const [intakeBusy, setIntakeBusy] = reactExports.useState(false);
  const editorRef = reactExports.useRef(null);
  const pollImgRef = reactExports.useRef(null);
  const pollImgIdx = reactExports.useRef(-1);
  const { data: playlists = [] } = usePlaylists();
  const { data: tierlists = [] } = useUserTierLists(user == null ? void 0 : user.id);
  const { data: rooms = [] } = useUserWatchRooms();
  const { data: communities = [] } = useCommunities();
  if (!user) return null;
  const reset = () => {
    var _a2;
    setContent("");
    setTitle("");
    (_a2 = editorRef.current) == null ? void 0 : _a2.clear();
    setPoll(null);
    setGifUrl(null);
    setImageUrls([]);
    setPlaylistId(null);
    setTierlistId(null);
    setWatchRoomId(null);
    setCommunityId(defaultCommunityId ?? null);
    setMedia(defaultMedia ?? null);
    setIsSpoiler(false);
  };
  const handleImagePick = (url) => {
    if (imageUrls.length >= MAX_IMAGES) {
      ue.error(`Up to ${MAX_IMAGES} images per post`);
      return;
    }
    setGifUrl(null);
    setImageUrls((prev) => [...prev, url]);
  };
  const uploadImage = async (file) => {
    const { url } = await uploadUserMedia(file, user.id, "forum_image");
    return url;
  };
  const intakeImageFile = async (file) => {
    if (imageUrls.length >= MAX_IMAGES) {
      ue.error(`Up to ${MAX_IMAGES} images per post`);
      return;
    }
    const err = validateImageFile(file);
    if (err) {
      ue.error(err);
      return;
    }
    setIntakeBusy(true);
    try {
      const url = await uploadImage(file);
      setGifUrl(null);
      setImageUrls((prev) => prev.length >= MAX_IMAGES ? prev : [...prev, url]);
    } catch (e) {
      ue.error("Upload failed", { description: e instanceof Error ? e.message : void 0 });
    } finally {
      setIntakeBusy(false);
    }
  };
  const handlePollImageSelect = async (e) => {
    var _a2;
    const file = (_a2 = e.target.files) == null ? void 0 : _a2[0];
    const idx = pollImgIdx.current;
    if (pollImgRef.current) pollImgRef.current.value = "";
    if (!file || idx < 0) return;
    if (!file.type.startsWith("image/")) {
      ue.error("Please select an image file");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      ue.error("Each image must be under 5MB");
      return;
    }
    try {
      const url = await uploadImage(file);
      setPoll((p) => p ? { ...p, choices: p.choices.map((c, i) => i === idx ? { ...c, image: url } : c) } : p);
    } catch (err) {
      ue.error("Failed to upload image", { description: err instanceof Error ? err.message : void 0 });
    }
  };
  const togglePoll = () => setPoll((p) => p ? null : { choices: [{ text: "", image: null }, { text: "", image: null }], days: 1, hours: 0, minutes: 0 });
  const pollOptions = (poll == null ? void 0 : poll.choices.map((c) => ({ text: c.text.trim(), image: c.image })).filter((c) => c.text)) ?? [];
  const pollValid = !poll || pollOptions.length >= 2;
  const hasContent = content.replace(/<[^>]*>/g, "").replace(/&nbsp;/gi, " ").trim().length > 0;
  const hasAttachment = !!(poll || gifUrl || imageUrls.length || playlistId || tierlistId || watchRoomId || media);
  const canPost = (hasContent || hasAttachment) && pollValid && !submitting;
  const handleSubmit = async () => {
    var _a2, _b2;
    if (!canPost) return;
    if (!await ensureAgreed()) return;
    setSubmitting(true);
    try {
      const html = ((_a2 = editorRef.current) == null ? void 0 : _a2.getHTML()) ?? content;
      const plain = (((_b2 = editorRef.current) == null ? void 0 : _b2.getText()) ?? html.replace(/<[^>]*>/g, " ")).replace(/\s+/g, " ").trim();
      const metadata = {};
      if (gifUrl) metadata.gif_url = gifUrl;
      if (imageUrls.length) metadata.images = imageUrls;
      if (watchRoomId) metadata.watch_room_id = watchRoomId;
      if (media) metadata.media_type = media.type;
      const content_type = poll ? "poll" : imageUrls.length || gifUrl ? "image" : "text";
      const finalTitle = title.trim() || deriveTitle(
        plain,
        poll ? "Poll" : media ? `Shared ${media.name}` : playlistId ? "Shared a playlist" : tierlistId ? "Shared a tier list" : watchRoomId ? "Watch Together lobby" : "Post"
      );
      const created = await createPost.mutateAsync({
        title: finalTitle,
        content: hasContent ? html : "",
        content_type,
        image_url: imageUrls[0],
        is_spoiler: isSpoiler,
        ...Object.keys(metadata).length ? { metadata } : {},
        playlist_id: playlistId || void 0,
        tierlist_id: tierlistId || void 0,
        ...media ? { anime_id: media.id, anime_name: media.name, anime_poster: media.poster || void 0 } : {},
        ...communityId ? { community_id: communityId } : {}
      });
      if (poll && (created == null ? void 0 : created.id)) {
        const totalMs = ((poll.days * 24 + poll.hours) * 60 + poll.minutes) * 60 * 1e3;
        const endsAt = new Date(Date.now() + (totalMs > 0 ? totalMs : 24 * 60 * 60 * 1e3)).toISOString();
        await createPoll.mutateAsync({ postId: created.id, question: finalTitle, options: pollOptions, endsAt });
      }
      if (created == null ? void 0 : created.id) await persistTagsAndMentions(created.id, html, plain);
      ue.success(imageUrls.length ? "Post submitted for approval" : "Posted", {
        description: imageUrls.length ? "Posts with images require admin approval before they appear." : void 0
      });
      void triggerHaptic("post");
      reset();
      onPosted == null ? void 0 : onPosted();
    } catch (err) {
      const friendly = mapUgcError(err instanceof Error ? err : null);
      ue.error(friendly || "Failed to post", {
        description: friendly ? void 0 : err instanceof Error ? err.message : "Unknown error"
      });
    } finally {
      setSubmitting(false);
    }
  };
  const ToolbarIcon = ({ icon: Icon, label, active, onClick }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    "button",
    {
      type: "button",
      "aria-label": label,
      title: label,
      onClick,
      className: cn("flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-all active:scale-95", active ? "bg-primary/20 text-primary shadow-[inset_0_0_0_1px_hsl(var(--primary)/0.25)]" : "text-primary/70 hover:bg-primary/10 hover:text-primary"),
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-[18px] w-[18px]" })
    }
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    GlassPanel,
    {
      className: cn("relative overflow-hidden rounded-3xl border-white/10 p-3 transition-shadow sm:p-4", dropActive && "ring-2 ring-primary/60"),
      onDragOver: (e) => {
        if (!dragHasFiles(e.dataTransfer)) return;
        e.preventDefault();
        setDropActive(true);
      },
      onDragLeave: (e) => {
        if (e.currentTarget.contains(e.relatedTarget)) return;
        setDropActive(false);
      },
      onDrop: (e) => {
        if (!dragHasFiles(e.dataTransfer)) return;
        e.preventDefault();
        setDropActive(false);
        const file = imageFileFromTransfer(e.dataTransfer);
        if (file) intakeImageFile(file);
      },
      children: [
        (dropActive || intakeBusy) && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute inset-0 z-30 flex items-center justify-center rounded-xl border-2 border-dashed border-primary/60 bg-background/80 backdrop-blur-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "flex items-center gap-2 text-sm font-semibold text-primary", children: intakeBusy ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }),
          " Uploading…"
        ] }) : "Drop image to attach" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute -top-12 -right-12 h-48 w-48 rounded-full bg-primary/10 blur-[70px]" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex gap-2.5 sm:gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Avatar, { className: "h-9 w-9 shrink-0 sm:h-10 sm:w-10", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarImage, { src: (profile == null ? void 0 : profile.avatar_url) || void 0 }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarFallback, { children: (_a = ((profile == null ? void 0 : profile.display_name) || (profile == null ? void 0 : profile.username) || "U")[0]) == null ? void 0 : _a.toUpperCase() })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-1 flex flex-wrap items-center gap-2", children: [
              (profile == null ? void 0 : profile.username) && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-display font-bold tracking-tight text-muted-foreground", children: [
                "@",
                profile.username
              ] }),
              communityId && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex max-w-full items-center gap-1 rounded-full border border-primary/20 bg-primary/10 px-2 py-0.5 text-[11px] font-medium text-primary", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "truncate", children: [
                  "in ",
                  (_b = communities.find((c) => c.id === communityId)) == null ? void 0 : _b.name
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", "aria-label": "Clear community", onClick: () => setCommunityId(null), className: "shrink-0 rounded-full p-0.5 hover:bg-primary/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-3 w-3" }) })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "text",
                value: title,
                maxLength: 120,
                onChange: (e) => setTitle(e.target.value),
                placeholder: "Add a title (optional)",
                className: "mb-1.5 w-full bg-transparent text-base sm:text-[17px] font-display font-bold tracking-tight text-white placeholder:text-muted-foreground/40 focus:outline-none"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              RichEditor,
              {
                ref: editorRef,
                placeholder: "What’s happening?",
                minHeight: "52px",
                className: "text-[15px] leading-relaxed",
                onChange: setContent,
                onSubmit: handleSubmit,
                onPasteFiles: (files) => intakeImageFile(files[0])
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 text-[11px] text-muted-foreground/50", children: [
              "Add an optional title, then a description · select text to format · type ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-primary/70", children: "@" }),
              " to mention · ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-primary/70", children: "#" }),
              " to tag"
            ] }),
            poll && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 space-y-3 rounded-2xl border border-white/[0.06] bg-white/[0.015] p-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: poll.choices.map((choice, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                choice.image ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative h-10 w-10 flex-shrink-0 overflow-hidden rounded-lg border border-white/10", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: getProxiedImageUrl(choice.image), alt: "", className: "h-full w-full object-cover" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      "aria-label": "Remove choice image",
                      onClick: () => setPoll((p) => p ? { ...p, choices: p.choices.map((c, idx) => idx === i ? { ...c, image: null } : c) } : p),
                      className: "absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity hover:opacity-100",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4 text-white" })
                    }
                  )
                ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    "aria-label": "Add choice image",
                    onClick: () => {
                      var _a2;
                      pollImgIdx.current = i;
                      (_a2 = pollImgRef.current) == null ? void 0 : _a2.click();
                    },
                    className: "flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-muted-foreground hover:text-primary",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { className: "h-4 w-4" })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    value: choice.text,
                    maxLength: 80,
                    placeholder: `Choice ${i + 1}`,
                    onChange: (e) => setPoll((p) => p ? { ...p, choices: p.choices.map((c, idx) => idx === i ? { ...c, text: e.target.value } : c) } : p),
                    className: "h-10 rounded-xl bg-white/[0.03] border-white/10"
                  }
                ),
                poll.choices.length > 2 && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", "aria-label": "Remove choice", onClick: () => setPoll((p) => p ? { ...p, choices: p.choices.filter((_, idx) => idx !== i) } : p), className: "text-muted-foreground hover:text-destructive", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" }) }),
                i === poll.choices.length - 1 && poll.choices.length < 4 && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", "aria-label": "Add choice", onClick: () => setPoll((p) => p ? { ...p, choices: [...p.choices, { text: "", image: null }] } : p), className: "text-primary hover:text-primary/80", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-5 w-5" }) })
              ] }, i)) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-2 text-sm font-display font-bold tracking-tight", children: "Poll length" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-2", children: ["days", "hours", "minutes"].map((unit) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "mb-1 block text-[11px] uppercase tracking-wider text-muted-foreground/70", children: unit }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: String(poll[unit]), onValueChange: (v) => setPoll((p) => p ? { ...p, [unit]: Number(v) } : p), children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "h-10 rounded-xl bg-white/[0.03] border-white/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: DURATION[unit].map((n) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: String(n), children: n }, n)) })
                  ] })
                ] }, unit)) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setPoll(null), className: "text-sm font-medium text-destructive hover:underline", children: "Remove poll" })
            ] }),
            (imageUrls.length > 0 || gifUrl) && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("mt-2 gap-1.5", gifUrl ? "" : "grid", !gifUrl && imageUrls.length > 1 ? "grid-cols-2" : "grid-cols-1"), children: gifUrl ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative overflow-hidden rounded-2xl border border-white/[0.06]", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: getProxiedImageUrl(gifUrl), alt: "gif", className: "max-h-64 sm:max-h-80 w-full object-contain bg-black/20" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", "aria-label": "Remove", onClick: () => setGifUrl(null), className: "absolute right-2 top-2 rounded-full bg-black/60 p-1.5 text-white hover:bg-black/80 active:scale-95", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" }) })
            ] }) : imageUrls.map((src, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative overflow-hidden rounded-2xl border border-white/[0.06]", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: getProxiedImageUrl(src), alt: "preview", className: "h-32 sm:h-44 w-full object-cover" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", "aria-label": "Remove image", onClick: () => setImageUrls((p) => p.filter((_, idx) => idx !== i)), className: "absolute right-2 top-2 rounded-full bg-black/60 p-1.5 text-white hover:bg-black/80 active:scale-95", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" }) })
            ] }, i)) }),
            (playlistId || tierlistId || watchRoomId || media) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 flex flex-wrap gap-2", children: [
              playlistId && /* @__PURE__ */ jsxRuntimeExports.jsx(AttachChip, { label: `Playlist: ${((_c = playlists.find((p) => p.id === playlistId)) == null ? void 0 : _c.name) ?? ""}`, onClear: () => setPlaylistId(null) }),
              tierlistId && /* @__PURE__ */ jsxRuntimeExports.jsx(AttachChip, { label: `Tier list: ${((_d = tierlists.find((t) => t.id === tierlistId)) == null ? void 0 : _d.title) ?? ""}`, onClear: () => setTierlistId(null) }),
              watchRoomId && /* @__PURE__ */ jsxRuntimeExports.jsx(AttachChip, { label: `Lobby: ${((_e = rooms.find((r) => r.id === watchRoomId)) == null ? void 0 : _e.name) ?? ""}`, onClear: () => setWatchRoomId(null) }),
              media && /* @__PURE__ */ jsxRuntimeExports.jsx(AttachChip, { label: `${media.type}: ${media.name}`, onClear: () => setMedia(null) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 border-t border-white/[0.05] pt-3 sm:flex sm:items-center sm:gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-1 items-center gap-0.5 overflow-x-auto no-scrollbar -mx-1 px-1 pb-0.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  ImagePicker,
                  {
                    userId: user.id,
                    uploadFile: async (f) => ({ url: await uploadImage(f) }),
                    onSelect: (img) => handleImagePick(img.url),
                    trigger: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(ToolbarIcon, { icon: Image, label: "Image", active: imageUrls.length > 0, onClick: () => {
                    } }) })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(GifPicker, { onSelect: (att) => {
                  setImageUrls([]);
                  setGifUrl(att.url);
                }, trigger: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(ToolbarIcon, { icon: Film, label: "GIF", active: !!gifUrl, onClick: () => {
                } }) }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(ToolbarIcon, { icon: ListChecks, label: "Poll", active: !!poll, onClick: togglePoll }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(PickerPopover, { icon: Music2, label: "Playlist", active: !!playlistId, items: playlists.map((p) => ({ id: p.id, label: p.name })), empty: "You have no playlists yet.", onPick: setPlaylistId }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(PickerPopover, { icon: Layers, label: "Tier list", active: !!tierlistId, items: tierlists.map((t) => ({ id: t.id, label: t.title })), empty: "You have no tier lists yet.", onPick: setTierlistId }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(PickerPopover, { icon: Radio, label: "Watch Together lobby", active: !!watchRoomId, items: rooms.map((r) => ({ id: r.id, label: r.name })), empty: "You have no active lobbies.", onPick: setWatchRoomId }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(PickerPopover, { icon: Users, label: "Post to community", active: !!communityId, items: communities.map((c) => ({ id: c.id, label: c.name })), empty: "No communities yet.", onPick: setCommunityId }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(MediaPicker, { onSelect: setMedia, trigger: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(ToolbarIcon, { icon: Tv, label: "Share anime / manga", active: !!media, onClick: () => {
                } }) }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(ToolbarIcon, { icon: TriangleAlert, label: "Mark spoiler", active: isSpoiler, onClick: () => setIsSpoiler((v) => !v) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: handleSubmit, disabled: !canPost, className: "mt-2.5 h-10 w-full rounded-2xl px-5 text-sm font-bold shadow-lg shadow-primary/20 sm:mt-0 sm:h-9 sm:w-auto sm:rounded-full sm:ml-auto", children: submitting ? "Posting…" : "Post" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { ref: pollImgRef, type: "file", accept: "image/*", className: "hidden", onChange: handlePollImageSelect })
          ] })
        ] })
      ]
    }
  );
}
function AttachChip({ label, onClear }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "max-w-[180px] truncate", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", "aria-label": "Remove", onClick: onClear, className: "hover:text-primary/70", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-3 w-3" }) })
  ] });
}
function PickerPopover({ icon: Icon, label, active, items, empty, onPick }) {
  const [open, setOpen] = reactExports.useState(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Popover, { open, onOpenChange: setOpen, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", "aria-label": label, title: label, className: cn("flex h-9 w-9 items-center justify-center rounded-full transition-colors", active ? "bg-primary/20 text-primary" : "text-primary/70 hover:bg-primary/10 hover:text-primary"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-[18px] w-[18px]" }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(PopoverContent, { align: "start", className: "w-64 p-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "px-2 py-1 text-xs font-bold uppercase tracking-wider text-muted-foreground", children: label }),
      items.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "px-2 py-3 text-sm text-muted-foreground", children: empty }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-h-64 space-y-0.5 overflow-y-auto", children: items.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => {
        onPick(item.id);
        setOpen(false);
      }, className: "w-full truncate rounded-lg px-2 py-2 text-left text-sm hover:bg-white/5", children: item.label }, item.id)) })
    ] })
  ] });
}
export {
  PostComposer as P
};
