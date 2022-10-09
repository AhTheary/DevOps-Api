"use strict"
var mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePagnite = require("mongoose-paginate-v2");

var storeSchema = new mongoose.Schema({
    storeName: {
        type: String,
        required: true,
    },
    ownerName: {
        type: String,
        required: true
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Categories',
        required: true
    },
    desc: {
        type: String,
    },
    location: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    review: {
        type: Schema.Types.ObjectId,
        ref: 'Reviews',
    },
    countReview: {
        type: Number,
    }
}, {
    timestamps: true
});

storeSchema.plugin(mongoosePagnite);
var Stores = mongoose.model('Stores', storeSchema);
module.exports = Stores;