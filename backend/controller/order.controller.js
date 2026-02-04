const Order = require("../models/order.model");
const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  try {
    await transporter.sendMail(options);
    console.log("Email Sent Successfully");
  } catch (error) {
    console.error("Email Sending Failed:", error);
  }
};

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, 
    pass: process.env.EMAIL_PASS, 
  },
});

const placeOrder = async (req, res) => {
  try {
    
    console.log("BODY RECEIVED:", JSON.stringify(req.body, null, 2));
    console.log("USER FROM TOKEN:", req.user);

    const { orderItems, shippingAddress, totalPrice, paymentMethod } = req.body;

    
    const userEmail = req.user.email;
    if (!userEmail) {
      console.log("Warning: User email not found in token!");
    }

    const order = new Order({
      user: req.user.userId, 
      orderItems,
      shippingAddress,
      totalPrice,
      paymentMethod,
    });

    const savedOrder = await order.save();

    // --- EMAIL SENDING LOGIC ---
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: req.user.email, 
      subject: "Order Confirmation - Fashion Fusion-store",
      html: `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
    <div style="background-color: #2563eb; color: white; padding: 20px; text-align: center;">
      <h1 style="margin: 0; font-size: 24px;">Shukriya! Aapka Order Place Ho Gaya Hai</h1>
    </div>
    
    <div style="padding: 20px; color: #333; line-height: 1.6;">
      <p style="font-size: 16px;">Hi Customer,</p>
      <p>Humein aapka order mil gaya hai. Hum jald hi ise pack karke aap tak pahonchane ki koshish karenge.</p>
      
      <div style="background-color: #f8fafc; border-radius: 8px; padding: 15px; margin: 20px 0;">
        <h3 style="margin-top: 0; color: #2563eb; border-bottom: 1px solid #ddd; padding-bottom: 5px;">Order Details</h3>
        <p style="margin: 5px 0;">Order ID: <b style="color: #000;">${savedOrder._id}</b></p>
        <p style="margin: 5px 0;">Total Amount: <b style="color: #059669;">$${totalPrice}</b></p>
        <p style="margin: 5px 0;">Status: <b style="text-transform: capitalize;">${savedOrder.status}</b></p>
        <p style="margin: 5px 0;">Payment: <b>Cash on Delivery</b></p>
      </div>
      
      <p>Agar aapko koi bhi malomat chahiye, toh humse rabta karein:</p>
      <p style="background: #eff6ff; padding: 10px; border-radius: 5px; text-align: center;">
        📧 Email: <a href="mailto:nabilroghani96@gmail.com" style="color: #2563eb; font-weight: bold; text-decoration: none;">nabilroghani96@gmail.com</a>
      </p>
      
      <p style="font-size: 14px; color: #666; margin-top: 30px; text-align: center;">
        Thanks for choosing <b>Fashion Fusion-SHOP</b>!
      </p>
    </div>
  </div>
`,
    };

    sendEmail(mailOptions);

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) console.log("Email Error:", error);
      else console.log("Email Sent: " + info.response);
    });

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