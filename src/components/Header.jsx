import { AiOutlineUser } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import iRecipes from '../images/iRecipes.svg';
import '../styles/Header.css';
import SearchBar from './SearchBar';

function Header({ icons }) {
  return (
    <header>
      <section className="header-container">
        <div>
          <Link to="/meals">
            <img className="header-image" src={ iRecipes } alt="iRecipes Logo" />
          </Link>
        </div>
        <div className="header-profile">
          <Link to="/profile">
            <AiOutlineUser size={ 25 } color="black" />
          </Link>
        </div>
      </section>
      {icons && <section className="searchBar-container"><SearchBar /></section>}
    </header>
  );
}

Header.propTypes = {
  icons: PropTypes.bool.isRequired,
};

export default Header;
