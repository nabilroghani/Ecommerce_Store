import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom"; // Zaroori import
import { useCart } from "../context/CartContext";


const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  
  const location = useLocation(); 
  const role = localStorage.getItem("role");

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`https://backend-repo-omega.vercel.app/api/all${location.search}`);
        setProducts(res.data);
        setLoading(false);
      } catch (error) {
        console.error("Data fetch nahi ho saka:", error);
        setLoading(false);
      }
    };
    fetchProducts();
  }, [location.search]);

  if (loading) return <div className="text-center mt-10 text-xl font-bold">Loading Products...</div>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
        {location.search ? "Search Results" : "Available Products"}
      </h1>

      {products.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-500 text-xl">No products found matching your search.</p>
          <button onClick={() => window.location.href="/"} className="text-blue-600 underline mt-2">Show all products</button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div key={product._id} className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow border border-gray-100 flex flex-col">
              <img src={product.image} alt={product.name} className="w-full h-56 object-cover" />
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">{product.name}</h2>
                  <p className="text-blue-600 font-bold text-lg mt-2">${product.price}</p>
                </div>

                {role === "admin" ? (
                  <div className="w-full mt-4 bg-gray-100 text-gray-500 py-2 rounded-xl text-center text-sm font-medium border">
                    Admin Preview
                  </div>
                ) : (
                  <button
                    className="w-full mt-4 bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition-colors font-medium shadow-sm"
                    onClick={() => addToCart(product)}
                  >
                    Add to Cart
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;