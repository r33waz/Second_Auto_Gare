import express from "express";
import { createMessage, getMessagesByConvId } from "../controller/message.controller.js";

const router = express.Router()
router.post("/message", createMessage)
router.get("/message/:conveId", getMessagesByConvId);
export default router
