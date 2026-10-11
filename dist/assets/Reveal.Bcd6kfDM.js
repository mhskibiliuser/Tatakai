import { r as reactExports, j as jsxRuntimeExports } from "./react-vendor.CAo4XUiA.js";
import { u as useReducedMotion, m as motion } from "./motion.DVGLRFCH.js";
function Reveal({ children, delay = 0, className }) {
  const reduceMotion = useReducedMotion();
  const [isMobileViewport, setIsMobileViewport] = reactExports.useState(
    () => typeof window !== "undefined" && window.innerWidth < 768
  );
  reactExports.useEffect(() => {
    var _a;
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(max-width: 767px)");
    const sync = () => setIsMobileViewport(mq.matches);
    sync();
    (_a = mq.addEventListener) == null ? void 0 : _a.call(mq, "change", sync);
    return () => {
      var _a2;
      return (_a2 = mq.removeEventListener) == null ? void 0 : _a2.call(mq, "change", sync);
    };
  }, []);
  if (reduceMotion || isMobileViewport) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className, children });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      className,
      initial: { opacity: 0, y: 24 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true, margin: "0px 0px -10% 0px" },
      transition: { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] },
      children
    }
  );
}
export {
  Reveal as R
};
