
export default class Favorites {
    constructor() {
        this.favorites = [];
    }

    addFavorite(id, name, img) {
        const favorite = {id, name, img};
        this.favorites.push(favorite);
        return favorite;
    }

    isLiked(id) {
        // Return true if the element is already liked, which means that the element is inside the array and the index is different from -1
        // -1 will be returned if the element is NOT in the array and therefore NOT LIKED
        return this.favorites.findIndex(el => el.id === id) !== -1;
    }

    deleteFavorite(id) {
        // Find the index of the item inside the items-array which matches the id I'd like to delete
        const index = this.favorites.findIndex(el => el.id === id);
        // Delete the item with the found index (index --> index, 1 --> howmany)
        this.favorites.splice(index, 1);
    }

    likesAmount(arr) {
        this.amount = arr.length;
    }
    
}