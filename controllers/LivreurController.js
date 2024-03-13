const Livreur = require('../models/Livreur');

const registerLivreur = async (req, res) => {
    const { nom, prenom, email, numero } = req.body;

    try {
        const newLivreur = new Livreur({
            nom,
            prenom,
            email,
            numero,
            statut: ["Disponible"]  // Ajout d'un statut par défaut
        });

        const livreur = await newLivreur.save();
        res.status(201).json(livreur);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur serveur lors de l\'enregistrement du livreur' });
    }
};

module.exports = { registerLivreur };
