import { google } from 'googleapis';
const drive = google.drive({ version: 'v3', auth: client });

// Test Shared Drive access
const res = await drive.drives.get({
  driveId: '0ALXoRiOkWLJ_Uk9PVA',  // Your Shared Drive ID
  fields: 'name'
});
console.log('Shared Drive Name:', res.data.name); // Should log "Assignment Uploads"