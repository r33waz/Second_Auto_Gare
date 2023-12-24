import multer from "multer";
import fs from "fs"

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "D:/Secound_Auto_Gare/backend/public/images");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix =
      Date.now() + "-" + Math.round(Math.random() * 1e9) + file.originalname;
    cb(null, uniqueSuffix);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png"
  ) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type"));
  }
};

export const upload = multer({
  storage,
  limits: {
    fileSize: 2 * 1024 * 1024,
  },
  fileFilter,
});

//* to delete the file after sometime automatically

export const handleFileUpload = (req, res, next) => {
  const fileDeletionTime = 5 * 1000; //Deletting the file after  1 sec in milliseconds
  setTimeout(() => {
    // Delete the file after the specified time
    if (req.file) {
      fs.unlinkSync(req.file.path);
      console.log(`File ${req.file.filename} deleted.`);
    }
  }, fileDeletionTime);

  next();
};
