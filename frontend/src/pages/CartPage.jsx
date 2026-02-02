import React from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const { cartItems, addToCart, decreaseQty, removeFromCart } = useCart();
  const total = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  const navigate = useNavigate()

  if (cartItems.length === 0) return <h2 className="text-center mt-20 text-xl font-bold">Cart Khali Hai! 🛒</h2>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Aapka Cart</h1>
      <div className="space-y-4">
        {cartItems.map((item) => (
          <div key={item._id} className="flex items-center justify-between border-b pb-4">
            <div className="flex items-center gap-4">
              <img src={item.image} alt="" className="w-16 h-16 object-cover rounded" />
              <div>
                <h3 className="font-bold">{item.name}</h3>
                <p className="text-gray-600">${item.price}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex border rounded">
                <button onClick={() => decreaseQty(item._id)} className="px-3 py-1 bg-gray-100">-</button>
                <span className="px-4 py-1">{item.qty}</span>
                <button onClick={() => addToCart(item)} className="px-3 py-1 bg-gray-100">+</button>
              </div>
              <button onClick={() => removeFromCart(item._id)} className="text-red-500 font-bold">Remove</button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 p-4 bg-blue-50 rounded-xl text-right">
        <h2 className="text-xl font-bold text-blue-800">Total: ${total.toFixed(2)}</h2>
        <button className="mt-4 bg-blue-600 text-white px-8 py-2 rounded-lg font-bold" onClick={()=> navigate("/checkout")}>Checkout</button>
      </div>
    </div>
  );
};

export default CartPage;