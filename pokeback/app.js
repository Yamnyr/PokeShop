const express = require("express");
const app = express();
const userRoute = require('./routes/userRoute');
const cardRoute = require('./routes/cardRoute');
const typeRoute = require('./routes/typeRoute');
const mongoose = require("mongoose");
const seedTypes = require("./Seeders/typeSeeder");;
const seedUsers = require("./Seeders/userSeeder");
const seedCards = require("./Seeders/cardSeeder");
app.use(express.json());

const PORT = 8080;

// AJOUTER LES DEUX LIGNES ICI
const cors = require("cors")
app.use(cors({ origin: "*" }));

mongoose
    .connect("mongodb://localhost:27017/pokeshop", {})
    .then(async () => {
        console.log("Connected to the mongoDB database!");

        // Appeler la fonction de remplissage des types
        await seedTypes();
        await seedUsers();
        await seedCards();

        // Démarrer le serveur
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}.`);
        });
    })
    .catch((err) => {
        console.log("Cannot connect to the database!", err);
        process.exit();
    });

app.use('/user', userRoute);
app.use('/card', cardRoute);
app.use('/type', typeRoute);
