const { Schema, model } = require('mongoose');

const recipeSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    ingredients: [
        {
            type: String,
            required: true,
        },
    ],
    cuisine: {
        type: String,
        required: true
    },
});
const Recipe = model('Recipe', recipeSchema);

module.exports = Recipe;