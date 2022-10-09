const mongoose = require('mongoose');

module.exports = async() => {
    try {
        await mongoose.connect('mongodb+srv://store-reviews:store-reviews@cluster0.3byycsh.mongodb.net/shopreview', {
            autoIndex: true,
            serverSelectionTimeoutMS: 30000 // default 30 seconds
        });
        console.log("MongoDB connected~");
    } catch (err) {
        console.log("Mongoose: ", err);
    }
}