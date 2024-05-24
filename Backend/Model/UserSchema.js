const mongoose = require('mongoose');

const userData = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },

});


const User = mongoose.model("User", userData);

module.exports = User;