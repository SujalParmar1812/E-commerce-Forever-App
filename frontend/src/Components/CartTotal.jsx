import React, { useContext } from 'react'
import { ShopContext } from '../Context/ShopContext'
import Title from './Title';

const CartTotal = () => {
    const {currency,deliveryFee,getCartAmount } = useContext(ShopContext);
    const subtotal = getCartAmount();
  return (
    <div className='w-full'>
        <div className='text-2xl'>
            <Title text1={'CART'} text2={'TOTAL'}/>
        </div>
        <div className='flex flex-col gap-2 mt-2 text-sm'>
            <div className='flex justify-between'>
                <p>Subtotal</p>
                <p>{currency}{subtotal}.00</p>
            </div>
            <hr />
            <div className='flex justify-between'>
                <p>Shipping Fee</p>
                <p>{currency}{deliveryFee}.00</p>
            </div>
            <hr />
            <div className='flex justify-between'>
                <b>Total</b>
                <b>{currency}{subtotal==0?0:subtotal+deliveryFee}.00</b>
            </div>
        </div>
    </div>
  )
}

export default CartTotal
