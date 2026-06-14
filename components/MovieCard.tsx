import Link from "next/link";
import Image from "next/image";

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
        <Image
          className="movie__img"
          src={poster}
          alt={title}
          width={342}
          height={513}
          loading="lazy"
        />
      </figure>

      <div className="movie__title">{title}</div>
      <div className="movie__meta">
        {year && <span>{year}</span>}
        {typeof rating === "number" && rating > 0 && (
          <span className="movie__rating">&#9733; {rating.toFixed(1)}</span>
        )}
      </div>
    </Link>
  );
}
