import PropTypes from 'prop-types';
import notFoundImg from '../../assets/image-not-found.jpg';
import css from './MovieItem.module.css';

const MovieItem = ({
  dataFilm: { poster_path, title, release_date, vote_average },
}) => {
  const urlImg = `https://image.tmdb.org/t/p/w500/${poster_path}`;
  const voteAverage = Number(vote_average).toFixed(2);
  return (
    <div>
      <img
        className={css.movieImg}
        src={poster_path ? urlImg : notFoundImg}
        alt={title}
        width="360"
        height="300"
      />
      <div className={css.trendingThumb}>
        <h3 className={css.trendingTitle}>{title}</h3>
        <p className={css.trendingText}>Release date: {release_date}</p>
        {voteAverage !== '0.00' && (
          <p className={css.trendingText}>Rating: {voteAverage}</p>
        )}
      </div>
    </div>
  );
};

MovieItem.propTypes = {
  title: PropTypes.string,
  poster_path: PropTypes.string,
  vote_average: PropTypes.number,
  release_date: PropTypes.string,
};

export default MovieItem;
