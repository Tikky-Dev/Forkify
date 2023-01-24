import { API_URL, RESULT_PER_PAGE } from "./config";
import { getJSON } from "./helpers";
import resaultsView from "./views/resaultsView";

const state = {
    recipe: {},
    search: {
        querry: '',
        results: [],
        page: 1,
        resultPerPage: RESULT_PER_PAGE,
    },
    bookmarks: [],
}

const loadRecipe = async function(id) {
    try {
        const data = await getJSON(`${API_URL}/${id}`);

        const { recipe } = data.data;
        state.recipe = {
            id: recipe.id,
            title: recipe.title,
            publisher: recipe.publisher,
            sourceUrl: recipe.source_url,
            image: recipe.image_url,
            servings: recipe.servings,
            cookingTime: recipe.cooking_time,
            ingredients: recipe.ingredients
        };

        if(state.bookmarks.some(bm => bm.id === id)) state.recipe.bookmarked = true;
        else state.recipe.bookmarked = false;
    } catch (err) {
        throw err;
    }
}

const loadSearchResults = async function(querry){
    try {
        resaultsView.renderSpinner();
        state.search.querry = querry;
        const data = await getJSON(`${API_URL}?search=${querry}`);

        state.search.results = data.data.recipes.map(rec => {
            return {
                id: rec.id,
                title: rec.title,
                publisher: rec.publisher,
                image: rec.image_url
            }
        })

        state.search.page = 1;
    } catch (err) {
        throw err;
    }
}

const getSearchResultPage = function(page = state.search.page){
    state.search.page = page;
    const pageStart = (page - 1) * state.search.resultPerPage;
    const pageEnd = page * state.search.resultPerPage;
    return state.search.results.slice(pageStart, pageEnd);
}

const updateServings = function(newServings){
    state.recipe.ingredients.forEach(ing => {
        ing.quantity *= (newServings/state.recipe.servings);
    });

    state.recipe.servings = newServings;
}

const toggleBookmar = function(recipe){    
    if(recipe.id === state.recipe.id){
        state.recipe.bookmarked = !state.recipe.bookmarked;
    }

    if(state.recipe.bookmarked === true) state.bookmarks.push(recipe);
    if(state.recipe.bookmarked === false) {
        const index = state.bookmarks.findIndex(el => el.id === recipe.id);
        state.bookmarks.splice(index, 1);
    };

    localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
}

const init = function(){
    const storage = localStorage.getItem('bookmarks');
    if(storage) state.bookmarks = JSON.parse(storage);
}
init();

export {state, loadRecipe, loadSearchResults, getSearchResultPage, updateServings, toggleBookmar};