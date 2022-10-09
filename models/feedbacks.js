"use strict"
var mongoose = require('mongoose');
const Schema = mongoose.Schema;

var feedbacksSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    subject: {
        type: String,
    },
    message: {
        type: String,
        required: true
    },
});

var Feedbacks = mongoose.model('Feedbacks', feedbacksSchema);
module.exports = Feedbacks;