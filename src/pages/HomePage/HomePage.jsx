import { useState, useEffect } from 'react';
import { fetchTrendingMovies } from '../../services/tmdb-api.js';
import Loader from '../../components/Loader/Loader';
import MovieList from '../../components/MovieList/MovieList';
import css from './HomePage.module.css';

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getTrendingMovies = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await fetchTrendingMovies();
        setMovies(data);
      } catch {
        setError('Something went wrong... Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };
    getTrendingMovies();
  }, []);

  return (
    <main className={css.main}>
      <section className={css.homePage}>
        <div className={css.container}>
          <h1 className={css.homePageTitle}>Trending today</h1>
          {isLoading && <Loader />}
          {error && <p className={css.errorMessage}>{error}</p>}
          {!isLoading && movies.length === 0 && !error && (
            <p className={css.homePageInfo}>No trending movies found today.</p>
          )}
          {!error && !isLoading && <MovieList movies={movies} />}
        </div>
      </section>
    </main>
  );
};

export default HomePage;
