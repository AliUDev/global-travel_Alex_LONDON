const GalleryModel = require('../models/GallaryModel')
const fs = require("fs");
const util = require("util");
const multer = require("multer");
const unlinkFile = util.promisify(fs.unlink);
const { uploadFile, getFileStream } = require("../s3");

const BUCKET_NAME = process.env.AWS_BUCKET;
const REGION = process.env.AWS_BUCKET_REGION;
const ACCESS_ID_KEY = process.env.AWS_ACCESS_KEY;
const SECERET_KEY = process.env.AWS_SECRET_KEY;
const aws = require("aws-sdk");

aws.config.update({
  secretAccessKey: SECERET_KEY,
  accessKeyId: ACCESS_ID_KEY,
  region: REGION,
});
const s3 = new aws.S3();


// @ POST API
const postGalleryImage = async (req,res)=> {
    const {} = req.body;
    const file = req.file;
    const path = "Gallery/"
    const result =  await uploadFile(path, file);
    await unlinkFile(file.path);
    const img = file.filename
   
    const create = await GalleryModel.create({ img});
    if(create){
        res.send(create)
    }else{
        res.send("Not Posted")
    } 
}

// Route to get image through key value
const getGalleryImage = (req, res) => {
    console.log(req.params); 
    const key = req.params.key;
    const readStream = getFileStream(`Gallery/` + key);
    readStream.pipe(res); 
  };

const getObject = async (req, res) => {
    try {
        const data = await  GalleryModel.find(); 
        res.json(data)
    }catch(error){
        res.status(500).json({message: error.message}) 
    }
} 


//Route to delete an image

const deleteImage = async (req, res) => {
    const filename = req.params.filename;
    const key = `Gallery/` + filename;
    await s3.deleteObject({ Bucket: BUCKET_NAME, Key: key }).promise();
    res.send("Image Deleted");
  };

  // ROute to delete obj
  const delteobj =  async ( req, res)=> { 
    try {
        const id = req.params.id;
        const data = await GalleryModel.findByIdAndDelete(id)
        res.send(`Document has been deleted..`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
  }

  module.exports = {
    postGalleryImage,
    getGalleryImage,
    getObject,
    deleteImage,
    delteobj
}