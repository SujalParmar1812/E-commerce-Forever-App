import React, { useContext,useState,useEffect } from 'react'
import { ShopContext } from '../Context/ShopContext';
import ProductItem from '../Components/ProductItem';
import { assets } from '../assets/frontend_assets/assets';
import Title from '../Components/Title';

const Collection = () => {
  const {products,search,showSearch} = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState('relavent');

  const toggleCategory = (e) =>{
    if(category.includes(e.target.value)){
      setCategory((prev=>prev.filter(product=>product!==e.target.value)))
    }else{
      setCategory(prev=>[...prev,e.target.value])
    }
  }

  const toggleSubCategory = (e) =>{
    if(subCategory.includes(e.target.value)){
      setSubCategory((prev=>prev.filter(product=>product!==e.target.value)))
    }else{
      setSubCategory(prev=>[...prev,e.target.value])
    }
  }

  const applyFilter = () =>{
    let productsCopy = products.slice();
    if(category.length>0){
      productsCopy = productsCopy.filter((product)=>category.includes(product.category))
    }
    if(subCategory.length>0){
      productsCopy = productsCopy.filter((product)=>subCategory.includes(product.subCategory))
    }
    if(showSearch && search){
        productsCopy = productsCopy.filter(product=>product.name.toLowerCase().includes(search.toLowerCase()))
    }
    setFilterProducts(productsCopy);
  }

  const sortProducts = () =>{
    const filteredProducts = filterProducts.slice();

    switch(sortType){
      case 'low-high':
        setFilterProducts(filteredProducts.sort((a,b)=>(a.price-b.price)))
        break;
      case 'high-low':
        setFilterProducts(filteredProducts.sort((a,b)=>(b.price-a.price)))
        break;
      default:
        applyFilter();
        break;
    }
  }

// useEffect(() => {
//   setFilterProducts(products);
// }, []);

//   useEffect(() => {
//     console.log(category);
//     console.log(subCategory);
    
//   }, [category,subCategory]);

  useEffect(() => {
    applyFilter();
  }, [category,subCategory,search,showSearch,products]);

  useEffect(() => {
    sortProducts();
  }, [sortType]);

  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
      {/* Filter optiion */}
      <div className='min-w-60'>
        <p onClick={()=>setShowFilter(!showFilter)} className='my-2 text-xl flex items-center cursor-pointer gap-2'>FILTERS
        <img src={assets.dropdown_icon} alt="" className={`h-3 sm:hidden transition-all ease-in ${showFilter?'rotate-90':''}`} />
        </p>
        {/* Category filter */}
        <div className={`border border-slate-400 pl-5 py-3 mt-3 sm:block ${showFilter?'':'hidden'}`}>
          <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
          <div className='flex flex-col gap-2 text-sm font-light text-slate-700'>
            <p className='flex gap-2'> <input type="checkbox" className='w-3 cursor-pointer' name="" id="" value={'Men'} onChange={toggleCategory}/>Men</p>
            <p className='flex gap-2'> <input type="checkbox" className='w-3 cursor-pointer' name="" id="" value={'Women'} onChange={toggleCategory}/>Women</p>
            <p className='flex gap-2'> <input type="checkbox" className='w-3 cursor-pointer' name="" id="" value={'Kids'} onChange={toggleCategory}/>Kids</p>
          </div>
        </div>
        {/* Sub-category filter */}
        <div className={`border border-slate-400 pl-5 py-3 my-5 sm:block ${showFilter?'':'hidden'}`}>
          <p className='mb-3 text-sm font-medium'>TYPE</p>
          <div className='flex flex-col gap-2 text-sm font-light text-slate-700'>
            <p className='flex gap-2'> <input type="checkbox" className='w-3 cursor-pointer' name="" id="" value={'Topwear'} onChange={toggleSubCategory}/>Topwear</p>
            <p className='flex gap-2'> <input type="checkbox" className='w-3 cursor-pointer' name="" id="" value={'Bottomwear'} onChange={toggleSubCategory}/>Bottomwear</p>
            <p className='flex gap-2'> <input type="checkbox" className='w-3 cursor-pointer' name="" id="" value={'Winterwear'} onChange={toggleSubCategory}/>Winterwear</p>
          </div>
        </div>
      </div>
      <div className='flex-1'>
        <div className='flex justify-between items-center'>
          <Title text1={'ALL'} text2={'COLLECTIONS'}/>
          {/* sort products */}
          <select name="" id="" onChange={(e)=>setSortType(e.target.value)} className='outline-none border-2 border-slate-200 px-2 text-sm'>
            <option value="relavent">Sort by: Relavent</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
          </div>
          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
            {
              filterProducts.map((product,idx)=>( <ProductItem key={idx} image={product.image} name={product.name} id={product._id} price={product.price}/>))
            }
          </div>
      </div>
    </div>
  )
}

export default Collection
