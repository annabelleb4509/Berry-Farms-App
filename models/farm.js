const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    content: {
      type: String,
      required: true
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      default: 5
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: false
    },
    userName: String,
    userAvatar: String
  }, {
    timestamps: true
  });

  const farmSchema = new Schema({
    name: { type: String, required: true },

    address: { 
        street: String,
        town: String,
        postcode: Number,
        state: { type: String,
                 enum: ['VIC', 'SA', 'NSW', 'TAS', 'QLD', 'NT', 'WA'], 
                },
    },
    openHours: {
        monday: String,
        tuesday: String,
        wednesday: String,
        thursday: String,
        friday: String,
        saturday: String,
        sunday: String
    },
    coordinates: {
        longitude: Number,
        latitude: Number,
    },
    produce: [{
        type: Schema.Types.ObjectId,
        ref: 'Fruit'
    }],

    reviews: [reviewSchema]
  }, {
    timestamps: true
  });
  

  module.exports = mongoose.model('Farm', farmSchema);


