import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoute.js";
import authRouter from "./routes/authRoute.js";

const app = express();

dotenv.config();
app.use(express.json());

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("mongodb is connected");
  })
  .catch((e) => {
    console.log(e);
  });

app.use("/api/user", userRoutes);
app.use("/api/auth", authRouter);

app.listen(5000, () => {
  console.log("api is running on port 5000");
});
