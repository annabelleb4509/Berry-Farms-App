const Fruit = require('../models/fruit');
const Farm = require('../models/farm');

module.exports = {
  new: newFruit,
  create,
  addToProduce,
  edit,
  update
};


function update(req, res) {
  req.bodu.done = !!req.body.done;
  Fruit.update(req.params.id, req.body);
  res.redirect(`/fruits/${req.params.id}`);
};

function edit(req, res) {
  const fruit = Fruit.getOne(req.params.id);
  res.render('fruits/edit', { title: 'Edit Produce', fruit });
}


async function addToProduce(req, res) {
  if (req.body.availability === "on") {
    req.body.availability = true;
  } else {
    req.body.availability = false;
  }
  try {   
    const newFruit = await Fruit.create(req.body);
    const farmFruit = await Farm.findById(req.params.id);
    farmFruit.produce.push(newFruit)
      await farmFruit.save();
  } catch (err) {
      console.log(err);
  }
  const farm = await Farm.findById(req.params.id).populate('produce');
  res.render('farms/show', { title: 'Farm Details', farm });
}

async function newFruit(req, res) {
  const fruits = await Fruit.find({}).sort('name');
  res.render('fruits/new', { title: 'Add Fruit', fruits });
}

async function create(req, res) {
  try {
    await Fruit.create(req.body);
    await Fruit.save();
    const farm = await Farm.findById(req.params.id).populate('produce');;
    res.render('farms/show', { title: 'Farm Details', farm });
  } catch (err) {
    console.log(err);
  }
  const fruits = await Fruit.find({}).sort('name');
  res.render('fruits/new', { title: 'Add Fruit', fruits });
}