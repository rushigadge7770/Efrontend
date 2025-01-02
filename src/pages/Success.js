import React from 'react'
import successImg from "../assest/Animation - 1731730887111.gif"
import { Link } from 'react-router-dom'

const Success = () => {
  return (
    <div className='bg-slate-300 w-full max-w-md mx-auto flex justify-center items-center flex-col p-4 m-2 rounded'>
      <img src={successImg} width={350} height={350}/>
      <p className='text-green-500 font-bold text-xl '>Payment Successful</p>
      <Link to={'/order'} className='p-2 my-2 border-2 border-green-600 rounded text-semibold text-color-600 hover:bg-green-600 hover:text-white'>See Order</Link>
    </div>
  )
}

export default Success

