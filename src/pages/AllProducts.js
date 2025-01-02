import React, { useEffect, useState } from 'react'
import UploadProducts from '../components/UploadProducts'
import { AdminProductCard } from '../components/AdminProductCard'

export const AllProducts = () => {
  const[openuUploadProduct , setOpenUploadProduct] = useState(false)
const [allProducts,setAllProducts] = useState([])


const fetchAllProducts = async()=>{
  const response = await fetch("http://localhost:8080/api/get-products",{
  method : "get",
  credentials : 'include'
})
const dataResponse = await response.json()

setAllProducts(dataResponse?.data || [])
}
useEffect(()=>{
  fetchAllProducts()
},[])

  return (
    <div>
    <div className='bg-white py-2 px-4 flex justify-between items-center'>
      <h1 className='font-extrabold text-lg '>All Products</h1>
      <button className=' border-2 border-red-700 text-red-700 px-3 py-1  rounded-full' onClick={()=>setOpenUploadProduct(true)} >Updated products</button>
    </div>
{/* all products */}
 <div className='flex items-center flex-wrap gap-5 py-4 h-[calc(100vh-190px)] overflow-y-scroll '>
{
  allProducts.map((product,index) =>{
return (
<AdminProductCard data ={product} key={index+`allProducts`} fetchData ={fetchAllProducts}/>

  
)
  })
}
 </div>




{/* to upload products */}
{
  openuUploadProduct && (
    <UploadProducts  onClose={()=>setOpenUploadProduct(false)} fetchData={fetchAllProducts}/>         
  )
}
   
    </div>
  )
}
