export default function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="row row__column">
          <a href="#">
            <figure className="footer__logo">
              <img
                src="/assets/imdb3.webp"
                className="footer__logo--img"
                alt="IMDb Footer Logo"
              />
            </figure>
          </a>

          <div className="footer__list">
            <a href="#" className="footer__link">Home</a>
            <a className="footer__link no-cursor">About</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
