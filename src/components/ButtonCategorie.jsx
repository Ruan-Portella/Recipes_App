import React from 'react';
import PropTypes from 'prop-types';

export default function ButtonCategorie({ name }) {
  return (
    <button data-testid={ `${name}-category-filter` }>{name}</button>
  );
}

ButtonCategorie.propTypes = {
  name: PropTypes.string.isRequired,
};
