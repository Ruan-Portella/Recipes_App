import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Meals from './pages/Meals';
import MealsRecipe from './pages/MealsRecipe';
import Drinks from './pages/Drinks';
import DrinksRecipes from './pages/DrinksRecipes';
import MealsRecipeProgress from './pages/MealsRecipeProgress';
import DrinksRecipesProgress from './pages/DrinksRecipeProgress';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/meals" component={ Meals } />
      <Route exact path="/meals/:id" component={ MealsRecipe } />
      <Route exact path="/drinks" component={ Drinks } />
      <Route exact path="/drinks/:id" component={ DrinksRecipes } />
      <Route exact path="/meals/:id/in-progress" component={ MealsRecipeProgress } />
      <Route exact path="/drinks/:id/in-progress" component={ DrinksRecipesProgress } />
      <Route exact path="/profile" component={ Profile } />
      <Route exact path="/done-recipes" component={ DoneRecipes } />
      <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
    </Switch>
  );
}

export default App;

// Rota "/": não possui header
// Rota "/meals": possui o header com o título "Meals" e os ícones de perfil e pesquisa
// Rota "/drinks": possui o header com o título "Drinks" e os ícones de perfil e pesquisa
// Rota "/meals/:id-da-receita": não possui header
// Rota "/drinks/:id-da-receita": não possui header
// Rota "/meals/:id-da-receita/in-progress": não possui header
// Rota "/drinks/:id-da-receita/in-progress": não possui header
// Rota "/profile": possui o header com o título "Profile" e o ícone de perfil, mas sem o ícone de pesquisa
// Rota "/done-recipes": possui o header com o título "Done Recipes" e o ícone de perfil, mas sem o ícone de pesquisa
// Rota "/favorite-recipes": possui o header com o título "Favorite Recipes" e o ícone de perfil, mas sem o ícone de pesquisa
