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

const attributeCommande = async (req, res) => {
    try {
        const { _id } = req.body;

        const livreursDisponibles = await Livreur.find({ statut: 'Disponible' }).sort({ position: 1 });

        if (livreursDisponibles.length === 0) {
            throw new Error('Aucun livreur disponible');
        }

        const livreurAttribue = livreursDisponibles[0];

        const commandeExistante = await Commande.findOne({ client_id: _id });

        if (!commandeExistante) {
            throw new Error('La commande du client n\'a pas été trouvée');
        }

        commandeExistante.livreur_id = livreurAttribue._id;
        commandeExistante.statut = "En cours";
        await commandeExistante.save();

        livreurAttribue.statut = 'occupé';
        await livreurAttribue.save();

        res.status(200).json({ message: 'Commande attribuée au livreur!', livreurUserId: livreurAttribue.user_id });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const addFoodToCommande = async (req, res) => {
    try {
        const { client_id, foods_id, temps_estime_livraison } = req.body;

        let commandeExistante = await Commande.findOne({ client_id });

        if (commandeExistante) {
            commandeExistante.foods_id.push(...foods_id);
            await commandeExistante.save();
            res.status(200).json({ message: "Ajoutés à la commande avec succès" });
        } else {
            const nouvelleCommande = new Commande({
                client_id,
                foods_id,
                temps_estime_livraison,
            });
            await nouvelleCommande.save();
            res.status(201).json({ message: "Nouvelle commande créée avec succès" });
        }
    } catch (error) {
        console.error("Erreur lors de l'ajout des aliments à la commande :", error);
        res.status(500).json({ message: "Une erreur est survenue lors de l'ajout des aliments à la commande" });
    }
};

const deleteOrderUser = async (req, res) => {
    const orderId = req.params.id;

    try {
        const deletedOrder = await Commande.findOneAndDelete({ _id: orderId });

        if (!deletedOrder) {
            return res.status(404).json({ notFound: 'Commande non trouvée' });
        }

        if (deletedOrder.livreur_id) {
            await Livreur.findOneAndUpdate(
                { _id: deletedOrder.livreur_id },
                { $set: { statut: 'Disponible' } }
            );
        }

        res.status(200).json({ message: 'Commande supprimée avec succès' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur lors de la suppression de la commande' });
    }
};



module.exports = { getCommandes, addFoodToCommande, attributeCommande, deleteOrderUser }
