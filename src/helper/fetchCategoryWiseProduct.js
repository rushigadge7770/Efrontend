// Helper function: fetchCategoryWiseProduct
const fetchCategoryWiseProduct = async (category) => {
    const response = await fetch("http://localhost:8080/api/category-product", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ category: String(category) }), // Convert to string if not already
    });
    
    const dataResponse = await response.json();
    // console.log("dataResponse", dataResponse);
    return dataResponse;
  };
  
  export default fetchCategoryWiseProduct;
  