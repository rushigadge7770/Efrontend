import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import sign from '../assest/media/signin.gif';
import { BsFillEyeFill } from "react-icons/bs";
import { HiEyeOff } from "react-icons/hi";
import { toast } from 'react-toastify';
import allApi from '../common';
import imagebase64 from '../helper/imagebase64';


const Signup = () => {
    const [showPassword ,setShowPassword] = useState(true);
    const [ConfirmPassword ,setConfirmPassword] = useState(true);
    const [data, setData] = useState({
        name:"",
    email: "",
    password: "",
    confirmPassword: "",
    profilePic:""
  });

  const navigate = useNavigate()


  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setData((prev) => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = async(e) => {
    e.preventDefault();
    // console.log("Form submitted:", data)

    if(data.password === data.confirmPassword){
       const DataResponse =await fetch("http://localhost:8080/api/signup",{
        method: "post",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
       })
       const datApi = await DataResponse.json();
    
       if(datApi.success) {
        toast.success(datApi.message)
        navigate('/login')
       }
       if(datApi.error) {
        toast.error(datApi.message)
       }

    }else{
      toast.error("please check password and confirm password")
    }
    
  }; 

  console.log("Data stored:", data);
  
const handleUpload =async(e) => {
const file = e.target.files[0];
const imagepic = await imagebase64(file)
setData((prev) => ({
      ...prev,
      profilePic:imagepic
    }));
    // if (imagepic) {
    //   // Check if file is a valid type (optional)
    //   if (imagepic.type.startsWith("image/")) {
    //     // Create a new FileReader instance
    //     const reader = new FileReader();

    //     // Define the onload callback, where we get the result (the base64 data URL)
    //     reader.onload = () => {
    //       imagepic(reader.result);  // reader.result contains the base64 string
    //     };

    //     // Read the file as a data URL (base64 string)
    //     reader.readAsDataURL(file); // Ensure 'file' is of type File/Blob
    //   } else {
    //     alert("Please select a valid image file");
    //   }
    // } else {
    //   alert("No file selected");
    // }


}



  return (
    <>
        <section id='login'>
  <div className="container px-5 py-5 rounded-md">
    <div className=" bg-violet-200 py-5 w-full max-w-sm mx-auto ">

    <div className="mx-auto w-24 h-24 relative rounded-full overflow-hidden">
<div> <img src={data.profilePic||sign} alt="login page"className='w-full' /></div>
<form action="">
  <label >
  <div className=' bg-violet-100 flex items-center cursor-pointer justify-center w-full absolute top-12 text-xs h-12 opacity-75 '>
      <p>upload photo</p>
    </div>
    <input type="file" className='hidden' onChange={handleUpload}/>
  </label>
</form>
   
  
    </div>

    {/* form Creation */}
    <form action="" onSubmit={handleSubmit} className='p-2  flex flex-col gap-2'>


    <div className='grid py-1'>
    <label htmlFor="" > <p className='font-normal px-1' >Name</p></label>
    <div className=' bg-slate-100'>
    <input type="text" required
     placeholder='Enter Your Full Name' 
       name='name'
     value={data.name}
     onChange={handleOnChange}
     className='w-full h-full outline-none bg-transparent px-1'/></div>
    </div>

    <div className='grid py-1'>
    <label htmlFor="" > <p className='font-normal px-1'>Email</p></label>
    <div className=' bg-slate-100'>
    <input type="email" required
     placeholder='Enter Your Email' 
       name='email'
     value={data.email}
     onChange={handleOnChange}
     className='w-full h-full outline-none bg-transparent px-1'/></div>
    </div>



    <div className='py-1'>
        <label htmlFor=""><p className='font-normal px-1'>Password :</p></label>
       <div  className='flex  bg-slate-100'> 
       <input type= {showPassword ? 'password' : 'text'}
       required
         placeholder='Enter Your Password'
         name='password'
         value={data.password}
       onChange={handleOnChange }
          className='w-full h-full outline-none px-1 bg-transparent'/>
       <div className='text-lg cursor-pointer pr-3 ' onClick={()=>setShowPassword((pass)=>!pass)}><span>
       {
        showPassword ? (
          
            <BsFillEyeFill/>
           
        )
        : (
            
             <HiEyeOff/>
        )
       }
       
       </span>
        
       </div>
       </div>
    </div>

    {/* conferm password */}
    <div className='py-1'>
        <label htmlFor=""><p className='font-normal px-1'>Confirm Password :</p></label>
       <div  className='flex  bg-slate-100'> 
       <input type= {ConfirmPassword? 'password' : 'text'} 
       required
         placeholder='Renter Your Password'
         name='confirmPassword'
         value={data.confirmPassword}
       onChange={handleOnChange }
          className='w-full h-full outline-none px-1 bg-transparent'/>
       <div className='text-lg cursor-pointer pr-3 ' onClick={()=>setConfirmPassword((pass)=>!pass)}><span>
       {
        ConfirmPassword ? (
          
            <BsFillEyeFill/>
           
        )
        : (
            
             <HiEyeOff/>
        )
       }
       
       </span>
        
       </div>
       </div>
    </div>


  


<div className='mx-auto py-4'>
<button className='bg-violet-800 w-18 flex items-center justify-center mx-auto px-3 rounded-lg text-white hover:bg-violet-600' >Sign-Up</button>
</div>


  <div>
    <p>You already have an account ? <Link to='/login' className='underline hover:text-blue-800'>Login</Link></p>
  </div>
    </form>
    </div>
    </div>
  </section>
    </>
  )
}

export default Signup