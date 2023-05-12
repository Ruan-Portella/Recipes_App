import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import RecipeDetailsProvider from '../context/RecipeDetailsProvider';
import FavoriteRecipes from '../pages/FavoriteRecipes';

const date = '23/06/2020';
const nameMock = 'Spicy Arrabiata Penne';

const MockLocalStorage = [
  {
    id: '52771',
    type: 'meal',
    nationality: 'Italian',
    category: 'Vegetarian',
    alcoholicOrNot: '',
    name: nameMock,
    image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
    doneDate: date,
    tags: ['Pasta', 'Curry'],
  },
  {
    id: '178319',
    type: 'drink',
    nationality: '',
    category: 'Cocktail',
    alcoholicOrNot: 'Alcoholic',
    name: 'Aquamarine',
    image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
    doneDate: date,
    tags: [],
  },
];

beforeEach(() => {
  (
    global.fetch = jest.fn(async () => ({
      json: async () => MockLocalStorage,
    }))
  );
});

describe('Teste o Componente de DoneRecipes', () => {
  test('Verifica se quando clicado nos botões de filtros, acontece o mesmo', async () => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(MockLocalStorage));
    renderWithRouter(
      <RecipeDetailsProvider>
        <FavoriteRecipes />
      </RecipeDetailsProvider>,
    );
    // const suave = localStorage.getItem('favoriteRecipes');

    // expect(JSON.parse(suave)).toBe([]);
    const nameRecipe = await screen.findByTestId('0-horizontal-name');
    const nameRecipeDrink = await screen.findByTestId('1-horizontal-name');
    expect(nameRecipe.innerHTML).toBe(MockLocalStorage[0].name);

    const favoriteRecipe = await screen.findByTestId('0-horizontal-favorite-btn');

    userEvent.click(favoriteRecipe);

    expect(nameRecipe).not.toBeInTheDocument();

    const filterMealButton = screen.getByTestId('filter-by-meal-btn');
    userEvent.click(filterMealButton);

    expect(nameRecipeDrink).not.toBeInTheDocument();

    const filterDrinkButton = screen.getByTestId('filter-by-drink-btn');

    userEvent.click(filterDrinkButton);

    const drinkName = await screen.findByTestId('0-horizontal-name');

    expect(drinkName).toBeInTheDocument();

    const filterAllButton = screen.getByTestId('filter-by-all-btn');

    userEvent.click(filterAllButton);

    expect(drinkName).toBeInTheDocument();
  });
});
