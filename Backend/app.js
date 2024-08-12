import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cookieParser from "cookie-parser";
import multer from "multer";
import cors from "cors";
import jwt from "jsonwebtoken";
//routers
import userRoute from "./routes/user.js";
import companyRoutes from "./routes/company.js";
import jobRoutes from "./routes/job.js";
import applicationRoutes from "./routes/application.js";
//

const app = express();

import User from "./models/user.model.js";
//DB connectons
import connectDB from "./utils/db.js";
connectDB();
// end;

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: "https://jobportal-fmlh.onrender.com",
    credentials: true,
  })
);
//end

app.get("/", async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.json({ message: "User is not logged in", success: false });
    }
    const decode = await jwt.verify(token, process.env.KEY);
    if (!decode) {
      return res.json({ message: "Invalid token" });
    }
    req.id = await decode.userId;
    const user = await User.findById(decode.userId);
    return res.status(200).json({
      message: "user logged in using token",
      success: true,
      user,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoutes);
app.use("/api/v1/job", jobRoutes);
app.use("/api/v1/application", applicationRoutes);

app.listen(process.env.PORT || 8000, () => {
  console.log("Server Started ", process.env.PORT);
});
