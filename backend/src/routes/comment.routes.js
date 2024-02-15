import express from "express"
import { CreateComment, deleteComment } from "../controller/comment.controller.js"
const router = express.Router()
router.post("/comment", CreateComment)
router.delete('/vehicle/:vehicleId/comment/:commentId', deleteComment)
export default router;
