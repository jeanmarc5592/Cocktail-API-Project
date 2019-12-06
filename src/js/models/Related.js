import axios from "axios";


export default class Related {
    constructor(ingredient) {
        this.ingredient = ingredient;
    }

    async getRelated() {
        try {
            const results = await axios(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${this.ingredient}`);
            this.related = results.data.drinks;
        } catch(error) {
            console.log(error);
        }
    }


    getDrinks(allDrinks) {
        const drinks = [];
        // Generate 10 random drinks out of all related drinks and save them into a new array which is set as this.drinks
        for (let i = 0; i < 10; i++) {
            let random = Math.floor(Math.random() * allDrinks.length);
            if(!drinks.includes(allDrinks[random])) {
                drinks.push(allDrinks[random]);
            };
        }
        this.drinks = drinks;
    }
}