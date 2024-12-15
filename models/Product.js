const mongoose = require("mongoose");
const bcrypt= require("bcrypt");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
      },
      image: {
        type: String,
        required: true
      },
      rating: {
        type: Number,
        required: true
      },
      newprice: {
        type: Number,
        required: true
      },
      oldprice: {
        type: Number,
        required: true
      },
      category: {
        type: String,
        required: true
      },
      subcategory: {
        type: String,
        required: true
      }
});

const Product = mongoose.model('Product',productSchema);
module.exports=Product;