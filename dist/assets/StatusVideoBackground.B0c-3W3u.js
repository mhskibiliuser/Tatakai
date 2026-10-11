import { r as reactExports, j as jsxRuntimeExports } from "./react-vendor.CAo4XUiA.js";
const VIDEO_SOURCES = [
  "./assets/video/1.mp4",
  "./assets/video/2.webm",
  "./assets/video/3.mp4",
  "./assets/video/5.mp4",
  "./assets/video/6.mp4"
];
function StatusVideoBackground({
  overlayColor = "from-background/95 via-background/90 to-background/80"
}) {
  const videoRef = reactExports.useRef(null);
  const [source, setSource] = reactExports.useState("");
  reactExports.useEffect(() => {
    const randomVideo = VIDEO_SOURCES[Math.floor(Math.random() * VIDEO_SOURCES.length)];
    setSource(randomVideo);
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fixed inset-0 w-full h-full overflow-hidden", style: { zIndex: -1 }, children: [
    source && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "video",
      {
        ref: videoRef,
        autoPlay: true,
        muted: true,
        loop: true,
        playsInline: true,
        className: "absolute inset-0 w-full h-full object-cover opacity-40",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("source", { src: source, type: source.endsWith(".webm") ? "video/webm" : "video/mp4" })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `absolute inset-0 bg-gradient-to-b ${overlayColor}` }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "absolute inset-0 opacity-[0.03] pointer-events-none",
        style: { backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }
      }
    )
  ] });
}
export {
  StatusVideoBackground as S
};
