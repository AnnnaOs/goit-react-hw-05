import { useSearchParams } from 'react-router-dom';
import { fetchSearchMovies } from '../../services/tmdb-api.js';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import MovieList from '../../components/MovieList/MovieList';
import SearchBar from '../../components/SearchBar/SearchBar';
import Loader from '../../components/Loader/Loader';
import css from './MoviesPage.module.css';

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') ?? '';

  useEffect(() => {
    if (!query) return;

    const fetchMovies = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const data = await fetchSearchMovies(query);
        setMovies(data);

        if (data.length === 0) {
          toast('Sorry, we have not found the films for your request.');
        }
      } catch {
        setError('Something went wrong... Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchMovies();
  }, [query]);

  const searchMovie = query => {
    setSearchParams(query ? { query } : {});
  };

  const getMovies = newQuery => {
    if (newQuery === query) return;
    searchMovie(newQuery);
    setMovies([]);
  };

  return (
    <main className={css.main}>
      <section className={css.moviesPage}>
        <SearchBar onChange={getMovies} />
        {error && <p className={css.error}>{error}</p>}
        {isLoading && <Loader />}
        <div className={css.container}>
          {!isLoading && movies.length === 0 && query && (
            <p className={css.moviesPageInfo}>
              No movies found for your request.
            </p>
          )}
          {movies && !isLoading && <MovieList movies={movies} />}
        </div>
      </section>
    </main>
  );
};

export default MoviesPage;
