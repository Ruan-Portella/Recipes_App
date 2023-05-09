import { useContext, useEffect, useState } from 'react';
import RecipeDetailsContext from '../context/RecipeDetailsContext';

function RecipeDetails() {
  const { recipeDetails, pathname } = useContext(RecipeDetailsContext);
  const [alcoholic, setAlcoholic] = useState(false);
  const limitIngredients = 20;
  let ingredients = [];
  let name = 'Meal';

  for (let index = 1; index <= limitIngredients; index += 1) {
    const ingredient = recipeDetails[`strIngredient${index}`];
    const measure = recipeDetails[`strMeasure${index}`];

    if (ingredient) {
      ingredients = [...ingredients, { ingredient, measure }];
    }
  }

  useEffect(() => {
    if (pathname.includes('/drinks')) {
      setAlcoholic(true);
    }
  }, [pathname]);

  if (pathname.includes('/drinks')) {
    name = 'Drink';
  }

  return (
    <section>
      <img
        data-testid="recipe-photo"
        src={ recipeDetails[`str${name}Thumb`] }
        alt="Recipe"
      />
      <h1 data-testid="recipe-title">{recipeDetails[`str${name}`]}</h1>
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
      {
        !alcoholic && <iframe
          data-testid="video"
          width="420"
          height="315"
          src={ `${recipeDetails.strYoutube}` }
          title="video"
        />
      }
    </section>
  );
}

export default RecipeDetails;
