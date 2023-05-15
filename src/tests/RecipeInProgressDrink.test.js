import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderWithRouter from './helpers/renderWithRouter';
import SearchBarProvider from '../context/SearchBarProvider';
import oneDrink from '../../cypress/mocks/oneDrink';
import App from '../App';
import RecipeDetailsProvider from '../context/RecipeDetailsProvider';
import RecipeInProgressProvider from '../context/RecipeInProgressProvider';

const fetchResolved = (data) => () => new Promise((resolve) => {
  resolve({
    json: () => Promise.resolve({
      ...data,
    }),
  });
});

describe('Testa a página de receitas em Progresso com uma receita de /drink/', () => {
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

  test('Testa se a categoria é renderizada', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(fetchResolved({ drinks: oneDrink.drinks }));

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
    jest.spyOn(global, 'fetch').mockImplementation(fetchResolved({ drinks: oneDrink.drinks }));

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

    const favButton = screen.getByTestId('favorite-btn');
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
    jest.spyOn(global, 'fetch').mockImplementation(fetchResolved({ drinks: oneDrink.drinks }));

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

    await waitFor(() => {
      const check1 = screen.getByRole('checkbox', { name: /hpnotiq/i });
      screen.debug();
      const check2 = screen.getByRole('checkbox', { name: /pineapple juice/i });
      const check3 = screen.getByRole('checkbox', { name: /banana liqueur/i });
      userEvent.click(check1);
      userEvent.click(check2);
      userEvent.click(check3);
    });

    await waitFor(() => {
      const buttonFinish = screen.getByTestId('finish-recipe-btn');
      userEvent.click(buttonFinish);
    });

    expect(history.location.pathname).toEqual('/drinks/178319/in-progress/178319');
  });

  test('Testa se ao marcar todos os checkbox o botão de /Finish Recipe/ é habilitado e renderiza /done-recipes/ ao clic', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(fetchResolved({ drinks: oneDrink.drinks }));

    // localStorage.setItem('inProgressRecipes', JSON.stringify(mockLocalWithAllIngredients));
    const { history } = renderWithRouter(
      <RecipeInProgressProvider>
        <App />
      </RecipeInProgressProvider>,
    );

    act(() => {
      history.push('/drinks/178319/in-progress');
    });

    await waitFor(() => {
      expect(history.location.pathname).toBe('/drinks/178319/in-progress');
      const title = screen.getByTestId('0-ingredient-name-and-measure');
      expect(title).toBeInTheDocument();
    });

    const checkbox0 = screen.getByTestId('0-ingredient');
    userEvent.click(checkbox0);

    await waitFor(() => {
      const buttonFinish = screen.getByTestId('finish-recipe-btn');
      expect(buttonFinish).toBeEnabled();
      userEvent.click(buttonFinish);
      const title = screen.getByTestId('filter-by-all-btn');
      expect(title).toBeInTheDocument();
    });
  });
});
