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
        const mainDishes = await Food.find({ type_food: "Plat principal" }).sort({ _id: -1 }).limit(2);
        const desserts = await Food.find({ type_food: "Dessert" }).sort({ _id: -1 }).limit(2);

        const allFood = [...mainDishes, ...desserts];

        res.json(allFood);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur serveur lors de la récupération des plats' });
    }
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

module.exports = { createFood, getAllFood, getFoodById, updateFood, deleteFood };
