const Card = require("../Models/cardModel");
const Type = require("../Models/typeModel");  // Assurez-vous d'importer le modèle de Type
const jwt = require('jsonwebtoken');

// Créer une nouvelle carte
const createCard = async (req, res) => {
    const { name, price, type, image } = req.body;

    const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const authorId = decoded.id;
        
    try {
        // Vérification que le type existe
        const cardType = await Type.findById(type);
        if (!cardType) {
            return res.status(400).json({ message: "Type not found" });
        }

        // Créer une nouvelle carte
        const newCard = new Card({
            name,
            price,
            type,
            owner: authorId, // L'utilisateur connecté (provenant du middleware d'authentification)
            image
        });

        // Sauvegarder la carte dans la base de données
        await newCard.save();
        res.status(201).json(newCard);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

// Mettre à jour une carte existante
const updateCard = async (req, res) => {
    const { id } = req.params;
    const { name, price, type, image } = req.body;

    try {
        // Trouver la carte à mettre à jour
        const card = await Card.findById(id);
        if (!card) {
            return res.status(404).json({ message: "Card not found" });
        }

        // Vérifier si l'utilisateur est le propriétaire de la carte
        if (card.owner.toString() !== req.user.id.toString()) {
            return res.status(403).json({ message: "You are not authorized to update this card" });
        }

        // Vérification du type (si le type est fourni)
        if (type) {
            const cardType = await Type.findById(type);
            if (!cardType) {
                return res.status(400).json({ message: "Type not found" });
            }
        }

        // Mise à jour des champs de la carte
        card.name = name || card.name;
        card.price = price || card.price;
        card.type = type || card.type;
        card.image = image || card.image;

        // Sauvegarder les modifications
        await card.save();
        res.status(200).json(card);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

// Supprimer une carte
const deleteCard = async (req, res) => {
    const { id } = req.params;

    try {
        // Trouver la carte à supprimer
        const card = await Card.findById(id);
        if (!card) {
            return res.status(404).json({ message: "Card not found" });
        }

        // Vérifier si l'utilisateur est le propriétaire de la carte
        if (card.owner.toString() !== req.user.id.toString()) {
            return res.status(403).json({ message: "You are not authorized to delete this card" });
        }

        // Supprimer la carte
        await Card.deleteOne({ _id: id });  // Utilisation de deleteOne au lieu de remove (méthode obsolète)
        res.status(200).json({ message: "Card deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

// Récupérer toutes les cartes
const getCards = async (req, res) => {
    try {
        const cards = await Card.find().populate("type", "name image").populate("owner", "username");
        res.status(200).json(cards);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

// Récupérer une carte par son ID
const getCard = async (req, res) => {
    const { id } = req.params;

    try {
        const card = await Card.findById(id).populate("type", "name image").populate("owner", "username");

        if (!card) {
            return res.status(404).json({ message: "Card not found" });
        }

        res.status(200).json(card);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

// Récupérer les cartes d'un utilisateur spécifique
const getCardByUser = async (req, res) => {
    const { id } = req.params;

    try {
        const cards = await Card.find({ owner: id }).populate("type", "name image").populate("owner", "username");

        if (cards.length === 0) {
            return res.status(404).json({ message: "No cards found for this user" });
        }

        res.status(200).json(cards);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = {
    createCard,
    updateCard,
    deleteCard,
    getCards,
    getCard,
    getCardByUser,
};
