import { r as reactExports, j as jsxRuntimeExports } from "./react-vendor.CAo4XUiA.js";
import { d as useInView, u as useReducedMotion } from "./motion.DVGLRFCH.js";
function AnimatedCounter({
  value,
  duration = 1200,
  decimals = 0,
  prefix = "",
  suffix = "",
  className
}) {
  const ref = reactExports.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-20px" });
  const prefersReducedMotion = useReducedMotion();
  const [displayValue, setDisplayValue] = reactExports.useState(prefersReducedMotion ? value : 0);
  reactExports.useEffect(() => {
    if (prefersReducedMotion) {
      setDisplayValue(value);
      return;
    }
    if (!isInView) return;
    let startTime = null;
    let animationFrameId;
    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutCubic(progress);
      const current = easedProgress * value;
      setDisplayValue(current);
      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      } else {
        setDisplayValue(value);
      }
    };
    animationFrameId = requestAnimationFrame(step);
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [value, duration, isInView, prefersReducedMotion]);
  const formatted = decimals > 0 ? displayValue.toLocaleString(void 0, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  }) : Math.round(displayValue).toLocaleString();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { ref, className, children: [
    prefix,
    formatted,
    suffix
  ] });
}
export {
  AnimatedCounter as A
};
