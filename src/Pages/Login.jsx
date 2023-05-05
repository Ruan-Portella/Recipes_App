import React from 'react';

export default function Login() {
  return (
    <div>
      <label htmlFor="email">
        Email
        <input
          id="email"
          placeholder="email@email.com"
          name="email"
          data-testid="email-input"
        />
      </label>
      <label htmlFor="password">
        Password
        <input id="password" name="password" data-testid="password-input" />
      </label>
      <button data-testid="login-submit-btn">Enter</button>
    </div>
  );
}
