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
        // Extraction des paramètres de requête
        const {
            name,
            minPrice,
            maxPrice,
            typeId,
            ownerId,
            sortBy = 'name',
            sortOrder = 'asc',
            page = 1,       // Numéro de page (commence à 1)
            limit = 10      // Nombre de cartes par page
        } = req.query;

        // Conversion des paramètres en nombres
        const pageNumber = parseInt(page);
        const limitNumber = parseInt(limit);

        // Calcul de l'offset pour la pagination
        const skipIndex = (pageNumber - 1) * limitNumber;

        // Construction de la requête de filtrage
        const filter = {};

        // Filtre par nom (regex insensible à la casse)
        if (name) {
            filter.name = { $regex: name, $options: 'i' };
        }

        // Filtres de prix
        if (minPrice) {
            filter.price = { ...filter.price, $gte: parseFloat(minPrice) };
        }
        if (maxPrice) {
            filter.price = { ...filter.price, $lte: parseFloat(maxPrice) };
        }

        // Filtres par type et propriétaire
        if (typeId) {
            filter.type = typeId;
        }
        if (ownerId) {
            filter.owner = ownerId;
        }

        // Création de l'objet de tri
        const sortOptions = {};
        sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;

        // Requête avec filtres, population, tri et pagination
        const cards = await Card.find(filter)
            .populate("type", "name image")
            .populate("owner", "username")
            .sort(sortOptions)
            .skip(skipIndex)
            .limit(limitNumber);

        // Compter le nombre total de documents correspondant au filtre
        const totalCards = await Card.countDocuments(filter);

        // Calcul du nombre total de pages
        const totalPages = Math.ceil(totalCards / limitNumber);

        // Réponse avec les cartes et les informations de pagination
        res.status(200).json({
            cards,
            pagination: {
                currentPage: pageNumber,
                totalPages: totalPages,
                totalCards: totalCards,
                cardsPerPage: limitNumber
            }
        });
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
