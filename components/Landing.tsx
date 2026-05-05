"use client";

import { useState } from "react";
import MovieGrid from "./MovieGrid";
import moviesData, { Movie } from "../lib/movies";

const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

export default function Features() {
  const [movies, setMovies] = useState<Movie[]>(moviesData);

  // Sort movies by price
  const sortMovies = (value: string) => {
    let sorted = [...moviesData];

    if (value === "LOW_TO_HIGH") {
      sorted.sort((a, b) => a.price - b.price);
    } else if (value === "HIGH_TO_LOW") {
      sorted.sort((a, b) => b.price - a.price);
    }

    setMovies(sorted);
  };

  return (
    <section id="features">
      <div className="container">
        <div className="row">
          <div className="movies__header">
            <h2 className="section__title movies__header--title">
              ALL <span className="gold">Movies</span>
            </h2>

            {/* Sort Dropdown */}
            <select
              defaultValue=""
              onChange={(e) => sortMovies(e.target.value)}
            >
              <option value="" disabled>
                Sort
              </option>
              <option value="LOW_TO_HIGH">Price, Low to High</option>
              <option value="HIGH_TO_LOW">Price, High to Low</option>
            </select>
          </div>

          {/* Movie List */}
          <MovieGrid movies={movies} />
        </div>
      </div>
    </section>
  );
}
