import React, { useState } from 'react'
import { assets } from '../admin-assets/assets'
import axios from 'axios';
import { backendURL } from '../App';
import { toast } from 'react-toastify';

const Add = ({token}) => {

  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  
  const [price, setPrice] = useState('');
  
  const [category, setCategory] = useState('Men');
  const [subCategory, setsubCategory] = useState('Topwear');

  const [bestSeller, setBestSeller] = useState(false);

  const [sizes, setSizes] = useState([]);
  

  const onSubmitHandler = async (e) => {

    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("name",name)
      formData.append("description",description)
      formData.append("price",price)
      formData.append("category",category)
      formData.append("subCategory",subCategory)
      formData.append("bestSeller",bestSeller)
      formData.append("sizes",JSON.stringify(sizes))

      image1 && formData.append("image1",image1)
      image2 && formData.append("image2",image2)
      image3 && formData.append("image3",image3)
      image4 && formData.append("image4",image4)

      const response = await axios.post(backendURL+"/api/product/add",formData,{headers:{token}})
      console.log(response);

      if(response.data.success){
        toast.success(response.data.message)
        setName('')
        setDescription('')
        setPrice('')
        setImage1(false)
        setImage2(false)
        setImage3(false)
        setImage4(false)

      }else{
        toast.error(response.dara.message)
      }
      
    } catch (error) {
      toast.error(error.message)
    }
  }


  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col w-full items-start gap3'>
      <div>
        <p className='mb-2'>Upload Images</p>
        <div className='flex gap-2'>
          <label htmlFor="image1" className='cursor-pointer'>
            <img className='w-20' src={image1?URL.createObjectURL(image1):assets.upload_area} alt="" />
            <input onChange={(e)=>setImage1(e.target.files[0])} type="file"  id="image1" hidden />
          </label>
          <label htmlFor="image2" className='cursor-pointer'>
            <img className='w-20' src={image2?URL.createObjectURL(image2):assets.upload_area} alt="" />
            <input onChange={(e)=>setImage2(e.target.files[0])} type="file"  id="image2" hidden />
          </label>
          <label htmlFor="image3" className='cursor-pointer'>
            <img className='w-20' src={image3?URL.createObjectURL(image3):assets.upload_area} alt="" />
            <input onChange={(e)=>setImage3(e.target.files[0])} type="file"  id="image3" hidden />
          </label>
          <label htmlFor="image4" className='cursor-pointer'>
            <img className='w-20' src={image4?URL.createObjectURL(image4):assets.upload_area} alt="" />
            <input onChange={(e)=>setImage4(e.target.files[0])} type="file"  id="image4" hidden />
          </label>
        </div>
      </div>

      <div className='w-full'>
        <p className='mb-2'>Product Name</p>
        <input onChange={(e)=>setName(e.target.value)} value={name} className='w-full max-w-[500px] px-3 py-2' type="text" placeholder='Type here'  required/>
      </div>
      <div className='w-full'>
        <p className='mb-2'>Product Description</p>
        <textarea onChange={(e)=>setDescription(e.target.value)} value={description} className='w-full max-w-[500px] px-3 py-2' type="text" placeholder='write content here'  required/>
      </div>
      <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-5'>


        <div >
          <p className='mb-2'>Product Category</p>
          <select onChange={(e)=>setCategory(e.target.value)} className='w-full px-3 py-2'>
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>
        <div>
          <p className='mb-2'>Product Sub-category</p>
          <select onChange={(e)=>setsubCategory(e.target.value)} className='w-full px-3 py-2'>
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winterwear">Winterwear</option>
          </select>
        </div>

        <div>
          <p className='mb-2'>Product Price</p>
          <input onChange={(e)=>setPrice(e.target.value)} value={price} className='w-full px-3 py-2 sm:w-[120px]' type="number"  placeholder='100'/>
        </div>
      </div>

      <div>
        <p className='mb-2'>Product Sizes</p>
        <div className='flex gap-3'>
          <div onClick={()=>setSizes(prev=>prev.includes('S')? prev.filter(item=>item!=='S'):[...prev,'S'])}>
            <p className={`${sizes.includes("S")?"bg-slate-600":"bg-slate-200"} px-3 py-1 cursor-pointer text-white`}>S</p>
          </div>
          <div onClick={()=>setSizes(prev=>prev.includes('M')? prev.filter(item=>item!=='M'):[...prev,'M'])}>
            <p className={`${sizes.includes("M")?"bg-slate-600":"bg-slate-200"} px-3 py-1 cursor-pointer text-white`}>M</p>
          </div >
          <div onClick={()=>setSizes(prev=>prev.includes('L')? prev.filter(item=>item!=='L'):[...prev,'L'])}>
            <p className={`${sizes.includes("L")?"bg-slate-600":"bg-slate-200"} px-3 py-1 cursor-pointer text-white`}>L</p>
          </div>
          <div onClick={()=>setSizes(prev=>prev.includes('XL')? prev.filter(item=>item!=='XL'):[...prev,'XL'])}>
            <p className={`${sizes.includes("XL")?"bg-slate-600":"bg-slate-200"} px-3 py-1 cursor-pointer text-white`}>XL</p>
          </div>
          <div onClick={()=>setSizes(prev=>prev.includes('XXL')? prev.filter(item=>item!=='XXL'):[...prev,'XXL'])}>
            <p className={`${sizes.includes("XXL")?"bg-slate-600":"bg-slate-200"} px-3 py-1 cursor-pointer text-white`}>XXL</p>
          </div>
        </div>
      </div>

      <div className='flex gap-2 mt-2'>
      <input className='cursor-pointer ' onChange={()=>setBestSeller(prev=>!prev)} checked={bestSeller} type="checkbox" id="bestseller" />
      <label htmlFor="bestseller">Add to best-seller</label>
      </div>

      <button type="submit" className='w-28 py-3 mt-4 bg-gray-600 text-white hover:bg-black cursor-pointer transition-all duration-300'>ADD</button>
    </form>
  )
}

export default Add
