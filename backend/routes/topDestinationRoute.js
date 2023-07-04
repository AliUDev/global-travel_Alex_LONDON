const express = require("express");
const router = express.Router();
const multer = require("multer");

const {
  postTopDestination,
  getTopSliderImage,
  deleteObject,
  getkeys,
  getObject,
  delteobj,
} = require("../controllers/topDestinationsController");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage: storage });
router.post("/post", upload.single("image"), postTopDestination);
router.get("/get/:key", getTopSliderImage);
router.get("/get", getObject);
router.delete("/delete/:filename", deleteObject);
router.delete("/deleteob/:id", delteobj);
router.get("/getkeys", getkeys);

module.exports = router;
