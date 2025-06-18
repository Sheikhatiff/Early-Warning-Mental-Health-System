import express from "express";
import {
  checkAuth,
  forgotPassword,
  login,
  logout,
  resetPassword,
  signup,
  verifyEmail,
} from "../controllers/auth.controller.js";
import { restrictTo, verifyToken } from "../middleware/auth.middleware.js";

const AuthRouter = express.Router();

AuthRouter.get("/", (_, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to the authentication API",
  });
});

AuthRouter.get("/check-auth", verifyToken, checkAuth);

AuthRouter.post("/sign-up", signup);
AuthRouter.post("/verify-email", verifyEmail);
AuthRouter.post("/login", login);
AuthRouter.post("/logout", logout);
AuthRouter.post("/forgot-password", forgotPassword);
AuthRouter.post("/reset-password/:token", resetPassword);

export default AuthRouter;
