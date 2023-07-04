const express = require("express");
const router = express.Router();
const multer = require("multer");

const {
  postGalleryImage,
  getGalleryImage,
  getObject,
  deleteImage,
  delteobj,
} = require("../controllers/galleryController");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});
const upload = multer({ storage: storage });

router.post("/post", upload.single("image"), postGalleryImage);
router.get("/get/:key", getGalleryImage);
router.get("/get", getObject);
router.delete("/delete/:filename", deleteImage);
router.delete("/deleteob/:id", delteobj);

module.exports = router;
