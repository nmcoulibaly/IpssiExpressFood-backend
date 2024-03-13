const CommandeController = require('../controllers/CommandController');
const routerCommande = require('express').Router();

routerCommande.get('/commande', CommandeController.getCommandes);

routerCommande.get('/commande-details/:id', CommandeController.getCommandesById);

module.exports = routerCommande;