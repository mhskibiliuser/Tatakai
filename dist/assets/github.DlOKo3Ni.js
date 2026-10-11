import { r as reactExports } from "./react-vendor.CAo4XUiA.js";
const GITHUB_OWNER = "snozxyx";
const GITHUB_REPO = "tatakai";
const GITHUB_REPO_URL = `https://github.com/${GITHUB_OWNER}/${GITHUB_REPO}`;
const GITHUB_RELEASES_URL = `${GITHUB_REPO_URL}/releases`;
const TTL = 30 * 60 * 1e3;
async function ghFetch(url, cacheKey, force = false) {
  try {
    if (!force && typeof sessionStorage !== "undefined") {
      const raw = sessionStorage.getItem(cacheKey);
      if (raw) {
        const { t, d } = JSON.parse(raw);
        if (Date.now() - t < TTL) return d;
      }
    }
    const res = await fetch(url, { headers: { Accept: "application/vnd.github+json" } });
    if (!res.ok) return null;
    const data = await res.json();
    try {
      sessionStorage == null ? void 0 : sessionStorage.setItem(cacheKey, JSON.stringify({ t: Date.now(), d: data }));
    } catch {
    }
    return data;
  } catch {
    return null;
  }
}
const fetchRepoStats = () => ghFetch(`https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}`, "gh:tatakai:repo");
const fetchLatestRelease = () => ghFetch(
  `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/releases/latest`,
  "gh:tatakai:latest"
);
const fetchAllReleases = (force = false) => ghFetch(
  `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/releases?per_page=20`,
  "gh:tatakai:releases",
  force
);
function platformForAsset(fileName) {
  const n = fileName.toLowerCase();
  if (/\.(exe|msi)$/.test(n) || /win(dows|32|64)?|setup|portable/.test(n)) return "windows";
  if (/\.(dmg|pkg)$/.test(n) || /mac(os)?|darwin|osx|apple|universal/.test(n)) return "macos";
  if (/\.(appimage|deb|rpm|snap|flatpak)$/.test(n) || /linux/.test(n)) return "linux";
  if (/\.(apk|aab)$/.test(n) || /android/.test(n)) return "android";
  if (/\.(ipa|xcarchive)$/.test(n) || /(^|[^a-z])(ios|iphone|ios-unsigned)/.test(n)) return "ios";
  return null;
}
function pickPrimaryAsset(assets, key) {
  const matches = assets.filter((a) => platformForAsset(a.name) === key);
  if (matches.length === 0) return void 0;
  if (key === "windows") {
    return matches.find((a) => /\.(exe|msi)$/i.test(a.name) && !/portable/i.test(a.name)) || matches.find((a) => /setup|install/i.test(a.name)) || matches.find((a) => !/portable/i.test(a.name)) || matches[0];
  }
  if (key === "macos") return matches.find((a) => /\.dmg$/i.test(a.name)) || matches[0];
  if (key === "linux") return matches.find((a) => /\.appimage$/i.test(a.name)) || matches[0];
  if (key === "android") return matches.find((a) => /\.apk$/i.test(a.name)) || matches[0];
  if (key === "ios") return matches.find((a) => /\.ipa$/i.test(a.name)) || matches[0];
  return matches[0];
}
function platformKeyForName(name) {
  switch (name.toLowerCase()) {
    case "windows":
      return "windows";
    case "macos":
      return "macos";
    case "linux":
      return "linux";
    case "android":
      return "android";
    case "ios":
      return "ios";
    default:
      return null;
  }
}
function formatCompact(n) {
  if (n >= 1e6) return (n / 1e6).toFixed(1).replace(/\.0$/, "") + "M";
  if (n >= 1e3) return (n / 1e3).toFixed(1).replace(/\.0$/, "") + "K";
  return String(n);
}
function formatBytes(bytes) {
  if (!bytes) return "—";
  const mb = bytes / (1024 * 1024);
  if (mb >= 1024) return (mb / 1024).toFixed(1) + " GB";
  if (mb >= 1) return Math.round(mb) + " MB";
  return Math.max(1, Math.round(bytes / 1024)) + " KB";
}
function firstLine(body, max = 140) {
  if (!body) return void 0;
  const line = body.split(/\r?\n/).map((s) => s.trim()).find((s) => s && !s.startsWith("#"));
  if (!line) return void 0;
  const clean = line.replace(/^[-*]\s*/, "").replace(/[*_`>#]/g, "").trim();
  return clean.length > max ? clean.slice(0, max - 1) + "…" : clean;
}
function useGitHubRepo() {
  const [stats, setStats] = reactExports.useState(null);
  reactExports.useEffect(() => {
    let cancelled = false;
    fetchRepoStats().then((d) => !cancelled && setStats(d));
    return () => {
      cancelled = true;
    };
  }, []);
  return stats;
}
function useLatestRelease() {
  const [rel, setRel] = reactExports.useState(null);
  reactExports.useEffect(() => {
    let cancelled = false;
    fetchLatestRelease().then((d) => !cancelled && setRel(d));
    return () => {
      cancelled = true;
    };
  }, []);
  return rel;
}
function useAllReleases() {
  const [rels, setRels] = reactExports.useState(null);
  reactExports.useEffect(() => {
    let cancelled = false;
    fetchAllReleases().then((d) => !cancelled && setRels(d));
    return () => {
      cancelled = true;
    };
  }, []);
  return rels;
}
export {
  GITHUB_REPO_URL as G,
  useLatestRelease as a,
  useAllReleases as b,
  platformKeyForName as c,
  pickPrimaryAsset as d,
  firstLine as e,
  formatCompact as f,
  formatBytes as g,
  GITHUB_RELEASES_URL as h,
  fetchAllReleases as i,
  fetchRepoStats as j,
  platformForAsset as p,
  useGitHubRepo as u
};
