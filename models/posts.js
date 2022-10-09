"use strict"
var mongoose = require('mongoose');
const Schema = mongoose.Schema;

var postsSchema = new mongoose.Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    status: {
        type: String,
        required: false
    },
    location: {
        type: String,
        required: false
    },
    image: {
        type: String,
        required: false
    },
    comment: {
        type: String,
    }
}, {
    timestamps: true,
});



var Posts = mongoose.model('Posts', postsSchema);
module.exports = Posts;