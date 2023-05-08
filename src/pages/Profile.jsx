import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { getEmail } from '../helpers/localStorage';

function Profile() {
  const email = getEmail();
  const history = useHistory();
  return (
    <>
      <Header title="Profile" icons={ false } />
      <p data-testid="profile-email">{email.email}</p>
      <button
        data-testid="profile-done-btn"
        onClick={ () => { history.push('/done-recipes'); } }
      >
        Done Recipes

      </button>
      <button
        data-testid="profile-favorite-btn"
        onClick={ () => { history.push('/favorite-recipes'); } }
      >
        Favorite Recipes

      </button>
      <button
        data-testid="profile-logout-btn"
        onClick={ () => { history.push('/'); localStorage.clear(); } }
      >
        Logout

      </button>
      <Footer />
    </>
  );
}

export default Profile;
