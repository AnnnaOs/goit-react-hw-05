import { Link } from 'react-router-dom';
import notFoundPage from '../../assets/not-found-page.jpg';
import css from './NotFoundPage.module.css';

const NotFoundPage = () => {
  return (
    <main className={css.main}>
      <section className={css.notFoundPage}>
        <div className={css.container}>
          <div className={css.notFoundPageContent}>
            <img
              src={notFoundPage}
              alt="Not found page"
              className={css.notFoundPageImg}
            />
            <div className={css.notFoundPageContentText}>
              <h1 className={css.notFoundPageTitle}>Page not found</h1>
              <p className={css.notFoundPageDescription}>
                This is not the page you are looking for.
              </p>
            </div>
            <Link to="/" className={css.backLink}>
              Back Home
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default NotFoundPage;
