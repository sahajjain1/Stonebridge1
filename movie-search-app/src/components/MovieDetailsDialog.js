import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

const DialogOverlay = styled.dialog`
  border: none;
  border-radius: 4px;
  padding: 2rem;
  width: 50%;
  max-width: 600px;
  &::backdrop {
    background-color: black;
    opacity: 0.7;
  }
`;

const DialogTitle = styled.h2`
  margin-bottom: 1rem;
  font-size: 1.5rem;
  font-weight: bold;
`;

const DialogBody = styled.div`
  color: #666;
  margin-bottom: 1rem;
`;

const CloseButton = styled.button`
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const MovieDetailsDialog = ({ movie, onClose }) => {
  const dialogRef = useRef(null);
  console.log(movie,'movie')

  useEffect(() => {
    if (dialogRef.current) {
      dialogRef.current.showModal();
    }
  }, []);

  return (
    <DialogOverlay ref={dialogRef} onClose={onClose}>
      <DialogTitle>{movie.Title}</DialogTitle>
      <DialogBody>
        <p><strong>Plot:</strong> {movie.Plot}</p>
        <p><strong>Year:</strong> {movie.Year}</p>
        <p><strong>Genre:</strong> {movie.Genre}</p>
        <p><strong>Director:</strong> {movie.Director}</p>
        <p><strong>Actors:</strong> {movie.Actors}</p>
      </DialogBody>
      <CloseButton onClick={onClose}>Close</CloseButton>
    </DialogOverlay>
  );
};

export default MovieDetailsDialog;
