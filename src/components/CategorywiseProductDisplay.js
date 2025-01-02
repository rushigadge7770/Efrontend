import React, { useContext, useEffect, useRef, useState } from "react";
import fetchCategoryWiseProduct from "../helper/fetchCategoryWiseProduct";
import displayINRCurrency from "../helper/displayCurrancy";
import {  FaAngleRight, FaTruckFieldUn } from 'react-icons/fa6';
import { FaAngleLeft } from "react-icons/fa";
import addToCart from "../helper/addToCart";
import { Link } from "react-router-dom";
import Context from "../context";
import scrollTop from "../helper/srollTop";

const CategoryWiseProductDisplay = ({ category, heading }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(FaTruckFieldUn);
    const loadingList = new Array(13).fill(null);
    const {fetchUserAddToCard} = useContext(Context)
    const handleAddToCard = async(e,id) =>{
      await addToCart(e,id)
      await fetchUserAddToCard()
 
    }

  
   
  
    console.log(data);
  
    const fetchData = async () => {
      setLoading(true);
      const categoryProduct = await fetchCategoryWiseProduct(category);
      setLoading(false);
      console.log("horizontal product", categoryProduct);
      setData(categoryProduct?.data);
    };
  
    useEffect(() => {
      fetchData();
    }, [category]); // Depend on category to re-fetch when it changes
  
   
  
  
    return (
      <div className="container mx-auto px-4 my-6">
        <h2 className="text-2xl font-semibold text-gray-900 py-2">{heading}</h2>
  <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,320px))] justify-between md:gap-6 overflow-x-scroll scrollbar-none transition-all my-1" >
  
  
  {
    loading ? (
        
        loadingList.map((product, index) => (
          <div key={index} className="w-full  min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px]  bg-white rounded-lg shadow ">
            <div className="bg-violet-100 h-48 p-4 min-w-[280px]  md:min-w-[145px] border-l-2 border-b-2 border-violet-500 flex justify-center items-center animate-pulse">
              
             
            </div>
            <div className="p-4 grid gap-3">
              <h2 className="font-medium text-base md:text-md text-ellipsis line-clamp-1 w-full h-4 bg-slate-300"></h2>
           <p className=" capitalize text-slate-500 w-full h-4 bg-slate-300"></p>
           <div className="flex gap-3 ">
            <p className="text-red-600 font-semibold w-full h-4 bg-slate-300" ></p>
            <p className="text-slate-500 line-through w-full h-4 bg-slate-300"></p>
            </div>
            <button className="px-3 py-0.5 text-sm text-white rounded-full w-full h-4 bg-slate-300"></button>
            </div>
            
          </div>
        ))
    ):(
    
    Array.isArray(data) && data.map((product, index) => (
          <Link to={"/product/"+product?._id} key={index} className="w-full  min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px]  bg-white rounded-lg shadow  " onClick={scrollTop}>
            <div className="bg-violet-100 h-48 p-4 min-w-[280px]  md:min-w-[145px] border-l-2 border-b-2 border-violet-500 flex justify-center items-center">
              {product.productImage && product.productImage.length > 0 ? (
                <img src={product.productImage[0]} alt={`Product ${index}`} className="object-scale-down h-full hover:scale-110 transition-all px-2 mix-blend-multiply" />
              ) 
              : (
                <p>No image available</p>
              )}
             
            </div>
            <div className="p-4 grid gap-3">
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
  }
  

export default CategoryWiseProductDisplay
