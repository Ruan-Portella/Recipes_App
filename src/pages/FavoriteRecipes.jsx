import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Header from '../components/Header';
import buttonClipeBoard from '../components/buttonClipeBoard';
import { getRecipes, removeRecipes } from '../helpers/localStorage';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function FavoriteRecipes() {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [favorite, setFavorite] = useState(true);
  const [shared, setShared] = useState(false);

  const getLocalStorage = () => {
    const localStorage = getRecipes();
    setFavorite(true);
    setFavoriteRecipes(localStorage);
  };

  useEffect(() => {
    getLocalStorage();
  }, []);

  const FilterRecipes = (type) => {
    const localStorage = getRecipes();
    switch (type) {
    case 'meals': {
      const Filtered = localStorage.filter((recipe) => recipe.type === 'meal');
      setFavoriteRecipes(Filtered);
      break;
    }
    case 'drinks': {
      const Filtered = localStorage.filter((recipe) => recipe.type === 'drink');
      setFavoriteRecipes(Filtered);
    }
      break;
    default: {
      setFavoriteRecipes(localStorage);
      break;
    }
    }
  };

  const unfavoriteRecipe = (id) => {
    removeRecipes(id);
    getLocalStorage();
  };

  return (
    <section>
      <Header title="Favorite Recipes" icons={ false } />
      <div>
        <button
          data-testid="filter-by-all-btn"
          onClick={ () => FilterRecipes('all') }
        >
          All
        </button>
        <button
          data-testid="filter-by-meal-btn"
          onClick={ () => FilterRecipes('meals') }
        >
          Meals
        </button>
        <button
          data-testid="filter-by-drink-btn"
          onClick={ () => FilterRecipes('drinks') }
        >
          Drinks
        </button>
        <ul>
          {
            favoriteRecipes.map((recipe, index) => (
              <li key={ recipe.id }>
                <Link to={ `${recipe.type}s/${recipe.id}` }>
                  <img
                    data-testid={ `${index}-horizontal-image` }
                    src={ recipe.image }
                    alt={ recipe.name }
                  />
                  <h3 data-testid={ `${index}-horizontal-name` }>{recipe.name}</h3>
                </Link>
                <p
                  data-testid={ `${index}-horizontal-top-text` }
                >
                  {
                    recipe.alcoholicOrNot ? recipe.alcoholicOrNot
                      : `${recipe.nationality} - ${recipe.category}`
                  }
                </p>
                {
                  buttonClipeBoard(
                    recipe.type,
                    recipe.id,
                    index,
                    {
                      state: {
                        setShared,
                        shared,
                      },
                    },
                  )
                }
                <button
                  onClick={ () => (favorite && unfavoriteRecipe(recipe.id)) }
                >
                  {favorite && (
                    <img
                      data-testid={ `${index}-horizontal-favorite-btn` }
                      src={ blackHeartIcon }
                      alt="favorite"
                    />)}
                </button>
              </li>
            ))

          }
        </ul>
      </div>
    </section>
  );
}

export default FavoriteRecipes;
