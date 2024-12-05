const express = require("express");
const app = express();
const userRoute = require('./routes/userRoute');
app.use(express.json());

const PORT = 8080;

// AJOUTER LES DEUX LIGNES ICI
const cors = require("cors");
app.use(cors({ origin: "http://localhost:3000" }));

const mongoose = require("mongoose");
mongoose
    .connect("mongodb://localhost:27017/pokeshop", {})
    .then(() => {
        console.log("Connected to the mongoDB database!");
    })
    .catch((err) => {
        console.log("Cannot connect to the database!", err);
        process.exit();
    });


app.use('/user', userRoute);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
 //test