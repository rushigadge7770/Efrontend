import React, {  useContext, useState } from 'react'
import sign from '../assest/media/signin.gif';
import { BsFillEyeFill } from "react-icons/bs";
import { HiEyeOff } from "react-icons/hi";
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Context from '../context';




const Login = () => {
    const [showPassword ,setShowPassword] = useState(true);
    const [data,setData] = useState({
    email: "",
    password: "",
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const navigate = useNavigate()
  const {fetchUsers } = useContext(Context)
  
 
  const handleSumbit = async(e) => {
    e.preventDefault();
   
    
      const DataResponse =await fetch("http://localhost:8080/api/login",{
       method:"post",
        credentials:'include', 
       headers: {
         'Content-Type': 'application/json'
       },
       body: JSON.stringify(data)
      })
      const datApi = await DataResponse.json();
     
      if(datApi.success) {
       toast.success(datApi.message)
       navigate('/')
       fetchUsers()
       
      
      }
      if(datApi.error) {
       toast.error(datApi.message)
      }

   
   
  
 }; 
  

  return (
  <>
  <section id='login'>
  <div className="container px-5 py-5 rounded-lg ">
    <div className=" bg-violet-200 py-5 w-full max-w-sm mx-auto ">

    <div className="mx-auto w-20 h-20">

    <img src={sign} alt="login page" className=' mix-blend-multiply' />
    </div>

    {/* form Creation */}
    <form action="" onSubmit={handleSumbit}  className='p-2  flex flex-col gap-2'>
    <div className='grid py-1'>
    <label htmlFor="" > <p className='font-normal px-1'>Email</p></label>
    <div className=' bg-violet-100'>
    <input type="email"
     placeholder='Enter Your Email' 
       name='email'
     value={data.email}
     onChange={handleOnChange}
     className='w-full h-full outline-none bg-transparent px-1'/></div>
    </div>
    <div className='py-1'>
        <label htmlFor=""><p className='font-normal px-1'>Password :</p></label>
       <div  className='flex  bg-violet-100'> 
       <input type= {showPassword ? 'password' : 'text'}  
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
    <div>
      <Link to='/forgotpassword' className='block w-fit ml-auto underline pr-3 hover:text-blue-800 '> Forgot Password</Link>
    </div>
<div className='mx-auto py-4'>
<button className='bg-violet-800 w-18 flex items-center justify-center mx-auto px-3 rounded-lg text-white hover:bg-violet-600' >Login</button>
</div>
  <div>
    <p>Don't have account ? <Link to='/signup' className='underline hover:text-blue-800'>sign-up</Link></p>
  </div>
    </form>
    </div>
    </div>
  </section>
    
  </>
  )
}

export default Login