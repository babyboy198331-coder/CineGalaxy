import Link from "next/link";

export default function Landing() {
  return (
    <section id="landing">
      <div className="header__container">
        <h1 className="hero__title">
          Find your next <span className="gold">favorite movie</span>
        </h1>
        <p className="hero__subtitle">
          Browse popular titles, search the full TMDB catalog, and dive into
          details, ratings, and cast for every film.
        </p>
        <div className="hero__actions">
          <Link href="/#features" className="hero__btn hero__btn--primary">
            Browse Movies
          </Link>
          <Link href="/#explore" className="hero__btn hero__btn--ghost">
            Explore Picks
          </Link>
        </div>
      </div>
    </section>
  );
}
