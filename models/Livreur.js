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
})