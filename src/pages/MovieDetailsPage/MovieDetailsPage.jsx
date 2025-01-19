import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useParams,
} from 'react-router-dom';
import { fetchMovieDetails } from '../../services/tmdb-api.js';
import { useEffect, useState } from 'react';
import { GoArrowLeft } from 'react-icons/go';
import Loader from '../../components/Loader/Loader.jsx';
import notFoundImg from '../../assets/image-not-found.jpg';
import clsx from 'clsx';
import css from './MovieDetailsPage.module.css';

const buildLinkClass = ({ isActive }) => {
  return clsx(css.backBtn, isActive && css.active);
};

const MovieDetailsPage = () => {
  const [movie, setMovie] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { movieId } = useParams();
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await fetchMovieDetails(movieId);
        setMovie(data);
      } catch {
        setError('Something went wrong... Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [movieId]);

  const userScore = movie?.vote_average
    ? (Number(movie.vote_average) * 10).toFixed(0)
    : null;

  return (
    <main className={css.main}>
      <section className={css.movieDetailsSection}>
        <div className={css.container}>
          {isLoading && <Loader />}
          {error && <p className={css.error}>{error}</p>}
          <Link to={location.state?.from ?? '/movies'} className={css.backLink}>
            <button className={css.backBtn} type="button">
              <GoArrowLeft size="20" /> Back
            </button>
          </Link>
          {movie && (
            <div className={css.movieDetails}>
              <div className={css.movieDetailsThumb}>
                <img
                  className={css.movieDetailsImg}
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                      : notFoundImg
                  }
                  alt={movie.original_title}
                  width="350"
                  height="500"
                />
                <div className={css.movieDetailsInfo}>
                  <h2 className={css.movieDetailsTitle}>
                    {movie.original_title}
                  </h2>
                  <p className={css.movieDetailsTagline}>{movie.tagline}</p>
                  <h3 className={css.movieDetailsSubtitle}>Overview</h3>
                  <p className={`${css.movieDetailsText} ${css.forLaptop}`}>
                    {movie.overview}
                  </p>
                  <h3 className={css.movieDetailsSubtitle}>Genres</h3>
                  <ul className={css.movieDetailsGenresList}>
                    {movie?.genres?.map(genre => (
                      <li className={css.movieDetailsText} key={genre.id}>
                        {genre.name}
                      </li>
                    ))}
                  </ul>
                  <p className={css.movieDetailsText}>
                    <span className={css.spanAccent}>Release date: </span>
                    {movie.release_date || 'N/A'}
                  </p>
                  {userScore && userScore !== '0' && (
                    <div className={css.movieDetailsScore}>
                      <p className={css.movieDetailsText}>
                        <span className={css.spanAccent}>User Score:</span>{' '}
                        {userScore}&#37;
                      </p>{' '}
                      <span
                        className={
                          userScore < 60 ? css.iconSpilled : css.iconUpright
                        }
                      ></span>
                    </div>
                  )}
                </div>
              </div>
              <nav className={css.movieDetailsAddInfo}>
                <NavLink
                  className={buildLinkClass}
                  to="cast"
                  state={location.state}
                >
                  Cast
                </NavLink>
                <NavLink
                  className={buildLinkClass}
                  to="reviews"
                  state={location.state}
                >
                  Reviews
                </NavLink>
              </nav>
              <Outlet />
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default MovieDetailsPage;
