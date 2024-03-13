const mongoose = require('mongoose');

const CommandeSchema = new mongoose.Schema({
    client_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    plats_commandes: {
        type: Array,
        required: true,
    },
    desserts_commandes: {
        type: Array,
        required: true,
    },
    frais_livraison: {
        type: Number,
        required: true,
    },
    total: {
        type: Number,  
        required: true,
    },
    livreur_attribue: {
        type: Boolean,
        required: true,
    },
    temps_estime_livraison: {
        type: Number,
        required: true,
    },
    statut: {
        type: Array,
        required: true,
    },
    livreur_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
});

module.exports = mongoose.model('Commande', CommandeSchema);
