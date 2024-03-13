const Commande = require('../models/Commandes');
const Livreur = require('../models/Livreur');

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

const addCommande = async (req, res) => {
    try {
        const { client_id, plat_commande, dessert_commande, frais_livraison, total, temps_estime_livraison, statut } = req.body;

        const livreursDisponibles = await Livreur.find({ statut: 'Disponible' }).sort({ position: 1 });

        if (livreursDisponibles.length === 0) {
            throw new Error('Aucun livreur disponible');
        }

        const livreurAttribue = livreursDisponibles.reduce((minLivreur, livreur) => {
            return livreur.position < minLivreur.position ? livreur : minLivreur;
        });

        const newCommande = new Commande({
            client_id,
            plat_commande,
            dessert_commande,
            frais_livraison,
            total,
            temps_estime_livraison,
            statut,
            livreur_id: livreurAttribue._id
        });

        await newCommande.save();

        livreurAttribue.statut = 'occupé';
        await livreurAttribue.save();

        res.status(200).json({ message: 'Commande ajoutée!' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
module.exports = { getCommandes, addCommande }
