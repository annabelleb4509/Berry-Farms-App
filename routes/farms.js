const express = require('express');
const router = express.Router();

const farmsCtrl = require('../controllers/farms');
	
// GET /farms
router.get('/', farmsCtrl.index);

// GET /farms/new
router.get('/new', farmsCtrl.new);

// GET /farms/:id (show functionality) MUST be below new route
router.get('/:id', farmsCtrl.show);

// POST /farms
router.post('/', farmsCtrl.create);

module.exports = router;
