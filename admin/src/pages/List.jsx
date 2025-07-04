import axios from 'axios';
import React,{useEffect,useState} from 'react';
import { backendURL, currency } from '../App';
import { toast } from 'react-toastify';


const List = ({token}) => {

  const [listProducts, setListProducts] = useState([]);

  const fetchList = async () => {
      try {
        const response = await axios.get(backendURL+'/api/product/list');
        setListProducts(response.data.products);
        console.log(response.data);
        
        console.log(listProducts);
        
        
        
      } catch (error) {
        toast.error(error.message);
      }
  }

  const removeProduct = async (id) => {
      try {
        const response = await axios.post(backendURL+'/api/product/remove',{id},{headers:{token}});

        if(response.data.success){
          toast.success(response.data.message)
          await fetchList();


        }else{
          toast.error(response.data.message)
        }
      } catch (error) {
        
        toast.error(error.message)
      }
  }

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div>
      <p className='mb-2'>All Products List</p>
      <div className='flex flex-col gap-2'>

        <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr_1fr] text-white bg-gray-600 py-1 px-2'>
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Sub-ategory</b>
          <b>Price</b>
          <b>Action</b>
          </div>

      {
        listProducts.map((item,index)=>(
          <div className='grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border border-gray-300 text-sm' key={index}>
          <img className='w-20' src={item.image[0]} alt="" srcset="" />
          <p>{item.name}</p>
          <p>{item.category}</p>
          <p>{item.subCategory}</p>
          <p>{currency}{item.price}</p>
          <p className='text-right md:text-center cursor-pointer text-lg' onClick={()=>removeProduct(item._id)}>x</p>
          
        </div>
        ))
      }
      </div>
      
    </div>
  )
}

export default List
