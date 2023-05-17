import { Link, useLocation } from 'react-router-dom';
import { ImCheckmark, ImSpoonKnife, ImHeart } from 'react-icons/im';
import { BiDrink } from 'react-icons/bi';
import '../styles/Footer.css';
import { useEffect, useState } from 'react';

function Footer() {
  const [drinks, setDrinks] = useState();
  const [meals, setMeals] = useState();
  const [favorite, setFavorite] = useState();
  const [done, setDone] = useState();
  const { pathname } = useLocation();

  useEffect(() => {
    console.log(pathname);
    switch (pathname) {
    case '/drinks':
      setDrinks(true);
      setMeals(false);
      setFavorite(false);
      setDone(false);
      break;
    case '/meals':
      setMeals(true);
      setFavorite(false);
      setDone(false);
      setDrinks(false);
      break;
    case '/favorite-recipes':
      setFavorite(true);
      setDone(false);
      setMeals(false);
      setDrinks(false);
      break;
    case '/done-recipes':
      setDone(true);
      setFavorite(false);
      setMeals(false);
      setDrinks(false);
      break;
    default:
      setDone(false);
      setFavorite(false);
      setMeals(false);
      setDrinks(false);
    }
  }, [pathname]);
  return (
    <footer data-testid="footer" className="footer-container">
      <Link to="/meals">
        <ImSpoonKnife size={ 30 } color={ meals ? 'black' : 'white' } />
      </Link>
      <Link to="/drinks">
        <BiDrink size={ 30 } color={ drinks ? 'black' : 'white' } />
      </Link>
      <Link to="/favorite-recipes">
        <ImHeart size={ 30 } color={ favorite ? 'black' : 'white' } />
      </Link>
      <Link to="/done-recipes">
        <ImCheckmark size={ 30 } color={ done ? 'black' : 'white' } />
      </Link>
    </footer>
  );
}

export default Footer;
