import React, { useEffect, useState } from "react";
import axios from "axios";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/my-orders", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(res.data);
      } catch (error) {
        console.error("Error fetching orders", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) return <div className="text-center mt-10">Loading Orders... 📦</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Mera Orders History</h1>
      {orders.length === 0 ? (
        <p className="text-gray-500">Aapne abhi tak koi order nahi kiya.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order._id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex justify-between items-center mb-4 border-b pb-2">
                <span className="text-sm text-gray-500">Order ID: {order._id}</span>
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                  order.status === "Delivered" ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"
                }`}>
                  {order.status}
                </span>
              </div>
              
              <div className="space-y-3">
                {order.orderItems.map((item, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded" />
                    <div className="flex-1">
                      <p className="font-medium text-gray-800">{item.name}</p>
                      <p className="text-sm text-gray-500">Qty: {item.qty} x ${item.price}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex justify-between items-center bg-gray-50 p-3 rounded-xl">
                <div>
                  <p className="text-xs text-gray-500">Shipping To:</p>
                  <p className="text-sm font-medium">{order.shippingAddress.city}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500">Total Paid:</p>
                  <p className="text-xl font-bold text-blue-600">${order.totalPrice.toFixed(2)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;