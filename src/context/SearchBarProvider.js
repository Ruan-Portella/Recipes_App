import PropTypes from 'prop-types';
import { useCallback, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import SearchBarContext from './SearchBarContext';

function SearchBarProvider({ children }) {
  const { pathname } = useLocation();

  const fetchApi = useCallback(async (url) => {
    const response = await fetch(url);
    const dataApi = await response.json();
    return dataApi;
  }, []);

  const searchBtn = useCallback((inputValue, radioValue) => {
    let URL = 'thecocktaildb';
    if (pathname === '/meals') {
      URL = 'themealdb';
    }

    switch (radioValue) {
    case 'Ingredient':

      fetchApi(`https://www.${URL}.com/api/json/v1/1/filter.php?i=${inputValue}`);
      break;

    case 'Name':
      fetchApi(`https://www.${URL}.com/api/json/v1/1/search.php?s=${inputValue}`);
      break;

    default:
      if (inputValue.length > 1) {
        global.alert('Your search must have only 1 (one) character');
      }
      fetchApi(`https://www.${URL}.com/api/json/v1/1/search.php?f=${inputValue}`);
      break;
    }
  }, [fetchApi, pathname]);

  const values = useMemo(() => ({
    searchBtn,
  }), [searchBtn]);
  return (
    <SearchBarContext.Provider value={ values }>
      {children}
    </SearchBarContext.Provider>
  );
}

SearchBarProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SearchBarProvider;
