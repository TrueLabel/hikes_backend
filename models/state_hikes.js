const mongoose = require('mongoose');

const hikeSchema = new mongoose.Schema(
  {
  name: String,
  state: String,
  city: String,
  description: String,
  length: String,
  elevationGain: Number,
  difficulty: String,
  imageArray: [String],
  hiked: Boolean,
  lat: Number,
  lng: Number
}
);

const Hikes = mongoose.model('Hikes', hikeSchema);

module.exports = Hikes;
