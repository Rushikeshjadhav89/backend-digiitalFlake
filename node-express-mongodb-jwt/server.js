// server.js
const express = require('express');
const cors = require('cors'); // Import the cors package
const connectDB = require('./config/db');
const authRoutes = require('./routes/state');
const stateRoutes = require('./routes/state');
const cityRoutes = require('./routes/city')
const warehouseRoutes = require('./routes/warehouse')
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
// Connect Database
connectDB();
app.use(express.json());
app.use(cors()); // Enable CORS

// Init Middleware
app.use(bodyParser.json());

// Define Routes
app.use('/api/auth', authRoutes);
app.use('/api/state', stateRoutes);
app.use('/api/city', cityRoutes);
app.use('/api/warehouse', warehouseRoutes);
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
