const mongoose = require("mongoose");

const TripSchema = mongoose.Schema({
  img1: {
    type: String,
    require: true,
  },
  rating: {
    type: String,
    require: true,
  },
  noOfRating: {
    type: String,
    require: true,
  },
  destination: {
    type: String,
    require: true,
  },
  duration: {
    type: String,
    require: true,
  },
  from: {
    type: Array,
    require: true,
  },
  departureDays: {
    type: Array,
    require: true,
  },
  perPersonPrice: {
    type: String,
    require: true,
  },
  couplePrice: {
    type: String,
    require: true,
  },
  discription: {
    type: String,
    require: true,
  },
  maxPeople: {
    type: String,
    require: true,
  },
  inculde: {
    type: Array,
    require: true,
  },
  exclude: {
    type: Array,
    require: true,
  },
  placesConverd: {
    type: String,
    require: true
  },
  itinerary: {
    type: Array,
    require: true
  },
  featured: {
    type: Boolean,
    require: true,
  },
  topRated: {
    type: Boolean,
    require: true,
  },
  international: {
    type: Boolean,
    require: true,
  },
});

const Trips = mongoose.model("Trip", TripSchema);
module.exports = Trips;
