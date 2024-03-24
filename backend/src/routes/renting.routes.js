import express from "express"
import { createBooking, deleteRentingsVehicle, filterByDates, findBookingByUser, getAllRentingsVehicle, getRentingsVehicleById, updateRentalToCompleted } from "../controller/renting.controller.js"
const router = express.Router()
router.post("/booking", createBooking)
router.get("/all_bookings", getAllRentingsVehicle)
router.get("/single_booking/:id", getRentingsVehicleById)
router.delete("/delete_booking/:id", deleteRentingsVehicle)
router.get("/bookings/:id", findBookingByUser)
router.get("/bookings/", filterByDates);
router.post("/complete_booking", updateRentalToCompleted);
export default router