const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required: true,
        ref:'User'
    },
    name:{
        type:String,
        required:true,
    },
    placeImage:{
        type:String,
        required:true,
    },
    guideImage:{
        type:String,
        required:true,
    },
    guideName:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    bookingNote:{
        type:String,
        required:true,
    },
    location:{
        type:String,
        required:true,
    },
    duration:{
        type:Number,
        required:true,
    },
    maxPeople:{
        type:Number,
        required:true,
    },
    perCouplePrice:{
        type:Number,
        required:true,
    },
    perPersonPrice:{
        type:Number,
        required:true,
    },
},{timestamps:true});

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;
