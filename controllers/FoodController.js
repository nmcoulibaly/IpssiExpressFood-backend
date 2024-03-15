const Food = require('../models/Food');

const createFood = async (req, res) => {
    const { nom, description, prix, type_food, photo } = req.body;

    try {
        const newFood = new Food({
            nom,
            description,
            prix,
            type_food,
            photo
        });

        const food = await newFood.save();
        res.status(201).json(food);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur serveur lors de la création du plat' });
    }
};

const getAllFood = async (req, res) => {
    try {

        const mainDishes = await Food.aggregate([
            { $match: { type_food: "plat" } },
            { $sample: { size: 2 } }
        ]);

        const desserts = await Food.aggregate([
            { $match: { type_food: "dessert" } },
            { $sample: { size: 2 } }
        ]);

        const allFood = [...mainDishes, ...desserts];

        res.json(allFood);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur serveur lors de la récupération des plats' });
    }
};

const getALLFood = async (req, res) => {
     Food.find()
        .then(foods => {
            if (foods.length > 0) {
                res.status(200).json(foods);
                console.log(foods);
            } else {
                res.status(404).json({ notFound: 'Aucun food trouvé ' });
            }
        })
        .catch(err => {
            res.status(500).json({ error: err.message });
        })
};

const getFoodById = async (req, res) => {
    const { foodId } = req.params;

    try {
        const food = await Food.findById(foodId);
        if (!food) {
            return res.status(404).json({ message: 'Plat non trouvé' });
        }

        res.json(food);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur serveur lors de la récupération du plat' });
    }
};

const updateFood = async (req, res) => {
    const { foodId } = req.params;
    const { nom, description, prix, type_food, photo } = req.body;

    try {
        const food = await Food.findByIdAndUpdate(
            foodId,
            { $set: { nom, description, prix, type_food, photo } },
            { new: true }
        );

        if (!food) {
            return res.status(404).json({ message: 'Plat non trouvé' });
        }

        res.json(food);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur serveur lors de la mise à jour du plat' });
    }
};

const deleteFood = async (req, res) => {
    const { foodId } = req.params;

    try {
        const food = await Food.findByIdAndDelete(foodId);
        if (!food) {
            return res.status(404).json({ message: 'Plat non trouvé' });
        }

        res.json({ message: 'Plat supprimé avec succès' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur serveur lors de la suppression du plat' });
    }
};

const deleteFoodByAdmin = (req, res) => {

    const id = req.params.id;

    Food.findByIdAndRemove(id)
        .then(food => {
            res.status(200).json({ message: 'Produit supprimé!' })
            console.log(food)
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: 'Erreur de serveur' });
        });
}

const putFoodByAdmin = (req, res) => {

    const id = req.params.id;

    Users.findOneAndUpdate({ _id: id }, req.body)
        .then(user => {
            res.status(200).json(user)
            console.log(user)
        })
        .catch(err => {
            res.status(404).json({ notFound: 'Produit non trouvé' })
        })
}

module.exports = { createFood, getAllFood, getFoodById, updateFood, deleteFood, getALLFood, deleteFoodByAdmin, putFoodByAdmin };
