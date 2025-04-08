// routes/strands.js

const express = require("express");
const axios = require("axios");
const { ObjectId } = require("mongodb");
const { getDb } = require("../db"); 
const router = express.Router();

// Generate a board
async function generateStrandsBoard(words) {
  const response = await axios.post(`${process.env.PYTHON_API_URL}/generate`, {
    words
  }, {
    headers: {
      "Content-Type": "application/json"
    }
  });

  return response.data;
}
//generate 
router.post("/api/generate", async (req, res) => {
  const { words } = req.body;
  console.log("Received words:", words);

  if (!Array.isArray(words) || words.length === 0) {
    return res.status(400).json({ error: "Missing or invalid 'words' array" });
  }

  try {
    const boardData = await generateStrandsBoard(words);
    res.json(boardData);
  } catch (e) {
    console.error("Error generating board:", e.message);
    res.status(500).json({ error: "Failed to generate board." });
  }
});

//generate and save to db, this is what i use for every post
router.post("/api/generate-and-save", async (req, res) => {
    const { title, words, is_daily } = req.body;
    if (!title || typeof title !== "string") {
        return res.status(400).json({ error: "Title is required." });
      }
    
    if (!Array.isArray(words) || words.length !== 7) {
      return res.status(400).json({ error: "You must submit exactly 7 words." });
    }
  
    try {
      const boardData = await generateStrandsBoard(words);
      const db = getDb();
  
      const game = {
        ...boardData,
        words,
        is_daily: !!is_daily,
        created_at: new Date(),
        title
      };
      console.log("Generated game data:", game);
      const result = await db.collection("games").insertOne(game);
        console.log("Game saved with ID:", result.insertedId);
      res.json({ gameId: result.insertedId.toString() });
    } catch (err) {
      console.error("Error generating or saving game:", err);
      res.status(500).json({ error: "Failed to generate and save game" });
    }
  });


router.post("/api/save-game", async (req, res) => {
  try {
    const db = getDb();
    const game = { ...req.body, created_at: new Date(), is_daily: false };
    const result = await db.collection("games").insertOne(game);
    res.json({ gameId: result.insertedId.toString() });
  } catch (err) {
    console.error("Failed to save game:", err);
    res.status(500).json({ error: "Failed to save game" });
  }
});

//get game by id used when clicking shared link
router.get("/api/game/:id", async (req, res) => {
  try {
    const db = getDb();
    const game = await db.collection("games").findOne({
      _id: new ObjectId(req.params.id),
    });

    if (!game) return res.status(404).json({ error: "Game not found" });

    res.json(game);
  } catch (err) {
    console.error("Failed to fetch game by ID:", err);
    res.status(500).json({ error: "Invalid ID or database error" });
  }
});

//just gets a random one and calls it daily
router.get("/api/daily", async (req, res) => {
    try {
      const db = getDb();
      const dailyGames = await db.collection("games").find({ is_daily: true }).toArray();
  
      if (!dailyGames.length) {
        return res.status(404).json({ error: "No daily games found" });
      }
  
      const randomGame = dailyGames[Math.floor(Math.random() * dailyGames.length)];
      res.json(randomGame);
    } catch (err) {
      console.error("Failed to fetch daily game:", err);
      res.status(500).json({ error: "Failed to fetch daily game" });
    }
  });
router.get("/api/test", (req, res) => {
    res.send("Strands API is live!");
  });
module.exports = router;
