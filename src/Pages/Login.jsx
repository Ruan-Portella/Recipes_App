import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { saveEmail } from '../helpers/localStorage';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isDisable, setIsDisable] = useState(true);
  // const { history } = useHistory();

  useEffect(() => {
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    const minCaracter = 6;
    const btnValidation = emailRegex.test(email) && password.length > minCaracter;
    setIsDisable(!btnValidation);
  }, [email, password]);

  const handleClick = () => {
    saveEmail({ email });
    // history.push('/');
  };

  return (
    <form>
      <label htmlFor="email">
        Email
        <input
          id="email"
          placeholder="email@email.com"
          name="email"
          data-testid="email-input"
          onChange={ ({ target }) => setEmail(target.value) }
          value={ email }
        />
      </label>
      <label htmlFor="password">
        Password
        <input
          id="password"
          name="password"
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
        Enter
      </button>
    </form>
  );
}
