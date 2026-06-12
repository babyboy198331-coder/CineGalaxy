import MovieCard from "./MovieCard";
import { Movie } from "../lib/movies";
import { posterUrl } from "../lib/poster";

export default function MovieGrid({ movies }: { movies: Movie[] }) {
  return (
    <div className="movies">
      {movies.map((movie: Movie) => (
        <MovieCard
          key={movie.id}
          id={movie.id}
          title={movie.title}
          poster={posterUrl(movie.poster_path)}
          year={movie.release_date ? movie.release_date.slice(0, 4) : ""}
          rating={movie.vote_average}
        />
      ))}
    </div>
  );
}
