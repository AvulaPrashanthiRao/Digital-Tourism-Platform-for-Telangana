const mongoose = require("mongoose");

const FeedbackSchema = new mongoose.Schema({
    name: String,
    place: String,
    rating: Number,
    message: String
});

module.exports = mongoose.model("Feedback", FeedbackSchema);