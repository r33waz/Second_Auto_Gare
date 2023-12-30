import express from "express";
import {
  Login,
  Logoout,
  Signup,
  userDelete,
  userUpdate,
} from "../controller/user.controller.js";
import { handleFileUpload, upload } from "../middleware/multter.middleware.js";
import {
  authentication,
  authorization,
} from "../middleware/auth.missleware.js";

const router = express.Router();

router.post("/signup", upload.single("photo"), handleFileUpload, Signup);
router.post("/login", Login);
router.post("/logout", Logoout);
router.patch(
  "/updateuser/:id",
  authentication,
  authorization("admin"),
  userUpdate
);
router.delete(
  "/deleteuser/:id",
  authentication,
  authorization("admin"),
  userDelete
);

export default router;
