import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieCredits } from "../../api/tmbdApi";

export default function MovieCast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  useEffect(() => {
    fetchMovieCredits(movieId).then(setCast).catch(console.error);
  }, [movieId]);

  return (
    <ul style={{ listStyle: "none", padding: 0 }}>
      {cast.map((actor) => (
        <li key={actor.id} style={{ marginBottom: "20px" }}>
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
          <p>
            <strong>{actor.name}</strong>
          </p>
          <p>as {actor.character}</p>
        </li>
      ))}
    </ul>
  );
}
