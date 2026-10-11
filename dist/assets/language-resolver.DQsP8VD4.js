const LANGUAGE_ALIASES = {
  // Japanese
  ja: "ja",
  jpn: "ja",
  japanese: "ja",
  sub: "ja",
  // English
  en: "en",
  eng: "en",
  english: "en",
  dub: "en",
  "dual audio": "en",
  "multi audio": "en",
  multi: "en",
  // Hindi
  hi: "hi",
  hin: "hi",
  hindi: "hi",
  // Spanish
  es: "es",
  spa: "es",
  spanish: "es",
  // Portuguese
  pt: "pt",
  por: "pt",
  portuguese: "pt",
  // French
  fr: "fr",
  fra: "fr",
  fre: "fr",
  french: "fr",
  // Korean
  ko: "ko",
  kor: "ko",
  korean: "ko",
  // Chinese
  zh: "zh",
  chi: "zh",
  zho: "zh",
  chinese: "zh",
  // Arabic
  ar: "ar",
  ara: "ar",
  arabic: "ar",
  // German
  de: "de",
  deu: "de",
  ger: "de",
  german: "de",
  // Italian
  it: "it",
  ita: "it",
  italian: "it",
  // Thai
  th: "th",
  tha: "th",
  thai: "th"
};
function normalizeLanguage(lang) {
  if (!lang) return "";
  const lower = lang.toLowerCase().trim();
  return LANGUAGE_ALIASES[lower] ?? lower;
}
const LANGUAGE_LABELS = {
  ja: "Japanese",
  en: "English",
  hi: "Hindi",
  es: "Spanish",
  pt: "Portuguese",
  fr: "French",
  ko: "Korean",
  zh: "Chinese",
  ar: "Arabic",
  de: "German",
  it: "Italian",
  th: "Thai"
};
function getLanguageLabel(canonicalLang) {
  return LANGUAGE_LABELS[canonicalLang] ?? canonicalLang.toUpperCase();
}
async function resolveExtensionForEpisode(providers, anilistId, episode, preferredLanguages, defaultLanguage) {
  if (!providers.length) return null;
  const normalizedPreferred = preferredLanguages.map(normalizeLanguage).filter(Boolean);
  const providerCapabilities = /* @__PURE__ */ new Map();
  const heuristicCandidates = [];
  for (const provider of providers) {
    let capabilities = [];
    try {
      if (typeof provider.getEpisodeLanguages === "function") {
        capabilities = await provider.getEpisodeLanguages(anilistId, episode);
      }
    } catch (err) {
      console.warn(`[LanguageResolver] ${provider.name} getEpisodeLanguages failed:`, err);
      capabilities = [];
    }
    if (capabilities.length === 0) {
      heuristicCandidates.push(provider);
    } else {
      providerCapabilities.set(provider.id, {
        provider,
        capabilities,
        normalized: capabilities.map((cap) => normalizeLanguage(cap.language))
      });
    }
  }
  for (const preferred of normalizedPreferred) {
    for (const provider of providers) {
      const entry = providerCapabilities.get(provider.id);
      if (!entry) continue;
      const idx = entry.normalized.indexOf(preferred);
      if (idx !== -1 && entry.capabilities[idx].type === "audio") {
        const cap = entry.capabilities[idx];
        return {
          provider,
          resolvedLanguage: preferred,
          languageLabel: cap.label || getLanguageLabel(preferred),
          matchType: "strict",
          capabilities: entry.capabilities
        };
      }
    }
  }
  if (heuristicCandidates.length > 0) {
    const provider = heuristicCandidates[0];
    const resolvedLanguage = normalizedPreferred[0] ?? "ja";
    return {
      provider,
      resolvedLanguage,
      languageLabel: getLanguageLabel(resolvedLanguage),
      matchType: "heuristic",
      capabilities: []
    };
  }
  {
    const normalizedDefault = normalizeLanguage(defaultLanguage);
    if (!normalizedPreferred.includes(normalizedDefault)) {
      for (const provider of providers) {
        const entry = providerCapabilities.get(provider.id);
        if (entry) {
          const idx = entry.normalized.indexOf(normalizedDefault);
          if (idx !== -1 && entry.capabilities[idx].type === "audio") {
            const cap = entry.capabilities[idx];
            return {
              provider,
              resolvedLanguage: normalizedDefault,
              languageLabel: cap.label || getLanguageLabel(normalizedDefault),
              matchType: "fallback-default",
              capabilities: entry.capabilities
            };
          }
        } else if (heuristicCandidates.includes(provider)) {
          return {
            provider,
            resolvedLanguage: normalizedDefault,
            languageLabel: getLanguageLabel(normalizedDefault),
            matchType: "fallback-default",
            capabilities: []
          };
        }
      }
    }
  }
  return null;
}
function describeResolution(result) {
  const matchDesc = {
    strict: "exact language match",
    heuristic: "language-agnostic source",
    "fallback-default": "global default language fallback"
  }[result.matchType];
  return `${result.provider.name} [${result.languageLabel}] via ${matchDesc}`;
}
export {
  describeResolution as d,
  getLanguageLabel as g,
  normalizeLanguage as n,
  resolveExtensionForEpisode as r
};
