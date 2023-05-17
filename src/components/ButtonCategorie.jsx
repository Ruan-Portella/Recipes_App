import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import SearchBarContext from '../context/SearchBarContext';
import category0 from '../images/beef.svg';
import category3 from '../images/dessert.svg';
import category2 from '../images/chicken.svg';
import category4 from '../images/goat.svg';
import category1 from '../images/breakfast.svg';
import drink0 from '../images/ordinary.svg';
import drink1 from '../images/cocktail.svg';
import drink2 from '../images/shake.svg';
import drink3 from '../images/beer.svg';
import drink4 from '../images/cocoa.svg';

export default function ButtonCategorie({ name, icon, path }) {
  const { fetchByCategory, searchBtn } = useContext(SearchBarContext);
  const [buttonSelected, setButtonSelected] = useState(false);
  const icons = [category0, category1, category2, category3, category4];
  const iconsDrink = [drink0, drink1, drink2, drink3, drink4];

  return (
    <div className="content-categories">
      <button
        data-testid={ `${name}-category-filter` }
        onClick={ () => (
          buttonSelected ? (searchBtn('', 'Name'), setButtonSelected(!buttonSelected))
            : (fetchByCategory(name), setButtonSelected(!buttonSelected))) }
      >
        <img src={ path === 'meals' ? icons[icon] : iconsDrink[icon] } alt={ name } />
      </button>
      <span>{name}</span>
    </div>
  );
}

ButtonCategorie.propTypes = {
  icon: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
};
