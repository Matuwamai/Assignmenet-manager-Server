import fs from 'fs';
import { google } from 'googleapis';
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, "sample.pdf");

const auth = new google.auth.GoogleAuth({
  keyFile: process.env.GOOGLE_SERVICE_ACCOUNT_KEY,
  scopes: ['https://www.googleapis.com/auth/drive'],
});


const drive = google.drive({ version: 'v3', auth });


export const uploadFileToDrive = async (filePath, fileName) => {
  const fileMetadata = {
    name: 'UploadedAssignment.pdf',
    parents: ['0ALXoRiOkWLJ_Uk9PVA'], 
    driveId: "", 
  };

  const media = {
    mimeType: 'application/pdf',
    body: fs.createReadStream(filePath),
  };

  const response = await drive.files.create({
    resource: fileMetadata,
    media: media,
    fields: 'id, webViewLink',
  });

  consoler.log(response);

  return response.data;
};
;

// uploadFileToDrive(filePath, "")
