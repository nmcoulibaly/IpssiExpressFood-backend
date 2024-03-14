const mongoose = require('mongoose');

const CommandeSchema = new mongoose.Schema({
    client_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client'
    },
    foods_id: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Food'
    }],
    temps_estime_livraison: {
        type: Number,
        required: true,
    },
    statut: {
        type: String,
        default: "Pas encore Livré",
    },
    livreur_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Livreur'
    },

})

module.exports = Orders = mongoose.model("Orders", CommandeSchema, "Orders");
