const express = require("express");
const path = require("path");
const app = express();
require("dotenv").config();

app.use(express.static(path.join(__dirname, "public")));

app.use(express.json());

let dbConnect = require("./dbConnect");

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

let postRoutes = require('./routes/postRoutes');
app.use('/api/posts', postRoutes);

// set port, listen for requests
const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Example app listening
at http://localhost:${port}`);
});