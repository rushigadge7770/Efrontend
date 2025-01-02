import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import productCategory from "../helper/produtCategory";
import { IoCloudUpload } from "react-icons/io5";
import UploadImage from "../helper/UploadImage";
import DisplayImage from "./DisplayImage";
import { MdDelete } from "react-icons/md";
import {toast} from 'react-toastify'

const UploadProducts = ({
  fetchData,
  onClose
 }) => {
  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImage:[],
    description: "",
    price: "",
    sellingPrice: "",
  });
  console.log("Product",data)
  // useStates
  const [openFullScreenImage,setOpenFullScreenImage] = useState(false)
  const [fullScreenImage,setFullScreenImage] = useState("")

// const veriables




  const handleOnChange = (e) => {
    const {name, value} = e.target
    setData((preve)=>{
      return {
       ...preve,
     [name] : value
      }
    })

  }
  const handleUploadProducts =async(e) => {
    const file = e.target.files[0]
    
    const UploadImagecloud = await UploadImage(file)
    console.log("Upload", UploadImagecloud.url)
    setData((preve)=>{
      return {
       ...preve,
        productImage: [...preve.productImage,UploadImagecloud.url]
      }
    })
    
  }
  const handleDeleteProductImage =(index) => {

    const dltImage = [...data.productImage]
    dltImage.splice(index,1)
    setData((preve)=>{
      return {
       ...preve,
        productImage: [...dltImage]
      }
    })
  }

  // handle Submit 
  const handleSubmit = async(e) => {
    e.preventDefault();
const response = await fetch("http://localhost:8080/api/upload-product",{
  method : "post",
  credentials : 'include',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(data),
 
})
const responseData = await response.json()
if(responseData.success){
  toast.success(responseData?.message)
  onClose()
  fetchData()
}
if(responseData.error){
  toast.error(responseData?.message)
}
     
  }

  return (
    <div>
      <div className="fixed  w-full h-full bg-slate-200 bg-opacity-60 bottom-0 left-0 right-0 top-0 flex justify-center items-center">
        <div className="bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden">
          <div className="flex justify-between items-center">
            <h2 className="font-bold text-lg">upload Products</h2>
            <div
              className='w-fit ml-auto text-2xl' onClick={onClose}>
              <IoMdClose/>
            </div>
          </div>
          <form className="grid py-2 gap-3 overflow-y-scroll h-full" onSubmit={handleSubmit}>
            <label htmlFor="productName" className="ml-2 font-semibold">
              Product Name:
            </label>
            <input
              type="text"
              id="productName"
              name="productName"
              placeholder=" Enter Product Name"
              className="border-2 ml-2 bg-slate-100 py-2  rounded-sm"
              value={data.productName}
              onChange={handleOnChange}
              required
          
            />
            <label htmlFor=" brandName" className="ml-2 font-semibold mt-2">
              Brand Name:
            </label>
            <input
              type="text"
              id="brandName"
              name="brandName"
              placeholder="Enter Brand Name"
              className="border-2 ml-2 bg-slate-100 py-2  rounded-sm"
              value={data.brandName}
              onChange={handleOnChange}
              required
            />
            <label htmlFor="category" className="ml-2 font-semibold mt-2">
              category:
            </label>
            <select
             required
              value={data.category}
              name="category"
              className="border-2 ml-2 bg-slate-100 py-2  rounded-sm"
              onChange={handleOnChange}
            >
             <option  value="">
                 Select Category
                </option>
              {productCategory.map((cat,index) => (
                <option value={cat.value} key={cat.value+index} >
                  {cat.label}
                </option>
              ))}
            </select>
            <label htmlFor="productImage" className="ml-2 font-semibold mt-2">
              Product Image:
            </label>
            <label htmlFor='UploadImage'>
              <div className="border-2 bg-slate-100 py-2 w-full h-32 rounded-sm flex justify-center items-center flex-col">
            
                <span className="text-4xl">
                  <IoCloudUpload />
                  </span>
                <p className="text-sm">Upload Product Image</p>
                <input type="file" id='UploadImage' className="my-3 hidden" onChange={handleUploadProducts} />
               
              </div>
              </label>

              {
              data?.productImage[0] ? (
              <div className='flex items-center gap-2'>
              {
                data.productImage.map((img1, index) => (
                  <div className='relative group'>
                  <img 
                                        src={img1} 
                                        alt={img1.name}  
                                        width={100} 
                                        height={100}  
                                        className='bg-slate-100 border cursor-pointer' 
                                        onClick={()=>{
                                          setOpenFullScreenImage(true)
                                          setFullScreenImage(img1)
                                        }} 
                                       />
                                       <div className='absolute bottom-0 right-0 p-1 text-white bg-red-600 rounded-full hidden group-hover:block cursor-pointer' onClick={()=>handleDeleteProductImage(index)}>
                                          <MdDelete/>  
                                        </div>
                                       </div>
                ))
              }
              </div>
              ) : (
                      <p className='text-red-600 text-xs'>*Please upload product image</p>
                    )
                    }


<label htmlFor="price" className="ml-2 font-semibold mt-2">
            price: </label>
            <input
              type="number"
              id="price"
              name="price"
              placeholder=" Enter Your price"
              className="border-2 ml-2 bg-slate-100 py-2  rounded-sm"
              value={data.price}
              onChange={handleOnChange}
              required
            />

{/* selling price */}
<label htmlFor="sellingPrice" className="ml-2 font-semibold mt-2">
            selling price: </label>
            <input
              type="number"
              id="sellingPrice"
              name="sellingPrice"
              placeholder=" Enter Your selling price"
              className="border-2 ml-2 bg-slate-100 py-2  rounded-sm"
              value={data.sellingPrice}
              onChange={handleOnChange}
              required
            />

<label htmlFor="description" className="ml-2 font-semibold mt-2">
Description: </label>
<label htmlFor='description' className='mt-3'>Description :</label>
              <textarea 
                className='h-28 bg-slate-100 border resize-none p-1' 
                placeholder='enter product description' 
                rows={3} 
                onChange={handleOnChange} 
                name='description'
                value={data.description}
              >
              </textarea>


              <div className="flex justify-center items-center">
              <button className="w-40 bg-red-500 text-white px-2 py-2 mb-2 rounded ">upload Products</button>
              </div>
         
          </form>
        </div>
        {
        openFullScreenImage && (
          <DisplayImage onClose={()=>setOpenFullScreenImage(false)} imgurl={fullScreenImage}/>
        )
       }
      </div>

      {/* display image full screen */}
      
     
    </div>
  );
};

export default UploadProducts;
