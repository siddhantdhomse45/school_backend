// import express from "express";
// import {
//   getParents,
//   getParentById,
//   createParent,
//   updateParent,
//   deleteParent,
//   getAvailableStudents,
// } from "../controllers/parentController.js";

// const router = express.Router();

// // Routes for parent management
// router.get("/", getParents);
// router.get("/students/available", getAvailableStudents);
// router.get("/:id", getParentById);
// router.post("/", createParent);
// router.put("/:id", updateParent);
// router.delete("/:id", deleteParent);

// export default router;




// import express from "express";
// import { getParentDashboard } from "../controllers/parentDashboardController.js";

// const router = express.Router();

// router.get("/dashboard/:parentId", getParentDashboard);

// export default router;


import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { getParentDashboard } from "../controllers/parentDashboardController.js";
import { linkStudentToParent } from "../controllers/parentController.js";

const router = express.Router();

// ✅ FINAL ROUTE
router.get("/dashboard", protect, getParentDashboard);
router.post("/link-student", linkStudentToParent);
export default router;