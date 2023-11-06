const Hour = require('../models/hour');

module.exports = {
  new: newHour,
  create
};


function newHour(req, res) {
    // We'll want to be able to render an  
    // errorMsg if the create action fails
    res.render('farms/new', { title: 'Add Farm', errorMsg: '' });
  }

  async function create(req, res) {

    try {
      await Hour.create(req.body);
    } catch (err) {
      console.log(err);
    }
    res.redirect('/farms');
  }


