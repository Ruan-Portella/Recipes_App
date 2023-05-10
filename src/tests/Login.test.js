import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';
import SearchBarProvider from '../context/SearchBarProvider';

describe('Teste tela de Login', () => {
  test('testando se os inputs de Email, senha e botão estão na tela', () => {
    renderWithRouter(<SearchBarProvider><App /></SearchBarProvider>);
    const inputEmail = screen.getByTestId('email-input');
    expect(inputEmail).toBeInTheDocument();
    const inputPassWord = screen.getByTestId('password-input');
    expect(inputPassWord).toBeInTheDocument();
    const btn = screen.getByTestId('login-submit-btn');
    expect(btn).toBeInTheDocument();
    expect(btn).toBeDisabled();
  });
  test('testando se os inputs de Email, senha e botão estão interativos', async () => {
    const { history } = renderWithRouter(<SearchBarProvider><App /></SearchBarProvider>);
    const inputEmail = screen.getByTestId('email-input');
    userEvent.type(inputEmail, 'test@test.com');
    const inputPassWord = screen.getByTestId('password-input');
    userEvent.type(inputPassWord, '1234567');
    const btn = screen.getByTestId('login-submit-btn');
    expect(btn).not.toBeDisabled();
    userEvent.click(btn);
    const { pathname } = history.location;
    expect(pathname).toBe('/meals');
  });
});
