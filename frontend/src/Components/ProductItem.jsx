import React, { useContext } from 'react'
import { ShopContext } from '../Context/ShopContext'
import { Link } from 'react-router-dom';

const ProductItem = ({id,image,name,price}) => {

    const {currency} = useContext(ShopContext);

  return (
    <div className='p-2 shadow-lg hover:shadow-xl transition ease-in-out'>
        <Link to={`/product/${id}`} className='text-gray-700 cursor-pointer'> 
            <div className='overflow-hidden'>
                <img className='hover:scale-110 transition ease-in-out' src={image[0]} alt="" />
            </div>
            <p className='pt-3 pb-1 text-sm'>{name}</p>
            <p className='text-sm font-medium'>{currency}{price} </p>
        </Link>
    </div>
  )
}

export default ProductItem
