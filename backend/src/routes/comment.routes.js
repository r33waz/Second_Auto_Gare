import express from "express"
import { CreateComment} from "../controller/comment.controller.js"
const router = express.Router()
router.post("/comment", CreateComment)
export default router;