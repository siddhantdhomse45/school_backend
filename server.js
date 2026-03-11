import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import authRoutes from "./src/routes/authRoutes.js";
import studentRoutes from "./src/routes/studentRoutes.js";
import staffRoutes from "./src/routes/staffRoutes.js";
import parentRoutes from "./src/routes/parentRoutes.js";
import attendanceRoutes from "./src/routes/attendanceRoutes.js";
import admissionRoutes from "./src/routes/admissionRoutes.js";
import contactRoutes from "./src/routes/contactRoutes.js";
import parentDashboardRoutes from "./src/routes/parentDashboardRoutes.js";
import feeRoutes from "./src/routes/feeRoutes.js";

dotenv.config();

const app = express();

/* ================= BODY PARSER ================= */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ================= CORS ================= */
const allowedOrigins = [
  "https://student-erp-beta.vercel.app",
  "http://localhost:5173",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true); // allow postman / mobile apps
      if (allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error("CORS Not Allowed: " + origin));
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

/* ================= ROUTES ================= */
app.use("/api/auth", authRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/staff", staffRoutes);
app.use("/api/parents", parentRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/admission", admissionRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/parent", parentDashboardRoutes);
app.use("/api/fees", feeRoutes);



/* ================= HEALTH CHECK ================= */
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "🚀 Student ERP API is running",
  });
});

/* ================= GLOBAL ERROR HANDLER ================= */
app.use((err, req, res, next) => {
  console.error("Server Error:", err.message);

  res.status(500).json({
    success: false,
    message: "Internal Server Error",
    error: err.message,
  });
});

/* ================= DB CONNECTION ================= */
mongoose.set("bufferCommands", false);

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 30000,
    });

    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
  }
};

/* ================= START SERVER ================= */
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
};

startServer();




// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import mongoose from "mongoose";

// import authRoutes from "./src/routes/authRoutes.js";
// import studentRoutes from "./src/routes/studentRoutes.js";
// import staffRoutes from "./src/routes/staffRoutes.js";
// import attendanceRoutes from "./src/routes/attendanceRoutes.js";
// import admissionRoutes from "./src/routes/admissionRoutes.js";
// import contactRoutes from "./src/routes/contactRoutes.js";

// dotenv.config();

// const app = express();

// /* ================= BODY PARSER (🔥 MISSING FIX) ================= */
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// /* ================= CORS ================= */
// const allowedOrigins = [
//   "https://student-erp-beta.vercel.app",
//   "http://localhost:5173",
// ];

// app.use(
//   cors({
//     origin: (origin, callback) => {
//       if (!origin) return callback(null, true);
//       if (allowedOrigins.includes(origin)) return callback(null, true);
//       return callback(new Error("CORS Not Allowed: " + origin));
//     },
//     methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//     credentials: true,
//   })
// );

// /* ================= DB CONNECTION ================= */
// mongoose.set("bufferCommands", false);

// const connectDB = async () => {
//   try {
//     await mongoose.connect(process.env.MONGO_URI, {
//       serverSelectionTimeoutMS: 30000,
//     });
//     console.log("✅ MongoDB connected");
//   } catch (error) {
//     console.error("❌ MongoDB connection failed:", error.message);
//     process.exit(1);
//   }
// };

// /* ================= ROUTES ================= */
// app.use("/api/auth", authRoutes);
// app.use("/api/students", studentRoutes);
// app.use("/api/staff", staffRoutes);
// app.use("/api/attendance", attendanceRoutes);
// app.use("/api/admission", admissionRoutes);
// app.use("/api/contact", contactRoutes);

// /* ================= START SERVER ================= */
// const PORT = process.env.PORT || 5000;

// const startServer = async () => {
//   await connectDB();
//   app.listen(PORT, () =>
//     console.log(`🚀 Server running on port ${PORT}`)
//   );
// };

// startServer();