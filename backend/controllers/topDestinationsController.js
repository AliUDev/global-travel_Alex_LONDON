const TopDestinationModel =  require('../models/TopDestinationModel')
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

//  POST API
const postTopDestination =  async (req, res)=> {
    const { destination, location,weather,temprature,totalReviews,reviewPoints,dailyVisitors,totalDestinations,discription} = req.body;
    const file = req.file;
    const path = "topdestinations/"
    const result =  await uploadFile(path, file);
    await unlinkFile(file.path);
    const img = file.filename
   
    const create = await TopDestinationModel.create({ img, destination, location,weather,temprature,totalReviews,reviewPoints,dailyVisitors,totalDestinations,discription});
    if(create){
        res.send(create)
    }else{
        res.send("Not Posted")
    } 
}


// Route to get image through key value
const getTopSliderImage = (req, res) => {
    console.log(req.params); 
    const key = req.params.key;
    const readStream = getFileStream(`topdestinations/` + key);
    return readStream.pipe(res); 
  };

const getObject = async (req, res) => {
    try {
        const data = await  TopDestinationModel.find(); 
        res.json(data)
    }catch(error){
        return res.status(500).json({message: error.message}) 
    }
}

 


  //Route to delete an image

  const deleteObject = async (req, res) => {
    const filename = req.params.filename;
    const key = `topdestinations/` + filename;
    await s3.deleteObject({ Bucket: BUCKET_NAME, Key: key }).promise();
    res.send("Image Deleted");
  };

  // ROute to delete obj
  const delteobj =  async ( req, res)=> { 
    try {
        const id = req.params.id;
        const data = await TopDestinationModel.findByIdAndDelete(id)
        res.send(`Document has been deleted..`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
  }

// route to get all keys

const getkeys = async (req, res) => {
    let r = await s3
      .listObjectsV2({ Bucket: BUCKET_NAME, Prefix: "topdestinations" })
      .promise();
    let x = r.Contents.map((item) => item.Key);
    res.send(JSON.stringify(x));
  };
  
   
module.exports = { 
    postTopDestination,
    getTopSliderImage,
    deleteObject,
    getkeys,
    getObject,
    delteobj
}  