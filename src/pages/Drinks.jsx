import { useContext } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import CardRecipe from '../components/CardRecipe';
import SearchBarContext from '../context/SearchBarContext';

function Drinks() {
  const { recipesData } = useContext(SearchBarContext);

  return (
    <>
      <Header title="Drinks" icons />
      <ul>
        {recipesData.map((recipe, index) => (
          <CardRecipe
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
