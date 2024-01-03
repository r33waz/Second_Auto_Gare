import multer from "multer";

const storage = multer.diskStorage({});

export const upload = multer({
  storage,
  limits: {
    fileSize: 2 * 1024 * 1024, // Limit the file size to 2 MB
  },
});
