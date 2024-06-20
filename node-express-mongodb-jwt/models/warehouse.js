const mongoose = require('mongoose');

const WarehouseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        required: true
    }
});

module.exports = mongoose.model('Warehouse', WarehouseSchema);
