import axios from 'axios';

axios.defaults.baseURL = 'https://api.themoviedb.org/3';

const API_TOKEN =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NzkzNDE1MDYxZmE3MjgwNDg3ZTJhY2I2MzA4YWM1YyIsIm5iZiI6MTczNTc2MTU2OC45NzYsInN1YiI6IjY3NzU5ZWEwYmYxMGZmMTk4NDYyNDUxYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ZZz4Vehflnu5lKl70n6ZQf_ZDWY5mJiVsDKgdyWKUNY';

export const fetchTrendingMovies = async () => {
  const { data } = await axios.get('/trending/movie/day', {
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
    },
  });
  return data.results;
};

export const fetchSearchMovies = async query => {
  const { data } = await axios.get('/search/movie', {
    params: {
      query,
    },
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
    },
  });
  return data.results;
};

export const fetchMovieDetails = async movieId => {
  const { data } = await axios.get(`/movie/${movieId}`, {
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
    },
  });
  return data;
};

export const fetchMovieCast = async movieId => {
  const { data } = await axios.get(`/movie/${movieId}/credits`, {
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
    },
  });
  return data.cast;
};

export const fetchMovieReviews = async movieId => {
  const { data } = await axios.get(`/movie/${movieId}/reviews`, {
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
    },
  });
  return data.results;
};
