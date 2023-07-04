const express = require("express");
const router = express.Router();
const  {postTopSliderImage, getTopSliderImage, deleteSliderImg , getkeys} =  require('../controllers/hometopsliderController');
const multer =  require('multer')


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
      cb(null,Date.now() + file.originalname);
    },
  });

  const upload = multer({ storage: storage });


router.post('/upload',  upload.single('image'), postTopSliderImage);
router.get('/image/:key',  getTopSliderImage);
router.delete('/image/:filename', deleteSliderImg )
router.get('/getkeys', getkeys)
 



module.exports = router;  
 
        