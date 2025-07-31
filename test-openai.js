import dotenv from "dotenv";
import { detectAIAndGenerateReport } from "./utils/analyzeAssignment.js";

dotenv.config(); // Load your OPENAI_API_KEY from .env

const testText = `
The Industrial Revolution marked a major turning point in history. Almost every aspect of daily life was influenced in some way. 
Starting in the late 1700s, innovations in machinery, transportation, and manufacturing transformed economies and societies.`;

(async () => {
  try {
    const result = await detectAIAndGenerateReport(testText);
    console.log("✅ AI Analysis Result:");
    console.log(result);
  } catch (err) {
    console.error("❌ Error:", err.message);
    console.error(err);
  }
})();
