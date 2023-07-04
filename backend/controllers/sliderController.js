const SliderModel = require('../models/SliderModel');
const asyncHandler = require("express-async-handler");
const fs = require("fs");
const util = require("util");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const unlinkFile = util.promisify(fs.unlink);
const { uploadFile, getFileStream } = require("../s3");

const BUCKET_NAME = process.env.AWS_BUCKET;
const REGION = process.env.AWS_BUCKET_REGION;
const ACCESS_ID_KEY = process.env.AWS_ACCESS_KEY;
const SECERET_KEY = process.env.AWS_SECRET_KEY;
const aws = require("aws-sdk");
const { Model } = require('mongoose');

aws.config.update({
  secretAccessKey: SECERET_KEY,
  accessKeyId: ACCESS_ID_KEY,
  region: REGION,
});
const s3 = new aws.S3();


// @ POST API
const postSLiderImage = asyncHandler( async (req,res)=> {
    const {} = req.body;
    const file = req.file;
    const path = "Slider/"
    const result =  await uploadFile(path, file);
    await unlinkFile(file.path);
    const img = file.filename
   
    const create = await SliderModel.create({ img});
    if(create){
        res.send(create)
    }else{
        res.send("Not Posted")
    } 
})

// Route to get image through key value
const getSliderImage = (req, res) => {
    console.log(req.params); 
    const key = req.params.key;
    const readStream = getFileStream(`Slider/` + key);
    readStream.pipe(res); 
  };

const getObject = async (req, res) => {
    try {
        const data = await  SliderModel.find(); 
        res.json(data)
    }catch(error){
        res.status(500).json({message: error.message}) 
    }
} 


//Route to delete an image

const deleteImage = async (req, res) => {
    const filename = req.params.filename;
    const key = `Slider/` + filename;
    await s3.deleteObject({ Bucket: BUCKET_NAME, Key: key }).promise();
    res.send("Image Deleted");
  };

  // ROute to delete obj
  const delteobj =  async ( req, res)=> { 
    try {
        const id = req.params.id;
        const data = await SliderModel.findByIdAndDelete(id)
        res.send(`Document has been deleted..`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
  }

  module.exports = {
    postSLiderImage,
    getSliderImage,
    getObject,
    deleteImage,
    delteobj
}