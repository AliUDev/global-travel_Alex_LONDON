const express = require("express");
const app = express();
const imageModel = require("../models/HomeTopSliderModel");
const fs = require("fs");
const util = require("util");
const asyncHandler = require("express-async-handler");
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

// @route   POST api/upload
// @desc    POST sliderimages
// @access  Public

// // // // This api is for local database for image uploading
// const postTopSliderImage = ((req, res) => {
//     const saveImage =  imageModel({
//         image: {
//           data: fs.readFileSync("uploads/" + req.file.filename),
//           contentType: "image/png",
//         },
//       });
//       saveImage
//         .save()
//         .then((res) => {
//           console.log("image is saved");
//         })
//         .catch((err) => {
//           console.log(err, "error has occur");
//         });
//         res.send('image is saved')
// });

const postTopSliderImage = async (req, res) => {
  const file = req.file;
  console.log(file);
  const path = "hometopslider/";
  const result = await uploadFile(path, file);
  await unlinkFile(file.path);
  console.log(result);
  const description = req.body.description;
  res.send(file);
};

// @route   GET api/get
// @desc    GET sliderimages
// @access  Public

// Route to get through key value

const getTopSliderImage = (req, res) => {
  console.log(req.params);
  const key = req.params.key;
  const readStream = getFileStream(`hometopslider/` + key);
  readStream.pipe(res);
};

// Route to get whole bucket

const deleteSliderImg = async (req, res) => {
  const filename = req.params.filename;
  const key = `hometopslider/` + filename;
  await s3.deleteObject({ Bucket: BUCKET_NAME, Key: key }).promise();
  res.send("Image Deleted");
};
const getkeys = async (req, res) => {
  let r = await s3
    .listObjectsV2({ Bucket: BUCKET_NAME, Prefix: "hometopslider" })
    .promise();
  let x = r.Contents.map((item) => item.Key);
  res.send(JSON.stringify(x));
};

module.exports = {
  postTopSliderImage,
  getTopSliderImage,
  deleteSliderImg,
  getkeys,
};
