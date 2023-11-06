const express = require('express');
const router = express.Router();
const fruitsCtrl = require('../controllers/fruits');

// This router is mounted to a "starts with" path of '/'

// GET /performers/new (new functionality)
router.get('/fruits/new', fruitsCtrl.new);
// POST /performers (create functionality)
router.post('/fruits', fruitsCtrl.create);
// POST /movies/:id/performers (associate a performer with a movie)
router.post('/farms/:id/fruits', fruitsCtrl.addToProduce);

//update
//delete

module.exports = router;