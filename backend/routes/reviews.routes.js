import express from "express"
import { createReview, deleteReview, getAllReviews } from "../controller/reviwe.controller.js"

const router = express.Router()
router.post("/feedback", createReview)
router.get("/feedbacks", getAllReviews)
router.delete("/delete/feedback/:id", deleteReview)
export default router