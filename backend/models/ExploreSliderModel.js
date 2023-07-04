const mongoose = require("mongoose");

const ExploreSliderSchema = mongoose.Schema({
  img: {
    type: String,
    require: true,
  },
  place: {
    type: String,
    require: true,
  },
  discription: {
    type: String,
    require: true,
  },
});

const ExploreSlider = mongoose.model("ExploreSlider", ExploreSliderSchema);

module.exports = ExploreSlider;
