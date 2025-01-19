import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Loader from '../Loader/Loader';
import { fetchMovieReviews } from '../../services/tmdb-api';
import css from './MovieReviews.module.css';

const MovieReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { movieId } = useParams();

  useEffect(() => {
    if (!movieId) return;

    const loadReviews = async () => {
      try {
        setIsLoading(true);
        setReviews([]);
        setError(null);
        const data = await fetchMovieReviews(movieId);
        setReviews(data);
      } catch (error) {
        setError(
          error.message || 'Error fetching movie reviews... Please try later.'
        );
      } finally {
        setIsLoading(false);
      }
    };

    loadReviews();
  }, [movieId]);

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className={css.loading}>
          <Loader />
        </div>
      );
    }

    if (error) {
      return <p className={css.error}>{error}</p>;
    }

    if (!reviews.length) {
      return (
        <p className={css.reviewsNotFound}>
          We do not have any reviews for this movie yet.
        </p>
      );
    }

    return (
      <section className={css.reviews}>
        <div className={css.container}>
          <ul className={css.reviewsList}>
            {reviews.map(({ id, author, content }) => (
              <li key={id} className={css.reviewsItem}>
                <h3 className={css.reviewsItemTitle}>Author: {author}</h3>
                <p className={css.reviewsItemContent}>{content}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    );
  };

  return <div className={css.container}>{renderContent()}</div>;
};

export default MovieReviews;
