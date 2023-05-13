import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import SearchBarProvider from '../context/SearchBarProvider';
import oneDrink from '../../cypress/mocks/oneDrink';
import App from '../App';
import RecipeDetailsProvider from '../context/RecipeDetailsProvider';
import RecipeInProgressProvider from '../context/RecipeInProgressProvider';

describe('Testa a página de receitas em Progresso com uma receita de /drink/', () => {
  beforeEach(() => {
    (
      global.fetch = jest.fn(async () => ({
        json: async () => oneDrink,
      }))
    );
  });

  const mockFavorite = [
    {
      id: '178319',
      type: 'drink',
      nationality: '',
      category: 'Cocktail',
      alcoholicOrNot: 'Alcoholic',
      name: 'Aquamarine',
      image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
    },
  ];

  // const mockDrinkComplete = {
  //   drinks: { 17839: ['Banana Liqueur', 'Pineapple Juice', 'Hpnotiq'] },
  //   meals: {},
  // };

  const funcToPush = () => {
    const { history } = renderWithRouter(
      <SearchBarProvider>
        <RecipeDetailsProvider>
          <RecipeInProgressProvider>
            <App />
          </RecipeInProgressProvider>
        </RecipeDetailsProvider>
      </SearchBarProvider>,
    );

    return history.push('/drinks/178319/in-progress');
  };

  test('Testa se a categoria é renderizada', async () => {
    const { history } = renderWithRouter(
      <SearchBarProvider>
        <RecipeDetailsProvider>
          <RecipeInProgressProvider>
            <App />
          </RecipeInProgressProvider>
        </RecipeDetailsProvider>
      </SearchBarProvider>,
    );

    await waitFor(() => {
      history.push('/drinks/178319/in-progress');
      const title = screen.getByRole('heading', { name: /aquamarine/i });
      expect(title).toBeInTheDocument();
    });
  });

  test('Testa a função de favoritar e se o LocalStorage é atualizado', async () => {
    const { history } = renderWithRouter(
      <SearchBarProvider>
        <RecipeDetailsProvider>
          <RecipeInProgressProvider>
            <App />
          </RecipeInProgressProvider>
        </RecipeDetailsProvider>
      </SearchBarProvider>,
    );
    await waitFor(() => {
      history.push('/drinks/178319/in-progress');
      const title = screen.getByRole('heading', { name: /aquamarine/i });
      expect(title).toBeInTheDocument();
    });

    const favButton = screen.getByAltText(/notfavorited/i);
    userEvent.click(favButton);

    const local = localStorage.getItem('favoriteRecipes');
    expect(JSON.parse(local)).toEqual(mockFavorite);

    const unFavButton = screen.getByAltText(/favorite/i);
    expect(unFavButton).toBeInTheDocument();
    userEvent.click(favButton);

    const localWithoutFavorite = localStorage.getItem('favoriteRecipes');
    expect(JSON.parse(localWithoutFavorite)).toEqual([]);
  });

  test('Testa a função de favoritar e se o LocalStorage é atualizado', async () => {
    const { history } = renderWithRouter(
      <SearchBarProvider>
        <RecipeDetailsProvider>
          <RecipeInProgressProvider>
            <App />
          </RecipeInProgressProvider>
        </RecipeDetailsProvider>
      </SearchBarProvider>,
    );

    funcToPush()
    await waitFor(() => {
      // const title = screen.getByText(/alcoholic/i);
      // expect(title).toBeInTheDocument();
      const check1 = screen.getByRole('checkbox', { name: /hpnotiq/i });
      const check2 = screen.getByRole('checkbox', { name: /pineapple juice/i });
      const check3 = screen.getByRole('checkbox', { name: /banana liqueur/i });
      userEvent.click(check1);
      userEvent.click(check2);
      userEvent.click(check3);
    });

    await waitFor(() => {
      const buttonFinish = screen.getByRole('button', { name: /finish recipe/i });
      expect(buttonFinish).toBeEnabled();
      userEvent.click(buttonFinish);
    });
    expect(history.location.pathname).toEqual('/done-recipes');
  });
});
