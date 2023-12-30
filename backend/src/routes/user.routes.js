import express from "express";
import { Login, Logoout, Signup } from "../controller/user.controller.js";
import { handleFileUpload, upload } from "../middleware/multter.middleware.js";
import {
  authentication,
  authorization,
} from "../middleware/auth.missleware.js";

const router = express.Router();

router.post("/signup", upload.single("photo"), handleFileUpload, Signup);
router.post("/login", Login);
router.post("/logout",Logoout)

export default router;
