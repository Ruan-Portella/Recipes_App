import { useContext } from 'react';
import RecipeInProgressContext from '../context/RecipeInProgressContext';

function RecipeInProgress() {
  const { recipeDetails, pathname } = useContext(RecipeInProgressContext);
  let mealOrDrink = 'Meal';
  let alcoholic = false;
  const limitIngredients = 20;
  let ingredients = [];
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
            <li
              data-testid={ `${index}-ingredient-name-and-measure` }
              key={ ingredient.ingredient }
            >
              <span>{ingredient.ingredient}</span>
              <span>{ingredient.measure}</span>
            </li>
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
