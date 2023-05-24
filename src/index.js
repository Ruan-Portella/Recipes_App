import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { HashRouter } from 'react-router-dom/cjs/react-router-dom.min';
import App from './App';
import * as serviceWorker from './serviceWorker';
import SearchBarProvider from './context/SearchBarProvider';
import RecipeDetailsProvider from './context/RecipeDetailsProvider';
import RecipeInProgressProvider from './context/RecipeInProgressProvider';

ReactDOM
  .createRoot(document.getElementById('root'))
  .render(
    <HashRouter>
      <SearchBarProvider>
        <RecipeDetailsProvider>
          <RecipeInProgressProvider>
            <App />
          </RecipeInProgressProvider>
        </RecipeDetailsProvider>
      </SearchBarProvider>
    </HashRouter>,
  );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
