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

// /* MIDDLEWARE */
// app.use(cors());
// app.use(express.json()); // ⭐ MUST HAVE

// /* ROUTES */
// app.use("/api/auth", authRoutes);
// app.use("/api/students", studentRoutes);
// app.use("/api/staff", staffRoutes);
// app.use("/api/attendance", attendanceRoutes);
// app.use("/api/admission", admissionRoutes);
// app.use("/api/contact", contactRoutes);

// /* DB */
// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => console.log("MongoDB connected"))
//   .catch((err) => console.error(err));

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () =>
//   console.log(`Server running on port ${PORT}`)
// );






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

// /* ================= MIDDLEWARE ================= */
// const allowedOrigins = [
//   "https://studenterps-git-main-tejashris-projects-fd4aa30a.vercel.app/",
//   // "https://drushtieducation.com",
//   "http://localhost:5173"
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
//     credentials: true
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

// /* ================= START SERVER ================= */
// const PORT = process.env.PORT || 5000;

// const startServer = async () => {
//   await connectDB(); // 🔥 WAIT for DB

//   /* ================= ROUTES ================= */
//   app.use("/api/auth", authRoutes);
//   app.use("/api/students", studentRoutes);
//   app.use("/api/staff", staffRoutes);
//   app.use("/api/attendance", attendanceRoutes);
//   app.use("/api/admission", admissionRoutes);
//   app.use("/api/contact", contactRoutes);

//   app.listen(PORT, () =>
//     console.log(`🚀 Server running on port ${PORT}`)
//   );
// };

// startServer();






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

/* ================= BODY PARSER (🔥 MISSING FIX) ================= */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ================= CORS ================= */
const allowedOrigins = [
  "https://studenterps-git-main-tejashris-projects-fd4aa30a.vercel.app",
  "http://localhost:5173",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error("CORS Not Allowed: " + origin));
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

/* ================= DB CONNECTION ================= */
mongoose.set("bufferCommands", false);

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 30000,
    });
    console.log("✅ MongoDB connected");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

/* ================= ROUTES ================= */
app.use("/api/auth", authRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/staff", staffRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/admission", admissionRoutes);
app.use("/api/contact", contactRoutes);

/* ================= START SERVER ================= */
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();
  app.listen(PORT, () =>
    console.log(`🚀 Server running on port ${PORT}`)
  );
};

startServer();