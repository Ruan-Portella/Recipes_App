import { useContext } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import CardRecipe from '../components/CardRecipe';
import SearchBarContext from '../context/SearchBarContext';

function Meals() {
  const { recipesData } = useContext(SearchBarContext);

  return (
    <>
      <Header title="Meals" icons />
      <ul>
        {recipesData.map((recipe, index) => (
          <CardRecipe
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
