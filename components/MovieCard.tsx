import Link from "next/link";

type MovieCardProps = {
  id: number;
  title: string;
  poster: string;
  year?: string;
  rating?: number;
};

export default function MovieCard({
  id,
  title,
  poster,
  year,
  rating,
}: MovieCardProps) {
  return (
    <Link href={`/${id}`} className="movie">
      <figure className="movie__img--wrapper">
        <img className="movie__img" src={poster} alt={title} />
      </figure>

      <div className="movie__title">{title}</div>
      <div className="movie__meta">
        {year && <span>{year}</span>}
        {typeof rating === "number" && rating > 0 && (
          <span className="movie__rating">★ {rating.toFixed(1)}</span>
        )}
      </div>
    </Link>
  );
}
