const express = require('express');
const { MongoClient} = require('mongodb');

const cors = require('cors');
require('dotenv').config();

const url = process.env.MONGO_URI;
const client = new MongoClient(url);
const dbName = "PasswordManager";

const app = express();
const port = 3000;

// Enable CORS for frontend
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST','DELETE'],
  credentials: true
}));

app.use(express.json()); // parse JSON

// Connect to MongoDB
async function connectDB() {
  try {
    await client.connect();
    console.log("✅ Connected to MongoDB");
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err);
    process.exit(1);
  }
}
connectDB();

// Routes
app.get('/', async (req, res) => {
  try {
    const db = client.db(dbName);
    const collection = db.collection('Password');
    const findResult = await collection.find({}).toArray();
    res.json(findResult);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/', async (req, res) => {
  try {
    const db = client.db(dbName);
    const collection = db.collection('Password');

    const newPassword = req.body;
    if (!newPassword.site || !newPassword.username || !newPassword.password) {
      return res.status(400).json({ error: "site, username, and password are required" });
    }

    console.log("Received new password:", newPassword);
    const result = await collection.insertOne(newPassword);
    res.json({ message: "✅ Password saved", insertedId: result.insertedId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
const { ObjectId } = require('mongodb');

app.delete('/:id', async (req, res) => {
  try {
    const db = client.db(dbName);
    const collection = db.collection('Password');

    const result = await collection.deleteOne({ _id: new ObjectId(req.params.id) });

    if (result.deletedCount === 1) {
      res.json({ message: "Password deleted" });
    } else {
      res.status(404).json({ error: "Password not found" });
    }
  } catch (err) {
    console.error("Error deleting password:", err);  // log backend error
    res.status(500).json({ error: err.message });
  }
});


// Start server
app.listen(port, () => {
  console.log(` Server running at http://localhost:${port}`);
});
