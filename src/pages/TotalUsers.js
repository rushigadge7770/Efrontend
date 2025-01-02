import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { FaEdit } from "react-icons/fa";
import './TotalUser.css';
import { ChangeUserRole } from '../components/ChangeUserRole';



export const TotalUsers = (userId) => {
    const [allUsers , setAllusers] = useState([])
    const [openUpdateRole,setOpenUpdateUser] = useState(false)
    const [updateUserDetails,setUpdateUserDetails] = useState({
      email:"",
      name:"",
      role:"",
      _id:"",
    })
    console.log('user',allUsers)
    
    const fetchAllUsers = async() =>{
        const fetchData= await fetch("http://localhost:8080/api/all-users",{
            method : "GET",
            credentials : 'include'
        })

        const dataResponse = await fetchData.json()
        

        if(dataResponse.success){
         setAllusers(dataResponse.data)
        }

        if(dataResponse.error){
            toast.error(dataResponse.message)
        }

    }

    useEffect(()=>{
        fetchAllUsers()
    },[])
 
  return (
    <>
    <table className='w-full tableUser my-7'>
      <thead className='px-24'>
      <tr>
        <th>Sr.</th>
        <th>Name</th>
        <th>Email</th>
        <th>Role</th>
        <th>Created Date</th>
        <th>Action</th>
        </tr>  
      </thead>
      <tbody className='pb-4 bg-slate-400'>
{
  allUsers.map((user,index) => (
    <tr key={index}>
      <td>{index+1}</td>
      <td>{user?.name}</td>
      <td>{user?.email}</td>
      <td>{user?.role}</td>
      <td>{new Date(user?.createdAt).toLocaleString()}</td>
      <td><button onClick={
        ()=>{
          setUpdateUserDetails(user)
          setOpenUpdateUser(true)
      }}>
      <FaEdit/>
      </button></td>
    </tr>
  ))
 
}
      </tbody>
      </table>
   
   {
    openUpdateRole && (
      <ChangeUserRole onClose={
        ()=>setOpenUpdateUser(false)}
      name={updateUserDetails.name}
      email={updateUserDetails.email}
      role={updateUserDetails.role}
      userId={updateUserDetails._id}
      callFunc={fetchAllUsers}
      />
    )
   }
   
    </>
  )
}
