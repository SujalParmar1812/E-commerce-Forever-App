import React, { useState } from 'react'
import axios from 'axios'
import { backendURL } from '../App';
import { toast } from 'react-toastify';
const Login = ({setToken}) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onSubmitHandler = async (e) => {
        try {
            e.preventDefault();
            console.log(email,password);
            const response = await axios.post(backendURL+'/api/user/admin',{email,password})
            if(response.data.success){
              setToken(response.data.token)
            }else{
              toast.error(response.data.msg);
            }
            
            
        } catch (error) {
            toast.error(error.message);
        }
    }

  return (
    <div className='flex items-center justify-center min-h-screen w-full'>
      <div className='bg-white shadow-md rounded-lg px-8 py-6 max-w-md'>
        <h1 className='text-2xl font-bold mb-4 text-center'>Admin Panel</h1>
        <form action="" onSubmit={onSubmitHandler}>
            <div className='mb-3 min-w-72'>
                <p className='text-sm font-medium text-gray-700 mb-2'>email address:</p>
                <input onChange={(e)=>setEmail(e.target.value)} className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none' value={email} type="email" name="" id="" placeholder='example@gmail.com' required/>
            </div>
            <div className='mb-3 min-w-72'>
                <p className='text-sm font-medium text-gray-700 mb-2'>password:</p>
                <input onChange={(e)=>setPassword(e.target.value)} className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none' value={password} type="password" name="" id="" placeholder='enter your password' required/>
            </div>
            <button type='submit' className='mt-2 w-full py-2 px-4 rounded-md hover:text-white bg-gray-600 hover:bg-black cursor-pointer transition-all duration-300'>login </button>
        </form>
      </div>
    </div>
  )
}

export default Login
