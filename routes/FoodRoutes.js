const express = require('express');
const router = express.Router();
const FoodController = require('../controllers/FoodController');

router.post('/', FoodController.createFood);

router.get('/', FoodController.getAllFood);

router.get('/get/food/:foodId', FoodController.getFoodById);

router.put('/get/food/:foodId', FoodController.updateFood);

router.delete('/get/food/:foodId', FoodController.deleteFood);

module.exports = router;
