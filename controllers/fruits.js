const Fruit = require('../models/fruit');
const Farm = require('../models/farm');

module.exports = {
  new: newFruit,
  create,
  addToProduce
};

async function addToProduce(req, res) {
    if (req.body.availability === "on") {
      req.body.availability = true
    } else {
      req.body.availability = false
    }
    const newFruit = await Fruit.create(req.body);
    const farmFruit = await Farm.findById(req.params.id);
    farmFruit.produce.push(newFruit)
    try {   
        await farmFruit.save();
    } catch (err) {
        console.log(err);
    }
    const farm = await Farm.findById(req.params.id).populate('produce');
    res.render('farms/show', { title: 'Farm Details', farm });
}

async function newFruit(req, res) {
  //Sort performers by their name
  const fruits = await Fruit.find({}).sort('name');
  res.render('fruits/new', { title: 'Add Fruit', fruits });
}

async function create(req, res) {
  try {
    await Fruit.create(req.body);
    await Fruit.save();
    res.redirect(`/farms/show`);
  } catch (err) {
    console.log(err);
  }
  res.redirect('/fruits/new');
}