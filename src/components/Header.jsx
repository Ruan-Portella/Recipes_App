import { AiOutlineSearch, AiOutlineUser } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useState } from 'react';

function Header({ title, icons }) {
  const [isEnable, setIsEnable] = useState(false);
  return (
    <header>
      {icons && (
        <i
          data-testid="search-top-btn"
          src="searchIcon"
        >
          <button
            data-testid="search-btn"
            onClick={ () => setIsEnable(!isEnable) }
          >
            <AiOutlineSearch />
          </button>
        </i>)}
      <Link to="/profile">
        <i data-testid="profile-top-btn" src="profileIcon"><AiOutlineUser /></i>
      </Link>
      <h1 data-testid="page-title">{ title }</h1>
      {isEnable && <input data-testid="search-input" />}
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  icons: PropTypes.bool.isRequired,
};

export default Header;
