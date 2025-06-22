import bcrypt from "bcryptjs";
import {
  sendEmail,
  sendPasswordResetEmail,
  sendPasswordResetSuccessEmail,
  sendVerificationEmail,
  // sendVerificationEmail,
  sendVerificationSuccessEmail,
  sendWelcomeEmail,
} from "../mailtrap/emails.js";
import User from "../models/user.model.js";
import Agenda from "../utils/agenda.js";
import {
  generateResetToken,
  generateTokenAndSetCookie,
  generateVerificationToken,
  timeToMs,
} from "../utils/token.js";
import { startAgenda } from "./agenda.controller.js";
const clientUrl = `http://localhost:5173/`;

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

    startAgenda();
    console.log(new Date(user.verificationTokenExpiresAt).toLocaleString());
    await Agenda.schedule(
      user.verificationTokenExpiresAt,
      "checkVerification",
      { userId: user._id }
    );

    const verificationPageLink = `${clientUrl}verify-email`;
    if (!user.isVerified) {
      await sendVerificationEmail(
        user.email,
        user.name,
        user.verificationToken,
        verificationPageLink,
        user.verificationTokenExpiresAt
      );
    }
    res.status(201).json({
      success: true,
      message: "User created successfully! Please verify your email.",
      data: { ...user._doc, password: undefined },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message || "Internal Server Error",
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
    const dashBoardUrl = `${clientUrl}login`;
    await sendVerificationSuccessEmail(user.email, user.name, dashBoardUrl);

    res
      .status(200)
      .json({ success: true, message: "Email Verified Succesfully!" });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message || "Internal Server Error",
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

    const resetURL = `${clientUrl}reset-password/${resetPasswordToken}`;
    await sendPasswordResetEmail(user.email, user.name, resetURL);
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
    await sendPasswordResetSuccessEmail(user.email, user.name);
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
    const user = req.user;
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
