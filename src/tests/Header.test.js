import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';
import Meals from '../pages/Meals';

describe('Teste o Componente Header', () => {
  test('Verifica se o icone de pesquisa aparece na tela meals', async () => {
    renderWithRouter(<App />);
    const inputEmail = screen.getByTestId('email-input');
    userEvent.type(inputEmail, 'test@test.com');
    const inputPassWord = screen.getByTestId('password-input');
    userEvent.type(inputPassWord, '1234567');
    const btn = screen.getByTestId('login-submit-btn');
    userEvent.click(btn);
    const iconSearch = screen.getByTestId('search-top-btn');
    expect(iconSearch).toBeInTheDocument();
  });

  test('Verifica se o icone de pesquisa aparece não aparece tela profile', async () => {
    renderWithRouter(<App />);
    const inputEmail = screen.getByTestId('email-input');
    userEvent.type(inputEmail, 'test@test.com');
    const inputPassWord = screen.getByTestId('password-input');
    userEvent.type(inputPassWord, '1234567');
    const btn = screen.getByTestId('login-submit-btn');
    userEvent.click(btn);
    const btnProfile = screen.getByTestId('profile-top-btn');
    const iconSearch = screen.getByTestId('search-top-btn');
    userEvent.click(btnProfile);
    expect(iconSearch).not.toBeInTheDocument();
  });
  test('Verifica se a barra pesquisa aparece na tela meals após o clique', async () => {
    renderWithRouter(<Meals />);
    // const inputEmail = screen.getByTestId('email-input');
    // userEvent.type(inputEmail, 'test@test.com');
    // const inputPassWord = screen.getByTestId('password-input');
    // userEvent.type(inputPassWord, '1234567');
    // const btn = screen.getByTestId('login-submit-btn');
    // userEvent.click(btn);
    const btnSearch = screen.getByTestId('search-btn');
    userEvent.click(btnSearch);
    const searchInput = screen.getByTestId('search-input');
    expect(searchInput).toBeInTheDocument();
  });
});
