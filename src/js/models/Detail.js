import axios from "axios";

export default class Detail {
    constructor(id) {
        this.id = id;
    }

    async getDetail() {
        try {
            const result = await axios(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${this.id}`);
            this.details = result.data.drinks[0];
            this.id = this.details.idDrink;
            this.name = this.details.strDrink;
            this.img = this.details.strDrinkThumb;
            this.glass = this.details.strGlass;
            
        } catch(error) {
            console.log(error);
        }
    }


    structureMeasurements(data) {
        var i = 1;
        var measurements = [];
        while(i <= 15) {
            const measure = eval(`data.strMeasure${i}`);
            if(measure !== null ) {
                measurements.push(measure);
            };
            i++; 
        }
        this.measurements = measurements;
    }


    structureIngredients(data) {
        var i = 1;
        var ingredients = [];
        while(i <= 15) {
            const ingredient = eval(`data.strIngredient${i}`);
            if(ingredient !== null && ingredient !== '') {
                ingredients.push(ingredient);
            };
            i++; 
        }
        this.ingredients = ingredients;
    }


    structureDirections(data) {
        var steps = data.strInstructions.split('.');
        const directions = [];

        steps.forEach(el => {
            if(el !== '' ) {
                directions.push(el);
            }
        });

        this.directions = directions;
    }

    
    parseItems(ingredients, measurements) {
        const items = [];

        for (let i = 0; i < ingredients.length; i++) {
            let el1 = ingredients.slice(i, i+1);
            let el2 = measurements.slice(i, i+1);
            let el3 = `${el2} ${el1}`;
            items.push(el3);
        }

        this.items = items;
    }

    
    randomIngredient(ingredients) {
        let random = Math.floor(Math.random() * ingredients.length);
        const randomIngredient = this.ingredients[random];
        this.randomIngredient = randomIngredient;
    }
    
}