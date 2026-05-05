export default function Highlights() {
  return (
    <section id="highlights">
      <div className="container">
        <div className="row">
          <h2 className="section__title">
            Why choose <span className="gold">IMDb?</span>
          </h2>

          <div className="highlight__wrapper">
            <div className="highlight">
              <div className="highlight__img">
                <i className="fas fa-bolt"></i>
              </div>
              <h3 className="highlight__subtitle">Easy and Quick</h3>
              <p className="highlight__para">
                Get access to the movie you purchased online instantly.
              </p>
            </div>

            <div className="highlight">
              <div className="highlight__img">
                <i className="fas fa-film"></i>
              </div>
              <h3 className="highlight__subtitle">10,000+ Movies</h3>
              <p className="highlight__para">
                IMDb has movies in all your favorite categories.
              </p>
            </div>

            <div className="highlight">
              <div className="highlight__img">
                <i className="fas fa-tags"></i>
              </div>
              <h3 className="highlight__subtitle">Affordable</h3>
              <p className="highlight__para">
                Get your hands on popular movies for as little as 9.95.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
