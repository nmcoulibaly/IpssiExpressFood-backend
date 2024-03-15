const CommandeController = require('../controllers/CommandController');
const routerCommande = require('express').Router();

routerCommande.get('', CommandeController.getCommandes);

routerCommande.post('/attributeCommand', CommandeController.attributeCommande);
routerCommande.post('/addFoodToCommand', CommandeController.addFoodToCommande);
routerCommande.delete('/delete/order/:id', CommandeController.deleteOrderUser);

module.exports = routerCommande;
