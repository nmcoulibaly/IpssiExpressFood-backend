const mongoose = require('mongoose');

const FoodSchema = new mongoose.Schema({
    nom: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    prix: {
        type: Number,
        required: true,
    },
    type_food: {
        type: String,
        required: true,
    },
    photo: {
        type: String,
        required: true,
    }
})