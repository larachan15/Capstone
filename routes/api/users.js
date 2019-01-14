// To use router, must bring in express first.
const express = require('express');
const router = express.Router();

// res.json outputs json
// Route        GET api/users/test
// Descripton   Test users route
// Access       Public
router.get('/test', (req, res) => res.json({message: 'Users work yay!'}));

module.exports = router;
