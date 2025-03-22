import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import {
  create,
  deletePost,
  getPost,
  imageUpload,
  updatePost,
} from "../controllers/postControllers.js";

const postRouter = express.Router();

postRouter.post("/create", verifyToken, create);
postRouter.post("/upload", imageUpload);
postRouter.get("/getposts", getPost);
postRouter.delete("/deletepost/:postId/:userId", verifyToken, deletePost);
postRouter.put("/updatepost/:postId/:userId", verifyToken, updatePost);

export default postRouter;
