import { i as useParams, l as useSearchParams, r as reactExports, j as jsxRuntimeExports, L as Link } from "./react-vendor.CAo4XUiA.js";
import { B as Button, l as getProxiedImageUrl, fP as resolveBackendOrigin, a2 as supabase } from "./index.C6yfkT5T.js";
import { bf as ue } from "./vendor.CJyRs4QS.js";
import { S as Seo } from "./Seo.CEAYCbtv.js";
import { Q as LoaderCircle, bg as Share2 } from "./icons.C2gBBarQ.js";
import "./tanstack.DPr3OB19.js";
import "./supabase.WuRMX5Dg.js";
import "./radix.BiK9uYXL.js";
import "./motion.DVGLRFCH.js";
import "./hls.BlgtCWcq.js";
import "./editor.Dxw8dtyw.js";
import "./charts.Dr1fgDJ-.js";
function normalizeOwnerName(value) {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  if (!trimmed) return null;
  const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(trimmed);
  return isUuid ? null : trimmed;
}
function extractOwnerId(payload) {
  var _a, _b, _c, _d;
  const candidate = (payload == null ? void 0 : payload.user_id) || ((_a = payload == null ? void 0 : payload.profiles) == null ? void 0 : _a.user_id) || ((_b = payload == null ? void 0 : payload.profiles) == null ? void 0 : _b.id) || ((_c = payload == null ? void 0 : payload.owner) == null ? void 0 : _c.user_id) || ((_d = payload == null ? void 0 : payload.owner) == null ? void 0 : _d.id);
  if (typeof candidate !== "string") return null;
  const trimmed = candidate.trim();
  return trimmed.length > 0 ? trimmed : null;
}
function resolveOwnerFromPayload(payload) {
  var _a, _b, _c, _d;
  return normalizeOwnerName((_a = payload == null ? void 0 : payload.profiles) == null ? void 0 : _a.display_name) || normalizeOwnerName((_b = payload == null ? void 0 : payload.profiles) == null ? void 0 : _b.username) || normalizeOwnerName((_c = payload == null ? void 0 : payload.owner) == null ? void 0 : _c.display_name) || normalizeOwnerName((_d = payload == null ? void 0 : payload.owner) == null ? void 0 : _d.username);
}
function parsePlaylistMediaRef(value) {
  const raw = String(value || "").trim();
  if (raw.toLowerCase().startsWith("manga:")) {
    return { kind: "manga", id: raw.slice(6) };
  }
  if (raw.toLowerCase().startsWith("anime:")) {
    return { kind: "anime", id: raw.slice(6) };
  }
  return { kind: "anime", id: raw };
}
function getPlaylistItemHref(mediaRef) {
  const media = parsePlaylistMediaRef(mediaRef);
  if (!media.id) return "#";
  return media.kind === "manga" ? `/manga/${encodeURIComponent(media.id)}` : `/anime/${encodeURIComponent(media.id)}`;
}
function PublicPlaylistPage() {
  var _a;
  const { shareSlug } = useParams();
  const [searchParams] = useSearchParams();
  const [playlist, setPlaylist] = reactExports.useState(null);
  const [ownerName, setOwnerName] = reactExports.useState("Unknown");
  const [loading, setLoading] = reactExports.useState(true);
  const embed = searchParams.get("embed") === "1";
  reactExports.useEffect(() => {
    if (!shareSlug) return;
    let active = true;
    const loadPlaylist = async () => {
      setLoading(true);
      setOwnerName("Unknown");
      try {
        const response = await fetch(`${resolveBackendOrigin()}/api/public/playlists/${encodeURIComponent(shareSlug)}`);
        const data = await response.json();
        const nextPlaylist = (data == null ? void 0 : data.data) ?? null;
        if (!active) return;
        setPlaylist(nextPlaylist);
        if (!nextPlaylist) return;
        const ownerFromPayload = resolveOwnerFromPayload(nextPlaylist);
        if (ownerFromPayload) {
          setOwnerName(ownerFromPayload);
          return;
        }
        const ownerId = extractOwnerId(nextPlaylist);
        if (!ownerId) return;
        const { data: profile } = await supabase.from("profiles").select("display_name, username").eq("user_id", ownerId).maybeSingle();
        if (!active) return;
        const ownerFromProfile = normalizeOwnerName(profile == null ? void 0 : profile.display_name) || normalizeOwnerName(profile == null ? void 0 : profile.username);
        if (ownerFromProfile) {
          setOwnerName(ownerFromProfile);
        }
      } catch (e) {
        console.error(e);
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };
    loadPlaylist();
    return () => {
      active = false;
    };
  }, [shareSlug]);
  if (loading) return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-8 h-8 animate-spin text-primary" }) });
  if (!playlist) return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen flex items-center justify-center", children: "Playlist not found" });
  const { name, share_description, playlist_items = [] } = playlist;
  const shareUrl = `${window.location.origin}/p/${shareSlug}`;
  const embedCode = `<iframe src="${shareUrl}?embed=1" width="600" height="400" frameborder="0" scrolling="no"></iframe>`;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: embed ? "bg-transparent p-4" : "min-h-screen bg-background text-foreground p-6", children: [
    !embed && /* @__PURE__ */ jsxRuntimeExports.jsx(
      Seo,
      {
        title: name || "Playlist",
        description: share_description || `A playlist with ${playlist_items.length} titles on Tatakai.`,
        image: ((_a = playlist_items[0]) == null ? void 0 : _a.anime_poster) || void 0,
        canonicalPath: `/p/${shareSlug}`,
        kind: "website",
        suffix: " — Tatakai Playlist"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: embed ? "max-w-full" : "max-w-4xl mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold", children: name }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
            "By ",
            ownerName
          ] }),
          share_description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: share_description }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 text-xs text-muted-foreground", children: [
            playlist_items.length,
            " item(s)"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", onClick: () => {
            navigator.clipboard.writeText(shareUrl);
            ue.success("Link copied");
          }, className: "gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Share2, { className: "w-4 h-4" }),
            "Copy Link"
          ] }),
          !embed && playlist.embed_allowed && /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", onClick: () => {
            navigator.clipboard.writeText(embedCode);
            ue.success("Embed code copied");
          }, className: "gap-2", children: "Copy Embed" })
        ] })
      ] }),
      playlist_items.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: playlist_items.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-4 p-3 rounded-xl bg-muted/10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: getPlaylistItemHref(item.anime_id), className: "min-w-0 flex items-center gap-4 hover:opacity-90 transition-opacity", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-20 rounded overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: getProxiedImageUrl(item.anime_poster || "/placeholder.svg"), alt: item.anime_name, className: "w-full h-full object-cover" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold line-clamp-1", children: item.anime_name }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm text-muted-foreground", children: [
              parsePlaylistMediaRef(item.anime_id).kind === "manga" ? "Manga" : "Anime",
              " • Added ",
              new Date(item.added_at).toLocaleDateString()
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: getPlaylistItemHref(item.anime_id), className: "text-xs font-bold uppercase tracking-wider text-primary hover:underline", children: "Open" })
      ] }, item.id)) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center py-12 text-muted-foreground", children: "This playlist is empty" })
    ] })
  ] });
}
export {
  PublicPlaylistPage as default
};
