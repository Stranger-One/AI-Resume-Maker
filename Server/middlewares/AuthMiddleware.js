import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config(); 

export const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: No token provided",
      });
    }
    console.log("Token:", token);
    
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Attach the user to the request object
    req.user = decoded;
    next();
  } catch (error) {
    console.error("Error in authMiddleware:", error);
    res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }
};
