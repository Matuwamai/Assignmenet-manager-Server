import fs from "fs";
import PDFParser from "pdf2json";
import { detectAIAndGenerateReport } from "./analyzeAssignment.js";

export const extractText = (filename) => {

  return new Promise((resolve, reject) => {
    const pdfParser = new PDFParser(this, 1);

    pdfParser.on("pdfParser_dataError", (errData) => {
      reject(errData.parserError);
    });

    pdfParser.on("pdfParser_dataReady", (pdfData) => {
      resolve(pdfParser.getRawTextContent());
    });

    pdfParser.loadPDF(filename);
  });
};

// const text = await extractText("./role_of_ict.pdf");
// console.log(await detectAIAndGenerateReport(text))

