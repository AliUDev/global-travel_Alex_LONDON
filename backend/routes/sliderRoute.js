const express = require("express");
const router = express.Router();
const multer = require("multer");

const {
    postSLiderImage,
    getSliderImage,
    getObject,
    deleteImage,
    delteobj
} = require('../controllers/sliderController')


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + file.originalname);
    },
});
const upload = multer({ storage: storage });

router.post("/post", upload.single("image"), postSLiderImage);
router.get("/get/:key", getSliderImage);
router.get("/get", getObject);
router.delete("/delete/:filename", deleteImage);
router.delete("/deleteob/:id", delteobj);

module.exports = router;
