import { AiOutlineUser } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import iRecipes from '../images/iRecipes.svg';
import '../styles/Header.css';
import SearchBar from './SearchBar';

function Header({ title, icons }) {
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
      <h1 data-testid="page-title">{ title }</h1>
      {icons && <SearchBar />}
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  icons: PropTypes.bool.isRequired,
};

export default Header;
