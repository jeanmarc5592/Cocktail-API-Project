import { DOM } from './base';


const createDrink = drink => 
`
    <div class="card-related-drink">
                                
        <div class="card-related-top">
        
            <div class="card-related-name">
                <span data-direction="detail" id="${drink.idDrink}" class="card-related-text">${drink.strDrink}</span>
            </div>
        
        </div>

        <div data-direction="detail" class="card-related-thumbnail" 
             style="background-image:url('${drink.strDrinkThumb}'); background-size: cover;">
        </div>
    </div>
`;




export const likedHeart = isLiked => {
    if(isLiked) {
        $(DOM.heartIcon).attr('src', 'icons/heart-icon-liked.svg'); 
    } else {
        $(DOM.heartIcon).attr('src', 'icons/heart-icon-unliked.svg');
    }
};




export const renderRelated = drink => {
    
    const markup = 
    `
    <div class="card-related">
                            
        <div class="headline-bar">
            
            <div class="headline-icon">
                <img data-direction="search" src="icons/back-icon.svg" alt="back">
            </div>
        
            <div class="headline-name headline-name--detail">
                <span class="card-detail-heading card-detail-heading--blue">Related Drinks</span>
            </div>
        </div>
        ${drink.drinks.map(el => createDrink(el)).join('')}
    </div>
    `;

    $(DOM.interactions).append(markup);
}

