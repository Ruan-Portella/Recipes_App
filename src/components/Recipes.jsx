import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function Recipes({ name, img, index, path, id }) {
  return (
    <Link to={ `${path}${id}` }>
      <li data-testid={ `${index}-recipe-card` }>
        <img data-testid={ `${index}-card-img` } src={ img } alt={ name } />
        <p data-testid={ `${index}-card-name` }>{name}</p>
      </li>
    </Link>
  );
}

Recipes.propTypes = {
  name: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  path: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default Recipes;
