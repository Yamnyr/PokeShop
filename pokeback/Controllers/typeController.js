const Type = require('../Models/typeModel');  // Assurez-vous que le modèle est correctement importé

// Fonction pour créer un type
const createType = async (req, res) => {
    try {
        const { name, image } = req.body;

        // Vérifiez si un type avec ce nom existe déjà
        const existingType = await Type.findOne({ name });
        if (existingType) {
            return res.status(400).json({ message: 'Type already exists' });
        }

        const newType = new Type({
            name,
            image,
        });

        // Sauvegarder le type dans la base de données
        await newType.save();
        return res.status(201).json(newType);  // Retourner le type créé
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
};

// Fonction pour mettre à jour un type
const updateType = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, image } = req.body;

        // Vérifiez si le type existe
        const type = await Type.findById(id);
        if (!type) {
            return res.status(404).json({ message: 'Type not found' });
        }

        // Mettre à jour le type
        type.name = name || type.name;
        type.image = image || type.image;

        await type.save();
        return res.status(200).json(type);  // Retourner le type mis à jour
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
};

// Fonction pour supprimer un type
const deleteType = async (req, res) => {
    try {
        const { id } = req.params;

        // Vérifiez si le type existe
        const type = await Type.findById(id);
        if (!type) {
            return res.status(404).json({ message: 'Type not found' });
        }

        // Supprimer le type
        await type.remove();
        return res.status(200).json({ message: 'Type deleted' });  // Retourner un message de succès
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
};

// Fonction pour récupérer tous les types
const getType = async (req, res) => {
    try {
        const types = await Type.find();
        return res.status(200).json(types);  // Retourner la liste des types
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { createType, updateType, deleteType, getType };
