const mongoose = require("mongoose");

const BookingSchema = mongoose.Schema({
    productId:{
        type:mongoose.Schema.Types.ObjectId,
        required: true,
        ref:'Product'
    },
    firstName:{
        type:String,
        required:true,
    },
    lastName:{
        type:String,
        required:true,
    },
    phone:{
        type:Number,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    numberOfTraveler:{
        type:Number,
        required:true,
    },
    Note:{
        type:String,
        required:false,
    },
},{timestamps:true});

const Booking = mongoose.model('Booking', BookingSchema);

module.exports = Booking;