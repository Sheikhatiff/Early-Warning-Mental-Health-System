import bcrypt from "bcryptjs";
import { sendEmail } from "../mailtrap/emails.js";
import User from "../models/user.model.js";
import Agenda from "../utils/agenda.js";
import {
  generateResetToken,
  generateTokenAndSetCookie,
  generateVerificationToken,
  timeToMs,
} from "../utils/token.js";
import { startAgenda } from "./agenda.controller.js";

export const signup = async (req, res) => {
  try {
    const { name, email, password, passwordConfirm } = req.body;
    const user = await User.create({
      name,
      email,
      password,
      passwordConfirm,
      verificationToken: generateVerificationToken(),
      verificationTokenExpiresAt: new Date(Date.now() + timeToMs(0, 0, 15)),
    });
    console.log(new Date(user.verificationTokenExpiresAt).toLocaleString());

    startAgenda();
    await Agenda.schedule(
      user.verificationTokenExpiresAt,
      "checkVerification",
      { userId: user._id }
    );

    //TODO: send verification email
    if (!user.isVerified) {
      await sendEmail(user.email, {
        subject: "Verify your email",
        text: `Hello ${user.name},\n\nPlease verify your email by clicking the link below:\n\nhttp://localhost:5000/api/v1/auth/verify-email?token=${user.verificationToken}\n\nThis link will expire in 15 minutes.\n\nThank you!`,
        category: "verification",
      });
    }
    res.status(201).json({
      success: true,
      message: "User created successfully! Please verify your email.",
      data: { ...user._doc, password: undefined },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: err.message,
    });
    console.log(`Error in signup: ${err.message}`);
    console.log(`Error in signup: ${err}`);
    console.log(`Error in signup: ${err.stack}`);
  }
};

export const verifyEmail = async (req, res) => {
  try {
    const { verificationToken } = req.body;
    if (!verificationToken) {
      return res.status(400).json({
        success: false,
        message: "Verification token is required",
      });
    }

    const user = await User.findOne({
      verificationToken,
      verificationTokenExpiresAt: { $gt: Date.now() },
      isVerified: false,
    }).select("-password -passwordConfirm");

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired verification token",
      });
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiresAt = undefined;
    await user.save();

    // TODO: send verification success email
    await sendEmail(user.email, {
      subject: "Email Verified Successfully",
      text: `Hello ${user.name},\n\nYour email has been successfully verified! You can now log in to your account.\n\nThank you!`,
      category: "verification-success",
    });

    res
      .status(200)
      .json({ success: true, message: "Email Verified Succesfully!" });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: err.message,
    });
    console.log(`Error in verifyEmail: ${err.message}`);
    console.log(`Error in verifyEmail: ${err}`);
    console.log(`Error in verifyEmail: ${err.stack}`);
  }
};

export const logout = async (_, res) => {
  try {
    res.clearCookie("jwt");
    res
      .status(200)
      .json({ success: true, message: "User logged out successfully!" });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }
    const user = await User.findOneAndUpdate(
      { email, isVerified: true },
      { lastLogin: Date.now() },
      { new: true }
    ).select("+password");

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password, or account not verified",
      });
    }
    generateTokenAndSetCookie(user, res);
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
    console.log(`Error in login: ${error.message}`);
    console.log(`Error in login: ${error}`);
    console.log(`Error in login: ${error.stack}`);
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const { resetPasswordToken, resetTokenExpiresAt } = generateResetToken(
      0,
      1,
      0
    );
    const user = await User.findOneAndUpdate(
      { email, isVerified: true },
      {
        resetPasswordToken,
        resetTokenExpiresAt,
      },
      { new: true }
    );
    if (!user)
      return res
        .status(400)
        .json({ success: false, message: `User not found` });

    await sendEmail(user.email, {
      subject: "Reset Your Password",
      category: "reset-password",
      text: `Hello ${user.name},\n\nYou requested to reset your password. Please click the link below to reset your password:\n\nhttp://localhost:5173/reset-password/${resetPasswordToken}\n\nThis link will expire in 1 hour.\n\nIf you did not request this, please ignore this email.\n\nThank you!`,
    });
    console.log(
      `http://localhost:5000/api/v1/auth/reset-password/${resetPasswordToken}`
    );

    res.status(200).json({
      success: true,
      message: "Reset Password Email sent successfully!",
      resetToken: resetPasswordToken,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
    console.log(`Error in forgotPassword: ${error.message}`);
    console.log(`Error in forgotPassword: ${error}`);
    console.log(`Error in forgotPassword: ${error.stack}`);
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password, passwordConfirm } = req.body;
    const user = await User.findOne({
      resetPasswordToken: token,
      resetTokenExpiresAt: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired reset password token",
      });
    }
    user.password = password;
    user.passwordConfirm = passwordConfirm;
    user.passwordChangedAt = Date.now() - 1000;
    user.resetPasswordToken = user.resetTokenExpiresAt = undefined;
    await user.save();
    await sendEmail(user.email, {
      subject: "Password Reset Successfully",
      text: `Hello ${user.name},\n\nYour password has been reset successfully! You can now log in with your new password.\n\nThank you!`,
      category: "password-reset-success",
    });
    res
      .status(200)
      .json({ success: true, message: "Password Reset successfully!" });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
    console.log(`Error in resetPassword: ${error.message}`);
    console.log(`Error in resetPassword: ${error}`);
    console.log(`Error in resetPassword: ${error.stack}`);
  }
};

export const checkAuth = async (req, res) => {
  try {
    const user = req.user; // Assuming user is set by auth middleware
    if (!user)
      return res
        .status(400)
        .json({ success: false, message: "user not found" });

    res.status(200).json({ success: true, user });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
    console.log(`Error in checkAuth: ${err.message}`);
    console.log(`Error in checkAuth: ${err}`);
    console.log(`Error in checkAuth: ${err.stack}`);
  }
};
