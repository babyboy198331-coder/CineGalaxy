"use client";

import Link from "next/link";
import moviesData from "../lib/movies";

export default function Explore() {
  const featuredMovies = moviesData.slice(0, 3);

  return (
    <section id="explore">
      <div className="container">
        <div className="row row__column explore__row">
          <div className="explore__header">
            <h2>
              Explore more <span className="gold">Movies</span>
            </h2>
            <p className="explore__subtitle">
              Pick one of these featured titles and go straight to the movie page.
            </p>
          </div>

          <div className="explore__cards">
            {featuredMovies.map((movie) => (
              <Link href={`/${movie.id}`} key={movie.id} className="explore__card">
                <div className="explore__card-image-wrapper">
                  <img
                    src={
                      movie.poster_path?.startsWith("/assets")
                        ? movie.poster_path
                        : movie.poster_path
                        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                        : "/assets/imdb.jpg"
                    }
                    alt={movie.title}
                    className="explore__card-image"
                  />
                </div>
                <div className="explore__card-body">
                  <span className="explore__card-title">{movie.title}</span>
                  <small>{movie.release_date?.slice(0, 4) ?? `$${movie.price}`}</small>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
