const express = require('express');
const router = express.Router();

const farmsCtrl = require('../controllers/farms');

router.get('/', farmsCtrl.index);      
router.get('/new', farmsCtrl.new);      
router.get('/:id', farmsCtrl.show);     
router.post('/', farmsCtrl.create);

module.exports = router;




