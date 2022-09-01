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
  lat: String,
  lng: String
}
);

const Hikes = mongoose.model('Hikes', hikeSchema);

module.exports = Hikes;
