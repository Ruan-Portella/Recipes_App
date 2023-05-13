/* eslint-disable sonarjs/no-duplicate-string */
import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import Drinks from '../pages/Drinks';
import SearchBarContext from '../context/SearchBarContext';
import renderWithRouter from './helpers/renderWithRouter';

const categoriesData = [
  { strCategory: 'Category 1' },
  { strCategory: 'Category 2' },
];

const recipesData = [
  {
    idDrink: '1',
    strDrink: 'Drink 1',
    strDrinkThumb: 'thumbnail1.jpg',
  },
  {
    idDrink: '2',
    strDrink: 'Drink 2',
    strDrinkThumb: 'thumbnail2.jpg',
  },
];

test('renders drinks page with categories and recipes', () => {
  renderWithRouter(
    <SearchBarContext.Provider value={ { recipesData, categoriesData } }>
      <Drinks />
    </SearchBarContext.Provider>,
  );
  expect(screen.getByText('Drinks')).toBeInTheDocument();
  expect(screen.getByText('Category 1')).toBeInTheDocument();
  expect(screen.getByText('Category 2')).toBeInTheDocument();
  expect(screen.getByTestId('All-category-filter')).toBeInTheDocument();
  expect(screen.getByText('Drink 1')).toBeInTheDocument();
  expect(screen.getByText('Drink 2')).toBeInTheDocument();
  expect(screen.getByAltText('Drink 1')).toHaveAttribute('src', 'thumbnail1.jpg');
  expect(screen.getByAltText('Drink 2')).toHaveAttribute('src', 'thumbnail2.jpg');
  expect(screen.getByTestId('footer')).toBeInTheDocument();
});

test('clicking All button triggers search', () => {
  const searchBtnMock = jest.fn();
  renderWithRouter(
    <SearchBarContext.Provider
      value={ {
        recipesData,
        categoriesData,
        searchBtn:
        searchBtnMock } }
    >
      <Drinks />
    </SearchBarContext.Provider>,
  );

  const allButton = screen.getByTestId('All-category-filter');
  fireEvent.click(allButton);

  expect(searchBtnMock).toHaveBeenCalledWith('', 'Name');
});
