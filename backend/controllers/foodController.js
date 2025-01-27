const Food = require('../models/Food');

class FoodController {
    static async getFoods(req, res) {
        try {
            const foods = await Food.find();
            res.json(foods);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async recommendFoods(req, res) {
        const { userId } = req.params;

        // Fetch recommended foods via ML API
        const axios = require('axios');
        const response = await axios.get(`http://localhost:5001/recommend/${userId}`);

        res.json(response.data);
    }
}

module.exports = FoodController;
