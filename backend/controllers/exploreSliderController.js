const exploreSliderModel = require('../models/ExploreSliderModel');
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


//@ POST API

const postExploreSLider = asyncHandler( async (req,res)=> {
    const {place, discription} = req.body;
    const file = req.file;
    const path = "explorSlider/"
    const result =  await uploadFile(path, file);
    await unlinkFile(file.path);
    const img = file.filename
   
    const create = await exploreSliderModel.create({ img, place, discription});
    if(create){
        res.send(create)
    }else{
        res.send("Not Posted")
    } 
})

// Route to get image through key value
const getExploreSliderImage = (req, res) => {
    console.log(req.params); 
    const key = req.params.key;
    const readStream = getFileStream(`explorSlider/` + key);
    readStream.pipe(res); 
  };

const getObject = async (req, res) => {
    try {
        const data = await  exploreSliderModel.find(); 
        res.json(data)
    }catch(error){
        res.status(500).json({message: error.message}) 
    }
} 


 //Route to delete an image

 const deleteImage = async (req, res) => {
    const filename = req.params.filename;
    const key = `explorSlider/` + filename;
    await s3.deleteObject({ Bucket: BUCKET_NAME, Key: key }).promise();
    res.send("Image Deleted");
  };

  // ROute to delete obj
  const delteobj =  async ( req, res)=> { 
    try {
        const id = req.params.id;
        const data = await exploreSliderModel.findByIdAndDelete(id)
        res.send(`Document has been deleted..`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
  }



module.exports = {
    postExploreSLider,
    getExploreSliderImage,
    getObject,
    deleteImage,
    delteobj
}