const express = require("express");
require("dotenv").config();
const cors = require("cors");
const connectDB = require("./config/db");
const { route } = require("./routes/user.routes");

const app = express();

connectDB();

app.use(cors()); 
app.use(express.json());

app.use("/api", route);

app.get("/", (req, res) => {
  res.send("Fashion Fusion API is running...");
});

if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app;