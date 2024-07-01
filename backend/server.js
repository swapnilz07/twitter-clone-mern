import express from "express";
import authRoutes from "./routes/auth.js";
import doteenv from "dotenv";
import connectMongoDB from "./db/connectMongoDB.js";

doteenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
console.log(process.env.MONGO_URL);

app.use("/api/auth", authRoutes);

app.listen(PORT, (req, res) => {
  console.log(`Server is listening on port ${PORT}`);
  connectMongoDB();
});
