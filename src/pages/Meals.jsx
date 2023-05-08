import { useContext } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Recipes from '../components/Recipes';
import SearchBarContext from '../context/SearchBarContext';
import ButtonCategorie from '../components/ButtonCategorie';

function Meals() {
  const { recipesData, categoriesData } = useContext(SearchBarContext);

  return (
    <>
      <Header title="Meals" icons />
      <section>
        {
          categoriesData.map((category, index) => (
            <ButtonCategorie key={ index } name={ category.strCategory } />
          ))
        }
      </section>
      <ul>
        {recipesData.map((recipe, index) => (
          <Recipes
            key={ recipe.strMeal }
            name={ recipe.strMeal }
            img={ recipe.strMealThumb }
            index={ index }
          />))}
      </ul>
      <Footer />
    </>
  );
}

export default Meals;
