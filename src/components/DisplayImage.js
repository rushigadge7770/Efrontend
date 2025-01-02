import React from 'react'
import { IoMdClose } from 'react-icons/io'

const DisplayImage = ({
    imgurl,
    onClose,
}) => {
  
  return (
  
    <div className='fixed top-0 right-0 bottom-0 left-0 flex justify-center items-center'>
    <div className='bg-white shadow-lg rounded max-w-5xl mx-auto px-4'>
    <div
              className='w-fit ml-auto text-2xl' onClick={onClose}>
              <IoMdClose
              />
            </div>
    <div className='flex justify-center p-5 max-w-[70vh] max-h-[80vh]'>
    <img src={imgurl} alt="Product Image" className="max-w-[70vh] max-h-[40vh] "/>  
    </div>
    </div>
    </div>
  
  )
}

export default DisplayImage