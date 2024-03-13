const CommandeController = require('../controllers/CommandController');
const routerCommande = require('express').Router();

routerCommande.get('', CommandeController.getCommandes);

routerCommande.post('/addCommand', CommandeController.addCommande);

module.exports = routerCommande;