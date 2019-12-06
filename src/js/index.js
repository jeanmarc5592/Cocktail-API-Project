import styles from '../sass/main.scss';
import testImg1 from '../../dist/img/Test-Image-1.jpg';
import testImg2 from '../../dist/img/Test-Image-2.jpg';
import testImg3 from '../../dist/img/Test-Image-3.jpg';
import testImg4 from '../../dist/img/Test-Image-4.jpg';
import testImg5 from '../../dist/img/Test-Image-5.jpg';
import testImg6 from '../../dist/img/Test-Image-6.png';
import { DOM, navigationToggle, loadingSpinner, clearSpinner, startingAnimation, renderStart, clearInterface, isActive }  from './views/base';
import Search from './models/Search';
import * as searchView from './views/searchView';
import Detail from './models/Detail';
import * as detailView from './views/detailView';
import Related from './models/Related';
import * as relatedView from './views/relatedView';
import Favorites from './models/Favorites';
import * as favoritesView from './views/favoritesView';
import Surprise from './models/Surprise';
import * as surpriseView from './views/surpriseView';


$(function () {
    
    /**********************
    **** START THE APP ****
    ***********************/
    
    // GET THE APP STARTED
    $(DOM.getStartedBtn).click(() => {
        startingAnimation($(DOM.rightInterface));
        renderStart();
    });

    // PREVENTS PAGE RELOAD WHEN THE FORM IS SUBMITTED
    $(document).ready(function() {
        searchView.noReload(document, 'submit', $(DOM.searchForm));
    });
    
    
    
    /*******************
    **** NAVIGATION ****
    ********************/
    
    // PAGE RELOAD 
    $(DOM.mainLogo).click(() => {
        location.reload();
    });
    
    // NAVIGATION HANDLING
    $(DOM.navigation).click(event => {
        navigationToggle(event, $(this));

        // When START inside the navigation is clicked, render the start-card
        if(event.target.matches('*[data-direction="start"]')) {
            clearInterface();
            renderStart();
        }
        
        // When SEARCH inside the navigation is clicked, display the search-card
        if(event.target.matches('*[data-direction="search"]')) {
            clearInterface();
            searchView.renderSearch();
        }

        // When FAVORITES inside the navigation is clicked, display the favorites-card
        if(event.target.matches('*[data-direction="favorites"]')) {
            clearInterface();
            if(state.favorites) favoritesView.renderFavorites(state.favorites);
        }

        // When SURPRISE inside the navigation is clicked, display the surprise-card
        if(event.target.matches('*[data-direction="surprise"]')) {
            clearInterface();
            surpriseView.renderSurpriseCard();
        }
    });

    
    
    
    
    /*********************
    **** STATE OBJECT ****
    **********************/
    
    // Global object which stores the actual state of the app
    const state = {};
    
    // Initialize Favorites at the start
    state.favorites = new Favorites();




    
    



    
    /**************************
    **** SEARCH CONTROLLER ****
    ***************************/
    const controlSearch = async () => {
        // Recieve the type and the user's input from the UI 
        const query = searchView.getInput();
        const type = searchView.getType();
        
        if(query && type) {
            // Create a new Search Class and save it to the state-object
            state.search = new Search(query, type);

            // Clear the input
            searchView.clearInput();

            // Clear Interface
            clearInterface();

            // Display the loading animation
            loadingSpinner(DOM.interactions);

            try {
                // If user searches for a cocktail, make API Request for a cocktail
                if(state.search.type === 'cocktail') {
                    // 1. Get data
                    await state.search.getCocktail();
                    // 2. Clear the Loader
                    clearSpinner();
                    // 3. If data was found, render it to the UI ... If NOT, render Error-Message to the UI
                    return (state.search.cocktail !== null ? searchView.renderCocktail(state.search.cocktail[0]) : alert('Error, try again!'));
                    


                // If user searches for an ingredient, make API Request for an ingredient
                } else if(state.search.type === 'ingredient') {
                    // 1. Get data
                    await state.search.getIngredient();
                    // 2. Clear the Loader
                    clearSpinner();
                    // 3. If data was found, render it to the UI ... If NOT, render Error-Message to the UI
                    return (state.search.ingredient !== null ? searchView.renderIngredient(state.search.ingredient[0]) : alert('Error, try again!'));
                }
            } catch(error) {
                console.log(error);
            }
        }
        
    }
    // EVENTLISTENERS
    
    // Handles all KEYDOWN events corresponding to search
    $(document).on('keydown', e => {
        // When ENTER (keycode --> 13) is pressed, apply controlSearch()
        if(searchView.enterPressed(e)) {
            controlSearch();
        }
    });

    // Handles all CLICK events corresponding to search
    $(DOM.interactions).click(e => {
        // When the search button is clicked, apply controlSearch
        if(e.target.matches(DOM.searchBtn)) {
            controlSearch();
        };

        // When the back-button on the result- or ingredient-card is clicked, go back to the search-card
        if(e.target.matches('*[data-direction="search"]') || e.target.matches('*[data-direction="result"]')) {
            clearInterface();
            state.detail = '';
            searchView.renderSearch();
        }

        // When user clicks the cocktail's title, render the corresponding details  
        if(e.target.matches('*[data-direction="detail"]')) {
            const cocktailID = e.target.id;
            state.detail = new Detail(cocktailID);
            controlDetail(cocktailID);
        }

        // Show and cut the ingredient description 
        if(e.target.matches(DOM.moreTextButton)) {
            searchView.slideDown();
        } else if(e.target.matches(DOM.lessTextButton)) {
            searchView.slideUp();
        }
    });



 
    

    
    /****************************
    **** DETAIL CONTROLLER ****
    *****************************/
    const controlDetail = async (id) => {
        const inputID = id;

        if(inputID) {
        
            if(!state.detail) state.detail = new Detail(inputID);

            // Clear Interface
            clearInterface();

            // Loading Animation
            loadingSpinner(DOM.interactions);
            
            try {
                // Recieve Data
                await state.detail.getDetail();
                // Clear the spinner
                clearSpinner();
                // Structure Measurements, Ingredients and Directions into a seperate array
                state.detail.structureMeasurements(state.detail.details);
                state.detail.structureIngredients(state.detail.details);
                state.detail.structureDirections(state.detail.details);
                // Parse Measurements and Ingredients into one array
                state.detail.parseItems(state.detail.ingredients, state.detail.measurements);
                // Render Details to the UI
                detailView.renderDetail(state.detail);
                // Render the heart-icon if it's liked oder unliked
                detailView.likedHeart(state.favorites.isLiked(state.detail.id));
                // Hide the Related-Button when FAVORITES or SURPRISE is active
                if(isActive('surprise') || isActive('favorites')) {
                    detailView.clearRelatedButton();
                }
            } catch(error) {
                alert(error);
            }
        }
    }
    // EVENTLISTENERS
    $(DOM.interactions).click(e => {
        if(e.target.matches('*[data-direction="related"]')) {
            controlRelated();
        }
    });
    
    

    
    
   
    
    
    
    /***************************
    **** RELATED CONTROLLER ****
    ****************************/
    const controlRelated = async () => {
        // If it's a cocktail
        if (state.search.type === 'cocktail') {
            // 1. Read a random ingredient
            state.detail.randomIngredient(state.detail.ingredients);
            // 2. Take a random Ingredient from it as the query
            const query = state.detail.randomIngredient;
            // 3. Save to the state-object
            state.related = new Related(query);
        
        // If it's an ingredient
        } else if (state.search.type === 'ingredient') {
            // 1. Take the ingredient's name as the query
            const query = state.search.query;
            // 2. Save to the state-object
            state.related = new Related(query);
        }

        // Clear Interface
        clearInterface();

        // Loading Animation
        loadingSpinner(DOM.interactions);

        try {
            await state.related.getRelated();
            clearSpinner();
            // Choose 10 random drinks and return them inside an array (state.related.drinks)
            state.related.getDrinks(state.related.related);
            // Render results to the UI
            relatedView.renderRelated(state.related);
        } catch(error) {
           alert(error);
        }

    };
    // EVENTLISTENERS
    $(DOM.interactions).click(e => {
        // Apply controlFavorites() when the Heart-Button is clicked
        if(e.target.matches(DOM.heartIcon)) {
            controlFavorites(e);
        }
    });
    
    
    
    
    
    
    
    
    
    /*****************************
    **** FAVORITES CONTROLLER ****
    ******************************/
    const controlFavorites = (e) => {
        if(!state.favorites) state.favorites = new Favorites();

        const id = e.target.dataset.id;

        // IF DRINK IS NOT LIKED --> ADD IT
        if(!state.favorites.isLiked(id)) {
            // Create parameters for the like
            const name = e.target.dataset.name;
            const img = e.target.dataset.img;
            // Add it to the favorites
            state.favorites.addFavorite(id, name, img); 
            // Render the liked heart
            favoritesView.renderHeartLiked();
            // Make FAVORITES shiver when favorite is added
            favoritesView.favoritesShiver();
               
        
        // IF DRINK IS LIKED --> DELETE IT
        } else {
            // Delete the drink from favorites
            state.favorites.deleteFavorite(id);
            // Render the unliked heart
            favoritesView.renderHeartUnliked();
        }
        // Update the amount of the total favorites
        state.favorites.likesAmount(state.favorites.favorites);
    };
    // EVENTLISTENERS 
    $(DOM.interactions).click(e => {
        // If FAVORITES is active in the navigation
        if(isActive('favorites')) {
            // And the back button inside the details is clicked
            if(e.target.matches('*[data-direction="result"], [data-direction="search"]')) {
                // Clear UI and render the favorites instead of the result or search
                clearInterface();
                favoritesView.renderFavorites(state.favorites);
            }
        }
        
        // Delete a drink from the favorites 
        if(e.target.matches(DOM.deleteButton)) {
            // Delete it from the favorites array
            const currentID = $(e.target).prev().children()[0].id;
            state.favorites.deleteFavorite(currentID);
            // Delete it from the UI
            const currentDrink = $(e.target).parent();
            favoritesView.clearFavorite(currentDrink);
            // Update the amount in the UI
            state.favorites.likesAmount(state.favorites.favorites);
            favoritesView.updateAmount(state.favorites.amount);
        }
    });
    



    

    
    
   
    
    /****************************
    **** SURPRISE CONTROLLER ****
    *****************************/
    const controlSurprise = async () => {
        state.surprise = new Surprise();

        // Clear Interface
        clearInterface();

        // Loading Animation
        loadingSpinner(DOM.interactions);

        try {
            // Get DATA
            await state.surprise.getSurprise();
            // Clear UI
            clearSpinner();
            // Render Surprise Drink to the UI
            surpriseView.renderSurprise(state.surprise);
        } catch(error) {
            alert(error);
        }
    }
    // EVENTLISTENERS
    $(DOM.interactions).click(e => {
        // If the surprise me button is clicked, apply controlSurprise()
        if(e.target.matches(DOM.surpriseButton)) {
            controlSurprise();
        }   
        
        // If SURPRISE is active in the navigation
        if(isActive('surprise')) {
            // When the back button inside the details is clicked
            if(e.target.matches('*[data-direction="result"]')) {
                // Clear UI and render surprise instead of the result --> data-direction="result" is originally from detailView.renderDetail();
                clearInterface();
                surpriseView.renderSurprise(state.surprise);
            }
        }
    });
});


