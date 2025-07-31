import express from "express";
import { submitStudentAssignment, getStudentAssignments, getAssignmentById } from "../controllers/studentAssignment.js";
import { upload } from "../middlewares/upload.js";

const router = express.Router();

router.post("/submit", upload.single("file"), submitStudentAssignment);
router.get("/", getStudentAssignments);
router.get("/:id", getAssignmentById);

export default router;
