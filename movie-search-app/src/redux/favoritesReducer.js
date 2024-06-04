import { ADD_FAVORITE, REMOVE_FAVORITE } from './actions';

const initialState = [];

const favoritesReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_FAVORITE:
      return [...state, action.payload];
    case REMOVE_FAVORITE:
      return state.filter(movie => movie.imdbID !== action.payload.imdbID);
    default:
      return state;
  }
};

export default favoritesReducer;
export const selectFavorites = state => state.favorites;