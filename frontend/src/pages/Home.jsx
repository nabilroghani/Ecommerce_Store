// import axios from "axios";
// import React, { useEffect, useState } from "react";

// const Home = () => {
//   const [products, setProducts] = useState([]);

//   const handleProducts = async () => {
//     try {
//       const res = await axios.get("https://fakestoreapi.com/products");
//       setProducts(res.data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     handleProducts();
//   }, []);

//   return (
//     <div className="min-h-screen bg-gray-100 px-6 py-10">
//       <h1 className="text-3xl font-bold text-center mb-10">🛒 Products</h1>

//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//         {products.map((item) => (
//           <div
//             key={item.id}
//             className="bg-white rounded-xl shadow-md hover:shadow-xl transition p-4 flex flex-col"
//           >
//             <img
//               src={item.image}
//               alt={item.title}
//               className="h-48 object-contain mb-4"
//             />

//             <h2 className="text-lg font-semibold line-clamp-1">{item.title}</h2>

//             <p className="text-sm text-gray-500 capitalize">{item.category}</p>

//             <div className="mt-auto">
//               <p className="text-xl font-bold text-blue-600 mt-2">
//                 ₹ {item.price}
//               </p>

//               <button className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
//                 Add to Cart
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Home;

import React, { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/all");
        setProducts(res.data);
        setLoading(false);
      } catch (error) {
        console.error("Data fetch nahi ho saka:", error);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading)
    return <div className="text-center mt-10">Loading Products...</div>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
        Available Products
      </h1>

      {products.length === 0 ? (
        <p className="text-center text-gray-500">
          No products found. Add some from Admin panel!
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-100"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-56 object-cover"
              />
              <div className="p-5">
                <h2 className="text-xl font-semibold text-gray-800">
                  {product.name}
                </h2>
                <p className="text-blue-600 font-bold text-lg mt-2">
                  ${product.price}
                </p>
                <button className="w-full mt-4 bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition-colors">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
