import { useContext, useEffect, useState } from 'react';
import RecipeInProgressContext from '../context/RecipeInProgressContext';
import { saveRecipeInProgress, getRecipeInProgress } from '../helpers/localStorage';

function RecipeInProgress() {
  const { recipeDetails, pathname } = useContext(RecipeInProgressContext);
  let mealOrDrink = 'Meal';
  let alcoholic = false;
  let pathMealOrDrink = 'meals';
  const limitIngredients = 20;
  let ingredients = [];
  const [selectedItems, setSelectedItems] = useState([]);
  const idPattern = /\d{5,6}/g;
  const [idRecipe] = pathname.match(idPattern);

  if (pathname.includes('/drinks/')) {
    alcoholic = true;
    mealOrDrink = 'Drink';
    pathMealOrDrink = 'drinks';
  }
  
  useEffect(() => {
    const itensLocalStorage = getRecipeInProgress();
    if (itensLocalStorage.drinks || itensLocalStorage.meals) {
      setSelectedItems(itensLocalStorage[pathMealOrDrink][idRecipe]);
    }
  }, []);

  useEffect(() => {
    saveRecipeInProgress(selectedItems, mealOrDrink, idRecipe);
  }, [selectedItems]);

  for (let index = 1; index <= limitIngredients; index += 1) {
    const ingredient = recipeDetails[`strIngredient${index}`];
    const measure = recipeDetails[`strMeasure${index}`];

    if (ingredient) {
      ingredients = [...ingredients, { ingredient, measure }];
    }
  }

  const handleCheckboxChange = ({ target }) => {
    const { name, id } = target;
    const isChecked = target.checked;
    setSelectedItems((prevSelectedItems) => {
      if (isChecked) {
        return [...prevSelectedItems, name];
      }
      return prevSelectedItems.filter((item) => item !== name);
    });
  };

  return (
    <>
      <img
        data-testid="recipe-photo"
        src={ recipeDetails[`str${mealOrDrink}Thumb`] }
        alt="Recipe"
      />
      <button data-testid="share-btn">Compartilhar</button>
      <button data-testid="favorite-btn">Favoritar</button>
      <h1 data-testid="recipe-title">{recipeDetails[`str${mealOrDrink}`]}</h1>
      <p data-testid="recipe-category">{recipeDetails.strCategory}</p>
      {
        alcoholic && <p data-testid="recipe-category">{recipeDetails.strAlcoholic}</p>
      }
      <ul>
        {
          ingredients.map((ingredient, index) => (
            <label
              data-testid={ `${index}-ingredient-step` }
              key={ ingredient.ingredient }
              className={ selectedItems.includes(ingredient.ingredient)
                ? 'marked' : 'not-marked' }
            >
              <li
                data-testid={ `${index}-ingredient-name-and-measure` }
              >
                <input
                  type="checkbox"
                  id={recipeDetails[`id${mealOrDrink}`]}
                  name={ ingredient.ingredient }
                  checked={ selectedItems.includes(ingredient.ingredient) }
                  onChange={ (event) => handleCheckboxChange(event) }
                />
                <span>
                  {ingredient.ingredient}
                </span>
                <span>
                  {ingredient.measure}
                </span>
              </li>

            </label>
          ))
        }
      </ul>
      <span data-testid="instructions">{recipeDetails.strInstructions}</span>
      <button
        data-testid="finish-recipe-btn"
      >
        Finish Recipe
      </button>
    </>
  );
}

export default RecipeInProgress;
