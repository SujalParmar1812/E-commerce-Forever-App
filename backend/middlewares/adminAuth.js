import jwt from "jsonwebtoken"


const adminAuth = async (req,res,next) => {
    try {
        const {token} = req.headers;
        if (!token) {
            return res.json({success:false,msg:"Not Authorised"})
        }
        const tokenDecode = jwt.verify(token,process.env.JWT_SECRET);
        if (tokenDecode!==(process.env.ADMIN_EMAIL+process.env.ADMIN_PASSWORD)) {
            return res.json({success:false,msg:"Not Authorised"});
        }
        next();
    } catch (error) {
        return res.json({success:false,msg:error.message});
    }
}

export default adminAuth;