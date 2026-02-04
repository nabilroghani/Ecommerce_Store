import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddProduct = () => {
  const navigate = useNavigate();
  const [addProduct, setAddProduct] = useState({
    name: "",
    price: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false); 

  const handleAddPro = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("file", imageFile);
      formData.append("upload_preset", "fashion_fusion"); 
      formData.append("cloud_name", "dvhzlvmvb"); 

      const cloudRes = await axios.post(
        "https://api.cloudinary.com/v1_1/dvhzlvmvb/image/upload",
        formData
      );

      const imageUrl = cloudRes.data.secure_url; 

     
      const response = await axios.post(
        "http://localhost:5000/api/add-products",
        {
          ...addProduct,
          image: imageUrl,
        },
        {
          headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`, 
    },
        }
      );

     
      navigate("/");
    } catch (error) {
      console.error(error);
      alert(
        "Error: " + (error.response?.data?.message || error.message)
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-white shadow-md rounded-xl mt-10">
      <h2 className="text-2xl font-bold mb-6 text-blue-600">Add New Product</h2>
      <form onSubmit={handleAddPro} className="flex flex-col gap-5">
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="name">
            Product Name:
          </label>
          <input
            className="border p-2 w-full rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
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
          <label className="block text-sm font-medium mb-1" htmlFor="price">
            Product Price:
          </label>
          <input
            className="border p-2 w-full rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
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
          <label className="block text-sm font-medium mb-1" htmlFor="image">
            Product Image:
          </label>
          <input
            className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            type="file"
            id="image"
            accept="image/*"
            required
            onChange={(e) => setImageFile(e.target.files[0])}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`p-3 rounded-lg font-bold text-white transition-all ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 shadow-lg"
          }`}
        >
          {loading ? "Uploading Data..." : "Save Product"}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;