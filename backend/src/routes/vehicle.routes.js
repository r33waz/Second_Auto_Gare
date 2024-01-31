import express from "express"
import { Addvehicle, deleteVechile, getAllVehicle, getVehicleById, updateVehicle } from "../controller/vehicle.controller.js"

const router = express.Router()
router.post("/add_vehicle", Addvehicle)
router.get("/get_allvehicles", getAllVehicle)
router.get("/get_vehicle/:id", getVehicleById)
router.delete("/delete_vehicle/:id", deleteVechile)
router.patch("/update_vehicle/:id", updateVehicle)

export default router