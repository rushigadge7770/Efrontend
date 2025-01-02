
import { Outlet } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import { ToastContainer } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
import Context from './context';
import { useDispatch, useStore } from 'react-redux';
import { setUserDetails } from './store/userSlice';




function App() {
  const dispatch = useDispatch()
  const [cartProductCount , setCartProductCount] = useState(0)

  const fetchUsers =  async () => {
    const dataResponse = await fetch("http://localhost:8080/api/user-details",{
      method:'get',
      credentials: 'include'
    })
    const dataApi = await dataResponse.json();
    

    if(dataApi.success) {
      dispatch(setUserDetails(dataApi.data))

    }
    
  }

  const fetchUserAddToCard = async() =>{
    const response = await fetch("http://localhost:8080/api/countaddtoproduct",{
      method:'get',
      credentials:'include'
    })
    const dataApi = await response.json();
   

    setCartProductCount(dataApi?.data?.count)

    if(dataApi.success) {
      dispatch(setUserDetails(dataApi.data))

    }
  }

  useEffect(()=>{
// user Details
    fetchUsers()
    // user add to Card details
    fetchUserAddToCard()

  })

  
 
  return (
    <>
    
    <Context.Provider value={
      {
        fetchUsers , //user details fetch
        cartProductCount, //count of product add to cart 
        fetchUserAddToCard // current user add to Card details
      }
    }>
        <ToastContainer
          position='top-center'
        />
    <Header/>
    <main className='min-h-[calc(100vh-110px)] pt-20'>
    <Outlet/>
    </main>
      
      <Footer/>
    </Context.Provider>

    </>
  );
}

export default App;
