import express from "express"
import { createBooking, deleteRentingsVehicle, findBookingByUser, getAllRentingsVehicle, getRentingsVehicleById } from "../controller/renting.controller.js"
const router = express.Router()
router.post("/booking", createBooking)
router.get("/all_bookings", getAllRentingsVehicle)
router.get("/single_booking/:id", getRentingsVehicleById)
router.delete("/delete_booking/:id", deleteRentingsVehicle)
router.get("/bookings/:id",findBookingByUser)
export default router