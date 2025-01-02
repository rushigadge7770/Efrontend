import React, { useState } from 'react';
import Role from '../common/role';
import { IoMdClose } from "react-icons/io";
import { toast } from 'react-toastify';

export const ChangeUserRole = ({
    name,
    email,
    role,
    userId,
    onClose,
   callFunc
}) => {
    const [userRole , setuserRole] = useState(role)
    const handleOnChange = (e) => {
        setuserRole(e.target.value)
        console.log(e.target.value)
    }

    const updateUserRole = async() => {
    const fetchResponse = await fetch("http://localhost:8080/api/update-user",{
        method : "post",
        credentials : 'include',
        headers : {
            "content-type" : "application/json"
        },
        body : JSON.stringify({
          userId : userId,
            role : userRole
        })
    })

    const responseData = await fetchResponse.json()
    if(responseData.success){
        toast.success(responseData.message)
        onClose()
        callFunc() // calling the parent component function to refresh the users list after role change
    }

    console.log("role updated",responseData)

}
    
  return (
    <div>
    <div className='fixed top-0 bottom-0 left-0 right-0 w-full h-full z-10 flex justify-center items-center bg-slate-200 bg-opacity-60 '>
        <div className='m-auto mx-auto bg-white shadow-md p-2 max-w-sm px-4'>
        <button className='block ml-auto' onClick={onClose} >
        <IoMdClose /> </button>
        <h1 className='text-black font-bold mx-3 mb-2 '>Change User Role</h1>
        <p className='py-1'>Name:{name}</p>
        <p className='py-1'>Email:{email}</p>
          <label className='py-1'>
            New Role:
            <select name="role" className='border py-1' value={userRole} onChange={handleOnChange}>
            {
                Object.values(Role).map(el =>{
                    return <option key={el} value={el}>{el}</option>

                })
            }
         
            </select>
          </label>
          <button className='mx-auto w-fit block border p-1 bg-violet-600 mt-2 rounded-3xl'onClick={updateUserRole}>Change Role</button>
          </div>
       
  
        </div>
      </div>
 
  )
}
