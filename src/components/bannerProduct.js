import React, { useEffect, useState } from "react";
import { FaAngleDoubleRight } from "react-icons/fa";
import { FaAngleDoubleLeft } from "react-icons/fa";
import pic1 from "../assest/banner/img1.webp";
import pic2 from "../assest/banner/img2.webp";
import pic3 from "../assest/banner/img3.jpg";
import pic4 from "../assest/banner/img4.jpg";
import pic5 from "../assest/banner/img5.webp";

// mobile image import
import image1Mobile from "../assest/banner/img1_mobile.jpg";
import image2Mobile from "../assest/banner/img2_mobile.webp";
import image3Mobile from "../assest/banner/img3_mobile.jpg";
import image4Mobile from "../assest/banner/img4_mobile.jpg";
import image5Mobile from "../assest/banner/img5_mobile.png";

const BannerProduct = () => {
const [currentImage , setCurrentImage] = useState(1)

  // desktop image import
  const desktopImages = [pic1, pic2, pic3, pic4, pic5];

  const mobileImages = [
    image1Mobile,
    image2Mobile,
    image3Mobile,
    image4Mobile,
    image5Mobile,
  ];

  // next image
  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % desktopImages.length);
  };
  // previous image
  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + desktopImages.length) % desktopImages.length);
  };

  useEffect(()=>{
    const interval = setInterval(()=>{
      if(desktopImages.length -1 > currentImage){
        nextImage()
      }
      else{
        setCurrentImage(0)
      }
    },4000)
    return () => clearInterval(interval)

  },[currentImage])

  // return display part
  return (
    <div className="container mx-auto px-4 rounded ">
      <div className="h-60 md:h-72 w-full bg-slate-200 relative">
      <div className="absolute z-10 h-full w-full md:flex items-center hidden ">
      <div className="flex justify-between  text-4xl w-full">

      <button onClick={prevImage} className="bg-white shadow-md rounded-full p-2" >
        <FaAngleDoubleLeft />
        </button>
        <button onClick={nextImage} className="bg-white shadow-md rounded-full p-2" >
        <FaAngleDoubleRight />
        </button>
      </div>
     
        
      </div>
        {/* desktop and tablet version */}
        <div className="hidden md:flex h-full w-full overflow-hidden">
      {
            desktopImages.map((imageUrl, index) => {
          return (
            <div className="w-full h-full min-w-full min-h-full transition-all" key={imageUrl} style={{transform:`translate(-${currentImage * 100}%)`}}>
              <img src={imageUrl} className="w-full h-full" />
            </div>
          );
        })}
      </div>

      {/* mobile version */}
      <div className="flex  h-full w-full overflow-hidden md:hidden">
      {
        mobileImages.map((imageUrl, index) => {
          return (
            <div className="w-full h-full min-w-full min-h-full transition-all" key={imageUrl} style={{transform:`translate(-${currentImage * 100}%)`}}>
              <img src={imageUrl} className="w-full h-full" />
            </div>
          );
        })}
      </div>
       
      </div>
    </div>
  );
};

export default BannerProduct;
