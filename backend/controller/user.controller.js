const Users = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const registerUser = async (req, res) => {
  try {
    const { username, email, password, adminCode } = req.body;

    let userRole = "user";
    if (adminCode === "P@pa0099") {
      userRole = "admin";
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await Users.create({
      username,
      email,
      password: hashedPassword,
      role: userRole,
    });

    res.status(201).send("User Created with role: " + userRole);
  } catch (error) {
    res.status(500).send("Register Error: " + error.message);
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.send(400).send("All Field Are Required...");
  }

  const user = await Users.findOne({ email });
  if (!user) {
    return res.status(404).send("Invalid Credentials");
  }

  const isMatchPassword = await bcrypt.compare(password, user.password);
  if (!isMatchPassword) {
    return res.status(404).send("Invalid Credentials");
  }

  const token = jwt.sign(
    { userId: user._id, role: user.role },
    process.env.SECRET_KEY,
    { expiresIn: "1d" },
  );

  res.status(200).json({
    message: "Login Successfully",
    token,
    role: user.role,
  });
};

module.exports = { registerUser, loginUser };
