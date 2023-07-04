const mongoose = require("mongoose");

const TopDestinationSchema = mongoose.Schema({
  img: {
    type: String,
    require: true,
  },
  destination: {
    type: String,
    require: true,
  },
  location: {
    type: String,
    require: true,
  },
  weather: {
    type: String,
    require: true,
  },
  temprature: {
    type: String,
    require: true,
  },
  totalReviews: {
    type: String,
    require: true,
  },
  reviewPoints: {
    type: String,
    require: true,
  },
  dailyVisitors: {
    type: String,
    require: true,
  },
  totalDestinations: {
    type: String,
    require: true,
  },
  discription: {
    type: String,
    require: true,
  },
});

const TopDestination = mongoose.model("TopDestination", TopDestinationSchema);
module.exports = TopDestination;
