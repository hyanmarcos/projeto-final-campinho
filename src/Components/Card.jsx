import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import "../styles/Card.css";

const Card = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = "https://ecom-back-strapi.onrender.com/api/movies";
  const TOKEN =
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzMzMjM3NjMzLCJleHAiOjE3MzU4Mjk2MzN9.9RAy5Y0N5i3RYzuNlV2g0LxtvQRUTFzRfaNsub9bj78";
  const SELECTED_IDS = [15, 16, 2, 3, 5, 6, 7, 8, 10, 12, 14, 11];

  const headers = {
    Authorization: TOKEN,
    "Content-Type": "application/json",
  };

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(API_URL, { headers });

      const filteredMovies = response.data.data
        .filter((movie) => SELECTED_IDS.includes(movie.id))
        .sort((a, b) => a.attributes.title.localeCompare(b.attributes.title));

      setMovies(filteredMovies);
    } catch (error) {
      setError(
        "Erro ao carregar os filmes. Por favor, tente novamente mais tarde."
      );
      console.error("Erro ao buscar dados:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const MovieCard = ({ movie }) => (
    <div className="card">
      <img
        src={movie.attributes.poster}
        alt={`Poster do filme ${movie.attributes.title}`}
        loading="lazy"
      />
      <h2>{movie.attributes.title}</h2>
      <p className="movie-description">{movie.attributes.description}</p>
      <div className="card-info">
        <p>
          <strong>Gênero:</strong> {movie.attributes.genre}
        </p>
        <p>
          <strong>Lançamento:</strong> {movie.attributes.releaseDate}
        </p>
        <p>
          <strong>Avaliação:</strong> {movie.attributes.rating} ⭐
        </p>
        <p>
          <strong>Direção:</strong> {movie.attributes.director}
        </p>
      </div>
    </div>
  );

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (isLoading) {
    return <div className="loading">Carregando filmes...</div>;
  }

  return (
    <div className="card-container">
      {movies.length > 0 ? (
        <div className="grid">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      ) : (
        <p className="no-movies">Nenhum filme encontrado.</p>
      )}
    </div>
  );
};

export default Card;
