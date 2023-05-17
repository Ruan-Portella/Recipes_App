import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ImHeart } from 'react-icons/im';
import Header from '../components/Header';
import buttonClipeBoard from '../components/buttonClipeBoard';
import { getRecipes, removeRecipes } from '../helpers/localStorage';
// import blackHeartIcon from '../images/blackHeartIcon.svg';
import all from '../images/all.svg';
import category0 from '../images/beef.svg';
import drink0 from '../images/ordinary.svg';
import '../styles/FavoriteRecipes.css';
// import Footer from '../components/Footer';

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
    <>
      <Header icons={ false } />
      <div className="content-trending">
        <div className="title">
          Receitas Favoritas
        </div>

      </div>
      <section className="categoriesButton">
        <div className="content-categories">
          <button
            data-testid="filter-by-all-btn"
            onClick={ () => FilterRecipes('all') }
          >
            <img src={ all } alt="Button All" />
          </button>
          <span>All</span>
        </div>
        <div className="content-categories">
          <button
            data-testid="filter-by-meal-btn"
            onClick={ () => FilterRecipes('meals') }
          >
            <img src={ category0 } alt="Button All" />
          </button>
          <span>Meals</span>
        </div>
        <div className="content-categories">
          <button
            data-testid="filter-by-drink-btn"
            onClick={ () => FilterRecipes('drinks') }
          >
            <img src={ drink0 } alt="Button All" />
          </button>
          <span>
            Drinks
          </span>
        </div>
      </section>
      <section className="recipe-containe">
        <ul>
          {
            favoriteRecipes.map((recipe, index) => (
              <li key={ recipe.id } className="card-containe">
                <Link to={ `${recipe.type}s/${recipe.id}` }>
                  <img
                    data-testid={ `${index}-horizontal-image` }
                    src={ recipe.image }
                    alt={ recipe.name }
                  />
                  <div className="card-nome">
                    <div className="card-contente">

                      <p
                        data-testid={ `${index}-horizontal-name` }
                      >
                        {recipe.name}

                      </p>
                      <p
                        data-testid={ `${index}-horizontal-top-text` }
                      >
                        {
                          recipe.alcoholicOrNot ? recipe.alcoholicOrNot
                            : `${recipe.nationality} - ${recipe.category}`
                        }
                      </p>
                    </div>
                    <div className="card-contente">
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
                          <ImHeart size={ 30 } color="#00BF63" />)}
                      </button>
                    </div>
                  </div>
                </Link>
              </li>
            ))
          }
        </ul>
      </section>
      {/* <Footer /> */}
    </>
  );
}

export default FavoriteRecipes;
