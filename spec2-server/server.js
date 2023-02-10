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
    testValidationCode: {
        type: String,
        required: true,
    },
    captures: [],
});

const User = mongoose.model("User", UserSchema);

app.post("/submit", (req, res) => {
    console.log(req.originalUrl);

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        testValidationCode: req.body.testValidationCode,
    });

    user.save()
        .then((doc) => {
            console.log(doc);
            res.status(200).json({ id: doc._id });
        })
        .catch((error) => res.status(400).json(error));
});

app.post("/capture", async (req, res) => {
    console.log("request recieved");
    const { id, imageSrc, timeStamp } = req.body;
    console.log(imageSrc);
    console.log(timeStamp);
    await User.findByIdAndUpdate(
        id,
        {
            $push: { captures: { imageSrc: imageSrc, timeStamp: timeStamp } },
        },
        { overwrite: false, new: true },
        function (err, doc) {
            if (err) {
                console.log(err);
                res.status(400).json("Error while uploading image");
            } else {
                console.log("Updated User : ", doc.captures.length);
                res.status(200).json("Image uploaded successfully");
            }
        }
    ).clone();
});

app.get("/users", async (req, res) => {
    User.find({}, { name: 1 }, function (err, allUsers) {
        if (err) {
            console.log(err);
            res.status(400).json("Error while fetching users");
        } else {
            console.log(allUsers);
            res.status(200).json({ allUsers: allUsers });
        }
    });
});

app.get("/user/:id/captures", async (req, res) => {
    const { id } = req.params;
    User.findById(id, { captures: 1 }, function (err, doc) {
        if (err) {
            console.log(err);
            res.status(400).json("Error while fetching Captures");
        } else {
            console.log(doc);
            res.status(200).json({ allCaptures: doc.captures });
        }
    });
});

const PORT = process.env.PORT || 5000;
console.log(process.env.MONGODB_ATLAS_URI);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
