import React, { useContext, useState, useEffect } from "react";
import { ShopContext } from "../Context/ShopContext";
import { useParams } from "react-router-dom";
import { assets } from "../assets/frontend_assets/assets";
import RelatedProducts from "../Components/RelatedProducts";
import axios from "axios";
import { toast } from "react-toastify";

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart, backendUrl, token } =
    useContext(ShopContext);

  const [productsData, setProductsData] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [reviewInput, setReviewInput] = useState("");
  const [stars, setStars] = useState(0);
  const [averageStars, setAverageStars] = useState(5);

  const [image, setImage] = useState("");
  const [size, setSize] = useState("");

  const fetchProductData = () => {
    products.map((product) => {
      if (product._id === productId) {
        setProductsData(product);
        setImage(product.image[0]);

        return null;
      }
    });
  };

  const getReviews = async () => {
    try {
      const response = await axios.get(backendUrl + `/api/review/${productId}`);
      if (response.data.success) {
        setReviews(response.data.reviews);
        
        
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const calculateAverage = async () => {
    let average = 0;
        if(reviews.length>0){
          reviews.forEach(review => {
              average+=review.rating
          }); 
          average = Math.ceil(average/reviews.length);
          setAverageStars(average);
        }
  }

  const addReview = async (e) => {
    e.preventDefault();
    try {
      let reviewData = {
        rating: stars,
        comment: reviewInput,
      };
      const response = await axios.post(
        backendUrl + `/api/review/${productId}`,
        reviewData,
        { headers: { token } }
      );
      if (response.data.success) {
        const reflectReview = response.data.review;
        setReviews((prev) => [...prev, reflectReview]);
        setReviewInput("");
        setStars(0);
        toast.success("review added");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchProductData();
    getReviews();
  }, [productId]);

  useEffect(() => {
    calculateAverage();
  }, [addReview]);

  return productsData ? (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100 ">
      {/* product data */}
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        {/* product images */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {productsData.image.map((productImage, idx) => (
              <img
                onClick={() => setImage(productImage)}
                src={productImage}
                key={idx}
                className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
                alt=""
              />
            ))}
          </div>
          <div className="w-full sm:w-[80%]">
            <img src={image} alt="" className="w-full h-auto" />
          </div>
        </div>
        {/* product info */}
        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2 ">{productsData.name}</h1>
          <div className="flex items-center gap-1 mt-2">
            {/* <img className="w-3" src={assets.star_icon} alt="" />
            <img className="w-3" src={assets.star_icon} alt="" />
            <img className="w-3" src={assets.star_icon} alt="" />
            <img className="w-3" src={assets.star_icon} alt="" />
            <img className="w-3" src={assets.star_dull_icon} alt="" /> */}
             {[...Array(averageStars)].map((_, i) => (
                    <img src={assets.rating} key={i} className="w-3" alt="" />
                  ))}
            <p className="pl-2">({reviews.length})</p>
          </div>
          <p className="mt-3 text-3xl font-medium">
            {currency}
            {productsData.price}
          </p>
          <p className="mt-5 text-slate-500 md:w-4/5">
            {productsData.description}
          </p>
          <div className="flex flex-col gap-4 my-8">
            <p>Select size</p>
            <div className="flex gap-2">
              {productsData.sizes.map((productSize, idx) => (
                <button
                  onClick={() => setSize(productSize)}
                  key={idx}
                  className={`border-3 bg-slate-500 hover:bg-slate-700 cursor-pointer text-white px-4 py-2 ${
                    productSize === size ? "border-black" : ""
                  }`}
                >
                  {productSize}
                </button>
              ))}
            </div>
          </div>
          <button
            className="bg-black text-white px-8 py-3 text-sm active:bg-slate-700 cursor-pointer"
            onClick={() => addToCart(productsData._id, size)}
          >
            ADD TO CART
          </button>
          <hr className="mt-8 sm:w-4/5 text-slate-300" />
          <div className="text-sm text-slate-500 mt-5 flex flex-col gap-1">
            <p>100% Original Product</p>
            <p>Cash on delivery available on this product.</p>
            <p>Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>
          <div className="flex items-center justify-center pt-20">
            <form
              onSubmit={addReview}
              className="border rounded-lg p-6 shadow-sm bg-white space-y-4 w-full sm:w-[500px]"
            >
              <h3 className="text-lg font-semibold text-gray-800">
                Write a Review
              </h3>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Your Rating
                </label>
                <div className="flex space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setStars(star)}
                      className={`text-xl ${
                        star <= stars ? "text-orange-500" : "text-gray-300"
                      } hover:scale-110 transition-transform`}
                    >
                      ★
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Your Comment
                </label>
                <textarea
                  value={reviewInput}
                  onChange={(e) => setReviewInput(e.target.value)}
                  rows="2"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                  placeholder="Share your experience..."
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={!stars || !reviewInput}
                className={`w-full py-2 rounded-md text-white font-medium transition ${
                  stars && reviewInput
                    ? "bg-black hover:bg-gray-800"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
              >
                Submit Review
              </button>
            </form>
          </div>
      <div className="mt-20">
        <div className="flex">
         
          <p className="border-t border-l border-r px-5 py-3 text-sm text-slate-500">
            Reviews ({reviews.length})
          </p>
        </div>
        <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-slate-500">

          {reviews &&
            reviews.map((review, index) => (
              <div key={index}>
                <h3 className="font-semibold">
                  {review?.user?.username || "User"}
                </h3>
                <p>{review.comment}</p>

                <div className="flex items-center ">
                  {[...Array(review.rating)].map((_, i) => (
                    <img src={assets.rating} key={i} className="w-3" alt="" />
                  ))}
                </div>
              </div>
            ))}

          {/* <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis, cumque maiores facilis ad ducimus fugit pariatur qui cupiditate possimus accusantium?</p> */}
        </div>
      </div>
      <div>
        <RelatedProducts
          category={productsData.category}
          subCategory={productsData.subCategory}
        />
      </div>
    </div>
  ) : (
    <div className="opacity-0"></div>
  );
};

export default Product;
