const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const fruitSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  season: String,
  availability: Boolean,
}, {
  timestamps: true
});

module.exports = mongoose.model('Fruit', fruitSchema);