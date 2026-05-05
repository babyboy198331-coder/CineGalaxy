"use client";

import { useState } from "react";
import MovieGrid from "./MovieGrid";
import moviesData, { Movie } from "../lib/movies";

const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

export default function Features() {
  const router = useRouter();
  const [movies, setMovies] = useState<Movie[]>(moviesData);
  const [search, setSearch] = useState("");

  // Search local movies and keep the filtered list visible
  const searchMovies = (query: string) => {
    if (!query.trim()) {
      setMovies(moviesData);
      return;
    }

    const filtered = moviesData.filter(movie =>
      movie.title.toLowerCase().includes(query.toLowerCase()) ||
      movie.overview.toLowerCase().includes(query.toLowerCase()) ||
      movie.cast.some(actor => actor.toLowerCase().includes(query.toLowerCase()))
    );

    setMovies(filtered);
  };

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  // Handle search on Enter key
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      searchMovies(search);
    }
  };

  // Sort current movie list by price
  const sortMovies = (value: string) => {
    const sorted = [...movies];

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

            {/* Search Box */}
            <div className="search-box">
              <input
                type="text"
                placeholder="Search movies..."
                value={search}
                onChange={handleSearchChange}
                onKeyDown={handleKeyDown}
              />
              <button onClick={() => searchMovies(search)}>
                <i className="fas fa-search"></i>
              </button>
            </div>

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
