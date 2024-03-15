const UserController = require('../controllers/UserController');
const routerUser = require('express').Router();

routerUser.get('/users', UserController.getUsers);

routerUser.get('/users/:id', UserController.getUserById);

routerUser.get('/livreurs/:id', UserController.getLivreuryId);

routerUser.post('/user/login', UserController.loginUser);

routerUser.post('/user/register', UserController.registerUser);

routerUser.put('/put/user/:id', UserController.putUser);

routerUser.delete('/delete/user/:id', UserController.deleteUsers);

routerUser.get('/user/get/order/:id', UserController.getOrderUser);

routerUser.get('/livreur/get/order/:id', UserController.getOrderLivreur);




module.exports = routerUser;
