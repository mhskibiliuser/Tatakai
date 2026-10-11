import { a as useQuery, u as useQueryClient, b as useMutation } from "./tanstack.DPr3OB19.js";
import { aj as ANILIST_GRAPHQL_ENDPOINT, I as contentGraph, a2 as supabase, dO as TATAKAI_API_URL, dP as withClientHeaders, dQ as unwrapApiData, a4 as Sheet, a5 as SheetContent, a6 as SheetHeader, a7 as SheetTitle, dR as SheetDescription, aC as ScrollArea, ay as Label, aA as Textarea, az as Input, dS as SheetFooter, B as Button } from "./index.C6yfkT5T.js";
import { r as reactExports, j as jsxRuntimeExports } from "./react-vendor.CAo4XUiA.js";
import { bf as ue } from "./vendor.CJyRs4QS.js";
import { m as motion } from "./motion.DVGLRFCH.js";
import { aH as ShieldAlert } from "./icons.C2gBBarQ.js";
const RECOMMENDATIONS_QUERY = (
  /* GraphQL */
  `
  query ($id: Int) {
    Media(id: $id) {
      id
      recommendations {
        nodes {
          rating
          mediaRecommendation {
            id
            idMal
            type
            format
            seasonYear
            averageScore
            isAdult
            title { romaji english native }
            coverImage { large medium color }
          }
        }
      }
    }
  }
`
);
async function fetchAniListRecommendations(anilistId, signal) {
  var _a, _b, _c, _d, _e;
  const res = await fetch(ANILIST_GRAPHQL_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ query: RECOMMENDATIONS_QUERY, variables: { id: anilistId } }),
    signal
  });
  if (!res.ok) throw new Error(`AniList ${res.status}`);
  const json = await res.json();
  if ((_a = json.errors) == null ? void 0 : _a.length) throw new Error(((_b = json.errors[0]) == null ? void 0 : _b.message) || "AniList GraphQL error");
  const nodes = ((_e = (_d = (_c = json == null ? void 0 : json.data) == null ? void 0 : _c.Media) == null ? void 0 : _d.recommendations) == null ? void 0 : _e.nodes) ?? [];
  return nodes.map((n) => {
    var _a2, _b2, _c2, _d2, _e2, _f, _g, _h;
    const m = n.mediaRecommendation;
    if (!(m == null ? void 0 : m.id)) return null;
    const poster = ((_a2 = m.coverImage) == null ? void 0 : _a2.large) ?? ((_b2 = m.coverImage) == null ? void 0 : _b2.medium) ?? "";
    if (!poster) return null;
    return {
      anilistId: m.id,
      malId: m.idMal,
      title: ((_c2 = m.title) == null ? void 0 : _c2.english) ?? ((_d2 = m.title) == null ? void 0 : _d2.romaji) ?? ((_e2 = m.title) == null ? void 0 : _e2.native) ?? "Unknown",
      jtitle: ((_f = m.title) == null ? void 0 : _f.native) ?? ((_g = m.title) == null ? void 0 : _g.romaji) ?? void 0,
      poster,
      color: ((_h = m.coverImage) == null ? void 0 : _h.color) ?? null,
      format: m.format,
      type: m.type ?? "ANIME",
      seasonYear: m.seasonYear,
      averageScore: m.averageScore,
      isAdult: !!m.isAdult,
      rating: n.rating ?? 0
    };
  }).filter((r) => r !== null);
}
function useAniListRecommendations(anilistId, opts = {}) {
  const { mediaType, includeAdult = false, limit = 24 } = opts;
  const query = useQuery({
    queryKey: ["anilist-recommendations", anilistId],
    enabled: !!anilistId && anilistId > 0,
    staleTime: 60 * 60 * 1e3,
    // 1h — a title's rec list barely moves
    gcTime: 2 * 60 * 60 * 1e3,
    queryFn: ({ signal }) => fetchAniListRecommendations(anilistId, signal)
  });
  const recommendations = (query.data ?? []).filter((r) => mediaType ? r.type === mediaType : true).filter((r) => includeAdult ? true : !r.isAdult).sort((a, b) => b.rating - a.rating).slice(0, limit);
  return {
    recommendations,
    isLoading: query.isLoading,
    isError: query.isError,
    refetch: query.refetch
  };
}
function useUpdateContent() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, fields, reason }) => {
      var _a;
      const { data: sessionData } = await supabase.auth.getSession();
      const token = (_a = sessionData.session) == null ? void 0 : _a.access_token;
      if (!token) throw new Error("You must be signed in as an admin to edit content.");
      const res = await fetch(`${TATAKAI_API_URL}/admin/content/${encodeURIComponent(id)}`, {
        method: "PATCH",
        headers: withClientHeaders({
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }),
        body: JSON.stringify({ fields, reason })
      });
      const json = await res.json().catch(() => null);
      if (!res.ok) {
        throw new Error((json == null ? void 0 : json.error) || `Failed to save (HTTP ${res.status})`);
      }
      return unwrapApiData(json);
    },
    onSuccess: async (_data, variables) => {
      await contentGraph.purgeMedia(variables.id);
      queryClient.invalidateQueries();
    }
  });
}
const STRING_KEYS = [
  ["title_romaji", "Title (Romaji)", "string"],
  ["title_english", "Title (English)", "string"],
  ["title_native", "Title (Native)", "string"],
  ["description", "Description", "textarea"],
  ["cover_image_large", "Poster URL (large)", "string"],
  ["cover_image_medium", "Poster URL (medium)", "string"],
  ["banner_image", "Banner URL", "string"],
  ["format", "Format", "string"],
  ["status", "Status", "string"],
  ["source", "Source", "string"],
  ["country_of_origin", "Country of origin", "string"],
  ["season", "Season", "string"],
  ["genres", "Genres (comma-separated)", "string"]
];
const NUMBER_KEYS = [
  ["season_year", "Season year"],
  ["duration", "Duration (min/ep)"],
  ["average_score", "Average score"],
  ["mean_score", "Mean score"],
  ["popularity", "Popularity"],
  ["favourites", "Favourites"]
];
const ANIME_NUMBER_KEYS = [
  ["episodes", "Episodes"]
];
const MANGA_NUMBER_KEYS = [
  ["chapters", "Chapters"],
  ["volumes", "Volumes"]
];
function toFormString(v) {
  if (v === null || v === void 0) return "";
  return String(v);
}
function ContentEditSheet({
  open,
  onOpenChange,
  id,
  mediaType,
  initial,
  title
}) {
  const update = useUpdateContent();
  const [reason, setReason] = reactExports.useState("");
  const baseline = reactExports.useMemo(() => {
    const b = {};
    for (const [key] of STRING_KEYS) b[key] = toFormString(initial[key]);
    for (const [key] of [...NUMBER_KEYS, ...ANIME_NUMBER_KEYS, ...MANGA_NUMBER_KEYS]) {
      b[key] = toFormString(initial[key]);
    }
    return b;
  }, [id, open]);
  const [form, setForm] = reactExports.useState(baseline);
  reactExports.useEffect(() => setForm(baseline), [baseline]);
  const set = (key, value) => setForm((f) => ({ ...f, [key]: value }));
  const numberKeys = reactExports.useMemo(
    () => [...NUMBER_KEYS, ...mediaType === "anime" ? ANIME_NUMBER_KEYS : MANGA_NUMBER_KEYS],
    [mediaType]
  );
  async function handleSave() {
    const fields = {};
    for (const [key] of STRING_KEYS) {
      const next = (form[key] ?? "").trim();
      const prev = (baseline[key] ?? "").trim();
      if (next === prev) continue;
      if (key === "genres") {
        fields.genres = next ? next.split(",").map((g) => g.trim()).filter(Boolean) : [];
      } else if (next) {
        fields[key] = next;
      }
    }
    for (const [key] of numberKeys) {
      const next = (form[key] ?? "").trim();
      const prev = (baseline[key] ?? "").trim();
      if (next === prev) continue;
      if (next === "") continue;
      const n = Number(next);
      if (Number.isFinite(n)) fields[key] = n;
    }
    if (Object.keys(fields).length === 0) {
      ue.info("No changes to save.");
      return;
    }
    try {
      await update.mutateAsync({ id, fields, reason: reason.trim() || void 0 });
      ue.success("Content updated — changes are now live for everyone.");
      onOpenChange(false);
    } catch (err) {
      ue.error(err instanceof Error ? err.message : "Failed to save content.");
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Sheet, { open, onOpenChange, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(SheetContent, { side: "right", className: "w-full sm:max-w-xl p-0 flex flex-col", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(SheetHeader, { className: "p-6 pb-3 border-b border-border/50", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(SheetTitle, { children: [
        "Edit content",
        title ? `: ${title}` : ""
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(SheetDescription, { children: "Changes save to the Tatakai database and are visible to all visitors. Only edited fields are written; re-syncs from AniList will not overwrite them." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollArea, { className: "flex-1 px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 py-4", children: [
      STRING_KEYS.map(
        ([key, label, kind]) => kind === "textarea" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: `ce-${key}`, children: label }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              id: `ce-${key}`,
              rows: 6,
              value: form[key] ?? "",
              onChange: (e) => set(key, e.target.value)
            }
          )
        ] }, key) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: `ce-${key}`, children: label }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: `ce-${key}`,
              value: form[key] ?? "",
              onChange: (e) => set(key, e.target.value)
            }
          )
        ] }, key)
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-3", children: numberKeys.map(([key, label]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: `ce-${key}`, children: label }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            id: `ce-${key}`,
            type: "number",
            value: form[key] ?? "",
            onChange: (e) => set(key, e.target.value)
          }
        )
      ] }, key)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "ce-reason", children: "Reason (optional, for the audit log)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            id: "ce-reason",
            value: reason,
            onChange: (e) => setReason(e.target.value),
            placeholder: "e.g. fixed wrong poster"
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(SheetFooter, { className: "p-6 pt-3 border-t border-border/50", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", onClick: () => onOpenChange(false), disabled: update.isPending, children: "Cancel" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: handleSave, disabled: update.isPending, children: update.isPending ? "Saving…" : "Save changes" })
    ] })
  ] }) });
}
function AdultWarningGate({
  title,
  mediaLabel = "title",
  onBack,
  onContinue,
  onAlwaysShow
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex w-full items-center justify-center p-4 py-12 md:py-24", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, scale: 0.95, y: 10 },
      animate: { opacity: 1, scale: 1, y: 0 },
      transition: { duration: 0.4, ease: "easeOut" },
      className: "relative mx-auto w-full max-w-lg overflow-hidden rounded-[24px] border border-white/10 bg-[#0a0a0a] shadow-2xl",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative h-32 w-full md:h-40", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: `${"/"}assets/image/content/manga18+.jpg`,
              alt: "18+ Content Banner",
              className: "h-full w-full object-cover"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/60 to-black/20" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-4 left-0 flex w-full justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 rounded-full border border-rose-500/30 bg-rose-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-rose-400 backdrop-blur-md", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldAlert, { className: "h-3.5 w-3.5" }),
            "18+ Mature Content"
          ] }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 pb-8 pt-6 text-center md:px-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold tracking-tight text-white md:text-3xl", children: "Sensitive Content" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mx-auto mt-3 max-w-[320px] text-[15px] leading-relaxed text-muted-foreground/90", children: [
            "This ",
            mediaLabel,
            " is marked as mature. Please proceed only if you are comfortable viewing 18+ material."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto mt-5 inline-flex max-w-full items-center justify-center rounded-xl border border-white/5 bg-white/[0.02] px-4 py-2.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate text-sm font-semibold text-white/90", children: title || "Unknown Title" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "ghost",
                onClick: onBack,
                className: "w-full sm:w-32 rounded-full font-semibold hover:bg-white/5",
                children: "Go Back"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                onClick: onContinue,
                className: "w-full sm:w-auto rounded-full bg-rose-600 hover:bg-rose-700 text-white font-bold transition-all active:scale-95 px-8",
                children: "Continue"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: onAlwaysShow,
              className: "group text-[13px] font-medium text-muted-foreground transition-colors hover:text-white",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "underline decoration-white/30 underline-offset-4 transition-colors group-hover:decoration-white", children: "Always show mature media" })
            }
          ) })
        ] })
      ]
    }
  ) });
}
export {
  AdultWarningGate as A,
  ContentEditSheet as C,
  useAniListRecommendations as u
};
