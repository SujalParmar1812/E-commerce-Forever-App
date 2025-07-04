import React, { useContext,useState,useEffect } from 'react'
import { ShopContext } from '../Context/ShopContext'
import { useParams } from 'react-router-dom'
import { assets } from '../assets/frontend_assets/assets';
import RelatedProducts from '../Components/RelatedProducts';

const Product = () => {

  const {productId} =  useParams();
  const {products,currency,addToCart} = useContext(ShopContext);

  const [productsData, setProductsData] = useState(false);
  
  const [image, setImage] = useState('');
  const [size, setSize] = useState('');

  const fetchProductData = () =>{
    products.map((product)=>{
      if(product._id === productId){
        setProductsData(product); 
        setImage(product.image[0]);  
             
        return null;

      }
    })
  }

  useEffect(() => {
    fetchProductData();
  }, [productId]);

  return productsData? (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100 '>
        {/* product data */}
      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'> 
        {/* product images */}
          <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
            <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
              {
                productsData.image.map((productImage,idx)=> <img onClick={()=>setImage(productImage)} src={productImage} key={idx} className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer' alt="" /> )
              }
            </div>
            <div className='w-full sm:w-[80%]'>
              <img src={image} alt="" className='w-full h-auto' />
            </div>
          </div>
          {/* product info */}
          <div className='flex-1'>
            <h1 className='font-medium text-2xl mt-2 '>{productsData.name}</h1>
            <div className='flex items-center gap-1 mt-2'>
              <img className='w-3' src={assets.star_icon} alt="" /><img className='w-3' src={assets.star_icon} alt="" /><img className='w-3' src={assets.star_icon} alt="" /><img className='w-3' src={assets.star_icon} alt="" /><img className='w-3' src={assets.star_dull_icon} alt="" />
              <p className='pl-2'>(122)</p>
            </div>
            <p className='mt-3 text-3xl font-medium'>{currency}{productsData.price}</p>
            <p className='mt-5 text-slate-500 md:w-4/5'>{productsData.description}</p>
            <div className='flex flex-col gap-4 my-8'>
              <p>Select size</p>
              <div className='flex gap-2'>
                {
                  productsData.sizes.map((productSize,idx)=>( <button onClick={()=>setSize(productSize)} key={idx} className={`border-3 bg-slate-500 hover:bg-slate-700 cursor-pointer text-white px-4 py-2 ${productSize===size?'border-black':''}`}>{productSize}</button> ))
                }
              </div>
            </div>
            <button className='bg-black text-white px-8 py-3 text-sm active:bg-slate-700 cursor-pointer' onClick={()=>addToCart(productsData._id,size)}>ADD TO CART</button>
            <hr className='mt-8 sm:w-4/5 text-slate-300'/>
            <div className='text-sm text-slate-500 mt-5 flex flex-col gap-1'>
                <p>100% Original Product</p>
                <p>Cash on delivery available on this product.</p>
                <p>Easy return and exchange policy within 7 days.</p>
            </div>
          </div>
      </div>
      <div className='mt-20'>
        <div className='flex'>
          <b className='border-t border-l border-r px-5 py-3 text-sm text-slate-500'> Description</b>
          <p className='border-r border-t px-5 py-3 text-sm text-slate-500'>Reviews (122)</p>
        </div>
        <div className='flex flex-col gap-4 border px-6 py-6 text-sm text-slate-500'>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis, cumque maiores facilis ad ducimus fugit pariatur qui cupiditate possimus accusantium?</p>
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestiae ea possimus odit! A nihil asperiores harum.</p>
        </div>
      </div>
      <div>
        <RelatedProducts category={productsData.category} subCategory={productsData.subCategory}/>
      </div>
    </div>
  ): <div className='opacity-0'></div>
}

export default Product
