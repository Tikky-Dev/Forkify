import { async } from "regenerator-runtime";
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
    }
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

export {state, loadRecipe, loadSearchResults, getSearchResultPage};