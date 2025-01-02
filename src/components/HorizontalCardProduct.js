// Component: HorizontalCardProduct
import React, { useContext, useEffect, useRef, useState } from "react";
import fetchCategoryWiseProduct from "../helper/fetchCategoryWiseProduct";
import displayINRCurrency from "../helper/displayCurrancy";
import {  FaAngleRight } from 'react-icons/fa6';
import { FaAngleLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import addToCart from "../helper/addToCart";
import Context from "../context";
const HorizontalCardProduct = ({ category, heading }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const loadingList = new Array(13).fill(null);
  const [scroll,setScroll] = useState(0)
  const scrollElement = useRef()

  const {fetchUserAddToCard} = useContext(Context)

  const handleAddToCard = async(e,id) =>{
    await addToCart(e,id)
   fetchUserAddToCard()

  }






  console.log(data);

  const fetchData = async () => {
    setLoading(true);
    const categoryProduct = await fetchCategoryWiseProduct(category);
    setLoading(false);

    setData(categoryProduct?.data);
  };

  useEffect(() => {
    fetchData();
  }, [category]); // Depend on category to re-fetch when it changes

  const scrollRight = () =>{
    scrollElement.current.scrollLeft += 100
}
const scrollLeft = () =>{
    scrollElement.current.scrollLeft -= 100

}




  return (
    <div className="container mx-auto px-4 my-6">
      <h2 className="text-2xl font-semibold text-gray-900 py-2">{heading}</h2>
<div className="flex items-center gap-4 md:gap-6 overflow-scroll scrollbar-none transition-all" ref={scrollElement}>


<button  className='bg-white shadow-md rounded-full p-1 absolute left-0 text-lg hidden md:block' onClick={scrollLeft}><FaAngleLeft/></button>
            <button  className='bg-white shadow-md rounded-full p-1 absolute right-0 text-lg hidden md:block' onClick={scrollRight}><FaAngleRight/></button> 

{
    loading ? (
        loadingList.map((product, index) => (
        <div key={index} className="w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-36 bg-white rounded-lg shadow flex">
          <div className="bg-violet-100 h-full p-4 min-w-[120px] w-40 md:w-40 border-r-2 border-b-2 border-violet-500 animate-pulse">
            
           
          </div>
          <div className="p-4 grid">
            <h2 className="font-medium text-base md:text-md text-ellipsis line-clamp-1  bg-slate-300 w-full my-2"></h2>
         <p className=" capitalize text-slate-500  bg-slate-300 w-full h-10"></p>
         <div className="flex gap-3 ">
          <p className="text-red-600 font-semibold  bg-slate-300 w-20 my-2"></p>
          <p className="text-slate-500 line-through bg-slate-300 w-20 my-2"></p>
          </div>
          <button className="bg-slate-300 w-40 px-3 py-0.5 text-sm text-white rounded-full"></button>
          </div>
          
        </div>
    ))

    ):(
    Array.isArray(data) && data.map((product, index) => (
        <Link  to={"product/"+product?._id} key={index} className="w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-36 bg-white rounded-lg shadow flex">
          <div className="bg-violet-100 h-full p-4 min-w-[120px] w-40 md:w-40 border-r-2 border-b-2 border-violet-500 ">
            {product.productImage && product.productImage.length > 0 ? (
              <img src={product.productImage[0]} alt={`Product ${index}`} className="object-scale-down h-full hover:scale-110 transition-all px-2 mix-blend-multiply" />
            ) 
            : (
              <p>No image available</p>
            )}
           
          </div>
          <div className="p-4 grid">
            <h2 className="font-medium text-base md:text-md text-ellipsis line-clamp-1">{product?.productName}</h2>
         <p className=" capitalize text-slate-500">{product?.category}</p>
         <div className="flex gap-3 ">
          <p className="text-red-600 font-semibold">{ displayINRCurrency(product?.sellingPrice) }</p>
          <p className="text-slate-500 line-through">{ displayINRCurrency(product?.price)}</p>
          </div>
          <button className="bg-red-600 hover:bg-red-500 px-3 py-0.5 text-sm text-white rounded-full" onClick={(e)=>handleAddToCard(e,product?._id)}>Add To Cart</button>
          </div>
          
        </Link>
      )))
      }
</div>
      
    </div>
  );
};

export default HorizontalCardProduct;
