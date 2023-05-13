import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import SearchBarProvider from '../context/SearchBarProvider';
import soupMeals from '../../cypress/mocks/soupMeals';
import App from '../App';
import RecipeDetailsProvider from '../context/RecipeDetailsProvider';
import RecipeInProgressProvider from '../context/RecipeInProgressProvider';

beforeEach(() => {
  (
    global.fetch = jest.fn(async () => ({
      json: async () => soupMeals,
    }))
  );
});

const URL_MEALS = '/meals/52973';

describe('Teste a dela de Detalhe de receitas', () => {
  test('verificando se ao clicar no botão start recipe é redirecionando para pagina de in-progress', async () => {
    const { history } = renderWithRouter(
      <SearchBarProvider>
        <RecipeDetailsProvider>
          <RecipeInProgressProvider>
            <App />
          </RecipeInProgressProvider>
        </RecipeDetailsProvider>
      </SearchBarProvider>,
    );
    history.push(URL_MEALS);

    const btnStart = await screen.findByRole('button', { name: /start recipe/i });
    userEvent.click(btnStart);
    const { pathname } = history.location;
    expect(pathname).toBe('/meals/52973/in-progress');
  });
  test('verificando se esta na pagina de detalhes de receita, botões favoritar, compartilhar e video', async () => {
    const { history } = renderWithRouter(
      <SearchBarProvider>
        <RecipeDetailsProvider>
          <RecipeInProgressProvider>
            <App />
          </RecipeInProgressProvider>
        </RecipeDetailsProvider>
      </SearchBarProvider>,
    );
    history.push(URL_MEALS);

    const title = await screen.findByRole('heading', { name: /leblebi soup/i });
    expect(title).toBeInTheDocument();
    const btnNotFavorite = screen.getByRole('img', { name: /notfavorited/i });
    const btnfavorite = screen.getByRole('img', { name: /favorite/i });
    userEvent.click(btnNotFavorite);
    expect(btnfavorite).toBeInTheDocument();
    userEvent.click(btnfavorite);
    const video = screen.getByTitle(/video/i);
    expect(video).toBeInTheDocument();
  });
  test('test botão de compartilhar', async () => {
    const { history } = renderWithRouter(
      <SearchBarProvider>
        <RecipeDetailsProvider>
          <RecipeInProgressProvider>
            <App />
          </RecipeInProgressProvider>
        </RecipeDetailsProvider>
      </SearchBarProvider>,
    );
    history.push(URL_MEALS);

    const btnCompartilhar = await screen.findByRole('button', { name: /compartilhar/i });
    expect(btnCompartilhar).toBeInTheDocument();
  });
  test('Testa a função de compartilhar foi chamada', async () => {
    const { history } = renderWithRouter(
      <SearchBarProvider>
        <RecipeDetailsProvider>
          <RecipeInProgressProvider>
            <App />
          </RecipeInProgressProvider>
        </RecipeDetailsProvider>
      </SearchBarProvider>,
    );
    const clipboardMock = {
      writeText: jest.fn(),
    };
    Object.defineProperty(window.navigator, 'clipboard', {
      value: clipboardMock,
    });
    await waitFor(() => {
      history.push(URL_MEALS);
      const title = screen.getByTestId('5-ingredient-name-and-measure');
      expect(title).toBeInTheDocument();
    });
    const share = screen.getByRole('button', { name: /compartilhar/i });
    userEvent.click(share);
    expect(clipboardMock.writeText).toHaveBeenCalled();
  });
});
