import { DOM } from './base';

const createFavorite = favorite => 
`
<div class="card-favorites-drink">
                                
    <div class="card-favorites-thumbnail" style="background-image:url('${favorite.img}'); background-size:cover;">
        &nbsp;
    </div>
                                
    <div class="card-related-name">
        <span data-direction="detail" id="${favorite.id}" class="card-related-text">${favorite.name}</span>
    </div>
                                
    <div id="delete-drink" class="card-favorites-button">
        X
    </div>
</div>
`;


export const renderFavorites = favorites => {
    
    const markup = 
    `
    <div class="card-favorites">
                            
        <div class="card-favorites-total">
            <p class="card-favorites-text">
                
            </p>
         </div>

         ${favorites.favorites.map(el => createFavorite(el)).join('')}

    </div>
    `;

    $(DOM.interactions).append(markup);
    updateAmount(favorites.amount);

}



export const clearFavorite = element => {
    $(element).remove();
};



export const updateAmount = amount => { 
    if(amount !== undefined) {
        $(DOM.favoritesAmountText).html(`Total: ${amount} Cocktail${amount > 1 || amount === 0 ? 's' : ''}`);
    } else {
        $(DOM.favoritesAmountText).html('Total: 0 Cocktails');
    }
};


export const favoritesShiver = () => {
    $(DOM.navigation).find('*[data-direction="favorites"]').addClass('shiver');
    setTimeout(() => {
        $(DOM.navigation).find('*[data-direction="favorites"]').removeClass('shiver');
    }, 2000);
}


export const renderHeartLiked = () => {
    $(DOM.heartIcon).attr('src', 'icons/heart-icon-liked.svg');
};


export const renderHeartUnliked = () => {
    $(DOM.heartIcon).attr('src', 'icons/heart-icon-unliked.svg');
};