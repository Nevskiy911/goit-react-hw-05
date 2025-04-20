import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { searchMovies } from "../api/tmbdApi";
import MovieList from "../components/MovieList/MovieList";

const MoviesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState(searchParams.get("query") || "");

  useEffect(() => {
    const fetch = async () => {
      if (!query) return;

      try {
        const results = await searchMovies(query);
        setMovies(results);
      } catch (error) {
        console.error("Error searching movies:", error);
      }
    };

    fetch();
  }, [query]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const value = e.target.elements.search.value.trim();
    if (!value) return;

    setQuery(value);
    setSearchParams({ query: value });
  };

  return (
    <main>
      <h1>Search movies</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="search"
          placeholder="Search..."
          defaultValue={query}
        />
        <button type="submit">Search</button>
      </form>

      {movies.length > 0 && <MovieList movies={movies} />}
      {query && movies.length === 0 && <p>No results found for "{query}"</p>}
    </main>
  );
};

export default MoviesPage;
