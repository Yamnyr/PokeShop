
const express = require('express');
const router = express.Router();
const {updateCard, deleteCard, getCards} = require("../Controllers/cardController");
const authMiddleware = require("../Middleware/authMiddleware");


router.put("/update/:id", authMiddleware, updateCard);
router.delete("/delete/:id", authMiddleware, deleteCard);
router.get("/getall", authMiddleware, getCards);

module.exports = router;