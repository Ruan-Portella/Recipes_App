import { AiOutlineSearch, AiOutlineUser } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function Header({ title, icons }) {
  return (
    <header>
      {icons ? (
        <i data-testid="search-top-btn" src="searchIcon"><AiOutlineSearch /></i>
      ) : null}
      <Link to="/profile">
        <i data-testid="profile-top-btn" src="profileIcon"><AiOutlineUser /></i>
      </Link>
      <h1 data-testid="page-title">{ title }</h1>
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  icons: PropTypes.bool.isRequired,
};

export default Header;
