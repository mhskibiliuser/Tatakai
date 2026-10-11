import { l as useSearchParams, e as useNavigate, r as reactExports, j as jsxRuntimeExports } from "./react-vendor.CAo4XUiA.js";
import { u as useAuth, c7 as buildDesktopDeepLink, c8 as isDesktopOAuthState, c9 as isDesktopApp, G as GlassPanel, cb as exchangeMalCode } from "./index.C6yfkT5T.js";
import { bf as ue } from "./vendor.CJyRs4QS.js";
import { Q as LoaderCircle, j as ExternalLink, C as CircleCheck, a as CircleAlert } from "./icons.C2gBBarQ.js";
import "./tanstack.DPr3OB19.js";
import "./supabase.WuRMX5Dg.js";
import "./radix.BiK9uYXL.js";
import "./motion.DVGLRFCH.js";
import "./hls.BlgtCWcq.js";
import "./editor.Dxw8dtyw.js";
import "./charts.Dr1fgDJ-.js";
function MalRedirectPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { refreshProfile } = useAuth();
  const [status, setStatus] = reactExports.useState("loading");
  const [error, setError] = reactExports.useState(null);
  const hasRun = reactExports.useRef(false);
  const desktopDeepLink = reactExports.useMemo(() => {
    const qs = searchParams.toString();
    return buildDesktopDeepLink(`/integration/mal/redirect${qs ? `?${qs}` : ""}`);
  }, [searchParams]);
  reactExports.useEffect(() => {
    if (hasRun.current) return;
    const stateParam = searchParams.get("state");
    if (stateParam && isDesktopOAuthState(stateParam) && !isDesktopApp()) {
      hasRun.current = true;
      setStatus("forwarding");
      window.location.href = desktopDeepLink;
      return;
    }
    hasRun.current = true;
    const code = searchParams.get("code");
    const errorParam = searchParams.get("error");
    if (errorParam) {
      setStatus("error");
      setError(errorParam);
      ue.error(`MAL Error: ${errorParam}`);
      return;
    }
    if (!code) {
      setStatus("error");
      setError("No authorization code found");
      return;
    }
    const completeAuth = async () => {
      try {
        await exchangeMalCode(code);
        await refreshProfile();
        setStatus("success");
        ue.success("Successfully linked MyAnimeList!");
        setTimeout(() => navigate("/profile"), 2e3);
      } catch (err) {
        console.error("MAL Exchange Error:", err);
        setStatus("error");
        setError(err.message || "Failed to exchange code for tokens");
        ue.error("Failed to link MyAnimeList");
      }
    };
    completeAuth();
  }, [searchParams, navigate, desktopDeepLink, refreshProfile]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-background flex items-center justify-center p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassPanel, { className: "max-w-md w-full p-8 text-center space-y-6", children: [
    (status === "loading" || status === "forwarding") && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-12 h-12 text-primary animate-spin mx-auto" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold", children: status === "forwarding" ? "Returning to the app..." : "Linking MyAnimeList..." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: status === "forwarding" ? "Login approved. Opening the Tatakai desktop app to finish linking." : "Please wait while we complete the authentication process." }),
      status === "forwarding" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "a",
        {
          href: desktopDeepLink,
          className: "inline-flex items-center gap-2 mt-2 px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "w-4 h-4" }),
            "Open desktop app"
          ]
        }
      )
    ] }),
    status === "success" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-12 h-12 text-green-500 mx-auto" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold", children: "Success!" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Your MyAnimeList account has been linked. Redirecting you back to your profile..." })
    ] }),
    status === "error" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-12 h-12 text-destructive mx-auto" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold", children: "Authentication Failed" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-destructive font-medium", children: error }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => navigate("/profile"),
          className: "mt-4 px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors",
          children: "Back to Profile"
        }
      )
    ] })
  ] }) });
}
export {
  MalRedirectPage as default
};
