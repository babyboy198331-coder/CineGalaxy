"use client";

import { useState } from "react";
import MovieGrid from "./MovieGrid";
import moviesData, { Movie } from "../lib/movies";

const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

export default function Features() {
  const [movies, setMovies] = useState<Movie[]>(moviesData);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  const applySort = (list: Movie[], order: string) => {
    const sorted = [...list];

    if (order === "LOW_TO_HIGH") {
      sorted.sort((a, b) => (a.price ?? 0) - (b.price ?? 0));
    } else if (order === "HIGH_TO_LOW") {
      sorted.sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
    }

    return sorted;
  };

  const mapTmdbResults = (results: any[]): Movie[] => {
    return results.map((movie) => ({
      id: movie.id,
      title: movie.title || movie.name || "Untitled",
      poster_path: movie.poster_path,
      release_date: movie.release_date,
      overview: movie.overview,
      cast: [],
    }));
  };

  // Search movies and keep the filtered list visible
  const searchMovies = async (query: string) => {
    if (!query.trim()) {
      setMovies(applySort(moviesData, sortOrder));
      return;
    }

    if (TMDB_API_KEY) {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(
            query
          )}&include_adult=false&page=1`
        );

        if (response.ok) {
          const data = await response.json();
          const remoteMovies = mapTmdbResults(data.results || []);
          setMovies(applySort(remoteMovies, sortOrder));
          return;
        }
      } catch (error) {
        console.error("TMDB search failed:", error);
      }
    }

    const filtered = moviesData.filter((movie) =>
      movie.title.toLowerCase().includes(query.toLowerCase()) ||
      movie.overview?.toLowerCase().includes(query.toLowerCase()) ||
      movie.cast?.some((actor) => actor.toLowerCase().includes(query.toLowerCase()))
    );

    setMovies(applySort(filtered, sortOrder));
  };

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    searchMovies(value);
  };

  // Handle search on Enter key
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      searchMovies(search);
    }
  };

  // Sort current movie list by price
  const sortMovies = (value: string) => {
    setSortOrder(value);
    setMovies(applySort(movies, value));
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
              value={sortOrder}
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
