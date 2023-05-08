import React from 'react';
import PropTypes from 'prop-types';

function CardRecipe({ name, img, index }) {
  return (
    <li data-testid={ `${index}-recipe-card` }>
      <img data-testid={ `${index}-card-img` } src={ img } alt={ name } />
      <p data-testid={ `${index}-card-name` }>{name}</p>
    </li>
  );
}

CardRecipe.propTypes = {
  name: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

export default CardRecipe;
