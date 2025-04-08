// db.js
const { MongoClient, ServerApiVersion } = require("mongodb");
require('dotenv').config();
const uri = process.env.MONGO_URI;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let db;

async function connectToDb() {
  try {
    await client.connect();
    db = client.db("strandsDB");
    
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
}

function getDb() {
  return db;
}

module.exports = { connectToDb, getDb };
