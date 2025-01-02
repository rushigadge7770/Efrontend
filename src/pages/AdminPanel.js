import React, { useEffect } from 'react'
import { TbUserHexagon } from 'react-icons/tb'
import { useSelector } from 'react-redux'
import { Link, Outlet, useNavigate } from 'react-router-dom';
import role from '../common/role';

const AdminPanel = () => {
    const user = useSelector(state =>state?.user?.user)
    const Navigate = useNavigate()

useEffect(()=>{
  if(user?.role !== role.ADMIN){
    Navigate("/")
  }
})


  return (
    <div className='min-h-[calc(100vh-130px)] md:flex hidden'>
        <aside className='bg-white min-h-full w-full max-w-60 shadow-[rgba(0,0,0,0.4)]'>
<div className='h-34 bg-violet-400 flex justify-center items-center flex-col' >
<div className='text-5xl  cursor-pointer relative flex justify-center' >
      {
        user?.profilePic? (
          <img src={user?.profilePic} className=' w-28 h-28 rounded-full' alt="" />
        ):(
          <TbUserHexagon className='w-24 h-24 ml-2'/>
        )
      }
      
      </div>
      <p className='text-lg capitalize font-semibold'>{user?.name}</p>
      <p>{user?.role}</p>
</div>
 <div>
    {/* navigation */}
    <nav className=' py-4 grid'>
    <Link to={"all-users"} className='py-1 px-4 hover:bg-slate-200 '>All Users</Link>
        <Link to={"all-products"} className='py-1 px-4  hover:bg-slate-200 '>Products</Link>
    </nav>
 </div>
        </aside>
        <main>
<Outlet/>
        </main>
    </div>
  )
}

export default AdminPanel