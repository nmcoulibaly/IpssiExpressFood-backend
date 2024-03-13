const CommandeController = require('../controllers/CommandController');
const routerCommande = require('express').Router();

routerCommande.get('', CommandeController.getCommandes);

routerCommande.post('/attributeCommand', CommandeController.attributeCommande);
routerCommande.post('/addFoodToCommand', CommandeController.addFoodToCommande);

module.exports = routerCommande;
