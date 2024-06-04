import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { removeFavoriteAction } from '../redux/actions';

const Panel = styled.div`
  position: fixed;
  right: 0;
  top: 0;
  height: 100%;
  width: 300px;
  background-color: white;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
  transform: ${props => (props.isOpen ? 'translateX(0)' : 'translateX(100%)')};
  transition: transform 0.3s ease-in-out;
  overflow-y: auto;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  padding: 1rem;
`;

const CloseButton = styled.button`
  align-self: flex-end;
  background-color: transparent;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
`;

const PanelToggle = styled.button`
  position: absolute;
  right: 100px;
  top: 15px;
  padding: 0.5rem 1rem;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const FavoriteItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ddd;
  padding: 0.5rem 0;
`;

const RemoveButton = styled.button`
  background-color: #e74c3c;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.3rem 0.5rem;
  cursor: pointer;
`;

const FavoritesPanel = ({ favorites }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  const handleRemoveFavorite = useCallback((movie) => {
    dispatch(removeFavoriteAction(movie));
  },[dispatch]);

  return (
    <>
      <PanelToggle isOpen={isOpen} onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? 'Close' : 'Favorites'}
      </PanelToggle>
      <Panel isOpen={isOpen}>
        <h2>Favorites</h2>
        <CloseButton onClick={() => setIsOpen(false)}>X</CloseButton>
        {favorites.map(movie => (
          <FavoriteItem key={movie.imdbID}>
            <div>
              <h3>{movie.Title}</h3>
              <p>{movie.Year}</p>
            </div>
            <RemoveButton onClick={() => handleRemoveFavorite(movie)}>Remove</RemoveButton>
          </FavoriteItem>
        ))}
      </Panel>
    </>
  );
};

export default FavoritesPanel;
