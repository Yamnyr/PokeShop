
const express = require('express');
const router = express.Router();
const {updateType, deleteType, getType} = require("../Controllers/typeController");
const authMiddleware = require("../Middleware/authMiddleware");


router.put("/update/:id", authMiddleware, updateType);
router.delete("/delete/:id", authMiddleware, deleteType);
router.get("/getall", authMiddleware, getType);

module.exports = router;