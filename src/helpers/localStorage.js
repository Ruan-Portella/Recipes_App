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
