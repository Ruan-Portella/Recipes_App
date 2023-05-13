import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import SearchBarProvider from '../context/SearchBarProvider';
import App from '../App';
import RecipeDetailsProvider from '../context/RecipeDetailsProvider';
import RecipeInProgressProvider from '../context/RecipeInProgressProvider';
import drinks from '../../cypress/mocks/drinks';

beforeEach(() => {
  (
    global.fetch = jest.fn(async () => ({
      json: async () => drinks,
    }))
  );
});

const URL_DRINKS = '/drinks/15997';

describe('Teste a dela de Detalhe de receitas', () => {
  // Pagina de delalhes de Driks

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
    history.push(URL_DRINKS);

    const btnStart = await screen.findByRole('button', { name: /start recipe/i });
    userEvent.click(btnStart);
    const { pathname } = history.location;
    expect(pathname).toBe('/drinks/15997/in-progress');
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
    history.push(URL_DRINKS);

    const heading = await screen.findByText(/ordinary drink/i);
    expect(heading).toBeInTheDocument();
    const alcohol = screen.getByText(/optional alcohol/i);
    expect(alcohol).toBeInTheDocument();
    const btnNotFavorite = screen.getByRole('img', { name: /notfavorited/i });
    const btnfavorite = screen.getByRole('img', { name: /favorite/i });
    userEvent.click(btnNotFavorite);
    expect(btnfavorite).toBeInTheDocument();
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
    history.push(URL_DRINKS);

    const btnCompartilhar = await screen.findByRole('button', { name: /compartilhar/i });
    expect(btnCompartilhar).toBeInTheDocument();
  });
});
