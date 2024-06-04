import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies, fetchMovieDetails } from "../api/movieApi";
import SearchBar from "../components/SearchBar";
import MovieCard from "../components/MovieCard";
import FavoritesPanel from "../components/FavoritesPanel";
import { addFavoriteAction, removeFavoriteAction } from "../redux/actions";
import { selectFavorites } from "../redux/favoritesReducer";
import MovieDetailsDialog from "../components/MovieDetailsDialog";
import styled from "styled-components";
import { useAuth } from "../hooks/useAuth";

const MoviesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 1rem;
  justify-content: center;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const LoadMoreButton = styled.button`
  margin: 2rem auto;
  padding: 0.5rem 1rem;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  display: block;
`;
const LogoutButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  padding: 0.5rem 1rem;
  background-color: #e74c3c;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;
const Title = styled.h1`
  text-align: center;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }

  @media (max-width: 480px) {
    font-size: 1.2rem;
  }
`;

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("Batman");
  const [page, setPage] = useState(1);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const favorites = useSelector(selectFavorites);
  const { logout } = useAuth();

  const loadMovies = async (searchQuery, pageNumber) => {
    setLoading(true);
    setError(null);
    const result = await fetchMovies(searchQuery, pageNumber);
    if (result.Error) {
      setError(result.Error);
    } else {
      setMovies((prevMovies) =>
        pageNumber === 1 ? result.Search : [...prevMovies, ...result.Search]
      );
    }
    setLoading(false);
  };

  useEffect(() => {
    loadMovies(query, page);
  }, [query, page]);

  const handleSearch = useCallback((searchQuery) => {
    setQuery(searchQuery);
    setPage(1);
    setMovies([]);
  }, []);

  const handleAddFavorite = useCallback(
    (movie) => {
      dispatch(addFavoriteAction(movie));
    },
    [dispatch]
  );

  const handleRemoveFavorite = useCallback(
    (movie) => {
      dispatch(removeFavoriteAction(movie));
    },
    [dispatch]
  );

  const handleMovieClick = async (movie) => {
    const details = await fetchMovieDetails(movie.Title);
    setSelectedMovie(details);
  };

  const handleLoadMore = useCallback(() => {
    setPage((prevPage) => prevPage + 1);
  }, []);

  return (
    <div className="container">
      <Title>Movies</Title>
      <LogoutButton onClick={logout}>Logout</LogoutButton>
      <SearchBar onSearch={handleSearch} />
      {error && <p>{error}</p>}
      <MoviesGrid>
        {movies.map((movie) => (
          <MovieCard
            key={movie.imdbID}
            movie={movie}
            onAddFavorite={handleAddFavorite}
            onRemoveFavorite={handleRemoveFavorite}
            isFavorite={favorites.some((fav) => fav.Title === movie.Title)}
            onMovieClick={handleMovieClick}
          />
        ))}
      </MoviesGrid>
      {loading && <p>Loading...</p>}
      {!loading && movies.length > 0 && (
        <LoadMoreButton onClick={handleLoadMore}>Load More</LoadMoreButton>
      )}
      <FavoritesPanel favorites={favorites} />
      {selectedMovie && (
        <MovieDetailsDialog
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}
    </div>
  );
};

export default HomePage;
