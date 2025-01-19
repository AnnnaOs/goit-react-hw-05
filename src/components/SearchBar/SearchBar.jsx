import { Field, Form, Formik } from 'formik';
import toast from 'react-hot-toast';
import css from './SearchBar.module.css';

const SearchBar = ({ onChange }) => {
  const handleSubmit = (values, actions) => {
    const formattedSearch = values.search.trim().toLowerCase();
    if (!values.search.trim()) {
      toast.error('The search field cannot be empty!');
      return;
    }
    onChange(formattedSearch);
    actions.resetForm();
  };
  return (
    <div className={css.searchThumb}>
      <Formik initialValues={{ search: '' }} onSubmit={handleSubmit}>
        <Form>
          <Field
            className={css.inputSearch}
            type="text"
            name="search"
            autoComplete="off"
            autoFocus
            placeholder="Search films"
          />
          <button className={css.btnSearch} type="submit">
            Search
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default SearchBar;
