import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminOrders = () => {
    const [orders, setOrders] = useState([]);

    const fetchAllOrders = async () => {
        const token = localStorage.getItem("token");
        const res = await axios.get("https://backend-repo-omega.vercel.app/api/admin/orders", {
            headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(res.data);
    };

    const handleStatusUpdate = async (id, newStatus) => {
        const token = localStorage.getItem("token");
        await axios.put(`https://backend-repo-omega.vercel.app/admin/order/${id}/status`,
            { status: newStatus },
            { headers: { Authorization: `Bearer ${token}` } }
        );
        fetchAllOrders(); // List refresh karein
    };

    useEffect(() => { fetchAllOrders(); }, []);

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-6">Admin Panel: All Customer Orders</h1>
            <table className="w-full bg-white border">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="p-3">Customer</th>
                        <th className="p-3">Total</th>
                        <th className="p-3">Status</th>
                        <th className="p-3">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(order => (
                        <tr key={order._id} className="border-t text-center">
                            {/* 'name' ki jagah 'username' use karein */}
                            <td className="p-3">{order.user ? order.user.username : "User Deleted"}</td>
                            <td className="p-3 font-bold">${order.totalPrice}</td>
                            <td className="p-3">
                                <span className="bg-blue-100 p-1 px-2 rounded text-sm">{order.status}</span>
                            </td>
                            <td className="p-3">
                                <select
                                    onChange={(e) => handleStatusUpdate(order._id, e.target.value)}
                                    className="border p-1 rounded"
                                >
                                    <option value="">Update Status</option>
                                    <option value="Shipped">Shipped</option>
                                    <option value="Delivered">Delivered</option>
                                    <option value="Cancelled">Cancelled</option>
                                </select>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminOrders;