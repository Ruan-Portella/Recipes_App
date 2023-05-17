import { useContext, useEffect, useState } from 'react';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';
import copy from 'clipboard-copy';
import { SlHeart } from 'react-icons/sl';
import { ImHeart, ImShare2, ImCart } from 'react-icons/im';
import RecipeDetailsContext from '../context/RecipeDetailsContext';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { saveRecipes,
  getRecipes,
  removeRecipes, getRecipeInProgress } from '../helpers/localStorage';
import '../styles/RecipeDetails.css';
import Footer from '../components/Footer';

function RecipeDetails() {
  const { recipeDetails, pathname,
    recipeRecommend } = useContext(RecipeDetailsContext);
  const [alcoholic, setAlcoholic] = useState(false);
  const [shared, setShared] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const [recipesInProgress, setRecipesInProgress] = useState(undefined);
  const limitIngredients = 20;
  let ingredients = [];
  let name = 'Meal';
  let recommendName = 'Drink';
  let nameForInProgress = 'meals';

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  for (let index = 1; index <= limitIngredients; index += 1) {
    const ingredient = recipeDetails[`strIngredient${index}`];
    const measure = recipeDetails[`strMeasure${index}`];

    if (ingredient) {
      ingredients = [...ingredients, { ingredient, measure }];
    }
  }

  useEffect(() => {
    const getInProgress = getRecipeInProgress();
    if (getInProgress[nameForInProgress]) {
      console.log(getInProgress[nameForInProgress][recipeDetails[`id${name}`]]);
      setRecipesInProgress(getInProgress[nameForInProgress][recipeDetails[`id${name}`]]);
    }
  }, [recipeDetails]);

  useEffect(() => {
    if (pathname.includes('/drinks')) {
      setAlcoholic(true);
    }
  }, [pathname]);

  if (pathname.includes('/drinks')) {
    name = 'Drink';
    recommendName = 'Meal';
    nameForInProgress = 'drinks';
  }

  const shareRecipe = () => {
    setShared(true);
    copy(window.location.href);
  };

  // [{ id, type, nationality, category, alcoholicOrNot, name, image }]

  const favoriteRecipe = () => {
    const recipeToSave = {
      id: recipeDetails[`id${name}`],
      type: name.toLowerCase(),
      nationality: recipeDetails.strArea ? recipeDetails.strArea : '',
      category: recipeDetails.strCategory,
      alcoholicOrNot: recipeDetails.strAlcoholic ? recipeDetails.strAlcoholic : '',
      name: recipeDetails[`str${name}`],
      image: recipeDetails[`str${name}Thumb`],
    };
    saveRecipes(recipeToSave);
    setFavorite(true);
  };

  const callGetRecipes = () => {
    const getFavorite = getRecipes();
    const isFavorite = getFavorite.some((recipe) => recipe
      .id === recipeDetails[`id${name}`]);
    setFavorite(isFavorite);
  };
  useEffect(() => {
    callGetRecipes();
  });

  const unfavoriteRecipe = () => {
    removeRecipes(recipeDetails[`id${name}`]);
    setFavorite(false);
  };

  return (
    <section className="details">

      <div
        className="details-img-container"
        style={ { backgroundImage: `url(${recipeDetails[`str${name}Thumb`]})`,
          backgroundSize: 'cover' } }
      >
        <div className="grayscale-container">
          {
            shared && <span>Link copied!</span>
          }
        </div>
      </div>
      <div className="details-btn-container">

        <h1 data-testid="recipe-title">{recipeDetails[`str${name}`]}</h1>
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
        <div className="sub-details">
          <div className="ingredients-and-image">

            <p
              data-testid="recipe-category"
            >
              {recipeDetails.strCategory}

            </p>
            {
              alcoholic
              && <p
                data-testid="recipe-category"
              >
                {recipeDetails.strAlcoholic}

                 </p>
            }
            <h3>Ingredients</h3>
            <ul>
              {
                ingredients.map((ingredient, index) => (
                  <li
                    className="details-list"
                    data-testid={ `${index}-ingredient-name-and-measure` }
                    key={ ingredient.ingredient }
                  >
                    <span>
                      <ImCart color="#00BF63" />
&nbsp;&nbsp;
                      {`${ingredient.ingredient} - ${ingredient.measure}`}
                    </span>
                  </li>
                ))
              }
            </ul>
          </div>
          <img
            src={ recipeDetails[`str${name}Thumb`] }
            alt={ recipeDetails[`str${name}Thumb`] }
          />
        </div>
        <h3>How to make</h3>
        <p data-testid="instructions">{recipeDetails.strInstructions}</p>
        {

          !alcoholic ? (
            <>
              <h3>Video</h3>
              <iframe
                className="details-video"
                data-testid="video"
                src={ `https://www.youtube.com/embed/${`${recipeDetails.strYoutube}`.split('v=')[1]}` }
                title="video"
              />
            </>) : null
        }
        <h3>Recommendations</h3>
        {
          recipeRecommend.length > 0 && (
            <Slider { ...settings } className="slider">
              {recipeRecommend.map((recommmend, index) => (
                <div
                  key={ `id${recommendName}` }
                  data-testid={ `${index}-recommendation-card` }
                >
                  <img
                    src={ recommmend[`str${recommendName}Thumb`] }
                    alt="ThumbNail"
                    className="slider-image"
                  />
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
        <div className="details-btn">
          <Link to={ { pathname: `${pathname}/in-progress`, state: recipeDetails } }>
            <button
              className="btn-start-recipe"
              data-testid="start-recipe-btn"
            >
              {recipesInProgress === undefined ? 'Start Recipe' : 'Continue Recipe'}
            </button>
          </Link>
        </div>
      </div>
      <Footer />
    </section>
  );
}

export default RecipeDetails;
