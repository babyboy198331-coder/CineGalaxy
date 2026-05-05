"use client";

import Link from "next/link";
import moviesData from "../lib/movies";

export default function Explore() {
  const featuredMovies = moviesData.slice(0, 4);

  return (
    <section id="explore">
      <div className="container">
        <div className="row row__column explore__row">
          <div className="explore__header">
            <h2>
              Explore more <span className="gold">Movies</span>
            </h2>
            <p className="explore__subtitle">
              Jump right into a featured title and keep browsing the best picks.
            </p>
          </div>

          <div className="explore__cards">
            {featuredMovies.map((movie) => (
              <Link href={`/${movie.id}`} key={movie.id} className="explore__card">
                <span className="explore__card-title">{movie.title}</span>
                <small>{movie.release_date?.slice(0, 4) ?? `$${movie.price}`}</small>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
