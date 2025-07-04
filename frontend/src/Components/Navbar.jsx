import React, { useContext, useState ,useEffect} from "react";
import { assets } from "../assets/frontend_assets/assets";
import { Link, NavLink, useLocation } from "react-router-dom";
import { ShopContext } from "../Context/ShopContext";

const Navbar = () => {
  const {showSearch,setShowSearch,getCartCount,navigate,token,setToken,setCartItems} = useContext(ShopContext)
  
  const [Visible, setVisible] = useState(false);
  const [searchTrue, setSearchTrue] = useState(false);

  const location = useLocation();


  const logout = async () => {
    navigate('/login');
    localStorage.removeItem('token');
    setToken('');
    setCartItems({})
  }

  useEffect(() => {
    if(location.pathname.includes('collection')){
      setSearchTrue(true);
    }else{
      setSearchTrue(false);
    }
  }, [location.pathname]);
  return (
    <div className="flex items-center justify-between py-5 font-medium bg-white">
      <img src={assets.logo} className="w-36" alt="logo" />
      <ul className="hidden sm:flex gap-5 text-sm text-black ">
        <NavLink to="/" className="flex flex-col items-center gap-1">
          <p>HOME</p>
          <hr className="w-2/4 border-none h-[2px] bg-gray-700 hidden " />
        </NavLink>
        <NavLink to="/collection" className="flex flex-col items-center gap-1">
          <p>COLLECTION</p>
          <hr className="w-2/4 border-none h-[2px] bg-gray-700 hidden " />
        </NavLink>
        <NavLink to="/about" className="flex flex-col items-center gap-1">
          <p>ABOUT</p>
          <hr className="w-2/4 border-none h-[2px] bg-gray-700 hidden " />
        </NavLink>
        <NavLink to="/contact" className="flex flex-col items-center gap-1">
          <p>CONTACT</p>
          <hr className="w-2/4 border-none h-[2px] bg-gray-700 hidden " />
        </NavLink>
      </ul>
      <div className="flex items-center gap-6">
        <img
          src={assets.search_icon}
          className={`w-5 cursor-pointer ${searchTrue?'block':'hidden'}`}
          alt="search"
          onClick={()=>setShowSearch(!showSearch)}
        />
        <div className="group relative">
          {" "}
          <img  onClick={()=>token?null:navigate('/login')}
            src={assets.profile_icon}
            className="w-5 cursor-pointer"
            alt=""
          />
          {/* dropdown menu */}

          {token && <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4">
            <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded">
              <p className="cursor-pointer hover:text-black border-b-4">My profile</p>
              <p onClick={()=>navigate('/orders')} className="cursor-pointer hover:text-black border-b-4">Orders</p>
              <p onClick={()=>logout()} className="cursor-pointer hover:text-black border-b-4">Logout</p>
            </div>
          </div>}
        </div>
        <Link to="/cart" className="relative">
          <img src={assets.cart_icon} className="w-5 min-w-5" alt="" />
          <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 aspect-square rounded-full text-[8px] bg-black text-white">
            {getCartCount()}
          </p>
        </Link>
        <img
          onClick={() => setVisible(true)}
          src={assets.menu_icon}
          className="w-5 cursor-pointer sm:hidden"
          alt=""
        />
      </div>
      {/* sidebar menu for small screens */}
      <div
        className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${
          Visible ? "w-full" : "w-0"
        }`}
      >
        <div className="flex flex-col text-slate-400">
          <div
            onClick={() => setVisible(false)}
            className="flex items-center gap-4 p-5 cursor-pointer "
          >
           
            <img
              className="h-4 transition-all rotate-180"
              src={assets.dropdown_icon}
              alt=""
              />
            <p>Back</p>
          </div>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 pl-6 hover:text-black"
            to="/"
          >
            HOME
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 pl-6 hover:text-black"
            to="/collection"
          >
            COLLECTION
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 pl-6 hover:text-black"
            to="/about"
          >
            ABOUT
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 pl-6 hover:text-black"
            to="/contact"
          >
            CONTACT
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
