const tripModel = require("../models/TripsModel");
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

aws.config.update({
  secretAccessKey: SECERET_KEY,
  accessKeyId: ACCESS_ID_KEY,
  region: REGION,
});
const s3 = new aws.S3();


const tripPost = async (req, res) => {
  try {
    const file = req.file;
    const path = "tripsProductCard/";
    await uploadFile(path, file);
    await unlinkFile(file.path);
    const img1 = file.filename;

    const create = await tripModel.create({
      img1,
      ...req.body,
    });
    return res.status(200).json(create);
  } catch (err) {
    return res.status(400).json("error", err);
  }
};

const getTripImg = (req, res) => {
  console.log(req.params);
  const key = req.params.key;
  const readStream = getFileStream(`tripsProductCard/` + key);
  return readStream.pipe(res);
};

const getObject = async (req, res) => {
  try {
    const data = await tripModel.find();
    res.json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getObjectById = async (req,res)=> {
  try{
    const key = req.params.key;
    const data = await tripModel.findById(key);
    res.json(data);

  }catch{
    return res.status(500).json("error", err);
  }
}

//Route to delete an image

const deleteImg = async (req, res) => {
  const filename = req.params.filename;
  const key = `tripsProductCard/` + filename;
  await s3.deleteObject({ Bucket: BUCKET_NAME, Key: key }).promise();
  res.send("Image Deleted");
};

// ROute to delete obj
const delteobj = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await tripModel.findByIdAndDelete(id);
    res.send(`Document has been deleted..`);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  tripPost,
  getTripImg,
  getObject,
  getObjectById,
  deleteImg,
  delteobj,
};
