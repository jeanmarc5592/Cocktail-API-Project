import * as searchView from './searchView';

// DOM ELEMENTS
export const DOM = {
    navigation: '.navigation',
    mainLogo: '.logo-container',
    arrow: '.arrow-img',
    cocktail: '.background-element', 
    getStartedBtn: '.start',
    rightInterface: '.main--right',
    spinner: '.spinner',
    phone: '.phone',
    backBtn: '.headline-icon',
    checkedRadio: 'input[name="question-1"]:checked',
    userInput: 'input[name="question-2"]',
    searchBtn: '#search-button',
    interactions: '.interactions',
    resultCard :'.card-result',
    searchCard: '.card-search',
    ingredientDescription: '.card-ingredient-description--text',
    moreTextButton: '#more',
    lessTextButton: '#less',
    moreText: '#moretext',
    favoritesCard: '.card-favorites',
    favoritesAmount: '.card-favorites-amount',
    favoritesAmountText: '.card-favorites-text',
    searchForm: '.card-search-form',
    heartIcon: '#like-drink',
    deleteButton: '#delete-drink',
    surpriseButton: '#surprise-button',
    relatedButton : '#related-button'
}

// CLEAR THE INTERFACE
export const clearInterface = () => {
    $(DOM.interactions).empty()
};

// START ANIMATION
export const startingAnimation = parent => {
    // 1. All children of the home screen fade out
    $(parent).children().fadeOut(1000);
    // 2. Loadingspinner comes in, stays for 5 seconds and disappears
    setTimeout(() => {
        loadingSpinner(parent);
        $(DOM.arrow).remove();
        $(DOM.cocktail).remove();
    }, 1000);
    setTimeout(() => {
        clearSpinner();
    }, 3000);
    // 3. Radial-gradient comes in and phone component fades in
    setTimeout(() => {
        $(parent).css('background', 'radial-gradient(#FF9F43, #FDC830)');
    }, 4000);
    setTimeout(() => {
        $(DOM.phone).fadeIn(2000);
    }, 4000);
}



// NAVIGATION TOGGLING
export const navigationToggle = (e, parent) => {
    const el = e.target;
    const id = e.target.id;
    const activeItem = $(parent).find('.is-active');
    const activeId = activeItem[0].id;
    
    if(!$(el).hasClass('is-active') && $(el).hasClass('navigation-item')) {
        // Remove is-active from the current active item
        activeItem.removeClass('is-active');
        // Add is-active to the clicked item
        $(el).addClass('is-active');
    }
}


// LOADING SPINNER
export const loadingSpinner = parent => {
    const spinner = `
        <div class="spinner">
        <div class="bounce1"></div>
        <div class="bounce2"></div>
        <div class="bounce3"></div>
        </div>
    `;

    $(parent).append(spinner);
}
   

// CLEAR SPINNER
export const clearSpinner = () => {
    $(DOM.spinner).fadeOut(1000);
};



// RENDER START CARD TO THE UI

export const renderStart = () => {

    const markup = `
        <div class="card-start">
                                
            <ul class="card-start-list">
                <li class="card-start-item">
                    <i class="red-dot-icon">&dot;</i>
                    <span class="card-start-text">
                        Search your favorite drink out of 500+ cocktails and find all information you need
                    </span>
                </li>
                <li class="card-start-item">
                    <i class="red-dot-icon">&dot;</i>
                    <span class="card-start-text">
                        Receive information about each ingredient and what you can mix with it
                    </span>
                </li>
                <li class="card-start-item">
                    <i class="red-dot-icon">&dot;</i>
                    <span class="card-start-text">
                        Lacking inspiration? Generate a random cocktail and get surprised!
                    </span>
                </li>
                <li class="card-start-item">
                    <i class="red-dot-icon">&dot;</i>
                    <span class="card-start-text">
                        Store your most loved ones and come back to them whenever you want
                    </span>
                </li>
            </ul>
        </div>
    `;

    $(DOM.interactions).append(markup);
};



// DETERMINE IF NAVIGATION ELEMENT IS ACTIVE
export const isActive = element => {
    return $(DOM.navigation).find(`li + [data-direction='${element}']`).hasClass('is-active');
};



