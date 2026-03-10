import express from "express";
import {
  getParents,
  getParentById,
  createParent,
  updateParent,
  deleteParent,
  getAvailableStudents,
} from "../controllers/parentController.js";

const router = express.Router();

// Routes for parent management
router.get("/", getParents);
router.get("/students/available", getAvailableStudents);
router.get("/:id", getParentById);
router.post("/", createParent);
router.put("/:id", updateParent);
router.delete("/:id", deleteParent);

export default router;

