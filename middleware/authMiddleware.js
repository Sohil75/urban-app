const jwt =require("jsonwebtoken");

const authMiddleware =(req,res,next)=>{
    const token = req.headers.authorization?.split(" ")[1];
    if(!token)
        return res.status(401).json({message:"unauthorized"});

    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.user=decoded;
        next();
    }
    catch(err){
        res.status(401).json({message:"Invalid Token"});
    }
};

module.exports= authMiddleware;