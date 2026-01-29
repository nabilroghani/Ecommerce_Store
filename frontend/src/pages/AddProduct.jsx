import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Hook for navigation
import axios from "axios";

const AddProduct = () => {
  const navigate = useNavigate();
  const [addProduct, setAddProduct] = useState({
    name: "",
    price: "",
    image: "",
  });

  const handleAddPro = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/add-products",
        addProduct,
      );

      alert("Product Added Successfully!");
      console.log(response.data);
      navigate("/");
    } catch (error) {
      console.error(error);
      alert(
        "Error adding product: " + error.response?.data?.message ||
          error.message,
      );
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Add New Product</h2>
      <form onSubmit={handleAddPro} className="flex flex-col gap-4 max-w-sm">
        <div>
          <label className="block" htmlFor="name">
            Product Name:
          </label>
          <input
            className="border p-2 w-full"
            type="text"
            id="name"
            required
            placeholder="Enter Product name"
            onChange={(e) =>
              setAddProduct({ ...addProduct, name: e.target.value })
            }
          />
        </div>

        <div>
          <label className="block" htmlFor="price">
            Product Price:
          </label>
          <input
            className="border p-2 w-full"
            type="number"
            id="price"
            required
            placeholder="Enter Price"
            onChange={(e) =>
              setAddProduct({ ...addProduct, price: e.target.value })
            }
          />
        </div>

        <div>
          <label className="block" htmlFor="image">
            Image Url:
          </label>
          <input
            className="border p-2 w-full"
            type="text"
            id="image"
            required
            placeholder="Paste Image Url"
            onChange={(e) =>
              setAddProduct({ ...addProduct, image: e.target.value })
            }
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Save Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
