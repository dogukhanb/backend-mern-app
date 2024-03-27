const express = require("express");
const cors = require("cors");
require("dotenv").config();
const notRoute = require("./routes/notes");
const mongoose = require("mongoose");

const app = express();

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use(express.json());

app.use(cors());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Veritabanı Bağlandı");
    app.listen(process.env.PORT, () => {
      console.log(`${process.env.PORT}.port dinleniyor`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

app.use("/api/notes", notRoute);
