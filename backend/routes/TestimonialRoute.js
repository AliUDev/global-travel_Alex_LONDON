const express = require("express");
const router = express.Router();

const {
  post,
  get,
  deleteObj,
} = require("../controllers/testimonialController");

router.post("/post", post);
router.get("/get", get);
router.delete("/delete/:id", deleteObj);

module.exports = router;
