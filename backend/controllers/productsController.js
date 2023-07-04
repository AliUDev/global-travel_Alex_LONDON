const express = require("express");
const Product = require("../models/ProductModel");

// @route   GET api/products
// @desc    Get product
// @access  Public
const getProducts = (req, res) => {
    Product.find({})
    .then(products => res.json(products))
    .catch(err => res.status(404).json({ noproductsfound: `No Product found` }));
}


module.exports = { getProducts }