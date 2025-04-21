import { useEffect, useState } from "react";
import { fetchTrendingMovies } from "../api/tmbdApi";
import MovieList from "../components/MovieList/MovieList";

const HomePage = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const results = await fetchTrendingMovies();
      setMovies(results);
    };

    fetchData();
  }, []);

  return (
    <main>
      <h1>Trending Today</h1>
      <MovieList movies={movies} />
    </main>
  );
};

export default HomePage;
