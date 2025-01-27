const express = require('express');
const FoodController = require('../controllers/foodController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', FoodController.getFoods); 
router.get('/recommend/:userId', protect, FoodController.recommendFoods); 

module.exports = router;
