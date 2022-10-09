"use strict";
var mongoose = require("mongoose");
const Schema = mongoose.Schema;

var reviewsSchema = new mongoose.Schema({
    userId: {
        type: String,
        ref: "Users",
        required: true,
    },
    storeId: {
        type: String,
        ref: "Stores",
    },
    star: {
        type: String,
        required: true,
    },
    comment: {
        type: String,
    },
}, {
    timestamps: true,
});

var Reviews = mongoose.model("Reviews", reviewsSchema);
module.exports = Reviews;