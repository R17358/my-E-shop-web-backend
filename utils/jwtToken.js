// Create Token and saving in cookie
const jwt = require("jsonwebtoken");

const sendToken = (user, statusCode, res) => {
  //const token = user.getJWTToken();
  const token = jwt.sign({ id: user._id }, "ABCD");
  // options for cookie
  const options = {
    expires: new Date(
      Date.now() + 5 * 24 * 60 * 60 * 1000  //process.env.COOKIE_EXPIRE
    ),
    httpOnly: true,
    secure: process.env.NODE_ENV === "PRODUCTION", // Secure cookies in production
    sameSite: process.env.NODE_ENV === "PRODUCTION" ? "None" : "Lax",
  };

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    user,
    token
  });
};

module.exports = sendToken;
