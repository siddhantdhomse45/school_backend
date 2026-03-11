import express from "express";
import { getParentDashboard } from "../controllers/parentDashboardController.js";

const router = express.Router();

router.get("/dashboard/:parentId", getParentDashboard);

export default router;