import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
import path from "path";

export const submitStudentAssignment = async (req, res) => {
  try {
    const { userId, adminAssignmentId } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const filePath = file.path; 
    const fileName = path.basename(filePath);

  
    const assignment = await prisma.studentAssignment.create({
      data: {
        userId,
        adminAssignmentId,
        assingmenturl: filePath, 
      },
    });

    res.status(201).json({
      message: "Assignment submitted successfully",
      assignment,
    });

  } catch (error) {
    console.error("Submit Error:", error);
    res.status(500).json({ error: "Assignment submission failed" });
  }
};

export const getStudentAssignments = async (req, res) => {
  try {
    const assignments = await prisma.studentAssignment.findMany({
      include: {
        student: true,
        report: true,
      },
    });

    res.json(assignments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching assignments" });
  }
};
export const getAssignmentById = async (req, res) => {
  try {
    const { id } = req.params;

    const assignment = await prisma.studentAssignment.findUnique({
      where: { id },
      include: {
        student: true,
        report: true,
      },
    });

    if (!assignment) {
      return res.status(404).json({ message: "Assignment not found" });
    }

    res.status(200).json(assignment);
  } catch (err) {
    console.error("Get Assignment Error:", err);
    res.status(500).json({ message: "Error fetching assignment" });
  }
};