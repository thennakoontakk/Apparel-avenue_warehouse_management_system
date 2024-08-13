const jwt = require("jsonwebtoken"); // Importing the JSON Web Token module
const asyncHandler = require("express-async-handler"); // Importing the async handler utility
const User = require("../models/userModel"); // Importing the User model

// Middleware function to protect routes by verifying JWT
const protect = asyncHandler(async (req, res, next) => {
  let token; // Variable to store the extracted token

  // Check if the authorization header is present and starts with 'Bearer'
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Extract the token from the authorization header
      token = req.headers.authorization.split(" ")[1];

      // Verify the token using the JWT_SECRET stored in the environment variables
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Find the user associated with the decoded token's ID and exclude the password field
      req.user = await User.findById(decoded.id).select("-password");

      // Call next middleware or route handler
      next();
    } catch (error) {
      // If there's an error during token verification or user retrieval
      console.log(error);
      res.status(401); // Set HTTP status code to 401 (Unauthorized)
      throw new Error("Not authorized"); // Throw an error indicating unauthorized access
    }
  }

  // If token is not present or not properly formatted
  if (!token) {
    res.status(401); // Set HTTP status code to 401 (Unauthorized)
    throw new Error("Not authorized"); // Throw an error indicating unauthorized access
  }
});

module.exports = { protect }; // Export the protect middleware function
