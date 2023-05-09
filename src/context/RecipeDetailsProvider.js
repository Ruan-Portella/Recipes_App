import PropTypes from 'prop-types';
import { useCallback, useMemo, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import RecipeDetailsContext from './RecipeDetailsContext';

function RecipeDetailsProvider({ children }) {
  const { pathname } = useLocation();
  const [recipeDetails, setRecipeDetails] = useState();
  const idRecipe = parseInt(pathname.split('/').pop(), 10);

  const fetchDetails = useCallback(async (url) => {
    const response = await fetch(url);
    const dataDetails = await response.json();
    return setRecipeDetails(dataDetails);
  }, []);

  useEffect(() => {
    if (pathname.includes('/meals')) {
      fetchDetails(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idRecipe}`);
    } else {
      fetchDetails(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idRecipe}`);
    }
  }, [fetchDetails, idRecipe, pathname]);

  const values = useMemo(() => ({
    recipeDetails,
  }), [recipeDetails]);

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
