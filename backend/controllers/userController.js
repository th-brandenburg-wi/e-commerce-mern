// Route for User Login
const loginUser = async (req, res) => {
  res.json({ msg: "Login API Working" });
};

// Route for User Registration
const registerUser = async (req, res) => {
  res.json({ msg: "Register API Working" });
};

// Route for Admin Login
const adminLogin = async (req, res) => {
  res.json({ msg: "Admin Login API Working" });
};

export { loginUser, registerUser, adminLogin };
