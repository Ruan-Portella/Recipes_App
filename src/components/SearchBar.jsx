import React, { useContext, useState } from 'react';
import SearchBarContext from '../context/SearchBarContext';

export default function SearchBar() {
  const [radioValue, setRadioValue] = useState('');
  const [inputValue, setInputValue] = useState('');
  const { searchBtn } = useContext(SearchBarContext);

  return (
    <div>
      <input
        data-testid="search-input"
        value={ inputValue }
        onChange={ ({ target }) => setInputValue(target.value) }
      />
      <input
        type="radio"
        data-testid="ingredient-search-radio"
        name="radioInput"
        value="Ingredient"
        onChange={ ({ target }) => setRadioValue(target.value) }
      />
      Ingredient
      <input
        type="radio"
        data-testid="name-search-radio"
        name="radioInput"
        value="Name"
        onChange={ ({ target }) => setRadioValue(target.value) }
      />
      Name
      <input
        type="radio"
        data-testid="first-letter-search-radio"
        name="radioInput"
        value="First letter"
        onChange={ ({ target }) => setRadioValue(target.value) }
      />
      First Letter
      <button
        data-testid="exec-search-btn"
        onClick={ () => searchBtn(inputValue, radioValue) }
      >
        Search
      </button>
    </div>
  );
}
