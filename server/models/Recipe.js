const { Schema, model } = require('mongoose');

const recipeSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    method: {
        type: String,
        required: true
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
    image: {
        type: String,
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});
const Recipe = model('Recipe', recipeSchema);

module.exports = Recipe;