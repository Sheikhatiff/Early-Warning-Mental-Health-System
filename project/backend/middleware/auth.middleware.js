import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
// export const verifyToken = (req, res, next) => {
//   try {
//     const token = req.cookies.jwt;
//     if (!token) {
//       return res
//         .status(401)
//         .json({ status: false, message: "unauthorized - no token provided" });
//     }
//     const decoded = jwt.decode(token, process.env.JWT_SECRET_KEY);
//     if (!decoded)
//       return res
//         .status(401)
//         .json({ status: false, message: "unauthorized - Invalid token" });
//     req.userId = decoded.id;
//     console.log(`User ID from token: ${req.userId}`);
//     next();
//   } catch (err) {
//     res.status(401).json({ success: false, message: err.message });
//   }
// };

export const verifyToken = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "you're not logged in, please log in to get Access...!",
      });
    }

    //verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    //check if user still exists
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "the user belonging to this token does no longer exist!",
      });
    }

    //check if user changed the password after the token was issued
    if (user.passwordChangedAfter(decoded.iat)) {
      return res.status(401).json({
        success: false,
        message: `User recently changed password, please login again !`,
      });
    }
    //Grant Access to protected routes
    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({
      success: false,
      message: err.message || "Unauthorized access, please log in again!",
    });
    console.error(`Error in verifyToken: ${err.message}`);
    console.error(`Error in verifyToken: ${err}`);
    console.error(`Error in verifyToken: ${err.stack}`);
  }
};

export const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `You do not have permission to perform this action!`,
      });
    }
    next();
  };
};
