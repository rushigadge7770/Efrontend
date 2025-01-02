import React, { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { FaStarHalf } from "react-icons/fa";
import displayINRCurrency from "../helper/displayCurrancy";
import VerticalCardProduct from "../components/VerticalCardProduct";
import CategoryWiseProductDisplay from "../components/CategorywiseProductDisplay";
import addToCart from "../helper/addToCart";
import Context from "../context";


const ProductDetails = () => {
  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImage: [],
    description: "",
    price: "",
    sellingPrice: "",
  });

  const params = useParams();
  const [loading, setLoading] = useState(true);
  const productImageListLoading = new Array(4).fill(null);
  const [activeImage, setActiveImage] = useState("");
  const [zoomImageCoordinate, setZoomImageCoordinate] = useState({
    x: 0,
    y: 0,
  });
  const [zoomImage, setZoomImage] = useState(false);
  const {  fetchUserAddToCard } = useContext(Context)
  const navigate = useNavigate()

  console.log("product it", params);

  const fetchProductDetails = async () => {
    setLoading(true);
    const response = await fetch("http://localhost:8080/api/product-details", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productId: params?.id,
      }),
    });
    setLoading(false);
    const dataResponse = await response.json();

    setData(dataResponse.data);
    setActiveImage(dataResponse.data.productImage[0]);
  };
  console.log("data", data);

  useEffect(() => {
    fetchProductDetails();
  }, [params]);

  const handleMouseEnterProduct = (imgUrl) => {
    setActiveImage(imgUrl);
  };

  const handleZoomImage = useCallback(
    (e) => {
      setZoomImage(true);
      const { left, top, width, height } = e.target.getBoundingClientRect();
      console.log("co-ordinates", left, top, width, height);

      const x = (e.clientX - left) / width;
      const y = (e.clientY - top) / height;

      setZoomImageCoordinate({
        x,
        y,
      });

     
    },
    [zoomImageCoordinate]);


    const HandleLeaveImageZoom = () =>{
        setZoomImage(false);
    }

    const handleAddToCart = async(e,id) =>{
      await addToCart(e,id)
      await fetchUserAddToCard()
    }

    const handleBuyProduct = async(e,id)=>{
      await addToCart(e,id)
      await fetchUserAddToCard()
      navigate("/cart")
  
    }

  return (
    <div className="container mx-auto p-4">
      <div className=" min-h-[200px] flex flex-col lg:flex-row">
        {/* product Image */}
        <div className="h-96 flex flex-col lg:flex-row-reverse gap-4">
          <div className="h-[300px] w-[300px] lg:h-[350px] relative">
            <img
              src={activeImage}
              className=" w-full h-full object-scale-down mix-blend-multiply"
              onMouseMove={handleZoomImage}
              onMouseLeave={HandleLeaveImageZoom}
            />

            {/* Product zoom */}
            {
                zoomImage && (
              <div className="hidden lg:block absolute min-w-[600px] overflow-hidden p-1 min-h-[440px] bg-slate-300 -right-[600px] top-0">
                <div
                  className="w-full h-full min-h-[440px] min-w-[600px] bg-slate-200 mix-blend-multiply scale-125"
                  style={{
                    backgroundImage: `url(${activeImage})`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: `${zoomImageCoordinate.x * 100}% ${
                      zoomImageCoordinate.y * 100
                    }%`,
                  }}
                ></div>
              </div>
            )}
          </div>

          <div className="h-full">
            {loading ? (
              <div className="flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full">
                {productImageListLoading.map((el,index) => {
                  return (
                    <div
                      className="h-20 w-20 bg-slate-300 rounded animate-pulse"
                      key={"loading image"+index}
                    ></div>
                  );
                })}
              </div>
            ) : (
              <div className="flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full">
                {data?.productImage?.map((imgUrl, index) => {
                  return (
                    <div
                      className="h-20 w-20 bg-slate-300 rounded"
                      key={imgUrl}
                    >
                      <img
                        src={imgUrl}
                        className=" h-full w-full object-scale-down mix-blend-multiply cursor-pointer"
                        onMouseEnter={() => handleMouseEnterProduct(imgUrl)}
                        onClick={() => handleMouseEnterProduct(imgUrl)}
                      />
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* product details */}

        {loading ? (
          <div className="flex flex-col gap-1 p-2 my-4">
            <p className="bg-slate-300 w-20 animate-pulse h-5  rounded-full animate-pulse"></p>
            <h2 className="text-2xl lg-text-4xl font-medium bg-slate-300 h-8 w-28 py-4 animate-pulse"></h2>
            <p className=" capitalize bg-slate-300 h-8 w-32 animate-pulse"></p>

            <div className="text-slate-300 flex items-start gap-2">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStarHalf />
            </div>
            <div className="flex items-center gap-2 text-xl lg:text-2xl font-medium my-1">
              <p className="bg-slate-300 h-4 w-28 py-2 rounded-md animate-pulse"></p>
              <p className="bg-slate-300 h-4 w-28 py-2 rounded-md animate-pulse"></p>
            </div>
            <div className="flex items-center gap-3">
              <button className="border-2  px-3  min-w-[120px] font-medium bg-slate-300 h-4 w-28 py-2 rounded-md animate-pulse"></button>
              <button className="border-2  px-3 font-medium bg-slate-300 h-4 w-28 py-2 rounded-md animate-pulse"></button>
            </div>
            <div className="h-full w-3/4">
              <p className="text-slate-600 font-medium my-1 bg-slate-300 h-4 w-28 py-2 rounded-md animate-pulse"></p>
              <p className="text-md overflow-scroll scrollbar-none bg-slate-300 h-32 w-80 py-2 rounded-md animate-pulse"></p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-1 p-2 my-4">
            <p className="bg-red-200 w-fit text-red-600 px-2 rounded-full">
              {data?.brandName}
            </p>
            <h2 className="text-2xl lg-text-4xl font-medium">
              {data?.productName}
            </h2>
            <p className=" capitalize text-slate-400">{data?.category}</p>

            <div className="text-red-600 flex items-start gap-2">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStarHalf />
            </div>
            <div className="flex items-center gap-2 text-xl lg:text-2xl font-medium my-1">
              <p className="text-red-600">
                {displayINRCurrency(data?.sellingPrice)}
              </p>
              <p className="text-slate-400 line-through">
                {displayINRCurrency(data?.price)}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button className="border-2 border-violet-600 rounded px-3 py-2 min-w-[120px] text-violet-600 font-medium hover:bg-violet-600 hover:text-white" onClick={(e)=>handleBuyProduct(e,data?._id)}>
                Buy Now
              </button>
              <button className="border-2 border-violet-600 rounded px-3 py-2 min-w-[120px] bg-violet-600 text-white hover:text-violet-600 hover:bg-white font-medium" onClick={(e)=>handleAddToCart(e,data?._id)}>
                Add To Cart
              </button>
            </div>
            <div className="h-full w-2/4">
              <p className="text-slate-600 font-medium my-1">Description:</p>
              <p className="text-md overflow-hidden h-56 scrollbar-none">
                {data?.description}
              </p>
            </div>
          </div>
        )}
      </div>
{
    data.category && (
        <CategoryWiseProductDisplay category = {data?.category} heading ={"Recommended Product"}/>
    )
}

    </div>
  );
};

export default ProductDetails;
