/* eslint-disable no-magic-numbers */
import PropTypes from 'prop-types';
import { useCallback, useMemo, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
import SearchBarContext from './SearchBarContext';

function SearchBarProvider({ children }) {
  const { pathname } = useLocation();
  const [recipesData, setRecipesData] = useState([]);
  const [categoriesData, setCategoriesData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const limitSearch = 12;
  const limitCategory = 5;

  const fetchApi = useCallback(async (url) => {
    setIsLoading(true);
    const response = await fetch(url);
    const dataApi = await response.json();
    if (!dataApi[Object.keys(dataApi)] || dataApi[Object.keys(dataApi)] === null) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
      // setIsLoading(false);
    } else if (dataApi[Object.keys(dataApi)].length <= 1) {
      let id = 'idDrink';
      if (pathname === '/meals') {
        id = 'idMeal';
      }
      history.push(`${pathname}/${(dataApi[Object.keys(dataApi)])[0][id]}`);
      // setIsLoading(false);
      // window.location.href = `${pathname}/${(dataApi[Object.keys(dataApi)])[0][id]}`;
    } else {
      setRecipesData((dataApi[Object.keys(dataApi)]).slice(0, limitSearch));
    }
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, [pathname, history]);

  const fetchCategory = useCallback(async (url) => {
    setIsLoading(true);
    const response = await fetch(url);
    const dataCategory = await response.json();
    setCategoriesData(
      (dataCategory[Object.keys(dataCategory)]).slice(0, limitCategory),
    );
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  const fetchByCategory = useCallback(async (category) => {
    setIsLoading(true);
    let URL = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;
    if (pathname === '/drinks') {
      URL = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`;
    }
    const response = await fetch(URL);
    const dataCategory = await response.json();
    setRecipesData(
      (dataCategory[Object.keys(dataCategory)]).slice(0, limitSearch),
    );
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, [pathname]);

  useEffect(() => {
    if (pathname === '/meals') {
      fetchCategory('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
      fetchApi('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    } else {
      fetchCategory('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
      fetchApi('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    }
  }, [fetchApi, fetchCategory, pathname]);

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
    isLoading,
    recipesData,
    categoriesData,
    fetchByCategory,
  }), [searchBtn, recipesData, categoriesData, fetchByCategory, isLoading]);
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
