import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import {
  create,
  getPost,
  imageUpload,
} from "../controllers/postControllers.js";

const postRouter = express.Router();

postRouter.post("/create", verifyToken, create);
postRouter.post("/upload", imageUpload);
postRouter.get("/getposts", getPost);

export default postRouter;
