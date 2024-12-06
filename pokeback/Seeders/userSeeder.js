const mongoose = require('mongoose');
const User = require('../Models/userModel');
const bcrypt = require('bcryptjs'); // Assurez-vous d'installer bcryptjs

const users = [
    {
        username: 'ash',
        email: 'ash@pokemontrainer.com',
        password: 'pikachu123' // Le mot de passe sera haché
    },
    {
        username: 'misty',
        email: 'misty@watergym.com',
        password: 'staryu456'
    },
    {
        username: 'brock',
        email: 'brock@rockgym.com',
        password: 'onix789'
    },
    {
        username: 'gary',
        email: 'gary@rival.com',
        password: 'blastoise101'
    }
];

async function seedUsers() {
    try {
        // Supprimer les utilisateurs existants
        await User.deleteMany({});

        // Hacher les mots de passe
        const hashedUsers = await Promise.all(users.map(async (user) => {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(user.password, salt);
            return {
                ...user,
                password: hashedPassword
            };
        }));

        // Insérer les nouveaux utilisateurs
        const insertedUsers = await User.insertMany(hashedUsers);

        console.log(`${insertedUsers.length} utilisateurs ont été ajoutés à la base de données.`);
        return insertedUsers;
    } catch (error) {
        console.error('Erreur lors du remplissage des utilisateurs :', error);
        throw error;
    }
}

module.exports = seedUsers;