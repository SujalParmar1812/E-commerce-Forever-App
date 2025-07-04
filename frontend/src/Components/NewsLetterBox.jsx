import React from 'react'

const NewsLetterBox = () => {

    const onSubmitHandler = (e) =>{
        e.preventDefault();
    }
  return (
    <div className='text-center'>
        <p className='text-2xl font-medium text-gray-700'>Subscribe now to get flat 20% off</p>
        <p className='text-gray-400 mt-3'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio, distinctio!</p>
        <form onSubmit={onSubmitHandler} className='w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3'>
            <input type="email" name="" required id="" placeholder='Enter your email' className='w-full flex-1 outline-none' />
            <button type="submit" className='bg-black text-white text-xs px-10 py-3'>SUBSCRIBE</button>
        </form>
    </div>

    
  )
}

export default NewsLetterBox
