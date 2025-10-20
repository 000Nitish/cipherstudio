require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./src/config/db.js');
const projectRoutes = require('./src/routes/project.routes.js');

// Initialize Express App
const app = express();

// Connect to Database
connectDB();

// Middleware
app.use(cors()); // Allows cross-origin requests from your frontend
app.use(express.json()); // Parses incoming JSON requests

// API Routes
app.use('/api/projects', projectRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`🚀 Server is running on port ${PORT}`));