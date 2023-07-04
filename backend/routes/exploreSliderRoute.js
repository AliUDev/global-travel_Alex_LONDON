const express = require("express");
const router = express.Router();
const multer = require("multer");

const {
    postExploreSLider,
    getExploreSliderImage,
    getObject,
    deleteImage,
    delteobj
} =  require('../controllers/exploreSliderController')



const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + file.originalname);
    },
});
const upload = multer({ storage: storage });

router.post("/post", upload.single("image"), postExploreSLider);
router.get("/get/:key", getExploreSliderImage);
router.get("/get", getObject);
router.delete("/delete/:filename", deleteImage);
router.delete("/deleteob/:id", delteobj);



module.exports = router;
