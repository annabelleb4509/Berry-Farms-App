const Farm = require('../models/farm');

module.exports = {
  create
};

async function create(req, res) {       
  const farm = await Farm.findById(req.params.id);
  if ('user' in req) {                          // if logged in: show username & Avatar. Otherwise just 'anonymous'
    req.body.user = req.user._id;
    req.body.userName = req.user.name;
    req.body.userAvatar = req.user.avatar;
  } else {
    req.body.userName = "Anonymous";
  }
  farm.reviews.push(req.body);            
  try {
    await farm.save();
  } catch (err) {
    console.log(err);
  }
  res.redirect(`/farms/${farm._id}`);
}