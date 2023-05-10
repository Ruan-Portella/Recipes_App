import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
// import SearchBarProvider from '../context/SearchBarProvider';
import RecipeDetailsProvider from '../context/RecipeDetailsProvider';
import DoneRecipes from '../pages/DoneRecipes';

const date = '23/06/2020';

const MockLocalStorage = [
  {
    id: '52771',
    type: 'meal',
    nationality: 'Italian',
    category: 'Vegetarian',
    alcoholicOrNot: '',
    name: 'Spicy Arrabiata Penne',
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
    renderWithRouter(
      <RecipeDetailsProvider>
        <DoneRecipes />
      </RecipeDetailsProvider>,
    );

    const buttonFilterByMeal = await screen.findByTestId('filter-by-meal-btn');
    userEvent.click(buttonFilterByMeal);

    const nameRecipe = screen.getByTestId('0-horizontal-name');
    expect(nameRecipe.innerHTML).toBe('Spicy Arrabiata Penne');
    expect(screen.queryByTestId('1-horizontal-name')).not.toBeInTheDocument();

    const buttonFilterByDrinks = await screen.findByTestId('filter-by-drink-btn');
    userEvent.click(buttonFilterByDrinks);

    expect(screen.queryByTestId('0-horizontal-name').innerHTML).toBe('Aquamarine');

    const buttonFilterByAll = await screen.findByTestId('filter-by-all-btn');
    userEvent.click(buttonFilterByAll);

    expect(screen.queryByTestId('0-horizontal-name').innerHTML).toBe('Spicy Arrabiata Penne');
    expect(screen.queryByTestId('1-horizontal-name').innerHTML).toBe('Aquamarine');

    // userEvent.click(screen.getByTestId('0-horizontal-share-btn'));

    // const input = screen.getByTestId('0-shared');

    // userEvent.paste(input, window.ClipboardItem);

    // expect(input).toHaveValue();
  });
});
