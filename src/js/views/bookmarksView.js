import View from './View';
import previewView from './previewView';

class BookmarksView extends View{
    _parentElement = document.querySelector('.bookmarks__list');
    _errorMessage = "No recipes bookmarked.";
    _successMessage = "Start by searching for a recipe or an ingredient. Have fun!";

    addHandlerRender(handler){
        window.addEventListener('load', handler());
    }

    _generateMarkup(){
        return this._data.map(bookmark => previewView.render(bookmark, false)).join('');
    }
}

export default new BookmarksView();