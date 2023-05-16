import React, { useContext, useState } from 'react';
import SearchBarContext from '../context/SearchBarContext';
import '../styles/SearchBar.css';

export default function SearchBar() {
  const [radioValue, setRadioValue] = useState('');
  const [inputValue, setInputValue] = useState('');
  const { searchBtn } = useContext(SearchBarContext);

  return (
    <div className="search-content">
      <div className="search-input">
        <input
          data-testid="search-input"
          placeholder="Digite sua Busca..."
          value={ inputValue }
          onChange={ ({ target }) => setInputValue(target.value) }
        />
      </div>
      <div className="search-radio">
        <input
          type="radio"
          id="ingredient"
          data-testid="ingredient-search-radio"
          name="radioInput"
          value="Ingredient"
          onChange={ ({ target }) => setRadioValue(target.value) }
        />
        <label htmlFor="ingredient">Ingredient</label>
        <input
          type="radio"
          data-testid="name-search-radio"
          name="radioInput"
          value="Name"
          id="name"
          onChange={ ({ target }) => setRadioValue(target.value) }
        />
        <label htmlFor="name">Name</label>
        <input
          type="radio"
          data-testid="first-letter-search-radio"
          name="radioInput"
          value="First letter"
          id="first-letter"
          onChange={ ({ target }) => setRadioValue(target.value) }
        />
        <label htmlFor="first-letter">First Letter</label>
      </div>
      <button
        data-testid="exec-search-btn"
        onClick={ () => searchBtn(inputValue, radioValue) }
      >
        Search
      </button>
    </div>
  );
}
