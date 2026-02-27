import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoutes from "./src/routes/authRoutes.js";
import studentRoutes from "./src/routes/studentRoutes.js";
import staffRoutes from "./src/routes/staffRoutes.js";
import attendanceRoutes from "./src/routes/attendanceRoutes.js";
import admissionRoutes from "./src/routes/admissionRoutes.js";
import contactRoutes from "./src/routes/contactRoutes.js";                          

dotenv.config();

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",          // local frontend
      "https://student-erp-gamma.vercel.app/" // ⭐ Vercel frontend URL
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // if using cookies / auth headers
  })
); 

/* ROUTES */
app.use("/api/auth", authRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/staff", staffRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/admission", admissionRoutes);
app.use("/api/contact", contactRoutes);

/* DB */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);
