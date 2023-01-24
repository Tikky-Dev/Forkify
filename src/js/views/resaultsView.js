import View from './View';
import previewView from './previewView';


class ReasultView extends View{
    _parentElement = document.querySelector('.results');
    _errorMessage = "No recipes found for this serch.";
    _successMessage = "Start by searching for a recipe or an ingredient. Have fun!";

    _generateMarkup(){
        return this._data.map(recipe => previewView.render(recipe, false)).join('');
    }
}

export default new ReasultView();