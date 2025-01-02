import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import VerticalCard from '../components/verticalCard'

const SearchProduct = () => {
   const location = useLocation()
   const query = new URLSearchParams(location.search).get('q'); // Extract query parameter
   const [data , setData] = useState([])
   const [loading , setLoading] = useState(false)

   const fetchProduct = async () => {
    if (!query) return; // Prevent fetch if no query parameter
    setLoading(true)
    try {
      const response = await fetch(`http://localhost:8080/api/search?q=${query}`)
      const dataResponse = await response.json()
      setData(dataResponse.data || []) // Fallback to empty array if no data
    } catch (error) {
      console.error("Failed to fetch data:", error)
      setData([]) // Set data to empty array on error
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProduct()
  }, [query]) // Runs again if query changes

   return (
    <div className='container mx-auto p-4'>
      {loading && <p className='text-lg text-center'>Loading ...</p>}

      <p className='text-lg font-semibold my-3'>Search Results : {data.length}</p>

      {data.length === 0 && !loading && (
        <p className='bg-white text-lg text-center p-4'>No Data Found....</p>
      )}

      {data.length !== 0 && !loading && (
        <VerticalCard loading={loading} data={data}/>
      )}
    </div>
  )
}

export default SearchProduct
