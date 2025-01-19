import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import MovieItem from '../MovieItem/MovieItem';
import css from './MovieList.module.css';

const MovieList = ({ movies }) => {
  const location = useLocation();

  return (
    <div className={css.container}>
      <ul className={css.movieList}>
        {movies.map(movie => (
          <li key={movie.id} className={css.movieItem}>
            <Link to={`/movies/${movie.id}`} state={{ from: location }}>
              <MovieItem dataFilm={movie} />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

MovieList.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default MovieList;
