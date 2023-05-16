import { useContext, useEffect, useState } from 'react';
import copy from 'clipboard-copy';
import { useHistory } from 'react-router-dom';
import { SlHeart } from 'react-icons/sl';
import { ImHeart, ImShare2 } from 'react-icons/im';
import RecipeInProgressContext from '../context/RecipeInProgressContext';
import { saveRecipeInProgress,
  getRecipeInProgress,
  saveRecipesFinished,
  saveRecipes, getRecipes, removeRecipes } from '../helpers/localStorage';
import '../styles/RecipeDetails.css';
import Footer from '../components/Footer';

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
  const [shared, setShared] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const [finishRecipe, setFinishRecipe] = useState(false);
  if (pathname.includes('/drinks/')) {
    alcoholic = true;
    mealOrDrink = 'Drink';
    pathMealOrDrink = 'drinks';
  }

  useEffect(() => {
    const itensLocalStorage = getRecipeInProgress();
    if (!Array.isArray(itensLocalStorage)
    && itensLocalStorage[pathMealOrDrink][idRecipe]) {
      setSelectedItems(itensLocalStorage[pathMealOrDrink][idRecipe]);
    }
  }, [idRecipe, pathMealOrDrink]);

  useEffect(() => {
    saveRecipeInProgress(selectedItems, mealOrDrink, idRecipe);
  }, [selectedItems, mealOrDrink, idRecipe]);

  for (let index = 1; index <= limitIngredients; index += 1) {
    const ingredient = recipeDetails[`strIngredient${index}`];
    const measure = recipeDetails[`strMeasure${index}`];
    if (ingredient) {
      ingredients = [...ingredients, { ingredient, measure }];
    }
  }

  const handleCheckboxChange = ({ target }) => {
    const { name } = target;
    const isChecked = target.checked;
    setSelectedItems((prevSelectedItems) => {
      if (isChecked) {
        return [...prevSelectedItems, name];
      }
      return prevSelectedItems.filter((item) => item !== name);
    });
  };

  const shareRecipe = () => {
    setShared(true);
    const urlComplete = window.location.href;
    const urlToShare = urlComplete.replace('/in-progress', '');
    copy(urlToShare);
  };

  const favoriteRecipe = () => {
    const recipeToSave = {
      id: recipeDetails[`id${mealOrDrink}`],
      type: mealOrDrink.toLowerCase(),
      nationality: recipeDetails.strArea ? recipeDetails.strArea : '',
      category: recipeDetails.strCategory,
      alcoholicOrNot: recipeDetails.strAlcoholic ? recipeDetails.strAlcoholic : '',
      name: recipeDetails[`str${mealOrDrink}`],
      image: recipeDetails[`str${mealOrDrink}Thumb`],
    };
    saveRecipes(recipeToSave);
    setFavorite(true);
  };

  const callGetRecipes = () => {
    const getFavorite = getRecipes();
    const isFavorite = getFavorite.some((recipe) => recipe
      .id === recipeDetails[`id${mealOrDrink}`]);
    setFavorite(isFavorite);
  };
  useEffect(() => {
    callGetRecipes();
    if (ingredients.length === selectedItems.length) {
      setFinishRecipe(true);
    } else {
      setFinishRecipe(false);
    }
  });

  const unfavoriteRecipe = () => {
    removeRecipes(recipeDetails[`id${mealOrDrink}`]);
    setFavorite(false);
  };

  const saveDoneRecipe = () => {
    const recipeToSave = {
      id: recipeDetails[`id${mealOrDrink}`],
      type: mealOrDrink.toLowerCase(),
      nationality: recipeDetails.strArea ? recipeDetails.strArea : '',
      category: recipeDetails.strCategory,
      alcoholicOrNot: recipeDetails.strAlcoholic ? recipeDetails.strAlcoholic : '',
      name: recipeDetails[`str${mealOrDrink}`],
      image: recipeDetails[`str${mealOrDrink}Thumb`],
      doneDate: new Date(Date.now()),
      tags: recipeDetails.strTags ? recipeDetails.strTags.split(',') : [],
    };
    saveRecipesFinished(recipeToSave);
  };

  const history = useHistory();
  const clickFinishRecipe = () => {
    saveDoneRecipe();
    history.push('/done-recipes');
  };

  return (
    <section className="details">
      <div
        className="details-img-container"
        style={ { backgroundImage: `url(${recipeDetails[`str${mealOrDrink}Thumb`]})`,
          backgroundSize: 'cover' } }
      >
        <div className="grayscale-container" />
        {
          shared && <span>Link copied!</span>
        }
      </div>
      <div className="details-btn-container">

        <h1 data-testid="recipe-title">{recipeDetails[`str${mealOrDrink}`]}</h1>
        <div className="only-btn">

          <button
            data-testid="share-btn"
            onClick={ () => shareRecipe() }
          >
            <ImShare2 size={ 30 } color="#00BF63" />
          </button>
          <button
            onClick={ () => (favorite ? unfavoriteRecipe() : favoriteRecipe()) }
          >
            {favorite ? (
              <ImHeart size={ 30 } color="#00BF63" />)
              : (
                <SlHeart size={ 30 } color="#00BF63" />
              ) }

          </button>
        </div>
      </div>
      <div className="details-description">
        {
          alcoholic && <p data-testid="recipe-category">{recipeDetails.strAlcoholic}</p>
        }
        <h3>Ingredients</h3>
        <ul>
          {
            ingredients.map((ingredient, index) => (
              <label
                data-testid={ `${index}-ingredient-step` }
                key={ ingredient.ingredient + ingredient.measure }
                className={ selectedItems.includes(ingredient.ingredient)
                  ? 'marked' : 'not-marked' }
              >
                <li
                  data-testid={ `${index}-ingredient-name-and-measure` }
                  className="details-list-inprogress"
                >

                  <input
                    data-testid={ `${index}-ingredient` }
                    type="checkbox"
                    id={ recipeDetails[`id${mealOrDrink}`] }
                    name={ ingredient.ingredient + index } // Alteração teste - adicionado o index para evitar problemas com receitas que repitam ingredientes (sushi)
                    checked={ selectedItems.includes(ingredient.ingredient + index) }
                    onChange={ (event) => handleCheckboxChange(event) }
                  />
                &nbsp;&nbsp;
                  <span>
                    {`${ingredient.ingredient} - ${ingredient.measure}`}
                  </span>

                </li>
              </label>
            ))
          }
        </ul>
        <h3>How to make</h3>
        <p data-testid="instructions">{recipeDetails.strInstructions}</p>
        <div className="details-btn">
          <button
            onClick={ clickFinishRecipe }
            disabled={ !finishRecipe }
            className="btn-finish-recipe"
            data-testid="finish-recipe-btn"
          >
            Finish Recipe
          </button>
        </div>
      </div>
      <Footer />
    </section>
  );
}

export default RecipeInProgress;
