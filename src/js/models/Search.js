import axios from 'axios';


export default class Search {
    constructor(query, type) {
        this.query = query,
        this.type = type
    };

    async getCocktail() {
        try {
            const result = await axios(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${this.query}`);
            this.cocktail = result.data.drinks;
        } catch(error) {
            console.log(error);
        }
    };

    async getIngredient() {
        try {
            const result = await axios(`https://www.thecocktaildb.com/api/json/v1/1/search.php?i=${this.query}`);
            this.ingredient = result.data.ingredients;
        } catch(error) {
            console.log(error);
        }
    };
}