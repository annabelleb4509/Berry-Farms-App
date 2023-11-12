const Farm = require('../models/farm');
let nodeGeocoder = require('node-geocoder');


module.exports = {
  index,
  show,
  new: newFarm,
  create
};

async function index(req, res) {
    const farms = await Farm.find({});
    res.render('farms/index', { title: '', farms });
  }

  async function show(req, res) {
    const farm = await Farm.findById(req.params.id).populate('produce');
    res.render('farms/show', { title: '', farm });
  }

  function newFarm(req, res) {                  // Render an errorMsg if create action fails
    res.render('farms/new', { title: '', errorMsg: '' });
  }

  async function create(req, res) {             // Remove empty properties so that defaults will be applied
    for (let key in req.body) {
      if (req.body[key] === '') delete req.body[key];
    }
    try {                                                 // need the _id of the new farm
      const farm = await Farm.create(req.body);
      let options = {                                     // use OpenStreetMap GeoCoder function
        provider: 'openstreetmap'
      };
       
      let geoCoder = nodeGeocoder(options);               // use address data provided to define&store longitude and latitude in farm object 
      
      const geoResult = await geoCoder.geocode(req.body['address.street'] + ', ' + req.body['address.town'] + ' ' +  req.body['address.state'] + ' ' +  req.body['address.postcode']);

      farm.coordinates.longitude = geoResult[0].longitude;
      farm.coordinates.latitude = geoResult[0].latitude;
      await farm.save();

      const farms = await Farm.find({});

      res.render('farms', { title: '', farms});
    } catch (err) {
      console.log(err);
      res.render('farms/new', { errorMsg: err.message });
    }
  }