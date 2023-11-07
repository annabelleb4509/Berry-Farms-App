const Farm = require('../models/farm');


module.exports = {
  index,
  show,
  new: newFarm,
  create,
  
};

async function index(req, res) {
    console.log('hello')
    const farms = await Farm.find({});
    console.log(farms);
    res.render('farms/index', { title: 'All Farms', farms });
  }

  async function show(req, res) {
    const farm = await Farm.findById(req.params.id).populate('produce');
    res.render('farms/show', { title: 'Farm Details', farm });
  }


  function newFarm(req, res) {
    // We'll want to be able to render an  
    // errorMsg if the create action fails
    res.render('farms/new', { title: 'Add Farm', errorMsg: '' });
  }


  async function create(req, res) {
    // Remove empty properties so that defaults will be applied
    for (let key in req.body) {
      if (req.body[key] === '') delete req.body[key];
    }
    try {
      // Update this line because now we need the _id of the new farm
      const farm = await Farm.create(req.body);
      // Redirect to the new farm's show functionality 
      await farm.save();
      res.redirect(`/farms`);
    } catch (err) {
      // Typically some sort of validation error
      console.log(err);
      res.render('farms/new', { errorMsg: err.message });
    }
  }