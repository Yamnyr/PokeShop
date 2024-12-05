
const express = require('express');
const router = express.Router();
const {updateCard, deleteCard, getCards, getCard, getCardByUser, createCard} = require("../Controllers/cardController");
const authMiddleware = require("../Middleware/authMiddleware");


router.post('/create', authMiddleware, createCard);
router.put("/update/:id", authMiddleware, updateCard);
router.delete("/delete/:id", authMiddleware, deleteCard);
router.get("/getall", getCards);
router.get("/getone/:id", getCard);
router.get("/getonebuuser/:id", getCardByUser);


module.exports = router;