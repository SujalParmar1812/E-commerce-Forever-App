import React from 'react'
import {assets} from "../admin-assets/assets.js"
const Navbar = ({setToken}) => {
  return (
    <div className='flex items-center py-2 px-[4%] justify-between'>
      <img className="w-[max(10%,80px)] " src={assets.logo} alt="" />
      <button className='bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm hover:bg-black transition-all duration-300 cursor-pointer' onClick={()=>setToken('')}>Logout</button>
    </div>
  )
}

export default Navbar
