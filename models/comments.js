"use strict"
var mongoose = require('mongoose');
const Schema = mongoose.Schema;

var commentsSchema = new mongoose.Schema({
    userpostId: {
        type: String,
        ref: "Posts", //for user post 
        required: true,
    },
    usercommentId: {
        type: String,
        ref: "Users", //for user comments
        required: true,
    },
    comment: {
        type: String,
    },
});

var Comments = mongoose.model('Comments', commentsSchema);
module.exports = Comments;