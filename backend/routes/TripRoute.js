const express = require("express");
const router = express.Router();
const multer = require("multer");

const {
  tripPost,
  getTripImg,
  getObject,
  getObjectById,
  deleteImg,
  delteobj,
} = require("../controllers/tripController");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage: storage });
router.post("/post", upload.single("image"), tripPost);
router.get("/get/:key", getTripImg);
router.get("/get", getObject);
router.get("/gettrip/:key", getObjectById);
router.delete("/delete/:filename", deleteImg);
router.delete("/deleteob/:id", delteobj);

module.exports = router;
