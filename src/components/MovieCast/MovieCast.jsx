import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loader from '../Loader/Loader';
import { fetchMovieCast } from '../../services/tmdb-api';
import notFoundImg from '../../assets/image-not-found.jpg';
import css from './MovieCast.module.css';

const MovieCast = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!movieId) return;

    const fetchCredits = async () => {
      try {
        setIsLoading(true);
        const data = await fetchMovieCast(movieId);
        setCast(data);
        setIsLoading(false);
      } catch {
        setError('No cast information available.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchCredits();
    // setCast([]);
  }, [movieId]);

  return (
    <section className={css.cast}>
      <div className={css.container}>
        {isLoading && <Loader />}
        {error && <p>{error}</p>}
        {cast.length > 0 && !isLoading && (
          <ul className={css.castList}>
            {cast.map(actor => (
              <li key={actor.id} className={css.castItem}>
                <img
                  src={
                    actor.profile_path
                      ? `https://image.tmdb.org/t/p/w500${actor.profile_path}`
                      : notFoundImg
                  }
                  alt={actor.name}
                  className={css.castImg}
                />
                <h3 className={css.castItemTitle}>{actor.name}</h3>
                <p className={css.castItemCharacter}>{actor.character}</p>
              </li>
            ))}
            : (<p className={css.castInfo}>No cast information available.</p>)
          </ul>
        )}
      </div>
    </section>
  );
};

export default MovieCast;
