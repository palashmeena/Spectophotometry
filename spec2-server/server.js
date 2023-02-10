// Express server for storing the form data in MongoDB
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

mongoose
    .connect(process.env.MONGODB_ATLAS_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("MongoDB connected"))
    .catch((error) => console.error(error));

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    validationCode: {
        type: String,
        required: true,
    },
    captures: [],
});

const User = mongoose.model("User", UserSchema);

app.post("/submit", (req, res) => {
    console.log(req.body);

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        validationCode: req.body.testValidationCode,
    });

    console.log(user);

    user.save()
        .then((data) => res.status(200).json(data))
        .catch((error) => res.status(400).json(error));
});

const PORT = process.env.PORT || 5000;
console.log(process.env.MONGODB_ATLAS_URI);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
