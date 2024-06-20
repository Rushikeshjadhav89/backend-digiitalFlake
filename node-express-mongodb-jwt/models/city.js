// models/State.jsclear
const mongoose = require('mongoose');

const CitySchema = new mongoose.Schema({
    City_Name: {
        type: String,
        required: true
    },
    City_code: {
        type: String,
        required: true
    },
    State_Name: {
        type: String,
        required: true
    },
    Status: {
        type: Boolean,
        required: true
    }
});

module.exports = mongoose.model('City', CitySchema);