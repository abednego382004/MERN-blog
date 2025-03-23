import express from "express";
import {
  createComment,
  getPostComments,
} from "../controllers/commentController.js";
import { verifyToken } from "../utils/verifyUser.js";

const commentRouter = express.Router();

commentRouter.post("/create", verifyToken, createComment);
commentRouter.get("/getPostComments/:postId", getPostComments);

export default commentRouter;
