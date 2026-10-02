const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    place: String,
    package: String,
    visitDate: String,
    people: Number
});

module.exports = mongoose.model("Booking", BookingSchema);