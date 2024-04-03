import express from "express";
import {
  createConservation,
  getAllConservation,
  getSingleUserMessage,
} from "../controller/conservation.controller.js";
const router = express.Router();

router.post("/message", createConservation);
router.get("/get_all_message", getAllConservation);
router.get("/get_all_message/:id", getSingleUserMessage);

export default router;
