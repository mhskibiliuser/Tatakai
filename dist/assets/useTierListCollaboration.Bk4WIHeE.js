import { r as reactExports, j as jsxRuntimeExports } from "./react-vendor.CAo4XUiA.js";
import { bI as useSensors, bJ as useSensor, bf as ue, bK as DndContext, bL as closestCenter, bM as DragOverlay, bN as PointerSensor, bO as SortableContext, bP as rectSortingStrategy, bQ as useSortable, bR as CSS } from "./vendor.CJyRs4QS.js";
import { fF as useCreateTierList, fG as useUpdateTierList, I as contentGraph, a_ as toAnimeCard, eB as searchManga, aj as ANILIST_GRAPHQL_ENDPOINT, az as Input, aA as Textarea, ay as Label, aB as Switch, G as GlassPanel, bq as Tabs, br as TabsList, bs as TabsTrigger, aP as DEFAULT_TIERS, B as Button, j as cn, u as useAuth, a2 as supabase } from "./index.C6yfkT5T.js";
import { a5 as Globe, a6 as Lock, Z as Film, B as BookOpen, U as Users, S as Search, aF as Save, cZ as GripVertical, X } from "./icons.C2gBBarQ.js";
import { a as useQuery, u as useQueryClient, b as useMutation } from "./tanstack.DPr3OB19.js";
const SEARCH_DEBOUNCE_MS = 450;
const TIERLIST_DRAFT_SAVE_DEBOUNCE_MS = 500;
const TIERLIST_DRAFT_MAX_AGE_MS = 7 * 24 * 60 * 60 * 1e3;
const TIERLIST_DRAFT_STORAGE_PREFIX = "tatakai_tierlist_editor_draft_v1";
function getTierListDraftStorageKey(tierListId) {
  return `${TIERLIST_DRAFT_STORAGE_PREFIX}:${tierListId ? `edit:${tierListId}` : "new"}`;
}
function SortableAnimeCard({ item, onRemove }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: item.anime_id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      ref: setNodeRef,
      style,
      className: cn(
        "relative group w-16 h-24 rounded-lg overflow-hidden cursor-grab active:cursor-grabbing",
        isDragging && "opacity-50 z-50"
      ),
      ...attributes,
      ...listeners,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: item.anime_image,
            alt: item.anime_title,
            className: "w-full h-full object-cover",
            draggable: false
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(GripVertical, { className: "w-5 h-5 text-white" }) }),
        onRemove && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: (e) => {
              e.stopPropagation();
              onRemove();
            },
            className: "absolute top-1 right-1 w-5 h-5 rounded-full bg-red-500 text-white opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3 h-3" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-0 left-0 right-0 bg-black/80 p-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-white truncate", children: item.anime_title }) })
      ]
    }
  );
}
function TierRow({
  tier,
  items,
  onRemoveItem
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex border border-muted rounded-lg overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "w-16 flex-shrink-0 flex items-center justify-center font-bold text-2xl text-white",
        style: { backgroundColor: tier.color },
        children: tier.name
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SortableContext, { items: items.map((i) => i.anime_id), strategy: rectSortingStrategy, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 min-h-[100px] p-2 flex flex-wrap gap-2 bg-muted/20", children: items.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      SortableAnimeCard,
      {
        item,
        onRemove: () => onRemoveItem(item.anime_id)
      },
      item.anime_id
    )) }) })
  ] });
}
function TierListEditor({ initialData, onSave, onClose }) {
  const [name, setName] = reactExports.useState((initialData == null ? void 0 : initialData.name) || "");
  const [description, setDescription] = reactExports.useState((initialData == null ? void 0 : initialData.description) || "");
  const [isPublic, setIsPublic] = reactExports.useState((initialData == null ? void 0 : initialData.is_public) ?? true);
  const [items, setItems] = reactExports.useState((initialData == null ? void 0 : initialData.items) || []);
  const [searchQuery, setSearchQuery] = reactExports.useState("");
  const [searchResults, setSearchResults] = reactExports.useState([]);
  const [isSearching, setIsSearching] = reactExports.useState(false);
  const [activeId, setActiveId] = reactExports.useState(null);
  const [searchType, setSearchType] = reactExports.useState("anime");
  const [page, setPage] = reactExports.useState(1);
  const [hasNextPage, setHasNextPage] = reactExports.useState(false);
  const draftStorageKey = reactExports.useMemo(
    () => getTierListDraftStorageKey(initialData == null ? void 0 : initialData.id),
    [initialData == null ? void 0 : initialData.id]
  );
  const searchTimeoutRef = reactExports.useRef(null);
  const draftSaveTimeoutRef = reactExports.useRef(null);
  const latestSearchRequestRef = reactExports.useRef(0);
  const isRestoringDraftRef = reactExports.useRef(false);
  const createTierList = useCreateTierList();
  const updateTierList = useUpdateTierList();
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8
      }
    })
  );
  reactExports.useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = window.localStorage.getItem(draftStorageKey);
      if (!raw) return;
      const parsed = JSON.parse(raw);
      const savedAt = Number((parsed == null ? void 0 : parsed.savedAt) || 0);
      if (!savedAt || Date.now() - savedAt > TIERLIST_DRAFT_MAX_AGE_MS) {
        window.localStorage.removeItem(draftStorageKey);
        return;
      }
      isRestoringDraftRef.current = true;
      if (typeof parsed.name === "string") setName(parsed.name);
      if (typeof parsed.description === "string") setDescription(parsed.description);
      if (typeof parsed.isPublic === "boolean") setIsPublic(parsed.isPublic);
      if (parsed.searchType === "anime" || parsed.searchType === "manga" || parsed.searchType === "character") {
        setSearchType(parsed.searchType);
      }
      if (Array.isArray(parsed.items)) {
        setItems(parsed.items);
      }
    } catch {
    } finally {
      isRestoringDraftRef.current = false;
    }
  }, [draftStorageKey]);
  reactExports.useEffect(() => {
    if (typeof window === "undefined" || isRestoringDraftRef.current) return;
    if (draftSaveTimeoutRef.current) {
      clearTimeout(draftSaveTimeoutRef.current);
    }
    draftSaveTimeoutRef.current = setTimeout(() => {
      const payload = {
        name,
        description,
        isPublic,
        searchType,
        items,
        savedAt: Date.now()
      };
      try {
        window.localStorage.setItem(draftStorageKey, JSON.stringify(payload));
      } catch {
      }
    }, TIERLIST_DRAFT_SAVE_DEBOUNCE_MS);
    return () => {
      if (draftSaveTimeoutRef.current) {
        clearTimeout(draftSaveTimeoutRef.current);
      }
    };
  }, [description, draftStorageKey, isPublic, items, name, searchType]);
  const clearSavedDraft = reactExports.useCallback(() => {
    if (typeof window === "undefined") return;
    try {
      window.localStorage.removeItem(draftStorageKey);
    } catch {
    }
  }, [draftStorageKey]);
  const performSearch = reactExports.useCallback(async (query, type, pageNum) => {
    var _a, _b, _c, _d, _e, _f, _g;
    const requestId = ++latestSearchRequestRef.current;
    if (!query.trim() || query.length < 3) {
      setSearchResults([]);
      setHasNextPage(false);
      setIsSearching(false);
      return;
    }
    setIsSearching(true);
    try {
      if (type === "anime") {
        const search = await contentGraph.search({ query, page: pageNum, perPage: 24 });
        const animeCards = ((search == null ? void 0 : search.media) || []).map(toAnimeCard);
        const data = {
          animes: animeCards,
          hasNextPage: Number(((_a = search == null ? void 0 : search.pageInfo) == null ? void 0 : _a.currentPage) || 1) < Number(((_b = search == null ? void 0 : search.pageInfo) == null ? void 0 : _b.lastPage) || 1)
        };
        const newResults = data.animes.map((anime) => ({
          id: anime.id,
          title: anime.name,
          image: anime.poster,
          type: "anime"
        }));
        if (requestId !== latestSearchRequestRef.current) return;
        setSearchResults((prev) => pageNum === 1 ? newResults : [...prev, ...newResults]);
        setHasNextPage(data.hasNextPage);
      } else if (type === "manga") {
        const res = await searchManga(query, pageNum, 24);
        const rows = (res == null ? void 0 : res.results) || [];
        const newResults = rows.map((row) => {
          const mediaId = String(row.anilistId || row.malId || row.id || "");
          return mediaId ? {
            id: `manga:${mediaId}`,
            title: row.canonicalTitle || "Untitled",
            image: row.poster || "",
            type: "manga"
          } : null;
        }).filter((r) => r !== null);
        if (requestId !== latestSearchRequestRef.current) return;
        setSearchResults((prev) => pageNum === 1 ? newResults : [...prev, ...newResults]);
        setHasNextPage(Boolean(res == null ? void 0 : res.hasNextPage));
      } else {
        const charGql = `
          query ($search: String, $page: Int) {
            Page(page: $page, perPage: 24) {
              characters(search: $search) {
                id
                name { full }
                image { large }
                media(perPage: 1, sort: START_DATE_DESC) {
                  nodes { title { romaji } }
                }
              }
              pageInfo {
                hasNextPage
              }
            }
          }
        `;
        const res = await fetch(ANILIST_GRAPHQL_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query: charGql, variables: { search: query, page: pageNum } })
        });
        const json = await res.json();
        if (requestId !== latestSearchRequestRef.current) return;
        const characters = ((_d = (_c = json == null ? void 0 : json.data) == null ? void 0 : _c.Page) == null ? void 0 : _d.characters) || [];
        const hasNext = ((_g = (_f = (_e = json == null ? void 0 : json.data) == null ? void 0 : _e.Page) == null ? void 0 : _f.pageInfo) == null ? void 0 : _g.hasNextPage) || false;
        const newResults = characters.map((char) => ({
          id: `char:${char.id}`,
          title: char.name.full,
          image: char.image.large,
          type: "character"
        }));
        setSearchResults((prev) => pageNum === 1 ? newResults : [...prev, ...newResults]);
        setHasNextPage(hasNext);
      }
    } catch (error) {
      if (requestId !== latestSearchRequestRef.current) return;
      console.error("Search failed:", error);
      if (pageNum === 1) setSearchResults([]);
      ue.error("Failed to search. Please try again.");
    } finally {
      if (requestId === latestSearchRequestRef.current) {
        setIsSearching(false);
      }
    }
  }, []);
  const handleSearchChange = (value) => {
    setSearchQuery(value);
    setPage(1);
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
    if (value.trim().length >= 3) {
      searchTimeoutRef.current = setTimeout(() => {
        performSearch(value, searchType, 1);
      }, SEARCH_DEBOUNCE_MS);
    } else {
      setSearchResults([]);
      setHasNextPage(false);
    }
  };
  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    performSearch(searchQuery, searchType, nextPage);
  };
  reactExports.useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
      if (draftSaveTimeoutRef.current) {
        clearTimeout(draftSaveTimeoutRef.current);
      }
    };
  }, []);
  const handleSearchTypeChange = (type) => {
    setSearchType(type);
    setPage(1);
    if (searchQuery.trim().length >= 3) {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
      searchTimeoutRef.current = setTimeout(() => {
        performSearch(searchQuery, type, 1);
      }, SEARCH_DEBOUNCE_MS);
    }
  };
  const addItemToTier = (item, tier) => {
    if (items.some((i) => i.anime_id === item.id)) {
      ue.error("This item is already in your tier list");
      return;
    }
    const newItem = {
      anime_id: item.id,
      anime_title: item.title,
      anime_image: item.image,
      tier,
      position: items.filter((i) => i.tier === tier).length
    };
    setItems([...items, newItem]);
    ue.success(`Added ${item.title} to tier ${tier}`);
  };
  const removeItem = (animeId) => {
    setItems(items.filter((i) => i.anime_id !== animeId));
  };
  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };
  const handleDragEnd = (event) => {
    const { active, over } = event;
    setActiveId(null);
    if (!over) return;
    const activeItem2 = items.find((i) => i.anime_id === active.id);
    if (!activeItem2) return;
    const overItem = items.find((i) => i.anime_id === over.id);
    if (overItem && overItem.tier !== activeItem2.tier) {
      setItems(items.map(
        (item) => item.anime_id === active.id ? { ...item, tier: overItem.tier } : item
      ));
    }
  };
  const handleSave = reactExports.useCallback(async () => {
    if (!name.trim()) {
      ue.error("Please enter a name for your tier list");
      return;
    }
    try {
      if (initialData == null ? void 0 : initialData.id) {
        await updateTierList.mutateAsync({
          id: initialData.id,
          name,
          description: description || void 0,
          items,
          is_public: isPublic
        });
        ue.success("Tier list updated!");
      } else {
        await createTierList.mutateAsync({
          name,
          description: description || void 0,
          items,
          is_public: isPublic
        });
        ue.success("Tier list created!");
      }
      clearSavedDraft();
      onSave == null ? void 0 : onSave({ name, description, items, is_public: isPublic });
      onClose == null ? void 0 : onClose();
    } catch (error) {
      const message = (error == null ? void 0 : error.message) || (error == null ? void 0 : error.details) || "Failed to save tier list";
      ue.error(message);
    }
  }, [
    clearSavedDraft,
    createTierList,
    description,
    initialData == null ? void 0 : initialData.id,
    isPublic,
    items,
    name,
    onClose,
    onSave,
    updateTierList
  ]);
  const activeItem = activeId ? items.find((i) => i.anime_id === activeId) : null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            placeholder: "Tier List Name",
            value: name,
            onChange: (e) => setName(e.target.value),
            className: "text-lg font-semibold"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Textarea,
          {
            placeholder: "Description (optional)",
            value: description,
            onChange: (e) => setDescription(e.target.value),
            rows: 2
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-start gap-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        isPublic ? /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { className: "w-4 h-4 text-green-500" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-4 h-4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Public" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Switch, { checked: isPublic, onCheckedChange: setIsPublic })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassPanel, { className: "p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Tabs, { value: searchType, onValueChange: (v) => handleSearchTypeChange(v), className: "mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "grid grid-cols-3 w-72", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "anime", className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Film, { className: "w-4 h-4" }),
          "Anime"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "manga", className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-4 h-4" }),
          "Manga"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "character", className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-4 h-4" }),
          "Characters"
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            placeholder: searchType === "anime" ? "Search anime (min 3 chars)..." : searchType === "manga" ? "Search manga, manhwa, manhua, comics (min 3 chars)..." : "Search characters (min 3 chars)...",
            value: searchQuery,
            onChange: (e) => handleSearchChange(e.target.value),
            className: "pl-10"
          }
        )
      ] }),
      isSearching && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center py-4 text-muted-foreground", children: "Searching..." }),
      searchResults.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-12 gap-2", children: searchResults.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative group", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: item.image,
              alt: item.title,
              className: "w-full aspect-[2/3] rounded-lg object-cover"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex flex-col items-center justify-center p-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-white text-center mb-2 line-clamp-2", children: item.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1 justify-center", children: DEFAULT_TIERS.map((tier) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                onClick: () => addItemToTier(item, tier.name),
                className: "w-5 h-5 rounded text-[10px] font-bold text-white",
                style: { backgroundColor: tier.color },
                children: tier.name
              },
              tier.name
            )) })
          ] })
        ] }, item.id)) }),
        hasNextPage && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center pt-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "secondary", size: "sm", onClick: handleLoadMore, children: "Load More Results" }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      DndContext,
      {
        sensors,
        collisionDetection: closestCenter,
        onDragStart: handleDragStart,
        onDragEnd: handleDragEnd,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: DEFAULT_TIERS.map((tier) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            TierRow,
            {
              tier,
              items: items.filter((i) => i.tier === tier.name),
              onRemoveItem: removeItem
            },
            tier.name
          )) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(DragOverlay, { children: activeItem && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-24 rounded-lg overflow-hidden shadow-xl", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: activeItem.anime_image,
              alt: activeItem.anime_title,
              className: "w-full h-full object-cover"
            }
          ) }) })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end gap-4", children: [
      onClose && /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", onClick: onClose, children: "Cancel" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          onClick: handleSave,
          disabled: createTierList.isPending || updateTierList.isPending,
          className: "gap-2",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "w-4 h-4" }),
            (initialData == null ? void 0 : initialData.id) ? "Update" : "Save",
            " Tier List"
          ]
        }
      )
    ] })
  ] });
}
function useTierListCollaborators(tierListId) {
  return useQuery({
    queryKey: ["tier_list_collaborators", tierListId],
    queryFn: async () => {
      if (!tierListId) return [];
      const db = supabase;
      const { data: collaborators, error } = await db.from("tier_list_collaborators").select("*").eq("tier_list_id", tierListId).order("added_at", { ascending: true });
      if (error) throw error;
      if (!collaborators || collaborators.length === 0) return [];
      const userIds = [...new Set(collaborators.map((collab) => collab.user_id))];
      const profileMap = /* @__PURE__ */ new Map();
      if (userIds.length > 0) {
        const { data: profiles } = await supabase.from("profiles").select("user_id, display_name, username, avatar_url").in("user_id", userIds);
        (profiles || []).forEach((profile) => {
          profileMap.set(profile.user_id, profile);
        });
      }
      return collaborators.map((collab) => ({
        ...collab,
        profile: profileMap.get(collab.user_id) || null
      }));
    },
    enabled: !!tierListId
  });
}
function useTierListAccess(tierListId) {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["tier_list_access", tierListId, user == null ? void 0 : user.id],
    queryFn: async () => {
      if (!tierListId || !user) {
        return {
          isOwner: false,
          role: null,
          canEdit: false,
          canManage: false
        };
      }
      const { data: tierList, error: tierListError } = await supabase.from("tier_lists").select("user_id").eq("id", tierListId).single();
      if (tierListError) throw tierListError;
      if (tierList.user_id === user.id) {
        return {
          isOwner: true,
          role: "owner",
          canEdit: true,
          canManage: true
        };
      }
      const db = supabase;
      const { data: collaborator } = await db.from("tier_list_collaborators").select("role").eq("tier_list_id", tierListId).eq("user_id", user.id).maybeSingle();
      const role = (collaborator == null ? void 0 : collaborator.role) || null;
      return {
        isOwner: false,
        role,
        canEdit: role === "editor" || role === "owner",
        canManage: role === "owner"
      };
    },
    enabled: !!tierListId && !!user
  });
}
function useAddTierListCollaborator() {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  return useMutation({
    mutationFn: async ({
      tierListId,
      userId,
      role
    }) => {
      if (!user) throw new Error("Must be logged in");
      const db = supabase;
      const { error } = await db.from("tier_list_collaborators").insert({
        tier_list_id: tierListId,
        user_id: userId,
        role,
        added_by: user.id
      });
      if (error) throw error;
    },
    onSuccess: (_, { tierListId }) => {
      queryClient.invalidateQueries({ queryKey: ["tier_list_collaborators", tierListId] });
      queryClient.invalidateQueries({ queryKey: ["tier_list_access", tierListId] });
      ue.success("Collaborator added");
    },
    onError: (error) => {
      ue.error((error == null ? void 0 : error.message) || "Failed to add collaborator");
    }
  });
}
function useUpdateTierListCollaboratorRole() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      tierListId,
      collaboratorId,
      role
    }) => {
      const db = supabase;
      const { error } = await db.from("tier_list_collaborators").update({ role }).eq("id", collaboratorId).eq("tier_list_id", tierListId);
      if (error) throw error;
    },
    onSuccess: (_, { tierListId }) => {
      queryClient.invalidateQueries({ queryKey: ["tier_list_collaborators", tierListId] });
      queryClient.invalidateQueries({ queryKey: ["tier_list_access", tierListId] });
      ue.success("Collaborator role updated");
    },
    onError: (error) => {
      ue.error((error == null ? void 0 : error.message) || "Failed to update role");
    }
  });
}
function useRemoveTierListCollaborator() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      tierListId,
      collaboratorId
    }) => {
      const db = supabase;
      const { error } = await db.from("tier_list_collaborators").delete().eq("id", collaboratorId).eq("tier_list_id", tierListId);
      if (error) throw error;
    },
    onSuccess: (_, { tierListId }) => {
      queryClient.invalidateQueries({ queryKey: ["tier_list_collaborators", tierListId] });
      queryClient.invalidateQueries({ queryKey: ["tier_list_access", tierListId] });
      ue.success("Collaborator removed");
    },
    onError: (error) => {
      ue.error((error == null ? void 0 : error.message) || "Failed to remove collaborator");
    }
  });
}
export {
  TierListEditor as T,
  useTierListCollaborators as a,
  useAddTierListCollaborator as b,
  useUpdateTierListCollaboratorRole as c,
  useRemoveTierListCollaborator as d,
  useTierListAccess as u
};
