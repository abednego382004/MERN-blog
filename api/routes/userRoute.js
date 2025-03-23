import express from "express";
import {
  deleteUser,
  getUser,
  getUsers,
  signOut,
  test,
  updateUser,
} from "../controllers/userControllers.js";
import { verifyToken } from "../utils/verifyUser.js";

const userRoutes = express.Router();

userRoutes.get("/test", test);
userRoutes.put("/update/:userId", verifyToken, updateUser);
userRoutes.delete("/delete/:userId", verifyToken, deleteUser);
userRoutes.post("/signout", signOut);
userRoutes.get("/getusers", verifyToken, getUsers);
userRoutes.get("/:userId", getUser);

export default userRoutes;
