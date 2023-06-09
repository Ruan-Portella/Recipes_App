import { useContext } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Recipes from '../components/Recipes';
import SearchBarContext from '../context/SearchBarContext';
import ButtonCategorie from '../components/ButtonCategorie';
import all from '../images/icone-bebida.png';

function Drinks() {
  const { recipesData, categoriesData,
    searchBtn, isLoading } = useContext(SearchBarContext);

  return (
    <>
      <Header title="Drinks" icons />
      {
        isLoading ? (
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
                      path="drinks"
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
                  <h2>Trending Drinks Recipe</h2>
                </section>
              </section>
              <section className="recipe-container">
                <ul>
                  {recipesData.map((recipe, index) => (
                    <Recipes
                      key={ recipe.strDrink }
                      path="/drinks/"
                      id={ recipe.idDrink }
                      name={ recipe.strDrink }
                      img={ recipe.strDrinkThumb }
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

export default Drinks;
