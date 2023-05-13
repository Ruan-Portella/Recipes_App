import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './helpers/renderWithRouter';
import SearchBarProvider from '../context/SearchBarProvider';
import soupMeals from '../../cypress/mocks/soupMeals';
import App from '../App';
import RecipeDetailsProvider from '../context/RecipeDetailsProvider';

beforeEach(() => {
  (
    global.fetch = jest.fn(async () => ({
      json: async () => soupMeals,
    }))
  );
});

describe('', () => {
  test.skip('', async () => {
    const { history } = renderWithRouter(
      <SearchBarProvider>
        <RecipeDetailsProvider>
          <App />
        </RecipeDetailsProvider>
      </SearchBarProvider>,
    );
    history.push('/Meals/52973');

    const title = await screen.findByRole('heading', { name: /leblebi soup/i });
    expect(title).toBeInTheDocument();
    screen.debug();
  });
});
