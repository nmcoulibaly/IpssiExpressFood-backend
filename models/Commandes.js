const mongoose = require('mongoose');

const CommandeSchema = new mongoose.Schema({
    client_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client'
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
        type: Float32Array,
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
        ref: 'Livreur'
    },

})