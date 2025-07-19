import express from "express";
import authRoutes from "./routes/auth.route.js";
import dataRoutes from "./routes/data.route.js";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();

const PORT = process.env.PORT;

app.use(cors({
  origin: process.env.CLIENT_ORIGIN,
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/profile", dataRoutes)

app.listen(PORT, () => {
  console.log("App is listening");
  connectDB();
});
