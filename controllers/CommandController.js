const Commande = require('../models/Commandes');

const getCommandes = (req, res) => {
    Commande.find()
        .then(commandes => {
            if (commandes.length > 0) {
                res.status(200).json(commandes);
                console.log(commandes);
            } else {
                res.status(404).json({ notFound: 'Aucune commande trouvée ' });
            }
        })
        .catch(err => {
            res.status(500).json({ error: err.message });
        });
}
const getCommandesById = (req, res) => {
    Commande.find({ "_id": req.params.id })
        .then(commande => {
            res.status(200).json(commande);
            console.log(commande);
        })
        .catch(err => {
            res.status(404).json({ notFound: 'Commande non trouvée ' });
        });
}

module.exports = { getCommandes, getCommandesById, }