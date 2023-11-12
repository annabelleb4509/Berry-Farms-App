const express = require('express');
const router = express.Router();
const fruitsCtrl = require('../controllers/fruits');

// This router is mounted to a "starts with" path of '/'

router.get('/fruits/new', fruitsCtrl.new);
router.post('/fruits', fruitsCtrl.create);
router.post('/farms/:id/fruits', fruitsCtrl.addToProduce);

// // edit GET /fruits/:id/edit
// router.get('/:id/edit', fruitsController.edit);

// // update PUT/PATCH /fruits/:id
// router.put('/:id', fruitsController.update);


module.exports = router;