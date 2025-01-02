import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Login from "../pages/Login";
import ForgotPassword from "../pages/ForgotPassword";
import Signup from "../pages/Signup";
import AdminPanel from "../pages/AdminPanel";
import { AllProducts } from "../pages/AllProducts";
import { TotalUsers } from "../pages/TotalUsers";
import ProductDetails from "../pages/ProductDetails";
import Cart from "../pages/Cart";
import SearchProduct from "../pages/SearchProduct";
import CategoryProduct from "../pages/categoryproduct";
import Success from "../pages/Success";
import Cancel from "../pages/Cancel";
import Order from "../pages/Order";



const router = createBrowserRouter([
    {
        path: '/',
        element:<App/>,
        children:[
            {
                  path:"",
                  element:<Home/>
            },
            {
                path:'login',
                element:<Login/>
            },
            {
                path:'forgotpassword',
                element:<ForgotPassword/>
            },
            {
                path: 'signup',
                element:<Signup/>
            },
            {
                path: 'product-category',
                element:<CategoryProduct/>
            },
            {
                path:"product/:id",
                element:<ProductDetails/>

            },
            {
               path:"cart",
                element:<Cart/> 
            },
            {
                path:"search",
                element : <SearchProduct/>
            },
            {
                path:"success",
                element : <Success/>
            },
            {
                path:"cancel",
                element : <Cancel/>
            },
            {
                path:"order",
                element : <Order/>
            },
            {
                path :'admin-panel',
                element:<AdminPanel/>,
                children: [
                    {
                        path:'all-users',
                        element:<TotalUsers/>
                    },
                    {
                        path :'all-products',
                        element:<AllProducts/>
                    }
                ]
            }
        ]
  
        
    }
])

export default router;