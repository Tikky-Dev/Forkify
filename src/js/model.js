import { API_URL } from "./config";
import { getJSON } from "./helpers";

const state = {
    recipe: {},
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
        console.error("Caught error in model: " + err);
    }
}

export {state, loadRecipe};