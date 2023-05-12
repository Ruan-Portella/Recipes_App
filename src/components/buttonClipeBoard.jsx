import React from 'react';
import copy from 'clipboard-copy';
import shareIcon from '../images/shareIcon.svg';

const buttonClipeBoard = (type, id, recipeIndex, { state }) => (
  <div>
    <button
      onClick={ () => {
        copy(`http://localhost:3000/${type}s/${id}`);
        state.setShared(true);
      } }
    >
      <img
        data-testid={ `${recipeIndex}-horizontal-share-btn` }
        src={ shareIcon }
        alt="favorite"
      />
    </button>
    {
      state.shared && (
        <span
          data-testid={ `${recipeIndex}-shared` }
        >
          Link copied!
        </span>)
    }
  </div>
);

export default buttonClipeBoard;
