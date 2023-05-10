import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import Profile from '../pages/Profile';

describe('Teste tela de Perfil', () => {
  test('Verificando se os elementos Email e botões estão na tela', () => {
    renderWithRouter(<Profile />);
    const profileEmail = screen.getByTestId('profile-email');
    expect(profileEmail).toBeInTheDocument();
    const btnDone = screen.getByTestId('profile-done-btn');
    expect(btnDone).toBeInTheDocument();
    const btnFavorite = screen.getByTestId('profile-favorite-btn');
    expect(btnFavorite).toBeInTheDocument();
    const btnLogout = screen.getByTestId('profile-logout-btn');
    expect(btnLogout).toBeInTheDocument();
  });
  test('Verificando o botão está  redirecionando para /done-recipes', () => {
    const { history } = renderWithRouter(<Profile />);
    const btnDone = screen.getByTestId('profile-done-btn');
    userEvent.click(btnDone);
    const { pathname } = history.location;
    expect(pathname).toBe('/done-recipes');
  });
  test('Verificando o botão está  redirecionando para /favorite-recipes', () => {
    const { history } = renderWithRouter(<Profile />);
    const btnFavorite = screen.getByTestId('profile-favorite-btn');
    userEvent.click(btnFavorite);
    const { pathname } = history.location;
    expect(pathname).toBe('/favorite-recipes');
  });
  test('Verificando se os botões estão redirecionando /', () => {
    const { history } = renderWithRouter(<Profile />);
    const btnLogout = screen.getByTestId('profile-logout-btn');
    userEvent.click(btnLogout);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });
});
