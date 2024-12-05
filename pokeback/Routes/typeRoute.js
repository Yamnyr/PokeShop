
const express = require('express');
const router = express.Router();
const {updateType, deleteType, getType, createType} = require("../Controllers/typeController");
const authMiddleware = require("../Middleware/authMiddleware");


router.post('/create', authMiddleware, createType);
router.put("/update/:id", authMiddleware, updateType);
router.delete("/delete/:id", authMiddleware, deleteType);
router.get("/getall", getType);

module.exports = router;