import express from 'express';
import fs from "fs-extra";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
// import PdfParse from "pdf-parse";
import userRoutes from "./routes/user.js"
import adminAssignmentRoutes from "./routes/adminassignment.js";
import studentAssignmentRoutes from "./routes/studentAssignment.js";
import { listAssignmentFiles, downloadFile } from "./lib/drive.js";
import reportRoutes from "./routes/report.js"

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const RESULTS = [];
app.use("/api/users", userRoutes);
app.use("/api/admin/assignments", adminAssignmentRoutes);
app.use("/api/student/assignments", studentAssignmentRoutes);
app.use("/api/report", reportRoutes);

app.get("/check-submissions", async (req, res) => {
  try {
    const files = await listAssignmentFiles();

    for (let file of files) {
      const filename = file.name;
      const fileId = file.id;
      const filepath = path.join(__dirname, "downloads", filename);

      // Only download if it doesn't exist
      if (!fs.existsSync(filepath)) {
        await downloadFile(fileId, filepath);
      }

      let text = "";

      if (filename.endsWith(".pdf")) {
        const data = await PdfParse(fs.readFileSync(filepath));
        text = data.text;
      } else {
        text = "Unsupported file type";
      }

      const result = await detectAIContent(text);

      RESULTS.push({
        name: filename,
        submitted: file.modifiedTime,
        result,
      });
    }

    res.json({ message: "Processed", count: files.length });
  } catch (error) {
    console.error("Error processing submissions:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.get("/results", (req, res) => {
  res.json(RESULTS);
});

app.listen(PORT, () => {
  console.log(`🚀 Backend running at http://localhost:${PORT}`);
});
