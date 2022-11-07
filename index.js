import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authroute from "./routes/auth.js";
import hotelsroute from "./routes/hotels.js";
import roomsroute from "./routes/rooms.js";
import usersroute from "./routes/users.js";
import cookies from "cookie-parser";
import cors from "cors";
const app = express();
dotenv.config();
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("connected to mongo");
  } catch (error) {
    throw error;
  }
};
app.use(cors());
app.use(cookies());
app.use(express.json());
app.use("/api/auth", authroute);
app.use("/api/hotels", hotelsroute);
app.use("/api/rooms", roomsroute);
app.use("/api/users", usersroute);
app.use((err, req, res, next) => {
  const errorstatus = err.status || 500;
  const errormess = err.message || "Something went wrong";
  return res.status(errorstatus).json({
    success: false,
    status: errorstatus,
    message: errormess,
    stack: err.stack,
  });
});
app.listen("8800", () => {
  connect();
  console.log("connected to backend");
});
