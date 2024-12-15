const express = require("express");
const Product = require("../models/Product");

const router = express.Router();


router.post("/add",async(req,res)=>{
    const {name,image,rating,newprice,oldprice,category,subcategory}=req.body;

    try{
        const newProduct= new Product({
            name,image,rating,newprice,oldprice,category,subcategory
        });
        await newProduct.save();
        res.status(201).json({
            message:"Product added Successfully",Product:newProduct
        });

    }catch(error){
        res.status(500).json({message:"error adding product",error});
    }
});

router.get('/',async(req,res)=>{
    try{
        const products = await Product.find();
        res.status(200).json(products);
    }
    catch(error){
        res.status(500).json({message:"Error fetching product ",error});
    }
});

module.exports = router;