import { l as useSearchParams, e as useNavigate, r as reactExports } from "./react-vendor.CAo4XUiA.js";
import { V as useSettingsModal } from "./index.C6yfkT5T.js";
import "./vendor.CJyRs4QS.js";
import "./tanstack.DPr3OB19.js";
import "./supabase.WuRMX5Dg.js";
import "./radix.BiK9uYXL.js";
import "./icons.C2gBBarQ.js";
import "./motion.DVGLRFCH.js";
import "./hls.BlgtCWcq.js";
import "./editor.Dxw8dtyw.js";
import "./charts.Dr1fgDJ-.js";
function SettingsRouteOpener() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { openSettings } = useSettingsModal();
  reactExports.useEffect(() => {
    const tab = params.get("tab") || void 0;
    const section = params.get("section") || void 0;
    openSettings(tab, section);
    navigate("/", { replace: true });
  }, []);
  return null;
}
export {
  SettingsRouteOpener
};
