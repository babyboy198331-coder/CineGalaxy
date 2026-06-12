import Link from "next/link";

export default function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="row row__column">
          <Link href="/" className="footer__brand">
            Cine<span className="gold">Galaxy</span>
          </Link>

          <div className="footer__list">
            <Link href="/" className="footer__link">
              Home
            </Link>
            <Link href="/#features" className="footer__link">
              Browse
            </Link>
            <Link href="/#explore" className="footer__link">
              Explore
            </Link>
          </div>

          <p className="footer__credit">
            Movie data from{" "}
            <a
              href="https://www.themoviedb.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="footer__link"
            >
              TMDB
            </a>
            . Built with Next.js — portfolio project.
          </p>
        </div>
      </div>
    </footer>
  );
}
