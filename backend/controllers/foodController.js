const Food = require('../models/Food');
const axios = require('axios');

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
    const { calories, protein, fat, carbs } = req.body;

    try {
        const { data } = await axios.post('http://localhost:5001/recommend', {
            calories,
            protein,
            fat,
            carbs,
        });

        res.json({ recommendations: data });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch recommendations' });
    }
}

}

module.exports = FoodController;
