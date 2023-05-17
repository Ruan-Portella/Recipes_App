import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BsCheck } from 'react-icons/bs';
import buttonClipeBoard from '../components/buttonClipeBoard';
import Header from '../components/Header';
import '../styles/FavoriteRecipes.css';
import all from '../images/all.svg';
import category0 from '../images/beef.svg';
import drink0 from '../images/ordinary.svg';
import Footer from '../components/Footer';

function DoneRecipes() {
  const [doneRecipes, setDoneRecipes] = useState([]);
  const [shared, setShared] = useState(false);
  const date = '23/06/2020';

  useEffect(() => {
    const MockLocalStorage = [
      {
        id: '52771',
        type: 'meal',
        nationality: 'Italian',
        category: 'Vegetarian',
        alcoholicOrNot: '',
        name: 'Spicy Arrabiata Penne',
        image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
        doneDate: date,
        tags: ['Pasta', 'Curry'],
      },
      {
        id: '178319',
        type: 'drink',
        nationality: '',
        category: 'Cocktail',
        alcoholicOrNot: 'Alcoholic',
        name: 'Aquamarine',
        image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
        doneDate: date,
        tags: [],
      },
    ];

    setDoneRecipes(MockLocalStorage);
  }, []);

  const FilterRecipes = (type) => {
    const MockLocalStorage = [
      {
        id: '52771',
        type: 'meal',
        nationality: 'Italian',
        category: 'Vegetarian',
        alcoholicOrNot: '',
        name: 'Spicy Arrabiata Penne',
        image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
        doneDate: date,
        tags: ['Pasta', 'Curry'],
      },
      {
        id: '178319',
        type: 'drink',
        nationality: '',
        category: 'Cocktail',
        alcoholicOrNot: 'Alcoholic',
        name: 'Aquamarine',
        image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
        doneDate: date,
        tags: [],
      },
    ];

    switch (type) {
    case 'meals': {
      const Filtered = MockLocalStorage.filter((recipe) => recipe.type === 'meal');
      setDoneRecipes(Filtered);
      break;
    }
    case 'drinks': {
      const Filtered = MockLocalStorage.filter((recipe) => recipe.type === 'drink');
      setDoneRecipes(Filtered);
    }
      break;
    default: {
      setDoneRecipes(MockLocalStorage);
      break;
    }
    }
  };

  return (
    <>
      <Header title="Done Recipes" icons={ false } />
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
            doneRecipes.map((recipe, index) => (
              <li key={ recipe.id } className="card-containe">
                <Link to={ `${recipe.type}s/${recipe.id}` }>
                  <img
                    data-testid={ `${index}-horizontal-image` }
                    src={ recipe.image }
                    alt={ recipe.name }
                  />
                  <div className="card-nome">
                    <div className="card-contente">
                      <h3 data-testid={ `${index}-horizontal-name` }>{recipe.name}</h3>
                      <span
                        data-testid={ `${index}-horizontal-done-date` }
                      >
                        {recipe.doneDate}

                      </span>
                    </div>
                    <div className="card-contente-button">
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
                      <button>
                        <BsCheck
                          size={ 50 }
                          color="#00BF63"
                        />
                      </button>
                    </div>
                  </div>
                </Link>
              </li>
            ))
          }
        </ul>
      </section>
      <Footer />
    </>
  );
}

export default DoneRecipes;
