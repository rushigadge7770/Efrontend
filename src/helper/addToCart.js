import { toast } from "react-toastify"


const addToCart = async(e,id) =>{
    e?.stopPropagation()
    e?.preventDefault()

try{
    const response = await fetch("http://localhost:8080/api/addtocart",{
        method : "post",
        credentials : 'include',
        headers : {
            'Content-Type': 'application/json'
        },
        body : JSON.stringify({ productId : id })
    })

    const responseData = await response.json()
    if (response.status === 401) {
        toast.error("Session expired. Please log in again.");
        // Optional: Redirect to login
    }
    else if(responseData.success) {
        toast.success(responseData.message)
    }
    else if(responseData.error)
    {
        toast.error(responseData.message)
    }
    return responseData
}catch(e) {
    console.error("Error adding to cart:", e);
    toast.error("An unexpected error occurred. Please try again.");
}
    
}


export default addToCart