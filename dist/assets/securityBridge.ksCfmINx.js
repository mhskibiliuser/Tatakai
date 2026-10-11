import { b6 as Capacitor, b8 as registerPlugin } from "./vendor.CJyRs4QS.js";
import "./react-vendor.CAo4XUiA.js";
let securityPlugin;
function getSecurityPlugin() {
  if (securityPlugin !== void 0) return securityPlugin;
  securityPlugin = null;
  try {
    if (typeof window !== "undefined" && Capacitor.isPluginAvailable("TatakaiLocalProxy")) {
      securityPlugin = registerPlugin("TatakaiLocalProxy");
    }
  } catch {
    securityPlugin = null;
  }
  return securityPlugin;
}
function notifyElectron(method, active) {
  var _a, _b;
  try {
    const security = (_a = window == null ? void 0 : window.electron) == null ? void 0 : _a.security;
    (_b = security == null ? void 0 : security[method]) == null ? void 0 : _b.call(security, active === true);
  } catch {
  }
}
function notifyNative(method, active) {
  try {
    const p = getSecurityPlugin();
    if (!p) return;
    void p[method]({ active: active === true }).catch(() => void 0);
  } catch {
  }
}
function setWatchActiveBridge(active) {
  notifyElectron("setWatchActive", active);
  notifyNative("setWatchActive", active);
}
export {
  setWatchActiveBridge
};
