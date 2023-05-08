import React from 'react';

export default function SearchBar() {
  return (
    <div>
      <input data-testid="search-input" />
      <input type="radio" data-testid="ingredient-search-radio" />
      <input type="radio" data-testid="name-search-radio" />
      <input type="radio" data-testid="first-letter-search-radio" />
      <button data-testid="exec-search-btn" />
    </div>
  );
}
