import mongoose from "mongoose";
import reviewModel from "../models/reviewModel.js";


//get all the reviews
const getAllReviews = async(req,res)=>{
    try {
        const reviews = await reviewModel.find({}).populate('user','username')
            res.json({success:true,reviews})
    } catch (error) {
        res.json({success:false,message:error.message});
    }
}

//get reviews of a perticular product
const getReviewOfProduct = async (req,res) => {
    try {
        const productId = req.params.productId;
        // const objectId = new mongoose.Types.ObjectId(productId);
        if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ success: false, message: "Invalid Product ID" });
    }

        const reviews = await reviewModel.find({product: new mongoose.Types.ObjectId(productId),}).populate('user','username')
        res.json({success:true,reviews})
    } catch (error) {
        res.json({success:false,message:error.message});
        
    }
}
//add review to the product
const addReview = async (req,res) => {
    try {
        const {rating,comment,userId} = req.body;
        const productId = req.params.productId;
        
        const reviewedBefore = await reviewModel.findOne({
            user:userId,
            product:productId
        })
        
        if(reviewedBefore){
            return res.json({success:false,message:'You have already reviewed the product'})
        }

        const review = new reviewModel({
            user:userId,
            product:productId,
            rating,
            comment
        })

        await review.save();

        res.json({success:true,message:'review added successfully',review})
    } catch (error) {
        console.log(error);
        
        res.json({success:false,message:error.message});
        
    }
}

export {getAllReviews,addReview,getReviewOfProduct}