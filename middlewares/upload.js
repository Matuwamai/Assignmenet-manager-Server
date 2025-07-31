import multer from "multer";
import path from "path";
import fs from "fs";

// Ensure uploads folder exists
const uploadFolder = "./uploads";
if (!fs.existsSync(uploadFolder)) {
  fs.mkdirSync(uploadFolder);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadFolder);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();
  if (ext === ".pdf") {
    cb(null, true);
  } else {
    cb(new Error("Only PDF files are allowed"), false);
  }
};

export const upload = multer({ storage, fileFilter });
