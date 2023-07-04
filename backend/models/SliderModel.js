const mongoose = require("mongoose");

const SliderSchema = mongoose.Schema({
    img:{
        type:  String,
        required: true
    }
})

const Slider = mongoose.model('SliderImage', SliderSchema)
module.exports = Slider