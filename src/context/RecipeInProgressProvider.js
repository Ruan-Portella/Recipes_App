import PropTypes from 'prop-types';
import { useCallback, useMemo, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import RecipeInProgressContext from './RecipeInProgressContext';

function RecipeInProgressProvider({ children }) {
  const { pathname } = useLocation();
  const [recipeDetails, setRecipeDetails] = useState([]);
  let idRecipe = '';

  if (pathname.includes('/in-progress')) {
    const idPattern = /\d{5,6}/g;
    [idRecipe] = pathname.match(idPattern);
  }

  const fetchDetails = useCallback(async (url) => {
    const response = await fetch(url);
    const dataDetails = await response.json();
    return setRecipeDetails(dataDetails[Object.keys(dataDetails)][0]);
  }, []);

  useEffect(() => {
    if (pathname.match(/^\/meals\/\d{4,6}\/in-progress$/)) {
      console.log('entrou');
      fetchDetails(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idRecipe}`);
    } else if (pathname.match(/^\/drinks\/\d{4,6}\/in-progress$/)) {
      fetchDetails(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idRecipe}`);
    }
  }, [fetchDetails, idRecipe, pathname]);

  const values = useMemo(() => ({
    pathname,
    recipeDetails,
  }), [pathname, recipeDetails]);

  return (
    <RecipeInProgressContext.Provider value={ values }>
      { children }
    </RecipeInProgressContext.Provider>
  );
}

RecipeInProgressProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RecipeInProgressProvider;
