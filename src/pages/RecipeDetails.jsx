import { useContext, useEffect, useState } from 'react';
import Slider from 'react-slick';
import RecipeDetailsContext from '../context/RecipeDetailsContext';
import '../styles/RecipeDetails.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function RecipeDetails() {
  const { recipeDetails, pathname, recipeRecommend } = useContext(RecipeDetailsContext);
  const [alcoholic, setAlcoholic] = useState(false);
  const limitIngredients = 20;
  let ingredients = [];
  let name = 'Meal';
  let recommendName = 'Drink';

  const settings = {
    dots: true,
    arrows: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

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
    recommendName = 'Meal';
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
      {
        recipeRecommend.length > 0 && (
          <Slider { ...settings }>
            {recipeRecommend.map((recommmend, index) => (
              <div
                key={ recommmend.strSource }
                data-testid={ `${index}-recommendation-card` }
              >
                <img src={ recommmend[`str${recommendName}Thumb`] } alt="ThumbNail" />
                <span
                  data-testid={ `${index}-recommendation-title` }
                >
                  {recommmend[`str${recommendName}`]}
                </span>
              </div>
            ))}
          </Slider>
        )
      }
    </section>
  );
}

export default RecipeDetails;
