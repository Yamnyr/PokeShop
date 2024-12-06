
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

// const getCards = async (req, res) => {
//     const { page = 1, limit = 30 } = req.query;
//
//     try {
//         const cards = await Card.find()
//             .populate("type", "name image")
//             .populate("owner", "username")
//             .skip((page - 1) * limit)
//             .limit(parseInt(limit));
//
//         const totalCards = await Card.countDocuments();
//         res.status(200).json({
//             cards,
//             totalPages: Math.ceil(totalCards / limit),
//             currentPage: parseInt(page),
//         });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: "Server error" });
//     }
// };

module.exports = router;