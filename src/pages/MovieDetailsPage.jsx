import {
  useParams,
  useLocation,
  NavLink,
  Link,
  Outlet,
} from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { fetchMovieDetails } from "../api/tmbdApi";
import "../styles/NavLink.css";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);

  const location = useLocation();
  const backLinkRef = useRef(location.state?.from || "/movies");

  useEffect(() => {
    const getMovie = async () => {
      const data = await fetchMovieDetails(movieId);
      setMovie(data);
    };
    getMovie();
  }, [movieId]);

  if (!movie) return <div>Loading...</div>;

  return (
    <main>
      <Link to={backLinkRef.current} className="btn">
        ← Go back
      </Link>
      <section className="movie-wrapper">
        <div className="movie-poster">
          <h2>{movie.title}</h2>
          <img
            src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
            alt={movie.title}
          />
        </div>
        <div className="movie-descr">
          <p>
            <b>User Score:</b> {Math.round(movie.vote_average * 10)}%
          </p>
          <p>
            <b>Overview:</b> {movie.overview}
          </p>
          <p>
            <b>Genres:</b> {movie.genres.map((g) => g.name).join(", ")}
          </p>
        </div>
      </section>
      <hr />
      <h3>Additional Information</h3>
      <ul className="info-line">
        <li>
          <NavLink
            to="cast"
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            Cast
          </NavLink>
        </li>
        <li>
          <NavLink
            to="reviews"
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            Reviews
          </NavLink>
        </li>
      </ul>
      <hr />
      <Outlet />
    </main>
  );
};

export default MovieDetailsPage;
