const express = require('express');
const router = express.Router();
const FoodController = require('../controllers/FoodController');

router.post('/', FoodController.createFood);

router.get('/', FoodController.getAllFood);

router.get('/:foodId', FoodController.getFoodById);

router.put('/:foodId', FoodController.updateFood);

router.delete('/:foodId', FoodController.deleteFood);

module.exports = router;
