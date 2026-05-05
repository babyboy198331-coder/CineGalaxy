import MovieCard from "./MovieCard";

type Movie = {
  id: number;
  title: string;
  poster_path?: string;
  release_date?: string;
  price?: number;
  overview?: string;
  cast?: string[];
};

export default function MovieGrid({ movies }: { movies: Movie[] }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {movies.map((movie: Movie) => (
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
  );
}
