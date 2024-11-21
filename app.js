const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const transactionRoutes = require("./routes/transactionRoutes");

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());

// MongoDB Atlas Connection
const MONGODB_URI = "mongodb+srv://ganeshvamsi05:ejxCKXwugynuud4a@cluster0.a9ff9ol.mongodb.net/GaneshCrud?retryWrites=true&w=majority&appName=Cluster0";

mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((err) => console.error("Error connecting to MongoDB Atlas:", err));

// Routes
app.use("/api/transactions", transactionRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
