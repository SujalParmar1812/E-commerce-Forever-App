import React, { useContext,useState,useEffect } from 'react'
import { ShopContext } from '../Context/ShopContext'
import ProductItem from './ProductItem'
import Title from './Title'
import { useParams } from 'react-router-dom'

const RelatedProducts = ({category,subCategory}) => {
    const {products} = useContext(ShopContext)
    const {productId} = useParams();

    const [related, setRelated] = useState([]);

    useEffect(() => {
        if(products.length>0){
            let productCopy = products.slice();

            productCopy = productCopy.filter((product)=>category === product.category)
            productCopy = productCopy.filter((product)=>subCategory === product.subCategory)
            productCopy = productCopy.filter((product)=>product._id!==productId)

            setRelated(productCopy.slice(0,5))
        }
    }, [products,productId]);
  return (
    <div className='my-24'>
        <div className='text-center text-3xl py-2'>
        <Title text1={'RELATED'} text2={'PRODUCTS'}/>
        </div>
        <div className='grid grid-cols-2 sm:gris-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4  gap-y-6'>
        {
            related.map((product,idx)=>( <ProductItem key={idx} name={product.name} image={product.image} id={product._id} price={product.price} /> ))
        }
        </div>
    </div>
  )
}

export default RelatedProducts
