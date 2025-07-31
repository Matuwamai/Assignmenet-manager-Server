import { detectAIAndGenerateReport } from '../utils/analyzeAssignment.js';
import { extractText } from '../utils/extractPDF.js';
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
import path from "path";

export const analyzeAssignmentAndSaveReport = async (req, res) => {
  const { reportId } = req.params;

  try {
    const assignment = await prisma.studentAssignment.findUnique({
      where: { id: reportId },
      include: {
        student: true
      }
    });

    if (!assignment) {
      return res.status(404).json({ error: "Assignment not found." });
    }

    // const filePath = path.join(assignment.assingmenturl); 
    const text = await extractText(assignment.assingmenturl);
    const aiReport = await detectAIAndGenerateReport(text);

    const exitstingReport = await prisma.report.findUnique({
      where: {
        studentassignmentId: studentAssignmentId
      }
    })

    let report;

    if (exitstingReport) {
      report = await prisma.report.update({
        where: {
          id: exitstingReport.id
        },
        data: {
          details: aiReport,
        }
      })
    } else {
      report = await prisma.report.create({
        data: {
          studentassignmentId: studentAssignmentId,
          userId: assignment.userId,
          details: aiReport,
        },
      });
    }

    res.status(201).json({ success: true, report });
  } catch (error) {
    console.error("Error reviewing assignment:", error);
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
};
export const getReportById = async (req, res) => {
  const { reportId } = req.params;

  try {
    const report = await prisma.report.findUnique({
      where: { studentassignmentId: reportId },
      include: {
        student: true
      },
    });

    if (!report) {
      return res.status(404).json({ success: false, error: "Report not found." });
    }

    res.status(200).json({ success: true, report });
  } catch (error) {
    console.error("Error fetching report:", error);
    res.status(500).json({ success: false, error: error.message || "Internal Server Error" });
  }
};