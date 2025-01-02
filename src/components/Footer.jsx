import React from 'react'

const Footer = () => {

  return (
    <>
    <footer className=' bg-slate-300 mt-7'>

    <div className="container  flex items-center justify-center p-7">
      <p className='font-bold'>
      &copy; {new Date().getFullYear()} Its Rushikesh Gadge's Website. All rights reserved. | Design: <a href="https://tailwindcss.com/">Tailwind CSS</a> | Code: <a href="https://github.com/rushigadge7770">GitHub</a>  |
      </p>
   
    </div>

    </footer>
    
    
    </>
  )
}

export default Footer