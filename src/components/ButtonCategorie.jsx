import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import SearchBarContext from '../context/SearchBarContext';

export default function ButtonCategorie({ name }) {
  const { fetchByCategory } = useContext(SearchBarContext);

  return (
    <button
      data-testid={ `${name}-category-filter` }
      onClick={ () => fetchByCategory(name) }
    >
      {name}
    </button>
  );
}

ButtonCategorie.propTypes = {
  name: PropTypes.string.isRequired,
};
