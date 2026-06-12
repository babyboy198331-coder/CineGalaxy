import Link from "next/link";

export default function NavBar() {
  return (
    <nav className="navbar">
      <div className="nav__container">
        <Link href="/" className="nav__logo">
          Cine<span className="gold">Galaxy</span>
        </Link>

        <div className="nav__links">
          <Link href="/#features" className="nav__link">
            Browse
          </Link>
          <Link href="/#recent" className="nav__link">
            Featured
          </Link>
          <Link href="/#explore" className="nav__link">
            Explore
          </Link>
          <Link href="/" className="nav__link nav__cta">
            Home
          </Link>
        </div>
      </div>
    </nav>
  );
}
