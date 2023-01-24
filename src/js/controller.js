
import 'core-js';
import 'regenerator-runtime/runtime';
import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import paginationView from './views/paginationView.js';
import resaultsView from './views/resaultsView.js';
import bookmarksView from './views/bookmarksView.js';

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

console.log("Test");

if(model.hot){
  module.hot.accept();
}

const controlRecipes = async function(){
  try{
    const id = window.location.hash.slice(1);

    if(!id) return;
    recipeView.renderSpinner();

    resaultsView.update(model.getSearchResultPage());
    
    await model.loadRecipe(id);
    
    recipeView.render(model.state.recipe);
    bookmarksView.update(model.state.bookmarks);
  }catch (err){
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    resaultsView.renderSpinner();

    // 1) Get search query
    const query = searchView.getQuery();
    if (!query) return;

    // 2) Load search results
    await model.loadSearchResults(query);

    // 3) Render results
    resaultsView.render(model.getSearchResultPage());

    // 4) Render initial pagination buttons
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};

const controlPagination = function(goToPage){
  resaultsView.render(model.getSearchResultPage(goToPage));

  paginationView.render(model.state.search);
}

const controlServings = function(newServings){
  model.updateServings(newServings);
  recipeView.update(model.state.recipe);
}

const controlToggleBookmark = function(){
  model.toggleBookmar(model.state.recipe);

  recipeView.update(model.state.recipe);

  bookmarksView.render(model.state.bookmarks);

}

const controlBookmarks = function(){
  bookmarksView.render(model.state.bookmarks);
}

const init = function(){
  bookmarksView.addHandlerRender(controlBookmarks);

  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlToggleBookmark);

  searchView.addHendlerSearch(controlSearchResults);
  
  paginationView.addHandlerClick(controlPagination);
}
init();
