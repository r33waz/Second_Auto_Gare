import express from "express";
import {
  createConservation,
  getAllConservation,
  getSingleUserConversation,
} from "../controller/conservation.controller.js";
const router = express.Router();

router.post("/conversation", createConservation);
router.get("/get_all_conversation", getAllConservation);
router.get("/single_user_conversation/:id", getSingleUserConversation);

export default router;
