import { gQ as externalApiGet, dO as TATAKAI_API_URL, gR as searchJikanCharacters, gS as fetchEpisodes, gT as fetchTatakaiEpisodeSources, cA as fetchCombinedSources } from "./index.C6yfkT5T.js";
import { gU, gV, gW, I, gX, dI, o, bl, gY, gZ, dN, g_, g$, h0, h1, h2, bi, h3, h4, g, h, l, C, d2, aD, h5, h6, h7, h8, h9, db, ha, hb, a_, H, hc, hd, he, hf, hg, cy, hh, hi, hj, dQ, gi, dP } from "./index.C6yfkT5T.js";
import "./react-vendor.CAo4XUiA.js";
import "./vendor.CJyRs4QS.js";
import "./tanstack.DPr3OB19.js";
import "./supabase.WuRMX5Dg.js";
import "./radix.BiK9uYXL.js";
import "./icons.C2gBBarQ.js";
import "./motion.DVGLRFCH.js";
import "./hls.BlgtCWcq.js";
import "./editor.Dxw8dtyw.js";
import "./charts.Dr1fgDJ-.js";
const CHAR_API_URL = "https://anime-api.canelacho.com/api/v1";
const EXTERNAL_CHARACTER_ID_PREFIX = "ext-";
const DEFAULT_CHARACTER_IMAGE = "/placeholder.svg";
const fetchCharacterApiViaProxy = (path) => {
  const targetUrl = `${CHAR_API_URL}${path}`;
  return externalApiGet(
    TATAKAI_API_URL,
    `/proxy?url=${encodeURIComponent(targetUrl)}`
  );
};
const asString = (value) => {
  if (typeof value === "string") return value.trim();
  if (typeof value === "number") return String(value);
  return "";
};
const asNumber = (value, fallback) => {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string" && value.trim()) {
    const parsed = Number(value);
    if (Number.isFinite(parsed)) return parsed;
  }
  return fallback;
};
const asOptionalNumber = (value) => {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string" && value.trim()) {
    const parsed = Number(value);
    if (Number.isFinite(parsed)) return parsed;
  }
  return void 0;
};
const toStringArray = (value) => {
  if (Array.isArray(value)) {
    return value.map((entry) => asString(entry)).filter(Boolean);
  }
  if (typeof value === "string") {
    return value.split(/[,/|]/).map((entry) => entry.trim()).filter(Boolean);
  }
  return [];
};
const resolveAnimeName = (value, fallback) => {
  if (typeof value === "string") return value.trim();
  if (value && typeof value === "object") {
    const record = value;
    return asString(record.name) || asString(record.title) || asString(record.romaji) || asString(record.english);
  }
  return asString(fallback);
};
const normalizeNameForMatch = (value) => String(value || "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
const namesLikelyMatch = (left, right) => {
  const normalizedLeft = normalizeNameForMatch(String(left || ""));
  const normalizedRight = normalizeNameForMatch(String(right || ""));
  if (!normalizedLeft || !normalizedRight) return false;
  if (normalizedLeft === normalizedRight) return true;
  if (normalizedLeft.includes(normalizedRight) || normalizedRight.includes(normalizedLeft)) return true;
  const leftTokens = new Set(normalizedLeft.split(" ").filter((token) => token.length > 2));
  const rightTokens = normalizedRight.split(" ").filter((token) => token.length > 2);
  const overlapCount = rightTokens.filter((token) => leftTokens.has(token)).length;
  return overlapCount >= Math.min(2, rightTokens.length);
};
const buildSlug = (value) => {
  const normalized = value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").trim();
  return normalized || "unknown-character";
};
const normalizeCharacterId = (record, fallbackName) => {
  const legacyId = asString(record._id);
  if (legacyId) return legacyId;
  const externalNumericId = asString(record.id || record.characterId);
  if (externalNumericId) {
    if (/^\d+$/.test(externalNumericId)) {
      return `${EXTERNAL_CHARACTER_ID_PREFIX}${externalNumericId}`;
    }
    return externalNumericId;
  }
  return buildSlug(fallbackName);
};
const normalizeCharacterBase = (row) => {
  const firstName = asString(row.firstName);
  const lastName = asString(row.lastName);
  const assembledName = [firstName, lastName].filter(Boolean).join(" ").trim();
  const name = asString(row.name) || asString(row.fullName) || asString(row.displayName) || assembledName || asString(row.title) || "Unknown Character";
  return {
    _id: normalizeCharacterId(row, name),
    name,
    anime: resolveAnimeName(row.anime, row.series) || "Unknown Anime",
    image: asString(row.image) || asString(row.avatar) || asString(row.poster) || asString(row.thumbnail) || DEFAULT_CHARACTER_IMAGE,
    malId: asOptionalNumber(row.malId ?? row.mal_id ?? row.malID),
    gender: asString(row.gender) || void 0,
    status: asString(row.status) || void 0
  };
};
const buildDescription = (base, row) => {
  const explicitDescription = asString(row.description);
  if (explicitDescription) return explicitDescription;
  const title = asString(row.title);
  const occupation = asString(row.occupation);
  const village = asString(row.village);
  const country = asString(row.country);
  const lines = [];
  if (title) lines.push(`${base.name} is known as ${title}.`);
  if (occupation) lines.push(`Occupation: ${occupation}.`);
  if (base.anime && base.anime !== "Unknown Anime") lines.push(`Appears in ${base.anime}.`);
  const origin = [village, country].filter(Boolean).join(", ");
  if (origin) lines.push(`Origin: ${origin}.`);
  return lines.join(" ") || `${base.name} appears in ${base.anime}.`;
};
const normalizeCharacterDetail = (row) => {
  const base = normalizeCharacterBase(row);
  const powers = toStringArray(row.powers || row.power);
  const abilities = toStringArray(row.abilities || row.ability);
  const elements = toStringArray(row.elements || row.element);
  const occupations = toStringArray(row.occupation);
  const resolvedAbilities = abilities.length > 0 ? abilities : elements;
  return {
    ...base,
    description: buildDescription(base, row),
    age: asString(row.age) || void 0,
    birthday: asString(row.birthday) || void 0,
    occupation: occupations.length > 0 ? occupations : void 0,
    powers: powers.length > 0 ? powers : void 0,
    abilities: resolvedAbilities.length > 0 ? resolvedAbilities : void 0,
    weapons: toStringArray(row.weapons).length > 0 ? toStringArray(row.weapons) : void 0,
    country: asString(row.country) || asString(row.village) || void 0,
    clan: asString(row.clan) || void 0,
    elements: elements.length > 0 ? elements : void 0,
    affiliations: toStringArray(row.affiliations).length > 0 ? toStringArray(row.affiliations) : void 0,
    family: Array.isArray(row.family) ? row.family : void 0,
    voiceActors: Array.isArray(row.voiceActors) ? row.voiceActors : void 0
  };
};
const normalizePagination = (pagination, page, limit, totalRows) => ({
  currentPage: asNumber(pagination == null ? void 0 : pagination.currentPage, page),
  totalPages: asNumber(pagination == null ? void 0 : pagination.totalPages, 1),
  totalCharacters: asNumber((pagination == null ? void 0 : pagination.totalCharacters) ?? (pagination == null ? void 0 : pagination.totalItems), totalRows),
  pageSize: asNumber((pagination == null ? void 0 : pagination.pageSize) ?? (pagination == null ? void 0 : pagination.itemsPerPage), limit)
});
const extractCharacterRows = (payload) => {
  if (Array.isArray(payload)) {
    return payload.filter((entry) => typeof entry === "object" && entry !== null);
  }
  if (payload && typeof payload === "object") {
    const record = payload;
    if (Array.isArray(record.data)) {
      return record.data.filter((entry) => typeof entry === "object" && entry !== null);
    }
  }
  return [];
};
const normalizeCharacterListResponse = (response, page, limit) => {
  const rows = extractCharacterRows(response.data);
  const data = rows.map(normalizeCharacterBase);
  return {
    success: response.success !== false,
    message: response.message || "Characters fetched",
    data,
    pagination: normalizePagination(response.pagination, page, limit, data.length)
  };
};
const toApiCharacterId = (id) => {
  const normalized = String(id || "").trim();
  if (!normalized) return normalized;
  if (normalized.startsWith(EXTERNAL_CHARACTER_ID_PREFIX)) {
    return normalized.slice(EXTERNAL_CHARACTER_ID_PREFIX.length);
  }
  return normalized;
};
async function fetchCharacters(page = 1, limit = 20) {
  const response = await fetchCharacterApiViaProxy(`/characters?page=${page}&limit=${limit}`);
  return normalizeCharacterListResponse(response, page, limit);
}
async function fetchCharacterById(id) {
  const apiId = toApiCharacterId(id);
  const response = await fetchCharacterApiViaProxy(`/characters/${encodeURIComponent(apiId)}`);
  const record = response.data && typeof response.data === "object" ? response.data : {};
  return {
    success: response.success !== false,
    message: response.message || "Character fetched",
    data: normalizeCharacterDetail(record)
  };
}
async function searchCharacters(query, page = 1, limit = 20) {
  const encodedQuery = encodeURIComponent(query);
  const enrichWithJikan = async (payload) => {
    const characters = Array.isArray(payload.data) ? payload.data : [];
    if (characters.length === 0) return payload;
    const needsImageOrRouteHint = characters.some(
      (character) => !character.malId || !character.image || character.image === DEFAULT_CHARACTER_IMAGE
    );
    if (!needsImageOrRouteHint) return payload;
    try {
      const jikanResponse = await searchJikanCharacters(query, 1);
      const jikanRows = Array.isArray(jikanResponse == null ? void 0 : jikanResponse.data) ? jikanResponse.data : [];
      if (jikanRows.length === 0) return payload;
      const enrichedData = characters.map((character) => {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        const matched = character.malId ? jikanRows.find((candidate) => Number(candidate.mal_id) === Number(character.malId)) : jikanRows.find((candidate) => namesLikelyMatch(candidate.name, character.name));
        if (!matched) return character;
        const jikanImage = ((_b = (_a = matched.images) == null ? void 0 : _a.jpg) == null ? void 0 : _b.image_url) || ((_d = (_c = matched.images) == null ? void 0 : _c.jpg) == null ? void 0 : _d.small_image_url) || ((_f = (_e = matched.images) == null ? void 0 : _e.webp) == null ? void 0 : _f.image_url) || ((_h = (_g = matched.images) == null ? void 0 : _g.webp) == null ? void 0 : _h.small_image_url) || "";
        return {
          ...character,
          malId: character.malId || matched.mal_id,
          image: character.image && character.image !== DEFAULT_CHARACTER_IMAGE ? character.image : jikanImage || character.image || DEFAULT_CHARACTER_IMAGE
        };
      });
      return {
        ...payload,
        data: enrichedData
      };
    } catch {
      return payload;
    }
  };
  try {
    const response = await fetchCharacterApiViaProxy(
      `/characters/search?name=${encodedQuery}&page=${page}&limit=${limit}`
    );
    const normalized = normalizeCharacterListResponse(response, page, limit);
    return enrichWithJikan(normalized);
  } catch {
    const response = await fetchCharacterApiViaProxy(
      `/characters/search?q=${encodedQuery}&page=${page}&limit=${limit}`
    );
    const normalized = normalizeCharacterListResponse(response, page, limit);
    return enrichWithJikan(normalized);
  }
}
export {
  TATAKAI_API_URL,
  gU as TTL,
  gV as analytics,
  gW as apiGet,
  I as contentGraph,
  externalApiGet,
  gX as fetchAnimeInfo,
  fetchCharacterById,
  fetchCharacters,
  fetchCombinedSources,
  dI as fetchEpisodeServers,
  fetchEpisodes,
  o as fetchGenreAnimes,
  bl as fetchHome,
  gY as fetchJikanAnime,
  gZ as fetchJikanCharacter,
  dN as fetchJikanCover,
  g_ as fetchJikanEpisodes,
  g$ as fetchJikanSeason,
  h0 as fetchJikanSeasonNow,
  h1 as fetchJikanSeasonUpcoming,
  h2 as fetchNextEpisodeSchedule,
  bi as fetchProducerAnimes,
  h3 as fetchStreamingSources,
  fetchTatakaiEpisodeSources,
  h4 as getCurrentSeason,
  g as getHighQualityImage,
  h as getHighQualityPoster,
  l as getProxiedImageUrl,
  C as getProxiedJsonUrl,
  d2 as getProxiedSubtitleUrl,
  aD as getProxiedVideoUrl,
  h5 as installGlobalAdminSecretFetchPatch,
  h6 as isDebridDirectUrl,
  h7 as jikanToAnimeCard,
  h8 as mediaToAnimeCard,
  h9 as queryCache,
  db as readProxyQuerySnapshot,
  ha as searchAnime,
  searchCharacters,
  hb as searchJikanAnime,
  searchJikanCharacters,
  a_ as toAnimeCard,
  H as toHomeData,
  hc as toSpotlightAnime,
  hd as toTopAnime,
  he as toTrendingAnime,
  hf as trackAnimeInteraction,
  hg as trackError,
  cy as trackEvent,
  hh as trackPageView,
  hi as trackSocialInteraction,
  hj as trackWatchProgress,
  dQ as unwrapApiData,
  gi as withAdminSecretHeader,
  dP as withClientHeaders
};
