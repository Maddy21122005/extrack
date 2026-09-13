const User = require("../models/user");

const signupHandler = async function (req, res) {
  try {
    const { fullName, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists",
      });
    }

    await User.create({
      fullName,
      email,
      password,
    });

    return res.status(201).json({
      success: true,
      message: "Signup successful",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Signup failed",
    });
  }
};

const loginHandler = async function (req, res) {
  try {
    const { email, password } = req.body;
    const token = await User.matchPasswordAndGenerateToken(email, password);

    // User ka data nikalne ke liye (password ko exclude karke)
    const user = await User.findOne({ email }).select("-password");

    // Cookie set karein aur JSON response bhejen (Redirect NA karein)
    return res
      .cookie("token", token, {
        httpOnly: true,
        secure: false, // development mein false rakhein
      })
      .status(200)
      .json({
        success: true,
        message: "Login Successful",
        user, // Ye data frontend ko milega
      });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const logoutHandler = function (req, res) {
  res.clearCookie("token", {
    httpOnly: true,
    secure: false, // same as login
    sameSite: "lax", // same as login
  });

  console.log("cookies cleared");

  return res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
};

module.exports = {
  signupHandler,
  loginHandler,
  logoutHandler,
};
