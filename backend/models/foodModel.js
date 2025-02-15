const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
    name: { type: String, required: true },
    calories: { type: Number, required: true },
    protein: { type: Number, required: true },
    fat: { type: Number, required: true },
    carbs: { type: Number, required: true },
    category: { type: String, required: true },
});

module.exports = mongoose.model('Food', foodSchema);
