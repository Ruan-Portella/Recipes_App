import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import Meals from '../pages/Meals';
import SearchBarProvider from '../context/SearchBarProvider';
import soupMeals from '../../cypress/mocks/soupMeals';

test('Verifica se a barra pesquisa aparece na tela meals após o clique', async () => {
  global.fetch = jest.fn();

  global.fetch.mockImplementationOnce(async () => ({
    json: async () => ({
      results: soupMeals,
    }),
  }));

  renderWithRouter(<SearchBarProvider><Meals /></SearchBarProvider>);
  const btnSearch = screen.getByTestId('search-btn');
  userEvent.click(btnSearch);
  const InputValue = screen.getByTestId('search-input');
  userEvent.type(InputValue, 'soup');
  const nameInput = screen.getByTestId('name-search-radio');
  userEvent.click(nameInput);
  const button = screen.getByTestId('exec-search-btn');
  userEvent.click(button);
  await waitFor(() => {
    const nameCard = screen.getByTestId('8-card-name');
    expect(nameCard).toBeInTheDocument();
  });
});

test('Verifica se a barra pesquisa aparece na tela meals após o clique', async () => {
  renderWithRouter(<SearchBarProvider><Meals /></SearchBarProvider>);
  const btnSearch = screen.getByTestId('search-btn');
  userEvent.click(btnSearch);
  const IngredientInput = screen.getByTestId('ingredient-search-radio');
  userEvent.click(IngredientInput);
});

test('Verifica se a barra pesquisa aparece na tela meals após o clique', async () => {
  renderWithRouter(<SearchBarProvider><Meals /></SearchBarProvider>);
  const btnSearch = screen.getByTestId('search-btn');
  userEvent.click(btnSearch);
  const FirstLetterInput = screen.getByTestId('first-letter-search-radio');
  userEvent.click(FirstLetterInput);
});
