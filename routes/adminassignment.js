import express from "express";
import {
  createAdminAssignment,
  getAllAdminAssignments,
  getAdminAssignmentById,
  deleteAdminAssignment,
} from "../controllers/adminAssignment.js";

const router = express.Router();

router.post("/", createAdminAssignment); 
router.get("/", getAllAdminAssignments); 
router.get("/:id", getAdminAssignmentById); 
router.delete("/:id", deleteAdminAssignment); 

export default router;
