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
        monday: { type: String, default: 'closed' },
        tuesday: { type: String, default: 'closed' },
        wednesday: { type: String, default: 'closed' },
        thursday: { type: String, default: 'closed' },
        friday: { type: String, default: 'closed' },
        saturday: { type: String, default: 'closed' },
        sunday: { type: String, default: 'closed' },
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


