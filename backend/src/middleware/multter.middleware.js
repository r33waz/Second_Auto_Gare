import multer from 'multer';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'C:/Project/Second_Auto_Gare/backend/src/public/uploads');
  },
  filename: (req, file, cb) => {
    // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9) + file.originalname;
    cb(null, file.originalname)

  }
})

const fileFilter = (req, file, cb) => {
  console.log(file)
  // Check if file is undefined or null
  if (!file) {
    // Pass an error to indicate that no file was uploaded
    cb(new Error('No file uploaded'));
    return;
  }
  // Check the file's mimetype
  // if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
  //   cb(null, true); // Accept the file
  // } else {
  //   cb(new Error('Invalid file type. Only images are allowed.'), true); // Reject the file
  // }
  cb(null, true);
};

export const upload = multer({
  storage,
  limits: {
    //30 mb max size
    fileSize: 30 * 1024 * 1024
  },
  fileFilter
})

// const fileFilter = (req, file, cb) => {
//   console.log(file)
//   if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
//     cb(null, true);
//   } else {
//     cb(new Error("Invalid File type. Only images are allowed."), false);
//   }
// }
