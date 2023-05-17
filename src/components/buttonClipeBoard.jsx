import React from 'react';
import copy from 'clipboard-copy';
import { ImShare2 } from 'react-icons/im';
// import shareIcon from '../images/shareIcon.svg';

const buttonClipeBoard = (type, id, recipeIndex, { state }) => (
  <div>
    <button
      onClick={ () => {
        copy(`http://localhost:3000/${type}s/${id}`);
        state.setShared(true);
      } }
    >
      <ImShare2 size={ 30 } color="#00BF63" />
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
