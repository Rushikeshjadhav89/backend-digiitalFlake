const express = require('express');
const router = express.Router();
const { getWarehouses, createWarehouse } = require('../controllers/warehouseController');
const auth = require('../middleware/auth');

// Get all warehouses
router.get('/', getWarehouses);

// Create warehouse (protected route)
router.post('/', auth, createWarehouse);

module.exports = router;
