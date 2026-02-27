import express from "express";
import {
  createAdmission,
  getAllAdmissions,
  getAdmissionById,
  updateAdmission,
  deleteAdmission,
} from "../controllers/admissionController.js";

const router = express.Router();

router.post("/create", createAdmission);
router.get("/all", getAllAdmissions);
router.get("/:id", getAdmissionById);
router.put("/update/:id", updateAdmission);
router.delete("/delete/:id", deleteAdmission);

export default router;