import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchMovieReviews } from "../../api/tmbdApi";

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getReviews = async () => {
      try {
        const data = await fetchMovieReviews(movieId);
        setReviews(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load reviews.");
      }
    };

    getReviews();
  }, [movieId]);

  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Reviews</h2>
      {reviews.length === 0 ? (
        <p>We haven't any reviews for this movie.</p>
      ) : (
        <ul>
          {reviews.map(({ id, author, content }) => (
            <li key={id} style={{ marginBottom: "1rem" }}>
              <h4>Author: {author}</h4>
              <p>{content}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MovieReviews;
