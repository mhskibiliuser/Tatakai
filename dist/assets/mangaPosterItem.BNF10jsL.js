const STATUS_LABEL = {
  releasing: "Ongoing",
  finished: "Completed",
  not_yet_released: "Upcoming",
  cancelled: "Cancelled",
  hiatus: "Hiatus"
};
function statusLabel(status) {
  const key = status == null ? void 0 : status.toLowerCase().replace(/\s+/g, "_");
  if (!key) return void 0;
  return STATUS_LABEL[key] ?? status;
}
function formatLabel(format) {
  if (!format) return void 0;
  const lower = format.toLowerCase();
  if (lower === "manga") return void 0;
  return lower.charAt(0).toUpperCase() + lower.slice(1);
}
function mangaCardToPosterItem(manga, index = 0) {
  const href = manga.anilistId ? `/manga/anilist:${manga.anilistId}` : manga.malId ? `/manga/mal:${manga.malId}` : `/manga/${manga.id}`;
  const score = manga.score && manga.score > 0 ? (manga.score / 10).toFixed(1) : void 0;
  const meta = [
    formatLabel(manga.format),
    manga.chapters ? `${manga.chapters} ch` : void 0,
    statusLabel(manga.status)
  ].filter(Boolean).slice(0, 2).join(" · ");
  return {
    key: `${manga.id || manga.title}-${index}`,
    href,
    title: manga.title,
    poster: manga.poster ?? "",
    meta: meta || void 0,
    score
  };
}
function mangaSearchItemToPosterItem(item, index = 0) {
  var _a, _b, _c;
  const title = item.canonicalTitle || ((_a = item.title) == null ? void 0 : _a.english) || ((_b = item.title) == null ? void 0 : _b.romaji) || ((_c = item.title) == null ? void 0 : _c.native) || "";
  const id = String(item.id || item.anilistId || item.malId || "").trim();
  if (!title || !id) return null;
  const href = item.anilistId ? `/manga/anilist:${item.anilistId}` : item.malId ? `/manga/mal:${item.malId}` : `/manga/${id}`;
  const score = item.score && item.score > 0 ? (item.score / 10).toFixed(1) : void 0;
  const meta = [
    formatLabel(item.mediaType),
    item.year ? String(item.year) : void 0,
    item.chapters ? `${item.chapters} ch` : void 0,
    statusLabel(item.status)
  ].filter(Boolean).slice(0, 2).join(" · ");
  return {
    key: `${id}-${index}`,
    href,
    title,
    poster: item.poster ?? "",
    meta: meta || void 0,
    score
  };
}
export {
  mangaSearchItemToPosterItem as a,
  mangaCardToPosterItem as m
};
