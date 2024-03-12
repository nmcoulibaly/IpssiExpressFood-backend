const Livreurs = require('../models/Livreur');
const Commande = require('../models/Commandes');

const registerLivreur = (req, res) => {
    const nom = req.body.nom;
    const prenom = req.body.prenom;
    const email = req.body.email;
    const numero = req.body.numero;

    const newLivreur = new Livreurs({
        nom,
        prenom,
        email,
        numero
    })
    newLivreur.save()
    
}