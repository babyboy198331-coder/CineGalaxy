const FALLBACK_POSTER = "/assets/imdb.jpg";

/**
 * Resolve a poster path to a usable image URL.
 * Local assets ("/assets/...") are served as-is; TMDB paths are
 * prefixed with the TMDB image CDN; missing paths get a fallback.
 */
export function posterUrl(posterPath?: string | null, size = "w342"): string {
  if (!posterPath) return FALLBACK_POSTER;
  if (posterPath.startsWith("/assets")) return posterPath;
  return `https://image.tmdb.org/t/p/${size}${posterPath}`;
}
