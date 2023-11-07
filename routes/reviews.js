const express = require('express');
const router = express.Router();
const reviewsCtrl = require('../controllers/reviews');

// POST /farms/:id/reviews (create review for a farm)
router.post('/farms/:id/reviews', reviewsCtrl.create);

module.exports = router;
// comment
// comment
// comment