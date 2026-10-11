import { i as useParams, e as useNavigate, j as jsxRuntimeExports } from "./react-vendor.CAo4XUiA.js";
import { K as useIsDesktopApp, u as useAuth, Q as Background, S as Sidebar, a2 as supabase } from "./index.C6yfkT5T.js";
import { M as MobileNav } from "./MobileNav.ABHzkhTQ.js";
import { u as useTierListAccess, T as TierListEditor } from "./useTierListCollaboration.Bk4WIHeE.js";
import { a as useQuery } from "./tanstack.DPr3OB19.js";
import { u as ArrowLeft } from "./icons.C2gBBarQ.js";
import "./vendor.CJyRs4QS.js";
import "./supabase.WuRMX5Dg.js";
import "./radix.BiK9uYXL.js";
import "./motion.DVGLRFCH.js";
import "./hls.BlgtCWcq.js";
import "./editor.Dxw8dtyw.js";
import "./charts.Dr1fgDJ-.js";
function useTierListById(id) {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["tierlist_by_id", id],
    queryFn: async () => {
      const { data, error } = await supabase.from("tier_lists").select("*").eq("id", id).single();
      if (error) throw error;
      return data;
    },
    enabled: !!id && !!user
  });
}
function TierListEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isDesktopApp = useIsDesktopApp();
  const { user } = useAuth();
  const { data: tierList, isLoading, error } = useTierListById(id || "");
  const { data: tierListAccess, isLoading: loadingAccess } = useTierListAccess(tierList == null ? void 0 : tierList.id);
  const handleClose = () => {
    if (tierList == null ? void 0 : tierList.share_code) {
      navigate(`/tierlist/${tierList.share_code}`);
    } else {
      navigate("/tierlists");
    }
  };
  const isOwner = (user == null ? void 0 : user.id) === (tierList == null ? void 0 : tierList.user_id);
  const canEdit = isOwner || !!(tierListAccess == null ? void 0 : tierListAccess.canEdit);
  if (isLoading || tierList && loadingAccess) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-background flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" }) });
  }
  if (error || !tierList) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-background flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-4", children: "Tier list not found" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => navigate("/tierlists"),
          className: "text-primary hover:underline",
          children: "Back to Tier Lists"
        }
      )
    ] }) });
  }
  if (!canEdit) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-background flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-4", children: "You don't have permission to edit this tier list" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => navigate("/tierlists"),
          className: "text-primary hover:underline",
          children: "Back to Tier Lists"
        }
      )
    ] }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background text-foreground overflow-x-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Background, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Sidebar, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: `relative z-10 ${isDesktopApp ? "pl-6" : "pl-6 md:pl-32"} pr-6 py-6 max-w-[1400px] mx-auto pb-24 md:pb-6`, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-4 mb-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: handleClose,
          className: "flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-5 h-5" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Back" })
          ]
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl md:text-4xl font-bold mb-2", children: "Edit Tier List" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Update your anime ranking" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        TierListEditor,
        {
          initialData: {
            id: tierList.id,
            name: tierList.title || tierList.name,
            description: tierList.description,
            items: tierList.items || [],
            is_public: tierList.is_public,
            share_code: tierList.share_code
          },
          onClose: handleClose
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(MobileNav, {})
  ] });
}
export {
  TierListEditPage as default
};
