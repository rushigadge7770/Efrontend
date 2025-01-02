import React, { useContext, useEffect, useState } from "react";
import Context from "../context";
import displayINRCurrency from "../helper/displayCurrancy";
import { MdDelete } from "react-icons/md";
import {loadStripe} from '@stripe/stripe-js';
 

const Cart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const context = useContext(Context);
  const loadingCart = new Array(context.cartProductCount).fill(null);

  const fetchData = async () => {
    const response = await fetch(
      "http://localhost:8080/api/viewaddtocardproduct",
      {
        method: "get",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const responseData = await response.json();

    if (responseData.success) {
      setData(responseData.data);
    }
  };
  const handleLoading = async () => {
    await fetchData();
  };

  useEffect(() => {
    setLoading(true);
    handleLoading();
    setLoading(false);
  }, []);

  const increaseQty = async (id, qty) => {
    const response = await fetch(
      "http://localhost:8080/api/update-card-product",
      {
        method: "post",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _id: id,
          quantity: qty + 1,
        }),
      }
    );

    const responseData = await response.json();
    if (responseData.success) {
      fetchData();
    }
  };

  const decraseQty = async (id, qty) => {
    if (qty >= 2) {
      const response = await fetch(
        "http://localhost:8080/api/update-card-product",
        {
          method: "post",
          credentials: "include",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            _id: id,
            quantity: qty - 1,
          }),
        }
      );

      const responseData = await response.json();

      if (responseData.success) {
        fetchData();
      }
    }
  };

  const deleteCartProduct = async (id) => {
    const response = await fetch(
      "http://localhost:8080/api/delete-card-product",
      {
        method: "post",
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          _id: id,
        }),
      }
    );

    const responseData = await response.json();

    if (responseData.success) {
      fetchData();
      context.fetchUserAddToCard();
    }
  };

  const handlePayment = async () => {
    console.log("process.env.REACT_APP_STRIPE_PUBLIC_KEY", process.env.REACT_APP_STRIPE_PUBLIC_KEY);

    const stripe = await loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

    const response = await fetch(
      "http://localhost:8080/api/checkout",
      {
        method: "post",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cartItems: data
        })
      });
      
    const responseData = await response.json();

    // Check for session ID and perform the redirect
    if (responseData?.id) {
        await stripe.redirectToCheckout({ sessionId: responseData.id });
    } else {
        console.error("No session ID returned:", responseData);
    }

    console.log("data response", responseData);
};
  const totalQty = data.reduce(
    (previousValue, currentValue) => previousValue + currentValue.quantity,
    0
  );
  const totalPrice = data.reduce(
    (preve, curr) => preve + curr.quantity * curr?.productId?.sellingPrice,
    0
  );

  return (
    <div className="container mx-auto">
      <div className=" text-center text-lg my-3">
        {data.length === 0 && !loading && (
          <p className="bg-white py-5">No Data</p>
        )}
      </div>
      <div className="flex flex-col lg:flex-row gap-10 lg:justify-between p-4">
        {/* view product */}
        <div className="w-full max-w-4xl">
          {loading
            ? loadingCart.map((el, index) => {
                return (
                  <div
                    key={el + "Add to cart loading" + index}
                    className="w-full bg-slate-300 h-32 my-1 border m-2 border-slate-300 rounded animate-pulse"
                  ></div>
                );
              })
            : data.map((product, index) => {
                return (
                  <div
                    key={product?._id + "Add to cart loading"}
                    className="w-full bg-white h-32 my-2 border border-slate-300 m-2 rounded grid grid-cols-[128px,1fr]"
                  >
                    <div className="w-32 h-32">
                      <img
                        src={product?.productId?.productImage[0]}
                        className="w-full h-full object-scale-down mix-blend-multiply"
                      />
                    </div>
                    <div className="px-4 py-2 relative">
                      {/**delete product */}
                      <div
                        className="absolute right-0 text-red-600 rounded-full p-2 hover:bg-red-600 hover:text-white cursor-pointer"
                        onClick={() => deleteCartProduct(product?._id)}
                      >
                        <MdDelete />
                      </div>
                      <h2 className="text-lg lg:text-xl text-ellipsis line-clamp-1">
                        {product?.productId?.productName}
                      </h2>
                      <p className="text-slate-400 capitalize">
                        {product?.productId?.category}
                      </p>
                      <div className="flex items-center justify-between">
                        <p className="text-red-600 font-medium text-lg">
                          {displayINRCurrency(product?.productId?.sellingPrice)}
                        </p>
                        <p className="text-slate-600 font-semibold text-lg">
                          {displayINRCurrency(
                            product?.productId?.sellingPrice * product?.quantity
                          )}
                        </p>
                      </div>
                      <div className="flex items-center gap-3 mt-1">
                        <button
                          className=" border border-red-600 text-red-600 hover:bg-red-600 hover:text-white w-6 h-6 flex justify-center items-center rounded"
                          onClick={() =>
                            decraseQty(product?._id, product?.quantity)
                          }
                        >
                          -
                        </button>
                        <span>{product?.quantity}</span>
                        <button
                          className=" border border-red-600 text-red-600  hover:bg-red-600 hover:text-white w-6 h-6 flex justify-center items-center rounded "
                          onClick={() =>
                            increaseQty(product?._id, product?.quantity)
                          }
                        >
                          {" "}
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
        </div>

        {/* total Product summary */}
        {data[0] && (
          <div className="mt-5 lg:mt-0 w-full max-w-sm mr-16">
            {loading ? (
              <div className="h-36 bg-slate-300 border border-slate-300 animate-pulse "></div>
            ) : (
              <div className="h-36">
                <h2 className="text-whit bg-red-600 px-4 py-1 rounded-sm">
                  summary
                </h2>
                <div className="flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600">
                  <p>Quality</p>
                  <p>{totalQty}</p>
                </div>
                <div className="flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600">
                  <p>Total Price</p>
                  <p>{displayINRCurrency(totalPrice)}</p>
                </div>

                <button
                  className="bg-violet-600 p-2 text-white w-full mt-2 rounded-sm"
                  onClick={handlePayment}
                >
                  Payment
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
