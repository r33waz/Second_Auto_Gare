import express from "express";
import {
  Login,
  Logoout,
  SendOTP,
  Signup,
  VerifyOtp,
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
import { otpVerification, verifyOtpValidation } from "../utils/validation.js";

const router = express.Router();

router.post("/signup", Signup);
router.post("/login", Login);
router.post("/logout", Logoout);
router.post("/logout", Logoout);
router.get("/users", getAllUser);
router.get("/users/:id", getUserById);
router.patch(
  "/updateuser/:id",
  // authentication,
  // authorization("admin"),
  upload.array("photo", 3),
  userUpdate
);
router.delete(
  "/usersdelete/:id",
  // authentication,
  // authorization("admin"),
  userDelete
);

router.get("/user", userSearchByEmail);
router.post("/send_otp", otpVerification, SendOTP)
router.post("/verify_otp",verifyOtpValidation,VerifyOtp)

export default router;
