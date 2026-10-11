import { r as reactExports, j as jsxRuntimeExports, L as Link } from "./react-vendor.CAo4XUiA.js";
import { l as getProxiedImageUrl, G as GlassPanel, j as cn, P as Peekable, an as peekFromManga, K as useIsDesktopApp, u as useAuth, Q as Background, S as Sidebar, bq as Tabs, br as TabsList, bs as TabsTrigger, bt as Slider, B as Button, bu as TabsContent, a2 as supabase } from "./index.C6yfkT5T.js";
import { M as MobileNav } from "./MobileNav.ABHzkhTQ.js";
import { u as useQueryClient, a as useQuery, b as useMutation } from "./tanstack.DPr3OB19.js";
import { u as useRecommendationEngine } from "./useRecommendationEngine.C_OWm328.js";
import { bf as ue } from "./vendor.CJyRs4QS.js";
import { P as Plus, p as Minus, cc as Maximize2, bK as Compass, B as BookOpen, aI as Star, k as Sparkles, bM as Brain, e as TrendingUp, Z as Film, U as Users, b_ as ThumbsUp, ch as ThumbsDown, af as EyeOff, N as ChevronDown } from "./icons.C2gBBarQ.js";
import { u as useMangaRecommendationEngine } from "./useMangaRecommendationEngine.DdiaumGd.js";
import { R as ResponsiveContainer, b as RadarChart, P as PolarGrid, c as PolarAngleAxis, d as Radar } from "./charts.Dr1fgDJ-.js";
import "./supabase.WuRMX5Dg.js";
import "./radix.BiK9uYXL.js";
import "./motion.DVGLRFCH.js";
import "./hls.BlgtCWcq.js";
import "./editor.Dxw8dtyw.js";
import "./tasteProfile.DMW7D2B1.js";
function buildVectors(metas) {
  const index = /* @__PURE__ */ new Map();
  const tokenize = (m) => {
    const toks = [];
    for (const g of m.genres) toks.push([`g:${g}`, 1]);
    for (const t of m.tags) toks.push([`t:${t}`, 0.6]);
    for (const s of m.studios) toks.push([`s:${s}`, 0.8]);
    return toks;
  };
  const rows = metas.map(tokenize);
  for (const row of rows) for (const [tok] of row) if (!index.has(tok)) index.set(tok, index.size);
  const dim = index.size;
  return rows.map((row) => {
    const vec = new Array(dim).fill(0);
    for (const [tok, w] of row) vec[index.get(tok)] += w;
    let norm2 = 0;
    for (const v of vec) norm2 += v * v;
    norm2 = Math.sqrt(norm2) || 1;
    for (let i = 0; i < dim; i++) vec[i] /= norm2;
    return vec;
  });
}
function gramMatrix(vectors) {
  const n = vectors.length;
  const G = Array.from({ length: n }, () => new Array(n).fill(0));
  for (let i = 0; i < n; i++) {
    for (let j = i; j < n; j++) {
      let dot = 0;
      const vi = vectors[i];
      const vj = vectors[j];
      for (let k = 0; k < vi.length; k++) dot += vi[k] * vj[k];
      G[i][j] = dot;
      G[j][i] = dot;
    }
  }
  return G;
}
function doubleCenter(G) {
  const n = G.length;
  const rowMean = new Array(n).fill(0);
  let grand = 0;
  for (let i = 0; i < n; i++) {
    let s = 0;
    for (let j = 0; j < n; j++) s += G[i][j];
    rowMean[i] = s / n;
    grand += s;
  }
  grand /= n * n;
  const B = Array.from({ length: n }, () => new Array(n).fill(0));
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      B[i][j] = G[i][j] - rowMean[i] - rowMean[j] + grand;
    }
  }
  return B;
}
function matVec(M, v) {
  const n = M.length;
  const out = new Array(n).fill(0);
  for (let i = 0; i < n; i++) {
    let s = 0;
    const row = M[i];
    for (let j = 0; j < n; j++) s += row[j] * v[j];
    out[i] = s;
  }
  return out;
}
function norm(v) {
  let s = 0;
  for (const x of v) s += x * x;
  return Math.sqrt(s);
}
function powerIteration(M, iters, seed) {
  const n = M.length;
  let state = seed || 1;
  const rand = () => {
    state = state * 1103515245 + 12345 & 2147483647;
    return state / 2147483647 - 0.5;
  };
  let v = Array.from({ length: n }, () => rand());
  let nv = norm(v) || 1;
  v = v.map((x) => x / nv);
  for (let it = 0; it < iters; it++) {
    const w = matVec(M, v);
    const wn = norm(w);
    if (wn === 0) break;
    v = w.map((x) => x / wn);
  }
  const Mv = matVec(M, v);
  let val = 0;
  for (let i = 0; i < n; i++) val += v[i] * Mv[i];
  return { vec: v, val };
}
function deflate(M, vec, val) {
  const n = M.length;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      M[i][j] -= val * vec[i] * vec[j];
    }
  }
}
function kNearest(G, i, k, ids) {
  const sims = G[i].map((s, j) => ({ j, s })).filter((o) => o.j !== i).sort((a, b) => b.s - a.s).slice(0, k);
  return sims.map((o) => ids[o.j]);
}
function computeAtlasLayout(metas, opts = {}) {
  const maxNodes = opts.maxNodes ?? 400;
  const neighbors = opts.neighbors ?? 6;
  const items = metas.slice(0, maxNodes);
  const n = items.length;
  if (n === 0) return { nodes: [], bounds: { minX: 0, maxX: 0, minY: 0, maxY: 0 } };
  if (n === 1) {
    const m = items[0];
    return {
      nodes: [{ id: m.id, x: 0, y: 0, title: m.title, poster: m.poster, year: m.year, averageScore: m.averageScore, genres: m.genres, neighbors: [], mediaType: m.mediaType, href: m.href }],
      bounds: { minX: -1, maxX: 1, minY: -1, maxY: 1 }
    };
  }
  const vectors = buildVectors(items);
  const G = gramMatrix(vectors);
  const B = doubleCenter(G);
  const work = B.map((row) => row.slice());
  const e1 = powerIteration(work, 80, 1);
  deflate(work, e1.vec, e1.val);
  const e2 = powerIteration(work, 80, 7);
  const s1 = Math.sqrt(Math.max(0, e1.val));
  const s2 = Math.sqrt(Math.max(0, e2.val));
  const ids = items.map((m) => m.id);
  let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
  const rawX = [];
  const rawY = [];
  for (let i = 0; i < n; i++) {
    const jitter = i * 2654435761 % 1e3 / 1e3 - 0.5;
    const x = e1.vec[i] * s1 + jitter * 0.02;
    const y = e2.vec[i] * s2 + jitter * 0.02;
    rawX.push(x);
    rawY.push(y);
    if (x < minX) minX = x;
    if (x > maxX) maxX = x;
    if (y < minY) minY = y;
    if (y > maxY) maxY = y;
  }
  const nodes = items.map((m, i) => ({
    id: m.id,
    x: rawX[i],
    y: rawY[i],
    title: m.title,
    poster: m.poster,
    year: m.year,
    averageScore: m.averageScore,
    genres: m.genres,
    neighbors: kNearest(G, i, neighbors, ids),
    mediaType: m.mediaType,
    href: m.href
  }));
  return { nodes, bounds: { minX, maxX, minY, maxY } };
}
function interpolate(stops, t) {
  const clamped = Math.max(0, Math.min(1, t));
  const scaled = clamped * (stops.length - 1);
  const i = Math.floor(scaled);
  const f = scaled - i;
  const a = stops[i];
  const b = stops[Math.min(stops.length - 1, i + 1)];
  const r = Math.round(a[0] + (b[0] - a[0]) * f);
  const g = Math.round(a[1] + (b[1] - a[1]) * f);
  const bl = Math.round(a[2] + (b[2] - a[2]) * f);
  return `rgb(${r}, ${g}, ${bl})`;
}
const PLASMA = [
  [13, 8, 135],
  [126, 3, 168],
  [204, 71, 120],
  [248, 149, 64],
  [240, 249, 33]
];
const RDYLGN = [
  [215, 48, 39],
  [254, 224, 139],
  [26, 152, 80]
];
function yearColor(year, minYear, maxYear) {
  if (year == null) return "rgb(120,120,140)";
  const span = Math.max(1, maxYear - minYear);
  return interpolate(PLASMA, (year - minYear) / span);
}
function ratingColor(score) {
  if (score == null) return "rgb(120,120,140)";
  return interpolate(RDYLGN, (score - 40) / 50);
}
function makeStars(count) {
  let s = 987654321;
  const rand = () => {
    s = s * 1103515245 + 12345 & 2147483647;
    return s / 2147483647;
  };
  return Array.from({ length: count }, () => ({ x: rand(), y: rand(), r: rand() * 1.1 + 0.2, a: rand() * 0.4 + 0.08 }));
}
function AnimeAtlas({ layout, colorBy, controls }) {
  const canvasRef = reactExports.useRef(null);
  const containerRef = reactExports.useRef(null);
  const viewRef = reactExports.useRef({ scale: 1, tx: 0, ty: 0 });
  const sizeRef = reactExports.useRef({ w: 0, h: 0, dpr: 1 });
  const dragRef = reactExports.useRef({ active: false, x: 0, y: 0, moved: false });
  const touchRef = reactExports.useRef({
    pan: { active: false, x: 0, y: 0, moved: false },
    pinch: { active: false, dist: 0, mid: { x: 0, y: 0 } }
  });
  const [hovered, setHovered] = reactExports.useState(null);
  const [selected, setSelected] = reactExports.useState(null);
  const stars = reactExports.useMemo(() => makeStars(160), []);
  const byId = reactExports.useMemo(() => new Map(layout.nodes.map((n) => [n.id, n])), [layout]);
  const { minYear, maxYear } = reactExports.useMemo(() => {
    const years = layout.nodes.map((n) => n.year).filter((y) => y != null);
    return { minYear: years.length ? Math.min(...years) : 1990, maxYear: years.length ? Math.max(...years) : (/* @__PURE__ */ new Date()).getFullYear() };
  }, [layout]);
  const colorFor = reactExports.useCallback(
    (n) => colorBy === "year" ? yearColor(n.year, minYear, maxYear) : ratingColor(n.averageScore),
    [colorBy, minYear, maxYear]
  );
  const nodeRadius = reactExports.useCallback((n) => {
    const s = n.averageScore ?? 55;
    return Math.max(3, Math.min(11, 3 + s / 100 * 8));
  }, []);
  const fitView = reactExports.useCallback(() => {
    const { w, h } = sizeRef.current;
    const { minX, maxX, minY, maxY } = layout.bounds;
    const cw = Math.max(1e-3, maxX - minX);
    const ch = Math.max(1e-3, maxY - minY);
    const scale = Math.min(w / cw, h / ch) * 0.82;
    const cx = (minX + maxX) / 2;
    const cy = (minY + maxY) / 2;
    viewRef.current = { scale, tx: w / 2 - cx * scale, ty: h / 2 - cy * scale };
  }, [layout]);
  const draw = reactExports.useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const { w, h, dpr } = sizeRef.current;
    const { scale, tx, ty } = viewRef.current;
    ctx.save();
    ctx.scale(dpr, dpr);
    const bg = ctx.createRadialGradient(w / 2, h * 0.42, 0, w / 2, h * 0.42, Math.max(w, h) * 0.75);
    bg.addColorStop(0, "#0b1020");
    bg.addColorStop(1, "#04050b");
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, w, h);
    for (const st of stars) {
      ctx.globalAlpha = st.a;
      ctx.fillStyle = "#cbd5f5";
      ctx.beginPath();
      ctx.arc(st.x * w, st.y * h, st.r, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
    const sx = (x) => x * scale + tx;
    const sy = (y) => y * scale + ty;
    const highlight = hovered ?? selected;
    const highlightNeighbors = highlight ? new Set(highlight.neighbors) : null;
    if (highlight) {
      ctx.strokeStyle = "rgba(255,255,255,0.2)";
      ctx.lineWidth = 1;
      for (const nid of highlight.neighbors) {
        const nb = byId.get(nid);
        if (!nb) continue;
        ctx.beginPath();
        ctx.moveTo(sx(highlight.x), sy(highlight.y));
        ctx.lineTo(sx(nb.x), sy(nb.y));
        ctx.stroke();
      }
    }
    ctx.globalCompositeOperation = "lighter";
    for (const n of layout.nodes) {
      const x = sx(n.x);
      const y = sy(n.y);
      if (x < -20 || x > w + 20 || y < -20 || y > h + 20) continue;
      const r = nodeRadius(n);
      const color = colorFor(n);
      const focused = highlight && (highlight.id === n.id || (highlightNeighbors == null ? void 0 : highlightNeighbors.has(n.id)));
      const alpha = highlight ? focused ? 1 : 0.22 : 0.92;
      const glow = ctx.createRadialGradient(x, y, 0, x, y, r * 3);
      glow.addColorStop(0, color);
      glow.addColorStop(1, "rgba(0,0,0,0)");
      ctx.globalAlpha = alpha * 0.5;
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(x, y, r * 3, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = alpha;
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalCompositeOperation = "source-over";
    ctx.globalAlpha = 1;
    if (highlight) {
      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.arc(sx(highlight.x), sy(highlight.y), 2, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.font = "600 12px system-ui, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "bottom";
    const labelFor = (n, strong) => {
      const x = sx(n.x);
      const y = sy(n.y);
      const text = n.title.length > 28 ? n.title.slice(0, 27) + "…" : n.title;
      ctx.lineWidth = 3;
      ctx.strokeStyle = "rgba(0,0,0,0.65)";
      ctx.strokeText(text, x, y - nodeRadius(n) - 3);
      ctx.fillStyle = strong ? "rgba(255,255,255,0.97)" : "rgba(255,255,255,0.65)";
      ctx.fillText(text, x, y - nodeRadius(n) - 3);
    };
    if (highlight) {
      labelFor(highlight, true);
      for (const nid of highlight.neighbors) {
        const nb = byId.get(nid);
        if (nb) labelFor(nb, false);
      }
    } else {
      for (const n of layout.nodes) {
        if (nodeRadius(n) >= 9 && scale > 40) labelFor(n, false);
      }
    }
    const vg = ctx.createRadialGradient(w / 2, h / 2, Math.min(w, h) * 0.35, w / 2, h / 2, Math.max(w, h) * 0.72);
    vg.addColorStop(0, "rgba(0,0,0,0)");
    vg.addColorStop(1, "rgba(0,0,0,0.55)");
    ctx.fillStyle = vg;
    ctx.fillRect(0, 0, w, h);
    ctx.restore();
  }, [layout, hovered, selected, colorFor, nodeRadius, stars, byId]);
  const hitTest = reactExports.useCallback((mx, my) => {
    const { scale, tx, ty } = viewRef.current;
    let best = null;
    let bestDist = Infinity;
    for (const n of layout.nodes) {
      const x = n.x * scale + tx;
      const y = n.y * scale + ty;
      const r = nodeRadius(n) + 4;
      const d = Math.hypot(x - mx, y - my);
      if (d < r && d < bestDist) {
        bestDist = d;
        best = n;
      }
    }
    return best;
  }, [layout, nodeRadius]);
  const zoomBy = reactExports.useCallback((factor) => {
    const { w, h } = sizeRef.current;
    const v = viewRef.current;
    v.tx = w / 2 - (w / 2 - v.tx) * factor;
    v.ty = h / 2 - (h / 2 - v.ty) * factor;
    v.scale *= factor;
    draw();
  }, [draw]);
  const resetView = reactExports.useCallback(() => {
    fitView();
    draw();
  }, [fitView, draw]);
  reactExports.useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;
    const resize = () => {
      const rect = container.getBoundingClientRect();
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      sizeRef.current = { w: rect.width, h: rect.height, dpr };
      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      fitView();
      draw();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(container);
    return () => ro.disconnect();
  }, [fitView, draw]);
  reactExports.useEffect(() => {
    draw();
  }, [draw]);
  reactExports.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const localXY = (clientX, clientY) => {
      const rect = canvas.getBoundingClientRect();
      return { x: clientX - rect.left, y: clientY - rect.top };
    };
    const localMouse = (e) => localXY(e.clientX, e.clientY);
    const onDown = (e) => {
      const { x, y } = localMouse(e);
      dragRef.current = { active: true, x, y, moved: false };
    };
    const onMove = (e) => {
      const { x, y } = localMouse(e);
      if (dragRef.current.active) {
        const dx = x - dragRef.current.x;
        const dy = y - dragRef.current.y;
        if (Math.abs(dx) + Math.abs(dy) > 2) dragRef.current.moved = true;
        viewRef.current.tx += dx;
        viewRef.current.ty += dy;
        dragRef.current.x = x;
        dragRef.current.y = y;
        draw();
      } else {
        const hit = hitTest(x, y);
        setHovered((prev) => (prev == null ? void 0 : prev.id) === (hit == null ? void 0 : hit.id) ? prev : hit);
        canvas.style.cursor = hit ? "pointer" : "grab";
      }
    };
    const onUp = (e) => {
      if (dragRef.current.active && !dragRef.current.moved) {
        const { x, y } = localMouse(e);
        const hit = hitTest(x, y);
        if (hit) setSelected(hit);
      }
      dragRef.current.active = false;
    };
    const onLeave = () => {
      setHovered(null);
      dragRef.current.active = false;
    };
    const onWheel = (e) => {
      e.preventDefault();
      const { x, y } = localMouse(e);
      const f = Math.exp(-e.deltaY * 15e-4);
      const v = viewRef.current;
      v.tx = x - (x - v.tx) * f;
      v.ty = y - (y - v.ty) * f;
      v.scale *= f;
      draw();
    };
    const touchState = touchRef.current;
    const onTouchStart = (e) => {
      if (e.touches.length === 1) {
        const t = e.touches[0];
        const { x, y } = localXY(t.clientX, t.clientY);
        touchState.pan = { active: true, x, y, moved: false };
      } else if (e.touches.length === 2) {
        const a = e.touches[0];
        const b = e.touches[1];
        touchState.pan.active = false;
        touchState.pinch = {
          active: true,
          dist: Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY),
          mid: { x: (a.clientX + b.clientX) / 2, y: (a.clientY + b.clientY) / 2 }
        };
        e.preventDefault();
      }
    };
    const onTouchMove = (e) => {
      if (e.touches.length === 2 && touchState.pinch.active) {
        const a = e.touches[0];
        const b = e.touches[1];
        const dist = Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY);
        const rect = canvas.getBoundingClientRect();
        const mx = (a.clientX + b.clientX) / 2 - rect.left;
        const my = (a.clientY + b.clientY) / 2 - rect.top;
        if (touchState.pinch.dist > 0 && dist > 0) {
          const f = dist / touchState.pinch.dist;
          const v = viewRef.current;
          v.tx = mx - (mx - v.tx) * f;
          v.ty = my - (my - v.ty) * f;
          v.scale = Math.max(4, Math.min(4e3, v.scale * f));
          draw();
        }
        touchState.pinch.dist = dist;
        e.preventDefault();
        return;
      }
      if (e.touches.length === 1 && touchState.pan.active) {
        const t = e.touches[0];
        const { x, y } = localXY(t.clientX, t.clientY);
        const dx = x - touchState.pan.x;
        const dy = y - touchState.pan.y;
        if (Math.abs(dx) + Math.abs(dy) > 4) touchState.pan.moved = true;
        if (touchState.pan.moved && Math.abs(dx) > Math.abs(dy)) {
          viewRef.current.tx += dx;
          viewRef.current.ty += dy;
          draw();
          e.preventDefault();
        }
        touchState.pan.x = x;
        touchState.pan.y = y;
      }
    };
    const onTouchEnd = (e) => {
      if (touchState.pinch.active) {
        if (e.touches.length < 2) touchState.pinch.active = false;
        if (e.touches.length === 1) {
          const t = e.touches[0];
          const { x, y } = localXY(t.clientX, t.clientY);
          touchState.pan = { active: true, x, y, moved: false };
        }
        return;
      }
      if (touchState.pan.active && !touchState.pan.moved && e.changedTouches.length > 0) {
        const t = e.changedTouches[0];
        const { x, y } = localXY(t.clientX, t.clientY);
        const hit = hitTest(x, y);
        if (hit) setSelected(hit);
      }
      touchState.pan.active = false;
    };
    canvas.addEventListener("mousedown", onDown);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    canvas.addEventListener("mouseleave", onLeave);
    canvas.addEventListener("wheel", onWheel, { passive: false });
    canvas.addEventListener("touchstart", onTouchStart, { passive: true });
    canvas.addEventListener("touchmove", onTouchMove, { passive: false });
    canvas.addEventListener("touchend", onTouchEnd);
    canvas.addEventListener("touchcancel", onTouchEnd);
    return () => {
      canvas.removeEventListener("mousedown", onDown);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      canvas.removeEventListener("mouseleave", onLeave);
      canvas.removeEventListener("wheel", onWheel);
      canvas.removeEventListener("touchstart", onTouchStart);
      canvas.removeEventListener("touchmove", onTouchMove);
      canvas.removeEventListener("touchend", onTouchEnd);
      canvas.removeEventListener("touchcancel", onTouchEnd);
    };
  }, [draw, hitTest]);
  const info = hovered ?? selected;
  const infoHref = info ? info.href ?? `/anime/${info.id}` : "#";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { ref: containerRef, className: "relative h-[420px] md:h-[560px] w-full overflow-hidden rounded-2xl border border-white/10", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("canvas", { ref: canvasRef, className: "block h-full w-full [touch-action:pan-y]", style: { cursor: "grab" } }),
    controls && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute left-3 top-3 flex max-w-[calc(100%-1.5rem)] flex-wrap items-center gap-2 rounded-xl border border-white/10 bg-black/55 px-2.5 py-2 backdrop-blur-md", children: controls }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute bottom-3 right-3 flex flex-col gap-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => zoomBy(1.3), "aria-label": "Zoom in", className: "flex h-10 w-10 md:h-8 md:w-8 items-center justify-center rounded-lg border border-white/10 bg-black/55 text-white/80 backdrop-blur-md transition-colors hover:bg-white/10 active:scale-95", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => zoomBy(1 / 1.3), "aria-label": "Zoom out", className: "flex h-10 w-10 md:h-8 md:w-8 items-center justify-center rounded-lg border border-white/10 bg-black/55 text-white/80 backdrop-blur-md transition-colors hover:bg-white/10 active:scale-95", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Minus, { className: "h-4 w-4" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: resetView, "aria-label": "Reset view", className: "flex h-10 w-10 md:h-8 md:w-8 items-center justify-center rounded-lg border border-white/10 bg-black/55 text-white/80 backdrop-blur-md transition-colors hover:bg-white/10 active:scale-95", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Maximize2, { className: "h-4 w-4" }) })
    ] }),
    info && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute bottom-3 left-3 w-[min(16rem,calc(100%-1.5rem))] rounded-xl border border-white/10 bg-black/80 p-3 backdrop-blur-md flex gap-3", children: [
      info.poster && /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: getProxiedImageUrl(info.poster), alt: info.title, className: "h-24 w-16 flex-shrink-0 rounded-md object-cover", loading: "lazy" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: infoHref, className: "block text-sm font-bold text-white hover:text-primary line-clamp-2", children: info.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 text-xs text-muted-foreground", children: [
          info.mediaType === "manga" ? "Manga" : "Anime",
          info.year ? ` · ${info.year}` : "",
          info.averageScore != null ? ` · ★ ${(info.averageScore / 10).toFixed(1)}` : ""
        ] }),
        info.genres.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-[10px] text-white/50 line-clamp-2", children: info.genres.slice(0, 3).join(" · ") })
      ] })
    ] })
  ] });
}
function Segmented({
  value,
  options,
  onChange
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-flex overflow-hidden rounded-lg border border-white/10 text-[11px]", children: options.map((o) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    "button",
    {
      onClick: () => onChange(o.id),
      className: cn(
        "px-2.5 py-1 font-semibold transition-colors",
        value === o.id ? "bg-primary text-primary-foreground" : "bg-white/5 text-white/65 hover:bg-white/10"
      ),
      children: o.label
    },
    o.id
  )) });
}
function AnimeAtlasPanel({
  animeRecs,
  mangaRecs
}) {
  const [colorBy, setColorBy] = reactExports.useState("year");
  const [media, setMedia] = reactExports.useState("all");
  const hasManga = mangaRecs.length > 0;
  const effectiveMedia = !hasManga && media === "manga" ? "all" : media;
  const metas = reactExports.useMemo(() => {
    const out = [];
    if (effectiveMedia !== "manga") {
      for (const r of animeRecs) out.push({ ...r.anime, id: `anime:${r.anime.id}`, mediaType: "anime", href: `/anime/${r.anime.id}` });
    }
    if (effectiveMedia !== "anime") {
      for (const r of mangaRecs) out.push({ ...r.anime, id: `manga:${r.anime.id}`, mediaType: "manga", href: `/manga/${r.anime.id}` });
    }
    return out;
  }, [animeRecs, mangaRecs, effectiveMedia]);
  const layout = reactExports.useMemo(() => computeAtlasLayout(metas, { maxNodes: 500, neighbors: 6 }), [metas]);
  const controls = /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-medium uppercase tracking-wide text-white/45", children: "Color" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Segmented,
      {
        value: colorBy,
        onChange: (id) => setColorBy(id),
        options: [{ id: "year", label: "Year" }, { id: "rating", label: "Rating" }]
      }
    ),
    hasManga && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mx-0.5 h-4 w-px bg-white/15" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-medium uppercase tracking-wide text-white/45", children: "Type" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Segmented,
        {
          value: effectiveMedia,
          onChange: (id) => setMedia(id),
          options: [{ id: "all", label: "All" }, { id: "anime", label: "Anime" }, { id: "manga", label: "Manga" }]
        }
      )
    ] })
  ] });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassPanel, { className: "p-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-4 flex flex-wrap items-center justify-between gap-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-lg bg-primary/20 p-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Compass, { className: "h-5 w-5 text-primary" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold", children: "Anime & Manga Atlas" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Your recommendation space, mapped by similarity — closer titles are more alike." })
      ] })
    ] }) }),
    layout.nodes.length < 3 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "py-16 text-center text-sm text-muted-foreground", children: "Not enough recommendations to map yet. Watch, rate or read more to populate the atlas." }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(AnimeAtlas, { layout, colorBy, controls }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex items-center gap-3 text-[10px] text-white/50", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: colorBy === "year" ? "Older" : "Lower rated" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "h-2 flex-1 rounded-full",
            style: {
              background: colorBy === "year" ? "linear-gradient(90deg, rgb(13,8,135), rgb(126,3,168), rgb(204,71,120), rgb(248,149,64), rgb(240,249,33))" : "linear-gradient(90deg, rgb(215,48,39), rgb(254,224,139), rgb(26,152,80))"
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: colorBy === "year" ? "Newer" : "Higher rated" })
      ] })
    ] })
  ] });
}
function MangaRecommendationGrid({
  recommendations,
  isLoading
}) {
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4", children: Array.from({ length: 12 }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-[2/3] bg-muted/50 rounded-xl animate-pulse" }, i)) });
  }
  if (recommendations.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassPanel, { className: "p-8 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-12 h-12 mx-auto mb-4 text-muted-foreground opacity-50" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Add manga to your readlist to get personalized manga, manhwa and manhua picks." })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4", children: recommendations.map((rec) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    Peekable,
    {
      media: peekFromManga(
        {
          id: rec.anime.id,
          name: rec.anime.title,
          poster: rec.anime.poster,
          type: rec.anime.format,
          rating: rec.anime.score != null ? rec.anime.score : void 0
        },
        `/manga/${rec.anime.id}`
      ),
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(GlassPanel, { hoverEffect: true, className: "group overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: `/manga/${rec.anime.id}`, className: "block", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-[2/3]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: getProxiedImageUrl(rec.anime.poster ?? ""),
              alt: rec.anime.title,
              className: "w-full h-full object-cover transition-transform duration-500 group-hover:scale-110",
              loading: "lazy"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute top-3 right-3 px-3 py-1.5 rounded-full bg-primary/90 backdrop-blur text-primary-foreground text-xs font-bold flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-3 h-3 fill-current" }),
            rec.score,
            "%"
          ] }),
          rec.anime.format && rec.anime.format !== "manga" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-3 left-3 px-2 py-1 rounded-md text-[10px] font-bold uppercase bg-black/60 text-white", children: rec.anime.format })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-sm line-clamp-2 group-hover:text-primary transition-colors", children: rec.anime.title }),
          rec.reasons[0] && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground line-clamp-1", children: [
            "• ",
            rec.reasons[0]
          ] })
        ] })
      ] }) })
    },
    rec.anime.id
  )) });
}
const FACTOR_ITEMS = [
  { key: "genreMatch", label: "Genre fit", color: "bg-primary" },
  { key: "collaborative", label: "Community", color: "bg-fuchsia-500" },
  { key: "ratingMatch", label: "Rating fit", color: "bg-green-500" },
  { key: "studioMatch", label: "Studio fit", color: "bg-amber-500" },
  { key: "tagMatch", label: "Theme fit", color: "bg-blue-500" },
  { key: "recencyBoost", label: "Era fit", color: "bg-cyan-500" },
  { key: "popularityBoost", label: "Popularity", color: "bg-rose-500" }
];
function RecommendationCard({
  recommendation,
  feedback,
  onFeedback
}) {
  const { anime, score, confidence, reasons, factors } = recommendation;
  const [showExplain, setShowExplain] = reactExports.useState(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassPanel, { hoverEffect: true, className: "group overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-[2/3]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: `/anime/${anime.id}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "img",
        {
          src: getProxiedImageUrl(anime.poster ?? ""),
          alt: anime.title,
          className: "w-full h-full object-cover transition-transform duration-500 group-hover:scale-110",
          loading: "lazy"
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute top-3 right-3 px-3 py-1.5 rounded-full bg-primary/90 backdrop-blur text-primary-foreground text-xs font-bold flex items-center gap-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-3 h-3 fill-current" }),
        score,
        "%"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-3 left-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `px-2 py-1 rounded-md text-xs font-bold ${confidence > 0.7 ? "bg-green-500/80 text-white" : confidence > 0.4 ? "bg-yellow-500/80 text-white" : "bg-gray-500/80 text-white"}`, children: [
        confidence > 0.7 ? "High" : confidence > 0.4 ? "Medium" : "Low",
        " Match"
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: `/anime/${anime.id}`, className: "block font-bold text-sm line-clamp-2 hover:text-primary transition-colors", children: anime.title }),
      reasons.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1", children: reasons.slice(0, 2).map((reason, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground line-clamp-1", children: [
        "• ",
        reason
      ] }, i)) }),
      feedback && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[10px] uppercase tracking-wide text-primary font-bold", children: [
        "Feedback: ",
        feedback.replace("_", " ")
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => onFeedback(anime.id, "like", recommendation),
            className: `h-7 px-2 rounded-md border text-[10px] font-bold uppercase tracking-wide ${feedback === "like" ? "bg-green-500/20 text-green-400 border-green-500/40" : "bg-white/5 border-white/10 hover:border-green-500/40"}`,
            title: "More like this",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(ThumbsUp, { className: "w-3 h-3" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => onFeedback(anime.id, "dislike", recommendation),
            className: `h-7 px-2 rounded-md border text-[10px] font-bold uppercase tracking-wide ${feedback === "dislike" ? "bg-red-500/20 text-red-400 border-red-500/40" : "bg-white/5 border-white/10 hover:border-red-500/40"}`,
            title: "Not interested",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(ThumbsDown, { className: "w-3 h-3" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => onFeedback(anime.id, "skip", recommendation),
            className: `h-7 px-2 rounded-md border text-[10px] font-bold uppercase tracking-wide ${feedback === "skip" ? "bg-slate-500/25 text-slate-300 border-slate-400/40" : "bg-white/5 border-white/10 hover:border-slate-400/40"}`,
            title: "Skip for now",
            children: "Skip"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => onFeedback(anime.id, "already_seen", recommendation),
            className: `h-7 px-2 rounded-md border text-[10px] font-bold uppercase tracking-wide ${feedback === "already_seen" ? "bg-amber-500/20 text-amber-400 border-amber-500/40" : "bg-white/5 border-white/10 hover:border-amber-500/40"}`,
            title: "Already watched",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "w-3 h-3" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => setShowExplain((p) => !p),
            className: "ml-auto h-7 px-2 rounded-md border border-white/10 bg-white/5 text-[10px] font-bold uppercase tracking-wide flex items-center gap-1",
            children: [
              "Why",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: `w-3 h-3 transition-transform ${showExplain ? "rotate-180" : ""}` })
            ]
          }
        )
      ] }),
      showExplain && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pt-2 border-t border-white/10 space-y-1.5", children: FACTOR_ITEMS.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-[10px] text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: item.label }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            Math.round((factors[item.key] ?? 0) * 100),
            "%"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1.5 rounded bg-white/10 overflow-hidden mt-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `h-full ${item.color}`, style: { width: `${Math.round((factors[item.key] ?? 0) * 100)}%` } }) })
      ] }, item.key)) })
    ] })
  ] });
}
function TasteProfileDisplay({ profile }) {
  const radarData = profile.topGenres.slice(0, 6).map((g) => ({
    genre: g.genre,
    weight: Math.round(g.weight * 100)
  }));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassPanel, { className: "p-6 space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-3 bg-primary/20 rounded-xl", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Brain, { className: "w-6 h-6 text-primary" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold", children: "Your Taste Profile" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
          "Built from ",
          profile.sampleSize,
          " title",
          profile.sampleSize === 1 ? "" : "s",
          " across your lists, ratings and history"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
      radarData.length >= 3 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-56", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(RadarChart, { data: radarData, outerRadius: "72%", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(PolarGrid, { stroke: "hsl(var(--border))" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(PolarAngleAxis, { dataKey: "genre", tick: { fill: "hsl(var(--muted-foreground))", fontSize: 11 } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Radar, { dataKey: "weight", stroke: "hsl(var(--primary))", fill: "hsl(var(--primary))", fillOpacity: 0.4 })
      ] }) }) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-bold text-muted-foreground mb-2", children: "Top Genres" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1", children: profile.topGenres.slice(0, 5).map((g, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", children: g.genre }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-24 h-2 bg-muted rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full bg-primary", style: { width: `${g.weight * 100}%` } }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground w-8 text-right", children: [
              Math.round(g.weight * 100),
              "%"
            ] })
          ] })
        ] }, i)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-bold text-muted-foreground mb-2", children: "Rating Range" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm", children: [
            profile.ratingRange.min.toFixed(1),
            " - ",
            profile.ratingRange.max.toFixed(1),
            " (avg: ",
            profile.ratingRange.average.toFixed(1),
            ")"
          ] })
        ] }),
        profile.topStudios.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-bold text-muted-foreground mb-2", children: "Favorite Studios" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: profile.topStudios.slice(0, 4).map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-2 py-1 bg-primary/20 text-primary text-xs rounded", children: s.studio }, i)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-bold text-muted-foreground mb-2", children: "Diversity Score" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-2 bg-muted rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full bg-green-500", style: { width: `${profile.diversityScore * 100}%` } }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-bold", children: [
              Math.round(profile.diversityScore * 100),
              "%"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: profile.diversityScore > 0.7 ? "Very diverse taste" : profile.diversityScore > 0.4 ? "Moderate diversity" : "Focused preferences" })
        ] })
      ] })
    ] })
  ] });
}
function RecommendationsPage() {
  const isDesktopApp = useIsDesktopApp();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [nicheBoost, setNicheBoost] = reactExports.useState(0.3);
  const [filter, setFilter] = reactExports.useState("all");
  const { recommendations, profile, isLoading } = useRecommendationEngine({ nicheBoost, limit: 40 });
  const { recommendations: mangaRecs, isLoading: loadingManga } = useMangaRecommendationEngine({ nicheBoost, limit: 30 });
  const { data: recommendationFeedback = {} } = useQuery({
    queryKey: ["recommendation-feedback", user == null ? void 0 : user.id],
    enabled: !!user,
    queryFn: async () => {
      if (!user) return {};
      const { data, error } = await supabase.from("recommendation_feedback").select("anime_id, feedback").eq("user_id", user.id).limit(500);
      if (error) {
        console.warn("[Recommendations] Failed to load feedback:", error.message);
        return {};
      }
      const mapped = {};
      (data || []).forEach((row) => {
        if ((row == null ? void 0 : row.anime_id) && (row == null ? void 0 : row.feedback)) mapped[row.anime_id] = row.feedback;
      });
      return mapped;
    }
  });
  const feedbackMutation = useMutation({
    mutationFn: async ({ animeId, feedback, recommendation }) => {
      if (!user) throw new Error("Not authenticated");
      const payload = {
        user_id: user.id,
        anime_id: animeId,
        feedback,
        recommendation_score: recommendation.score,
        reasons_snapshot: recommendation.reasons,
        factors_snapshot: recommendation.factors,
        updated_at: (/* @__PURE__ */ new Date()).toISOString()
      };
      const { error } = await supabase.from("recommendation_feedback").upsert(payload, { onConflict: "user_id,anime_id" });
      if (error) throw error;
    },
    onSuccess: (_, vars) => {
      queryClient.setQueryData(["recommendation-feedback", user == null ? void 0 : user.id], (prev) => ({
        ...prev || {},
        [vars.animeId]: vars.feedback
      }));
    }
  });
  const handleFeedback = (animeId, feedback, recommendation) => {
    feedbackMutation.mutate({ animeId, feedback, recommendation }, {
      onSuccess: () => {
        const label = feedback === "already_seen" ? "already watched" : feedback;
        ue.success(`Feedback saved: ${label}`);
      },
      onError: (error) => ue.error((error == null ? void 0 : error.message) || "Failed to save recommendation feedback")
    });
  };
  if (!user) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-background flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassPanel, { className: "p-8 text-center max-w-md", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-16 h-16 mx-auto mb-4 text-primary" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold mb-2", children: "Sign In Required" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-4", children: "Sign in to get personalized recommendations from your lists, ratings and viewing history." })
    ] }) });
  }
  const filteredRecommendations = recommendations.filter((rec) => {
    const existing = recommendationFeedback[rec.anime.id];
    if (existing === "dislike" || existing === "already_seen" || existing === "skip") return false;
    if (filter === "high") return rec.confidence > 0.7;
    if (filter === "medium") return rec.confidence > 0.4 && rec.confidence <= 0.7;
    return true;
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background text-foreground", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Background, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Sidebar, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: `relative z-10 ${isDesktopApp ? "pl-4" : "pl-4 md:pl-28"} pr-4 md:pr-6 py-4 md:py-6`, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 bg-primary/20 rounded-lg", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-6 h-6 text-primary" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold", children: "Recommendations" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Personalized from your lists, ratings and history, blended with what similar fans enjoy" })
        ] })
      ] }) }),
      isLoading && !profile ? /* @__PURE__ */ jsxRuntimeExports.jsx(GlassPanel, { className: "p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "animate-pulse space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-4 bg-muted rounded w-1/3" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-4 bg-muted rounded w-2/3" })
      ] }) }) : profile && profile.sampleSize > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(TasteProfileDisplay, { profile }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassPanel, { className: "p-6 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Brain, { className: "w-12 h-12 mx-auto mb-4 text-muted-foreground opacity-50" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Watch, rate or add some anime to build your taste profile." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "grid", className: "mt-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center justify-between gap-4 mb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "grid", className: "gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-4 h-4" }),
              " For You"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "manga", className: "gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-4 h-4" }),
              " Manga"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "atlas", className: "gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Compass, { className: "w-4 h-4" }),
              " Atlas"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 min-w-[220px]", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground whitespace-nowrap", children: "Popular" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Slider, { value: [nicheBoost], min: 0, max: 1, step: 0.05, onValueChange: (v) => setNicheBoost(v[0]), className: "w-32" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground whitespace-nowrap", children: "Niche" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: filter === "all" ? "default" : "outline", size: "sm", onClick: () => setFilter("all"), children: "All" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: filter === "high" ? "default" : "outline", size: "sm", onClick: () => setFilter("high"), children: "High" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: filter === "medium" ? "default" : "outline", size: "sm", onClick: () => setFilter("medium"), children: "Medium" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsContent, { value: "grid", children: [
          isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4", children: Array.from({ length: 12 }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-[2/3] bg-muted/50 rounded-xl animate-pulse" }, i)) }) : filteredRecommendations.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4", children: filteredRecommendations.map((rec) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            RecommendationCard,
            {
              recommendation: rec,
              feedback: recommendationFeedback[rec.anime.id],
              onFeedback: handleFeedback
            },
            rec.anime.id
          )) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassPanel, { className: "p-8 text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Film, { className: "w-12 h-12 mx-auto mb-4 text-muted-foreground opacity-50" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "No recommendations yet. Watch and rate more anime to improve suggestions." })
          ] }),
          recommendations.some((r) => r.factors.collaborative > 0) && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-4 flex items-center gap-2 text-xs text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-3.5 h-3.5" }),
            "Community signal is active — some picks are boosted by fans with similar taste."
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsContent, { value: "manga", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-5 h-5 text-primary" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-bold", children: "Manga, Manhwa & Manhua for you" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "Based on your readlist" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(MangaRecommendationGrid, { recommendations: mangaRecs, isLoading: loadingManga })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "atlas", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimeAtlasPanel, { animeRecs: recommendations, mangaRecs }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(MobileNav, {})
  ] });
}
export {
  RecommendationsPage as default
};
