const express = require("express");
require("dotenv").config();
const cors = require("cors");
const connectDB = require("./config/db");
const { route } = require("./routes/user.routes");

const app = express();

app.use(express.json());
connectDB();
app.use(cors());

app.use("/api", route);

app.listen(process.env.PORT, () => {
  console.log(`server running on http://localhost:${process.env.PORT}`);
});
