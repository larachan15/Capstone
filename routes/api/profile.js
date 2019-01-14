// To use router, must bring in express first.
const express = require('express');
const router = express.Router();

// res.json outputs json
// Route        GET api/profile/test
// Descripton   Test profile route
// Access       Public
router.get('/test', (req, res) => res.json({message: 'Profiles work yay!'}));

module.exports = router;
