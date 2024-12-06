const mongoose = require('mongoose');
const Type = require('../Models/typeModel'); // Assurez-vous que le chemin est correct

const pokemonTypes = [
    { name: 'Normal', image: 'https://www.pokepedia.fr/images/8/85/Ic%C3%B4ne_Type_Normal_EV.png' },
    { name: 'Feu', image: 'https://www.pokepedia.fr/images/7/76/Ic%C3%B4ne_Type_Feu_EV.png' },
    { name: 'Eau', image: 'https://www.pokepedia.fr/images/0/0d/Ic%C3%B4ne_Type_Eau_EV.png' },
    { name: 'Plante', image: 'https://www.pokepedia.fr/images/b/b0/Ic%C3%B4ne_Type_Plante_EV.png' },
    { name: 'Électrik', image: 'https://www.pokepedia.fr/images/0/09/Ic%C3%B4ne_Type_%C3%89lectrik_EV.png' },
    { name: 'Glace', image: 'https://www.pokepedia.fr/images/2/2a/Ic%C3%B4ne_Type_Glace_EV.png' },
    { name: 'Combat', image: 'https://www.pokepedia.fr/images/3/3a/Ic%C3%B4ne_Type_Combat_EV.png' },
    { name: 'Poison', image: 'https://www.pokepedia.fr/images/d/d9/Ic%C3%B4ne_Type_Poison_EV.png' },
    { name: 'Sol', image: 'https://www.pokepedia.fr/images/1/13/Ic%C3%B4ne_Type_Sol_EV.png' },
    { name: 'Vol', image: 'https://www.pokepedia.fr/images/f/fc/Ic%C3%B4ne_Type_Vol_EV.png' },
    { name: 'Psy', image: 'https://www.pokepedia.fr/images/8/8b/Ic%C3%B4ne_Type_Psy_EV.png' },
    { name: 'Insecte', image: 'https://www.pokepedia.fr/images/9/90/Ic%C3%B4ne_Type_Insecte_EV.png' },
    { name: 'Roche', image: 'https://www.pokepedia.fr/images/1/10/Ic%C3%B4ne_Type_Roche_EV.png' },
    { name: 'Spectre', image: 'https://www.pokepedia.fr/images/3/3c/Ic%C3%B4ne_Type_Spectre_EV.png' },
    { name: 'Dragon', image: 'https://www.pokepedia.fr/images/9/90/Ic%C3%B4ne_Type_Dragon_EV.png' },
    { name: 'Ténèbres', image: 'https://www.pokepedia.fr/images/6/6b/Ic%C3%B4ne_Type_T%C3%A9n%C3%A8bres_EV.png' },
    { name: 'Acier', image: 'https://www.pokepedia.fr/images/e/e9/Ic%C3%B4ne_Type_Acier_EV.png' },
    { name: 'Fée', image: 'https://www.pokepedia.fr/images/9/98/Ic%C3%B4ne_Type_F%C3%A9e_EV.png' }
];

async function seedTypes() {
    try {
        // Supprimer les types existants
        await Type.deleteMany({});

        // Insérer les nouveaux types
        const insertedTypes = await Type.insertMany(pokemonTypes);

        console.log(`${insertedTypes.length} types de Pokémon ont été ajoutés à la base de données.`);
    } catch (error) {
        console.error('Erreur lors du remplissage des types de Pokémon :', error);
    }
}
module.exports = seedTypes;