import PropTypes from 'prop-types';
import { useState } from 'react';
import toast from 'react-hot-toast';
import css from './SearchBar.module.css';

const SearchBar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = ev => {
    ev.preventDefault();

    if (query.trim() === '') {
      toast('Please enter a search term', {
        duration: 3000,
      });
      return;
    }
    onSubmit(query.trim());
    setQuery('');
  };

  return (
    <header className={css.searchBar}>
      <form onSubmit={handleSubmit} className={css.searchBarForm}>
        <input
          type="text"
          name="query"
          value={query}
          onChange={e => setQuery(e.target.value.toLowerCase())}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          className={css.searchBarInput}
        />
        <button type="submit" className={css.searchBarBtn}>
          Search
        </button>
      </form>
    </header>
  );
};

SearchBar.propTypes = {
  onSubmit: PropTypes.func,
};

export default SearchBar;
