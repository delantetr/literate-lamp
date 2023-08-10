const { Schema } = require('mongoose');

const shoppingListSchema = new Schema({
    items: [
        {
            type: String,
            required: true,
        },
    ],
});

module.exports = shoppingListSchema;