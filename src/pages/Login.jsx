import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { BiLogIn } from 'react-icons/bi';
import { AiOutlineMail } from 'react-icons/ai';
import { RiLockPasswordLine } from 'react-icons/ri';
import { saveEmail } from '../helpers/localStorage';
import pizzaMarker from '../images/undraw_cooking_p7m1.svg';
import iRecipes from '../images/iRecipes.svg';
import '../styles/Login.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isDisable, setIsDisable] = useState(true);
  const history = useHistory();

  useEffect(() => {
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    const minCaracter = 6;
    const btnValidation = emailRegex.test(email) && password.length > minCaracter;
    setIsDisable(!btnValidation);
  }, [email, password]);

  const handleClick = () => {
    saveEmail({ email });
    history.push('/meals');
  };

  return (
    <form className="form-container">
      <section className="container-right">
        <img src={ pizzaMarker } alt="logo Pizza Maker" />
      </section>
      <section className="container-left">
        <section className="container-image">
          <img src={ iRecipes } alt="logo Pizza Maker" />
        </section>
        <section className="container-title">
          <h2>Sign In</h2>
          <p>
            iRecipes é um aplicativo de receitas para quem gosta
            de se aventurar em casa e aprender a cozinhar como um chef.
          </p>
        </section>
        <label>
          <AiOutlineMail size={ 20 } />
          <input
            id="email"
            placeholder="email"
            name="email"
            data-testid="email-input"
            onChange={ ({ target }) => setEmail(target.value) }
            value={ email }
          />
        </label>
        <label>
          <RiLockPasswordLine size={ 20 } />
          <input
            id="password"
            name="password"
            placeholder="password"
            data-testid="password-input"
            onChange={ ({ target }) => setPassword(target.value) }
            type="password"
            value={ password }
          />
        </label>
        <button
          type="button"
          data-testid="login-submit-btn"
          disabled={ isDisable }
          onClick={ () => handleClick() }
        >
          <BiLogIn size={ 20 } />
          <span>Log In</span>
        </button>
      </section>
    </form>
  );
}
