import { Link } from 'react-router-dom';
import { ImCheckmark, ImSpoonKnife, ImHeart } from 'react-icons/im';
import { BiDrink } from 'react-icons/bi';
import '../styles/Footer.css';

function Footer() {
  return (
    <footer data-testid="footer" className="footer-container">
      <Link to="/drinks">
        <BiDrink size={ 30 } color="white" />
      </Link>
      <Link to="/meals">
        <ImSpoonKnife size={ 30 } color="white" />
      </Link>
      <Link to="favorite-recipes">
        <ImHeart size={ 30 } color="white" />
      </Link>
      <Link to="/done-recipes">
        <ImCheckmark size={ 30 } color="white" />
      </Link>
    </footer>
  );
}

export default Footer;
