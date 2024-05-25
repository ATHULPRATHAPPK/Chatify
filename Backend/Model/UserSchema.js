const mongoose = require('mongoose');

const userData = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    }
}, {
    timestamps: true // This adds `createdAt` and `updatedAt` fields automatically
});

const User = mongoose.model("User", userData);

module.exports = User;
