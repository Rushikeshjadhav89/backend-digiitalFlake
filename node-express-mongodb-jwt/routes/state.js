// routes/state.js
const express = require('express');
const router = express.Router();
const { createState, getStates } = require('../controllers/stateController');
const auth = require('../middleware/auth');

// @route   POST api/state
// @desc    Create a state
// @access  Private
router.post('/', auth, createState);

// @route   GET api/state
// @desc    Get all states
// @access  Private
router.get('/', getStates);



module.exports = router;
