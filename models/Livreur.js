const mongoose = require('mongoose');

const LivreurSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    statut: {
        type: Array,
        required: true,
    },
    position: {
        type: Number,
        required: true
    }
})

module.exports = Livreurs = mongoose.model("Livreurs", UserSchema, "Livreurs");
