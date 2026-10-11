import { u as useLocation, r as reactExports, j as jsxRuntimeExports } from "./react-vendor.CAo4XUiA.js";
import { D as useIsNativeApp, B as Button, j as cn } from "./index.C6yfkT5T.js";
import { j as ExternalLink } from "./icons.C2gBBarQ.js";
function OpenInAppButton({
  path,
  search,
  label = "Open in app",
  variant = "outline",
  size = "sm",
  className
}) {
  const isNative = useIsNativeApp();
  const location = useLocation();
  const [launching, setLaunching] = reactExports.useState(false);
  const openInApp = reactExports.useCallback(() => {
    const rawPath = (path ?? location.pathname).replace(/^\/+/, "");
    const rawSearch = search ?? location.search ?? "";
    const deepLink = `tatakai://${rawPath}${rawSearch}`;
    setLaunching(true);
    let handled = false;
    const onBlur = () => {
      handled = true;
    };
    window.addEventListener("blur", onBlur, { once: true });
    document.addEventListener("visibilitychange", onBlur, { once: true });
    try {
      window.location.href = deepLink;
    } catch {
    }
    window.setTimeout(() => {
      window.removeEventListener("blur", onBlur);
      document.removeEventListener("visibilitychange", onBlur);
      setLaunching(false);
      if (!handled && document.visibilityState === "visible") {
        window.location.href = "/download";
      }
    }, 1500);
  }, [path, search, location.pathname, location.search]);
  if (isNative) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Button,
    {
      variant,
      size,
      onClick: openInApp,
      disabled: launching,
      className: cn("gap-2", className),
      title: "Open this page in the Tatakai desktop app",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "h-4 w-4" }),
        label
      ]
    }
  );
}
export {
  OpenInAppButton as O
};
