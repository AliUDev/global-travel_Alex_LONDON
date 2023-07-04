const express = require("express");
const Product = require("../models/ProductModel");
const Booking = require("../models/BookingModel");
const { getProducts } = require("../controllers/productsController");
const router = express.Router();


// @route   GET api/products/test
// @desc    Tests products route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Products Works' }));


// @route   GET api/products
// @desc    Get product
// @access  Public
router.route("/").get(getProducts);

// @route   GET api/products/:id
// @desc    Get product by id
// @access  Public
router.get("/:id", (req, res) => {
    Product.findById(req.params.id)
    .then(products => res.json(products))
    .catch(err => res.status(404).json({ noproductsfound: `No Product found with that ID` }));
})


// router.post("/booking/:id",(req, res)=>{
//     const newBooking = new Booking({
//         productId: req.params.id,
//         firstName: req.body.firstName,
//         lastName: req.body.lastName,
//         phone: req.body.phone,
//         email: req.body.email,
//         numberOfTraveler: req.body.numberOfTraveler,
//         note: req.body.note
//     });
//     newBooking.save().then(post => res.json(post));
// });


module.exports = router;