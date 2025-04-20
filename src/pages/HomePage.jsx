import { useEffect, useState } from "react";
import { fetchTrendingMovies } from "../api/tmbdApi";
import { Link } from "react-router-dom";

export default function HomePage() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchTrendingMovies().then(setMovies).catch(console.error);
  }, []);

  return (
    <main>
      <h1>Trending Today</h1>
      <ul>
        {movies.map(({ id, title }) => (
          <li key={id}>
            <Link to={`/movies/${id}`}>{title}</Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
