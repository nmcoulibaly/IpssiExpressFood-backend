const express = require('express');
const router = express.Router();
const FoodController = require('../controllers/FoodController');

router.post('/admin/add/food', FoodController.createFood);

router.get('/', FoodController.getAllFood);

router.get('/all', FoodController.getALLFood);

router.get('/get/food/:foodId', FoodController.getFoodById);

router.put('/get/food/:foodId', FoodController.updateFood);

router.delete('/admin/delete/food/:id', FoodController.deleteFoodByAdmin);

router.delete('/admin/put/food/:id', FoodController.putFoodByAdmin);

router.delete('/get/food/:foodId', FoodController.deleteFood);

module.exports = router;
