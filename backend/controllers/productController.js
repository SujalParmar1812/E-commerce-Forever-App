import {v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js"

//function for add product
const addProduct = async (req,res) => {
    try {
        const {name, description, sizes, price,category,subCategory,bestSeller} = req.body;

        const image1 = req.files.image1 && req.files.image1[0];
        const image2 = req.files.image2 && req.files.image2[0];
        const image3 = req.files.image3 && req.files.image3[0];
        const image4 = req.files.image4 && req.files.image4[0];

        let images = [image1,image2,image3,image4].filter((item)=>item!==undefined);
        

        let imageUrl = await Promise.all(
            images.map(async(item)=>{
                let result = await cloudinary.uploader.upload(item.path,{resource_type:'image'});
                return result.secure_url;
            })
        )

        console.log(name,description,price,category,subCategory,sizes,bestSeller);
        console.log(imageUrl);
        
        
        const productData = ({
            name,
            description,
            category,
            price:Number(price),
            subCategory,
            bestSeller:bestSeller==="true"?true:false,
            sizes:JSON.parse(sizes),
            image:imageUrl,
            date:Date.now()

        })



        console.log(productData);

        const product = new productModel(productData);
        await product.save();
        

        res.json({success:true},productData); 
        
    } catch (error) {
        console.log(error);
        
        res.json({success:false,message:error.message})
    }
}


//function for listing products
const listProducts = async (req,res) => {
    try {

        const products = await productModel.find({});

        res.json({success:true,products});

        
    } catch (error) {
        res.json({success:false,message:error.message});
    }
}


//function for removing products
const removeProduct = async (req,res) => {
    try {
        await productModel.findByIdAndDelete(req.body.id);
        res.json(
            {success:true,message:"product removed successfully!"}
        )
    } catch (error) {
        res.json({success:false,message:error.message})
    }
}


//function for single product info
const singleProduct = async (req,res) => {
    try {

        const  {productId} = req.body;
        const product = await productModel.findById(productId)
        if(product===null){
            res.json({success:false,msg:"No such product exists"})
        }
        res.json({success:true,product})
        
    } catch (error) {
        res.json({success:false,message:error.message})
    }
}

export {addProduct,removeProduct,listProducts,singleProduct}