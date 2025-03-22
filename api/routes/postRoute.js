import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import {
  create,
  deletePost,
  getPost,
  imageUpload,
} from "../controllers/postControllers.js";

const postRouter = express.Router();

postRouter.post("/create", verifyToken, create);
postRouter.post("/upload", imageUpload);
postRouter.get("/getposts", getPost);
postRouter.delete("/deletepost/:postId/:userId", verifyToken, deletePost);

export default postRouter;
