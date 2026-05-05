"use client";

import MovieCard from "./MovieCard";
import moviesData from "../lib/movies";

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
                poster={
                  movie.poster_path?.startsWith("/assets")
                    ? movie.poster_path
                    : movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                    : "/assets/imdb.jpg"
                }
                subtitle={
                  movie.release_date
                    ? movie.release_date.slice(0, 4)
                    : movie.price
                    ? `$${movie.price}`
                    : ""
                }
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
