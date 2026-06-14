import Landing from "../components/Landing";
import Highlights from "../components/Highlights";
import Features from "../components/Features";
import Featured from "../components/Featured";
import Explore from "../components/Explore";
import moviesData, { Movie } from "../lib/movies";

const TMDB_API_KEY =
  process.env.TMDB_API_KEY || process.env.NEXT_PUBLIC_TMDB_API_KEY;

async function fetchPopularMovies(): Promise<Movie[]> {
  if (!TMDB_API_KEY) return moviesData;
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${TMDB_API_KEY}&language=en-US&page=1`,
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) return moviesData;
    const data = await res.json();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (data.results || []).map((m: any) => ({
      id: m.id,
      title: m.title || m.name || "Untitled",
      poster_path: m.poster_path,
      release_date: m.release_date,
      overview: m.overview,
      vote_average: m.vote_average,
      cast: [],
    }));
  } catch {
    return moviesData;
  }
}

export default async function Home() {
  const initialMovies = await fetchPopularMovies();
  return (
    <>
      <Landing />
      <Highlights />
      <Features initialMovies={initialMovies} />
      <Featured />
      <Explore />
    </>
  );
}
