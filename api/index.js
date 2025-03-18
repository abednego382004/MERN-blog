import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoute.js";
import authRouter from "./routes/authRoute.js";
import cookieParser from "cookie-parser";

const app = express();

dotenv.config();
app.use(express.json());
app.use(cookieParser());

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

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
