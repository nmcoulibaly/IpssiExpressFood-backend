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

        const userOrders = await Commande.find({ client_id: userId, statut: { $ne: "Livré" } });

        res.status(200).json(userOrders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur lors de la récupération des commandes de l'utilisateur" });
    }
};

const getOrderLivreur = async (req, res) => {
    const userId = req.params.id;
    try {
        const livreur = await Livreur.findOne({ "user_id": userId });
        if (!livreur) {
            return res.status(404).json({ message: "Utilisateur non trouvé" });
        }
        const userOrder = await Commande.find({ livreur_id: livreur._id });

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

const getLivreuryId = (req, res) => {
    Livreur.find({ "_id": req.params.id })
        .then(livreur => {
            res.status(200).json(livreur);
            console.log(livreur);
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

const deleteUsers = (req, res) => {
    const id = req.params.id;

    Users.findByIdAndRemove(id)
        .then(product => {
            res.status(200).json({ message: 'Utilisateur supprimé!' })
            console.log(product)
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: 'Erreur de serveur' });
        });
}

module.exports = { loginUser, registerUser, getUsers, getUserById, putUser, getOrderUser, getOrderLivreur, getLivreuryId, deleteUsers };
