import MovieCard from "./MovieCard";
import moviesData from "../lib/movies";
import { posterUrl } from "../lib/poster";

export default function Featured() {
  return (
    <section id="recent">
      <div className="container">
        <div className="row">
          <h2 className="section__title">
            Featured <span className="gold">Movies</span>
          </h2>

          <div className="movies">
            {moviesData.slice(0, 8).map((movie) => (
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
        </div>
      </div>
    </section>
  );
}
