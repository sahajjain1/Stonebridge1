const API_KEY = 'e02349ed';
const BASE_URL = 'http://www.omdbapi.com/';

/// genrally we will get from env fi;e but we dont have backend so did this
const handleError = (error) => {
  console.error('Error fetching data:', error);
};

export const fetchMovies = async (query, page = 1) => {
  try {
    console.log(query,page,'ok')
    const response = await fetch(`${BASE_URL}?apikey=${API_KEY}&s=${query}&page=${page}`);
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    const data = await response.json();
    if (data.Error) {
      throw new Error(data.Error);
    }
    return data;
  } catch (error) {
    handleError(error);
    return { Error: 'Failed to fetch movies' };
  }
};

export const fetchMovieDetails = async (title) => {
  try {
    const response = await fetch(`${BASE_URL}?apikey=${API_KEY}&t=${title}`);
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    const data = await response.json();
    if (data.Error) {
      throw new Error(data.Error);
    }
    return data;
  } catch (error) {
    handleError(error);
    return { Error: 'Failed to fetch movie details' }; 
  }
};
