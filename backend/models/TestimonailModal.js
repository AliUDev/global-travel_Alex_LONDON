const mongoose = require("mongoose");

const TestimonailSchema = mongoose.Schema({
    rating:{
        type:  String,
        required: true
    },
    name:{
        type:  String,
        required: true
    },
    discription:{
        type:  String,
        required: true
    },
})

const Testimonail = mongoose.model('Testimonail', TestimonailSchema)
module.exports = Testimonail