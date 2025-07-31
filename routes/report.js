import express from "express";
import {analyzeAssignmentAndSaveReport, getReportById} from "../controllers/report.js"
const router = express.Router();
router.post("/review/:studentAssignmentId", analyzeAssignmentAndSaveReport);
router.get("/:reportId", getReportById);
 

export default router;

