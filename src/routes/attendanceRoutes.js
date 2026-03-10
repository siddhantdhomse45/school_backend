import express from "express";
import {
  markAttendance,
  getStudentAttendance,
  getStaffAttendance,
  getStudentsByClass,
  getParentStudentAttendance,
} from "../controllers/attendanceController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/mark", protect, markAttendance);
router.get("/students", protect, getStudentAttendance);
router.get("/students/by-class", protect, getStudentsByClass);
router.get("/staff", protect, getStaffAttendance);

// Parent route - get attendance for their linked student
router.get("/parent/:parentId", protect, getParentStudentAttendance);

export default router;
