const Farm = require('../models/farm');

module.exports = {
  create
};

async function create(req, res) {
  const farm = await Farm.findById(req.params.id);

  if ('user' in req) {
    req.body.user = req.user._id;
    req.body.userName = req.user.name;
    req.body.userAvatar = req.user.avatar;
  } else {
    req.body.userName = "Anonymous";
    // req.body.userAvatar = "";
  }
  
  // We can push (or unshift) subdocs into Mongoose arrays
  farm.reviews.push(req.body);
  try {
    // Save any changes made to the movie doc
    await farm.save();
  } catch (err) {
    console.log(err);
  }
  // Step 5:  Respond to the Request (redirect if data has been changed)
  res.redirect(`/farms/${farm._id}`);
}