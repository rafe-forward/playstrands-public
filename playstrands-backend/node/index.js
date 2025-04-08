// index.js
const express = require("express");
const cors = require("cors");
const { connectToDb } = require("./db");
const strandRouter = require("./routes/strandroutes");
require('dotenv').config();
const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(
  cors({
    origin: [
      "https://topstat.vercel.app",
      "http://localhost:3000",
      "https://topstatfantasy.com",
      "https://www.topstatfantasy.com",
      "http://localhost:5173",
      "https://playstrands.vercel.app"
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(strandRouter);

connectToDb().then(() => {
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  }).catch((err) => {
    console.error("Failed to connect to MongoDB", err);
  });
