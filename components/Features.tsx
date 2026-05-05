"use client";

import { useState, useEffect, useRef } from "react";
import MovieGrid from "./MovieGrid";
import moviesData, { Movie } from "../lib/movies";

const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

export default function Features() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);

  // Load popular movies on page load
  useEffect(() => {
    loadPopularMovies();
  }, []);

  const loadPopularMovies = async () => {
    setIsLoading(true);
    
    if (TMDB_API_KEY) {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/popular?api_key=${TMDB_API_KEY}&language=en-US&page=1`
        );

        if (response.ok) {
          const data = await response.json();
          const popularMovies = mapTmdbResults(data.results || []);
          setMovies(applySort(popularMovies, sortOrder));
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
  };

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

    // Fallback to local search
    const filtered = moviesData.filter((movie) =>
      movie.title.toLowerCase().includes(query.toLowerCase()) ||
      movie.overview?.toLowerCase().includes(query.toLowerCase()) ||
      movie.cast?.some((actor) => actor.toLowerCase().includes(query.toLowerCase()))
    );

    setMovies(applySort(filtered, sortOrder));
  };

  // Handle search input change with debounce
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);

    // Clear previous timer
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    setIsLoading(true);

    // Set new timer for debounced search
    debounceTimer.current = setTimeout(() => {
      searchMovies(value);
      setIsLoading(false);
    }, 300);
  };

  // Handle search on Enter key (immediate)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
      setIsLoading(true);
      searchMovies(search).then(() => setIsLoading(false));
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

          {/* Loading Indicator */}
          {isLoading && <div className="search-loading">Searching...</div>}

          {/* No Results Message */}
          {!isLoading && search && movies.length === 0 && (
            <div className="no-results">No movies found for "{search}"</div>
          )}

          {/* Search Results Header */}
          {!isLoading && search && movies.length > 0 && (
            <div className="search-results-header">
              Found <span className="gold">{movies.length}</span> results for "<span className="gold">{search}</span>"
            </div>
          )}

          {/* Movie List */}
          {movies.length > 0 && <MovieGrid movies={movies} />}
        </div>
      </div>
    </section>
  );
}
