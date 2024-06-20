const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { getCity } = require('../controllers/cityController');


router.get('/',getCity)

module.exports = router;