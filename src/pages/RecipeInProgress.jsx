import { useContext, useState } from 'react';
import RecipeInProgressContext from '../context/RecipeInProgressContext';
import { saveRecipeInProgress } from '../helpers/localStorage';

function RecipeInProgress() {
  const { recipeDetails, pathname } = useContext(RecipeInProgressContext);
  let mealOrDrink = 'Meal';
  let alcoholic = false;
  const limitIngredients = 20;
  let ingredients = [];
  const [selectedItems, setSelectedItems] = useState([]);

  if (pathname.includes('/drinks/')) {
    alcoholic = true;
    mealOrDrink = 'Drink';
  }

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
    if (mealOrDrink === 'Meal') {
      saveRecipeInProgress({meals: {[id]: [name]}}, mealOrDrink)
    }
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
