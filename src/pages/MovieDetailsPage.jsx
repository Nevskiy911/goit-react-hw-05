import { useParams, Link, Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchMovieDetails } from "../api/tmbdApi";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const location = useLocation();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const getMovie = async () => {
      try {
        const data = await fetchMovieDetails(movieId);
        setMovie(data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    getMovie();
  }, [movieId]);

  if (!movie) return <p>Loading...</p>;

  const { title, poster_path, vote_average, overview, genres } = movie;

  const posterUrl = poster_path
    ? `https://image.tmdb.org/t/p/w300${poster_path}`
    : "https://via.placeholder.com/300x450?text=No+Image";

  return (
    <div style={{ padding: "1rem" }}>
      <Link to={location.state?.from ?? "/"}>← Go back</Link>

      <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
        <img src={posterUrl} alt={title} width="300" />

        <div>
          <h1>{title}</h1>
          <p>
            <strong>User Score:</strong> {Math.round(vote_average * 10)}%
          </p>
          <h2>Overview</h2>
          <p>{overview}</p>
          <h3>Genres</h3>
          <p>{genres.map((g) => g.name).join(", ")}</p>
        </div>
      </div>

      <hr style={{ margin: "2rem 0" }} />

      <h3>Additional information</h3>
      <ul>
        <li>
          <Link to="cast" state={{ from: location.state?.from }}>
            Cast
          </Link>
        </li>
        <li>
          <Link to="reviews" state={{ from: location.state?.from }}>
            Reviews
          </Link>
        </li>
      </ul>

      <Outlet />
    </div>
  );
};

export default MovieDetailsPage;
