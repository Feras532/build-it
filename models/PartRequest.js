const mongoose = require('mongoose');


const partRequestSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: { 
        type: String,
        required: true,
        trim: true
    },
    partDetails: {
        type: String,
        required: true
    }
});

// Create a model from the schema
const PartRequest = mongoose.model('PartRequest', partRequestSchema);

module.exports = PartRequest;