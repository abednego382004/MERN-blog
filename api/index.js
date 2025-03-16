import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

const app = express();

dotenv.config();

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("mongodb is connected");
  })
  .catch((e) => {
    console.log(e);
  });

app.listen(5000, () => {
  console.log("api is running on port 5000");
});
