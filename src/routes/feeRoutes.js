import express from "express";
import {
  getStudentsByClass,
  getStudentFees
} from "../controllers/feeController.js";

const router = express.Router();

router.get("/students/:className", getStudentsByClass);
router.get("/student/:studentId", getStudentFees);

export default router;