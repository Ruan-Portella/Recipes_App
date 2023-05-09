import PropTypes from 'prop-types';
import { useCallback, useMemo, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import RecipeDetailsContext from './RecipeDetailsContext';

function RecipeDetailsProvider({ children }) {
  const { pathname } = useLocation();
  const idRecipe = parseInt(pathname.split('/').pop());
  const [recipeDetails, setRecipeDetails] = useState();

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
  }, [fetchDetails, pathname]);

const values = useMemo(() => ({
  recipeDetails
}, [recipeDetails])

  return (
    <RecipeDetailsContext.Provider value={ values }>
      { children }
    </RecipeDetailsContext.Provider>
  );
}

export default RecipeDetailsProvider;
