import express from "express";
import { test } from "../controllers/userControllers.js";

const userRoutes = express.Router();

userRoutes.get("/test", test);

export default userRoutes;
