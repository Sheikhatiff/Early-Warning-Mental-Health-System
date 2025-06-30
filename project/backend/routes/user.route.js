import express from "express";
import {
  checkUpdateReq,
  createUser,
  deleteMe,
  deleteUser,
  getAllUsers,
  getUserById,
  updatePassword,
  updateUser,
  uploadUserPhoto,
} from "../controllers/user.controller.js";
import { restrictTo, verifyToken } from "../middleware/auth.middleware.js";

const UserRouter = express.Router();

UserRouter.use(verifyToken);

UserRouter.delete("/deleteMe", deleteMe);
UserRouter.patch("/updateMyPassword", updatePassword);
UserRouter.patch("/updateMe", checkUpdateReq, uploadUserPhoto, updateUser);

UserRouter.use(restrictTo("admin"));

UserRouter.route("/").get(getAllUsers).post(createUser);
UserRouter.route("/:_id").get(getUserById).delete(deleteUser).patch(updateUser);

export default UserRouter;
