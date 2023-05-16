import { useContext } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Recipes from '../components/Recipes';
import SearchBarContext from '../context/SearchBarContext';
import ButtonCategorie from '../components/ButtonCategorie';
import all from '../images/all.svg';
import '../styles/Meals.css';

function Meals() {
  const { recipesData, categoriesData,
    searchBtn, isLoading } = useContext(SearchBarContext);
  return (
    <>
      <Header title="Meals" icons />
      {
        !isLoading ? (
          <section className="loading-container">
            <div className="Loading">
              <div className="loading1" />
              <div className="loading2" />
              <div className="loading3" />
              <div className="loading4" />
              <div className="loading5" />
              <div className="loading6" />
              <div className="loading7" />
              <div className="loading8" />
            </div>
          </section>)
          : (
            <>
              <section className="categoriesButton">
                {
                  categoriesData.map((category, index) => (
                    <ButtonCategorie
                      key={ index }
                      name={ category.strCategory }
                      icon={ index }
                      path="meals"
                    />
                  ))
                }
                <div className="content-categories">
                  <button
                    data-testid="All-category-filter"
                    onClick={ () => searchBtn('', 'Name') }
                  >
                    <img src={ all } alt="Button All" />
                  </button>
                  <span>All</span>
                </div>
              </section>
              <section className="content-trending">
                <section className="title">
                  <h2>Trending Meals Recipe</h2>
                </section>
              </section>
              <section className="recipe-container">
                <ul>
                  {recipesData.map((recipe, index) => (
                    <Recipes
                      key={ recipe.strMeal }
                      path="/meals/"
                      id={ recipe.idMeal }
                      name={ recipe.strMeal }
                      img={ recipe.strMealThumb }
                      index={ index }
                    />))}
                </ul>
              </section>
            </>
          )
      }
      <Footer />
    </>
  );
}

export default Meals;
