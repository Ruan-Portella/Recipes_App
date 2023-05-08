import PropTypes from 'prop-types';
import { useCallback, useMemo } from 'react';
import SearchBarContext from './SearchBarContext';

function SearchBarProvider({ children }) {
  const fetchApi = useCallback(async (url) => {
    const response = await fetch(url);
    const dataApi = await response.json();
    return dataApi;
  }, []);

  const searchBtn = useCallback((inputValue, radioValue) => {
    switch (radioValue) {
    case 'Ingredient':
      fetchApi(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${inputValue}`);
      break;

    case 'Name':
      fetchApi(`https://www.themealdb.com/api/json/v1/1/search.php?s=${inputValue}`);
      break;

    default:
      if (inputValue.length > 1) {
        global.alert('Your search must have only 1 (one) character');
      }
      fetchApi(`https://www.themealdb.com/api/json/v1/1/search.php?f=${inputValue}`);
      break;
    }
  }, [fetchApi]);

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
