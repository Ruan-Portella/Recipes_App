import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderWithRouter from './helpers/renderWithRouter';
import SearchBarProvider from '../context/SearchBarProvider';
import oneMeal from '../../cypress/mocks/oneMeal';
import App from '../App';
import RecipeDetailsProvider from '../context/RecipeDetailsProvider';
import RecipeInProgressProvider from '../context/RecipeInProgressProvider';

// beforeEach(() => {
//   (
//     global.fetch = jest.fn(async () => ({
//       json: async () => oneMeal,
//     }))
//   );
// });

const fetchResolved = (data) => () => new Promise((resolve) => {
  resolve({
    json: () => Promise.resolve({
      ...data,
    }),
  });
});

const historyPush = '/meals/52771/in-progress';
const ingredient0 = '0-ingredient-name-and-measure';

describe('Testa a página de receitas em Progresso com uma receita de /meal/', () => {
  const mockLocal = {
    drinks: {},
    meals: { 52771: [] },
  };

  const mockLocalWithAllIngredients = {
    drinks: {},
    meals: { 52771: ['penne rigate', 'olive oil', 'garlic', 'chopped tomatoes', 'red chile flakes', 'italian seasoning', 'basil', 'Parmigiano-Reggiano'] },
  };

  test('Testa se o checkbox é renderizado e adiciona o ingrediente no localStorage', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(fetchResolved({ meals: oneMeal.meals }));

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
      history.push(historyPush);
      const title = screen.getByTestId(ingredient0);
      expect(title).toBeInTheDocument();
    });

    const check = screen.getByRole('checkbox', { name: /penne rigate 1 pound/i });
    userEvent.click(check);
    const local = localStorage.getItem('inProgressRecipes');
    expect(JSON.parse(local)).toEqual(mockLocal);
  });

  test('Testa se o checkbox continua marcado e o localStorage permanece após atualizar a página', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(fetchResolved({ meals: oneMeal.meals }));

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
      history.push(historyPush);
      const title = screen.getByRole('heading', { name: /spicy arrabiata penne/i });
      expect(title).toBeInTheDocument();
    });
    const check = screen.getByRole('checkbox', { name: /penne rigate 1 pound/i });
    userEvent.click(check);
    const local = localStorage.getItem('inProgressRecipes');
    expect(JSON.parse(local)).toEqual({
      drinks: {},
      meals: { 52771: [] },
    });

    await waitFor(() => {
      history.push('/meals/5277/in-progress');
    });

    await waitFor(() => {
      history.push(historyPush);
      const title = screen.getByRole('heading', { name: /spicy arrabiata penne/i });
      expect(title).toBeInTheDocument();
    });
  });

  test('Testa se o checkbox é desmarcado e o ingrediente removido do localStorage', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(fetchResolved({ meals: oneMeal.meals }));

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
      history.push(historyPush);

      const title = screen.getByRole('heading', { name: /spicy arrabiata penne/i });
      expect(title).toBeInTheDocument();
    });
    const check = screen.getByRole('checkbox', { name: /penne rigate 1 pound/i });
    userEvent.click(check);
    const local = localStorage.getItem('inProgressRecipes');
    expect(JSON.parse(local)).toEqual({
      drinks: {},
      meals: { 52771: [] },
    });
  });

  test('Testa se ao marcar todos os checkbox o botão de /Finish Recipe/ é habilitado e renderiza /done-recipes/ ao clic', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(fetchResolved({ meals: oneMeal.meals }));

    // localStorage.setItem('inProgressRecipes', JSON.stringify(mockLocalWithAllIngredients));
    const { history } = renderWithRouter(
      <RecipeInProgressProvider>
        <App />
      </RecipeInProgressProvider>,
    );

    act(() => {
      history.push(historyPush);
    });

    await waitFor(() => {
      expect(history.location.pathname).toBe(historyPush);
      const title = screen.getByTestId(ingredient0);
      expect(title).toBeInTheDocument();
    });

    const checkbox0 = screen.getByTestId('0-ingredient');
    const checkbox1 = screen.getByTestId('1-ingredient');
    const checkbox2 = screen.getByTestId('2-ingredient');
    const checkbox3 = screen.getByTestId('3-ingredient');
    const checkbox4 = screen.getByTestId('4-ingredient');
    const checkbox5 = screen.getByTestId('5-ingredient');
    const checkbox6 = screen.getByTestId('6-ingredient');
    const checkbox7 = screen.getByTestId('7-ingredient');
    userEvent.click(checkbox0);
    // userEvent.click(checkbox0);
    userEvent.click(checkbox1);
    userEvent.click(checkbox2);
    userEvent.click(checkbox3);
    userEvent.click(checkbox4);
    userEvent.click(checkbox5);
    userEvent.click(checkbox6);
    userEvent.click(checkbox7);

    await waitFor(() => {
      const buttonFinish = screen.getByTestId('finish-recipe-btn');
      expect(buttonFinish).toBeEnabled();
      userEvent.click(buttonFinish);
      const title = screen.getByTestId('filter-by-all-btn');
      expect(title).toBeInTheDocument();
    });
  });

  test('Testa a função de compartilhar foi chamada', async () => {
    const clipboardMock = {
      writeText: jest.fn(),
    };
    Object.defineProperty(window.navigator, 'clipboard', {
      value: clipboardMock,
    });

    jest.spyOn(global, 'fetch').mockImplementation(fetchResolved({ meals: oneMeal.meals }));

    localStorage.setItem('inProgressRecipes', JSON.stringify(mockLocalWithAllIngredients));
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
      history.push(historyPush);
      const title = screen.getByRole('heading', { name: /spicy arrabiata penne/i });
      expect(title).toBeInTheDocument();
    });
    const share = screen.getByRole('button', { name: /compartilhar/i });
    userEvent.click(share);
    expect(clipboardMock.writeText).toHaveBeenCalled();
  });

  test('teste 10', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(fetchResolved({ meals: oneMeal.meals }));
    const { history } = renderWithRouter(
      <RecipeInProgressProvider>
        <App />
      </RecipeInProgressProvider>,
    );

    act(() => {
      history.push(historyPush);
    });

    await waitFor(() => {
      expect(history.location.pathname).toBe(historyPush);
      const title = screen.getByTestId(ingredient0);
      expect(title).toBeInTheDocument();
    });

    const checkbox0 = screen.getByTestId(ingredient0);
    const checkbox1 = screen.getByTestId('1-ingredient-name-and-measure');
    const checkbox2 = screen.getByTestId('2-ingredient-name-and-measure');
    const checkbox3 = screen.getByTestId('3-ingredient-name-and-measure');
    const checkbox4 = screen.getByTestId('4-ingredient-name-and-measure');
    const checkbox5 = screen.getByTestId('5-ingredient-name-and-measure');
    const checkbox6 = screen.getByTestId('6-ingredient-name-and-measure');
    const checkbox7 = screen.getByTestId('7-ingredient-name-and-measure');
    userEvent.click(checkbox0);
    userEvent.click(checkbox1);
    userEvent.click(checkbox2);
    userEvent.click(checkbox3);
    userEvent.click(checkbox4);
    userEvent.click(checkbox5);
    userEvent.click(checkbox5);
    userEvent.click(checkbox6);
    userEvent.click(checkbox7);

    const buttonFinish = screen.getByTestId('finish-recipe-btn');
    expect(buttonFinish).toBeDisabled();
  });

  test('teste 11', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(fetchResolved({ meals: oneMeal.meals }));
    const { history } = renderWithRouter(
      <RecipeInProgressProvider>
        <App />
      </RecipeInProgressProvider>,
    );

    act(() => {
      history.push(historyPush);
    });

    await waitFor(() => {
      expect(history.location.pathname).toBe(historyPush);
      const title = screen.getByTestId(ingredient0);
      expect(title).toBeInTheDocument();
    });

    const favoriteBtn = screen.getByTestId('favorite-btn');
    userEvent.click(favoriteBtn);
  });
});
