import React from 'react'
import Title from '../Components/Title'
import { assets } from '../assets/frontend_assets/assets'
import NewsLetterBox from '../Components/NewsLetterBox'

const Contact = () => {
  return (
    <div>
      <div className='text-center text-2xl pt-10 border-t'>
        <Title text1={"CONTACT"} text2={"US"}/>
      </div>

      <div className='my-10 flex flex-col md:flex-row justify-center gap-10 mb-28'>
        <img className='w-full md:max-w-[480px]  ' src={assets.contact_img} alt="" />
        <div className='flex flex-col justify-center items-start gap-6'>
          <p className='font-semibold text-xl text-gray-600'>Our Store</p> 
          <p className='text-gray-500'>Forever Clothing <br /> 123 Fashion Street, <br />Sector 9, Ahmedabad, 380015 <br />Gujarat, India</p>
          <p className='text-gray-500'>contact : +91 99999 99999 <br /> Email : contact@company.com</p>
          <p className='font-semibold text-xl text-gray-600'>Careers at Forever</p>
          <p className='text-gray-500'>Learn more about our teams and job openings</p>
          <button className='border border-black px-8 py-4 text-sm hover:bg-black hover:text-white cursor-pointer transition-all duration-500'>Explore Jobs</button>
        </div>
      </div>
      
      <NewsLetterBox/>
    </div>
  )
}

export default Contact
