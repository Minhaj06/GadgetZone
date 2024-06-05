const { readdirSync } = require("fs");
const path = require("path");
const express = require("express");
const app = express();
const helmet = require("helmet");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");

require("dotenv").config();

// Middlewares
app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);
// app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(helmet());

// Routes Middleware
readdirSync("./src/routes").map((r) => app.use("/api/v1", require(`./src/routes/${r}`)));

// server
const port = process.env.PORT || 8000;

// Connect to DB and start server
const OPTION = { user: process.env.DB_USER, pass: process.env.DB_PASS, autoIndex: true };
mongoose
  .connect(process.env.DATABASE, OPTION)
  .then(() => {
    app.listen(port, () => {
      console.log(`GadgetZone server is running on port ${port}`);
    });
  })
  .catch((err) => console.log(err));
