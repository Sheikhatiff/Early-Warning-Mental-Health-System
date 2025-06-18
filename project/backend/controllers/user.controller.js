import User from "../models/user.model.js";
import mongoose from "mongoose";
import { generateTokenAndSetCookie } from "../utils/token.js";

export const createUser = async (req, res) => {
  try {
    const { name, email, password, passwordConfirm } = req.body;

    const user = await User.create({
      name,
      email,
      password,
      passwordConfirm,
      isVerified: true,
    });

    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: { ...user._doc, password: undefined },
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
    console.log(`Error in createUser: ${err.message}`);
    console.log(`Error in createUser: ${err}`);
    console.log(`Error in createUser: ${err.stack}`);
  }
};

export const getAllUsers = async (_, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      success: true,
      result: users.length,
      data: { users },
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
    console.log(`Error in getAllUsers: ${err.message}`);
    console.log(`Error in getAllUsers: ${err}`);
    console.log(`Error in getAllUsers: ${err.stack}`);
  }
};

export const getUserById = async (req, res) => {
  try {
    const { _id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(400).json({ error: "Invalid user ID" });
    }

    const user = await User.findById(_id);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({
      success: true,
      data: { user },
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
    console.log(`Error in getUserById: ${err.message}`);
    console.log(`Error in getUserById: ${err}`);
    console.log(`Error in getUserById: ${err.stack}`);
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { _id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(400).json({ error: "Invalid user ID" });
    }

    const user = await User.findByIdAndDelete(_id);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
    console.log(`Error in deleteUser: ${err.message}`);
    console.log(`Error in deleteUser: ${err}`);
    console.log(`Error in deleteUser: ${err.stack}`);
  }
};

export const updateUser = async (req, res) => {
  try {
    const _id = req.params._id || req.userId;
    const updateData = req.body;

    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(400).json({ error: "Invalid user ID" });
    }

    const user = await User.findByIdAndUpdate(_id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: { user },
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
    console.log(`Error in updateUser: ${err.message}`);
    console.log(`Error in updateUser: ${err}`);
    console.log(`Error in updateUser: ${err.stack}`);
  }
};

export const deleteMe = async (req, res) => {
  try {
    const userId = req.user._id;

    const user = await User.findByIdAndDelete(userId);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    res.clearCookie("jwt");
    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
    console.log(`Error in deleteMe: ${err.message}`);
    console.log(`Error in deleteMe: ${err}`);
    console.log(`Error in deleteMe: ${err.stack}`);
  }
};

export const updatePassword = async (req, res) => {
  try {
    const userId = req.user._id;
    const { currentPassword, password, passwordConfirm } = req.body;

    if (!currentPassword || !password || !passwordConfirm) {
      return res.status(400).json({
        success: false,
        message:
          "Current password, new password, and confirmation are required",
      });
    }

    const user = await User.findById(userId).select("+password");

    if (!(await user.correctPassword(currentPassword, user.password))) {
      return res.status(401).json({
        success: false,
        message: "Current password is incorrect",
      });
    }

    user.password = password;
    user.passwordConfirm = passwordConfirm;
    user.passwordChangedAt = Date.now();
    await user.save();

    generateTokenAndSetCookie(user, res, 200);
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
    console.log(`Error in updatePassword: ${err.message}`);
    console.log(`Error in updatePassword: ${err}`);
    console.log(`Error in updatePassword: ${err.stack}`);
  }
};

export const checkUpdateReq = async (req, res, next) => {
  try {
    req.userId = req.user._id;

    if (req.body.password || req.body.passwordConfirm)
      return res.status(400).json({
        success: false,
        message:
          "This route is not for password updates. Use /updateMyPassword.",
      });

    next();
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
    console.log(`Error in updateMe: ${err.message}`);
    console.log(`Error in updateMe: ${err}`);
    console.log(`Error in updateMe: ${err.stack}`);
  }
};
