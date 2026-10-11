const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/mobileExtensionInstaller.JRaHR6CG.js","assets/vendor.CJyRs4QS.js","assets/react-vendor.CAo4XUiA.js","assets/index.C6yfkT5T.js","assets/tanstack.DPr3OB19.js","assets/supabase.WuRMX5Dg.js","assets/radix.BiK9uYXL.js","assets/icons.C2gBBarQ.js","assets/motion.DVGLRFCH.js","assets/hls.BlgtCWcq.js","assets/editor.Dxw8dtyw.js","assets/charts.Dr1fgDJ-.js","assets/index.CWbmAlRn.css"])))=>i.map(i=>d[i]);
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
import { ba as CapacitorHttp, bw as buffer, b9 as __vitePreload } from "./vendor.CJyRs4QS.js";
import { a as isCapacitor, c as applyMobileProxyToSource, e as applyMobileProxyToPages } from "./index.C6yfkT5T.js";
import "./react-vendor.CAo4XUiA.js";
import "./tanstack.DPr3OB19.js";
import "./supabase.WuRMX5Dg.js";
import "./radix.BiK9uYXL.js";
import "./icons.C2gBBarQ.js";
import "./motion.DVGLRFCH.js";
import "./hls.BlgtCWcq.js";
import "./editor.Dxw8dtyw.js";
import "./charts.Dr1fgDJ-.js";
const unhealthyHosts = /* @__PURE__ */ new Map();
const HOST_COOLDOWN_MS = 9e4;
function networkFailureText(error) {
  if (error instanceof Error) return `${error.name} ${error.message}`.toLowerCase();
  try {
    return JSON.stringify(error).toLowerCase();
  } catch {
    return String(error).toLowerCase();
  }
}
function isTransientHostFailure(error) {
  const text = networkFailureText(error);
  return [
    "unknownhostexception",
    "sockettimeoutexception",
    "unable to resolve host",
    "no address associated with hostname",
    "failed to connect",
    "read timed out",
    "connect timed out"
  ].some((part) => text.includes(part));
}
function unavailableHostError(hostname) {
  const error = new Error(`Provider host ${hostname} is temporarily unavailable`);
  error.name = "NetworkUnavailableError";
  return error;
}
function toHeaderGetter(headers) {
  const lower = /* @__PURE__ */ new Map();
  for (const [k, v] of Object.entries(headers || {})) lower.set(k.toLowerCase(), String(v));
  return { get: (name) => lower.get(String(name).toLowerCase()) ?? null };
}
function normalizeHeaders(input) {
  const out = {};
  if (!input) return out;
  const anyIn = input;
  if (typeof anyIn.forEach === "function" && typeof anyIn.get === "function") {
    anyIn.forEach((value, name) => {
      out[name] = String(value);
    });
    return out;
  }
  if (Array.isArray(anyIn)) {
    for (const pair of anyIn) {
      if (Array.isArray(pair) && pair.length >= 2) out[String(pair[0])] = String(pair[1]);
    }
    return out;
  }
  for (const [k, v] of Object.entries(anyIn)) out[k] = String(v);
  return out;
}
function createNativeFetch(allowedDomains) {
  const allow = new Set(allowedDomains.map((d) => d.toLowerCase()));
  return async function nativeFetch(url, init = {}) {
    let hostname;
    try {
      hostname = new URL(url).hostname.toLowerCase();
    } catch {
      const err = new Error(`PermissionDeniedError: invalid URL "${url}"`);
      err.name = "PermissionDeniedError";
      throw err;
    }
    const permitted = allow.has(hostname) || [...allow].some((d) => hostname === d || hostname.endsWith(`.${d}`));
    if (!permitted) {
      const err = new Error(
        `PermissionDeniedError: hostname "${hostname}" is not in the extension's allowed domain list`
      );
      err.name = "PermissionDeniedError";
      throw err;
    }
    const unhealthyUntil = unhealthyHosts.get(hostname) || 0;
    if (unhealthyUntil > Date.now()) throw unavailableHostError(hostname);
    if (unhealthyUntil) unhealthyHosts.delete(hostname);
    const headers = normalizeHeaders(init.headers);
    const signal = init.signal;
    const abortError = () => {
      try {
        return new DOMException(String((signal == null ? void 0 : signal.reason) || "Aborted"), "AbortError");
      } catch {
        const err = new Error("Aborted");
        err.name = "AbortError";
        return err;
      }
    };
    if (signal == null ? void 0 : signal.aborted) throw abortError();
    const request = CapacitorHttp.request({
      url,
      method: (init.method || "GET").toUpperCase(),
      headers,
      data: init.body,
      // Keep the raw payload so `.text()` and `.json()` both work regardless of
      // content type; CapacitorHttp otherwise pre-parses JSON into an object.
      responseType: "text",
      connectTimeout: 6e3,
      readTimeout: 1e4
    });
    let res;
    try {
      if (signal && typeof signal.addEventListener === "function") {
        let onAbort = null;
        try {
          res = await Promise.race([
            request,
            new Promise((_, reject) => {
              onAbort = () => reject(abortError());
              signal.addEventListener("abort", onAbort, { once: true });
            })
          ]);
        } finally {
          if (onAbort) {
            try {
              signal.removeEventListener("abort", onAbort);
            } catch {
            }
          }
        }
      } else {
        res = await request;
      }
    } catch (error) {
      if (!(signal == null ? void 0 : signal.aborted) && isTransientHostFailure(error)) {
        unhealthyHosts.set(hostname, Date.now() + HOST_COOLDOWN_MS);
        throw unavailableHostError(hostname);
      }
      throw error;
    }
    const status = Number(res.status) || 0;
    const rawData = res.data;
    const bodyText = typeof rawData === "string" ? rawData : JSON.stringify(rawData ?? "");
    return {
      ok: status >= 200 && status < 300,
      status,
      statusText: "",
      url: res.url || url,
      headers: toHeaderGetter(res.headers),
      text: async () => bodyText,
      json: async () => {
        try {
          return JSON.parse(bodyText);
        } catch {
          return rawData;
        }
      }
    };
  };
}
function wrap(nodes) {
  return {
    find(selector) {
      const out = [];
      const seen = /* @__PURE__ */ new Set();
      for (const node of nodes) {
        node.querySelectorAll(selector).forEach((el) => {
          if (!seen.has(el)) {
            seen.add(el);
            out.push(el);
          }
        });
      }
      return wrap(out);
    },
    first() {
      return wrap(nodes.length ? [nodes[0]] : []);
    },
    attr(name) {
      const first = nodes[0];
      if (!first) return void 0;
      return first.hasAttribute(name) ? first.getAttribute(name) ?? void 0 : void 0;
    },
    text() {
      return nodes.map((n) => n.textContent ?? "").join("");
    },
    html() {
      return nodes[0] ? nodes[0].innerHTML : null;
    },
    each(callback) {
      nodes.forEach((n, i) => callback(i, wrap([n])));
      return wrap(nodes);
    }
  };
}
function parseHtml(html) {
  if (typeof html !== "string" || html.length === 0) {
    const err = new Error("InvalidInputError: html must be a non-empty string");
    err.name = "InvalidInputError";
    throw err;
  }
  const doc = new DOMParser().parseFromString(html, "text/html");
  return wrap([doc.documentElement]);
}
class MiniEventEmitter {
  constructor() {
    __publicField(this, "_l", {});
  }
  on(e, fn) {
    var _a;
    ((_a = this._l)[e] || (_a[e] = [])).push(fn);
    return this;
  }
  once(e, fn) {
    const w = (...a) => {
      this.off(e, w);
      fn(...a);
    };
    return this.on(e, w);
  }
  off(e, fn) {
    this._l[e] = (this._l[e] || []).filter((f) => f !== fn);
    return this;
  }
  removeListener(e, fn) {
    return this.off(e, fn);
  }
  removeAllListeners(e) {
    if (e) delete this._l[e];
    else this._l = {};
    return this;
  }
  emit(e, ...a) {
    const ls = this._l[e] || [];
    ls.forEach((f) => f(...a));
    return ls.length > 0;
  }
  addListener(e, fn) {
    return this.on(e, fn);
  }
  listeners(e) {
    return [...this._l[e] || []];
  }
}
const pathShim = /* @__PURE__ */ (() => {
  const normalizeArr = (parts) => {
    const out = [];
    for (const p of parts) {
      if (p === "" || p === ".") continue;
      if (p === "..") out.pop();
      else out.push(p);
    }
    return out;
  };
  const join = (...segs) => {
    const joined = segs.filter(Boolean).join("/");
    const abs = joined.startsWith("/");
    const res = normalizeArr(joined.split("/")).join("/");
    return (abs ? "/" : "") + res || (abs ? "/" : ".");
  };
  return {
    sep: "/",
    delimiter: ":",
    join,
    resolve: (...segs) => join("/", ...segs),
    normalize: (p) => join(p),
    basename: (p, ext) => {
      const b = p.split("/").filter(Boolean).pop() || "";
      return ext && b.endsWith(ext) ? b.slice(0, -ext.length) : b;
    },
    dirname: (p) => {
      const parts = p.split("/");
      parts.pop();
      return parts.join("/") || (p.startsWith("/") ? "/" : ".");
    },
    extname: (p) => {
      const b = p.split("/").pop() || "";
      const i = b.lastIndexOf(".");
      return i > 0 ? b.slice(i) : "";
    },
    isAbsolute: (p) => p.startsWith("/"),
    parse: (p) => ({
      root: p.startsWith("/") ? "/" : "",
      dir: pathShim.dirname(p),
      base: pathShim.basename(p),
      ext: pathShim.extname(p),
      name: pathShim.basename(p, pathShim.extname(p))
    })
  };
})();
function unavailableModule(name) {
  function thrower() {
    throw new Error(`Node module "${name}" is not available in the mobile extension runtime`);
  }
  return new Proxy(thrower, {
    get: (_t, prop) => prop === "default" ? void 0 : prop === "prototype" ? thrower.prototype : thrower,
    apply: () => thrower(),
    construct: () => thrower()
  });
}
function wrapModule(name, target) {
  function miss() {
    throw new Error(`"${name}" member is not available in the mobile extension runtime`);
  }
  if (!target.default) {
    try {
      target.default = target;
    } catch {
    }
  }
  return new Proxy(target, {
    get(t, prop, recv) {
      if (prop in t) return Reflect.get(t, prop, recv);
      if (typeof prop === "symbol" || prop === "then" || prop === "__esModule") return void 0;
      return miss;
    }
  });
}
function buildModules() {
  var _a;
  const g = globalThis;
  const urlMod = {
    URL,
    URLSearchParams,
    parse: (u) => {
      try {
        return new URL(u);
      } catch {
        return {};
      }
    },
    format: (u) => u instanceof URL ? u.toString() : String(u),
    fileURLToPath: (u) => u.startsWith("file://") ? u.slice(7) : u,
    pathToFileURL: (p) => new URL(`file://${p}`)
  };
  const utilMod = {
    TextEncoder,
    TextDecoder,
    promisify: (fn) => (...args) => new Promise((res, rej) => fn(...args, (e, v) => e ? rej(e) : res(v))),
    callbackify: (fn) => (...args) => {
      const cb = args.pop();
      fn(...args).then((v) => cb(null, v), (e) => cb(e));
    },
    inspect: (v) => {
      try {
        return typeof v === "string" ? v : JSON.stringify(v);
      } catch {
        return String(v);
      }
    },
    format: (...a) => a.map((x) => typeof x === "string" ? x : JSON.stringify(x)).join(" "),
    formatWithOptions: (_opts, ...a) => a.map((x) => typeof x === "string" ? x : JSON.stringify(x)).join(" "),
    // Node debug loggers: a disabled no-op logger (deps like undici call this at load).
    debuglog: (_section) => Object.assign((..._a2) => {
    }, { enabled: false }),
    debug: (_section) => (..._a2) => {
    },
    toUSVString: (v) => String(v),
    stripVTControlCharacters: (v) => String(v),
    getSystemErrorName: (n) => `Error ${String(n)}`,
    aborted: (signal) => !!(signal && signal.aborted),
    addAbortListener: (signal, cb) => {
      if (signal && typeof signal.addEventListener === "function") {
        signal.addEventListener("abort", cb, { once: true });
        return { [Symbol.dispose]: () => signal.removeEventListener("abort", cb) };
      }
      return { [Symbol.dispose]: () => {
      } };
    },
    deprecate: (fn) => fn,
    inherits: (ctor, sup) => {
      ctor.super_ = sup;
      const proto = sup && (typeof sup === "object" || typeof sup === "function") ? sup.prototype : void 0;
      if (proto) Object.setPrototypeOf(ctor.prototype, proto);
    },
    types: {
      isDate: (v) => v instanceof Date,
      isRegExp: (v) => v instanceof RegExp,
      isPromise: (v) => !!v && typeof v.then === "function",
      isMap: (v) => v instanceof Map,
      isSet: (v) => v instanceof Set,
      isArrayBuffer: (v) => v instanceof ArrayBuffer,
      isTypedArray: (v) => ArrayBuffer.isView(v) && !(v instanceof DataView),
      isUint8Array: (v) => v instanceof Uint8Array,
      isAnyArrayBuffer: (v) => v instanceof ArrayBuffer || typeof SharedArrayBuffer !== "undefined" && v instanceof SharedArrayBuffer
    },
    isArray: Array.isArray
  };
  const randomBytes = (n) => {
    var _a2, _b;
    const b = new Uint8Array(n);
    (_b = (_a2 = g.crypto) == null ? void 0 : _a2.getRandomValues) == null ? void 0 : _b.call(_a2, b);
    return b;
  };
  const randomUUID = () => {
    var _a2;
    const native = (_a2 = g.crypto) == null ? void 0 : _a2.randomUUID;
    if (native) return native.call(g.crypto);
    const b = randomBytes(16);
    b[6] = b[6] & 15 | 64;
    b[8] = b[8] & 63 | 128;
    const h = Array.from(b, (x) => x.toString(16).padStart(2, "0"));
    return `${h.slice(0, 4).join("")}-${h.slice(4, 6).join("")}-${h.slice(6, 8).join("")}-${h.slice(8, 10).join("")}-${h.slice(10, 16).join("")}`;
  };
  const cryptoMod = {
    webcrypto: g.crypto,
    subtle: (_a = g.crypto) == null ? void 0 : _a.subtle,
    getRandomValues: (a) => g.crypto.getRandomValues(a),
    randomUUID,
    randomBytes,
    // undici probes `crypto.getHashes()` at load to decide SRI support; an empty
    // list cleanly disables SRI (we don't verify integrity in the WebView).
    getHashes: () => [],
    constants: {},
    createHash: () => {
      throw new Error("crypto.createHash is not available in the mobile extension runtime");
    },
    createHmac: () => {
      throw new Error("crypto.createHmac is not available in the mobile extension runtime");
    },
    hash: () => {
      throw new Error("crypto.hash is not available in the mobile extension runtime");
    }
  };
  const osMod = {
    platform: () => "android",
    type: () => "Linux",
    arch: () => "arm64",
    release: () => "0.0.0",
    EOL: "\n",
    tmpdir: () => "/tmp",
    homedir: () => "/",
    hostname: () => "mobile",
    cpus: () => [],
    totalmem: () => 0,
    freemem: () => 0
  };
  const qsMod = {
    parse: (s) => Object.fromEntries(new URLSearchParams(s)),
    stringify: (o) => new URLSearchParams(o).toString(),
    escape: encodeURIComponent,
    unescape: decodeURIComponent
  };
  const streamStub = unavailableModule("stream");
  const BufferImpl = g.Buffer || buffer.Buffer;
  const bufferMod = {
    Buffer: BufferImpl,
    SlowBuffer: BufferImpl,
    INSPECT_MAX_BYTES: 50,
    kMaxLength: 2147483647,
    constants: { MAX_LENGTH: 2147483647, MAX_STRING_LENGTH: 536870888 }
  };
  const stringDecoderMod = {
    StringDecoder: class {
      write(b) {
        return new TextDecoder().decode(b);
      }
      end() {
        return "";
      }
    }
  };
  const utilTypesMod = {
    isDate: (v) => v instanceof Date,
    isRegExp: (v) => v instanceof RegExp,
    isPromise: (v) => !!v && typeof v.then === "function",
    isMap: (v) => v instanceof Map,
    isSet: (v) => v instanceof Set,
    isArrayBuffer: (v) => v instanceof ArrayBuffer,
    isTypedArray: (v) => ArrayBuffer.isView(v) && !(v instanceof DataView),
    isUint8Array: (v) => v instanceof Uint8Array,
    isAnyArrayBuffer: (v) => v instanceof ArrayBuffer || typeof SharedArrayBuffer !== "undefined" && v instanceof SharedArrayBuffer,
    isAsyncFunction: (v) => {
      var _a2;
      return typeof v === "function" && ((_a2 = v.constructor) == null ? void 0 : _a2.name) === "AsyncFunction";
    }
  };
  const timersMod = {
    setTimeout: g.setTimeout,
    clearTimeout: g.clearTimeout,
    setInterval: g.setInterval,
    clearInterval: g.clearInterval,
    setImmediate: (cb, ...a) => g.setTimeout(() => cb(...a), 0),
    clearImmediate: (h) => g.clearTimeout(h)
  };
  class AsyncResource {
    constructor(_type) {
    }
    runInAsyncScope(fn, thisArg, ...args) {
      return fn.apply(thisArg, args);
    }
    bind(fn) {
      return fn;
    }
    emitDestroy() {
      return this;
    }
    asyncId() {
      return 0;
    }
    triggerAsyncId() {
      return 0;
    }
    static bind(fn) {
      return fn;
    }
  }
  const asyncHooksMod = {
    AsyncResource,
    executionAsyncId: () => 0,
    triggerAsyncId: () => 0,
    createHook: () => ({ enable() {
      return this;
    }, disable() {
      return this;
    } }),
    AsyncLocalStorage: class {
      constructor() {
        __publicField(this, "_s");
      }
      run(store, cb, ...a) {
        const p = this._s;
        this._s = store;
        try {
          return cb(...a);
        } finally {
          this._s = p;
        }
      }
      getStore() {
        return this._s;
      }
      enterWith(store) {
        this._s = store;
      }
      exit(cb, ...a) {
        const p = this._s;
        this._s = void 0;
        try {
          return cb(...a);
        } finally {
          this._s = p;
        }
      }
      disable() {
      }
    }
  };
  const dcMod = {
    channel: (_name) => ({ hasSubscribers: false, publish() {
    }, subscribe() {
    }, unsubscribe() {
    } }),
    hasSubscribers: () => false,
    subscribe() {
    },
    unsubscribe() {
    },
    tracingChannel: () => ({ subscribe() {
    }, unsubscribe() {
    }, traceSync: (fn, ctx, ...a) => fn(...a) })
  };
  const perfMod = {
    performance: g.performance,
    PerformanceObserver: class {
      observe() {
      }
      disconnect() {
      }
      takeRecords() {
        return [];
      }
    }
  };
  const workerThreadsMod = {
    isMainThread: true,
    threadId: 0,
    parentPort: null,
    workerData: null,
    markAsUncloneable: (v) => v,
    markAsUntransferable: (v) => v,
    isMarkedAsUntransferable: () => false,
    receiveMessageOnPort: () => void 0,
    Worker: class {
      constructor() {
        throw new Error("worker_threads.Worker is not available in the mobile extension runtime");
      }
    },
    MessageChannel: g.MessageChannel || class {
    },
    MessagePort: g.MessagePort || class {
    },
    BroadcastChannel: g.BroadcastChannel || class {
    }
  };
  const mods = {
    url: wrapModule("url", urlMod),
    util: wrapModule("util", utilMod),
    "util/types": wrapModule("util/types", utilTypesMod),
    path: wrapModule("path", pathShim),
    crypto: wrapModule("crypto", cryptoMod),
    os: wrapModule("os", osMod),
    querystring: wrapModule("querystring", qsMod),
    events: MiniEventEmitter,
    timers: wrapModule("timers", timersMod),
    "timers/promises": wrapModule("timers/promises", {
      setTimeout: (ms, val) => new Promise((r) => g.setTimeout(() => r(val), ms))
    }),
    async_hooks: wrapModule("async_hooks", asyncHooksMod),
    diagnostics_channel: wrapModule("diagnostics_channel", dcMod),
    perf_hooks: wrapModule("perf_hooks", perfMod),
    console: g.console ?? {},
    buffer: wrapModule("buffer", bufferMod),
    assert: (c, m) => {
      if (!c) throw new Error(m || "assert");
    },
    fs: unavailableModule("fs"),
    http: unavailableModule("http"),
    https: unavailableModule("https"),
    net: unavailableModule("net"),
    tls: unavailableModule("tls"),
    dns: unavailableModule("dns"),
    zlib: unavailableModule("zlib"),
    child_process: unavailableModule("child_process"),
    worker_threads: wrapModule("worker_threads", workerThreadsMod),
    stream: streamStub,
    string_decoder: wrapModule("string_decoder", stringDecoderMod)
  };
  MiniEventEmitter.EventEmitter = MiniEventEmitter;
  for (const k of Object.keys(mods)) {
    const m = mods[k];
    if (m && typeof m === "object" && !m.default) {
      try {
        m.default = m;
      } catch {
      }
    }
  }
  return mods;
}
let MODULES = null;
function createMobileRequire() {
  if (!MODULES) MODULES = buildModules();
  const modules = MODULES;
  return function require2(name) {
    const key = typeof name === "string" && name.startsWith("node:") ? name.slice(5) : name;
    if (Object.prototype.hasOwnProperty.call(modules, key)) return modules[key];
    return unavailableModule(name);
  };
}
function createMobileNodeGlobals() {
  const g = globalThis;
  const perfNow = () => typeof performance !== "undefined" ? performance.now() : Date.now();
  const hrtime = (prev) => {
    const ns = Math.round(perfNow() * 1e6);
    let s = Math.floor(ns / 1e9);
    let n = ns % 1e9;
    if (prev) {
      s -= prev[0];
      n -= prev[1];
      if (n < 0) {
        s -= 1;
        n += 1e9;
      }
    }
    return [s, n];
  };
  hrtime.bigint = () => BigInt(Math.round(perfNow() * 1e6));
  const noopStream = { write: () => true, on: () => {
  }, once: () => {
  }, end: () => {
  } };
  const proc = {
    platform: "android",
    arch: "arm64",
    version: "v20.11.0",
    versions: { node: "20.11.0", v8: "11.3.244", uv: "1.46.0", modules: "115", openssl: "3.0.0" },
    env: { NODE_ENV: "production" },
    argv: ["node", "extension"],
    argv0: "node",
    execPath: "/",
    execArgv: [],
    pid: 1,
    ppid: 0,
    title: "tatakai",
    browser: true,
    nextTick: (cb, ...a) => queueMicrotask(() => cb(...a)),
    cwd: () => "/",
    chdir: () => {
    },
    umask: () => 0,
    hrtime,
    emitWarning: () => {
    },
    exit: () => {
    },
    kill: () => {
    },
    stdout: noopStream,
    stderr: noopStream,
    stdin: { on: () => {
    }, once: () => {
    }, resume: () => {
    }, pause: () => {
    } },
    features: {},
    config: {},
    release: { name: "node" },
    memoryUsage: () => ({ rss: 0, heapTotal: 0, heapUsed: 0, external: 0, arrayBuffers: 0 }),
    uptime: () => perfNow() / 1e3,
    getuid: () => 0,
    getgid: () => 0,
    binding: () => {
      throw new Error("process.binding is not available in the mobile extension runtime");
    }
  };
  for (const m of ["on", "once", "off", "addListener", "removeListener", "removeAllListeners", "prependListener"]) {
    proc[m] = () => proc;
  }
  proc.emit = () => false;
  proc.listeners = () => [];
  return {
    process: proc,
    global: g,
    Buffer: g.Buffer || buffer.Buffer,
    setImmediate: (cb, ...a) => g.setTimeout(() => cb(...a), 0),
    clearImmediate: (h) => g.clearTimeout(h)
  };
}
const ANILIST_TITLE_TTL = 60 * 60 * 1e3;
const cache = /* @__PURE__ */ new Map();
const LATIN_TITLE_RE = /^[\p{Script=Latin}\p{Nd}\p{P}\p{Zs}\p{S}]+$/u;
function isAbbreviation(s) {
  if (/\s/.test(s)) return false;
  if (s.length <= 4) return true;
  return s.length <= 6 && s === s.toUpperCase() && /[A-Z]/.test(s);
}
function usefulSynonyms(list) {
  if (!Array.isArray(list)) return [];
  return list.filter((s) => typeof s === "string").map((s) => s.trim()).filter((s) => s.length > 2 && LATIN_TITLE_RE.test(s) && !isAbbreviation(s)).slice(0, 2);
}
async function fetchAniListTitles(anilistId) {
  var _a;
  if (!anilistId || anilistId <= 0) return [];
  const cached = cache.get(anilistId);
  if (cached && Date.now() < cached.expiresAt) return cached.titles;
  try {
    const res = await CapacitorHttp.request({
      url: "https://graphql.anilist.co",
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      // Canonical titles AND synonyms — plenty of sites index a show only under
      // an alternate name. CapacitorHttp serializes an object body as JSON when
      // the content-type says so.
      data: {
        query: `query ($id: Int) { Media(id: $id, type: ANIME) { title { english romaji userPreferred native } synonyms } }`,
        variables: { id: anilistId }
      },
      connectTimeout: 5e3,
      readTimeout: 5e3
    });
    const status = Number(res.status) || 0;
    if (status < 200 || status >= 300) return [];
    const raw = res.data;
    const payload = typeof raw === "string" ? JSON.parse(raw) : raw;
    const media = (_a = payload == null ? void 0 : payload.data) == null ? void 0 : _a.Media;
    const t = media == null ? void 0 : media.title;
    const titles = [t == null ? void 0 : t.english, t == null ? void 0 : t.romaji, t == null ? void 0 : t.userPreferred, t == null ? void 0 : t.native, ...usefulSynonyms(media == null ? void 0 : media.synonyms)].filter(Boolean).map((v) => String(v).trim()).filter((v, i, a) => a.findIndex((x) => x.toLowerCase() === v.toLowerCase()) === i);
    cache.set(anilistId, { titles, expiresAt: Date.now() + ANILIST_TITLE_TTL });
    return titles;
  } catch {
    return [];
  }
}
async function enrichOptionsWithTitles(options) {
  const anilistId = Number(options == null ? void 0 : options.anilistId) || 0;
  if (anilistId <= 0) return options;
  const callerTitles = Array.isArray(options == null ? void 0 : options.titles) ? options.titles.map(String).filter(Boolean) : [];
  const anilistTitles = await fetchAniListTitles(anilistId);
  if (!anilistTitles.length) return options;
  const seen = new Set(anilistTitles.map((t) => t.toLowerCase()));
  const extra = callerTitles.filter((t) => t && !seen.has(t.toLowerCase()));
  return { ...options, titles: [...anilistTitles, ...extra] };
}
async function makeAnitomy() {
  return async function anitomy(filename) {
    if (typeof filename !== "string" || !filename) {
      const err = new Error("InvalidInputError: filename must be a non-empty string");
      err.name = "InvalidInputError";
      throw err;
    }
    const injected = globalThis.tatakaiAnitomy;
    if (typeof injected === "function") {
      try {
        return await injected(filename);
      } catch {
        return {};
      }
    }
    return {};
  };
}
const registry = /* @__PURE__ */ new Map();
async function evaluateBundle(code, manifest) {
  var _a;
  const allowedDomains = (manifest.permissions || []).map((p) => {
    const parts = String(p).split(":");
    return parts.length === 3 && parts[0] === "network" && parts[1] === "domain" ? parts[2].trim() : "";
  }).filter(Boolean);
  const fetchShim = createNativeFetch(allowedDomains);
  const anitomy = await makeAnitomy();
  const requireShim = createMobileRequire();
  const nodeGlobals = createMobileNodeGlobals();
  globalThis.__tatakai_fetch__ = fetchShim;
  const module = { exports: {} };
  const fn = new Function(
    "module",
    "exports",
    "require",
    "__tatakai_fetch__",
    "__tatakai_anitomy__",
    "__tatakai_parse_html__",
    "Buffer",
    "process",
    "global",
    "setImmediate",
    "clearImmediate",
    code
  );
  fn(
    module,
    module.exports,
    requireShim,
    fetchShim,
    anitomy,
    parseHtml,
    nodeGlobals.Buffer,
    nodeGlobals.process,
    nodeGlobals.global,
    nodeGlobals.setImmediate,
    nodeGlobals.clearImmediate
  );
  const exported = ((_a = module.exports) == null ? void 0 : _a.default) || module.exports;
  const instance = typeof exported === "function" ? new exported() : exported;
  if (!instance || typeof instance !== "object") {
    throw new Error(`Extension bundle "${manifest.id}" produced no usable export`);
  }
  return instance;
}
async function registerMobileExtension(manifest, bundleCode) {
  var _a;
  try {
    const namespace = ((_a = manifest.apiServer) == null ? void 0 : _a.namespace) || manifest.id;
    const instance = await evaluateBundle(bundleCode, manifest);
    registry.set(namespace, { manifest, namespace, instance });
    return { ok: true, namespace };
  } catch (err) {
    console.error("[mobileExtensionHost] bundle evaluation failed", manifest == null ? void 0 : manifest.id, err);
    return { ok: false, error: err instanceof Error ? err.message : String(err) };
  }
}
function unregisterMobileExtension(namespace) {
  registry.delete(namespace);
}
function listMobileNamespaces() {
  return [...registry.values()].map(({ manifest, namespace, instance }) => {
    var _a, _b;
    return {
      namespace,
      extensionId: manifest.id,
      contract: ((_a = manifest.apiServer) == null ? void 0 : _a.contract) ?? null,
      routes: ((_b = manifest.apiServer) == null ? void 0 : _b.routes) ?? inferRoutes(instance),
      capabilities: manifest.capabilities,
      customSources: manifest.customSources
    };
  });
}
function inferRoutes(instance) {
  const routes = [];
  if (typeof instance.sourcesAll === "function") routes.push("sources");
  if (typeof instance.streamAll === "function") routes.push("stream");
  if (typeof instance.torrentAll === "function") routes.push("torrent");
  if (typeof instance.listProviders === "function") routes.push("providers");
  if (typeof instance.getMangaChapters === "function") routes.push("manga/chapters");
  if (typeof instance.getMangaPages === "function") routes.push("manga/pages");
  return routes;
}
async function callMethod(namespace, method, args) {
  const ext = registry.get(namespace);
  if (!ext) throw new Error(`namespace not mounted: ${namespace}`);
  const fn = ext.instance[method];
  if (typeof fn !== "function") {
    const err = new Error(`method not implemented: ${namespace}.${method}`);
    err.name = "NotImplementedError";
    throw err;
  }
  return fn.apply(ext.instance, args);
}
const mobileExtensionDispatch = {
  isMounted: (namespace) => registry.has(namespace),
  listNamespaces: listMobileNamespaces,
  /**
   * `/api/v3/<ns>/sources|stream|torrent` — resolve anime sources.
   *
   * When `onChunk` is supplied this drives the SAME progressive
   * `bundle.sourcesAll(opts, onChunk)` contract the desktop host uses: each
   * provider's results surface the instant that provider finishes, instead of
   * the caller awaiting the whole ~100-provider batch (the dominant parity gap
   * with desktop SSE). Without `onChunk` it keeps the batched return for
   * one-shot callers.
   */
  async resolveSources(namespace, route, options, onChunk) {
    const method = route === "stream" ? "streamAll" : route === "torrent" ? "torrentAll" : "sourcesAll";
    const enriched = await enrichOptionsWithTitles(options);
    const collected = [];
    let streamed = false;
    const relay = typeof onChunk === "function" ? (chunk) => {
      streamed = true;
      const results = Array.isArray(chunk == null ? void 0 : chunk.results) ? chunk.results : [];
      const proxied = results.map((r) => applyMobileProxyToSource(r));
      for (const r of proxied) collected.push(r);
      try {
        onChunk({ ...chunk, results: proxied });
      } catch (err) {
        console.warn("[mobileExtensionHost] onChunk consumer threw", err);
      }
    } : void 0;
    const out = await callMethod(namespace, method, relay ? [enriched, relay] : [enriched]);
    if (streamed) return collected;
    const rawArr = Array.isArray(out) ? out : (out == null ? void 0 : out.sources) ?? [];
    const arr = Array.isArray(rawArr) ? rawArr.map((r) => applyMobileProxyToSource(r)) : [];
    if (typeof onChunk === "function" && arr.length) {
      try {
        onChunk({
          results: arr,
          diagnostic: { provider: "batch", status: "ok", resultCount: arr.length, durationMs: 0, attempts: 1 }
        });
      } catch (err) {
        console.warn("[mobileExtensionHost] onChunk consumer threw", err);
      }
    }
    return arr;
  },
  /** `/api/v3/<ns>/manga/chapters`. */
  async mangaChapters(namespace, params) {
    return callMethod(namespace, "getMangaChapters", [params]);
  },
  /**
   * `/api/v3/<ns>/manga/pages` — header-gated page images are registered with
   * the in-app proxy (desktop `manga/pages` parity: many manga CDNs 403 an
   * unproxied request, which is the broken-pages reader bug). Accepts both the
   * desktop `{ pages }` wrapper and the mobile bundle's bare array.
   */
  async mangaPages(namespace, params) {
    const out = await callMethod(namespace, "getMangaPages", [params]);
    const rawPages = Array.isArray(out) ? out : Array.isArray(out == null ? void 0 : out.pages) ? out.pages : null;
    if (!rawPages) return out;
    const proxied = applyMobileProxyToPages(rawPages);
    if (Array.isArray(out)) return proxied;
    return { ...out, pages: proxied, count: proxied.length };
  },
  /** `/api/v3/<ns>/providers` + `/providers/:name`. */
  async listProviders(namespace) {
    const out = await callMethod(namespace, "listProviders", []);
    return Array.isArray(out) ? out : (out == null ? void 0 : out.providers) ?? [];
  },
  async runProvider(namespace, provider, options) {
    const out = await callMethod(namespace, "runProvider", [provider, options]);
    if (out && typeof out === "object" && Array.isArray(out.sources)) {
      return {
        ...out,
        sources: out.sources.map((s) => applyMobileProxyToSource(s))
      };
    }
    return out;
  },
  /**
   * `/x/<ns>/<sourceId>/…` custom-source content. Watch sources and read pages
   * go through the same in-app proxy as the anime/manga paths (desktop
   * `custom/watch` + `custom/read` parity).
   */
  async custom(namespace, op, args) {
    const out = await callMethod(namespace, `custom${op}`, args);
    if (out && typeof out === "object") {
      if (Array.isArray(out.sources)) {
        return {
          ...out,
          sources: out.sources.map((s) => applyMobileProxyToSource(s))
        };
      }
      if (Array.isArray(out.pages)) {
        const pages = applyMobileProxyToPages(out.pages);
        return { ...out, pages, count: pages.length };
      }
    }
    return out;
  }
};
function installMobileExtensionHost() {
  if (!isCapacitor() || typeof window === "undefined") return;
  window.tatakaiMobileExtensions = mobileExtensionDispatch;
  const runtime = window.tatakaiRuntime || (window.tatakaiRuntime = {});
  runtime.health = async () => ({
    ok: true,
    loadedExtensions: [...registry.values()].map(({ manifest }) => manifest.id),
    namespaces: listMobileNamespaces()
  });
  runtime.loadKaiExtension = async (buffer2) => {
    const { installMobileKaiExtension } = await __vitePreload(async () => {
      const { installMobileKaiExtension: installMobileKaiExtension2 } = await import("./mobileExtensionInstaller.JRaHR6CG.js");
      return { installMobileKaiExtension: installMobileKaiExtension2 };
    }, true ? __vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12]) : void 0);
    return installMobileKaiExtension(buffer2);
  };
  runtime.unloadExtension = async (id) => {
    const { uninstallMobileExtension } = await __vitePreload(async () => {
      const { uninstallMobileExtension: uninstallMobileExtension2 } = await import("./mobileExtensionInstaller.JRaHR6CG.js");
      return { uninstallMobileExtension: uninstallMobileExtension2 };
    }, true ? __vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12]) : void 0);
    await uninstallMobileExtension(id);
    return { success: true };
  };
}
export {
  installMobileExtensionHost,
  listMobileNamespaces,
  mobileExtensionDispatch,
  registerMobileExtension,
  unregisterMobileExtension
};
