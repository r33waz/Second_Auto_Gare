import express from "express";
import {
  Login,
  Logout,
  SendOTP,
  Signup,
  VerifyOtp,
  forgetPassoword,
  getAllUser,
  getUserById,
  resetPassword,
  setPassword,
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
router.post("/logout", Logout);
router.get("/users", getAllUser);
router.get("/users/:id",getUserById);
router.patch(
  "/updateuser/:id",
  // authentication,
  upload.single("photo"),
  userUpdate
);
router.delete(
  "/usersdelete/:id",
  // authentication,
  // authorization("admin"),
  userDelete
);

router.get("/user",
  // authentication,
  // authorization("admin"),
  userSearchByEmail);
router.post("/send_otp", authentication, otpVerification, SendOTP);
router.post("/verify_otp", authentication, verifyOtpValidation, VerifyOtp);
router.post("/forget_password", forgetPassoword);
router.get("/reset_password/:id/:token", resetPassword);
router.post("/set_password/:id/:token", setPassword);

export default router;
