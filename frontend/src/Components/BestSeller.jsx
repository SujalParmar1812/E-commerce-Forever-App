import React, { useContext,useState,useEffect } from 'react'
import { ShopContext } from '../Context/ShopContext'
import Title from './Title';
import ProductItem from './ProductItem';

const BestSeller = () => {
    const {products} = useContext(ShopContext);
    const [bestSeller, setBestSeller] = useState([]);

    useEffect(() => {
        const bestProduct = products.filter((product)=>(product.bestSeller));
        setBestSeller(bestProduct.slice(0,5));
    }, [products]);
  return (
    <div className='my-10'>
        <div className='text-center text-3xl py-8'>
             <Title text1={'BEST'} text2={'SELLER'}/>
             <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>Explore our bestsellers—customer favorites loved for their style, quality, and comfort. These top picks are selling fast, so grab yours before they're gone!</p>
        </div>
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
            {
                bestSeller.map((product,idx)=>(
                    <ProductItem key={idx} name={product.name} id={product._id} image={product.image} price={product.price}/>
                ))
            }
        </div>
    </div>  
  )
}

export default BestSeller
