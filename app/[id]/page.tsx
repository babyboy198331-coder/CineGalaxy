import { notFound } from "next/navigation";
import Link from "next/link";
import movies, { Movie } from "../../lib/movies";

export default async function MovieDetails({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const movieId = Number(id);
  const movie = movies.find((m: Movie) => m.id === movieId);

  if (!movie) return notFound();

  return (
    <div className="movie-details">
      <Link href="/" className="back-button">
        ← Back to Movies
      </Link>

      <img
        className="movie-details__poster"
        src={
          movie.poster_path?.startsWith("/assets")
            ? movie.poster_path
            : movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : "/assets/imdb.jpg"
        }
        alt={movie.title}
      />

      <h1 className="movie-details__title">{movie.title}</h1>

      <p className="movie-details__year">
        {movie.release_date ? movie.release_date.slice(0, 4) : "Unknown"}
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
