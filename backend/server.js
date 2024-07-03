import express from "express";
import doteenv from "dotenv";
import cookieParser from "cookie-parser";
import { v2 as cloudanary } from "cloudinary";

import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/user.routes.js";

import connectMongoDB from "./db/connectMongoDB.js";

doteenv.config();

cloudanary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  secret_key: process.env.CLOUDINARY_SECRET_KEY,
});

const app = express();
const PORT = process.env.PORT || 5000;
console.log(process.env.MONGO_URL);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

app.listen(PORT, (req, res) => {
  console.log(`Server is listening on port ${PORT}`);
  connectMongoDB();
});
