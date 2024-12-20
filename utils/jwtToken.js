const jwt = require("jsonwebtoken");

const sendToken = (user, statusCode, res) => {
  // Generate JWT Token
  const token = jwt.sign({ id: user._id }, "ABCD");

  // Options for cookie
  const options = {
    expires: new Date(Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
    // httpOnly: true, // Prevents JavaScript access to cookies
    // secure: process.env.NODE_ENV === "production", // Only send cookies over HTTPS in production
    sameSite: "None", // Necessary for cross-site cookies (CORS)
  };

  // Send response with cookie and token
  res.status(statusCode)
    .cookie("token", token, options)  // Send the cookie
    .json({
      success: true,
      user,
      token,  // Send the token in the response body as well (useful for the frontend)
    });
};

module.exports = sendToken;
