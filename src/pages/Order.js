import React, { useEffect, useState } from 'react'
import moment from 'moment'
import displayINRCurrency from '../helper/displayCurrancy'

const Order = () => {
  const [data,setData] = useState([])


  const fetchOrderDetails =  async()=>{
    const response = await fetch("http://localhost:8080/api/order-list",{
      method : "get",
      credentials : 'include'
    })
    const responseData = await response.json()
    setData(responseData.data)
    console.log("responseData", responseData)
  }

  useEffect(()=>{
fetchOrderDetails()
  },[])

  return (
    <div>
    {
      !data[0] && (
        <p> NO Order Available</p>
      )
    }
    <div className='p-4 w-full max-w-lg mx-auto'>
    {
data.map((item , index)=>{
  return(
    <div key={item.userId+index} className='mx-3'>
       <p className='font-medium text-lg'>{moment(item.createdAt).format('LL')}</p>  
   <div className=' border-2 border-violet-50 border-b-0 rounded bg-slate-200'>
   {
    item?.productDetails.map((product,index)=>{
     
      return(
        <div key={product.productId+index} className='flex gap-4'>
        <img
          src={product.image[0]}
          className=" w-32 h-32 bg-slate-300 object-scale-down p-2"
          alt={'Product Image'}
        />
        <div>
        <div className='text-medium overflow-hidden h-12 w-28'>{product.name}</div>
        <div className='flex items-center gap-5'>
        <div className='text-red-600'>{displayINRCurrency(product.price)}</div>
        <p className='  text-medium'>Quantity : {product.quantity}</p>

        </div>
        </div>
        </div>
      )
    })
   }
   </div>
   <div className='border-2 border-violet-50 border-b-0 border-t-0 rounded bg-slate-200 flex px-2 gap-5 items-center p-3'>
   <div className=' leading-tight font-semibold'>
    <div>Payment Details :</div>
    <p >Payment Method : {item.paymentDetails.payment_method_type[0]}</p>
      <p>Payment Status : {item.paymentDetails.payment_Status}</p>
   </div>
   <div className='leading-tight font-semibold'>
   <div> Shipping Details</div>
   {
    item.shipping_options.map((shipping,index)=>{
      return(
        <div key={shipping.shipping_rate}>
            Shipping Amount : {shipping.shipping_amount}
        </div>
      )
    })
   }

   </div>

   </div>
<div className=' font-bold border-2 border-violet-50  border-t-0 rounded'>
  <div className='text-center f text-red-500'>
Total Amount : {item.total_amount }
  </div>
</div>

    </div>
  )
})
    }
    </div>
    </div>
  )
}

export default Order



