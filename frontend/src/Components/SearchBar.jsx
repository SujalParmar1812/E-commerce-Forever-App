import React, { useContext, useEffect ,useState} from 'react'
import { ShopContext } from '../Context/ShopContext'
import { assets } from '../assets/frontend_assets/assets';
import { useLocation } from 'react-router-dom';

const SearchBar = () => {

    const {search,setSearch,showSearch,setShowSearch} = useContext(ShopContext);
    const location = useLocation();
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if(location.pathname.includes('collection')){
            setVisible(true);
        }else{
            setVisible(false);
        }
        
    }, [location]);

  return  showSearch && visible?(
    <div className='border-t border-b bg-slate-50 flex items-center justify-center w-full'>
        <div className='flex items-center justify-center border border-slate-400 px-5 py-2 my-5 mx-3 rounded-full sm:w-1/2 w-3/4'>
            <input value={search} onChange={(e)=>setSearch(e.target.value)} type="text" name="" className='flex-1 outline-none bg-inherit text-sm' placeholder='Search' id="" />
            <img src={assets.search_icon} alt="" className='w-4' />
        </div>
        <img src={assets.cross_icon} onClick={()=>setShowSearch(false)} className='w-3 inline cursor-pointer' alt="" />
    </div>
  ):null
}

export default SearchBar
