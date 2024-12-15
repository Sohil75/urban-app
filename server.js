require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require("passport");
const cors =require("cors");
const users =require("./routes/user");
const product = require("./routes/product");
mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser:true,useUnifiedTopology: true}

).then(()=>{
    console.log("connected to db.."); 
},
(err)=>{
    console.log("Something went wrond with db.."+err); 
}
);

const app = express();
const  port=process.env.PORT || 8000;
app.use(cors());
app.use(passport.initialize());

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


app.use("/api/users",users);
app.use("/api/products",product);
app.get('/',(req,res)=>{
    res.json({message:"All good"});
});
app.listen(port,()=>{
    console.log(`server is running on port:${port}`);
});