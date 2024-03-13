const UserController = require('../controllers/UserController');
const routerUser = require('express').Router();

routerUser.get('/users', UserController.getUsers);

routerUser.get('/users/:id', UserController.getUserById);

routerUser.post('/user/login', UserController.loginUser);

routerUser.post('/user/register', UserController.registerUser);

routerUser.put('/put/user/:id', UserController.putUser);

module.exports = routerUser;
