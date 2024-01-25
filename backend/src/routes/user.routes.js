import express from "express";
import {
  Login,
  Logoout,
  SendOTP,
  Signup,
  TokenVerify,
  getAllUser,
  getUserById,
  userDelete,
  userSearchByEmail,
  userUpdate,
} from "../controller/user.controller.js";
import { upload } from "../middleware/multter.middleware.js";
import {
  authentication,
  authorization,
} from "../middleware/auth.missleware.js";
import otpVerification from "../utils/validation.js";

const router = express.Router();

router.post("/signup", upload.array("photo", 3), Signup);
router.post("/login", Login);
router.post("/logout", Logoout);
router.post("/logout", Logoout);
router.get("/users", getAllUser);
router.get("/users/:id", getUserById);
router.get("/:id/verify/:token", TokenVerify);
router.patch(
  "/updateuser/:id",
  // authentication,
  // authorization("admin"),
  userUpdate
);
router.delete(
  "/usersdelete/:id",
  // authentication,
  // authorization("admin"),
  userDelete
);

router.get("/user", userSearchByEmail);
router.post("/send_otp",otpVerification,SendOTP)

export default router;
