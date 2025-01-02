import React from 'react'
import CategoryList from '../components/categoryList'
import BannerProduct from '../components/bannerProduct'
import HorizontalCardProduct from '../components/HorizontalCardProduct'
import VerticalCardProduct from '../components/VerticalCardProduct'


const Home = () => {
 
  return (
    <div>
      <CategoryList/>
      <BannerProduct/>

      <HorizontalCardProduct category = {"airpodes"} heading ={"Top Airpodes"}/>
      <HorizontalCardProduct category = {"watches"} heading ={"Trending Watches"}/>
      <VerticalCardProduct category = {"mobiles"} heading ={"Most Selling Mobiles"}/>
      <VerticalCardProduct category = {"mouse"} heading ={"trending mouse"}/>
      <VerticalCardProduct category = {"refrigerator"} heading ={"Top Quality Refrigerator"}/>
      <VerticalCardProduct category = {"speakers"} heading ={"trending Speaker"}/>
      <VerticalCardProduct category = {"televisions"} heading ={"High Quality Television"}/>
      <VerticalCardProduct category = {"trimmers"} heading ={"Top Selling Trimmer"}/>
      <VerticalCardProduct category = {"camera"} heading ={"Best Camera's"}/>
      <VerticalCardProduct category = {"printers"} heading ={"Top Quality Printers"}/>
      
      
    </div>
  )
}

export default Home