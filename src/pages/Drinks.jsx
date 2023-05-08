import { useContext } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Recipes from '../components/Recipes';
import SearchBarContext from '../context/SearchBarContext';
import ButtonCategorie from '../components/ButtonCategorie';

function Drinks() {
  const { recipesData, categoriesData, searchBtn } = useContext(SearchBarContext);

  return (
    <>
      <Header title="Drinks" icons />
      <section>
        {
          categoriesData.map((category, index) => (
            <ButtonCategorie key={ index } name={ category.strCategory } />
          ))
        }
        <button
          data-testid="All-category-filter"
          onClick={ () => searchBtn('', 'Name') }
        >
          All
        </button>
      </section>
      <ul>
        {recipesData.map((recipe, index) => (
          <Recipes
            key={ recipe.strDrink }
            name={ recipe.strDrink }
            img={ recipe.strDrinkThumb }
            index={ index }
          />))}
      </ul>
      <Footer />
    </>
  );
}

export default Drinks;
