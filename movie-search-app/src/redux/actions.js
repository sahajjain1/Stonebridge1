export const ADD_FAVORITE = 'ADD_FAVORITE';
export const REMOVE_FAVORITE = 'REMOVE_FAVORITE';

export const addFavoriteAction = (movie) => ({
  type: ADD_FAVORITE,
  payload: movie,
});

export const removeFavoriteAction = (movie) => ({
  type: REMOVE_FAVORITE,
  payload: movie,
});