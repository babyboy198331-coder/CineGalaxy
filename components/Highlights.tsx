type Highlight = {
  title: string;
  text: string;
  icon: React.ReactNode;
};

const iconProps = {
  width: 32,
  height: 32,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

const highlights: Highlight[] = [
  {
    title: "Live Data",
    text: "Popular titles and search results pulled live from the TMDB API.",
    icon: (
      <svg {...iconProps} aria-hidden="true">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
  },
  {
    title: "Endless Catalog",
    text: "Search across thousands of movies in every genre and era.",
    icon: (
      <svg {...iconProps} aria-hidden="true">
        <rect x="2" y="2" width="20" height="20" rx="2.18" />
        <line x1="7" y1="2" x2="7" y2="22" />
        <line x1="17" y1="2" x2="17" y2="22" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <line x1="2" y1="7" x2="7" y2="7" />
        <line x1="2" y1="17" x2="7" y2="17" />
        <line x1="17" y1="17" x2="22" y2="17" />
        <line x1="17" y1="7" x2="22" y2="7" />
      </svg>
    ),
  },
  {
    title: "Full Details",
    text: "Ratings, release year, synopsis, and top-billed cast on every page.",
    icon: (
      <svg {...iconProps} aria-hidden="true">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
  },
];

export default function Highlights() {
  return (
    <section id="highlights">
      <div className="container">
        <div className="row">
          <h2 className="section__title">
            Why this <span className="gold">app?</span>
          </h2>

          <div className="highlight__wrapper">
            {highlights.map((h) => (
              <div className="highlight" key={h.title}>
                <div className="highlight__img">{h.icon}</div>
                <h3 className="highlight__subtitle">{h.title}</h3>
                <p className="highlight__para">{h.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
