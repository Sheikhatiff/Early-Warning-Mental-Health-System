import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please tell us your name"],
      trim: true,
      validate: {
        validator: function (elm) {
          return !/\d/.test(elm);
        },
        message: "Digits A'int allowed in Name!",
      },
    },
    email: {
      type: String,
      required: [true, "please provide your email"],
      unique: [true, "Email already exists"],
      trim: true,
      lowercase: true,
      validate: [validator.isEmail, "please provide valid email"],
    },
    photo: { type: String, default: "default.png" },
    role: {
      type: String,
      default: "user",
      enum: ["user", "admin"],
    },
    password: {
      type: String,
      required: [true, "please provide a password"],
      minlength: 8,
      select: false,

      validate: {
        validator: function (elm) {
          return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/.test(
            elm
          );
        },
        message:
          "Please ensure all password requirements(atleast 1 digit & 1 lower,capital, special character)",
      },
    },
    passwordConfirm: {
      type: String,
      required: [true, "please confirm your password"],
      validate: {
        validator: function (elm) {
          return elm === this.password;
        },
        message: "Password should be same",
      },
    },
    lastLogin: {
      type: Date,
      default: Date.now,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    resetPasswordToken: String,
    resetTokenExpiresAt: Date,
    verificationToken: String,
    verificationTokenExpiresAt: Date,
    passwordChangedAt: Date,
  },
  { timestamps: true }
);

// Middleware to hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

userSchema.methods.passwordChangedAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    return JWTTimestamp < changedTimestamp;
  }
  return false;
};

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

// userSchema.index({ expireAt: 1 }, { expireAfterSeconds: 0 });
// userSchema.pre("save", function (next) {
//   if (!this.isActive) {
//     this.expireAt = new Date(Date.now() + 1 * 60 * 1000);
//   } else {
//     this.expireAt = undefined;
//   }
//   next();
// });

const User = mongoose.model("User", userSchema);

export default User;
