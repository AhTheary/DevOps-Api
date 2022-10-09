"use strict"
var mongoose = require('mongoose');

var favoritesSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Users',
        required: true
    },

    store: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Stores',
        required: true
    }
});

var Favorites = mongoose.model('Favorites', favoritesSchema);
module.exports = Favorites;