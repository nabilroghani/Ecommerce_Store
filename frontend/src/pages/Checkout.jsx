import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const { cartItems, clearCart } = useCart(); 
  const navigate = useNavigate();
  
  const [address, setAddress] = useState({
    street: "",
    city: "",
    phone: "",
  });

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);

  const handleOrder = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Pehle login karein! 🔑");
      return navigate("/login");
    }

    const orderData = {
      orderItems: cartItems.map((item) => ({
        name: item.name,
        qty: item.qty,
        image: item.image,
        price: item.price,
        product: item._id, 
      })),
      shippingAddress: {
        address: address.street,
        city: address.city,
        phone: address.phone,
      },
      totalPrice: totalPrice,
      paymentMethod: "COD",
    };

    try {
      const res = await axios.post("http://localhost:5000/api/place-order", orderData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data.success) {
        alert("Order Successful! 🎉");
        clearCart(); 
        navigate("/"); 
      }
    } catch (error) {
      console.error("Order Error:", error.response?.data || error.message);
      alert("Order Fail: " + (error.response?.data?.message || "Server Error"));
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Checkout</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Form Section */}
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
          <h2 className="text-xl font-semibold mb-6">Shipping Information</h2>
          <form onSubmit={handleOrder} className="space-y-4">
            <input required type="text" placeholder="Street Address" className="w-full p-3 border rounded-xl"
              onChange={(e) => setAddress({ ...address, street: e.target.value })} />
            <div className="grid grid-cols-2 gap-4">
              <input required type="text" placeholder="City" className="w-full p-3 border rounded-xl"
                onChange={(e) => setAddress({ ...address, city: e.target.value })} />
              <input required type="text" placeholder="Phone" className="w-full p-3 border rounded-xl"
                onChange={(e) => setAddress({ ...address, phone: e.target.value })} />
            </div>
            <button type="submit" className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold text-lg hover:bg-blue-700 shadow-lg mt-4">
              Place Order (${totalPrice.toFixed(2)})
            </button>
          </form>
        </div>

        {/* Summary Section */}
        <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200">
          <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
          {cartItems.map((item) => (
            <div key={item._id} className="flex justify-between mb-4 bg-white p-2 rounded shadow-sm">
              <span>{item.name} x{item.qty}</span>
              <span className="font-bold">${(item.price * item.qty).toFixed(2)}</span>
            </div>
          ))}
          <div className="border-t pt-4 text-2xl font-bold flex justify-between">
            <span>Total</span>
            <span className="text-blue-600">${totalPrice.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;