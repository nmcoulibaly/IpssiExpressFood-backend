const express = require('express');
const router = express.Router();
const FoodController = require('../controllers/FoodController');

router.post('/foods', FoodController.createFood);

router.get('/foods', FoodController.getAllFood);

router.get('/foods/:foodId', FoodController.getFoodById);

router.put('/foods/:foodId', FoodController.updateFood);

router.delete('/foods/:foodId', FoodController.deleteFood);

module.exports = router;
