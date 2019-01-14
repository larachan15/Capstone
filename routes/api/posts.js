// To use router, must bring in express first.
const express = require('express');
const router = express.Router();

// res.json outputs json
// Route        GET api/posts/test
// Descripton   Test post route
// Access       Public
router.get('/test', (req, res) => res.json({message: 'posts work yay!'}));

module.exports = router;
