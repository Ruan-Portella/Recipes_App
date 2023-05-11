export const getEmail = () => {
  const email = localStorage.getItem('user');
  return email ? JSON.parse(email) : [];
};

export const saveEmail = (email) => {
  localStorage.setItem('user', JSON.stringify(email));
};

export const getRecipes = () => {
  const recipes = localStorage.getItem('favoriteRecipes');
  return recipes ? JSON.parse(recipes) : [];
};

export const saveRecipes = (recipe) => {
  const savedRecipes = getRecipes();
  const newSavedRecipes = [...savedRecipes, recipe];
  localStorage.setItem('favoriteRecipes', JSON.stringify(newSavedRecipes));
};

export const removeRecipes = (id) => {
  const savedRecipes = getRecipes();
  const newSavedRecipes = savedRecipes.filter((recipe) => recipe.id !== id);
  localStorage.setItem('favoriteRecipes', JSON.stringify(newSavedRecipes));
};

export const getRecipeInProgress = () => {
  const setLocal = {
    drinks: {},
    meals: {},
  };
  const recipes = localStorage.getItem('inProgressRecipes');
  return recipes ? JSON.parse(recipes) : [];
};

export const saveRecipeInProgress = (selectedItems, mealOrDrink, id) => {
  console.log('entrou no save');
  const savedRecipes = getRecipeInProgress();
  if (mealOrDrink === 'Meal') {
    const setLocal = {
      drinks: {
        ...savedRecipes.drinks
      },
      meals: {
        ...savedRecipes.meals,
        [id]: selectedItems
      },
    };
    return localStorage.setItem('inProgressRecipes', JSON.stringify(setLocal));
  }
  const setLocal = {
    drinks: {
      ...savedRecipes.drinks,
      [id]: selectedItems,
    },
    meals: {
      ...savedRecipes.meals,
    },
  };
  return localStorage.setItem('inProgressRecipes', JSON.stringify(setLocal));
};
