const Order = require("../models/order.model");

const placeOrder = async (req, res) => {
  try {
    // 1. Check karein ke data backend tak kaisa pahunch raha hai
    console.log("BODY RECEIVED:", JSON.stringify(req.body, null, 2));
    console.log("USER FROM TOKEN:", req.user);

    const { orderItems, shippingAddress, totalPrice, paymentMethod } = req.body;

    // 2. Naya Order banane ki koshish
    const order = new Order({
      user: req.user.userId, // Ensure karein ke login token mein _id hi bheja tha
      orderItems,
      shippingAddress,
      totalPrice,
      paymentMethod,
    });

    const savedOrder = await order.save();
    console.log("ORDER SAVED SUCCESSFULLY!");
    
    res.status(201).json({ success: true, order: savedOrder });

  } catch (error) {
    // Ye line terminal mein poora sach bol degi
    console.error("--- DATABASE ERROR START ---");
    console.error(error); 
    console.error("--- DATABASE ERROR END ---");
    
    res.status(500).json({ message: error.message });
  }
};

// User apne orders dekh sake (Order History)
const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.userId }).sort("-createdAt");
    
    if (!orders) {
      return res.status(404).json({ message: "Koi orders nahi mile" });
    }
    
    res.status(200).json(orders);
  } catch (error) {
    console.error("Fetch Orders Error:", error.message);
    res.status(500).json({ message: "Orders fetch nahi ho sakay" });
  }
};

// Saare users ke orders dekhne ke liye (Admin Only)
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({})
      .populate({
        path: "user",
        select: "username email",
      })
      .sort("-createdAt");

    // Check karein ke data null toh nahi aa raha
    if (!orders) {
      return res.status(200).json([]);
    }

    res.status(200).json(orders);
  } catch (error) {
    console.error("ADMIN ERROR:", error.message);
    res.status(500).json({ message: "Server error occurred" });
  }
};

// Order status update karne ke liye
const updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    res.json({ success: true, order });
  } catch (error) {
    res.status(500).json({ message: "Status update fail" });
  }
};

module.exports = { placeOrder, getMyOrders, getAllOrders, updateOrderStatus };