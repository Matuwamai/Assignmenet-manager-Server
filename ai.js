import { listAssignmentFiles, downloadFile} from "./lib/drive.js"
import { extractText, detectAIAndGenerateReport } from "./utils/analyzeAssignment.js"
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const ASSIGNMENT_FOLDER_ID = "your-google-drive-folder-id";

export const processNewAssignments = async () => {
  const files = await listAssignmentFiles(ASSIGNMENT_FOLDER_ID);

  for (const file of files) {
    const alreadyExists = await prisma.assignment.findFirst({
      where: { assignmentUrl: file.id },
    });

    if (alreadyExists) continue; // Skip already processed

    // Download file
    const tempPath = `./temp/${file.name}`;
    await downloadFile(file.id, tempPath);

    // Extract and analyze
    const text = await extractText(tempPath);
    const reportContent = await detectAIAndGenerateReport(text);
    // Save assignment + report to DB
    const assignment = await prisma.assignment.create({
      data: {
        assignmentUrl: file.id,
        studentId: "some-student-id", // this must be matched by filename or another logic
        isReviewed: true,
        status: "SENT",
      },
    });

    await prisma.report.create({
      data: {
        assignmentId: assignment.id,
        studentId: assignment.studentId,
        summary: reportContent,
      },
    });

    console.log(`Processed: ${file.name}`);
  }
};
