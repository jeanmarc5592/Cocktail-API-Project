import { DOM } from './base';

export const renderSurpriseCard = () => {
    const markup = 
    `
    <div class="card-surprise">
        <div class="headline-bar">
        
            <div class="headline-name headline-name--detail">
                <span class="headline-text headline-text--detail">Surprise Surprise!</span>
            </div>
        </div>
    
        <div class="card-surprise-img">
            &nbsp;
        </div>
    
        <button id="surprise-button" class="btn btn--green btn-full">
            Surprise me!
        </button>
    </div>
    `;

    $(DOM.interactions).append(markup);
};




export const renderSurprise = surprise => {
    const markup = 
    `
    <div class="card-surprise">
        <div class="headline-bar">
        
            <div class="headline-name headline-name--detail">
                <span class="headline-text headline-text--detail">${surprise.name}</span>
            </div>
        </div>
    
        <div  data-direction="detail" 
             id="${surprise.id}" 
             class="card-surprise-img" 
             style="background-image:url('${surprise.img}'); background-size:cover;">
        </div>
    
        <button id="surprise-button" class="btn btn--green btn-full">
            Surprise me!
        </button>
    </div>
    `;

    $(DOM.interactions).append(markup);
};