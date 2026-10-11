const MANGA_PROVIDER_RELIABILITY = [
  "mangadex",
  "mangapill",
  "mangakatana",
  "weebcentral",
  "nelomanga",
  "comick",
  "atsu",
  "webtoons",
  "demonicscans"
];
function providerReliabilityRank(provider) {
  const idx = MANGA_PROVIDER_RELIABILITY.indexOf(String(provider || "").toLowerCase());
  return idx === -1 ? MANGA_PROVIDER_RELIABILITY.length : idx;
}
function sortMangaChapterSources(sources) {
  return [...sources || []].filter((source) => Boolean((source == null ? void 0 : source.provider) && (source == null ? void 0 : source.chapterKey))).sort(
    (left, right) => providerReliabilityRank(left.provider) - providerReliabilityRank(right.provider)
  );
}
function pickMangaChapterSource(sources, preferProvider) {
  const ordered = sortMangaChapterSources(sources);
  return ordered.find((source) => source.provider === preferProvider) || ordered[0] || null;
}
function nextMangaChapterSource(sources, current) {
  const ordered = sortMangaChapterSources(sources);
  if (!ordered.length) return null;
  const different = ordered.find(
    (source) => source.provider !== (current == null ? void 0 : current.provider) || source.chapterKey !== (current == null ? void 0 : current.chapterKey) || (source.providerChapterId || "") !== ((current == null ? void 0 : current.providerChapterId) || "")
  );
  return different || ordered[0];
}
export {
  nextMangaChapterSource as n,
  pickMangaChapterSource as p,
  sortMangaChapterSources as s
};
