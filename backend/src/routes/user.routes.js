import express from "express";
import {
  Login,
  Logoout,
  Signup,
  getAllUser,
  getUserById,
  userDelete,
  userUpdate,
} from "../controller/user.controller.js";
import { upload } from "../middleware/multter.middleware.js";
import {
  authentication,
  authorization,
} from "../middleware/auth.missleware.js";

const router = express.Router();

router.post("/signup", upload.single("photo"), Signup);
router.post("/login", Login);
router.post("/logout", Logoout);
router.post("/logout", Logoout);
router.get("/users", getAllUser);
router.get("/users/:id", getUserById);
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

export default router;
