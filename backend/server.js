const express = require("express");
const cors = require("cors");

const mongoose = require("mongoose");

// have our environment variables in our .env file
require('dotenv').config();

// creates our express server
const app = express();
const port = process.env.PORT || 5000;

// Middlewares
app.use(cors());

// allows us to parse json
app.use(express.json());


// MongoDB and Mongoose setup
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;
// Once our connection runs successfully, it will send this message once.
connection.once('open', () => {
    console.log("MongoDB database connection is working");
})

// root location
app.get("/", (req, res,) => {
    res.send("API is working ");
});

// card route
const cardRouter = require("./routes/card");
app.use("/card", cardRouter);


// listens to start server, and tells where it's running on
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

