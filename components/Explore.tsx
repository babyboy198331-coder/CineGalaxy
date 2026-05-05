"use client";

import { useRouter } from "next/navigation";
import moviesData from "../lib/movies";

export default function Explore() {
  const router = useRouter();

  const handleExploreClick = () => {
    const randomMovie = moviesData[Math.floor(Math.random() * moviesData.length)];
    router.push(`/${randomMovie.id}`);
  };

  return (
    <section id="explore">
      <div className="container">
        <div className="row row__column">
          <h2>
            Explore more <span className="gold">Movies</span>
          </h2>

          <button className="btn" onClick={handleExploreClick}>
            Explore a Movie
          </button>
        </div>
      </div>
    </section>
  );
}
