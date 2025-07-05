import React, { useContext } from 'react'
import { assets } from '../assets/frontend_assets/assets'
import { ShopContext } from '../Context/ShopContext'

const Footer = () => {
    const {navigate} = useContext(ShopContext)
  return (
    <div>
        <div className='flex flex-col sm:grid  grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
            <div>
                <img src={assets.logo} className='mb-5 w-32' alt="" />
                <p className='w-full md:w-2/3 text-gray-600'>
                    Bringing you the latest fashion trends with quality, comfort, and unbeatable style every day with Forever!
                </p>
            </div>
            <div>
                <p className='text-xl font-medium mb-5'>COMPANY</p>
                <ul className='flex flex-col gap-1 text-gray-600'>
                    <li onClick={()=>navigate('/')} className='cursor-pointer'>Home</li>
                    <li onClick={()=>navigate('/about')} className='cursor-pointer'>About us</li>
                    <li onClick={()=>navigate('/orders')} className='cursor-pointer'>My Orders</li>
                    <li onClick={()=>navigate('/contact')} className='cursor-pointer'>Contact Us</li>
                </ul>
            </div>
            <div>
            <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
            <ul className='flex flex-col gap-1 text-gray-600'>
                    <li>+91 99999 99999</li>
                    <li>contact@company.com</li>
                </ul>
            </div>
        </div>
        <div>
            <hr />
            <p className='py-5 text-sm text-center'>Copyright 2025@forever.com - All rights reserved.</p>
        </div>
    </div>
  )
}

export default Footer
