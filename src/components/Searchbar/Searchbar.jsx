import { useState } from 'react';
import PropTypes from 'prop-types';
import toast from 'react-hot-toast';
import { ImSearch } from 'react-icons/im';
import {
  SearchbarHeader,
  SearchForm,
  SearchFormButton,
  SearchFormButtonLabel,
  SearchFormInput,
} from './Searchbar.styled';

export const Searchbar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const handleInputChange = e => {
    setQuery(e.currentTarget.value.toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (query.trim() === '') {
      return toast.error('Please enter query.', {
        duration: 2000,
        position: 'top-right',
      });
    }
    onSubmit(query);
    setQuery('');
  };

  return (
    <>
      <SearchbarHeader>
        <SearchForm onSubmit={handleSubmit}>
          <SearchFormButton type="submit">
            <SearchFormButtonLabel>
              <ImSearch />
            </SearchFormButtonLabel>
          </SearchFormButton>
          <SearchFormInput
            type="text"
            name="searchWord"
            value={query}
            onChange={handleInputChange}
            autocomplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </SearchForm>
      </SearchbarHeader>
    </>
  );
};

Searchbar.propTypes = {
  query: PropTypes.string,
};
