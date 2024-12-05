
const express = require('express');
const router = express.Router();
const {Register, Login, updateUser, deleteUser, getUsers} = require("../Controllers/userController");
const authMiddleware = require("../Middleware/authMiddleware");

router.post("/register", Register);
router.post("/login", Login);
router.put("/update/:id", authMiddleware, updateUser);
router.delete("/delete/:id", authMiddleware, deleteUser);
router.get("/getall", authMiddleware, getUsers);

module.exports = router;