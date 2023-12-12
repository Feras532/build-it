const mongoose = require('mongoose');

// Define the schema for the part request
const partRequestSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
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