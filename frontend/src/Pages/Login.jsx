import React, { useContext, useState,useEffect } from 'react'
import { ShopContext } from '../Context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const Login = () => {

  const [currentState,setCurrentstate] = useState('Login')

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const {token,navigate,setToken,backendUrl} = useContext(ShopContext);

  const onSubmitHander = async (event) => {
 
    event.preventDefault();

    try {
      if(currentState === 'Signup'){
        const response = await axios.post(backendUrl+'/api/user/signup',{username,email,password}) 
        
        if(response.data.success){
          toast.success(response.data.message)
          setToken(response.data.token);
          localStorage.setItem('token',response.data.token)
        }else{
          toast.error(response.data.message)
        }
        
        
      }else{
        const response = await axios.post(backendUrl+'/api/user/login',{email,password})
        if(response.data.success){
          console.log(response.data);
          
          toast.success(response.data.message)
          setToken(response.data.token);
          localStorage.setItem('token',response.data.token)
        }else{
          toast.error(response.data.message)
        }
        
      }
            setUsername('')
            setEmail('')
            setPassword('');
    } catch (error) {
      toast.error(error.message);
    }
  }

  useEffect(()=>{
   if(token){
    navigate("/")
   }
    
  },[token])


  return (
    <form onSubmit={onSubmitHander} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'>
      <div className='inline-flex items-center gap-2 mb-2 mt-10'>
        <p className='prata-regular text-3xl'>{currentState}</p>
        <hr className='bornder-none h-[1.5px] w-8 bg-slate-800'/>
      </div>
      { 
      currentState==='Login'
      ?''
      : <input className='w-full px-3 py-2 border border-gray-800' placeholder='username' type="text" onChange={(e)=>setUsername(e.target.value)}  value={username} required/> 
      }
      <input className='w-full px-3 py-2 border border-gray-800' placeholder='email' type="email"  onChange={(e)=>setEmail(e.target.value)} value={email} required/>  
      <input className='w-full px-3 py-2 border border-gray-800' placeholder='password' type="password"  onChange={(e)=>setPassword(e.target.value)} value={password} required/>
      <div className='w-full flex justify-between text-sm mt-[-8px]'>
        <p className='cursor-pointer text-gray-500 hover:text-gray-800'>Forgot Password?</p>
        {
            currentState==='Login'
            ?<p onClick={()=>setCurrentstate('Signup')} className='cursor-pointer text-gray-500 hover:text-gray-800'>Create Account</p>
            : <p onClick={()=>setCurrentstate('Login')} className='cursor-pointer text-gray-500 hover:text-gray-800'>Login</p>
        }
      </div>
      <button className='bg-black text-white cursor-pointer font-light px-8 py-2 mt-4'>{currentState==='Login'?'sign in':'Sign up'}</button>
    </form>
  )
}

export default Login
