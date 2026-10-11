const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/mobileExtensionHost.DerCd4eF.js","assets/vendor.CJyRs4QS.js","assets/react-vendor.CAo4XUiA.js","assets/index.C6yfkT5T.js","assets/tanstack.DPr3OB19.js","assets/supabase.WuRMX5Dg.js","assets/radix.BiK9uYXL.js","assets/icons.C2gBBarQ.js","assets/motion.DVGLRFCH.js","assets/hls.BlgtCWcq.js","assets/editor.Dxw8dtyw.js","assets/charts.Dr1fgDJ-.js","assets/index.CWbmAlRn.css"])))=>i.map(i=>d[i]);
import { b9 as __vitePreload, bv as JSZip } from "./vendor.CJyRs4QS.js";
import { a as isCapacitor, d as db, f as fetchMarketplaceExtensions, b as downloadExtensionKai } from "./index.C6yfkT5T.js";
import { registerMobileExtension } from "./mobileExtensionHost.DerCd4eF.js";
import "./react-vendor.CAo4XUiA.js";
import "./tanstack.DPr3OB19.js";
import "./supabase.WuRMX5Dg.js";
import "./radix.BiK9uYXL.js";
import "./icons.C2gBBarQ.js";
import "./motion.DVGLRFCH.js";
import "./hls.BlgtCWcq.js";
import "./editor.Dxw8dtyw.js";
import "./charts.Dr1fgDJ-.js";
let initInFlight = null;
let initialized = false;
let backgroundRefreshStarted = false;
function notifyExtensionsChanged() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent("tatakai-extensions-changed"));
}
async function unpackKai(buf) {
  var _a, _b, _c;
  try {
    const zip = await JSZip.loadAsync(buf);
    const manifestFile = zip.file("manifest.json") || ((_a = zip.file(/(^|\/)manifest\.json$/i)) == null ? void 0 : _a[0]) || null;
    const bundleFile = zip.file("dist/bundle.js") || ((_b = zip.file(/(^|\/)bundle\.js$/i)) == null ? void 0 : _b[0]) || null;
    if (!manifestFile || !bundleFile) return null;
    const manifest = JSON.parse(await manifestFile.async("string"));
    const bundleCode = await bundleFile.async("string");
    const hasIcon = Boolean(zip.file("icon.png") || ((_c = zip.file(/(^|\/)icon\.png$/i)) == null ? void 0 : _c[0]));
    return { manifest, bundleCode, hasIcon };
  } catch {
    return null;
  }
}
async function installMobileKaiExtension(buf, marketplace) {
  var _a;
  if (!isCapacitor()) return { success: false, error: "Mobile runtime unavailable" };
  const unpacked = await unpackKai(buf);
  if (!unpacked) return { success: false, error: "Invalid extension package" };
  const { manifest, bundleCode, hasIcon } = unpacked;
  const merged = {
    ...manifest,
    signature: manifest.signature ?? (marketplace == null ? void 0 : marketplace.signature) ?? void 0,
    signedBy: manifest.signedBy ?? (marketplace == null ? void 0 : marketplace.signedBy) ?? void 0,
    permissions: ((_a = manifest.permissions) == null ? void 0 : _a.length) ? manifest.permissions : (marketplace == null ? void 0 : marketplace.permissions) ?? []
  };
  const registered = await registerMobileExtension(merged, bundleCode);
  if (!registered.ok) {
    return {
      success: false,
      error: "error" in registered ? registered.error : "Unable to register extension"
    };
  }
  try {
    const row = {
      id: merged.id,
      namespace: registered.namespace,
      version: merged.version,
      manifest: merged,
      bundleCode,
      enabled: true,
      updatedAt: (/* @__PURE__ */ new Date()).toISOString()
    };
    await db.mobileExtensionBundles.put(row);
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unable to save extension"
    };
  }
  notifyExtensionsChanged();
  return {
    success: true,
    extensionId: merged.id,
    namespace: registered.namespace,
    manifest: merged,
    hasIcon
  };
}
async function uninstallMobileExtension(id) {
  const normalized = String(id || "").trim().toLowerCase();
  if (!normalized) return;
  const { unregisterMobileExtension, listMobileNamespaces } = await __vitePreload(async () => {
    const { unregisterMobileExtension: unregisterMobileExtension2, listMobileNamespaces: listMobileNamespaces2 } = await import("./mobileExtensionHost.DerCd4eF.js");
    return { unregisterMobileExtension: unregisterMobileExtension2, listMobileNamespaces: listMobileNamespaces2 };
  }, true ? __vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12]) : void 0);
  for (const namespace of listMobileNamespaces()) {
    if (String(namespace.extensionId || "").toLowerCase() === normalized || String(namespace.namespace || "").toLowerCase() === normalized) {
      unregisterMobileExtension(namespace.namespace);
    }
  }
  await db.mobileExtensionBundles.delete(id);
  notifyExtensionsChanged();
}
async function hydrateMobileExtensions() {
  if (!isCapacitor()) return 0;
  let count = 0;
  try {
    const rows = await db.mobileExtensionBundles.filter((r) => r.enabled !== false).toArray();
    for (const row of rows) {
      const res = await registerMobileExtension(
        row.manifest,
        row.bundleCode
      );
      if (res.ok) count++;
    }
    if (count > 0) notifyExtensionsChanged();
  } catch {
  }
  return count;
}
async function installOne(ext) {
  try {
    const buf = await downloadExtensionKai(ext.mainUrl);
    return (await installMobileKaiExtension(buf, ext)).success;
  } catch {
    return false;
  }
}
async function refreshMobileExtensions() {
  if (!isCapacitor()) return 0;
  let installed = 0;
  try {
    const list = await fetchMarketplaceExtensions();
    const cached = await db.mobileExtensionBundles.toArray();
    const cachedById = new Map(cached.map((r) => [r.id, r]));
    for (const ext of list) {
      const prior = cachedById.get(ext.id);
      if (prior && prior.version === ext.version) continue;
      if (await installOne(ext)) installed++;
    }
    if (installed > 0) notifyExtensionsChanged();
  } catch {
  }
  return installed;
}
function initMobileExtensions() {
  if (!isCapacitor()) return Promise.resolve();
  if (initialized) return Promise.resolve();
  if (initInFlight) return initInFlight;
  initInFlight = (async () => {
    await hydrateMobileExtensions();
    initialized = true;
    if (!backgroundRefreshStarted) {
      backgroundRefreshStarted = true;
      void refreshMobileExtensions();
    }
  })().finally(() => {
    initInFlight = null;
  });
  return initInFlight;
}
export {
  hydrateMobileExtensions,
  initMobileExtensions,
  installMobileKaiExtension,
  refreshMobileExtensions,
  uninstallMobileExtension
};
