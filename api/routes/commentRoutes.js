import express from "express";
import { createComment } from "../controllers/commentController.js";
import { verifyToken } from "../utils/verifyUser.js";

const commentRouter = express.Router();

commentRouter.post("/create", verifyToken, createComment);

export default commentRouter;
