dotenv.config();
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import studentRouter from "./routes/student.route.js";
import UserRouter from "./routes/user.route.js";
import bodyParser from "body-parser";
import validateToken from "./middlewares/JwtValidation.js";

const app = express();
app.use(
  cors({
    origin: "*",
    allowedHeaders: ["*"],
  })
);

app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));
app.use(express.json());
app.use("/student", validateToken, studentRouter);
app.use("/user", UserRouter);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected...");
    app.listen(process.env.PORT, () => {
      console.log("Server is running!");
    });
  })
  .catch((err) => console.log(err));
