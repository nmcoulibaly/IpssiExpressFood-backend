const Users = require('../models/User');
const Commande = require('../models/Commandes');
const Livreur = require('../models/Livreur');

const loginUser = (req, res) => {
    const email = req.body.email;
    const mot_de_passe = req.body.mot_de_passe;
    Users.findOne({ 'email': email, 'mot_de_passe': mot_de_passe })
        .then(user => {
            if (!user) {
                console.log("Utilisateur non trouvé");
                return res.status(404).json({ notFound: 'Utilisateur non trouvé' });
            }
            res.status(200).json(user);
            console.log(user);
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: 'Erreur de serveur' });
        });
}

const registerUser = (req, res) => {
    const nom = req.body.nom;
    const prenom = req.body.prenom;
    const numero = req.body.numero;
    const email = req.body.email;
    const mot_de_passe = req.body.mot_de_passe;
    const adress = req.body.adress;

    const newUser = new Users({
        nom,
        prenom,
        numero,
        email,
        mot_de_passe,
        adress,
    })

    newUser.save()
        .then(user => {
            res.status(200).json({ message: 'Utilisateur enregistré!' });
            console.log(user);
        })
        .catch(err => {
            console.error(err);
            res.status(400).json({ error: 'Erreur client' });
        });
}

const getUsers = (req, res) => {
    Users.find()
        .then(users => {
            if (users.length > 0) {
                res.status(200).json(users);
                console.log(users);
            } else {
                res.status(404).json({ notFound: 'Aucun utilisateur trouvé ' });
            }
        })
        .catch(err => {
            res.status(500).json({ error: err.message });
        });
}

const getOrderUser = async (req, res) => {
    const userId = req.params.id;

    try {
        const user = await Users.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "Utilisateur non trouvé" });
        }

        const userOrder = await Commande.findOne({ client_id: userId });

        res.status(200).json(userOrder);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur lors de la récupération des commandes de l'utilisateur" });
    }
};
const getOrderLivreur = async (req, res) => {
    const userId = req.params.id;
    try {
        const user = await Livreur.find({ "user_id": userId });
        if (!user) {
            return res.status(404).json({ message: "Utilisateur non trouvé" });
        }
        const userOrder = await Commande.findOne({ livreur_id: { $ne: user._id } });
        res.status(200).json(userOrder);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur lors de la récupération des commandes de l'utilisateur" });
    }
};


const getUserById = (req, res) => {
    Users.find({ "_id": req.params.id })
        .then(user => {
            res.status(200).json(user);
            console.log(user);
        })
        .catch(err => {
            res.status(404).json({ notFound: 'Utlisateur non trouvé' })
        })
}
const putUser = (req, res) => {
    const id = req.params.id;

    Users.findOneAndUpdate({ _id: id }, req.body)
        .then(user => {
            res.status(200).json(user);
            console.log(user);
        })
        .catch(err => {
            res.status(404).json({ notFound: 'Utilisateur non ajouté ' });
        });
}

module.exports = { loginUser, registerUser, getUsers, getUserById, putUser, getOrderUser, getOrderLivreur };
