const mongoose = require('mongoose');
const Card = require('../Models/cardModel');
const User = require('../Models/userModel');
const Type = require('../Models/typeModel');

async function seedCards() {
    try {
        // Supprimer les cartes existantes
        await Card.deleteMany({});

        // Récupérer tous les utilisateurs et types
        const users = await User.find();
        const types = await Type.find();

        // Vérifier qu'il y a des utilisateurs et des types
        if (users.length === 0 || types.length === 0) {
            throw new Error('Aucun utilisateur ou type trouvé. Assurez-vous de seed les utilisateurs et types d\'abord.');
        }

        // Cartes de Pokémon à seed
        const cards = [
            {
                name: 'Pikachu EX',
                image: 'https://dz3we2x72f7ol.cloudfront.net/expansions/surging-sparks/fr-fr/SV08_FR_219.png',
                price: 100,
                owner: users[0]._id, // Ash
                type: types.find(t => t.name === 'Électrik')._id
            },
            {
                name: 'Monaflèmit EX',
                image: 'https://dz3we2x72f7ol.cloudfront.net/expansions/surging-sparks/fr-fr/SV08_FR_227.png',
                price: 250,
                owner: users[0]._id, // Ash
                type: types.find(t => t.name === 'Normal')._id
            },
            {
                name: 'Gromago EX',
                image: 'https://dz3we2x72f7ol.cloudfront.net/expansions/paradox-rift/fr-fr/SV04_FR_231.png',
                price: 150,
                owner: users[1]._id, // Misty
                type: types.find(t => t.name === 'Eau')._id
            },
            {
                name: 'Dracaufeu EX',
                image: 'https://dz3we2x72f7ol.cloudfront.net/expansions/151/fr-fr/SV3pt5_FR_6.png',
                price: 180,
                owner: users[2]._id, // Brock
                type: types.find(t => t.name === 'Feu')._id
            }
        ];

        // Insérer les nouvelles cartes
        const insertedCards = await Card.insertMany(cards);

        console.log(`${insertedCards.length} cartes Pokémon ont été ajoutées à la base de données.`);
        return insertedCards;
    } catch (error) {
        console.error('Erreur lors du remplissage des cartes Pokémon :', error);
        throw error;
    }
}

module.exports = seedCards;