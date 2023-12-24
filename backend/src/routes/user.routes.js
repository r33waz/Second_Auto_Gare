import express from "express";
import { Login, Signup } from "../controller/user.controller.js";
import { handleFileUpload, upload } from "../middleware/multter.middleware.js";

const router = express.Router();

router.post("/signup", upload.single("photo"), handleFileUpload, Signup);
router.post("/login",Login);

export default router;
