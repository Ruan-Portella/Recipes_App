import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import Meals from '../pages/Meals';
import SearchBarProvider from '../context/SearchBarProvider';
import soupMeals from '../../cypress/mocks/soupMeals';

beforeEach(() => {
  (
    global.fetch = jest.fn(async () => ({
      json: async () => soupMeals,
    }))
  );
});

describe('', () => {
  const SEARCH = 'search-btn';
  test('', async () => {
    renderWithRouter(<SearchBarProvider><Meals /></SearchBarProvider>);
    const btnSearch = screen.getByTestId(SEARCH);
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

  test('', async () => {
    renderWithRouter(<SearchBarProvider><Meals /></SearchBarProvider>);
    const btnSearch = screen.getByTestId(SEARCH);
    userEvent.click(btnSearch);
    const IngredientInput = screen.getByTestId('ingredient-search-radio');
    userEvent.click(IngredientInput);
  });

  test('', async () => {
    renderWithRouter(<SearchBarProvider><Meals /></SearchBarProvider>);
    const btnSearch = screen.getByTestId(SEARCH);
    userEvent.click(btnSearch);
    const FirstLetterInput = screen.getByTestId('first-letter-search-radio');
    userEvent.click(FirstLetterInput);
  });
});
