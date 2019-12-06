import { DOM } from './base';



const createMeasure = measure => 
    `<span class="card-detail-ingredients-amount">${measure}</span>`;


const createItem = item => 
    `
        <li class="card-detail-ingredients-item">
            <img src="icons/check-icon.svg" class="card-detail-ingredients-icon">
            <span class="card-detail-ingredients-name">${item}</span>
        </li>
    `;


const createDirection = direction =>  
    `
        <li class="card-detail-directions-item">
            <i class="red-dot-icon">&dot;</i>
            <span class="card-detail-directions-name">${direction}</span>
        </li>
    `;



export const renderDetail = (details) => {
    
    const imgSettings = `
        background: url('${details.img}'); 
        background-size: cover; 
        background-position: center
    `;


    const markup = `
        <div id="detail" class="card-detail">
                            
            <div class="headline-bar">
                                
                <div class="headline-icon">
                    <img data-direction="result" class="back-button" src="icons/back-icon.svg" alt="back">
                </div>
                                
                <div class="headline-name headline-name--detail">
                    <span class="headline-text headline-text--detail">${details.name}</span>
                </div>
            </div>
                            
            <div class="card-result-img" style="${imgSettings}">
                <div class="like">
                    <img data-id="${details.id}" data-name="${details.name}" data-img="${details.img}" 
                        id="like-drink" class="like-icon">  
                </div>
            </div>


                            
            <div class="card-detail-ingredients">
                                
                <div class="card-detail-heading">
                    <span class="card-detail-heading--white">What you'll need</span>
                </div>
                                
                <ul class="card-detail-ingredients-list">
                    ${details.items.map(el => createItem(el)).join('')}                  
                </ul>
                                
                <div class="card-detail-glas">
                    <img src="icons/forward-icon.svg" class="card-detail-glas-icon">
                    <p class="card-detail-ingredients-name">Serve in a <span class="card-detail-glas-name">${details.glass}</span>!</p>
                </div>
            </div>

                            
                            
            <div class="card-detail-directions">
                                
                <div class="card-detail-heading">
                    <span class="card-detail-heading--blue">Make your own</span>
                </div>
                                
                <ul class="card-detail-directions-list">
                    ${details.directions.map(el => createDirection(el)).join('')}                  
                </ul>
            </div>
                            
            <button id="related-button" data-direction="related" class="btn btn--green btn-full">
                Related Drinks
            </button>
        </div>
    `;

    $(DOM.interactions).append(markup);
}  


export const likedHeart = isLiked => {
    if(isLiked) {
        $(DOM.heartIcon).attr('src', 'icons/heart-icon-liked.svg'); 
    } else {
        $(DOM.heartIcon).attr('src', 'icons/heart-icon-unliked.svg');
    }
}



export const clearRelatedButton = () => {
    $(DOM.relatedButton).css('display', 'none');
};


