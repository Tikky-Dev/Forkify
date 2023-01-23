import View from './View';

class ReasultView extends View{
    _parentElement = document.querySelector('.results');
    _errorMessage = "No recipes found for this serch.";
    _successMessage = "Start by searching for a recipe or an ingredient. Have fun!";

    _generateMarkup(){
        return this._data.map(this._generateMarkupPreview).join('');
       
    }
    _generateMarkupPreview(res){
       return `
            <li class="preview">
                <a class="preview__link" href="#${res.id}">
                <figure class="preview__fig">
                    <img src="${res.image}" alt="${res.title}" />
                </figure>
                <div class="preview__data">
                    <h4 class="preview__title">${res.title}</h4>
                    <p class="preview__publisher">${res.publisher}</p>
                </div>
                </a>
            </li>
        `;
    }
}

export default new ReasultView();