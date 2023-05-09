import PropTypes from 'prop-types';
import { useCallback, useMemo, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import RecipeDetailsContext from './RecipeDetailsContext';

function RecipeDetailsProvider({ children }) {
  const { pathname } = useLocation();
  const [recipeDetails, setRecipeDetails] = useState([]);
  const [recipeRecommend, setRecipeRecommend] = useState([]);
  const idRecipe = parseInt(pathname.split('/').pop(), 10);
  const limitDataRecomend = 6;

  const fetchRecommend = useCallback(async (url) => {
    const responseDetails = await fetch(url);
    const dataRecommend = await responseDetails.json();
    return (
      setRecipeRecommend(
        (dataRecommend[Object.keys(dataRecommend)]).slice(0, limitDataRecomend),
      ));
  }, []);

  const fetchDetails = useCallback(async (url) => {
    const response = await fetch(url);
    const dataDetails = await response.json();
    return setRecipeDetails(dataDetails[Object.keys(dataDetails)][0]);
  }, []);

  useEffect(() => {
    console.log('entrou');
    if (pathname.includes('in-progress')) {
      return () => {};
    } if (pathname.includes('/meals')) {
      fetchDetails(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idRecipe}`);
      fetchRecommend('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    } else {
      fetchDetails(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idRecipe}`);
      fetchRecommend('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    }
  }, [fetchDetails, idRecipe, pathname, fetchRecommend]);

  const values = useMemo(() => ({
    recipeDetails,
    pathname,
    recipeRecommend,
  }), [recipeDetails, pathname, recipeRecommend]);

  return (
    <RecipeDetailsContext.Provider value={ values }>
      { children }
    </RecipeDetailsContext.Provider>
  );
}

RecipeDetailsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RecipeDetailsProvider;
