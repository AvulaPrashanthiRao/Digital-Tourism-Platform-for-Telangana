const express = require("express");
const mongoose = require("mongoose");

const app = express();
const User = require("./models/User");
const Booking = require("./models/Booking");
const Feedback = require("./models/Feedback");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect("mongodb://127.0.0.1:27017/digital_tourism")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Create model for Places collection
const Place = mongoose.model(
  "Place",
  new mongoose.Schema({}, { strict: false, collection: "Places" })
);
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/landing.html");
});

app.get("/places", async (req, res) => {
  try {
    const places = await Place.find();
    res.json(places);
  } catch (err) {
    res.status(500).send(err.message);
  }
});
app.get("/register", (req, res) => {
    res.sendFile(__dirname + "/public/register.html");
});

app.post("/register", async (req, res) => {
  try {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    });

    await user.save();

    res.send(`
    <h2>✅ Registration Successful!</h2>
    <p>Redirecting to Login Page...</p>

    <script>
        setTimeout(() => {
            window.location.href = "/login";
        }, 2000);
    </script>
`);
}catch (err) {
    res.status(500).send(err.message);
}
});
app.get("/login", (req, res) => {
    res.sendFile(__dirname + "/public/login.html");
});
app.post("/login", async (req, res) => {

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if(user && user.password === password){
       res.send(`
    <h2>✅ Login Successful!</h2>
    <p>Welcome ${user.email}</p>

    <script>
        localStorage.setItem("loggedInUser", "${user.email}");

        setTimeout(() => {
            window.location.href = "/home.html";
        }, 2000);
    </script>
`);
    } else {
        res.send("Invalid Email or Password");
    }

});
app.get("/booking", (req, res) => {
    res.sendFile(__dirname + "/public/booking.html");
});
app.post("/booking", async (req, res) => {

    try {

        const booking = new Booking({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            place: req.body.place,
            visitDate: req.body.visitDate,
            people: req.body.people
        });

        await booking.save();

        res.send("Booking Successful!");

    } catch (err) {

        res.status(500).send(err.message);

    }

});
app.get("/feedback", (req, res) => {
    res.sendFile(__dirname + "/public/feedback.html");
});
app.post("/feedback", async (req, res) => {

    try {

        const feedback = new Feedback({
            name: req.body.name,
            place: req.body.place,
            package: req.body.package,
            rating: req.body.rating,
            message: req.body.message
        });

        await feedback.save();

        res.send("Feedback Submitted Successfully!");

    } catch (err) {

        res.status(500).send(err.message);

    }

});
app.listen(3000, () => {
  console.log("Server running on port 3000");
});