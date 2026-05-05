import Link from "next/link";

type MovieCardProps = {
  id: number;
  title: string;
  poster: string | null;
  subtitle: string; // price OR year
};

export default function MovieCard({ id, title, poster, subtitle }: MovieCardProps) {
  return (
    <Link href={`/${id}`} className="movie">
      <figure className="movie__img--wrapper">
        <img
          className="movie__img"
          src={poster || "/assets/imdb.jpg"}
          alt={title}
        />
      </figure>

      <div className="movie__title">{title}</div>
      <div className="movie__price">{subtitle}</div>
    </Link>
  );
}
