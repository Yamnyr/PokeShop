const mongoose = require("mongoose");

const typeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    image: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("Type", typeSchema);
