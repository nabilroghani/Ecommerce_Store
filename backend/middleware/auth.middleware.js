const jwt = require("jsonwebtoken");

// Pehla Step: Sirf check karna ke banda login hai ya nahi
const verifyToken = (req, res, next) => {
  const authHeader = req.header("Authorization");
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Pehle Login karein! 🚫" });
  }

  try {
    const verified = jwt.verify(token, process.env.SECRET_KEY);
    req.user = verified; 
    next();
  } catch (error) {
    res.status(403).json({ message: "Invalid Token! ❌" });
  }
};

// Dusra Step: Check karna ke kya banda Admin hai?
const isAdmin = (req, res, next) => {
  
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({ 
      message: "Access Denied: Aap Admin nahi hain! 🛑" 
    });
  }
};

module.exports = { verifyToken, isAdmin };