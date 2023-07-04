const mongoose = require("mongoose");

const HomeTopSliderImageSchema = mongoose.Schema({
   image:{
    data: Buffer,
    contentType: String
   }
});

const HomeTopSliderImage = mongoose.model('HomeTopSliderImage', HomeTopSliderImageSchema);

module.exports = HomeTopSliderImage;