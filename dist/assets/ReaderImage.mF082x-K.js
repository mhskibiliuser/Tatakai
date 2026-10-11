import { r as reactExports, j as jsxRuntimeExports } from "./react-vendor.CAo4XUiA.js";
import { b6 as Capacitor } from "./vendor.CJyRs4QS.js";
import { f1 as isNativeProxyUrl, cd as isMobileProxyUrl, cf as normalizeMobileHeaders, f2 as getMobileProxyImageBlobUrl, f3 as getMobileHeaderedImageBlobUrl, T as triggerHaptic } from "./index.C6yfkT5T.js";
import { R as RefreshCw, Q as LoaderCircle } from "./icons.C2gBBarQ.js";
function readerPageRenderKey(chapterScope, page) {
  const source = page.proxiedImageUrl || page.imageUrl;
  return `${String(chapterScope)}\0${page.pageNumber}\0${source}`;
}
function shouldUseReaderHeaderBlob(input) {
  return !input.isNativeLoopback && !input.isMobileProxy && input.headerCount > 0 && /^https?:\/\//i.test(input.src);
}
function ReaderImage({ page, mode, style, eager, onRetryChapter }) {
  const src = page.proxiedImageUrl || page.imageUrl;
  const isNativeLoopback = isNativeProxyUrl(src);
  const isProxy = !isNativeLoopback && isMobileProxyUrl(src);
  const headerCount = Object.keys(normalizeMobileHeaders(page.headers)).length;
  const needsHeaderBlob = shouldUseReaderHeaderBlob({
    src,
    headerCount,
    isMobileProxy: isProxy,
    isNativeLoopback
  });
  const useBlobPath = !isNativeLoopback && (isProxy || mode === "blob" || needsHeaderBlob);
  const headerSignature = JSON.stringify(normalizeMobileHeaders(page.headers));
  const sourceIdentity = [
    src,
    mode,
    page.originalUrl || "",
    page.imageUrl,
    headerSignature
  ].join("\0");
  const [blobUrl, setBlobUrl] = reactExports.useState(null);
  const [loaded, setLoaded] = reactExports.useState(false);
  const [failed, setFailed] = reactExports.useState(false);
  const [nonce, setNonce] = reactExports.useState(0);
  const mountedRef = reactExports.useRef(true);
  const retryOwnedBlobRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);
  reactExports.useEffect(() => () => {
    const owned = retryOwnedBlobRef.current;
    retryOwnedBlobRef.current = null;
    if (owned) URL.revokeObjectURL(owned);
  }, [sourceIdentity]);
  reactExports.useEffect(() => {
    setBlobUrl(null);
    setLoaded(false);
    setFailed(false);
  }, [sourceIdentity]);
  reactExports.useEffect(() => {
    if (!useBlobPath) return;
    setFailed(false);
    let cancelled = false;
    let obj = null;
    let owned = false;
    const run = async () => {
      try {
        if (isProxy) {
          const resolved = await getMobileProxyImageBlobUrl(src, {
            originalUrl: page.originalUrl || page.imageUrl,
            headers: page.headers || void 0,
            retries: 3
          });
          if (cancelled || !mountedRef.current) return;
          if (resolved) {
            setBlobUrl(resolved);
            setFailed(false);
          } else {
            setFailed(true);
          }
          return;
        }
        if (needsHeaderBlob) {
          const resolved = await getMobileHeaderedImageBlobUrl(src, page.headers, { retries: 3 });
          if (cancelled || !mountedRef.current) return;
          if (resolved) {
            setBlobUrl(resolved);
            setFailed(false);
          } else {
            setFailed(true);
          }
          return;
        }
        for (let i = 0; i < 3; i++) {
          try {
            const r = await fetch(src);
            if (!r.ok) throw new Error(`HTTP ${r.status}`);
            const b = await r.blob();
            if (!b || b.size === 0) throw new Error("empty");
            if (cancelled || !mountedRef.current) return;
            obj = URL.createObjectURL(b);
            owned = true;
            setBlobUrl(obj);
            setFailed(false);
            return;
          } catch {
            if (i + 1 < 3) await new Promise((r) => setTimeout(r, 500 * (i + 1)));
          }
        }
        if (!cancelled && mountedRef.current) setFailed(true);
      } catch {
        if (!cancelled && mountedRef.current) setFailed(true);
      }
    };
    void run();
    return () => {
      cancelled = true;
      if (owned && obj) URL.revokeObjectURL(obj);
    };
  }, [src, mode, isProxy, needsHeaderBlob, page.originalUrl, page.imageUrl, headerSignature, nonce]);
  reactExports.useEffect(() => {
    if (!failed || !useBlobPath) return;
    let cancelled = false;
    const delays = [750, 2e3, 4500];
    const chain = async () => {
      for (const delay of delays) {
        await new Promise((r) => setTimeout(r, delay));
        if (cancelled || !mountedRef.current) return;
        try {
          let resolved = null;
          let ownsResolved = false;
          if (isProxy) {
            resolved = await getMobileProxyImageBlobUrl(src, {
              originalUrl: page.originalUrl || page.imageUrl,
              headers: page.headers || void 0,
              retries: 1
            });
          } else if (needsHeaderBlob) {
            resolved = await getMobileHeaderedImageBlobUrl(src, page.headers, { retries: 1 });
          } else {
            const r = await fetch(src);
            if (!r.ok) throw new Error(`HTTP ${r.status}`);
            const b = await r.blob();
            if (!b || b.size === 0) throw new Error("empty");
            resolved = URL.createObjectURL(b);
            ownsResolved = true;
          }
          if (cancelled || !mountedRef.current) {
            if (resolved && ownsResolved) URL.revokeObjectURL(resolved);
            return;
          }
          if (resolved) {
            if (ownsResolved) {
              const previous = retryOwnedBlobRef.current;
              if (previous && previous !== resolved) URL.revokeObjectURL(previous);
              retryOwnedBlobRef.current = resolved;
            }
            setBlobUrl(resolved);
            setFailed(false);
            return;
          }
        } catch {
        }
      }
    };
    void chain();
    return () => {
      cancelled = true;
    };
  }, [failed, useBlobPath, isProxy, needsHeaderBlob, src, page.originalUrl, page.imageUrl, headerSignature]);
  reactExports.useEffect(() => {
    if (!Capacitor.isNativePlatform()) return;
    const onFocus = () => {
      if (document.visibilityState === "hidden") return;
      if (failed) {
        setFailed(false);
        setLoaded(false);
        setBlobUrl(null);
        setNonce((n) => n + 1);
        return;
      }
      if (!loaded || useBlobPath && !blobUrl) setNonce((n) => n + 1);
    };
    window.addEventListener("focus", onFocus);
    document.addEventListener("visibilitychange", onFocus);
    return () => {
      window.removeEventListener("focus", onFocus);
      document.removeEventListener("visibilitychange", onFocus);
    };
  }, [loaded, failed, useBlobPath, blobUrl]);
  const aspectRatio = page.width && page.height ? `${page.width} / ${page.height}` : void 0;
  const reserve = aspectRatio ? { aspectRatio } : loaded ? {} : { minHeight: "32vh" };
  const imgSrc = isProxy || needsHeaderBlob ? blobUrl ?? void 0 : mode === "blob" ? blobUrl ?? src : src;
  const showImg = Boolean(imgSrc) && !failed;
  const retry = () => {
    void triggerHaptic("reader-toggle");
    setFailed(false);
    setLoaded(false);
    setBlobUrl(null);
    setNonce((n) => n + 1);
    onRetryChapter == null ? void 0 : onRetryChapter();
  };
  if (failed || !showImg && useBlobPath && failed) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        "data-page": page.pageNumber,
        className: "mx-auto flex w-full flex-col items-center justify-center gap-2 rounded-none bg-white/[0.04] px-6 py-14 text-center",
        style: { ...style, minHeight: "32vh" },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
            "Page ",
            page.pageNumber,
            " failed to load"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: retry,
              className: "inline-flex items-center gap-1.5 rounded-lg border border-white/15 px-3 py-1.5 text-sm font-semibold hover:bg-white/10 active:scale-95",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "h-4 w-4" }),
                " Retry"
              ]
            }
          )
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mx-auto", style, children: [
    !loaded && showImg && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "mx-auto flex items-center justify-center rounded-none bg-white/[0.03]",
        style: { ...style, ...reserve },
        "aria-hidden": true,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-6 w-6 animate-spin text-muted-foreground/60" })
      }
    ),
    showImg ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      "img",
      {
        "data-page": page.pageNumber,
        src: imgSrc,
        alt: `Page ${page.pageNumber}`,
        className: "mx-auto block h-auto rounded-none bg-black/30",
        style: { ...style, ...reserve, contentVisibility: "auto" },
        loading: eager ? "eager" : "lazy",
        fetchPriority: eager ? "high" : "auto",
        decoding: "async",
        draggable: false,
        referrerPolicy: "no-referrer",
        onLoad: () => setLoaded(true),
        onError: () => {
          setFailed(true);
          setLoaded(true);
        }
      }
    ) : null,
    !showImg && !useBlobPath && headerCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        "data-page": page.pageNumber,
        className: "mx-auto flex w-full flex-col items-center justify-center gap-2 rounded-none bg-white/[0.04] px-6 py-14 text-center",
        style: { minHeight: "32vh" },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
            "Page ",
            page.pageNumber,
            " needs a headered reload"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: retry,
              className: "inline-flex items-center gap-1.5 rounded-lg border border-white/15 px-3 py-1.5 text-sm font-semibold hover:bg-white/10",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "h-4 w-4" }),
                " Reload"
              ]
            }
          )
        ]
      }
    )
  ] });
}
export {
  ReaderImage as R,
  readerPageRenderKey as r
};
