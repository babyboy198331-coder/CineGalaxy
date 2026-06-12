import { notFound } from "next/navigation";
import Link from "next/link";
import movies, { Movie } from "../../lib/movies";
import { posterUrl } from "../../lib/poster";

const TMDB_API_KEY =
  process.env.TMDB_API_KEY || process.env.NEXT_PUBLIC_TMDB_API_KEY;

async function fetchRemoteMovie(id: number): Promise<Movie | null> {
  if (!TMDB_API_KEY) return null;

  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${TMDB_API_KEY}&language=en-US&append_to_response=credits`,
      { cache: "no-store" }
    );

    if (!response.ok) return null;

    const data = await response.json();
    const cast =
      data.credits?.cast?.slice(0, 6).map((member: { name: string }) => member.name) || [];

    return {
      id: data.id,
      title: data.title,
      poster_path: data.poster_path,
      overview: data.overview,
      release_date: data.release_date,
      vote_average: data.vote_average,
      cast,
    };
  } catch (error) {
    console.error("Failed to fetch TMDB movie details", error);
    return null;
  }
}

export default async function MovieDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const movieId = Number(id);
  let movie: Movie | null = movies.find((m: Movie) => m.id === movieId) ?? null;

  if (!movie) {
    movie = await fetchRemoteMovie(movieId);
  }

  if (!movie) return notFound();

  return (
    <div className="movie-details">
      <Link href="/" className="back-button">
        ← Back to Movies
      </Link>

      <img
        className="movie-details__poster"
        src={posterUrl(movie.poster_path)}
        alt={movie.title}
      />

      <h1 className="movie-details__title">{movie.title}</h1>

      <p className="movie-details__year">
        {movie.release_date ? movie.release_date.slice(0, 4) : "Unknown"}
        {movie.vote_average ? ` · ★ ${movie.vote_average.toFixed(1)}` : ""}
      </p>

      <p className="movie-details__description">
        {movie.overview || "No description available."}
      </p>

      <h2 className="movie-details__cast-title">Cast</h2>
      <ul className="movie-details__cast">
        {movie.cast?.length
          ? movie.cast.map((actor: string) => <li key={actor}>{actor}</li>)
          : "No cast information available."}
      </ul>
    </div>
  );
}
