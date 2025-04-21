import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieCredits } from "../../api/tmbdApi";
import s from "./MovieCast.module.css";

export default function MovieCast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  useEffect(() => {
    fetchMovieCredits(movieId).then(setCast).catch(console.error);
  }, [movieId]);

  return (
    <ul style={{ listStyle: "none", padding: 0 }} className={s.list}>
      {cast.map((actor) => (
        <li key={actor.id} style={{ marginBottom: "20px" }} className={s.item}>
          {actor.profile_path ? (
            <img
              src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
              alt={actor.name}
              style={{ width: "100px", borderRadius: "8px" }}
            />
          ) : (
            <div
              style={{ width: "100px", height: "150px", background: "#ccc" }}
            >
              No Image
            </div>
          )}
          <p className={s.descr}>
            <strong>{actor.name}</strong>
          </p>
          <p className={s.descr}>as {actor.character}</p>
        </li>
      ))}
    </ul>
  );
}
