import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import SearchBarProvider from '../context/SearchBarProvider';
import oneMeal from '../../cypress/mocks/oneMeal';
import App from '../App';
import RecipeDetailsProvider from '../context/RecipeDetailsProvider';
import RecipeInProgressProvider from '../context/RecipeInProgressProvider';

describe('Testa a página de receitas em Progresso com uma receita de /meal/', () => {
  beforeEach(() => {
    (
      global.fetch = jest.fn(async () => ({
        json: async () => oneMeal,
      }))
    );
  });

  const mockLocal = {
    drinks: {},
    meals: { 52771: ['penne rigate'] },
  };

  const mockLocalWithoutIngredient = {
    drinks: {},
    meals: { 52771: [] },
  };

  const mockLocalWithAllIngredients = {
    drinks: {},
    meals: { 52771: ['penne rigate', 'olive oil', 'garlic', 'chopped tomatoes', 'red chile flakes', 'italian seasoning', 'basil', 'Parmigiano-Reggiano'] },
  };

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

    return history.push('/meals/52771/in-progress');
  };

  test('Testa se o checkbox é renderizado e adiciona o ingrediente no localStorage', async () => {
    // const { history } = renderWithRouter(
    //   <SearchBarProvider>
    //     <RecipeDetailsProvider>
    //       <RecipeInProgressProvider>
    //         <App />
    //       </RecipeInProgressProvider>
    //     </RecipeDetailsProvider>
    //   </SearchBarProvider>,
    // );

    funcToPush();
    await waitFor(() => {
      const title = screen.getByRole('heading', { name: /spicy arrabiata penne/i });
      expect(title).toBeInTheDocument();

      const check = screen.getByRole('checkbox', { name: /penne rigate 1 pound/i });
      userEvent.click(check);
      expect(check).toBeChecked();
    });
    const local = localStorage.getItem('inProgressRecipes');
    expect(JSON.parse(local)).toEqual(mockLocal);
  });

  test('Testa se o checkbox continua marcado e o localStorage permanece após atualizar a página', async () => {
    funcToPush();

    await waitFor(() => {
      const title = screen.getByRole('heading', { name: /spicy arrabiata penne/i });
      expect(title).toBeInTheDocument();
    });
    const check = screen.getByRole('checkbox', { name: /penne rigate 1 pound/i });
    expect(check).toBeChecked();
    const local = localStorage.getItem('inProgressRecipes');
    expect(JSON.parse(local)).toEqual(mockLocal);
  });

  test('Testa se o checkbox é desmarcado e o ingrediente removido do localStorage', async () => {
    funcToPush();

    await waitFor(() => {
      const title = screen.getByRole('heading', { name: /spicy arrabiata penne/i });
      expect(title).toBeInTheDocument();
    });
    const check = screen.getByRole('checkbox', { name: /penne rigate 1 pound/i });
    userEvent.click(check);
    expect(check).not.toBeChecked();
    const local = localStorage.getItem('inProgressRecipes');
    expect(JSON.parse(local)).toEqual(mockLocalWithoutIngredient);
  });

  test('Testa se ao marcar todos os checkbox o botão de /Finish Recipe/ é habilitado e renderiza /done-recipes/ ao clic', async () => {
    const { history } = renderWithRouter(
      <SearchBarProvider>
        <RecipeDetailsProvider>
          <RecipeInProgressProvider>
            <App />
          </RecipeInProgressProvider>
        </RecipeDetailsProvider>
      </SearchBarProvider>,
    );

    localStorage.setItem('inProgressRecipes', JSON.stringify(mockLocalWithAllIngredients));
    await waitFor(() => {
      history.push('/meals/52771/in-progress');
      const title = screen.getByRole('heading', { name: /spicy arrabiata penne/i });
      expect(title).toBeInTheDocument();
    });

    const buttonFinish = screen.getByRole('button', { name: /finish recipe/i });
    await waitFor(() => {
      expect(buttonFinish).toBeEnabled();
    });
    userEvent.click(buttonFinish);
    expect(history.location.pathname).toEqual('/done-recipes');
  });

  test('Testa a função de compartilhar foi chamada', async () => {
    const clipboardMock = {
      writeText: jest.fn(),
    };
    Object.defineProperty(window.navigator, 'clipboard', {
      value: clipboardMock,
    });
    funcToPush();
    await waitFor(() => {
      const title = screen.getByRole('heading', { name: /spicy arrabiata penne/i });
      expect(title).toBeInTheDocument();
    });
    const share = screen.getByRole('button', { name: /compartilhar/i });
    userEvent.click(share);
    expect(clipboardMock.writeText).toHaveBeenCalled();
  });
});
