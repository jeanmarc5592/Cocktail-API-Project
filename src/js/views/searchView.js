import { DOM } from './base'


    
// GET THE USER'S TEXT INPUT    
export const getInput = () => {
    return $(DOM.userInput).val();
};


// CLEAR THE USER'S INPUT
export const clearInput = () => {
    return $(DOM.userInput).val('');
}


// GET THE VALUE OF THE CHECKED RADIO BUTTON
export const getType = () => {
    return $(DOM.checkedRadio).val();
};



// RENDER THE COCKTAIL TO THE UI
export const renderCocktail = cocktail => {

    const imgSettings = `
        background: url('${cocktail.strDrinkThumb}'); 
        background-size: cover; 
        background-position: center;
    `;

    const markup = `
        <div id="result" class="card-result">
            
                <div class="headline-bar">
                    
                    <div class="headline-icon">
                        <img data-direction="search" class="back-button" src="icons/back-icon.svg" alt="back">
                    </div>
                    
                    <div class="headline-name headline-name--result">
                        
                        <span id="${cocktail.idDrink}" data-direction="detail" class="headline-text headline-text--result">${cocktail.strDrink}</span>
                        
                    </div>
                </div>
                
                <div class="card-result-img" style="${imgSettings}">
                    &nbsp;
                </div>
              
        </div>
    `;

    $(DOM.interactions).append(markup);
};



// CREATE THE INGREDIENT DISCRIPTION --> CUTTED
const createDescription = input => 
    `
        <span>
            ${input.substring(0,300)}
            <a id="more" href="#">Read More</a>
        </span>
        <span id="moretext">
            ${input.substring(300,input.length)}
            <br>
            <a id="less" href="#">Read Less</a>
        </span>
    `;



// SHOW THE SECOND PART OF THE DESCRIPTION
export const slideDown = () => {
    $(DOM.moreTextButton).fadeOut(500);
    $(DOM.moreText).delay(500).slideDown(1000);
    $(DOM.lessTextButton).delay(1500).fadeIn(500);
};



// CUT THE SECOND PART OF THE DESCRIPTION
export const slideUp = () => {
    $(DOM.lessTextButton).fadeOut(500);
    $(DOM.moreText).delay(500).slideUp(1000);
    $(DOM.moreTextButton).delay(1500).fadeIn(500);
};



// RENDER THE INGREDIENT TO THE UI
export const renderIngredient = ingredient => {
    
    const markup = `
        <div id="ingredient" class="card-ingredient">
            <div class="headline-bar">
                
                <div class="headline-icon">
                    <img data-direction="search" class="back-button" src="icons/back-icon.svg" alt="back">
                </div>
                
                <div class="headline-name headline-name--result">
                    <span class="headline-text headline-text--result">${ingredient.strIngredient}</span>
                </div>
            </div>

            <div class="card-ingredient-description">
                <div class="card-detail-heading">
                    <span class="card-detail-heading--white">About ${ingredient.strIngredient}</span>
                </div>

                <span class="card-ingredient-description--text">
                    ${createDescription(ingredient.strDescription)}
                </span>
            </div>

            <button data-direction="related" id="${ingredient.idIngredient}" class="btn btn--green btn-full">
                Related Drinks
            </button>
        </div>
    `;
    $(DOM.interactions).append(markup);
    $(DOM.moreText).hide();
};




// RENDER SEARCH CARD TO THE UI
export const renderSearch = () => {

    const markup = `
        <div class="card-search">
                                
            <form class="card-search-form">
                
                <div class="card-search-container"> 
                    <label class="card-search-label" for="question-1">1) What would you like to search?</label>
                    <input class="card-search-checkbox" type="radio" name="question-1" value="ingredient"><span class="card-search-checkmark">Ingredient</span>
                    <input class="card-search-checkbox" type="radio" name="question-1" value="cocktail" checked><span class="card-search-checkmark">Cocktail</span>
                </div>
                
                <div class="card-search-container"> 
                    <label class="card-search-label" for="question-2">2) Insert the name</label>
                    <input class="card-search-input" type="text" name="question-2" placeholder="i.e. Whiskey Sour">
                </div>
                
                <button type="button" id="search-button" class="btn btn--green">Search</button>
            </form>
        </div>
    `;

    $(DOM.interactions).append(markup);
};



// DETERMINE IF ENTER IS PRESSED OR NOT
export const enterPressed = e => {
    const x = e.keyCode || e.which;
    return(x == 13);
}



// PREVENT PAGE RELOAD 
export const noReload = (parent, event, trigger) => {
    $(parent).on(event, trigger , () => {
        return false;
    });
}
