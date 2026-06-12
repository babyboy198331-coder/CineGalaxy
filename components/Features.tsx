"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import MovieGrid from "./MovieGrid";
import moviesData, { Movie } from "../lib/movies";

const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

type SortOrder = "" | "RATING_HIGH_TO_LOW" | "RATING_LOW_TO_HIGH";

function applySort(list: Movie[], order: SortOrder): Movie[] {
  if (!order) return list;
  const sorted = [...list];
  sorted.sort((a, b) =>
    order === "RATING_HIGH_TO_LOW"
      ? (b.vote_average ?? 0) - (a.vote_average ?? 0)
      : (a.vote_average ?? 0) - (b.vote_average ?? 0)
  );
  return sorted;
}

function mapTmdbResults(results: any[]): Movie[] {
  return results.map((movie) => ({
    id: movie.id,
    title: movie.title || movie.name || "Untitled",
    poster_path: movie.poster_path,
    release_date: movie.release_date,
    overview: movie.overview,
    vote_average: movie.vote_average,
    cast: [],
  }));
}

export default function Features() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState<SortOrder>("");
  const [isLoading, setIsLoading] = useState(false);
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const loadPopularMovies = useCallback(async () => {
    setIsLoading(true);

    if (TMDB_API_KEY) {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/popular?api_key=${TMDB_API_KEY}&language=en-US&page=1`
        );

        if (response.ok) {
          const data = await response.json();
          setMovies(applySort(mapTmdbResults(data.results || []), sortOrder));
          setIsLoading(false);
          return;
        }
      } catch (error) {
        console.error("Failed to load popular movies from API:", error);
      }
    }

    // Fallback to local data
    setMovies(applySort(moviesData, sortOrder));
    setIsLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    loadPopularMovies();
  }, [loadPopularMovies]);

  const searchMovies = async (query: string) => {
    if (!query.trim()) {
      loadPopularMovies();
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
          setMovies(applySort(mapTmdbResults(data.results || []), sortOrder));
          return;
        }
      } catch (error) {
        console.error("TMDB search failed:", error);
      }
    }

    // Fallback to local search
    const q = query.toLowerCase();
    const filtered = moviesData.filter(
      (movie) =>
        movie.title.toLowerCase().includes(q) ||
        movie.overview?.toLowerCase().includes(q) ||
        movie.cast?.some((actor) => actor.toLowerCase().includes(q))
    );

    setMovies(applySort(filtered, sortOrder));
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);

    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    setIsLoading(true);

    debounceTimer.current = setTimeout(async () => {
      await searchMovies(value);
      setIsLoading(false);
    }, 300);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
      setIsLoading(true);
      searchMovies(search).then(() => setIsLoading(false));
    }
  };

  const sortMovies = (value: SortOrder) => {
    setSortOrder(value);
    setMovies((current) => applySort(current, value));
  };

  return (
    <section id="features">
      <div className="container">
        <div className="row">
          <div className="movies__header">
            <h2 className="section__title movies__header--title">
              All <span className="gold">Movies</span>
            </h2>

            {/* Search Box */}
            <div className="search-box">
              <input
                type="text"
                placeholder="Search movies..."
                value={search}
                onChange={handleSearchChange}
                onKeyDown={handleKeyDown}
                aria-label="Search movies"
              />
              <button
                onClick={() => searchMovies(search)}
                aria-label="Search"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  aria-hidden="true"
                >
                  <circle cx="11" cy="11" r="7" />
                  <line x1="21" y1="21" x2="16.5" y2="16.5" />
                </svg>
              </button>
            </div>

            {/* Sort Dropdown */}
            <select
              id="filter"
              value={sortOrder}
              onChange={(e) => sortMovies(e.target.value as SortOrder)}
              aria-label="Sort movies"
            >
              <option value="" disabled>
                Sort by Rating
              </option>
              <option value="RATING_HIGH_TO_LOW">Rating, High to Low</option>
              <option value="RATING_LOW_TO_HIGH">Rating, Low to High</option>
            </select>
          </div>

          {/* Loading Indicator */}
          {isLoading && <div className="search-loading">Searching...</div>}

          {/* No Results Message */}
          {!isLoading && search && movies.length === 0 && (
            <div className="no-results">
              No movies found for &quot;{search}&quot;
            </div>
          )}

          {/* Search Results Header */}
          {!isLoading && search && movies.length > 0 && (
            <div className="search-results-header">
              Found <span className="gold">{movies.length}</span> results for{" "}
              &quot;<span className="gold">{search}</span>&quot;
            </div>
          )}

          {/* Movie List */}
          {movies.length > 0 && <MovieGrid movies={movies} />}
        </div>
      </div>
    </section>
  );
}
