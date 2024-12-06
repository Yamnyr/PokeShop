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
                owner: users[0]._id,
                type: types.find(t => t.name === 'Électrik')._id
            },
            {
                name: 'Monaflèmit EX',
                image: 'https://dz3we2x72f7ol.cloudfront.net/expansions/surging-sparks/fr-fr/SV08_FR_227.png',
                price: 250,
                owner: users[0]._id,
                type: types.find(t => t.name === 'Normal')._id
            },
            {
                name: 'Gromago EX',
                image: 'https://dz3we2x72f7ol.cloudfront.net/expansions/paradox-rift/fr-fr/SV04_FR_231.png',
                price: 150,
                owner: users[1]._id,
                type: types.find(t => t.name === 'Eau')._id
            },
            {
                name: 'Dracaufeu EX',
                image: 'https://dz3we2x72f7ol.cloudfront.net/expansions/151/fr-fr/SV3pt5_FR_6.png',
                price: 180,
                owner: users[2]._id,
                type: types.find(t => t.name === 'Feu')._id
            },
            {
                name: 'Sulfura EX',
                image: 'https://dz3we2x72f7ol.cloudfront.net/expansions/151/fr-fr/SV3pt5_FR_146.png',
                price: 220,
                owner: users[0]._id,
                type: types.find(t => t.name === 'Feu')._id
            },
            {
                name: 'Raichu EX',
                image: 'https://dz3we2x72f7ol.cloudfront.net/expansions/151/fr-fr/SV3pt5_FR_26.png',
                price: 130,
                owner: users[1]._id,
                type: types.find(t => t.name === 'Électrik')._id
            },
            {
                name: 'Mewtwo EX',
                image: 'https://dz3we2x72f7ol.cloudfront.net/expansions/151/fr-fr/SV3pt5_FR_43.png',
                price: 300,
                owner: users[2]._id,
                type: types.find(t => t.name === 'Psy')._id
            },
            {
                name: 'Tortank EX',
                image: 'https://dz3we2x72f7ol.cloudfront.net/expansions/151/fr-fr/SV3pt5_FR_11.png',
                price: 170,
                owner: users[0]._id,
                type: types.find(t => t.name === 'Eau')._id
            },
            {
                name: 'Herbizarre EX',
                image: 'https://dz3we2x72f7ol.cloudfront.net/expansions/151/fr-fr/SV3pt5_FR_2.png',
                price: 140,
                owner: users[1]._id,
                type: types.find(t => t.name === 'Plante')._id
            },
            {
                name: 'Alakazam EX',
                image: 'https://dz3we2x72f7ol.cloudfront.net/expansions/151/fr-fr/SV3pt5_FR_44.png',
                price: 190,
                owner: users[2]._id,
                type: types.find(t => t.name === 'Psy')._id
            },
            {
                name: 'Dracolosse EX',
                image: 'https://dz3we2x72f7ol.cloudfront.net/expansions/151/fr-fr/SV3pt5_FR_52.png',
                price: 260,
                owner: users[0]._id,
                type: types.find(t => t.name === 'Dragon')._id
            },
            {
                name: 'Ectoplasma EX',
                image: 'https://dz3we2x72f7ol.cloudfront.net/expansions/151/fr-fr/SV3pt5_FR_93.png',
                price: 210,
                owner: users[1]._id,
                type: types.find(t => t.name === 'Spectre')._id
            },
            {
                name: 'Mackogneur EX',
                image: 'https://dz3we2x72f7ol.cloudfront.net/expansions/151/fr-fr/SV3pt5_FR_67.png',
                price: 160,
                owner: users[2]._id,
                type: types.find(t => t.name === 'Combat')._id
            },
            {
                name: 'Roucarnage EX',
                image: 'https://dz3we2x72f7ol.cloudfront.net/expansions/151/fr-fr/SV3pt5_FR_20.png',
                price: 120,
                owner: users[0]._id,
                type: types.find(t => t.name === 'Vol')._id
            },
            {
                name: 'Artikodin EX',
                image: 'https://dz3we2x72f7ol.cloudfront.net/expansions/151/fr-fr/SV3pt5_FR_144.png',
                price: 240,
                owner: users[1]._id,
                type: types.find(t => t.name === 'Glace')._id
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