import axios from 'axios';


export default class Surprise {
    constructor() {

    }

    async getSurprise() {
        const result = await axios(`https://www.thecocktaildb.com/api/json/v1/1/random.php`);
        this.surprise = result.data.drinks[0];
        this.id = this.surprise.idDrink;
        this.name = this.surprise.strDrink;
        this.img = this.surprise.strDrinkThumb;
    }
};