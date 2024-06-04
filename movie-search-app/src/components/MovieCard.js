import React, { useState } from 'react';
import styled from 'styled-components';

const Card = styled.div`
  border: 6px solid #ddd;
  border-radius: 4px;
  overflow: hidden;
  position: relative;
  cursor: pointer;
  width: 325px;
  margin: 0 auto;
`;

const Poster = styled.img`
  width: 100%;
  height: 300px;
`;

const Info = styled.div`
  padding: 0.5rem;
`;

const Title = styled.h3`
  margin: 0;
  font-size: 1rem;
`;

const Button = styled.button`
  margin-top: 0.5rem;
  padding: 0.3rem 0.5rem;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
`;

const MovieCard = ({ movie, onAddFavorite, onRemoveFavorite, isFavorite, onMovieClick }) => {
  const [imgSrc, setImgSrc] = useState(movie.Poster);

  const handleError = () => {
    setImgSrc(`${process.env.PUBLIC_URL}/noImg.jpg`);
  };

  return (
    <Card onClick={() => onMovieClick(movie)}>
      <Poster src={imgSrc} alt={movie.Title} onError={handleError} />
      <Info>
        <Title>{movie.Title}</Title>
        {isFavorite ? (
          <Button onClick={(e) => { e.stopPropagation(); onRemoveFavorite(movie); }}>Remove Favorite</Button>
        ) : (
          <Button onClick={(e) => { e.stopPropagation(); onAddFavorite(movie); }}>Add Favorite</Button>
        )}
      </Info>
    </Card>
  );
};

export default MovieCard;
