import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import SearchBarContext from '../context/SearchBarContext';

export default function ButtonCategorie({ name }) {
  const { fetchByCategory, searchBtn } = useContext(SearchBarContext);
  const [buttonSelected, setButtonSelected] = useState(false);

  return (
    <button
      data-testid={ `${name}-category-filter` }
      onClick={ () => (
        buttonSelected ? (searchBtn('', 'Name'), setButtonSelected(!buttonSelected))
          : (fetchByCategory(name), setButtonSelected(!buttonSelected))) }
    >
      {name}
    </button>
  );
}

ButtonCategorie.propTypes = {
  name: PropTypes.string.isRequired,
};
