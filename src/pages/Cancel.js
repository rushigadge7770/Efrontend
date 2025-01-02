import React from 'react'
import CancelImg from "../assest/Animation - 1731730764262.gif"
import { Link } from 'react-router-dom'

const Cancel = () => {
  return (
    <div>
       <div className='bg-slate-300 w-full max-w-md mx-auto flex justify-center items-center flex-col p-4 m-2 rounded'>
      <img src={CancelImg} width={250} height={250}/>
      <p className='text-red-500 font-bold text-xl '>Payment cancel</p>
      <Link to={'/cart'} className='p-2 my-2 border-2 border-red-600 rounded text-semibold text-red-600 hover:bg-red-600 hover:text-white'>Go To Card</Link>
    </div>
    </div>
  )
}

export default Cancel
