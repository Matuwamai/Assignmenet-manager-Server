import { google } from "googleapis";
import fs from "fs";
import path from "path";
// Load your service account JSON file
const auth = new google.auth.GoogleAuth({
  keyFile: "service_account.json",
  scopes: ["https://www.googleapis.com/auth/drive.readonly"],
});
const drive = google.drive({ version: "v3", auth });
// List all files in folder
export const listAssignmentFiles = async (folderId) => {
  const res = await drive.files.list({
    q: `'${folderId}' in parents`,
    fields: "files(id, name, mimeType, createdTime)",
  });
  return res.data.files;
};
// Download file content to local temp
export const downloadFile = async (fileId, destPath) => {
  const dest = fs.createWriteStream(destPath);
  const res = await drive.files.get(
    { fileId, alt: "media" },
    { responseType: "stream" }
  );
  return new Promise((resolve, reject) => {
    res.data
      .on("end", () => resolve(destPath))
      .on("error", reject)
      .pipe(dest);
  });
};
