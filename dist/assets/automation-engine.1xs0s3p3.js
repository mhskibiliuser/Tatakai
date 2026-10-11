import { d as db, I as contentGraph, bh as extensionRegistry } from "./index.C6yfkT5T.js";
import { bf as ue } from "./vendor.CJyRs4QS.js";
import { r as resolveExtensionForEpisode, n as normalizeLanguage, d as describeResolution } from "./language-resolver.DQsP8VD4.js";
import "./react-vendor.CAo4XUiA.js";
import "./tanstack.DPr3OB19.js";
import "./supabase.WuRMX5Dg.js";
import "./radix.BiK9uYXL.js";
import "./icons.C2gBBarQ.js";
import "./motion.DVGLRFCH.js";
import "./hls.BlgtCWcq.js";
import "./editor.Dxw8dtyw.js";
import "./charts.Dr1fgDJ-.js";
function normalize(value) {
  return String(value || "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}
function includesAny(haystack, terms = []) {
  return terms.map(normalize).filter(Boolean).some((term) => haystack.includes(term));
}
function compareTitle(candidateTitle, targetTitle, comparisonType = "contains") {
  const candidate = normalize(candidateTitle);
  const target = normalize(targetTitle);
  if (!candidate || !target) return false;
  if (comparisonType === "exact") return candidate === target;
  if (comparisonType === "fuzzy") return candidate.includes(target) || target.includes(candidate);
  return candidate === target || candidate.includes(target) || target.includes(candidate);
}
function matchesLanguagePreference(candidateLang, preferred) {
  const normalizedCandidate = normalize(candidateLang);
  const normalizedPreferred = normalize(preferred);
  if (!normalizedCandidate || !normalizedPreferred || normalizedPreferred === "none") return false;
  if (normalizedCandidate.includes(normalizedPreferred)) return true;
  if (["sub", "ja", "jp", "jpn", "japanese"].includes(normalizedPreferred) && ["jpn", "ja", "jp", "japanese", "sub"].some((alias) => normalizedCandidate.includes(alias))) {
    return true;
  }
  if (["dub", "en", "eng", "english"].includes(normalizedPreferred) && ["eng", "en", "english", "dub", "dual audio", "multi audio"].some((alias) => normalizedCandidate.includes(alias))) {
    return true;
  }
  if (["hi", "hin", "hindi"].includes(normalizedPreferred) && ["hi", "hin", "hindi"].some((alias) => normalizedCandidate.includes(alias))) {
    return true;
  }
  if (normalizedPreferred === "multi" && ["multi", "dual", "both", "dual audio"].some((alias) => normalizedCandidate.includes(alias))) {
    return true;
  }
  return false;
}
function scoreAutoDownloadCandidate(rule, candidate, targetTitles = []) {
  const reasons = [];
  let score = 0;
  const normalizedCandidateTitle = normalize(candidate.title);
  const normalizedCandidateGroup = normalize(candidate.releaseGroup);
  const normalizedCandidateSource = normalize(candidate.sourceType || candidate.source);
  const normalizedCandidateSeason = candidate.seasonNumber ?? void 0;
  const episodeOffset = Number(rule.episodeOffset || 0);
  const normalizedTargetTitles = targetTitles.map(normalize).filter(Boolean);
  const titleComparisonType = rule.titleComparisonType || "contains";
  const hasTitleMatch = normalizedTargetTitles.some((title) => compareTitle(normalizedCandidateTitle, title, titleComparisonType));
  const requiredGroups = (rule.releaseGroups || []).map(normalize).filter(Boolean);
  const requiredResolutions = (rule.resolutions || []).map(normalize).filter(Boolean);
  const additionalTerms = (rule.additionalTerms || []).map(normalize).filter(Boolean);
  const excludeTerms = (rule.excludeTerms || []).map(normalize).filter(Boolean);
  if (excludeTerms.length) {
    const candidateBlob = [normalizedCandidateTitle, normalizedCandidateGroup, normalize(candidate.quality), normalize(candidate.language), normalizedCandidateSource].join(" ");
    if (includesAny(candidateBlob, excludeTerms)) {
      return { score: 0, reasons: ["excluded-term"] };
    }
  }
  if (requiredGroups.length && !requiredGroups.includes(normalizedCandidateGroup)) {
    return { score: 0, reasons: ["release-group-mismatch"] };
  }
  if (requiredResolutions.length) {
    const candidateResolution = normalize(candidate.quality);
    if (!requiredResolutions.some((resolution) => candidateResolution.includes(resolution))) {
      return { score: 0, reasons: ["resolution-mismatch"] };
    }
  }
  if (additionalTerms.length) {
    const candidateBlob = [normalizedCandidateTitle, normalizedCandidateGroup, normalize(candidate.quality), normalize(candidate.language), normalizedCandidateSource].join(" ");
    if (!includesAny(candidateBlob, additionalTerms)) {
      return { score: 0, reasons: ["additional-term-mismatch"] };
    }
  }
  if (hasTitleMatch) {
    score += 45;
    reasons.push("title-match");
  }
  if (candidate.episodeNumber != null) {
    score += 30;
    reasons.push("episode-match");
  }
  if (rule.seasonNumber != null && normalizedCandidateSeason != null && rule.seasonNumber === normalizedCandidateSeason) {
    score += 10;
    reasons.push("season-match");
  }
  if (episodeOffset && candidate.episodeNumber != null) {
    const expectedEpisode = candidate.episodeNumber - episodeOffset;
    if (expectedEpisode > 0) {
      score += 5;
      reasons.push("episode-offset");
    }
  }
  const preferredQuality = String(rule.preferredQuality || "auto").toLowerCase();
  const candidateQuality = String(candidate.quality || "").toLowerCase();
  if (preferredQuality === "auto" || !candidateQuality) {
    score += 8;
    reasons.push("quality-auto");
  } else if (candidateQuality.includes(preferredQuality)) {
    score += 20;
    reasons.push("quality-match");
  }
  const candidateLang = normalize(candidate.language);
  if (rule.preferredLanguages && rule.preferredLanguages.length > 0) {
    for (let i = 0; i < rule.preferredLanguages.length; i++) {
      const preferred = rule.preferredLanguages[i];
      if (matchesLanguagePreference(candidateLang, preferred)) {
        const scoreBonus = i === 0 ? 18 : i === 1 ? 12 : i === 2 ? 8 : 4;
        score += scoreBonus;
        reasons.push(i === 0 ? "preferred-language" : `fallback-language-${i}`);
        break;
      }
    }
  } else {
    const preferredLang = normalize(rule.audioLanguage);
    const fallbackLang = normalize(rule.fallbackLanguage);
    if (preferredLang && preferredLang !== "none" && matchesLanguagePreference(candidateLang, preferredLang)) {
      score += 18;
      reasons.push("preferred-language");
    } else if (fallbackLang && fallbackLang !== "none" && matchesLanguagePreference(candidateLang, fallbackLang)) {
      score += 12;
      reasons.push("fallback-language");
    }
  }
  if (candidate.providerId) {
    const providerPriority = rule.providerPriority || [];
    const providerIndex = providerPriority.indexOf(candidate.providerId);
    if (providerIndex >= 0) {
      score += Math.max(1, 10 - providerIndex);
      reasons.push("provider-priority");
    }
  }
  const preferredSourceType = normalize(rule.preferredSourceType || "any");
  const candidateSourceType = normalize(candidate.sourceType);
  if (!preferredSourceType || preferredSourceType === "any" || preferredSourceType === candidateSourceType) {
    score += 6;
    reasons.push("source-type");
  }
  if (candidate.releaseGroup && normalizedCandidateGroup) {
    score += 3;
    reasons.push("release-group");
  }
  if (rule.minimumScore != null && score < rule.minimumScore) {
    return { score, reasons: [...reasons, "below-minimum-score"] };
  }
  return { score, reasons };
}
function normalizeTitle(title) {
  return title.toLowerCase().replace(/[^a-z0-9\s]/g, " ").replace(/\s+/g, " ").trim();
}
function isTitleMatch(parsedTitle, targetTitles) {
  if (!parsedTitle) return false;
  const normParsed = normalizeTitle(parsedTitle);
  return targetTitles.some((target) => {
    const normTarget = normalizeTitle(target);
    return normParsed === normTarget || normParsed.includes(normTarget) || normTarget.includes(normParsed);
  });
}
function getGlobalDefaultLanguage() {
  return localStorage.getItem("tatakai_default_language") || "ja";
}
async function checkAndRunAutomation() {
  var _a, _b, _c, _d;
  const isDesktop = typeof window !== "undefined" && !!((_a = window.electron) == null ? void 0 : _a.startDownload);
  if (!isDesktop) return;
  try {
    const activeRules = await db.downloadRules.where("enabled").equals(1).toArray();
    if (activeRules.length === 0) return;
    console.log(`[AutomationEngine] Running auto-download checks for ${activeRules.length} rules...`);
    const globalDefaultLang = getGlobalDefaultLanguage();
    let enqueuedCount = 0;
    for (const rule of activeRules) {
      try {
        const media = await contentGraph.getMedia(String(rule.animeId));
        if (!media) continue;
        const targetTitles = [
          media.titleEnglish,
          media.titleRomaji,
          media.titleNative,
          ...media.synonyms || []
        ].filter((t) => typeof t === "string" && !!t.trim());
        let latestEpisode = media.episodes || 0;
        if ((_b = media.nextAiringEpisode) == null ? void 0 : _b.episode) {
          latestEpisode = media.nextAiringEpisode.episode - 1;
        }
        if (latestEpisode <= rule.lastCheckedEpisode && media.status === "RELEASING") {
          latestEpisode = rule.lastCheckedEpisode + 1;
        }
        if (latestEpisode <= rule.lastCheckedEpisode) {
          continue;
        }
        const startEp = rule.lastCheckedEpisode + 1;
        const endEp = Math.min(latestEpisode, startEp + 2);
        console.log(`[AutomationEngine] Checked "${rule.animeTitle}": Needs episodes ${startEp} to ${endEp}`);
        for (let ep = startEp; ep <= endEp; ep++) {
          let downloaded = false;
          const allProviders = extensionRegistry.getSearchProviders();
          const extensionPriorityIds = Array.isArray(rule.sourceExtensionIds) && rule.sourceExtensionIds.length > 0 ? rule.sourceExtensionIds : Array.isArray(rule.providerPriority) ? rule.providerPriority : [];
          const prioritizedProviders = [...allProviders].sort((a, b) => {
            const aIdx = extensionPriorityIds.indexOf(a.id);
            const bIdx = extensionPriorityIds.indexOf(b.id);
            if (aIdx === -1 && bIdx === -1) return 0;
            if (aIdx === -1) return 1;
            if (bIdx === -1) return -1;
            return aIdx - bIdx;
          });
          if (prioritizedProviders.length === 0) {
            console.warn(`[AutomationEngine] No extensions registered — cannot download "${rule.animeTitle}" ep ${ep}`);
            ue.error(`No extensions installed for "${rule.animeTitle}" ep ${ep}`, {
              description: "Install an extension from the Extension Hub to enable auto-downloads."
            });
            break;
          }
          const preferredLanguages = Array.isArray(rule.preferredLanguages) && rule.preferredLanguages.length > 0 ? rule.preferredLanguages : buildLegacyLanguageList(rule.audioLanguage, rule.fallbackLanguage);
          const fallbackMode = rule.languageFallbackMode ?? "switch-source";
          console.log(
            `[AutomationEngine] Resolving language for "${rule.animeTitle}" ep ${ep} | Preferred: [${preferredLanguages.join(", ")}] | Extensions: [${prioritizedProviders.map((p) => p.name).join(", ")}]`
          );
          let resolution = await resolveExtensionForEpisode(
            prioritizedProviders,
            media.anilistId ?? rule.animeId,
            ep,
            preferredLanguages,
            globalDefaultLang
          );
          if (!resolution) {
            if (fallbackMode === "error") {
              const msg = `No source found for "${rule.animeTitle}" ep ${ep} in preferred languages [${preferredLanguages.join(", ")}]`;
              console.error(`[AutomationEngine] ${msg}`);
              ue.error(msg, { description: "Check your extension language settings." });
              continue;
            }
            if (fallbackMode === "switch-source") {
              if (prioritizedProviders.length > 0) {
                resolution = {
                  provider: prioritizedProviders[0],
                  resolvedLanguage: normalizeLanguage(preferredLanguages[0] ?? globalDefaultLang),
                  languageLabel: preferredLanguages[0] ?? globalDefaultLang,
                  matchType: "heuristic",
                  capabilities: []
                };
                console.warn(`[AutomationEngine] Language-agnostic fallback for "${rule.animeTitle}" ep ${ep} — using ${resolution.provider.name}`);
              } else {
                continue;
              }
            }
          }
          if (!resolution) continue;
          console.log(
            `[AutomationEngine] Resolved: ${describeResolution(resolution)} for "${rule.animeTitle}" ep ${ep}`
          );
          const { provider } = resolution;
          const queryTitle = media.titleEnglish || media.titleRomaji;
          const queries = [
            `"${queryTitle}" ${ep}`,
            `"${queryTitle}" episode ${ep}`
          ];
          for (const query of queries) {
            if (downloaded) break;
            try {
              console.log(`[AutomationEngine] Searching "${provider.name}" for: ${query}`);
              const searchResults = await provider.search(query);
              if (!Array.isArray(searchResults) || searchResults.length === 0) continue;
              const scoredResults = [];
              for (const result2 of searchResults) {
                const filename2 = result2.title || result2.name || "";
                const parseRes = await window.electron.parseReleaseName(filename2);
                if (!(parseRes == null ? void 0 : parseRes.success) || !parseRes.parsed) continue;
                const parsed = parseRes.parsed;
                const parsedEp = parsed.episodeNumber;
                if (parsedEp !== ep) continue;
                if (!isTitleMatch(parsed.title, targetTitles)) continue;
                if (resolution.matchType === "strict") {
                  const resultLang = normalizeLanguage(
                    result2.audioLanguage || parsed.audio || result2.language || ""
                  );
                  const isDubRequested = resolution.resolvedLanguage !== "ja";
                  if (isDubRequested) {
                    const isDub = resultLang === resolution.resolvedLanguage || filename2.toLowerCase().includes("dub") || filename2.toLowerCase().includes("dual audio") || filename2.toLowerCase().includes("multi audio");
                    if (!isDub) continue;
                  }
                }
                const scoreInfo = scoreAutoDownloadCandidate(
                  rule,
                  {
                    title: parsed.title,
                    episodeNumber: parsedEp,
                    seasonNumber: parsed.season ?? null,
                    quality: parsed.resolution,
                    language: resolution.resolvedLanguage,
                    providerId: provider.id,
                    sourceType: result2.sourceType || parsed.source || "torrent",
                    source: parsed.source,
                    releaseGroup: parsed.releaseGroup,
                    subtitles: result2.subtitles
                  },
                  targetTitles
                );
                scoredResults.push({
                  result: result2,
                  score: scoreInfo.score,
                  reasons: scoreInfo.reasons,
                  filename: filename2
                });
              }
              const bestMatch = scoredResults.sort((a, b) => b.score - a.score)[0];
              if (!bestMatch) continue;
              const { result, filename } = bestMatch;
              const downloadPath = localStorage.getItem("tatakai_download_path") || void 0;
              const posterUrl = media.coverImageLarge;
              const subtitles = rule.autoDownloadSubtitles && result.subtitles ? result.subtitles.map((s) => ({
                url: s.url,
                lang: s.language || s.lang,
                label: s.label
              })) : [];
              const resultSourceType = result.sourceType === "torrent" || ((_c = result.url) == null ? void 0 : _c.startsWith("magnet:")) || result.magnet ? "torrent" : "hls";
              console.log(
                `[AutomationEngine] Matched "${filename}" score=${bestMatch.score} (${bestMatch.reasons.join(", ")}) lang=${resolution.resolvedLanguage} type=${resultSourceType}. Downloading...`
              );
              const episodeId = `auto-${media.anilistId || media.malId}-${ep}`;
              const meta = {
                animeId: media.anilistId || media.malId || rule.animeId,
                animeTitle: media.titleEnglish || media.titleRomaji,
                episodeNumber: ep,
                sourceType: resultSourceType,
                resolvedLanguage: resolution.resolvedLanguage || "ja",
                startedAt: (/* @__PURE__ */ new Date()).toISOString()
              };
              localStorage.setItem(`tatakai:dl:meta:${episodeId}`, JSON.stringify(meta));
              const startRes = await window.electron.startDownload({
                episodeId,
                animeName: media.titleEnglish || media.titleRomaji,
                episodeNumber: ep,
                url: result.url,
                magnet: result.magnet || (((_d = result.url) == null ? void 0 : _d.startsWith("magnet:")) ? result.url : void 0),
                sourceType: resultSourceType,
                headers: result.headers || {},
                downloadPath,
                posterUrl,
                subtitles
              });
              if ((startRes == null ? void 0 : startRes.success) || (startRes == null ? void 0 : startRes.ok)) {
                const langLabel = resolution.languageLabel;
                ue.success(
                  `Auto-downloading "${media.titleEnglish || media.titleRomaji}" Episode ${ep} [${langLabel}]!`
                );
                rule.lastCheckedEpisode = ep;
                await db.downloadRules.put(rule);
                downloaded = true;
                enqueuedCount++;
                break;
              } else {
                console.warn(`[AutomationEngine] Start download failed for ${filename}:`, startRes == null ? void 0 : startRes.error);
                localStorage.removeItem(`tatakai:dl:meta:${episodeId}`);
              }
            } catch (searchErr) {
              console.error(`[AutomationEngine] Provider search error:`, searchErr);
            }
          }
        }
      } catch (ruleErr) {
        console.error(`[AutomationEngine] Error running rule for "${rule.animeTitle}":`, ruleErr);
      }
    }
    console.log(`[AutomationEngine] Done. Enqueued ${enqueuedCount} downloads.`);
    localStorage.setItem("tatakai_auto_download_last_checked", (/* @__PURE__ */ new Date()).toISOString());
  } catch (err) {
    console.error("[AutomationEngine] Global automation check failed:", err);
  }
}
function buildLegacyLanguageList(audioLanguage, fallbackLanguage) {
  const list = [];
  if (audioLanguage && audioLanguage !== "none") list.push(audioLanguage);
  if (fallbackLanguage && fallbackLanguage !== "none" && fallbackLanguage !== audioLanguage) {
    list.push(fallbackLanguage);
  }
  if (!list.includes("ja") && !list.includes("sub")) list.push("ja");
  return list;
}
export {
  checkAndRunAutomation
};
