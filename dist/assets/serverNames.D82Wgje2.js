const CANONICAL_SERVER_NAMES = {
  "hd-1": "Tatakai HD 1",
  "hd-2": "Tatakai HD 2",
  "vidstreaming": "Vidstreaming",
  "streamsb": "StreamSB",
  "streamtape": "StreamTape",
  "mp4upload": "Mp4Upload",
  "filemoon": "Filemoon"
};
const PROVIDER_ALIASES = {
  // ── Direct-stream providers ──
  animepahe: "Naruto",
  anikoto: "Sasuke",
  anizone: "Sakura",
  senshi: "Kakashi",
  senshianime: "Kakashi",
  animeya: "Miki",
  toonstream: "Goku",
  reanime: "Luffy",
  aniworld: "Zoro",
  fouranime: "Nami",
  "4anime": "Nami",
  animelok: "Levi",
  watchanimeworld: "Eren",
  animesalt: "Mikasa",
  mkissa: "Gojo",
  desidub: "Itadori",
  animeheaven: "Nezuko",
  animeblkom: "Tanjiro",
  vidnest: "Killua",
  rubystm: "Gon",
  // ── Torrent providers ──
  nyaa: "Shanks",
  acgrip: "Rukia",
  animetosho: "Ichigo",
  subplease: "Hinata",
  subsplease: "Hinata",
  seadex: "Asuna",
  nekobt: "Kirito",
  aniliberty: "Rem",
  acgnx: "Emilia"
};
function normalizeKey(value) {
  return String(value || "").trim().toLowerCase();
}
function baseProviderKey(key) {
  return key.split("-")[0] || key;
}
function toTitleCase(value) {
  return value.split(/\s+/).filter(Boolean).map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join(" ");
}
function getFriendlyServerName(serverName) {
  const key = normalizeKey(serverName);
  if (!key) return "Unknown Server";
  if (CANONICAL_SERVER_NAMES[key]) return CANONICAL_SERVER_NAMES[key];
  if (PROVIDER_ALIASES[key]) return PROVIDER_ALIASES[key];
  const base = baseProviderKey(key);
  if (PROVIDER_ALIASES[base]) return PROVIDER_ALIASES[base];
  return toTitleCase(
    key.replace(/[_-]+/g, " ").replace(/\s+/g, " ").trim()
  );
}
function getSimpleServerDisplayName(serverName, fallback) {
  const key = normalizeKey(serverName);
  const fallbackKey = normalizeKey(fallback);
  for (const candidate of [key, fallbackKey]) {
    if (!candidate) continue;
    if (CANONICAL_SERVER_NAMES[candidate]) return CANONICAL_SERVER_NAMES[candidate];
    if (PROVIDER_ALIASES[candidate]) return PROVIDER_ALIASES[candidate];
    const base = baseProviderKey(candidate);
    if (PROVIDER_ALIASES[base]) return PROVIDER_ALIASES[base];
  }
  if (key) return getFriendlyServerName(key);
  return String(fallback || "").trim() || "Unknown Server";
}
function buildUniqueSimpleNameMap(serverKeys, fallbackByKey = {}) {
  const uniqueKeys = [];
  const seen = /* @__PURE__ */ new Set();
  for (const rawKey of serverKeys) {
    const key = String(rawKey || "");
    if (!key || seen.has(key)) continue;
    seen.add(key);
    uniqueKeys.push(key);
  }
  const labelsByKey = {};
  const keysByLabel = /* @__PURE__ */ new Map();
  for (const key of uniqueKeys) {
    const label = getSimpleServerDisplayName(key, fallbackByKey[key]);
    labelsByKey[key] = label;
    const normalizedLabel = normalizeKey(label);
    const group = keysByLabel.get(normalizedLabel);
    if (group) group.push(key);
    else keysByLabel.set(normalizedLabel, [key]);
  }
  const output = {};
  for (const group of keysByLabel.values()) {
    group.forEach((key, indexInGroup) => {
      const label = labelsByKey[key];
      output[key] = group.length > 1 ? `${label} ${indexInGroup + 1}` : label;
    });
  }
  return output;
}
function getKnownServerOptions() {
  const byName = /* @__PURE__ */ new Map();
  for (const key of Object.keys(PROVIDER_ALIASES)) {
    const name = PROVIDER_ALIASES[key];
    if (!byName.has(name)) byName.set(name, { key, name });
  }
  return Array.from(byName.values()).sort((a, b) => a.name.localeCompare(b.name));
}
export {
  getFriendlyServerName as a,
  buildUniqueSimpleNameMap as b,
  getKnownServerOptions as c,
  getSimpleServerDisplayName as g
};
