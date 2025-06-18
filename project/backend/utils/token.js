import jwt from "jsonwebtoken";
import crypto from "crypto";

export const timeToMs = (days = 0, hours = 0, minutes = 0) =>
  +((days * 24 + hours) * 60 + minutes) * 60 * 1000;

export const generateVerificationToken = () =>
  Math.floor(100000 + Math.random() * 900000).toString();

export const generateResetToken = (days = 0, hour = 24, minutes = 0) => {
  return {
    resetPasswordToken: crypto.randomBytes(20).toString("hex"),
    resetTokenExpiresAt: new Date(Date.now() + timeToMs(days, hour, minutes)),
  };
};

export const generateTokenAndSetCookie = (user, res, statusCode = 200) => {
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  const cookieOptions = {
    httpOnly: true,
    maxAge: timeToMs(process.env.JWT_TOKEN_EXPIRES_IN || 7, 0, 0),
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  };
  res.cookie("jwt", token, cookieOptions);
  user.password = undefined;
  res.status(statusCode).json({
    success: true,
    token,
    user,
  });
};
